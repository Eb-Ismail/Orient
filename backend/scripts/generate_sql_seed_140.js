// ==============================================================================
// Script de génération du script SEED SQL Server pour les 140 questions en arabe
// ==============================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.resolve(__dirname, '../data/questions_140_arabe.json');
const questions = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "N'" + String(str).replace(/'/g, "''") + "'";
}

let sql = `-- ==============================================================================
-- ORIENT-GR : SEED OFFICIEL DE LA BANQUE DES 140 QUESTIONS EN ARABE
-- Compatible SQL Server 2016+ / Azure SQL Database
-- ==============================================================================

USE [OrientGR_DB];
GO

SET NOCOUNT ON;
BEGIN TRANSACTION;

BEGIN TRY
    -- 1. S'assurer qu'au moins un Test parent existe pour rattacher la banque
    IF NOT EXISTS (SELECT 1 FROM dbo.Tests WHERE Code = 'TEST-BATTERIE-140')
    BEGIN
        INSERT INTO dbo.Tests (
            Code, Titre, Description, DureeMinutes, NombreQuestions,
            CategoriesIncluses, DifficulteCible, AutoriserRetour, AutoriserPause,
            AutoriserReprise, NombreTentativesMax, SeuilReussite, SelectionAleatoire,
            SeedReproductible, Version, EstActif
        )
        VALUES (
            'TEST-BATTERIE-140',
            N'اختبار التوجيه المهني الموحد للدرك الملكي (140 سؤال)',
            N'بنك الأسئلة الموحد والشامل لكافة تخصصات الدرك الملكي (140 سؤالاً في 10 مجالات رئيسية)',
            45, 140,
            '["LOGIQUE", "OBSERVATION", "ATTENTION", "DECISION", "ROUTE_MOTO", "PJ_ENQUETE", "INFORMATIQUE", "COMMUNICATION", "SECRETARIAT", "DISCIPLINE"]',
            'TOUS', 1, 1, 1, 3, 60.0, 1, 1, 1, 1
        );
        PRINT '[OK] Test TEST-BATTERIE-140 inséré avec succès.';
    END

    DECLARE @TestId INT = (SELECT TOP 1 TestId FROM dbo.Tests WHERE Code = 'TEST-BATTERIE-140');
    IF @TestId IS NULL SET @TestId = 1;

    PRINT 'Test ID de rattachement: ' + CAST(@TestId AS VARCHAR(10));

    -- 2. Désactiver temporairement les contraintes pour un chargement propre
    -- Suppression préalable des 140 questions cibles si déjà présentes pour ré-exécution idempotente
    DELETE FROM dbo.OptionsReponse WHERE QuestionId IN (SELECT QuestionId FROM dbo.Questions WHERE Code LIKE 'Q-%' AND QuestionId BETWEEN 1 AND 140);
    DELETE FROM dbo.Questions WHERE QuestionId BETWEEN 1 AND 140;

    -- Activation de l'insertion explicite d'identifiants
    SET IDENTITY_INSERT dbo.Questions ON;
`;

for (const q of questions) {
  const competencesJson = JSON.stringify(q.competences);
  const specialitesAssociesJson = JSON.stringify(q.specialites_ponderation.map(s => s.code));
  const specialitesPonderationJson = JSON.stringify(q.specialites_ponderation);

  sql += `
    -- Question ${q.id}: ${q.code} (${q.categorie})
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        ${q.id},
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = '${q.categorie_code}'),
        ${escapeSql(q.code)},
        ${escapeSql(q.texte)},
        ${escapeSql(q.categorie)},
        'QCM_UNIQUE',
        ${escapeSql(q.difficulte_code)},
        ${escapeSql(q.difficulte)},
        ${q.coefficient >= 1.5 ? 2 : 1},
        ${q.coefficient},
        90,
        ${escapeSql(q.explication)},
        ${escapeSql(competencesJson)},
        ${escapeSql(specialitesAssociesJson)},
        ${escapeSql(specialitesPonderationJson)},
        ${q.id},
        1, 0, 1
    );
`;
}

sql += `
    SET IDENTITY_INSERT dbo.Questions OFF;
    PRINT '[OK] 140 Questions insérées dans dbo.Questions.';

    -- Insertion des Options de réponse
    SET IDENTITY_INSERT dbo.OptionsReponse ON;
`;

for (const q of questions) {
  for (const opt of q.options) {
    sql += `
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        ${opt.id},
        ${q.id},
        ${escapeSql(opt.lettre)},
        ${escapeSql(opt.lettre_ar)},
        ${escapeSql(opt.texte)},
        ${opt.estCorrecte ? 1 : 0},
        ${opt.estCorrecte ? 1.0 : 0.0}
    );`;
  }
}

sql += `
    SET IDENTITY_INSERT dbo.OptionsReponse OFF;
    PRINT '[OK] 560 Options de réponses insérées dans dbo.OptionsReponse (4 par question).';

    COMMIT TRANSACTION;
    PRINT '======================================================';
    PRINT '[SUCCÈS] SEED COMPLET DES 140 QUESTIONS EXÉCUTÉ !';
    PRINT '======================================================';
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
    DECLARE @ErrMsg NVARCHAR(4000) = ERROR_MESSAGE();
    DECLARE @ErrSeverity INT = ERROR_SEVERITY();
    DECLARE @ErrState INT = ERROR_STATE();
    PRINT '[ERREUR CRITIQUE] Annulation du seed : ' + @ErrMsg;
    RAISERROR(@ErrMsg, @ErrSeverity, @ErrState);
END CATCH
GO
`;

const outputPath = path.resolve(__dirname, '../sql/seed_questions_140_arabe.sql');
fs.writeFileSync(outputPath, sql, 'utf-8');
console.log(`[OK] Script T-SQL généré avec succès : ${outputPath}`);
console.log(`Taille du fichier : ${Math.round(sql.length / 1024)} Ko`);
