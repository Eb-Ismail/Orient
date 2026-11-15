// ==============================================================================
// ORIENT-GR - Validateur Officiel de la Banque des 140 Questions QCM en Arabe
// Exigence 5 : Validation stricte garantissant exactement 140 questions actives
// ==============================================================================

export const EXPECTED_DISTRIBUTION = {
  'LOGIQUE': { nom: 'الاستدلال المنطقي', count: 20 },
  'OBSERVATION': { nom: 'التحليل والملاحظة', count: 15 },
  'ATTENTION': { nom: 'التركيز والانتباه', count: 15 },
  'DECISION': { nom: 'حل المشكلات واتخاذ القرار', count: 15 },
  'ROUTE_MOTO': { nom: 'السلامة الطرقية وقيادة الدراجات', count: 15 },
  'PJ_ENQUETE': { nom: 'الشرطة القضائية والتحري', count: 15 },
  'INFORMATIQUE': { nom: 'المعلوماتية والمهارات الرقمية', count: 15 },
  'COMMUNICATION': { nom: 'التواصل والتكوين', count: 10 },
  'SECRETARIAT': { nom: 'الإدارة والسكرتارية', count: 5 },
  'DISCIPLINE': { nom: 'المواقف المهنية والانضباط', count: 15 }
};

export const CODE_ALIASES = {
  'ANALYSE_OBSERVATION': 'OBSERVATION',
  'CONCENTRATION_ATTENTION': 'ATTENTION',
  'RESOLUTION_PROBLEMES': 'DECISION',
  'SECURITE_ROUTIERE_MOTO': 'ROUTE_MOTO',
  'POLICE_JUDICIAIRE': 'PJ_ENQUETE',
  'INFORMATIQUE_DIGITAL': 'INFORMATIQUE',
  'COMMUNICATION_FORMATION': 'COMMUNICATION',
  'ADMINISTRATION_SECRETARIAT': 'SECRETARIAT',
  'DISCIPLINE_SITUATION_PRO': 'DISCIPLINE',
  'الاستدلال المنطقي': 'LOGIQUE',
  'التحليل والملاحظة': 'OBSERVATION',
  'التركيز والانتباه': 'ATTENTION',
  'حل المشكلات واتخاذ القرار': 'DECISION',
  'السلامة الطرقية وقيادة الدراجات': 'ROUTE_MOTO',
  'الشرطة القضائية والتحري': 'PJ_ENQUETE',
  'المعلوماتية والمهارات الرقمية': 'INFORMATIQUE',
  'التواصل والتكوين': 'COMMUNICATION',
  'الإدارة والسكرتارية': 'SECRETARIAT',
  'المواقف المهنية والانضباط': 'DISCIPLINE'
};

export const DOMAIN_ALIASES = CODE_ALIASES;
export const TOTAL_EXPECTED = 140;

/**
 * Valide l'intégrité globale et unitaire de la banque des 140 questions
 * @param {Array} questions - Liste des questions à valider
 * @returns {Object} { isValid, totalCount, activeCount, errors, warnings, categoryCounts }
 */
export function validateQuestionBank(questions = []) {
  const errors = [];
  const warnings = [];
  const categoryCounts = {};
  const seenIds = new Set();
  const seenCodes = new Set();
  const seenTexts = new Set();

  if (!Array.isArray(questions)) {
    return {
      isValid: false,
      totalCount: 0,
      activeCount: 0,
      errors: ['La banque de questions n\'est pas un tableau valide.'],
      categoryCounts: {}
    };
  }

  const activeQuestions = questions.filter(q => q.EstActive !== false && !q.EstArchivee);
  const totalCount = questions.length;
  const activeCount = activeQuestions.length;

  // 1. Validation du total exact de 140 questions actives initiales
  if (activeCount !== TOTAL_EXPECTED) {
    errors.push(`Nombre de questions actives invalide : attendu exactement ${TOTAL_EXPECTED}, trouvé ${activeCount}.`);
  }

  // Initialisation des compteurs de catégories
  Object.keys(EXPECTED_DISTRIBUTION).forEach(code => {
    categoryCounts[code] = 0;
  });

  // 2. Validation unitaire de chaque question
  questions.forEach((q, idx) => {
    const qIndexStr = `[Question index ${idx + 1}]`;

    // Identifiant
    const qId = q.QuestionId || q.id;
    if (!qId) {
      errors.push(`${qIndexStr} : Identifiant unique manquant.`);
    } else if (seenIds.has(qId)) {
      errors.push(`${qIndexStr} : Identifiant dupliqué (${qId}).`);
    } else {
      seenIds.add(qId);
    }

    // Code
    const code = q.Code || q.code;
    if (!code) {
      errors.push(`${qIndexStr} (ID: ${qId}) : Code question manquant.`);
    } else if (seenCodes.has(code)) {
      errors.push(`${qIndexStr} : Code dupliqué (${code}).`);
    } else {
      seenCodes.add(code);
    }

    // Catégorie
    const rawCat = q.DomaineCode || q.categorie_code;
    const catCode = CODE_ALIASES[rawCat] || rawCat;
    if (!catCode || !EXPECTED_DISTRIBUTION[catCode]) {
      errors.push(`${qIndexStr} (${code}) : Catégorie invalide ou non reconnue (${rawCat}).`);
    } else {
      categoryCounts[catCode] = (categoryCounts[catCode] || 0) + 1;
    }

    // Texte en arabe
    const text = (q.Enonce || q.texte || '').trim();
    if (!text || text.length < 15) {
      errors.push(`${qIndexStr} (${code}) : Énoncé en arabe manquant ou trop court.`);
    } else if (seenTexts.has(text)) {
      errors.push(`${qIndexStr} (${code}) : Énoncé dupliqué détecté.`);
    } else {
      seenTexts.add(text);
    }

    // Choix de réponses
    const options = q.Options || q.options;
    if (!Array.isArray(options) || options.length !== 4) {
      errors.push(`${qIndexStr} (${code}) : Doit contenir exactement 4 choix de réponses (reçu ${options ? options.length : 0}).`);
    } else {
      let correctCount = 0;
      options.forEach((opt, optIdx) => {
        const optText = (opt.EnonceOption || opt.texte || '').trim();
        if (!optText) {
          errors.push(`${qIndexStr} (${code}) Option ${optIdx + 1} : Texte de réponse vide.`);
        }
        if (opt.EstCorrecte === true || opt.estCorrecte === true) {
          correctCount++;
        }
      });

      if (correctCount !== 1) {
        errors.push(`${qIndexStr} (${code}) : Doit comporter exactement 1 bonne réponse unique (trouvé ${correctCount}).`);
      }
    }

    // Explication en arabe
    const explication = (q.Explication || q.explication || '').trim();
    if (!explication) {
      warnings.push(`${qIndexStr} (${code}) : Explication de la réponse absente.`);
    }

    // Difficulté
    const diff = q.Difficulte || q.difficulte;
    if (!diff) {
      errors.push(`${qIndexStr} (${code}) : Niveau de difficulté manquant.`);
    }

    // Compétences
    const comp = q.CompetencesAssociees || q.competences;
    if (!Array.isArray(comp) || comp.length === 0) {
      warnings.push(`${qIndexStr} (${code}) : Aucune compétence évaluée spécifiée.`);
    }

    // Spécialités associées et pondérations
    const spec = q.SpecialitesAssociees || q.specialites || q.specialites_ponderation;
    if (!Array.isArray(spec) || spec.length === 0) {
      warnings.push(`${qIndexStr} (${code}) : Aucune spécialité associée spécifiée.`);
    }
  });

  // 3. Validation de la répartition exacte par catégorie
  Object.entries(EXPECTED_DISTRIBUTION).forEach(([code, expected]) => {
    const actual = categoryCounts[code] || 0;
    if (actual !== expected.count) {
      errors.push(`Catégorie "${expected.nom}" (${code}) : attendu exactement ${expected.count} questions, trouvé ${actual}.`);
    }
  });

  return {
    isValid: errors.length === 0,
    totalCount,
    activeCount,
    errors,
    warnings,
    categoryCounts,
    expectedDistribution: EXPECTED_DISTRIBUTION
  };
}
