// ==============================================================================
// ORIENT-GR — Repository SQL Server : Groupe 2
// Parcours IA (StudentJourneys, JourneyMessages), Talent Radar,
// Simulation Center & Évaluations Instructeur 360°
// ==============================================================================

import { getDbPool, useSqlServer, mockStore } from '../lib/db.js';
import { preselectionEngineService } from '../services/preselectionEngineService.js';

function safeJson(raw, fallback) {
  if (raw === null || raw === undefined) return fallback;
  if (typeof raw !== 'string') return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function isSqlNumericUserId(userId) {
  return /^\d+$/.test(String(userId ?? '').trim()) && parseInt(userId, 10) > 0;
}

const DEFAULT_SECTIONS = {
  scolaire: '',
  professionnel: '',
  sportAssociatif: '',
  competencesTechniques: '',
  languesCentresInteret: '',
  responsabilitesEtDefis: '',
  autresExperiences: ''
};

const WELCOME_MSG = {
  id: 'msg-init-1',
  role: 'assistant',
  mode: 'text',
  language: 'ar',
  text: "مرحباً بك أيها التلميذ الدركي في فضائك الذكي « مساري وتوجيهي ». \n\nهنا يمكنك سرد تجاربك الحياتية، دراستك، مهاراتك وشغفك بكل حرية (بالعربية، الدارجة أو الفرنسية). سأقوم بتحليل مسارك لمساعدتك في اكتشاف مؤهلاتك وتوجيهك نحو التخصص الأنسب في الدرك الملكي.\n\nكيف تود أن تبدأ بتقديم نفسك ومسارك ؟",
  textFr: "Bienvenue dans votre espace « Mon Parcours Intelligent ». Racontez-moi librement votre parcours de vie, vos études, vos passions et vos expériences. Je suis là pour vous écouter, approfondir vos aptitudes et vous proposer l'orientation idéale au sein de la Gendarmerie Royale.",
  timestamp: new Date().toISOString()
};

function mapMessageRow(r) {
  const meta = safeJson(r.MetadataJson, {});
  return {
    id: meta.id || `msg-db-${r.MessageId}`,
    dbId: r.MessageId,
    role: r.RoleMessage,
    mode: r.ModeInteraction,
    language: r.Langue,
    text: r.Contenu,
    textFr: meta.textFr || undefined,
    transcription: meta.transcription ?? (r.ModeInteraction === 'voice' && r.RoleMessage === 'user' ? r.Contenu : null),
    model: r.Modele || undefined,
    provider: r.Provider || undefined,
    isFallback: Boolean(meta.isFallback),
    fallbackType: meta.fallbackType || undefined,
    latencyMs: meta.latencyMs ?? undefined,
    hasAudio: Boolean(meta.hasAudio),
    mimeType: meta.mimeType || undefined,
    timestamp: meta.timestamp || (r.CreatedAt instanceof Date ? r.CreatedAt.toISOString() : r.CreatedAt)
  };
}

function mapJourneyRow(row, msgRows = []) {
  const exp = safeJson(row.ExperiencesJson, {});
  const sections = { ...DEFAULT_SECTIONS, ...(exp.sections || {}) };
  const analysis = safeJson(row.AnalyseProfilJson, null);
  const snapshots = safeJson(row.SnapshotsJson, []);
  return {
    journeyId: row.JourneyId,
    userId: String(row.UtilisateurId),
    version: exp.version || 1,
    languePreferee: row.LanguePreferee || 'fr',
    lastUpdated: row.UpdatedAt instanceof Date ? row.UpdatedAt.toISOString() : row.UpdatedAt,
    bioLibre: row.RecitPersonnel || '',
    sections,
    conversation: msgRows.map(mapMessageRow),
    analysis,
    snapshots
  };
}

function mapTalentRow(row) {
  const declareObj = safeJson(row.DeclareJson, {});
  const observeObj = safeJson(row.ObserveJson, {});
  const valideObj = safeJson(row.ValideJson, {});
  return {
    userId: String(row.UtilisateurId),
    updatedAt: row.UpdatedAt instanceof Date ? row.UpdatedAt.toISOString() : row.UpdatedAt,
    status: row.StatutValidation || 'DECLARE_INITIAL',
    instructorVisa: valideObj.instructorVisa || 'EN_ATTENTE_FORMATEUR',
    instructorObservations: valideObj.instructorObservations || "Dossier en cours d'évaluation par l'Adjudant-Chef El Fassi.",
    dimensions: observeObj.dimensions || declareObj.dimensions || {},
    strengthsDominants: observeObj.strengthsDominants || [],
    axesAmelioration: observeObj.axesAmelioration || []
  };
}

function mapSimCenterRow(row) {
  const fb = safeJson(row.FeedbackJson, {});
  const anomalies = safeJson(row.AnomaliesJson, []);
  return {
    dbId: row.CenterSessionId,
    sessionId: fb.sessionId || `sim-ses-${row.CenterSessionId}`,
    userId: String(row.UtilisateurId),
    exerciseId: row.ExerciseCode,
    exerciseTitle: fb.exerciseTitle || row.ExerciseCode,
    category: fb.category || '',
    categoryNameFr: fb.categoryNameFr || '',
    score: Number(row.ScorePourcentage ?? 0),
    precisionPct: Number(fb.precisionPct ?? row.ScorePourcentage ?? 0),
    timeSpentSeconds: Number(row.DureeSecondes ?? 0),
    timeFormatted: row.TempsFormat || `${Math.floor((row.DureeSecondes || 0) / 60)}m ${(row.DureeSecondes || 0) % 60}s`,
    errorsFoundCount: anomalies.length,
    errorsDetected: anomalies,
    pointsAmeliorer: fb.pointsAmeliorer || [],
    completedAt: row.CompletedAt instanceof Date ? row.CompletedAt.toISOString() : row.CompletedAt
  };
}

function mapInstructorEvalRow(row, instructorName = null) {
  const parsed = safeJson(row.ScoresValidesJson, {});
  const comps = safeJson(row.CompetencesValideesJson, []);
  const hist = safeJson(row.HistoriqueModificationsJson, []);
  const note = row.NotePratique !== null && row.NotePratique !== undefined
    ? Number(row.NotePratique)
    : (parsed.notePratique !== undefined ? Number(parsed.notePratique) : null);
  const temps = row.TempsMinutes !== null && row.TempsMinutes !== undefined
    ? Number(row.TempsMinutes)
    : (parsed.tempsMinutes !== undefined ? Number(parsed.tempsMinutes) : null);

  return {
    dbId: row.InstructorEvalId,
    id: parsed.id || `inst-eval-${row.InstructorEvalId}`,
    userId: String(row.UtilisateurId),
    studentId: row.UtilisateurId,
    studentMatricule: row.StudentMatricule || null,
    studentNom: row.StudentNom || null,
    studentPrenom: row.StudentPrenom || null,
    instructorId: String(row.InstructeurId),
    instructorName: parsed.instructorName || instructorName || (row.InstNom ? `${row.InstPrenom || ''} ${row.InstNom}`.trim() : 'Instructeur'),
    instructorMatricule: row.InstMatricule || null,
    observations: row.CommentaireOfficiel || '',
    dimensions: parsed.dimensions || {},
    officialRecommendation: row.DecisionStatut || 'TRES_FAVORABLE',
    preferredSpecialty: row.OrientationSuggereCode || row.SpecialiteRecommandeeCode || 'SPEC-PST',
    status: parsed.status || 'SIGNE_ET_VALIDE',
    workshopId: row.WorkshopId ?? null,
    workshopCode: row.WorkshopCode ?? null,
    workshopTitre: row.WorkshopTitre ?? null,
    domaineCode: row.DomaineCode ?? row.CategoryId ?? null,
    notePratique: note,
    tempsMinutes: temps,
    niveauAutonomie: row.NiveauAutonomie || parsed.niveauAutonomie || 'GUIDE',
    competencesValidees: Array.isArray(comps) ? comps : [],
    orientationSuggereCode: row.OrientationSuggereCode || row.SpecialiteRecommandeeCode || null,
    historiqueModifications: Array.isArray(hist) ? hist : [],
    createdAt: row.CreatedAt instanceof Date ? row.CreatedAt.toISOString() : row.CreatedAt,
    updatedAt: row.UpdatedAt instanceof Date ? row.UpdatedAt.toISOString() : (row.UpdatedAt || row.CreatedAt)
  };
}

export const journeyAndTalentRepository = {
  // ============================================================================
  // PARTIE A — PARCOURS IA & CONVERSATIONS
  // ============================================================================

  async shouldUseSqlForUser(userId) {
    if (!(await useSqlServer())) return false;
    return isSqlNumericUserId(userId);
  },

  async getOrCreateJourney(userId) {
    if (!(await this.shouldUseSqlForUser(userId))) {
      return null;
    }

    const uid = parseInt(userId, 10);
    const pool = await getDbPool();
    const existing = await pool.request()
      .input('Uid', uid)
      .query(`SELECT TOP 1 * FROM dbo.StudentJourneys WHERE UtilisateurId = @Uid`);

    if (existing.recordset[0]) {
      const jRow = existing.recordset[0];
      const msgs = await pool.request()
        .input('JourneyId', jRow.JourneyId)
        .query(`SELECT * FROM dbo.JourneyMessages WHERE JourneyId = @JourneyId ORDER BY MessageId ASC`);
      return mapJourneyRow(jRow, msgs.recordset);
    }

    const tx = pool.transaction();
    await tx.begin();
    try {
      const expJson = JSON.stringify({ version: 1, sections: DEFAULT_SECTIONS });
      const insJ = await tx.request()
        .input('Uid', uid)
        .input('Langue', 'fr')
        .input('Recit', '')
        .input('ExpJson', expJson)
        .input('CompJson', JSON.stringify([]))
        .input('SnapJson', JSON.stringify([]))
        .query(`
          INSERT INTO dbo.StudentJourneys (
            UtilisateurId, LanguePreferee, RecitPersonnel, ExperiencesJson,
            CompetencesDetecteesJson, AnalyseProfilJson, SnapshotsJson
          )
          OUTPUT INSERTED.*
          VALUES (@Uid, @Langue, @Recit, @ExpJson, @CompJson, NULL, @SnapJson);
        `);

      const jRow = insJ.recordset[0];
      const welcomeMeta = { id: WELCOME_MSG.id, textFr: WELCOME_MSG.textFr, timestamp: new Date().toISOString() };
      const insM = await tx.request()
        .input('JourneyId', jRow.JourneyId)
        .input('Uid', uid)
        .input('Role', 'assistant')
        .input('Mode', 'text')
        .input('Langue', 'ar')
        .input('Contenu', WELCOME_MSG.text)
        .input('MetadataJson', JSON.stringify(welcomeMeta))
        .query(`
          INSERT INTO dbo.JourneyMessages (
            JourneyId, UtilisateurId, RoleMessage, ModeInteraction, Langue, Contenu, MetadataJson
          )
          OUTPUT INSERTED.*
          VALUES (@JourneyId, @Uid, @Role, @Mode, @Langue, @Contenu, @MetadataJson);
        `);

      await tx.commit();
      return mapJourneyRow(jRow, insM.recordset);
    } catch (err) {
      await tx.rollback();
      throw err;
    }
  },

  async saveJourney(userId, journeyData) {
    if (!(await this.shouldUseSqlForUser(userId))) {
      return null;
    }

    const uid = parseInt(userId, 10);
    const current = await this.getOrCreateJourney(uid);
    const pool = await getDbPool();

    const nextSnapshots = Array.isArray(current.snapshots) ? [...current.snapshots] : [];
    nextSnapshots.push({
      snapshotId: `snap-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      userId: String(uid),
      version: current.version || 1,
      savedAt: current.lastUpdated || new Date().toISOString(),
      bioLibre: current.bioLibre,
      sections: { ...current.sections },
      analysis: current.analysis ? { ...current.analysis } : null
    });

    const nextVersion = (current.version || 1) + 1;
    const nextBio = journeyData.bioLibre !== undefined ? journeyData.bioLibre : current.bioLibre;
    const nextSections = journeyData.sections !== undefined
      ? { ...current.sections, ...journeyData.sections }
      : current.sections;

    const tx = pool.transaction();
    await tx.begin();
    try {
      await tx.request()
        .input('JourneyId', current.journeyId)
        .input('Recit', nextBio)
        .input('ExpJson', JSON.stringify({ version: nextVersion, sections: nextSections }))
        .input('SnapJson', JSON.stringify(nextSnapshots))
        .query(`
          UPDATE dbo.StudentJourneys
          SET RecitPersonnel = @Recit,
              ExperiencesJson = @ExpJson,
              SnapshotsJson = @SnapJson,
              UpdatedAt = SYSUTCDATETIME()
          WHERE JourneyId = @JourneyId;
        `);

      if (Array.isArray(journeyData.conversation)) {
        await tx.request()
          .input('JourneyId', current.journeyId)
          .query(`DELETE FROM dbo.JourneyMessages WHERE JourneyId = @JourneyId`);
        for (const msg of journeyData.conversation) {
          await tx.request()
            .input('JourneyId', current.journeyId)
            .input('Uid', uid)
            .input('Role', msg.role || 'user')
            .input('Mode', msg.mode === 'voice' ? 'voice' : 'text')
            .input('Langue', msg.language || 'fr')
            .input('Contenu', msg.text || '')
            .input('Provider', msg.provider || null)
            .input('Modele', msg.model || null)
            .input('MetadataJson', JSON.stringify({
              id: msg.id,
              textFr: msg.textFr,
              transcription: msg.transcription || null,
              isFallback: Boolean(msg.isFallback),
              fallbackType: msg.fallbackType || null,
              latencyMs: msg.latencyMs ?? null,
              hasAudio: Boolean(msg.hasAudio),
              mimeType: msg.mimeType || null,
              timestamp: msg.timestamp || new Date().toISOString()
            }))
            .query(`
              INSERT INTO dbo.JourneyMessages (
                JourneyId, UtilisateurId, RoleMessage, ModeInteraction, Langue, Contenu, Provider, Modele, MetadataJson
              )
              VALUES (@JourneyId, @Uid, @Role, @Mode, @Langue, @Contenu, @Provider, @Modele, @MetadataJson);
            `);
        }
      }

      await tx.commit();
    } catch (err) {
      await tx.rollback();
      throw err;
    }

    return this.getOrCreateJourney(uid);
  },

  async persistInterviewTurn({ userId, journey, studentMsgObj, aiMsgObj, analysis }) {
    if (!(await this.shouldUseSqlForUser(userId))) {
      return null;
    }

    const uid = parseInt(userId, 10);
    const pool = await getDbPool();
    const tx = pool.transaction();
    await tx.begin();
    try {
      await tx.request()
        .input('JourneyId', journey.journeyId)
        .input('Langue', studentMsgObj.language || journey.languePreferee || 'fr')
        .input('Recit', journey.bioLibre || '')
        .input('ExpJson', JSON.stringify({ version: journey.version || 1, sections: journey.sections || DEFAULT_SECTIONS }))
        .input('CompJson', JSON.stringify(analysis?.competencesDeclarees || []))
        .input('AnalyseJson', analysis ? JSON.stringify(analysis) : null)
        .query(`
          UPDATE dbo.StudentJourneys
          SET LanguePreferee = @Langue,
              RecitPersonnel = @Recit,
              ExperiencesJson = @ExpJson,
              CompetencesDetecteesJson = @CompJson,
              AnalyseProfilJson = @AnalyseJson,
              UpdatedAt = SYSUTCDATETIME()
          WHERE JourneyId = @JourneyId;
        `);

      await tx.request()
        .input('JourneyId', journey.journeyId)
        .input('Uid', uid)
        .input('Role', 'user')
        .input('Mode', studentMsgObj.mode === 'voice' ? 'voice' : 'text')
        .input('Langue', studentMsgObj.language || 'fr')
        .input('Contenu', studentMsgObj.text)
        .input('MetadataJson', JSON.stringify({
          id: studentMsgObj.id,
          transcription: studentMsgObj.transcription || null,
          timestamp: studentMsgObj.timestamp
        }))
        .query(`
          INSERT INTO dbo.JourneyMessages (
            JourneyId, UtilisateurId, RoleMessage, ModeInteraction, Langue, Contenu, MetadataJson
          )
          VALUES (@JourneyId, @Uid, @Role, @Mode, @Langue, @Contenu, @MetadataJson);
        `);

      await tx.request()
        .input('JourneyId', journey.journeyId)
        .input('Uid', uid)
        .input('Role', 'assistant')
        .input('Mode', aiMsgObj.mode === 'voice' ? 'voice' : 'text')
        .input('Langue', studentMsgObj.language || 'fr')
        .input('Contenu', aiMsgObj.text)
        .input('Provider', aiMsgObj.provider || null)
        .input('Modele', aiMsgObj.model || null)
        .input('MetadataJson', JSON.stringify({
          id: aiMsgObj.id,
          isFallback: Boolean(aiMsgObj.isFallback),
          fallbackType: aiMsgObj.fallbackType || null,
          latencyMs: aiMsgObj.latencyMs ?? 0,
          hasAudio: Boolean(aiMsgObj.hasAudio),
          mimeType: aiMsgObj.mimeType || null,
          timestamp: aiMsgObj.timestamp
        }))
        .query(`
          INSERT INTO dbo.JourneyMessages (
            JourneyId, UtilisateurId, RoleMessage, ModeInteraction, Langue, Contenu, Provider, Modele, MetadataJson
          )
          VALUES (@JourneyId, @Uid, @Role, @Mode, @Langue, @Contenu, @Provider, @Modele, @MetadataJson);
        `);

      await tx.commit();
    } catch (err) {
      await tx.rollback();
      throw err;
    }
  },

  async saveProfileAnalysis(userId, analysis) {
    if (!(await this.shouldUseSqlForUser(userId))) return;
    const uid = parseInt(userId, 10);
    const pool = await getDbPool();
    await pool.request()
      .input('Uid', uid)
      .input('CompJson', JSON.stringify(analysis?.competencesDeclarees || []))
      .input('AnalyseJson', JSON.stringify(analysis))
      .query(`
        UPDATE dbo.StudentJourneys
        SET CompetencesDetecteesJson = @CompJson,
            AnalyseProfilJson = @AnalyseJson,
            UpdatedAt = SYSUTCDATETIME()
        WHERE UtilisateurId = @Uid;
      `);
  },

  async getValidatedAssignmentsForUser(userId) {
    if (!(await this.shouldUseSqlForUser(userId))) {
      return mockStore.workshopAssignments?.filter(
        a => String(a.UtilisateurId) === String(userId) && (a.Statut === 'VALIDE' || a.Statut === 'EVALUE')
      ) || [];
    }
    const uid = parseInt(userId, 10);
    const pool = await getDbPool();
    const res = await pool.request()
      .input('Uid', uid)
      .query(`SELECT * FROM dbo.WorkshopAssignments WHERE UtilisateurId = @Uid AND Statut IN ('VALIDE', 'EVALUE')`);
    return res.recordset.map(r => ({
      ...safeJson(r.SoumissionJson, {}),
      AssignationId: r.AssignationId,
      UtilisateurId: r.UtilisateurId,
      Statut: r.Statut,
      NoteFinale: r.NoteSur20
    }));
  },

  async getJourneyHistory(userId) {
    if (!(await this.shouldUseSqlForUser(userId))) {
      const snapshots = mockStore.studentJourneySnapshots.filter(s => s.userId === String(userId));
      const current = mockStore.studentJourneys.find(j => j.userId === String(userId));
      return {
        currentVersion: current?.version || 1,
        snapshots: [...snapshots].sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt))
      };
    }

    const journey = await this.getOrCreateJourney(userId);
    const snapshots = Array.isArray(journey.snapshots) ? [...journey.snapshots] : [];
    return {
      currentVersion: journey.version || 1,
      snapshots: snapshots.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt))
    };
  },

  // ============================================================================
  // PARTIE B — TALENT RADAR, SIMULATION CENTER & INSTRUCTEUR 360°
  // ============================================================================

  async getTalentProfile(userId) {
    if (!(await this.shouldUseSqlForUser(userId))) {
      return mockStore.studentTalentProfiles.find(p => String(p.userId) === String(userId)) || null;
    }
    const uid = parseInt(userId, 10);
    const pool = await getDbPool();
    const res = await pool.request()
      .input('Uid', uid)
      .query(`SELECT TOP 1 * FROM dbo.StudentTalentProfiles WHERE UtilisateurId = @Uid`);
    return res.recordset[0] ? mapTalentRow(res.recordset[0]) : null;
  },

  async upsertTalentProfile(userId, profile, sourceLabel = 'system') {
    if (!(await this.shouldUseSqlForUser(userId))) {
      const idx = mockStore.studentTalentProfiles.findIndex(p => String(p.userId) === String(userId));
      if (idx >= 0) mockStore.studentTalentProfiles[idx] = profile;
      else mockStore.studentTalentProfiles.push(profile);
      return profile;
    }

    const uid = parseInt(userId, 10);
    const pool = await getDbPool();
    await this._upsertTalentProfileReq(pool.request(), uid, profile, sourceLabel);
    return this.getTalentProfile(uid);
  },

  async _upsertTalentProfileReq(req, uid, profile, sourceLabel) {
    const declareJson = JSON.stringify({ dimensions: profile.dimensions });
    const observeJson = JSON.stringify({
      dimensions: profile.dimensions,
      strengthsDominants: profile.strengthsDominants || [],
      axesAmelioration: profile.axesAmelioration || []
    });
    const valideJson = JSON.stringify({
      instructorVisa: profile.instructorVisa || 'EN_ATTENTE_FORMATEUR',
      instructorObservations: profile.instructorObservations || ''
    });

    await req
      .input('Uid', uid)
      .input('DeclareJson', declareJson)
      .input('ObserveJson', observeJson)
      .input('ValideJson', valideJson)
      .input('Statut', profile.status || 'DECLARE_INITIAL')
      .input('Source', sourceLabel)
      .query(`
        IF EXISTS (SELECT 1 FROM dbo.StudentTalentProfiles WHERE UtilisateurId = @Uid)
          UPDATE dbo.StudentTalentProfiles
          SET DeclareJson = @DeclareJson, ObserveJson = @ObserveJson, ValideJson = @ValideJson,
              StatutValidation = @Statut, DerniereMiseAJourSource = @Source, UpdatedAt = SYSUTCDATETIME()
          WHERE UtilisateurId = @Uid;
        ELSE
          INSERT INTO dbo.StudentTalentProfiles (
            UtilisateurId, DeclareJson, ObserveJson, ValideJson, StatutValidation, DerniereMiseAJourSource
          )
          VALUES (@Uid, @DeclareJson, @ObserveJson, @ValideJson, @Statut, @Source);
      `);
  },

  async getSimulationCenterSessions(userId) {
    if (!(await this.shouldUseSqlForUser(userId))) {
      return mockStore.simulationCenterSessions.filter(s => String(s.userId) === String(userId));
    }
    const uid = parseInt(userId, 10);
    const pool = await getDbPool();
    const res = await pool.request()
      .input('Uid', uid)
      .query(`SELECT * FROM dbo.SimulationCenterSessions WHERE UtilisateurId = @Uid ORDER BY CompletedAt ASC, CenterSessionId ASC`);
    return res.recordset.map(mapSimCenterRow);
  },

  async saveSimulationAndUpdateRadar(userId, evaluationResult, updatedProfile) {
    if (!(await this.shouldUseSqlForUser(userId))) {
      mockStore.simulationCenterSessions.push(evaluationResult);
      const idx = mockStore.studentTalentProfiles.findIndex(p => String(p.userId) === String(userId));
      if (idx >= 0) mockStore.studentTalentProfiles[idx] = updatedProfile;
      else mockStore.studentTalentProfiles.push(updatedProfile);
      return evaluationResult;
    }

    const uid = parseInt(userId, 10);
    const pool = await getDbPool();
    const tx = pool.transaction();
    await tx.begin();
    try {
      const ins = await tx.request()
        .input('Uid', uid)
        .input('ExerciseCode', evaluationResult.exerciseId)
        .input('Statut', 'TERMINEE')
        .input('Score', evaluationResult.score)
        .input('Duree', evaluationResult.timeSpentSeconds)
        .input('TempsFormat', evaluationResult.timeFormatted)
        .input('AnomaliesJson', JSON.stringify(evaluationResult.errorsDetected || []))
        .input('FeedbackJson', JSON.stringify({
          sessionId: evaluationResult.sessionId,
          exerciseTitle: evaluationResult.exerciseTitle,
          category: evaluationResult.category,
          categoryNameFr: evaluationResult.categoryNameFr,
          precisionPct: evaluationResult.precisionPct,
          pointsAmeliorer: evaluationResult.pointsAmeliorer || []
        }))
        .query(`
          INSERT INTO dbo.SimulationCenterSessions (
            UtilisateurId, ExerciseCode, Statut, ScorePourcentage, DureeSecondes,
            TempsFormat, AnomaliesJson, FeedbackJson, CompletedAt
          )
          OUTPUT INSERTED.*
          VALUES (
            @Uid, @ExerciseCode, @Statut, @Score, @Duree,
            @TempsFormat, @AnomaliesJson, @FeedbackJson, SYSUTCDATETIME()
          );
        `);

      if (updatedProfile) {
        await this._upsertTalentProfileReq(tx.request(), uid, updatedProfile, `SIMULATION:${evaluationResult.exerciseId}`);
      }

      await tx.commit();
      return mapSimCenterRow(ins.recordset[0]);
    } catch (err) {
      await tx.rollback();
      throw err;
    }
  },

  async getLatestInstructorEvaluation(studentId) {
    if (!(await this.shouldUseSqlForUser(studentId))) {
      return mockStore.instructorEvaluations.find(e => String(e.userId) === String(studentId)) || null;
    }
    const uid = parseInt(studentId, 10);
    const pool = await getDbPool();
    const res = await pool.request()
      .input('Uid', uid)
      .query(`
        SELECT TOP 1 e.*, u.Nom AS InstNom, u.Prenom AS InstPrenom
        FROM dbo.InstructorEvaluations e
        LEFT JOIN dbo.Utilisateurs u ON u.UtilisateurId = e.InstructeurId
        WHERE e.UtilisateurId = @Uid
        ORDER BY e.InstructorEvalId DESC
      `);
    if (!res.recordset[0]) return null;
    const row = res.recordset[0];
    const instName = row.InstPrenom ? `Adjudant-Chef ${row.InstPrenom} ${row.InstNom}` : null;
    return mapInstructorEvalRow(row, instName);
  },

  async saveInstructorEvaluationAndUpdateRadar(instructorId, studentId, evaluationPayload, updatedProfile) {
    if (!(await this.shouldUseSqlForUser(studentId))) {
      let existing = mockStore.instructorEvaluations.find(e => String(e.userId) === String(studentId));
      if (existing) Object.assign(existing, evaluationPayload);
      else mockStore.instructorEvaluations.push(evaluationPayload);
      const idx = mockStore.studentTalentProfiles.findIndex(p => String(p.userId) === String(studentId));
      if (idx >= 0) mockStore.studentTalentProfiles[idx] = updatedProfile;
      else mockStore.studentTalentProfiles.push(updatedProfile);
      return evaluationPayload;
    }

    const uid = parseInt(studentId, 10);
    const iid = isSqlNumericUserId(instructorId) ? parseInt(instructorId, 10) : 6;
    const pool = await getDbPool();
    const tx = pool.transaction();
    await tx.begin();
    try {
      const curRes = await tx.request()
        .input('Uid', uid)
        .query(`SELECT TOP 1 InstructorEvalId FROM dbo.InstructorEvaluations WHERE UtilisateurId = @Uid ORDER BY InstructorEvalId DESC`);

      const scoresJson = JSON.stringify({
        id: evaluationPayload.id,
        instructorName: evaluationPayload.instructorName,
        dimensions: evaluationPayload.dimensions,
        status: evaluationPayload.status
      });

      let savedRow;
      if (curRes.recordset[0]) {
        const upd = await tx.request()
          .input('EvalId', curRes.recordset[0].InstructorEvalId)
          .input('Iid', iid)
          .input('ScoresJson', scoresJson)
          .input('Obs', evaluationPayload.observations)
          .input('Spec', evaluationPayload.preferredSpecialty)
          .input('Decision', evaluationPayload.officialRecommendation)
          .query(`
            UPDATE dbo.InstructorEvaluations
            SET InstructeurId = @Iid,
                ScoresValidesJson = @ScoresJson,
                CommentaireOfficiel = @Obs,
                SpecialiteRecommandeeCode = @Spec,
                DecisionStatut = @Decision,
                CreatedAt = SYSUTCDATETIME()
            OUTPUT INSERTED.*
            WHERE InstructorEvalId = @EvalId;
          `);
        savedRow = upd.recordset[0];
      } else {
        const ins = await tx.request()
          .input('Uid', uid)
          .input('Iid', iid)
          .input('ScoresJson', scoresJson)
          .input('Obs', evaluationPayload.observations)
          .input('Spec', evaluationPayload.preferredSpecialty)
          .input('Decision', evaluationPayload.officialRecommendation)
          .query(`
            INSERT INTO dbo.InstructorEvaluations (
              UtilisateurId, InstructeurId, ScoresValidesJson, CommentaireOfficiel, SpecialiteRecommandeeCode, DecisionStatut
            )
            OUTPUT INSERTED.*
            VALUES (@Uid, @Iid, @ScoresJson, @Obs, @Spec, @Decision);
          `);
        savedRow = ins.recordset[0];
      }

      if (updatedProfile) {
        await this._upsertTalentProfileReq(tx.request(), uid, updatedProfile, `INSTRUCTOR:${iid}`);
      }

      await tx.commit();
      return mapInstructorEvalRow(savedRow, evaluationPayload.instructorName);
    } catch (err) {
      await tx.rollback();
      throw err;
    }
  },

  async getInstructorStudentsOverviewRows() {
    if (!(await useSqlServer())) return null;
    const pool = await getDbPool();
    const [studentsRes, promosRes, journeysRes, msgCountsRes, simsRes, evalsRes] = await Promise.all([
      pool.request().query(`SELECT * FROM dbo.Utilisateurs WHERE Role = 'ELEVE' AND EstActif = 1 ORDER BY UtilisateurId ASC`),
      pool.request().query(`SELECT PromotionId, Nom FROM dbo.Promotions`),
      pool.request().query(`SELECT JourneyId, UtilisateurId, RecitPersonnel, UpdatedAt FROM dbo.StudentJourneys`),
      pool.request().query(`SELECT UtilisateurId, COUNT(*) AS Cnt FROM dbo.JourneyMessages GROUP BY UtilisateurId`),
      pool.request().query(`SELECT UtilisateurId, ScorePourcentage FROM dbo.SimulationCenterSessions`),
      pool.request().query(`SELECT * FROM dbo.InstructorEvaluations ORDER BY InstructorEvalId DESC`)
    ]);
    return {
      students: studentsRes.recordset,
      promosMap: new Map(promosRes.recordset.map(p => [p.PromotionId, p.Nom])),
      journeysMap: new Map(journeysRes.recordset.map(j => [j.UtilisateurId, j])),
      msgCountMap: new Map(msgCountsRes.recordset.map(m => [m.UtilisateurId, m.Cnt])),
      simsRows: simsRes.recordset,
      evalsRows: evalsRes.recordset
    };
  },

  async getStudentBasicRecord(studentId) {
    if (!(await this.shouldUseSqlForUser(studentId))) {
      return mockStore.users.find(u => String(u.UtilisateurId) === String(studentId)) || null;
    }
    const uid = parseInt(studentId, 10);
    const pool = await getDbPool();
    const res = await pool.request()
      .input('Uid', uid)
      .query(`
        SELECT u.*, p.Nom AS PromotionNom
        FROM dbo.Utilisateurs u
        LEFT JOIN dbo.Promotions p ON p.PromotionId = u.PromotionId
        WHERE u.UtilisateurId = @Uid
      `);
    return res.recordset[0] || null;
  },

  async getUserByIdBasic(userId) {
    if (!(await this.shouldUseSqlForUser(userId))) {
      return mockStore.users.find(u => String(u.UtilisateurId) === String(userId)) || null;
    }
    const uid = parseInt(userId, 10);
    const pool = await getDbPool();
    const res = await pool.request()
      .input('Uid', uid)
      .query(`SELECT TOP 1 * FROM dbo.Utilisateurs WHERE UtilisateurId = @Uid`);
    return res.recordset[0] || null;
  },

  async getPracticalFieldEvaluations({ studentId = null, instructorId = null, workshopId = null, limit = 100 } = {}) {
    const pool = await getDbPool();
    let query = `
      SELECT TOP (@Limit)
        e.*,
        w.Titre AS WorkshopTitre, w.Code AS WorkshopCode, w.CategoryId,
        uInst.Nom AS InstNom, uInst.Prenom AS InstPrenom, uInst.Matricule AS InstMatricule,
        uStud.Nom AS StudentNom, uStud.Prenom AS StudentPrenom, uStud.Matricule AS StudentMatricule,
        uStud.FiliereEntree AS StudentFiliereEntree
      FROM dbo.InstructorEvaluations e
      LEFT JOIN dbo.Workshops w ON w.WorkshopId = e.WorkshopId
      LEFT JOIN dbo.Utilisateurs uInst ON uInst.UtilisateurId = e.InstructeurId
      LEFT JOIN dbo.Utilisateurs uStud ON uStud.UtilisateurId = e.UtilisateurId
      WHERE (e.NotePratique IS NOT NULL OR e.ScoresValidesJson IS NOT NULL)
    `;
    const req = pool.request().input('Limit', limit);
    if (studentId) {
      req.input('StudentId', parseInt(studentId, 10));
      query += ` AND e.UtilisateurId = @StudentId`;
    }
    if (instructorId) {
      req.input('InstructorId', parseInt(instructorId, 10));
      query += ` AND e.InstructeurId = @InstructorId`;
    }
    if (workshopId) {
      req.input('WorkshopId', parseInt(workshopId, 10));
      query += ` AND e.WorkshopId = @WorkshopId`;
    }
    query += ` ORDER BY e.InstructorEvalId DESC`;
    const res = await req.query(query);
    return res.recordset.map(r => mapInstructorEvalRow(r));
  },

  async getPracticalEvaluationById(evalId) {
    const eId = parseInt(evalId, 10);
    const pool = await getDbPool();
    const res = await pool.request()
      .input('EvalId', eId)
      .query(`
        SELECT TOP 1
          e.*,
          w.Titre AS WorkshopTitre, w.Code AS WorkshopCode, w.CategoryId,
          uInst.Nom AS InstNom, uInst.Prenom AS InstPrenom, uInst.Matricule AS InstMatricule,
          uStud.Nom AS StudentNom, uStud.Prenom AS StudentPrenom, uStud.Matricule AS StudentMatricule,
          uStud.FiliereEntree AS StudentFiliereEntree
        FROM dbo.InstructorEvaluations e
        LEFT JOIN dbo.Workshops w ON w.WorkshopId = e.WorkshopId
        LEFT JOIN dbo.Utilisateurs uInst ON uInst.UtilisateurId = e.InstructeurId
        LEFT JOIN dbo.Utilisateurs uStud ON uStud.UtilisateurId = e.UtilisateurId
        WHERE e.InstructorEvalId = @EvalId
      `);
    if (!res.recordset[0]) return null;
    return mapInstructorEvalRow(res.recordset[0]);
  },

  async savePracticalFieldEvaluation({
    evaluationId = null,
    studentId,
    instructorId,
    workshopId,
    domaineCode = null,
    notePratique,
    tempsMinutes,
    niveauAutonomie = 'AUTONOME',
    competencesValidees = [],
    observation = '',
    orientationSuggeree = 'SPEC-TERR',
    userRole = 'INSTRUCTEUR'
  }) {
    const sId = parseInt(studentId, 10);
    const iId = parseInt(instructorId, 10);
    const wId = parseInt(workshopId, 10);
    const note = parseFloat(notePratique);
    const temps = parseInt(tempsMinutes, 10);

    if (isNaN(sId) || isNaN(iId) || isNaN(wId)) {
      throw new Error("Élève, instructeur et atelier obligatoires.");
    }
    if (isNaN(note) || note < 0 || note > 20) {
      throw new Error("La note pratique doit être comprise entre 0 et 20.");
    }
    if (isNaN(temps) || temps <= 0) {
      throw new Error("Le temps de résolution doit être un nombre de minutes strictement positif.");
    }
    const autonomieValide = ['AUTONOME', 'GUIDE', 'ASSISTE'].includes(niveauAutonomie)
      ? niveauAutonomie
      : 'GUIDE';

    const pool = await getDbPool();
    const tx = pool.transaction();
    await tx.begin();

    try {
      let savedEvalId = evaluationId ? parseInt(evaluationId, 10) : null;
      const compsJson = JSON.stringify(Array.isArray(competencesValidees) ? competencesValidees : []);
      const scoresJson = JSON.stringify({
        notePratique: note,
        tempsMinutes: temps,
        niveauAutonomie: autonomieValide,
        domaineCode: domaineCode || 'CAT-INFO',
        competencesValidees,
        status: 'SIGNE_ET_VALIDE'
      });

      if (savedEvalId) {
        // Modification contrôlée
        const checkRes = await tx.request()
          .input('EvalId', savedEvalId)
          .query(`SELECT * FROM dbo.InstructorEvaluations WHERE InstructorEvalId = @EvalId`);
        const existing = checkRes.recordset[0];
        if (!existing) throw new Error("Évaluation introuvable.");

        if (userRole === 'INSTRUCTEUR' && existing.InstructeurId !== iId) {
          throw new Error("Vous n'êtes pas autorisé à modifier l'évaluation d'un autre instructeur.");
        }

        const hist = safeJson(existing.HistoriqueModificationsJson, []);
        hist.push({
          date: new Date().toISOString(),
          modifieParId: iId,
          notePrecedente: existing.NotePratique,
          tempsPrecedent: existing.TempsMinutes,
          autonomiePrecedente: existing.NiveauAutonomie,
          commentairePrecedent: existing.CommentaireOfficiel
        });

        await tx.request()
          .input('EvalId', savedEvalId)
          .input('Wid', wId)
          .input('Domaine', domaineCode || existing.DomaineCode || 'CAT-INFO')
          .input('Note', note)
          .input('Temps', temps)
          .input('Autonomie', autonomieValide)
          .input('Comps', compsJson)
          .input('ScoresJson', scoresJson)
          .input('Obs', observation)
          .input('Spec', orientationSuggeree)
          .input('Hist', JSON.stringify(hist))
          .query(`
            UPDATE dbo.InstructorEvaluations
            SET WorkshopId = @Wid,
                DomaineCode = @Domaine,
                NotePratique = @Note,
                TempsMinutes = @Temps,
                NiveauAutonomie = @Autonomie,
                CompetencesValideesJson = @Comps,
                ScoresValidesJson = @ScoresJson,
                CommentaireOfficiel = @Obs,
                OrientationSuggereCode = @Spec,
                SpecialiteRecommandeeCode = @Spec,
                HistoriqueModificationsJson = @Hist,
                UpdatedAt = SYSUTCDATETIME()
            WHERE InstructorEvalId = @EvalId
          `);
      } else {
        // Nouvelle évaluation
        const insRes = await tx.request()
          .input('Uid', sId)
          .input('Iid', iId)
          .input('Wid', wId)
          .input('Domaine', domaineCode || 'CAT-INFO')
          .input('Note', note)
          .input('Temps', temps)
          .input('Autonomie', autonomieValide)
          .input('Comps', compsJson)
          .input('ScoresJson', scoresJson)
          .input('Obs', observation)
          .input('Spec', orientationSuggeree)
          .query(`
            INSERT INTO dbo.InstructorEvaluations (
              UtilisateurId, InstructeurId, WorkshopId, DomaineCode,
              NotePratique, TempsMinutes, NiveauAutonomie, CompetencesValideesJson,
              ScoresValidesJson, CommentaireOfficiel, OrientationSuggereCode,
              SpecialiteRecommandeeCode, DecisionStatut, CreatedAt, UpdatedAt
            )
            OUTPUT INSERTED.InstructorEvalId
            VALUES (
              @Uid, @Iid, @Wid, @Domaine,
              @Note, @Temps, @Autonomie, @Comps,
              @ScoresJson, @Obs, @Spec,
              @Spec, 'VALIDE_PAR_FORMATEUR', SYSUTCDATETIME(), SYSUTCDATETIME()
            )
          `);
        savedEvalId = insRes.recordset[0].InstructorEvalId;
      }

      // Synchronisation avec dbo.WorkshopAssignments
      const assignCheck = await tx.request()
        .input('Uid', sId)
        .input('Wid', wId)
        .query(`SELECT TOP 1 AssignationId FROM dbo.WorkshopAssignments WHERE UtilisateurId = @Uid AND WorkshopId = @Wid`);

      if (assignCheck.recordset[0]) {
        await tx.request()
          .input('Aid', assignCheck.recordset[0].AssignationId)
          .input('Iid', iId)
          .input('Note', note)
          .input('Obs', observation)
          .query(`
            UPDATE dbo.WorkshopAssignments
            SET Statut = 'VALIDE',
                NoteSur20 = @Note,
                DateEvaluation = SYSUTCDATETIME(),
                InstructeurId = @Iid,
                CommentaireInstructeur = @Obs
            WHERE AssignationId = @Aid
          `);
      } else {
        await tx.request()
          .input('Uid', sId)
          .input('Wid', wId)
          .input('Iid', iId)
          .input('Note', note)
          .input('Obs', observation)
          .query(`
            INSERT INTO dbo.WorkshopAssignments (
              WorkshopId, UtilisateurId, InstructeurId, Statut,
              NoteSur20, CommentaireInstructeur, DateAssignation, DateEvaluation
            )
            VALUES (
              @Wid, @Uid, @Iid, 'VALIDE',
              @Note, @Obs, SYSUTCDATETIME(), SYSUTCDATETIME()
            )
          `);
      }

      await tx.commit();

      // Recalcul automatique de la pré-sélection pour cet élève
      let preselection = null;
      try {
        preselection = await preselectionEngineService.calculateStudentPreselection(sId);
      } catch (calcErr) {
        console.warn(`[PRESELECTION] Recalcul post-évaluation élève ${sId} avertissement:`, calcErr.message);
      }

      const savedEval = await this.getPracticalEvaluationById(savedEvalId);
      return {
        evaluation: savedEval,
        preselection
      };
    } catch (err) {
      await tx.rollback();
      throw err;
    }
  }
};

