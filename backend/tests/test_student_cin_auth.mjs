// ==============================================================================
// ORIENT-GR — Suite de Tests : Authentification Espace Élève par CIN + Matricule
// Validation des exigences de sécurité, conformité SQL Server, rate-limiting & anti-IDOR
// ==============================================================================

import { getDbPool } from '../lib/db.js';

const BASE_URL = 'http://localhost:5050/api';

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✅ [PASS] ${testName}`);
    testsPassed++;
  } else {
    console.error(`  ❌ [FAIL] ${testName}`);
    testsFailed++;
  }
}

async function postLogin(body, clientIp = '10.0.1.1') {
  return fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': clientIp
    },
    body: JSON.stringify(body)
  });
}

async function runStudentAuthTests() {
  console.log('\n======================================================================');
  console.log('--- SUITE DE TESTS : AUTHENTIFICATION ÉLÈVE PAR CIN + MATRICULE ---');
  console.log('======================================================================\n');

  const pool = await getDbPool();

  // Débloquer au préalable les comptes de test et réinitialiser les compteurs d'échecs
  await pool.request().query(`
    UPDATE dbo.Utilisateurs 
    SET TentativesEchouees = 0, VerrouilleJusquA = NULL 
    WHERE Role = 'ELEVE';
  `);

  // Réinitialiser les compteurs de rate-limiting en mémoire
  await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-reset-rate-limit': 'true' },
    body: JSON.stringify({ matricule: 'EG-2025-042', cin: 'CD789012' })
  });

  // --------------------------------------------------------------------------
  // TEST 1 : Authentification réussie avec CIN et Matricule valides
  // --------------------------------------------------------------------------
  console.log('Test 1 : Authentification élève avec CIN et Matricule valides...');
  const res1 = await postLogin({ cin: 'AB123456', matricule: 'EG-2025-099' }, '10.0.1.1');
  const data1 = await res1.json();
  assert(res1.status === 200, 'Statut HTTP 200 pour identifiants valides');
  assert(data1.token && typeof data1.token === 'string', 'Jeton JWT militaire renvoyé');
  assert(data1.user && data1.user.role === 'ELEVE', 'Rôle utilisateur = ELEVE');
  assert(data1.user.matricule === 'EG-2025-099', 'Matricule utilisateur = EG-2025-099');
  assert(data1.user.nom === 'Moreau' && data1.user.prenom === 'Julien', 'Identité élève concordante (Julien Moreau)');

  const studentToken = data1.token;

  // --------------------------------------------------------------------------
  // TEST 2 : Échec avec CIN erroné pour matricule existant (Non-divulgation)
  // --------------------------------------------------------------------------
  console.log('\nTest 2 : Tentative avec CIN erroné et matricule valide (Anti-énumération)...');
  const res2 = await postLogin({ cin: 'ZZ999999', matricule: 'EG-2025-099' }, '10.0.1.2');
  const data2 = await res2.json();
  assert(res2.status === 401, 'Statut HTTP 401 Unauthorized');
  assert(data2.error === 'Identifiants militaires invalides ou non concordants.', 'Message d\'erreur générique neutre');

  // --------------------------------------------------------------------------
  // TEST 3 : Échec avec matricule inexistant pour CIN existant (Non-divulgation)
  // --------------------------------------------------------------------------
  console.log('\nTest 3 : Tentative avec CIN valide et matricule inexistant (Anti-énumération)...');
  const res3 = await postLogin({ cin: 'AB123456', matricule: 'EG-9999-999' }, '10.0.1.3');
  const data3 = await res3.json();
  assert(res3.status === 401, 'Statut HTTP 401 Unauthorized');
  assert(data3.error === 'Identifiants militaires invalides ou non concordants.', 'Message d\'erreur identique non révélateur');

  // --------------------------------------------------------------------------
  // TEST 4 : Refus d'un compte encadrement (ADMIN / INSTRUCTEUR) via l'espace élève
  // --------------------------------------------------------------------------
  console.log('\nTest 4 : Refus des rôles encadrement via la passerelle CIN élève...');
  const res4 = await postLogin({ cin: 'AB123456', matricule: 'ADM-001' }, '10.0.1.4');
  const data4 = await res4.json();
  assert(res4.status === 401, 'Refus HTTP 401 avec message générique');
  assert(data4.error === 'Identifiants militaires invalides ou non concordants.', 'Non-divulgation pour profil non-élève');

  // --------------------------------------------------------------------------
  // TEST 5 : Refus de connexion mot de passe pour un compte élève
  // --------------------------------------------------------------------------
  console.log('\nTest 5 : Refus d\'accès par mot de passe pour les élèves...');
  const res5 = await postLogin({ identifier: 'julien.moreau@eleve.gendarmerie.fr', password: 'Gendarme2026!' }, '10.0.1.5');
  const data5 = await res5.json();
  assert(res5.status === 403, 'Statut HTTP 403 Forbidden');
  assert(data5.error.includes('exclusivement par Numéro CIN'), 'Consigne explicite de redirection vers CIN + Matricule');

  // --------------------------------------------------------------------------
  // TEST 6 : Préservation stricte de la connexion ADMIN et INSTRUCTEUR
  // --------------------------------------------------------------------------
  console.log('\nTest 6 : Préservation de l\'authentification Officiers et Instructeurs...');
  const resAdmin = await postLogin({ identifier: 'commandement@orient-gr.gendarmerie.fr', password: 'Gendarme2026!' }, '10.0.1.6');
  const dataAdmin = await resAdmin.json();
  assert(resAdmin.status === 200 && dataAdmin.user?.role === 'ADMIN', 'Connexion ADMIN par mot de passe opérationnelle (200 OK)');

  const resInst = await postLogin({ identifier: 'instructeur@orient-gr.gendarmerie.fr', password: 'Gendarme2026!' }, '10.0.1.7');
  const dataInst = await resInst.json();
  assert(resInst.status === 200 && dataInst.user?.role === 'INSTRUCTEUR', 'Connexion INSTRUCTEUR par mot de passe opérationnelle (200 OK)');

  // --------------------------------------------------------------------------
  // TEST 7 : Protection contre les attaques automatisées & Limitation des tentatives (Rate-Limiting)
  // --------------------------------------------------------------------------
  console.log('\nTest 7 : Vérification du Rate-Limiting et verrouillage de sécurité...');
  const targetMatricule = 'EG-2025-999'; // Cible d'attaque simulée
  const attackerIp = '192.168.88.88';
  let lockedDetected = false;

  for (let i = 1; i <= 6; i++) {
    const resRate = await postLogin({ cin: `FAUX0${i}`, matricule: targetMatricule }, attackerIp);
    if (resRate.status === 429) {
      lockedDetected = true;
      const dataRate = await resRate.json();
      assert(dataRate.error.includes('temporairement suspendu') || dataRate.error.includes('temporairement verrouillé'), 
        `Tentative ${i} : Détection du verrouillage automatique (HTTP 429) pour IP ${attackerIp}`);
      break;
    }
  }
  assert(lockedDetected, 'La politique de protection contre les attaques automatisées est active (HTTP 429)');

  // Réinitialiser le verrouillage pour Clara Bernard pour les tests suivants
  await pool.request().query(`
    UPDATE dbo.Utilisateurs 
    SET TentativesEchouees = 0, VerrouilleJusquA = NULL 
    WHERE Matricule = 'EG-2025-042';
  `);

  // --------------------------------------------------------------------------
  // TEST 8 : Confidentialité des logs (Le CIN n'est JAMAIS stocké en clair)
  // --------------------------------------------------------------------------
  console.log('\nTest 8 : Audit de sécurité des logs dans SQL Server (Non-stockage du CIN en clair)...');
  const recentLogsRes = await pool.request().query(`
    SELECT TOP 30 Action, Details, DateLog 
    FROM dbo.LogsActivite 
    WHERE Action IN ('ECHEC_CONNEXION_ELEVE', 'CONNEXION_REUSSIE_ELEVE')
    ORDER BY LogId DESC;
  `);

  const logs = recentLogsRes.recordset;
  assert(logs.length > 0, 'Présence des événements d\'audit de connexion dans dbo.LogsActivite');

  let hasClearCin = false;
  let hasMaskedCin = false;

  for (const log of logs) {
    if (log.Details.includes('AB123456') || log.Details.includes('ZZ999999')) {
      hasClearCin = true;
    }
    if (log.Details.includes('masqué:')) {
      hasMaskedCin = true;
    }
  }

  assert(!hasClearCin, 'AUCUN CIN en clair n\'est enregistré dans les détails des logs SQL Server');
  assert(hasMaskedCin, 'Le CIN est correctement masqué dans les logs d\'audit (ex: AB****56)');

  // --------------------------------------------------------------------------
  // TEST 9 : Isolation des comptes & Anti-IDOR
  // --------------------------------------------------------------------------
  console.log('\nTest 9 : Contrôle d\'isolation des élèves et protection Anti-IDOR...');
  // Julien Moreau (ID 2) tente d'accéder à son propre profil -> 200 OK
  const ownProfileRes = await fetch(`${BASE_URL}/students/2`, {
    headers: { 'Authorization': `Bearer ${studentToken}` }
  });
  assert(ownProfileRes.status === 200, 'L\'élève accède légitimement à son propre profil (/api/students/2 -> 200 OK)');

  // Julien Moreau (ID 2) tente d'accéder au profil de Clara Bernard (ID 3) -> 403 Forbidden
  const otherProfileRes = await fetch(`${BASE_URL}/students/3`, {
    headers: { 'Authorization': `Bearer ${studentToken}` }
  });
  assert(otherProfileRes.status === 403, 'Tentative IDOR interceptée : Accès au profil d\'un autre élève refusé (403 Forbidden)');

  // --------------------------------------------------------------------------
  // TEST 10 : Validation de l'authentification des autres élèves
  // --------------------------------------------------------------------------
  console.log('\nTest 10 : Vérification d\'accès pour tous les élèves répertoriés...');
  const studentsToTest = [
    { matricule: 'EG-2025-042', cin: 'CD789012', nom: 'Bernard', prenom: 'Clara', ip: '10.0.2.1' },
    { matricule: 'EG-2025-089', cin: 'EF345678', nom: 'Leroux', prenom: 'Thomas', ip: '10.0.2.2' },
    { matricule: 'EG-2025-103', cin: 'GH901234', nom: 'Benali', prenom: 'Sarah', ip: '10.0.2.3' }
  ];

  for (const s of studentsToTest) {
    const resS = await postLogin({ cin: s.cin, matricule: s.matricule }, s.ip);
    const dataS = await resS.json();
    assert(resS.status === 200 && dataS.user?.matricule === s.matricule, 
      `Élève ${s.prenom} ${s.nom} (${s.matricule}) connecté avec succès via CIN ${s.cin}`);
  }

  // --------------------------------------------------------------------------
  // BILAN FINAL
  // --------------------------------------------------------------------------
  console.log('\n======================================================================');
  console.log(`RÉSULTAT GLOBAL : ${testsPassed} tests réussis sur ${testsPassed + testsFailed}`);
  if (testsFailed === 0) {
    console.log('🎉 TOUS LES TESTS D\'AUTHENTIFICATION ÉLÈVE SONT PASSÉS AVEC SUCCÈS !');
  } else {
    console.error(`⚠️ ${testsFailed} TEST(S) EN ÉCHEC.`);
  }
  console.log('======================================================================\n');

  process.exit(testsFailed === 0 ? 0 : 1);
}

runStudentAuthTests().catch(err => {
  console.error('Erreur non gérée lors des tests:', err);
  process.exit(1);
});
