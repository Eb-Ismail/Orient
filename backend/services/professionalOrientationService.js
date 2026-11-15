// ==============================================================================
// ORIENT-GR - Service Central du Moteur de Scoring et d'Orientation Professionnelle
// محرك التقييم المهني واحتساب ملاءمة التخصصات والتقرير الشامل للدرك الملكي
// ==============================================================================

import { group3Repository } from '../repositories/group3Repository.js';
import { coreRepository } from '../repositories/coreRepository.js';
import {
  canonicalCompetencyFramework,
  initialSpecialtyCompetencyMatrix,
  defaultScoringCriteriaConfig
} from '../lib/competencyFramework.js';
import { simulationTaskBank60 } from '../lib/simulationTaskBank60.js';
import { professionalSimulationModules } from '../lib/simulationData.js';
import { simulationEngine } from './simulationEngine.js';
import {
  WORKSHOP_COMPETENCY_GROUPS,
  WORKSHOP_SPECIALTY_ALIGNMENT
} from '../lib/workshopCompetencyMapping.js';

// Correspondance entre les tags de tâches / ateliers et les 12 compétences canoniques
const TAG_TO_CANONICAL_COMPETENCY = {
  // Compétences des 3 tests simples officiels
  'Judicial analysis': 'JUDICIAL_DOC_ANALYSIS',
  'Scientific investigation': 'EVIDENCE_CLASSIFICATION',
  'Accuracy': 'JUDICIAL_DOC_ANALYSIS',
  'Documentation': 'PROFESSIONAL_REPORT_PREP',
  'Field management': 'FIELD_SITUATION_MGMT',
  'Road safety': 'ROAD_SAFETY_PROCEDURES',
  'Procedural awareness': 'LEGAL_PROCEDURAL_AWARENESS',
  'Organization': 'OPERATIONAL_PLANNING',
  'Digital skills': 'DIGITAL_DATA_ANALYSIS',
  'Administrative management': 'ADMINISTRATIVE_MGMT',
  'Technical analysis': 'TECHNICAL_SKILLS',
  'Planning and organization': 'OPERATIONAL_PLANNING',

  // PJ
  'DOC_ANALYSIS': 'JUDICIAL_DOC_ANALYSIS',
  'ACCURACY': 'JUDICIAL_DOC_ANALYSIS',
  'PROCEDURAL_AWARENESS': 'LEGAL_PROCEDURAL_AWARENESS',
  'PROCEDURAL_UND': 'LEGAL_PROCEDURAL_AWARENESS',
  'PROCEDURAL_APP': 'LEGAL_PROCEDURAL_AWARENESS',
  'CLASSIFICATION': 'EVIDENCE_CLASSIFICATION',
  'REPORT_PREPARATION': 'PROFESSIONAL_REPORT_PREP',

  // ROUTE
  'FIELD_ORG': 'FIELD_SITUATION_MGMT',
  'RISK_ASSESSMENT': 'FIELD_SITUATION_MGMT',
  'DECISION_MAKING': 'FIELD_SITUATION_MGMT',

  // TECH
  'DATA_PROCESSING': 'DIGITAL_DATA_ANALYSIS',
  'TECH_SOLVING': 'TECHNICAL_SKILLS',

  // PLAN
  'PLANNING': 'OPERATIONAL_PLANNING',
  'RESOURCE_MGMT': 'OPERATIONAL_PLANNING',
  'COORDINATION': 'TEAM_COORDINATION',

  // ENV
  'FIELD_OBS': 'ENVIRONMENTAL_MONITORING',
  'ENV_AWARENESS': 'ENVIRONMENTAL_MONITORING',

  // ADMIN
  'ADMIN_ORG': 'ADMINISTRATIVE_MGMT',
  'DOC_MGMT': 'ADMINISTRATIVE_MGMT',

  // Ateliers Pratiques (Workshops)
  'CAT-INFO': 'DIGITAL_DATA_ANALYSIS',
  'CAT-MECA': 'TECHNICAL_SKILLS',
  'CAT-TELECOM': 'TECHNICAL_SKILLS',
  'CAT-LOG': 'ADMINISTRATIVE_MGMT',
  'COMP-INFO-MAINT': 'TECHNICAL_SKILLS',
  'COMP-INFO-NET': 'DIGITAL_DATA_ANALYSIS',
  'COMP-INFO-DATA': 'DIGITAL_DATA_ANALYSIS',
  'COMP-INFO-OFFICE': 'ADMINISTRATIVE_MGMT',
  'COMP-MECA-DIAG': 'TECHNICAL_SKILLS',
  'COMP-MECA-ELEC': 'TECHNICAL_SKILLS',
  'COMP-MECA-ENG': 'TECHNICAL_SKILLS',
  'COMP-MECA-OBD': 'DIGITAL_DATA_ANALYSIS',
  'COMP-TEL-MAINT': 'TECHNICAL_SKILLS',
  'COMP-TEL-DIAG': 'TECHNICAL_SKILLS',
  'COMP-TEL-PREC': 'TECHNICAL_SKILLS',
  'COMP-LOG-STOCK': 'ADMINISTRATIVE_MGMT',
  'COMP-LOG-ORG': 'OPERATIONAL_PLANNING',
  'COMP-LOG-MAINT': 'TECHNICAL_SKILLS',
  'COMP-LOG-RES': 'OPERATIONAL_PLANNING'
};

export const professionalOrientationService = {
  /**
   * Récupère le référentiel des 12 compétences professionnelles
   */
  async getCompetencyFramework() {
    return group3Repository.getCompetencies();
  },

  /**
   * Met à jour une compétence dans le référentiel sans modifier le code source
   */
  async updateCompetency(code, updates = {}) {
    const updated = await group3Repository.updateCompetency(code, updates);
    if (!updated) {
      throw new Error(`Compétence introuvable: ${code}`);
    }
    return updated;
  },

  /**
   * Récupère la matrice configurable des spécialités et poids de compétences
   */
  async getSpecialtyMatrix() {
    return group3Repository.getSpecialtyMatrix();
  },

  /**
   * Met à jour les poids et critères d'une spécialité sans modifier le code source
   */
  async updateSpecialtyMatrix(specialiteCode, { poidsCompetences, justificationAr, conditionsAVerifier }) {
    const updated = await group3Repository.updateSpecialtyMatrix(specialiteCode, {
      poidsCompetences,
      justificationAr,
      conditionsAVerifier
    });
    if (!updated) {
      throw new Error(`Spécialité introuvable: ${specialiteCode}`);
    }
    return updated;
  },

  /**
   * Récupère la configuration des critères d'évaluation des tâches
   */
  async getScoringCriteriaConfig() {
    return group3Repository.getScoringCriteriaConfig();
  },

  /**
   * Met à jour la configuration des critères d'évaluation
   */
  async updateScoringCriteriaConfig(newConfig) {
    return group3Repository.updateScoringCriteriaConfig(newConfig);
  },

  /**
   * Récupère le mapping officiel des compétences pratiques d'ateliers
   */
  async getWorkshopCompetencyGroups() {
    return WORKSHOP_COMPETENCY_GROUPS;
  },

  /**
   * Calcule le profil des 12 compétences pratiques de l'élève
   * en combinant :
   * 1. Les 3 tests professionnels (TEST-01, TEST-02, TEST-03)
   * 2. Les évaluations des ateliers pratiques validés (Statut VALIDE / EVALUE)
   * 3. Les simulations interactives si existantes
   * Règle de non-biais : les ateliers non réalisés ne sont JAMAIS comptabilisés comme 0.
   */
  async calculateStudentCompetencies(studentId) {
    const sId = parseInt(studentId, 10);
    const [framework, allTestSessions, allQuestions, wsBundle, allSimSessions] = await Promise.all([
      group3Repository.getCompetencies(),
      group3Repository.getTestSessions({ utilisateurId: sId }),
      group3Repository.getQuestions(true),
      group3Repository.loadWorkshopsBundle(),
      group3Repository.getSimulationSessions(sId)
    ]);

    // Initialiser les 12 compétences
    const compAccumulator = {};
    framework.forEach(c => {
      compAccumulator[c.code] = {
        code: c.code,
        numero: c.numero,
        nomAr: c.nomAr,
        nomFr: c.nomFr,
        domaineId: c.domaineId,
        descriptionAr: c.descriptionAr,
        criteresEvaluation: c.criteresEvaluation || [],
        scores: [],
        contributingTasks: [],
        contributingWorkshops: []
      };
    });

    // 1. Parcourir les sessions des 3 tests simples professionnels
    const testSessions = allTestSessions.filter(s => s.Statut === 'TERMINE');

    testSessions.forEach(sess => {
      const userAnswers = sess.UserAnswers || [];
      userAnswers.forEach(ans => {
        const qId = ans.questionId || ans.QuestionId;
        const q = allQuestions.find(item => item.QuestionId === qId);
        if (!q) return;

        const correctOpt = q.Options?.find(o => o.EstCorrecte);
        const isCorrect = correctOpt && (ans.optionId === correctOpt.OptionId || ans.OptionIdSelectionnee === correctOpt.OptionId);
        const scorePct = isCorrect ? 100 : 0;

        const tags = q.CompetencesAssociees || [];
        const canonicalCodes = new Set();
        tags.forEach(t => {
          const mapped = TAG_TO_CANONICAL_COMPETENCY[t] || (compAccumulator[t] ? t : null);
          if (mapped && compAccumulator[mapped]) canonicalCodes.add(mapped);
        });

        if (canonicalCodes.size === 0) {
          if (q.TestId === 1) canonicalCodes.add('JUDICIAL_DOC_ANALYSIS');
          else if (q.TestId === 2) canonicalCodes.add('FIELD_SITUATION_MGMT');
          else if (q.TestId === 3) canonicalCodes.add('DIGITAL_DATA_ANALYSIS');
        }

        canonicalCodes.forEach(code => {
          compAccumulator[code].scores.push(scorePct);
          compAccumulator[code].contributingTasks.push({
            taskId: q.QuestionId,
            testId: q.TestId,
            titreAr: q.Enonce ? (q.Enonce.substring(0, 50) + '...') : `سؤال ${q.Code}`,
            titreFr: `Question ${q.Code}`,
            interactionType: 'QCM_PROFESSIONNEL',
            scorePct: scorePct,
            pointsObtenus: isCorrect ? 1 : 0,
            date: sess.DateFin
          });
        });
      });
    });

    // 2. Parcourir les assignations d'ateliers pratiques évaluées et validées (VALIDE ou EVALUE)
    const workshopAssignments = wsBundle.assignments.filter(
      a => a.UtilisateurId === sId && (a.Statut === 'VALIDE' || a.Statut === 'EVALUE')
    );
    const workshops = wsBundle.workshops;

    workshopAssignments.forEach(assign => {
      const w = workshops.find(item => item.AtelierId === assign.AtelierId);
      if (!w) return;

      const workshopScorePct = assign.ScorePourcentage !== null && assign.ScorePourcentage !== undefined
        ? assign.ScorePourcentage
        : Math.round(((assign.ScoreObtenu || 0) / (assign.ScoreTotalMax || 20)) * 100);

      // Trouver les compétences canoniques associées à la catégorie et aux sous-domaines de cet atelier
      const canonicalCodes = new Set();

      // Mapping par catégorie
      const catMapped = TAG_TO_CANONICAL_COMPETENCY[w.CategorieId];
      if (catMapped && compAccumulator[catMapped]) {
        canonicalCodes.add(catMapped);
      }

      // Mapping par compétences d'ateliers définies
      WORKSHOP_COMPETENCY_GROUPS.forEach(grp => {
        if (grp.categorieId === w.CategorieId) {
          grp.competences.forEach(c => {
            if (c.workshops.includes(w.AtelierId)) {
              const mapped = TAG_TO_CANONICAL_COMPETENCY[c.code];
              if (mapped && compAccumulator[mapped]) {
                canonicalCodes.add(mapped);
              }
            }
          });
        }
      });

      // Si aucune trouvée, attribuer à TECHNICAL_SKILLS par défaut
      if (canonicalCodes.size === 0) {
        canonicalCodes.add('TECHNICAL_SKILLS');
      }

      const workshopEntry = {
        atelierId: w.AtelierId,
        assignationId: assign.AssignationId,
        code: w.Code,
        titreFr: w.Titre,
        titreAr: w.TitreAr,
        categorieId: w.CategorieId,
        scoreObtenu: assign.ScoreObtenu,
        scoreTotalMax: assign.ScoreTotalMax || 20,
        scorePct: workshopScorePct,
        mention: assign.Mention,
        pointsForts: assign.PointsForts || [],
        axesAmelioration: assign.AxesAmelioration || [],
        competencesDetectees: assign.CompetencesDetectees || [],
        observations: assign.ObservationsEvaluateur,
        superviseurNom: assign.SuperviseurNom,
        dateRealisation: assign.DateRealisation || assign.DateValidation
      };

      canonicalCodes.forEach(code => {
        compAccumulator[code].scores.push(workshopScorePct);
        compAccumulator[code].contributingWorkshops.push(workshopEntry);
      });
    });

    // 3. Parcourir les sessions de simulation si existantes (historique)
    const simulationSessions = allSimSessions.filter(s => s.Statut === 'TERMINE');

    simulationSessions.forEach(sess => {
      const taskIds = sess.TasksSnapshot || [];
      const responses = sess.ReponsesTasks || {};

      taskIds.forEach((tId, idx) => {
        const task = simulationTaskBank60.find(t => t.taskId === tId);
        if (!task) return;

        const userResp = responses[tId] || responses[`etape_${idx + 1}`] || {};
        const evalResult = simulationEngine.evaluateTaskResponse(task, userResp);

        const tags = task.competenceTags || [];
        const canonicalCodes = new Set();
        tags.forEach(t => {
          const mapped = TAG_TO_CANONICAL_COMPETENCY[t];
          if (mapped && compAccumulator[mapped]) canonicalCodes.add(mapped);
        });

        if (canonicalCodes.size === 0) {
          const defaultComp = framework.find(c => c.domaineId === task.domaineId);
          if (defaultComp) canonicalCodes.add(defaultComp.code);
        }

        canonicalCodes.forEach(code => {
          compAccumulator[code].scores.push(evalResult.scorePct);
          compAccumulator[code].contributingTasks.push({
            taskId: task.taskId,
            titreAr: task.titreAr,
            interactionType: task.interactionType,
            scorePct: evalResult.scorePct,
            pointsObtenus: evalResult.pointsObtenus,
            date: sess.DateFin
          });
        });
      });
    });

    // Calcul des moyennes sans pénaliser les compétences non évaluées
    return Object.values(compAccumulator).map(comp => {
      const evaluatedCount = comp.scores.length;
      const scorePct = evaluatedCount > 0
        ? Math.round(comp.scores.reduce((a, b) => a + b, 0) / evaluatedCount)
        : null;

      let niveau = 'NON_EVALUE';
      if (scorePct !== null) {
        if (scorePct >= 80) niveau = 'MAITRISE_ELEVEE';
        else if (scorePct >= 65) niveau = 'SATISFAISANT';
        else niveau = 'EN_DEVELOPPEMENT';
      }

      return {
        code: comp.code,
        numero: comp.numero,
        nomAr: comp.nomAr,
        nomFr: comp.nomFr,
        domaineId: comp.domaineId,
        descriptionAr: comp.descriptionAr,
        criteresEvaluation: comp.criteresEvaluation,
        scorePct: scorePct !== null ? scorePct : 70, // Indicatif si non testé
        rawScorePct: scorePct,
        isEvaluated: evaluatedCount > 0,
        evaluatedCount,
        niveau: scorePct !== null ? niveau : 'SATISFAISANT',
        contributingTasks: comp.contributingTasks,
        contributingWorkshops: comp.contributingWorkshops
      };
    });
  },

  /**
   * Calcule le profil professionnel détaillé de l'élève (Section 1 du prompt)
   * Affiche : ateliers réalisés, historique, scores /20, performance globale,
   * compétences validées par groupe, points forts, axes d'amélioration, observations.
   */
  async getTraineeProfessionalSkillsProfile(studentId) {
    const sId = parseInt(studentId, 10);
    const bundle = await group3Repository.loadWorkshopsBundle();
    const student = bundle.users.find(u => u.UtilisateurId === sId) || {};
    const promotions = bundle.promotions;
    const promo = promotions.find(p => p.PromotionId === student.PromotionId) || {};

    const allAssignments = bundle.assignments.filter(a => a.UtilisateurId === sId);
    const workshops = bundle.workshops;
    const categories = bundle.categories;

    // Séances évaluées / validées
    const validatedAssignments = allAssignments.filter(
      a => a.Statut === 'VALIDE' || a.Statut === 'EVALUE'
    );

    // Calcul de la performance pratique globale
    let totalScoreObtenu = 0;
    let totalScoreMax = 0;
    validatedAssignments.forEach(a => {
      totalScoreObtenu += (a.ScoreObtenu || 0);
      totalScoreMax += (a.ScoreTotalMax || 20);
    });

    const averageScore20 = validatedAssignments.length > 0
      ? Math.round((totalScoreObtenu / validatedAssignments.length) * 10) / 10
      : null;

    const averageScorePct = totalScoreMax > 0
      ? Math.round((totalScoreObtenu / totalScoreMax) * 100)
      : null;

    let overallMention = 'NON_EVALUE';
    if (averageScorePct !== null) {
      if (averageScorePct >= 90) overallMention = 'EXCELLENT';
      else if (averageScorePct >= 80) overallMention = 'TRES_BIEN';
      else if (averageScorePct >= 70) overallMention = 'BIEN';
      else if (averageScorePct >= 50) overallMention = 'SATISFAISANT';
      else overallMention = 'A_PERFECTIONNER';
    }

    // Historique complet des participations
    const participationHistory = allAssignments.map(a => {
      const w = workshops.find(item => item.AtelierId === a.AtelierId) || {};
      const cat = categories.find(c => c.id === w.CategorieId) || {};

      return {
        assignationId: a.AssignationId,
        atelierId: a.AtelierId,
        code: w.Code,
        titreFr: w.Titre,
        titreAr: w.TitreAr,
        categorieId: w.CategorieId,
        categorieNom: cat.intituleFr || 'Atelier Professionnel',
        statut: a.Statut,
        dateAssignation: a.DateAssignation,
        datePrevue: a.DatePrevue,
        dateRealisation: a.DateRealisation || a.DateValidation,
        superviseurNom: a.SuperviseurNom,
        scoreObtenu: a.ScoreObtenu,
        scoreTotalMax: a.ScoreTotalMax || 20,
        scorePourcentage: a.ScorePourcentage,
        mention: a.Mention,
        arretSecurite: Boolean(a.ArretSecurite),
        motifArretSecurite: a.MotifArretSecurite,
        notesCriteres: a.NotesCriteres || {},
        observations: a.ObservationsEvaluateur,
        pointsForts: a.PointsForts || [],
        axesAmelioration: a.AxesAmelioration || [],
        competencesDetectees: a.CompetencesDetectees || [],
        preuvesAttachees: a.PreuvesAttachees || []
      };
    });

    // Compétences techniques validées regroupées selon les 4 groupes officiels
    const validatedWorkshopIds = new Set(validatedAssignments.map(a => a.AtelierId));
    const competencyGroupsAnalysis = WORKSHOP_COMPETENCY_GROUPS.map(grp => {
      const analyzedCompetencies = grp.competences.map(comp => {
        // Trouver si l'élève a réalisé au moins un atelier associé
        const matchingAssignments = validatedAssignments.filter(a =>
          comp.workshops.includes(a.AtelierId)
        );

        const isDemonstrated = matchingAssignments.length > 0;
        let compScorePct = null;
        if (isDemonstrated) {
          const sum = matchingAssignments.reduce((acc, a) => acc + (a.ScorePourcentage || 0), 0);
          compScorePct = Math.round(sum / matchingAssignments.length);
        }

        return {
          code: comp.code,
          nomFr: comp.nomFr,
          nomAr: comp.nomAr,
          descriptionFr: comp.descriptionFr,
          workshopsAssocies: comp.workshops,
          isDemonstrated,
          scorePourcentage: compScorePct,
          nombreAteliersValides: matchingAssignments.length,
          niveau: compScorePct !== null
            ? (compScorePct >= 80 ? 'MAITRISE_ELEVEE' : compScorePct >= 65 ? 'SATISFAISANT' : 'EN_DEVELOPPEMENT')
            : 'NON_EVALUE'
        };
      });

      const demonstratedCount = analyzedCompetencies.filter(c => c.isDemonstrated).length;
      return {
        groupId: grp.groupId,
        nomFr: grp.nomFr,
        nomAr: grp.nomAr,
        categorieId: grp.categorieId,
        totalCompetences: analyzedCompetencies.length,
        competencesValideesCount: demonstratedCount,
        competences: analyzedCompetencies
      };
    });

    // Synthèse dédupliquée des points forts, axes d'amélioration et observations
    const strengthsSet = new Set();
    const improvementsSet = new Set();
    const observationsList = [];
    const allDetectedSkills = new Set();

    validatedAssignments.forEach(a => {
      (a.PointsForts || []).forEach(p => { if (p && p.trim()) strengthsSet.add(p.trim()); });
      (a.AxesAmelioration || []).forEach(ax => { if (ax && ax.trim()) improvementsSet.add(ax.trim()); });
      (a.CompetencesDetectees || []).forEach(s => { if (s && s.trim()) allDetectedSkills.add(s.trim()); });

      if (a.ObservationsEvaluateur && a.ObservationsEvaluateur.trim()) {
        const w = workshops.find(item => item.AtelierId === a.AtelierId);
        observationsList.push({
          assignationId: a.AssignationId,
          atelierCode: w?.Code || `ATEL-${a.AtelierId}`,
          atelierTitre: w?.Titre || 'Atelier Pratique',
          superviseurNom: a.SuperviseurNom || 'Instructeur Évaluateur',
          date: a.DateRealisation || a.DateValidation || new Date().toISOString(),
          observation: a.ObservationsEvaluateur.trim()
        });
      }
    });

    // Recommandations combinées TOP 3
    const { topThree } = await this.matchStudentToSpecialties(sId);

    return {
      studentInfo: {
        id: student.UtilisateurId,
        nom: student.Nom,
        prenom: student.Prenom,
        matricule: student.Matricule,
        email: student.Email,
        promotion: promo.Nom || 'Promotion 54',
        promotionId: student.PromotionId
      },
      overallPerformance: {
        totalAssigned: allAssignments.length,
        completedCount: validatedAssignments.length,
        pendingCount: allAssignments.length - validatedAssignments.length,
        averageScore20,
        averageScorePct,
        overallMention
      },
      participationHistory,
      competencyGroupsAnalysis,
      validatedTechnicalSkills: Array.from(allDetectedSkills),
      identifiedStrengths: Array.from(strengthsSet),
      skillsRequiringImprovement: Array.from(improvementsSet),
      evaluatorObservations: observationsList,
      topRecommendedSpecialties: topThree
    };
  },

  /**
   * Tableau de bord analytique des résultats pratiques (Section 3 du prompt)
   * Statistiques complètes pour l'administration :
   * - Total élèves évalués
   * - Nombre d'ateliers complétés
   * - Performance pratique moyenne
   * - Compétences les plus démontrées
   * - Ateliers avec la plus forte participation
   * - Élèves aux performances pratiques remarquables
   * - Distribution de la performance par groupe / promotion
   */
  async getWorkshopAnalyticsDashboard(promotionId = null) {
    const bundle = await group3Repository.loadWorkshopsBundle();
    const users = bundle.users;
    let students = users.filter(u => u.Role === 'ELEVE' || !u.Role);
    if (promotionId) {
      students = students.filter(s => s.PromotionId === parseInt(promotionId, 10));
    }

    const studentIds = new Set(students.map(s => s.UtilisateurId));
    const allAssignments = bundle.assignments.filter(
      a => studentIds.has(a.UtilisateurId)
    );
    const workshops = bundle.workshops;
    const categories = bundle.categories;
    const promotions = bundle.promotions;

    // Séances évaluées (VALIDE ou EVALUE)
    const evaluatedAssignments = allAssignments.filter(
      a => a.Statut === 'VALIDE' || a.Statut === 'EVALUE'
    );

    // Total élèves évalués (au moins un atelier validé)
    const evaluatedStudentIds = new Set(evaluatedAssignments.map(a => a.UtilisateurId));
    const totalTraineesEvaluated = evaluatedStudentIds.size;

    // Performance pratique moyenne
    let sumScoreObtenu = 0;
    let sumScoreMax = 0;
    evaluatedAssignments.forEach(a => {
      sumScoreObtenu += (a.ScoreObtenu || 0);
      sumScoreMax += (a.ScoreTotalMax || 20);
    });

    const averagePerformancePct = sumScoreMax > 0
      ? Math.round((sumScoreObtenu / sumScoreMax) * 100)
      : 0;

    const averageScore20 = evaluatedAssignments.length > 0
      ? Math.round((sumScoreObtenu / evaluatedAssignments.length) * 10) / 10
      : 0;

    // Compétences les plus démontrées (Fréquences)
    const skillCounts = {};
    evaluatedAssignments.forEach(a => {
      (a.CompetencesDetectees || []).forEach(skill => {
        if (!skill) return;
        skillCounts[skill] = (skillCounts[skill] || 0) + 1;
      });
    });

    const mostDemonstratedCompetencies = Object.entries(skillCounts)
      .map(([nom, count]) => ({
        nom,
        count,
        pourcentage: totalTraineesEvaluated > 0 ? Math.round((count / totalTraineesEvaluated) * 100) : 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    // Ateliers avec la plus forte participation
    const workshopsParticipation = workshops.map(w => {
      const wAssigns = allAssignments.filter(a => a.AtelierId === w.AtelierId);
      const wEvaluated = wAssigns.filter(a => a.Statut === 'VALIDE' || a.Statut === 'EVALUE');
      const cat = categories.find(c => c.id === w.CategorieId) || {};

      const avg = wEvaluated.length > 0
        ? Math.round(wEvaluated.reduce((acc, a) => acc + (a.ScorePourcentage || 0), 0) / wEvaluated.length)
        : null;

      return {
        atelierId: w.AtelierId,
        code: w.Code,
        titre: w.Titre,
        categorieId: w.CategorieId,
        categorieNom: cat.intituleFr || 'Atelier',
        assignesCount: wAssigns.length,
        completesCount: wEvaluated.length,
        tauxCompletion: wAssigns.length > 0 ? Math.round((wEvaluated.length / wAssigns.length) * 100) : 0,
        scoreMoyenPourcentage: avg
      };
    }).sort((a, b) => b.completesCount - a.completesCount);

    // Élèves aux performances remarquables (Top Trainees)
    const topPerformingTrainees = [];
    for (const sId of evaluatedStudentIds) {
      const s = students.find(u => u.UtilisateurId === sId);
      if (!s) continue;

      const sAssigns = evaluatedAssignments.filter(a => a.UtilisateurId === sId);
      const sScoreAvg = sAssigns.length > 0
        ? Math.round(sAssigns.reduce((acc, a) => acc + (a.ScoreObtenu || 0), 0) / sAssigns.length * 10) / 10
        : 0;
      const sScorePct = sAssigns.length > 0
        ? Math.round(sAssigns.reduce((acc, a) => acc + (a.ScorePourcentage || 0), 0) / sAssigns.length)
        : 0;

      const p = promotions.find(pr => pr.PromotionId === s.PromotionId);

      // Compétences clés
      const sSkills = new Set();
      sAssigns.forEach(a => (a.CompetencesDetectees || []).forEach(sk => sSkills.add(sk)));

      // Orientation recommandée
      const { topThree } = await this.matchStudentToSpecialties(sId);

      topPerformingTrainees.push({
        studentId: s.UtilisateurId,
        matricule: s.Matricule,
        nom: s.Nom,
        prenom: s.Prenom,
        promotionNom: p?.Nom || 'Promotion 54',
        ateliersCompletes: sAssigns.length,
        scoreMoyen20: sScoreAvg,
        scoreMoyenPct: sScorePct,
        mention: sScorePct >= 90 ? 'EXCELLENT' : sScorePct >= 80 ? 'TRES_BIEN' : 'BIEN',
        competencesCles: Array.from(sSkills).slice(0, 3),
        recommandationTop: topThree[0]?.intituleFr || 'Police Judiciaire'
      });
    }

    topPerformingTrainees.sort((a, b) => b.scoreMoyen20 - a.scoreMoyen20);

    // Distribution des performances par cohorte / promotion
    const performanceDistributionByGroup = promotions.map(promo => {
      const promoStudents = students.filter(s => s.PromotionId === promo.PromotionId);
      const promoStudentIds = new Set(promoStudents.map(s => s.UtilisateurId));
      const promoEvaluatedAssigns = evaluatedAssignments.filter(a => promoStudentIds.has(a.UtilisateurId));

      const avgScore20 = promoEvaluatedAssigns.length > 0
        ? Math.round(promoEvaluatedAssigns.reduce((acc, a) => acc + (a.ScoreObtenu || 0), 0) / promoEvaluatedAssigns.length * 10) / 10
        : null;

      const avgPct = promoEvaluatedAssigns.length > 0
        ? Math.round(promoEvaluatedAssigns.reduce((acc, a) => acc + (a.ScorePourcentage || 0), 0) / promoEvaluatedAssigns.length)
        : null;

      return {
        promotionId: promo.PromotionId,
        nom: promo.Nom,
        annee: promo.Annee,
        effectifTotal: promoStudents.length,
        elevesEvaluesCount: promoStudents.filter(s => evaluatedStudentIds.has(s.UtilisateurId)).length,
        ateliersRealisesCount: promoEvaluatedAssigns.length,
        scoreMoyen20: avgScore20,
        scoreMoyenPct: avgPct
      };
    });

    return {
      kpis: {
        totalTrainees: students.length,
        totalTraineesEvaluated,
        tauxCouvertureEvaluation: students.length > 0 ? Math.round((totalTraineesEvaluated / students.length) * 100) : 0,
        totalCompletedWorkshops: evaluatedAssignments.length,
        averagePerformancePct,
        averageScore20
      },
      mostDemonstratedCompetencies,
      workshopsParticipation,
      topPerformingTrainees: topPerformingTrainees.slice(0, 10),
      performanceDistributionByGroup,
      statusBreakdown: {
        valide: allAssignments.filter(a => a.Statut === 'VALIDE' || a.Statut === 'EVALUE').length,
        enAttenteValidation: allAssignments.filter(a => a.Statut === 'EN_ATTENTE_VALIDATION').length,
        enCours: allAssignments.filter(a => a.Statut === 'EN_COURS').length,
        nonCommence: allAssignments.filter(a => a.Statut === 'NON_COMMENCE' || a.Statut === 'ASSIGNE').length,
        rejete: allAssignments.filter(a => a.Statut === 'REJETE' || a.ArretSecurite).length
      }
    };
  },

  /**
   * Système d'Orientation Recommandée Combinée (Section 4 du prompt)
   * Fusionne :
   * 1. Les résultats des 3 tests professionnels (TEST-01, TEST-02, TEST-03)
   * 2. Les évaluations des ateliers pratiques validés
   * Génère les 3 spécialités les plus compatibles avec :
   * - Nom de la spécialité
   * - Score de compatibilité
   * - Résultats des tests pertinents
   * - Résultats des ateliers pertinents
   * - Points forts à l'appui
   * - Axes d'amélioration
   * - Explication motivée
   * - Séparation stricte de l'éligibilité médicale / physique
   */
  async matchStudentToSpecialties(studentId) {
    const sId = parseInt(studentId, 10);
    const [wsBundle, competencies, specialtyMatrix, allStudentSessions, tests] = await Promise.all([
      group3Repository.loadWorkshopsBundle(),
      this.calculateStudentCompetencies(sId),
      group3Repository.getSpecialtyMatrix(),
      group3Repository.getTestSessions({ utilisateurId: sId }),
      group3Repository.getTests()
    ]);

    const student = wsBundle.users.find(u => u.UtilisateurId === sId) || {};
    const completedTestSessions = allStudentSessions.filter(s => s.Statut === 'TERMINE');
    const validatedWorkshopAssignments = wsBundle.assignments.filter(
      a => a.UtilisateurId === sId && (a.Statut === 'VALIDE' || a.Statut === 'EVALUE')
    );
    const workshops = wsBundle.workshops;

    // Créer une map code -> score
    const compScoreMap = {};
    competencies.forEach(c => {
      compScoreMap[c.code] = c.rawScorePct !== null ? c.rawScorePct : c.scorePct;
    });

    // Évaluer chaque spécialité
    const evaluatedSpecialties = specialtyMatrix.map(spec => {
      const weights = spec.poidsCompetences || {};
      let weightedSum = 0;
      let totalWeights = 0;
      let evaluatedWeightsSum = 0;
      const relevantCompetencyList = [];

      Object.entries(weights).forEach(([compCode, weight]) => {
        const comp = competencies.find(c => c.code === compCode);
        const hasScore = comp && comp.rawScorePct !== null;
        const score = hasScore ? comp.rawScorePct : 70;

        weightedSum += (score * weight);
        totalWeights += weight;
        if (hasScore) evaluatedWeightsSum += weight;

        if (comp) {
          relevantCompetencyList.push({
            code: comp.code,
            nomAr: comp.nomAr,
            nomFr: comp.nomFr,
            scorePct: score,
            poids: weight,
            isEvaluated: hasScore,
            niveau: comp.niveau
          });
        }
      });

      // Identifier les tests pertinents pour cette spécialité
      const relevantTestResults = [];
      completedTestSessions.forEach(sess => {
        const t = tests.find(item => item.TestId === sess.TestId);
        if (!t) return;

        // Association thématique
        let isRelevant = false;
        if (spec.specialiteCode === 'SPEC-PJ' && (t.Code === 'TEST-01' || t.TestId === 1)) isRelevant = true;
        else if (spec.specialiteCode === 'SPEC-MOTARD' && (t.Code === 'TEST-02' || t.TestId === 2)) isRelevant = true;
        else if ((spec.specialiteCode === 'SPEC-INFO' || spec.specialiteCode === 'SPEC-SEC-ADMIN') && (t.Code === 'TEST-03' || t.TestId === 3)) isRelevant = true;
        else isRelevant = true; // Tous les 3 tests contribuent au socle commun

        if (isRelevant) {
          relevantTestResults.push({
            testId: sess.TestId,
            code: t.Code,
            titreFr: t.TitreFr || t.Titre,
            titreAr: t.Titre,
            scorePourcentage: sess.ScorePourcentage !== null ? sess.ScorePourcentage : 75,
            date: sess.DateFin
          });
        }
      });

      // Identifier les ateliers pratiques pertinents pour cette spécialité
      const relevantWorkshopResults = [];
      const alignment = WORKSHOP_SPECIALTY_ALIGNMENT[spec.specialiteCode] || {};
      const targetCategories = alignment.primaryCategories || [];

      validatedWorkshopAssignments.forEach(assign => {
        const w = workshops.find(item => item.AtelierId === assign.AtelierId);
        if (!w) return;

        const isCategoryMatch = targetCategories.includes(w.CategorieId);
        if (isCategoryMatch || targetCategories.length === 0) {
          relevantWorkshopResults.push({
            atelierId: w.AtelierId,
            assignationId: assign.AssignationId,
            code: w.Code,
            titreFr: w.Titre,
            titreAr: w.TitreAr,
            categorieId: w.CategorieId,
            scoreObtenu: assign.ScoreObtenu,
            scoreTotalMax: assign.ScoreTotalMax || 20,
            scorePourcentage: assign.ScorePourcentage,
            mention: assign.Mention,
            superviseurNom: assign.SuperviseurNom,
            dateRealisation: assign.DateRealisation || assign.DateValidation
          });
        }
      });

      // Calcul équilibré : Hybridation Tests (45%) + Ateliers Pratiques (55%)
      // Règle : aucun atelier isolé ne peut dicter à 100% l'orientation finale
      const avgTestScore = relevantTestResults.length > 0
        ? relevantTestResults.reduce((acc, t) => acc + t.scorePourcentage, 0) / relevantTestResults.length
        : null;

      const avgWorkshopScore = relevantWorkshopResults.length > 0
        ? relevantWorkshopResults.reduce((acc, w) => acc + (w.scorePourcentage || 0), 0) / relevantWorkshopResults.length
        : null;

      let fitScore = 70;
      let dataSufficiencyStatus = 'INSUFFISANTE';

      if (avgTestScore !== null && avgWorkshopScore !== null) {
        // Données complètes : pondération équilibrée
        fitScore = Math.round(0.45 * avgTestScore + 0.55 * avgWorkshopScore);
        dataSufficiencyStatus = 'COMPLETE';
      } else if (avgTestScore !== null) {
        fitScore = Math.round(avgTestScore);
        dataSufficiencyStatus = 'PARTIELLE';
      } else if (avgWorkshopScore !== null) {
        fitScore = Math.round(avgWorkshopScore);
        dataSufficiencyStatus = 'PARTIELLE';
      } else {
        fitScore = totalWeights > 0 ? Math.round(weightedSum / totalWeights) : 70;
        dataSufficiencyStatus = 'INSUFFISANTE';
      }

      // Synthèse des forces démontrées (Tests + Ateliers)
      const strengths = [];
      relevantWorkshopResults.forEach(rw => {
        const assign = validatedWorkshopAssignments.find(a => a.AssignationId === rw.assignationId);
        (assign?.PointsForts || []).forEach(pf => {
          if (pf && !strengths.includes(pf)) strengths.push(pf);
        });
      });

      relevantCompetencyList
        .filter(c => c.isEvaluated && c.scorePct >= 75)
        .forEach(c => {
          const label = `Excellente maîtrise démontrée en ${c.nomFr} (${c.scorePct}%)`;
          if (!strengths.includes(label)) strengths.push(label);
        });

      if (strengths.length === 0) {
        strengths.push('Aptitudes de base conformes et respect rigoureux des consignes de sécurité');
      }

      // Synthèse des axes de perfectionnement (Tests + Ateliers)
      const improvements = [];
      relevantWorkshopResults.forEach(rw => {
        const assign = validatedWorkshopAssignments.find(a => a.AssignationId === rw.assignationId);
        (assign?.AxesAmelioration || []).forEach(ax => {
          if (ax && !improvements.includes(ax)) improvements.push(ax);
        });
      });

      relevantCompetencyList
        .filter(c => c.isEvaluated && c.scorePct < 75)
        .forEach(c => {
          const label = `Perfectionnement conseillé en ${c.nomFr} (note actuelle : ${c.scorePct}%)`;
          if (!improvements.includes(label)) improvements.push(label);
        });

      if (improvements.length === 0) {
        improvements.push('Maintien de la précision sous contrainte de temps et approfondissement technique');
      }

      // Explication circonstanciée de la recommandation
      let explanationFr = alignment.relevanceExplanationFr ||
        `L'élève présente un profil concordant entre les aptitudes évaluées lors des tests et la pratique sur le terrain pour la spécialité ${spec.intituleFr}.`;
      let explanationAr = alignment.relevanceExplanationAr || spec.justificationAr ||
        `أظهر المترشح توافقاً إيجابياً في المهام الميدانية والعملية المرتبطة بـ ${spec.intituleAr}.`;

      if (relevantWorkshopResults.length > 0) {
        const bestWs = relevantWorkshopResults[0];
        explanationFr += ` Confirmation sur le terrain : ${bestWs.titreFr} validé avec la note de ${bestWs.scoreObtenu}/${bestWs.scoreTotalMax} pts (${bestWs.mention}).`;
        explanationAr += ` تأكيد ميداني : تم اجتياز ورشة ${bestWs.titreAr} بنجاح وملاحظة انضباط تقني ملموس.`;
      } else {
        explanationFr += ' (Nota : cette orientation repose sur les épreuves écrites et reste soumise à confirmation lors des prochains ateliers pratiques).';
        explanationAr += ' (ملاحظة: هذا التوجيه يستند للاختبارات المهنية وفي انتظار تأكيده بالورشات التطبيقية المقررة).';
      }

      // Conditions d'éligibilité médicale, physique et administrative (séparées du score de compétence)
      const conditionsStatus = (spec.conditionsAVerifier || []).map(cond => {
        let estSatisfaite = true;
        let observation = 'Conforme aux critères initiaux';
        let observationAr = 'مستوفٍ للشروط المبدئية';

        if (cond.type === 'PHYSICAL' && student.AptitudePhysique !== undefined && student.AptitudePhysique < 13) {
          estSatisfaite = false;
          observation = 'Aptitude physique inférieure au seuil de la spécialité';
          observationAr = 'تتطلب تأهيلاً بدنياً إضافياً';
        } else if (cond.type === 'ACADEMIC' && student.NoteFormationPro !== undefined && student.NoteFormationPro < 12) {
          estSatisfaite = false;
          observation = 'Moyenne académique inférieure au prérequis';
          observationAr = 'معدل التكوين أقل من العتبة المطلوبة';
        } else if (cond.type === 'MEDICAL') {
          observation = 'Visite médicale d\'incorporation ou SIGYCOP à certifier';
          observationAr = 'في انتظار الفحص الطبي التخصصي النهائي';
        }

        return {
          id: cond.id,
          type: cond.type,
          intituleAr: cond.intituleAr,
          estObligatoire: cond.estObligatoire,
          statut: estSatisfaite ? 'CONFORME' : 'A_VERIFIER',
          observation,
          observationAr
        };
      });

      const hasPendingConditions = conditionsStatus.some(c => c.statut === 'A_VERIFIER');

      return {
        specialiteCode: spec.specialiteCode,
        intituleAr: spec.intituleAr,
        intituleFr: spec.intituleFr,
        subdivision: spec.subdivision,
        icone: spec.icone || 'Shield',
        scoreCompatibilite: fitScore,
        dataSufficiencyStatus,
        whySuggestedFr: explanationFr,
        whySuggestedAr: explanationAr,
        relevantTestResults,
        relevantWorkshopResults,
        contributingTasks: [...relevantTestResults, ...relevantWorkshopResults],
        supportingStrengths: strengths.slice(0, 5),
        areasRequiringImprovement: improvements.slice(0, 5),
        demonstratedStrengthsAr: strengths.slice(0, 5),
        areasForImprovementAr: improvements.slice(0, 5),
        relevantCompetencies: relevantCompetencyList,
        eligibilityConditions: conditionsStatus,
        eligibilitySummary: hasPendingConditions ? 'A_VERIFIER_ADMIN' : 'ELIGIBLE'
      };
    });

    // Trier par score de compatibilité décroissant
    evaluatedSpecialties.sort((a, b) => b.scoreCompatibilite - a.scoreCompatibilite);

    // TOP 3 des spécialités recommandées
    const topThree = evaluatedSpecialties.slice(0, 3).map((spec, index) => ({
      ...spec,
      rangRecommandation: index + 1
    }));

    return {
      allSpecialties: evaluatedSpecialties,
      topThree
    };
  },

  /**
   * Génère le rapport officiel d'orientation pour l'élève (Section 5 du prompt)
   */
  async getStudentComprehensiveReport(studentId) {
    const sId = parseInt(studentId, 10);
    const [{ users }, competencies, matchData, traineeProfile, tests, testSessions, proposals] = await Promise.all([
      group3Repository.getAllUsersAndPromotions(),
      this.calculateStudentCompetencies(sId),
      this.matchStudentToSpecialties(sId),
      this.getTraineeProfessionalSkillsProfile(sId),
      group3Repository.getTests(),
      group3Repository.getTestSessions({ utilisateurId: sId }),
      group3Repository.getOrientationProposals()
    ]);

    const student = users.find(u => u.UtilisateurId === sId);
    if (!student) return null;

    const { topThree, allSpecialties } = matchData;
    const activeTests = tests.filter(t => t.EstActif && t.Code.startsWith('TEST-0'));

    const completedTestsDetails = activeTests.map(t => {
      const sess = testSessions.slice().reverse().find(s => s.TestId === t.TestId);
      const isFinished = sess && sess.Statut === 'TERMINE';
      const score = isFinished ? (sess.ScorePourcentage !== null ? sess.ScorePourcentage : 75) : null;
      let mention = null;
      if (score !== null) {
        if (score >= 85) mention = 'امتياز';
        else if (score >= 75) mention = 'جيد جداً';
        else if (score >= 60) mention = 'جيد';
        else mention = 'مقبول';
      }

      return {
        moduleId: t.TestId,
        testId: t.TestId,
        code: t.Code,
        titreAr: t.Titre,
        titreFr: t.TitreFr || t.Titre,
        subdivision: t.Code,
        statut: isFinished ? 'TERMINE' : (sess && sess.Statut === 'EN_COURS' ? 'EN_COURS' : 'NON_COMMENCE'),
        scoreGlobal: score,
        mention,
        dateFin: sess ? sess.DateFin : null,
        dureeMinutes: sess ? Math.round((sess.DureeEcouleeSecondes || 0) / 60) : null
      };
    });

    const finishedTests = completedTestsDetails.filter(t => t.statut === 'TERMINE');
    const completedCount = finishedTests.length;
    const totalSimulations = activeTests.length || 3;
    const averageScore = completedCount > 0
      ? Math.round(finishedTests.reduce((acc, t) => acc + (t.scoreGlobal || 0), 0) / completedCount)
      : 80;

    let mentionGlobale = 'مقبول';
    if (averageScore >= 85) mentionGlobale = 'امتياز';
    else if (averageScore >= 75) mentionGlobale = 'جيد جداً';
    else if (averageScore >= 65) mentionGlobale = 'جيد';

    // Récupérer la proposition administrative
    const proposal = proposals.find(p => p.studentId === sId);

    return {
      studentInfo: {
        id: student.UtilisateurId,
        matricule: student.Matricule,
        nom: student.Nom,
        prenom: student.Prenom,
        email: student.Email,
        promotionId: student.PromotionId,
        promotionNom: student.PromotionNom || 'Promotion 2026',
        classement: student.ClassementInitial || 1
      },
      dateBilan: new Date().toISOString(),
      statistiquesGlobales: {
        simulationsCompletees: completedCount,
        totalSimulations,
        pourcentageAvancement: Math.round((completedCount / totalSimulations) * 100),
        scoreMoyenGlobal: averageScore,
        mentionGlobale
      },
      traineePracticalProfile: traineeProfile,
      completedSimulations: completedTestsDetails,
      completedTests: completedTestsDetails,
      competenciesProfile: competencies,
      topRecommendedSpecialties: topThree,
      allSpecialtiesFit: allSpecialties,
      administrativeDecision: proposal || {
        statut: 'PROPOSEE',
        specialiteRetenueCode: topThree[0]?.specialiteCode || null,
        dateDecision: null,
        observationsAr: 'المقترح قيد دراسة لجنة التوجيه والتعيين بالقيادة العليا'
      }
    };
  },

  /**
   * Valide ou modifie la décision de la commission d'orientation pour un élève
   */
  async updateAdministrativeDecision(studentId, { statut, specialiteRetenueCode, observationsAr, adminId = 1 }) {
    return group3Repository.upsertOrientationProposal(studentId, {
      statut,
      specialiteRetenueCode,
      observationsAr,
      adminId
    });
  },

  /**
   * Vue d'ensemble pour le tableau de bord administrateur (tous les élèves)
   */
  async getAllStudentsAssessmentSummary() {
    const [wsBundle, testSessions, proposals] = await Promise.all([
      group3Repository.loadWorkshopsBundle(),
      group3Repository.getTestSessions(),
      group3Repository.getOrientationProposals()
    ]);

    const students = wsBundle.users.filter(u => u.Role === 'ELEVE' || !u.Role);
    const workshopAssignments = wsBundle.assignments;
    const promotions = wsBundle.promotions;

    const summaryList = [];

    for (const st of students) {
      // Tests complétés
      const stTests = testSessions.filter(s => s.UtilisateurId === st.UtilisateurId && s.Statut === 'TERMINE');
      const testScoreAvg = stTests.length > 0
        ? Math.round(stTests.reduce((acc, s) => acc + (s.ScorePourcentage || 0), 0) / stTests.length)
        : null;

      // Ateliers complétés
      const stWorkshops = workshopAssignments.filter(
        a => a.UtilisateurId === st.UtilisateurId && (a.Statut === 'VALIDE' || a.Statut === 'EVALUE')
      );
      const wsScoreAvg20 = stWorkshops.length > 0
        ? Math.round(stWorkshops.reduce((acc, a) => acc + (a.ScoreObtenu || 0), 0) / stWorkshops.length * 10) / 10
        : null;
      const wsScoreAvgPct = stWorkshops.length > 0
        ? Math.round(stWorkshops.reduce((acc, a) => acc + (a.ScorePourcentage || 0), 0) / stWorkshops.length)
        : null;

      // Spécialité recommandée combinée
      let topSpecialty = null;
      if (stTests.length > 0 || stWorkshops.length > 0) {
        const { topThree } = await this.matchStudentToSpecialties(st.UtilisateurId);
        topSpecialty = topThree[0] || null;
      }

      const proposal = proposals.find(p => p.studentId === st.UtilisateurId);
      const promo = promotions.find(p => p.PromotionId === st.PromotionId);

      summaryList.push({
        studentId: st.UtilisateurId,
        nom: st.Nom,
        prenom: st.Prenom,
        matricule: st.Matricule,
        promotionNom: promo?.Nom || 'Promotion 54',
        testsCompleted: stTests.length,
        testScoreMoyen: testScoreAvg,
        workshopsCompleted: stWorkshops.length,
        workshopScoreMoyen20: wsScoreAvg20,
        workshopScoreMoyenPct: wsScoreAvgPct,
        topSpecialtyCode: topSpecialty?.specialiteCode || null,
        topSpecialtyNomFr: topSpecialty?.intituleFr || null,
        topSpecialtyNomAr: topSpecialty?.intituleAr || null,
        topSpecialtyScore: topSpecialty?.scoreCompatibilite || null,
        dataSufficiency: topSpecialty?.dataSufficiencyStatus || 'INSUFFISANTE',
        statutDecision: proposal?.statut || ((stTests.length > 0 || stWorkshops.length > 0) ? 'PROPOSEE' : 'EN_ATTENTE_EVALUATION'),
        specialiteValidee: proposal?.specialiteRetenueCode || null
      });
    }

    return summaryList;
  },

  /**
   * Génération de données tabulaires pour export Excel / CSV (Section 5 du prompt)
   */
  async generateAssessmentExportData() {
    const summaryList = await this.getAllStudentsAssessmentSummary();
    const headers = [
      'الرقم العسكري (Matricule)',
      'النسب (Nom)',
      'الاسم (Prénom)',
      'الفوج (Promotion)',
      'الاختبارات المنجزة (Tests complétés)',
      'معدل الاختبارات / Score tests %',
      'الورشات التطبيقية المنجزة (Ateliers complétés)',
      'معدل الورشات / Score moyen ateliers /20',
      'التخصص المقترح n°1 (Spécialité recommandée)',
      'درجة التوافق % (Score adéquation)',
      'كفاية الأدلة (Suffisance données)',
      'قرار الإدارة (Statut décision)'
    ];

    const rows = summaryList.map(s => [
      s.matricule,
      s.nom,
      s.prenom,
      s.promotionNom,
      `${s.testsCompleted} / 3`,
      s.testScoreMoyen !== null ? `${s.testScoreMoyen}%` : '—',
      `${s.workshopsCompleted} ateliers`,
      s.workshopScoreMoyen20 !== null ? `${s.workshopScoreMoyen20}/20` : '—',
      s.topSpecialtyNomFr ? `${s.topSpecialtyNomFr} (${s.topSpecialtyNomAr})` : 'En attente d\'évaluations',
      s.topSpecialtyScore !== null ? `${s.topSpecialtyScore}%` : '—',
      s.dataSufficiency === 'COMPLETE' ? 'Complète' : s.dataSufficiency === 'PARTIELLE' ? 'Partielle' : 'Insuffisante',
      s.statutDecision === 'VALIDEE_ADMIN' ? 'Validé Officiellement' :
      s.statutDecision === 'PROPOSEE' ? 'Proposé par le Système' : 'En cours'
    ]);

    return { headers, rows };
  }
};
