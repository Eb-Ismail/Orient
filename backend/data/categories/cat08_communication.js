// ==============================================================================
// الفئة 8: التواصل والتكوين (10 أسئلة - من 111 إلى 120)
// ==============================================================================

export const questionsCommunication = [
  {
    id: 111,
    code: 'Q-COM-111',
    categorie: 'التواصل والتكوين',
    categorie_code: 'COMMUNICATION',
    texte: 'عند تأطير حصة تدريبية ميدانية في الرماية أو التكتيك لفائدة تلاميذ الدرك الملكي، ما هي المنهجية البيداغوجية العسكرية الفعالة لترسيخ المهارة الحركية بأمان تام؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['البيداغوجيا العسكرية والتعليم الفعال', 'نقل المهارات والتأطير الميداني'],
    specialites_ponderation: [
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 3.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'المنهجية النموذجية تعتمد التسلسل: الشرح النظري المبسط، يليه العرض البيداغوجي النموذجي من المؤطر (Démonstration)، ثم التطبيق والمحاكاة الفردية من المتدربين مع التصحيح الفوري للأخطاء.',
    options: [
      { id: 11101, lettre: 'A', lettre_ar: 'أ', texte: 'إعطاء الأسلحة للتلاميذ فوراً دون أي شرح مسبق ليتعلموا من أخطائهم بمفردهم', estCorrecte: false },
      { id: 11102, lettre: 'B', lettre_ar: 'ب', texte: 'التسلسل: الشرح المنهجي، البيان العملي النموذجي، التطبيق الخاضع للمراقبة والتصحيح الفردي المستمر', estCorrecte: true },
      { id: 11103, lettre: 'C', lettre_ar: 'ج', texte: 'الصراخ المتواصل والعقاب البدني العشوائي قبل بدء أي تمرين', estCorrecte: false },
      { id: 11104, lettre: 'D', lettre_ar: 'د', texte: 'قراءة كتاب التدريب بالكامل بصوت منخفض في قاعة مظلمة دون أي تمرين عملي', estCorrecte: false }
    ]
  },
  {
    id: 112,
    code: 'Q-COM-112',
    categorie: 'التواصل والتكوين',
    categorie_code: 'COMMUNICATION',
    texte: 'أثناء حادث بارز ومثير للرأي العام، حاول صحفيون استجواب دركي بالشارع حول تفاصيل التحقيق وهوية الضحايا. ما هو السلوك الإعلامي والقانوني السليم؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['التواصل في الأزمات وحماية سرية التحقيق', 'التقيد بالضوابط الإعلامية المؤسساتية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 2.5 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 }
    ],
    explication: 'احترام السر المهني وسرية البحث القضائي؛ التزام التحفظ والامتناع عن الإدلاء بأي تصريحات غير مرخصة وتوجيه وسائل الإعلام بلباقة إلى الناطق الرسمي المعتمد أو بلاغات النيابة العامة.',
    options: [
      { id: 11201, lettre: 'A', lettre_ar: 'أ', texte: 'تقديم كل أسرار التحقيق وأسماء المشتبه بهم للصحفيين مقابل نشر صورته بالصحف', estCorrecte: false },
      { id: 11202, lettre: 'B', lettre_ar: 'ب', texte: 'الالتزام التام بواجب التحفظ والسر المهني، وتوجيه الصحفيين بلباقة للجهات الإعلامية الرسمية المخولة', estCorrecte: true },
      { id: 11203, lettre: 'C', lettre_ar: 'ج', texte: 'الاعتداء الجسدي على الصحفيين وتحطيم كاميراتهم في الشارع العام', estCorrecte: false },
      { id: 11204, lettre: 'D', lettre_ar: 'د', texte: 'تأليف قصة خيالية طريفة وروايتها للصحفيين لإضحاكهم', estCorrecte: false }
    ]
  },
  {
    id: 113,
    code: 'Q-COM-113',
    categorie: 'التواصل والتكوين',
    categorie_code: 'COMMUNICATION',
    texte: 'تقدم مواطن في حالة صدمة وحزن شديد إلى مكتب الاستقبال بمركز الدرك للإبلاغ عن تعرضه لاعتداء واحتجاز. ما هي المهارة التواصلية الأولى الواجب إظهارها من عنصر الاستقبال؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الاستماع الفعال واستقبال المرتفقين والضحايا', 'الذكاء العاطفي والتواصل المهني'],
    specialites_ponderation: [
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 2.5 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'إظهار الإنصات الإيجابي (Écoute active)، وتهدئة روع الضحية، وتوفير بيئة آمنة وكريمة، والتعامل باحترام وتعاطف إنساني مسؤول قبل الشروع في الإجراءات الإدارية والقضائية.',
    options: [
      { id: 11301, lettre: 'A', lettre_ar: 'أ', texte: 'السخرية منه وتوبيخه على ضعفه وخروجه ليلاً', estCorrecte: false },
      { id: 11302, lettre: 'B', lettre_ar: 'ب', texte: 'حسن الاستقبال، والإنصات الفعال بتقدير وتفهم، وطمأنته وتوفير فضاء لائق لتلقي شكايته بجدية', estCorrecte: true },
      { id: 11303, lettre: 'C', lettre_ar: 'ج', texte: 'تركه ينتظر في الرواق لساعات طويلة والتفرغ للعب على الهاتف', estCorrecte: false },
      { id: 11304, lettre: 'D', lettre_ar: 'د', texte: 'مطالبته بالعودة في الأسبوع القادم لأن المركز مغلق للراحة', estCorrecte: false }
    ]
  },
  {
    id: 114,
    code: 'Q-COM-114',
    categorie: 'التواصل والتكوين',
    categorie_code: 'COMMUNICATION',
    texte: 'في نقل وتوجيه الأوامر التكتيكية قبل انطلاق مهمة أمنية، ما هو الهيكل المعياري المعمول به لضمان شمولية ووضوح أمر العمليات (نموذج SMEAC)؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['صياغة وتمرير الأوامر العسكرية', 'الوضوح الإجرائي والتنسيق التكتيكي'],
    specialites_ponderation: [
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.5 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 1.5 }
    ],
    explication: 'نموذج SMEAC القيادي: الموقف العام (Situation)، المهمة المحددة (Mission)، خطة التنفيذ (Exécution)، الدعم اللوجستي والإداري (Administration)، والقيادة والمواصلات (Commandement).',
    options: [
      { id: 11401, lettre: 'A', lettre_ar: 'أ', texte: 'قول جملة واحدة فقط: "انطلقوا وافعلوا ما يبدو لكم مناسباً"', estCorrecte: false },
      { id: 11402, lettre: 'B', lettre_ar: 'ب', texte: 'الموقف والبيئة (S)، المهمة (M)، التنفيذ والمراحل (E)، الإسناد اللوجستي (A)، والقيادة والاتصالات (C)', estCorrecte: true },
      { id: 11403, lettre: 'C', lettre_ar: 'ج', texte: 'كتابة قصيدة شعرية حماسية دون أي تفاصيل جغرافية أو أمنية', estCorrecte: false },
      { id: 11404, lettre: 'D', lettre_ar: 'د', texte: 'الانتظار حتى انتهاء العملية ثم إخبار العناصر بما كان يجب عليهم فعله', estCorrecte: false }
    ]
  },
  {
    id: 115,
    code: 'Q-COM-115',
    categorie: 'التواصل والتكوين',
    categorie_code: 'COMMUNICATION',
    texte: 'ما هو الهدف الجوهري من جلسة "استخلاص الدروس والتقييم اللاحق" (Retour d\'expérience - RETEX) المنظمة مباشرة بعد انتهاء عملية أمنية معقدة؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['ثقافة التعلم المؤسساتي والتقييم البناء', 'التطوير المستمر للكفاءات'],
    specialites_ponderation: [
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 3.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 }
    ],
    explication: 'تحليل مجريات التدخل بموضوعية، وتشخيص نقاط القوة لترسيخها، وتحديد النقائص لتفادي تكرارها وتطوير المهارات التكتيكية للفريق، وليس البحث عن كبش فداء أو التوبيخ الشخصي.',
    options: [
      { id: 11501, lettre: 'A', lettre_ar: 'أ', texte: 'توبيخ وإهانة العناصر الأقل خبرة أمام زملائهم لكسر معنوياتهم', estCorrecte: false },
      { id: 11502, lettre: 'B', lettre_ar: 'ب', texte: 'التحليل الموضوعي للإيجابيات والنواقص العملياتية بهدف تحسين الأداء الجماعي وتحديث بروتوكولات التدخل المستقبلي', estCorrecte: true },
      { id: 11503, lettre: 'C', lettre_ar: 'ج', texte: 'الاحتفال وتناول الحلويات وإخفاء جميع الأخطاء المرتكبة', estCorrecte: false },
      { id: 11504, lettre: 'D', lettre_ar: 'د', texte: 'إلغاء جميع التدريبات المستقبلية لأن العملية انتهت بسلام', estCorrecte: false }
    ]
  },
  {
    id: 116,
    code: 'Q-COM-116',
    categorie: 'التواصل والتكوين',
    categorie_code: 'COMMUNICATION',
    texte: 'عايش دركي حدثاً صادماً ومؤلماً أثناء انتشال ضحايا حادث مأساوي، ولاحظ زملاؤه انطواءه التام وشروده المتواصل وتدهور نومه. ما هو أسلوب الدعم الإنساني والتواصلي الأنسب لمساعدته؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['الدعم النفسي والمرافقة الميدانية', 'الذكاء العلائقي في البيئة العسكرية'],
    specialites_ponderation: [
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 1.5 }
    ],
    explication: 'التضامن الرفاقي الإيجابي بالاستماع الأخوي دون لوم، وإشعار القيادة الطبية بلباقة لتمكينه من دعم نفسي متخصص لتجاوز متلازمة ما بعد الصدمة (PTSD).',
    options: [
      { id: 11601, lettre: 'A', lettre_ar: 'أ', texte: 'الاستهزاء به واتهامه بالجبن والضعف ودعوته لترك الخدمة العسكرية', estCorrecte: false },
      { id: 11602, lettre: 'B', lettre_ar: 'ب', texte: 'التواصل الداعم برفق، وكسر عزلته الأخوية، وتوجيهه بحكمة وسرية للاستفادة من المتابعة الطبية والنفسية المتخصصة', estCorrecte: true },
      { id: 11603, lettre: 'C', lettre_ar: 'ج', texte: 'تكليفه بأصعب المهام الليلية بمفرده لكي ينسى الصدمة بالقوة', estCorrecte: false },
      { id: 11604, lettre: 'D', lettre_ar: 'د', texte: 'تجاهله التام واعتباره شخصاً غير مرغوب فيه في المركز', estCorrecte: false }
    ]
  },
  {
    id: 117,
    code: 'Q-COM-117',
    categorie: 'التواصل والتكوين',
    categorie_code: 'COMMUNICATION',
    texte: 'كُلّف دركي بإلقاء عرض تحسيسي حول السلامة الطرقية أمام تلاميذ ثانوية تأهيلية. ما هي القاعدة الأساسية لنجاح هذا التواصل التربوي والتوجيهي؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['التواصل العمومي والتحسيس التربوي', 'الخطابة ومخاطبة الجمهور الناشئ'],
    specialites_ponderation: [
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 3.0 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 }
    ],
    explication: 'ملاءمة الخطاب للجمهور المستهدف (لغة بسيطة وتفاعلية)، واستخدام وسائط بصرية مشوقة، وفتح باب الحوار، والتركيز على الإقناع بدلاً من الترهيب الجاف.',
    options: [
      { id: 11701, lettre: 'A', lettre_ar: 'أ', texte: 'قراءة نصوص قانونية معقدة باللغة اللاتينية القديمة طوال ساعتين دون توقف', estCorrecte: false },
      { id: 11702, lettre: 'B', lettre_ar: 'ب', texte: 'تكييف أسلوب الخطاب مع الفئة العمرية بالاعتماد على التفاعل، والوسائط البصرية، والأمثلة الحية المقنعة', estCorrecte: true },
      { id: 11703, lettre: 'C', lettre_ar: 'ج', texte: 'معاقبة التلاميذ بالوقوف ووجوههم للحائط إذا طرحوا أي سؤال', estCorrecte: false },
      { id: 11704, lettre: 'D', lettre_ar: 'د', texte: 'توزيع كتيبات فارغة ومغادرة القاعة فوراً', estCorrecte: false }
    ]
  },
  {
    id: 118,
    code: 'Q-COM-118',
    categorie: 'التواصل والتكوين',
    categorie_code: 'COMMUNICATION',
    texte: 'في تقنيات "نزع فتيل التوتر اللفظي" (Désescalade) مع مواطن غاضب يرفع صوته محتجاً، ما هي الخطوة التواصلية التي تساعد على امتصاص غضبه بفعالية؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['إدارة الانفعالات والتهدئة التواصلية', 'التواصل المهني الراقي'],
    specialites_ponderation: [
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 1.5 }
    ],
    explication: 'إعادة صياغة شكواه بهدوء (Reformulation) للتأكيد على سماعه وفهم المشكلة ("أنا أتفهم استياءك وسأشرح لك المسطرة القانونية") مع خفض نبرة الصوت لفرض الهدوء المتبادل.',
    options: [
      { id: 11801, lettre: 'A', lettre_ar: 'أ', texte: 'الصراخ بصوت أعلى منه لإجباره على السكوت التام فوراً', estCorrecte: false },
      { id: 11802, lettre: 'B', lettre_ar: 'ب', texte: 'الاستماع دون مقاطعة، ثم إعادة صياغة انشغاله بهدوء ونبرة صوت رصينة ومحترمة لتثبيت الهدوء', estCorrecte: true },
      { id: 11803, lettre: 'C', lettre_ar: 'ج', texte: 'إغلاق الباب في وجهه وإطفاء أضواء المكتب', estCorrecte: false },
      { id: 11804, lettre: 'D', lettre_ar: 'د', texte: 'الضحك والاستهزاء بحركاته أمام الزملاء', estCorrecte: false }
    ]
  },
  {
    id: 119,
    code: 'Q-COM-119',
    categorie: 'التواصل والتكوين',
    categorie_code: 'COMMUNICATION',
    texte: 'عند تقييم كفاءة تلميذ دركي في نهاية دورة تكوينية، ما الذي يضمن نزاهة ومصداقية التقييم البيداغوجي وفق معايير مدارس التكوين؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['التقييم البيداغوجي الموضوعي', 'معايير جودة التكوين العسكري'],
    specialites_ponderation: [
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 3.0 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.0 }
    ],
    explication: 'الاعتماد على شبكة تقييم معيارية محددة المعايير (Grille critériée) قائمة على مؤشرات أداء قابلة للملاحظة والقياس العملي، وتجنب الانطباعات الذاتية أو العاطفية للمؤطر.',
    options: [
      { id: 11901, lettre: 'A', lettre_ar: 'أ', texte: 'منح النقط بناء على الإعجاب الشخصي أو القرابة العائلية فقط', estCorrecte: false },
      { id: 11902, lettre: 'B', lettre_ar: 'ب', texte: 'الاستناد إلى شبكة معايير موضوعية واضحة ومحددة سلفاً تقيس الإنجاز العملي والسلوك المهني بدقة', estCorrecte: true },
      { id: 11903, lettre: 'C', lettre_ar: 'ج', texte: 'إعطاء نقطة موحدة وثابتة لجميع التلاميذ دون النظر لأدائهم الفعلي', estCorrecte: false },
      { id: 11904, lettre: 'D', lettre_ar: 'د', texte: 'إجراء القرعة بالقطع النقدية لتحديد الناجحين والراسبين', estCorrecte: false }
    ]
  },
  {
    id: 120,
    code: 'Q-COM-120',
    categorie: 'التواصل والتكوين',
    categorie_code: 'COMMUNICATION',
    texte: 'عند رفع تقرير شفوي عملياتي فوري (Compte-rendu verbal) إلى القائد التسلسلي عقب تدخل طارئ، ما هي القاعدة التواصلية التي يجب احترامها لتفادي الغموض وهدر الوقت؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الإيجاز والدقة في التبليغ العملياتي', 'التواصل الصاعد في السلسلة القيادية'],
    specialites_ponderation: [
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.0 }
    ],
    explication: 'قاعدة الإيجاز والدقة والوضوح (قاعدة 3C: Clair, Concis, Précis) عبر الإجابة المباشرة: من، ماذا حدث، أين، متى، وما هي الإجراءات المتخذة والاحتياجات الحالية فوراً.',
    options: [
      { id: 12001, lettre: 'A', lettre_ar: 'أ', texte: 'سرد تفاصيل غير مهمة عن نوع الطعام الذي تناوله العناصر قبل المهمة', estCorrecte: false },
      { id: 12002, lettre: 'B', lettre_ar: 'ب', texte: 'الإيجاز والدقة والوضوح التام، بتقديم الوقائع الجوهرية، والنتائج، والتدابير المتخذة فوراً دون استطراد', estCorrecte: true },
      { id: 12003, lettre: 'C', lettre_ar: 'ج', texte: 'إخفاء وقوع أي مشاكل والكذب على القائد لإرضائه فقط', estCorrecte: false },
      { id: 12004, lettre: 'D', lettre_ar: 'د', texte: 'إرسال لغز شعري للقائد ليحاول تخمين ما جرى في الميدان', estCorrecte: false }
    ]
  }
];
