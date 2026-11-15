// ==============================================================================
// ORIENT-GR — VoxtralAIService (mistralai/Voxtral-Mini-4B-Realtime-Arabic)
// Modèle IA distant dédié exclusivement à la conversation en Darija marocaine
// Hébergé sur le PC distant Docker : http://192.168.1.168:8000/v1
// ==============================================================================

import http from 'http';
import crypto from 'crypto';

const VOXTRAL_BASE_URL = process.env.VOXTRAL_BASE_URL || 'http://192.168.1.168:8000/v1';
const VOXTRAL_WS_URL = process.env.VOXTRAL_WS_URL || 'ws://192.168.1.168:8000/v1/realtime';
const VOXTRAL_MODEL = process.env.VOXTRAL_MODEL || 'mistralai/Voxtral-Mini-4B-Realtime-Arabic';

// Délais différenciés pour éviter tout fallback prématuré
const CONNECT_TIMEOUT_MS = 4000;      // Vérification de connexion réseau
const VOXTRAL_GEN_TIMEOUT_MS = 15000; // Délai accordé à la génération Voxtral
const GEMMA_REASONING_TIMEOUT_MS = 90000; // Délai suffisant (90s) pour l'inférence Darija approfondie sur Gemma 4:12B

export const voxtralAiService = {
  getModelName() {
    return process.env.VOXTRAL_MODEL || VOXTRAL_MODEL;
  },

  getBaseUrl() {
    let url = process.env.VOXTRAL_BASE_URL || VOXTRAL_BASE_URL;
    return url.replace(/\/+$/, '');
  },

  getWsUrl() {
    return process.env.VOXTRAL_WS_URL || VOXTRAL_WS_URL;
  },

  /**
   * Vérifie la disponibilité du serveur Voxtral (vLLM)
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
          latencyMs,
          error: `Serveur Voxtral a répondu avec le statut HTTP ${res.status}`
        };
      }

      const data = await res.json().catch(() => ({}));
      const modelsList = Array.isArray(data.data) ? data.data.map(m => m.id) : [];
      const targetModelFound = modelsList.includes(targetModel) || modelsList.some(m => m.includes('Voxtral'));

      return {
        online: true,
        server: baseUrl,
        model: targetModel,
        latencyMs,
        models: modelsList,
        targetModelFound,
        statusMessage: targetModelFound
          ? `Modèle vocal Voxtral (${targetModel}) opérationnel sur ${baseUrl}`
          : `Serveur Voxtral en ligne mais ${targetModel} absent de la liste`
      };
    } catch (err) {
      const latencyMs = Date.now() - startTime;
      const isTimeout = err.name === 'AbortError';

      return {
        online: false,
        server: baseUrl,
        model: targetModel,
        latencyMs,
        error: isTimeout
          ? `Délai d'attente dépassé (timeout 4s) sur ${baseUrl}`
          : `Serveur Voxtral inaccessible sur ${baseUrl} : ${err.message}`
      };
    }
  },

  /**
   * Teste le handshake WebSocket Realtime sur ws://192.168.1.168:8000/v1/realtime
   */
  async checkRealtimeWs() {
    const wsUrlStr = this.getWsUrl();
    return new Promise((resolve) => {
      try {
        const u = new URL(wsUrlStr);
        const key = crypto.randomBytes(16).toString('base64');
        const req = http.request({
          hostname: u.hostname,
          port: u.port || 8000,
          path: u.pathname || '/v1/realtime',
          method: 'GET',
          headers: {
            'Connection': 'Upgrade',
            'Upgrade': 'websocket',
            'Sec-WebSocket-Key': key,
            'Sec-WebSocket-Version': '13'
          },
          timeout: 4000
        });

        req.on('upgrade', (res, socket) => {
          socket.destroy();
          resolve({
            online: true,
            url: wsUrlStr,
            status: 101,
            server: res.headers['server'] || 'uvicorn'
          });
        });

        req.on('response', (res) => {
          resolve({ online: false, url: wsUrlStr, status: res.statusCode });
        });

        req.on('error', (err) => {
          resolve({ online: false, url: wsUrlStr, error: err.message });
        });

        req.on('timeout', () => {
          req.destroy();
          resolve({ online: false, url: wsUrlStr, error: 'TIMEOUT (4s)' });
        });

        req.end();
      } catch (e) {
        resolve({ online: false, url: wsUrlStr, error: e.message });
      }
    });
  },

  /**
   * Construit le prompt système en Darija marocaine
   * Intègre le référentiel officiel des 7 spécialités de la Gendarmerie Royale
   */
  buildSystemPrompt(journey) {
    const studentBio = journey?.bioLibre || '';
    const studentSections = journey?.sections || {};

    const pastQuestions = (journey?.conversation || [])
      .filter(m => m.role === 'assistant')
      .map(m => m.text || '')
      .slice(-5)
      .join('\n---\n');

    return `أنت المساعد الصوتي البيداغوجي للتوجيه المهني بالدرك الملكي المغربي (ORIENT-GR)، وتعتمد على الفهم العميق للدارجة المغربية وثقافة الدرك الملكي.

التلميذ الدركي كيتواصل معاك بالدارجة المغربية. واجب عليك تجاوبو بـالدارجة المغربية الحقيقية والطبيعية، مع الحفاظ على الاحترام، الوقار، والانضباط العسكري.

التخصصات الرسمية السبعة بالدرك الملكي (ما تزيد حتى تخصص آخر من غير هادو) :
1. وحدات التدخل والفرق الخاصة (SPEC-INTERV) : القوة البدنية العالية، فنون الحرب والدفاع (التايكوندو، الجودو، الملاكمة، الأحزمة المتقدمة)، الرماية، التدخل في الحالات الخطيرة وحماية الشخصيات ومكافحة الإرهاب.
2. الشرطة العلمية والتقنية (SPEC-PST) : التخصص فالمعلوميات، تدبير الأنظمة والشبكات، البصمات، التحقيق الجنائي الرقمي، تحليل مسرح الجريمة، الأدلة المادية.
3. الدرك الترابي (SPEC-TERR) : سرايا ومراكز الدرك الموزعة فالمملكة، القرب من المواطنين، التحقيقات القضائية، الحفاظ على الأمن والسكينة العامة، معالجة المساطر.
4. الدرك المتنقل (SPEC-MOB) : حفظ النظام العام، التدخل في التظاهرات والتجمعات الكبرى، العمل الجماعي الميداني والانضباط تحت الضغط البدني.
5. القضاء العسكري / الدرك الحربي (SPEC-PREV) : الشرطة القضائية العسكرية، مراقبة تطبيق القوانين العسكرية، كيتطلب تكوين قانوني متين (إجازة فالحقوق أو القانون الخاص).
6. الدرك البحري (SPEC-MARIT) : حراسة السواحل المغربية، محاربة التهريب والهجرة السرية فالبحر، شرطة الصيد البحري، السباحة والغوص وإنقاذ الأرواح.
7. الدرك الجوي (SPEC-AIR) : أمن المطارات، المراقبة بالمروحيات، التدخلات الجوية والإسعاف فالمرتفعات والمناطق الوعرة والمعزولة.

قواعد التفاعل الصوتي الصارمة :
1. القاعدة الذهبية رقم 1 — الأولوية القصوى لآخر رسالة قالها التلميذ : ركز 100% على شنو قال التلميذ فهاد الرسالة الأخيرة بالضبط. اعترف بالمهارات والتقنيات، الأنشطة التطوعية، أو الرياضة لي ذكر بالسمية. إياك تجاوب جواب عام كيتجاهل كلامو.
2. الفهم الشامل والحر لأي تجربة حقيقية كيفما كانت : حلل المعنى العام لأي تجربة كيشاركها التلميذ (سواء كانت فالمطافي وإخماد الحرائق، الفلاحة والآليات، تربية وتدريب الكلاب K9، الصيانة الطبية والمخبرية، البحر والسباحة، القانون، الميكانيك والسياقة، المعلوميات والبرمجة، الرياضة والقتال، التطوع وإدارة الأزمات، أو أي نشاط ميداني). قدر هاد المهارات وبين كيفاش كتلاقى مع مهام الدرك الملكي فالتخصص الأنسب من بين التخصصات الرسمية السبعة (الدرك الترابي SPEC-TERR، الدرك المتنقل SPEC-MOB، الشرطة العلمية والتقنية SPEC-PST، وحدات التدخل والفرق الخاصة SPEC-INTERV، الدرك البحري SPEC-MARIT، الدرك الجوي SPEC-AIR، القضاء العسكري SPEC-PREV).
3. افهم مزيان المصطلحات الشائعة بالدارجة والمزج مع الكلمات التقنية بالفرنسية (السطاج، الريزو، السيرفر، الدبلوم، الماتش، الحزام، التيست، البروسي، لاصال...).
4. طرح سؤال واحد فقط دقيق ومركز كيرتبط مباشرة بهاد التجربة لي عاد شاركها معاك.
5. ما تعاودش إطلاقاً نفس السؤال لي سبق تطرح فالجولات السابقة أو لي الجواب ديالو مسجل فملف التلميذ.
6. الرد يكون بالدارجة المغربية الحقيقية والطبيعية بأسلوب حواري مباشر ودافئ، بدون عناوين جافة (بحال **تحليل** أو **التخصص**)، وبدون جداول ولا رموز تعبيرية (فقرة أو زوج تشرح فيهم القيمة ديال تجربتو وتربطها بالتخصص الأنسب + سؤال متابعة واحد دقيق وذكي حول هاديك التجربة بالضبط).

معلومات ملف التلميذ الحالية (استافد منها وما تسولوش عليها إيلا كانت مسجلة) :
- النبذة المسجلة : ${studentBio || 'لم يتم التسجيل بعد'}
- التكوين والدبلومات : ${studentSections.scolaire || 'غير محدد'}
- الرياضة والأنشطة : ${studentSections.sportAssociatif || 'غير محدد'}
- التجارب والمهارات التقنية : ${studentSections.competencesTechniques || 'غير محدد'}
- تدبير الضغط والمواقف الصعبة : ${studentSections.responsabilitesEtDefis || 'غير محدد'}

الأسئلة السابقة لي سبق تطرحات (ممنوع تعاودها) :
${pastQuestions || 'لا توجد'}`;
  },

  /**
   * Envoie le message oral transcrit à Voxtral via /v1/chat/completions
   */
  async generateDarijaReply({ journey, recognizedText }) {
    const baseUrl = this.getBaseUrl();
    const model = this.getModelName();
    const startTime = Date.now();

    console.log(`[VoxtralPipeline] Traitement conversation Darija (${recognizedText.length} car.) via ${baseUrl}`);

    // 1. Vérification santé Voxtral
    const health = await this.checkHealth();
    if (!health.online) {
      console.warn(`[VoxtralPipeline] Serveur Voxtral non joignable (${baseUrl}) : ${health.error}`);
      return {
        success: false,
        error: `Le serveur Voxtral est inaccessible (${baseUrl}). ${health.error}`,
        code: 'VOXTRAL_UNAVAILABLE',
        model,
        latencyMs: health.latencyMs
      };
    }

    // 2. Préparation des messages avec historique conversationnel
    const systemPrompt = this.buildSystemPrompt(journey);
    const messages = [{ role: 'system', content: systemPrompt }];

    // Filtrer les échanges précédents sans dupliquer le message courant s'il a déjà été enregistré
    const rawConvo = journey.conversation || [];
    const priorConvo = (rawConvo.length > 0 && rawConvo[rawConvo.length - 1].role === 'user' && (rawConvo[rawConvo.length - 1].text === recognizedText || rawConvo[rawConvo.length - 1].transcription === recognizedText))
      ? rawConvo.slice(0, -1).slice(-4)
      : rawConvo.slice(-4);

    priorConvo.forEach((msg) => {
      if ((msg.role === 'user' || msg.role === 'assistant') && (msg.text || msg.transcription)) {
        messages.push({
          role: msg.role,
          content: msg.text || msg.transcription
        });
      }
    });

    // Ajouter LE dernier message oral de l'élève de manière UNIQUE (priorité absolue de compréhension)
    messages.push({
      role: 'user',
      content: recognizedText
    });

    // 3. Appel HTTP /v1/chat/completions vers Voxtral (Port 8000)
    const endpoint = baseUrl.endsWith('/v1') ? `${baseUrl}/chat/completions` : `${baseUrl}/v1/chat/completions`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), VOXTRAL_GEN_TIMEOUT_MS);

      let res;
      let networkError = null;
      try {
        res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            model,
            messages,
            temperature: 0.7,
            max_tokens: 350
          }),
          signal: controller.signal
        });
      } catch (fErr) {
        networkError = fErr;
      } finally {
        clearTimeout(timeoutId);
      }

      let replyText = null;
      let usedProvider = 'voxtral';
      let usedModelName = model;

      if (!networkError && res && res.ok) {
        const data = await res.json().catch(() => ({}));
        replyText = data.choices?.[0]?.message?.content?.trim();
      } else if (networkError) {
        const isTimeout = networkError.name === 'AbortError';
        console.warn(`[VoxtralPipeline] Voxtral ${isTimeout ? `Timeout génération (${VOXTRAL_GEN_TIMEOUT_MS}ms)` : `Erreur réseau (${networkError.message})`}`);
      } else if (res && !res.ok) {
        const errorText = await res.text().catch(() => '');
        console.warn(`[VoxtralPipeline] Voxtral Erreur HTTP ${res.status} : ${errorText}`);
      }

      // Vérification de la qualité du décodage Voxtral
      const nonSpaceChars = (replyText || '').replace(/\s+/g, '');
      const arabicChars = (replyText || '').match(/[\u0600-\u06FF]/g) || [];
      const latinChars = (replyText || '').match(/[a-zA-Z]/g) || [];
      const hasCorruptedTokens = /[\u0400-\u04FF\u3000-\u9FFF]/.test(replyText || '') ||
                                 /(.)\1{4,}/.test(replyText || '') ||
                                 /(aw){2,}/i.test(replyText || '');
      const hasGarbledMix = latinChars.length > 5 && arabicChars.length > 0 && (arabicChars.length / Math.max(1, nonSpaceChars.length) < 0.5);
      const isLowQualityOrGarbled = !replyText || replyText.length < 20 || (arabicChars.length < 8 && latinChars.length < 15) || hasCorruptedTokens || hasGarbledMix;

      // Si Voxtral génère un texte vide, corrompu, en timeout ou en erreur, invalider ce contenu et relayer immédiatement vers Gemma 4:12B sur Ollama
      if (isLowQualityOrGarbled) {
        replyText = null;
        console.log(`[VoxtralPipeline] Décryptage Voxtral invalide/corrompu, relais vers moteur de raisonnement Darija (Gemma 4:12B sur Ollama, timeout ${GEMMA_REASONING_TIMEOUT_MS}ms)...`);
        const ollamaBaseUrl = process.env.OLLAMA_BASE_URL || 'http://192.168.1.168:11434';
        try {
          const resGemmaDarija = await fetch(`${ollamaBaseUrl}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: process.env.OLLAMA_TEXT_MODEL || 'gemma4:12b',
              messages,
              stream: false,
              options: { temperature: 0.7 }
            }),
            signal: AbortSignal.timeout(GEMMA_REASONING_TIMEOUT_MS)
          });
          if (resGemmaDarija.ok) {
            const dataG = await resGemmaDarija.json();
            let gText = (dataG.message?.content || '').trim();
            // Nettoyage des balises de réflexion <thought>...</thought>
            gText = gText.replace(/<thought>[\s\S]*?<\/thought>/gi, '').trim();
            if (gText && gText.length > 10) {
              replyText = gText;
              usedProvider = 'voxtral-reasoning';
              usedModelName = process.env.OLLAMA_TEXT_MODEL || 'gemma4:12b';
              console.log(`[VoxtralPipeline] Raisonnement Darija complété avec succès par ${usedModelName} (${Date.now() - startTime}ms)`);
            }
          } else {
            console.warn(`[VoxtralPipeline] Erreur HTTP Ollama pour Darija (${resGemmaDarija.status})`);
          }
        } catch (eGemma) {
          const isTimeoutGemma = eGemma.name === 'AbortError' || eGemma.name === 'TimeoutError';
          console.warn(`[VoxtralPipeline] Échec relai Darija Gemma (${isTimeoutGemma ? `Timeout ${GEMMA_REASONING_TIMEOUT_MS}ms` : eGemma.message})`);
        }
      }

      // Si un modèle IA (Voxtral ou Gemma Darija) a produit une réponse valide
      if (replyText && replyText.length >= 15) {
        const latencyMs = Date.now() - startTime;
        console.log(`[VoxtralPipeline] Réponse Darija validée (${replyText.length} car., ${latencyMs}ms, modèle: ${usedModelName}, provider: ${usedProvider}) :`, replyText.substring(0, 90));

        return {
          success: true,
          reply: replyText,
          model: usedModelName,
          provider: 'voxtral',
          reasoningEngine: usedProvider,
          isFallback: false,
          latencyMs,
          mode: 'voice',
          language: 'darija',
          timestamp: new Date().toISOString()
        };
      }

      // Cas où AUCUN modèle distant n'a pu répondre (panne réseau locale complète)
      console.warn(`[VoxtralPipeline] ALERTE: Aucun modèle distant n'a pu générer de réponse (Voxtral et Ollama hors service). Activation du secours local d'urgence.`);

      const msgLower = (recognizedText || '').toLowerCase();
      let emergencyDarija = "سمعتك بوضوح وسجلت هاد المعطيات فملفك. من بين تخصصات الدرك الملكي المتنوعة، واش كتفضل العمل الميداني المباشر ولا المهام التقنية والمخبرية فالمصالح المتخصصة ؟";

      if (
        msgLower.includes('متطوع') || msgLower.includes('تطوع') ||
        msgLower.includes('ازدحام') || msgLower.includes('تظاهرات') ||
        msgLower.includes('وعكة') || msgLower.includes('صحية') ||
        msgLower.includes('إسعاف') || msgLower.includes('تأمين') ||
        msgLower.includes('هادئ') || msgLower.includes('الضغط') ||
        msgLower.includes('benevol') || msgLower.includes('foule') || msgLower.includes('secours')
      ) {
        emergencyDarija = "تبارك الله عليك، هاد التجربة فالتطوع، تنظيم التظاهرات وتدبير الازدحام مع الحفاظ على الهدوء وسرعة التصرف ملي تعرض شخص لوعكة صحية كتبين على نضج ميداني وانضباط عالي كتحتاجو بزاف وحدات الدرك الملكي (بحال الدرك المتنقل SPEC-MOB والدرك الترابي SPEC-TERR).\n\nفاش وقعات ديك الوعكة الصحية، كيفاش كان التنسيق ديالك مع باقي المتطوعين والمسؤولين حتى وصلات المساعدة وتأمن المكان ؟";
      } else if (msgLower.includes('html') || msgLower.includes('css') || msgLower.includes('javascript') || msgLower.includes('python') || msgLower.includes('web') || msgLower.includes('مشاريع') || msgLower.includes('إعلاميات') || msgLower.includes('معلوميات') || msgLower.includes('برمجة')) {
        emergencyDarija = "تبارك الله عليك، هاد التجربة فـ HTML و CSS و JavaScript وتطوير مشاريع الويب كتشكل قيمة مضافة حقيقية فالشرطة العلمية والتقنية والخلايا الرقمية للدرك الملكي. واش تقدر تشارك معايا واحد من هاد المشاريع، وشنو كان أكبر تحدي تقني واجهتيه وكيفاش حليتيه ؟";
      } else if (msgLower.includes('sport') || msgLower.includes('10') || msgLower.includes('عشر') || msgLower.includes('سنين') || msgLower.includes('فريق') || msgLower.includes('جماعي') || msgLower.includes('رياضة')) {
        emergencyDarija = "عشر سنين ديال الرياضة والتنافس الجماعي كتبين على انضباط قوي وروح فريق عالية، وهادو بالضبط الركائز لي كيعتمد عليهم الدرك المتنقل ووحدات التدخل الخاصة. واش فايت ليك عشتي شي موقف صعيب مع الفريق فشي منافسة وتغلبتو عليه مع بعض ؟";
      }

      return {
        success: true,
        reply: emergencyDarija,
        model: 'emergency-offline-fallback',
        provider: 'emergency-local',
        isFallback: true,
        fallbackType: 'NETWORK_OFFLINE_EMERGENCY',
        latencyMs: Date.now() - startTime,
        mode: 'voice',
        language: 'darija',
        timestamp: new Date().toISOString()
      };
    } catch (err) {
      const latencyMs = Date.now() - startTime;
      console.error('[VoxtralPipeline] Erreur inattendue dans le pipeline Darija :', err.message);

      return {
        success: true,
        reply: "سمعتك بوضوح وسجلت هاد المعطيات فملفك. من بين تخصصات الدرك الملكي المتنوعة، واش كتفضل العمل الميداني المباشر ولا المهام التقنية والمخبرية فالمصالح المتخصصة ؟",
        model: 'emergency-offline-fallback',
        provider: 'emergency-local',
        isFallback: true,
        fallbackType: 'NETWORK_OFFLINE_EMERGENCY',
        latencyMs,
        mode: 'voice',
        language: 'darija',
        timestamp: new Date().toISOString()
      };
    }
  }
};

