-- =====================================================================
-- Migration 004: Système d'Évaluation Pratique, Détection des Talents & Pré-sélection
-- Base: OrientGR_DB sur instance .\CLASS
-- Date: Novembre 2026
-- Idempotente et non destructive
-- =====================================================================

USE [OrientGR_DB];
GO

PRINT '--- DEBUT MIGRATION 004: EVALUATION, TALENTS & PRE-SELECTION ---';

-- 1. Ajout des colonnes de Filière d'Entrée sur dbo.Utilisateurs
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.Utilisateurs') AND name = 'FiliereEntree')
BEGIN
    ALTER TABLE dbo.Utilisateurs ADD FiliereEntree NVARCHAR(50) NULL 
        CONSTRAINT CK_Utilisateurs_FiliereEntree CHECK (FiliereEntree IN ('NORMAL_BAC', 'SPECIALISTE_ISTA', 'NON_DEFINI') OR FiliereEntree IS NULL);
    PRINT '  -> Colonne dbo.Utilisateurs.FiliereEntree ajoutée.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.Utilisateurs') AND name = 'DiplomeOrigine')
BEGIN
    ALTER TABLE dbo.Utilisateurs ADD DiplomeOrigine NVARCHAR(255) NULL;
    PRINT '  -> Colonne dbo.Utilisateurs.DiplomeOrigine ajoutée.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.Utilisateurs') AND name = 'EtablissementOrigine')
BEGIN
    ALTER TABLE dbo.Utilisateurs ADD EtablissementOrigine NVARCHAR(255) NULL;
    PRINT '  -> Colonne dbo.Utilisateurs.EtablissementOrigine ajoutée.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.Utilisateurs') AND name = 'DomaineFormation')
BEGIN
    ALTER TABLE dbo.Utilisateurs ADD DomaineFormation NVARCHAR(255) NULL;
    PRINT '  -> Colonne dbo.Utilisateurs.DomaineFormation ajoutée.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.Utilisateurs') AND name = 'SpecialiteOrigine')
BEGIN
    ALTER TABLE dbo.Utilisateurs ADD SpecialiteOrigine NVARCHAR(255) NULL;
    PRINT '  -> Colonne dbo.Utilisateurs.SpecialiteOrigine ajoutée.';
END;

-- 2. Ajout des colonnes de Grille d'Évaluation Terrain sur dbo.InstructorEvaluations
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.InstructorEvaluations') AND name = 'WorkshopId')
BEGIN
    ALTER TABLE dbo.InstructorEvaluations ADD WorkshopId INT NULL
        CONSTRAINT FK_InstructorEval_Workshop FOREIGN KEY REFERENCES dbo.Workshops(WorkshopId);
    PRINT '  -> Colonne dbo.InstructorEvaluations.WorkshopId ajoutée.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.InstructorEvaluations') AND name = 'DomaineCode')
BEGIN
    ALTER TABLE dbo.InstructorEvaluations ADD DomaineCode NVARCHAR(50) NULL;
    PRINT '  -> Colonne dbo.InstructorEvaluations.DomaineCode ajoutée.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.InstructorEvaluations') AND name = 'NotePratique')
BEGIN
    ALTER TABLE dbo.InstructorEvaluations ADD NotePratique FLOAT NULL
        CONSTRAINT CK_InstructorEval_NotePratique CHECK (NotePratique >= 0.0 AND NotePratique <= 20.0);
    PRINT '  -> Colonne dbo.InstructorEvaluations.NotePratique ajoutée.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.InstructorEvaluations') AND name = 'TempsMinutes')
BEGIN
    ALTER TABLE dbo.InstructorEvaluations ADD TempsMinutes INT NULL
        CONSTRAINT CK_InstructorEval_TempsMinutes CHECK (TempsMinutes > 0 OR TempsMinutes IS NULL);
    PRINT '  -> Colonne dbo.InstructorEvaluations.TempsMinutes ajoutée.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.InstructorEvaluations') AND name = 'NiveauAutonomie')
BEGIN
    ALTER TABLE dbo.InstructorEvaluations ADD NiveauAutonomie NVARCHAR(50) NULL
        CONSTRAINT CK_InstructorEval_Autonomie CHECK (NiveauAutonomie IN ('AUTONOME', 'GUIDE', 'ASSISTE') OR NiveauAutonomie IS NULL);
    PRINT '  -> Colonne dbo.InstructorEvaluations.NiveauAutonomie ajoutée.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.InstructorEvaluations') AND name = 'CompetencesValideesJson')
BEGIN
    ALTER TABLE dbo.InstructorEvaluations ADD CompetencesValideesJson NVARCHAR(MAX) NULL;
    PRINT '  -> Colonne dbo.InstructorEvaluations.CompetencesValideesJson ajoutée.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.InstructorEvaluations') AND name = 'OrientationSuggereCode')
BEGIN
    ALTER TABLE dbo.InstructorEvaluations ADD OrientationSuggereCode NVARCHAR(50) NULL;
    PRINT '  -> Colonne dbo.InstructorEvaluations.OrientationSuggereCode ajoutée.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.InstructorEvaluations') AND name = 'HistoriqueModificationsJson')
BEGIN
    ALTER TABLE dbo.InstructorEvaluations ADD HistoriqueModificationsJson NVARCHAR(MAX) NULL;
    PRINT '  -> Colonne dbo.InstructorEvaluations.HistoriqueModificationsJson ajoutée.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.InstructorEvaluations') AND name = 'UpdatedAt')
BEGIN
    ALTER TABLE dbo.InstructorEvaluations ADD UpdatedAt DATETIME2 NULL;
    PRINT '  -> Colonne dbo.InstructorEvaluations.UpdatedAt ajoutée.';
END;

-- Index sur dbo.InstructorEvaluations
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('dbo.InstructorEvaluations') AND name = 'IX_InstructorEval_User_Workshop')
BEGIN
    CREATE NONCLUSTERED INDEX IX_InstructorEval_User_Workshop ON dbo.InstructorEvaluations (UtilisateurId, WorkshopId);
    PRINT '  -> Index IX_InstructorEval_User_Workshop créé.';
END;

-- 3. Ajout des colonnes de Pré-sélection et Validation Administrative sur dbo.OrientationProposals
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.OrientationProposals') AND name = 'StatutPreselection')
BEGIN
    ALTER TABLE dbo.OrientationProposals ADD StatutPreselection NVARCHAR(100) NULL;
    PRINT '  -> Colonne dbo.OrientationProposals.StatutPreselection ajoutée.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.OrientationProposals') AND name = 'DomaineTechnique')
BEGIN
    ALTER TABLE dbo.OrientationProposals ADD DomaineTechnique NVARCHAR(100) NULL;
    PRINT '  -> Colonne dbo.OrientationProposals.DomaineTechnique ajoutée.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.OrientationProposals') AND name = 'MoyennePratique')
BEGIN
    ALTER TABLE dbo.OrientationProposals ADD MoyennePratique FLOAT NULL;
    PRINT '  -> Colonne dbo.OrientationProposals.MoyennePratique ajoutée.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.OrientationProposals') AND name = 'MeilleureNotePratique')
BEGIN
    ALTER TABLE dbo.OrientationProposals ADD MeilleureNotePratique FLOAT NULL;
    PRINT '  -> Colonne dbo.OrientationProposals.MeilleureNotePratique ajoutée.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.OrientationProposals') AND name = 'CompetencesValideesJson')
BEGIN
    ALTER TABLE dbo.OrientationProposals ADD CompetencesValideesJson NVARCHAR(MAX) NULL;
    PRINT '  -> Colonne dbo.OrientationProposals.CompetencesValideesJson ajoutée.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.OrientationProposals') AND name = 'ExplicationJson')
BEGIN
    ALTER TABLE dbo.OrientationProposals ADD ExplicationJson NVARCHAR(MAX) NULL;
    PRINT '  -> Colonne dbo.OrientationProposals.ExplicationJson ajoutée.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.OrientationProposals') AND name = 'EvaluationsUtiliseesJson')
BEGIN
    ALTER TABLE dbo.OrientationProposals ADD EvaluationsUtiliseesJson NVARCHAR(MAX) NULL;
    PRINT '  -> Colonne dbo.OrientationProposals.EvaluationsUtiliseesJson ajoutée.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.OrientationProposals') AND name = 'FiliereEntree')
BEGIN
    ALTER TABLE dbo.OrientationProposals ADD FiliereEntree NVARCHAR(50) NULL;
    PRINT '  -> Colonne dbo.OrientationProposals.FiliereEntree ajoutée.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.OrientationProposals') AND name = 'EstDecisionVerrouillee')
BEGIN
    ALTER TABLE dbo.OrientationProposals ADD EstDecisionVerrouillee BIT NOT NULL DEFAULT 0;
    PRINT '  -> Colonne dbo.OrientationProposals.EstDecisionVerrouillee ajoutée.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.OrientationProposals') AND name = 'DateDecisionAdmin')
BEGIN
    ALTER TABLE dbo.OrientationProposals ADD DateDecisionAdmin DATETIME2 NULL;
    PRINT '  -> Colonne dbo.OrientationProposals.DateDecisionAdmin ajoutée.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.OrientationProposals') AND name = 'JustificationAdmin')
BEGIN
    ALTER TABLE dbo.OrientationProposals ADD JustificationAdmin NVARCHAR(MAX) NULL;
    PRINT '  -> Colonne dbo.OrientationProposals.JustificationAdmin ajoutée.';
END;

-- 4. Initialisation des filières d'entrée pour les élèves existants
-- Julien Moreau (Bac - Talent potentiel en réseau/moto)
EXEC(N'UPDATE dbo.Utilisateurs 
SET FiliereEntree = ''NORMAL_BAC'',
    DiplomeOrigine = ''Baccalauréat Général (Sciences & Technologies)'',
    EtablissementOrigine = ''Lycée Militaire'',
    DomaineFormation = ''Enseignement Général'',
    SpecialiteOrigine = ''Généraliste''
WHERE Matricule = ''EG-2025-099'' AND (FiliereEntree IS NULL OR FiliereEntree = ''NON_DEFINI'');');

-- Clara Bernard (Spécialiste diplômée ISTA Réseaux & Informatique)
EXEC(N'UPDATE dbo.Utilisateurs 
SET FiliereEntree = ''SPECIALISTE_ISTA'',
    DiplomeOrigine = ''Technicien Spécialisé Systèmes & Réseaux Informatiques'',
    EtablissementOrigine = ''ISTA / OFPPT Casablanca'',
    DomaineFormation = ''Informatique & Réseaux'',
    SpecialiteOrigine = ''Systèmes & Sécurité Numérique''
WHERE Matricule = ''EG-2025-042'' AND (FiliereEntree IS NULL OR FiliereEntree = ''NON_DEFINI'');');

-- Thomas Leroux (Spécialiste diplômé ISTA Mécanique & Diagnostic)
EXEC(N'UPDATE dbo.Utilisateurs 
SET FiliereEntree = ''SPECIALISTE_ISTA'',
    DiplomeOrigine = ''Technicien Spécialisé Diagnostic Électronique & Mécanique'',
    EtablissementOrigine = ''ISTA / OFPPT Rabat'',
    DomaineFormation = ''Maintenance Mécanique & Électronique'',
    SpecialiteOrigine = ''Électronique Embarquée''
WHERE Matricule = ''EG-2025-089'' AND (FiliereEntree IS NULL OR FiliereEntree = ''NON_DEFINI'');');

-- Sarah Benali (Élève Normale - Baccalauréat)
EXEC(N'UPDATE dbo.Utilisateurs 
SET FiliereEntree = ''NORMAL_BAC'',
    DiplomeOrigine = ''Baccalauréat Sciences Économiques & Gestion'',
    EtablissementOrigine = ''Lycée d''''Excellence'',
    DomaineFormation = ''Enseignement Général'',
    SpecialiteOrigine = ''Généraliste''
WHERE Matricule = ''EG-2025-103'' AND (FiliereEntree IS NULL OR FiliereEntree = ''NON_DEFINI'');');

PRINT '--- FIN MIGRATION 004 AVEC SUCCES ---';
GO
