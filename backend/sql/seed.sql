-- ==============================================================================
-- APPLICATION ORIENT-GR - JEU DE DONNÉES INITIAL COMPLET (SEED SQL SERVER)
-- Référentiel des Métiers, Conditions Réglementaires, Questions & Tests
-- ==============================================================================

USE [OrientGR_DB];
GO

-- 1. Insertion des Promotions
INSERT INTO dbo.Promotions (Code, Nom, Ecole, DateDebut, DateFin, Statut, EffectifTotal, Description)
VALUES 
('PROM-2025-54', '54ème Promotion - Chef d''Escadron Guy de Marliave', 'École de Gendarmerie de Rochefort', '2024-09-01', '2026-06-30', 'ACTIVE', 120, 'Promotion en cours de validation finale et de choix d''orientation opérationnelle.'),
('PROM-2025-55', '55ème Promotion - Maréchal des Logis-Chef Léopold Bel', 'École de Gendarmerie de Chaumont', '2025-01-15', '2026-12-15', 'PREPARATION', 115, 'Promotion en cours de formation initiale générale.'),
('PROM-2024-53', '53ème Promotion - Colonel Arnaud Beltrame', 'École de Gendarmerie de Montluçon', '2023-09-01', '2025-06-25', 'CLOTUREE', 130, 'Promotion affectée en unités opérationnelles.');
GO

-- 2. Insertion des Domaines de Compétences
INSERT INTO dbo.DomainesCompetences (Code, Intitule, Description, PoidsDefaut)
VALUES
('LOGIQUE', 'Raisonnement Logique & Déductif', 'Capacité d''analyse abstraite, déduction d''hypothèses et résolution de matrices visuelles.', 1.2),
('NUMERIQUE', 'Aptitude Numérique & Calcul Opérationnel', 'Maîtrise des ratios, calculs de trajectoires, estimations tactiques et suites numériques.', 1.0),
('SITUATION', 'Jugement Situationnel & Déontologie', 'Évaluation du discernement face à des dilemmes d''intervention, cadre légal et gestion du stress.', 1.5),
('PROCEDURE', 'Rigueur Procédurale & Cadre Judiciaire', 'Conformité aux règles de procédure pénale, procès-verbaux et préservation des scènes d''infraction.', 1.3),
('OBSERVATION', 'Observation, Vigilance & Attention', 'Repérage d''anomalies furtives, vigilance opérationnelle et analyse de scènes.', 1.1),
('TECHNIQUE', 'Aptitudes Techniques & Numériques', 'Réseaux, systèmes d''information, criminalistique numérique et télécommunications.', 1.0),
('COMMUNICATION', 'Communication & Organisation Administrative', 'Qualité rédactionnelle, sens de l''accueil, synthèse de dossiers et rigueur de secrétariat.', 1.1);
GO

-- 3. Insertion des Spécialités Dynamiques
INSERT INTO dbo.Specialites (
    Code, Intitule, Subdivision, Description, MissionsPrincipales, Icone, PlacesDisponibles, EstActive,
    CompetencesAttendues, TestsAssocies, MatieresAcademiquesPertinentes,
    PoidsNotesAcademiques, PoidsRaisonnement, PoidsCompetencesSpecifiques, PoidsSituationsPro
)
VALUES
-- 1. Police de la route
('SPEC-ROUTE', 'Police de la Route (Sécurité des Mobilités)', 'Sécurité des Mobilités',
 'Unités départementales et autoroutières chargées du contrôle des flux, de la prévention routière et de la répression des infractions graves.',
 'Contrôles coordonnées d''alcoolémie/stupéfiants, gestion d''accidents, régulation des axes stratégiques.',
 'Gauge', 18, 1,
 '["Vigilance routière", "Connaissance du Code de la Route", "Maîtrise de la conduite", "Gestion du stress lors des contrôles"]',
 '["TEST-ATTENTION", "TEST-SITUATION"]',
 '[{"matiere":"Conduite","coef":2.0},{"matiere":"ProcedurePenale","coef":1.5},{"matiere":"Sport","coef":1.0}]',
 0.25, 0.25, 0.25, 0.25),

-- 2. Police judiciaire
('SPEC-PJ', 'Police Judiciaire (Enquêtes & Criminalistique)', 'Gendarmerie Départementale',
 'Unités de recherche (BR, SR) dédiées aux enquêtes judiciaires complexes, flagrants délits, auditions et actes de procédure.',
 'Investigations criminelles, filatures, constatations scientifiques, réquisitions judiciaires.',
 'Search', 25, 1,
 '["Analyse déductive", "Rigueur procédurale pénale", "Qualité rédactionnelle", "Persévérance investigative"]',
 '["TEST-LOGIQUE", "TEST-PROBLEMES", "TEST-SITUATION"]',
 '[{"matiere":"DroitPenal","coef":2.5},{"matiere":"ProcedurePenale","coef":2.5},{"matiere":"ExpressionFr","coef":1.5}]',
 0.30, 0.30, 0.20, 0.20),

-- 3. Informatique
('SPEC-INFO', 'Informatique & Cybercriminalité', 'Appui Opérationnel & Numérique',
 'Gestion des infrastructures numériques, cybersécurité, assistance technique et lutte contre les cyberattaques.',
 'Administration des réseaux tactiques, forensic numérique, sécurisation des flux de données.',
 'Terminal', 12, 1,
 '["Architecture réseau", "Sécurité des systèmes d''information", "Esprit logique", "Dépannage sous pression"]',
 '["TEST-INFORMATIQUE", "TEST-LOGIQUE"]',
 '[{"matiere":"Informatique","coef":3.0},{"matiere":"Mathematiques","coef":2.0}]',
 0.20, 0.35, 0.35, 0.10),

-- 4. Secrétariat informatique
('SPEC-SEC-INFO', 'Secrétariat Informatique', 'Soutien Opérationnel',
 'Gestion des outils bureautiques spécialisés, suivi des logiciels métiers gendarmerie et assistance utilisateurs.',
 'Gestion des accès logiciels, tenue des bases de données d''unités, saisie sécurisée.',
 'FileText', 14, 1,
 '["Maîtrise bureautique avancée", "Assistance utilisateur", "Rigueur organisationnelle", "Confidentialité"]',
 '["TEST-INFORMATIQUE", "TEST-COMMUNICATION"]',
 '[{"matiere":"Informatique","coef":2.5},{"matiere":"ExpressionFr","coef":2.0}]',
 0.30, 0.20, 0.30, 0.20),

-- 5. Secrétariat administratif
('SPEC-SEC-ADMIN', 'Secrétariat Administratif', 'Administration & Ressources Humaines',
 'Gestion des dossiers de personnel, correspondance officielle du commandement et chancellerie.',
 'Rédaction d''ordres de service, gestion logistique, coordination des plannings et archives.',
 'Briefcase', 15, 1,
 '["Excellence rédactionnelle", "Organisation méthodique", "Déontologie administrative", "Sens du service"]',
 '["TEST-COMMUNICATION", "TEST-PROBLEMES"]',
 '[{"matiere":"ExpressionFr","coef":3.0},{"matiere":"ProcedurePenale","coef":1.5}]',
 0.35, 0.15, 0.25, 0.25),

-- 6. Instructeur d'école
('SPEC-INSTRUCTEUR', 'Instructeur d''École de Gendarmerie', 'Formation Initiale & Continue',
 'Transmission des savoirs théoriques, déontologiques, tactiques et sportifs aux futurs élèves gendarmes.',
 'Pédagogie de commandement, animation d''ateliers tactiques, encadrement des promotions.',
 'GraduationCap', 8, 1,
 '["Pédagogie et communication", "Exemplarité déontologique", "Maîtrise MSA et tactique", "Gestion de groupe"]',
 '["TEST-COMMUNICATION", "TEST-SITUATION"]',
 '[{"matiere":"TirMSA","coef":2.0},{"matiere":"Sport","coef":2.0},{"matiere":"ProcedurePenale","coef":1.5}]',
 0.30, 0.20, 0.25, 0.25),

-- 7. Garde
('SPEC-GARDE', 'Garde Républicaine (Sécurité des Emprises Publiques)', 'Garde Républicaine',
 'Protection des hauts lieux républicains (Palais de l''Élysée, Matignon, Sénat, Assemblée Nationale).',
 'Contrôle d''accès haute sécurité, filtrage, patrouilles de surveillance et honneurs militaires.',
 'ShieldCheck', 20, 1,
 '["Vigilance statique prolongée", "Sang-froid", "Présentation militaire irréprochable", "Détection de comportements suspects"]',
 '["TEST-ATTENTION", "TEST-SITUATION"]',
 '[{"matiere":"TirMSA","coef":2.0},{"matiere":"Sport","coef":1.5}]',
 0.25, 0.20, 0.30, 0.25),

-- 8. Gendarmerie mobile
('SPEC-GM', 'Gendarmerie Mobile (Maintien de l''Ordre)', 'Gendarmerie Mobile',
 'Escadrons de marche assurant le maintien de l''ordre, les opérations de désescalade et les renforts outre-mer.',
 'Manœuvres de dispersion de foules violentes, sécurisation de sommets internationaux, escortes sensibles.',
 'Users', 35, 1,
 '["Cohésion d''équipe sous contrainte", "Robustesse physique", "Discipline tactique", "Maîtrise de la force légitime"]',
 '["TEST-SITUATION", "TEST-ATTENTION"]',
 '[{"matiere":"Sport","coef":2.5},{"matiere":"TirMSA","coef":2.0},{"matiere":"ProcedurePenale","coef":1.0}]',
 0.20, 0.20, 0.30, 0.30),

-- 9. MOTARD
('SPEC-MOTARD', 'Escadron Motocycliste (MOTARD)', 'Sécurité des Mobilités',
 'Escortes rapides de hautes personnalités, transports d''organes, guidage de convois et interception à grande vitesse.',
 'Conduite moto tout-terrain et sur route à vitesse tactique, escortes prioritaires.',
 'Bike', 10, 1,
 '["Réflexes moteurs ultra-rapides", "Équilibre et dextérité", "Endurance physique sous intempéries", "Vigilance périphérique"]',
 '["TEST-ATTENTION", "TEST-LOGIQUE"]',
 '[{"matiere":"Conduite","coef":3.0},{"matiere":"Sport","coef":2.0}]',
 0.25, 0.25, 0.30, 0.20),

-- 10. GEH
('SPEC-GEH', 'Groupe d''Escorte et d''Honneur (GEH)', 'Garde Républicaine',
 'Escortes d''honneur du Président de la République et des chefs d''État étrangers, défilés nationaux.',
 'Protocole militaire de prestige, maîtrise du cheval d''armes ou motocyclisme de cérémonie.',
 'Award', 6, 1,
 '["Rigueur martiale d''élite", "Dextérité et posture d''honneur", "Discipline protocolaire", "Résistance physique statique"]',
 '["TEST-ATTENTION", "TEST-SITUATION"]',
 '[{"matiere":"Sport","coef":2.0},{"matiere":"Conduite","coef":1.5}]',
 0.25, 0.20, 0.30, 0.25),

-- 11. GSI
('SPEC-GSI', 'Groupe de Sécurité et d''Intervention (GSI)', 'Intervention Spécialisée',
 'Appui renforcé aux unités territoriales lors de situations à risque élevé et sécurisation renforcée d''emprises sensibles.',
 'Neutralisation d''individus retranchés, levée de doute armée, appui tactique de proximité.',
 'Crosshair', 12, 1,
 '["Intervention en milieu clos", "Discernement du tir", "Condition physique d''exception", "Gestion de la peur"]',
 '["TEST-SITUATION", "TEST-LOGIQUE"]',
 '[{"matiere":"TirMSA","coef":3.0},{"matiere":"Sport","coef":2.5}]',
 0.20, 0.30, 0.30, 0.20),

-- 12. Spécialités scientifiques et techniques
('SPEC-SCIENTIFIQUE', 'Spécialités Scientifiques & Criminalistique (IRCGN)', 'Police Technique & Scientifique',
 'Examens de laboratoire, balistique judiciaire, analyse physico-chimique de traces, ADN et cyber-criminalistique.',
 'Prélèvement d''indices sur scènes de crime majeures, analyse instrumentale en laboratoire, expertise devant les tribunaux.',
 'Microscope', 8, 1,
 '["Raisonnement scientifique rigoureux", "Précision gestuelle méticuleuse", "Maîtrise de la chaîne de preuve", "Patience"]',
 '["TEST-TECHNIQUE", "TEST-LOGIQUE", "TEST-PROBLEMES"]',
 '[{"matiere":"Informatique","coef":2.0},{"matiere":"DroitPenal","coef":2.0},{"matiere":"ExpressionFr","coef":1.5}]',
 0.30, 0.35, 0.25, 0.10),

-- 13. PSIG Sabre
('SPEC-PSIG', 'Peloton de Surveillance et d''Intervention (PSIG Sabre)', 'Intervention / Sécurité Publique',
 'Interventions d''urgence, neutralisation d''individus armés dangereux et patrouilles nocturnes à fort potentiel de risque.',
 'Intervention d''urgence, sécurisation de zones à risques, interpellation d''individus armés.',
 'ShieldAlert', 20, 1,
 '["Réactivité opérationnelle", "Sang-froid sous le feu", "Maîtrise armement et tactique", "Force physique"]',
 '["TEST-SITUATION", "TEST-ATTENTION"]',
 '[{"matiere":"TirMSA","coef":2.5},{"matiere":"Sport","coef":2.5}]',
 0.20, 0.25, 0.30, 0.25);
GO

-- 4. Insertion des Conditions d'Éligibilité (avec critères officiels et provisoires de démonstration)
INSERT INTO dbo.ConditionsEligibilite (
    SpecialiteId, TypeCondition, CibleCondition, Operateur, Seuil, EstObligatoire,
    SourceOfficielle, DateValidation, StatutValidation, Description
)
VALUES
-- MOTARD (Paramètre configurable démo de taille 180 cm + Aptitude physique)
((SELECT SpecialiteId FROM dbo.Specialites WHERE Code='SPEC-MOTARD'), 'TAILLE_MIN', 'TailleCm', '>=', '180', 1,
 'Paramètre provisoire démo commanditaire (non officiel)', '2026-01-10', 'PROVISOIRE_DEMO',
 'Taille minimale indicative de 180 cm (paramètre provisoire de démonstration non officiel).'),
((SELECT SpecialiteId FROM dbo.Specialites WHERE Code='SPEC-MOTARD'), 'APTITUDE_PHYSIQUE', 'AptitudePhysique', '>=', '14.0', 1,
 'Instruction N° 2100/DEF/GEND/RH', '2025-05-15', 'VALIDEE_OFFICIELLE',
 'Note sportive minimale de 14.0/20 aux épreuves réglementaires.'),
((SELECT SpecialiteId FROM dbo.Specialites WHERE Code='SPEC-MOTARD'), 'VISION', 'VisionSIGYCOP_Y', '<=', '2', 1,
 'Arrêté interministériel SIGYCOP Armées', '2025-06-01', 'VALIDEE_OFFICIELLE',
 'Acuité visuelle SIGYCOP coefficient Y <= 2 exigée.'),

-- GEH (Paramètre configurable démo de taille 180 cm + Aptitude physique)
((SELECT SpecialiteId FROM dbo.Specialites WHERE Code='SPEC-GEH'), 'TAILLE_MIN', 'TailleCm', '>=', '180', 1,
 'Paramètre provisoire démo commanditaire (non officiel)', '2026-01-10', 'PROVISOIRE_DEMO',
 'Taille minimale indicative de 180 cm pour le protocole d''escorte (paramètre provisoire de démonstration).'),
((SELECT SpecialiteId FROM dbo.Specialites WHERE Code='SPEC-GEH'), 'APTITUDE_PHYSIQUE', 'AptitudePhysique', '>=', '13.5', 1,
 'Directive Garde Républicaine N° 45/RH', '2025-03-20', 'VALIDEE_OFFICIELLE',
 'Note sportive minimale de 13.5/20.'),

-- GSI (Paramètre configurable démo de taille 180 cm + Rigueur tactique)
((SELECT SpecialiteId FROM dbo.Specialites WHERE Code='SPEC-GSI'), 'TAILLE_MIN', 'TailleCm', '>=', '180', 1,
 'Paramètre provisoire démo commanditaire (non officiel)', '2026-01-10', 'PROVISOIRE_DEMO',
 'Taille minimale indicative de 180 cm (paramètre provisoire de démonstration non officiel).'),
((SELECT SpecialiteId FROM dbo.Specialites WHERE Code='SPEC-GSI'), 'APTITUDE_PHYSIQUE', 'AptitudePhysique', '>=', '15.5', 1,
 'Circulaire Unités d''Intervention N° 789/GEND', '2025-08-12', 'VALIDEE_OFFICIELLE',
 'Condition physique supérieure requise (note minimale 15.5/20).'),

-- Police Judiciaire (SPEC-PJ)
((SELECT SpecialiteId FROM dbo.Specialites WHERE Code='SPEC-PJ'), 'NOTE_MIN_FORMATION', 'NoteFormationPro', '>=', '13.5', 1,
 'Règlement de scolarité DGGN', '2025-01-01', 'VALIDEE_OFFICIELLE',
 'Moyenne académique générale minimale de 13.5/20.'),
((SELECT SpecialiteId FROM dbo.Specialites WHERE Code='SPEC-PJ'), 'NOTE_MIN_MATIERE', 'ProcedurePenale', '>=', '12.0', 1,
 'Instruction Direction des Enquêtes Criminelles', '2025-04-10', 'VALIDEE_OFFICIELLE',
 'Note minimale de 12.0/20 en Procédure Pénale.'),

-- Police de la Route (SPEC-ROUTE)
((SELECT SpecialiteId FROM dbo.Specialites WHERE Code='SPEC-ROUTE'), 'VISION', 'VisionSIGYCOP_Y', '<=', '2', 1,
 'Arrêté médical aptitude conduite rapide', '2025-06-01', 'VALIDEE_OFFICIELLE',
 'Vision compatible conduite rapide (Y <= 2).'),
((SELECT SpecialiteId FROM dbo.Specialites WHERE Code='SPEC-ROUTE'), 'APTITUDE_PHYSIQUE', 'AptitudePhysique', '>=', '12.0', 0,
 'Recommandation indicative de sécurité routière', '2025-02-15', 'VALIDEE_OFFICIELLE',
 'Condition physique générale satisfaisante (indicatif).'),

-- Informatique (SPEC-INFO)
((SELECT SpecialiteId FROM dbo.Specialites WHERE Code='SPEC-INFO'), 'NOTE_MIN_MATIERE', 'Informatique', '>=', '13.0', 1,
 'Référentiel ComCyberGend 2025', '2025-09-01', 'VALIDEE_OFFICIELLE',
 'Note académique minimale de 13.0/20 en Informatique.'),

-- Secrétariat Administratif (SPEC-SEC-ADMIN)
((SELECT SpecialiteId FROM dbo.Specialites WHERE Code='SPEC-SEC-ADMIN'), 'NOTE_MIN_MATIERE', 'ExpressionFr', '>=', '12.5', 1,
 'Normes de rédaction administrative DGGN', '2025-02-01', 'VALIDEE_OFFICIELLE',
 'Note minimale de 12.5/20 en Expression Écrite & Rédaction.'),

-- Garde Républicaine (SPEC-GARDE)
((SELECT SpecialiteId FROM dbo.Specialites WHERE Code='SPEC-GARDE'), 'MEDICAL', 'StatutMedical', '==', 'SIGYCOP_VALIDE', 1,
 'Instruction Aptitude Service Général', '2025-01-15', 'VALIDEE_OFFICIELLE',
 'Profil SIGYCOP strictement sans contre-indication terrain.'),

-- Gendarmerie Mobile (SPEC-GM)
((SELECT SpecialiteId FROM dbo.Specialites WHERE Code='SPEC-GM'), 'APTITUDE_PHYSIQUE', 'AptitudePhysique', '>=', '12.0', 1,
 'Instruction Maintien de l''Ordre DGGN', '2025-01-01', 'VALIDEE_OFFICIELLE',
 'Note sportive minimale de 12.0/20.'),

-- Spécialités Scientifiques (SPEC-SCIENTIFIQUE)
((SELECT SpecialiteId FROM dbo.Specialites WHERE Code='SPEC-SCIENTIFIQUE'), 'NOTE_MIN_FORMATION', 'NoteFormationPro', '>=', '14.0', 1,
 'Charte d''intégration IRCGN', '2025-06-30', 'VALIDEE_OFFICIELLE',
 'Moyenne générale académique minimale de 14.0/20.');
GO

-- 5. Insertion des Coefficients Domaines par Spécialité (PoidsCompetenceSpecialite)
INSERT INTO dbo.PoidsCompetenceSpecialite (SpecialiteId, DomaineId, Coefficient)
SELECT s.SpecialiteId, d.DomaineId,
  CASE 
    WHEN s.Code = 'SPEC-PJ' AND d.Code IN ('PROCEDURE', 'LOGIQUE') THEN 2.2
    WHEN s.Code = 'SPEC-PJ' AND d.Code = 'OBSERVATION' THEN 1.8
    WHEN s.Code = 'SPEC-ROUTE' AND d.Code IN ('OBSERVATION', 'SITUATION') THEN 2.0
    WHEN s.Code = 'SPEC-INFO' AND d.Code IN ('TECHNIQUE', 'LOGIQUE') THEN 2.5
    WHEN s.Code = 'SPEC-SEC-INFO' AND d.Code IN ('TECHNIQUE', 'COMMUNICATION') THEN 2.0
    WHEN s.Code = 'SPEC-SEC-ADMIN' AND d.Code IN ('COMMUNICATION', 'PROCEDURE') THEN 2.2
    WHEN s.Code = 'SPEC-INSTRUCTEUR' AND d.Code IN ('COMMUNICATION', 'SITUATION') THEN 2.0
    WHEN s.Code = 'SPEC-GARDE' AND d.Code IN ('OBSERVATION', 'SITUATION') THEN 2.0
    WHEN s.Code = 'SPEC-GM' AND d.Code IN ('SITUATION', 'PROCEDURE') THEN 2.0
    WHEN s.Code = 'SPEC-MOTARD' AND d.Code IN ('OBSERVATION', 'LOGIQUE') THEN 2.2
    WHEN s.Code = 'SPEC-GEH' AND d.Code IN ('OBSERVATION', 'SITUATION') THEN 1.8
    WHEN s.Code = 'SPEC-GSI' AND d.Code IN ('SITUATION', 'OBSERVATION') THEN 2.2
    WHEN s.Code = 'SPEC-SCIENTIFIQUE' AND d.Code IN ('LOGIQUE', 'TECHNIQUE', 'PROCEDURE') THEN 2.2
    ELSE 1.0
  END
FROM dbo.Specialites s
CROSS JOIN dbo.DomainesCompetences d;
GO

-- 6. Insertion des Utilisateurs (Administrateurs & Profils Élèves représentatifs)
-- Hash standard bcrypt pour mot de passe 'Gendarme2026!' : $2a$10$wT8mQ3L33gP5.5K0oD7/reB7zZ5WzI9XNfE.B83T0N0K2jK2WkQp2
INSERT INTO dbo.Utilisateurs (
    Matricule, Email, MotDePasseHash, Nom, Prenom, Role, PromotionId,
    ClassementInitial, NoteFormationPro, AptitudePhysique, StatutMedical,
    TailleCm, PoidsKg, VisionSIGYCOP_Y, MoyennesMatieres, CompetencesPratiques, PreferencesSpecialites, EstActif
)
VALUES
('ADM-001', 'commandement@orient-gr.gendarmerie.fr', '$2a$10$wT8mQ3L33gP5.5K0oD7/reB7zZ5WzI9XNfE.B83T0N0K2jK2WkQp2', 'De Montmirail', 'Laurent', 'ADMIN', NULL,
 NULL, NULL, NULL, 'SIGYCOP_VALIDE', 182, 79.0, 1, NULL, NULL, NULL, 1),

-- Julien Moreau : Apte et intéressé par le pilotage moto et la sécurité routière (Taille 183 cm)
('EG-2025-014', 'julien.moreau@eleve.gendarmerie.fr', '$2a$10$wT8mQ3L33gP5.5K0oD7/reB7zZ5WzI9XNfE.B83T0N0K2jK2WkQp2', 'Moreau', 'Julien', 'ELEVE', 1,
 12, 15.8, 16.5, 'SIGYCOP_VALIDE', 183, 78.0, 1,
 '{"DroitPenal":15.0,"ProcedurePenale":14.5,"TirMSA":17.0,"Informatique":14.0,"Sport":16.5,"Conduite":18.0,"ExpressionFr":14.0}',
 '{"PilotageMoto":5,"InterventionMilieuClos":4,"SecretariatAdmin":3,"ReseauxTelecom":3}',
 '[{"code":"SPEC-MOTARD","rang":1,"motivation":"Passion pour les missions d''escorte rapide et le motocyclisme opérationnel."},{"code":"SPEC-ROUTE","rang":2},{"code":"SPEC-PJ","rang":3}]', 1),

-- Clara Bernard : Profil enquêteur judiciaire et rédactionnel (Taille 172 cm)
('EG-2025-042', 'clara.bernard@eleve.gendarmerie.fr', '$2a$10$wT8mQ3L33gP5.5K0oD7/reB7zZ5WzI9XNfE.B83T0N0K2jK2WkQp2', 'Bernard', 'Clara', 'ELEVE', 1,
 5, 17.2, 14.0, 'SIGYCOP_VALIDE', 172, 63.0, 1,
 '{"DroitPenal":18.0,"ProcedurePenale":17.5,"TirMSA":14.0,"Informatique":15.0,"Sport":14.0,"Conduite":13.5,"ExpressionFr":18.0}',
 '{"PilotageMoto":1,"InterventionMilieuClos":3,"SecretariatAdmin":5,"ReseauxTelecom":4}',
 '[{"code":"SPEC-PJ","rang":1,"motivation":"Vocation confirmée pour la police judiciaire, les auditions et l''investigation criminelle."},{"code":"SPEC-SCIENTIFIQUE","rang":2},{"code":"SPEC-SEC-ADMIN","rang":3}]', 1),

-- Thomas Leroux : Profil intervention et maintien de l'ordre (Taille 185 cm)
('EG-2025-089', 'thomas.leroux@eleve.gendarmerie.fr', '$2a$10$wT8mQ3L33gP5.5K0oD7/reB7zZ5WzI9XNfE.B83T0N0K2jK2WkQp2', 'Leroux', 'Thomas', 'ELEVE', 1,
 28, 14.1, 17.5, 'SIGYCOP_VALIDE', 185, 83.0, 1,
 '{"DroitPenal":13.0,"ProcedurePenale":13.5,"TirMSA":18.0,"Informatique":12.0,"Sport":17.5,"Conduite":15.0,"ExpressionFr":12.5}',
 '{"PilotageMoto":3,"InterventionMilieuClos":5,"SecretariatAdmin":2,"ReseauxTelecom":2}',
 '[{"code":"SPEC-GSI","rang":1,"motivation":"Sens du devoir en situation d''intervention et engagement au sein des unités spécialisées."},{"code":"SPEC-GM","rang":2},{"code":"SPEC-GEH","rang":3}]', 1),

-- Sarah Benali : Profil technique / cyber et secrétariat (Taille 168 cm, vision à vérifier)
('EG-2025-103', 'sarah.benali@eleve.gendarmerie.fr', '$2a$10$wT8mQ3L33gP5.5K0oD7/reB7zZ5WzI9XNfE.B83T0N0K2jK2WkQp2', 'Benali', 'Sarah', 'ELEVE', 1,
 64, 15.2, 13.0, 'SIGYCOP_VALIDE', 168, 58.0, 2,
 '{"DroitPenal":14.0,"ProcedurePenale":14.0,"TirMSA":13.0,"Informatique":18.5,"Sport":13.0,"Conduite":13.0,"ExpressionFr":16.0}',
 '{"PilotageMoto":1,"InterventionMilieuClos":2,"SecretariatAdmin":4,"ReseauxTelecom":5}',
 '[{"code":"SPEC-INFO","rang":1,"motivation":"Spécialisation dans les systèmes d''information et la criminalistique informatique."},{"code":"SPEC-SEC-INFO","rang":2},{"code":"SPEC-PJ","rang":3}]', 1);
GO

-- 7. Insertion des Tests Typés
INSERT INTO dbo.Tests (
    Code, Titre, Description, DureeMinutes, NombreQuestions, CategoriesIncluses,
    DifficulteCible, AutoriserRetour, AutoriserPause, AutoriserReprise,
    NombreTentativesMax, SeuilReussite, SelectionAleatoire, SeedReproductible, EstActif
)
VALUES
('TEST-ORIENT-2026', 'Évaluation Globale d''Orientation Opérationnelle (EGO-2026)',
 'Batterie complète standardisée évaluant le raisonnement abstrait, l''aptitude chiffrée, le jugement déontologique, la vigilance visuelle et les compétences techniques.',
 35, 10, '["LOGIQUE", "NUMERIQUE", "SITUATION", "PROCEDURE", "OBSERVATION", "TECHNIQUE", "COMMUNICATION"]',
 'TOUS', 1, 1, 1, 2, 60.0, 0, 1, 1),

('TEST-LOGIQUE', 'Test de Raisonnement Logique & Déductif',
 'Épreuve ciblée de déduction d''hypothèses, matrices progressives abstraites et analogies spatiales.',
 20, 8, '["LOGIQUE"]', 'AVANCE', 1, 1, 1, 2, 65.0, 0, 1, 1),

('TEST-SITUATION', 'Test de Compréhension de Situations Professionnelles & Déontologie',
 'Mises en situation opérationnelles réelles évaluant le discernement, le cadre d''usage des armes et le respect de la légalité républicaine.',
 25, 8, '["SITUATION", "PROCEDURE"]', 'MOYEN', 1, 1, 1, 2, 70.0, 0, 1, 1),

('TEST-NUMERIQUE', 'Test Numérique & Calcul Opérationnel',
 'Résolution de problèmes chiffrés, vitesses/distances, gestion d''effectifs et statistiques d''infractions.',
 20, 8, '["NUMERIQUE"]', 'MOYEN', 1, 1, 1, 2, 60.0, 0, 1, 1),

('TEST-INFORMATIQUE', 'Test de Compétences Informatiques & Cyber-sécurité',
 'Évaluation des connaissances réseaux, architecture matérielle, forensic et sécurité des terminaux.',
 20, 8, '["TECHNIQUE"]', 'AVANCE', 1, 1, 1, 2, 65.0, 0, 1, 1);
GO

-- 8. Insertion de la Banque de Questions (Objective & Subjective)
INSERT INTO dbo.Questions (
    TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion, Difficulte, Points,
    TempsLimiteSecondes, SchemaSVG, Explication, CompetencesAssociees, SpecialitesAssociees, BaremeSubjectif, OrdreAffichage, EstActive
)
VALUES
-- Question 1 : Matrice visuelle progressive (Logique)
(1, 1, 'Q-LOG-01', 
 'Observez la matrice logique progressive ci-dessous. Quelle figure doit logiquement remplacer le point d''interrogation dans la quatrième case ?',
 'Test de raisonnement abstrait non verbal. La règle combine une rotation de 90° dans le sens horaire et l''ajout d''un marqueur central.',
 'RAISONNEMENT_LOGIQUE', 'MOYEN', 1, 90, 'MATRIX_2X2_PATTERN',
 'La rangée supérieure montre un cercle avec barre verticale qui pivote de 90° avec un point au centre. La rangée inférieure applique la même transformation à un carré.',
 '["Analyse déductive", "Abstraction visuelle"]', '["SPEC-PJ", "SPEC-SCIENTIFIQUE", "SPEC-INFO"]', NULL, 1, 1),

-- Question 2 : Schéma tactique d'intervention (Situation / Tactique)
(1, 3, 'Q-SIT-01',
 'Lors d''une progression en milieu clos (reconnaissance de bâtiment suspect), le binôme pénètre par l''entrée principale. Quelle zone présente la vulnérabilité tactique immédiate prioritaire (angle mort non couvert) ?',
 'Intervention nocturne en zone périurbaine suite à déclenchement d''alarme intrusion. Le binôme progresse le long du couloir central.',
 'SITUATION_PRO', 'AVANCE', 2, 120, 'TACTICAL_ROOM_CLEARING',
 'La zone DELTA représente un couloir en équerre à droite masqué par la cloison intérieure, constituant un angle mort non contrôlé à neutraliser en priorité.',
 '["Discernement sous stress", "Sécurité d''intervention", "Vision périphérique"]', '["SPEC-PSIG", "SPEC-GSI", "SPEC-GM"]', NULL, 2, 1),

-- Question 3 : Calcul tactique et vitesse d''interception (Numérique)
(1, 2, 'Q-NUM-01',
 'Un véhicule en grand excès de vitesse est signalé au point kilométrique PK 42 d''une autoroute, circulant à une vitesse constante de 180 km/h. Une équipe rapide d''intervention motocycliste part du PK 12 à sa poursuite à 240 km/h. Dans combien de minutes l''interception aura-t-elle lieu ?',
 'Interception coordonnée par le Centre d''Opérations et de Renseignement de la Gendarmerie (CORG).',
 'SUITE_NUMERIQUE', 'MOYEN', 2, 120, NULL,
 'Distance initiale = 42 - 12 = 30 km. Vitesse relative de rapprochement = 240 - 180 = 60 km/h. Temps = 30 / 60 = 0.5 heure, soit exactement 30 minutes.',
 '["Calcul opérationnel", "Estimation de vitesse"]', '["SPEC-MOTARD", "SPEC-ROUTE"]', NULL, 3, 1),

-- Question 4 : Rigueur de procédure pénale (Procédure)
(1, 4, 'Q-PROC-01',
 'Lors d''un contrôle routier d''initiative, vous découvrez dans le coffre d''un véhicule plusieurs sacs contenant une substance végétale suspectée être du stupéfiant. Quel est l''acte de procédure immédiat conforme aux règles de conservation des preuves ?',
 'Contrôle routier opéré sous réquisition du Procureur de la République (article 78-2 alinéa 7 du CPP).',
 'QCM_UNIQUE', 'FACILE', 1, 90, NULL,
 'Il convient de figer la scène, procéder immédiatement au placement en garde à vue si les conditions sont réunies, apposer des scellés sous emballage scellé continu et mentionner les conditions précises de découverte dans le procès-verbal.',
 '["Rigueur procédurale", "Préservation des scellés"]', '["SPEC-PJ", "SPEC-ROUTE"]', NULL, 4, 1),

-- Question 5 : Vigilance visuelle et observation furtive (Observation)
(1, 5, 'Q-OBS-01',
 'Lors d''une surveillance discrète sur un point de deal présumé, vous observez un individu qui effectue un échange rapide de la main gauche avec un cycliste, puis dissimule immédiatement un paquet sous une dalle de trottoir descellée. Quel élément factuel doit figurer en priorité dans le carnet de déclaration ?',
 'Surveillance statique sous couverture discrète d''un hall d''immeuble.',
 'OBSERVATION', 'MOYEN', 1, 90, NULL,
 'L''horodatage à la seconde, la description vestimentaire et morphologique précise, la localisation exacte de la cache (repère fixe) et le mode opératoire de remise.',
 '["Vigilance furtive", "Mémoire visuelle", "Précision des constatations"]', '["SPEC-PJ", "SPEC-GARDE", "SPEC-ROUTE"]', NULL, 5, 1),

-- Question 6 : Compétence Cyber et Forensic (Technique)
(1, 6, 'Q-TECH-01',
 'Lors d''une perquisition visant un suspect de fraude bancaire organisée, un ordinateur portable allumé est découvert sur un bureau avec un écran non verrouillé. Quelle consigne technique essentielle doit être appliquée avant saisie matérielle ?',
 'Perquisition judiciaire en flagrance assistée par un enquêteur cyber.',
 'QCM_UNIQUE', 'AVANCE', 2, 90, NULL,
 'Capture immédiate de la mémoire vive (RAM) à chaud avec un outil forensique certifié avant toute coupure électrique, puis extraction de la batterie ou déconnexion réseau (isolation cage de Faraday).',
 '["Forensic numérique", "Sécurité des données judiciaires"]', '["SPEC-INFO", "SPEC-SCIENTIFIQUE"]', NULL, 6, 1),

-- Question 7 : Organisation et communication administrative (Communication)
(1, 7, 'Q-COM-01',
 'Le commandant de compagnie vous demande de préparer la synthèse hebdomadaire des faits marquants de délinquance pour la préfecture avant 17h00. Vous constatez des incohérences chiffrées entre deux brigades territoriales. Quelle action démontre la meilleure rigueur d''organisation ?',
 'Contexte de gestion administrative d''état-major de compagnie.',
 'QCM_UNIQUE', 'MOYEN', 1, 90, NULL,
 'Contacter immédiatement les deux brigades par voie directe pour vérification rapide des mains courantes, consolider les données fiabilisées et signaler au commandement les éléments validés avec note de réserve si un doute persiste.',
 '["Organisation administrative", "Communication institutionnelle", "Vérification des sources"]', '["SPEC-SEC-ADMIN", "SPEC-SEC-INFO"]', NULL, 7, 1),

-- Question 8 : Question subjective - Dilemme de discernement et déontologie
(1, 3, 'Q-SUBJ-01',
 'Lors d''un maintien de l''ordre sous haute tension, un groupe hostile lance des projectiles sur votre ligne. Un individu isolé, visiblement mineur, trébuche à dix mètres de votre position et se retrouve au sol alors que la consigne générale est de tenir la ligne sans dispersion. Rédigez votre décision d''action en motivant votre discernement tactique et déontologique.',
 'Maintien de l''ordre public en zone urbaine sensible.',
 'QUESTION_SUBJECTIVE', 'AVANCE', 3, 180, NULL,
 'L''évaluation portera sur : 1) La prise en compte de la sécurité du binôme et de la ligne (pas de rupture d''alignement isolée), 2) La protection d''une personne vulnérable au sol sans compromettre la mission, 3) La communication immédiate avec le chef d''élément avant toute manœuvre de sécurisation, 4) La proportionnalité.',
 '["Discernement sous contrainte", "Déontologie républicaine", "Maîtrise tactique"]', '["SPEC-GM", "SPEC-PSIG", "SPEC-GSI"]',
 '{"criteres":[{"nom":"Sécurité collective et maintien du dispositif","pointsMax":1.0},{"nom":"Protection des personnes et proportionnalité","pointsMax":1.0},{"nom":"Clarté de la communication radio/commandement","pointsMax":1.0}]}', 8, 1);
GO

-- 9. Options de Réponses pour les questions objectives
-- Options pour Q-LOG-01
INSERT INTO dbo.OptionsReponse (QuestionId, LettreOption, EnonceOption, SchemaSVG, EstCorrecte)
VALUES
(1, 'A', 'Carré évidé avec barre verticale et point central', 'SQUARE_EMPTY_DOT', 0),
(1, 'B', 'Carré évidé tourné de 90° avec barre horizontale et point central', 'SQUARE_EMPTY_DOT', 1),
(1, 'C', 'Triangle plein pointe en haut', 'TRIANGLE_UP_FULL', 0),
(1, 'D', 'Cercle hachuré quart supérieur droit', 'CIRCLE_HATCHED', 0);

-- Options pour Q-SIT-01
INSERT INTO dbo.OptionsReponse (QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES
(2, 'A', 'Secteur ALPHA : Couloir d''entrée dans l''axe direct', 0),
(2, 'B', 'Secteur BRAVO : Pièce fermée à gauche', 0),
(2, 'C', 'Secteur DELTA : Couloir en équerre à droite constituant un angle mort non contrôlé', 1),
(2, 'D', 'Secteur CHARLIE : Sas de retrait immédiat', 0);

-- Options pour Q-NUM-01
INSERT INTO dbo.OptionsReponse (QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES
(3, 'A', '15 minutes', 0),
(3, 'B', '20 minutes', 0),
(3, 'C', '30 minutes', 1),
(3, 'D', '45 minutes', 0);

-- Options pour Q-PROC-01
INSERT INTO dbo.OptionsReponse (QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES
(4, 'A', 'Déplacer les sacs au poste pour les peser avant d''en informer quiconque', 0),
(4, 'B', 'Geler les lieux, placer les scellés sous sachet inviolable continu, aviser le magistrat et notifier les droits en garde à vue', 1),
(4, 'C', 'Demander au conducteur de signer un abandon amiable des produits sans procès-verbal', 0),
(4, 'D', 'Ouvrir les sachets pour tester olfactivement la matière en présence de témoins', 0);

-- Options pour Q-OBS-01
INSERT INTO dbo.OptionsReponse (QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES
(5, 'A', 'Consigner uniquement l''heure approximative et la couleur du vélo', 0),
(5, 'B', 'Consigner l''horodatage exact, le signalement morphologique, l''emplacement précis de la dalle et le geste technique d''occultation', 1),
(5, 'C', 'Interpeller immédiatement seul sans attendre de renfort', 0),
(5, 'D', 'Récupérer la cache sans précaution pour vérifier le contenu', 0);

-- Options pour Q-TECH-01
INSERT INTO dbo.OptionsReponse (QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES
(6, 'A', 'Éteindre immédiatement la machine avec le bouton d''alimentation pour éviter toute suppression', 0),
(6, 'B', 'Effectuer une capture de la mémoire vive (RAM) à chaud puis isoler le terminal des réseaux (mode avion / pochette Faraday)', 1),
(6, 'C', 'Parcourir les dossiers personnels pour copier les fichiers récents sur clé USB non certifiée', 0),
(6, 'D', 'Fermer le capot de l''ordinateur pour mise en veille prolongée', 0);

-- Options pour Q-COM-01
INSERT INTO dbo.OptionsReponse (QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES
(7, 'A', 'Retransmettre les données contradictoires sans vérification pour respecter l''horaire strict', 0),
(7, 'B', 'Prendre contact directement avec les unités sources, fiabiliser les données, consolider et alerter la hiérarchie en toute transparence', 1),
(7, 'C', 'Supprimer les chiffres contradictoires du rapport officiel', 0),
(7, 'D', 'Inventer une moyenne arbitraire pour équilibrer le tableau', 0);
GO

PRINT 'Jeu de données complet (Seed SQL Server) inséré avec succès.';
GO
