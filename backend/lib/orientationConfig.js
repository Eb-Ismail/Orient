// ==============================================================================
// ORIENT-GR — Configuration des Permissions de Consultation des Résultats IA
// ==============================================================================

import { mockStore, useSqlServer, getDbPool } from './db.js';

// Valeur par défaut : "student_and_admin"
// Valeurs acceptées :
// - "student_and_admin" : l'élève et l'administrateur voient les résultats d'orientation.
// - "admin_only"        : seuls les administrateurs et formateurs autorisés voient les résultats.
export let ORIENTATION_RESULTS_VISIBILITY = process.env.ORIENTATION_RESULTS_VISIBILITY || 'student_and_admin';

// Synchronisation avec mockStore.systemSettings si initialisé
if (!mockStore.systemSettings) {
  mockStore.systemSettings = {};
}
if (!mockStore.systemSettings.orientationResultsVisibility) {
  mockStore.systemSettings.orientationResultsVisibility = ORIENTATION_RESULTS_VISIBILITY;
}

/**
 * Synchronise la visibilité depuis SQL Server dbo.SystemSettings
 */
export async function syncOrientationVisibilityFromDb() {
  if (await useSqlServer()) {
    const pool = await getDbPool();
    const res = await pool.request()
      .input('Key', 'orientationResultsVisibility')
      .query(`SELECT TOP 1 SettingValue FROM dbo.SystemSettings WHERE SettingKey = @Key`);
    const dbVal = res.recordset[0]?.SettingValue;
    if (dbVal === 'student_and_admin' || dbVal === 'admin_only') {
      ORIENTATION_RESULTS_VISIBILITY = dbVal;
      mockStore.systemSettings.orientationResultsVisibility = dbVal;
    }
  }
  return getOrientationResultsVisibility();
}

/**
 * Récupère le mode de visibilité actuel
 */
export function getOrientationResultsVisibility() {
  if (mockStore.systemSettings?.orientationResultsVisibility) {
    return mockStore.systemSettings.orientationResultsVisibility;
  }
  return ORIENTATION_RESULTS_VISIBILITY;
}

/**
 * Met à jour le mode de visibilité (admin uniquement)
 */
export function setOrientationResultsVisibility(visibility) {
  const allowed = ['student_and_admin', 'admin_only'];
  if (!allowed.includes(visibility)) {
    throw new Error(`Mode de visibilité invalide: '${visibility}'. Valeurs autorisées: ${allowed.join(', ')}`);
  }
  ORIENTATION_RESULTS_VISIBILITY = visibility;
  if (!mockStore.systemSettings) mockStore.systemSettings = {};
  mockStore.systemSettings.orientationResultsVisibility = visibility;
  return visibility;
}

/**
 * Met à jour la visibilité avec persistance SQL Server
 */
export async function setOrientationResultsVisibilityAsync(visibility, updatedBy = null) {
  setOrientationResultsVisibility(visibility);
  if (await useSqlServer()) {
    const pool = await getDbPool();
    await pool.request()
      .input('SettingKey', 'orientationResultsVisibility')
      .input('SettingValue', visibility)
      .input('UpdatedBy', updatedBy ?? null)
      .query(`
        IF EXISTS (SELECT 1 FROM dbo.SystemSettings WHERE SettingKey = @SettingKey)
          UPDATE dbo.SystemSettings SET SettingValue = @SettingValue, UpdatedBy = @UpdatedBy, UpdatedAt = SYSUTCDATETIME() WHERE SettingKey = @SettingKey;
        ELSE
          INSERT INTO dbo.SystemSettings (SettingKey, SettingValue, UpdatedBy) VALUES (@SettingKey, @SettingValue, @UpdatedBy);
      `);
  }
  return visibility;
}

/**
 * Vérifie si l'utilisateur spécifié a le droit de consulter les résultats d'orientation
 * @param {object} user - Objet utilisateur authentifié ({ role, Role, UtilisateurId })
 * @returns {boolean}
 */
export function canUserViewOrientationResults(user) {
  if (!user) return false;
  
  const role = (user.role || user.Role || '').toUpperCase();
  
  // L'administrateur a toujours accès
  if (role === 'ADMIN') return true;
  
  // Les commissions d'évaluation ont accès à la consultation
  if (role === 'COMMISSION') return true;

  // Pour l'élève gendarme : dépend de la configuration active
  const currentVisibility = getOrientationResultsVisibility();
  if (currentVisibility === 'student_and_admin') {
    return role === 'ELEVE';
  }

  // Si "admin_only", les élèves n'ont pas accès
  return false;
}
