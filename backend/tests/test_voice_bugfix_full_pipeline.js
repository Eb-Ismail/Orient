// ==============================================================================
// TEST AUTOMATISÉ COMPLET : PIPELINE VOICE-TO-VOICE MOULSOT V0.3 & TTS RÉEL
// ==============================================================================

import { voiceAiService } from '../lib/voiceAiService.js';
import { smartJourneyService } from '../lib/smartJourneyService.js';
import { mockStore } from '../lib/db.js';

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
  console.log('\n================================================================');
  console.log('  TESTS SUITE : CORRECTIONS PRIORITAIRES MODE VOCAL MOULSOT V0.3');
  console.log('================================================================\n');

  const testStudentId = 3; // Clara Bernard (Élève test dans mockStore)

  console.log("📌 ÉTAPE 1 : Test Génération Réelle de Fichier Audio TTS (MP3)");
  const sampleArabicText = "مرحباً بك أيها التلميذ الدركي، سمعت تجربتك فالميدان وغادي نساعدك تختار التخصص المناسب.";
  const ttsArabicRes = await voiceAiService.generateSpeechAudio({
    text: sampleArabicText,
    language: 'darija'
  });

  assert(ttsArabicRes.success === true, "1.1 Synthèse TTS Arabe/Darija exécutée avec succès");
  assert(typeof ttsArabicRes.audioBase64 === 'string' && ttsArabicRes.audioBase64.length > 500, "1.2 Fichier audio réel MP3 généré en base64 (> 500 octets)");
  assert(ttsArabicRes.mimeType === 'audio/mpeg', "1.3 Format audio MIME conforme : audio/mpeg");

  // Test TTS en Français
  const sampleFrenchText = "Bonjour élève gendarme, votre pratique sportive est un atout précieux pour les Unités d'Intervention.";
  const ttsFrenchRes = await voiceAiService.generateSpeechAudio({
    text: sampleFrenchText,
    language: 'fr'
  });
  assert(ttsFrenchRes.success === true, "1.4 Synthèse TTS Français exécutée avec succès");
  assert(typeof ttsFrenchRes.audioBase64 === 'string' && ttsFrenchRes.audioBase64.length > 500, "1.5 Fichier audio réel MP3 Français généré");

  console.log("\n📌 ÉTAPE 2 : Conversation Vocale en Darija Marocaine (Multi-tours & Contextuelle)");
  
  // Tour 1 : Récit oral en Darija
  const voiceDarijaMsg1 = "أنا كندير التيكواندو وعندي الحزام الأسود، وشاركت فبطولات جهوية وفزت بالميدالية الذهبية.";
  const resDarija1 = await smartJourneyService.processInterviewMessage(testStudentId, voiceDarijaMsg1, {
    mode: 'voice',
    language: 'darija'
  });

  assert(resDarija1.success === true, "2.1 Tour 1 Darija : Message oral traité avec succès");
  assert(resDarija1.reply.mode === 'voice', "2.2 Tour 1 Darija : Mode vocal confirmé");
  assert(resDarija1.reply.hasAudio === true && typeof resDarija1.reply.audioBase64 === 'string', "2.3 Tour 1 Darija : Fichier audio TTS attaché directement à la réponse");
  assert(!resDarija1.reply.model.includes('gemma'), "2.4 Tour 1 Darija : Gemma STRICTEMENT NON UTILISÉ (Moulsot exclusif)");
  assert(resDarija1.reply.text.includes('الرياضة') || resDarija1.reply.text.includes('التدخل') || resDarija1.reply.text.includes('بدني'), "2.5 Tour 1 Darija : Réponse contextualisée sur le sport et le combat");

  // Tour 2 : Approfondissement en Darija (l'élève répond à la question précédente)
  const voiceDarijaMsg2 = "فواحد البطولة تقصحت فرجلي ولكن كملت القتال حتى ربحت الماتش، وتحكمت فاعصابي مزيان.";
  const resDarija2 = await smartJourneyService.processInterviewMessage(testStudentId, voiceDarijaMsg2, {
    mode: 'voice',
    language: 'darija'
  });

  assert(resDarija2.success === true, "2.6 Tour 2 Darija : Deuxième tour traité");
  assert(resDarija2.reply.hasAudio === true, "2.7 Tour 2 Darija : Audio attaché à la relance");
  assert(resDarija2.reply.text !== resDarija1.reply.text, "2.8 Tour 2 Darija : Pas de répétition de réponse générique (Question adaptée)");

  console.log("\n📌 ÉTAPE 3 : Conversation Vocale en Français (Langue Adaptée)");
  const voiceFrenchMsg = "J'ai obtenu une licence en droit privé et je maîtrise les règles de procédure pénale et la rédaction de procès-verbaux.";
  const resFrench = await smartJourneyService.processInterviewMessage(testStudentId, voiceFrenchMsg, {
    mode: 'voice',
    language: 'fr'
  });

  assert(resFrench.success === true, "3.1 Tour Français : Message oral français traité");
  assert(resFrench.reply.mode === 'voice', "3.2 Tour Français : Mode vocal validé");
  assert(resFrench.reply.hasAudio === true, "3.3 Tour Français : Audio MP3 attaché");
  // Vérification que la réponse est bien en français
  const isFrenchReply = /^[a-zA-ZÀ-ÿ\s0-9'.,!?:;()\-]+$/.test(resFrench.reply.text.replace(/[\n\r]/g, ' '));
  assert(isFrenchReply, "3.4 Tour Français : Moulsot répond expressément en Français (Pas de Darija imposée)");
  assert(resFrench.reply.text.toLowerCase().includes('droit') || resFrench.reply.text.toLowerCase().includes('juridique') || resFrench.reply.text.toLowerCase().includes('prévôté') || resFrench.reply.text.toLowerCase().includes('territoriale'), "3.5 Tour Français : Réponse contextualisée sur le droit et les enquêtes");

  console.log("\n📌 ÉTAPE 4 : Conversation Vocale en Arabe Standard (Fusha)");
  const voiceArabicMsg = "تخصصت في مجال المعلوميات وتأمين الشبكات وإدارة السيرفرات وقواعد البيانات.";
  const resArabic = await smartJourneyService.processInterviewMessage(testStudentId, voiceArabicMsg, {
    mode: 'voice',
    language: 'ar'
  });

  assert(resArabic.success === true, "4.1 Tour Arabe : Message informatique traité");
  assert(resArabic.reply.hasAudio === true, "4.2 Tour Arabe : Audio MP3 attaché");
  assert(resArabic.reply.text.includes('المعلوميات') || resArabic.reply.text.includes('التقنية') || resArabic.reply.text.includes('العلمية'), "4.3 Tour Arabe : Contextualisation Police Scientifique & Cyber");

  console.log("\n📌 ÉTAPE 5 : Enrichissement Réel et Persistance dans le Dossier de l'Élève");
  const finalJourney = await smartJourneyService.getStudentJourney(testStudentId);

  // Vérification de la persistance de l'historique commun
  assert(Array.isArray(finalJourney.conversation) && finalJourney.conversation.length >= 4, "5.1 Historique partagé conservé avec tous les tours");

  // Vérification de l'enrichissement des sections du dossier
  assert(finalJourney.sections.sportAssociatif.length > 0, "5.2 Section Sport & Combat enrichie par les déclarations orales");
  assert(finalJourney.sections.competencesTechniques.length > 0 || finalJourney.sections.scolaire.length > 0, "5.3 Section Technique/Scolaire enrichie par les déclarations orales");
  assert(finalJourney.bioLibre.length > 0, "5.4 Récit de vie (bioLibre) enrichi automatiquement");

  // Vérification de l'impact sur l'analyse globale et les recommandations
  assert(finalJourney.analysis !== null && typeof finalJourney.analysis === 'object', "5.5 Analyse de profil actualisée immédiatement");
  assert(finalJourney.analysis.recommendations && finalJourney.analysis.recommendations.length === 7, "5.6 Les 7 spécialités sont réévaluées avec les nouveaux éléments oraux");

  console.log('\n================================================================');
  console.log(`  BILAN DES TESTS : ${passedTests} / ${totalTests} TESTS VALIDÉS AVEC SUCCÈS`);
  console.log('================================================================\n');
}

run().catch(err => {
  console.error("Erreur exécution test pipeline vocal :", err);
  process.exit(1);
});
