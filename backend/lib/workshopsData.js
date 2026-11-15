// ==============================================================================
// ORIENT-GR — Référentiel des Ateliers Pratiques & Compétences Métier
// وحدة الكفاءات المهنية والورشات التطبيقية الميدانية للدرك الملكي
// ==============================================================================

/**
 * Matrice standard officielle d'évaluation sur 20 points (4 x 5 points)
 * Appliquée par défaut à l'ensemble des ateliers pratiques
 */
export const STANDARD_WORKSHOP_CRITERIA = [
  {
    critereId: 'CRIT-SEC-METH',
    code: 'SECURITE_METHODOLOGIE',
    intitule: 'Sécurité et méthodologie',
    intituleAr: 'السلامة والمنهجية الميدانية',
    pointsMax: 5,
    description: 'Respect strict des consignes de sécurité, port obligatoire des EPI, ordre de la zone de travail et conformité des protocoles.',
    descriptionAr: 'الالتزام الصارم بقواعد السلامة، ارتداء معدات الوقاية الفردية، وتطبيق منهجية العمل المنظمة.'
  },
  {
    critereId: 'CRIT-DIAG-PREC',
    code: 'PRECISION_DIAGNOSTIC',
    intitule: 'Précision du diagnostic',
    intituleAr: 'دقة التشخيص التقني',
    pointsMax: 5,
    description: 'Exactitude de la démarche d\'investigation, identification sans devinette de l\'anomalie ou du besoin technique.',
    descriptionAr: 'الدقة في الفحص والتشخيص المنهجي للأعطال والبيانات التقنية بدون تخمين.'
  },
  {
    critereId: 'CRIT-EXEC-QUAL',
    code: 'QUALITE_EXECUTION',
    intitule: 'Qualité de l\'exécution technique',
    intituleAr: 'جودة الإنجاز والإتقان المهني',
    pointsMax: 5,
    description: 'Dextérité manuelle, maîtrise du geste professionnel, qualité des réglages, du montage ou de l\'intervention.',
    descriptionAr: 'البراعة التقنية، نظافة التركيب والإصلاح، ومطابقة الضبط للمعايير الفنية.'
  },
  {
    critereId: 'CRIT-TPS-DISC',
    code: 'TEMPS_DISCIPLINE',
    intitule: 'Gestion du temps et discipline militaire',
    intituleAr: 'تدبير الوقت والانضباط العسكري',
    pointsMax: 5,
    description: 'Respect du temps imparti, sang-froid, posture et maintien militaire, remise en ordre immédiate du poste.',
    descriptionAr: 'احترام التوقيت المحدد، الهدوء، الهيئة العسكرية، وإعادة ترتيب وتسليم محطة العمل.'
  }
];

/**
 * Les 4 catégories professionnelles pratiques officielles
 */
export const workshopCategories = [
  {
    id: 'CAT-INFO',
    code: 'INFO_RESEAUX',
    intituleFr: 'Informatique & Réseaux',
    intituleAr: 'المعلوميات والشبكات',
    icone: 'Cpu',
    couleur: 'blue',
    descriptionFr: 'Maintenance des systèmes tactiques, déploiement des réseaux locaux d\'unité, administration bureautique avancée et intégrité des données.',
    descriptionAr: 'صيانة الأنظمة المعلوماتية العملياتية، تركيب وضبط الشبكات المحلية للسرية، والتدبير المتقدم لقواعد البيانات والمكتبيات.',
    sousDomaines: [
      { id: 'SUB-INFO-1', titreFr: 'Maintenance informatique et systèmes d\'exploitation', titreAr: 'صيانة الحواسيب وأنظمة التشغيل' },
      { id: 'SUB-INFO-2', titreFr: 'Installation et dépannage des réseaux locaux', titreAr: 'تركيب وصيانة الشبكات المحلية' },
      { id: 'SUB-INFO-3', titreFr: 'Bureautique avancée et gestion des données Excel', titreAr: 'المكتبيات المتقدمة وتحليل ومعالجة البيانات' }
    ],
    specialitesCibles: ['SPEC-INFO', 'SPEC-SEC-INFO', 'SPEC-PJ']
  },
  {
    id: 'CAT-MECA',
    code: 'MECA_AUTO',
    intituleFr: 'Mécanique & Électricité Automobile',
    intituleAr: 'ميكانيك وكهرباء السيارات',
    icone: 'Wrench',
    couleur: 'amber',
    descriptionFr: 'Diagnostic des pannes mécaniques et électroniques, révision des moteurs d\'intervention et maintenance de la flotte tout-terrain.',
    descriptionAr: 'تشخيص الأعطال الميكانيكية والإلكترونية، صيانة محركات التدخل السريع، وتأهيل مركبات الدورية والمطاردة.',
    sousDomaines: [
      { id: 'SUB-MECA-1', titreFr: 'Diagnostic des pannes automobiles', titreAr: 'تشخيص الأعطال الميكانيكية والهيدروليكية' },
      { id: 'SUB-MECA-2', titreFr: 'Maintenance moteur et système de refroidissement', titreAr: 'صيانة المحركات ومنظومات التبريد' },
      { id: 'SUB-MECA-3', titreFr: 'Diagnostic électronique automobile OBD', titreAr: 'الفحص الإلكتروني للسيارات عبر جهاز OBD' }
    ],
    specialitesCibles: ['SPEC-MOTARD', 'SPEC-PSIG', 'SPEC-GM']
  },
  {
    id: 'CAT-TELECOM',
    code: 'ELEC_TELECOM',
    intituleFr: 'Électronique & Télécommunications',
    intituleAr: 'الإلكترونيات والاتصالات اللاسلكية',
    icone: 'Radio',
    couleur: 'emerald',
    descriptionFr: 'Maintenance des émetteurs-récepteurs tactiques VHF/UHF, mesure haute fréquence, antennes et réparation électronique de précision.',
    descriptionAr: 'صيانة أجهزة الاتصال اللاسلكي العسكري، ضبط الهوائيات والترددات المشفرة، والإصلاح الدقيق للدارات الإلكترونية.',
    sousDomaines: [
      { id: 'SUB-TEL-1', titreFr: 'Maintenance des équipements électroniques', titreAr: 'صيانة الأجهزة والدارات الإلكترونية الحساسة' },
      { id: 'SUB-TEL-2', titreFr: 'Diagnostic des équipements de communication', titreAr: 'فحص وتعديل أجهزة الإرسال والاستقبال اللاسلكي' }
    ],
    specialitesCibles: ['SPEC-INFO', 'SPEC-GSI', 'SPEC-MOTARD']
  },
  {
    id: 'CAT-LOG',
    code: 'LOG_MAINT',
    intituleFr: 'Logistique & Maintenance Générale',
    intituleAr: 'اللوجستيك والصيانة العامة',
    icone: 'Boxes',
    couleur: 'purple',
    descriptionFr: 'Gestion des approvisionnements, traçabilité des dotations et matériels sensibles, maintenance des infrastructures et groupes de secours.',
    descriptionAr: 'تدبير المخزون والعتاد الحساس، تتبع أذونات الصرف، والصيانة العامة لمرافق الثكنات والمولدات الكهربائية للطوارئ.',
    sousDomaines: [
      { id: 'SUB-LOG-1', titreFr: 'Gestion des stocks et équipements', titreAr: 'تدبير المخزون وسجلات العتاد والمعدات' },
      { id: 'SUB-LOG-2', titreFr: 'Maintenance générale des bâtiments', titreAr: 'الصيانة العامة للبنايات والشبكات التقنية للثكنات' }
    ],
    specialitesCibles: ['SPEC-SEC-ADMIN', 'SPEC-GM', 'SPEC-GEH']
  }
];

// Export des 7 grandes spécialités de la Gendarmerie Royale Marocaine
export const gendarmerieRoyaleSpecialties = [
  { id: 'CAT-TERR', code: 'GEND_TERRITORIALE', intituleFr: 'Gendarmerie Territoriale', intituleAr: 'الدرك الملكي الإقليمي' },
  { id: 'CAT-MOB', code: 'GEND_MOBILE', intituleFr: 'Gendarmerie Mobile', intituleAr: 'الدرك الملكي المتنقل' },
  { id: 'CAT-MARIT', code: 'GEND_MARITIME', intituleFr: 'Gendarmerie Maritime', intituleAr: 'الدرك الملكي البحري' },
  { id: 'CAT-AIR', code: 'GEND_AERIENNE', intituleFr: 'Gendarmerie Aérienne', intituleAr: 'الدرك الملكي الجوي' },
  { id: 'CAT-PREV', code: 'GEND_PREVOTE', intituleFr: 'Prévôté – Gendarmerie Militaire', intituleAr: 'الشرطة العسكرية والضابطة القضائية العسكرية' },
  { id: 'CAT-PST', code: 'POLICE_SCIENTIFIQUE', intituleFr: 'Police Scientifique et Technique', intituleAr: 'الشرطة التقنية والعلمية' },
  { id: 'CAT-INTERV', code: 'UNITES_INTERVENTION', intituleFr: 'Unités d\'Intervention et Spécialisées', intituleAr: 'وحدات التدخل والفرق الخاصة' }
];

/**
 * Banque initiale d'ateliers pratiques réalistes et complets
 */
export const initialWorkshops = [
  // --------------------------------------------------------------------------
  // CAT A : Informatique & Réseaux
  // --------------------------------------------------------------------------
  {
    AtelierId: 1,
    MissionPratique: {
    "intituleMission": "Durcissement et sécurisation d'une station de travail d'enquête judiciaire",
    "contexteProfessionnel": "Déploiement d'une nouvelle brigade territoriale de la Gendarmerie Royale. Les stations d'enquête doivent être préparées selon le référentiel de sécurité SSI-GR-2026 avant tout raccordement aux bases judiciaires.",
    "situationInitiale": "Une station informatique vierge vient d'être livrée à la section SIC. Le disque dur n'est pas partitionné, le BIOS n'est pas sécurisé et aucune stratégie de protection des supports amovibles n'est activée. Vous devez la configurer en station durcie conforme aux normes d'audit.",
    "equipementsDisponibles": [
        "Station de travail tour HP ProDesk avec processeur Intel Core i7 et puce TPM 2.0",
        "Clé USB amorçable d'installation certifiée SSI Gendarmerie (Windows 11 Enterprise / Linux Gendbuntu)",
        "Testeur logiciel d'intégrité et script PowerShell de durcissement local",
        "Fiche scellée de consignation de clé de chiffrement BitLocker/LUKS",
        "Bracelet et tapis antistatiques ESD"
    ],
    "tachesARealiser": [
        {
            "ordre": 1,
            "titre": "Sécurisation BIOS/UEFI et activation du TPM 2.0",
            "instructions": "Accéder au micrologiciel UEFI, activer la puce cryptographique TPM 2.0, enclencher le Secure Boot, désactiver le boot réseau PXE non authentifié et verrouiller l'accès au setup par mot de passe superviseur militaire.",
            "resultatAttendu": "UEFI verrouillé, Secure Boot actif, TPM 2.0 opérationnel et ordre de démarrage restreint au disque interne.",
            "criteresValidation": "Mot de passe superviseur conforme à la norme (12+ car.), absence d'invite de boot alternatif sans mot de passe."
        },
        {
            "ordre": 2,
            "titre": "Partitionnement et chiffrement intégral du disque système",
            "instructions": "Installer le système d'exploitation durci. Activer le chiffrement complet de volume (BitLocker XTS-AES 256 ou LUKS). Sauvegarder la clé de récupération de 48 chiffres sur le registre papier scellé selon la procédure d'armurerie numérique.",
            "resultatAttendu": "Partition système chiffrée, déverrouillage transparent via TPM au démarrage et clé d'urgence archivée sous scellé.",
            "criteresValidation": "Chiffrement effectif constaté dans les propriétés du lecteur, fiche de clé renseignée et visée."
        },
        {
            "ordre": 3,
            "titre": "Application des stratégies GPO de restriction des ports USB et audit",
            "instructions": "Appliquer la stratégie de groupe locale interdisant la lecture/écriture sur clés USB non enregistrées. Générer une tentative de branchement avec une clé de test et vérifier l'apparition de l'événement dans le journal d'audit de sécurité.",
            "resultatAttendu": "Périphérique de stockage USB bloqué avec notification de sécurité et événement consigné dans le journal des audits.",
            "criteresValidation": "Événement d'audit présent dans l'Event Viewer avec horodatage, ID d'événement et nom de l'utilisateur."
        }
    ],
    "resultatsAttendus": [
        "Station bureautique durcie et étanche aux périphériques externes non autorisés",
        "Chiffrement intégral des données au repos assurant la confidentialité des procédures judiciaires",
        "Journalisation complète et traçabilité des accès système pour audit"
    ],
    "criteresValidation": [
        "Respect scrupuleux du protocole de sécurité et traçabilité de la clé (8 pts)",
        "Précision et rapidité de configuration de l'environnement (6 pts)",
        "Contrôle qualité et vérification de la trace d'audit (6 pts)"
    ]
},
    Code: 'ATEL-INFO-01',
    Titre: 'Identifier les causes d\'un ordinateur qui ne démarre pas',
    TitreAr: 'تثبيت وتأمين أنظمة التشغيل والتهيئة الميدانية',
    CategorieId: 'CAT-INFO',
    SousDomaine: 'Maintenance informatique et systèmes d\'exploitation',
    NiveauDifficulte: 'INTERMEDIAIRE',
    DureeMinutes: 90,
    LieuAtelier: 'Salle Informatique & Systèmes - Bâtiment C',
    CapaciteMax: 8,
    SuperviseurParDefaut: 'Adjudant-Chef M. El Fassi (Section SIC)',
    Statut: 'ACTIF',
    DescriptionFr: 'Mise en situation pratique de préparation d\'une station de travail d\'enquête : partitionnement chiffré, déploiement d\'image système, durcissement des stratégies de sécurité locales et création des comptes d\'utilisateurs habilités.',
    DescriptionAr: 'ورشة تطبيقية لتهيئة محطة عمل مخصصة للتحقيق: التقسيم المشفر للأقراص، تثبيت النظام، ضبط سياسات الأمان ومنع الولوج غير المصرح به.',
    Objectifs: [
      'Maîtriser le partitionnement de disque avec chiffrement de volume (BitLocker / LUKS)',
      'Déployer et configurer un système d\'exploitation Windows/Linux durci',
      'Désactiver les ports USB non autorisés et verrouiller le BIOS/UEFI par mot de passe administrateur',
      'Vérifier l\'intégrité des journaux système (Event Viewer / syslog)'
    ],
    EquipementsRequis: [
      'Postes informatiques de test avec disques vierges',
      'Clés USB d\'installation bootables sécurisées',
      'Fiches de procédure de durcissement SSI',
      'Testeur d\'intégrité logicielle'
    ],
    ConsignesSecurite: [
      'Interdiction de connecter des supports externes non homologués',
      'Port de bracelet antistatique lors de l\'ouverture des boîtiers',
      'Enregistrement de chaque clé de chiffrement sur fiche scellée'
    ],
    TachesPratiques: [
      {
        taskId: 'TASK-INFO-1-1',
        ordre: 1,
        description: 'Accéder au BIOS/UEFI, activer le TPM 2.0 et configurer le mot de passe superviseur.',
        resultatAttendu: 'BIOS verrouillé, Secure Boot activé et ordre de démarrage sécurisé.',
        baremePoints: 5
      },
      {
        taskId: 'TASK-INFO-1-2',
        ordre: 2,
        description: 'Installer le système avec chiffrement intégral de la partition système.',
        resultatAttendu: 'Système opérationnel avec invite de clé au démarrage.',
        baremePoints: 8
      },
      {
        taskId: 'TASK-INFO-1-3',
        ordre: 3,
        description: 'Appliquer la GPO locale de restriction des périphériques amovibles et auditer les événements.',
        resultatAttendu: 'Clé USB de test rejetée et tentative consignée dans le journal d\'audit.',
        baremePoints: 7
      }
    ],
    CriteresEvaluation: [
      {
        critereId: 'CRIT-INFO-1-1',
        intitule: 'Respect scrupuleux du protocole de sécurité et de chiffrement',
        intituleAr: 'الاحترام الصارم لبروتوكول التشفير وأمان النظم',
        pointsMax: 8,
        description: 'Vérifie que la clé de récupération est sauvegardée selon la norme et que le volume est totalement chiffré.'
      },
      {
        critereId: 'CRIT-INFO-1-2',
        intitule: 'Précision et rapidité de configuration de l\'environnement',
        intituleAr: 'الدقة والسرعة في ضبط إعدادات النظام',
        pointsMax: 6,
        description: 'Évalue l\'aisance dans les paramètres avancés et l\'absence d\'hésitation.'
      },
      {
        critereId: 'CRIT-INFO-1-3',
        intitule: 'Contrôle qualité et vérification des journaux d\'audit',
        intituleAr: 'مراقبة الجودة وفحص سجلات التدقيق الأمني',
        pointsMax: 6,
        description: 'Vérification de la trace d\'audit générée après simulation de branchement non autorisé.'
      }
    ],
    ScoreTotalMax: 20,
    DateCreation: '2026-01-15T09:00:00.000Z'
  },
  {
    AtelierId: 2,
    MissionPratique: {
    "intituleMission": "Raccordement réseau, confection de liaisons RJ45 Cat6 et isolation VLAN du poste de commandement",
    "contexteProfessionnel": "Aménagement de la baie de brassage d'une compagnie de Gendarmerie Royale. Les liaisons vers les bureaux de commandement et la zone d'accueil du public doivent être étanches et isolées.",
    "situationInitiale": "Une rupture de lien réseau est constatée entre l'armoire technique et le terminal judiciaire de la brigade. De plus, les terminaux grand public partagent le même sous-réseau que les terminaux tactiques confidentiels. Vous devez repérer le câble défectueux, sertir un nouveau câble blindé Cat6 et segmenter les ports du switch en VLANs dédiés (VLAN 10 Commandement, VLAN 20 Public).",
    "equipementsDisponibles": [
        "Baie de brassage 19 pouces équipée d'un panneau de brassage 24 ports et commutateur manageable Cisco/HP",
        "Pince à sertir professionnelle RJ45 avec connecteurs métalliques blindés Cat6 STP",
        "Bobine de câble réseau paires torsadées Cat6 FTP et dénudeur de câble",
        "Testeur de câblage réseau numérique Fluke (continuité, inversion, coupure, paires croisées)",
        "Cordon console série RS232/USB et terminal d'administration réseau"
    ],
    "tachesARealiser": [
        {
            "ordre": 1,
            "titre": "Confection et sertissage d'un câble de brassage blindé Cat6",
            "instructions": "Dégainer le câble réseau Cat6 sans entamer l'isolant des paires, ordonner les 8 conducteurs selon la norme internationale T568B, insérer dans le connecteur blindé avec drain de masse et sertir fermement.",
            "resultatAttendu": "Câble RJ45 sans jeu mécanique, contact blindé établi et longueur normalisée.",
            "criteresValidation": "Respect strict de la séquence de couleurs T568B et maintien de la gaine dans le serre-câble."
        },
        {
            "ordre": 2,
            "titre": "Certification au testeur réseau numérique",
            "instructions": "Connecter les deux extrémités du câble confectionné au testeur Fluke. Lancer le cycle d'analyse automatique et vérifier l'alignement des 8 broches et de la continuité de masse blindée (Shield).",
            "resultatAttendu": "Testeur affichant 'PASS' avec les 8 LEDs allumées en séquence sans croisement ni perte de signal.",
            "criteresValidation": "0 défaut détecté au testeur de conformité."
        },
        {
            "ordre": 3,
            "titre": "Configuration et segmentation des VLANs sur le commutateur",
            "instructions": "Se connecter en console au switch, créer le VLAN 10 (COMMANDEMENT) et le VLAN 20 (ACCUEIL_PUBLIC), assigner les ports 1 à 12 au VLAN 10 et 13 à 24 au VLAN 20, puis sauvegarder la configuration en mémoire non-volatile.",
            "resultatAttendu": "Ports isolés au niveau 2 sans communication inter-VLAN sans routage filtré et configuration persistante.",
            "criteresValidation": "Isolation effective validée par tentative de ping infructueuse entre les deux plages réseau."
        }
    ],
    "resultatsAttendus": [
        "Liaison physique certifiée Cat6 répondant aux normes de télécommunications militaires",
        "Cloisonnement étanche des flux de données sensibles et publics",
        "Schéma de brassage documenté et étiqueté sur le panneau d'armoire"
    ],
    "criteresValidation": [
        "Respect des normes de câblage et gestion propre de la baie (5 pts)",
        "Diagnostic rapide de la coupure de ligne (5 pts)",
        "Qualité du sertissage et résultat du testeur Fluke (5 pts)",
        "Configuration correcte des VLANs et sauvegarde (5 pts)"
    ]
},
    Code: 'ATEL-INFO-02',
    Titre: 'Diagnostiquer un problème de connexion réseau',
    TitreAr: 'التوصيل الشبكي وإعداد محولات التوجيه وتوزيع النطاقات',
    CategorieId: 'CAT-INFO',
    SousDomaine: 'Installation et dépannage des réseaux locaux',
    NiveauDifficulte: 'AVANCE',
    DureeMinutes: 120,
    LieuAtelier: 'Laboratoire Réseaux & Télécoms - Salle R10',
    CapaciteMax: 6,
    SuperviseurParDefaut: 'Lieutenant K. Tahiri (Officier Réseaux)',
    Statut: 'ACTIF',
    DescriptionFr: 'Réalisation concrète du câblage d\'une baie de brassage d\'un poste de commandement de crise : sertissage de cordons RJ45 blindés Cat6, raccordement sur bandeau, configuration d\'un commutateur administrable avec 2 VLANs distincts (Opérationnel et Administratif).',
    DescriptionAr: 'إنجاز عملي لربط خزانة شبكية لمركز قيادة عملياتي: كبس كابلات RJ45 مدرعة، وتكوين محول شبكي معزول بنطاقين افتراضيين (عملياتي وإداري).',
    Objectifs: [
      'Réussir le sertissage normalisé T568B d\'un câble réseau blindé avec testeur de continuité',
      'Raccorder proprement le panneau de brassage (patch panel) avec outil d\'insertion Krone',
      'Créer et isoler deux VLANs sur commutateur administrable',
      'Diagnostiquer un défaut de connectivité ou conflit d\'adresse IP via console CLI'
    ],
    EquipementsRequis: [
      'Pince à sertir RJ45 professionnelle & dénudeur de câble Cat6 STP',
      'Testeur de câble réseau numérique avec mesure de longueur et paires croisées',
      'Commutateur réseau manageable 16 ports Gigabit (Cisco / HP)',
      'Câble console USB-RJ45 et postes clients'
    ],
    ConsignesSecurite: [
      'Utiliser l\'outil d\'insertion avec précaution pour éviter les coupures aux doigts',
      'Ne pas forcer sur les connecteurs optiques ou cuivre de la baie'
    ],
    TachesPratiques: [
      {
        taskId: 'TASK-INFO-2-1',
        ordre: 1,
        description: 'Confectionner 2 cordons RJ45 droits blindés de 2 mètres selon la norme T568B.',
        resultatAttendu: 'Testeur de câble validant les 8 brins + blindage sans faux contact.',
        baremePoints: 6
      },
      {
        taskId: 'TASK-INFO-2-2',
        ordre: 2,
        description: 'Configurer sur le switch le VLAN 10 (Opérations) et VLAN 20 (Administration) avec étiquetage 802.1Q.',
        resultatAttendu: 'Isolement strict : un client VLAN 10 ne peut pas pinguer le VLAN 20 sans passerelle filtrante.',
        baremePoints: 8
      },
      {
        taskId: 'TASK-INFO-2-3',
        ordre: 3,
        description: 'Résoudre une panne injectée par le superviseur (port bloqué en duplex mismatch ou port security).',
        resultatAttendu: 'Rétablissement de la liaison et explication orale concise de la cause.',
        baremePoints: 6
      }
    ],
    CriteresEvaluation: [
      {
        critereId: 'CRIT-INFO-2-1',
        intitule: 'Qualité physique du sertissage et finition du câble',
        intituleAr: 'جودة الكبس والتوصيل الفيزيائي للكابلات',
        pointsMax: 6,
        description: 'Intégrité du blindage, longueur de détorsadage minimale, clic franc du connecteur.'
      },
      {
        critereId: 'CRIT-INFO-2-2',
        intitule: 'Maîtrise de la configuration switch et logique VLAN',
        intituleAr: 'التحكم في أوامر موجه الشبكة وضبط النطاقات',
        pointsMax: 8,
        description: 'Application exacte des commandes CLI et vérification des tables CAM.'
      },
      {
        critereId: 'CRIT-INFO-2-3',
        intitule: 'Méthodologie d\'investigation et de dépannage',
        intituleAr: 'منهجية الفحص وتحديد مصدر العطل الشبكي',
        pointsMax: 6,
        description: 'Démarche structurée en partant de la couche 1 (physique) jusqu\'à la couche 3 (réseau).'
      }
    ],
    ScoreTotalMax: 20,
    DateCreation: '2026-01-20T10:00:00.000Z'
  },
  {
    AtelierId: 3,
    MissionPratique: {
    "intituleMission": "Traitement automatisé et croisement de données de téléphonie (fadettes) et bornages judiciaires",
    "contexteProfessionnel": "Enquête judiciaire criminelle complexe menée par une brigade de recherches (BR). Le parquet demande une analyse rapide de télécommunications.",
    "situationInitiale": "Trois opérateurs de téléphonie ont transmis 3 fichiers bruts au format CSV hétérogène comprenant plus de 40 000 lignes de relevés (appels émis, reçus, SMS, bornes relais IMEI/IMSI). Vous devez construire un classeur dynamique sous Excel/Power Query permettant de faire ressortir en moins de 30 minutes les numéros communs et les bornages géographiques synchrones.",
    "equipementsDisponibles": [
        "Station bureautique d'enquête équipée de Microsoft Excel 365 / LibreOffice Calc avec Power Query",
        "Fichiers d'exercice de réquisitions judiciaires brutes (fadette_suspect_A.csv, fadette_suspect_B.csv, relais_bts.xlsx)",
        "Fiche technique de procédure judiciaire d'extraction de métadonnées télécoms"
    ],
    "tachesARealiser": [
        {
            "ordre": 1,
            "titre": "Importation et nettoyage des données sous Power Query",
            "instructions": "Importer les trois fichiers sources, standardiser les numéros de téléphone au format E.164 (+212...), convertir les horodatages UTC en heure locale et supprimer les lignes de métadonnées superflues.",
            "resultatAttendu": "Table de données nettoyée, typée et dépourvue d'erreurs ou de formats inconsistants.",
            "criteresValidation": "Colonnes Date, Heure, Émetteur, Destinataire et Relais standardisées sans perte de lignes."
        },
        {
            "ordre": 2,
            "titre": "Croisement des communications et détection de contacts communs",
            "instructions": "Créer une fusion de requêtes pour identifier les correspondants appelés à la fois par le suspect A et le suspect B durant les 7 jours précédant les faits.",
            "resultatAttendu": "Liste claire et ordonnée des numéros tiers communs avec fréquence d'appels et durée totale cumulée.",
            "criteresValidation": "Rapprochement exact sans faux positifs, tri par fréquence d'appel décroissante."
        },
        {
            "ordre": 3,
            "titre": "Élaboration d'un tableau de bord de synthèse judiciaire",
            "instructions": "Construire un tableau croisé dynamique avec segments temporels et graphique chronologique des volumes d'appels par tranche horaire pour le magistrat instructeur.",
            "resultatAttendu": "Rapport tabulaire visuel, imprimable et prêt à être annexé au procès-verbal de synthèse.",
            "criteresValidation": "Clarté visuelle, mise en forme conditionnelle des pics anormaux d'activité."
        }
    ],
    "resultatsAttendus": [
        "Modèle Power Query reproductible pour de futures réquisitions judiciaires",
        "Extraction sans faille des éléments de preuve opposables en procédure",
        "Gain de temps critique dans la prise de décision opérationnelle du commandement"
    ],
    "criteresValidation": [
        "Exactitude des formules et manipulation des dates/horodatages (7 pts)",
        "Automatisation du modèle sans intervention manuelle ligne par ligne (7 pts)",
        "Présentation synthétique et clarté du document pour la hiérarchie (6 pts)"
    ]
},
    Code: 'ATEL-INFO-03',
    Titre: 'Organiser et analyser un fichier Excel',
    TitreAr: 'المعالجة المتقدمة للبيانات الجنائية وجداول التتبع عبر إكسيل',
    CategorieId: 'CAT-INFO',
    SousDomaine: 'Bureautique avancée et gestion des données Excel',
    NiveauDifficulte: 'INTERMEDIAIRE',
    DureeMinutes: 60,
    LieuAtelier: 'Salle Informatique & Systèmes - Bâtiment C',
    CapaciteMax: 10,
    SuperviseurParDefaut: 'Adjudant S. Mansouri (Analyste Criminel)',
    Statut: 'ACTIF',
    DescriptionFr: 'Exploitation méthodique d\'un fichier brut de 1500 lignes de relevés téléphoniques (CDR) et passages péages : nettoyage des doublons, croisement par formules matricielles (RECHERCHEX / INDEX-EQUIV), et création d\'un tableau de bord dynamique.',
    DescriptionAr: 'استغلال منهجي لقاعدة بيانات تتضمن 1500 تسجيلاً هاتفياً وبيانات المراقبة: تنقية البيانات، الربط المتقاطع بالصيغ المتقدمة، وبناء لوحة قيادة تفاعلية.',
    Objectifs: [
      'Nettoyer et normaliser des données hétérogènes (dates, numéros de téléphone avec indicatif)',
      'Croiser deux bases de données distinctes sans erreur de correspondance',
      'Construire des tableaux croisés dynamiques (TCD) avec chronologie et segments',
      'Mettre en évidence automatiquement les anomalies par mise en forme conditionnelle'
    ],
    EquipementsRequis: [
      'Postes bureautiques équipés du logiciel Excel avec add-in d\'analyse',
      'Jeu de données d\'exercice anonymisé'
    ],
    ConsignesSecurite: [
      'Respect strict de l\'interdiction de transmission de fichiers par messagerie personnelle'
    ],
    TachesPratiques: [
      {
        taskId: 'TASK-INFO-3-1',
        ordre: 1,
        description: 'Importer le CSV brut, supprimer les espaces insécables et formater les numéros au format international.',
        resultatAttendu: 'Tableau propre sans erreurs #VALEUR! ni lignes corrompues.',
        baremePoints: 5
      },
      {
        taskId: 'TASK-INFO-3-2',
        ordre: 2,
        description: 'Écrire une formule croisant les bornages d\'antenne avec les horaires de présence des suspects.',
        resultatAttendu: 'Extraction automatique des 4 concordances suspectes sans intervention manuelle.',
        baremePoints: 8
      },
      {
        taskId: 'TASK-INFO-3-3',
        ordre: 3,
        description: 'Produire un rapport visuel synthèse imprimable en 1 page avec graphique de fréquentation horaire.',
        resultatAttendu: 'Feuille de synthèse prête pour le commandement avec mise en page soignée.',
        baremePoints: 7
      }
    ],
    CriteresEvaluation: [
      {
        critereId: 'CRIT-INFO-3-1',
        intitule: 'Rigueur de la formule et exactitude des résultats',
        intituleAr: 'صحة الصيغ الحسابية ودقة النتائج المستخرجة',
        pointsMax: 8,
        description: 'Aucune anomalie omise, usage de formules robustes.'
      },
      {
        critereId: 'CRIT-INFO-3-2',
        intitule: 'Efficacité et automatisation des manipulations',
        intituleAr: 'السرعة والقدرة على أتمتة المعالجة',
        pointsMax: 6,
        description: 'Emploi pertinent de Power Query ou de formules dynamiques évitant les calculs manuels répétitifs.'
      },
      {
        critereId: 'CRIT-INFO-3-3',
        intitule: 'Clarté de la restitution visuelle pour les décideurs',
        intituleAr: 'وضوح العرض البياني الموجه لقائد الوحدة',
        pointsMax: 6,
        description: 'Qualité graphique du tableau de bord et lisibilité immédiate des faits saillants.'
      }
    ],
    ScoreTotalMax: 20,
    DateCreation: '2026-01-25T14:00:00.000Z'
  },

  // --------------------------------------------------------------------------
  // CAT B : Mécanique & Électricité Automobile
  // --------------------------------------------------------------------------
  {
    AtelierId: 4,
    MissionPratique: {
    "intituleMission": "Diagnostic électronique embarqué par valise OBD-II & lecture des codes défauts (DTC)",
    "contexteProfessionnel": "Flotte automobile des unités de sécurité routière et d'intervention d'urgence de la Gendarmerie Royale.",
    "situationInitiale": "Un véhicule d'intervention rapide (VIR) présente une perte brutale de puissance en côte avec témoin anomalie moteur (MIL) allumé au tableau de bord. Vous devez brancher la valise de diagnostic OBD-II, relever les codes DTC actifs et en attente, analyser les trames figées (Freeze Frame) et localiser le composant défaillant sur le moteur.",
    "equipementsDisponibles": [
        "Véhicule atelier de test opérationnel (motorisation Turbo Diesel Common Rail)",
        "Valise de diagnostic multimarque professionnelle Bosch KTS / Autel MaxiSys",
        "Multimètre automobile avec pointes de touche fines et pince ampèremétrique",
        "Schémas électriques de câblage moteur et revue technique du véhicule",
        "EPI : gants de mécanicien anti-coupure et lunettes de protection"
    ],
    "tachesARealiser": [
        {
            "ordre": 1,
            "titre": "Connexion de la valise de diagnostic et identification du calculateur",
            "instructions": "Sécuriser le véhicule (frein à main, cales de roue, contact mis moteur éteint), brancher l'interface OBD-II sur la prise 16 broches, lancer l'auto-détection du numéro VIN et établir la communication avec l'ECU moteur.",
            "resultatAttendu": "Communication établie avec l'ECU moteur sans coupure de protocole CAN.",
            "criteresValidation": "Respect du protocole de mise sous tension et reconnaissance automatique du calculateur."
        },
        {
            "ordre": 2,
            "titre": "Lecture et interprétation des codes défauts (DTC) et données gelées",
            "instructions": "Extraire les codes défauts enregistrés (ex: P0101 Débitmètre d'air, P0299 Pression de suralimentation insuffisante), enregistrer le rapport Freeze Frame (régime, pression, température lors du défaut) et distinguer les défauts permanents des défauts fugitifs.",
            "resultatAttendu": "Identification précise du composant incriminé avec justification basée sur les paramètres réels.",
            "criteresValidation": "Interprétation correcte de la chaîne cinématique et des paramètres physiques du moteur."
        },
        {
            "ordre": 3,
            "titre": "Contrôle électrique au multimètre et effacement de défaut",
            "instructions": "Débrancher le connecteur du capteur suspecté, mesurer la tension d'alimentation de référence (5V), la résistance de masse (inférieure à 1 ohm), remplacer le capteur de test et procéder à l'effacement des codes défauts après vérification.",
            "resultatAttendu": "Ligne électrique validée, défaut acquitté avec succès et témoin MIL éteint au redémarrage.",
            "criteresValidation": "Mesures électriques conformes à la revue technique, témoin moteur éteint sans réapparition."
        }
    ],
    "resultatsAttendus": [
        "Diagnostic rapide évitant l'immobilisation prolongée du véhicule d'urgence",
        "Rapport technique d'intervention horodaté pour le carnet de bord du véhicule",
        "Maîtrise complète de l'outil informatique de diagnostic embarqué"
    ],
    "criteresValidation": [
        "Poste de travail sécurisé et respect des consignes moteur (5 pts)",
        "Précision de l'interprétation des codes DTC (5 pts)",
        "Dextérité des mesures électriques au multimètre (5 pts)",
        "Gestion méthodique de l'intervention et remise en état (5 pts)"
    ]
},
    Code: 'ATEL-MECA-01',
    Titre: 'Identifier les causes possibles d\'un problème de démarrage',
    TitreAr: 'التشخيص الإلكتروني لمركبات التدخل عبر جهاز OBD وقراءة رموز الأعطال',
    CategorieId: 'CAT-MECA',
    SousDomaine: 'Diagnostic électronique automobile OBD',
    NiveauDifficulte: 'INTERMEDIAIRE',
    DureeMinutes: 90,
    LieuAtelier: 'Atelier Mécanique Escadron - Baie de Diagnostic 2',
    CapaciteMax: 6,
    SuperviseurParDefaut: 'Adjudant-Chef H. Zniber (Chef d\'Atelier Flotte)',
    Statut: 'ACTIF',
    DescriptionFr: 'Intervention sur un véhicule de patrouille présentant un voyant anomalie moteur allumé et un mode dégradé : connexion de la valise de diagnostic multimarque, extraction de la freeze frame, interprétation des données en temps réel (débitmètre, sonde lambda, pression rampe commune) et effacement sécurisé après réparation.',
    DescriptionAr: 'تدخل على سيارة دورية بها عطل في لوحة القيادة: ربط جهاز التشخيص، استخراج رموز الأعطال DTC، تحليل تدفق البيانات الحية للمحرك، ومسح الرمز بعد الإصلاح.',
    Objectifs: [
      'Localiser la prise OBD-II et raccorder l\'outil de diagnostic sans endommager les broches',
      'Identifier la différence entre codes défauts fugitifs, permanents et confirmés',
      'Analyser graphiquement la pression de suralimentation et la température de liquide de refroidissement',
      'Rédiger une fiche de diagnostic technique préconisant la pièce à remplacer'
    ],
    EquipementsRequis: [
      'Véhicule d\'intervention pédagogique (Toyota Land Cruiser / Dacia Duster)',
      'Valise de diagnostic multimarque homologuée (Autel / Bosch KTS / Launch)',
      'Multimètre de précision pour vérification de continuité faisceau'
    ],
    ConsignesSecurite: [
      'Calage obligatoire des roues avant toute manipulation sous le capot',
      'Extraction des gaz d\'échappement raccordée si le moteur tourne dans l\'atelier',
      'Port des chaussures de sécurité et gants anti-brûlure'
    ],
    TachesPratiques: [
      {
        taskId: 'TASK-MECA-1-1',
        ordre: 1,
        description: 'Établir la communication avec le calculateur moteur (ECU) et relever les codes DTC actifs.',
        resultatAttendu: 'Codes exacts relevés (ex: P0102 Débitmètre, P0300 Ratés d\'allumage) avec arrêt sur image.',
        baremePoints: 6
      },
      {
        taskId: 'TASK-MECA-1-2',
        ordre: 2,
        description: 'Vérifier la tension d\'alimentation du capteur incriminé au multimètre pour distinguer panne capteur ou coupure faisceau.',
        resultatAttendu: 'Mesure exacte de la tension de référence (5V) et identification de la panne réelle.',
        baremePoints: 8
      },
      {
        taskId: 'TASK-MECA-1-3',
        ordre: 3,
        description: 'Remplacer le composant défaillant, effacer les codes et réaliser un essai dynamique sur banc.',
        resultatAttendu: 'Voyant moteur éteint, régulateur opérationnel et absence de code récurrent.',
        baremePoints: 6
      }
    ],
    CriteresEvaluation: [
      {
        critereId: 'CRIT-MECA-1-1',
        intitule: 'Exactitude de l\'interprétation des codes DTC et freeze frame',
        intituleAr: 'دقة قراءة وتحليل رموز الأعطال والشروط المسجلة',
        pointsMax: 8,
        description: 'Démontre une compréhension technique des codes défauts sans procéder par remplacement au hasard.'
      },
      {
        critereId: 'CRIT-MECA-1-2',
        intitule: 'Méthodologie de mesure électrique sur capteur',
        intituleAr: 'المنهجية السليمة في القياس الكهربائي على الحساسات',
        pointsMax: 6,
        description: 'Utilisation correcte du multimètre (calibre, masse de référence, respect de l\'intégrité des connecteurs).'
      },
      {
        critereId: 'CRIT-MECA-1-3',
        intitule: 'Respect des règles de sécurité atelier et protection du véhicule',
        intituleAr: 'احترام قواعد السلامة المهنية وحماية المركبة',
        pointsMax: 6,
        description: 'Protection des ailes, calage, absence de risque de démarrage intempestif.'
      }
    ],
    ScoreTotalMax: 20,
    DateCreation: '2026-01-18T11:00:00.000Z'
  },
  {
    AtelierId: 5,
    MissionPratique: {
    "intituleMission": "Maintenance circuit de refroidissement, thermostat et calage distribution moteur",
    "contexteProfessionnel": "Entretien préventif et curatif de la flotte motorisée des escadrons tout-terrain et unités mobiles.",
    "situationInitiale": "Un véhicule 4x4 de patrouille présente une montée en température anormale en charge (dépassement de 105°C) avec un ventilateur qui tourne en permanence à vitesse maximale. Vous devez mettre le circuit sous pression à la pompe d'épreuve pour détecter une éventuelle fuite, vérifier le déclenchement du thermostat calorstat et contrôler la tension de la courroie d'entraînement.",
    "equipementsDisponibles": [
        "Moteur d'essai didactique ou véhicule 4x4 sur pont élévateur d'atelier",
        "Pompe d'épreuve de mise sous pression du circuit de refroidissement avec manomètre",
        "Réfractomètre de contrôle de qualité et densité du liquide de refroidissement",
        "Thermomètre laser infrarouge de précision sans contact",
        "Bac de vidange étanche, entonnoir de purge et liquide de refroidissement homologué",
        "EPI thermiques : gants haute température, visière de protection intégrale"
    ],
    "tachesARealiser": [
        {
            "ordre": 1,
            "titre": "Mise sous pression et recherche de micro-fuite sur le circuit fermé",
            "instructions": "Monter l'adaptateur de vase d'expansion, mettre le circuit sous une pression de 1.2 bar à l'aide de la pompe d'épreuve manuelle et surveiller la stabilité du manomètre durant 10 minutes pour localiser toute fuite aux durites ou au radiateur.",
            "resultatAttendu": "Pression stable ou localisation immédiate de la fuite sans déversement de fluide.",
            "criteresValidation": "Respect scrupuleux de la pression nominale maximale (jamais au-delà de 1.5 bar) et étanchéité."
        },
        {
            "ordre": 2,
            "titre": "Diagnostic thermique du thermostat (calorstat)",
            "instructions": "À l'aide du thermomètre infrarouge, mesurer la température d'entrée et de sortie des durites supérieure et inférieure du radiateur pendant la montée en régime moteur. Confirmer l'ouverture du thermostat à la température nominale (88°C - 92°C).",
            "resultatAttendu": "Confirmation de l'ouverture du calorstat par élévation brusque de température de la durite basse.",
            "criteresValidation": "Mesures précises au thermomètre infrarouge aux points de consigne constructeur."
        },
        {
            "ordre": 3,
            "titre": "Purge du circuit et contrôle du liquide au réfractomètre",
            "instructions": "Remplir le circuit avec le mélange antigel préconisé, chasser les poches d'air via les vis de purge dédiées jusqu'à écoulement continu, et mesurer au réfractomètre le point de congélation du fluide (au moins -25°C).",
            "resultatAttendu": "Circuit purgé sans bulle d'air, niveau stabilisé au repère MAX et densité validée.",
            "criteresValidation": "Absence de surpression ou de bruits d'ébullition, niveau stable après cycle complet de refroidissement."
        }
    ],
    "resultatsAttendus": [
        "Fiabilisation du groupe motopropulseur en conditions de forte chaleur",
        "Prévention des risques de joint de culasse ou de surchauffe moteur en mission",
        "Application stricte des règles de sécurité thermique et écologique (zéro fuite au sol)"
    ],
    "criteresValidation": [
        "Sécurité thermique absolue et port des protections (Arrêt immédiat si manquement) (5 pts)",
        "Précision du diagnostic thermodynamique (5 pts)",
        "Rigueur de la procédure de purge et calage (5 pts)",
        "Propreté du poste et gestion des déchets chimiques (5 pts)"
    ]
},
    Code: 'ATEL-MECA-02',
    Titre: 'Reconnaître les éléments du système de refroidissement',
    TitreAr: 'صيانة دارة التبريد والمضخة وضبط حزام التوزيع للمحرك',
    CategorieId: 'CAT-MECA',
    SousDomaine: 'Maintenance moteur et système de refroidissement',
    NiveauDifficulte: 'AVANCE',
    DureeMinutes: 120,
    LieuAtelier: 'Atelier Mécanique Escadron - Baie Moteurs',
    CapaciteMax: 4,
    SuperviseurParDefaut: 'Adjudant-Chef H. Zniber (Chef d\'Atelier Flotte)',
    Statut: 'ACTIF',
    DescriptionFr: 'Intervention mécanique approfondie : mise sous pression du circuit de refroidissement pour test d\'étanchéité, remplacement du thermostat piloté, contrôle de la tension de la courroie d\'accessoires/distribution avec pige de calage et purge complète sous dépression.',
    DescriptionAr: 'تدخل ميكانيكي دقيق: اختبار ضغط دارة التبريد لكشف التسريبات، تبديل منظم الحرارة، ضبط حزام التوزيع، وتفريغ وملء السائل تحت الضغط.',
    Objectifs: [
      'Détecter une fuite sur radiateur ou durite sous pression d\'épreuve de 1.5 bar',
      'Positionner les piges de calage vilebrequin et arbre à cames selon la revue technique',
      'Régler la tension de courroie au tensiomètre ou par fréquence acoustique',
      'Réaliser la purge du circuit sans laisser de poche d\'air résiduelle'
    ],
    EquipementsRequis: [
      'Moteurs sur banc d\'exercice tournants (moteur turbo diesel d\'intervention)',
      'Mallette de mise sous pression du circuit de refroidissement avec manomètre',
      'Coffret de piges de calage de distribution certifié constructeur',
      'Appareil de remplissage de liquide de refroidissement sous vide (venturi)'
    ],
    ConsignesSecurite: [
      'Ne jamais ouvrir le bouchon de vase d\'expansion à chaud',
      'Bac de récupération étanche obligatoire sous le moteur pour recyclage du liquide',
      'Lunettes de protection obligatoires lors de la mise sous pression'
    ],
    TachesPratiques: [
      {
        taskId: 'TASK-MECA-2-1',
        ordre: 1,
        description: 'Vérifier l\'étanchéité du circuit de refroidissement à 1.5 bar pendant 10 minutes.',
        resultatAttendu: 'Maintien rigoureux de la pression sans chute de l\'aiguille.',
        baremePoints: 6
      },
      {
        taskId: 'TASK-MECA-2-2',
        ordre: 2,
        description: 'Mettre en place les piges de calage moteur et vérifier l\'alignement des repères.',
        resultatAttendu: 'Piges engagées à fond sans forcer, rotation manuelle du moteur sur 2 tours sans blocage.',
        baremePoints: 8
      },
      {
        taskId: 'TASK-MECA-2-3',
        ordre: 3,
        description: 'Remplir le circuit par dépression et vérifier le déclenchement du motoventilateur.',
        resultatAttendu: 'Enclenchement du ventilateur à 92°C, chauffage habitacle fonctionnel, niveau stable.',
        baremePoints: 6
      }
    ],
    CriteresEvaluation: [
      {
        critereId: 'CRIT-MECA-2-1',
        intitule: 'Rigueur du calage et manipulation des outils de précision',
        intituleAr: 'الدقة في ضبط حزام التوزيع واستعمال أدوات القياس',
        pointsMax: 8,
        description: 'Respect de la procédure de rotation manuelle obligatoire avant mise sous tension.'
      },
      {
        critereId: 'CRIT-MECA-2-2',
        intitule: 'Qualité du diagnostic d\'étanchéité et purge sans bulle d\'air',
        intituleAr: 'جودة فحص التسريب والتفريغ الكامل للهواء من الدارة',
        pointsMax: 6,
        description: 'Absence totale de surchauffe ou de variation erratique de température.'
      },
      {
        critereId: 'CRIT-MECA-2-3',
        intitule: 'Propreté de l\'intervention et gestion des fluides polluants',
        intituleAr: 'النظافة البيائية في التعامل مع السوائل الملوثة',
        pointsMax: 6,
        description: 'Zéro goutte au sol, utilisation des bacs de rétention et chiffons absorbants.'
      }
    ],
    ScoreTotalMax: 20,
    DateCreation: '2026-01-22T08:30:00.000Z'
  },

  // --------------------------------------------------------------------------
  // CAT C : Électronique & Télécommunications
  // --------------------------------------------------------------------------
  {
    AtelierId: 6,
    MissionPratique: {
    "intituleMission": "Calibrage de puissance, mesure de TOS et programmation d'émetteur-récepteur VHF/UHF",
    "contexteProfessionnel": "Réseau de transmissions tactiques et postes fixes/mobiles des compagnies et pelotons de la Gendarmerie Royale.",
    "situationInitiale": "L'émetteur-récepteur radio installé à bord d'un véhicule de commandement présente une portée de transmission divisée par trois et un échauffement excessif lors des communications prolongées. Vous devez mesurer le Taux d'Ondes Stationnaires (TOS/SWR) à l'aide d'un wattmètre directionnel, ajuster la longueur du brin d'antenne pour obtenir un TOS inférieur à 1.3, puis programmer les fréquences de secours cryptées sur la mémoire de l'appareil.",
    "equipementsDisponibles": [
        "Émetteur-récepteur radio tactique VHF/UHF militaire (ex: Motorola / Icom / Thales)",
        "Wattmètre-TOSmètre de précision Bird 43 ou Daiwa avec bouchons de puissance adaptés",
        "Charge fictive blindée 50 ohms 100W et câbles coaxiaux d'interconnexion RG213",
        "Logiciel de programmation CPS constructeur et câble d'interface USB dédié",
        "Kit d'accord d'antenne avec clé Allen et pince coupe-câble"
    ],
    "tachesARealiser": [
        {
            "ordre": 1,
            "titre": "Mesure de puissance d'émission sur charge fictive 50 ohms",
            "instructions": "Raccorder la sortie antenne de l'émetteur au wattmètre puis à la charge fictive étalonnée. Passer en émission sur fréquence test et relever la puissance haute (25W/50W) et basse (5W) délivrée par l'étage final HF.",
            "resultatAttendu": "Puissance d'émission conforme à la fiche d'homologation sans réflexion parasite.",
            "criteresValidation": "Puissance mesurée à +/- 5% de la consigne constructeur."
        },
        {
            "ordre": 2,
            "titre": "Mesure de TOS sur l'antenne véhicule et ajustement du brin",
            "instructions": "Remplacer la charge fictive par la ligne d'antenne opérationnelle du véhicule. Mesurer la puissance directe (Pfwd) et la puissance réfléchie (Pref). Calculer le TOS. Régler la longueur mécanique du brin d'antenne pour ramener le TOS sous 1.3:1.",
            "resultatAttendu": "TOS final stabilisé à 1.2:1 garantissant un rendement radioélectrique optimal.",
            "criteresValidation": "TOS rigoureusement mesuré sans dommage pour les transistors de puissance de l'émetteur."
        },
        {
            "ordre": 3,
            "titre": "Programmation des canaux et tonalités CTCSS/DCS",
            "instructions": "Connecter l'appareil au poste informatique, lire la configuration mémoire, programmer la grille de fréquences du plan zonal avec les tonalités de squelch et le cryptage vocal basique, puis réécrire dans le poste.",
            "resultatAttendu": "Poste radio programmé avec succès, test de liaison phonie clair et sans souffle.",
            "criteresValidation": "Fréquences et sous-porteuses conformes au tableau de répartition des fréquences GR."
        }
    ],
    "resultatsAttendus": [
        "Poste émetteur opérationnel à rendement radioélectrique maximal",
        "Protection de l'étage de puissance contre les retours HF destructeurs",
        "Garantie de liaisons fiables en zones isolées ou à topographie accidentée"
    ],
    "criteresValidation": [
        "Respect des consignes HF et étalonnage des appareils (5 pts)",
        "Précision de la mesure de TOS et calcul de la puissance réfléchie (5 pts)",
        "Qualité de l'accord d'antenne mécanique et électrique (5 pts)",
        "Rigueur de la programmation logicielle et validation de liaison (5 pts)"
    ]
},
    Code: 'ATEL-TEL-01',
    Titre: 'Repérer un problème de connexion sur un équipement de communication',
    TitreAr: 'قياس قدرة البث ونسبة الموجة الرجعية وبرمجة أجهزة الاتصال اللاسلكي',
    CategorieId: 'CAT-TELECOM',
    SousDomaine: 'Diagnostic des équipements de communication',
    NiveauDifficulte: 'AVANCE',
    DureeMinutes: 90,
    LieuAtelier: 'Atelier Transmissions & Électronique - Salle T2',
    CapaciteMax: 6,
    SuperviseurParDefaut: 'Capitaine O. Cherkaoui (Officier Transmissions)',
    Statut: 'ACTIF',
    DescriptionFr: 'Contrôle complet de la chaîne d\'émission d\'un poste radio tactique embarqué : mesure de la puissance d\'émission HF avec charge fictive 50 ohms, calcul du Taux d\'Ondes Stationnaires (TOS/SWR) de l\'antenne de toit, programmation de canaux chiffrés et test d\'atténuation câble coaxial.',
    DescriptionAr: 'فحص شامل لجهاز إرسال لاسلكي عملياتي: قياس القدرة الواطية مع حمل اصطناعي، حساب نسبة الموجة الرجعية للهوائي (TOS)، وبرمجة القنوات المشفرة وفحص كابل الإرسال.',
    Objectifs: [
      'Raccorder un wattmètre/tosmètre en série sans dégrader l\'étage final de puissance',
      'Régler la longueur d\'un brin d\'antenne pour obtenir un TOS inférieur à 1.3',
      'Programmer les fréquences d\'urgence et codes CTCSS via logiciel CPS dédié',
      'Identifier une désadaptation d\'impédance ou un connecteur coaxial mal soudé'
    ],
    EquipementsRequis: [
      'Postes émetteurs-récepteurs tactiques Motorola / Hytera / Kenwood VHF-UHF',
      'Wattmètre / TOS-mètre étalonné (Bird 43 ou numérique Daiwa)',
      'Charge fictive 50 ohms / 100W sans rayonnement',
      'Analyseur d\'antenne vectoriel portable (VNA)',
      'PC avec cordon de programmation officiel et logiciel CPS'
    ],
    ConsignesSecurite: [
      'Ne jamais émettre sans antenne ou charge fictive raccordée (risque de destruction des transistors PA)',
      'Respecter les distances de sécurité vis-à-vis des rayonnements électromagnétiques'
    ],
    TachesPratiques: [
      {
        taskId: 'TASK-TEL-1-1',
        ordre: 1,
        description: 'Mesurer la puissance de sortie du poste sur charge fictive en mode High Power et Low Power.',
        resultatAttendu: 'Mesure exacte conforme aux spécifications (ex: 25W en High, 5W en Low à +/- 5%).',
        baremePoints: 6
      },
      {
        taskId: 'TASK-TEL-1-2',
        ordre: 2,
        description: 'Mesurer la courbe de résonance de l\'antenne quart d\'onde avec l\'analyseur d\'antenne.',
        resultatAttendu: 'Identification de la fréquence de résonance et ajustement pour obtenir TOS < 1.3 sur le canal d\'alerte.',
        baremePoints: 8
      },
      {
        taskId: 'TASK-TEL-1-3',
        ordre: 3,
        description: 'Injecter le plan de fréquences d\'exercice crypté et vérifier la communication avec la station fixe.',
        resultatAttendu: 'Liaison bilatérale claire avec accusé de réception automatique (ANI).',
        baremePoints: 6
      }
    ],
    CriteresEvaluation: [
      {
        critereId: 'CRIT-TEL-1-1',
        intitule: 'Précision des mesures radiofréquence et calibrage TOS',
        intituleAr: 'الدقة في القياسات الراديوية وضبط نسبة الموجة الرجعية',
        pointsMax: 8,
        description: 'Lecture correcte des échelles directes et réfléchies, compréhension physique du TOS.'
      },
      {
        critereId: 'CRIT-TEL-1-2',
        intitule: 'Maîtrise du logiciel de programmation et respect du plan de fréquences',
        intituleAr: 'التحكم في برنامج البرمجة واحترام خريطة الترددات',
        pointsMax: 6,
        description: 'Saisie sans erreur des pas de fréquence, sous-porteuses et identifiants de groupe.'
      },
      {
        critereId: 'CRIT-TEL-1-3',
        intitule: 'Respect des consignes de protection du matériel HF',
        intituleAr: 'احترام شروط حماية أجهزة البث عالي التردد',
        pointsMax: 6,
        description: 'Aucune émission sur antenne déconnectée, serrage correct des connecteurs BNC/N.'
      }
    ],
    ScoreTotalMax: 20,
    DateCreation: '2026-01-28T09:15:00.000Z'
  },
  {
    AtelierId: 7,
    MissionPratique: {
    "intituleMission": "Soudure de précision, contrôle au multimètre et remplacement de composants CMS",
    "contexteProfessionnel": "Atelier central d'électronique et de réparation des systèmes informatiques et de transmission de la Gendarmerie Royale.",
    "situationInitiale": "La platine d'alimentation d'un récepteur radio tactique est inopérante suite à une surtension sur batterie auxiliaire. Un condensateur CMS et une diode de protection sont en court-circuit. Vous devez diagnostiquer la panne sous loupe binoculaire, dessouder les éléments défectueux à l'air chaud sans surchauffer les pistes voisines et souder des composants neufs conformes.",
    "equipementsDisponibles": [
        "Station de soudage et de dessoudage combinée (fer régulé thermostaté + buse à air chaud)",
        "Microscope / loupe binoculaire d'inspection électronique avec éclairage annulaire LED",
        "Multimètre numérique avec testeur de continuité sonore et mode test diode",
        "Flux de soudure sans nettoyage (no-clean), tresse à dessouder et fil d'étain de précision 0.5 mm",
        "Composants CMS de remplacement (diodes Schottky, condensateurs céramiques 0805/1206)",
        "EPI : lunettes de protection, extracteur de fumées de soudure et protection ESD"
    ],
    "tachesARealiser": [
        {
            "ordre": 1,
            "titre": "Localisation du court-circuit au multimètre en mode test diode/continuité",
            "instructions": "Mesurer l'impédance de l'entrée d'alimentation principale. Isoler les composants connectés en parallèle sur le rail 12V pour déterminer lequel présente une résistance nulle (0.00 ohm).",
            "resultatAttendu": "Identification certaine du composant en court-circuit (diode de protection claquée).",
            "criteresValidation": "Méthode d'investigation sans détérioration des pistes de cuivre imprimées."
        },
        {
            "ordre": 2,
            "titre": "Dessoudage à l'air chaud et nettoyage des plages d'accueil (pads)",
            "instructions": "Appliquer le flux de soudure, régler la buse d'air chaud à 320°C, chauffer uniformément les extrémités du composant, le retirer délicatement à la précelle, puis nettoyer les plages d'accueil à la tresse à dessouder.",
            "resultatAttendu": "Composant retiré sans arrachement de pastille, plages planes, brillantes et propres.",
            "criteresValidation": "Température et temps de chauffe maîtrisés, intégrité absolue des pistes adjacentes."
        },
        {
            "ordre": 3,
            "titre": "Soudure du nouveau composant CMS et vérification d'absence de pont de soudure",
            "instructions": "Positionner le composant neuf dans le bon sens de polarité (cathode repérée), souder chaque broche au fer fin avec apport modéré d'étain, puis inspecter sous binoculaire pour vérifier le mouillage et l'absence de court-circuit.",
            "resultatAttendu": "Soudure en ménisque concave, brillante, solide et alignée sans court-circuit.",
            "criteresValidation": "Contrôle visuel sous binoculaire et vérification de la levée du court-circuit au multimètre."
        }
    ],
    "resultatsAttendus": [
        "Carte électronique remise en état fonctionnel selon les normes militaires IPC-A-610",
        "Économie substantielle par rapport au remplacement complet de la platine",
        "Validation de la minutie et de l'habileté manuelle indispensables aux laboratoires techniques"
    ],
    "criteresValidation": [
        "Respect des protections électrostatiques (ESD) et extraction des fumées (5 pts)",
        "Précision du diagnostic électrique de panne (5 pts)",
        "Qualité de la soudure (brillance, mouillage, absence de bavures) (5 pts)",
        "Temps de réalisation et propreté de la carte finie (5 pts)"
    ]
},
    Code: 'ATEL-TEL-02',
    Titre: 'Identifier les composants électroniques de base',
    TitreAr: 'اللحام الدقيق واستبدال المكونات الإلكترونية السطحية CMS وفحص اللوحات',
    CategorieId: 'CAT-TELECOM',
    SousDomaine: 'Maintenance des équipements électroniques',
    NiveauDifficulte: 'INTERMEDIAIRE',
    DureeMinutes: 75,
    LieuAtelier: 'Atelier Transmissions & Électronique - Baie Soudure',
    CapaciteMax: 6,
    SuperviseurParDefaut: 'Adjudant B. Laraki (Technicien Électronique)',
    Statut: 'ACTIF',
    DescriptionFr: 'Atelier de micro-électronique appliquée : diagnostic d\'une carte d\'alimentation défectueuse (condensateur gonflé, diode en court-circuit), dessoudure propre à la tresse et air chaud, soudure d\'un composant monté en surface (CMS) sous loupe binoculaire et vérification des tensions régulées.',
    DescriptionAr: 'ورشة الميكرو-إلكترونيات: فحص لوحة تغذية كهربائية معطلة، إزالة وتثبيت المكونات السطحية الدقيقة بالهواء الساخن تحت المجهر واختبار استقرار الفولتية.',
    Objectifs: [
      'Identifier un composant défectueux au multimètre en mode test diode et continuité',
      'Dessouder sans arracher les pistes de cuivre d\'un circuit imprimé multicouche',
      'Réaliser une brasure brillante, concave et exempte de pont de soudure',
      'Contrôler la tension de sortie stabilisée (3.3V / 5V / 12V) sous charge'
    ],
    EquipementsRequis: [
      'Stations de soudage et dessoudage thermo-régulées avec fer à panne fine et souffleur d\'air chaud',
      'Loupes binoculaires éclairées avec support de carte réglable',
      'Multimètres numériques de table haute précision',
      'Tresse à dessouder, flux décapant sans nettoyage et fil d\'étain plombé/sans plomb'
    ],
    ConsignesSecurite: [
      'Aspiration des fumées obligatoire lors de chaque opération de brasage',
      'Port de lunettes de protection contre les projections d\'étain',
      'Déconnexion de l\'alimentation secteur avant toute intervention interne'
    ],
    TachesPratiques: [
      {
        taskId: 'TASK-TEL-2-1',
        ordre: 1,
        description: 'Repérer au multimètre la diode de protection ou le condensateur de filtrage défaillant.',
        resultatAttendu: 'Composant en court-circuit identifié en moins de 10 minutes avec justification.',
        baremePoints: 6
      },
      {
        taskId: 'TASK-TEL-2-2',
        ordre: 2,
        description: 'Dessouder le composant défaillant et souder le composant de remplacement.',
        resultatAttendu: 'Soudure lisse, brillante, sans pont ni décollement de pastille de cuivre.',
        baremePoints: 8
      },
      {
        taskId: 'TASK-TEL-2-3',
        ordre: 3,
        description: 'Mettre sous tension et mesurer la régulation de tension en sortie.',
        resultatAttendu: 'Tensions stabilisées conformes à +/- 2% des valeurs nominales.',
        baremePoints: 6
      }
    ],
    CriteresEvaluation: [
      {
        critereId: 'CRIT-TEL-2-1',
        intitule: 'Qualité esthétique et électrique du joint de soudure',
        intituleAr: 'جودة اللحام الإلكتروني وخلوه من العيوب والتوصيلات العشوائية',
        pointsMax: 8,
        description: 'Brasure propre, absence de surchauffe du composant, respect du mouillage.'
      },
      {
        critereId: 'CRIT-TEL-2-2',
        intitule: 'Précision du diagnostic de panne sur carte',
        intituleAr: 'الدقة في تحديد المكون المعطوب داخل الدارة',
        pointsMax: 6,
        description: 'Démarche logique d\'analyse des schémas d\'implantation sans devinette.'
      },
      {
        critereId: 'CRIT-TEL-2-3',
        intitule: 'Respect des consignes de sécurité thermique et d\'aspiration',
        intituleAr: 'احترام شروط السلامة الحرارية وتهوية الأدخنة',
        pointsMax: 6,
        description: 'Mise en route de l\'extracteur de fumées, rangement du fer sur son support reposoir.'
      }
    ],
    ScoreTotalMax: 20,
    DateCreation: '2026-01-30T10:30:00.000Z'
  },

  // --------------------------------------------------------------------------
  // CAT D : Logistique & Maintenance Générale
  // --------------------------------------------------------------------------
  {
    AtelierId: 8,
    MissionPratique: {
    "intituleMission": "Gestion informatisée des inventaires d'armement, munitions et traçabilité des dotations",
    "contexteProfessionnel": "Armurerie centrale de la compagnie et gestion des matériels sensibles de dotation opérationnelle.",
    "situationInitiale": "Lors de la passation de consignes trimestrielle entre officiers de logistique, un écart de 15 cartouches de 9 mm et deux chargeurs de dotation est détecté entre le logiciel d'inventaire militaire et le comptage physique en soute. Vous devez tracer l'historique complet des sorties de tir des 30 derniers jours, rapprocher les feuilles de tir signées des instructeurs et régulariser le procès-verbal d'inventaire avec visa hiérarchique.",
    "equipementsDisponibles": [
        "Poste de gestion logistique équipé du progiciel de traçabilité d'armement et munitions de la GR",
        "Lecteur de code-barres / douchette optique pour matricules d'armes et scellés de sécurité",
        "Coffre-fort d'exercice avec râtelier d'armes neutralisées et caisses de munitions factices scellées",
        "Registres papier d'émargement et carnets de tir réglementaires",
        "Scellés métalliques et plastiques numérotés pour caisses de stockage"
    ],
    "tachesARealiser": [
        {
            "ordre": 1,
            "titre": "Comptage physique contradictoire et scan optique des numéros de série",
            "instructions": "Procéder au recomptage manuel et au scan des codes-barres de chaque arme et boîte de munitions présente en soute. Comparer le résultat avec l'état d'inventaire théorique du progiciel.",
            "resultatAttendu": "État quantitatif physique exact établi sans omission ni doublon.",
            "criteresValidation": "Rapprochement unitaire par numéro de matricule d'arme."
        },
        {
            "ordre": 2,
            "titre": "Recherche des discordances sur les registres de service et séances de tir",
            "instructions": "Auditer les bordereaux de réquisition des séances d'entraînement au tir du mois écoulé. Localiser l'écart (séance de tir du peloton d'intervention du 14 du mois où 15 cartouches ont été consommées sans saisie informatique de clôture).",
            "resultatAttendu": "Origine exacte de l'écart découverte et justifiée par document signé.",
            "criteresValidation": "Pièce justificative officielle identifiée avec date, heure et visa de l'instructeur de tir."
        },
        {
            "ordre": 3,
            "titre": "Régularisation informatique, pose de nouveaux scellés et rédaction du PV",
            "instructions": "Saisir la consommation justifiée dans le logiciel, ajuster le stock résiduel, sceller la caisse entamée avec un scellé numéroté consigné sur le registre, et rédiger le procès-verbal de régularisation pour le commandant de compagnie.",
            "resultatAttendu": "Stock informatique et stock physique en parfaite adéquation, scellés enregistrés et PV prêt pour signature.",
            "criteresValidation": "Conformité administrative militaire absolue et zéro écart résiduel non justifié."
        }
    ],
    "resultatsAttendus": [
        "Rigueur documentaire et respect de la législation stricte sur les matériels de guerre",
        "Intégrité des stocks d'armement vérifiée sans faille de sécurité",
        "Traçabilité sans faille des dotations individuelles et collectives"
    ],
    "criteresValidation": [
        "Règles d'accès à l'armurerie et sécurité des manipulations (5 pts)",
        "Méthodologie d'investigation et rigueur de recoupement (5 pts)",
        "Qualité de rédaction administrative du procès-verbal (5 pts)",
        "Discipline militaire et rapidité du contrôle contradictoire (5 pts)"
    ]
},
    Code: 'ATEL-LOG-01',
    Titre: 'Organiser un stock de matériel',
    TitreAr: 'التدبير الرقمي لجرد الأسلحة والذخيرة وتتبع العتاد المسند',
    CategorieId: 'CAT-LOG',
    SousDomaine: 'Gestion des stocks et équipements',
    NiveauDifficulte: 'INTERMEDIAIRE',
    DureeMinutes: 75,
    LieuAtelier: 'Magasin Central du Corps - Salle d\'Armement Pédagogique',
    CapaciteMax: 8,
    SuperviseurParDefaut: 'Capitaine R. Amrani (Officier du Matériel)',
    Statut: 'ACTIF',
    DescriptionFr: 'Gestion rigoureuse du magasin d\'armement et de paquetage : rapprochement contradictoire entre l\'inventaire physique et le registre numérique, enregistrement des mouvements de perception/réintégration d\'armes avec vérification des numéros de série, et déclenchement d\'un signalement d\'anomalie de stock.',
    DescriptionAr: 'التدبير الدقيق لمستودع الأسلحة والذخيرة: مطابقة الجرد الفعلي مع السجل الرقمي، توثيق تسليم واسترجاع العتاد بالأرقام التسلسلية، وإعداد تقرير الفوارق.',
    Objectifs: [
      'Vérifier la concordance exacte entre les numéros de carcasse d\'armes et le logiciel d\'inventaire',
      'Établir un bon de perception conforme selon la réglementation militaire',
      'Identifier une discordance de lot de munitions et tracer la chaîne de responsabilité',
      'Appliquer les règles de stockage des matériels de catégorie A et matières pyrotechniques'
    ],
    EquipementsRequis: [
      'Racks d\'armement d\'exercice neutralisé (armes de dotation sécurisées)',
      'Lecteur de code-barres / QR-code d\'inventaire',
      'Poste de gestion logistique avec base de données de dotation',
      'Registres papier officiels de chancellerie'
    ],
    ConsignesSecurite: [
      'Contrôle visuel obligatoire de sécurité d\'arme (chambre vide, chargeur ôté) à chaque prise en main',
      'Respect strict de l\'accès sécurisé au local armement'
    ],
    TachesPratiques: [
      {
        taskId: 'TASK-LOG-1-1',
        ordre: 1,
        description: 'Réaliser le pointage contradictoire de 25 armes de poing et fusils d\'assaut d\'exercice.',
        resultatAttendu: 'Zéro erreur de numéro de matricule relevé, détection immédiate de l\'arme permutée.',
        baremePoints: 7
      },
      {
        taskId: 'TASK-LOG-1-2',
        ordre: 2,
        description: 'Enregistrer le mouvement de sortie pour mission d\'une section et éditer les reçus signés.',
        resultatAttendu: 'Fiches de perception correctement horodatées et visées avec inventaire des munitions scellées.',
        baremePoints: 7
      },
      {
        taskId: 'TASK-LOG-1-3',
        ordre: 3,
        description: 'Formaliser le procès-verbal de récolement mensuel pour le commandement de compagnie.',
        resultatAttendu: 'PV complet conforme à l\'instruction ministérielle sur la comptabilité des matières.',
        baremePoints: 6
      }
    ],
    CriteresEvaluation: [
      {
        critereId: 'CRIT-LOG-1-1',
        intitule: 'Exhaustivité et exactitude du pointage des numéros matricules',
        intituleAr: 'الدقة المتناهية في مطابقة الأرقام التسلسلية للأسلحة',
        pointsMax: 8,
        description: 'Tolérance zéro pour les erreurs d\'identification d\'armement.'
      },
      {
        critereId: 'CRIT-LOG-1-2',
        intitule: 'Respect des règles de sécurité de manipulation des armes',
        intituleAr: 'الالتزام الصارم بقواعد الأمان العسكري في مسك السلاح',
        pointsMax: 6,
        description: 'Vérification de sécurité systématique, canon pointé en zone de sécurité.'
      },
      {
        critereId: 'CRIT-LOG-1-3',
        intitule: 'Conformité réglementaire des bordereaux et registres',
        intituleAr: 'المطابقة النظامية لأذونات التسليم وسجلات المحاسبة العسكرية',
        pointsMax: 6,
        description: 'Clarté des mentions obligatoires, propreté de la tenue des livres officiels.'
      }
    ],
    ScoreTotalMax: 20,
    DateCreation: '2026-02-01T08:00:00.000Z'
  },
  {
    AtelierId: 9,
    MissionPratique: {
    "intituleMission": "Contrôle de conformité d'armoire électrique triphasée, test d'inverseur et groupe électrogène",
    "contexteProfessionnel": "Infrastructure technique et continuité d'énergie des casernes et postes de commandement 24/7 de la Gendarmerie Royale.",
    "situationInitiale": "Le centre de transmissions de la compagnie doit rester alimenté en toutes circonstances. Lors du test mensuel obligatoire d'interruption du réseau public, le groupe électrogène s'est élancé mais l'inverseur motorisé n'a pas alimenté les départs secourus. Vous devez consigner l'installation électrique (condamnation, vérification d'absence de tension VAT), inspecter la chaîne de commande des contacteurs de puissance, tester les sécurités différentielles et vérifier la batterie de démarrage du groupe électrogène.",
    "equipementsDisponibles": [
        "Armoire électrique industrielle didactique triphasée 400V avec inverseur normal/secours",
        "Vérificateur d'Absence de Tension homologué (VAT norme NF C 18-510)",
        "Contrôleur d'installation multifonction (mesure d'isolement 500V, boucle de terre et disjoncteurs différentiels)",
        "Cadenas et macarons de consignation électrique militaire",
        "EPI électriques obligatoires : gants isolants 1000V, écran facial anti-arc électrique, tapis isolant"
    ],
    "tachesARealiser": [
        {
            "ordre": 1,
            "titre": "Consignation électrique en 4 étapes et vérification d'absence de tension (VAT)",
            "instructions": "Revêtir les EPI obligatoires, déclencher le disjoncteur général, condamner par cadenas de consignation, poser la pancarte d'avertissement, tester l'appareil VAT, mesurer l'absence de tension entre phases et neutre, puis retester le VAT.",
            "resultatAttendu": "Consignation complète certifiée conforme à la norme NF C 18-510 sans aucun risque d'électrisation.",
            "criteresValidation": "Respect scrupuleux des 4 étapes (Séparation, Condamnation, Identification, VAT). Arrêt immédiat si manquement."
        },
        {
            "ordre": 2,
            "titre": "Diagnostic de la chaîne de commande de l'inverseur de source",
            "instructions": "Consulter le schéma électrique de l'inverseur, contrôler au multimètre l'état du relais de présence tension réseau et la continuité des contacts auxiliaires NF/NO des contacteurs de verrouillage mécanique.",
            "resultatAttendu": "Identification du défaut (contact auxiliaire NF encrassé bloquant l'enclenchement du contacteur groupe).",
            "criteresValidation": "Lecture méthodique du schéma électrique et dépannage sans dégradation des borniers."
        },
        {
            "ordre": 3,
            "titre": "Essai réel de basculement en charge et contrôle du différentiel 30mA",
            "instructions": "Déconsigner dans les règles, simuler une rupture de phase réseau, vérifier le démarrage automatique du groupe en moins de 15 secondes, le basculement franc de l'inverseur, puis déclencher le bouton de test du disjoncteur différentiel 30mA.",
            "resultatAttendu": "Basculement automatique nominal, départ secouru alimenté et disjonction différentielle conforme en moins de 30 ms.",
            "criteresValidation": "Continuité de service rétablie et sécurités des personnes opérationnelles."
        }
    ],
    "resultatsAttendus": [
        "Poste de commandement autonome et sécurisé face aux pannes d'énergie réseau",
        "Protection absolue des personnels contre les chocs électriques et arcs de puissance",
        "Rapport technique d'inspection périodique visé pour le registre de sécurité du bâtiment"
    ],
    "criteresValidation": [
        "Sécurité électrique absolue et respect des EPI (Note = 0 et arrêt immédiat si oubli d'EPI) (5 pts)",
        "Rigueur du diagnostic de l'automatisme d'inversion (5 pts)",
        "Qualité de l'intervention et remise sous tension sécurisée (5 pts)",
        "Respect des délais et précision des mesures de terre/différentiel (5 pts)"
    ]
},
    Code: 'ATEL-LOG-02',
    Titre: 'Diagnostiquer un problème simple de maintenance d\'un bâtiment',
    TitreAr: 'السلامة الكهربائية، صيانة اللوحات ثلاثية الأطوار ومولدات الطوارئ للثكنات',
    CategorieId: 'CAT-LOG',
    SousDomaine: 'Maintenance générale des bâtiments',
    NiveauDifficulte: 'AVANCE',
    DureeMinutes: 90,
    LieuAtelier: 'Atelier Technique Casernement - Bâtiment Énergie',
    CapaciteMax: 5,
    SuperviseurParDefaut: 'Adjudant F. Benjelloun (Adjudant de Casernement)',
    Statut: 'ACTIF',
    DescriptionFr: 'Maintenance de niveau 2 des installations d\'énergie de secours d\'une brigade isolée : consignation électrique en sécurité selon norme NF C 18-510 / NM, contrôle des disjoncteurs différentiels 30mA, vérification des niveaux et batterie de démarrage d\'un groupe électrogène diesel, et test d\'inversion automatique de source.',
    DescriptionAr: 'الصيانة العملياتية لمنشآت الطاقة بالثكنات: تطبيق بروتوكول العزل الكهربائي الآمن، فحص القواطع التفاضلية، ومراقبة واختبار تشغيل المولد الكهربائي الاحتياطي.',
    Objectifs: [
      'Appliquer rigoureusement les 5 étapes de la consignation électrique basse tension (VAT)',
      'Mesurer l\'isolement de la terre avec un telluromètre',
      'Contrôler la tension des courroies, filtres et niveau d\'huile du groupe électrogène de secours',
      'Tester le démarrage automatique en cas de rupture simulée du réseau électrique public'
    ],
    EquipementsRequis: [
      'Armoire électrique pédagogique triphasée 400V avec disjoncteurs divisionnaires et différentiels',
      'Vérificateur d\'Absence de Tension (VAT) homologué et cadenas de consignation',
      'Groupe électrogène de secours diesel d\'exercice avec inverseur de source normal/secours',
      'EPI électricien : gants isolants 1000V, écran facial anti-arc électrique'
    ],
    ConsignesSecurite: [
      'Port obligatoire des gants isolants et de l\'écran facial lors de l\'ouverture d\'armoire sous tension',
      'Interdiction absolue de toucher un conducteur sans Vérification d\'Absence de Tension préalable'
    ],
    TachesPratiques: [
      {
        taskId: 'TASK-LOG-2-1',
        ordre: 1,
        description: 'Exécuter la procédure de consignation complète d\'un départ 400V avec pose de cadenas et étiquetage.',
        resultatAttendu: 'Consignation validée avec attestation signée et VAT confirmant 0.0V entre toutes les phases et la terre.',
        baremePoints: 8
      },
      {
        taskId: 'TASK-LOG-2-2',
        ordre: 2,
        description: 'Vérifier le groupe électrogène (batterie 24V, préchauffage, niveau carburant) et lancer un démarrage manuel.',
        resultatAttendu: 'Démarrage au premier coup de démarreur, stabilisation de fréquence à 50 Hz +/- 1 Hz et tension 400V.',
        baremePoints: 6
      },
      {
        taskId: 'TASK-LOG-2-3',
        ordre: 3,
        description: 'Simuler une coupure secteur et vérifier le basculement sur l\'inverseur en moins de 15 secondes.',
        resultatAttendu: 'Basculement réussi, réalimentation des circuits prioritaires de la caserne.',
        baremePoints: 6
      }
    ],
    CriteresEvaluation: [
      {
        critereId: 'CRIT-LOG-2-1',
        intitule: 'Rigueur absolue de la consignation électrique et port des EPI',
        intituleAr: 'الصرامة المطلقة في العزل الكهربائي وارتداء معدات الحماية الفردية',
        pointsMax: 8,
        description: 'Tolérance zéro pour tout manquement aux règles de sécurité électrique vitale.'
      },
      {
        critereId: 'CRIT-LOG-2-2',
        intitule: 'Connaissance technique du groupe électrogène et inverseur',
        intituleAr: 'الإلمام التقني بمكونات المولد ومحول التغذية التلقائي',
        pointsMax: 6,
        description: 'Compréhension du rôle des relais de commande et du temps de montée en régime.'
      },
      {
        critereId: 'CRIT-LOG-2-3',
        intitule: 'Réactivité et diagnostic en cas de non-démarrage simulé',
        intituleAr: 'سرعة رد الفعل والتشخيص عند تعذر الإقلاع الفوري',
        pointsMax: 6,
        description: 'Recherche méthodique (fusible commande, vanne carburant, tension batterie de servitude).'
      }
    ],
    ScoreTotalMax: 20,
    DateCreation: '2026-02-03T11:00:00.000Z'
  },
  // --------------------------------------------------------------------------
  // CAT B : Mécanique & Électricité Auto (Atelier 10)
  // --------------------------------------------------------------------------
  {
    AtelierId: 10,
    Code: 'ATEL-MECA-03',
    Titre: 'Comprendre un rapport de diagnostic automobile',
    TitreAr: 'قراءة وتحليل تقرير الفحص الإلكتروني للمركبات',
    CategorieId: 'CAT-MECA',
    SousDomaine: 'Diagnostic électronique automobile OBD',
    NiveauDifficulte: 'MOYEN',
    DureeMinutes: 60,
    LieuAtelier: 'Atelier Mécanique & Parc Auto - Bâtiment D',
    CapaciteMax: 8,
    SuperviseurParDefaut: 'Adjudant-Chef M. El Fassi',
    Statut: 'ACTIF',
    DescriptionFr: 'Lecture et compréhension méthodique d\'un rapport de diagnostic OBD : repérage des codes défauts DTC, analyse des sondes et validation des réparations.',
    DescriptionAr: 'قراءة وفهم تقرير الفحص الإلكتروني OBD، وتحديد رموز الأعطال وحالة الحساسات.',
    Objectifs: [
      'Lire et interpréter les codes d\'anomalie standardisés DTC (P0xxx)',
      'Analyser les valeurs des capteurs moteurs en temps réel',
      'Rédiger une fiche de proposition d\'intervention technique'
    ],
    EquipementsRequis: [
      'Rapport complet de diagnostic OBD-II avec relevé des codes d\'anomalie',
      'Fiche technique constructeur des valeurs de référence des sondes',
      'Fiche d\'intervention technique et de consignation d\'atelier'
    ],
    ConsignesSecurite: [
      'Interdiction de toucher aux faisceaux sous tension',
      'Vérifier le calage et le frein de parking du véhicule'
    ],
    TachesPratiques: [
      {
        taskId: 'TASK-MECA-3-1',
        ordre: 1,
        description: 'Identifier et classifier les codes défauts DTC relevés sur le rapport.',
        resultatAttendu: 'Codes P0300 et P0171 classifiés avec distinction gravité.',
        baremePoints: 6
      },
      {
        taskId: 'TASK-MECA-3-2',
        ordre: 2,
        description: 'Comparer les valeurs des capteurs aux plages de référence constructeur.',
        resultatAttendu: 'Anomalie du débitmètre d\'air identifiée sans ambiguïté.',
        baremePoints: 8
      },
      {
        taskId: 'TASK-MECA-3-3',
        ordre: 3,
        description: 'Rédiger la proposition d\'intervention pour le chef d\'atelier.',
        resultatAttendu: 'Fiche d\'intervention claire préconisant le nettoyage/remplacement du capteur.',
        baremePoints: 6
      }
    ],
    CriteresEvaluation: [
      { critereId: 'CRIT-MECA-3-1', intitule: 'Rigueur de la lecture du rapport', pointsMax: 7, description: 'Compréhension exacte des données DTC.' },
      { critereId: 'CRIT-MECA-3-2', intitule: 'Pertinence du diagnostic', pointsMax: 7, description: 'Localisation précise de l\'organe défaillant.' },
      { critereId: 'CRIT-MECA-3-3', intitule: 'Qualité de la synthèse écrite', pointsMax: 6, description: 'Clarté de la fiche d\'intervention.' }
    ],
    MissionPratique: {
      intituleMission: 'Analyse d\'un rapport de diagnostic électronique sur véhicule d\'intervention',
      contexteProfessionnel: 'Véhicule de patrouille ayant subi une perte de puissance en mission. Le rapport de la valise de diagnostic électronique vient d\'être extrait par le mécanicien d\'astreinte.',
      situationInitiale: 'Le rapport mentionne deux codes défauts : P0300 (Ratés d\'allumage cylindres multiples) et P0171 (Mélange trop pauvre banc 1). Vous devez interpréter ces données pour orienter l\'intervention.',
      equipementsDisponibles: [
        'Rapport complet de diagnostic OBD-II avec relevé des codes d\'anomalie',
        'Fiche technique constructeur des valeurs de référence des sondes',
        'Fiche d\'intervention technique et de consignation d\'atelier'
      ],
      tachesARealiser: [
        {
          ordre: 1,
          titre: 'Identifier et classifier les codes défauts DTC relevés',
          instructions: 'Analyser les codes défauts P0300 et P0171 sur le rapport. Noter leur gravité et les organes moteur impactés.',
          resultatAttendu: 'Codes classifiés avec distinction entre défaut critique et défaut d\'appoint.',
          criteresValidation: 'Exactitude de la désignation des anomalies.'
        },
        {
          ordre: 2,
          titre: 'Comparer les valeurs des capteurs aux plages de référence constructeur',
          instructions: 'Vérifier la tension de la sonde lambda et la masse d\'air du débitmètre par rapport aux normes constructeur.',
          resultatAttendu: 'Anomalie du débitmètre d\'air identifiée comme cause probable.',
          criteresValidation: 'Repérage sans erreur de la valeur hors tolérance.'
        },
        {
          ordre: 3,
          titre: 'Rédiger la proposition d\'intervention technique',
          instructions: 'Compléter la fiche d\'atelier avec la recommandation technique pour le chef d\'atelier mécanique.',
          resultatAttendu: 'Fiche d\'intervention claire préconisant le nettoyage/remplacement du capteur d\'air.',
          criteresValidation: 'Pertinence de la solution proposée.'
        }
      ],
      resultatsAttendus: [
        'Interprétation exacte des codes défauts de la valise OBD',
        'Identification de la cause racine sans remplacement inutile de pièces'
      ],
      criteresValidation: [
        'Rigueur de la lecture du rapport (8 pts)',
        'Pertinence du diagnostic (6 pts)',
        'Qualité de la fiche d\'intervention (6 pts)'
      ]
    },
    ScoreTotalMax: 20,
    DateCreation: '2026-02-04T09:00:00.000Z'
  },
  // --------------------------------------------------------------------------
  // CAT C : Électronique & Télécom (Atelier 11)
  // --------------------------------------------------------------------------
  {
    AtelierId: 11,
    Code: 'ATEL-TEL-03',
    Titre: 'Reconnaître les éléments d\'un appareil électronique',
    TitreAr: 'التعرف على الأجزاء والدارات الداخلية لجهاز إلكتروني',
    CategorieId: 'CAT-TELECOM',
    SousDomaine: 'Maintenance des équipements électroniques',
    NiveauDifficulte: 'FACILE',
    DureeMinutes: 45,
    LieuAtelier: 'Laboratoire Électronique & Radio - Bâtiment B',
    CapaciteMax: 8,
    SuperviseurParDefaut: 'Adjudant-Chef M. El Fassi',
    Statut: 'ACTIF',
    DescriptionFr: 'Ouverture sécurisée, repérage visuel des modules internes (bloc alimentation, carte mère, antenne) et détection des signes visibles d\'avarie.',
    DescriptionAr: 'الفتح الآمن، وتحديد وحدات الجهاز الإلكتروني (التغذية، اللوحة الأم، الهوائي) وفحص التوصيلات.',
    Objectifs: [
      'Ouvrir un boîtier électronique en toute sécurité avec respect des normes antistatiques',
      'Identifier les différents blocs fonctionnels (alimentation, traitement, émission)',
      'Déceler visuellement les traces de surchauffe ou d\'oxydation'
    ],
    EquipementsRequis: [
      'Boîtier radio tactique de démonstration',
      'Jeu d\'outillage de précision et tournevis isolés',
      'Loupe d\'inspection électronique et bracelet antistatique ESD'
    ],
    ConsignesSecurite: [
      'Débrancher obligatoirement toute source d\'alimentation avant ouverture',
      'Porter le bracelet antistatique relié à la terre'
    ],
    TachesPratiques: [
      {
        taskId: 'TASK-TEL-3-1',
        ordre: 1,
        description: 'Démontage ordonné et sécurisé du boîtier de protection.',
        resultatAttendu: 'Boîtier ouvert proprement sans endommager les joints d\'étanchéité.',
        baremePoints: 6
      },
      {
        taskId: 'TASK-TEL-3-2',
        ordre: 2,
        description: 'Identifier et nommer les 4 blocs fonctionnels internes.',
        resultatAttendu: 'Bloc alimentation, module radio et carte de traitement repérés.',
        baremePoints: 8
      },
      {
        taskId: 'TASK-TEL-3-3',
        ordre: 3,
        description: 'Inspecter les composants et connecteurs pour déceler les anomalies.',
        resultatAttendu: 'Inspection visuelle minutieuse consignée sur la fiche.',
        baremePoints: 6
      }
    ],
    CriteresEvaluation: [
      { critereId: 'CRIT-TEL-3-1', intitule: 'Respect des règles de manipulation antistatique', pointsMax: 8, description: 'Port ESD et soin du matériel.' },
      { critereId: 'CRIT-TEL-3-2', intitule: 'Exactitude du repérage des composants', pointsMax: 6, description: 'Nommage sans erreur des sous-ensembles.' },
      { critereId: 'CRIT-TEL-3-3', intitule: 'Précision de l\'inspection visuelle', pointsMax: 6, description: 'Examen des soudures et connexions.' }
    ],
    MissionPratique: {
      intituleMission: 'Reconnaissance des organes internes d\'un terminal radio tactique',
      contexteProfessionnel: 'Réception d\'un lot de terminaux radio en retour de mission de surveillance. Un examen visuel approfondi est requis avant remise en service.',
      situationInitiale: 'Un appareil présente des dysfonctionnements intermittents. Vous devez ouvrir le boîtier selon la procédure et identifier l\'ensemble des blocs fonctionnels internes.',
      equipementsDisponibles: [
        'Boîtier radio tactique déconnecté pour travaux pratiques sécurisés',
        'Jeu d\'outillage de précision de l\'armurerie électronique',
        'Schéma synoptique de câblage et d\'implantation des cartes'
      ],
      tachesARealiser: [
        {
          ordre: 1,
          titre: 'Démontage ordonné et sécurisé du boîtier de protection',
          instructions: 'Retirer les vis de fixation en respectant l\'ordre préconisé et ranger les éléments sur le tapis magnétique.',
          resultatAttendu: 'Boîtier ouvert proprement sans endommager les joints d\'étanchéité.',
          criteresValidation: 'Respect de la méthodologie de démontage.'
        },
        {
          ordre: 2,
          titre: 'Identifier et nommer les 4 blocs fonctionnels internes',
          instructions: 'Repérer le bloc d\'alimentation, le module émetteur-récepteur radio, la carte de traitement numérique et l\'étage amplificateur.',
          resultatAttendu: 'Chaque module identifié et étiqueté correctement sur la fiche de repérage.',
          criteresValidation: 'Exactitude de la désignation des modules.'
        },
        {
          ordre: 3,
          titre: 'Inspecter les composants et connecteurs pour déceler les anomalies',
          instructions: 'Examiner à la loupe les connecteurs internes, soudures et traces d\'oxydation ou de surchauffe.',
          resultatAttendu: 'Absence d\'anomalie ou signalement d\'un connecteur oxydé consigné.',
          criteresValidation: 'Qualité du compte-rendu d\'inspection visuelle.'
        }
      ],
      resultatsAttendus: [
        'Démontage et remontage conformes aux normes',
        'Maîtrise de l\'architecture interne des matériels de communication'
      ],
      criteresValidation: [
        'Respect des règles de manipulation antistatique (8 pts)',
        'Exactitude du repérage des composants (6 pts)',
        'Précision de l\'inspection (6 pts)'
      ]
    },
    ScoreTotalMax: 20,
    DateCreation: '2026-02-04T10:00:00.000Z'
  },
  // --------------------------------------------------------------------------
  // CAT D : Logistique & Maintenance (Atelier 12)
  // --------------------------------------------------------------------------
  {
    AtelierId: 12,
    Code: 'ATEL-LOG-03',
    Titre: 'Identifier les erreurs dans un inventaire',
    TitreAr: 'رصد وتصحيح الأخطاء في سجلات الجرد والعتاد',
    CategorieId: 'CAT-LOG',
    SousDomaine: 'Gestion des stocks et équipements',
    NiveauDifficulte: 'MOYEN',
    DureeMinutes: 60,
    LieuAtelier: 'Magasin Général & Entrepôt Logistique - Bâtiment E',
    CapaciteMax: 8,
    SuperviseurParDefaut: 'Adjudant-Chef M. El Fassi',
    Statut: 'ACTIF',
    DescriptionFr: 'Rapprochement physique entre les pièces en rayon et le registre d\'inventaire informatisé : détection des écarts de quantité, erreurs de référence et régularisation.',
    DescriptionAr: 'المطابقة الميدانية بين المخزون الفعلي وسجلات الجرد، ورصد الفروقات وتصحيحها.',
    Objectifs: [
      'Réaliser un comptage physique contradictoire sans omission',
      'Identifier et documenter les écarts de stock ou de référence',
      'Établir la fiche officielle de régularisation administrative'
    ],
    EquipementsRequis: [
      'Registre d\'inventaire logistique imprimé avec casiers numérotés',
      'Lecteur de code-barres / douchette optique',
      'Fiche de constat d\'écart d\'inventaire (Modèle officiel Gendarmerie)'
    ],
    ConsignesSecurite: [
      'Port de chaussures de sécurité obligatoire dans l\'entrepôt',
      'Respecter le balisage des allées de circulation'
    ],
    TachesPratiques: [
      {
        taskId: 'TASK-LOG-3-1',
        ordre: 1,
        description: 'Effectuer le comptage physique contradictoire des casiers assignés.',
        resultatAttendu: 'Comptage physique précis réalisé sur les casiers A et B.',
        baremePoints: 6
      },
      {
        taskId: 'TASK-LOG-3-2',
        ordre: 2,
        description: 'Identifier et documenter les écarts entre stock réel et théorique.',
        resultatAttendu: 'Erreur d\'étiquetage et inversion de référence repérées.',
        baremePoints: 8
      },
      {
        taskId: 'TASK-LOG-3-3',
        ordre: 3,
        description: 'Établir la fiche officielle de régularisation d\'inventaire.',
        resultatAttendu: 'PV de régularisation rédigé et prêt pour signature du commandement.',
        baremePoints: 6
      }
    ],
    CriteresEvaluation: [
      { critereId: 'CRIT-LOG-3-1', intitule: 'Rigueur et précision du comptage', pointsMax: 8, description: 'Comptage rigoureux sans décalage.' },
      { critereId: 'CRIT-LOG-3-2', intitule: 'Pertinence de l\'analyse des écarts', pointsMax: 6, description: 'Explication causale claire des différences.' },
      { critereId: 'CRIT-LOG-3-3', intitule: 'Qualité de la rédaction administrative', pointsMax: 6, description: 'Conformité du PV de régularisation.' }
    ],
    MissionPratique: {
      intituleMission: 'Contrôle d\'inventaire et régularisation des écarts en magasin de casernement',
      contexteProfessionnel: 'Clôture mensuelle du magasin des matériels de protection et d\'intervention. Le sous-officier d\'approvisionnement demande une vérification ciblée sur le rayon optique et transmissions.',
      situationInitiale: 'Le registre informatisé indique 15 jumelles vision nocturne et 30 gilets tactiques, mais des anomalies de comptage ont été signalées lors de la relève de garde.',
      equipementsDisponibles: [
        'Registre d\'inventaire théorique du magasin',
        'Zone de stockage étiquetée avec casiers numérotés',
        'Fiche de régularisation et de constat d\'écart (Modèle Gendarmerie)'
      ],
      tachesARealiser: [
        {
          ordre: 1,
          titre: 'Effectuer le comptage physique contradictoire du casier A et B',
          instructions: 'Compter méthodiquement les équipements présents en rayon et confronter les numéros de série aux étiquettes.',
          resultatAttendu: 'Comptage physique précis réalisé sans omission ni doublon.',
          criteresValidation: 'Exactitude absolue du comptage physique.'
        },
        {
          ordre: 2,
          titre: 'Identifier et documenter les écarts entre stock réel et théorique',
          instructions: 'Mettre en évidence les écarts constatés (ex: une référence inversée entre deux modèles de jumelles).',
          resultatAttendu: 'Écart de référence identifié et justifié par une erreur d\'étiquetage.',
          criteresValidation: 'Explication logique et documentée de l\'écart.'
        },
        {
          ordre: 3,
          titre: 'Établir la fiche officielle de régularisation d\'inventaire',
          instructions: 'Rédiger le procès-verbal de constat d\'écart avec visa pour signature du chef de corps.',
          resultatAttendu: 'Document officiel conforme prêt pour transmission au commandement.',
          criteresValidation: 'Conformité administrative et clarté de la synthèse.'
        }
      ],
      resultatsAttendus: [
        'Exactitude du stock physique rétablie',
        'Traçabilité administrative parfaite selon les règlements militaires'
      ],
      criteresValidation: [
        'Rigueur et précision du comptage (8 pts)',
        'Pertinence de l\'analyse des écarts (6 pts)',
        'Qualité de la rédaction administrative (6 pts)'
      ]
    },
    ScoreTotalMax: 20,
    DateCreation: '2026-02-04T11:00:00.000Z'
  }
];

/**
 * Assignations et évaluations initiales des élèves sur les ateliers pratiques
 */
export const initialWorkshopAssignments = [
  {
    "AssignationId": 1,
    "AtelierId": 1,
    "UtilisateurId": 2,
    "PromotionId": 1,
    "SuperviseurId": 1,
    "SuperviseurNom": "Adjudant-Chef M. El Fassi (Section SIC)",
    "DateAssignation": "2026-02-05T09:00:00.000Z",
    "DatePrevue": "2026-02-10T09:00:00.000Z",
    "DateRealisation": "2026-02-10T11:00:00.000Z",
    "DateValidation": "2026-02-10T11:30:00.000Z",
    "ValidePar": "Adjudant-Chef M. El Fassi",
    "Statut": "VALIDE",
    "EstVerrouille": true,
    "ArretSecurite": false,
    "MotifArretSecurite": null,
    "NotesCriteres": {
      "CRIT-SEC-METH": {
        "note": 5,
        "noteMax": 5,
        "commentaire": "Respect rigoureux des protocoles de chiffrement et traçabilité des clés."
      },
      "CRIT-DIAG-PREC": {
        "note": 5,
        "noteMax": 5,
        "commentaire": "Identification immédiate des services vulnérables et ports ouverts."
      },
      "CRIT-EXEC-QUAL": {
        "note": 5,
        "noteMax": 5,
        "commentaire": "Durcissement OS exemplaire, script d'automatisation propre."
      },
      "CRIT-TPS-DISC": {
        "note": 4,
        "noteMax": 5,
        "commentaire": "Mission terminée dans les temps, excellente posture militaire."
      }
    },
    "ScoreObtenu": 19,
    "ScoreTotalMax": 20,
    "ScorePourcentage": 95,
    "Mention": "EXCELLENT",
    "PointsForts": [
      "Excellente maîtrise du chiffrement LUKS et des stratégies de groupe",
      "Rigueur absolue dans le respect des fiches d'enregistrement de sécurité",
      "Très forte autonomie technique face aux imprévus d'installation"
    ],
    "AxesAmelioration": [
      "Accélérer la phase préliminaire de partitionnement manuel",
      "Synthétiser les rapports de journalisation pour la hiérarchie"
    ],
    "CompetencesDetectees": [
      "Administration avancée Linux/Windows",
      "Chiffrement et durcissement des stations de travail",
      "Audit de sécurité des journaux système"
    ],
    "ObservationsEvaluateur": "L'élève démontre une aisance technique remarquable et une autonomie immédiate sur les systèmes tactiques. Aptitude très forte pour les unités spécialisées en cybercriminalité ou administration de réseaux sensibles.",
    "RecommandationSpecialite": "SPEC-INFO",
    "PreuvesAttachees": [
      {
        "id": "PRV-101",
        "nomFichier": "rapport_durcissement_luks.pdf",
        "type": "application/pdf",
        "taille": "320 Ko",
        "dateUpload": "2026-02-10T11:15:00.000Z",
        "url": "#"
      },
      {
        "id": "PRV-102",
        "nomFichier": "capture_journal_securite.png",
        "type": "image/png",
        "taille": "1.2 Mo",
        "dateUpload": "2026-02-10T11:20:00.000Z",
        "url": "#"
      }
    ],
    "HistoriqueRevisions": [
      {
        "revisionId": "REV-001",
        "action": "CREATION",
        "auteurId": 1,
        "auteurNom": "Adjudant-Chef M. El Fassi",
        "dateAction": "2026-02-05T09:00:00.000Z",
        "scoreSnapshot": null,
        "statutSnapshot": "NON_COMMENCE",
        "commentaire": "Programmation de la séance d'atelier durcissement OS."
      },
      {
        "revisionId": "REV-002",
        "action": "VALIDATION",
        "auteurId": 1,
        "auteurNom": "Adjudant-Chef M. El Fassi",
        "dateAction": "2026-02-10T11:30:00.000Z",
        "scoreSnapshot": 19,
        "statutSnapshot": "VALIDE",
        "commentaire": "Évaluation pratique validée sans réserve. Niveau excellent."
      }
    ],
    "AvancementPourcentage": 100,
    "TachesChecklist": [
      {
        "taskId": "TASK-INFO-1-1",
        "ordre": 1,
        "titre": "Accéder au BIOS/UEFI, activer le TPM 2.0 et configurer le mo...",
        "instructions": "Accéder au BIOS/UEFI, activer le TPM 2.0 et configurer le mot de passe superviseur.",
        "resultatAttendu": "BIOS verrouillé, Secure Boot activé et ordre de démarrage sécurisé.",
        "baremePoints": 5,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 1 exécutée avec succès selon la consigne technique.",
        "preuves": []
      },
      {
        "taskId": "TASK-INFO-1-2",
        "ordre": 2,
        "titre": "Installer le système avec chiffrement intégral de la partiti...",
        "instructions": "Installer le système avec chiffrement intégral de la partition système.",
        "resultatAttendu": "Système opérationnel avec invite de clé au démarrage.",
        "baremePoints": 8,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 2 exécutée avec succès selon la consigne technique.",
        "preuves": []
      },
      {
        "taskId": "TASK-INFO-1-3",
        "ordre": 3,
        "titre": "Appliquer la GPO locale de restriction des périphériques amo...",
        "instructions": "Appliquer la GPO locale de restriction des périphériques amovibles et auditer les événements.",
        "resultatAttendu": "Clé USB de test rejetée et tentative consignée dans le journal d'audit.",
        "baremePoints": 7,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 3 exécutée avec succès selon la consigne technique.",
        "preuves": []
      }
    ],
    "ObservationsEleve": "Atelier pratique terminé dans le respect des consignes de sécurité.",
    "DateDebut": "2026-02-10T09:00:00.000Z",
    "DateSoumission": null
  },
  {
    "AssignationId": 2,
    "AtelierId": 2,
    "UtilisateurId": 2,
    "PromotionId": 1,
    "SuperviseurId": 1,
    "SuperviseurNom": "Lieutenant K. Tahiri (Officier Réseaux)",
    "DateAssignation": "2026-02-05T09:00:00.000Z",
    "DatePrevue": "2026-02-12T14:00:00.000Z",
    "DateRealisation": "2026-02-12T16:15:00.000Z",
    "DateValidation": "2026-02-12T16:45:00.000Z",
    "ValidePar": "Lieutenant K. Tahiri",
    "Statut": "VALIDE",
    "EstVerrouille": true,
    "ArretSecurite": false,
    "MotifArretSecurite": null,
    "NotesCriteres": {
      "CRIT-SEC-METH": {
        "note": 5,
        "noteMax": 5,
        "commentaire": "Poste de câblage sécurisé, chutes de cuivre évacuées, pas d'outils traînants."
      },
      "CRIT-DIAG-PREC": {
        "note": 4,
        "noteMax": 5,
        "commentaire": "Dépannage méthodique de la coupure de paire torsadée au testeur."
      },
      "CRIT-EXEC-QUAL": {
        "note": 5,
        "noteMax": 5,
        "commentaire": "Sertissage RJ45 Cat6 conforme à la norme T568B, continuité du blindage parfaite."
      },
      "CRIT-TPS-DISC": {
        "note": 4,
        "noteMax": 5,
        "commentaire": "Très bonne réactivité et respect des délais d'intervention."
      }
    },
    "ScoreObtenu": 18,
    "ScoreTotalMax": 20,
    "ScorePourcentage": 90,
    "Mention": "EXCELLENT",
    "PointsForts": [
      "Excellente dextérité manuelle pour le sertissage rapide des fiches blindées",
      "Compréhension claire des masques de sous-réseau et des VLANs tactiques"
    ],
    "AxesAmelioration": [
      "Veiller au rayon de courbure minimal des câbles en baie de brassage"
    ],
    "CompetencesDetectees": [
      "Câblage structuré RJ45 blindé Cat6",
      "Configuration des VLANs sur commutateur de niveau 2",
      "Diagnostic réseau au testeur numérique"
    ],
    "ObservationsEvaluateur": "Compréhension intuitive de l'architecture réseau d'un poste de commandement. Excellent sens pratique dans le câblage et l'organisation de baie.",
    "RecommandationSpecialite": "SPEC-INFO",
    "PreuvesAttachees": [
      {
        "id": "PRV-103",
        "nomFichier": "rapport_testeur_fluke.pdf",
        "type": "application/pdf",
        "taille": "410 Ko",
        "dateUpload": "2026-02-12T16:30:00.000Z",
        "url": "#"
      }
    ],
    "HistoriqueRevisions": [
      {
        "revisionId": "REV-003",
        "action": "CREATION",
        "auteurId": 1,
        "auteurNom": "Lieutenant K. Tahiri",
        "dateAction": "2026-02-05T09:00:00.000Z",
        "scoreSnapshot": null,
        "statutSnapshot": "NON_COMMENCE",
        "commentaire": "Séance assignée."
      },
      {
        "revisionId": "REV-004",
        "action": "VALIDATION",
        "auteurId": 1,
        "auteurNom": "Lieutenant K. Tahiri",
        "dateAction": "2026-02-12T16:45:00.000Z",
        "scoreSnapshot": 18,
        "statutSnapshot": "VALIDE",
        "commentaire": "Validation officielle. Mention Excellent."
      }
    ],
    "AvancementPourcentage": 100,
    "TachesChecklist": [
      {
        "taskId": "TASK-INFO-2-1",
        "ordre": 1,
        "titre": "Confectionner 2 cordons RJ45 droits blindés de 2 mètres selo...",
        "instructions": "Confectionner 2 cordons RJ45 droits blindés de 2 mètres selon la norme T568B.",
        "resultatAttendu": "Testeur de câble validant les 8 brins + blindage sans faux contact.",
        "baremePoints": 6,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 1 exécutée avec succès selon la consigne technique.",
        "preuves": []
      },
      {
        "taskId": "TASK-INFO-2-2",
        "ordre": 2,
        "titre": "Configurer sur le switch le VLAN 10 (Opérations) et VLAN 20 ...",
        "instructions": "Configurer sur le switch le VLAN 10 (Opérations) et VLAN 20 (Administration) avec étiquetage 802.1Q.",
        "resultatAttendu": "Isolement strict : un client VLAN 10 ne peut pas pinguer le VLAN 20 sans passerelle filtrante.",
        "baremePoints": 8,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 2 exécutée avec succès selon la consigne technique.",
        "preuves": []
      },
      {
        "taskId": "TASK-INFO-2-3",
        "ordre": 3,
        "titre": "Résoudre une panne injectée par le superviseur (port bloqué ...",
        "instructions": "Résoudre une panne injectée par le superviseur (port bloqué en duplex mismatch ou port security).",
        "resultatAttendu": "Rétablissement de la liaison et explication orale concise de la cause.",
        "baremePoints": 6,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 3 exécutée avec succès selon la consigne technique.",
        "preuves": []
      }
    ],
    "ObservationsEleve": "Atelier pratique terminé dans le respect des consignes de sécurité.",
    "DateDebut": "2026-02-10T09:00:00.000Z",
    "DateSoumission": null
  },
  {
    "AssignationId": 3,
    "AtelierId": 4,
    "UtilisateurId": 2,
    "PromotionId": 1,
    "SuperviseurId": 1,
    "SuperviseurNom": "Adjudant-Chef H. Zniber (Chef d'Atelier Flotte)",
    "DateAssignation": "2026-02-15T09:00:00.000Z",
    "DatePrevue": "2026-02-20T10:00:00.000Z",
    "DateRealisation": "2026-02-20T11:45:00.000Z",
    "DateValidation": "2026-02-20T12:00:00.000Z",
    "ValidePar": "Adjudant-Chef H. Zniber",
    "Statut": "VALIDE",
    "EstVerrouille": true,
    "ArretSecurite": false,
    "MotifArretSecurite": null,
    "NotesCriteres": {
      "CRIT-SEC-METH": {
        "note": 5,
        "noteMax": 5,
        "commentaire": "Calage du véhicule, frein de parc engagé, housses de protection posées."
      },
      "CRIT-DIAG-PREC": {
        "note": 5,
        "noteMax": 5,
        "commentaire": "Analyse méthodique des trames de données gelées (Freeze Frame OBD)."
      },
      "CRIT-EXEC-QUAL": {
        "note": 4,
        "noteMax": 5,
        "commentaire": "Contrôle précis au multimètre des alimentations et masses du calculateur."
      },
      "CRIT-TPS-DISC": {
        "note": 4,
        "noteMax": 5,
        "commentaire": "Intervention terminée dans le temps imparti sans précipitation."
      }
    },
    "ScoreObtenu": 18,
    "ScoreTotalMax": 20,
    "ScorePourcentage": 90,
    "Mention": "EXCELLENT",
    "PointsForts": [
      "Grande aisance d'utilisation de la valise diagnostique multimarque",
      "Rapprochement immédiat entre code défaut et composant électromécanique"
    ],
    "AxesAmelioration": [
      "Approfondir les schémas de faisceau multiplexé CAN-Bus"
    ],
    "CompetencesDetectees": [
      "Diagnostic électronique multimarque OBD-II",
      "Contrôle électrique au multimètre sur capteurs moteur",
      "Respect strict des règles de sécurité atelier mécanique"
    ],
    "ObservationsEvaluateur": "L'élève associe ses facilités numériques à une curiosité technique automobile. Très bon profil polyvalent pour la gestion de matériel ou unité motocycliste/intervention rapide.",
    "RecommandationSpecialite": "SPEC-MOTARD",
    "PreuvesAttachees": [
      {
        "id": "PRV-104",
        "nomFichier": "rapport_diagnostic_obd_dtc.pdf",
        "type": "application/pdf",
        "taille": "580 Ko",
        "dateUpload": "2026-02-20T11:50:00.000Z",
        "url": "#"
      }
    ],
    "HistoriqueRevisions": [
      {
        "revisionId": "REV-005",
        "action": "VALIDATION",
        "auteurId": 1,
        "auteurNom": "Adjudant-Chef H. Zniber",
        "dateAction": "2026-02-20T12:00:00.000Z",
        "scoreSnapshot": 18,
        "statutSnapshot": "VALIDE",
        "commentaire": "Validation après vérification contradictoire."
      }
    ],
    "AvancementPourcentage": 100,
    "TachesChecklist": [
      {
        "taskId": "TASK-MECA-1-1",
        "ordre": 1,
        "titre": "Établir la communication avec le calculateur moteur (ECU) et...",
        "instructions": "Établir la communication avec le calculateur moteur (ECU) et relever les codes DTC actifs.",
        "resultatAttendu": "Codes exacts relevés (ex: P0102 Débitmètre, P0300 Ratés d'allumage) avec arrêt sur image.",
        "baremePoints": 6,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 1 exécutée avec succès selon la consigne technique.",
        "preuves": []
      },
      {
        "taskId": "TASK-MECA-1-2",
        "ordre": 2,
        "titre": "Vérifier la tension d'alimentation du capteur incriminé au m...",
        "instructions": "Vérifier la tension d'alimentation du capteur incriminé au multimètre pour distinguer panne capteur ou coupure faisceau.",
        "resultatAttendu": "Mesure exacte de la tension de référence (5V) et identification de la panne réelle.",
        "baremePoints": 8,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 2 exécutée avec succès selon la consigne technique.",
        "preuves": []
      },
      {
        "taskId": "TASK-MECA-1-3",
        "ordre": 3,
        "titre": "Remplacer le composant défaillant, effacer les codes et réal...",
        "instructions": "Remplacer le composant défaillant, effacer les codes et réaliser un essai dynamique sur banc.",
        "resultatAttendu": "Voyant moteur éteint, régulateur opérationnel et absence de code récurrent.",
        "baremePoints": 6,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 3 exécutée avec succès selon la consigne technique.",
        "preuves": []
      }
    ],
    "ObservationsEleve": "Atelier pratique terminé dans le respect des consignes de sécurité.",
    "DateDebut": "2026-02-10T09:00:00.000Z",
    "DateSoumission": null
  },
  {
    "AssignationId": 4,
    "AtelierId": 6,
    "UtilisateurId": 3,
    "PromotionId": 1,
    "SuperviseurId": 1,
    "SuperviseurNom": "Capitaine O. Cherkaoui (Officier Transmissions)",
    "DateAssignation": "2026-02-15T09:00:00.000Z",
    "DatePrevue": "2026-02-22T09:00:00.000Z",
    "DateRealisation": "2026-02-22T10:35:00.000Z",
    "DateValidation": "2026-02-22T11:00:00.000Z",
    "ValidePar": "Capitaine O. Cherkaoui",
    "Statut": "VALIDE",
    "EstVerrouille": true,
    "ArretSecurite": false,
    "MotifArretSecurite": null,
    "NotesCriteres": {
      "CRIT-SEC-METH": {
        "note": 5,
        "noteMax": 5,
        "commentaire": "Charge fictive 50 ohms branchée avant toute émission, sécurité HF exemplaire."
      },
      "CRIT-DIAG-PREC": {
        "note": 5,
        "noteMax": 5,
        "commentaire": "Mesure de TOS et de puissance crête réalisée avec une extrême rigueur."
      },
      "CRIT-EXEC-QUAL": {
        "note": 5,
        "noteMax": 5,
        "commentaire": "Calibrage d'antenne précis (TOS = 1.15), canaux CPS programmés sans faute."
      },
      "CRIT-TPS-DISC": {
        "note": 4,
        "noteMax": 5,
        "commentaire": "Discipline des transmissions respectée à la lettre."
      }
    },
    "ScoreObtenu": 19,
    "ScoreTotalMax": 20,
    "ScorePourcentage": 95,
    "Mention": "EXCELLENT",
    "PointsForts": [
      "Précision absolue des mesures haute fréquence",
      "Respect scrupuleux des protocoles de transmission chiffrée"
    ],
    "AxesAmelioration": [
      "Perfectionner la manipulation rapide des connecteurs coaxiaux de type N/BNC"
    ],
    "CompetencesDetectees": [
      "Calibrage d'antenne VHF/UHF et mesure TOS",
      "Programmation sécurisée CPS de postes radio tactiques",
      "Maîtrise de la chaîne d'émission HF"
    ],
    "ObservationsEvaluateur": "Aptitude pratique exceptionnelle pour les systèmes d'information et de communication (SIC). Rigueur et précision exemplaires.",
    "RecommandationSpecialite": "SPEC-INFO",
    "PreuvesAttachees": [
      {
        "id": "PRV-105",
        "nomFichier": "fiche_mesure_tos_antenne.pdf",
        "type": "application/pdf",
        "taille": "290 Ko",
        "dateUpload": "2026-02-22T10:50:00.000Z",
        "url": "#"
      }
    ],
    "HistoriqueRevisions": [
      {
        "revisionId": "REV-006",
        "action": "VALIDATION",
        "auteurId": 1,
        "auteurNom": "Capitaine O. Cherkaoui",
        "dateAction": "2026-02-22T11:00:00.000Z",
        "scoreSnapshot": 19,
        "statutSnapshot": "VALIDE",
        "commentaire": "Validation officielle transmission tactique."
      }
    ],
    "AvancementPourcentage": 100,
    "TachesChecklist": [
      {
        "taskId": "TASK-TEL-1-1",
        "ordre": 1,
        "titre": "Mesurer la puissance de sortie du poste sur charge fictive e...",
        "instructions": "Mesurer la puissance de sortie du poste sur charge fictive en mode High Power et Low Power.",
        "resultatAttendu": "Mesure exacte conforme aux spécifications (ex: 25W en High, 5W en Low à +/- 5%).",
        "baremePoints": 6,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 1 exécutée avec succès selon la consigne technique.",
        "preuves": []
      },
      {
        "taskId": "TASK-TEL-1-2",
        "ordre": 2,
        "titre": "Mesurer la courbe de résonance de l'antenne quart d'onde ave...",
        "instructions": "Mesurer la courbe de résonance de l'antenne quart d'onde avec l'analyseur d'antenne.",
        "resultatAttendu": "Identification de la fréquence de résonance et ajustement pour obtenir TOS < 1.3 sur le canal d'alerte.",
        "baremePoints": 8,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 2 exécutée avec succès selon la consigne technique.",
        "preuves": []
      },
      {
        "taskId": "TASK-TEL-1-3",
        "ordre": 3,
        "titre": "Injecter le plan de fréquences d'exercice crypté et vérifier...",
        "instructions": "Injecter le plan de fréquences d'exercice crypté et vérifier la communication avec la station fixe.",
        "resultatAttendu": "Liaison bilatérale claire avec accusé de réception automatique (ANI).",
        "baremePoints": 6,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 3 exécutée avec succès selon la consigne technique.",
        "preuves": []
      }
    ],
    "ObservationsEleve": "Atelier pratique terminé dans le respect des consignes de sécurité.",
    "DateDebut": "2026-02-10T09:00:00.000Z",
    "DateSoumission": null
  },
  {
    "AssignationId": 5,
    "AtelierId": 8,
    "UtilisateurId": 4,
    "PromotionId": 1,
    "SuperviseurId": 1,
    "SuperviseurNom": "Capitaine R. Amrani (Officier du Matériel)",
    "DateAssignation": "2026-02-18T09:00:00.000Z",
    "DatePrevue": "2026-02-25T14:00:00.000Z",
    "DateRealisation": "2026-02-25T15:20:00.000Z",
    "DateValidation": "2026-02-25T15:40:00.000Z",
    "ValidePar": "Capitaine R. Amrani",
    "Statut": "VALIDE",
    "EstVerrouille": true,
    "ArretSecurite": false,
    "MotifArretSecurite": null,
    "NotesCriteres": {
      "CRIT-SEC-METH": {
        "note": 5,
        "noteMax": 5,
        "commentaire": "Contrôles visuels de sécurité d'arme systématiques, manipulation sécurisée."
      },
      "CRIT-DIAG-PREC": {
        "note": 5,
        "noteMax": 5,
        "commentaire": "Détection immédiate de l'arme permutée et discordance de numéro de carcasse."
      },
      "CRIT-EXEC-QUAL": {
        "note": 5,
        "noteMax": 5,
        "commentaire": "Registres tenus avec une propreté et une clarté irréprochables."
      },
      "CRIT-TPS-DISC": {
        "note": 4,
        "noteMax": 5,
        "commentaire": "Calme et respect scrupuleux de la hiérarchie du magasin d'armement."
      }
    },
    "ScoreObtenu": 19,
    "ScoreTotalMax": 20,
    "ScorePourcentage": 95,
    "Mention": "EXCELLENT",
    "PointsForts": [
      "Rigueur administrative et souci du détail hors du commun",
      "Zéro faute sur le pointage contradictoire de 25 armes de dotation"
    ],
    "AxesAmelioration": [
      "Gagner en rapidité sur la saisie numérique en base d'inventaire"
    ],
    "CompetencesDetectees": [
      "Comptabilité matières et traçabilité d'armement",
      "Contrôle visuel de sécurité des armes de dotation",
      "Rigueur administrative logistique"
    ],
    "ObservationsEvaluateur": "Sens du détail et intégrité administrative remarquable. Parfait pour les fonctions de soutien logistique, chancellerie ou escadron de marche.",
    "RecommandationSpecialite": "SPEC-SEC-ADMIN",
    "PreuvesAttachees": [
      {
        "id": "PRV-106",
        "nomFichier": "pv_recolement_armement.pdf",
        "type": "application/pdf",
        "taille": "620 Ko",
        "dateUpload": "2026-02-25T15:30:00.000Z",
        "url": "#"
      }
    ],
    "HistoriqueRevisions": [
      {
        "revisionId": "REV-007",
        "action": "VALIDATION",
        "auteurId": 1,
        "auteurNom": "Capitaine R. Amrani",
        "dateAction": "2026-02-25T15:40:00.000Z",
        "scoreSnapshot": 19,
        "statutSnapshot": "VALIDE",
        "commentaire": "Validation pour dossier chancellerie."
      }
    ],
    "AvancementPourcentage": 100,
    "TachesChecklist": [
      {
        "taskId": "TASK-LOG-1-1",
        "ordre": 1,
        "titre": "Réaliser le pointage contradictoire de 25 armes de poing et ...",
        "instructions": "Réaliser le pointage contradictoire de 25 armes de poing et fusils d'assaut d'exercice.",
        "resultatAttendu": "Zéro erreur de numéro de matricule relevé, détection immédiate de l'arme permutée.",
        "baremePoints": 7,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 1 exécutée avec succès selon la consigne technique.",
        "preuves": []
      },
      {
        "taskId": "TASK-LOG-1-2",
        "ordre": 2,
        "titre": "Enregistrer le mouvement de sortie pour mission d'une sectio...",
        "instructions": "Enregistrer le mouvement de sortie pour mission d'une section et éditer les reçus signés.",
        "resultatAttendu": "Fiches de perception correctement horodatées et visées avec inventaire des munitions scellées.",
        "baremePoints": 7,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 2 exécutée avec succès selon la consigne technique.",
        "preuves": []
      },
      {
        "taskId": "TASK-LOG-1-3",
        "ordre": 3,
        "titre": "Formaliser le procès-verbal de récolement mensuel pour le co...",
        "instructions": "Formaliser le procès-verbal de récolement mensuel pour le commandement de compagnie.",
        "resultatAttendu": "PV complet conforme à l'instruction ministérielle sur la comptabilité des matières.",
        "baremePoints": 6,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 3 exécutée avec succès selon la consigne technique.",
        "preuves": []
      }
    ],
    "ObservationsEleve": "Atelier pratique terminé dans le respect des consignes de sécurité.",
    "DateDebut": "2026-02-10T09:00:00.000Z",
    "DateSoumission": null
  },
  {
    "AssignationId": 6,
    "AtelierId": 9,
    "UtilisateurId": 5,
    "PromotionId": 1,
    "SuperviseurId": 1,
    "SuperviseurNom": "Adjudant F. Benjelloun (Adjudant de Casernement)",
    "DateAssignation": "2026-02-18T09:00:00.000Z",
    "DatePrevue": "2026-03-01T10:00:00.000Z",
    "DateRealisation": null,
    "DateValidation": null,
    "ValidePar": null,
    "Statut": "EN_COURS",
    "EstVerrouille": false,
    "ArretSecurite": false,
    "MotifArretSecurite": null,
    "NotesCriteres": {
      "CRIT-SEC-METH": {
        "note": 5,
        "noteMax": 5,
        "commentaire": "Consignation 5 étapes VAT 400V réalisée sous surveillance."
      },
      "CRIT-DIAG-PREC": {
        "note": 4,
        "noteMax": 5,
        "commentaire": "Contrôle des niveaux et tension batterie 24V conforme."
      }
    },
    "ScoreObtenu": 9,
    "ScoreTotalMax": 20,
    "ScorePourcentage": 45,
    "Mention": null,
    "PointsForts": [
      "Bonne maîtrise de la procédure VAT et pose de cadenas de consignation"
    ],
    "AxesAmelioration": [
      "Phase de démarrage et test de basculement d'inverseur à finaliser"
    ],
    "CompetencesDetectees": [
      "Consignation électrique triphasée basse tension",
      "Contrôle préventif groupe électrogène"
    ],
    "ObservationsEvaluateur": "Séance de consignation réalisée avec succès, phase de démarrage groupe électrogène et inverseur programmée en séance 2.",
    "RecommandationSpecialite": null,
    "PreuvesAttachees": [
      {
        "id": "PRV-107",
        "nomFichier": "attestation_consignation_electrique.pdf",
        "type": "application/pdf",
        "taille": "310 Ko",
        "dateUpload": "2026-03-01T10:45:00.000Z",
        "url": "#"
      }
    ],
    "HistoriqueRevisions": [
      {
        "revisionId": "REV-008",
        "action": "BROUILLON",
        "auteurId": 1,
        "auteurNom": "Adjudant F. Benjelloun",
        "dateAction": "2026-03-01T11:00:00.000Z",
        "scoreSnapshot": 9,
        "statutSnapshot": "EN_COURS",
        "commentaire": "Enregistrement du brouillon après la phase 1 de consignation."
      }
    ],
    "AvancementPourcentage": 67,
    "TachesChecklist": [
      {
        "taskId": "TASK-LOG-2-1",
        "ordre": 1,
        "titre": "Exécuter la procédure de consignation complète d'un départ 4...",
        "instructions": "Exécuter la procédure de consignation complète d'un départ 400V avec pose de cadenas et étiquetage.",
        "resultatAttendu": "Consignation validée avec attestation signée et VAT confirmant 0.0V entre toutes les phases et la terre.",
        "baremePoints": 8,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 1 terminée et vérifiée.",
        "preuves": []
      },
      {
        "taskId": "TASK-LOG-2-2",
        "ordre": 2,
        "titre": "Vérifier le groupe électrogène (batterie 24V, préchauffage, ...",
        "instructions": "Vérifier le groupe électrogène (batterie 24V, préchauffage, niveau carburant) et lancer un démarrage manuel.",
        "resultatAttendu": "Démarrage au premier coup de démarreur, stabilisation de fréquence à 50 Hz +/- 1 Hz et tension 400V.",
        "baremePoints": 6,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 2 terminée et vérifiée.",
        "preuves": []
      },
      {
        "taskId": "TASK-LOG-2-3",
        "ordre": 3,
        "titre": "Simuler une coupure secteur et vérifier le basculement sur l...",
        "instructions": "Simuler une coupure secteur et vérifier le basculement sur l'inverseur en moins de 15 secondes.",
        "resultatAttendu": "Basculement réussi, réalimentation des circuits prioritaires de la caserne.",
        "baremePoints": 6,
        "termine": false,
        "dateCompletion": null,
        "observationEleve": "En cours de manipulation...",
        "preuves": []
      }
    ],
    "ObservationsEleve": null,
    "DateDebut": "2026-02-10T09:00:00.000Z",
    "DateSoumission": null
  },
  {
    "AssignationId": 7,
    "AtelierId": 3,
    "UtilisateurId": 2,
    "PromotionId": 1,
    "SuperviseurId": 1,
    "SuperviseurNom": "Adjudant S. Mansouri (Analyste Criminel)",
    "DateAssignation": "2026-02-20T09:00:00.000Z",
    "DatePrevue": "2026-03-05T09:00:00.000Z",
    "DateRealisation": null,
    "DateValidation": null,
    "ValidePar": null,
    "Statut": "NON_COMMENCE",
    "EstVerrouille": false,
    "ArretSecurite": false,
    "MotifArretSecurite": null,
    "NotesCriteres": {},
    "ScoreObtenu": null,
    "ScoreTotalMax": 20,
    "ScorePourcentage": null,
    "Mention": null,
    "PointsForts": [],
    "AxesAmelioration": [],
    "CompetencesDetectees": [],
    "ObservationsEvaluateur": null,
    "RecommandationSpecialite": null,
    "PreuvesAttachees": [],
    "HistoriqueRevisions": [
      {
        "revisionId": "REV-009",
        "action": "CREATION",
        "auteurId": 1,
        "auteurNom": "Commandement",
        "dateAction": "2026-02-20T09:00:00.000Z",
        "scoreSnapshot": null,
        "statutSnapshot": "NON_COMMENCE",
        "commentaire": "Assignation initiale pour la séance de bureautique criminelle."
      }
    ],
    "AvancementPourcentage": 0,
    "TachesChecklist": [
      {
        "taskId": "TASK-INFO-3-1",
        "ordre": 1,
        "titre": "Importer le CSV brut, supprimer les espaces insécables et fo...",
        "instructions": "Importer le CSV brut, supprimer les espaces insécables et formater les numéros au format international.",
        "resultatAttendu": "Tableau propre sans erreurs #VALEUR! ni lignes corrompues.",
        "baremePoints": 5,
        "termine": false,
        "dateCompletion": null,
        "observationEleve": "",
        "preuves": []
      },
      {
        "taskId": "TASK-INFO-3-2",
        "ordre": 2,
        "titre": "Écrire une formule croisant les bornages d'antenne avec les ...",
        "instructions": "Écrire une formule croisant les bornages d'antenne avec les horaires de présence des suspects.",
        "resultatAttendu": "Extraction automatique des 4 concordances suspectes sans intervention manuelle.",
        "baremePoints": 8,
        "termine": false,
        "dateCompletion": null,
        "observationEleve": "",
        "preuves": []
      },
      {
        "taskId": "TASK-INFO-3-3",
        "ordre": 3,
        "titre": "Produire un rapport visuel synthèse imprimable en 1 page ave...",
        "instructions": "Produire un rapport visuel synthèse imprimable en 1 page avec graphique de fréquentation horaire.",
        "resultatAttendu": "Feuille de synthèse prête pour le commandement avec mise en page soignée.",
        "baremePoints": 7,
        "termine": false,
        "dateCompletion": null,
        "observationEleve": "",
        "preuves": []
      }
    ],
    "ObservationsEleve": null,
    "DateDebut": null,
    "DateSoumission": null
  },
  {
    "AssignationId": 8,
    "AtelierId": 7,
    "UtilisateurId": 3,
    "PromotionId": 1,
    "SuperviseurId": 1,
    "SuperviseurNom": "Adjudant-Chef M. El Fassi (Section SIC)",
    "DateAssignation": "2026-02-22T09:00:00.000Z",
    "DatePrevue": "2026-02-28T14:00:00.000Z",
    "DateRealisation": "2026-02-28T15:30:00.000Z",
    "DateValidation": null,
    "ValidePar": null,
    "Statut": "EN_ATTENTE_VALIDATION",
    "EstVerrouille": false,
    "ArretSecurite": false,
    "MotifArretSecurite": null,
    "NotesCriteres": {
      "CRIT-SEC-METH": {
        "note": 5,
        "noteMax": 5,
        "commentaire": "Aspiration des fumées activée, port des lunettes de protection."
      },
      "CRIT-DIAG-PREC": {
        "note": 4,
        "noteMax": 5,
        "commentaire": "Court-circuit localisé sur la diode de protection en 8 minutes."
      },
      "CRIT-EXEC-QUAL": {
        "note": 4,
        "noteMax": 5,
        "commentaire": "Joint de soudure propre et brillant sans pont d'étain."
      },
      "CRIT-TPS-DISC": {
        "note": 4,
        "noteMax": 5,
        "commentaire": "Timing respecté, rangement immédiat du fer thermo-régulé."
      }
    },
    "ScoreObtenu": 17,
    "ScoreTotalMax": 20,
    "ScorePourcentage": 85,
    "Mention": "TRES_BIEN",
    "PointsForts": [
      "Excellente dextérité sous loupe binoculaire",
      "Précision du fer à souder sans surchauffe de pastille"
    ],
    "AxesAmelioration": [
      "Améliorer le nettoyage du flux décapant résiduel"
    ],
    "CompetencesDetectees": [
      "Brasage et dessoudage de composants CMS",
      "Diagnostic au multimètre sur carte d'alimentation"
    ],
    "ObservationsEvaluateur": "Séance réalisée avec brio. Soumis au chef de section pour validation définitive de l'aptitude micro-électronique.",
    "RecommandationSpecialite": "SPEC-INFO",
    "PreuvesAttachees": [
      {
        "id": "PRV-108",
        "nomFichier": "photo_macro_soudure_cms.jpg",
        "type": "image/jpeg",
        "taille": "1.8 Mo",
        "dateUpload": "2026-02-28T15:25:00.000Z",
        "url": "#"
      }
    ],
    "HistoriqueRevisions": [
      {
        "revisionId": "REV-010",
        "action": "SOUMISSION",
        "auteurId": 1,
        "auteurNom": "Adjudant-Chef M. El Fassi",
        "dateAction": "2026-02-28T15:35:00.000Z",
        "scoreSnapshot": 17,
        "statutSnapshot": "EN_ATTENTE_VALIDATION",
        "commentaire": "Soumission pour validation de commandement."
      }
    ],
    "AvancementPourcentage": 100,
    "TachesChecklist": [
      {
        "taskId": "TASK-TEL-2-1",
        "ordre": 1,
        "titre": "Repérer au multimètre la diode de protection ou le condensat...",
        "instructions": "Repérer au multimètre la diode de protection ou le condensateur de filtrage défaillant.",
        "resultatAttendu": "Composant en court-circuit identifié en moins de 10 minutes avec justification.",
        "baremePoints": 6,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 1 exécutée avec succès selon la consigne technique.",
        "preuves": []
      },
      {
        "taskId": "TASK-TEL-2-2",
        "ordre": 2,
        "titre": "Dessouder le composant défaillant et souder le composant de ...",
        "instructions": "Dessouder le composant défaillant et souder le composant de remplacement.",
        "resultatAttendu": "Soudure lisse, brillante, sans pont ni décollement de pastille de cuivre.",
        "baremePoints": 8,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 2 exécutée avec succès selon la consigne technique.",
        "preuves": []
      },
      {
        "taskId": "TASK-TEL-2-3",
        "ordre": 3,
        "titre": "Mettre sous tension et mesurer la régulation de tension en s...",
        "instructions": "Mettre sous tension et mesurer la régulation de tension en sortie.",
        "resultatAttendu": "Tensions stabilisées conformes à +/- 2% des valeurs nominales.",
        "baremePoints": 6,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 3 exécutée avec succès selon la consigne technique.",
        "preuves": []
      }
    ],
    "ObservationsEleve": null,
    "DateDebut": "2026-02-10T09:00:00.000Z",
    "DateSoumission": "2026-02-28T15:30:00.000Z"
  },
  {
    "AssignationId": 9,
    "AtelierId": 5,
    "UtilisateurId": 4,
    "PromotionId": 1,
    "SuperviseurId": 1,
    "SuperviseurNom": "Adjudant-Chef H. Zniber (Chef d'Atelier Flotte)",
    "DateAssignation": "2026-02-20T09:00:00.000Z",
    "DatePrevue": "2026-02-27T10:00:00.000Z",
    "DateRealisation": "2026-02-27T10:45:00.000Z",
    "DateValidation": "2026-02-27T11:00:00.000Z",
    "ValidePar": "Adjudant-Chef H. Zniber",
    "Statut": "REJETE",
    "EstVerrouille": true,
    "ArretSecurite": true,
    "MotifArretSecurite": "Tentative d'ouverture du bouchon de vase d'expansion sous pression à moteur chaud sans chiffon ni EPI de protection thermique.",
    "NotesCriteres": {
      "CRIT-SEC-METH": {
        "note": 0,
        "noteMax": 5,
        "commentaire": "Arrêt d'urgence pour comportement dangereux (risque de brûlure grave au liquide de refroidissement bouillant)."
      },
      "CRIT-DIAG-PREC": {
        "note": 2,
        "noteMax": 5,
        "commentaire": "Diagnostic de fuite radiateur approximatif avant arrêt de sécurité."
      },
      "CRIT-EXEC-QUAL": {
        "note": 2,
        "noteMax": 5,
        "commentaire": "Procédure interrompue avant phase de purge sous pression."
      },
      "CRIT-TPS-DISC": {
        "note": 3,
        "noteMax": 5,
        "commentaire": "Discipline correcte mais précipitation injustifiée."
      }
    },
    "ScoreObtenu": 7,
    "ScoreTotalMax": 20,
    "ScorePourcentage": 35,
    "Mention": "REJETE",
    "PointsForts": [
      "Motivation et écoute après le débriefing de sécurité"
    ],
    "AxesAmelioration": [
      "Assimiler impérativement les règles de sécurité thermique et port systématique des gants et écran facial",
      "Ne jamais privilégier la vitesse d'exécution au détriment de la sécurité vitale"
    ],
    "CompetencesDetectees": [],
    "ObservationsEvaluateur": "Séance interrompue en application stricte du protocole de sécurité militaire. L'élève a été convoqué pour une séance de rappel des consignes de sécurité atelier avant réévaluation.",
    "RecommandationSpecialite": null,
    "PreuvesAttachees": [
      {
        "id": "PRV-109",
        "nomFichier": "fiche_incident_securite_thermique.pdf",
        "type": "application/pdf",
        "taille": "195 Ko",
        "dateUpload": "2026-02-27T10:55:00.000Z",
        "url": "#"
      }
    ],
    "HistoriqueRevisions": [
      {
        "revisionId": "REV-011",
        "action": "REJET",
        "auteurId": 1,
        "auteurNom": "Adjudant-Chef H. Zniber",
        "dateAction": "2026-02-27T11:00:00.000Z",
        "scoreSnapshot": 7,
        "statutSnapshot": "REJETE",
        "commentaire": "Interruption immédiate de l'atelier pour manquement critique à la sécurité thermique."
      }
    ],
    "AvancementPourcentage": 33,
    "TachesChecklist": [
      {
        "taskId": "TASK-MECA-2-1",
        "ordre": 1,
        "titre": "Vérifier l'étanchéité du circuit de refroidissement à 1.5 ba...",
        "instructions": "Vérifier l'étanchéité du circuit de refroidissement à 1.5 bar pendant 10 minutes.",
        "resultatAttendu": "Maintien rigoureux de la pression sans chute de l'aiguille.",
        "baremePoints": 6,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Phase préliminaire réalisée.",
        "preuves": []
      },
      {
        "taskId": "TASK-MECA-2-2",
        "ordre": 2,
        "titre": "Mettre en place les piges de calage moteur et vérifier l'ali...",
        "instructions": "Mettre en place les piges de calage moteur et vérifier l'alignement des repères.",
        "resultatAttendu": "Piges engagées à fond sans forcer, rotation manuelle du moteur sur 2 tours sans blocage.",
        "baremePoints": 8,
        "termine": false,
        "dateCompletion": null,
        "observationEleve": "Interrompu pour réévaluation.",
        "preuves": []
      },
      {
        "taskId": "TASK-MECA-2-3",
        "ordre": 3,
        "titre": "Remplir le circuit par dépression et vérifier le déclencheme...",
        "instructions": "Remplir le circuit par dépression et vérifier le déclenchement du motoventilateur.",
        "resultatAttendu": "Enclenchement du ventilateur à 92°C, chauffage habitacle fonctionnel, niveau stable.",
        "baremePoints": 6,
        "termine": false,
        "dateCompletion": null,
        "observationEleve": "Interrompu pour réévaluation.",
        "preuves": []
      }
    ],
    "ObservationsEleve": null,
    "DateDebut": "2026-02-10T09:00:00.000Z",
    "DateSoumission": null
  },
  {
    "AssignationId": 10,
    "AtelierId": 6,
    "UtilisateurId": 2,
    "PromotionId": 1,
    "SuperviseurId": 6,
    "SuperviseurNom": "Adjudant-Chef M. El Fassi (Section SIC)",
    "DateAssignation": "2026-02-22T09:00:00.000Z",
    "DatePrevue": "2026-02-28T14:00:00.000Z",
    "DateRealisation": "2026-02-28T16:00:00.000Z",
    "DateValidation": null,
    "ValidePar": null,
    "Statut": "EN_ATTENTE_VALIDATION",
    "EstVerrouille": false,
    "ArretSecurite": false,
    "MotifArretSecurite": null,
    "AvancementPourcentage": 100,
    "TachesChecklist": [
      {
        "taskId": "TASK-TEL-1-1",
        "ordre": 1,
        "titre": "Mesurer la puissance de sortie du poste sur charge fictive e...",
        "instructions": "Mesurer la puissance de sortie du poste sur charge fictive en mode High Power et Low Power.",
        "resultatAttendu": "Mesure exacte conforme aux spécifications (ex: 25W en High, 5W en Low à +/- 5%).",
        "baremePoints": 6,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 1 exécutée avec succès selon la consigne technique.",
        "preuves": []
      },
      {
        "taskId": "TASK-TEL-1-2",
        "ordre": 2,
        "titre": "Mesurer la courbe de résonance de l'antenne quart d'onde ave...",
        "instructions": "Mesurer la courbe de résonance de l'antenne quart d'onde avec l'analyseur d'antenne.",
        "resultatAttendu": "Identification de la fréquence de résonance et ajustement pour obtenir TOS < 1.3 sur le canal d'alerte.",
        "baremePoints": 8,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 2 exécutée avec succès selon la consigne technique.",
        "preuves": []
      },
      {
        "taskId": "TASK-TEL-1-3",
        "ordre": 3,
        "titre": "Injecter le plan de fréquences d'exercice crypté et vérifier...",
        "instructions": "Injecter le plan de fréquences d'exercice crypté et vérifier la communication avec la station fixe.",
        "resultatAttendu": "Liaison bilatérale claire avec accusé de réception automatique (ANI).",
        "baremePoints": 6,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 3 exécutée avec succès selon la consigne technique.",
        "preuves": []
      }
    ],
    "ObservationsEleve": "Calibrage TOS effectué à 1.2:1 sur antenne fouet de patrouille. Fréquences tactiques programmées en mémoire 1 à 8. Soumis pour visa instructeur.",
    "DateDebut": "2026-02-28T14:15:00.000Z",
    "DateSoumission": "2026-02-28T16:10:00.000Z",
    "NotesCriteres": {},
    "ScoreObtenu": null,
    "ScoreTotalMax": 20,
    "ScorePourcentage": null,
    "Mention": null,
    "PointsForts": [],
    "AxesAmelioration": [],
    "CompetencesDetectees": [],
    "ObservationsEvaluateur": null,
    "RecommandationSpecialite": null,
    "PreuvesAttachees": [
      {
        "id": "PRV-201",
        "nomFichier": "rapport_tos_wattmetre.pdf",
        "type": "application/pdf",
        "taille": "340 Ko",
        "dateUpload": "2026-02-28T16:05:00.000Z",
        "url": "#"
      }
    ],
    "HistoriqueRevisions": [
      {
        "revisionId": "REV-020",
        "action": "CREATION",
        "auteurId": 6,
        "auteurNom": "Adjudant-Chef M. El Fassi",
        "dateAction": "2026-02-22T09:00:00.000Z",
        "scoreSnapshot": null,
        "statutSnapshot": "NON_COMMENCE",
        "commentaire": "Assignation de l'atelier radio VHF/UHF."
      },
      {
        "revisionId": "REV-021",
        "action": "SOUMISSION_ELEVE",
        "auteurId": 2,
        "auteurNom": "Julien Moreau",
        "dateAction": "2026-02-28T16:10:00.000Z",
        "scoreSnapshot": null,
        "statutSnapshot": "EN_ATTENTE_VALIDATION",
        "commentaire": "Travaux pratiques terminés et soumis pour évaluation de supervision."
      }
    ]
  },
  {
    "AssignationId": 11,
    "AtelierId": 7,
    "UtilisateurId": 2,
    "PromotionId": 1,
    "SuperviseurId": 6,
    "SuperviseurNom": "Adjudant-Chef M. El Fassi (Section SIC)",
    "DateAssignation": "2026-03-01T09:00:00.000Z",
    "DatePrevue": "2026-03-05T10:00:00.000Z",
    "DateRealisation": null,
    "DateValidation": null,
    "ValidePar": null,
    "Statut": "EN_COURS",
    "EstVerrouille": false,
    "ArretSecurite": false,
    "MotifArretSecurite": null,
    "AvancementPourcentage": 67,
    "TachesChecklist": [
      {
        "taskId": "TASK-TEL-2-1",
        "ordre": 1,
        "titre": "Repérer au multimètre la diode de protection ou le condensat...",
        "instructions": "Repérer au multimètre la diode de protection ou le condensateur de filtrage défaillant.",
        "resultatAttendu": "Composant en court-circuit identifié en moins de 10 minutes avec justification.",
        "baremePoints": 6,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 1 terminée et vérifiée.",
        "preuves": []
      },
      {
        "taskId": "TASK-TEL-2-2",
        "ordre": 2,
        "titre": "Dessouder le composant défaillant et souder le composant de ...",
        "instructions": "Dessouder le composant défaillant et souder le composant de remplacement.",
        "resultatAttendu": "Soudure lisse, brillante, sans pont ni décollement de pastille de cuivre.",
        "baremePoints": 8,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Tâche 2 terminée et vérifiée.",
        "preuves": []
      },
      {
        "taskId": "TASK-TEL-2-3",
        "ordre": 3,
        "titre": "Mettre sous tension et mesurer la régulation de tension en s...",
        "instructions": "Mettre sous tension et mesurer la régulation de tension en sortie.",
        "resultatAttendu": "Tensions stabilisées conformes à +/- 2% des valeurs nominales.",
        "baremePoints": 6,
        "termine": false,
        "dateCompletion": null,
        "observationEleve": "En cours de manipulation...",
        "preuves": []
      }
    ],
    "ObservationsEleve": "Court-circuit localisé sur la diode de protection D12. Dessoudage à l'air chaud réalisé à 320°C sans dommage pour la piste. En attente du composant neuf pour ressoudage.",
    "DateDebut": "2026-03-02T10:00:00.000Z",
    "DateSoumission": null,
    "NotesCriteres": {},
    "ScoreObtenu": null,
    "ScoreTotalMax": 20,
    "ScorePourcentage": null,
    "Mention": null,
    "PointsForts": [],
    "AxesAmelioration": [],
    "CompetencesDetectees": [],
    "ObservationsEvaluateur": null,
    "RecommandationSpecialite": null,
    "PreuvesAttachees": [],
    "HistoriqueRevisions": [
      {
        "revisionId": "REV-022",
        "action": "CREATION",
        "auteurId": 6,
        "auteurNom": "Adjudant-Chef M. El Fassi",
        "dateAction": "2026-03-01T09:00:00.000Z",
        "scoreSnapshot": null,
        "statutSnapshot": "NON_COMMENCE",
        "commentaire": "Assignation de l'atelier soudure CMS."
      },
      {
        "revisionId": "REV-023",
        "action": "DEMARRAGE_ELEVE",
        "auteurId": 2,
        "auteurNom": "Julien Moreau",
        "dateAction": "2026-03-02T10:00:00.000Z",
        "scoreSnapshot": null,
        "statutSnapshot": "EN_COURS",
        "commentaire": "Prise de poste et démarrage de la manipulation."
      }
    ]
  },
  {
    "AssignationId": 12,
    "AtelierId": 5,
    "UtilisateurId": 2,
    "PromotionId": 1,
    "SuperviseurId": 1,
    "SuperviseurNom": "Adjudant-Chef H. Zniber (Chef d'Atelier Flotte)",
    "DateAssignation": "2026-02-18T09:00:00.000Z",
    "DatePrevue": "2026-02-25T14:00:00.000Z",
    "DateRealisation": "2026-02-25T15:30:00.000Z",
    "DateValidation": null,
    "ValidePar": null,
    "Statut": "A_REEVALUER",
    "EstVerrouille": false,
    "ArretSecurite": false,
    "MotifReevaluation": "La procédure de purge a été exécutée de manière incomplète (poche d'air résiduelle dans le radiateur de chauffage). Séance de perfectionnement obligatoire avant nouvelle validation.",
    "AvancementPourcentage": 33,
    "TachesChecklist": [
      {
        "taskId": "TASK-MECA-2-1",
        "ordre": 1,
        "titre": "Vérifier l'étanchéité du circuit de refroidissement à 1.5 ba...",
        "instructions": "Vérifier l'étanchéité du circuit de refroidissement à 1.5 bar pendant 10 minutes.",
        "resultatAttendu": "Maintien rigoureux de la pression sans chute de l'aiguille.",
        "baremePoints": 6,
        "termine": true,
        "dateCompletion": "2026-02-15T10:30:00.000Z",
        "observationEleve": "Phase préliminaire réalisée.",
        "preuves": []
      },
      {
        "taskId": "TASK-MECA-2-2",
        "ordre": 2,
        "titre": "Mettre en place les piges de calage moteur et vérifier l'ali...",
        "instructions": "Mettre en place les piges de calage moteur et vérifier l'alignement des repères.",
        "resultatAttendu": "Piges engagées à fond sans forcer, rotation manuelle du moteur sur 2 tours sans blocage.",
        "baremePoints": 8,
        "termine": false,
        "dateCompletion": null,
        "observationEleve": "Interrompu pour réévaluation.",
        "preuves": []
      },
      {
        "taskId": "TASK-MECA-2-3",
        "ordre": 3,
        "titre": "Remplir le circuit par dépression et vérifier le déclencheme...",
        "instructions": "Remplir le circuit par dépression et vérifier le déclenchement du motoventilateur.",
        "resultatAttendu": "Enclenchement du ventilateur à 92°C, chauffage habitacle fonctionnel, niveau stable.",
        "baremePoints": 6,
        "termine": false,
        "dateCompletion": null,
        "observationEleve": "Interrompu pour réévaluation.",
        "preuves": []
      }
    ],
    "ObservationsEleve": "Mise sous pression effectuée (1.2 bar). Fuite au collier de durite inférieure resserrée. Purge à reprendre avec l'instructeur.",
    "DateDebut": "2026-02-25T14:00:00.000Z",
    "DateSoumission": null,
    "NotesCriteres": {
      "CRIT-SEC-METH": {
        "note": 3.5,
        "noteMax": 5,
        "commentaire": "EPI portés mais précipitation sur la purge"
      },
      "CRIT-DIAG-PREC": {
        "note": 3,
        "noteMax": 5,
        "commentaire": "Fuite trouvée mais contrôle thermique partiel"
      },
      "CRIT-EXEC-QUAL": {
        "note": 2.5,
        "noteMax": 5,
        "commentaire": "Purge incomplète"
      },
      "CRIT-TPS-DISC": {
        "note": 4,
        "noteMax": 5,
        "commentaire": "Bonne discipline"
      }
    },
    "ScoreObtenu": 13,
    "ScoreTotalMax": 20,
    "ScorePourcentage": 65,
    "Mention": "A_REEVALUER",
    "PointsForts": [
      "Bon respect des consignes de calage"
    ],
    "AxesAmelioration": [
      "Prendre le temps d'attendre deux cycles complets de moto-ventilateur lors de la purge"
    ],
    "CompetencesDetectees": [],
    "ObservationsEvaluateur": "Séance à réévaluer après exercice complémentaire de purge du circuit.",
    "RecommandationSpecialite": null,
    "PreuvesAttachees": [],
    "HistoriqueRevisions": [
      {
        "revisionId": "REV-024",
        "action": "REEVALUATION_DEMANDEE",
        "auteurId": 1,
        "auteurNom": "Adjudant-Chef H. Zniber",
        "dateAction": "2026-02-25T16:00:00.000Z",
        "scoreSnapshot": 13,
        "statutSnapshot": "A_REEVALUER",
        "commentaire": "Demande de réévaluation formulée par l'instructeur suite à purge incomplète."
      }
    ]
  },
  {
    AssignationId: 13,
    AtelierId: 10,
    UtilisateurId: 2,
    PromotionId: 1,
    SuperviseurId: 1,
    SuperviseurNom: 'Adjudant-Chef M. El Fassi',
    DateAssignation: '2026-02-12T09:00:00.000Z',
    DatePrevue: '2026-02-18T09:00:00.000Z',
    Statut: 'NON_COMMENCE',
    EstVerrouille: false,
    ArretSecurite: false,
    ScoreObtenu: null,
    ScoreTotalMax: 20,
    ScorePourcentage: null,
    AvancementPourcentage: 0,
    TachesChecklist: [
      {
        taskId: 'TASK-MECA-3-1',
        ordre: 1,
        titre: 'Identifier et classifier les codes défauts DTC relevés sur le rapport',
        instructions: 'Analyser les codes défauts P0300 et P0171 sur le rapport. Noter leur gravité et les organes moteur impactés.',
        resultatAttendu: 'Codes P0300 et P0171 classifiés avec distinction gravité.',
        baremePoints: 6,
        termine: false,
        observationEleve: '',
        preuves: []
      },
      {
        taskId: 'TASK-MECA-3-2',
        ordre: 2,
        titre: 'Comparer les valeurs des capteurs aux plages de référence constructeur',
        instructions: 'Vérifier la tension de la sonde lambda et la masse d\'air du débitmètre par rapport aux normes constructeur.',
        resultatAttendu: 'Anomalie du débitmètre d\'air identifiée sans ambiguïté.',
        baremePoints: 8,
        termine: false,
        observationEleve: '',
        preuves: []
      },
      {
        taskId: 'TASK-MECA-3-3',
        ordre: 3,
        titre: 'Rédiger la proposition d\'intervention pour le chef d\'atelier',
        instructions: 'Compléter la fiche d\'atelier avec la recommandation technique pour le chef d\'atelier mécanique.',
        resultatAttendu: 'Fiche d\'intervention claire préconisant le nettoyage/remplacement du capteur.',
        baremePoints: 6,
        termine: false,
        observationEleve: '',
        preuves: []
      }
    ],
    PreuvesAttachees: [],
    HistoriqueRevisions: []
  },
  {
    AssignationId: 14,
    AtelierId: 11,
    UtilisateurId: 2,
    PromotionId: 1,
    SuperviseurId: 1,
    SuperviseurNom: 'Adjudant-Chef M. El Fassi',
    DateAssignation: '2026-02-12T09:00:00.000Z',
    DatePrevue: '2026-02-19T09:00:00.000Z',
    Statut: 'NON_COMMENCE',
    EstVerrouille: false,
    ArretSecurite: false,
    ScoreObtenu: null,
    ScoreTotalMax: 20,
    ScorePourcentage: null,
    AvancementPourcentage: 0,
    TachesChecklist: [
      {
        taskId: 'TASK-TEL-3-1',
        ordre: 1,
        titre: 'Démontage ordonné et sécurisé du boîtier de protection',
        instructions: 'Retirer les vis de fixation en respectant l\'ordre préconisé et ranger les éléments sur le tapis magnétique.',
        resultatAttendu: 'Boîtier ouvert proprement sans endommager les joints d\'étanchéité.',
        baremePoints: 6,
        termine: false,
        observationEleve: '',
        preuves: []
      },
      {
        taskId: 'TASK-TEL-3-2',
        ordre: 2,
        titre: 'Identifier et nommer les 4 blocs fonctionnels internes',
        instructions: 'Repérer le bloc d\'alimentation, le module émetteur-récepteur radio, la carte de traitement numérique et l\'étage amplificateur.',
        resultatAttendu: 'Chaque module identifié et étiqueté correctement sur la fiche de repérage.',
        baremePoints: 8,
        termine: false,
        observationEleve: '',
        preuves: []
      },
      {
        taskId: 'TASK-TEL-3-3',
        ordre: 3,
        titre: 'Inspecter les composants et connecteurs pour déceler les anomalies',
        instructions: 'Examiner à la loupe les connecteurs internes, soudures et traces d\'oxydation ou de surchauffe.',
        resultatAttendu: 'Absence d\'anomalie ou signalement d\'un connecteur oxydé consigné.',
        baremePoints: 6,
        termine: false,
        observationEleve: '',
        preuves: []
      }
    ],
    PreuvesAttachees: [],
    HistoriqueRevisions: []
  },
  {
    AssignationId: 15,
    AtelierId: 12,
    UtilisateurId: 2,
    PromotionId: 1,
    SuperviseurId: 1,
    SuperviseurNom: 'Adjudant-Chef M. El Fassi',
    DateAssignation: '2026-02-12T09:00:00.000Z',
    DatePrevue: '2026-02-20T09:00:00.000Z',
    Statut: 'NON_COMMENCE',
    EstVerrouille: false,
    ArretSecurite: false,
    ScoreObtenu: null,
    ScoreTotalMax: 20,
    ScorePourcentage: null,
    AvancementPourcentage: 0,
    TachesChecklist: [
      {
        taskId: 'TASK-LOG-3-1',
        ordre: 1,
        titre: 'Effectuer le comptage physique contradictoire des casiers assignés',
        instructions: 'Compter méthodiquement les équipements présents en rayon et confronter les numéros de série aux étiquettes.',
        resultatAttendu: 'Comptage physique précis réalisé sur les casiers A et B.',
        baremePoints: 6,
        termine: false,
        observationEleve: '',
        preuves: []
      },
      {
        taskId: 'TASK-LOG-3-2',
        ordre: 2,
        titre: 'Identifier et documenter les écarts entre stock réel et théorique',
        instructions: 'Mettre en évidence les écarts constatés (ex: une référence inversée entre deux modèles de jumelles).',
        resultatAttendu: 'Erreur d\'étiquetage et inversion de référence repérées.',
        baremePoints: 8,
        termine: false,
        observationEleve: '',
        preuves: []
      },
      {
        taskId: 'TASK-LOG-3-3',
        ordre: 3,
        titre: 'Établir la fiche officielle de régularisation d\'inventaire',
        instructions: 'Rédiger le procès-verbal de constat d\'écart avec visa pour signature du chef de corps.',
        resultatAttendu: 'PV de régularisation rédigé et prêt pour signature du commandement.',
        baremePoints: 6,
        termine: false,
        observationEleve: '',
        preuves: []
      }
    ],
    PreuvesAttachees: [],
    HistoriqueRevisions: []
  }
];