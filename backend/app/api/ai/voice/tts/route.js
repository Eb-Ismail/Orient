// ==============================================================================
// ORIENT-GR — Route API : Synthèse Vocale TTS (Text-to-Speech)
// Génération de véritables fichiers audio MP3 pour Moulsot v0.3
// ==============================================================================

import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { voiceAiService } from '../../../../../lib/voiceAiService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request) {
  const { user, response } = await authenticateRequest(request, ['ELEVE', 'ADMIN', 'COMMISSION']);
  if (response) return response;

  try {
    const body = await request.json();
    const { text, language = 'darija' } = body;

    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: 'Le texte pour la synthèse vocale ne peut pas être vide.' },
        { status: 400, headers: corsHeaders() }
      );
    }

    console.log('[TTS Route] Demande de synthèse vocale reçue :', {
      userId: user.UtilisateurId,
      textLength: text.length,
      language
    });

    const ttsResult = await voiceAiService.generateSpeechAudio({
      text: text.trim(),
      language
    });

    console.log('[TTS Route] Résultat de la synthèse vocale :', {
      success: ttsResult.success,
      provider: ttsResult.provider,
      audioBytes: ttsResult.audioBase64 ? ttsResult.audioBase64.length : 0
    });

    return NextResponse.json(ttsResult, { headers: corsHeaders() });
  } catch (err) {
    console.error('[TTS Route] Erreur synthèse vocale :', err);
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

