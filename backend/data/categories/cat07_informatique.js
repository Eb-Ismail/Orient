// ==============================================================================
// الفئة 7: المعلوماتية والمهارات الرقمية (15 سؤال - من 96 إلى 110)
// ==============================================================================

export const questionsInformatique = [
  {
    id: 96,
    code: 'Q-NUM-096',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE',
    texte: 'تلقى دركي بريداً إلكترونياً يبدو في ظاهره صادراً عن مديرية الاتصالات يطلب: "تحديث عاجل لكلمة مرور الحساب العملياتي عبر الرابط المرفق خلال ساعتين لتفادي الحظر". ما هو التوصيف السيبراني لهذه الهجمة وما هو السلوك الحذر الواجب؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الأمن السيبراني والوعي بالتهديدات', 'كشف التصيد الاحتيالي Phishing'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 3.0 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'هذه محاولة تصيد احتيالي (Phishing) لسرقة بيانات الاعتماد؛ يجب عدم الضغط على أي رابط، والإبلاغ الفوري لمسؤول أمن نظم المعلومات (RSSI) بالوحدة.',
    options: [
      { id: 9601, lettre: 'A', lettre_ar: 'أ', texte: 'إدخال كلمة المرور القديمة والجديدة فوراً لتفادي غضب المديرية', estCorrecte: false },
      { id: 9602, lettre: 'B', lettre_ar: 'ب', texte: 'هجمة تصيد احتيالي (Phishing)؛ يجب الامتناع عن النقر وإبلاغ خلية أمن الأنظمة فوراً', estCorrecte: true },
      { id: 9603, lettre: 'C', lettre_ar: 'ج', texte: 'إعادة إرسال البريد لجميع الأصدقاء والزملاء لتنبيههم برابط التحديث', estCorrecte: false },
      { id: 9604, lettre: 'D', lettre_ar: 'د', texte: 'الرد على البريد بكلمة سر تجريبية لاختبار نيتهم', estCorrecte: false }
    ]
  },
  {
    id: 97,
    code: 'Q-NUM-097',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE',
    texte: 'أي من كلمات المرور التالية يمثل أعلى مستوى من القوة والمقاومة لهجمات التخمين الشامل (Brute-force) وفق معايير الأمان الرقمي الحديثة؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['إدارة وحماية كلمات المرور', 'الأمان السيبراني الأساسي'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 3.0 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.0 }
    ],
    explication: 'كلمة المرور القوية تتكون من 12 رمزاً على الأقل تجمع بين حروف كبيرة وصغيرة وأرقام ورموز خاصة عشوائية دون تشكيل كلمات قاموسية معروفة.',
    options: [
      { id: 9701, lettre: 'A', lettre_ar: 'أ', texte: '12345678', estCorrecte: false },
      { id: 9702, lettre: 'B', lettre_ar: 'ب', texte: 'Gendarme2024', estCorrecte: false },
      { id: 9703, lettre: 'C', lettre_ar: 'ج', texte: 'T9$mK#8vL!q2@Z', estCorrecte: true },
      { id: 9704, lettre: 'D', lettre_ar: 'د', texte: 'password1234', estCorrecte: false }
    ]
  },
  {
    id: 98,
    code: 'Q-NUM-098',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE',
    texte: 'ما هو الدور الأمني الرئيسي لجدار الحماية (Firewall / Pare-feu) في الشبكة المعلوماتية لمقر قيادة الدرك الملكي؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['هندسة وأمن الشبكات', 'حماية الخوادم والاتصالات'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'يقوم جدار الحماية بمراقبة وتصفية حركة البيانات الصادرة والواردة وفق قواعد أمنية صارمة، وحظر الاتصالات غير المصرح بها ومنع التسلل الخارجي إلى الخوادم الداخلية.',
    options: [
      { id: 9801, lettre: 'A', lettre_ar: 'أ', texte: 'تبريد الغرفة المركزية بحفظ درجات الحرارة منخفضة', estCorrecte: false },
      { id: 9802, lettre: 'B', lettre_ar: 'ب', texte: 'مراقبة وتصفية حزم البيانات المتبادلة وحظر المنافذ والاتصالات غير المصرح بها', estCorrecte: true },
      { id: 9803, lettre: 'C', lettre_ar: 'ج', texte: 'طباعة التقارير الإدارية تلقائياً كل مساء', estCorrecte: false },
      { id: 9804, lettre: 'D', lettre_ar: 'د', texte: 'تسريع سرعة الرياح داخل صندوق الحاسوب', estCorrecte: false }
    ]
  },
  {
    id: 99,
    code: 'Q-NUM-099',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE',
    texte: 'في خطط الحفاظ على البيانات الإدارية والقضائية من التلف أو الكوارث، ماذا تنص القاعدة الذهبية للنسخ الاحتياطي المعروفة بـ (قاعدة 3-2-1)؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['تدبير النسخ الاحتياطي وحماية المعطيات', 'استمرارية العمليات الرقمية'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 3.0 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.5 }
    ],
    explication: 'الاحتفاظ بـ 3 نسخ من البيانات، على وسيطين (2) تخزين ماديين مختلفين (مثلاً: قرص صلب داخلي ووحدة تخزين سحابية/شريط)، ونسخة واحدة (1) على الأقل في موقع جغرافي خارجي مؤمن.',
    options: [
      { id: 9901, lettre: 'A', lettre_ar: 'أ', texte: '3 دقائق للطباعة، 2 صفحة لكل ورقة، 1 ملف لكل درج', estCorrecte: false },
      { id: 9902, lettre: 'B', lettre_ar: 'ب', texte: '3 نسخ من البيانات، على وسيطين مختلفين للتخزين، ونسخة واحدة على الأقل في موقع جغرافي خارجي بعيد', estCorrecte: true },
      { id: 9903, lettre: 'C', lettre_ar: 'ج', texte: 'حفظ الملف 3 مرات متتالية على نفس بطاقة الذاكرة الصغيرة', estCorrecte: false },
      { id: 9904, lettre: 'D', lettre_ar: 'د', texte: 'مسح البيانات كل 3 أيام ونسخها في اليوم الثاني وإتلافها في اليوم الأول', estCorrecte: false }
    ]
  },
  {
    id: 100,
    code: 'Q-NUM-100',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE',
    texte: 'في تتبع مرتكبي جرائم النصب الإلكتروني عبر الإنترنت، ما هي المعلومة التقنية الأساسية المضمنة في سجلات الخادم (Server logs) التي تسمح بتحديد الخط الهاتفي أو الاشتراك المزود للخدمة؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['التحقيق الجنائي السيبراني', 'تعقب بروتوكولات الإنترنت'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 3.0 },
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 1.5 }
    ],
    explication: 'عنوان بروتوكول الإنترنت العام (Adresse IP publique) المقترن بالتاريخ والساعة بدقة بالغة (Timestamp) هو العنصر الفني الحاسم لتحديد هوية صاحب الاشتراك لدى مزود خدمة الإنترنت (FAI).',
    options: [
      { id: 10001, lettre: 'A', lettre_ar: 'أ', texte: 'لون شاشة الحاسوب التي استخدمها الجاني', estCorrecte: false },
      { id: 10002, lettre: 'B', lettre_ar: 'ب', texte: 'عنوان بروتوكول الإنترنت (Adresse IP) مع البصمة الزمنية الدقيقة (Timestamp)', estCorrecte: true },
      { id: 10003, lettre: 'C', lettre_ar: 'ج', texte: 'طراز الطابعة المتصلة بمكتب الجاني', estCorrecte: false },
      { id: 10004, lettre: 'D', lettre_ar: 'د', texte: 'عدد الأزرار الموجودة في لوحة مفاتيحه', estCorrecte: false }
    ]
  },
  {
    id: 101,
    code: 'Q-NUM-101',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE',
    texte: 'ظهرت فجأة على شاشة حاسوب المركز رسالة تحذيرية حمراء تفيد بتشفير جميع الملفات مع طلب فدية بعملة البيتكوين (Ransomware / برمجية الفدية). ما هو رد الفعل التقني الفوري الإلزامي لإنقاذ باقي أجهزة الوحدة؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['الاستجابة للحوادث السيبرانية الطارئة', 'احتواء انتشار البرمجيات الخبيثة'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 3.0 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'فصل كابل الشبكة السلكي وإيقاف الواي فاي فوراً لعزل الجهاز المصاب ومنع انتقال البرمجية لباقي خوادم الوحدة، مع عدم إطفاء الجهاز لحفظ الأدلة في الذاكرة الحية (RAM) للمختصين.',
    options: [
      { id: 10101, lettre: 'A', lettre_ar: 'أ', texte: 'تحويل مبلغ الفدية فوراً من الميزانية الخاصة للمركز', estCorrecte: false },
      { id: 10102, lettre: 'B', lettre_ar: 'ب', texte: 'فصل الحاسوب فوراً عن الشبكة المحلية والإنترنت دون إطفائه وإشعار خلية الأمن السيبراني فوراً', estCorrecte: true },
      { id: 10103, lettre: 'C', lettre_ar: 'ج', texte: 'إعادة تشغيل الحاسوب 10 مرات متتالية', estCorrecte: false },
      { id: 10104, lettre: 'D', lettre_ar: 'د', texte: 'توصيل مفاتيح USB إضافية لحفظ الفيروس ونقله للأجهزة الأخرى', estCorrecte: false }
    ]
  },
  {
    id: 102,
    code: 'Q-NUM-102',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE',
    texte: 'عند حجز صورة فوتوغرافية رقمية التقطها مشتبه به لموقع حساس، ما هي البيانات الوصفية المخفية (Métadonnées EXIF) التي يمكن لتقني المعلوميات استخراجها للمساعدة في التحقيق الجنائي؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['التحليل الجنائي للوسائط الرقمية', 'استخراج بيانات EXIF الجغرافية'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 }
    ],
    explication: 'بيانات EXIF تسجل تلقائياً نوع الكاميرا، والتاريخ والوقت بالثواني، وإحداثيات الموقع الجغرافي الدقيقة (GPS) التي التُقطت فيها الصورة ما لم يتم حجبها.',
    options: [
      { id: 10201, lettre: 'A', lettre_ar: 'أ', texte: 'نوايا المشتبه به ومستقبله المهني', estCorrecte: false },
      { id: 10202, lettre: 'B', lettre_ar: 'ب', texte: 'الإحداثيات الجغرافية (GPS)، تاريخ وساعة الالتقاط، وطراز الهاتف أو الكاميرا بدقة', estCorrecte: true },
      { id: 10203, lettre: 'C', lettre_ar: 'ج', texte: 'تسجيل صوتي للأحاديث التي دارت أثناء التقاط الصورة قبل 5 سنوات', estCorrecte: false },
      { id: 10204, lettre: 'D', lettre_ar: 'د', texte: 'الاسم الكامل لوالدة صانع الهاتف', estCorrecte: false }
    ]
  },
  {
    id: 103,
    code: 'Q-NUM-103',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE',
    texte: 'في تقنيات التشفير غير المتماثل (Chiffrement asymétrique) المستخدمة في تأمين المراسلات العسكرية والمفاتيح العامة (PKI)، ما هو المبدأ الأساسي الذي يحقق سرية الرسالة؟',
    difficulte: 'صعب',
    difficulte_code: 'DIFFICILE',
    coefficient: 1.5,
    competences: ['علم التعمية والتشفير', 'أمن الاتصالات الحساسة'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 3.0 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 }
    ],
    explication: 'تُشفر الرسالة بالمفتاح العام (Clé publique) للمستلم الذي يعرفه الجميع، ولا يمكن فك تشفيرها وقراءتها إلا بواسطة المفتاح الخاص (Clé privée) الوحيد السري المحفوظ لدى المستلم.',
    options: [
      { id: 10301, lettre: 'A', lettre_ar: 'أ', texte: 'استخدام كلمة سر موحدة وسهلة يعرفها جميع الجنود', estCorrecte: false },
      { id: 10302, lettre: 'B', lettre_ar: 'ب', texte: 'التشفير بواسطة المفتاح العام للطرف الآخر، وفك التشفير حصرياً بواسطة مفتاحه الخاص السري', estCorrecte: true },
      { id: 10303, lettre: 'C', lettre_ar: 'ج', texte: 'كتابة الرسالة بلغة أجنبية دون استخدام أي حاسوب', estCorrecte: false },
      { id: 10304, lettre: 'D', lettre_ar: 'د', texte: 'إرسال الرسالة عبر البريد العادي في مظروف شفاف', estCorrecte: false }
    ]
  },
  {
    id: 104,
    code: 'Q-NUM-104',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE',
    texte: 'عثر دركي على مفتاح تخزين (USB Flash Drive) جديد ومغلف ملقى على رصيف مرآب السيارات العسكري للوحدة. ما هو التصرف الأمني الصارم وفق بروتوكولات الدفاع السيبراني؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['مكافحة هجمات الهندسة الاجتماعية المادية', 'حماية الحواسب العسكرية'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 3.0 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.0 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 1.5 }
    ],
    explication: 'حظر توصيله بأي حاسوب مهني قطعياً؛ قد يحتوي على برمجية خبيثة هجومية (مثل BadUSB)؛ يجب تسليمه لخلية المعلوميات لفحصه داخل بيئة معزولة تماماً (Sandbox).',
    options: [
      { id: 10401, lettre: 'A', lettre_ar: 'أ', texte: 'توصيله بحاسوب مكتب القيادة الرئيسي لمعرفة ما إذا كان يحتوي على أفلام وثائقية', estCorrecte: false },
      { id: 10402, lettre: 'B', lettre_ar: 'ب', texte: 'الامتناع التام عن توصيله بأي جهاز، وتسليمه لمكتب أمن النظم لفحصه في بيئة معزولة ومحمية', estCorrecte: true },
      { id: 10403, lettre: 'C', lettre_ar: 'ج', texte: 'أخذه للمنزل وإعطائه للأطفال للعب به', estCorrecte: false },
      { id: 10404, lettre: 'D', lettre_ar: 'د', texte: 'توصيله بحاسوب المحاسبة والمالية فوراً لتهيئته (Format)', estCorrecte: false }
    ]
  },
  {
    id: 105,
    code: 'Q-NUM-105',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE',
    texte: 'في قاعدة بيانات السجلات القضائية، ما هي وظيفة استعلام لغة SQL التالي: SELECT * FROM VehiculesRecherches WHERE Matricule = \'12345-A-1\'; ؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['قواعد البيانات والاستعلام الرقمي', 'التنقيب في السجلات الإلكترونية'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 3.0 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.0 }
    ],
    explication: 'يقوم الاستعلام بالبحث واسترجاع جميع بيانات وحقول المركبة المبحوث عنها التي تطابق صفيحة ترقيمها بالتحديد القيمة \'12345-A-1\'.',
    options: [
      { id: 10501, lettre: 'A', lettre_ar: 'أ', texte: 'مسح وحذف سجل المركبة نهائياً من قاعدة البيانات', estCorrecte: false },
      { id: 10502, lettre: 'B', lettre_ar: 'ب', texte: 'استعراض واستخراج كافة معلومات المركبة المبحوث عنها الحاملة لرقم الترقيم المحدد', estCorrecte: true },
      { id: 10503, lettre: 'C', lettre_ar: 'ج', texte: 'تغيير لوحة ترقيم جميع سيارات الدرك إلى هذا الرقم', estCorrecte: false },
      { id: 10504, lettre: 'D', lettre_ar: 'د', texte: 'إيقاف تشغيل الخادم المركزي لمدة ساعة', estCorrecte: false }
    ]
  },
  {
    id: 106,
    code: 'Q-NUM-106',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE',
    texte: 'كيف تعمل شبكة التخفي والتشفير المعروفة بـ (Tor / The Onion Router) التي تستغلها عصابات الجريمة المنظمة على الويب المظلم (Darknet)؟',
    difficulte: 'صعب',
    difficulte_code: 'DIFFICILE',
    coefficient: 1.5,
    competences: ['فهم الويب المظلم وتقنيات إخفاء الهوية', 'التحريات الرقمية المتقدمة'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 }
    ],
    explication: 'تمرير حركة البيانات عبر طبقات متعددة من العقد العشوائية المشفرة المتتالية (عقدة دخول، عقدة وسطى، وعقدة خروج) بحيث لا تعرف أي عقدة هوية المصدر والوجهة معاً.',
    options: [
      { id: 10601, lettre: 'A', lettre_ar: 'أ', texte: 'إرسال الرسائل عبر موجات الراديو التماثلية القديمة فقط', estCorrecte: false },
      { id: 10602, lettre: 'B', lettre_ar: 'ب', texte: 'توجيه البيانات عبر عقد مشفرة متعددة ومتعاقبة كطبقات البصل لإخفاء عنوان IP الحقيقي للمستخدم', estCorrecte: true },
      { id: 10603, lettre: 'C', lettre_ar: 'ج', texte: 'إلغاء اتصال الإنترنت واستخدام الطاقة الشمسية للتواصل', estCorrecte: false },
      { id: 10604, lettre: 'D', lettre_ar: 'د', texte: 'نشر جميع الملفات في صفحات مفتوحة على محرك بحث جوجل', estCorrecte: false }
    ]
  },
  {
    id: 107,
    code: 'Q-NUM-107',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE',
    texte: 'لماذا يُمنع منعاً باتاً اعتماد بروتوكول التشفير القديم (WEP) في تأمين شبكات الواي فاي (Wi-Fi) التابعة للثكنات والوحدات العسكرية؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['أمن الشبكات اللاسلكية', 'معايير التشفير والبروتوكولات'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'بروتوكول WEP يعاني من ثغرات هيكلية قاتلة في خوارزمية التشفير تجعل مفتاح المرور قابلاً للاختراق والكسر التام خلال دقائق معدودة باستخدام أدوات مفتوحة المصدر.',
    options: [
      { id: 10701, lettre: 'A', lettre_ar: 'أ', texte: 'لأنه يستهلك كميات خيالية من الوقود', estCorrecte: false },
      { id: 10702, lettre: 'B', lettre_ar: 'ب', texte: 'لضعفه الأمني الحاد وسهولة اختراقه وكسر مفاتيحه خلال دقائق بواسطة برامج تحليل الحزم', estCorrecte: true },
      { id: 10703, lettre: 'C', lettre_ar: 'ج', texte: 'لأنه لا يعمل إلا في فصل الشتاء فقط', estCorrecte: false },
      { id: 10704, lettre: 'D', lettre_ar: 'د', texte: 'لأنه مخصص فقط للهواتف المنزلية السلكية القديمة', estCorrecte: false }
    ]
  },
  {
    id: 108,
    code: 'Q-NUM-108',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE',
    texte: 'ما هو الخطر السيبراني المعروف بـ (انتحال الهوية الرقمية / Spoofing) في الاتصالات الهاتفية والرسائل؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['كشف انتحال الشخصية الرقمية', 'التحقيق في الجرائم الإلكترونية'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 1.5 }
    ],
    explication: 'تزوير البيانات التعريفية للاتصال لإظهار رقم هاتف المتصل أو عنوان بريده على شاشة الضحية كرقم جهة رسمية أو موثوقة لخداعه وسرقة أسراره أو توجيه أوامر زائفة.',
    options: [
      { id: 10801, lettre: 'A', lettre_ar: 'أ', texte: 'انفجار بطارية الهاتف أثناء الرنين', estCorrecte: false },
      { id: 10802, lettre: 'B', lettre_ar: 'ب', texte: 'تزييف هوية المتصل أو عنوان البريد ليظهر كجهة أمنية أو رسمية لكسب ثقة الضحية وخداعه', estCorrecte: true },
      { id: 10803, lettre: 'C', lettre_ar: 'ج', texte: 'تسجيل المكالمة بصوت جهوري مضخم', estCorrecte: false },
      { id: 10804, lettre: 'D', lettre_ar: 'د', texte: 'حرق شريحة الهاتف SIM Card بسبب تكرار المكالمات', estCorrecte: false }
    ]
  },
  {
    id: 109,
    code: 'Q-NUM-109',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE',
    texte: 'أثناء تحريز قرص صلب يحتوي على وثائق هامة في قضية تجسس، لماذا يقوم المحقق الجنائي بحساب قيمة "دالة البصمة الرقمية" (Hash SHA-256) للملفات فور ضبطها؟',
    difficulte: 'صعب',
    difficulte_code: 'DIFFICILE',
    coefficient: 1.5,
    competences: ['الأدلة الجنائية الرقمية', 'إثبات سلامة وعدم تحريف الأدلة الحوسبية'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 2.0 }
    ],
    explication: 'دالة البصمة الرياضية تنتج قيمة نصية وحيدة وفريدة؛ أي تغيير ولو في بت (Bit) واحد في الملف مستقبلاً سيغير قيمة الـ Hash، مما يقدم دليلاً رياضياً قاطعاً على سلامة الدليل وعدم تحريفه.',
    options: [
      { id: 10901, lettre: 'A', lettre_ar: 'أ', texte: 'لمسح الفيروسات وإصلاح القطاعات التالفة في القرص الصلب', estCorrecte: false },
      { id: 10902, lettre: 'B', lettre_ar: 'ب', texte: 'لإثبات السلامة الرياضية المطلقة للملفات والتأكيد أمام القضاء بعدم تعرضها لأي تعديل بعد ضبطها', estCorrecte: true },
      { id: 10903, lettre: 'C', lettre_ar: 'ج', texte: 'لتقليل حجم الملفات بنسبة 99% لتوفير مساحة التخزين', estCorrecte: false },
      { id: 10904, lettre: 'D', lettre_ar: 'د', texte: 'لتحويل الوثائق إلى نصوص باللغة اليابانية القديمة', estCorrecte: false }
    ]
  },
  {
    id: 110,
    code: 'Q-NUM-110',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE',
    texte: 'ماذا يقتضي "مبدأ الامتياز الأدنى" (Principe du moindre privilège) في إدارة الصلاحيات للمستخدمين داخل المنظومات المعلوماتية للدرك الملكي؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['سياسات التحكم بالوصول والحوكمة الرقمية', 'الأمن السيبراني المؤسساتي'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 3.0 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.0 }
    ],
    explication: 'منح كل مستخدم فقط الحد الأدنى من الصلاحيات والوصول إلى الملفات والوظائف الضرورية بدقة لأداء مهامه الوظيفية المباشرة، وحجب أي وصول إضافي لتقليص مساحة المخاطر.',
    options: [
      { id: 11001, lettre: 'A', lettre_ar: 'أ', texte: 'منح جميع الموظفين حسابات مدير النظام (Administrator) بصلاحيات مطلقة للتسهيل عليهم', estCorrecte: false },
      { id: 11002, lettre: 'B', lettre_ar: 'ب', texte: 'منح المستخدم فقط الصلاحيات المحدودة والضرورية للغاية لإنجاز وظيفته دون أي زيادة تفادياً للمخاطر', estCorrecte: true },
      { id: 11003, lettre: 'C', lettre_ar: 'ج', texte: 'منع جميع الموظفين من استخدام الكهرباء في المكاتب', estCorrecte: false },
      { id: 11004, lettre: 'D', lettre_ar: 'د', texte: 'إلغاء كلمات المرور واستخدام الدخول التلقائي بدون قيود', estCorrecte: false }
    ]
  }
];
