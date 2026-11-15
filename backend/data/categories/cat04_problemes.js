// ==============================================================================
// الفئة 4: حل المشكلات واتخاذ القرار (15 سؤال - من 51 إلى 65)
// ==============================================================================

export const questionsProblemes = [
  {
    id: 51,
    code: 'Q-DEC-051',
    categorie: 'حل المشكلات واتخاذ القرار',
    categorie_code: 'DECISION',
    texte: 'وصلت دورية درك ملكي أولاً إلى مسرح حادث سير خطير على طريق سيار مظلم، حيث توجد سيارة محطمة بوسط الطريق مع مصاب بداخلها وشاحنات مسرعة قادمة. ما هو القرار القيادي والعملياتي الأول الذي يجب تنفيذه فوراً؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['ترتيب الأولويات في الطوارئ', 'اتخاذ القرار تحت الضغط الشديد'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.0 }
    ],
    explication: 'القاعدة الذهبية الميدانية (حماية - إشعار - إنقاذ PAS): تأمين المسرح بوضع إشارات التحذير الضوئية والمثلثة لمسافة كافية لمنع حادث تصادمي متسلسل، ثم طلب الإسعاف وتقديم الإسعافات.',
    options: [
      { id: 5101, lettre: 'A', lettre_ar: 'أ', texte: 'البدء الفوري في استجواب المصاب داخل السيارة وتحرير محضر المخالفة', estCorrecte: false },
      { id: 5102, lettre: 'B', lettre_ar: 'ب', texte: 'تأمين وحماية مكان الحادث بتشوير تحذيري عاجل ومسافة أمان لمنع وقوع حوادث دهس متسلسلة', estCorrecte: true },
      { id: 5103, lettre: 'C', lettre_ar: 'ج', texte: 'سحب السيارة المحطمة فوراً بواسطة حبل يدوي دون تشوير ضوئي', estCorrecte: false },
      { id: 5104, lettre: 'D', lettre_ar: 'د', texte: 'مغادرة المكان والذهاب للبحث عن رافعة خاصة', estCorrecte: false }
    ]
  },
  {
    id: 52,
    code: 'Q-DEC-052',
    categorie: 'حل المشكلات واتخاذ القرار',
    categorie_code: 'DECISION',
    texte: 'أثناء توقيف مخالف، بدأ السائق بالصراخ وإثارة الفوضى واستفزاز المارة للتجمهر حول الدورية، مدعياً تعرضه للظلم بهدف إرباك رجال الدرك. ما القرار الحكيم والاحترافي لحل هذه الأزمة؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['إدارة النزاعات والمواقف المتوترة', 'الهدوء والسيطرة الميدانية'],
    specialites_ponderation: [
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.5 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 1.5 }
    ],
    explication: 'التصرف المهني يعتمد على امتصاص الغضب، وتهدئة النبرة، وعزل الشخص عن الفضوليين، وطلب تعزيز إذا لزم، وتطبيق القانون بصرامة وهدوء دون الانجرار للاستفزاز.',
    options: [
      { id: 5201, lettre: 'A', lettre_ar: 'أ', texte: 'مبادلته الصراخ واستعمال العنف الجسدي الفوري أمام الجمهور', estCorrecte: false },
      { id: 5202, lettre: 'B', lettre_ar: 'ب', texte: 'الحفاظ على الهدوء والصرامة، وإبعاد الفضوليين، وتطبيق المساطر القانونية بثبات ودون انفعال', estCorrecte: true },
      { id: 5203, lettre: 'C', lettre_ar: 'ج', texte: 'تمزيق وثائق السائق وتركه يغادر دون تحرير أي مخالفة', estCorrecte: false },
      { id: 5204, lettre: 'D', lettre_ar: 'د', texte: 'الاستسلام لمطالبه والاعتذار له أمام المارة تفادياً للإحراج', estCorrecte: false }
    ]
  },
  {
    id: 53,
    code: 'Q-DEC-053',
    categorie: 'حل المشكلات واتخاذ القرار',
    categorie_code: 'DECISION',
    texte: 'اخترقت سيارة مشبوهة تسير بسرعة جنونية حاجزاً دركياً متسببة في تحطيم السلاسل المسمارية دون إصابة العناصر، وفرت هاربة في اتجاه طريق سريع. ما القرار القيادي المتوافق مع قواعد استخدام السلاح والتدرج الأمني؟',
    difficulte: 'صعب',
    difficulte_code: 'DIFFICILE',
    coefficient: 1.5,
    competences: ['اتخاذ القرار التكتيكي الحاسم', 'قواعد استخدام السلاح الوظيفي'],
    specialites_ponderation: [
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 2.0 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'لا يجوز إطلاق النار على سيارة تبتعد لمجرد الفرار إذا لم يعد هناك خطر حال ومباشر على الحياة؛ القرار الصائب هو التعميم اللاسلكي الفوري، ونشر خطة تطويق عبر النقط الموالية.',
    options: [
      { id: 5301, lettre: 'A', lettre_ar: 'أ', texte: 'إطلاق وابل عشوائي من الرصاص على زجاج السيارة الخلفي أثناء ابتعادها في الظلام', estCorrecte: false },
      { id: 5302, lettre: 'B', lettre_ar: 'ب', texte: 'التعميم اللاسلكي الفوري لمواصفات المركبة وتنسيق خطة محاصرة وتطويق مع المراكز المجاورة', estCorrecte: true },
      { id: 5303, lettre: 'C', lettre_ar: 'ج', texte: 'تجاهل الحادث تماماً واعتباره أمراً اعتيادياً لا يستدعي المتابعة', estCorrecte: false },
      { id: 5304, lettre: 'D', lettre_ar: 'د', texte: 'مغادرة الحاجز دون إشعار القيادة للبحث العشوائي في الشوارع الفرعية', estCorrecte: false }
    ]
  },
  {
    id: 54,
    code: 'Q-DEC-054',
    categorie: 'حل المشكلات واتخاذ القرار',
    categorie_code: 'DECISION',
    texte: 'كانت دورية متجهة لتوقيف مشتبه به في سرقة متجر، وأثناء سيرها عاينت طفلاً صغيراً صدمته دراجة نارية وهو ملقى على حافة الطريق ينزف في غياب أي مسعف. كيف يتم البت في هذا التعارض العملياتي؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الموازنة الإنسانية والعملياتية', 'الأولوية لإنقاذ الأرواح'],
    specialites_ponderation: [
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 2.0 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 1.5 }
    ],
    explication: 'في فلسفة العمل الأمني والقانوني، الحفاظ على الحياة البشرية وإنقاذ الأرواح المعرضة للهلاك له الأولوية المطلقة على أي مهمة مادية؛ مع إشعار القاعة لتوجيه دورية أخرى للسرقة.',
    options: [
      { id: 5401, lettre: 'A', lettre_ar: 'أ', texte: 'تجاهل الطفل ومتابعة الطريق لتوقيف سارق المتجر مهما كلف الأمر', estCorrecte: false },
      { id: 5402, lettre: 'B', lettre_ar: 'ب', texte: 'التوقف الفوري لإسعاف الطفل وإنقاذ حياته وإشعار القاعة لتحويل مهمة السرقة لدورية أخرى', estCorrecte: true },
      { id: 5403, lettre: 'C', lettre_ar: 'ج', texte: 'معاتبة الطفل على خروجه من المنزل ثم استكمال المسار', estCorrecte: false },
      { id: 5404, lettre: 'D', lettre_ar: 'د', texte: 'الانتظار في مكان الحادث دون تقديم أي مساعدة حتى قدوم والدي الطفل', estCorrecte: false }
    ]
  },
  {
    id: 55,
    code: 'Q-DEC-055',
    categorie: 'حل المشكلات واتخاذ القرار',
    categorie_code: 'DECISION',
    texte: 'تدخلت دورية لفض شجار دامٍ بين جيران، حيث يحمل أحد الأطراف سكيناً مهدداً بالطعن والطرف الآخر ممسك بعصا خشبية غليظة وسط صراخ عائلاتهم. ما هو التسلسل التكتيكي الحاسم لحل النزاع؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['إدارة المواجهات المسلحة الخفيفة', 'السيطرة الميدانية الفورية'],
    specialites_ponderation: [
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'التسلسل: 1- فرض مسافة أمان وتوجيه إنذار صارم بإلقاء الأسلحة، 2- الفصل الجسدي بين الخصمين، 3- شل حركة المعتدي ونزع السلاح، 4- حجز الأسلحة وفتح تحقيق قضائي.',
    options: [
      { id: 5501, lettre: 'A', lettre_ar: 'أ', texte: 'الدخول وسط الشجار بالأيدي العارية دون تقييم المخاطر أو إنذار', estCorrecte: false },
      { id: 5502, lettre: 'B', lettre_ar: 'ب', texte: 'فرض مسافة أمان، الإنذار الحازم بإلقاء الأسلحة، شل حركة حامل السلاح، وفصل الأطراف', estCorrecte: true },
      { id: 5503, lettre: 'C', lettre_ar: 'ج', texte: 'تشجيع أحد الأطراف على ضرب الآخر لإنهاء الخلاف بسرعة', estCorrecte: false },
      { id: 5504, lettre: 'D', lettre_ar: 'د', texte: 'تصوير الشجار بالهاتف ونشره على الإنترنت لطلب آراء الجمهور', estCorrecte: false }
    ]
  },
  {
    id: 56,
    code: 'Q-DEC-056',
    categorie: 'حل المشكلات واتخاذ القرار',
    categorie_code: 'DECISION',
    texte: 'أثناء دورية استطلاعية في منطقة قروية نائية ليلاً، تعطل محرك سيارة الدورية تماماً مع انقطاع تغطية أجهزة الاتصال اللاسلكي وشبكة الهاتف في المنخفض الجغرافي. ما هو القرار الأنسب لمعالجة الموقف؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['التصرف في حالات الانعزال والخلل الفني', 'التدبير الأمني للمخاطر'],
    specialites_ponderation: [
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.0 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 1.5 }
    ],
    explication: 'تأمين المركبة والسلاح أولاً، وتفادي تفرق العناصر، ثم الصعود التكتيكي المنظم لمرتفع جغرافي قريب لاستعادة التغطية اللاسلكية وإبلاغ القيادة ببيانات الموقع والعطل بدقة.',
    options: [
      { id: 5601, lettre: 'A', lettre_ar: 'أ', texte: 'ترك السيارة والسلاح في الخلاء والمشي الفردي العشوائي نحو وجهات مجهولة', estCorrecte: false },
      { id: 5602, lettre: 'B', lettre_ar: 'ب', texte: 'تأمين السيارة، بقاء عنصرين معاً، والصعود التكتيكي لمرتفع قريب لاستعادة الاتصال بالقيادة', estCorrecte: true },
      { id: 5603, lettre: 'C', lettre_ar: 'ج', texte: 'إشعال النار في إطارات السيارة للتدفئة بانتظار الصباح', estCorrecte: false },
      { id: 5604, lettre: 'D', lettre_ar: 'د', texte: 'إطلاق جميع الرصاصات الحية في الهواء كإشارة استغاثة احتفالية', estCorrecte: false }
    ]
  },
  {
    id: 57,
    code: 'Q-DEC-057',
    categorie: 'حل المشكلات واتخاذ القرار',
    categorie_code: 'DECISION',
    texte: 'تحصن شخص مصاب باضطراب نفسي داخل منزله شاهراً بندقية صيد مهدداً بإطلاق النار على كل من يقترب من الباب. ما هو القرار القيادي الأكثر مطابقة للإجراءات العملياتية الحديثة؟',
    difficulte: 'صعب',
    difficulte_code: 'DIFFICILE',
    coefficient: 1.5,
    competences: ['تدبير الأزمات ذات التهديد المسلح', 'تجميد الموقف والتدخل المتخصص'],
    specialites_ponderation: [
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 3.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.0 }
    ],
    explication: 'قاعدة تجميد الموقف (Gel de la situation): ضرب طوق أمني وإخلاء المحيط المباشر لمنع أي إصابات للمدنيين، وإطلاق مسار التفاوض، واستدعاء الفرق المتخصصة بالاقتحام (GSI).',
    options: [
      { id: 5701, lettre: 'A', lettre_ar: 'أ', texte: 'اقتحام المنزل فوراً وبشكل منفرد عبر كسر الباب الرئيسي بالقدم', estCorrecte: false },
      { id: 5702, lettre: 'B', lettre_ar: 'ب', texte: 'تجميد الوضع، إقامة طوق أمني محكم، إخلاء الجوار، وتفعيل مسار التفاوض واستدعاء القوات الخاصة', estCorrecte: true },
      { id: 5703, lettre: 'C', lettre_ar: 'ج', texte: 'مغادرة الموقع وتركه لحين نفاد ذخيرته تلقائياً دون أي مراقبة', estCorrecte: false },
      { id: 5704, lettre: 'D', lettre_ar: 'د', texte: 'السماح للفضوليين والجيران بالدخول لإقناعه بالعدول عن موقفه', estCorrecte: false }
    ]
  },
  {
    id: 58,
    code: 'Q-DEC-058',
    categorie: 'حل المشكلات واتخاذ القرار',
    categorie_code: 'DECISION',
    texte: 'خلال تفتيش قانوني لمنزل مشتبه به في قضية سرقة مواشٍ بإذن قضائي، عثرت عناصر الدرك على كيس كبير يحتوي على مادة مخدرة بيضاء مهيأة للتوزيع لم تكن ضمن موضوع الإذن الأصلي. كيف يتم اتخاذ القرار الإجرائي السليم؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['الشرعية الإجرائية في التفتيش', 'التعامل مع الجرائم المتلبس بها العارضة'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.0 }
    ],
    explication: 'العثور على جريمة مخدرات يشكل حالة تلبس عارضة (Flagrance)؛ يجب حجز المادة فوراً، وتحرير محضر بالواقعة العارضة، وإشعار النيابة العامة فوراً لتوسيع نطاق البحث.',
    options: [
      { id: 5801, lettre: 'A', lettre_ar: 'أ', texte: 'إتلاف الكيس في المرحاض فوراً لأن الإذن لم ينص عليه', estCorrecte: false },
      { id: 5802, lettre: 'B', lettre_ar: 'ب', texte: 'حجز المخدرات، تحرير محضر بالتلبس، وإشعار وكيل الملك فوراً لتلقي التعليمات الإجرائية', estCorrecte: true },
      { id: 5803, lettre: 'C', lettre_ar: 'ج', texte: 'أخذ المخدرات وإخفاؤها في المنزل دون تدوينها بالمحضر', estCorrecte: false },
      { id: 5804, lettre: 'D', lettre_ar: 'د', texte: 'ترك المخدرات مكانها واستكمال البحث عن المواشي فقط دون أي ذكر للواقعة', estCorrecte: false }
    ]
  },
  {
    id: 59,
    code: 'Q-DEC-059',
    categorie: 'حل المشكلات واتخاذ القرار',
    categorie_code: 'DECISION',
    texte: 'تسببت أمطار طوفانية مفاجئة في محاصرة مدرسة ابتدائية قروية بمياه الفيضانات المتصاعدة بسرعة، وبنفس الوقت أبلغ فلاح عن غرق قطيعه في مزرعة مجاورة. أين يتم توجيه جهد الإنقاذ الفوري؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الأولويات في الكوارث الطبيعية', 'حماية الفئات الهشة والمستضعفة'],
    specialites_ponderation: [
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.5 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 1.5 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 1.5 }
    ],
    explication: 'إنقاذ حياة الأطفال والتلاميذ في المدرسة له الأولوية القصوى والمطلقة وغير القابلة للنقاش قبل أي ممتلكات أو حيوانات أو خسائر مادية في حالات الكوارث.',
    options: [
      { id: 5901, lettre: 'A', lettre_ar: 'أ', texte: 'توجيه كل القوات لإنقاذ رؤوس الأغنام لتقليل الخسائر المالية', estCorrecte: false },
      { id: 5902, lettre: 'B', lettre_ar: 'ب', texte: 'التوجه الفوري لتأمين وإخلاء تلاميذ المدرسة والأطر التربوية إلى منطقة آمنة ومرتفعة', estCorrecte: true },
      { id: 5903, lettre: 'C', lettre_ar: 'ج', texte: 'الانتظار حتى انتهاء الأمطار لتفقد المدرسة والمزرعة معاً', estCorrecte: false },
      { id: 5904, lettre: 'D', lettre_ar: 'د', texte: 'إغلاق أبواب المدرسة بالمفاتيح لمنع خروج التلاميذ للسباحة', estCorrecte: false }
    ]
  },
  {
    id: 60,
    code: 'Q-DEC-060',
    categorie: 'حل المشكلات واتخاذ القرار',
    categorie_code: 'DECISION',
    texte: 'أثناء مهمة ميدانية مشتركة، نشب خلاف حاد وتبادل كلامي غير لائق بين دركيين من نفس الرتبة بسبب توزيع المهام أمام مرأى المواطنين. كيف يتدخل رئيس الدورية لحل المشكلة فوراً؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['القيادة العسكرية وإدارة الخلافات', 'هيبة السلك والحفاظ على المظهر العام'],
    specialites_ponderation: [
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 1.5 }
    ],
    explication: 'إيقاف الجدال فوراً وبصرامة قيادية، والفصل بينهما لتأمين إنجاز المهمة، وتأجيل المعالجة التأديبية والنفسية لجلسة مغلقة داخل الوحدة بعيداً عن أعين الجمهور.',
    options: [
      { id: 6001, lettre: 'A', lettre_ar: 'أ', texte: 'السماح لهما بالتشابك بالأيدي لمعرفة من الأقوى والأحق بالرأي', estCorrecte: false },
      { id: 6002, lettre: 'B', lettre_ar: 'ب', texte: 'إيقاف الخلاف بحزم فوري، فصلهما ميدانياً لإنجاز الواجب، وتأجيل المساءلة التأديبية للمقر', estCorrecte: true },
      { id: 6003, lettre: 'C', lettre_ar: 'ج', texte: 'أخذ جانب أحدهما ضد الآخر بناء على الصداقة الشخصية', estCorrecte: false },
      { id: 6004, lettre: 'D', lettre_ar: 'د', texte: 'مغادرة المهمة وترك الدركيين يتشاجران بمفردهما في الشارع', estCorrecte: false }
    ]
  },
  {
    id: 61,
    code: 'Q-DEC-061',
    categorie: 'حل المشكلات واتخاذ القرار',
    categorie_code: 'DECISION',
    texte: 'تلقى مركز دركي إشعاراً باقتراب حافلة تنقل مشجعين متعصبين يثيرون الفوضى على الطريق، بينما القوة المتوفرة بالمركز في تلك اللحظة لا تتعدى دركيين اثنين. ما هو القرار الأمني الحكيم؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['تقدير ميزان القوى العملياتي', 'تجنب الوقوع في كمائن التفوق العددي'],
    specialites_ponderation: [
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.5 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 1.5 }
    ],
    explication: 'اعتراض حافلة حاشدة بعنصرين فقط يعرض سلامة الأفراد للخطر المحقق؛ القرار هو طلب الدعم من القيادة وتنسيق نقطة اعتراض مشتركة بأعداد كافية وموقع استراتيجي آمن.',
    options: [
      { id: 6101, lettre: 'A', lettre_ar: 'أ', texte: 'اعتراض الحافلة بمفردهما والدخول في مواجهة جسدية مباشرة مع 50 مشجعاً', estCorrecte: false },
      { id: 6102, lettre: 'B', lettre_ar: 'ب', texte: 'طلب التعزيز الفوري والتنسيق لتوقيف الحافلة في نقطة مراقبة مجهزة وبقوة عددية كافية', estCorrecte: true },
      { id: 6103, lettre: 'C', lettre_ar: 'ج', texte: 'إغلاق المركز الدركي والهروب من المنطقة بأكملها', estCorrecte: false },
      { id: 6104, lettre: 'D', lettre_ar: 'د', texte: 'رمي الحجارة على نوافذ الحافلة لإجبارها على التوقف', estCorrecte: false }
    ]
  },
  {
    id: 62,
    code: 'Q-DEC-062',
    categorie: 'حل المشكلات واتخاذ القرار',
    categorie_code: 'DECISION',
    texte: 'أثناء استراحة غداء بمطعم على الطريق، لاحظ دركي أن صاحب المطعم يرفض تسلم ثمن الوجبة ويصر قائلاً: "أنتم رجال درك ونحن في خدمتكم دائماً بلا مقابل". ما هو القرار المهني والأخلاقي الصارم الواجب اتخاذه؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['النزاهة والاستقامة الأخلاقية', 'احترام مدونة السلوك الوظيفي'],
    specialites_ponderation: [
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 2.0 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 }
    ],
    explication: 'الامتناع التام عن قبول أي هدايا أو خدمات مجانية مهما كانت بسيطة لأنها تمس بمبدأ الحياد والتجرد، والإصرار المؤدب والحاسم على دفع الفاتورة كاملة مع الحصول على وصل.',
    options: [
      { id: 6201, lettre: 'A', lettre_ar: 'أ', texte: 'قبول الوجبة مجاناً ودعوة جميع المعارف لتناول وجبات مجانية يومياً', estCorrecte: false },
      { id: 6202, lettre: 'B', lettre_ar: 'ب', texte: 'رفض المجانية بأدب وحزم والإصرار التام على دفع الثمن المستحق صيانة للكرامة والحياد المؤسساتي', estCorrecte: true },
      { id: 6203, lettre: 'C', lettre_ar: 'ج', texte: 'طلب وجبات إضافية لأخذها إلى المنزل بالمجان أيضاً', estCorrecte: false },
      { id: 6204, lettre: 'D', lettre_ar: 'د', texte: 'اعتقال صاحب المطعم فوراً بتهمة الخيانة العظمى', estCorrecte: false }
    ]
  },
  {
    id: 63,
    code: 'Q-DEC-063',
    categorie: 'حل المشكلات واتخاذ القرار',
    categorie_code: 'DECISION',
    texte: 'عرض سائق شاحنة مخالف مبلغاً مالياً كبيراً مدسوساً داخل وثائق الشاحنة لتفادي حجز حمولته الزائدة. ما هو الإجراء الإداري والقضائي الحاسم الفوري؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['مكافحة الرشوة والفساد', 'الشرعية في التثبيت الجنائي للرشوة'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 }
    ],
    explication: 'محاولة إرشاء موظف عمومي هي جناية/جنحة متلبس بها؛ يجب رفض الرشوة، وتوثيق الأوراق النقدية بحضور الزميل كحرز، وحجز السائق والمركبة وإشعار النيابة العامة فوراً.',
    options: [
      { id: 6301, lettre: 'A', lettre_ar: 'أ', texte: 'أخذ نصف المبلغ المالي وتسهيل مرور الشاحنة', estCorrecte: false },
      { id: 6302, lettre: 'B', lettre_ar: 'ب', texte: 'رفض المبلغ، حجز الأوراق المالية كحرز تلبس بجريمة الرشوة، توقيف السائق، وإشعار النيابة العامة', estCorrecte: true },
      { id: 6303, lettre: 'C', lettre_ar: 'ج', texte: 'إعادة النقود للسائق مع تحذيره شفوياً فقط ومطالبته بالمغادرة السريعة', estCorrecte: false },
      { id: 6304, lettre: 'D', lettre_ar: 'د', texte: 'مفاوضته لزيادة المبلغ إلى الضعف قبل اتخاذ القرار', estCorrecte: false }
    ]
  },
  {
    id: 64,
    code: 'Q-DEC-064',
    categorie: 'حل المشكلات واتخاذ القرار',
    categorie_code: 'DECISION',
    texte: 'اندلع حريق مهول في مستودع للأسمدة الكيماوية بمحاذاة طريق جهوي رئيسي مع انبعاث غازات صفراء كثيفة خانقة. ما هو القرار التكتيكي الأسرع لحماية حركة المرور والساكنة؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['إدارة مخاطر المواد الخطرة', 'التدابير الوقائية للسلامة العامة'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 1.0 }
    ],
    explication: 'الغازات الناتجة عن الكيماويات سامة وخانقة؛ يجب قطع الطريق فوراً من الاتجاهين على مسافة أمان، وتوجيه حركة المرور لمحاور بديلة، والتنسيق العاجل مع الوقاية المدنية.',
    options: [
      { id: 6401, lettre: 'A', lettre_ar: 'أ', texte: 'السماح للسيارات بالمرور مسرعة وسط الدخان لاختبار قوة تحمل الركاب', estCorrecte: false },
      { id: 6402, lettre: 'B', lettre_ar: 'ب', texte: 'قطع حركة السير من الجانبين، إقامة محاور تحويل آمنة، والتنسيق العاجل مع مصالح الإطفاء والوقاية', estCorrecte: true },
      { id: 6403, lettre: 'C', lettre_ar: 'ج', texte: 'الدخول إلى المستودع المشتعل لاستنشاق الغازات والتأكد من نوعيتها دون قناع واقٍ', estCorrecte: false },
      { id: 6404, lettre: 'D', lettre_ar: 'د', texte: 'الانتظار حتى تحترق جميع الأسمدة بمفردها لفتح الطريق', estCorrecte: false }
    ]
  },
  {
    id: 65,
    code: 'Q-DEC-065',
    categorie: 'حل المشكلات واتخاذ القرار',
    categorie_code: 'DECISION',
    texte: 'رصدت دورية مبحوثاً عنه خطيراً في قضية اتجار دولي في المخدرات داخل سوق أسبوعي مكتظ بآلاف المتسوقين والأطفال. كيف يتم التخطيط لعملية التوقيف بنجاح؟',
    difficulte: 'صعب',
    difficulte_code: 'DIFFICILE',
    coefficient: 1.5,
    competences: ['التخطيط لعمليات التوقيف في الأماكن الحساسة', 'حماية المدنيين من التدافع وردود الفعل العنيفة'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 }
    ],
    explication: 'التدخل المسلح وسط حشد كثيف قد يسبب تدافعاً مميتاً أو احتجاز رهائن؛ الصواب هو المراقبة السرية والتعقب حتى خروجه لمنطقة مكشوفة ومعزولة وتوقيفه بمباغتة تامة.',
    options: [
      { id: 6501, lettre: 'A', lettre_ar: 'أ', texte: 'إطلاق النار في الهواء والصراخ باسم المشتبه به وسط حشود السوق لإخافته', estCorrecte: false },
      { id: 6502, lettre: 'B', lettre_ar: 'ب', texte: 'فرض مراقبة سرية لصيقة، وتتبع تحركاته بهدوء حتى خروجه لمكان معزول لتوقيفه بمباغتة ودون تعريض المدنيين للخطر', estCorrecte: true },
      { id: 6503, lettre: 'C', lettre_ar: 'ج', texte: 'استخدام القنابل المسيلة للدموع وسط خيام الخضار لتفريق السوق بأكمله', estCorrecte: false },
      { id: 6504, lettre: 'D', lettre_ar: 'د', texte: 'إلغاء التوقيف نهائياً ومسح اسم المبحوث عنه من قاعدة البيانات', estCorrecte: false }
    ]
  }
];
