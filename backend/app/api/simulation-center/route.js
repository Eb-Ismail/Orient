import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../middleware/authMiddleware.js';
import { talentPlatformService } from '../../../lib/talentPlatformService.js';
import { journeyAndTalentRepository } from '../../../repositories/journeyAndTalentRepository.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['ELEVE', 'ADMIN', 'COMMISSION']);
  if (response) return response;

  const studentId = user.UtilisateurId;

  try {
    const exercises = talentPlatformService.getSimulationExercises();
    const sessions = await journeyAndTalentRepository.getSimulationCenterSessions(studentId);

    const exercisesWithProgress = exercises.map(ex => {
      const userSessions = sessions.filter(s => s.exerciseId === ex.id);
      const isCompleted = userSessions.length > 0;
      const latestSession = isCompleted ? userSessions[userSessions.length - 1] : null;
      const bestScore = isCompleted ? Math.max(...userSessions.map(s => s.score || 0)) : null;

      return {
        ...ex,
        // Ne pas envoyer les corrections complètes dans la liste générale
        scenario: ex.scenario ? {
          contexte: ex.scenario.contexte,
          questionsCount: ex.scenario.questions?.length || 0
        } : undefined,
        documentToAudit: ex.documentToAudit ? {
          typeDocument: ex.documentToAudit.typeDocument,
          consigne: ex.documentToAudit.consigne,
          segmentsCount: ex.documentToAudit.segments?.length || 0
        } : undefined,
        userProgress: {
          isCompleted,
          attemptsCount: userSessions.length,
          bestScore,
          latestScore: latestSession?.score || null,
          latestPrecisionPct: latestSession?.precisionPct || null,
          lastCompletedAt: latestSession?.completedAt || null
        }
      };
    });

    return NextResponse.json({
      success: true,
      exercises: exercisesWithProgress,
      summary: {
        totalExercises: exercises.length,
        completedCount: exercisesWithProgress.filter(e => e.userProgress.isCompleted).length,
        averageScore: sessions.length > 0
          ? Math.round(sessions.reduce((acc, s) => acc + (s.score || 0), 0) / sessions.length)
          : null
      }
    }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      code: 'SIMULATION_CENTER_ERROR'
    }, { status: 500, headers: corsHeaders() });
  }
}

