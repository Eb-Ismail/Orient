// ==============================================================================
// ORIENT-GR — Les 7 Grandes Spécialités de la Gendarmerie Royale Marocaine
// Référentiel Pédagogique Officiel : Découverte, Apprentissage, Exercices, Tests & Orientation
// ==============================================================================

export const GENDARMERIE_SPECIALTIES = [
  // ============================================================================
  // 1. GENDARMERIE TERRITORIALE (الدرك الملكي الإقليمي)
  // ============================================================================
  {
    id: 'SPEC-TERR',
    code: 'GEND-TERR',
    nomFr: 'Gendarmerie Territoriale',
    nomAr: 'الدرك الملكي الإقليمي',
    devise: 'Sécurité de proximité, vigilance territoriale et protection des citoyens',
    couleur: 'emerald',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    accentColor: '#153B2B',
    icone: 'Shield',
    image: {
      url: '/images/ateliers/gendarmerie-territoriale.webp',
      fallbackUrl: '/images/ateliers/gendarmerie-territoriale.jpg',
      caption: 'Gendarmes en uniforme vert en patrouille de surveillance dans une zone rurale avec véhicule de service',
      alt: 'Gendarmerie Territoriale - Patrouille rurale et sécurité publique'
    },
    presentation: `La Gendarmerie Territoriale constitue le socle opérationnel fondamental de la Gendarmerie Royale. Répartie sur l'ensemble du territoire national à travers les Compagnies et les Brigades territoriales, elle assure la sécurité publique, la police judiciaire et la protection de l'environnement en milieu rural, périurbain et sur les axes de communication.`,
    missions: [
      'Missions de la gendarmerie territoriale et surveillance générale du territoire',
      'Sécurité publique, prévention de la délinquance et police de proximité',
      'Sécurité routière et contrôle des flux de circulation sur les axes stratégiques',
      'Unités motocyclistes : escorte, régulation rapide et interventions dynamiques',
      'Unités équestres : surveillance des zones difficiles d\'accès, forêts et plages',
      'Cynotechnie et équipes K9 : recherche de personnes disparues et détection',
      'Protection de l\'environnement, du patrimoine forestier et des ressources en eau'
    ],
    objectifsPedagogiques: [
      'Maîtriser le cadre légal d\'intervention d\'une patrouille territoriale',
      'Connaître les techniques de sécurisation des axes routiers et de contrôle des véhicules',
      'Comprendre la coordination entre brigades territoriales, escadrons motocyclistes et pelotons équestres',
      'Appliquer les règles déontologiques et la posture militaire face aux citoyens'
    ],
    modules: [
      {
        id: 'MOD-TERR-01',
        titre: 'Organisation des Brigades & Sécurité de Proximité',
        duree: '3h 30min',
        chapitresCount: 4,
        difficulte: 'Fondamental'
      },
      {
        id: 'MOD-TERR-02',
        titre: 'Police de la Route & Unités Motocyclistes',
        duree: '4h 00min',
        chapitresCount: 5,
        difficulte: 'Intermédiaire'
      },
      {
        id: 'MOD-TERR-03',
        titre: 'Unités Spécialisées de Proximité (Équestre, K9 & Environnement)',
        duree: '3h 00min',
        chapitresCount: 3,
        difficulte: 'Intermédiaire'
      }
    ],
    chapitresDetailles: [
      {
        id: 'CHAP-TERR-101',
        moduleId: 'MOD-TERR-01',
        titre: 'La Brigade Territoriale : Organisation, Circonscription et Rôle Pivot',
        contenu: `La brigade territoriale est l'unité de base de la Gendarmerie Royale. Elle exerce ses compétences sous la triple tutelle administrative, judiciaire et militaire.\n\nPrincipes clés :\n1. Continuité de service 24h/24 et maillage fin des zones rurales.\n2. Accueil du public et recueil des déclarations.\n3. Renseignement opérationnel et sécurisation préventive.\n4. Traçabilité rigoureuse de la main courante et des registres officiels.`
      },
      {
        id: 'CHAP-TERR-102',
        moduleId: 'MOD-TERR-02',
        titre: 'Poste de Contrôle Routier et Dispositif d\'Interception',
        contenu: `Le contrôle routier obéit à une doctrine stricte pour garantir la sécurité des personnels et des usagers :\n1. Positionnement visible à distance (balisage rétro-réfléchissant, feux spéciaux).\n2. Rôle du guetteur/couvreur pour la protection armée du binôme de contrôle.\n3. Vérification méthodique des pièces administratives (permis, carte grise, assurance, visite technique).\n4. Attitude ferme, courtoise et professionnelle en toute circonstance.`
      },
      {
        id: 'CHAP-TERR-103',
        moduleId: 'MOD-TERR-03',
        titre: 'Cynotechnie & Équipes K9 en Milieu Territorial',
        contenu: `Les équipes cynotechniques de la Gendarmerie Royale apportent un appui spécialisé précieux :\n• Pistes et recherche de personnes égarées en milieu escarpé.\n• Recherche de substances illicites et explosifs lors des barrages routiers.\n• Protection et patrouille dissuasive lors de grands rassemblements.`
      }
    ],
    supportsPedagogiques: [
      { titre: 'Manuel de Surveillance Territoriale & Patrouille', type: 'PDF', taille: '2.4 Mo' },
      { titre: 'Guide Réglementaire du Contrôle Routier et Balisage', type: 'PDF', taille: '1.8 Mo' },
      { titre: 'Fiche Réflexe : Constat d\'Infraction Environnementale', type: 'FICHE', taille: '750 Ko' }
    ],
    exercices: [
      {
        id: 'EX-TERR-01',
        type: 'QCM',
        titre: 'Cadre d\'intervention de la patrouille territoriale',
        question: 'Lors d\'un contrôle routier nocturne, quelle est la priorité immédiate du binôme de gendarmerie ?',
        options: [
          'La rapidité de vérification sans balisage lumineux',
          'La sécurisation de la zone de contrôle et la visibilité du dispositif',
          'L\'immobilisation immédiate de tout véhicule suspect',
          'La rédaction du procès-verbal avant la vérification des pièces'
        ],
        reponseCorrecte: 1,
        explication: 'La sécurité des gendarmes et des usagers prime : balisage lumineux, port des chasubles rétro-réfléchissantes et éclairage de la zone sont obligatoires.'
      },
      {
        id: 'EX-TERR-02',
        type: 'ORDERING',
        titre: 'Procédure séquentielle d\'installation d\'un poste de contrôle routier',
        etapes: [
          'Reconnaissance du site (visibilité, zone de dégagement sécurisée)',
          'Pose des panneaux de présignalisation à distance réglementaire',
          'Mise en place du binôme avec désignation du rôle de couverture',
          'Début des vérifications de flux dans le respect des consignes'
        ]
      }
    ],
    testConnaissances: {
      titre: 'Évaluation des Fondamentaux Territoriaux',
      questionsCount: 10,
      duree: '15 min',
      seuil: 12
    },
    examenFinal: {
      titre: 'Examen Certifié : Maîtrise des Missions de Gendarmerie Territoriale',
      code: 'EXAM-TERR-FINAL',
      dureeMinutes: 30,
      nombreQuestions: 20,
      seuilReussite: 12,
      baremePoints: 20
    },
    competencesCibles: [
      'Sens aigu de la proximité et relation de confiance citoyenne',
      'Vigilance opérationnelle et sang-froid en contrôle routier',
      'Respect scrupuleux du cadre juridique et déontologique',
      'Capacité d\'adaptation au milieu rural et périurbain'
    ],
    orientationImpact: {
      specialiteCode: 'SPEC-INFO',
      scoreCompatibilityBase: 92,
      profilRecherche: 'Profil polyvalent, autonome, doté d\'une excellente présentation militaire et d\'un sens prononcé du service public.'
    }
  },

  // ============================================================================
  // 2. GENDARMERIE MOBILE (الدرك الملكي المتنقل)
  // ============================================================================
  {
    id: 'SPEC-MOB',
    code: 'GEND-MOB',
    nomFr: 'Gendarmerie Mobile',
    nomAr: 'الدرك الملكي المتنقل',
    devise: 'Discipline collective, cohésion et engagement républicain',
    couleur: 'blue',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
    accentColor: '#1C3D5A',
    icone: 'Users',
    image: {
      url: '/images/ateliers/gendarmerie-mobile.webp',
      fallbackUrl: '/images/ateliers/gendarmerie-mobile.jpg',
      caption: 'Unité de gendarmerie mobile en uniforme vert en formation professionnelle et discipline collective',
      alt: 'Gendarmerie Mobile - Unité professionnelle en formation'
    },
    presentation: `La Gendarmerie Mobile est la force de réserve générale et de manœuvre du Commandement. Capable de se déployer sans délai sur l'ensemble du Royaume, elle assure le maintien et le rétablissement de l'ordre public, le soutien opérationnel aux unités territoriales lors d'événements majeurs et la gestion des situations de crise.`,
    missions: [
      'Organisation et structure des groupes, pelotons et escadrons mobiles',
      'Missions de soutien opérationnel et renfort temporaire aux unités territoriales',
      'Discipline militaire, travail d\'équipe synchronisé et cohésion de rang',
      'Gestion maîtrisée et graduée des situations de crise et grands rassemblements',
      'Cadre juridique strict des interventions et respect de la proportionnalité',
      'Communication radio tactique et coordination inter-unités en mouvement'
    ],
    objectifsPedagogiques: [
      'Assimiler les commandements et formations collectives de manœuvre (colonne, ligne, carré)',
      'Comprendre la graduation de la réponse opérationnelle et l\'emploi de la force',
      'Développer une discipline collective irréprochable sous forte sollicitation',
      'Maîtriser les procédures de compte-rendu radio en situation dynamique'
    ],
    modules: [
      {
        id: 'MOD-MOB-01',
        titre: 'Organisation & Cadre Légal du Maintien de l\'Ordre',
        duree: '3h 00min',
        chapitresCount: 3,
        difficulte: 'Fondamental'
      },
      {
        id: 'MOD-MOB-02',
        titre: 'Formations Collectives & Mouvements Coordonnés',
        duree: '4h 30min',
        chapitresCount: 4,
        difficulte: 'Avancé'
      },
      {
        id: 'MOD-MOB-03',
        titre: 'Gestion de Crise & Rétablissement de l\'Ordre',
        duree: '3h 30min',
        chapitresCount: 3,
        difficulte: 'Avancé'
      }
    ],
    chapitresDetailles: [
      {
        id: 'CHAP-MOB-101',
        moduleId: 'MOD-MOB-01',
        titre: 'Le Cadre Légal et les Principes Fondamentaux de la Manœuvre',
        contenu: `Toute action de maintien de l'ordre public s'exécute sous le contrôle de l'autorité légale et respecte trois principes constitutionnels :\n1. Nécessité : l'intervention doit être justifiée par la préservation de l'ordre.\n2. Proportionnalité : les moyens mis en œuvre doivent être strictement proportionnés à la menace.\n3. Réversibilité : cessation immédiate des contraintes dès le retour au calme.`
      },
      {
        id: 'CHAP-MOB-102',
        moduleId: 'MOD-MOB-02',
        titre: 'Formations et Manœuvres de Peloton',
        contenu: `L'efficacité de la gendarmerie mobile repose sur la géométrie des formations tactiques :\n• La colonne : pour le déplacement rapide et l'acheminement sous protection.\n• La ligne : pour barrer un axe ou repousser une foule sans rupture de contact.\n• Le coin ou la flèche : pour fendre une obstruction et sécuriser un point d'appui.`
      }
    ],
    supportsPedagogiques: [
      { titre: 'Doctrine Pédagogique du Maintien de l\'Ordre Public', type: 'PDF', taille: '3.1 Mo' },
      { titre: 'Schémas des Formations et Commandements de Peloton', type: 'SCHÉMA', taille: '1.2 Mo' },
      { titre: 'Mémento Déontologique de la Force Légitime', type: 'FICHE', taille: '500 Ko' }
    ],
    exercices: [
      {
        id: 'EX-MOB-01',
        type: 'QCM',
        titre: 'Principes d\'emploi de la force publique',
        question: 'Quel principe juridique impose d\'adapter strictement l\'action des forces de l\'ordre à la gravité de la situation ?',
        options: [
          'Le principe d\'immédiateté',
          'Le principe de proportionnalité',
          'Le principe de hiérarchie directe',
          'Le principe d\'autonomie des escadrons'
        ],
        reponseCorrecte: 1,
        explication: 'La proportionnalité est la règle centrale : la force employée ne doit jamais excéder ce qui est rigoureusement indispensable pour atteindre le but légitime.'
      }
    ],
    testConnaissances: {
      titre: 'Test Théorique : Formations et Cadre d\'Action Mobile',
      questionsCount: 10,
      duree: '15 min',
      seuil: 12
    },
    examenFinal: {
      titre: 'Examen Certifié : Tactique & Coordination Gendarmerie Mobile',
      code: 'EXAM-MOB-FINAL',
      dureeMinutes: 30,
      nombreQuestions: 20,
      seuilReussite: 12,
      baremePoints: 20
    },
    competencesCibles: [
      'Cohésion d\'équipe et rigueur collective sous pression',
      'Respect absolu des commandements et transmission d\'ordres clairs',
      'Sang-froid et maîtrise émotionnelle face à l\'hostilité',
      'Endurance physique et esprit de corps'
    ],
    orientationImpact: {
      specialiteCode: 'SPEC-GM',
      scoreCompatibilityBase: 88,
      profilRecherche: 'Profil robuste, très discipliné, démontrant un fort esprit de groupe et une excellente résistance au stress.'
    }
  },

  // ============================================================================
  // 3. GENDARMERIE MARITIME (الدرك الملكي البحري)
  // ============================================================================
  {
    id: 'SPEC-MARIT',
    code: 'GEND-MARIT',
    nomFr: 'Gendarmerie Maritime',
    nomAr: 'الدرك الملكي البحري',
    devise: 'Vigilance des côtes, souveraineté marine et secours au large',
    couleur: 'sky',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    accentColor: '#0C4A6E',
    icone: 'Anchor',
    image: {
      url: '/images/ateliers/gendarmerie-maritime.webp',
      fallbackUrl: '/images/ateliers/gendarmerie-maritime.jpg',
      caption: 'Bateau de patrouille maritime naviguant le long des côtes marocaines avec agents de surveillance',
      alt: 'Gendarmerie Maritime - Surveillance côtière et sauvetage en mer'
    },
    presentation: `La Gendarmerie Maritime exerce la souveraineté et la police de l'État sur les 3 500 kilomètres de façades maritimes atlantique et méditerranéenne du Royaume. Dotée de patrouilleurs hauturiers, vedettes rapides et embarcations d'interception, elle lutte contre les trafics maritimes, assure la police des pêches et participe aux opérations de recherche et sauvetage en mer (SAR).`,
    missions: [
      'Surveillance et protection de la souveraineté dans les eaux territoriales et la ZEE',
      'Sécurité côtière, contrôle des accès portuaires et des zones de mouillage',
      'Connaissances maritimes fondamentales : navigation, cartographie marine et météo',
      'Sécurité nautique, police des pêches et contrôle de la navigation de plaisance',
      'Sensibilisation au sauvetage, recherche et secours des personnes en détresse en mer (SAR)',
      'Protection de l\'environnement marin et répression des pollutions par hydrocarbures'
    ],
    objectifsPedagogiques: [
      'Identifier les zones maritimes réglementaires (Eaux territoriales, Zone contiguë, ZEE)',
      'Comprendre les fondamentaux de la navigation côtière et du balisage maritime IALA',
      'Appliquer les protocoles d\'interception et d\'arraisonnement de navires en mer',
      'Maîtriser la coordination avec les centres régionaux de surveillance et de sauvetage'
    ],
    modules: [
      {
        id: 'MOD-MARIT-01',
        titre: 'Droit Maritime & Souveraineté Côtière',
        duree: '3h 30min',
        chapitresCount: 3,
        difficulte: 'Fondamental'
      },
      {
        id: 'MOD-MARIT-02',
        titre: 'Navigation, Balisage & Sécurité Nautique',
        duree: '4h 00min',
        chapitresCount: 4,
        difficulte: 'Intermédiaire'
      },
      {
        id: 'MOD-MARIT-03',
        titre: 'Opérations de Sauvetage en Mer (SAR) & Police des Pêches',
        duree: '3h 30min',
        chapitresCount: 3,
        difficulte: 'Avancé'
      }
    ],
    chapitresDetailles: [
      {
        id: 'CHAP-MARIT-101',
        moduleId: 'MOD-MARIT-01',
        titre: 'Découpage des Espaces Maritimes et Compétences Juridiques',
        contenu: `Conformément à la Convention des Nations Unies sur le droit de la mer (Montego Bay) :\n• Eaux intérieures : Souveraineté totale de l'État.\n• Eaux territoriales (jusqu'à 12 milles nautiques) : Souveraineté de l'État avec droit de passage inoffensif.\n• Zone contiguë (12 à 24 milles) : Contrôle douanier, fiscal, sanitaire et d'immigration.\n• Zone Économique Exclusive (jusqu'à 200 milles) : Droits souverains d'exploration et d'exploitation des ressources naturelles.`
      },
      {
        id: 'CHAP-MARIT-102',
        moduleId: 'MOD-MARIT-02',
        titre: 'Balisage Maritime IALA Région A',
        contenu: `Le Maroc applique le système de balisage maritime IALA Région A :\n• Marque latérale bâbord : Couleur rouge, voyant cylindrique, feux rouges (laissée à bâbord en entrant au port).\n• Marque latérale tribord : Couleur verte, voyant conique, feux verts (laissée à tribord en entrant au port).\n• Marques de danger isolé : Rayures horizontales noires et rouges, deux sphères superposées.`
      }
    ],
    supportsPedagogiques: [
      { titre: 'Guide du Balisage Maritime et Règles de Barre (RIPAM)', type: 'PDF', taille: '4.2 Mo' },
      { titre: 'Mémento de l\'Arraisonnement et Contrôle des Pêches', type: 'PDF', taille: '2.1 Mo' },
      { titre: 'Schéma d\'Organisation d\'une Mission SAR en Mer', type: 'SCHÉMA', taille: '1.5 Mo' }
    ],
    exercices: [
      {
        id: 'EX-MARIT-01',
        type: 'QCM',
        titre: 'Largeur des eaux territoriales',
        question: 'Quelle est la limite réglementaire de la mer territoriale mesurée depuis les lignes de base ?',
        options: [
          '6 milles nautiques',
          '12 milles nautiques (~22,2 km)',
          '24 milles nautiques',
          '200 milles nautiques'
        ],
        reponseCorrecte: 1,
        explication: 'Les eaux territoriales s\'étendent jusqu\'à 12 milles nautiques à partir des lignes de base, où s\'exerce la pleine souveraineté de l\'État.'
      }
    ],
    testConnaissances: {
      titre: 'Test Maritime : Espaces Côtiers et Réglementation Nautique',
      questionsCount: 10,
      duree: '15 min',
      seuil: 12
    },
    examenFinal: {
      titre: 'Examen Certifié : Sauvegarde & Police Maritime',
      code: 'EXAM-MARIT-FINAL',
      dureeMinutes: 30,
      nombreQuestions: 20,
      seuilReussite: 12,
      baremePoints: 20
    },
    competencesCibles: [
      'Sens de l\'orientation maritime et lecture cartographique',
      'Rigueur dans l\'application des règles internationales de navigation',
      'Sang-froid en environnement nautique et secours en mer',
      'Sensibilité à la protection des écosystèmes côtiers'
    ],
    orientationImpact: {
      specialiteCode: 'SPEC-MARIT',
      scoreCompatibilityBase: 85,
      profilRecherche: 'Profil attiré par le milieu marin, méthodique, vigilant et capable d\'évoluer sur des plateformes nautiques mobiles.'
    }
  },

  // ============================================================================
  // 4. GENDARMERIE AÉRIENNE (الدرك الملكي الجوي)
  // ============================================================================
  {
    id: 'SPEC-AIR',
    code: 'GEND-AIR',
    nomFr: 'Gendarmerie Aérienne',
    nomAr: 'الدرك الملكي الجوي',
    devise: 'Observation d\'altitude, rapidité d\'action et secours aéroporté',
    couleur: 'cyan',
    badgeClass: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    accentColor: '#0E7490',
    icone: 'Plane',
    image: {
      url: '/images/ateliers/gendarmerie-aerienne.webp',
      fallbackUrl: '/images/ateliers/gendarmerie-aerienne.jpg',
      caption: 'Hélicoptère effectuant une mission de surveillance et de recherche au-dessus des montagnes marocaines',
      alt: 'Gendarmerie Aérienne - Hélicoptère de surveillance en montagne'
    },
    presentation: `La Gendarmerie Aérienne met en œuvre la flotte d'hélicoptères et d'avions du Groupement Aérien de la Gendarmerie Royale. Elle intervient en appui tridimensionnel des unités au sol : surveillance des frontières, secours héliporté en haute montagne ou zones inondées, évacuations sanitaires d'urgence et guidage d'opérations complexes.`,
    missions: [
      'Présentation générale des missions aériennes d\'appui tactique et de sécurité',
      'Notions fondamentales d\'aéronautique : portance, météo aéronautique et sécurité des vols',
      'Surveillance aérienne des frontières, du littoral et des zones forestières',
      'Recherche et sauvetage aéroporté (SAR) et hélitreuillage en milieu hostile',
      'Sécurité aérienne, police des aérodromes et pistes d\'atterrissage isolées',
      'Connaissance technique des équipements de bord, caméras infrarouges et treuils'
    ],
    objectifsPedagogiques: [
      'Comprendre les conditions de sécurité pour l\'embarquement et le guidage sol-air d\'un hélicoptère',
      'Identifier les zones de danger autour d\'un aéronef à voilure tournante (rotor principal et rotor de queue)',
      'Connaître les signaux visuels standardisés de guidage d\'un pilote pour posé d\'urgence',
      'Assimiler les principes de la recherche aérienne par carroyage méthodique'
    ],
    modules: [
      {
        id: 'MOD-AIR-01',
        titre: 'Missions & Sécurité Aéronautique Fondamentale',
        duree: '3h 00min',
        chapitresCount: 3,
        difficulte: 'Fondamental'
      },
      {
        id: 'MOD-AIR-02',
        titre: 'Guidage Sol-Air & Aménagement d\'une DZ (Drop Zone)',
        duree: '3h 30min',
        chapitresCount: 3,
        difficulte: 'Intermédiaire'
      },
      {
        id: 'MOD-AIR-03',
        titre: 'Opérations de Sauvetage Héliporté & Hélitreuillage',
        duree: '4h 00min',
        chapitresCount: 4,
        difficulte: 'Avancé'
      }
    ],
    chapitresDetailles: [
      {
        id: 'CHAP-AIR-101',
        moduleId: 'MOD-AIR-01',
        titre: 'Zones de Danger et Consignes Vitales d\'Approche d\'un Hélicoptère',
        contenu: `L'approche d'un aéronef à voilure tournante exige une stricte discipline :\n1. Ne JAMAIS approcher par le secteur arrière : le rotor anticouple (rotor de queue) est invisible et mortel.\n2. Toujours approcher par l'avant dans le champ visuel du pilote, après son autorisation gestuelle.\n3. Avancer le buste penché pour maximiser la garde sous le disque du rotor principal.\n4. Sur terrain en pente, approcher impérativement par le côté aval (en bas de la pente).`
      },
      {
        id: 'CHAP-AIR-102',
        moduleId: 'MOD-AIR-02',
        titre: 'Choix et Préparation d\'une Zone de Poser d\'Urgence (DZ)',
        contenu: `Critères impératifs d'une zone d'atterrissage de fortune :\n• Dimensions minimales : 30 x 30 mètres dégagés d'arbres, câbles électriques et débris.\n• Pente du terrain inférieure à 5 degrés.\n• Déblaiement total des objets légers susceptibles d'être aspirés (effet de souffle/downwash).\n• Indication de la direction du vent au pilote (l'hélicoptère atterrit toujours face au vent).`
      }
    ],
    supportsPedagogiques: [
      { titre: 'Manuel de Guidage et Sécurité Autour des Hélicoptères', type: 'PDF', taille: '3.6 Mo' },
      { titre: 'Guide des Gestes Normalisés Sol-Air pour Poser d\'Aéronef', type: 'SCHÉMA', taille: '1.4 Mo' },
      { titre: 'Fiche Technique d\'Hélitreuillage de Blessé', type: 'FICHE', taille: '800 Ko' }
    ],
    exercices: [
      {
        id: 'EX-AIR-01',
        type: 'QCM',
        titre: 'Approche d\'un hélicoptère en terrain en pente',
        question: 'Sur un terrain incliné, par quel côté l\'équipe au sol doit-elle obligatoirement approcher l\'hélicoptère moteur tournant ?',
        options: [
          'Par le côté amont (en haut de la pente)',
          'Par le côté aval (en bas de la pente)',
          'Par l\'arrière sous le rotor de queue',
          'N\'importe quel côté tant que les yeux sont fermés'
        ],
        reponseCorrecte: 1,
        explication: 'L\'approche par l\'amont est formellement interdite car les pales du rotor principal peuvent descendre dangereusement près du sol. On approche toujours par l\'aval (en contrebas).'
      }
    ],
    testConnaissances: {
      titre: 'Test Aéronautique : Sécurité des Vols et Guidage Sol-Air',
      questionsCount: 10,
      duree: '15 min',
      seuil: 12
    },
    examenFinal: {
      titre: 'Examen Certifié : Sécurité Aérienne & Appui Héliporté',
      code: 'EXAM-AIR-FINAL',
      dureeMinutes: 30,
      nombreQuestions: 20,
      seuilReussite: 12,
      baremePoints: 20
    },
    competencesCibles: [
      'Rigueur absolue dans l\'application des consignes de sécurité aéronautique',
      'Précision gestuelle et clarté des transmissions sol-air',
      'Sang-froid dans les environnements à forte intensité mécanique',
      'Aptitude au travail coordonné en environnement tridimensionnel'
    ],
    orientationImpact: {
      specialiteCode: 'SPEC-GEH',
      scoreCompatibilityBase: 84,
      profilRecherche: 'Profil rigoureux, doté d\'une excellente perception spatiale, passionné d\'aéronautique et méthodique.'
    }
  },

  // ============================================================================
  // 5. PRÉVÔTÉ – GENDARMERIE MILITAIRE (الشرطة العسكرية والضابطة القضائية العسكرية)
  // ============================================================================
  {
    id: 'SPEC-PREV',
    code: 'GEND-PREV',
    nomFr: 'Prévôté – Gendarmerie Militaire',
    nomAr: 'الشرطة العسكرية والضابطة القضائية العسكرية',
    devise: 'Discipline des armes, probité juridique et accompagnement des forces',
    couleur: 'amber',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    accentColor: '#78350F',
    icone: 'Scale',
    image: {
      url: '/images/ateliers/prevote-militaire.webp',
      fallbackUrl: '/images/ateliers/prevote-militaire.jpg',
      caption: 'Officier prévôtal en uniforme dans un bureau militaire professionnel consultant des documents juridiques',
      alt: 'Prévôté - Gendarmerie Militaire et Justice Militaire'
    },
    presentation: `La Prévôté est la formation de la Gendarmerie Royale chargée d'exercer la police militaire et judiciaire auprès des Forces Armées Royales (FAR), tant sur le territoire national que lors des détachements ou missions internationales de maintien de la paix. Elle veille au respect du Code de justice militaire, à la discipline générale et à la protection des installations militaires.`,
    missions: [
      'Notions de droit militaire et Code de justice militaire',
      'Organisation générale de la prévôté et statut des forces armées',
      'Cadre juridique des enquêtes militaires et police judiciaire aux armées',
      'Missions d\'accompagnement et de sécurisation des unités militaires en manœuvre ou déploiement',
      'Discipline, tenue, déontologie et responsabilités des militaires',
      'Procédures administratives générales, enquêtes de commandement et constats techniques'
    ],
    objectifsPedagogiques: [
      'Distinguer les compétences de la juridiction militaire et des tribunaux ordinaires',
      'Comprendre le rôle du détachement prévôtal auprès d\'un état-major de secteur',
      'Maîtriser les règles de déontologie militaire et la rédaction des procès-verbaux prévôtaux',
      'Assurer la traçabilité des constatations administratives et disciplinaires'
    ],
    modules: [
      {
        id: 'MOD-PREV-01',
        titre: 'Organisation de la Prévôté & Droit Militaire',
        duree: '3h 30min',
        chapitresCount: 3,
        difficulte: 'Fondamental'
      },
      {
        id: 'MOD-PREV-02',
        titre: 'Police Judiciaire aux Armées & Enquêtes',
        duree: '4h 00min',
        chapitresCount: 4,
        difficulte: 'Intermédiaire'
      },
      {
        id: 'MOD-PREV-03',
        titre: 'Discipline Générale & Procédures Administratives',
        duree: '3h 00min',
        chapitresCount: 3,
        difficulte: 'Intermédiaire'
      }
    ],
    chapitresDetailles: [
      {
        id: 'CHAP-PREV-101',
        moduleId: 'MOD-PREV-01',
        titre: 'Le Rôle du Gendarme Prévôtal auprès des Forces Armées',
        contenu: `Le détachement prévôtal remplit une mission d'équilibre et de garantie de la légalité :\n1. Conseil juridique du commandement militaire sur le terrain.\n2. Police de la circulation militaire lors des convois régimentaires.\n3. Constatation des infractions militaires (désertion, insubordination, négligence de matériel).\n4. Surveillance de l'armement, des dépôts de munitions et de la sécurité d'enceinte.`
      },
      {
        id: 'CHAP-PREV-102',
        moduleId: 'MOD-PREV-02',
        titre: 'Rédaction des Actes et Procédures Prévôtales',
        contenu: `La rigueur formelle d'un procès-verbal prévôtal conditionne la validité des poursuites devant le Tribunal Militaire :\n• Précision chronologique absolue des constatations.\n• Mention expresse de la qualité militaire des témoins et mis en cause (grade, matricule, unité d'appartenance).\n• Neutralité rédactionnelle, sans appréciation subjective.`
      }
    ],
    supportsPedagogiques: [
      { titre: 'Précis de Droit Militaire et Procédure Prévôtale', type: 'PDF', taille: '2.8 Mo' },
      { titre: 'Formulaire Officiel des Enquêtes de Commandement', type: 'FICHE', taille: '900 Ko' },
      { titre: 'Guide de la Circulation des Convois Militaires', type: 'PDF', taille: '1.7 Mo' }
    ],
    exercices: [
      {
        id: 'EX-PREV-01',
        type: 'QCM',
        titre: 'Attribution de la prévôté en opération',
        question: 'Quelle est la mission essentielle d\'un détachement prévôtal accompagnant un bataillon des FAR ?',
        options: [
          'Assurer le ravitaillement alimentaire des unités',
          'Exercer la police militaire, veiller à la discipline et constater les infractions',
          'Prendre le commandement direct des troupes au combat',
          'Gérer le budget financier du bataillon'
        ],
        reponseCorrecte: 1,
        explication: 'La prévôté exerce la police judiciaire aux armées et la police de discipline générale sous l\'autorité du commandement militaire et de la justice militaire.'
      }
    ],
    testConnaissances: {
      titre: 'Test Prévôté : Cadre Légal et Déontologie Militaire',
      questionsCount: 10,
      duree: '15 min',
      seuil: 12
    },
    examenFinal: {
      titre: 'Examen Certifié : Discipline, Enquêtes & Droit Militaire',
      code: 'EXAM-PREV-FINAL',
      dureeMinutes: 30,
      nombreQuestions: 20,
      seuilReussite: 12,
      baremePoints: 20
    },
    competencesCibles: [
      'Rigueur juridique, impartialité et probité déontologique',
      'Maîtrise de la rédaction administrative et procédurale',
      'Respect scrupuleux de la hiérarchie militaire et des règlements',
      'Discrétion professionnelle et sens aigu de l\'équité'
    ],
    orientationImpact: {
      specialiteCode: 'SPEC-SEC-ADMIN',
      scoreCompatibilityBase: 86,
      profilRecherche: 'Profil posé, juridique, intègre, appréciant le droit, la procédure et la discipline formelle des armées.'
    }
  },

  // ============================================================================
  // 6. POLICE SCIENTIFIQUE ET TECHNIQUE (الشرطة التقنية والعلمية)
  // ============================================================================
  {
    id: 'SPEC-PST',
    code: 'GEND-PST',
    nomFr: 'Police Scientifique et Technique',
    nomAr: 'الشرطة التقنية والعلمية',
    devise: 'La science au service de la vérité, rigueur des indices et certitude de la preuve',
    couleur: 'purple',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
    accentColor: '#581C87',
    icone: 'Microscope',
    image: {
      url: '/images/ateliers/police-scientifique.webp',
      fallbackUrl: '/images/ateliers/police-scientifique.jpg',
      caption: 'Expert scientifique portant des gants et examinant des empreintes digitales dans un laboratoire moderne',
      alt: 'Police Scientifique et Technique - Analyse d\'empreintes et criminalistique'
    },
    presentation: `La Police Scientifique et Technique (PST) de la Gendarmerie Royale intervient sur les scènes d'infractions graves et d'incidents complexes. Rattachée aux Brigades de Recherches et aux Laboratoires de Criminalistique, elle met en œuvre des technologies de pointe pour figer la scène, révéler les traces invisibles, identifier les auteurs et apporter des preuves matérielles indiscutables à la justice.`,
    missions: [
      'Introduction aux principes fondamentaux de la criminalistique moderne',
      'Préservation inviolable des scènes d\'incident et gel des lieux',
      'Recherche, révélation et identification des traces papillaires et biologiques (ADN)',
      'Dactyloscopie : relevé, encrage et comparaison des empreintes digitales',
      'Photographie technique métrique et relevé de plan à l\'échelle',
      'Principes de balistique légale, toxicologie et analyse des micro-traces',
      'Traçabilité scrupuleuse, conditionnement des scellés et chaîne de conservation de la preuve'
    ],
    objectifsPedagogiques: [
      'Connaître les protocoles d\'interdiction d\'accès et de gel d\'une scène de crime',
      'Appliquer les techniques de prélèvement d\'empreintes papillaires sans pollution',
      'Maîtriser le conditionnement et l\'étiquetage sécurisé d\'un scellé judiciaire',
      'Comprendre la valeur probante d\'un faisceau d\'indices matériels devant le tribunal'
    ],
    modules: [
      {
        id: 'MOD-PST-01',
        titre: 'Gel des Lieux & Préservation de la Scène',
        duree: '3h 30min',
        chapitresCount: 3,
        difficulte: 'Fondamental'
      },
      {
        id: 'MOD-PST-02',
        titre: 'Relevé de Traces, Dactyloscopie & Photographie Métrique',
        duree: '4h 30min',
        chapitresCount: 4,
        difficulte: 'Intermédiaire'
      },
      {
        id: 'MOD-PST-03',
        titre: 'Chaîne de Traçabilité des Scellés & Laboratoire',
        duree: '3h 30min',
        chapitresCount: 3,
        difficulte: 'Avancé'
      }
    ],
    chapitresDetailles: [
      {
        id: 'CHAP-PST-101',
        moduleId: 'MOD-PST-01',
        titre: 'Le Principe de Locard et le Gel Méthodique de la Scène',
        contenu: `Le postulat de base de la police technique repose sur le principe d'échange d'Edmond Locard : « Tout criminel laisse des traces de son passage et emporte des traces du lieu ».\n\nRègles fondamentales du premier intervenant :\n1. Geler immédiatement les lieux et refouler toute personne non qualifiée (rubanage périmétrique).\n2. Ne rien toucher, ne rien déplacer, ne rien ajouter.\n3. Créer un cheminement unique d'accès pour préserver les poussières, empreintes et fibres.\n4. Porter obligatoirement combinaison, gants et couvre-chaussures pour éviter l'auto-pollution.`
      },
      {
        id: 'CHAP-PST-102',
        moduleId: 'MOD-PST-02',
        titre: 'Révélation et Relevé des Empreintes Papillaires',
        contenu: `Techniques courantes de dactyloscopie sur le terrain :\n• Surfaces lisses non poreuses (verre, métal) : Poudre d'oxyde noir ou magnétique appliquée au pinceau en poils de marabout.\n• Surfaces poreuses (papier, carton) : Révélation chimique en laboratoire (ninhydrine, DFO).\n• Comparaison : Recherche des points caractéristiques (minuties : arrêts de crête, bifurcations, îlots) avec seuil d'identification certifié.`
      }
    ],
    supportsPedagogiques: [
      { titre: 'Guide Officiel du Premier Intervenant sur Scène de Crime', type: 'PDF', taille: '3.4 Mo' },
      { titre: 'Fiche Technique de Conditionnement des Scellés ADN et Biologiques', type: 'FICHE', taille: '1.1 Mo' },
      { titre: 'Atlas des Minuties Dactyloscopiques', type: 'SCHÉMA', taille: '2.0 Mo' }
    ],
    exercices: [
      {
        id: 'EX-PST-01',
        type: 'QCM',
        titre: 'Règle primordiale du premier gendarme sur une scène',
        question: 'Quelle est la première action impérative d\'une patrouille arrivant sur une scène d\'incident grave ?',
        options: [
          'Nettoyer le sol pour faciliter l\'accès des secours',
          'Geler immédiatement les lieux, interdire les accès et préserver l\'intégrité des traces',
          'Rechercher immédiatement les empreintes digitales sans équipement',
          'Déplacer les objets compromettants vers la brigade'
        ],
        reponseCorrecte: 1,
        explication: 'Le gel des lieux est la priorité absolue : aucune trace ne doit être altérée, déplacée ou polluée avant l\'arrivée des techniciens en identification criminelle.'
      }
    ],
    testConnaissances: {
      titre: 'Test Criminalistique : Gestion de Scène et Scellés',
      questionsCount: 10,
      duree: '15 min',
      seuil: 12
    },
    examenFinal: {
      titre: 'Examen Certifié : Police Technique & Criminalistique',
      code: 'EXAM-PST-FINAL',
      dureeMinutes: 30,
      nombreQuestions: 20,
      seuilReussite: 12,
      baremePoints: 20
    },
    competencesCibles: [
      'Rigueur scientifique, sens de l\'observation et minutie extrême',
      'Patience et respect absolu des protocoles méthodologiques',
      'Capacité d\'analyse logique et déduction cartésienne',
      'Tenue irréprochable de la traçabilité des preuves matérielles'
    ],
    orientationImpact: {
      specialiteCode: 'SPEC-PJ',
      scoreCompatibilityBase: 94,
      profilRecherche: 'Profil analytique, minutieux, curieux et scientifique, passionné par la recherche de la vérité matérielle.'
    }
  },

  // ============================================================================
  // 7. UNITÉS D'INTERVENTION ET SPÉCIALISÉES (وحدات التدخل والفرق الخاصة)
  // ============================================================================
  {
    id: 'SPEC-INTERV',
    code: 'GEND-INTERV',
    nomFr: 'Unités d\'Intervention et Spécialisées',
    nomAr: 'وحدات التدخل والفرق الخاصة',
    devise: 'Rigueur absolue, audace maîtrisée et dévouement au devoir',
    couleur: 'red',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
    accentColor: '#991B1B',
    icone: 'Crosshair',
    image: {
      url: '/images/ateliers/unites-intervention.webp',
      fallbackUrl: '/images/ateliers/unites-intervention.jpg',
      caption: 'Équipe spécialisée en uniforme vert participant à un entraînement physique collectif au centre de formation',
      alt: 'Unités d\'Intervention - Entraînement tactique et physique collectif'
    },
    presentation: `Les Unités d'Intervention et Spécialisées (GSI, Pelotons d'Intervention) constituent le fer de lance de la Gendarmerie Royale pour faire face aux situations d'urgence extrême et de criminalité armée. Elles sont formées aux plus hauts standards d'excellence physique, de tir de haute précision, de progression tactique en milieu confiné et de négociation de crise.`,
    missions: [
      'Présentation générale des missions d\'intervention spécialisée et de protection rapprochée',
      'Préparation physique exigeante, aguerrissement et rusticité militaire',
      'Discipline opérationnelle, respect absolu des ordres et engagement collectif',
      'Travail en équipe synchronisé, binômes tactiques et communication silencieuse',
      'Communication sous stress et coordination avec le poste de commandement',
      'Gestion du stress, contrôle émotionnel et prise de décision rapide',
      'Cadre légal de la légitime défense, règles d\'engagement et déontologie de l\'action',
      'Premiers secours tactiques en situation opérationnelle (TCCC / Sauvetage au combat)'
    ],
    objectifsPedagogiques: [
      'Comprendre le cadre juridique de la légitime défense (article 124 du Code pénal)',
      'Assimiler les principes de progression tactique en binôme (appui mutuel, secteurs de tir)',
      'Maîtriser les gestes d\'urgence de premiers secours opérationnels (garrot tactique, pansement compressif)',
      'Développer la lucidité et la maîtrise de soi dans des environnements saturés de stress'
    ],
    modules: [
      {
        id: 'MOD-INTERV-01',
        titre: 'Cadre Légal de la Force & Déontologie de l\'Intervention',
        duree: '3h 00min',
        chapitresCount: 3,
        difficulte: 'Fondamental'
      },
      {
        id: 'MOD-INTERV-02',
        titre: 'Principes Tactiques de Déplacement & Progression',
        duree: '4h 00min',
        chapitresCount: 4,
        difficulte: 'Avancé'
      },
      {
        id: 'MOD-INTERV-03',
        titre: 'Premiers Secours Tactiques & Maîtrise du Stress',
        duree: '4h 30min',
        chapitresCount: 4,
        difficulte: 'Avancé'
      }
    ],
    chapitresDetailles: [
      {
        id: 'CHAP-INTERV-101',
        moduleId: 'MOD-INTERV-01',
        titre: 'Le Cadre Juridique de la Légitime Défense',
        contenu: `L'usage des armes est strictement encadré par la loi et ne peut intervenir que dans le respect des conditions cumulatives de la légitime défense :\n1. Agression actuelle ou imminente, injuste et dirigée contre soi-même ou autrui.\n2. Nécessité absolue de la riposte : aucun autre moyen n'est possible.\n3. Proportionnalité de la riposte : la réponse ne doit pas être disproportionnée face à la gravité de la menace.\n4. Concomitance : l'action cesse immédiatement dès que le danger est neutralisé.`
      },
      {
        id: 'CHAP-INTERV-102',
        moduleId: 'MOD-INTERV-03',
        titre: 'Secourisme Tactique au Combat (TCCC)',
        contenu: `Les premiers gestes qui sauvent en situation opérationnelle :\n• Pose immédiate du garrot tourniquet artériel en cas d'hémorragie massive aux membres.\n• Dégagement d'urgence du blessé sous couverture armée du binôme.\n• Position Latérale de Sécurité (PLS) et maintien de la perméabilité des voies aériennes.\n• Alerte médicale codée précisant la localisation, le nombre de victimes et la sécurisation du site.`
      }
    ],
    supportsPedagogiques: [
      { titre: 'Mémento des Gestes de Premiers Secours Opérationnels', type: 'PDF', taille: '2.9 Mo' },
      { titre: 'Doctrine de la Légitime Défense et Règles d\'Engagement', type: 'PDF', taille: '1.9 Mo' },
      { titre: 'Schémas des Secteurs de Tir et Progression en Binôme', type: 'SCHÉMA', taille: '1.3 Mo' }
    ],
    exercices: [
      {
        id: 'EX-INTERV-01',
        type: 'QCM',
        titre: 'Condition d\'ouverture du feu en légitime défense',
        question: 'Quelle condition est indispensable pour que la légitime défense soit reconnue ?',
        options: [
          'L\'accord préalable écrit du procureur',
          'Une agression actuelle, injuste, avec une riposte strictement nécessaire et proportionnée',
          'L\'usage exclusif d\'un armement de calibre inférieur',
          'Une sommation verbale répétée au moins dix fois'
        ],
        reponseCorrecte: 1,
        explication: 'La légitime défense exige la concomitance (danger immédiat), la nécessité absolue et la stricte proportionnalité de la riposte.'
      }
    ],
    testConnaissances: {
      titre: 'Test d\'Aptitude Tactique & Déontologie d\'Intervention',
      questionsCount: 10,
      duree: '15 min',
      seuil: 12
    },
    examenFinal: {
      titre: 'Examen Certifié : Intervention Spécialisée, Secours & Maîtrise Opérationnelle',
      code: 'EXAM-INTERV-FINAL',
      dureeMinutes: 30,
      nombreQuestions: 20,
      seuilReussite: 12,
      baremePoints: 20
    },
    competencesCibles: [
      'Sang-froid exemplaire et résistance psychologique extrême',
      'Dextérité opérationnelle et réflexes de sécurité sans faille',
      'Solidarité absolue et confiance aveugle dans le binôme',
      'Maîtrise des gestes de secours d\'urgence sous menace'
    ],
    orientationImpact: {
      specialiteCode: 'SPEC-GSI',
      scoreCompatibilityBase: 90,
      profilRecherche: 'Profil d\'élite, sportif émérite, d\'une moralité et d\'un sang-froid exemplaires, hautement dévoué.'
    }
  }
];

/**
 * Utilitaires d'accès aux données des spécialités
 */
export function getSpecialtyById(id) {
  return GENDARMERIE_SPECIALTIES.find((s) => s.id === id || s.code === id) || null;
}

export function getAllSpecialtiesSummary() {
  return GENDARMERIE_SPECIALTIES.map((s) => ({
    id: s.id,
    code: s.code,
    nomFr: s.nomFr,
    nomAr: s.nomAr,
    devise: s.devise,
    couleur: s.couleur,
    badgeClass: s.badgeClass,
    accentColor: s.accentColor,
    icone: s.icone,
    image: s.image,
    modulesCount: s.modules?.length || 0,
    chapitresCount: s.chapitresDetailles?.length || 0,
    supportsCount: s.supportsPedagogiques?.length || 0,
    exercicesCount: s.exercices?.length || 0,
    examenFinal: s.examenFinal
  }));
}

