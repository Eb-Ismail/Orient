// ==============================================================================
// ORIENT-GR — Service Client Ateliers Pratiques & Compétences Métier
// خدمة الزبون للورشات التطبيقية والكفاءات الميدانية للدرك الملكي
// ==============================================================================

import api from './api.js';

export const workshopService = {
  /**
   * Récupère les 4 catégories professionnelles pratiques
   */
  async getCategories() {
    try {
      const res = await api.get('/workshops/categories');
      return res.data.categories || [];
    } catch (err) {
      console.error('Erreur chargement catégories ateliers:', err);
      return [];
    }
  },

  /**
   * Récupère la liste des ateliers pratiques avec filtres
   */
  async getWorkshops(params = {}) {
    try {
      const res = await api.get('/workshops', { params });
      return res.data.workshops || [];
    } catch (err) {
      console.error('Erreur chargement ateliers pratiques:', err);
      return [];
    }
  },

  /**
   * Récupère les métriques statistiques globales des ateliers
   */
  async getStats(promotionId = null) {
    try {
      const params = promotionId ? { promotionId } : {};
      const res = await api.get('/workshops/stats', { params });
      return res.data.stats || null;
    } catch (err) {
      console.error('Erreur chargement statistiques ateliers:', err);
      return null;
    }
  },

  /**
   * Récupère les détails complets d'un atelier pratique par son identifiant
   */
  async getWorkshopById(workshopId) {
    try {
      const res = await api.get(`/workshops/${workshopId}`);
      return res.data.workshop || null;
    } catch (err) {
      console.error(`Erreur chargement atelier ${workshopId}:`, err);
      throw err;
    }
  },

  /**
   * Crée un nouvel atelier pratique (Admin)
   */
  async createWorkshop(data) {
    try {
      const res = await api.post('/workshops', data);
      return res.data.workshop;
    } catch (err) {
      console.error('Erreur création atelier:', err);
      throw err;
    }
  },

  /**
   * Modifie un atelier pratique (Admin)
   */
  async updateWorkshop(workshopId, data) {
    try {
      const res = await api.put(`/workshops/${workshopId}`, data);
      return res.data.workshop;
    } catch (err) {
      console.error(`Erreur modification atelier ${workshopId}:`, err);
      throw err;
    }
  },

  /**
   * Archive ou réactive un atelier pratique (Admin)
   */
  async archiveWorkshop(workshopId, isArchived = true) {
    try {
      const res = await api.patch(`/workshops/${workshopId}/archive`, { isArchived });
      return res.data.workshop;
    } catch (err) {
      console.error(`Erreur archivage atelier ${workshopId}:`, err);
      throw err;
    }
  },

  /**
   * Assigne un atelier à des élèves ou à une promotion (Admin)
   */
  async assignWorkshop(workshopId, payload) {
    try {
      const res = await api.post(`/workshops/${workshopId}/assign`, payload);
      return res.data;
    } catch (err) {
      console.error(`Erreur assignation atelier ${workshopId}:`, err);
      throw err;
    }
  },

  /**
   * Récupère la liste des assignations avec filtres (Admin)
   */
  async getAssignments(params = {}) {
    try {
      const res = await api.get('/workshops/assignments', { params });
      return res.data.assignments || [];
    } catch (err) {
      console.error('Erreur chargement assignations:', err);
      return [];
    }
  },

  /**
   * Récupère une assignation spécifique
   */
  async getAssignmentById(assignmentId) {
    try {
      const res = await api.get(`/workshops/assignments/${assignmentId}`);
      return res.data.assignment || null;
    } catch (err) {
      console.error(`Erreur chargement assignation ${assignmentId}:`, err);
      throw err;
    }
  },

  /**
   * Met à jour la progression d'un atelier pratique (Élève / Évaluateur)
   * Supporte : action 'START', 'PROGRESS', 'SUBMIT', mise à jour checklist, observations
   */
  async updateProgress(assignmentId, progressData) {
    try {
      const res = await api.patch(`/workshops/assignments/${assignmentId}`, progressData);
      return res.data;
    } catch (err) {
      console.error(`Erreur mise à jour progression ${assignmentId}:`, err);
      throw err;
    }
  },

  /**
   * Évalue un élève sur un atelier pratique (Admin / Commission)
   * Supporte : notes sur 20 (4 x 5 pts), brouillon, soumission, validation définitive, arrêt sécurité.
   */
  async evaluateTrainee(assignmentId, evaluationData) {
    try {
      const res = await api.post(`/workshops/assignments/${assignmentId}/evaluate`, evaluationData);
      return res.data;
    } catch (err) {
      console.error(`Erreur enregistrement évaluation élève ${assignmentId}:`, err);
      throw err;
    }
  },

  /**
   * Demande de réévaluation d'un atelier pratique par la commission
   */
  async requestReassessment(assignmentId, payload) {
    try {
      const res = await api.post(`/workshops/assignments/${assignmentId}/evaluate`, {
        action: 'REQUEST_REASSESSMENT',
        reassessmentRequested: true,
        statut: 'A_REEVALUER',
        ...payload
      });
      return res.data;
    } catch (err) {
      console.error(`Erreur demande réévaluation ${assignmentId}:`, err);
      throw err;
    }
  },

  /**
   * Ouvre une révision autorisée avec motif obligatoire sur une évaluation verrouillée (Admin)
   */
  async requestRevision(assignmentId, payload) {
    try {
      const res = await api.post(`/workshops/assignments/${assignmentId}/revision`, payload);
      return res.data;
    } catch (err) {
      console.error(`Erreur demande révision évaluation ${assignmentId}:`, err);
      throw err;
    }
  },

  /**
   * Ajoute une pièce justificative ou preuve pratique à l'évaluation
   */
  async addEvidence(assignmentId, evidenceData) {
    try {
      const res = await api.post(`/workshops/assignments/${assignmentId}/evidence`, evidenceData);
      return res.data;
    } catch (err) {
      console.error(`Erreur ajout preuve ${assignmentId}:`, err);
      throw err;
    }
  },

  /**
   * Supprime une pièce justificative de l'évaluation
   */
  async deleteEvidence(assignmentId, evidenceId) {
    try {
      const res = await api.delete(`/workshops/assignments/${assignmentId}/evidence`, {
        params: { evidenceId }
      });
      return res.data;
    } catch (err) {
      console.error(`Erreur suppression preuve ${evidenceId}:`, err);
      throw err;
    }
  },

  /**
   * Récupère les ateliers pratiques et évaluations de l'élève connecté
   */
  async getTraineeWorkshops(studentId) {
    try {
      const res = await api.get(`/workshops/trainee/${studentId}`);
      return res.data || { totalAssignes: 0, totalEvalues: 0, ateliers: [] };
    } catch (err) {
      console.error(`Erreur chargement ateliers élève ${studentId}:`, err);
      return { totalAssignes: 0, totalEvalues: 0, ateliers: [] };
    }
  },

  /**
   * Récupère le profil complet de compétences professionnelles de l'élève (Section 1)
   */
  async getTraineeSkillsProfile(studentId) {
    try {
      const res = await api.get(`/workshops/trainee/${studentId}/skills-profile`);
      return res.data?.profile || null;
    } catch (err) {
      console.error(`Erreur chargement profil compétences ${studentId}:`, err);
      return null;
    }
  },

  /**
   * Récupère le tableau de bord analytique des résultats pratiques (Section 3)
   */
  async getWorkshopAnalytics(promotionId = null) {
    try {
      const params = promotionId ? { promotionId } : {};
      const res = await api.get('/workshops/analytics', { params });
      return res.data?.analytics || null;
    } catch (err) {
      console.error('Erreur chargement analytics ateliers:', err);
      return null;
    }
  },

  /**
   * Récupère la cartographie officielle des compétences pratiques d'ateliers (Section 2)
   */
  async getCompetencyMapping() {
    try {
      const res = await api.get('/workshops/competency-mapping');
      return res.data?.groups || [];
    } catch (err) {
      console.error('Erreur chargement mapping compétences:', err);
      return [];
    }
  }
};
