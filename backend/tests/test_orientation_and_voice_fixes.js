// ==============================================================================
// TEST AUTOMATISÉ : CORRECTIONS DU SYSTÈME IA, VISIBILITÉ ET MODE VOCAL
// ==============================================================================

import {
  ORIENTATION_RESULTS_VISIBILITY,
  getOrientationResultsVisibility,
  setOrientationResultsVisibility,
  canUserViewOrientationResults
} from '../lib/orientationConfig.js';
import { smartJourneyService } from '../lib/smartJourneyService.js';
import { closeDbPool } from '../lib/db.js';
import { voiceAiService } from '../lib/voiceAiService.js';

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

async function run() {
  console.log('\n======================================================');
  console.log('  TESTS SUITE : CORRECTIONS ORIENT-GR (IA & VOICE)');
  console.log('======================================================\n');

  console.log("📌 SECTION 1 : Permissions d'Orientation (ORIENTATION_RESULTS_VISIBILITY)");
  
  // 1. Mode par défaut
  assert(getOrientationResultsVisibility() === 'student_and_admin', "Valeur initiale : 'student_and_admin'");

  const studentUser = { UtilisateurId: 1, role: 'ELEVE' };
  const adminUser = { UtilisateurId: 99, role: 'ADMIN' };
  const commissionUser = { UtilisateurId: 2, role: 'COMMISSION' };

  assert(canUserViewOrientationResults(studentUser) === true, "Élève autorisé en mode 'student_and_admin'");
  assert(canUserViewOrientationResults(adminUser) === true, "Admin autorisé en mode 'student_and_admin'");
  assert(canUserViewOrientationResults(commissionUser) === true, "Commission autorisée en mode 'student_and_admin'");

  // 2. Bascule en mode 'admin_only'
  setOrientationResultsVisibility('admin_only');
  assert(getOrientationResultsVisibility() === 'admin_only', "Bascule réussie vers 'admin_only'");

  assert(canUserViewOrientationResults(studentUser) === false, "ÉLÈVE BLOQUÉ en mode 'admin_only'");
  assert(canUserViewOrientationResults(adminUser) === true, "Admin conserve l'accès en mode 'admin_only'");
  assert(canUserViewOrientationResults(commissionUser) === true, "Commission conserve l'accès en mode 'admin_only'");

  // Rebascule en mode test 'student_and_admin'
  setOrientationResultsVisibility('student_and_admin');
  assert(getOrientationResultsVisibility() === 'student_and_admin', "Rétablissement du mode test 'student_and_admin'");
  assert(canUserViewOrientationResults(studentUser) === true, "Élève réautorisé après rétablissement");

  console.log("\n📌 SECTION 2 : Qualité & Richesse des Recommandations d'Orientation");
  const analysis = await smartJourneyService.generateProfileAnalysis(1);
  assert(analysis !== null && typeof analysis === 'object', "Analyse de profil générée");
  assert(analysis.recommendations && analysis.recommendations.length === 7, "Exactement 7 spécialités recommandées");

  // Vérification de la distinction stricte des 4 niveaux de compétences
  assert(Array.isArray(analysis.competencesDeclarees) && analysis.competencesDeclarees.length > 0, "Niveau 1 : Compétences déclarées présentes");
  assert(analysis.competencesDeclarees[0].statut === 'DECLAREE', "Niveau 1 : Statut 'DECLAREE' vérifié");

  assert(Array.isArray(analysis.competencesEstimees) && analysis.competencesEstimees.length > 0, "Niveau 2 : Compétences estimées par l'IA présentes");
  assert(analysis.competencesEstimees[0].statut === 'ESTIMEE_IA', "Niveau 2 : Statut 'ESTIMEE_IA' vérifié");

  assert(Array.isArray(analysis.competencesEvaluees) && analysis.competencesEvaluees.length > 0, "Niveau 3 : Compétences évaluées en pratique présentes");
  assert(analysis.competencesEvaluees[0].statut === 'EVALUEE_PRATIQUE', "Niveau 3 : Statut 'EVALUEE_PRATIQUE' vérifié");

  assert(Array.isArray(analysis.competencesValidees) && analysis.competencesValidees.length > 0, "Niveau 4 : Compétences validées par formateur présentes");
  assert(analysis.competencesValidees[0].statut === 'VALIDEE_FORMATEUR', "Niveau 4 : Statut 'VALIDEE_FORMATEUR' vérifié");
  assert(analysis.competencesValidees[0].visaStatut === 'VISE_ET_VALIDE', "Niveau 4 : Visa instructeur conforme");

  assert(Array.isArray(analysis.competencesVerifiees), "Rétrocompatibilité competencesVerifiees préservée");

  const topRec = analysis.recommendations[0];
  assert(topRec.domainePropose !== undefined && topRec.domainePropose.length > 0, "1. Domaine proposé renseigné");
  assert(topRec.raisons && topRec.raisons.length > 0, "2. Raisons de la recommandation présentes");
  assert(topRec.experiencesPersonnelles && topRec.experiencesPersonnelles.length > 0, "3. Expériences personnelles justifiant le choix présentes");
  assert(topRec.competencesDetectees && topRec.competencesDetectees.length > 0, "4. Compétences détectées présentes");
  assert(topRec.resultatsExercicesPratiques !== undefined, "5. Résultats des exercices pratiques présents");
  assert(topRec.pointsForts && topRec.axesAmelioration, "6. Points forts et axes d'amélioration présents");
  assert(topRec.niveauConfiance !== undefined, "7. Niveau de confiance calculé");
  assert(topRec.statutAvis === 'HYPOTHESE_CONSULTATIVE_IA', "Statut : HYPOTHESE_CONSULTATIVE_IA (Non certifié d'office)");
  assert(topRec.mentionValidationHumaine.includes('humaine'), "Mention explicite de validation humaine présente");

  console.log("\n📌 SECTION 3 : Architecture Vocale Tri-Modèle (Moulsot STT + Voxtral Darija) & Mémoire Commune");
  assert(voiceAiService.getSttModelName() === 'atlasia/moulsot.v0.3', "Service STT atlasia/moulsot.v0.3 vérifié");
  assert(voiceAiService.getModelName('darija') === 'mistralai/Voxtral-Mini-4B-Realtime-Arabic', "Modèle vocal Darija Voxtral vérifié");
  assert(voiceAiService.getBaseUrl().includes(':7200'), "Serveur port 7200 vérifié");

  // Vérifier la continuité de conversation
  const studentJourney = await smartJourneyService.getStudentJourney(1);
  assert(Array.isArray(studentJourney.conversation), "Fil de conversation unique conservé");

  console.log('\n======================================================');
  console.log(`  BILAN DES TESTS : ${passedTests} / ${totalTests} TESTS VALIDÉS AVEC SUCCÈS`);
  console.log('======================================================\n');
  await closeDbPool();
}

run().catch(err => {
  console.error("Erreur exécution tests :", err);
  process.exit(1);
});

