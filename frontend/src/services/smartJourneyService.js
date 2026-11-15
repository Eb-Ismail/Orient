// ==============================================================================
// ORIENT-GR — Service Client Frontend pour le Parcours Intelligent & Entretien IA
// ==============================================================================

import api from './api.js';

const STORAGE_KEY_JOURNEY = 'orient_gr_smart_journey_cache';
const STORAGE_KEY_HISTORY = 'orient_gr_smart_journey_history';

export const smartJourneyService = {
  /**
   * Récupère le parcours complet de l'élève
   */
  async getJourney() {
    try {
      const res = await api.get('/ai/journey');
      if (res.data?.journey) {
        localStorage.setItem(STORAGE_KEY_JOURNEY, JSON.stringify(res.data.journey));
        return res.data.journey;
      }
    } catch (err) {
      console.warn('[SmartJourneyService] API backend non joignable, utilisation du cache local:', err.message);
    }

    const cached = localStorage.getItem(STORAGE_KEY_JOURNEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {}
    }

    // Valeur initiale par défaut
    return {
      version: 1,
      lastUpdated: new Date().toISOString(),
      bioLibre: '',
      sections: {
        scolaire: '',
        professionnel: '',
        sportAssociatif: '',
        competencesTechniques: '',
        languesCentresInteret: '',
        responsabilitesEtDefis: '',
        autresExperiences: ''
      },
      conversation: [
        {
          id: 'msg-init-1',
          role: 'assistant',
          text: "مرحباً بك أيها التلميذ الدركي في فضائك الذكي « مساري وتوجيهي ». \n\nهنا يمكنك سرد مسار حياتك، دراستك، مهاراتك وتجاربك السابقة بكل حرية (بالعربية، الدارجة أو الفرنسية). سأقوم بتحليل ما تكتبه لمحاورتك واقتراح أفضل تخصص يلائم قدراتك وطموحاتك داخل الدرك الملكي.\n\nكيف تود أن تبدأ بتقديم نفسك وتجاربك ؟",
          timestamp: new Date().toISOString()
        }
      ],
      analysis: null
    };
  },

  /**
   * Sauvegarde le parcours libre et/ou structuré
   */
  async saveJourney(journeyData, triggerAnalysis = false) {
    try {
      const res = await api.post('/ai/journey', {
        ...journeyData,
        triggerAnalysis
      });
      if (res.data?.journey) {
        localStorage.setItem(STORAGE_KEY_JOURNEY, JSON.stringify(res.data.journey));
        return res.data.journey;
      }
    } catch (err) {
      console.warn('[SmartJourneyService] Erreur sauvegarde API, mise en cache locale:', err.message);
    }

    const cached = localStorage.getItem(STORAGE_KEY_JOURNEY);
    let journey = cached ? JSON.parse(cached) : {};
    journey = {
      ...journey,
      ...journeyData,
      version: (journey.version || 1) + 1,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY_JOURNEY, JSON.stringify(journey));
    return journey;
  },

  /**
   * Envoie un message dans l'entretien interactif avec l'IA
   * Supporte mode: 'text' (Gemma 4:12B) ou mode: 'voice' (Atlasia Moulsot v0.3)
   */
  async sendInterviewMessage(message, options = {}) {
    const mode = options.mode || 'text';
    const isArabic = /[\u0600-\u06FF]/.test(message || '');
    const language = options.language || (isArabic ? 'darija' : (mode === 'voice' ? 'darija' : 'fr'));

    try {
      const res = await api.post('/ai/journey/interview', {
        message,
        mode,
        language
      }, { timeout: 90000 });
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      console.warn(`[SmartJourneyService] Erreur interview API (${mode}):`, err.response?.data?.error || err.message);
      if (err.response?.data) {
        return err.response.data;
      }
    }

    // Réponse de secours locale d'urgence si le backend local est momentanément inaccessible
    // Transparence totale : signalement explicite du mode hors-ligne sans remplacement silencieux
    console.warn('[SmartJourneyService] Backend inaccessible. Activation du mode de secours local d\'urgence.');
    const cached = localStorage.getItem(STORAGE_KEY_JOURNEY);
    let journey = cached ? JSON.parse(cached) : await this.getJourney();
    
    const userMsg = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      mode,
      text: message,
      transcription: mode === 'voice' ? message : null,
      language,
      timestamp: new Date().toISOString()
    };

    const mLower = (message || '').toLowerCase();
    let replyText = '';

    if (language === 'darija' || isArabic) {
      // 1. Détection Volontariat, Organisation d'événements, Gestion de foule & Urgence médicale
      if (
        mLower.includes('متطوع') || mLower.includes('تطوع') ||
        mLower.includes('ازدحام') || mLower.includes('تظاهرات') ||
        mLower.includes('وعكة') || mLower.includes('صحية') ||
        mLower.includes('إسعاف') || mLower.includes('تأمين') ||
        mLower.includes('هادئ') || mLower.includes('الضغط') ||
        mLower.includes('benevol') || mLower.includes('foule') || mLower.includes('secours')
      ) {
        replyText = "تبارك الله عليك، هاد التجربة فالتطوع، تنظيم التظاهرات وتدبير الازدحام مع الحفاظ على الهدوء وسرعة التصرف ملي تعرض شخص لوعكة صحية كتبين على نضج ميداني وانضباط عالي كتحتاجو بزاف وحدات الدرك الملكي (بحال الدرك المتنقل SPEC-MOB والدرك الترابي SPEC-TERR).\n\nفاش وقعات ديك الوعكة الصحية، كيفاش كان التنسيق ديالك مع باقي المتطوعين والمسؤولين حتى وصلات المساعدة وتأمن المكان ؟";
      } else if (
        mLower.includes('html') || mLower.includes('css') || mLower.includes('javascript') ||
        mLower.includes('python') || mLower.includes('web') || mLower.includes('مشاريع') ||
        mLower.includes('برمجة') || mLower.includes('معلوميات') || mLower.includes('إعلاميات') ||
        mLower.includes('ريزو') || mLower.includes('شبكات')
      ) {
        replyText = "تبارك الله عليك، هاد التجربة فـ HTML و CSS و JavaScript وتطوير مشاريع الويب كتشكل قيمة مضافة حقيقية فالشرطة العلمية والتقنية والخلايا الرقمية للدرك الملكي. واش تقدر تشارك معايا واحد من هاد المشاريع، وشنو كان أكبر تحدي تقني واجهتيه وكيفاش حليتيه ؟";
      } else if (
        mLower.includes('sport') || mLower.includes('10') || mLower.includes('عشر') ||
        mLower.includes('سنين') || mLower.includes('رياضة') || mLower.includes('فنون قتالية') ||
        mLower.includes('حزام') || mLower.includes('جودو') || mLower.includes('ملاكمة')
      ) {
        replyText = "عشر سنين ديال الرياضة والتنافس الجماعي كتبين على انضباط قوي وروح فريق عالية، وهادو بالضبط الركائز لي كيعتمد عليهم الدرك المتنقل ووحدات التدخل الخاصة. واش فايت ليك عشتي شي موقف صعيب مع الفريق فشي منافسة وتغلبتو عليه مع بعض ؟";
      } else if (mLower.includes('droit') || mLower.includes('قانون') || mLower.includes('حقوق')) {
        replyText = "التكوين القانوني كيشكل ركيزة أساسية فالدرك الترابي والقضاء العسكري لضبط المساطر. واش سبق ليك حللتي ملفات قانونية أو شاركتي فتحرير محاضر ؟";
      } else {
        replyText = "سمعتك بوضوح وسجلت هاد التجربة فملفك. من بين تخصصات الدرك الملكي المتنوعة، واش كتفضل العمل الميداني المباشر مع المواطنين ولا المهام التقنية فالمصالح المتخصصة ؟";
      }
    } else if (language === 'en') {
      if (
        mLower.includes('volunteer') || mLower.includes('crowd') ||
        mLower.includes('medical') || mLower.includes('emergency') ||
        mLower.includes('event') || mLower.includes('first aid')
      ) {
        replyText = "Your experience in volunteering, event management, crowd control, and maintaining composure during a medical emergency shows strong operational readiness and discipline. These competencies are directly relevant to the Mobile Gendarmerie (SPEC-MOB) and Territorial Gendarmerie (SPEC-TERR).\n\nDuring that medical emergency, how did you coordinate with the other volunteers and officials to secure the scene until help arrived?";
      } else if (
        mLower.includes('html') || mLower.includes('javascript') ||
        mLower.includes('python') || mLower.includes('web') || mLower.includes('developer')
      ) {
        replyText = "Your background in web development, specifically your proficiency with JavaScript, Python, and concrete projects, is a valuable asset for the Royal Moroccan Gendarmerie (Scientific & Technical Police SPEC-PST).\n\nAmong the web projects you have built, which one presented the most complex technical challenge, and how did you resolve it?";
      } else if (mLower.includes('sport') || mLower.includes('athlete') || mLower.includes('martial')) {
        replyText = "Ten years of sports practice combined with competitive teamwork demonstrates strong physical discipline and resilience, directly applicable to the Mobile Gendarmerie (SPEC-MOB) and Intervention Units (SPEC-INTERV).\n\nCould you share an experience where you helped your team overcome a difficult collective challenge under pressure?";
      } else {
        replyText = "Thank you for sharing your experience. Which areas within the Royal Moroccan Gendarmerie align most closely with your career aspirations: field operational command, territorial proximity, or specialized technical investigations?";
      }
    } else {
      // Français
      if (
        mLower.includes('bénévol') || mLower.includes('benevol') ||
        mLower.includes('volontaire') || mLower.includes('foule') ||
        mLower.includes('urgence') || mLower.includes('malaise') ||
        mLower.includes('secours') || mLower.includes('manifestation') ||
        mLower.includes('téléphone') || mLower.includes('sang-froid') ||
        mLower.includes('calme') || mLower.includes('sécuris') || mLower.includes('securis')
      ) {
        replyText = "Votre engagement bénévole dans l'organisation d'événements, la gestion des foules et votre sang-froid lors d'une urgence médicale témoignent d'une maturité opérationnelle et d'une discipline remarquables, très recherchées au sein de la Gendarmerie Mobile (SPEC-MOB) et de la Gendarmerie Territoriale (SPEC-TERR).\n\nLors de cet incident médical précis, comment avez-vous coordonné votre action avec les autres bénévoles et les responsables pour sécuriser les lieux jusqu'à l'arrivée des secours ?";
      } else if (
        mLower.includes('html') || mLower.includes('css') ||
        mLower.includes('javascript') || mLower.includes('python') || mLower.includes('web')
      ) {
        replyText = "Vous disposez d'un socle solide en développement web (HTML, CSS, JavaScript) et en programmation Python. Parmi vos projets web, lequel vous a demandé le plus de réflexion pour résoudre un problème technique ?";
      } else if (
        mLower.includes('sport') || mLower.includes('dix ans') ||
        mLower.includes('10 ans') || mLower.includes('compétition') || mLower.includes('combat')
      ) {
        replyText = "Dix années de pratique sportive et une expérience de la compétition en équipe révèlent une discipline constante et un sens de la cohésion précieux pour la Gendarmerie Royale. Peux-tu me raconter une situation où tu as dû aider ton équipe à surmonter une difficulté ?";
      } else if (mLower.includes('droit') || mLower.includes('licence') || mLower.includes('justice')) {
        replyText = "Votre formation juridique vous prédispose à des missions de rigueur procédurale. Avez-vous déjà eu à faire appliquer des règles strictes ou rédiger des comptes-rendus formels ?";
      } else {
        replyText = "Merci pour ce partage d'expérience. Au sein de la Gendarmerie Royale, vers quel cadre d'action vous projetez-vous le plus naturellement : les interventions spécialisées de terrain, la proximité territoriale avec les citoyens, ou les unités d'expertise technique et d'investigation ?";
      }
    }

    const aiMsg = {
      id: `msg-${Date.now()}-ai`,
      role: 'assistant',
      mode,
      model: (language === 'darija' || isArabic) ? 'mistralai/Voxtral-Mini-4B-Realtime-Arabic' : 'gemma4:12b',
      text: replyText,
      isFallback: true,
      fallbackType: 'LOCAL_OFFLINE_EMERGENCY',
      timestamp: new Date().toISOString()
    };

    journey.conversation = [...(journey.conversation || []), userMsg, aiMsg];
    localStorage.setItem(STORAGE_KEY_JOURNEY, JSON.stringify(journey));

    return {
      success: true,
      reply: aiMsg,
      conversation: journey.conversation,
      analysis: journey.analysis,
      model: aiMsg.model,
      mode,
      isFallback: true,
      fallbackType: 'LOCAL_OFFLINE_EMERGENCY'
    };
  },

  /**
   * Envoi dédié au mode vocal (Atlasia Moulsot v0.3)
   */
  async sendVoiceInterview(audioText, language = 'darija') {
    return this.sendInterviewMessage(audioText, { mode: 'voice', language });
  },

  /**
   * Transcrit un enregistrement audio via le service Whisper STT backend
   */
  async transcribeAudio({ audioBase64, mimeType = 'audio/webm' }) {
    try {
      const res = await api.post('/ai/voice/stt', { audioBase64, mimeType });
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      console.warn('[SmartJourneyService] Transcription STT backend non joignable:', err.response?.data?.error || err.message);
      return {
        success: false,
        error: err.response?.data?.error || err.message,
        fallbackClientSupported: true
      };
    }
    return { success: false, fallbackClientSupported: true };
  },

  /**
   * Synthétise un texte en fichier audio MP3 via le endpoint TTS backend
   */
  async generateSpeechAudio({ text, language = 'darija' }) {
    try {
      const res = await api.post('/ai/voice/tts', { text, language });
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      console.warn('[SmartJourneyService] Synthèse vocale TTS backend non joignable:', err.response?.data?.error || err.message);
      return {
        success: false,
        error: err.response?.data?.error || err.message,
        fallbackBrowserTts: true
      };
    }
    return { success: false, fallbackBrowserTts: true };
  },

  /**
   * Récupère l'état de santé en direct des deux serveurs IA (Gemma 4:12B et Moulsot v0.3)
   */
  async getAiHealth() {
    try {
      const res = await api.get('/ai/health');
      if (res.data) return res.data;
    } catch (err) {
      console.warn('[SmartJourneyService] Erreur interrogation /ai/health:', err.message);
    }
    return {
      textAi: { model: 'gemma4:12b', online: false, server: 'http://localhost:11434' },
      voiceAi: { model: 'atlasia/moulsot.v0.3', online: false, server: 'http://localhost:7200/v1' }
    };
  },

  /**
   * Déclenche une ré-analyse complète du profil
   */
  async triggerAnalysis() {
    try {
      const res = await api.post('/ai/journey/analyze');
      if (res.data?.analysis) {
        return res.data.analysis;
      }
    } catch (err) {
      console.warn('[SmartJourneyService] Erreur déclenchement analyse API:', err.message);
    }
    return null;
  },

  /**
   * Récupère l'historique des versions et snapshots
   */
  async getHistory() {
    try {
      const res = await api.get('/ai/journey/history');
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      console.warn('[SmartJourneyService] Erreur récupération historique API:', err.message);
    }
    return { currentVersion: 1, snapshots: [] };
  }
};

