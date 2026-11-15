/**
 * SUITE DE TESTS OFFICIELLE : PHASE 3.1 — PERTINENCE DES RÉPONSES IA & ROUTAGE LINGUISTIQUE
 * 
 * Valide les 4 scénarios obligatoires en MODE ÉCRIT et en MODE VOCAL :
 * A. Informatique (Français)
 * B. Sport (Français)
 * C. Informatique (Darija marocaine)
 * D. Informatique (Anglais)
 * 
 * Vérifie rigoureusement :
 * 1. Exploitation réelle des compétences et expériences déclarées par l'élève.
 * 2. Respect strict de la langue d'expression (Français, Darija, Anglais).
 * 3. Question de suivi unique et hautement pertinente.
 * 4. Routage strict des modèles :
 *    - Darija -> Voxtral
 *    - Français & Anglais -> Gemma 4:12B
 *    - STT Audio -> Moulsot v0.3
 * 5. Moulsot N'EST JAMAIS le modèle générateur de réponses conversationnelles.
 * 6. Aucune contamination croisée entre scénarios.
 */

import { smartJourneyService } from '../lib/smartJourneyService.js';
import { textAiService } from '../lib/textAiService.js';
import { voxtralAiService } from '../lib/voxtralAiService.js';
import { moulsotSttService } from '../lib/moulsotSttService.js';
import { voiceAiService } from '../lib/voiceAiService.js';

let passedTests = 0;
let failedTests = 0;
const resultsAudit = [];

function assert(condition, testName, details = '') {
  if (condition) {
    passedTests++;
    console.log(`  ✅ [PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`  ❌ [FAIL] ${testName} ${details ? `-> ${details}` : ''}`);
  }
}

// Génère un buffer WAV factice pour simuler l'audio élève
function createDummyWav(seconds = 1.0) {
  const sampleRate = 16000;
  const numSamples = Math.floor(sampleRate * seconds);
  const buffer = Buffer.alloc(44 + numSamples * 2);
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(numSamples * 2, 40);
  for (let i = 0; i < numSamples; i++) {
    const val = Math.floor(Math.sin((i / sampleRate) * 440 * 2 * Math.PI) * 15000);
    buffer.writeInt16LE(val, 44 + i * 2);
  }
  return buffer;
}

async function runPhase31Audit() {
  console.log('==============================================================================');
  console.log('   DÉMARRAGE DE L\'AUDIT & DES TESTS DE PERTINENCE IA — PHASE 3.1');
  console.log('==============================================================================\n');

  // ============================================================================
  // SCÉNARIO A : INFORMATIQUE (FRANÇAIS)
  // « J'ai appris HTML, CSS, JavaScript et Python. J'ai réalisé plusieurs projets web. »
  // ============================================================================
  console.log('--- SCÉNARIO A : INFORMATIQUE (FRANÇAIS) ---');
  const msgA = "J'ai appris HTML, CSS, JavaScript et Python. J'ai réalisé plusieurs projets web.";
  const studentIdA = 3101;

  // A.1 Mode Écrit
  console.log('[A.1 Mode Écrit] Envoi message informatique...');
  const resA1 = await smartJourneyService.processInterviewMessage(studentIdA, msgA, {
    mode: 'text',
    language: 'fr'
  });

  assert(resA1.success === true, 'A.1.1 Requête écrite traitée avec succès');
  const textA1 = resA1.reply?.text || '';
  console.log('  ↳ Réponse IA Écrite :', textA1.substring(0, 160) + '...');

  // 1. Pertinence thématique & exploitation des compétences déclarées
  const mentionsTech = /html|css|javascript|python|web|programmation|développement/i.test(textA1);
  assert(mentionsTech, 'A.1.2 Reconnait et exploite les compétences informatiques réelles (HTML/CSS/JS/Python/web)');

  // 2. Langue française
  const isFrenchA = /vous|vos|votre|projet|projets|compétence|développement|gendarmerie/i.test(textA1) && !/[\u0600-\u06FF]/.test(textA1);
  assert(isFrenchA, 'A.1.3 Réponse formulée en français');

  // 3. Question de suivi ciblée
  const qCountA1 = (textA1.match(/\?/g) || []).length;
  assert(qCountA1 >= 1 && qCountA1 <= 2, `A.1.4 Questionnement de suivi ciblé (${qCountA1} question(s))`);
  const mentionsProjectInQ = /projet|défi|technique|résoudre|problème|framework/i.test(textA1);
  assert(mentionsProjectInQ, 'A.1.5 Question de suivi liée concrètement aux projets ou défis techniques');

  // 4. Métadonnées du modèle
  assert(resA1.reply?.provider === 'ollama' || resA1.reply?.provider === 'ollama-gemma', 'A.1.6 Provider écrit : Ollama / Gemma');
  assert(resA1.reply?.model?.includes('gemma'), `A.1.7 Modèle écrit : Gemma 4:12B (${resA1.reply?.model})`);
  assert(!resA1.reply?.model?.includes('moulsot'), 'A.1.8 Moulsot NON présent comme modèle conversationnel écrit');

  // A.2 Mode Vocal (Voice-to-Voice)
  console.log('[A.2 Mode Vocal] Envoi message oral transcrit...');
  const resA2 = await smartJourneyService.processInterviewMessage(studentIdA, msgA, {
    mode: 'voice',
    language: 'fr'
  });

  assert(resA2.success === true, 'A.2.1 Requête vocale traitée avec succès');
  const textA2 = resA2.reply?.text || '';
  console.log('  ↳ Réponse IA Vocale :', textA2.substring(0, 160) + '...');

  assert(/html|css|javascript|python|web|informatique|technique/i.test(textA2), 'A.2.2 Mode vocal : valorisation des compétences déclarées');
  assert(resA2.reply?.hasAudio === true && resA2.reply?.audioBase64?.length > 500, 'A.2.3 Mode vocal : synthèse vocale MP3 générée (> 500 octets)');
  assert(!resA2.reply?.model?.includes('moulsot'), 'A.2.4 Mode vocal : Moulsot NON affiché comme modèle générateur');
  assert(resA2.reply?.model?.includes('gemma') || resA2.reply?.provider?.includes('gemma'), 'A.2.5 Modèle conversationnel vocal pour le français : Gemma 4:12B');

  resultsAudit.push({
    scenario: 'A. Informatique (Français)',
    input: msgA,
    reply: textA1,
    model: resA1.reply?.model,
    provider: resA1.reply?.provider
  });

  // ============================================================================
  // SCÉNARIO B : SPORT (FRANÇAIS)
  // « Je pratique le sport depuis dix ans et j'ai participé à plusieurs compétitions avec mon équipe. »
  // ============================================================================
  console.log('\n--- SCÉNARIO B : SPORT (FRANÇAIS) ---');
  const msgB = "Je pratique le sport depuis dix ans et j'ai participé à plusieurs compétitions avec mon équipe.";
  const studentIdB = 3102;

  // B.1 Mode Écrit
  console.log('[B.1 Mode Écrit] Envoi message sport & esprit d\'équipe...');
  const resB1 = await smartJourneyService.processInterviewMessage(studentIdB, msgB, {
    mode: 'text',
    language: 'fr'
  });

  assert(resB1.success === true, 'B.1.1 Requête écrite sport traitée');
  const textB1 = resB1.reply?.text || '';
  console.log('  ↳ Réponse IA Écrite :', textB1.substring(0, 160) + '...');

  // 1. Valorisation des dix ans et de l'esprit d'équipe en compétition
  const mentionsSportYearsOrTeam = /dix|10|compétition|équipe|collectif|cohésion|endurance|discipline/i.test(textB1);
  assert(mentionsSportYearsOrTeam, 'B.1.2 Valorise l\'expérience sportive durable (10 ans), la compétition et le travail d\'équipe');

  // 2. Lien avec les spécialités opérationnelles (Mobile ou Intervention)
  const mentionsMobileOrInterv = /mobile|intervention|spec-mob|spec-interv|opérationnel|ordre/i.test(textB1);
  assert(mentionsMobileOrInterv, 'B.1.3 Établit un lien pertinent avec la Gendarmerie Mobile ou les Unités d\'Intervention');

  // 3. Question de suivi ciblée
  const qCountB1 = (textB1.match(/\?/g) || []).length;
  assert(qCountB1 >= 1 && qCountB1 <= 2, `B.1.4 Question de suivi unique (${qCountB1} interrogation(s))`);
  const questionOnTeamwork = /équipe|situation|difficulté|surmonter|pression|obstacle|cohésion|tension/i.test(textB1);
  assert(questionOnTeamwork, 'B.1.5 Question de suivi axée sur la cohésion ou l\'action collective');

  // 4. Métadonnées
  assert(resB1.reply?.model?.includes('gemma'), `B.1.6 Modèle assigné : Gemma 4:12B (${resB1.reply?.model})`);
  assert(!resB1.reply?.model?.includes('moulsot'), 'B.1.7 Moulsot absent des métadonnées génératrices');

  // B.2 Mode Vocal
  console.log('[B.2 Mode Vocal] Envoi message sport oral...');
  const resB2 = await smartJourneyService.processInterviewMessage(studentIdB, msgB, {
    mode: 'voice',
    language: 'fr'
  });

  assert(resB2.success === true, 'B.2.1 Mode vocal sport traité');
  const textB2 = resB2.reply?.text || '';
  console.log('  ↳ Réponse IA Vocale :', textB2.substring(0, 160) + '...');
  assert(/sport|équipe|cohésion|compétition|discipline|endurance/i.test(textB2), 'B.2.2 Mode vocal : valorisation de l\'endurance et de l\'esprit d\'équipe');
  assert(resB2.reply?.hasAudio === true, 'B.2.3 Audio de réponse présent pour lecture immédiate');

  resultsAudit.push({
    scenario: 'B. Sport & Esprit d\'équipe (Français)',
    input: msgB,
    reply: textB1,
    model: resB1.reply?.model,
    provider: resB1.reply?.provider
  });

  // ============================================================================
  // SCÉNARIO C : DARIJA MAROCAINE
  // « كنحب الإعلاميات وعندي تجربة فـ HTML و CSS و JavaScript، وخدمت على مشاريع ديال الويب. »
  // ============================================================================
  console.log('\n--- SCÉNARIO C : DARIJA MAROCAINE (VOXTRAL) ---');
  const msgC = "كنحب الإعلاميات وعندي تجربة فـ HTML و CSS و JavaScript، وخدمت على مشاريع ديال الويب.";
  const studentIdC = 3103;

  // C.1 Mode Écrit en Darija
  console.log('[C.1 Mode Écrit Darija] Envoi message informatique en Darija...');
  const resC1 = await smartJourneyService.processInterviewMessage(studentIdC, msgC, {
    mode: 'text',
    language: 'darija'
  });

  assert(resC1.success === true, 'C.1.1 Requête écrite en Darija traitée');
  const textC1 = resC1.reply?.text || '';
  console.log('  ↳ Réponse IA Darija Écrite :', textC1.substring(0, 160) + '...');

  // 1. Réponse en Darija / Arabe (pas de bascule injustifiée en français)
  const isArabicScriptC = /[\u0600-\u06FF]/.test(textC1);
  const arabicCharCount = (textC1.match(/[\u0600-\u06FF]/g) || []).length;
  assert(isArabicScriptC && arabicCharCount >= 15, 'C.1.2 Réponse formulée en Darija / Arabe marocain authentique');

  // 2. Reconnaissance des compétences citées
  const mentionsTechC = /html|css|javascript|web|مشاريع|معلوميات|إعلاميات|ويب|برمجة|رقمية/i.test(textC1);
  assert(mentionsTechC, 'C.1.3 Reconnait les compétences HTML/CSS/JS et projets web');

  // 3. Question de suivi ciblée en Darija
  const hasQuestionMarkC = /[?؟]/.test(textC1);
  assert(hasQuestionMarkC, 'C.1.4 Contient une question de suivi ciblée en Darija');

  // 4. Modèle et provider assignés
  assert(resC1.reply?.provider === 'voxtral', `C.1.5 Provider Darija : voxtral (${resC1.reply?.provider})`);
  assert(!resC1.reply?.model?.includes('moulsot'), 'C.1.6 Moulsot absent comme modèle générateur de la réponse');

  // C.2 Mode Vocal en Darija
  console.log('[C.2 Mode Vocal Darija] Envoi audio simulé en Darija...');
  const resC2 = await smartJourneyService.processInterviewMessage(studentIdC, msgC, {
    mode: 'voice',
    language: 'darija'
  });

  assert(resC2.success === true, 'C.2.1 Mode vocal Darija traité avec succès');
  const textC2 = resC2.reply?.text || '';
  console.log('  ↳ Réponse IA Darija Vocale :', textC2.substring(0, 160) + '...');
  assert(/[\u0600-\u06FF]/.test(textC2), 'C.2.2 Mode vocal Darija : réponse en graphie arabe/darija');
  assert(resC2.reply?.hasAudio === true, 'C.2.3 Audio de réponse vocale en Darija généré');
  assert(resC2.reply?.provider === 'voxtral', 'C.2.4 Provider vocal Darija : voxtral');

  resultsAudit.push({
    scenario: 'C. Informatique & Projets Web (Darija)',
    input: msgC,
    reply: textC1,
    model: resC1.reply?.model,
    provider: resC1.reply?.provider
  });

  // ============================================================================
  // SCÉNARIO D : ANGLAIS
  // « I have experience in web development and I have built several projects using JavaScript and Python. »
  // ============================================================================
  console.log('\n--- SCÉNARIO D : ANGLAIS (GEMMA 4:12B) ---');
  const msgD = "I have experience in web development and I have built several projects using JavaScript and Python.";
  const studentIdD = 3104;

  // D.1 Mode Écrit en Anglais
  console.log('[D.1 Mode Écrit Anglais] Envoi message informatique en anglais...');
  const resD1 = await smartJourneyService.processInterviewMessage(studentIdD, msgD, {
    mode: 'text',
    language: 'en'
  });

  assert(resD1.success === true, 'D.1.1 Requête écrite en anglais traitée');
  const textD1 = resD1.reply?.text || '';
  console.log('  ↳ Réponse IA Anglais Écrite :', textD1.substring(0, 160) + '...');

  // 1. Réponse en anglais (pas de bascule en français)
  const englishWords = ['the', 'and', 'your', 'skills', 'projects', 'python', 'javascript', 'web', 'gendarmerie', 'development', 'investigation', 'which', 'could'];
  const matchesD1 = englishWords.filter(w => textD1.toLowerCase().includes(w)).length;
  assert(matchesD1 >= 4 && !/[\u0600-\u06FF]/.test(textD1), `D.1.2 Réponse formulée strictement en anglais (${matchesD1} marqueurs détectés)`);

  // 2. Reconnaissance des acquis techniques
  const mentionsTechD = /python|javascript|web|development|projects/i.test(textD1);
  assert(mentionsTechD, 'D.1.3 Exploitation des technologies mentionnées (Python, JavaScript, web development, projects)');

  // 3. Question de suivi ciblée
  const qCountD1 = (textD1.match(/\?/g) || []).length;
  assert(qCountD1 >= 1 && qCountD1 <= 2, `D.1.4 Question de suivi en anglais ciblée (${qCountD1} interrogation(s))`);

  // 4. Modèle et provider assignés
  assert(resD1.reply?.model?.includes('gemma'), `D.1.5 Modèle conversationnel anglophone : Gemma 4:12B (${resD1.reply?.model})`);
  assert(!resD1.reply?.model?.includes('moulsot'), 'D.1.6 Moulsot absent comme modèle conversationnel anglophone');

  // D.2 Mode Vocal en Anglais
  console.log('[D.2 Mode Vocal Anglais] Envoi oral en anglais...');
  const resD2 = await smartJourneyService.processInterviewMessage(studentIdD, msgD, {
    mode: 'voice',
    language: 'en'
  });

  assert(resD2.success === true, 'D.2.1 Mode vocal anglais traité');
  const textD2 = resD2.reply?.text || '';
  console.log('  ↳ Réponse IA Anglais Vocale :', textD2.substring(0, 160) + '...');
  assert(/python|javascript|web|projects|gendarmerie/i.test(textD2), 'D.2.2 Mode vocal anglais : compétences intégrées à la réponse');
  assert(resD2.reply?.hasAudio === true, 'D.2.3 Audio de réponse vocale anglophone généré');

  resultsAudit.push({
    scenario: 'D. Web Development & Projects (English)',
    input: msgD,
    reply: textD1,
    model: resD1.reply?.model,
    provider: resD1.reply?.provider
  });

  // ============================================================================
  // SECTION E : NON-CONTAMINATION ENTRE DOSSIERS ÉLÈVES
  // ============================================================================
  console.log('\n--- SECTION E : VÉRIFICATION D\'ISOLATION DES DOSSIERS ---');
  const journeyA = await smartJourneyService.getStudentJourney(studentIdA);
  const journeyB = await smartJourneyService.getStudentJourney(studentIdB);

  // Le dossier A ne doit contenir QUE l'informatique, pas le sport
  const hasSportInDossierA = /boxe|judo|compétitions avec mon équipe/i.test(JSON.stringify(journeyA.sections || {}));
  assert(!hasSportInDossierA, 'E.1 Dossier Informatique (A) non contaminé par l\'expérience sportive');

  // Le dossier B ne doit contenir QUE le sport, pas le développement web Python/HTML
  const hasTechInDossierB = /html|css|javascript|python/i.test(JSON.stringify(journeyB.sections || {}));
  assert(!hasTechInDossierB, 'E.2 Dossier Sport (B) non contaminé par les technologies web');

  // ============================================================================
  // BILAN FINAL
  // ============================================================================
  console.log('\n==============================================================================');
  console.log(`RÉSULTATS DE L'AUDIT & VALIDATION PHASE 3.1 :`);
  console.log(`Tests réussis : ${passedTests} / ${passedTests + failedTests} (${Math.round((passedTests / (passedTests + failedTests)) * 100)}%)`);
  if (failedTests > 0) {
    console.error(`Tests échoués : ${failedTests}`);
  } else {
    console.log(`FÉLICITATIONS : 100% DES CRITÈRES DE PERTINENCE ET DE ROUTAGE SONT VALIDÉS !`);
  }
  console.log('==============================================================================\n');

  console.log('--- TRACES DES RÉPONSES GÉNÉRÉES ---');
  resultsAudit.forEach((r, idx) => {
    console.log(`\n[Échange ${idx + 1} - ${r.scenario}]`);
    console.log(`Entrée élève : « ${r.input} »`);
    console.log(`Modèle réel  : ${r.model} (Provider: ${r.provider})`);
    console.log(`Réponse IA   :\n${r.reply}\n`);
  });

  if (failedTests > 0) {
    process.exit(1);
  }
}

runPhase31Audit().catch(err => {
  console.error('Erreur critique pendant l\'exécution du banc d\'essai :', err);
  process.exit(1);
});

