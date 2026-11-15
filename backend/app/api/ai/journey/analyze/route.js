import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { smartJourneyService } from '../../../../../lib/smartJourneyService.js';
import { canUserViewOrientationResults, syncOrientationVisibilityFromDb } from '../../../../../lib/orientationConfig.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request) {
  const { user, response } = await authenticateRequest(request, ['ELEVE', 'ADMIN']);
  if (response) return response;

  await syncOrientationVisibilityFromDb();
  if (!canUserViewOrientationResults(user)) {
    return NextResponse.json(
      {
        error: "L'accès aux résultats d'orientation est actuellement restreint aux administrateurs (Mode admin_only).",
        code: 'ORIENTATION_RESULTS_RESTRICTED'
      },
      { status: 403, headers: corsHeaders() }
    );
  }

  try {
    const analysis = await smartJourneyService.generateProfileAnalysis(user.UtilisateurId);
    return NextResponse.json({ analysis }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

