// ==============================================================================
// ORIENT-GR — MoulsotSTTService (atlasia/moulsot.v0.3)
// Service IA dédié EXCLUSIVEMENT à la transcription vocale (Speech-to-Text)
// Hébergé sur le PC distant Docker : http://192.168.1.168:7200/v1
// Règle stricte : Ne jamais appeler /chat/completions sur ce service
// ==============================================================================

const MOULSOT_BASE_URL = process.env.MOULSOT_BASE_URL || 'http://192.168.1.168:7200/v1';
const MOULSOT_STT_MODEL = process.env.MOULSOT_STT_MODEL || 'atlasia/moulsot.v0.3';
const REQUEST_TIMEOUT_MS = 20000;

export const moulsotSttService = {
  getModelName() {
    return process.env.MOULSOT_STT_MODEL || MOULSOT_STT_MODEL;
  },

  getBaseUrl() {
    let url = process.env.MOULSOT_BASE_URL || MOULSOT_BASE_URL;
    return url.replace(/\/+$/, '');
  },

  /**
   * Vérifie la disponibilité du conteneur Moulsot STT
   */
  async checkHealth() {
    const baseUrl = this.getBaseUrl();
    const targetModel = this.getModelName();
    const startTime = Date.now();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const modelsUrl = baseUrl.endsWith('/v1') ? `${baseUrl}/models` : `${baseUrl}/v1/models`;

      const res = await fetch(modelsUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const latencyMs = Date.now() - startTime;

      if (!res.ok) {
        return {
          online: false,
          server: baseUrl,
          model: targetModel,
          role: 'STT (Speech-to-Text)',
          latencyMs,
          error: `Serveur Moulsot STT a répondu avec le statut HTTP ${res.status}`
        };
      }

      const data = await res.json().catch(() => ({}));
      const modelsList = Array.isArray(data.data) ? data.data.map(m => m.id) : [];
      const targetModelFound = modelsList.includes(targetModel) || modelsList.some(m => m.includes('moulsot'));

      return {
        online: true,
        server: baseUrl,
        model: targetModel,
        role: 'STT (Speech-to-Text)',
        latencyMs,
        models: modelsList,
        targetModelFound,
        statusMessage: targetModelFound
          ? `Service STT Moulsot (${targetModel}) opérationnel sur ${baseUrl}`
          : `Serveur Moulsot en ligne mais modèle ${targetModel} absent`
      };
    } catch (err) {
      const latencyMs = Date.now() - startTime;
      const isTimeout = err.name === 'AbortError';

      return {
        online: false,
        server: baseUrl,
        model: targetModel,
        role: 'STT (Speech-to-Text)',
        latencyMs,
        error: isTimeout
          ? `Timeout (4s) sur ${baseUrl}`
          : `Serveur Moulsot STT inaccessible sur ${baseUrl} : ${err.message}`
      };
    }
  },

  /**
   * Transcription audio via POST /v1/audio/transcriptions (multipart/form-data)
   */
  async transcribeAudio({ audioBase64, mimeType = 'audio/wav', filename = 'recording.wav' }) {
    const baseUrl = this.getBaseUrl();
    const model = this.getModelName();
    const startTime = Date.now();

    if (!audioBase64) {
      return { success: false, error: 'Flux audio base64 manquant' };
    }

    const endpoint = baseUrl.endsWith('/v1')
      ? `${baseUrl}/audio/transcriptions`
      : `${baseUrl}/v1/audio/transcriptions`;

    console.log(`[MoulsotSTT] Envoi audio (${audioBase64.length} car., ${mimeType}) vers ${endpoint}`);

    try {
      const audioBuffer = Buffer.from(audioBase64, 'base64');
      const blob = new Blob([audioBuffer], { type: mimeType });

      const formData = new FormData();
      formData.append('file', blob, filename);
      formData.append('model', model);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      const res = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const latencyMs = Date.now() - startTime;

      if (!res.ok) {
        const errorText = await res.text().catch(() => '');
        console.warn(`[MoulsotSTT] Erreur statut HTTP ${res.status} : ${errorText}`);
        return {
          success: false,
          error: `Erreur Moulsot STT (${res.status}) : ${errorText || res.statusText}`,
          model,
          latencyMs,
          fallbackClientSupported: true
        };
      }

      const data = await res.json();
      const text = (data.text || '').trim();

      console.log(`[MoulsotSTT] Transcription réussie (${text.length} car., ${latencyMs}ms) : "${text.substring(0, 80)}"`);

      return {
        success: true,
        text,
        model,
        latencyMs,
        provider: 'moulsot-stt'
      };
    } catch (err) {
      const latencyMs = Date.now() - startTime;
      const isTimeout = err.name === 'AbortError';

      console.warn(`[MoulsotSTT] Échec transcription : ${err.message}`);
      return {
        success: false,
        error: isTimeout ? `Timeout (${REQUEST_TIMEOUT_MS}ms) sur Moulsot STT` : `Erreur : ${err.message}`,
        model,
        latencyMs,
        fallbackClientSupported: true
      };
    }
  }
};

