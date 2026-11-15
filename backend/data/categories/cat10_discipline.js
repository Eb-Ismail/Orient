// ==============================================================================
// الفئة 10: المواقف المهنية والانضباط (15 سؤال - من 126 إلى 140)
// ==============================================================================

export const questionsDiscipline = [
  {
    id: 126,
    code: 'Q-DIS-126',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE',
    texte: 'تلقى دركي أمراً صريحاً من رئيسه المباشر بإخفاء سلاح ناري غير مرخص تم حجزه أثناء تفتيش وعدم تضمينه في المحضر الرسمي. ما هو الموقف القانوني والأخلاقي العسكري الإلزامي؟',
    difficulte: 'صعب',
    difficulte_code: 'DIFFICILE',
    coefficient: 1.5,
    competences: ['حدود الطاعة العسكرية والأمر غير المشروع', 'الاستقامة القانونية والنزاهة'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 2.0 }
    ],
    explication: 'تنص القوانين والأنظمة العسكرية على أن واجب الطاعة يسقط إذا كان الأمر الصادر غير مشروع بشكل صريح ويشكل جريمة قانونية خطيرة؛ يجب رفض التنفيذ وإشعار المستوى القيادي الأعلى فوراً.',
    options: [
      { id: 12601, lettre: 'A', lettre_ar: 'أ', texte: 'تنفيذ الأمر فوراً دون تردد لأن طاعة الرئيس مطلقة حتى لو خالفت القانون الجنائي', estCorrecte: false },
      { id: 12602, lettre: 'B', lettre_ar: 'ب', texte: 'رفض تنفيذ الأمر غير المشروع الصريح وإثبات المحجوز قانوناً وإبلاغ القيادة العليا بالواقعة', estCorrecte: true },
      { id: 12603, lettre: 'C', lettre_ar: 'ج', texte: 'أخذ السلاح الناري وبيعه في السوق واقتسام المال مع الرئيس', estCorrecte: false },
      { id: 12604, lettre: 'D', lettre_ar: 'د', texte: 'إطلاق النار على السلاح الناري لإتلافه أمام الجميع', estCorrecte: false }
    ]
  },
  {
    id: 127,
    code: 'Q-DIS-127',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE',
    texte: 'ما الذي يمثله الارتداء السليم والمتكامل للبذلة العسكرية والشارات النظامية للدرك الملكي في الشارع العام؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الهندام العسكري والتمثيل المؤسساتي', 'الانضباط والوقار المهني'],
    specialites_ponderation: [
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 3.0 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'الهندام العسكري المنضبط يجسد هيبة وسيادة الدولة، ويعزز الثقة والاحترام لدى المواطنين، ويعكس الصرامة والانضباط الذاتي الداخلي للمؤسسة العسكرية العريقة.',
    options: [
      { id: 12701, lettre: 'A', lettre_ar: 'أ', texte: 'مجرد لباس عادي يمكن تعديل ألوانه وارتداؤه مع أحذية رياضية متباينة', estCorrecte: false },
      { id: 12702, lettre: 'B', lettre_ar: 'ب', texte: 'تجسيد لهيبة القانون وسيادة المؤسسة ويعكس الانضباط الصارم والاحترام الواجب للوظيفة العسكرية', estCorrecte: true },
      { id: 12703, lettre: 'C', lettre_ar: 'ج', texte: 'وسيلة لتخويف الأطفال الصغار في الشوارع', estCorrecte: false },
      { id: 12704, lettre: 'D', lettre_ar: 'د', texte: 'لباس صيفي يمكن تمزيق أكمامه في الأيام الحارة', estCorrecte: false }
    ]
  },
  {
    id: 128,
    code: 'Q-DIS-128',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE',
    texte: 'قام دركي بنشر مقطع فيديو على منصة (تيك توك) يظهر فيه بالبذلة العسكرية الرسمية داخل مرآب الثكنة وهو يغني ويعلق بسخرية على بعض التوجيهات اليومية. ما التقييم التأديبي لهذا التصرف؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['واجب التحفظ واستخدام شبكات التواصل الاجتماعي', 'الانضباط العسكري الرقمي'],
    specialites_ponderation: [
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 2.5 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 }
    ],
    explication: 'مخالفة جسيمة وصريحة لواجب التحفظ والسر العسكري وقواعد استعمال وسائل التواصل الاجتماعي، تعرض صاحبها لعقوبات تأديبية صارمة للمساس بصورة وهيبة السلك.',
    options: [
      { id: 12801, lettre: 'A', lettre_ar: 'أ', texte: 'تصرف عصري يستحق الإشادة والترقية الفورية لموهبته الفنية', estCorrecte: false },
      { id: 12802, lettre: 'B', lettre_ar: 'ب', texte: 'خطأ مهني وتأديبي جسيم يخرق واجب التحفظ ويمس بهيبة المؤسسة العسكرية ويستوجب العقاب الرادع', estCorrecte: true },
      { id: 12803, lettre: 'C', lettre_ar: 'ج', texte: 'عمل بطولي يُطلب من جميع العناصر تقليده يومياً', estCorrecte: false },
      { id: 12804, lettre: 'D', lettre_ar: 'د', texte: 'مباح تماماً ما دام لم يذكر اسمه الشخصي في الفيديو', estCorrecte: false }
    ]
  },
  {
    id: 129,
    code: 'Q-DIS-129',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE',
    texte: 'أثناء فترة إجازته السنوية وارتدائه ملابس مدنية، شاهد دركي شخصاً يقود بتهور كاد يدهس مارة في حي سكني. ما هو الموقف المهني والأخلاقي السليم؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['استمرارية الواجب الأخلاقي والصفة الضبطية', 'حماية الأمن العام في كل الظروف'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 }
    ],
    explication: 'صفة الدركي ورسالته في حماية المواطنين تلازمه دائماً؛ يتدخل بحكمة عبر إشعار مصالح الأمن أو الدرك المحلية فوراً برقم السيارة وأوصافها، والتدخل المباشر فقط في حدود الضرورة ودون تهور.',
    options: [
      { id: 12901, lettre: 'A', lettre_ar: 'أ', texte: 'تجاهل الأمر تماماً لأن الإجازة تعني أن الشخص لم يعد ينتمي للدرك الملكي', estCorrecte: false },
      { id: 12902, lettre: 'B', lettre_ar: 'ب', texte: 'التفاعل الإيجابي بتسجيل بيانات السيارة وإشعار الدورية المحلية فوراً والتدخل الآمن عند الضرورة لإنقاذ الأرواح', estCorrecte: true },
      { id: 12903, lettre: 'C', lettre_ar: 'ج', texte: 'مطاردة السيارة بالدراجة الهوائية وتكسير زجاجها بالحجارة', estCorrecte: false },
      { id: 12904, lettre: 'D', lettre_ar: 'د', texte: 'التصفيق للسائق المتهور وتشجيعه على زيادة السرعة', estCorrecte: false }
    ]
  },
  {
    id: 130,
    code: 'Q-DIS-130',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE',
    texte: 'حُدد موعد تجمع وانطلاق دورية أمنية على الساعة 08:00 صباحاً. متى يجب على الدركي المنضبط الحضور الفعلي في مكان الاستعداد؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الانضباط الزمني والدقة العسكرية', 'الاستعداد المسبق للمهام'],
    specialites_ponderation: [
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 3.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.5 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 2.0 }
    ],
    explication: 'القاعدة العسكرية الراسخة: "الدقة في الموعد أدب الملوك والواجب العسكري الأول"؛ الحضور قبل الموعد بـ 15 إلى 20 دقيقة لاستلام وفحص السلاح والمعدات وجاهزية المركبة قبل ساعة الانطلاق.',
    options: [
      { id: 1301, lettre: 'A', lettre_ar: 'أ', texte: 'الوصول في الساعة 08:30 صباحاً مع تقديم اعتذار شفهي بسيط', estCorrecte: false },
      { id: 1302, lettre: 'B', lettre_ar: 'ب', texte: 'الحضور قبل الموعد بـ 15 إلى 20 دقيقة لفحص التجهيزات والسلاح والمركبة وضمان الانطلاق في الوقت المحدد تماماً', estCorrecte: true },
      { id: 1303, lettre: 'C', lettre_ar: 'ج', texte: 'الحضور في الساعة 12:00 زوالاً لتناول وجبة الغداء مع الفريق', estCorrecte: false },
      { id: 1304, lettre: 'D', lettre_ar: 'د', texte: 'عدم الحضور نهائياً وإغلاق الهاتف النقال طوال اليوم', estCorrecte: false }
    ]
  },
  {
    id: 131,
    code: 'Q-DIS-131',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE',
    texte: 'ما هو المفهوم الحقيقي لـ "روح الفريق والتضامن العسكري" (Esprit de corps) بين عناصر الدرك الملكي؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['روح الجماعة والتضامن الأخلاقي', 'التماسك والتعاون المهني النزيه'],
    specialites_ponderation: [
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.5 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.5 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 2.0 }
    ],
    explication: 'روح الفريق تعني التآزر والمساندة الميدانية المخلصة، والتضحية لإنجاح المهمة وحماية سلامة الزملاء، دون أن تتحول أبداً إلى تواطؤ سلبي للتستر على الجرائم أو الخيانات المهنية.',
    options: [
      { id: 13101, lettre: 'A', lettre_ar: 'أ', texte: 'التستر الأعمى على الجرائم والسرقات التي يرتكبها الزميل داخل الوحدة', estCorrecte: false },
      { id: 13102, lettre: 'B', lettre_ar: 'ب', texte: 'التآزر الصادق والدعم المتبادل والشجاعة المشتركة لإنجاز الواجب وحماية الزملاء في إطار الشرف والقانون', estCorrecte: true },
      { id: 13103, lettre: 'C', lettre_ar: 'ج', texte: 'رفض التحدث مع أي زميل ينتمي لمدينة أخرى', estCorrecte: false },
      { id: 13104, lettre: 'D', lettre_ar: 'د', texte: 'الهروب وترك الزميل محاصراً بمفرده في مواجهة الخطر', estCorrecte: false }
    ]
  },
  {
    id: 132,
    code: 'Q-DIS-132',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE',
    texte: 'لماذا يفرض القانون والأنظمة العسكرية على رجل الدرك الملكي الحياد السياسي والنقابي التام والمطلق؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الحياد السياسي والمؤسساتي', 'أخلاقيات المرفق الأمني والعسكري'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 3.0 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 2.0 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 }
    ],
    explication: 'لضمان خدمة الوطن والشعب بتجرد مطلق ومساواة بين جميع المواطنين، وحماية المؤسسة العسكرية والأمنية من الانقسامات الأيديولوجية والتجاذبات الحزبية.',
    options: [
      { id: 13201, lettre: 'A', lettre_ar: 'أ', texte: 'لأن رجال الدرك ليس لديهم أي اهتمام بالشأن العام إطلاقاً', estCorrecte: false },
      { id: 13202, lettre: 'B', lettre_ar: 'ب', texte: 'لضمان التجرد والنزاهة والمساواة في تطبيق القانون على الجميع، وصون وحدة المؤسسة من الصراعات الحزبية', estCorrecte: true },
      { id: 13203, lettre: 'C', lettre_ar: 'ج', texte: 'لأن الأحزاب السياسية تمنع الانتساب إليها لمن يرتدي الزي العسكري في المساء فقط', estCorrecte: false },
      { id: 13204, lettre: 'D', lettre_ar: 'د', texte: 'لتشجيع الناس على عدم المشاركة في الانتخابات', estCorrecte: false }
    ]
  },
  {
    id: 133,
    code: 'Q-DIS-133',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE',
    texte: 'في ميدان الرماية بالرصاص الحي (Stand de tir)، صاح المدرب فجأة وبصوت قوي: "قف! أوقفوا النار!". ما هو الإجراء الفوري الإلزامي لجميع الرماة؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الانضباط التكتيكي الصارم في الرماية', 'السلامة الحيوية في ميدان النار'],
    specialites_ponderation: [
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 3.0 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 }
    ],
    explication: 'التوقف الفوري والتام عن الرماية، ورفع الإصبع خارج الزناد، وإبقاء فوهة السلاح في اتجاه الأهداف الآمنة، ووضع السلاح في وضع التأمين وانتظار التعليمات التالية.',
    options: [
      { id: 13301, lettre: 'A', lettre_ar: 'أ', texte: 'الاستمرار في إطلاق النار حتى نفاد آخر رصاصة في المخزن', estCorrecte: false },
      { id: 13302, lettre: 'B', lettre_ar: 'ب', texte: 'التوقف الفوري عن الرمي، إبقاء الفوهة باتجاه الأهداف، وضع الإصبع خارج الزناد وتأمين السلاح', estCorrecte: true },
      { id: 13303, lettre: 'C', lettre_ar: 'ج', texte: 'الالتفات بالسلاح الملقم نحو المدرب لسؤاله عن سبب الصياح', estCorrecte: false },
      { id: 13304, lettre: 'D', lettre_ar: 'د', texte: 'رمي السلاح الملقم على الأرض والركض نحو الباب الخارجي', estCorrecte: false }
    ]
  },
  {
    id: 134,
    code: 'Q-DIS-134',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE',
    texte: 'أثناء مراقبة روتينية للسيارات، تبين أن السائق المخالف قريب شخصي للدركي، فطلب منه إعفاءه من تسجيل المخالفة قائلاً: "أنا من العائلة وعليك حمايتي". كيف يتصرف الدركي النزيه؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['مقاومة المحاباة والمحسوبية', 'سيادة القانون والتجرد الوظيفي'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 3.0 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 2.5 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 }
    ],
    explication: 'سيادة القانون تعلو فوق كل الروابط العائلية؛ يجب تطبيق الإجراءات القانونية المحددة بعدل وهدوء ولباقة، أو التماس تسليم تدبير المخالفة للزميل المرافق درءاً لأي شبهة محاباة.',
    options: [
      { id: 13401, lettre: 'A', lettre_ar: 'أ', texte: 'تمزيق وثيقة المخالفة وتقديم اعتذار رسمي له والسماح له بالسياقة بسرعة مضاعفة', estCorrecte: false },
      { id: 13402, lettre: 'B', lettre_ar: 'ب', texte: 'تطبيق القانون بكل تجرد وصرامة مهنية محترمة، وتأكيد أن الواجب الوطني يعلو فوق القرابة العائلية', estCorrecte: true },
      { id: 13403, lettre: 'C', lettre_ar: 'ج', texte: 'طلب مبلغ مالي مضاعف منه كعقاب عائلي خاص', estCorrecte: false },
      { id: 13404, lettre: 'D', lettre_ar: 'د', texte: 'الهروب والاختباء وراء شجرة لتفادي التحدث معه', estCorrecte: false }
    ]
  },
  {
    id: 135,
    code: 'Q-DIS-135',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE',
    texte: 'التقى دركي بالزي النظامي في ساحة الثكنة بضابط يرتدي زيه العسكري لكنه لا ينتمي لنفس وحدته ولا يعرفه شخصياً. ما هو الواجب الانضباطي العسكري المباشر؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['التقاليد والتحية العسكرية', 'احترام الرتب والتراتبية الهرمية'],
    specialites_ponderation: [
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 3.0 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'التحية العسكرية تؤدى للرتبة والرمزية العسكرية والوطنية للزي وليس للشخص بحد ذاته؛ يجب تأدية التحية العسكرية النظامية بصرامة واعتزاز فور الالتقاء بأي رئيس تسلسلي أعلى رتبة.',
    options: [
      { id: 13501, lettre: 'A', lettre_ar: 'أ', texte: 'تجاهله تماماً والمشي وكأنه غير موجود لأنه ليس رئيسه المباشر في المكتب', estCorrecte: false },
      { id: 13502, lettre: 'B', lettre_ar: 'ب', texte: 'أداء التحية العسكرية النظامية الكاملة فوراً وبكل انضباط تقديراً للرتبة والتقاليد العسكرية العريقة', estCorrecte: true },
      { id: 13503, lettre: 'C', lettre_ar: 'ج', texte: 'الغمز له بالعين والتلويح بيده بالتحية المدنية الخفيفة', estCorrecte: false },
      { id: 13504, lettre: 'D', lettre_ar: 'د', texte: 'طلب بطاقة تعريفه وتفتيش جيوبه في وسط الساحة', estCorrecte: false }
    ]
  },
  {
    id: 136,
    code: 'Q-DIS-136',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE',
    texte: 'أثناء مناورة ركن سيارة المصلحة العسكرية، اصطدمت المركبة بخفة بعمود إنارة مما تسبب في خدش طفيف في الصباغة الخلفية دون وجود شهود. ما هو السلوك المهني النزيه الواجب اتخاذه؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الأمانة في صيانة ممتلكات الدولة', 'الشجاعة الأدبية والمسؤولية الذاتية'],
    specialites_ponderation: [
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 2.5 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 }
    ],
    explication: 'الشجاعة الأدبية والنزاهة العسكرية تقتضي الإبلاغ الفوري للقائد التسلسلي وإنجاز تقرير عن الحادث العرضي لإصلاحه، وتجنب إخفاء العيوب أو تبرئة النفس بالباطل.',
    options: [
      { id: 13601, lettre: 'A', lettre_ar: 'أ', texte: 'شراء طلاء وتغطية الخدش سراً وإنكار أي علم به لاحقاً', estCorrecte: false },
      { id: 13602, lettre: 'B', lettre_ar: 'ب', texte: 'الإبلاغ الفوري والصادق للرئيس التسلسلي بالواقعة وإنجاز تقرير تقني بالحادث العرضي بشفافية', estCorrecte: true },
      { id: 13603, lettre: 'C', lettre_ar: 'ج', texte: 'اتهام الزميل الذي قاد السيارة في اليوم السابق بالتسبب في الحادث', estCorrecte: false },
      { id: 13604, lettre: 'D', lettre_ar: 'د', texte: 'ترك السيارة في الخلاء والمطالبة بسيارة جديدة بدلاً منها', estCorrecte: false }
    ]
  },
  {
    id: 137,
    code: 'Q-DIS-137',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE',
    texte: 'ما هي المبادئ الدستورية والأخلاقية الصارمة التي تحكم لجوء رجل الدرك لاستعمال "القوة المشروعة" (Force légitime) عند تنفيذ مهامه؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['مشروعية وتناسب استخدام القوة', 'حقوق الإنسان وحماية الحريات'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 3.0 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 }
    ],
    explication: 'استخدام القوة يجب أن يخضع دائماً لمبادئ: الشرعية القانونية (Légalité)، والضرورة القصوى (Nécessité)، والتناسب الدقيق مع حجم الخطر (Proportionnalité)، والتوقف الفوري بمجرد زوال التهديد.',
    options: [
      { id: 13701, lettre: 'A', lettre_ar: 'أ', texte: 'استخدام القوة المفرطة ضد أي شخص لا يبتسم لرجال الدورية', estCorrecte: false },
      { id: 13702, lettre: 'B', lettre_ar: 'ب', texte: 'مبادئ الشرعية، والضرورة الملحة، والتناسب الصارم مع حجم الخطر القائم، والتوقف فور زوال التهديد', estCorrecte: true },
      { id: 13703, lettre: 'C', lettre_ar: 'ج', texte: 'استعمال السلاح الناري في جميع الحالات البسيطة لتوفير وقت التحقيق', estCorrecte: false },
      { id: 13704, lettre: 'D', lettre_ar: 'د', texte: 'الامتناع المطلق عن لمس أي مجرم حتى لو كان يطلق النار على المواطنين', estCorrecte: false }
    ]
  },
  {
    id: 138,
    code: 'Q-DIS-138',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE',
    texte: 'عاد دركي إلى منزله بعد المشاركة في عملية حساسة لتفكيك شبكة تهريب دولية لم يتم الإعلان عنها بعد. سألته زوجته وأقاربه بفضول عن سبب تأخره وماهية العملية. كيف يتعامل مع هذا الموقف؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['كتمان أسرار الدفاع والأمن', 'الفصل الحازم بين العمل والحياة الأسرية'],
    specialites_ponderation: [
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 }
    ],
    explication: 'الحفاظ الصارم على كتمان السر المهني العسكري حتى داخل الدائرة الأسرية؛ التوضيح بلباقة ومودة أن طبيعة المهام تحظر الخوض في التفاصيل العملياتية حماية لأمن الوطن وسلامة الأسرة ذاتها.',
    options: [
      { id: 13801, lettre: 'A', lettre_ar: 'أ', texte: 'سرد كافة التفاصيل وأسماء المتورطين وخطة الهجوم كاملة أثناء تناول العشاء', estCorrecte: false },
      { id: 13802, lettre: 'B', lettre_ar: 'ب', texte: 'الالتزام التام بالسر المهني، والامتناع بحكمة ومودة عن سرد أي معطيات عملياتية تمس سرية المهمة وأمنها', estCorrecte: true },
      { id: 13803, lettre: 'C', lettre_ar: 'ج', texte: 'نشر صور المحجوزات في مجموعة الدردشة العائلية على الواتساب', estCorrecte: false },
      { id: 13804, lettre: 'D', lettre_ar: 'د', texte: 'دعوة أفراد العائلة للحضور في الغد لمشاهدة التحقيق مع المشتبه بهم', estCorrecte: false }
    ]
  },
  {
    id: 139,
    code: 'Q-DIS-139',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE',
    texte: 'أثناء ضبط حركة المرور، قام سائق غاضب بتوجيه شتائم نابية ومستفزة للدركي أمام الملأ. ما هو التصرف الاحترافي والمنضبط لمواجهة هذا الموقف؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['ضبط النفس والتحكم في الغضب', 'الردع القانوني لجريمة إهانة موظف عمومي'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 3.0 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 2.5 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 }
    ],
    explication: 'التحلي بأعلى درجات ضبط النفس وعدم النزول لمستوى الشتم أو العنف البدني، وتثبيت واقعة "إهانة موظف عمومي أثناء قيامه بمهامه" قانونياً عبر الشهود والمحضر وإحالة المعتدي للعدالة.',
    options: [
      { id: 13901, lettre: 'A', lettre_ar: 'أ', texte: 'تبادل السباب والشتائم والاشتباك معه بالأيدي أمام الجمهور', estCorrecte: false },
      { id: 13902, lettre: 'B', lettre_ar: 'ب', texte: 'الحفاظ على الهدوء والوقار التام، وتثبيت جنحة إهانة موظف عمومي في محضر رسمي وتحريك المسطرة القضائية بصرامة', estCorrecte: true },
      { id: 13903, lettre: 'C', lettre_ar: 'ج', texte: 'البكاء وترك مكان الخدمة والذهاب للمنزل فوراً', estCorrecte: false },
      { id: 13904, lettre: 'D', lettre_ar: 'د', texte: 'تحطيم سيارة السائق بواسطة السلاح الوظيفي في الشارع العام', estCorrecte: false }
    ]
  },
  {
    id: 140,
    code: 'Q-DIS-140',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE',
    texte: 'ما هو المعنى السامي لشعار الدرك الملكي الخالد "الله - الوطن - الملك" في وجدان وسلوك كل تلميذ ودركي في كل الميادين؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['العقيدة العسكرية والروح الوطنية', 'الالتزام التام بثوابت الأمة والواجب المقدس'],
    specialites_ponderation: [
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 3.0 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 3.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.0 }
    ],
    explication: 'الشعار يجسد العقيدة الوطنية الراسخة: الإخلاص لله في أداء الأمانة، والتضحية والذود عن حوزة الوطن وسلامة أراضيه، والوفاء الدائم والولاء المطلق للقائد الأعلى ورئيس أركان الحرب العامة للقوات المسلحة الملكية.',
    options: [
      { id: 14001, lettre: 'A', lettre_ar: 'أ', texte: 'مجرد عبارة شكلية تُكتب على الأوراق الرسمية دون أي التزام روحي أو وطني', estCorrecte: false },
      { id: 14002, lettre: 'B', lettre_ar: 'ب', texte: 'العقيدة الوطنية الراسخة للإخلاص، والتفاني في خدمة المواطنين، والذود عن حوزة الوطن، والولاء التام للملك', estCorrecte: true },
      { id: 14003, lettre: 'C', lettre_ar: 'ج', texte: 'شعار يتم تذكره في أوقات العطلات الرسمية فقط', estCorrecte: false },
      { id: 14004, lettre: 'D', lettre_ar: 'د', texte: 'عبارة خاصة بكتب التاريخ المدرسي القديم', estCorrecte: false }
    ]
  }
];
