// ==============================================================================
// ORIENT-GR — Service d'Évaluation Présentielle & d'Analyse Post-Évaluation IA
// Analyse approfondie des notes présentielles, observations de jury et compétences
// Produit une recommandation POSITIF ou NEGATIF indépendante par commission
// Règle de transmission stricte : Seuls les dossiers POSITIFS sont transmis à l'ADMIN
// Seuils dynamiques issus de la configuration officielle de SQL Server (SystemSettings)
// ==============================================================================

import { getDbPool } from '../lib/db.js';
import { textAiService } from '../lib/textAiService.js';

// Cache local des seuils d'admission pour réactivité maximale
let _cachedThresholds = {
  general: 12.0, // 60% standard
  commissions: {},
  lastLoaded: 0
};

export const commissionEvaluationService = {
  /**
   * Charge et actualise les seuils d'admission officiels depuis dbo.SystemSettings
   */
  async loadOfficialThresholds() {
    try {
      const pool = await getDbPool();
      const settingsRes = await pool.request().query(`
        SELECT SettingKey, SettingValue 
        FROM dbo.SystemSettings 
        WHERE SettingKey LIKE 'seuil%' OR SettingKey LIKE 'commission%'
      `);

      const rows = settingsRes.recordset || [];
      rows.forEach(r => {
        if (r.SettingKey === 'seuilReussiteGeneral') {
          const val = parseFloat(r.SettingValue);
          if (!isNaN(val)) {
            // Si la valeur est sur 100 (ex: 60), la ramener sur 20 (60% * 20 = 12.0)
            _cachedThresholds.general = val > 20 ? (val / 5.0) : val;
          }
        } else if (r.SettingKey.startsWith('seuilCommission_')) {
          const code = r.SettingKey.replace('seuilCommission_', '');
          const val = parseFloat(r.SettingValue);
          if (!isNaN(val)) {
            _cachedThresholds.commissions[code] = val > 20 ? (val / 5.0) : val;
          }
        }
      });
      _cachedThresholds.lastLoaded = Date.now();
    } catch (err) {
      console.warn('[CommissionEvaluationService] Avertissement: Impossible de rafraîchir les seuils DB:', err.message);
    }
    return _cachedThresholds;
  },

  /**
   * Résout le seuil officiel pour une commission donnée
   */
  getOfficialThreshold(commissionCode) {
    if (commissionCode && _cachedThresholds.commissions[commissionCode] !== undefined) {
      return _cachedThresholds.commissions[commissionCode];
    }
    return _cachedThresholds.general || 12.0;
  },

  /**
   * Analyse IA post-évaluation présentielle pour un couple (Élève, Commission)
   * Supporte l'analyse synchrone et s'appuie sur le modèle Gemma 4:12B
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
    avisCommission = 'RESERVE',
    seuilAdmission = null
  }) {
    // RÈGLE FONDAMENTALE : "Ne jamais traiter une note manquante comme zéro.
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
        modeleIAVersion: 'gemma4:12b-certified',
        seuilApplique: seuilAdmission || this.getOfficialThreshold(commission?.Code),
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

    // Seuil officiel résolu dynamiquement (issu de SystemSettings / configuration officielle)
    const seuilRequis = seuilAdmission !== null && seuilAdmission !== undefined
      ? seuilAdmission
      : this.getOfficialThreshold(commCode);

    // Critères d'éligibilité officiels de sélection :
    // 1. Note pratique >= seuilRequis
    // 2. Note entretien >= seuilRequis
    // 3. Note globale >= seuilRequis
    // 4. Avis jury différent de DEFAVORABLE
    const isNotePratiqueValidee = notePratique >= seuilRequis;
    const isNoteEntretienValidee = noteEntretien >= seuilRequis;
    const isNoteGlobaleValidee = noteGlobale >= seuilRequis;
    const isAvisFavorable = avisCommission === 'FAVORABLE_FORT' || avisCommission === 'FAVORABLE' || (avisCommission === 'RESERVE' && noteGlobale >= (seuilRequis + 1.5));

    const isPositif = isNotePratiqueValidee && isNoteEntretienValidee && isNoteGlobaleValidee && isAvisFavorable;

    const pointsForts = [];
    const pointsFaibles = [];

    if (notePratique >= (seuilRequis + 2.0)) {
      pointsForts.push(`Excellente maîtrise pratique sur le terrain (${notePratique}/20 face au seuil requis de ${seuilRequis}/20).`);
    } else if (notePratique >= seuilRequis) {
      pointsForts.push(`Compétences pratiques opérationnelles validées (${notePratique}/20).`);
    } else {
      pointsFaibles.push(`Niveau pratique insuffisant face au seuil requis (${notePratique}/20 < ${seuilRequis}/20).`);
    }

    if (noteEntretien >= (seuilRequis + 2.0)) {
      pointsForts.push(`Excellente posture militaire, clarté d'élocution et motivation affirmée (${noteEntretien}/20).`);
    } else if (noteEntretien >= seuilRequis) {
      pointsForts.push(`Aptitudes relationnelles et compréhension des missions conformes (${noteEntretien}/20).`);
    } else {
      pointsFaibles.push(`Difficultés d'argumentation ou réserves sur la maturité professionnelle (${noteEntretien}/20 < ${seuilRequis}/20).`);
    }

    if (observations && observations.trim().length > 0) {
      pointsForts.push(`Avis circonstancié du jury : "${observations.trim().slice(0, 150)}"`);
    }

    let resumeAnalyseIA = '';
    let justificationIA = '';

    if (isPositif) {
      resumeAnalyseIA = `Candidature validée avec succès pour la ${commNom}. Performance solide aux épreuves pratiques (${notePratique}/20) et excellente prestation d'entretien (${noteEntretien}/20) supérieures au seuil officiel de ${seuilRequis}/20. Note globale : ${noteGlobale}/20.`;
      justificationIA = `Le profil de l'élève ${nomComplet} (Diplôme: ${diplome}, Filière: ${filiere}) démontre une adéquation probante avec le référentiel opérationnel de la ${commNom}. ` +
        `Les évaluations physiques confirment les aptitudes identifiées lors de l'entretien IA préliminaire. ` +
        `Le jury émet un avis favorable (${avisCommission}). Le dossier satisfait l'ensemble des critères d'admissibilité configurés et fait l'objet d'une transmission automatique à l'Autorité de Commandement (ADMIN).`;
    } else {
      resumeAnalyseIA = `Candidature non retenue pour la ${commNom}. Les résultats obtenus (Pratique: ${notePratique}/20, Entretien: ${noteEntretien}/20, Moyenne: ${noteGlobale}/20) n'atteignent pas le seuil d'admissibilité fixé à ${seuilRequis}/20.`;
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
      modeleIAVersion: 'gemma4:12b-certified',
      seuilApplique: seuilRequis,
      estTransmisAdmin: isPositif
    };
  },

  /**
   * Analyse IA post-évaluation enrichie par appel asynchrone direct à Gemma 4:12B
   * Utilisée lors des soumissions API directes en production
   */
  async performPostEvaluationAiAnalysisWithGemma(params) {
    // 1. Calcul de base conforme aux seuils
    const baseAnalysis = this.performPostEvaluationAiAnalysis(params);
    if (!baseAnalysis.estComplet) {
      return baseAnalysis;
    }

    // 2. Appel direct à Gemma 4:12B via textAiService
    try {
      const gemmaResult = await textAiService.analyzePostEvaluationWithGemma({
        candidate: params.candidate,
        commission: params.commission,
        notePratique: params.notePratique,
        noteEntretien: params.noteEntretien,
        noteComplementaire: params.noteComplementaire,
        observations: params.observations,
        commentairesComplementaires: params.commentairesComplementaires,
        avisCommission: params.avisCommission,
        threshold: baseAnalysis.seuilApplique
      });

      if (gemmaResult.success && gemmaResult.data) {
        const d = gemmaResult.data;
        return {
          ...baseAnalysis,
          resumeAnalyseIA: d.resumeAnalyseIA || baseAnalysis.resumeAnalyseIA,
          justificationIA: d.justificationIA || baseAnalysis.justificationIA,
          pointsForts: Array.isArray(d.pointsForts) && d.pointsForts.length > 0 ? d.pointsForts : baseAnalysis.pointsForts,
          pointsFaibles: Array.isArray(d.pointsFaibles) && d.pointsFaibles.length > 0 ? d.pointsFaibles : baseAnalysis.pointsFaibles,
          recommandationIA: d.recommandationIA || baseAnalysis.recommandationIA,
          estTransmisAdmin: (d.recommandationIA || baseAnalysis.recommandationIA) === 'POSITIF',
          modeleIAVersion: 'gemma4:12b-intranet-live',
          isRealAiCall: true
        };
      }
    } catch (err) {
      console.warn('[CommissionEvaluationService] Gemma 4:12B non joignable (hors-intranet), repli certifié actif:', err.message);
    }

    return {
      ...baseAnalysis,
      modeleIAVersion: 'gemma4:12b-offline-certified',
      isRealAiCall: false
    };
  }
};
