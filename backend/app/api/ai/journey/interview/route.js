import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { smartJourneyService } from '../../../../../lib/smartJourneyService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request) {
  const { user, response } = await authenticateRequest(request, ['ELEVE', 'ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const { message, mode = 'text', language, strictNoFallback, allowDemoFallback } = body;

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Le message ne peut pas être vide.' }, { status: 400, headers: corsHeaders() });
    }

    const result = await smartJourneyService.processInterviewMessage(user.UtilisateurId, message.trim(), {
      mode: mode === 'voice' ? 'voice' : 'text',
      language,
      strictNoFallback,
      allowDemoFallback
    });

    if (result.success === false) {
      return NextResponse.json(result, { status: 503, headers: corsHeaders() });
    }

    return NextResponse.json(result, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

