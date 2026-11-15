-- ==============================================================================
-- APPLICATION ORIENT-GR - BASE DE DONNÉES SQL SERVER (T-SQL)
-- Architecture de données pour l'orientation et l'évaluation des élèves gendarmes
-- ==============================================================================

USE [master];
GO

-- Création de la base si elle n'existe pas
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'OrientGR_DB')
BEGIN
    CREATE DATABASE [OrientGR_DB];
END
GO

USE [OrientGR_DB];
GO

-- Suppression des contraintes et tables dans l'ordre de dépendance
IF OBJECT_ID(N'dbo.EvaluationsSubjectives', N'U') IS NOT NULL DROP TABLE dbo.EvaluationsSubjectives;
IF OBJECT_ID(N'dbo.LogsActivite', N'U') IS NOT NULL DROP TABLE dbo.LogsActivite;
IF OBJECT_ID(N'dbo.RecommandationsSpecialites', N'U') IS NOT NULL DROP TABLE dbo.RecommandationsSpecialites;
IF OBJECT_ID(N'dbo.ResultatsDomaines', N'U') IS NOT NULL DROP TABLE dbo.ResultatsDomaines;
IF OBJECT_ID(N'dbo.ReponsesSession', N'U') IS NOT NULL DROP TABLE dbo.ReponsesSession;
IF OBJECT_ID(N'dbo.SessionsTest', N'U') IS NOT NULL DROP TABLE dbo.SessionsTest;
IF OBJECT_ID(N'dbo.OptionsReponse', N'U') IS NOT NULL DROP TABLE dbo.OptionsReponse;
IF OBJECT_ID(N'dbo.Questions', N'U') IS NOT NULL DROP TABLE dbo.Questions;
IF OBJECT_ID(N'dbo.Tests', N'U') IS NOT NULL DROP TABLE dbo.Tests;
IF OBJECT_ID(N'dbo.PoidsCompetenceSpecialite', N'U') IS NOT NULL DROP TABLE dbo.PoidsCompetenceSpecialite;
IF OBJECT_ID(N'dbo.ConditionsEligibilite', N'U') IS NOT NULL DROP TABLE dbo.ConditionsEligibilite;
IF OBJECT_ID(N'dbo.DomainesCompetences', N'U') IS NOT NULL DROP TABLE dbo.DomainesCompetences;
IF OBJECT_ID(N'dbo.Specialites', N'U') IS NOT NULL DROP TABLE dbo.Specialites;
IF OBJECT_ID(N'dbo.Utilisateurs', N'U') IS NOT NULL DROP TABLE dbo.Utilisateurs;
IF OBJECT_ID(N'dbo.Promotions', N'U') IS NOT NULL DROP TABLE dbo.Promotions;
GO

-- 1. Table des promotions d'élèves gendarmes
CREATE TABLE dbo.Promotions (
    PromotionId INT IDENTITY(1,1) PRIMARY KEY,
    Code NVARCHAR(50) NOT NULL UNIQUE,
    Nom NVARCHAR(255) NOT NULL,
    Ecole NVARCHAR(150) NOT NULL DEFAULT 'École de Gendarmerie de Rochefort',
    DateDebut DATE NOT NULL,
    DateFin DATE NOT NULL,
    Statut NVARCHAR(50) NOT NULL DEFAULT 'ACTIVE' CHECK (Statut IN ('PREPARATION', 'ACTIVE', 'CLOTUREE', 'ARCHIVEE')),
    EffectifTotal INT NOT NULL DEFAULT 0,
    Description NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

-- 2. Table des utilisateurs (Administrateurs & Élèves Gendarmes)
CREATE TABLE dbo.Utilisateurs (
    UtilisateurId INT IDENTITY(1,1) PRIMARY KEY,
    Matricule NVARCHAR(50) NOT NULL UNIQUE,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    MotDePasseHash NVARCHAR(255) NOT NULL,
    Nom NVARCHAR(100) NOT NULL,
    Prenom NVARCHAR(100) NOT NULL,
    Role NVARCHAR(20) NOT NULL CHECK (Role IN ('ADMIN', 'ELEVE')),
    PromotionId INT NULL,
    ClassementInitial INT NULL,
    NoteFormationPro FLOAT NULL, -- Note académique globale sur 20
    AptitudePhysique FLOAT NULL, -- Note sportive sur 20
    StatutMedical NVARCHAR(50) NOT NULL DEFAULT 'SIGYCOP_VALIDE' CHECK (StatutMedical IN ('SIGYCOP_VALIDE', 'RESTRICTION_TEMPORAIRE', 'INAPTE_TERRAIN', 'DEROGATION_REQUISE')),
    TailleCm INT NULL, -- Taille mesurée en cm
    PoidsKg FLOAT NULL, -- Poids médical indicatif (non utilisé pour un IMC éliminatoire automatique)
    VisionSIGYCOP_Y INT NULL, -- Score de vision 'Y' du profil SIGYCOP (1 à 6)
    MoyennesMatieres NVARCHAR(MAX) NULL, -- JSON: Moyennes académiques par matière
    CompetencesPratiques NVARCHAR(MAX) NULL, -- JSON: Compétences opérationnelles évaluées
    PreferencesSpecialites NVARCHAR(MAX) NULL, -- JSON: Voeux de spécialités classés par rang
    EstActif BIT NOT NULL DEFAULT 1,
    DerniereConnexion DATETIME2 NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Utilisateurs_Promotions FOREIGN KEY (PromotionId) REFERENCES dbo.Promotions(PromotionId) ON DELETE SET NULL
);

-- 3. Table des spécialités professionnelles
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
    CompetencesAttendues NVARCHAR(MAX) NULL, -- JSON: Compétences requises et niveau attendu
    TestsAssocies NVARCHAR(MAX) NULL, -- JSON: Codes des tests associés
    MatieresAcademiquesPertinentes NVARCHAR(MAX) NULL, -- JSON: Matières scolaires clés
    PoidsNotesAcademiques FLOAT NOT NULL DEFAULT 0.25, -- Critère 1 : Notes académiques
    PoidsRaisonnement FLOAT NOT NULL DEFAULT 0.30,      -- Critère 2 : Raisonnement & analyse
    PoidsCompetencesSpecifiques FLOAT NOT NULL DEFAULT 0.25, -- Critère 3 : Compétences spécifiques
    PoidsSituationsPro FLOAT NOT NULL DEFAULT 0.20,     -- Critère 4 : Situations professionnelles
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

-- 4. Domaines d'évaluation et compétences
CREATE TABLE dbo.DomainesCompetences (
    DomaineId INT IDENTITY(1,1) PRIMARY KEY,
    Code NVARCHAR(50) NOT NULL UNIQUE,
    Intitule NVARCHAR(150) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    PoidsDefaut FLOAT NOT NULL DEFAULT 1.0
);

-- 5. Conditions d'éligibilité par spécialité
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
    EstObligatoire BIT NOT NULL DEFAULT 1, -- 1 = Obligatoire, 0 = Indicatif
    SourceOfficielle NVARCHAR(255) NULL, -- Source officielle de la condition (ou mention paramètre provisoire)
    DateValidation DATE NULL,
    StatutValidation NVARCHAR(50) NOT NULL DEFAULT 'VALIDEE_OFFICIELLE' CHECK (StatutValidation IN (
        'VALIDEE_OFFICIELLE', 'PROVISOIRE_DEMO', 'A_VERIFIER', 'EN_ATTENTE_VALIDATION'
    )),
    Description NVARCHAR(MAX) NOT NULL,
    CONSTRAINT FK_Conditions_Specialites FOREIGN KEY (SpecialiteId) REFERENCES dbo.Specialites(SpecialiteId) ON DELETE CASCADE
);

-- 6. Coefficients des compétences pour chaque spécialité
CREATE TABLE dbo.PoidsCompetenceSpecialite (
    PoidsId INT IDENTITY(1,1) PRIMARY KEY,
    SpecialiteId INT NOT NULL,
    DomaineId INT NOT NULL,
    Coefficient FLOAT NOT NULL DEFAULT 1.0,
    CONSTRAINT FK_Poids_Specialites FOREIGN KEY (SpecialiteId) REFERENCES dbo.Specialites(SpecialiteId) ON DELETE CASCADE,
    CONSTRAINT FK_Poids_Domaines FOREIGN KEY (DomaineId) REFERENCES dbo.DomainesCompetences(DomaineId) ON DELETE CASCADE
);

-- 7. Tests d'orientation et batteries d'évaluation
CREATE TABLE dbo.Tests (
    TestId INT IDENTITY(1,1) PRIMARY KEY,
    Code NVARCHAR(50) NOT NULL UNIQUE,
    Titre NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    DureeMinutes INT NOT NULL DEFAULT 35,
    NombreQuestions INT NOT NULL DEFAULT 10,
    CategoriesIncluses NVARCHAR(MAX) NULL, -- JSON: Domaines inclus
    DifficulteCible NVARCHAR(20) NOT NULL DEFAULT 'TOUS',
    AutoriserRetour BIT NOT NULL DEFAULT 1, -- Règle de navigation
    AutoriserPause BIT NOT NULL DEFAULT 1,
    AutoriserReprise BIT NOT NULL DEFAULT 1, -- Règle de reprise
    NombreTentativesMax INT NOT NULL DEFAULT 2,
    SeuilReussite FLOAT NOT NULL DEFAULT 60.0,
    SelectionAleatoire BIT NOT NULL DEFAULT 0, -- Sélection aléatoire contrôlée
    SeedReproductible BIT NOT NULL DEFAULT 1, -- Reproductibilité pour audit
    QuestionsFixees NVARCHAR(MAX) NULL, -- JSON: Question IDs fixés si sélection manuelle
    Version INT NOT NULL DEFAULT 1,
    EstActif BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

-- 8. Banque de Questions (Objectifs QCM, logiques, suites, schémas SVG et subjectifs)
CREATE TABLE dbo.Questions (
    QuestionId INT IDENTITY(1,1) PRIMARY KEY,
    TestId INT NOT NULL,
    DomaineId INT NOT NULL,
    Code NVARCHAR(50) NOT NULL,
    Enonce NVARCHAR(MAX) NOT NULL,
    ContexteSituationnel NVARCHAR(MAX) NULL,
    TypeQuestion NVARCHAR(50) NOT NULL CHECK (TypeQuestion IN (
        'QCM_UNIQUE', 'QCM_MULTIPLE', 'SUITE_NUMERIQUE', 'RAISONNEMENT_LOGIQUE',
        'ANALOGIE', 'OBSERVATION', 'SITUATION_PRO', 'SCHEMA_SVG', 'QUESTION_SUBJECTIVE'
    )),
    Difficulte NVARCHAR(20) NOT NULL DEFAULT 'MOYEN' CHECK (Difficulte IN ('FACILE', 'MOYEN', 'AVANCE', 'EXPERT')),
    Points INT NOT NULL DEFAULT 1,
    TempsLimiteSecondes INT NULL, -- Temps indicatif ou limite par question
    SchemaSVG NVARCHAR(MAX) NULL,
    Explication NVARCHAR(MAX) NULL, -- Clé de correction (masquée en test élève)
    CompetencesAssociees NVARCHAR(MAX) NULL, -- JSON: Tags des compétences associées
    SpecialitesAssociees NVARCHAR(MAX) NULL, -- JSON: Codes des spécialités concernées
    BaremeSubjectif NVARCHAR(MAX) NULL, -- Grille de notation pour questions subjectives
    OrdreAffichage INT NOT NULL DEFAULT 1,
    EstActive BIT NOT NULL DEFAULT 1,
    EstArchivee BIT NOT NULL DEFAULT 0, -- Gestion de l'archivage
    Version INT NOT NULL DEFAULT 1,
    CONSTRAINT FK_Questions_Tests FOREIGN KEY (TestId) REFERENCES dbo.Tests(TestId) ON DELETE CASCADE,
    CONSTRAINT FK_Questions_Domaines FOREIGN KEY (DomaineId) REFERENCES dbo.DomainesCompetences(DomaineId)
);

-- 9. Options de réponse par question
CREATE TABLE dbo.OptionsReponse (
    OptionId INT IDENTITY(1,1) PRIMARY KEY,
    QuestionId INT NOT NULL,
    LettreOption NVARCHAR(5) NOT NULL,
    EnonceOption NVARCHAR(MAX) NOT NULL,
    SchemaSVG NVARCHAR(MAX) NULL,
    EstCorrecte BIT NOT NULL DEFAULT 0, -- Jamais exposé à l'élève avant soumission
    PoidsOption FLOAT NOT NULL DEFAULT 1.0,
    CONSTRAINT FK_Options_Questions FOREIGN KEY (QuestionId) REFERENCES dbo.Questions(QuestionId) ON DELETE CASCADE
);

-- 10. Sessions de test (Tentatives d'évaluation avec snapshot et versioning)
CREATE TABLE dbo.SessionsTest (
    SessionId INT IDENTITY(1,1) PRIMARY KEY,
    UtilisateurId INT NOT NULL,
    TestId INT NOT NULL,
    TentativeNumero INT NOT NULL DEFAULT 1,
    SeedGeneration INT NULL, -- Seed pour sélection reproductible des questions
    QuestionsSnapshot NVARCHAR(MAX) NULL, -- Snapshot des questions figées à la création
    ConfigSnapshot NVARCHAR(MAX) NULL, -- Snapshot des règles de notation et durées
    DateDebut DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    DateFinMaxServeur DATETIME2 NULL, -- Contrôle horaire serveur strict
    DateFin DATETIME2 NULL,
    DureeEcouleeSecondes INT NOT NULL DEFAULT 0,
    Statut NVARCHAR(50) NOT NULL DEFAULT 'EN_COURS' CHECK (Statut IN (
        'EN_ATTENTE', 'EN_COURS', 'PAUSE', 'EN_ATTENTE_EVALUATION', 'TERMINE', 'ABANDONNE'
    )),
    ScoreBrut FLOAT NULL,
    ScoreTotal FLOAT NULL,
    ScorePourcentage FLOAT NULL,
    IndiceConfiance FLOAT NULL, -- Niveau de complétude des données (0-100%)
    ProfilIncomplet BIT NOT NULL DEFAULT 0,
    DonneesManquantes NVARCHAR(MAX) NULL, -- JSON: Liste des données manquantes
    Progression INT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Sessions_Utilisateurs FOREIGN KEY (UtilisateurId) REFERENCES dbo.Utilisateurs(UtilisateurId) ON DELETE CASCADE,
    CONSTRAINT FK_Sessions_Tests FOREIGN KEY (TestId) REFERENCES dbo.Tests(TestId)
);

-- 11. Réponses enregistrées pendant la session (Autosave & Traçabilité)
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

-- 12. Évaluations des questions subjectives par un évaluateur autorisé
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

-- 13. Résultats détaillés par domaine de compétences
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

-- 14. Recommandations et calcul de compatibilité par spécialité (Aide à la décision)
CREATE TABLE dbo.RecommandationsSpecialites (
    RecommandationId INT IDENTITY(1,1) PRIMARY KEY,
    SessionId INT NOT NULL,
    SpecialiteId INT NOT NULL,
    ScoreCompatibilite FLOAT NOT NULL, -- Pourcentage de fit profil / compétences
    RangCompatibilite INT NOT NULL,
    StatutEligibilite NVARCHAR(50) NOT NULL CHECK (StatutEligibilite IN ('ELIGIBLE', 'SOUS_RESERVE', 'NON_ELIGIBLE', 'A_VERIFIER')),
    ConditionsSatisfaites NVARCHAR(MAX) NULL, -- JSON: Liste des conditions satisfaites
    ConditionsNonSatisfaites NVARCHAR(MAX) NULL, -- JSON: Liste des conditions non satisfaites
    ConditionsAVerifier NVARCHAR(MAX) NULL, -- JSON: Liste des conditions à vérifier (données manquantes / statut démo)
    CompetencesFortes NVARCHAR(MAX) NULL, -- JSON: Points forts identifiés
    CompetencesADevelopper NVARCHAR(MAX) NULL, -- JSON: Axes de progrès
    FacteursPrincipaux NVARCHAR(MAX) NULL, -- JSON: Explication des principaux facteurs du résultat
    AvisSysteme NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Recommandations_Sessions FOREIGN KEY (SessionId) REFERENCES dbo.SessionsTest(SessionId) ON DELETE CASCADE,
    CONSTRAINT FK_Recommandations_Specialites FOREIGN KEY (SpecialiteId) REFERENCES dbo.Specialites(SpecialiteId)
);

-- 15. Journal d'audit et de traçabilité réglementaire
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

-- Index pour les performances en lecture
CREATE INDEX IX_Utilisateurs_PromotionId ON dbo.Utilisateurs(PromotionId);
CREATE INDEX IX_SessionsTest_UtilisateurId ON dbo.SessionsTest(UtilisateurId);
CREATE INDEX IX_ReponsesSession_SessionId ON dbo.ReponsesSession(SessionId);
CREATE INDEX IX_Questions_TestId ON dbo.Questions(TestId);
CREATE INDEX IX_OptionsReponse_QuestionId ON dbo.OptionsReponse(QuestionId);
CREATE INDEX IX_Recommandations_SessionId ON dbo.RecommandationsSpecialites(SessionId);
CREATE INDEX IX_Conditions_SpecialiteId ON dbo.ConditionsEligibilite(SpecialiteId);
GO

PRINT 'Schéma relationnel SQL Server ORIENT-GR enrichi et validé avec succès.';
GO
