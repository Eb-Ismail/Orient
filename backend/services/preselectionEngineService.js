// ==============================================================================
// ORIENT-GR — Service Métier Central de Pré-sélection & Détection des Talents
// محرك الكشف عن المواهب والتحديد القبلي لتوجيه تلاميذ الدرك الملكي
// ==============================================================================

import { getDbPool, useSqlServer, mockStore } from '../lib/db.js';
import { coreRepository } from '../repositories/coreRepository.js';

// Référentiel officiel des 7 spécialités avec libellés et icônes
export const OFFICIAL_SPECIALTIES = {
  'SPEC-TERR': { code: 'SPEC-TERR', intitule: 'Gendarmerie Territoriale (الدرك الملكي الإقليمي)', domaine: "Généraliste / Sécurité Publique" },
  'SPEC-MOB': { code: 'SPEC-MOB', intitule: 'Gendarmerie Mobile (الدرك الملكي المتنقل)', domaine: "Maintien de l'ordre / Parcs Roulants" },
  'SPEC-MARIT': { code: 'SPEC-MARIT', intitule: 'Gendarmerie Maritime (الدرك الملكي البحري)', domaine: "Surveillance Côtière & Portuaire" },
  'SPEC-AIR': { code: 'SPEC-AIR', intitule: 'Gendarmerie Aérienne (الدرك الملكي الجوي)', domaine: "Sécurité Aéronautique & Bases" },
  'SPEC-PREV': { code: 'SPEC-PREV', intitule: 'Prévôté – Gendarmerie Militaire (الشرطة العسكرية)', domaine: "Discipline Militaire & PJ aux Armées" },
  'SPEC-PST': { code: 'SPEC-PST', intitule: 'Police Scientifique et Technique (الشرطة التقنية والعلمية)', domaine: "Criminalistique, SIC & Cyber" },
  'SPEC-INTERV': { code: 'SPEC-INTERV', intitule: "Unités d'Intervention et Spécialisées (وحدات التدخل والفرق الخاصة)", domaine: "Tactique & Intervention Spéciale" }
};

// Correspondance entre domaines techniques d'ateliers et spécialités officielles
export const DOMAIN_TO_OFFICIAL_SPECIALTY = {
  'CAT-INFO': 'SPEC-PST',       // Informatique & Réseaux -> Police Scientifique & Cyber
  'INFO_RESEAUX': 'SPEC-PST',
  'CAT-MECA': 'SPEC-MOB',       // Mécanique & Électricité Auto -> Maintenance Gendarmerie Mobile
  'MECA_AUTO': 'SPEC-MOB',
  'CAT-TELECOM': 'SPEC-PST',    // Télécom & Électronique -> Police Scientifique / SIC
  'ELEC_TELECOM': 'SPEC-PST',
  'CAT-LOG': 'SPEC-TERR',       // Logistique -> Unités Territoriales
  'LOG_MAINT': 'SPEC-TERR',
  'POLICE_SCIENTIFIQUE': 'SPEC-PST',
  'INTERVENTION': 'SPEC-INTERV',
  'DEFAULT': 'SPEC-TERR'
};

// Libellés conviviaux des statuts de pré-sélection
export const PRESELECTION_STATUS_LABELS = {
  'TALENT_CACHE': 'Talent Caché Détecté — Réserve Technique',
  'SPECIALISTE_CONFIRME': 'Spécialiste confirmé',
  'SOUS_SPECIALISATION_RECOMMANDEE': 'Sous-spécialisation recommandée',
  'EVAL_COMPLEMENTAIRE': 'Évaluation complémentaire nécessaire',
  'SERVICE_GENERAL': 'Service Général',
  'PRE_SELECTIONNE': 'Pré-sélectionné',
  'AFFECTATION_VALIDEE': 'Affectation validée',
  'PROPOSITION_REJETEE': 'Proposition rejetée'
};

function safeJson(raw, fallback) {
  if (raw === null || raw === undefined) return fallback;
  if (typeof raw !== 'string') return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export const preselectionEngineService = {
  /**
   * Calcule ou actualise la proposition de pré-sélection pour un élève
   * Croise : 1) Notes académiques, 2) Évaluations pratiques réelles, 3) Parcours IA
   */
  async calculateStudentPreselection(studentId) {
    const sId = parseInt(studentId, 10);
    if (!sId) throw new Error("Identifiant d'élève invalide.");

    const pool = await getDbPool();

    // 1. Récupération de l'élève depuis SQL Server
    const userRes = await pool.request()
      .input('Uid', sId)
      .query(`
        SELECT u.*, p.Nom AS PromotionNom, p.Code AS PromotionCode
        FROM dbo.Utilisateurs u
        LEFT JOIN dbo.Promotions p ON p.PromotionId = u.PromotionId
        WHERE u.UtilisateurId = @Uid
      `);

    const student = userRes.recordset[0];
    if (!student) {
      throw new Error(`Élève gendarme introuvable (ID: ${sId}).`);
    }

    // 2. Vérification d'une décision administrative existante et verrouillée
    const curProposalRes = await pool.request()
      .input('Uid', sId)
      .query(`SELECT TOP 1 * FROM dbo.OrientationProposals WHERE UtilisateurId = @Uid`);
    const existingProposal = curProposalRes.recordset[0];

    const isLocked = Boolean(
      existingProposal && (
        existingProposal.EstDecisionVerrouillee ||
        existingProposal.StatutArbitrage === 'VALIDEE_ADMIN' ||
        existingProposal.StatutArbitrage === 'REJETEE'
      )
    );

    // 3. Récupération des évaluations pratiques réelles (dbo.InstructorEvaluations)
    const evalsRes = await pool.request()
      .input('Uid', sId)
      .query(`
        SELECT e.*, w.Titre AS WorkshopTitre, w.Code AS WorkshopCode, w.CategoryId,
               u.Nom AS InstructeurNom, u.Prenom AS InstructeurPrenom, u.Matricule AS InstructeurMatricule
        FROM dbo.InstructorEvaluations e
        LEFT JOIN dbo.Workshops w ON w.WorkshopId = e.WorkshopId
        LEFT JOIN dbo.Utilisateurs u ON u.UtilisateurId = e.InstructeurId
        WHERE e.UtilisateurId = @Uid AND (e.NotePratique IS NOT NULL OR e.ScoresValidesJson IS NOT NULL)
        ORDER BY e.InstructorEvalId DESC
      `);

    const practicalEvaluations = evalsRes.recordset.map(row => {
      const parsedScores = safeJson(row.ScoresValidesJson, {});
      const parsedComps = safeJson(row.CompetencesValideesJson, []);
      const note = row.NotePratique !== null && row.NotePratique !== undefined
        ? Number(row.NotePratique)
        : (parsedScores.notePratique ? Number(parsedScores.notePratique) : null);

      return {
        evalId: row.InstructorEvalId,
        workshopId: row.WorkshopId,
        workshopCode: row.WorkshopCode,
        workshopTitre: row.WorkshopTitre || 'Atelier Pratique',
        categoryId: row.CategoryId || row.DomaineCode || 'CAT-INFO',
        notePratique: note,
        tempsMinutes: row.TempsMinutes || parsedScores.tempsMinutes || null,
        niveauAutonomie: row.NiveauAutonomie || parsedScores.niveauAutonomie || 'GUIDE',
        competencesValidees: Array.isArray(parsedComps) ? parsedComps : [],
        instructeurNom: row.InstructeurNom ? `${row.InstructeurPrenom || ''} ${row.InstructeurNom}`.trim() : 'Membre Évaluateur',
        instructeurMatricule: row.InstructeurMatricule,
        evaluateurNom: row.InstructeurNom ? `${row.InstructeurPrenom || ''} ${row.InstructeurNom}`.trim() : 'Membre Évaluateur',
        observations: row.CommentaireOfficiel || '',
        dateEvaluation: row.CreatedAt instanceof Date ? row.CreatedAt.toISOString() : row.CreatedAt
      };
    }).filter(e => e.notePratique !== null);

    // 4. Récupération des notes académiques initiales
    const moyennesMatieres = safeJson(student.MoyennesMatieres, {});
    const academicNotes = {
      droitPenal: moyennesMatieres.DroitPenal !== undefined ? Number(moyennesMatieres.DroitPenal) : null,
      procedurePenale: moyennesMatieres.ProcedurePenale !== undefined ? Number(moyennesMatieres.ProcedurePenale) : null,
      tirMSA: moyennesMatieres.TirMSA !== undefined ? Number(moyennesMatieres.TirMSA) : null,
      sport: moyennesMatieres.Sport !== undefined ? Number(moyennesMatieres.Sport) : (student.AptitudePhysique || null),
      informatique: moyennesMatieres.Informatique !== undefined ? Number(moyennesMatieres.Informatique) : null,
      conduite: moyennesMatieres.Conduite !== undefined ? Number(moyennesMatieres.Conduite) : null,
      expressionFr: moyennesMatieres.ExpressionFr !== undefined ? Number(moyennesMatieres.ExpressionFr) : null
    };

    // 5. Récupération des éléments du parcours IA (expériences déclarées, récits)
    const experiencesDeclarees = safeJson(student.ExperiencesDeclarees, []);
    const journeyRes = await pool.request()
      .input('Uid', sId)
      .query(`SELECT TOP 1 * FROM dbo.StudentJourneys WHERE UtilisateurId = @Uid`);
    const journey = journeyRes.recordset[0];
    const journeySnap = safeJson(journey?.DernierSnapshotJson, {});

    // 6. Calcul des indicateurs par domaine pratique
    const domainStats = {};
    const allValidatedSkills = new Set();
    let totalPracticalScore = 0;
    let maxPracticalScore = null;
    let lastEvaluatorName = null;

    practicalEvaluations.forEach(ev => {
      const dom = ev.categoryId || 'CAT-INFO';
      if (!domainStats[dom]) {
        domainStats[dom] = {
          domainCode: dom,
          count: 0,
          totalScore: 0,
          maxScore: 0,
          hasAutonome: false,
          skills: new Set(),
          evaluations: []
        };
      }
      domainStats[dom].count += 1;
      domainStats[dom].totalScore += ev.notePratique;
      domainStats[dom].maxScore = Math.max(domainStats[dom].maxScore, ev.notePratique);
      if (ev.niveauAutonomie === 'AUTONOME') {
        domainStats[dom].hasAutonome = true;
      }
      ev.competencesValidees.forEach(s => {
        domainStats[dom].skills.add(s);
        allValidatedSkills.add(s);
      });
      domainStats[dom].evaluations.push(ev);

      totalPracticalScore += ev.notePratique;
      if (maxPracticalScore === null || ev.notePratique > maxPracticalScore) {
        maxPracticalScore = ev.notePratique;
      }
      lastEvaluatorName = ev.instructeurNom;
    });

    const averagePracticalScore = practicalEvaluations.length > 0
      ? Math.round((totalPracticalScore / practicalEvaluations.length) * 10) / 10
      : null;

    // Détection du domaine dominant
    let bestDomain = null;
    let bestDomainAvg = 0;
    Object.keys(domainStats).forEach(dom => {
      const avg = domainStats[dom].totalScore / domainStats[dom].count;
      domainStats[dom].average = Math.round(avg * 10) / 10;
      domainStats[dom].skills = Array.from(domainStats[dom].skills);
      if (avg > bestDomainAvg) {
        bestDomainAvg = avg;
        bestDomain = domainStats[dom];
      }
    });

    // 7. Moteur d'Orientation & Détection selon FiliereEntree
    const filiere = student.FiliereEntree || 'NORMAL_BAC';
    let statutPreselection = 'SERVICE_GENERAL';
    let specialiteProposee = 'SPEC-TERR';
    let explicationTexte = '';
    const informationsManquantes = [];

    if (academicNotes.droitPenal === null) informationsManquantes.push('Note Droit Pénal non renseignée');
    if (academicNotes.sport === null) informationsManquantes.push('Aptitude Physique / Sport non renseignée');
    if (practicalEvaluations.length === 0) informationsManquantes.push('Aucune évaluation pratique sur atelier enregistrée');

    if (filiere === 'NORMAL_BAC') {
      // 4.1 Règle Élèves Normaux — Niveau Bac
      if (bestDomain && bestDomain.average >= 15.0 && bestDomain.hasAutonome && practicalEvaluations.length > 0) {
        statutPreselection = 'TALENT_CACHE';
        specialiteProposee = DOMAIN_TO_OFFICIAL_SPECIALTY[bestDomain.domainCode] || 'SPEC-PST';
        explicationTexte = `Talent technique détecté : l'élève présente une moyenne pratique remarquable de ${bestDomain.average}/20 dans le domaine (${bestDomain.domainCode}) avec un niveau d'autonomie attesté par la commission d'évaluation. Ce profil issu du baccalauréat révèle des aptitudes concrètes éligibles à la réserve technique de la spécialité officielle ${specialiteProposee}.`;
      } else if (practicalEvaluations.length > 0) {
        statutPreselection = 'SERVICE_GENERAL';
        specialiteProposee = 'SPEC-TERR';
        explicationTexte = `Moyenne pratique de ${averagePracticalScore}/20. Les évaluations actuelles ne franchissent pas le seuil de détection de talent caché (>= 15/20 avec autonomie complète). Orientation polyvalente recommandée vers la Gendarmerie Territoriale.`;
      } else {
        statutPreselection = 'EVAL_COMPLEMENTAIRE';
        specialiteProposee = 'SPEC-TERR';
        explicationTexte = `Élève au profil Bac standard. Aucune évaluation pratique de terrain n'est encore enregistrée. Évaluation complémentaire en atelier nécessaire avant arbitrage de spécialisation.`;
      }
    } else if (filiere === 'SPECIALISTE_ISTA') {
      // 4.2 Règle Spécialistes — Diplômés ISTA/OFPPT
      const diplome = student.DiplomeOrigine || 'Diplôme Technique ISTA';
      const domFormation = student.DomaineFormation || student.SpecialiteOrigine || '';

      if (practicalEvaluations.length > 0) {
        if (averagePracticalScore >= 14.0 && (bestDomain?.hasAutonome || practicalEvaluations.some(e => e.niveauAutonomie === 'AUTONOME'))) {
          statutPreselection = 'SPECIALISTE_CONFIRME';
          specialiteProposee = DOMAIN_TO_OFFICIAL_SPECIALTY[bestDomain?.domainCode] || (domFormation.toLowerCase().includes('meca') ? 'SPEC-MOB' : 'SPEC-PST');
          explicationTexte = `Spécialiste confirmé : Diplôme d'origine '${diplome}' validé sur le terrain avec une moyenne pratique de ${averagePracticalScore}/20 et une autonomie confirmée par la commission d'évaluation. Adéquation totale avec les exigences de la spécialité ${specialiteProposee}.`;
        } else if (averagePracticalScore >= 11.0) {
          statutPreselection = 'SOUS_SPECIALISATION_RECOMMANDEE';
          specialiteProposee = DOMAIN_TO_OFFICIAL_SPECIALTY[bestDomain?.domainCode] || 'SPEC-PST';
          explicationTexte = `Compétences théoriques ISTA avérées ('${diplome}'), mais la moyenne pratique de ${averagePracticalScore}/20 recommande un approfondissement technique ciblé ou une sous-spécialisation avant confirmation définitive.`;
        } else {
          statutPreselection = 'EVAL_COMPLEMENTAIRE';
          specialiteProposee = DOMAIN_TO_OFFICIAL_SPECIALTY[bestDomain?.domainCode] || 'SPEC-TERR';
          explicationTexte = `Résultats en atelier (${averagePracticalScore}/20) inférieurs au standard d'autonomie requis pour le niveau spécialiste. Nouvelle séance d'évaluation pratique requise.`;
        }
      } else {
        statutPreselection = 'EVAL_COMPLEMENTAIRE';
        specialiteProposee = domFormation.toLowerCase().includes('meca') ? 'SPEC-MOB' : 'SPEC-PST';
        explicationTexte = `Titulaire d'un diplôme d'origine '${diplome}' (${domFormation}). En attente de passage sur les ateliers pratiques dédiés pour confirmation des compétences de terrain.`;
      }
    }

    // Si une décision administrative officielle est déjà verrouillée, préserver le statut officiel
    let statutFinal = statutPreselection;
    let specialiteFinale = specialiteProposee;
    if (isLocked && existingProposal) {
      if (existingProposal.StatutArbitrage === 'VALIDEE_ADMIN') {
        statutFinal = 'AFFECTATION_VALIDEE';
        specialiteFinale = existingProposal.SpecialiteProposeeCode || specialiteProposee;
        explicationTexte = `Affectation officielle validée par le Commandement pour la spécialité ${specialiteFinale}. Justification : ${existingProposal.JustificationAdmin || existingProposal.DecisionAdmin || 'Conforme aux délibérations de la commission'}.`;
      } else if (existingProposal.StatutArbitrage === 'REJETEE') {
        statutFinal = 'PROPOSITION_REJETEE';
        explicationTexte = `Proposition administrative rejetée par le Commandement. Motif : ${existingProposal.JustificationAdmin || 'Dossier réorienté'}.`;
      }
    }

    const validatedSkillsArray = Array.from(allValidatedSkills);
    const explicationPayload = {
      texte: explicationTexte,
      statutPreselection: statutFinal,
      filiereEntree: filiere,
      diplomeOrigine: student.DiplomeOrigine,
      etablissementOrigine: student.EtablissementOrigine,
      domaineTechnique: bestDomain?.domainCode || 'GENERAL',
      moyennePratique: averagePracticalScore,
      meilleureNotePratique: maxPracticalScore,
      nombreEvaluationsPratiques: practicalEvaluations.length,
      competencesValidees: validatedSkillsArray,
      informationsManquantes,
      decisionVerrouillee: isLocked,
      dateCalcul: new Date().toISOString(),
      versionMoteur: 'v1.2-PRESELECT'
    };

    // 8. Persistance dans dbo.OrientationProposals si la décision n'est pas verrouillée
    if (!isLocked) {
      if (existingProposal) {
        await pool.request()
          .input('Id', existingProposal.ProposalId)
          .input('Spec', specialiteFinale)
          .input('StatutArb', 'PROPOSEE')
          .input('StatutPresel', statutFinal)
          .input('Domaine', bestDomain?.domainCode || 'GENERAL')
          .input('MoyPrat', averagePracticalScore)
          .input('MaxPrat', maxPracticalScore)
          .input('CompsJson', JSON.stringify(validatedSkillsArray))
          .input('ExplJson', JSON.stringify(explicationPayload))
          .input('EvalsJson', JSON.stringify(practicalEvaluations))
          .input('Filiere', filiere)
          .query(`
            UPDATE dbo.OrientationProposals
            SET SpecialiteProposeeCode = @Spec,
                StatutArbitrage = @StatutArb,
                StatutPreselection = @StatutPresel,
                DomaineTechnique = @Domaine,
                MoyennePratique = @MoyPrat,
                MeilleureNotePratique = @MaxPrat,
                CompetencesValideesJson = @CompsJson,
                ExplicationJson = @ExplJson,
                EvaluationsUtiliseesJson = @EvalsJson,
                FiliereEntree = @Filiere,
                UpdatedAt = SYSUTCDATETIME()
            WHERE ProposalId = @Id
          `);
      } else {
        await pool.request()
          .input('Uid', sId)
          .input('Spec', specialiteFinale)
          .input('StatutArb', 'PROPOSEE')
          .input('StatutPresel', statutFinal)
          .input('Domaine', bestDomain?.domainCode || 'GENERAL')
          .input('MoyPrat', averagePracticalScore)
          .input('MaxPrat', maxPracticalScore)
          .input('CompsJson', JSON.stringify(validatedSkillsArray))
          .input('ExplJson', JSON.stringify(explicationPayload))
          .input('EvalsJson', JSON.stringify(practicalEvaluations))
          .input('Filiere', filiere)
          .query(`
            INSERT INTO dbo.OrientationProposals (
              UtilisateurId, SpecialiteProposeeCode, StatutArbitrage, StatutPreselection,
              DomaineTechnique, MoyennePratique, MeilleureNotePratique, CompetencesValideesJson,
              ExplicationJson, EvaluationsUtiliseesJson, FiliereEntree, EstDecisionVerrouillee, UpdatedAt
            )
            VALUES (
              @Uid, @Spec, @StatutArb, @StatutPresel,
              @Domaine, @MoyPrat, @MaxPrat, @CompsJson,
              @ExplJson, @EvalsJson, @Filiere, 0, SYSUTCDATETIME()
            )
          `);
      }
    }

    const officialSpec = OFFICIAL_SPECIALTIES[specialiteFinale] || {
      code: specialiteFinale,
      intitule: specialiteFinale,
      domaine: 'Spécialité Gendarmerie'
    };

    return {
      studentId: sId,
      nom: student.Nom,
      prenom: student.Prenom,
      matricule: student.Matricule,
      promotionNom: student.NomPromotion || 'Promotion 2025-2026',
      filiereEntree: filiere,
      filiereLabel: filiere === 'SPECIALISTE_ISTA' ? 'Spécialiste — Diplômé ISTA/OFPPT' : 'Élève Normal — Niveau Bac',
      diplomeOrigine: student.DiplomeOrigine,
      etablissementOrigine: student.EtablissementOrigine,
      domaineFormation: student.DomaineFormation,
      specialiteOrigine: student.SpecialiteOrigine,
      statutPreselection: statutFinal,
      statutLabel: PRESELECTION_STATUS_LABELS[statutFinal] || statutFinal,
      specialiteProposeeCode: specialiteFinale,
      specialiteProposeeIntitule: officialSpec.intitule,
      domaineTechnique: bestDomain?.domainCode || 'GENERAL',
      moyennePratique: averagePracticalScore,
      meilleureNotePratique: maxPracticalScore,
      dernierInstructeur: lastEvaluatorName,
      competencesValidees: validatedSkillsArray,
      explication: explicationTexte,
      explicationPayload,
      informationsManquantes,
      evaluationsPratiques: practicalEvaluations,
      notesAcademiques: academicNotes,
      estDecisionVerrouillee: isLocked,
      dateCalcul: new Date().toISOString(),
      versionMoteur: 'v1.2-PRESELECT'
    };
  },

  /**
   * Vue d'ensemble générale pour l'espace Administrateur / Commandement
   * Calcule les 4 cartes KPI et génère la liste complète des élèves avec filtres
   */
  async getAllStudentsPreselectionSummary() {
    const pool = await getDbPool();
    const studentsRes = await pool.request()
      .query(`
        SELECT u.UtilisateurId, u.Matricule, u.Nom, u.Prenom, u.Email, u.Role,
               u.FiliereEntree, u.DiplomeOrigine, u.EtablissementOrigine, u.DomaineFormation,
               u.SpecialiteOrigine, p.Nom AS PromotionNom, p.PromotionId
        FROM dbo.Utilisateurs u
        LEFT JOIN dbo.Promotions p ON p.PromotionId = u.PromotionId
        WHERE u.Role = 'ELEVE' OR u.Role IS NULL
        ORDER BY u.UtilisateurId ASC
      `);

    const students = studentsRes.recordset;
    const summaries = [];

    for (const st of students) {
      try {
        const presel = await this.calculateStudentPreselection(st.UtilisateurId);
        summaries.push(presel);
      } catch (err) {
        console.warn(`[PRESELECTION] Erreur calcul élève ${st.UtilisateurId}:`, err.message);
        summaries.push({
          studentId: st.UtilisateurId,
          nom: st.Nom,
          prenom: st.Prenom,
          matricule: st.Matricule,
          promotionNom: st.NomPromotion || 'Promotion',
          filiereEntree: st.FiliereEntree || 'NORMAL_BAC',
          filiereLabel: st.FiliereEntree === 'SPECIALISTE_ISTA' ? 'Spécialiste — Diplômé ISTA/OFPPT' : 'Élève Normal — Niveau Bac',
          diplomeOrigine: st.DiplomeOrigine,
          statutPreselection: 'EVAL_COMPLEMENTAIRE',
          statutLabel: 'Évaluation complémentaire nécessaire',
          specialiteProposeeCode: 'SPEC-TERR',
          specialiteProposeeIntitule: 'Gendarmerie Territoriale',
          moyennePratique: null,
          meilleureNotePratique: null,
          dernierInstructeur: null,
          competencesValidees: [],
          explication: 'Calcul en attente.',
          evaluationsPratiques: [],
          estDecisionVerrouillee: false
        });
      }
    }

    // Calcul des 4 KPI officiels demandés
    const totalEleves = summaries.length;
    const evaluesCount = summaries.filter(s => s.evaluationsPratiques && s.evaluationsPratiques.length > 0).length;
    const specialistesConfirmesCount = summaries.filter(s => s.statutPreselection === 'SPECIALISTE_CONFIRME').length;
    const talentsCachesCount = summaries.filter(s => 
      s.statutPreselection === 'TALENT_CACHE' || 
      (s.filiereEntree === 'NORMAL_BAC' && ((s.moyennePratique !== null && s.moyennePratique >= 15) || (s.meilleureNotePratique !== null && s.meilleureNotePratique >= 15)))
    ).length;
    
    // Taux d'adéquation globale : % d'élèves évalués ayant une orientation positive ou confirmée
    const orientationsValides = summaries.filter(s => 
      ['TALENT_CACHE', 'SPECIALISTE_CONFIRME', 'AFFECTATION_VALIDEE'].includes(s.statutPreselection)
    ).length;
    const tauxAdequation = evaluesCount > 0
      ? Math.round((orientationsValides / evaluesCount) * 100)
      : 0;

    const kpi = {
      totalElevesEvalues: evaluesCount,
      totalElevesCohorte: totalEleves,
      specialistesIstaConfirmes: specialistesConfirmesCount,
      talentsCachesDetectes: talentsCachesCount,
      tauxAdequationGlobale: tauxAdequation
    };

    return {
      kpi,
      summaries
    };
  },

  /**
   * Validation administrative officielle par un utilisateur ADMIN
   * Enregistre la décision définitive, verrouille le statut et consigne dans dbo.LogsActivite
   */
  async validateAdministrativeAssignment(studentId, {
    action = 'VALIDER', // 'VALIDER' | 'REJETER'
    specialiteRetenueCode = 'SPEC-TERR',
    justification = '',
    adminId = 1,
    ipAddress = '127.0.0.1'
  }) {
    const sId = parseInt(studentId, 10);
    const aId = parseInt(adminId, 10);
    if (!sId) throw new Error("Identifiant d'élève requis.");

    const pool = await getDbPool();

    // Vérifier l'existence de l'élève
    const userRes = await pool.request()
      .input('Uid', sId)
      .query(`SELECT UtilisateurId, Nom, Prenom, Matricule, FiliereEntree FROM dbo.Utilisateurs WHERE UtilisateurId = @Uid`);
    const student = userRes.recordset[0];
    if (!student) throw new Error("Élève gendarme introuvable.");

    // Valider le code de spécialité officielle
    const validSpec = OFFICIAL_SPECIALTIES[specialiteRetenueCode] ? specialiteRetenueCode : 'SPEC-TERR';

    const statutArbitrage = action === 'VALIDER' ? 'VALIDEE_ADMIN' : 'REJETEE';
    const statutPreselection = action === 'VALIDER' ? 'AFFECTATION_VALIDEE' : 'PROPOSITION_REJETEE';

    const curPropRes = await pool.request()
      .input('Uid', sId)
      .query(`SELECT TOP 1 * FROM dbo.OrientationProposals WHERE UtilisateurId = @Uid`);
    const existing = curPropRes.recordset[0];

    const decisionAdminObj = {
      action,
      specialiteRetenueCode: validSpec,
      justification,
      adminId: aId,
      dateDecision: new Date().toISOString()
    };

    if (existing) {
      await pool.request()
        .input('Id', existing.ProposalId)
        .input('Spec', validSpec)
        .input('StatutArb', statutArbitrage)
        .input('StatutPresel', statutPreselection)
        .input('DecAdmin', JSON.stringify(decisionAdminObj))
        .input('Justif', justification)
        .input('AdminId', aId)
        .query(`
          UPDATE dbo.OrientationProposals
          SET SpecialiteProposeeCode = @Spec,
              StatutArbitrage = @StatutArb,
              StatutPreselection = @StatutPresel,
              DecisionAdmin = @DecAdmin,
              JustificationAdmin = @Justif,
              ValidateurId = @AdminId,
              EstDecisionVerrouillee = 1,
              DateDecisionAdmin = SYSUTCDATETIME(),
              UpdatedAt = SYSUTCDATETIME()
          WHERE ProposalId = @Id
        `);
    } else {
      await pool.request()
        .input('Uid', sId)
        .input('Spec', validSpec)
        .input('StatutArb', statutArbitrage)
        .input('StatutPresel', statutPreselection)
        .input('DecAdmin', JSON.stringify(decisionAdminObj))
        .input('Justif', justification)
        .input('AdminId', aId)
        .query(`
          INSERT INTO dbo.OrientationProposals (
            UtilisateurId, SpecialiteProposeeCode, StatutArbitrage, StatutPreselection,
            DecisionAdmin, JustificationAdmin, ValidateurId, EstDecisionVerrouillee,
            DateDecisionAdmin, UpdatedAt
          )
          VALUES (
            @Uid, @Spec, @StatutArb, @StatutPresel,
            @DecAdmin, @Justif, @AdminId, 1,
            SYSUTCDATETIME(), SYSUTCDATETIME()
          )
        `);
    }

    // Consignation obligatoire dans le journal d'audit dbo.LogsActivite
    await coreRepository.appendLog({
      utilisateurId: aId,
      action: action === 'VALIDER' ? 'VALIDATION_AFFECTATION_SPECIALITE' : 'REJET_PROPOSITION_SPECIALITE',
      cible: `Élève Gendarme ${student.Prenom} ${student.Nom} (${student.Matricule})`,
      details: JSON.stringify({
        studentId: sId,
        specialite: validSpec,
        statutPreselection,
        justification,
        timestamp: new Date().toISOString()
      }),
      adresseIP: ipAddress
    });

    return {
      success: true,
      message: action === 'VALIDER'
        ? `Affectation officielle validée avec succès pour ${student.Prenom} ${student.Nom} -> ${validSpec}.`
        : `Proposition d'orientation rejetée pour ${student.Prenom} ${student.Nom}.`,
      studentId: sId,
      specialiteRetenueCode: validSpec,
      statutPreselection,
      statutArbitrage,
      dateDecisionAdmin: new Date().toISOString()
    };
  }
};
