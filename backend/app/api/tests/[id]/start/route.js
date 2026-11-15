import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { testService } from '../../../../../services/testService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ELEVE', 'ADMIN']);
  if (response) return response;

  const testId = params.id;
  try {
    let candidateData = null;
    try {
      const body = await request.json();
      candidateData = body.candidateData || body;
    } catch (e) {
      // pas de body ou body non-JSON
    }

    const result = await testService.startOrResumeSession(testId, user.UtilisateurId, candidateData);
    return NextResponse.json(result, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}
