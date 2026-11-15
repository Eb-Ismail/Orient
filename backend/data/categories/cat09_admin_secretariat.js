// ==============================================================================
// الفئة 9: الإدارة والسكرتارية (5 أسئلة - من 121 إلى 125)
// ==============================================================================

export const questionsAdminSecretariat = [
  {
    id: 121,
    code: 'Q-ADM-121',
    categorie: 'الإدارة والسكرتارية',
    categorie_code: 'ADMINISTRATION_SECRETARIAT',
    texte: 'في المراسلات العسكرية الرسمية للدرك الملكي، ما هو الترتيب الإلزامي لرفع التقارير والطلبات الإدارية الموجهة إلى القيادة العليا لتفادي التجاوز الإداري والانضباطي؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['قواعد التحرير الإداري العسكري', 'احترام السلم والتسلسل الإداري الهرمي (Voie hiérarchique)'],
    specialites_ponderation: [
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.5 },
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 1.5 }
    ],
    explication: 'القاعدة العسكرية الصارمة تفرض رفع كافة المراسلات والتقارير عبر السلم الإداري الهرمي المتدرج (Par la voie hiérarchique) من الرئيس المباشر إلى قائد السرية وصولاً للقيادة، ويحظر القفز فوق الرؤساء المباشرين.',
    options: [
      { id: 12101, lettre: 'A', lettre_ar: 'أ', texte: 'إرسال الرسالة مباشرة عبر بريد إلكتروني عام إلى وزير العدل دون إشعار أحد', estCorrecte: false },
      { id: 12102, lettre: 'B', lettre_ar: 'ب', texte: 'المرور الإلزامي عبر السلم الإداري الهرمي المتدرج (Voie hiérarchique) وتأشيرة الرئيس المباشر', estCorrecte: true },
      { id: 12103, lettre: 'C', lettre_ar: 'ج', texte: 'تسليم الرسالة لسائق حافلة لنقلها يدوياً للرباط', estCorrecte: false },
      { id: 12104, lettre: 'D', lettre_ar: 'د', texte: 'نشر المراسلة في لوحة الإعلانات بمدخل الثكنة لإشراك الجميع', estCorrecte: false }
    ]
  },
  {
    id: 122,
    code: 'Q-ADM-122',
    categorie: 'الإدارة والسكرتارية',
    categorie_code: 'ADMINISTRATION_SECRETARIAT',
    texte: 'وصلت إلى مكتب السكرتارية وثيقة إدارية مختومة بعبارة "سري للغاية - دفاع وطني" (Très Secret Défense). ما هو الإجراء البروتوكولي الخاص للتعامل مع هذه الوثيقة وتداولها؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['تصنيف الوثائق وحماية أسرار الدفاع', 'إدارة البريد السري والحفظ المحصن'],
    specialites_ponderation: [
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.5 },
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 1.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'الوثائق المصنفة في درجة "سري للغاية" تسجل في سجل خاص بالبريد السري، تسلم حصراً باليد للقائد الموجهة إليه، تحفظ داخل خزنة حديدية مصفحة ومغلقة برمز سري، ويحظر نسخها أو تصويرها قطعياً.',
    options: [
      { id: 12201, lettre: 'A', lettre_ar: 'أ', texte: 'تصويرها بالهاتف وتوزيعها على الزملاء للاستفادة العامة', estCorrecte: false },
      { id: 12202, lettre: 'B', lettre_ar: 'ب', texte: 'تسجيلها في سجل البريد السري الخاص، تسليمها يدوياً ومباشرة للقائد المعني، وحفظها في خزنة مصفحة محكمة الإغلاق مع حظر النسخ', estCorrecte: true },
      { id: 12203, lettre: 'C', lettre_ar: 'ج', texte: 'تركها فوق مكتب الاستقبال ليتصفحها الزوار في انتظار موعدهم', estCorrecte: false },
      { id: 12204, lettre: 'D', lettre_ar: 'د', texte: 'رميها في سلة الورق بعد قراءتها مباشرة', estCorrecte: false }
    ]
  },
  {
    id: 123,
    code: 'Q-ADM-123',
    categorie: 'الإدارة والسكرتارية',
    categorie_code: 'ADMINISTRATION_SECRETARIAT',
    texte: 'ما هو الدور التنظيمي لـ "سجل البريد الوارد والصادر" (Registre du courrier arrivée / départ)، وما هي البيانات الخمسة الجوهرية الواجب تدوينها لكل إرسالية واردة؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['إدارة وضبط تدفق المراسلات الإدارية', 'التوثيق والأرشفة المكتبية'],
    specialites_ponderation: [
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'سجل البريد يضمن تتبع حركة الوثائق؛ والبيانات الجوهرية هي: الرقم الترتيبي، تاريخ وساعة الورود، الجهة المرسلة، موضوع الإرسالية وملخصها، والمصلحة أو الضابط المكلف بالإنجاز.',
    options: [
      { id: 12301, lettre: 'A', lettre_ar: 'أ', texte: 'لون غلاف الرسالة، وحجم الطابع البريدي، واسم ساعي البريد فقط', estCorrecte: false },
      { id: 12302, lettre: 'B', lettre_ar: 'ب', texte: 'الرقم الترتيبي للوارد، تاريخ وتوقيت الاستلام، جهة الإرسال، الموضوع المختصر، وتوجيه الإحالة مع توقيع المستلم', estCorrecte: true },
      { id: 12303, lettre: 'C', lettre_ar: 'ج', texte: 'تسجيل وزن الرسالة بالكيلوغرام فقط دون فتحها', estCorrecte: false },
      { id: 12304, lettre: 'D', lettre_ar: 'د', texte: 'لا يسجل إلا البريد القادم من الشركات التجارية فقط', estCorrecte: false }
    ]
  },
  {
    id: 124,
    code: 'Q-ADM-124',
    categorie: 'الإدارة والسكرتارية',
    categorie_code: 'ADMINISTRATION_SECRETARIAT',
    texte: 'أثناء مراجعة وتدقيق "سجل الأسلحة والذخيرة" الخاص بالوحدة، تبين وجود نقص طلقة واحدة عيار 9 ملم في رصيد نهاية اليوم مقارنة مع حركة الخروج والدخول المسجلة. ما هو المسار الإداري والتأديبي الواجب اتباعه فوراً؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['جرد العتاد العسكري الحساس', 'المسؤولية الإدارية والمحاسبية عن الأسلحة والذخائر'],
    specialites_ponderation: [
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'الذخيرة العسكرية تخضع لمراقبة ومحاسبة صارمة لا تقبل أي تساهل؛ يجب تحرير محضر إثبات فارق فوري، إشعار رئيس الوحدة وقائد السرية، وإجراء تحقيق داخلي شامل لتحديد مسؤولية الفقدان.',
    options: [
      { id: 12401, lettre: 'A', lettre_ar: 'أ', texte: 'شراء طلقة من السوق السوداء لتعويض النقص في السجل سراً', estCorrecte: false },
      { id: 12402, lettre: 'B', lettre_ar: 'ب', texte: 'تحرير تقرير إثبات حالة فوري، وإشعار القيادة والتسلسل الهرمي، وفتح بحث إداري وتدقيق شامل لتحديد أسباب النقص والمسؤوليات', estCorrecte: true },
      { id: 12403, lettre: 'C', lettre_ar: 'ج', texte: 'تعديل الأرقام في السجل بالقلم الأبيض ومحو الواقعة', estCorrecte: false },
      { id: 12404, lettre: 'D', lettre_ar: 'د', texte: 'اعتبار طلقة واحدة مسألة تافهة لا تستحق أي إشعار أو تسجيل', estCorrecte: false }
    ]
  },
  {
    id: 125,
    code: 'Q-ADM-125',
    categorie: 'الإدارة والسكرتارية',
    categorie_code: 'ADMINISTRATION_SECRETARIAT',
    texte: 'وفق القواعد المعمول بها في حفظ الأرشيف القضائي والإداري بمراكز الدرك، كيف يتم التعامل مع الملفات والمحاضر القديمة التي استوفت مدة الحفظ القانونية المحددة في النظام؟',
    difficulte: 'صعب',
    difficulte_code: 'AVANCE',
    coefficient: 2.0,
    competences: ['تدبير الأرشيف والتقادم الإداري', 'المساطر القانونية لإتلاف وحفظ الوثائق'],
    specialites_ponderation: [
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'لا يجوز إتلاف أي وثيقة تلقائياً؛ يجب تشكيل لجنة جرد رسمية مختصة، إعداد جدول إحصائي تفصيلي، والحصول على تأشيرة الإتلاف أو الترحيل للأرشيف المركزي من النيابة العامة والقيادة العليا.',
    options: [
      { id: 12501, lettre: 'A', lettre_ar: 'أ', texte: 'إحراق الملفات في برميل بباحة الثكنة دون إذن أو جرد', estCorrecte: false },
      { id: 12502, lettre: 'B', lettre_ar: 'ب', texte: 'جرد الملفات في قوائم رسمية بواسطة لجنة مختصة وعرضها على القيادة والسلطة القضائية للترخيص بالترحيل للأرشيف النهائي أو الإتلاف المقنن', estCorrecte: true },
      { id: 12503, lettre: 'C', lettre_ar: 'ج', texte: 'بيع الملفات لمحلات التغليف للاستفادة من ثمن الورق', estCorrecte: false },
      { id: 12504, lettre: 'D', lettre_ar: 'د', texte: 'توزيع المحاضر القديمة على السكان كهدية تذكارية', estCorrecte: false }
    ]
  }
];
