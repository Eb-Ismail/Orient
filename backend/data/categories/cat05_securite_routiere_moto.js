// ==============================================================================
// الفئة 5: السلامة الطرقية وقيادة الدراجات (15 سؤال - من 66 إلى 80)
// ==============================================================================

export const questionsSecuriteRoutiereMoto = [
  {
    id: 66,
    code: 'Q-ROU-066',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'SECURITE_ROUTIERE_MOTO',
    texte: 'في القيادة العملياتية المتقدمة للدراجات النارية العسكرية، ما هي النسبة المثالية لتوزيع قوة الكبح (Freinage) بين العجلة الأمامية والعجلة الخلفية على طريق إسفلتي جاف ومستقيم لتحقيق توقف سريع وآمن؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['ديناميكا كبح الدراجات النارية', 'تقنيات التحكم في التوقف الاستعجالي'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-ROUTE', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 1.5 }
    ],
    explication: 'عند الكبح، تنتقل الكتلة والوزن نحو الأمام (Transfert de masse)؛ لذا توزع القوة بمقدار حوالي 70% على المكبح الأمامي و30% على المكبح الخلفي لضمان أقصى فعالية دون غلق العجلات.',
    options: [
      { id: 6601, lettre: 'A', lettre_ar: 'أ', texte: '100% على المكبح الخلفي فقط وعدم لمس الأمامي نهائياً', estCorrecte: false },
      { id: 6602, lettre: 'B', lettre_ar: 'ب', texte: 'حوالي 70% على المكبح الأمامي و30% على المكبح الخلفي بتدرج وتوازن', estCorrecte: true },
      { id: 6603, lettre: 'C', lettre_ar: 'ج', texte: '50% باستخدام الأقدام على الأرض مباشرة دون مكابح', estCorrecte: false },
      { id: 6604, lettre: 'D', lettre_ar: 'د', texte: 'الاعتماد على المكبح اليدوي للأضواء فقط', estCorrecte: false }
    ]
  },
  {
    id: 67,
    code: 'Q-ROU-067',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'SECURITE_ROUTIERE_MOTO',
    texte: 'ما هو المفهوم الفيزيائي لتقنية "التوجيه العكسي" (Contre-braquage / Counter-steering) المعتمدة إلزامياً لقيادة الدراجات النارية الثقيلة عند سرعة تتجاوز 35 كم/س للميلان السريع في المنعطفات؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['فيزياء التحكم بالدراجات النارية', 'المناورة التكتيكية في المنعطفات'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-ROUTE', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.0 }
    ],
    explication: 'التوجيه العكسي هو دفع مقود الدراجة للأمام في جهة الانعطاف المرغوب (دفع المقبض الأيمن للانعطاف يميناً)، مما يخل بتوازن العجلة الأمامية جيروسكوبياً ويميل الدراجة فوراً وسلساً نحو المنعطف.',
    options: [
      { id: 6701, lettre: 'A', lettre_ar: 'أ', texte: 'إدارة المقود بزاوية 90 درجة عكس اتجاه الطريق لإيقاف المحرك', estCorrecte: false },
      { id: 6702, lettre: 'B', lettre_ar: 'ب', texte: 'الضغط الخفيف على المقبض في نفس اتجاه الميلان المرغوب لإمالة الدراجة بسلاسة ودقة', estCorrecte: true },
      { id: 6703, lettre: 'C', lettre_ar: 'ج', texte: 'النزول من الدراجة وجرها باليد في المنعطف الحاد', estCorrecte: false },
      { id: 6704, lettre: 'D', lettre_ar: 'د', texte: 'استخدام الدواسة الخلفية فقط للدوران للخلف', estCorrecte: false }
    ]
  },
  {
    id: 68,
    code: 'Q-ROU-068',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'SECURITE_ROUTIERE_MOTO',
    texte: 'خلال مراقبة شاحنة نقل للبضائع، يفحص دركي السلامة الطرقية أسطوانة أو بطاقة جهاز تسجيل السرعة وزمن القيادة (Chrono-tachygraphe). ما هو الحد الأقصى القياسي لساعات السياقة المتواصلة المسموح به قانوناً قبل وجوب أخذ فترة راحة؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['مراقبة النقل الطرقي المهني', 'تطبيق مدونة السير والتنظيمات'],
    specialites_ponderation: [
      { code: 'SPEC-ROUTE', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'وفق مدونة السير والأنظمة المنظمة للنقل المهني، لا يجوز للسائق المهني قيادة المركبة لأكثر من 4 ساعات ونصف متواصلة دون الاستفادة من فترة استراحة لا تقل عن 45 دقيقة (أو مجزأة).',
    options: [
      { id: 6801, lettre: 'A', lettre_ar: 'أ', texte: 'ساعتان فقط مهما كانت المسافة', estCorrecte: false },
      { id: 6802, lettre: 'B', lettre_ar: 'ب', texte: '4 ساعات ونصف من السياقة المتواصلة كحد أقصى قبل الاستراحة القانونية الإلزامية', estCorrecte: true },
      { id: 6803, lettre: 'C', lettre_ar: 'ج', texte: '12 ساعة متواصلة ليلاً فقط', estCorrecte: false },
      { id: 6804, lettre: 'D', lettre_ar: 'د', texte: 'لا يوجد أي حد زمني ما دام السائق يشرب القهوة', estCorrecte: false }
    ]
  },
  {
    id: 69,
    code: 'Q-ROU-069',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'SECURITE_ROUTIERE_MOTO',
    texte: 'في تشكيل خفر المواكب الرسمية بالدراجات النارية (Escorte officielle)، ما هو التشكيل الهندسي النموذجي المعتمد لفتح الطريق وتوفير الحماية الميدانية الأمامية لسيارة الشخصية المحمية؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['التشكيلات التكتيكية للمواكب', 'بروتوكولات الحماية بالدراجات النارية'],
    specialites_ponderation: [
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.5 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-ROUTE', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 1.5 }
    ],
    explication: 'تشكيل رأس السهم أو المثلث (Formation en V أو en flèche) هو التشكيل التكتيكي المعتمد عالمياً؛ حيث يؤمن فتح المسار، إبعاد حركة المرور الجانبية، وحماية زوايا الصدم الأمامية.',
    options: [
      { id: 6901, lettre: 'A', lettre_ar: 'أ', texte: 'السير في طابور مستقيم متأخر خلف السيارة الرسمية بمسافة كيلومتر', estCorrecte: false },
      { id: 6902, lettre: 'B', lettre_ar: 'ب', texte: 'تشكيل رأس السهم (V / Flèche) الأمامي والجانبي لفتح المسار وتأمين المحاور المتقاطعة', estCorrecte: true },
      { id: 6903, lettre: 'C', lettre_ar: 'ج', texte: 'التفرق العشوائي في الشوارع الموازية دون أي تشكيل منظم', estCorrecte: false },
      { id: 6904, lettre: 'D', lettre_ar: 'د', texte: 'السير فوق أرصفة المشاة فقط لتفادي السيارات', estCorrecte: false }
    ]
  },
  {
    id: 70,
    code: 'Q-ROU-070',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'SECURITE_ROUTIERE_MOTO',
    texte: 'أثناء القيادة على طريق سريع ممطر، شعرت بفقدان مفاجئ لتجاوب مقود الدراجة وطوفان العجلة مع انعدام السيطرة (Aquaplaning / الانزلاق المائي). ما هو رد الفعل التقني السليم لتجنب السقوط؟',
    difficulte: 'صعب',
    difficulte_code: 'AVANCE',
    coefficient: 2.0,
    competences: ['التعامل مع فقدان الالتصاق المائي', 'التحكم الاحترافي في الدراجات'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-ROUTE', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 }
    ],
    explication: 'في حالة الانزلاق المائي، يجب عدم الضغط العنيف على الفرامل نهائياً، والحفاظ على استقامة الدراجة وتخفيف مقبض الوقود تدريجياً وبثبات حتى يعود تلامس الإطار مع الإسفلت.',
    options: [
      { id: 7001, lettre: 'A', lettre_ar: 'أ', texte: 'الضغط بكل قوة على الفرامل الأمامية وإمالة الدراجة بشدة', estCorrecte: false },
      { id: 7002, lettre: 'B', lettre_ar: 'ب', texte: 'تجنب أي كبح مفاجئ، إبقاء الدراجة في خط مستقيم، والرفع التدريجي لليد عن مقبض السرعة حتى استعادة التماسك', estCorrecte: true },
      { id: 7003, lettre: 'C', lettre_ar: 'ج', texte: 'القفز من فوق الدراجة على الفور لإنقاذ النفس', estCorrecte: false },
      { id: 7004, lettre: 'D', lettre_ar: 'د', texte: 'إغلاق العينين والانتظار حتى تتوقف الدراجة بمفردها', estCorrecte: false }
    ]
  },
  {
    id: 71,
    code: 'Q-ROU-071',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'SECURITE_ROUTIERE_MOTO',
    texte: 'عند ضبط سائق يقود تحت تأثير الكحول، ما هو الجهاز المعتمد لإجراء الفحص الإثباتي للكمية الدقيقة لكحول هواء الزفير (Éthylomètre)، وما هو الفرق بينه وبين جهاز الكشف الأولي (Éthylotest)؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['المعاينة الإجرائية لجرائم القيادة في حالة سكر', 'الاستخدام القانوني لأجهزة الفحص الطرقية'],
    specialites_ponderation: [
      { code: 'SPEC-ROUTE', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 1.5 }
    ],
    explication: 'جهاز الإيثيلوتيست (Éthylotest) هو أداة رصد أولية تشير لوجود الكحول من عدمه، بينما الإيثيلومتر (Éthylomètre) هو جهاز قياس قانوني معاير يحدد النسبة الرقمية الدقيقة المعتمدة كدليل إثبات قضائي بالمحضر.',
    options: [
      { id: 7101, lettre: 'A', lettre_ar: 'أ', texte: 'لا يوجد أي فرق وكل الأجهزة مجرد ساعات توقيت عادية', estCorrecte: false },
      { id: 7102, lettre: 'B', lettre_ar: 'ب', texte: 'الإيثيلوتيست للكشف النوعي الأولي، والإيثيلومتر للقياس الكمي المعاير المعتمد قانونياً في المحاضر القضائية', estCorrecte: true },
      { id: 7103, lettre: 'C', lettre_ar: 'ج', texte: 'الجهازان يقيسان فقط نسبة ضغط هواء الإطارات', estCorrecte: false },
      { id: 7104, lettre: 'D', lettre_ar: 'د', texte: 'الدرك يعتمد على حاسة الشم فقط دون الحاجة لأي جهاز علمي', estCorrecte: false }
    ]
  },
  {
    id: 72,
    code: 'Q-ROU-072',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'SECURITE_ROUTIERE_MOTO',
    texte: 'على الطريق السيار، ما هي المسافة الزمنية للأمان (Distance de sécurité) التي يجب الحفاظ عليها كحد أدنى بين مركبة الدورية والمركبة التي تسير أمامها في ظروف مناخية عادية؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['مسافات الأمان الطرقية', 'الوقاية من حوادث التتابع والاصطدام الخلفي'],
    specialites_ponderation: [
      { code: 'SPEC-ROUTE', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 }
    ],
    explication: 'القاعدة القياسية للسلامة الطرقية تفرض مسافة زمنية لا تقل عن ثانيتين (2 secondes) بين المركبتين في الأحوال العادية، وتضاعف إلى 4 ثوان على الأقل في حالة المطر أو الضباب والسرعات العالية.',
    options: [
      { id: 7201, lettre: 'A', lettre_ar: 'أ', texte: 'نصف ثانية تكفي تماماً عند السرعة العالية', estCorrecte: false },
      { id: 7202, lettre: 'B', lettre_ar: 'ب', texte: 'ثانيتان على الأقل في الظروف العادية، وتضاعف في حالة سوء الأحوال الجوية', estCorrecte: true },
      { id: 7203, lettre: 'C', lettre_ar: 'ج', texte: 'الالتصاق بالمصد الخلفي لإجبار السائق على التوقف', estCorrecte: false },
      { id: 7204, lettre: 'D', lettre_ar: 'د', texte: 'عشر دقائق مهما كانت سرعة المركبة', estCorrecte: false }
    ]
  },
  {
    id: 73,
    code: 'Q-ROU-073',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'SECURITE_ROUTIERE_MOTO',
    texte: 'تحمل شاحنة لوحة برتقالية مستطيلة مقسومة لنصفين، في الأعلى الرقم (33) وفي الأسفل الرقم (1203). ماذا يعني الرقم (33) في النظام الدولي لنقل المواد الخطرة (ADR)؟',
    difficulte: 'صعب',
    difficulte_code: 'AVANCE',
    coefficient: 2.0,
    competences: ['قراءة رموز المواد الخطرة ADR', 'التدخل الاستعجالي في حوادث النقل الكيميائي'],
    specialites_ponderation: [
      { code: 'SPEC-ROUTE', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'في ترميز ADR: الرقم العلوي هو رمز الخطر (Danger Code)، وتكرار الرقم 3 (33) يعني سائل شديد الاشتعال (Très inflammable). والرقم السفلي (1203) هو رمز مادة البنزين (Essence/Gasoline).',
    options: [
      { id: 7301, lettre: 'A', lettre_ar: 'أ', texte: 'سرعة الشاحنة القصوى هي 33 كم/س', estCorrecte: false },
      { id: 7302, lettre: 'B', lettre_ar: 'ب', texte: 'سائل شديد الاشتعال (خطر حريق وميضي عالٍ جداً)', estCorrecte: true },
      { id: 7303, lettre: 'C', lettre_ar: 'ج', texte: 'شحنة حليب طازج معقم', estCorrecte: false },
      { id: 7304, lettre: 'D', lettre_ar: 'د', texte: 'الوزن الصافي للشاحنة هو 33 قنطاراً', estCorrecte: false }
    ]
  },
  {
    id: 74,
    code: 'Q-ROU-074',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'SECURITE_ROUTIERE_MOTO',
    texte: 'في الفحص الميكانيكي اليومي الإلزامي للدراجة النارية قبل الانطلاق في الخدمة، ما هو العنصر الميكانيكي الذي يؤدي انخفاض ضغطه بأقل من 0.5 بار إلى ثقل خطير في توجيه المقود وعدم استقرار الدراجة في المنعطفات؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الفحص التقني والصيانة الوقائية للدراجات', 'أمان القيادة الميكانيكية'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-ROUTE', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.0 }
    ],
    explication: 'ضغط الهواء في الإطار الأمامي حاسم في دقة التوجيه؛ نقص الضغط يزيد مساحة الاحتكاك ويجعل المقود ثقيلاً جداً، مما يسبب انحراف الدراجة عن مسارها وسقوطها عند الميلان.',
    options: [
      { id: 7401, lettre: 'A', lettre_ar: 'أ', texte: 'ضغط علبة التروس الأوتوماتيكية', estCorrecte: false },
      { id: 7402, lettre: 'B', lettre_ar: 'ب', texte: 'ضغط الهواء في الإطار الأمامي للدراجة', estCorrecte: true },
      { id: 7403, lettre: 'C', lettre_ar: 'ج', texte: 'ضغط البطارية الكهربائية', estCorrecte: false },
      { id: 7404, lettre: 'D', lettre_ar: 'د', texte: 'ضغط مصباح الإشارة الجانبي', estCorrecte: false }
    ]
  },
  {
    id: 75,
    code: 'Q-ROU-075',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'SECURITE_ROUTIERE_MOTO',
    texte: 'عند تأمين ملتقى طرق معقد أثناء مرور موكب رسمي مستعجل، ما هي الإشارة والإجراءات التي يقوم بها الدراج المكلف بتجميد حركة السير (Jalonneur) لضمان حماية الموكب ومنع أي اختراق؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['تأمين التقاطعات الحيوية', 'إشارات تنظيم المرور العسكري'],
    specialites_ponderation: [
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.5 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-ROUTE', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 }
    ],
    explication: 'يقوم الدراج بوضع دراجته كحاجز بصري آمن، ويقف بوضعية حازمة رافعاً يده بإشارة التوقف المطلق مع تشغيل الأضواء التحذيرية واستخدام الصافرة النظامية لتنبيه كافة مستعملي الطريق بوقف كامل للحركة.',
    options: [
      { id: 7501, lettre: 'A', lettre_ar: 'أ', texte: 'الاختباء خلف الأشجار حتى يمر الموكب دون لفت الانتباه', estCorrecte: false },
      { id: 7502, lettre: 'B', lettre_ar: 'ب', texte: 'التمركز الحازم في زاوية الرؤية، رفع الذراع بإشارة الوقوف الإلزامي وتشغيل المنبهات الضوئية والصافرة لفرض التوقف التام للمركبات المتقاطعة', estCorrecte: true },
      { id: 7503, lettre: 'C', lettre_ar: 'ج', texte: 'دعوة جميع السيارات للمرور بسرعة قبل وصول الموكب', estCorrecte: false },
      { id: 7504, lettre: 'D', lettre_ar: 'د', texte: 'إطفاء جميع أضواء الدراجة والوقوف على الرصيف', estCorrecte: false }
    ]
  },
  {
    id: 76,
    code: 'Q-ROU-076',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'SECURITE_ROUTIERE_MOTO',
    texte: 'أثناء قيادة الدراجة النارية ليلاً خارج المدار الحضري، ظهر فجأة حيوان بري (خنزير أو كلب ضال) يقطع الطريق على مسافة 25 متراً وسرعة الدراجة 70 كم/س. ما هو الإجراء التكتيكي السليم لتفادي الصدم العنيف؟',
    difficulte: 'صعب',
    difficulte_code: 'AVANCE',
    coefficient: 2.0,
    competences: ['المناورات الاستعجالية لتفادي العوائق', 'التحكم الحركي تحت المفاجأة'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-ROUTE', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 }
    ],
    explication: 'التصرف السليم هو الكبح القوي المتدرج بالدراجة وهي في وضع مستقيم تماماً لتخفيض أكبر قدر من السرعة، والنظر إلى المنفذ أو المسار الفارغ لتجاوز العائق (Evitement) وليس التحديق في الحيوان لأن الدراجة تذهب دائماً حيث تنظر العين.',
    options: [
      { id: 7601, lettre: 'A', lettre_ar: 'أ', texte: 'التحديق في عيني الحيوان والضغط العنيف على المقود لإسقاط الدراجة', estCorrecte: false },
      { id: 7602, lettre: 'B', lettre_ar: 'ب', texte: 'الكبح الحازم في خط مستقيم، وتوجيه النظر نحو المسار البديل الآمن لتنفيذ مناورة التملص دون إقفال العجلات', estCorrecte: true },
      { id: 7603, lettre: 'C', lettre_ar: 'ج', texte: 'إطلاق النار فوراً على الحيوان أثناء القيادة بسرعة', estCorrecte: false },
      { id: 7604, lettre: 'D', lettre_ar: 'د', texte: 'رفع اليدين عن المقود والقفز في الهواء', estCorrecte: false }
    ]
  },
  {
    id: 77,
    code: 'Q-ROU-077',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'SECURITE_ROUTIERE_MOTO',
    texte: 'ما هو الحد القانوني لعمق الأخاديد الرئيسية (Profondeur des sculptures) لإطارات السيارات والدراجات النارية الذي يعتبر النزول تحته مخالفة مرورية تستوجب توقيف المركبة لخطورتها على السلامة العامة؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['المراقبة التقنية لمركبات السير', 'معايير سلامة الإطارات المطاطية'],
    specialites_ponderation: [
      { code: 'SPEC-ROUTE', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 }
    ],
    explication: 'المعيار القانوني الأدنى لعمق نقوش الإطارات هو 1.6 ملم (1.6 mm) للسيارات؛ وتآكلها إلى مؤشر التآكل يقلل طرد المياه ويزيد خطر الانفجار والانزلاق الحاد.',
    options: [
      { id: 7701, lettre: 'A', lettre_ar: 'أ', texte: '0.1 ملم فقط', estCorrecte: false },
      { id: 7702, lettre: 'B', lettre_ar: 'ب', texte: '1.6 ملم كحد أدنى قانوني عبر كامل محيط الإطار', estCorrecte: true },
      { id: 7703, lettre: 'C', lettre_ar: 'ج', texte: '10 سنتيمترات', estCorrecte: false },
      { id: 7704, lettre: 'D', lettre_ar: 'د', texte: 'يمكن أن يكون الإطار أملساً تماماً كالمرآة دون أي خطر', estCorrecte: false }
    ]
  },
  {
    id: 78,
    code: 'Q-ROU-078',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'SECURITE_ROUTIERE_MOTO',
    texte: 'في قيادة الدراجات ضمن صف جماعي عسكري (Roulage en groupe)، لماذا يُعتمد إلزامياً أسلوب "التشكيل المتدرج المتخالف" (En quinconce) أثناء السير على الطرق المستقيمة؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['تكتيكات السير الجماعي بالدراجات', 'توفير مجالات الأمان والمناورة'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.5 },
      { code: 'SPEC-ROUTE', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 1.5 }
    ],
    explication: 'السير بشكل متخالف (واحدة يميناً والأخرى يساراً) يوفر لكل دراج مسافة كبح آمنة ومجال رؤية واسعاً ومساحة مناورة حرة للتفادي دون الاصطدام بزميله في حال التوقف المفاجئ.',
    options: [
      { id: 7801, lettre: 'A', lettre_ar: 'أ', texte: 'لإغلاق الطريق تماماً ومنع أي مركبة أخرى من السفر', estCorrecte: false },
      { id: 7802, lettre: 'B', lettre_ar: 'ب', texte: 'لمنح كل دراج مسافة أمان مضاعفة ومجال رؤية أمامي ومساحة تملص استعجالية كافية', estCorrecte: true },
      { id: 7803, lettre: 'C', lettre_ar: 'ج', texte: 'لتبادل الحديث بسهولة بين الدراجين أثناء السير بسرعة', estCorrecte: false },
      { id: 7804, lettre: 'D', lettre_ar: 'د', texte: 'لتشجيع السباقات التنافسية بين عناصر الدورية', estCorrecte: false }
    ]
  },
  {
    id: 79,
    code: 'Q-ROU-079',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'SECURITE_ROUTIERE_MOTO',
    texte: 'ما هو الترتيب الصحيح للأولويات عند تقاطع طرق يحتوي على: ضابط درك يوجه المرور بيديه، إشارة ضوئية خضراء، وعلامة "قف" (STOP) مثبتة على العمود؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['هرمية إشارات المرور', 'سلطة أعوان المرور المنظمين للسير'],
    specialites_ponderation: [
      { code: 'SPEC-ROUTE', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'حسب هرمية قواعد السير: إشارات وأوامر أعوان المرور والدرك تعلو وتلغي الإشارات الضوئية والعلامات العمودية والأفقية وقواعد الأسبقية العامة.',
    options: [
      { id: 7901, lettre: 'A', lettre_ar: 'أ', texte: 'تطبيق علامة قف أولاً وتجاهل إشارات الضابط تماماً', estCorrecte: false },
      { id: 7902, lettre: 'B', lettre_ar: 'ب', texte: 'إشارات وأوامر عون المرور/الدركي تسود وتلغي الإشارات الضوئية والتشوير الطرقي', estCorrecte: true },
      { id: 7903, lettre: 'C', lettre_ar: 'ج', texte: 'اتباع الضوء الأخضر فقط مهما كانت إشارة الدركي', estCorrecte: false },
      { id: 7904, lettre: 'D', lettre_ar: 'د', texte: 'إعطاء الأسبقية للأكبر حجماً بين المركبات', estCorrecte: false }
    ]
  },
  {
    id: 80,
    code: 'Q-ROU-080',
    categorie: 'السلامة الطرقية وقيادة الدراجات',
    categorie_code: 'SECURITE_ROUTIERE_MOTO',
    texte: 'عند مرافقة شحنة من المتفجرات المدنية المنقولة نحو مقلع أحجار، ما هي المسافة الفاصلة والاحتياطات الخاصة التي تفرضها الدورية المرافقة لحماية القافلة؟',
    difficulte: 'صعب',
    difficulte_code: 'AVANCE',
    coefficient: 2.0,
    competences: ['مرافقة المواد المتفجرة والحساسة', 'إجراءات السلامة الأمنية الصارمة'],
    specialites_ponderation: [
      { code: 'SPEC-ROUTE', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 }
    ],
    explication: 'مرافقة المتفجرات تتطلب منع التدخين نهائياً، تثبيت مسافة أمان عازلة لا تقل عن 50 إلى 100 متر بين مركبات المرافقة والشاحنة، حظر العبور في أوقات الذروة والمناطق الحضرية إلا بمسار مرخص، والتأكد من مطابقة وسائل الإطفاء ومفاتيح عزل الكهرباء.',
    options: [
      { id: 8001, lettre: 'A', lettre_ar: 'أ', texte: 'السماح للسيارات المدنية بالسير بين شاحنة المتفجرات ودورية الدرك', estCorrecte: false },
      { id: 8002, lettre: 'B', lettre_ar: 'ب', texte: 'تأمين مسافة أمان عازلة ومنع التجاوز نهائياً والتأكد من جاهزية أجهزة الإطفاء وعزل التيارات الكهربائية والالتزام بالمسار المرخص', estCorrecte: true },
      { id: 8003, lettre: 'C', lettre_ar: 'ج', texte: 'التوقف في محطة وقود لشرب الشاي وترك الشاحنة بدون حراسة', estCorrecte: false },
      { id: 8004, lettre: 'D', lettre_ar: 'د', texte: 'نقل المتفجرات في صناديق مفتوحة ومعرضة للشمس المباشرة', estCorrecte: false }
    ]
  }
];
