// ==============================================================================
// ORIENT-GR — Service d'Évaluation Présentielle & d'Analyse Post-Évaluation IA
// Analyse approfondie des notes présentielles, observations de jury et compétences
// Produit une recommandation POSITIF ou NEGATIF indépendante par commission
// Règle de transmission stricte : Seuls les dossiers POSITIFS sont transmis à l'ADMIN
// ==============================================================================

import { getDbPool } from '../lib/db.js';

export const commissionEvaluationService = {
  /**
   * Analyse IA post-évaluation présentielle pour un couple (Élève, Commission)
   * @param {Object} params
   * @param {Object} params.candidate - Données de l'élève
   * @param {Object} params.journey - Récit et compétences IA de l'élève
   * @param {Object} params.commission - Référentiel de la commission
   * @param {number|null} params.notePratique - Note test pratique /20
   * @param {number|null} params.noteEntretien - Note entretien présentiel /20
   * @param {number|null} params.noteComplementaire - Note optionnelle /20
   * @param {string|null} params.observations - Observations du jury
   * @param {string|null} params.commentairesComplementaires - Commentaires additionnels
   * @param {string} params.avisCommission - Avis du jury ('FAVORABLE_FORT', 'FAVORABLE', 'RESERVE', 'DEFAVORABLE')
   */
  performPostEvaluationAiAnalysis({
    candidate,
    journey = null,
    commission,
    notePratique = null,
    noteEntretien = null,
    noteComplementaire = null,
    observations = null,
    commentairesComplementaires = null,
    avisCommission = 'RESERVE'
  }) {
    // Règle fondamentale : "Ne jamais traiter une note manquante comme zéro.
    // Si l'évaluation est incomplète, afficher « ÉVALUATION INCOMPLÈTE »."
    if (notePratique === null || noteEntretien === null || isNaN(notePratique) || isNaN(noteEntretien)) {
      return {
        estComplet: false,
        recommandationIA: 'EVALUATION_INCOMPLETE',
        resumeAnalyseIA: 'Évaluation présentielle incomplète. La note du test pratique et la note de l\'entretien sont obligatoires avant analyse définitive.',
        justificationIA: 'L\'évaluation n\'a pas encore recueilli l\'intégralité des épreuves physiques obligatoires. Aucune recommandation définitive ni transmission ne peut être opérée en l\'état.',
        pointsForts: [],
        pointsFaibles: ['Épreuve pratique ou entretien non encore complété par la commission'],
        notesPrisesEnCompte: {
          notePratiqueSur20: notePratique,
          noteEntretienSur20: noteEntretien,
          noteComplementaireSur20: noteComplementaire,
          noteGlobaleSur20: null
        },
        observationsPrisesEnCompte: observations,
        dateAnalyseIA: new Date().toISOString(),
        modeleIAVersion: 'v1.0-2026',
        estTransmisAdmin: false
      };
    }

    // Calcul de la note globale pondérée (50% pratique, 50% entretien présentiel)
    let noteGlobale = Number(((notePratique * 0.5) + (noteEntretien * 0.5)).toFixed(2));
    if (noteComplementaire !== null && !isNaN(noteComplementaire)) {
      noteGlobale = Number(((notePratique * 0.45) + (noteEntretien * 0.45) + (noteComplementaire * 0.10)).toFixed(2));
    }

    // Extraction des compétences et diplômes du candidat
    const diplome = candidate?.DiplomeOrigine || 'Formation générale';
    const filiere = candidate?.FiliereEntree || 'Tronc commun';
    const nomComplet = `${candidate?.Prenom || ''} ${candidate?.Nom || ''}`.trim() || 'Candidat';
    const commNom = commission?.Nom || 'Commission spécialisée';
    const commCode = commission?.Code || 'COMM_GEN';

    // Critères d'éligibilité officiels de sélection :
    // 1. Note pratique >= 12/20
    // 2. Note entretien >= 12/20
    // 3. Note globale >= 12/20
    // 4. Avis jury différent de DEFAVORABLE
    const isNotePratiqueValidee = notePratique >= 12.0;
    const isNoteEntretienValidee = noteEntretien >= 12.0;
    const isNoteGlobaleValidee = noteGlobale >= 12.0;
    const isAvisFavorable = avisCommission === 'FAVORABLE_FORT' || avisCommission === 'FAVORABLE' || (avisCommission === 'RESERVE' && noteGlobale >= 13.5);

    const isPositif = isNotePratiqueValidee && isNoteEntretienValidee && isNoteGlobaleValidee && isAvisFavorable;

    const pointsForts = [];
    const pointsFaibles = [];

    if (notePratique >= 14) {
      pointsForts.push(`Excellente maîtrise pratique sur le terrain (${notePratique}/20).`);
    } else if (notePratique >= 12) {
      pointsForts.push(`Compétences pratiques opérationnelles validées (${notePratique}/20).`);
    } else {
      pointsFaibles.push(`Niveau pratique insuffisant face aux exigences techniques de l'unité (${notePratique}/20).`);
    }

    if (noteEntretien >= 14) {
      pointsForts.push(`Excellente posture militaire, clarté d'élocution et motivation affirmée (${noteEntretien}/20).`);
    } else if (noteEntretien >= 12) {
      pointsForts.push(`Aptitudes relationnelles et compréhension des missions conformes (${noteEntretien}/20).`);
    } else {
      pointsFaibles.push(`Difficultés d'argumentation ou réserves sur la maturité professionnelle (${noteEntretien}/20).`);
    }

    if (observations && observations.trim().length > 0) {
      pointsForts.push(`Avis circonstancié du jury : "${observations.trim().slice(0, 150)}"`);
    }

    let resumeAnalyseIA = '';
    let justificationIA = '';

    if (isPositif) {
      resumeAnalyseIA = `Candidature validée avec succès pour la ${commNom}. Performance solide aux épreuves pratiques (${notePratique}/20) et excellente prestation d'entretien (${noteEntretien}/20). Note globale : ${noteGlobale}/20.`;
      justificationIA = `Le profil de l'élève ${nomComplet} (Diplôme: ${diplome}, Filière: ${filiere}) démontre une adéquation probante avec le référentiel opérationnel de la ${commNom}. ` +
        `Les évaluations physiques confirment les aptitudes identifiées lors de l'entretien IA préliminaire. ` +
        `Le jury émet un avis favorable (${avisCommission}). Le dossier satisfait l'ensemble des critères d'admissibilité et fait l'objet d'une transmission automatique à l'Autorité de Commandement (ADMIN).`;
    } else {
      resumeAnalyseIA = `Candidature non retenue pour la ${commNom}. Les résultats obtenus (Pratique: ${notePratique}/20, Entretien: ${noteEntretien}/20, Moyenne: ${noteGlobale}/20) sont inférieurs aux seuils d'excellence requis.`;
      justificationIA = `Après examen physique et délibération de la ${commNom}, le niveau technique ou l'entretien de l'élève ${nomComplet} ne répond pas aux exigences de spécialité. ` +
        `Avis de la commission : ${avisCommission}. Conformément à la règle de gestion des candidatures, ce dossier est archivé exclusivement dans l'espace de la commission et N'EST PAS transmis à l'administration. ` +
        `Cette issue négative demeure strictement circonscrite à cette commission et n'obère en rien les résultats d'autres commissions auxquelles le candidat est affecté.`;
    }

    return {
      estComplet: true,
      recommandationIA: isPositif ? 'POSITIF' : 'NEGATIF',
      resumeAnalyseIA,
      justificationIA,
      pointsForts,
      pointsFaibles,
      notesPrisesEnCompte: {
        notePratiqueSur20: notePratique,
        noteEntretienSur20: noteEntretien,
        noteComplementaireSur20: noteComplementaire,
        noteGlobaleSur20: noteGlobale
      },
      observationsPrisesEnCompte: observations,
      dateAnalyseIA: new Date().toISOString(),
      modeleIAVersion: 'v1.0-2026',
      estTransmisAdmin: isPositif
    };
  }
};

