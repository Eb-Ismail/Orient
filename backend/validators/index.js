// ==============================================================================
// ORIENT-GR - Validateurs de données côté serveur (Validation Logic)
// Contrôle d'intégrité, contraintes réglementaires et assainissement
// ==============================================================================

export function validateLogin(data) {
  const errors = [];
  if (!data.identifier || typeof data.identifier !== 'string' || data.identifier.trim().length === 0) {
    errors.push("Le matricule ou l'adresse e-mail est obligatoire.");
  }
  if (!data.password || typeof data.password !== 'string' || data.password.length < 4) {
    errors.push("Le mot de passe doit comporter au moins 4 caractères.");
  }
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateStudentLogin(data) {
  const errors = [];
  const cin = typeof data?.cin === 'string' ? data.cin.trim() : '';
  const matricule = typeof data?.matricule === 'string' ? data.matricule.trim() : '';

  if (!cin) {
    errors.push("Le numéro CIN est obligatoire.");
  } else if (!/^[A-Za-z0-9_-]{3,25}$/.test(cin)) {
    errors.push("Le format du numéro CIN est invalide.");
  }

  if (!matricule) {
    errors.push("Le matricule militaire est obligatoire.");
  } else if (!/^[A-Za-z0-9_-]{4,25}$/.test(matricule)) {
    errors.push("Le format du matricule militaire est invalide (ex: EG-2025-099).");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateStudent(data) {
  const errors = [];
  if (!data.matricule || !/^EG-\d{4}-\d{3}$|^[A-Z0-9-]{4,20}$/i.test(data.matricule)) {
    errors.push("Le matricule militaire est invalide (Format attendu ex: EG-2025-014).");
  }
  if (!data.nom || data.nom.trim().length < 2) {
    errors.push("Le nom de famille est obligatoire (minimum 2 caractères).");
  }
  if (!data.prenom || data.prenom.trim().length < 2) {
    errors.push("Le prénom est obligatoire (minimum 2 caractères).");
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("L'adresse e-mail institutionnelle est invalide.");
  }
  if (data.noteFormationPro !== undefined && data.noteFormationPro !== null && data.noteFormationPro !== '') {
    const note = parseFloat(data.noteFormationPro);
    if (isNaN(note) || note < 0 || note > 20) {
      errors.push("La note de formation doit être comprise entre 0 et 20.");
    }
  }
  if (data.aptitudePhysique !== undefined && data.aptitudePhysique !== null && data.aptitudePhysique !== '') {
    const note = parseFloat(data.aptitudePhysique);
    if (isNaN(note) || note < 0 || note > 20) {
      errors.push("La note d'aptitude physique doit être comprise entre 0 et 20.");
    }
  }
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateQuestion(data) {
  const errors = [];
  if (!data.enonce || data.enonce.trim().length < 10) {
    errors.push("L'énoncé de la question doit comporter au moins 10 caractères.");
  }
  if (!data.domaineId && !data.domaineCode) {
    errors.push("Le domaine de compétence évalué est requis.");
  }

  const isSubjective = data.typeQuestion === 'QUESTION_SUBJECTIVE';
  if (!isSubjective) {
    if (!data.options || !Array.isArray(data.options) || data.options.length < 2) {
      errors.push("Une question objective doit comporter au minimum 2 options de réponse.");
    } else {
      const hasCorrect = data.options.some(opt => opt.EstCorrecte || opt.estCorrecte);
      if (!hasCorrect) {
        errors.push("Au moins une option de réponse doit être marquée comme correcte.");
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateTestAnswer(data) {
  const errors = [];
  if (!data.questionId) {
    errors.push("Identifiant de la question requis.");
  }
  if (data.optionId === undefined && data.optionId === null && !data.texteReponse && !data.reponseTexte) {
    errors.push("Une réponse sélectionnée ou saisie est requise.");
  }
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateSpecialty(data) {
  const errors = [];
  if (!data.code || data.code.trim().length < 3) {
    errors.push("Le code de la spécialité est obligatoire (minimum 3 caractères).");
  }
  if (!data.intitule || data.intitule.trim().length < 3) {
    errors.push("L'intitulé de la spécialité est obligatoire.");
  }
  if (!data.description || data.description.trim().length < 10) {
    errors.push("La description opérationnelle doit comporter au moins 10 caractères.");
  }

  // Validation des poids de notation
  const w1 = data.poidsNotesAcademiques !== undefined ? parseFloat(data.poidsNotesAcademiques) : 0.25;
  const w2 = data.poidsRaisonnement !== undefined ? parseFloat(data.poidsRaisonnement) : 0.30;
  const w3 = data.poidsCompetencesSpecifiques !== undefined ? parseFloat(data.poidsCompetencesSpecifiques) : 0.25;
  const w4 = data.poidsSituationsPro !== undefined ? parseFloat(data.poidsSituationsPro) : 0.20;

  if (isNaN(w1) || isNaN(w2) || isNaN(w3) || isNaN(w4) || w1 < 0 || w2 < 0 || w3 < 0 || w4 < 0) {
    errors.push("Les coefficients de notation doivent être des valeurs numériques positives.");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateCondition(data) {
  const errors = [];
  const validTypes = [
    'TAILLE_MIN', 'TAILLE_MAX', 'POIDS_MEDICAL', 'VISION', 'APTITUDE_PHYSIQUE',
    'COMPETENCE_TECHNIQUE', 'NOTE_MIN_FORMATION', 'NOTE_MIN_MATIERE',
    'MEDICAL', 'SCORE_MIN_DOMAINE', 'CLASSEMENT_MAX', 'AUTRE'
  ];

  if (!data.typeCondition || !validTypes.includes(data.typeCondition)) {
    errors.push("Le type de condition d'éligibilité est invalide.");
  }
  if (!data.seuil || String(data.seuil).trim().length === 0) {
    errors.push("Le seuil réglementaire de la condition est requis.");
  }
  if (!data.description || data.description.trim().length < 5) {
    errors.push("La description explicative de la condition est obligatoire.");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
