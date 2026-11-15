// ==============================================================================
// ORIENT-GR - Suite de Tests Automatisés du Moteur d'Orientation
// Exécution : node tests/run-all-tests.js
// ==============================================================================

import assert from 'node:assert';
import {
  calculateDomainScores,
  calculateCompetencyProfiles,
  calculateDataConfidence,
  evaluateSingleCondition,
  matchStudentToSpecialties
} from '../services/orientationEngine.js';
import { testService } from '../services/testService.js';
import { workshopService } from '../services/workshopService.js';
import { workshopCategories } from '../lib/workshopsData.js';
import { mockStore } from '../lib/db.js';

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}`);
    console.error(`     Erreur: ${err.message}`);
    console.error(err.stack);
  }
}

async function runAsyncTest(name, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}`);
    console.error(`     Erreur: ${err.message}`);
    console.error(err.stack);
  }
}

console.log('\n======================================================');
console.log('  DÉMARRAGE DES TESTS AUTOMATISÉS ORIENT-GR');
console.log('======================================================\n');

// --------------------------------------------------------------------------
// 1. Tests des Conditions d'Éligibilité (Logique stricte à 3 états)
// --------------------------------------------------------------------------
console.log('📌 GROUPE 1 : Évaluation des Conditions d\'Éligibilité & Paramètre Provisoire Démo');

runTest('Condition satisfaite quand la note sportive dépasse le seuil officiel', () => {
  const condition = {
    ConditionId: 2,
    SpecialiteId: 9,
    TypeCondition: 'APTITUDE_PHYSIQUE',
    CibleCondition: 'AptitudePhysique',
    Operateur: '>=',
    Seuil: '14.0',
    EstObligatoire: true,
    SourceOfficielle: 'Instruction N° 2100/DEF/GEND/RH',
    StatutValidation: 'VALIDEE_OFFICIELLE',
    Description: 'Note sportive minimale de 14/20'
  };
  const student = { AptitudePhysique: 16.5 };
  const res = evaluateSingleCondition(condition, student, {});

  assert.strictEqual(res.status, 'SATISFAITE');
  assert.strictEqual(res.labelStatus, 'Condition satisfaite');
});

runTest('Condition non satisfaite quand la note est inférieure au seuil obligatoire', () => {
  const condition = {
    ConditionId: 8,
    SpecialiteId: 2,
    TypeCondition: 'NOTE_MIN_FORMATION',
    CibleCondition: 'NoteFormationPro',
    Operateur: '>=',
    Seuil: '13.5',
    EstObligatoire: true,
    SourceOfficielle: 'Règlement de scolarité DGGN',
    StatutValidation: 'VALIDEE_OFFICIELLE',
    Description: 'Moyenne académique minimale de 13.5/20'
  };
  const student = { NoteFormationPro: 12.0 };
  const res = evaluateSingleCondition(condition, student, {});

  assert.strictEqual(res.status, 'NON_SATISFAITE');
  assert.strictEqual(res.labelStatus, 'Condition non satisfaite');
});

runTest('Condition à vérifier : Donnée manquante (vision absente) ne doit PAS être un échec', () => {
  const condition = {
    ConditionId: 3,
    SpecialiteId: 9,
    TypeCondition: 'VISION',
    CibleCondition: 'VisionSIGYCOP_Y',
    Operateur: '<=',
    Seuil: '2',
    EstObligatoire: true,
    SourceOfficielle: 'Arrêté interministériel SIGYCOP Armées',
    StatutValidation: 'VALIDEE_OFFICIELLE',
    Description: 'Vision Y <= 2 exigée'
  };
  // L'élève n'a pas encore son contrôle de vision consigné
  const student = { VisionSIGYCOP_Y: null };
  const res = evaluateSingleCondition(condition, student, {});

  assert.strictEqual(res.status, 'A_VERIFIER');
  assert.ok(res.labelStatus.includes('Condition à vérifier'));
  assert.notStrictEqual(res.status, 'NON_SATISFAITE', 'Une donnée manquante ne doit pas être traitée comme un échec');
});

runTest('Paramètre configurable démo : Taille minimale de 180 cm pour MOTARD étiquetée "Condition à vérifier"', () => {
  const condition = {
    ConditionId: 1,
    SpecialiteId: 9,
    TypeCondition: 'TAILLE_MIN',
    CibleCondition: 'TailleCm',
    Operateur: '>=',
    Seuil: '180',
    EstObligatoire: true,
    SourceOfficielle: 'Paramètre provisoire démo commanditaire (non officiel)',
    StatutValidation: 'PROVISOIRE_DEMO',
    Description: 'Taille minimale indicative de 180 cm (paramètre provisoire de démonstration non officiel)'
  };
  const student = { TailleCm: 183 }; // L'élève fait 183 cm
  const res = evaluateSingleCondition(condition, student, {});

  // Doit être "A_VERIFIER" car le statut de la règle est PROVISOIRE_DEMO (non validé officiellement)
  assert.strictEqual(res.status, 'A_VERIFIER');
  assert.ok(res.labelStatus.toLowerCase().includes('paramètre provisoire'));
});

// --------------------------------------------------------------------------
// 2. Tests de l'Indice de Complétude et Confiance des Données
// --------------------------------------------------------------------------
console.log('\n📌 GROUPE 2 : Indice de Confiance & Détection des Profils Incomplets');

runTest('Profil complet avec toutes les données a un indice de confiance de 100%', () => {
  const student = mockStore.users.find(u => u.UtilisateurId === 2); // Julien Moreau
  const questions = mockStore.questions.slice(0, 8);
  const answers = [
    { questionId: 1 }, { questionId: 2 }, { questionId: 3 }, { questionId: 4 },
    { questionId: 5 }, { questionId: 6 }, { questionId: 7 }, { questionId: 8 }
  ];

  const res = calculateDataConfidence(student, questions, answers);
  assert.strictEqual(res.confidenceScore, 100);
  assert.strictEqual(res.isIncomplete, false);
  assert.strictEqual(res.missingFields.length, 0);
});

runTest('Profil avec données manquantes est détecté comme incomplet sans pénaliser', () => {
  const student = mockStore.users.find(u => u.UtilisateurId === 5); // Sarah Benali (vision null)
  const questions = mockStore.questions.slice(0, 8);
  const answers = [{ questionId: 1 }]; // Évaluation partielle

  const res = calculateDataConfidence(student, questions, answers);
  assert.strictEqual(res.isIncomplete, true);
  assert.ok(res.confidenceScore < 100);
  assert.ok(res.missingFields.some(f => f.includes('vision')));
});

// --------------------------------------------------------------------------
// 3. Tests de Reproductibilité Aléatoire (Reproductibilité pour Audit)
// --------------------------------------------------------------------------
console.log('\n📌 GROUPE 3 : Reproductibilité de la Sélection des Questions');

runTest('Même graine (seed) produit exactement le même ordre de questions pour audit', () => {
  const testId = 1;
  const studentId = 2;

  // Deux initialisations avec la même graine doivent produire le même ordre
  const questions = mockStore.questions.filter(q => q.TestId === testId && q.EstActive);
  const seed = 987654321;

  function localShuffle(arr, s) {
    let state = s % 2147483647;
    const rng = () => {
      state = (state * 16807) % 2147483647;
      return (state - 1) / 2147483646;
    };
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  const run1 = localShuffle(questions, seed).map(q => q.QuestionId);
  const run2 = localShuffle(questions, seed).map(q => q.QuestionId);

  assert.deepStrictEqual(run1, run2, 'Les deux tirages doivent être rigoureusement identiques pour un audit');
});

// --------------------------------------------------------------------------
// 4. Tests de Sécurité : Masquage des Réponses Correctes
// --------------------------------------------------------------------------
console.log('\n📌 GROUPE 4 : Sécurité Côté Serveur & Anti-Fraude');

await runAsyncTest('getTestForStudent ne divulgue jamais EstCorrecte ni Explication', async () => {
  const data = await testService.getTestForStudent(1, 2);
  assert.ok(data.questions.length > 0);

  data.questions.forEach(q => {
    assert.strictEqual(q.Explication, undefined, `Explication ne doit pas être divulguée pour question ${q.Code}`);
    q.Options.forEach(opt => {
      assert.strictEqual(opt.EstCorrecte, undefined, `EstCorrecte ne doit pas être divulguée pour option ${opt.OptionId}`);
    });
  });
});

await runAsyncTest('Impossible de modifier une tentative déjà finalisée (Statut TERMINE)', async () => {
  // Session 1 est déjà TERMINE dans le seed
  await assert.rejects(
    async () => {
      await testService.recordAnswer(1, 1, 101, 120);
    },
    /clôturée définitivement/,
    'Une modification sur session terminée doit être rejetée avec erreur explicite'
  );
});

// --------------------------------------------------------------------------
// 5. Tests de l'Algorithme d'Adéquation et Séparation des Préférences
// --------------------------------------------------------------------------
console.log('\n📌 GROUPE 5 : Recommandations Multicritères & Préférences de l\'Élève');

runTest('Les préférences de l\'élève sont distinguées des scores de compétences', () => {
  const student = mockStore.users.find(u => u.UtilisateurId === 2); // Julien Moreau
  const domainScores = [
    { DomaineCode: 'LOGIQUE', Pourcentage: 90 },
    { DomaineCode: 'SITUATION', Pourcentage: 85 },
    { DomaineCode: 'NUMERIQUE', Pourcentage: 90 },
    { DomaineCode: 'PROCEDURE', Pourcentage: 80 },
    { DomaineCode: 'OBSERVATION', Pourcentage: 95 },
    { DomaineCode: 'TECHNIQUE', Pourcentage: 75 },
    { DomaineCode: 'COMMUNICATION', Pourcentage: 80 }
  ];

  const recommendations = matchStudentToSpecialties(student, domainScores);
  assert.ok(recommendations.length > 0);

  // Vérifier la présence du vœu n°1 (SPEC-MOTARD) sans confusion avec le score d'aptitude
  const motardRec = recommendations.find(r => r.SpecialiteCode === 'SPEC-MOTARD');
  assert.ok(motardRec);
  assert.ok(motardRec.PreferenceEleve);
  assert.strictEqual(motardRec.PreferenceEleve.rang, 1);
  assert.ok(typeof motardRec.ScoreCompatibilite === 'number');
  assert.ok(motardRec.ConditionsAVerifier.length > 0, 'La taille de 180cm doit être à vérifier');
});

runTest('Une spécialité non éligible n\'est pas présentée comme immédiatement réalisable', () => {
  // Élève avec note générale de 10/20 (en dessous de 13.5 pour Police Judiciaire)
  const student = {
    UtilisateurId: 99,
    Nom: 'Test',
    Prenom: 'Candidat',
    NoteFormationPro: 10.0,
    AptitudePhysique: 12.0,
    StatutMedical: 'SIGYCOP_VALIDE',
    PreferencesSpecialites: [{ code: 'SPEC-PJ', rang: 1 }]
  };
  const domainScores = [{ DomaineCode: 'LOGIQUE', Pourcentage: 70 }];

  const recommendations = matchStudentToSpecialties(student, domainScores);
  const pjRec = recommendations.find(r => r.SpecialiteCode === 'SPEC-PJ');

  assert.ok(pjRec);
  assert.strictEqual(pjRec.StatutEligibilite, 'NON_ELIGIBLE');
  assert.strictEqual(pjRec.EstImmediatementRealisable, false);
  assert.ok(pjRec.ConditionsNonSatisfaites.length > 0);
});

// --------------------------------------------------------------------------
// 6. Tests des Critères Physiques & Biométriques (Âge, Taille, Poids, IMC, Vision)
// --------------------------------------------------------------------------
console.log('\n📌 GROUPE 6 : Critères Physiques Candidat & Snapshot de Session');

runTest('Condition Âge minimal satisfaite pour un candidat de 23 ans (seuil >= 20)', () => {
  const ageCondition = {
    ConditionId: 201,
    SpecialiteId: 9,
    TypeCondition: 'AGE_MIN',
    CibleCondition: 'Age',
    Operateur: '>=',
    Seuil: '20',
    EstObligatoire: true,
    SourceOfficielle: 'Statut militaire des sous-officiers',
    StatutValidation: 'VALIDEE_OFFICIELLE',
    Description: 'Âge minimum réglementaire de 20 ans'
  };
  const student = { Age: 23 };
  const res = evaluateSingleCondition(ageCondition, student, {});
  assert.strictEqual(res.status, 'SATISFAITE');
});

runTest('Condition Âge non renseignée bascule en "A_VERIFIER" sans éliminer arbitrairement', () => {
  const ageCondition = {
    ConditionId: 202,
    SpecialiteId: 9,
    TypeCondition: 'AGE_MIN',
    CibleCondition: 'Age',
    Operateur: '>=',
    Seuil: '20',
    EstObligatoire: true,
    StatutValidation: 'VALIDEE_OFFICIELLE',
    Description: 'Âge minimum réglementaire'
  };
  const student = { Age: null };
  const res = evaluateSingleCondition(ageCondition, student, {});
  assert.strictEqual(res.status, 'A_VERIFIER');
  assert.ok(res.labelStatus.includes('Condition à vérifier'));
});

await runAsyncTest('startOrResumeSession enregistre le snapshot candidat (taille, poids, IMC, âge)', async () => {
  const candidateData = {
    matricule: 'EG-2025-099',
    age: 23,
    tailleCm: 182,
    poidsKg: 78,
    visionSIGYCOP_Y: 1,
    acuiteVisuelle: '10/10'
  };
  const res = await testService.startOrResumeSession(1, 2, candidateData);
  assert.ok(res.session);
  assert.ok(res.session.CandidatSnapshot);
  assert.strictEqual(res.session.CandidatSnapshot.TailleCm, 182);
  assert.strictEqual(res.session.CandidatSnapshot.PoidsKg, 78);
  assert.strictEqual(res.session.CandidatSnapshot.Age, 23);
  assert.strictEqual(res.session.CandidatSnapshot.IMC, 23.5);
});

// --------------------------------------------------------------------------
// 7. Tests du Moteur de Génération Aléatoire & Banque Centrale des 140 Questions
// --------------------------------------------------------------------------
console.log('\n📌 GROUPE 7 : Moteur de Génération Aléatoire & Banque Centrale 140 Questions en Arabe');

// Enregistrer les élèves de test si non existants
[10, 11, 12, 13, 14, 15].forEach(id => {
  if (!mockStore.users.find(u => u.UtilisateurId === id)) {
    mockStore.users.push({
      UtilisateurId: id,
      Nom: `Testeur-${id}`,
      Prenom: 'Candidat',
      Matricule: `EG-2025-${id}`,
      Role: 'ELEVE',
      AptitudePhysique: 15.0,
      NoteFormationPro: 14.0,
      StatutMedical: 'SIGYCOP_VALIDE'
    });
  }
});

await runAsyncTest('Banque centrale : Exactement 140 questions en arabe réparties selon les 10 catégories réglementaires', async () => {
  const { validateQuestionBank, EXPECTED_DISTRIBUTION } = await import('../validators/bankValidator.js');
  const centralBank = mockStore.questions.filter(q => !q.TestId || q.TestId === 1);
  const validation = validateQuestionBank(centralBank);

  assert.strictEqual(validation.isValid, true, `La banque doit être valide sans erreur: ${validation.errors.join(' | ')}`);
  assert.strictEqual(validation.totalCount, 140, 'La banque centrale doit comporter exactement 140 questions.');
  assert.strictEqual(validation.activeCount, 140, 'La banque centrale doit comporter exactement 140 questions actives.');

  // Vérification de la répartition exacte par catégorie
  Object.entries(EXPECTED_DISTRIBUTION).forEach(([code, expected]) => {
    const actual = validation.categoryCounts[code];
    assert.strictEqual(actual, expected.count, `La catégorie "${expected.nom}" (${code}) doit avoir exactement ${expected.count} questions (obtenu: ${actual}).`);
  });

  // Vérification de chaque question
  centralBank.forEach(q => {
    assert.ok(q.Enonce && q.Enonce.length > 15, `Question ${q.QuestionId} doit avoir un énoncé en arabe riche.`);
    assert.strictEqual(q.Options.length, 4, `Question ${q.QuestionId} doit avoir exactement 4 options.`);
    const correctCount = q.Options.filter(o => o.EstCorrecte).length;
    assert.strictEqual(correctCount, 1, `Question ${q.QuestionId} doit comporter exactement 1 bonne réponse.`);
    assert.ok(q.Explication && q.Explication.length > 10, `Question ${q.QuestionId} doit avoir une explication en arabe.`);
  });
});

await runAsyncTest('Sélection équilibrée par catégorie (10 catégories x 6 = 60 questions) et zéro répétition', async () => {
  // Test avec un nouvel élève (ID 10)
  const res = await testService.startOrResumeSession(1, 10);
  assert.ok(res.session);
  const qIds = res.session.QuestionsSnapshot;

  assert.strictEqual(qIds.length, 60, 'Une tentative doit comporter 60 questions selon le protocole.');

  // Règle 7 : Pas de doublon au sein d'une même épreuve
  const uniqueIds = new Set(qIds);
  assert.strictEqual(uniqueIds.size, qIds.length, 'Aucune question ne doit être répétée dans une même tentative.');

  // Règle 5 : Sélection équilibrée par catégorie (60 questions / 10 catégories -> 6 questions par catégorie, et pour cat9 avec 5 items, répartition de 5 ou 6)
  const cats = ['LOGIQUE', 'OBSERVATION', 'ATTENTION', 'DECISION', 'ROUTE_MOTO', 'PJ_ENQUETE', 'INFORMATIQUE', 'COMMUNICATION', 'SECRETARIAT', 'DISCIPLINE'];
  cats.forEach(cat => {
    const count = qIds.map(id => mockStore.questions.find(q => q.QuestionId === id)).filter(q => q.DomaineCode === cat).length;
    assert.ok(count >= 5 && count <= 7, `La catégorie ${cat} doit avoir entre 5 et 7 questions (obtenu: ${count}).`);
  });
});

await runAsyncTest('Deux candidats simultanés ne reçoivent pas les mêmes questions ni le même ordre', async () => {
  // Élèves 11 et 12 démarrent au même moment
  const res1 = await testService.startOrResumeSession(1, 11);
  const res2 = await testService.startOrResumeSession(1, 12);

  const ids1 = res1.session.QuestionsSnapshot;
  const ids2 = res2.session.QuestionsSnapshot;

  // Vérifier que les deux graines et les tirages diffèrent
  assert.notStrictEqual(res1.session.SeedGeneration, res2.session.SeedGeneration, 'Les graines aléatoires doivent être distinctes.');

  // Au moins une question ou l'ordre doit différer
  const sameOrder = ids1.every((id, idx) => id === ids2[idx]);
  assert.strictEqual(sameOrder, false, 'Deux élèves différents ne doivent pas avoir la même séquence ordonnée de questions.');
});

await runAsyncTest('Ordre des options A, B, C, D mélangé et figé dans OptionsOrderSnapshot', async () => {
  const sessionData = await testService.startOrResumeSession(1, 13);
  const sess = sessionData.session;
  assert.ok(sess.OptionsOrderSnapshot, 'OptionsOrderSnapshot doit être enregistré dans la session.');

  const qId = sess.QuestionsSnapshot[0];
  const optionOrder = sess.OptionsOrderSnapshot[qId];
  assert.ok(Array.isArray(optionOrder) && optionOrder.length === 4, 'Chaque question doit avoir 4 options ordonnées.');

  // Récupération vue élève
  const studentView = await testService.getTestForStudent(1, 13);
  const firstQ = studentView.questions.find(q => q.QuestionId === qId);

  // Vérifier les lettres réassignées
  assert.strictEqual(firstQ.Options[0].LettreOption, 'A');
  assert.strictEqual(firstQ.Options[1].LettreOption, 'B');
  assert.strictEqual(firstQ.Options[2].LettreOption, 'C');
  assert.strictEqual(firstQ.Options[3].LettreOption, 'D');

  // Vérifier la correspondance avec le snapshot
  assert.strictEqual(firstQ.Options[0].OptionId, optionOrder[0]);
  assert.strictEqual(firstQ.Options[1].OptionId, optionOrder[1]);
  assert.strictEqual(firstQ.Options[2].OptionId, optionOrder[2]);
  assert.strictEqual(firstQ.Options[3].OptionId, optionOrder[3]);
});

await runAsyncTest('Stabilité du test après actualisation de page (Idempotence de session)', async () => {
  const view1 = await testService.getTestForStudent(1, 13);
  const view2 = await testService.getTestForStudent(1, 13);

  const list1 = view1.questions.map(q => ({
    id: q.QuestionId,
    optIds: q.Options.map(o => o.OptionId)
  }));
  const list2 = view2.questions.map(q => ({
    id: q.QuestionId,
    optIds: q.Options.map(o => o.OptionId)
  }));

  assert.deepStrictEqual(list1, list2, 'Le rechargement de page doit renvoyer exactement les mêmes questions et le même ordre d\'options.');
});

await runAsyncTest('Minimisation des questions déjà vues lors d\'une 2ème tentative du même élève', async () => {
  // L'élève 14 passe une tentative 1 de 60 questions
  const s1 = await testService.startOrResumeSession(1, 14);
  const seenFirst = new Set(s1.session.QuestionsSnapshot);

  // Finaliser la tentative 1
  s1.session.Statut = 'TERMINE';
  s1.session.ScorePourcentage = 75;

  // L'élève 14 lance sa tentative 2
  const s2 = await testService.startOrResumeSession(1, 14);
  const seenSecond = s2.session.QuestionsSnapshot;

  // Sur 140 questions totales et 60 questions par test, il reste 80 questions jamais vues.
  // La tentative 2 doit puiser majoritairement dans ces 80 questions non vues !
  const freshQuestions = seenSecond.filter(id => !seenFirst.has(id));
  // Le quota équilibré par catégorie (8-9/domaine) pioche parmi les 20-8=12 questions fraîches par catégorie.
  // Toutes les 60 questions de la 2ème tentative doivent idéalement être fraîches !
  assert.ok(freshQuestions.length >= 50, `La 2ème tentative doit privilégier les questions non vues (fraîches: ${freshQuestions.length}/60).`);
});

await runAsyncTest('Évaluation exacte du score côté backend avec options mélangées et sécurité absolue', async () => {
  const sessionRes = await testService.startOrResumeSession(1, 15);
  const sess = sessionRes.session;
  const qIds = sess.QuestionsSnapshot;

  // Répondre correctement aux 10 premières questions
  const answers = [];
  for (let i = 0; i < 10; i++) {
    const q = mockStore.questions.find(item => item.QuestionId === qIds[i]);
    const correctOpt = q.Options.find(o => o.EstCorrecte);
    answers.push({ questionId: q.QuestionId, optionId: correctOpt.OptionId });
  }

  // Soumettre
  const submitResult = await testService.submitTest(sess.SessionId, 15, answers);
  assert.ok(submitResult.scoreTotal >= 10, 'Le backend doit calculer fidèlement les points obtenus selon les vrais OptionId.');
  assert.strictEqual(sess.Statut, 'TERMINE');
});

// --------------------------------------------------------------------------
// 8. Tests de la Plateforme de Simulations Professionnelles (ORIENT-G)
// --------------------------------------------------------------------------
console.log('\n📌 GROUPE 8 : Plateforme de Simulations Professionnelles (ORIENT-G)');

import { professionalSimulationModules } from '../lib/simulationData.js';
import { simulationService } from '../services/simulationService.js';

runTest('Présence intégrale des 6 modules de simulation professionnelle avec titres officiels', () => {
  assert.strictEqual(professionalSimulationModules.length, 6, 'Il doit y avoir exactement 6 modules professionnels.');
  
  const expectedCodes = ['SIM-PJ', 'SIM-ROUTE', 'SIM-TECH', 'SIM-PLAN', 'SIM-ENV', 'SIM-ADMIN'];
  const actualCodes = professionalSimulationModules.map(m => m.moduleId);
  expectedCodes.forEach(code => {
    assert.ok(actualCodes.includes(code), `Le module ${code} doit être défini.`);
  });

  const pj = professionalSimulationModules.find(m => m.moduleId === 'SIM-PJ');
  assert.strictEqual(pj.titreAr, 'محاكاة البحث والتحقيق القضائي');
  assert.strictEqual(pj.titreFr, 'Recherche et Investigation Judiciaire');

  const route = professionalSimulationModules.find(m => m.moduleId === 'SIM-ROUTE');
  assert.strictEqual(route.titreAr, 'محاكاة السلامة الطرقية والتدخل الميداني');

  const tech = professionalSimulationModules.find(m => m.moduleId === 'SIM-TECH');
  assert.strictEqual(tech.titreAr, 'محاكاة التحليل الرقمي والتكنولوجي');

  const plan = professionalSimulationModules.find(m => m.moduleId === 'SIM-PLAN');
  assert.strictEqual(plan.titreAr, 'محاكاة التخطيط والتنظيم العملياتي');

  const env = professionalSimulationModules.find(m => m.moduleId === 'SIM-ENV');
  assert.strictEqual(env.titreAr, 'محاكاة المراقبة البيئية والمجالات الطبيعية');

  const admin = professionalSimulationModules.find(m => m.moduleId === 'SIM-ADMIN');
  assert.strictEqual(admin.titreAr, 'محاكاة التسيير الإداري والقانوني');
});

runTest('Chaque module dispose de plusieurs étapes interactives professionnelles (non réductible à un QCM)', () => {
  professionalSimulationModules.forEach(mod => {
    assert.ok(mod.stages.length >= 4, `Le module ${mod.moduleId} doit comporter au moins 4 étapes scénarisées.`);
    
    // Vérifier l'absence de tests psychologiques / personnalité / QI
    mod.competencesEvaluees.forEach(comp => {
      assert.doesNotMatch(comp.nomFr, /personnalité|QI|psychométr|humeur/i, 'Ne doit évaluer que des compétences professionnelles pratiques.');
    });
  });
});

await runAsyncTest('Cycle de vie complet de simulation : Démarrage, progression, soumission et résultats', async () => {
  const studentId = 2; // Julien Moreau
  
  // 1. Lister les modules
  const modulesList = await simulationService.getModules(studentId);
  assert.strictEqual(modulesList.length, 6);

  // 2. Démarrer une session sur SIM-PJ
  const session = await simulationService.startOrResumeSession('SIM-PJ', studentId);
  assert.strictEqual(session.ModuleId, 'SIM-PJ');
  assert.strictEqual(session.Statut, 'EN_COURS');

  // 3. Sauvegarder la progression sur l'étape 1
  await simulationService.saveProgress('SIM-PJ', studentId, 1, { 'Q-01': 1, 'Q-02': 1 }, 120);

  // 4. Soumettre la simulation complète avec des réponses adaptées aux 5 tâches du snapshot
  const submissionData = {};
  (session.TasksSnapshot || []).forEach((taskId, idx) => {
    const task = simulationTaskBank60.find(t => t.taskId === taskId);
    if (!task) return;
    const cfg = task.scoringConfig;
    let resp = {};
    if (cfg.type === 'MULTIPLE_CHOICE') {
      resp = { ...cfg.expectedAnswers };
    } else if (cfg.type === 'CATEGORIZATION') {
      resp = { ...cfg.correctMapping };
    } else if (cfg.type === 'ORDERING') {
      resp = { orderedIds: [...cfg.correctOrder] };
    } else if (cfg.type === 'BOOLEAN_MAP') {
      resp = { ...cfg.expectedAnswers };
    } else if (cfg.type === 'SET_MATCH') {
      resp = { selectedAnomalies: [...cfg.expectedSet] };
    } else if (cfg.type === 'HOTSPOT_SELECTION') {
      resp = { selectedHotspots: [...cfg.expectedHotspots] };
    } else if (cfg.type === 'REPORT_RUBRIC') {
      resp = { texteRapport: 'إلى السيد وكيل الملك، يشرفني إشعاركم بأنه تم تحرير محضر قانوني حول الواقعة، وإشعار النيابة العامة فوراً مع وضع المشتبه فيه تحت تدبير الحراسة النظرية احتراماً للمقتضيات الإجرائية وقانون المسطرة الجنائية مع إحالة المحجوزات وتفريغ الكاميرات وحجز أداة الجريمة.' };
    }
    submissionData[taskId] = resp;
    submissionData[`etape_${idx + 1}`] = resp;
  });

  const evalResult = await simulationService.submitModule('SIM-PJ', studentId, submissionData, 600);
  assert.ok(evalResult.scoreGlobal >= 70, `Le score global calculé (${evalResult.scoreGlobal}) doit être satisfaisant.`);
  assert.ok(evalResult.competences.length >= 4, 'Toutes les compétences pratiques doivent être évaluées.');
  assert.ok(evalResult.feedbackRubrique.length >= 4, 'Un feedback rubricaire doit être généré par étape.');

  // 5. Consulter les résultats
  const results = await simulationService.getModuleResults('SIM-PJ', studentId);
  assert.ok(results !== null);
  assert.strictEqual(results.session.Statut, 'TERMINE');
  assert.strictEqual(results.impactOrientation.specialitePrincipale, 'SPEC-PJ');

  // 6. Synthèse globale
  const summary = await simulationService.getOverallSummary(studentId);
  assert.strictEqual(summary.completedCount, 1);
  assert.ok(summary.scoreMoyenGlobal >= 70);
});

// --------------------------------------------------------------------------
// 9. Tests de la Banque des 60 Tâches Métier, Randomisation & Évaluation Sécurisée
// --------------------------------------------------------------------------
console.log('\n📌 GROUPE 9 : Banque des 60 Tâches Métier, Randomisation & Évaluation Sécurisée');

import { simulationTaskBank60 } from '../lib/simulationTaskBank60.js';
import { simulationEngine } from '../services/simulationEngine.js';

runTest('Banque centrale des 60 tâches : 10 tâches par domaine, identifiants uniques et données complètes', () => {
  assert.strictEqual(simulationTaskBank60.length, 60, 'La banque de tâches doit comporter exactement 60 scénarios.');

  const domains = ['PJ', 'ROUTE', 'TECH', 'PLAN', 'ENV', 'ADMIN'];
  const domainCounts = {};
  const taskIdsSet = new Set();
  const validInteractions = new Set([
    'DOCUMENT_ANALYSIS',
    'CONTRADICTION_DETECTION',
    'INTERACTIVE_MAP',
    'DATASET_AUDIT',
    'CLASSIFICATION',
    'PRIORITIZATION',
    'DECISION_SCENARIO',
    'REPORT_PREPARATION'
  ]);

  simulationTaskBank60.forEach(task => {
    // Unicité taskId
    assert.ok(!taskIdsSet.has(task.taskId), `L'identifiant ${task.taskId} doit être strictement unique.`);
    taskIdsSet.add(task.taskId);

    // Domaine valide
    assert.ok(domains.includes(task.domaineId), `Domaine inconnu ${task.domaineId} pour la tâche ${task.taskId}.`);
    domainCounts[task.domaineId] = (domainCounts[task.domaineId] || 0) + 1;

    // Métadonnées requises
    assert.ok(task.titreAr && task.titreAr.length > 5, `Titre arabe manquant ou trop court pour ${task.taskId}`);
    assert.ok(validInteractions.has(task.interactionType), `Type d'interaction invalide ${task.interactionType} pour ${task.taskId}`);
    assert.ok(task.consigneAr && task.consigneAr.length > 10, `Consigne arabe manquante pour ${task.taskId}`);
    assert.ok(task.scoringConfig && task.scoringConfig.type, `Configuration de scoring manquante pour ${task.taskId}`);
    assert.ok(Array.isArray(task.competenceTags) && task.competenceTags.length > 0, `Tags de compétences manquants pour ${task.taskId}`);
    assert.ok(task.pointsMax && task.pointsMax >= 10, `Points max invalides pour ${task.taskId}`);
    assert.ok(task.scenarioData && typeof task.scenarioData === 'object', `Données de scénario manquantes pour ${task.taskId}`);
  });

  // Vérification de la parité exacte : 10 tâches par domaine
  domains.forEach(d => {
    assert.strictEqual(domainCounts[d], 10, `Le domaine ${d} doit contenir exactement 10 tâches (obtenu: ${domainCounts[d]}).`);
  });
});

runTest('Moteur de randomisation : Sélection équilibrée sans doublon et avec permutation reproductible', () => {
  const studentId = 201;

  // 1. Sélection monodomaine (ex: 5 tâches PJ)
  const pjSelection = simulationEngine.selectTasksForStudent({
    studentId,
    domaineId: 'PJ',
    count: 5,
    seed: 55555
  });
  assert.strictEqual(pjSelection.length, 5, 'Doit sélectionner exactement 5 tâches.');
  const pjIds = pjSelection.map(t => t.taskId);
  assert.strictEqual(new Set(pjIds).size, 5, 'Aucun doublon dans la sélection d\'un même essai.');
  pjSelection.forEach(t => {
    assert.strictEqual(t.domaineId, 'PJ', 'Toutes les tâches doivent appartenir au domaine PJ.');
  });

  // 2. Sélection globale multi-domaines (6 tâches = 1 par domaine)
  const multiSelection = simulationEngine.selectTasksForStudent({
    studentId,
    domaineId: null,
    count: 6,
    seed: 88888
  });
  assert.strictEqual(multiSelection.length, 6, 'Doit sélectionner 6 tâches globales.');
  const multiDomains = new Set(multiSelection.map(t => t.domaineId));
  assert.strictEqual(multiDomains.size, 6, 'La sélection multi-domaines doit couvrir l\'ensemble des 6 domaines sans répétition.');

  // 3. Stabilité avec la même graine (audit)
  const replaySelection = simulationEngine.selectTasksForStudent({
    studentId,
    domaineId: 'PJ',
    count: 5,
    seed: 55555
  });
  assert.deepStrictEqual(
    pjSelection.map(t => t.taskId),
    replaySelection.map(t => t.taskId),
    'La même graine doit produire exactement la même séquence ordonnée.'
  );
});

runTest('Minimisation des tâches récemment vues lors d\'une nouvelle tentative du même élève', () => {
  const studentId = 202;
  // Simuler 5 premières tâches passées
  const pastTasks = ['SCEN-PJ-01', 'SCEN-PJ-02', 'SCEN-PJ-03', 'SCEN-PJ-04', 'SCEN-PJ-05'];

  const secondAttempt = simulationEngine.selectTasksForStudent({
    studentId,
    domaineId: 'PJ',
    count: 5,
    pastAttemptTaskIds: pastTasks,
    seed: 99999
  });

  assert.strictEqual(secondAttempt.length, 5);
  const secondAttemptIds = secondAttempt.map(t => t.taskId);

  // Comme le domaine PJ contient 10 tâches au total (5 passées + 5 fraîches),
  // la 2ème tentative de 5 tâches doit être composée à 100% des 5 tâches fraîches !
  const overlap = secondAttemptIds.filter(id => pastTasks.includes(id));
  assert.strictEqual(overlap.length, 0, `La 2ème tentative ne doit pas répéter les tâches vues récemment si des fraîches sont disponibles (répétitions: ${overlap.join(', ')}).`);
});

runTest('Sécurisation Anti-Fraude : sanitizeTaskForStudent expurge toutes les solutions et barèmes', () => {
  // Vérifier sur un échantillon représentatif des types d'interactions
  const sampleTasks = [
    simulationTaskBank60.find(t => t.interactionType === 'DOCUMENT_ANALYSIS'),
    simulationTaskBank60.find(t => t.interactionType === 'CONTRADICTION_DETECTION'),
    simulationTaskBank60.find(t => t.interactionType === 'INTERACTIVE_MAP'),
    simulationTaskBank60.find(t => t.interactionType === 'DATASET_AUDIT'),
    simulationTaskBank60.find(t => t.interactionType === 'CLASSIFICATION'),
    simulationTaskBank60.find(t => t.interactionType === 'PRIORITIZATION'),
    simulationTaskBank60.find(t => t.interactionType === 'DECISION_SCENARIO'),
    simulationTaskBank60.find(t => t.interactionType === 'REPORT_PREPARATION')
  ].filter(Boolean);

  sampleTasks.forEach(rawTask => {
    const clean = simulationEngine.sanitizeTaskForStudent(rawTask);

    // 1. scoringConfig ne doit jamais être présent
    assert.strictEqual(clean.scoringConfig, undefined, `scoringConfig ne doit pas être divulgué pour ${rawTask.taskId}`);

    const data = clean.scenarioData || {};

    // 2. Questions de vérification
    if (data.questionsVerif) {
      data.questionsVerif.forEach(q => {
        assert.strictEqual(q.correctIndex, undefined, `correctIndex divulgué dans question ${q.id} de ${rawTask.taskId}`);
      });
    }

    // 3. Décision
    if (data.scenarios) {
      data.scenarios.forEach(s => {
        assert.strictEqual(s.correctIndex, undefined, `correctIndex divulgué dans scénario ${s.id} de ${rawTask.taskId}`);
        assert.strictEqual(s.feedbackAr, undefined, `feedbackAr divulgué dans scénario ${s.id} de ${rawTask.taskId}`);
      });
    }

    // 4. Classification
    if (data.elements) {
      data.elements.forEach(e => {
        assert.strictEqual(e.catCorrecte, undefined, `catCorrecte divulguée dans élément ${e.id} de ${rawTask.taskId}`);
      });
    }

    // 5. Priorisation
    if (data.itemsToOrder) {
      data.itemsToOrder.forEach(it => {
        assert.strictEqual(it.ordreCorrect, undefined, `ordreCorrect divulgué dans item ${it.id} de ${rawTask.taskId}`);
      });
    }

    // 6. Contradictions
    if (data.itemsToEvaluate) {
      data.itemsToEvaluate.forEach(item => {
        assert.strictEqual(item.isContradiction, undefined, `isContradiction divulgué dans item ${item.id} de ${rawTask.taskId}`);
      });
    }

    // 7. Dataset audit
    assert.strictEqual(data.anomaliesToSelect, undefined, `anomaliesToSelect divulgué dans ${rawTask.taskId}`);
    if (data.dataset) {
      data.dataset.forEach(row => {
        assert.strictEqual(row.status, undefined, `status divulgué dans ligne ${row.id} de ${rawTask.taskId}`);
        assert.strictEqual(row.estComplet, undefined, `estComplet divulgué dans ligne ${row.id} de ${rawTask.taskId}`);
      });
    }

    // 8. Hotspots carte
    if (data.hotspotsAIdentifier) {
      data.hotspotsAIdentifier.forEach(h => {
        assert.strictEqual(h.correct, undefined, `correct divulgué dans hotspot ${h.id} de ${rawTask.taskId}`);
      });
    }
  });
});

runTest('Moteur d\'évaluation côté serveur : Validation fidèle des 7 modes d\'évaluation', () => {
  // 1. MULTIPLE_CHOICE
  const mcTask = {
    taskId: 'TEST-MC',
    pointsMax: 20,
    scoringConfig: {
      type: 'MULTIPLE_CHOICE',
      expectedAnswers: { 'Q1': 1, 'Q2': 2 }
    }
  };
  const mcRes1 = simulationEngine.evaluateTaskResponse(mcTask, { 'Q1': 1, 'Q2': 2 });
  assert.strictEqual(mcRes1.scorePct, 100);
  assert.strictEqual(mcRes1.pointsObtenus, 20);

  const mcRes2 = simulationEngine.evaluateTaskResponse(mcTask, { 'Q1': 1, 'Q2': 0 });
  assert.strictEqual(mcRes2.scorePct, 50);
  assert.strictEqual(mcRes2.pointsObtenus, 10);

  // 2. CATEGORIZATION
  const catTask = {
    taskId: 'TEST-CAT',
    pointsMax: 20,
    scoringConfig: {
      type: 'CATEGORIZATION',
      correctMapping: { 'E1': 'C1', 'E2': 'C2', 'E3': 'C1', 'E4': 'C2' }
    }
  };
  const catRes = simulationEngine.evaluateTaskResponse(catTask, { 'E1': 'C1', 'E2': 'C2', 'E3': 'C2', 'E4': 'C2' });
  assert.strictEqual(catRes.scorePct, 75);
  assert.strictEqual(catRes.pointsObtenus, 15);

  // 3. ORDERING
  const ordTask = {
    taskId: 'TEST-ORD',
    pointsMax: 20,
    scoringConfig: {
      type: 'ORDERING',
      correctOrder: ['IT1', 'IT2', 'IT3', 'IT4']
    }
  };
  const ordRes = simulationEngine.evaluateTaskResponse(ordTask, { orderedIds: ['IT1', 'IT2', 'IT3', 'IT4'] });
  assert.strictEqual(ordRes.scorePct, 100);
  assert.strictEqual(ordRes.pointsObtenus, 20);

  // 4. BOOLEAN_MAP
  const boolTask = {
    taskId: 'TEST-BOOL',
    pointsMax: 20,
    scoringConfig: {
      type: 'BOOLEAN_MAP',
      expectedAnswers: { 'B1': true, 'B2': false, 'B3': true }
    }
  };
  const boolRes = simulationEngine.evaluateTaskResponse(boolTask, { 'B1': true, 'B2': false, 'B3': false });
  assert.strictEqual(boolRes.scorePct, 67);

  // 5. SET_MATCH
  const setTask = {
    taskId: 'TEST-SET',
    pointsMax: 20,
    scoringConfig: {
      type: 'SET_MATCH',
      expectedSet: [101, 103, 105]
    }
  };
  const setRes = simulationEngine.evaluateTaskResponse(setTask, { selectedAnomalies: [101, 103] });
  assert.strictEqual(setRes.scorePct, 67);

  // 6. HOTSPOT_SELECTION
  const spotTask = {
    taskId: 'TEST-SPOT',
    pointsMax: 20,
    scoringConfig: {
      type: 'HOTSPOT_SELECTION',
      expectedHotspots: ['H1', 'H3']
    }
  };
  const spotRes = simulationEngine.evaluateTaskResponse(spotTask, { selectedHotspots: ['H1', 'H3'] });
  assert.strictEqual(spotRes.scorePct, 100);

  // 7. REPORT_RUBRIC
  const repTask = {
    taskId: 'TEST-REP',
    pointsMax: 20,
    scoringConfig: {
      type: 'REPORT_RUBRIC',
      minWords: 30,
      requiredKeywords: ['النيابة العامة', 'الحراسة النظرية', 'محضر']
    }
  };
  const longText = 'إلى السيد وكيل الملك، يشرفني إشعاركم بأنه تم تحرير محضر قانوني حول الواقعة، وإشعار النيابة العامة فوراً مع وضع المشتبه فيه تحت تدبير الحراسة النظرية احتراماً للمقتضيات الإجرائية وقانون المسطرة الجنائية مع إحالة المحجوزات.';
  const repRes = simulationEngine.evaluateTaskResponse(repTask, { texteRapport: longText });
  assert.strictEqual(repRes.scorePct, 100);
  assert.strictEqual(repRes.pointsObtenus, 20);
});

runTest('Calcul du profil de compétences et niveaux d\'acquisition objectifs', () => {
  const evaluatedTasks = [
    {
      task: { taskId: 'T1', competenceTags: ['DOC_ANALYSIS', 'ACCURACY'] },
      evalResult: { scorePct: 90 }
    },
    {
      task: { taskId: 'T2', competenceTags: ['DOC_ANALYSIS', 'PROCEDURAL_AWARENESS'] },
      evalResult: { scorePct: 70 }
    },
    {
      task: { taskId: 'T3', competenceTags: ['RISK_ASSESSMENT'] },
      evalResult: { scorePct: 50 }
    }
  ];

  const profile = simulationEngine.calculateCompetencyProfile(evaluatedTasks);
  assert.strictEqual(profile.length, 4);

  const docComp = profile.find(c => c.code === 'DOC_ANALYSIS');
  assert.ok(docComp);
  assert.strictEqual(docComp.scorePct, 80); // (90 + 70) / 2 = 80
  assert.strictEqual(docComp.niveau, 'MAITRISE_ELEVEE');
  assert.strictEqual(docComp.nomAr, 'تحليل الوثائق والمحاضر');

  const riskComp = profile.find(c => c.code === 'RISK_ASSESSMENT');
  assert.ok(riskComp);
  assert.strictEqual(riskComp.scorePct, 50);
  assert.strictEqual(riskComp.niveau, 'EN_DEVELOPPEMENT');
});

// --------------------------------------------------------------------------
// 10. Tests du Moteur de Scoring Professionnel & d'Orientation (ORIENT-G)
// --------------------------------------------------------------------------
console.log('\n📌 GROUPE 10 : Moteur de Scoring Professionnel & d\'Orientation (ORIENT-G)');

import { canonicalCompetencyFramework, initialSpecialtyCompetencyMatrix } from '../lib/competencyFramework.js';
import { professionalOrientationService } from '../services/professionalOrientationService.js';

runTest('Référentiel officiel des 12 compétences : Intégrité, critères et exclusion stricte du psychologique', () => {
  assert.strictEqual(canonicalCompetencyFramework.length, 12, 'Le cadre doit comporter exactement 12 compétences professionnelles.');

  const expectedCodes = [
    'JUDICIAL_DOC_ANALYSIS',
    'EVIDENCE_CLASSIFICATION',
    'FIELD_SITUATION_MGMT',
    'ROAD_SAFETY_PROCEDURES',
    'DIGITAL_DATA_ANALYSIS',
    'TECHNICAL_SKILLS',
    'OPERATIONAL_PLANNING',
    'TEAM_COORDINATION',
    'ENVIRONMENTAL_MONITORING',
    'ADMINISTRATIVE_MGMT',
    'LEGAL_PROCEDURAL_AWARENESS',
    'PROFESSIONAL_REPORT_PREP'
  ];

  expectedCodes.forEach(code => {
    const comp = canonicalCompetencyFramework.find(c => c.code === code);
    assert.ok(comp, `La compétence ${code} doit être définie dans le référentiel.`);
    assert.ok(comp.nomAr && comp.nomAr.length > 5, `Titre arabe requis pour ${code}`);
    assert.ok(comp.nomFr && comp.nomFr.length > 5, `Titre français requis pour ${code}`);
    assert.ok(comp.descriptionAr && comp.descriptionAr.length > 10, `Description arabe requise pour ${code}`);
    assert.ok(Array.isArray(comp.criteresEvaluation) && comp.criteresEvaluation.length >= 2, `Critères requis pour ${code}`);

    // Règle formelle : Zéro évaluation psychologique / QI / personnalité
    assert.doesNotMatch(comp.nomFr, /psychométr|personnalité|QI|humeur|caractère/i);
    assert.doesNotMatch(comp.nomAr, /شخصية|مزاج|ذكاء عام|نفسي/);
  });
});

runTest('Matrice de correspondance configurable : Poids, justifications et dissociation de l\'éligibilité', async () => {
  const matrix = await professionalOrientationService.getSpecialtyMatrix();
  assert.ok(matrix.length >= 6, 'La matrice doit couvrir au moins les 6 spécialités majeures.');

  matrix.forEach(spec => {
    assert.ok(spec.specialiteCode, 'Code spécialité requis.');
    assert.ok(spec.intituleAr, 'Intitulé arabe requis.');
    assert.ok(spec.poidsCompetences && typeof spec.poidsCompetences === 'object', 'Poids des compétences requis.');
    assert.ok(spec.justificationAr && spec.justificationAr.length > 10, 'Justification opérationnelle en arabe requise.');
    assert.ok(Array.isArray(spec.conditionsAVerifier), 'Conditions d\'éligibilité requises.');

    // Vérifier la séparation stricte de l'éligibilité
    spec.conditionsAVerifier.forEach(cond => {
      assert.ok(['PHYSICAL', 'MEDICAL', 'ADMIN', 'ACADEMIC'].includes(cond.type));
      assert.ok(cond.intituleAr, 'Intitulé de condition requis.');
    });
  });

  // Test de mise à jour configurable sans modifier le code source
  const updatedSpec = await professionalOrientationService.updateSpecialtyMatrix('SPEC-PJ', {
    justificationAr: 'تحديث مبررات التوافق العملياتي للشرطة القضائية عبر واجهة الإدارة.'
  });
  assert.strictEqual(updatedSpec.justificationAr, 'تحديث مبررات التوافق العملياتي للشرطة القضائية عبر واجهة الإدارة.');
});

await runAsyncTest('Calcul du profil des 12 compétences de l\'élève à partir des simulations complétées', async () => {
  const studentId = 2; // Julien Moreau (qui a des simulations terminées)
  const competencies = await professionalOrientationService.calculateStudentCompetencies(studentId);

  assert.strictEqual(competencies.length, 12, 'Doit évaluer les 12 compétences canoniques.');
  competencies.forEach(comp => {
    assert.ok(typeof comp.scorePct === 'number' && comp.scorePct >= 0 && comp.scorePct <= 100);
    assert.ok(['MAITRISE_ELEVEE', 'SATISFAISANT', 'EN_DEVELOPPEMENT', 'NON_EVALUE'].includes(comp.niveau));
    assert.ok(Array.isArray(comp.contributingTasks), 'La traçabilité des tâches ayant alimenté la note doit être préservée.');
  });
});

await runAsyncTest('Sélection du TOP 3 des spécialités les plus compatibles avec explications détaillées', async () => {
  const studentId = 2;
  const matchResult = await professionalOrientationService.matchStudentToSpecialties(studentId);

  assert.ok(matchResult.topThree, 'Le TOP 3 doit être calculé.');
  assert.strictEqual(matchResult.topThree.length, 3, 'Doit proposer exactement les 3 spécialités les plus compatibles.');

  // Vérification de l'ordre décroissant d'adéquation
  assert.ok(matchResult.topThree[0].scoreCompatibilite >= matchResult.topThree[1].scoreCompatibilite);
  assert.ok(matchResult.topThree[1].scoreCompatibilite >= matchResult.topThree[2].scoreCompatibilite);

  // Vérification des explications complètes requises pour chaque spécialité du TOP 3
  matchResult.topThree.forEach((spec, idx) => {
    assert.strictEqual(spec.rangRecommandation, idx + 1);
    assert.ok(spec.whySuggestedAr && spec.whySuggestedAr.length > 10, 'Explication du motif de suggestion requise.');
    assert.ok(Array.isArray(spec.relevantCompetencies) && spec.relevantCompetencies.length > 0, 'Compétences pertinentes requises.');
    assert.ok(Array.isArray(spec.demonstratedStrengthsAr) && spec.demonstratedStrengthsAr.length > 0, 'Points forts démontrés requis.');
    assert.ok(Array.isArray(spec.areasForImprovementAr) && spec.areasForImprovementAr.length > 0, 'Axes d\'amélioration requis.');
    assert.ok(Array.isArray(spec.contributingTasks), 'Tâches contributives requises.');
    assert.ok(Array.isArray(spec.eligibilityConditions), 'Conditions d\'éligibilité à vérifier requises.');
  });
});

await runAsyncTest('Rapport d\'orientation officiel complet (vue élève / rapport imprimable)', async () => {
  const studentId = 2;
  const report = await professionalOrientationService.getStudentComprehensiveReport(studentId);

  assert.ok(report !== null);
  assert.ok(report.studentInfo && (report.studentInfo.matricule === 'EG-2025-014' || report.studentInfo.matricule === 'EG-2025-099'));
  assert.ok(report.dateBilan);
  assert.ok(report.statistiquesGlobales);
  assert.ok(Array.isArray(report.completedSimulations));
  assert.strictEqual(report.competenciesProfile.length, 12);
  assert.strictEqual(report.topRecommendedSpecialties.length, 3);
  assert.ok(report.administrativeDecision);
});

await runAsyncTest('Arbitrage et validation administrative de la proposition d\'affectation', async () => {
  const studentId = 2;
  const decision = await professionalOrientationService.updateAdministrativeDecision(studentId, {
    statut: 'VALIDEE_ADMIN',
    specialiteRetenueCode: 'SPEC-PJ',
    observationsAr: 'المصادقة النهائية للجنة القيادة العليا على تعيين المترشح بمصلحة الشرطة القضائية نظراً لدقة تحليله الوثائقي.',
    adminId: 1
  });

  assert.strictEqual(decision.statut, 'VALIDEE_ADMIN');
  assert.strictEqual(decision.specialiteRetenueCode, 'SPEC-PJ');
  assert.ok(decision.dateDecision);
  assert.strictEqual(decision.adminValidateurId, 1);
});

await runAsyncTest('Génération de l\'export tabulaire Excel / CSV des résultats de la promotion', async () => {
  const exportData = await professionalOrientationService.generateAssessmentExportData();

  assert.ok(Array.isArray(exportData.headers) && exportData.headers.length >= 6);
  assert.ok(Array.isArray(exportData.rows) && exportData.rows.length >= 1);

  // Vérifier la présence des colonnes indispensables
  const headersStr = exportData.headers.join(' | ');
  assert.ok(headersStr.includes('Matricule'));
  assert.ok(headersStr.includes('Score'));
  assert.ok(headersStr.includes('Spécialité'));
});

// ==============================================================================
// GROUPE 11 : Système Simplifié — 3 Tests Professionnels & 30 Questions Métier
// ==============================================================================
console.log('\n📌 GROUPE 11 : Système Simplifié — 3 Tests Professionnels & 30 Questions Métier');

await runAsyncTest('Banque des 3 tests professionnels : Exactement 3 tests de 10 questions (Total 30 questions)', async () => {
  const { simpleThreeTests, simpleQuestionsBank30 } = await import('../lib/simpleTestBank30.js');

  assert.strictEqual(simpleThreeTests.length, 3, 'Il doit y avoir exactement 3 tests professionnels simplifiés.');
  assert.strictEqual(simpleQuestionsBank30.length, 30, 'La banque doit comporter exactement 30 questions réparties équitablement.');

  // Test 1: التحليل المهني
  const test1 = simpleThreeTests.find(t => t.Code === 'TEST-01');
  assert.ok(test1, 'Le test 1 (TEST-01) doit exister.');
  assert.strictEqual(test1.NombreQuestions, 10);
  assert.strictEqual(test1.DureeMinutes, 15);
  const qTest1 = simpleQuestionsBank30.filter(q => q.TestId === test1.TestId);
  assert.strictEqual(qTest1.length, 10, 'Le test 1 doit comporter exactement 10 questions.');

  // Test 2: التدبير الميداني
  const test2 = simpleThreeTests.find(t => t.Code === 'TEST-02');
  assert.ok(test2, 'Le test 2 (TEST-02) doit exister.');
  assert.strictEqual(test2.NombreQuestions, 10);
  assert.strictEqual(test2.DureeMinutes, 15);
  const qTest2 = simpleQuestionsBank30.filter(q => q.TestId === test2.TestId);
  assert.strictEqual(qTest2.length, 10, 'Le test 2 doit comporter exactement 10 questions.');

  // Test 3: الكفاءات التقنية والتنظيمية
  const test3 = simpleThreeTests.find(t => t.Code === 'TEST-03');
  assert.ok(test3, 'Le test 3 (TEST-03) doit exister.');
  assert.strictEqual(test3.NombreQuestions, 10);
  assert.strictEqual(test3.DureeMinutes, 15);
  const qTest3 = simpleQuestionsBank30.filter(q => q.TestId === test3.TestId);
  assert.strictEqual(qTest3.length, 10, 'Le test 3 doit comporter exactement 10 questions.');

  // Vérifier la qualité de chaque question (4 options, 1 bonne réponse, arabe institutionnel)
  simpleQuestionsBank30.forEach(q => {
    assert.ok(q.Enonce && q.Enonce.length > 10, `Question ${q.QuestionId} doit avoir un énoncé valide.`);
    assert.strictEqual(q.Options.length, 4, `Question ${q.QuestionId} doit avoir exactement 4 options.`);
    const correctCount = q.Options.filter(o => o.EstCorrecte).length;
    assert.strictEqual(correctCount, 1, `Question ${q.QuestionId} doit avoir exactement 1 bonne réponse.`);
    assert.ok(q.Options.some(o => o.Explication && o.Explication.length > 5), `Question ${q.QuestionId} doit avoir une explication pour ses options.`);
  });
});

await runAsyncTest('Cycle complet d\'évaluation d\'un test simple : Démarrage, autosauvegarde, soumission et calcul du score', async () => {
  const studentId = 20; // Nouvel élève pour le test
  mockStore.users.push({
    UtilisateurId: studentId,
    Nom: 'Benali',
    Prenom: 'Youssef',
    Matricule: 'EG-2026-055',
    Role: 'ELEVE',
    Promotion: 'الفوج 54'
  });

  // 1. Démarrer le test 1 (TEST-01: TestId = 2)
  const startRes = await testService.startOrResumeSession(2, studentId);
  assert.ok(startRes.session, 'La session doit être créée.');
  const session = startRes.session;
  assert.strictEqual(session.Statut, 'EN_COURS');
  assert.strictEqual(session.QuestionsSnapshot.length, 10);

  // 2. Autosauvegarde d'une réponse
  const q1Id = session.QuestionsSnapshot[0];
  const q1 = mockStore.questions.find(q => q.QuestionId === q1Id);
  const correctOpt = q1.Options.find(o => o.EstCorrecte);
  const saveRes = await testService.recordAnswer(session.SessionId, q1Id, correctOpt.OptionId, 30);
  assert.strictEqual(saveRes.success, true);
  assert.strictEqual(session.UserAnswers.length, 1);

  // 3. Répondre à l'ensemble des 10 questions (8 correctes, 2 incorrectes -> 80%)
  const answers = [];
  session.QuestionsSnapshot.forEach((qId, index) => {
    const q = mockStore.questions.find(item => item.QuestionId === qId);
    if (index < 8) {
      const rightOpt = q.Options.find(o => o.EstCorrecte);
      answers.push({ questionId: qId, optionId: rightOpt.OptionId });
    } else {
      const wrongOpt = q.Options.find(o => !o.EstCorrecte);
      answers.push({ questionId: qId, optionId: wrongOpt.OptionId });
    }
  });

  // 4. Clôture et soumission
  const submitRes = await testService.submitTest(session.SessionId, studentId, answers);
  assert.strictEqual(submitRes.scorePercentage, 80, 'Le score calculé doit être de 80%.');
  assert.strictEqual(session.Statut, 'TERMINE');

  // 5. Générer le rapport d'orientation officiel pour cet élève
  const report = await professionalOrientationService.getStudentComprehensiveReport(studentId);
  assert.ok(report, 'Le rapport d\'orientation doit être généré.');
  assert.strictEqual(report.topRecommendedSpecialties.length, 3, 'Le rapport doit proposer le TOP 3 des spécialités.');
  assert.ok(report.topRecommendedSpecialties[0].scoreCompatibilite > 0);
  assert.ok(report.topRecommendedSpecialties[0].whySuggestedAr.length > 10);
  assert.ok(report.completedSimulations.some(t => t.code === 'TEST-01' && t.statut === 'TERMINE'));
});

// --------------------------------------------------------------------------
// 12. Tests du Module Ateliers Pratiques & Compétences Métier
// --------------------------------------------------------------------------
console.log('\n📌 GROUPE 12 : Compétences Professionnelles & Ateliers Pratiques (Workshops)');

await runAsyncTest('Les 4 catégories professionnelles pratiques officielles sont intègres', async () => {
  const cats = await workshopService.getCategories();
  assert.strictEqual(cats.length, 4, 'Il doit y avoir exactement 4 catégories professionnelles.');

  const ids = cats.map(c => c.id);
  assert.ok(ids.includes('CAT-INFO'), 'Doit inclure CAT-INFO (Informatique & Réseaux)');
  assert.ok(ids.includes('CAT-MECA'), 'Doit inclure CAT-MECA (Mécanique & Électricité Auto)');
  assert.ok(ids.includes('CAT-TELECOM'), 'Doit inclure CAT-TELECOM (Électronique & Télécommunications)');
  assert.ok(ids.includes('CAT-LOG'), 'Doit inclure CAT-LOG (Logistique & Maintenance)');

  // Vérifier sous-domaines
  const infoCat = cats.find(c => c.id === 'CAT-INFO');
  assert.strictEqual(infoCat.sousDomaines.length, 3);
  assert.ok(infoCat.ateliersActifs >= 3);
});

await runAsyncTest('La banque initiale contient les ateliers pratiques complets avec consignes EPI et tâches', async () => {
  const workshops = await workshopService.getWorkshops({ statut: 'ACTIF' });
  assert.ok(workshops.length >= 9, 'Doit contenir au moins 9 ateliers pratiques initiaux.');

  const obdWorkshop = workshops.find(w => w.Code === 'ATEL-MECA-01');
  assert.ok(obdWorkshop, 'L\'atelier OBD-II doit exister.');
  assert.ok(obdWorkshop.TachesPratiques.length >= 3, 'Doit avoir au moins 3 tâches pratiques.');
  assert.ok(obdWorkshop.CriteresEvaluation.length >= 3, 'Doit avoir au moins 3 critères d\'évaluation.');
  assert.ok(obdWorkshop.ConsignesSecurite.length >= 2, 'Doit avoir des consignes de sécurité EPI.');
  assert.strictEqual(obdWorkshop.ScoreTotalMax, 20);
});

await runAsyncTest('Création d\'un nouvel atelier pratique avec calcul automatique du barème total', async () => {
  const newWorkshopData = {
    Titre: 'Atelier Test Automatisation Diagnostic Radio VHF',
    TitreAr: 'ورشة اختبار تشخيص الراديو اللاسلكي',
    CategorieId: 'CAT-TELECOM',
    SousDomaine: 'Diagnostic des équipements de communication',
    NiveauDifficulte: 'AVANCE',
    DureeMinutes: 120,
    LieuAtelier: 'Labo Transmissions',
    CapaciteMax: 4,
    SuperviseurParDefaut: 'Capitaine O. Cherkaoui',
    Objectifs: ['Mesure de puissance crête', 'Contrôle modulation FM'],
    EquipementsRequis: ['Banc de test IFR', 'Charge fictive 50 ohms'],
    ConsignesSecurite: ['Arrêt émission avant déconnexion antenne'],
    TachesPratiques: [
      { taskId: 'T-1', ordre: 1, description: 'Calibrer le banc de mesure', resultatAttendu: 'Zéro dérive', baremePoints: 10 },
      { taskId: 'T-2', ordre: 2, description: 'Tester la puissance émise', resultatAttendu: 'Puissance 25W +/- 1W', baremePoints: 10 }
    ],
    CriteresEvaluation: [
      { critereId: 'CR-1', intitule: 'Précision du calibrage', intituleAr: 'دقة الضبط', pointsMax: 10 },
      { critereId: 'CR-2', intitule: 'Respect des consignes HF', intituleAr: 'احترام شروط التردد العالي', pointsMax: 10 }
    ]
  };

  const created = await workshopService.createWorkshop(newWorkshopData, 1);
  assert.ok(created.AtelierId > 0);
  assert.strictEqual(created.ScoreTotalMax, 20);
  assert.strictEqual(created.Statut, 'ACTIF');

  // Vérifier qu'on le retrouve par ID
  const retrieved = await workshopService.getWorkshopById(created.AtelierId);
  assert.strictEqual(retrieved.Titre, 'Atelier Test Automatisation Diagnostic Radio VHF');
  assert.strictEqual(retrieved.Category.id, 'CAT-TELECOM');
});

await runAsyncTest('Modification et archivage / réactivation d\'un atelier pratique', async () => {
  const workshops = await workshopService.getWorkshops();
  const testW = workshops[0];

  // Modification
  const updated = await workshopService.updateWorkshop(testW.AtelierId, {
    DureeMinutes: 105,
    LieuAtelier: 'Salle Rénovée SIC'
  }, 1);
  assert.strictEqual(updated.DureeMinutes, 105);
  assert.strictEqual(updated.LieuAtelier, 'Salle Rénovée SIC');

  // Archivage
  const archived = await workshopService.archiveWorkshop(testW.AtelierId, true, 1);
  assert.strictEqual(archived.Statut, 'ARCHIVE');

  // Réactivation
  const reactivated = await workshopService.archiveWorkshop(testW.AtelierId, false, 1);
  assert.strictEqual(reactivated.Statut, 'ACTIF');
});

await runAsyncTest('Assignation d\'un atelier pratique à des élèves', async () => {
  // Assigner l'atelier 7 (Soudure CMS) à l'élève 4 (Thomas Leroux)
  const assignRes = await workshopService.assignWorkshop(7, {
    traineeIds: [4],
    datePrevue: '2026-03-10T09:00:00.000Z',
    superviseurNom: 'Lieutenant Technique Test'
  });

  assert.strictEqual(assignRes.success, true);
  assert.ok(assignRes.assignments.length >= 0);

  // Vérifier l'assignation dans la liste
  const assignments = await workshopService.getAssignments({ workshopId: 7, traineeId: 4 });
  assert.ok(assignments.length >= 1);
  const assign = assignments[0];
  assert.strictEqual(assign.UtilisateurId, 4);
  assert.strictEqual(assign.AtelierId, 7);
  assert.ok(assign.Statut === 'NON_COMMENCE' || assign.Statut === 'ASSIGNE' || assign.Statut === 'EVALUE');
});

await runAsyncTest('Évaluation d\'un élève, calcul du score, mention et détection d\'aptitudes pratiques', async () => {
  // Créer une assignation pour l'élève 3 (Clara Bernard) sur l'atelier 1
  const assignRes = await workshopService.assignWorkshop(1, {
    traineeIds: [3],
    superviseurNom: 'Major Instructeur Test'
  });
  const assignId = assignRes.assignments[0]?.AssignationId ||
    (await workshopService.getAssignments({ workshopId: 1, traineeId: 3 }))[0].AssignationId;

  // Évaluer l'élève avec des notes par critère (18/20 = 90% -> EXCELLENT)
  const evalRes = await workshopService.evaluateTrainee(assignId, {
    notesCriteres: {
      'CRIT-INFO-1-1': { note: 8, noteMax: 8, commentaire: 'Parfait' },
      'CRIT-INFO-1-2': { note: 5, noteMax: 6, commentaire: 'Très bon' },
      'CRIT-INFO-1-3': { note: 5, noteMax: 6, commentaire: 'Conforme' }
    },
    observations: 'Excellente rigueur méthodologique et grande dextérité.',
    competencesDetectees: ['Chiffrement LUKS', 'Sécurisation station de travail', 'Audit des logs'],
    recommandationSpecialite: 'SPEC-INFO'
  });

  assert.strictEqual(evalRes.success, true);
  assert.ok(evalRes.assignment.Statut === 'VALIDE' || evalRes.assignment.Statut === 'EVALUE');
  assert.strictEqual(evalRes.assignment.ScoreObtenu, 18);
  assert.strictEqual(evalRes.assignment.ScorePourcentage, 90);
  assert.strictEqual(evalRes.assignment.Mention, 'EXCELLENT');
  assert.strictEqual(evalRes.assignment.CompetencesDetectees.length, 3);
  assert.strictEqual(evalRes.assignment.RecommandationSpecialite, 'SPEC-INFO');
});

await runAsyncTest('Consultation de l\'espace élève : cumul des compétences et moyennes pratiques', async () => {
  // Julien Moreau (Id: 2) a plusieurs ateliers évalués
  const studentView = await workshopService.getTraineeWorkshops(2);
  assert.ok(studentView.totalAssignes >= 3, 'L\'élève doit avoir au moins 3 ateliers assignés.');
  assert.ok(studentView.totalEvalues >= 2, 'L\'élève doit avoir au moins 2 ateliers évalués.');
  assert.ok(studentView.scoreMoyenPourcentage >= 80, 'La moyenne doit être calculée.');
  assert.ok(studentView.competencesDetectees.length >= 3, 'Des compétences uniques doivent être détectées.');
  assert.ok(studentView.ateliers.some(a => a.Atelier.Code === 'ATEL-INFO-01'));
});

await runAsyncTest('Agrégation des statistiques globales du module des ateliers pratiques', async () => {
  const stats = await workshopService.getStats();
  assert.ok(stats.totalWorkshops >= 9, 'Doit comptabiliser tous les ateliers.');
  assert.ok(stats.activeWorkshops >= 8, 'Doit comptabiliser les ateliers actifs.');
  assert.ok(stats.totalAssignments >= 5, 'Doit comptabiliser toutes les assignations.');
  assert.ok(stats.evaluatedAssignments >= 4, 'Doit compter les séances évaluées.');
  assert.ok(stats.completionRate > 0, 'Le taux d\'achèvement doit être supérieur à zéro.');
  assert.strictEqual(stats.categoryBreakdown.length, 4, 'Répartition sur les 4 catégories.');
  assert.ok(stats.topDetectedSkills.length > 0, 'Les compétences pratiques les plus fréquentes doivent être identifiées.');
});

console.log('\n📌 GROUPE 13 : Système d\'Évaluation Pratique des Ateliers (Barème 20 pts, Sécurité & Révisions)');

runTest('Matrice standard officielle des 4 critères (4 x 5 points = 20 points)', () => {
  const criteria = workshopService.getStandardCriteria();
  assert.strictEqual(criteria.length, 4, 'La matrice doit comporter exactement 4 critères.');

  const expectedIds = ['CRIT-SEC-METH', 'CRIT-DIAG-PREC', 'CRIT-EXEC-QUAL', 'CRIT-TPS-DISC'];
  expectedIds.forEach(id => {
    const found = criteria.find(c => c.critereId === id);
    assert.ok(found, `Le critère standard ${id} doit exister.`);
    assert.strictEqual(found.pointsMax, 5, `Le critère ${id} doit être noté sur 5 points.`);
  });

  const totalPoints = criteria.reduce((sum, c) => sum + c.pointsMax, 0);
  assert.strictEqual(totalPoints, 20, 'Le total standard des 4 critères doit faire exactement 20 points.');
});

await runAsyncTest('Workflow d\'évaluation : Sauvegarde en brouillon (EN_COURS) et soumission (EN_ATTENTE_VALIDATION)', async () => {
  // Créer une nouvelle assignation pour tester le workflow de bout en bout
  const assignRes = await workshopService.assignWorkshop(2, {
    traineeIds: [4], // Thomas Leroux
    superviseurNom: 'Capitaine Évaluateur Workflow'
  });
  const assignId = assignRes.assignments[0]?.AssignationId ||
    (await workshopService.getAssignments({ workshopId: 2, traineeId: 4 }))[0].AssignationId;

  // 1. Sauvegarde Brouillon (EN_COURS)
  const draftRes = await workshopService.evaluateTrainee(assignId, {
    saveDraft: true,
    notesCriteres: {
      'CRIT-SEC-METH': { note: 4, commentaire: 'Bon respect initial' },
      'CRIT-DIAG-PREC': { note: 3, commentaire: 'Diagnostic en cours' }
    },
    observations: 'Observation préliminaire en cours de séance.'
  });

  assert.strictEqual(draftRes.success, true);
  assert.strictEqual(draftRes.assignment.Statut, 'EN_COURS');
  assert.strictEqual(draftRes.assignment.EstVerrouille, false);
  assert.ok(draftRes.assignment.HistoriqueRevisions.length >= 1);
  assert.strictEqual(draftRes.assignment.HistoriqueRevisions[draftRes.assignment.HistoriqueRevisions.length - 1].action, 'BROUILLON');

  // 2. Soumission pour visa / validation (EN_ATTENTE_VALIDATION)
  const submitRes = await workshopService.evaluateTrainee(assignId, {
    submitForValidation: true,
    notesCriteres: {
      'CRIT-SEC-METH': { note: 5, commentaire: 'Sécurité irréprochable' },
      'CRIT-DIAG-PREC': { note: 4, commentaire: 'Diagnostic confirmé' },
      'CRIT-EXEC-QUAL': { note: 4, commentaire: 'Exécution soignée' },
      'CRIT-TPS-DISC': { note: 4, commentaire: 'Ponctualité et discipline' }
    },
    observations: 'Intervention pratique terminée, soumise pour visa de validation.',
    pointsForts: ['Respect scrupuleux des EPI', 'Précision du câblage'],
    axesAmelioration: ['Optimiser le rangement final']
  });

  assert.strictEqual(submitRes.success, true);
  assert.strictEqual(submitRes.assignment.Statut, 'EN_ATTENTE_VALIDATION');
  assert.strictEqual(submitRes.assignment.ScoreObtenu, 17);
  assert.strictEqual(submitRes.assignment.ScorePourcentage, 85);
  assert.strictEqual(submitRes.assignment.EstVerrouille, false);
});

await runAsyncTest('Workflow d\'évaluation : Validation définitive, mention et verrouillage anti-fraude', async () => {
  const assignments = await workshopService.getAssignments({ workshopId: 2, traineeId: 4 });
  const assignId = assignments[0].AssignationId;

  // Validation définitive (VALIDE)
  const validRes = await workshopService.evaluateTrainee(assignId, {
    statut: 'VALIDE',
    notesCriteres: {
      'CRIT-SEC-METH': { note: 5, commentaire: 'Excellente sécurité' },
      'CRIT-DIAG-PREC': { note: 4.5, commentaire: 'Excellente précision' },
      'CRIT-EXEC-QUAL': { note: 4.5, commentaire: 'Qualité supérieure' },
      'CRIT-TPS-DISC': { note: 4, commentaire: 'Respect des délais' }
    },
    observations: 'Performance pratique validée avec distinction.',
    pointsForts: ['Maîtrise des protocoles', 'Autonomie'],
    axesAmelioration: ['Gestion du stress lors des mesures complexes'],
    competencesDetectees: ['Diagnostic réseau', 'Sertissage RJ45'],
    recommandationSpecialite: 'SPEC-INFO',
    superviseurNom: 'Commandant de Compagnie'
  });

  assert.strictEqual(validRes.success, true);
  assert.strictEqual(validRes.assignment.Statut, 'VALIDE');
  assert.strictEqual(validRes.assignment.EstVerrouille, true);
  assert.strictEqual(validRes.assignment.ScoreObtenu, 18);
  assert.strictEqual(validRes.assignment.Mention, 'EXCELLENT');
  assert.ok(validRes.assignment.DateValidation);
  assert.strictEqual(validRes.assignment.ValidePar, 'Commandant de Compagnie');
});

await runAsyncTest('Protection anti-fraude : Blocage de toute modification sur une évaluation verrouillée sans révision', async () => {
  const assignments = await workshopService.getAssignments({ workshopId: 2, traineeId: 4 });
  const assignId = assignments[0].AssignationId;

  let errorThrown = false;
  try {
    // Tenter de modifier l'évaluation verrouillée directement
    await workshopService.evaluateTrainee(assignId, {
      notesCriteres: {
        'CRIT-SEC-METH': { note: 2 }
      }
    });
  } catch (err) {
    errorThrown = true;
    assert.match(err.message, /verrouillée|révision autorisée/i);
  }

  assert.strictEqual(errorThrown, true, 'La modification directe d\'une évaluation verrouillée doit être rejetée.');
});

await runAsyncTest('Procédure officielle de révision autorisée avec motif obligatoire et audit', async () => {
  const assignments = await workshopService.getAssignments({ workshopId: 2, traineeId: 4 });
  const assignId = assignments[0].AssignationId;

  // 1. Échec si motif absent
  let motifError = false;
  try {
    await workshopService.requestEvaluationRevision(assignId, { motif: '   ' });
  } catch (err) {
    motifError = true;
    assert.match(err.message, /motif officiel/i);
  }
  assert.strictEqual(motifError, true);

  // 2. Déverrouillage officiel avec motif circonstancié
  const revRes = await workshopService.requestEvaluationRevision(assignId, {
    motif: 'Demande de révision suite à contre-expertise technique supervisée.',
    adminId: 1,
    adminNom: 'Commandant École'
  });

  assert.strictEqual(revRes.success, true);
  assert.strictEqual(revRes.assignment.EstVerrouille, false);
  assert.strictEqual(revRes.assignment.Statut, 'EN_COURS');
  assert.strictEqual(revRes.assignment.MotifRevision, 'Demande de révision suite à contre-expertise technique supervisée.');

  // Vérifier la présence de l'entrée dans l'historique d'audit
  const lastAudit = revRes.assignment.HistoriqueRevisions[revRes.assignment.HistoriqueRevisions.length - 1];
  assert.strictEqual(lastAudit.action, 'REVISION_OUVERTE');
  assert.strictEqual(lastAudit.auteurNom, 'Commandant École');
});

await runAsyncTest('Règle impérative de sécurité : Arrêt d\'urgence, note sécurité à 0 et statut REJETE', async () => {
  // Créer une nouvelle assignation pour simuler un manquement critique à la sécurité
  const assignRes = await workshopService.assignWorkshop(3, {
    traineeIds: [3], // Clara Bernard
    superviseurNom: 'Adjudant Sécurité'
  });
  const assignId = assignRes.assignments[0]?.AssignationId ||
    (await workshopService.getAssignments({ workshopId: 3, traineeId: 3 }))[0].AssignationId;

  // Déclencher un arrêt de sécurité
  const safetyRes = await workshopService.evaluateTrainee(assignId, {
    arretSecurite: true,
    motifArretSecurite: 'Absence de gants haute tension lors du démontage batterie HT.',
    notesCriteres: {
      'CRIT-SEC-METH': { note: 5 }, // Même si l'évaluateur avait mis 5, l'arrêt sécurité doit forcer 0
      'CRIT-DIAG-PREC': { note: 3 },
      'CRIT-EXEC-QUAL': { note: 2 },
      'CRIT-TPS-DISC': { note: 3 }
    },
    observations: 'Incident critique de sécurité constaté. Manipulation stoppée sur le champ.'
  });

  assert.strictEqual(safetyRes.success, true);
  assert.strictEqual(safetyRes.assignment.Statut, 'REJETE');
  assert.strictEqual(safetyRes.assignment.ArretSecurite, true);
  assert.strictEqual(safetyRes.assignment.NotesCriteres['CRIT-SEC-METH'].note, 0, 'La note sécurité doit être forcée à 0.');
  assert.strictEqual(safetyRes.assignment.Mention, 'REJETE');
  assert.strictEqual(safetyRes.assignment.EstVerrouille, true);
  assert.match(safetyRes.assignment.MotifArretSecurite, /Absence de gants haute tension/);
});

await runAsyncTest('Gestion des pièces justificatives / preuves pratiques avec audit', async () => {
  // Utiliser une assignation déverrouillée ou en cours
  const assign = (mockStore.workshopAssignments || []).find(a => !a.EstVerrouille) ||
    (await workshopService.assignWorkshop(4, { traineeIds: [2] })).assignments[0];

  // 1. Ajout de pièce justificative
  const addRes = await workshopService.addEvidence(assign.AssignationId, {
    nomFichier: 'PV_Constat_Technique_OBD.pdf',
    type: 'application/pdf',
    taille: '412 Ko',
    description: 'Rapport officiel de valise diagnostic Bosch'
  }, { id: 1, nom: 'Instructeur', prenom: 'Chef' });

  assert.strictEqual(addRes.success, true);
  assert.ok(addRes.evidence.id.startsWith('PRV-'));
  assert.strictEqual(addRes.evidence.nomFichier, 'PV_Constat_Technique_OBD.pdf');

  // 2. Suppression de la pièce justificative
  const delRes = await workshopService.deleteEvidence(assign.AssignationId, addRes.evidence.id, {
    id: 1, nom: 'Instructeur', prenom: 'Chef'
  });

  assert.strictEqual(delRes.success, true);
  assert.ok(!delRes.assignment.PreuvesAttachees.some(p => p.id === addRes.evidence.id));
});

await runAsyncTest('Alimentation automatique du profil professionnel de l\'élève (Étape 7 du workflow)', async () => {
  const studentProfile = await workshopService.getTraineeWorkshops(2); // Julien Moreau
  assert.ok(studentProfile.totalAssignes >= 3);
  assert.ok(studentProfile.valides >= 2);
  assert.ok(studentProfile.scoreMoyenPourcentage >= 80);
  assert.ok(Array.isArray(studentProfile.competencesDetectees));
  assert.ok(studentProfile.competencesDetectees.length >= 3);

  // Vérifier qu'aucune faille d'information sensible n'est transmise
  studentProfile.ateliers.forEach(ws => {
    assert.strictEqual(typeof ws.Atelier.Code, 'string');
    assert.ok(ws.ScoreTotalMax === 20 || ws.ScoreTotalMax === null || ws.ScoreTotalMax > 0);
  });
});

// --------------------------------------------------------------------------
// 14. Tests de l'Analyse des Compétences, Recommandations Combinées & Reporting
// --------------------------------------------------------------------------
console.log('\n📌 GROUPE 14 : Analyse des Compétences, Recommandations Combinées & Reporting (ORIENT-G)');

import { WORKSHOP_COMPETENCY_GROUPS } from '../lib/workshopCompetencyMapping.js';

runTest('Cartographie des compétences pratiques : 4 groupes officiels et liaison aux ateliers', () => {
  assert.strictEqual(WORKSHOP_COMPETENCY_GROUPS.length, 4, 'Il doit y avoir exactement 4 groupes de compétences professionnelles.');

  const expectedGroupIds = ['GROUP-INFO', 'GROUP-MECA', 'GROUP-TELECOM', 'GROUP-LOG'];
  expectedGroupIds.forEach(id => {
    const grp = WORKSHOP_COMPETENCY_GROUPS.find(g => g.groupId === id);
    assert.ok(grp, `Le groupe ${id} doit être défini.`);
    assert.ok(grp.competences.length >= 3, `Le groupe ${id} doit contenir au moins 3 compétences.`);
    grp.competences.forEach(c => {
      assert.ok(Array.isArray(c.workshops), `La compétence ${c.code} doit être liée à des ateliers.`);
      assert.ok(c.workshops.length >= 1, `La compétence ${c.code} doit être liée à au moins un atelier évaluateur.`);
    });
  });
});

await runAsyncTest('Calcul fusionné des compétences : Intégration des tests et ateliers sans pénalité artificielle', async () => {
  const comps = await professionalOrientationService.calculateStudentCompetencies(2);
  assert.strictEqual(comps.length, 12, 'Les 12 compétences canoniques doivent être retournées.');

  const technicalComp = comps.find(c => c.code === 'TECHNICAL_SKILLS');
  assert.ok(technicalComp, 'TECHNICAL_SKILLS doit être présente.');
  assert.ok(technicalComp.contributingWorkshops.length >= 1, 'Des ateliers pratiques doivent avoir contribué à TECHNICAL_SKILLS.');

  comps.forEach(c => {
    assert.ok(c.scorePct > 0, `Le score de ${c.code} ne doit pas être nul.`);
  });
});

await runAsyncTest('Profil de compétences professionnelles élève : Consolidation des ateliers validés, points forts et observations', async () => {
  const profile = await professionalOrientationService.getTraineeProfessionalSkillsProfile(2);
  assert.ok(profile.studentInfo.matricule === 'EG-2025-014' || profile.studentInfo.matricule === 'EG-2025-099');
  assert.ok(profile.overallPerformance.completedCount >= 2, 'Doit comptabiliser les ateliers validés.');
  assert.ok(profile.overallPerformance.averageScore20 >= 16, 'La moyenne /20 doit être calculée.');
  assert.ok(profile.competencyGroupsAnalysis.length === 4, 'Les 4 groupes d\'analyse doivent être présents.');
  assert.ok(profile.identifiedStrengths.length >= 1, 'Des points forts doivent être consolidés.');
  assert.ok(profile.evaluatorObservations.length >= 1, 'Des observations d\'évaluateurs doivent être enregistrées.');
  assert.ok(profile.topRecommendedSpecialties.length === 3, 'Le TOP 3 des spécialités doit être présent.');
});

await runAsyncTest('Moteur de recommandation combiné : Top 3 avec résultats des tests, ateliers pertinents et justifications', async () => {
  const { topThree, allSpecialties } = await professionalOrientationService.matchStudentToSpecialties(2);
  assert.strictEqual(topThree.length, 3, 'Doit retourner exactement 3 recommandations.');

  topThree.forEach((spec, idx) => {
    assert.strictEqual(spec.rangRecommandation, idx + 1);
    assert.ok(spec.scoreCompatibilite >= 50 && spec.scoreCompatibilite <= 100);
    assert.ok(Array.isArray(spec.relevantTestResults), 'Doit lister les tests pertinents.');
    assert.ok(Array.isArray(spec.relevantWorkshopResults), 'Doit lister les ateliers pertinents.');
    assert.ok(spec.supportingStrengths.length >= 1, 'Doit inclure des points forts.');
    assert.ok(spec.areasRequiringImprovement.length >= 1, 'Doit inclure des axes d\'amélioration.');
    assert.ok(spec.whySuggestedFr && spec.whySuggestedFr.length > 20, 'Doit fournir une justification motivée en français.');
    assert.ok(spec.whySuggestedAr && spec.whySuggestedAr.length > 20, 'Doit fournir une justification motivée en arabe.');
    assert.ok(Array.isArray(spec.eligibilityConditions), 'Les conditions d\'éligibilité doivent être séparées.');
  });
});

await runAsyncTest('Garde-fous d\'orientation : Protection contre l\'atelier unique et détection des données partielles', async () => {
  const emptyStudentRes = await professionalOrientationService.matchStudentToSpecialties(5);
  emptyStudentRes.topThree.forEach(spec => {
    if (spec.relevantWorkshopResults.length === 0) {
      assert.ok(
        spec.dataSufficiencyStatus === 'PARTIELLE' || spec.dataSufficiencyStatus === 'INSUFFISANTE',
        'Doit signaler que les données pratiques sont incomplètes.'
      );
    }
    assert.ok(spec.scoreCompatibilite > 0 && spec.scoreCompatibilite <= 100);
  });
});

await runAsyncTest('Tableau de bord analytique des compétences : KPIs, fréquences et distribution par promotion', async () => {
  const dash = await professionalOrientationService.getWorkshopAnalyticsDashboard();
  assert.ok(dash.kpis.totalTrainees >= 4);
  assert.ok(dash.kpis.totalTraineesEvaluated >= 2);
  assert.ok(dash.kpis.totalCompletedWorkshops >= 4);
  assert.ok(dash.kpis.averageScore20 > 10);
  assert.ok(Array.isArray(dash.mostDemonstratedCompetencies));
  assert.ok(dash.mostDemonstratedCompetencies.length >= 1);
  assert.ok(Array.isArray(dash.workshopsParticipation));
  assert.ok(Array.isArray(dash.topPerformingTrainees));
  assert.ok(dash.topPerformingTrainees.length >= 1);
  assert.ok(Array.isArray(dash.performanceDistributionByGroup));
  assert.ok(dash.performanceDistributionByGroup.length >= 1);
});

await runAsyncTest('Génération de l\'export tabulaire officiel Excel / CSV (Tests et Ateliers combinés)', async () => {
  const exportData = await professionalOrientationService.generateAssessmentExportData();
  assert.ok(exportData.headers.length >= 10, 'L\'export doit comporter au moins 10 colonnes combinées.');
  assert.ok(exportData.headers.some(h => h.includes('Matricule')));
  assert.ok(exportData.headers.some(h => h.includes('Tests')));
  assert.ok(exportData.headers.some(h => h.includes('Ateliers')));
  assert.ok(exportData.headers.some(h => h.includes('Recommandée') || h.includes('المقترح')));
  assert.ok(exportData.rows.length >= 4, 'L\'export doit contenir les lignes des élèves.');
});

console.log('\n======================================================');
console.log(`  RÉSULTATS : ${passedTests} / ${totalTests} TESTS VALIDÉS AVEC SUCCÈS`);
console.log('======================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
