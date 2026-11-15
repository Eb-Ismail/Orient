// ==============================================================================
// ORIENT-GR - Connecteur Base de Données Microsoft SQL Server & Store Fallback
// Gestion de pool de connexions mssql et résilience opérationnelle
// ==============================================================================

import { createRequire } from 'node:module';
import sqlDefault from 'mssql';
import {
  initialPromotions,
  initialDomaines,
  initialSpecialites,
  initialConditions,
  initialUsers,
  initialTests,
  initialQuestions,
  initialSessions,
  initialLogs,
  initialEvaluations
} from './mockData.js';
import { arabicQuestionBank140 } from './arabicQuestionBank140.js';
import { professionalSimulationModules } from './simulationData.js';
import { simulationTaskBank60 } from './simulationTaskBank60.js';
import { simpleThreeTests, simpleQuestionsBank30 } from './simpleTestBank30.js';
import {
  canonicalCompetencyFramework,
  initialSpecialtyCompetencyMatrix,
  defaultScoringCriteriaConfig
} from './competencyFramework.js';
import {
  workshopCategories,
  initialWorkshops,
  initialWorkshopAssignments
} from './workshopsData.js';

const require = createRequire(import.meta.url);
let sqlDriver = sqlDefault;

function resolveAuthMode() {
  return (process.env.DB_AUTH_MODE || 'windows').toLowerCase();
}

function getSqlDriver() {
  if (resolveAuthMode() === 'windows') {
    return require('mssql/msnodesqlv8');
  }
  return sqlDefault;
}

function buildSqlConfig(databaseOverride = null) {
  const authMode = resolveAuthMode();
  const server = process.env.DB_SERVER || '.\\CLASS';
  const database = databaseOverride || process.env.DB_NAME || 'OrientGR_DB';
  const encrypt = process.env.DB_ENCRYPT === 'true';
  const trustCert = process.env.DB_TRUST_SERVER_CERTIFICATE !== 'false';

  if (authMode === 'windows') {
    const driver = process.env.DB_DRIVER || 'ODBC Driver 17 for SQL Server';
    const connectionString =
      `Driver={${driver}};` +
      `Server=${server};` +
      `Database=${database};` +
      `Trusted_Connection=Yes;` +
      `Encrypt=${encrypt ? 'Yes' : 'No'};` +
      `TrustServerCertificate=${trustCert ? 'Yes' : 'No'};`;

    return {
      connectionString,
      pool: {
        max: 15,
        min: 0,
        idleTimeoutMillis: 15000
      }
    };
  }

  return {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server,
    port: parseInt(process.env.DB_PORT || '1433', 10),
    database,
    options: {
      encrypt,
      trustServerCertificate: trustCert,
      enableArithAbort: true,
      connectTimeout: 5000
    },
    pool: {
      max: 15,
      min: 0,
      idleTimeoutMillis: 15000
    }
  };
}

let pool = null;
let poolPromise = null;
let isMockMode = false;
let lastDbError = null;

// Store en mémoire réactif pour le développement et la démo (singleton sur globalThis)
if (!globalThis.__orient_gr_mockStore__) {
  globalThis.__orient_gr_mockStore__ = {
    promotions: [...initialPromotions],
    domaines: [...initialDomaines],
    specialites: [...initialSpecialites],
    conditions: [...initialConditions],
    users: [...initialUsers],
    tests: [initialTests[0], ...simpleThreeTests],
    questions: [...simpleQuestionsBank30, ...arabicQuestionBank140],
    sessions: [...initialSessions],
    evaluations: [...initialEvaluations],
    logs: [...initialLogs],
    simulationModules: [...professionalSimulationModules],
    simulationTasks: [...simulationTaskBank60],
    simulationSessions: [],
    competencies: [...canonicalCompetencyFramework],
    specialtyCompetencyMatrix: [...initialSpecialtyCompetencyMatrix],
    scoringCriteriaConfig: { ...defaultScoringCriteriaConfig },
    orientationProposals: [],
    workshopCategories: [...workshopCategories],
    workshops: [...initialWorkshops],
    workshopAssignments: [...initialWorkshopAssignments]
  };
} else {
  // Toujours synchroniser les tests (test 1 legacy + les 3 tests professionnels officiels)
  globalThis.__orient_gr_mockStore__.tests = [initialTests[0], ...simpleThreeTests];
  // Réinitialiser proprement les 30 questions des 3 tests simples professionnels
  globalThis.__orient_gr_mockStore__.questions = [...simpleQuestionsBank30, ...arabicQuestionBank140];

  if (!globalThis.__orient_gr_mockStore__.competencies) {
    globalThis.__orient_gr_mockStore__.competencies = [...canonicalCompetencyFramework];
  }
  if (!globalThis.__orient_gr_mockStore__.specialtyCompetencyMatrix) {
    globalThis.__orient_gr_mockStore__.specialtyCompetencyMatrix = [...initialSpecialtyCompetencyMatrix];
  }
  if (!globalThis.__orient_gr_mockStore__.scoringCriteriaConfig) {
    globalThis.__orient_gr_mockStore__.scoringCriteriaConfig = { ...defaultScoringCriteriaConfig };
  }
  if (!globalThis.__orient_gr_mockStore__.orientationProposals) {
    globalThis.__orient_gr_mockStore__.orientationProposals = [];
  }
  if (!globalThis.__orient_gr_mockStore__.workshopCategories) {
    globalThis.__orient_gr_mockStore__.workshopCategories = [...workshopCategories];
  }
  if (!globalThis.__orient_gr_mockStore__.workshops) {
    globalThis.__orient_gr_mockStore__.workshops = [...initialWorkshops];
  }
  if (!globalThis.__orient_gr_mockStore__.workshopAssignments || globalThis.__orient_gr_mockStore__.workshopAssignments.length < 9) {
    globalThis.__orient_gr_mockStore__.workshopAssignments = [...initialWorkshopAssignments];
  }
}

export const mockStore = globalThis.__orient_gr_mockStore__;

/**
 * Obtient le pool de connexion SQL Server (reconnexion automatique si fermé)
 */
export async function getDbPool() {
  if (pool && pool.connected) {
    return pool;
  }

  if (isMockMode && process.env.ENABLE_DB_MOCK_FALLBACK === 'true' && process.env.DB_SERVER_STRICT !== 'true') {
    return null;
  }

  if (poolPromise) {
    return poolPromise;
  }

  sqlDriver = getSqlDriver();
  const config = buildSqlConfig();

  const allowFallback = process.env.ENABLE_DB_MOCK_FALLBACK === 'true' && process.env.DB_SERVER_STRICT !== 'true';

  poolPromise = new sqlDriver.ConnectionPool(config)
    .connect()
    .then((connectedPool) => {
      pool = connectedPool;
      isMockMode = false;
      lastDbError = null;
      pool.on('error', (err) => {
        console.error('❌ [ORIENT-GR] Erreur du pool SQL Server (réinitialisation) :', err.message);
        lastDbError = err.message;
        pool = null;
      });
      console.log(`✅ [ORIENT-GR] Pool SQL Server connecté (${resolveAuthMode().toUpperCase()} -> ${process.env.DB_SERVER || '.\\CLASS'}/${process.env.DB_NAME || 'OrientGR_DB'}).`);
      return pool;
    })
    .catch((err) => {
      lastDbError = err.message;
      pool = null;
      if (allowFallback) {
        console.warn('⚠️ [ORIENT-GR] Serveur SQL Server non joignable. Basculement en mode MOCK Store.');
        console.warn('   Détail:', err.message);
        isMockMode = true;
        return null;
      }
      throw new Error(`Connexion SQL Server impossible (${process.env.DB_SERVER || '.\\CLASS'}/${process.env.DB_NAME || 'OrientGR_DB'}): ${err.message}`);
    })
    .finally(() => {
      poolPromise = null;
    });

  return poolPromise;
}

/**
 * Exécute une requête SQL paramétrée et retourne recordset
 */
export async function executeQuery(queryText, params = {}) {
  const activePool = await getDbPool();

  if (activePool) {
    const request = activePool.request();
    for (const [key, value] of Object.entries(params)) {
      request.input(key, value);
    }
    const result = await request.query(queryText);
    return result.recordset;
  }

  return null;
}

/**
 * Exécute un ordre SQL paramétré complet (retourne { recordset, rowsAffected, recordsets })
 */
export async function executeStatement(queryText, params = {}) {
  const activePool = await getDbPool();
  if (!activePool) return null;

  const request = activePool.request();
  for (const [key, value] of Object.entries(params)) {
    request.input(key, value);
  }
  return request.query(queryText);
}

export async function closeDbPool() {
  if (pool) {
    try {
      await pool.close();
    } catch {}
    pool = null;
  }
}

export async function checkDbHealth() {
  try {
    const rows = await executeQuery(`
      SELECT
        @@SERVERNAME AS serverName,
        DB_NAME() AS databaseName,
        SUSER_SNAME() AS currentLogin,
        SERVERPROPERTY('ProductVersion') AS productVersion
    `);
    if (!rows || rows.length === 0) {
      return { connected: false, mode: 'mock', lastError: lastDbError };
    }
    return {
      connected: true,
      mode: 'sql_server',
      authMode: resolveAuthMode(),
      ...rows[0]
    };
  } catch (err) {
    return {
      connected: false,
      mode: 'error',
      authMode: resolveAuthMode(),
      error: err.message
    };
  }
}

export async function useSqlServer() {
  if (process.env.ORIENT_GR_FORCE_MOCK === 'true') {
    return false;
  }
  const activePool = await getDbPool();
  return Boolean(activePool);
}

export function isUsingMockStore() {
  if (pool && pool.connected && process.env.ORIENT_GR_FORCE_MOCK !== 'true') {
    return false;
  }
  return isMockMode || process.env.ENABLE_DB_MOCK_FALLBACK === 'true';
}

export { sqlDriver as sql };
