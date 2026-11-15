// ==============================================================================
// ORIENT-GR - Référentiel des Modules de Simulation Professionnelle
// مركز المحاكاة المهنية للدرك الملكي • المملكة المغربية
// Scénarios professionnels immersifs et éducatifs d'évaluation des compétences pratiques
// ==============================================================================

export const professionalSimulationModules = [
  // ============================================================================
  // MODULE 1 : Recherche et Investigation Judiciaire (محاكاة البحث والتحقيق القضائي)
  // ============================================================================
  {
    moduleId: 'SIM-PJ',
    code: 'SIM-PJ-01',
    numero: 1,
    titreAr: 'محاكاة البحث والتحقيق القضائي',
    titreFr: 'Recherche et Investigation Judiciaire',
    descriptionAr: 'معالجة ملف قضية سرقة موصوفة بمستودع جمركي: فحص وثائق الملف الجنائي، تدقيق إفادات الشهود، رصد التناقضات الزمنية، تصنيف الأدلة المحجوزة، وتحرير التقرير الإخباري الموجه للنيابة العامة.',
    descriptionFr: 'Traitement d\'un dossier de vol qualifié : analyse des pièces de procédure, détection des contradictions d\'audition, classification des scellés et rédaction du rapport de synthèse.',
    subdivision: 'الشرطة القضائية وفرق الأبحاث (Brigades de Recherches)',
    specialiteAssociee: 'SPEC-PJ',
    specialitesSecondaires: ['SPEC-SCIENTIFIQUE', 'SPEC-SEC-ADMIN'],
    dureeEstimeeMinutes: 35,
    pointsTotal: 100,
    competencesEvaluees: [
      { code: 'DOC_ANALYSIS', nomAr: 'تحليل الوثائق والمحاضر', nomFr: 'Analyse documentaire', poids: 25 },
      { code: 'ACCURACY', nomAr: 'الدقة ورصد التناقضات', nomFr: 'Rigueur et détection d\'incohérences', poids: 25 },
      { code: 'CLASSIFICATION', nomAr: 'تصنيف الأدلة والقرائن', nomFr: 'Classification des pièces et indices', poids: 20 },
      { code: 'PROCEDURAL_AWARENESS', nomAr: 'الوعي بالمسطرة الجنائية', nomFr: 'Conformité procédurale', poids: 15 },
      { code: 'REPORT_PREPARATION', nomAr: 'تحرير التقرير التركيبي', nomFr: 'Rédaction du rapport de synthèse', poids: 15 }
    ],
    scenarioContext: {
      contexteGeneralAr: 'بصفتك ضابط شرطة قضائية بفرقة الأبحاث التابعة لسرية الدرك الملكي، أُحيلت إليك قضية سرقة موصوفة استهدفت مستودعاً جمركياً للمعدات الإلكترونية ليلة الأحد إلى الإثنين. تقع على عاتقك دراسة المحاضر، ومضاهاة التواريخ، واستخراج التناقضات الصريحة بين الشهود، وتصنيف الأدلة المرفوعة من مسرح الجريمة، وصياغة تقرير تركيبي دقيق للنيابة العامة.',
      lieu: 'الحظيرة الجمركية المينائية - دائرة نفوذ سرية الدرك الملكي',
      dateEvenement: '2026-10-18',
      heureConstatation: '07:30'
    },
    stages: [
      {
        stageIndex: 1,
        stageType: 'DOCUMENT_ANALYSIS',
        titreAr: 'المرحلة 1: دراسة وثائق ومحاضر القضية',
        consigneAr: 'افحص الوثائق الرسمية للملف (محضر المعاينة الأولية، إفادة الحارس الليلي، إفادة مدير المستودع، وتقرير شركة المراقبة الإلكترونية). استخرج المعطيات الثابتة للواقعة.',
        documents: [
          {
            docId: 'DOC-01',
            titreAr: 'محضر المعاينة الأولية ومسرح الجريمة رقم 142/ق.ض',
            source: 'المركز الترابي للدرك الملكي',
            date: '2026-10-18 - 07:45',
            tampon: 'الدرك الملكي • فرقة الشرطة القضائية • سري للغاية',
            contenuAr: 'في يوم الإثنين 18 أكتوبر 2026، على الساعة 07:45 صباحاً، انتقلنا إلى المستودع رقم 4. عاينّا كسر القفل الخارجي للبوابة الخلفية بواسطة أداة قطع حادة (قاطع حديد هيدروليكي). لم تُسجل أي بصمات واضحة على المقبض بسبب ارتداء الفاعلين لقفازات. وُجدت آثار عجلات مركبة نفعية ذات حمولة متوسطة قرب الرصيف الجانبي متجهة شمالاً نحو الطريق الوطنية. كما تم حجز قفاز قماشي أسود ملطخ ببقع زيتية قرب الباب الخلفي.'
          },
          {
            docId: 'DOC-02',
            titreAr: 'محضر استماع لإفادة الحارس الليلي (السيد عمر.ب)',
            source: 'فرقة الأبحاث الجنائية',
            date: '2026-10-18 - 09:15',
            tampon: 'تصريح مستمع إليه قانوناً',
            contenuAr: 'صرح الحارس عمر.ب: "كنت في جولة تفقدية اعتيادية على الساعة 02:00 صباحاً وكانت كل الأبواب موصدة بإحكام. بين الساعة 02:30 و 03:45 كنت متواجداً داخل مقصورة الحراسة الرئيسية دون انقطاع لتسجيل سجل الدخول، ولم أسمع أي حركة غريبة أو صوت مركبة إطلاقاً. لم أغادر المقصورة حتى وصول المناوب الصباحي على الساعة 07:00."'
          },
          {
            docId: 'DOC-03',
            titreAr: 'تقرير التدقيق التقني لمنظومة المراقبة وكاميرات الحراسة',
            source: 'مكتب التحليل والخبرة الرقمية',
            date: '2026-10-18 - 11:30',
            tampon: 'تقرير فني مؤشر عليه',
            contenuAr: 'أظهر الفحص التقني لجهاز التسجيل الرقمي (DVR) انقطاعاً متعمداً للبث بين الساعة 02:40 و 03:25 صباحاً بفعل قطع كابل التغذية الكهربائية للدارة المغلقة من داخل ممر الإدارة. قبل الانقطاع مباشرة في تمام 02:38، رصدت كاميرا الممر شخصاً يرتدي سترة حراسة مشابهة للزي المعتمد وهو يعبر باتجاه القاطع الكهربائي. سجل فتح باب الطوارئ الإلكتروني على الساعة 02:45 بواسطة شارة المرور رقم BADGE-04.'
          },
          {
            docId: 'DOC-04',
            titreAr: 'محضر جرد وجرد أولي للمسروقات (تصريح مدير المستودع)',
            source: 'إدارة المستودع الجمركي',
            date: '2026-10-18 - 14:00',
            tampon: 'إفادة مالية معتمدة',
            contenuAr: 'أفاد المدير بأن المسروقات شملت 120 حاسوباً محمولاً عالي الأداء و40 جهاز توجيه خوادم مشفرة، تم استيرادها خصيصاً قبل 48 ساعة فقط. الشارة BADGE-04 المسجلة في تقرير الباب الإلكتروني مسندة رسمياً للحارس عمر.ب منذ شهرين ولم يبلغ عن ضياعها.'
          }
        ],
        questionsVerif: [
          {
            id: 'Q-01',
            questionAr: 'ما هي الوسيلة التي استُعملت لتعطيل كاميرات المراقبة ومن أين نُفذت؟',
            optionsAr: [
              'اختراق سيبراني خارجي عبر شبكة الإنترنت',
              'قطع كابل التغذية الكهربائية يدوياً من داخل ممر الإدارة',
              'عطل فني عام ناجم عن الصواعق الرعدية',
              'إتلاف الكاميرات الخارجية بحجارة'
            ],
            correctIndex: 1
          },
          {
            id: 'Q-02',
            questionAr: 'ما هي وسيلة الدخول المستعملة عبر باب الطوارئ الإلكتروني وتوقيتها الدقيق؟',
            optionsAr: [
              'كسر الباب الخارجي على الساعة 01:15',
              'استخدام الشارة رقم BADGE-04 في تمام الساعة 02:45',
              'فتح الباب بمفتاح ميكانيكي تقليدي على الساعة 03:30',
              'تسلق النافذة العلوية في تمام 04:00'
            ],
            correctIndex: 1
          }
        ]
      },
      {
        stageIndex: 2,
        stageType: 'CONTRADICTION_DETECTION',
        titreAr: 'المرحلة 2: مقارنة التواريخ وتحديد التناقضات الصريحة',
        consigneAr: 'قارن بدقة بين إفادة الحارس الليلي وسجلات المعطيات التقنية الموثقة. حدد العناصر التي تشكل تناقضاً لا يقبل الشك.',
        itemsToEvaluate: [
          {
            id: 'CONTRA-01',
            declarationAr: 'زعم الحارس: "لم أغادر مقصورة الحراسة بين الساعة 02:30 و 03:45 نهائياً."',
            preuveAr: 'سجل الكاميرا وباب الطوارئ: رصد حركة شخص بزي حراسة نحو القاطع الكهربائي في 02:38 واستعمال شارته في 02:45.',
            isContradiction: true,
            justificationAr: 'تناقض زمني صريح ومادي يثبت مغادرته للمقصورة ووجوده داخل ممر الإدارة وقت ارتكاب الفعل.'
          },
          {
            id: 'CONTRA-02',
            declarationAr: 'زعم الحارس: "لم أسمع أي حركة غريبة أو صوت مركبة إطلاقاً."',
            preuveAr: 'محضر المعاينة: آثار عجلات شاحنة نفعية محملة بـ 120 حاسوباً على الرصيف المحاذي مباشرة للمستودع.',
            isContradiction: true,
            justificationAr: 'عملية شحن 120 حاسوباً و40 خادماً تتطلب وقتاً وضجيجاً يتعذر معه عدم انتباه الحارس الوحيد بالمستودع.'
          },
          {
            id: 'CONTRA-03',
            declarationAr: 'تصريح مدير المستودع: تم استيراد المعدات قبل 48 ساعة فقط.',
            preuveAr: 'سجلات الجمارك: تاريخ تصريح الشحن مؤرخ في 16 أكتوبر 2026.',
            isContradiction: false,
            justificationAr: 'تطابق تام بين التصريح والوثائق الجمركية، ولا يشكل أي شبهة تضارب.'
          },
          {
            id: 'CONTRA-04',
            declarationAr: 'زعم الحارس: "كانت كل الأبواب موصدة بإحكام طيلة الليل."',
            preuveAr: 'محضر المعاينة: كسر القفل الخارجي للبوابة الخلفية بقاطع هيدروليكي قبل الساعة 07:30 صباحاً.',
            isContradiction: true,
            justificationAr: 'يدحض ادعاء سلامة الأبواب ويؤكد إما التواطؤ أو التقصير الجسيم في المراقبة.'
          }
        ]
      },
      {
        stageIndex: 3,
        stageType: 'CLASSIFICATION',
        titreAr: 'المرحلة 3: تصنيف المحجوزات والأدلة القانونية',
        consigneAr: 'قم بتصنيف القرائن والمحجوزات التالية في الفئات الإجرائية السليمة طبقاً لضوابط المسطرة الجنائية وسلسلة الحراسة القضائية.',
        categories: [
          { id: 'CAT_MATERIEL', titreAr: 'أدلة مادية ملموسة (Pièces à conviction)', couleur: 'emerald' },
          { id: 'CAT_NUMERIQUE', titreAr: 'قرائن ومعطيات رقمية (Indices numériques)', couleur: 'blue' },
          { id: 'CAT_PROCEDURAL', titreAr: 'أوراق وسجلات مسطرية (Documents de procédure)', couleur: 'amber' }
        ],
        elements: [
          { id: 'ELEM-01', texteAr: 'قفاز قماشي أسود ملطخ ببقع زيتية عثر عليه قرب الباب الخلفي', catCorrecte: 'CAT_MATERIEL' },
          { id: 'ELEM-02', texteAr: 'قالب جبسي لأثر عجلات الشاحنة المرفوع من الرصيف الشمالي', catCorrecte: 'CAT_MATERIEL' },
          { id: 'ELEM-03', texteAr: 'القرص الصلب لجهاز DVR المتضمن التسجيلات المقتطعة وسجل الولوج الإلكتروني', catCorrecte: 'CAT_NUMERIQUE' },
          { id: 'ELEM-04', texteAr: 'سجل البوابات الإلكترونية المتضمن استخدام الشارة BADGE-04', catCorrecte: 'CAT_NUMERIQUE' },
          { id: 'ELEM-05', texteAr: 'محضر المعاينة والكسر المحرر من طرف ضابط الشرطة القضائية', catCorrecte: 'CAT_PROCEDURAL' },
          { id: 'ELEM-06', texteAr: 'سجل الحراسة الورقي الخاص بمقصورة الحارس لليلة الحادثة', catCorrecte: 'CAT_PROCEDURAL' }
        ]
      },
      {
        stageIndex: 4,
        stageType: 'DECISION_SCENARIO',
        titreAr: 'المرحلة 4: التدابير الإجرائية القانونية الفورية',
        consigneAr: 'حدد الإجراءات المسطرية الواجب اتخاذها في إطار حالة التلبس وقواعد البحث التمهيدي تحت إشراف النيابة العامة المختصة.',
        scenarios: [
          {
            id: 'DEC-01',
            questionAr: 'أمام ثبوت تناقضات الحارس الليلي واستعمال شارته الإلكترونية، ما هو الإجراء القانوني الواجب اتخاذه على الفور؟',
            optionsAr: [
              'إخلاء سبيله فوراً لعدم كفاية الأدلة المادية والاكتفاء بمراقبته عن بعد',
              'إشعار السيد وكيل الملك، ووضع الحارس تحت الحراسة النظرية لمقتضيات البحث مع إشعاره بحقوقه المسطرية وضماناته القانونية',
              'تفتيش مسكن الحارس دون الحصول على إذنه الكتابي أو موافقة النيابة العامة',
              'تسليم الملف فوراً لشركة التأمين لمباشرة التعويض المالي'
            ],
            correctIndex: 1,
            feedbackAr: 'إشعار النيابة العامة ووضع المشتبه فيه تحت الحراسة النظرية مع تلاوة الحقوق القانونية هو الإجراء المسطري المطابق للمادة 66 من ق.م.ج.'
          },
          {
            id: 'DEC-02',
            questionAr: 'بخصوص القفاز القماشي المرفوع من مسرح الجريمة، ما هو التدبير العلمي المعتمد؟',
            optionsAr: [
              'غسل القفاز لتنظيف الزيوت ثم عرضه على المشتبه فيه للتعرف عليه',
              'إيداع القفاز في كيس تحريز ورقي منفذ وتوجيهه الفوري إلى مختبر الدرك الملكي للتحليلات الجنائية لاستخلاص الحمض النووي (ADN)',
              'الاحتفاظ به في مكتب الضابط دون تحريز رسمي للاستدلال به لاحقاً',
              'إتلافه لكونه قفازاً رخيص الثمن لا قيمة مالية له'
            ],
            correctIndex: 1,
            feedbackAr: 'حفظ سلامة العينة في حرز قانوني وتوجيهها للمختبر الجيني يحفظ حجية الدليل الجنائي المادي من التلوث.'
          }
        ]
      },
      {
        stageIndex: 5,
        stageType: 'REPORT_PREPARATION',
        titreAr: 'المرحلة 5: صياغة التقرير الإخباري التركيبي',
        consigneAr: 'قم بصياغة ملخص تركيبي موجز وموضوعي موجه للسيد وكيل الملك، يتضمن تلخيص الوقائع، والأدلة المستجمعة، والشبهات المسطرية، والإجراءات المقترحة.',
        rubriqueCriteres: [
          'الدقة في ذكر التواريخ والوقائع دون أحكام مسبقة',
          'الإشارة إلى الإجراءات المتخذة في مسرح الجريمة والحجوزات',
          'إبراز القرائن الرقمية المحددة واستعمال الشارة',
          'احترام الأسلوب الإداري العسكري الرسمي للدرك الملكي'
        ],
        champsAttendus: {
          objet: 'في شأن قضية سرقة موصوفة من داخل مستودع جمركي مع التعدد والكسر ليلاً',
          destinataire: 'إلى السيد وكيل الملك لدى المحكمة الابتدائية بالدار البيضاء',
          motsClesRequis: ['الحراسة النظرية', 'كسر', 'شارة', 'المختبر', 'النيابة العامة', 'تناقضات']
        }
      }
    ]
  },

  // ============================================================================
  // MODULE 2 : Sécurité Routière et Terrain (محاكاة السلامة الطرقية والتدخل الميداني)
  // ============================================================================
  {
    moduleId: 'SIM-ROUTE',
    code: 'SIM-ROUTE-02',
    numero: 2,
    titreAr: 'محاكاة السلامة الطرقية والتدخل الميداني',
    titreFr: 'Sécurité Routière et Intervention Terrain',
    descriptionAr: 'إدارة وتأمين حادثة سير جسيمة متعددة المركبات على طريق سيار: تفقد الخريطة التفاعلية للموقع، رصد المخاطر المترتبة، ترتيب أولويات التدخل، وتطبيق بروتوكولات حماية مستعملي الطريق.',
    descriptionFr: 'Gestion d\'un accident complexe sur autoroute : inspection cartographique, identification des risques (déversement, carambolage), hiérarchisation des secours et sécurisation des voies.',
    subdivision: 'سرايا الدراجات النارية وأمن الطرق (Unités Escadron Motocycliste)',
    specialiteAssociee: 'SPEC-ROUTE',
    specialitesSecondaires: ['SPEC-MOTARD', 'SPEC-PSIG'],
    dureeEstimeeMinutes: 30,
    pointsTotal: 100,
    competencesEvaluees: [
      { code: 'FIELD_ORG', nomAr: 'التنظيم الميداني وتثبيت المحيط', nomFr: 'Organisation terrain et bouclage', poids: 30 },
      { code: 'RISK_ASSESSMENT', nomAr: 'تقييم المخاطر والتنبؤ بالأزمات', nomFr: 'Évaluation des risques majeurs', poids: 25 },
      { code: 'PROCEDURAL_APP', nomAr: 'تطبيق المساطر والتدابير النظامية', nomFr: 'Application des procédures d\'urgence', poids: 25 },
      { code: 'SITUATION_MGMT', nomAr: 'إدارة مجريات الحادث والتنسيق', nomFr: 'Gestion de crise et coordination', poids: 20 }
    ],
    scenarioContext: {
      contexteGeneralAr: 'على الساعة 16:45، تلقت كوكبة الدراجين التابعة للدرك الملكي إشعاراً عاجلاً بوقوع حادثة سير متسلسلة بين شاحنة صهريج محملة بالوقود وثلاث سيارات خفيفة بالنقطة الكيلومترية PK-84 على الطريق السيار A1 باتجاه طنجة. تسرب جزئي للوقود على المسار السريع، مع ضباب كثيف وتوقف كامل لحركة المرور. بصفتك قائد الدورية الميدانية الأولى، مهمتك تأمين الموقع وحماية الأرواح وإدارة التدخل.',
      lieu: 'الطريق السيار A1 - النقطة الكيلومترية PK-84',
      dateEvenement: '2026-11-02',
      heureConstatation: '16:48'
    },
    stages: [
      {
        stageIndex: 1,
        stageType: 'INTERACTIVE_MAP',
        titreAr: 'المرحلة 1: فحص مسرح الحادث والخريطة التفاعلية',
        consigneAr: 'استعرض الخريطة التفاعلية لمسرح الحادثة، وحدد مواضع الخطر المباشر والضحايا ونقاط التماس مع حركة السير القادمة.',
        mapData: {
          axe: 'Autoroute A1 (Sens Rabat -> Tanger)',
          pk: 'PK 84+200',
          zones: [
            { id: 'ZONE-A', nomAr: 'المنطقة (أ) - الشاحنة الصهريجية', descriptionAr: 'شاحنة صهريج منحرفة تصطدم بالحاجز الوسطي مع تسرب بنزين متطاير على مسافة 40 متراً.', dangerLevel: 'HIGH', icon: 'Flame' },
            { id: 'ZONE-B', nomAr: 'المنطقة (ب) - المركبات الخفيفة المتصادمة', descriptionAr: 'سيارة محاصرة تحت مؤخرة المقطورة وبها راكبان مصابان بجروح متفاوتة، وسيارتان متصادمتان خلفها.', dangerLevel: 'CRITICAL', icon: 'AlertTriangle' },
            { id: 'ZONE-C', nomAr: 'المنطقة (ج) - حركة المرور القادمة من الخلف', descriptionAr: 'شاحنات وسيارات قادمة بسرعة 100 كم/س في ظل ضباب يحجب الرؤية لأقل من 50 متراً دون علم بالحادث.', dangerLevel: 'EXTREME', icon: 'Car' },
            { id: 'ZONE-D', nomAr: 'المنطقة (د) - شريط التوقف الاضطراري والمخرج الجانبي', descriptionAr: 'شريط متاح على بعد 300 متر يمكن استغلاله كمسلك إنقاذ لمركبات الوقاية المدنية.', dangerLevel: 'LOW', icon: 'Shield' }
          ]
        },
        hotspotsAIdentifier: [
          { id: 'HOT-1', titreAr: 'بؤرة خطر الاشتعال السريع', zoneId: 'ZONE-A', correct: true },
          { id: 'HOT-2', titreAr: 'خطر وقوع اصطدام ثانٍ متسلسل من الخلف بفعل الضباب', zoneId: 'ZONE-C', correct: true },
          { id: 'HOT-3', titreAr: 'المصابون المحاصرون المحتاجون للإسعاف الفوري', zoneId: 'ZONE-B', correct: true }
        ]
      },
      {
        stageIndex: 2,
        stageType: 'PRIORITIZATION',
        titreAr: 'المرحلة 2: ترتيب أولويات التدخل الميداني الفوري',
        consigneAr: 'رتب الخطوات الإجرائية التالية وفق مبدأ السلامة المعياري لضباط الدرك الملكي (الحماية أولاً، ثم الإشعار، ثم الإسعاف وتنظيم المرور).',
        itemsToOrder: [
          { id: 'STEP-1', texteAr: 'تثبيت التشوير التحذيري المسبق (Balisage d\'urgence) على بعد 500 متر على الأقل في اتجاه القدوم مع تشغيل الإشارات الضوئية للدورية لتفادي أي اصطدام خلفي كارثي', ordreCorrect: 1 },
          { id: 'STEP-2', texteAr: 'إشعار فوري لمركز القيادة لطلب دعم فرق الوقاية المدنية وشاحنات إطفاء المواد الهيدروكربونية ودورية دراجين إضافية', ordreCorrect: 2 },
          { id: 'STEP-3', texteAr: 'إخلاء محيط الشاحنة الصهريجية من المتفرجين وإيقاف محركات المركبات المحاصرة ومنع إشعال أي لهب أو تدخين', ordreCorrect: 3 },
          { id: 'STEP-4', texteAr: 'تقديم الإسعافات الأولية للمصابين وتسهيل ولوج سيارات الإسعاف عبر المسلك الاضطراري الخالي', ordreCorrect: 4 },
          { id: 'STEP-5', texteAr: 'تحويل حركة السير تدريجياً عبر أقرب محول خروج لتقليص الازدحام على الطريق السيار', ordreCorrect: 5 }
        ]
      },
      {
        stageIndex: 3,
        stageType: 'DECISION_SCENARIO',
        titreAr: 'المرحلة 3: اتخاذ القرارات التكتيكية والإجرائية',
        consigneAr: 'واجه المواقف الحرجة التالية الميدانية باتخاذ القرار القانوني والعملياتي الأنسب.',
        scenarios: [
          {
            id: 'SCEN-R1',
            questionAr: 'أثناء تأمين موقع الحادث، لاحظت وجود سائق سيارة محتج يحاول المرور بالقوة عبر جانب الطريق الملوث بالبنزين المسكوب، متجاهلاً تعليمات الدورية، كيف تتصرف؟',
            optionsAr: [
              'تركه يمر على مسؤوليته الخاصة لتجنب الجدال معه',
              'إيقافه بحزم، منعه فوراً من التقدم صيانة لحياته وحياة الآخرين، وتوجيهه لمسلك الأمان مع اتخاذ الإجراءات الزجرية لعدم الامتثال لأوامر الدرك الملكي',
              'طلب سيارة سحب لنقل سيارته فوراً دون توجيه أي إنذار',
              'الانسحاب من النقطة والتركيز على الضحايا فقط'
            ],
            correctIndex: 1,
            feedbackAr: 'حماية الأرواح وفرض طوق الأمان أمر حتمي لا يقبل التهاون، ورفض الامتثال يشكل مخالفة للمادة 185 من مدونة السير.'
          },
          {
            id: 'SCEN-R2',
            questionAr: 'بخصوص المعاينات المسطرية القانونية لسائقي المركبات بعد إسعاف الضحايا، ما هو التدبير المنهجي الواجب إنجازه؟',
            optionsAr: [
              'إجراء الفحص الكحولي والتأكد من أوراق الشاحنة وسجل زمن القيادة (Chronotachygraphe) ومعاينة حالة الإطارات ونقاط التوقف',
              'الاكتفاء بالتقاط صور بهاتف شخصي ومغادرة المكان',
              'تحميل سائق الشاحنة كامل المسؤولية شفوياً قبل إجراء أي تحقيق فني',
              'الانتظار حتى مرور 24 ساعة للبدء في كتابة المحضر'
            ],
            correctIndex: 0,
            feedbackAr: 'المعاينة الفنية وقراءة جهاز تسجيل السرعة وفحص الأهلية القانونية ركائز أساسية لإثبات المسؤوليات أمام العدالة.'
          }
        ]
      },
      {
        stageIndex: 4,
        stageType: 'REPORT_PREPARATION',
        titreAr: 'المرحلة 4: تحرير برقية الإشعار الأولي بالحادثة',
        consigneAr: 'حرر برقية إشعار فوري (Message Flash) موجهة إلى القيادة العليا وسرية الدرك الملكي تتضمن خلاصة الوضع الميداني، الخسائر، والتدابير المتخذة.',
        rubriqueCriteres: [
          'الدقة في النقطة الكيلومترية والتوقيت',
          'بيان طبيعة المواد الخطرة المنبعثة والضحايا',
          'تحديد الوحدات المتدخلة ووضع حركة السير الحالية',
          'الصيغة الإدارية العسكرية الرصينة'
        ],
        champsAttendus: {
          objet: 'برقية إشعار أولي بحادثة سير بدنية خطيرة مع عرقلة حركة المرور على الطريق السيار A1',
          destinataire: 'إلى السيد قائد سرية الدرك الملكي / القيادة الجهوية',
          motsClesRequis: ['PK 84', 'صهريج', 'الوقاية المدنية', 'تحويل السير', 'إصابات', 'محضر المعاينة']
        }
      }
    ]
  },

  // ============================================================================
  // MODULE 3 : Analyse Numérique et Technologie (محاكاة التحليل الرقمي والتكنولوجي)
  // ============================================================================
  {
    moduleId: 'SIM-TECH',
    code: 'SIM-TECH-03',
    numero: 3,
    titreAr: 'محاكاة التحليل الرقمي والتكنولوجي',
    titreFr: 'Analyse Numérique et Technologie',
    descriptionAr: 'معالجة جريمة سيبرانية واستغلال معطيات رقمية مشبوهة: استعراض جداول وسجلات الخوادم، اكتشاف التلاعب بالعناوين البرمجية والمواقع الجغرافية، تصنيف الأدلة الإلكترونية، وصياغة تقرير الخبرة الفنية.',
    descriptionFr: 'Traitement d\'un incident cyber et exploitation de données massives : analyse de logs serveurs, détection d\'anomalies IP/GPS, classification forensique et rapport d\'expertise technique.',
    subdivision: 'مصلحة المعلوميات ومكافحة الجرائم الإلكترونية (ComCyber)',
    specialiteAssociee: 'SPEC-INFO',
    specialitesSecondaires: ['SPEC-SEC-INFO', 'SPEC-SCIENTIFIQUE'],
    dureeEstimeeMinutes: 30,
    pointsTotal: 100,
    competencesEvaluees: [
      { code: 'DIGITAL_SKILLS', nomAr: 'المهارات الرقمية وتحليل النظم', nomFr: 'Compétences numériques et systèmes', poids: 30 },
      { code: 'DATA_PROCESSING', nomAr: 'معالجة البيانات الضخمة وفلترتها', nomFr: 'Traitement et filtrage de données', poids: 25 },
      { code: 'ACCURACY', nomAr: 'الدقة في رصد الاختلالات', nomFr: 'Rigueur et détection d\'anomalies', poids: 25 },
      { code: 'TECH_SOLVING', nomAr: 'حل المشكلات التقنية الجنائية', nomFr: 'Résolution technique d\'incidents', poids: 20 }
    ],
    scenarioContext: {
      contexteGeneralAr: 'تعرضت خوادم إدارة عمومية حساسة لاختراق إلكتروني أسفر عن تسريب وثائق مؤمنة وتحريف سجلات حركة مركبات وظيفية. بصفتك خبيراً بالخلية التقنية للدرك الملكي، تم تسليمك جدولاً يحتوي على 12 سجلاً مقتطفاً من خادم الولوج وقاعدة تتبع GPS لمركبة مشبوهة. مهمتك هي فحص السجلات، وتحديد عناوين IP المضللة، وعزل البيانات المحرفة، وإعداد تقرير فني رقمي محكم.',
      lieu: 'مختبر التحليل الجنائي الرقمي - مصلحة المعلوميات',
      dateEvenement: '2026-10-25',
      heureConstatation: '10:00'
    },
    stages: [
      {
        stageIndex: 1,
        stageType: 'DATASET_AUDIT',
        titreAr: 'المرحلة 1: تدقيق سجلات الخادم وبيانات التعقب',
        consigneAr: 'تفحص الجدول الرقمي المقتطف من خادم الولوج. ابحث عن الأسطر التي تحتوي على تناقضات جغرافية واختلافات في بصمة التشفير وحالات انتحال الهوية.',
        dataset: [
          { id: 1, timestamp: '2026-10-24 23:12:05', user: 'admin_sys', ip: '192.168.1.10', action: 'LOGIN_SUCCESS', location: 'مقر القيادة', status: 'NORMAL' },
          { id: 2, timestamp: '2026-10-24 23:14:40', user: 'admin_sys', ip: '192.168.1.10', action: 'READ_FILE', location: 'مقر القيادة', status: 'NORMAL' },
          { id: 3, timestamp: '2026-10-24 23:22:18', user: 'admin_sys', ip: '41.249.78.114', action: 'REMOTE_SSH', location: 'الدار البيضاء', status: 'ANOMALY_IP' },
          { id: 4, timestamp: '2026-10-24 23:23:02', user: 'guest_user', ip: '10.0.0.45', action: 'FAILED_PASS_ATTEMPT', location: 'الرباط', status: 'NORMAL' },
          { id: 5, timestamp: '2026-10-24 23:25:50', user: 'admin_sys', ip: '185.220.101.5', action: 'PRIVILEGE_ESCALATION', location: 'Tor Exit Node / خادم أجنبي', status: 'MALICIOUS' },
          { id: 6, timestamp: '2026-10-24 23:28:10', user: 'admin_sys', ip: '185.220.101.5', action: 'EXPORT_DATABASE_DUMP', location: 'خادم أجنبي', status: 'MALICIOUS' },
          { id: 7, timestamp: '2026-10-24 23:35:00', user: 'operator_02', ip: '192.168.1.15', action: 'GPS_LOG_UPDATE', location: 'الرباط', status: 'NORMAL' },
          { id: 8, timestamp: '2026-10-24 23:40:12', user: 'unknown', ip: '185.220.101.5', action: 'ALTER_LOGS_DELETE', location: 'خادم أجنبي', status: 'MALICIOUS' }
        ],
        anomaliesToSelect: [3, 5, 6, 8]
      },
      {
        stageIndex: 2,
        stageType: 'CLASSIFICATION',
        titreAr: 'المرحلة 2: تصنيف الأدلة الرقمية وسلسلة الحيازة',
        consigneAr: 'صنف مصادر الأدلة الرقمية المستخرجة حسب درجة حساسيتها وطرق تحريزها الإلكتروني القانوني.',
        categories: [
          { id: 'VOLATILE', titreAr: 'بيانات رقمية متطايرة (Mémoire RAM / Flux)', couleur: 'rose' },
          { id: 'PERSISTENT', titreAr: 'بيانات رقمية ثابتة (Disque / BDD)', couleur: 'blue' },
          { id: 'PERIPHERAL', titreAr: 'أجهزة ومعدات مادية (Hardware / Supports)', couleur: 'emerald' }
        ],
        elements: [
          { id: 'DELEM-1', texteAr: 'محتويات ذاكرة الوصول العشوائي (RAM) المباشرة قبل إيقاف تشغيل الخادم', catCorrecte: 'VOLATILE' },
          { id: 'DELEM-2', texteAr: 'جدول اتصالات الشبكة النشطة وحزم البيانات الحية (Network Packets)', catCorrecte: 'VOLATILE' },
          { id: 'DELEM-3', texteAr: 'نسخة البصمة المطابقة للقرص الصلب (Image Forensic Bit-à-Bit)', catCorrecte: 'PERSISTENT' },
          { id: 'DELEM-4', texteAr: 'ملفات قواعد البيانات وسجلات التتبع المؤرشفة على وسيط تخزين خارجي', catCorrecte: 'PERSISTENT' },
          { id: 'DELEM-5', texteAr: 'مفتاح USB محجوز بمكتب المشتبه فيه يحتوي على أدوات اختراق', catCorrecte: 'PERIPHERAL' },
          { id: 'DELEM-6', texteAr: 'جهاز الهاتف المحمول للمشتبه فيه وجهاز التوجيه (Router)', catCorrecte: 'PERIPHERAL' }
        ]
      },
      {
        stageIndex: 3,
        stageType: 'DECISION_SCENARIO',
        titreAr: 'المرحلة 3: إجراءات الحفظ الجنائي للبصمة الرقمية',
        consigneAr: 'اختر الإجراءات التقنية السليمة لضمان قبول الدليل الإلكتروني أمام القضاء.',
        scenarios: [
          {
            id: 'SCEN-T1',
            questionAr: 'أثناء استخراج الصورة المطابقة للقرص الصلب المطعون فيه، ما هو المعيار الحاسم لإثبات عدم العبث بمحتوياته؟',
            optionsAr: [
              'تغيير كلمة مرور النظام لتأمين القرص',
              'حساب البصمة الرياضية التشفيرية (Hash SHA-256 / MD5) قبل النسخ وبعده وإدراجها بالمحضر الرسمي مع استعمال مانع الكتابة (Write Blocker)',
              'ضغط الملفات في صيغة RAR مع تشفيرها بكلمة سر شخصية',
              'تعديل تواريخ الملفات لتتطابق مع وقت الضبط القضائي'
            ],
            correctIndex: 1,
            feedbackAr: 'تطابق بصمة الهاش واستخدام مانع الكتابة هما الركن الأساسي لإثبات عدم تعديل أي بايت من الأدلة الجنائية الرقمية.'
          },
          {
            id: 'SCEN-T2',
            questionAr: 'رُصدت محاولة حذف فورية للسجلات قادمة من عنوان خادم الوكيل (Tor)، ما هو الإجراء العاجل الواجب اتخاذه من قبل تقني الدرك الملكي؟',
            optionsAr: [
              'فصل الخادم فوراً عن شبكة الإنترنت وعزله ضمن شبكة مغلقة للحفاظ على الذاكرة السريعة وقطع الاتصال الخارجي دون إطفائه',
              'إطفاء القاطع الكهربائي العام للمركز وسحب القابس بعنف',
              'إعادة تثبيت نظام التشغيل لتنظيف الفيروسات',
              'مراسلة المخترق عبر البريد الإلكتروني لمطالبته بالتوقف'
            ],
            correctIndex: 0,
            feedbackAr: 'العزل الشبكي الفوري يقطع يد المخترق عن محو الآثار، مع صيانة البيانات الحية بالذاكرة (Volatile memory).'
          }
        ]
      },
      {
        stageIndex: 4,
        stageType: 'REPORT_PREPARATION',
        titreAr: 'المرحلة 4: تحرير تقرير الخبرة الرقمية الجنائية',
        consigneAr: 'حرر خلاصة تقنية محكمة تتضمن مسار الهجوم، مصدر عنوان IP الأجنبي، البيانات المصدرة، والتوصيات التقنية اللازمة لحماية المنظومة.',
        rubriqueCriteres: [
          'استخدام المصطلحات التقنية الدقيقة',
          'توثيق بصمات التجزئة وعناوين الاتصال',
          'بيان وسيلة الاختراق وحجم الضرر الحاصل',
          'توصيات أمنية عملية لمنع تكرار الثغرة'
        ],
        champsAttendus: {
          objet: 'تقرير خبرة تقنية جنائية في شأن واقعة اختراق معلوماتي وتصريف بيانات',
          destinataire: 'إلى السيد قائد المركز القضائي / فرقة مكافحة الجريمة السيبرانية',
          motsClesRequis: ['SHA-256', 'Tor Node', 'تصريف البيانات', 'عزل الخادم', 'سجلات الولوج', 'الحفظ الجنائي']
        }
      }
    ]
  },

  // ============================================================================
  // MODULE 4 : Planification et Organisation Opérationnelle (محاكاة التخطيط والتنظيم العملياتي)
  // ============================================================================
  {
    moduleId: 'SIM-PLAN',
    code: 'SIM-PLAN-04',
    numero: 4,
    titreAr: 'محاكاة التخطيط والتنظيم العملياتي',
    titreFr: 'Planification et Organisation Opérationnelle',
    descriptionAr: 'وضع وتنفيذ خطة أمنية شاملة لتأمين موسم ثقافي وجماهيري كبرى وحماية الشخصيات والزوار: توزيع القوى البشرية، إدارة نقاط المراقبة، جدولة التدخلات، ومواجهة الطوارئ.',
    descriptionFr: 'Conception d\'un ordre d\'opérations pour un grand rassemblement public : répartition des effectifs, sectorisation, chaîne de commandement et gestion des contingences.',
    subdivision: 'سرايا التدخل السريع ومصالح العمليات (États-Majors & GSI)',
    specialiteAssociee: 'SPEC-GM',
    specialitesSecondaires: ['SPEC-GSI', 'SPEC-GEH'],
    dureeEstimeeMinutes: 30,
    pointsTotal: 100,
    competencesEvaluees: [
      { code: 'PLANNING', nomAr: 'التخطيط الاستراتيجي وتقدير الاحتياجات', nomFr: 'Planification stratégique', poids: 30 },
      { code: 'ORGANIZATION', nomAr: 'التنظيم وتوزيع الموارد البشرية', nomFr: 'Organisation et affectation des moyens', poids: 25 },
      { code: 'COORDINATION', nomAr: 'التنسيق والقيادة العملياتية', nomFr: 'Coordination et chaîne d\'alerte', poids: 25 },
      { code: 'RESOURCE_MGMT', nomAr: 'التصرف الرشيد في الاحتياط العملياتي', nomFr: 'Gestion des réserves opérationnelles', poids: 20 }
    ],
    scenarioContext: {
      contexteGeneralAr: 'تستعد دائرة نفوذ سرية الدرك الملكي لاحتضان مهرجان سنوي يضم 45.000 زائر يومياً ويحضره وفود رسمية وسياح، ويمتد على 3 قواطع جغرافية رئيسية. لديك قوة متكونة من 80 عنصراً من مختلف الوحدات (فرق دراجين، سرايا متنقلة، فرق سينوتقنية بالكلاب البوليسية، عناصر بزي مدني، وفرقة تدخل سريع). بصفتك ضابط العمليات، عليك وضع مخطط الانتشار، وسد الثغرات، وإدارة الطوارئ العملياتية.',
      lieu: 'المنطقة الساحلية والسهلية - فضاء الاحتفالات الكبرى',
      dateEvenement: '2026-11-10',
      heureConstatation: '08:00'
    },
    stages: [
      {
        stageIndex: 1,
        stageType: 'CLASSIFICATION',
        titreAr: 'المرحلة 1: توزيع الموارد على القواطع العملياتية',
        consigneAr: 'وزع الوحدات المتوفرة على القواطع الثلاثة بحسب طبيعة المخاطر والمهام المحددة.',
        categories: [
          { id: 'SEC_VIP', titreAr: 'القاطع 1: المنصة الرسمية ومسار الشخصيات', couleur: 'gold' },
          { id: 'SEC_PUBLIC', titreAr: 'القاطع 2: الفضاء الجماهيري والمدرجات والمداخل', couleur: 'blue' },
          { id: 'SEC_FLUX', titreAr: 'القاطع 3: محاور الطرق والمواقف والمدارات الخارجية', couleur: 'emerald' }
        ],
        elements: [
          { id: 'RES-1', texteAr: 'فريق الحماية المقربة وتأمين المنصة الرسمية مع أجهزة كشف المعادن', catCorrecte: 'SEC_VIP' },
          { id: 'RES-2', texteAr: 'دورية الدرك الملكي للدراجين لمواكبة الموكب الرسمي وتأمين المسلك البروتوكولي', catCorrecte: 'SEC_VIP' },
          { id: 'RES-3', texteAr: 'فصيلة التدخل التابعة للدرك المتنقل لضبط الجموع وحفظ النظام بالمدرجات', catCorrecte: 'SEC_PUBLIC' },
          { id: 'RES-4', texteAr: 'الفريق السينوتقني للكلاب المدربة على كشف المتفجرات وتمشيط المداخل الجماهيرية', catCorrecte: 'SEC_PUBLIC' },
          { id: 'RES-5', texteAr: 'سد قضائي مروري ثابت لتنظيم تدفق السيارات وتفتيش المركبات المشبوهة بالمدخل الجنوبي', catCorrecte: 'SEC_FLUX' },
          { id: 'RES-6', texteAr: 'دوريات دراجين متحركة لتسهيل حركة السير ومنع التوقف العشوائي بجانب الطريق السريع', catCorrecte: 'SEC_FLUX' }
        ]
      },
      {
        stageIndex: 2,
        stageType: 'PRIORITIZATION',
        titreAr: 'المرحلة 2: الجدولة الزمنية لمراحل المخطط الأمني',
        consigneAr: 'رتب المراحل العملياتية لتأمين التظاهرة حسب التدرج الزمني العسكري الصارم.',
        itemsToOrder: [
          { id: 'PHASE-1', texteAr: 'مرحلة التمشيط الوقائي وتطهير الفضاءات والمستودعات بواسطة الفرق السينوتقنية قبل فتح الأبواب بـ 4 ساعات', ordreCorrect: 1 },
          { id: 'PHASE-2', texteAr: 'تثبيت السدود القضائية على مداخل المدينة ونشر دوريات الدراجين لفرز وتوجيه الحافلات والسيارات', ordreCorrect: 2 },
          { id: 'PHASE-3', texteAr: 'فتح بوابات التفتيش الجماهيري ومباشرة التدقيق الإلكتروني في الحقائب والممتلكات الشخصية', ordreCorrect: 3 },
          { id: 'PHASE-4', texteAr: 'تأمين وصول الموكب الرسمي وتثبيت طوق الحماية الدائري حول المنصة الشرفية', ordreCorrect: 4 },
          { id: 'PHASE-5', texteAr: 'إدارة مرحلة انصراف الجمهور وتفويج المركبات لمنع حوادث التدافع والاختناقات المرورية', ordreCorrect: 5 }
        ]
      },
      {
        stageIndex: 3,
        stageType: 'DECISION_SCENARIO',
        titreAr: 'المرحلة 3: إدارة طارئ عملياتي مفاجئ',
        consigneAr: 'خلال ذروة الفعالية، ورد إشعار برصد طائرة مسيرة (Drone) مجهولة تحلق بارتفاع منخفض فوق منطقة الشخصيات دون ترخيص مسبق. اتخذ القرار الفوري.',
        scenarios: [
          {
            id: 'SCEN-P1',
            questionAr: 'ما هو التدبير القيادي الميداني الفوري لمواجهة تحليق الطائرة المسيرة غير المصرح بها؟',
            optionsAr: [
              'إطلاق النار العشوائي بالأسلحة الفردية نحو السماء وسط الحشود',
              'تفعيل بروتوكول التشويش الإلكتروني المضاد للمسيرات فوراً، وتكليف دورية بالزي المدني بتعقب إشارة مشغل الطائرة في المحيط مع حماية الشخصيات',
              'تجاهل الطائرة ومواصلة متابعة الحفل كالمعتاد',
              'إعلان إخلاء فوري شامل لـ 45.000 شخص مما قد يتسبب في تدافع كارثي'
            ],
            correctIndex: 1,
            feedbackAr: 'استعمال معدات التشويش الموجه وتحديد مكان المشغل هو الإجراء الاحترافي المتناسق الذي يمنع الهلع ويحمي الحشود.'
          }
        ]
      },
      {
        stageIndex: 4,
        stageType: 'REPORT_PREPARATION',
        titreAr: 'المرحلة 4: صياغة أمر العمليات (Ordre d\'Opérations)',
        consigneAr: 'أعد المسودة التنفيذية لأمر العمليات الموجه لكافة قادة التشكيلات المشاركة يحدد التموقع، المهام، وشبكة الاتصال اللاسلكي.',
        rubriqueCriteres: [
          'وضوح توزيع القواطع والمسؤوليات القيادية',
          'تحديد قنوات الراديو ونداءات الاتصال المعتمدة',
          'تحديد تدابير الاحتياط والتدخل السريع',
          'الصياغة العسكرية الدقيقة والواضحة'
        ],
        champsAttendus: {
          objet: 'أمر عمليات رقم 28/ع.م متعلق بالترتيبات الأمنية لتأمين فعاليات الموسم السنوي',
          destinataire: 'إلى كافة قادة الفصائل والوحدات المعنية بالانتشار الميداني',
          motsClesRequis: ['القاطع', 'الاحتياط', 'شبكة الراديو', 'التمشيط السينوتقني', 'قائد التشكيل', 'الانصراف']
        }
      }
    ]
  },

  // ============================================================================
  // MODULE 5 : Surveillance Environnementale (محاكاة المراقبة البيئية والمجالات الطبيعية)
  // ============================================================================
  {
    moduleId: 'SIM-ENV',
    code: 'SIM-ENV-05',
    numero: 5,
    titreAr: 'محاكاة المراقبة البيئية والمجالات الطبيعية',
    titreFr: 'Surveillance Environnementale et Domaines Naturels',
    descriptionAr: 'حماية الموارد الطبيعية والمجالات المحمية (الغابات، السواحل، الفرشات المائية): تفقد خارطة المحمية، اكتشاف المخالفات البيئية، تصنيف التعديات غير المشروعة، وتفعيل المساطر الزجرية.',
    descriptionFr: 'Protection des écosystèmes et surveillance des infractions environnementales : lecture spatiale, détection de braconnage et déversements, classification et PV d\'infraction.',
    subdivision: 'سرايا ودرك البيئة والمجالات المحمية (Police de l\'Environnement)',
    specialiteAssociee: 'SPEC-TECH',
    specialitesSecondaires: ['SPEC-ROUTE', 'SPEC-PJ'],
    dureeEstimeeMinutes: 30,
    pointsTotal: 100,
    competencesEvaluees: [
      { code: 'FIELD_OBS', nomAr: 'الملاحظة الميدانية والرصد البيئي', nomFr: 'Observation de terrain', poids: 30 },
      { code: 'ENV_AWARENESS', nomAr: 'الوعي بالقوانين والضوابط البيئية', nomFr: 'Sensibilisation et législation environnementale', poids: 25 },
      { code: 'CLASSIFICATION', nomAr: 'تصنيف الانتهاكات والأضرار الإيكولوجية', nomFr: 'Classification des délits écologiques', poids: 25 },
      { code: 'REPORT_PREPARATION', nomAr: 'تحرير محاضر المعاينة البيئية', nomFr: 'Rédaction du procès-verbal d\'infraction', poids: 20 }
    ],
    scenarioContext: {
      contexteGeneralAr: 'تغطي دائرة نفوذ مركز الدرك الملكي شريطاً ساحلياً محمياً وغابة كثيفة من أشجار الأرز والعرعار مهددة بالقطع الجائر ومقالع الرمال السرية. وردت معلومات حول نشاط مشبوه لمركبات ثقيلة ليلاً وشبهات تفريغ نفايات سائلة سامة في مجرى وادٍ يصب في سد مائي للشرب. بصفتك رئيس دورية حماية البيئة بالدرك الملكي، عليك قيادة عملية التمشيط والمعاينة القانونية وحجز الآليات المخالفة.',
      lieu: 'الحظيرة الوطنية والمحمية الساحلية والغابوية',
      dateEvenement: '2026-10-29',
      heureConstatation: '06:00'
    },
    stages: [
      {
        stageIndex: 1,
        stageType: 'INTERACTIVE_MAP',
        titreAr: 'المرحلة 1: استكشاف الخارطة الطبيعية للمحمية ورصد النقاط الحساسة',
        consigneAr: 'افحص الخريطة الطبوغرافية للمجال المحمي وحدد المواقع التي تظهر فيها آثار انتهاكات للقوانين البيئية.',
        mapData: {
          axe: 'المحمية الطبيعية والغابوية الوطنية',
          pk: 'القطاع الشمالي والساحلي',
          zones: [
            { id: 'ENV-Z1', nomAr: 'المنطقة الغابوية المرتفعة (أرز)', descriptionAr: 'رصد بقايا جذوع أشجار مقطوعة حديثاً ومسارات جر خشب غير مرخص.', dangerLevel: 'HIGH', icon: 'TreePine' },
            { id: 'ENV-Z2', nomAr: 'الشاطئ الرملي المحمي (الكثبان)', descriptionAr: 'آثار شاحنات نهب الرمال الشاطئية ليلاً وتجريف الحزام الواقي من التآكل البحري.', dangerLevel: 'CRITICAL', icon: 'Waves' },
            { id: 'ENV-Z3', nomAr: 'مصب الوادي والفرشة المائية', descriptionAr: 'تغير ملحوظ في لون المياه مع انبعاث روائح كيميائية وموت أسماك سطحية.', dangerLevel: 'EXTREME', icon: 'AlertTriangle' },
            { id: 'ENV-Z4', nomAr: 'برج المراقبة ونقطة المراقبة الثابتة', descriptionAr: 'موقع إشراف يمكن استغلاله لرصد المسالك الطرقية المؤدية للمحمية.', dangerLevel: 'LOW', icon: 'Shield' }
          ]
        },
        hotspotsAIdentifier: [
          { id: 'ENV-HOT-1', titreAr: 'تلوث كيميائي يهدد سلامة السد والفرشة المائية', zoneId: 'ENV-Z3', correct: true },
          { id: 'ENV-HOT-2', titreAr: 'نهب رمال الشاطئ الرملي المحمي', zoneId: 'ENV-Z2', correct: true },
          { id: 'ENV-HOT-3', titreAr: 'قطع جائر لأشجار نادرة ومحمية بالقانون', zoneId: 'ENV-Z1', correct: true }
        ]
      },
      {
        stageIndex: 2,
        stageType: 'CLASSIFICATION',
        titreAr: 'المرحلة 2: تصنيف الجرائم والمخالفات البيئية',
        consigneAr: 'صنف الوقائع المرصودة بحسب المرجع القانوني الخاص المنظم لها (قانون الماء، قانون الغابات، قانون حماية الساحل ومقالع الرمال).',
        categories: [
          { id: 'LEG_WATER', titreAr: 'مخالفات قانون الماء وحماية الموارد المائية (Loi 36-15)', couleur: 'blue' },
          { id: 'LEG_FOREST', titreAr: 'مخالفات التشريع الغابوي ومكافحة التصحر (Loi Forestière)', couleur: 'emerald' },
          { id: 'LEG_COAST', titreAr: 'مخالفات قانون الساحل ونهب المقالع (Loi 81-12 & 27-13)', couleur: 'amber' }
        ],
        elements: [
          { id: 'E-ITEM-1', texteAr: 'تصريف نفايات صناعية سائلة ملوثة بوادٍ يصب في سد مائي بدون ترخيص', catCorrecte: 'LEG_WATER' },
          { id: 'E-ITEM-2', texteAr: 'حفر بئر ارتوازي عميق في منطقة ذات حرج مائي دون التوفر على رخصة وكالة الحوض المائي', catCorrecte: 'LEG_WATER' },
          { id: 'E-ITEM-3', texteAr: 'قطع ونقل أشجار الأرز المهددة بالانقراض ليلاً بواسطة مناشير آلية', catCorrecte: 'LEG_FOREST' },
          { id: 'E-ITEM-4', texteAr: 'الرعي الجائر داخل مشتل غابوي في طور التجديد الطبيعي وممنوع الرعي فيه بقرار وزاري', catCorrecte: 'LEG_FOREST' },
          { id: 'E-ITEM-5', texteAr: 'استخراج شحنات رمال من الكثبان الساحلية بدون وصل أداء ومقترن بتدمير الواجهة البحرية', catCorrecte: 'LEG_COAST' },
          { id: 'E-ITEM-6', texteAr: 'تشييد بنايات إسمنتية غير مرخصة فوق الملك العمومي البحري بالشريط الساحلي المحمي', catCorrecte: 'LEG_COAST' }
        ]
      },
      {
        stageIndex: 3,
        stageType: 'DECISION_SCENARIO',
        titreAr: 'المرحلة 3: الإجراءات الزجرية وأخذ العينات',
        consigneAr: 'عند ضبط شاحنة صهريجية تفرغ مواد سوداء في الوادي، ما هي الإجراءات القانونية والمخبرية الفورية؟',
        scenarios: [
          {
            id: 'SCEN-E1',
            questionAr: 'كيف يتعامل ضابط الدرك الملكي مع شحنة التلوث المتلبس بها ومع سائق الشاحنة الصهريجية؟',
            optionsAr: [
              'مطالبة السائق بمغادرة المكان فوراً مع الاكتفاء بتوجيه إنذار شفوي',
              'توقيف الآلية وحجز الشاحنة بمحجز الدرك الملكي، أخذ 3 عينات متطابقة ومختومة من السائل الملوث بحضور ممثل شرطة المياه والبيئة لإرسالها لمختبر التحاليل، ووضع السائق رهن الحراسة النظرية بعد استشارة النيابة العامة',
              'سكب مياه نظيفة في الوادي لتخفيف التلوث قبل كتابة المحضر',
              'بيع الشحنة في المزاد العلني فوراً'
            ],
            correctIndex: 1,
            feedbackAr: 'حجز الآلية وأخذ عينات محرزة قانوناً تحت إشراف النيابة العامة هو الإجراء الصارم الذي يثبت الركن المادي للجريمة البيئية.'
          }
        ]
      },
      {
        stageIndex: 4,
        stageType: 'REPORT_PREPARATION',
        titreAr: 'المرحلة 4: تحرير محضر معاينة وحجز لمخالفة بيئية',
        consigneAr: 'حرر مسودة محضر معاينة وحجز ضد مرتكبي الجريمة البيئية متضمناً مواصفات المركبة المحجوزة والتدابير المنجزة لصالح النيابة العامة.',
        rubriqueCriteres: [
          'الإسناد للمقتضيات القانونية البيئية ذات الصلة',
          'وصف الآثار المادية والعينات المأخوذة بكل دقة',
          'حجز الآليات وأمر إيداعها بالمستودع البلدي',
          'صياغة متقنة ومطابقة لمساطر الدرك الملكي'
        ],
        champsAttendus: {
          objet: 'محضر معاينة وحجز في شأن تلويث مجرى مائي عمومي وتهديد السلامة الصحية',
          destinataire: 'إلى السيد وكيل الملك لدى المحكمة الابتدائية المختصة',
          motsClesRequis: ['قانون الماء', 'حجز المركبة', 'عينات مختومة', 'الحراسة النظرية', 'شرطة البيئة', 'معاينة مادية']
        }
      }
    ]
  },

  // ============================================================================
  // MODULE 6 : Gestion Administrative et Juridique (محاكاة التسيير الإداري والقانوني)
  // ============================================================================
  {
    moduleId: 'SIM-ADMIN',
    code: 'SIM-ADMIN-06',
    numero: 6,
    titreAr: 'محاكاة التسيير الإداري والقانوني',
    titreFr: 'Gestion Administrative et Juridique',
    descriptionAr: 'إدارة مكتب الضبط والوثائق الإدارية لسرية الدرك الملكي: فحص الملفات والمراسلات الواردة، تدقيق الوثائق الناقصة، ترتيب الأولويات حسب الآجال القانونية، وإعداد جدول الإرسال التركيبي.',
    descriptionFr: 'Gestion du bureau d\'ordre et secrétariat de commandement : instruction de dossiers, détection de pièces manquantes, priorisation réglementaire et bordereaux d\'envoi.',
    subdivision: 'مكاتب السكرتارية والضبط وإدارة الأفراد (Secrétariat & RH)',
    specialiteAssociee: 'SPEC-SEC-ADMIN',
    specialitesSecondaires: ['SPEC-SEC-INFO', 'SPEC-PJ'],
    dureeEstimeeMinutes: 30,
    pointsTotal: 100,
    competencesEvaluees: [
      { code: 'ADMIN_ORG', nomAr: 'التنظيم الإداري وتصنيف المراسلات', nomFr: 'Organisation administrative', poids: 30 },
      { code: 'ACCURACY', nomAr: 'الدقة في تدقيق الوثائق والشكليات', nomFr: 'Rigueur et vérification documentaire', poids: 25 },
      { code: 'PROCEDURAL_UND', nomAr: 'استيعاب الآجال والضوابط القانونية', nomFr: 'Maîtrise des délais et procédures', poids: 25 },
      { code: 'DOC_MGMT', nomAr: 'تحرير المذكرات وجداول الإرسال', nomFr: 'Rédaction et gestion des archives', poids: 20 }
    ],
    scenarioContext: {
      contexteGeneralAr: 'التحقت بمكتب الضبط والسكرتارية الإدارية بسرية الدرك الملكي. وصل إلى مكتبك البريد اليومي المتضمن 5 ملفات متنوعة تشمل إنابة قضائية دولية عاجلة، طلب رخصة حمل سلاح قنص، شكاية اعتداء موجهة من النيابة العامة، طلب إجازة إدارية لمستخدم عسكري، ومراسلة تنسيقية من عمالة الإقليم. مهمتك تدقيق اكتمال الوثائق، استخراج الأوراق الناقصة، ترتيب الملفات حسب درجة الاستعجال، وإعداد المذكرات الإدارية المعتمدة.',
      lieu: 'مكتب الضبط والأمانة العامة - سرية الدرك الملكي',
      dateEvenement: '2026-11-03',
      heureConstatation: '08:30'
    },
    stages: [
      {
        stageIndex: 1,
        stageType: 'DATASET_AUDIT',
        titreAr: 'المرحلة 1: تدقيق اكتمال وثائق الملفات الإدارية',
        consigneAr: 'افحص بطاقات الملفات الواردة وحدد الأوراق الجوهرية الناقصة التي تمنع إحالة الملف للمصادقة.',
        dataset: [
          {
            id: 'FILE-1',
            typeAr: 'طلب رخصة حمل سلاح قنص (السيد رشيد.م)',
            piecesFourniesAr: 'طلب خطي، نسخة البطاقة الوطنية، 4 صور، السجل العدلي خالي من السوابق، شهادة الإقامة',
            pieceManquanteAr: 'شهادة الفحص الطبي البدني والعقلي المسلمة من طبيب محلف',
            estComplet: false
          },
          {
            id: 'FILE-2',
            typeAr: 'إنابة قضائية مستعجلة من قاضي التحقيق في قضية تزوير أوراق بنكية',
            piecesFourniesAr: 'أصل الإنابة القضائية، توقيع قاضي التحقيق، خاتم المحكمة، تحديد هوية المطلوب الاستماع إليهم بدقة',
            pieceManquanteAr: 'لا يوجد - الملف مستوفٍ لكافة الشكليات المسطرية',
            estComplet: true
          },
          {
            id: 'FILE-3',
            typeAr: 'ملف حادثة سير بدنية أحيلت من المركز الترابي للإرسال إلى المحكمة',
            piecesFourniesAr: 'محضر المعاينة، تصريحات السائقين، شهادة طبية مؤقتة للضحية تثبت 20 يوماً من العجز',
            pieceManquanteAr: 'محضر القياس الكحولي وشهادة التأمين الأصلية للمركبة المتسببة',
            estComplet: false
          },
          {
            id: 'FILE-4',
            typeAr: 'طلب ترخيص لتنظيم سباق دراجات هوائية عبر تراب الإقليم',
            piecesFourniesAr: 'طلب الجمعية المنظمة، مسار السباق المفصل، شهادة التأمين الخاصة بالفعالية',
            pieceManquanteAr: 'موافقة المصالح الإقليمية لوزارة التجهيز والماء والوقاية المدنية',
            estComplet: false
          }
        ],
        anomaliesToSelect: ['FILE-1', 'FILE-3', 'FILE-4']
      },
      {
        stageIndex: 2,
        stageType: 'PRIORITIZATION',
        titreAr: 'المرحلة 2: ترتيب الملفات والمراسلات حسب الأولوية والآجال',
        consigneAr: 'رتب الملفات التالية حسب درجة الاستعجال الإداري والأثر القانوني الملزم وفق تقاليد التسيير بالدرك الملكي.',
        itemsToOrder: [
          { id: 'PRIO-1', texteAr: 'إنابة قضائية صادرة عن قاضي التحقيق محددة الأجل بـ 48 ساعة لسماع شاهد رئيسي في جناية أموال', ordreCorrect: 1 },
          { id: 'PRIO-2', texteAr: 'تعليمات النيابة العامة العاجلة لإجراء بحث فوري في شكاية إيذاء عمدي مع حالة فرار', ordreCorrect: 2 },
          { id: 'PRIO-3', texteAr: 'برقية القيادة الجهوية لطلب حصر لوائح المستفيدين من الترقية قبل نهاية الأسبوع', ordreCorrect: 3 },
          { id: 'PRIO-4', texteAr: 'مراسلة عمالة الإقليم بخصوص التحضير لاجتماع اللجنة الإقليمية للأمن لشهر دجنبر', ordreCorrect: 4 },
          { id: 'PRIO-5', texteAr: 'طلب رخصة صيد اعتيادية محال للدراسة وإبداء الرأي في أجل شهر', ordreCorrect: 5 }
        ]
      },
      {
        stageIndex: 3,
        stageType: 'DECISION_SCENARIO',
        titreAr: 'المرحلة 3: التوجيه الإداري والسرية المهنية',
        consigneAr: 'واجه المواقف التالية المتعلقة بالسرية المهنية وأخلاقيات المرفق العسكري.',
        scenarios: [
          {
            id: 'SCEN-A1',
            questionAr: 'تقدم مواطن إلى مكتب الضبط طالباً نسخة من تقرير سري يخص جاراً له موضوع بحث تمهيدي، بدعوى أنه طرف متضرر، كيف تتصرف؟',
            optionsAr: [
              'تسليمه نسخة من التقرير فوراً لكسب ثقته وتسهيل عمله',
              'رفض طلبه بحزم لكون محاضر البحث مشمولة بالسرية المهنية المطلقة وسرية البحث الجنائي (المادة 15 من ق.م.ج)، وتوجيهه إلى النيابة العامة صاحبة الاختصاص الحصري',
              'تمكينه من الاطلاع على المحضر بالعين المجردة دون تصويره',
              'مطالبته بمبلغ مالي مقابل استخراج الوثيقة'
            ],
            correctIndex: 1,
            feedbackAr: 'حفظ سرية التحريات والملفات الإدارية العسكرية التزام قانوني وأخلاقي صارم يعاقب القانون الجنائي على مخالفته.'
          }
        ]
      },
      {
        stageIndex: 4,
        stageType: 'REPORT_PREPARATION',
        titreAr: 'المرحلة 4: إعداد جدول إرسال ومذكرة إحالة إدارية',
        consigneAr: 'حرر جدول إرسال رسمي (Bordereau d\'envoi) موجه للسيد وكيل الملك لإحالة محاضر قضائية مستوفية مع تضمين الملاحظات والمرفقات.',
        rubriqueCriteres: [
          'احترام شكليات جدول الإرسال العسكري الرسمي',
          'دقة جرد المرفقات والمحاضر وعدد الصفحات',
          'التوجيه السليم للمصلحة المستقبلة',
          'الصيغة العسكرية الرصينة والمنضبطة'
        ],
        champsAttendus: {
          objet: 'جدول إرسال يتعلق بإحالة مسطرة قضائية تلبسية في شأن تزوير وثائق',
          destinataire: 'إلى السيد وكيل الملك لدى المحكمة الابتدائية بالرباط',
          motsClesRequis: ['جدول إرسال', 'محضر المعاينة', 'عدد النظائر', 'المرفقات', 'المصلحة الإدارية', 'السرية']
        }
      }
    ]
  }
];
