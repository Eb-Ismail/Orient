// ==============================================================================
// ORIENT-GR — TextAIService (Gemma 4:12B via Ollama)
// Service IA dédié exclusivement au mode écrit : analyse de parcours,
// entretien écrit approfondi, analyse de profil, ventilation multi-commissions,
// évaluation post-jury et synthèse administrative pour le Commandement.
// ==============================================================================

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://192.168.1.168:11434';
const OLLAMA_TEXT_MODEL = process.env.OLLAMA_TEXT_MODEL || 'gemma4:12b';
const REQUEST_TIMEOUT_MS = 90000; // 90 secondes avec marge confortable pour modèles raisonnés

/**
 * Nettoie et extrait du JSON valide depuis la réponse d'un LLM
 */
function extractJsonFromReply(text) {
  if (!text || typeof text !== 'string') return null;
  let cleaned = text.trim();
  // Retirer les balises <thought>...</thought>
  cleaned = cleaned.replace(/<thought>[\s\S]*?<\/thought>/gi, '').trim();
  // Retirer les blocs markdown ```json ... ```
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '').trim();
  }
  // Trouver le premier { ou [ et le dernier } ou ]
  const firstBrace = cleaned.indexOf('{');
  const firstBracket = cleaned.indexOf('[');
  let startIdx = -1;
  let endIdx = -1;
  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    startIdx = firstBrace;
    endIdx = cleaned.lastIndexOf('}');
  } else if (firstBracket !== -1) {
    startIdx = firstBracket;
    endIdx = cleaned.lastIndexOf(']');
  }
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    try {
      return JSON.parse(cleaned.substring(startIdx, endIdx + 1));
    } catch (e) {
      // Ignorer l'erreur d'extraction partielle
    }
  }
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    return null;
  }
}

export const textAiService = {
  getModelName() {
    return process.env.OLLAMA_TEXT_MODEL || OLLAMA_TEXT_MODEL;
  },

  getBaseUrl() {
    return process.env.OLLAMA_BASE_URL || OLLAMA_BASE_URL;
  },

  /**
   * Vérifie la disponibilité du serveur Ollama et la présence du modèle gemma4:12b
   */
  async checkHealth() {
    const baseUrl = this.getBaseUrl();
    const targetModel = this.getModelName();
    const startTime = Date.now();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(`${baseUrl}/api/tags`, {
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
          error: `Ollama a répondu avec le statut HTTP ${res.status}`
        };
      }

      const data = await res.json();
      const models = Array.isArray(data.models) ? data.models.map(m => m.name) : [];
      const targetModelFound = models.some(m => m === targetModel || m.startsWith(`${targetModel}:`));

      return {
        online: true,
        server: baseUrl,
        model: targetModel,
        latencyMs,
        models,
        targetModelFound,
        statusMessage: targetModelFound
          ? `Modèle ${targetModel} prêt sur Ollama`
          : `Ollama en ligne mais le modèle ${targetModel} n'est pas encore téléchargé`
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
          ? `Délai d'attente dépassé (timeout) sur ${baseUrl}`
          : `Impossible de joindre Ollama sur ${baseUrl} : ${err.message}`
      };
    }
  },

  /**
   * Méthode générique d'inférence avec Gemma 4:12B via Ollama
   * Gère les timeouts, le format JSON, l'élimination des balises <thought>
   * et renvoie un rapport d'exécution précis.
   */
  async callGemmaChat({ messages, temperature = 0.7, top_p = 0.9, jsonMode = false, timeoutMs = REQUEST_TIMEOUT_MS }) {
    const baseUrl = this.getBaseUrl();
    const model = this.getModelName();
    const startTime = Date.now();

    // Sonde rapide de joignabilité : si hors-ligne, échoue immédiatement sans bloquer 90s
    const health = await this.checkHealth();
    if (!health.online) {
      return {
        success: false,
        online: false,
        error: health.error,
        model,
        latencyMs: health.latencyMs
      };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const res = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages,
          stream: false,
          options: {
            temperature,
            top_p
          }
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const latencyMs = Date.now() - startTime;

      if (!res.ok) {
        return {
          success: false,
          online: false,
          error: `Ollama HTTP ${res.status}`,
          model,
          latencyMs
        };
      }

      const data = await res.json();
      let replyText = data.message?.content?.trim() || '';
      replyText = replyText.replace(/<thought>[\s\S]*?<\/thought>/gi, '').trim();

      let parsedJson = null;
      if (jsonMode) {
        parsedJson = extractJsonFromReply(replyText);
      }

      return {
        success: true,
        online: true,
        reply: replyText,
        data: parsedJson,
        model,
        latencyMs,
        timestamp: new Date().toISOString()
      };
    } catch (err) {
      const latencyMs = Date.now() - startTime;
      const isTimeout = err.name === 'AbortError' || err.name === 'TimeoutError';
      return {
        success: false,
        online: false,
        error: isTimeout ? `Timeout (${timeoutMs}ms) sur Ollama` : err.message,
        model,
        latencyMs
      };
    }
  },

  /**
   * Construit le prompt système pour le modèle texte Gemma 4:12B
   * Intègre le référentiel officiel des 7 spécialités de la Gendarmerie Royale
   */
  buildSystemPrompt(journey, language = 'fr') {
    const studentBio = journey?.bioLibre || '';
    const studentSections = journey?.sections || {};

    const pastQuestions = (journey?.conversation || [])
      .filter(m => m.role === 'assistant')
      .map(m => m.text || '')
      .slice(-5)
      .join('\n---\n');

    if (language === 'en') {
      return `You are the Educational Orientation Advisor AI of the Royal Moroccan Gendarmerie (Gendarmerie Royale Marocaine) on the ORIENT-GR platform.
Your mission is to guide the student gendarme through a structured, respectful, and military-oriented dialogue towards one of the 7 official specialties:

OFFICIAL SPECIALTIES OF THE ROYAL GENDARMERIE (Do not invent any other):
1. Territorial Gendarmerie (SPEC-TERR): Public security, criminal investigations, daily community policing, territorial brigades.
2. Mobile Gendarmerie (SPEC-MOB): Public order maintenance, event security, rapid reinforcement, physical resilience and team discipline.
3. Maritime Gendarmerie (SPEC-MARIT): Coastal surveillance, fisheries policing, port security, maritime rescue, counter-smuggling at sea.
4. Air Gendarmerie (SPEC-AIR): Airport protection, aviation safety, helicopter observation, high-altitude and isolated zone rescue missions.
5. Military Provost (SPEC-PREV): Military criminal procedure, disciplinary compliance within the Armed Forces, court assistance, legal expertise (Law degree / procedures).
6. Scientific and Technical Police (SPEC-PST): Forensics, crime scene processing, ballistic analysis, digital evidence, cyber-investigation (IT / Sciences / Chemistry / Electronics).
7. Intervention and Specialized Units (SPEC-INTERV): Counter-terrorism, high-risk tactical interventions, VIP close protection, hostage rescue, advanced martial arts and marksmanship.

GOLDEN RULE #1 — ABSOLUTE PRIORITY TO THE STUDENT'S LAST MESSAGE:
The student's very last message is the primary focus of your response:
1. CONCRETE ACKNOWLEDGMENT & VALUE: Explicitly acknowledge and validate the specific skills, tools, or experiences mentioned in their last message (e.g. web development, Python, JavaScript, projects; or 10 years of sports, teamwork, competitions). NEVER give a generic or detached answer that ignores their specific statements.
2. RELEVANCE TO GENDARMERIE: Explain clearly how these specific abilities serve the Royal Gendarmerie missions (e.g. SPEC-PST cyber/forensic units for IT; SPEC-MOB / SPEC-INTERV for endurance and teamwork).
3. SINGLE FOCUSED FOLLOW-UP QUESTION: Ask EXACTLY ONE focused follow-up question directly related to their stated experience.
4. NO HALLUCINATION: Never invent unmentioned skills or unofficial specialties.
5. STYLE: Respond strictly in ENGLISH, concise (1-2 paragraphs + 1 follow-up question), formal, encouraging, and military-oriented.

CURRENT STUDENT FILE:
- Biography / Background: ${studentBio || 'Not yet recorded'}
- Studies & Diplomas: ${studentSections.scolaire || 'Not specified'}
- Work & Internships: ${studentSections.professionnel || 'Not specified'}
- Sports & Discipline: ${studentSections.sportAssociatif || 'Not specified'}
- Technical & IT Skills: ${studentSections.competencesTechniques || 'Not specified'}
- Responsibilities & Stress: ${studentSections.responsabilitesEtDefis || 'Not specified'}

RECENT QUESTIONS ALREADY ASKED (DO NOT REPEAT):
${pastQuestions || 'None'}`;
    }

    return `Tu es le Conseiller Pédagogique d'Orientation IA de la Gendarmerie Royale Marocaine au sein de la plateforme officielle ORIENT-GR.
Ton rôle est de mener un entretien approfondi, bienveillant et militairement rigoureux avec l'élève gendarme afin d'analyser ses compétences réelles et d'éclairer son orientation vers l'une des 7 spécialités réglementaires du corps :

RÉFÉRENTIEL OFFICIEL DES 7 SPÉCIALITÉS DE LA GENDARMERIE ROYALE (N'inventer AUCUNE autre spécialité) :
1. Gendarmerie Territoriale (SPEC-TERR) : Sécurité publique générale, police judiciaire quotidienne, brigades territoriales, proximité citoyenne, enquêtes locales, sens du contact et médiation.
2. Gendarmerie Mobile (SPEC-MOB) : Maintien et rétablissement de l'ordre public, sécurité des grands événements, renforts opérationnels, endurance physique, discipline collective de peloton.
3. Gendarmerie Maritime (SPEC-MARIT) : Surveillance des côtes et du littoral, police des pêches, sécurité portuaire, sauvetage en mer, lutte contre les trafics maritimes, permis bateau, natation.
4. Gendarmerie Aérienne (SPEC-AIR) : Sûreté aéroportuaire, sécurité des bases aériennes et aérodromes, observation héliportée, secours en zone montagneuse ou isolée.
5. Prévôté Militaire (SPEC-PREV) : Police judiciaire aux armées, discipline et respect des lois militaires, accompagnement des contingents, assistance aux tribunaux militaires (exige rigueur juridique, diplômes en droit).
6. Police Scientifique et Technique (SPEC-PST) : Criminalistique, gel des lieux, relevé d'empreintes, balistique, analyse d'indices, cyber-investigation et informatique légale (diplômes scientifiques, chimie, biologie, informatique, électronique).
7. Unités d'Intervention et Spécialisées (SPEC-INTERV) : Neutralisation de forcenés, contre-terrorisme, libération d'otages, protection rapprochée de hautes personnalités, interventions à haut risque (condition physique d'élite, tir de précision, sports de combat, sang-froid absolu).

RÈGLE D'OR N°1 — PRIORITÉ ABSOLUE AU DERNIER MESSAGE DE L'ÉLÈVE :
Le dernier message rédigé par l'élève est le sujet central obligatoire de ta réponse :
1. VALORISATION CONCRÈTE : Reprends et valorise précisément les compétences, outils ou situations qu'il vient d'exprimer (par exemple : développement web, JavaScript, Python, projets réels ; ou 10 ans de sport, travail d'équipe, gestion du stress lors d'une urgence médicale). Ne donne JAMAIS une réponse générique ou déconnectée de ses propos.
2. APPLICATION GENDARMERIE : Relie explicitement ces compétences aux missions opérationnelles de la Gendarmerie Royale (ex: développement web / Python vers la SPEC-PST / cybercriminalité ; endurance sportive et calme en crise vers la SPEC-MOB ou SPEC-INTERV).
3. QUESTION DE RELANCE UNIQUE : Pose UNE SEULE question de relance précise, directement liée à l'expérience qu'il vient de relater pour approfondir un cas concret.
4. AUCUNE HALLUCINATION : Ne jamais inventer des compétences que l'élève n'a pas mentionnées et ne jamais citer de spécialités non réglementaires.
5. STYLE : Français soigné, concis (1 à 2 paragraphes + 1 question de relance), bienveillant, solennel et digne de l'institution.

DOSSIER ÉLÈVE ACTUEL :
- Récit / Parcours global : ${studentBio || 'Non encore renseigné'}
- Études & Diplômes : ${studentSections.scolaire || 'Non renseigné'}
- Métiers & Stages : ${studentSections.professionnel || 'Non renseigné'}
- Pratique Sportive & Discipline : ${studentSections.sportAssociatif || 'Non renseigné'}
- Compétences Techniques / Numériques : ${studentSections.competencesTechniques || 'Non renseigné'}
- Responsabilités & Gestion du Stress : ${studentSections.responsabilitesEtDefis || 'Non renseigné'}

HISTORIQUE RÉCENT DES QUESTIONS DÉJÀ POSÉES (NE PAS LES RÉPÉTER) :
${pastQuestions || 'Aucune question préalable'}`;
  },

  /**
   * FONCTIONNALITÉ A : Entretien IA interactif
   */
  async generateTextReply({ journey, userMessage, language = 'fr' }) {
    const baseUrl = this.getBaseUrl();
    const model = this.getModelName();
    const startTime = Date.now();

    const health = await this.checkHealth();
    if (!health.online) {
      return {
        success: false,
        error: `Le modèle conversationnel distant (${model} sur ${baseUrl}) n'est pas disponible. ${health.error}`,
        code: 'CONVERSATIONAL_MODEL_UNAVAILABLE',
        model,
        latencyMs: health.latencyMs
      };
    }

    const systemPrompt = this.buildSystemPrompt(journey, language);
    const messages = [{ role: 'system', content: systemPrompt }];

    const rawConvo = journey.conversation || [];
    const priorConvo = (rawConvo.length > 0 && rawConvo[rawConvo.length - 1].role === 'user' && rawConvo[rawConvo.length - 1].text === userMessage)
      ? rawConvo.slice(0, -1).slice(-4)
      : rawConvo.slice(-4);

    priorConvo.forEach((msg) => {
      if ((msg.role === 'user' || msg.role === 'assistant') && msg.text) {
        messages.push({
          role: msg.role,
          content: msg.text
        });
      }
    });

    messages.push({
      role: 'user',
      content: userMessage
    });

    const callRes = await this.callGemmaChat({ messages, temperature: 0.7, top_p: 0.9 });
    if (!callRes.success || !callRes.reply) {
      return {
        success: false,
        error: callRes.error || "Réponse vide de Gemma 4:12B",
        code: 'INFERENCE_FAILED',
        model,
        latencyMs: callRes.latencyMs
      };
    }

    return {
      success: true,
      reply: callRes.reply,
      model,
      provider: 'ollama',
      isFallback: false,
      latencyMs: callRes.latencyMs,
      mode: 'text',
      timestamp: new Date().toISOString()
    };
  },

  /**
   * FONCTIONNALITÉ B : Analyse intelligente du profil élève par Gemma 4:12B
   */
  async analyzeProfileWithGemma(journey, student) {
    const systemPrompt = `Tu es le Conseiller d'Évaluation des Compétences et Psychologue Référent de la Gendarmerie Royale Marocaine sur la plateforme ORIENT-GR.
Ta mission est d'analyser en profondeur le profil complet d'un élève gendarme à partir de son récit, de ses diplômes déclarés, de ses expériences réelles et de ses échanges lors de l'entretien interactif.
Tu dois évaluer ses compétences réelles, ses dimensions d'aptitude et formuler des préconisations d'orientation objectives.

RÉPONDS STRICTEMENT AU FORMAT JSON SANS AUCUN TEXTE AUTOUR, selon le schéma suivant :
{
  "competencesDetectees": [
    {
      "id": "COMP-CODE",
      "intitule": "Intitulé précis de la compétence",
      "categorie": "Technique | Physique | Humain | Cognitif | Militaire",
      "niveau": "Avancé | Intermédiaire | Notions Déclarées",
      "justification": "Preuve concrète issue des propos ou expériences du candidat"
    }
  ],
  "profilDimensions": {
    "capaciteAnalyse": 85,
    "organisationResponsabilite": 80,
    "communicationEquipe": 90,
    "aptitudeTerrainPhysique": 85
  },
  "pointsForts": [
    "Point fort 1 justifié",
    "Point fort 2 justifié"
  ],
  "pointsVigilance": [
    "Axe de vigilance ou point à vérifier en commission"
  ],
  "syntheseConseiller": "Synthèse globale rédigée en 2-3 phrases sur le profil du candidat."
}`;

    const studentInfo = `
DOSSIER CANDIDAT :
- Nom : ${student?.Nom || 'Élève'} ${student?.Prenom || ''}
- Matricule : ${student?.Matricule || 'Non assigné'}
- Diplôme d'origine : ${student?.DiplomeOrigine || 'Non spécifié'}
- Filière d'entrée : ${student?.FiliereEntree || 'Tronc commun'}
- Récit personnel : ${journey?.bioLibre || journey?.RecitPersonnel || 'Non rédigé'}
- Sections déclarées : ${JSON.stringify(journey?.sections || {})}
- Extraits de conversation avec l'élève :
${(journey?.conversation || []).filter(m => m.role === 'user').map(m => `- ${m.text || m.transcription}`).join('\n')}
`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: studentInfo }
    ];

    return await this.callGemmaChat({ messages, jsonMode: true, temperature: 0.3, top_p: 0.85 });
  },

  /**
   * FONCTIONNALITÉ C : Recommandation d'orientation vers plusieurs commissions par Gemma 4:12B
   */
  async recommendCommissionsWithGemma({ candidate, journey, commissions, workshops = [] }) {
    const systemPrompt = `Tu es l'Expert Stratégique en Affectation et Ventilation Multi-Commissions de la Gendarmerie Royale.
Tu dois analyser le profil d'un élève gendarme et évaluer son adéquation avec les commissions spécialisées de recrutement disponibles.
RÈGLE D'OR : Un élève peut être orienté vers 1 à plusieurs commissions indépendantes si ses compétences le justifient.

RÉPONDS STRICTEMENT AU FORMAT JSON SANS AUCUN TEXTE AUTOUR, selon ce schéma :
{
  "commissions": [
    {
      "code": "CODE_COMMISSION (ex: COMM_INFO, COMM_RESEAUX, COMM_MECA, COMM_CYBER, COMM_ELEC, COMM_POLICE_SCIENTIFIQUE, COMM_LOGISTIQUE)",
      "scoreCorrespondance": 85,
      "justification": "Explication circonstanciée démontrant pourquoi le profil convient à cette commission",
      "competencesCles": ["Compétence 1", "Compétence 2", "Compétence 3"],
      "pointsAVerifier": ["Point technique précis à tester lors de l'épreuve pratique"]
    }
  ]
}`;

    const candidateDetails = `
CANDIDAT :
- Nom : ${candidate?.Nom || ''} ${candidate?.Prenom || ''}
- Diplôme d'origine : ${candidate?.DiplomeOrigine || 'Général'}
- Spécialité d'origine : ${candidate?.SpecialiteOrigine || ''}
- Filière : ${candidate?.FiliereEntree || ''}
- Récit & Bio : ${journey?.bioLibre || journey?.RecitPersonnel || ''}
- Ateliers pratiques déjà validés : ${workshops.map(w => `${w.Titre} (${w.NoteSur20 ? w.NoteSur20 + '/20' : 'validé'})`).join(', ') || 'Aucun'}
- Échanges d'entretien : ${(journey?.conversation || []).filter(m => m.role === 'user').map(m => m.text).slice(-4).join(' | ')}

COMMISSIONS OUVERTES :
${commissions.map(c => `- Code: ${c.Code} | Nom: ${c.Nom} | Domaine: ${c.DomaineCode} | Description: ${c.Description}`).join('\n')}
`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: candidateDetails }
    ];

    return await this.callGemmaChat({ messages, jsonMode: true, temperature: 0.3, top_p: 0.85 });
  },

  /**
   * FONCTIONNALITÉ D : Analyse IA post-évaluation en présentiel par Gemma 4:12B
   */
  async analyzePostEvaluationWithGemma({
    candidate,
    commission,
    notePratique,
    noteEntretien,
    noteComplementaire = null,
    observations,
    commentairesComplementaires = null,
    avisCommission = 'RESERVE',
    threshold = 12.0
  }) {
    const systemPrompt = `Tu es l'Analyste IA Indépendant du Comité de Recrutement de la Gendarmerie Royale.
Tu dois analyser les résultats réels obtenus par un élève gendarme lors des épreuves présentielles d'une commission spécialisée.
Tu dois croiser ses notes réelles, les observations du jury, son diplôme d'origine et le seuil d'admission officiel configuré pour cette commission (${threshold}/20).

RÈGLES STRICTES :
1. Les notes manquantes ne sont jamais nulles : si notePratique ou noteEntretien est absente, l'évaluation est déclarée incomplète.
2. Si la note globale calculée et les notes requises atteignent le seuil (${threshold}/20) avec un avis jury favorable, la recommandation consultative est POSITIF.
3. Sinon, la recommandation est NEGATIF.
4. Gemma fournit une recommandation motivée, mais ne prend JAMAIS la décision administrative finale qui appartient à l'autorité de commandement (ADMIN).

RÉPONDS STRICTEMENT AU FORMAT JSON SANS AUCUN TEXTE AUTOUR :
{
  "recommandationIA": "POSITIF" ou "NEGATIF",
  "resumeAnalyseIA": "Résumé concis de la performance et de la décision consultative",
  "justificationIA": "Justification complète croisant notes, avis du jury et compétences observées",
  "pointsForts": ["Point fort pratique ou comportemental 1", "Point fort 2"],
  "pointsFaibles": ["Point d'amélioration ou réserve 1"],
  "estTransmisAdmin": true ou false
}`;

    const inputData = `
COMMISSION : ${commission?.Nom || 'Commission'} (Code: ${commission?.Code})
SEUIL OFFICIEL REQUIS : ${threshold} / 20
CANDIDAT : ${candidate?.Prenom || ''} ${candidate?.Nom || ''} (Diplôme: ${candidate?.DiplomeOrigine || 'N/A'}, Filière: ${candidate?.FiliereEntree || 'N/A'})

NOTES OBSERVÉES :
- Note test pratique : ${notePratique} / 20
- Note entretien jury : ${noteEntretien} / 20
- Note complémentaire : ${noteComplementaire !== null ? noteComplementaire + ' / 20' : 'Non applicable'}
- Moyenne globale : ${(((notePratique || 0) + (noteEntretien || 0)) / 2).toFixed(2)} / 20

OBSERVATIONS DU JURY :
- Avis officiel commission : ${avisCommission}
- Observations saisies : "${observations || 'Aucune observation textuelle'}"
- Commentaires additionnels : "${commentairesComplementaires || 'Néant'}"
`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: inputData }
    ];

    return await this.callGemmaChat({ messages, jsonMode: true, temperature: 0.2, top_p: 0.8 });
  },

  /**
   * FONCTIONNALITÉ E : Synthèse comparative administrative par Gemma 4:12B
   */
  async generateAdminComparisonSynthesisWithGemma({
    candidate,
    evaluatedCommissions = [],
    pendingCommissions = [],
    topCommission = null,
    secondCommission = null
  }) {
    const systemPrompt = `Tu es le Conseiller d'État-Major IA auprès de l'Autorité de Commandement (ADMIN) de la Gendarmerie Royale.
Tu dois produire un rapport exécutif comparatif pour un élève ayant fait l'objet d'évaluations multi-commissions.
RÈGLE D'OR : Les commissions en attente d'évaluation physique NE SONT JAMAIS pénalisées ni considérées comme nulles.
L'explication doit éclairer le Commandement sur les points forts comparés du candidat, les alertes de vigilance éventuelles et proposer une recommandation consultative.

RÉPONDS STRICTEMENT AU FORMAT JSON SANS AUCUN TEXTE AUTOUR :
{
  "explicationIA": "Rapport comparatif exécutif détaillé pour l'ADMIN",
  "recommandationPrincipaleCode": "CODE_COMMISSION_RECOMMANDEE",
  "recommandationSecondaireCode": "CODE_ALTERNATIVE_OU_NULL",
  "indiceConfiance": 85.0,
  "pointsVigilance": [
    { "type": "TYPE_ALERTE", "message": "Explication de la vigilance" }
  ]
}`;

    const inputData = `
CANDIDAT : ${candidate?.Prenom || ''} ${candidate?.Nom || ''} (Matricule: ${candidate?.Matricule}, Diplôme: ${candidate?.DiplomeOrigine})

COMMISSIONS AYANT COMPLÉTÉ LEUR ÉVALUATION :
${evaluatedCommissions.map(c => `- ${c.commissionNom} (${c.commissionCode}) : Note Pratique: ${c.notePratique}/20, Entretien: ${c.noteEntretien}/20, Moyenne: ${c.noteGlobale}/20, Avis: ${c.avis}, Évaluateur: ${c.evaluateur}`).join('\n') || 'Aucune évaluation complète'}

COMMISSIONS EN COURS OU EN ATTENTE D'ÉVALUATION (Notes manquantes non pénalisées) :
${pendingCommissions.map(c => `- ${c.commissionNom} (${c.commissionCode}) : Statut: ${c.statut}, Score d'affinité IA initial: ${c.scoreCorrespondanceIA}%`).join('\n') || 'Aucune'}

CLASSEMENT INITIAL CONSTATÉ :
- Meilleure commission évaluée : ${topCommission ? `${topCommission.commissionNom} (${topCommission.noteGlobale}/20)` : 'Non déterminé'}
- Deuxième commission : ${secondCommission ? `${secondCommission.commissionNom} (${secondCommission.noteGlobale}/20)` : 'Néant'}
`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: inputData }
    ];

    return await this.callGemmaChat({ messages, jsonMode: true, temperature: 0.3, top_p: 0.85 });
  }
};
