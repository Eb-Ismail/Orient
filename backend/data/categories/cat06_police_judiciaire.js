// ==============================================================================
// الفئة 6: الشرطة القضائية والتحري (15 سؤال - من 81 إلى 95)
// ==============================================================================

export const questionsPoliceJudiciaire = [
  {
    id: 81,
    code: 'Q-PJ-081',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'POLICE_JUDICIAIRE',
    texte: 'وفقاً لقانون المسطرة الجنائية، متى تعتبر الجريمة متلبساً بها (Infraction flagrante) بصفة قطعية تخول لضابط الشرطة القضائية صلاحيات استثنائية فورية؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['تحديد شروط حالة التلبس', 'الإطار القانوني لصلاحيات الشرطة القضائية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'تعتبر الجريمة متلبساً بها قانوناً إذا كانت ترتكب حالاً، أو في وقت قريب جداً من ارتكابها، أو إذا تبع الجاني صياح الجمهور، أو إذا وجد بعد وقوعها بوقت يسير حاملاً لأسلحة أو أشياء تدل على تورطه.',
    options: [
      { id: 8101, lettre: 'A', lettre_ar: 'أ', texte: 'إذا وقعت الجريمة منذ شهرين دون علم أحد', estCorrecte: false },
      { id: 8102, lettre: 'B', lettre_ar: 'ب', texte: 'إذا كانت الجريمة ترتكب حالاً، أو كان الفاعل مطارداً بصياح الجمهور إثر ارتكابها مباشرة', estCorrecte: true },
      { id: 8103, lettre: 'C', lettre_ar: 'ج', texte: 'إذا وردت إشاعة في مقهى عن احتمال وقوع سرقة الأسبوع القادم', estCorrecte: false },
      { id: 8104, lettre: 'D', lettre_ar: 'د', texte: 'فقط إذا اعترف الفاعل تلقائياً دون وجود أي أثر مادي', estCorrecte: false }
    ]
  },
  {
    id: 82,
    code: 'Q-PJ-082',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'POLICE_JUDICIAIRE',
    texte: 'ما هو الإجراء العملياتي الأول الذي يتعين على أول دورية درك ملكي تصل إلى مسرح جريمة قتل غامضة القيام به قبل وصول فرقة الشرطة التقنية والعلمية وضابط التحقيق؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['تجميد مسرح الجريمة (Gel des lieux)', 'حماية الآثار والأدلة المادية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 }
    ],
    explication: 'الإجراء الأول الحاسم هو "تجميد مسرح الجريمة" (Gel des lieux)، بإقامة طوق أمني مانع للدخول، منع ملامسة أو تغيير أي أثر أو شيء، إبعاد الفضوليين، والحفاظ على المكان بحالته الراهنة تماماً.',
    options: [
      { id: 8201, lettre: 'A', lettre_ar: 'أ', texte: 'تنظيف الأرضية وجمع الأشياء المبعثرة في أكياس قمامة لترتيب الغرفة', estCorrecte: false },
      { id: 8202, lettre: 'B', lettre_ar: 'ب', texte: 'تجميد مسرح الجريمة بضرب طوق أمني صارم ومنع ولوج أي شخص غير مختص والحفاظ على الآثار بحالتها', estCorrecte: true },
      { id: 8203, lettre: 'C', lettre_ar: 'ج', texte: 'تفتيش جيوب جثة الضحية وتجريدها من ملابسها فحصاً للبصمات', estCorrecte: false },
      { id: 8204, lettre: 'D', lettre_ar: 'د', texte: 'دعوة أفراد عائلة الضحية للدخول للتعرف عليها فوراً', estCorrecte: false }
    ]
  },
  {
    id: 83,
    code: 'Q-PJ-083',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'POLICE_JUDICIAIRE',
    texte: 'ما هو الميقات القانوني المسموح به لإجراء تفتيش المنازل في إطار البحث التمهيدي العادي، وفقاً للضوابط الإجرائية للمسطرة الجنائية؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['ضوابط تفتيش المنازل وحرمة المسكن', 'المشروعية الإجرائية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.5 }
    ],
    explication: 'لا يمكن الشروع في تفتيش المنازل إلا بين الساعة السادسة صباحاً (06:00) والتاسعة ليلاً (21:00)، ما عدا الاستثناءات المنصوص عليها حصراً في القانون (طلب صاحب المنزل، نداء استغاثة من الداخل، أو في جرائم الإرهاب والمخدرات بشروطها الخاصة).',
    options: [
      { id: 8301, lettre: 'A', lettre_ar: 'أ', texte: 'في أي وقت من الليل أو النهار دون أي قيد زمني', estCorrecte: false },
      { id: 8302, lettre: 'B', lettre_ar: 'ب', texte: 'بين الساعة السادسة صباحاً (06:00) والتاسعة ليلاً (21:00) كأصل عام لصحة الإجراء', estCorrecte: true },
      { id: 8303, lettre: 'C', lettre_ar: 'ج', texte: 'بين الساعة الواحدة بعد الظهر والثانية بعد الظهر فقط', estCorrecte: false },
      { id: 8304, lettre: 'D', lettre_ar: 'د', texte: 'فقط في أيام العطل الأسبوعية والأعياد الوطنية', estCorrecte: false }
    ]
  },
  {
    id: 84,
    code: 'Q-PJ-084',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'POLICE_JUDICIAIRE',
    texte: 'ما هي المدة القانونية الأصلية للحراسة النظرية (Garde à vue) في الجنايات والجنح العادية المعاقب عليها بالحبس، والتي يحق لضابط الشرطة القضائية إبقاء المشتبه فيه رهن إشارته بموجبها قبل طلب التمديد؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['تدبير الحراسة النظرية وحماية الحقوق والحريات', 'الآجال القانونية للتحقيق'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.5 }
    ],
    explication: 'المدة الأصلية للحراسة النظرية في الجرائم العادية هي 48 ساعة، ويمكن تمديدها لمدة 24 ساعة إضافية بإذن كتابي معلل من النيابة العامة المختصة.',
    options: [
      { id: 8401, lettre: 'A', lettre_ar: 'أ', texte: '12 ساعة فقط غير قابلة للتمديد', estCorrecte: false },
      { id: 8402, lettre: 'B', lettre_ar: 'ب', texte: '48 ساعة تحتسب من ساعة توقيفه، مع إمكانية التمديد لـ 24 ساعة بإذن النيابة العامة', estCorrecte: true },
      { id: 8403, lettre: 'C', lettre_ar: 'ج', texte: '15 يوماً متواصلة بقرار فردي من الدركي', estCorrecte: false },
      { id: 8404, lettre: 'D', lettre_ar: 'د', texte: 'شهر كامل دون إشعار أي جهة قضائية', estCorrecte: false }
    ]
  },
  {
    id: 85,
    code: 'Q-PJ-085',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'POLICE_JUDICIAIRE',
    texte: 'ما هي الآثار القانونية لعدم إشعار عائلة الشخص الموضع تحت تدبير الحراسة النظرية فور اتخاذ الإجراء، أو حرمان المشتبه فيه من حقه في الفحص الطبي عند طلبه؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['ضمانات المشتبه فيه أثناء الحراسة النظرية', 'تجنب خرق الإجراءات الجوهرية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.5 }
    ],
    explication: 'إشعار العائلة والحق في الفحص الطبي هما ضمانتان جوهريتان كرسهما المشرع لحماية حقوق الإنسان؛ الإخلال بهما يشكل عيباً مسطرياً قد يعرض إجراءات الحراسة للطعن ويستوجب مساءلة الضابط.',
    options: [
      { id: 8501, lettre: 'A', lettre_ar: 'أ', texte: 'لا أثر لذلك لأن حقوق الإنسان لا تطبق في مخافر الشرطة والدرك', estCorrecte: false },
      { id: 8502, lettre: 'B', lettre_ar: 'ب', texte: 'خرق لضمانة قانونية جوهرية يحميها القانون قد يعرض الإجراء للبطلان والمسؤولية التأديبية والقضائية', estCorrecte: true },
      { id: 8503, lettre: 'C', lettre_ar: 'ج', texte: 'زيادة مدة العقوبة على المتهم تلقائياً', estCorrecte: false },
      { id: 8504, lettre: 'D', lettre_ar: 'د', texte: 'منح المتهم عفواً شاملاً من الملك في اليوم التالي', estCorrecte: false }
    ]
  },
  {
    id: 86,
    code: 'Q-PJ-086',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'POLICE_JUDICIAIRE',
    texte: 'في مسرح الجريمة، تم العثور على أظرفة فارغة لطلقات نارية (Douilles) سقطت من سلاح الجاني. ما هي المعلومات التقنية الدقيقة التي يمكن لمختبر الشرطة العلمية والتقنية (IRCGN) استخلاصها من هذه الأظرفة الفارغة؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['الباليستيك الجنائي وفحص الأسلحة والذخائر', 'الشرطة التقنية والعلمية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.5 }
    ],
    explication: 'فحص الأظرفة يكشف عيار السلاح (Calibre)، بصمة الإبرة الضاربة (Percuteur)، علامات القاذف والساحب، مما يتيح تحديد صنف السلاح الناري ومطابقته بدقة ميكروسكوبية مع أي سلاح مشبوه يتم حجزه لاحقاً.',
    options: [
      { id: 8601, lettre: 'A', lettre_ar: 'أ', texte: 'الاسم العائلي ورقم الحساب البنكي لمطلق النار فقط', estCorrecte: false },
      { id: 8602, lettre: 'B', lettre_ar: 'ب', texte: 'عيار الذخيرة، نوع وطراز السلاح المستخدم، وبصمة الإبرة الضاربة الفريدة لمطابقتها مع السلاح الجنائي', estCorrecte: true },
      { id: 8603, lettre: 'C', lettre_ar: 'ج', texte: 'سرعة الرياح في العام الماضي فقط', estCorrecte: false },
      { id: 8604, lettre: 'D', lettre_ar: 'د', texte: 'لا يمكن استخلاص أي معلومة لأن الظرف مجرد قطعة نحاس فارغة', estCorrecte: false }
    ]
  },
  {
    id: 87,
    code: 'Q-PJ-087',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'POLICE_JUDICIAIRE',
    texte: 'عند حجز هواتف ذكية وحواسيب في إطار تفكيك شبكة إجرامية، ما هو الإجراء التقني الحاسم الواجب تنفيذه فوراً لحماية الأدلة الرقمية من المسح أو التشفير عن بعد؟',
    difficulte: 'صعب',
    difficulte_code: 'AVANCE',
    coefficient: 2.0,
    competences: ['حجز وتحريز الأدلة الرقمية (Digital Forensics)', 'منع مسح البيانات عن بعد'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 1.5 }
    ],
    explication: 'يجب عزل الأجهزة المحجوزة فوراً عن كافة شبكات الاتصال والإنترنت (تفعيل وضع الطيران، نزع بطاقة SIM، أو وضع الأجهزة داخل حقيبة فاراداي العازلة للموجات Faraday bag) لمنع تلقي أوامر مسح البيانات عن بعد (Remote wipe).',
    options: [
      { id: 8701, lettre: 'A', lettre_ar: 'أ', texte: 'وصل الهواتف بشبكة الواي فاي العامة للثكنة لتحميل التحديثات', estCorrecte: false },
      { id: 8702, lettre: 'B', lettre_ar: 'ب', texte: 'عزل الأجهزة فوراً عن أي شبكة اتصال (وضع الطيران أو كيس فاراداي العازل للأمواج الكهرومغناطيسية) لمنع محو المعطيات عن بعد', estCorrecte: true },
      { id: 8703, lettre: 'C', lettre_ar: 'ج', texte: 'إدخال رمز PIN عشوائياً عشر مرات حتى يقفل الهاتف', estCorrecte: false },
      { id: 8704, lettre: 'D', lettre_ar: 'د', texte: 'توزيع الهواتف على الزملاء لإجراء مكالماتهم الشخصية', estCorrecte: false }
    ]
  },
  {
    id: 88,
    code: 'Q-PJ-088',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'POLICE_JUDICIAIRE',
    texte: 'ما هو السند القانوني الذي يخول لضابط الشرطة القضائية طلب السجلات الطبية للمصابين في المستشفيات أو طلب كشوفات حركة الحسابات البنكية أو تسجيلات كاميرات المحلات التجارية أثناء البحث التمهيدي؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['التسخيرات القضائية (Réquisitions judiciaires)', 'المساطر التوثيقية لجمع الأدلة'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.5 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 }
    ],
    explication: 'يتم ذلك عبر "تسخير قضائي رسمي" (Réquisition judiciaire) موقع ومختوم قانوناً من طرف ضابط الشرطة القضائية المختص وتحت إشراف وتأشير النيابة العامة، والذي يلزم الجهات المعنية بالتعاون وتقديم المعلومات المطلوبة للعدالة.',
    options: [
      { id: 8801, lettre: 'A', lettre_ar: 'أ', texte: 'مكالمة هاتفية ودية غير رسمية مع موظف الاستقبال', estCorrecte: false },
      { id: 8802, lettre: 'B', lettre_ar: 'ب', texte: 'تسخير قضائي كتابي رسمي معلل وموجه وفق نصوص المسطرة الجنائية وتحت إشراف النيابة العامة', estCorrecte: true },
      { id: 8803, lettre: 'C', lettre_ar: 'ج', texte: 'تهديد مدير البنك بحبسه فوراً إن لم يفتح الخزنة شخصياً', estCorrecte: false },
      { id: 8804, lettre: 'D', lettre_ar: 'د', texte: 'لا يحق للدرك طلب أي وثيقة من أي مؤسسة مطلقاً', estCorrecte: false }
    ]
  },
  {
    id: 89,
    code: 'Q-PJ-089',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'POLICE_JUDICIAIRE',
    texte: 'أثناء استماعك ككاتب ضبط لأقوال شاهد مهم يرفض الإملاء والتوقيع على تصريحاته بدعوى خوفه من انتقام المتهمين، كيف يتم توثيق هذه الوضعية قانونياً في ختام المحضر الرسمي؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['تحرير المحاضر القضائية وضوابط الإشهاد', 'معالجة رفض التوقيع'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.5 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.0 }
    ],
    explication: 'تفرض المادة القانونية تلاوة المحضر على المصرح، وإذا امتنع عن التوقيع أو البصم، يشار وجوباً في المحضر إلى تلاوته عليه وإصراره على تصريحاته مع بيان أسباب رفضه التوقيع صراحة، ويوقع الضابط والكاتب.',
    options: [
      { id: 8901, lettre: 'A', lettre_ar: 'أ', texte: 'تزوير توقيع الشاهد بدلاً منه دون علمه لإكمال الملف', estCorrecte: false },
      { id: 8902, lettre: 'B', lettre_ar: 'ب', texte: 'التنصيص في نهاية المحضر على تلاوته عليه ورفضه التوقيع مع ذكر أسباب امتناعه، وتوقيع الضابط والكاتب فقط', estCorrecte: true },
      { id: 8903, lettre: 'C', lettre_ar: 'ج', texte: 'إلغاء الشهادة وتمزيق المحضر وطرده من المقر', estCorrecte: false },
      { id: 8904, lettre: 'D', lettre_ar: 'د', texte: 'إجباره وضربه لإكراهه على التوقيع', estCorrecte: false }
    ]
  },
  {
    id: 90,
    code: 'Q-PJ-090',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'POLICE_JUDICIAIRE',
    texte: 'في جريمة اختطاف طفل قاصر، ما هي التقنية الجنائية المعتمدة لرفع آثار البصمات غير المرئية (Traces latentes) من على سطح ورقة فدية كرتونية ملساء تركها الخاطفون؟',
    difficulte: 'صعب',
    difficulte_code: 'AVANCE',
    coefficient: 2.0,
    competences: ['كيمياء الشرطة العلمية والتقنية', 'إظهار الآثار غير المرئية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.5 }
    ],
    explication: 'على الأسطح المسامية كالورق والكرتون، تستخدم الكواشف الكيميائية التخصصية في المختبر (مثل مادة النينهيدرين Ninhydrine أو DFO) التي تتفاعل مع الأحماض الأمينية للإفرازات العرقية وتظهر البصمات بلون قرمزي مميز.',
    options: [
      { id: 9001, lettre: 'A', lettre_ar: 'أ', texte: 'غسل الورقة بالماء الساخن والصابون ثم كيها بالمكواة', estCorrecte: false },
      { id: 9002, lettre: 'B', lettre_ar: 'ب', texte: 'المعالجة الكيميائية المخبرية بمحاليل مخصصة للأوراق (كالنينهيدرين Ninhydrine) للتفاعل مع الأحماض الأمينية وإظهار الدوامات', estCorrecte: true },
      { id: 9003, lettre: 'C', lettre_ar: 'ج', texte: 'فرك الورقة بقطعة قماش خشنة بشدة', estCorrecte: false },
      { id: 9004, lettre: 'D', lettre_ar: 'د', texte: 'النظر إلى الورقة في ضوء الشمس المباشر دون أي معالجة', estCorrecte: false }
    ]
  },
  {
    id: 91,
    code: 'Q-PJ-091',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'POLICE_JUDICIAIRE',
    texte: 'عند حجز مواد مخدرة (شيرا، كوكايين) أثناء تفتيش مرخص، كيف يتم إعداد الحرز القضائي (Scellé) وضمان سلامة وزنه وقيمته الإثباتية أمام المحكمة؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['تحريز المحجوزات وتوثيق الوزن الصافي', 'حماية سلسلة الحراسة القضائية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.5 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 }
    ],
    explication: 'توزن المادة بميزان دقيق بحضور المعني، توضع في غلاف محكم الإغلاق، يختم بالشمع الأحمر أو القفل المرقم المعتمد، يدون عليه رقم المحضر وتاريخه ومواصفات المحتوى ويوقع عليه الحاضرون والضابط.',
    options: [
      { id: 9101, lettre: 'A', lettre_ar: 'أ', texte: 'وضع المخدرات في كيس بلاستيكي مفتوح في صندوق السيارة دون وزن أو ختم', estCorrecte: false },
      { id: 9102, lettre: 'B', lettre_ar: 'ب', texte: 'الوزن الدقيق بحضور المشتبه فيه، وضع المادة في كيس حرز رسمي، ختمه بالشمع الأحمر والقفل المرقم، وتدوين كافة البيانات والمطابقة بالمحضر', estCorrecte: true },
      { id: 9103, lettre: 'C', lettre_ar: 'ج', texte: 'تذوق جزء من المادة للتأكد من مفعولها ثم رمي الباقي', estCorrecte: false },
      { id: 9104, lettre: 'D', lettre_ar: 'د', texte: 'تسليم المحجوزات لجيران المتهم للاحتفاظ بها في منازلهم', estCorrecte: false }
    ]
  },
  {
    id: 92,
    code: 'Q-PJ-092',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'POLICE_JUDICIAIRE',
    texte: 'ما هو الدور الإجرائي لـ "سجل الحراسة النظرية" الإلزامي الممسوك في كافة مقرات الدرك الملكي والشرطة القضائية، ومن هي الجهة القضائية التي تراقب صحته بانتظام؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['سجلات الضابطة القضائية', 'الرقابة القضائية على أماكن الاحتجاز'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.5 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.0 }
    ],
    explication: 'سجل الحراسة النظرية يوثق بدقة ساعة التوقيف، ساعة إشعار العائلة، الوجبات، الفحوصات الطبية وساعة الإفراج أو التقديم؛ ويخضع للتفتيش والرقابة الدورية المفاجئة من طرف وكيل الملك ونوابه.',
    options: [
      { id: 9201, lettre: 'A', lettre_ar: 'أ', texte: 'سجل خاص بحساب نفقات المحروقات فقط وتراقبه إدارة الضرائب', estCorrecte: false },
      { id: 9202, lettre: 'B', lettre_ar: 'ب', texte: 'سجل رسمي مرقم يوثق كافة بيانات المحتجز وأوقات الإجراءات والضمانات، ويراقبه وكيل الملك أو نوابه بزيارات دورية', estCorrecte: true },
      { id: 9203, lettre: 'C', lettre_ar: 'ج', texte: 'دفتر اختياري يرمى بعد نهاية كل شهر دون تدقيق', estCorrecte: false },
      { id: 9204, lettre: 'D', lettre_ar: 'د', texte: 'سجل مخصص لتوقيع الزوار والسياح الأجانب', estCorrecte: false }
    ]
  },
  {
    id: 93,
    code: 'Q-PJ-093',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'POLICE_JUDICIAIRE',
    texte: 'في حالة وقوع وفاة غير طبيعية أو مشبوهة (وفاة في ظروف غامضة)، ما هو الإجراء الإلزامي الذي يأمر به ضابط الشرطة القضائية بموافقة النيابة العامة لتحديد سبب الوفاة بدقة؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الطب الشرعي الجنائي', 'التحقيق في الوفيات المشبوهة'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.5 }
    ],
    explication: 'يتم انتداب وتسخير طبيب شرعي مختص لإجراء التشريح الطبي للجثة (Autopsie médico-légale) لتحديد زمن الوفاة وأسبابها الحقيقية والسموم أو الإصابات الجنائية.',
    options: [
      { id: 9301, lettre: 'A', lettre_ar: 'أ', texte: 'دفن الجثة فوراً قبل شروق الشمس دون أي فحص طبي', estCorrecte: false },
      { id: 9302, lettre: 'B', lettre_ar: 'ب', texte: 'إشعار النيابة العامة وتسخير طبيب شرعي معتمد لإجراء التشريح الطبي لتحديد أسباب وساعة الوفاة الحقيقية', estCorrecte: true },
      { id: 9303, lettre: 'C', lettre_ar: 'ج', texte: 'سؤال أحد المارة عن رأيه في سبب الوفاة وتدوينه بالمحضر فقط', estCorrecte: false },
      { id: 9304, lettre: 'D', lettre_ar: 'د', texte: 'تصوير الجثة ونشرها على مواقع التواصل الاجتماعي', estCorrecte: false }
    ]
  },
  {
    id: 94,
    code: 'Q-PJ-094',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'POLICE_JUDICIAIRE',
    texte: 'ما هو التمييز القانوني الجوهري بين "الإنابة القضائية" (Commission rogatoire) والأمر بالتسخير الصادر أثناء مرحلة البحث التمهيدي؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['مؤسسة الإنابة القضائية والتحقيق الإعدادي', 'التفويض القضائي للصلاحيات'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.5 }
    ],
    explication: 'الإنابة القضائية تصدر حصراً عن قاضي التحقيق أو هيئة الحكم لتفويض ضابط الشرطة القضائية للقيام بأعمال تحقيق قضائية محددة، بينما التسخير يصدره الضابط أثناء البحث تحت إشراف النيابة العامة.',
    options: [
      { id: 9401, lettre: 'A', lettre_ar: 'أ', texte: 'لا يوجد أي فرق بينهما وهما مصطلحان متطابقان تماماً في كل المراحل', estCorrecte: false },
      { id: 9402, lettre: 'B', lettre_ar: 'ب', texte: 'الإنابة القضائية تفويض صادر عن قاضي التحقيق لإنجاز إجراءات تحقيق محددة، خلافاً للبحث التمهيدي المسير من النيابة العامة', estCorrecte: true },
      { id: 9403, lettre: 'C', lettre_ar: 'ج', texte: 'الإنابة القضائية خاصة بالمخالفات البسيطة للسير فقط', estCorrecte: false },
      { id: 9404, lettre: 'D', lettre_ar: 'د', texte: 'الإنابة تصدر عن موثق العقود العقارية', estCorrecte: false }
    ]
  },
  {
    id: 95,
    code: 'Q-PJ-095',
    categorie: 'الشرطة القضائية والتحري',
    categorie_code: 'POLICE_JUDICIAIRE',
    texte: 'أثناء عملية عرض للمشتبه فيه للتعرف عليه (Tapissage / Séance d\'identification) من طرف الضحية، ما هي الشروط المنهجية التي تضمن مشروعية المحضر وعدم الإيحاء بالتعرف القسري؟',
    difficulte: 'صعب',
    difficulte_code: 'AVANCE',
    coefficient: 2.0,
    competences: ['تقنيات العرض والتشخيص الجنائي', 'نزاهة الأدلة الاستعرافية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.5 }
    ],
    explication: 'يجب وضع المشتبه فيه وسط مجموعة من الأشخاص المشابهين له في الهيئة والملامح واللباس والعمر، عدم إبداء أي تلميح أو إيحاء للضحية، وإتاحة رؤية أحادية الاتجاه (مرآة عاكسة) لحماية الشاهد وتوثيق النتيجة بدقة بمحضر رسمي.',
    options: [
      { id: 9501, lettre: 'A', lettre_ar: 'أ', texte: 'وضع المشتبه فيه مقيداً بمفرده في وسط القاعة والإشارة إليه بالقول "هذا هو المجرم"', estCorrecte: false },
      { id: 9502, lettre: 'B', lettre_ar: 'ب', texte: 'وضعه ضمن تشكيلة من عدة أشخاص متقاربين في الملامح والملابس دون أي توجيه أو إيحاء، وتدوين تصريح الضحية التلقائي بمحضر رسمي', estCorrecte: true },
      { id: 9503, lettre: 'C', lettre_ar: 'ج', texte: 'إجبار الضحية على توقيع ورقة بيضاء قبل رؤية أي شخص', estCorrecte: false },
      { id: 9504, lettre: 'D', lettre_ar: 'د', texte: 'عرض صورة المشتبه به في الأخبار قبل الجلسة', estCorrecte: false }
    ]
  }
];
