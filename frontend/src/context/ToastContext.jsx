// ==============================================================================
// ORIENT-GR - Contexte de Notifications & Alertes Toast
// Système de notification robuste avec déduplication, groupement et auto-dismissal
// ==============================================================================

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({});

  // Nettoyage des timers lors du démontage
  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach(clearTimeout);
    };
  }, []);

  const removeToast = useCallback((id) => {
    if (!id) return;
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    Object.values(timersRef.current).forEach(clearTimeout);
    timersRef.current = {};
    setToasts([]);
  }, []);

  const addToast = useCallback(({ id, message, title, type = 'info', duration = 5000, items = [] }) => {
    // Si un ID stable est fourni, l'utiliser pour la déduplication
    // Sinon, déduire une clé basée sur le titre et le type
    const toastId = id || (title ? `${type}-${title}` : Date.now().toString());

    // Gestion du timer automatique
    if (timersRef.current[toastId]) {
      clearTimeout(timersRef.current[toastId]);
      delete timersRef.current[toastId];
    }

    setToasts((prev) => {
      // 1. Recherche par ID direct
      const existingByIdIndex = prev.findIndex((t) => t.id === toastId);
      if (existingByIdIndex !== -1) {
        // Mise à jour sur place sans doublon
        const updated = [...prev];
        updated[existingByIdIndex] = {
          id: toastId,
          title,
          message,
          type,
          items: Array.isArray(items) ? items : [],
          timestamp: Date.now()
        };
        return updated;
      }

      // 2. Recherche par titre et message identiques (anti-spam automatique)
      const identicalIndex = prev.findIndex(
        (t) => t.title === title && t.message === message && t.type === type
      );
      if (identicalIndex !== -1) {
        // Déjà affiché : rafraîchir sans dupliquer
        const updated = [...prev];
        updated[identicalIndex] = {
          ...updated[identicalIndex],
          items: Array.isArray(items) ? items : updated[identicalIndex].items,
          timestamp: Date.now()
        };
        return updated;
      }

      // 3. Nouveau toast unique
      return [
        ...prev,
        {
          id: toastId,
          title,
          message,
          type,
          items: Array.isArray(items) ? items : [],
          timestamp: Date.now()
        }
      ];
    });

    if (duration > 0) {
      timersRef.current[toastId] = setTimeout(() => {
        removeToast(toastId);
      }, duration);
    }
  }, [removeToast]);

  // Alias rétrocompatible supportant showToast(message, type) et showToast({ title, message, type })
  const showToast = useCallback((msgOrPayload, type = 'info') => {
    if (typeof msgOrPayload === 'string') {
      addToast({ message: msgOrPayload, type });
    } else if (msgOrPayload && typeof msgOrPayload === 'object') {
      addToast(msgOrPayload);
    }
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, showToast, removeToast, clearToasts }}>
      {children}
      {/* Toast Container : Positionné en haut à droite, responsive et non bloquant */}
      <div
        className="fixed top-4 right-4 sm:top-5 sm:right-5 z-50 flex flex-col gap-2.5 max-w-sm w-[calc(100%-2rem)] sm:w-96 pointer-events-none"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="alert"
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border bg-white shadow-[0_8px_24px_rgba(21,59,43,0.12)] transition-all duration-200 animate-fade-slide ${
              toast.type === 'success'
                ? 'border-emerald-200 text-emerald-950 border-l-4 border-l-emerald-600'
                : toast.type === 'error'
                ? 'border-rose-200 text-rose-950 border-l-4 border-l-rose-600'
                : toast.type === 'warning'
                ? 'border-amber-200 text-amber-950 border-l-4 border-l-gold'
                : 'border-slateSubtle-200 text-slateSubtle-900 border-l-4 border-l-gendarmerie'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-gold" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-gendarmerie" />}
            </div>

            <div className="flex-1 min-w-0">
              {toast.title && (
                <h5 className="font-bold text-xs md:text-sm text-gendarmerie">
                  {toast.title}
                </h5>
              )}
              {toast.message && (
                <p className="text-xs text-slateSubtle-700 leading-relaxed mt-0.5">
                  {toast.message}
                </p>
              )}

              {/* Groupement des erreurs (ex: liste des champs invalides) */}
              {toast.items && toast.items.length > 0 && (
                <ul className="mt-2 space-y-1 text-xs">
                  {toast.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 font-medium text-rose-900">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 p-1 rounded-lg text-slateSubtle-400 hover:text-slateSubtle-800 hover:bg-cream-100 transition-colors"
              aria-label="Fermer la notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast doit être utilisé dans un ToastProvider');
  }
  return context;
}
