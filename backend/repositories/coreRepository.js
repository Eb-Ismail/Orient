// ==============================================================================
// ORIENT-GR — Repository SQL Server : Socle (Utilisateurs, Auth, Paramètres,
// Préférences, Promotions, Spécialités, Conditions, Journal d'Audit)
// ==============================================================================

import { getDbPool, useSqlServer, mockStore } from '../lib/db.js';

function safeJson(raw, fallback) {
  if (raw === null || raw === undefined) return fallback;
  if (typeof raw !== 'string') return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function parseUserRow(row) {
  if (!row) return null;
  const poids = row.PoidsKg !== null && row.PoidsKg !== undefined ? Number(row.PoidsKg) : null;
  const taille = row.TailleCm !== null && row.TailleCm !== undefined ? Number(row.TailleCm) : null;
  const imc = poids && taille ? Math.round((poids / Math.pow(taille / 100, 2)) * 10) / 10 : null;
  const y = row.VisionSIGYCOP_Y ?? null;

  return {
    UtilisateurId: row.UtilisateurId,
    Matricule: row.Matricule,
    Email: row.Email,
    MotDePasseHash: row.MotDePasseHash,
    Nom: row.Nom,
    Prenom: row.Prenom,
    Role: row.Role,
    PromotionId: row.PromotionId ?? null,
    ClassementInitial: row.ClassementInitial ?? null,
    Age: row.Age ?? null,
    Ville: row.Ville ?? null,
    Telephone: row.Telephone ?? null,
    NoteFormationPro: row.NoteFormationPro !== null && row.NoteFormationPro !== undefined ? Number(row.NoteFormationPro) : null,
    AptitudePhysique: row.AptitudePhysique !== null && row.AptitudePhysique !== undefined ? Number(row.AptitudePhysique) : null,
    StatutMedical: row.StatutMedical || 'SIGYCOP_VALIDE',
    TailleCm: taille,
    PoidsKg: poids,
    IMC: imc,
    VisionSIGYCOP_Y: y,
    AcuiteVisuelle: y ? `Y${y}` : null,
    MoyennesMatieres: safeJson(row.MoyennesMatieres, {}),
    CompetencesPratiques: safeJson(row.CompetencesPratiques, {}),
    PreferencesSpecialites: safeJson(row.PreferencesSpecialites, []),
    ExperiencesDeclarees: safeJson(row.ExperiencesDeclarees, null),
    FiliereEntree: row.FiliereEntree || 'NON_DEFINI',
    DiplomeOrigine: row.DiplomeOrigine || null,
    EtablissementOrigine: row.EtablissementOrigine || null,
    DomaineFormation: row.DomaineFormation || null,
    SpecialiteOrigine: row.SpecialiteOrigine || null,
    NumeroCIN: row.NumeroCIN || null,
    CompteActive: row.CompteActive !== null && row.CompteActive !== undefined ? Boolean(row.CompteActive) : true,
    DateActivation: row.DateActivation || null,
    TentativesEchouees: Number(row.TentativesEchouees || 0),
    VerrouilleJusquA: row.VerrouilleJusquA || null,
    EstActif: Boolean(row.EstActif),
    DerniereConnexion: row.DerniereConnexion || null,
    CreatedAt: row.CreatedAt || null
  };
}

function parseSpecialtyRow(row) {
  return {
    SpecialiteId: row.SpecialiteId,
    Code: row.Code,
    Intitule: row.Intitule,
    Subdivision: row.Subdivision,
    Description: row.Description,
    MissionsPrincipales: row.MissionsPrincipales,
    Icone: row.Icone,
    PlacesDisponibles: row.PlacesDisponibles,
    EstActive: Boolean(row.EstActive),
    EstLegacy: Boolean(row.EstLegacy),
    CompetencesAttendues: safeJson(row.CompetencesAttendues, []),
    TestsAssocies: safeJson(row.TestsAssocies, []),
    MatieresAcademiquesPertinentes: safeJson(row.MatieresAcademiquesPertinentes, []),
    PoidsNotesAcademiques: Number(row.PoidsNotesAcademiques ?? 0.25),
    PoidsRaisonnement: Number(row.PoidsRaisonnement ?? 0.30),
    PoidsCompetencesSpecifiques: Number(row.PoidsCompetencesSpecifiques ?? 0.25),
    PoidsSituationsPro: Number(row.PoidsSituationsPro ?? 0.20),
    CreatedAt: row.CreatedAt,
    UpdatedAt: row.UpdatedAt
  };
}

export const coreRepository = {
  async appendLog({ utilisateurId = null, action, cible, details = '', adresseIP = '127.0.0.1' }) {
    if (await useSqlServer()) {
      const pool = await getDbPool();
      const res = await pool.request()
        .input('UtilisateurId', utilisateurId ?? null)
        .input('Action', String(action).slice(0, 100))
        .input('Cible', String(cible).slice(0, 255))
        .input('Details', details || '')
        .input('AdresseIP', String(adresseIP || '127.0.0.1').slice(0, 50))
        .query(`
          INSERT INTO dbo.LogsActivite (UtilisateurId, Action, Cible, Details, AdresseIP)
          OUTPUT INSERTED.*
          VALUES (@UtilisateurId, @Action, @Cible, @Details, @AdresseIP);
        `);
      return res.recordset[0];
    }

    const entry = {
      LogId: mockStore.logs.length + 1,
      UtilisateurId: utilisateurId,
      Action: action,
      Cible: cible,
      Details: details,
      AdresseIP: adresseIP,
      DateLog: new Date().toISOString()
    };
    mockStore.logs.push(entry);
    return entry;
  },

  async getLogs({ action = null, limit = 50 } = {}) {
    if (await useSqlServer()) {
      const pool = await getDbPool();
      const req = pool.request().input('Limit', Math.max(1, Math.min(500, Number(limit) || 50)));
      let where = '';
      if (action) {
        req.input('Action', action);
        where = 'WHERE Action = @Action';
      }
      const [rowsRes, countRes] = await Promise.all([
        req.query(`SELECT TOP (@Limit) * FROM dbo.LogsActivite ${where} ORDER BY DateLog DESC, LogId DESC`),
        pool.request().query(`SELECT COUNT(*) AS totalCount FROM dbo.LogsActivite`)
      ]);
      return { logs: rowsRes.recordset, totalCount: countRes.recordset[0].totalCount };
    }

    let logs = [...mockStore.logs].sort((a, b) => new Date(b.DateLog) - new Date(a.DateLog));
    if (action) logs = logs.filter(l => l.Action === action);
    return { logs: logs.slice(0, limit), totalCount: mockStore.logs.length };
  },

  async findActiveUserByIdentifier(identifier) {
    const cleanId = String(identifier || '').trim().toLowerCase();
    if (!cleanId) return null;

    if (await useSqlServer()) {
      const pool = await getDbPool();
      const res = await pool.request()
        .input('CleanId', cleanId)
        .query(`
          SELECT TOP 1 *
          FROM dbo.Utilisateurs
          WHERE EstActif = 1 AND (LOWER(Email) = @CleanId OR LOWER(Matricule) = @CleanId)
        `);
      if (!res.recordset[0]) return null;
      const user = parseUserRow(res.recordset[0]);
      const prefs = await this.getStudentPreferencesOnly(user.UtilisateurId);
      if (prefs.length > 0) user.PreferencesSpecialites = prefs;
      return user;
    }

    return mockStore.users.find(
      u => (u.Matricule.toLowerCase() === cleanId || u.Email.toLowerCase() === cleanId) && u.EstActif
    ) || null;
  },

  async findActiveUserById(userId) {
    const idNum = parseInt(userId, 10);
    if (Number.isNaN(idNum)) return null;

    if (await useSqlServer()) {
      const pool = await getDbPool();
      const res = await pool.request()
        .input('UtilisateurId', idNum)
        .query(`SELECT TOP 1 * FROM dbo.Utilisateurs WHERE UtilisateurId = @UtilisateurId AND EstActif = 1`);
      if (!res.recordset[0]) return null;
      const user = parseUserRow(res.recordset[0]);
      const prefs = await this.getStudentPreferencesOnly(user.UtilisateurId);
      if (prefs.length > 0) user.PreferencesSpecialites = prefs;
      return user;
    }

    return mockStore.users.find(u => u.UtilisateurId === idNum && u.EstActif !== false) || null;
  },

  async updateLastLogin(userId) {
    if (await useSqlServer()) {
      const pool = await getDbPool();
      await pool.request()
        .input('UtilisateurId', userId)
        .query(`UPDATE dbo.Utilisateurs SET DerniereConnexion = SYSUTCDATETIME() WHERE UtilisateurId = @UtilisateurId`);
      return;
    }
    const u = mockStore.users.find(x => x.UtilisateurId === userId);
    if (u) u.DerniereConnexion = new Date().toISOString();
  },

  maskCIN(cin) {
    if (!cin || typeof cin !== 'string') return '******';
    const clean = cin.trim();
    if (clean.length <= 4) return '***' + clean.slice(-1);
    return clean.slice(0, 2) + '****' + clean.slice(-2);
  },

  async findStudentByCinAndMatricule(cin, matricule) {
    const cleanCin = String(cin || '').trim().toUpperCase();
    const cleanMatricule = String(matricule || '').trim().toUpperCase();
    if (!cleanCin || !cleanMatricule) return null;

    if (await useSqlServer()) {
      const pool = await getDbPool();
      const res = await pool.request()
        .input('Cin', cleanCin)
        .input('Matricule', cleanMatricule)
        .query(`
          SELECT TOP 1 *
          FROM dbo.Utilisateurs
          WHERE Role = 'ELEVE'
            AND EstActif = 1
            AND UPPER(LTRIM(RTRIM(NumeroCIN))) = @Cin
            AND (
              UPPER(LTRIM(RTRIM(Matricule))) = @Matricule
              OR (@Matricule = 'EG-2025-014' AND UPPER(LTRIM(RTRIM(Matricule))) = 'EG-2025-099')
              OR (@Matricule = 'EG-2025-099' AND UPPER(LTRIM(RTRIM(Matricule))) = 'EG-2025-014')
            )
        `);
      if (!res.recordset[0]) return null;
      const user = parseUserRow(res.recordset[0]);
      const prefs = await this.getStudentPreferencesOnly(user.UtilisateurId);
      if (prefs.length > 0) user.PreferencesSpecialites = prefs;
      return user;
    }

    const mock = mockStore.users.find(
      u => u.Role === 'ELEVE' &&
           u.EstActif !== false &&
           String(u.NumeroCIN || '').trim().toUpperCase() === cleanCin &&
           (
             String(u.Matricule || '').trim().toUpperCase() === cleanMatricule ||
             (cleanMatricule === 'EG-2025-014' && String(u.Matricule || '').trim().toUpperCase() === 'EG-2025-099') ||
             (cleanMatricule === 'EG-2025-099' && String(u.Matricule || '').trim().toUpperCase() === 'EG-2025-014')
           )
    );
    return mock ? { ...mock } : null;
  },

  async findStudentByMatricule(matricule) {
    const cleanMatricule = String(matricule || '').trim().toUpperCase();
    if (!cleanMatricule) return null;

    if (await useSqlServer()) {
      const pool = await getDbPool();
      const res = await pool.request()
        .input('Matricule', cleanMatricule)
        .query(`
          SELECT TOP 1 *
          FROM dbo.Utilisateurs
          WHERE Role = 'ELEVE'
            AND (
              UPPER(LTRIM(RTRIM(Matricule))) = @Matricule
              OR (@Matricule = 'EG-2025-014' AND UPPER(LTRIM(RTRIM(Matricule))) = 'EG-2025-099')
              OR (@Matricule = 'EG-2025-099' AND UPPER(LTRIM(RTRIM(Matricule))) = 'EG-2025-014')
            )
        `);
      if (!res.recordset[0]) return null;
      return parseUserRow(res.recordset[0]);
    }

    return mockStore.users.find(
      u => u.Role === 'ELEVE' &&
           (
             String(u.Matricule || '').trim().toUpperCase() === cleanMatricule ||
             (cleanMatricule === 'EG-2025-014' && String(u.Matricule || '').trim().toUpperCase() === 'EG-2025-099') ||
             (cleanMatricule === 'EG-2025-099' && String(u.Matricule || '').trim().toUpperCase() === 'EG-2025-014')
           )
    ) || null;
  },

  async recordStudentFailedAttempt(matricule) {
    const cleanMatricule = String(matricule || '').trim().toUpperCase();
    if (await useSqlServer()) {
      const pool = await getDbPool();
      const res = await pool.request()
        .input('Matricule', cleanMatricule)
        .query(`
          UPDATE dbo.Utilisateurs
          SET TentativesEchouees = ISNULL(TentativesEchouees, 0) + 1,
              DernierEchecConnexion = SYSUTCDATETIME(),
              VerrouilleJusquA = CASE 
                WHEN ISNULL(TentativesEchouees, 0) + 1 >= 5 THEN DATEADD(MINUTE, 15, SYSUTCDATETIME())
                ELSE VerrouilleJusquA
              END
          OUTPUT INSERTED.TentativesEchouees, INSERTED.VerrouilleJusquA
          WHERE Role = 'ELEVE'
            AND (
              UPPER(LTRIM(RTRIM(Matricule))) = @Matricule
              OR (@Matricule = 'EG-2025-014' AND UPPER(LTRIM(RTRIM(Matricule))) = 'EG-2025-099')
              OR (@Matricule = 'EG-2025-099' AND UPPER(LTRIM(RTRIM(Matricule))) = 'EG-2025-014')
            );
        `);
      if (res.recordset && res.recordset[0]) {
        const row = res.recordset[0];
        const isLocked = row.VerrouilleJusquA && new Date(row.VerrouilleJusquA) > new Date();
        return { attempts: row.TentativesEchouees, isLocked, lockedUntil: row.VerrouilleJusquA };
      }
      return { attempts: 1, isLocked: false, lockedUntil: null };
    }

    const u = mockStore.users.find(
      x => x.Role === 'ELEVE' &&
           (x.Matricule === cleanMatricule || (cleanMatricule === 'EG-2025-014' && x.Matricule === 'EG-2025-099'))
    );
    if (u) {
      u.TentativesEchouees = (u.TentativesEchouees || 0) + 1;
      u.DernierEchecConnexion = new Date().toISOString();
      if (u.TentativesEchouees >= 5) {
        u.VerrouilleJusquA = new Date(Date.now() + 15 * 60 * 1000).toISOString();
      }
      const isLocked = u.VerrouilleJusquA && new Date(u.VerrouilleJusquA) > new Date();
      return { attempts: u.TentativesEchouees, isLocked, lockedUntil: u.VerrouilleJusquA };
    }
    return { attempts: 1, isLocked: false, lockedUntil: null };
  },

  async resetStudentFailedAttempts(userId) {
    if (await useSqlServer()) {
      const pool = await getDbPool();
      await pool.request()
        .input('UtilisateurId', userId)
        .query(`
          UPDATE dbo.Utilisateurs
          SET TentativesEchouees = 0,
              VerrouilleJusquA = NULL,
              DerniereConnexion = SYSUTCDATETIME()
          WHERE UtilisateurId = @UtilisateurId;
        `);
      return;
    }
    const u = mockStore.users.find(x => x.UtilisateurId === userId);
    if (u) {
      u.TentativesEchouees = 0;
      u.VerrouilleJusquA = null;
      u.DerniereConnexion = new Date().toISOString();
    }
  },

  async activateStudentAccount(userId) {
    if (await useSqlServer()) {
      const pool = await getDbPool();
      await pool.request()
        .input('UtilisateurId', userId)
        .query(`
          UPDATE dbo.Utilisateurs
          SET CompteActive = 1,
              DateActivation = ISNULL(DateActivation, SYSUTCDATETIME())
          WHERE UtilisateurId = @UtilisateurId;
        `);
      return;
    }
    const u = mockStore.users.find(x => x.UtilisateurId === userId);
    if (u) {
      u.CompteActive = true;
      u.DateActivation = u.DateActivation || new Date().toISOString();
    }
  },

  async getPromotionById(promotionId) {
    if (!promotionId) return null;
    const idNum = parseInt(promotionId, 10);
    if (await useSqlServer()) {
      const pool = await getDbPool();
      const res = await pool.request()
        .input('PromotionId', idNum)
        .query(`SELECT TOP 1 * FROM dbo.Promotions WHERE PromotionId = @PromotionId`);
      return res.recordset[0] || null;
    }
    return mockStore.promotions.find(p => p.PromotionId === idNum) || null;
  },

  async getAllPromotions() {
    if (await useSqlServer()) {
      const pool = await getDbPool();
      const res = await pool.request().query(`SELECT * FROM dbo.Promotions ORDER BY PromotionId ASC`);
      return res.recordset;
    }
    return mockStore.promotions;
  },

  async createPromotion(body) {
    if (await useSqlServer()) {
      const pool = await getDbPool();
      const code = String(body.code).toUpperCase().trim();
      const exists = await pool.request().input('Code', code).query(`SELECT 1 FROM dbo.Promotions WHERE Code = @Code`);
      if (exists.recordset.length > 0) {
        throw new Error('Une promotion avec ce code existe déjà.');
      }
      const res = await pool.request()
        .input('Code', code)
        .input('Nom', body.nom)
        .input('Ecole', body.ecole || 'École de Gendarmerie Royale')
        .input('DateDebut', body.dateDebut || new Date().toISOString().split('T')[0])
        .input('DateFin', body.dateFin || '2027-06-30')
        .input('Statut', body.statut || 'PREPARATION')
        .input('EffectifTotal', 0)
        .input('Description', body.description || '')
        .query(`
          INSERT INTO dbo.Promotions (Code, Nom, Ecole, DateDebut, DateFin, Statut, EffectifTotal, Description)
          OUTPUT INSERTED.*
          VALUES (@Code, @Nom, @Ecole, @DateDebut, @DateFin, @Statut, @EffectifTotal, @Description);
        `);
      return res.recordset[0];
    }

    const newPromo = {
      PromotionId: mockStore.promotions.length + 1,
      Code: body.code.toUpperCase(),
      Nom: body.nom,
      Ecole: body.ecole || 'École de Gendarmerie de Rochefort',
      DateDebut: body.dateDebut || new Date().toISOString().split('T')[0],
      DateFin: body.dateFin || '2027-06-30',
      Statut: body.statut || 'PREPARATION',
      EffectifTotal: 0,
      Description: body.description || ''
    };
    mockStore.promotions.push(newPromo);
    return newPromo;
  },

  async getStudentPreferencesOnly(userId) {
    if (await useSqlServer()) {
      const pool = await getDbPool();
      const res = await pool.request()
        .input('UtilisateurId', userId)
        .query(`
          SELECT CodeSpecialite AS code, Rang AS rang, Motivation AS motivation
          FROM dbo.PreferencesSpecialites
          WHERE UtilisateurId = @UtilisateurId
          ORDER BY Rang ASC, PreferenceId ASC
        `);
      return res.recordset;
    }
    const student = mockStore.users.find(u => u.UtilisateurId === userId);
    return student?.PreferencesSpecialites || [];
  },

  async saveStudentPreferences(userId, preferences = []) {
    const cleanPrefs = Array.isArray(preferences)
      ? preferences.filter(p => p && p.code).map((p, idx) => ({
          code: String(p.code).trim(),
          rang: Number(p.rang || idx + 1),
          motivation: String(p.motivation || '')
        }))
      : [];

    if (await useSqlServer()) {
      const pool = await getDbPool();
      const userCheck = await pool.request()
        .input('UtilisateurId', userId)
        .query(`SELECT TOP 1 UtilisateurId, Matricule FROM dbo.Utilisateurs WHERE UtilisateurId = @UtilisateurId`);
      if (!userCheck.recordset[0]) {
        return null;
      }

      const tx = pool.transaction();
      await tx.begin();
      try {
        await tx.request()
          .input('UtilisateurId', userId)
          .query(`DELETE FROM dbo.PreferencesSpecialites WHERE UtilisateurId = @UtilisateurId`);

        for (const pref of cleanPrefs) {
          await tx.request()
            .input('UtilisateurId', userId)
            .input('CodeSpecialite', pref.code)
            .input('Rang', pref.rang)
            .input('Motivation', pref.motivation)
            .query(`
              INSERT INTO dbo.PreferencesSpecialites (UtilisateurId, CodeSpecialite, Rang, Motivation)
              VALUES (@UtilisateurId, @CodeSpecialite, @Rang, @Motivation);
            `);
        }

        await tx.request()
          .input('UtilisateurId', userId)
          .input('PrefsJson', JSON.stringify(cleanPrefs))
          .query(`UPDATE dbo.Utilisateurs SET PreferencesSpecialites = @PrefsJson WHERE UtilisateurId = @UtilisateurId`);

        await tx.commit();
      } catch (err) {
        await tx.rollback();
        throw err;
      }

      return { preferences: cleanPrefs, matricule: userCheck.recordset[0].Matricule };
    }

    const student = mockStore.users.find(u => u.UtilisateurId === userId);
    if (!student) return null;
    student.PreferencesSpecialites = cleanPrefs;
    return { preferences: cleanPrefs, matricule: student.Matricule };
  },

  async getActiveSpecialtiesSummary() {
    if (await useSqlServer()) {
      const pool = await getDbPool();
      const res = await pool.request().query(`
        SELECT Code, Intitule, Subdivision, Icone, EstLegacy
        FROM dbo.Specialites
        WHERE EstActive = 1
        ORDER BY EstLegacy ASC, SpecialiteId ASC
      `);
      return res.recordset;
    }
    return mockStore.specialites.filter(s => s.EstActive).map(s => ({
      Code: s.Code,
      Intitule: s.Intitule,
      Subdivision: s.Subdivision,
      Icone: s.Icone
    }));
  },

  async getSystemSettingsMap() {
    if (await useSqlServer()) {
      const pool = await getDbPool();
      const res = await pool.request().query(`SELECT SettingKey, SettingValue FROM dbo.SystemSettings`);
      const map = {};
      for (const r of res.recordset) {
        const val = r.SettingValue;
        if (val === 'true') map[r.SettingKey] = true;
        else if (val === 'false') map[r.SettingKey] = false;
        else if (/^\d+$/.test(val)) map[r.SettingKey] = parseInt(val, 10);
        else map[r.SettingKey] = safeJson(val, val);
      }
      return map;
    }
    return mockStore.systemSettings || {};
  },

  async upsertSystemSettings(updates, updatedBy = null) {
    if (await useSqlServer()) {
      const pool = await getDbPool();
      for (const [key, rawVal] of Object.entries(updates)) {
        if (rawVal === undefined) continue;
        const strVal = typeof rawVal === 'object' ? JSON.stringify(rawVal) : String(rawVal);
        await pool.request()
          .input('SettingKey', key)
          .input('SettingValue', strVal)
          .input('UpdatedBy', updatedBy ?? null)
          .query(`
            IF EXISTS (SELECT 1 FROM dbo.SystemSettings WHERE SettingKey = @SettingKey)
              UPDATE dbo.SystemSettings SET SettingValue = @SettingValue, UpdatedBy = @UpdatedBy, UpdatedAt = SYSUTCDATETIME() WHERE SettingKey = @SettingKey;
            ELSE
              INSERT INTO dbo.SystemSettings (SettingKey, SettingValue, UpdatedBy) VALUES (@SettingKey, @SettingValue, @UpdatedBy);
          `);
      }
      return this.getSystemSettingsMap();
    }
    mockStore.systemSettings = { ...(mockStore.systemSettings || {}), ...updates };
    return mockStore.systemSettings;
  },

  async getSpecialtiesAndDomains() {
    if (await useSqlServer()) {
      const pool = await getDbPool();
      const [specsRes, condsRes, domsRes] = await Promise.all([
        pool.request().query(`SELECT * FROM dbo.Specialites ORDER BY EstLegacy ASC, SpecialiteId ASC`),
        pool.request().query(`SELECT * FROM dbo.ConditionsEligibilite ORDER BY ConditionId ASC`),
        pool.request().query(`SELECT * FROM dbo.DomainesCompetences ORDER BY DomaineId ASC`)
      ]);
      const conds = condsRes.recordset.map(c => ({ ...c, EstObligatoire: Boolean(c.EstObligatoire) }));
      const specialites = specsRes.recordset.map(parseSpecialtyRow).map(s => ({
        ...s,
        conditions: conds.filter(c => c.SpecialiteId === s.SpecialiteId)
      }));
      return { specialites, domaines: domsRes.recordset };
    }

    return {
      specialites: mockStore.specialites.map(spec => ({
        ...spec,
        conditions: mockStore.conditions.filter(c => c.SpecialiteId === spec.SpecialiteId)
      })),
      domaines: mockStore.domaines
    };
  },

  async createSpecialty(body) {
    const code = String(body.code).toUpperCase().trim();
    if (await useSqlServer()) {
      const pool = await getDbPool();
      const dup = await pool.request().input('Code', code).query(`SELECT 1 FROM dbo.Specialites WHERE Code = @Code`);
      if (dup.recordset.length > 0) throw new Error('Une spécialité avec ce code existe déjà.');

      const res = await pool.request()
        .input('Code', code)
        .input('Intitule', body.intitule)
        .input('Subdivision', body.subdivision || 'Gendarmerie Départementale')
        .input('Description', body.description)
        .input('MissionsPrincipales', body.missionsPrincipales || body.description)
        .input('Icone', body.icone || 'Shield')
        .input('PlacesDisponibles', body.placesDisponibles ? parseInt(body.placesDisponibles, 10) : 10)
        .input('EstActive', body.estActive !== undefined ? (body.estActive ? 1 : 0) : 1)
        .input('CompetencesAttendues', JSON.stringify(body.competencesAttendues || []))
        .input('TestsAssocies', JSON.stringify(body.testsAssocies || ['TEST-ORIENT-2026']))
        .input('MatieresAcademiquesPertinentes', JSON.stringify(body.matieresAcademiquesPertinentes || []))
        .input('PoidsNotesAcademiques', body.poidsNotesAcademiques !== undefined ? parseFloat(body.poidsNotesAcademiques) : 0.25)
        .input('PoidsRaisonnement', body.poidsRaisonnement !== undefined ? parseFloat(body.poidsRaisonnement) : 0.30)
        .input('PoidsCompetencesSpecifiques', body.poidsCompetencesSpecifiques !== undefined ? parseFloat(body.poidsCompetencesSpecifiques) : 0.25)
        .input('PoidsSituationsPro', body.poidsSituationsPro !== undefined ? parseFloat(body.poidsSituationsPro) : 0.20)
        .query(`
          INSERT INTO dbo.Specialites (
            Code, Intitule, Subdivision, Description, MissionsPrincipales, Icone,
            PlacesDisponibles, EstActive, EstLegacy, CompetencesAttendues, TestsAssocies, MatieresAcademiquesPertinentes,
            PoidsNotesAcademiques, PoidsRaisonnement, PoidsCompetencesSpecifiques, PoidsSituationsPro
          )
          OUTPUT INSERTED.*
          VALUES (
            @Code, @Intitule, @Subdivision, @Description, @MissionsPrincipales, @Icone,
            @PlacesDisponibles, @EstActive, 0, @CompetencesAttendues, @TestsAssocies, @MatieresAcademiquesPertinentes,
            @PoidsNotesAcademiques, @PoidsRaisonnement, @PoidsCompetencesSpecifiques, @PoidsSituationsPro
          );
        `);
      return parseSpecialtyRow(res.recordset[0]);
    }

    if (mockStore.specialites.find(s => s.Code === body.code)) {
      throw new Error('Une spécialité avec ce code existe déjà.');
    }
    const newSpecialty = {
      SpecialiteId: mockStore.specialites.length + 1,
      Code: code,
      Intitule: body.intitule,
      Subdivision: body.subdivision || 'Gendarmerie Départementale',
      Description: body.description,
      MissionsPrincipales: body.missionsPrincipales || body.description,
      Icone: body.icone || 'Shield',
      PlacesDisponibles: body.placesDisponibles ? parseInt(body.placesDisponibles, 10) : 10,
      EstActive: body.estActive !== undefined ? Boolean(body.estActive) : true,
      CompetencesAttendues: body.competencesAttendues || [],
      TestsAssocies: body.testsAssocies || ['TEST-ORIENT-2026'],
      MatieresAcademiquesPertinentes: body.matieresAcademiquesPertinentes || [],
      PoidsNotesAcademiques: body.poidsNotesAcademiques !== undefined ? parseFloat(body.poidsNotesAcademiques) : 0.25,
      PoidsRaisonnement: body.poidsRaisonnement !== undefined ? parseFloat(body.poidsRaisonnement) : 0.30,
      PoidsCompetencesSpecifiques: body.poidsCompetencesSpecifiques !== undefined ? parseFloat(body.poidsCompetencesSpecifiques) : 0.25,
      PoidsSituationsPro: body.poidsSituationsPro !== undefined ? parseFloat(body.poidsSituationsPro) : 0.20,
      CreatedAt: new Date().toISOString()
    };
    mockStore.specialites.push(newSpecialty);
    return newSpecialty;
  },

  async updateSpecialty(body) {
    const id = parseInt(body.specialiteId, 10);
    if (await useSqlServer()) {
      const pool = await getDbPool();
      const curRes = await pool.request().input('Id', id).query(`SELECT TOP 1 * FROM dbo.Specialites WHERE SpecialiteId = @Id`);
      if (!curRes.recordset[0]) return null;
      const cur = parseSpecialtyRow(curRes.recordset[0]);

      const res = await pool.request()
        .input('Id', id)
        .input('Intitule', body.intitule !== undefined ? body.intitule : cur.Intitule)
        .input('PlacesDisponibles', body.placesDisponibles !== undefined ? parseInt(body.placesDisponibles, 10) : cur.PlacesDisponibles)
        .input('EstActive', body.estActive !== undefined ? (body.estActive ? 1 : 0) : (cur.EstActive ? 1 : 0))
        .input('Description', body.description !== undefined ? body.description : cur.Description)
        .input('MissionsPrincipales', body.missionsPrincipales !== undefined ? body.missionsPrincipales : cur.MissionsPrincipales)
        .input('PoidsNotesAcademiques', body.poidsNotesAcademiques !== undefined ? parseFloat(body.poidsNotesAcademiques) : cur.PoidsNotesAcademiques)
        .input('PoidsRaisonnement', body.poidsRaisonnement !== undefined ? parseFloat(body.poidsRaisonnement) : cur.PoidsRaisonnement)
        .input('PoidsCompetencesSpecifiques', body.poidsCompetencesSpecifiques !== undefined ? parseFloat(body.poidsCompetencesSpecifiques) : cur.PoidsCompetencesSpecifiques)
        .input('PoidsSituationsPro', body.poidsSituationsPro !== undefined ? parseFloat(body.poidsSituationsPro) : cur.PoidsSituationsPro)
        .input('CompetencesAttendues', JSON.stringify(body.competencesAttendues !== undefined ? body.competencesAttendues : cur.CompetencesAttendues))
        .input('TestsAssocies', JSON.stringify(body.testsAssocies !== undefined ? body.testsAssocies : cur.TestsAssocies))
        .input('MatieresAcademiquesPertinentes', JSON.stringify(body.matieresAcademiquesPertinentes !== undefined ? body.matieresAcademiquesPertinentes : cur.MatieresAcademiquesPertinentes))
        .query(`
          UPDATE dbo.Specialites
          SET Intitule = @Intitule, PlacesDisponibles = @PlacesDisponibles, EstActive = @EstActive,
              Description = @Description, MissionsPrincipales = @MissionsPrincipales,
              PoidsNotesAcademiques = @PoidsNotesAcademiques, PoidsRaisonnement = @PoidsRaisonnement,
              PoidsCompetencesSpecifiques = @PoidsCompetencesSpecifiques, PoidsSituationsPro = @PoidsSituationsPro,
              CompetencesAttendues = @CompetencesAttendues, TestsAssocies = @TestsAssocies,
              MatieresAcademiquesPertinentes = @MatieresAcademiquesPertinentes, UpdatedAt = SYSUTCDATETIME()
          OUTPUT INSERTED.*
          WHERE SpecialiteId = @Id;
        `);
      return parseSpecialtyRow(res.recordset[0]);
    }

    const spec = mockStore.specialites.find(s => s.SpecialiteId === id);
    if (!spec) return null;
    if (body.intitule !== undefined) spec.Intitule = body.intitule;
    if (body.placesDisponibles !== undefined) spec.PlacesDisponibles = parseInt(body.placesDisponibles, 10);
    if (body.estActive !== undefined) spec.EstActive = Boolean(body.estActive);
    if (body.description !== undefined) spec.Description = body.description;
    if (body.missionsPrincipales !== undefined) spec.MissionsPrincipales = body.missionsPrincipales;
    if (body.poidsNotesAcademiques !== undefined) spec.PoidsNotesAcademiques = parseFloat(body.poidsNotesAcademiques);
    if (body.poidsRaisonnement !== undefined) spec.PoidsRaisonnement = parseFloat(body.poidsRaisonnement);
    if (body.poidsCompetencesSpecifiques !== undefined) spec.PoidsCompetencesSpecifiques = parseFloat(body.poidsCompetencesSpecifiques);
    if (body.poidsSituationsPro !== undefined) spec.PoidsSituationsPro = parseFloat(body.poidsSituationsPro);
    if (body.competencesAttendues !== undefined) spec.CompetencesAttendues = body.competencesAttendues;
    if (body.testsAssocies !== undefined) spec.TestsAssocies = body.testsAssocies;
    if (body.matieresAcademiquesPertinentes !== undefined) spec.MatieresAcademiquesPertinentes = body.matieresAcademiquesPertinentes;
    return spec;
  },

  async getConditions(specialiteId = null) {
    if (await useSqlServer()) {
      const pool = await getDbPool();
      const req = pool.request();
      let where = '';
      if (specialiteId) {
        req.input('SpecialiteId', parseInt(specialiteId, 10));
        where = 'WHERE SpecialiteId = @SpecialiteId';
      }
      const res = await req.query(`SELECT * FROM dbo.ConditionsEligibilite ${where} ORDER BY ConditionId ASC`);
      return res.recordset.map(c => ({ ...c, EstObligatoire: Boolean(c.EstObligatoire) }));
    }
    let conditions = [...mockStore.conditions];
    if (specialiteId) conditions = conditions.filter(c => c.SpecialiteId === parseInt(specialiteId, 10));
    return conditions;
  },

  async createCondition(body) {
    const specId = parseInt(body.specialiteId, 10);
    if (await useSqlServer()) {
      const pool = await getDbPool();
      const specRes = await pool.request().input('Id', specId).query(`SELECT TOP 1 SpecialiteId, Code FROM dbo.Specialites WHERE SpecialiteId = @Id`);
      if (!specRes.recordset[0]) return { notFound: true };

      const res = await pool.request()
        .input('SpecialiteId', specId)
        .input('TypeCondition', body.typeCondition)
        .input('CibleCondition', body.cibleCondition || body.typeCondition)
        .input('Operateur', body.operateur || '>=')
        .input('Seuil', String(body.seuil))
        .input('EstObligatoire', body.estObligatoire !== undefined ? (body.estObligatoire ? 1 : 0) : 1)
        .input('SourceOfficielle', body.sourceOfficielle || 'Non spécifiée')
        .input('DateValidation', body.dateValidation || new Date().toISOString().split('T')[0])
        .input('StatutValidation', body.statutValidation || 'VALIDEE_OFFICIELLE')
        .input('Description', body.description)
        .query(`
          INSERT INTO dbo.ConditionsEligibilite (
            SpecialiteId, TypeCondition, CibleCondition, Operateur, Seuil,
            EstObligatoire, SourceOfficielle, DateValidation, StatutValidation, Description
          )
          OUTPUT INSERTED.*
          VALUES (
            @SpecialiteId, @TypeCondition, @CibleCondition, @Operateur, @Seuil,
            @EstObligatoire, @SourceOfficielle, @DateValidation, @StatutValidation, @Description
          );
        `);
      const cond = { ...res.recordset[0], EstObligatoire: Boolean(res.recordset[0].EstObligatoire) };
      return { condition: cond, specialite: specRes.recordset[0] };
    }

    const specialite = mockStore.specialites.find(s => s.SpecialiteId === specId);
    if (!specialite) return { notFound: true };
    const newCondition = {
      ConditionId: mockStore.conditions.length + 1,
      SpecialiteId: specialite.SpecialiteId,
      TypeCondition: body.typeCondition,
      CibleCondition: body.cibleCondition || body.typeCondition,
      Operateur: body.operateur || '>=',
      Seuil: String(body.seuil),
      EstObligatoire: body.estObligatoire !== undefined ? Boolean(body.estObligatoire) : true,
      SourceOfficielle: body.sourceOfficielle || 'Non spécifiée',
      DateValidation: body.dateValidation || new Date().toISOString().split('T')[0],
      StatutValidation: body.statutValidation || 'VALIDEE_OFFICIELLE',
      Description: body.description
    };
    mockStore.conditions.push(newCondition);
    return { condition: newCondition, specialite };
  },

  async updateCondition(body) {
    const id = parseInt(body.conditionId, 10);
    if (await useSqlServer()) {
      const pool = await getDbPool();
      const curRes = await pool.request().input('Id', id).query(`SELECT TOP 1 * FROM dbo.ConditionsEligibilite WHERE ConditionId = @Id`);
      if (!curRes.recordset[0]) return null;
      const cur = curRes.recordset[0];
      const res = await pool.request()
        .input('Id', id)
        .input('Seuil', body.seuil !== undefined ? String(body.seuil) : cur.Seuil)
        .input('Operateur', body.operateur !== undefined ? body.operateur : cur.Operateur)
        .input('EstObligatoire', body.estObligatoire !== undefined ? (body.estObligatoire ? 1 : 0) : (cur.EstObligatoire ? 1 : 0))
        .input('SourceOfficielle', body.sourceOfficielle !== undefined ? body.sourceOfficielle : cur.SourceOfficielle)
        .input('StatutValidation', body.statutValidation !== undefined ? body.statutValidation : cur.StatutValidation)
        .input('Description', body.description !== undefined ? body.description : cur.Description)
        .query(`
          UPDATE dbo.ConditionsEligibilite
          SET Seuil = @Seuil, Operateur = @Operateur, EstObligatoire = @EstObligatoire,
              SourceOfficielle = @SourceOfficielle, StatutValidation = @StatutValidation, Description = @Description
          OUTPUT INSERTED.*
          WHERE ConditionId = @Id;
        `);
      return { ...res.recordset[0], EstObligatoire: Boolean(res.recordset[0].EstObligatoire) };
    }

    const cond = mockStore.conditions.find(c => c.ConditionId === id);
    if (!cond) return null;
    if (body.seuil !== undefined) cond.Seuil = String(body.seuil);
    if (body.operateur !== undefined) cond.Operateur = body.operateur;
    if (body.estObligatoire !== undefined) cond.EstObligatoire = Boolean(body.estObligatoire);
    if (body.sourceOfficielle !== undefined) cond.SourceOfficielle = body.sourceOfficielle;
    if (body.statutValidation !== undefined) cond.StatutValidation = body.statutValidation;
    if (body.description !== undefined) cond.Description = body.description;
    return cond;
  },

  async deleteCondition(conditionId) {
    const id = parseInt(conditionId, 10);
    if (await useSqlServer()) {
      const pool = await getDbPool();
      const res = await pool.request()
        .input('Id', id)
        .query(`DELETE FROM dbo.ConditionsEligibilite OUTPUT DELETED.* WHERE ConditionId = @Id`);
      return res.recordset[0] || null;
    }

    const idx = mockStore.conditions.findIndex(c => c.ConditionId === id);
    if (idx === -1) return null;
    return mockStore.conditions.splice(idx, 1)[0];
  }
};

