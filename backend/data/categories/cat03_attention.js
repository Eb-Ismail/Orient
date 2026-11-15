// ==============================================================================
// الفئة 3: التركيز والانتباه (15 سؤال - من 36 إلى 50)
// ==============================================================================

export const questionsAttention = [
  {
    id: 36,
    code: 'Q-ATT-036',
    categorie: 'التركيز والانتباه',
    categorie_code: 'ATTENTION',
    texte: 'أثناء تلقي نداء لاسلكي سريع ومتقطع وسط ضوضاء محرك الدورية: "الدورية 4... تحرك فوراً إلى النقطة كليو 47... كرر 47 وليس 74... الدعم مطلوب". ما هي النقطة المحددة بدقة لتوجيه التدخل؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['التركيز السمعي الانتقائي', 'اليقظة اللاسلكية في الطوارئ'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 1.5 }
    ],
    explication: 'الرسالة شددت بوضوح على تصحيح التردد وتفادي الخلط البصري/السمعي المألوف: النقطة المقصودة هي الكيلومتر 47 وليس 74.',
    options: [
      { id: 3601, lettre: 'A', lettre_ar: 'أ', texte: 'النقطة الكيلومترية 74', estCorrecte: false },
      { id: 3602, lettre: 'B', lettre_ar: 'ب', texte: 'النقطة الكيلومترية 47', estCorrecte: true },
      { id: 3603, lettre: 'C', lettre_ar: 'ج', texte: 'النقطة الكيلومترية 147', estCorrecte: false },
      { id: 3604, lettre: 'D', lettre_ar: 'د', texte: 'الرجوع إلى مقر القيادة الإقليمية', estCorrecte: false }
    ]
  },
  {
    id: 37,
    code: 'Q-ATT-037',
    categorie: 'التركيز والانتباه',
    categorie_code: 'ATTENTION',
    texte: 'خلال نوبة حراسة ليلية ثابتة تمتد لأربع ساعات في موقع معزول، ما هو الإجراء الأنجع للحفاظ على أقصى درجات التركيز الذهني ومقاومة النعاس والشرود؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الانتباه المستمر والمقاوم للرتابة', 'الانضباط في الحراسة الثابتة'],
    specialites_ponderation: [
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.5 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'المسح البصري الدوري لقطاعات الرصد وتغيير وضعية الوقوف مع التنفس العميق ينشط الدورة الدموية ويبقي الحواس في حالة استنفار دائم دون إخلال بالواجب.',
    options: [
      { id: 3701, lettre: 'A', lettre_ar: 'أ', texte: 'الجلوس والاسترخاء وإغلاق العينين لبضع دقائق فقط', estCorrecte: false },
      { id: 3702, lettre: 'B', lettre_ar: 'ب', texte: 'المسح البصري النشط للقطاعات وتغيير زوايا المراقبة والتحرك الموضعي المنتظم', estCorrecte: true },
      { id: 3703, lettre: 'C', lettre_ar: 'ج', texte: 'تصفح مواقع التواصل الاجتماعي على الهاتف الشخصي لطرد الملل', estCorrecte: false },
      { id: 3704, lettre: 'D', lettre_ar: 'د', texte: 'وضع سماعات الأذن لسماع الموسيقى بصوت مرتفع', estCorrecte: false }
    ]
  },
  {
    id: 38,
    code: 'Q-ATT-038',
    categorie: 'التركيز والانتباه',
    categorie_code: 'ATTENTION',
    texte: 'أمامك قائمة تتضمن أرقام بطاقات التعريف الوطنية التالية: [AB123456, AB123465, AB123546, AB123456]. كم مرة تكرر الرقم المحدد [AB123456] بالضبط وبشكل متطابق في القائمة؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['التدقيق البصري السريع', 'مقارنة المتطابقات الرقمية'],
    specialites_ponderation: [
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.5 },
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'الرقم AB123456 ورد في المركز الأول ثم تكرر بنفس الترتيب في المركز الرابع فقط، أي مرتين بالضبط (العنصر الثاني والثالث فيهما قلب للأرقام 65 و 546).',
    options: [
      { id: 3801, lettre: 'A', lettre_ar: 'أ', texte: 'مرة واحدة فقط', estCorrecte: false },
      { id: 3802, lettre: 'B', lettre_ar: 'ب', texte: 'مرتان بالضبط', estCorrecte: true },
      { id: 3803, lettre: 'C', lettre_ar: 'ج', texte: 'ثلاث مرات', estCorrecte: false },
      { id: 3804, lettre: 'D', lettre_ar: 'د', texte: 'أربع مرات متتالية', estCorrecte: false }
    ]
  },
  {
    id: 39,
    code: 'Q-ATT-039',
    categorie: 'التركيز والانتباه',
    categorie_code: 'ATTENTION',
    texte: 'أثناء مراجعة سجل الموقوفين رهن الحراسة النظرية، أي زوج من البيانات التالية يحتوي على خطأ إملائي أو رقمي دقيق يجب تصحيحه فوراً؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['الانتباه للتفاصيل الدقيقة', 'التوثيق الإداري السليم'],
    specialites_ponderation: [
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'في الزوج (ج)، تاريخ نهاية الأجل (14/05) يسبق تاريخ التوقيف (15/05)، وهو خطأ تاريخي منطقي فادح يمس مشروعية التوقيف الإجرائي.',
    options: [
      { id: 3901, lettre: 'A', lettre_ar: 'أ', texte: 'تاريخ الدخول: 10/05/2024 الساعة 10:00 — تاريخ الانتهاء: 12/05/2024 الساعة 10:00', estCorrecte: false },
      { id: 3902, lettre: 'B', lettre_ar: 'ب', texte: 'رقم المحضر: 1420/ج.ج — تاريخ المحضر: 12/05/2024', estCorrecte: false },
      { id: 3903, lettre: 'C', lettre_ar: 'ج', texte: 'تاريخ التوقيف: 15/05/2024 — تاريخ نهاية الحراسة: 14/05/2024', estCorrecte: true },
      { id: 3904, lettre: 'D', lettre_ar: 'د', texte: 'الضابط المشرف: ملازم أول س.م — الوحدة: المركز الترابي', estCorrecte: false }
    ]
  },
  {
    id: 40,
    code: 'Q-ATT-040',
    categorie: 'التركيز والانتباه',
    categorie_code: 'ATTENTION',
    texte: 'يقود دركي دراجة نارية في موكب رسمي بسرعة 80 كم/س. تتطلب القيادة تقسيم الانتباه (Attention partagée) بين مسار الطريق وحركة كبار الشخصيات. ما هو السلوك الصحيح لتفادي تشتت الانتباه؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['تقسيم الانتباه الحركي', 'التركيز أثناء القيادة التكتيكية'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 3.0 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.0 }
    ],
    explication: 'الانتباه المقسم يعتمد على المسح البصري الديناميكي السريع (الطريق، المرايا، الموكب) مع المحافظة على مسافة أمان ثابتة والتركيز على مسار التوجيه الأساسي لمنع حوادث الاصطدام.',
    options: [
      { id: 4001, lettre: 'A', lettre_ar: 'أ', texte: 'التركيز التام على شاشة الهاتف دون النظر إلى الطريق أمام الدراجة', estCorrecte: false },
      { id: 4002, lettre: 'B', lettre_ar: 'ب', texte: 'المسح البصري التناوبي السريع مع تثبيت مسافة الأمان وتركيز الرؤية المحورية على مسار السير', estCorrecte: true },
      { id: 4003, lettre: 'C', lettre_ar: 'ج', texte: 'الالتفات المستمر للخلف طوال فترة السير لمحادثة مرافق الموكب', estCorrecte: false },
      { id: 4004, lettre: 'D', lettre_ar: 'د', texte: 'إغلاق عيني السائق كل 10 ثوانٍ لتفادي جفاف العين', estCorrecte: false }
    ]
  },
  {
    id: 41,
    code: 'Q-ATT-041',
    categorie: 'التركيز والانتباه',
    categorie_code: 'ATTENTION',
    texte: 'أثناء مراقبة أوراق سيارة في نقطة تفتيش، لمح الدركي عبر الرؤية المحيطية (Peripheral vision) حركة سريعة ليد الراكب الخلفي تمتد نحو أسفل المقعد. ما هو رد الفعل الانتباهي والأمني السليم؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['الرؤية المحيطية واليقظة السريعة', 'حماية الذات في التدخلات المباشرة'],
    specialites_ponderation: [
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 1.5 }
    ],
    explication: 'حركة اليد المفاجئة لأسفل مقعد مشبوه قد تكون محاولة لسحب سلاح ناري أو إخفاء حرز؛ يجب فوراً إيقاف فحص الأوراق، وأخذ وضعية حماية، وإصدار أمر حازم بإظهار اليدين والتنسيق مع الزميل.',
    options: [
      { id: 4101, lettre: 'A', lettre_ar: 'أ', texte: 'متابعة قراءة أوراق السيارة بهدوء دون أي اكتراث', estCorrecte: false },
      { id: 4102, lettre: 'B', lettre_ar: 'ب', texte: 'الانتقال فوراً لوضع التأهب الأمني، وأمر الراكب بإظهار يديه فوراً، وتنبيه الزميل المرافق', estCorrecte: true },
      { id: 4103, lettre: 'C', lettre_ar: 'ج', texte: 'الابتسام للراكب والطلب منه مساعدته في البحث تحت الكرسي', estCorrecte: false },
      { id: 4104, lettre: 'D', lettre_ar: 'د', texte: 'الانسحاب التام والفرار من نقطة المراقبة سيراً على الأقدام', estCorrecte: false }
    ]
  },
  {
    id: 42,
    code: 'Q-ATT-042',
    categorie: 'التركيز والانتباه',
    categorie_code: 'ATTENTION',
    texte: 'في اختبار فحص التركيز الإداري، أي من المتتاليات الآتية تحتوي على عنصر دخيل لا ينتمي لباقي العناصر؟ المتتالية: [محضر معاينة، استدعاء رسمي، بطاقة زيارة، برقية عملياتية، قذيفة هاون]',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الانتباه التصنيفي', 'الفصل بين السياقات الإدارية والميدانية'],
    specialites_ponderation: [
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 1.5 }
    ],
    explication: 'جميع العناصر الأولى هي وثائق ومحررات إدارية وقضائية رسمية، بينما "قذيفة هاون" هي ذخيرة حربية مادية وسلاح، وبالتالي هي العنصر الدخيل منطقياً وتصنيفياً.',
    options: [
      { id: 4201, lettre: 'A', lettre_ar: 'أ', texte: 'محضر معاينة', estCorrecte: false },
      { id: 4202, lettre: 'B', lettre_ar: 'ب', texte: 'استدعاء رسمي', estCorrecte: false },
      { id: 4203, lettre: 'C', lettre_ar: 'ج', texte: 'قذيفة هاون', estCorrecte: true },
      { id: 4204, lettre: 'D', lettre_ar: 'د', texte: 'برقية عملياتية', estCorrecte: false }
    ]
  },
  {
    id: 43,
    code: 'Q-ATT-043',
    categorie: 'التركيز والانتباه',
    categorie_code: 'ATTENTION',
    texte: 'أثناء التعامل مع السلاح الفردي، ما هي القاعدة الذهبية الأولى التي تعبر عن الانتباه الأمني الصارم وتمنع إطلاق النار العرضي غير المقصود؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['قواعد الأمان والانتباه الصارم للأسلحة', 'الانضباط التكتيكي'],
    specialites_ponderation: [
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 1.5 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 1.5 }
    ],
    explication: 'القاعدة الأولى للأمان في الأسلحة: اعتبار السلاح دائماً ملقماً وجاهزاً للإطلاق، وإبقاء الإصبع ممدداً خارج واقي الزناد (Pontet) حتى اتخاذ قرار الرماية الواعي.',
    options: [
      { id: 4301, lettre: 'A', lettre_ar: 'أ', texte: 'إبقاء الإصبع دائماً ممتداً بمحاذاة الهيكل خارج واقي الزناد حتى تحديد الهدف وعزم الإطلاق', estCorrecte: true },
      { id: 4302, lettre: 'B', lettre_ar: 'ب', texte: 'وضع الإصبع بإحكام على الزناد طوال فترة حمل السلاح والتجول به', estCorrecte: false },
      { id: 4303, lettre: 'C', lettre_ar: 'ج', texte: 'توجيه فوهة السلاح نحو الزملاء عند التحدث معهم للتأكد من انتباههم', estCorrecte: false },
      { id: 4304, lettre: 'D', lettre_ar: 'د', texte: 'افتراض أن السلاح فارغ دائماً دون الحاجة للتأكد من مخزن الذخيرة', estCorrecte: false }
    ]
  },
  {
    id: 44,
    code: 'Q-ATT-044',
    categorie: 'التركيز والانتباه',
    categorie_code: 'ATTENTION',
    texte: 'استقبل مأمور قاعة المواصلات اتصال استغاثة من مواطنة تصرخ بهستيريا قائلة: "أنقذوني... بيت عمي قرب وادي إيسيل... سيارة كحلة دهست الدري الصغير ومشت بسرعة... الشارع 14 درب النخلة زنقة 3!". ما العنوان الدقيق الذي يجب إرسال الدورية إليه فوراً؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['الاستماع الفعال واستخلاص البيانات الحرجة', 'التركيز في بيئة الضغط النفسي'],
    specialites_ponderation: [
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 1.5 }
    ],
    explication: 'التركيز الانتقائي يقتضي فصل الصراخ والمشاعر الجانبية واستخلاص العنوان المحدد جغرافياً: درب النخلة، الشارع 14، زنقة 3، قرب وادي إيسيل.',
    options: [
      { id: 4401, lettre: 'A', lettre_ar: 'أ', texte: 'منزل عمها في أي مدينة مجاورة', estCorrecte: false },
      { id: 4402, lettre: 'B', lettre_ar: 'ب', texte: 'شارع 14، درب النخلة، زنقة 3، قرب وادي إيسيل', estCorrecte: true },
      { id: 4403, lettre: 'C', lettre_ar: 'ج', texte: 'محطة القطار الرئيسية في مركز المدينة', estCorrecte: false },
      { id: 4404, lettre: 'D', lettre_ar: 'د', texte: 'أي دكان تجاري يبيع السيارات الكحلة', estCorrecte: false }
    ]
  },
  {
    id: 45,
    code: 'Q-ATT-045',
    categorie: 'التركيز والانتباه',
    categorie_code: 'ATTENTION',
    texte: 'على شاشة رادار قياس السرعة، ظهرت في جزء من الثانية أربع مركبات في نفس المقطع: (السيارة أ: 98 كم/س)، (السيارة ب: 138 كم/س في طريق سرعتها القصوى 100 كم/س)، (الشاحنة ج: 75 كم/س)، (الحافلة د: 85 كم/س). أي مركبة تشكل الهدف الميداني الفوري لدركي الرادار؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['سرعة التمييز الإدراكي', 'الضبط الراداري لمخالفات السرعة'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 3.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.0 }
    ],
    explication: 'المركبة (ب) تسير بسرعة 138 كم/س متجاوزة السرعة القانونية بـ 38 كم/س، وهي المخالفة الجسيمة الفورية التي تستوجب إشعار نقطة التوقيف المتقدمة لاعتراضها.',
    options: [
      { id: 4501, lettre: 'A', lettre_ar: 'أ', texte: 'السيارة (أ)', estCorrecte: false },
      { id: 4502, lettre: 'B', lettre_ar: 'ب', texte: 'السيارة (ب)', estCorrecte: true },
      { id: 4503, lettre: 'C', lettre_ar: 'ج', texte: 'الشاحنة (ج)', estCorrecte: false },
      { id: 4504, lettre: 'D', lettre_ar: 'د', texte: 'الحافلة (د)', estCorrecte: false }
    ]
  },
  {
    id: 46,
    code: 'Q-ATT-046',
    categorie: 'التركيز والانتباه',
    categorie_code: 'ATTENTION',
    texte: 'يقف دركي في صفوف تشكيل حفظ النظام العام أمام حشد غاضب يطلق هتافات واستفزازات لفظية. ما هو السلوك الذي يعكس أعلى درجات التركيز والانضباط العسكري؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['ضبط النفس ومقاومة التشتت الاستفزازي', 'الانضباط في حفظ النظام'],
    specialites_ponderation: [
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.5 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.0 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 1.5 }
    ],
    explication: 'في مهام حفظ النظام، يجب الحفاظ على برودة الأعصاب، وتجاهل الاستفزازات اللفظية، والتركيز على تعليمات القائد وحماية التشكيل دون أي ردود أفعال انفعالية فردية.',
    options: [
      { id: 4601, lettre: 'A', lettre_ar: 'أ', texte: 'الرد على المتظاهرين بنفس الألفاظ الاستفزازية لإثبات القوة الشخصية', estCorrecte: false },
      { id: 4602, lettre: 'B', lettre_ar: 'ب', texte: 'الحفاظ على الثبات والهدوء التام والتركيز الصارم على حماية الموقع وأوامر قائد التشكيل', estCorrecte: true },
      { id: 4603, lettre: 'C', lettre_ar: 'ج', texte: 'الاندفاع الفردي نحو الحشد لضرب أول شخص يصرخ', estCorrecte: false },
      { id: 4604, lettre: 'D', lettre_ar: 'د', texte: 'مغادرة الصف والعودة إلى الشاحنة لشرب الشاي', estCorrecte: false }
    ]
  },
  {
    id: 47,
    code: 'Q-ATT-047',
    categorie: 'التركيز والانتباه',
    categorie_code: 'ATTENTION',
    texte: 'خلال الجرد اليومي لذخيرة مستودع الأسلحة (Armurerie)، يحتوي كل صندوق ذخيرة على 50 طلقة. إذا كان السجل يسجل استلام 10 صناديق كاملة وخرجت 3 دوريات كل دورية استلمت مخزنين بكل مخزن 15 طلقة، فكم طلقة يجب أن توجد بالتمام والكمال في المستودع بعد الجرد؟',
    difficulte: 'صعب',
    difficulte_code: 'DIFFICILE',
    coefficient: 1.5,
    competences: ['الحساب العملياتي الدقيق', 'اليقظة في تدبير الذخيرة الحية'],
    specialites_ponderation: [
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 1.5 }
    ],
    explication: 'إجمالي الرصيد المستلم: 10 صناديق × 50 طلقة = 500 طلقة. الذخيرة المصروفة: 3 دوريات × (2 مخزن × 15) = 3 × 30 = 90 طلقة. الرصيد المتبقي بدقة: 500 - 90 = 410 طلقات.',
    options: [
      { id: 4701, lettre: 'A', lettre_ar: 'أ', texte: '400 طلقة', estCorrecte: false },
      { id: 4702, lettre: 'B', lettre_ar: 'ب', texte: '410 طلقات بالضبط', estCorrecte: true },
      { id: 4703, lettre: 'C', lettre_ar: 'ج', texte: '420 طلقة', estCorrecte: false },
      { id: 4704, lettre: 'D', lettre_ar: 'د', texte: '380 طلقة', estCorrecte: false }
    ]
  },
  {
    id: 48,
    code: 'Q-ATT-048',
    categorie: 'التركيز والانتباه',
    categorie_code: 'ATTENTION',
    texte: 'أثناء تأمين تجمع جماهيري حاشد، أي من العلامات الجسدية التالية يمثل خطراً مستتراً يجب أن يلفت انتباه المراقب الأمني فوراً؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['الانتباه للمخاطر الخفية في التجمعات', 'الملاحظة الأمنية الوقائية'],
    specialites_ponderation: [
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.5 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 }
    ],
    explication: 'ارتداء معطف شتوي ثقيل جداً في يوم صيفي حار مع تثبيت اليد تحت الإبط يشكل شذوذاً بيئياً وسلوكياً صريحاً (Anomalie comportementale) يشير لاحتمال حمل سلاح أو جسم محظور.',
    options: [
      { id: 4801, lettre: 'A', lettre_ar: 'أ', texte: 'شخص يلوح بعلم وطني ويهتف بحماس', estCorrecte: false },
      { id: 4802, lettre: 'B', lettre_ar: 'ب', texte: 'شخص يرتدي معطفاً سميكاً ومغلقاً في يوم صيفي شديد الحرارة ويده اليمنى ثابتة تحت المعطف', estCorrecte: true },
      { id: 4803, lettre: 'C', lettre_ar: 'ج', texte: 'عائلة تتناول المثلجات بجانب الرصيف', estCorrecte: false },
      { id: 4804, lettre: 'D', lettre_ar: 'د', texte: 'مصور صحفي يحمل كاميرا معتمدة ببطاقة رسمية واضحة', estCorrecte: false }
    ]
  },
  {
    id: 49,
    code: 'Q-ATT-049',
    categorie: 'التركيز والانتباه',
    categorie_code: 'ATTENTION',
    texte: 'في مهمة خفر ونقل معتقلين خطيرين لمسافة طويلة تزيد عن 6 ساعات بالسيارة، متى تبدأ مؤشرات هبوط التركيز الذهني الخطيرة بالظهور وكيف تتم معالجتها ميدانياً؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['تدبير الإجهاد في المهام الحساسة', 'الحفاظ على اليقظة العملياتية'],
    specialites_ponderation: [
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 1.5 }
    ],
    explication: 'الدراسات تثبت انخفاض التركيز بعد ساعتين من القيادة المتواصلة؛ الإجراء المهني هو التناوب بين عناصر الدورية والتوقف الأمني المخطط له في نقط دركية مؤمنة.',
    options: [
      { id: 4901, lettre: 'A', lettre_ar: 'أ', texte: 'التركيز لا ينخفض أبداً مهما طالت المدة إذا كان الدركي شجاعاً', estCorrecte: false },
      { id: 4902, lettre: 'B', lettre_ar: 'ب', texte: 'يبدأ الانخفاض بعد ساعتين من السياقة المتواصلة، ويجب التناوب على القيادة والتوقف في نقطة دركية مؤمنة', estCorrecte: true },
      { id: 4903, lettre: 'C', lettre_ar: 'ج', texte: 'فتح النوافذ وقيادة السيارة بأقصى سرعة ممكنة لإنهاء المهمة في ساعة واحدة', estCorrecte: false },
      { id: 4904, lettre: 'D', lettre_ar: 'د', texte: 'إعطاء مقود السيارة للموقوف ليقود السيارة تحت مراقبة الدورية', estCorrecte: false }
    ]
  },
  {
    id: 50,
    code: 'Q-ATT-050',
    categorie: 'التركيز والانتباه',
    categorie_code: 'ATTENTION',
    texte: 'خلال تمشيط ليلي لغابة مشبوهة بواسطة مصابيح كاشفة، أي حركة بصرية يجب أن تكون أولوية الانتباه لدى الرامي الأمامي في فريق التدخل؟',
    difficulte: 'صعب',
    difficulte_code: 'DIFFICILE',
    coefficient: 1.5,
    competences: ['الانتباه الراداري التكتيكي', 'الرماية والتمييز في الظلام'],
    specialites_ponderation: [
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.5 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 1.0 }
    ],
    explication: 'في بيئة منخفضة الإضاءة، حركة الأغصان أو الوميض الفجائي على مستوى ارتفاع الإنسان أو حركة الظلال المتعارضة مع الريح هي مؤشر التهديد الفوري الذي يحدد تموضع الخصم.',
    options: [
      { id: 5001, lettre: 'A', lettre_ar: 'أ', texte: 'متابعة حركة النجوم في السماء للتأكد من حالة الطقس', estCorrecte: false },
      { id: 5002, lettre: 'B', lettre_ar: 'ب', texte: 'رصد أي انكسار مفاجئ للأغصان أو انعكاس ضوئي شاذ أو حركة ظل تتعارض مع اتجاه الرياح الطبيعية', estCorrecte: true },
      { id: 5003, lettre: 'C', lettre_ar: 'ج', texte: 'التركيز التام على حذاء الدركي للتأكد من عدم اتساخه بالطين', estCorrecte: false },
      { id: 5004, lettre: 'D', lettre_ar: 'د', texte: 'إطفاء جميع الكشافات والجلوس للنوم حتى بزوغ شمس الصباح', estCorrecte: false }
    ]
  }
];
