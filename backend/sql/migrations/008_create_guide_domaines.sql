-- ============================================================================
-- MIGRATION 008 : CRÉATION DE L'ESPACE GUIDE & DES 10 DOMAINES TECHNIQUES ET PROFESSIONNELS
-- ============================================================================
-- Date : 2026-11-14
-- Objectif : Espace GUIDE pour la découverte des 7 spécialités opérationnelles
--            et des 10 domaines techniques et professionnels ORIENT-GR.
-- ============================================================================

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'GuideDomaines' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE dbo.GuideDomaines (
        DomaineId INT IDENTITY(1,1) PRIMARY KEY,
        Code NVARCHAR(50) NOT NULL CONSTRAINT UQ_GuideDomaines_Code UNIQUE,
        Titre NVARCHAR(150) NOT NULL,
        TitreAr NVARCHAR(150) NULL,
        Categorie NVARCHAR(50) NOT NULL CONSTRAINT CK_GuideDomaines_Categorie CHECK (Categorie IN ('TECHNOLOGIQUE', 'TECHNIQUE_LOGISTIQUE', 'OPERATIONNEL')),
        DescriptionCourte NVARCHAR(500) NOT NULL,
        Presentation NVARCHAR(MAX) NOT NULL,
        Missions NVARCHAR(MAX) NOT NULL, -- JSON array of strings
        CompetencesTechniques NVARCHAR(MAX) NOT NULL, -- JSON array of strings
        QualitesPersonnelles NVARCHAR(MAX) NOT NULL, -- JSON array of strings
        TechnologiesEquipements NVARCHAR(MAX) NOT NULL, -- JSON array of strings
        ExemplesApplications NVARCHAR(MAX) NOT NULL, -- JSON array of strings
        ModulesPedagogiques NVARCHAR(MAX) NOT NULL, -- JSON array of objects
        MotsClesCompatibilite NVARCHAR(MAX) NOT NULL, -- JSON array of keywords for IA matching
        Icone NVARCHAR(50) NOT NULL DEFAULT 'Cpu',
        Couleur NVARCHAR(50) NOT NULL DEFAULT 'emerald',
        BadgeClass NVARCHAR(100) NOT NULL DEFAULT 'bg-emerald-100 text-emerald-800',
        ImageUrl NVARCHAR(255) NULL,
        PoidsPriorite INT NOT NULL DEFAULT 1,
        Actif BIT NOT NULL DEFAULT 1,
        DateCreation DATETIME2 NOT NULL DEFAULT GETDATE(),
        DateModification DATETIME2 NOT NULL DEFAULT GETDATE()
    );
END;
GO

-- Insertion ou mise à jour des 10 domaines techniques et professionnels
MERGE dbo.GuideDomaines AS target
USING (VALUES
    (
        'DOM-DEV',
        N'Informatique et Développement Logiciel',
        N'المعلوماتية وتطوير البرمجيات',
        'TECHNOLOGIQUE',
        N'Conception, développement et maintenance d''applications métier, d''outils décisionnels et de plateformes sécurisées pour les forces de commandement.',
        N'Le domaine Informatique et Développement Logiciel assure la conception, le déploiement et l''optimisation des systèmes d''information de la Gendarmerie Royale. Les spécialistes de ce domaine développent des solutions logicielles sur-mesure répondant aux exigences strictes de résilience, de confidentialité et de haute disponibilité opérationnelle.',
        N'["Conception d''architectures applicatives web et mobiles sécurisées","Développement d''API métier et de microservices de coordination","Maintenance corrective et évolutive des progiciels de commandement","Intégration continue, tests de charge et automatisation des déploiements","Audit de code source et respect des référentiels de sécurité militaire"]',
        N'["Algorithmique avancée et programmation orientée objet (JavaScript, TypeScript, Python, C#, Go)","Architectures web modernes (React, Next.js, Node.js, REST, GraphQL)","Bases de données relationnelles et SQL avancé (SQL Server, PostgreSQL)","Gestion de versions Git et pipelines CI/CD (GitHub Actions, GitLab CI)","Sécurisation du code (OWASP Top 10, sanitization, gestion des secrets)"]',
        N'["Rigueur logique et capacité d''abstraction","Curiosité intellectuelle et veille technologique permanente","Esprit d''équipe et méthodologie de travail rigoureuse","Sens aigu de la confidentialité et de la discrétion militaire"]',
        N'["Environnements de développement professionnels (VS Code, JetBrains)","Conteneurs et orchestration (Docker, Kubernetes)","SGBD SQL Server et PostgreSQL","Outils d''audit de sécurité de code (SonarQube, Snyk)","Frameworks de test automatisé (Jest, Cypress, Playwright)"]',
        N'["Portail centralisé de coordination des alertes et interventions de secours","Application sécurisée de consultation des registres d''enquête judiciaire sur le terrain","Système automatisé de gestion de suivi des effectifs et des matériels sensibles"]',
        N'[{"id":"MOD-DEV-01","titre":"Fondamentaux du Génie Logiciel Militaire","duree":"4h 00min","difficulte":"Fondamental"},{"id":"MOD-DEV-02","titre":"Développement d''API Sécurisées et Résilientes","duree":"5h 30min","difficulte":"Intermédiaire"},{"id":"MOD-DEV-03","titre":"Architectures Haute Disponibilité pour Postes de Commandement","duree":"6h 00min","difficulte":"Avancé"}]',
        N'["programmation","developpement","logiciel","code","web","javascript","python","react","sql","algorithme","api","informatique"]',
        'Code',
        'blue',
        'bg-blue-100 text-blue-800 border-blue-300',
        '/images/ateliers/dom-dev.webp',
        1
    ),
    (
        'DOM-SYS',
        N'Réseaux et Administration Systèmes',
        N'الشبكات وإدارة الأنظمة المعلوماتية',
        'TECHNOLOGIQUE',
        N'Supervision, administration et interconnexion résiliente des infrastructures réseau, serveurs tactiques et centres de données.',
        N'Le domaine Réseaux et Administration Systèmes garantit la continuité de service des liaisons de communication et des plateformes serveur. Il configure et supervise les infrastructures physiques et virtualisées assurant la liaison permanente entre les brigades de terrain, les compagnies et le Haut Commandement.',
        N'["Administration et durcissement des serveurs Windows Server et Linux","Configuration des routeurs tactiques, commutateurs de niveau 3 et VLANs sécurisés","Supervision 24/7 de la connectivité réseau et détection des pannes d''infrastructure","Mise en place et contrôle des sauvegardes géorépliquées et des plans de reprise d''activité (PRA)","Gestion des annuaires d''entreprise, PKI interne et contrôle d''accès RBAC"]',
        N'["Protocoles réseaux fondamentaux (TCP/IP, BGP, OSPF, DNS, DHCP, VPN IPsec)","Virtualisation de serveurs et stockage (VMware ESXi, Proxmox, SAN, NAS)","Administration système avancée (Linux RHEL/Debian, Windows Server, Active Directory)","Scripting d''automatisation (Bash, PowerShell, Ansible)","Supervision d''infrastructure (Zabbix, Prometheus, Grafana)"]',
        N'["Réactivité opérationnelle et sang-froid face aux incidents","Méthode d''analyse diagnostique systématique","Sens des responsabilités et engagement pour la continuité de service","Capacité à intervenir en horaires décalés en situation d''urgence"]',
        N'["Routeurs et switchs de grade industriel/militaire (Cisco, Fortinet)","Baies de serveurs rackables et stockage distribué","Pare-feu nouvelle génération (NGFW)","Outils d''analyse de paquets (Wireshark, tcpdump)","Systèmes d''onduleurs haute puissance et groupes électrogènes de secours"]',
        N'["Déploiement d''un réseau tactique maillé temporaire lors d''un poste de commandement avancé","Isolation étanche d''un réseau judiciaire sensible via micro-segmentation","Migration sans interruption de service d''une grappe de serveurs d''authentification"]',
        N'[{"id":"MOD-SYS-01","titre":"Architecture Réseau et Routage Sécurisé","duree":"4h 30min","difficulte":"Fondamental"},{"id":"MOD-SYS-02","titre":"Administration Système et Durcissement d''Infrastructure","duree":"5h 00min","difficulte":"Intermédiaire"},{"id":"MOD-SYS-03","titre":"Continuité d''Activité et Déploiement Réseau de Crise","duree":"5h 30min","difficulte":"Avancé"}]',
        N'["reseau","systeme","serveur","linux","windows","ip","vpn","cisco","active directory","administration","infrastructure","virtualisation"]',
        'Server',
        'indigo',
        'bg-indigo-100 text-indigo-800 border-indigo-300',
        '/images/ateliers/dom-sys.webp',
        2
    ),
    (
        'DOM-CYBER',
        N'Cybersécurité',
        N'الأمن السيبراني والدفاع الرقمي',
        'TECHNOLOGIQUE',
        N'Protection proactive, détection des menaces, réponse aux cyberattaques et analyse médico-légale des incidents numériques.',
        N'La Cybersécurité est une priorité stratégique de souveraineté nationale. Ce domaine forme des spécialistes capables d''anticiper les menaces numériques, de défendre les infrastructures critiques contre les intrusions, d''analyser les codes malveillants et de conduire des investigations numériques avancées pour soutenir les enquêtes judiciaires.',
        N'["Surveillance continue au sein d''un Security Operations Center (SOC)","Analyse de logiciels malveillants et reverse-engineering de souches malicieuses","Réalisation de tests d''intrusion (pentest) et audits de vulnérabilités autorisés","Gestion de crise cyber et confinement immédiat des postes compromis","Extraction et conservation de preuves numériques selon les normes de police judiciaire (forensics)"]',
        N'["Connaissance approfondie des architectures d''attaque (MITRE ATT&CK, kill chains)","Maîtrise des outils SIEM, EDR et pare-feu applicatifs (WAF)","Analyse forensic sur disques, mémoires vives et flux réseaux (Autopsy, Volatility)","Cryptographie appliquée, protocoles TLS et gestion des clés","Techniques de pentesting éthique (Kali Linux, Burp Suite, Metasploit)"]',
        N'["Intégrité morale irréprochable et éthique stricte","Patience, minutie et persévérance dans l''analyse d''anomalies subtiles","Capacité d''adaptation rapide face aux nouvelles techniques des attaquants","Esprit critique et esprit de synthèse pour les comptes-rendus hiérarchiques"]',
        N'["Plateformes SIEM / SOAR militaires (Splunk, Elastic SIEM, TheHive)","Postes d''analyse forensic isolés en cage de Faraday","Sondes réseau IDS/IPS (Suricata, Snort)","Bancs de reverse engineering et bacs à sable (Ghidra, IDA Pro, Cuckoo)"]',
        N'["Détection et neutralisation d''une tentative d''exfiltration de données confidentielles","Analyse médico-légale d''un smartphone saisi dans le cadre d''une enquête de grand banditisme","Audit de conformité de sécurité sur le système de contrôle d''accès d''une base aérienne"]',
        N'[{"id":"MOD-CYBER-01","titre":"Fondamentaux de la Cyberdéfense et Cartographie des Menaces","duree":"4h 00min","difficulte":"Fondamental"},{"id":"MOD-CYBER-02","titre":"Investigation Numérique (Forensics) & Preuve Judiciaire","duree":"6h 00min","difficulte":"Intermédiaire"},{"id":"MOD-CYBER-03","titre":"Gestion d''Incident Cyber et Confinement d''Attaque","duree":"6h 30min","difficulte":"Avancé"}]',
        N'["cyber","securite","piratage","forensic","siem","intrusion","malware","cryptographie","enquete","protection","vulnerabilite","defense"]',
        'ShieldAlert',
        'red',
        'bg-red-100 text-red-800 border-red-300',
        '/images/ateliers/dom-cyber.webp',
        3
    ),
    (
        'DOM-MECA',
        N'Mécanique et Maintenance',
        N'الميكانيك والصيانة التقنية للآليات',
        'TECHNIQUE_LOGISTIQUE',
        N'Maintien en condition opérationnelle (MCO) du parc roulant blindé, tactique, tout-terrain et des engins spécialisés.',
        N'Le domaine Mécanique et Maintenance garantit la disponibilité permanente des véhicules d''intervention, des engins nautiques et des moyens mobiles de la Gendarmerie Royale. Il couvre le diagnostic mécanique de pointe, la réfection des groupes motopropulseurs, l''hydraulique lourde et la préparation tout-terrain pour zones hostiles.',
        N'["Diagnostic informatisé et dépannage rapide des véhicules de patrouille et d''escorte","Entretien lourd et révision des blindés légers et engins de maintien de l''ordre","Maintenance préventive et curative des moteurs marins hors-bord et in-board","Dépannage d''urgence et projection de détachements mécaniques mobiles sur le terrain","Contrôle réglementaire de sécurité, gestion des pneumatiques et fluides opérationnels"]',
        N'["Mécanique diesel et essence moderne (injection haute pression, suralimentation)","Systèmes de freinage ABS/ESP tactique et liaisons au sol renforcées","Circuits hydrauliques, pneumatiques et transmissions 4x4 tout-terrain","Diagnostic électronique par valise constructeur et analyse oscilloscopique","Techniques de soudure (TIG, MIG), chaudronnerie et ajustage de pièces"]',
        N'["Sens du concret, habileté manuelle et précision gestuelle","Résistance physique et goût pour le travail en atelier et sur le terrain","Esprit de sécurité strict pour la manipulation d''engins lourds","Sens du devoir et fierté de garantir la sécurité des équipages opérationnels"]',
        N'["Ponts élévateurs lourds et fosses de maintenance sécurisées","Valises de diagnostic électronique multimarques et militaires","Stations de vidange, bancs de géométrie laser et équilibreuses","Outillage pneumatique et dynamométrique de haute précision"]',
        N'["Remise en état express d''un convoi d''escorte avant une mission de protection officielle","Diagnostic d''une avarie moteur sur une vedette rapide de surveillance côtière","Renforcement des trains roulants de véhicules tout-terrain pour déploiement en zone désertique"]',
        N'[{"id":"MOD-MECA-01","titre":"Diagnostic Mécanique & Systèmes d''Intervention Roulants","duree":"4h 30min","difficulte":"Fondamental"},{"id":"MOD-MECA-02","titre":"Maintenance des Motorisations Spécifiques & Transmissions 4x4","duree":"5h 30min","difficulte":"Intermédiaire"},{"id":"MOD-MECA-03","titre":"Projection Mécanique d''Urgence & Entretien Engins Blindés","duree":"6h 00min","difficulte":"Avancé"}]',
        N'["mecanique","moteur","vehicule","maintenance","reparation","diagnostic","automobile","atelier","blindé","4x4","technique"]',
        'Wrench',
        'amber',
        'bg-amber-100 text-amber-800 border-amber-300',
        '/images/ateliers/dom-meca.webp',
        4
    ),
    (
        'DOM-ELEC-EMB',
        N'Électronique et Systèmes Embarqués',
        N'الإلكترونيات والأنظمة المدمجة',
        'TECHNIQUE_LOGISTIQUE',
        N'Intégration, paramétrage et réparation des équipements électroniques embarqués, capteurs optroniques et calculateurs de bord.',
        N'Ce domaine est au cœur de la modernisation technologique des unités. Il s''intéresse aux systèmes électroniques qui équipent les véhicules de patrouille, les aéronefs, les vedettes maritimes et les postes de commandement : sirènes prioritaires, caméras embarquées, systèmes de géolocalisation sécurisés et calculateurs temps réel.',
        N'["Intégration et câblage normalisé d''équipements tactiques dans les véhicules de service","Maintenance des systèmes optroniques (caméras thermiques, projecteurs de poursuite)","Dépannage au composant sur cartes électroniques et bus de communication (CAN, LIN)","Configuration des centrales d''acquisition de données et balises de géolocalisation","Protection contre les interférences électromagnétiques et durcissement environnemental"]',
        N'["Électronique analogique et numérique (microcontrôleurs, capteurs, actionneurs)","Analyse des bus multiplexés automobiles et aéronautiques (CAN bus, ARINC)","Lecture de schémas électriques complexes et diagnostic à l''oscilloscope","Techniques de brasage CMS haute fiabilité et isolation de faisceaux","Programmation bas-niveau de calculateurs embarqués (C, C++, assembleur)"]',
        N'["Grande minutie, patience et soin du détail","Raisonnement logique et démarche d''investigation pas à pas","Attrait pour l''innovation technologique et l''intégration matériel/logiciel","Rigueur dans l''application des normes de sécurité électrique"]',
        N'["Oscilloscopes numériques à mémoire et multimètres de précision","Stations de soudage et déshabillage CMS à air chaud régulé","Analyseurs logiques et renifleurs de bus CAN","Alimentations stabilisées de laboratoire et générateurs de signaux"]',
        N'["Installation d''un système de lecture automatique de plaques d''immatriculation (LAPI) sur patrouilleur","Réparation au composant d''un module de commande d''optronique thermique maritime","Calibration des capteurs d''assiette et de télémétrie sur véhicule d''intervention rapide"]',
        N'[{"id":"MOD-ELEC-01","titre":"Circuits Électroniques & Bus Embarqués (CAN / LIN)","duree":"4h 00min","difficulte":"Fondamental"},{"id":"MOD-ELEC-02","titre":"Systèmes Optroniques, Radars & Capteurs Spécialisés","duree":"5h 00min","difficulte":"Intermédiaire"},{"id":"MOD-ELEC-03","titre":"Intégration Tactique & Durcissement Électromagnétique","duree":"5h 30min","difficulte":"Avancé"}]',
        N'["electronique","composant","embarque","circuit","capteur","calculateur","câblage","can bus","optronique","multiplexage"]',
        'Cpu',
        'teal',
        'bg-teal-100 text-teal-800 border-teal-300',
        '/images/ateliers/dom-elec-emb.webp',
        5
    ),
    (
        'DOM-DRONE',
        N'Robotique et Drones',
        N'الروبوتات والطائرات المسيرة (الدرون)',
        'TECHNOLOGIQUE',
        N'Pilotage tactique, programmation de missions autonomes, maintenance et exploitation de la flotte de drones aériens et terrestres.',
        N'Le domaine Robotique et Drones apporte une supériorité informationnelle décisive lors des opérations de recherche, de surveillance frontalière, de sauvetage en montagne et de gestion des crises majeures. Les spécialistes maîtrisent la préparation de vol, le pilotage en immersion, l''analyse vidéo temps réel et la maintenance technique des vecteurs.',
        N'["Préparation et exécution de missions de reconnaissance aérienne par drone","Télédétection et retransmission vidéo chiffrée vers le centre de commandement","Pilotage de robots terrestres de déminage et d''inspection en zone hostile","Maintenance préventive des rotors, moteurs brushless, batteries LiPo et liaisons de télémétrie","Respect strict de la réglementation de l''espace aérien et sécurité des tiers"]',
        N'["Pilotage précis en conditions météorologiques complexes (vent, vol nocturne thermique)","Mécanique de précision appliquée aux aéronefs légers et voilures tournantes","Systèmes de transmission radio HF/UHF, liaisons satellite et cryptage de flux vidéo","Traitement de l''image, cartographie 3D et photogrammétrie d''urgence","Connaissances aéronautiques, météorologiques et navigation aux instruments"]',
        N'["Concentration soutenue et excellente acuité spatiale","Calme et lucidité lors des phases critiques de vol","Esprit de discipline et respect scrupuleux des check-lists de sécurité","Sens tactique pour optimiser les angles de prise de vue opérationnels"]',
        N'["Flotte de drones professionnels multirotors et ailes volantes longue portée","Caméras gyrostabilisées bi-spectrales (optique 4K et thermique infrarouge)","Stations sol durcies (GCS) avec liaison satellite et écrans haute luminosité","Robots d''intervention chenillés téléopérés pour reconnaissance à risque"]',
        N'["Localisation nocturne d''une personne égarée en zone forestière escarpée grâce au capteur thermique","Surveillance aérienne discrète d''un convoi suspect lors d''une opération coordonnée","Modélisation 3D photogrammétrique rapide d''une scène d''accident majeur pour les enquêteurs"]',
        N'[{"id":"MOD-DRONE-01","titre":"Réglementation, Sécurité de Vol & Pilotage Tactique de Base","duree":"4h 30min","difficulte":"Fondamental"},{"id":"MOD-DRONE-02","titre":"Capteurs Optroniques, Thermographie & Télémétrie Chiffrée","duree":"5h 30min","difficulte":"Intermédiaire"},{"id":"MOD-DRONE-03","titre":"Coordination Opérationnelle Drone / Unités au Sol","duree":"6h 00min","difficulte":"Avancé"}]',
        N'["drone","robotique","pilotage","uav","camera","thermique","surveillance","aerien","capteur","telemetrie","reconnaissance"]',
        'Plane',
        'cyan',
        'bg-cyan-100 text-cyan-800 border-cyan-300',
        '/images/ateliers/dom-drone.webp',
        6
    ),
    (
        'DOM-DATA-IA',
        N'Data Science et Intelligence Artificielle',
        N'علم البيانات والذكاء الاصطناعي',
        'TECHNOLOGIQUE',
        N'Exploitation intelligente des données de sécurité, analyse prédictive, traitement du langage naturel et aide à la décision opérationnelle.',
        N'La Data Science et l''IA démultiplient l''efficacité des analyses criminelles et de l''anticipation des risques. Ce domaine développe des modèles de détection de motifs atypiques, de traitement automatique de documents multilingues (arabe, français, amazigh, dialectes) et de cartographie prédictive des zones à risque.',
        N'["Conception de pipelines d''ingestion et de normalisation de données volumineuses","Développement de modèles de Machine Learning pour l''aide au ciblage préventif","Traitement du langage naturel (NLP) pour l''extraction d''entités dans les rapports textuels","Création de tableaux de bord interactifs et de visualisations géospatiales pour le commandement","Garantie éthique, explicabilité des algorithmes et conformité réglementaire de la protection des données"]',
        N'["Langages d''analyse de données et d''IA (Python, SQL, R)","Bibliothèques de Machine Learning et Deep Learning (scikit-learn, PyTorch, Transformers)","Architectures de traitement de données massives (Spark, Pandas, ETL modernes)","Bases de données vectorielles et architectures RAG (Retrieval-Augmented Generation)","Visualisation de données et cartographie (Power BI, D3.js, Leaflet, Folium)"]',
        N'["Pensée critique et discernement quant aux limites des modèles statistiques","Rigueur mathématique et probité scientifique absolue","Capacité à vulgariser des concepts algorithmiques complexes pour les décideurs","Créativité méthodologique pour résoudre des problématiques inédites"]',
        N'["Serveurs de calcul haute performance équipés de processeurs graphiques (GPU)","Plateformes d''orchestration de données et notebooks collaboratifs","Modèles de fondation multilingues auto-hébergés et souverains","Outils de cartographie SIG (Système d''Information Géographique)"]',
        N'["Analyse de corrélations temporelles et géographiques sur les accidents de la circulation","Assistant IA d''aide à la rédaction de synthèses d''enquête avec recherche documentaire contextuelle","Modèle de reconnaissance acoustique de bruits anormaux en milieu sous-marin ou frontière"]',
        N'[{"id":"MOD-DATA-01","titre":"Fondamentaux de la Data Science & Analyse Statistique Sécurisée","duree":"4h 30min","difficulte":"Fondamental"},{"id":"MOD-DATA-02","titre":"Traitement du Langage Naturel & Extraction d''Informations","duree":"6h 00min","difficulte":"Intermédiaire"},{"id":"MOD-DATA-03","titre":"Modèles Prédictifs & Tableaux de Bord Tactiques pour Décideurs","duree":"6h 30min","difficulte":"Avancé"}]',
        N'["data","ia","intelligence artificielle","machine learning","statistiques","python","analyse","algorithme","prediction","big data","nlp"]',
        'Brain',
        'purple',
        'bg-purple-100 text-purple-800 border-purple-300',
        '/images/ateliers/dom-data-ia.webp',
        7
    ),
    (
        'DOM-ELEC-DIAG',
        N'Électricité et Diagnostic Technique',
        N'الكهرباء والتشخيص التقني للبنية التحتية',
        'TECHNIQUE_LOGISTIQUE',
        N'Garantie de l''alimentation électrique ininterrompue, maintenance des groupes électrogènes, postes de transformation et diagnostics d''installations.',
        N'L''énergie est le préalable absolu à toute action de commandement et de transmission. Ce domaine forme des spécialistes capables de concevoir, d''auditer et de secourir les réseaux électriques des casernes, des postes isolés, des centres de transmission et des bases avancées, assurant une autonomie complète même en cas de rupture du réseau civil.',
        N'["Maintenance et essais périodiques des groupes électrogènes de forte puissance et inverseurs de source","Diagnostic thermique infrarouge des armoires électriques et détection d''échauffements","Installation et raccordement de solutions d''énergie renouvelable (solaire photovoltaïque) pour postes isolés","Contrôle périodique de conformité des réseaux de terre et parafoudres des sites sensibles","Déploiement rapide de réseaux électriques provisoires lors de postes de commandement de secours"]',
        N'["Électrotechnique fondamentale, haute et basse tension (HTA / BT)","Normes de sécurité électrique militaire et habilitations professionnelles de niveau élevé","Fonctionnement et régulation des alternateurs, onduleurs industriels et bancs de batteries","Utilisation de caméras thermographiques et analyseurs de réseau électrique","Lecture de schémas unifilaires industriels et calculs de bilan de puissance"]',
        N'["Vigilance maximale et respect inflexible des procédures de consignation électrique","Sang-froid et méthodologie face aux situations d''urgence énergétique","Autonomie d''intervention sur des sites isolés ou en conditions météo dégradées","Sens du service pour préserver la sécurité de tous les occupants des emprises"]',
        N'["Caméras thermiques d''inspection industrielle","Appareils de mesure multifonctions (résistance d''isolement, boucle de terre)","Groupes électrogènes mobiles insonorisés de 50 à 250 kVA","Bancs de charge résistifs pour tests de groupes de secours","Kits de consignation électrique et équipements de protection individuelle (EPI) HT"]',
        N'["Bascule sans coupure sur groupe électrogène lors d''un black-out régional pour maintenir le centre 177 opérationnel","Déploiement d''un champ solaire photovoltaïque autonome pour alimenter un poste de surveillance côtier isolé","Diagnostic et remplacement d''un disjoncteur général haute puissance au sein d''un état-major"]',
        N'[{"id":"MOD-ELEC-DIAG-01","titre":"Normes Électriques, Sécurité & Habilitations Opérationnelles","duree":"4h 00min","difficulte":"Fondamental"},{"id":"MOD-ELEC-DIAG-02","titre":"Groupes de Secours, Onduleurs & Autonomie Énergétique","duree":"5h 00min","difficulte":"Intermédiaire"},{"id":"MOD-ELEC-DIAG-03","titre":"Diagnostic Thermographique & Réseaux Électriques de Crise","duree":"5h 30min","difficulte":"Avancé"}]',
        N'["electricite","electrotechnique","energie","groupe electrogene","batterie","tension","diagnostic","onduleur","solaire","alimentation"]',
        'Zap',
        'yellow',
        'bg-yellow-100 text-yellow-800 border-yellow-300',
        '/images/ateliers/dom-elec-diag.webp',
        8
    ),
    (
        'DOM-LOGISTIQUE',
        N'Logistique et Gestion du Matériel',
        N'اللوجستيك وإدارة العتاد والتموين',
        'TECHNIQUE_LOGISTIQUE',
        N'Planification, stockage, approvisionnement et traçabilité rigoureuse des armements, tenues, équipements de protection et matériels opérationnels.',
        N'Aucune opération ne peut réussir sans une logistique sans faille. Ce domaine assure la chaîne complète d''approvisionnement : gestion informatisée des stocks, traçabilité millimétrée des matériels sensibles, gestion des flux de vivres et carburants, transport sécurisé et conditionnement tactique pour les unités engagées sur le terrain.',
        N'["Gestion informatisée des inventaires et tenue des registres de comptabilité matière","Contrôle périodique, stockage sécurisé et délivrance des armements et munitions de dotation","Organisation de la chaîne du froid, de l''habillement et du ravitaillement opérationnel","Planification des mouvements logistiques de fret lourd et des convois d''approvisionnement","Gestion du cycle de vie des matériels, déclassement réglementaire et réapprovisionnement"]',
        N'["Gestion de chaîne logistique (Supply Chain Management) et méthodes d''inventaire (FIFO, Kanban)","Utilisation des progiciels de gestion intégrée (ERP logistique) et technologies code-barres / RFID","Réglementation stricte sur le transport de matières dangereuses (ADR) et munitions","Organisation rationnelle de dépôts et entrepôts de stockage haute sécurité","Calculs d''autonomie logistique et gestion des réserves stratégiques"]',
        N'["Rigueur d''organisation exemplaire et probité absolue","Sens aigu de l''anticipation et capacité de planification à moyen/long terme","Méthode, sens de l''ordre et souci de la traçabilité documentaire","Capacité à négocier et coordonner de multiples intervenants sous contrainte de temps"]',
        N'["Logiciels de gestion de stocks et de magasinage sécurisé","Lecteurs optiques durcis et étiquettes RFID pour traçabilité instantanée","Chariots élévateurs télescopiques et engins de manutention tout-terrain","Véhicules de transport logistique blindés et plateaux porte-conteneurs","Armureries sécurisées à accès biométrique et coffres ignifuges"]',
        N'["Montage d''un pont logistique d''urgence pour ravitailler des brigades isolées par de fortes chutes de neige","Distribution ordonnée et tracée de 500 tenues de protection balistique avant un événement d''envergure","Inventaire contradictoire annuel sans écart d''une armurerie régimentaire"]',
        N'[{"id":"MOD-LOG-01","titre":"Principes Fondamentaux de la Logistique Militaire & Comptabilité Matière","duree":"4h 00min","difficulte":"Fondamental"},{"id":"MOD-LOG-02","titre":"Traçabilité Sécurisée, Armements & Munitions de Dotation","duree":"5h 00min","difficulte":"Intermédiaire"},{"id":"MOD-LOG-03","titre":"Planification de Convois & Ravitaillement Opérationnel en Crise","duree":"5h 30min","difficulte":"Avancé"}]',
        N'["logistique","stock","materiel","approvisionnement","armement","transport","inventaire","ravitaillement","magasin","equipement"]',
        'Boxes',
        'orange',
        'bg-orange-100 text-orange-800 border-orange-300',
        '/images/ateliers/dom-logistique.webp',
        9
    ),
    (
        'DOM-TELECOM',
        N'Télécommunications et Radiocommunication',
        N'المواصلات السلكية واللاسلكية والبث الإذاعي',
        'TECHNOLOGIQUE',
        N'Déploiement et sécurisation des réseaux radio tactiques (VHF/UHF/PMR), faisceaux hertziens, communications chiffrées et liaisons satellitaires.',
        N'Les transmissions sont les nerfs des opérations de la Gendarmerie Royale. Ce domaine maîtrise les réseaux de radiocommunication professionnelle (Tetrapol / DMR / LTE tactique), les liaisons satellitaires d''urgence et les postes émetteurs-récepteurs portatifs, garantissant que chaque patrouille reste joignable à chaque instant, y compris dans les zones blanches.',
        N'["Déploiement et réglage de relais radio d''altitude et pylônes de transmission temporaires","Programmation des postes portatifs et mobiles avec clés de chiffrement souveraines","Gestion des fréquences radioélectriques et élimination des brouillages et parasites","Mise en œuvre des valises de communication satellite d''urgence (VSAT, Inmarsat, BGAN)","Interconnexion des réseaux radio avec les centres de commandement et de renseignement"]',
        N'["Propagation des ondes radioélectriques et bilans de liaison en environnement montagneux/urbain","Protocoles de radiocommunication numérique sécurisée (Tetrapol, DMR, P25, LTE tactique)","Techniques de chiffrement matériel voix et données (AES, clés de saut de fréquence)","Installation et alignement d''antennes directives, omnidirectionnelles et faisceaux hertziens","Utilisation d''analyseurs de spectre RF, wattmètres et mesureurs de TOS (taux d''ondes stationnaires)"]',
        N'["Précision technique et rigueur dans l''application des consignes de sécurité des communications","Adaptabilité terrain pour intervenir sur des sommets escarpés ou conditions météo rudes","Esprit de synthèse pour diagnostiquer rapidement les coupures de signal","Discrétion absolue quant aux fréquences et protocoles tactiques utilisés"]',
        N'["Analyseurs de spectre RF portatifs professionnels","Postes radio tactiques militaires durcis (manpack, vehiculaire, portatif)","Valises de transmissions satellitaires haut débit autonomes","Pylônes télescopiques d''antenne à haubanage rapide","Générateurs de clés de chiffrement matérielles sécurisées"]',
        N'["Rétablissement en moins de deux heures d''une liaison radio de commandement rompue par un orage sur un relais montagneux","Mise en place d''un réseau radio chiffré dédié lors d''une visite diplomatique de haut niveau","Déploiement d''une station satellite portable permettant la transmission vidéo live depuis une zone isolée"]',
        N'[{"id":"MOD-TEL-01","titre":"Propagation RF, Antennes & Réseaux Radio Mobiles (PMR)","duree":"4h 30min","difficulte":"Fondamental"},{"id":"MOD-TEL-02","titre":"Chiffrement Tactique, Clés & Sécurité des Transmissions","duree":"5h 00min","difficulte":"Intermédiaire"},{"id":"MOD-TEL-03","titre":"Liaisons Satellitaires d''Urgence & Faisceaux Hertziens","duree":"6h 00min","difficulte":"Avancé"}]',
        N'["telecom","radio","transmission","ondes","frequence","satellite","antenne","vhf","uhf","chiffrement","relais","communication"]',
        'Radio',
        'sky',
        'bg-sky-100 text-sky-800 border-sky-300',
        '/images/ateliers/dom-telecom.webp',
        10
    )
) AS source (
    Code, Titre, TitreAr, Categorie, DescriptionCourte, Presentation, Missions,
    CompetencesTechniques, QualitesPersonnelles, TechnologiesEquipements,
    ExemplesApplications, ModulesPedagogiques, MotsClesCompatibilite, Icone,
    Couleur, BadgeClass, ImageUrl, PoidsPriorite
)
ON target.Code = source.Code
WHEN MATCHED THEN
    UPDATE SET
        Titre = source.Titre,
        TitreAr = source.TitreAr,
        Categorie = source.Categorie,
        DescriptionCourte = source.DescriptionCourte,
        Presentation = source.Presentation,
        Missions = source.Missions,
        CompetencesTechniques = source.CompetencesTechniques,
        QualitesPersonnelles = source.QualitesPersonnelles,
        TechnologiesEquipements = source.TechnologiesEquipements,
        ExemplesApplications = source.ExemplesApplications,
        ModulesPedagogiques = source.ModulesPedagogiques,
        MotsClesCompatibilite = source.MotsClesCompatibilite,
        Icone = source.Icone,
        Couleur = source.Couleur,
        BadgeClass = source.BadgeClass,
        ImageUrl = source.ImageUrl,
        PoidsPriorite = source.PoidsPriorite,
        DateModification = GETDATE()
WHEN NOT MATCHED THEN
    INSERT (
        Code, Titre, TitreAr, Categorie, DescriptionCourte, Presentation, Missions,
        CompetencesTechniques, QualitesPersonnelles, TechnologiesEquipements,
        ExemplesApplications, ModulesPedagogiques, MotsClesCompatibilite, Icone,
        Couleur, BadgeClass, ImageUrl, PoidsPriorite
    )
    VALUES (
        source.Code, source.Titre, source.TitreAr, source.Categorie, source.DescriptionCourte, source.Presentation, source.Missions,
        source.CompetencesTechniques, source.QualitesPersonnelles, source.TechnologiesEquipements,
        source.ExemplesApplications, source.ModulesPedagogiques, source.MotsClesCompatibilite, source.Icone,
        source.Couleur, source.BadgeClass, source.ImageUrl, source.PoidsPriorite
    );
GO

