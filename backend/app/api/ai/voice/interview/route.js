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
    const { audioText, message, language = 'darija', strictNoFallback, allowDemoFallback } = body;
    const spokenText = (audioText || message || '').trim();

    if (!spokenText) {
      return NextResponse.json(
        { error: 'Aucun texte vocal reconnu fourni pour le modèle Moulsot v0.3.' },
        { status: 400, headers: corsHeaders() }
      );
    }

    const result = await smartJourneyService.processInterviewMessage(user.UtilisateurId, spokenText, {
      mode: 'voice',
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

