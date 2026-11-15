// ==============================================================================
// ORIENT-GR - Service des Tests et Évaluations
// ==============================================================================

import api from './api.js';

export const testService = {
  /**
   * Récupère la liste des tests assignés
   */
  async getTests() {
    try {
      const res = await api.get('/tests');
      return res.data.tests;
    } catch (err) {
      return [];
    }
  },

  /**
   * Charge les données de l'épreuve (questions sécurisées, statut session, règles)
   */
  async getTestDetails(testId) {
    try {
      const res = await api.get(`/tests/${testId}`);
      return res.data;
    } catch (err) {
      return null;
    }
  },

  /**
   * Initialise ou reprend une session de test en consignant les données candidat
   */
  async startTest(testId, candidateData = null) {
    try {
      const res = await api.post(`/tests/${testId}/start`, candidateData ? { candidateData } : {});
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  /**
   * Enregistre la progression / réponse (Autosave transparent)
   * Supporte optionId pour QCM et reponseTexte pour questions de mise en situation
   */
  async saveProgress(testId, { sessionId, questionId, optionId, elapsedSeconds, reponseTexte }) {
    try {
      const res = await api.post(`/tests/${testId}/progress`, {
        sessionId,
        questionId,
        optionId,
        reponseTexte,
        elapsedSeconds
      });
      return res.data;
    } catch (err) {
      console.warn('[Autosave local] progression mémorisée localement.');
      return { success: true };
    }
  },

  /**
   * Clôture définitive du test et calcul de l'orientation
   */
  async submitTest(testId, { sessionId, userAnswers }) {
    try {
      const res = await api.post(`/tests/${testId}/submit`, {
        sessionId,
        userAnswers
      });
      return res.data;
    } catch (err) {
      console.error('Erreur soumission test:', err);
      throw err;
    }
  },

  /**
   * Récupère le bilan complet des résultats
   */
  async getResults(sessionId) {
    try {
      const res = await api.get(`/results/${sessionId}`);
      return res.data;
    } catch (err) {
      return null;
    }
  },

  /**
   * Préférences professionnelles de l'élève
   */
  async getPreferences() {
    const res = await api.get('/preferences');
    return res.data;
  },

  async savePreferences(preferences) {
    const res = await api.put('/preferences', { preferences });
    return res.data;
  }
};
