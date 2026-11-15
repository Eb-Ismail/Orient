import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { simulationService } from '../../../../../services/simulationService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'ELEVE']);
  if (response) return response;

  const { moduleId } = params;
  try {
    const body = await request.json();
    const { stageIndex, stageAnswers, elapsedSeconds } = body;

    const session = await simulationService.saveProgress(
      moduleId,
      user.UtilisateurId,
      stageIndex,
      stageAnswers,
      elapsedSeconds
    );

    return NextResponse.json({ success: true, session }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}
