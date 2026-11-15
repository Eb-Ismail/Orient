// ==============================================================================
// ORIENT-GR ÉLÈVE — SEED SQL SERVER IDEMPOTENT & NON DESTRUCTIF
// Usage : SEED_DEMO_PASSWORD=... node sql/seedOrientGr.js
// Aucune donnée existante n'est écrasée ; aucune exécution répétée ne duplique.
// ==============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDbPool, sql } from '../lib/db.js';
import { hashPassword } from '../lib/auth.js';
import {
  initialPromotions,
  initialDomaines,
  initialSpecialites,
  initialConditions,
  initialUsers,
  initialTests,
  initialSessions,
  initialLogs
} from '../lib/mockData.js';
import { simpleThreeTests, simpleQuestionsBank30 } from '../lib/simpleTestBank30.js';
import { arabicQuestionBank140 } from '../lib/arabicQuestionBank140.js';
import {
  canonicalCompetencyFramework,
  initialSpecialtyCompetencyMatrix,
  defaultScoringCriteriaConfig
} from '../lib/competencyFramework.js';
import {
  workshopCategories,
  initialWorkshops,
  initialWorkshopAssignments
} from '../lib/workshopsData.js';
import { GENDARMERIE_SPECIALTIES } from '../../frontend/src/data/gendarmerieSpecialtiesData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnvIfNeeded() {
  const envPath = path.resolve(__dirname, '../.env');
  if (fs.existsSync(envPath)) {
    const raw = fs.readFileSync(envPath, 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) {
        process.env[m[1]] = m[2];
      }
    }
  }
}

async function seed() {
  loadEnvIfNeeded();
  process.env.DB_SERVER_STRICT = 'true';

  const pool = await getDbPool();
  if (!pool) {
    throw new Error('Impossible de se connecter à SQL Server.');
  }

  console.log('▶ Démarrage du seed idempotent sur OrientGR_DB...');

  // 1. Promotions
  for (const p of initialPromotions) {
    await pool.request()
      .input('PromotionId', p.PromotionId)
      .input('Code', p.Code)
      .input('Nom', p.Nom)
      .input('Ecole', p.Ecole)
      .input('DateDebut', p.DateDebut)
      .input('DateFin', p.DateFin)
      .input('Statut', p.Statut)
      .input('EffectifTotal', p.EffectifTotal || 0)
      .input('Description', p.Description || '')
      .query(`
        IF NOT EXISTS (SELECT 1 FROM dbo.Promotions WHERE Code = @Code OR PromotionId = @PromotionId)
        BEGIN
          SET IDENTITY_INSERT dbo.Promotions ON;
          INSERT INTO dbo.Promotions (PromotionId, Code, Nom, Ecole, DateDebut, DateFin, Statut, EffectifTotal, Description)
          VALUES (@PromotionId, @Code, @Nom, @Ecole, @DateDebut, @DateFin, @Statut, @EffectifTotal, @Description);
          SET IDENTITY_INSERT dbo.Promotions OFF;
        END
      `);
  }

  // 2. Utilisateurs (ADMIN, COMMISSION, ELEVE) — sans mot de passe codé en dur
  let missingUsersCount = 0;
  for (const u of initialUsers) {
    const checkRes = await pool.request()
      .input('Email', u.Email)
      .input('Matricule', u.Matricule)
      .query(`SELECT TOP 1 UtilisateurId FROM dbo.Utilisateurs WHERE Email = @Email OR Matricule = @Matricule`);
    if (checkRes.recordset.length === 0) missingUsersCount++;
  }

  let demoHash = null;
  if (missingUsersCount > 0) {
    const rawSeedPassword = process.env.SEED_DEMO_PASSWORD;
    if (!rawSeedPassword || rawSeedPassword.length < 8) {
      throw new Error(
        `SEED_DEMO_PASSWORD doit être fourni en variable d'environnement (min 8 car.) pour initialiser les ${missingUsersCount} comptes de test absents.`
      );
    }
    demoHash = await hashPassword(rawSeedPassword);
  }

  for (const u of initialUsers) {
    const existsRes = await pool.request()
      .input('Email', u.Email)
      .input('Matricule', u.Matricule)
      .query(`SELECT TOP 1 UtilisateurId FROM dbo.Utilisateurs WHERE Email = @Email OR Matricule = @Matricule`);

    let userId = existsRes.recordset[0]?.UtilisateurId;
    if (!userId) {
      await pool.request()
        .input('UtilisateurId', u.UtilisateurId)
        .input('Matricule', u.Matricule)
        .input('Email', u.Email)
        .input('MotDePasseHash', demoHash)
        .input('Nom', u.Nom)
        .input('Prenom', u.Prenom)
        .input('Role', u.Role)
        .input('PromotionId', u.PromotionId ?? null)
        .input('ClassementInitial', u.ClassementInitial ?? null)
        .input('Age', u.Age ?? null)
        .input('Ville', u.Ville ?? null)
        .input('Telephone', u.Telephone ?? null)
        .input('NoteFormationPro', u.NoteFormationPro ?? null)
        .input('AptitudePhysique', u.AptitudePhysique ?? null)
        .input('StatutMedical', u.StatutMedical || 'SIGYCOP_VALIDE')
        .input('TailleCm', u.TailleCm ?? null)
        .input('PoidsKg', u.PoidsKg ?? null)
        .input('VisionSIGYCOP_Y', u.VisionSIGYCOP_Y ?? null)
        .input('MoyennesMatieres', u.MoyennesMatieres ? JSON.stringify(u.MoyennesMatieres) : null)
        .input('CompetencesPratiques', u.CompetencesPratiques ? JSON.stringify(u.CompetencesPratiques) : null)
        .input('PreferencesSpecialites', u.PreferencesSpecialites ? JSON.stringify(u.PreferencesSpecialites) : null)
        .input('EstActif', u.EstActif !== false ? 1 : 0)
        .query(`
          SET IDENTITY_INSERT dbo.Utilisateurs ON;
          INSERT INTO dbo.Utilisateurs (
            UtilisateurId, Matricule, Email, MotDePasseHash, Nom, Prenom, Role,
            PromotionId, ClassementInitial, Age, Ville, Telephone,
            NoteFormationPro, AptitudePhysique, StatutMedical, TailleCm, PoidsKg, VisionSIGYCOP_Y,
            MoyennesMatieres, CompetencesPratiques, PreferencesSpecialites, EstActif
          )
          VALUES (
            @UtilisateurId, @Matricule, @Email, @MotDePasseHash, @Nom, @Prenom, @Role,
            @PromotionId, @ClassementInitial, @Age, @Ville, @Telephone,
            @NoteFormationPro, @AptitudePhysique, @StatutMedical, @TailleCm, @PoidsKg, @VisionSIGYCOP_Y,
            @MoyennesMatieres, @CompetencesPratiques, @PreferencesSpecialites, @EstActif
          );
          SET IDENTITY_INSERT dbo.Utilisateurs OFF;
        `);
      userId = u.UtilisateurId;
    }

    // Peupler PreferencesSpecialites normalisées uniquement si aucune préférence encore enregistrée
    if (Array.isArray(u.PreferencesSpecialites) && u.PreferencesSpecialites.length > 0) {
      const existingPrefs = await pool.request()
        .input('UtilisateurId', userId)
        .query(`SELECT COUNT(*) AS cnt FROM dbo.PreferencesSpecialites WHERE UtilisateurId = @UtilisateurId`);
      if (existingPrefs.recordset[0].cnt === 0) {
        for (const pref of u.PreferencesSpecialites) {
          await pool.request()
            .input('UtilisateurId', userId)
            .input('CodeSpecialite', pref.code)
            .input('Rang', pref.rang || 1)
            .input('Motivation', pref.motivation || '')
            .query(`
              IF NOT EXISTS (SELECT 1 FROM dbo.PreferencesSpecialites WHERE UtilisateurId = @UtilisateurId AND CodeSpecialite = @CodeSpecialite)
              INSERT INTO dbo.PreferencesSpecialites (UtilisateurId, CodeSpecialite, Rang, Motivation)
              VALUES (@UtilisateurId, @CodeSpecialite, @Rang, @Motivation);
            `);
        }
      }
    }
  }

  // 3. Domaines de compétences
  for (const d of initialDomaines) {
    await pool.request()
      .input('DomaineId', d.DomaineId)
      .input('Code', d.Code)
      .input('Intitule', d.Intitule)
      .input('Description', d.Description || '')
      .input('PoidsDefaut', d.PoidsDefaut ?? 1.0)
      .query(`
        IF NOT EXISTS (SELECT 1 FROM dbo.DomainesCompetences WHERE Code = @Code OR DomaineId = @DomaineId)
        BEGIN
          SET IDENTITY_INSERT dbo.DomainesCompetences ON;
          INSERT INTO dbo.DomainesCompetences (DomaineId, Code, Intitule, Description, PoidsDefaut)
          VALUES (@DomaineId, @Code, @Intitule, @Description, @PoidsDefaut);
          SET IDENTITY_INSERT dbo.DomainesCompetences OFF;
        END
      `);
  }

  // 4. Spécialités — d'abord les 7 spécialités officielles unifiées (EstLegacy = 0), puis les anciens codes (EstLegacy = 1)
  const officialSpecs = GENDARMERIE_SPECIALTIES.map((gs) => ({
    Code: gs.id, // SPEC-TERR, SPEC-MOB, SPEC-MARIT, SPEC-AIR, SPEC-PREV, SPEC-PST, SPEC-INTERV
    Intitule: `${gs.nomFr} (${gs.nomAr})`,
    Subdivision: gs.code,
    Description: gs.presentation || gs.devise,
    MissionsPrincipales: Array.isArray(gs.missions) ? gs.missions.join(' ; ') : '',
    Icone: gs.icone || 'Shield',
    PlacesDisponibles: 20,
    EstActive: 1,
    EstLegacy: 0,
    CompetencesAttendues: JSON.stringify(gs.objectifsPedagogiques || []),
    TestsAssocies: JSON.stringify(['TEST-01', 'TEST-02', 'TEST-03']),
    MatieresAcademiquesPertinentes: JSON.stringify([])
  }));

  for (const s of initialSpecialites) {
    await pool.request()
      .input('SpecialiteId', s.SpecialiteId)
      .input('Code', s.Code)
      .input('Intitule', s.Intitule)
      .input('Subdivision', s.Subdivision)
      .input('Description', s.Description)
      .input('MissionsPrincipales', s.MissionsPrincipales)
      .input('Icone', s.Icone || 'Shield')
      .input('PlacesDisponibles', s.PlacesDisponibles ?? 10)
      .input('EstActive', s.EstActive !== false ? 1 : 0)
      .input('EstLegacy', 1)
      .input('CompetencesAttendues', JSON.stringify(s.CompetencesAttendues || []))
      .input('TestsAssocies', JSON.stringify(s.TestsAssocies || []))
      .input('MatieresAcademiquesPertinentes', JSON.stringify(s.MatieresAcademiquesPertinentes || []))
      .input('PoidsNotesAcademiques', s.PoidsNotesAcademiques ?? 0.25)
      .input('PoidsRaisonnement', s.PoidsRaisonnement ?? 0.30)
      .input('PoidsCompetencesSpecifiques', s.PoidsCompetencesSpecifiques ?? 0.25)
      .input('PoidsSituationsPro', s.PoidsSituationsPro ?? 0.20)
      .query(`
        IF NOT EXISTS (SELECT 1 FROM dbo.Specialites WHERE Code = @Code OR SpecialiteId = @SpecialiteId)
        BEGIN
          SET IDENTITY_INSERT dbo.Specialites ON;
          INSERT INTO dbo.Specialites (
            SpecialiteId, Code, Intitule, Subdivision, Description, MissionsPrincipales, Icone,
            PlacesDisponibles, EstActive, EstLegacy, CompetencesAttendues, TestsAssocies, MatieresAcademiquesPertinentes,
            PoidsNotesAcademiques, PoidsRaisonnement, PoidsCompetencesSpecifiques, PoidsSituationsPro
          )
          VALUES (
            @SpecialiteId, @Code, @Intitule, @Subdivision, @Description, @MissionsPrincipales, @Icone,
            @PlacesDisponibles, @EstActive, @EstLegacy, @CompetencesAttendues, @TestsAssocies, @MatieresAcademiquesPertinentes,
            @PoidsNotesAcademiques, @PoidsRaisonnement, @PoidsCompetencesSpecifiques, @PoidsSituationsPro
          );
          SET IDENTITY_INSERT dbo.Specialites OFF;
        END
      `);
  }

  for (const gs of officialSpecs) {
    await pool.request()
      .input('Code', gs.Code)
      .input('Intitule', gs.Intitule)
      .input('Subdivision', gs.Subdivision)
      .input('Description', gs.Description)
      .input('MissionsPrincipales', gs.MissionsPrincipales)
      .input('Icone', gs.Icone)
      .input('PlacesDisponibles', gs.PlacesDisponibles)
      .input('EstActive', gs.EstActive)
      .input('EstLegacy', gs.EstLegacy)
      .input('CompetencesAttendues', gs.CompetencesAttendues)
      .input('TestsAssocies', gs.TestsAssocies)
      .input('MatieresAcademiquesPertinentes', gs.MatieresAcademiquesPertinentes)
      .query(`
        IF NOT EXISTS (SELECT 1 FROM dbo.Specialites WHERE Code = @Code)
        INSERT INTO dbo.Specialites (
          Code, Intitule, Subdivision, Description, MissionsPrincipales, Icone,
          PlacesDisponibles, EstActive, EstLegacy, CompetencesAttendues, TestsAssocies, MatieresAcademiquesPertinentes
        )
        VALUES (
          @Code, @Intitule, @Subdivision, @Description, @MissionsPrincipales, @Icone,
          @PlacesDisponibles, @EstActive, @EstLegacy, @CompetencesAttendues, @TestsAssocies, @MatieresAcademiquesPertinentes
        );
      `);
  }

  // 5. Conditions d'éligibilité
  for (const c of initialConditions) {
    const specExists = await pool.request()
      .input('SpecialiteId', c.SpecialiteId)
      .query(`SELECT TOP 1 SpecialiteId FROM dbo.Specialites WHERE SpecialiteId = @SpecialiteId`);
    if (specExists.recordset.length === 0) continue;

    await pool.request()
      .input('ConditionId', c.ConditionId)
      .input('SpecialiteId', c.SpecialiteId)
      .input('TypeCondition', c.TypeCondition)
      .input('CibleCondition', c.CibleCondition)
      .input('Operateur', c.Operateur)
      .input('Seuil', String(c.Seuil))
      .input('EstObligatoire', c.EstObligatoire ? 1 : 0)
      .input('SourceOfficielle', c.SourceOfficielle || '')
      .input('DateValidation', c.DateValidation || null)
      .input('StatutValidation', c.StatutValidation || 'VALIDEE_OFFICIELLE')
      .input('Description', c.Description || '')
      .query(`
        IF NOT EXISTS (
          SELECT 1 FROM dbo.ConditionsEligibilite
          WHERE ConditionId = @ConditionId OR (SpecialiteId = @SpecialiteId AND TypeCondition = @TypeCondition AND CibleCondition = @CibleCondition)
        )
        BEGIN
          SET IDENTITY_INSERT dbo.ConditionsEligibilite ON;
          INSERT INTO dbo.ConditionsEligibilite (
            ConditionId, SpecialiteId, TypeCondition, CibleCondition, Operateur, Seuil,
            EstObligatoire, SourceOfficielle, DateValidation, StatutValidation, Description
          )
          VALUES (
            @ConditionId, @SpecialiteId, @TypeCondition, @CibleCondition, @Operateur, @Seuil,
            @EstObligatoire, @SourceOfficielle, @DateValidation, @StatutValidation, @Description
          );
          SET IDENTITY_INSERT dbo.ConditionsEligibilite OFF;
        END
      `);
  }

  // 6. Paramètres Système (ne jamais écraser si déjà définis)
  const initialSettingsMap = {
    institutionNom: 'Gendarmerie Royale Marocaine - Direction Générale (DGGN)',
    commissionOrientationActif: 'true',
    dureeDefautTestMinutes: '35',
    seuilReussiteGeneral: '60',
    autoriserRepriseTest: 'true',
    autoriserConsultationResultatsEleve: 'true',
    orientationResultsVisibility: process.env.ORIENTATION_RESULTS_VISIBILITY || 'student_and_admin',
    modeMaintenance: 'false',
    anneePromotionEnCours: '2026',
    scoringCriteriaConfig: JSON.stringify(defaultScoringCriteriaConfig)
  };
  for (const [k, v] of Object.entries(initialSettingsMap)) {
    await pool.request()
      .input('SettingKey', k)
      .input('SettingValue', String(v))
      .query(`
        IF NOT EXISTS (SELECT 1 FROM dbo.SystemSettings WHERE SettingKey = @SettingKey)
        INSERT INTO dbo.SystemSettings (SettingKey, SettingValue) VALUES (@SettingKey, @SettingValue);
      `);
  }

  // 7. Compétences canoniques (12) & Matrice
  for (const comp of canonicalCompetencyFramework) {
    await pool.request()
      .input('CompetencyCode', comp.code)
      .input('Numero', comp.numero)
      .input('NomFr', comp.nomFr)
      .input('NomAr', comp.nomAr)
      .input('DomaineCode', comp.domaineId || null)
      .input('DescriptionAr', comp.descriptionAr || '')
      .input('CriteresJson', JSON.stringify(comp.criteresEvaluation || []))
      .input('PoidsDefaut', comp.poidsDefaut ?? 1.0)
      .input('LegacyTagsJson', JSON.stringify(comp.legacyTags || []))
      .query(`
        IF NOT EXISTS (SELECT 1 FROM dbo.Competencies WHERE CompetencyCode = @CompetencyCode)
        INSERT INTO dbo.Competencies (CompetencyCode, Numero, NomFr, NomAr, DomaineCode, DescriptionAr, CriteresJson, PoidsDefaut, LegacyTagsJson)
        VALUES (@CompetencyCode, @Numero, @NomFr, @NomAr, @DomaineCode, @DescriptionAr, @CriteresJson, @PoidsDefaut, @LegacyTagsJson);
      `);
  }

  for (const m of initialSpecialtyCompetencyMatrix) {
    const specCode = m.specialiteCode || m.SpecialiteCode;
    const weightsMap = m.poidsCompetences || {};
    for (const [compCode, poids] of Object.entries(weightsMap)) {
      if (!specCode || !compCode) continue;
      await pool.request()
        .input('SpecialiteCode', specCode)
        .input('CompetencyCode', compCode)
        .input('Poids', poids ?? 1.0)
        .input('Justification', m.justificationAr || m.justification || '')
        .query(`
          IF NOT EXISTS (SELECT 1 FROM dbo.SpecialtyCompetencyMatrix WHERE SpecialiteCode = @SpecialiteCode AND CompetencyCode = @CompetencyCode)
          INSERT INTO dbo.SpecialtyCompetencyMatrix (SpecialiteCode, CompetencyCode, Poids, Justification)
          VALUES (@SpecialiteCode, @CompetencyCode, @Poids, @Justification);
        `);
    }
  }

  // 8. Tests QCM & Banques de Questions
  const allTestsToSeed = [initialTests[0], ...simpleThreeTests];
  for (const t of allTestsToSeed) {
    await pool.request()
      .input('TestId', t.TestId)
      .input('Code', t.Code)
      .input('Titre', t.Titre)
      .input('TitreFr', t.TitreFr || t.Titre)
      .input('Description', t.Description || '')
      .input('DureeMinutes', t.DureeMinutes ?? 15)
      .input('NombreQuestions', t.NombreQuestions ?? 10)
      .input('CategoriesIncluses', JSON.stringify(t.CategoriesIncluses || []))
      .input('DifficulteCible', t.DifficulteCible || 'MOYEN')
      .input('AutoriserRetour', t.AutoriserRetour !== false ? 1 : 0)
      .input('AutoriserPause', t.AutoriserPause !== false ? 1 : 0)
      .input('AutoriserReprise', t.AutoriserReprise !== false ? 1 : 0)
      .input('NombreTentativesMax', t.NombreTentativesMax ?? 3)
      .input('SeuilReussite', t.SeuilReussite ?? 60.0)
      .input('SelectionAleatoire', t.SelectionAleatoire ? 1 : 0)
      .input('SeedReproductible', t.SeedReproductible !== false ? 1 : 0)
      .input('CompetencesAssociees', JSON.stringify(t.CompetencesAssociees || []))
      .input('EstActif', t.EstActif !== false ? 1 : 0)
      .query(`
        IF NOT EXISTS (SELECT 1 FROM dbo.Tests WHERE Code = @Code OR TestId = @TestId)
        BEGIN
          SET IDENTITY_INSERT dbo.Tests ON;
          INSERT INTO dbo.Tests (
            TestId, Code, Titre, TitreFr, Description, DureeMinutes, NombreQuestions,
            CategoriesIncluses, DifficulteCible, AutoriserRetour, AutoriserPause, AutoriserReprise,
            NombreTentativesMax, SeuilReussite, SelectionAleatoire, SeedReproductible, CompetencesAssociees, EstActif
          )
          VALUES (
            @TestId, @Code, @Titre, @TitreFr, @Description, @DureeMinutes, @NombreQuestions,
            @CategoriesIncluses, @DifficulteCible, @AutoriserRetour, @AutoriserPause, @AutoriserReprise,
            @NombreTentativesMax, @SeuilReussite, @SelectionAleatoire, @SeedReproductible, @CompetencesAssociees, @EstActif
          );
          SET IDENTITY_INSERT dbo.Tests OFF;
        END
      `);
  }

  // Questions (30 simples + 140 arabes)
  const domRes = await pool.request().query(`SELECT DomaineId, Code FROM dbo.DomainesCompetences`);
  const domMap = new Map(domRes.recordset.map(r => [r.Code, r.DomaineId]));
  const domMapById = new Set(domRes.recordset.map(r => r.DomaineId));
  const allQuestions = [...simpleQuestionsBank30, ...arabicQuestionBank140];

  for (const q of allQuestions) {
    const qCode = q.Code || `Q-${q.QuestionId}`;
    const existsQ = await pool.request()
      .input('QuestionId', q.QuestionId)
      .input('Code', qCode)
      .query(`SELECT TOP 1 QuestionId FROM dbo.Questions WHERE QuestionId = @QuestionId OR Code = @Code`);
    if (existsQ.recordset.length > 0) continue;

    const catCode = q.CategorieCode || q.DomaineCode || null;
    const domId = (q.DomaineId && domMapById.has(q.DomaineId)) ? q.DomaineId : (domMap.get(catCode) || null);
    await pool.request()
      .input('QuestionId', q.QuestionId)
      .input('TestId', q.TestId)
      .input('DomaineId', domId)
      .input('CategorieCode', catCode)
      .input('Code', qCode)
      .input('Enonce', q.Enonce)
      .input('ContexteSituationnel', q.ContexteSituationnel || null)
      .input('TypeQuestion', q.TypeQuestion || 'QCM_UNIQUE')
      .input('Difficulte', q.Difficulte || 'MOYEN')
      .input('Points', q.Points ?? 1)
      .input('SchemaSVG', q.SchemaSVG || null)
      .input('Explication', q.Explication || null)
      .input('CompetencesAssociees', JSON.stringify(q.CompetencesAssociees || []))
      .input('SpecialitesAssociees', JSON.stringify(q.SpecialitesAssociees || []))
      .input('OrdreAffichage', q.OrdreAffichage ?? 1)
      .input('EstActive', q.EstActive !== false ? 1 : 0)
      .query(`
        SET IDENTITY_INSERT dbo.Questions ON;
        INSERT INTO dbo.Questions (
          QuestionId, TestId, DomaineId, CategorieCode, Code, Enonce, ContexteSituationnel,
          TypeQuestion, Difficulte, Points, SchemaSVG, Explication,
          CompetencesAssociees, SpecialitesAssociees, OrdreAffichage, EstActive
        )
        VALUES (
          @QuestionId, @TestId, @DomaineId, @CategorieCode, @Code, @Enonce, @ContexteSituationnel,
          @TypeQuestion, @Difficulte, @Points, @SchemaSVG, @Explication,
          @CompetencesAssociees, @SpecialitesAssociees, @OrdreAffichage, @EstActive
        );
        SET IDENTITY_INSERT dbo.Questions OFF;
      `);

    if (Array.isArray(q.Options)) {
      for (const opt of q.Options) {
        await pool.request()
          .input('QuestionId', q.QuestionId)
          .input('LettreOption', opt.LettreOption || opt.lettre || 'A')
          .input('EnonceOption', opt.EnonceOption || opt.enonce || '')
          .input('EstCorrecte', opt.EstCorrecte ? 1 : 0)
          .query(`
            INSERT INTO dbo.OptionsReponse (QuestionId, LettreOption, EnonceOption, EstCorrecte)
            VALUES (@QuestionId, @LettreOption, @EnonceOption, @EstCorrecte);
          `);
      }
    }
  }

  // 9. Catégories d'Ateliers, Ateliers & Assignations initiales
  for (const cat of workshopCategories) {
    await pool.request()
      .input('CategoryId', cat.id)
      .input('Code', cat.code)
      .input('IntituleFr', cat.intituleFr)
      .input('IntituleAr', cat.intituleAr || '')
      .input('Icone', cat.icone || 'Wrench')
      .input('Couleur', cat.couleur || 'blue')
      .input('DescriptionFr', cat.descriptionFr || '')
      .input('DescriptionAr', cat.descriptionAr || '')
      .input('SousDomainesJson', JSON.stringify(cat.sousDomaines || []))
      .input('SpecialitesCiblesJson', JSON.stringify(cat.specialitesCibles || []))
      .query(`
        IF NOT EXISTS (SELECT 1 FROM dbo.WorkshopCategories WHERE CategoryId = @CategoryId OR Code = @Code)
        INSERT INTO dbo.WorkshopCategories (CategoryId, Code, IntituleFr, IntituleAr, Icone, Couleur, DescriptionFr, DescriptionAr, SousDomainesJson, SpecialitesCiblesJson)
        VALUES (@CategoryId, @Code, @IntituleFr, @IntituleAr, @Icone, @Couleur, @DescriptionFr, @DescriptionAr, @SousDomainesJson, @SpecialitesCiblesJson);
      `);
  }

  for (const w of initialWorkshops) {
    await pool.request()
      .input('WorkshopId', w.AtelierId)
      .input('CategoryId', w.CategorieId)
      .input('Code', w.Code)
      .input('Titre', w.Titre)
      .input('TitreAr', w.TitreAr || '')
      .input('SousDomaine', w.SousDomaine || '')
      .input('Description', w.DescriptionFr || w.Description || '')
      .input('ObjectifsJson', JSON.stringify(w.Objectifs || []))
      .input('StepsJson', JSON.stringify(w))
      .input('CriteriaJson', JSON.stringify(w.CriteresEvaluation || []))
      .input('DureeMinutes', w.DureeMinutes ?? 60)
      .input('Niveau', w.NiveauDifficulte || w.Niveau || 'INTERMEDIAIRE')
      .input('NoteMax', w.ScoreTotalMax ?? w.ScoreMax ?? 20)
      .input('EstActif', w.Statut === 'ARCHIVE' ? 0 : 1)
      .query(`
        IF NOT EXISTS (SELECT 1 FROM dbo.Workshops WHERE WorkshopId = @WorkshopId OR Code = @Code)
          INSERT INTO dbo.Workshops (WorkshopId, CategoryId, Code, Titre, TitreAr, SousDomaine, Description, ObjectifsJson, StepsJson, CriteriaJson, DureeMinutes, Niveau, NoteMax, EstActif)
          VALUES (@WorkshopId, @CategoryId, @Code, @Titre, @TitreAr, @SousDomaine, @Description, @ObjectifsJson, @StepsJson, @CriteriaJson, @DureeMinutes, @Niveau, @NoteMax, @EstActif);
        ELSE IF EXISTS (SELECT 1 FROM dbo.Workshops WHERE WorkshopId = @WorkshopId AND StepsJson = '[]')
          UPDATE dbo.Workshops
          SET Description = @Description, StepsJson = @StepsJson, Niveau = @Niveau, NoteMax = @NoteMax
          WHERE WorkshopId = @WorkshopId AND StepsJson = '[]';
      `);
  }

  // SessionsTest initiales (si table vide)
  const existingSessCount = await pool.request().query(`SELECT COUNT(*) AS cnt FROM dbo.SessionsTest`);
  if (existingSessCount.recordset[0].cnt === 0) {
    for (const s of initialSessions) {
      const {
        SessionId, UtilisateurId, TestId, TentativeNumero, SeedGeneration, QuestionsSnapshot,
        DateDebut, DateFinMaxServeur, DateFin, DureeEcouleeSecondes, Statut,
        ScoreBrut, ScoreTotal, ScorePourcentage, IndiceConfiance, ProfilIncomplet,
        DonneesManquantes, Progression, ...extras
      } = s;
      await pool.request()
        .input('SessionId', SessionId)
        .input('UtilisateurId', UtilisateurId)
        .input('TestId', TestId)
        .input('TentativeNumero', TentativeNumero ?? 1)
        .input('SeedGeneration', SeedGeneration ?? null)
        .input('QuestionsSnapshot', JSON.stringify(QuestionsSnapshot || []))
        .input('ConfigSnapshot', JSON.stringify(extras))
        .input('DateDebut', DateDebut ? new Date(DateDebut) : new Date())
        .input('DateFinMaxServeur', DateFinMaxServeur ? new Date(DateFinMaxServeur) : null)
        .input('DateFin', DateFin ? new Date(DateFin) : null)
        .input('DureeEcouleeSecondes', DureeEcouleeSecondes ?? 0)
        .input('Statut', Statut || 'TERMINE')
        .input('ScoreBrut', ScoreBrut ?? null)
        .input('ScoreTotal', ScoreTotal ?? null)
        .input('ScorePourcentage', ScorePourcentage ?? null)
        .input('IndiceConfiance', IndiceConfiance ?? null)
        .input('ProfilIncomplet', ProfilIncomplet ? 1 : 0)
        .input('DonneesManquantes', JSON.stringify(DonneesManquantes || []))
        .input('Progression', Progression ?? 0)
        .query(`
          SET IDENTITY_INSERT dbo.SessionsTest ON;
          INSERT INTO dbo.SessionsTest (
            SessionId, UtilisateurId, TestId, TentativeNumero, SeedGeneration, QuestionsSnapshot, ConfigSnapshot,
            DateDebut, DateFinMaxServeur, DateFin, DureeEcouleeSecondes, Statut, ScoreBrut, ScoreTotal,
            ScorePourcentage, IndiceConfiance, ProfilIncomplet, DonneesManquantes, Progression
          )
          VALUES (
            @SessionId, @UtilisateurId, @TestId, @TentativeNumero, @SeedGeneration, @QuestionsSnapshot, @ConfigSnapshot,
            @DateDebut, @DateFinMaxServeur, @DateFin, @DureeEcouleeSecondes, @Statut, @ScoreBrut, @ScoreTotal,
            @ScorePourcentage, @IndiceConfiance, @ProfilIncomplet, @DonneesManquantes, @Progression
          );
          SET IDENTITY_INSERT dbo.SessionsTest OFF;
        `);
    }
  }

  const existingAssignCount = await pool.request().query(`SELECT COUNT(*) AS cnt FROM dbo.WorkshopAssignments`);
  if (existingAssignCount.recordset[0].cnt === 0) {
    for (const a of initialWorkshopAssignments) {
      await pool.request()
        .input('AssignationId', a.AssignationId)
        .input('WorkshopId', a.AtelierId)
        .input('UtilisateurId', a.UtilisateurId)
        .input('InstructeurId', a.SuperviseurId || 6)
        .input('Statut', a.Statut || 'ASSIGNE')
        .input('SoumissionJson', JSON.stringify(a))
        .input('NoteSur20', a.ScoreObtenu ?? null)
        .input('ScoresCriteresJson', JSON.stringify(a.ScoresCriteres || {}))
        .input('CommentaireInstructeur', a.CommentaireInstructeur || null)
        .input('DateAssignation', a.DateAssignation ? new Date(a.DateAssignation) : new Date())
        .query(`
          IF NOT EXISTS (SELECT 1 FROM dbo.WorkshopAssignments WHERE AssignationId = @AssignationId)
          BEGIN
            SET IDENTITY_INSERT dbo.WorkshopAssignments ON;
            INSERT INTO dbo.WorkshopAssignments (AssignationId, WorkshopId, UtilisateurId, InstructeurId, Statut, SoumissionJson, NoteSur20, ScoresCriteresJson, CommentaireInstructeur, DateAssignation)
            VALUES (@AssignationId, @WorkshopId, @UtilisateurId, @InstructeurId, @Statut, @SoumissionJson, @NoteSur20, @ScoresCriteresJson, @CommentaireInstructeur, @DateAssignation);
            SET IDENTITY_INSERT dbo.WorkshopAssignments OFF;
          END
        `);
    }
  }

  // 10. Logs initiaux (seulement si la table est vide)
  const logsCount = await pool.request().query(`SELECT COUNT(*) AS cnt FROM dbo.LogsActivite`);
  if (logsCount.recordset[0].cnt === 0) {
    for (const l of initialLogs) {
      await pool.request()
        .input('UtilisateurId', l.UtilisateurId ?? null)
        .input('Action', l.Action)
        .input('Cible', l.Cible)
        .input('Details', l.Details || '')
        .input('AdresseIP', l.AdresseIP || '127.0.0.1')
        .query(`
          INSERT INTO dbo.LogsActivite (UtilisateurId, Action, Cible, Details, AdresseIP)
          VALUES (@UtilisateurId, @Action, @Cible, @Details, @AdresseIP);
        `);
    }
  }

  // Vérification finale des comptages
  const summary = await pool.request().query(`
    SELECT 'Promotions' AS Tbl, COUNT(*) AS Cnt FROM dbo.Promotions UNION ALL
    SELECT 'Utilisateurs', COUNT(*) FROM dbo.Utilisateurs UNION ALL
    SELECT 'Specialites', COUNT(*) FROM dbo.Specialites UNION ALL
    SELECT 'DomainesCompetences', COUNT(*) FROM dbo.DomainesCompetences UNION ALL
    SELECT 'ConditionsEligibilite', COUNT(*) FROM dbo.ConditionsEligibilite UNION ALL
    SELECT 'PreferencesSpecialites', COUNT(*) FROM dbo.PreferencesSpecialites UNION ALL
    SELECT 'SystemSettings', COUNT(*) FROM dbo.SystemSettings UNION ALL
    SELECT 'Competencies', COUNT(*) FROM dbo.Competencies UNION ALL
    SELECT 'SpecialtyCompetencyMatrix', COUNT(*) FROM dbo.SpecialtyCompetencyMatrix UNION ALL
    SELECT 'Tests', COUNT(*) FROM dbo.Tests UNION ALL
    SELECT 'Questions', COUNT(*) FROM dbo.Questions UNION ALL
    SELECT 'OptionsReponse', COUNT(*) FROM dbo.OptionsReponse UNION ALL
    SELECT 'WorkshopCategories', COUNT(*) FROM dbo.WorkshopCategories UNION ALL
    SELECT 'Workshops', COUNT(*) FROM dbo.Workshops UNION ALL
    SELECT 'WorkshopAssignments', COUNT(*) FROM dbo.WorkshopAssignments UNION ALL
    SELECT 'LogsActivite', COUNT(*) FROM dbo.LogsActivite
  `);
  console.log('\n=== COMPTAGES FINAUX SQL SERVER (OrientGR_DB) ===');
  for (const r of summary.recordset) {
    console.log(`  - ${r.Tbl.padEnd(28)}: ${r.Cnt}`);
  }
  await pool.close();
}

seed().catch((err) => {
  console.error('❌ Erreur Seed SQL Server :', err);
  process.exit(1);
});
