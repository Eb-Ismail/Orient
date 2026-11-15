// ==============================================================================
// ORIENT-GR - Service Métier des Simulations Professionnelles
// مركز المحاكاة المهنية للدرك الملكي • إدارة الجلسات والتقييم الميداني
// ==============================================================================

import { group3Repository } from '../repositories/group3Repository.js';
import { professionalSimulationModules } from '../lib/simulationData.js';
import { simulationTaskBank60 } from '../lib/simulationTaskBank60.js';
import { simulationEngine } from './simulationEngine.js';

const MODULE_TO_DOMAIN_MAP = {
  'SIM-PJ': 'PJ',
  'SIM-ROUTE': 'ROUTE',
  'SIM-TECH': 'TECH',
  'SIM-PLAN': 'PLAN',
  'SIM-ENV': 'ENV',
  'SIM-ADMIN': 'ADMIN'
};

export const simulationService = {
  /**
   * Récupère la banque complète des 60 tâches (réservé admin / tests)
   */
  async getAllTasks() {
    return group3Repository.getSimulationTasks();
  },

  /**
   * Récupère la liste des 6 modules de simulation avec l'état pour l'élève
   */
  async getModules(studentId) {
    const sId = parseInt(studentId, 10);
    const sessions = await group3Repository.getSimulationSessions(sId);

    return professionalSimulationModules.map(mod => {
      const session = sessions.find(s => s.ModuleId === mod.moduleId);
      const totalBankTasks = simulationTaskBank60.filter(
        t => t.domaineId === MODULE_TO_DOMAIN_MAP[mod.moduleId]
      ).length;

      return {
        moduleId: mod.moduleId,
        code: mod.code,
        numero: mod.numero,
        titreAr: mod.titreAr,
        titreFr: mod.titreFr,
        descriptionAr: mod.descriptionAr,
        descriptionFr: mod.descriptionFr,
        subdivision: mod.subdivision,
        specialiteAssociee: mod.specialiteAssociee,
        specialitesSecondaires: mod.specialitesSecondaires,
        dureeEstimeeMinutes: mod.dureeEstimeeMinutes,
        pointsTotal: mod.pointsTotal,
        competencesEvaluees: mod.competencesEvaluees,
        nombreEtapes: session?.TasksSnapshot?.length || 5,
        totalTachesBanque: totalBankTasks,
        // État de session
        statutSession: session ? session.Statut : 'NON_COMMENCE',
        scoreObtenu: session ? session.ScoreGlobal : null,
        mention: session ? session.Mention : null,
        dateCompletion: session ? session.DateFin : null,
        etapeCourante: session ? session.EtapeCourante : 1
      };
    });
  },

  /**
   * Récupère les détails d'un module et ses tâches interactives sécurisées
   */
  async getModuleDetails(moduleId, studentId) {
    const mod = professionalSimulationModules.find(m => m.moduleId === moduleId);
    if (!mod) return null;

    const sId = parseInt(studentId, 10);
    const allStudentSessions = await group3Repository.getSimulationSessions(sId);
    let session = allStudentSessions.find(s => s.ModuleId === moduleId);

    // Si aucune session n'existe encore ou snapshot manquant, en initialiser une pour fixer le snapshot
    if (!session || !Array.isArray(session.TasksSnapshot) || session.TasksSnapshot.length === 0) {
      session = await this.startOrResumeSession(moduleId, studentId);
    }

    // Récupérer les tâches correspondantes au snapshot de la session
    const taskIds = session.TasksSnapshot || [];
    const rawTasks = taskIds
      .map(id => simulationTaskBank60.find(t => t.taskId === id))
      .filter(Boolean);

    // Sécurisation stricte : expurger les réponses et clés de correction
    const sanitizedTasks = rawTasks.map(t => simulationEngine.sanitizeTaskForStudent(t));

    return {
      module: mod,
      tasks: sanitizedTasks,
      session: {
        sessionId: session.SessionId,
        statut: session.Statut,
        etapeCourante: session.EtapeCourante || 1,
        reponsesTasks: session.ReponsesTasks || {},
        dureeEcouleeSecondes: session.DureeEcouleeSecondes || 0,
        scoreGlobal: session.ScoreGlobal,
        dateDebut: session.DateDebut
      }
    };
  },

  /**
   * Démarre ou reprend une session de simulation avec tirage aléatoire équilibré
   */
  async startOrResumeSession(moduleId, studentId) {
    const mod = professionalSimulationModules.find(m => m.moduleId === moduleId);
    if (!mod) {
      throw new Error(`Module introuvable: ${moduleId}`);
    }

    const sId = parseInt(studentId, 10);
    const allStudentSessions = await group3Repository.getSimulationSessions(sId);
    let session = allStudentSessions.find(s => s.ModuleId === moduleId);

    // Si une session en cours existe déjà, la reprendre fidèlement (idempotence)
    if (session) {
      if (!Array.isArray(session.TasksSnapshot) || session.TasksSnapshot.length === 0) {
        const domaineId = MODULE_TO_DOMAIN_MAP[moduleId] || 'PJ';
        const seed = (sId * 31) + Date.now();
        const selectedTasks = simulationEngine.selectTasksForStudent({
          studentId: sId,
          domaineId,
          count: 5,
          pastAttemptTaskIds: [],
          seed
        });
        session.TasksSnapshot = selectedTasks.map(t => t.taskId);
        await group3Repository.saveSimulationSession(session, false);
      }
      return session;
    }

    // Récupérer l'historique des tâches déjà passées par cet élève pour minimiser la répétition
    const previousSessions = allStudentSessions.filter(s => s.ModuleId === moduleId);
    const pastTaskIds = [];
    previousSessions.forEach(s => {
      if (Array.isArray(s.TasksSnapshot)) {
        pastTaskIds.push(...s.TasksSnapshot);
      }
    });

    const domaineId = MODULE_TO_DOMAIN_MAP[moduleId] || 'PJ';
    const seed = (sId * 31) + Date.now();

    // Tirer 5 tâches équilibrées parmi les 10 du domaine
    const selectedTasks = simulationEngine.selectTasksForStudent({
      studentId: sId,
      domaineId,
      count: 5,
      pastAttemptTaskIds: pastTaskIds,
      seed
    });

    session = {
      ModuleId: moduleId,
      UtilisateurId: sId,
      DomaineId: domaineId,
      SeedGeneration: seed,
      TasksSnapshot: selectedTasks.map(t => t.taskId),
      Statut: 'EN_COURS',
      EtapeCourante: 1,
      ReponsesTasks: {},
      DureeEcouleeSecondes: 0,
      DateDebut: new Date().toISOString(),
      DateFin: null,
      ScoreGlobal: null,
      ResultatsCompetences: [],
      FeedbackRubrique: []
    };

    return group3Repository.saveSimulationSession(session, true);
  },

  /**
   * Sauvegarde la progression incrémentale sur une tâche
   */
  async saveProgress(moduleId, studentId, taskIndex, taskAnswers, elapsedSeconds) {
    const sId = parseInt(studentId, 10);
    const sessions = await group3Repository.getSimulationSessions(sId);
    const session = sessions.find(s => s.ModuleId === moduleId);

    if (!session) {
      throw new Error("Session introuvable pour enregistrer la progression.");
    }

    if (session.Statut === 'TERMINE') {
      return session;
    }

    if (!session.ReponsesTasks) {
      session.ReponsesTasks = {};
    }

    // Récupérer le taskId à cet index si disponible
    const taskId = session.TasksSnapshot?.[taskIndex - 1] || `task_${taskIndex}`;
    session.ReponsesTasks[taskId] = taskAnswers;
    session.EtapeCourante = Math.max(session.EtapeCourante || 1, taskIndex);

    if (elapsedSeconds !== undefined) {
      session.DureeEcouleeSecondes = elapsedSeconds;
    }
    session.DerniereMiseAJour = new Date().toISOString();

    return group3Repository.saveSimulationSession(session, false);
  },

  /**
   * Évalue et finalise la simulation
   */
  async submitModule(moduleId, studentId, allAnswers, totalDurationSeconds) {
    const mod = professionalSimulationModules.find(m => m.moduleId === moduleId);
    if (!mod) {
      throw new Error(`Module ${moduleId} introuvable.`);
    }

    const sId = parseInt(studentId, 10);
    const allStudentSessions = await group3Repository.getSimulationSessions(sId);
    let session = allStudentSessions.find(s => s.ModuleId === moduleId);

    if (!session) {
      session = await this.startOrResumeSession(moduleId, studentId);
    }

    const taskIds = session.TasksSnapshot || [];
    const evaluatedTasks = [];
    const feedbackRubrique = [];
    const rawResponses = allAnswers || session.ReponsesTasks || {};

    taskIds.forEach((taskId, idx) => {
      const task = simulationTaskBank60.find(t => t.taskId === taskId);
      if (!task) return;

      // Chercher la réponse de l'utilisateur par taskId ou par index d'étape
      const userResp = rawResponses[taskId] || rawResponses[`etape_${idx + 1}`] || {};
      const evalResult = simulationEngine.evaluateTaskResponse(task, userResp);

      evaluatedTasks.push({ task, evalResult });

      feedbackRubrique.push({
        stageIndex: idx + 1,
        taskId: task.taskId,
        titreAr: task.titreAr,
        pct: evalResult.scorePct,
        remarqueAr: evalResult.feedbackAr
      });
    });

    // Score global : moyenne des tâches évaluées
    const avgScore = evaluatedTasks.length > 0
      ? Math.round(evaluatedTasks.reduce((acc, curr) => acc + curr.evalResult.scorePct, 0) / evaluatedTasks.length)
      : 80;

    // Profil de compétences calculé sur ces tâches
    const resultatsCompetences = simulationEngine.calculateCompetencyProfile(evaluatedTasks);

    // Mention institutionnelle
    let mention = 'مقبول';
    if (avgScore >= 85) mention = 'امتياز';
    else if (avgScore >= 75) mention = 'جيد جداً';
    else if (avgScore >= 65) mention = 'جيد';

    // Clôture de session
    session.Statut = 'TERMINE';
    session.ScoreGlobal = avgScore;
    session.Mention = mention;
    session.DateFin = new Date().toISOString();
    session.DureeEcouleeSecondes = totalDurationSeconds || session.DureeEcouleeSecondes || 900;
    session.ReponsesTasks = rawResponses;
    session.ResultatsCompetences = resultatsCompetences;
    session.FeedbackRubrique = feedbackRubrique;

    await group3Repository.saveSimulationSession(session, false);

    return {
      session,
      module: mod,
      scoreGlobal: avgScore,
      mention,
      competences: resultatsCompetences,
      feedbackRubrique
    };
  },

  /**
   * Récupère le bilan détaillé d'un module pour l'élève
   */
  async getModuleResults(moduleId, studentId) {
    const mod = professionalSimulationModules.find(m => m.moduleId === moduleId);
    if (!mod) return null;

    const sId = parseInt(studentId, 10);
    const sessions = await group3Repository.getSimulationSessions(sId);
    const session = sessions.find(s => s.ModuleId === moduleId);

    if (!session || session.Statut !== 'TERMINE') {
      return null;
    }

    return {
      module: mod,
      session,
      scoreGlobal: session.ScoreGlobal,
      mention: session.Mention,
      dateCompletion: session.DateFin,
      dureeTotaleMinutes: Math.round((session.DureeEcouleeSecondes || 0) / 60),
      competences: session.ResultatsCompetences || [],
      feedbackRubrique: session.FeedbackRubrique || [],
      impactOrientation: {
        specialitePrincipale: mod.specialiteAssociee,
        specialitesSecondaires: mod.specialitesSecondaires,
        adequationScore: session.ScoreGlobal
      }
    };
  },

  /**
   * Synthèse globale de l'ensemble des modules de simulation pour l'élève
   */
  async getOverallSummary(studentId) {
    const sId = parseInt(studentId, 10);
    const sessions = (await group3Repository.getSimulationSessions(sId)).filter(s => s.Statut === 'TERMINE');

    const totalModules = professionalSimulationModules.length;
    const completedCount = sessions.length;

    const averageGlobal = completedCount > 0
      ? Math.round(sessions.reduce((acc, s) => acc + (s.ScoreGlobal || 0), 0) / completedCount)
      : 0;

    // Agréger toutes les compétences évaluées
    const aggregatedCompetencies = {};
    sessions.forEach(s => {
      (s.ResultatsCompetences || []).forEach(comp => {
        if (!aggregatedCompetencies[comp.code]) {
          aggregatedCompetencies[comp.code] = {
            code: comp.code,
            nomAr: comp.nomAr,
            scores: []
          };
        }
        aggregatedCompetencies[comp.code].scores.push(comp.scorePct);
      });
    });

    const competenciesSummary = Object.values(aggregatedCompetencies).map(c => {
      const avg = Math.round(c.scores.reduce((a, b) => a + b, 0) / c.scores.length);
      return {
        code: c.code,
        nomAr: c.nomAr,
        scoreMoyen: avg
      };
    });

    return {
      totalModules,
      completedCount,
      pourcentageAvancement: Math.round((completedCount / totalModules) * 100),
      scoreMoyenGlobal: averageGlobal,
      competenciesSummary,
      sessionsDetails: sessions.map(s => ({
        moduleId: s.ModuleId,
        scoreGlobal: s.ScoreGlobal,
        mention: s.Mention,
        dateFin: s.DateFin
      }))
    };
  }
};
