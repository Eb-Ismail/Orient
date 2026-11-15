// ==============================================================================
// الفئة 3: التركيز والانتباه (15 سؤال - من 36 إلى 50)
// ==============================================================================

export const questionsConcentration = [
  {
    id: 36,
    code: 'Q-ATT-036',
    categorie: 'التركيز والانتباه',
    categorie_code: 'CONCENTRATION_ATTENTION',
    texte: 'خلال مراقبة سد قضائي ليلي، تمر عشرات المركبات في الساعة. لاحظ الدركي أن إحدى السيارات تحمل رقم لوحة أمامي ينتهي بالرقم 72 بينما اللوحة الخلفية لنفس السيارة تنتهي بالرقم 27 مع تشابه باقي الأرقام والحروف تماماً. ما هو الموقف الفوري الواجب اتخاذه؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['دقة الملاحظة البصرية السريعة', 'اليقظة في نقاط المراقبة'],
    specialites_ponderation: [
      { code: 'SPEC-ROUTE', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'الانتباه للتبديل بين الأرقام المتشابهة (72 مقابل 27) يستوجب توقيف المركبة على الفور للتحقق من تطابق وثائقها، حيث يعتبر هذا الاختلاف دليلاً قوياً على تزوير الصفائح أو استخدام صفائح مسروقة.',
    options: [
      { id: 3601, lettre: 'A', lettre_ar: 'أ', texte: 'السماح للسيارة بالمرور لأن الخطأ طفيف ومجرد قلب للأرقام', estCorrecte: false },
      { id: 3602, lettre: 'B', lettre_ar: 'ب', texte: 'توقيف السيارة فوراً وتوجيهها للمسار الآمن لإجراء تدقيق معمق ومطابقة الرقم مع البطاقة الرمادية', estCorrecte: true },
      { id: 3603, lettre: 'C', lettre_ar: 'ج', texte: 'الانتظار حتى تسافر السيارة لمدينة أخرى ثم إشعارهم لاحقاً', estCorrecte: false },
      { id: 3604, lettre: 'D', lettre_ar: 'د', texte: 'تغريم السائق بتهمة عدم غسل اللوحة الخلفية فقط', estCorrecte: false }
    ]
  },
  {
    id: 37,
    code: 'Q-ATT-037',
    categorie: 'التركيز والانتباه',
    categorie_code: 'CONCENTRATION_ATTENTION',
    texte: 'أثناء الاستماع إلى نداء استغاثة عبر جهاز اللاسلكي وسط تشويش شديد وضوضاء الرياح، التقطت العبارة: "المشتبه فيه يقود دراجة نارية سوداء... اتجاه... النقطة الكيلومترية... قرب الجسر القديم". ما الكلمة الأكثر أهمية وحسماً للبدء في توجيه الدوريات الميدانية على الفور؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['الانتباه السمعي الانتقائي', 'إدارة الاتصالات اللاسلكية في الطوارئ'],
    specialites_ponderation: [
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 1.5 }
    ],
    explication: 'في الاتصالات التكتيكية المشوشة، يعتبر المعلم الجغرافي الحاسم (الجسر القديم / الاتجاه) هو العنصر الجوهري لنشر الدوريات وإغلاق المحاور قبل تشتت الأفراد.',
    options: [
      { id: 3701, lettre: 'A', lettre_ar: 'أ', texte: 'لون الدراجة النارية', estCorrecte: false },
      { id: 3702, lettre: 'B', lettre_ar: 'ب', texte: 'المعلم الجغرافي ومحور التحرك (قرب الجسر القديم)', estCorrecte: true },
      { id: 3703, lettre: 'C', lettre_ar: 'ج', texte: 'نوع خوذة السائق', estCorrecte: false },
      { id: 3704, lettre: 'D', lettre_ar: 'د', texte: 'الاسم الأول لمخاطب الراديو', estCorrecte: false }
    ]
  },
  {
    id: 38,
    code: 'Q-ATT-038',
    categorie: 'التركيز والانتباه',
    categorie_code: 'CONCENTRATION_ATTENTION',
    texte: 'عند مقارنة الرقم التسلسلي لإطار سيارة (Numéro de châssis / VIN) المحفور على الهيكل مع الرقم المسجل بالوثائق، لاحظت السلسلة التالية: المسجل بالوثيقة: (VF1BB0A0F2849182)، والمحفور على المعدن: (VF1BB0A0F2849132). هل يتطابق الرقمان؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['التدقيق البصري المركز', 'مكافحة سرقة وتهريب السيارات'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-ROUTE', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 }
    ],
    explication: 'بالتركيز في الخانة قبل الأخيرة: الرقم في الوثيقة هو 8 (182)، بينما المحفور على الهيكل هو 3 (132). هذا الاختلاف في رقم واحد يكشف عدم التطابق وشبهة التزوير أو التلاعب بالهيكل.',
    options: [
      { id: 3801, lettre: 'A', lettre_ar: 'أ', texte: 'نعم متطابقان تماماً ولا يوجد أي فرق', estCorrecte: false },
      { id: 3802, lettre: 'B', lettre_ar: 'ب', texte: 'لا، يوجد اختلاف في الرقم قبل الأخير (8 في الوثيقة مقابل 3 على الهيكل)', estCorrecte: true },
      { id: 3803, lettre: 'C', lettre_ar: 'ج', texte: 'الرقمان يختلفان في الحروف الأولى الثلاثة فقط', estCorrecte: false },
      { id: 3804, lettre: 'D', lettre_ar: 'د', texte: 'التطابق اختياري إذا كان لون السيارة صحيحاً', estCorrecte: false }
    ]
  },
  {
    id: 39,
    code: 'Q-ATT-039',
    categorie: 'التركيز والانتباه',
    categorie_code: 'CONCENTRATION_ATTENTION',
    texte: 'أثناء خفر موكب وتأمين محيط حساس لساعات متواصلة، ما هي التقنية الذهنية الفعالة للحفاظ على مستوى يقظة وانتباه مرتفع ومنع شرود الذهن والانزلاق في التعب؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['إدارة الانتباه المستمر واليقظة الذهنية', 'الحماية والتأمين العملياتي'],
    specialites_ponderation: [
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.5 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 }
    ],
    explication: 'المسح البصري الدوري المنظم (دورة المراقبة النشطة عبر قطاعات محددة مع تجديد نقاط التركيز كل بضع ثوان) يبقي الجهاز العصبي يقظاً ويمنع التشتت والانحدار في حالة السهو.',
    options: [
      { id: 3901, lettre: 'A', lettre_ar: 'أ', texte: 'التحديق الثابت في نقطة واحدة بعيدة دون تحريك العينين نهائياً', estCorrecte: false },
      { id: 3902, lettre: 'B', lettre_ar: 'ب', texte: 'المسح البصري الدوري النشط للقطاعات (Scanning) والتقييم المستمر للمتغيرات المحيطة', estCorrecte: true },
      { id: 3903, lettre: 'C', lettre_ar: 'ج', texte: 'استخدام الهاتف المحمول لتجاوز الملل أثناء الوقوف', estCorrecte: false },
      { id: 3904, lettre: 'D', lettre_ar: 'د', texte: 'إغلاق العينين لدقائق متفرقة لاسترجاع الطاقة أثناء أداء المهمة', estCorrecte: false }
    ]
  },
  {
    id: 40,
    code: 'Q-ATT-040',
    categorie: 'التركيز والانتباه',
    categorie_code: 'CONCENTRATION_ATTENTION',
    texte: 'في مستند رسمي مختوم، لاحظ المدقق أن الختم الدائري للإدارة يحمل خطأ إملائياً في كلمة "المملكة" حيث كُتبت بالتاء المفتوحة "المملكت". ما الاستنتاج الدقيق الذي ينبغي الانتباه إليه فوراً؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['كشف التزييف الإداري', 'دقة مراجعة الأختام الرسمية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.0 }
    ],
    explication: 'الأختام الرسمية للدولة تصنع بدقة متناهية ولا يمكن أن تحتوي على أخطاء إملائية بدائية كهذه. وجود هذا الخطأ دليل قاطع على تزييف الختم والمستند.',
    options: [
      { id: 4001, lettre: 'A', lettre_ar: 'أ', texte: 'الخطأ ناتج عن حرارة الطابعة وسيتم تصحيحه تلقائياً مع الوقت', estCorrecte: false },
      { id: 4002, lettre: 'B', lettre_ar: 'ب', texte: 'قرينة قاطعة على زيف الختم والمستند تستوجب الحجز الفوري وفتح تحقيق قضائي', estCorrecte: true },
      { id: 4003, lettre: 'C', lettre_ar: 'ج', texte: 'المطبعة الرسمية غيرت القواعد الإملائية لتلك الكلمة فقط', estCorrecte: false },
      { id: 4004, lettre: 'D', lettre_ar: 'د', texte: 'المستند صحيح إذا كان حبر الختم باللون الأزرق', estCorrecte: false }
    ]
  },
  {
    id: 41,
    code: 'Q-ATT-041',
    categorie: 'التركيز والانتباه',
    categorie_code: 'CONCENTRATION_ATTENTION',
    texte: 'يقود دركي دراجة نارية في مهمة استطلاع سريعة على طريق رطب. في جزء من الثانية، لاحظ أمامه وجود لمعان خفيف غير معتاد مع بقعة متقزحة الألوان على الإسفلت في منعطف حاد. ما الذي يجب الانتباه إليه فوراً؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['القيادة الاحترافية للدراجات', 'توقع المخاطر الفورية على الطريق'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-ROUTE', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 }
    ],
    explication: 'اللمعان المتقزح على الإسفلت المبلل يشير إلى وجود تسرب وقود ديزل أو زيت محرك، مما يسبب انعداماً تاماً للالتصاق وخطر انزلاق خطير على عجلتي الدراجة النارية.',
    options: [
      { id: 4101, lettre: 'A', lettre_ar: 'أ', texte: 'اللمعان مجرد زينة للطريق ولا يشكل أي خطر', estCorrecte: false },
      { id: 4102, lettre: 'B', lettre_ar: 'ب', texte: 'وجود تسرب زيت أو ديزل على الإسفلت يستدعي تجنب الكبح المفاجئ وضبط زاوية الميلان فوراً لتفادي السقوط', estCorrecte: true },
      { id: 4103, lettre: 'C', lettre_ar: 'ج', texte: 'زيادة السرعة القصوى لعبور البقعة في أقل وقت ممكن', estCorrecte: false },
      { id: 4104, lettre: 'D', lettre_ar: 'د', texte: 'إيقاف المحرك أثناء السير في المنعطف', estCorrecte: false }
    ]
  },
  {
    id: 42,
    code: 'Q-ATT-042',
    categorie: 'التركيز والانتباه',
    categorie_code: 'CONCENTRATION_ATTENTION',
    texte: 'أثناء تدريب الرماية أو التعامل التكتيكي مع السلاح الفردي، ما هي القاعدة الذهبية الأولى للأمان التي يجب أن يستحضرها الذهن باستمرار دون أي غفلة؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الانضباط التكتيكي للرماية', 'قواعد الأمان الصارمة للسلاح'],
    specialites_ponderation: [
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.5 },
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 2.0 }
    ],
    explication: 'القاعدة الأساسية هي اعتبار أي سلاح ملقماً ومحشواً بالذخيرة الحية في جميع الظروف، وعدم وضع الإصبع على الزناد إلا عند صدور الأمر وتحديد الهدف المؤكد قانونياً.',
    options: [
      { id: 4201, lettre: 'A', lettre_ar: 'أ', texte: 'وضع الإصبع دائماً داخل واقي الزناد لتكون جاهزاً للضغط السريع', estCorrecte: false },
      { id: 4202, lettre: 'B', lettre_ar: 'ب', texte: 'اعتبار السلاح دائماً ملقماً وتوجيه الفوهة في اتجاه آمن مع بقاء الإصبع خارج الزناد', estCorrecte: true },
      { id: 4203, lettre: 'C', lettre_ar: 'ج', texte: 'توجيه السلاح نحو الزملاء على سبيل المزاح إذا كان فارغاً', estCorrecte: false },
      { id: 4204, lettre: 'D', lettre_ar: 'د', texte: 'عدم تفقد حجرة النار قبل الرماية توفيراً للوقت', estCorrecte: false }
    ]
  },
  {
    id: 43,
    code: 'Q-ATT-043',
    categorie: 'التركيز والانتباه',
    categorie_code: 'CONCENTRATION_ATTENTION',
    texte: 'في قائمة أسماء مطلوبين للعدالة تضم 100 اسم متشابه، عليك تحديد المشتبه فيه المطلوب بالضبط: "محمد بن علي العلمي، المزداد بتاريخ 14/05/1988 بمدينة فاس". أي الأشخاص التاليين هو المطلوب رسمياً؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['التدقيق في المعطيات الهوياتية', 'منع الأخطاء في توقيف الأشخاص'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.0 }
    ],
    explication: 'التدقيق المركز في جميع العناصر (الاسم الكامل، تاريخ الازدياد، ومكان الازدياد) ضروري لمنع تشابه الأسماء والاعتقال التعسفي لشخص بريء.',
    options: [
      { id: 4301, lettre: 'A', lettre_ar: 'أ', texte: 'محمد بن علي العلمي، المزداد بتاريخ 14/05/1988 بمدينة مكناس', estCorrecte: false },
      { id: 4302, lettre: 'B', lettre_ar: 'ب', texte: 'محمد بن علي العلمي، المزداد بتاريخ 14/05/1988 بمدينة فاس', estCorrecte: true },
      { id: 4303, lettre: 'C', lettre_ar: 'ج', texte: 'محمد بن عمر العلمي، المزداد بتاريخ 14/05/1988 بمدينة فاس', estCorrecte: false },
      { id: 4304, lettre: 'D', lettre_ar: 'د', texte: 'محمد بن علي العلمي، المزداد بتاريخ 14/06/1988 بمدينة فاس', estCorrecte: false }
    ]
  },
  {
    id: 44,
    code: 'Q-ATT-044',
    categorie: 'التركيز والانتباه',
    categorie_code: 'CONCENTRATION_ATTENTION',
    texte: 'أثناء مراقبة شاشات المراقبة بالفيديو المتعددة (8 شاشات معاً) لغرفة العمليات، ما هو الأسلوب الصحيح للانتباه لتفادي التشتت الذهني وإغفال الأحداث الطارئة؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['المراقبة المتعددة للشاشات', 'إدارة الحمل الإدراكي'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.0 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'المسح التتابعي المنتظم بين الشاشات وفق تسلسل محدد (Pattern) مع التركيز الفوري عند رصد حركة غير نمطية هو الأسلوب الأنجع لتفادي العمى الانتباهي (Inattentional blindness).',
    options: [
      { id: 4401, lettre: 'A', lettre_ar: 'أ', texte: 'التحديق في الشاشة رقم 1 طوال فترة العمل وتجاهل باقي الشاشات', estCorrecte: false },
      { id: 4402, lettre: 'B', lettre_ar: 'ب', texte: 'تطبيق تسلسل مسح دائري منظم بين الشاشات مع التوقف عند المؤشرات الحركية الشاذة', estCorrecte: true },
      { id: 4403, lettre: 'C', lettre_ar: 'ج', texte: 'إيقاف تشغيل نصف الشاشات لتقليل الإضاءة', estCorrecte: false },
      { id: 4404, lettre: 'D', lettre_ar: 'د', texte: 'الاعتماد على حاسة السمع فقط دون النظر للشاشات', estCorrecte: false }
    ]
  },
  {
    id: 45,
    code: 'Q-ATT-045',
    categorie: 'التركيز والانتباه',
    categorie_code: 'CONCENTRATION_ATTENTION',
    texte: 'عند تفتيش شاحنة نقل دولية للبضائع، أي من هذه العلامات الدقيقة في الصندوق الخلفي يجب أن تستثير انتباهك لوجود مخبأ سري مهيأ للتهريب؟',
    difficulte: 'صعب',
    difficulte_code: 'AVANCE',
    coefficient: 2.0,
    competences: ['كشف المخابئ السرية', 'التفتيش العملياتي الدقيق'],
    specialites_ponderation: [
      { code: 'SPEC-ROUTE', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 }
    ],
    explication: 'وجود رائحة طلاء جديدة أو سيليكون حديث في جزء محدد، أو عدم تطابق عمق الصندوق المقاس من الداخل مع طوله المقاس من الخارج، يدل قطعاً على تجويف أو جدار عازل مصطنع.',
    options: [
      { id: 4501, lettre: 'A', lettre_ar: 'أ', texte: 'وجود غبار قديم متراكم بشكل متجانس على كل الزوايا', estCorrecte: false },
      { id: 4502, lettre: 'B', lettre_ar: 'ب', texte: 'فارق في قياس الطول بين الداخل والخارج مع وجود لحام أو سيليكون حديث في الجدار الأمامي', estCorrecte: true },
      { id: 4503, lettre: 'C', lettre_ar: 'ج', texte: 'وجود إطار احتياطي معلق في مكانه الأصلي المخصص', estCorrecte: false },
      { id: 4504, lettre: 'D', lettre_ar: 'د', texte: 'نظافة زجاج المقصورة الأمامية للشاحنة', estCorrecte: false }
    ]
  },
  {
    id: 46,
    code: 'Q-ATT-046',
    categorie: 'التركيز والانتباه',
    categorie_code: 'CONCENTRATION_ATTENTION',
    texte: 'أثناء عد وإحصاء ذخيرة حية في مخزن السلاح: الصندوق يحتوي على 20 علبة، وكل علبة تضم 25 طلقة. أثناء التدقيق السريع، وُجدت علبتان ناقصتان 3 طلقات في كل منهما. كم عدد الطلقات الإجمالي الفعلي الموجود داخل الصندوق؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الحساب العملياتي للذخائر', 'دقة الجرد والرقابة'],
    specialites_ponderation: [
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'العدد الكلي المفترض = 20 × 25 = 500 طلقة. النقص = علبتان × 3 طلقات = 6 طلقات. الإجمالي الفعلي = 500 - 6 = 494 طلقة.',
    options: [
      { id: 4601, lettre: 'A', lettre_ar: 'أ', texte: '500 طلقة', estCorrecte: false },
      { id: 4602, lettre: 'B', lettre_ar: 'ب', texte: '494 طلقة', estCorrecte: true },
      { id: 4603, lettre: 'C', lettre_ar: 'ج', texte: '497 طلقة', estCorrecte: false },
      { id: 4604, lettre: 'D', lettre_ar: 'د', texte: '488 طلقة', estCorrecte: false }
    ]
  },
  {
    id: 47,
    code: 'Q-ATT-047',
    categorie: 'التركيز والانتباه',
    categorie_code: 'CONCENTRATION_ATTENTION',
    texte: 'في تمرين تتبع بالعين المجردة لسيارة تسير وسط حركة مرورية كثيفة، انحرفت السيارة خلف حافلة ركاب كبيرة ثم ظهرت سيارة مماثلة من الجهة الأخرى. ما العنصر الأسرع الذي يجب أن يثبت عليه انتباهك فوراً للتأكد أنها نفس السيارة المستهدفة وليست غيرها؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['التتبع البصري التكتيكي', 'التمييز السريع للمركبات'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'علامة فارقة بصرية مميزة (مثل كسر في المصباح الخلفي، ملصق معين على الزجاج، أو رقم اللوحة) تكون أسرع وأدق للتحقق من هوية المركبة ومنع الوقوع في فخ التمويه أو الشبيه.',
    options: [
      { id: 4701, lettre: 'A', lettre_ar: 'أ', texte: 'عدد الركاب في الحافلة الكبيرة', estCorrecte: false },
      { id: 4702, lettre: 'B', lettre_ar: 'ب', texte: 'علامة فارقة فريدة مسجلة مسبقاً (كرقم اللوحة، أو كسر في زجاج/مصباح معين)', estCorrecte: true },
      { id: 4703, lettre: 'C', lettre_ar: 'ج', texte: 'لون غطاء عجلات السيارات الأخرى المجاورة', estCorrecte: false },
      { id: 4704, lettre: 'D', lettre_ar: 'د', texte: 'التوقف تماماً والاتصال بالأرصاد الجوية', estCorrecte: false }
    ]
  },
  {
    id: 48,
    code: 'Q-ATT-048',
    categorie: 'التركيز والانتباه',
    categorie_code: 'CONCENTRATION_ATTENTION',
    texte: 'عند استلام أمر عملياتي مشفر عبر البرقية اللاسلكية: "تحرك فوري للموقع دلتا-4، مستوى التهديد برتقالي، الصمت اللاسلكي ساري المفعول حتى الإشعار الآخر". ما الذي يمنعك هذا الأمر من فعله انتباهياً وانضباطياً؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الانضباط الإجرائي اللاسلكي', 'الاستيعاب السريع للتعليمات المشفرة'],
    specialites_ponderation: [
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.0 },
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 }
    ],
    explication: 'فرض الصمت اللاسلكي (Silence radio) يمنع تماماً إجراء أي إرسال أو كلام عبر أجهزة اللاسلكي لتفادي اعتراض الإشارات أو كشف مكان القوة للمشتبه فيهم، ما عدا في حالات الخطر المهدد للحياة.',
    options: [
      { id: 4801, lettre: 'A', lettre_ar: 'أ', texte: 'يمنع قيادة السيارات بسرعة معتدلة', estCorrecte: false },
      { id: 4802, lettre: 'B', lettre_ar: 'ب', texte: 'يمنع بث أي رسائل صوتية عبر اللاسلكي حفاظاً على سرية العملية وعدم كشف موقع الفرقة', estCorrecte: true },
      { id: 4803, lettre: 'C', lettre_ar: 'ج', texte: 'يمنع ارتداء الخوذة الواقية', estCorrecte: false },
      { id: 4804, lettre: 'D', lettre_ar: 'د', texte: 'يمنع استخدام المكابح أثناء السير', estCorrecte: false }
    ]
  },
  {
    id: 49,
    code: 'Q-ATT-049',
    categorie: 'التركيز والانتباه',
    categorie_code: 'CONCENTRATION_ATTENTION',
    texte: 'في مستودع حفظ المحجوزات، طُلب منك مطابقة 4 أكياس أحراز قضائية مختومة تحمل الرموز: (S-104-A)، (S-104-B)، (S-105-A)، (S-105-B). تبين أن أحد الأكياس تم فتح سلك رصاصه الفضي وإعادة لفه يدوياً دون ختم القفل الرسمي. ما هو الإجراء الانتباهي الفوري؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['سلامة سلسلة الحراسة للأحراز', 'الانتباه لسلامة الأختام القضائية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.0 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 }
    ],
    explication: 'أي تلاعب أو مساس بختم الرصاص للحرز القضائي (Scellé) يكسر سلسلة الحراسة (Chaîne de traçabilité)، ويستوجب تحرير محضر إثبات حالة فوري وتوقيف التداول لإشعار النيابة العامة والتحقيق في الواقعة.',
    options: [
      { id: 4901, lettre: 'A', lettre_ar: 'أ', texte: 'إعادة إغلاقه بلاصق شفاف وإخفاء الأمر حفاظاً على وقت المحكمة', estCorrecte: false },
      { id: 4902, lettre: 'B', lettre_ar: 'ب', texte: 'إيقاف الاستلام فوراً، وتحرير تقرير فني بكسر الختم وإشعار المسؤول القضائي المختص', estCorrecte: true },
      { id: 4903, lettre: 'C', lettre_ar: 'ج', texte: 'رمي الحرز في سلة المهملات لعدم صلاحيته', estCorrecte: false },
      { id: 4904, lettre: 'D', lettre_ar: 'د', texte: 'تبديل الكيس بكيس آخر فارغ دون إخبار أحد', estCorrecte: false }
    ]
  },
  {
    id: 50,
    code: 'Q-ATT-050',
    categorie: 'التركيز والانتباه',
    categorie_code: 'CONCENTRATION_ATTENTION',
    texte: 'خلال تأمين احتفال رسمي وسط حشد جماهيري غفير، ما هو العنصر الذي ينبغي لعنصر الحماية المقربة (GEH / GSI) التركيز عليه بالدرجة الأولى لتفادي التهديدات؟',
    difficulte: 'صعب',
    difficulte_code: 'AVANCE',
    coefficient: 2.0,
    competences: ['الحماية المقربة وتأمين الشخصيات', 'رصد التهديدات في الحشود'],
    specialites_ponderation: [
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.5 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'في مبادئ الحماية المقربة العالمية: "الأيدي هي التي تؤذي" (The hands are the threat). يجب التركيز المستمر على حركة أيدي الأشخاص في المحيط القريب ورصد محاولات إخراج أجسام أو مد اليد نحو الجيوب.',
    options: [
      { id: 5001, lettre: 'A', lettre_ar: 'أ', texte: 'أحذية الأشخاص وألوان ملابسهم', estCorrecte: false },
      { id: 5002, lettre: 'B', lettre_ar: 'ب', texte: 'أيدي الأشخاص المحيطين وسلوكياتهم الحركية ونظراتهم الموجهة للشخصية المحمية', estCorrecte: true },
      { id: 5003, lettre: 'C', lettre_ar: 'ج', texte: 'تصميم لافتات المحلات التجارية المجاورة', estCorrecte: false },
      { id: 5004, lettre: 'D', lettre_ar: 'د', texte: 'الاستماع لأغاني الحفل والتفاعل معها', estCorrecte: false }
    ]
  }
];
