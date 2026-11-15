import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../middleware/authMiddleware.js';
import { testService } from '../../../../services/testService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'ELEVE']);
  if (response) return response;

  const sessionId = params.sessionId;
  try {
    const results = await testService.getSessionResults(sessionId, user.UtilisateurId, user.Role);
    if (!results) {
      return NextResponse.json({ error: 'Résultats de session introuvables.' }, { status: 404, headers: corsHeaders() });
    }

    return NextResponse.json(results, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 403, headers: corsHeaders() });
  }
}
