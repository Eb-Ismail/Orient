// ==============================================================================
// الفئة 9: الإدارة والسكرتارية (5 أسئلة - من 121 إلى 125)
// ==============================================================================

export const questionsSecretariat = [
  {
    id: 121,
    code: 'Q-ADM-121',
    categorie: 'الإدارة والسكرتارية',
    categorie_code: 'SECRETARIAT',
    texte: 'عند استقبال مراسلة رسمية سرية واردة من القيادة العليا في مكتب الضبط (Bureau d\'ordre)، ما هو الإجراء الإداري والتنظيمي الأول الواجب تسجيله فوراً؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['تدبير مكتب الضبط والمراسلات الإدارية', 'التوثيق وحفظ السرية'],
    specialites_ponderation: [
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 1.5 }
    ],
    explication: 'تسجيل المراسلة فوراً بسجل البريد الوارد (Registre d\'arrivée) برقم تسلسلي، وتاريخ وساعة الاستلام، وتحديد المصدر والموضوع، وعرضها فوراً على القائد المباشر دون تأخير.',
    options: [
      { id: 12101, lettre: 'A', lettre_ar: 'أ', texte: 'فتح المراسلة وعرضها على جميع الزوار في قاعة الانتظار لأخذ آرائهم', estCorrecte: false },
      { id: 12102, lettre: 'B', lettre_ar: 'ب', texte: 'تسجيلها فوراً في سجل البريد الوارد برقم ترتيبي وتاريخ وساعة الاستلام وتقديمها فوراً للقائد', estCorrecte: true },
      { id: 12103, lettre: 'C', lettre_ar: 'ج', texte: 'إخفاء الرسالة داخل درج المكتب ونسيانها لعدة أشهر', estCorrecte: false },
      { id: 12104, lettre: 'D', lettre_ar: 'د', texte: 'تمزيق المظروف والتخلص من الوثيقة لتفادي كثرة الأوراق', estCorrecte: false }
    ]
  },
  {
    id: 122,
    code: 'Q-ADM-122',
    categorie: 'الإدارة والسكرتارية',
    categorie_code: 'SECRETARIAT',
    texte: 'في تدبير أرشيف الوحدة العسكرية، ما هي القاعدة التنظيمية المعتمدة لترتيب وحفظ الملفات الإدارية والقضائية المنتهية لضمان استرجاعها السريع عند الطلب؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الأرشفة والتصنيف الإداري المحكم', 'التنظيم الوثائقي'],
    specialites_ponderation: [
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 3.0 },
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'التصنيف المنهجي المعياري وفق خطة حفظ معتمدة (ترتيب زمني موضوعاتي مع رمز تعريفي وفهرس رقمي موحد) داخل علب أرشيف مؤمنة ضد الرطوبة والحريق والعبث.',
    options: [
      { id: 12201, lettre: 'A', lettre_ar: 'أ', texte: 'تكديس جميع الملفات عشوائياً في ركن مظلم على أرضية المرآب', estCorrecte: false },
      { id: 12202, lettre: 'B', lettre_ar: 'ب', texte: 'التصنيف المعياري المنهجي حسب السنوات والموضوعات مع الفهرسة والترميز الموحد في فضاء حفظ مخصص وآمن', estCorrecte: true },
      { id: 12203, lettre: 'C', lettre_ar: 'ج', texte: 'حرق الملفات القديمة أسبوعياً لتوفير المساحة في الغرفة', estCorrecte: false },
      { id: 12204, lettre: 'D', lettre_ar: 'د', texte: 'خلط ملفات الموظفين مع سجلات الصيانة وفواتير الوقود في مجلد واحد', estCorrecte: false }
    ]
  },
  {
    id: 123,
    code: 'Q-ADM-123',
    categorie: 'الإدارة والسكرتارية',
    categorie_code: 'SECRETARIAT',
    texte: 'ما هي الخاصية التعبيرية والأسلوبية المميزة للتحرير الإداري العسكري في صياغة "المذكرة المصلحية" (Note de service) أو "تقرير الإحالة"؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['التحرير الإداري العسكري', 'الدقة والأسلوب الرسمي الرصين'],
    specialites_ponderation: [
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 2.0 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 1.5 }
    ],
    explication: 'الأسلوب الإداري العسكري يتميز بالتجرد والموضوعية، والوضوح، والإيجاز، واحترام السلم الإداري، واستخدام الصيغ الرسمية المحددة بدقة دون مشاعر أو مبالغات إنشائية.',
    options: [
      { id: 12301, lettre: 'A', lettre_ar: 'أ', texte: 'استخدام أسلوب رومانسي وشعري مليء بالاستعارات والمحسنات البديعية', estCorrecte: false },
      { id: 12302, lettre: 'B', lettre_ar: 'ب', texte: 'الموضوعية التامة، والدقة والوضوح والإيجاز، واحترام التراتبية الإدارية والصيغ الرسمية المعتمدة', estCorrecte: true },
      { id: 12303, lettre: 'C', lettre_ar: 'ج', texte: 'استعمال لغة عامية دارجة مليئة بالاختصارات المبهمة وغير المفهومة', estCorrecte: false },
      { id: 12304, lettre: 'D', lettre_ar: 'د', texte: 'كتابة الوثيقة في شكل رسوم كاريكاتورية ساخرة', estCorrecte: false }
    ]
  },
  {
    id: 124,
    code: 'Q-ADM-124',
    categorie: 'الإدارة والسكرتارية',
    categorie_code: 'SECRETARIAT',
    texte: 'عند إعداد جدول نوبات الحراسة والدوريات الشهرية (Tableau de service) للوحدة، ما هو المبدأ التسييري الأساسي الذي يضمن الجاهزية والعدالة؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['التخطيط الإداري وتدبير الموارد البشرية', 'تنظيم جداول الخدمة والجاهزية'],
    specialites_ponderation: [
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 3.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'ضمان التوازن بين متطلبات الجاهزية الأمنية الدائمة للوحدة واحترام فترات الراحة القانونية، مع التوزيع العادل للمهام بين كافة الأفراد وتجنب المحاباة أو الإرهاق المفرط.',
    options: [
      { id: 12401, lettre: 'A', lettre_ar: 'أ', texte: 'تكليف نفس الدركي بالحراسة طوال 30 يوماً دون أي راحة وإعفاء الباقين تماماً', estCorrecte: false },
      { id: 12402, lettre: 'B', lettre_ar: 'ب', texte: 'الموازنة الدقيقة بين الجاهزية العملياتية المستمرة والراحة القانونية والتوزيع المنصف بين العناصر', estCorrecte: true },
      { id: 12403, lettre: 'C', lettre_ar: 'ج', texte: 'إلغاء الحراسة الليلية بالكامل لتمكين الجميع من النوم في منازلهم', estCorrecte: false },
      { id: 12404, lettre: 'D', lettre_ar: 'د', texte: 'تحديد جدول الخدمة يومياً عبر مسابقة في الجري السريع صباحاً', estCorrecte: false }
    ]
  },
  {
    id: 125,
    code: 'Q-ADM-125',
    categorie: 'الإدارة والسكرتارية',
    categorie_code: 'SECRETARIAT',
    texte: 'في تدبير ملفات المسار المهني والترقية والتنقيط السنوي للأفراد (Chancellerie et avancement)، ما هي المسؤولية الأخلاقية والإدارية الملقاة على عاتق كاتب السكرتارية؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['كتمان السر المهني للأفراد', 'الدقة والأمانة الإدارية'],
    specialites_ponderation: [
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 2.0 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 1.5 }
    ],
    explication: 'الكتمان المطلق للسر المهني وحفظ سرية النقط والملاحظات التأديبية والترقيات، والدقة الصارمة في تدوين الأقدمية والأوسمة والشهادات دون أي تحريف أو إهمال.',
    options: [
      { id: 12501, lettre: 'A', lettre_ar: 'أ', texte: 'إفشاء نقط وملاحظات القادة للزملاء في المقهى لإثارة الجدل والتنافس غير الشريف', estCorrecte: false },
      { id: 12502, lettre: 'B', lettre_ar: 'ب', texte: 'الالتزام الصارم بسرية البيانات الشخصية، والدقة المتناهية في مطابقة الأقدمية والاستحقاق بالسجلات الرسمية', estCorrecte: true },
      { id: 12503, lettre: 'C', lettre_ar: 'ج', texte: 'تعديل نقط التقييم مقابل مبالغ مالية أو خدمات شخصية', estCorrecte: false },
      { id: 12504, lettre: 'D', lettre_ar: 'د', texte: 'تضييع ملفات الموظفين وإخبارهم بالبحث عنها بأنفسهم', estCorrecte: false }
    ]
  }
];
