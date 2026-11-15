// ==============================================================================
// الفئة 2: التحليل والملاحظة (15 سؤال - من 21 إلى 35)
// ==============================================================================

export const questionsObservation = [
  {
    id: 21,
    code: 'Q-OBS-021',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'OBSERVATION',
    texte: 'أثناء معاينة مسرح حادث سير، لاحظ المحقق آثار فرملة متقطعة ومنتظمة على الإسفلت قبل نقطة الاصطدام بـ 15 متراً. إلى ماذا يشير هذا النمط المحدد من الآثار؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الملاحظة الدقيقة للأدلة الميدانية', 'التحليل السببي لحوادث السير'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'الآثار المتقطعة والمنتظمة لفرامل المركبة تعكس عمل نظام منع انغلاق المكابح (ABS) الذي يضغط ويحرر المكابح آلياً بسرعة عالية لتفادي انزلاق العجلات.',
    options: [
      { id: 2101, lettre: 'A', lettre_ar: 'أ', texte: 'السائق كان يضغط على دواسة الفرامل باليد بدل القدم', estCorrecte: false },
      { id: 2102, lettre: 'B', lettre_ar: 'ب', texte: 'تدخل نظام منع انغلاق المكابح (ABS) في السيارة لتفادي الانزلاق', estCorrecte: true },
      { id: 2103, lettre: 'C', lettre_ar: 'ج', texte: 'انفجار الإطار الأمامي الأيمن قبل الاصطدام', estCorrecte: false },
      { id: 2104, lettre: 'D', lettre_ar: 'د', texte: 'تعطل نظام توجيه المقود بشكل كلي ومفاجئ', estCorrecte: false }
    ]
  },
  {
    id: 22,
    code: 'Q-OBS-022',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'OBSERVATION',
    texte: 'عند تفحص رخصة سياقة إلكترونية أثناء مراقبة ليلية بواسطة مصباح الأشعة فوق البنفسجية (UV)، ما هي العلامة الدالة الفورية على أن الوثيقة مشبوهة أو مقلدة؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['كشف التزييف', 'التدقيق الوثائقي'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 1.5 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 1.0 }
    ],
    explication: 'الوثائق الرسمية تحتوي على أحبار أمنية تتوهج تحت الأشعة فوق البنفسجية وتصميم ميكروغرافي دقيق؛ غياب التوهج الفوسفوري المميز يدل على التزوير المادي.',
    options: [
      { id: 2201, lettre: 'A', lettre_ar: 'أ', texte: 'وضوح صورة صاحب الرخصة بلون أسود داكن', estCorrecte: false },
      { id: 2202, lettre: 'B', lettre_ar: 'ب', texte: 'غياب الشعارات المتوهجة فوسفورياً تحت الأشعة فوق البنفسجية', estCorrecte: true },
      { id: 2203, lettre: 'C', lettre_ar: 'ج', texte: 'وجود شريحة إلكترونية بارزة على ظهر البطاقة', estCorrecte: false },
      { id: 2204, lettre: 'D', lettre_ar: 'د', texte: 'كتابة الاسم العائلي بالحروف اللاتينية والعربية معاً', estCorrecte: false }
    ]
  },
  {
    id: 23,
    code: 'Q-OBS-023',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'OBSERVATION',
    texte: 'في رسم بياني تصادمي، انحرفت السيارة (أ) بزاوية 45 درجة نحو اليمين بعد اصطدام جانبي مع شاحنة (ب) التي أكملت مسارها المستقيم دون أي انحراف. ما الاستنتاج الفيزيائي والملاحظاتي المباشر؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['قراءة المخططات الميدانية', 'التحليل الميكانيكي للحوادث'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'وفق قوانين الديناميكا وكمية الحركة، الكتلة الأكبر للشاحنة وعزم اندفاعها المستمر جعلا طاقتها الحركية تمتص الاصطدام بينما فرضت انحرافاً كبيراً على السيارة الأخف وزناً.',
    options: [
      { id: 2301, lettre: 'A', lettre_ar: 'أ', texte: 'كتلة وعزم اندفاع الشاحنة كانا أكبر بكثير ففرضا مسار الاصطدام على المركبة الخفيفة', estCorrecte: true },
      { id: 2302, lettre: 'B', lettre_ar: 'ب', texte: 'السيارة كانت متوقفة تماماً والشاحنة كانت تسير إلى الخلف', estCorrecte: false },
      { id: 2303, lettre: 'C', lettre_ar: 'ج', texte: 'السائقان فقدا الوعي معاً قبل نقطة التقاطع بـ 500 متر', estCorrecte: false },
      { id: 2304, lettre: 'D', lettre_ar: 'د', texte: 'الاصطدام وقع من الجهة الخلفية للشاحنة وليس الجانبية', estCorrecte: false }
    ]
  },
  {
    id: 24,
    code: 'Q-OBS-024',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'OBSERVATION',
    texte: 'خلال مراقبة محيط منشأة حيوية، أي من السلوكيات التالية يعتبر مؤشراً يقظاً يستدعي الاشتباه والتدقيق الأمني المباشر؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['اليقظة الميدانية', 'الملاحظة الاستباقية'],
    specialites_ponderation: [
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.0 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'التوقف المتكرر في زوايا الرؤية الميتة وتدوين مواقع الكاميرات هو نمط استطلاع ورصد تحضيري للأعمال العدائية، وهو مؤشر تهديد يستوجب الفحص الفوري.',
    options: [
      { id: 2401, lettre: 'A', lettre_ar: 'أ', texte: 'شخص يسأل الحارس عن توقيت فتح مكتب استقبال المرتفقين', estCorrecte: false },
      { id: 2402, lettre: 'B', lettre_ar: 'ب', texte: 'مركبة تدور عدة مرات ببطء وتلتقط صوراً لكاميرات المراقبة ونقاط الحراسة', estCorrecte: true },
      { id: 2403, lettre: 'C', lettre_ar: 'ج', texte: 'موظف يرتدي بذلة العمل ويحمل شارة مهنية واضحة متجهاً للمدخل الرئيسي', estCorrecte: false },
      { id: 2404, lettre: 'D', lettre_ar: 'د', texte: 'عامل توصيل بضائع يتصل بالزبون لاستلام الطرد', estCorrecte: false }
    ]
  },
  {
    id: 25,
    code: 'Q-OBS-025',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'OBSERVATION',
    texte: 'عند فحص صفيحة ترقيم شاحنة نقل دولي، لاحظ الدركي وجود مسامير تثبيت (Rivets) حديثة جداً تختلف عن بقية أجزاء الصفيحة المتقادمة مع أثر طلاء حديث حول الحواف. ما التفسير الأمني الأقرب؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['ملاحظة التفاصيل الدقيقة', 'مكافحة تهريب وتزوير المركبات'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 }
    ],
    explication: 'استبدال مسامير التثبيت الحديثة على صفيحة متآكلة مع وجود طلاء حديث يدل على احتمال قوي لاستبدال الصفيحة مؤخراً لتضليل أجهزة التتبع أو إخفاء هوية المركبة (مركبة مجهولة/مزورة).',
    options: [
      { id: 2501, lettre: 'A', lettre_ar: 'أ', texte: 'المركبة خضعت لغسيل روتيني بالبخار في محطة الخدمة', estCorrecte: false },
      { id: 2502, lettre: 'B', lettre_ar: 'ب', texte: 'احتمال تزوير أو استبدال صفيحة الترقيم لإخفاء الهوية الحقيقية للشاحنة', estCorrecte: true },
      { id: 2503, lettre: 'C', lettre_ar: 'ج', texte: 'الإطارات الاحتياطية للشاحنة جديدة ولم تستعمل من قبل', estCorrecte: false },
      { id: 2504, lettre: 'D', lettre_ar: 'د', texte: 'السائق يحمل رخصة سياقة من صنف الدرك الملكي حصرياً', estCorrecte: false }
    ]
  },
  {
    id: 26,
    code: 'Q-OBS-026',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'OBSERVATION',
    texte: 'في شريط فيديو لكاميرا مراقبة يوثق عملية سطو، أظهرت الساعة الرقمية المسجلة بالفيديو التوقيت 23:45:10، بينما ساعة الحائط المعلقة في الغرفة كانت تشير إلى 23:30:00 ومؤشر الثواني يتحرك بانتظام. ما الذي يجب على المحقق ملاحظته وتدوينه فوراً؟',
    difficulte: 'صعب',
    difficulte_code: 'DIFFICILE',
    coefficient: 1.5,
    competences: ['التحليل الزمني الجنائي', 'توثيق الأدلة الرقمية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 1.5 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 1.5 }
    ],
    explication: 'يجب رصد وتوثيق فارق التوقيت (Offset) بين جهاز التسجيل الرقمي (DVR) والتوقيت الحقيقي المعياري لتصحيح التسلسل الزمني للأحداث وضمان صحة الحجية القضائية.',
    options: [
      { id: 2601, lettre: 'A', lettre_ar: 'أ', texte: 'إلغاء الفيديو واعتباره دليلاً باطلاً دون أي إجراءات إضافية', estCorrecte: false },
      { id: 2602, lettre: 'B', lettre_ar: 'ب', texte: 'قياس وتوثيق فارق التوقيت بين خادم الكاميرا والتوقيت الواقعي لإعادة ضبط التسلسل الزمني بدقة', estCorrecte: true },
      { id: 2603, lettre: 'C', lettre_ar: 'ج', texte: 'افتراض أن الجريمة ارتكبت في اليوم الموالي بالضرورة', estCorrecte: false },
      { id: 2604, lettre: 'D', lettre_ar: 'د', texte: 'اتهام صانع ساعة الحائط بالتواطؤ مع المشتبه بهم', estCorrecte: false }
    ]
  },
  {
    id: 27,
    code: 'Q-OBS-027',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'OBSERVATION',
    texte: 'أثناء تفتيش نظامي لمركبة مشبوهة، لاحظ الدركي أن الصوت الصادر عن النقر الخفيف على الباب الأيمن مكتوم وثقيل جداً مقارنة بالرنين المجوف الطبيعي للباب الأيسر. ما الاستنتاج العملياتي الأبرز؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['التفتيش الوقائي الفطن', 'التمييز الحسي السمعي'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 1.5 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 1.5 }
    ],
    explication: 'الصوت المكتوم يدل على وجود مادة أو تجويف محشو داخل هيكل الباب (مثل مخبأ مهيأ للممنوعات أو الأسلحة)، مما يفرض فحصاً دقيقاً ومباشراً للبطانة الداخلية.',
    options: [
      { id: 2701, lettre: 'A', lettre_ar: 'أ', texte: 'احتمال وجود تجويف سري أو حشو بمواد ممنوعة داخل هيكل الباب الأيمن', estCorrecte: true },
      { id: 2702, lettre: 'B', lettre_ar: 'ب', texte: 'أن الباب الأيمن مصنوع من الألومنيوم الخفيف جداً', estCorrecte: false },
      { id: 2703, lettre: 'C', lettre_ar: 'ج', texte: 'أن زجاج الباب الأيسر مفتوح جزئياً فقط', estCorrecte: false },
      { id: 2704, lettre: 'D', lettre_ar: 'د', texte: 'أن مكبر الصوت الداخلي للسيارة يعمل بكفاءة عالية', estCorrecte: false }
    ]
  },
  {
    id: 28,
    code: 'Q-OBS-028',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'OBSERVATION',
    texte: 'صرح الشاهد الأول: "رأيت شاحنة حمراء مسرعة تجاوزت الإشارة الحمراء عند الساعة 14:00". بينما صرح الشاهد الثاني في نفس المكان: "سمعت صوت فرملة حادة في حدود الثانية بعد الزوال ونظرت فرأيت شاحنة زرقاء تصطدم بسيارة". ما العنصر المشترك المؤكد بين الشهادتين قبل إجراء التحريات المعمقة؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['مقارنة الشهادات', 'استخلاص الحقائق المشتركة'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 1.5 }
    ],
    explication: 'العنصر المتطابق يقيناً بين الشاهدين هو التوقيت (حوالي الساعة 14:00) ونوع المركبة الكبيرة (شاحنة)، بينما لون الشاحنة وتفاصيل الفعل تباينت وتتطلب دليلاً مادياً فاصلاً.',
    options: [
      { id: 2801, lettre: 'A', lettre_ar: 'أ', texte: 'لون الشاحنة هو البنفسجي المزدوج', estCorrecte: false },
      { id: 2802, lettre: 'B', lettre_ar: 'ب', texte: 'وجود شاحنة في مسرح الحدث في حدود الساعة 14:00', estCorrecte: true },
      { id: 2803, lettre: 'C', lettre_ar: 'ج', texte: 'كلا الشاهدين يقودان نفس نوع السيارة', estCorrecte: false },
      { id: 2804, lettre: 'D', lettre_ar: 'د', texte: 'الإشارة الضوئية كانت مطفأة تماماً طوال اليوم', estCorrecte: false }
    ]
  },
  {
    id: 29,
    code: 'Q-OBS-029',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'OBSERVATION',
    texte: 'عند معاينة نافذة زجاجية مكسورة بمقذوف في مسرح جريمة، لوحظ أن الفوهة المخروطية المتسعة (Cratère) لثقب الزجاج تقع في الواجهة الداخلية للغرفة والفتحة الضيقة في الواجهة الخارجية. من أي اتجاه تم إطلاق المقذوف؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['البالستيك والمقذوفات الجنائية', 'التحليل المادي لكسور الزجاج'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 1.5 }
    ],
    explication: 'في الفيزياء الجنائية لكسور الزجاج، الفوهة المخروطية تتسع دائماً في اتجاه خروج المقذوف (جهة الاندفاع)، مما يعني أن المقذوف اخترق الزجاج من الخارج نحو الداخل.',
    options: [
      { id: 2901, lettre: 'A', lettre_ar: 'أ', texte: 'من داخل الغرفة نحو الخارج', estCorrecte: false },
      { id: 2902, lettre: 'B', lettre_ar: 'ب', texte: 'من خارج الغرفة باتجاه الداخل', estCorrecte: true },
      { id: 2903, lettre: 'C', lettre_ar: 'ج', texte: 'من السقف عمودياً بزاوية 90 درجة', estCorrecte: false },
      { id: 2904, lettre: 'D', lettre_ar: 'د', texte: 'الكسر ناتج عن تغير درجة الحرارة دون أي مقذوف', estCorrecte: false }
    ]
  },
  {
    id: 30,
    code: 'Q-OBS-030',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'OBSERVATION',
    texte: 'أثناء توقيف سائق في نقطة مراقبة ليلية، لاحظ الدركي ارتعاشاً لا إرادياً في اليدين، وتجنباً مستمراً للتواصل البصري، وصعوبة في ابتلاع الريق، رغم برودة الطقس وسلامة وثائق السيارة الظاهرة. ما هو التصرف الاحترافي المبني على هذه الملاحظة السلوكية؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['ملاحظة لغة الجسد', 'إدارة المخاطر في التوقيف'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 1.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'هذه العلامات تشير إلى توتر نفسي حاد وخوف شديد غير متناسب مع تفتيش روتيني، مما يوجب رفع مستوى الحذر الأمني وإجراء فحص وتفتيش معمق للسائق والمركبة.',
    options: [
      { id: 3001, lettre: 'A', lettre_ar: 'أ', texte: 'السماح له بالمرور فوراً لتفادي تضييع وقته', estCorrecte: false },
      { id: 3002, lettre: 'B', lettre_ar: 'ب', texte: 'رفع درجة اليقظة الأمنية وتعميق المراقبة والتفتيش وفق الضوابط القانونية', estCorrecte: true },
      { id: 3003, lettre: 'C', lettre_ar: 'ج', texte: 'مطالبته بتقديم اعتراف فوري بارتكاب جناية قتل', estCorrecte: false },
      { id: 3004, lettre: 'D', lettre_ar: 'د', texte: 'تجاهل السلوك ومصادرة رخصة السياقة بصفة نهائية دون سند قانوني', estCorrecte: false }
    ]
  },
  {
    id: 31,
    code: 'Q-OBS-031',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'OBSERVATION',
    texte: 'في مدار طرقي رئيسي يشهد اختناقاً مرورياً حاداً، لاحظ رئيس دورية الدراجين أن السيارات متوقفة داخل الحلقة الدائرية بينما المنافذ المؤدية للمدار خالية من أي حادث. ما السبب الهيكلي المشاهد للاختناق؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['تحليل حركة السير والجولان', 'التدبير الميداني للازدحام'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.0 }
    ],
    explication: 'السبب الميداني هو عدم احترام أسبقية المرور لليسار ودخول مركبات إضافية عندما يكون المدار ممتلئاً بالفعل، مما يسبب ما يعرف بـ "القفل الذاتي للمدار" (Deadlock).',
    options: [
      { id: 3101, lettre: 'A', lettre_ar: 'أ', texte: 'دخول مركبات إلى المدار دون وجود منفذ خروج متاح مما أدى لانسداد حلقة التدفق', estCorrecte: true },
      { id: 3102, lettre: 'B', lettre_ar: 'ب', texte: 'أن جميع السيارات نفد منها الوقود في نفس اللحظة', estCorrecte: false },
      { id: 3103, lettre: 'C', lettre_ar: 'ج', texte: 'ارتفاع ضغط الهواء في العجلات لجميع المركبات', estCorrecte: false },
      { id: 3104, lettre: 'D', lettre_ar: 'د', texte: 'أن إشارات المرور الخضراء كانت مضاءة في جميع الاتجاهات', estCorrecte: false }
    ]
  },
  {
    id: 32,
    code: 'Q-OBS-032',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'OBSERVATION',
    texte: 'عند استلام كيس أحراز قضائية مغلق بالشمع الأحمر، لاحظ كاتب الضبط أن خيط الربط مقطوع تحت الختم وتم لصقه بالغراء الشفاف بدقة متناهية. ما الإجراء الفوري الواجب اتخاذه وفق قواعد التحري والضبط؟',
    difficulte: 'صعب',
    difficulte_code: 'DIFFICILE',
    coefficient: 1.5,
    competences: ['سلسلة حفظ الأدلة الجنائية', 'حماية الحجية القانونية للأحراز'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'المجال القانوني', poids: 2.0 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 }
    ],
    explication: 'أي مساس بسلامة الحرز يقطع سلسلة الحيازة القانونية (Chain of Custody). يجب رفض الاستلام الشكلي الفوري، وإنجاز محضر معاينة بالخلل، وإشعار النيابة العامة والقائد التسلسلي فوراً.',
    options: [
      { id: 3201, lettre: 'A', lettre_ar: 'أ', texte: 'إعادة إغلاق الكيس بختم جديد وتجاهل الملاحظة لتسريع الإجراءات', estCorrecte: false },
      { id: 3202, lettre: 'B', lettre_ar: 'ب', texte: 'إثبات الواقعة فوراً في محضر رسمي وإشعار النيابة العامة بكسر سلامة الحرز', estCorrecte: true },
      { id: 3203, lettre: 'C', lettre_ar: 'ج', texte: 'رمي الحرز في سلة المهملات لعدم صلاحيته', estCorrecte: false },
      { id: 3204, lettre: 'D', lettre_ar: 'د', texte: 'فتح الكيس وتوزيع محتوياته على باقي الزملاء', estCorrecte: false }
    ]
  },
  {
    id: 33,
    code: 'Q-OBS-033',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'OBSERVATION',
    texte: 'أثناء دراسة خريطة طبوغرافية لتطويق فارين في منطقة جبلية وعرة، لاحظ الضابط وادياً جافاً شديد الانحدار يتصل بنقطة عبور معبدة واحدة تفصل بين قريتين. ما الميزة التكتيكية لهذه الملاحظة؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.25,
    competences: ['التحليل الطبوغرافي التكتيكي', 'التخطيط لعمليات الحصار والتطويق'],
    specialites_ponderation: [
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.5 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.0 }
    ],
    explication: 'تحديد نقطة الاختناق الإجبارية (Choke Point) في التضاريس يتيح وضع نقطة مراقبة وكمين حاكم بأقل عدد ممكن من القوات وتأمين قطع خط انسحاب الفارين بفعالية.',
    options: [
      { id: 3301, lettre: 'A', lettre_ar: 'أ', texte: 'تحديد "نقطة اختناق إجبارية" تتيح إحكام السيطرة والكمين بأقل مجهود عملياتي', estCorrecte: true },
      { id: 3302, lettre: 'B', lettre_ar: 'ب', texte: 'ضرورة استخدام طائرات الهليكوبتر فقط لنقل المياه المعدنية', estCorrecte: false },
      { id: 3303, lettre: 'C', lettre_ar: 'ج', texte: 'أن المنطقة صالحة لسباق الدراجات الهوائية السريعة', estCorrecte: false },
      { id: 3304, lettre: 'D', lettre_ar: 'د', texte: 'أن الوادي لا يمكن دخوله إلا في فصل الصيف', estCorrecte: false }
    ]
  },
  {
    id: 34,
    code: 'Q-OBS-034',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'OBSERVATION',
    texte: 'في تتبع آثار أقدام مشتبه به على رمال رطبة، كانت طبعة مقدمة القدم (الأصابع) عميقة جداً وواضحة بينما طبعة الكعب تكاد تكون غير مرئية مع مسافات متباعدة تزيد عن متر بين الخطوات. إلى ماذا تشير هذه الملاحظة الفنية؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['قص الأثر والتحري الميداني', 'تحليل الآثار البيولوجية والحركية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 }
    ],
    explication: 'عند الجري السريع (العدو)، يرتكز وزن الجسم بالكامل على مقدمة القدم وتتباعد خطوات الساقين، بخلاف المشي الهادئ الذي يترك أثراً متوازناً وعميقاً في الكعب.',
    options: [
      { id: 3401, lettre: 'A', lettre_ar: 'أ', texte: 'الشخص كان يمشي إلى الخلف ببطء وتأنٍّ', estCorrecte: false },
      { id: 3402, lettre: 'B', lettre_ar: 'ب', texte: 'الشخص كان يعدو (يجري) بسرعة عالية أثناء مروره', estCorrecte: true },
      { id: 3403, lettre: 'C', lettre_ar: 'ج', texte: 'الشخص كان يحمل حمولة ثقيلة جداً على ظهره وهو جالس', estCorrecte: false },
      { id: 3404, lettre: 'D', lettre_ar: 'د', texte: 'الأثر يعود لدراجة نارية صغيرة بعجلتين', estCorrecte: false }
    ]
  },
  {
    id: 35,
    code: 'Q-OBS-035',
    categorie: 'التحليل والملاحظة',
    categorie_code: 'OBSERVATION',
    texte: 'خلال البحث عن سيارة متورطة في جنحة فرار، عممت غرفة القيادة مواصفات: "سيارة رمادية رباعية الدفع". أي من التفاصيل المرصودة التالية يقدم أعلى قيمة تمييزية لتأكيد تحديد المركبة المشبوهة وسط عشرات السيارات الرمادية؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الملاحظة التمييزية', 'التعرف السريع على الأهداف'],
    specialites_ponderation: [
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'العلامات الفريدة التالفة أو المعدلة (مثل كسر محدد بالمرآة الجانبية أو ملصق نادر أو صدمة مميزة) تشكل عناصر تمييز قاطعة لا تتكرر في باقي المركبات من نفس الموديل واللون.',
    options: [
      { id: 3501, lettre: 'A', lettre_ar: 'أ', texte: 'أن السيارة تسير على أربع عجلات مطاطية', estCorrecte: false },
      { id: 3502, lettre: 'B', lettre_ar: 'ب', texte: 'وجود كسر مميز في المرآة الجانبية اليسرى مع ملصق فريد على الزجاج الخلفي', estCorrecte: true },
      { id: 3503, lettre: 'C', lettre_ar: 'ج', texte: 'وجود مقود دائري داخل مقصورة القيادة', estCorrecte: false },
      { id: 3504, lettre: 'D', lettre_ar: 'د', texte: 'أن الزجاج الأمامي شفاف ونظيف تماماً', estCorrecte: false }
    ]
  }
];
