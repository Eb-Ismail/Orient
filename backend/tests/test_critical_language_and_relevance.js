// ==============================================================================
// TEST CRITIQUE — ROUTAGE LINGUISTIQUE STRICT & NON-RÉPÉTITION DES QUESTIONS
// Vérification du cas réel signalé par l'utilisateur (Darija, Bénévolat, Urgence médicale)
// ==============================================================================

import { voiceAiService } from '../lib/voiceAiService.js';
import { smartJourneyService } from '../lib/smartJourneyService.js';
import { voxtralAiService } from '../lib/voxtralAiService.js';
import { textAiService } from '../lib/textAiService.js';

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    passed++;
    console.log(`  ✓ PASS: ${message}`);
  } else {
    console.error(`  ✗ FAIL: ${message}`);
  }
}

async function runTests() {
  console.log('\n============================================================');
  console.log('TEST 1 : DÉTECTION LINGUISTIQUE DU MESSAGE DE L\'ÉLÈVE');
  console.log('============================================================');

  const darijaStudentMessage = 'شاركت مع مجموعة ديال المتطوعين فتنظيم تظاهرات رياضية ومساعدة الزوار. تعلمت كيفاش نتعامل مع الازدحام ونبقى هادئ ملي كيكون الضغط. فواحد المناسبة تعرض واحد الشخص لوعكة صحية، وعاونت فإبلاغ المسؤولين وتأمين المكان حتى وصلات المساعدة. هاد التجربة خلاتني نكتشف أهمية سرعة التواصل والانضباط والعمل الجماعي.';

  const detectedLangDarija = voiceAiService.detectLanguage(darijaStudentMessage, 'fr');
  assert(detectedLangDarija === 'darija', `Langue détectée pour le message arabe : "${detectedLangDarija}" (Attendu: darija)`);

  const frenchStudentMessage = "J'ai participé avec un groupe de bénévoles à l'organisation de manifestations sportives. J'ai appris à gérer la foule et garder mon calme lors d'une urgence médicale.";
  const detectedLangFr = voiceAiService.detectLanguage(frenchStudentMessage, 'darija');
  assert(detectedLangFr === 'fr', `Langue détectée pour le message français : "${detectedLangFr}" (Attendu: fr)`);

  const englishStudentMessage = "I volunteered with a team to organize sports events and assist visitors. I learned how to manage crowd pressure and respond to medical emergencies.";
  const detectedLangEn = voiceAiService.detectLanguage(englishStudentMessage, 'fr');
  assert(detectedLangEn === 'en', `Langue détectée pour le message anglais : "${detectedLangEn}" (Attendu: en)`);

  console.log('\n============================================================');
  console.log('TEST 2 : ENRICHISSEMENT DU DOSSIER ÉLÈVE SANS PERTE DE DONNÉES');
  console.log('============================================================');

  const journey = await smartJourneyService.getStudentJourney('test-user-darija-critique');
  smartJourneyService.extractAndEnrichStudentDossier(journey, darijaStudentMessage);

  assert(journey.sections.sportAssociatif && journey.sections.sportAssociatif.includes('المتطوعين'), 'Section sport/associatif enrichie avec le bénévolat et les événements');
  assert(journey.sections.responsabilitesEtDefis && journey.sections.responsabilitesEtDefis.includes('وعكة صحية'), 'Section responsabilités/défis enrichie avec l\'urgence médicale et le sang-froid');

  console.log('\n============================================================');
  console.log('TEST 3 : TRAITEMENT DE L\'ENTRETIEN EN MODE VOCAL (DARIJA)');
  console.log('============================================================');

  const voiceRes = await smartJourneyService.processInterviewMessage('test-user-darija-critique', darijaStudentMessage, {
    mode: 'voice',
    language: 'darija'
  });

  assert(voiceRes.success === true, 'processInterviewMessage (voice) a répondu avec succès');
  assert(voiceRes.reply && voiceRes.reply.text, 'Une réponse textuelle a été générée');

  const replyText = voiceRes.reply.text;
  const arabicCharCount = (replyText.match(/[\u0600-\u06FF]/g) || []).length;
  const isArabicResponse = arabicCharCount > 30;

  assert(isArabicResponse, `La réponse est bien en alphabet arabe / Darija (${arabicCharCount} caractères arabes)`);
  
  // Vérification de la non-présence du texte français générique erroné
  const containsGenericFrenchRepetition = replyText.includes("Merci pour ce partage d'expérience") || 
                                          replyText.includes("pouvez-vous me décrire une situation où vous avez dû travailler en équipe sous pression");
  assert(!containsGenericFrenchRepetition, 'La réponse ne contient PAS le texte de repli français erroné ni la question répétitive sous pression');

  // Vérification de la valorisation des compétences partagées
  const acknowledgesVolunteeringOrComposure = replyText.includes('متطوع') || replyText.includes('تطوع') || 
                                              replyText.includes('الازدحام') || replyText.includes('الضغط') || 
                                              replyText.includes('وعكة') || replyText.includes('صحية') || 
                                              replyText.includes('المتنقل') || replyText.includes('التدخل') ||
                                              replyText.includes('انضباط') || replyText.includes('الهدوء');
  assert(acknowledgesVolunteeringOrComposure, 'La réponse valorise explicitement le calme, l\'urgence médicale, la foule ou le bénévolat');

  console.log('\n============================================================');
  console.log('TEST 4 : TRAITEMENT DE L\'ENTRETIEN EN MODE ÉCRIT (DARIJA)');
  console.log('============================================================');

  const textRes = await smartJourneyService.processInterviewMessage('test-user-darija-critique-text', darijaStudentMessage, {
    mode: 'text',
    language: 'darija'
  });

  assert(textRes.success === true, 'processInterviewMessage (text) a répondu avec succès');
  const textReply = textRes.reply?.text || '';
  const textArCount = (textReply.match(/[\u0600-\u06FF]/g) || []).length;
  assert(textArCount > 30, `La réponse en mode écrit est également 100% en Darija (${textArCount} caractères arabes)`);

  const containsFrenchInTextMode = textReply.includes("Merci pour ce partage d'expérience") || textReply.includes("travailler en équipe sous pression");
  assert(!containsFrenchInTextMode, 'Le mode écrit n\'a pas basculé en français');

  console.log('\n============================================================');
  console.log('TEST 5 : ANALYSE DES COMPÉTENCES & RECOMMANDATIONS COHÉRENTES');
  console.log('============================================================');

  const analysis = await smartJourneyService.generateProfileAnalysis('test-user-darija-critique');
  assert(analysis && analysis.recommendations, 'L\'analyse de profil a généré des recommandations');
  
  const recSpecialties = (analysis.recommendations || []).map(r => r.code);
  const matchesTerrOrMob = recSpecialties.some(c => c.includes('TERR') || c.includes('MOB') || c.includes('INTERV'));
  assert(matchesTerrOrMob, `Recommandations ciblent bien les spécialités terrain/cohésion (${recSpecialties.join(', ')})`);

  console.log('\n============================================================');
  console.log(`RÉSULTAT TOTAL : ${passed} / ${total} tests réussis (${Math.round((passed / total) * 100)}%)`);
  console.log('============================================================\n');

  if (passed === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Erreur critique exécution tests:', err);
  process.exit(1);
});
