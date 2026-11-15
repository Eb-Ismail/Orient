import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../middleware/authMiddleware.js';
import { talentPlatformService, TALENT_RADAR_DIMENSIONS } from '../../../lib/talentPlatformService.js';
import { canUserViewOrientationResults, syncOrientationVisibilityFromDb } from '../../../lib/orientationConfig.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['ELEVE', 'ADMIN', 'COMMISSION']);
  if (response) return response;

  await syncOrientationVisibilityFromDb();
  if (!canUserViewOrientationResults(user)) {
    return NextResponse.json(
      {
        error: "L'accès aux résultats Talent Radar est actuellement restreint aux administrateurs (Mode admin_only).",
        code: 'ORIENTATION_RESULTS_RESTRICTED'
      },
      { status: 403, headers: corsHeaders() }
    );
  }

  const { searchParams } = new URL(request.url);
  const requestedStudentId = searchParams.get('studentId');
  const userRole = (user.Role || user.role || '').toUpperCase();

  if (userRole === 'ELEVE' && requestedStudentId && String(requestedStudentId) !== String(user.UtilisateurId)) {
    return NextResponse.json(
      { error: "Accès interdit au profil Talent Radar d'un autre élève.", code: 'FORBIDDEN' },
      { status: 403, headers: corsHeaders() }
    );
  }

  const targetStudentId = (userRole === 'ADMIN' || userRole === 'COMMISSION') && requestedStudentId
    ? requestedStudentId
    : user.UtilisateurId;

  try {
    const profile = await talentPlatformService.getStudentTalentRadar(targetStudentId);
    return NextResponse.json({
      success: true,
      dimensionsDefinition: TALENT_RADAR_DIMENSIONS,
      profile
    }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      code: 'TALENT_RADAR_ERROR'
    }, { status: 500, headers: corsHeaders() });
  }
}

