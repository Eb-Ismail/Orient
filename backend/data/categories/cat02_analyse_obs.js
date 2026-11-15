// ==============================================================================
// الفئة 2: التحليل والملاحظة (15 سؤال - من 21 إلى 35)
// ==============================================================================

export const questionsAnalyseObservation = [
  {
    id: 21,
    code: 'Q-OBS-021',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'ANALYSE_OBSERVATION',
    texte: 'أثناء تفقد مسرح جريمة سرقة خزنة حديدية، لاحظ المحقق: غياب أي أثر للكسر أو العنف على الأبواب الخارجية، وجود مفتاح أصلي مكسور داخل قفل الخزنة، وتناثر غبار البناء على الأرضية فقط بجوار الخزنة مع نظافة باقي الغرفة تماماً. ما هو الاستنتاج التحليلي الأقوى الذي يوجه التحري؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['تحليل مسرح الجريمة', 'استخلاص القرائن المادية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.0 }
    ],
    explication: 'غياب الكسر في المنافذ الخارجية وتواجد مفتاح أصلي مكسور مع حصر الآثار بجانب الخزنة يوحي بوجود شخص له إمكانية الولوج المسبق أو محاولة تصنيع مسرح وهمي من طرف شخص من داخل المبنى.',
    options: [
      { id: 2101, lettre: 'A', lettre_ar: 'أ', texte: 'الجريمة نفذتها عصابة خارجية اقتحمت المبنى بأسلحة ثقيلة عبر السطح', estCorrecte: false },
      { id: 2102, lettre: 'B', lettre_ar: 'ب', texte: 'هناك احتمال قوي لتواطؤ داخلي أو حيازة الفاعل لمفاتيح رسمية مسبقاً', estCorrecte: true },
      { id: 2103, lettre: 'C', lettre_ar: 'ج', texte: 'الحادث مجرد إهمال عابر ولا توجد أي جريمة يعاقب عليها القانون', estCorrecte: false },
      { id: 2104, lettre: 'D', lettre_ar: 'د', texte: 'الغبار يدل يقيناً على أن السرقة تمت قبل أكثر من عشر سنوات', estCorrecte: false }
    ]
  },
  {
    id: 22,
    code: 'Q-OBS-022',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'ANALYSE_OBSERVATION',
    texte: 'في حادثة سير على طريق سريع جاف، وجدت آثار كبح متصلة لإطارات السيارة بطول 45 متراً قبل نقطة الاصطدام بالحاجز، مع ملاحظة أن أثر الإطار الأيمن الخلفي متعرج ومتقطع. ما الذي تكشفه هذه الملاحظة الفنية الدقيقة؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['المعاينة الفنية لحوادث السير', 'قراءة الآثار والفرملة'],
    specialites_ponderation: [
      { code: 'SPEC-ROUTE', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'الأثر المتقطع والمتعرج لإطار معين أثناء الكبح الشديد يشير إلى خلل ميكانيكي بنظام الفرامل أو انفجار/فقدان ضغط الإطار قبل أو أثناء الضغط الحاد على المكابح.',
    options: [
      { id: 2201, lettre: 'A', lettre_ar: 'أ', texte: 'السيارة كانت تسير بسرعة بطيئة جداً لا تتجاوز 20 كم/س', estCorrecte: false },
      { id: 2202, lettre: 'B', lettre_ar: 'ب', texte: 'احتمال انفجار الإطار الأيمن الخلفي أو وجود عيب حاد في توازن المكابح', estCorrecte: true },
      { id: 2203, lettre: 'C', lettre_ar: 'ج', texte: 'السائق كان يقود في الاتجاه المعاكس وبأضواء معطلة حتماً', estCorrecte: false },
      { id: 2204, lettre: 'D', lettre_ar: 'د', texte: 'الطريق كان مغموراً بالمياه الزلقة رغم الجفاف الظاهري', estCorrecte: false }
    ]
  },
  {
    id: 23,
    code: 'Q-OBS-023',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'ANALYSE_OBSERVATION',
    texte: 'خلال مراقبة سرية لمستودع معزول يشتبه في استعماله لتهريب البضائع، سجلت الملاحظة دخول ثلاث شاحنات محملة وخروجها فارغة في أوقات متفرقة، دون تفريغ أي سلعة في الساحة الخارجية. ما الفرضية العملياتية الواجب التحقق منها أولاً؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['المراقبة الميدانية والتحري', 'تقدير الأنماط المشبوهة'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 1.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 }
    ],
    explication: 'دخول شاحنات محملة وخروجها فارغة دون ظهور بضائع بالخارج يدل على وجود فضاءات تخزين داخلية واسعة، مخابئ سرية تحت الأرض، أو عمليات شحن فورية في مركبات أصغر داخل المستودع المغلق.',
    options: [
      { id: 2301, lettre: 'A', lettre_ar: 'أ', texte: 'المستودع مغلق نهائياً والشاحنات ضلت طريقها صدفة', estCorrecte: false },
      { id: 2302, lettre: 'B', lettre_ar: 'ب', texte: 'وجود نشاط تفريغ داخلي منظم أو مخابئ تخزين تحت أرضية داخل المستودع', estCorrecte: true },
      { id: 2303, lettre: 'C', lettre_ar: 'ج', texte: 'الشاحنات كانت فارغة عند الدخول وممتلئة عند الخروج', estCorrecte: false },
      { id: 2304, lettre: 'D', lettre_ar: 'د', texte: 'إنهاء المراقبة فوراً لعدم ارتكاب جنحة في الشارع العام', estCorrecte: false }
    ]
  },
  {
    id: 24,
    code: 'Q-OBS-024',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'ANALYSE_OBSERVATION',
    texte: 'أثناء فحص شريط كاميرا مراقبة لشارع تجاري وقع به سطو، ظهر شخص يرتدي معطفاً سميكاً في يوم صيفي حار، ويمشي بخطوات غير متناسقة مع وضع يده اليمنى باستمرار داخل جيبه الداخلي. ما التفسير الأمني الأكثر رجاحات؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الملاحظة السلوكية', 'استكشاف لغة الجسد الأمنية'],
    specialites_ponderation: [
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.5 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'ارتداء ملابس غير متناسبة مع الطقس (معطف في الصيف) مع تثبيت اليد بالجيب يدل سلوكياً وميدانياً على محاولة إخفاء سلاح، أداة سطو، أو مسروقات ضخمة.',
    options: [
      { id: 2401, lettre: 'A', lettre_ar: 'أ', texte: 'الشخص يشعر بالبرد الشديد فقط بسبب مكيفات المتاجر المجاورة', estCorrecte: false },
      { id: 2402, lettre: 'B', lettre_ar: 'ب', texte: 'احتمال إخفاء سلاح أو أداة ممنوعة تحت المعطف ومحاولة تثبيتها باليد', estCorrecte: true },
      { id: 2403, lettre: 'C', lettre_ar: 'ج', texte: 'الشخص سائح أجنبي لا يعرف درجات الحرارة المحلية', estCorrecte: false },
      { id: 2404, lettre: 'D', lettre_ar: 'د', texte: 'سلوك طبيعي تماماً لا يستدعي أي اهتمام أمني', estCorrecte: false }
    ]
  },
  {
    id: 25,
    code: 'Q-OBS-025',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'ANALYSE_OBSERVATION',
    texte: 'بمقارنة إفادات شاهدين حول لون سيارة فرت بعد ارتكاب حادث: الشاهد الأول ذكر أنها خضراء داكنة، والشاهد الثاني ذكر أنها زرقاء داكنة، وكلاهما رأى السيارة تحت أضواء أعمدة الإنارة الصفراء (الصوديوم) ليلاً. كيف يفسر المحلل الأمني هذا التباين؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['تحليل الشهادات', 'الإدراك البصري في البيئات المظلمة'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.0 }
    ],
    explication: 'مصابيح الصوديوم الصفراء تشوه تمييز الألوان الداكنة بين الأزرق والأخضر والرمادي القاتم، مما يجعل التناقض ناتجاً عن الخداع البصري للإنارة وليس بالضرورة شهادة زور.',
    options: [
      { id: 2501, lettre: 'A', lettre_ar: 'أ', texte: 'أحد الشاهدين متواطئ حتماً ويجب توقيفه فوراً بتهمة التضليل', estCorrecte: false },
      { id: 2502, lettre: 'B', lettre_ar: 'ب', texte: 'أضواء الصوديوم الصفراء ليلاً تدمج وتغير إدراك الألوان الداكنة كالزيتي والأزرق', estCorrecte: true },
      { id: 2503, lettre: 'C', lettre_ar: 'ج', texte: 'السيارة المذكورة تم تغيير طلائها بتقنية الليزر أثناء سيرها', estCorrecte: false },
      { id: 2504, lettre: 'D', lettre_ar: 'د', texte: 'يجب إلغاء الحادث برمته واستبعاد كل الشهادات', estCorrecte: false }
    ]
  },
  {
    id: 26,
    code: 'Q-OBS-026',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'ANALYSE_OBSERVATION',
    texte: 'عند تفتيش سيارة مشبوهة، لاحظ الدركي أن مسامير تثبيت لوحة الترقيم جديدة تماماً ولا يعلوها أي غبار، في حين أن هيكل السيارة متسخ ومغطى بطبقة سميكة من الأوحال القديمة. ما الدلالة الاستقرائية الأولى؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['فحص المركبات المشبوهة', 'ملاحظة التناقضات المادية'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-ROUTE', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'التناقض بين حداثة تثبيت مسامير اللوحة وقدم الأوساخ على الهيكل يشير بقوة إلى استبدال لوحة الترقيم مؤخراً، مما يرفع شبهة استخدام صفائح مزورة أو سرقة المركبة.',
    options: [
      { id: 2601, lettre: 'A', lettre_ar: 'أ', texte: 'صاحب السيارة حريص جداً على نظافة البراغي فقط دون الهيكل', estCorrecte: false },
      { id: 2602, lettre: 'B', lettre_ar: 'ب', texte: 'احتمال استبدال لوحات الترقيم حديثاً لإخفاء هوية المركبة الحقيقية', estCorrecte: true },
      { id: 2603, lettre: 'C', lettre_ar: 'ج', texte: 'السيارة تم استيرادها صباح اليوم من مصنع التجميع مباشرة', estCorrecte: false },
      { id: 2604, lettre: 'D', lettre_ar: 'د', texte: 'المسامير الحديثة تزيد من سرعة محرك السيارة تلقائياً', estCorrecte: false }
    ]
  },
  {
    id: 27,
    code: 'Q-OBS-027',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'ANALYSE_OBSERVATION',
    texte: 'في جدول زمني للمكالمات الهاتفية الهاتفية لشخص مشتبه به، لوحظ انقطاع تام للمكالمات بين الساعة 02:00 و 04:30 صباحاً، بينما كان الهاتف يستقبل رسائل قصيرة تسجل في برج اتصالات يبعد 80 كيلومتراً عن مقر سكنه. ماذا تستنتج تحليلياً؟',
    difficulte: 'صعب',
    difficulte_code: 'AVANCE',
    coefficient: 2.0,
    competences: ['التحليل الجنائي للبيانات التقنية', 'تقاطع المؤشرات الجغرافية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.0 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 1.5 }
    ],
    explication: 'التقاط الرسائل عبر برج اتصالات يبعد 80 كلم يثبت مادياً تواجد الهاتف (وصاحبه المحتمل) خارج نطاق إقامته المعتادة أثناء تلك الفترة الزمنية، وهو ما يدحض ادعاءه بالتواجد في المنزل.',
    options: [
      { id: 2701, lettre: 'A', lettre_ar: 'أ', texte: 'الهاتف كان في غرفة نوم المشتبه به طوال الليل حتماً', estCorrecte: false },
      { id: 2702, lettre: 'B', lettre_ar: 'ب', texte: 'الجهاز تواجد فعلياً أو تم نقله إلى نطاق جغرافي آخر يبعد 80 كم خلال تلك الفترة', estCorrecte: true },
      { id: 2703, lettre: 'C', lettre_ar: 'ج', texte: 'أبراج الاتصالات تغير مواقعها الجغرافية تلقائياً بعد منتصف الليل', estCorrecte: false },
      { id: 2704, lettre: 'D', lettre_ar: 'د', texte: 'لا يمكن الاعتماد على أبراج الاتصالات إطلاقاً في التحقيقات الحديثة', estCorrecte: false }
    ]
  },
  {
    id: 28,
    code: 'Q-OBS-028',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'ANALYSE_OBSERVATION',
    texte: 'أثناء استطلاع ميداني لحماية موكب رسمي، لاحظت وجود طائرة بدون طيار (درون) صغيرة مدنية تحوم على ارتفاع 50 متراً فوق المسار المحدد للموكب قبل وصوله بعشر دقائق. ما هو التقييم الفوري للتهديد؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['تقييم المخاطر الأمنية', 'حماية الشخصيات والمواكب'],
    specialites_ponderation: [
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.5 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 }
    ],
    explication: 'تحليق درون غير مصرح به فوق مسار موكب رسمي يعتبر تهديداً جوياً محتملاً للمراقبة أو الهجوم، ويستوجب تفعيل بروتوكول التشويش الفوري وتغيير المسار إذا لزم الأمر.',
    options: [
      { id: 2801, lettre: 'A', lettre_ar: 'أ', texte: 'تجاهلها لأنها طائرة صغيرة ولا يمكن أن تشكل أي خطر أمني', estCorrecte: false },
      { id: 2802, lettre: 'B', lettre_ar: 'ب', texte: 'اعتبارها خرقاً أمنياً وتهديداً محتملاً يستوجب الإبلاغ الفوري وتفعيل إجراءات الحماية والتحييد', estCorrecte: true },
      { id: 2803, lettre: 'C', lettre_ar: 'ج', texte: 'الانتظار حتى انتهاء مرور الموكب ثم البحث عن المشغل', estCorrecte: false },
      { id: 2804, lettre: 'D', lettre_ar: 'د', texte: 'إيقاف الموكب وتركه في مكانه في العراء لحين هبوط الطائرة', estCorrecte: false }
    ]
  },
  {
    id: 29,
    code: 'Q-OBS-029',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'ANALYSE_OBSERVATION',
    texte: 'عند فحص وثيقة تعريف بيومترية لأحد الأشخاص في نقطة مراقبة، لاحظ الدركي أن الصورة الشخصية تظهر انعكاس ضوء خفيف عند حوافها فقط، مع سماكة غير متجانسة في زاوية البطاقة البلاستيكية. ما الإجراء التحليلي الصائب؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['كشف تزوير الوثائق', 'الفحص الدقيق للهويات'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 },
      { code: 'SPEC-ROUTE', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 }
    ],
    explication: 'سماكة غير متجانسة وانعكاس غير طبيعي عند حواف الصورة يشير إلى إمكانية تقشير الغشاء البلاستيكي واستبدال الصورة الأصلية بصورة مزورة (Substitution de photo).',
    options: [
      { id: 2901, lettre: 'A', lettre_ar: 'أ', texte: 'إعادة الوثيقة فوراً للشخص مع الاعتذار له عن التأخير', estCorrecte: false },
      { id: 2902, lettre: 'B', lettre_ar: 'ب', texte: 'الاشتباه القوي في تزوير البطاقة عبر تغيير الصورة، وإخضاعها للفحص التقني والتدقيق في قواعد البيانات', estCorrecte: true },
      { id: 2903, lettre: 'C', lettre_ar: 'ج', texte: 'تمزيق البطاقة وتسليمه وصلاً خطياً بدلاً منها', estCorrecte: false },
      { id: 2904, lettre: 'D', lettre_ar: 'د', texte: 'اعتبار العيب عادياً ناتجاً فقط عن الغسيل بالماء والصابون', estCorrecte: false }
    ]
  },
  {
    id: 30,
    code: 'Q-OBS-030',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'ANALYSE_OBSERVATION',
    texte: 'في مستودع جمركي مغلق، تظهر سجلات الوزن أن حاوية مسجلة على أنها تحتوي على "قطع غيار بلاستيكية خفيفة" يبلغ وزنها الإجمالي 18 طناً، بينما حاوية مماثلة بنفس الحجم والمحتوى المعلن لا تتعدى عادة 5 أطنان. ما هو التحليل المنطقي السليم؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['تحليل التناقضات اللوجستية', 'مكافحة التهريب'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'الفارق الهائل في الوزن (18 طناً مقابل 5 أطنان) للبضاعة ذاتها يعتبر مؤشراً لا يقبل الشك على وجود مواد غير مصرح بها، ثقيلة الوزن (معادن، أسلحة، أو مخدرات مخبأة).',
    options: [
      { id: 3001, lettre: 'A', lettre_ar: 'أ', texte: 'البلاستيك أصبح ثقيلاً بسبب برودة الطقس داخل الميناء', estCorrecte: false },
      { id: 3002, lettre: 'B', lettre_ar: 'ب', texte: 'وجود تزوير في التصريح الجمركي أو إخفاء بضائع ثقيلة غير مصرح بها داخل الشحنة', estCorrecte: true },
      { id: 3003, lettre: 'C', lettre_ar: 'ج', texte: 'الميزان الجمركي مبرمج لإضافة 13 طناً كإجراء روتيني', estCorrecte: false },
      { id: 3004, lettre: 'D', lettre_ar: 'د', texte: 'الحاوية تحتوي على هواء مضغوط ثقيل جداً', estCorrecte: false }
    ]
  },
  {
    id: 31,
    code: 'Q-OBS-031',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'ANALYSE_OBSERVATION',
    texte: 'عند استجواب متهم في قضية سطو ليلي، لاحظ المحقق أن المتهم ينظر بشكل متكرر إلى زاوية الغرفة اليمنى العليا قبل كل إجابة، ويبلل شفتيه بكثرة، ويغير وضعية جلوسه كلما سئل عن مكان إخفاء الأموال. ماذا تعكس هذه الإشارات السلوكية؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['تقييم السلوك أثناء الاستماع', 'استكشاف علامات التوتر'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.0 }
    ],
    explication: 'جفاف الحلق (تبليل الشفاه المستمر)، والتململ الجسدي، وتكرار النظر للأعلى عند طرح أسئلة حساسة هي مؤشرات فسيولوجية دالة على الضغط النفسي الشديد ومحاولة تركيب إجابات مختلقة.',
    options: [
      { id: 3101, lettre: 'A', lettre_ar: 'أ', texte: 'المتهم يشعر بالنعاس التام ويرغب في النوم فوراً', estCorrecte: false },
      { id: 3102, lettre: 'B', lettre_ar: 'ب', texte: 'مؤشرات قلق وتوتر نفسي مرتفع ومحاولة ابتكار إجابات غير عفوية حول نقطة النزاع', estCorrecte: true },
      { id: 3103, lettre: 'C', lettre_ar: 'ج', texte: 'دليل قاطع على البراءة التامة دون حاجة لأي دليل آخر', estCorrecte: false },
      { id: 3104, lettre: 'D', lettre_ar: 'د', texte: 'علامات تدل على إصابة المتهم بضعف في عضلات الرقبة', estCorrecte: false }
    ]
  },
  {
    id: 32,
    code: 'Q-OBS-032',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'ANALYSE_OBSERVATION',
    texte: 'في موقع اقتحام متجر للمجوهرات، تم العثور على شظايا زجاجية مبعثرة بنسبة 90% خارج المتجر على الرصيف، وبنسبة 10% فقط داخل صالة العرض. ما هو التحليل الفيزيائي لاتجاه قوة الكسر؟',
    difficulte: 'صعب',
    difficulte_code: 'AVANCE',
    coefficient: 2.0,
    competences: ['الشرطة العلمية والتقنية', 'تحليل تناثر الزجاج والمقذوفات'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.5 }
    ],
    explication: 'وفق قوانين الديناميكا والشرطة العلمية، يتناثر الزجاج دائماً في اتجاه القوة المطبقة. تناثره نحو الخارج يعني أن مصدر الضربة أو الانفجار كان من داخل المحل باتجاه الشارع وليس العكس.',
    options: [
      { id: 3201, lettre: 'A', lettre_ar: 'أ', texte: 'الزجاج كُسر من الشارع الخارجي باتجاه الداخل بواسطة حجر ثقيل', estCorrecte: false },
      { id: 3202, lettre: 'B', lettre_ar: 'ب', texte: 'قوة الكسر أو الدفع طُبقت من داخل المحل نحو الخارج (عمل داخلي أو هروب)', estCorrecte: true },
      { id: 3203, lettre: 'C', lettre_ar: 'ج', texte: 'الرياح الطبيعية حملت الزجاج الثقيل إلى الخارج صدفة', estCorrecte: false },
      { id: 3204, lettre: 'D', lettre_ar: 'د', texte: 'الزجاج تفتت تلقائياً بسبب جودة تصنيعه العالية', estCorrecte: false }
    ]
  },
  {
    id: 33,
    code: 'Q-OBS-033',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'ANALYSE_OBSERVATION',
    texte: 'خلال تحليل صور الأقمار الاصطناعية لمنطقة غابوية نائية، لوحظ ظهور مسلك ترابي جديد يمتد لمسافة 3 كيلومترات لم يكن موجوداً قبل أسبوعين، وينتهي بساحة مسيجة وسط الأشجار الكثيفة. ما الإجراء الميداني الأنسب؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['تحليل الصور الجوية والخرائط', 'الاستطلاع الميداني'],
    specialites_ponderation: [
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.5 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'استحداث مسلك جديد بسرعة في منطقة نائية ينتهي بموقع مسيج يشير إلى نشاط سري غير مصرح به (زراعة ممنوعة، تهريب، أو منشأة غير قانونية)، مما يستدعي استطلاعاً جوياً وبرياً منسقاً.',
    options: [
      { id: 3301, lettre: 'A', lettre_ar: 'أ', texte: 'إهمال الملاحظة لأن فتح الطرق من اختصاص مصالح الطرق العامة فقط', estCorrecte: false },
      { id: 3302, lettre: 'B', lettre_ar: 'ب', texte: 'برمجة مهمة استطلاع ميدانية متأنية والتحقق من قانونية النشاط والتراخيص', estCorrecte: true },
      { id: 3303, lettre: 'C', lettre_ar: 'ج', texte: 'إرسال دورية فردية واحدة دون سلاح للتحقق الودي', estCorrecte: false },
      { id: 3304, lettre: 'D', lettre_ar: 'د', texte: 'افتراض أن الحيوانات البرية هي التي مهدت المسلك بنفسها', estCorrecte: false }
    ]
  },
  {
    id: 34,
    code: 'Q-OBS-034',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'ANALYSE_OBSERVATION',
    texte: 'عند مقارنة بصمتي أصابع مرفوعتين من مسرح الجريمة، وجد الخبير 8 نقاط تشابه مميزة (Minuties) دون أي نقطة اختلاف، لكن إحدى البصمتين مشوهة جزئياً في مركز الدوامة. ما هو الموقف الفني الصائب؟',
    difficulte: 'صعب',
    difficulte_code: 'AVANCE',
    coefficient: 2.0,
    competences: ['تحقيق الهوية البيومترية', 'مطابقة البصمات الجنائية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.5 }
    ],
    explication: 'في المعايير الجنائية، يلزم توافر عدد محدد من نقاط التطابق الكاملة (غالباً 12 نقطة فأكثر وفق المعايير الدولية) للجزم القطعي بالهوية القضائية، وما دون ذلك يبقى قرينة قوية تتطلب تدعيماً ولا ترقى للحكم القاطع بمفردها.',
    options: [
      { id: 3401, lettre: 'A', lettre_ar: 'أ', texte: 'الجزم المطلق بتطابق الشخص وإغلاق الملف فوراً', estCorrecte: false },
      { id: 3402, lettre: 'B', lettre_ar: 'ب', texte: 'اعتبارها قرينة مشجعة للبحث ولكنها غير كافية بمفردها للجزم القاطع دون الوصول للحد الأدنى من النقاط القانونية', estCorrecte: true },
      { id: 3403, lettre: 'C', lettre_ar: 'ج', texte: 'استبعاد البصمة ورميها لأن 8 نقاط تعني انعدام القيمة تماماً', estCorrecte: false },
      { id: 3404, lettre: 'D', lettre_ar: 'د', texte: 'مطابقة البصمة مع والد المتهم بدلاً منه', estCorrecte: false }
    ]
  },
  {
    id: 35,
    code: 'Q-OBS-035',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'ANALYSE_OBSERVATION',
    texte: 'أثناء تفكيك شبكة تهريب دولية، لوحظ أن جميع التحويلات المالية تتم بمبالغ متطابقة بالضبط (9,950 درهم) تفصل بين كل عملية وأخرى 24 ساعة، وتوزع على عدة حسابات بنكية مختلفة. ما التفسير التحليلي المالي لهذا النمط؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['التحري المالي ومكافحة غسل الأموال', 'رصد العمليات المشبوهة'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.0 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 1.5 }
    ],
    explication: 'هذا النمط معروف في الجرائم المالية باسم "التفتيت أو الهيكلة" (Smurfing/Structuring)، حيث تعمد الشبكات إلى تحويل مبالغ تقل قليلاً عن عتبة التصريح الإجباري بالاشتباه (10,000 درهم مثلاً) لتفادي تنبيه أنظمة الرقابة البنكية.',
    options: [
      { id: 3501, lettre: 'A', lettre_ar: 'أ', texte: 'مجرد مصادفة بنكية بريئة لتسديد نفقات التغذية اليومية للشبكة', estCorrecte: false },
      { id: 3502, lettre: 'B', lettre_ar: 'ب', texte: 'تقنية تجزئة ممنهجة للأموال (Smurfing) لتفادي عتبات المراقبة والإشعار التلقائي بالاشتباه', estCorrecte: true },
      { id: 3503, lettre: 'C', lettre_ar: 'ج', texte: 'خلل في برمجة أجهزة الصراف الآلي للبنوك', estCorrecte: false },
      { id: 3504, lettre: 'D', lettre_ar: 'د', texte: 'تطبيق للقانون الضريبي الذي يمنع تجاوز 10 آلاف درهم', estCorrecte: false }
    ]
  }
];
