// ==============================================================================
// ORIENT-GR - Client HTTP Axios avec Intercepteurs & Fallback Résilient
// Gestion des jetons Bearer, des codes HTTP 401/403 et du mode hors-ligne
// ==============================================================================

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 90000, // 90 secondes pour supporter l'inférence conversationnelle approfondie et la synthèse vocale sur le LAN
});

// Intercepteur de requête : injection automatique du token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('orient_gr_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur de réponse : gestion centralisée des erreurs de session
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Redirection conditionnelle ou nettoyage session
        const currentPath = window.location.pathname;
        if (!currentPath.includes('/login')) {
          localStorage.removeItem('orient_gr_token');
          localStorage.removeItem('orient_gr_user');
          window.location.href = '/login?expired=1';
        }
      } else if (error.response.status === 403) {
        // Habilitation refusée
        console.warn('[ORIENT-GR] Accès refusé (403) pour la ressource demandée.');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
