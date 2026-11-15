-- ==============================================================================
-- ORIENT-GR — MIGRATION 009 : WORKFLOW DE SÉLECTION & RECRUTEMENT MULTI-COMMISSIONS
-- Idempotente & Sécurisée pour SQL Server 2019
-- ==============================================================================

USE [OrientGR_DB];
GO

-- 1. Mise à jour de la contrainte CHECK sur CandidateCommissionAssignments.StatutVentilation
IF EXISTS (
    SELECT 1 FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
    WHERE CONSTRAINT_TYPE = 'CHECK' 
      AND TABLE_NAME = 'CandidateCommissionAssignments'
      AND CONSTRAINT_NAME = 'CK_CandidateAssignments_Statut'
)
BEGIN
    ALTER TABLE dbo.CandidateCommissionAssignments DROP CONSTRAINT CK_CandidateAssignments_Statut;
END
GO

ALTER TABLE dbo.CandidateCommissionAssignments 
ADD CONSTRAINT CK_CandidateAssignments_Statut 
CHECK (StatutVentilation IN (
    'EN_ATTENTE',
    'CONVOQUE',
    'EN_COURS',
    'EVALUATION_TERMINEE',
    'POSITIF',
    'NEGATIF',
    'TRANSMIS_ADMIN',
    'PROPOSEE_IA',
    'VALIDEE_ADMIN',
    'ASSIGNEE_MANUELLE',
    'REJETEE_ADMIN',
    'ACCEPTE',
    'REFUSE'
));
GO

-- Ajout de colonnes de gestion de session et convocation sur CandidateCommissionAssignments
IF NOT EXISTS (
    SELECT 1 FROM sys.columns 
    WHERE object_id = OBJECT_ID('dbo.CandidateCommissionAssignments') 
      AND name = 'DateConvocation'
)
BEGIN
    ALTER TABLE dbo.CandidateCommissionAssignments ADD DateConvocation DATETIME2 NULL;
END
GO

-- 2. Extension de dbo.CommissionEvaluations pour l'Analyse IA Post-Évaluation et Transmission
IF NOT EXISTS (
    SELECT 1 FROM sys.columns 
    WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
      AND name = 'CommentairesComplementaires'
)
BEGIN
    ALTER TABLE dbo.CommissionEvaluations ADD CommentairesComplementaires NVARCHAR(MAX) NULL;
END
GO

IF NOT EXISTS (
    SELECT 1 FROM sys.columns 
    WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
      AND name = 'RecommandationIA'
)
BEGIN
    ALTER TABLE dbo.CommissionEvaluations ADD RecommandationIA NVARCHAR(50) NULL;
END
GO

IF NOT EXISTS (
    SELECT 1 FROM sys.columns 
    WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
      AND name = 'ResumeAnalyseIA'
)
BEGIN
    ALTER TABLE dbo.CommissionEvaluations ADD ResumeAnalyseIA NVARCHAR(MAX) NULL;
END
GO

IF NOT EXISTS (
    SELECT 1 FROM sys.columns 
    WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
      AND name = 'JustificationIA'
)
BEGIN
    ALTER TABLE dbo.CommissionEvaluations ADD JustificationIA NVARCHAR(MAX) NULL;
END
GO

IF NOT EXISTS (
    SELECT 1 FROM sys.columns 
    WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
      AND name = 'PointsFortsIAJson'
)
BEGIN
    ALTER TABLE dbo.CommissionEvaluations ADD PointsFortsIAJson NVARCHAR(MAX) NULL;
END
GO

IF NOT EXISTS (
    SELECT 1 FROM sys.columns 
    WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
      AND name = 'PointsFaiblesIAJson'
)
BEGIN
    ALTER TABLE dbo.CommissionEvaluations ADD PointsFaiblesIAJson NVARCHAR(MAX) NULL;
END
GO

IF NOT EXISTS (
    SELECT 1 FROM sys.columns 
    WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
      AND name = 'NotesPrisesEnCompteJson'
)
BEGIN
    ALTER TABLE dbo.CommissionEvaluations ADD NotesPrisesEnCompteJson NVARCHAR(MAX) NULL;
END
GO

IF NOT EXISTS (
    SELECT 1 FROM sys.columns 
    WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
      AND name = 'ObservationsPrisesEnCompte'
)
BEGIN
    ALTER TABLE dbo.CommissionEvaluations ADD ObservationsPrisesEnCompte NVARCHAR(MAX) NULL;
END
GO

IF NOT EXISTS (
    SELECT 1 FROM sys.columns 
    WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
      AND name = 'DateAnalyseIA'
)
BEGIN
    ALTER TABLE dbo.CommissionEvaluations ADD DateAnalyseIA DATETIME2 NULL;
END
GO

IF NOT EXISTS (
    SELECT 1 FROM sys.columns 
    WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
      AND name = 'ModeleIAVersion'
)
BEGIN
    ALTER TABLE dbo.CommissionEvaluations ADD ModeleIAVersion NVARCHAR(50) NOT NULL DEFAULT 'v1.0-2026';
END
GO

IF NOT EXISTS (
    SELECT 1 FROM sys.columns 
    WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
      AND name = 'EstTransmisAdmin'
)
BEGIN
    ALTER TABLE dbo.CommissionEvaluations ADD EstTransmisAdmin BIT NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (
    SELECT 1 FROM sys.columns 
    WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
      AND name = 'DateTransmissionAdmin'
)
BEGIN
    ALTER TABLE dbo.CommissionEvaluations ADD DateTransmissionAdmin DATETIME2 NULL;
END
GO

IF NOT EXISTS (
    SELECT 1 FROM sys.columns 
    WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
      AND name = 'NomEvaluateur'
)
BEGIN
    ALTER TABLE dbo.CommissionEvaluations ADD NomEvaluateur NVARCHAR(150) NULL;
END
GO

IF NOT EXISTS (
    SELECT 1 FROM sys.columns 
    WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
      AND name = 'DateSaisieEvaluation'
)
BEGIN
    ALTER TABLE dbo.CommissionEvaluations ADD DateSaisieEvaluation DATETIME2 NULL;
END
GO

-- Index sur EstTransmisAdmin et RecommandationIA pour la requête rapide des dossiers transmis
IF NOT EXISTS (
    SELECT 1 FROM sys.indexes 
    WHERE name = 'IX_CommissionEvaluations_Transmission' 
      AND object_id = OBJECT_ID('dbo.CommissionEvaluations')
)
BEGIN
    CREATE INDEX IX_CommissionEvaluations_Transmission 
    ON dbo.CommissionEvaluations(EstTransmisAdmin, RecommandationIA);
END
GO

-- 3. Mise à jour de dbo.AdministrativeSelectionDecisions pour liaison directe avec AssignmentId
IF NOT EXISTS (
    SELECT 1 FROM sys.columns 
    WHERE object_id = OBJECT_ID('dbo.AdministrativeSelectionDecisions') 
      AND name = 'AssignmentId'
)
BEGIN
    ALTER TABLE dbo.AdministrativeSelectionDecisions 
    ADD AssignmentId INT NULL;

    ALTER TABLE dbo.AdministrativeSelectionDecisions 
    ADD CONSTRAINT FK_SelectionDecisions_Assignment 
    FOREIGN KEY (AssignmentId) REFERENCES dbo.CandidateCommissionAssignments(AssignmentId);
END
GO

IF NOT EXISTS (
    SELECT 1 FROM sys.columns 
    WHERE object_id = OBJECT_ID('dbo.AdministrativeSelectionDecisions') 
      AND name = 'NomAdmin'
)
BEGIN
    ALTER TABLE dbo.AdministrativeSelectionDecisions ADD NomAdmin NVARCHAR(150) NULL;
END
GO

-- Mise à jour contrainte CHECK sur dbo.AdministrativeSelectionDecisions.StatutDecision
IF EXISTS (
    SELECT 1 FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
    WHERE CONSTRAINT_TYPE = 'CHECK' 
      AND TABLE_NAME = 'AdministrativeSelectionDecisions'
      AND CONSTRAINT_NAME = 'CK_SelectionDecisions_Statut'
)
BEGIN
    ALTER TABLE dbo.AdministrativeSelectionDecisions DROP CONSTRAINT CK_SelectionDecisions_Statut;
END
GO

ALTER TABLE dbo.AdministrativeSelectionDecisions 
ADD CONSTRAINT CK_SelectionDecisions_Statut 
CHECK (StatutDecision IN (
    'ACCEPTE',
    'REFUSE',
    'AFFECTE_OFFICIEL',
    'REJETE',
    'EVALUATION_COMPLEMENTAIRE',
    'EN_ATTENTE'
));
GO

PRINT 'Migration 009 appliquée avec succès.';

