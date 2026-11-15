// ==============================================================================
// Script de compilation et validation des 140 questions QCM en arabe
// ==============================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { questionsLogique } from '../data/categories/cat01_logique.js';
import { questionsObservation } from '../data/categories/cat02_observation.js';
import { questionsAttention } from '../data/categories/cat03_attention.js';
import { questionsProblemes } from '../data/categories/cat04_problemes.js';
import { questionsRouteMoto } from '../data/categories/cat05_route_moto.js';
import { questionsPjEnquete } from '../data/categories/cat06_pj_enquete.js';
import { questionsInformatique } from '../data/categories/cat07_informatique.js';
import { questionsCommunication } from '../data/categories/cat08_communication.js';
import { questionsSecretariat } from '../data/categories/cat09_secretariat.js';
import { questionsDiscipline } from '../data/categories/cat10_discipline.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXPECTED_DISTRIBUTION = {
  'الاستدلال المنطقي': 20,
  'التحليل والملاحظة': 15,
  'التركيز والانتباه': 15,
  'حل المشكلات واتخاذ القرار': 15,
  'السلامة الطرقية وقيادة الدراجات': 15,
  'الشرطة القضائية والتحري': 15,
  'المعلوماتية والمهارات الرقمية': 15,
  'التواصل والتكوين': 10,
  'الإدارة والسكرتارية': 5,
  'المواقف المهنية والانضباط': 15
};

const allQuestions = [
  ...questionsLogique,
  ...questionsObservation,
  ...questionsAttention,
  ...questionsProblemes,
  ...questionsRouteMoto,
  ...questionsPjEnquete,
  ...questionsInformatique,
  ...questionsCommunication,
  ...questionsSecretariat,
  ...questionsDiscipline
];

console.log(`\n======================================================`);
console.log(`VALIDATION ET COMPILATION DU BANQUE DES 140 QUESTIONS`);
console.log(`======================================================`);

if (allQuestions.length !== 140) {
  throw new Error(`ERREUR: Nombre total de questions attendu 140, trouvé ${allQuestions.length}`);
}

const ids = new Set();
const codes = new Set();
const categoryCounts = {};

allQuestions.forEach((q, index) => {
  // 1. Validation ID
  if (!q.id || ids.has(q.id)) {
    throw new Error(`ERREUR: ID invalide ou dupliqué (${q.id}) à la question ${index + 1}`);
  }
  ids.add(q.id);

  // 2. Validation Code
  if (!q.code || codes.has(q.code)) {
    throw new Error(`ERREUR: Code invalide ou dupliqué (${q.code}) à la question ${index + 1}`);
  }
  codes.add(q.code);

  // 3. Validation Catégorie
  if (!EXPECTED_DISTRIBUTION[q.categorie]) {
    throw new Error(`ERREUR: Catégorie inconnue "${q.categorie}" pour ${q.code}`);
  }
  categoryCounts[q.categorie] = (categoryCounts[q.categorie] || 0) + 1;

  // 4. Validation Texte et Explication
  if (!q.texte || q.texte.trim().length < 15) {
    throw new Error(`ERREUR: Texte question trop court ou vide pour ${q.code}`);
  }
  if (!q.explication || q.explication.trim().length < 15) {
    throw new Error(`ERREUR: Explication trop courte ou vide pour ${q.code}`);
  }

  // 5. Validation Difficulté
  if (!['سهل', 'متوسط', 'صعب'].includes(q.difficulte)) {
    throw new Error(`ERREUR: Difficulté invalide "${q.difficulte}" pour ${q.code}`);
  }

  // 6. Validation Options
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    throw new Error(`ERREUR: La question ${q.code} doit contenir exactement 4 choix.`);
  }

  const correctAnswers = q.options.filter(opt => opt.estCorrecte === true);
  if (correctAnswers.length !== 1) {
    throw new Error(`ERREUR: La question ${q.code} doit avoir exactement 1 bonne réponse (trouvé ${correctAnswers.length}).`);
  }

  // 7. Validation Spécialités et Pondération
  if (!Array.isArray(q.specialites_ponderation) || q.specialites_ponderation.length === 0) {
    throw new Error(`ERREUR: Spécialités manquantes pour ${q.code}`);
  }
});

// Vérification de la distribution par catégorie
console.log('\nVérification de la répartition par catégorie :');
for (const [cat, expectedCount] of Object.entries(EXPECTED_DISTRIBUTION)) {
  const actualCount = categoryCounts[cat] || 0;
  console.log(`- ${cat.padEnd(35, ' ')}: ${actualCount} / ${expectedCount}`);
  if (actualCount !== expectedCount) {
    throw new Error(`Écart dans la catégorie "${cat}": attendu ${expectedCount}, trouvé ${actualCount}`);
  }
}

// 1. Sauvegarde du fichier JSON officiel
const jsonPath = path.resolve(__dirname, '../data/questions_140_arabe.json');
fs.writeFileSync(jsonPath, JSON.stringify(allQuestions, null, 2), 'utf-8');
console.log(`\n[OK] Fichier JSON créé avec succès : ${jsonPath} (${allQuestions.length} questions)`);

// 2. Exportation JS dans backend/data/questionsBankArabic.js
const jsPath = path.resolve(__dirname, '../data/questionsBankArabic.js');
const jsContent = `// ==============================================================================
// BANQUE OFFICIELLE DE 140 QUESTIONS QCM EN ARABE POUR ORIENT-G
// ==============================================================================
// Généré automatiquement par compile_questions_140.js
// Total questions : 140

export const questionsBank140 = ${JSON.stringify(allQuestions, null, 2)};

export default questionsBank140;
`;
fs.writeFileSync(jsPath, jsContent, 'utf-8');
console.log(`[OK] Exportation JS créée : ${jsPath}`);

// 3. Exportation de compatibilité avec mockStore et testService
const arabic140LegacyPath = path.resolve(__dirname, '../lib/arabicQuestionBank140.js');
const legacyQuestions = allQuestions.map(q => {
  return {
    QuestionId: q.id,
    TestId: 1,
    Code: q.code,
    Enonce: q.texte,
    ContexteSituationnel: q.categorie,
    DomaineId: q.categorie_code === 'LOGIQUE' ? 1 :
               q.categorie_code === 'OBSERVATION' ? 2 :
               q.categorie_code === 'ATTENTION' ? 3 :
               q.categorie_code === 'DECISION' ? 4 :
               q.categorie_code === 'ROUTE_MOTO' ? 5 :
               q.categorie_code === 'PJ_ENQUETE' ? 6 :
               q.categorie_code === 'INFORMATIQUE' ? 7 :
               q.categorie_code === 'COMMUNICATION' ? 8 :
               q.categorie_code === 'SECRETARIAT' ? 9 : 10,
    DomaineCode: q.categorie_code,
    DomaineNom: q.categorie,
    DomaineIntitule: q.categorie,
    TypeQuestion: 'QCM_UNIQUE',
    Difficulte: q.difficulte_code,
    DifficulteNiveau: q.difficulte === 'سهل' ? 1 : q.difficulte === 'متوسط' ? 2 : 3,
    DifficulteLabel: q.difficulte,
    DifficulteArabe: q.difficulte,
    DifficulteCode: q.difficulte_code,
    Points: q.coefficient >= 1.5 ? 2 : 1,
    Coefficient: q.coefficient,
    TempsLimiteSecondes: 90,
    Explication: q.explication,
    Competences: q.competences,
    CompetencesAssociees: q.competences,
    SpecialitesPonderation: q.specialites_ponderation,
    SpecialitesAssociees: q.specialites_ponderation.map(s => s.code),
    EstActive: true,
    EstArchivee: false,
    Options: q.options.map(o => ({
      OptionId: o.id,
      QuestionId: q.id,
      Lettre: o.lettre,
      LettreOption: o.lettre,
      LettreArabe: o.lettre_ar,
      LettreOptionArabe: o.lettre_ar,
      Libelle: o.texte,
      EnonceOption: o.texte,
      EstCorrecte: o.estCorrecte
    }))
  };
});

const legacyContent = `// Banque de 140 questions adaptées pour le service testService
export const arabicQuestionBank140 = ${JSON.stringify(legacyQuestions, null, 2)};
export default arabicQuestionBank140;
`;
fs.writeFileSync(arabic140LegacyPath, legacyContent, 'utf-8');
console.log(`[OK] Exportation de compatibilité créée : ${arabic140LegacyPath}`);

console.log(`\nCOMPILATION ET VALIDATION RÉUSSIES : 140 / 140 QUESTIONS PARFAITES !\n`);
