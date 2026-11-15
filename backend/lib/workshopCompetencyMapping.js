// ==============================================================================
// ORIENT-GR — Référentiel des Compétences Pratiques d'Ateliers & Mapping Métier
// خرائط الكفاءات المهنية التطبيقية وربطها بالورشات الميدانية والتخصصات
// ==============================================================================

/**
 * 4 Groupes de Compétences Professionnelles Pratiques
 * Conformément aux spécifications officielles ORIENT-G
 */
export const WORKSHOP_COMPETENCY_GROUPS = [
  {
    groupId: 'GROUP-INFO',
    nomFr: 'Informatique & Réseaux',
    nomAr: 'المعلوميات والشبكات وأنظمة التشغيل',
    categorieId: 'CAT-INFO',
    competences: [
      {
        code: 'COMP-INFO-MAINT',
        nomFr: 'Maintenance informatique',
        nomAr: 'صيانة الحواسيب وأنظمة التشغيل',
        descriptionFr: 'Diagnostic matériel, partitionnement sécurisé, déploiement d\'images système et durcissement OS.',
        workshops: [1] // ATEL-INFO-01
      },
      {
        code: 'COMP-INFO-NET',
        nomFr: 'Dépannage réseaux',
        nomAr: 'تثبيت وتتبع أعطال الشبكات المحلية',
        descriptionFr: 'Câblage structuré RJ45 blindé, brassage de baie, isolation VLAN et adressage IP.',
        workshops: [2] // ATEL-INFO-02
      },
      {
        code: 'COMP-INFO-DATA',
        nomFr: 'Gestion des données numériques',
        nomAr: 'إدارة وتأمين البيانات الرقمية',
        descriptionFr: 'Chiffrement des supports de stockage, intégrité des données d\'enquête et traçabilité.',
        workshops: [1, 3] // ATEL-INFO-01, ATEL-INFO-03
      },
      {
        code: 'COMP-INFO-OFFICE',
        nomFr: 'Bureautique avancée',
        nomAr: 'المكتبات المتقدمة وإدارة البيانات الإحصائية',
        descriptionFr: 'Traitement de données opérationnelles complexes sur tableur Excel, tableaux croisés et formules avancées.',
        workshops: [3] // ATEL-INFO-03
      }
    ]
  },
  {
    groupId: 'GROUP-MECA',
    nomFr: 'Mécanique & Automobile',
    nomAr: 'الميكانيك والكهرباء والتشخيص الآلي',
    categorieId: 'CAT-MECA',
    competences: [
      {
        code: 'COMP-MECA-DIAG',
        nomFr: 'Dépannage mécanique',
        nomAr: 'تشخيص واستكشاف الأعطال الميكانيكية',
        descriptionFr: 'Identification des dysfonctionnements cinématiques, circuits de freinage et trains roulants.',
        workshops: [5] // ATEL-MECA-02
      },
      {
        code: 'COMP-MECA-ELEC',
        nomFr: 'Électricité automobile',
        nomAr: 'صيانة الدوائر والشبكات الكهربائية للسيارات',
        descriptionFr: 'Contrôle des circuits multiplexés CAN/LIN, alternateurs, démarreurs et batteries auxiliaires.',
        workshops: [4] // ATEL-MECA-01
      },
      {
        code: 'COMP-MECA-ENG',
        nomFr: 'Maintenance moteur',
        nomAr: 'صيانة المحركات ومنظومات التبريد والتشحيم',
        descriptionFr: 'Intervention sur groupe motopropulseur, distribution, purge des circuits hydrauliques et contrôle étanchéité.',
        workshops: [5] // ATEL-MECA-02
      },
      {
        code: 'COMP-MECA-OBD',
        nomFr: 'Diagnostic électronique automobile',
        nomAr: 'التشخيص الإلكتروني بواسطة أجهزة OBD والماسحات',
        descriptionFr: 'Lecture des codes défauts (DTC), analyse des trames de données en temps réel et effacement sélectif.',
        workshops: [4] // ATEL-MECA-01
      }
    ]
  },
  {
    groupId: 'GROUP-TELECOM',
    nomFr: 'Électronique & Télécommunications',
    nomAr: 'الإلكترونيات والاتصالات اللاسلكية العسكرية',
    categorieId: 'CAT-TELECOM',
    competences: [
      {
        code: 'COMP-TEL-MAINT',
        nomFr: 'Maintenance électronique',
        nomAr: 'صيانة الأجهزة والمكونات الإلكترونية',
        descriptionFr: 'Soudure et dessoudure de composants CMS fins, remplacement de filtres et remise en état de cartes mères.',
        workshops: [7] // ATEL-TEL-02
      },
      {
        code: 'COMP-TEL-DIAG',
        nomFr: 'Diagnostic des équipements de communication',
        nomAr: 'تشخيص وقياس أجهزة الإرسال والاستقبال اللاسلكي',
        descriptionFr: 'Mesure de puissance d\'émission HF/VHF, taux d\'ondes stationnaires (TOS/ROS) et alignement des émetteurs.',
        workshops: [6] // ATEL-TEL-01
      },
      {
        code: 'COMP-TEL-PREC',
        nomFr: 'Précision technique',
        nomAr: 'الدقة التقنية والتحكم في أجهزة القياس المخبرية',
        descriptionFr: 'Utilisation de l\'oscilloscope, du multimètre de précision, analyseur de spectre et banc de test HF.',
        workshops: [6, 7] // ATEL-TEL-01, ATEL-TEL-02
      }
    ]
  },
  {
    groupId: 'GROUP-LOG',
    nomFr: 'Logistique & Maintenance Générale',
    nomAr: 'اللوجستيك والتدبير والصيانة العامة للبنايات',
    categorieId: 'CAT-LOG',
    competences: [
      {
        code: 'COMP-LOG-STOCK',
        nomFr: 'Gestion des stocks et équipements',
        nomAr: 'تدبير المخزون وسجلات العتاد والذخيرة',
        descriptionFr: 'Tenue des registres d\'armurerie et de dotation, inventaires périodiques et gestion des péremptions.',
        workshops: [8] // ATEL-LOG-01
      },
      {
        code: 'COMP-LOG-ORG',
        nomFr: 'Organisation du matériel',
        nomAr: 'تنظيم المستودعات وحفظ المعدات الحساسة',
        descriptionFr: 'Disposition rationnelle des équipements d\'intervention, étiquetage QR-code et traçabilité des sorties.',
        workshops: [8] // ATEL-LOG-01
      },
      {
        code: 'COMP-LOG-MAINT',
        nomFr: 'Maintenance générale des bâtiments',
        nomAr: 'الصيانة العامة للبنايات والشبكات التقنية للثكنات',
        descriptionFr: 'Dépannage des armoires électriques BT de secours, groupes électrogènes et réseaux de fluides de cantonnement.',
        workshops: [9] // ATEL-LOG-02
      },
      {
        code: 'COMP-LOG-RES',
        nomFr: 'Gestion des ressources',
        nomAr: 'التدبير الاقتصادي للموارد وقطع الغيار',
        descriptionFr: 'Planification préventive des besoins, commande de consommables et suivi des fiches d\'intervention technique.',
        workshops: [8, 9] // ATEL-LOG-01, ATEL-LOG-02
      }
    ]
  }
];

/**
 * Correspondance entre les groupes de compétences pratiques et les spécialités de la Gendarmerie Royale
 */
export const WORKSHOP_SPECIALTY_ALIGNMENT = {
  'SPEC-PJ': {
    nomFr: 'Police Judiciaire & Enquêtes',
    nomAr: 'الشرطة القضائية والأبحاث الجنائية',
    primaryCategories: ['CAT-INFO'],
    contributingSkills: ['COMP-INFO-DATA', 'COMP-INFO-MAINT'],
    relevanceExplanationFr: 'La maîtrise de la gestion des données numériques et la préservation de l\'intégrité des supports informatiques sont déterminantes pour les constatations et cyber-enquêtes en Police Judiciaire.',
    relevanceExplanationAr: 'التحكم في معالجة البيانات الرقمية وضمان سلامة الأدلة المعلوماتية يعزز كفاءة الأبحاث القضائية والمعاينات الفنية.'
  },
  'SPEC-INFO': {
    nomFr: 'Systèmes d\'Information & Cybersécurité',
    nomAr: 'أنظمة المعلومات والاتصالات واليقظة السيبرانية',
    primaryCategories: ['CAT-INFO', 'CAT-TELECOM'],
    contributingSkills: ['COMP-INFO-NET', 'COMP-INFO-MAINT', 'COMP-INFO-DATA', 'COMP-TEL-PREC'],
    relevanceExplanationFr: 'Les aptitudes prouvées en câblage structuré, configuration switch/VLAN et durcissement OS démontrent une adéquation technique immédiate pour les sections SIC.',
    relevanceExplanationAr: 'الأداء الميداني في الربط الشبكي وإعداد النطاقات الافتراضية وتأمين الأنظمة يؤهل مباشرة للمهام التقنية المتخصصة.'
  },
  'SPEC-MOTARD': {
    nomFr: 'Escadron Motocycliste & Sécurité Routière',
    nomAr: 'كوكبة الدراجات النارية والسلامة الطرقية',
    primaryCategories: ['CAT-MECA'],
    contributingSkills: ['COMP-MECA-DIAG', 'COMP-MECA-ELEC'],
    relevanceExplanationFr: 'La capacité à diagnostiquer rapidement les pannes électromécaniques sur le terrain garantit la disponibilité opérationnelle du parc motocycliste et des véhicules d\'intervention rapide.',
    relevanceExplanationAr: 'القدرة على التشخيص السريع للأعطال الميكانيكية والكهربائية تضمن الجاهزية الدائمة لأسطول التدخل السريع والسلامة الطرقية.'
  },
  'SPEC-GM': {
    nomFr: 'Gendarmerie Mobile & Maintien de l\'Ordre',
    nomAr: 'الدرك المتنقل وحفظ النظام',
    primaryCategories: ['CAT-MECA', 'CAT-LOG'],
    contributingSkills: ['COMP-MECA-ENG', 'COMP-LOG-ORG', 'COMP-LOG-STOCK'],
    relevanceExplanationFr: 'L\'autonomie logistique, la rigueur dans le conditionnement des équipements et l\'entretien mécanique préventif sont cruciaux pour les déploiements prolongés en unité mobile.',
    relevanceExplanationAr: 'الانضباط في تدبير العتاد والجاهزية الميكانيكية تعد ركائز أساسية لضمان استقلالية وحدات التدخل في المهام الميدانية.'
  },
  'SPEC-GEH': {
    nomFr: 'Groupe d\'Escadrons d\'Hélicoptères',
    nomAr: 'المجموعة الجوية للدرك الملكي',
    primaryCategories: ['CAT-TELECOM', 'CAT-MECA'],
    contributingSkills: ['COMP-TEL-PREC', 'COMP-TEL-DIAG', 'COMP-MECA-ENG'],
    relevanceExplanationFr: 'La précision technique extrême exigée lors des mesures HF et de la soudure CMS reflète le niveau de rigueur requis pour les équipes de servitude aéronautique.',
    relevanceExplanationAr: 'الدقة المتناهية في القياسات الإلكترونية وصيانة منظومات الاتصال تعكس المعايير الصارمة المطلوبة في الملاحة الجوية.'
  },
  'SPEC-SEC-ADMIN': {
    nomFr: 'Secrétariat & Administration Militaire',
    nomAr: 'الكتابة والإدارة العسكرية',
    primaryCategories: ['CAT-INFO', 'CAT-LOG'],
    contributingSkills: ['COMP-INFO-OFFICE', 'COMP-LOG-STOCK', 'COMP-LOG-RES'],
    relevanceExplanationFr: 'L\'excellence démontrée en bureautique avancée (tableurs Excel) et la rigueur dans la tenue des registres d\'inventaire correspondent parfaitement aux exigences de gestion des états-majors.',
    relevanceExplanationAr: 'الإتقان المثبت في البرمجيات المكتبية المتقدمة ودقة السجلات الإدارية تتطابق تماماً مع متطلبات التسيير الإداري العسكري.'
  },
  'SPEC-TRANS': {
    nomFr: 'Transmissions & Guerre Électronique',
    nomAr: 'المواصلات السلكية واللاسلكية العسكرية',
    primaryCategories: ['CAT-TELECOM', 'CAT-INFO'],
    contributingSkills: ['COMP-TEL-DIAG', 'COMP-TEL-MAINT', 'COMP-TEL-PREC'],
    relevanceExplanationFr: 'La maîtrise des paramètres d\'émission VHF/UHF et le diagnostic matériel radio constituent les compétences clés des opérateurs de réseaux de transmission opérationnels.',
    relevanceExplanationAr: 'التحكم في معايير التردد اللاسلكي وصيانة أجهزة الإرسال يشكلان الركيزة الأساسية لشبكات المواصلات العملياتية.'
  }
};

