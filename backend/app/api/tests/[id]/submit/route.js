import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { testService } from '../../../../../services/testService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ELEVE', 'ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const { sessionId, userAnswers } = body;

    if (!sessionId) {
      return NextResponse.json({ error: 'Numéro de session manquant.' }, { status: 400, headers: corsHeaders() });
    }

    const result = await testService.submitTest(sessionId, user.UtilisateurId, userAnswers);

    return NextResponse.json(
      {
        message: 'Évaluation clôturée avec succès.',
        ...result
      },
      { headers: corsHeaders() }
    );
  } catch (err) {
    console.error('Erreur soumission test:', err);
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}
