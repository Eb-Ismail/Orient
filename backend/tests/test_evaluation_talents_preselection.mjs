// ==============================================================================
// ORIENT-GR — Suite de Tests Complète : Évaluation Pratique, Talents & Pré-sélection
// Validation automatisée des exigences, RBAC, Anti-IDOR, Moteur IA & SQL Server
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

async function loginUser(identifier, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password })
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Login failed for ${identifier}: ${err}`);
  }
  return res.json();
}

async function loginStudent(cin, matricule) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cin, matricule })
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Student login failed for ${matricule}: ${err}`);
  }
  return res.json();
}

async function runTests() {
  console.log('\n======================================================================');
  console.log('--- TEST SUITE : ÉVALUATION PRATIQUE, TALENTS & PRÉ-SÉLECTION ---');
  console.log('======================================================================\n');

  // 1. Authentification des différents rôles
  console.log('Étape 1 : Authentification des rôles (ADMIN, INSTRUCTEUR, ELEVE)...');
  const pool = await getDbPool();
  // Réinitialiser les verrouillages administratifs de test pour Thomas Leroux et Clara Bernard
  await pool.request().query(`
    UPDATE dbo.OrientationProposals 
    SET EstDecisionVerrouillee = 0, StatutArbitrage = 'PROPOSEE', StatutPreselection = NULL
    WHERE UtilisateurId IN (3, 4);
  `);
  const adminAuth = await loginUser('commandement@orient-gr.gendarmerie.fr', 'Gendarme2026!');
  const instAuth = await loginUser('instructeur@orient-gr.gendarmerie.fr', 'Gendarme2026!');
  const eleveJulien = await loginStudent('AB123456', 'EG-2025-099');
  const eleveClara = await loginStudent('CD789012', 'EG-2025-042');

  assert(adminAuth?.token && adminAuth?.user?.role === 'ADMIN', 'Connexion Administrateur (Commandement) OK');
  assert(instAuth?.token && instAuth?.user?.role === 'INSTRUCTEUR', 'Connexion Instructeur OK');
  assert(eleveJulien?.token && eleveJulien?.user?.role === 'ELEVE', 'Connexion Élève Julien Moreau OK');
  assert(eleveClara?.token && eleveClara?.user?.role === 'ELEVE', 'Connexion Élève Clara Bernard OK');

  const adminHeaders = { 'Content-Type': 'application/json', Authorization: `Bearer ${adminAuth.token}` };
  const instHeaders = { 'Content-Type': 'application/json', Authorization: `Bearer ${instAuth.token}` };
  const eleveHeaders = { 'Content-Type': 'application/json', Authorization: `Bearer ${eleveJulien.token}` };

  // 2. Tests Espace Instructeur & Formulaire
  console.log('\nÉtape 2 : Tests Espace Instructeur & Formulaire Évaluation Terrain...');
  
  // 2.1 Liste des élèves pour instructeur (avec filière et diplôme)
  const stRes = await fetch(`${BASE_URL}/instructor/students`, { headers: instHeaders });
  const stData = await stRes.json();
  assert(stRes.status === 200 && Array.isArray(stData.students) && stData.students.length >= 4, 'GET /api/instructor/students retourne la liste des élèves');
  
  const julienItem = stData.students.find(s => s.id === 2);
  const claraItem = stData.students.find(s => s.id === 3);
  assert(julienItem?.filiereEntree === 'NORMAL_BAC', 'Julien Moreau identifié comme NORMAL_BAC');
  assert(claraItem?.filiereEntree === 'SPECIALISTE_ISTA' && claraItem?.diplomeOrigine, 'Clara Bernard identifiée comme SPECIALISTE_ISTA avec diplôme');

  // 2.2 Validation des entrées d'évaluation
  const badNoteRes = await fetch(`${BASE_URL}/instructor/practical-evaluations`, {
    method: 'POST',
    headers: instHeaders,
    body: JSON.stringify({
      studentId: 4,
      workshopId: 4,
      notePratique: 25, // Invalide > 20
      tempsMinutes: 40,
      niveauAutonomie: 'AUTONOME'
    })
  });
  assert(badNoteRes.status === 400, 'Rejet note > 20 (Code 400)');

  const badTempsRes = await fetch(`${BASE_URL}/instructor/practical-evaluations`, {
    method: 'POST',
    headers: instHeaders,
    body: JSON.stringify({
      studentId: 4,
      workshopId: 4,
      notePratique: 14,
      tempsMinutes: -10, // Invalide <= 0
      niveauAutonomie: 'AUTONOME'
    })
  });
  assert(badTempsRes.status === 400, 'Rejet temps de résolution <= 0 (Code 400)');

  const badAutonomieRes = await fetch(`${BASE_URL}/instructor/practical-evaluations`, {
    method: 'POST',
    headers: instHeaders,
    body: JSON.stringify({
      studentId: 4,
      workshopId: 4,
      notePratique: 14,
      tempsMinutes: 45,
      niveauAutonomie: '' // Manquant
    })
  });
  assert(badAutonomieRes.status === 400, 'Rejet niveau autonomie manquant (Code 400)');

  // 2.3 Enregistrement d'une évaluation valide pour Thomas Leroux (Élève #4, Spécialiste ISTA Mécanique)
  const saveEvalRes = await fetch(`${BASE_URL}/instructor/practical-evaluations`, {
    method: 'POST',
    headers: instHeaders,
    body: JSON.stringify({
      studentId: 4,
      workshopId: 4,
      domaineCode: 'CAT-MECA',
      notePratique: 16.5,
      tempsMinutes: 38,
      niveauAutonomie: 'AUTONOME',
      competencesValidees: ['Diagnostic valise OBD-II', 'Circuit de refroidissement', 'Injection diesel'],
      observation: 'Excellente rigueur dans le diagnostic des pannes électroniques.',
      orientationSuggeree: 'SPEC-MOB'
    })
  });
  const saveEvalData = await saveEvalRes.json();
  assert(saveEvalRes.status === 200 && saveEvalData.success === true, 'POST /api/instructor/practical-evaluations réussite enregistrement');
  assert(saveEvalData.evaluation?.notePratique === 16.5, 'Note pratique 16.5 enregistrée dans SQL');
  assert(saveEvalData.evaluation?.niveauAutonomie === 'AUTONOME', 'Niveau autonomie AUTONOME enregistré dans SQL');

  // 3. Tests Moteur de Pré-sélection & Détection des Talents
  console.log('\nÉtape 3 : Tests Moteur Intelligent de Pré-sélection...');

  // 3.1 Thomas Leroux (ISTA Mécanique + Note 16.5 + AUTONOME) -> SPECIALISTE_CONFIRME [SPEC-MOB]
  assert(saveEvalData.preselection?.filiereEntree === 'SPECIALISTE_ISTA', 'Thomas Leroux reconnu comme filière SPECIALISTE_ISTA');
  assert(saveEvalData.preselection?.statutPreselection === 'SPECIALISTE_CONFIRME', 'Statut SPECIALISTE_CONFIRME déclenché avec succès');
  assert(saveEvalData.preselection?.specialiteProposeeCode === 'SPEC-MOB', 'Spécialité officielle SPEC-MOB proposée pour la mécanique');

  // 3.2 Consultation de la pré-sélection de Julien Moreau (Bac + Note 18.5 + AUTONOME)
  const preselJulienRes = await fetch(`${BASE_URL}/students/2/preselection`, { headers: adminHeaders });
  const preselJulien = await preselJulienRes.json();
  assert(preselJulienRes.status === 200, 'GET /api/students/2/preselection accessible');
  assert(
    preselJulien.preselection?.statutPreselection === 'TALENT_CACHE' || preselJulien.preselection?.statutPreselection === 'AFFECTATION_VALIDEE',
    'Julien Moreau détecté comme TALENT_CACHE (ou AFFECTATION_VALIDEE)'
  );

  // 3.3 Consultation de Sarah Benali (Élève #5, Bac, aucune évaluation pratique)
  const preselSarahRes = await fetch(`${BASE_URL}/students/5/preselection`, { headers: adminHeaders });
  const preselSarah = await preselSarahRes.json();
  assert(preselSarah.preselection?.statutPreselection === 'EVAL_COMPLEMENTAIRE', 'Sarah Benali sans atelier -> EVAL_COMPLEMENTAIRE');
  assert(preselSarah.preselection?.moyennePratique === null, 'Aucune note inventée pour Sarah Benali (moyenne = null)');

  // 4. Tests Espace Admin / Commandement
  console.log('\nÉtape 4 : Tests Espace Admin / Commandement (KPI, Filtres, Arbitrage)...');

  // 4.1 Récupération de la synthèse générale et des KPI
  const adminPreselRes = await fetch(`${BASE_URL}/admin/preselection`, { headers: adminHeaders });
  const adminPreselData = await adminPreselRes.json();
  assert(adminPreselRes.status === 200 && adminPreselData.success === true, 'GET /api/admin/preselection succès');
  assert(adminPreselData.kpi?.totalElevesEvalues >= 2, 'KPI totalElevesEvalues calculé depuis SQL');
  assert(adminPreselData.kpi?.specialistesIstaConfirmes >= 1, 'KPI specialistesIstaConfirmes calculé depuis SQL');
  assert(adminPreselData.kpi?.talentsCachesDetectes >= 1, 'KPI talentsCachesDetectes calculé depuis SQL');
  assert(adminPreselData.kpi?.tauxAdequationGlobale > 0, 'KPI tauxAdequationGlobale calculé depuis SQL');

  // 4.2 RBAC : Tentative de validation par un non-ADMIN
  const eleveValidateRes = await fetch(`${BASE_URL}/admin/preselection/validate`, {
    method: 'POST',
    headers: eleveHeaders,
    body: JSON.stringify({
      studentId: 3,
      action: 'VALIDER',
      specialiteRetenueCode: 'SPEC-PST',
      justification: 'Tentative élève'
    })
  });
  assert(eleveValidateRes.status === 403, 'Refus validation par ELEVE (Code 403 Forbidden)');

  const instValidateRes = await fetch(`${BASE_URL}/admin/preselection/validate`, {
    method: 'POST',
    headers: instHeaders,
    body: JSON.stringify({
      studentId: 3,
      action: 'VALIDER',
      specialiteRetenueCode: 'SPEC-PST',
      justification: 'Tentative instructeur'
    })
  });
  assert(instValidateRes.status === 403, 'Refus validation officielle par INSTRUCTEUR (Code 403 Forbidden - Réservé ADMIN)');

  // 4.3 Validation officielle de l'affectation par l'ADMIN pour Clara Bernard (Élève #3)
  const adminValRes = await fetch(`${BASE_URL}/admin/preselection/validate`, {
    method: 'POST',
    headers: adminHeaders,
    body: JSON.stringify({
      studentId: 3,
      action: 'VALIDER',
      specialiteRetenueCode: 'SPEC-PST',
      justification: 'Validation officielle de la commission plénière 2026 au vu du diplôme ISTA et des compétences réseaux validées.'
    })
  });
  const adminValData = await adminValRes.json();
  assert(adminValRes.status === 200 && adminValData.success === true, 'ADMIN validation officielle d affectation réussie');
  assert(adminValData.statutPreselection === 'AFFECTATION_VALIDEE', 'Statut mis à jour vers AFFECTATION_VALIDEE');

  // 4.4 Rejet officiel d'une proposition par l'ADMIN pour test de traçabilité
  const adminRejRes = await fetch(`${BASE_URL}/admin/preselection/validate`, {
    method: 'POST',
    headers: adminHeaders,
    body: JSON.stringify({
      studentId: 4,
      action: 'REJETER',
      specialiteRetenueCode: 'SPEC-TERR',
      justification: 'Dossier réorienté vers la réserve générale.'
    })
  });
  const adminRejData = await adminRejRes.json();
  assert(adminRejRes.status === 200 && adminRejData.statutPreselection === 'PROPOSITION_REJETEE', 'ADMIN rejet d affectation pris en compte');

  // 5. Tests de Sécurité Anti-IDOR
  console.log('\nÉtape 5 : Tests de Sécurité Anti-IDOR...');
  // Julien Moreau (id: 2) consulte son propre profil -> 200
  const selfRes = await fetch(`${BASE_URL}/students/2/preselection`, { headers: eleveHeaders });
  assert(selfRes.status === 200, 'Élève consulte son propre profil (IDOR légitime -> 200 OK)');

  // Julien Moreau (id: 2) tente de consulter le profil de Clara Bernard (id: 3) -> 403
  const idorRes = await fetch(`${BASE_URL}/students/3/preselection`, { headers: eleveHeaders });
  assert(idorRes.status === 403, 'Anti-IDOR : Élève ne peut pas consulter le profil d un tiers (403 Forbidden)');

  // 6. Vérification directe en base SQL Server
  console.log('\nÉtape 6 : Vérification de la persistance directe dans OrientGR_DB...');

  const evalDbRes = await pool.request()
    .input('Uid', 4)
    .query('SELECT TOP 1 * FROM dbo.InstructorEvaluations WHERE UtilisateurId = @Uid AND NotePratique IS NOT NULL ORDER BY InstructorEvalId DESC');
  assert(evalDbRes.recordset.length > 0 && Number(evalDbRes.recordset[0].NotePratique) === 16.5, 'SQL Direct : Évaluation présente dans dbo.InstructorEvaluations');

  const propDbRes = await pool.request()
    .input('Uid', 3)
    .query('SELECT TOP 1 * FROM dbo.OrientationProposals WHERE UtilisateurId = @Uid');
  assert(
    propDbRes.recordset.length > 0 &&
    propDbRes.recordset[0].StatutPreselection === 'AFFECTATION_VALIDEE' &&
    propDbRes.recordset[0].EstDecisionVerrouillee === true,
    'SQL Direct : Décision administrative verrouillée dans dbo.OrientationProposals'
  );

  const logDbRes = await pool.request()
    .query("SELECT TOP 1 * FROM dbo.LogsActivite WHERE Action = 'VALIDATION_AFFECTATION_SPECIALITE' ORDER BY LogId DESC");
  assert(logDbRes.recordset.length > 0, 'SQL Direct : Action consignée dans dbo.LogsActivite');

  console.log('\n======================================================================');
  console.log(`RÉSULTATS DE LA VALIDATION : ${testsPassed} PASS / ${testsFailed} FAIL`);
  console.log('======================================================================\n');

  if (testsFailed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests().catch(err => {
  console.error('\n❌ Erreur inattendue lors de la suite de tests:', err);
  process.exit(1);
});
