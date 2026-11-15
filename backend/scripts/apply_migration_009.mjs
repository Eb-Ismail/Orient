import { getDbPool } from '../lib/db.js';

async function applyMigration009() {
  console.log('--- Exécution de la Migration 009 ---');
  const pool = await getDbPool();

  // 1. CandidateCommissionAssignments: Drop and recreate CK_CandidateAssignments_Statut
  console.log('1. Mise à jour CK_CandidateAssignments_Statut...');
  await pool.request().query(`
    IF EXISTS (
        SELECT 1 FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
        WHERE CONSTRAINT_TYPE = 'CHECK' 
          AND TABLE_NAME = 'CandidateCommissionAssignments'
          AND CONSTRAINT_NAME = 'CK_CandidateAssignments_Statut'
    )
    BEGIN
        ALTER TABLE dbo.CandidateCommissionAssignments DROP CONSTRAINT CK_CandidateAssignments_Statut;
    END;

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

    IF NOT EXISTS (
        SELECT 1 FROM sys.columns 
        WHERE object_id = OBJECT_ID('dbo.CandidateCommissionAssignments') 
          AND name = 'DateConvocation'
    )
    BEGIN
        ALTER TABLE dbo.CandidateCommissionAssignments ADD DateConvocation DATETIME2 NULL;
    END;
  `);

  // 2. CommissionEvaluations: Add post-evaluation AI and transmission columns
  console.log('2. Extension de dbo.CommissionEvaluations...');
  await pool.request().query(`
    IF NOT EXISTS (
        SELECT 1 FROM sys.columns 
        WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
          AND name = 'CommentairesComplementaires'
    )
    BEGIN
        ALTER TABLE dbo.CommissionEvaluations ADD CommentairesComplementaires NVARCHAR(MAX) NULL;
    END;

    IF NOT EXISTS (
        SELECT 1 FROM sys.columns 
        WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
          AND name = 'RecommandationIA'
    )
    BEGIN
        ALTER TABLE dbo.CommissionEvaluations ADD RecommandationIA NVARCHAR(50) NULL;
    END;

    IF NOT EXISTS (
        SELECT 1 FROM sys.columns 
        WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
          AND name = 'ResumeAnalyseIA'
    )
    BEGIN
        ALTER TABLE dbo.CommissionEvaluations ADD ResumeAnalyseIA NVARCHAR(MAX) NULL;
    END;

    IF NOT EXISTS (
        SELECT 1 FROM sys.columns 
        WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
          AND name = 'JustificationIA'
    )
    BEGIN
        ALTER TABLE dbo.CommissionEvaluations ADD JustificationIA NVARCHAR(MAX) NULL;
    END;

    IF NOT EXISTS (
        SELECT 1 FROM sys.columns 
        WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
          AND name = 'PointsFortsIAJson'
    )
    BEGIN
        ALTER TABLE dbo.CommissionEvaluations ADD PointsFortsIAJson NVARCHAR(MAX) NULL;
    END;

    IF NOT EXISTS (
        SELECT 1 FROM sys.columns 
        WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
          AND name = 'PointsFaiblesIAJson'
    )
    BEGIN
        ALTER TABLE dbo.CommissionEvaluations ADD PointsFaiblesIAJson NVARCHAR(MAX) NULL;
    END;

    IF NOT EXISTS (
        SELECT 1 FROM sys.columns 
        WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
          AND name = 'NotesPrisesEnCompteJson'
    )
    BEGIN
        ALTER TABLE dbo.CommissionEvaluations ADD NotesPrisesEnCompteJson NVARCHAR(MAX) NULL;
    END;

    IF NOT EXISTS (
        SELECT 1 FROM sys.columns 
        WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
          AND name = 'ObservationsPrisesEnCompte'
    )
    BEGIN
        ALTER TABLE dbo.CommissionEvaluations ADD ObservationsPrisesEnCompte NVARCHAR(MAX) NULL;
    END;

    IF NOT EXISTS (
        SELECT 1 FROM sys.columns 
        WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
          AND name = 'DateAnalyseIA'
    )
    BEGIN
        ALTER TABLE dbo.CommissionEvaluations ADD DateAnalyseIA DATETIME2 NULL;
    END;

    IF NOT EXISTS (
        SELECT 1 FROM sys.columns 
        WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
          AND name = 'ModeleIAVersion'
    )
    BEGIN
        ALTER TABLE dbo.CommissionEvaluations ADD ModeleIAVersion NVARCHAR(50) NOT NULL DEFAULT 'v1.0-2026';
    END;

    IF NOT EXISTS (
        SELECT 1 FROM sys.columns 
        WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
          AND name = 'EstTransmisAdmin'
    )
    BEGIN
        ALTER TABLE dbo.CommissionEvaluations ADD EstTransmisAdmin BIT NOT NULL DEFAULT 0;
    END;

    IF NOT EXISTS (
        SELECT 1 FROM sys.columns 
        WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
          AND name = 'DateTransmissionAdmin'
    )
    BEGIN
        ALTER TABLE dbo.CommissionEvaluations ADD DateTransmissionAdmin DATETIME2 NULL;
    END;

    IF NOT EXISTS (
        SELECT 1 FROM sys.columns 
        WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
          AND name = 'NomEvaluateur'
    )
    BEGIN
        ALTER TABLE dbo.CommissionEvaluations ADD NomEvaluateur NVARCHAR(150) NULL;
    END;

    IF NOT EXISTS (
        SELECT 1 FROM sys.columns 
        WHERE object_id = OBJECT_ID('dbo.CommissionEvaluations') 
          AND name = 'DateSaisieEvaluation'
    )
    BEGIN
        ALTER TABLE dbo.CommissionEvaluations ADD DateSaisieEvaluation DATETIME2 NULL;
    END;

    IF NOT EXISTS (
        SELECT 1 FROM sys.indexes 
        WHERE name = 'IX_CommissionEvaluations_Transmission' 
          AND object_id = OBJECT_ID('dbo.CommissionEvaluations')
    )
    BEGIN
        CREATE INDEX IX_CommissionEvaluations_Transmission 
        ON dbo.CommissionEvaluations(EstTransmisAdmin, RecommandationIA);
    END;
  `);

  // 3. AdministrativeSelectionDecisions: Add AssignmentId and update check constraint
  console.log('3. Mise à jour dbo.AdministrativeSelectionDecisions...');
  await pool.request().query(`
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
    END;

    IF NOT EXISTS (
        SELECT 1 FROM sys.columns 
        WHERE object_id = OBJECT_ID('dbo.AdministrativeSelectionDecisions') 
          AND name = 'NomAdmin'
    )
    BEGIN
        ALTER TABLE dbo.AdministrativeSelectionDecisions ADD NomAdmin NVARCHAR(150) NULL;
    END;

    IF EXISTS (
        SELECT 1 FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
        WHERE CONSTRAINT_TYPE = 'CHECK' 
          AND TABLE_NAME = 'AdministrativeSelectionDecisions'
          AND CONSTRAINT_NAME = 'CK_SelectionDecisions_Statut'
    )
    BEGIN
        ALTER TABLE dbo.AdministrativeSelectionDecisions DROP CONSTRAINT CK_SelectionDecisions_Statut;
    END;

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
  `);

  console.log('✅ Migration 009 terminée avec succès !');

  // Vérification
  const cols = await pool.request().query(`
    SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE 
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME IN ('CandidateCommissionAssignments', 'CommissionEvaluations', 'AdministrativeSelectionDecisions')
      AND COLUMN_NAME IN ('CommentairesComplementaires', 'RecommandationIA', 'EstTransmisAdmin', 'AssignmentId', 'DateConvocation')
  `);
  console.table(cols.recordset);
}

applyMigration009()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Échec migration 009:', err);
    process.exit(1);
  });

