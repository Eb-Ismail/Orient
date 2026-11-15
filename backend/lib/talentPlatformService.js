// ==============================================================================
// ORIENT-GR — Service Plateforme Intelligente des Talents & d'Orientation
// Architecture unifiée reliant :
// 1. Mon Récit & Entretien IA (Gemma 4:12B + Moulsot v0.3)
// 2. Talent Radar (7 dimensions : Déclaré vs Observé vs Validé)
// 3. Simulation Center (6 catégories pratiques d'évaluation)
// 4. Orientation Simulator (7 spécialités GR croisant les 5 sources)
// 5. Instructor Dashboard (Supervision 360°, validation des compétences et visas)
// ==============================================================================

import { mockStore } from './db.js';
import { journeyAndTalentRepository } from '../repositories/journeyAndTalentRepository.js';
import { smartJourneyService } from './smartJourneyService.js';
import { GENDARMERIE_SPECIALTIES } from '../../frontend/src/data/gendarmerieSpecialtiesData.js';

// Initialisation des stores dans globalThis.__orient_gr_mockStore__
if (!mockStore.studentTalentProfiles) {
  mockStore.studentTalentProfiles = [];
}
if (!mockStore.simulationCenterSessions) {
  mockStore.simulationCenterSessions = [];
}
if (!mockStore.instructorEvaluations) {
  mockStore.instructorEvaluations = [];
}

/**
 * Référentiel des 7 dimensions fondamentales du Talent Radar
 */
export const TALENT_RADAR_DIMENSIONS = [
  {
    key: 'analyseRaisonnement',
    nomFr: 'Analyse et raisonnement',
    nomAr: 'الاستدلال والتحليل المنطقي',
    description: 'Capacité à déduire des hypothèses, analyser des faits complexes et résoudre des anomalies méthodiquement.',
    icone: 'Brain'
  },
  {
    key: 'communication',
    nomFr: 'Communication',
    nomAr: 'التواصل والتعبير المهني',
    description: 'Aisance d\'expression écrite et orale (Français, Arabe, Darija), écoute active et transmission d\'ordres clairs.',
    icone: 'MessageSquare'
  },
  {
    key: 'organisation',
    nomFr: 'Organisation',
    nomAr: 'التنظيم وإدارة الأولويات',
    description: 'Gestion du temps, priorisation rigoureuse des urgences opérationnelles et respect des protocoles militaires.',
    icone: 'Calendar'
  },
  {
    key: 'precisionAttention',
    nomFr: 'Précision et attention',
    nomAr: 'الدقة واليقظة العملياتية',
    description: 'Repérage d\'incohérences furtives, vigilance procédurale et minutie dans les documents administratifs et judiciaires.',
    icone: 'Target'
  },
  {
    key: 'travailEquipe',
    nomFr: 'Travail en équipe',
    nomAr: 'العمل الجماعي وروح الفريق',
    description: 'Esprit de corps, discipline collective, solidarité en binôme et coordination sous contrainte opérationnelle.',
    icone: 'Users'
  },
  {
    key: 'competencesTechniques',
    nomFr: 'Compétences techniques',
    nomAr: 'الكفاءات التقنية والتطبيقية',
    description: 'Maîtrise des outils informatiques, réseaux, mécanique, matériels d\'intervention et démarches scientifiques.',
    icone: 'Wrench'
  },
  {
    key: 'capaciteApprentissage',
    nomFr: 'Capacité d\'apprentissage',
    nomAr: 'قابلية التعلم والتطور',
    description: 'Assimilation rapide des consignes, réactivité face à l\'imprévu et intégration des retours pédagogiques.',
    icone: 'TrendingUp'
  }
];

/**
 * Les 6 Catégories d'exercices pratiques du Simulation Center
 */
export const SIMULATION_CENTER_EXERCISES = [
  {
    id: 'SIM-SIT-01',
    category: 'SITUATION_ANALYSIS',
    categoryNameFr: 'Analyse de situations pédagogiques fictives',
    categoryNameAr: 'تحليل الوضعيات البيداغوجية والعملياتية',
    titreFr: 'Gestion d\'un différend sur la voie publique et qualification légale',
    titreAr: 'معالجة نزاع بالشارع العام والتكييف القانوني الأولي',
    dureeEstimeeMin: 8,
    difficulte: 'Intermédiaire',
    descriptionFr: 'En patrouille de gendarmerie, vous intervenez sur un incident impliquant un délit de fuite et des menaces. Analysez la chronologie, qualifiez les infractions et déterminez les mesures conservatoires.',
    competencesCibles: ['analyseRaisonnement', 'communication', 'organisation'],
    scenario: {
      contexte: "Le Centre d'Opérations (CORG) vous signale un accrochage sur la RN1 avec refus d'obtempérer et altercation verbale vive entre deux automobilistes.",
      documents: [
        {
          titre: "Fiche d'intervention CORG #847",
          heure: "14:15",
          texte: "Appel témoin : Véhicule gris immatriculé à Casablanca a percuté un cyclomoteur avant de prendre la fuite sur 300 mètres, stoppé par des riverains. Conducteur agressif."
        },
        {
          titre: "Constatations préliminaires du chef de patrouille",
          heure: "14:22",
          texte: "Présence d'un blessé léger (cyclomotoriste). Conducteur du véhicule en état d'ébriété apparente, refuse de présenter ses papiers et conteste la compétence de la patrouille."
        }
      ],
      questions: [
        {
          id: 'q1',
          texte: 'Quelle est la priorité opérationnelle absolue dès votre arrivée sur les lieux ?',
          options: [
            { id: 'a', label: "Rédiger immédiatement le procès-verbal de contravention", correct: false },
            { id: 'b', label: "Sécuriser le périmètre routier et porter secours au cyclomotoriste blessé", correct: true },
            { id: 'c', label: "Fouiller le véhicule suspect sans attendre", correct: false },
            { id: 'd', label: "Convoquer les riverains au poste pour audition", correct: false }
          ],
          points: 25
        },
        {
          id: 'q2',
          texte: 'Quelles infractions sont formellement caractérisées à ce stade ?',
          options: [
            { id: 'a', label: "Vol simple et stationnement gênant", correct: false },
            { id: 'b', label: "Blessures involontaires, délit de fuite et refus de se soumettre aux vérifications", correct: true },
            { id: 'c', label: "Trouble léger à la tranquillité sans suite pénale", correct: false },
            { id: 'd', label: "Non-respect des distances de sécurité uniquement", correct: false }
          ],
          points: 25
        },
        {
          id: 'q3',
          texte: 'Face au refus d\'obtempérer du conducteur, quelle attitude déontologique adopter ?',
          options: [
            { id: 'a', label: "Garder son calme, énoncer fermement les réquisitions légales et alerter le commandement", correct: true },
            { id: 'b', label: "Ignorer le conducteur et repartir en patrouille", correct: false },
            { id: 'c', label: "Employer immédiatement la contrainte physique maximale sans sommation", correct: false },
            { id: 'd', label: "Proposer un arrangement amiable avec la victime", correct: false }
          ],
          points: 25
        },
        {
          id: 'q4',
          texte: 'Quel compte-rendu transmettre par radio au CORG ?',
          options: [
            { id: 'a', label: "Situation confuse, rappel ultérieur sans précisions", correct: false },
            { id: 'b', label: "Lieu exact, état du blessé pris en charge par secours, identité du mis en cause immobilisé, demande de dépanneuse", correct: true },
            { id: 'c', label: "Uniquement l'immatriculation du véhicule", correct: false },
            { id: 'd', label: "Pas de compte-rendu nécessaire avant le retour à la brigade", correct: false }
          ],
          points: 25
        }
      ]
    }
  },
  {
    id: 'SIM-DOC-02',
    category: 'ERROR_DETECTION',
    categoryNameFr: 'Détection d\'erreurs dans des documents administratifs',
    categoryNameAr: 'رصد الأخطاء والتناقضات بالوثائق الإدارية والمحاضر',
    titreFr: 'Contrôle minutieux et audit d\'un Procès-Verbal de Constatation',
    titreAr: 'تدقيق ومراجعة محضر معاينة وحجز رسمي',
    dureeEstimeeMin: 6,
    difficulte: 'Avancé',
    descriptionFr: 'Inspectez un procès-verbal judiciaire officiel comportant 4 vices de forme ou incohérences factuelles. Repérez chaque anomalie pour garantir la validité de la procédure.',
    competencesCibles: ['precisionAttention', 'analyseRaisonnement', 'organisation'],
    documentToAudit: {
      titre: "Procès-Verbal n° 248/2026 — Brigade Territoriale de Benslimane",
      entete: "ROYAUME DU MAROC • GENDARMERIE ROYALE • COMPAGNIE DE BENSLIMANE",
      segments: [
        { id: 's1', texte: "L'an deux mille vingt-six, le dix-huit octobre à quatorze heures trente.", isError: false },
        { id: 's2', texte: "Nous, Adjudant K. ALAMI et Gendarme M. BENJELLOUN, OPJ en résidence à Benslimane, en tenue bourgeoise sans ordre de mission.", isError: true, explanation: "Vice de procédure : Mention d'exercice OPJ en tenue civile sans visa de mission réglementaire." },
        { id: 's3', texte: "Agissant en vertu des articles 18 et 24 du Code de Procédure Pénale.", isError: false },
        { id: 's4', texte: "Avons procédé au contrôle d'un camion frigorifique arrivant de Tanger le 18/10 à 03h00 du matin, contrôlé à Benslimane le 17/10 à 18h00.", isError: true, explanation: "Incohérence temporelle majeure : la date de contrôle précède l'heure de départ de Tanger." },
        { id: 's5', texte: "Le conducteur présente un permis de conduire de catégorie B pour un poids lourd de 19 tonnes.", isError: true, explanation: "Anomalie légale : La conduite d'un véhicule de 19 tonnes requiert impérativement le permis C et non B." },
        { id: 's6', texte: "La pesée sur bascule homologuée indique une masse totale de 18 450 kg.", isError: false },
        { id: 's7', texte: "Avons rédigé le présent procès-verbal sans faire signer le contrevenant ni mentionner son refus de signer.", isError: true, explanation: "Vice de forme substantiel : La signature du mis en cause ou la mention expresse de son refus est obligatoire." }
      ]
    }
  },
  {
    id: 'SIM-ORG-03',
    category: 'TASK_PRIORITIZATION',
    categoryNameFr: 'Organisation et priorisation des tâches',
    categoryNameAr: 'تنظيم وترتيب أولويات التدخل والمهام',
    titreFr: 'Régulation des appels d\'urgence 177 et engagement des patrouilles',
    titreAr: 'تدبير المكالمات الاستعجالية 177 وتوزيع الدوريات الميدانية',
    dureeEstimeeMin: 7,
    difficulte: 'Intermédiaire',
    descriptionFr: 'En salle de transmissions de la Compagnie, vous disposez de 3 patrouilles disponibles et recevez 5 alertes simultanées. Classez les urgences et engagez les effectifs selon les critères d\'urgence vitale et d\'ordre public.',
    competencesCibles: ['organisation', 'analyseRaisonnement', 'travailEquipe'],
    tasksToPrioritize: [
      { id: 't1', titre: "Accident corporel grave avec véhicule en feu sur autoroute", urgenceReelle: 1, justif: "Urgence vitale absolue - engagement immédiat secours et balisage" },
      { id: 't2', titre: "Signalement d'un individu armé menaçant dans un centre commercial", urgenceReelle: 2, justif: "Menace imminente contre les personnes - engagement patrouille d'intervention rapide" },
      { id: 't3', titre: "Cambriolage constaté dans une résidence secondaire sans occupants", urgenceReelle: 4, justif: "Préservation des traces, mais aucune menace physique en cours" },
      { id: 't4', titre: "Disparition inquiétante d'un enfant de 7 ans près d'une zone forestière", urgenceReelle: 3, justif: "Recherche immédiate prioritaire avec équipes cynotechniques" },
      { id: 't5', titre: "Demande de renseignement administratif d'un citoyen", urgenceReelle: 5, justif: "Non urgent - orientation vers l'accueil en journée" }
    ]
  },
  {
    id: 'SIM-DOC-04',
    category: 'INFORMATION_CROSSING',
    categoryNameFr: 'Analyse de documents et d\'informations',
    categoryNameAr: 'تقاطع المعلومات ومضاهاة الإفادات والتقارير',
    titreFr: 'Croisement de rapports de surveillance et d\'auditions contradictoires',
    titreAr: 'مضاهاة تقارير المراقبة ورصد التناقضات بين الإفادات',
    dureeEstimeeMin: 8,
    difficulte: 'Avancé',
    descriptionFr: 'Trois suspects fournissent des alibis pour une même nuit. Croisez les relevés de péage autoroutier, les bornages téléphoniques et les déclarations pour identifier qui dissimule la vérité.',
    competencesCibles: ['analyseRaisonnement', 'precisionAttention', 'capaciteApprentissage'],
    questions: [
      {
        id: 'q1',
        texte: 'Le suspect A affirme avoir dîné à Rabat à 21h30. Le péage de Bouznika enregistre son badge à 21h42. Est-ce matériellement plausible ?',
        reponseCorrecte: false,
        explication: "Impossible : La distance Rabat-Bouznika (environ 45 km) ne peut pas être parcourue en 12 minutes à vitesse réglementaire."
      },
      {
        id: 'q2',
        texte: 'Le téléphone du suspect B a borné sur le relais de Témara entre 22h00 et 23h15 alors qu\'il déclare être resté chez lui à Salé. Y a-t-il contradiction formelle ?',
        reponseCorrecte: true,
        explication: "Contradiction formelle irréfutable entre la déclaration et la donnée technique de téléphonie."
      }
    ]
  },
  {
    id: 'SIM-LOG-05',
    category: 'LOGIC_REASONING',
    categoryNameFr: 'Exercices de logique et de raisonnement',
    categoryNameAr: 'تمارين الاستدلال والاستنباط المنطقي',
    titreFr: 'Reconstitution chronologique et logique d\'une chaîne d\'événements',
    titreAr: 'إعادة بناء التسلسل المنطقي والزمني للوقائع',
    dureeEstimeeMin: 6,
    difficulte: 'Fondamental',
    descriptionFr: 'À partir de 6 indices chronologiques dispersés, rétablissez la séquence exacte d\'un convoi maritime suspect jusqu\'à son interception par la Gendarmerie Maritime.',
    competencesCibles: ['analyseRaisonnement', 'competencesTechniques', 'organisation'],
    etapesAOrdonner: [
      { id: 'e1', texte: "Détection radar d'un écho suspect naviguant feux éteints à 12 nautiques des côtes", ordreCorrect: 1 },
      { id: 'e2', texte: "Vérification radio sans réponse sur le canal VHF 16 de détresse et sécurité", ordreCorrect: 2 },
      { id: 'e3', texte: "Alerte de la vedette côtière rapide de la Gendarmerie Maritime et appareillage", ordreCorrect: 3 },
      { id: 'e4', texte: "Guidage vectoriel radar vers les coordonnées GPS de la cible", ordreCorrect: 4 },
      { id: 'e5', texte: "Contact visuel aux jumelles thermiques et sommation d'arrêt", ordreCorrect: 5 },
      { id: 'e6', texte: "Accostage sécurisé, contrôle des occupants et sécurisation de la cargaison", ordreCorrect: 6 }
    ]
  },
  {
    id: 'SIM-COM-06',
    category: 'TEAM_COMMUNICATION',
    categoryNameFr: 'Scénarios de communication et de travail en équipe',
    categoryNameAr: 'سيناريوهات التواصل العملياتي والعمل الجماعي',
    titreFr: 'Coordination tactique radio et résolution de conflit en binôme',
    titreAr: 'التنسيق اللاسلكي الميداني وتدبير التوتر في إطار العمل الثنائي',
    dureeEstimeeMin: 7,
    difficulte: 'Intermédiaire',
    descriptionFr: 'Lors d\'une mission conjointe, appliquez la phraséologie radio militaire, transmettez des informations claires sous pression et coordonnez l\'action avec votre équipier.',
    competencesCibles: ['communication', 'travailEquipe', 'capaciteApprentissage'],
    questions: [
      {
        id: 'qc1',
        texte: 'Quelle formule de communication radio standardisée devez-vous employer pour accuser réception d\'un ordre impératif ?',
        options: [
          { id: 'a', label: "« Bien reçu, c'est noté, à plus tard »", correct: false },
          { id: 'b', label: "« Reçu 5 sur 5, indicatif X, j'applique »", correct: true },
          { id: 'c', label: "« Répétez le message s'il vous plaît »", correct: false },
          { id: 'd', label: "« Silence radio complet »", correct: false }
        ],
        points: 50
      },
      {
        id: 'qc2',
        texte: 'Votre binôme manifeste des signes de panique face à une foule hostile. Quelle est votre réaction professionnelle immédiate ?',
        options: [
          { id: 'a', label: "L'abandonner sur place pour aller chercher du renfort", correct: false },
          { id: 'b', label: "Prendre position dos à dos, le rassurer calmement par la voix, adopter une posture défensive coordonnée et transmettre les coordonnées au CORG", correct: true },
          { id: 'c', label: "Crier sur lui pour lui ordonner d'avoir du courage", correct: false },
          { id: 'd', label: "Sortir son arme sans sommation préalable", correct: false }
        ],
        points: 50
      }
    ]
  }
];

export const talentPlatformService = {
  /**
   * Récupère le profil Talent Radar consolidé d'un élève (Déclaré vs Observé vs Validé)
   */
  async getStudentTalentRadar(userId) {
    const uId = String(userId);
    let profile = await journeyAndTalentRepository.getTalentProfile(userId);

    // Si le profil n'existe pas encore, on le génère à partir des sources existantes
    if (!profile) {
      const [journey, studentSessions, instructorEval] = await Promise.all([
        smartJourneyService.getStudentJourney(userId),
        journeyAndTalentRepository.getSimulationCenterSessions(userId),
        journeyAndTalentRepository.getLatestInstructorEvaluation(userId)
      ]);

      // Calcul des 7 dimensions
      const hasSimulations = studentSessions.length > 0;
      const avgSimScore = hasSimulations
        ? Math.round(studentSessions.reduce((acc, s) => acc + (s.score || 75), 0) / studentSessions.length)
        : 72;

      // Compétences déclarées déduites du récit et de l'IA (Gemma & Moulsot)
      const numDeclared = journey?.analysis?.competencesDeclarees?.length || 2;
      const declaredBonus = Math.min(20, numDeclared * 4);

      profile = {
        userId: uId,
        updatedAt: new Date().toISOString(),
        status: instructorEval ? 'VALIDE_PAR_FORMATEUR' : hasSimulations ? 'OBSERVE_EN_SIMULATION' : 'DECLARE_INITIAL',
        instructorVisa: instructorEval ? instructorEval.officialRecommendation : 'EN_ATTENTE_FORMATEUR',
        instructorObservations: instructorEval?.observations || "Dossier en cours d'évaluation par l'Adjudant-Chef El Fassi.",
        dimensions: {
          analyseRaisonnement: {
            declare: Math.min(95, 75 + declaredBonus),
            observe: hasSimulations ? avgSimScore : 74,
            valide: instructorEval?.dimensions?.analyseRaisonnement || 80,
            feedback: "Rigueur déductive et bonne qualification des éléments matériels."
          },
          communication: {
            declare: Math.min(95, 70 + declaredBonus),
            observe: hasSimulations ? avgSimScore + 3 : 78,
            valide: instructorEval?.dimensions?.communication || 82,
            feedback: "Très bonne aisance en Darija marocaine et Français soutenu."
          },
          organisation: {
            declare: 80,
            observe: hasSimulations ? avgSimScore - 2 : 75,
            valide: instructorEval?.dimensions?.organisation || 78,
            feedback: "Priorisation claire des appels d'urgence 177."
          },
          precisionAttention: {
            declare: 75,
            observe: hasSimulations ? avgSimScore + 5 : 82,
            valide: instructorEval?.dimensions?.precisionAttention || 84,
            feedback: "Minutie remarquée dans la détection des vices de forme sur PV."
          },
          travailEquipe: {
            declare: 90,
            observe: hasSimulations ? 86 : 84,
            valide: instructorEval?.dimensions?.travailEquipe || 88,
            feedback: "Discipline de corps exemplaire et coordination radio fluide."
          },
          competencesTechniques: {
            declare: Math.min(95, 72 + declaredBonus),
            observe: hasSimulations ? avgSimScore : 76,
            valide: instructorEval?.dimensions?.competencesTechniques || 79,
            feedback: "Bonne maîtrise des transmissions tactiques et sécurité numérique."
          },
          capaciteApprentissage: {
            declare: 88,
            observe: hasSimulations ? 90 : 85,
            valide: instructorEval?.dimensions?.capaciteApprentissage || 89,
            feedback: "Assimilation rapide des corrections entre chaque phase d'exercice."
          }
        },
        strengthsDominants: [
          "Cohésion et réactivité en binôme sous tension",
          "Sens aigu de la détection d'erreurs procédurales",
          "Aisance bilingue Français / Arabe / Darija"
        ],
        axesAmelioration: [
          "Accélérer la prise de décision lors du tri initial des urgences",
          "Perfectionner la phraséologie radio normalisée"
        ]
      };
      profile = await journeyAndTalentRepository.upsertTalentProfile(userId, profile, 'INITIAL');
    }

    return profile;
  },

  /**
   * Retourne la liste des exercices du Simulation Center
   */
  getSimulationExercises() {
    return SIMULATION_CENTER_EXERCISES;
  },

  /**
   * Retourne un exercice par ID
   */
  getSimulationExerciseById(exerciseId) {
    return SIMULATION_CENTER_EXERCISES.find(e => e.id === exerciseId) || null;
  },

  /**
   * Soumet un exercice du Simulation Center et calcule l'évaluation détaillée
   */
  async submitSimulationExercise(userId, exerciseId, userAnswers, timeSpentSeconds = 120) {
    const exercise = this.getSimulationExerciseById(exerciseId);
    if (!exercise) throw new Error("Exercice de simulation introuvable");

    let score = 0;
    let maxPoints = 100;
    const errorsDetected = [];
    const pointsAmeliorer = [];

    // Évaluation selon la catégorie d'exercice
    switch (exercise.category) {
      case 'SITUATION_ANALYSIS': {
        const questions = exercise.scenario?.questions || [];
        questions.forEach(q => {
          const selectedOption = userAnswers?.[q.id];
          const correctOpt = q.options.find(o => o.correct);
          if (selectedOption === correctOpt?.id) {
            score += q.points || 25;
          } else {
            errorsDetected.push(`Question « ${q.texte.substring(0, 45)}... » : Mauvaise qualification choisie.`);
            pointsAmeliorer.push("Relire attentivement les priorités d'intervention opérationnelle.");
          }
        });
        break;
      }

      case 'ERROR_DETECTION': {
        const segments = exercise.documentToAudit?.segments || [];
        const selectedErrorIds = userAnswers?.selectedSegmentIds || [];
        
        const actualErrorIds = segments.filter(s => s.isError).map(s => s.id);
        let correctPicks = 0;
        let falseAlarms = 0;

        selectedErrorIds.forEach(id => {
          if (actualErrorIds.includes(id)) {
            correctPicks++;
          } else {
            falseAlarms++;
          }
        });

        const precisionRatio = Math.max(0, (correctPicks / actualErrorIds.length) - (falseAlarms * 0.15));
        score = Math.round(precisionRatio * 100);

        actualErrorIds.forEach(id => {
          if (!selectedErrorIds.includes(id)) {
            const seg = segments.find(s => s.id === id);
            errorsDetected.push(`Anomalie omise : ${seg?.explanation || seg?.texte}`);
          }
        });
        if (falseAlarms > 0) {
          pointsAmeliorer.push(`Éviter les fausses alertes (${falseAlarms} segments corrects signalés par erreur).`);
        }
        break;
      }

      case 'TASK_PRIORITIZATION': {
        const orderGiven = userAnswers?.taskOrder || []; // array of task IDs
        const tasks = exercise.tasksToPrioritize || [];
        let matchingRanks = 0;

        orderGiven.forEach((tId, index) => {
          const task = tasks.find(t => t.id === tId);
          if (task && task.urgenceReelle === index + 1) {
            matchingRanks++;
          } else if (task) {
            errorsDetected.push(`Tâche « ${task.titre} » mal ordonnée (position ${index + 1} au lieu de ${task.urgenceReelle}).`);
          }
        });

        score = Math.round((matchingRanks / tasks.length) * 100);
        if (score < 80) pointsAmeliorer.push("Toujours faire primer le secours d'urgence aux victimes sur le préjudice matériel.");
        break;
      }

      default: {
        score = userAnswers?.scoreCalculated || 85;
        break;
      }
    }

    const evaluationResult = {
      sessionId: `sim-ses-${Date.now()}`,
      userId: String(userId),
      exerciseId,
      exerciseTitle: exercise.titreFr,
      category: exercise.category,
      categoryNameFr: exercise.categoryNameFr,
      score: Math.min(100, Math.max(0, score)),
      precisionPct: Math.min(100, Math.max(0, score)),
      timeSpentSeconds,
      timeFormatted: `${Math.floor(timeSpentSeconds / 60)}m ${timeSpentSeconds % 60}s`,
      errorsFoundCount: errorsDetected.length,
      errorsDetected,
      pointsAmeliorer: pointsAmeliorer.length > 0 ? pointsAmeliorer : ["Excellente réactivité, maintenir cette vigilance."],
      completedAt: new Date().toISOString()
    };

    // Mise à jour instantanée du Talent Radar (Couche Observée) dans la même transaction SQL
    const profile = await this.getStudentTalentRadar(userId);
    if (profile && exercise.competencesCibles) {
      exercise.competencesCibles.forEach(dimKey => {
        if (profile.dimensions[dimKey]) {
          const currentObs = profile.dimensions[dimKey].observe || 70;
          profile.dimensions[dimKey].observe = Math.round((currentObs * 0.4) + (score * 0.6));
        }
      });
      profile.updatedAt = new Date().toISOString();
      profile.status = 'OBSERVE_EN_SIMULATION';
    }

    const savedEval = await journeyAndTalentRepository.saveSimulationAndUpdateRadar(userId, evaluationResult, profile);
    return savedEval;
  },

  /**
   * Simulateur d'Orientation : Croise les 5 sources et permet des simulations d'hypothèses
   */
  async getOrientationSimulatorData(userId, simulatedAdjustments = null) {
    const [journey, talentProfile, sessions, instructorEval] = await Promise.all([
      smartJourneyService.getStudentJourney(userId),
      this.getStudentTalentRadar(userId),
      journeyAndTalentRepository.getSimulationCenterSessions(userId),
      journeyAndTalentRepository.getLatestInstructorEvaluation(userId)
    ]);

    // Moyenne des dimensions selon les 3 couches
    const dims = talentProfile.dimensions;
    const computeDimValue = (dimKey) => {
      let val = (dims[dimKey].declare * 0.25) + (dims[dimKey].observe * 0.40) + (dims[dimKey].valide * 0.35);
      // Prise en compte des ajustements hypothétiques si fournis
      if (simulatedAdjustments?.[dimKey]) {
        val = Math.min(100, val + Number(simulatedAdjustments[dimKey]));
      }
      return val;
    };

    const overallAnalyse = computeDimValue('analyseRaisonnement');
    const overallPrecision = computeDimValue('precisionAttention');
    const overallTeam = computeDimValue('travailEquipe');
    const overallTech = computeDimValue('competencesTechniques');
    const overallOrganisation = computeDimValue('organisation');

    // Calcul de correspondance pour les 7 spécialités officielles
    const recommendations = GENDARMERIE_SPECIALTIES.map(spec => {
      let affinityScore = 70;
      const reasons = [];
      const matchingCompetencies = [];
      const axesAmelioration = [];

      switch (spec.id) {
        case 'SPEC-PST': // Police Scientifique
          affinityScore = Math.round((overallPrecision * 0.5) + (overallAnalyse * 0.3) + (overallTech * 0.2));
          reasons.push("Votre score de précision en détection d'erreurs et votre rigueur analytique correspondent au profil criminalistique.");
          matchingCompetencies.push("Précision chirurgicale", "Analyse méthodique", "Observation critique");
          axesAmelioration.push("Perfectionner le conditionnement normé des scellés");
          break;

        case 'SPEC-INTERV': // Unités d'Intervention
          affinityScore = Math.round((overallTeam * 0.4) + (overallAnalyse * 0.3) + (overallPrecision * 0.3));
          reasons.push("Excellente cohésion de groupe démontrée en simulation et capacité de prise de décision sous stress.");
          matchingCompetencies.push("Sang-froid sous tension", "Solidarité de binôme", "Réactivité tactique");
          axesAmelioration.push("Renforcer la vitesse de transmission radio en mouvement");
          break;

        case 'SPEC-TERR': // Gendarmerie Territoriale
          affinityScore = Math.round((overallOrganisation * 0.35) + (overallTeam * 0.35) + (overallAnalyse * 0.3));
          reasons.push("Polyvalence opérationnelle remarquable pour la sécurité publique de proximité et la gestion des flux.");
          matchingCompetencies.push("Sens du service citoyen", "Gestion des priorités", "Médiation");
          axesAmelioration.push("Accélérer la rédaction des procès-verbaux de flagrance");
          break;

        case 'SPEC-PREV': // Prévôté Militaire
          affinityScore = Math.round((overallAnalyse * 0.45) + (overallPrecision * 0.35) + (overallOrganisation * 0.2));
          reasons.push("Affinité forte avec les procédures légales, l'audit documentaire et la justice militaire.");
          matchingCompetencies.push("Rigueur procédurale", "Discrétion exemplaire", "Conformité légale");
          axesAmelioration.push("Approfondir le Code de Justice Militaire");
          break;

        case 'SPEC-MOB': // Gendarmerie Mobile
          affinityScore = Math.round((overallTeam * 0.5) + (overallOrganisation * 0.3) + (overallAnalyse * 0.2));
          reasons.push("Discipline collective et aptitudes au maintien de l'ordre en formation coordonnée.");
          matchingCompetencies.push("Discipline d'escadron", "Résilience", "Esprit de corps");
          axesAmelioration.push("Progression tactique en milieu urbain dense");
          break;

        case 'SPEC-MARIT': // Gendarmerie Maritime
          affinityScore = Math.round((overallTech * 0.4) + (overallAnalyse * 0.3) + (overallTeam * 0.3));
          reasons.push("Aptitudes aux environnements nautiques et surveillance de la souveraineté maritime.");
          matchingCompetencies.push("Vigilance côtière", "Sauvetage SAR", "Connaissances nautiques");
          axesAmelioration.push("Certification navigation aux instruments");
          break;

        case 'SPEC-AIR': // Gendarmerie Aérienne
          affinityScore = Math.round((overallTech * 0.45) + (overallPrecision * 0.35) + (overallTeam * 0.2));
          reasons.push("Rigueur technique aéronautique et vigilance spatiale pour l'appui héliporté.");
          matchingCompetencies.push("Coordination tridimensionnelle", "Communication radio normalisée");
          axesAmelioration.push("Phraséologie aéronautique internationale");
          break;

        default:
          break;
      }

      const finalScore = Math.min(98, Math.max(50, affinityScore));

      return {
        id: spec.id,
        code: spec.code,
        nomFr: spec.nomFr,
        nomAr: spec.nomAr,
        affinityScore: finalScore,
        reasons,
        matchingCompetencies,
        axesAmelioration,
        instructorVisaStatus: instructorEval?.preferredSpecialty === spec.id ? 'RECOMMANDE_PAR_FORMATEUR' : 'CONSULTATIF',
        dataSourcesBreakdown: {
          recitPersonnelScore: journey?.bioLibre ? 88 : 70,
          entretienIaScore: journey?.conversation?.length > 2 ? 90 : 75,
          radarCompetencesScore: Math.round(overallAnalyse),
          simulationsScore: sessions.length > 0 ? Math.round(sessions.reduce((a, b) => a + b.score, 0) / sessions.length) : 74,
          formateurVisaScore: instructorEval ? 88 : 75
        }
      };
    }).sort((a, b) => b.affinityScore - a.affinityScore);

    return {
      userId: String(userId),
      generatedAt: new Date().toISOString(),
      simulatedAdjustmentsApplied: simulatedAdjustments || {},
      topSpecialty: recommendations[0],
      allRecommendations: recommendations,
      instructorValidation: {
        formateurName: instructorEval?.instructorName || "Adjudant-Chef Mohammed El Fassi",
        status: instructorEval?.officialRecommendation || 'EN_ATTENTE_EXAMEN',
        dateVisa: instructorEval?.updatedAt || null,
        observations: instructorEval?.observations || "Avis en cours d'instruction suite aux dernières simulations."
      },
      avertissementLegal: "Simulateur consultatif d'aide à la décision. L'affectation définitive relève exclusivement de la décision souveraine du Commandement de la Gendarmerie Royale."
    };
  },

  /**
   * Instructor Dashboard : Liste des élèves suivis avec état d'avancement
   */
  async getInstructorStudentsList() {
    const sqlOverview = await journeyAndTalentRepository.getInstructorStudentsOverviewRows();

    if (sqlOverview) {
      return Promise.all(sqlOverview.students.map(async (st) => {
        const uid = st.UtilisateurId;
        const jRow = sqlOverview.journeysMap.get(uid);
        const msgCnt = sqlOverview.msgCountMap.get(uid) || 0;
        const sims = sqlOverview.simsRows.filter(s => s.UtilisateurId === uid);
        const evalRow = sqlOverview.evalsRows.find(e => e.UtilisateurId === uid);
        await this.getStudentTalentRadar(uid);

        const simAvg = sims.length > 0
          ? Math.round(sims.reduce((a, b) => a + Number(b.ScorePourcentage || 0), 0) / sims.length)
          : null;

        return {
          id: uid,
          matricule: st.Matricule,
          nom: st.Nom,
          prenom: st.Prenom,
          email: st.Email,
          filiereEntree: st.FiliereEntree || 'NORMAL_BAC',
          filiereLabel: st.FiliereEntree === 'SPECIALISTE_ISTA' ? 'Spécialiste — Diplômé ISTA/OFPPT' : 'Élève Normal — Niveau Bac',
          diplomeOrigine: st.DiplomeOrigine || null,
          etablissementOrigine: st.EtablissementOrigine || null,
          domaineFormation: st.DomaineFormation || null,
          promotion: sqlOverview.promosMap.get(st.PromotionId) || '54ème Promotion',
          statusValidation: evalRow ? 'VALIDE' : sims.length >= 2 ? 'A_EXAMINER' : 'EN_COURS',
          journeyCompleted: Boolean(jRow?.RecitPersonnel),
          interviewExchangesCount: msgCnt,
          simulationsCompletedCount: sims.length,
          simulationsAverageScore: simAvg,
          topTalentDimension: 'Précision et attention (84%)',
          recommendedSpecialty: evalRow?.SpecialiteRecommandeeCode || 'Police Scientifique et Technique',
          instructorAvis: evalRow?.DecisionStatut || 'EN_ATTENTE',
          lastActivity: jRow?.UpdatedAt || st.DerniereConnexion || new Date().toISOString()
        };
      }));
    }

    const students = mockStore.users.filter(u => u.Role === 'ELEVE' && u.EstActif);
    
    return Promise.all(students.map(async (st) => {
      const uId = String(st.UtilisateurId);
      const journey = mockStore.studentJourneys?.find(j => String(j.userId) === uId);
      const sessions = mockStore.simulationCenterSessions.filter(s => String(s.userId) === uId);
      const evalItem = mockStore.instructorEvaluations.find(e => String(e.userId) === uId);
      await this.getStudentTalentRadar(st.UtilisateurId);

      const simAvg = sessions.length > 0
        ? Math.round(sessions.reduce((a, b) => a + b.score, 0) / sessions.length)
        : null;

      return {
        id: st.UtilisateurId,
        matricule: st.Matricule,
        nom: st.Nom,
        prenom: st.Prenom,
        email: st.Email,
        promotion: st.PromotionId === 1 ? '54ème Promotion Officiers de Réserve' : '55ème Promotion',
        statusValidation: evalItem ? 'VALIDE' : sessions.length >= 2 ? 'A_EXAMINER' : 'EN_COURS',
        journeyCompleted: !!journey?.bioLibre,
        interviewExchangesCount: journey?.conversation?.length || 0,
        simulationsCompletedCount: sessions.length,
        simulationsAverageScore: simAvg,
        topTalentDimension: 'Précision et attention (84%)',
        recommendedSpecialty: evalItem?.preferredSpecialty || 'Police Scientifique et Technique',
        instructorAvis: evalItem?.officialRecommendation || 'EN_ATTENTE',
        lastActivity: journey?.lastUpdated || st.DerniereConnexion || new Date().toISOString()
      };
    }));
  },

  /**
   * Instructor Dashboard : Vue 360° détaillée de l'élève
   */
  async getInstructorStudentDetail(studentId) {
    const student = await journeyAndTalentRepository.getStudentBasicRecord(studentId);
    if (!student) throw new Error("Élève introuvable");

    const [journey, talentRadar, simulationsHistory, orientationData, currentEval] = await Promise.all([
      smartJourneyService.getStudentJourney(studentId),
      this.getStudentTalentRadar(studentId),
      journeyAndTalentRepository.getSimulationCenterSessions(studentId),
      this.getOrientationSimulatorData(studentId),
      journeyAndTalentRepository.getLatestInstructorEvaluation(studentId)
    ]);

    return {
      studentInfo: {
        id: student.UtilisateurId,
        matricule: student.Matricule,
        nom: student.Nom,
        prenom: student.Prenom,
        email: student.Email,
        age: student.Age || 23,
        tailleCm: student.TailleCm || 182,
        statutMedical: student.StatutMedical || 'SIGYCOP_VALIDE',
        promotion: student.PromotionNom || '54ème Promotion des Élèves Sous-Officiers'
      },
      journeyRecord: {
        bioLibre: journey.bioLibre || '',
        sections: journey.sections || {},
        conversationHistory: journey.conversation || [],
        aiAnalysis: journey.analysis || null
      },
      talentRadar,
      simulationsHistory,
      orientationRecommendations: orientationData.allRecommendations,
      currentInstructorEvaluation: currentEval
    };
  },

  /**
   * Instructor Dashboard : Enregistre la validation ou correction des compétences et l'avis officiel
   */
  async saveInstructorEvaluation(instructorId, studentId, evalData) {
    const sId = String(studentId);
    const instructor = (await journeyAndTalentRepository.getUserByIdBasic(instructorId)) || {
      Nom: "El Fassi",
      Prenom: "Mohammed",
      Grade: "Adjudant-Chef"
    };

    const existingEval = await journeyAndTalentRepository.getLatestInstructorEvaluation(studentId);

    const evaluationPayload = {
      id: existingEval?.id || `inst-eval-${Date.now()}`,
      userId: sId,
      instructorId: String(instructorId),
      instructorName: `${instructor.Grade || 'Adjudant-Chef'} ${instructor.Prenom} ${instructor.Nom}`,
      observations: evalData.observations || "Élève faisant preuve d'une excellente rigueur méthodologique et d'un esprit de discipline militaire exemplaire.",
      dimensions: {
        analyseRaisonnement: Number(evalData.dimensions?.analyseRaisonnement || 82),
        communication: Number(evalData.dimensions?.communication || 84),
        organisation: Number(evalData.dimensions?.organisation || 80),
        precisionAttention: Number(evalData.dimensions?.precisionAttention || 86),
        travailEquipe: Number(evalData.dimensions?.travailEquipe || 88),
        competencesTechniques: Number(evalData.dimensions?.competencesTechniques || 80),
        capaciteApprentissage: Number(evalData.dimensions?.capaciteApprentissage || 90)
      },
      officialRecommendation: evalData.officialRecommendation || 'TRES_FAVORABLE',
      preferredSpecialty: evalData.preferredSpecialty || 'SPEC-PST',
      status: 'SIGNE_ET_VALIDE',
      updatedAt: new Date().toISOString()
    };

    // Synchronisation immédiate avec la couche 'Validé' du Talent Radar de l'élève
    const profile = await this.getStudentTalentRadar(studentId);
    if (profile) {
      Object.keys(evaluationPayload.dimensions).forEach(key => {
        if (profile.dimensions[key]) {
          profile.dimensions[key].valide = evaluationPayload.dimensions[key];
        }
      });
      profile.status = 'VALIDE_PAR_FORMATEUR';
      profile.instructorVisa = evaluationPayload.officialRecommendation;
      profile.instructorObservations = evaluationPayload.observations;
      profile.updatedAt = new Date().toISOString();
    }

    return journeyAndTalentRepository.saveInstructorEvaluationAndUpdateRadar(
      instructorId,
      studentId,
      evaluationPayload,
      profile
    );
  }
};

