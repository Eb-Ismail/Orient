import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../middleware/authMiddleware.js';
import { talentPlatformService } from '../../../lib/talentPlatformService.js';
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
        error: "L'accès aux résultats du simulateur d'orientation est actuellement restreint aux administrateurs (Mode admin_only).",
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
      { error: "Accès interdit au simulateur d'orientation d'un autre élève.", code: 'FORBIDDEN' },
      { status: 403, headers: corsHeaders() }
    );
  }

  const studentId = (userRole === 'ADMIN' || userRole === 'COMMISSION') && requestedStudentId
    ? requestedStudentId
    : user.UtilisateurId;

  try {
    const data = await talentPlatformService.getOrientationSimulatorData(studentId);
    return NextResponse.json({
      success: true,
      simulation: data
    }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      code: 'ORIENTATION_SIMULATOR_ERROR'
    }, { status: 500, headers: corsHeaders() });
  }
}

export async function POST(request) {
  const { user, response } = await authenticateRequest(request, ['ELEVE', 'ADMIN', 'COMMISSION']);
  if (response) return response;

  if (!canUserViewOrientationResults(user)) {
    return NextResponse.json(
      {
        error: "L'accès aux résultats du simulateur d'orientation est actuellement restreint aux administrateurs (Mode admin_only).",
        code: 'ORIENTATION_RESULTS_RESTRICTED'
      },
      { status: 403, headers: corsHeaders() }
    );
  }

  try {
    const body = await request.json();
    const userRole = (user.Role || user.role || '').toUpperCase();
    const requestedStudentId = body.studentId;

    if (userRole === 'ELEVE' && requestedStudentId && String(requestedStudentId) !== String(user.UtilisateurId)) {
      return NextResponse.json(
        { error: "Accès interdit au simulateur d'orientation d'un autre élève.", code: 'FORBIDDEN' },
        { status: 403, headers: corsHeaders() }
      );
    }

    const studentId = (userRole === 'ADMIN' || userRole === 'COMMISSION') && requestedStudentId
      ? requestedStudentId
      : user.UtilisateurId;
    const adjustments = body.adjustments || null;

    const data = await talentPlatformService.getOrientationSimulatorData(studentId, adjustments);

    return NextResponse.json({
      success: true,
      simulation: data
    }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      code: 'ORIENTATION_SIMULATOR_ERROR'
    }, { status: 500, headers: corsHeaders() });
  }
}

