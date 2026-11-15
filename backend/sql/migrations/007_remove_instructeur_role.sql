-- ==============================================================================
-- ORIENT-GR — MIGRATION 007 : SUPPRESSION DÉFINITIVE DU RÔLE INSTRUCTEUR
-- Migration SQL Server 2019 Idempotente & Réversible
-- Architecture strictement 3 rôles : ADMIN, COMMISSION, ELEVE
-- ==============================================================================

USE [OrientGR_DB];
GO

-- 1. Migration des utilisateurs ayant le rôle INSTRUCTEUR vers COMMISSION
-- Préserve l'intégrité référentielle (WorkshopAssignments, InstructorEvaluations, etc.)
IF EXISTS (SELECT 1 FROM dbo.Utilisateurs WHERE [Role] = 'INSTRUCTEUR' OR [Email] = 'instructeur@orient-gr.gendarmerie.fr')
BEGIN
    PRINT 'Migration des utilisateurs au rôle INSTRUCTEUR vers COMMISSION...';
    
    UPDATE dbo.Utilisateurs
    SET [Role] = 'COMMISSION',
        [Email] = CASE WHEN [Email] = 'instructeur@orient-gr.gendarmerie.fr' THEN 'commission.meca@orient-gr.gendarmerie.fr' ELSE [Email] END
    WHERE [Role] = 'INSTRUCTEUR' OR [Email] = 'instructeur@orient-gr.gendarmerie.fr';

    -- Affecter Mohammed El Fassi (UtilisateurId = 6) à la Commission Mécanique (COMM_MECA, ID=4) s'il n'y est pas déjà
    IF EXISTS (SELECT 1 FROM dbo.Utilisateurs WHERE UtilisateurId = 6)
       AND EXISTS (SELECT 1 FROM dbo.Commissions WHERE CommissionId = 4)
       AND NOT EXISTS (SELECT 1 FROM dbo.CommissionMembers WHERE UtilisateurId = 6 AND CommissionId = 4)
    BEGIN
        INSERT INTO dbo.CommissionMembers (CommissionId, UtilisateurId, RoleDansCommission, AffectePar, EstActif)
        VALUES (4, 6, 'EVALUATEUR', 1, 1);
        PRINT 'Utilisateur 6 (Mohammed El Fassi) rattaché comme évaluateur à la Commission Mécanique.';
    END
END
GO

-- 2. Mise à jour de la contrainte CHECK sur dbo.Utilisateurs(Role)
-- Accepte STRICTEMENT et UNIQUEMENT : 'ADMIN', 'COMMISSION', 'ELEVE'
IF EXISTS (SELECT * FROM sys.check_constraints WHERE name LIKE 'CK%Utilisateu%Role%')
BEGIN
    DECLARE @chkName NVARCHAR(128);
    SELECT TOP 1 @chkName = name FROM sys.check_constraints WHERE name LIKE 'CK%Utilisateu%Role%';
    EXEC('ALTER TABLE dbo.Utilisateurs DROP CONSTRAINT [' + @chkName + '];');
    PRINT 'Ancienne contrainte de rôle supprimée : ' + @chkName;
END
GO

IF NOT EXISTS (SELECT * FROM sys.check_constraints WHERE name = 'CK_Utilisateurs_Role')
BEGIN
    ALTER TABLE dbo.Utilisateurs ADD CONSTRAINT CK_Utilisateurs_Role 
    CHECK ([Role] IN ('ADMIN', 'COMMISSION', 'ELEVE'));
    PRINT 'Nouvelle contrainte stricte CK_Utilisateurs_Role (ADMIN, COMMISSION, ELEVE) créée avec succès.';
END
GO
