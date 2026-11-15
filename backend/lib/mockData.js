// ==============================================================================
// ORIENT-GR - Données de référence et de simulation (Mock Data Store)
// Conforme au schéma relationnel SQL Server de la Gendarmerie Nationale
// ==============================================================================

import { arabicQuestionBank140 } from './arabicQuestionBank140.js';

export const initialPromotions = [
  {
    PromotionId: 1,
    Code: 'PROM-2025-54',
    Nom: "54ème Promotion - Chef d'Escadron Guy de Marliave",
    Ecole: 'École de Gendarmerie de Rochefort',
    DateDebut: '2024-09-01',
    DateFin: '2026-06-30',
    Statut: 'ACTIVE',
    EffectifTotal: 120,
    Description: "Promotion en cours de validation finale et de choix d'orientation opérationnelle."
  },
  {
    PromotionId: 2,
    Code: 'PROM-2025-55',
    Nom: "55ème Promotion - Maréchal des Logis-Chef Léopold Bel",
    Ecole: 'École de Gendarmerie de Chaumont',
    DateDebut: '2025-01-15',
    DateFin: '2026-12-15',
    Statut: 'PREPARATION',
    EffectifTotal: 115,
    Description: "Promotion en cours de formation initiale générale."
  },
  {
    PromotionId: 3,
    Code: 'PROM-2024-53',
    Nom: "53ème Promotion - Colonel Arnaud Beltrame",
    Ecole: 'École de Gendarmerie de Montluçon',
    DateDebut: '2023-09-01',
    DateFin: '2025-06-25',
    Statut: 'CLOTUREE',
    EffectifTotal: 130,
    Description: "Promotion affectée en unités de gendarmerie départementale et mobile."
  }
];

export const initialDomaines = [
  {
    DomaineId: 1,
    Code: 'LOGIQUE',
    Intitule: 'الاستدلال المنطقي',
    Description: 'Capacité d\'analyse abstraite, déduction d\'hypothèses et logique déductive.',
    PoidsDefaut: 1.2
  },
  {
    DomaineId: 2,
    Code: 'OBSERVATION',
    Intitule: 'التحليل والملاحظة',
    Description: 'Détection d\'anomalies furtives, lecture de scènes et vigilance opérationnelle.',
    PoidsDefaut: 1.1
  },
  {
    DomaineId: 3,
    Code: 'ATTENTION',
    Intitule: 'التركيز والانتباه',
    Description: 'Maintien de la vigilance continue, écoute active et résistance aux distractions.',
    PoidsDefaut: 1.0
  },
  {
    DomaineId: 4,
    Code: 'DECISION',
    Intitule: 'حل المشكلات واتخاذ القرار',
    Description: 'Évaluation des priorités d\'intervention, gestion de crise et discernement.',
    PoidsDefaut: 1.3
  },
  {
    DomaineId: 5,
    Code: 'ROUTE_MOTO',
    Intitule: 'السلامة الطرقية وقيادة الدراجات',
    Description: 'Sécurité des mobilités, pilotage moto tactique et maîtrise de la route.',
    PoidsDefaut: 1.2
  },
  {
    DomaineId: 6,
    Code: 'PJ_ENQUETE',
    Intitule: 'الشرطة القضائية والتحري',
    Description: 'Constatations criminelles, chaîne de scellés et rigueur de procédure pénale.',
    PoidsDefaut: 1.4
  },
  {
    DomaineId: 7,
    Code: 'INFORMATIQUE',
    Intitule: 'المعلوماتية والمهارات الرقمية',
    Description: 'Sécurité des systèmes, cybercriminalité, réseaux et hygiène numérique.',
    PoidsDefaut: 1.1
  },
  {
    DomaineId: 8,
    Code: 'COMMUNICATION',
    Intitule: 'التواصل والتكوين',
    Description: 'Pédagogie d\'instruction, accueil des victimes, débriefing et communication de crise.',
    PoidsDefaut: 1.0
  },
  {
    DomaineId: 9,
    Code: 'SECRETARIAT',
    Intitule: 'الإدارة والسكرتارية',
    Description: 'Rédaction administrative militaire, gestion du courrier et tenue des archives.',
    PoidsDefaut: 1.0
  },
  {
    DomaineId: 10,
    Code: 'DISCIPLINE',
    Intitule: 'المواقف المهنية والانضباط',
    Description: 'Déontologie militaire, obéissance légale, intégrité et fidélité aux valeurs.',
    PoidsDefaut: 1.3
  }
];

export const initialSpecialites = [
  {
    SpecialiteId: 1,
    Code: 'SPEC-ROUTE',
    Intitule: 'Police de la Route (Sécurité des Mobilités)',
    Subdivision: 'Sécurité des Mobilités',
    Description: "Unités départementales et autoroutières chargées du contrôle des flux, de la prévention routière et de la répression des infractions graves.",
    MissionsPrincipales: "Contrôles coordonnés d'alcoolémie/stupéfiants, gestion d'accidents, régulation des axes stratégiques.",
    Icone: 'Gauge',
    PlacesDisponibles: 18,
    EstActive: true,
    CompetencesAttendues: [
      { name: "Vigilance routière", niveau: 4 },
      { name: "Code de la Route", niveau: 4 },
      { name: "Maîtrise de la conduite", niveau: 4 },
      { name: "Gestion du stress en contrôle", niveau: 3 }
    ],
    TestsAssocies: ['TEST-ATTENTION', 'TEST-SITUATION', 'TEST-ORIENT-2026'],
    MatieresAcademiquesPertinentes: [
      { matiere: "Conduite", coef: 2.0 },
      { matiere: "ProcedurePenale", coef: 1.5 },
      { matiere: "Sport", coef: 1.0 }
    ],
    PoidsNotesAcademiques: 0.25,
    PoidsRaisonnement: 0.25,
    PoidsCompetencesSpecifiques: 0.25,
    PoidsSituationsPro: 0.25
  },
  {
    SpecialiteId: 2,
    Code: 'SPEC-PJ',
    Intitule: 'Police Judiciaire (Enquêtes & Criminalistique)',
    Subdivision: 'Gendarmerie Départementale',
    Description: "Unités de recherche (BR, SR) dédiées aux enquêtes judiciaires complexes, flagrants délits, auditions et actes de procédure pénale.",
    MissionsPrincipales: "Investigations criminelles, filatures, constatations scientifiques, réquisitions judiciaires.",
    Icone: 'Search',
    PlacesDisponibles: 25,
    EstActive: true,
    CompetencesAttendues: [
      { name: "Analyse déductive", niveau: 5 },
      { name: "Rigueur procédurale pénale", niveau: 5 },
      { name: "Qualité rédactionnelle", niveau: 4 },
      { name: "Persévérance investigative", niveau: 4 }
    ],
    TestsAssocies: ['TEST-LOGIQUE', 'TEST-PROBLEMES', 'TEST-SITUATION', 'TEST-ORIENT-2026'],
    MatieresAcademiquesPertinentes: [
      { matiere: "DroitPenal", coef: 2.5 },
      { matiere: "ProcedurePenale", coef: 2.5 },
      { matiere: "ExpressionFr", coef: 1.5 }
    ],
    PoidsNotesAcademiques: 0.30,
    PoidsRaisonnement: 0.30,
    PoidsCompetencesSpecifiques: 0.20,
    PoidsSituationsPro: 0.20
  },
  {
    SpecialiteId: 3,
    Code: 'SPEC-INFO',
    Intitule: 'Informatique & Cybercriminalité',
    Subdivision: 'Appui Opérationnel & Numérique',
    Description: "Gestion des infrastructures numériques, cybersécurité, assistance technique et lutte contre les cyberattaques (ComCyberGend).",
    MissionsPrincipales: "Administration des réseaux tactiques, forensic numérique, sécurisation des flux de données et veille OSINT.",
    Icone: 'Terminal',
    PlacesDisponibles: 12,
    EstActive: true,
    CompetencesAttendues: [
      { name: "Architecture réseau", niveau: 4 },
      { name: "Sécurité des SI", niveau: 4 },
      { name: "Esprit algorithmique", niveau: 5 },
      { name: "Dépannage sous pression", niveau: 3 }
    ],
    TestsAssocies: ['TEST-INFORMATIQUE', 'TEST-LOGIQUE', 'TEST-ORIENT-2026'],
    MatieresAcademiquesPertinentes: [
      { matiere: "Informatique", coef: 3.0 },
      { matiere: "Mathematiques", coef: 2.0 }
    ],
    PoidsNotesAcademiques: 0.20,
    PoidsRaisonnement: 0.35,
    PoidsCompetencesSpecifiques: 0.35,
    PoidsSituationsPro: 0.10
  },
  {
    SpecialiteId: 4,
    Code: 'SPEC-SEC-INFO',
    Intitule: 'Secrétariat Informatique',
    Subdivision: 'Soutien Opérationnel',
    Description: "Gestion des outils bureautiques spécialisés, suivi des logiciels métiers de la gendarmerie et assistance technique aux unités.",
    MissionsPrincipales: "Gestion des accès logiciels, tenue des bases de données d'unités, traitement sécurisé des flux administratifs.",
    Icone: 'FileText',
    PlacesDisponibles: 14,
    EstActive: true,
    CompetencesAttendues: [
      { name: "Bureautique avancée", niveau: 4 },
      { name: "Assistance utilisateur", niveau: 3 },
      { name: "Rigueur organisationnelle", niveau: 4 },
      { name: "Confidentialité", niveau: 5 }
    ],
    TestsAssocies: ['TEST-INFORMATIQUE', 'TEST-COMMUNICATION', 'TEST-ORIENT-2026'],
    MatieresAcademiquesPertinentes: [
      { matiere: "Informatique", coef: 2.5 },
      { matiere: "ExpressionFr", coef: 2.0 }
    ],
    PoidsNotesAcademiques: 0.30,
    PoidsRaisonnement: 0.20,
    PoidsCompetencesSpecifiques: 0.30,
    PoidsSituationsPro: 0.20
  },
  {
    SpecialiteId: 5,
    Code: 'SPEC-SEC-ADMIN',
    Intitule: 'Secrétariat Administratif',
    Subdivision: 'Administration & Ressources Humaines',
    Description: "Gestion des dossiers de personnel, correspondance officielle du commandement, chancellerie et archives de la formation.",
    MissionsPrincipales: "Rédaction d'ordres de service, gestion logistique, coordination des plannings et correspondance préfectorale.",
    Icone: 'Briefcase',
    PlacesDisponibles: 15,
    EstActive: true,
    CompetencesAttendues: [
      { name: "Excellence rédactionnelle", niveau: 5 },
      { name: "Organisation méthodique", niveau: 4 },
      { name: "Déontologie administrative", niveau: 4 },
      { name: "Sens du service", niveau: 4 }
    ],
    TestsAssocies: ['TEST-COMMUNICATION', 'TEST-PROBLEMES', 'TEST-ORIENT-2026'],
    MatieresAcademiquesPertinentes: [
      { matiere: "ExpressionFr", coef: 3.0 },
      { matiere: "ProcedurePenale", coef: 1.5 }
    ],
    PoidsNotesAcademiques: 0.35,
    PoidsRaisonnement: 0.15,
    PoidsCompetencesSpecifiques: 0.25,
    PoidsSituationsPro: 0.25
  },
  {
    SpecialiteId: 6,
    Code: 'SPEC-INSTRUCTEUR',
    Intitule: "Instructeur d'École de Gendarmerie",
    Subdivision: 'Formation Initiale & Continue',
    Description: "Transmission des savoirs théoriques, déontologiques, tactiques et sportifs aux futurs élèves gendarmes en école de sous-officiers.",
    MissionsPrincipales: "Pédagogie de commandement, animation d'ateliers tactiques, encadrement des promotions et évaluation continue.",
    Icone: 'GraduationCap',
    PlacesDisponibles: 8,
    EstActive: true,
    CompetencesAttendues: [
      { name: "Pédagogie et communication", niveau: 5 },
      { name: "Exemplarité déontologique", niveau: 5 },
      { name: "Maîtrise MSA et tactique", niveau: 4 },
      { name: "Gestion de groupe", niveau: 4 }
    ],
    TestsAssocies: ['TEST-COMMUNICATION', 'TEST-SITUATION', 'TEST-ORIENT-2026'],
    MatieresAcademiquesPertinentes: [
      { matiere: "TirMSA", coef: 2.0 },
      { matiere: "Sport", coef: 2.0 },
      { matiere: "ProcedurePenale", coef: 1.5 }
    ],
    PoidsNotesAcademiques: 0.30,
    PoidsRaisonnement: 0.20,
    PoidsCompetencesSpecifiques: 0.25,
    PoidsSituationsPro: 0.25
  },
  {
    SpecialiteId: 7,
    Code: 'SPEC-GARDE',
    Intitule: 'Garde Républicaine (Sécurité des Emprises Publiques)',
    Subdivision: 'Garde Républicaine',
    Description: "Protection des hauts lieux républicains (Palais de l'Élysée, Matignon, Sénat, Assemblée Nationale) et honneurs militaires.",
    MissionsPrincipales: "Contrôle d'accès haute sécurité, filtrage, patrouilles de surveillance armée et cérémonies protocolaires.",
    Icone: 'ShieldCheck',
    PlacesDisponibles: 20,
    EstActive: true,
    CompetencesAttendues: [
      { name: "Vigilance statique prolongée", niveau: 5 },
      { name: "Sang-froid", niveau: 4 },
      { name: "Présentation militaire irréprochable", niveau: 5 },
      { name: "Détection de comportements anormaux", niveau: 4 }
    ],
    TestsAssocies: ['TEST-ATTENTION', 'TEST-SITUATION', 'TEST-ORIENT-2026'],
    MatieresAcademiquesPertinentes: [
      { matiere: "TirMSA", coef: 2.0 },
      { matiere: "Sport", coef: 1.5 }
    ],
    PoidsNotesAcademiques: 0.25,
    PoidsRaisonnement: 0.20,
    PoidsCompetencesSpecifiques: 0.30,
    PoidsSituationsPro: 0.25
  },
  {
    SpecialiteId: 8,
    Code: 'SPEC-GM',
    Intitule: 'Gendarmerie Mobile (Maintien de l\'Ordre)',
    Subdivision: 'Gendarmerie Mobile',
    Description: "Escadrons de marche engagés dans le maintien et le rétablissement de l'ordre public, les missions de sécurisation et les opérations outre-mer.",
    MissionsPrincipales: "Gestion démocratique de foules, escortes d'autorités, sécurisation événementielle majeure et renforts territoriaux.",
    Icone: 'Users',
    PlacesDisponibles: 35,
    EstActive: true,
    CompetencesAttendues: [
      { name: "Cohésion d'équipe sous contrainte", niveau: 5 },
      { name: "Robustesse physique", niveau: 4 },
      { name: "Discipline tactique", niveau: 5 },
      { name: "Maîtrise de la force légitime", niveau: 4 }
    ],
    TestsAssocies: ['TEST-SITUATION', 'TEST-ATTENTION', 'TEST-ORIENT-2026'],
    MatieresAcademiquesPertinentes: [
      { matiere: "Sport", coef: 2.5 },
      { matiere: "TirMSA", coef: 2.0 },
      { matiere: "ProcedurePenale", coef: 1.0 }
    ],
    PoidsNotesAcademiques: 0.20,
    PoidsRaisonnement: 0.20,
    PoidsCompetencesSpecifiques: 0.30,
    PoidsSituationsPro: 0.30
  },
  {
    SpecialiteId: 9,
    Code: 'SPEC-MOTARD',
    Intitule: 'Escadron Motocycliste (MOTARD)',
    Subdivision: 'Sécurité des Mobilités',
    Description: "Escortes rapides de hautes personnalités, guidage de convois d'urgence, transports sanitaires et interception à grande vitesse.",
    MissionsPrincipales: "Conduite moto tout-terrain et sur route à vitesse tactique, escortes prioritaires, contrôle coordonné des flux routiers.",
    Icone: 'Bike',
    PlacesDisponibles: 10,
    EstActive: true,
    CompetencesAttendues: [
      { name: "Réflexes moteurs ultra-rapides", niveau: 5 },
      { name: "Équilibre et dextérité", niveau: 5 },
      { name: "Endurance physique sous intempéries", niveau: 4 },
      { name: "Vigilance périphérique", niveau: 5 }
    ],
    TestsAssocies: ['TEST-ATTENTION', 'TEST-LOGIQUE', 'TEST-ORIENT-2026'],
    MatieresAcademiquesPertinentes: [
      { matiere: "Conduite", coef: 3.0 },
      { matiere: "Sport", coef: 2.0 }
    ],
    PoidsNotesAcademiques: 0.25,
    PoidsRaisonnement: 0.25,
    PoidsCompetencesSpecifiques: 0.30,
    PoidsSituationsPro: 0.20
  },
  {
    SpecialiteId: 10,
    Code: 'SPEC-GEH',
    Intitule: "Groupe d'Escorte et d'Honneur (GEH)",
    Subdivision: 'Garde Républicaine',
    Description: "Escortes d'honneur du Président de la République et des chefs d'État étrangers, défilés nationaux et cérémonies militaires d'État.",
    MissionsPrincipales: "Protocole militaire de prestige, maîtrise équestre ou motocyclisme de cérémonie, haute précision gestuelle.",
    Icone: 'Award',
    PlacesDisponibles: 6,
    EstActive: true,
    CompetencesAttendues: [
      { name: "Rigueur martiale d'élite", niveau: 5 },
      { name: "Dextérité et posture d'honneur", niveau: 5 },
      { name: "Discipline protocolaire", niveau: 5 },
      { name: "Résistance physique statique", niveau: 4 }
    ],
    TestsAssocies: ['TEST-ATTENTION', 'TEST-SITUATION', 'TEST-ORIENT-2026'],
    MatieresAcademiquesPertinentes: [
      { matiere: "Sport", coef: 2.0 },
      { matiere: "Conduite", coef: 1.5 }
    ],
    PoidsNotesAcademiques: 0.25,
    PoidsRaisonnement: 0.20,
    PoidsCompetencesSpecifiques: 0.30,
    PoidsSituationsPro: 0.25
  },
  {
    SpecialiteId: 11,
    Code: 'SPEC-GSI',
    Intitule: 'Groupe de Sécurité et d\'Intervention (GSI)',
    Subdivision: 'Intervention Spécialisée',
    Description: "Appui renforcé aux unités territoriales lors de situations d'intervention à risque élevé, transferts sous haute escorte et sécurisation d'emprises.",
    MissionsPrincipales: "Intervention sur individus retranchés, levée de doute armée, appui tactique de proximité et tirs de riposte coordonnés.",
    Icone: 'Crosshair',
    PlacesDisponibles: 12,
    EstActive: true,
    CompetencesAttendues: [
      { name: "Intervention en milieu clos", niveau: 5 },
      { name: "Discernement du tir", niveau: 5 },
      { name: "Condition physique d'exception", niveau: 5 },
      { name: "Gestion de la peur", niveau: 4 }
    ],
    TestsAssocies: ['TEST-SITUATION', 'TEST-LOGIQUE', 'TEST-ORIENT-2026'],
    MatieresAcademiquesPertinentes: [
      { matiere: "TirMSA", coef: 3.0 },
      { matiere: "Sport", coef: 2.5 }
    ],
    PoidsNotesAcademiques: 0.20,
    PoidsRaisonnement: 0.30,
    PoidsCompetencesSpecifiques: 0.30,
    PoidsSituationsPro: 0.20
  },
  {
    SpecialiteId: 12,
    Code: 'SPEC-SCIENTIFIQUE',
    Intitule: 'Spécialités Scientifiques & Criminalistique (IRCGN)',
    Subdivision: 'Police Technique & Scientifique',
    Description: "Examens de laboratoire, balistique judiciaire, analyse physico-chimique de traces, profils génétiques et criminalistique numérique.",
    MissionsPrincipales: "Prélèvement d'indices sur scènes de crime majeures, analyse instrumentale en laboratoire, expertise devant les juridictions.",
    Icone: 'Microscope',
    PlacesDisponibles: 8,
    EstActive: true,
    CompetencesAttendues: [
      { name: "Raisonnement scientifique rigoureux", niveau: 5 },
      { name: "Précision gestuelle méticuleuse", niveau: 5 },
      { name: "Maîtrise de la chaîne de preuve", niveau: 4 },
      { name: "Patience et persévérance", niveau: 4 }
    ],
    TestsAssocies: ['TEST-TECHNIQUE', 'TEST-LOGIQUE', 'TEST-PROBLEMES', 'TEST-ORIENT-2026'],
    MatieresAcademiquesPertinentes: [
      { matiere: "Informatique", coef: 2.0 },
      { matiere: "DroitPenal", coef: 2.0 },
      { matiere: "ExpressionFr", coef: 1.5 }
    ],
    PoidsNotesAcademiques: 0.30,
    PoidsRaisonnement: 0.35,
    PoidsCompetencesSpecifiques: 0.25,
    PoidsSituationsPro: 0.10
  },
  {
    SpecialiteId: 13,
    Code: 'SPEC-PSIG',
    Intitule: "Peloton de Surveillance et d'Intervention (PSIG Sabre)",
    Subdivision: 'Intervention / Sécurité Publique',
    Description: "Unités spécialisées dans les interventions de premier niveau à haute intensité, neutralisation d'individus dangereux et patrouilles nocturnes.",
    MissionsPrincipales: "Intervention d'urgence, sécurisation de zones sensibles, interpellation d'individus armés.",
    Icone: 'ShieldAlert',
    PlacesDisponibles: 20,
    EstActive: true,
    CompetencesAttendues: [
      { name: "Réactivité opérationnelle", niveau: 5 },
      { name: "Sang-froid sous le feu", niveau: 5 },
      { name: "Maîtrise armement et tactique", niveau: 4 },
      { name: "Force physique", niveau: 4 }
    ],
    TestsAssocies: ['TEST-SITUATION', 'TEST-ATTENTION', 'TEST-ORIENT-2026'],
    MatieresAcademiquesPertinentes: [
      { matiere: "TirMSA", coef: 2.5 },
      { matiere: "Sport", coef: 2.5 }
    ],
    PoidsNotesAcademiques: 0.20,
    PoidsRaisonnement: 0.25,
    PoidsCompetencesSpecifiques: 0.30,
    PoidsSituationsPro: 0.25
  }
];

export const initialConditions = [
  // 1. MOTARD (Paramètre provisoire démo de taille 180 cm + Sport + Vision)
  {
    ConditionId: 1,
    SpecialiteId: 9, // SPEC-MOTARD
    TypeCondition: 'TAILLE_MIN',
    CibleCondition: 'TailleCm',
    Operateur: '>=',
    Seuil: '180',
    EstObligatoire: true,
    SourceOfficielle: 'Paramètre provisoire démo commanditaire (non officiel)',
    DateValidation: '2026-01-10',
    StatutValidation: 'PROVISOIRE_DEMO',
    Description: "Taille minimale indicative de 180 cm (paramètre provisoire de démonstration non officiel)."
  },
  {
    ConditionId: 2,
    SpecialiteId: 9, // SPEC-MOTARD
    TypeCondition: 'APTITUDE_PHYSIQUE',
    CibleCondition: 'AptitudePhysique',
    Operateur: '>=',
    Seuil: '14.0',
    EstObligatoire: true,
    SourceOfficielle: 'Instruction N° 2100/DEF/GEND/RH',
    DateValidation: '2025-05-15',
    StatutValidation: 'VALIDEE_OFFICIELLE',
    Description: "Note sportive minimale de 14.0/20 aux épreuves physiques réglementaires."
  },
  {
    ConditionId: 3,
    SpecialiteId: 9, // SPEC-MOTARD
    TypeCondition: 'VISION',
    CibleCondition: 'VisionSIGYCOP_Y',
    Operateur: '<=',
    Seuil: '2',
    EstObligatoire: true,
    SourceOfficielle: 'Arrêté interministériel SIGYCOP Armées',
    DateValidation: '2025-06-01',
    StatutValidation: 'VALIDEE_OFFICIELLE',
    Description: "Contrôle de la vision : coefficient SIGYCOP Y <= 2 exigé pour la conduite rapide."
  },

  // 2. GEH (Paramètre provisoire démo de taille 180 cm + Sport)
  {
    ConditionId: 4,
    SpecialiteId: 10, // SPEC-GEH
    TypeCondition: 'TAILLE_MIN',
    CibleCondition: 'TailleCm',
    Operateur: '>=',
    Seuil: '180',
    EstObligatoire: true,
    SourceOfficielle: 'Paramètre provisoire démo commanditaire (non officiel)',
    DateValidation: '2026-01-10',
    StatutValidation: 'PROVISOIRE_DEMO',
    Description: "Taille minimale indicative de 180 cm pour le protocole d'escorte (paramètre provisoire de démonstration)."
  },
  {
    ConditionId: 5,
    SpecialiteId: 10, // SPEC-GEH
    TypeCondition: 'APTITUDE_PHYSIQUE',
    CibleCondition: 'AptitudePhysique',
    Operateur: '>=',
    Seuil: '13.5',
    EstObligatoire: true,
    SourceOfficielle: 'Directive Garde Républicaine N° 45/RH',
    DateValidation: '2025-03-20',
    StatutValidation: 'VALIDEE_OFFICIELLE',
    Description: "Note sportive minimale de 13.5/20."
  },

  // 3. GSI (Paramètre provisoire démo de taille 180 cm + Condition physique supérieure)
  {
    ConditionId: 6,
    SpecialiteId: 11, // SPEC-GSI
    TypeCondition: 'TAILLE_MIN',
    CibleCondition: 'TailleCm',
    Operateur: '>=',
    Seuil: '180',
    EstObligatoire: true,
    SourceOfficielle: 'Paramètre provisoire démo commanditaire (non officiel)',
    DateValidation: '2026-01-10',
    StatutValidation: 'PROVISOIRE_DEMO',
    Description: "Taille minimale indicative de 180 cm (paramètre provisoire de démonstration non officiel)."
  },
  {
    ConditionId: 7,
    SpecialiteId: 11, // SPEC-GSI
    TypeCondition: 'APTITUDE_PHYSIQUE',
    CibleCondition: 'AptitudePhysique',
    Operateur: '>=',
    Seuil: '15.5',
    EstObligatoire: true,
    SourceOfficielle: 'Circulaire Unités d\'Intervention N° 789/GEND',
    DateValidation: '2025-08-12',
    StatutValidation: 'VALIDEE_OFFICIELLE',
    Description: "Condition physique d'élite requise (note minimale 15.5/20)."
  },

  // 4. Police Judiciaire (SPEC-PJ)
  {
    ConditionId: 8,
    SpecialiteId: 2, // SPEC-PJ
    TypeCondition: 'NOTE_MIN_FORMATION',
    CibleCondition: 'NoteFormationPro',
    Operateur: '>=',
    Seuil: '13.5',
    EstObligatoire: true,
    SourceOfficielle: 'Règlement de scolarité DGGN',
    DateValidation: '2025-01-01',
    StatutValidation: 'VALIDEE_OFFICIELLE',
    Description: "Moyenne académique générale minimale de 13.5/20 sur les 2 ans de formation."
  },
  {
    ConditionId: 9,
    SpecialiteId: 2, // SPEC-PJ
    TypeCondition: 'NOTE_MIN_MATIERE',
    CibleCondition: 'ProcedurePenale',
    Operateur: '>=',
    Seuil: '12.0',
    EstObligatoire: true,
    SourceOfficielle: 'Instruction Direction des Enquêtes Criminelles',
    DateValidation: '2025-04-10',
    StatutValidation: 'VALIDEE_OFFICIELLE',
    Description: "Note minimale de 12.0/20 en Procédure Pénale."
  },

  // 5. Police de la Route (SPEC-ROUTE)
  {
    ConditionId: 10,
    SpecialiteId: 1, // SPEC-ROUTE
    TypeCondition: 'VISION',
    CibleCondition: 'VisionSIGYCOP_Y',
    Operateur: '<=',
    Seuil: '2',
    EstObligatoire: true,
    SourceOfficielle: 'Arrêté médical aptitude conduite rapide',
    DateValidation: '2025-06-01',
    StatutValidation: 'VALIDEE_OFFICIELLE',
    Description: "Vision compatible conduite rapide (SIGYCOP Y <= 2)."
  },
  {
    ConditionId: 11,
    SpecialiteId: 1, // SPEC-ROUTE
    TypeCondition: 'APTITUDE_PHYSIQUE',
    CibleCondition: 'AptitudePhysique',
    Operateur: '>=',
    Seuil: '12.0',
    EstObligatoire: false, // Indicatif
    SourceOfficielle: 'Recommandation indicative de sécurité routière',
    DateValidation: '2025-02-15',
    StatutValidation: 'VALIDEE_OFFICIELLE',
    Description: "Condition physique générale satisfaisante (indicatif)."
  },

  // 6. Informatique (SPEC-INFO)
  {
    ConditionId: 12,
    SpecialiteId: 3, // SPEC-INFO
    TypeCondition: 'NOTE_MIN_MATIERE',
    CibleCondition: 'Informatique',
    Operateur: '>=',
    Seuil: '13.0',
    EstObligatoire: true,
    SourceOfficielle: 'Référentiel ComCyberGend 2025',
    DateValidation: '2025-09-01',
    StatutValidation: 'VALIDEE_OFFICIELLE',
    Description: "Note académique minimale de 13.0/20 en Informatique."
  },

  // 7. Secrétariat Administratif (SPEC-SEC-ADMIN)
  {
    ConditionId: 13,
    SpecialiteId: 5, // SPEC-SEC-ADMIN
    TypeCondition: 'NOTE_MIN_MATIERE',
    CibleCondition: 'ExpressionFr',
    Operateur: '>=',
    Seuil: '12.5',
    EstObligatoire: true,
    SourceOfficielle: 'Normes de rédaction administrative DGGN',
    DateValidation: '2025-02-01',
    StatutValidation: 'VALIDEE_OFFICIELLE',
    Description: "Note minimale de 12.5/20 en Expression Écrite & Rédaction."
  },

  // 8. Garde Républicaine (SPEC-GARDE)
  {
    ConditionId: 14,
    SpecialiteId: 7, // SPEC-GARDE
    TypeCondition: 'MEDICAL',
    CibleCondition: 'StatutMedical',
    Operateur: '==',
    Seuil: 'SIGYCOP_VALIDE',
    EstObligatoire: true,
    SourceOfficielle: 'Instruction Aptitude Service Général',
    DateValidation: '2025-01-15',
    StatutValidation: 'VALIDEE_OFFICIELLE',
    Description: "Profil médical SIGYCOP strictement sans contre-indication terrain."
  },

  // 9. Gendarmerie Mobile (SPEC-GM)
  {
    ConditionId: 15,
    SpecialiteId: 8, // SPEC-GM
    TypeCondition: 'APTITUDE_PHYSIQUE',
    CibleCondition: 'AptitudePhysique',
    Operateur: '>=',
    Seuil: '12.0',
    EstObligatoire: true,
    SourceOfficielle: 'Instruction Maintien de l\'Ordre DGGN',
    DateValidation: '2025-01-01',
    StatutValidation: 'VALIDEE_OFFICIELLE',
    Description: "Aptitude physique opérationnelle minimale de 12.0/20."
  },

  // 10. Spécialités Scientifiques (SPEC-SCIENTIFIQUE)
  {
    ConditionId: 16,
    SpecialiteId: 12, // SPEC-SCIENTIFIQUE
    TypeCondition: 'NOTE_MIN_FORMATION',
    CibleCondition: 'NoteFormationPro',
    Operateur: '>=',
    Seuil: '14.0',
    EstObligatoire: true,
    SourceOfficielle: 'Charte d\'intégration IRCGN',
    DateValidation: '2025-06-30',
    StatutValidation: 'VALIDEE_OFFICIELLE',
    Description: "Moyenne générale académique minimale de 14.0/20."
  },

  // 11. PSIG Sabre (SPEC-PSIG)
  {
    ConditionId: 17,
    SpecialiteId: 13, // SPEC-PSIG
    TypeCondition: 'APTITUDE_PHYSIQUE',
    CibleCondition: 'AptitudePhysique',
    Operateur: '>=',
    Seuil: '15.0',
    EstObligatoire: true,
    SourceOfficielle: 'Directive PSIG Sabre N° 34',
    DateValidation: '2025-04-01',
    StatutValidation: 'VALIDEE_OFFICIELLE',
    Description: "Note minimale de 15.0/20 aux épreuves physiques réglementaires."
  },
  {
    ConditionId: 18,
    SpecialiteId: 13, // SPEC-PSIG
    TypeCondition: 'MEDICAL',
    CibleCondition: 'StatutMedical',
    Operateur: '==',
    Seuil: 'SIGYCOP_VALIDE',
    EstObligatoire: true,
    SourceOfficielle: 'Arrêté d\'aptitude physique et médicale gendarmerie',
    DateValidation: '2025-01-01',
    StatutValidation: 'VALIDEE_OFFICIELLE',
    Description: "Profil SIGYCOP strictement valide sans restriction terrain."
  }
];

export const initialUsers = [
  {
    UtilisateurId: 1,
    Matricule: 'ADM-001',
    Email: 'commandement@orient-gr.gendarmerie.fr',
    MotDePasseHash: '$2a$10$wT8mQ3L33gP5.5K0oD7/reB7zZ5WzI9XNfE.B83T0N0K2jK2WkQp2', // 'Gendarme2026!'
    Nom: 'De Montmirail',
    Prenom: 'Laurent',
    Role: 'ADMIN',
    PromotionId: null,
    ClassementInitial: null,
    NoteFormationPro: null,
    AptitudePhysique: null,
    StatutMedical: 'SIGYCOP_VALIDE',
    Age: 38,
    TailleCm: 182,
    PoidsKg: 79.0,
    IMC: 23.8,
    VisionSIGYCOP_Y: 1,
    AcuiteVisuelle: '10/10 (Y1 - Sans correction)',
    MoyennesMatieres: null,
    CompetencesPratiques: null,
    PreferencesSpecialites: null,
    EstActif: true,
    DerniereConnexion: new Date().toISOString()
  },
  {
    UtilisateurId: 2,
    Matricule: 'EG-2025-014',
    Email: 'julien.moreau@eleve.gendarmerie.fr',
    MotDePasseHash: '$2a$10$wT8mQ3L33gP5.5K0oD7/reB7zZ5WzI9XNfE.B83T0N0K2jK2WkQp2',
    Nom: 'Moreau',
    Prenom: 'Julien',
    Role: 'ELEVE',
    PromotionId: 1,
    ClassementInitial: 12,
    NoteFormationPro: 15.8,
    AptitudePhysique: 16.5,
    StatutMedical: 'SIGYCOP_VALIDE',
    Age: 23,
    TailleCm: 183,
    PoidsKg: 78.0,
    IMC: 23.3,
    VisionSIGYCOP_Y: 1,
    AcuiteVisuelle: '10/10 (Y1 - Sans correction)',
    MoyennesMatieres: {
      DroitPenal: 15.0,
      ProcedurePenale: 14.5,
      TirMSA: 17.0,
      Informatique: 14.0,
      Sport: 16.5,
      Conduite: 18.0,
      ExpressionFr: 14.0
    },
    CompetencesPratiques: {
      PilotageMoto: 5,
      InterventionMilieuClos: 4,
      SecretariatAdmin: 3,
      ReseauxTelecom: 3
    },
    PreferencesSpecialites: [
      { code: 'SPEC-MOTARD', rang: 1, motivation: "Passion pour les missions d'escorte rapide et le motocyclisme opérationnel." },
      { code: 'SPEC-ROUTE', rang: 2, motivation: "Sécurisation des flux routiers départementaux." },
      { code: 'SPEC-PJ', rang: 3, motivation: "Intérêt pour les actes judiciaires." }
    ],
    NumeroCIN: 'AB123456',
    CompteActive: true,
    DateActivation: new Date().toISOString(),
    TentativesEchouees: 0,
    VerrouilleJusquA: null,
    EstActif: true,
    DerniereConnexion: new Date().toISOString()
  },
  {
    UtilisateurId: 3,
    Matricule: 'EG-2025-042',
    Email: 'clara.bernard@eleve.gendarmerie.fr',
    MotDePasseHash: '$2a$10$wT8mQ3L33gP5.5K0oD7/reB7zZ5WzI9XNfE.B83T0N0K2jK2WkQp2',
    Nom: 'Bernard',
    Prenom: 'Clara',
    Role: 'ELEVE',
    PromotionId: 1,
    ClassementInitial: 5,
    NoteFormationPro: 17.2,
    AptitudePhysique: 14.0,
    StatutMedical: 'SIGYCOP_VALIDE',
    Age: 22,
    TailleCm: 172,
    PoidsKg: 63.0,
    IMC: 21.3,
    VisionSIGYCOP_Y: 1,
    AcuiteVisuelle: '10/10 (Y1 - Sans correction)',
    MoyennesMatieres: {
      DroitPenal: 18.0,
      ProcedurePenale: 17.5,
      TirMSA: 14.0,
      Informatique: 15.0,
      Sport: 14.0,
      Conduite: 13.5,
      ExpressionFr: 18.0
    },
    CompetencesPratiques: {
      PilotageMoto: 1,
      InterventionMilieuClos: 3,
      SecretariatAdmin: 5,
      ReseauxTelecom: 4
    },
    PreferencesSpecialites: [
      { code: 'SPEC-PJ', rang: 1, motivation: "Vocation confirmée pour la police judiciaire, les auditions et l'investigation criminelle." },
      { code: 'SPEC-SCIENTIFIQUE', rang: 2, motivation: "Appétence pour l'expertise forensique et l'analyse de preuves." },
      { code: 'SPEC-SEC-ADMIN', rang: 3, motivation: "Rigueur administrative." }
    ],
    NumeroCIN: 'CD789012',
    CompteActive: true,
    DateActivation: new Date().toISOString(),
    TentativesEchouees: 0,
    VerrouilleJusquA: null,
    EstActif: true,
    DerniereConnexion: new Date().toISOString()
  },
  {
    UtilisateurId: 4,
    Matricule: 'EG-2025-089',
    Email: 'thomas.leroux@eleve.gendarmerie.fr',
    MotDePasseHash: '$2a$10$wT8mQ3L33gP5.5K0oD7/reB7zZ5WzI9XNfE.B83T0N0K2jK2WkQp2',
    Nom: 'Leroux',
    Prenom: 'Thomas',
    Role: 'ELEVE',
    PromotionId: 1,
    ClassementInitial: 28,
    NoteFormationPro: 14.1,
    AptitudePhysique: 17.5,
    StatutMedical: 'SIGYCOP_VALIDE',
    Age: 24,
    TailleCm: 185,
    PoidsKg: 83.0,
    IMC: 24.3,
    VisionSIGYCOP_Y: 1,
    AcuiteVisuelle: '10/10 (Y1 - Sans correction)',
    MoyennesMatieres: {
      DroitPenal: 13.0,
      ProcedurePenale: 13.5,
      TirMSA: 18.0,
      Informatique: 12.0,
      Sport: 17.5,
      Conduite: 15.0,
      ExpressionFr: 12.5
    },
    CompetencesPratiques: {
      PilotageMoto: 3,
      InterventionMilieuClos: 5,
      SecretariatAdmin: 2,
      ReseauxTelecom: 2
    },
    PreferencesSpecialites: [
      { code: 'SPEC-GSI', rang: 1, motivation: "Sens du devoir en intervention rapprochée et neutralisation d'individus dangereux." },
      { code: 'SPEC-GM', rang: 2, motivation: "Discipline et manœuvres d'escadron." },
      { code: 'SPEC-GEH', rang: 3, motivation: "Escortes d'honneur." }
    ],
    NumeroCIN: 'EF345678',
    CompteActive: true,
    DateActivation: new Date().toISOString(),
    TentativesEchouees: 0,
    VerrouilleJusquA: null,
    EstActif: true,
    DerniereConnexion: new Date().toISOString()
  },
  {
    UtilisateurId: 5,
    Matricule: 'EG-2025-103',
    Email: 'sarah.benali@eleve.gendarmerie.fr',
    MotDePasseHash: '$2a$10$wT8mQ3L33gP5.5K0oD7/reB7zZ5WzI9XNfE.B83T0N0K2jK2WkQp2',
    Nom: 'Benali',
    Prenom: 'Sarah',
    Role: 'ELEVE',
    PromotionId: 1,
    ClassementInitial: 64,
    NoteFormationPro: 15.2,
    AptitudePhysique: 13.0,
    StatutMedical: 'RESTRICTION_TEMPORAIRE',
    Age: 21,
    TailleCm: 168,
    PoidsKg: 58.0,
    IMC: 20.5,
    VisionSIGYCOP_Y: null, // Donnée non renseignée exprès pour tester l'état "Condition à vérifier"
    AcuiteVisuelle: 'À vérifier (Non renseigné)',
    MoyennesMatieres: {
      DroitPenal: 14.0,
      ProcedurePenale: 14.0,
      TirMSA: 13.0,
      Informatique: 18.5,
      Sport: 13.0,
      Conduite: 13.0,
      ExpressionFr: 16.0
    },
    CompetencesPratiques: {
      PilotageMoto: 1,
      InterventionMilieuClos: 2,
      SecretariatAdmin: 4,
      ReseauxTelecom: 5
    },
    PreferencesSpecialites: [
      { code: 'SPEC-INFO', rang: 1, motivation: "Spécialisation dans les réseaux, la sécurité informatique et l'appui forensic." },
      { code: 'SPEC-SEC-INFO', rang: 2, motivation: "Assistance et administration logicielle." },
      { code: 'SPEC-PJ', rang: 3, motivation: "Enquêtes numériques." }
    ],
    NumeroCIN: 'GH901234',
    CompteActive: true,
    DateActivation: new Date().toISOString(),
    TentativesEchouees: 0,
    VerrouilleJusquA: null,
    EstActif: true,
    DerniereConnexion: new Date().toISOString()
  },
  {
    UtilisateurId: 6,
    Matricule: 'INST-001',
    Email: 'commission.meca@orient-gr.gendarmerie.fr',
    MotDePasseHash: '$2a$10$wT8mQ3L33gP5.5K0oD7/reB7zZ5WzI9XNfE.B83T0N0K2jK2WkQp2',
    Nom: 'El Fassi',
    Prenom: 'Mohammed',
    Role: 'COMMISSION',
    Grade: 'Adjudant-Chef',
    Unite: 'Section SIC & Ateliers Pratiques',
    PromotionId: 1,
    ClassementInitial: null,
    NoteFormationPro: null,
    AptitudePhysique: null,
    StatutMedical: 'SIGYCOP_VALIDE',
    Age: 42,
    TailleCm: 180,
    PoidsKg: 80.0,
    IMC: 24.7,
    VisionSIGYCOP_Y: 1,
    AcuiteVisuelle: '10/10 (Y1)',
    MoyennesMatieres: null,
    CompetencesPratiques: null,
    PreferencesSpecialites: null,
    EstActif: true,
    DerniereConnexion: new Date().toISOString()
  }
];

export const initialTests = [
  {
    TestId: 1,
    Code: 'TEST-ORIENT-2026',
    Titre: "الاختبار العام للتقييم والتوجيه المهني (EGO-2026)",
    Description: "بنك مركزي موحد يضم 140 سؤالاً باللغة العربية يغطي كافة المهارات والتخصصات العملياتية للدرك الملكي مع اختيار وتوزيع عشوائي متوازن.",
    DureeMinutes: 60,
    NombreQuestions: 60,
    CategoriesIncluses: ['LOGIQUE', 'OBSERVATION', 'ATTENTION', 'DECISION', 'ROUTE_MOTO', 'PJ_ENQUETE', 'INFORMATIQUE', 'COMMUNICATION', 'SECRETARIAT', 'DISCIPLINE'],
    DifficulteCible: 'TOUS',
    AutoriserRetour: true,
    AutoriserPause: true,
    AutoriserReprise: true,
    NombreTentativesMax: 3,
    SeuilReussite: 60.0,
    SelectionAleatoire: true,
    SeedReproductible: true,
    Version: 1,
    EstActif: true,
    CreatedAt: '2025-09-01T08:00:00Z'
  },
  {
    TestId: 2,
    Code: 'TEST-LOGIQUE',
    Titre: 'Test de Raisonnement Logique & Déductif',
    Description: "Matrices logiques abstraites, déduction d'hypothèses et résolution spatiale.",
    DureeMinutes: 20,
    NombreQuestions: 5,
    CategoriesIncluses: ['LOGIQUE'],
    DifficulteCible: 'AVANCE',
    AutoriserRetour: true,
    AutoriserPause: false,
    AutoriserReprise: true,
    NombreTentativesMax: 2,
    SeuilReussite: 65.0,
    SelectionAleatoire: true,
    SeedReproductible: true,
    Version: 1,
    EstActif: true,
    CreatedAt: '2025-09-01T08:00:00Z'
  },
  {
    TestId: 3,
    Code: 'TEST-SITUATION',
    Titre: 'Test de Jugement Situationnel & Déontologie',
    Description: 'Mises en situation opérationnelles réelles, respect de la légalité républicaine et gestion du stress.',
    DureeMinutes: 25,
    NombreQuestions: 6,
    CategoriesIncluses: ['SITUATION', 'PROCEDURE'],
    DifficulteCible: 'MOYEN',
    AutoriserRetour: true,
    AutoriserPause: true,
    AutoriserReprise: true,
    NombreTentativesMax: 2,
    SeuilReussite: 70.0,
    SelectionAleatoire: false,
    SeedReproductible: true,
    Version: 1,
    EstActif: true,
    CreatedAt: '2025-09-01T08:00:00Z'
  },
  {
    TestId: 4,
    Code: 'TEST-INFORMATIQUE',
    Titre: 'Test de Compétences Informatiques & Cyber-sécurité',
    Description: 'Connaissances réseaux, forensic numérique, télécoms et sécurisation des données.',
    DureeMinutes: 20,
    NombreQuestions: 5,
    CategoriesIncluses: ['TECHNIQUE'],
    DifficulteCible: 'AVANCE',
    AutoriserRetour: true,
    AutoriserPause: false,
    AutoriserReprise: true,
    NombreTentativesMax: 2,
    SeuilReussite: 65.0,
    SelectionAleatoire: true,
    SeedReproductible: true,
    Version: 1,
    EstActif: true,
    CreatedAt: '2025-09-01T08:00:00Z'
  }
];

export const initialQuestions = arabicQuestionBank140;

export const initialSessions = [
  {
    SessionId: 1,
    UtilisateurId: 2, // Julien Moreau
    TestId: 1,
    TentativeNumero: 1,
    SeedGeneration: 12345,
    QuestionsSnapshot: [1, 2, 3, 4, 5, 6, 7, 8],
    DateDebut: '2026-10-15T09:00:00.000Z',
    DateFin: '2026-10-15T09:28:15.000Z',
    DateFinMaxServeur: '2026-10-15T09:37:00.000Z',
    DureeEcouleeSecondes: 1695,
    Statut: 'TERMINE',
    ScoreBrut: 9,
    ScoreTotal: 10,
    ScorePourcentage: 90.0,
    IndiceConfiance: 100.0,
    ProfilIncomplet: false,
    DonneesManquantes: [],
    Progression: 8,
    CreatedAt: '2026-10-15T09:00:00.000Z',
    UserAnswers: [
      { questionId: 1, optionId: 102, savedAt: '2026-10-15T09:03:00.000Z' },
      { questionId: 2, optionId: 203, savedAt: '2026-10-15T09:07:00.000Z' },
      { questionId: 3, optionId: 303, savedAt: '2026-10-15T09:12:00.000Z' },
      { questionId: 4, optionId: 402, savedAt: '2026-10-15T09:16:00.000Z' },
      { questionId: 5, optionId: 502, savedAt: '2026-10-15T09:20:00.000Z' },
      { questionId: 6, optionId: 602, savedAt: '2026-10-15T09:23:00.000Z' },
      { questionId: 7, optionId: 702, savedAt: '2026-10-15T09:25:00.000Z' },
      { questionId: 8, optionId: null, reponseTexte: "J'avise immédiatement mon chef d'élément par liaison radio de la présence d'un mineur au sol à 10 mètres. Sous couverture d'un bouclier de mon binôme désigné par le chef, nous effectuons une extraction rapide sans désolidariser le bloc, puis repli immédiat sur la ligne.", savedAt: '2026-10-15T09:28:00.000Z' }
    ],
    ResultatsDomaines: [
      { DomaineCode: 'LOGIQUE', DomaineIntitule: 'Raisonnement Logique', TotalQuestions: 1, CorrectQuestions: 1, PointsObtenus: 1, PointsMax: 1, Pourcentage: 100 },
      { DomaineCode: 'SITUATION', DomaineIntitule: 'Jugement Situationnel', TotalQuestions: 2, CorrectQuestions: 2, PointsObtenus: 4, PointsMax: 5, Pourcentage: 80 },
      { DomaineCode: 'NUMERIQUE', DomaineIntitule: 'Aptitude Numérique', TotalQuestions: 1, CorrectQuestions: 1, PointsObtenus: 2, PointsMax: 2, Pourcentage: 100 },
      { DomaineCode: 'PROCEDURE', DomaineIntitule: 'Rigueur Procédurale', TotalQuestions: 1, CorrectQuestions: 1, PointsObtenus: 1, PointsMax: 1, Pourcentage: 100 },
      { DomaineCode: 'OBSERVATION', DomaineIntitule: 'Observation & Vigilance', TotalQuestions: 1, CorrectQuestions: 1, PointsObtenus: 1, PointsMax: 1, Pourcentage: 100 },
      { DomaineCode: 'TECHNIQUE', DomaineIntitule: 'Aptitudes Techniques', TotalQuestions: 1, CorrectQuestions: 1, PointsObtenus: 2, PointsMax: 2, Pourcentage: 100 },
      { DomaineCode: 'COMMUNICATION', DomaineIntitule: 'Communication & Organisation', TotalQuestions: 1, CorrectQuestions: 1, PointsObtenus: 1, PointsMax: 1, Pourcentage: 100 }
    ],
    Recommandations: [] // Sera calculé dynamiquement
  }
];

export const initialEvaluations = [
  {
    EvaluationId: 1,
    SessionId: 1,
    QuestionId: 8,
    EvaluateurId: 1,
    EvaluateurNom: "Chef d'Escadron De Montmirail",
    PointsAttribues: 2.5,
    PointsMax: 3.0,
    CommentaireEvaluateur: "Excellente réaction tactique. Le compte-rendu radio préalable et la couverture bouclier respectent parfaitement la doctrine de sécurité.",
    DateEvaluation: '2026-10-15T11:00:00.000Z'
  }
];

export const initialLogs = [
  {
    LogId: 1,
    UtilisateurId: 1,
    Action: 'INITIALISATION_PLATEFORME',
    Cible: 'Système ORIENT-GR',
    Details: "Déploiement initial de la base de données et du moteur d'orientation multicritère.",
    AdresseIP: '127.0.0.1',
    DateLog: '2025-09-01T08:00:00Z'
  },
  {
    LogId: 2,
    UtilisateurId: 2,
    Action: 'TEST_SOUMIS',
    Cible: 'SessionTest #1',
    Details: "Élève Julien Moreau a finalisé l'évaluation officielle EGO-2026 avec 90.0%.",
    AdresseIP: '192.168.1.42',
    DateLog: '2026-10-15T09:28:15Z'
  }
];
