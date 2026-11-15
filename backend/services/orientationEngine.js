// ==============================================================================
// ORIENT-GR - Moteur d'Orientation & Algorithme Décisionnel Multicritère
// Combinaison : Tests, Notes académiques, Compétences pratiques, Préférences & Éligibilité
// ==============================================================================

import { mockStore } from '../lib/db.js';
import { CODE_ALIASES } from '../validators/bankValidator.js';

const CANONICAL_DOMAINS = {
  'LOGIQUE': 'الاستدلال المنطقي',
  'OBSERVATION': 'التحليل والملاحظة',
  'ATTENTION': 'التركيز والانتباه',
  'DECISION': 'حل المشكلات واتخاذ القرار',
  'ROUTE_MOTO': 'السلامة الطرقية وقيادة الدراجات',
  'PJ_ENQUETE': 'الشرطة القضائية والتحري',
  'INFORMATIQUE': 'المعلوماتية والمهارات الرقمية',
  'COMMUNICATION': 'التواصل والتكوين',
  'SECRETARIAT': 'الإدارة والسكرتارية',
  'DISCIPLINE': 'المواقف المهنية والانضباط'
};

/**
 * Calcule les résultats détaillés par domaine de compétences
 * @param {Array} userAnswers Réponses fournies par l'élève
 * @param {Array} questions Questions du test
 * @param {Array} evaluations Évaluations manuelles pour questions subjectives
 */
export function calculateDomainScores(userAnswers = [], questions = [], evaluations = []) {
  const domainScores = {};

  // Initialisation standardisée à partir des 10 domaines de la banque de questions
  Object.entries(CANONICAL_DOMAINS).forEach(([code, intitule]) => {
    domainScores[code] = {
      DomaineCode: code,
      DomaineIntitule: intitule,
      TotalQuestions: 0,
      CorrectQuestions: 0,
      PointsObtenus: 0,
      PointsMax: 0,
      Pourcentage: 0
    };
  });

  questions.forEach(q => {
    const rawCode = q.DomaineCode || (mockStore.domaines?.find(d => d.DomaineId === q.DomaineId)?.Code) || 'LOGIQUE';
    const domCode = CODE_ALIASES[rawCode] || rawCode;
    if (!domainScores[domCode]) {
      domainScores[domCode] = {
        DomaineCode: domCode,
        DomaineIntitule: CANONICAL_DOMAINS[domCode] || q.DomaineIntitule || domCode,
        TotalQuestions: 0,
        CorrectQuestions: 0,
        PointsObtenus: 0,
        PointsMax: 0,
        Pourcentage: 0
      };
    }

    const maxPts = q.Points || 1;
    domainScores[domCode].TotalQuestions += 1;
    domainScores[domCode].PointsMax += maxPts;

    const answer = userAnswers.find(a => a.questionId === q.QuestionId || a.QuestionId === q.QuestionId);

    if (q.TypeQuestion === 'QUESTION_SUBJECTIVE') {
      // Question subjective : chercher l'évaluation de l'évaluateur autorisé
      const evalItem = evaluations.find(e => e.QuestionId === q.QuestionId);
      if (evalItem && evalItem.PointsAttribues !== undefined) {
        domainScores[domCode].PointsObtenus += evalItem.PointsAttribues;
        if (evalItem.PointsAttribues >= maxPts * 0.5) {
          domainScores[domCode].CorrectQuestions += 1;
        }
      }
    } else if (answer) {
      // Question objective : vérifier la bonne réponse
      const correctOption = q.Options?.find(opt => opt.EstCorrecte);
      if (correctOption && (answer.optionId === correctOption.OptionId || answer.OptionIdSelectionnee === correctOption.OptionId)) {
        domainScores[domCode].CorrectQuestions += 1;
        domainScores[domCode].PointsObtenus += maxPts;
      }
    }
  });

  // Calcul des pourcentages finaux par domaine
  return Object.values(domainScores).map(d => {
    const pct = d.PointsMax > 0 ? Math.round((d.PointsObtenus / d.PointsMax) * 100) : 0;
    return {
      ...d,
      Pourcentage: pct
    };
  });
}

/**
 * Calcule l'évaluation des compétences spécifiques (questions + compétences pratiques observées)
 */
export function calculateCompetencyProfiles(userAnswers, questions, student) {
  const compMap = {};

  // 1. Agréger à partir des questions taguées
  questions.forEach(q => {
    const tags = Array.isArray(q.CompetencesAssociees) ? q.CompetencesAssociees : [];
    const maxPts = q.Points || 1;

    const answer = userAnswers.find(a => a.questionId === q.QuestionId || a.QuestionId === q.QuestionId);
    const correctOption = q.Options?.find(opt => opt.EstCorrecte);
    const isCorrect = correctOption && (answer?.optionId === correctOption.OptionId || answer?.OptionIdSelectionnee === correctOption.OptionId);

    tags.forEach(tag => {
      if (!compMap[tag]) {
        compMap[tag] = { nom: tag, pointsObtenus: 0, pointsMax: 0, score: 70, source: 'TEST' };
      }
      compMap[tag].pointsMax += maxPts;
      if (isCorrect) compMap[tag].pointsObtenus += maxPts;
    });
  });

  // 2. Intégrer les compétences pratiques observées lors de la formation (sur échelle de 1 à 5)
  if (student.CompetencesPratiques && typeof student.CompetencesPratiques === 'object') {
    for (const [key, level] of Object.entries(student.CompetencesPratiques)) {
      const pctFrom5 = Math.round((level / 5) * 100);
      compMap[key] = {
        nom: key,
        pointsObtenus: level,
        pointsMax: 5,
        score: pctFrom5,
        source: 'FORMATION_PRATIQUE'
      };
    }
  }

  // Calcul du score pour chaque compétence
  const result = [];
  for (const item of Object.values(compMap)) {
    const score = item.source === 'TEST' && item.pointsMax > 0
      ? Math.round((item.pointsObtenus / item.pointsMax) * 100)
      : item.score;
    result.push({
      nom: item.nom,
      score,
      source: item.source
    });
  }

  return result;
}

/**
 * Calcule le niveau de confiance dans les données disponibles et signale les informations manquantes
 */
export function calculateDataConfidence(student, questions, userAnswers) {
  const missing = [];
  let totalDataPoints = 6;
  let presentDataPoints = 0;

  // 1. Note académique générale
  if (student.NoteFormationPro !== null && student.NoteFormationPro !== undefined) {
    presentDataPoints++;
  } else {
    missing.push("Note académique globale de formation manquante");
  }

  // 2. Évaluation de l'aptitude physique
  if (student.AptitudePhysique !== null && student.AptitudePhysique !== undefined) {
    presentDataPoints++;
  } else {
    missing.push("Note d'aptitude physique non renseignée");
  }

  // 3. Statut médical certifié
  if (student.StatutMedical) {
    presentDataPoints++;
  } else {
    missing.push("Statut médical SIGYCOP non certifié");
  }

  // 4. Contrôle de la vision (SIGYCOP Y)
  if (student.VisionSIGYCOP_Y !== null && student.VisionSIGYCOP_Y !== undefined) {
    presentDataPoints++;
  } else {
    missing.push("Résultat officiel du contrôle de la vision non consigné");
  }

  // 5. Compétences pratiques évaluées
  if (student.CompetencesPratiques && Object.keys(student.CompetencesPratiques).length > 0) {
    presentDataPoints++;
  } else {
    missing.push("Grille des compétences pratiques de formation non complétée");
  }

  // 6. Test d'orientation complété
  if (userAnswers && userAnswers.length >= questions.length && questions.length > 0) {
    presentDataPoints++;
  } else {
    missing.push("Évaluation de tests psychotechniques ou opérationnels incomplète");
  }

  // 7. Données biométriques et administratives candidat (Taille, Poids, Âge)
  totalDataPoints = 7;
  if (student.TailleCm && student.PoidsKg && student.Age) {
    presentDataPoints++;
  } else {
    missing.push("Informations biométriques du candidat à vérifier (taille, poids ou âge)");
  }

  const confidenceScore = Math.round((presentDataPoints / totalDataPoints) * 100);
  const isIncomplete = missing.length > 0;

  return {
    confidenceScore,
    isIncomplete,
    missingFields: missing
  };
}

/**
 * Évalue une condition d'éligibilité unitaire avec la logique stricte à trois états :
 * - « Condition satisfaite »
 * - « Condition non satisfaite »
 * - « Condition à vérifier » (si donnée manquante ou condition provisoire/non validée)
 */
export function evaluateSingleCondition(cond, student, domainScoreMap) {
  let status = 'SATISFAITE'; // 'SATISFAITE' | 'NON_SATISFAITE' | 'A_VERIFIER'
  let labelStatus = 'Condition satisfaite';
  let actualValue = null;
  let isDataMissing = false;

  // 1. Récupération de la valeur réelle
  switch (cond.TypeCondition) {
    case 'TAILLE_MIN':
    case 'TAILLE_MAX':
      actualValue = student.TailleCm;
      if (actualValue === null || actualValue === undefined || actualValue === '') isDataMissing = true;
      break;

    case 'AGE_MIN':
    case 'AGE_MAX':
      actualValue = student.Age;
      if (actualValue === null || actualValue === undefined || actualValue === '') isDataMissing = true;
      break;

    case 'POIDS_MIN':
    case 'POIDS_MAX':
    case 'POIDS_MEDICAL':
      actualValue = student.PoidsKg;
      if (actualValue === null || actualValue === undefined || actualValue === '') isDataMissing = true;
      break;

    case 'IMC_MIN':
    case 'IMC_MAX':
      actualValue = student.IMC || (student.PoidsKg && student.TailleCm ? Math.round((student.PoidsKg / Math.pow(student.TailleCm / 100, 2)) * 10) / 10 : null);
      if (actualValue === null || actualValue === undefined || actualValue === '') isDataMissing = true;
      break;

    case 'VISION':
    case 'VISION_ACUITE':
    case 'VISION_SIGYCOP':
      actualValue = student.VisionSIGYCOP_Y ?? student.AcuiteVisuelle;
      if (actualValue === null || actualValue === undefined || actualValue === '') isDataMissing = true;
      break;

    case 'NOTE_MIN_FORMATION':
      actualValue = student.NoteFormationPro;
      if (actualValue === null || actualValue === undefined) isDataMissing = true;
      break;

    case 'NOTE_MIN_MATIERE':
      if (student.MoyennesMatieres && student.MoyennesMatieres[cond.CibleCondition] !== undefined) {
        actualValue = student.MoyennesMatieres[cond.CibleCondition];
      } else {
        isDataMissing = true;
      }
      break;

    case 'APTITUDE_PHYSIQUE':
    case 'NOTE_MIN_SPORT':
      actualValue = student.AptitudePhysique;
      if (actualValue === null || actualValue === undefined) isDataMissing = true;
      break;

    case 'MEDICAL':
      actualValue = student.StatutMedical;
      if (!actualValue) isDataMissing = true;
      break;

    case 'SCORE_MIN_DOMAINE':
      actualValue = domainScoreMap[cond.CibleCondition];
      if (actualValue === undefined || actualValue === null) isDataMissing = true;
      break;

    case 'CLASSEMENT_MAX':
      actualValue = student.ClassementInitial;
      if (actualValue === null || actualValue === undefined) isDataMissing = true;
      break;

    case 'COMPETENCE_TECHNIQUE':
      if (student.CompetencesPratiques && student.CompetencesPratiques[cond.CibleCondition] !== undefined) {
        actualValue = student.CompetencesPratiques[cond.CibleCondition];
      } else {
        isDataMissing = true;
      }
      break;

    default:
      actualValue = null;
      isDataMissing = true;
  }

  // 2. RÈGLE CRITIQUE : Si la donnée n'est pas renseignée OU si la condition est provisoire démo -> « Condition à vérifier »
  if (isDataMissing || cond.StatutValidation === 'PROVISOIRE_DEMO' || cond.StatutValidation === 'A_VERIFIER') {
    status = 'A_VERIFIER';
    labelStatus = isDataMissing
      ? 'Condition à vérifier (Donnée physique ou administrative absente)'
      : 'Condition à vérifier (Paramètre provisoire de démonstration non officiel)';
    return {
      conditionId: cond.ConditionId,
      description: cond.Description,
      type: cond.TypeCondition,
      cible: cond.CibleCondition,
      requis: cond.Seuil,
      obtenu: actualValue ?? 'Non renseigné',
      estObligatoire: cond.EstObligatoire,
      sourceOfficielle: cond.SourceOfficielle || 'Non spécifiée',
      statutValidation: cond.StatutValidation,
      status,
      labelStatus
    };
  }

  // 3. Comparaison mathématique / textuelle si la donnée est présente et officielle
  let satisfies = true;
  const targetThreshold = parseFloat(cond.Seuil);
  const actualNumeric = parseFloat(actualValue);

  if (!isNaN(targetThreshold) && !isNaN(actualNumeric)) {
    if (cond.Operateur === '>=') satisfies = actualNumeric >= targetThreshold;
    else if (cond.Operateur === '<=') satisfies = actualNumeric <= targetThreshold;
    else if (cond.Operateur === '==') satisfies = actualNumeric === targetThreshold;
  } else {
    if (cond.Operateur === '==') satisfies = String(actualValue).toUpperCase() === String(cond.Seuil).toUpperCase();
  }

  if (satisfies) {
    status = 'SATISFAITE';
    labelStatus = 'Condition satisfaite';
  } else {
    status = 'NON_SATISFAITE';
    labelStatus = 'Condition non satisfaite';
  }

  return {
    conditionId: cond.ConditionId,
    description: cond.Description,
    type: cond.TypeCondition,
    cible: cond.CibleCondition,
    requis: cond.Seuil,
    obtenu: actualValue,
    estObligatoire: cond.EstObligatoire,
    sourceOfficielle: cond.SourceOfficielle,
    statutValidation: cond.StatutValidation,
    status,
    labelStatus
  };
}

/**
 * Moteur décisionnel d'orientation par spécialité
 * Combine : Notes académiques, Tests psychotechniques, Compétences spécifiques, Situations, Préférences & Conditions
 */
export function matchStudentToSpecialties(
  student,
  domainScores,
  specialites = mockStore.specialites,
  conditions = mockStore.conditions,
  competencyProfiles = []
) {
  const recommendations = [];

  const domainScoreMap = {};
  domainScores.forEach(ds => {
    domainScoreMap[ds.DomaineCode] = ds.Pourcentage;
    // Support des alias bidirectionnels
    Object.entries(CODE_ALIASES).forEach(([alias, target]) => {
      if (target === ds.DomaineCode) {
        domainScoreMap[alias] = ds.Pourcentage;
      }
    });
  });

  // Mapper les préférences de l'élève
  const studentPrefs = Array.isArray(student.PreferencesSpecialites) ? student.PreferencesSpecialites : [];
  const prefMap = {};
  studentPrefs.forEach(p => {
    prefMap[p.code] = { rang: p.rang, motivation: p.motivation };
  });

  specialites.forEach(spec => {
    if (!spec.EstActive) return;

    // 1. Évaluation exhaustive des conditions d'éligibilité
    const specConditions = conditions.filter(c => c.SpecialiteId === spec.SpecialiteId);
    const evaluatedConditions = specConditions.map(cond => evaluateSingleCondition(cond, student, domainScoreMap));

    const satisfiedConditions = evaluatedConditions.filter(c => c.status === 'SATISFAITE');
    const unsatisfiedConditions = evaluatedConditions.filter(c => c.status === 'NON_SATISFAITE');
    const toVerifyConditions = evaluatedConditions.filter(c => c.status === 'A_VERIFIER');

    // 2. Détermination de l'éligibilité réglementaire
    let statutEligibilite = 'ELIGIBLE';
    const mandatoryFails = unsatisfiedConditions.filter(c => c.estObligatoire);

    if (mandatoryFails.length > 0) {
      statutEligibilite = 'NON_ELIGIBLE';
    } else if (toVerifyConditions.some(c => c.estObligatoire)) {
      statutEligibilite = 'A_VERIFIER';
    } else if (unsatisfiedConditions.length > 0) {
      statutEligibilite = 'SOUS_RESERVE';
    }

    // 3. Calcul du Score d'Adéquation Multicritère Pondéré (Poids configurables validés)
    // Poids par défaut équilibrés si non renseignés
    const wAcademic = spec.PoidsNotesAcademiques ?? 0.25;
    const wReasoning = spec.PoidsRaisonnement ?? 0.30;
    const wSkills = spec.PoidsCompetencesSpecifiques ?? 0.25;
    const wSituations = spec.PoidsSituationsPro ?? 0.20;

    // Normalisation de la somme des poids
    const totalWeights = (wAcademic + wReasoning + wSkills + wSituations) || 1.0;
    const normWAcademic = wAcademic / totalWeights;
    const normWReasoning = wReasoning / totalWeights;
    const normWSkills = wSkills / totalWeights;
    const normWSituations = wSituations / totalWeights;

    // A. Score Académique (Matières pertinentes ou note générale)
    let academicScorePct = 70;
    if (spec.MatieresAcademiquesPertinentes && Array.isArray(spec.MatieresAcademiquesPertinentes) && spec.MatieresAcademiquesPertinentes.length > 0 && student.MoyennesMatieres) {
      let subjSum = 0;
      let subjCoefSum = 0;
      spec.MatieresAcademiquesPertinentes.forEach(m => {
        const grade = student.MoyennesMatieres[m.matiere];
        if (grade !== undefined && grade !== null) {
          subjSum += (grade / 20) * 100 * (m.coef || 1.0);
          subjCoefSum += (m.coef || 1.0);
        }
      });
      academicScorePct = subjCoefSum > 0 ? (subjSum / subjCoefSum) : ((student.NoteFormationPro || 14) / 20) * 100;
    } else {
      academicScorePct = ((student.NoteFormationPro || 14) / 20) * 100;
    }

    // B. Score Raisonnement & Analyse (Logique & Décision)
    const logicPct = domainScoreMap['LOGIQUE'] ?? 75;
    const decPct = domainScoreMap['DECISION'] ?? logicPct;
    const numPct = domainScoreMap['INFORMATIQUE'] ?? domainScoreMap['NUMERIQUE'] ?? 75;
    const reasoningScorePct = (logicPct * 0.6) + (decPct * 0.4);

    // C. Score Compétences Spécifiques
    const obsPct = domainScoreMap['OBSERVATION'] ?? 75;
    const attPct = domainScoreMap['ATTENTION'] ?? 75;
    const routePct = domainScoreMap['ROUTE_MOTO'] ?? 75;
    const pjPct = domainScoreMap['PJ_ENQUETE'] ?? domainScoreMap['PROCEDURE'] ?? 75;
    const infoPct = domainScoreMap['INFORMATIQUE'] ?? domainScoreMap['TECHNIQUE'] ?? 75;
    const commPct = domainScoreMap['COMMUNICATION'] ?? 75;
    const secPct = domainScoreMap['SECRETARIAT'] ?? 75;
    const discPct = domainScoreMap['DISCIPLINE'] ?? domainScoreMap['SITUATION'] ?? 75;

    let skillsScorePct = 70;
    if (spec.Code === 'SPEC-PJ') skillsScorePct = (pjPct * 0.5) + (obsPct * 0.3) + (logicPct * 0.2);
    else if (spec.Code === 'SPEC-DROIT') skillsScorePct = (pjPct * 0.6) + (logicPct * 0.4);
    else if (spec.Code === 'SPEC-INFO' || spec.Code === 'SPEC-SEC-INFO') skillsScorePct = (infoPct * 0.6) + (logicPct * 0.25) + (commPct * 0.15);
    else if (spec.Code === 'SPEC-SEC-ADMIN') skillsScorePct = (secPct * 0.5) + (commPct * 0.3) + (infoPct * 0.2);
    else if (spec.Code === 'SPEC-MOTARD' || spec.Code === 'SPEC-ROUTE') skillsScorePct = (routePct * 0.5) + (obsPct * 0.3) + (attPct * 0.2);
    else if (spec.Code === 'SPEC-GEH') skillsScorePct = (discPct * 0.4) + (attPct * 0.35) + (routePct * 0.25);
    else if (spec.Code === 'SPEC-GSI') skillsScorePct = (discPct * 0.35) + (decPct * 0.35) + (attPct * 0.3);
    else if (spec.Code === 'SPEC-PSIG' || spec.Code === 'SPEC-GM') skillsScorePct = (decPct * 0.4) + (discPct * 0.35) + (obsPct * 0.25);
    else if (spec.Code === 'SPEC-INSTRUCTEUR') skillsScorePct = (commPct * 0.45) + (discPct * 0.35) + (logicPct * 0.2);
    else skillsScorePct = (obsPct + infoPct + pjPct + commPct + discPct) / 5;

    // D. Score Situations Professionnelles
    const situationScorePct = domainScoreMap['DISCIPLINE'] ?? domainScoreMap['SITUATION'] ?? decPct;

    // Calcul du score global d'adéquation (0 - 100)
    const rawFitScore = (academicScorePct * normWAcademic) +
                        (reasoningScorePct * normWReasoning) +
                        (skillsScorePct * normWSkills) +
                        (situationScorePct * normWSituations);
    const fitScore = Math.min(100, Math.max(0, Math.round(rawFitScore * 10) / 10));

    // 4. Points forts & Axes d'amélioration
    const competencesFortes = [];
    const competencesADevelopper = [];

    if (academicScorePct >= 75) competencesFortes.push("Excellence académique et juridique");
    else if (academicScorePct < 65) competencesADevelopper.push("Mise à niveau académique recommandée");

    if (reasoningScorePct >= 80) competencesFortes.push("Haute capacité d'analyse déductive et logique");
    else if (reasoningScorePct < 65) competencesADevelopper.push("Méthodologie de résolution de problèmes");

    if (situationScorePct >= 80) competencesFortes.push("Discernement opérationnel et déontologie solides");
    else if (situationScorePct < 65) competencesADevelopper.push("Maîtrise du stress en intervention");

    if (skillsScorePct >= 80) competencesFortes.push("Aptitudes techniques spécifiques maîtrisées");
    else if (skillsScorePct < 65) competencesADevelopper.push("Pratique des protocoles techniques");

    // 5. Explication des principaux facteurs
    const facteursPrincipaux = [
      `Notes académiques : ${Math.round(academicScorePct)}% (Poids ${Math.round(normWAcademic * 100)}%)`,
      `Raisonnement & analyse : ${Math.round(reasoningScorePct)}% (Poids ${Math.round(normWReasoning * 100)}%)`,
      `Compétences de spécialité : ${Math.round(skillsScorePct)}% (Poids ${Math.round(normWSkills * 100)}%)`,
      `Jugement situationnel : ${Math.round(situationScorePct)}% (Poids ${Math.round(normWSituations * 100)}%)`
    ];

    // 6. Prise en compte distincte des préférences de l'élève
    const preference = prefMap[spec.Code] || null;
    let avisPreference = "Spécialité non mentionnée dans les premiers vœux personnels.";
    if (preference) {
      avisPreference = `Vœu n°${preference.rang} exprimé par l'élève. Motivation : "${preference.motivation || 'Non détaillée'}".`;
    }

    // 7. Formulation de l'avis institutionnel
    let avis = '';
    if (statutEligibilite === 'NON_ELIGIBLE') {
      const motifs = mandatoryFails.map(c => c.description).join(' ; ');
      avis = `Orientation immédiatement non réalisable : condition obligatoire non satisfaite (${motifs}). Aide à la décision pour la commission d'affectation.`;
    } else if (statutEligibilite === 'A_VERIFIER') {
      const aVerifierList = toVerifyConditions.map(c => c.description).join(' ; ');
      avis = `Orientation sous réserve de validation préalable des conditions médicales ou administratives : ${aVerifierList}.`;
    } else if (statutEligibilite === 'SOUS_RESERVE') {
      avis = `Profil potentiellement adapté (adéquation ${fitScore}%), sous réserve de consolidation des prérequis indicatifs.`;
    } else if (fitScore >= 85) {
      avis = `Forte adéquation opérationnelle (${fitScore}%). L'élève réunit l'ensemble des conditions réglementaires et démontre les aptitudes requises.`;
    } else {
      avis = `Adéquation conforme aux exigences fondamentales de l'unité (${fitScore}%). Orientation envisageable selon les places offertes au classement.`;
    }

    recommendations.push({
      SpecialiteId: spec.SpecialiteId,
      SpecialiteCode: spec.Code,
      Intitule: spec.Intitule,
      Subdivision: spec.Subdivision,
      Icone: spec.Icone,
      PlacesDisponibles: spec.PlacesDisponibles,
      ScoreCompatibilite: fitScore,
      StatutEligibilite: statutEligibilite,
      ConditionsSatisfaites: satisfiedConditions,
      ConditionsNonSatisfaites: unsatisfiedConditions,
      ConditionsAVerifier: toVerifyConditions,
      CompetencesFortes: competencesFortes,
      CompetencesADevelopper: competencesADevelopper,
      FacteursPrincipaux: facteursPrincipaux,
      PreferenceEleve: preference,
      AvisPreference: avisPreference,
      AvisSysteme: avis,
      EstImmediatementRealisable: statutEligibilite === 'ELIGIBLE' || statutEligibilite === 'SOUS_RESERVE'
    });
  });

  // Tri par score d'adéquation décroissant
  recommendations.sort((a, b) => {
    // Les spécialités non éligibles viennent après les éligibles
    if (a.StatutEligibilite === 'NON_ELIGIBLE' && b.StatutEligibilite !== 'NON_ELIGIBLE') return 1;
    if (b.StatutEligibilite === 'NON_ELIGIBLE' && a.StatutEligibilite !== 'NON_ELIGIBLE') return -1;
    return b.ScoreCompatibilite - a.ScoreCompatibilite;
  });

  // Attribution du rang d'orientation
  recommendations.forEach((r, idx) => {
    r.RangCompatibilite = idx + 1;
  });

  return recommendations;
}
