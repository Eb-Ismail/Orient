// ==============================================================================
// الفئة 6: الشرطة القضائية والتحري (15 سؤال - من 81 إلى 95)
// ==============================================================================

export const questionsPjEnquete = [
  {
    id: 81,
    code: 'Q-ENQ-081',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'PJ_ENQUETE',
    texte: 'عند الوصول إلى مسرح جريمة قتل غامضة في شقة سكنية، ما هو الالتزام القانوني والمهني الأول لضابط الشرطة القضائية قبل الشروع في أي بحث؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['تجميد وحماية مسرح الجريمة', 'الحفاظ على الآثار والأدلة المادية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 2.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'تجميد وحماية مسرح الجريمة (Gel des lieux) بضرب شريط أمني عازل ومنع دخول أي شخص غير مختص لتفادي تلويث أو إتلاف الآثار المادية والبيولوجية قبل وصول الشرطة العلمية والتقنية.',
    options: [
      { id: 8101, lettre: 'A', lettre_ar: 'أ', texte: 'تنظيف الأرضية فوراً بالماء ومواد التطهير لراحة المحققين', estCorrecte: false },
      { id: 8102, lettre: 'B', lettre_ar: 'ب', texte: 'تجميد مسرح الجريمة ومنع الولوج إليه ووضع طوق أمني لحماية الأدلة الجنائية من التلوث', estCorrecte: true },
      { id: 8103, lettre: 'C', lettre_ar: 'ج', texte: 'فتح النوافذ وجمع الجيران والأقارب داخل الغرفة لتبادل الآراء', estCorrecte: false },
      { id: 8104, lettre: 'D', lettre_ar: 'د', texte: 'نقل الجثة إلى سيارة الدورية دون إشعار النيابة العامة أو الطبيب الشرعي', estCorrecte: false }
    ]
  },
  {
    id: 82,
    code: 'Q-ENQ-082',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'PJ_ENQUETE',
    texte: 'وفقاً لقانون المسطرة الجنائية، ما هو الإجراء الإلزامي الذي يجب على ضابط الشرطة القضائية القيام به فور وضع شخص تحت تدبير الحراسة النظرية؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['ضمانات الحراسة النظرية وحقوق الإنسان', 'المسطرة الجنائية والشرعية الإجرائية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 }
    ],
    explication: 'إشعار الشخص بدواعي توقيفه وحقوقه القانونية (التزام الصمت، الاتصال بأحد أقربائه، الاستعانة بمحامٍ، والحق في الفحص الطبي) وتدوين ذلك في سجل رسمي ومحضر قانوني.',
    options: [
      { id: 8201, lettre: 'A', lettre_ar: 'أ', texte: 'إجباره على التوقيع على محاضر بيضاء دون قراءتها', estCorrecte: false },
      { id: 8202, lettre: 'B', lettre_ar: 'ب', texte: 'إشعاره بحقوقه القانونية (دواعي التوقيف، الاتصال بالعائلة، طلب محامٍ وفحص طبي) وتدوينها بالسجل', estCorrecte: true },
      { id: 8203, lettre: 'C', lettre_ar: 'ج', texte: 'مصادرة ملابسه وحرمانه من شرب الماء طوال مدة الحراسة', estCorrecte: false },
      { id: 8204, lettre: 'D', lettre_ar: 'د', texte: 'إطلاق سراحه سراً إذا كان ينتمي لنفس المنطقة الجغرافية', estCorrecte: false }
    ]
  },
  {
    id: 83,
    code: 'Q-ENQ-083',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'PJ_ENQUETE',
    texte: 'عند رفع البصمات الإصبعية الكامنة (Empreintes latentes) من على سطح زجاجي ناعم بمسرح الجريمة، ما هي المادة والتقنية التقليدية الفعالة المعتمدة من طرف تقنيي الشرطة العلمية؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['الشرطة التقنية والعلمية', 'إظهار ورفع البصمات الجنائية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 1.5 }
    ],
    explication: 'استخدام المساحيق المغناطيسية أو الكربونية المتخصصة عبر فرشاة ريش ناعمة جداً لإظهار الإفرازات الدهنية العرقية المتروكة على الزجاج دون تشويه خطوط الحلمات الجلدية.',
    options: [
      { id: 8301, lettre: 'A', lettre_ar: 'أ', texte: 'فرك الزجاج بقطعة قماش خشنة مبللة بالماء والصابون', estCorrecte: false },
      { id: 8302, lettre: 'B', lettre_ar: 'ب', texte: 'تطبيق المسحوق المغناطيسي أو الكربوني المتخصص بفرشاة رقيقة لكشف الخطوط الحليمية بدقة', estCorrecte: true },
      { id: 8303, lettre: 'C', lettre_ar: 'ج', texte: 'تسخين الزجاج بالنار المباشرة حتى يتصدع', estCorrecte: false },
      { id: 8304, lettre: 'D', lettre_ar: 'د', texte: 'رش الزجاج بطلاء أسود زيتي سميك لإخفاء الآثار', estCorrecte: false }
    ]
  },
  {
    id: 84,
    code: 'Q-ENQ-084',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'PJ_ENQUETE',
    texte: 'ما هي الأوقات القانونية العامة التي يُسمح فيها لضابط الشرطة القضائية بدخول المنازل لتفتيشها في الأحوال العادية وفق قانون المسطرة الجنائية؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['حرمة المسكن والإجراءات التفتيشية', 'المسطرة الجنائية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 }
    ],
    explication: 'القاعدة العامة تصون حرمة المنازل: لا يمكن البدء في تفتيش المنازل أو معاينتها قبل الساعة السادسة صباحاً (06:00) ولا بعد التاسعة ليلاً (21:00)، إلا باستثناءات قانونية محددة حصراً.',
    options: [
      { id: 8401, lettre: 'A', lettre_ar: 'أ', texte: 'بين الساعة 02:00 ليلاً و 05:00 فجراً حصراً', estCorrecte: false },
      { id: 8402, lettre: 'B', lettre_ar: 'ب', texte: 'بين الساعة السادسة صباحاً (06:00) والتاسعة ليلاً (21:00)', estCorrecte: true },
      { id: 8403, lettre: 'C', lettre_ar: 'ج', texte: 'في أي وقت يختاره الضابط دون قيد زمني طوال 24 ساعة', estCorrecte: false },
      { id: 8404, lettre: 'D', lettre_ar: 'د', texte: 'يوم الأحد فقط بين الظهر والعصر', estCorrecte: false }
    ]
  },
  {
    id: 85,
    code: 'Q-ENQ-085',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'PJ_ENQUETE',
    texte: 'لماذا تعد "سلسلة الحراسة والحفظ" (Chaîne de traçabilité des scellés) بالغة الحساسية والأهمية في القضايا الجنائية الكبرى؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['إدارة وتحريز الأدلة الجنائية', 'حماية الحجية القانونية للمحجوزات'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 }
    ],
    explication: 'سلسلة الحفظ توثق هوية كل شخص استلم أو فحص الحرز وتوقيت ذلك لمنع أي شبهة استبدال أو تلاعب أو تلوث، مما يحمي الحجية القانونية للدليل أمام هيئة المحكمة.',
    options: [
      { id: 8501, lettre: 'A', lettre_ar: 'أ', texte: 'لزيادة وزن الحرز والحصول على مكافأة مالية', estCorrecte: false },
      { id: 8502, lettre: 'B', lettre_ar: 'ب', texte: 'لضمان عدم التلاعب بالدليل أو تلويثه وإثبات مشروعيته وسلامته القانونية أمام القضاء', estCorrecte: true },
      { id: 8503, lettre: 'C', lettre_ar: 'ج', texte: 'للسماح للجمهور بالتقاط صور مع الأحراز في المعارض', estCorrecte: false },
      { id: 8504, lettre: 'D', lettre_ar: 'د', texte: 'لبيع الأحراز في المزاد العلني قبل صدور الحكم', estCorrecte: false }
    ]
  },
  {
    id: 86,
    code: 'Q-ENQ-086',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'PJ_ENQUETE',
    texte: 'في تقنيات الاستنطاق الحديثة (مثل نموذج PEACE)، ما هي المرحلة الأساسية التي يجب أن يبدأ بها المحقق قبل توجيه أي أسئلة تفصيلية للمشتبه به؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['تقنيات الاستماع والاستجواب الجنائي', 'التحليل الاستقصائي'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 3.0 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 1.5 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 1.5 }
    ],
    explication: 'إتاحة الفرصة للمستمع إليه لتقديم روايته الحرة والمسترسلة للأحداث (Récit libre) دون مقاطعة لتدوين تفاصيلها، ثم الانتقال لمرحلة فحص التناقضات بالأسئلة الدقيقة.',
    options: [
      { id: 8601, lettre: 'A', lettre_ar: 'أ', texte: 'الصراخ وتهديد المشتبه به بالعقوبات الشديدة لجعله ينهار فوراً', estCorrecte: false },
      { id: 8602, lettre: 'B', lettre_ar: 'ب', texte: 'إتاحة الفرصة للمشتبه به لتقديم سرده الحر والتلقائي للأحداث قبل الانتقال للأسئلة الموجهة', estCorrecte: true },
      { id: 8603, lettre: 'C', lettre_ar: 'ج', texte: 'تلقينه الإجابات التي يرغب المحقق في كتابتها بالمحضر', estCorrecte: false },
      { id: 8604, lettre: 'D', lettre_ar: 'د', texte: 'جعله يقسم على الولاء قبل بدء الجلسة', estCorrecte: false }
    ]
  },
  {
    id: 87,
    code: 'Q-ENQ-087',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'PJ_ENQUETE',
    texte: 'عثر المحقق على بقعة دم رطبة على ملابس ضحية في جريمة اعتداء. كيف يتم أخذ هذه العينة البيولوجية وحفظها بشكل صحيح لتفادي تعفن الحمض النووي (ADN)؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['البيولوجيا الجنائية ورفع عينات ADN', 'الشرطة العلمية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 1.5 }
    ],
    explication: 'رفع العينة بمسحة معقمة وتركها تجف في درجة حرارة الغرفة بعيداً عن الرطوبة والشمس المباشرة، وتوضيبها في مظروف ورقي نافذ للهواء (وليس كيس بلاستيكي خانق يسبب تعفن العينة).',
    options: [
      { id: 8701, lettre: 'A', lettre_ar: 'أ', texte: 'وضع العينة وهي مبللة داخل كيس بلاستيكي محكم الإغلاق وتركها في الشمس الحارة', estCorrecte: false },
      { id: 8702, lettre: 'B', lettre_ar: 'ب', texte: 'أخذ العينة بمسحة معقمة، تجفيفها في الهواء الطلق، وتعبئتها في كيس ورقي جاف وبارد', estCorrecte: true },
      { id: 8703, lettre: 'C', lettre_ar: 'ج', texte: 'غسل بقعة الدم بمحلول الكلور (ماء جافيل) لتطهيرها قبل التحليل', estCorrecte: false },
      { id: 8704, lettre: 'D', lettre_ar: 'د', texte: 'تجميد الملابس في الثلج المباشر مع اللحوم المجمدة', estCorrecte: false }
    ]
  },
  {
    id: 88,
    code: 'Q-ENQ-088',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'PJ_ENQUETE',
    texte: 'أي من العناصر التالية يعد شكلياً وجوهرياً لصحة محضر الاستماع المنجز من طرف ضابط الشرطة القضائية تحت طائلة البطلان؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['صياغة المحاضر الجنائية', 'الشكليات القانونية الإلزامية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.0 }
    ],
    explication: 'المحضر يجب أن يتضمن هوية الضابط وصفته، تاريخ وساعة الإجراء، تلاوة الأقوال على المصرح، وتوقيع المصرح أو الإشارة إلى امتناعه أو عجزه عن التوقيع.',
    options: [
      { id: 8801, lettre: 'A', lettre_ar: 'أ', texte: 'أن يكون المحضر مكتوباً بحبر أحمر حصراً ومزيناً بالرسومات', estCorrecte: false },
      { id: 8802, lettre: 'B', lettre_ar: 'ب', texte: 'ذكر صفة وهوية المحرر، التواريخ والساعات، قراءة الأقوال وتوقيع أو بصمة المصرح والضابط', estCorrecte: true },
      { id: 8803, lettre: 'C', lettre_ar: 'ج', texte: 'إرفاق شهادة ميلاد جد الضابط مع كل محضر استماع', estCorrecte: false },
      { id: 8804, lettre: 'D', lettre_ar: 'د', texte: 'أن تتم طباعة المحضر في مطبعة عمومية خارج المركز', estCorrecte: false }
    ]
  },
  {
    id: 89,
    code: 'Q-ENQ-089',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'PJ_ENQUETE',
    texte: 'أي من الحالات التالية يعتبر حالة "تلبس بالجناية أو الجنحة" (Flagrant délit) تخول لضابط الشرطة القضائية صلاحيات استثنائية فورية؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['أحكام التلبس بالجريمة', 'المسطرة الجنائية وسلطات OPJ'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'حالات التلبس قانوناً: إذا كانت الجريمة ترتكب عيناً أو ارتكبت حديثاً، أو إذا توبع الفاعل بصياح الجمهور إثر ارتكابها، أو إذا وجد بعد وقوعها بوقت قريب حاملاً أسلحة أو أشياء تثبت تورطه.',
    options: [
      { id: 8901, lettre: 'A', lettre_ar: 'أ', texte: 'شكوى شفوية غامضة عن واقعة غير محددة حدثت قبل ثلاث سنوات', estCorrecte: false },
      { id: 8902, lettre: 'B', lettre_ar: 'ب', texte: 'ضبط الفاعل في وقت ارتكاب الفعل الجرمي عيناً أو تتبعه بصياح وصخب الجمهور إثر ارتكابها', estCorrecte: true },
      { id: 8903, lettre: 'C', lettre_ar: 'ج', texte: 'شخص يبدو عليه التعب أثناء تجوله في حديقة عامة', estCorrecte: false },
      { id: 8904, lettre: 'D', lettre_ar: 'د', texte: 'سماع إشاعة غير مؤكدة على تطبيق واتساب', estCorrecte: false }
    ]
  },
  {
    id: 90,
    code: 'Q-ENQ-090',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'PJ_ENQUETE',
    texte: 'عند تنظيم طابور عرض للتشخيص وتعرف الشهود على المشتبه به (Tapissage / Parade d\'identification)، ما الشرط الأساسي لنزاهة العملية وعدم بطلانها؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['إجراءات تشخيص المشتبه بهم', 'نزاهة التحقيق وتفادي التوجيه الإيحائي'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 2.5 }
    ],
    explication: 'وضع المشتبه به مع أشخاص آخرين (أشباه) يتقاربون معه في الملامح، والسن، والطول، والملابس، ودون تقديم أي إيحاء أو إشارة توجيهية للشاهد أثناء المعاينة.',
    options: [
      { id: 9001, lettre: 'A', lettre_ar: 'أ', texte: 'وضع المشتبه به بمفرده مقيداً بالسلاسل والإشارة إليه بالقول "هذا هو المجرم بالتأكيد"', estCorrecte: false },
      { id: 9002, lettre: 'B', lettre_ar: 'ب', texte: 'عرض المشتبه به وسط مجموعة من الأشخاص المماثلين له في السن والهيئة والبنية دون أي توجيه إيحائي', estCorrecte: true },
      { id: 9003, lettre: 'C', lettre_ar: 'ج', texte: 'عرض صورة المشتبه به في التلفاز قبل بدء جلسة التعرف بساعة', estCorrecte: false },
      { id: 9004, lettre: 'D', lettre_ar: 'د', texte: 'جعل الشاهد مغمض العينين تماماً أثناء العرض', estCorrecte: false }
    ]
  },
  {
    id: 91,
    code: 'Q-ENQ-091',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'PJ_ENQUETE',
    texte: 'عند ضبط هاتف ذكي بحوزة مشتبه به رئيسي أثناء مداهمة أمنية، ما الإجراء الفني الفوري لحماية البيانات الرقمية من المسح عن بُعد (Effacement à distance)؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['المحافظة على الأدلة الرقمية', 'التحقيق في الجريمة السيبرانية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.5 }
    ],
    explication: 'عزل الهاتف فوراً عن أي شبكة اتصال بتفعيل "نمط الطيران" أو وضعه داخل غلاف عازل للإشارات الكهرومغناطيسية (Cage de Faraday) لمنع إرسال أمر مسح للذاكرة عبر الإنترنت.',
    options: [
      { id: 9101, lettre: 'A', lettre_ar: 'أ', texte: 'توصيل الهاتف بشبكة الواي فاي العامة للمركز والبدء في تنزيل ألعاب', estCorrecte: false },
      { id: 9102, lettre: 'B', lettre_ar: 'ب', texte: 'عزل الهاتف فوراً عن الشبكات (وضع الطيران أو كيس فاراداي العازل للموجات)', estCorrecte: true },
      { id: 9103, lettre: 'C', lettre_ar: 'ج', texte: 'إدخال رمز سري خاطئ 20 مرة متتالية لقفل الجهاز', estCorrecte: false },
      { id: 9104, lettre: 'D', lettre_ar: 'د', texte: 'رمي الهاتف في إناء ماء بارد لحمايته من الحرارة', estCorrecte: false }
    ]
  },
  {
    id: 92,
    code: 'Q-ENQ-092',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'PJ_ENQUETE',
    texte: 'عند الاستماع إلى طفل قاصر ضحية اعتداء جسدي عنيف، ما هي الشروط المسطرية والنفسية الواجب توفيرها لحماية مصلحة الطفل الفضلى؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['قضاء الأحداث وحماية الطفولة', 'الاستماع الجنائي للفئات الحساسة'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 2.5 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 1.5 }
    ],
    explication: 'الاستماع بحضور الولي الشرعي أو المساعد الاجتماعي، في قاعة ملائمة ومريحة نفسياً، وبأسلوب مبسط يتناسب مع سن الطفل وإدراكه ودون تكرار الأسئلة المسببة للصدمة.',
    options: [
      { id: 9201, lettre: 'A', lettre_ar: 'أ', texte: 'استجواب الطفل في زنزانة الحراسة النظرية وهو مكبل اليدين', estCorrecte: false },
      { id: 9202, lettre: 'B', lettre_ar: 'ب', texte: 'الاستماع إليه في فضاء ملائم ومحفز نفسياً بحضور وليه الشرعي أو مساعد اجتماعي مع مراعاة سنه', estCorrecte: true },
      { id: 9203, lettre: 'C', lettre_ar: 'ج', texte: 'نشر صورة الطفل في وسائل الإعلام لدعوة الجيران لحضور الجلسة', estCorrecte: false },
      { id: 9204, lettre: 'D', lettre_ar: 'د', texte: 'الضغط على الطفل للاعتراف بأنه هو المعتدي على نفسه', estCorrecte: false }
    ]
  },
  {
    id: 93,
    code: 'Q-ENQ-093',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'PJ_ENQUETE',
    texte: 'في عمليات الترصد والمراقبة البصرية (Filature) لشبكة تهريب دولية، ما هي التقنية الأساسية لتفادي "حرق" عناصر المراقبة وكشف أمرهم من طرف المشبوهين؟',
    difficulte: 'صعب',
    difficulte_code: 'DIFFICILE',
    coefficient: 1.5,
    competences: ['تقنيات المراقبة والترصد السري', 'التحريات الميدانية المعقدة'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 3.0 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'اعتماد المراقبة التناوبية متعددة المركبات (Filature en relais)؛ حيث تتغير السيارات والأفراد المتابعون باستمرار وبفواصل مكانية لتفادي إثارة أي شك لدى الهدف.',
    options: [
      { id: 9301, lettre: 'A', lettre_ar: 'أ', texte: 'تشغيل صفارات الإنذار وملاحقة الهدف من مسافة متر واحد فقط طوال الوقت', estCorrecte: false },
      { id: 9302, lettre: 'B', lettre_ar: 'ب', texte: 'اعتماد المراقبة التناوبية المتبادلة بعدة سيارات غير مموهة وتغيير نقاط التتبع باستمرار وبمرونة', estCorrecte: true },
      { id: 9303, lettre: 'C', lettre_ar: 'ج', texte: 'الاتصال بالمشتبه به هاتفياً لإخباره بأنه تحت المراقبة', estCorrecte: false },
      { id: 9304, lettre: 'D', lettre_ar: 'د', texte: 'استخدام سيارة واحدة بلون أحمر فاقع لا تتغير طوال 6 أشهر', estCorrecte: false }
    ]
  },
  {
    id: 94,
    code: 'Q-ENQ-094',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'PJ_ENQUETE',
    texte: 'ما هو السند القانوني الذي يُمكن ضابط الشرطة القضائية من مطالبة شركات الاتصالات بتحديد المواقع الجغرافية وسجلات مكالمات مشتبه به هارب؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['المسائل القانونية في التعقب الإلكتروني', 'السخرة القضائية والأذونات'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 1.5 }
    ],
    explication: 'توجيه تسخير قضائي رسمي (Réquisition judiciaire) بناءً على تعليمات النيابة العامة المختصة أو أمر قضائي صادر عن قاضي التحقيق وفق المقتضيات القانونية الصريحة.',
    options: [
      { id: 9401, lettre: 'A', lettre_ar: 'أ', texte: 'مكالمة هاتفية ودية غير موثقة مع موظف الاستقبال بشركة الاتصالات', estCorrecte: false },
      { id: 9402, lettre: 'B', lettre_ar: 'ب', texte: 'تسخير قضائي كتابي رسمي صادر وفق القانون وبإشراف مباشر من النيابة العامة المختصة', estCorrecte: true },
      { id: 9403, lettre: 'C', lettre_ar: 'ج', texte: 'قرصنة خوادم الشركة بواسطة برامج تجسس مجهولة المصدر', estCorrecte: false },
      { id: 9404, lettre: 'D', lettre_ar: 'د', texte: 'شراء سجلات المكالمات من السوق السوداء', estCorrecte: false }
    ]
  },
  {
    id: 95,
    code: 'Q-ENQ-095',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'PJ_ENQUETE',
    texte: 'في مختبر البالستيك القضائي، كيف يتم إثبات أن رصاصة قاتلة معينة أُطلقت بالذات من مسدس مشتبه به محجوز وليس من أي سلاح آخر مماثل؟',
    difficulte: 'صعب',
    difficulte_code: 'DIFFICILE',
    coefficient: 1.5,
    competences: ['البالستيك المقارن والأسلحة النارية', 'الخبرة الجنائية المخبرية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 2.0 }
    ],
    explication: 'إجراء رمية اختبارية في حوض مائي بالمختبر، ثم مقارنة الخدوش والحلزونات الميكروسكوبية الدقيقة (Stries balistiques) الفريدة لسبطانة السلاح تحت المجهر المقارن.',
    options: [
      { id: 9501, lettre: 'A', lettre_ar: 'أ', texte: 'مقارنة لون غلاف الرصاصة الخارجي بالعين المجردة فقط', estCorrecte: false },
      { id: 9502, lettre: 'B', lettre_ar: 'ب', texte: 'فحص التطابق الميكروسكوبي للخدوش والآثار الميكانيكية الفريدة لسبطانة السلاح بواسطة المجهر المقارن', estCorrecte: true },
      { id: 9503, lettre: 'C', lettre_ar: 'ج', texte: 'استنشاق رائحة البارود في فوهة المسدس بعد أسبوعين من الحادث', estCorrecte: false },
      { id: 9504, lettre: 'D', lettre_ar: 'د', texte: 'وزن المسدس بميزان المطبخ المنزلي', estCorrecte: false }
    ]
  }
];
