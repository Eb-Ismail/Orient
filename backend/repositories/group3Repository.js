// ==============================================================================
// ORIENT-GR — Repository SQL Server : Groupe 3
// Ateliers Pratiques, Tests QCM & Questions, Simulations v1, Compétences,
// Propositions d'Orientation & Analytics
// ==============================================================================

import { getDbPool, useSqlServer, mockStore } from '../lib/db.js';
import { coreRepository, parseUserRow } from './coreRepository.js';
import {
  canonicalCompetencyFramework,
  initialSpecialtyCompetencyMatrix,
  defaultScoringCriteriaConfig
} from '../lib/competencyFramework.js';
import { simulationTaskBank60 } from '../lib/simulationTaskBank60.js';

function safeJson(raw, fallback) {
  if (raw === null || raw === undefined) return fallback;
  if (typeof raw !== 'string') return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function mapCategoryRow(row) {
  return {
    id: row.CategoryId,
    code: row.Code,
    intituleFr: row.IntituleFr,
    intituleAr: row.IntituleAr,
    icone: row.Icone,
    couleur: row.Couleur,
    descriptionFr: row.DescriptionFr,
    descriptionAr: row.DescriptionAr,
    sousDomaines: safeJson(row.SousDomainesJson, []),
    specialitesCibles: safeJson(row.SpecialitesCiblesJson, [])
  };
}

function mapWorkshopRow(row) {
  const meta = safeJson(row.StepsJson, {});
  const isLegacyArray = Array.isArray(meta);
  const full = (!isLegacyArray && meta && typeof meta === 'object') ? meta : {};
  return {
    ...full,
    AtelierId: row.WorkshopId,
    CategorieId: row.CategoryId,
    Code: row.Code,
    Titre: row.Titre,
    TitreAr: row.TitreAr || full.TitreAr || row.Titre,
    SousDomaine: row.SousDomaine || full.SousDomaine || 'Général',
    DescriptionFr: full.DescriptionFr || row.Description || '',
    DescriptionAr: full.DescriptionAr || '',
    NiveauDifficulte: row.Niveau || full.NiveauDifficulte || 'INTERMEDIAIRE',
    DureeMinutes: row.DureeMinutes ?? 60,
    LieuAtelier: full.LieuAtelier || 'Atelier Régimentaire',
    CapaciteMax: full.CapaciteMax ?? 8,
    SuperviseurParDefaut: full.SuperviseurParDefaut || 'Instructeur Spécialisé',
    Statut: full.Statut || (row.EstActif ? 'ACTIF' : 'ARCHIVE'),
    EstActif: Boolean(row.EstActif),
    Objectifs: safeJson(row.ObjectifsJson, []),
    EquipementsRequis: full.EquipementsRequis || [],
    ConsignesSecurite: full.ConsignesSecurite || [],
    TachesPratiques: full.TachesPratiques || (isLegacyArray ? meta : []),
    CriteresEvaluation: safeJson(row.CriteriaJson, []),
    ScoreTotalMax: Number(row.NoteMax ?? full.ScoreTotalMax ?? 20),
    DateCreation: row.CreatedAt instanceof Date ? row.CreatedAt.toISOString() : row.CreatedAt
  };
}

function mapAssignmentRow(row) {
  const full = safeJson(row.SoumissionJson, {});
  return {
    ...full,
    AssignationId: row.AssignationId,
    AtelierId: row.WorkshopId,
    UtilisateurId: row.UtilisateurId,
    SuperviseurId: full.SuperviseurId ?? row.InstructeurId ?? 6,
    Statut: row.Statut || full.Statut || 'ASSIGNE',
    ScoreObtenu: row.NoteSur20 !== null && row.NoteSur20 !== undefined ? Number(row.NoteSur20) : (full.ScoreObtenu ?? null),
    NotesCriteres: full.NotesCriteres || safeJson(row.ScoresCriteresJson, {}),
    ObservationsEvaluateur: full.ObservationsEvaluateur ?? row.CommentaireInstructeur ?? '',
    DateAssignation: full.DateAssignation || (row.DateAssignation instanceof Date ? row.DateAssignation.toISOString() : row.DateAssignation)
  };
}

function mapTestRow(row) {
  return {
    TestId: row.TestId,
    Code: row.Code,
    Titre: row.Titre,
    TitreFr: row.TitreFr || row.Titre,
    Description: row.Description,
    DureeMinutes: row.DureeMinutes,
    NombreQuestions: row.NombreQuestions,
    CategoriesIncluses: safeJson(row.CategoriesIncluses, []),
    DifficulteCible: row.DifficulteCible,
    AutoriserRetour: Boolean(row.AutoriserRetour),
    AutoriserPause: Boolean(row.AutoriserPause),
    AutoriserReprise: Boolean(row.AutoriserReprise),
    NombreTentativesMax: row.NombreTentativesMax,
    SeuilReussite: Number(row.SeuilReussite),
    SelectionAleatoire: Boolean(row.SelectionAleatoire),
    SeedReproductible: Boolean(row.SeedReproductible),
    QuestionsFixees: safeJson(row.QuestionsFixees, null),
    CompetencesAssociees: safeJson(row.CompetencesAssociees, []),
    Version: row.Version,
    EstActif: Boolean(row.EstActif),
    CreatedAt: row.CreatedAt instanceof Date ? row.CreatedAt.toISOString() : row.CreatedAt
  };
}

function mapQuestionRow(row, options = [], domMapById = new Map()) {
  const dom = row.DomaineId ? domMapById.get(row.DomaineId) : null;
  return {
    QuestionId: row.QuestionId,
    TestId: row.TestId,
    DomaineId: row.DomaineId,
    DomaineCode: row.CategorieCode || dom?.Code || 'LOGIQUE',
    DomaineIntitule: dom?.Intitule || row.CategorieCode || 'Raisonnement Logique',
    CategorieCode: row.CategorieCode,
    Code: row.Code,
    Enonce: row.Enonce,
    ContexteSituationnel: row.ContexteSituationnel,
    TypeQuestion: row.TypeQuestion,
    Difficulte: row.Difficulte,
    Points: row.Points,
    TempsLimiteSecondes: row.TempsLimiteSecondes,
    SchemaSVG: row.SchemaSVG,
    Explication: row.Explication,
    CompetencesAssociees: safeJson(row.CompetencesAssociees, []),
    SpecialitesAssociees: safeJson(row.SpecialitesAssociees, []),
    BaremeSubjectif: safeJson(row.BaremeSubjectif, null),
    OrdreAffichage: row.OrdreAffichage,
    EstActive: Boolean(row.EstActive),
    EstArchivee: Boolean(row.EstArchivee),
    Version: row.Version,
    Options: options.map(o => ({
      OptionId: o.OptionId,
      QuestionId: o.QuestionId,
      LettreOption: o.LettreOption,
      EnonceOption: o.EnonceOption,
      SchemaSVG: o.SchemaSVG,
      EstCorrecte: Boolean(o.EstCorrecte),
      PoidsOption: Number(o.PoidsOption ?? 1.0)
    }))
  };
}

function mapTestSessionRow(row) {
  const cfg = safeJson(row.ConfigSnapshot, {});
  const extras = (cfg && typeof cfg === 'object' && !Array.isArray(cfg)) ? cfg : {};
  return {
    ...extras,
    SessionId: row.SessionId,
    UtilisateurId: row.UtilisateurId,
    TestId: row.TestId,
    TentativeNumero: row.TentativeNumero,
    SeedGeneration: row.SeedGeneration,
    QuestionsSnapshot: safeJson(row.QuestionsSnapshot, []),
    CandidatSnapshot: safeJson(row.CandidatSnapshot, null),
    DateDebut: row.DateDebut instanceof Date ? row.DateDebut.toISOString() : row.DateDebut,
    DateFinMaxServeur: row.DateFinMaxServeur instanceof Date ? row.DateFinMaxServeur.toISOString() : row.DateFinMaxServeur,
    DateFin: row.DateFin instanceof Date ? row.DateFin.toISOString() : row.DateFin,
    DureeEcouleeSecondes: row.DureeEcouleeSecondes ?? 0,
    Statut: row.Statut,
    ScoreBrut: row.ScoreBrut !== null && row.ScoreBrut !== undefined ? Number(row.ScoreBrut) : null,
    ScoreTotal: row.ScoreTotal !== null && row.ScoreTotal !== undefined ? Number(row.ScoreTotal) : null,
    ScorePourcentage: row.ScorePourcentage !== null && row.ScorePourcentage !== undefined ? Number(row.ScorePourcentage) : null,
    IndiceConfiance: row.IndiceConfiance !== null && row.IndiceConfiance !== undefined ? Number(row.IndiceConfiance) : null,
    ProfilIncomplet: Boolean(row.ProfilIncomplet),
    DonneesManquantes: safeJson(row.DonneesManquantes, []),
    Progression: row.Progression ?? 0,
    CreatedAt: row.CreatedAt instanceof Date ? row.CreatedAt.toISOString() : row.CreatedAt
  };
}

export const group3Repository = {
  // ============================================================================
  // A. ATELIERS PRATIQUES
  // ============================================================================

  async loadWorkshopsBundle() {
    if (!(await useSqlServer())) {
      return {
        categories: mockStore.workshopCategories || [],
        workshops: mockStore.workshops || [],
        assignments: mockStore.workshopAssignments || [],
        users: mockStore.users || [],
        promotions: mockStore.promotions || [],
        isSql: false
      };
    }

    const pool = await getDbPool();
    const [catsRes, wsRes, assignRes, usersRes, promosRes] = await Promise.all([
      pool.request().query(`SELECT * FROM dbo.WorkshopCategories ORDER BY CategoryId ASC`),
      pool.request().query(`SELECT * FROM dbo.Workshops ORDER BY WorkshopId ASC`),
      pool.request().query(`SELECT * FROM dbo.WorkshopAssignments ORDER BY AssignationId ASC`),
      pool.request().query(`SELECT * FROM dbo.Utilisateurs ORDER BY UtilisateurId ASC`),
      pool.request().query(`SELECT * FROM dbo.Promotions ORDER BY PromotionId ASC`)
    ]);

    return {
      categories: catsRes.recordset.map(mapCategoryRow),
      workshops: wsRes.recordset.map(mapWorkshopRow),
      assignments: assignRes.recordset.map(mapAssignmentRow),
      users: usersRes.recordset.map(parseUserRow),
      promotions: promosRes.recordset,
      isSql: true
    };
  },

  async insertWorkshop(w) {
    if (!(await useSqlServer())) {
      mockStore.workshops.push(w);
      return w;
    }

    const pool = await getDbPool();
    const idRes = await pool.request().query(`SELECT ISNULL(MAX(WorkshopId), 0) + 1 AS NextId FROM dbo.Workshops`);
    const nextId = idRes.recordset[0].NextId;
    const workshop = { ...w, AtelierId: nextId };
    if (!w.Code) {
      const catShort = String(workshop.CategorieId || 'GEN').replace('CAT-', '');
      workshop.Code = `ATEL-${catShort}-${String(nextId).padStart(2, '0')}`;
    }

    const stepsPayload = {
      DescriptionFr: workshop.DescriptionFr || '',
      DescriptionAr: workshop.DescriptionAr || '',
      LieuAtelier: workshop.LieuAtelier || '',
      CapaciteMax: workshop.CapaciteMax ?? 6,
      SuperviseurParDefaut: workshop.SuperviseurParDefaut || '',
      Statut: workshop.Statut || 'ACTIF',
      EquipementsRequis: workshop.EquipementsRequis || [],
      ConsignesSecurite: workshop.ConsignesSecurite || [],
      TachesPratiques: workshop.TachesPratiques || [],
      ScoreTotalMax: workshop.ScoreTotalMax ?? 20,
      CreePar: workshop.CreePar || null
    };

    await pool.request()
      .input('WorkshopId', workshop.AtelierId)
      .input('CategoryId', workshop.CategorieId)
      .input('Code', workshop.Code)
      .input('Titre', workshop.Titre)
      .input('TitreAr', workshop.TitreAr || workshop.Titre)
      .input('SousDomaine', workshop.SousDomaine || 'Général')
      .input('Description', workshop.DescriptionFr || '')
      .input('ObjectifsJson', JSON.stringify(workshop.Objectifs || []))
      .input('StepsJson', JSON.stringify(stepsPayload))
      .input('CriteriaJson', JSON.stringify(workshop.CriteresEvaluation || []))
      .input('DureeMinutes', workshop.DureeMinutes ?? 60)
      .input('Niveau', workshop.NiveauDifficulte || 'INTERMEDIAIRE')
      .input('NoteMax', workshop.ScoreTotalMax ?? 20)
      .input('EstActif', workshop.Statut === 'ARCHIVE' ? 0 : 1)
      .query(`
        INSERT INTO dbo.Workshops (
          WorkshopId, CategoryId, Code, Titre, TitreAr, SousDomaine, Description,
          ObjectifsJson, StepsJson, CriteriaJson, DureeMinutes, Niveau, NoteMax, EstActif
        )
        VALUES (
          @WorkshopId, @CategoryId, @Code, @Titre, @TitreAr, @SousDomaine, @Description,
          @ObjectifsJson, @StepsJson, @CriteriaJson, @DureeMinutes, @Niveau, @NoteMax, @EstActif
        );
      `);
    return workshop;
  },

  async updateWorkshop(workshop) {
    if (!(await useSqlServer())) return workshop;

    const pool = await getDbPool();
    const stepsPayload = { ...workshop };
    await pool.request()
      .input('WorkshopId', workshop.AtelierId)
      .input('CategoryId', workshop.CategorieId)
      .input('Titre', workshop.Titre)
      .input('TitreAr', workshop.TitreAr || workshop.Titre)
      .input('SousDomaine', workshop.SousDomaine || 'Général')
      .input('Description', workshop.DescriptionFr || '')
      .input('ObjectifsJson', JSON.stringify(workshop.Objectifs || []))
      .input('StepsJson', JSON.stringify(stepsPayload))
      .input('CriteriaJson', JSON.stringify(workshop.CriteresEvaluation || []))
      .input('DureeMinutes', workshop.DureeMinutes ?? 60)
      .input('Niveau', workshop.NiveauDifficulte || 'INTERMEDIAIRE')
      .input('NoteMax', workshop.ScoreTotalMax ?? 20)
      .input('EstActif', workshop.Statut === 'ARCHIVE' ? 0 : 1)
      .query(`
        UPDATE dbo.Workshops
        SET CategoryId = @CategoryId, Titre = @Titre, TitreAr = @TitreAr, SousDomaine = @SousDomaine,
            Description = @Description, ObjectifsJson = @ObjectifsJson, StepsJson = @StepsJson,
            CriteriaJson = @CriteriaJson, DureeMinutes = @DureeMinutes, Niveau = @Niveau,
            NoteMax = @NoteMax, EstActif = @EstActif
        WHERE WorkshopId = @WorkshopId;
      `);
    return workshop;
  },

  async insertAssignment(assignObj) {
    if (!(await useSqlServer())) {
      const nextId = (mockStore.workshopAssignments || []).reduce((m, a) => Math.max(m, a.AssignationId || 0), 0) + 1;
      const saved = { ...assignObj, AssignationId: nextId };
      mockStore.workshopAssignments.push(saved);
      return saved;
    }

    const pool = await getDbPool();
    const ins = await pool.request()
      .input('WorkshopId', assignObj.AtelierId)
      .input('UtilisateurId', assignObj.UtilisateurId)
      .input('InstructeurId', assignObj.SuperviseurId || 6)
      .input('Statut', assignObj.Statut || 'NON_COMMENCE')
      .input('SoumissionJson', JSON.stringify(assignObj))
      .input('NoteSur20', assignObj.ScoreObtenu ?? null)
      .input('ScoresCriteresJson', JSON.stringify(assignObj.NotesCriteres || {}))
      .input('CommentaireInstructeur', assignObj.ObservationsEvaluateur || null)
      .input('DateAssignation', assignObj.DateAssignation ? new Date(assignObj.DateAssignation) : new Date())
      .query(`
        INSERT INTO dbo.WorkshopAssignments (
          WorkshopId, UtilisateurId, InstructeurId, Statut, SoumissionJson,
          NoteSur20, ScoresCriteresJson, CommentaireInstructeur, DateAssignation
        )
        OUTPUT INSERTED.AssignationId
        VALUES (
          @WorkshopId, @UtilisateurId, @InstructeurId, @Statut, @SoumissionJson,
          @NoteSur20, @ScoresCriteresJson, @CommentaireInstructeur, @DateAssignation
        );
      `);
    const newId = ins.recordset[0].AssignationId;
    const finalObj = { ...assignObj, AssignationId: newId };
    await pool.request()
      .input('Id', newId)
      .input('Json', JSON.stringify(finalObj))
      .query(`UPDATE dbo.WorkshopAssignments SET SoumissionJson = @Json WHERE AssignationId = @Id`);
    return finalObj;
  },

  async updateAssignment(assignObj) {
    if (!(await useSqlServer())) return assignObj;

    const pool = await getDbPool();
    await pool.request()
      .input('Id', assignObj.AssignationId)
      .input('InstructeurId', assignObj.SuperviseurId || 6)
      .input('Statut', assignObj.Statut)
      .input('SoumissionJson', JSON.stringify(assignObj))
      .input('NoteSur20', assignObj.ScoreObtenu ?? null)
      .input('ScoresCriteresJson', JSON.stringify(assignObj.NotesCriteres || {}))
      .input('CommentaireInstructeur', assignObj.ObservationsEvaluateur || null)
      .input('DateSoumission', assignObj.DateSoumission ? new Date(assignObj.DateSoumission) : null)
      .input('DateEvaluation', assignObj.DateValidation || assignObj.DateRealisation ? new Date(assignObj.DateValidation || assignObj.DateRealisation) : null)
      .query(`
        UPDATE dbo.WorkshopAssignments
        SET InstructeurId = @InstructeurId,
            Statut = @Statut,
            SoumissionJson = @SoumissionJson,
            NoteSur20 = @NoteSur20,
            ScoresCriteresJson = @ScoresCriteresJson,
            CommentaireInstructeur = @CommentaireInstructeur,
            DateSoumission = COALESCE(@DateSoumission, DateSoumission),
            DateEvaluation = COALESCE(@DateEvaluation, DateEvaluation)
        WHERE AssignationId = @Id;
      `);
    return assignObj;
  },

  // ============================================================================
  // B. TESTS QCM, QUESTIONS, SESSIONS & ÉVALUATIONS SUBJECTIVES
  // ============================================================================

  async getTests() {
    if (!(await useSqlServer())) return mockStore.tests || [];
    const pool = await getDbPool();
    const res = await pool.request().query(`SELECT * FROM dbo.Tests ORDER BY TestId ASC`);
    return res.recordset.map(mapTestRow);
  },

  async getQuestions(includeArchived = true) {
    if (!(await useSqlServer())) {
      return includeArchived ? (mockStore.questions || []) : (mockStore.questions || []).filter(q => !q.EstArchivee);
    }
    const pool = await getDbPool();
    const [qRes, optRes, domRes] = await Promise.all([
      pool.request().query(`SELECT * FROM dbo.Questions ${includeArchived ? '' : 'WHERE EstArchivee = 0'} ORDER BY QuestionId ASC`),
      pool.request().query(`SELECT * FROM dbo.OptionsReponse ORDER BY OptionId ASC`),
      pool.request().query(`SELECT * FROM dbo.DomainesCompetences`)
    ]);
    const domMap = new Map(domRes.recordset.map(d => [d.DomaineId, d]));
    const optsByQ = new Map();
    for (const o of optRes.recordset) {
      if (!optsByQ.has(o.QuestionId)) optsByQ.set(o.QuestionId, []);
      optsByQ.get(o.QuestionId).push(o);
    }
    return qRes.recordset.map(q => mapQuestionRow(q, optsByQ.get(q.QuestionId) || [], domMap));
  },

  async getQuestionById(questionId) {
    const id = parseInt(questionId, 10);
    if (!(await useSqlServer())) {
      return (mockStore.questions || []).find(q => q.QuestionId === id) || null;
    }
    const pool = await getDbPool();
    const [qRes, optRes, domRes] = await Promise.all([
      pool.request().input('Id', id).query(`SELECT TOP 1 * FROM dbo.Questions WHERE QuestionId = @Id`),
      pool.request().input('Id', id).query(`SELECT * FROM dbo.OptionsReponse WHERE QuestionId = @Id ORDER BY OptionId ASC`),
      pool.request().query(`SELECT * FROM dbo.DomainesCompetences`)
    ]);
    if (!qRes.recordset[0]) return null;
    const domMap = new Map(domRes.recordset.map(d => [d.DomaineId, d]));
    return mapQuestionRow(qRes.recordset[0], optRes.recordset, domMap);
  },

  async createQuestion(qData) {
    if (!(await useSqlServer())) {
      mockStore.questions.push(qData);
      return qData;
    }
    const pool = await getDbPool();
    const tx = pool.transaction();
    await tx.begin();
    try {
      const countRes = await tx.request().query(`SELECT ISNULL(MAX(QuestionId), 0) + 1 AS NextId FROM dbo.Questions`);
      const nextOrd = countRes.recordset[0].NextId;
      const code = qData.Code || `Q-GEN-${String(nextOrd).padStart(2, '0')}`;
      const insQ = await tx.request()
        .input('TestId', qData.TestId || 1)
        .input('DomaineId', qData.DomaineId ?? null)
        .input('CategorieCode', qData.DomaineCode || qData.CategorieCode || 'LOGIQUE')
        .input('Code', code)
        .input('Enonce', qData.Enonce)
        .input('ContexteSituationnel', qData.ContexteSituationnel || null)
        .input('TypeQuestion', qData.TypeQuestion || 'QCM_UNIQUE')
        .input('Difficulte', qData.Difficulte || 'MOYEN')
        .input('Points', qData.Points ?? 1)
        .input('TempsLimiteSecondes', qData.TempsLimiteSecondes ?? null)
        .input('SchemaSVG', qData.SchemaSVG || null)
        .input('Explication', qData.Explication || '')
        .input('CompetencesAssociees', JSON.stringify(qData.CompetencesAssociees || []))
        .input('SpecialitesAssociees', JSON.stringify(qData.SpecialitesAssociees || []))
        .input('BaremeSubjectif', qData.BaremeSubjectif ? JSON.stringify(qData.BaremeSubjectif) : null)
        .input('OrdreAffichage', qData.OrdreAffichage ?? nextOrd)
        .input('EstActive', qData.EstActive !== false ? 1 : 0)
        .query(`
          INSERT INTO dbo.Questions (
            TestId, DomaineId, CategorieCode, Code, Enonce, ContexteSituationnel,
            TypeQuestion, Difficulte, Points, TempsLimiteSecondes, SchemaSVG, Explication,
            CompetencesAssociees, SpecialitesAssociees, BaremeSubjectif, OrdreAffichage, EstActive, EstArchivee, Version
          )
          OUTPUT INSERTED.*
          VALUES (
            @TestId, @DomaineId, @CategorieCode, @Code, @Enonce, @ContexteSituationnel,
            @TypeQuestion, @Difficulte, @Points, @TempsLimiteSecondes, @SchemaSVG, @Explication,
            @CompetencesAssociees, @SpecialitesAssociees, @BaremeSubjectif, @OrdreAffichage, @EstActive, 0, 1
          );
        `);
      const qRow = insQ.recordset[0];
      const insertedOpts = [];
      for (const opt of (qData.Options || [])) {
        const insOpt = await tx.request()
          .input('QuestionId', qRow.QuestionId)
          .input('LettreOption', opt.LettreOption || 'A')
          .input('EnonceOption', opt.EnonceOption || '')
          .input('SchemaSVG', opt.SchemaSVG || null)
          .input('EstCorrecte', opt.EstCorrecte ? 1 : 0)
          .query(`
            INSERT INTO dbo.OptionsReponse (QuestionId, LettreOption, EnonceOption, SchemaSVG, EstCorrecte)
            OUTPUT INSERTED.*
            VALUES (@QuestionId, @LettreOption, @EnonceOption, @SchemaSVG, @EstCorrecte);
          `);
        insertedOpts.push(insOpt.recordset[0]);
      }
      await tx.commit();
      return mapQuestionRow(qRow, insertedOpts);
    } catch (err) {
      await tx.rollback();
      throw err;
    }
  },

  async updateQuestion(questionObj) {
    if (!(await useSqlServer())) return questionObj;

    const pool = await getDbPool();
    const tx = pool.transaction();
    await tx.begin();
    try {
      const updQ = await tx.request()
        .input('Id', questionObj.QuestionId)
        .input('Enonce', questionObj.Enonce)
        .input('ContexteSituationnel', questionObj.ContexteSituationnel || null)
        .input('Difficulte', questionObj.Difficulte || 'MOYEN')
        .input('Points', questionObj.Points ?? 1)
        .input('TempsLimiteSecondes', questionObj.TempsLimiteSecondes ?? null)
        .input('Explication', questionObj.Explication || '')
        .input('EstActive', questionObj.EstActive !== false ? 1 : 0)
        .input('EstArchivee', questionObj.EstArchivee ? 1 : 0)
        .input('CompetencesAssociees', JSON.stringify(questionObj.CompetencesAssociees || []))
        .input('SpecialitesAssociees', JSON.stringify(questionObj.SpecialitesAssociees || []))
        .input('BaremeSubjectif', questionObj.BaremeSubjectif ? JSON.stringify(questionObj.BaremeSubjectif) : null)
        .input('Version', questionObj.Version || 1)
        .query(`
          UPDATE dbo.Questions
          SET Enonce = @Enonce, ContexteSituationnel = @ContexteSituationnel, Difficulte = @Difficulte,
              Points = @Points, TempsLimiteSecondes = @TempsLimiteSecondes, Explication = @Explication,
              EstActive = @EstActive, EstArchivee = @EstArchivee,
              CompetencesAssociees = @CompetencesAssociees, SpecialitesAssociees = @SpecialitesAssociees,
              BaremeSubjectif = @BaremeSubjectif, Version = @Version
          OUTPUT INSERTED.*
          WHERE QuestionId = @Id;
        `);
      if (Array.isArray(questionObj.Options) && questionObj.TypeQuestion !== 'QUESTION_SUBJECTIVE') {
        await tx.request().input('Id', questionObj.QuestionId).query(`DELETE FROM dbo.OptionsReponse WHERE QuestionId = @Id`);
        for (const opt of questionObj.Options) {
          await tx.request()
            .input('QuestionId', questionObj.QuestionId)
            .input('LettreOption', opt.LettreOption || 'A')
            .input('EnonceOption', opt.EnonceOption || '')
            .input('SchemaSVG', opt.SchemaSVG || null)
            .input('EstCorrecte', opt.EstCorrecte ? 1 : 0)
            .query(`
              INSERT INTO dbo.OptionsReponse (QuestionId, LettreOption, EnonceOption, SchemaSVG, EstCorrecte)
              VALUES (@QuestionId, @LettreOption, @EnonceOption, @SchemaSVG, @EstCorrecte);
            `);
        }
      }
      await tx.commit();
      return this.getQuestionById(updQ.recordset[0].QuestionId);
    } catch (err) {
      await tx.rollback();
      throw err;
    }
  },

  async getTestSessions(filters = {}) {
    if (!(await useSqlServer())) {
      let list = [...(mockStore.sessions || [])];
      if (filters.utilisateurId !== undefined) list = list.filter(s => s.UtilisateurId === parseInt(filters.utilisateurId, 10));
      if (filters.testId !== undefined) list = list.filter(s => s.TestId === parseInt(filters.testId, 10));
      return list;
    }
    const pool = await getDbPool();
    const req = pool.request();
    const clauses = [];
    if (filters.utilisateurId !== undefined) {
      req.input('Uid', parseInt(filters.utilisateurId, 10));
      clauses.push('UtilisateurId = @Uid');
    }
    if (filters.testId !== undefined) {
      req.input('Tid', parseInt(filters.testId, 10));
      clauses.push('TestId = @Tid');
    }
    const where = clauses.length > 0 ? `WHERE ${clauses.join(' AND ')}` : '';
    const res = await req.query(`SELECT * FROM dbo.SessionsTest ${where} ORDER BY SessionId ASC`);
    return res.recordset.map(mapTestSessionRow);
  },

  async getTestSessionById(sessionId) {
    const id = parseInt(sessionId, 10);
    if (Number.isNaN(id)) return null;
    if (!(await useSqlServer())) {
      return (mockStore.sessions || []).find(s => s.SessionId === id) || null;
    }
    const pool = await getDbPool();
    const res = await pool.request().input('Id', id).query(`SELECT TOP 1 * FROM dbo.SessionsTest WHERE SessionId = @Id`);
    return res.recordset[0] ? mapTestSessionRow(res.recordset[0]) : null;
  },

  async insertTestSession(sessionObj) {
    if (!(await useSqlServer())) {
      const nextId = (mockStore.sessions || []).reduce((m, s) => Math.max(m, s.SessionId || 0), 0) + 1;
      const saved = { ...sessionObj, SessionId: nextId };
      mockStore.sessions.push(saved);
      return saved;
    }

    const pool = await getDbPool();
    const {
      UtilisateurId, TestId, TentativeNumero, SeedGeneration, QuestionsSnapshot,
      CandidatSnapshot, DateDebut, DateFinMaxServeur, DateFin, DureeEcouleeSecondes,
      Statut, ScoreBrut, ScoreTotal, ScorePourcentage, IndiceConfiance, ProfilIncomplet,
      DonneesManquantes, Progression, ...extras
    } = sessionObj;

    const ins = await pool.request()
      .input('UtilisateurId', UtilisateurId)
      .input('TestId', TestId)
      .input('TentativeNumero', TentativeNumero ?? 1)
      .input('SeedGeneration', SeedGeneration ?? null)
      .input('QuestionsSnapshot', JSON.stringify(QuestionsSnapshot || []))
      .input('ConfigSnapshot', JSON.stringify(extras))
      .input('CandidatSnapshot', CandidatSnapshot ? JSON.stringify(CandidatSnapshot) : null)
      .input('DateDebut', DateDebut ? new Date(DateDebut) : new Date())
      .input('DateFinMaxServeur', DateFinMaxServeur ? new Date(DateFinMaxServeur) : null)
      .input('DateFin', DateFin ? new Date(DateFin) : null)
      .input('DureeEcouleeSecondes', DureeEcouleeSecondes ?? 0)
      .input('Statut', Statut || 'EN_COURS')
      .input('ScoreBrut', ScoreBrut ?? null)
      .input('ScoreTotal', ScoreTotal ?? null)
      .input('ScorePourcentage', ScorePourcentage ?? null)
      .input('IndiceConfiance', IndiceConfiance ?? null)
      .input('ProfilIncomplet', ProfilIncomplet ? 1 : 0)
      .input('DonneesManquantes', JSON.stringify(DonneesManquantes || []))
      .input('Progression', Progression ?? 0)
      .query(`
        INSERT INTO dbo.SessionsTest (
          UtilisateurId, TestId, TentativeNumero, SeedGeneration, QuestionsSnapshot,
          ConfigSnapshot, CandidatSnapshot, DateDebut, DateFinMaxServeur, DateFin,
          DureeEcouleeSecondes, Statut, ScoreBrut, ScoreTotal, ScorePourcentage,
          IndiceConfiance, ProfilIncomplet, DonneesManquantes, Progression
        )
        OUTPUT INSERTED.*
        VALUES (
          @UtilisateurId, @TestId, @TentativeNumero, @SeedGeneration, @QuestionsSnapshot,
          @ConfigSnapshot, @CandidatSnapshot, @DateDebut, @DateFinMaxServeur, @DateFin,
          @DureeEcouleeSecondes, @Statut, @ScoreBrut, @ScoreTotal, @ScorePourcentage,
          @IndiceConfiance, @ProfilIncomplet, @DonneesManquantes, @Progression
        );
      `);
    return mapTestSessionRow(ins.recordset[0]);
  },

  async updateTestSession(sessionObj, { syncNormalized = false } = {}) {
    if (!(await useSqlServer())) return sessionObj;

    const pool = await getDbPool();
    const {
      SessionId, UtilisateurId, TestId, TentativeNumero, SeedGeneration, QuestionsSnapshot,
      CandidatSnapshot, DateDebut, DateFinMaxServeur, DateFin, DureeEcouleeSecondes,
      Statut, ScoreBrut, ScoreTotal, ScorePourcentage, IndiceConfiance, ProfilIncomplet,
      DonneesManquantes, Progression, CreatedAt, ...extras
    } = sessionObj;

    const tx = pool.transaction();
    await tx.begin();
    try {
      const upd = await tx.request()
        .input('SessionId', SessionId)
        .input('QuestionsSnapshot', JSON.stringify(QuestionsSnapshot || []))
        .input('ConfigSnapshot', JSON.stringify(extras))
        .input('CandidatSnapshot', CandidatSnapshot ? JSON.stringify(CandidatSnapshot) : null)
        .input('DateFin', DateFin ? new Date(DateFin) : null)
        .input('DureeEcouleeSecondes', DureeEcouleeSecondes ?? 0)
        .input('Statut', Statut)
        .input('ScoreBrut', ScoreBrut ?? null)
        .input('ScoreTotal', ScoreTotal ?? null)
        .input('ScorePourcentage', ScorePourcentage ?? null)
        .input('IndiceConfiance', IndiceConfiance ?? null)
        .input('ProfilIncomplet', ProfilIncomplet ? 1 : 0)
        .input('DonneesManquantes', JSON.stringify(DonneesManquantes || []))
        .input('Progression', Progression ?? 0)
        .query(`
          UPDATE dbo.SessionsTest
          SET QuestionsSnapshot = @QuestionsSnapshot,
              ConfigSnapshot = @ConfigSnapshot,
              CandidatSnapshot = @CandidatSnapshot,
              DateFin = @DateFin,
              DureeEcouleeSecondes = @DureeEcouleeSecondes,
              Statut = @Statut,
              ScoreBrut = @ScoreBrut,
              ScoreTotal = @ScoreTotal,
              ScorePourcentage = @ScorePourcentage,
              IndiceConfiance = @IndiceConfiance,
              ProfilIncomplet = @ProfilIncomplet,
              DonneesManquantes = @DonneesManquantes,
              Progression = @Progression
          OUTPUT INSERTED.*
          WHERE SessionId = @SessionId;
        `);

      if (syncNormalized && Array.isArray(sessionObj.UserAnswers)) {
        await tx.request().input('Sid', SessionId).query(`DELETE FROM dbo.ReponsesSession WHERE SessionId = @Sid`);
        for (const ans of sessionObj.UserAnswers) {
          const optId = ans.optionId ? parseInt(ans.optionId, 10) : null;
          let validOptId = null;
          if (optId && !Number.isNaN(optId)) {
            const chk = await tx.request().input('Oid', optId).query(`SELECT TOP 1 OptionId, EstCorrecte FROM dbo.OptionsReponse WHERE OptionId = @Oid`);
            if (chk.recordset[0]) validOptId = chk.recordset[0].OptionId;
          }
          await tx.request()
            .input('SessionId', SessionId)
            .input('QuestionId', ans.questionId)
            .input('OptionIdSelectionnee', validOptId)
            .input('ReponseTexte', ans.reponseTexte || null)
            .query(`
              IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = @QuestionId)
              INSERT INTO dbo.ReponsesSession (SessionId, QuestionId, OptionIdSelectionnee, ReponseTexte)
              VALUES (@SessionId, @QuestionId, @OptionIdSelectionnee, @ReponseTexte);
            `);
        }
      }

      if (syncNormalized && Array.isArray(sessionObj.ResultatsDomaines)) {
        const domRes = await tx.request().query(`SELECT DomaineId, Code FROM dbo.DomainesCompetences`);
        const domMap = new Map(domRes.recordset.map(d => [d.Code, d.DomaineId]));
        await tx.request().input('Sid', SessionId).query(`DELETE FROM dbo.ResultatsDomaines WHERE SessionId = @Sid`);
        for (const ds of sessionObj.ResultatsDomaines) {
          const domId = domMap.get(ds.DomaineCode);
          if (!domId) continue;
          await tx.request()
            .input('SessionId', SessionId)
            .input('DomaineId', domId)
            .input('ScoreObtenu', ds.PointsObtenus ?? 0)
            .input('ScoreMax', ds.PointsMax ?? 0)
            .input('Pourcentage', ds.Pourcentage ?? 0)
            .query(`
              INSERT INTO dbo.ResultatsDomaines (SessionId, DomaineId, ScoreObtenu, ScoreMax, Pourcentage)
              VALUES (@SessionId, @DomaineId, @ScoreObtenu, @ScoreMax, @Pourcentage);
            `);
        }
      }

      if (syncNormalized && Array.isArray(sessionObj.Recommandations)) {
        const specRes = await tx.request().query(`SELECT SpecialiteId, Code FROM dbo.Specialites`);
        const specMap = new Map(specRes.recordset.map(s => [s.Code, s.SpecialiteId]));
        await tx.request().input('Sid', SessionId).query(`DELETE FROM dbo.RecommandationsSpecialites WHERE SessionId = @Sid`);
        for (const rec of sessionObj.Recommandations) {
          const specId = rec.SpecialiteId || specMap.get(rec.SpecialiteCode);
          if (!specId) continue;
          await tx.request()
            .input('SessionId', SessionId)
            .input('SpecialiteId', specId)
            .input('ScoreCompatibilite', rec.ScoreCompatibilite ?? 0)
            .input('RangCompatibilite', rec.RangCompatibilite ?? 1)
            .input('StatutEligibilite', rec.StatutEligibilite || 'A_VERIFIER')
            .input('ConditionsSatisfaites', JSON.stringify(rec.ConditionsSatisfaites || []))
            .input('ConditionsNonSatisfaites', JSON.stringify(rec.ConditionsNonSatisfaites || []))
            .input('ConditionsAVerifier', JSON.stringify(rec.ConditionsAVerifier || []))
            .input('CompetencesFortes', JSON.stringify(rec.CompetencesFortes || []))
            .input('CompetencesADevelopper', JSON.stringify(rec.CompetencesADevelopper || []))
            .input('FacteursPrincipaux', JSON.stringify(rec.FacteursPrincipaux || []))
            .input('AvisSysteme', rec.AvisSysteme || '')
            .query(`
              INSERT INTO dbo.RecommandationsSpecialites (
                SessionId, SpecialiteId, ScoreCompatibilite, RangCompatibilite, StatutEligibilite,
                ConditionsSatisfaites, ConditionsNonSatisfaites, ConditionsAVerifier,
                CompetencesFortes, CompetencesADevelopper, FacteursPrincipaux, AvisSysteme
              )
              VALUES (
                @SessionId, @SpecialiteId, @ScoreCompatibilite, @RangCompatibilite, @StatutEligibilite,
                @ConditionsSatisfaites, @ConditionsNonSatisfaites, @ConditionsAVerifier,
                @CompetencesFortes, @CompetencesADevelopper, @FacteursPrincipaux, @AvisSysteme
              );
            `);
        }
      }

      await tx.commit();
      return mapTestSessionRow(upd.recordset[0]);
    } catch (err) {
      await tx.rollback();
      throw err;
    }
  },

  async getSubjectiveEvaluations(sessionId = null) {
    if (!(await useSqlServer())) {
      const all = mockStore.evaluations || [];
      return sessionId ? all.filter(e => e.SessionId === parseInt(sessionId, 10)) : all;
    }
    const pool = await getDbPool();
    const req = pool.request();
    const where = sessionId ? 'WHERE rs.SessionId = @Sid' : '';
    if (sessionId) req.input('Sid', parseInt(sessionId, 10));
    const res = await req.query(`
      SELECT e.*, rs.SessionId, rs.QuestionId, q.Points AS PointsMax
      FROM dbo.EvaluationsSubjectives e
      INNER JOIN dbo.ReponsesSession rs ON rs.ReponseSessionId = e.ReponseSessionId
      INNER JOIN dbo.Questions q ON q.QuestionId = rs.QuestionId
      ${where}
      ORDER BY e.EvaluationId ASC
    `);
    return res.recordset.map(r => ({
      EvaluationId: r.EvaluationId,
      SessionId: r.SessionId,
      QuestionId: r.QuestionId,
      EvaluateurId: r.EvaluateurId,
      PointsAttribues: Number(r.PointsAttribues),
      PointsMax: Number(r.PointsMax || 3),
      CommentaireEvaluateur: r.CommentaireEvaluateur,
      DateEvaluation: r.DateEvaluation instanceof Date ? r.DateEvaluation.toISOString() : r.DateEvaluation
    }));
  },

  async upsertSubjectiveEvaluation(evalObj) {
    if (!(await useSqlServer())) {
      if (!mockStore.evaluations) mockStore.evaluations = [];
      const idx = mockStore.evaluations.findIndex(e => e.SessionId === evalObj.SessionId && e.QuestionId === evalObj.QuestionId);
      if (idx >= 0) mockStore.evaluations[idx] = { ...mockStore.evaluations[idx], ...evalObj };
      else mockStore.evaluations.push({ ...evalObj, EvaluationId: mockStore.evaluations.length + 1 });
      return evalObj;
    }

    const pool = await getDbPool();
    let rsRes = await pool.request()
      .input('Sid', evalObj.SessionId)
      .input('Qid', evalObj.QuestionId)
      .query(`SELECT TOP 1 ReponseSessionId FROM dbo.ReponsesSession WHERE SessionId = @Sid AND QuestionId = @Qid`);

    let reponseSessionId = rsRes.recordset[0]?.ReponseSessionId;
    if (!reponseSessionId) {
      const insRs = await pool.request()
        .input('Sid', evalObj.SessionId)
        .input('Qid', evalObj.QuestionId)
        .query(`
          INSERT INTO dbo.ReponsesSession (SessionId, QuestionId, ReponseTexte)
          OUTPUT INSERTED.ReponseSessionId
          VALUES (@Sid, @Qid, NULL);
        `);
      reponseSessionId = insRs.recordset[0].ReponseSessionId;
    }

    const cur = await pool.request()
      .input('Rsid', reponseSessionId)
      .query(`SELECT TOP 1 EvaluationId FROM dbo.EvaluationsSubjectives WHERE ReponseSessionId = @Rsid`);

    if (cur.recordset[0]) {
      await pool.request()
        .input('Eid', cur.recordset[0].EvaluationId)
        .input('Uid', evalObj.EvaluateurId)
        .input('Pts', evalObj.PointsAttribues)
        .input('Com', evalObj.CommentaireEvaluateur || '')
        .query(`
          UPDATE dbo.EvaluationsSubjectives
          SET EvaluateurId = @Uid, PointsAttribues = @Pts, CommentaireEvaluateur = @Com, DateEvaluation = SYSUTCDATETIME()
          WHERE EvaluationId = @Eid;
        `);
      return { ...evalObj, EvaluationId: cur.recordset[0].EvaluationId };
    }

    const ins = await pool.request()
      .input('Rsid', reponseSessionId)
      .input('Uid', evalObj.EvaluateurId)
      .input('Pts', evalObj.PointsAttribues)
      .input('Com', evalObj.CommentaireEvaluateur || '')
      .query(`
        INSERT INTO dbo.EvaluationsSubjectives (ReponseSessionId, EvaluateurId, PointsAttribues, CommentaireEvaluateur)
        OUTPUT INSERTED.EvaluationId
        VALUES (@Rsid, @Uid, @Pts, @Com);
      `);
    return { ...evalObj, EvaluationId: ins.recordset[0].EvaluationId };
  },

  // ============================================================================
  // C. SIMULATIONS PROFESSIONNELLES V1 & TASK OVERRIDES
  // ============================================================================

  async getSimulationSessions(studentId = null) {
    if (!(await useSqlServer())) {
      const all = mockStore.simulationSessions || [];
      return studentId !== null ? all.filter(s => s.UtilisateurId === parseInt(studentId, 10)) : all;
    }
    const pool = await getDbPool();
    const req = pool.request();
    const where = studentId !== null ? 'WHERE UtilisateurId = @Uid' : '';
    if (studentId !== null) req.input('Uid', parseInt(studentId, 10));
    const res = await req.query(`SELECT * FROM dbo.SimulationSessions ${where} ORDER BY SimSessionId ASC`);
    return res.recordset.map(r => {
      const full = safeJson(r.ReponsesJson, {});
      return {
        ...full,
        SessionId: r.SimSessionId,
        UtilisateurId: r.UtilisateurId,
        ModuleId: r.ModuleCode,
        Statut: r.Statut,
        ScoreGlobal: r.ScorePourcentage !== null && r.ScorePourcentage !== undefined ? Number(r.ScorePourcentage) : null,
        TasksSnapshot: safeJson(r.TasksSnapshotJson, full.TasksSnapshot || []),
        ResultatsCompetences: safeJson(r.CompetencyScoresJson, full.ResultatsCompetences || []),
        DateDebut: full.DateDebut || (r.CreatedAt instanceof Date ? r.CreatedAt.toISOString() : r.CreatedAt),
        DateFin: full.DateFin || (r.CompletedAt instanceof Date ? r.CompletedAt.toISOString() : r.CompletedAt)
      };
    });
  },

  async saveSimulationSession(sessionObj, isNew = false) {
    if (!(await useSqlServer())) {
      if (!mockStore.simulationSessions) mockStore.simulationSessions = [];
      if (isNew) {
        mockStore.simulationSessions.push(sessionObj);
      }
      return sessionObj;
    }

    const pool = await getDbPool();
    if (isNew || !sessionObj.SessionId) {
      const ins = await pool.request()
        .input('Uid', sessionObj.UtilisateurId)
        .input('ModuleCode', sessionObj.ModuleId)
        .input('Statut', sessionObj.Statut || 'EN_COURS')
        .input('Score', sessionObj.ScoreGlobal ?? null)
        .input('TasksJson', JSON.stringify(sessionObj.TasksSnapshot || []))
        .input('ReponsesJson', JSON.stringify(sessionObj))
        .input('CompJson', JSON.stringify(sessionObj.ResultatsCompetences || []))
        .input('CompletedAt', sessionObj.DateFin ? new Date(sessionObj.DateFin) : null)
        .query(`
          INSERT INTO dbo.SimulationSessions (
            UtilisateurId, ModuleCode, Statut, ScorePourcentage,
            TasksSnapshotJson, ReponsesJson, CompetencyScoresJson, CompletedAt
          )
          OUTPUT INSERTED.SimSessionId
          VALUES (
            @Uid, @ModuleCode, @Statut, @Score,
            @TasksJson, @ReponsesJson, @CompJson, @CompletedAt
          );
        `);
      const newId = ins.recordset[0].SimSessionId;
      const saved = { ...sessionObj, SessionId: newId };
      await pool.request().input('Id', newId).input('Json', JSON.stringify(saved)).query(`UPDATE dbo.SimulationSessions SET ReponsesJson = @Json WHERE SimSessionId = @Id`);
      return saved;
    }

    await pool.request()
      .input('Id', sessionObj.SessionId)
      .input('Statut', sessionObj.Statut || 'EN_COURS')
      .input('Score', sessionObj.ScoreGlobal ?? null)
      .input('TasksJson', JSON.stringify(sessionObj.TasksSnapshot || []))
      .input('ReponsesJson', JSON.stringify(sessionObj))
      .input('CompJson', JSON.stringify(sessionObj.ResultatsCompetences || []))
      .input('CompletedAt', sessionObj.DateFin ? new Date(sessionObj.DateFin) : null)
      .query(`
        UPDATE dbo.SimulationSessions
        SET Statut = @Statut,
            ScorePourcentage = @Score,
            TasksSnapshotJson = @TasksJson,
            ReponsesJson = @ReponsesJson,
            CompetencyScoresJson = @CompJson,
            CompletedAt = @CompletedAt
        WHERE SimSessionId = @Id;
      `);
    return sessionObj;
  },

  async getSimulationTasks() {
    if (!(await useSqlServer())) {
      return mockStore.simulationTasks || simulationTaskBank60;
    }
    const map = await coreRepository.getSystemSettingsMap();
    const overrides = map.simulationTasksOverrides && typeof map.simulationTasksOverrides === 'object'
      ? map.simulationTasksOverrides
      : {};
    return simulationTaskBank60.map(t => (overrides[t.taskId] ? { ...t, ...overrides[t.taskId] } : t));
  },

  async updateSimulationTask(taskId, updates) {
    if (!(await useSqlServer())) {
      const tasks = mockStore.simulationTasks || simulationTaskBank60;
      const task = tasks.find(t => t.taskId === taskId);
      if (!task) return null;
      if (updates.difficulte) task.difficulte = updates.difficulte;
      if (updates.pointsMax !== undefined) task.pointsMax = parseInt(updates.pointsMax, 10);
      if (updates.dureeEstimeeMinutes !== undefined) task.dureeEstimeeMinutes = parseInt(updates.dureeEstimeeMinutes, 10);
      return task;
    }

    const baseTask = simulationTaskBank60.find(t => t.taskId === taskId);
    if (!baseTask) return null;
    const map = await coreRepository.getSystemSettingsMap();
    const overrides = (map.simulationTasksOverrides && typeof map.simulationTasksOverrides === 'object')
      ? { ...map.simulationTasksOverrides }
      : {};
    const curOverride = overrides[taskId] || {};
    const nextOverride = { ...curOverride };
    if (updates.difficulte) nextOverride.difficulte = updates.difficulte;
    if (updates.pointsMax !== undefined) nextOverride.pointsMax = parseInt(updates.pointsMax, 10);
    if (updates.dureeEstimeeMinutes !== undefined) nextOverride.dureeEstimeeMinutes = parseInt(updates.dureeEstimeeMinutes, 10);
    overrides[taskId] = nextOverride;
    await coreRepository.upsertSystemSettings({ simulationTasksOverrides: overrides });
    return { ...baseTask, ...nextOverride };
  },

  // ============================================================================
  // D. COMPÉTENCES, MATRICE, SCORING CONFIG & PROPOSITIONS D'ORIENTATION
  // ============================================================================

  async getCompetencies() {
    if (!(await useSqlServer())) {
      return mockStore.competencies || canonicalCompetencyFramework;
    }
    const pool = await getDbPool();
    const res = await pool.request().query(`SELECT * FROM dbo.Competencies ORDER BY Numero ASC`);
    return res.recordset.map(r => ({
      code: r.CompetencyCode,
      numero: r.Numero,
      nomFr: r.NomFr,
      nomAr: r.NomAr,
      domaineId: r.DomaineCode,
      descriptionAr: r.DescriptionAr,
      criteresEvaluation: safeJson(r.CriteresJson, []),
      poidsDefaut: Number(r.PoidsDefaut ?? 1.0),
      legacyTags: safeJson(r.LegacyTagsJson, [])
    }));
  },

  async updateCompetency(code, updates) {
    if (!(await useSqlServer())) {
      const comps = mockStore.competencies || canonicalCompetencyFramework;
      const idx = comps.findIndex(c => c.code === code);
      if (idx === -1) return null;
      comps[idx] = { ...comps[idx], ...updates, code };
      return comps[idx];
    }

    const pool = await getDbPool();
    const curRes = await pool.request().input('Code', code).query(`SELECT TOP 1 * FROM dbo.Competencies WHERE CompetencyCode = @Code`);
    if (!curRes.recordset[0]) return null;
    const cur = curRes.recordset[0];

    await pool.request()
      .input('Code', code)
      .input('NomFr', updates.nomFr ?? cur.NomFr)
      .input('NomAr', updates.nomAr ?? cur.NomAr)
      .input('DescriptionAr', updates.descriptionAr ?? cur.DescriptionAr)
      .input('CriteresJson', updates.criteresEvaluation !== undefined ? JSON.stringify(updates.criteresEvaluation) : cur.CriteresJson)
      .input('PoidsDefaut', updates.poidsDefaut !== undefined ? Number(updates.poidsDefaut) : Number(cur.PoidsDefaut))
      .query(`
        UPDATE dbo.Competencies
        SET NomFr = @NomFr, NomAr = @NomAr, DescriptionAr = @DescriptionAr,
            CriteresJson = @CriteresJson, PoidsDefaut = @PoidsDefaut
        WHERE CompetencyCode = @Code;
      `);
    const all = await this.getCompetencies();
    return all.find(c => c.code === code) || null;
  },

  async getSpecialtyMatrix() {
    if (!(await useSqlServer())) {
      return mockStore.specialtyCompetencyMatrix || initialSpecialtyCompetencyMatrix;
    }

    const pool = await getDbPool();
    const [rowsRes, sysMap] = await Promise.all([
      pool.request().query(`SELECT * FROM dbo.SpecialtyCompetencyMatrix ORDER BY MatrixId ASC`),
      coreRepository.getSystemSettingsMap()
    ]);

    const weightsBySpec = new Map();
    const justifBySpec = new Map();
    for (const r of rowsRes.recordset) {
      if (!weightsBySpec.has(r.SpecialiteCode)) weightsBySpec.set(r.SpecialiteCode, {});
      weightsBySpec.get(r.SpecialiteCode)[r.CompetencyCode] = Number(r.Poids);
      if (r.Justification) justifBySpec.set(r.SpecialiteCode, r.Justification);
    }

    const metaOverrides = (sysMap.specialtyMatrixMeta && typeof sysMap.specialtyMatrixMeta === 'object')
      ? sysMap.specialtyMatrixMeta
      : {};

    return initialSpecialtyCompetencyMatrix.map(base => {
      const code = base.specialiteCode;
      const meta = metaOverrides[code] || {};
      return {
        ...base,
        poidsCompetences: weightsBySpec.has(code) ? weightsBySpec.get(code) : base.poidsCompetences,
        justificationAr: justifBySpec.get(code) || meta.justificationAr || base.justificationAr,
        conditionsAVerifier: meta.conditionsAVerifier || base.conditionsAVerifier
      };
    });
  },

  async updateSpecialtyMatrix(specCode, updates = {}) {
    const cleanUpdates = {};
    if (updates.poidsCompetences !== undefined) cleanUpdates.poidsCompetences = updates.poidsCompetences;
    if (updates.justificationAr !== undefined) cleanUpdates.justificationAr = updates.justificationAr;
    if (updates.conditionsAVerifier !== undefined) cleanUpdates.conditionsAVerifier = updates.conditionsAVerifier;

    if (!(await useSqlServer())) {
      const matrix = mockStore.specialtyCompetencyMatrix || initialSpecialtyCompetencyMatrix;
      const idx = matrix.findIndex(m => m.specialiteCode === specCode);
      if (idx === -1) return null;
      matrix[idx] = { ...matrix[idx], ...cleanUpdates };
      return matrix[idx];
    }

    const base = initialSpecialtyCompetencyMatrix.find(m => m.specialiteCode === specCode);
    if (!base) return null;

    const pool = await getDbPool();
    const tx = pool.transaction();
    await tx.begin();
    try {
      const poidsMap = updates.poidsCompetences || base.poidsCompetences;
      const justif = updates.justificationAr || base.justificationAr || '';

      if (updates.poidsCompetences && typeof updates.poidsCompetences === 'object') {
        await tx.request().input('Spec', specCode).query(`DELETE FROM dbo.SpecialtyCompetencyMatrix WHERE SpecialiteCode = @Spec`);
        for (const [compCode, poids] of Object.entries(poidsMap)) {
          await tx.request()
            .input('Spec', specCode)
            .input('Comp', compCode)
            .input('Poids', Number(poids))
            .input('Justif', justif)
            .query(`
              INSERT INTO dbo.SpecialtyCompetencyMatrix (SpecialiteCode, CompetencyCode, Poids, Justification)
              VALUES (@Spec, @Comp, @Poids, @Justif);
            `);
        }
      } else if (updates.justificationAr) {
        await tx.request()
          .input('Spec', specCode)
          .input('Justif', justif)
          .query(`UPDATE dbo.SpecialtyCompetencyMatrix SET Justification = @Justif WHERE SpecialiteCode = @Spec`);
      }

      await tx.commit();
    } catch (err) {
      await tx.rollback();
      throw err;
    }

    if (updates.conditionsAVerifier !== undefined || updates.justificationAr !== undefined) {
      const sysMap = await coreRepository.getSystemSettingsMap();
      const meta = (sysMap.specialtyMatrixMeta && typeof sysMap.specialtyMatrixMeta === 'object')
        ? { ...sysMap.specialtyMatrixMeta }
        : {};
      meta[specCode] = {
        ...(meta[specCode] || {}),
        ...(updates.justificationAr !== undefined ? { justificationAr: updates.justificationAr } : {}),
        ...(updates.conditionsAVerifier !== undefined ? { conditionsAVerifier: updates.conditionsAVerifier } : {})
      };
      await coreRepository.upsertSystemSettings({ specialtyMatrixMeta: meta });
    }

    const refreshed = await this.getSpecialtyMatrix();
    return refreshed.find(m => m.specialiteCode === specCode) || null;
  },

  async getScoringCriteriaConfig() {
    if (!(await useSqlServer())) {
      return mockStore.scoringCriteriaConfig || defaultScoringCriteriaConfig;
    }
    const sysMap = await coreRepository.getSystemSettingsMap();
    return sysMap.scoringCriteriaConfig && typeof sysMap.scoringCriteriaConfig === 'object'
      ? sysMap.scoringCriteriaConfig
      : defaultScoringCriteriaConfig;
  },

  async updateScoringCriteriaConfig(newConfig) {
    if (!(await useSqlServer())) {
      mockStore.scoringCriteriaConfig = {
        ...(mockStore.scoringCriteriaConfig || defaultScoringCriteriaConfig),
        ...newConfig
      };
      return mockStore.scoringCriteriaConfig;
    }
    const current = await this.getScoringCriteriaConfig();
    const merged = { ...current, ...newConfig };
    await coreRepository.upsertSystemSettings({ scoringCriteriaConfig: merged });
    return merged;
  },

  async getOrientationProposals() {
    if (!(await useSqlServer())) {
      return mockStore.orientationProposals || [];
    }
    const pool = await getDbPool();
    const res = await pool.request().query(`SELECT * FROM dbo.OrientationProposals ORDER BY ProposalId ASC`);
    return res.recordset.map(r => {
      const dec = safeJson(r.DecisionAdmin, {});
      return {
        studentId: r.UtilisateurId,
        statut: r.StatutArbitrage,
        specialiteRetenueCode: r.SpecialiteProposeeCode,
        observationsAr: dec.observationsAr || '',
        adminValidateurId: r.ValidateurId,
        dateCreation: dec.dateCreation || (r.UpdatedAt instanceof Date ? r.UpdatedAt.toISOString() : r.UpdatedAt),
        dateDecision: r.UpdatedAt instanceof Date ? r.UpdatedAt.toISOString() : r.UpdatedAt
      };
    });
  },

  async upsertOrientationProposal(studentId, { statut, specialiteRetenueCode, observationsAr, adminId = 1 }) {
    const sId = parseInt(studentId, 10);
    if (!(await useSqlServer())) {
      if (!mockStore.orientationProposals) mockStore.orientationProposals = [];
      let proposal = mockStore.orientationProposals.find(p => p.studentId === sId);
      if (!proposal) {
        proposal = {
          studentId: sId,
          statut: 'PROPOSEE',
          specialiteRetenueCode: null,
          observationsAr: '',
          dateCreation: new Date().toISOString()
        };
        mockStore.orientationProposals.push(proposal);
      }
      proposal.statut = statut || proposal.statut;
      if (specialiteRetenueCode) proposal.specialiteRetenueCode = specialiteRetenueCode;
      if (observationsAr) proposal.observationsAr = observationsAr;
      proposal.adminValidateurId = adminId;
      proposal.dateDecision = new Date().toISOString();
      return proposal;
    }

    const pool = await getDbPool();
    const curRes = await pool.request().input('Uid', sId).query(`SELECT TOP 1 * FROM dbo.OrientationProposals WHERE UtilisateurId = @Uid`);
    const existing = curRes.recordset[0];
    const existingDec = existing ? safeJson(existing.DecisionAdmin, {}) : {};

    const nextStatut = statut || existing?.StatutArbitrage || 'PROPOSEE';
    const nextSpec = specialiteRetenueCode || existing?.SpecialiteProposeeCode || 'SPEC-TERR';
    const nextObs = observationsAr !== undefined ? observationsAr : (existingDec.observationsAr || '');
    const decJson = JSON.stringify({
      observationsAr: nextObs,
      dateCreation: existingDec.dateCreation || new Date().toISOString()
    });

    let saved;
    if (existing) {
      const upd = await pool.request()
        .input('Id', existing.ProposalId)
        .input('Spec', nextSpec)
        .input('Statut', nextStatut)
        .input('Dec', decJson)
        .input('AdminId', adminId || 1)
        .query(`
          UPDATE dbo.OrientationProposals
          SET SpecialiteProposeeCode = @Spec,
              StatutArbitrage = @Statut,
              DecisionAdmin = @Dec,
              ValidateurId = @AdminId,
              UpdatedAt = SYSUTCDATETIME()
          OUTPUT INSERTED.*
          WHERE ProposalId = @Id;
        `);
      saved = upd.recordset[0];
    } else {
      const ins = await pool.request()
        .input('Uid', sId)
        .input('Spec', nextSpec)
        .input('Statut', nextStatut)
        .input('Dec', decJson)
        .input('AdminId', adminId || 1)
        .query(`
          INSERT INTO dbo.OrientationProposals (UtilisateurId, SpecialiteProposeeCode, StatutArbitrage, DecisionAdmin, ValidateurId)
          OUTPUT INSERTED.*
          VALUES (@Uid, @Spec, @Statut, @Dec, @AdminId);
        `);
      saved = ins.recordset[0];
    }

    return {
      studentId: saved.UtilisateurId,
      statut: saved.StatutArbitrage,
      specialiteRetenueCode: saved.SpecialiteProposeeCode,
      observationsAr: nextObs,
      adminValidateurId: saved.ValidateurId,
      dateCreation: existingDec.dateCreation || (saved.UpdatedAt instanceof Date ? saved.UpdatedAt.toISOString() : saved.UpdatedAt),
      dateDecision: saved.UpdatedAt instanceof Date ? saved.UpdatedAt.toISOString() : saved.UpdatedAt
    };
  },

  async getAllUsersAndPromotions() {
    if (!(await useSqlServer())) {
      return {
        users: mockStore.users || [],
        promotions: mockStore.promotions || [],
        domaines: mockStore.domaines || [],
        specialites: mockStore.specialites || [],
        conditions: mockStore.conditions || [],
        logs: mockStore.logs || []
      };
    }

    const pool = await getDbPool();
    const [usersRes, promosRes, domsRes, specsRes, condsRes, logsRes] = await Promise.all([
      pool.request().query(`SELECT * FROM dbo.Utilisateurs ORDER BY UtilisateurId ASC`),
      pool.request().query(`SELECT * FROM dbo.Promotions ORDER BY PromotionId ASC`),
      pool.request().query(`SELECT * FROM dbo.DomainesCompetences ORDER BY DomaineId ASC`),
      pool.request().query(`SELECT * FROM dbo.Specialites ORDER BY EstLegacy ASC, SpecialiteId ASC`),
      pool.request().query(`SELECT * FROM dbo.ConditionsEligibilite ORDER BY ConditionId ASC`),
      pool.request().query(`SELECT TOP 50 * FROM dbo.LogsActivite ORDER BY DateLog DESC, LogId DESC`)
    ]);
    return {
      users: usersRes.recordset.map(parseUserRow),
      promotions: promosRes.recordset,
      domaines: domsRes.recordset,
      specialites: specsRes.recordset.map(s => ({
        ...s,
        EstActive: Boolean(s.EstActive),
        CompetencesAttendues: safeJson(s.CompetencesAttendues, []),
        TestsAssocies: safeJson(s.TestsAssocies, []),
        MatieresAcademiquesPertinentes: safeJson(s.MatieresAcademiquesPertinentes, [])
      })),
      conditions: condsRes.recordset.map(c => ({ ...c, EstObligatoire: Boolean(c.EstObligatoire) })),
      logs: logsRes.recordset
    };
  }
};

