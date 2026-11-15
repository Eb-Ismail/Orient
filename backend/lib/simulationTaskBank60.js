// ==============================================================================
// ORIENT-GR - Banque Centrale de Scénarios et Tâches de Simulation Professionnelle
// بنك المهام والسيناريوهات المهنية التفاعلية • 60 مهمة محاكاة واقعية
// 10 مهام لكل مجال مهني • الدرك الملكي • المملكة المغربية
// ==============================================================================

export const simulationTaskBank60 = [
  // ============================================================================
  // المجال 1: Recherche et Investigation Judiciaire (التحقيق والبحث القضائي) - 10 مهام
  // ============================================================================
  {
    taskId: 'SCEN-PJ-01',
    numero: 1,
    domaineId: 'PJ',
    domaineAr: 'التحقيق والبحث القضائي',
    domaineFr: 'Recherche et Investigation Judiciaire',
    titreAr: 'فحص مسرح جريمة سرقة مستودع ومضاهاة التواريخ',
    titreFr: 'Analyse du lieu de vol et confrontation des dates',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['DOC_ANALYSIS', 'ACCURACY', 'PROCEDURAL_AWARENESS'],
    interactionType: 'DOCUMENT_ANALYSIS',
    consigneAr: 'افحص محضر المعاينة الأولية ومحضر استماع الحارس الليلي. استخرج التوقيت الدقيق لكسر الباب الخلفي ووسيلة الدخول.',
    scenarioData: {
      documents: [
        {
          docId: 'PJ-01-D1',
          titreAr: 'محضر المعاينة ومسرح الجريمة رقم 142/ق.ض',
          source: 'المركز الترابي للدرك الملكي',
          date: '18 أكتوبر 2026 - 07:45',
          tampon: 'الدرك الملكي • فرقة الشرطة القضائية',
          contenuAr: 'عاينّا كسر القفل الخارجي للمستودع بواسطة قاطع حديد هيدروليكي. وُجدت آثار عجلات شاحنة نفعية متجهة شمالاً نحو الطريق الوطنية. كما تم حجز قفاز قماشي أسود ملطخ ببقع زيتية قرب الباب الخلفي. الفحص أثبت وقوع الاقتحام بين 02:40 و 03:20.'
        },
        {
          docId: 'PJ-01-D2',
          titreAr: 'إفادة الحارس الليلي (عمر.ب)',
          source: 'فرقة الأبحاث الجنائية',
          date: '18 أكتوبر 2026 - 09:15',
          tampon: 'تصريح مستمع إليه قانوناً',
          contenuAr: 'صرح: "كنت في مقصورة الحراسة طيلة الليل من 02:00 إلى 06:00، ولم أشاهد أو أسمع أي حركة غريبة. الأبواب كانت موصدة بإحكام."'
        }
      ],
      questionsVerif: [
        {
          id: 'PJ01_Q1',
          questionAr: 'ما هي الأداة المستخدمة في كسر القفل الخارجي وفق المحضر؟',
          optionsAr: ['مفتاح مقلد', 'قاطع حديد هيدروليكي', 'مطرقة حديدية ثقيلة', 'منشار يدوي'],
          correctIndex: 1
        },
        {
          id: 'PJ01_Q2',
          questionAr: 'ما هو التقدير الزمني لوقوع حادثة الاقتحام؟',
          optionsAr: ['بين 23:00 و 00:30', 'بين 02:40 و 03:20', 'بين 05:00 و 06:00', 'غير محدد بالمحضر'],
          correctIndex: 1
        }
      ]
    },
    scoringConfig: {
      type: 'MULTIPLE_CHOICE',
      expectedAnswers: { PJ01_Q1: 1, PJ01_Q2: 1 }
    }
  },

  {
    taskId: 'SCEN-PJ-02',
    numero: 2,
    domaineId: 'PJ',
    domaineAr: 'التحقيق والبحث القضائي',
    domaineFr: 'Recherche et Investigation Judiciaire',
    titreAr: 'تصنيف وتحريز المحجوزات المرفوعة من مسكن مشتبه فيه',
    titreFr: 'Classification légale des scellés et pièces à conviction',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['CLASSIFICATION', 'PROCEDURAL_AWARENESS'],
    interactionType: 'CLASSIFICATION',
    consigneAr: 'صنف المحجوزات التالية المرفوعة أثناء التفتيش القضائي إلى فئاتها القانونية السليمة لحفظ سلسلة الحراسة.',
    scenarioData: {
      categories: [
        { id: 'CAT_MATERIEL', titreAr: 'أدلة مادية ملموسة (Pièces à conviction)', couleur: 'emerald' },
        { id: 'CAT_NUMERIQUE', titreAr: 'قرائن رقمية وإلكترونية (Indices numériques)', couleur: 'blue' },
        { id: 'CAT_DOCUMENTS', titreAr: 'أوراق وسندات خطية (Documents écrits)', couleur: 'amber' }
      ],
      elements: [
        { id: 'PJ02_E1', texteAr: 'سلاح أبيض من الحجم الكبير يحمل آثار صدأ وخدوش', catCorrecte: 'CAT_MATERIEL' },
        { id: 'PJ02_E2', texteAr: 'مفتاح تخزين USB مشفر عثر عليه داخل درج مقفل', catCorrecte: 'CAT_NUMERIQUE' },
        { id: 'PJ02_E3', texteAr: 'دفتر حسابات ورقي يحتوي على أسماء وتواريخ معاملات مالية مشبوهة', catCorrecte: 'CAT_DOCUMENTS' },
        { id: 'PJ02_E4', texteAr: 'هاتف ذكي ببطاقتي اتصال مع بطاقة ذاكرة خارجية', catCorrecte: 'CAT_NUMERIQUE' },
        { id: 'PJ02_E5', texteAr: 'وصل تحويل بنكي ورقي بقيمة 50.000 درهم باسم شخص مجهول', catCorrecte: 'CAT_DOCUMENTS' },
        { id: 'PJ02_E6', texteAr: 'سترة صوفية ملطخة بآثار دماء مفترضة', catCorrecte: 'CAT_MATERIEL' }
      ]
    },
    scoringConfig: {
      type: 'CATEGORIZATION',
      correctMapping: {
        PJ02_E1: 'CAT_MATERIEL',
        PJ02_E2: 'CAT_NUMERIQUE',
        PJ02_E3: 'CAT_DOCUMENTS',
        PJ02_E4: 'CAT_NUMERIQUE',
        PJ02_E5: 'CAT_DOCUMENTS',
        PJ02_E6: 'CAT_MATERIEL'
      }
    }
  },

  {
    taskId: 'SCEN-PJ-03',
    numero: 3,
    domaineId: 'PJ',
    domaineAr: 'التحقيق والبحث القضائي',
    domaineFr: 'Recherche et Investigation Judiciaire',
    titreAr: 'إعادة بناء التسلسل الزمني لعملية سطو بنكي من أقوال الشهود',
    titreFr: 'Reconstitution chronologique des faits d\'un braquage',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 7,
    pointsMax: 20,
    competenceTags: ['ACCURACY', 'DOC_ANALYSIS', 'PROCEDURAL_AWARENESS'],
    interactionType: 'PRIORITIZATION',
    consigneAr: 'رتب الوقائع والأحداث التالية وفق تسلسلها الزمني الفعلي المتوافق مع تسجيلات كاميرات المراقبة وأقوال الشهود المتقاطعة.',
    scenarioData: {
      itemsToOrder: [
        { id: 'PJ03_I1', texteAr: '08:55 - ترجل شخصين ملثمين من دراجة نارية كبيرة الحجم أمام الوكالة البنكية', ordreCorrect: 1 },
        { id: 'PJ03_I2', texteAr: '08:57 - اقتحام قاعة الصندوق وإطلاق عيار ناري تحذيري في السقف لشل حركة الحاضرين', ordreCorrect: 2 },
        { id: 'PJ03_I3', texteAr: '09:00 - إجبار الصندوقي على ملء حقيبة ظهر بالمبالغ النقدية المتوفرة بالصندوق الحديدي', ordreCorrect: 3 },
        { id: 'PJ03_I4', texteAr: '09:02 - تشغيل نظام الإنذار الصامت من طرف مدير الوكالة عبر زر الطوارئ المكتبي', ordreCorrect: 4 },
        { id: 'PJ03_I5', texteAr: '09:04 - فرار الفاعلين بسرعة فائقة عبر المدار الجنوبي باتجاه الطريق الوطنية', ordreCorrect: 5 }
      ]
    },
    scoringConfig: {
      type: 'ORDERING',
      correctOrder: ['PJ03_I1', 'PJ03_I2', 'PJ03_I3', 'PJ03_I4', 'PJ03_I5']
    }
  },

  {
    taskId: 'SCEN-PJ-04',
    numero: 4,
    domaineId: 'PJ',
    domaineAr: 'التحقيق والبحث القضائي',
    domaineFr: 'Recherche et Investigation Judiciaire',
    titreAr: 'تدقيق إفادة شاهد واكتشاف التناقضات الصريحة',
    titreFr: 'Détection d\'incohérences majeures d\'audition',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 5,
    pointsMax: 20,
    competenceTags: ['ACCURACY', 'DOC_ANALYSIS'],
    interactionType: 'CONTRADICTION_DETECTION',
    consigneAr: 'افحص التصريحات التالية للشاهد وقارنها مع وقائع المعاينة المادية الثابتة، وحدد التصريحات التي تشكل تناقضاً لا يقبل الشك.',
    scenarioData: {
      itemsToEvaluate: [
        {
          id: 'PJ04_C1',
          declarationAr: 'صرح الشاهد: "كنت بمفردي في الشارع المقابل تماماً للوكالة من الساعة 08:30 إلى 09:30 صباحاً."',
          preuveAr: 'سجل كاميرا المقهى المجاور يثبت دخوله المقهى وجلوسه في الداخل على الساعة 08:40 وبقاءه إلى 09:20.',
          isContradiction: true
        },
        {
          id: 'PJ04_C2',
          declarationAr: 'صرح الشاهد: "كانت الدراجة النارية ذات لون أسود وقاتمة."',
          preuveAr: 'محضر المعاينة وشهود آخرون يؤكدون أن الدراجة كانت سوداء اللون مع حواف رمادية.',
          isContradiction: false
        },
        {
          id: 'PJ04_C3',
          declarationAr: 'صرح الشاهد: "لم يسبق لي التعرف على أي من الجناة في حياتي نهائياً."',
          preuveAr: 'سجل الاتصالات الهاتفية يثبت تبادل 14 مكالمة مع أحد المشتبه فيهم خلال الـ 48 ساعة السابقة.',
          isContradiction: true
        }
      ]
    },
    scoringConfig: {
      type: 'BOOLEAN_MAP',
      expectedAnswers: { PJ04_C1: true, PJ04_C2: false, PJ04_C3: true }
    }
  },

  {
    taskId: 'SCEN-PJ-05',
    numero: 5,
    domaineId: 'PJ',
    domaineAr: 'التحقيق والبحث القضائي',
    domaineFr: 'Recherche et Investigation Judiciaire',
    titreAr: 'اتخاذ قرار مسطري في حالة التلبس بتهريب بضائع',
    titreFr: 'Décision procédurale en situation de flagrant délit',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 5,
    pointsMax: 20,
    competenceTags: ['PROCEDURAL_AWARENESS', 'DECISION_MAKING'],
    interactionType: 'DECISION_SCENARIO',
    consigneAr: 'حدد القرار الإجرائي السليم طبقاً لمقتضيات قانون المسطرة الجنائية المغربي.',
    scenarioData: {
      scenarios: [
        {
          id: 'PJ05_S1',
          questionAr: 'تم ضبط شاحنة محملة بأطنان من السلع المهربة ليلاً في حالة تلبس. ما هو الإجراء القانوني الفوري الواجب اتخاذه مع السائق ومساعده؟',
          optionsAr: [
            'إخلاء سبيلهما مع حجز البضاعة واستدعاؤهما لاحقاً شفوياً',
            'إشعار النيابة العامة فوراً، ووضعهما تحت تدبير الحراسة النظرية مع تعليله وتلاوة الحقوق القانونية المنصوص عليها بالمادة 66 من ق.م.ج',
            'إجراء صلح مالي فوري مع السائق دون تحرير محضر رسمي',
            'تفتيش مساكن عائلتيهما في مدينة أخرى دون إذن قضائي'
          ],
          correctIndex: 1
        }
      ]
    },
    scoringConfig: {
      type: 'MULTIPLE_CHOICE',
      expectedAnswers: { PJ05_S1: 1 }
    }
  },

  {
    taskId: 'SCEN-PJ-06',
    numero: 6,
    domaineId: 'PJ',
    domaineAr: 'التحقيق والبحث القضائي',
    domaineFr: 'Recherche et Investigation Judiciaire',
    titreAr: 'تدقيق أرقام هياكل المركبات المشبوهة واكتشاف التزوير',
    titreFr: 'Confrontation des numéros de châssis et détection de fraude',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['DATA_PROCESSING', 'ACCURACY'],
    interactionType: 'DATASET_AUDIT',
    consigneAr: 'تفحص جدول المركبات الموقوفة بالورشة الميكانيكية المشبوهة، وحدد المركبات التي تظهر عليها أمارات تحريف رقم الهيكل أو تباين سنة الصنع.',
    scenarioData: {
      dataset: [
        { id: 1, typeAr: 'سيارة نفعية (بيجو بارتنر)', vin: 'VF37J9HN0CZ124589', docVin: 'VF37J9HN0CZ124589', year: 2021, status: 'NORMAL' },
        { id: 2, typeAr: 'مركبة رباعية الدفع (تويوتا)', vin: 'JT3HN86R7X0892341', docVin: 'JT3HN86R7X0892349', year: 2023, status: 'ANOMALY' },
        { id: 3, typeAr: 'شاحنة نقل بضائع (ميتسوبيشي)', vin: 'JMBJN0015T0019283', docVin: 'JMBJN0015T0019283', year: 2019, status: 'NORMAL' },
        { id: 4, typeAr: 'سيارة سياحية فاخرة (مرسيدس)', vin: 'WDD2040021F982103', docVin: 'WDD2040021F982999', year: 2022, status: 'ANOMALY' }
      ],
      anomaliesToSelect: [2, 4]
    },
    scoringConfig: {
      type: 'SET_MATCH',
      expectedSet: [2, 4]
    }
  },

  {
    taskId: 'SCEN-PJ-07',
    numero: 7,
    domaineId: 'PJ',
    domaineAr: 'التحقيق والبحث القضائي',
    domaineFr: 'Recherche et Investigation Judiciaire',
    titreAr: 'فرز الأدلة القانونية المقبولة والأدلة المشوبة بالبطلان',
    titreFr: 'Tri des preuves recevables vs viciées de nullité',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['PROCEDURAL_AWARENESS', 'CLASSIFICATION'],
    interactionType: 'CLASSIFICATION',
    consigneAr: 'صنف الإجراءات والقرائن التالية حسب سلامتها المسطرية طبقاً لمقتضيات قانون المسطرة الجنائية.',
    scenarioData: {
      categories: [
        { id: 'VALIDE', titreAr: 'إجراءات وأدلة صحيحة قانوناً (Actes réguliers)', couleur: 'emerald' },
        { id: 'NULLE', titreAr: 'إجراءات باطلة لمخالفة قواعد النظام العام (Actes nuls)', couleur: 'rose' }
      ],
      elements: [
        { id: 'PJ07_E1', texteAr: 'تفتيش منزل خارج حالة التلبس تم في الساعة 02:00 صباحاً دون إذن مكتوب من صاحب المنزل أو موافقة قاضي التحقيق', catCorrecte: 'NULLE' },
        { id: 'PJ07_E2', texteAr: 'حجز سلاح الجريمة في مسرح الجريمة العلني فور وقوع الاعتداء بحضور الشهود', catCorrecte: 'VALIDE' },
        { id: 'PJ07_E3', texteAr: 'إجراء استنطاق المشتبه فيه تحت وطأة الإكراه المادي أو التهديد المعنوي', catCorrecte: 'NULLE' },
        { id: 'PJ07_E4', texteAr: 'استخلاص تسجيلات كاميرا شارع عام بقرار تسخير قضائي رسمي صادر عن النيابة العامة', catCorrecte: 'VALIDE' }
      ]
    },
    scoringConfig: {
      type: 'CATEGORIZATION',
      correctMapping: {
        PJ07_E1: 'NULLE',
        PJ07_E2: 'VALIDE',
        PJ07_E3: 'NULLE',
        PJ07_E4: 'VALIDE'
      }
    }
  },

  {
    taskId: 'SCEN-PJ-08',
    numero: 8,
    domaineId: 'PJ',
    domaineAr: 'التحقيق والبحث القضائي',
    domaineFr: 'Recherche et Investigation Judiciaire',
    titreAr: 'تقدير الموقف في تفتيش منزل أثناء تعقب فار خطير',
    titreFr: 'Discernement opérationnel lors d\'une perquisition de nuit',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 5,
    pointsMax: 20,
    competenceTags: ['DECISION_MAKING', 'PROCEDURAL_AWARENESS'],
    interactionType: 'DECISION_SCENARIO',
    consigneAr: 'اتخذ القرار الميداني الذي يجمع بين الفعالية الأمنية والاحترام التام للقانون.',
    scenarioData: {
      scenarios: [
        {
          id: 'PJ08_S1',
          questionAr: 'أثناء تعقب شخص مبحوث عنه في جناية قتل متلبس بها، فر المشتبه فيه والتجأ إلى منزل مسكون في الساعة 23:30 ليلاً. كيف يتصرف ضابط الدرك الملكي؟',
          optionsAr: [
            'الانسحاب والعودة في اليوم التالي في تمام السادسة صباحاً',
            'تطويق المنزل من كافة المنافذ لمنع فراره، وطلب موافقة فورية واستعجالية من النيابة العامة أو الاستناد لمقتضيات المادة 62 لكون الجريمة متلبس بها وملاحق بالصياح',
            'إطلاق النار على نوافذ المنزل لإجباره على الخروج',
            'تفجير الباب دون أي مبرر قانوني'
          ],
          correctIndex: 1
        }
      ]
    },
    scoringConfig: {
      type: 'MULTIPLE_CHOICE',
      expectedAnswers: { PJ08_S1: 1 }
    }
  },

  {
    taskId: 'SCEN-PJ-09',
    numero: 9,
    domaineId: 'PJ',
    domaineAr: 'التحقيق والبحث القضائي',
    domaineFr: 'Recherche et Investigation Judiciaire',
    titreAr: 'تحرير تقرير إخباري موجه للنيابة العامة في قضية تزوير',
    titreFr: 'Rédaction d\'un rapport de synthèse de flagrance',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 8,
    pointsMax: 20,
    competenceTags: ['REPORT_PREPARATION', 'DOC_ANALYSIS'],
    interactionType: 'REPORT_PREPARATION',
    consigneAr: 'حرر التقرير الإخباري التركيبي الموجه للسيد وكيل الملك، موضحاً الوقائع والمحجوزات وتكييف الفعل الجرمي.',
    scenarioData: {
      champsAttendus: {
        objet: 'تقرير إخباري في شأن تزوير وثائق تصدير جمركية واستعمالها',
        destinataire: 'إلى السيد وكيل الملك لدى المحكمة الابتدائية',
        motsClesRequis: ['الحراسة النظرية', 'تزوير', 'المحجوزات', 'المعاينة', 'النيابة العامة', 'الأختام']
      },
      rubriqueCriteres: [
        'الدقة في بيان السند القانوني',
        'ذكر هوية المشتبه فيه بدقة',
        'جرد الأختام المحجوزة والمستندات',
        'احترام الأسلوب الإداري العسكري الرسمي'
      ]
    },
    scoringConfig: {
      type: 'REPORT_RUBRIC',
      minWords: 35,
      requiredKeywords: ['الحراسة النظرية', 'تزوير', 'المحجوزات', 'المعاينة', 'النيابة العامة', 'الأختام']
    }
  },

  {
    taskId: 'SCEN-PJ-10',
    numero: 10,
    domaineId: 'PJ',
    domaineAr: 'التحقيق والبحث القضائي',
    domaineFr: 'Recherche et Investigation Judiciaire',
    titreAr: 'تحليل سجل المكالمات والمواقع الجغرافية لمشتبه فيه',
    titreFr: 'Analyse des données de téléphonie (fadettes) et bornage',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['DATA_PROCESSING', 'ACCURACY'],
    interactionType: 'DATASET_AUDIT',
    consigneAr: 'افحص سجل اتصالات المشتبه فيه وحدد الأرقام التي تزامنت مع وقت ارتكاب الجريمة (بين 01:00 و 02:00) والمتموقعة قرب البرج الهاتفي للمستودع.',
    scenarioData: {
      dataset: [
        { id: 101, timestamp: '2026-10-18 00:15', caller: '0661XXXX11', cellTower: 'برج وسط المدينة', duration: '45s', status: 'NORMAL' },
        { id: 102, timestamp: '2026-10-18 01:14', caller: '0663XXXX88', cellTower: 'برج المنطقة الصناعية - المستودع', duration: '120s', status: 'SUSPICIOUS' },
        { id: 103, timestamp: '2026-10-18 01:42', caller: '0663XXXX88', cellTower: 'برج المنطقة الصناعية - المستودع', duration: '90s', status: 'SUSPICIOUS' },
        { id: 104, timestamp: '2026-10-18 03:30', caller: '0660XXXX22', cellTower: 'برج الطريق السيار شمال', duration: '30s', status: 'NORMAL' }
      ],
      anomaliesToSelect: [102, 103]
    },
    scoringConfig: {
      type: 'SET_MATCH',
      expectedSet: [102, 103]
    }
  },

  // ============================================================================
  // المجال 2: Sécurité Routière et Terrain (السلامة الطرقية والتدخل الميداني) - 10 مهام
  // ============================================================================
  {
    taskId: 'SCEN-RT-01',
    numero: 11,
    domaineId: 'ROUTE',
    domaineAr: 'السلامة الطرقية والتدخل الميداني',
    domaineFr: 'Sécurité Routière et Terrain',
    titreAr: 'تقييم مخاطر حادث اصطدام شاحنة صهريجية على الطريق السيار',
    titreFr: 'Évaluation des risques lors d\'un accident de camion-citerne',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['RISK_ASSESSMENT', 'FIELD_ORG'],
    interactionType: 'INTERACTIVE_MAP',
    consigneAr: 'استعرض الخريطة التفاعلية لحادث الطريق السيار، وحدد البؤر الثلاث الكبرى التي تشكل خطراً محدقاً وفورياً.',
    scenarioData: {
      mapData: {
        axe: 'الطريق السيار A1',
        pk: 'PK 84+200',
        zones: [
          { id: 'RT01_Z1', nomAr: 'الشاحنة الصهريجية المتسربة', descriptionAr: 'تسرب بنزين قابل للاشتعال على مسافة 40 متراً.', dangerLevel: 'HIGH' },
          { id: 'RT01_Z2', nomAr: 'السيارة المحاصرة تحت المقطورة', descriptionAr: 'ركاب مصابون بجروح بليغة يحتاجون لتدخل الوقاية المدنية.', dangerLevel: 'CRITICAL' },
          { id: 'RT01_Z3', nomAr: 'مسار القدوم الخلفي في الضباب', descriptionAr: 'مركبات قادمة بسرعة قد تصطدم بموقع الحادث.', dangerLevel: 'EXTREME' }
        ]
      },
      hotspotsAIdentifier: [
        { id: 'RT01_H1', titreAr: 'بؤرة خطر اشتعال الوقود المتسرب', zoneId: 'RT01_Z1', correct: true },
        { id: 'RT01_H2', titreAr: 'خطر اصطدام خلفي متسلسل من المركبات القادمة', zoneId: 'RT01_Z3', correct: true },
        { id: 'RT01_H3', titreAr: 'إنقاذ الركاب المحاصرين تحت المقطورة', zoneId: 'RT01_Z2', correct: true }
      ]
    },
    scoringConfig: {
      type: 'HOTSPOT_SELECTION',
      expectedHotspots: ['RT01_H1', 'RT01_H2', 'RT01_H3']
    }
  },

  {
    taskId: 'SCEN-RT-02',
    numero: 12,
    domaineId: 'ROUTE',
    domaineAr: 'السلامة الطرقية والتدخل الميداني',
    domaineFr: 'Sécurité Routière et Terrain',
    titreAr: 'ترتيب أولويات التدخل في حادثة سير بدنية جسيمة',
    titreFr: 'Hiérarchisation des urgences d\'intervention routière',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 5,
    pointsMax: 20,
    competenceTags: ['FIELD_ORG', 'PROCEDURAL_APP'],
    interactionType: 'PRIORITIZATION',
    consigneAr: 'رتب الإجراءات الميدانية الفورية طبقاً للمعيار العملياتي المعتمد لكوكبة دراجي الدرك الملكي.',
    scenarioData: {
      itemsToOrder: [
        { id: 'RT02_1', texteAr: 'تثبيت التشوير التحذيري المسبق على مسافة 500 متر على الأقل لحماية الموقع من الاصطدام الخلفي', ordreCorrect: 1 },
        { id: 'RT02_2', texteAr: 'إشعار قاعة المواصلات لطلب الإسعاف وشاحنات إطفاء المواد البترولية', ordreCorrect: 2 },
        { id: 'RT02_3', texteAr: 'إخلاء محيط التسرب ومنع إشعال أي مصدر حراري أو تدخين من الفضوليين', ordreCorrect: 3 },
        { id: 'RT02_4', texteAr: 'إسعاف الجرحى وتأمين ممر لوصول سيارات الوقاية المدنية', ordreCorrect: 4 },
        { id: 'RT02_5', texteAr: 'مباشرة المعاينات الفنية وتفريغ حركة السير تدريجياً عبر تحويل المسار', ordreCorrect: 5 }
      ]
    },
    scoringConfig: {
      type: 'ORDERING',
      correctOrder: ['RT02_1', 'RT02_2', 'RT02_3', 'RT02_4', 'RT02_5']
    }
  },

  {
    taskId: 'SCEN-RT-03',
    numero: 13,
    domaineId: 'ROUTE',
    domaineAr: 'السلامة الطرقية والتدخل الميداني',
    domaineFr: 'Sécurité Routière et Terrain',
    titreAr: 'تثبيت التشوير الطرقي الاستعجالي والمحيط الأمني في الضباب',
    titreFr: 'Sécurisation et balisage d\'urgence par visibilité réduite',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 5,
    pointsMax: 20,
    competenceTags: ['FIELD_ORG', 'RISK_ASSESSMENT'],
    interactionType: 'DECISION_SCENARIO',
    consigneAr: 'اختر الترتيب الأمني الأنسب لحماية دورية الدرك الملكي ومستعملي الطريق.',
    scenarioData: {
      scenarios: [
        {
          id: 'RT03_S1',
          questionAr: 'في ظل ضباب كثيف تنعدم معه الرؤية إلى أقل من 30 متراً، كيف يجب وضع سيارة الدورية والمخاريط الفوسفورية لحماية حادث متوقف؟',
          optionsAr: [
            'إطفاء أضواء الدورية لتوفير بطارية السيارة والوقوف ملاصقاً للسيارة المصابة',
            'وضع سيارة الدورية في منعرج الحماية مع تشغيل كامل الأضواء الدوارة والفلاشات ونشر وميض ضوئي فوسفوري ومخاريط قبل الحادث بـ 400 متر على الأقل',
            'الوقوف أمام الحادث من الجهة المقابلة لحركة المرور',
            'الاكتفاء بالصراخ واستعمال الصفارة اليدوية'
          ],
          correctIndex: 1
        }
      ]
    },
    scoringConfig: {
      type: 'MULTIPLE_CHOICE',
      expectedAnswers: { RT03_S1: 1 }
    }
  },

  {
    taskId: 'SCEN-RT-04',
    numero: 14,
    domaineId: 'ROUTE',
    domaineAr: 'السلامة الطرقية والتدخل الميداني',
    domaineFr: 'Sécurité Routière et Terrain',
    titreAr: 'فحص وتفسير قرص تسجيل السرعة (Chronotachygraphe)',
    titreFr: 'Lecture et interprétation du disque tachygraphe',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['DATA_PROCESSING', 'ACCURACY'],
    interactionType: 'DATASET_AUDIT',
    consigneAr: 'افحص قراءات فترات القيادة للشاحنة واستخرج المخالفات الصريحة لتجاوز وقت القيادة المتواصل دون استراحة.',
    scenarioData: {
      dataset: [
        { id: 201, period: '06:00 - 10:30', activity: 'قيادة متواصلة', duration: '4h 30min', status: 'LEGAL' },
        { id: 202, period: '10:30 - 11:15', activity: 'استراحة نظامية', duration: '45min', status: 'LEGAL' },
        { id: 203, period: '11:15 - 17:00', activity: 'قيادة متواصلة بدون توقف', duration: '5h 45min', status: 'INFRACTION' },
        { id: 204, period: '17:00 - 17:30', activity: 'استراحة سريعة', duration: '30min', status: 'LEGAL' },
        { id: 205, period: '17:30 - 23:00', activity: 'قيادة ليلية متواصلة', duration: '5h 30min', status: 'INFRACTION' }
      ],
      anomaliesToSelect: [203, 205]
    },
    scoringConfig: {
      type: 'SET_MATCH',
      expectedSet: [203, 205]
    }
  },

  {
    taskId: 'SCEN-RT-05',
    numero: 15,
    domaineId: 'ROUTE',
    domaineAr: 'السلامة الطرقية والتدخل الميداني',
    domaineFr: 'Sécurité Routière et Terrain',
    titreAr: 'تصنيف مخالفات مدونة السير حسب الدرجات القانونية',
    titreFr: 'Classification des infractions selon le Code de la Route',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['CLASSIFICATION', 'PROCEDURAL_APP'],
    interactionType: 'CLASSIFICATION',
    consigneAr: 'صنف المخالفات الميدانية التالية طبقاً لدرجات مدونة السير المغربية.',
    scenarioData: {
      categories: [
        { id: 'DEG_1', titreAr: 'مخالفات الدرجة الأولى (700 درهم)', couleur: 'rose' },
        { id: 'DEG_2', titreAr: 'مخالفات الدرجة الثانية (500 درهم)', couleur: 'amber' },
        { id: 'DELIT', titreAr: 'جنح السير المحالة على المحكمة', couleur: 'emerald' }
      ],
      elements: [
        { id: 'RT05_E1', texteAr: 'عدم احترام علامة قف (Stop) أو الضوء الأحمر', catCorrecte: 'DEG_1' },
        { id: 'RT05_E2', texteAr: 'السياقة تحت تأثير الكحول أو المواد المخدرة', catCorrecte: 'DELIT' },
        { id: 'RT05_E3', texteAr: 'عدم ارتداء حزام السلامة داخل المجال الحضري أو بالخارج', catCorrecte: 'DEG_2' },
        { id: 'RT05_E4', texteAr: 'الفرار بعد ارتكاب حادثة سير مادية أو بدنية', catCorrecte: 'DELIT' },
        { id: 'RT05_E5', texteAr: 'تجاوز السرعة القصوى المسموح بها بأكثر من 30 كم/س وأقل من 50 كم/س', catCorrecte: 'DEG_1' }
      ]
    },
    scoringConfig: {
      type: 'CATEGORIZATION',
      correctMapping: {
        RT05_E1: 'DEG_1',
        RT05_E2: 'DELIT',
        RT05_E3: 'DEG_2',
        RT05_E4: 'DELIT',
        RT05_E5: 'DEG_1'
      }
    }
  },

  {
    taskId: 'SCEN-RT-06',
    numero: 16,
    domaineId: 'ROUTE',
    domaineAr: 'السلامة الطرقية والتدخل الميداني',
    domaineFr: 'Sécurité Routière et Terrain',
    titreAr: 'إدارة السد القضائي الثابت في ملتقى طرق استراتيجي',
    titreFr: 'Gestion tactique d\'un barrage judiciaire routier',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 5,
    pointsMax: 20,
    competenceTags: ['FIELD_ORG', 'DECISION_MAKING'],
    interactionType: 'DECISION_SCENARIO',
    consigneAr: 'اتخذ الإجراءات العملياتية لضمان سلامة عناصر السد وتفادي محاولات الاقتحام.',
    scenarioData: {
      scenarios: [
        {
          id: 'RT06_S1',
          questionAr: 'أثناء اشتغال السد القضائي ليلاً، ما هو الترتيب الواجب توفيره لصد مركبة مشبوهة قد تحاول كسر السد والفرار؟',
          optionsAr: [
            'الوقوف أمام المركبة مباشرة بصدور عارية لإجبارها على التوقف',
            'نشر جهاز مشواك توقيف السيارات (Herse / Stop Stick) في موقع الانسحاب، مع تموقع عنصر مسلح في نقطة حماية مغطاة بزاوية آمنة',
            'إطفاء الأضواء ومباغتة السائق فجأة',
            'عدم اتخاذ أي احتياط والاعتماد على حسن نية السائقين'
          ],
          correctIndex: 1
        }
      ]
    },
    scoringConfig: {
      type: 'MULTIPLE_CHOICE',
      expectedAnswers: { RT06_S1: 1 }
    }
  },

  {
    taskId: 'SCEN-RT-07',
    numero: 17,
    domaineId: 'ROUTE',
    domaineAr: 'السلامة الطرقية والتدخل الميداني',
    domaineFr: 'Sécurité Routière et Terrain',
    titreAr: 'التعامل مع سائق في حالة سكر علني يرفض الخضوع للفحص',
    titreFr: 'Refus de se soumettre au dépistage d\'alcoolémie',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 5,
    pointsMax: 20,
    competenceTags: ['PROCEDURAL_APP', 'DECISION_MAKING'],
    interactionType: 'DECISION_SCENARIO',
    consigneAr: 'حدد المسطرة القانونية الواجبة عند رفض النفخ في جهاز فحص نسبة الكحول في الهواء المنبعث.',
    scenarioData: {
      scenarios: [
        {
          id: 'RT07_S1',
          questionAr: 'رفض سائق سيارة بشكل قطعي الخضوع للرائز بواسطة جهاز قياس النفس. كيف يطبق ضابط الدرك الملكي القانون؟',
          optionsAr: [
            'تركه يواصل طريقه لعدم توفر نتيجة فحص رقمية',
            'معاينة حالة السكر الظاهرة، حجز رخصة السياقة والمركبة، توجيهه إلى المستشفى لإجراء فحص الدم الطبي تحت إشراف النيابة العامة، مع تضمين حالة الرفض الصريح بالمحضر لكونها تشكل جنحة قائمة بذاتها',
            'إجباره بالقوة البدنية على النفخ في الجهاز',
            'تغريمه 100 درهم وإطلاق سراحه فوراً'
          ],
          correctIndex: 1
        }
      ]
    },
    scoringConfig: {
      type: 'MULTIPLE_CHOICE',
      expectedAnswers: { RT07_S1: 1 }
    }
  },

  {
    taskId: 'SCEN-RT-08',
    numero: 18,
    domaineId: 'ROUTE',
    domaineAr: 'السلامة الطرقية والتدخل الميداني',
    domaineFr: 'Sécurité Routière et Terrain',
    titreAr: 'تخطيط مسار انحراف حركة المرور إثر انقطاع الطريق الوطنية',
    titreFr: 'Planification d\'un itinéraire de déviation d\'urgence',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['FIELD_ORG', 'RISK_ASSESSMENT'],
    interactionType: 'INTERACTIVE_MAP',
    consigneAr: 'افحص الخريطة وحدد المسلك البديل الصالح للمركبات الثقيلة مع استبعاد المسالك الضيقة المعرضة للفيضان.',
    scenarioData: {
      mapData: {
        axe: 'الطريق الوطنية رقم N8',
        pk: 'PK 112 (مقطع جبلي)',
        zones: [
          { id: 'RT08_Z1', nomAr: 'المقطع المنقطع بسبب الانهيار', descriptionAr: 'انسداد تام بالصخور المنهارة.', dangerLevel: 'EXTREME' },
          { id: 'RT08_Z2', nomAr: 'المسلك الجهوي المعبد R502', descriptionAr: 'طريق معبدة بعرض 7 أمتار تتسع للشاحنات والحافلات.', dangerLevel: 'LOW' },
          { id: 'RT08_Z3', nomAr: 'المسلك القروي غير المعبد', descriptionAr: 'مسلك طيني ضيق يمر بوادٍ مهدد بالسيول.', dangerLevel: 'HIGH' }
        ]
      },
      hotspotsAIdentifier: [
        { id: 'RT08_H1', titreAr: 'المسار الآمن والمعتمد للتحويل (الطريق الجهوية R502)', zoneId: 'RT08_Z2', correct: true },
        { id: 'RT08_H2', titreAr: 'نقطة القطع الكامل وتثبيت حاجز المنع الصارم', zoneId: 'RT08_Z1', correct: true }
      ]
    },
    scoringConfig: {
      type: 'HOTSPOT_SELECTION',
      expectedHotspots: ['RT08_H1', 'RT08_H2']
    }
  },

  {
    taskId: 'SCEN-RT-09',
    numero: 19,
    domaineId: 'ROUTE',
    domaineAr: 'السلامة الطرقية والتدخل الميداني',
    domaineFr: 'Sécurité Routière et Terrain',
    titreAr: 'تحرير برقية إشعار فوري بحادثة سير مميتة على الطريق السيار',
    titreFr: 'Rédaction du message d\'alerte d\'accident corporel mortel',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 7,
    pointsMax: 20,
    competenceTags: ['REPORT_PREPARATION', 'ACCURACY'],
    interactionType: 'REPORT_PREPARATION',
    consigneAr: 'حرر برقية إشعار فوري (Message Flash) موجهة للقيادة الجهوية تتضمن حصيلة الحادث والإجراءات الفورية المتخذة.',
    scenarioData: {
      champsAttendus: {
        objet: 'برقية إشعار أولي بحادثة سير مميتة وعرقلة حركة السير على الطريق السيار A1',
        destinataire: 'إلى السيد قائد القيادة الجهوية للدرك الملكي',
        motsClesRequis: ['PK 84', 'وفاة', 'إصابات', 'الوقاية المدنية', 'تحويل السير', 'النيابة العامة']
      },
      rubriqueCriteres: [
        'الدقة في تحديد الموقع والتوقيت',
        'تحديد أعداد الضحايا ونوع المركبات',
        'بيان حالة السيولة المرورية والتدابير الزجرية'
      ]
    },
    scoringConfig: {
      type: 'REPORT_RUBRIC',
      minWords: 30,
      requiredKeywords: ['PK 84', 'وفاة', 'إصابات', 'الوقاية المدنية', 'تحويل السير', 'النيابة العامة']
    }
  },

  {
    taskId: 'SCEN-RT-10',
    numero: 20,
    domaineId: 'ROUTE',
    domaineAr: 'السلامة الطرقية والتدخل الميداني',
    domaineFr: 'Sécurité Routière et Terrain',
    titreAr: 'تدقيق وثائق حافلة نقل ركاب واكتشاف شهادة فحص تقني مزورة',
    titreFr: 'Contrôle documentaire d\'un autocar et détection de faux visa',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['DOC_ANALYSIS', 'ACCURACY'],
    interactionType: 'DOCUMENT_ANALYSIS',
    consigneAr: 'افحص بطاقة الفحص التقني ورخصة النقل للحافلة، وحدد التناقض بين تاريخ الصلاحية والرقم التسلسلي للمركز.',
    scenarioData: {
      documents: [
        {
          docId: 'RT10_D1',
          titreAr: 'شهادة الفحص التقني الدوري رقم 88921/ف.ت',
          source: 'مركز الفحص التقني للمركبات',
          date: '10 ماي 2026',
          tampon: 'مقبول لسير الجولان لمدة سنة',
          contenuAr: 'المركبة: حافلة نقل ركاب 54 مقعداً. رقم الإطار: 981244. تبين أن طابع المركز يحمل الرمز الإقليمي 45 (مراكش) في حين أن الرقم التسلسلي للشهادة مخصص حصرياً لمدينة طنجة. لا يوجد ختم ثلاثي الأبعاد المعتمد من الوكالة الوطنية للسلامة الطرقية.'
        }
      ],
      questionsVerif: [
        {
          id: 'RT10_Q1',
          questionAr: 'ما هو العيب الجوهري الذي يثبت زورية وثيقة الفحص التقني؟',
          optionsAr: [
            'انتهاء صلاحية البطاقة الرمادية',
            'تعارض الرمز الإقليمي للمركز مع السلسلة الرسمية وغياب الطابع ثلاثي الأبعاد المعتمد',
            'عدم وجود توقيع السائق على الورقة',
            'لون الورقة أصفر بدلاً من الأبيض'
          ],
          correctIndex: 1
        }
      ]
    },
    scoringConfig: {
      type: 'MULTIPLE_CHOICE',
      expectedAnswers: { RT10_Q1: 1 }
    }
  },

  // ============================================================================
  // المجال 3: Analyse Numérique et Technologie (التحليل الرقمي والتكنولوجي) - 10 مهام
  // ============================================================================
  {
    taskId: 'SCEN-TC-01',
    numero: 21,
    domaineId: 'TECH',
    domaineAr: 'التحليل الرقمي والتكنولوجي',
    domaineFr: 'Analyse Numérique et Technologie',
    titreAr: 'تدقيق سجلات خادم الولوج ورصد عناوين IP المشبوهة',
    titreFr: 'Analyse des logs d\'accès et détection d\'IP malveillantes',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['DIGITAL_SKILLS', 'DATA_PROCESSING'],
    interactionType: 'DATASET_AUDIT',
    consigneAr: 'تفحص جدول سجلات الخادم، وحدد العمليات المقترنة بمحاولات ترقية الصلاحيات أو الاتصال عبر شبكات التخفي المجهولة (Tor).',
    scenarioData: {
      dataset: [
        { id: 301, timestamp: '23:12:05', user: 'admin_sys', ip: '192.168.1.10', action: 'LOGIN_SUCCESS', location: 'مقر القيادة', status: 'NORMAL' },
        { id: 302, timestamp: '23:22:18', user: 'admin_sys', ip: '41.249.78.114', action: 'REMOTE_SSH', location: 'الدار البيضاء', status: 'SUSPICIOUS' },
        { id: 303, timestamp: '23:25:50', user: 'admin_sys', ip: '185.220.101.5', action: 'PRIVILEGE_ESCALATION', location: 'Tor Exit Node', status: 'MALICIOUS' },
        { id: 304, timestamp: '23:28:10', user: 'admin_sys', ip: '185.220.101.5', action: 'EXPORT_DATABASE_DUMP', location: 'خادم مجهول', status: 'MALICIOUS' }
      ],
      anomaliesToSelect: [303, 304]
    },
    scoringConfig: {
      type: 'SET_MATCH',
      expectedSet: [303, 304]
    }
  },

  {
    taskId: 'SCEN-TC-02',
    numero: 22,
    domaineId: 'TECH',
    domaineAr: 'التحليل الرقمي والتكنولوجي',
    domaineFr: 'Analyse Numérique et Technologie',
    titreAr: 'تصنيف وسائط التخزين الرقمية وسلسلة الحيازة القضائية',
    titreFr: 'Classification forensique de supports et chaîne de preuve',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['DIGITAL_SKILLS', 'CLASSIFICATION'],
    interactionType: 'CLASSIFICATION',
    consigneAr: 'صنف مصادر الأدلة الرقمية التالية حسب طبيعتها (بيانات متطايرة حية / بيانات ثابتة / عتاد مادي).',
    scenarioData: {
      categories: [
        { id: 'VOLATILE', titreAr: 'بيانات متطايرة حية (Mémoire RAM / Flux)', couleur: 'rose' },
        { id: 'PERSISTENT', titreAr: 'بيانات ثابتة مخزنة (Disque / BDD)', couleur: 'blue' },
        { id: 'HARDWARE', titreAr: 'عتاد وأجهزة فيزيائية (Supports physiques)', couleur: 'emerald' }
      ],
      elements: [
        { id: 'TC02_E1', texteAr: 'محتوى ذاكرة RAM لجهاز حاسوب قيد التشغيل وقت المداهمة', catCorrecte: 'VOLATILE' },
        { id: 'TC02_E2', texteAr: 'الصورة الجنائية المطابقة للقرص الصلب (Image Forensic Bit-à-Bit)', catCorrecte: 'PERSISTENT' },
        { id: 'TC02_E3', texteAr: 'هاتف محمول وجهاز توجيه لاسلكي (Router Wi-Fi)', catCorrecte: 'HARDWARE' },
        { id: 'TC02_E4', texteAr: 'جدول اتصالات الشبكة النشطة اللحظية (Active TCP Connections)', catCorrecte: 'VOLATILE' }
      ]
    },
    scoringConfig: {
      type: 'CATEGORIZATION',
      correctMapping: {
        TC02_E1: 'VOLATILE',
        TC02_E2: 'PERSISTENT',
        TC02_E3: 'HARDWARE',
        TC02_E4: 'VOLATILE'
      }
    }
  },

  {
    taskId: 'SCEN-TC-03',
    numero: 23,
    domaineId: 'TECH',
    domaineAr: 'التحليل الرقمي والتكنولوجي',
    domaineFr: 'Analyse Numérique et Technologie',
    titreAr: 'التحقق من بصمة التشفير (SHA-256) للتأكد من سلامة الدليل',
    titreFr: 'Validation de l\'empreinte cryptographique de preuve numérique',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 5,
    pointsMax: 20,
    competenceTags: ['DIGITAL_SKILLS', 'ACCURACY'],
    interactionType: 'DECISION_SCENARIO',
    consigneAr: 'حدد الإجراء المنهجي المعتمد لضمان حجية الدليل الرقمي أمام المحكمة.',
    scenarioData: {
      scenarios: [
        {
          id: 'TC03_S1',
          questionAr: 'أثناء استخراج الصورة المطابقة لقرص صلب، كيف يتم إثبات عدم العبث بأي بايت من محتوياته بعد النسخ؟',
          optionsAr: [
            'الاعتماد على تاريخ إنشاء الملف في نظام التشغيل',
            'حساب البصمة الرياضية SHA-256 قبل النسخ ومقارنتها بالصورة المستخرجة مع إثبات تطابق التجزئة بالمحضر الرسمي',
            'ضغط محتويات القرص بكلمة مرور خاصة بضابط التحقيق',
            'تغيير أسماء الملفات لتسهيل قراءتها'
          ],
          correctIndex: 1
        }
      ]
    },
    scoringConfig: {
      type: 'MULTIPLE_CHOICE',
      expectedAnswers: { TC03_S1: 1 }
    }
  },

  {
    taskId: 'SCEN-TC-04',
    numero: 24,
    domaineId: 'TECH',
    domaineAr: 'التحليل الرقمي والتكنولوجي',
    domaineFr: 'Analyse Numérique et Technologie',
    titreAr: 'عزل خادم يتعرض لهجوم فدية إلكتروني مستمر',
    titreFr: 'Isolation réseau d\'urgence face à un ransomware',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 5,
    pointsMax: 20,
    competenceTags: ['TECH_SOLVING', 'DECISION_MAKING'],
    interactionType: 'DECISION_SCENARIO',
    consigneAr: 'اتخذ القرار التقني السليم لمنع انتشار برمجية الفدية الخبيثة في الشبكة العسكرية.',
    scenarioData: {
      scenarios: [
        {
          id: 'TC04_S1',
          questionAr: 'رصدت الخلية التقنية للدرك الملكي بداية تشفير متسارع للملفات على أحد الخوادم المركزية. ما هو الإجراء الفوري الأول؟',
          optionsAr: [
            'فصل كابلات الشبكة وعزل الخادم فورياً عن الشبكة دون إيقاف تشغيله للحفاظ على محتوى الذاكرة الحية (RAM) ومسارات البرمجية',
            'إطفاء القاطع الكهربائي العام للمركز بالقوة',
            'دفع الفدية المطلوبة لاستعادة الملفات فوراً',
            'إعادة تهيئة القرص الصلب (Format) فوراً ومسح كل السجلات'
          ],
          correctIndex: 0
        }
      ]
    },
    scoringConfig: {
      type: 'MULTIPLE_CHOICE',
      expectedAnswers: { TC04_S1: 0 }
    }
  },

  {
    taskId: 'SCEN-TC-05',
    numero: 25,
    domaineId: 'TECH',
    domaineAr: 'التحليل الرقمي والتكنولوجي',
    domaineFr: 'Analyse Numérique et Technologie',
    titreAr: 'فحص سجل إحداثيات GPS لأسطول مركبات وتحديد التلاعب',
    titreFr: 'Audit de télématique GPS et détection de spoofing',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['DATA_PROCESSING', 'ACCURACY'],
    interactionType: 'DATASET_AUDIT',
    consigneAr: 'تفحص سجل المواقع الجغرافية للمركبة المشبوهة، وحدد القفزات المكانية المستحيلة فيزيائياً التي تدل على انتحال الإشارة (Spoofing).',
    scenarioData: {
      dataset: [
        { id: 401, time: '14:00:00', coord: 'الرباط (حي الرياض)', speed: '45 km/h', status: 'NORMAL' },
        { id: 402, time: '14:05:00', coord: 'الرباط (حي الرياض)', speed: '50 km/h', status: 'NORMAL' },
        { id: 403, time: '14:08:00', coord: 'طنجة (ميناء طنجة المتوسط)', speed: '0 km/h (قفزة 250 كم في 3 دقائق)', status: 'SPOOFED' },
        { id: 404, time: '14:15:00', coord: 'الرباط (تمارة)', speed: '60 km/h', status: 'NORMAL' }
      ],
      anomaliesToSelect: [403]
    },
    scoringConfig: {
      type: 'SET_MATCH',
      expectedSet: [403]
    }
  },

  {
    taskId: 'SCEN-TC-06',
    numero: 26,
    domaineId: 'TECH',
    domaineAr: 'التحليل الرقمي والتكنولوجي',
    domaineFr: 'Analyse Numérique et Technologie',
    titreAr: 'ترتيب خطوات الاستجابة الفنية لحادث تسريب بيانات حساسة',
    titreFr: 'Ordonnancement du plan de réponse à incident cyber',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['TECH_SOLVING', 'DIGITAL_SKILLS'],
    interactionType: 'PRIORITIZATION',
    consigneAr: 'رتب الخطوات الاستعجالية لإدارة الأزمة السيبرانية طبقاً لمعايير الأمن الرقمي المعتمدة.',
    scenarioData: {
      itemsToOrder: [
        { id: 'TC06_1', texteAr: 'احتواء الحادث وعزل الأجهزة المخترقة لمنع تفشي التسريب في باقي قطاعات الشبكة', ordreCorrect: 1 },
        { id: 'TC06_2', texteAr: 'أخذ عينات الذاكرة الحية وتأمين النسخ المطابقة الجنائية للأقراص قبل إعادة التشغيل', ordreCorrect: 2 },
        { id: 'TC06_3', texteAr: 'تحليل السجلات وتحديد الثغرة المستغلة ونقطة النفاذ الأولى للمهاجم', ordreCorrect: 3 },
        { id: 'TC06_4', texteAr: 'سد الثغرة وإعادة ضبط كلمات المرور والمفاتيح التشفيرية لجميع الحسابات الحساسة', ordreCorrect: 4 },
        { id: 'TC06_5', texteAr: 'صياغة التقرير التقني الجنائي ورفعه للقيادة العليا مع التوصيات الوقائية', ordreCorrect: 5 }
      ]
    },
    scoringConfig: {
      type: 'ORDERING',
      correctOrder: ['TC06_1', 'TC06_2', 'TC06_3', 'TC06_4', 'TC06_5']
    }
  },

  {
    taskId: 'SCEN-TC-07',
    numero: 27,
    domaineId: 'TECH',
    domaineAr: 'التحليل الرقمي والتكنولوجي',
    domaineFr: 'Analyse Numérique et Technologie',
    titreAr: 'كشف رسائل التصيد الاحتيالي (Phishing) الموجهة للمستخدمين',
    titreFr: 'Analyse d\'un e-mail de spear-phishing institutionnel',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 5,
    pointsMax: 20,
    competenceTags: ['DOC_ANALYSIS', 'ACCURACY'],
    interactionType: 'DOCUMENT_ANALYSIS',
    consigneAr: 'افحص ترويسة ومحتوى البريد الإلكتروني المشبوه وحدد المؤشرات الدالة على انتحال صفة إدارة رسمية.',
    scenarioData: {
      documents: [
        {
          docId: 'TC07_D1',
          titreAr: 'بريد إلكتروني بعنوان: "تحديث عاجل للبريد العسكري"',
          source: 'المرسل: support@gendarmerie-maroc-auth.xyz',
          date: '24 أكتوبر 2026',
          tampon: 'رسالة مشبوهة غير موثقة',
          contenuAr: 'من: support@gendarmerie-maroc-auth.xyz\nإلى: personnel@gendarmerie.gov.ma\nالموضوع: مطلوب تحديث كلمة المرور في أجل 24 ساعة وإلا سيتم إغلاق الحساب العسكري نهائياً. انقر على الرابط التالي: http://185.220.101.45/login-portal'
        }
      ],
      questionsVerif: [
        {
          id: 'TC07_Q1',
          questionAr: 'ما هو المؤشر الحاسم الذي يثبت أن الرسالة عملية تصيد احتيالي خطيرة؟',
          optionsAr: [
            'البريد مكتوب باللغة العربية',
            'استخدام نطاق إلكتروني خادع (.xyz) ورابط مباشر لعنوان IP غير آمن، وطلب كلمة السر بصيغة تهديد',
            'تاريخ الإرسال مصادف ليوم الأحد',
            'حجم الرسالة صغير جداً'
          ],
          correctIndex: 1
        }
      ]
    },
    scoringConfig: {
      type: 'MULTIPLE_CHOICE',
      expectedAnswers: { TC07_Q1: 1 }
    }
  },

  {
    taskId: 'SCEN-TC-08',
    numero: 28,
    domaineId: 'TECH',
    domaineAr: 'التحليل الرقمي والتكنولوجي',
    domaineFr: 'Analyse Numérique et Technologie',
    titreAr: 'تدقيق سجل قواعد البيانات ورصد محاولات الحقن SQL',
    titreFr: 'Audit de base de données et détection d\'injection SQL',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['DIGITAL_SKILLS', 'DATA_PROCESSING'],
    interactionType: 'DATASET_AUDIT',
    consigneAr: 'افحص استعلامات الويب الموجهة لقاعدة البيانات، وحدد الاستعلامات التي تحمل بصمات حقن SQL لتخطي المصادقة.',
    scenarioData: {
      dataset: [
        { id: 501, query: 'SELECT * FROM users WHERE email = "user@domain.ma"', duration: '12ms', status: 'NORMAL' },
        { id: 502, query: 'SELECT * FROM users WHERE id = 42', duration: '8ms', status: 'NORMAL' },
        { id: 503, query: 'SELECT * FROM users WHERE username = "admin" OR "1"="1" --', duration: '45ms', status: 'MALICIOUS_SQLI' },
        { id: 504, query: 'SELECT matricule, nom FROM personnel ORDER BY id LIMIT 10', duration: '15ms', status: 'NORMAL' }
      ],
      anomaliesToSelect: [503]
    },
    scoringConfig: {
      type: 'SET_MATCH',
      expectedSet: [503]
    }
  },

  {
    taskId: 'SCEN-TC-09',
    numero: 29,
    domaineId: 'TECH',
    domaineAr: 'التحليل الرقمي والتكنولوجي',
    domaineFr: 'Analyse Numérique et Technologie',
    titreAr: 'تحرير تقرير خبرة تقنية أولية في شأن هاتف محجوز',
    titreFr: 'Rapport d\'expertise technique sur smartphone saisi',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 7,
    pointsMax: 20,
    competenceTags: ['REPORT_PREPARATION', 'DIGITAL_SKILLS'],
    interactionType: 'REPORT_PREPARATION',
    consigneAr: 'حرر تقرير الفحص التقني لهاتف ذكي محجوز يتضمن بصمة التشفير، البرامج المسترجعة، والتطبيقات المشبوهة.',
    scenarioData: {
      champsAttendus: {
        objet: 'تقرير خبرة فنية رقمية في شأن هاتف محجوز في قضية نصب واحتيال إلكتروني',
        destinataire: 'إلى السيد قائد سرية الدرك الملكي / المركز القضائي',
        motsClesRequis: ['SHA-256', 'استخراج البيانات', 'تطبيق مشبوه', 'الحفظ الجنائي', 'الرسائل النصية']
      },
      rubriqueCriteres: [
        'ذكر الرقم التسلسلي IMEI للهاتف بدقة',
        'توثيق سلامة الحرز وبصمة الهاش',
        'بيان الرسائل والصور المسترجعة ذات القيمة الإثباتية'
      ]
    },
    scoringConfig: {
      type: 'REPORT_RUBRIC',
      minWords: 30,
      requiredKeywords: ['SHA-256', 'استخراج البيانات', 'تطبيق مشبوه', 'الحفظ الجنائي', 'الرسائل النصية']
    }
  },

  {
    taskId: 'SCEN-TC-10',
    numero: 30,
    domaineId: 'TECH',
    domaineAr: 'التحليل الرقمي والتكنولوجي',
    domaineFr: 'Analyse Numérique et Technologie',
    titreAr: 'فحص حزم الاتصال الشبكي لكشف تسريب كلمات المرور',
    titreFr: 'Analyse de trames réseau et détection de flux en clair',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 5,
    pointsMax: 20,
    competenceTags: ['DIGITAL_SKILLS', 'ACCURACY'],
    interactionType: 'DECISION_SCENARIO',
    consigneAr: 'حدد التوصية الأمنية الفورية لمعالجة بروتوكولات نقل البيانات غير المشفرة في شبكة الإدارة.',
    scenarioData: {
      scenarios: [
        {
          id: 'TC10_S1',
          questionAr: 'أظهر فحص حركة المرور الشبكية إرسال كلمات المرور عبر بروتوكول HTTP و Telnet دون تشفير. ما هو القرار الحتمي؟',
          optionsAr: [
            'الاستمرار في استعمال البروتوكولات القديمة لتفادي استهلاك موارد الخادم',
            'التعطيل الفوري لبروتوكولات HTTP/Telnet غير المشفرة وفرض بروتوكولات HTTPS و SSH مع تفعيل التشفير التام وتحديث شهادات الأمان SSL/TLS',
            'مطالبة المستخدمين باختيار كلمات مرور قصيرة',
            'تجاهل الأمر لكون الشبكة داخلية'
          ],
          correctIndex: 1
        }
      ]
    },
    scoringConfig: {
      type: 'MULTIPLE_CHOICE',
      expectedAnswers: { TC10_S1: 1 }
    }
  },

  // ============================================================================
  // المجال 4: Planification et Organisation Opérationnelle (التخطيط والتنظيم العملياتي) - 10 مهام
  // ============================================================================
  {
    taskId: 'SCEN-PL-01',
    numero: 31,
    domaineId: 'PLAN',
    domaineAr: 'التخطيط والتنظيم العملياتي',
    domaineFr: 'Planification et Organisation Opérationnelle',
    titreAr: 'توزيع القوى والتشكيلات على قواطع مهرجان جماهيري',
    titreFr: 'Répartition sectorielle des forces sur un grand événement',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['PLANNING', 'ORGANIZATION'],
    interactionType: 'CLASSIFICATION',
    consigneAr: 'وزع الوحدات العسكرية المتاحة على القواطع العملياتية الثلاثة وفق طبيعة المهمة وحساسية الموقع.',
    scenarioData: {
      categories: [
        { id: 'SEC_VIP', titreAr: 'القاطع 1: المنصة الرسمية ومسار الشخصيات', couleur: 'gold' },
        { id: 'SEC_PUBLIC', titreAr: 'القاطع 2: الفضاء الجماهيري والمداخل', couleur: 'blue' },
        { id: 'SEC_ROAD', titreAr: 'القاطع 3: المحاور الطرقية والمواقف', couleur: 'emerald' }
      ],
      elements: [
        { id: 'PL01_E1', texteAr: 'فريق الحماية المقربة وتأمين المنصة الشرفية مع بوابات التفتيش', catCorrecte: 'SEC_VIP' },
        { id: 'PL01_E2', texteAr: 'فصيلة التدخل السريع للدرك المتنقل لضبط الجموع', catCorrecte: 'SEC_PUBLIC' },
        { id: 'PL01_E3', texteAr: 'الفريق السينوتقني للكلاب البوليسية لتمشيط المداخل الجماهيرية', catCorrecte: 'SEC_PUBLIC' },
        { id: 'PL01_E4', texteAr: 'دوريات دراجين متحركة لتنظيم المرور ومنع التوقف بجانب الطريق السريع', catCorrecte: 'SEC_ROAD' },
        { id: 'PL01_E5', texteAr: 'سد قضائي مروري ثابت بمدخل موقف السيارات المخصص للجمهور', catCorrecte: 'SEC_ROAD' },
        { id: 'PL01_E6', texteAr: 'دراجو المواكبة الرسمية لمرافقة موكب الوفد الرسمي', catCorrecte: 'SEC_VIP' }
      ]
    },
    scoringConfig: {
      type: 'CATEGORIZATION',
      correctMapping: {
        PL01_E1: 'SEC_VIP',
        PL01_E2: 'SEC_PUBLIC',
        PL01_E3: 'SEC_PUBLIC',
        PL01_E4: 'SEC_ROAD',
        PL01_E5: 'SEC_ROAD',
        PL01_E6: 'SEC_VIP'
      }
    }
  },

  {
    taskId: 'SCEN-PL-02',
    numero: 32,
    domaineId: 'PLAN',
    domaineAr: 'التخطيط والتنظيم العملياتي',
    domaineFr: 'Planification et Organisation Opérationnelle',
    titreAr: 'الجدولة الزمنية لمراحل خطة تطهير وتمشيط أمني',
    titreFr: 'Chronologie du bouclage et déminage préventif',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['PLANNING', 'ORGANIZATION'],
    interactionType: 'PRIORITIZATION',
    consigneAr: 'رتب المراحل العملياتية لتأمين الموقع حسب التدرج الزمني العسكري الصارم.',
    scenarioData: {
      itemsToOrder: [
        { id: 'PL02_1', texteAr: 'تمشيط وقائي شامل للفضاءات والمستودعات بالكلاب البوليسية قبل فتح الأبواب بـ 4 ساعات', ordreCorrect: 1 },
        { id: 'PL02_2', texteAr: 'نشر السدود القضائية على مداخل المدينة والمحاور المؤدية لموقع الفعالية', ordreCorrect: 2 },
        { id: 'PL02_3', texteAr: 'فتح بوابات دخول الجمهور ومباشرة التدقيق الإلكتروني في الأمتعة', ordreCorrect: 3 },
        { id: 'PL02_4', texteAr: 'تأمين وصول الموكب الرسمي وإحكام طوق الحماية الدائري حول المنصة الشرفية', ordreCorrect: 4 },
        { id: 'PL02_5', texteAr: 'إدارة وتفويج انصراف الجمهور والمركبات لمنع الازدحام والحوادث بعد انتهاء الفعالية', ordreCorrect: 5 }
      ]
    },
    scoringConfig: {
      type: 'ORDERING',
      correctOrder: ['PL02_1', 'PL02_2', 'PL02_3', 'PL02_4', 'PL02_5']
    }
  },

  {
    taskId: 'SCEN-PL-03',
    numero: 33,
    domaineId: 'PLAN',
    domaineAr: 'التخطيط والتنظيم العملياتي',
    domaineFr: 'Planification et Organisation Opérationnelle',
    titreAr: 'التصرف التكتيكي عند رصد طائرة مسيرة مجهولة فوق المنصة',
    titreFr: 'Réaction anti-drone hostile lors d\'un rassemblement',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 5,
    pointsMax: 20,
    competenceTags: ['COORDINATION', 'DECISION_MAKING'],
    interactionType: 'DECISION_SCENARIO',
    consigneAr: 'حدد الإجراء القيادي الاحترافي لمواجهة المسيرة غير المرخصة دون إثارة الفزع بين الجماهير.',
    scenarioData: {
      scenarios: [
        {
          id: 'PL03_S1',
          questionAr: 'حلقت طائرة مسيرة مجهولة فوق المنصة الرسمية أثناء وجود الشخصيات. ما هو الإجراء العملياتي السليم؟',
          optionsAr: [
            'إطلاق النار بالبنادق وسط الحشود مما يعرض المواطنين لخطر الرصاص الراجع',
            'تفعيل بنادق التشويش الإلكتروني الموجه (Brouilleur Anti-Drone) لإسقاطها بأمان، وتكليف دورية بالزي المدني بتعقب إشارة مشغل الطائرة في المحيط',
            'تجاهل الطائرة ومواصلة البرنامج',
            'إخلاء جماعي فوري مما يسبب تدافعاً مميتاً'
          ],
          correctIndex: 1
        }
      ]
    },
    scoringConfig: {
      type: 'MULTIPLE_CHOICE',
      expectedAnswers: { PL03_S1: 1 }
    }
  },

  {
    taskId: 'SCEN-PL-04',
    numero: 34,
    domaineId: 'PLAN',
    domaineAr: 'التخطيط والتنظيم العملياتي',
    domaineFr: 'Planification et Organisation Opérationnelle',
    titreAr: 'تقدير الاحتياجات اللوجستية لدورية تمشيط جبلية لعدة أيام',
    titreFr: 'Estimation logistique d\'une patrouille autonome en montagne',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 5,
    pointsMax: 20,
    competenceTags: ['RESOURCE_MGMT', 'PLANNING'],
    interactionType: 'DOCUMENT_ANALYSIS',
    consigneAr: 'احسب كمية الوقود والمؤن المطلوبة لدورية مكونة من 12 عنصراً ومركبتين رباعيتي الدفع لمدة 72 ساعة في مسالك جبلية وعرة.',
    scenarioData: {
      documents: [
        {
          docId: 'PL04_D1',
          titreAr: 'جدول معايير الإمداد العملياتي في البيئات القاسية',
          source: 'مصلحة العتاد واللوجستيك العسكري',
          date: '2026',
          tampon: 'معيار تدبير اللوجستيك',
          contenuAr: 'المعايير المعتمدة:\n- استهلاك الوقود للمركبة في المسالك الوعرة: 40 لتراً لكل 100 كم، مع إضافة هامش أمان طوارئ 30%.\n- مياه الشرب: 4 لترات للفرد يومياً كحد أدنى في المجهود الشاق.\n- بطاريات أجهزة الراديو: بطاريتان احتياطيتان لكل جهاز اتصال مع ألواح شحن شمسية متنقلة.'
        }
      ],
      questionsVerif: [
        {
          id: 'PL04_Q1',
          questionAr: 'ما هو الحد الأدنى الإجمالي لمياه الشرب الواجب توفيرها لـ 12 عنصراً لمدة 3 أيام كاملة؟',
          optionsAr: ['72 لتراً', '144 لتراً', '250 لتراً', '90 لتراً'],
          correctIndex: 1
        }
      ]
    },
    scoringConfig: {
      type: 'MULTIPLE_CHOICE',
      expectedAnswers: { PL04_Q1: 1 }
    }
  },

  {
    taskId: 'SCEN-PL-05',
    numero: 35,
    domaineId: 'PLAN',
    domaineAr: 'التخطيط والتنظيم العملياتي',
    domaineFr: 'Planification et Organisation Opérationnelle',
    titreAr: 'وضع خطة انتشار وتأمين موكب رسمي عبر محور حيوي',
    titreFr: 'Dispositif d\'escorte et de jalonnement de cortège officiel',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['PLANNING', 'COORDINATION'],
    interactionType: 'INTERACTIVE_MAP',
    consigneAr: 'حدد النقاط الحاكمة التي تتطلب تموضعاً ثابتاً للدراجين وفرق الحراسة (الجسور، ملتقيات الطرق الرئيسية، ومنافذ الدخول).',
    scenarioData: {
      mapData: {
        axe: 'المسار البروتوكولي للموكب',
        pk: 'طول المسار: 18 كم',
        zones: [
          { id: 'PL05_Z1', nomAr: 'جسر علوي يعبر فوق وادٍ وطريق سريع', descriptionAr: 'نقطة اختناق استراتيجية تتطلب تأمين الجزء العلوي والأسفل.', dangerLevel: 'HIGH' },
          { id: 'PL05_Z2', nomAr: 'ملتقى طرق دائري ذو كثافة مرورية عالية', descriptionAr: 'يتطلب إيقاف حركة السير الفرعية قبل وصول الموكب بـ 3 دقائق.', dangerLevel: 'CRITICAL' },
          { id: 'PL05_Z3', nomAr: 'المنطقة السكنية ذات المنافذ المفتوحة المتعددة', descriptionAr: 'تتطلب انتشار دوريات راجلة بالزي المدني.', dangerLevel: 'HIGH' }
        ]
      },
      hotspotsAIdentifier: [
        { id: 'PL05_H1', titreAr: 'تثبيت نقطة جلونة فوق الجسر العلوي لمنع التوقف وإلقاء المقذوفات', zoneId: 'PL05_Z1', correct: true },
        { id: 'PL05_H2', titreAr: 'إحكام السيطرة على المدار الطرقي وتفريغ مسار الموكب', zoneId: 'PL05_Z2', correct: true }
      ]
    },
    scoringConfig: {
      type: 'HOTSPOT_SELECTION',
      expectedHotspots: ['PL05_H1', 'PL05_H2']
    }
  },

  {
    taskId: 'SCEN-PL-06',
    numero: 36,
    domaineId: 'PLAN',
    domaineAr: 'التخطيط والتنظيم العملياتي',
    domaineFr: 'Planification et Organisation Opérationnelle',
    titreAr: 'التعامل مع إنذار كاذب لتفادي التدافع الجماهيري',
    titreFr: 'Gestion de fausse alerte et prévention de mouvement de foule',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 5,
    pointsMax: 20,
    competenceTags: ['COORDINATION', 'DECISION_MAKING'],
    interactionType: 'DECISION_SCENARIO',
    consigneAr: 'اختر تدبير القيادة والسيطرة الذي يتيح التثبت السريع دون توليد هلع جماعي مدمر.',
    scenarioData: {
      scenarios: [
        {
          id: 'PL06_S1',
          questionAr: 'ورد بلاغ هاتفي مجهول بوجود جسم مشبوه في مدرج مكتظ بـ 15.000 متفرج. كيف يتصرف قائد العمليات؟',
          optionsAr: [
            'إذاعة نداء عام عبر مكبرات الصوت يطالب الجميع بالركض فوراً نحو الأبواب',
            'توجيه فريق الخبراء والكلاب المدربة بالزي المدني للتحقق الهادئ والدقيق، مع فتح أبواب الإخلاء وتجهيز فرق الطوارئ دون بث رسائل هلع حتى ثبوت الشبهة',
            'إغلاق الأبواب بالمفاتيح وحبس الجميع في الداخل',
            'تجاهل البلاغ تماماً لكونه بلاغاً مجهول المصدر'
          ],
          correctIndex: 1
        }
      ]
    },
    scoringConfig: {
      type: 'MULTIPLE_CHOICE',
      expectedAnswers: { PL06_S1: 1 }
    }
  },

  {
    taskId: 'SCEN-PL-07',
    numero: 37,
    domaineId: 'PLAN',
    domaineAr: 'التخطيط والتنظيم العملياتي',
    domaineFr: 'Planification et Organisation Opérationnelle',
    titreAr: 'تصنيف مهام الوحدات في عملية أمنية كبرى',
    titreFr: 'Affectation des missions tactiques par unité spécialisée',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['ORGANIZATION', 'PLANNING'],
    interactionType: 'CLASSIFICATION',
    consigneAr: 'صنف المهام التالية حسب الوحدات التكتيكية المختصة حصرياً بتنفيذها.',
    scenarioData: {
      categories: [
        { id: 'UNIT_GSI', titreAr: 'فرقة التدخل السريع (GSI)', couleur: 'rose' },
        { id: 'UNIT_K9', titreAr: 'الفريق السينوتقني للكلاب البوليسية', couleur: 'amber' },
        { id: 'UNIT_MOTO', titreAr: 'سرايا الدراجات النارية', couleur: 'emerald' }
      ],
      elements: [
        { id: 'PL07_E1', texteAr: 'اقتحام وكر مسلح وتوقيف مشتبه فيهم خطرين في مبنى مغلق', catCorrecte: 'UNIT_GSI' },
        { id: 'PL07_E2', texteAr: 'تفتيش الأمتعة والطرود للكشف عن المتفجرات والمخدرات المخبأة', catCorrecte: 'UNIT_K9' },
        { id: 'PL07_E3', texteAr: 'المواكبة السريعة وحماية المسالك وفتح الطرقات لسيارات الإسعاف', catCorrecte: 'UNIT_MOTO' },
        { id: 'PL07_E4', texteAr: 'تعقب أثر فارّ في الغابة باستخدام كلاب التتبع الميداني', catCorrecte: 'UNIT_K9' }
      ]
    },
    scoringConfig: {
      type: 'CATEGORIZATION',
      correctMapping: {
        PL07_E1: 'UNIT_GSI',
        PL07_E2: 'UNIT_K9',
        PL07_E3: 'UNIT_MOTO',
        PL07_E4: 'UNIT_K9'
      }
    }
  },

  {
    taskId: 'SCEN-PL-08',
    numero: 38,
    domaineId: 'PLAN',
    domaineAr: 'التخطيط والتنظيم العملياتي',
    domaineFr: 'Planification et Organisation Opérationnelle',
    titreAr: 'ترتيب إجراءات احتواء شغب رياضي بالقرب من منشآت حيوية',
    titreFr: 'Gradation des mesures de maintien de l\'ordre',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['COORDINATION', 'DECISION_MAKING'],
    interactionType: 'PRIORITIZATION',
    consigneAr: 'رتب التدابير التكتيكية لحفظ النظام العام وفق التدرج القانوني لاستعمال القوة الشرعية.',
    scenarioData: {
      itemsToOrder: [
        { id: 'PL08_1', texteAr: 'تثبيت طوق أمني حاجز بين الجموع المشاغبة والمنشآت الحيوية مع ارتداء معدات الحماية الكاملة', ordreCorrect: 1 },
        { id: 'PL08_2', texteAr: 'توجيه الإنذارات القانونية الإلزامية الثلاثة بواسطة مكبرات الصوت للتفرق والانصراف فوراً', ordreCorrect: 2 },
        { id: 'PL08_3', texteAr: 'استعمال خراطيم المياه ومسيلات الدموع المعتمدة لتفريق التجمهرات العنيفة تدريجياً', ordreCorrect: 3 },
        { id: 'PL08_4', texteAr: 'تنفيذ عمليات توقيف جراحية وموجهة للعناصر المحرضة على التخريب تحت تغطية دروع الحماية', ordreCorrect: 4 },
        { id: 'PL08_5', texteAr: 'تأمين المحيط وإسعاف المصابين وتحرير محاضر التوقيف والضبط في شأن الموقوفين', ordreCorrect: 5 }
      ]
    },
    scoringConfig: {
      type: 'ORDERING',
      correctOrder: ['PL08_1', 'PL08_2', 'PL08_3', 'PL08_4', 'PL08_5']
    }
  },

  {
    taskId: 'SCEN-PL-09',
    numero: 39,
    domaineId: 'PLAN',
    domaineAr: 'التخطيط والتنظيم العملياتي',
    domaineFr: 'Planification et Organisation Opérationnelle',
    titreAr: 'صياغة أمر عمليات (Ordre d\'Opérations) لمداهمة نوعية',
    titreFr: 'Rédaction d\'un ordre d\'opérations pour assaut judiciaire',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 7,
    pointsMax: 20,
    competenceTags: ['REPORT_PREPARATION', 'PLANNING'],
    interactionType: 'REPORT_PREPARATION',
    consigneAr: 'حرر المسودة التنفيذية لأمر العمليات تتضمن: المهمة، التشكيلات، ساعة الصفر، وشبكة الاتصال اللاسلكي.',
    scenarioData: {
      champsAttendus: {
        objet: 'أمر عمليات رقم 14/ع.م متعلق بتنفيذ عملية مداهمة منسقة لأوكار تهريب',
        destinataire: 'إلى كافة قادة التشكيلات والوحدات الميدانية المشاركة',
        motsClesRequis: ['ساعة الصفر', 'القاطع العملياتي', 'شبكة الراديو', 'الاحتياط', 'المهمة', 'قواعد الاشتباك']
      },
      rubriqueCriteres: [
        'وضوح تحديد ساعة الصفر وقنوات الاتصال',
        'تحديد خطة الانسحاب والاحتياط العام',
        'الصياغة العسكرية الدقيقة والصارمة'
      ]
    },
    scoringConfig: {
      type: 'REPORT_RUBRIC',
      minWords: 30,
      requiredKeywords: ['ساعة الصفر', 'القاطع العملياتي', 'شبكة الراديو', 'الاحتياط', 'المهمة', 'قواعد الاشتباك']
    }
  },

  {
    taskId: 'SCEN-PL-10',
    numero: 40,
    domaineId: 'PLAN',
    domaineAr: 'التخطيط والتنظيم العملياتي',
    domaineFr: 'Planification et Organisation Opérationnelle',
    titreAr: 'تحليل خريطة الطوارئ وتحديد مهابط المروحيات ومسالك الإخلاء',
    titreFr: 'Sélection cartographique des zones d\'hélisurface et d\'évacuation',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['PLANNING', 'RISK_ASSESSMENT'],
    interactionType: 'INTERACTIVE_MAP',
    consigneAr: 'افحص الخريطة وحدد المساحة المستوية الخالية من الأسلاك الكهربائية الصالحة كمهبط مروحية إسعافية (DZ).',
    scenarioData: {
      mapData: {
        axe: 'خريطة قطاع الإغاثة العملياتي',
        pk: 'المنطقة الجبلية - قيادة العمليات',
        zones: [
          { id: 'PL10_Z1', nomAr: 'الملعب الرياضي القروي المنبسط', descriptionAr: 'أرضية منبسطة خالية من العوائق المرتفعة مع طريق ولوج معبد.', dangerLevel: 'LOW' },
          { id: 'PL10_Z2', nomAr: 'قمة التل المحاطة بأعمدة التوتر العالي', descriptionAr: 'تشكل خطراً قاتلاً على شفرات المروحيات.', dangerLevel: 'EXTREME' },
          { id: 'PL10_Z3', nomAr: 'مجرى الوادي الرملي', descriptionAr: 'رمال متحركة وغبار كثيف قد يحجب الرؤية عن الطيار.', dangerLevel: 'HIGH' }
        ]
      },
      hotspotsAIdentifier: [
        { id: 'PL10_H1', titreAr: 'مهبط المروحيات المعتمد والآمن (Drop Zone)', zoneId: 'PL10_Z1', correct: true }
      ]
    },
    scoringConfig: {
      type: 'HOTSPOT_SELECTION',
      expectedHotspots: ['PL10_H1']
    }
  },

  // ============================================================================
  // المجال 5: Surveillance Environnementale (المراقبة البيئية والمجالات الطبيعية) - 10 مهام
  // ============================================================================
  {
    taskId: 'SCEN-EV-01',
    numero: 41,
    domaineId: 'ENV',
    domaineAr: 'المراقبة البيئية والمجالات الطبيعية',
    domaineFr: 'Surveillance Environnementale',
    titreAr: 'فحص الخارطة الطبوغرافية لمحمية غابوية ورصد بؤر الانتهاكات',
    titreFr: 'Lecture spatiale des infractions dans une réserve naturelle',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['FIELD_OBS', 'ENV_AWARENESS'],
    interactionType: 'INTERACTIVE_MAP',
    consigneAr: 'افحص الخريطة وحدد المواقع التي تظهر فيها مؤشرات قاطعة على أنشطة التدمير البيئي (نهب الرمال، تلوث المياه، وقطع الأشجار).',
    scenarioData: {
      mapData: {
        axe: 'المحمية الطبيعية الساحلية والغابوية',
        pk: 'القطاع البيئي المحمي',
        zones: [
          { id: 'EV01_Z1', nomAr: 'غابة أشجار الأرز المحمية', descriptionAr: 'بقايا جذوع مقطوعة حديثاً ومسارات جر خشب غير مرخص.', dangerLevel: 'HIGH' },
          { id: 'EV01_Z2', nomAr: 'الكثبان الرملية الشاطئية', descriptionAr: 'نهب رمال الشاطئ وتجريف الحزام الواقي من المد البحري.', dangerLevel: 'CRITICAL' },
          { id: 'EV01_Z3', nomAr: 'مصب الوادي والفرشة المائية', descriptionAr: 'تغير لون المياه وروائح كيميائية تنبعث من مجرى الوادي.', dangerLevel: 'EXTREME' }
        ]
      },
      hotspotsAIdentifier: [
        { id: 'EV01_H1', titreAr: 'بؤرة القطع الجائر لأشجار الأرز النادرة', zoneId: 'EV01_Z1', correct: true },
        { id: 'EV01_H2', titreAr: 'بؤرة نهب الرمال الشاطئية وتخريب الكثبان', zoneId: 'EV01_Z2', correct: true },
        { id: 'EV01_H3', titreAr: 'بؤرة التلوث الصناعي لمجرى الوادي المائي', zoneId: 'EV01_Z3', correct: true }
      ]
    },
    scoringConfig: {
      type: 'HOTSPOT_SELECTION',
      expectedHotspots: ['EV01_H1', 'EV01_H2', 'EV01_H3']
    }
  },

  {
    taskId: 'SCEN-EV-02',
    numero: 42,
    domaineId: 'ENV',
    domaineAr: 'المراقبة البيئية والمجالات الطبيعية',
    domaineFr: 'Surveillance Environnementale',
    titreAr: 'تصنيف المخالفات البيئية حسب المرجع التشريعي المنظم',
    titreFr: 'Classification des infractions écologiques par cadre légal',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['ENV_AWARENESS', 'CLASSIFICATION'],
    interactionType: 'CLASSIFICATION',
    consigneAr: 'صنف الأفعال التالية حسب القانون الخاص المنظم لها (قانون الماء / قانون الغابات / قانون الساحل والمقالع).',
    scenarioData: {
      categories: [
        { id: 'LAW_WATER', titreAr: 'قانون الماء (Loi 36-15)', couleur: 'blue' },
        { id: 'LAW_FOREST', titreAr: 'التشريع الغابوي ومكافحة التصحر', couleur: 'emerald' },
        { id: 'LAW_COAST', titreAr: 'قانون حماية الساحل والمقالع (Loi 81-12)', couleur: 'amber' }
      ],
      elements: [
        { id: 'EV02_E1', texteAr: 'تصريف مياه عادمة صناعية غير معالجة في مجرى وادٍ عمومي', catCorrecte: 'LAW_WATER' },
        { id: 'EV02_E2', texteAr: 'قطع ونقل خشب الأركان والعرعار بدون رخصة استغلال غابوية', catCorrecte: 'LAW_FOREST' },
        { id: 'EV02_E3', texteAr: 'استخراج شحنات رمال من الكثبان الساحلية دون ترخيص مقالع رسمي', catCorrecte: 'LAW_COAST' },
        { id: 'EV02_E4', texteAr: 'حفر بئر ارتوازي عميق داخل فرشة مائية محظورة بقرار حكومي', catCorrecte: 'LAW_WATER' },
        { id: 'EV02_E5', texteAr: 'إشعال النار عمداً في مشتل أشجار غابوية في طور التجدد', catCorrecte: 'LAW_FOREST' }
      ]
    },
    scoringConfig: {
      type: 'CATEGORIZATION',
      correctMapping: {
        EV02_E1: 'LAW_WATER',
        EV02_E2: 'LAW_FOREST',
        EV02_E3: 'LAW_COAST',
        EV02_E4: 'LAW_WATER',
        EV02_E5: 'LAW_FOREST'
      }
    }
  },

  {
    taskId: 'SCEN-EV-03',
    numero: 43,
    domaineId: 'ENV',
    domaineAr: 'المراقبة البيئية والمجالات الطبيعية',
    domaineFr: 'Surveillance Environnementale',
    titreAr: 'حجز شاحنة تفرغ نفايات سامة في مجرى مائي',
    titreFr: 'Interpellation en flagrant délit de déversement toxique',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 5,
    pointsMax: 20,
    competenceTags: ['DECISION_MAKING', 'ENV_AWARENESS'],
    interactionType: 'DECISION_SCENARIO',
    consigneAr: 'حدد الإجراءات القانونية والمخبرية الصارمة الواجب اتخاذها في حالة التلبس بجريمة بيئية خطيرة.',
    scenarioData: {
      scenarios: [
        {
          id: 'EV03_S1',
          questionAr: 'تم ضبط شاحنة صهريجية تفرغ سائلاً كيميائياً أسود في وادٍ يغذي سداً للشرب. ما هو الإجراء الصحيح؟',
          optionsAr: [
            'الطلب من السائق إكمال التفريغ والمغادرة سريعاً',
            'توقيف الشاحنة وحجزها بالمحجز، أخذ 3 عينات مختومة من السائل بحضور ممثل شرطة المياه والبيئة لتوجيهها إلى مختبر الدرك الملكي، ووضع السائق تحت الحراسة النظرية بأمر النيابة العامة',
            'سكب تراب فوق السائل لإخفاء الرائحة',
            'تغريم السائق 200 درهم وإخلاء سبيله'
          ],
          correctIndex: 1
        }
      ]
    },
    scoringConfig: {
      type: 'MULTIPLE_CHOICE',
      expectedAnswers: { EV03_S1: 1 }
    }
  },

  {
    taskId: 'SCEN-EV-04',
    numero: 44,
    domaineId: 'ENV',
    domaineAr: 'المراقبة البيئية والمجالات الطبيعية',
    domaineFr: 'Surveillance Environnementale',
    titreAr: 'تدقيق سجل رخص حفر الآبار ومقارنتها بالإحداثيات',
    titreFr: 'Audit des forages et détection de puits clandestins',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['DATA_PROCESSING', 'ACCURACY'],
    interactionType: 'DATASET_AUDIT',
    consigneAr: 'افحص جدول رخص حفر الآبار بالإقليم، وحدد الآبار التي تم حفرها دون رخصة رسمية من وكالة الحوض المائي.',
    scenarioData: {
      dataset: [
        { id: 601, location: 'دوار أولاد علي', depth: '60m', permitNumber: 'ABH-2026-081', status: 'LEGAL' },
        { id: 602, location: 'ضيعة الفلاحي رقم 4', depth: '140m (تجاوز العمق المرخص 40m)', permitNumber: 'ABH-2025-119', status: 'ANOMALY' },
        { id: 603, location: 'وادي البساتين', depth: '110m', permitNumber: 'بدون رخصة (حفر عشوائي ليلي)', status: 'ILLEGAL' },
        { id: 604, location: 'الضيعة النموذجية', depth: '50m', permitNumber: 'ABH-2026-092', status: 'LEGAL' }
      ],
      anomaliesToSelect: [602, 603]
    },
    scoringConfig: {
      type: 'SET_MATCH',
      expectedSet: [602, 603]
    }
  },

  {
    taskId: 'SCEN-EV-05',
    numero: 45,
    domaineId: 'ENV',
    domaineAr: 'المراقبة البيئية والمجالات الطبيعية',
    domaineFr: 'Surveillance Environnementale',
    titreAr: 'ضبط صيادين غير مرخصين داخل محمية طبيعية ليلاً',
    titreFr: 'Interpellation de braconniers de nuit en réserve fermée',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 5,
    pointsMax: 20,
    competenceTags: ['FIELD_OBS', 'DECISION_MAKING'],
    interactionType: 'DECISION_SCENARIO',
    consigneAr: 'اتخذ التدابير الزجرية القانونية في شأن الصيد المحظور داخل فترة الراحة البيولوجية.',
    scenarioData: {
      scenarios: [
        {
          id: 'EV05_S1',
          questionAr: 'ضُبط 3 أشخاص يحملون بنادق صيد غير مرخصة وكشافات ضوئية أثناء صيد حيوانات نادرة ليلاً داخل المحمية. كيف يتعامل الدرك الملكي معهم؟',
          optionsAr: [
            'حجز البنادق والذخائر والطرائد المصيدة فورياً، الاستماع للمخالفين في محاضر قانونية وإحالتهم على النيابة العامة مع إشعار إدارة المياه والغابات لإقرار التعويض المدني',
            'الاكتفاء بمصادرة الطرائد وإرجاع الأسلحة لأصحابها',
            'مشاركتهم الطرائد وإطلاق سراحهم',
            'عدم التدخل لكون الصيد رياضة ترفيهية'
          ],
          correctIndex: 0
        }
      ]
    },
    scoringConfig: {
      type: 'MULTIPLE_CHOICE',
      expectedAnswers: { EV05_S1: 0 }
    }
  },

  {
    taskId: 'SCEN-EV-06',
    numero: 46,
    domaineId: 'ENV',
    domaineAr: 'المراقبة البيئية والمجالات الطبيعية',
    domaineFr: 'Surveillance Environnementale',
    titreAr: 'ترتيب خطوات أخذ وتحريز عينات المياه الملوثة للفحص',
    titreFr: 'Protocole de prélèvement et scellé d\'échantillons d\'eau',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['PROCEDURAL_AWARENESS', 'ACCURACY'],
    interactionType: 'PRIORITIZATION',
    consigneAr: 'رتب الخطوات العلمية والقانونية لتحريز عينات التلوث المائي لضمان قبول نتائج التحليل أمام المحكمة.',
    scenarioData: {
      itemsToOrder: [
        { id: 'EV06_1', texteAr: 'معاينة نقطة التصريف وتوثيق الإحداثيات الجغرافية GPS والتوقيت الدقيق ودرجة حرارة السائل', ordreCorrect: 1 },
        { id: 'EV06_2', texteAr: 'ارتداء قفازات معقمة واستعمال قوارير زجاجية محايدة ونظيفة ومعدة خصيصاً للتحاليل الكيميائية', ordreCorrect: 2 },
        { id: 'EV06_3', texteAr: 'ملء ثلاث عينات متطابقة: عينة للمختبر، عينة للنيابة العامة، وعينة شاهدة للمراقبة المضادة', ordreCorrect: 3 },
        { id: 'EV06_4', texteAr: 'وضع الشمع الأحمر والأختام الرسمية وبطاقة البيانات التوضيحية وتوقيع الحاضرين على كل قارورة', ordreCorrect: 4 },
        { id: 'EV06_5', texteAr: 'نقل العينات داخل صندوق تبريد مخصص وتوجيهها الفوري إلى مختبر الدرك الملكي مع جدول الإرسال', ordreCorrect: 5 }
      ]
    },
    scoringConfig: {
      type: 'ORDERING',
      correctOrder: ['EV06_1', 'EV06_2', 'EV06_3', 'EV06_4', 'EV06_5']
    }
  },

  {
    taskId: 'SCEN-EV-07',
    numero: 47,
    domaineId: 'ENV',
    domaineAr: 'المراقبة البيئية والمجالات الطبيعية',
    domaineFr: 'Surveillance Environnementale',
    titreAr: 'قراءة تقرير مخبري حول نسبة المواد الكيميائية في مياه السد',
    titreFr: 'Interprétation d\'un rapport toxicologique de qualité de l\'eau',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['DOC_ANALYSIS', 'DATA_PROCESSING'],
    interactionType: 'DOCUMENT_ANALYSIS',
    consigneAr: 'افحص التقرير المخبري واستخرج المواد التي تجاوزت الحدود القصوى المسموح بها لمياه الشرب (Norme NM 03.7.001).',
    scenarioData: {
      documents: [
        {
          docId: 'EV07_D1',
          titreAr: 'تقرير التحليل الفيزيو-كيميائي للعينات المائية رقم 442/م.ب',
          source: 'مختبر الأبحاث والتحاليل التقنية والعلمية للدرك الملكي',
          date: '28 أكتوبر 2026',
          tampon: 'تقرير خبير محلف',
          contenuAr: 'أظهر الفحص المخبري النتائج التالية مقارنة بالمعيار المغربي لمياه الشرب:\n- نسبة الرصاص (Plomb): 0.08 مغ/لتر (الحد الأقصى المسموح به: 0.01 مغ/لتر) -> تجاوز خطير 8 أضعاف.\n- نسبة النترات (Nitrates): 25 مغ/لتر (الحد الأقصى: 50 مغ/لتر) -> نسبة عادية ومطابقة.\n- نسبة الكادميوم (Cadmium): 0.02 مغ/لتر (الحد الأقصى: 0.003 مغ/لتر) -> تجاوز سام.\nالخلاصة: المياه مسممة ولا تصلح للاستهلاك البشري أو الحيواني إطلاقاً.'
        }
      ],
      questionsVerif: [
        {
          id: 'EV07_Q1',
          questionAr: 'ما هي العناصر السامة التي تجاوزت الحد القانوني بشكل يهدد الصحة العامة؟',
          optionsAr: [
            'النترات فقط',
            'الرصاص والكادميوم معاً بنسب تفوق الحدود القصوى بعدة أضعاف',
            'الكالسيوم والمغنيسيوم',
            'لا يوجد أي تجاوز خطير'
          ],
          correctIndex: 1
        }
      ]
    },
    scoringConfig: {
      type: 'MULTIPLE_CHOICE',
      expectedAnswers: { EV07_Q1: 1 }
    }
  },

  {
    taskId: 'SCEN-EV-08',
    numero: 48,
    domaineId: 'ENV',
    domaineAr: 'المراقبة البيئية والمجالات الطبيعية',
    domaineFr: 'Surveillance Environnementale',
    titreAr: 'تحديد مواقع التهديد بحرائق الغابات في فترة الصيف',
    titreFr: 'Surveillance spatiale des risques d\'incendie de forêt',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['FIELD_OBS', 'RISK_ASSESSMENT'],
    interactionType: 'INTERACTIVE_MAP',
    consigneAr: 'حدد النقاط الحساسة المعرضة لخطر اشتعال النيران إثر هبوب رياح الشركي وارتفاع درجات الحرارة.',
    scenarioData: {
      mapData: {
        axe: 'خريطة مراقبة الغطاء الغابوي',
        pk: 'الكتلة الغابوية الجبلية',
        zones: [
          { id: 'EV08_Z1', nomAr: 'أعشاب يابسة محاذية لمطرح نفايات عشوائي', descriptionAr: 'غاز الميثان المنبعث مع رياح قوية ووجود زجاج مكسر مجمع لأشعة الشمس.', dangerLevel: 'EXTREME' },
          { id: 'EV08_Z2', nomAr: 'مستودع مياه الإطفاء المجهز', descriptionAr: 'خزان مائي ممتلئ مخصص لإمداد طائرات الكنادير وسيارات الإطفاء.', dangerLevel: 'LOW' }
        ]
      },
      hotspotsAIdentifier: [
        { id: 'EV08_H1', titreAr: 'بؤرة الخطر القصوى القابلة للاشتعال السريع', zoneId: 'EV08_Z1', correct: true }
      ]
    },
    scoringConfig: {
      type: 'HOTSPOT_SELECTION',
      expectedHotspots: ['EV08_H1']
    }
  },

  {
    taskId: 'SCEN-EV-09',
    numero: 49,
    domaineId: 'ENV',
    domaineAr: 'المراقبة البيئية والمجالات الطبيعية',
    domaineFr: 'Surveillance Environnementale',
    titreAr: 'تحرير محضر معاينة وحجز في شأن اجتثاث أشجار الأركان',
    titreFr: 'Procès-verbal de constatation de coupe illégale d\'arganiers',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 7,
    pointsMax: 20,
    competenceTags: ['REPORT_PREPARATION', 'ENV_AWARENESS'],
    interactionType: 'REPORT_PREPARATION',
    consigneAr: 'حرر مسودة محضر المعاينة والحجز ضد المخالفين مبيناً عدد الجذوع المقطوعة والآلات المحجوزة.',
    scenarioData: {
      champsAttendus: {
        objet: 'محضر معاينة وحجز في شأن قطع أشجار الأركان المحمية وصنع الفحم الخشبي غير المرخص',
        destinataire: 'إلى السيد وكيل الملك لدى المحكمة الابتدائية',
        motsClesRequis: ['شجر الأركان', 'محضر المعاينة', 'مناشير آلية', 'حجز الفحم', 'قانون الغابات', 'المياه والغابات']
      },
      rubriqueCriteres: [
        'ذكر الإحداثيات الدقيقة للموقع الغابوي',
        'تحديد كميات الحطب المحجوز بالطن والآليات',
        'الإسناد للمقتضيات الزجرية للقانون الغابوي'
      ]
    },
    scoringConfig: {
      type: 'REPORT_RUBRIC',
      minWords: 30,
      requiredKeywords: ['شجر الأركان', 'محضر المعاينة', 'مناشير آلية', 'حجز الفحم', 'قانون الغابات', 'المياه والغابات']
    }
  },

  {
    taskId: 'SCEN-EV-10',
    numero: 50,
    domaineId: 'ENV',
    domaineAr: 'المراقبة البيئية والمجالات الطبيعية',
    domaineFr: 'Surveillance Environnementale',
    titreAr: 'تصنيف الأنشطة الصناعية المحاذية للشاطئ حسب مطابقتها البيئية',
    titreFr: 'Audit de conformité environnementale d\'unités côtières',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['CLASSIFICATION', 'ENV_AWARENESS'],
    interactionType: 'CLASSIFICATION',
    consigneAr: 'صنف الوحدات الصناعية المراقبة حسب درجة مطابقتها للشروط البيئية وحصولها على دراسة التأثير على البيئة.',
    scenarioData: {
      categories: [
        { id: 'CONFORME', titreAr: 'وحدات مطابقة للمعايير البيئية', couleur: 'emerald' },
        { id: 'NON_CONFORME', titreAr: 'وحدات مخالفة تتطلب الإشعار الزجري', couleur: 'rose' }
      ],
      elements: [
        { id: 'EV10_E1', texteAr: 'محطة معالجة مجهزة بمصفاة بيولوجية وتعيد تدوير 90% من مياهها', catCorrecte: 'CONFORME' },
        { id: 'EV10_E2', texteAr: 'معمل دباغة جلود يلقي أملاح الكروم السامة مباشرة في شاطئ البحر', catCorrecte: 'NON_CONFORME' },
        { id: 'EV10_E3', texteAr: 'وحدة تصبير أسماك تتوفر على محطة تصفية معتمدة وشهادة مطابقة بيئية سارية', catCorrecte: 'CONFORME' },
        { id: 'EV10_E4', texteAr: 'معمل زيوت يقوم بحرق الإطارات المطاطية المستعملة في أفران غير مرخصة', catCorrecte: 'NON_CONFORME' }
      ]
    },
    scoringConfig: {
      type: 'CATEGORIZATION',
      correctMapping: {
        EV10_E1: 'CONFORME',
        EV10_E2: 'NON_CONFORME',
        EV10_E3: 'CONFORME',
        EV10_E4: 'NON_CONFORME'
      }
    }
  },

  // ============================================================================
  // المجال 6: Gestion Administrative et Juridique (التسيير الإداري والقانوني) - 10 مهام
  // ============================================================================
  {
    taskId: 'SCEN-AD-01',
    numero: 51,
    domaineId: 'ADMIN',
    domaineAr: 'التسيير الإداري والقانوني',
    domaineFr: 'Gestion Administrative et Juridique',
    titreAr: 'فحص ملفات طلبات رخص الأسلحة النارية ورصد الأوراق الناقصة',
    titreFr: 'Audit de dossiers de permis de port d\'armes de chasse',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['ADMIN_ORG', 'ACCURACY'],
    interactionType: 'DATASET_AUDIT',
    consigneAr: 'تفحص بطاقات طلبات رخص حمل سلاح القنص، وحدد الملفات غير المستوفية للشروط القانونية لوجود وثائق جوهرية ناقصة.',
    scenarioData: {
      dataset: [
        { id: 701, typeAr: 'طلب رخصة سلاح قنص (السيد عمر.ك)', piecesFourniesAr: 'طلب خطي، نسخة ب.ت.و، 4 صور، السجل العدلي نظيف، شهادة طبية بدنية وعقلية', pieceManquanteAr: 'مستوفٍ لكافة الشكليات', estComplet: true },
        { id: 702, typeAr: 'طلب رخصة سلاح قنص (السيد رشيد.م)', piecesFourniesAr: 'طلب خطي، نسخة ب.ت.و، 4 صور، السجل العدلي نظيف', pieceManquanteAr: 'شهادة الفحص الطبي البدني والعقلي المسلمة من طبيب محلف', estComplet: false },
        { id: 703, typeAr: 'طلب رخصة سلاح قنص (السيد كمال.ب)', piecesFourniesAr: 'طلب خطي، نسخة ب.ت.و، شهادة طبية، صور', pieceManquanteAr: 'السجل العدلي (البطاقة رقم 3)', estComplet: false },
        { id: 704, typeAr: 'طلب تجديد رخصة سلاح (السيد حسن.ط)', piecesFourniesAr: 'أصل الرخصة القديمة، شهادة طبية حديثة، صور، سجل عدلي', pieceManquanteAr: 'مستوفٍ لكافة الشكليات', estComplet: true }
      ],
      anomaliesToSelect: [702, 703]
    },
    scoringConfig: {
      type: 'SET_MATCH',
      expectedSet: [702, 703]
    }
  },

  {
    taskId: 'SCEN-AD-02',
    numero: 52,
    domaineId: 'ADMIN',
    domaineAr: 'التسيير الإداري والقانوني',
    domaineFr: 'Gestion Administrative et Juridique',
    titreAr: 'ترتيب البريد والمراسلات اليومية حسب الآجال القانونية',
    titreFr: 'Hiérarchisation du courrier par délai réglementaire',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['ADMIN_ORG', 'PROCEDURAL_UND'],
    interactionType: 'PRIORITIZATION',
    consigneAr: 'رتب المراسلات الواردة على مكتب الضبط بالسرية حسب درجة الاستعجال الإداري والأثر القانوني الملزم.',
    scenarioData: {
      itemsToOrder: [
        { id: 'AD02_1', texteAr: 'إنابة قضائية مستعجلة من قاضي التحقيق محددة الأجل بـ 48 ساعة لسماع شاهد في جناية أموال', ordreCorrect: 1 },
        { id: 'AD02_2', texteAr: 'تعليمات النيابة العامة الفورية في شكاية إيذاء عمدي مع حالة فرار للمشتكى به', ordreCorrect: 2 },
        { id: 'AD02_3', texteAr: 'برقية القيادة الجهوية لطلب حصر لوائح المستفيدين من الترقية قبل نهاية الأسبوع الجاري', ordreCorrect: 3 },
        { id: 'AD02_4', texteAr: 'مراسلة عمالة الإقليم بخصوص التحضير لاجتماع اللجنة الإقليمية للأمن للشهر المقبل', ordreCorrect: 4 },
        { id: 'AD02_5', texteAr: 'طلب رخصة صيد اعتيادية محال للدراسة وإبداء الرأي في أجل شهر', ordreCorrect: 5 }
      ]
    },
    scoringConfig: {
      type: 'ORDERING',
      correctOrder: ['AD02_1', 'AD02_2', 'AD02_3', 'AD02_4', 'AD02_5']
    }
  },

  {
    taskId: 'SCEN-AD-03',
    numero: 53,
    domaineId: 'ADMIN',
    domaineAr: 'التسيير الإداري والقانوني',
    domaineFr: 'Gestion Administrative et Juridique',
    titreAr: 'تطبيق قواعد السرية المهنية عند طلب الاطلاع على المحاضر',
    titreFr: 'Secret professionnel et communication de pièces d\'enquête',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 5,
    pointsMax: 20,
    competenceTags: ['DOC_MGMT', 'PROCEDURAL_UND'],
    interactionType: 'DECISION_SCENARIO',
    consigneAr: 'حدد الموقف النظامي الصارم المتطابق مع أخلاقيات المرفق العسكري ومقتضيات المادة 15 من ق.م.ج.',
    scenarioData: {
      scenarios: [
        {
          id: 'AD03_S1',
          questionAr: 'تقدم شخص يدعي أنه محامي طرف متضرر مطالباً بتسليمه نسخة مباشرة من محضر بحث تمهيدي لا زال جارياً بمكتب الضبط. كيف يتصرف المساعد؟',
          optionsAr: [
            'تسليمه نسخة فورية مع أخذ توقيعه في سجل الزوار',
            'رفض طلبه بحزم لكون محاضر البحث مشمولة بالسرية المهنية وسرية التحريات تحت طائلة العقوبات الجنائية، وتوجيهه إلى النيابة العامة صاحبة الاختصاص الحصري في إصدار أي إذن',
            'تركه يصور المحضر بهاتفه الذكي فقط دون طباعة',
            'تمزيق المحضر أمامه'
          ],
          correctIndex: 1
        }
      ]
    },
    scoringConfig: {
      type: 'MULTIPLE_CHOICE',
      expectedAnswers: { AD03_S1: 1 }
    }
  },

  {
    taskId: 'SCEN-AD-04',
    numero: 54,
    domaineId: 'ADMIN',
    domaineAr: 'التسيير الإداري والقانوني',
    domaineFr: 'Gestion Administrative et Juridique',
    titreAr: 'تصنيف المراسلات الواردة حسب المصالح والوحدات المختصة',
    titreFr: 'Ventilation du courrier d\'arrivée par bureau d\'affectation',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['ADMIN_ORG', 'CLASSIFICATION'],
    interactionType: 'CLASSIFICATION',
    consigneAr: 'وجه المراسلات الواردة إلى المكاتب المختصة داخل سرية الدرك الملكي.',
    scenarioData: {
      categories: [
        { id: 'BUR_JUD', titreAr: 'المكتب القضائي (Bureau Judiciaire)', couleur: 'rose' },
        { id: 'BUR_PERS', titreAr: 'مكتب الأفراد والشؤون الإدارية (Bureau RH)', couleur: 'blue' },
        { id: 'BUR_MAT', titreAr: 'مكتب العتاد واللوجستيك (Bureau Matériel)', couleur: 'emerald' }
      ],
      elements: [
        { id: 'AD04_E1', texteAr: 'إرسالية من المحكمة الابتدائية تتضمن إنابة قضائية لإجراء بحث تكميلي', catCorrecte: 'BUR_JUD' },
        { id: 'AD04_E2', texteAr: 'طلب رخصة إدارية سنوية لعنصر دركي مع شهادة الوضعية العائلية', catCorrecte: 'BUR_PERS' },
        { id: 'AD04_E3', texteAr: 'إشعار صيانة دورية للمركبات وتجديد إطارات سيارات الدوريات', catCorrecte: 'BUR_MAT' },
        { id: 'AD04_E4', texteAr: 'تقرير حادثة شغل عسكرية لعنصر أثناء أداء الواجب', catCorrecte: 'BUR_PERS' },
        { id: 'AD04_E5', texteAr: 'طلب تعيين خبير باليستي في قضية إطلاق نار', catCorrecte: 'BUR_JUD' }
      ]
    },
    scoringConfig: {
      type: 'CATEGORIZATION',
      correctMapping: {
        AD04_E1: 'BUR_JUD',
        AD04_E2: 'BUR_PERS',
        AD04_E3: 'BUR_MAT',
        AD04_E4: 'BUR_PERS',
        AD04_E5: 'BUR_JUD'
      }
    }
  },

  {
    taskId: 'SCEN-AD-05',
    numero: 55,
    domaineId: 'ADMIN',
    domaineAr: 'التسيير الإداري والقانوني',
    domaineFr: 'Gestion Administrative et Juridique',
    titreAr: 'تدقيق الشكليات الجوهرية لإنابة قضائية دولية',
    titreFr: 'Contrôle formel d\'une commission rogatoire internationale',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['DOC_ANALYSIS', 'PROCEDURAL_UND'],
    interactionType: 'DOCUMENT_ANALYSIS',
    consigneAr: 'افحص نص الإنابة القضائية وتأكد من استيفائها للشكليات القانونية وقنوات الإحالة الرسمية عبر وزارة العدل.',
    scenarioData: {
      documents: [
        {
          docId: 'AD05_D1',
          titreAr: 'إنابة قضائية دولية رقم 12/إ.د/2026',
          source: 'السلطة القضائية الأجنبية عبر وزارة العدل المغربية',
          date: '15 أكتوبر 2026',
          tampon: 'إحالة رسمية مؤشر عليها من النيابة العامة',
          contenuAr: 'الموضوع: طلب استماع لشاهد مقيم بدائرة نفوذ الدرك الملكي في قضية غسيل أموال.\nالشكليات المتوفرة: أصل الطلب، الترجمة الرسمية للغة العربية، ملخص الوقائع الجنائية، توقيع القاضي المنيب، وتأشيرة السيد الوكيل العام للملك لدى محكمة الاستئناف.\nالأجل المحدد للإنجاز: 30 يوماً.'
        }
      ],
      questionsVerif: [
        {
          id: 'AD05_Q1',
          questionAr: 'هل الملف مستوفٍ للشكليات المسطرية للبدء في تنفيذه من قبل فرقة الأبحاث؟',
          optionsAr: [
            'نعم، مستوفٍ للترجمة الرسمية وتأشيرة النيابة العامة المختصة وقنوات التبليغ الدبلوماسية والقضائية',
            'لا، لأن الإنابة صادرة من دولة أجنبية ولا تطبق بالمغرب',
            'ناقص لعدم وجود بصمة إبهام الشاهد مسبقاً',
            'غير صالح لمرور أكثر من 24 ساعة'
          ],
          correctIndex: 0
        }
      ]
    },
    scoringConfig: {
      type: 'MULTIPLE_CHOICE',
      expectedAnswers: { AD05_Q1: 0 }
    }
  },

  {
    taskId: 'SCEN-AD-06',
    numero: 56,
    domaineId: 'ADMIN',
    domaineAr: 'التسيير الإداري والقانوني',
    domaineFr: 'Gestion Administrative et Juridique',
    titreAr: 'التعامل مع طلب مستعجل من القضاء بخصوص ملف محفوظ بالأرشيف',
    titreFr: 'Recherche et extraction urgente d\'un dossier d\'archives',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 5,
    pointsMax: 20,
    competenceTags: ['ADMIN_ORG', 'DOC_MGMT'],
    interactionType: 'DECISION_SCENARIO',
    consigneAr: 'حدد الخطوات الإدارية السليمة لاستخراج ملف مؤرشف وتحرير وصل إحالة نظامي.',
    scenarioData: {
      scenarios: [
        {
          id: 'AD06_S1',
          questionAr: 'طلبت النيابة العامة بشكل مستعجل ضم ملف قضائي قديم محفوظ في أرشيف السرية منذ سنة 2020. ما هو الإجراء الإداري الصحيح؟',
          optionsAr: [
            'الاعتذار للنيابة العامة بدعوى أن الملفات القديمة يتم حرقها',
            'البحث في سجل الأرشيف بواسطة الرقم التسلسلي وسنة الحفظ، استخراج الملف الأصلي، وضع بطاقة استبدال مؤقتة بالرف، وإحالة الملف بجدول إرسال رسمي مسجل في صادر مكتب الضبط',
            'إرسال أوراق الملف دون تسجيلها في أي سجل رسمي',
            'تسليم المفاتيح لعون المحكمة ليبحث بنفسه في الأرشيف'
          ],
          correctIndex: 1
        }
      ]
    },
    scoringConfig: {
      type: 'MULTIPLE_CHOICE',
      expectedAnswers: { AD06_S1: 1 }
    }
  },

  {
    taskId: 'SCEN-AD-07',
    numero: 57,
    domaineId: 'ADMIN',
    domaineAr: 'التسيير الإداري والقانوني',
    domaineFr: 'Gestion Administrative et Juridique',
    titreAr: 'مراجعة بيانات جدول حراسة الأفراد وساعات الخدمة الشهرية',
    titreFr: 'Contrôle du tableau de service et des tours de garde',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['DATA_PROCESSING', 'ACCURACY'],
    interactionType: 'DATASET_AUDIT',
    consigneAr: 'تفحص جدول مناوبات الحراسة، وحدد الحالات المخالفة للحد الأدنى من الراحة البيولوجية الإلزامية (أقل من 8 ساعات راحة بين نوبتين متتاليتين).',
    scenarioData: {
      dataset: [
        { id: 801, matricule: 'EG-102', garde1: 'الإثنين 08:00 - 16:00', garde2: 'الثلاثاء 08:00 - 16:00', reposeHours: '16h', status: 'CONFORME' },
        { id: 802, matricule: 'EG-105', garde1: 'الإثنين 16:00 - 00:00', garde2: 'الثلاثاء 04:00 - 12:00', reposeHours: '4h فقط (إرهاق خطير)', status: 'NON_CONFORME' },
        { id: 803, matricule: 'EG-109', garde1: 'الثلاثاء 00:00 - 08:00', garde2: 'الأربعاء 00:00 - 08:00', reposeHours: '16h', status: 'CONFORME' },
        { id: 804, matricule: 'EG-114', garde1: 'الأربعاء 08:00 - 16:00', garde2: 'الأربعاء 20:00 - 04:00', reposeHours: '4h فقط (إرهاق خطير)', status: 'NON_CONFORME' }
      ],
      anomaliesToSelect: [802, 804]
    },
    scoringConfig: {
      type: 'SET_MATCH',
      expectedSet: [802, 804]
    }
  },

  {
    taskId: 'SCEN-AD-08',
    numero: 58,
    domaineId: 'ADMIN',
    domaineAr: 'التسيير الإداري والقانوني',
    domaineFr: 'Gestion Administrative et Juridique',
    titreAr: 'ترتيب مراحل معالجة شكاية مواطن من الاستلام حتى الإحالة',
    titreFr: 'Circuit administratif de traitement d\'une plainte',
    difficulte: 'INTERMEDIAIRE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['ADMIN_ORG', 'PROCEDURAL_UND'],
    interactionType: 'PRIORITIZATION',
    consigneAr: 'رتب المسار الإداري الصحيح لمعالجة شكاية مودعة بمكتب الضبط بالسرية.',
    scenarioData: {
      itemsToOrder: [
        { id: 'AD08_1', texteAr: 'استلام الشكاية والتحقق من هوية المشتكي وتسجيلها برقم ترتيبي وتاريخ وساعة بسجل الواردات', ordreCorrect: 1 },
        { id: 'AD08_2', texteAr: 'عرض الشكاية فوراً على قائد السرية لإعطاء التأشيرة والتعليمات المكتوبة', ordreCorrect: 2 },
        { id: 'AD08_3', texteAr: 'إحالة الشكاية مع التعليمات إلى المركز الترابي المختص ترابياً لمباشرة الأبحاث', ordreCorrect: 3 },
        { id: 'AD08_4', texteAr: 'إجراء التحريات والاستماع للأطراف وإنجاز محضر المعاينة من طرف المحققين', ordreCorrect: 4 },
        { id: 'AD08_5', texteAr: 'إحالة المسطرة المنجزة كاملة بجدول إرسال إلى السيد وكيل الملك مع حفظ نسخة بالأرشيف', ordreCorrect: 5 }
      ]
    },
    scoringConfig: {
      type: 'ORDERING',
      correctOrder: ['AD08_1', 'AD08_2', 'AD08_3', 'AD08_4', 'AD08_5']
    }
  },

  {
    taskId: 'SCEN-AD-09',
    numero: 59,
    domaineId: 'ADMIN',
    domaineAr: 'التسيير الإداري والقانوني',
    domaineFr: 'Gestion Administrative et Juridique',
    titreAr: 'إعداد جدول إرسال رسمي (Bordereau) لمسطرة قضائية جنائية',
    titreFr: 'Établissement du bordereau d\'envoi d\'une procédure criminelle',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 7,
    pointsMax: 20,
    competenceTags: ['DOC_MGMT', 'ACCURACY'],
    interactionType: 'REPORT_PREPARATION',
    consigneAr: 'حرر جدول الإرسال الرسمي الموجه للوكيل العام للملك لإحالة جناية تكوين عصابة إجرامية.',
    scenarioData: {
      champsAttendus: {
        objet: 'جدول إرسال مسطرة جنائية في شأن تكوين عصابة إجرامية والسرقة الموصوفة',
        destinataire: 'إلى السيد الوكيل العام للملك لدى محكمة الاستئناف',
        motsClesRequis: ['جدول إرسال', 'عدد النظائر', 'المحجوزات', 'المرفقات', 'محضر أصلي', 'حالة تلبس']
      },
      rubriqueCriteres: [
        'الدقة في بيان عدد النظائر والصفحات',
        'جرد سليم للأدلة المرفقة بالأكياس المحرزة',
        'احترام الهيكل الرسمي لجدول الإرسال العسكري'
      ]
    },
    scoringConfig: {
      type: 'REPORT_RUBRIC',
      minWords: 30,
      requiredKeywords: ['جدول إرسال', 'عدد النظائر', 'المحجوزات', 'المرفقات', 'محضر أصلي', 'حالة تلبس']
    }
  },

  {
    taskId: 'SCEN-AD-10',
    numero: 60,
    domaineId: 'ADMIN',
    domaineAr: 'التسيير الإداري والقانوني',
    domaineFr: 'Gestion Administrative et Juridique',
    titreAr: 'تدقيق ملف تعويض عن حادثة شغل والتأكد من المرفقات الطبية',
    titreFr: 'Vérification d\'un dossier d\'accident de service militaire',
    difficulte: 'AVANCE',
    dureeEstimeeMinutes: 6,
    pointsMax: 20,
    competenceTags: ['DOC_ANALYSIS', 'ADMIN_ORG'],
    interactionType: 'DOCUMENT_ANALYSIS',
    consigneAr: 'افحص ملف حادثة الخدمة وتأكد من وجود التقرير المفصل لقائد الوحدة والشهادة الطبية الأولية في الأجل القانوني (48 ساعة).',
    scenarioData: {
      documents: [
        {
          docId: 'AD10_D1',
          titreAr: 'ملف حادثة خدمة عسكرية لعنصر دركي أثناء دورية ليلية',
          source: 'مكتب الشؤون الإدارية للسرية',
          date: '02 نونبر 2026',
          tampon: 'ملف معروض للمصادقة على التعويض',
          contenuAr: 'المصاب: رقيب أول بالمركز الترابي.\nتاريخ الحادث: 30 أكتوبر 2026 - 22:30 أثناء مطاردة مركبة مهربين.\nالوثائق المرفقة: تقرير قائد المركز محرر بتاريخ 31 أكتوبر، شهادة طبية أولية صادرة عن طبيب المستشفى العسكري تثبت عجزاً مؤقتاً لمدة 45 يوماً مؤرخة في 31 أكتوبر، وتصريحات رفيق الدورية الشاهد على الواقعة.'
        }
      ],
      questionsVerif: [
        {
          id: 'AD10_Q1',
          questionAr: 'هل يعتبر ملف حادثة الخدمة مستوفياً للأجل القانوني والوثائق الإثباتية المطلوبة؟',
          optionsAr: [
            'نعم، محرر ومودع خلال أقل من 48 ساعة ومرفق بالشهادة الطبية العسكرية وتقرير قائد الوحدة وشهادة الشاهد',
            'لا، لأن الحادث وقع ليلاً',
            'ناقص لعدم وجود إذن من وزير العدل',
            'مرفوض لتجاوز الأجل القانوني'
          ],
          correctIndex: 0
        }
      ]
    },
    scoringConfig: {
      type: 'MULTIPLE_CHOICE',
      expectedAnswers: { AD10_Q1: 0 }
    }
  }
];

