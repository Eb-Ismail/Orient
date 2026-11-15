// ==============================================================================
// ORIENT-GR - Service Frontend GUIDE
// Espace officiel de découverte des spécialités et des domaines techniques
// ==============================================================================

import api from './api.js';

export const guideService = {
  /**
   * Récupère le catalogue complet GUIDE organisé en 3 catégories visuelles,
   * avec statistiques et calculs d'affinités personnalisées IA pour l'élève.
   */
  async getCatalogue() {
    try {
      const res = await api.get('/guide');
      return res.data;
    } catch (err) {
      console.error('[guideService] Erreur lors de la récupération du catalogue:', err);
      throw err;
    }
  },

  /**
   * Récupère la fiche détaillée d'une spécialité ou d'un domaine technique
   */
  async getDetails(idOrCode) {
    try {
      const res = await api.get(`/guide/${idOrCode}`);
      return res.data;
    } catch (err) {
      console.error(`[guideService] Erreur lors de la récupération du domaine ${idOrCode}:`, err);
      throw err;
    }
  }
};

