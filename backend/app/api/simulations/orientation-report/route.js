import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../middleware/authMiddleware.js';
import { professionalOrientationService } from '../../../../services/professionalOrientationService.js';
import { canUserViewOrientationResults, syncOrientationVisibilityFromDb } from '../../../../lib/orientationConfig.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'ELEVE', 'COMMISSION']);
  if (response) return response;

  await syncOrientationVisibilityFromDb();
  if (!canUserViewOrientationResults(user)) {
    return NextResponse.json(
      {
        error: "L'accès au rapport d'orientation est actuellement restreint aux administrateurs (Mode admin_only).",
        code: 'ORIENTATION_RESULTS_RESTRICTED'
      },
      { status: 403, headers: corsHeaders() }
    );
  }

  try {
    const url = new URL(request.url);
    const paramStudentId = url.searchParams.get('studentId');
    const userRole = (user.Role || user.role || '').toUpperCase();
    if (userRole === 'ELEVE' && paramStudentId && String(paramStudentId) !== String(user.UtilisateurId)) {
      return NextResponse.json({ error: 'Accès interdit au rapport d\'un autre élève.' }, { status: 403, headers: corsHeaders() });
    }
    const targetStudentId = (paramStudentId && (userRole === 'ADMIN' || userRole === 'COMMISSION'))
      ? paramStudentId
      : (user.UtilisateurId || user.id || user.sub);

    const report = await professionalOrientationService.getStudentComprehensiveReport(targetStudentId);
    if (!report) {
      return NextResponse.json({ error: 'Rapport introuvable pour cet élève.' }, { status: 404, headers: corsHeaders() });
    }

    return NextResponse.json({ report }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

