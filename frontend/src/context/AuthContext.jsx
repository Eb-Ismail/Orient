// ==============================================================================
// ORIENT-GR - Contexte d'Authentification & Rôles Utilisateurs (RBAC)
// Gestion de session, profils militaires et déconnexion
// ==============================================================================

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialisation au chargement
  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = authService.getCurrentUser();
      const token = localStorage.getItem('orient_gr_token');

      if (token && storedUser) {
        setUser(storedUser);
        try {
          const freshUser = await authService.getProfile();
          setUser(freshUser);
        } catch (err) {
          console.warn('[ORIENT-GR] Synchronisation profil ignorée, utilisation profil local.');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (identifier, password) => {
    setLoading(true);
    try {
      const data = await authService.login(identifier, password);
      setUser(data.user);
      return data.user;
    } finally {
      setLoading(false);
    }
  }, []);

  const loginStudent = useCallback(async (cin, matricule) => {
    setLoading(true);
    try {
      const data = await authService.loginStudent(cin, matricule);
      setUser(data.user);
      return data.user;
    } finally {
      setLoading(false);
    }
  }, []);

  const quickLogin = useCallback(async (targetRole = 'ADMIN') => {
    if (targetRole === 'ADMIN') {
      return login('commandement@orient-gr.gendarmerie.fr', 'Gendarme2026!');
    } else if (targetRole === 'COMMISSION') {
      return login('commission.tech@orient-gr.gendarmerie.fr', 'Gendarme2026!');
    } else {
      return loginStudent('AB123456', 'EG-2025-099');
    }
  }, [login, loginStudent]);

  const logout = useCallback(() => {
    setUser(null);
    authService.logout();
  }, []);

  const value = {
    user,
    role: user ? user.role : null,
    isAdmin: user ? user.role === 'ADMIN' : false,
    isCommission: user ? user.role === 'COMMISSION' : false,
    isStudent: user ? user.role === 'ELEVE' : false,
    canEvaluate: user ? (user.role === 'ADMIN' || user.role === 'COMMISSION') : false,
    isAuthenticated: Boolean(user),
    loading,
    login,
    loginStudent,
    quickLogin,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé au sein d\'un AuthProvider');
  }
  return context;
}
