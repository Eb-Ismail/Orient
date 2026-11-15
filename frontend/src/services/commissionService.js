// ==============================================================================
// ORIENT-GR — Service Client Commissions Spécialisées & Recrutement Multi-Commissions
// ==============================================================================

import api from './api.js';

export const commissionService = {
  /**
   * Récupère les commissions autorisées pour le compte connecté
   */
  async getMyCommissions() {
    try {
      const res = await api.get('/commissions');
      return res.data.commissions || [];
    } catch (err) {
      console.error('[commissionService] Erreur getMyCommissions:', err);
      return [];
    }
  },

  /**
   * Récupère la liste des candidats affectés à une commission
   */
  async getCommissionCandidates(commissionId) {
    try {
      const res = await api.get(`/commissions/${commissionId}/candidates`);
      return {
        commission: res.data.commission || null,
        candidates: res.data.candidates || []
      };
    } catch (err) {
      console.error(`[commissionService] Erreur getCommissionCandidates (${commissionId}):`, err);
      throw err;
    }
  },

  /**
   * Récupère le dossier complet d'un candidat dans une commission
   */
  async getCandidateCommissionDetails(commissionId, candidateId) {
    try {
      const res = await api.get(`/commissions/${commissionId}/candidates/${candidateId}`);
      return res.data;
    } catch (err) {
      console.error(`[commissionService] Erreur getCandidateCommissionDetails:`, err);
      throw err;
    }
  },

  /**
   * Met à jour le statut d'un candidat au sein de la commission (ex: CONVOQUE, EN_COURS)
   */
  async updateCandidateStatus(commissionId, candidateId, { assignmentId, statut, dateConvocation, justificationAdmin }) {
    try {
      const res = await api.patch(`/commissions/${commissionId}/candidates/${candidateId}/status`, {
        assignmentId,
        statut,
        dateConvocation,
        justificationAdmin
      });
      return res.data;
    } catch (err) {
      console.error('[commissionService] Erreur updateCandidateStatus:', err);
      throw err;
    }
  },

  /**
   * Enregistre ou soumet une évaluation physique réelle avec déclenchement de l'analyse IA
   */
  async saveEvaluation(commissionId, candidateId, evaluationData) {
    try {
      const res = await api.post(`/commissions/${commissionId}/candidates/${candidateId}/evaluations`, evaluationData);
      return res.data;
    } catch (err) {
      console.error('[commissionService] Erreur saveEvaluation:', err);
      throw err;
    }
  },

  /**
   * Demande une correction officielle motivée et tracée pour une évaluation verrouillée
   */
  async requestEvaluationCorrection(evaluationId, { motif, nouvellesNotes = {} }) {
    try {
      const res = await api.post(`/commissions/evaluations/${evaluationId}/correction`, {
        motif,
        nouvellesNotes
      });
      return res.data;
    } catch (err) {
      console.error('[commissionService] Erreur requestEvaluationCorrection:', err);
      throw err;
    }
  },

  /**
   * Récupère la liste des dossiers POSITIFS transmis à la session ADMIN
   */
  async getPositiveDossiers({ commissionId = null, statutDecision = null, search = null } = {}) {
    try {
      const params = {};
      if (commissionId) params.commissionId = commissionId;
      if (statutDecision) params.statutDecision = statutDecision;
      if (search) params.search = search;

      const res = await api.get('/admin/commissions/positive-dossiers', { params });
      return {
        kpis: res.data.kpis || {},
        dossiers: res.data.dossiers || [],
        commissions: res.data.commissions || []
      };
    } catch (err) {
      console.error('[commissionService] Erreur getPositiveDossiers:', err);
      throw err;
    }
  },

  /**
   * Enregistre une décision administrative officielle sur un dossier positif (ACCEPTE ou REFUSE)
   */
  async savePositiveDossierDecision(assignmentId, { decision, justification, specialiteRetenueCode = null }) {
    try {
      const res = await api.post(`/admin/commissions/positive-dossiers/${assignmentId}/decision`, {
        decision,
        justification,
        specialiteRetenueCode
      });
      return res.data;
    } catch (err) {
      console.error(`[commissionService] Erreur savePositiveDossierDecision (${assignmentId}):`, err);
      throw err;
    }
  },

  /**
   * Récupère la synthèse globale du recrutement pour l'ADMIN
   */
  async getAdminRecruitmentSummary() {
    try {
      const res = await api.get('/admin/commissions/summary');
      return {
        kpis: res.data.kpis || {},
        candidats: res.data.candidats || [],
        commissions: res.data.commissions || []
      };
    } catch (err) {
      console.error('[commissionService] Erreur getAdminRecruitmentSummary:', err);
      throw err;
    }
  },

  /**
   * Lance la ventilation IA pour un candidat ou pour tous
   */
  async triggerVentilation(candidateId = null) {
    try {
      const res = await api.post('/admin/commissions/ventilate', candidateId ? { candidateId } : {});
      return res.data;
    } catch (err) {
      console.error('[commissionService] Erreur triggerVentilation:', err);
      throw err;
    }
  },

  /**
   * Déclenche le comparateur IA pour un candidat
   */
  async triggerComparison(candidateId) {
    try {
      const res = await api.post('/admin/commissions/compare', { candidateId });
      return res.data.comparison || null;
    } catch (err) {
      console.error(`[commissionService] Erreur triggerComparison (${candidateId}):`, err);
      throw err;
    }
  },

  /**
   * Enregistre la décision administrative officielle finale (ADMIN)
   */
  async saveOfficialDecision(decisionData) {
    try {
      const res = await api.post('/admin/commissions/decision', decisionData);
      return res.data;
    } catch (err) {
      console.error('[commissionService] Erreur saveOfficialDecision:', err);
      throw err;
    }
  },

  /**
   * Affecte manuellement un candidat à une commission
   */
  async assignCandidate(candidateId, commissionId, justificationAdmin = '') {
    try {
      const res = await api.post('/admin/commissions/assign', { candidateId, commissionId, justificationAdmin });
      return res.data;
    } catch (err) {
      console.error('[commissionService] Erreur assignCandidate:', err);
      throw err;
    }
  },

  /**
   * Gère les membres d'une commission (Ajouter / Retirer)
   */
  async manageMember(action, commissionId, userId, role = 'EVALUATEUR') {
    try {
      const res = await api.post('/admin/commissions/members', { action, commissionId, userId, role });
      return res.data;
    } catch (err) {
      console.error('[commissionService] Erreur manageMember:', err);
      throw err;
    }
  }
};
