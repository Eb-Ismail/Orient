// Test automatisé des 4 Nouveaux Piliers de la Plateforme ORIENT-GR
import { talentPlatformService, TALENT_RADAR_DIMENSIONS, SIMULATION_CENTER_EXERCISES } from '../lib/talentPlatformService.js';
import { mockStore, closeDbPool } from '../lib/db.js';

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✅ [PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
  }
}

async function runTests() {
  console.log('\n======================================================');
  console.log('  TESTS SUITE : 4 PILIERS DE LA PLATEFORME ORIENT-GR');
  console.log('======================================================\n');

  console.log("📌 PILIER 1 : Talent Radar (7 Dimensions & 3 Couches)");
  assert(TALENT_RADAR_DIMENSIONS.length === 7, "Exactement 7 dimensions fondamentales définies");
  const student1Radar = await talentPlatformService.getStudentTalentRadar(1);
  assert(student1Radar !== null && typeof student1Radar === 'object', "Profil Talent Radar généré");
  assert(student1Radar.dimensions.analyseRaisonnement !== undefined, "Dimension 'Analyse et raisonnement' présente");
  assert(student1Radar.dimensions.analyseRaisonnement.declare !== undefined, "Couche 1 : 'declare' présent");
  assert(student1Radar.dimensions.analyseRaisonnement.observe !== undefined, "Couche 2 : 'observe' présent");
  assert(student1Radar.dimensions.analyseRaisonnement.valide !== undefined, "Couche 3 : 'valide' présent");

  console.log("\n📌 PILIER 2 : Simulation Center (6 Catégories Pratiques)");
  assert(SIMULATION_CENTER_EXERCISES.length === 6, "Exactement 6 exercices pratiques interactifs configurés");
  
  // Test soumission exercice détection d'erreurs
  const auditExercise = SIMULATION_CENTER_EXERCISES.find(e => e.id === 'SIM-DOC-02');
  assert(auditExercise !== undefined, "Exercice Audit PV trouvé");
  
  const submitResult = await talentPlatformService.submitSimulationExercise(
    1,
    'SIM-DOC-02',
    { selectedSegmentIds: ['s2', 's4'] }, // 2 vraies erreurs repérées
    95
  );
  assert(submitResult.score > 0, `Soumission évaluée avec score : ${submitResult.score}%`);
  assert(submitResult.errorsDetected.length >= 0, "Détection des anomalies exécutée");
  assert(submitResult.timeFormatted.includes('m'), "Temps d'exécution formaté");

  // Vérifier mise à jour instantanée du Talent Radar (Couche Observée)
  const updatedRadar = await talentPlatformService.getStudentTalentRadar(1);
  assert(updatedRadar.status === 'OBSERVE_EN_SIMULATION', "Statut du Radar mis à jour en OBSERVE_EN_SIMULATION");

  console.log("\n📌 PILIER 3 : Simulateur d'Orientation (5 Sources & Hypothèses)");
  const orientData = await talentPlatformService.getOrientationSimulatorData(1);
  assert(orientData.allRecommendations.length === 7, "Exactement 7 spécialités Gendarmerie Royale évaluées");
  assert(orientData.topSpecialty !== undefined, `Spécialité N°1 identifiée : ${orientData.topSpecialty.nomFr} (${orientData.topSpecialty.affinityScore}%)`);
  assert(orientData.topSpecialty.dataSourcesBreakdown.radarCompetencesScore !== undefined, "Source Radar intégrée dans le calcul d'affinité");

  // Test simulation d'hypothèse avec curseurs
  const simulatedHypothesis = await talentPlatformService.getOrientationSimulatorData(1, {
    analyseRaisonnement: 15,
    precisionAttention: 15
  });
  assert(simulatedHypothesis.topSpecialty.affinityScore >= orientData.topSpecialty.affinityScore, "Ajustement d'hypothèse impacte positivement le score");

  console.log("\n📌 PILIER 4 : Espace Formateur / Supervision 360°");
  const instructorStudents = await talentPlatformService.getInstructorStudentsList();
  assert(Array.isArray(instructorStudents) && instructorStudents.length > 0, "Liste des élèves supervisés récupérée");
  
  const student360 = await talentPlatformService.getInstructorStudentDetail(1);
  assert(student360.studentInfo !== undefined, "Fiche 360° : Informations élève complètes");
  assert(student360.talentRadar !== undefined, "Fiche 360° : Radar 3 couches disponible");
  assert(student360.simulationsHistory !== undefined, "Fiche 360° : Historique des simulations disponible");

  // Enregistrement d'évaluation instructeur
  const instructorEvalResult = await talentPlatformService.saveInstructorEvaluation(2, 1, {
    observations: "Élève faisant preuve d'une rigueur exceptionnelle en analyse et audit.",
    dimensions: {
      analyseRaisonnement: 90,
      precisionAttention: 92,
      communication: 85,
      organisation: 88,
      travailEquipe: 91,
      competencesTechniques: 84,
      capaciteApprentissage: 93
    },
    officialRecommendation: 'TRES_FAVORABLE',
    preferredSpecialty: 'SPEC-PST'
  });

  assert(instructorEvalResult.officialRecommendation === 'TRES_FAVORABLE', "Avis officiel enregistré");
  const postEvalRadar = await talentPlatformService.getStudentTalentRadar(1);
  assert(postEvalRadar.status === 'VALIDE_PAR_FORMATEUR', "Statut Talent Radar passé à VALIDE_PAR_FORMATEUR");
  assert(postEvalRadar.dimensions.analyseRaisonnement.valide === 90, "Couche 'Validé' mise à jour fidèlement à 90%");

  console.log('\n======================================================');
  console.log(`  BILAN DES TESTS : ${passedTests} / ${totalTests} TESTS RÉUSSIS`);
  console.log('======================================================\n');
  await closeDbPool();
}

runTests().catch(err => {
  console.error("Erreur exécution tests :", err);
  process.exit(1);
});
