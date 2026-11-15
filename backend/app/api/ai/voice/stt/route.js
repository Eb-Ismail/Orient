import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { voiceAiService } from '../../../../../lib/voiceAiService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request) {
  const { user, response } = await authenticateRequest(request, ['ELEVE', 'ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const { audioBase64, mimeType } = body;

    console.log('[VoicePipeline - Étape 3 : Fichier Audio Reçu]', {
      userId: user.UtilisateurId,
      mimeType,
      audioBase64Length: audioBase64 ? audioBase64.length : 0
    });

    const result = await voiceAiService.transcribeAudio({ audioBase64, mimeType });

    console.log('[VoicePipeline - Étape 4 & 5 : Transcription Whisper]', {
      success: result.success,
      text: result.text || '(vide)',
      fallbackClientSupported: result.fallbackClientSupported
    });

    return NextResponse.json(result, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

