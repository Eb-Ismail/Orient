import jwt from 'jsonwebtoken';
import { getDbPool } from '../lib/db.js';

const API_BASE = 'http://localhost:5050';
const JWT_SECRET = process.env.JWT_SECRET || 'secret-jwt-orient-gr-development-environnement-2026';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
    failed++;
  }
}

async function runTests() {
  console.log('======================================================================');
  console.log('--- TEST DE VÉRIFICATION : SUPPRESSION DU RÔLE INSTRUCTEUR ---');
  console.log('======================================================================\n');

  // --------------------------------------------------------------------------
  // TEST 1 : CONTRAINTE SQL SERVER & ZÉRO RÉSIDU EN BASE
  // --------------------------------------------------------------------------
  console.log('📌 GROUPE 1 : Intégrité SQL Server & Contrainte CK_Utilisateurs_Role');
  const pool = await getDbPool();
  assert(Boolean(pool), 'Connexion physique SQL Server OrientGR_DB active');

  const usersInst = await pool.request().query("SELECT COUNT(*) as cnt FROM dbo.Utilisateurs WHERE Role = 'INSTRUCTEUR'");
  assert(usersInst.recordset[0].cnt === 0, `Exactement 0 utilisateur avec le rôle INSTRUCTEUR en base (actuel: ${usersInst.recordset[0].cnt})`);

  const distinctRoles = await pool.request().query("SELECT DISTINCT Role FROM dbo.Utilisateurs");
  const rolesList = distinctRoles.recordset.map(r => r.Role).sort();
  assert(
    rolesList.every(r => ['ADMIN', 'COMMISSION', 'ELEVE'].includes(r)),
    `Rôles existants en base strictement limités à [ADMIN, COMMISSION, ELEVE] (trouvés: ${rolesList.join(', ')})`
  );

  // Vérifier le rejet matériel par la contrainte SQL Server
  let rejectedByDb = false;
  try {
    await pool.request().query("UPDATE dbo.Utilisateurs SET Role = 'INSTRUCTEUR' WHERE UtilisateurId = 1");
  } catch (err) {
    rejectedByDb = true;
  }
  assert(rejectedByDb, "Tentative d'affectation du rôle INSTRUCTEUR bloquée au niveau moteur par SQL Server");

  // --------------------------------------------------------------------------
  // TEST 2 : AUTHENTIFICATION DES 3 RÔLES OFFICIELS RESTANTS
  // --------------------------------------------------------------------------
  console.log('\n📌 GROUPE 2 : Authentification des 3 Rôles Autorisés (ADMIN, COMMISSION, ELEVE)');
  
  // 2.1 ADMIN Login
  let adminToken = null;
  try {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: 'commandement@orient-gr.gendarmerie.fr',
        password: 'Gendarme2026!'
      })
    });
    const data = await res.json();
    adminToken = data.token;
    assert(res.status === 200 && data.user.role === 'ADMIN', 'Connexion ADMIN réussie (role=ADMIN)');
  } catch (err) {
    assert(false, `Connexion ADMIN échouée : ${err.message}`);
  }

  // 2.2 COMMISSION Login (membre tech)
  let commToken = null;
  try {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: 'commission.tech@orient-gr.gendarmerie.fr',
        password: 'Gendarme2026!'
      })
    });
    const data = await res.json();
    commToken = data.token;
    assert(res.status === 200 && data.user.role === 'COMMISSION', 'Connexion COMMISSION réussie (role=COMMISSION)');
  } catch (err) {
    assert(false, `Connexion COMMISSION échouée : ${err.message}`);
  }

  // 2.3 COMMISSION Login (ex-instructeur Mohammed El Fassi converti)
  try {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: 'commission.meca@orient-gr.gendarmerie.fr',
        password: 'Gendarme2026!'
      })
    });
    const data = await res.json();
    assert(
      res.status === 200 && data.user.role === 'COMMISSION' && data.user.nom === 'El Fassi',
      'Ex-instructeur Mohammed El Fassi connecté avec rôle COMMISSION sans perte d\'historique'
    );
  } catch (err) {
    assert(false, `Connexion ex-instructeur converti échouée : ${err.message}`);
  }

  // 2.4 ELEVE Login (CIN + Matricule)
  let eleveToken = null;
  try {
    const res = await fetch(`${API_BASE}/api/auth/student-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cin: 'AB123456',
        matricule: 'EG-2025-099'
      })
    });
    const data = await res.json();
    eleveToken = data.token;
    assert(res.status === 200 && data.user.role === 'ELEVE', 'Connexion ELEVE par CIN + Matricule réussie (role=ELEVE)');
  } catch (err) {
    assert(false, `Connexion ELEVE échouée : ${err.message}`);
  }

  // --------------------------------------------------------------------------
  // TEST 3 : SÉCURITÉ & REJET DU RÔLE OBSOLÈTE INSTRUCTEUR
  // --------------------------------------------------------------------------
  console.log('\n📌 GROUPE 3 : Sécurité & Blocage Strict de toute Référence INSTRUCTEUR');

  // 3.1 Tentative d'accès avec un faux token signé portant role: 'INSTRUCTEUR'
  const forgedInstructorToken = jwt.sign(
    { id: 999, email: 'fake.instructeur@orient-gr.gendarmerie.fr', role: 'INSTRUCTEUR' },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  const resForged = await fetch(`${API_BASE}/api/workshops`, {
    headers: { Authorization: `Bearer ${forgedInstructorToken}` }
  });
  assert(
    resForged.status === 403 || resForged.status === 401,
    `Accès rejeté pour un jeton portant le rôle obsolète INSTRUCTEUR (Code HTTP: ${resForged.status})`
  );

  // 3.2 Tentative de connexion directe avec l'ancien identifiant instructeur
  const resOldEmail = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: 'instructeur@orient-gr.gendarmerie.fr',
      password: 'Gendarme2026!'
    })
  });
  assert(
    resOldEmail.status === 401 || resOldEmail.status === 403,
    `Connexion avec l'ancienne adresse instructeur@ rejetée (${resOldEmail.status})`
  );

  // --------------------------------------------------------------------------
  // TEST 4 : HABILITATIONS COMMISSION & ANTI-IDOR
  // --------------------------------------------------------------------------
  console.log('\n📌 GROUPE 4 : Habilitations Commission & Sécurité des Données');

  // 4.1 La commission peut consulter ses commissions autorisées
  const resComms = await fetch(`${API_BASE}/api/commissions`, {
    headers: { Authorization: `Bearer ${commToken}` }
  });
  const commsData = await resComms.json();
  assert(resComms.status === 200 && Array.isArray(commsData.commissions), 'Membre COMMISSION accède à la liste de ses commissions autorisées');

  // 4.2 L'élève n'a pas accès aux API de commissions (contrôle RBAC étanche)
  const resEleveBlocked = await fetch(`${API_BASE}/api/commissions`, {
    headers: { Authorization: `Bearer ${eleveToken}` }
  });
  assert(resEleveBlocked.status === 403, "Compte ELEVE bloqué sur les commissions (HTTP 403 Forbidden)");

  // 4.3 L'élève n'a pas accès aux outils d'administration
  const resAdminBlocked = await fetch(`${API_BASE}/api/admin/commissions/summary`, {
    headers: { Authorization: `Bearer ${eleveToken}` }
  });
  assert(resAdminBlocked.status === 403, "Compte ELEVE bloqué sur l'administration (HTTP 403 Forbidden)");

  // --------------------------------------------------------------------------
  // BILAN FINAL
  // --------------------------------------------------------------------------
  console.log('\n======================================================================');
  console.log(`RÉSULTATS DE VÉRIFICATION : ${passed} / ${passed + failed} TESTS RÉUSSIS`);
  if (failed === 0) {
    console.log('VERDICT FINAL : 🎉 RÔLE INSTRUCTEUR DÉFINITIVEMENT SUPPRIMÉ (PRODUCTION READY)');
  } else {
    console.error(`VERDICT FINAL : ❌ ${failed} TEST(S) EN ÉCHEC`);
  }
  console.log('======================================================================\n');

  process.exit(failed === 0 ? 0 : 1);
}

runTests().catch(err => {
  console.error('Erreur exécution test:', err);
  process.exit(1);
});
