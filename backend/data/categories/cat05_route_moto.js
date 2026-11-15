// ==============================================================================
// الفئة 5: السلامة الطرقية وقيادة الدراجات (15 سؤال - من 66 إلى 80)
// ==============================================================================

export const questionsRouteMoto = [
  {
    id: 66,
    code: 'Q-MOT-066',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'ROUTE_MOTO',
    texte: 'ما هو المسار الآمن النموذجي (Trajectoire de sécurité) الذي يتبعه دركي الدراجات النارية عند ولوج منعرج يمين غير مكشوف؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['تقنيات القيادة المتقدمة للدراجات', 'تأمين مسار المنعرجات'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 3.0 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.0 }
    ],
    explication: 'المسار الآمن يعتمد على: التموضع بجانب محور الطريق (الخارج) لزيادة مدى الرؤية، وتوجيه النظرة لأبعد نقطة، ثم الالتفاف نحو الداخل فقط بعد انكشاف نهاية المنعرج.',
    options: [
      { id: 6601, lettre: 'A', lettre_ar: 'أ', texte: 'الالتصاق التام بالحافة اليمنى الترابية قبل بداية المنعرج مع إغماض العينين', estCorrecte: false },
      { id: 6602, lettre: 'B', lettre_ar: 'ب', texte: 'البقاء يسار مسلك السير لتوسيع زاوية الرؤية، مع توجيه النظر للمخرج والاقتراب من الداخل بعد انكشاف الرؤية', estCorrecte: true },
      { id: 6603, lettre: 'C', lettre_ar: 'ج', texte: 'السير في المسلك المعاكس المعاكس تماماً بسرعة مضاعفة', estCorrecte: false },
      { id: 6604, lettre: 'D', lettre_ar: 'د', texte: 'الفرملة القصوى بالفرامل الخلفية وحدها مع قفل المقود', estCorrecte: false }
    ]
  },
  {
    id: 67,
    code: 'Q-MOT-067',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'ROUTE_MOTO',
    texte: 'لماذا تعد الدقائق العشرين الأولى من هطول الأمطار بعد فترة جفاف طويلة الفترة الأكثر خطورة لانزلاق المركبات والدراجات النارية على الطرق؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['فيزياء الالتصاق والالتحام الطرقي', 'تقدير مخاطر الطقس الزلق'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 3.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'اختلاط قطرات المطر الأولى بالغبار وبقايا الزيوت والمطاط المتراكمة على الإسفلت يشكل طبقة لزجة جداً تشبه الصابون تقلل معامل الاحتكاك إلى أدنى مستوياته قبل أن يغسلها المطر الغزير.',
    options: [
      { id: 6701, lettre: 'A', lettre_ar: 'أ', texte: 'لأن محركات الدراجات تفقد 90% من قوتها الميكانيكية بمجرد ملامسة الماء', estCorrecte: false },
      { id: 6702, lettre: 'B', lettre_ar: 'ب', texte: 'لاختلاط الماء بزيوت وغبار الطريق مشكلاً طبقة لزجة خطيرة جداً قبل غسلها بالماء الغزير', estCorrecte: true },
      { id: 6703, lettre: 'C', lettre_ar: 'ج', texte: 'لأن إشارات المرور الضوئية تتوقف آلياً عند هطول أي قطرة مطر', estCorrecte: false },
      { id: 6704, lettre: 'D', lettre_ar: 'د', texte: 'لأن خوذة السائق تصبح ثقيلة جداً وتمنعه من رفع رأسه', estCorrecte: false }
    ]
  },
  {
    id: 68,
    code: 'Q-MOT-068',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'ROUTE_MOTO',
    texte: 'إذا كانت سيارة تسير بسرعة 90 كم/س على طريق جاف، فما هي المسافة التقريبية التي تقطعها خلال زمن رد الفعل البشري الطبيعي (المقدر بثانية واحدة) قبل أن يبدأ السائق بالضغط الفعلي على الفرامل؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['الحساب الحركي للسلامة الطرقية', 'تقدير مسافة رد الفعل والتوقف'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 1.5 }
    ],
    explication: 'القاعدة التقريبية لحساب المسافة المقطوعة في الثانية: رقم العشرات مضروباً في 3 (9 × 3 = 27 متراً)، أو حسابياً (90,000 متر ÷ 3600 ثانية = 25 متراً في الثانية).',
    options: [
      { id: 6801, lettre: 'A', lettre_ar: 'أ', texte: 'حوالي 5 أمتار فقط', estCorrecte: false },
      { id: 6802, lettre: 'B', lettre_ar: 'ب', texte: 'حوالي 25 إلى 27 متراً', estCorrecte: true },
      { id: 6803, lettre: 'C', lettre_ar: 'ج', texte: 'أكثر من 150 متراً', estCorrecte: false },
      { id: 6804, lettre: 'D', lettre_ar: 'د', texte: 'السيارة تتوقف فوراً في نفس النقطة دون قطع أي متر', estCorrecte: false }
    ]
  },
  {
    id: 69,
    code: 'Q-MOT-069',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'ROUTE_MOTO',
    texte: 'في تشكيلات سير الدوريات ومواكب الدراجات النارية للدرك الملكي، ما هو التشكيل المعتمد لضمان السلامة ومسافة المناورة الكافية على الطرق المفتوحة؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['تشكيلات القيادة التكتيكية بالمواكب', 'قواعد سير الدراجات في مجموعات'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 3.0 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.5 }
    ],
    explication: 'التشكيل المتعرج / التناوبي (Formation en quinconce) يمنح كل دراج رؤية أمامية واضحة ومسافة توقف مستقلة وكافية للمناورة في حال الفرملة المفاجئة دون الاصطدام بزميله.',
    options: [
      { id: 6901, lettre: 'A', lettre_ar: 'أ', texte: 'السير في خط مستقيم متلاصق بعجلة تلامس العجلة الأخرى تماماً', estCorrecte: false },
      { id: 6902, lettre: 'B', lettre_ar: 'ب', texte: 'التشكيل المتعرج التناوبي (Quinconce) لتأمين مسافة أمان ورؤية كافية لكل دراج', estCorrecte: true },
      { id: 6903, lettre: 'C', lettre_ar: 'ج', texte: 'السير العرضي جنباً إلى جنب لاحتلال كامل عرض الطريق ومنع أي سيارة من المرور', estCorrecte: false },
      { id: 6904, lettre: 'D', lettre_ar: 'د', texte: 'إطفاء جميع الأضواء والسير دون ترتيب مسبق', estCorrecte: false }
    ]
  },
  {
    id: 70,
    code: 'Q-MOT-070',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'ROUTE_MOTO',
    texte: 'عند اقتراب سيارة إسعاف تشغل المنبهات الصوتية والأضواء الدوارة الزرقاء من ملتقى طرق ذي أسبقية لليمين، ما هو الواجب القانوني والعملياتي على باقي مستعملي الطريق؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['قوانين السير والمركبات ذات الأولوية', 'السلامة الطرقية وتسهيل مهام الإنقاذ'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 2.0 }
    ],
    explication: 'مركبات التدخل المستعجل التي تستعمل أجهزتها التحذيرية الخاصة تتمتع بالأولوية المطلقة؛ ويجب على جميع السائقين تخفيض السرعة وإفساح المسار فوراً والتوقف إذا لزم.',
    options: [
      { id: 7001, lettre: 'A', lettre_ar: 'أ', texte: 'التسابق معها للوصول إلى الملتقى أولاً', estCorrecte: false },
      { id: 7002, lettre: 'B', lettre_ar: 'ب', texte: 'تخفيف السرعة وإفساح المسلك فوراً والتوقف عند الاقتضاء لتسهيل مرورها الآمن', estCorrecte: true },
      { id: 7003, lettre: 'C', lettre_ar: 'ج', texte: 'استخدام المنبه الصوتي للتشويش على صفارات الإنذار', estCorrecte: false },
      { id: 7004, lettre: 'D', lettre_ar: 'د', texte: 'تجاهلها تماماً والتمسك بأسبقية اليمين العادية', estCorrecte: false }
    ]
  },
  {
    id: 71,
    code: 'Q-MOT-071',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'ROUTE_MOTO',
    texte: 'ما هو العنصر الإجباري في معدات الحماية الفردية لدراج الدرك الملكي الذي يوفر الحماية القصوى لعظام الجمجمة والفك السفلي أثناء السقوط المباشر؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['معدات الحماية الفردية وتأمين الدراج', 'السلامة المهنية'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 3.0 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.0 }
    ],
    explication: 'الخوذة كاملة التغطية (Casque intégral) أو القابلة للتعديل والمقفلة والمطابقة للمواصفات توفر حماية حيوية شاملة لمنطقة الرأس وعظام الوجه والفك، بخلاف الخوذات المفتوحة.',
    options: [
      { id: 7101, lettre: 'A', lettre_ar: 'أ', texte: 'القبعة العسكرية القماشية الخفيفة', estCorrecte: false },
      { id: 7102, lettre: 'B', lettre_ar: 'ب', texte: 'الخوذة الواقية المدمجة (Casque intégral) المعتمدة وذات الحماية الفكية الكاملة', estCorrecte: true },
      { id: 7103, lettre: 'C', lettre_ar: 'ج', texte: 'نظارات شمسية عادية دون أي خوذة', estCorrecte: false },
      { id: 7104, lettre: 'D', lettre_ar: 'د', texte: 'وشاح صوفي يلف حول الرقبة', estCorrecte: false }
    ]
  },
  {
    id: 72,
    code: 'Q-MOT-072',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'ROUTE_MOTO',
    texte: 'تفاجأ دراج دركي بوجود عائق طرقي صلب (إطار شاحنة منسلخ) على مساره ولا مجال لتفاديه يمنة أو يسرة. ما هي التقنية الصحيحة لعبور العائق بأمان وتفادي الانقلاب؟',
    difficulte: 'صعب',
    difficulte_code: 'DIFFICILE',
    coefficient: 1.5,
    competences: ['تقنيات المناورة واجتياز العوائق الخطرة', 'التحكم الديناميكي بالدراجة'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 3.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'إبطاء السرعة في خط مستقيم قبل العائق، ثم تحرير الفرامل تماماً، وإبقاء المقود عمودياً ومستقيماً، والوقوف الخفيف على مساند الأرجل لامتصاص الصدمة وتخفيف الحمل على المقود.',
    options: [
      { id: 7201, lettre: 'A', lettre_ar: 'أ', texte: 'الضغط الأقصى على الفرامل الأمامية في لحظة ملامسة العائق تماماً', estCorrecte: false },
      { id: 7202, lettre: 'B', lettre_ar: 'ب', texte: 'الفرملة المسبقة باستقامة، ثم تحرير الفرامل، وإبقاء المقود مستقيماً مع الوقوف الخفيف على مساند الأقدام', estCorrecte: true },
      { id: 7203, lettre: 'C', lettre_ar: 'ج', texte: 'إمالة الدراجة على جانبها والانزلاق عمداً تحت العائق', estCorrecte: false },
      { id: 7204, lettre: 'D', lettre_ar: 'د', texte: 'القفز من فوق الدراجة وتركها تصطدم بمفردها', estCorrecte: false }
    ]
  },
  {
    id: 73,
    code: 'Q-MOT-073',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'ROUTE_MOTO',
    texte: 'خلال مراقبة حمولة شاحنات الوزن الثقيل، ما هو المؤشر القانوني والميداني الذي يثبت وجود مخالفة الحمولة الزائدة (Surcharge) الخطيرة على البنية الطرقية وسلامة الفرملة؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['مراقبة النقل الطرقي والوزن الثقيل', 'التطبيق الصارم لمدونة السير'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 3.0 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 2.0 }
    ],
    explication: 'تجاوز الوزن الإجمالي المأذون به محملة (PTAC / MMA) المسجل في شهادة التسجيل ولوحة الصانع، ويتم تأكيده قانونياً عبر قياس الوزن في محطة وزن معتمدة (Pont-bascule).',
    options: [
      { id: 7301, lettre: 'A', lettre_ar: 'أ', texte: 'طول قامة سائق الشاحنة مقارنة بالمقصورة', estCorrecte: false },
      { id: 7302, lettre: 'B', lettre_ar: 'ب', texte: 'تجاوز الوزن الإجمالي المأذون به مع الحمولة (PTAC) الموثق عبر قياس الميزان الجسري المعتمد', estCorrecte: true },
      { id: 7303, lettre: 'C', lettre_ar: 'ج', texte: 'لون غطاء الحمولة المشمع', estCorrecte: false },
      { id: 7304, lettre: 'D', lettre_ar: 'د', texte: 'عدد الملصقات الإعلانية الموجودة على هيكل الشاحنة', estCorrecte: false }
    ]
  },
  {
    id: 74,
    code: 'Q-MOT-074',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'ROUTE_MOTO',
    texte: 'عند قيادة الدراجة النارية على قنطرة معلقة أو ممر مكشوف تضربه رياح جانبية عاتية، ما السلوك التكتيكي الصائب لمواجهة تمايل الدراجة المفاجئ؟',
    difficulte: 'صعب',
    difficulte_code: 'DIFFICILE',
    coefficient: 1.5,
    competences: ['السيطرة على توازن الدراجة في الرياح المعاكسة', 'القيادة في الظروف الجوية القاسية'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 3.0 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.0 }
    ],
    explication: 'تخفيض السرعة، وضغط الركبتين بإحكام على خزان الوقود، وإرخاء الذراعين قليلاً لتفادي نقل تذبذب الجذع للمقود، والميلان الطفيف باتجاه هبوب الريح لتحقيق التوازن.',
    options: [
      { id: 7401, lettre: 'A', lettre_ar: 'أ', texte: 'زيادة السرعة إلى 180 كم/س للتغلب على الرياح بالقوة الحركية', estCorrecte: false },
      { id: 7402, lettre: 'B', lettre_ar: 'ب', texte: 'تخفيف السرعة، ضم الركبتين للخزان، وتعديل الميلان باتجاه هبوب الريح مع إرخاء الشد على المقود', estCorrecte: true },
      { id: 7403, lettre: 'C', lettre_ar: 'ج', texte: 'فتح المظلة اليدوية أثناء القيادة لصد الرياح الجانبية', estCorrecte: false },
      { id: 7404, lettre: 'D', lettre_ar: 'د', texte: 'رفع كلتا اليدين عن المقود والاعتماد على التوازن الطبيعي', estCorrecte: false }
    ]
  },
  {
    id: 75,
    code: 'Q-MOT-075',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'ROUTE_MOTO',
    texte: 'ما هو الفرق القانوني والإجرائي بين جهاز فحص الكحول بالنفس الأولي (Éthylotest) وجهاز قياس نسبة الكحول في الهواء الزفيري (Éthylomètre)؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['المساطر القانونية لقياس الكحول والمخدرات', 'الضبط القضائي لمخالفات السير'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 }
    ],
    explication: 'جهاز الإيثيلوتيست هو وسيلة كشف وفرز نوعي سريع (إيجابي/سلبي)، بينما الإيثيلومتر جهاز معايرة قانوني معتمد يقيس التركيز الدقيق بالكيلوغرام/لتر وله حجية قضائية قاطعة بالمحضر.',
    options: [
      { id: 7501, lettre: 'A', lettre_ar: 'أ', texte: 'لا يوجد أي فرق وكلاهما مجرد ألعاب إلكترونية توعوية', estCorrecte: false },
      { id: 7502, lettre: 'B', lettre_ar: 'ب', texte: 'الإيثيلوتيست للكشف التوجيهي السريع، بينما الإيثيلومتر جهاز معايرة رسمي معتمد يحدد النسبة القانونية بدقة للإثبات القضائي', estCorrecte: true },
      { id: 7503, lettre: 'C', lettre_ar: 'ج', texte: 'الإيثيلومتر يستخدم فقط للسيارات العسكرية والإيثيلوتيست للمدنية', estCorrecte: false },
      { id: 7504, lettre: 'D', lettre_ar: 'د', texte: 'كلاهما يتطلب سحب عينة من دم السائق في قارورة بلاستيكية بالميدان', estCorrecte: false }
    ]
  },
  {
    id: 76,
    code: 'Q-MOT-076',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'ROUTE_MOTO',
    texte: 'أثناء السير السريع بالدراجة، حدث تذبذب واهتزاز عنيف في المقود والعجلة الأمامية (Guidonnage / Wobble). ما التصرف الميكانيكي السليم الذي يمنع السقوط الحتمي؟',
    difficulte: 'صعب',
    difficulte_code: 'DIFFICILE',
    coefficient: 1.5,
    competences: ['التعامل مع حالات الطوارئ الديناميكية للدراجة', 'الإنقاذ من حوادث فقد السيطرة'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 3.0 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.0 }
    ],
    explication: 'الخطأ القاتل هو الكبح العنيف بالفرامل الأمامية؛ التصرف الصحيح هو تقليل الضغط على المقود برفق، وإغلاق الوقود تدريجياً، وترك فيزياء الدراجة تستعيد توازنها الذاتي.',
    options: [
      { id: 7601, lettre: 'A', lettre_ar: 'أ', texte: 'الضغط بأقصى قوة وفجأة على مقبض الفرامل الأمامية لمحاولة قفل العجلة', estCorrecte: false },
      { id: 7602, lettre: 'B', lettre_ar: 'ب', texte: 'عدم مقاومة المقود بتصلب عضلي، وتخفيف السرعة تدريجياً بالسماح للدراجة باستعادة توازنها التلقائي', estCorrecte: true },
      { id: 7603, lettre: 'C', lettre_ar: 'ج', texte: 'النزول فوراً من الدراجة وهي تسير بسرعة 120 كم/س', estCorrecte: false },
      { id: 7604, lettre: 'D', lettre_ar: 'د', texte: 'تدوير المقود بالكامل إلى أقصى اليمين فجأة', estCorrecte: false }
    ]
  },
  {
    id: 77,
    code: 'Q-MOT-077',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'ROUTE_MOTO',
    texte: 'عند وقوع حادث سير داخل منعرج خطير يحجب الرؤية، على أي مسافة يجب وضع مثلث العطب وأقماع التشوير التحذيرية قبل مدخل المنعرج؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['التشوير والإنذار الطرقي الاستباقي', 'حماية مستعملي الطريق ومسرح الحادث'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'يجب وضع التشوير قبل المنعرج بمسافة لا تقل عن 100 إلى 150 متراً في الطرق المفتوحة لتمكين السائقين القادمين من الفرملة الآمنة قبل ولوج المنعرج ورؤية الحادث.',
    options: [
      { id: 7701, lettre: 'A', lettre_ar: 'أ', texte: 'مباشرة ملاصقاً للسيارة المصدومة داخل المنعرج', estCorrecte: false },
      { id: 7702, lettre: 'B', lettre_ar: 'ب', texte: 'قبل بداية المنعرج بمسافة كافية (100 إلى 150 متراً) لإنذار المركبات القادمة قبل انحجاب الرؤية', estCorrecte: true },
      { id: 7703, lettre: 'C', lettre_ar: 'ج', texte: 'خلف الحادث بـ 200 متر في الاتجاه المعاكس الذي لا يمر منه أحد', estCorrecte: false },
      { id: 7704, lettre: 'D', lettre_ar: 'د', texte: 'إخفاء المثلث داخل صندوق الأمتعة تفادياً لسرقته', estCorrecte: false }
    ]
  },
  {
    id: 78,
    code: 'Q-MOT-078',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'ROUTE_MOTO',
    texte: 'في مهام مرافقة وحماية الشخصيات الهامة (VIP) بواسطة فرقة دراجي الدرك الملكي، ما هي المهمة الميدانية الحيوية للدراج "الفاتح" (Ouvreur / Éclaireur)؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['بروتوكول وتكتيك المواكب الرسمية', 'تأمين مسارات السير السريعة'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 3.0 }
    ],
    explication: 'الدراج الفاتح يتقدم الموكب بمسافة استطلاعية لتطهير المسار، وقطع وتأمين ملتقيات الطرق الحساسة، والتأكد من خلو المسار من أي عوائق قبل وصول سيارة الشخصية المحمية.',
    options: [
      { id: 7801, lettre: 'A', lettre_ar: 'أ', texte: 'التقاط الصور التذكارية للموكب من الأمام', estCorrecte: false },
      { id: 7802, lettre: 'B', lettre_ar: 'ب', texte: 'استطلاع المسار المتقدم، إغلاق وتأمين التقاطعات الحيوية، وضمان تدفق سير الموكب دون توقف', estCorrecte: true },
      { id: 7803, lettre: 'C', lettre_ar: 'ج', texte: 'حمل حقائب الأمتعة الخاصة بالضيوف وتوزيع المشروبات', estCorrecte: false },
      { id: 7804, lettre: 'D', lettre_ar: 'د', texte: 'مراقبة سرعة الموكب من الخلف وتسجيل مخالفات لسيارات الحراسة', estCorrecte: false }
    ]
  },
  {
    id: 79,
    code: 'Q-MOT-079',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'ROUTE_MOTO',
    texte: 'ما هو الخطر الميكانيكي والفيزيائي المباشر الناتج عن السير بإطارات دراجة نارية منخفضة الضغط بشدة (Sous-gonflage) في يوم حار على الطريق السيار؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الصيانة الوقائية لمركبات الدوريات', 'معايير السلامة الميكانيكية'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 3.0 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 1.5 }
    ],
    explication: 'نقص ضغط الإطار يسبب تشوهاً مستمراً لهيكله وارتفاعاً مفرطاً في درجة حرارته الداخلية نتيجة الاحتكاك الشديد، مما يؤدي إلى انفصال طبقات المطاط وانفجار الإطار فجأة.',
    options: [
      { id: 7901, lettre: 'A', lettre_ar: 'أ', texte: 'تحسن سرعة الدراجة لتصل إلى سرعة الطائرات النفاثة', estCorrecte: false },
      { id: 7902, lettre: 'B', lettre_ar: 'ب', texte: 'ارتفاع شديد في حرارة الإطار وتهتك أنسجته الداخلية مما يعرضه للانفجار الفجائي القاتل', estCorrecte: true },
      { id: 7903, lettre: 'C', lettre_ar: 'ج', texte: 'انخفاض استهلاك الوقود إلى الصفر المطلق', estCorrecte: false },
      { id: 7904, lettre: 'D', lettre_ar: 'د', texte: 'تغير لون الهيكل الخارجي للدراجة إلى الأبيض', estCorrecte: false }
    ]
  },
  {
    id: 80,
    code: 'Q-MOT-080',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'ROUTE_MOTO',
    texte: 'أثناء مرافقة شاحنة ضخمة أو حافلة، أين تقع "الزاوية الميتة" (Angle mort) الأخطر التي يختفي فيها دراج الدرك تماماً عن رؤية سائق الشاحنة في مراياه العاكسة؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['إدراك الزوايا الميتة للمركبات الثقيلة', 'التمركز التكتيكي الآمن للدراج'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 3.0 },
      { code: 'SPEC-INSTRUCTEUR', specialite: 'التكوين والتعليم', poids: 1.5 }
    ],
    explication: 'المنطقة المحاذية للجانب الأيمن الخلفي للرأس الجرار مباشرة وأسفل زجاج الأبواب الجانبية هي أوسع زاوية ميتة؛ القاعدة الذهبية: "إذا لم تكن قادراً على رؤية وجه السائق في مرآته، فهو حتماً لا يراك".',
    options: [
      { id: 8001, lettre: 'A', lettre_ar: 'أ', texte: 'على بعد 100 متر أمام الشاحنة في خط مستقيم ومكشوف', estCorrecte: false },
      { id: 8002, lettre: 'B', lettre_ar: 'ب', texte: 'بمحاذاة الجانب الأيمن والأمام والخلف المباشر للمركبة حيث تعجز المرايا عن كشف الدراج', estCorrecte: true },
      { id: 8003, lettre: 'C', lettre_ar: 'ج', texte: 'فوق سقف مقصورة الشاحنة مباشرة', estCorrecte: false },
      { id: 8004, lettre: 'D', lettre_ar: 'د', texte: 'الزوايا الميتة غير موجودة إطلاقاً في الشاحنات الحديثة', estCorrecte: false }
    ]
  }
];
