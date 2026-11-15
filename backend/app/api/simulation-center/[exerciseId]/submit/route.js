import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { talentPlatformService } from '../../../../../lib/talentPlatformService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ELEVE', 'ADMIN']);
  if (response) return response;

  const studentId = user.UtilisateurId;
  const { exerciseId } = await params;

  try {
    const body = await request.json();
    const { userAnswers, timeSpentSeconds } = body;

    const evaluation = await talentPlatformService.submitSimulationExercise(
      studentId,
      exerciseId,
      userAnswers,
      timeSpentSeconds || 120
    );

    // Récupérer le radar mis à jour pour le renvoyer directement au client
    const updatedRadar = await talentPlatformService.getStudentTalentRadar(studentId);

    return NextResponse.json({
      success: true,
      message: 'Exercice soumis et évalué avec succès.',
      evaluation,
      updatedTalentRadar: updatedRadar
    }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      code: 'SUBMISSION_ERROR'
    }, { status: 500, headers: corsHeaders() });
  }
}

