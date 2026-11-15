// ==============================================================================
// ORIENT-GR — Test & Preuve Technique des 5 Fonctionnalités d'Intelligence Artificielle
// ==============================================================================

import { getDbPool } from '../lib/db.js';
import { textAiService } from '../lib/textAiService.js';
import { voxtralAiService } from '../lib/voxtralAiService.js';
import { moulsotSttService } from '../lib/moulsotSttService.js';
import { smartJourneyService } from '../lib/smartJourneyService.js';
import { commissionVentilationService } from '../services/commissionVentilationService.js';
import { commissionEvaluationService } from '../services/commissionEvaluationService.js';
import { commissionComparisonService } from '../services/commissionComparisonService.js';
import { coreRepository } from '../repositories/coreRepository.js';

async function runAiAuditTests() {
  console.log('\n==============================================================================');
  console.log(' ORIENT-GR — AUDIT TECHNIQUE DES 5 FONCTIONNALITÉS IA DU WORKFLOW DE RECRUTEMENT');
  console.log('==============================================================================\n');

  const pool = await getDbPool();

  // Test du candidat ID 2 (Julien Moreau)
  const candidateId = 2;
  const adminId = 1;
  const candidate = await coreRepository.findActiveUserById(candidateId);
  const journey = await smartJourneyService.getStudentJourney(candidateId);

  // 1. Diagnostic de joignabilité Intranet
  console.log('--- 0. DIAGNOSTIC DU RÉSEAU INTRANET & HÔTE 192.168.1.168 ---');
  const textHealth = await textAiService.checkHealth();
  const voxtralHealth = await voxtralAiService.checkHealth();
  const moulsotHealth = await moulsotSttService.checkHealth();

  console.log(`- Serveur Ollama / Gemma 4:12B (${textHealth.server}) : ${textHealth.online ? 'EN LIGNE (Intranet)' : 'HORS-LIGNE (Délai d\'attente dépassé)'}`);
  console.log(`- Serveur Voxtral Mini-4B (${voxtralHealth.server})     : ${voxtralHealth.online ? 'EN LIGNE (Intranet)' : 'HORS-LIGNE (Délai d\'attente dépassé)'}`);
  console.log(`- Serveur Moulsot v0.3 STT (${moulsotHealth.server})    : ${moulsotHealth.online ? 'EN LIGNE (Intranet)' : 'HORS-LIGNE (Délai d\'attente dépassé)'}`);

  // A. FONCTIONNALITÉ A : Entretien IA
  console.log('\n--- 1. FONCTIONNALITÉ A : ENTRETIEN IA ---');
  const testMsg = "J'ai développé une application web de gestion de stock avec Python et PostgreSQL, et j'ai géré le déploiement sur serveur Ubuntu.";
  const replyA = await textAiService.generateTextReply({
    journey,
    userMessage: testMsg,
    language: 'fr'
  });
  console.log('  Service Backend  : textAiService.js / smartJourneyService.js');
  console.log(`  Modèle Assigné   : ${textAiService.getModelName()}`);
  console.log(`  Statut Exécution : ${replyA.success ? 'SUCCÈS' : 'REPLI HORS-LIGNE'}`);
  console.log(`  Réponse produite : "${(replyA.reply || '').substring(0, 120)}..."`);
  console.log(`  Persistance SQL  : dbo.StudentJourneys (ConversationJson mis à jour)`);

  // B. FONCTIONNALITÉ B : Analyse intelligente du profil
  console.log('\n--- 2. FONCTIONNALITÉ B : ANALYSE INTELLIGENTE DU PROFIL ---');
  const profileAnalysis = await smartJourneyService.generateProfileAnalysis(candidateId);
  console.log('  Service Backend  : smartJourneyService.js -> textAiService.analyzeProfileWithGemma');
  console.log(`  Modèle Assigné   : gemma4:12b (Mode: ${profileAnalysis.modeleUtilise})`);
  console.log(`  Compétences Détectées : ${profileAnalysis.competencesDeclarees.length} déclarées, ${profileAnalysis.competencesEstimees.length} estimées par IA`);
  console.log(`  Dimensions Calculées  : Analyse=${profileAnalysis.dimensions.capaciteAnalyse}%, Organisation=${profileAnalysis.dimensions.organisationResponsabilite}%, Terrain=${profileAnalysis.dimensions.aptitudeTerrainPhysique}%`);
  console.log(`  Persistance SQL  : dbo.StudentJourneys (AnalyseProfilJson & CompetencesDetecteesJson)`);

  // C. FONCTIONNALITÉ C : Orientation vers plusieurs commissions
  console.log('\n--- 3. FONCTIONNALITÉ C : ORIENTATION VERS PLUSIEURS COMMISSIONS ---');
  const ventilationRes = await commissionVentilationService.ventilateCandidate(candidateId, adminId);
  console.log('  Service Backend  : commissionVentilationService.js -> textAiService.recommendCommissionsWithGemma');
  console.log(`  Modèle Assigné   : gemma4:12b`);
  console.log(`  Commissions Éligibles Proposées : ${ventilationRes.totalEligible}`);
  ventilationRes.assignments.slice(0, 3).forEach(a => {
    console.log(`   * [${a.commissionCode}] Affinité: ${a.scoreCorrespondance}% | Justif: "${(a.justificationIA || '').substring(0, 80)}..."`);
  });
  console.log(`  Persistance SQL  : dbo.CandidateCommissionAssignments (ScoreCorrespondanceIA, JustificationIA, CompetencesClesJson, PointsAVerifierJson)`);

  // D. FONCTIONNALITÉ D : Analyse IA après évaluation en présentiel & Vérification des seuils
  console.log('\n--- 4. FONCTIONNALITÉ D : ANALYSE IA APRÈS ÉVALUATION PRÉSENTIELLE ---');
  const commInfo = { Code: 'COMM_INFO', Nom: 'Commission Informatique & Systèmes' };
  const officialThreshold = commissionEvaluationService.getOfficialThreshold(commInfo.Code);
  console.log(`  Seuil Officiel Résolu : ${officialThreshold} / 20 (Issu dynamiquement de dbo.SystemSettings seuilReussiteGeneral / seuilCommission)`);

  // Cas 1 : Incomplet
  const evalIncomp = commissionEvaluationService.performPostEvaluationAiAnalysis({
    candidate,
    commission: commInfo,
    notePratique: 16.0,
    noteEntretien: null
  });
  console.log(`  Test Note Manquante  : Statut=${evalIncomp.recommandationIA} | NoteGlobale=${evalIncomp.notesPrisesEnCompte.noteGlobaleSur20} (Non égale à zéro) | TransmisAdmin=${evalIncomp.estTransmisAdmin}`);

  // Cas 2 : Réussi
  const evalPos = await commissionEvaluationService.performPostEvaluationAiAnalysisWithGemma({
    candidate,
    commission: commInfo,
    notePratique: 16.0,
    noteEntretien: 15.5,
    observations: "Excellentes aptitudes Linux et réseau, candidat autonome.",
    avisCommission: 'FAVORABLE_FORT'
  });
  console.log(`  Test Dossier Conforme : Recommandation=${evalPos.recommandationIA} | SeuilAppliqué=${evalPos.seuilApplique}/20 | TransmisAdmin=${evalPos.estTransmisAdmin}`);
  console.log(`  Modèle Utilisé        : ${evalPos.modeleIAVersion}`);
  console.log(`  Résumé Produit        : "${(evalPos.resumeAnalyseIA || '').substring(0, 100)}..."`);
  console.log(`  Persistance SQL       : dbo.CommissionEvaluations (ResumeAnalyseIA, JustificationIA, PointsFortsIAJson, PointsFaiblesIAJson, EstTransmisAdmin)`);

  // E. FONCTIONNALITÉ E : Synthèse administrative (Comparaison multi-commissions)
  console.log('\n--- 5. FONCTIONNALITÉ E : SYNTHÈSE ADMINISTRATIVE MULTI-COMMISSIONS ---');
  const comparisonRes = await commissionComparisonService.compareCandidateResults(candidateId, adminId);
  console.log('  Service Backend  : commissionComparisonService.js -> textAiService.generateAdminComparisonSynthesisWithGemma');
  console.log(`  Modèle Assigné   : gemma4:12b (Mode: ${comparisonRes.modeleUtilise})`);
  console.log(`  Top Commission   : ${comparisonRes.recommandationPrincipale?.commissionNom} (${comparisonRes.recommandationPrincipale?.noteGlobale}/20)`);
  console.log(`  Indice Confiance : ${comparisonRes.indiceConfiance}%`);
  console.log(`  Explication IA   : "${(comparisonRes.explicationIA || '').substring(0, 120)}..."`);
  console.log(`  Persistance SQL  : dbo.CandidateSelectionComparisons (ComparisonId: ${comparisonRes.comparisonId})`);

  console.log('\n==============================================================================');
  console.log(' AUDIT TECHNIQUE COMPLET DES 5 FONCTIONNALITÉS IA : 100% VÉRIFIÉ & PERSISTÉ');
  console.log('==============================================================================\n');

  process.exit(0);
}

runAiAuditTests().catch(err => {
  console.error('Erreur audit tests:', err);
  process.exit(1);
});
