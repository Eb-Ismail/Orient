// ==============================================================================
// ORIENT-GR — Repository SQL Server pour le Recrutement par Commissions Spécialisées
// Gère l'accès aux tables dbo.Commissions, dbo.CandidateCommissionAssignments,
// dbo.CommissionEvaluations, dbo.CommissionEvaluationHistory, dbo.CandidateSelectionComparisons,
// dbo.AdministrativeSelectionDecisions
// ==============================================================================

import { getDbPool } from '../lib/db.js';

function safeJson(raw, fallback = null) {
  if (!raw) return fallback;
  if (typeof raw === 'object') return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export const commissionRepository = {
  /**
   * Récupère la liste de toutes les commissions actives
   */
  async getAllCommissions() {
    const pool = await getDbPool();
    const result = await pool.request().query(`
      SELECT 
        c.CommissionId, c.Code, c.Nom, c.NomAr, c.Description, c.Icone, c.Couleur, c.DomaineCode, c.EstActive,
        (SELECT COUNT(*) FROM dbo.CommissionMembers cm WHERE cm.CommissionId = c.CommissionId AND cm.EstActif = 1) AS NombreMembres,
        (SELECT COUNT(*) FROM dbo.CandidateCommissionAssignments ca WHERE ca.CommissionId = c.CommissionId) AS NombreCandidatsAffectes,
        (SELECT COUNT(*) FROM dbo.CandidateCommissionAssignments ca 
         JOIN dbo.CommissionEvaluations ce ON ce.AssignmentId = ca.AssignmentId 
         WHERE ca.CommissionId = c.CommissionId AND ce.EstTransmisAdmin = 1 AND ce.RecommandationIA = 'POSITIF') AS NombrePositifs,
        (SELECT COUNT(*) FROM dbo.CandidateCommissionAssignments ca 
         JOIN dbo.CommissionEvaluations ce ON ce.AssignmentId = ca.AssignmentId 
         WHERE ca.CommissionId = c.CommissionId AND ce.RecommandationIA = 'NEGATIF') AS NombreNegatifs
      FROM dbo.Commissions c
      WHERE c.EstActive = 1
      ORDER BY c.CommissionId ASC
    `);
    return result.recordset || [];
  },

  /**
   * Récupère les commissions auxquelles appartient un utilisateur membre
   */
  async getCommissionsForUser(userId) {
    const pool = await getDbPool();
    const result = await pool.request()
      .input('userId', userId)
      .query(`
        SELECT 
          c.CommissionId, c.Code, c.Nom, c.NomAr, c.Description, c.Icone, c.Couleur, c.DomaineCode,
          cm.RoleDansCommission, cm.DateAffectation
        FROM dbo.Commissions c
        JOIN dbo.CommissionMembers cm ON cm.CommissionId = c.CommissionId
        WHERE cm.UtilisateurId = @userId AND cm.EstActif = 1 AND c.EstActive = 1
        ORDER BY c.Nom ASC
      `);
    return result.recordset || [];
  },

  /**
   * Récupère les détails d'une commission par son ID
   */
  async getCommissionById(commissionId) {
    const pool = await getDbPool();
    const result = await pool.request()
      .input('id', commissionId)
      .query(`
        SELECT CommissionId, Code, Nom, NomAr, Description, Icone, Couleur, DomaineCode, EstActive, CreatedAt, UpdatedAt
        FROM dbo.Commissions
        WHERE CommissionId = @id
      `);
    return result.recordset[0] || null;
  },

  /**
   * Récupère les membres actifs d'une commission
   */
  async getCommissionMembers(commissionId) {
    const pool = await getDbPool();
    const result = await pool.request()
      .input('commId', commissionId)
      .query(`
        SELECT 
          cm.MemberId, cm.CommissionId, cm.UtilisateurId, cm.RoleDansCommission, cm.DateAffectation,
          u.Matricule, u.Nom, u.Prenom, u.Email, u.Role, u.Grade
        FROM dbo.CommissionMembers cm
        JOIN dbo.Utilisateurs u ON u.UtilisateurId = cm.UtilisateurId
        WHERE cm.CommissionId = @commId AND cm.EstActif = 1
        ORDER BY cm.RoleDansCommission DESC, u.Nom ASC
      `);
    return result.recordset || [];
  },

  /**
   * Associe un utilisateur à une commission en tant que membre
   */
  async addMemberToCommission(commissionId, userId, roleDansCommission = 'EVALUATEUR', affectePar = null) {
    const pool = await getDbPool();
    const existing = await pool.request()
      .input('commId', commissionId)
      .input('userId', userId)
      .query('SELECT MemberId FROM dbo.CommissionMembers WHERE CommissionId = @commId AND UtilisateurId = @userId');

    if (existing.recordset.length > 0) {
      await pool.request()
        .input('commId', commissionId)
        .input('userId', userId)
        .input('role', roleDansCommission)
        .input('adminId', affectePar)
        .query(`
          UPDATE dbo.CommissionMembers
          SET RoleDansCommission = @role, EstActif = 1, AffectePar = @adminId, DateAffectation = SYSUTCDATETIME()
          WHERE CommissionId = @commId AND UtilisateurId = @userId
        `);
      return { memberId: existing.recordset[0].MemberId, updated: true };
    } else {
      const res = await pool.request()
        .input('commId', commissionId)
        .input('userId', userId)
        .input('role', roleDansCommission)
        .input('adminId', affectePar)
        .query(`
          INSERT INTO dbo.CommissionMembers (CommissionId, UtilisateurId, RoleDansCommission, AffectePar)
          OUTPUT INSERTED.MemberId
          VALUES (@commId, @userId, @role, @adminId)
        `);
      return { memberId: res.recordset[0]?.MemberId, created: true };
    }
  },

  /**
   * Désactive un membre d'une commission
   */
  async removeMemberFromCommission(commissionId, userId) {
    const pool = await getDbPool();
    await pool.request()
      .input('commId', commissionId)
      .input('userId', userId)
      .query('UPDATE dbo.CommissionMembers SET EstActif = 0 WHERE CommissionId = @commId AND UtilisateurId = @userId');
    return { success: true };
  },

  /**
   * Vérifie si un utilisateur est membre autorisé d'une commission (Anti-IDOR)
   */
  async isUserMemberOfCommission(userId, commissionId) {
    const pool = await getDbPool();
    const res = await pool.request()
      .input('userId', userId)
      .input('commId', commissionId)
      .query('SELECT 1 FROM dbo.CommissionMembers WHERE UtilisateurId = @userId AND CommissionId = @commId AND EstActif = 1');
    return res.recordset.length > 0;
  },

  /**
   * Affecte un candidat élève à une commission (Ventilation IA ou Manuelle)
   */
  async assignCandidateToCommission({
    candidateId,
    commissionId,
    scoreIA = null,
    justificationIA = null,
    competencesJson = null,
    pointsAVerifierJson = null,
    statut = 'PROPOSEE_IA',
    affectePar = null,
    justificationAdmin = null
  }) {
    const pool = await getDbPool();
    const compStr = typeof competencesJson === 'string' ? competencesJson : JSON.stringify(competencesJson || []);
    const ptsStr = typeof pointsAVerifierJson === 'string' ? pointsAVerifierJson : JSON.stringify(pointsAVerifierJson || []);

    const existing = await pool.request()
      .input('candId', candidateId)
      .input('commId', commissionId)
      .query('SELECT AssignmentId FROM dbo.CandidateCommissionAssignments WHERE UtilisateurId = @candId AND CommissionId = @commId');

    if (existing.recordset.length > 0) {
      const assignmentId = existing.recordset[0].AssignmentId;
      await pool.request()
        .input('id', assignmentId)
        .input('score', scoreIA)
        .input('justifIA', justificationIA)
        .input('comp', compStr)
        .input('pts', ptsStr)
        .input('statut', statut)
        .input('adminId', affectePar)
        .input('justifAdmin', justificationAdmin)
        .query(`
          UPDATE dbo.CandidateCommissionAssignments
          SET 
            ScoreCorrespondanceIA = COALESCE(@score, ScoreCorrespondanceIA),
            JustificationIA = COALESCE(@justifIA, JustificationIA),
            CompetencesClesJson = COALESCE(@comp, CompetencesClesJson),
            PointsAVerifierJson = COALESCE(@pts, PointsAVerifierJson),
            StatutVentilation = @statut,
            AffectePar = COALESCE(@adminId, AffectePar),
            JustificationAdmin = COALESCE(@justifAdmin, JustificationAdmin)
          WHERE AssignmentId = @id
        `);
      return { assignmentId, updated: true };
    } else {
      const res = await pool.request()
        .input('candId', candidateId)
        .input('commId', commissionId)
        .input('score', scoreIA)
        .input('justifIA', justificationIA)
        .input('comp', compStr)
        .input('pts', ptsStr)
        .input('statut', statut)
        .input('adminId', affectePar)
        .input('justifAdmin', justificationAdmin)
        .query(`
          INSERT INTO dbo.CandidateCommissionAssignments (
            UtilisateurId, CommissionId, ScoreCorrespondanceIA, JustificationIA, 
            CompetencesClesJson, PointsAVerifierJson, StatutVentilation, AffectePar, JustificationAdmin
          )
          OUTPUT INSERTED.AssignmentId
          VALUES (@candId, @commId, @score, @justifIA, @comp, @pts, @statut, @adminId, @justifAdmin)
        `);
      return { assignmentId: res.recordset[0]?.AssignmentId, created: true };
    }
  },

  /**
   * Met à jour le statut d'une affectation (ex: CONVOQUE, EN_COURS, EN_ATTENTE)
   */
  async updateCandidateAssignmentStatus({
    assignmentId,
    statut,
    dateConvocation = null,
    justificationAdmin = null,
    updatedBy = null
  }) {
    const pool = await getDbPool();
    const allowed = [
      'EN_ATTENTE', 'CONVOQUE', 'EN_COURS', 'EVALUATION_TERMINEE',
      'POSITIF', 'NEGATIF', 'TRANSMIS_ADMIN', 'PROPOSEE_IA',
      'VALIDEE_ADMIN', 'ASSIGNEE_MANUELLE', 'REJETEE_ADMIN', 'ACCEPTE', 'REFUSE'
    ];
    if (!allowed.includes(statut)) {
      throw new Error(`Statut d'affectation non valide : ${statut}`);
    }

    await pool.request()
      .input('assignId', assignmentId)
      .input('statut', statut)
      .input('dateConv', dateConvocation ? new Date(dateConvocation) : (statut === 'CONVOQUE' ? new Date() : null))
      .input('justif', justificationAdmin)
      .query(`
        UPDATE dbo.CandidateCommissionAssignments
        SET StatutVentilation = @statut,
            DateConvocation = COALESCE(@dateConv, DateConvocation),
            JustificationAdmin = COALESCE(@justif, JustificationAdmin)
        WHERE AssignmentId = @assignId
      `);

    return { success: true, assignmentId, statut };
  },

  /**
   * Récupère toutes les affectations de commissions d'un candidat
   */
  async getCandidateAssignments(candidateId) {
    const pool = await getDbPool();
    const result = await pool.request()
      .input('candId', candidateId)
      .query(`
        SELECT 
          ca.AssignmentId, ca.UtilisateurId, ca.CommissionId, ca.ScoreCorrespondanceIA,
          ca.JustificationIA, ca.CompetencesClesJson, ca.PointsAVerifierJson, ca.StatutVentilation,
          ca.DateAffectation, ca.AffectePar, ca.JustificationAdmin, ca.DateConvocation,
          c.Code AS CommissionCode, c.Nom AS CommissionNom, c.Icone AS CommissionIcone, c.Couleur AS CommissionCouleur,
          ce.EvaluationId, ce.NotePratiqueSur20, ce.NoteEntretienSur20, ce.NoteComplementaireSur20, ce.NoteGlobaleSur20,
          ce.Observations, ce.CommentairesComplementaires, ce.AvisCommission, ce.StatutEvaluation, ce.DateEvaluation, ce.EstVerrouillee,
          ce.RecommandationIA, ce.ResumeAnalyseIA, ce.JustificationIA AS JustificationPostEvalIA,
          ce.PointsFortsIAJson, ce.PointsFaiblesIAJson, ce.DateAnalyseIA, ce.EstTransmisAdmin, ce.DateTransmissionAdmin,
          ce.NomEvaluateur, evalU.Nom AS EvaluateurNom, evalU.Prenom AS EvaluateurPrenom
        FROM dbo.CandidateCommissionAssignments ca
        JOIN dbo.Commissions c ON c.CommissionId = ca.CommissionId
        LEFT JOIN dbo.CommissionEvaluations ce ON ce.AssignmentId = ca.AssignmentId
        LEFT JOIN dbo.Utilisateurs evalU ON evalU.UtilisateurId = ce.EvaluateurId
        WHERE ca.UtilisateurId = @candId
        ORDER BY ca.ScoreCorrespondanceIA DESC, c.Nom ASC
      `);

    return (result.recordset || []).map(row => ({
      ...row,
      CompetencesCles: safeJson(row.CompetencesClesJson, []),
      PointsAVerifier: safeJson(row.PointsAVerifierJson, []),
      PointsFortsIA: safeJson(row.PointsFortsIAJson, []),
      PointsFaiblesIA: safeJson(row.PointsFaiblesIAJson, [])
    }));
  },

  /**
   * Récupère la liste des candidats affectés à une commission donnée
   */
  async getCandidatesForCommission(commissionId) {
    const pool = await getDbPool();
    const result = await pool.request()
      .input('commId', commissionId)
      .query(`
        SELECT 
          ca.AssignmentId, ca.UtilisateurId, ca.CommissionId, ca.ScoreCorrespondanceIA,
          ca.JustificationIA, ca.CompetencesClesJson, ca.PointsAVerifierJson, ca.StatutVentilation,
          ca.DateAffectation, ca.DateConvocation,
          u.Matricule, u.Nom, u.Prenom, u.Email, u.FiliereEntree, u.DiplomeOrigine, u.SpecialiteOrigine,
          p.Nom AS PromotionNom,
          ce.EvaluationId, ce.NotePratiqueSur20, ce.NoteEntretienSur20, ce.NoteComplementaireSur20, ce.NoteGlobaleSur20,
          ce.Observations, ce.CommentairesComplementaires, ce.PointsFortsJson, ce.AxesAmeliorationJson, ce.AvisCommission, 
          ce.StatutEvaluation, ce.DateEvaluation, ce.EstVerrouillee,
          ce.RecommandationIA, ce.ResumeAnalyseIA, ce.JustificationIA AS JustificationPostEvalIA,
          ce.PointsFortsIAJson, ce.PointsFaiblesIAJson, ce.DateAnalyseIA, ce.EstTransmisAdmin, ce.DateTransmissionAdmin,
          ce.NomEvaluateur,
          evalU.Nom AS EvaluateurNom, evalU.Prenom AS EvaluateurPrenom
        FROM dbo.CandidateCommissionAssignments ca
        JOIN dbo.Utilisateurs u ON u.UtilisateurId = ca.UtilisateurId
        LEFT JOIN dbo.Promotions p ON p.PromotionId = u.PromotionId
        LEFT JOIN dbo.CommissionEvaluations ce ON ce.AssignmentId = ca.AssignmentId
        LEFT JOIN dbo.Utilisateurs evalU ON evalU.UtilisateurId = ce.EvaluateurId
        WHERE ca.CommissionId = @commId
        ORDER BY 
          CASE WHEN ce.StatutEvaluation IN ('SOUMISE', 'VALIDEE') THEN 2 ELSE 1 END ASC,
          ca.ScoreCorrespondanceIA DESC, u.Nom ASC
      `);

    return (result.recordset || []).map(row => ({
      ...row,
      CompetencesCles: safeJson(row.CompetencesClesJson, []),
      PointsAVerifier: safeJson(row.PointsAVerifierJson, []),
      PointsForts: safeJson(row.PointsFortsJson, []),
      AxesAmelioration: safeJson(row.AxesAmeliorationJson, []),
      PointsFortsIA: safeJson(row.PointsFortsIAJson, []),
      PointsFaiblesIA: safeJson(row.PointsFaiblesIAJson, [])
    }));
  },

  /**
   * Récupère le dossier complet d'un candidat pour une commission spécifique
   */
  async getCandidateCommissionDetails(commissionId, candidateId) {
    const pool = await getDbPool();
    const assignRes = await pool.request()
      .input('commId', commissionId)
      .input('candId', candidateId)
      .query(`
        SELECT 
          ca.AssignmentId, ca.UtilisateurId, ca.CommissionId, ca.ScoreCorrespondanceIA,
          ca.JustificationIA, ca.CompetencesClesJson, ca.PointsAVerifierJson, ca.StatutVentilation,
          ca.DateAffectation, ca.DateConvocation,
          c.Code AS CommissionCode, c.Nom AS CommissionNom,
          u.Matricule, u.Nom, u.Prenom, u.Email, u.FiliereEntree, u.DiplomeOrigine, u.EtablissementOrigine,
          u.DomaineFormation, u.SpecialiteOrigine, u.Age, u.StatutMedical,
          p.Nom AS PromotionNom
        FROM dbo.CandidateCommissionAssignments ca
        JOIN dbo.Commissions c ON c.CommissionId = ca.CommissionId
        JOIN dbo.Utilisateurs u ON u.UtilisateurId = ca.UtilisateurId
        LEFT JOIN dbo.Promotions p ON p.PromotionId = u.PromotionId
        WHERE ca.CommissionId = @commId AND ca.UtilisateurId = @candId
      `);

    if (assignRes.recordset.length === 0) return null;
    const assignment = assignRes.recordset[0];

    // Récupérer le parcours IA
    const journeyRes = await pool.request()
      .input('candId', candidateId)
      .query(`
        SELECT RecitPersonnel, ExperiencesJson, CompetencesDetecteesJson, AnalyseProfilJson, CreatedAt, UpdatedAt
        FROM dbo.StudentJourneys
        WHERE UtilisateurId = @candId
      `);
    const journey = journeyRes.recordset[0] || null;

    // Récupérer l'évaluation de cette commission
    const evalRes = await pool.request()
      .input('assignId', assignment.AssignmentId)
      .query(`
        SELECT 
          ce.EvaluationId, ce.AssignmentId, ce.UtilisateurId, ce.CommissionId, ce.EvaluateurId,
          ce.NotePratiqueSur20, ce.NoteEntretienSur20, ce.NoteComplementaireSur20, ce.NoteGlobaleSur20,
          ce.Observations, ce.CommentairesComplementaires, ce.PointsFortsJson, ce.AxesAmeliorationJson, ce.AvisCommission,
          ce.StatutEvaluation, ce.DateEvaluation, ce.EstVerrouillee,
          ce.RecommandationIA, ce.ResumeAnalyseIA, ce.JustificationIA AS JustificationPostEvalIA,
          ce.PointsFortsIAJson, ce.PointsFaiblesIAJson, ce.NotesPrisesEnCompteJson, ce.ObservationsPrisesEnCompte,
          ce.DateAnalyseIA, ce.ModeleIAVersion, ce.EstTransmisAdmin, ce.DateTransmissionAdmin,
          ce.NomEvaluateur, ce.DateSaisieEvaluation,
          evalU.Nom AS EvaluateurNom, evalU.Prenom AS EvaluateurPrenom
        FROM dbo.CommissionEvaluations ce
        LEFT JOIN dbo.Utilisateurs evalU ON evalU.UtilisateurId = ce.EvaluateurId
        WHERE ce.AssignmentId = @assignId
      `);
    const evaluation = evalRes.recordset[0] || null;

    return {
      assignment: {
        ...assignment,
        CompetencesCles: safeJson(assignment.CompetencesClesJson, []),
        PointsAVerifier: safeJson(assignment.PointsAVerifierJson, [])
      },
      journey: journey ? {
        RecitPersonnel: journey.RecitPersonnel,
        Experiences: safeJson(journey.ExperiencesJson, []),
        CompetencesDetectees: safeJson(journey.CompetencesDetecteesJson, []),
        AnalyseProfil: safeJson(journey.AnalyseProfilJson, null)
      } : null,
      evaluation: evaluation ? {
        ...evaluation,
        PointsForts: safeJson(evaluation.PointsFortsJson, []),
        AxesAmelioration: safeJson(evaluation.AxesAmeliorationJson, []),
        PointsFortsIA: safeJson(evaluation.PointsFortsIAJson, []),
        PointsFaiblesIA: safeJson(evaluation.PointsFaiblesIAJson, []),
        NotesPrisesEnCompte: safeJson(evaluation.NotesPrisesEnCompteJson, null)
      } : null
    };
  },

  /**
   * Enregistre ou met à jour l'évaluation réelle d'un candidat dans une commission
   * Intègre l'analyse IA post-évaluation et la transmission automatique vers ADMIN si POSITIF
   */
  async saveCommissionEvaluation({
    assignmentId,
    candidateId,
    commissionId,
    evaluateurId,
    nomEvaluateur = null,
    notePratiqueSur20 = null,
    noteEntretienSur20 = null,
    noteComplementaireSur20 = null,
    observations = null,
    commentairesComplementaires = null,
    pointsForts = [],
    axesAmelioration = [],
    avisCommission = 'RESERVE',
    statutEvaluation = 'BROUILLON',
    recommandationIA = null,
    resumeAnalyseIA = null,
    justificationIA = null,
    pointsFortsIA = [],
    pointsFaiblesIA = [],
    notesPrisesEnCompte = null,
    observationsPrisesEnCompte = null,
    dateAnalyseIA = null,
    modeleIAVersion = 'v1.0-2026',
    estTransmisAdmin = false,
    dateTransmissionAdmin = null
  }) {
    const pool = await getDbPool();

    // 1. Calcul automatique de la note globale pondérée
    let noteGlobale = null;
    if (notePratiqueSur20 !== null && noteEntretienSur20 !== null) {
      if (noteComplementaireSur20 !== null && !isNaN(noteComplementaireSur20)) {
        noteGlobale = Number(((Number(notePratiqueSur20) * 0.45) + (Number(noteEntretienSur20) * 0.45) + (Number(noteComplementaireSur20) * 0.10)).toFixed(2));
      } else {
        noteGlobale = Number(((Number(notePratiqueSur20) * 0.5) + (Number(noteEntretienSur20) * 0.5)).toFixed(2));
      }
    }

    // 2. Détermination du nom de l'évaluateur si non fourni
    let resolvedNomEvaluateur = nomEvaluateur;
    if (!resolvedNomEvaluateur && evaluateurId) {
      const userRes = await pool.request()
        .input('uid', evaluateurId)
        .query('SELECT Nom, Prenom FROM dbo.Utilisateurs WHERE UtilisateurId = @uid');
      if (userRes.recordset.length > 0) {
        resolvedNomEvaluateur = `${userRes.recordset[0].Prenom} ${userRes.recordset[0].Nom}`;
      }
    }

    const pfStr = JSON.stringify(pointsForts || []);
    const aaStr = JSON.stringify(axesAmelioration || []);
    const pfIAStr = JSON.stringify(pointsFortsIA || []);
    const pfaIAStr = JSON.stringify(pointsFaiblesIA || []);
    const notesJsonStr = notesPrisesEnCompte ? JSON.stringify(notesPrisesEnCompte) : null;

    const isSubmitting = statutEvaluation === 'SOUMISE' || statutEvaluation === 'VALIDEE';
    const finalTransmis = isSubmitting && recommandationIA === 'POSITIF' ? 1 : (estTransmisAdmin ? 1 : 0);
    const finalDateTransmission = finalTransmis === 1 ? (dateTransmissionAdmin || new Date()) : null;

    const existing = await pool.request()
      .input('assignId', assignmentId)
      .query('SELECT EvaluationId, EstVerrouillee FROM dbo.CommissionEvaluations WHERE AssignmentId = @assignId');

    let evalId;
    if (existing.recordset.length > 0) {
      evalId = existing.recordset[0].EvaluationId;
      const isLocked = existing.recordset[0].EstVerrouillee;

      if (isLocked && statutEvaluation !== 'VALIDEE') {
        throw new Error('Cette évaluation est verrouillée après soumission officielle.');
      }

      await pool.request()
        .input('id', evalId)
        .input('evalId', evaluateurId)
        .input('nomEval', resolvedNomEvaluateur)
        .input('notePrat', notePratiqueSur20 !== null ? Number(notePratiqueSur20) : null)
        .input('noteEnt', noteEntretienSur20 !== null ? Number(noteEntretienSur20) : null)
        .input('noteComp', noteComplementaireSur20 !== null ? Number(noteComplementaireSur20) : null)
        .input('noteGlob', noteGlobale)
        .input('obs', observations)
        .input('commentaires', commentairesComplementaires)
        .input('pf', pfStr)
        .input('aa', aaStr)
        .input('avis', avisCommission)
        .input('statut', statutEvaluation)
        .input('verrou', isSubmitting ? 1 : 0)
        .input('recomIA', recommandationIA)
        .input('resumeIA', resumeAnalyseIA)
        .input('justifIA', justificationIA)
        .input('pfIA', pfIAStr)
        .input('pfaIA', pfaIAStr)
        .input('notesJson', notesJsonStr)
        .input('obsIA', observationsPrisesEnCompte || observations)
        .input('dateAnalyseIA', dateAnalyseIA ? new Date(dateAnalyseIA) : (recommandationIA ? new Date() : null))
        .input('modeleVer', modeleIAVersion || 'v1.0-2026')
        .input('transmis', finalTransmis)
        .input('dateTransmis', finalDateTransmission)
        .query(`
          UPDATE dbo.CommissionEvaluations
          SET 
            EvaluateurId = @evalId,
            NomEvaluateur = COALESCE(@nomEval, NomEvaluateur),
            NotePratiqueSur20 = @notePrat,
            NoteEntretienSur20 = @noteEnt,
            NoteComplementaireSur20 = @noteComp,
            NoteGlobaleSur20 = @noteGlob,
            Observations = @obs,
            CommentairesComplementaires = @commentaires,
            PointsFortsJson = @pf,
            AxesAmeliorationJson = @aa,
            AvisCommission = @avis,
            StatutEvaluation = @statut,
            EstVerrouillee = @verrou,
            RecommandationIA = @recomIA,
            ResumeAnalyseIA = @resumeIA,
            JustificationIA = @justifIA,
            PointsFortsIAJson = @pfIA,
            PointsFaiblesIAJson = @pfaIA,
            NotesPrisesEnCompteJson = @notesJson,
            ObservationsPrisesEnCompte = @obsIA,
            DateAnalyseIA = @dateAnalyseIA,
            ModeleIAVersion = @modeleVer,
            EstTransmisAdmin = @transmis,
            DateTransmissionAdmin = @dateTransmis,
            DateEvaluation = SYSUTCDATETIME(),
            DateSaisieEvaluation = SYSUTCDATETIME(),
            UpdatedAt = SYSUTCDATETIME()
          WHERE EvaluationId = @id
        `);
    } else {
      const res = await pool.request()
        .input('assignId', assignmentId)
        .input('candId', candidateId)
        .input('commId', commissionId)
        .input('evalId', evaluateurId)
        .input('nomEval', resolvedNomEvaluateur)
        .input('notePrat', notePratiqueSur20 !== null ? Number(notePratiqueSur20) : null)
        .input('noteEnt', noteEntretienSur20 !== null ? Number(noteEntretienSur20) : null)
        .input('noteComp', noteComplementaireSur20 !== null ? Number(noteComplementaireSur20) : null)
        .input('noteGlob', noteGlobale)
        .input('obs', observations)
        .input('commentaires', commentairesComplementaires)
        .input('pf', pfStr)
        .input('aa', aaStr)
        .input('avis', avisCommission)
        .input('statut', statutEvaluation)
        .input('verrou', isSubmitting ? 1 : 0)
        .input('recomIA', recommandationIA)
        .input('resumeIA', resumeAnalyseIA)
        .input('justifIA', justificationIA)
        .input('pfIA', pfIAStr)
        .input('pfaIA', pfaIAStr)
        .input('notesJson', notesJsonStr)
        .input('obsIA', observationsPrisesEnCompte || observations)
        .input('dateAnalyseIA', dateAnalyseIA ? new Date(dateAnalyseIA) : (recommandationIA ? new Date() : null))
        .input('modeleVer', modeleIAVersion || 'v1.0-2026')
        .input('transmis', finalTransmis)
        .input('dateTransmis', finalDateTransmission)
        .query(`
          INSERT INTO dbo.CommissionEvaluations (
            AssignmentId, UtilisateurId, CommissionId, EvaluateurId, NomEvaluateur,
            NotePratiqueSur20, NoteEntretienSur20, NoteComplementaireSur20, NoteGlobaleSur20,
            Observations, CommentairesComplementaires, PointsFortsJson, AxesAmeliorationJson, AvisCommission,
            StatutEvaluation, EstVerrouillee,
            RecommandationIA, ResumeAnalyseIA, JustificationIA, PointsFortsIAJson, PointsFaiblesIAJson,
            NotesPrisesEnCompteJson, ObservationsPrisesEnCompte, DateAnalyseIA, ModeleIAVersion,
            EstTransmisAdmin, DateTransmissionAdmin,
            DateEvaluation, DateSaisieEvaluation, CreatedAt, UpdatedAt
          )
          OUTPUT INSERTED.EvaluationId
          VALUES (
            @assignId, @candId, @commId, @evalId, @nomEval,
            @notePrat, @noteEnt, @noteComp, @noteGlob,
            @obs, @commentaires, @pf, @aa, @avis,
            @statut, @verrou,
            @recomIA, @resumeIA, @justifIA, @pfIA, @pfaIA,
            @notesJson, @obsIA, @dateAnalyseIA, @modeleVer,
            @transmis, @dateTransmis,
            SYSUTCDATETIME(), SYSUTCDATETIME(), SYSUTCDATETIME(), SYSUTCDATETIME()
          )
        `);
      evalId = res.recordset[0]?.EvaluationId;
    }

    // 3. Règle fondamentale de synchronisation de l'affectation :
    // - Si POSITIF : StatutVentilation devient 'POSITIF' (ou 'TRANSMIS_ADMIN')
    // - Si NEGATIF : StatutVentilation devient 'NEGATIF' (conservé exclusivement dans la commission)
    // - Si soumise sans recommandation : 'EVALUATION_TERMINEE'
    // - Si brouillon : 'EN_COURS'
    let newAssignmentStatus = null;
    if (isSubmitting) {
      if (recommandationIA === 'POSITIF') {
        newAssignmentStatus = 'POSITIF';
      } else if (recommandationIA === 'NEGATIF') {
        newAssignmentStatus = 'NEGATIF';
      } else {
        newAssignmentStatus = 'EVALUATION_TERMINEE';
      }
    } else {
      newAssignmentStatus = 'EN_COURS';
    }

    if (newAssignmentStatus) {
      await pool.request()
        .input('assignId', assignmentId)
        .input('statut', newAssignmentStatus)
        .query('UPDATE dbo.CandidateCommissionAssignments SET StatutVentilation = @statut WHERE AssignmentId = @assignId');
    }

    return {
      evaluationId: evalId,
      assignmentId,
      updated: true,
      noteGlobale,
      recommandationIA,
      estTransmisAdmin: finalTransmis === 1,
      dateTransmissionAdmin: finalDateTransmission,
      statutVentilation: newAssignmentStatus
    };
  },

  /**
   * Enregistre une modification autorisée avec traçabilité dans l'historique
   */
  async requestEvaluationCorrection(evaluationId, modifiePar, motif, nouvellesNotes = {}) {
    const pool = await getDbPool();
    const current = await pool.request()
      .input('id', evaluationId)
      .query('SELECT * FROM dbo.CommissionEvaluations WHERE EvaluationId = @id');

    if (current.recordset.length === 0) {
      throw new Error("Évaluation introuvable.");
    }
    const evalData = current.recordset[0];

    const ancNotes = {
      notePratique: evalData.NotePratiqueSur20,
      noteEntretien: evalData.NoteEntretienSur20,
      noteComplementaire: evalData.NoteComplementaireSur20,
      noteGlobale: evalData.NoteGlobaleSur20,
      avis: evalData.AvisCommission,
      observations: evalData.Observations
    };

    // Insérer dans l'historique d'audit
    await pool.request()
      .input('evalId', evaluationId)
      .input('modPar', modifiePar)
      .input('ancStatut', evalData.StatutEvaluation)
      .input('nouvStatut', 'A_CORRIGER')
      .input('ancNotes', JSON.stringify(ancNotes))
      .input('nouvNotes', JSON.stringify(nouvellesNotes))
      .input('motif', motif)
      .query(`
        INSERT INTO dbo.CommissionEvaluationHistory (
          EvaluationId, ModifiePar, AncienStatut, NouveauStatut,
          AnciennesNotesJson, NouvellesNotesJson, MotifCorrection
        ) VALUES (
          @evalId, @modPar, @ancStatut, @nouvStatut,
          @ancNotes, @nouvNotes, @motif
        )
      `);

    // Déverrouiller temporairement pour permettre la correction officielle
    await pool.request()
      .input('id', evaluationId)
      .query("UPDATE dbo.CommissionEvaluations SET EstVerrouillee = 0, StatutEvaluation = 'A_CORRIGER' WHERE EvaluationId = @id");

    return { success: true, message: "Demande de correction enregistrée et auditée dans l'historique." };
  },

  /**
   * Récupère l'historique complet d'audit d'une évaluation
   */
  async getEvaluationHistory(evaluationId) {
    const pool = await getDbPool();
    const result = await pool.request()
      .input('evalId', evaluationId)
      .query(`
        SELECT 
          h.HistoryId, h.EvaluationId, h.ModifiePar, h.AncienStatut, h.NouveauStatut,
          h.AnciennesNotesJson, h.NouvellesNotesJson, h.MotifCorrection, h.DateModification,
          u.Nom AS ModifieParNom, u.Prenom AS ModifieParPrenom
        FROM dbo.CommissionEvaluationHistory h
        JOIN dbo.Utilisateurs u ON u.UtilisateurId = h.ModifiePar
        WHERE h.EvaluationId = @evalId
        ORDER BY h.DateModification DESC
      `);

    return (result.recordset || []).map(r => ({
      ...r,
      AnciennesNotes: safeJson(r.AnciennesNotesJson, {}),
      NouvellesNotes: safeJson(r.NouvellesNotesJson, {})
    }));
  },

  /**
   * Enregistre un rapport comparatif multi-commissions généré par le moteur IA
   */
  async saveSelectionComparison({
    candidateId,
    syntheseProfil,
    resultatsCommissions,
    recommandationPrincipale = null,
    recommandationSecondaire = null,
    indiceConfiance = 85.0,
    pointsVigilance = [],
    explicationIA,
    criteresVersion = 'v1.0-2026',
    declenchePar
  }) {
    const pool = await getDbPool();
    const res = await pool.request()
      .input('candId', candidateId)
      .input('synthese', JSON.stringify(syntheseProfil || {}))
      .input('resComm', JSON.stringify(resultatsCommissions || []))
      .input('recP', recommandationPrincipale)
      .input('recS', recommandationSecondaire)
      .input('conf', indiceConfiance)
      .input('vigilance', JSON.stringify(pointsVigilance || []))
      .input('explication', explicationIA)
      .input('version', criteresVersion)
      .input('declPar', declenchePar)
      .query(`
        INSERT INTO dbo.CandidateSelectionComparisons (
          UtilisateurId, SyntheseProfilJson, ResultatsCommissionsJson,
          RecommandationPrincipaleCode, RecommandationSecondaireCode, IndiceConfiance,
          PointsVigilanceJson, ExplicationIA, CriteresVersion, DeclenchePar
        )
        OUTPUT INSERTED.ComparisonId
        VALUES (
          @candId, @synthese, @resComm,
          @recP, @recS, @conf,
          @vigilance, @explication, @version, @declPar
        )
      `);
    return res.recordset[0]?.ComparisonId;
  },

  /**
   * Récupère la dernière comparaison IA d'un candidat
   */
  async getLatestSelectionComparison(candidateId) {
    const pool = await getDbPool();
    const result = await pool.request()
      .input('candId', candidateId)
      .query(`
        SELECT TOP 1 
          ComparisonId, UtilisateurId, SyntheseProfilJson, ResultatsCommissionsJson,
          RecommandationPrincipaleCode, RecommandationSecondaireCode, IndiceConfiance,
          PointsVigilanceJson, ExplicationIA, CriteresVersion, DeclenchePar, DateComparaison
        FROM dbo.CandidateSelectionComparisons
        WHERE UtilisateurId = @candId
        ORDER BY DateComparaison DESC
      `);

    if (result.recordset.length === 0) return null;
    const row = result.recordset[0];
    return {
      ...row,
      SyntheseProfil: safeJson(row.SyntheseProfilJson, {}),
      ResultatsCommissions: safeJson(row.ResultatsCommissionsJson, []),
      PointsVigilance: safeJson(row.PointsVigilanceJson, [])
    };
  },

  /**
   * Récupère la liste des dossiers POSITIFS transmis à la session ADMIN
   * Conforme à la Règle 5 & 6 : Ne renvoie JAMAIS de dossier NÉGATIF à l'administration
   */
  async getPositiveDossiersForAdmin({ commissionId = null, statutDecision = null, search = null } = {}) {
    const pool = await getDbPool();
    const req = pool.request();
    let whereClause = `WHERE ce.EstTransmisAdmin = 1 AND ce.RecommandationIA = 'POSITIF'`;

    if (commissionId) {
      whereClause += ` AND ca.CommissionId = @commId`;
      req.input('commId', parseInt(commissionId, 10));
    }

    if (statutDecision) {
      if (statutDecision === 'EN_ATTENTE') {
        whereClause += ` AND (asd.StatutDecision IS NULL OR asd.StatutDecision = 'EN_ATTENTE')`;
      } else {
        whereClause += ` AND asd.StatutDecision = @statutDec`;
        req.input('statutDec', statutDecision);
      }
    }

    if (search && search.trim()) {
      whereClause += ` AND (u.Nom LIKE @search OR u.Prenom LIKE @search OR u.Matricule LIKE @search OR c.Nom LIKE @search)`;
      req.input('search', `%${search.trim()}%`);
    }

    // 1. Calcul des KPIs pour le tableau de bord ADMIN
    const kpiRes = await pool.request().query(`
      SELECT 
        COUNT(ce.EvaluationId) AS TotalDossiersPositifs,
        COUNT(DISTINCT ca.UtilisateurId) AS ElevesConcernes,
        COUNT(DISTINCT ca.CommissionId) AS CommissionsContributrices,
        SUM(CASE WHEN asd.StatutDecision IS NULL OR asd.StatutDecision = 'EN_ATTENTE' THEN 1 ELSE 0 END) AS DecisionsEnAttente,
        SUM(CASE WHEN asd.StatutDecision = 'ACCEPTE' THEN 1 ELSE 0 END) AS DecisionsAcceptees,
        SUM(CASE WHEN asd.StatutDecision = 'REFUSE' THEN 1 ELSE 0 END) AS DecisionsRefusees
      FROM dbo.CommissionEvaluations ce
      JOIN dbo.CandidateCommissionAssignments ca ON ca.AssignmentId = ce.AssignmentId
      LEFT JOIN dbo.AdministrativeSelectionDecisions asd ON asd.AssignmentId = ca.AssignmentId
      WHERE ce.EstTransmisAdmin = 1 AND ce.RecommandationIA = 'POSITIF'
    `);
    const kpis = kpiRes.recordset[0] || {};

    // 2. Récupération des dossiers positifs
    const dossiersRes = await req.query(`
      SELECT 
        ca.AssignmentId, ca.UtilisateurId, ca.CommissionId, ca.StatutVentilation, ca.DateAffectation, ca.ScoreCorrespondanceIA,
        u.Matricule, u.Nom, u.Prenom, u.Email, u.FiliereEntree, u.DiplomeOrigine, u.SpecialiteOrigine,
        p.Nom AS PromotionNom,
        c.Code AS CommissionCode, c.Nom AS CommissionNom, c.Icone AS CommissionIcone, c.Couleur AS CommissionCouleur,
        ce.EvaluationId, ce.NotePratiqueSur20, ce.NoteEntretienSur20, ce.NoteComplementaireSur20, ce.NoteGlobaleSur20,
        ce.Observations AS ObservationsJury, ce.CommentairesComplementaires,
        ce.AvisCommission, ce.StatutEvaluation, ce.DateEvaluation, ce.EstVerrouillee,
        ce.RecommandationIA, ce.ResumeAnalyseIA, ce.JustificationIA,
        ce.PointsFortsIAJson, ce.PointsFaiblesIAJson, ce.NotesPrisesEnCompteJson, ce.ObservationsPrisesEnCompte,
        ce.DateAnalyseIA, ce.ModeleIAVersion, ce.EstTransmisAdmin, ce.DateTransmissionAdmin,
        ce.NomEvaluateur, evalU.Nom AS EvaluateurNomUser, evalU.Prenom AS EvaluateurPrenomUser,
        asd.DecisionId, asd.StatutDecision, asd.JustificationDecision, asd.DateDecision, asd.NomAdmin,
        adminU.Nom AS AdminNomUser, adminU.Prenom AS AdminPrenomUser
      FROM dbo.CommissionEvaluations ce
      JOIN dbo.CandidateCommissionAssignments ca ON ca.AssignmentId = ce.AssignmentId
      JOIN dbo.Utilisateurs u ON u.UtilisateurId = ca.UtilisateurId
      JOIN dbo.Commissions c ON c.CommissionId = ca.CommissionId
      LEFT JOIN dbo.Promotions p ON p.PromotionId = u.PromotionId
      LEFT JOIN dbo.Utilisateurs evalU ON evalU.UtilisateurId = ce.EvaluateurId
      LEFT JOIN dbo.AdministrativeSelectionDecisions asd ON asd.AssignmentId = ca.AssignmentId
      LEFT JOIN dbo.Utilisateurs adminU ON adminU.UtilisateurId = asd.DecisionPar
      ${whereClause}
      ORDER BY 
        CASE WHEN asd.StatutDecision IS NULL OR asd.StatutDecision = 'EN_ATTENTE' THEN 1 ELSE 2 END ASC,
        ce.DateTransmissionAdmin DESC
    `);

    const allDossiers = dossiersRes.recordset || [];
    const userIds = [...new Set(allDossiers.map(d => d.UtilisateurId))];

    // Traitement du cas particulier (Section 7) : Élève positif dans plusieurs commissions
    let multiMap = {};
    if (userIds.length > 0) {
      const multiRes = await pool.request().query(`
        SELECT 
          ca.UtilisateurId, ca.AssignmentId, ca.CommissionId,
          c.Code AS CommissionCode, c.Nom AS CommissionNom, c.Icone AS CommissionIcone, c.Couleur AS CommissionCouleur,
          ce.NoteGlobaleSur20, ce.NotePratiqueSur20, ce.NoteEntretienSur20, ce.DateTransmissionAdmin,
          ce.AvisCommission,
          asd.StatutDecision AS DecisionAutre
        FROM dbo.CommissionEvaluations ce
        JOIN dbo.CandidateCommissionAssignments ca ON ca.AssignmentId = ce.AssignmentId
        JOIN dbo.Commissions c ON c.CommissionId = ca.CommissionId
        LEFT JOIN dbo.AdministrativeSelectionDecisions asd ON asd.AssignmentId = ca.AssignmentId
        WHERE ce.EstTransmisAdmin = 1 AND ce.RecommandationIA = 'POSITIF'
          AND ca.UtilisateurId IN (${userIds.join(',')})
      `);

      (multiRes.recordset || []).forEach(row => {
        if (!multiMap[row.UtilisateurId]) multiMap[row.UtilisateurId] = [];
        multiMap[row.UtilisateurId].push(row);
      });
    }

    const dossiers = allDossiers.map(d => {
      const related = (multiMap[d.UtilisateurId] || []).filter(r => r.AssignmentId !== d.AssignmentId);
      const isMultiPositive = related.length > 0;

      return {
        assignmentId: d.AssignmentId,
        candidateId: d.UtilisateurId,
        matricule: d.Matricule,
        nom: d.Nom,
        prenom: d.Prenom,
        nomComplet: `${d.Prenom} ${d.Nom}`,
        email: d.Email,
        filiereEntree: d.FiliereEntree,
        diplomeOrigine: d.DiplomeOrigine,
        specialiteOrigine: d.SpecialiteOrigine,
        promotionNom: d.PromotionNom,
        commission: {
          id: d.CommissionId,
          code: d.CommissionCode,
          nom: d.CommissionNom,
          icone: d.CommissionIcone,
          couleur: d.CommissionCouleur
        },
        evaluation: {
          id: d.EvaluationId,
          notePratiqueSur20: d.NotePratiqueSur20,
          noteEntretienSur20: d.NoteEntretienSur20,
          noteComplementaireSur20: d.NoteComplementaireSur20,
          noteGlobaleSur20: d.NoteGlobaleSur20,
          observationsJury: d.ObservationsJury,
          commentairesComplementaires: d.CommentairesComplementaires,
          avisCommission: d.AvisCommission,
          statutEvaluation: d.StatutEvaluation,
          dateEvaluation: d.DateEvaluation,
          nomEvaluateur: d.NomEvaluateur || (d.EvaluateurNomUser ? `${d.EvaluateurPrenomUser} ${d.EvaluateurNomUser}` : 'Évaluateur Commission')
        },
        analyseIA: {
          recommandationIA: d.RecommandationIA,
          resumeAnalyseIA: d.ResumeAnalyseIA,
          justificationIA: d.JustificationIA,
          pointsForts: safeJson(d.PointsFortsIAJson, []),
          pointsFaibles: safeJson(d.PointsFaiblesIAJson, []),
          notesPrisesEnCompte: safeJson(d.NotesPrisesEnCompteJson, null),
          observationsPrisesEnCompte: d.ObservationsPrisesEnCompte,
          dateAnalyseIA: d.DateAnalyseIA,
          modeleIAVersion: d.ModeleIAVersion
        },
        transmission: {
          estTransmisAdmin: d.EstTransmisAdmin === 1 || d.EstTransmisAdmin === true,
          dateTransmissionAdmin: d.DateTransmissionAdmin
        },
        decision: d.DecisionId ? {
          decisionId: d.DecisionId,
          statutDecision: d.StatutDecision,
          justificationDecision: d.JustificationDecision,
          dateDecision: d.DateDecision,
          nomAdmin: d.NomAdmin || (d.AdminNomUser ? `${d.AdminPrenomUser} ${d.AdminNomUser}` : 'Commandement')
        } : null,
        statutDecision: d.StatutDecision || 'EN_ATTENTE',
        isMultiPositive,
        autresCommissionsPositives: related
      };
    });

    return {
      kpis: {
        totalDossiersPositifs: kpis.TotalDossiersPositifs || 0,
        elevesConcernes: kpis.ElevesConcernes || 0,
        commissionsContributrices: kpis.CommissionsContributrices || 0,
        decisionsEnAttente: kpis.DecisionsEnAttente || 0,
        decisionsAcceptees: kpis.DecisionsAcceptees || 0,
        decisionsRefusees: kpis.DecisionsRefusees || 0
      },
      dossiers
    };
  },

  /**
   * Enregistre une décision administrative officielle de recrutement par dossier/commission
   * Conforme à la Règle 6 : Seul l'ADMIN décide (ACCEPTE ou REFUSE) avec justification obligatoire
   */
  async saveAdminDecisionForAssignment({
    assignmentId,
    candidateId = null,
    decision,
    justification,
    adminId,
    adminNom = null,
    specialiteRetenueCode = null
  }) {
    const pool = await getDbPool();
    if (!['ACCEPTE', 'REFUSE'].includes(decision)) {
      throw new Error("La décision doit être soit 'ACCEPTE' soit 'REFUSE'.");
    }
    if (!justification || !justification.trim()) {
      throw new Error("Une justification administrative est obligatoire.");
    }

    // Récupérer l'affectation et la commission
    const assignRes = await pool.request()
      .input('assignId', assignmentId)
      .query(`
        SELECT ca.AssignmentId, ca.UtilisateurId, ca.CommissionId, c.Code AS CommissionCode, c.Nom AS CommissionNom
        FROM dbo.CandidateCommissionAssignments ca
        JOIN dbo.Commissions c ON c.CommissionId = ca.CommissionId
        WHERE ca.AssignmentId = @assignId
      `);
    if (assignRes.recordset.length === 0) {
      throw new Error("Affectation introuvable.");
    }
    const assign = assignRes.recordset[0];
    const specCode = specialiteRetenueCode || assign.CommissionCode;

    // Nom de l'admin
    let adminName = adminNom;
    if (!adminName && adminId) {
      const userRes = await pool.request()
        .input('uid', adminId)
        .query('SELECT Nom, Prenom FROM dbo.Utilisateurs WHERE UtilisateurId = @uid');
      if (userRes.recordset.length > 0) {
        adminName = `${userRes.recordset[0].Prenom} ${userRes.recordset[0].Nom}`;
      } else {
        adminName = 'Commandement';
      }
    }

    // Vérifier si une décision existe déjà pour cette affectation
    const existing = await pool.request()
      .input('assignId', assignmentId)
      .query('SELECT DecisionId FROM dbo.AdministrativeSelectionDecisions WHERE AssignmentId = @assignId');

    let decisionId;
    if (existing.recordset.length > 0) {
      decisionId = existing.recordset[0].DecisionId;
      await pool.request()
        .input('id', decisionId)
        .input('statut', decision)
        .input('justif', justification.trim())
        .input('adminId', adminId)
        .input('nomAdmin', adminName)
        .input('spec', specCode)
        .query(`
          UPDATE dbo.AdministrativeSelectionDecisions
          SET StatutDecision = @statut,
              JustificationDecision = @justif,
              DecisionPar = @adminId,
              NomAdmin = @nomAdmin,
              SpecialiteRetenueCode = @spec,
              DateDecision = SYSUTCDATETIME()
          WHERE DecisionId = @id
        `);
    } else {
      const insRes = await pool.request()
        .input('candId', assign.UtilisateurId)
        .input('assignId', assignmentId)
        .input('commId', assign.CommissionId)
        .input('spec', specCode)
        .input('statut', decision)
        .input('justif', justification.trim())
        .input('adminId', adminId)
        .input('nomAdmin', adminName)
        .query(`
          INSERT INTO dbo.AdministrativeSelectionDecisions (
            UtilisateurId, AssignmentId, CommissionRetenueId, SpecialiteRetenueCode,
            StatutDecision, JustificationDecision, DecisionPar, NomAdmin, DateDecision, EstVerrouillee
          )
          OUTPUT INSERTED.DecisionId
          VALUES (
            @candId, @assignId, @commId, @spec,
            @statut, @justif, @adminId, @nomAdmin, SYSUTCDATETIME(), 1
          )
        `);
      decisionId = insRes.recordset[0]?.DecisionId;
    }

    // Mettre à jour le statut sur l'affectation
    await pool.request()
      .input('assignId', assignmentId)
      .input('statut', decision)
      .input('justif', justification.trim())
      .query(`
        UPDATE dbo.CandidateCommissionAssignments
        SET StatutVentilation = @statut,
            JustificationAdmin = @justif
        WHERE AssignmentId = @assignId
      `);

    return {
      decisionId,
      assignmentId,
      candidateId: assign.UtilisateurId,
      statutDecision: decision,
      justificationDecision: justification.trim(),
      nomAdmin: adminName,
      dateDecision: new Date().toISOString()
    };
  },

  /**
   * Enregistre une décision administrative officielle de recrutement (méthode de compatibilité globale)
   */
  async saveAdministrativeDecision({
    candidateId,
    comparisonId = null,
    commissionRetenueId = null,
    specialiteRetenueCode,
    statutDecision = 'AFFECTE_OFFICIEL',
    justificationDecision,
    decisionPar
  }) {
    const pool = await getDbPool();
    const res = await pool.request()
      .input('candId', candidateId)
      .input('compId', comparisonId)
      .input('commId', commissionRetenueId)
      .input('spec', specialiteRetenueCode)
      .input('statut', statutDecision)
      .input('justif', justificationDecision)
      .input('decPar', decisionPar)
      .query(`
        INSERT INTO dbo.AdministrativeSelectionDecisions (
          UtilisateurId, ComparisonId, CommissionRetenueId, SpecialiteRetenueCode,
          StatutDecision, JustificationDecision, DecisionPar
        )
        OUTPUT INSERTED.DecisionId
        VALUES (@candId, @compId, @commId, @spec, @statut, @justif, @decPar)
      `);
    return res.recordset[0]?.DecisionId;
  },

  /**
   * Récupère le récapitulatif global pour le tableau de bord de recrutement de l'ADMIN
   */
  async getAdminRecruitmentSummary() {
    const pool = await getDbPool();

    // 1. Statistiques globales
    const kpiRes = await pool.request().query(`
      SELECT 
        (SELECT COUNT(*) FROM dbo.Utilisateurs WHERE Role = 'ELEVE' AND EstActif = 1) AS TotalEleves,
        (SELECT COUNT(DISTINCT UtilisateurId) FROM dbo.CandidateCommissionAssignments) AS ElevesVentiles,
        (SELECT COUNT(*) FROM dbo.CandidateCommissionAssignments) AS TotalAffectations,
        (SELECT COUNT(*) FROM dbo.CommissionEvaluations WHERE StatutEvaluation IN ('SOUMISE', 'VALIDEE')) AS EvaluationsFinalisees,
        (SELECT COUNT(*) FROM dbo.CommissionEvaluations WHERE EstTransmisAdmin = 1 AND RecommandationIA = 'POSITIF') AS DossiersPositifsTransmis,
        (SELECT COUNT(*) FROM dbo.AdministrativeSelectionDecisions WHERE StatutDecision = 'ACCEPTE') AS CandidatsAcceptes,
        (SELECT COUNT(*) FROM dbo.AdministrativeSelectionDecisions WHERE StatutDecision = 'REFUSE') AS CandidatsRefuses
    `);
    const kpis = kpiRes.recordset[0] || {};

    // 2. Liste globale des candidats avec leurs affectations
    const candRes = await pool.request().query(`
      SELECT 
        u.UtilisateurId, u.Matricule, u.Nom, u.Prenom, u.FiliereEntree, u.DiplomeOrigine, u.SpecialiteOrigine,
        p.Nom AS PromotionNom,
        (SELECT COUNT(*) FROM dbo.CandidateCommissionAssignments ca WHERE ca.UtilisateurId = u.UtilisateurId) AS NombreCommissions,
        (
          SELECT 
            ca.AssignmentId, ca.CommissionId, c.Code AS CommissionCode, c.Nom AS CommissionNom,
            ca.ScoreCorrespondanceIA, ca.StatutVentilation, ca.DateConvocation,
            ce.NotePratiqueSur20, ce.NoteEntretienSur20, ce.NoteGlobaleSur20, ce.AvisCommission, ce.StatutEvaluation,
            ce.RecommandationIA, ce.EstTransmisAdmin, ce.DateTransmissionAdmin
          FROM dbo.CandidateCommissionAssignments ca
          JOIN dbo.Commissions c ON c.CommissionId = ca.CommissionId
          LEFT JOIN dbo.CommissionEvaluations ce ON ce.AssignmentId = ca.AssignmentId
          WHERE ca.UtilisateurId = u.UtilisateurId
          FOR JSON PATH
        ) AS CommissionsJson,
        (
          SELECT TOP 1 csc.RecommandationPrincipaleCode, csc.IndiceConfiance, csc.DateComparaison
          FROM dbo.CandidateSelectionComparisons csc
          WHERE csc.UtilisateurId = u.UtilisateurId
          ORDER BY csc.DateComparaison DESC
          FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ) AS DerniereComparaisonJson,
        (
          SELECT TOP 1 asd.SpecialiteRetenueCode, asd.StatutDecision, asd.DateDecision, asd.JustificationDecision
          FROM dbo.AdministrativeSelectionDecisions asd
          WHERE asd.UtilisateurId = u.UtilisateurId
          ORDER BY asd.DateDecision DESC
          FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ) AS DecisionAdministrativeJson
      FROM dbo.Utilisateurs u
      LEFT JOIN dbo.Promotions p ON p.PromotionId = u.PromotionId
      WHERE u.Role = 'ELEVE' AND u.EstActif = 1
      ORDER BY u.Nom ASC
    `);

    const candidats = (candRes.recordset || []).map(r => ({
      UtilisateurId: r.UtilisateurId,
      Matricule: r.Matricule,
      Nom: r.Nom,
      Prenom: r.Prenom,
      FiliereEntree: r.FiliereEntree,
      DiplomeOrigine: r.DiplomeOrigine,
      SpecialiteOrigine: r.SpecialiteOrigine,
      PromotionNom: r.PromotionNom,
      NombreCommissions: r.NombreCommissions,
      Commissions: safeJson(r.CommissionsJson, []),
      DerniereComparaison: safeJson(r.DerniereComparaisonJson, null),
      DecisionAdministrative: safeJson(r.DecisionAdministrativeJson, null)
    }));

    return { kpis, candidats };
  }
};
