USE [OrientGR_DB];
GO

DECLARE @ckName NVARCHAR(255);
SELECT @ckName = cc.name
FROM sys.check_constraints cc
INNER JOIN sys.columns col ON cc.parent_object_id = col.object_id AND cc.parent_column_id = col.column_id
WHERE cc.parent_object_id = OBJECT_ID(N'dbo.OrientationProposals') AND col.name = N'StatutArbitrage';

IF @ckName IS NOT NULL
BEGIN
    EXEC(N'ALTER TABLE dbo.OrientationProposals DROP CONSTRAINT [' + @ckName + N']');
END

IF NOT EXISTS (SELECT 1 FROM sys.check_constraints WHERE name = N'CK_OrientationProposals_Statut' AND parent_object_id = OBJECT_ID(N'dbo.OrientationProposals'))
BEGIN
    ALTER TABLE dbo.OrientationProposals
    ADD CONSTRAINT CK_OrientationProposals_Statut CHECK (
        StatutArbitrage IN ('EN_ATTENTE', 'PROPOSEE', 'VALIDEE', 'VALIDEE_ADMIN', 'REFUSEE', 'REJETEE', 'MODIFIEE', 'AJUSTEE')
    );
END
GO

-- Nettoyer uniquement les lignes synthétiques insérées par les tests unitaires hors production (Workshops > 12, Assignations > 15)
DELETE FROM dbo.WorkshopAssignments WHERE AssignationId > 15;
DELETE FROM dbo.Workshops WHERE WorkshopId > 12;
GO

