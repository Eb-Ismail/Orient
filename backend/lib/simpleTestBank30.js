// ==============================================================================
// ORIENT-GR — بنك الاختبارات المهنية الثلاثة المبسطة (30 سؤالاً)
// 3 Simple Professional Tests for Vocational Orientation (10 Questions each)
// ==============================================================================

/**
 * تعريف الاختبارات المهنية الثلاثة الرسمية
 */
export const simpleThreeTests = [
  {
    TestId: 2,
    Code: 'TEST-01',
    Titre: 'التحليل المهني',
    TitreFr: 'Analyse Professionnelle',
    Description: 'قراءة وتحليل الوثائق والمحاضر المهنية، مقارنة الإفادات واستخراج التناقضات وتصنيف الأدلة الجنائية وفهم القضايا.',
    DureeMinutes: 15,
    NombreQuestions: 10,
    CategoriesIncluses: ['PJ_ENQUETE', 'DOC_ANALYSIS', 'ACCURACY'],
    DifficulteCible: 'MOYEN',
    AutoriserRetour: true,
    AutoriserPause: true,
    AutoriserReprise: true,
    NombreTentativesMax: 3,
    SeuilReussite: 60.0,
    SelectionAleatoire: false,
    CompetencesAssociees: ['Judicial analysis', 'Scientific investigation', 'Accuracy', 'Documentation'],
    EstActif: true,
    CreatedAt: '2026-01-01T08:00:00.000Z'
  },
  {
    TestId: 3,
    Code: 'TEST-02',
    Titre: 'التدبير الميداني',
    TitreFr: 'Gestion de Terrain & Sécurité Routière',
    Description: 'تحليل الوضعيات المرورية وحوادث السير، تنظيم مسرح التدخل الميداني، تحديد الأولويات وتطبيق المساطر النظامية.',
    DureeMinutes: 15,
    NombreQuestions: 10,
    CategoriesIncluses: ['ROUTE_MOTO', 'FIELD_ORG', 'DECISION'],
    DifficulteCible: 'MOYEN',
    AutoriserRetour: true,
    AutoriserPause: true,
    AutoriserReprise: true,
    NombreTentativesMax: 3,
    SeuilReussite: 60.0,
    SelectionAleatoire: false,
    CompetencesAssociees: ['Field management', 'Road safety', 'Procedural awareness', 'Organization'],
    EstActif: true,
    CreatedAt: '2026-01-01T08:00:00.000Z'
  },
  {
    TestId: 4,
    Code: 'TEST-03',
    Titre: 'الكفاءات التقنية والتنظيمية',
    TitreFr: 'Compétences Techniques & Organisationnelles',
    Description: 'قراءة وتفسير الجداول والبيانات، تنظيم السجلات والملفات الإدارية، كشف البيانات الناقصة وتوزيع المهام والموارد.',
    DureeMinutes: 15,
    NombreQuestions: 10,
    CategoriesIncluses: ['INFORMATIQUE', 'SECRETARIAT', 'PLANNING'],
    DifficulteCible: 'MOYEN',
    AutoriserRetour: true,
    AutoriserPause: true,
    AutoriserReprise: true,
    NombreTentativesMax: 3,
    SeuilReussite: 60.0,
    SelectionAleatoire: false,
    CompetencesAssociees: ['Digital skills', 'Administrative management', 'Technical analysis', 'Planning and organization'],
    EstActif: true,
    CreatedAt: '2026-01-01T08:00:00.000Z'
  }
];

/**
 * بنك الأسئلة المهنية الثلاثين الموزعة بالتساوي (10 لكل اختبار)
 */
export const simpleQuestionsBank30 = [
  // ============================================================================
  // TEST 1 — التحليل المهني (10 أسئلة: 101 -> 110)
  // ============================================================================
  {
    QuestionId: 1001,
    TestId: 2,
    OrdreAffichage: 1,
    Code: 'TEST1-Q01',
    DomaineCode: 'PJ_ENQUETE',
    DomaineIntitule: 'التحقيق والبحث القضائي',
    CompetencesAssociees: ['Judicial analysis', 'Documentation'],
    ContexteSituationnel: 'بناءً على محضر معاينة لسرقة موصوفة: صرح الحارس الليلي أنه سمع كسر الزجاج عند الساعة 02:15 صباحاً ورأى شخصاً يفر مرتدياً سترة زرقاء، بينما أظهرت كاميرا المراقبة المقابلة شخصاً يرتدي سترة داكنة يدخل المبنى في تمام 02:35 ويغادره عند 02:50.',
    Enonce: 'ما هو التناقض الزمني والوقائعي الأساسي الذي يجب على المحقق تسجيله والتحري بشأنه أولاً؟',
    Options: [
      {
        OptionId: 10011,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'اختلاف توقيت المعاينة بين إفادة الحارس (02:15) ووقت الدخول المسجل بكاميرا المراقبة (02:35).',
        EstCorrecte: true,
        Explication: 'المقارنة المنهجية للأوقات تكشف فارقاً زمنياً مقداره 20 دقيقة بين سماع الكسر ودخول المشتبه به المسجل بالفيديو.'
      },
      {
        OptionId: 10012,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'عدم كفاية إضاءة الشارع التي منعت الحارس من قراءة لوحة سيارة المشتبه فيه.',
        EstCorrecte: false,
        Explication: 'لم تتضمن المعطيات أي ذكر لسيارة أو إضاءة شارع.'
      },
      {
        OptionId: 10013,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'إلغاء شهادة الحارس بالكامل فوراً واعتباره شريكاً مباشراً في عملية السرقة دون إثبات.',
        EstCorrecte: false,
        Explication: 'الإلغاء الفوري دون إجراء مواجهة أو تدقيق يعد إخلالاً بضوابط التحقيق المنهجي.'
      },
      {
        OptionId: 10014,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'مطابقة مواصفات ملابس المشتبه فيه تماماً في كلا المصدرين دون أدنى تفاوت.',
        EstCorrecte: false,
        Explication: 'هناك تفاوت واضح بين سترة زرقاء وسترة داكنة، بالإضافة للفارق الزمني.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 1002,
    TestId: 2,
    OrdreAffichage: 2,
    Code: 'TEST1-Q02',
    DomaineCode: 'PJ_ENQUETE',
    DomaineIntitule: 'التحقيق والبحث القضائي',
    CompetencesAssociees: ['Judicial analysis', 'Accuracy'],
    ContexteSituationnel: 'يتضمن ملف قضية وثيقتين: وثيقة (أ) محضر استماع لشاهد يؤكد وجود سيارة حمراء في مكان الحادث، ووثيقة (ب) تقرير تقني لحادثة سير يثبت أن الآثار الدهنية على الحاجز المعدني تعود لطلاء سيارة رمادية معدنية بنسبة تطابق 99%.',
    Enonce: 'كيف يتعامل المحقق مع هذا التعارض وفقاً لقواعد الإثبات الجنائي المنهجي؟',
    Options: [
      {
        OptionId: 10021,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'ترجيح الدليل العلمي المخبري الدقيق وإعادة الاستماع للشاهد لتحديد زاوية رؤيته وظروف الإضاءة.',
        EstCorrecte: true,
        Explication: 'الدليل العلمي المادي يوفر يقيناً أعلى، ويتطلب استجلاء سبب التناقض لدى الشاهد بمهنية دون إهمال أي منهما.'
      },
      {
        OptionId: 10022,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'تعديل التقرير المخبري ليتوافق قسراً مع أقوال الشاهد لتفادي أي ارتباك في الملف.',
        EstCorrecte: false,
        Explication: 'تغيير النتائج المخبرية محظور ويشكل تزويراً للحقائق.'
      },
      {
        OptionId: 10023,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'إغلاق الملف فورا وإحالة القضية إلى الحفظ بحجة تضارب البيانات.',
        EstCorrecte: false,
        Explication: 'التضارب يقتضي تعميق البحث والتحري لا إغلاق القضية.'
      },
      {
        OptionId: 10024,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'إتلاف تقرير المختبر التقني والاكتفاء بشهادة الشاهد العيان الشفوية.',
        EstCorrecte: false,
        Explication: 'إتلاف الأدلة جريمة يعاقب عليها القانون وتضر بسلامة العدالة.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 1003,
    TestId: 2,
    OrdreAffichage: 3,
    Code: 'TEST1-Q03',
    DomaineCode: 'PJ_ENQUETE',
    DomaineIntitule: 'التحقيق والبحث القضائي',
    CompetencesAssociees: ['Scientific investigation', 'Accuracy'],
    ContexteSituationnel: 'عند الوصول إلى مسرح جريمة مغلق (مستودع تجاري)، تم العثور على: غلاف رصاصة فارغ قرب الباب، بقعة دم سائلة، أداة حديدية عليها بصمات واضحة، ووثيقة هوية ملقاة على الأرض.',
    Enonce: 'ما هو الترتيب الإجرائي الصحيح لتصنيف وحماية وتحريز هذه الأدلة الجنائية؟',
    Options: [
      {
        OptionId: 10031,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'تثبيت الأماكن بالترقيم الفوتوغرافي، أخذ عينة الدم السائلة خشية جفافها وتلوثها، ثم تحريز الغلاف والأداة وبطاقة الهوية بحذر.',
        EstCorrecte: true,
        Explication: 'التوثيق التصويري الشامل أولاً، ثم حماية الآثار البيولوجية السريعة التلف، متبوعة بالتحريز المنهجي للقرائن المادية.'
      },
      {
        OptionId: 10032,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'التقاط بطاقة الهوية باليد فوراً والاتصال بصاحبها قبل تصوير المسرح.',
        EstCorrecte: false,
        Explication: 'لمس الدليل باليد دون قفازات وقبل التوثيق يتلف البصمات ويشوه مسرح الجريمة.'
      },
      {
        OptionId: 10033,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'جمع كافة المواد في كيس بلاستيكي واحد دون ترقيم لربح الوقت.',
        EstCorrecte: false,
        Explication: 'خلط الأدلة في وعاء واحد يسبب التلوث التبادلي ويبطل القيمة الجنائية للأدلة.'
      },
      {
        OptionId: 10034,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'تنظيف بقعة الدم لمنع انبعاث الروائح في المكان قبل وصول فريق الشرطة التقنية.',
        EstCorrecte: false,
        Explication: 'تنظيف أو مسح أي أثر بيولوجي يدمر الدليل المادي بشكل كامل.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 1004,
    TestId: 2,
    OrdreAffichage: 4,
    Code: 'TEST1-Q04',
    DomaineCode: 'PJ_ENQUETE',
    DomaineIntitule: 'التحقيق والبحث القضائي',
    CompetencesAssociees: ['Judicial analysis', 'Documentation'],
    ContexteSituationnel: 'أثناء صياغة محضر جمع الاستدلالات، لاحظ المحقق أن المشتبه فيه غير تصريحاته ثلاث مرات بخصوص مكان تواجده بين التاسعة والحادية عشرة ليلاً.',
    Enonce: 'كيف يجب تدوين هذه الإفادات المتغيرة في المحضر الرسمي لضمان الصرامة القانونية؟',
    Options: [
      {
        OptionId: 10041,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'تدوين كل تصريح بحرفيته وتوقيته، مع تدوين الأسئلة الموجهة إليه وإبراز التناقض بوضوح دون تأويل شخصي مسبق.',
        EstCorrecte: true,
        Explication: 'المحضر القضائي يجب أن يتسم بالحياد والدقة ونقل الأقوال بحذافيرها مع إبراز التبدل الزمني للأقوال.'
      },
      {
        OptionId: 10042,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'تسجيل الرواية الأخيرة فقط وإلغاء الروايات السابقة لتجنب الإطالة في المحضر.',
        EstCorrecte: false,
        Explication: 'حذف أي تصريح يعد إخلالاً جسيماً بأمانة تحرير المحاضر القضائية.'
      },
      {
        OptionId: 10043,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'كتابة استنتاج يفيد بإدانة المشتبه فيه وتوقيع المحضر نيابة عنه.',
        EstCorrecte: false,
        Explication: 'المحقق يدون الوقائع والأقوال، بينما الإدانة من اختصاص القضاء.'
      },
      {
        OptionId: 10044,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'رفض تدوين أي محضر حتى يقرر المشتبه فيه اختيار رواية واحدة ثابتة.',
        EstCorrecte: false,
        Explication: 'امتناع الضابط عن تدوين المحضر يعطل الإجراءات المسطرية القانونية.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 1005,
    TestId: 2,
    OrdreAffichage: 5,
    Code: 'TEST1-Q05',
    DomaineCode: 'PJ_ENQUETE',
    DomaineIntitule: 'التحقيق والبحث القضائي',
    CompetencesAssociees: ['Judicial analysis', 'Scientific investigation'],
    ContexteSituationnel: 'في قضية تزوير وثائق تجارية، قارن المحقق بين أربعة توقيعات منسوبة لنفس الشخص على أربعة شيكات صادرة في تواريخ متباعدة. تبين أن التوقيع على الشيك رقم (3) متطابق هندسياً بنسبة 100% مع التوقيع رقم (1) من حيث الأبعاد والزوايا وتراكب الخطوط عند وضعهما فوق بعض.',
    Enonce: 'ماذا يستنتج الخبير الجنائي المختص في فحص الخطوط والوثائق من هذا التطابق التام؟',
    Options: [
      {
        OptionId: 10051,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'شبهة قوية بالتزوير عبر النسخ أو الشف الميكانيكي، لأن التوقيع البشري الطبيعي يستحيل أن يتطابق هندسياً بنسبة 100%.',
        EstCorrecte: true,
        Explication: 'في علم الخطوط الجنائية، يستحيل أن يكرر الإنسان توقيعه بتطابق ميكانيكي تام بنسبة 100%، والتطابق المطلق قرينة قاطعة على الشف أو الاستنساخ.'
      },
      {
        OptionId: 10052,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'دليل قاطع على صحة التوقيع وأصالته لأن يد الكاتب كانت في قمة الثبات.',
        EstCorrecte: false,
        Explication: 'التطابق الهندسي الكامل مؤشر تزوير وليس مؤشر أصالة.'
      },
      {
        OptionId: 10053,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'الشيكان تم توقيعهما بالضرورة في نفس الثانية ومن نفس القلم الحبري.',
        EstCorrecte: false,
        Explication: 'الاستنتاج غير علمي ويتجاهل احتمالية النسخ والتزوير.'
      },
      {
        OptionId: 10054,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'الأمر لا يحمل أي أهمية جنائية ويجب استبعاد الشيكات من ملف التحقيق.',
        EstCorrecte: false,
        Explication: 'الشيكات هي جوهر قضية التزوير المالي.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 1006,
    TestId: 2,
    OrdreAffichage: 6,
    Code: 'TEST1-Q06',
    DomaineCode: 'PJ_ENQUETE',
    DomaineIntitule: 'التحقيق والبحث القضائي',
    CompetencesAssociees: ['Accuracy', 'Documentation'],
    ContexteSituationnel: 'عند استلام تقرير تشريحي طبي في وفاة مشبوهة، ورد في التقرير: "زمن الوفاة التقريبي يقع بين الساعة 18:00 والساعة 21:00 من مساء الأمس". إفادة المتهم تدعي أنه كان يتناول العشاء مع زملاء العمل من الساعة 19:30 حتى 23:00 وتوجد فاتورة إلكترونية مسجلة الساعة 20:15.',
    Enonce: 'ما هي الخطوة التحقيقية الأكثر دقة للتحقق من مصداقية حجة الغياب؟',
    Options: [
      {
        OptionId: 10061,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'التحقق من مكان تواجد المتهم بين 18:00 و19:30، وتفريغ كاميرات المطعم لتأكيد هويته وتوقيت تواجده الفعلي.',
        EstCorrecte: true,
        Explication: 'حجة الغياب تغطي الفترة من 19:30 فقط، بينما الوفاة قد تكون حدثت بين 18:00 و19:30، مما يفرض التحري عن النصف الأول من الفترة.'
      },
      {
        OptionId: 10062,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'تبرئة المتهم وإخلاء سبيله فوراً لوجود فاتورة المطعم الساعة 20:15.',
        EstCorrecte: false,
        Explication: 'الفاتورة لا تثبت غيابه خلال الفترة السابقة (18:00 - 19:30).'
      },
      {
        OptionId: 10063,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'رفض التقرير الطبي الشرعي وطلب إعادة تشريح الجثة بعد شهر.',
        EstCorrecte: false,
        Explication: 'التقرير الطبي سليم وواضح والواجب هو مطابقة حجة الغياب مع مجمل النطاق الزمني.'
      },
      {
        OptionId: 10064,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'افتراض أن زملاء العمل في المطعم قد اتفقوا جميعاً على شهادة زور دون سؤالهم.',
        EstCorrecte: false,
        Explication: 'الافتراضات المسبقة دون استجواب رسمي تنافي أسس التحقيق القضائي.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 1007,
    TestId: 2,
    OrdreAffichage: 7,
    Code: 'TEST1-Q07',
    DomaineCode: 'PJ_ENQUETE',
    DomaineIntitule: 'التحقيق والبحث القضائي',
    CompetencesAssociees: ['Judicial analysis', 'Documentation'],
    ContexteSituationnel: 'وردت برقية تتضمن بلاغاً عن هروب مركبة نفعية بعد ارتكاب حادثة سير. تضمنت إفادة الشاهد الأول: "مركبة بيضاء من نوع X تحمل لوحة تسجيل تنتهي برقم 45"، بينما ذكر الشاهد الثاني: "شاحنة صغيرة رمادية فاتحة تنتهي لوحتها برقم 54".',
    Enonce: 'ما هو الإجراء المنهجي الذي يعتمده المحقق للتعامل مع هذا التباين وتوجيه دوريات التمشيط؟',
    Options: [
      {
        OptionId: 10071,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'إدراج الاحتمالين معاً (45 و 54) في نطاق البحث، مع مراعاة تشابه الأبيض والرمادي الفاتح في ظروف الرؤية الليلية.',
        EstCorrecte: true,
        Explication: 'التحليل الاستقصائي المنهجي يدمج التناوب في الأرقام (خطأ بصري وارد بين 45 و54) والتقارب اللوني في الإشعار العملياتي.'
      },
      {
        OptionId: 10072,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'اعتماد شهادة الشاهد الأول فقط وإهمال الثاني بدعوى أنه يرتدي نظارات طبية.',
        EstCorrecte: false,
        Explication: 'استبعاد الشاهد بدون مبرر مسطري قد يفقد التحقيق خيطاً جوهرياً.'
      },
      {
        OptionId: 10073,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'توقيف عملية التمشيط والانتظار حتى يقوم سائق المركبة بتسليم نفسه طوعاً.',
        EstCorrecte: false,
        Explication: 'التوقف عن التمشيط يعطل الاستجابة الفورية للمركبات الفارة.'
      },
      {
        OptionId: 10074,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'معاقبة الشاهدين بتهمة تقديم معلومات غير متطابقة.',
        EstCorrecte: false,
        Explication: 'تباين الشهادات العفوية أمر طبيعي ومألوف في الحوادث الصادمة.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 1008,
    TestId: 2,
    OrdreAffichage: 8,
    Code: 'TEST1-Q08',
    DomaineCode: 'PJ_ENQUETE',
    DomaineIntitule: 'التحقيق والبحث القضائي',
    CompetencesAssociees: ['Scientific investigation', 'Accuracy'],
    ContexteSituationnel: 'أثناء فحص هاتف ذكي محجوز على ذمة قضية تهريب، عثر المحقق على سجل رسائل تطبيق مشفر تم حذفها قبل ساعتين من التوقيف، مع بقاء إشعار بنقل ملف صور باسم "Coordinates_GPS_03.jpg".',
    Enonce: 'ما هو الإجراء الفني القانوني السليم للمحافظة على الدليل الرقمي دون المساس بسلامته؟',
    Options: [
      {
        OptionId: 10081,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'عزل الهاتف في كيس فاراداي المضاد للإشارات، وإحالته إلى مختبر التحليل الرقمي لاستخراج نسخة طبق الأصل مطابقة كربونياً (Forensic Image).',
        EstCorrecte: true,
        Explication: 'عزل الهاتف يمنع مسح البيانات عن بعد، واستخراج الصورة الجنائية يضمن الحفاظ على السلامة الجنائية للبصمة الرقمية (Hash).'
      },
      {
        OptionId: 10082,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'توصيل الهاتف بشبكة الواي فاي للدرك ومحاولة تحميل تطبيقات استرجاع مجانية من المتجر.',
        EstCorrecte: false,
        Explication: 'توصيل الهاتف بالإنترنت قد يعرضه للحذف التلقائي عن بعد ويغير الذاكرة المؤقتة.'
      },
      {
        OptionId: 10083,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'إعادة ضبط الهاتف إلى إعدادات المصنع للتأكد من خلوه من الفيروسات.',
        EstCorrecte: false,
        Explication: 'إعادة ضبط المصنع تدمر كافة البيانات والأدلة الجنائية.'
      },
      {
        OptionId: 10084,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'تصفح محادثات الواتساب الشخصية للمشتبه به وقراءتها بصوت مرتفع أمام زملائه.',
        EstCorrecte: false,
        Explication: 'انتهاك صارخ للسرية المهنية وضوابط حماية المعطيات القضائية.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 1009,
    TestId: 2,
    OrdreAffichage: 9,
    Code: 'TEST1-Q09',
    DomaineCode: 'PJ_ENQUETE',
    DomaineIntitule: 'التحقيق والبحث القضائي',
    CompetencesAssociees: ['Judicial analysis', 'Accuracy'],
    ContexteSituationnel: 'قام دركي بتسجيل محتويات خزانة حديدية تم تفتيشها بموجب إذن قضائي، فوجد مبالغ مالية ودفاتر شيكات ووثائق عقارية. سجل التقرير: "تم ضبط مبالغ مالية مهمة وبعض الأوراق".',
    Enonce: 'ما هو العيب المسطري في هذه الصياغة وما هو التصحيح الإجرائي الواجب اتباعه؟',
    Options: [
      {
        OptionId: 10091,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'الصياغة عامة وغير دقيقة؛ يجب جرد المبالغ بالتفصيل (عدد الأوراق وفئاتها وأرقامها التسلسلية) وجرد الوثائق بأسمائها وأرقامها.',
        EstCorrecte: true,
        Explication: 'المحاضر القضائية تتطلب الدقة المطلقة في جرد المحجوزات وتفصيل الفئات والأرقام التسلسلية لحماية حقوق الأطراف ونزاهة الإجراء.'
      },
      {
        OptionId: 10092,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'الصياغة ممتازة وموجزة وتفي بالغرض دون الحاجة لتضييع الوقت في العد.',
        EstCorrecte: false,
        Explication: 'الصياغة المبهمة تفتح باب الطعن في المحضر وتثير الشبهات حول دقة الجرد.'
      },
      {
        OptionId: 10093,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'كان يجب ترك الأموال في مكانها وعدم حجزها طالما أنها داخل خزانة مقفلة.',
        EstCorrecte: false,
        Explication: 'المحجوزات المرتبطة بالجريمة يجب تحريزها وفق الأصول المسطرية.'
      },
      {
        OptionId: 10094,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'تحويل الأموال فوراً إلى الحساب الشخصي لكاتب الضبط دون وصل.',
        EstCorrecte: false,
        Explication: 'فعل غير قانوني يشكل اختلاساً للأموال المحجوزة.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 1010,
    TestId: 2,
    OrdreAffichage: 10,
    Code: 'TEST1-Q10',
    DomaineCode: 'PJ_ENQUETE',
    DomaineIntitule: 'التحقيق والبحث القضائي',
    CompetencesAssociees: ['Judicial analysis', 'Documentation'],
    ContexteSituationnel: 'في تقرير تركيبي لقضية تشابكت فيها خيوط الاعتداء بين طرفين، يدعي كل طرف أنه كان في حالة دفاع شرعي عن النفس داخل مسكنه.',
    Enonce: 'ما هي النقطة القانونية والمادية الفاصلة التي يحسم بها ضابط الشرطة القضائية التحريات؟',
    Options: [
      {
        OptionId: 10101,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'تحديد مسرح التدخل الأولي عبر آثار الاقتحام وكسر الأبواب واتجاه بقع الدم وموقع الأدوات المستعملة.',
        EstCorrecte: true,
        Explication: 'المعاينة المادية لكسر الأبواب واتجاه الدماء تحدد المعتدي المقتحم من المعتدى عليه وتثبت شروط حالة الدفاع الشرعي بدقة.'
      },
      {
        OptionId: 10102,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'تصديق الطرف الأكبر سناً تلقائياً وإلزام الطرف الآخر بالتعويض.',
        EstCorrecte: false,
        Explication: 'السن ليس معياراً قانونياً في تقدير الدفاع الشرعي.'
      },
      {
        OptionId: 10103,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'إلزام الطرفين بالصلح الودي دون إشعار النيابة العامة المختصة.',
        EstCorrecte: false,
        Explication: 'قضايا الاعتداء الجسيم تخضع لسلطة النيابة العامة ولا يجوز حجبها.'
      },
      {
        OptionId: 10104,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'الاعتماد فقط على من حضر أولاً إلى مقر السرية لتسجيل الشكوى.',
        EstCorrecte: false,
        Explication: 'الأسبقية في تقديم الشكوى لا تعني بالضرورة البراءة أو الصدق.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },

  // ============================================================================
  // TEST 2 — التدبير الميداني والسلامة الطرقية (10 أسئلة: 201 -> 210)
  // ============================================================================
  {
    QuestionId: 2001,
    TestId: 3,
    OrdreAffichage: 1,
    Code: 'TEST2-Q01',
    DomaineCode: 'ROUTE_MOTO',
    DomaineIntitule: 'السلامة الطرقية والتدخل الميداني',
    CompetencesAssociees: ['Field management', 'Road safety'],
    ContexteSituationnel: 'وصلت دورية الدرك الملكي أولاً إلى حادث سير في منعرج طرقي خطير بين شاحنة محملة بالبضائع وسيارة خفيفة. هناك مصابان داخل السيارة، وحركة المرور كثيفة في الاتجاهين مع تسرب كمية من الوقود على قارعة الطريق.',
    Enonce: 'ما هو الترتيب الإجرائي الفوري للأولويات الميدانية الواجب تنفيذه؟',
    Options: [
      {
        OptionId: 20011,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'تأمين مكان الحادث ووضع إشارات التحذير قبل المنعرج، استدعاء الإسعاف والإطفاء، تقديم الإسعافات الأولية وتأمين حركة السير.',
        EstCorrecte: true,
        Explication: 'قاعدة التدخل الذهبية: الحماية أولاً (تأمين المكان ومنع حادث ثانٍ أو اشتعال الوقود)، الإشعار بالنجدة، ثم إغاثة الضحايا وتنظيم السير.'
      },
      {
        OptionId: 20012,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'البدء فوراً في تحرير المخالفات واستجواب السائقين حول التأمين قبل حماية المكان.',
        EstCorrecte: false,
        Explication: 'تحرير المحاضر يأتي بعد إنقاذ الأرواح وتأمين مسرح الحادث بالكامل.'
      },
      {
        OptionId: 20013,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'محاولة سحب الشاحنة بالحبال بواسطة سيارة الدورية دون انتظار الآليات المتخصصة.',
        EstCorrecte: false,
        Explication: 'تصرف خطير قد يؤدي لحوادث إضافية وإتلاف سيارة الخدمة.'
      },
      {
        OptionId: 20014,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'مغادرة المكان لإحضار مخاريط التحذير وترك المسرح دون رقابة.',
        EstCorrecte: false,
        Explication: 'لا يجوز ترك مسرح الحادث الخطير دون عنصر تأمين وإرشاد.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 2002,
    TestId: 3,
    OrdreAffichage: 2,
    Code: 'TEST2-Q02',
    DomaineCode: 'ROUTE_MOTO',
    DomaineIntitule: 'السلامة الطرقية والتدخل الميداني',
    CompetencesAssociees: ['Road safety', 'Procedural awareness'],
    ContexteSituationnel: 'على طريق وطنية سريعة بسرعة مسموحة 100 كم/س، وقع اصطدام في ظروف ضباب كثيف. المسافة الفاصلة بين المنعرج والسيارات المصطدمة لا تتعدى 80 متراً.',
    Enonce: 'على أي مسافة يجب وضع مثلث التحذير وإشارات الخطر المسبقة للدورية لحماية السائقين القادمين؟',
    Options: [
      {
        OptionId: 20021,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'على مسافة 150 إلى 200 متر على الأقل قبل المنعرج، مع استخدام الأضواء الوماضة والسترات العاكسة للضوء.',
        EstCorrecte: true,
        Explication: 'في الطرق السريعة والظروف الجوية السيئة (ضباب)، يجب مضاعفة مسافة الإنذار لتوفير زمن كبح كافٍ للمركبات القادمة.'
      },
      {
        OptionId: 20022,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'على مسافة 5 أمتار فقط ملاصقة لمؤخرة السيارة المصطدمة.',
        EstCorrecte: false,
        Explication: 'مسافة 5 أمتار لا تمنح القادمين أي فرصة للتوقف وتتسبب في تصادم متسلسل.'
      },
      {
        OptionId: 20023,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'عدم وضع أي إشارة والاكتفاء بالصراخ والتنبيه اليدوي بدون سترة عاكسة.',
        EstCorrecte: false,
        Explication: 'مخاطرة جسيمة بحياة الدركي والسائقين وتنافي قواعد التدخل النظامي.'
      },
      {
        OptionId: 20024,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'إشعال نار بواسطة البنزين المتسرب على قارعة الطريق لتنبيه السائقين.',
        EstCorrecte: false,
        Explication: 'إشعال النار في بقعة وقود يؤدي لانفجار كارثي.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 2003,
    TestId: 3,
    OrdreAffichage: 3,
    Code: 'TEST2-Q03',
    DomaineCode: 'ROUTE_MOTO',
    DomaineIntitule: 'السلامة الطرقية والتدخل الميداني',
    CompetencesAssociees: ['Field management', 'Organization'],
    ContexteSituationnel: 'أثناء نقطة مراقبة ليلية منسقة، رفضت سيارة مشبوهة الامتثال لأمر التوقف وقامت باجتياز الحاجز بسرعة جنونية في اتجاه الطريق الإقليمية الفرعية.',
    Enonce: 'ما هو التصرف الميداني النظامي المتبع فوراً وفق قواعد التدخل الآمن؟',
    Options: [
      {
        OptionId: 20031,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'إبلاغ قاعة المواصلات فوراً بمواصفات السيارة ورقمها واتجاه فرارها، والتنسيق لنصب سد اعتراضي متقدم دون مطاردة عمياء متهورة.',
        EstCorrecte: true,
        Explication: 'التنسيق اللاسلكي ونصب السدود المتقدمة يضمن توقيف السيارة بأعلى درجات الأمان ودون تعريض مستعملي الطريق للخطر.'
      },
      {
        OptionId: 20032,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'إطلاق النار العشوائي فوراً على المقصورة حتى وإن كانت المنطقة مأهولة بالسكان.',
        EstCorrecte: false,
        Explication: 'استخدام السلاح الناري يخضع لضوابط صارمة جداً وحالات الدفاع الشرعي ولا يجوز عشوائياً.'
      },
      {
        OptionId: 20033,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'تجاهل الحادثة وعدم تسجيل أي تقرير عنها لعدم رغبة الدورية في المتاعب.',
        EstCorrecte: false,
        Explication: 'إخلال خطير بالواجب المهني والانضباط العسكري.'
      },
      {
        OptionId: 20034,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'إغلاق نقطة المراقبة والعودة فوراً إلى مركز الدرك.',
        EstCorrecte: false,
        Explication: 'ترك نقطة المراقبة دون إذن قيادي يعد خرقاً للتعليمات العملياتية.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 2004,
    TestId: 3,
    OrdreAffichage: 4,
    Code: 'TEST2-Q04',
    DomaineCode: 'ROUTE_MOTO',
    DomaineIntitule: 'السلامة الطرقية والتدخل الميداني',
    CompetencesAssociees: ['Procedural awareness', 'Organization'],
    ContexteSituationnel: 'في حادثة سير بدنية نجمت عنها إصابة بليغة لراكب دراجة نارية، تم نقل المصاب على وجه السرعة للمستشفى. عثر الدركي على خوذة واقية مكسورة وحقيبة ظهر وبقايا حطام متناثرة على مسافة 40 متراً.',
    Enonce: 'ما هو الإجراء الدقيق لتثبيت ورسم مخطط الحادثة (Croquis d\'accident) بدقة قانونية؟',
    Options: [
      {
        OptionId: 20041,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'تحديد نقطة مرجعية ثابتة (نقطة كيلومترية أو عمود إنارة)، وقياس المسافات المتقاطعة لنقطة الصدم وموقع الحطام وآثار الفرملة بالطبشور المخصص.',
        EstCorrecte: true,
        Explication: 'مخطط الحادثة يقتضي تحديد نقطة ارتكاز ثابتة غير قابلة للتغيير، وأخذ قياسات دقيقة لموقع الاصطدام ومسار الانزلاق.'
      },
      {
        OptionId: 20042,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'رسم تقديري سريع للشارع دون قياس المسافات والاعتماد على الذاكرة لاحقاً بالمكتب.',
        EstCorrecte: false,
        Explication: 'الرسم التقديري دون قياسات ميدانية يبطل القيمة القانونية للمخطط في المحاكم.'
      },
      {
        OptionId: 20043,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'كنس الحطام فوراً ورميه في الوادي المجاور لفتح الطريق قبل التقاط الصور.',
        EstCorrecte: false,
        Explication: 'إزالة الحطام قبل التوثيق والقياس يشوه مسرح الحادثة ويطمس معالمها.'
      },
      {
        OptionId: 20044,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'تسليم الخوذة المكسورة والحقيبة لأحد المارة المجهولين للاحتفاظ بها.',
        EstCorrecte: false,
        Explication: 'المحجوزات والآثار المادية تسجل رسمياً وتوضع تحت الحراسة القانونية.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 2005,
    TestId: 3,
    OrdreAffichage: 5,
    Code: 'TEST2-Q05',
    DomaineCode: 'ROUTE_MOTO',
    DomaineIntitule: 'السلامة الطرقية والتدخل الميداني',
    CompetencesAssociees: ['Field management', 'Road safety'],
    ContexteSituationnel: 'أثناء مرافقة موكب رسمي أو قافلة نقل مواد خطرة عبر كوكبة الدراجات النارية (Escadron Motocycliste)، توقفت إحدى الشاحنات فجأة في نفق طرقي ضيق بسبب عطب ميكانيكي.',
    Enonce: 'ما هو التشكيل الأمني والتدبير الميداني الذي ينفذه طاقم المرافقة لحماية الموكب والقافلة؟',
    Options: [
      {
        OptionId: 20051,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'تأمين مقدمة ومؤخرة النفق فوراً بواسطة دراجين، إيقاف التدفق المروري، وتأمين مسار خروج فوري بديل للموكب وفق خطة الطوارئ.',
        EstCorrecte: true,
        Explication: 'الأنفاق نقاط حرجة؛ يتطلب التدخل حماية المداخل والمخارج ومنع التكدس وتأمين إخلاء الموكب بسرعة.'
      },
      {
        OptionId: 20052,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'تجاوز الشاحنة المعطلة وترك المواد الخطرة في النفق دون إشعار أي جهة.',
        EstCorrecte: false,
        Explication: 'ترك مواد خطرة معطلة في نفق يهدد بكارثة بيئية أو انفجار.'
      },
      {
        OptionId: 20053,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'إيقاف كافة الدراجات النارية وإطفاء المحركات والانتظار دون اتخاذ أي مبادرة.',
        EstCorrecte: false,
        Explication: 'السلبية في المواقف الطارئة تعرض الموكب للخطر الحقيقي.'
      },
      {
        OptionId: 20054,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'محاولة فتح صهريج المواد الخطرة في النفق لمعاينة نوع السائل بالعين المجردة.',
        EstCorrecte: false,
        Explication: 'استنشاق أو ملامسة المواد الخطرة يعرض حياة الأفراد لتسمم فوري.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 2006,
    TestId: 3,
    OrdreAffichage: 6,
    Code: 'TEST2-Q06',
    DomaineCode: 'ROUTE_MOTO',
    DomaineIntitule: 'السلامة الطرقية والتدخل الميداني',
    CompetencesAssociees: ['Procedural awareness', 'Field management'],
    ContexteSituationnel: 'أثناء مراقبة مرورية، أظهر جهاز قياس الكحول بالهواء الزفيري (Éthylotest) نتيجة إيجابية لسائق مركبة نقل جماعي للمسافرين، وكان السائق شديد الانفعال ويصر على مواصلة الرحلة بالركاب.',
    Enonce: 'ما هو الإجراء الإداري والقانوني الحاسم والواجب تطبيقه فوراً؟',
    Options: [
      {
        OptionId: 20061,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'منع السائق فوراً من مواصلة القيادة، توقيف الحافلة في مكان آمن، إخضاع السائق للاختبار التأكيدي، والاتصال بالشركة لتوفير سائق بديل لنقل المسافرين بسلام.',
        EstCorrecte: true,
        Explication: 'حماية أرواح الركاب أولوية مطلقة؛ يُمنع السائق في الحال وتتخذ الإجراءات المسطرية الزجرية والتنسيقية.'
      },
      {
        OptionId: 20062,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'السماح له بالقيادة لمسافة 50 كم أخرى شريطة أن يسير بسرعة منخفضة.',
        EstCorrecte: false,
        Explication: 'تساهل ممنوع قانوناً ويشكل جريمة تعريض حياة المواطنين للخطر.'
      },
      {
        OptionId: 20063,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'تغريم الركاب لأنهم وافقوا على الركوب معه.',
        EstCorrecte: false,
        Explication: 'الركاب ليسوا مسؤولين قانوناً عن السلوك الفردي للسائق.'
      },
      {
        OptionId: 20064,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'إطلاق سراحه مع الاكتفاء بتوجيه إنذار شفوي بسيط.',
        EstCorrecte: false,
        Explication: 'السياقة تحت تأثير الكحول مخالفة جسيمة تقتضي إجراءات قانونية صارمة.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 2007,
    TestId: 3,
    OrdreAffichage: 7,
    Code: 'TEST2-Q07',
    DomaineCode: 'ROUTE_MOTO',
    DomaineIntitule: 'السلامة الطرقية والتدخل الميداني',
    CompetencesAssociees: ['Field management', 'Organization'],
    ContexteSituationnel: 'في منطقة جبلية وعرة، تساقطت صخور ضخمة على الطريق الجهوية مما تسبب في شل حركة المرور في اتجاهين، مع وجود طابور من السيارات يمتد لمسافة كيلومترين وتزايد سوء الأحوال الجوية.',
    Enonce: 'كيف يدير رئيس الدورية الوضع الميداني باحترافية بانتظار وصول آليات وزارة التجهيز؟',
    Options: [
      {
        OptionId: 20071,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'إقامة نقطة قطع وتحويل للسير عند آخر تقاطع آمن، تنظيم ركود السيارات، إرشاد المواطنين لطرق بديلة، ومنع الاقتراب من موقع الانهيار.',
        EstCorrecte: true,
        Explication: 'تحويل السير من نقطة آمنة يمنع احتباس السيارات داخل المنطقة الخطرة ويسمح بوصول آليات إزاحة الصخور بسلاسة.'
      },
      {
        OptionId: 20072,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'مطالبة سائقي السيارات بالنزول ودفع الصخور يدوياً بأيديهم.',
        EstCorrecte: false,
        Explication: 'تعريض المواطنين لخطر الانهيارات الصخرية المتجددة أمر ممنوع كلياً.'
      },
      {
        OptionId: 20073,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'السماح للسيارات بالمرور فوق حافة الهاوية الضيقة لاختبار حظهم.',
        EstCorrecte: false,
        Explication: 'تصرف يهدد بوقوع حوادث سقوط مميتة في المنحدرات.'
      },
      {
        OptionId: 20074,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'مغادرة الدورية للمنطقة الجبلية للاحتماء في مقهى بعيد.',
        EstCorrecte: false,
        Explication: 'تخلي عن الواجب الميداني في أوقات الأزمات الطبيعية.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 2008,
    TestId: 3,
    OrdreAffichage: 8,
    Code: 'TEST2-Q08',
    DomaineCode: 'ROUTE_MOTO',
    DomaineIntitule: 'السلامة الطرقية والتدخل الميداني',
    CompetencesAssociees: ['Road safety', 'Procedural awareness'],
    ContexteSituationnel: 'أثناء فحص شاحنة لنقل البضائع، تبين أن حمولتها تتجاوز الوزن الإجمالي المأذون به بمقدار 4 أطنان، مع وجود تآكل شديد في عجلتين خلفيتين واختلال في أجهزة الإنارة.',
    Enonce: 'ما هو الموقف المسطري المتعين اتخاذه طبقاً لمدونة السير وقواعد السلامة الطرقية؟',
    Options: [
      {
        OptionId: 20081,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'توقيف المركبة فوراً، وضعها بالمحجز، عدم السماح لها بالمغادرة إلا بعد تفريغ الحمولة الزائدة وتغيير العجلات واستيفاء الإجراءات القانونية.',
        EstCorrecte: true,
        Explication: 'الحمولة الزائدة مع عجلات متآكلة تشكل خطراً محدقاً على سلامة الجسور ومستعملي الطريق، مما يوجب التوقيف الفوري وتفريغ الزيادة.'
      },
      {
        OptionId: 20082,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'السماح له بالمرور بمجرد دفع غرامة رمزية ومواصلة الرحلة دون معالجة الخلل.',
        EstCorrecte: false,
        Explication: 'الغرامة لا تعفي من إلزامية رفع الخطر الفني المهدد لسلامة السير.'
      },
      {
        OptionId: 20083,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'أخذ عينة من البضائع ومصادرتها لحساب أفراد الدورية.',
        EstCorrecte: false,
        Explication: 'فعل غير قانوني وخيانة للأمانة وشرف البدلة العسكرية.'
      },
      {
        OptionId: 20084,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'تجاهل وزن الشاحنة لأنها تحمل لوحة ترقيم خاصة بشركة مشهورة.',
        EstCorrecte: false,
        Explication: 'القانون يطبق على الجميع على قدم المساواة ودون تمييز.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 2009,
    TestId: 3,
    OrdreAffichage: 9,
    Code: 'TEST2-Q09',
    DomaineCode: 'ROUTE_MOTO',
    DomaineIntitule: 'السلامة الطرقية والتدخل الميداني',
    CompetencesAssociees: ['Field management', 'Organization'],
    ContexteSituationnel: 'خلال تأمين تظاهرة رياضية كبرى (طواف الدراجات الهوائية) على مسار طرقي بطول 40 كم يمر عبر عدة مداشر وقرى.',
    Enonce: 'ما هو الترتيب العملياتي الأمثل لتنسيق نقاط الغلق وتأمين مسار المتسابقين؟',
    Options: [
      {
        OptionId: 20091,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'نشر دراجات طلائعية متقدمة بـ 15 دقيقة لفتح المسار، تثبيت عناصر عند كل المسالك الفرعية، وغلق المسار تدريجياً وفتحه مباشرة بعد مرور سيارة نهاية القافلة.',
        EstCorrecte: true,
        Explication: 'الفتح التدريجي والإغلاق المحكم وفق التوقيت الزمني للموكب الرياضي يضمن سلامة الرياضيين ويقلل شلل حركة السير للمواطنين.'
      },
      {
        OptionId: 20092,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'غلق المنطقة بأكملها لمدة 48 ساعة قبل انطلاق السباق ومنع السكان من الخروج.',
        EstCorrecte: false,
        Explication: 'إجراء غير متناسب ويعطل مصالح السكان بشكل تعسفي.'
      },
      {
        OptionId: 20093,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'ترك المتسابقين يسيرون بين الشاحنات والسيارات العادية دون أي مواكبة.',
        EstCorrecte: false,
        Explication: 'إهمال جسيم يؤدي لحوادث دهس مميتة للمتسابقين.'
      },
      {
        OptionId: 20094,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'الاعتماد على إشارات ضوئية مؤقتة دون وجود أي عنصر دركي على الأرض.',
        EstCorrecte: false,
        Explication: 'المسابقات الرياضية تتطلب تدخلاً ميدانياً وتوجيهاً حياً عند التقاطعات.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 2010,
    TestId: 3,
    OrdreAffichage: 10,
    Code: 'TEST2-Q10',
    DomaineCode: 'ROUTE_MOTO',
    DomaineIntitule: 'السلامة الطرقية والتدخل الميداني',
    CompetencesAssociees: ['Field management', 'Procedural awareness'],
    ContexteSituationnel: 'أثناء دورية تفقدية على شاطئ صخري ناءٍ، لاحظ الدركيان قارباً مطاطياً مشبوهاً يقترب من الساحل في وقت متأخر من الليل مع وجود أشخاص ينتظرون فوق الجرف ومعهم سيارة دفع رباعي.',
    Enonce: 'ما هو السلوك التكتيكي السليم والميداني وفق التعليمات العسكرية للدرك الملكي؟',
    Options: [
      {
        OptionId: 20101,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'المحافظة على التخفي، المراقبة بالمنظار الليلي، تمرير إحداثيات الموقع فوراً إلى مركز القيادة والسرية لطلب تعزيزات وتطويق المسالك.',
        EstCorrecte: true,
        Explication: 'التصرف التكتيكي الاحترافي يعتمد على الاستطلاع والمراقبة وطلب الإسناد لضمان ضبط كافة عناصر الشبكة دون المخاطرة غير المحسوبة.'
      },
      {
        OptionId: 20102,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'الاندفاع الفردي السريع نحوهم بالسيارة وتشغيل المنبه الصوتي وأضواء الخطر.',
        EstCorrecte: false,
        Explication: 'الكشف المبكر يدفع المهربين للفرار أو استعمال السلاح ضد الدورية الصغيرة.'
      },
      {
        OptionId: 20103,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'القفز إلى البحر بالملابس العسكرية لمحاولة السباحة نحو القارب المطاطي.',
        EstCorrecte: false,
        Explication: 'تصرف انتحاري غير عقلاني ينافي قواعد السلامة والتدخل.'
      },
      {
        OptionId: 20104,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'مغادرة الشاطئ فوراً وإطفاء أجهزة اللاسلكي.',
        EstCorrecte: false,
        Explication: 'تخاذل وهروب من الواجب الوطني في حراسة الحدود والمنظومة الأمنية.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },

  // ============================================================================
  // TEST 3 — الكفاءات التقنية والتنظيمية (10 أسئلة: 301 -> 310)
  // ============================================================================
  {
    QuestionId: 3001,
    TestId: 4,
    OrdreAffichage: 1,
    Code: 'TEST3-Q01',
    DomaineCode: 'INFORMATIQUE',
    DomaineIntitule: 'التحليل الرقمي والتقني',
    CompetencesAssociees: ['Digital skills', 'Technical analysis'],
    ContexteSituationnel: 'يحتوي جدول سجل الاتصالات الرقمية (Call Detail Records) على أربعة أعمدة: (رقم الهاتف، المعرف الخلوي للبرج، وقت الاتصال، مدة المكالمة). تظهر السجلات أن الهاتف رقم 06XXXXXXXX أجرى اتصالاً في الساعة 14:10 متصلاً بالبرج (T-Casa-North)، ثم أجرى اتصالاً ثانياً في الساعة 14:18 متصلاً بالبرج (T-Tanger-Port) الذي يبعد أكثر من 300 كم.',
    Enonce: 'ما هو التفسير التقني والمنطقي الأكثر دقة لهذا التسجيل الرقمي؟',
    Options: [
      {
        OptionId: 30011,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'شبهة قوية باستنساخ شريحة الهاتف (SIM Cloned) أو استخدام شريحتين بنفس الرقم أو تزييف الهوية الخلوية، لاستحالة قطع 300 كم في 8 دقائق.',
        EstCorrecte: true,
        Explication: 'التحليل المنطقي الفيزيائي والتقني يثبت استحالة الانتقال المكاني الفعلي، مما يوجه التحليل إلى قرينة استنساخ الشريحة أو تلاعب رقمي.'
      },
      {
        OptionId: 30012,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'صاحب الهاتف قاد سيارته بسرعة 2500 كم في الساعة للوصول بين المدينتين.',
        EstCorrecte: false,
        Explication: 'افتراض مستحيل فيزيائياً على شبكة الطرق البرية.'
      },
      {
        OptionId: 30013,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'الجدول سليم تماماً ولا يحتاج لأي تدقيق فني أو تقني إضافي.',
        EstCorrecte: false,
        Explication: 'إهمال هذا التناقض الجسيم يفوت فرصة كشف شبكة تزوير الاتصالات.'
      },
      {
        OptionId: 30014,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'أبراج الاتصالات غير صالحة ويجب الاستغناء عن شركات الاتصالات بالبلاد.',
        EstCorrecte: false,
        Explication: 'استنتاج غير موضوعي ومخالف لأسس التحليل الرقمي.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 3002,
    TestId: 4,
    OrdreAffichage: 2,
    Code: 'TEST3-Q02',
    DomaineCode: 'INFORMATIQUE',
    DomaineIntitule: 'التحليل الرقمي والتقني',
    CompetencesAssociees: ['Digital skills', 'Technical analysis'],
    ContexteSituationnel: 'أثناء فحص جدول سجلات الدخول (Server Access Logs) لإحدى المنظومات الإدارية المحمية، لوحظ وجود 500 محاولة دخول فاشلة خلال دقيقتين من نفس عنوان IP لأسماء مستخدمين تبدأ بحروف أبجدية متتالية (admin_a, admin_b, admin_c...).',
    Enonce: 'ما هو نوع هذا النشاط السيبراني وما هو الإجراء الفني الوقائي الواجب تنفيذه فوراً؟',
    Options: [
      {
        OptionId: 30021,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'هجوم التخمين الآلي لكلمات المرور (Brute Force / Dictionary Attack)؛ يجب حظر عنوان IP تلقائياً، وتفعيل المصادقة الثنائية وتنبيه ضابط أمن النظم.',
        EstCorrecte: true,
        Explication: 'الوتيرة السريعة والأسماء المنهجية تدل على هجوم آلي بالتخمين، مما يقتضي الحظر الفوري للعنوان المهاجم وتطبيق قواعد الحماية.'
      },
      {
        OptionId: 30022,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'موظف عادي نسي كلمة السر ويحاول تذكرها بهدوء ولا خطر من ذلك.',
        EstCorrecte: false,
        Explication: '500 محاولة في دقيقتين لا تصدر عن مستخدم بشري يدوي.'
      },
      {
        OptionId: 30023,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'إلغاء كلمة المرور تماماً من الخادم لتسهيل الدخول للموظفين دون عوائق.',
        EstCorrecte: false,
        Explication: 'إلغاء كلمات المرور يدمر أمن المنظومة بالكامل.'
      },
      {
        OptionId: 30024,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'فصل الكهرباء عن كامل المقر ورمي الحواسيب في النفايات.',
        EstCorrecte: false,
        Explication: 'إجراء كارثي غير مهني يعطل سير المرفق العام.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 3003,
    TestId: 4,
    OrdreAffichage: 3,
    Code: 'TEST3-Q03',
    DomaineCode: 'SECRETARIAT',
    DomaineIntitule: 'التسيير الإداري والتنظيم',
    CompetencesAssociees: ['Administrative management', 'Organization'],
    ContexteSituationnel: 'استلم كاتب الضبط الإداري بالسرية 15 ملفاً لطلبات رخص حمل السلاح ورخص الصيد. بعض الملفات تفتقر إلى شهادة السوابق العدلية، والبعض الآخر تنقصه الشهادة الطبية للأهلية النفسية والبدنية.',
    Enonce: 'كيف يتم تنظيم وتصنيف هذه الملفات إدارياً لضمان التدبير السليم قبل عرضها على القائد؟',
    Options: [
      {
        OptionId: 30031,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'إنشاء جدول جرد تتبعي، فرز الملفات المستوفية للشروط بالكامل في حافظة جاهزة للتوقيع، وعزل الملفات الناقصة مع تحديد الوثيقة المطلوبة وإشعار أصحابها رسمياً لاستكمالها.',
        EstCorrecte: true,
        Explication: 'التنظيم الإداري المحكم يعتمد على جدول التتبع وتصنيف الملفات حسب الجاهزية وحصر النواقص لتسريع وتيرة المعالجة القانونية.'
      },
      {
        OptionId: 30032,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'إرسال كافة الملفات بما فيها الناقصة للقائد للتوقيع عليها دفعة واحدة للتخلص من ضغط العمل.',
        EstCorrecte: false,
        Explication: 'تقديم ملفات ناقصة للرئيس توقيعها يشكل إخلالاً فادحاً بالمسؤولية الإدارية.'
      },
      {
        OptionId: 30033,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'تمزيق الملفات الناقصة ورميها دون إخبار أصحابها أو حفظ سجل لها.',
        EstCorrecte: false,
        Explication: 'إتلاف وثائق المواطنين خطأ مهني يستوجب المساءلة التأديبية.'
      },
      {
        OptionId: 30034,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'منح الرخص فقط لمن يعرفهم شخصياً وتأجيل الباقين لأجل غير مسمى.',
        EstCorrecte: false,
        Explication: 'سلوك ينافي قواعد النزاهة والمساواة والشفافية في المرفق العام.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 3004,
    TestId: 4,
    OrdreAffichage: 4,
    Code: 'TEST3-Q04',
    DomaineCode: 'PLANNING',
    DomaineIntitule: 'التخطيط والتنظيم العملياتي',
    CompetencesAssociees: ['Planning and organization', 'Administrative management'],
    ContexteSituationnel: 'يتعين على مسؤول الفصيلة توزيع 12 دركياً على 3 مهام خلال 24 ساعة: (المهمة 1: خفارة الثكنة والمستودع - تتطلب 4 أفراد، المهمة 2: دورية تأمين السير بالمدخل الرئيسي - تتطلب 4 أفراد، المهمة 3: فرقة تدخل احتياطية سريعة - تتطلب 4 أفراد)، مع ضرورة مراعاة فترات الراحة الإلزامية (8 ساعات لكل فرد).',
    Enonce: 'ما هو المبدأ التنظيمي الصحيح لجدولة نوبات العمل (Tableau de service) دون استنزاف الطاقة البشرية؟',
    Options: [
      {
        OptionId: 30041,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'نظام المناوبة الثلاثي (نوبة خدمة 8 ساعات / راحة واستعداد 16 ساعة) مع تدوير الأدوار لضمان الجاهزية الدائمة والعدالة في توزيع الجهد.',
        EstCorrecte: true,
        Explication: 'التوزيع العادل القائم على التناوب في النوبات (3x8) يحافظ على اليقظة العملياتية ويحترم معايير استعادة النشاط البدني والذهني.'
      },
      {
        OptionId: 30042,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'تكليف 4 أفراد بالعمل المتواصل لمدة 24 ساعة دون نوم، وإعطاء الباقين عطلة كاملة.',
        EstCorrecte: false,
        Explication: 'العمل 24 ساعة متواصلة يسبب انهيار التركيز وحوادث مهنية خطيرة.'
      },
      {
        OptionId: 30043,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'ترك الأفراد يختارون مهامهم وساعات عملهم حسب رغبتهم كل يوم.',
        EstCorrecte: false,
        Explication: 'التنظيم العسكري يقوم على الجداول الدقيقة والمسؤولية والانضباط الصارم.'
      },
      {
        OptionId: 30044,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'إلغاء خفارة المستودع والمقرات لتقليص عدد المهام إلى مهمة واحدة فقط.',
        EstCorrecte: false,
        Explication: 'إلغاء حراسة المنشآت الحساسة خرق أمني جسيم.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 3005,
    TestId: 4,
    OrdreAffichage: 5,
    Code: 'TEST3-Q05',
    DomaineCode: 'INFORMATIQUE',
    DomaineIntitule: 'التحليل الرقمي والتقني',
    CompetencesAssociees: ['Digital skills', 'Technical analysis'],
    ContexteSituationnel: 'أمامك جدول إحصائي يوضح بلاغات حوادث السير المسجلة شهرياً على 4 مقاطع طرقية (A, B, C, D):\n- المقطع A: (يناير: 12، فبراير: 14، مارس: 11)\n- المقطع B: (يناير: 4، فبراير: 6، مارس: 5)\n- المقطع C: (يناير: 28، فبراير: 35، مارس: 42)\n- المقطع D: (يناير: 8، فبراير: 7، مارس: 9)',
    Enonce: 'ما هو القرار العملياتي المستند إلى قراءة البيانات الإحصائية لتحسين توزيع دوريات المراقبة وتفادي الحوادث؟',
    Options: [
      {
        OptionId: 30051,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'تكثيف دوريات الرادار والتحسيس بشكل عاجل ومضاعف في المقطع C نظراً لتصاعد الحوادث فيه بوتيرة مرتفعة وخطيرة.',
        EstCorrecte: true,
        Explication: 'التحليل البياني يُظهر أن المقطع C هو النقطة السوداء (Blackspot) الأكثر خطورة وحوادثه في تصاعد شهري مستمر، مما يفرض تركيز الموارد فيه.'
      },
      {
        OptionId: 30052,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'وضع جميع الدوريات في المقطع B لأنه يسجل أقل عدد من الحوادث.',
        EstCorrecte: false,
        Explication: 'توجيه الموارد للنقاط الآمنة وإهمال المقاطع الخطرة خطأ جسيم في التخطيط.'
      },
      {
        OptionId: 30053,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'تجاهل الجدول بالكامل واعتبار الإحصائيات أرقاماً مجردة لا تفيد العمل الميداني.',
        EstCorrecte: false,
        Explication: 'العمليات الحديثة تعتمد على الشرطة القائمة على الأدلة والبيانات (Intelligence-Led).'
      },
      {
        OptionId: 30054,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'توزيع الدوريات بالتساوي الممل بين المقاطع بغض النظر عن معدل الخطر والحوادث.',
        EstCorrecte: false,
        Explication: 'التوزيع المتساوي يضيع الموارد في مناطق هادئة ويترك المناطق المشتعلة بلا حماية كافية.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 3006,
    TestId: 4,
    OrdreAffichage: 6,
    Code: 'TEST3-Q06',
    DomaineCode: 'SECRETARIAT',
    DomaineIntitule: 'التسيير الإداري والتنظيم',
    CompetencesAssociees: ['Administrative management', 'Documentation'],
    ContexteSituationnel: 'أثناء إعداد جدول الجرد السنوي للأسلحة والذخيرة بمركز الدرك (Registre d\'armement)، تبين مطابقة أرقام 24 قطعة سلاح فردي، بينما وجد نقص في 50 طلقة نارية من عيار 9 ملم بين المخزون الفعلي والمسجل في الدفتر.',
    Enonce: 'ما هو الإجراء الإداري والانضباطي الإلزامي الواجب اتخاذه على الفور؟',
    Options: [
      {
        OptionId: 30061,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'إشعار قائد الوحدة فوراً، وتجميد حركة المستودع، ومراجعة سجلات جلسات الرماية وأوامر التسليم خلال العام لتحديد مكمن الفارق بدقة وشفافية.',
        EstCorrecte: true,
        Explication: 'حصر الذخيرة والسلاح مسألة أمنية من الدرجة الأولى؛ يتطلب النقص إشعاراً فورياً ومراجعة شاملة لبيانات الصرف والرماية لتحديد مصدر الخلل.'
      },
      {
        OptionId: 30062,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'تعديل الرقم في السجل بقلم الرصاص ومسح الخانة لإخفاء النقص عن لجنة التفتيش.',
        EstCorrecte: false,
        Explication: 'تزوير السجلات العسكرية جريمة جسيمة يعاقب عليها القانون العسكري.'
      },
      {
        OptionId: 30063,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'شراء طلقات مشابهة من السوق غير المشروع ووضعها بالصندوق.',
        EstCorrecte: false,
        Explication: 'إدخال ذخائر مجهولة المصدر للمستودع يشكل خرقاً أمنياً خطيراً.'
      },
      {
        OptionId: 30064,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'إلقاء اللوم على زميل متغيب في إجازة سنوية دون أي دليل مادي.',
        EstCorrecte: false,
        Explication: 'اتهام الأفراد بغير بينة يخالف قواعد النزاهة والانضباط العسكري.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 3007,
    TestId: 4,
    OrdreAffichage: 7,
    Code: 'TEST3-Q07',
    DomaineCode: 'INFORMATIQUE',
    DomaineIntitule: 'التحليل الرقمي والتقني',
    CompetencesAssociees: ['Digital skills', 'Technical analysis'],
    ContexteSituationnel: 'أثناء استخراج بيانات هاتف نقال، عثر على جدول قاعدة بيانات صغيرة بصيغة SQLite يتضمن جدولاً بأسماء جهات الاتصال. أحد الأعمدة مسمى "is_deleted" وتأخذ السجلات القيمة (1) بدلاً من (0).',
    Enonce: 'ماذا تعني القيمة (1) في حقل "is_deleted" في علم التحليل الجنائي الرقمي؟',
    Options: [
      {
        OptionId: 30071,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'أن جهة الاتصال قد قام المستخدم بحذفها من واجهة الهاتف، ولكنها لا تزال مخزنة مادياً داخل قاعدة البيانات ويمكن استرجاعها كدليل.',
        EstCorrecte: true,
        Explication: 'تقنية الحذف اللين (Soft Delete) تضع علامة 1 في حقل الحذف، مما يعني بقاء السجل الفعلي في قاعدة البيانات لحين الكتابة فوقه.'
      },
      {
        OptionId: 30072,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'أن جهة الاتصال تنتمي إلى شخصية حكومية رفيعة المستوى.',
        EstCorrecte: false,
        Explication: 'الحقل تقني بحت ولا علاقة له بالمكانة الاجتماعية.'
      },
      {
        OptionId: 30073,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'أن الهاتف مصاب بفيروس مدمر قام بحرق المعالج.',
        EstCorrecte: false,
        Explication: 'السجلات المحذوفة أمر طبيعي ومألوف في قواعد البيانات اليومية.'
      },
      {
        OptionId: 30074,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'أن جهة الاتصال تم الاتصال بها مرة واحدة فقط في التاريخ.',
        EstCorrecte: false,
        Explication: 'حقل الحذف لا يشير إلى عدد المكالمات بل إلى حالة الوجود في السجل.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 3008,
    TestId: 4,
    OrdreAffichage: 8,
    Code: 'TEST3-Q08',
    DomaineCode: 'PLANNING',
    DomaineIntitule: 'التخطيط والتنظيم العملياتي',
    CompetencesAssociees: ['Planning and organization', 'Administrative management'],
    ContexteSituationnel: 'توصلت السرية بتعزيزات لوجستية تضم 4 سيارات دفع رباعي، 6 أجهزة اتصال لاسلكي مشفرة حديثة، و10 صدريات واقية من الرصاص. يتطلب التوزيع تزويد مركزين جبليين ومركزين ساحليين.',
    Enonce: 'ما هو المعيار العملياتي الأسلم لتوزيع هذه المعدات اللوجستية؟',
    Options: [
      {
        OptionId: 30081,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'تخصيص سيارات الدفع الرباعي للمراكز الجبلية ذات التضاريس الصعبة والمسالك الوعرة، وتوزيع الصدريات وأجهزة الاتصال حسب كثافة التدخلات ومستوى المخاطر الميدانية.',
        EstCorrecte: true,
        Explication: 'التوزيع العقلاني للعتاد يعتمد على ملائمة الوسيلة للطبيعة الجغرافية والتحديات الميدانية للوحدة.'
      },
      {
        OptionId: 30082,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'إعطاء جميع سيارات الدفع الرباعي للمركز الساحلي الذي يتوفر على طرق سريعة معبدة.',
        EstCorrecte: false,
        Explication: 'سوء توظيف للعتاد يترك المراكز الجبلية عاجزة عن التدخل في المسالك الوعرة.'
      },
      {
        OptionId: 30083,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'تخزين جميع المعدات في المرآب وعدم استخدامها للحفاظ على لمعانها جديدة.',
        EstCorrecte: false,
        Explication: 'حبس المعدات يحرم العناصر الميدانية من وسائل الحماية والاتصال الفعال.'
      },
      {
        OptionId: 30084,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'إجراء قرعة عشوائية بين المراكز دون النظر إلى طبيعة تضاريسها.',
        EstCorrecte: false,
        Explication: 'القرعة العشوائية تنافي التخطيط الاستراتيجي العملياتي للقوات المسلحة.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 3009,
    TestId: 4,
    OrdreAffichage: 9,
    Code: 'TEST3-Q09',
    DomaineCode: 'SECRETARIAT',
    DomaineIntitule: 'التسيير الإداري والتنظيم',
    CompetencesAssociees: ['Administrative management', 'Accuracy'],
    ContexteSituationnel: 'في إطار تصنيف الأرشيف الإداري والقضائي لمركز الدرك، تراكمت ملفات القضايا المحكومة، وملفات المراسلات الإدارية، وسجلات المخالفات الطرقية لسنوات متعددة.',
    Enonce: 'ما هي القاعدة الأساسية لحفظ وتنظيم هذا الأرشيف وفق الضوابط العسكرية؟',
    Options: [
      {
        OptionId: 30091,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'التصنيف وفق السنة والرقم الترتيبي، وتصنيف الوثائق حسب درجة سريتها، وإعداد سجل جرد ومفهرس دقيق، وحفظها في بيئة آمنة ومقاومة للرطوبة والحريق.',
        EstCorrecte: true,
        Explication: 'حفظ الأرشيف القضائي والإداري يتطلب التصنيف الزمني والنوعي وتوثيق درجات السرية وسهولة استرجاع الوثائق عند طلب القضاء.'
      },
      {
        OptionId: 30092,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'حرق الملفات التي مر عليها أكثر من ستة أشهر في باحة المركز دون ترخيص.',
        EstCorrecte: false,
        Explication: 'إتلاف الأرشيف بدون لجنة رسمية وموافقة القيادة العليا جريمة يعاقب عليها القانون.'
      },
      {
        OptionId: 30093,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'ترك الملفات مبعثرة على مكاتب الزوار ليستأنسوا بها أثناء الانتظار.',
        EstCorrecte: false,
        Explication: 'خرق فاضح للسر المهني وحرمة الوثائق القضائية.'
      },
      {
        OptionId: 30094,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'بيع الأوراق والمحاضر القديمة كنفايات ورقية للاستفادة من ثمنها.',
        EstCorrecte: false,
        Explication: 'تسريب المحاضر الرسمية خيانة مهنية موجبة للعقوبات الجنائية والتأديبية.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  },
  {
    QuestionId: 3010,
    TestId: 4,
    OrdreAffichage: 10,
    Code: 'TEST3-Q10',
    DomaineCode: 'PLANNING',
    DomaineIntitule: 'التخطيط والتنظيم العملياتي',
    CompetencesAssociees: ['Technical analysis', 'Planning and organization'],
    ContexteSituationnel: 'عند تحليل مؤشرات استهلاك وقود حظيرة سيارات المصلحة خلال الربع الأول من السنة، أظهرت البيانات أن إحدى السيارات قطعت 1200 كم واستهلكت 280 لتراً من البنزين (معدل 23 لتر/100 كم)، مقارنة بمتوسط باقي السيارات الذي لا يتعدى 8.5 لتر/100 كم في نفس المسارات.',
    Enonce: 'ما هو القرار الإداري والتقني الصحيح للتصرف حيال هذا الفارق الكبير وغير الطبيعي؟',
    Options: [
      {
        OptionId: 30101,
        LettreOption: 'A',
        LettreArabe: 'أ',
        EnonceOption: 'إخضاع السيارة لفحص ميكانيكي دقيق لنظام الحقن والمحرك، ومراجعة سجلات أوامر التحرك (Ordres de mission) ومحطات التزود بالوقود للتدقيق في الاستخدام الفعلي.',
        EstCorrecte: true,
        Explication: 'المقارنة تكشف استهلاكاً ثلاثياً مريباً؛ يتطلب الأمر فحصاً ميكانيكياً لكشف الأعطال أو التسريبات، والتحقق الإداري من سلامة استخدام قسائم الوقود.'
      },
      {
        OptionId: 30102,
        LettreOption: 'B',
        LettreArabe: 'ب',
        EnonceOption: 'مضاعفة ميزانية الوقود المخصصة لتلك السيارة تلقائياً دون طرح أي سؤال.',
        EstCorrecte: false,
        Explication: 'تبذير للمال العام وإهمال لأعطال فنية قد تسبب حرائق أو إهداراً للوقود.'
      },
      {
        OptionId: 30103,
        LettreOption: 'C',
        LettreArabe: 'ج',
        EnonceOption: 'منع قيادة تلك السيارة نهائياً وركنها بالشارع العام.',
        EstCorrecte: false,
        Explication: 'التصرف السليم هو الفحص والصيانة أو المحاسبة الإدارية.'
      },
      {
        OptionId: 30104,
        LettreOption: 'D',
        LettreArabe: 'د',
        EnonceOption: 'شطب بيانات الاستهلاك من السجل الرقمي لإظهار تطابق وهمي مع باقي السيارات.',
        EstCorrecte: false,
        Explication: 'التلاعب بالسجلات المحاسبية جريمة إدارية ومالية.'
      }
    ],
    Points: 1,
    Difficulte: 'MOYEN',
    EstActive: true,
    EstArchivee: false
  }
];
