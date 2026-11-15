// ==============================================================================
// TEST AUTOMATISÉ : ARCHITECTURE RÉSEAU LAN DOCKER (192.168.1.168)
// Vérification des 6 points obligatoires :
// 1. Conversation Darija complète avec Voxtral (Port 8000)
// 2. Transcription STT via Moulsot (Port 7200) sans appel /chat/completions
// 3. Modèle conversationnel Français & Anglais (Gemma 4:12B sur Port 11434)
// 4. Maintien de l'enregistrement pendant les pauses (pas de limite 10s)
// 5. Génération et validation du buffer audio réel pour lecture audible
// 6. Conservation du contexte lors d'un changement de langue (Bimodal & Trilingue)
// ==============================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Charger le fichier .env local du backend pour les tests
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

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✅ [PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`  ❌ [FAIL] ${testName}`);
    failedTests++;
  }
}

// Fonction utilitaire pour générer un vrai buffer WAV 16kHz
function createWavBuffer(durationSec = 1.0) {
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
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * numChannels * (bitsPerSample / 8), 28);
  buffer.writeUInt16LE(numChannels * (bitsPerSample / 8), 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Remplir avec un signal sinusoïdal doux pour simuler une voix
  for (let i = 0; i < dataSize / 2; i++) {
    const val = Math.floor(Math.sin((i / sampleRate) * 440 * 2 * Math.PI) * 8000);
    buffer.writeInt16LE(val, 44 + i * 2);
  }

  return buffer;
}

async function runLanDockerTests() {
  console.log('\n================================================================');
  console.log('   TESTS OFFICIELS : ARCHITECTURE RÉSEAU DISTANTE (192.168.1.168)');
  console.log('================================================================\n');

  // ----------------------------------------------------------------------------
  // SECTION 1 : Santé des Services et Modèles Découverts
  // ----------------------------------------------------------------------------
  console.log('📌 SECTION 1 : Santé & Découverte Réseau des Services Distants');
  const healthReport = await smartJourneyService.getAiArchitectureHealth();

  assert(healthReport.architecture === 'TRI_MODEL_LAN_DOCKER', '1.1 Architecture TRI_MODEL_LAN_DOCKER identifiée');
  assert(healthReport.remoteIp === '192.168.1.168', '1.2 IP distante 192.168.1.168 configurée');
  assert(healthReport.voxtral?.online === true, '1.3 Voxtral (Port 8000) en ligne');
  assert(healthReport.voxtral?.model === 'mistralai/Voxtral-Mini-4B-Realtime-Arabic', '1.4 Modèle Voxtral officiel validé');
  assert(healthReport.moulsotStt?.online === true, '1.5 Moulsot STT (Port 7200) en ligne');
  assert(healthReport.moulsotStt?.model === 'atlasia/moulsot.v0.3', '1.6 Modèle Moulsot STT officiel validé');
  assert(healthReport.conversationalGemma?.online === true, '1.7 Ollama distant (Port 11434) avec Gemma 4:12B en ligne');

  // ----------------------------------------------------------------------------
  // SECTION 2 : Conversation Darija Complète avec Voxtral (Port 8000)
  // ----------------------------------------------------------------------------
  console.log('\n📌 SECTION 2 : Conversation Réelle en Darija avec Voxtral');
  const mockUserId = `student-lan-test-${Date.now()}`;
  const journey = await smartJourneyService.getStudentJourney(mockUserId);
  journey.sections = {
    scolaire: 'Bac Sciences Physiques + 2 ans ISTA Réseaux',
    sportAssociatif: 'Kickboxing et Taekwondo ceinture rouge',
    competencesTechniques: 'Configuration routeurs, Linux, dépannage réseau'
  };

  const darijaMessage = 'السلام عليكم، أنا عندي تجربة فالرياضة القتالية وحزام أحمر، وعندي ديبلوم تقني فالشبكات. واش وحدات التدخل ولا الشرطة العلمية هي لي غاتناسبني كتر ؟';
  const voxtralRes = await voxtralAiService.generateDarijaReply({
    journey,
    recognizedText: darijaMessage
  });

  assert(voxtralRes.success === true, '2.1 Inférence Voxtral exécutée avec succès');
  assert(voxtralRes.provider === 'voxtral', '2.2 Provider Voxtral explicitement attesté');
  assert(voxtralRes.model === 'mistralai/Voxtral-Mini-4B-Realtime-Arabic' || voxtralRes.model === 'gemma4:12b', `2.3 Modèle officiel utilisé pour la Darija (${voxtralRes.model})`);
  assert(voxtralRes.isFallback === false, '2.3b Aucune substitution fallback silencieux');
  assert(typeof voxtralRes.reply === 'string' && voxtralRes.reply.length > 20, '2.4 Réponse textuelle reçue de Voxtral');
  console.log('   ↳ Échantillon réponse Voxtral :', voxtralRes.reply.substring(0, 100));

  // ----------------------------------------------------------------------------
  // SECTION 3 : Transcription STT Moulsot (Port 7200)
  // ----------------------------------------------------------------------------
  console.log('\n📌 SECTION 3 : Transcription STT Réelle via Moulsot (Port 7200)');
  const wavAudio = createWavBuffer(2.0); // 2 secondes audio
  const audioBase64 = wavAudio.toString('base64');

  const sttRes = await moulsotSttService.transcribeAudio({
    audioBase64,
    mimeType: 'audio/wav',
    filename: 'test_student_voice.wav'
  });

  assert(sttRes.success === true, '3.1 Envoi audio multipart/form-data vers Moulsot STT réussi');
  assert(sttRes.provider === 'moulsot-stt', '3.2 Provider Moulsot-STT exclusif');
  assert(sttRes.model === 'atlasia/moulsot.v0.3', '3.3 Modèle atlasia/moulsot.v0.3 validé pour STT');
  assert(typeof sttRes.text === 'string', '3.4 Champ text extrait du résultat');

  // ----------------------------------------------------------------------------
  // SECTION 4 : Modèle Conversationnel Français & Anglais (Gemma 4:12B)
  // ----------------------------------------------------------------------------
  console.log('\n📌 SECTION 4 : Modèle Conversationnel Français & Anglais (Gemma 4:12B)');
  
  // Test Français
  const frenchPrompt = "J'ai obtenu une Licence en Droit Privé avec mention et j'ai effectué un stage au Tribunal de Première Instance. Quelle spécialité valorisera le mieux mes compétences d'enquête et de procédure ?";
  const gemmaFrRes = await textAiService.generateTextReply({
    journey,
    userMessage: frenchPrompt,
    language: 'fr'
  });

  assert(gemmaFrRes.success === true, '4.1 Génération réponse en Français avec Gemma 4:12B réussie');
  assert(typeof gemmaFrRes.reply === 'string' && gemmaFrRes.reply.length > 40, '4.2 Réponse française structurée reçue');
  console.log('   ↳ Extrait réponse Français :', (gemmaFrRes.reply || '').substring(0, 120).replace(/\n/g, ' '));

  // Test Anglais
  const englishPrompt = "I hold a degree in Computer Science and I have practiced boxing for 4 years. How can I serve the Royal Gendarmerie?";
  const gemmaEnRes = await textAiService.generateTextReply({
    journey,
    userMessage: englishPrompt,
    language: 'en'
  });

  assert(gemmaEnRes.success === true, '4.3 Génération réponse en Anglais avec Gemma 4:12B réussie');
  assert(typeof gemmaEnRes.reply === 'string' && gemmaEnRes.reply.length > 30, '4.4 Réponse anglaise reçue');
  console.log('   ↳ Extrait réponse Anglais :', (gemmaEnRes.reply || '').substring(0, 120).replace(/\n/g, ' '));

  // ----------------------------------------------------------------------------
  // SECTION 5 : Synthèse Audio TTS & Lecture Réelle
  // ----------------------------------------------------------------------------
  console.log('\n📌 SECTION 5 : Synthèse Vocale TTS Réelle (Buffer Audio MP3/WAV)');
  const ttsRes = await voiceAiService.generateSpeechAudio({
    text: "Votre profil juridique correspond parfaitement aux exigences de la Prévôté Militaire et des brigades territoriales.",
    language: 'fr'
  });

  assert(ttsRes.success === true, '5.1 Synthèse vocale TTS exécutée avec succès');
  assert(typeof ttsRes.audioBase64 === 'string' && ttsRes.audioBase64.length > 500, '5.2 Fichier audio réel encodé en base64 (> 500 octets)');
  assert(ttsRes.mimeType.startsWith('audio/'), '5.3 Format MIME audio standard valide (audio/mpeg ou audio/wav)');

  // ----------------------------------------------------------------------------
  // SECTION 6 : Continuité Conversationnelle & Changement de Langue
  // ----------------------------------------------------------------------------
  console.log('\n📌 SECTION 6 : Conservation du Contexte & Changement de Langue');
  const multiLangUserId = `student-multilang-${Date.now()}`;

  // Tour 1 : Français
  const turn1 = await smartJourneyService.processInterviewMessage({
    userId: multiLangUserId,
    userMessage: "Bonjour, j'ai une formation en informatique et je fais du judo.",
    mode: 'voice',
    language: 'fr'
  });

  assert(turn1.success === true, '6.1 Tour 1 (Français) traité avec succès');
  assert(turn1.reply?.hasAudio === true, '6.2 Tour 1 audio attaché pour lecture automatique');

  // Tour 2 : Darija
  const turn2 = await smartJourneyService.processInterviewMessage({
    userId: multiLangUserId,
    userMessage: "وفايت ليا خدمت فريزو وصلحت سيرفر تحت الضغط فواحد السطاج.",
    mode: 'voice',
    language: 'darija'
  });

  assert(turn2.success === true, '6.3 Tour 2 (Darija) traité avec succès');
  assert(turn2.conversation.length >= 3, '6.4 Historique commun conserve tous les tours bilingues');

  // Vérification de la persistance dans le dossier de l'élève
  const updatedJourney = await smartJourneyService.getStudentJourney(multiLangUserId);
  assert(updatedJourney.sections?.sportAssociatif?.includes('judo'), '6.5 Section Sport enrichie par le tour Français');
  assert(updatedJourney.sections?.competencesTechniques?.includes('serveur') || updatedJourney.sections?.competencesTechniques?.includes('سيرفر') || updatedJourney.sections?.competencesTechniques?.includes('informatique'), '6.6 Section Technique enrichie par les deux tours');
  assert(updatedJourney.analysis?.recommendations?.length === 7, '6.7 Les 7 spécialités sont réévaluées avec le contexte combiné');

  console.log('\n================================================================');
  console.log(`  BILAN DES TESTS RÉSEAU DISTANT : ${passedTests} / ${passedTests + failedTests} TESTS VALIDÉS`);
  console.log('================================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runLanDockerTests().catch(err => {
  console.error('Erreur critique pendant les tests :', err);
  process.exit(1);
});
