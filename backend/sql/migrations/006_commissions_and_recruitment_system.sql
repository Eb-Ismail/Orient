-- ==============================================================================
-- ORIENT-GR — MIGRATION 006 : SYSTÈME DE COMMISSIONS SPÉCIALISÉES & RECRUTEMENT
-- Idempotente & Sécurisée pour SQL Server 2019
-- ==============================================================================

USE [OrientGR_DB];
GO

-- 1. Mise à jour de la contrainte CHECK sur Utilisateurs.Role pour accepter 'COMMISSION'
IF EXISTS (SELECT * FROM sys.check_constraints WHERE name LIKE 'CK%Utilisateu%Role%')
BEGIN
    DECLARE @chkName NVARCHAR(128);
    SELECT TOP 1 @chkName = name FROM sys.check_constraints WHERE name LIKE 'CK%Utilisateu%Role%';
    EXEC('ALTER TABLE dbo.Utilisateurs DROP CONSTRAINT [' + @chkName + '];');
END
GO

IF NOT EXISTS (SELECT * FROM sys.check_constraints WHERE name = 'CK_Utilisateurs_Role')
BEGIN
    ALTER TABLE dbo.Utilisateurs ADD CONSTRAINT CK_Utilisateurs_Role 
    CHECK ([Role] IN ('ADMIN', 'COMMISSION', 'INSTRUCTEUR', 'ELEVE'));
END
GO

-- 2. Table dbo.Commissions : Référentiel des commissions spécialisées de recrutement
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Commissions')
BEGIN
    CREATE TABLE dbo.Commissions (
        CommissionId INT IDENTITY(1,1) PRIMARY KEY,
        Code NVARCHAR(50) NOT NULL UNIQUE,
        Nom NVARCHAR(150) NOT NULL,
        NomAr NVARCHAR(150) NULL,
        Description NVARCHAR(MAX) NULL,
        Icone NVARCHAR(50) NOT NULL DEFAULT 'Laptop',
        Couleur NVARCHAR(50) NOT NULL DEFAULT '#1B4332',
        DomaineCode NVARCHAR(50) NULL,
        EstActive BIT NOT NULL DEFAULT 1,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
    CREATE INDEX IX_Commissions_Code ON dbo.Commissions(Code);
    CREATE INDEX IX_Commissions_EstActive ON dbo.Commissions(EstActive);
END
GO

-- 3. Table dbo.CommissionMembers : Association n-à-n entre membres COMMISSION et Commissions
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'CommissionMembers')
BEGIN
    CREATE TABLE dbo.CommissionMembers (
        MemberId INT IDENTITY(1,1) PRIMARY KEY,
        CommissionId INT NOT NULL,
        UtilisateurId INT NOT NULL,
        RoleDansCommission NVARCHAR(50) NOT NULL DEFAULT 'EVALUATEUR',
        DateAffectation DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        AffectePar INT NULL,
        EstActif BIT NOT NULL DEFAULT 1,
        CONSTRAINT FK_CommissionMembers_Commission FOREIGN KEY (CommissionId) REFERENCES dbo.Commissions(CommissionId) ON DELETE CASCADE,
        CONSTRAINT FK_CommissionMembers_User FOREIGN KEY (UtilisateurId) REFERENCES dbo.Utilisateurs(UtilisateurId) ON DELETE CASCADE,
        CONSTRAINT FK_CommissionMembers_Admin FOREIGN KEY (AffectePar) REFERENCES dbo.Utilisateurs(UtilisateurId),
        CONSTRAINT UQ_Commission_Member UNIQUE (CommissionId, UtilisateurId),
        CONSTRAINT CK_CommissionMembers_Role CHECK (RoleDansCommission IN ('PRESIDENT', 'EVALUATEUR', 'OBSERVATEUR'))
    );
    CREATE INDEX IX_CommissionMembers_User ON dbo.CommissionMembers(UtilisateurId);
    CREATE INDEX IX_CommissionMembers_Comm ON dbo.CommissionMembers(CommissionId);
END
GO

-- 4. Table dbo.CandidateCommissionAssignments : Ventilation d'un élève sur une ou plusieurs commissions
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'CandidateCommissionAssignments')
BEGIN
    CREATE TABLE dbo.CandidateCommissionAssignments (
        AssignmentId INT IDENTITY(1,1) PRIMARY KEY,
        UtilisateurId INT NOT NULL,
        CommissionId INT NOT NULL,
        ScoreCorrespondanceIA FLOAT NULL,
        JustificationIA NVARCHAR(MAX) NULL,
        CompetencesClesJson NVARCHAR(MAX) NULL,
        PointsAVerifierJson NVARCHAR(MAX) NULL,
        StatutVentilation NVARCHAR(50) NOT NULL DEFAULT 'PROPOSEE_IA',
        DateAffectation DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        AffectePar INT NULL,
        JustificationAdmin NVARCHAR(MAX) NULL,
        NotesCommissionAdmin NVARCHAR(MAX) NULL,
        CONSTRAINT FK_CandidateAssignments_Student FOREIGN KEY (UtilisateurId) REFERENCES dbo.Utilisateurs(UtilisateurId) ON DELETE CASCADE,
        CONSTRAINT FK_CandidateAssignments_Commission FOREIGN KEY (CommissionId) REFERENCES dbo.Commissions(CommissionId),
        CONSTRAINT FK_CandidateAssignments_Admin FOREIGN KEY (AffectePar) REFERENCES dbo.Utilisateurs(UtilisateurId),
        CONSTRAINT UQ_Candidate_Commission UNIQUE (UtilisateurId, CommissionId),
        CONSTRAINT CK_CandidateAssignments_Statut CHECK (StatutVentilation IN ('PROPOSEE_IA', 'VALIDEE_ADMIN', 'ASSIGNEE_MANUELLE', 'REJETEE_ADMIN'))
    );
    CREATE INDEX IX_CandidateAssignments_Student ON dbo.CandidateCommissionAssignments(UtilisateurId);
    CREATE INDEX IX_CandidateAssignments_Comm ON dbo.CandidateCommissionAssignments(CommissionId);
    CREATE INDEX IX_CandidateAssignments_Statut ON dbo.CandidateCommissionAssignments(StatutVentilation);
END
GO

-- 5. Table dbo.CommissionEvaluations : Évaluations physiques réelles des candidats par commission
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'CommissionEvaluations')
BEGIN
    CREATE TABLE dbo.CommissionEvaluations (
        EvaluationId INT IDENTITY(1,1) PRIMARY KEY,
        AssignmentId INT NOT NULL,
        UtilisateurId INT NOT NULL,
        CommissionId INT NOT NULL,
        EvaluateurId INT NOT NULL,
        NotePratiqueSur20 FLOAT NULL,
        NoteEntretienSur20 FLOAT NULL,
        NoteComplementaireSur20 FLOAT NULL,
        NoteGlobaleSur20 FLOAT NULL,
        Observations NVARCHAR(MAX) NULL,
        PointsFortsJson NVARCHAR(MAX) NULL,
        AxesAmeliorationJson NVARCHAR(MAX) NULL,
        AvisCommission NVARCHAR(50) NOT NULL DEFAULT 'RESERVE',
        StatutEvaluation NVARCHAR(50) NOT NULL DEFAULT 'BROUILLON',
        DateEvaluation DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        EstVerrouillee BIT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT FK_CommissionEvaluations_Assignment FOREIGN KEY (AssignmentId) REFERENCES dbo.CandidateCommissionAssignments(AssignmentId) ON DELETE CASCADE,
        CONSTRAINT FK_CommissionEvaluations_Student FOREIGN KEY (UtilisateurId) REFERENCES dbo.Utilisateurs(UtilisateurId),
        CONSTRAINT FK_CommissionEvaluations_Commission FOREIGN KEY (CommissionId) REFERENCES dbo.Commissions(CommissionId),
        CONSTRAINT FK_CommissionEvaluations_Evaluator FOREIGN KEY (EvaluateurId) REFERENCES dbo.Utilisateurs(UtilisateurId),
        CONSTRAINT UQ_Assignment_Evaluator UNIQUE (AssignmentId, EvaluateurId),
        CONSTRAINT CK_CommissionEvaluations_Avis CHECK (AvisCommission IN ('FAVORABLE_FORT', 'FAVORABLE', 'RESERVE', 'DEFAVORABLE')),
        CONSTRAINT CK_CommissionEvaluations_Statut CHECK (StatutEvaluation IN ('NON_EVALUE', 'EN_COURS', 'BROUILLON', 'SOUMISE', 'A_CORRIGER', 'VALIDEE')),
        CONSTRAINT CK_CommissionEvaluations_NotePratique CHECK (NotePratiqueSur20 IS NULL OR (NotePratiqueSur20 >= 0 AND NotePratiqueSur20 <= 20)),
        CONSTRAINT CK_CommissionEvaluations_NoteEntretien CHECK (NoteEntretienSur20 IS NULL OR (NoteEntretienSur20 >= 0 AND NoteEntretienSur20 <= 20)),
        CONSTRAINT CK_CommissionEvaluations_NoteGlobale CHECK (NoteGlobaleSur20 IS NULL OR (NoteGlobaleSur20 >= 0 AND NoteGlobaleSur20 <= 20))
    );
    CREATE INDEX IX_CommissionEvaluations_Assignment ON dbo.CommissionEvaluations(AssignmentId);
    CREATE INDEX IX_CommissionEvaluations_Student ON dbo.CommissionEvaluations(UtilisateurId);
    CREATE INDEX IX_CommissionEvaluations_Commission ON dbo.CommissionEvaluations(CommissionId);
    CREATE INDEX IX_CommissionEvaluations_Statut ON dbo.CommissionEvaluations(StatutEvaluation);
END
GO

-- 6. Table dbo.CommissionEvaluationHistory : Audit et traçabilité des modifications d'évaluations
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'CommissionEvaluationHistory')
BEGIN
    CREATE TABLE dbo.CommissionEvaluationHistory (
        HistoryId INT IDENTITY(1,1) PRIMARY KEY,
        EvaluationId INT NOT NULL,
        ModifiePar INT NOT NULL,
        AncienStatut NVARCHAR(50) NULL,
        NouveauStatut NVARCHAR(50) NULL,
        AnciennesNotesJson NVARCHAR(MAX) NULL,
        NouvellesNotesJson NVARCHAR(MAX) NULL,
        MotifCorrection NVARCHAR(MAX) NOT NULL,
        DateModification DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT FK_CommissionHistory_Evaluation FOREIGN KEY (EvaluationId) REFERENCES dbo.CommissionEvaluations(EvaluationId) ON DELETE CASCADE,
        CONSTRAINT FK_CommissionHistory_User FOREIGN KEY (ModifiePar) REFERENCES dbo.Utilisateurs(UtilisateurId)
    );
    CREATE INDEX IX_CommissionHistory_Evaluation ON dbo.CommissionEvaluationHistory(EvaluationId);
END
GO

-- 7. Table dbo.CandidateSelectionComparisons : Rapports comparatifs générés par le Moteur IA
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'CandidateSelectionComparisons')
BEGIN
    CREATE TABLE dbo.CandidateSelectionComparisons (
        ComparisonId INT IDENTITY(1,1) PRIMARY KEY,
        UtilisateurId INT NOT NULL,
        SyntheseProfilJson NVARCHAR(MAX) NOT NULL,
        ResultatsCommissionsJson NVARCHAR(MAX) NOT NULL,
        RecommandationPrincipaleCode NVARCHAR(50) NULL,
        RecommandationSecondaireCode NVARCHAR(50) NULL,
        IndiceConfiance FLOAT NOT NULL DEFAULT 85.0,
        PointsVigilanceJson NVARCHAR(MAX) NULL,
        ExplicationIA NVARCHAR(MAX) NOT NULL,
        CriteresVersion NVARCHAR(50) NOT NULL DEFAULT 'v1.0-2026',
        DeclenchePar INT NOT NULL,
        DateComparaison DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT FK_SelectionComparisons_Student FOREIGN KEY (UtilisateurId) REFERENCES dbo.Utilisateurs(UtilisateurId) ON DELETE CASCADE,
        CONSTRAINT FK_SelectionComparisons_Admin FOREIGN KEY (DeclenchePar) REFERENCES dbo.Utilisateurs(UtilisateurId)
    );
    CREATE INDEX IX_SelectionComparisons_Student ON dbo.CandidateSelectionComparisons(UtilisateurId);
END
GO

-- 8. Table dbo.AdministrativeSelectionDecisions : Décisions officielles de commandement
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'AdministrativeSelectionDecisions')
BEGIN
    CREATE TABLE dbo.AdministrativeSelectionDecisions (
        DecisionId INT IDENTITY(1,1) PRIMARY KEY,
        UtilisateurId INT NOT NULL,
        ComparisonId INT NULL,
        CommissionRetenueId INT NULL,
        SpecialiteRetenueCode NVARCHAR(50) NOT NULL,
        StatutDecision NVARCHAR(50) NOT NULL DEFAULT 'AFFECTE_OFFICIEL',
        JustificationDecision NVARCHAR(MAX) NOT NULL,
        DecisionPar INT NOT NULL,
        DateDecision DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        EstVerrouillee BIT NOT NULL DEFAULT 1,
        CONSTRAINT FK_SelectionDecisions_Student FOREIGN KEY (UtilisateurId) REFERENCES dbo.Utilisateurs(UtilisateurId) ON DELETE CASCADE,
        CONSTRAINT FK_SelectionDecisions_Comparison FOREIGN KEY (ComparisonId) REFERENCES dbo.CandidateSelectionComparisons(ComparisonId),
        CONSTRAINT FK_SelectionDecisions_Commission FOREIGN KEY (CommissionRetenueId) REFERENCES dbo.Commissions(CommissionId),
        CONSTRAINT FK_SelectionDecisions_Admin FOREIGN KEY (DecisionPar) REFERENCES dbo.Utilisateurs(UtilisateurId),
        CONSTRAINT CK_SelectionDecisions_Statut CHECK (StatutDecision IN ('AFFECTE_OFFICIEL', 'REJETE', 'EVALUATION_COMPLEMENTAIRE'))
    );
    CREATE INDEX IX_SelectionDecisions_Student ON dbo.AdministrativeSelectionDecisions(UtilisateurId);
    CREATE INDEX IX_SelectionDecisions_Statut ON dbo.AdministrativeSelectionDecisions(StatutDecision);
END
GO

-- 9. SEEDS IDEMPOTENTS DES COMMISSIONS SPÉCIALISÉES OFFICIELLES
MERGE INTO dbo.Commissions AS Target
USING (VALUES
    ('COMM_INFO', N'Commission Informatique & Systèmes', N'لجنة المعلوميات والأنظمة', N'Évaluation technique en programmation, systèmes d''exploitation et bases de données.', 'Laptop', '#1B4332', 'INFO_DEV', 1),
    ('COMM_RESEAUX', N'Commission Réseaux & Télécommunications', N'لجنة الشبكات والمواصلات', N'Évaluation pratique en architecture réseau, routage, commutation et télécoms militaires.', 'Network', '#153B2B', 'RESEAUX_CYBER', 1),
    ('COMM_CYBER', N'Commission Cybersécurité & Investigation Numérique', N'لجنة الأمن السيبراني والتحقيق الرقمي', N'Évaluation en sécurité défensive, forensic numérique, analyse de traces et durcissement.', 'ShieldAlert', '#0E291E', 'CYBERSEC', 1),
    ('COMM_MECA', N'Commission Maintenance Mécanique & Véhicules', N'لجنة الصيانة الميكانيكية والعربات', N'Diagnostic de pannes moteur, métrologie, électromécanique et engins d''intervention.', 'Wrench', '#2D6A4F', 'MECA_AUTO', 1),
    ('COMM_ELEC', N'Commission Électronique & Systèmes Embarqués', N'لجنة الإلكترونيات والأنظمة المدمجة', N'Électronique appliquée, contrôle des capteurs, soudure CMS et avionique embarquée.', 'Cpu', '#40916C', 'ELEC_SYS', 1),
    ('COMM_POLICE_SCIENTIFIQUE', N'Commission Police Scientifique & Criminalistique', N'لجنة الشرطة التقنية والعلمية', N'Relevé de traces papillaires, balistique, prélèvements ADN et scène de crime.', 'Microscope', '#52B788', 'POLICE_SCIENTIFIQUE', 1),
    ('COMM_LOGISTIQUE', N'Commission Logistique Opérationnelle & Matériel', N'لجنة اللوجستيك العملياتي والعتاد', N'Gestion des flux, armement, inventaires réglementaires et logistique projetée.', 'Boxes', '#1B4332', 'LOGISTIQUE', 1)
) AS Source (Code, Nom, NomAr, Description, Icone, Couleur, DomaineCode, EstActive)
ON Target.Code = Source.Code
WHEN MATCHED THEN
    UPDATE SET 
        Nom = Source.Nom,
        NomAr = Source.NomAr,
        Description = Source.Description,
        Icone = Source.Icone,
        Couleur = Source.Couleur,
        DomaineCode = Source.DomaineCode,
        EstActive = Source.EstActive,
        UpdatedAt = SYSUTCDATETIME()
WHEN NOT MATCHED THEN
    INSERT (Code, Nom, NomAr, Description, Icone, Couleur, DomaineCode, EstActive, CreatedAt, UpdatedAt)
    VALUES (Source.Code, Source.Nom, Source.NomAr, Source.Description, Source.Icone, Source.Couleur, Source.DomaineCode, Source.EstActive, SYSUTCDATETIME(), SYSUTCDATETIME());
GO

-- 10. Compte Démo Membre Commission (Adjudant-Chef Berrada - Commission Informatique & Réseaux)
-- Mot de passe haché bcrypt pour 'Gendarme2026!' : $2a$10$wT5f...
IF NOT EXISTS (SELECT * FROM dbo.Utilisateurs WHERE Matricule = 'COMM-001')
BEGIN
    INSERT INTO dbo.Utilisateurs (
        Matricule, Email, MotDePasseHash, Nom, Prenom, Role, PromotionId, EstActif, CreatedAt, CompteActive
    ) VALUES (
        'COMM-001',
        'commission.tech@orient-gr.gendarmerie.fr',
        '$2a$10$vQc4M56HhZ4e5O9qKk9rquvB.K3f6W6T6K4t6F3Y9k6P2W5N7Q9W2', -- Hash standard bcrypt
        'Berrada',
        'Karim',
        'COMMISSION',
        1,
        1,
        SYSUTCDATETIME(),
        1
    );
END
ELSE
BEGIN
    UPDATE dbo.Utilisateurs 
    SET Role = 'COMMISSION', EstActif = 1 
    WHERE Matricule = 'COMM-001';
END
GO

-- Affectation du membre COMM-001 aux commissions Informatique et Réseaux
DECLARE @userId INT, @commInfoId INT, @commReseauxId INT, @adminId INT;
SELECT @userId = UtilisateurId FROM dbo.Utilisateurs WHERE Matricule = 'COMM-001';
SELECT @adminId = UtilisateurId FROM dbo.Utilisateurs WHERE Matricule = 'ADM-001';
SELECT @commInfoId = CommissionId FROM dbo.Commissions WHERE Code = 'COMM_INFO';
SELECT @commReseauxId = CommissionId FROM dbo.Commissions WHERE Code = 'COMM_RESEAUX';

IF @userId IS NOT NULL AND @commInfoId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT * FROM dbo.CommissionMembers WHERE UtilisateurId = @userId AND CommissionId = @commInfoId)
    BEGIN
        INSERT INTO dbo.CommissionMembers (CommissionId, UtilisateurId, RoleDansCommission, AffectePar, EstActif)
        VALUES (@commInfoId, @userId, 'EVALUATEUR', @adminId, 1);
    END
END

IF @userId IS NOT NULL AND @commReseauxId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT * FROM dbo.CommissionMembers WHERE UtilisateurId = @userId AND CommissionId = @commReseauxId)
    BEGIN
        INSERT INTO dbo.CommissionMembers (CommissionId, UtilisateurId, RoleDansCommission, AffectePar, EstActif)
        VALUES (@commReseauxId, @userId, 'EVALUATEUR', @adminId, 1);
    END
END
GO

