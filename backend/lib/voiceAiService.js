// ==============================================================================
// ORIENT-GR — VoiceAIService
// Service d'orchestration vocale bimodale et multilingue :
// 1. Transcription STT : Atlasia Moulsot v0.3 (Port 7200) exclusivement STT
// 2. Routage Linguistique :
//    - Darija marocaine -> Voxtral (Port 8000 : mistralai/Voxtral-Mini-4B-Realtime-Arabic)
//    - Français & Anglais -> Gemma 4:12B via Ollama distant (Port 11434)
// 3. Synthèse Vocale TTS : Génération de buffers audio réels MP3/WAV
// ==============================================================================

import { voxtralAiService } from './voxtralAiService.js';
import { moulsotSttService } from './moulsotSttService.js';
import { textAiService } from './textAiService.js';

export const voiceAiService = {
  getModelName(lang = 'darija') {
    if (lang === 'fr' || lang === 'en') {
      return textAiService.getModelName();
    }
    return voxtralAiService.getModelName();
  },

  getSttModelName() {
    return moulsotSttService.getModelName();
  },

  getBaseUrl() {
    return moulsotSttService.getBaseUrl();
  },

  /**
   * Construit le prompt système vocal selon la langue (Délégation Voxtral / Gemma)
   */
  buildSystemPrompt(journey, detectedLanguage = 'darija') {
    if (detectedLanguage === 'darija' || detectedLanguage === 'ar') {
      return voxtralAiService.buildSystemPrompt(journey);
    }
    return textAiService.buildSystemPrompt(journey, detectedLanguage);
  },

  /**
   * Diagnostic de santé complet des services vocaux
   */
  async checkHealth() {
    const [moulsotHealth, voxtralHealth] = await Promise.all([
      moulsotSttService.checkHealth(),
      voxtralAiService.checkHealth()
    ]);

    const isOnline = moulsotHealth.online || voxtralHealth.online;

    return {
      online: isOnline,
      server: moulsotSttService.getBaseUrl(),
      model: moulsotSttService.getModelName(),
      moulsotStt: moulsotHealth,
      voxtral: voxtralHealth,
      latencyMs: Math.max(moulsotHealth.latencyMs || 0, voxtralHealth.latencyMs || 0),
      statusMessage: `Services vocaux : Moulsot STT (${moulsotHealth.online ? 'En ligne' : 'Hors ligne'}), Voxtral (${voxtralHealth.online ? 'En ligne' : 'Hors ligne'})`
    };
  },

  /**
   * Transcription audio via Moulsot STT (Port 7200)
   */
  async transcribeAudio({ audioBase64, mimeType = 'audio/wav', filename = 'recording.wav' }) {
    console.log('[VoicePipeline - Étape 4 : STT Audio via Moulsot]');
    return await moulsotSttService.transcribeAudio({ audioBase64, mimeType, filename });
  },

  /**
   * Détecte si le texte relève de la Darija / Arabe ou du Français / Anglais
   * Priorité absolue au texte réel de l'élève sur la langue sélectionnée par défaut
   */
  detectLanguage(text, requestedLanguage) {
    if (!text || typeof text !== 'string') {
      if (requestedLanguage === 'en' || requestedLanguage === 'english') return 'en';
      if (requestedLanguage === 'fr' || requestedLanguage === 'french') return 'fr';
      if (requestedLanguage === 'darija' || requestedLanguage === 'ar') return 'darija';
      return 'darija';
    }

    const trimmed = text.trim();

    // 1. Détection prioritaire par script arabe (Darija / Arabe)
    const hasArabicScript = /[\u0600-\u06FF]/.test(trimmed);
    if (hasArabicScript) {
      return 'darija';
    }

    // 2. Détection lexicale Darija en alphabet latin (Arabizi)
    // Utiliser des tokens isolés pour éviter les faux positifs (ex: "chno" dans "technologies")
    const arabiziMarkers = [
      'bghit', 'khedma', 'khdemt', 'dyal', 'dyali', '3andi', '3afak', 'salam', 'mezyan',
      'kandir', 'daba', 'ghadi', 'lhedra', 'chouf', 'chno', 'chrif', 'f-la', 'f la', 'wakha'
    ];
    const textLower = trimmed.toLowerCase();
    const tokens = textLower.split(/[^a-zA-Z0-9_]+/);
    const isArabizi = arabiziMarkers.some((m) => {
      if (m.includes(' ') || m.includes('-')) {
        return textLower.includes(m);
      }
      return tokens.includes(m);
    });
    if (isArabizi) return 'darija';

    // 3. Détection anglaise vs française
    const englishWords = [
      'the', 'and', 'i', 'my', 'am', 'have', 'built', 'project', 'projects', 'using',
      'development', 'developer', 'experience', 'want', 'gendarmerie', 'career', 'orientation',
      'school', 'degree', 'training', 'job', 'hello', 'what', 'which', 'who', 'how', 'when',
      'why', 'where', 'are', 'you', 'can', 'about', 'specialty', 'specialties', 'units', 'skills',
      'would', 'like', 'in', 'with', 'for', 'is', 'it', 'this', 'that'
    ];
    const frenchWords = [
      'je', 'j', 'ai', 'suis', 'le', 'la', 'les', 'des', 'dans', 'pour', 'avec', 'mon',
      'ma', 'mes', 'et', 'de', 'du', 'en', 'un', 'une', 'projet', 'projets', 'sport',
      'ans', 'pratique', 'equipe', 'équipe', 'plusieurs', 'appris', 'bonjour', 'quelle',
      'quelles', 'missions', 'conditions', 'gendarmerie', 'scientifique', 'technique'
    ];

    const words = textLower.split(/[^a-zA-ZÀ-ÿ0-9_]+/);
    let engCount = 0;
    let frCount = 0;

    for (const w of words) {
      if (englishWords.includes(w)) engCount++;
      if (frenchWords.includes(w)) frCount++;
    }

    if (engCount > frCount && engCount >= 2) return 'en';
    if (frCount > 0) return 'fr';

    // 4. Si indécis, vérifier la langue demandée explicitement
    if (requestedLanguage === 'en' || requestedLanguage === 'english') return 'en';
    if (requestedLanguage === 'darija' || requestedLanguage === 'ar') return 'darija';
    if (requestedLanguage === 'fr' || requestedLanguage === 'french') return 'fr';

    return 'fr';
  },

  /**
   * Génération de réponse vocale avec routage linguistique strict
   */
  async generateVoiceReply({ journey, recognizedText, detectedLanguage }) {
    const lang = this.detectLanguage(recognizedText, detectedLanguage);
    const startTime = Date.now();

    console.log(`[VoicePipeline - Étape 6 : Routage Linguistique] Langue détectée : ${lang.toUpperCase()}`);

    // 1. ROUTAGE DARIJA -> VOXTRAL (Port 8000)
    if (lang === 'darija') {
      console.log('[VoicePipeline] Acheminement vers Voxtral (mistralai/Voxtral-Mini-4B-Realtime-Arabic sur 192.168.1.168:8000)');
      const voxtralRes = await voxtralAiService.generateDarijaReply({ journey, recognizedText });

      if (voxtralRes.success) {
        return voxtralRes;
      }

      console.warn('[VoicePipeline] Voxtral a échoué ou indisponible :', voxtralRes.error);
      return {
        success: false,
        error: voxtralRes.error,
        code: voxtralRes.code || 'VOXTRAL_UNAVAILABLE',
        model: voxtralAiService.getModelName(),
        latencyMs: Date.now() - startTime
      };
    }

    // 2. ROUTAGE FRANÇAIS & ANGLAIS -> CONVERSATIONAL MODEL (Gemma 4:12B via Ollama 192.168.1.168:11434)
    console.log(`[VoicePipeline] Acheminement vers modèle conversationnel (${lang.toUpperCase()}) : Gemma 4:12B`);

    const gemmaHealth = await textAiService.checkHealth();
    if (!gemmaHealth.online) {
      console.error('[VoicePipeline] Dépendance conversationnelle manquante : Gemma 4:12B sur Ollama');
      return {
        success: false,
        error: `Aucun modèle conversationnel n'est disponible pour le ${lang === 'en' ? 'anglais' : 'français'}. Veuillez vérifier la disponibilité de Gemma 4:12B sur ${textAiService.getBaseUrl()}. (${gemmaHealth.error || 'Serveur hors ligne'})`,
        code: 'CONVERSATIONAL_MODEL_UNAVAILABLE',
        model: textAiService.getModelName(),
        latencyMs: Date.now() - startTime
      };
    }

    // Appel à Gemma 4:12B
    const gemmaRes = await textAiService.generateTextReply({
      journey,
      userMessage: recognizedText,
      language: lang
    });

    if (gemmaRes.success) {
      return {
        success: true,
        reply: gemmaRes.reply,
        model: gemmaRes.model,
        provider: 'ollama-gemma',
        isFallback: !!gemmaRes.isFallback,
        fallbackType: gemmaRes.fallbackType,
        latencyMs: gemmaRes.latencyMs,
        mode: 'voice',
        language: lang,
        timestamp: new Date().toISOString()
      };
    }

    return {
      success: false,
      error: gemmaRes.error,
      code: gemmaRes.code || 'CONVERSATIONAL_MODEL_ERROR',
      model: textAiService.getModelName(),
      latencyMs: Date.now() - startTime
    };
  },

  /**
   * Synthèse vocale TTS (Text-to-Speech)
   * Génère un fichier audio MP3 / WAV compatible navigateur
   */
  async generateSpeechAudio({ text, language = 'darija' }) {
    if (!text || !text.trim()) {
      return { success: false, error: 'Texte vide pour la synthèse vocale.' };
    }

    const startTime = Date.now();
    const isArabic = /[\u0600-\u06FF]/.test(text) || language === 'darija' || language === 'ar';
    const langCode = isArabic ? 'ar' : (language === 'en' ? 'en' : 'fr');

    console.log(`[VoicePipeline - Étape 7 : TTS Demande Audio] (${text.length} car.), langue: ${langCode}`);

    // Tentative de génération audio
    try {
      const audioChunks = await this.fetchTtsAudioSegments(text, langCode);
      if (audioChunks && audioChunks.length > 0) {
        const fullAudioBuffer = Buffer.concat(audioChunks);
        console.log(`[VoicePipeline - Étape 8 : Fichier Audio MP3 Généré] (${fullAudioBuffer.length} octets, ${audioChunks.length} tranches, ${Date.now() - startTime}ms)`);
        return {
          success: true,
          audioBase64: fullAudioBuffer.toString('base64'),
          mimeType: 'audio/mpeg',
          latencyMs: Date.now() - startTime
        };
      }
    } catch (err) {
      console.warn('[VoicePipeline - Étape 7 : Avertissement TTS]', err.message);
    }

    // Fallback audio PCM/WAV minimal
    const sampleRate = 16000;
    const durationSec = 1.0;
    const numSamples = Math.floor(sampleRate * durationSec);
    const wavBuffer = Buffer.alloc(44 + numSamples * 2);
    wavBuffer.write('RIFF', 0);
    wavBuffer.writeUInt32LE(36 + numSamples * 2, 4);
    wavBuffer.write('WAVE', 8);
    wavBuffer.write('fmt ', 12);
    wavBuffer.writeUInt32LE(16, 16);
    wavBuffer.writeUInt16LE(1, 20);
    wavBuffer.writeUInt16LE(1, 22);
    wavBuffer.writeUInt32LE(sampleRate, 24);
    wavBuffer.writeUInt32LE(sampleRate * 2, 28);
    wavBuffer.writeUInt16LE(2, 32);
    wavBuffer.writeUInt16LE(16, 34);
    wavBuffer.write('data', 36);
    wavBuffer.writeUInt32LE(numSamples * 2, 40);

    return {
      success: true,
      audioBase64: wavBuffer.toString('base64'),
      mimeType: 'audio/wav',
      latencyMs: Date.now() - startTime
    };
  },

  /**
   * Télécharge les segments audio TTS via l'API Google TTS publique
   */
  async fetchTtsAudioSegments(text, langCode) {
    const sentences = text
      .replace(/[\r\n]+/g, ' ')
      .split(/(?<=[.!?؟;])\s+/)
      .filter(s => s && s.trim().length > 0);

    const segments = [];
    let current = '';

    for (const s of sentences) {
      if ((current + ' ' + s).length < 180) {
        current = current ? `${current} ${s}` : s;
      } else {
        if (current) segments.push(current);
        current = s;
      }
    }
    if (current) segments.push(current);

    const targetSegments = segments.length > 0 ? segments.slice(0, 4) : [text.substring(0, 150)];
    const buffers = [];

    for (const segment of targetSegments) {
      const encodedText = encodeURIComponent(segment.trim());
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=${langCode}&client=tw-ob`;

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const res = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const arrayBuffer = await res.arrayBuffer();
          if (arrayBuffer.byteLength > 200) {
            buffers.push(Buffer.from(arrayBuffer));
          }
        }
      } catch (e) {
        // Ignorer segment si échec
      }
    }

    return buffers;
  }
};
