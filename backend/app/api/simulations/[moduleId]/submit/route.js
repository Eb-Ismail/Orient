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
    const { allAnswers, totalDurationSeconds } = body;

    const evaluation = await simulationService.submitModule(
      moduleId,
      user.UtilisateurId,
      allAnswers,
      totalDurationSeconds
    );

    return NextResponse.json({ success: true, evaluation }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}
