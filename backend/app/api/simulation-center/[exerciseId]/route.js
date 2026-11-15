import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../middleware/authMiddleware.js';
import { talentPlatformService } from '../../../../lib/talentPlatformService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ELEVE', 'ADMIN', 'COMMISSION']);
  if (response) return response;

  const { exerciseId } = await params;

  try {
    const exercise = talentPlatformService.getSimulationExerciseById(exerciseId);
    if (!exercise) {
      return NextResponse.json({
        error: `Exercice '${exerciseId}' introuvable.`,
        code: 'NOT_FOUND'
      }, { status: 404, headers: corsHeaders() });
    }

    // Sécurisation : on supprime les flags 'correct' des options avant envoi à l'élève
    const sanitizedExercise = JSON.parse(JSON.stringify(exercise));

    if (sanitizedExercise.scenario?.questions) {
      sanitizedExercise.scenario.questions = sanitizedExercise.scenario.questions.map(q => ({
        ...q,
        options: q.options.map(opt => ({
          id: opt.id,
          label: opt.label || opt.texte,
          texte: opt.texte || opt.label
        }))
      }));
    }

    if (sanitizedExercise.questions) {
      sanitizedExercise.questions = sanitizedExercise.questions.map(q => ({
        id: q.id,
        texte: q.texte,
        options: q.options
          ? q.options.map(opt => ({
              id: opt.id,
              label: opt.label || opt.texte,
              texte: opt.texte || opt.label
            }))
          : undefined
      }));
    }

    if (sanitizedExercise.documentToAudit?.segments) {
      sanitizedExercise.documentToAudit.segments = sanitizedExercise.documentToAudit.segments.map(seg => ({
        id: seg.id,
        texte: seg.texte
      }));
    }

    if (sanitizedExercise.tasksToPrioritize) {
      sanitizedExercise.tasksToPrioritize = sanitizedExercise.tasksToPrioritize.map(t => ({
        id: t.id,
        titre: t.titre,
        description: t.description,
        type: t.type
      }));
    }

    if (sanitizedExercise.etapesAOrdonner) {
      sanitizedExercise.etapesAOrdonner = sanitizedExercise.etapesAOrdonner.map(e => ({
        id: e.id,
        texte: e.texte
      }));
    }

    return NextResponse.json({
      success: true,
      exercise: sanitizedExercise
    }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      code: 'EXERCISE_FETCH_ERROR'
    }, { status: 500, headers: corsHeaders() });
  }
}

