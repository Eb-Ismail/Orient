// ==============================================================================
// ORIENT-GR — Service Métier des Ateliers Pratiques & Compétences Métier
// خدمة تدبير الورشات التطبيقية والكفاءات العملية الميدانية للدرك الملكي
// ==============================================================================

import { group3Repository } from '../repositories/group3Repository.js';
import { coreRepository } from '../repositories/coreRepository.js';
import { STANDARD_WORKSHOP_CRITERIA } from '../lib/workshopsData.js';

export const workshopService = {
  /**
   * Retourne la matrice standard officielle des 4 critères (4 x 5 points = 20 pts)
   */
  getStandardCriteria() {
    return STANDARD_WORKSHOP_CRITERIA;
  },

  /**
   * Récupère la liste des 4 catégories professionnelles pratiques avec compteurs
   */
  async getCategories() {
    const { categories, workshops, assignments } = await group3Repository.loadWorkshopsBundle();

    return categories.map(cat => {
      const catWorkshops = workshops.filter(w => w.CategorieId === cat.id);
      const activeWorkshops = catWorkshops.filter(w => w.Statut === 'ACTIF');
      const catWorkshopIds = new Set(catWorkshops.map(w => w.AtelierId));
      const catAssignments = assignments.filter(a => catWorkshopIds.has(a.AtelierId));
      const evaluatedAssignments = catAssignments.filter(
        a => a.Statut === 'VALIDE' || a.Statut === 'EVALUE' || a.Statut === 'EN_ATTENTE_VALIDATION'
      );

      const avgScore = evaluatedAssignments.length > 0
        ? Math.round(
            evaluatedAssignments.reduce((acc, a) => acc + (a.ScorePourcentage || 0), 0) /
            evaluatedAssignments.length
          )
        : null;

      return {
        ...cat,
        totalAteliers: catWorkshops.length,
        ateliersActifs: activeWorkshops.length,
        totalAssignations: catAssignments.length,
        totalEvalues: evaluatedAssignments.length,
        scoreMoyenPourcentage: avgScore
      };
    });
  },

  /**
   * Récupère la liste des ateliers pratiques avec filtres
   */
  async getWorkshops(filters = {}) {
    const {
      categorieId,
      difficulte,
      statut,
      search,
      includeArchived = false
    } = filters;

    const bundle = await group3Repository.loadWorkshopsBundle();
    let list = [...bundle.workshops];

    // Filtre statut
    if (statut && statut !== 'TOUS') {
      list = list.filter(w => w.Statut === statut);
    } else if (!includeArchived && (!statut || statut === 'ACTIF')) {
      list = list.filter(w => w.Statut === 'ACTIF');
    }

    // Filtre catégorie
    if (categorieId && categorieId !== 'ALL') {
      list = list.filter(w => w.CategorieId === categorieId);
    }

    // Filtre difficulté
    if (difficulte && difficulte !== 'ALL') {
      list = list.filter(w => w.NiveauDifficulte === difficulte);
    }

    // Recherche textuelle
    if (search && search.trim()) {
      const term = search.trim().toLowerCase();
      list = list.filter(w =>
        (w.Titre && w.Titre.toLowerCase().includes(term)) ||
        (w.TitreAr && w.TitreAr.includes(term)) ||
        (w.Code && w.Code.toLowerCase().includes(term)) ||
        (w.SousDomaine && w.SousDomaine.toLowerCase().includes(term)) ||
        (w.DescriptionFr && w.DescriptionFr.toLowerCase().includes(term))
      );
    }

    // Enrichir avec métriques d'assignation
    const assignments = bundle.assignments;
    return list.map(w => {
      const wAssignments = assignments.filter(a => a.AtelierId === w.AtelierId);
      const evaluated = wAssignments.filter(
        a => a.Statut === 'VALIDE' || a.Statut === 'EVALUE' || a.Statut === 'EN_ATTENTE_VALIDATION'
      );
      const avgScore = evaluated.length > 0
        ? Math.round(
            evaluated.reduce((acc, a) => acc + (a.ScoreObtenu || 0), 0) / evaluated.length * 10
          ) / 10
        : null;

      return {
        ...w,
        totalAssignes: wAssignments.length,
        totalEvalues: evaluated.length,
        scoreMoyen: avgScore
      };
    });
  },

  /**
   * Récupère les détails d'un atelier pratique par son identifiant
   */
  async getWorkshopById(workshopId) {
    const id = parseInt(workshopId, 10);
    const { workshops, categories, assignments: allAssignments, users, promotions } = await group3Repository.loadWorkshopsBundle();
    const workshop = workshops.find(w => w.AtelierId === id);
    if (!workshop) return null;

    const category = categories.find(c => c.id === workshop.CategorieId) || null;
    const assignments = allAssignments.filter(a => a.AtelierId === id);

    const enrichedAssignments = assignments.map(a => {
      const student = users.find(u => u.UtilisateurId === a.UtilisateurId) || {};
      const promo = promotions.find(p => p.PromotionId === (a.PromotionId || student.PromotionId)) || {};
      return {
        ...a,
        Eleve: {
          id: student.UtilisateurId,
          nom: student.Nom,
          prenom: student.Prenom,
          matricule: student.Matricule,
          promotion: promo.Nom || 'Promotion 54',
          email: student.Email
        }
      };
    });

    const evaluated = assignments.filter(
      a => a.Statut === 'VALIDE' || a.Statut === 'EVALUE' || a.Statut === 'EN_ATTENTE_VALIDATION'
    );
    const avgScore = evaluated.length > 0
      ? Math.round(
          evaluated.reduce((acc, a) => acc + (a.ScoreObtenu || 0), 0) / evaluated.length * 10
        ) / 10
      : null;

    return {
      ...workshop,
      Category: category,
      Assignations: enrichedAssignments,
      Statistiques: {
        totalAssignes: assignments.length,
        totalEvalues: evaluated.length,
        valides: assignments.filter(a => a.Statut === 'VALIDE' || a.Statut === 'EVALUE').length,
        enAttenteValidation: assignments.filter(a => a.Statut === 'EN_ATTENTE_VALIDATION').length,
        enCours: assignments.filter(a => a.Statut === 'EN_COURS').length,
        nonCommence: assignments.filter(a => a.Statut === 'NON_COMMENCE' || a.Statut === 'ASSIGNE').length,
        rejetes: assignments.filter(a => a.Statut === 'REJETE').length,
        scoreMoyen: avgScore
      }
    };
  },

  /**
   * Crée un nouvel atelier pratique
   */
  async createWorkshop(data, adminId) {
    if (!data.Titre || !data.CategorieId) {
      throw new Error('Le titre et la catégorie sont obligatoires.');
    }

    const { workshops } = await group3Repository.loadWorkshopsBundle();
    const maxId = workshops.reduce((max, w) => Math.max(max, w.AtelierId || 0), 0);
    const newId = maxId + 1;

    // Calculer le code si non fourni
    const catShort = data.CategorieId.replace('CAT-', '');
    const code = data.Code || `ATEL-${catShort}-${String(newId).padStart(2, '0')}`;

    // Calculer le score total max d'après les critères (ou matrice standard 20 pts par défaut)
    const criteres = Array.isArray(data.CriteresEvaluation) && data.CriteresEvaluation.length > 0
      ? data.CriteresEvaluation
      : STANDARD_WORKSHOP_CRITERIA;

    const scoreTotalMax = criteres.reduce((sum, c) => sum + (c.pointsMax || 0), 0) || 20;

    const newWorkshop = {
      AtelierId: newId,
      Code: code,
      Titre: data.Titre,
      TitreAr: data.TitreAr || data.Titre,
      CategorieId: data.CategorieId,
      SousDomaine: data.SousDomaine || 'Général',
      NiveauDifficulte: data.NiveauDifficulte || 'INTERMEDIAIRE',
      DureeMinutes: parseInt(data.DureeMinutes, 10) || 60,
      LieuAtelier: data.LieuAtelier || 'Atelier Régimentaire',
      CapaciteMax: parseInt(data.CapaciteMax, 10) || 6,
      SuperviseurParDefaut: data.SuperviseurParDefaut || 'Instructeur Spécialisé',
      Statut: 'ACTIF',
      DescriptionFr: data.DescriptionFr || '',
      DescriptionAr: data.DescriptionAr || '',
      Objectifs: Array.isArray(data.Objectifs) ? data.Objectifs : [],
      EquipementsRequis: Array.isArray(data.EquipementsRequis) ? data.EquipementsRequis : [],
      ConsignesSecurite: Array.isArray(data.ConsignesSecurite) ? data.ConsignesSecurite : [],
      TachesPratiques: Array.isArray(data.TachesPratiques) ? data.TachesPratiques : [],
      CriteresEvaluation: criteres,
      ScoreTotalMax: scoreTotalMax,
      CreePar: adminId,
      DateCreation: new Date().toISOString()
    };

    const inserted = await group3Repository.insertWorkshop(newWorkshop);
    await coreRepository.appendLog({
      utilisateurId: adminId || 1,
      action: 'ATELIER_CREE',
      cible: `Atelier ${inserted.Code}`,
      details: `Création de l'atelier pratique "${inserted.Titre}".`
    });
    return inserted;
  },

  /**
   * Met à jour un atelier pratique existant
   */
  async updateWorkshop(workshopId, data, adminId) {
    const id = parseInt(workshopId, 10);
    const { workshops } = await group3Repository.loadWorkshopsBundle();
    const index = workshops.findIndex(w => w.AtelierId === id);
    if (index === -1) {
      throw new Error(`Atelier avec l'identifiant ${workshopId} introuvable.`);
    }

    const current = workshops[index];
    const criteres = Array.isArray(data.CriteresEvaluation) ? data.CriteresEvaluation : current.CriteresEvaluation;
    const scoreTotalMax = criteres.length > 0
      ? criteres.reduce((sum, c) => sum + (c.pointsMax || 0), 0)
      : (data.ScoreTotalMax || current.ScoreTotalMax || 20);

    const updated = {
      ...current,
      Titre: data.Titre ?? current.Titre,
      TitreAr: data.TitreAr ?? current.TitreAr,
      CategorieId: data.CategorieId ?? current.CategorieId,
      SousDomaine: data.SousDomaine ?? current.SousDomaine,
      NiveauDifficulte: data.NiveauDifficulte ?? current.NiveauDifficulte,
      DureeMinutes: data.DureeMinutes !== undefined ? parseInt(data.DureeMinutes, 10) : current.DureeMinutes,
      LieuAtelier: data.LieuAtelier ?? current.LieuAtelier,
      CapaciteMax: data.CapaciteMax !== undefined ? parseInt(data.CapaciteMax, 10) : current.CapaciteMax,
      SuperviseurParDefaut: data.SuperviseurParDefaut ?? current.SuperviseurParDefaut,
      DescriptionFr: data.DescriptionFr ?? current.DescriptionFr,
      DescriptionAr: data.DescriptionAr ?? current.DescriptionAr,
      Objectifs: Array.isArray(data.Objectifs) ? data.Objectifs : current.Objectifs,
      EquipementsRequis: Array.isArray(data.EquipementsRequis) ? data.EquipementsRequis : current.EquipementsRequis,
      ConsignesSecurite: Array.isArray(data.ConsignesSecurite) ? data.ConsignesSecurite : current.ConsignesSecurite,
      TachesPratiques: Array.isArray(data.TachesPratiques) ? data.TachesPratiques : current.TachesPratiques,
      CriteresEvaluation: criteres,
      ScoreTotalMax: scoreTotalMax,
      ModifiePar: adminId,
      DateModification: new Date().toISOString()
    };

    workshops[index] = updated;
    await group3Repository.updateWorkshop(updated);
    return updated;
  },

  /**
   * Archive ou réactive un atelier pratique
   */
  async archiveWorkshop(workshopId, isArchived = true, adminId) {
    const id = parseInt(workshopId, 10);
    const { workshops } = await group3Repository.loadWorkshopsBundle();
    const workshop = workshops.find(w => w.AtelierId === id);
    if (!workshop) {
      throw new Error(`Atelier introuvable (${workshopId}).`);
    }

    workshop.Statut = isArchived ? 'ARCHIVE' : 'ACTIF';
    workshop.DateArchivage = isArchived ? new Date().toISOString() : null;
    workshop.ArchivePar = isArchived ? adminId : null;
    await group3Repository.updateWorkshop(workshop);
    return workshop;
  },

  /**
   * Assigne un atelier à des élèves ou à une promotion complète (Étape 2 du workflow)
   */
  async assignWorkshop(workshopId, payload = {}) {
    const id = parseInt(workshopId, 10);
    const { workshops, users, assignments } = await group3Repository.loadWorkshopsBundle();
    const workshop = workshops.find(w => w.AtelierId === id);
    if (!workshop) {
      throw new Error(`Atelier ${workshopId} introuvable.`);
    }

    const {
      traineeIds = [],
      promotionId,
      datePrevue,
      superviseurId,
      superviseurNom
    } = payload;

    let targetTraineeIds = [];

    if (Array.isArray(traineeIds) && traineeIds.length > 0) {
      targetTraineeIds = traineeIds.map(t => parseInt(t, 10));
    } else if (promotionId) {
      const pId = parseInt(promotionId, 10);
      targetTraineeIds = users
        .filter(u => u.Role === 'ELEVE' && u.PromotionId === pId)
        .map(u => u.UtilisateurId);
    }

    if (targetTraineeIds.length === 0) {
      throw new Error('Aucun élève sélectionné pour l\'assignation.');
    }

    let maxAssignId = assignments.reduce((max, a) => Math.max(max, a.AssignationId || 0), 0);
    const createdAssignments = [];

    for (const tId of targetTraineeIds) {
      const existing = assignments.find(
        a => a.AtelierId === id && a.UtilisateurId === tId && a.Statut !== 'ARCHIVE'
      );

      if (!existing) {
        maxAssignId += 1;
        const student = users.find(u => u.UtilisateurId === tId) || {};
        const newAssignment = {
          AssignationId: maxAssignId,
          AtelierId: id,
          UtilisateurId: tId,
          PromotionId: student.PromotionId || (promotionId ? parseInt(promotionId, 10) : 1),
          SuperviseurId: superviseurId || 6,
          SuperviseurNom: superviseurNom || workshop.SuperviseurParDefaut,
          DateAssignation: new Date().toISOString(),
          DatePrevue: datePrevue || new Date(Date.now() + 7 * 86400000).toISOString(),
          DateRealisation: null,
          DateValidation: null,
          ValidePar: null,
          Statut: 'NON_COMMENCE',
          EstVerrouille: false,
          ArretSecurite: false,
          MotifArretSecurite: null,
          NotesCriteres: {},
          ScoreObtenu: null,
          ScoreTotalMax: workshop.ScoreTotalMax || 20,
          ScorePourcentage: null,
          Mention: null,
          PointsForts: [],
          AxesAmelioration: [],
          CompetencesDetectees: [],
          ObservationsEvaluateur: null,
          RecommandationSpecialite: null,
          PreuvesAttachees: [],
          HistoriqueRevisions: [
            {
              revisionId: `REV-${Date.now()}-${maxAssignId}`,
              action: 'CREATION',
              auteurId: superviseurId || 1,
              auteurNom: superviseurNom || 'Commandement',
              dateAction: new Date().toISOString(),
              scoreSnapshot: null,
              statutSnapshot: 'NON_COMMENCE',
              commentaire: `Assignation de l'élève à l'atelier ${workshop.Code} (${workshop.Titre}).`
            }
          ]
        };
        const persisted = await group3Repository.insertAssignment(newAssignment);
        createdAssignments.push(persisted);
      }
    }

    return {
      success: true,
      assignesCount: createdAssignments.length,
      assignments: createdAssignments
    };
  },

  /**
   * Récupère la liste des assignations avec filtres et relations
   */
  async getAssignments(filters = {}) {
    const {
      workshopId,
      traineeId,
      promotionId,
      statut,
      superviseurId
    } = filters;

    const bundle = await group3Repository.loadWorkshopsBundle();
    let assignments = [...bundle.assignments];

    if (superviseurId) {
      const sId = parseInt(superviseurId, 10);
      assignments = assignments.filter(a => a.SuperviseurId === sId);
    }

    if (workshopId) {
      const wId = parseInt(workshopId, 10);
      assignments = assignments.filter(a => a.AtelierId === wId);
    }

    if (traineeId) {
      const tId = parseInt(traineeId, 10);
      assignments = assignments.filter(a => a.UtilisateurId === tId);
    }

    if (promotionId) {
      const pId = parseInt(promotionId, 10);
      assignments = assignments.filter(a => a.PromotionId === pId);
    }

    if (statut && statut !== 'TOUS') {
      if (statut === 'VALIDE') {
        assignments = assignments.filter(a => a.Statut === 'VALIDE' || a.Statut === 'EVALUE');
      } else if (statut === 'NON_COMMENCE') {
        assignments = assignments.filter(a => a.Statut === 'NON_COMMENCE' || a.Statut === 'ASSIGNE');
      } else {
        assignments = assignments.filter(a => a.Statut === statut);
      }
    }

    const { workshops, users, promotions } = bundle;

    return assignments.map(a => {
      const workshop = workshops.find(w => w.AtelierId === a.AtelierId) || {};
      const student = users.find(u => u.UtilisateurId === a.UtilisateurId) || {};
      const promo = promotions.find(p => p.PromotionId === (a.PromotionId || student.PromotionId)) || {};

      return {
        ...a,
        Atelier: {
          id: workshop.AtelierId,
          code: workshop.Code,
          titre: workshop.Titre,
          titreAr: workshop.TitreAr,
          categorieId: workshop.CategorieId,
          dureeMinutes: workshop.DureeMinutes,
          lieu: workshop.LieuAtelier,
          criteres: workshop.CriteresEvaluation || STANDARD_WORKSHOP_CRITERIA
        },
        Eleve: {
          id: student.UtilisateurId,
          nom: student.Nom,
          prenom: student.Prenom,
          matricule: student.Matricule,
          promotion: promo.Nom || 'Promotion 54',
          email: student.Email
        }
      };
    });
  },

  /**
   * Récupère une assignation par son identifiant avec l'ensemble des détails d'audit
   */
  async getAssignmentById(assignmentId) {
    const aId = parseInt(assignmentId, 10);
    const { assignments, workshops, users, promotions } = await group3Repository.loadWorkshopsBundle();
    const assignment = assignments.find(a => a.AssignationId === aId);
    if (!assignment) return null;

    const workshop = workshops.find(w => w.AtelierId === assignment.AtelierId) || {};
    const user = users.find(u => u.UtilisateurId === assignment.UtilisateurId) || {};
    const promo = promotions.find(p => p.PromotionId === assignment.PromotionId) || {};

    // Initialiser la checklist des tâches si absente
    if (!Array.isArray(assignment.TachesChecklist) || assignment.TachesChecklist.length === 0) {
      const tasks = workshop.TachesPratiques || [];
      assignment.TachesChecklist = tasks.map((t, idx) => {
        const isDone = assignment.Statut === 'VALIDE' || assignment.Statut === 'EN_ATTENTE_VALIDATION';
        return {
          taskId: t.taskId,
          ordre: t.ordre || idx + 1,
          titre: t.description ? (t.description.slice(0, 70) + (t.description.length > 70 ? '...' : '')) : `Tâche ${idx + 1}`,
          instructions: t.description || '',
          resultatAttendu: t.resultatAttendu || '',
          baremePoints: t.baremePoints || 5,
          termine: isDone,
          dateCompletion: isDone ? (assignment.DateRealisation || new Date().toISOString()) : null,
          observationEleve: '',
          preuves: []
        };
      });
    }

    if (assignment.AvancementPourcentage === undefined || assignment.AvancementPourcentage === null) {
      const doneCount = assignment.TachesChecklist.filter(t => t.termine).length;
      assignment.AvancementPourcentage = assignment.TachesChecklist.length > 0
        ? Math.round((doneCount / assignment.TachesChecklist.length) * 100)
        : (assignment.Statut === 'VALIDE' ? 100 : 0);
    }

    return {
      ...assignment,
      Atelier: {
        ...workshop,
        MissionPratique: workshop.MissionPratique || null,
        CriteresEvaluation: workshop.CriteresEvaluation?.length > 0 ? workshop.CriteresEvaluation : STANDARD_WORKSHOP_CRITERIA
      },
      Eleve: {
        id: user.UtilisateurId,
        nom: user.Nom,
        prenom: user.Prenom,
        matricule: user.Matricule,
        promotion: promo.Nom || 'Promotion 54',
        email: user.Email
      }
    };
  },

  /**
   * Met à jour la progression pratique et la checklist des tâches (Élève / Instructeur)
   * Supporte :
   * - action: 'START' (Démarrer l'atelier)
   * - action: 'PROGRESS' (Sauvegarder l'état des tâches et observations)
   * - action: 'SUBMIT' (Soumettre à l'instructeur pour évaluation)
   */
  async updateAssignmentProgress(assignmentId, payload = {}, user = {}) {
    const aId = parseInt(assignmentId, 10);
    const { assignments } = await group3Repository.loadWorkshopsBundle();
    const assignment = assignments.find(a => a.AssignationId === aId);
    if (!assignment) {
      throw new Error(`Assignation d'atelier ${assignmentId} introuvable.`);
    }

    const userId = user.id ?? user.UtilisateurId;
    const userRole = user.role ?? user.Role;

    if (userRole === 'ELEVE' && assignment.UtilisateurId !== userId) {
      throw new Error("Accès refusé : Vous ne pouvez modifier que vos propres ateliers.");
    }

    if (assignment.EstVerrouille) {
      throw new Error("Cette fiche d'atelier est validée et verrouillée.");
    }

    const {
      action = 'PROGRESS',
      tachesChecklist,
      observationsEleve,
      superviseurObservations
    } = payload;

    if (Array.isArray(tachesChecklist)) {
      assignment.TachesChecklist = tachesChecklist;
      const doneCount = assignment.TachesChecklist.filter(t => t.termine).length;
      assignment.AvancementPourcentage = assignment.TachesChecklist.length > 0
        ? Math.round((doneCount / assignment.TachesChecklist.length) * 100)
        : 0;
    }

    if (observationsEleve !== undefined) {
      assignment.ObservationsEleve = observationsEleve;
    }

    if (superviseurObservations !== undefined && (userRole === 'ADMIN' || userRole === 'COMMISSION')) {
      assignment.ObservationsEvaluateur = superviseurObservations;
    }

    if (!Array.isArray(assignment.HistoriqueRevisions)) {
      assignment.HistoriqueRevisions = [];
    }

    const auteurNom = `${user.prenom || ''} ${user.nom || ''}`.trim() || (userRole === 'ELEVE' ? 'Élève Gendarme' : 'Évaluateur');

    if (action === 'START') {
      assignment.Statut = 'EN_COURS';
      assignment.DateDebut = assignment.DateDebut || new Date().toISOString();
      assignment.HistoriqueRevisions.push({
        revisionId: `REV-${Date.now()}-${aId}`,
        action: 'DEMARRAGE',
        auteurId: userId,
        auteurNom,
        dateAction: new Date().toISOString(),
        scoreSnapshot: null,
        statutSnapshot: 'EN_COURS',
        commentaire: 'Démarrage officiel de la séance pratique.'
      });
    } else if (action === 'SUBMIT') {
      assignment.Statut = 'EN_ATTENTE_VALIDATION';
      assignment.DateSoumission = new Date().toISOString();
      assignment.DateRealisation = assignment.DateRealisation || new Date().toISOString();
      assignment.AvancementPourcentage = 100;
      assignment.HistoriqueRevisions.push({
        revisionId: `REV-${Date.now()}-${aId}`,
        action: 'SOUMISSION_ELEVE',
        auteurId: userId,
        auteurNom,
        dateAction: new Date().toISOString(),
        scoreSnapshot: null,
        statutSnapshot: 'EN_ATTENTE_VALIDATION',
        commentaire: 'Travaux pratiques soumis pour évaluation et visa par l\'instructeur.'
      });
    } else {
      assignment.HistoriqueRevisions.push({
        revisionId: `REV-${Date.now()}-${aId}`,
        action: 'PROGRESSION',
        auteurId: userId,
        auteurNom,
        dateAction: new Date().toISOString(),
        scoreSnapshot: null,
        statutSnapshot: assignment.Statut,
        commentaire: `Progression enregistrée (${assignment.AvancementPourcentage || 0}% complété).`
      });
    }

    await group3Repository.updateAssignment(assignment);
    return {
      success: true,
      assignment: await this.getAssignmentById(aId)
    };
  },

  /**
   * Enregistre l'évaluation pratique d'un élève (Étapes 4, 5, 6 du workflow)
   * Supporte :
   * - Sauvegarde brouillon (EN_COURS)
   * - Soumission pour validation (EN_ATTENTE_VALIDATION)
   * - Validation définitive verrouillée (VALIDE)
   * - Rejet / À réévaluer (REJETE)
   * - Arrêt d'urgence pour manquement à la sécurité (sécurité = 0, arrêt immédiat)
   * - Protection anti-fraude (verrouillage post-validation sauf révision autorisée)
   */
  async evaluateTrainee(assignmentId, payload = {}) {
    const aId = parseInt(assignmentId, 10);
    const { assignments, workshops } = await group3Repository.loadWorkshopsBundle();
    const assignment = assignments.find(a => a.AssignationId === aId);
    if (!assignment) {
      throw new Error(`Assignation d'atelier ${assignmentId} introuvable.`);
    }

    // Protection anti-fraude : empêcher la modification directe si l'évaluation est validée et verrouillée
    if (assignment.EstVerrouille && !payload.isRevision) {
      throw new Error("Cette évaluation est validée et verrouillée. Veuillez initier une procédure de révision autorisée pour la modifier.");
    }

    const workshop = workshops.find(w => w.AtelierId === assignment.AtelierId);
    if (!workshop) {
      throw new Error(`Atelier associé introuvable.`);
    }

    const {
      notesCriteres = {},
      observations = '',
      pointsForts = [],
      axesAmelioration = [],
      competencesDetectees = [],
      recommandationSpecialite = null,
      superviseurId,
      superviseurNom,
      arretSecurite = false,
      motifArretSecurite = null,
      saveDraft = false,
      submitForValidation = false,
      reject = false,
      statut
    } = payload;

        // Prise en compte de la demande de réévaluation par l'instructeur
    if (payload.action === 'REQUEST_REASSESSMENT' || payload.reassessmentRequested || payload.statut === 'A_REEVALUER') {
      assignment.Statut = 'A_REEVALUER';
      assignment.EstVerrouille = false;
      assignment.MotifReevaluation = payload.motif || observations || 'Séance pratique à réévaluer selon les préconisations de l\'instructeur.';
      if (observations) assignment.ObservationsEvaluateur = observations;
      if (Array.isArray(pointsForts) && pointsForts.length > 0) assignment.PointsForts = pointsForts;
      if (Array.isArray(axesAmelioration) && axesAmelioration.length > 0) assignment.AxesAmelioration = axesAmelioration;
      if (superviseurNom) assignment.SuperviseurNom = superviseurNom;

      if (!Array.isArray(assignment.HistoriqueRevisions)) assignment.HistoriqueRevisions = [];
      assignment.HistoriqueRevisions.push({
        revisionId: `REV-${Date.now()}-${aId}`,
        action: 'DEMANDE_REEVALUATION',
        auteurId: superviseurId || 1,
        auteurNom: superviseurNom || 'Évaluateur Commission',
        dateAction: new Date().toISOString(),
        scoreSnapshot: assignment.ScoreObtenu,
        statutSnapshot: 'A_REEVALUER',
        commentaire: assignment.MotifReevaluation
      });

      await group3Repository.updateAssignment(assignment);
      return {
        success: true,
        assignment: await this.getAssignmentById(aId)
      };
    }

    // Déterminer la grille de critères applicable (personnalisée ou standard 4 x 5 = 20)
    const hasStandardKeys = ['CRIT-SEC-METH', 'CRIT-DIAG-PREC', 'CRIT-EXEC-QUAL', 'CRIT-TPS-DISC'].some(k => k in notesCriteres);
    const hasWorkshopKeys = Array.isArray(workshop.CriteresEvaluation) && workshop.CriteresEvaluation.some(c => c.critereId in notesCriteres);

    let criteresList = Array.isArray(workshop.CriteresEvaluation) && workshop.CriteresEvaluation.length > 0
      ? workshop.CriteresEvaluation
      : STANDARD_WORKSHOP_CRITERIA;

    if (hasStandardKeys && !hasWorkshopKeys) {
      criteresList = STANDARD_WORKSHOP_CRITERIA;
    }

    // Calcul de la somme des points obtenus
    let scoreObtenu = 0;
    const formattedNotes = {};

    criteresList.forEach(crit => {
      const critInput = notesCriteres[crit.critereId];
      let noteVal = typeof critInput === 'object' && critInput !== null
        ? Number(critInput.note ?? 0)
        : Number(critInput ?? 0);

      // Règle impérative de sécurité : si arrêt pour sécurité, la note de sécurité est immédiatement mise à 0
      if (arretSecurite && (crit.critereId === 'CRIT-SEC-METH' || crit.code === 'SECURITE_METHODOLOGIE')) {
        noteVal = 0;
      }

      const safeNote = Math.max(0, Math.min(crit.pointsMax || 5, noteVal));
      scoreObtenu += safeNote;

      formattedNotes[crit.critereId] = {
        note: safeNote,
        noteMax: crit.pointsMax,
        commentaire: typeof critInput === 'object' ? critInput.commentaire || '' : ''
      };
    });

    const scoreTotalMax = workshop.ScoreTotalMax || 20;
    const scorePourcentage = scoreTotalMax > 0
      ? Math.round((scoreObtenu / scoreTotalMax) * 100)
      : 0;

    // Déterminer le statut final
    let targetStatut = 'VALIDE';
    if (saveDraft) {
      targetStatut = 'EN_COURS';
    } else if (submitForValidation) {
      targetStatut = 'EN_ATTENTE_VALIDATION';
    } else if (reject || arretSecurite) {
      targetStatut = 'REJETE';
    } else if (statut) {
      targetStatut = statut;
    }

    // Déterminer la mention
    let mention = 'A_PERFECTIONNER';
    if (targetStatut === 'REJETE' || arretSecurite) {
      mention = 'REJETE';
    } else if (scorePourcentage >= 90) {
      mention = 'EXCELLENT';
    } else if (scorePourcentage >= 80) {
      mention = 'TRES_BIEN';
    } else if (scorePourcentage >= 70) {
      mention = 'BIEN';
    } else if (scorePourcentage >= 50) {
      mention = 'SATISFAISANT';
    }

    // Nettoyer les listes de points forts et axes d'amélioration
    const formattedPointsForts = Array.isArray(pointsForts)
      ? pointsForts.filter(p => typeof p === 'string' && p.trim())
      : (typeof pointsForts === 'string' && pointsForts.trim() ? [pointsForts.trim()] : []);

    const formattedAxesAmelioration = Array.isArray(axesAmelioration)
      ? axesAmelioration.filter(a => typeof a === 'string' && a.trim())
      : (typeof axesAmelioration === 'string' && axesAmelioration.trim() ? [axesAmelioration.trim()] : []);

    // Verrouillage : l'évaluation est verrouillée dès validation définitive ou rejet final
    const estVerrouille = targetStatut === 'VALIDE' || targetStatut === 'REJETE';

    // Mettre à jour l'assignation
    assignment.Statut = targetStatut;
    assignment.EstVerrouille = estVerrouille;
    assignment.ArretSecurite = Boolean(arretSecurite);
    assignment.MotifArretSecurite = arretSecurite ? (motifArretSecurite || 'Comportement dangereux constaté') : null;
    assignment.NotesCriteres = formattedNotes;
    assignment.ScoreObtenu = targetStatut === 'EN_COURS' && Object.keys(notesCriteres).length === 0 ? null : scoreObtenu;
    assignment.ScoreTotalMax = scoreTotalMax;
    assignment.ScorePourcentage = targetStatut === 'EN_COURS' && Object.keys(notesCriteres).length === 0 ? null : scorePourcentage;
    assignment.Mention = targetStatut === 'EN_COURS' && Object.keys(notesCriteres).length === 0 ? null : mention;
    assignment.ObservationsEvaluateur = observations;
    assignment.PointsForts = formattedPointsForts;
    assignment.AxesAmelioration = formattedAxesAmelioration;
    assignment.CompetencesDetectees = Array.isArray(competencesDetectees) ? competencesDetectees : [];
    assignment.RecommandationSpecialite = recommandationSpecialite;

    if (superviseurId) assignment.SuperviseurId = superviseurId;
    if (superviseurNom) assignment.SuperviseurNom = superviseurNom;

    if (targetStatut === 'VALIDE' || targetStatut === 'REJETE' || targetStatut === 'EN_ATTENTE_VALIDATION') {
      assignment.DateRealisation = assignment.DateRealisation || new Date().toISOString();
    }
    if (targetStatut === 'VALIDE') {
      assignment.DateValidation = new Date().toISOString();
      assignment.ValidePar = superviseurNom || 'Commandement';
    }

    // Traçabilité et historique d'audit
    const actionLabel = targetStatut === 'VALIDE'
      ? (payload.isRevision ? 'REVISION_VALIDEE' : 'VALIDATION')
      : targetStatut === 'EN_ATTENTE_VALIDATION'
      ? 'SOUMISSION'
      : targetStatut === 'REJETE'
      ? 'REJET'
      : 'BROUILLON';

    const revisionEntry = {
      revisionId: `REV-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      action: actionLabel,
      auteurId: superviseurId || 1,
      auteurNom: superviseurNom || 'Évaluateur',
      dateAction: new Date().toISOString(),
      scoreSnapshot: scoreObtenu,
      statutSnapshot: targetStatut,
      commentaire: arretSecurite
        ? `[ARRÊT SÉCURITÉ] ${motifArretSecurite || 'Manquement critique à la sécurité'}`
        : observations || `Mise à jour statut ${targetStatut}`
    };

    if (!Array.isArray(assignment.HistoriqueRevisions)) {
      assignment.HistoriqueRevisions = [];
    }
    assignment.HistoriqueRevisions.push(revisionEntry);
    await group3Repository.updateAssignment(assignment);

    return {
      success: true,
      assignment
    };
  },

  /**
   * Processus officiel de révision autorisée (Sécurité & Gouvernance)
   * Permet à un administrateur d'ouvrir une révision sur une évaluation verrouillée avec motif obligatoire.
   */
  async requestEvaluationRevision(assignmentId, payload = {}) {
    const aId = parseInt(assignmentId, 10);
    const { assignments } = await group3Repository.loadWorkshopsBundle();
    const assignment = assignments.find(a => a.AssignationId === aId);
    if (!assignment) {
      throw new Error(`Assignation d'atelier ${assignmentId} introuvable.`);
    }

    const { motif, adminId, adminNom } = payload;
    if (!motif || !motif.trim()) {
      throw new Error('Un motif officiel circonstancié est obligatoire pour déverrouiller une révision.');
    }

    // Déverrouiller
    assignment.EstVerrouille = false;
    assignment.Statut = 'EN_COURS';
    assignment.DateDerniereRevision = new Date().toISOString();
    assignment.MotifRevision = motif.trim();

    const auditEntry = {
      revisionId: `REV-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      action: 'REVISION_OUVERTE',
      auteurId: adminId || 1,
      auteurNom: adminNom || 'Commandement',
      dateAction: new Date().toISOString(),
      scoreSnapshot: assignment.ScoreObtenu,
      statutSnapshot: 'EN_COURS',
      commentaire: `Ouverture de révision autorisée : ${motif.trim()}`
    };

    if (!Array.isArray(assignment.HistoriqueRevisions)) {
      assignment.HistoriqueRevisions = [];
    }
    assignment.HistoriqueRevisions.push(auditEntry);
    await group3Repository.updateAssignment(assignment);

    return {
      success: true,
      assignment
    };
  },

  /**
   * Ajoute une pièce justificative ou preuve pratique à l'évaluation (photos, PV, relevés)
   */
  async addEvidence(assignmentId, evidenceData = {}, user = {}) {
    const aId = parseInt(assignmentId, 10);
    const { assignments } = await group3Repository.loadWorkshopsBundle();
    const assignment = assignments.find(a => a.AssignationId === aId);
    if (!assignment) {
      throw new Error(`Assignation d'atelier ${assignmentId} introuvable.`);
    }

    if (!evidenceData.nomFichier) {
      throw new Error('Le nom du fichier de preuve est obligatoire.');
    }

    if (!Array.isArray(assignment.PreuvesAttachees)) {
      assignment.PreuvesAttachees = [];
    }

    const newEvidence = {
      id: `PRV-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      nomFichier: evidenceData.nomFichier,
      type: evidenceData.type || 'application/pdf',
      taille: evidenceData.taille || '250 Ko',
      dateUpload: new Date().toISOString(),
      url: evidenceData.url || '#',
      description: evidenceData.description || 'Preuve d\'intervention pratique',
      autorisePar: `${user.prenom || ''} ${user.nom || ''}`.trim() || 'Instructeur'
    };

    assignment.PreuvesAttachees.push(newEvidence);

    // Entrée d'audit
    if (!Array.isArray(assignment.HistoriqueRevisions)) {
      assignment.HistoriqueRevisions = [];
    }
    assignment.HistoriqueRevisions.push({
      revisionId: `REV-${Date.now()}`,
      action: 'AJOUT_PREUVE',
      auteurId: user.id || 1,
      auteurNom: `${user.prenom || ''} ${user.nom || ''}`.trim() || 'Instructeur',
      dateAction: new Date().toISOString(),
      scoreSnapshot: assignment.ScoreObtenu,
      statutSnapshot: assignment.Statut,
      commentaire: `Ajout de la pièce justificative : ${newEvidence.nomFichier}`
    });

    await group3Repository.updateAssignment(assignment);
    return {
      success: true,
      evidence: newEvidence,
      assignment
    };
  },

  /**
   * Supprime une pièce justificative de l'évaluation
   */
  async deleteEvidence(assignmentId, evidenceId, user = {}) {
    const aId = parseInt(assignmentId, 10);
    const { assignments } = await group3Repository.loadWorkshopsBundle();
    const assignment = assignments.find(a => a.AssignationId === aId);
    if (!assignment) {
      throw new Error(`Assignation d'atelier ${assignmentId} introuvable.`);
    }

    if (assignment.EstVerrouille) {
      throw new Error("Impossible de supprimer une pièce sur une évaluation verrouillée.");
    }

    const initialLength = (assignment.PreuvesAttachees || []).length;
    assignment.PreuvesAttachees = (assignment.PreuvesAttachees || []).filter(e => e.id !== evidenceId);

    if (assignment.PreuvesAttachees.length === initialLength) {
      throw new Error(`Pièce justificative ${evidenceId} introuvable.`);
    }

    if (!Array.isArray(assignment.HistoriqueRevisions)) {
      assignment.HistoriqueRevisions = [];
    }
    assignment.HistoriqueRevisions.push({
      revisionId: `REV-${Date.now()}`,
      action: 'SUPPRESSION_PREUVE',
      auteurId: user.id || 1,
      auteurNom: `${user.prenom || ''} ${user.nom || ''}`.trim() || 'Instructeur',
      dateAction: new Date().toISOString(),
      scoreSnapshot: assignment.ScoreObtenu,
      statutSnapshot: assignment.Statut,
      commentaire: `Suppression de la pièce justificative ID ${evidenceId}`
    });

    await group3Repository.updateAssignment(assignment);
    return {
      success: true,
      assignment
    };
  },

  /**
   * Récupère les ateliers pratiques et évaluations de l'élève connecté (Étape 7 du workflow)
   * Sécurité : ne divulgue aucune information opérationnelle confidentielle sensible.
   */
  async getTraineeWorkshops(traineeId) {
    const tId = parseInt(traineeId, 10);
    const bundle = await group3Repository.loadWorkshopsBundle();
    const assignments = bundle.assignments.filter(a => a.UtilisateurId === tId);
    const workshops = bundle.workshops;
    const categories = bundle.categories;

    const enriched = assignments.map(a => {
      const w = workshops.find(item => item.AtelierId === a.AtelierId) || {};
      const cat = categories.find(c => c.id === w.CategorieId) || {};

      return {
        AssignationId: a.AssignationId,
        AtelierId: a.AtelierId,
        DateAssignation: a.DateAssignation,
        DatePrevue: a.DatePrevue,
        DateRealisation: a.DateRealisation,
        Statut: a.Statut,
        ScoreObtenu: a.ScoreObtenu,
        ScoreTotalMax: a.ScoreTotalMax,
        ScorePourcentage: a.ScorePourcentage,
        Mention: a.Mention,
        PointsForts: a.PointsForts || [],
        AxesAmelioration: a.AxesAmelioration || [],
        CompetencesDetectees: a.CompetencesDetectees || [],
        ObservationsEvaluateur: a.ObservationsEvaluateur,
        RecommandationSpecialite: a.RecommandationSpecialite,
        SuperviseurNom: a.SuperviseurNom,
        NotesCriteres: a.NotesCriteres,
        ArretSecurite: Boolean(a.ArretSecurite),
        MotifArretSecurite: a.MotifArretSecurite || null,
        DateValidation: a.DateValidation || null,
        ValidePar: a.ValidePar || null,
        EstVerrouille: Boolean(a.EstVerrouille),
        AvancementPourcentage: a.AvancementPourcentage !== undefined ? a.AvancementPourcentage : (a.Statut === 'VALIDE' ? 100 : 0),
        TachesChecklist: a.TachesChecklist || [],
        ObservationsEleve: a.ObservationsEleve || '',
        DateDebut: a.DateDebut || null,
        DateSoumission: a.DateSoumission || null,
        MotifReevaluation: a.MotifReevaluation || null,
        PreuvesAttachees: (a.PreuvesAttachees || []).map(p => ({
          id: p.id,
          nomFichier: p.nomFichier,
          type: p.type,
          taille: p.taille,
          dateUpload: p.dateUpload
        })),
        Atelier: {
          AtelierId: w.AtelierId,
          Code: w.Code,
          Titre: w.Titre,
          TitreAr: w.TitreAr,
          DescriptionFr: w.DescriptionFr,
          DescriptionAr: w.DescriptionAr,
          NiveauDifficulte: w.NiveauDifficulte || 'INTERMEDIAIRE',
          MissionPratique: w.MissionPratique || null,
          CategorieId: w.CategorieId,
          DureeMinutes: w.DureeMinutes,
          LieuAtelier: w.LieuAtelier,
          Objectifs: w.Objectifs || [],
          EquipementsRequis: w.EquipementsRequis || [],
          ConsignesSecurite: w.ConsignesSecurite || [],
          CriteresEvaluation: w.CriteresEvaluation?.length > 0 ? w.CriteresEvaluation : STANDARD_WORKSHOP_CRITERIA,
          Categorie: cat
        }
      };
    });

    const evaluated = enriched.filter(
      a => a.Statut === 'VALIDE' || a.Statut === 'EVALUE' || a.Statut === 'EN_ATTENTE_VALIDATION'
    );
    const withScore = enriched.filter(
      a => a.ScorePourcentage !== null && a.ScorePourcentage !== undefined && (a.Statut === 'VALIDE' || a.Statut === 'EVALUE')
    );
    const avgScore = withScore.length > 0
      ? Math.round(
          withScore.reduce((acc, a) => acc + (a.ScorePourcentage || 0), 0) / withScore.length
        )
      : null;

    // Compétences uniques détectées chez l'élève
    const allSkills = new Set();
    evaluated.forEach(a => {
      if (Array.isArray(a.CompetencesDetectees)) {
        a.CompetencesDetectees.forEach(s => allSkills.add(s));
      }
    });

    return {
      totalAssignes: enriched.length,
      totalEvalues: evaluated.length,
      valides: enriched.filter(a => a.Statut === 'VALIDE' || a.Statut === 'EVALUE').length,
      enAttenteValidation: enriched.filter(a => a.Statut === 'EN_ATTENTE_VALIDATION').length,
      enCours: enriched.filter(a => a.Statut === 'EN_COURS').length,
      nonCommence: enriched.filter(a => a.Statut === 'NON_COMMENCE' || a.Statut === 'ASSIGNE').length,
      disponibles: enriched.filter(a => a.Statut === 'NON_COMMENCE' || a.Statut === 'ASSIGNE').length,
      rejetes: enriched.filter(a => a.Statut === 'REJETE').length,
      aReevaluer: enriched.filter(a => a.Statut === 'A_REEVALUER' || a.Statut === 'REJETE' || a.ArretSecurite).length,
      scoreMoyenPourcentage: avgScore,
      scoreMoyen20: avgScore !== null ? +(avgScore * 0.2).toFixed(1) : null,
      competencesDetectees: Array.from(allSkills),
      ateliers: enriched
    };
  },

  /**
   * Statistiques globales du module des ateliers pratiques pour le tableau de bord
   */
  async getStats(promotionId = null) {
    const bundle = await group3Repository.loadWorkshopsBundle();
    const workshops = bundle.workshops;
    let assignments = bundle.assignments;

    if (promotionId) {
      const pId = parseInt(promotionId, 10);
      assignments = assignments.filter(a => a.PromotionId === pId);
    }

    const totalWorkshops = workshops.length;
    const activeWorkshops = workshops.filter(w => w.Statut === 'ACTIF').length;
    const archivedWorkshops = workshops.filter(w => w.Statut === 'ARCHIVE').length;

    const totalAssignments = assignments.length;
    const evaluatedAssignments = assignments.filter(
      a => a.Statut === 'VALIDE' || a.Statut === 'EVALUE' || a.Statut === 'EN_ATTENTE_VALIDATION'
    );
    const enCoursAssignments = assignments.filter(a => a.Statut === 'EN_COURS');
    const nonCommenceAssignments = assignments.filter(a => a.Statut === 'NON_COMMENCE' || a.Statut === 'ASSIGNE');
    const rejetesAssignments = assignments.filter(a => a.Statut === 'REJETE');

    const completionRate = totalAssignments > 0
      ? Math.round((evaluatedAssignments.length / totalAssignments) * 100)
      : 0;

    const avgScore = evaluatedAssignments.length > 0
      ? Math.round(
          evaluatedAssignments.reduce((sum, a) => sum + (a.ScorePourcentage || 0), 0) /
          evaluatedAssignments.length
        )
      : 0;

    // Répartition par catégorie
    const categories = bundle.categories;
    const categoryBreakdown = categories.map(cat => {
      const catWorkshops = workshops.filter(w => w.CategorieId === cat.id);
      const catWorkshopIds = new Set(catWorkshops.map(w => w.AtelierId));
      const catAssignments = assignments.filter(a => catWorkshopIds.has(a.AtelierId));
      const catEval = catAssignments.filter(
        a => a.Statut === 'VALIDE' || a.Statut === 'EVALUE' || a.Statut === 'EN_ATTENTE_VALIDATION'
      );

      const catAvg = catEval.length > 0
        ? Math.round(catEval.reduce((s, a) => s + (a.ScorePourcentage || 0), 0) / catEval.length)
        : null;

      return {
        id: cat.id,
        code: cat.code,
        intituleFr: cat.intituleFr,
        intituleAr: cat.intituleAr,
        icone: cat.icone,
        couleur: cat.couleur,
        totalAteliers: catWorkshops.length,
        totalAssignes: catAssignments.length,
        totalEvalues: catEval.length,
        scoreMoyenPourcentage: catAvg
      };
    });

    // Fréquence des compétences pratiques détectées
    const skillsFreq = {};
    evaluatedAssignments.forEach(a => {
      if (Array.isArray(a.CompetencesDetectees)) {
        a.CompetencesDetectees.forEach(s => {
          skillsFreq[s] = (skillsFreq[s] || 0) + 1;
        });
      }
    });

    const topSkills = Object.entries(skillsFreq)
      .map(([skill, count]) => ({ competence: skill, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      totalWorkshops,
      activeWorkshops,
      archivedWorkshops,
      totalAssignments,
      evaluatedAssignments: evaluatedAssignments.length,
      enCoursAssignments: enCoursAssignments.length,
      enAttenteAssignments: nonCommenceAssignments.length,
      rejetesAssignments: rejetesAssignments.length,
      completionRate,
      averageScore: avgScore,
      totalAssigned: totalAssignments,
      availableToStart: nonCommenceAssignments.length,
      inProgress: enCoursAssignments.length,
      pendingEvaluation: assignments.filter(a => a.Statut === 'EN_ATTENTE_VALIDATION').length,
      validated: assignments.filter(a => a.Statut === 'VALIDE' || a.Statut === 'EVALUE').length,
      needsReassessment: assignments.filter(a => a.Statut === 'A_REEVALUER' || a.Statut === 'REJETE' || a.ArretSecurite).length,
      averageScore20: avgScore > 0 ? +(avgScore * 0.2).toFixed(1) : 0,
      averageScorePercentage: avgScore,
      competenciesCount: topSkills.length,
      categoryBreakdown,
      topDetectedSkills: topSkills
    };
  }
};
