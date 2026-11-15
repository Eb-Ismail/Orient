// ==============================================================================
// الفئة 8: التواصل والتكوين (10 أسئلة - من 111 إلى 120)
// ==============================================================================

export const questionsCommunicationFormation = [
  {
    id: 111,
    code: 'Q-COM-111',
    categorie: 'التواصل والتكوين',
    categorie_code: 'COMMUNICATION_FORMATION',
    texte: 'تقدم مواطن إلى مقر السرية في حالة غضب وانفعال شديد يصرخ محتجاً على توقيف شاحنته في سد قضائي. ما هو الأسلوب الاحترافي الأنجع لتهدئة الموقف وامتصاص غضبه وفق قواعد التواصل الأمني؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['تقنيات الاستماع النشط وتهدئة النزاعات', 'الاستقبال والتواصل المهني مع المواطنين'],
    specialites_ponderation: [
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 2.5 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'الاستماع الهادئ دون مقاطعة، الحفاظ على نبرة صوت متزنة ومحترمة، إظهار تفهم انفعاله ثم شرح الإجراء القانوني بموضوعية وحياد يمتص الشحن الانفعالي ويعيد الحوار إلى إطاره القانوني السليم.',
    options: [
      { id: 11101, lettre: 'A', lettre_ar: 'أ', texte: 'الصراخ في وجهه بصوت أعلى لإجباره على الصمت بالقوة', estCorrecte: false },
      { id: 11102, lettre: 'B', lettre_ar: 'ب', texte: 'الحفاظ على الهدوء التام، الاستماع باهتمام ودون مقاطعة، ثم توضيح الإطار القانوني للإجراء بلباقة وحزم مهني', estCorrecte: true },
      { id: 11103, lettre: 'C', lettre_ar: 'ج', texte: 'إغلاق الباب في وجهه وتركه يصرخ في الشارع', estCorrecte: false },
      { id: 11104, lettre: 'D', lettre_ar: 'د', texte: 'إلغاء المخالفة فوراً لتجنب إزعاجه والاعتذار له بدون سبب', estCorrecte: false }
    ]
  },
  {
    id: 112,
    code: 'Q-COM-112',
    categorie: 'التواصل والتكوين',
    categorie_code: 'COMMUNICATION_FORMATION',
    texte: 'بصفتك مؤطراً ومدرباً لدفعة جديدة من التلاميذ الدركيين، كيف تنفذ جلسة "استخلاص الدروس والتقييم اللاحق" (Retour d\'expérience - RETEX) بعد تدريب ميداني معقد ارتكب فيه بعض المتدربين أخطاء تكتيكية؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['المنهجية البيداغوجية للتكوين العسكري', 'إدارة جلسات استخلاص الدروس (RETEX)'],
    specialites_ponderation: [
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 1.5 }
    ],
    explication: 'جلسة RETEX البيداغوجية الناجحة تركز على تحليل الوقائع والأفعال بموضوعية وليس تجريح الأشخاص، وتشجع المتدربين على النقد الذاتي وتحديد أسباب الخلل وتقديم الحلول التصحيحية لترسيخ التعلم الإيجابي.',
    options: [
      { id: 11201, lettre: 'A', lettre_ar: 'أ', texte: 'توبيخ وسخرية وإهانة المخطئين أمام زملائهم لردعهم', estCorrecte: false },
      { id: 11202, lettre: 'B', lettre_ar: 'ب', texte: 'تحليل الوقائع بموضوعية وبناءة، تشجيع النقد الذاتي، وتحديد أسباب الأخطاء التكتيكية وسبل تصحيحها دون تشخيص شخصي', estCorrecte: true },
      { id: 11203, lettre: 'C', lettre_ar: 'ج', texte: 'تجاهل الأخطاء تماماً والادعاء بأن التدريب كان مثالياً بنسبة 100%', estCorrecte: false },
      { id: 11204, lettre: 'D', lettre_ar: 'د', texte: 'إلغاء التداريب الميدانية المستقبلية نهائياً والاكتفاء بالنظري', estCorrecte: false }
    ]
  },
  {
    id: 113,
    code: 'Q-COM-113',
    categorie: 'التواصل والتكوين',
    categorie_code: 'COMMUNICATION_FORMATION',
    texte: 'أثناء الاستماع لضحية اعتداء جسدي عنيف تعيش صدمة نفسية حادة وتبكي باستمرار وتتلعثم، ما هي المهارة التواصلية التي يجب أن يتحلى بها المحقق لطمأنتها وتسهيل استجماع تفاصيل الواقعة؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['الاستماع التعاطفي لضحايا العنف', 'إدارة المقابلات في حالات الصدمة النفسية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 2.0 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 }
    ],
    explication: 'توفير فضاء آمن وخاص، إتاحة الوقت الكافي للهدوء، إبداء التعاطف الإنساني الرصين (Empathie professionnelle)، وطرح أسئلة مفتوحة وغير ضاغطة يساعد الضحية على استعادة أمنها النفسي وتذكر الوقائع بدقة.',
    options: [
      { id: 11301, lettre: 'A', lettre_ar: 'أ', texte: 'الضغط عليها واستعجالها بالقول: "أسرعي ليس لدينا وقت لدموعك"', estCorrecte: false },
      { id: 11302, lettre: 'B', lettre_ar: 'ب', texte: 'توفير بيئة هادئة ومطمئنة، منحها الوقت الكافي لاستعادة الهدوء، واستخدام التعاطف المهني والأسئلة المفتوحة اللطيفة', estCorrecte: true },
      { id: 11303, lettre: 'C', lettre_ar: 'ج', texte: 'استدعاء الصحافة لتصويرها في تلك اللحظة', estCorrecte: false },
      { id: 11304, lettre: 'D', lettre_ar: 'د', texte: 'اتهامها بأنها هي المسؤولة عن الاعتداء لتصحيح سلوكها', estCorrecte: false }
    ]
  },
  {
    id: 114,
    code: 'Q-COM-114',
    categorie: 'التواصل والتكوين',
    categorie_code: 'COMMUNICATION_FORMATION',
    texte: 'في حادث انفجار غازي مأساوي في حي سكني، تجمع الصحفيون ومراسلو القنوات الفضائية في المكان يطالبون عناصر الدورية بتصريحات عاجلة حول عدد الضحايا والمسؤولين. ما هي القاعدة الصارمة للتواصل مع وسائل الإعلام في مثل هذه الظروف؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['التواصل المؤسساتي في الأزمات', 'واجب التحفظ وضوابط الإدلاء الإعلامي'],
    specialites_ponderation: [
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 }
    ],
    explication: 'يحظر على عناصر الدورية الإدلاء بتصريحات ارتجالية أو تقديرات غير مؤكدة؛ التواصل الإعلامي محصور حصراً بالناطق الرسمي المخول أو النيابة العامة بعد التحقق والتدقيق الرسمي للأرقام والوقائع.',
    options: [
      { id: 11401, lettre: 'A', lettre_ar: 'أ', texte: 'تقديم تخمينات شخصية عن أعداد الموتى بناء على الدخان المتصاعد', estCorrecte: false },
      { id: 11402, lettre: 'B', lettre_ar: 'ب', texte: 'الامتناع عن التصريح الفردي، توجيه الصحفيين باحترام إلى الخلية الإعلامية المخولة أو النيابة العامة، والتركيز على تأمين الطوق', estCorrecte: true },
      { id: 11403, lettre: 'C', lettre_ar: 'ج', texte: 'الاشتباك مع الكاميرات وتكسير أجهزة الصحفيين دون مبرر', estCorrecte: false },
      { id: 11404, lettre: 'D', lettre_ar: 'د', texte: 'بث فيديو مباشر من الهاتف الشخصي لنيل الإعجابات على الإنترنت', estCorrecte: false }
    ]
  },
  {
    id: 115,
    code: 'Q-COM-115',
    categorie: 'التواصل والتكوين',
    categorie_code: 'COMMUNICATION_FORMATION',
    texte: 'عند إلقاء درس نظري لتلاميذ دركيين حول "قانون الأسلحة واستخدام القوة"، لاحظ المدرب تشتت انتباه نصف القسم ونعاس بعض المتدربين. ما التعديل البيداغوجي الأنسب لإعادة تنشيط القاعة؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['التنشيط البيداغوجي التفاعلي', 'إشراك المتعلمين ودراسة الحالات'],
    specialites_ponderation: [
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.0 }
    ],
    explication: 'الانتقال من الإلقاء التلقيني الأحادي إلى البيداغوجيا النشطة التفاعلية (طرح سيناريو واقعي، دراسة حالة عملية للمناقشة الجماعية، أو أسئلة موجهة سريعة) يعيد الحيوية واليقظة الذهنية فورياً.',
    options: [
      { id: 11501, lettre: 'A', lettre_ar: 'أ', texte: 'معاقبة جميع التلاميذ بالركض عشرة كيلومترات تحت الشمس الحارقة', estCorrecte: false },
      { id: 11502, lettre: 'B', lettre_ar: 'ب', texte: 'كسر الروتين التلقيني بالانتقال لدراسة حالة واقعية تفاعلية (Etude de cas) وطرح تساؤلات تدعوهم لاتخاذ قرارات تكتيكية فورية', estCorrecte: true },
      { id: 11503, lettre: 'C', lettre_ar: 'ج', texte: 'إطفاء الأنوار وقراءة النص بصوت منخفض جداً', estCorrecte: false },
      { id: 11504, lettre: 'D', lettre_ar: 'د', texte: 'مغادرة قاعة الدرس وإنهاء التكوين للأبد', estCorrecte: false }
    ]
  },
  {
    id: 116,
    code: 'Q-COM-116',
    categorie: 'التواصل والتكوين',
    categorie_code: 'COMMUNICATION_FORMATION',
    texte: 'نشأ خلاف شخصي حاد بين عنصرين في نفس الدورية كاد يؤثر سلباً على التنسيق الميداني وأمن الفريق. بصفتك رئيساً للدورية، ما هو الإجراء الإداري والتواصلي الأقوم لمعالجة المشكل؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['إدارة النزاعات داخل الفريق', 'تماسك الوحدة والانضباط العسكري'],
    specialites_ponderation: [
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 }
    ],
    explication: 'التدخل السريع عبر عقد جلسة حوار مغلقة ومنفردة مع الطرفين، تذكيرهما بروح الزمالة وأولوية أمن المهمة العسكرية على الخلافات الفردية، وحل النزاع بودية حازمة يمنع تفكك تماسك الدورية.',
    options: [
      { id: 11601, lettre: 'A', lettre_ar: 'أ', texte: 'تشجيعهما على الشجار بالأسلحة في ساحة الثكنة لتصفية الحسابات', estCorrecte: false },
      { id: 11602, lettre: 'B', lettre_ar: 'ب', texte: 'الاستماع لكل طرف على انفراد، التذكير الحازم بقدسية المهمة وروح الفريق، وتسوية الخلاف بمسؤولية لضمان التساند الميداني التام', estCorrecte: true },
      { id: 11603, lettre: 'C', lettre_ar: 'ج', texte: 'الانحياز فوراً لأحدهما ومعاقبة الآخر دون سماع حججه', estCorrecte: false },
      { id: 11604, lettre: 'D', lettre_ar: 'د', texte: 'ترك الخلاف يتصاعد أثناء التدخل الميداني المشترك', estCorrecte: false }
    ]
  },
  {
    id: 117,
    code: 'Q-COM-117',
    categorie: 'التواصل والتكوين',
    categorie_code: 'COMMUNICATION_FORMATION',
    texte: 'في سياق التدخل المشترك بين مصالح الدرك الملكي، والوقاية المدنية، ومصالح المياه والغابات لمكافحة حريق غابوي واسع، ما هو العامل الحاسم في نجاح التنسيق العملياتي المشترك؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['التنسيق المشترك بين القطاعات (Inter-agences)', 'إدارة مراكز القيادة المشتركة'],
    specialites_ponderation: [
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.5 },
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 2.0 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 }
    ],
    explication: 'توحيد مركز القيادة الميداني (Poste de Commandement Conjoint)، تحديد لغة تواصل ومصطلحات موحدة، وضبط قنوات اتصال لاسلكية مشتركة وتوزيع الأدوار بدقة يمنع التضارب وازدواجية التدخلات.',
    options: [
      { id: 11701, lettre: 'A', lettre_ar: 'أ', texte: 'عمل كل جهاز بمعزل تام عن الأجهزة الأخرى ودون أي تبادل للمعلومات', estCorrecte: false },
      { id: 11702, lettre: 'B', lettre_ar: 'ب', texte: 'تفعيل مركز قيادة عملياتي موحد (PC Opérationnel) وتنسيق قنوات الاتصال وتحديد المهام بوضوح لكل متدخل', estCorrecte: true },
      { id: 11703, lettre: 'C', lettre_ar: 'ج', texte: 'التنافس على من يلتقط صورا أكثر للحريق لرفعها على الإنترنت', estCorrecte: false },
      { id: 11704, lettre: 'D', lettre_ar: 'د', texte: 'انسحاب الجميع وانتظار هطول الأمطار وحدها', estCorrecte: false }
    ]
  },
  {
    id: 118,
    code: 'Q-COM-118',
    categorie: 'التواصل والتكوين',
    categorie_code: 'COMMUNICATION_FORMATION',
    texte: 'ما هو الأسلوب الصحيح لإعطاء "تغذية راجعة تقويمية" (Feedback constructif) لمتدرب أخطأ في الرماية أثناء حصة التكوين العسكري التخصصي؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['التقييم البيداغوجي البناء', 'تصحيح الأداء الحركي والمهاري'],
    specialites_ponderation: [
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 2.5 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.0 }
    ],
    explication: 'التغذية الراجعة الفعالة تبدأ بذكر النقاط الإيجابية، ثم تحديد الخطأ بدقة ملموسة (مثل حركة الإصبع على الزناد أو وضعية التهديف)، وشرح وتطبيق الحركة الصحيحة فورياً مع تشجيع الثقة بالنفس.',
    options: [
      { id: 11801, lettre: 'A', lettre_ar: 'أ', texte: 'القول له: "أنت فاشل ولن تصلح أبداً لحمل السلاح"', estCorrecte: false },
      { id: 11802, lettre: 'B', lettre_ar: 'ب', texte: 'تحديد الخطأ الحركي بدقة، تقديم النموذج الصحيح عملياً، وتشجيعه على إعادة المحاولة بتركيز وتصحيح التكنيك', estCorrecte: true },
      { id: 11803, lettre: 'C', lettre_ar: 'ج', texte: 'سحب السلاح منه فوراً وحرمانه من كل الحصص القادمة', estCorrecte: false },
      { id: 11804, lettre: 'D', lettre_ar: 'د', texte: 'إعطاؤه علامة 20/20 وتجاهل عدم إصابته للهدف', estCorrecte: false }
    ]
  },
  {
    id: 119,
    code: 'Q-COM-119',
    categorie: 'التواصل والتكوين',
    categorie_code: 'COMMUNICATION_FORMATION',
    texte: 'في التدبير التواصلي لمحادثات التفاوض الأمني مع شخص متحمس ومسلح في حالة حصار، ما هو الهدف الأساسي من استخدام تقنية "إعادة الصياغة" (La reformulation) لتصريحاته؟',
    difficulte: 'صعب',
    difficulte_code: 'AVANCE',
    coefficient: 2.0,
    competences: ['التفاوض في الأزمات وحالات احتجاز الرهائن', 'بناء جسور التواصل تحت التهديد'],
    specialites_ponderation: [
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.5 },
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'إعادة صياغة ما يقوله الشخص بعبارات هادئة تثبت له أنه مسموع ومفهوم، وتخفف حدة الاحتقان العصبي، وتمنح المفاوضين وقتاً ثميناً للتحكم في وتيرة الحوار واستيعاب مطالبه الحقيقية.',
    options: [
      { id: 11901, lettre: 'A', lettre_ar: 'أ', texte: 'الاستهزاء بكلامه وتكراره بنبرة ساخرة لإغاظته', estCorrecte: false },
      { id: 11902, lettre: 'B', lettre_ar: 'ب', texte: 'إشعاره بأنه مسموع وتفكيك شحنة التوتر، وبناء الثقة التدريجية وكسب الوقت الحيوي للسيطرة على الأزمة سلمياً', estCorrecte: true },
      { id: 11903, lettre: 'C', lettre_ar: 'ج', texte: 'الاعتراف له بارتكاب جميع الجرائم التي ينسبها للدولة فوراً', estCorrecte: false },
      { id: 11904, lettre: 'D', lettre_ar: 'د', texte: 'إغلاق خط الهاتف التفاوضي في وجهه كل دقيقتين', estCorrecte: false }
    ]
  },
  {
    id: 120,
    code: 'Q-COM-120',
    categorie: 'التواصل والتكوين',
    categorie_code: 'COMMUNICATION_FORMATION',
    texte: 'عند إعداد وتقديم تقرير شفوي موجز (Briefing opérationnel) للدورية قبل الانطلاق في مهمة مداهمة ليلية، ما هي العناصر الأربعة الحيوية التي يجب تلخيصها بوضوح وقوة؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['تقديم الإيجاز العملياتي (Operational Briefing)', 'الوضوح والتركيز القيادي'],
    specialites_ponderation: [
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.5 },
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 2.0 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 1.5 }
    ],
    explication: 'الإيجاز التكتيكي القياسي (طريقة SMEAC أو الإيجاز العملياتي) يلخص: الهدف من العملية، معلومات العدو/التهديد، خطة التحرك والمهام الفردية، وقواعد فتح النار والاتصال والتدخل الطبي الاستعجالي.',
    options: [
      { id: 12001, lettre: 'A', lettre_ar: 'أ', texte: 'أسعار وقود السيارات، وتاريخ بناء الثكنة، ووجبة الغداء للغد', estCorrecte: false },
      { id: 12002, lettre: 'B', lettre_ar: 'ب', texte: 'الهدف المحدد للمهمة، طبيعة التهديد، توزيع المهام التكتيكية على الأفراد، وقواعد الاشتباك والأمان والإخلاء الطبي', estCorrecte: true },
      { id: 12003, lettre: 'C', lettre_ar: 'ج', texte: 'قراءة رواية بوليسية كاملة على الأفراد لتشويقهم', estCorrecte: false },
      { id: 12004, lettre: 'D', lettre_ar: 'د', texte: 'الطلب من الجميع الانطلاق دون أي توجيه أو شرح للخطة', estCorrecte: false }
    ]
  }
];
