import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { smartJourneyService } from '../../../../../lib/smartJourneyService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['ELEVE', 'ADMIN']);
  if (response) return response;

  try {
    const history = await smartJourneyService.getJourneyHistory(user.UtilisateurId);
    return NextResponse.json(history, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

