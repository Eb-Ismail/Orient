// ==============================================================================
// ORIENT-GR — PHASE 3.2 AUDIT FINAL & VALIDATION RÉELLE DU PIPELINE CONVERSATIONNEL
// Vérifications complètes :
// 1. Délais et gestion des timeouts Voxtral & Gemma (sans fallback silencieux)
// 2. Compréhension sémantique ouverte d'expériences inédites (sans mots-clés rigides)
// 3. Pertinence des recommandations de spécialités (critères officiels, compétences observées, éléments manquants, statut purement consultatif)
// 4. Simulation navigateur multi-tours trilingue (FR -> Darija -> EN) avec audio réel TTS
// ==============================================================================

import { voiceAiService } from '../lib/voiceAiService.js';
import { textAiService } from '../lib/textAiService.js';
import { voxtralAiService } from '../lib/voxtralAiService.js';
import { smartJourneyService } from '../lib/smartJourneyService.js';

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

async function runPhase32Audit() {
  console.log('\n====================================================================');
  console.log('PHASE 3.2 — AUDIT 1 : DÉLAIS, GESTION DES TIMEOUTS ET STATUT FALLBACK');
  console.log('====================================================================');

  const voxtralHealth = await voxtralAiService.checkHealth();
  const ollamaHealth = await textAiService.checkHealth();

  console.log(`- Serveur Voxtral (Port 8000) : ${voxtralHealth.online ? 'EN LIGNE' : 'HORS LIGNE'} (${voxtralHealth.latencyMs || 0}ms)`);
  console.log(`- Serveur Ollama Gemma 4:12B (Port 11434) : ${ollamaHealth.online ? 'EN LIGNE' : 'HORS LIGNE'} (${ollamaHealth.latencyMs || 0}ms)`);

  assert(typeof voxtralHealth === 'object', 'Vérification de santé Voxtral exécutée');
  assert(typeof ollamaHealth === 'object', 'Vérification de santé Ollama exécutée');

  // Test de génération Darija avec log précis de provider, latency et isFallback
  const testJourneyDarija = await smartJourneyService.getStudentJourney('audit-p32-darija');
  const tStart = Date.now();
  const darijaReplyObj = await voxtralAiService.generateDarijaReply({
    journey: testJourneyDarija,
    recognizedText: "عندي تجربة تطوعية فتنظيم مهرجان محلي ومساعدة الناس فالتوجيه والإسعافات الأولية"
  });
  const tDuration = Date.now() - tStart;

  console.log('\n[Audit Log - Génération Darija] :', {
    success: darijaReplyObj.success,
    model: darijaReplyObj.model,
    provider: darijaReplyObj.provider,
    isFallback: darijaReplyObj.isFallback,
    latencyMs: darijaReplyObj.latencyMs || tDuration,
    replyPreview: (darijaReplyObj.reply || '').substring(0, 100)
  });

  assert(darijaReplyObj.success === true, 'Génération Darija réussie');
  assert(darijaReplyObj.isFallback === false, 'La réponse Darija n\'est PAS un fallback local');
  assert(darijaReplyObj.reply && darijaReplyObj.reply.length > 30, 'Réponse Darija substantielle et structurée');

  console.log('\n====================================================================');
  console.log('PHASE 3.2 — AUDIT 2 : COMPRÉHENSION SÉMANTIQUE DE 3 EXPÉRIENCES INÉDITES');
  console.log('====================================================================');

  // Expérience inédite 1 : Pompier volontaire forêt / évacuation civile (test en Darija)
  console.log('\n--- Expérience Inédite 1 (Darija) : Évacuation incendie de forêt ---');
  const expInedite1 = "كنت متطوع ففرقة الإطفاء لمكافحة حرائق الغابات فالشمال، عشت مواقف خطيرة حاصرونا فيها النيران ودرت خطة إخلاء للمدنيين وتأمين خط رجوع للفريق تحت حرارة قوية ودخان كثيف.";
  const resExp1 = await voxtralAiService.generateDarijaReply({
    journey: testJourneyDarija,
    recognizedText: expInedite1
  });
  console.log(`Modèle utilisé : ${resExp1.model} | Provider : ${resExp1.provider} | Latence : ${resExp1.latencyMs}ms | Fallback : ${resExp1.isFallback}`);
  console.log(`Réponse générée :\n"${resExp1.reply}"`);
  
  assert(resExp1.success === true, 'Inférence sur expérience inédite 1 réussie');
  assert(resExp1.isFallback === false, 'Expérience inédite 1 traitée par modèle raisonné (isFallback: false)');
  const arChars1 = (resExp1.reply.match(/[\u0600-\u06FF]/g) || []).length;
  assert(arChars1 > 30, `La réponse est en Darija / arabe (${arChars1} caractères)`);
  assert(resExp1.reply.includes('?') || resExp1.reply.includes('؟'), 'La réponse pose une question ouverte pertinente');

  // Expérience inédite 2 : Maître-chien recherche de personnes et explosifs en montagne (test en Anglais)
  console.log('\n--- Expérience Inédite 2 (English) : K9 Mountain Search & Explosive Detection ---');
  const expInedite2 = "I worked with search and rescue tracking dogs in rugged mountainous terrain. I handled scent training for trapped hikers and explosive detection protocols under extreme weather.";
  const testJourneyEn = await smartJourneyService.getStudentJourney('audit-p32-en');
  const resExp2 = await textAiService.generateTextReply({
    journey: testJourneyEn,
    userMessage: expInedite2,
    language: 'en'
  });
  console.log(`Modèle utilisé : ${resExp2.model} | Provider : ${resExp2.provider} | Latence : ${resExp2.latencyMs}ms | Fallback : ${resExp2.isFallback}`);
  console.log(`Réponse générée :\n"${resExp2.reply}"`);

  assert(resExp2.success === true, 'Inférence sur expérience inédite 2 réussie');
  assert(resExp2.isFallback === false, 'Expérience inédite 2 traitée par Gemma 4:12B (isFallback: false)');
  const engWords = ['dog', 'k9', 'search', 'rescue', 'terrain', 'mountain', 'scent', 'tracking', 'gendarmerie', 'operational', 'unit', 'weather', 'specialty'];
  const hasSemantics2 = engWords.some(w => resExp2.reply.toLowerCase().includes(w));
  assert(hasSemantics2, 'Compréhension sémantique validée : vocabulaire lié au sauvetage, terrain ou K9');

  // Expérience inédite 3 : Maintenance électronique biomédicale hospitalière (test en Français)
  console.log('\n--- Expérience Inédite 3 (Français) : Maintenance biomédicale & capteurs de précision ---');
  const expInedite3 = "J'ai un diplôme en maintenance des équipements biomédicaux hospitaliers : calibrage de capteurs d'analyse sanguine, micro-soudure sur cartes électroniques de haute précision et diagnostic de pannes sous contrainte de temps stérile.";
  const testJourneyFr = await smartJourneyService.getStudentJourney('audit-p32-fr');
  const resExp3 = await textAiService.generateTextReply({
    journey: testJourneyFr,
    userMessage: expInedite3,
    language: 'fr'
  });
  console.log(`Modèle utilisé : ${resExp3.model} | Provider : ${resExp3.provider} | Latence : ${resExp3.latencyMs}ms | Fallback : ${resExp3.isFallback}`);
  console.log(`Réponse générée :\n"${resExp3.reply}"`);

  assert(resExp3.success === true, 'Inférence sur expérience inédite 3 réussie');
  assert(resExp3.isFallback === false, 'Expérience inédite 3 traitée par Gemma 4:12B (isFallback: false)');
  const frPstWords = ['scientifique', 'technique', 'pst', 'laboratoire', 'électronique', 'capteur', 'investigation', 'précision', 'matériel'];
  const hasSemantics3 = frPstWords.some(w => resExp3.reply.toLowerCase().includes(w));
  assert(hasSemantics3, 'Compréhension sémantique validée : corrélation avec la technique, laboratoire ou PST');

  console.log('\n====================================================================');
  console.log('PHASE 3.2 — AUDIT 3 : PERTINENCE DES RECOMMANDATIONS ET STATUT CONSULTATIF');
  console.log('====================================================================');

  const analysis = await smartJourneyService.generateProfileAnalysis('audit-p32-fr');
  assert(Array.isArray(analysis.recommendations), 'Liste des recommandations générée');
  assert(analysis.recommendations.length === 7, `Exactement 7 spécialités officielles analysées (obtenu: ${analysis.recommendations.length})`);

  // Vérification des champs requis pour chaque spécialité
  analysis.recommendations.forEach(spec => {
    assert(Array.isArray(spec.competencesObservees) && spec.competencesObservees.length > 0, `${spec.code} : competencesObservees renseignées`);
    assert(Array.isArray(spec.elementsManquants) && spec.elementsManquants.length > 0, `${spec.code} : elementsManquants renseignés`);
    assert(typeof spec.criteresOfficielsDoc === 'string' && spec.criteresOfficielsDoc.length > 15, `${spec.code} : criteresOfficielsDoc valide`);
    assert(spec.caractereConsultatif === true, `${spec.code} : caractereConsultatif est STRICTEMENT true`);
    assert(spec.estDecisionOfficielle === false, `${spec.code} : estDecisionOfficielle est STRICTEMENT false`);
    assert(spec.statutAvis === 'HYPOTHESE_CONSULTATIVE_IA', `${spec.code} : statutAvis = HYPOTHESE_CONSULTATIVE_IA`);
  });

  console.log(`\nExemple de recommandation #1 (${analysis.recommendations[0].nomFr}) :`, {
    code: analysis.recommendations[0].code,
    score: `${analysis.recommendations[0].scoreCompatibilite}%`,
    competencesObservees: analysis.recommendations[0].competencesObservees,
    elementsManquants: analysis.recommendations[0].elementsManquants,
    criteresOfficielsDoc: analysis.recommendations[0].criteresOfficielsDoc,
    cadreDecisionnel: analysis.recommendations[0].mentionValidationHumaine
  });

  console.log('\n====================================================================');
  console.log('PHASE 3.2 — AUDIT 4 : SIMULATION NAVIGATEUR MULTI-TOURS TRILINGUE AVEC AUDIO');
  console.log('====================================================================');

  const userIdClientSim = `browser-sim-${Date.now()}`;

  // Tour 1 : Français en mode vocal
  console.log('\n>>> TOUR 1 (Client Navigateur : Vocal Français)');
  const turn1Res = await smartJourneyService.processInterviewMessage(userIdClientSim, "Bonjour, je souhaite m'orienter vers la police scientifique et les technologies de pointe de la Gendarmerie.", {
    mode: 'voice',
    language: 'fr'
  });
  console.log(`- Modèle : ${turn1Res.model} | Latence : ${turn1Res.latencyMs}ms | Audio attaché : ${turn1Res.reply.hasAudio} (${(turn1Res.reply.audioBase64 || '').length} car.)`);
  console.log(`- Réponse Tour 1 : "${turn1Res.reply.text.substring(0, 80)}..."`);
  assert(turn1Res.success === true, 'Tour 1 (Vocal FR) réussi');
  assert(turn1Res.reply.hasAudio === true, 'Tour 1 : Audio TTS réel généré');
  assert(turn1Res.reply.audioBase64 && turn1Res.reply.audioBase64.length > 500, 'Tour 1 : Buffer audio MP3/WAV valide > 500 octets');

  // Tour 2 : Darija en mode vocal (Changement de langue en cours de route)
  console.log('\n>>> TOUR 2 (Client Navigateur : Bascule en Darija)');
  const turn2Res = await smartJourneyService.processInterviewMessage(userIdClientSim, "وعندي كذلك تجربة فصيانة الحواسيب والشبكات، واش هادشي كيعاون فالتحقيقات الرقمية ؟", {
    mode: 'voice',
    language: 'darija'
  });
  console.log(`- Modèle : ${turn2Res.model} | Latence : ${turn2Res.latencyMs}ms | Audio attaché : ${turn2Res.reply.hasAudio} (${(turn2Res.reply.audioBase64 || '').length} car.)`);
  console.log(`- Réponse Tour 2 : "${turn2Res.reply.text.substring(0, 80)}..."`);
  assert(turn2Res.success === true, 'Tour 2 (Vocal Darija) réussi');
  const arCharsTurn2 = (turn2Res.reply.text.match(/[\u0600-\u06FF]/g) || []).length;
  assert(arCharsTurn2 > 25, `Tour 2 : Réponse bien formulée en Darija / arabe (${arCharsTurn2} car.)`);
  assert(turn2Res.reply.hasAudio === true, 'Tour 2 : Audio TTS réel généré');

  // Tour 3 : Anglais en mode écrit (Bascule en Anglais et passage en mode écrit)
  console.log('\n>>> TOUR 3 (Client Navigateur : Bascule en Anglais, Mode Écrit)');
  const turn3Res = await smartJourneyService.processInterviewMessage(userIdClientSim, "I also practice endurance running and martial arts three times a week. How does this fit with tactical units?", {
    mode: 'text',
    language: 'en'
  });
  console.log(`- Modèle : ${turn3Res.model} | Latence : ${turn3Res.latencyMs}ms`);
  console.log(`- Réponse Tour 3 : "${turn3Res.reply.text.substring(0, 80)}..."`);
  assert(turn3Res.success === true, 'Tour 3 (Écrit EN) réussi');
  assert(turn3Res.conversation.length === 7, `Historique de conversation conservé : 7 messages (1 initial accueil + 3 élève + 3 IA)`);

  // Vérification de l'analyse finale après les 3 tours
  const finalJourney = await smartJourneyService.getStudentJourney(userIdClientSim);
  console.log(`\nCompétences déclarées extraites après 3 tours : ${finalJourney.analysis.competencesDeclarees.map(c => c.intitule).join(' | ')}`);
  assert(finalJourney.analysis.competencesDeclarees.length > 0, 'Dossier élève enrichi cumulativement au fil des 3 tours');
  assert(finalJourney.conversation.length === 7, 'Intégrité de l\'historique multi-tours préservée (7 messages)');

  console.log('\n====================================================================');
  console.log(`RÉSULTAT GLOBAL AUDIT PHASE 3.2 : ${passed} / ${total} VÉRIFICATIONS RÉUSSIES (${((passed / total) * 100).toFixed(1)}%)`);
  console.log('====================================================================\n');

  if (passed === total) {
    console.log('>>> TOUTES LES CONDITIONS DE LA PHASE 3.2 SONT FORMELLEMENT VALIDÉES. <<<');
    process.exit(0);
  } else {
    console.error(`>>> CERTAINS TESTS ONT ÉCHOUÉ : ${total - passed} ÉCHECS. <<<`);
    process.exit(1);
  }
}

runPhase32Audit().catch(err => {
  console.error('Erreur fatale audit Phase 3.2 :', err);
  process.exit(1);
});
