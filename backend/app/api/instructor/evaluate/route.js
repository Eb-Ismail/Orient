import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../middleware/authMiddleware.js';
import { talentPlatformService } from '../../../../lib/talentPlatformService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request) {
  const { user, response } = await authenticateRequest(request, ['COMMISSION', 'ADMIN']);
  if (response) return response;

  const instructorId = user.UtilisateurId;

  try {
    const body = await request.json();
    const { studentId, evalData } = body;

    if (!studentId) {
      return NextResponse.json({
        error: "L'identifiant de l'élève (studentId) est requis.",
        code: 'BAD_REQUEST'
      }, { status: 400, headers: corsHeaders() });
    }

    const evaluation = await talentPlatformService.saveInstructorEvaluation(
      instructorId,
      studentId,
      evalData || {}
    );

    return NextResponse.json({
      success: true,
      message: 'Évaluation enregistrée et Talent Radar validé avec succès.',
      evaluation
    }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      code: 'EVALUATION_SAVE_ERROR'
    }, { status: 500, headers: corsHeaders() });
  }
}

