// ==============================================================================
// الفئة 1: الاستدلال المنطقي (20 سؤال - من 1 إلى 20)
// ==============================================================================

export const questionsLogique = [
  {
    id: 1,
    code: 'Q-LOG-001',
    categorie: 'الاستدلال المنطقي',
    categorie_code: 'LOGIQUE',
    texte: 'إذا كانت جميع دوريات التدخل السريع مجهزة بنظام الاتصال المشفر، وبعض سيارات الدرك الملكي تابعة لفرق التدخل السريع، فما هو الاستنتاج المنطقي الحتمي الصائب؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['الاستدلال الاستنباطي', 'التحليل المنطقي الصارم'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 },
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'بما أن كل دوريات التدخل مجهزة بنظام مشفر، والبعض من سيارات الدرك ينتمي لهذا الصنف، فإن بعض سيارات الدرك على الأقل مجهزة بنظام الاتصال المشفر بالضرورة المنطقية.',
    options: [
      { id: 101, lettre: 'A', lettre_ar: 'أ', texte: 'جميع سيارات الدرك الملكي بدون استثناء مجهزة بالنظام المشفر', estCorrecte: false },
      { id: 102, lettre: 'B', lettre_ar: 'ب', texte: 'بعض سيارات الدرك الملكي على الأقل مجهزة بنظام الاتصال المشفر', estCorrecte: true },
      { id: 103, lettre: 'C', lettre_ar: 'ج', texte: 'لا توجد أي سيارة تابعة للدرك الملكي تستخدم الاتصال المشفر', estCorrecte: false },
      { id: 104, lettre: 'D', lettre_ar: 'د', texte: 'الاتصال المشفر مخصص فقط للشاحنات اللوجستية الثقيلة', estCorrecte: false }
    ]
  },
  {
    id: 2,
    code: 'Q-LOG-002',
    categorie: 'الاستدلال المنطقي',
    categorie_code: 'LOGIQUE',
    texte: 'في سلسلة التوقيت العملياتي التالية للدوريات: (06:00 ، 06:45 ، 07:45 ، 09:00 ، ...)، ما هو توقيت انطلاق الدورية الموالية وفق النمط الزمني المضطرد؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['الاستدلال التتابعي', 'الحساب الذهني العملياتي'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 1.5 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 }
    ],
    explication: 'الفوارق الزمنية تتصاعد بمقدار 15 دقيقة في كل خطوة: (+45 دقيقة، ثم +60 دقيقة، ثم +75 دقيقة). الفارق التالي هو +90 دقيقة (ساعة ونصف)، و09:00 + 1h30 = 10:30.',
    options: [
      { id: 201, lettre: 'A', lettre_ar: 'أ', texte: '10:00', estCorrecte: false },
      { id: 202, lettre: 'B', lettre_ar: 'ب', texte: '10:15', estCorrecte: false },
      { id: 203, lettre: 'C', lettre_ar: 'ج', texte: '10:30', estCorrecte: true },
      { id: 204, lettre: 'D', lettre_ar: 'د', texte: '10:45', estCorrecte: false }
    ]
  },
  {
    id: 3,
    code: 'Q-LOG-003',
    categorie: 'الاستدلال المنطقي',
    categorie_code: 'LOGIQUE',
    texte: 'إذا كان الضابط (أ) أقدم رتبة من الرقيب (ب)، والرقيب (ج) أحدث رتبة من الرقيب (ب)، والمساعد (د) أقدم رتبة من الضابط (أ)، فمن هو صاحب الرتبة الأدنى بين الأربعة؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الترتيب الهرمي', 'الاستنتاج المباشر'],
    specialites_ponderation: [
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.0 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 1.5 }
    ],
    explication: 'الترتيب التنازلي للأقدمية: المساعد (د) > الضابط (أ) > الرقيب (ب) > الرقيب (ج). إذن الرقيب (ج) هو الأحدث رتبة أي صاحب الرتبة الأدنى في المجموعة.',
    options: [
      { id: 301, lettre: 'A', lettre_ar: 'أ', texte: 'الضابط (أ)', estCorrecte: false },
      { id: 302, lettre: 'B', lettre_ar: 'ب', texte: 'الرقيب (ب)', estCorrecte: false },
      { id: 303, lettre: 'C', lettre_ar: 'ج', texte: 'الرقيب (ج)', estCorrecte: true },
      { id: 304, lettre: 'D', lettre_ar: 'د', texte: 'المساعد (د)', estCorrecte: false }
    ]
  },
  {
    id: 4,
    code: 'Q-LOG-004',
    categorie: 'الاستدلال المنطقي',
    categorie_code: 'LOGIQUE',
    texte: 'خمسة عناصر درك (س، ع، ص، ق، ر) في طابور تفتيش. العنصر (ص) ليس الأول ولا الأخير. العنصر (س) يسبق (ع) مباشرة. العنصر (ر) في المركز الأخير. إذا كان (ص) يسبق (س)، فمن يقف أولاً؟',
    difficulte: 'صعب',
    difficulte_code: 'AVANCE',
    coefficient: 2.0,
    competences: ['حل المشكلات المنطقية المركبة', 'الترتيب المكاني'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 1.5 }
    ],
    explication: 'العنصر (ر) في المركز الخامس والأخير. ترتيب (ص يسبق س يسبق ع) يأخذ 3 مراكز متتالية. بما أن (ص) ليس الأول ولا الأخير، فمكانه هو الثاني، يليه (س) ثالثاً، ثم (ع) رابعاً، و(ر) خامساً. إذن المركز الأول حتماً هو للعنصر (ق).',
    options: [
      { id: 401, lettre: 'A', lettre_ar: 'أ', texte: 'العنصر (س)', estCorrecte: false },
      { id: 402, lettre: 'B', lettre_ar: 'ب', texte: 'العنصر (ق)', estCorrecte: true },
      { id: 403, lettre: 'C', lettre_ar: 'ج', texte: 'العنصر (ص)', estCorrecte: false },
      { id: 404, lettre: 'D', lettre_ar: 'د', texte: 'العنصر (ع)', estCorrecte: false }
    ]
  },
  {
    id: 5,
    code: 'Q-LOG-005',
    categorie: 'الاستدلال المنطقي',
    categorie_code: 'LOGIQUE',
    texte: 'إذا كانت العبارة الشرطية التالية صحيحة: "إذا تم تفعيل خطة الطوارئ (أ)، يتم وجوباً إغلاق المعبر الحدودي (ب)". فما هي العبارة المعاكسة إيجابياً (Contraposée) التي تعتبر صحيحة حتماً؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.5,
    competences: ['المنطق الرياضي والرمزي', 'التحليل الاستدلالي'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 2.0 },
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 1.5 }
    ],
    explication: 'قاعدة المنطق الصوري: العبارة (إذا تحقق أ فإن ب يتحقق) تكافئ منطقياً (إذا لم يتحقق ب، فإنه حتماً لم يتم تفعيل أ).',
    options: [
      { id: 501, lettre: 'A', lettre_ar: 'أ', texte: 'إذا تم إغلاق المعبر (ب)، فإن الخطة (أ) قد تم تفعيلها بالضرورة', estCorrecte: false },
      { id: 502, lettre: 'B', lettre_ar: 'ب', texte: 'إذا لم يتم إغلاق المعبر الحدودي (ب)، فإن خطة الطوارئ (أ) لم تفعل حتماً', estCorrecte: true },
      { id: 503, lettre: 'C', lettre_ar: 'ج', texte: 'إذا لم تفعل الخطة (أ)، فلن يغلق المعبر (ب) أبداً', estCorrecte: false },
      { id: 504, lettre: 'D', lettre_ar: 'د', texte: 'إغلاق المعبر لا يرتبط بأي خطة أمنية مسبقة', estCorrecte: false }
    ]
  },
  {
    id: 6,
    code: 'Q-LOG-006',
    categorie: 'الاستدلال المنطقي',
    categorie_code: 'LOGIQUE',
    texte: 'سلسلة أعداد تمثل تشفير الاتصالات التكتيكية: (2 ، 6 ، 18 ، 54 ، ...). ما هو العدد التالي في السلسلة؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['المتتاليات الحسابية', 'الاستدلال العددي السريع'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.0 }
    ],
    explication: 'المتتالية تضاعفية بضرب كل حد في العدد 3 (2×3=6 ، 6×3=18 ، 18×3=54). الحد التالي هو 54 × 3 = 162.',
    options: [
      { id: 601, lettre: 'A', lettre_ar: 'أ', texte: '108', estCorrecte: false },
      { id: 602, lettre: 'B', lettre_ar: 'ب', texte: '144', estCorrecte: false },
      { id: 603, lettre: 'C', lettre_ar: 'ج', texte: '162', estCorrecte: true },
      { id: 604, lettre: 'D', lettre_ar: 'د', texte: '180', estCorrecte: false }
    ]
  },
  {
    id: 7,
    code: 'Q-LOG-007',
    categorie: 'الاستدلال المنطقي',
    categorie_code: 'LOGIQUE',
    texte: 'في مستودع للأسلحة، كل البنادق الآلية مرقمة، وبعض الأسلحة المرقمة مصنوعة من سبائك التيتانيوم. ما النتيجة المنطقية التي لا يمكن دحضها؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['الاستقراء المنطقي', 'نفي المغالطات الصورية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 1.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'لا يمكن الجزم بأن كل البنادق من التيتانيوم ولا بأن التيتانيوم للبنادق فقط، لكن الثابت يقيناً هو أن بعض الأسلحة في المستودع مرقمة.',
    options: [
      { id: 701, lettre: 'A', lettre_ar: 'أ', texte: 'كل بنادق المستودع مصنوعة حتماً من التيتانيوم', estCorrecte: false },
      { id: 702, lettre: 'B', lettre_ar: 'ب', texte: 'يوجد أسلحة مرقمة داخل المستودع', estCorrecte: true },
      { id: 703, lettre: 'C', lettre_ar: 'ج', texte: 'لا توجد بنادق مصنوعة من التيتانيوم إطلاقاً', estCorrecte: false },
      { id: 704, lettre: 'D', lettre_ar: 'د', texte: 'جميع المسدسات الفردية غير مرقمة', estCorrecte: false }
    ]
  },
  {
    id: 8,
    code: 'Q-LOG-008',
    categorie: 'الاستدلال المنطقي',
    categorie_code: 'LOGIQUE',
    texte: 'تستغرق سيارة الدرك ساعة و20 دقيقة لقطع مسافة بسرعة 90 كم/س. كم ستستغرق نفس السيارة لقطع ذات المسافة إذا رفعت سرعتها إلى 120 كم/س؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.5,
    competences: ['التناسب العكسي', 'الحساب التقديري العملياتي'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'ساعة و20 دقيقة = 4/3 ساعة. المسافة = 90 × (4/3) = 120 كم. بالسرعة الجديدة 120 كم/س: الزمن = المسافة / السرعة = 120 / 120 = ساعة واحدة تماماً (60 دقيقة).',
    options: [
      { id: 801, lettre: 'A', lettre_ar: 'أ', texte: '45 دقيقة', estCorrecte: false },
      { id: 802, lettre: 'B', lettre_ar: 'ب', texte: '50 دقيقة', estCorrecte: false },
      { id: 803, lettre: 'C', lettre_ar: 'ج', texte: '60 دقيقة (ساعة واحدة)', estCorrecte: true },
      { id: 804, lettre: 'D', lettre_ar: 'د', texte: '70 دقيقة', estCorrecte: false }
    ]
  },
  {
    id: 9,
    code: 'Q-LOG-009',
    categorie: 'الاستدلال المنطقي',
    categorie_code: 'LOGIQUE',
    texte: 'إذا كانت الإشارة اللاسلكية الخضراء تعني "تقدم"، والصفراء تعني "استعد"، والحمراء تعني "توقف". إذا ألغي اللون الأصفر واستعيض عنه بوميض أخضر متقطع، فما هو التفسير المنطقي لوميض أخضر متقطع؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['تأويل الإشارات الميدانية', 'الترميز العملياتي'],
    specialites_ponderation: [
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 1.5 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 1.5 }
    ],
    explication: 'الاستبدال المنطقي المباشر: الوميض الأخضر أخذ دلالة اللون الأصفر الملغى، وبالتالي فدلالته الحتمية هي "استعد".',
    options: [
      { id: 901, lettre: 'A', lettre_ar: 'أ', texte: 'توقف فوري وشامل', estCorrecte: false },
      { id: 902, lettre: 'B', lettre_ar: 'ب', texte: 'استعد للتحرك أو اتخاذ الموقع', estCorrecte: true },
      { id: 903, lettre: 'C', lettre_ar: 'ج', texte: 'انسحاب تكتيكي للخلف', estCorrecte: false },
      { id: 904, lettre: 'D', lettre_ar: 'د', texte: 'طلب إمداد بالوقود', estCorrecte: false }
    ]
  },
  {
    id: 10,
    code: 'Q-LOG-010',
    categorie: 'الاستدلال المنطقي',
    categorie_code: 'LOGIQUE',
    texte: 'متتالية أشكال هندسية في شاشات الرادار: (مثلث: 3 زوايا ، مربع: 4 زوايا ، مخمس: 5 زوايا ، مسدس: 6 زوايا). إذا كان الشكل التالي يزيد في عدد الأقطار وليس الزوايا فقط، فما هو عدد أضلاع الشكل التالي؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الاستدلال الهندسي', 'التعرف على الأنماط'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 1.5 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 1.0 }
    ],
    explication: 'النمط يتبع بانتظام تسلسل المضلعات المنتظمة بإضافة ضلع واحد في كل خطوة (3، 4، 5، 6)، فالشكل الموالي هو المسبع ذو 7 أضلاع.',
    options: [
      { id: 1001, lettre: 'A', lettre_ar: 'أ', texte: '6 أضلاع', estCorrecte: false },
      { id: 1002, lettre: 'B', lettre_ar: 'ب', texte: '7 أضلاع (مسبع)', estCorrecte: true },
      { id: 1003, lettre: 'C', lettre_ar: 'ج', texte: '8 أضلاع', estCorrecte: false },
      { id: 1004, lettre: 'D', lettre_ar: 'د', texte: '9 أضلاع', estCorrecte: false }
    ]
  },
  {
    id: 11,
    code: 'Q-LOG-011',
    categorie: 'الاستدلال المنطقي',
    categorie_code: 'LOGIQUE',
    texte: 'ثلاثة حراس (علي، حسن، عمر). أحدهم صادق دائماً، والآخر كاذب دائماً، والثالث يصدق أحياناً. قال علي: "حسن كاذب". وقال حسن: "عمر كاذب". وقال عمر: "علي وحسن كاذبان معاً". من هو الصادق دائماً من بينهم؟',
    difficulte: 'صعب',
    difficulte_code: 'AVANCE',
    coefficient: 2.0,
    competences: ['مفارقات الصدق والكذب', 'التحليل الاستدلالي المتقدم'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 2.0 }
    ],
    explication: 'لو كان عمر صادقاً لكان علي وحسن كاذبين، لكن قول حسن "عمر كاذب" سيكون صادقاً وهذا تناقض. إذن عمر كاذب. بالتالي قول حسن "عمر كاذب" صحيح، فحسن هو الصادق وعلي هو المتذبذب.',
    options: [
      { id: 1101, lettre: 'A', lettre_ar: 'أ', texte: 'علي', estCorrecte: false },
      { id: 1102, lettre: 'B', lettre_ar: 'ب', texte: 'حسن', estCorrecte: true },
      { id: 1103, lettre: 'C', lettre_ar: 'ج', texte: 'عمر', estCorrecte: false },
      { id: 1104, lettre: 'D', lettre_ar: 'د', texte: 'لا يمكن تحديده رياضياً', estCorrecte: false }
    ]
  },
  {
    id: 12,
    code: 'Q-LOG-012',
    categorie: 'الاستدلال المنطقي',
    categorie_code: 'LOGIQUE',
    texte: 'متتالية أرقام مشفرة لمجموعات الدوريات: (100 ، 95 ، 85 ، 70 ، 50 ، ...). ما هو الرقم الآتي في المتتالية؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['الاستنتاج الرياضي', 'التحليل المتسلسل'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 1.5 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.0 }
    ],
    explication: 'الفروق تتناقص بتصاعد: (-5 ، -10 ، -15 ، -20). الفارق التالي هو -25. إذن: 50 - 25 = 25.',
    options: [
      { id: 1201, lettre: 'A', lettre_ar: 'أ', texte: '30', estCorrecte: false },
      { id: 1202, lettre: 'B', lettre_ar: 'ب', texte: '25', estCorrecte: true },
      { id: 1203, lettre: 'C', lettre_ar: 'ج', texte: '20', estCorrecte: false },
      { id: 1204, lettre: 'D', lettre_ar: 'د', texte: '15', estCorrecte: false }
    ]
  },
  {
    id: 13,
    code: 'Q-LOG-013',
    categorie: 'الاستدلال المنطقي',
    categorie_code: 'LOGIQUE',
    texte: 'إذا كانت جميع المعدات العسكرية الثقيلة تخضع للصيانة الشهرية، وجميع الآليات الخاضعة للصيانة الشهرية تسجل في الدفتر الرسمي، فما هي النتيجة المنطقية المؤكدة؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['القياس المنطقي التام', 'قواعد الاستنتاج'],
    specialites_ponderation: [
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 1.5 }
    ],
    explication: 'قياس منطقي قاطع من الدرجة الأولى (معدات ثقيلة -> صيانة شهرية -> تسجيل بالدفتر). النتيجة: جميع المعدات الثقيلة تسجل في الدفتر الرسمي حتماً.',
    options: [
      { id: 1301, lettre: 'A', lettre_ar: 'أ', texte: 'جميع المعدات العسكرية الثقيلة تسجل في الدفتر الرسمي بالضرورة', estCorrecte: true },
      { id: 1302, lettre: 'B', lettre_ar: 'ب', texte: 'المعدات الخفيفة فقط هي التي تسجل في الدفتر', estCorrecte: false },
      { id: 1303, lettre: 'C', lettre_ar: 'ج', texte: 'الدفتر الرسمي لا يحتوي على أي معدات ثقيلة', estCorrecte: false },
      { id: 1304, lettre: 'D', lettre_ar: 'د', texte: 'الصيانة الشهرية اختيارية وليست إلزامية', estCorrecte: false }
    ]
  },
  {
    id: 14,
    code: 'Q-LOG-014',
    categorie: 'الاستدلال المنطقي',
    categorie_code: 'LOGIQUE',
    texte: 'خزان وقود بقاعدة عسكرية يفرغ بمعدل ثابت كل 4 ساعات بمقدار الثلث. إذا كان ممتلئاً بالكامل الساعة 08:00 صباحاً، فكم سيتبقى منه في الساعة 16:00 من نفس اليوم؟',
    difficulte: 'صعب',
    difficulte_code: 'AVANCE',
    coefficient: 2.0,
    competences: ['الحساب التراكمي النسبي', 'التفكير الاستراتيجي في الإمداد'],
    specialites_ponderation: [
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 }
    ],
    explication: 'بين 08:00 و16:00 تمر 8 ساعات (فترتان من 4 ساعات). في الفترة الأولى ينقص الثلث ويتبقى 2/3. في الفترة الثانية ينقص ثلث المتبقي: (2/3) - (1/3 × 2/3) = (2/3) × (2/3) = 4/9.',
    options: [
      { id: 1401, lettre: 'A', lettre_ar: 'أ', texte: '1/3 من الخزان', estCorrecte: false },
      { id: 1402, lettre: 'B', lettre_ar: 'ب', texte: '4/9 من الخزان', estCorrecte: true },
      { id: 1403, lettre: 'C', lettre_ar: 'ج', texte: '1/2 من الخزان', estCorrecte: false },
      { id: 1404, lettre: 'D', lettre_ar: 'د', texte: 'يفرغ تماماً ويصل للصفر', estCorrecte: false }
    ]
  },
  {
    id: 15,
    code: 'Q-LOG-015',
    categorie: 'الاستدلال المنطقي',
    categorie_code: 'LOGIQUE',
    texte: 'إذا كانت كلمة "درك" تشفر رقمياً بالرمز (4-10-20)، وكلمة "أمن" تشفر بالرمز (1-24-25)، فما المبدأ الرياضي المعتمد في توليد هذا التشفير التكتيكي البسيط؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.5,
    competences: ['التشفير التناظري', 'الاستدلال الاستدلالي الرمزي'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'استبدال كل حرف أبجدي برقمه التسلسلي المباشر في جدول الأبجدية المتفق عليه كنظام مصفوفة إبدال ثابتة.',
    options: [
      { id: 1501, lettre: 'A', lettre_ar: 'أ', texte: 'ضرب عدد حروف الكلمة في تاريخ اليوم', estCorrecte: false },
      { id: 1502, lettre: 'B', lettre_ar: 'ب', texte: 'إبدال كل حرف بالرتبة الأبجدية المحددة في مصفوفة التشفير', estCorrecte: true },
      { id: 1503, lettre: 'C', lettre_ar: 'ج', texte: 'اختيار الأرقام عشوائياً دون أي قاعدة', estCorrecte: false },
      { id: 1504, lettre: 'D', lettre_ar: 'د', texte: 'حساب عدد النقاط في كل حرف فقط', estCorrecte: false }
    ]
  },
  {
    id: 16,
    code: 'Q-LOG-016',
    categorie: 'الاستدلال المنطقي',
    categorie_code: 'LOGIQUE',
    texte: 'أربعة صناديق ذخيرة مغلقة تحمل ملصقات خاطئة جميعها: [رصاص 9 مم]، [رصاص 7.62 مم]، [مختلط]. إذا سمح لك بفتح صندوق واحد فقط وأخذ طلقة واحدة منه لمعرفة محتويات جميع الصناديق، فأي صندوق تختار فتحه؟',
    difficulte: 'صعب',
    difficulte_code: 'AVANCE',
    coefficient: 2.0,
    competences: ['الاستدلال الاستنباطي الإقصائي', 'المنطق الرياضي للمعلومة الناقصة'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 1.5 }
    ],
    explication: 'تختار الصندوق الموسوم بـ [مختلط]. بما أن ملصقه خاطئ حتماً، فالطلقة التي تسحبها تحدد نوعه بيقين (إما 9 مم فقط أو 7.62 مم فقط)، وبالتالي ينكشف محتوى الصندوقين الآخرين بالإقصاء المباشر.',
    options: [
      { id: 1601, lettre: 'A', lettre_ar: 'أ', texte: 'الصندوق الذي يحمل ملصق [رصاص 9 مم]', estCorrecte: false },
      { id: 1602, lettre: 'B', lettre_ar: 'ب', texte: 'الصندوق الذي يحمل ملصق [مختلط]', estCorrecte: true },
      { id: 1603, lettre: 'C', lettre_ar: 'ج', texte: 'الصندوق الذي يحمل ملصق [رصاص 7.62 مم]', estCorrecte: false },
      { id: 1604, lettre: 'D', lettre_ar: 'د', texte: 'لا يمكن معرفتها دون فتح جميع الصناديق', estCorrecte: false }
    ]
  },
  {
    id: 17,
    code: 'Q-LOG-017',
    categorie: 'الاستدلال المنطقي',
    categorie_code: 'LOGIQUE',
    texte: 'إذا علمت أن "كل حراس الشخصيات يتقنون الرماية الدقيقة"، و"بعض المظليين هم حراس شخصيات"، فما هي النتيجة الحتمية؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['المنطق الأرسطي', 'العلاقات بين المجموعات'],
    specialites_ponderation: [
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.0 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 1.5 }
    ],
    explication: 'تقاطع مجموعة المظليين مع مجموعة حراس الشخصيات يعني حتماً أن العناصر المشتركة تتقن الرماية الدقيقة، إذن: بعض المظليين يتقنون الرماية الدقيقة.',
    options: [
      { id: 1701, lettre: 'A', lettre_ar: 'أ', texte: 'جميع المظليين بدون استثناء يتقنون الرماية الدقيقة', estCorrecte: false },
      { id: 1702, lettre: 'B', lettre_ar: 'ب', texte: 'بعض المظليين يتقنون الرماية الدقيقة بالضرورة', estCorrecte: true },
      { id: 1703, lettre: 'C', lettre_ar: 'ج', texte: 'لا يوجد أي مظلي يتقن الرماية', estCorrecte: false },
      { id: 1704, lettre: 'D', lettre_ar: 'د', texte: 'حراس الشخصيات لا ينفذون قفزاً مظلياً أبداً', estCorrecte: false }
    ]
  },
  {
    id: 18,
    code: 'Q-LOG-018',
    categorie: 'الاستدلال المنطقي',
    categorie_code: 'LOGIQUE',
    texte: 'متتالية أحرف تكتيكية: (أ ، ج ، هـ ، ز ، ...). ما هو الحرف العربي الآتي في النمط؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['المتتاليات الحرفية', 'التركيز على التسلسل الأبجدي'],
    specialites_ponderation: [
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 },
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 1.0 }
    ],
    explication: 'النمط يتجاوز حرفاً واحداً في كل خطوة في الترتيب الأبجدي الهجائي: (أ [ب] ج [د] هـ [و] ز [ح] ط). إذن الحرف التالي هو "ط".',
    options: [
      { id: 1801, lettre: 'A', lettre_ar: 'أ', texte: 'ح', estCorrecte: false },
      { id: 1802, lettre: 'B', lettre_ar: 'ب', texte: 'ط', estCorrecte: true },
      { id: 1803, lettre: 'C', lettre_ar: 'ج', texte: 'ي', estCorrecte: false },
      { id: 1804, lettre: 'D', lettre_ar: 'د', texte: 'ك', estCorrecte: false }
    ]
  },
  {
    id: 19,
    code: 'Q-LOG-019',
    categorie: 'الاستدلال المنطقي',
    categorie_code: 'LOGIQUE',
    texte: 'إذا كانت بطارية جهاز الإرسال اللاسلكي تنفد بنسبة 15% كل ساعتين في وضع الاستعداد، وبنسبة 40% كل ساعتين في وضع البث المستمر. إذا بقي الجهاز 4 ساعات في الاستعداد ثم ساعتين في البث، فما النسبة المتبقية من الشحن؟',
    difficulte: 'صعب',
    difficulte_code: 'AVANCE',
    coefficient: 2.0,
    competences: ['الحساب العملياتي للطاقة', 'التخطيط اللوجستي'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'الاستعداد: 4 ساعات = فترتان من ساعتين = 2 × 15% = 30%. البث: ساعتان = 40%. إجمالي الاستهلاك = 30% + 40% = 70%. النسبة المتبقية من 100% = 30%.',
    options: [
      { id: 1901, lettre: 'A', lettre_ar: 'أ', texte: '20%', estCorrecte: false },
      { id: 1902, lettre: 'B', lettre_ar: 'ب', texte: '25%', estCorrecte: false },
      { id: 1903, lettre: 'C', lettre_ar: 'ج', texte: '30%', estCorrecte: true },
      { id: 1904, lettre: 'D', lettre_ar: 'د', texte: '35%', estCorrecte: false }
    ]
  },
  {
    id: 20,
    code: 'Q-LOG-020',
    categorie: 'الاستدلال المنطقي',
    categorie_code: 'LOGIQUE',
    texte: 'في قضية سرقة، ثبت أن: "السارق لا يمكن أن يدخل إلا إذا كان يحمل المفتاح الرئيسي أو كسر النافذة". وتبين بالمعاينة أن النافذة سليمة تماماً ولم تكسر. ما الاستنتاج القضائي المنطقي القطعي؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الاستدلال القضائي المباشر', 'إقصاء الفرضيات'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 2.0 }
    ],
    explication: 'قاعدة الفصل المنطقي (Modus Tollendo Ponens): إما أ أو ب. بما أن ب غير محقق يقيناً (النافذة لم تكسر)، فإن أ محقق حتماً، أي أن السارق كان يحوز المفتاح الرئيسي.',
    options: [
      { id: 2001, lettre: 'A', lettre_ar: 'أ', texte: 'السارق قفز من المدخنة العلوية', estCorrecte: false },
      { id: 2002, lettre: 'B', lettre_ar: 'ب', texte: 'السارق كان يحوز المفتاح الرئيسي بالضرورة', estCorrecte: true },
      { id: 2003, lettre: 'C', lettre_ar: 'ج', texte: 'السرقة لم تقع أصلاً والادعاء كاذب', estCorrecte: false },
      { id: 2004, lettre: 'D', lettre_ar: 'د', texte: 'النافذة ستكسر في المستقبل', estCorrecte: false }
    ]
  }
];
