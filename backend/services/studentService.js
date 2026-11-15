// ==============================================================================
// ORIENT-GR - Service Métier de Gestion des Élèves & Promotions
// Consultation, filtrage, création d'élèves et comparaison de profils
// ==============================================================================

import crypto from 'node:crypto';
import { getDbPool, useSqlServer, mockStore } from '../lib/db.js';
import { hashPassword } from '../lib/auth.js';
import { coreRepository, parseUserRow } from '../repositories/coreRepository.js';

function formatStudentListItem(s, promo, session) {
  const imc = s.IMC || (s.PoidsKg && s.TailleCm ? Math.round((s.PoidsKg / Math.pow(s.TailleCm / 100, 2)) * 10) / 10 : null);
  return {
    UtilisateurId: s.UtilisateurId,
    id: s.UtilisateurId,
    Matricule: s.Matricule,
    matricule: s.Matricule,
    Nom: s.Nom,
    nom: s.Nom,
    Prenom: s.Prenom,
    prenom: s.Prenom,
    Email: s.Email,
    email: s.Email,
    PromotionId: s.PromotionId,
    promotionId: s.PromotionId,
    PromotionNom: promo ? promo.Nom : 'Non assignée',
    promotionNom: promo ? promo.Nom : 'Non assignée',
    ClassementInitial: s.ClassementInitial,
    classementInitial: s.ClassementInitial,
    NoteFormationPro: s.NoteFormationPro,
    noteFormationPro: s.NoteFormationPro,
    AptitudePhysique: s.AptitudePhysique,
    aptitudePhysique: s.AptitudePhysique,
    StatutMedical: s.StatutMedical,
    statutMedical: s.StatutMedical,
    Age: s.Age || null,
    age: s.Age || null,
    TailleCm: s.TailleCm,
    tailleCm: s.TailleCm,
    PoidsKg: s.PoidsKg,
    poidsKg: s.PoidsKg,
    IMC: imc,
    imc,
    VisionSIGYCOP_Y: s.VisionSIGYCOP_Y,
    visionY: s.VisionSIGYCOP_Y,
    AcuiteVisuelle: s.AcuiteVisuelle || (s.VisionSIGYCOP_Y ? `Y${s.VisionSIGYCOP_Y}` : null),
    MoyennesMatieres: s.MoyennesMatieres || {},
    CompetencesPratiques: s.CompetencesPratiques || {},
    PreferencesSpecialites: s.PreferencesSpecialites || [],
    preferencesSpecialites: s.PreferencesSpecialites || [],
    EstActif: s.EstActif,
    StatutTest: session ? session.Statut : 'EN_ATTENTE',
    statutTest: session ? session.Statut : 'EN_ATTENTE',
    ScoreTotal: session ? session.ScoreTotal : null,
    scoreTotal: session ? session.ScoreTotal : null,
    ScoreBrut: session ? (session.ScoreBrut || 60) : 60,
    scoreBrut: session ? (session.ScoreBrut || 60) : 60,
    ScoreTest: session ? session.ScorePourcentage : null,
    scoreTest: session ? session.ScorePourcentage : null,
    SessionId: session ? session.SessionId : null,
    sessionId: session ? session.SessionId : null
  };
}

export const studentService = {
  /**
   * Liste les élèves avec filtres (promotion, recherche texte, statut)
   */
  async getStudents({ promotionId, search, statutMedical } = {}) {
    if (await useSqlServer()) {
      const pool = await getDbPool();
      const req = pool.request();
      let sql = `SELECT * FROM dbo.Utilisateurs WHERE Role = 'ELEVE'`;

      if (promotionId) {
        req.input('PromotionId', parseInt(promotionId, 10));
        sql += ` AND PromotionId = @PromotionId`;
      }
      if (statutMedical) {
        req.input('StatutMedical', statutMedical);
        sql += ` AND StatutMedical = @StatutMedical`;
      }
      if (search && search.trim()) {
        req.input('Search', `%${search.trim().toLowerCase()}%`);
        sql += ` AND (LOWER(Nom) LIKE @Search OR LOWER(Prenom) LIKE @Search OR LOWER(Matricule) LIKE @Search OR LOWER(Email) LIKE @Search)`;
      }
      sql += ` ORDER BY UtilisateurId ASC`;

      const [usersRes, promosRes, prefsRes, sqlSessRes] = await Promise.all([
        req.query(sql),
        pool.request().query(`SELECT * FROM dbo.Promotions`),
        pool.request().query(`SELECT UtilisateurId, CodeSpecialite AS code, Rang AS rang, Motivation AS motivation FROM dbo.PreferencesSpecialites ORDER BY Rang ASC`),
        pool.request().query(`SELECT * FROM dbo.SessionsTest ORDER BY SessionId DESC`)
      ]);

      const promoMap = new Map(promosRes.recordset.map(p => [p.PromotionId, p]));
      const prefsByUser = new Map();
      for (const pr of prefsRes.recordset) {
        if (!prefsByUser.has(pr.UtilisateurId)) prefsByUser.set(pr.UtilisateurId, []);
        prefsByUser.get(pr.UtilisateurId).push({ code: pr.code, rang: pr.rang, motivation: pr.motivation });
      }
      const sessByUser = new Map();
      for (const ss of sqlSessRes.recordset) {
        if (!sessByUser.has(ss.UtilisateurId)) sessByUser.set(ss.UtilisateurId, ss);
      }

      return usersRes.recordset.map(row => {
        const s = parseUserRow(row);
        if (prefsByUser.has(s.UtilisateurId)) {
          s.PreferencesSpecialites = prefsByUser.get(s.UtilisateurId);
        }
        const promo = promoMap.get(s.PromotionId);
        const session = sessByUser.get(s.UtilisateurId) || mockStore.sessions.find(sess => sess.UtilisateurId === s.UtilisateurId);
        return formatStudentListItem(s, promo, session);
      });
    }

    let students = mockStore.users.filter(u => u.Role === 'ELEVE');

    if (promotionId) {
      students = students.filter(u => u.PromotionId === parseInt(promotionId, 10));
    }
    if (statutMedical) {
      students = students.filter(u => u.StatutMedical === statutMedical);
    }
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      students = students.filter(u =>
        u.Nom.toLowerCase().includes(q) ||
        u.Prenom.toLowerCase().includes(q) ||
        u.Matricule.toLowerCase().includes(q) ||
        u.Email.toLowerCase().includes(q)
      );
    }

    return students.map(s => {
      const promo = mockStore.promotions.find(p => p.PromotionId === s.PromotionId);
      const session = mockStore.sessions.find(sess => sess.UtilisateurId === s.UtilisateurId);
      return formatStudentListItem(s, promo, session);
    });
  },

  /**
   * Récupère un profil élève complet par son ID
   */
  async getStudentById(studentId) {
    const id = parseInt(studentId, 10);
    if (Number.isNaN(id)) return null;

    if (await useSqlServer()) {
      const pool = await getDbPool();
      const res = await pool.request()
        .input('Id', id)
        .query(`SELECT TOP 1 * FROM dbo.Utilisateurs WHERE UtilisateurId = @Id AND Role = 'ELEVE'`);
      if (!res.recordset[0]) return null;
      const student = parseUserRow(res.recordset[0]);
      const [promo, prefs, sqlSessRes] = await Promise.all([
        coreRepository.getPromotionById(student.PromotionId),
        coreRepository.getStudentPreferencesOnly(student.UtilisateurId),
        pool.request().input('Id', id).query(`SELECT TOP 1 * FROM dbo.SessionsTest WHERE UtilisateurId = @Id ORDER BY SessionId DESC`)
      ]);
      if (prefs.length > 0) student.PreferencesSpecialites = prefs;
      const session = sqlSessRes.recordset[0] || mockStore.sessions.find(s => s.UtilisateurId === student.UtilisateurId) || null;
      const imcCalculated = student.IMC;
      return {
        UtilisateurId: student.UtilisateurId,
        Matricule: student.Matricule,
        Nom: student.Nom,
        Prenom: student.Prenom,
        Email: student.Email,
        PromotionId: student.PromotionId,
        PromotionNom: promo ? promo.Nom : 'Non assignée',
        ClassementInitial: student.ClassementInitial,
        NoteFormationPro: student.NoteFormationPro,
        AptitudePhysique: student.AptitudePhysique,
        StatutMedical: student.StatutMedical,
        Age: student.Age || null,
        TailleCm: student.TailleCm,
        PoidsKg: student.PoidsKg,
        IMC: imcCalculated,
        VisionSIGYCOP_Y: student.VisionSIGYCOP_Y,
        AcuiteVisuelle: student.AcuiteVisuelle,
        MoyennesMatieres: student.MoyennesMatieres || {},
        CompetencesPratiques: student.CompetencesPratiques || {},
        PreferencesSpecialites: student.PreferencesSpecialites || [],
        EstActif: student.EstActif,
        Session: session
      };
    }

    const student = mockStore.users.find(u => u.UtilisateurId === id && u.Role === 'ELEVE');
    if (!student) return null;
    const promo = mockStore.promotions.find(p => p.PromotionId === student.PromotionId);
    const session = mockStore.sessions.find(s => s.UtilisateurId === student.UtilisateurId);
    const imcCalculated = student.IMC || (student.PoidsKg && student.TailleCm ? Math.round((student.PoidsKg / Math.pow(student.TailleCm / 100, 2)) * 10) / 10 : null);

    return {
      UtilisateurId: student.UtilisateurId,
      Matricule: student.Matricule,
      Nom: student.Nom,
      Prenom: student.Prenom,
      Email: student.Email,
      PromotionId: student.PromotionId,
      PromotionNom: promo ? promo.Nom : 'Non assignée',
      ClassementInitial: student.ClassementInitial,
      NoteFormationPro: student.NoteFormationPro,
      AptitudePhysique: student.AptitudePhysique,
      StatutMedical: student.StatutMedical,
      Age: student.Age || null,
      TailleCm: student.TailleCm,
      PoidsKg: student.PoidsKg,
      IMC: imcCalculated,
      VisionSIGYCOP_Y: student.VisionSIGYCOP_Y,
      AcuiteVisuelle: student.AcuiteVisuelle || (student.VisionSIGYCOP_Y ? `Y${student.VisionSIGYCOP_Y}` : null),
      MoyennesMatieres: student.MoyennesMatieres || {},
      CompetencesPratiques: student.CompetencesPratiques || {},
      PreferencesSpecialites: student.PreferencesSpecialites || [],
      EstActif: student.EstActif,
      Session: session || null
    };
  },

  /**
   * Crée un nouvel élève gendarme
   */
  async createStudent(data) {
    const matricule = String(data.matricule).trim().toUpperCase();
    const email = String(data.email).trim().toLowerCase();
    const initialSecret = data.password ? String(data.password) : crypto.randomBytes(18).toString('base64url');
    const hashed = await hashPassword(initialSecret);

    if (await useSqlServer()) {
      const pool = await getDbPool();
      const dup = await pool.request()
        .input('Matricule', matricule)
        .input('Email', email)
        .query(`SELECT TOP 1 UtilisateurId FROM dbo.Utilisateurs WHERE UPPER(Matricule) = @Matricule OR LOWER(Email) = @Email`);
      if (dup.recordset.length > 0) {
        throw new Error('Un élève avec ce matricule ou cette adresse e-mail existe déjà.');
      }

      const promoId = data.promotionId ? parseInt(data.promotionId, 10) : 1;
      const prefs = Array.isArray(data.preferencesSpecialites) ? data.preferencesSpecialites : [];

      const res = await pool.request()
        .input('Matricule', matricule)
        .input('Email', email)
        .input('MotDePasseHash', hashed)
        .input('Nom', String(data.nom).toUpperCase())
        .input('Prenom', data.prenom)
        .input('Role', 'ELEVE')
        .input('PromotionId', promoId)
        .input('ClassementInitial', data.classementInitial ? parseInt(data.classementInitial, 10) : null)
        .input('Age', data.age ? parseInt(data.age, 10) : null)
        .input('NoteFormationPro', data.noteFormationPro !== undefined ? parseFloat(data.noteFormationPro) : 14.0)
        .input('AptitudePhysique', data.aptitudePhysique !== undefined ? parseFloat(data.aptitudePhysique) : 14.0)
        .input('StatutMedical', data.statutMedical || 'SIGYCOP_VALIDE')
        .input('TailleCm', data.tailleCm ? parseInt(data.tailleCm, 10) : null)
        .input('PoidsKg', data.poidsKg ? parseFloat(data.poidsKg) : null)
        .input('VisionSIGYCOP_Y', data.visionSIGYCOP_Y ? parseInt(data.visionSIGYCOP_Y, 10) : null)
        .input('MoyennesMatieres', JSON.stringify(data.moyennesMatieres || {}))
        .input('CompetencesPratiques', JSON.stringify(data.competencesPratiques || {}))
        .input('PreferencesSpecialites', JSON.stringify(prefs))
        .query(`
          INSERT INTO dbo.Utilisateurs (
            Matricule, Email, MotDePasseHash, Nom, Prenom, Role, PromotionId, ClassementInitial, Age,
            NoteFormationPro, AptitudePhysique, StatutMedical, TailleCm, PoidsKg, VisionSIGYCOP_Y,
            MoyennesMatieres, CompetencesPratiques, PreferencesSpecialites, EstActif
          )
          OUTPUT INSERTED.*
          VALUES (
            @Matricule, @Email, @MotDePasseHash, @Nom, @Prenom, @Role, @PromotionId, @ClassementInitial, @Age,
            @NoteFormationPro, @AptitudePhysique, @StatutMedical, @TailleCm, @PoidsKg, @VisionSIGYCOP_Y,
            @MoyennesMatieres, @CompetencesPratiques, @PreferencesSpecialites, 1
          );
        `);

      const created = parseUserRow(res.recordset[0]);
      if (prefs.length > 0) {
        await coreRepository.saveStudentPreferences(created.UtilisateurId, prefs);
      }
      if (promoId) {
        await pool.request().input('PromotionId', promoId).query(`UPDATE dbo.Promotions SET EffectifTotal = EffectifTotal + 1 WHERE PromotionId = @PromotionId`);
      }
      const promo = await coreRepository.getPromotionById(promoId);
      await coreRepository.appendLog({
        utilisateurId: 1,
        action: 'ELEVE_CREE',
        cible: `Élève ${created.Matricule}`,
        details: `Inscription de ${created.Nom} ${created.Prenom} dans ${promo ? promo.Nom : 'Promotion'}.`
      });
      return created;
    }

    const existing = mockStore.users.find(u => u.Matricule === matricule || u.Email === email);
    if (existing) {
      throw new Error('Un élève avec ce matricule ou cette adresse e-mail existe déjà.');
    }

    const newStudent = {
      UtilisateurId: mockStore.users.length + 1,
      Matricule: matricule,
      Email: email,
      MotDePasseHash: hashed,
      Nom: data.nom.toUpperCase(),
      Prenom: data.prenom,
      Role: 'ELEVE',
      PromotionId: data.promotionId ? parseInt(data.promotionId, 10) : 1,
      ClassementInitial: data.classementInitial ? parseInt(data.classementInitial, 10) : null,
      NoteFormationPro: data.noteFormationPro ? parseFloat(data.noteFormationPro) : 14.0,
      AptitudePhysique: data.aptitudePhysique ? parseFloat(data.aptitudePhysique) : 14.0,
      StatutMedical: data.statutMedical || 'SIGYCOP_VALIDE',
      TailleCm: data.tailleCm ? parseInt(data.tailleCm, 10) : null,
      PoidsKg: data.poidsKg ? parseFloat(data.poidsKg) : null,
      VisionSIGYCOP_Y: data.visionSIGYCOP_Y ? parseInt(data.visionSIGYCOP_Y, 10) : null,
      MoyennesMatieres: data.moyennesMatieres || {},
      CompetencesPratiques: data.competencesPratiques || {},
      PreferencesSpecialites: data.preferencesSpecialites || [],
      EstActif: true,
      DerniereConnexion: null,
      CreatedAt: new Date().toISOString()
    };

    mockStore.users.push(newStudent);
    const promo = mockStore.promotions.find(p => p.PromotionId === newStudent.PromotionId);
    if (promo) promo.EffectifTotal += 1;
    await coreRepository.appendLog({
      utilisateurId: 1,
      action: 'ELEVE_CREE',
      cible: `Élève ${newStudent.Matricule}`,
      details: `Inscription de ${newStudent.Nom} ${newStudent.Prenom} dans ${promo ? promo.Nom : 'Promotion'}.`
    });
    return newStudent;
  },

  /**
   * Met à jour un élève gendarme
   */
  async updateStudent(studentId, data) {
    const id = parseInt(studentId, 10);

    if (await useSqlServer()) {
      const pool = await getDbPool();
      const curRes = await pool.request()
        .input('Id', id)
        .query(`SELECT TOP 1 * FROM dbo.Utilisateurs WHERE UtilisateurId = @Id AND Role = 'ELEVE'`);
      if (!curRes.recordset[0]) throw new Error('Élève introuvable.');
      const cur = parseUserRow(curRes.recordset[0]);

      const nextMat = data.matricule !== undefined ? data.matricule.trim() : cur.Matricule;
      const nextNom = data.nom !== undefined ? data.nom.toUpperCase() : cur.Nom;
      const nextPrenom = data.prenom !== undefined ? data.prenom : cur.Prenom;
      const nextNote = data.noteFormationPro !== undefined ? parseFloat(data.noteFormationPro) : cur.NoteFormationPro;
      const nextApt = data.aptitudePhysique !== undefined ? parseFloat(data.aptitudePhysique) : cur.AptitudePhysique;
      const nextStatut = data.statutMedical !== undefined ? data.statutMedical : cur.StatutMedical;
      const nextAge = data.age !== undefined ? (data.age ? parseInt(data.age, 10) : null) : cur.Age;
      const nextTaille = data.tailleCm !== undefined ? (data.tailleCm ? parseInt(data.tailleCm, 10) : null) : cur.TailleCm;
      const nextPoids = data.poidsKg !== undefined ? (data.poidsKg ? parseFloat(data.poidsKg) : null) : cur.PoidsKg;
      const nextVision = data.visionSIGYCOP_Y !== undefined ? (data.visionSIGYCOP_Y ? parseInt(data.visionSIGYCOP_Y, 10) : null) : cur.VisionSIGYCOP_Y;
      const nextMoy = data.moyennesMatieres !== undefined ? data.moyennesMatieres : cur.MoyennesMatieres;
      const nextComp = data.competencesPratiques !== undefined ? data.competencesPratiques : cur.CompetencesPratiques;
      const nextPrefs = data.preferencesSpecialites !== undefined ? data.preferencesSpecialites : cur.PreferencesSpecialites;

      const updRes = await pool.request()
        .input('Id', id)
        .input('Matricule', nextMat)
        .input('Nom', nextNom)
        .input('Prenom', nextPrenom)
        .input('NoteFormationPro', nextNote)
        .input('AptitudePhysique', nextApt)
        .input('StatutMedical', nextStatut)
        .input('Age', nextAge)
        .input('TailleCm', nextTaille)
        .input('PoidsKg', nextPoids)
        .input('VisionSIGYCOP_Y', nextVision)
        .input('MoyennesMatieres', JSON.stringify(nextMoy || {}))
        .input('CompetencesPratiques', JSON.stringify(nextComp || {}))
        .input('PreferencesSpecialites', JSON.stringify(nextPrefs || []))
        .query(`
          UPDATE dbo.Utilisateurs
          SET Matricule = @Matricule, Nom = @Nom, Prenom = @Prenom,
              NoteFormationPro = @NoteFormationPro, AptitudePhysique = @AptitudePhysique,
              StatutMedical = @StatutMedical, Age = @Age, TailleCm = @TailleCm,
              PoidsKg = @PoidsKg, VisionSIGYCOP_Y = @VisionSIGYCOP_Y,
              MoyennesMatieres = @MoyennesMatieres, CompetencesPratiques = @CompetencesPratiques,
              PreferencesSpecialites = @PreferencesSpecialites
          OUTPUT INSERTED.*
          WHERE UtilisateurId = @Id;
        `);

      if (data.preferencesSpecialites !== undefined) {
        await coreRepository.saveStudentPreferences(id, data.preferencesSpecialites);
      }

      return parseUserRow(updRes.recordset[0]);
    }

    const student = mockStore.users.find(u => u.UtilisateurId === id && u.Role === 'ELEVE');
    if (!student) throw new Error('Élève introuvable.');

    if (data.matricule !== undefined) student.Matricule = data.matricule.trim();
    if (data.nom !== undefined) student.Nom = data.nom.toUpperCase();
    if (data.prenom !== undefined) student.Prenom = data.prenom;
    if (data.noteFormationPro !== undefined) student.NoteFormationPro = parseFloat(data.noteFormationPro);
    if (data.aptitudePhysique !== undefined) student.AptitudePhysique = parseFloat(data.aptitudePhysique);
    if (data.statutMedical !== undefined) student.StatutMedical = data.statutMedical;
    if (data.age !== undefined) student.Age = data.age ? parseInt(data.age, 10) : null;
    if (data.tailleCm !== undefined) student.TailleCm = data.tailleCm ? parseInt(data.tailleCm, 10) : null;
    if (data.poidsKg !== undefined) student.PoidsKg = data.poidsKg ? parseFloat(data.poidsKg) : null;
    if (data.visionSIGYCOP_Y !== undefined) student.VisionSIGYCOP_Y = data.visionSIGYCOP_Y ? parseInt(data.visionSIGYCOP_Y, 10) : null;
    if (data.acuiteVisuelle !== undefined) student.AcuiteVisuelle = data.acuiteVisuelle;
    if (student.TailleCm && student.PoidsKg) {
      student.IMC = Math.round((student.PoidsKg / Math.pow(student.TailleCm / 100, 2)) * 10) / 10;
    }
    if (data.moyennesMatieres !== undefined) student.MoyennesMatieres = data.moyennesMatieres;
    if (data.competencesPratiques !== undefined) student.CompetencesPratiques = data.competencesPratiques;
    if (data.preferencesSpecialites !== undefined) student.PreferencesSpecialites = data.preferencesSpecialites;

    return student;
  },

  /**
   * Supprime un élève de test/administratif de manière contrôlée
   */
  async deleteStudent(studentId, adminUserId = 1) {
    const id = parseInt(studentId, 10);
    if (await useSqlServer()) {
      const pool = await getDbPool();
      const targetRes = await pool.request()
        .input('Id', id)
        .query(`SELECT TOP 1 UtilisateurId, Matricule, PromotionId FROM dbo.Utilisateurs WHERE UtilisateurId = @Id AND Role = 'ELEVE'`);
      if (!targetRes.recordset[0]) return null;
      const target = targetRes.recordset[0];

      await pool.request().input('Id', id).query(`DELETE FROM dbo.Utilisateurs WHERE UtilisateurId = @Id AND Role = 'ELEVE'`);
      if (target.PromotionId) {
        await pool.request().input('PromotionId', target.PromotionId).query(`UPDATE dbo.Promotions SET EffectifTotal = CASE WHEN EffectifTotal > 0 THEN EffectifTotal - 1 ELSE 0 END WHERE PromotionId = @PromotionId`);
      }
      await coreRepository.appendLog({
        utilisateurId: adminUserId,
        action: 'ELEVE_SUPPRIME',
        cible: `Élève ${target.Matricule}`,
        details: `Suppression contrôlée de l'élève #${id}.`
      });
      return target;
    }

    const idx = mockStore.users.findIndex(u => u.UtilisateurId === id && u.Role === 'ELEVE');
    if (idx === -1) return null;
    return mockStore.users.splice(idx, 1)[0];
  },

  /**
   * Comparaison multicritère de plusieurs profils élèves (Académique, QCM et Simulations professionnelles)
   */
  async compareProfiles(studentIds = []) {
    const ids = studentIds.map(id => parseInt(id, 10)).filter(n => !Number.isNaN(n));
    let students = [];
    if (await useSqlServer() && ids.length > 0) {
      const pool = await getDbPool();
      const res = await pool.request().query(`SELECT * FROM dbo.Utilisateurs WHERE Role = 'ELEVE'`);
      students = res.recordset.map(parseUserRow).filter(u => ids.includes(u.UtilisateurId));
    } else {
      students = mockStore.users.filter(u => ids.includes(u.UtilisateurId));
    }

    const { professionalOrientationService } = await import('./professionalOrientationService.js');
    const { group3Repository } = await import('../repositories/group3Repository.js');
    const [allTestSessions, allSimSessions] = await Promise.all([
      group3Repository.getTestSessions(),
      group3Repository.getSimulationSessions()
    ]);

    const result = [];
    for (const s of students) {
      const session = allTestSessions.find(sess => sess.UtilisateurId === s.UtilisateurId);
      const simSessions = allSimSessions.filter(
        sess => sess.UtilisateurId === s.UtilisateurId && sess.Statut === 'TERMINE'
      );
      const simCompleted = simSessions.length;
      const simAvg = simCompleted > 0
        ? Math.round(simSessions.reduce((a, b) => a + (b.ScoreGlobal || 0), 0) / simCompleted)
        : null;

      const profComp = await professionalOrientationService.calculateStudentCompetencies(s.UtilisateurId);
      const { topThree } = await professionalOrientationService.matchStudentToSpecialties(s.UtilisateurId);

      result.push({
        UtilisateurId: s.UtilisateurId,
        Matricule: s.Matricule,
        Nom: s.Nom,
        Prenom: s.Prenom,
        ClassementInitial: s.ClassementInitial,
        NoteFormationPro: s.NoteFormationPro,
        AptitudePhysique: s.AptitudePhysique,
        StatutMedical: s.StatutMedical,
        Age: s.Age || null,
        TailleCm: s.TailleCm,
        PoidsKg: s.PoidsKg,
        IMC: s.IMC || (s.PoidsKg && s.TailleCm ? Math.round((s.PoidsKg / Math.pow(s.TailleCm / 100, 2)) * 10) / 10 : null),
        VisionSIGYCOP_Y: s.VisionSIGYCOP_Y,
        AcuiteVisuelle: s.AcuiteVisuelle || null,
        ScoreTest: session ? session.ScorePourcentage : 0,
        DomainScores: session ? (session.ResultatsDomaines || []) : [],
        TopRecommandation: session && session.Recommandations && session.Recommandations.length > 0
          ? session.Recommandations[0]
          : null,
        PreferencesSpecialites: s.PreferencesSpecialites || [],
        SimulationCompletedCount: simCompleted,
        SimulationAvgScore: simAvg,
        ProfessionalCompetencies: profComp,
        TopSimulationSpecialties: topThree,
        PracticalSkillsProfile: await professionalOrientationService.getTraineeProfessionalSkillsProfile(s.UtilisateurId)
      });
    }
    return result;
  }
};
