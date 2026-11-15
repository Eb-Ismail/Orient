// ==============================================================================
// ORIENT-GR - Service Client des Simulations Professionnelles
// مركز المحاكاة المهنية للدرك الملكي
// ==============================================================================

import api from './api.js';

export const simulationService = {
  /**
   * Récupère la liste des 6 modules de simulation avec statuts élève
   */
  async getModules() {
    try {
      const res = await api.get('/simulations');
      return res.data.modules || [];
    } catch (err) {
      console.error('Erreur chargement modules de simulation:', err);
      return [];
    }
  },

  /**
   * Récupère la synthèse globale des simulations de l'élève
   */
  async getSummary() {
    try {
      const res = await api.get('/simulations/summary');
      return res.data.summary || null;
    } catch (err) {
      console.error('Erreur chargement synthèse simulation:', err);
      return null;
    }
  },

  /**
   * Récupère les détails d'un module et ses étapes
   */
  async getModuleDetails(moduleId) {
    try {
      const res = await api.get(`/simulations/${moduleId}`);
      return res.data;
    } catch (err) {
      console.error(`Erreur chargement détails module ${moduleId}:`, err);
      return null;
    }
  },

  /**
   * Démarre ou reprend une session de simulation
   */
  async startOrResumeSession(moduleId) {
    try {
      const res = await api.post(`/simulations/${moduleId}/start`);
      return res.data;
    } catch (err) {
      console.error(`Erreur démarrage simulation ${moduleId}:`, err);
      throw err;
    }
  },

  /**
   * Sauvegarde la progression sur une étape spécifique
   */
  async saveProgress(moduleId, { stageIndex, stageAnswers, elapsedSeconds }) {
    try {
      const res = await api.post(`/simulations/${moduleId}/progress`, {
        stageIndex,
        stageAnswers,
        elapsedSeconds
      });
      return res.data;
    } catch (err) {
      console.error(`Erreur sauvegarde progression ${moduleId}:`, err);
      throw err;
    }
  },

  /**
   * Soumet et finalise l'évaluation de la simulation
   */
  async submitModule(moduleId, { allAnswers, totalDurationSeconds }) {
    try {
      const res = await api.post(`/simulations/${moduleId}/submit`, {
        allAnswers,
        totalDurationSeconds
      });
      return res.data;
    } catch (err) {
      console.error(`Erreur soumission simulation ${moduleId}:`, err);
      throw err;
    }
  },

  /**
   * Récupère le bilan complet et le rapport d'évaluation du module
   */
  async getModuleResults(moduleId) {
    try {
      const res = await api.get(`/simulations/${moduleId}/results`);
      return res.data;
    } catch (err) {
      console.error(`Erreur résultats simulation ${moduleId}:`, err);
      return null;
    }
  },

  /**
   * Récupère le rapport officiel d'orientation basé sur les compétences pratiques
   */
  async getOrientationReport(studentId = null) {
    try {
      const params = studentId ? { studentId } : {};
      const res = await api.get('/simulations/orientation-report', { params });
      return res.data.report || null;
    } catch (err) {
      console.error('Erreur chargement rapport orientation:', err);
      return null;
    }
  }
};
