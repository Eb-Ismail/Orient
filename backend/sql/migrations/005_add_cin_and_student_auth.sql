-- =====================================================================
-- Migration 005: Authentification Sécurisée Espace Élève par CIN + Matricule
-- Base: OrientGR_DB sur instance .\CLASS
-- Date: Novembre 2026
-- Idempotente et non destructive
-- =====================================================================

USE [OrientGR_DB];
GO

PRINT '--- DEBUT MIGRATION 005: AUTHENTIFICATION ELEVE (CIN + MATRICULE) ---';

-- 1. Ajout de la colonne NumeroCIN sur dbo.Utilisateurs
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.Utilisateurs') AND name = 'NumeroCIN')
BEGIN
    ALTER TABLE dbo.Utilisateurs ADD NumeroCIN NVARCHAR(50) NULL;
    PRINT '  -> Colonne dbo.Utilisateurs.NumeroCIN ajoutée.';
END;
GO

-- 2. Ajout du statut d'activation du compte
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.Utilisateurs') AND name = 'CompteActive')
BEGIN
    ALTER TABLE dbo.Utilisateurs ADD CompteActive BIT NOT NULL CONSTRAINT DF_Utilisateurs_CompteActive DEFAULT (1);
    PRINT '  -> Colonne dbo.Utilisateurs.CompteActive ajoutée.';
END;
GO

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.Utilisateurs') AND name = 'DateActivation')
BEGIN
    ALTER TABLE dbo.Utilisateurs ADD DateActivation DATETIME2 NULL;
    PRINT '  -> Colonne dbo.Utilisateurs.DateActivation ajoutée.';
END;
GO

-- 3. Ajout des colonnes de gestion des tentatives et verrouillage de sécurité
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.Utilisateurs') AND name = 'TentativesEchouees')
BEGIN
    ALTER TABLE dbo.Utilisateurs ADD TentativesEchouees INT NOT NULL CONSTRAINT DF_Utilisateurs_TentativesEchouees DEFAULT (0);
    PRINT '  -> Colonne dbo.Utilisateurs.TentativesEchouees ajoutée.';
END;
GO

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.Utilisateurs') AND name = 'DernierEchecConnexion')
BEGIN
    ALTER TABLE dbo.Utilisateurs ADD DernierEchecConnexion DATETIME2 NULL;
    PRINT '  -> Colonne dbo.Utilisateurs.DernierEchecConnexion ajoutée.';
END;
GO

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('dbo.Utilisateurs') AND name = 'VerrouilleJusquA')
BEGIN
    ALTER TABLE dbo.Utilisateurs ADD VerrouilleJusquA DATETIME2 NULL;
    PRINT '  -> Colonne dbo.Utilisateurs.VerrouilleJusquA ajoutée.';
END;
GO

-- 4. Indexation optimisée et contrainte d'unicité filtrée pour le CIN
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_Utilisateurs_NumeroCIN' AND object_id = OBJECT_ID('dbo.Utilisateurs'))
BEGIN
    CREATE UNIQUE NONCLUSTERED INDEX IX_Utilisateurs_NumeroCIN 
    ON dbo.Utilisateurs (NumeroCIN) 
    WHERE NumeroCIN IS NOT NULL;
    PRINT '  -> Index unique filtré IX_Utilisateurs_NumeroCIN créé.';
END;
GO

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_Utilisateurs_Matricule_Role' AND object_id = OBJECT_ID('dbo.Utilisateurs'))
BEGIN
    CREATE NONCLUSTERED INDEX IX_Utilisateurs_Matricule_Role 
    ON dbo.Utilisateurs (Matricule, Role);
    PRINT '  -> Index IX_Utilisateurs_Matricule_Role créé.';
END;
GO

-- 5. Attribution des numéros CIN officiels pour les élèves gendarmes existants
EXEC('
    UPDATE dbo.Utilisateurs 
    SET NumeroCIN = ''AB123456'', CompteActive = 1, DateActivation = ISNULL(DateActivation, GETDATE())
    WHERE Matricule IN (''EG-2025-099'', ''EG-2025-014'') AND Role = ''ELEVE'';

    UPDATE dbo.Utilisateurs 
    SET NumeroCIN = ''CD789012'', CompteActive = 1, DateActivation = ISNULL(DateActivation, GETDATE())
    WHERE Matricule = ''EG-2025-042'' AND Role = ''ELEVE'';

    UPDATE dbo.Utilisateurs 
    SET NumeroCIN = ''EF345678'', CompteActive = 1, DateActivation = ISNULL(DateActivation, GETDATE())
    WHERE Matricule = ''EG-2025-089'' AND Role = ''ELEVE'';

    UPDATE dbo.Utilisateurs 
    SET NumeroCIN = ''GH901234'', CompteActive = 1, DateActivation = ISNULL(DateActivation, GETDATE())
    WHERE Matricule = ''EG-2025-103'' AND Role = ''ELEVE'';
');
PRINT '  -> Données CIN et activation initialisées pour les élèves.';
GO

PRINT '--- FIN MIGRATION 005 APPLIQUÉE AVEC SUCCÈS ---';
GO

