// ==============================================================================
// ORIENT-GR — Académie Numérique Interactive des Ateliers Pratiques
// Banque de contenus pédagogiques, images réelles, exercices et simulations
// ==============================================================================

/**
 * Photographies réelles professionnelles haute définition sélectionnées pour chaque atelier
 */
export const WORKSHOP_IMAGES = {
  // CAT A : Informatique & Réseaux
  'ATEL-INFO-01': {
    url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1200&q=80',
    caption: 'Diagnostic carte mère, composants électroniques et processeur d\'une station de travail',
    alt: 'Maintenance informatique et diagnostic carte mère'
  },
  'ATEL-INFO-02': {
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    caption: 'Baie de brassage, câblage RJ45 Cat6 et switch manageable de réseau tactique',
    alt: 'Câblage réseau et infrastructure serveur'
  },
  'ATEL-INFO-03': {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    caption: 'Analyse de données chiffrées, tableaux de bord de suivi opérationnel et tableurs',
    alt: 'Analyse et organisation de données bureautiques'
  },

  // CAT B : Mécanique & Automobile
  'ATEL-MECA-01': {
    url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
    caption: 'Bloc moteur thermique, circuit d\'allumage, injection et alternateur d\'un véhicule d\'intervention',
    alt: 'Diagnostic mécanique compartiment moteur'
  },
  'ATEL-MECA-02': {
    url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80',
    caption: 'Circuit de refroidissement moteur, radiateur, durites et vase d\'expansion',
    alt: 'Circuit de refroidissement automobile'
  },
  'ATEL-MECA-03': {
    url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
    caption: 'Valise de diagnostic électronique OBD-II et analyse des codes d\'anomalie DTC',
    alt: 'Diagnostic électronique automobile avec valise OBD'
  },

  // CAT C : Électronique & Télécommunications
  'ATEL-TEL-01': {
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    caption: 'Équipement émetteur-récepteur radio VHF/UHF tactique et station de télécommunications',
    alt: 'Station radio tactique de télécommunications'
  },
  'ATEL-TEL-02': {
    url: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1200&q=80',
    caption: 'Composants électroniques discrets, résistances, condensateurs et circuit imprimé PCB',
    alt: 'Composants électroniques et circuits intégrés'
  },
  'ATEL-TEL-03': {
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    caption: 'Laboratoire d\'analyse électronique, oscilloscope, multimètre numérique et générateur HF',
    alt: 'Maintenance et banc de mesure électronique'
  },

  // CAT D : Logistique & Maintenance
  'ATEL-LOG-01': {
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    caption: 'Entrepôt logistique militaire, rayonnages normalisés et gestion des matériels de dotation',
    alt: 'Magasin logistique et gestion des stocks'
  },
  'ATEL-LOG-02': {
    url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    caption: 'Maintenance des installations techniques, armoire électrique et sécurité du casernement',
    alt: 'Maintenance technique d\'infrastructure et électricité'
  },
  'ATEL-LOG-03': {
    url: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80',
    caption: 'Inventaire méthodique, étiquetage de traçabilité et vérification d\'armement et de matériel',
    alt: 'Contrôle d\'inventaire et audit de stock'
  }
};

/**
 * Données académiques exhaustives pour chaque atelier :
 * - Fiches de cours et schémas techniques
 * - Exercices variés (QCM, Hotspot image, Drag&Drop, Ordonnancement, Diagnostic)
 * - Scénario complet de simulation en 8 étapes
 */
export const WORKSHOP_ACADEMY_DATA = {
  // ============================================================================
  // ATEL-INFO-01 : Causes d'un ordinateur qui ne démarre pas
  // ============================================================================
  'ATEL-INFO-01': {
    code: 'ATEL-INFO-01',
    categorieId: 'CAT-INFO',
    domaine: 'Informatique & Réseaux',
    specialiteRecommandee: 'SPEC-INFO',
    specialiteLabel: 'Systèmes d\'Information & Cybersécurité',
    difficulte: 'MOYEN',
    dureeMinutes: 60,
    competencesRecherchees: [
      'Diagnostic méthodique de panne matérielle',
      'Maîtrise de l\'architecture interne d\'un ordinateur',
      'Interprétation des signaux sonores du BIOS (Beep Codes)',
      'Respect des règles de sécurité ESD (antistatique)'
    ],
    materielRequis: [
      { nom: 'Station informatique tactique démontable', desc: 'Unité centrale de travaux pratiques déconnectée', icon: 'Monitor' },
      { nom: 'Bracelet antistatique ESD avec pince crocodile', desc: 'Protection impérative des composants CMOS', icon: 'ShieldCheck' },
      { nom: 'Testeur d\'alimentation ATX numérique', desc: 'Mesure directe des tensions +12V, +5V, +3.3V et du Power Good', icon: 'Activity' },
      { nom: 'Jeu de tournevis d\'électricien isolés 1000V', desc: 'Démontage sécurisé du boîtier et cartes filles', icon: 'Wrench' },
      { nom: 'Multimètre numérique étalonné', desc: 'Contrôle de la pile bouton CMOS CR2032 (seuil nominal 3.0V)', icon: 'Activity' }
    ],
    cours: {
      titre: 'Architecture Matérielle & Méthodologie de Diagnostic POST',
      description: 'Comprendre la chaîne séquentielle de mise sous tension d\'un micro-ordinateur de dotation.',
      fiches: [
        {
          id: 'FICHE-1',
          titre: '1. Séquence de démarrage matérielle (Power-On Sequence)',
          contenu: `Lors de l'appui sur le bouton Power, le bloc d'alimentation (PSU) stabilise les tensions internes puis envoie le signal "Power Good" (+5V) à la carte mère. Dès réception, le processeur initialise son compteur ordinal et charge le micrologiciel UEFI/BIOS pour entamer le POST (Power-On Self-Test).`,
          pointsCles: [
            'Signal Power Good : doit être stable entre 100ms et 500ms.',
            'POST : vérification séquentielle Processeur -> Mémoire RAM -> Carte graphique -> Stockage.',
            'Absence totale de voyant : vérifier cordon secteur, bloc PSU et fusible interne.'
          ]
        },
        {
          id: 'FICHE-2',
          titre: '2. Interprétation des Bip-Codes et Voyants LED (Q-LED)',
          contenu: `Lorsque l'affichage à l'écran est absent, le BIOS communique la cause du blocage via le haut-parleur interne (Buzzer) ou les voyants LED de diagnostic intégrés à la carte mère :`,
          tableau: [
            { signal: '1 Bip court', signification: 'POST validé avec succès (Démarrage normal)', action: 'Attente du bootloader OS' },
            { signal: '1 Long + 2 Courts', signification: 'Échec initialisation carte graphique / écran', action: 'Vérifier alimentation PCIe et port HDMI/DP' },
            { signal: 'Bips continus', signification: 'Défaut de barrette mémoire vive (RAM)', action: 'Dépoussiérer les slots DIMM, tester barrette par barrette' },
            { signal: 'Silence absolu + ventilateurs à l\'arrêt', signification: 'Alimentation HS ou court-circuit carte mère', action: 'Test au trombone / Testeur ATX' }
          ]
        },
        {
          id: 'FICHE-3',
          titre: '3. Sécurité opérationnelle & Protection ESD',
          contenu: `Une décharge électrostatique de seulement 100 Volts (imperceptible par l'homme) peut détruire la grille d'un transistor de mémoire vive ou de chipset. Le port du bracelet antistatique relié au châssis métallique est obligatoire.`,
          astuceInstructeur: `Astuce terrain : Avant tout démontage, débranchez le câble 230V et maintenez le bouton Power enfoncé pendant 10 secondes pour décharger les condensateurs haute capacité de l'alimentation.`
        }
      ],
      schemaInteractif: {
        titre: 'Carte Mère ATX Tactique — Implantation des Organes Clés',
        composants: [
          { id: 'cpu', nom: 'Socket Processeur (CPU)', desc: 'Unité centrale de traitement avec dissipateur thermique et ventilateur PWM' },
          { id: 'ram', nom: 'Slots Mémoire RAM (DDR4/DDR5)', desc: 'Emplacements pour barrettes mémoires avec détrompeur central' },
          { id: 'pcie', nom: 'Port d\'extension PCIe x16', desc: 'Emplacement haute vitesse pour carte graphique ou accélérateur' },
          { id: 'psu', nom: 'Connecteur d\'Alimentation ATX 24 broches', desc: 'Fournit les tensions continues principales (+12V, +5V, +3.3V, +5VSB)' },
          { id: 'cmos', nom: 'Pile bouton CMOS (CR2032)', desc: 'Alimente l\'horloge RTC et la mémoire non volatile des paramètres BIOS' },
          { id: 'front_panel', nom: 'Connecteurs du panneau avant (Front Panel)', desc: 'Broches Power SW, Reset SW, Power LED et HDD LED' }
        ]
      }
    },
    exercices: [
      {
        id: 'EX-QCM-1',
        type: 'qcm',
        titre: 'Exercice 1 : Diagnostic des Bip-Codes du BIOS',
        consigne: 'Une unité centrale tactique émet 1 bip long suivi de 2 bips courts à l\'allumage et l\'écran reste noir. Quel est le composant défaillant ?',
        options: [
          { id: 'a', label: 'Le disque dur SSD NVMe est saturé', correct: false },
          { id: 'b', label: 'La carte graphique (GPU) ou sa liaison vidéo est en défaut', correct: true, explication: 'Conformément aux normes AMI/Award BIOS, 1 bip long et 2 bips courts désignent spécifiquement une défaillance vidéo.' },
          { id: 'c', label: 'Le clavier USB n\'est pas détecté', correct: false },
          { id: 'd', label: 'La pile CR2032 est manquante', correct: false }
        ]
      },
      {
        id: 'EX-HOTSPOT-1',
        type: 'hotspot',
        titre: 'Exercice 2 : Identification sur Schéma Carte Mère',
        consigne: 'Cliquez sur l\'organe qui fournit l\'alimentation électrique principale (24 broches) à l\'ensemble de la carte mère.',
        hotspots: [
          { id: 'cpu', label: 'Socket Processeur (CPU)', x: 38, y: 30, correct: false },
          { id: 'ram', label: 'Slots RAM DDR4', x: 68, y: 28, correct: false },
          { id: 'psu_24p', label: 'Connecteur d\'alimentation ATX 24 broches', x: 86, y: 40, correct: true, explication: 'Exact ! C\'est le connecteur ATX 24 broches qui reçoit le faisceau principal du bloc d\'alimentation.' },
          { id: 'pcie_x16', label: 'Slot PCIe x16', x: 35, y: 68, correct: false },
          { id: 'cmos_batt', label: 'Pile bouton CR2032', x: 58, y: 72, correct: false }
        ]
      },
      {
        id: 'EX-DRAG-1',
        type: 'association',
        titre: 'Exercice 3 : Association Outils & Rôles Techniques',
        consigne: 'Associez chaque équipement de maintenance à son utilisation appropriée lors du dépannage.',
        paires: [
          { id: 'p1', item: 'Testeur d\'alimentation ATX', cible: 'Vérifier la présence du 12V, 5V et le signal Power Good' },
          { id: 'p2', item: 'Bracelet antistatique ESD', cible: 'Écouler les charges électrostatiques vers la terre' },
          { id: 'p3', item: 'Multimètre sur tension continue DC', cible: 'Mesurer la tension de la pile CMOS (doit être >= 3.0V)' },
          { id: 'p4', item: 'Cavalier CLRTC (Clear CMOS)', cible: 'Réinitialiser les paramètres du BIOS aux réglages d\'usine' }
        ]
      },
      {
        id: 'EX-ORDER-1',
        type: 'ordonnancement',
        titre: 'Exercice 4 : Chronologie de la Procédure de Diagnostic',
        consigne: 'Remettez les étapes de prise en charge d\'un PC qui ne démarre pas dans l\'ordre chronologique réglementaire :',
        etapes: [
          { id: 's1', texte: 'Débrancher le câble secteur 230V et équiper le bracelet antistatique ESD', ordreCorrect: 1 },
          { id: 's2', texte: 'Inspecter visuellement l\'intérieur (câbles débranchés, condensateurs gonflés)', ordreCorrect: 2 },
          { id: 's3', texte: 'Tester le bloc d\'alimentation à vide ou avec le testeur numérique ATX', ordreCorrect: 3 },
          { id: 's4', texte: 'Isoler la carte mère en configuration minimale (CPU + 1 barrette RAM)', ordreCorrect: 4 },
          { id: 's5', texte: 'Consigner les résultats et anomalies sur la fiche d\'intervention militaire', ordreCorrect: 5 }
        ]
      },
      {
        id: 'EX-DIAG-1',
        type: 'diagnostic',
        titre: 'Exercice 5 : Cas Pratique de Dépannage Réel',
        situation: 'L\'utilisateur militaire appuie sur le bouton Power. Les ventilateurs tournent à fond pendant 2 secondes puis tout s\'arrête net. Le voyant CPU de la carte mère clignote en rouge. L\'écran reste noir.',
        questions: [
          {
            id: 'q1',
            question: 'Quelle est la première hypothèse technique la plus probable ?',
            options: [
              'Le câble réseau est déconnecté',
              'Défaut d\'alimentation du CPU (connecteur 4/8 broches ATX 12V non branché ou court-circuit VRM)',
              'Le système d\'exploitation Windows a planté',
              'L\'écran est en veille'
            ],
            bonneReponseIndex: 1,
            explication: 'La coupure immédiate avec voyant CPU rouge indique une mise en sécurité de l\'étage d\'alimentation VRM ou l\'oubli du connecteur auxiliaire 12V CPU.'
          }
        ]
      }
    ],
    simulation: {
      titre: 'Mission Numérique : Dépannage en Urgence du Terminal SIC de Transmission',
      contexte: 'Au poste de commandement de compagnie, le terminal principal de gestion des transmissions tactiques refuse de s\'allumer juste avant le point de situation opérationnel.',
      etapes: [
        {
          numero: 1,
          titre: '1. Présentation de la Situation Opérationnelle',
          instructions: 'Prenez connaissance du rapport transmis par l\'opérateur radio et analysez l\'environnement du matériel.',
          details: 'L\'adjudant de transmission indique : "Après un orage la nuit dernière, le voyant de la multiprise était allumé mais la station ne répond pas du tout à l\'appui sur le bouton ON."',
          actions: ['Lire le rapport d\'incident', 'Vérifier la conformité de l\'alimentation secteur']
        },
        {
          numero: 2,
          titre: '2. Observation des Symptômes Initiaux',
          instructions: 'Inspectez visuellement la face arrière et avant de la station de travail.',
          symptomesObserves: [
            'Voyant vert de veille du bloc d\'alimentation à l\'arrière : ÉTEINT',
            'Aucun bruit de ventilateur ni de disque dur',
            'Câble d\'alimentation 230V fermement enclenché dans la prise murale ondulée'
          ],
          actions: ['Constater l\'absence de tension de veille (+5VSB)']
        },
        {
          numero: 3,
          titre: '3. Analyse des Éléments & Schéma Électrique',
          instructions: 'Consultez le schéma de distribution électrique du châssis.',
          mesureDisponible: 'Tension mesurée sur la prise murale : 231 Volts AC (Normal). Cordon secteur : continuité vérifiée 0.1 Ohm (Normal).'
        },
        {
          numero: 4,
          titre: '4. Sélection de l\'Outillage de Dotation',
          instructions: 'Sélectionnez les 3 outils indispensables pour diagnostiquer le bloc d\'alimentation de manière sécurisée :',
          outilsDisponibles: [
            { id: 'esd', nom: 'Bracelet antistatique ESD', requis: true },
            { id: 'atx_tester', nom: 'Testeur d\'alimentation ATX numérique', requis: true },
            { id: 'multimeter', nom: 'Multimètre numérique étalonné', requis: true },
            { id: 'soldering', nom: 'Fer à souder 60W', requis: false },
            { id: 'drill', nom: 'Perceuse sans fil', requis: false }
          ]
        },
        {
          numero: 5,
          titre: '5. Réalisation des Vérifications Pratiques',
          instructions: 'Isolez le bloc d\'alimentation et raccordez le connecteur 24 broches sur le testeur ATX.',
          resultatsMesures: [
            { rail: '+12V', valeur: '0.0 V (Anomalie)', attendu: '+11.4V à +12.6V' },
            { rail: '+5V', valeur: '0.0 V (Anomalie)', attendu: '+4.75V à +5.25V' },
            { rail: '+3.3V', valeur: '0.0 V (Anomalie)', attendu: '+3.14V à +3.47V' },
            { rail: 'Power Good', valeur: '0 ms (Absent)', attendu: '100ms - 500ms' }
          ]
        },
        {
          numero: 6,
          titre: '6. Identification de la Cause Profonde',
          instructions: 'Formulez le diagnostic exact de la panne.',
          diagnosticOptions: [
            'La barrette de mémoire RAM est défectueuse',
            'Le bloc d\'alimentation ATX a disjoncté suite à une surtension de foudre et son fusible thermique interne est ouvert',
            'Le câble réseau Cat6 est trop long',
            'Le processeur a surchauffé'
          ],
          bonneReponseIndex: 1
        },
        {
          numero: 7,
          titre: '7. Proposition de Solution & Remplacement',
          instructions: 'Appliquez la procédure de remplacement par le bloc de rechange disponible en armoire SIC.',
          operations: [
            'Débrancher le bloc HS et le repérer "HORS SERVICE - Foudre"',
            'Installer le bloc d\'alimentation modulaire de dotation 550W 80+ Gold',
            'Raccorder le 24 broches ATX, le 8 broches CPU et les connecteurs SATA',
            'Vérifier le guidage des câbles sans contact avec les pales des ventilateurs'
          ]
        },
        {
          numero: 8,
          titre: '8. Validation de la Mission & Rapport Militaire',
          instructions: 'Rallumez la station et vérifiez l\'intégrité du système.',
          conclusion: 'Le terminal démarre en 12 secondes, le BIOS valide le POST avec 1 bip court, Windows 11 Tactique se lance et les liaisons réseau sécurisées sont rétablies avec succès.'
        }
      ]
    }
  },

  // ============================================================================
  // ATEL-INFO-02 : Problème de connexion réseau
  // ============================================================================
  'ATEL-INFO-02': {
    code: 'ATEL-INFO-02',
    categorieId: 'CAT-INFO',
    domaine: 'Informatique & Réseaux',
    specialiteRecommandee: 'SPEC-INFO',
    specialiteLabel: 'Réseaux & Télécommunications Opérationnelles',
    difficulte: 'FACILE',
    dureeMinutes: 45,
    competencesRecherchees: [
      'Diagnostic méthodique de connectivité IP (Commandes Ping, Tracert, IPConfig)',
      'Contrôle de câblage cuivre RJ45 selon la norme TIA/EIA 568B',
      'Configuration et dépannage du protocole DHCP et DNS',
      'Vérification des droits d\'accès et passerelles de filtrage'
    ],
    materielRequis: [
      { nom: 'Testeur de câble RJ45 numérique avec injecteur de tonalité', desc: 'Détection de continuité, paires inversées et faux contacts', icon: 'Network' },
      { nom: 'Pince à sertir RJ45 professionnelle & connecteurs blindés', desc: 'Réfection de fiche en cas de clip cassé', icon: 'Wrench' },
      { nom: 'Poste client connecté au réseau local d\'unité', desc: 'Station sous invite de commande PowerShell / CMD', icon: 'Monitor' },
      { nom: 'Cordon de raccordement Cat6 blindé S/FTP de réserve', desc: 'Remplacement immédiat pour test d\'isolement', icon: 'Layers' }
    ],
    cours: {
      titre: 'Diagnostic des Réseaux Locaux (LAN) & Adressage IPv4',
      description: 'Méthodologie descendante (Modèle OSI) pour isoler les dysfonctionnements réseau en unité.',
      fiches: [
        {
          id: 'FICHE-1',
          titre: '1. Les 4 Niveaux de Démarche Méthodique de Test',
          contenu: `Quand un poste ne communique plus, on teste toujours du plus local au plus distant :
1. Ping 127.0.0.1 (Boucle locale) : vérifie la pile logicielle TCP/IP de la carte réseau.
2. Ping de sa propre adresse IP : vérifie la liaison interne entre pilote et carte.
3. Ping de la passerelle par défaut (Routeur d'unité) : vérifie le câble, le switch et le sous-réseau.
4. Ping d'un serveur distant ou 8.8.8.8 : vérifie la route externe et la liaison WAN.`,
          pointsCles: [
            'Adresse en 169.254.x.x (APIPA) = échec de communication avec le serveur DHCP.',
            'LED verte clignotante sur port RJ45 = présence de porteuse Link et trafic actif.',
            'Erreur "Délai d\'attente de la demande dépassé" = paquet perdu ou firewall bloquant l\'ICMP.'
          ]
        },
        {
          id: 'FICHE-2',
          titre: '2. Câblage RJ45 : Norme TIA/EIA 568-B',
          contenu: `La norme standard de la Gendarmerie Royale pour le câblage droit (Straight-Through) est la norme 568-B :
1: Blanc/Orange • 2: Orange • 3: Blanc/Vert • 4: Bleu • 5: Blanc/Bleu • 6: Vert • 7: Blanc/Marron • 8: Marron.
Une inversion entre les paires 3-6 et 1-2 rend le câble inopérant ou dégrade le débit de 1 Gbit/s à 10 Mbit/s.`,
          astuceInstructeur: `Astuce instructeur : Un câble avec clip de rétention cassé provoque des déconnexions aléatoires lors des vibrations ou du passage des personnels dans les bureaux.`
        }
      ]
    },
    exercices: [
      {
        id: 'EX-QCM-INFO-2',
        type: 'qcm',
        titre: 'Exercice 1 : Analyse de la Configuration IP',
        consigne: 'La commande `ipconfig` renvoie l\'adresse `169.254.120.45` avec un masque `255.255.0.0`. Quelle est la situation ?',
        options: [
          { id: 'a', label: 'Le poste est connecté à un réseau tactique haute sécurité', correct: false },
          { id: 'b', label: 'Le serveur DHCP n\'a pas répondu, Windows a attribué une adresse APIPA automatique', correct: true, explication: 'La plage 169.254.0.0/16 est réservée à l\'adressage automatique privé (APIPA) en cas de défaillance DHCP.' },
          { id: 'c', label: 'L\'adresse IP publique du routeur est saturée', correct: false },
          { id: 'd', label: 'Le protocole IPv6 a désactivé le port réseau', correct: false }
        ]
      },
      {
        id: 'EX-ORDER-INFO-2',
        type: 'ordonnancement',
        titre: 'Exercice 2 : Ordre des Tests de Connectivité',
        consigne: 'Classez les commandes suivantes dans l\'ordre recommandé de résolution de panne réseau :',
        etapes: [
          { id: 'o1', texte: 'Vérifier la liaison physique (câble branché et voyant Link actif sur la prise)', ordreCorrect: 1 },
          { id: 'o2', texte: 'Lancer ipconfig /all pour examiner l\'adresse IP, le masque et la passerelle', ordreCorrect: 2 },
          { id: 'o3', texte: 'Effectuer un ping vers la passerelle par défaut (ex: 192.168.1.1)', ordreCorrect: 3 },
          { id: 'o4', texte: 'Tester la résolution de noms avec nslookup vers le serveur DNS', ordreCorrect: 4 }
        ]
      }
    ],
    simulation: {
      titre: 'Mission Numérique : Rétablissement de la Liaison Réseau de la Brigade',
      contexte: 'La station de rédaction des procès-verbaux n\'arrive plus à synchroniser les dossiers avec le serveur central de la compagnie.',
      etapes: [
        {
          numero: 1,
          titre: '1. Constat initial de la déconnexion',
          instructions: 'Ouvrez le centre réseau et constatez l\'icône "Globe terrestre avec croix rouge".'
        },
        {
          numero: 2,
          titre: '2. Inspection du cordon RJ45',
          instructions: 'Examinez la prise murale et le cordon reliant la station.'
        },
        {
          numero: 3,
          titre: '3. Test au testeur de câble',
          instructions: 'Les LED 1, 2, 4, 5, 7, 8 s\'allument, mais les LED 3 et 6 restent éteintes (paire TX/RX coupée).'
        },
        {
          numero: 4,
          titre: '4. Remplacement et validation',
          instructions: 'Remplacement par un cordon certifié Cat6 et renouvellement du bail DHCP via `ipconfig /renew`.'
        }
      ]
    }
  },

  // ============================================================================
  // ATEL-MECA-01 : Causes possibles d'un problème de démarrage moteur
  // ============================================================================
  'ATEL-MECA-01': {
    code: 'ATEL-MECA-01',
    categorieId: 'CAT-MECA',
    domaine: 'Mécanique & Automobile',
    specialiteRecommandee: 'SPEC-MOTARD',
    specialiteLabel: 'Véhicules d\'Intervention & Escadron Motocycliste',
    difficulte: 'MOYEN',
    dureeMinutes: 60,
    competencesRecherchees: [
      'Diagnostic méthodique de la chaîne de démarrage moteur',
      'Contrôle de l\'état de charge et résistance interne de la batterie 12V',
      'Identification des symptômes liés au démarreur, solénoïde et Neiman',
      'Respect strict des règles de sécurité mécanique et EPI (gants nitrile, lunettes)'
    ],
    materielRequis: [
      { nom: 'Véhicule utilitaire tactique / Moto d\'intervention d\'exercice', desc: 'Banc moteur instrumenté', icon: 'Wrench' },
      { nom: 'Testeur de batterie numérique à décharge contrôlée', desc: 'Mesure de tension au repos et intensité de démarrage CCA', icon: 'Activity' },
      { nom: 'Multimètre avec pince ampèremétrique DC', desc: 'Mesure du courant d\'appel du démarreur (80A à 250A)', icon: 'Activity' },
      { nom: 'Boîte de douilles et clés mixtes en acier chrome-vanadium', desc: 'Démontage des cosses et bornes de batterie', icon: 'Wrench' },
      { nom: 'Lunettes de protection enveloppantes et gants résistants aux acides', desc: 'EPI obligatoires lors de la manipulation de batterie au plomb', icon: 'HardHat' }
    ],
    cours: {
      titre: 'Chaîne de Démarrage Thermique & Circuit de Charge',
      description: 'Architecture des organes de lancement d\'un moteur diesel/essence de véhicule militaire.',
      fiches: [
        {
          id: 'FICHE-1',
          titre: '1. Diagnostic de la Batterie 12V au Repos et sous Charge',
          contenu: `La tension aux bornes de la batterie informe immédiatement sur son état électrochimique (mesure après 30 minutes de repos sans contact) :`,
          tableau: [
            { signal: '>= 12.65 V', signification: 'Batterie chargée à 100%', action: 'État optimal' },
            { signal: '12.40 V à 12.50 V', signification: 'Batterie chargée à 75%', action: 'Recharge préventive conseillée' },
            { signal: '12.00 V à 12.20 V', signification: 'Batterie à 25-50% (Déchargée)', action: 'Recharge obligatoire au chargeur intelligent' },
            { signal: '< 11.80 V', signification: 'Batterie déchargée profonde / Sulfatée', action: 'Risque d\'avarie définitive des plaques' }
          ]
        },
        {
          id: 'FICHE-2',
          titre: '2. Diagnostic Différentiel Démarreur vs Batterie',
          contenu: `L'observation auditive lors de la rotation de la clé est la clé du diagnostic :
- Bruit de "Clac-clac-clac" rapide : la batterie manque de puissance pour maintenir le solénoïde enclenché.
- Bruit de "Clac" sec unique mais le moteur ne tourne pas : solénoïde enclenché mais balais/charbons du démarreur usés ou moteur bloqué mécaniquement.
- Le démarreur tourne à vitesse vigoureuse mais le moteur ne se lance pas : le démarreur est hors de cause, chercher côté arrivée carburant, bougies de préchauffage ou antidémarrage électronique.`,
          astuceInstructeur: `Règle de sécurité : Ne jamais fumer ni approcher d'étincelle près d'une batterie en charge en raison du dégagement d'hydrogène hautement explosif.`
        }
      ]
    },
    exercices: [
      {
        id: 'EX-QCM-MECA-1',
        type: 'qcm',
        titre: 'Exercice 1 : Analyse de Tension de Démarrage',
        consigne: 'Pendant que l\'aide-conducteur tourne la clé de contact, la tension mesurée sur la batterie s\'effondre à 7.2 Volts. Quel est le diagnostic ?',
        options: [
          { id: 'a', label: 'C\'est une chute de tension normale pour un moteur froid', correct: false },
          { id: 'b', label: 'La batterie a une résistance interne trop élevée ou un élément en court-circuit (Batterie HS)', correct: true, explication: 'Sous l\'effort de démarrage, la tension ne doit jamais chuter sous 9.6V à 20°C. À 7.2V, la batterie est incapable de fournir le courant CCA requis.' },
          { id: 'c', label: 'L\'alternateur produit une surcharge', correct: false },
          { id: 'd', label: 'Le filtre à gazole est colmaté', correct: false }
        ]
      },
      {
        id: 'EX-DRAG-MECA-1',
        type: 'association',
        titre: 'Exercice 2 : Organes du Circuit de Démarrage & Leurs Fonctions',
        consigne: 'Associez chaque élément mécanique à sa fonction exacte :',
        paires: [
          { id: 'p1', item: 'Solénoïde (Contacteur)', cible: 'Engrener le pignon lanceur sur la couronne et alimenter le moteur électrique' },
          { id: 'p2', item: 'Couronne dentée du volant moteur', cible: 'Recevoir le couple de rotation mécanique pour entraîner le vilebrequin' },
          { id: 'p3', item: 'Alternateur', cible: 'Produire l\'électricité et recharger la batterie dès que le moteur tourne' },
          { id: 'p4', item: 'Tresse de masse moteur/châssis', cible: 'Assurer le retour du courant électrique sans résistance parasite' }
        ]
      }
    ],
    simulation: {
      titre: 'Mission Numérique : Véhicule d\'Intervention Rapide Immobilisé',
      contexte: 'Le 4x4 d\'intervention de la brigade refuse de démarrer pour le départ en patrouille de nuit.',
      etapes: [
        { numero: 1, titre: '1. Constat des symptômes auditifs', instructions: 'Mise du contact : les voyants du combiné s\'allument mais faiblissent nettement lors de l\'action du démarreur.' },
        { numero: 2, titre: '2. Contrôle visuel des cosses de batterie', instructions: 'Présence d\'une couche importante de sulfate blanc sur la cosse négative.' },
        { numero: 3, titre: '3. Nettoyage et serrage au couple', instructions: 'Brossage des bornes au papier de verre fin, graissage de protection et resserrage des cosses.' },
        { numero: 4, titre: '4. Essai de démarrage validé', instructions: 'Démarrage instantané du moteur, tension de charge alternateur mesurée à 14.2V (Conforme).' }
      ]
    }
  },

  // ============================================================================
  // ATEL-TEL-01 : Problème de connexion sur équipement de communication
  // ============================================================================
  'ATEL-TEL-01': {
    code: 'ATEL-TEL-01',
    categorieId: 'CAT-TELECOM',
    domaine: 'Électronique & Télécommunications',
    specialiteRecommandee: 'SPEC-GSI',
    specialiteLabel: 'Transmissions & Télécommunications Opérationnelles',
    difficulte: 'MOYEN',
    dureeMinutes: 60,
    competencesRecherchees: [
      'Mesure du Taux d\'Ondes Stationnaires (TOS / SWR)',
      'Contrôle de continuité et d\'isolement des lignes coaxiales',
      'Diagnostic des connecteurs BNC, N et PL-259',
      'Réglage de la fréquence et de la puissance d\'émission'
    ],
    materielRequis: [
      { nom: 'Poste émetteur-récepteur radio VHF tactique', desc: 'Station de transmission de dotation', icon: 'Radio' },
      { nom: 'TOS-mètre / Wattmètre HF étalonné', desc: 'Mesure de puissance directe et réfléchie', icon: 'Activity' },
      { nom: 'Charge fictive 50 Ohms / 50 Watts (Dummy Load)', desc: 'Test d\'émission sans rayonnement parasite', icon: 'ShieldCheck' },
      { nom: 'Câble coaxial RG-213 avec fiches N mâles', desc: 'Liaison antenne blindée basse perte', icon: 'Layers' }
    ],
    cours: {
      titre: 'Propagation HF/VHF & Lignes de Transmission Coaxiales',
      description: 'Principes fondamentaux de transmission radioélectrique militaire et adaptation d\'impédance.',
      fiches: [
        {
          id: 'FICHE-1',
          titre: '1. Impédance caractéristique et Règle du TOS (SWR)',
          contenu: `L'ensemble de la chaîne radio tactique (émetteur, câble coaxial et antenne) est normalisé à une impédance de 50 Ohms. Si l'antenne est désaccordée ou le câble endommagé, une partie de la puissance est renvoyée vers l'émetteur sous forme d'onde réfléchie :
- TOS = 1.0 à 1.5 : Excellent rendement, liaison optimale.
- TOS = 1.5 à 2.0 : Acceptable, légère perte de portée.
- TOS > 3.0 : Danger critique de destruction de l'étage final de puissance (PA) du poste radio.`,
          pointsCles: [
            'Toujours utiliser une charge fictive 50 Ohms pour les réglages en atelier.',
            'Un court-circuit dans une fiche BNC se détecte à l\'ohmmètre (résistance mesurée = 0 Ohm au lieu de l\'infini entre âme et tresse déconnectées).'
          ]
        }
      ]
    },
    exercices: [
      {
        id: 'EX-QCM-TEL-1',
        type: 'qcm',
        titre: 'Exercice 1 : Interprétation d\'une Mesure TOS',
        consigne: 'Lors du test d\'émission sur la fréquence tactique 145.500 MHz, le wattmètre indique 20 Watts directs et 10 Watts réfléchis (TOS supérieur à 3). Que devez-vous faire ?',
        options: [
          { id: 'a', label: 'Augmenter la puissance d\'émission à 50W pour forcer le signal', correct: false },
          { id: 'b', label: 'Cesser immédiatement l\'émission pour éviter de griller l\'étage final et inspecter la ligne d\'antenne', correct: true, explication: 'Un TOS supérieur à 3 provoque une surchauffe immédiate des transistors de puissance. Il faut couper l\'émission sans délai.' },
          { id: 'c', label: 'Changer le microphone du combiné radio', correct: false },
          { id: 'd', label: 'Déplacer la batterie', correct: false }
        ]
      }
    ],
    simulation: {
      titre: 'Mission Numérique : Dépannage du Relais Radio de Surveillance',
      contexte: 'Le relais radio du poste frontière ne relaie plus les messages des patrouilles mobiles.',
      etapes: [
        { numero: 1, titre: '1. Constat de l\'alerte transmission', instructions: 'Vérification du niveau de réception et test de transmission.' },
        { numero: 2, titre: '2. Mesure sur charge fictive 50 Ohms', instructions: 'Le poste émet 25W propres avec TOS de 1.1 -> L\'émetteur est en parfait état.' },
        { numero: 3, titre: '3. Contrôle du câble coaxial vers le mât', instructions: 'Détection d\'une infiltration d\'eau de pluie dans le raccord N extérieur mal vulcanisé.' },
        { numero: 4, titre: '4. Réfection de l\'étanchéité et test antenne', instructions: 'Remplacement de la fiche, pose de ruban auto-vulcanisant et TOS final à 1.25.' }
      ]
    }
  },

  // ============================================================================
  // ATEL-LOG-01 : Organiser un stock de matériel
  // ============================================================================
  'ATEL-LOG-01': {
    code: 'ATEL-LOG-01',
    categorieId: 'CAT-LOG',
    domaine: 'Logistique & Maintenance',
    specialiteRecommandee: 'SPEC-GEH',
    specialiteLabel: 'Logistique Opérationnelle & Gestion des Ressources',
    difficulte: 'FACILE',
    dureeMinutes: 60,
    competencesRecherchees: [
      'Organisation d\'un magasin selon les normes militaires de traçabilité',
      'Application de la méthode FIFO (First In, First Out)',
      'Étiquetage et codification normalisée des casiers',
      'Respect des règles de stockage sécurisé des produits sensibles'
    ],
    materielRequis: [
      { nom: 'Rayonnage métallique lourd d\'arurerie/magasin', desc: 'Casier de stockage numéroté', icon: 'Boxes' },
      { nom: 'Lecteur de codes-barres / Terminal de saisie d\'inventaire', desc: 'Saisie informatique des mouvements de stock', icon: 'Monitor' },
      { nom: 'Fiches de casier et étiquettes d\'identification normalisées', desc: 'Traçabilité visuelle immédiate', icon: 'FileText' },
      { nom: 'Chaussures de sécurité et gants de manutention', desc: 'EPI obligatoires en entrepôt', icon: 'HardHat' }
    ],
    cours: {
      titre: 'Gestion des Stocks Militaires & Logistique de Soutien',
      description: 'Optimisation du stockage, règles de sécurité de charge et disponibilité immédiate des dotations.',
      fiches: [
        {
          id: 'FICHE-1',
          titre: '1. Règle d\'Or du Magasinage Militaire : Le Système FIFO',
          contenu: `La méthode FIFO (Premier Entré, Premier Sorti) garantit la rotation des consommables (piles, rations de survie, munitions, pneumatiques, produits chimiques) afin d'éviter tout dépassement de la date de péremption ou dégradation liée au temps.`,
          pointsCles: [
            'Les articles les plus anciens doivent toujours être positionnés en avant du casier.',
            'Chaque casier dispose d\'une fiche mentionnant : Référence OTAN, Désignation, Stock Mini, Stock Maxi et Emplacement.'
          ]
        }
      ]
    },
    exercices: [
      {
        id: 'EX-QCM-LOG-1',
        type: 'qcm',
        titre: 'Exercice 1 : Répartition des Charges Lourdes',
        consigne: 'Lors de l\'implantation d\'un rayonnage de 4 niveaux, où devez-vous stocker les caisses de munitions de 35 kg ?',
        options: [
          { id: 'a', label: 'Au dernier niveau en hauteur (Niveau 4) pour gagner de la place au sol', correct: false },
          { id: 'b', label: 'Au niveau inférieur le plus bas (Niveau 1 / Sol) pour abaisser le centre de gravité et faciliter la manutention sécurisée', correct: true, explication: 'Les charges les plus lourdes sont impérativement placées en bas afin d\'éviter le basculement du rayonnage et préserver le dos des personnels.' },
          { id: 'c', label: 'Suspendues au plafond par des sangles', correct: false },
          { id: 'd', label: 'Peu importe la hauteur', correct: false }
        ]
      }
    ],
    simulation: {
      titre: 'Mission Numérique : Réception et Rangement du Lot d\'Équipement d\'Intervention',
      contexte: 'Réception d\'une livraison prioritaire de gilets pare-balles, casques tactiques et lampes torches pour la promotion.',
      etapes: [
        { numero: 1, titre: '1. Contrôle du bon de livraison vs colis', instructions: 'Vérifier l\'intégrité des scellés et le nombre de cartons.' },
        { numero: 2, titre: '2. Enregistrement informatique', instructions: 'Scanner les numéros de série de chaque équipement de protection.' },
        { numero: 3, titre: '3. Affectation des casiers normalisés', instructions: 'Ranger les gilets au niveau 2 (hauteur de buste) et les casques au niveau 3.' },
        { numero: 4, titre: '4. Mise à jour de l\'inventaire', instructions: 'Validation du stock disponible pour distribution aux unités.' }
      ]
    }
  }
};

/**
 * Récupère l'image et métadonnées enrichies d'un atelier
 */
export function getWorkshopMedia(code, categorieId) {
  const customImg = WORKSHOP_IMAGES[code];
  if (customImg) return customImg;

  // Fallbacks élégants par catégorie
  switch (categorieId) {
    case 'CAT-INFO':
      return {
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
        caption: 'Systèmes informatiques, réseaux et cybersécurité',
        alt: 'Informatique et Réseaux'
      };
    case 'CAT-MECA':
      return {
        url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Maintenance des parcs de véhicules d\'intervention',
        alt: 'Mécanique et Automobile'
      };
    case 'CAT-TELECOM':
      return {
        url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Transmissions radio, faisceaux hertziens et télécoms',
        alt: 'Électronique et Télécommunications'
      };
    case 'CAT-LOG':
      return {
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Gestion de la chaîne logistique et maintenance générale',
        alt: 'Logistique et Maintenance'
      };
    default:
      return {
        url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
        caption: 'Atelier de formation professionnelle et technique',
        alt: 'Atelier Pratique'
      };
  }
}

/**
 * Récupère les données académiques complètes d'un atelier
 */
export function getWorkshopAcademyDetails(code) {
  return WORKSHOP_ACADEMY_DATA[code] || null;
}

