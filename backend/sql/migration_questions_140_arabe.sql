-- ==============================================================================
-- ORIENT-GR : MIGRATION DES TABLES POUR LE BANQUE DE 140 QUESTIONS EN ARABE
-- Cette migration adapte les tables sans supprimer ni altérer les données existantes.
-- ==============================================================================

USE [OrientGR_DB];
GO

-- 1. Ajout des colonnes multilingues et de pondération dans dbo.Questions si absentes
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID(N'dbo.Questions') AND name = 'DifficulteArabe')
BEGIN
    ALTER TABLE dbo.Questions ADD DifficulteArabe NVARCHAR(50) NULL;
    PRINT '[OK] Colonne DifficulteArabe ajoutée à dbo.Questions.';
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID(N'dbo.Questions') AND name = 'SpecialitesPonderation')
BEGIN
    ALTER TABLE dbo.Questions ADD SpecialitesPonderation NVARCHAR(MAX) NULL;
    PRINT '[OK] Colonne SpecialitesPonderation ajoutée à dbo.Questions.';
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID(N'dbo.Questions') AND name = 'Coefficient')
BEGIN
    ALTER TABLE dbo.Questions ADD Coefficient FLOAT NOT NULL CONSTRAINT DF_Questions_Coefficient DEFAULT 1.0;
    PRINT '[OK] Colonne Coefficient ajoutée à dbo.Questions.';
END
GO

-- 2. Ajout de la lettre arabe dans dbo.OptionsReponse si absente
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID(N'dbo.OptionsReponse') AND name = 'LettreOptionArabe')
BEGIN
    ALTER TABLE dbo.OptionsReponse ADD LettreOptionArabe NVARCHAR(10) NULL;
    PRINT '[OK] Colonne LettreOptionArabe ajoutée à dbo.OptionsReponse.';
END
GO

-- 3. Ajout de l'intitulé arabe dans dbo.DomainesCompetences si absent
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID(N'dbo.DomainesCompetences') AND name = 'IntituleArabe')
BEGIN
    ALTER TABLE dbo.DomainesCompetences ADD IntituleArabe NVARCHAR(150) NULL;
    PRINT '[OK] Colonne IntituleArabe ajoutée à dbo.DomainesCompetences.';
END
GO

-- 4. Assouplissement des contraintes de difficulté pour accepter 'DIFFICILE' en plus de 'AVANCE' / 'EXPERT'
IF EXISTS (SELECT 1 FROM sys.check_constraints WHERE name = 'CK__Questions__Diffi__5AEE82B9' OR parent_object_id = OBJECT_ID(N'dbo.Questions') AND definition LIKE '%Difficulte%')
BEGIN
    DECLARE @ConstraintName NVARCHAR(200);
    SELECT TOP 1 @ConstraintName = name FROM sys.check_constraints 
    WHERE parent_object_id = OBJECT_ID(N'dbo.Questions') AND definition LIKE '%Difficulte%';
    
    IF @ConstraintName IS NOT NULL
    BEGIN
        DECLARE @DropSql NVARCHAR(500) = N'ALTER TABLE dbo.Questions DROP CONSTRAINT [' + @ConstraintName + N'];';
        EXEC sp_executesql @DropSql;
        PRINT '[OK] Ancienne contrainte de difficulté supprimée : ' + @ConstraintName;
    END
END
GO

-- Nouvelle contrainte supportant l'ensemble des difficultés
ALTER TABLE dbo.Questions ADD CONSTRAINT CK_Questions_Difficulte_Multi 
CHECK (Difficulte IN ('FACILE', 'MOYEN', 'DIFFICILE', 'AVANCE', 'EXPERT', N'سهل', N'متوسط', N'صعب'));
PRINT '[OK] Nouvelle contrainte CK_Questions_Difficulte_Multi appliquée.';
GO

-- 5. Mise à jour / Insertion idempotente des 10 catégories officielles dans dbo.DomainesCompetences
MERGE dbo.DomainesCompetences AS target
USING (VALUES
    ('LOGIQUE', 'Raisonnement Logique & Déductif', N'الاستدلال المنطقي', 1.2),
    ('OBSERVATION', 'Observation & Analyse', N'التحليل والملاحظة', 1.1),
    ('ATTENTION', 'Attention & Concentration', N'التركيز والانتباه', 1.0),
    ('DECISION', 'Résolution de Problèmes & Prise de Décision', N'حل المشكلات واتخاذ القرار', 1.3),
    ('ROUTE_MOTO', 'Sécurité Routière & Conduite Moto', N'السلامة الطرقية وقيادة الدراجات', 1.2),
    ('PJ_ENQUETE', 'Police Judiciaire & Enquête', N'الشرطة القضائية والتحري', 1.4),
    ('INFORMATIQUE', 'Informatique & Compétences Numériques', N'المعلوماتية والمهارات الرقمية', 1.1),
    ('COMMUNICATION', 'Communication & Formation', N'التواصل والتكوين', 1.0),
    ('SECRETARIAT', 'Administration & Secrétariat', N'الإدارة والسكرتارية', 1.0),
    ('DISCIPLINE', 'Attitudes Professionnelles & Discipline', N'المواقف المهنية والانضباط', 1.3)
) AS source (Code, Intitule, IntituleArabe, PoidsDefaut)
ON target.Code = source.Code
WHEN MATCHED THEN
    UPDATE SET 
        target.Intitule = source.Intitule,
        target.IntituleArabe = source.IntituleArabe,
        target.PoidsDefaut = source.PoidsDefaut
WHEN NOT MATCHED THEN
    INSERT (Code, Intitule, IntituleArabe, Description, PoidsDefaut)
    VALUES (source.Code, source.Intitule, source.IntituleArabe, source.Intitule, source.PoidsDefaut);
GO

PRINT '[OK] Les 10 catégories de compétences sont synchronisées sans perte de données.';
GO

-- 6. Ajout des colonnes OptionsOrderSnapshot et CandidatSnapshot dans dbo.SessionsTest si absentes
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID(N'dbo.SessionsTest') AND name = 'OptionsOrderSnapshot')
BEGIN
    ALTER TABLE dbo.SessionsTest ADD OptionsOrderSnapshot NVARCHAR(MAX) NULL;
    PRINT '[OK] Colonne OptionsOrderSnapshot ajoutée à dbo.SessionsTest.';
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID(N'dbo.SessionsTest') AND name = 'CandidatSnapshot')
BEGIN
    ALTER TABLE dbo.SessionsTest ADD CandidatSnapshot NVARCHAR(MAX) NULL;
    PRINT '[OK] Colonne CandidatSnapshot ajoutée à dbo.SessionsTest.';
END
GO

