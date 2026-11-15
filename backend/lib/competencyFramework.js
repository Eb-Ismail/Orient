// ==============================================================================
// ORIENT-GR - Cadre Référentiel des Compétences Professionnelles (12 Compétences)
// إطار الكفاءات المهنية الميدانية للدرك الملكي • معايير التقييم ومصفوفة التخصصات
// ==============================================================================

/**
 * Les 12 compétences professionnelles pratiques officielles
 * Exclut formellement toute évaluation psychologique, QI, humeur ou personnalité.
 */
export const canonicalCompetencyFramework = [
  {
    code: 'JUDICIAL_DOC_ANALYSIS',
    numero: 1,
    nomAr: 'تحليل الوثائق والمحاضر القضائية',
    nomFr: 'Analyse des documents et procès-verbaux judiciaires',
    domaineId: 'PJ',
    descriptionAr: 'القدرة على فحص المحاضر القانونية، وتدقيق التواريخ، واستخراج القرائن الثابتة وكشف التناقضات بالأقوال.',
    criteresEvaluation: [
      'دقة التدقيق المقارن بين الأقوال والمعاينات',
      'كشف التناقضات الزمنية والمكانية',
      'استيعاب المقتضيات الإجرائية لقانون المسطرة الجنائية'
    ],
    poidsDefaut: 1.0,
    legacyTags: ['DOC_ANALYSIS', 'ACCURACY', 'PROCEDURAL_AWARENESS']
  },
  {
    code: 'EVIDENCE_CLASSIFICATION',
    numero: 2,
    nomAr: 'تصنيف الأدلة والقرائن والمعلومات',
    nomFr: 'Classification des preuves et pièces à conviction',
    domaineId: 'PJ',
    descriptionAr: 'تصنيف المحجوزات ووسائل الإثبات حسب طبيعتها المادية والرقمية والبيولوجية واحترام سلسلة الحراسة.',
    criteresEvaluation: [
      'احترام التكييف القانوني للمحجوزات',
      'ضمان سلامة سلسلة الحراسة (Chain of Custody)',
      'توجيه العينات للمختبر الجنائي المختص'
    ],
    poidsDefaut: 1.0,
    legacyTags: ['CLASSIFICATION']
  },
  {
    code: 'FIELD_SITUATION_MGMT',
    numero: 3,
    nomAr: 'تدبير المواقف الميدانية والتدخل',
    nomFr: 'Gestion des situations de terrain et intervention',
    domaineId: 'ROUTE',
    descriptionAr: 'السيطرة على مسرح الحادث أو موقع التدخل، وحماية الأرواح وتطويق المكان وتأمين محيط العمليات.',
    criteresEvaluation: [
      'سرعة تثبيت المحيط الأمني ومنع ولوج الفضوليين',
      'تقدير درجات الخطورة والاستعجال',
      'التمركز التكتيكي الآمن لعناصر الدورية'
    ],
    poidsDefaut: 1.0,
    legacyTags: ['FIELD_ORG', 'RISK_ASSESSMENT', 'DECISION_MAKING']
  },
  {
    code: 'ROAD_SAFETY_PROCEDURES',
    numero: 4,
    nomAr: 'مساطر وتدابير السلامة الطرقية',
    nomFr: 'Procédures de sécurité routière et circulation',
    domaineId: 'ROUTE',
    descriptionAr: 'تطبيق مدونة السير، واستعمال أجهزة الرصد، وتدبير حوادث السير وتنظيم حركة المرور في الظروف الخاصة.',
    criteresEvaluation: [
      'التطبيق السليم لمقتضيات مدونة السير',
      'تحويل مسارات السير وتفادي حوادث التتابع',
      'تدقيق وثائق المركبات ورصد التزوير'
    ],
    poidsDefaut: 1.0,
    legacyTags: ['PROCEDURAL_APP', 'RISK_ASSESSMENT', 'FIELD_ORG']
  },
  {
    code: 'DIGITAL_DATA_ANALYSIS',
    numero: 5,
    nomAr: 'تحليل المعطيات الرقمية وتدقيق البيانات',
    nomFr: 'Analyse des données numériques et audit de registres',
    domaineId: 'TECH',
    descriptionAr: 'قراءة سجلات الولوج والاتصالات، ورصد الأنماط الشاذة والاختلالات التقنية في قواعد البيانات.',
    criteresEvaluation: [
      'كشف محاولات الولوج غير المشروع والسجلات المنحرفة',
      'مطابقة بيانات الاتصالات مع النطاقات الجغرافية',
      'الدقة في استخراج المؤشرات الرقمية (Indicators of Compromise)'
    ],
    poidsDefaut: 1.0,
    legacyTags: ['DIGITAL_SKILLS', 'DATA_PROCESSING']
  },
  {
    code: 'TECHNICAL_SKILLS',
    numero: 6,
    nomAr: 'المهارات التقنية ونظم المعلومات',
    nomFr: 'Compétences techniques et systèmes d\'information',
    domaineId: 'TECH',
    descriptionAr: 'استخدام المنظومات المعلوماتية والأجهزة التقنية المتخصصة لحل الإشكاليات الميدانية والتحقيق التقني.',
    criteresEvaluation: [
      'التعامل مع منظومات المراقبة والتتبع',
      'تطبيق بروتوكولات الأمن السيبراني',
      'المعالجة التقنية السليمة للأدلة الإلكترونية'
    ],
    poidsDefaut: 1.0,
    legacyTags: ['DIGITAL_SKILLS', 'TECH_SOLVING']
  },
  {
    code: 'OPERATIONAL_PLANNING',
    numero: 7,
    nomAr: 'التخطيط العملياتي وتوزيع الموارد',
    nomFr: 'Planification opérationnelle et gestion des ressources',
    domaineId: 'PLAN',
    descriptionAr: 'وضع الخطط التنفيذية، وتوزيع الوسائل البشرية واللوجستيكية، وتحديد المهام حسب درجة الحساسية والأولويات.',
    criteresEvaluation: [
      'التوزيع المتوازن للدوريات ونقاط المراقبة',
      'مراعاة الاحتياط العملياتي والقدرة على التدخل السريع',
      'احترام الجداول الزمنية ومسارات الانتشار'
    ],
    poidsDefaut: 1.0,
    legacyTags: ['PLANNING', 'ORGANIZATION', 'RESOURCE_MGMT']
  },
  {
    code: 'TEAM_COORDINATION',
    numero: 8,
    nomAr: 'التنسيق العملياتي وقيادة الفرق',
    nomFr: 'Coordination opérationnelle et conduite d\'équipes',
    domaineId: 'PLAN',
    descriptionAr: 'التواصل اللاسلكي الفعال، والتنسيق بين الوحدات الميدانية وقاعة القيادة، وتدبير الأزمات متعددة الأطراف.',
    criteresEvaluation: [
      'وضوح الأوامر والتعليمات اللاسلكية العسكرية',
      'التنسيق المحكم مع المصالح الشريكة (الوقاية المدنية، السلطات المحلية)',
      'الاستجابة الفورية للمستجدات الطارئة'
    ],
    poidsDefaut: 1.0,
    legacyTags: ['COORDINATION', 'ORGANIZATION', 'DECISION_MAKING']
  },
  {
    code: 'ENVIRONMENTAL_MONITORING',
    numero: 9,
    nomAr: 'المراقبة البيئية وحماية المجالات الطبيعية',
    nomFr: 'Surveillance environnementale et espaces naturels',
    domaineId: 'ENV',
    descriptionAr: 'رصد الجرائم البيئية، ومعاينة تلوث المياه والتربة، وحماية الغابات والمقالع والمجالات البحرية والمحميات.',
    criteresEvaluation: [
      'التموضع الجغرافي الدقيق لمعاينة المخالفات البيئية',
      'ضبط وثائق استغلال المقالع والآبار ورخص الصيد',
      'اتخاذ التدابير الفورية لوقف الأضرار الإيكولوجية'
    ],
    poidsDefaut: 1.0,
    legacyTags: ['FIELD_OBS', 'ENV_AWARENESS', 'RISK_ASSESSMENT']
  },
  {
    code: 'ADMINISTRATIVE_MGMT',
    numero: 10,
    nomAr: 'التسيير الإداري وحفظ الملفات',
    nomFr: 'Gestion administrative et tenue des registres',
    domaineId: 'ADMIN',
    descriptionAr: 'معالجة الشكايات والملفات الإدارية، وتدقيق الوثائق الثبوتية، وتنظيم الأرشيف وجداول الخدمة والانضباط.',
    criteresEvaluation: [
      'التدقيق الإداري الشكلي والمسطري في الطلبات والرخص',
      'ترتيب الملفات حسب درجات الاستعجال والآجال القانونية',
      'التنظيم السليم لدفاتر وسجلات القيادة'
    ],
    poidsDefaut: 1.0,
    legacyTags: ['ADMIN_ORG', 'DOC_MGMT']
  },
  {
    code: 'LEGAL_PROCEDURAL_AWARENESS',
    numero: 11,
    nomAr: 'الوعي القانوني والمساطر الإجرائية',
    nomFr: 'Sens juridique et respect des procédures',
    domaineId: 'PJ',
    descriptionAr: 'استيعاب الآجال القانونية، واحترام حقوق المشتبه فيهم (المادة 66 ق.م.ج)، والتطبيق الصارم للتوجيهات القضائية.',
    criteresEvaluation: [
      'احترام مدد وضوابط تدبير الحراسة النظرية',
      'إشعار النيابة العامة الفوري بالوقائع والتعليمات',
      'التقيد بالاختصاص النوعي والمكاني للضابطة القضائية'
    ],
    poidsDefaut: 1.0,
    legacyTags: ['PROCEDURAL_AWARENESS', 'PROCEDURAL_UND', 'PROCEDURAL_APP']
  },
  {
    code: 'PROFESSIONAL_REPORT_PREP',
    numero: 12,
    nomAr: 'صياغة التقارير والمراسلات المهنية',
    nomFr: 'Rédaction des rapports et correspondances militaires',
    domaineId: 'PJ',
    descriptionAr: 'التحرير العسكري والرسمي للمحاضر والبرقيات الإخبارية بدقة ووضوح وموضوعية خالية من الآراء الشخصية.',
    criteresEvaluation: [
      'احترام الهيكلة الرسمية للمحاضر والتقارير العسكرية',
      'توظيف المصطلحات القانونية الدقيقة واستيفاء المعطيات',
      'الحياد التام والموضوعية في سرد الوقائع والمعاينات'
    ],
    poidsDefaut: 1.0,
    legacyTags: ['REPORT_PREPARATION']
  }
];

/**
 * Matrice initiale de correspondance configurable : Spécialités Professionnelles <-> Compétences
 * Permet d'adapter les poids et justifications sans modifier le code source.
 */
export const initialSpecialtyCompetencyMatrix = [
  // 1. Police Judiciaire (SPEC-PJ)
  {
    specialiteCode: 'SPEC-PJ',
    intituleAr: 'الشرطة القضائية وفرق الأبحاث',
    intituleFr: 'Police Judiciaire (Enquêtes & Recherches)',
    subdivision: 'الدرك الإقليمي والبحث القضائي',
    icone: 'Search',
    poidsCompetences: {
      'JUDICIAL_DOC_ANALYSIS': 0.30,
      'LEGAL_PROCEDURAL_AWARENESS': 0.25,
      'EVIDENCE_CLASSIFICATION': 0.20,
      'PROFESSIONAL_REPORT_PREP': 0.15,
      'DIGITAL_DATA_ANALYSIS': 0.10
    },
    justificationAr: 'يتطلب التخصص إتقاناً فائقاً لتحليل المحاضر الجنائية واستيعاب مقتضيات قانون المسطرة الجنائية والتدقيق الصارم في الأدلة المادية.',
    conditionsAVerifier: [
      { id: 'PJ_COND_01', type: 'ADMIN', intituleAr: 'سجل انضباطي نظيف خالٍ من أي عقوبة مسلكية', estObligatoire: true },
      { id: 'PJ_COND_02', type: 'ACADEMIC', intituleAr: 'نقطة موجبة في مادة الإجراءات والمسطرة الجنائية (>= 13.5/20)', estObligatoire: true },
      { id: 'PJ_COND_03', type: 'MEDICAL', intituleAr: 'تأهيل نفسي وأمني معتمد من المصالح المركزية', estObligatoire: true }
    ]
  },

  // 2. Sécurité Routière et Escadron Motocycliste (SPEC-ROUTE / SPEC-MOTARD)
  {
    specialiteCode: 'SPEC-ROUTE',
    intituleAr: 'السلامة الطرقية وكوكبة الدراجين',
    intituleFr: 'Sécurité Routière & Escadrons Motocyclistes',
    subdivision: 'سرايا أمن الطرقات والسلامة المرورية',
    icone: 'Bike',
    poidsCompetences: {
      'ROAD_SAFETY_PROCEDURES': 0.35,
      'FIELD_SITUATION_MGMT': 0.30,
      'LEGAL_PROCEDURAL_AWARENESS': 0.15,
      'PROFESSIONAL_REPORT_PREP': 0.10,
      'TEAM_COORDINATION': 0.10
    },
    justificationAr: 'يتطلب التخصص مهارات استثنائية في تطبيق مدونة السير، والسيطرة الميدانية السريعة على حوادث الطرقات والتمركز التكتيكي الآمن.',
    conditionsAVerifier: [
      { id: 'RT_COND_01', type: 'PHYSICAL', intituleAr: 'اللياقة البدنية لاجتياز اختبار الدراجات النارية الميداني', estObligatoire: true },
      { id: 'RT_COND_02', type: 'MEDICAL', intituleAr: 'سلامة حدة البصر وإدراك الألوان ومجال الرؤية', estObligatoire: true },
      { id: 'RT_COND_03', type: 'ADMIN', intituleAr: 'رخصة سياقة الدراجات النارية سارية المفعول', estObligatoire: false }
    ]
  },

  // 3. Analyse Numérique et Cybersécurité (SPEC-TECH / SPEC-INFO)
  {
    specialiteCode: 'SPEC-TECH',
    intituleAr: 'المعلوميات والتحليل الرقمي الجنائي',
    intituleFr: 'Informatique & Criminalistique Numérique',
    subdivision: 'المختبر الجنائي ومصلحة النظم والمواصلات',
    icone: 'Terminal',
    poidsCompetences: {
      'DIGITAL_DATA_ANALYSIS': 0.40,
      'TECHNICAL_SKILLS': 0.30,
      'EVIDENCE_CLASSIFICATION': 0.15,
      'PROFESSIONAL_REPORT_PREP': 0.15
    },
    justificationAr: 'يتطلب التخصص قدرة رفيعة على تدقيق سجلات الولوج المعقدة، والتحقيق في الآثار الرقمية، وفهم آليات الاختراق وحماية الشبكات.',
    conditionsAVerifier: [
      { id: 'TC_COND_01', type: 'ACADEMIC', intituleAr: 'شهادة أو تكوين تخصصي في الأنظمة المعلوماتية أو الشبكات', estObligatoire: true },
      { id: 'TC_COND_02', type: 'ADMIN', intituleAr: 'اجتياز فحص السرية والتصريح الأمني المعلوماتي', estObligatoire: true }
    ]
  },

  // 4. Planification Opérationnelle et État-Major (SPEC-PLAN)
  {
    specialiteCode: 'SPEC-PLAN',
    intituleAr: 'التخطيط والعمليات الميدانية',
    intituleFr: 'Planification Opérationnelle & État-Major',
    subdivision: 'القيادات الجهوية وقاعات القيادة والتنسيق',
    icone: 'Sliders',
    poidsCompetences: {
      'OPERATIONAL_PLANNING': 0.35,
      'TEAM_COORDINATION': 0.30,
      'FIELD_SITUATION_MGMT': 0.20,
      'PROFESSIONAL_REPORT_PREP': 0.15
    },
    justificationAr: 'يتطلب التخصص حس التنظيم الإستراتيجي، وتوزيع الوسائل الميدانية حسب الأسبقية، وإدارة التنسيق اللاسلكي تحت الضغط العملياتي.',
    conditionsAVerifier: [
      { id: 'PL_COND_01', type: 'ACADEMIC', intituleAr: 'معدل عام مرتفع في الانضباط والتنظيم العسكري', estObligatoire: true },
      { id: 'PL_COND_02', type: 'ADMIN', intituleAr: 'موافقة لجنة التعيين في مصالح العمليات', estObligatoire: true }
    ]
  },

  // 5. Surveillance Environnementale et Faune (SPEC-ENV)
  {
    specialiteCode: 'SPEC-ENV',
    intituleAr: 'حماية البيئة والمجالات الطبيعية',
    intituleFr: 'Surveillance Environnementale & Écologique',
    subdivision: 'خلايا البيئة وسرايا الدرك البيئي',
    icone: 'Mountain',
    poidsCompetences: {
      'ENVIRONMENTAL_MONITORING': 0.40,
      'FIELD_SITUATION_MGMT': 0.25,
      'LEGAL_PROCEDURAL_AWARENESS': 0.20,
      'PROFESSIONAL_REPORT_PREP': 0.15
    },
    justificationAr: 'يتطلب التخصص يقظة بيئية عالية، ودراية بنصوص حماية الملك الغابوي والمائي، والقدرة على التدخل في التضاريس الطبيعية الصعبة.',
    conditionsAVerifier: [
      { id: 'EV_COND_01', type: 'PHYSICAL', intituleAr: 'القدرة على العمل في التضاريس الجبلية والغابوية الوعرة', estObligatoire: true },
      { id: 'EV_COND_02', type: 'ACADEMIC', intituleAr: 'إلمام بالقوانين والتشريعات البيئية والمائية المعمول بها', estObligatoire: false }
    ]
  },

  // 6. Gestion Administrative et Juridique (SPEC-ADMIN)
  {
    specialiteCode: 'SPEC-ADMIN',
    intituleAr: 'التسيير الإداري والشؤون القانونية',
    intituleFr: 'Gestion Administrative & Affaires Juridiques',
    subdivision: 'كتابة الضبط والمصالح الإدارية والمالية',
    icone: 'FileText',
    poidsCompetences: {
      'ADMINISTRATIVE_MGMT': 0.35,
      'LEGAL_PROCEDURAL_AWARENESS': 0.25,
      'JUDICIAL_DOC_ANALYSIS': 0.20,
      'PROFESSIONAL_REPORT_PREP': 0.20
    },
    justificationAr: 'يتطلب التخصص دقة مسطرية متناهية، والتحكم في آجال معالجة الملفات والشكايات، وحسن تدبير السجلات الإدارية والأرشيف.',
    conditionsAVerifier: [
      { id: 'AD_COND_01', type: 'ACADEMIC', intituleAr: 'إجادة الصياغة الإدارية باللغة العربية والفرنسية', estObligatoire: true },
      { id: 'AD_COND_02', type: 'ADMIN', intituleAr: 'إتقان برمجيات التسيير المكتبي والأرشفة الرقمية', estObligatoire: true }
    ]
  },

  // 7. Groupement de Sécurité et d'Intervention (SPEC-GSI / SPEC-PSIG)
  {
    specialiteCode: 'SPEC-GSI',
    intituleAr: 'فرق التدخل السريع وحفظ النظام',
    intituleFr: 'Groupement de Sécurité & d\'Intervention Rapide',
    subdivision: 'مجموعات التدخل السريع والدعم العملياتي',
    icone: 'Crosshair',
    poidsCompetences: {
      'FIELD_SITUATION_MGMT': 0.40,
      'TEAM_COORDINATION': 0.30,
      'LEGAL_PROCEDURAL_AWARENESS': 0.15,
      'ROAD_SAFETY_PROCEDURES': 0.15
    },
    justificationAr: 'يتطلب التخصص شجاعة ميدانية وانضباطاً تكتيكياً عالياً، والقدرة على التدخل المباشر في حالات التهديد الأمني واحتجاز الرهائن.',
    conditionsAVerifier: [
      { id: 'GSI_COND_01', type: 'PHYSICAL', intituleAr: 'اجتياز اختبارات القدرة البدنية الشاقة (نقطة >= 16/20)', estObligatoire: true },
      { id: 'GSI_COND_02', type: 'MEDICAL', intituleAr: 'فحص طبي وبدني دقيق خاص بقوات التدخل السريع', estObligatoire: true }
    ]
  }
];

/**
 * Configuration globale des critères d'évaluation des tâches
 */
export const defaultScoringCriteriaConfig = {
  accuracyWeight: 0.25,
  decisionRelevanceWeight: 0.20,
  classificationWeight: 0.15,
  proceduralRespectWeight: 0.15,
  organizationWeight: 0.10,
  reportCompletenessWeight: 0.10,
  infoUsageWeight: 0.05
};

