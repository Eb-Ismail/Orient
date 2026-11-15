import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { testService } from '../../../../../services/testService.js';
import { validateTestAnswer } from '../../../../../validators/index.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ELEVE', 'ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const validation = validateTestAnswer(body);

    if (!validation.isValid) {
      return NextResponse.json({ error: 'Réponse invalide.', details: validation.errors }, { status: 400, headers: corsHeaders() });
    }

    const { sessionId, questionId, optionId, elapsedSeconds, reponseTexte, texteReponse } = body;
    const result = await testService.recordAnswer(sessionId, questionId, optionId, elapsedSeconds, reponseTexte || texteReponse);

    return NextResponse.json(result, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}
