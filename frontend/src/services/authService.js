// ==============================================================================
// ORIENT-GR - Service d'authentification Frontend
// ==============================================================================

import api from './api.js';

export const authService = {
  /**
   * Connexion spécifique Élève avec Numéro CIN et Matricule militaire
   */
  async loginStudent(cin, matricule) {
    try {
      const response = await api.post('/auth/login', { 
        cin: String(cin || '').trim().toUpperCase(), 
        matricule: String(matricule || '').trim().toUpperCase(),
        mode: 'eleve'
      });
      if (response.data.token) {
        localStorage.setItem('orient_gr_token', response.data.token);
        localStorage.setItem('orient_gr_user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      // Fallback local si backend offline (pour test fluide hors ligne)
      if (!error.response && cin && matricule) {
        console.warn('[ORIENT-GR] Backend injoignable, basculement en mode démo élève local.');
        const mockUser = {
          id: 2,
          matricule: matricule.toUpperCase(),
          email: 'julien.moreau@eleve.gendarmerie.fr',
          nom: 'Moreau',
          prenom: 'Julien',
          role: 'ELEVE',
          promotionId: 1,
          promotionNom: "54ème Promotion - Chef d'Escadron Guy de Marliave",
          classementInitial: 12,
          noteFormationPro: 15.8,
          aptitudePhysique: 16.5,
          statutMedical: 'SIGYCOP_VALIDE'
        };
        localStorage.setItem('orient_gr_token', 'mock_jwt_token_orient_gr_2026');
        localStorage.setItem('orient_gr_user', JSON.stringify(mockUser));
        return { user: mockUser, token: 'mock_jwt_token_orient_gr_2026' };
      }
      throw error;
    }
  },

  /**
   * Connexion avec matricule/email et mot de passe (Officiers / Commissions)
   */
  async login(identifier, password) {
    try {
      const response = await api.post('/auth/login', { identifier, password });
      if (response.data.token) {
        localStorage.setItem('orient_gr_token', response.data.token);
        localStorage.setItem('orient_gr_user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      // Fallback local si backend offline (pour test fluide)
      if (!error.response && identifier) {
        console.warn('[ORIENT-GR] Backend injoignable, basculement en mode démo local.');
        const isAdmin = identifier.toLowerCase().includes('adm') || identifier.toLowerCase().includes('commandement');
        const mockUser = isAdmin
          ? {
              id: 1,
              matricule: 'ADM-001',
              email: 'commandement@orient-gr.gendarmerie.fr',
              nom: 'De Montmirail',
              prenom: 'Laurent',
              role: 'ADMIN',
              promotionId: null,
              promotionNom: 'État-Major'
            }
          : {
              id: 2,
              matricule: 'EG-2025-014',
              email: 'julien.moreau@eleve.gendarmerie.fr',
              nom: 'Moreau',
              prenom: 'Julien',
              role: 'ELEVE',
              promotionId: 1,
              promotionNom: "54ème Promotion - Chef d'Escadron Guy de Marliave",
              classementInitial: 12,
              noteFormationPro: 15.8,
              aptitudePhysique: 16.5,
              statutMedical: 'SIGYCOP_VALIDE'
            };

        localStorage.setItem('orient_gr_token', 'mock_jwt_token_orient_gr_2026');
        localStorage.setItem('orient_gr_user', JSON.stringify(mockUser));
        return { user: mockUser, token: 'mock_jwt_token_orient_gr_2026' };
      }
      throw error;
    }
  },

  /**
   * Récupère le profil de l'utilisateur courant
   */
  async getProfile() {
    try {
      const response = await api.get('/auth/me');
      if (response.data.user) {
        localStorage.setItem('orient_gr_user', JSON.stringify(response.data.user));
      }
      return response.data.user;
    } catch (error) {
      const stored = localStorage.getItem('orient_gr_user');
      if (stored) return JSON.parse(stored);
      throw error;
    }
  },

  /**
   * Déconnexion sécurisée
   */
  logout() {
    localStorage.removeItem('orient_gr_token');
    localStorage.removeItem('orient_gr_user');
    window.location.href = '/login';
  },

  getCurrentUser() {
    const raw = localStorage.getItem('orient_gr_user');
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem('orient_gr_token'));
  }
};
