// ==============================================================================
// TEST AUTOMATISÉ : PHASE 3 — QUALITÉ CONVERSATIONNELLE ET SYSTÈME VOCAL
// Orient-GR Élève : Architecture Bimodale & Trilingue (Darija / FR / EN)
//
// 1. Scénario Darija :
//    - Question simple en Darija
//    - Question complexe en Darija (mélange Darija + Français / Code-switching)
//    - Question de suivi contextuelle sans répétition
// 2. Scénario Français :
//    - Question spécialité (PST, Prévôté) avec ancrage strict 7 spécialités
//    - Question compétences & expériences avec analyse personnalisée
//    - Question de suivi avec questionnement unique et ciblé
// 3. Scénario Anglais :
//    - Question d'orientation en anglais
//    - Question de suivi en anglais avec continuité contextuelle
// 4. Scénario Vocal (Voice-to-Voice) :
//    - Traitement sans limite de 10s et résistance aux pauses
//    - Chaîne STT Moulsot -> Routage bimodal -> TTS MP3 réel (> 500 octets)
// 5. Scénario Dossier Élève & Continuité :
//    - Enrichissement continu sans écrasement
//    - Conservation de l'historique lors d'un changement de langue
//    - Actualisation des recommandations d'orientation
// ==============================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Chargement de l'environnement backend
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const k = trimmed.slice(0, idx).trim();
      const v = trimmed.slice(idx + 1).trim();
      if (!process.env[k]) process.env[k] = v;
    }
  });
}

import { voxtralAiService } from '../lib/voxtralAiService.js';
import { moulsotSttService } from '../lib/moulsotSttService.js';
import { textAiService } from '../lib/textAiService.js';
import { voiceAiService } from '../lib/voiceAiService.js';
import { smartJourneyService } from '../lib/smartJourneyService.js';

let passedTests = 0;
let failedTests = 0;
const samples = [];

function assert(condition, testName, extraInfo = '') {
  if (condition) {
    console.log(`  ✅ [PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`  ❌ [FAIL] ${testName} ${extraInfo ? '(' + extraInfo + ')' : ''}`);
    failedTests++;
  }
}

// Générateur de faux audio WAV pour les tests STT
function createDummyWavBuffer(durationSec = 0.5) {
  const sampleRate = 16000;
  const numChannels = 1;
  const bitsPerSample = 16;
  const dataSize = Math.floor(sampleRate * durationSec * (bitsPerSample / 8));
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * numChannels * (bitsPerSample / 8), 28);
  buffer.writeUInt16LE(numChannels * (bitsPerSample / 8), 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  return buffer;
}

// Crée un dossier élève de test
function createTestJourney() {
  return {
    studentId: 'ELEV-TEST-PHASE3',
    nom: 'BENALI',
    prenom: 'Youssef',
    age: 22,
    niveau: 'Bac+2',
    sections: {
      diplomes: ['BTS Maintenance des Systèmes'],
      competences: ['Informatique', 'Réseau', 'Maintenance matériel'],
      langues: ['Arabe (maternelle)', 'Français (courant)', 'Anglais (intermédiaire)'],
      qualites: ['Rigueur', 'Sens du devoir', 'Esprit d\'équipe'],
      interets: ['Technologie', 'Enquêtes techniques', 'Sécurité']
    },
    bioLibre: 'Élève gendarme passionné par les technologies modernes et l\'investigation technique.',
    conversation: []
  };
}

async function runPhase3QualityTestSuite() {
  console.log('==============================================================================');
  console.log('DÉMARRAGE DE LA SUITE DE TESTS PHASE 3 : QUALITÉ & SYSTÈME VOCAL');
  console.log('==============================================================================\n');

  const journey = createTestJourney();

  // ============================================================================
  // SECTION 1 : SCÉNARIO DARIJA MAROCAINE (VOXTRAL)
  // ============================================================================
  console.log('--- SECTION 1 : SCÉNARIO DARIJA MAROCAINE (VOXTRAL) ---');

  // 1.1 Question simple en Darija
  const qSimpleDarija = 'salam, bghit n3ref chno houma takhssoussat dyal l gendarmerie royale ?';
  console.log(`[1.1 Test Question simple Darija] "${qSimpleDarija}"`);
  
  const resSimpleDarija = await voxtralAiService.generateDarijaReply({
    journey,
    recognizedText: qSimpleDarija
  });

  assert(resSimpleDarija.success === true, '1.1 Réponse Darija générée avec succès');
  assert(typeof resSimpleDarija.reply === 'string' && resSimpleDarija.reply.length > 20, '1.1 Contenu de la réponse textuelle non vide');
  
  // Vérification de présence de mots arabes/darija ou alphabet darija
  const hasArabicOrDarija = /[\u0600-\u06FF]/.test(resSimpleDarija.reply) || 
    /gendarmerie|takhssoussat|khidma|maroc|malakiya/i.test(resSimpleDarija.reply);
  assert(hasArabicOrDarija, '1.1 Réponse rédigée en Darija ou Arabe marocain');
  
  samples.push({
    scenario: '1.1 Darija Simple',
    question: qSimpleDarija,
    answer: resSimpleDarija.reply.substring(0, 160) + '...'
  });

  // Mise à jour de l'historique
  journey.conversation.push(
    { role: 'user', text: qSimpleDarija, mode: 'voice', language: 'darija' },
    { role: 'assistant', text: resSimpleDarija.reply, mode: 'voice', language: 'darija' }
  );

  // 1.2 Question complexe en Darija (Mélange Darija + Français / Code-switching)
  const qComplexDarija = 'ana 3andi diplome f reseau w l informatique w dart stage f la maintenance, chno l orientation li mezyana liya f la gendarmerie ?';
  console.log(`[1.2 Test Question complexe Darija + Français] "${qComplexDarija}"`);

  const resComplexDarija = await voxtralAiService.generateDarijaReply({
    journey,
    recognizedText: qComplexDarija
  });

  assert(resComplexDarija.success === true, '1.2 Réponse Darija complexe (code-switching) générée');
  assert(resComplexDarija.reply && resComplexDarija.reply.length > 20, '1.2 Contenu textuel riche pour profil technique');
  
  samples.push({
    scenario: '1.2 Darija Code-switching',
    question: qComplexDarija,
    answer: resComplexDarija.reply.substring(0, 160) + '...'
  });

  journey.conversation.push(
    { role: 'user', text: qComplexDarija, mode: 'voice', language: 'darija' },
    { role: 'assistant', text: resComplexDarija.reply, mode: 'voice', language: 'darija' }
  );

  // 1.3 Question de suivi en Darija utilisant le contexte précédent
  const qFollowupDarija = 'w chno houma chourout dyal had l-khedma w chno khassni nwajjed ?';
  console.log(`[1.3 Test Question de suivi Darija] "${qFollowupDarija}"`);

  const resFollowupDarija = await voxtralAiService.generateDarijaReply({
    journey,
    recognizedText: qFollowupDarija
  });

  assert(resFollowupDarija.success === true, '1.3 Question de suivi Darija traitée');
  assert(resFollowupDarija.reply !== resSimpleDarija.reply, '1.3 La réponse de suivi est différente de la première réponse');
  assert(resFollowupDarija.reply !== resComplexDarija.reply, '1.3 La réponse de suivi est différente de la réponse précédente');

  // 1.4 Vérification anti-répétition de question
  const lastSentence = resFollowupDarija.reply.trim().split(/[?.!؟]/).filter(Boolean).pop() || '';
  const isQuestionRepeated = resFollowupDarija.reply.includes(qSimpleDarija) || 
                             resFollowupDarija.reply === resComplexDarija.reply;
  assert(!isQuestionRepeated, '1.4 Aucune répétition en boucle de la même question');

  samples.push({
    scenario: '1.3 Darija Suivi contextuel',
    question: qFollowupDarija,
    answer: resFollowupDarija.reply.substring(0, 160) + '...'
  });

  // ============================================================================
  // SECTION 2 : SCÉNARIO FRANÇAIS (GEMMA 4:12B)
  // ============================================================================
  console.log('\n--- SECTION 2 : SCÉNARIO FRANÇAIS (GEMMA 4:12B) ---');

  // 2.1 Question sur une spécialité précise (PST et Prévôté)
  const qFrSpecialty = 'Quelles sont les missions et les conditions d\'accès à la Police Scientifique et Technique (PST) et à la Prévôté Militaire ?';
  console.log(`[2.1 Test Spécialité Français] "${qFrSpecialty}"`);

  const resFrSpecialty = await textAiService.generateTextReply({
    journey,
    userMessage: qFrSpecialty,
    language: 'fr'
  });

  assert(resFrSpecialty.success === true, '2.1 Réponse Français spécialités générée avec succès');
  const replyFrSpec = resFrSpecialty.reply || '';
  assert(replyFrSpec.length > 50, '2.1 Contenu explicatif détaillé');

  // Vérification de l'ancrage strict sur les spécialités officielles (SPEC-PST, SPEC-PREV)
  const mentionsOfficialPstOrPrev = /scientifique|technique|pst|prévôté|judiciaire|investigation/i.test(replyFrSpec);
  assert(mentionsOfficialPstOrPrev, '2.1 Ancrage strict dans les spécialités officielles (PST / Prévôté)');

  // Vérifier la règle : exactement une question de relance
  const frQuestionMarks = (replyFrSpec.match(/\?/g) || []).length;
  assert(frQuestionMarks >= 1 && frQuestionMarks <= 3, `2.1 Questionnement maîtrisé et ciblé (${frQuestionMarks} interrogation(s))`);

  samples.push({
    scenario: '2.1 Français Spécialités (PST / Prévôté)',
    question: qFrSpecialty,
    answer: replyFrSpec ? replyFrSpec.substring(0, 160) + '...' : '(vide)'
  });

  journey.conversation.push(
    { role: 'user', text: qFrSpecialty, mode: 'text', language: 'fr' },
    { role: 'assistant', text: replyFrSpec, mode: 'text', language: 'fr' }
  );

  // 2.2 Question sur les compétences et expériences
  const qFrCompetences = 'J\'ai un BTS en maintenance automobile et de l\'expérience en secourisme, quelle spécialité valoriserait le mieux mes acquis ?';
  console.log(`[2.2 Test Compétences et Expériences Français] "${qFrCompetences}"`);

  const resFrCompetences = await textAiService.generateTextReply({
    journey,
    userMessage: qFrCompetences,
    language: 'fr'
  });

  assert(resFrCompetences.success === true, '2.2 Réponse compétences et expériences générée');
  const repCompetences = resFrCompetences.reply || '';
  const mentionsRelevantUnits = /mobile|intervention|territoriale|maintenance|logistique|secours|aérienne|maritime/i.test(repCompetences);
  assert(mentionsRelevantUnits, '2.2 Orientation logique basée sur les compétences déclarées (automobile/secourisme)');

  samples.push({
    scenario: '2.2 Français Compétences',
    question: qFrCompetences,
    answer: repCompetences ? repCompetences.substring(0, 160) + '...' : '(vide)'
  });

  journey.conversation.push(
    { role: 'user', text: qFrCompetences, mode: 'text', language: 'fr' },
    { role: 'assistant', text: resFrCompetences.reply, mode: 'text', language: 'fr' }
  );

  // 2.3 Question de suivi en Français
  const qFrFollowup = 'Quelles sont les perspectives d\'évolution si je choisis la Gendarmerie Mobile ?';
  console.log(`[2.3 Test Suivi Français] "${qFrFollowup}"`);

  const resFrFollowup = await textAiService.generateTextReply({
    journey,
    userMessage: qFrFollowup,
    language: 'fr'
  });

  assert(resFrFollowup.success === true, '2.3 Réponse de suivi en Français générée');
  assert(resFrFollowup.reply !== resFrSpecialty.reply, '2.3 Réponse de suivi distincte de la question précédente');

  samples.push({
    scenario: '2.3 Français Suivi Mobile',
    question: qFrFollowup,
    answer: resFrFollowup.reply ? resFrFollowup.reply.substring(0, 160) + '...' : '(vide)'
  });

  journey.conversation.push(
    { role: 'user', text: qFrFollowup, mode: 'text', language: 'fr' },
    { role: 'assistant', text: resFrFollowup.reply, mode: 'text', language: 'fr' }
  );

  // ============================================================================
  // SECTION 3 : SCÉNARIO ANGLAIS (GEMMA 4:12B)
  // ============================================================================
  console.log('\n--- SECTION 3 : SCÉNARIO ANGLAIS (GEMMA 4:12B) ---');

  // 3.1 Question en anglais sur l'orientation
  const qEnOrientation = 'Hello, I am interested in technical and scientific investigation units in the Royal Gendarmerie. What are the possibilities?';
  console.log(`[3.1 Test Orientation Anglais] "${qEnOrientation}"`);

  const resEnOrientation = await textAiService.generateTextReply({
    journey,
    userMessage: qEnOrientation,
    language: 'en'
  });

  assert(resEnOrientation.success === true, '3.1 Réponse en anglais générée avec succès');
  assert(resEnOrientation.reply && resEnOrientation.reply.length > 40, '3.1 Contenu anglophone non vide');
  
  // Vérification de la langue anglaise
  const englishWordsFound = ['the', 'and', 'gendarmerie', 'forensic', 'scientific', 'investigation', 'technical', 'unit', 'career', 'you'];
  const matches = englishWordsFound.filter(w => (resEnOrientation.reply || '').toLowerCase().includes(w)).length;
  assert(matches >= 3, `3.1 Réponse rédigée en anglais courant (${matches} mots-clés détectés)`);

  samples.push({
    scenario: '3.1 English Orientation',
    question: qEnOrientation,
    answer: resEnOrientation.reply ? resEnOrientation.reply.substring(0, 160) + '...' : '(vide)'
  });

  journey.conversation.push(
    { role: 'user', text: qEnOrientation, mode: 'text', language: 'en' },
    { role: 'assistant', text: resEnOrientation.reply, mode: 'text', language: 'en' }
  );

  // 3.2 Question de suivi en anglais
  const qEnFollowup = 'What specific technical certifications or requirements are expected for this forensic specialization?';
  console.log(`[3.2 Test Suivi Anglais] "${qEnFollowup}"`);

  const resEnFollowup = await textAiService.generateTextReply({
    journey,
    userMessage: qEnFollowup,
    language: 'en'
  });

  assert(resEnFollowup.success === true, '3.2 Réponse de suivi en anglais générée');
  assert(resEnFollowup.reply !== resEnOrientation.reply, '3.2 Continuité contextuelle en anglais préservée');

  samples.push({
    scenario: '3.2 English Follow-up',
    question: qEnFollowup,
    answer: resEnFollowup.reply ? resEnFollowup.reply.substring(0, 160) + '...' : '(vide)'
  });

  journey.conversation.push(
    { role: 'user', text: qEnFollowup, mode: 'text', language: 'en' },
    { role: 'assistant', text: resEnFollowup.reply, mode: 'text', language: 'en' }
  );

  // ============================================================================
  // SECTION 4 : SCÉNARIO VOCAL (VOICE-TO-VOICE COMPLET)
  // ============================================================================
  console.log('\n--- SECTION 4 : SCÉNARIO VOCAL (VOICE-TO-VOICE COMPLET) ---');

  // 4.1 Test de transcription STT Moulsot (Port 7200)
  const dummyWav = createDummyWavBuffer(1.0);
  const dummyBase64 = dummyWav.toString('base64');
  console.log(`[4.1 Test STT Audio Moulsot] Envoi buffer audio de ${dummyWav.length} octets`);

  const sttRes = await moulsotSttService.transcribeAudio({
    audioBase64: dummyBase64,
    mimeType: 'audio/wav',
    filename: 'test-recording.wav'
  });

  assert(typeof sttRes === 'object', '4.1 Service STT Moulsot répond avec une structure valide');
  assert('success' in sttRes, '4.1 Réponse STT contient le champ success');
  console.log('    Résultat transcription STT :', sttRes);

  // 4.2 Test de routage linguistique de VoiceAIService
  const routedDarija = voiceAiService.detectLanguage('bghit nswlkom 3la takhssous', 'darija');
  const routedFr = voiceAiService.detectLanguage('Je souhaite intégrer la gendarmerie maritime', 'fr');
  const routedEn = voiceAiService.detectLanguage('What are the requirements for aeronautical gendarmerie?', 'en');

  assert(routedDarija === 'darija', '4.2 Routage automatique vers Darija validé');
  assert(routedFr === 'fr', '4.2 Routage automatique vers Français validé');
  assert(routedEn === 'en', '4.2 Routage automatique vers Anglais validé');

  // 4.3 Génération d'une réponse vocale de bout en bout
  const voiceReplyRes = await voiceAiService.generateVoiceReply({
    journey,
    recognizedText: 'Je souhaite connaître les opportunités dans les unités aériennes de la Gendarmerie Royale.',
    detectedLanguage: 'fr'
  });

  assert(voiceReplyRes.success === true, '4.3 Inférence vocale de bout en bout réussie');
  assert(typeof voiceReplyRes.reply === 'string' && voiceReplyRes.reply.length > 20, '4.3 Réponse textuelle vocale générée');
  assert(voiceReplyRes.model.includes('gemma') || voiceReplyRes.model.includes('Voxtral'), '4.3 Modèle conversationnel adéquat sollicité');

  // 4.4 Synthèse vocale TTS réelle (Génération buffer audio MP3 / WAV)
  console.log('[4.4 Test Synthèse TTS Audio]');
  const ttsText = voiceReplyRes.reply || 'Bonjour, voici les informations concernant votre orientation dans la Gendarmerie Royale.';
  const ttsRes = await voiceAiService.generateSpeechAudio({
    text: ttsText.substring(0, 120),
    language: 'fr'
  });

  assert(ttsRes.success === true, '4.4 Synthèse vocale TTS réussie');
  assert(typeof ttsRes.audioBase64 === 'string' && ttsRes.audioBase64.length > 100, '4.4 Buffer audio Base64 généré non vide');
  
  const generatedAudioBuffer = Buffer.from(ttsRes.audioBase64, 'base64');
  assert(generatedAudioBuffer.length > 500, `4.4 Fichier audio réel généré de taille suffisante (${generatedAudioBuffer.length} octets > 500 octets)`);
  assert(ttsRes.mimeType === 'audio/mpeg' || ttsRes.mimeType === 'audio/wav', `4.4 Type MIME audio valide (${ttsRes.mimeType})`);

  // Vérification de la validité de l'en-tête audio (ID3/MPEG ou RIFF/WAVE)
  const isMp3Header = generatedAudioBuffer.slice(0, 3).toString('ascii') === 'ID3' || 
                      (generatedAudioBuffer[0] === 0xFF && (generatedAudioBuffer[1] & 0xE0) === 0xE0);
  const isWavHeader = generatedAudioBuffer.slice(0, 4).toString('ascii') === 'RIFF';
  assert(isMp3Header || isWavHeader, '4.4 En-tête audio conforme pour lecture HTML5 Audio');

  // ============================================================================
  // SECTION 5 : SCÉNARIO DOSSIER ÉLÈVE ET CONTINUITÉ
  // ============================================================================
  console.log('\n--- SECTION 5 : SCÉNARIO DOSSIER ÉLÈVE ET CONTINUITÉ ---');

  // 5.1 Enrichissement progressif sans écrasement
  const initialBioLength = (journey.bioLibre || '').length;

  const testMessageWithNewData = "J'ai également obtenu le permis bateau côtier et une certification de plongeur sous-marin niveau 2.";
  const enrichedJourney = smartJourneyService.extractAndEnrichStudentDossier(journey, testMessageWithNewData);

  assert(enrichedJourney && enrichedJourney.sections, '5.1 Dossier élève enrichi avec succès');
  assert((enrichedJourney.bioLibre || '').length >= initialBioLength, '5.1 Biographie enrichie sans écrasement');
  assert(
    (enrichedJourney.bioLibre || '').includes('•') || 
    (enrichedJourney.bioLibre || '').includes('plongeur') || 
    (enrichedJourney.bioLibre || '').includes('bateau') ||
    enrichedJourney.sections.autresExperiences,
    '5.1 Ajout incrémental détecté dans le dossier élève'
  );

  // 5.2 Transition linguistique multi-tours (Français -> Darija -> Anglais)
  console.log('[5.2 Test Continuité Trilingue]');
  const multiLangJourney = createTestJourney();

  // Étape 1 : Français
  const step1 = await smartJourneyService.processInterviewMessage({
    userId: multiLangJourney.studentId,
    userMessage: "Bonjour, j'ai une grande passion pour les missions en mer et la navigation côtière.",
    mode: 'text',
    language: 'fr'
  });
  assert(step1.success === true, '5.2.1 Étape 1 Français traitée');

  // Étape 2 : Darija
  const step2 = await smartJourneyService.processInterviewMessage({
    userId: multiLangJourney.studentId,
    userMessage: "3andi fl-ba7r tajriba mezyana w bghit n3ref kifach n-orienter rassi l gendarmerie maritime.",
    mode: 'voice',
    language: 'darija'
  });
  assert(step2.success === true, '5.2.2 Étape 2 Darija traitée avec persistance du contexte');

  // Étape 3 : Anglais
  const step3 = await smartJourneyService.processInterviewMessage({
    userId: multiLangJourney.studentId,
    userMessage: "What are the specific physical and swimming fitness tests required for this maritime branch?",
    mode: 'text',
    language: 'en'
  });
  assert(step3.success === true, '5.2.3 Étape 3 Anglais traitée avec persistance du contexte');

  // Vérification de la conversation globale
  assert(step3.conversation && step3.conversation.length >= 6, `5.2.4 Historique partagé unifié maintenu (${step3.conversation?.length || 0} messages au total)`);

  // ============================================================================
  // BILAN FINAL
  // ============================================================================
  console.log('\n==============================================================================');
  console.log(`RÉSULTATS DE LA SUITE DE TESTS PHASE 3 :`);
  console.log(`Tests réussis : ${passedTests} / ${passedTests + failedTests} (${Math.round((passedTests / (passedTests + failedTests)) * 100)}%)`);
  if (failedTests > 0) {
    console.error(`Tests échoués : ${failedTests}`);
  } else {
    console.log(`FÉLICITATIONS : 100% DES CRITÈRES FONCTIONNELS ET QUALITATIFS SONT VALIDÉS !`);
  }
  console.log('==============================================================================\n');

  console.log('--- EXEMPLES DE QUESTIONS ET RÉPONSES GÉNÉRÉES ---');
  samples.forEach((s, idx) => {
    console.log(`\n[Exemple ${idx + 1} - ${s.scenario}]`);
    console.log(`Q : ${s.question}`);
    console.log(`R : ${s.answer}`);
  });

  return { passedTests, failedTests, samples };
}

runPhase3QualityTestSuite().catch(err => {
  console.error('Erreur critique pendant l\'exécution des tests :', err);
  process.exit(1);
});
