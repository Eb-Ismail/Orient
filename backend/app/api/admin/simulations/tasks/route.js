import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { group3Repository } from '../../../../../repositories/group3Repository.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const tasks = await group3Repository.getSimulationTasks();
    // Retourner un aperçu sécurisé des tâches pour configuration
    const taskSummaries = tasks.map(t => ({
      taskId: t.taskId,
      numero: t.numero,
      domaineId: t.domaineId,
      domaineAr: t.domaineAr,
      titreAr: t.titreAr,
      titreFr: t.titreFr,
      difficulte: t.difficulte,
      dureeEstimeeMinutes: t.dureeEstimeeMinutes,
      pointsMax: t.pointsMax,
      interactionType: t.interactionType,
      competenceTags: t.competenceTags,
      scoringType: t.scoringConfig?.type
    }));

    return NextResponse.json({ tasks: taskSummaries, total: taskSummaries.length }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function PUT(request) {
  const { response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const { taskId, difficulte, pointsMax, dureeEstimeeMinutes } = body;
    if (!taskId) {
      return NextResponse.json({ error: 'taskId requis.' }, { status: 400, headers: corsHeaders() });
    }

    const task = await group3Repository.updateSimulationTask(taskId, { difficulte, pointsMax, dureeEstimeeMinutes });
    if (!task) {
      return NextResponse.json({ error: 'Tâche introuvable.' }, { status: 404, headers: corsHeaders() });
    }

    return NextResponse.json({ success: true, task }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

