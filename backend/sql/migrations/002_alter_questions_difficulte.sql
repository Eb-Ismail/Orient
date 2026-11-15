USE [OrientGR_DB];
GO

DECLARE @ckName NVARCHAR(255);
SELECT @ckName = cc.name
FROM sys.check_constraints cc
INNER JOIN sys.columns col ON cc.parent_object_id = col.object_id AND cc.parent_column_id = col.column_id
WHERE cc.parent_object_id = OBJECT_ID(N'dbo.Questions') AND col.name = N'Difficulte';

IF @ckName IS NOT NULL
BEGIN
    EXEC(N'ALTER TABLE dbo.Questions DROP CONSTRAINT [' + @ckName + N']');
END

IF NOT EXISTS (SELECT 1 FROM sys.check_constraints WHERE name = N'CK_Questions_Difficulte' AND parent_object_id = OBJECT_ID(N'dbo.Questions'))
BEGIN
    ALTER TABLE dbo.Questions
    ADD CONSTRAINT CK_Questions_Difficulte CHECK (Difficulte IN ('FACILE', 'MOYEN', 'AVANCE', 'DIFFICILE', 'EXPERT'));
END
GO

