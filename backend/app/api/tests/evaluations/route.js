import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../middleware/authMiddleware.js';
import { testService } from '../../../../services/testService.js';
import { mockStore } from '../../../../lib/db.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  const url = new URL(request.url);
  const sessionId = url.searchParams.get('sessionId');

  let subjectiveAnswers = [];

  // Parcourir toutes les sessions ou une session spécifique
  const sessionsToScan = sessionId
    ? mockStore.sessions.filter(s => s.SessionId === parseInt(sessionId, 10))
    : mockStore.sessions;

  sessionsToScan.forEach(session => {
    const student = mockStore.users.find(u => u.UtilisateurId === session.UtilisateurId);
    (session.UserAnswers || []).forEach(ans => {
      const question = mockStore.questions.find(q => q.QuestionId === ans.questionId);
      if (question && question.TypeQuestion === 'QUESTION_SUBJECTIVE') {
        const evaluation = (mockStore.evaluations || []).find(
          e => e.SessionId === session.SessionId && e.QuestionId === question.QuestionId
        );
        subjectiveAnswers.push({
          sessionId: session.SessionId,
          studentId: student ? student.UtilisateurId : null,
          studentNom: student ? `${student.Nom} ${student.Prenom}` : 'Inconnu',
          studentMatricule: student ? student.Matricule : '',
          questionId: question.QuestionId,
          questionCode: question.Code,
          enonce: question.Enonce,
          pointsMax: question.Points || 3,
          bareme: question.BaremeSubjectif,
          reponseTexte: ans.reponseTexte || ans.texteReponse || 'Aucune réponse rédigée',
          savedAt: ans.savedAt,
          isEvaluated: Boolean(evaluation),
          evaluation: evaluation || null
        });
      }
    });
  });

  return NextResponse.json({ subjectiveAnswers }, { headers: corsHeaders() });
}

export async function POST(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const { sessionId, questionId, pointsAttribues, commentaire } = body;

    if (!sessionId || !questionId || pointsAttribues === undefined) {
      return NextResponse.json({ error: 'Champs sessionId, questionId et pointsAttribues requis.' }, { status: 400, headers: corsHeaders() });
    }

    const evaluation = await testService.evaluateSubjectiveQuestion(
      sessionId,
      questionId,
      user.UtilisateurId,
      pointsAttribues,
      commentaire
    );

    return NextResponse.json({ message: 'Évaluation enregistrée.', evaluation }, { status: 201, headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}
