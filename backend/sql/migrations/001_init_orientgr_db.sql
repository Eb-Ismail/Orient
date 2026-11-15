-- ==============================================================================
-- ORIENT-GR ÉLÈVE — MIGRATION SQL SERVER PRODUCTION (NON DESTRUCTIVE)
-- Instance cible : .\CLASS (Windows Authentication)
-- Base cible     : OrientGR_DB
-- Ne supprime ni ne modifie aucune autre base (EleveGend, SuiviJudiciaire, etc.)
-- ==============================================================================

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'OrientGR_DB')
BEGIN
    CREATE DATABASE [OrientGR_DB];
END
GO

USE [OrientGR_DB];
GO

SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
GO

-- 1. Promotions
IF OBJECT_ID(N'dbo.Promotions', N'U') IS NULL
CREATE TABLE dbo.Promotions (
    PromotionId INT IDENTITY(1,1) PRIMARY KEY,
    Code NVARCHAR(50) NOT NULL UNIQUE,
    Nom NVARCHAR(255) NOT NULL,
    Ecole NVARCHAR(150) NOT NULL DEFAULT N'École de Gendarmerie Royale',
    DateDebut DATE NOT NULL,
    DateFin DATE NOT NULL,
    Statut NVARCHAR(50) NOT NULL DEFAULT 'ACTIVE' CHECK (Statut IN ('PREPARATION', 'ACTIVE', 'CLOTUREE', 'ARCHIVEE')),
    EffectifTotal INT NOT NULL DEFAULT 0,
    Description NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

-- 2. Utilisateurs (ADMIN, ELEVE, INSTRUCTEUR)
IF OBJECT_ID(N'dbo.Utilisateurs', N'U') IS NULL
CREATE TABLE dbo.Utilisateurs (
    UtilisateurId INT IDENTITY(1,1) PRIMARY KEY,
    Matricule NVARCHAR(50) NOT NULL UNIQUE,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    MotDePasseHash NVARCHAR(255) NOT NULL,
    Nom NVARCHAR(100) NOT NULL,
    Prenom NVARCHAR(100) NOT NULL,
    Role NVARCHAR(20) NOT NULL CHECK (Role IN ('ADMIN', 'ELEVE', 'INSTRUCTEUR')),
    PromotionId INT NULL,
    ClassementInitial INT NULL,
    Age INT NULL,
    Ville NVARCHAR(100) NULL,
    Telephone NVARCHAR(50) NULL,
    NoteFormationPro FLOAT NULL,
    AptitudePhysique FLOAT NULL,
    StatutMedical NVARCHAR(50) NOT NULL DEFAULT 'SIGYCOP_VALIDE' CHECK (StatutMedical IN ('SIGYCOP_VALIDE', 'RESTRICTION_TEMPORAIRE', 'INAPTE_TERRAIN', 'DEROGATION_REQUISE')),
    TailleCm INT NULL,
    PoidsKg FLOAT NULL,
    VisionSIGYCOP_Y INT NULL,
    MoyennesMatieres NVARCHAR(MAX) NULL,
    CompetencesPratiques NVARCHAR(MAX) NULL,
    PreferencesSpecialites NVARCHAR(MAX) NULL,
    ExperiencesDeclarees NVARCHAR(MAX) NULL,
    EstActif BIT NOT NULL DEFAULT 1,
    DerniereConnexion DATETIME2 NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Utilisateurs_Promotions FOREIGN KEY (PromotionId) REFERENCES dbo.Promotions(PromotionId) ON DELETE SET NULL
);
GO

-- 3. Spécialités (7 officielles unifiées + compatibilité anciens codes)
IF OBJECT_ID(N'dbo.Specialites', N'U') IS NULL
CREATE TABLE dbo.Specialites (
    SpecialiteId INT IDENTITY(1,1) PRIMARY KEY,
    Code NVARCHAR(50) NOT NULL UNIQUE,
    Intitule NVARCHAR(255) NOT NULL,
    Subdivision NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    MissionsPrincipales NVARCHAR(MAX) NOT NULL,
    Icone NVARCHAR(100) NOT NULL DEFAULT 'Shield',
    PlacesDisponibles INT NOT NULL DEFAULT 10,
    EstActive BIT NOT NULL DEFAULT 1,
    EstLegacy BIT NOT NULL DEFAULT 0,
    CompetencesAttendues NVARCHAR(MAX) NULL,
    TestsAssocies NVARCHAR(MAX) NULL,
    MatieresAcademiquesPertinentes NVARCHAR(MAX) NULL,
    PoidsNotesAcademiques FLOAT NOT NULL DEFAULT 0.25,
    PoidsRaisonnement FLOAT NOT NULL DEFAULT 0.30,
    PoidsCompetencesSpecifiques FLOAT NOT NULL DEFAULT 0.25,
    PoidsSituationsPro FLOAT NOT NULL DEFAULT 0.20,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

-- 4. Domaines de compétences
IF OBJECT_ID(N'dbo.DomainesCompetences', N'U') IS NULL
CREATE TABLE dbo.DomainesCompetences (
    DomaineId INT IDENTITY(1,1) PRIMARY KEY,
    Code NVARCHAR(50) NOT NULL UNIQUE,
    Intitule NVARCHAR(150) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    PoidsDefaut FLOAT NOT NULL DEFAULT 1.0
);
GO

-- 5. Conditions d'éligibilité par spécialité
IF OBJECT_ID(N'dbo.ConditionsEligibilite', N'U') IS NULL
CREATE TABLE dbo.ConditionsEligibilite (
    ConditionId INT IDENTITY(1,1) PRIMARY KEY,
    SpecialiteId INT NOT NULL,
    TypeCondition NVARCHAR(50) NOT NULL CHECK (TypeCondition IN (
        'TAILLE_MIN', 'TAILLE_MAX', 'POIDS_MEDICAL', 'VISION', 'APTITUDE_PHYSIQUE',
        'COMPETENCE_TECHNIQUE', 'NOTE_MIN_FORMATION', 'NOTE_MIN_MATIERE',
        'MEDICAL', 'SCORE_MIN_DOMAINE', 'CLASSEMENT_MAX', 'AUTRE'
    )),
    CibleCondition NVARCHAR(100) NOT NULL,
    Operateur NVARCHAR(10) NOT NULL CHECK (Operateur IN ('<=', '>=', '==', 'IN', 'CONTAINS')),
    Seuil NVARCHAR(100) NOT NULL,
    EstObligatoire BIT NOT NULL DEFAULT 1,
    SourceOfficielle NVARCHAR(255) NULL,
    DateValidation DATE NULL,
    StatutValidation NVARCHAR(50) NOT NULL DEFAULT 'VALIDEE_OFFICIELLE' CHECK (StatutValidation IN (
        'VALIDEE_OFFICIELLE', 'PROVISOIRE_DEMO', 'A_VERIFIER', 'EN_ATTENTE_VALIDATION'
    )),
    Description NVARCHAR(MAX) NOT NULL,
    CONSTRAINT FK_Conditions_Specialites FOREIGN KEY (SpecialiteId) REFERENCES dbo.Specialites(SpecialiteId) ON DELETE CASCADE
);
GO

-- 6. Poids compétences / spécialités
IF OBJECT_ID(N'dbo.PoidsCompetenceSpecialite', N'U') IS NULL
CREATE TABLE dbo.PoidsCompetenceSpecialite (
    PoidsId INT IDENTITY(1,1) PRIMARY KEY,
    SpecialiteId INT NOT NULL,
    DomaineId INT NOT NULL,
    Coefficient FLOAT NOT NULL DEFAULT 1.0,
    CONSTRAINT FK_Poids_Specialites FOREIGN KEY (SpecialiteId) REFERENCES dbo.Specialites(SpecialiteId) ON DELETE CASCADE,
    CONSTRAINT FK_Poids_Domaines FOREIGN KEY (DomaineId) REFERENCES dbo.DomainesCompetences(DomaineId) ON DELETE CASCADE
);
GO

-- 7. Vœux de spécialités normalisés par élève
IF OBJECT_ID(N'dbo.PreferencesSpecialites', N'U') IS NULL
CREATE TABLE dbo.PreferencesSpecialites (
    PreferenceId INT IDENTITY(1,1) PRIMARY KEY,
    UtilisateurId INT NOT NULL,
    CodeSpecialite NVARCHAR(50) NOT NULL,
    Rang INT NOT NULL CHECK (Rang >= 1),
    Motivation NVARCHAR(MAX) NULL,
    UpdatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Preferences_Utilisateurs FOREIGN KEY (UtilisateurId) REFERENCES dbo.Utilisateurs(UtilisateurId) ON DELETE CASCADE,
    CONSTRAINT UQ_Preferences_User_Code UNIQUE (UtilisateurId, CodeSpecialite)
);
GO

-- 8. Tests QCM officiels
IF OBJECT_ID(N'dbo.Tests', N'U') IS NULL
CREATE TABLE dbo.Tests (
    TestId INT IDENTITY(1,1) PRIMARY KEY,
    Code NVARCHAR(50) NOT NULL UNIQUE,
    Titre NVARCHAR(255) NOT NULL,
    TitreFr NVARCHAR(255) NULL,
    Description NVARCHAR(MAX) NOT NULL,
    DureeMinutes INT NOT NULL DEFAULT 15,
    NombreQuestions INT NOT NULL DEFAULT 10,
    CategoriesIncluses NVARCHAR(MAX) NULL,
    DifficulteCible NVARCHAR(20) NOT NULL DEFAULT 'MOYEN',
    AutoriserRetour BIT NOT NULL DEFAULT 1,
    AutoriserPause BIT NOT NULL DEFAULT 1,
    AutoriserReprise BIT NOT NULL DEFAULT 1,
    NombreTentativesMax INT NOT NULL DEFAULT 3,
    SeuilReussite FLOAT NOT NULL DEFAULT 60.0,
    SelectionAleatoire BIT NOT NULL DEFAULT 0,
    SeedReproductible BIT NOT NULL DEFAULT 1,
    QuestionsFixees NVARCHAR(MAX) NULL,
    CompetencesAssociees NVARCHAR(MAX) NULL,
    Version INT NOT NULL DEFAULT 1,
    EstActif BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

-- 9. Banque de Questions
IF OBJECT_ID(N'dbo.Questions', N'U') IS NULL
CREATE TABLE dbo.Questions (
    QuestionId INT IDENTITY(1,1) PRIMARY KEY,
    TestId INT NOT NULL,
    DomaineId INT NULL,
    CategorieCode NVARCHAR(60) NULL,
    Code NVARCHAR(50) NOT NULL,
    Enonce NVARCHAR(MAX) NOT NULL,
    ContexteSituationnel NVARCHAR(MAX) NULL,
    TypeQuestion NVARCHAR(50) NOT NULL DEFAULT 'QCM_UNIQUE' CHECK (TypeQuestion IN (
        'QCM_UNIQUE', 'QCM_MULTIPLE', 'SUITE_NUMERIQUE', 'RAISONNEMENT_LOGIQUE',
        'ANALOGIE', 'OBSERVATION', 'SITUATION_PRO', 'SCHEMA_SVG', 'QUESTION_SUBJECTIVE'
    )),
    Difficulte NVARCHAR(20) NOT NULL DEFAULT 'MOYEN' CONSTRAINT CK_Questions_Difficulte CHECK (Difficulte IN ('FACILE', 'MOYEN', 'AVANCE', 'DIFFICILE', 'EXPERT')),
    Points INT NOT NULL DEFAULT 1,
    TempsLimiteSecondes INT NULL,
    SchemaSVG NVARCHAR(MAX) NULL,
    Explication NVARCHAR(MAX) NULL,
    CompetencesAssociees NVARCHAR(MAX) NULL,
    SpecialitesAssociees NVARCHAR(MAX) NULL,
    BaremeSubjectif NVARCHAR(MAX) NULL,
    OrdreAffichage INT NOT NULL DEFAULT 1,
    EstActive BIT NOT NULL DEFAULT 1,
    EstArchivee BIT NOT NULL DEFAULT 0,
    Version INT NOT NULL DEFAULT 1,
    CONSTRAINT FK_Questions_Tests FOREIGN KEY (TestId) REFERENCES dbo.Tests(TestId) ON DELETE CASCADE,
    CONSTRAINT FK_Questions_Domaines FOREIGN KEY (DomaineId) REFERENCES dbo.DomainesCompetences(DomaineId)
);
GO

-- 10. Options de réponse
IF OBJECT_ID(N'dbo.OptionsReponse', N'U') IS NULL
CREATE TABLE dbo.OptionsReponse (
    OptionId INT IDENTITY(1,1) PRIMARY KEY,
    QuestionId INT NOT NULL,
    LettreOption NVARCHAR(5) NOT NULL,
    EnonceOption NVARCHAR(MAX) NOT NULL,
    SchemaSVG NVARCHAR(MAX) NULL,
    EstCorrecte BIT NOT NULL DEFAULT 0,
    PoidsOption FLOAT NOT NULL DEFAULT 1.0,
    CONSTRAINT FK_Options_Questions FOREIGN KEY (QuestionId) REFERENCES dbo.Questions(QuestionId) ON DELETE CASCADE
);
GO

-- 11. Sessions de test QCM
IF OBJECT_ID(N'dbo.SessionsTest', N'U') IS NULL
CREATE TABLE dbo.SessionsTest (
    SessionId INT IDENTITY(1,1) PRIMARY KEY,
    UtilisateurId INT NOT NULL,
    TestId INT NOT NULL,
    TentativeNumero INT NOT NULL DEFAULT 1,
    SeedGeneration INT NULL,
    QuestionsSnapshot NVARCHAR(MAX) NULL,
    ConfigSnapshot NVARCHAR(MAX) NULL,
    CandidatSnapshot NVARCHAR(MAX) NULL,
    DateDebut DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    DateFinMaxServeur DATETIME2 NULL,
    DateFin DATETIME2 NULL,
    DureeEcouleeSecondes INT NOT NULL DEFAULT 0,
    Statut NVARCHAR(50) NOT NULL DEFAULT 'EN_COURS' CHECK (Statut IN (
        'EN_ATTENTE', 'EN_COURS', 'PAUSE', 'EN_ATTENTE_EVALUATION', 'TERMINE', 'ABANDONNE'
    )),
    ScoreBrut FLOAT NULL,
    ScoreTotal FLOAT NULL,
    ScorePourcentage FLOAT NULL,
    IndiceConfiance FLOAT NULL,
    ProfilIncomplet BIT NOT NULL DEFAULT 0,
    DonneesManquantes NVARCHAR(MAX) NULL,
    Progression INT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Sessions_Utilisateurs FOREIGN KEY (UtilisateurId) REFERENCES dbo.Utilisateurs(UtilisateurId) ON DELETE CASCADE,
    CONSTRAINT FK_Sessions_Tests FOREIGN KEY (TestId) REFERENCES dbo.Tests(TestId)
);
GO

-- 12. Réponses enregistrées par session QCM
IF OBJECT_ID(N'dbo.ReponsesSession', N'U') IS NULL
CREATE TABLE dbo.ReponsesSession (
    ReponseSessionId INT IDENTITY(1,1) PRIMARY KEY,
    SessionId INT NOT NULL,
    QuestionId INT NOT NULL,
    OptionIdSelectionnee INT NULL,
    ReponseTexte NVARCHAR(MAX) NULL,
    EstCorrecte BIT NULL,
    TempsReponseSecondes INT NOT NULL DEFAULT 0,
    DateReponse DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Reponses_Sessions FOREIGN KEY (SessionId) REFERENCES dbo.SessionsTest(SessionId) ON DELETE CASCADE,
    CONSTRAINT FK_Reponses_Questions FOREIGN KEY (QuestionId) REFERENCES dbo.Questions(QuestionId),
    CONSTRAINT FK_Reponses_Options FOREIGN KEY (OptionIdSelectionnee) REFERENCES dbo.OptionsReponse(OptionId)
);
GO

-- 13. Évaluations subjectives
IF OBJECT_ID(N'dbo.EvaluationsSubjectives', N'U') IS NULL
CREATE TABLE dbo.EvaluationsSubjectives (
    EvaluationId INT IDENTITY(1,1) PRIMARY KEY,
    ReponseSessionId INT NOT NULL,
    EvaluateurId INT NOT NULL,
    PointsAttribues FLOAT NOT NULL,
    CommentaireEvaluateur NVARCHAR(MAX) NULL,
    DateEvaluation DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Eval_Reponses FOREIGN KEY (ReponseSessionId) REFERENCES dbo.ReponsesSession(ReponseSessionId) ON DELETE CASCADE,
    CONSTRAINT FK_Eval_Evaluateur FOREIGN KEY (EvaluateurId) REFERENCES dbo.Utilisateurs(UtilisateurId)
);
GO

-- 14. Résultats détaillés par domaine
IF OBJECT_ID(N'dbo.ResultatsDomaines', N'U') IS NULL
CREATE TABLE dbo.ResultatsDomaines (
    ResultatDomaineId INT IDENTITY(1,1) PRIMARY KEY,
    SessionId INT NOT NULL,
    DomaineId INT NOT NULL,
    ScoreObtenu FLOAT NOT NULL,
    ScoreMax FLOAT NOT NULL,
    Pourcentage FLOAT NOT NULL,
    CONSTRAINT FK_Resultats_Sessions FOREIGN KEY (SessionId) REFERENCES dbo.SessionsTest(SessionId) ON DELETE CASCADE,
    CONSTRAINT FK_Resultats_Domaines FOREIGN KEY (DomaineId) REFERENCES dbo.DomainesCompetences(DomaineId)
);
GO

-- 15. Recommandations d'orientation calculées par session
IF OBJECT_ID(N'dbo.RecommandationsSpecialites', N'U') IS NULL
CREATE TABLE dbo.RecommandationsSpecialites (
    RecommandationId INT IDENTITY(1,1) PRIMARY KEY,
    SessionId INT NOT NULL,
    SpecialiteId INT NOT NULL,
    ScoreCompatibilite FLOAT NOT NULL,
    RangCompatibilite INT NOT NULL,
    StatutEligibilite NVARCHAR(50) NOT NULL CHECK (StatutEligibilite IN ('ELIGIBLE', 'SOUS_RESERVE', 'NON_ELIGIBLE', 'A_VERIFIER')),
    ConditionsSatisfaites NVARCHAR(MAX) NULL,
    ConditionsNonSatisfaites NVARCHAR(MAX) NULL,
    ConditionsAVerifier NVARCHAR(MAX) NULL,
    CompetencesFortes NVARCHAR(MAX) NULL,
    CompetencesADevelopper NVARCHAR(MAX) NULL,
    FacteursPrincipaux NVARCHAR(MAX) NULL,
    AvisSysteme NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Recommandations_Sessions FOREIGN KEY (SessionId) REFERENCES dbo.SessionsTest(SessionId) ON DELETE CASCADE,
    CONSTRAINT FK_Recommandations_Specialites FOREIGN KEY (SpecialiteId) REFERENCES dbo.Specialites(SpecialiteId)
);
GO

-- 16. Paramètres système persistés (dont orientationResultsVisibility)
IF OBJECT_ID(N'dbo.SystemSettings', N'U') IS NULL
CREATE TABLE dbo.SystemSettings (
    SettingKey NVARCHAR(100) PRIMARY KEY,
    SettingValue NVARCHAR(MAX) NOT NULL,
    Description NVARCHAR(255) NULL,
    UpdatedBy INT NULL,
    UpdatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_SystemSettings_User FOREIGN KEY (UpdatedBy) REFERENCES dbo.Utilisateurs(UtilisateurId) ON DELETE SET NULL
);
GO

-- 17. Parcours IA Élève (Récit, compétences détectées, analyse)
IF OBJECT_ID(N'dbo.StudentJourneys', N'U') IS NULL
CREATE TABLE dbo.StudentJourneys (
    JourneyId INT IDENTITY(1,1) PRIMARY KEY,
    UtilisateurId INT NOT NULL UNIQUE,
    LanguePreferee NVARCHAR(20) NOT NULL DEFAULT 'fr',
    RecitPersonnel NVARCHAR(MAX) NULL,
    ExperiencesJson NVARCHAR(MAX) NULL,
    CompetencesDetecteesJson NVARCHAR(MAX) NULL,
    AnalyseProfilJson NVARCHAR(MAX) NULL,
    SnapshotsJson NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Journeys_Utilisateurs FOREIGN KEY (UtilisateurId) REFERENCES dbo.Utilisateurs(UtilisateurId) ON DELETE CASCADE
);
GO

-- 18. Historique des messages d'entretien IA (Écrit & Vocal)
IF OBJECT_ID(N'dbo.JourneyMessages', N'U') IS NULL
CREATE TABLE dbo.JourneyMessages (
    MessageId INT IDENTITY(1,1) PRIMARY KEY,
    JourneyId INT NOT NULL,
    UtilisateurId INT NOT NULL,
    RoleMessage NVARCHAR(20) NOT NULL CHECK (RoleMessage IN ('assistant', 'user', 'system')),
    ModeInteraction NVARCHAR(20) NOT NULL DEFAULT 'text' CHECK (ModeInteraction IN ('text', 'voice')),
    Langue NVARCHAR(20) NOT NULL DEFAULT 'fr',
    Contenu NVARCHAR(MAX) NOT NULL,
    Provider NVARCHAR(80) NULL,
    Modele NVARCHAR(120) NULL,
    MetadataJson NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_JourneyMessages_Journeys FOREIGN KEY (JourneyId) REFERENCES dbo.StudentJourneys(JourneyId) ON DELETE CASCADE,
    CONSTRAINT FK_JourneyMessages_Users FOREIGN KEY (UtilisateurId) REFERENCES dbo.Utilisateurs(UtilisateurId)
);
GO

-- 19. Talent Radar (7 dimensions x 3 couches)
IF OBJECT_ID(N'dbo.StudentTalentProfiles', N'U') IS NULL
CREATE TABLE dbo.StudentTalentProfiles (
    UtilisateurId INT PRIMARY KEY,
    DeclareJson NVARCHAR(MAX) NOT NULL,
    ObserveJson NVARCHAR(MAX) NOT NULL,
    ValideJson NVARCHAR(MAX) NULL,
    StatutValidation NVARCHAR(50) NOT NULL DEFAULT 'INITIALISE',
    DerniereMiseAJourSource NVARCHAR(100) NULL,
    UpdatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_TalentProfiles_Utilisateurs FOREIGN KEY (UtilisateurId) REFERENCES dbo.Utilisateurs(UtilisateurId) ON DELETE CASCADE
);
GO

-- 20. Sessions Simulation Center (6 exercices interactifs)
IF OBJECT_ID(N'dbo.SimulationCenterSessions', N'U') IS NULL
CREATE TABLE dbo.SimulationCenterSessions (
    CenterSessionId INT IDENTITY(1,1) PRIMARY KEY,
    UtilisateurId INT NOT NULL,
    ExerciseCode NVARCHAR(60) NOT NULL,
    Statut NVARCHAR(40) NOT NULL DEFAULT 'TERMINEE',
    ScorePourcentage FLOAT NOT NULL DEFAULT 0,
    DureeSecondes INT NOT NULL DEFAULT 0,
    TempsFormat NVARCHAR(40) NULL,
    ReponsesJson NVARCHAR(MAX) NULL,
    AnomaliesJson NVARCHAR(MAX) NULL,
    FeedbackJson NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CompletedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_CenterSessions_Utilisateurs FOREIGN KEY (UtilisateurId) REFERENCES dbo.Utilisateurs(UtilisateurId) ON DELETE CASCADE
);
GO

-- 21. Évaluations & Visas Instructeurs (Supervision 360°)
IF OBJECT_ID(N'dbo.InstructorEvaluations', N'U') IS NULL
CREATE TABLE dbo.InstructorEvaluations (
    InstructorEvalId INT IDENTITY(1,1) PRIMARY KEY,
    UtilisateurId INT NOT NULL,
    InstructeurId INT NOT NULL,
    ScoresValidesJson NVARCHAR(MAX) NOT NULL,
    CommentaireOfficiel NVARCHAR(MAX) NULL,
    SpecialiteRecommandeeCode NVARCHAR(50) NULL,
    DecisionStatut NVARCHAR(50) NOT NULL DEFAULT 'VALIDE_PAR_FORMATEUR',
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_InstructorEval_Student FOREIGN KEY (UtilisateurId) REFERENCES dbo.Utilisateurs(UtilisateurId) ON DELETE CASCADE,
    CONSTRAINT FK_InstructorEval_Instructor FOREIGN KEY (InstructeurId) REFERENCES dbo.Utilisateurs(UtilisateurId)
);
GO

-- 22. Simulations Professionnelles v1 & Sessions
IF OBJECT_ID(N'dbo.SimulationSessions', N'U') IS NULL
CREATE TABLE dbo.SimulationSessions (
    SimSessionId INT IDENTITY(1,1) PRIMARY KEY,
    UtilisateurId INT NOT NULL,
    ModuleCode NVARCHAR(60) NOT NULL,
    Statut NVARCHAR(40) NOT NULL DEFAULT 'EN_COURS',
    ScorePourcentage FLOAT NULL,
    TasksSnapshotJson NVARCHAR(MAX) NULL,
    ReponsesJson NVARCHAR(MAX) NULL,
    CompetencyScoresJson NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CompletedAt DATETIME2 NULL,
    CONSTRAINT FK_SimSessions_Utilisateurs FOREIGN KEY (UtilisateurId) REFERENCES dbo.Utilisateurs(UtilisateurId) ON DELETE CASCADE
);
GO

-- 23. Arbitrage / Propositions d'Orientation Administratives
IF OBJECT_ID(N'dbo.OrientationProposals', N'U') IS NULL
CREATE TABLE dbo.OrientationProposals (
    ProposalId INT IDENTITY(1,1) PRIMARY KEY,
    UtilisateurId INT NOT NULL,
    SpecialiteProposeeCode NVARCHAR(50) NOT NULL,
    StatutArbitrage NVARCHAR(50) NOT NULL DEFAULT 'EN_ATTENTE' CONSTRAINT CK_OrientationProposals_Statut CHECK (StatutArbitrage IN ('EN_ATTENTE', 'PROPOSEE', 'VALIDEE', 'VALIDEE_ADMIN', 'REFUSEE', 'REJETEE', 'MODIFIEE', 'AJUSTEE')),
    DecisionAdmin NVARCHAR(MAX) NULL,
    ValidateurId INT NULL,
    ScoreGlobal FLOAT NULL,
    UpdatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Proposals_Student FOREIGN KEY (UtilisateurId) REFERENCES dbo.Utilisateurs(UtilisateurId) ON DELETE CASCADE,
    CONSTRAINT FK_Proposals_Validator FOREIGN KEY (ValidateurId) REFERENCES dbo.Utilisateurs(UtilisateurId)
);
GO

-- 24. Catégories d'Ateliers Pratiques
IF OBJECT_ID(N'dbo.WorkshopCategories', N'U') IS NULL
CREATE TABLE dbo.WorkshopCategories (
    CategoryId NVARCHAR(50) PRIMARY KEY,
    Code NVARCHAR(50) NOT NULL UNIQUE,
    IntituleFr NVARCHAR(150) NOT NULL,
    IntituleAr NVARCHAR(150) NULL,
    Icone NVARCHAR(60) NULL,
    Couleur NVARCHAR(40) NULL,
    DescriptionFr NVARCHAR(MAX) NULL,
    DescriptionAr NVARCHAR(MAX) NULL,
    SousDomainesJson NVARCHAR(MAX) NULL,
    SpecialitesCiblesJson NVARCHAR(MAX) NULL
);
GO

-- 25. Catalogue des Ateliers Pratiques
IF OBJECT_ID(N'dbo.Workshops', N'U') IS NULL
CREATE TABLE dbo.Workshops (
    WorkshopId INT PRIMARY KEY,
    CategoryId NVARCHAR(50) NOT NULL,
    Code NVARCHAR(50) NOT NULL UNIQUE,
    Titre NVARCHAR(255) NOT NULL,
    TitreAr NVARCHAR(255) NULL,
    SousDomaine NVARCHAR(150) NULL,
    Description NVARCHAR(MAX) NULL,
    ObjectifsJson NVARCHAR(MAX) NULL,
    StepsJson NVARCHAR(MAX) NULL,
    CriteriaJson NVARCHAR(MAX) NULL,
    DureeMinutes INT NOT NULL DEFAULT 60,
    Niveau NVARCHAR(40) NULL,
    NoteMax FLOAT NOT NULL DEFAULT 20.0,
    EstActif BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Workshops_Categories FOREIGN KEY (CategoryId) REFERENCES dbo.WorkshopCategories(CategoryId)
);
GO

-- 26. Assignations, Soumissions et Évaluations d'Ateliers Élèves
IF OBJECT_ID(N'dbo.WorkshopAssignments', N'U') IS NULL
CREATE TABLE dbo.WorkshopAssignments (
    AssignationId INT IDENTITY(1,1) PRIMARY KEY,
    WorkshopId INT NOT NULL,
    UtilisateurId INT NOT NULL,
    InstructeurId INT NULL,
    Statut NVARCHAR(40) NOT NULL DEFAULT 'ASSIGNE',
    SoumissionJson NVARCHAR(MAX) NULL,
    NoteSur20 FLOAT NULL,
    ScoresCriteresJson NVARCHAR(MAX) NULL,
    CommentaireInstructeur NVARCHAR(MAX) NULL,
    DateAssignation DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    DateSoumission DATETIME2 NULL,
    DateEvaluation DATETIME2 NULL,
    CONSTRAINT FK_WorkshopAssign_Workshop FOREIGN KEY (WorkshopId) REFERENCES dbo.Workshops(WorkshopId) ON DELETE CASCADE,
    CONSTRAINT FK_WorkshopAssign_Student FOREIGN KEY (UtilisateurId) REFERENCES dbo.Utilisateurs(UtilisateurId) ON DELETE CASCADE,
    CONSTRAINT FK_WorkshopAssign_Instructor FOREIGN KEY (InstructeurId) REFERENCES dbo.Utilisateurs(UtilisateurId)
);
GO

-- 27. Référentiel des 12 Compétences & Matrice Spécialité
IF OBJECT_ID(N'dbo.Competencies', N'U') IS NULL
CREATE TABLE dbo.Competencies (
    CompetencyCode NVARCHAR(80) PRIMARY KEY,
    Numero INT NOT NULL,
    NomFr NVARCHAR(255) NOT NULL,
    NomAr NVARCHAR(255) NOT NULL,
    DomaineCode NVARCHAR(50) NULL,
    DescriptionAr NVARCHAR(MAX) NULL,
    CriteresJson NVARCHAR(MAX) NULL,
    PoidsDefaut FLOAT NOT NULL DEFAULT 1.0,
    LegacyTagsJson NVARCHAR(MAX) NULL
);
GO

IF OBJECT_ID(N'dbo.SpecialtyCompetencyMatrix', N'U') IS NULL
CREATE TABLE dbo.SpecialtyCompetencyMatrix (
    MatrixId INT IDENTITY(1,1) PRIMARY KEY,
    SpecialiteCode NVARCHAR(50) NOT NULL,
    CompetencyCode NVARCHAR(80) NOT NULL,
    Poids FLOAT NOT NULL DEFAULT 1.0,
    Justification NVARCHAR(MAX) NULL,
    CONSTRAINT FK_Matrix_Competency FOREIGN KEY (CompetencyCode) REFERENCES dbo.Competencies(CompetencyCode) ON DELETE CASCADE,
    CONSTRAINT UQ_Matrix_Spec_Comp UNIQUE (SpecialiteCode, CompetencyCode)
);
GO

-- 28. Journal d'audit
IF OBJECT_ID(N'dbo.LogsActivite', N'U') IS NULL
CREATE TABLE dbo.LogsActivite (
    LogId INT IDENTITY(1,1) PRIMARY KEY,
    UtilisateurId INT NULL,
    Action NVARCHAR(100) NOT NULL,
    Cible NVARCHAR(255) NOT NULL,
    Details NVARCHAR(MAX) NULL,
    AdresseIP NVARCHAR(50) NULL,
    DateLog DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

-- ==============================================================================
-- INDEX DE PERFORMANCE (IDEMPOTENTS)
-- ==============================================================================
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'IX_Utilisateurs_PromotionId')
    CREATE INDEX IX_Utilisateurs_PromotionId ON dbo.Utilisateurs(PromotionId);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'IX_Utilisateurs_Role')
    CREATE INDEX IX_Utilisateurs_Role ON dbo.Utilisateurs(Role);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'IX_Preferences_UtilisateurId')
    CREATE INDEX IX_Preferences_UtilisateurId ON dbo.PreferencesSpecialites(UtilisateurId);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'IX_SessionsTest_UtilisateurId')
    CREATE INDEX IX_SessionsTest_UtilisateurId ON dbo.SessionsTest(UtilisateurId);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'IX_ReponsesSession_SessionId')
    CREATE INDEX IX_ReponsesSession_SessionId ON dbo.ReponsesSession(SessionId);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'IX_Questions_TestId')
    CREATE INDEX IX_Questions_TestId ON dbo.Questions(TestId);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'IX_OptionsReponse_QuestionId')
    CREATE INDEX IX_OptionsReponse_QuestionId ON dbo.OptionsReponse(QuestionId);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'IX_Recommandations_SessionId')
    CREATE INDEX IX_Recommandations_SessionId ON dbo.RecommandationsSpecialites(SessionId);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'IX_Conditions_SpecialiteId')
    CREATE INDEX IX_Conditions_SpecialiteId ON dbo.ConditionsEligibilite(SpecialiteId);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'IX_JourneyMessages_JourneyId')
    CREATE INDEX IX_JourneyMessages_JourneyId ON dbo.JourneyMessages(JourneyId, CreatedAt);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'IX_SimCenterSessions_User')
    CREATE INDEX IX_SimCenterSessions_User ON dbo.SimulationCenterSessions(UtilisateurId, CompletedAt DESC);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'IX_InstructorEval_User')
    CREATE INDEX IX_InstructorEval_User ON dbo.InstructorEvaluations(UtilisateurId, CreatedAt DESC);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'IX_WorkshopAssign_User')
    CREATE INDEX IX_WorkshopAssign_User ON dbo.WorkshopAssignments(UtilisateurId, Statut);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'IX_LogsActivite_Date')
    CREATE INDEX IX_LogsActivite_Date ON dbo.LogsActivite(DateLog DESC);
GO

PRINT N'Base OrientGR_DB et schéma relationnel complet initialisés avec succès.';
GO

