// ==============================================================================
// ORIENT-GR - Service Métier de Gestion des Tests & Sessions Élèves
// Gestion sécurisée des épreuves, autosauvegarde, audit et versioning
// ==============================================================================

import { group3Repository } from '../repositories/group3Repository.js';
import { coreRepository } from '../repositories/coreRepository.js';
import { studentService } from './studentService.js';
import {
  calculateDomainScores,
  calculateCompetencyProfiles,
  calculateDataConfidence,
  matchStudentToSpecialties
} from './orientationEngine.js';

/**
 * Générateur pseudo-aléatoire reproductible basé sur une graine (Linear Congruential Generator)
 */
function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function() {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * Mélange reproductible d'un tableau avec une graine
 */
function seededShuffle(array, seed) {
  const rng = seededRandom(seed);
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const testService = {
  /**
   * Récupère la liste de tous les tests actifs
   */
  async getActiveTests() {
    const tests = await group3Repository.getTests();
    return tests.filter(t => t.EstActif);
  },

  /**
   * Récupère les détails d'un test avec questions sécurisées pour l'élève
   * SÉCURITÉ ABSOLUE : Les réponses correctes et explications sont expurgées !
   */
  async getTestForStudent(testId, studentId) {
    const tests = await group3Repository.getTests();
    const test = tests.find(t => t.TestId === parseInt(testId, 10));
    if (!test) return null;

    const [sessions, allQuestions] = await Promise.all([
      group3Repository.getTestSessions({ utilisateurId: studentId, testId: test.TestId }),
      group3Repository.getQuestions(false)
    ]);

    let session = sessions.find(s => s.Statut !== 'TERMINE');

    // Déterminer la liste des questions autorisées pour cette session (Snapshot ou Test)
    let assignedQuestions = [];
    if (session && session.QuestionsSnapshot && Array.isArray(session.QuestionsSnapshot) && session.QuestionsSnapshot.length > 0) {
      const idOrder = session.QuestionsSnapshot;
      assignedQuestions = idOrder
        .map(qId => allQuestions.find(q => q.QuestionId === qId && !q.EstArchivee))
        .filter(Boolean);
    } else {
      assignedQuestions = allQuestions
        .filter(q => q.TestId === test.TestId && q.EstActive && !q.EstArchivee)
        .sort((a, b) => a.OrdreAffichage - b.OrdreAffichage);
    }

    // Sécurisation stricte : ordonner les options selon OptionsOrderSnapshot, réattribuer les lettres A-D, expurger EstCorrecte et Explication
    const sanitizedQuestions = assignedQuestions.map(q => {
      let optionsToRender = q.Options || [];

      // Si un ordre d'options a été figé pour cette session, le restaurer scrupuleusement
      if (session && session.OptionsOrderSnapshot && session.OptionsOrderSnapshot[q.QuestionId]) {
        const orderIds = session.OptionsOrderSnapshot[q.QuestionId];
        const reordered = orderIds
          .map(optId => (q.Options || []).find(o => o.OptionId === optId))
          .filter(Boolean);
        if (reordered.length === (q.Options || []).length) {
          optionsToRender = reordered;
        }
      }

      const optionLetters = ['A', 'B', 'C', 'D'];

      return {
        QuestionId: q.QuestionId,
        Code: q.Code,
        Enonce: q.Enonce,
        ContexteSituationnel: q.ContexteSituationnel,
        TypeQuestion: q.TypeQuestion,
        Difficulte: q.Difficulte,
        Points: q.Points,
        TempsLimiteSecondes: q.TempsLimiteSecondes,
        SchemaSVG: q.SchemaSVG,
        OrdreAffichage: q.OrdreAffichage,
        DomaineId: q.DomaineId,
        DomaineCode: q.DomaineCode,
        DomaineIntitule: q.DomaineIntitule,
        CompetencesAssociees: q.CompetencesAssociees || [],
        SpecialitesAssociees: q.SpecialitesAssociees || [],
        BaremeSubjectif: q.BaremeSubjectif ? { criteres: q.BaremeSubjectif.criteres } : null,
        Options: optionsToRender.map((opt, optIdx) => ({
          OptionId: opt.OptionId,
          LettreOption: optionLetters[optIdx] || opt.LettreOption,
          LettreArabe: ['أ', 'ب', 'ج', 'د'][optIdx] || '',
          EnonceOption: opt.EnonceOption,
          SchemaSVG: opt.SchemaSVG
          // SÉCURITÉ ABSOLUE : EstCorrecte et Explication ne sont JAMAIS transmises au frontend !
        }))
      };
    });

    return {
      test: {
        TestId: test.TestId,
        Code: test.Code,
        Titre: test.Titre,
        Description: test.Description,
        DureeMinutes: test.DureeMinutes,
        NombreQuestions: sanitizedQuestions.length,
        AutoriserRetour: test.AutoriserRetour,
        AutoriserPause: test.AutoriserPause,
        AutoriserReprise: test.AutoriserReprise,
        SeuilReussite: test.SeuilReussite
      },
      session: session ? {
        SessionId: session.SessionId,
        Statut: session.Statut,
        TentativeNumero: session.TentativeNumero,
        SeedGeneration: session.SeedGeneration,
        DateDebut: session.DateDebut,
        DateFinMaxServeur: session.DateFinMaxServeur,
        DureeEcouleeSecondes: session.DureeEcouleeSecondes,
        UserAnswers: session.UserAnswers || []
      } : null,
      questions: sanitizedQuestions
    };
  },

  /**
   * Démarre une session de test ou reprend une session existante selon les règles
   */
  async startOrResumeSession(testId, studentId, candidateData = null) {
    const tests = await group3Repository.getTests();
    const test = tests.find(t => t.TestId === parseInt(testId, 10));
    if (!test) throw new Error('Test introuvable.');

    const now = new Date();
    const sId = parseInt(studentId, 10);

    // 1. Mettre à jour les informations du candidat si fournies
    let student = await coreRepository.findActiveUserById(sId);
    if (student && candidateData) {
      await studentService.updateStudent(sId, candidateData).catch(() => {});
      student = await coreRepository.findActiveUserById(sId);
    }

    const candidatSnapshot = {
      Matricule: student?.Matricule || candidateData?.matricule || null,
      Age: student?.Age ?? (candidateData?.age ? parseInt(candidateData.age, 10) : null),
      TailleCm: student?.TailleCm ?? (candidateData?.tailleCm ? parseInt(candidateData.tailleCm, 10) : null),
      PoidsKg: student?.PoidsKg ?? (candidateData?.poidsKg ? parseFloat(candidateData.poidsKg) : null),
      IMC: student?.IMC || (candidateData?.poidsKg && candidateData?.tailleCm ? Math.round((parseFloat(candidateData.poidsKg) / Math.pow(parseInt(candidateData.tailleCm, 10) / 100, 2)) * 10) / 10 : null),
      VisionSIGYCOP_Y: student?.VisionSIGYCOP_Y ?? (candidateData?.visionSIGYCOP_Y ? parseInt(candidateData.visionSIGYCOP_Y, 10) : null),
      AcuiteVisuelle: student?.AcuiteVisuelle || candidateData?.acuiteVisuelle || null,
      EnregistreA: now.toISOString()
    };

    // Rechercher les sessions existantes de l'élève pour ce test
    const allStudentSessions = await group3Repository.getTestSessions({ utilisateurId: sId });
    const studentSessions = allStudentSessions.filter(s => s.TestId === test.TestId);

    const activeSession = studentSessions.find(s => s.Statut === 'EN_COURS' || s.Statut === 'PAUSE');
    const completedSessions = studentSessions.filter(s => s.Statut === 'TERMINE');

    // Vérification du nombre maximal de tentatives autorisées
    if (completedSessions.length >= (test.NombreTentativesMax || 2) && !activeSession) {
      return {
        session: completedSessions[completedSessions.length - 1],
        isFinished: true,
        message: `Nombre maximal de tentatives atteint (${test.NombreTentativesMax || 2}).`
      };
    }

    // Reprise d'une session en cours
    if (activeSession) {
      if (candidateData) {
        activeSession.CandidatSnapshot = candidatSnapshot;
      }

      // Contrôle de la durée côté serveur (ne pas se fier uniquement au client)
      if (activeSession.DateFinMaxServeur && new Date(activeSession.DateFinMaxServeur) < now) {
        activeSession.Statut = 'TERMINE';
        activeSession.DateFin = activeSession.DateFinMaxServeur;
        await group3Repository.updateTestSession(activeSession);
        return {
          session: activeSession,
          isFinished: true,
          message: 'Délai d\'évaluation expiré côté serveur.'
        };
      }

      if (!test.AutoriserReprise) {
        throw new Error('La reprise d\'épreuve n\'est pas autorisée par le protocole de ce test.');
      }

      activeSession.Statut = 'EN_COURS';
      await group3Repository.updateTestSession(activeSession);

      await coreRepository.appendLog({
        utilisateurId: sId,
        action: 'TEST_REPRIS',
        cible: `SessionTest #${activeSession.SessionId}`,
        details: `Reprise de l'épreuve ${test.Code} (Tentative ${activeSession.TentativeNumero}).`
      });

      return { session: activeSession, isFinished: false };
    }

    // -------------------------------------------------------------------------
    // MOTEUR DE GÉNÉRATION ALÉATOIRE ÉQUILIBRÉE ORIENT-G
    // -------------------------------------------------------------------------
    const attemptNumber = completedSessions.length + 1;

    const entropy = Math.floor(Math.random() * 1000000000);
    const attemptSeed = (candidateData && candidateData.forcedSeed)
      ? candidateData.forcedSeed
      : Math.floor(
          Math.abs(
            (Date.now() ^ (sId * 2654435761) ^ (attemptNumber * 2246822519) ^ entropy) % 2147483647
          )
        ) || 1;
    const rng = seededRandom(attemptSeed);

    const seenCounts = {};
    allStudentSessions.forEach(s => {
      (s.QuestionsSnapshot || []).forEach(qId => {
        seenCounts[qId] = (seenCounts[qId] || 0) + 1;
      });
    });

    const allQuestions = await group3Repository.getQuestions(false);
    let bankPool = allQuestions.filter(
      q => q.TestId === test.TestId && q.EstActive && !q.EstArchivee
    );
    if (bankPool.length === 0) {
      bankPool = allQuestions.filter(q => q.EstActive && !q.EstArchivee);
    }

    // Filtrage optionnel par difficulté cible si configurée par l'administrateur
    if (test.DifficulteCible && test.DifficulteCible !== 'TOUS') {
      const diffPool = bankPool.filter(q => q.Difficulte === test.DifficulteCible);
      if (diffPool.length >= (test.NombreQuestions || 60)) {
        bankPool = diffPool;
      }
    }

    let finalQuestions = [];
    const optionsOrderSnapshot = {};

    if (test.SelectionAleatoire !== false) {
      // 1. Définir les catégories cibles
      const defaultCategories = ['LOGIQUE', 'NUMERIQUE', 'SITUATION', 'PROCEDURE', 'OBSERVATION', 'TECHNIQUE', 'COMMUNICATION'];
      const targetCategories = (Array.isArray(test.CategoriesIncluses) && test.CategoriesIncluses.length > 0)
        ? test.CategoriesIncluses
        : defaultCategories;

      const totalTarget = Math.min(test.NombreQuestions || 60, bankPool.length);

      // 2. Calcul des quotas par catégorie
      const basePerCategory = Math.floor(totalTarget / targetCategories.length);
      const remainder = totalTarget % targetCategories.length;
      // Mélange des catégories avec rng pour distribuer le reste sans biais
      const shuffledCategories = seededShuffle([...targetCategories], Math.floor(rng() * 2147483647));
      const categoryQuotas = {};
      shuffledCategories.forEach((cat, idx) => {
        categoryQuotas[cat] = basePerCategory + (idx < remainder ? 1 : 0);
      });

      const selectedIds = new Set();
      const pickedQuestions = [];

      // 3. Sélection équilibrée par catégorie avec minimisation de répétition des questions déjà vues
      targetCategories.forEach(cat => {
        const catQuestions = bankPool.filter(
          q => (q.DomaineCode === cat || q.DomaineId === cat) && !selectedIds.has(q.QuestionId)
        );

        // Grouper par nombre de vues par cet élève
        const bySeen = {};
        catQuestions.forEach(q => {
          const count = seenCounts[q.QuestionId] || 0;
          if (!bySeen[count]) bySeen[count] = [];
          bySeen[count].push(q);
        });

        // Trier du moins vu au plus vu (0 vu d'abord, puis 1, etc.)
        const sortedSeenCounts = Object.keys(bySeen).map(Number).sort((a, b) => a - b);
        const sortedCatPool = [];
        sortedSeenCounts.forEach(c => {
          sortedCatPool.push(...seededShuffle(bySeen[c], Math.floor(rng() * 2147483647)));
        });

        const needed = categoryQuotas[cat] || 0;
        const chosen = sortedCatPool.slice(0, needed);
        chosen.forEach(q => {
          selectedIds.add(q.QuestionId);
          pickedQuestions.push(q);
        });
      });

      // 4. Si certaines catégories sont en sous-effectif, compléter avec le reste de la banque
      if (pickedQuestions.length < totalTarget) {
        const remainingPool = bankPool.filter(q => !selectedIds.has(q.QuestionId));
        const bySeen = {};
        remainingPool.forEach(q => {
          const count = seenCounts[q.QuestionId] || 0;
          if (!bySeen[count]) bySeen[count] = [];
          bySeen[count].push(q);
        });
        const sortedCounts = Object.keys(bySeen).map(Number).sort((a, b) => a - b);
        const sortedRemaining = [];
        sortedCounts.forEach(c => {
          sortedRemaining.push(...seededShuffle(bySeen[c], Math.floor(rng() * 2147483647)));
        });

        const toAdd = sortedRemaining.slice(0, totalTarget - pickedQuestions.length);
        toAdd.forEach(q => {
          selectedIds.add(q.QuestionId);
          pickedQuestions.push(q);
        });
      }

      // 5. Mélanger l'ordre global des questions sélectionnées pour chaque élève
      finalQuestions = seededShuffle(pickedQuestions, Math.floor(rng() * 2147483647));

      // 6. Mélanger l'ordre des options A, B, C, D pour chaque question
      finalQuestions.forEach(q => {
        if (Array.isArray(q.Options) && q.Options.length > 0) {
          const shuffledOpts = seededShuffle([...q.Options], Math.floor(rng() * 2147483647));
          optionsOrderSnapshot[q.QuestionId] = shuffledOpts.map(o => o.OptionId);
        }
      });
    } else {
      // Mode statique sans tirage aléatoire
      finalQuestions = [...bankPool].sort((a, b) => (a.OrdreAffichage || a.QuestionId) - (b.OrdreAffichage || b.QuestionId));
      if (test.NombreQuestions && test.NombreQuestions < finalQuestions.length) {
        finalQuestions = finalQuestions.slice(0, test.NombreQuestions);
      }
      finalQuestions.forEach(q => {
        if (Array.isArray(q.Options) && q.Options.length > 0) {
          optionsOrderSnapshot[q.QuestionId] = q.Options.map(o => o.OptionId);
        }
      });
    }

    const questionIdsSnapshot = finalQuestions.map(q => q.QuestionId);

    // Calcul du temps maximum autorisé côté serveur (+ 2 min de marge réseau)
    const durationMinutes = test.DureeMinutes || 35;
    const maxEndServer = new Date(now.getTime() + (durationMinutes * 60 + 120) * 1000);

    const newSessionData = {
      UtilisateurId: parseInt(studentId, 10),
      TestId: test.TestId,
      TentativeNumero: attemptNumber,
      SeedGeneration: attemptSeed,
      QuestionsSnapshot: questionIdsSnapshot,
      OptionsOrderSnapshot: optionsOrderSnapshot,
      ConfigSnapshot: {
        dureeMinutes: test.DureeMinutes,
        autoriserRetour: test.AutoriserRetour,
        autoriserPause: test.AutoriserPause,
        seuilReussite: test.SeuilReussite,
        version: test.Version || 1
      },
      CandidatSnapshot: candidatSnapshot,
      DateDebut: now.toISOString(),
      DateFinMaxServeur: maxEndServer.toISOString(),
      DateFin: null,
      DureeEcouleeSecondes: 0,
      Statut: 'EN_COURS',
      ScoreBrut: null,
      ScoreTotal: null,
      ScorePourcentage: null,
      IndiceConfiance: null,
      ProfilIncomplet: false,
      DonneesManquantes: [],
      Progression: 0,
      CreatedAt: now.toISOString(),
      UserAnswers: []
    };

    const newSession = await group3Repository.insertTestSession(newSessionData);

    await coreRepository.appendLog({
      utilisateurId: parseInt(studentId, 10),
      action: 'TEST_DEMARRE',
      cible: `SessionTest #${newSession.SessionId}`,
      details: `Démarrage de l'épreuve ${test.Code} (Tentative ${newSession.TentativeNumero}) par ${student?.Nom || 'Élève'} (${candidatSnapshot.Matricule || 'Sans matricule'}). IMC: ${candidatSnapshot.IMC || 'N/A'}. Questions: ${questionIdsSnapshot.length}.`
    });

    return { session: newSession, isFinished: false };
  },

  /**
   * Enregistre la progression / réponse (Autosave horodaté côté serveur)
   */
  async recordAnswer(sessionId, questionId, optionId, elapsedSeconds = 0, reponseTexte = null) {
    const session = await group3Repository.getTestSessionById(sessionId);
    if (!session) throw new Error('Session introuvable.');

    // Empêcher la modification d'une tentative finalisée
    if (session.Statut === 'TERMINE') {
      throw new Error('Impossible de modifier une session déjà clôturée définitivement.');
    }

    // Contrôle serveur de durée
    if (session.DateFinMaxServeur && new Date() > new Date(session.DateFinMaxServeur)) {
      session.Statut = 'TERMINE';
      session.DateFin = session.DateFinMaxServeur;
      await group3Repository.updateTestSession(session);
      throw new Error('Temps d\'épreuve écoulé. Modification rejetée par le serveur.');
    }

    if (!session.UserAnswers) {
      session.UserAnswers = [];
    }

    const qId = parseInt(questionId, 10);
    const existingIdx = session.UserAnswers.findIndex(a => a.questionId === qId);

    const answerEntry = {
      questionId: qId,
      optionId: optionId ? parseInt(optionId, 10) : null,
      reponseTexte: reponseTexte || null,
      savedAt: new Date().toISOString()
    };

    if (existingIdx >= 0) {
      session.UserAnswers[existingIdx] = answerEntry;
    } else {
      session.UserAnswers.push(answerEntry);
    }

    session.Progression = session.UserAnswers.length;
    session.DureeEcouleeSecondes = elapsedSeconds;

    await group3Repository.updateTestSession(session, { syncNormalized: true });

    return {
      success: true,
      progression: session.Progression,
      totalSaved: session.UserAnswers.length
    };
  },

  /**
   * Clôture définitive du test : calcul des scores, profil de compétences et orientation
   */
  async submitTest(sessionId, studentId, userAnswers = []) {
    const session = await group3Repository.getTestSessionById(sessionId);
    if (!session) throw new Error('Session introuvable.');

    // Idempotence : Si déjà soumise, retourner le résultat sans doublon
    if (session.Statut === 'TERMINE' && session.ScorePourcentage !== null) {
      return {
        session,
        scoreTotal: session.ScoreTotal,
        scoreMax: session.ScoreBrut,
        scorePercentage: session.ScorePourcentage,
        domainScores: session.ResultatsDomaines || [],
        recommendations: session.Recommandations || [],
        isAlreadySubmitted: true
      };
    }

    const student = await coreRepository.findActiveUserById(parseInt(studentId, 10));
    if (!student) throw new Error('Profil élève introuvable.');

    const answersToEvaluate = (userAnswers && userAnswers.length > 0) ? userAnswers : (session.UserAnswers || []);

    const [allQuestions, evaluations, { specialites }, conditions] = await Promise.all([
      group3Repository.getQuestions(true),
      group3Repository.getSubjectiveEvaluations(session.SessionId),
      coreRepository.getSpecialtiesAndDomains(),
      coreRepository.getConditions()
    ]);

    // Charger les questions exactes de la tentative à partir du snapshot
    let questions = [];
    if (session.QuestionsSnapshot && Array.isArray(session.QuestionsSnapshot)) {
      questions = session.QuestionsSnapshot.map(qId => allQuestions.find(q => q.QuestionId === qId)).filter(Boolean);
    } else {
      questions = allQuestions.filter(q => q.TestId === session.TestId);
    }

    // 1. Calcul du score brut et pourcentage
    let totalPoints = 0;
    let earnedPoints = 0;

    questions.forEach(q => {
      const qPts = q.Points || 1;
      totalPoints += qPts;
      const ans = answersToEvaluate.find(a => a.questionId === q.QuestionId || a.QuestionId === q.QuestionId);

      if (q.TypeQuestion === 'QUESTION_SUBJECTIVE') {
        const evalItem = evaluations.find(e => e.SessionId === session.SessionId && e.QuestionId === q.QuestionId);
        if (evalItem) {
          earnedPoints += evalItem.PointsAttribues;
        }
      } else if (ans) {
        const correctOpt = q.Options?.find(o => o.EstCorrecte);
        if (correctOpt && (ans.optionId === correctOpt.OptionId || ans.OptionIdSelectionnee === correctOpt.OptionId)) {
          earnedPoints += qPts;
        }
      }
    });

    const scorePercentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 1000) / 10 : 0;

    // 2. Calcul par domaine de compétences
    const domainScores = calculateDomainScores(answersToEvaluate, questions, evaluations);

    // 3. Calcul des profils de compétences spécifiques
    const competencyProfiles = calculateCompetencyProfiles(answersToEvaluate, questions, student);

    // 4. Calcul de l'indice de complétude et confiance dans les données
    const confidenceData = calculateDataConfidence(student, questions, answersToEvaluate);

    // 5. Calcul de l'orientation et vérification des conditions d'éligibilité
    const recommendations = matchStudentToSpecialties(
      student,
      domainScores,
      specialites,
      conditions,
      competencyProfiles
    );

    // 6. Mise à jour définitive de la session (gelée)
    session.Statut = 'TERMINE';
    session.DateFin = new Date().toISOString();
    session.ScoreTotal = earnedPoints;
    session.ScoreBrut = totalPoints;
    session.ScorePourcentage = scorePercentage;
    session.IndiceConfiance = confidenceData.confidenceScore;
    session.ProfilIncomplet = confidenceData.isIncomplete;
    session.DonneesManquantes = confidenceData.missingFields;
    session.Progression = questions.length;
    session.ResultatsDomaines = domainScores;
    session.ResultatsCompetences = competencyProfiles;
    session.Recommandations = recommendations;
    session.UserAnswers = answersToEvaluate;

    await group3Repository.updateTestSession(session, { syncNormalized: true });

    await coreRepository.appendLog({
      utilisateurId: student.UtilisateurId,
      action: 'TEST_SOUMIS',
      cible: `SessionTest #${session.SessionId}`,
      details: `Élève ${student.Nom} ${student.Prenom} (${student.Matricule}) a finalisé l'évaluation avec ${scorePercentage}%. Indice confiance données: ${confidenceData.confidenceScore}%.`
    });

    return {
      session,
      scoreTotal: earnedPoints,
      scoreMax: totalPoints,
      scorePercentage,
      domainScores,
      competencyProfiles,
      confidenceData,
      recommendations
    };
  },

  /**
   * Récupère les résultats complets d'une session avec sécurité RBAC
   */
  async getSessionResults(sessionId, requestingUserId, requestingRole) {
    let session = null;
    const numericId = parseInt(sessionId, 10);

    // 1. Recherche par SessionId direct
    if (!isNaN(numericId)) {
      session = await group3Repository.getTestSessionById(numericId);
    }

    // 2. Recherche de secours : si non trouvé, retrouver la dernière session de l'élève
    if (!session) {
      const targetUserId = requestingRole === 'ELEVE' ? parseInt(requestingUserId, 10) : (!isNaN(numericId) ? numericId : null);
      if (targetUserId) {
        const studentSessions = await group3Repository.getTestSessions({ utilisateurId: targetUserId });
        session = studentSessions.slice().reverse().find(s => s.Statut === 'TERMINE') || studentSessions[studentSessions.length - 1];
      }
    }

    if (!session) return null;

    // Sécurité : Un élève ne peut consulter que ses propres résultats
    if (requestingRole === 'ELEVE' && session.UtilisateurId !== parseInt(requestingUserId, 10)) {
      throw new Error('Accès non autorisé à cette session.');
    }

    const [student, tests] = await Promise.all([
      coreRepository.findActiveUserById(session.UtilisateurId),
      group3Repository.getTests()
    ]);
    const test = tests.find(t => t.TestId === session.TestId);

    // Si les recommandations n'ont pas encore été calculées (ou si la spécialité a été enrichie)
    let recommendations = session.Recommandations;
    let domainScores = session.ResultatsDomaines;
    let competencyProfiles = session.ResultatsCompetences;

    if (!recommendations || recommendations.length === 0) {
      const [allQuestions, evaluations, { specialites }, conditions] = await Promise.all([
        group3Repository.getQuestions(true),
        group3Repository.getSubjectiveEvaluations(session.SessionId),
        coreRepository.getSpecialtiesAndDomains(),
        coreRepository.getConditions()
      ]);
      domainScores = calculateDomainScores(session.UserAnswers || [], allQuestions, evaluations);
      competencyProfiles = calculateCompetencyProfiles(session.UserAnswers || [], allQuestions, student || {});
      recommendations = matchStudentToSpecialties(student || {}, domainScores, specialites, conditions, competencyProfiles);
      session.ResultatsDomaines = domainScores;
      session.ResultatsCompetences = competencyProfiles;
      session.Recommandations = recommendations;
      await group3Repository.updateTestSession(session, { syncNormalized: true }).catch(() => {});
    }

    return {
      session,
      student: student ? {
        UtilisateurId: student.UtilisateurId,
        Matricule: student.Matricule,
        Nom: student.Nom,
        Prenom: student.Prenom,
        Email: student.Email,
        ClassementInitial: student.ClassementInitial,
        NoteFormationPro: student.NoteFormationPro,
        AptitudePhysique: student.AptitudePhysique,
        StatutMedical: student.StatutMedical,
        TailleCm: student.TailleCm,
        PoidsKg: student.PoidsKg,
        VisionSIGYCOP_Y: student.VisionSIGYCOP_Y,
        MoyennesMatieres: student.MoyennesMatieres || {},
        CompetencesPratiques: student.CompetencesPratiques || {},
        PreferencesSpecialites: student.PreferencesSpecialites || []
      } : null,
      test: test ? {
        TestId: test.TestId,
        Titre: test.Titre,
        Code: test.Code,
        DureeMinutes: test.DureeMinutes
      } : null,
      domainScores: domainScores || [],
      competencyProfiles: competencyProfiles || [],
      confidenceScore: session.IndiceConfiance ?? 90,
      profilIncomplet: session.ProfilIncomplet ?? false,
      donneesManquantes: session.DonneesManquantes || [],
      recommendations: recommendations || []
    };
  },

  /**
   * Évaluation d'une question subjective par un évaluateur autorisé
   */
  async evaluateSubjectiveQuestion(sessionId, questionId, evaluateurId, pointsAttribues, commentaire) {
    const [session, question] = await Promise.all([
      group3Repository.getTestSessionById(sessionId),
      group3Repository.getQuestionById(questionId)
    ]);
    if (!session) throw new Error('Session introuvable.');
    if (!question) throw new Error('Question introuvable.');

    const maxPts = question.Points || 3;
    const pts = Math.min(maxPts, Math.max(0, parseFloat(pointsAttribues)));

    const evalRecord = await group3Repository.upsertSubjectiveEvaluation({
      SessionId: session.SessionId,
      QuestionId: question.QuestionId,
      EvaluateurId: parseInt(evaluateurId, 10),
      PointsAttribues: pts,
      PointsMax: maxPts,
      CommentaireEvaluateur: commentaire || '',
      DateEvaluation: new Date().toISOString()
    });

    await coreRepository.appendLog({
      utilisateurId: parseInt(evaluateurId, 10),
      action: 'EVALUATION_SUBJECTIVE',
      cible: `Session #${session.SessionId} - Question #${question.QuestionId}`,
      details: `Attribution de ${pts}/${maxPts} pts pour la question subjective.`
    });

    return evalRecord;
  }
};
