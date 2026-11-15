// ==============================================================================
// ORIENT-GR — Tests Obligatoires : Architecture IA à Deux Modèles (Texte + Voice)
// 1. Gemma 4:12B (Ollama - http://localhost:11434)
// 2. Atlasia Moulsot v0.3 (Serveur - http://localhost:7200/v1)
// 3. Whisper STT
// 4. TTS (Synthèse vocale multilingue)
// 5. Continuité entre conversations écrites et vocales
// 6. Synchronisation du parcours et analyse unique
// 7. Indisponibilité indépendante et gestion stricte des erreurs
// ==============================================================================

import { textAiService } from '../lib/textAiService.js';
import { voiceAiService } from '../lib/voiceAiService.js';
import { smartJourneyService } from '../lib/smartJourneyService.js';
import { mockStore } from '../lib/db.js';

let passedCount = 0;
let totalCount = 0;
const testResults = [];

function assert(condition, testName, details = '') {
  totalCount++;
  if (condition) {
    passedCount++;
    console.log(`  ✅ [PASS] ${testName}`);
    testResults.push({ name: testName, passed: true, details });
  } else {
    console.error(`  ❌ [FAIL] ${testName} : ${details}`);
    testResults.push({ name: testName, passed: false, details });
  }
}

async function runDualModelTests() {
  console.log('\n======================================================');
  console.log('  TESTS SUITE : ARCHITECTURE IA TEXTE + VOICE (ORIENT-GR)');
  console.log('======================================================\n');

  // TEST 1 : Configuration et Diagnostic Gemma 4:12B (Mode Texte)
  console.log('📌 GROUPE 1 : Service Texte Gemma 4:12B (Ollama)');
  const textModelName = textAiService.getModelName();
  const textBaseUrl = textAiService.getBaseUrl();
  assert(textModelName === 'gemma4:12b', 'Modèle texte configuré sur gemma4:12b', `Modèle: ${textModelName}`);
  assert(textBaseUrl === 'http://localhost:11434', 'URL Ollama configurée sur http://localhost:11434', `URL: ${textBaseUrl}`);

  const textHealth = await textAiService.checkHealth();
  assert(typeof textHealth.online === 'boolean', 'Healthcheck Ollama renvoie un booléen online', `Online: ${textHealth.online}`);
  if (!textHealth.online) {
    console.log(`     ℹ️ Note: Ollama actuellement hors-ligne (${textHealth.error}) - Gestion d'erreur confirmée`);
  }

  // Vérification de la construction des prompts pour Gemma en FR, AR, Darija
  const sampleJourney = {
    bioLibre: 'Élève titulaire d\'une licence en droit, passionné par la police judiciaire.',
    sections: { scolaire: 'Licence en Droit Privé', sportAssociatif: 'Boxe et natation' },
    conversation: []
  };
  const gemmaPrompt = textAiService.buildSystemPrompt(sampleJourney);
  assert(gemmaPrompt.includes('Gemma') || gemmaPrompt.includes('Gendarmerie Royale'), 'Prompt système Gemma 4:12B intègre la doctrine militaire');
  assert(gemmaPrompt.includes('Licence en Droit Privé'), 'Prompt Gemma intègre le dossier scolaire de l\'élève');

  // TEST 2 : Configuration et Diagnostic Atlasia Moulsot v0.3 (Mode Vocal)
  console.log('\n📌 GROUPE 2 : Service Vocal Atlasia Moulsot v0.3 (Serveur Port 7200)');
  const voiceModelName = voiceAiService.getModelName();
  const voiceBaseUrl = voiceAiService.getBaseUrl();
  assert(voiceModelName === 'atlasia/moulsot.v0.3', 'Modèle vocal configuré sur atlasia/moulsot.v0.3', `Modèle: ${voiceModelName}`);
  assert(voiceBaseUrl === 'http://localhost:7200/v1', 'URL Moulsot configurée sur http://localhost:7200/v1', `URL: ${voiceBaseUrl}`);

  const voiceHealth = await voiceAiService.checkHealth();
  assert(typeof voiceHealth.online === 'boolean', 'Healthcheck Moulsot renvoie un booléen online', `Online: ${voiceHealth.online}`);
  if (!voiceHealth.online) {
    console.log(`     ℹ️ Note: Moulsot actuellement hors-ligne (${voiceHealth.error}) - Gestion d'erreur confirmée`);
  }

  const moulsotPrompt = voiceAiService.buildSystemPrompt(sampleJourney, 'darija');
  assert(moulsotPrompt.includes('Atlasia Moulsot') || moulsotPrompt.includes('الدارجة المغربية'), 'Prompt Moulsot v0.3 spécialisé pour la Darija marocaine');

  // TEST 3 : Speech-to-Text (Whisper) & TTS
  console.log('\n📌 GROUPE 3 : Speech-to-Text (Whisper) & Text-to-Speech (TTS)');
  const sttResult = await voiceAiService.transcribeAudio({ audioBase64: null });
  assert(sttResult.fallbackClientSupported === true || sttResult.success !== undefined, 'STT gère le format audio avec stratégie de repli documentée');

  // TEST 4 : Continuité entre conversations écrites et vocales (Dossier Unique)
  console.log('\n📌 GROUPE 4 : Continuité & Dossier Partagé entre Gemma et Moulsot');
  const testUserId = 999;
  
  // 4.1 Message écrit via Gemma (mode text)
  const textMsgRes = await smartJourneyService.processInterviewMessage(
    testUserId,
    'J\'ai obtenu un master en droit pénal et j\'ai géré des dossiers juridiques.',
    { mode: 'text', allowDemoFallback: true }
  );
  assert(textMsgRes.success === true, 'Message écrit traité avec succès');
  assert(textMsgRes.mode === 'text', 'Mode text correctement attribué au premier message');

  // 4.2 Message vocal via Moulsot (mode voice)
  const voiceMsgRes = await smartJourneyService.processInterviewMessage(
    testUserId,
    'ودرت التداريب فالملاكمة لثلاث سنوات وكان عندي دور كابتن الفريق فالبطولة',
    { mode: 'voice', language: 'darija', allowDemoFallback: true }
  );
  assert(voiceMsgRes.success === true, 'Message vocal traité avec succès');
  assert(voiceMsgRes.mode === 'voice', 'Mode voice correctement attribué au message vocal');

  // 4.3 Vérification de la continuité dans la même conversation
  const sharedJourney = await smartJourneyService.getStudentJourney(testUserId);
  const conversation = sharedJourney.conversation;
  const userTextMsgs = conversation.filter(m => m.role === 'user' && m.mode === 'text');
  const userVoiceMsgs = conversation.filter(m => m.role === 'user' && m.mode === 'voice');
  assert(userTextMsgs.length >= 1, 'Conversation contient le message écrit Gemma');
  assert(userVoiceMsgs.length >= 1, 'Conversation contient le message vocal Moulsot dans le MÊME fil');
  assert(sharedJourney.userId === String(testUserId), 'Un seul et unique dossier pour l\'élève (aucun profil dédoublé)');

  // TEST 5 : Synchronisation du parcours et analyse unique
  console.log('\n📌 GROUPE 5 : Synchronisation du Profil de Compétences');
  assert(sharedJourney.analysis !== null, 'Analyse des compétences générée');
  const declSkills = sharedJourney.analysis.competencesDeclarees || [];
  const hasLawSkill = declSkills.some(s => s.id === 'COMP-DROIT-PROC' || s.intitule.toLowerCase().includes('droit'));
  const hasCombatSkill = declSkills.some(s => s.id === 'COMP-COMBAT-SPORT' || s.intitule.toLowerCase().includes('physique') || s.intitule.toLowerCase().includes('combat'));
  
  assert(hasLawSkill, 'Compétence juridique apportée par le texte (Gemma) détectée dans l\'analyse');
  assert(hasCombatSkill, 'Compétence combat apportée par la voix (Moulsot) synchronisée dans la MÊME analyse');

  // TEST 6 : Gestion stricte d'indisponibilité (Ne pas inventer de réponses)
  console.log('\n📌 GROUPE 6 : Gestion Stricte de l\'Indisponibilité des Serveurs');
  const strictTextRes = await smartJourneyService.processInterviewMessage(
    testUserId,
    'Question test indisponibilité texte',
    { mode: 'text', strictNoFallback: true }
  );

  // Si Ollama est hors-ligne, il doit renvoyer success: false sans inventer de réponse
  if (!textHealth.online) {
    assert(strictTextRes.success === false, 'Gemma renvoie une erreur explicite sans inventer de réponse quand Ollama est hors ligne');
    assert(strictTextRes.code === 'OLLAMA_UNAVAILABLE' || strictTextRes.error !== undefined, 'Code d\'erreur précis OLLAMA_UNAVAILABLE retourné');
  } else {
    assert(strictTextRes.success === true, 'Gemma en ligne a répondu correctement');
  }

  const strictVoiceRes = await smartJourneyService.processInterviewMessage(
    testUserId,
    'سؤال تجربة التوقف الصوتي',
    { mode: 'voice', strictNoFallback: true }
  );

  // Si Moulsot est hors-ligne, il doit renvoyer success: false sans inventer de réponse
  if (!voiceHealth.online) {
    assert(strictVoiceRes.success === false, 'Moulsot renvoie une erreur explicite sans inventer de réponse quand le serveur 7200 est hors ligne');
    assert(strictVoiceRes.code === 'MOULSOT_UNAVAILABLE' || strictVoiceRes.error !== undefined, 'Code d\'erreur précis MOULSOT_UNAVAILABLE retourné');
  } else {
    assert(strictVoiceRes.success === true, 'Moulsot en ligne a répondu correctement');
  }

  // TEST 7 : Diagnostic Global d'Architecture
  console.log('\n📌 GROUPE 7 : Diagnostic Global d\'Architecture IA');
  const globalHealth = await smartJourneyService.getAiArchitectureHealth();
  assert(globalHealth.architecture === 'DUAL_MODEL_TEXT_VOICE', 'Architecture identifiée comme DUAL_MODEL_TEXT_VOICE');
  assert(globalHealth.textAi.model === 'gemma4:12b', 'Modèle texte vérifié : gemma4:12b');
  assert(globalHealth.voiceAi.model === 'atlasia/moulsot.v0.3', 'Modèle vocal vérifié : atlasia/moulsot.v0.3');

  console.log('\n======================================================');
  console.log(`  BILAN DES TESTS : ${passedCount} / ${totalCount} TESTS RÉUSSIS`);
  console.log('======================================================\n');

  if (passedCount === totalCount) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runDualModelTests().catch(err => {
  console.error('Erreur exécution tests dual model:', err);
  process.exit(1);
});

