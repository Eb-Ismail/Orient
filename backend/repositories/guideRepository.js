import { getDbPool } from '../lib/db.js';
import sql from 'mssql';

export const guideRepository = {
  /**
   * Récupère tous les domaines techniques et professionnels
   */
  async getAllDomaines() {
    const pool = await getDbPool();
    const result = await pool.request().query(`
      SELECT 
        DomaineId, Code, Titre, TitreAr, Categorie, DescriptionCourte,
        Presentation, Missions, CompetencesTechniques, QualitesPersonnelles,
        TechnologiesEquipements, ExemplesApplications, ModulesPedagogiques,
        MotsClesCompatibilite, Icone, Couleur, BadgeClass, ImageUrl,
        PoidsPriorite, Actif, DateCreation, DateModification
      FROM dbo.GuideDomaines
      WHERE Actif = 1
      ORDER BY PoidsPriorite ASC, Titre ASC
    `);

    return result.recordset.map(row => ({
      ...row,
      Missions: safeParseJson(row.Missions, []),
      CompetencesTechniques: safeParseJson(row.CompetencesTechniques, []),
      QualitesPersonnelles: safeParseJson(row.QualitesPersonnelles, []),
      TechnologiesEquipements: safeParseJson(row.TechnologiesEquipements, []),
      ExemplesApplications: safeParseJson(row.ExemplesApplications, []),
      ModulesPedagogiques: safeParseJson(row.ModulesPedagogiques, []),
      MotsClesCompatibilite: safeParseJson(row.MotsClesCompatibilite, [])
    }));
  },

  /**
   * Récupère un domaine spécifique par son code
   */
  async getDomaineByCode(code) {
    const pool = await getDbPool();
    const req = pool.request();
    req.input('Code', sql.NVarChar(50), code);
    const result = await req.query(`
      SELECT *
      FROM dbo.GuideDomaines
      WHERE Code = @Code AND Actif = 1
    `);

    if (!result.recordset.length) return null;
    const row = result.recordset[0];
    return {
      ...row,
      Missions: safeParseJson(row.Missions, []),
      CompetencesTechniques: safeParseJson(row.CompetencesTechniques, []),
      QualitesPersonnelles: safeParseJson(row.QualitesPersonnelles, []),
      TechnologiesEquipements: safeParseJson(row.TechnologiesEquipements, []),
      ExemplesApplications: safeParseJson(row.ExemplesApplications, []),
      ModulesPedagogiques: safeParseJson(row.ModulesPedagogiques, []),
      MotsClesCompatibilite: safeParseJson(row.MotsClesCompatibilite, [])
    };
  },

  /**
   * Récupère les données de parcours et compétences d'un élève pour le calcul de compatibilité
   */
  async getStudentProfileForGuide(utilisateurId) {
    const pool = await getDbPool();
    const req = pool.request();
    req.input('UtilisateurId', sql.Int, utilisateurId);

    const [userRes, journeyRes, talentRes] = await Promise.all([
      req.query(`SELECT UtilisateurId, Nom, Prenom, Matricule, Email FROM dbo.Utilisateurs WHERE UtilisateurId = @UtilisateurId`),
      pool.request().input('UtilisateurId', sql.Int, utilisateurId).query(`SELECT TOP 1 * FROM dbo.StudentJourneys WHERE UtilisateurId = @UtilisateurId ORDER BY JourneyId DESC`),
      pool.request().input('UtilisateurId', sql.Int, utilisateurId).query(`SELECT TOP 1 * FROM dbo.StudentTalentProfiles WHERE UtilisateurId = @UtilisateurId`)
    ]);

    const user = userRes.recordset[0] || null;
    const journey = journeyRes.recordset[0] || null;
    const talent = talentRes.recordset[0] || null;

    return {
      user,
      journey: journey ? {
        recitPersonnel: journey.RecitPersonnel || '',
        experiences: safeParseJson(journey.ExperiencesJson, []),
        competencesDetectees: safeParseJson(journey.CompetencesDetecteesJson, []),
        analyseProfil: safeParseJson(journey.AnalyseProfilJson, {})
      } : null,
      talent: talent ? {
        declare: safeParseJson(talent.DeclareJson, {}),
        observe: safeParseJson(talent.ObserveJson, {}),
        valide: safeParseJson(talent.ValideJson, {})
      } : null
    };
  }
};

function safeParseJson(val, fallback) {
  if (!val) return fallback;
  if (typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

