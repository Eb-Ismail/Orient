// ==============================================================================
// الفئة 10: المواقف المهنية والانضباط (15 سؤال - من 126 إلى 140)
// ==============================================================================

export const questionsDisciplinePosture = [
  {
    id: 126,
    code: 'Q-DIS-126',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE_SITUATION_PRO',
    texte: 'أثناء قيامك بمراقبة روتينية للمرور، ارتكب سائق ميسور مخالفة جسيمة وتجاوز السرعة القانونية، وعند مطالبته بالوثائق دس خلسة ورقة نقدية من فئة 200 درهم داخل رخصة السياقة قائلاً: "خذ هذا المبلغ واشرب به قهوة ودعني أمر دون تسجيل مخالفة". ما هو الموقف الفوري الواجب اتخاذه؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['النزاهة ومكافحة الرشوة والفساد', 'تحرير محاضر التلبس الجنائي ضد الراشين'],
    specialites_ponderation: [
      { code: 'SPEC-ROUTE', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 }
    ],
    explication: 'محاولة إرشاء موظف عمومي أثناء مزاولة مهامه جريمة رشوة معاقب عليها جنائياً في حالة تلبس؛ يجب الرفض الحازم للمبلغ، حجز الورقة النقدية كدليل إثبات، إشعار النيابة العامة وتوقيف السائق وتحرير محضر بجريمة الرشوة بالإضافة للمخالفة الطرقية.',
    options: [
      { id: 12601, lettre: 'A', lettre_ar: 'أ', texte: 'أخذ المبلغ ووضعه في الجيب والتغاضي عن المخالفة إكراماً له', estCorrecte: false },
      { id: 12602, lettre: 'B', lettre_ar: 'ب', texte: 'الرفض القاطع، حجز المبلغ المالي كحرز إثبات، وتوقيف السائق في حالة تلبس بجريمة محاولة الإرشاء وإشعار النيابة العامة فوراً', estCorrecte: true },
      { id: 12603, lettre: 'C', lettre_ar: 'ج', texte: 'التفاوض معه لطلب مبلغ أكبر كألف درهم', estCorrecte: false },
      { id: 12604, lettre: 'D', lettre_ar: 'د', texte: 'إرجاع المال له والاعتذار له عن إزعاجه في الطريق', estCorrecte: false }
    ]
  },
  {
    id: 127,
    code: 'Q-DIS-127',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE_SITUATION_PRO',
    texte: 'ما هو الموقف القانوني والانضباطي للدركي إذا تلقى أمراً صريحاً من رئيسه المباشر يخالف بوضوح لا لبس فيه القانون الجنائي (مثل أمر بتعذيب متهم أو تزوير محضر رسمي)؟',
    difficulte: 'صعب',
    difficulte_code: 'AVANCE',
    coefficient: 2.0,
    competences: ['حدود الطاعة العسكرية والمشروعية القانونية', 'رفض الأوامر غير المشروعة الصريحة'],
    specialites_ponderation: [
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 2.0 }
    ],
    explication: 'وفق القواعد العسكرية وحقوق الإنسان والقانون الجنائي: الطاعة واجبة للأوامر المشروعة، لكن تجب التفرقة حيث يُلزم المرؤوس برفض تنفيذ أي أمر غير مشروع بوضوح يشكل جناية أو يمس بالكرامة الإنسانية، ولا يعتد بالدفع بأمر الرئيس في جرائم التعذيب.',
    options: [
      { id: 12701, lettre: 'A', lettre_ar: 'أ', texte: 'تنفيذ الأمر غير المشروع فوراً وبحماس لأن الرئيس هو المسؤول وحده', estCorrecte: false },
      { id: 12702, lettre: 'B', lettre_ar: 'ب', texte: 'رفض تنفيذ الأمر غير المشروع الصريح، والتذكير بالقانون، وإشعار القيادة العليا فوراً لأن إطاعة أمر يشكل جريمة لا تعفي من المسؤولية الجنائية', estCorrecte: true },
      { id: 12703, lettre: 'C', lettre_ar: 'ج', texte: 'مساعدة الرئيس في التزوير ثم ابتزازه لاحقاً لطلب ترقية', estCorrecte: false },
      { id: 12704, lettre: 'D', lettre_ar: 'د', texte: 'الهروب من الخدمة العسكرية كلياً والسفر للخارج', estCorrecte: false }
    ]
  },
  {
    id: 128,
    code: 'Q-DIS-128',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE_SITUATION_PRO',
    texte: 'قام دركي خارج أوقات خدمته بنشر صور وفيديوهات على حسابه الشخصي في تطبيق (تيك توك / إنستغرام) يظهر فيها بزيه العسكري الكامل مع سلاحه الوظيفي داخل الثكنة ويؤدي حركات استعراضية لجلب المتابعين. كيف يصنف هذا الفعل انضباطياً؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['واجب التحفظ العسكري (Devoir de réserve)', 'ضوابط استخدام منصات التواصل الاجتماعي'],
    specialites_ponderation: [
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 2.0 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.0 },
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 1.5 }
    ],
    explication: 'هذا الفعل يشكل خرقاً جسيماً لواجب التحفظ والانضباط العسكري وإفشاء لمعالم منشأة أمنية، ويعاقب عليه تأديبياً بعقوبات صارمة قد تصل للتوقيف أو الإحالة على المجلس التأديبي.',
    options: [
      { id: 12801, lettre: 'A', lettre_ar: 'أ', texte: 'تصرف حديث ومستحب يعزز صورة المؤسسة العسكرية في الفن والترفيه', estCorrecte: false },
      { id: 12802, lettre: 'B', lettre_ar: 'ب', texte: 'إخلال جسيم بواجب التحفظ والسر المهني العسكري واستغلال غير مصرح به للزي والسلاح، يستوجب المتابعة التأديبية الصارمة', estCorrecte: true },
      { id: 12803, lettre: 'C', lettre_ar: 'ج', texte: 'نشاط تجاري مسموح به إذا حصل على أكثر من مليون إعجاب', estCorrecte: false },
      { id: 12804, lettre: 'D', lettre_ar: 'د', texte: 'مبادرة شخصية يستحق عليها منحة تشجيعية مالية', estCorrecte: false }
    ]
  },
  {
    id: 129,
    code: 'Q-DIS-129',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE_SITUATION_PRO',
    texte: 'أثناء شجار عائلي أو نزاع مدني بين جيران في الحي الذي يسكن فيه الدركي خارج أوقات العمل، طلب منه أحد أقاربه التدخل بصفته الدركية للضغط على الطرف الآخر وترهيبه. ما هو السلوك الأخلاقي والمهني السليم؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الحياد والنزاهة وتفادي تضارب المصالح', 'حظر استغلال الصفة والنفوذ الوظيفي'],
    specialites_ponderation: [
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 },
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 1.5 }
    ],
    explication: 'استغلال الصفة الرسمية أو النفوذ العسكري لصالح مصالح شخصية أو قرابات عائلية ممنوع منعاً كلياً؛ يجب الالتزام بالحياد التام وتوجيه النزاع عبر القنوات القانونية المعتمدة لدى مركز الدرك المختص ترابياً.',
    options: [
      { id: 12901, lettre: 'A', lettre_ar: 'أ', texte: 'ارتداء الزي العسكري والذهاب لتهديد الطرف الآخر بالحبس لنصرة قريبه', estCorrecte: false },
      { id: 12902, lettre: 'B', lettre_ar: 'ب', texte: 'رفض استغلال الصفة الوظيفية تماماً، والالتزام بالحياد التام وتوجيه النزاع للمصالح المختصة قانونياً كأي مواطن عادي', estCorrecte: true },
      { id: 12903, lettre: 'C', lettre_ar: 'ج', texte: 'حجز سيارة الجيران كعقاب لهم دون أي مسطرة قضائية', estCorrecte: false },
      { id: 12904, lettre: 'D', lettre_ar: 'د', texte: 'إغلاق الشارع بسيارة الخدمة لحسم الخلاف لصالحه', estCorrecte: false }
    ]
  },
  {
    id: 130,
    code: 'Q-DIS-130',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE_SITUATION_PRO',
    texte: 'عند التعامل مع موقوف تحت الحراسة النظرية يستفز عناصر الدورية بكلمات نابية وسوقية، ما هي الحدود الأخلاقية والمهنية لاستخدام القوة والتعامل مع هذا الموقوف؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['ضبط النفس والتحكم الانفعالي', 'حظر المعاملة القاسية والمهينة للموقوفين'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'القانون يحظر استخدام أي عنف جسدي أو لفظي أو تعذيب ضد موقوف؛ يجب ضبط النفس الثابت، تصفيده إن شكل خطراً، وتدوين سبابه وإهانته لموظف أثناء أداء مهامه بمحضر قضائي مستقل لإحالته على العدالة.',
    options: [
      { id: 1301, lettre: 'A', lettre_ar: 'أ', texte: 'الانهيال عليه بالضرب المبرح لتأديبه وإجباره على الاحترام', estCorrecte: false },
      { id: 1302, lettre: 'B', lettre_ar: 'ب', texte: 'التحلي بأعلى درجات ضبط النفس، الامتناع التام عن أي عنف جسدي أو معنوي، وتوثيق واقعة الإهانة بمحضر قضائي مستقل', estCorrecte: true },
      { id: 1303, lettre: 'C', lettre_ar: 'ج', texte: 'حرمانه من مياه الشرب والطعام لثلاثة أيام متتالية كعقوبة', estCorrecte: false },
      { id: 1304, lettre: 'D', lettre_ar: 'د', texte: 'مبادلته نفس الألفاظ النابية بصوت أعلى أمام زملائه', estCorrecte: false }
    ]
  },
  {
    id: 131,
    code: 'Q-DIS-131',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE_SITUATION_PRO',
    texte: 'ما هي الأهمية الانضباطية لأداء "التحية العسكرية" النظامية (Salut militaire) بين الرتب المختلفة داخل مؤسسة الدرك الملكي؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['التقاليد والأعراف العسكرية الأصيلة', 'احترام التراتبية وتجسيد وحدة القوات'],
    specialites_ponderation: [
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.5 },
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'التحية العسكرية ليست مجرد حركة ميكانيكية، بل هي تعبير أصيل عن الاحترام المتبادل، والولاء للمؤسسة العسكرية، ورمز للخضوع للواجب الوطني وروح الانضباط والتراتبية الهرمية.',
    options: [
      { id: 13101, lettre: 'A', lettre_ar: 'أ', texte: 'حركة اختيارية يمكن الاستغناء عنها إذا كان الجو حاراً', estCorrecte: false },
      { id: 13102, lettre: 'B', lettre_ar: 'ب', texte: 'واجب انضباطي مقدس يعكس الاحترام المتبادل، والاعتراف بالرتبة، وتماسك السلم الهرمي للمؤسسة العسكرية', estCorrecte: true },
      { id: 13103, lettre: 'C', lettre_ar: 'ج', texte: 'تؤدى فقط عند وجود كاميرات تصوير تلفزيونية', estCorrecte: false },
      { id: 13104, lettre: 'D', lettre_ar: 'د', texte: 'تقتصر فقط على الضباط الكبار دون ضباط الصف والجنود', estCorrecte: false }
    ]
  },
  {
    id: 132,
    code: 'Q-DIS-132',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE_SITUATION_PRO',
    texte: 'أثناء حضورك مجلساً خاصاً مع أصدقاء مدنيين، دار الحديث حول تفاصيل عملية نوعية نفذتها فرقة الدرك الملكي مؤخراً ولم تنشر في وسائل الإعلام. حاول الأصدقاء استدراجك لكشف تفاصيل وخطة التدخل. كيف تتصرف التزاماً بـ "السر المهني"؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['الحفاظ على أسرار الدفاع والسر المهني', 'الحصانة ضد الاستدراج الكلامي'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 },
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 2.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 }
    ],
    explication: 'السر المهني والأمني التزام أخلاقي وقانوني يرافق الدركي مدى الحياة؛ يحظر إفشاء أي تفاصيل عملياتية خارج إطار الخدمة، ويجب تحويل مجرى الحديث بلباقة وحزم مع التأكيد على سرية المهام.',
    options: [
      { id: 13201, lettre: 'A', lettre_ar: 'أ', texte: 'كشف كل أسماء المشاركين والخطط التكتيكية لإبهار الحاضرين', estCorrecte: false },
      { id: 13202, lettre: 'B', lettre_ar: 'ب', texte: 'الالتزام التام بالصمت والسر المهني، والرفض الحازم واللبق للإفصاح عن أي معطيات عملياتية، وتغيير موضوع النقاش', estCorrecte: true },
      { id: 13203, lettre: 'C', lettre_ar: 'ج', texte: 'تسريب صور العملية للمجموعة عبر تطبيق واتساب', estCorrecte: false },
      { id: 13204, lettre: 'D', lettre_ar: 'د', texte: 'إعطاؤهم تفاصيل خاطئة لبيعها لاحقاً لجريدة محلية', estCorrecte: false }
    ]
  },
  {
    id: 133,
    code: 'Q-DIS-133',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE_SITUATION_PRO',
    texte: 'ما هو المفهوم الحقيقي لـ "روح التضامن والزمالة العسكرية"، وما هو الخط الفاصل الحاسم بين هذا التضامن النبيل وبين "التستر غير المشروع" على أخطاء وجرائم الزملاء؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['الأخلاقيات المهنية العسكرية', 'التمييز بين التآزر الإيجابي والتواطؤ السلبي'],
    specialites_ponderation: [
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 }
    ],
    explication: 'التضامن العسكري الحقيقي هو المساندة في الميدان لإنقاذ الأرواح وإنجاح المهام؛ أما التستر على خيانة الأمانة أو الفساد أو الجرائم فيعتبر تواطؤاً ومشاركة جنائية تضر بشرف المؤسسة العسكرية ككل.',
    options: [
      { id: 13301, lettre: 'A', lettre_ar: 'أ', texte: 'التضامن يفرض الكذب وحماية الزميل حتى لو ارتكب جريمة قتل أو رشوة', estCorrecte: false },
      { id: 13302, lettre: 'B', lettre_ar: 'ب', texte: 'التضامن واجب في التضحية والمساندة الميدانية وإنجاح المهمة، لكنه ينتهي تماماً عند مخالفة القانون؛ والتستر على الجرائم تواطؤ وخيانة للشرف العسكري', estCorrecte: true },
      { id: 13303, lettre: 'C', lettre_ar: 'ج', texte: 'لا يوجد أي تضامن في الجيش وكل فرد يعمل لنفسه فقط', estCorrecte: false },
      { id: 13304, lettre: 'D', lettre_ar: 'د', texte: 'إبلاغ الصحافة قبل إبلاغ القيادة عند حدوث أي خطأ بسيط', estCorrecte: false }
    ]
  },
  {
    id: 134,
    code: 'Q-DIS-134',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE_SITUATION_PRO',
    texte: 'في سياق المحافظة على الجاهزية العملياتية الدائمة، ما هي التزامات الدركي فيما يخص الحفاظ على اللياقة البدنية والوزن المثالي والهندام العسكري في الحياة اليومية؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الجاهزية البدنية المستمرة', 'الانضباط المظهري والهندام العسكري'],
    specialites_ponderation: [
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.5 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 2.0 }
    ],
    explication: 'الحفاظ على لياقة بدنية ممتازة ووزن متناسق ونظافة الهندام العسكري واجب عسكري مستمر يعكس هيبة الدولة واستعداد الفرد للاستجابة الفورية للمهام الميدانية الشاقة في أي وقت.',
    options: [
      { id: 13401, lettre: 'A', lettre_ar: 'أ', texte: 'اللياقة البدنية مطلوبة فقط في أول شهر من التجنيد ثم تهمل تماماً', estCorrecte: false },
      { id: 13402, lettre: 'B', lettre_ar: 'ب', texte: 'واجب دائم ومستمر لضمان القدرة على التدخل الميداني والحفاظ على الهيبة العسكرية والوقار المؤسساتي', estCorrecte: true },
      { id: 13403, lettre: 'C', lettre_ar: 'ج', texte: 'ارتداء ملابس عسكرية ممزقة لإظهار الشجاعة في المعارك', estCorrecte: false },
      { id: 13404, lettre: 'D', lettre_ar: 'د', texte: 'إعفاء الدراجين وعناصر التدخل من أي نشاط رياضي', estCorrecte: false }
    ]
  },
  {
    id: 135,
    code: 'Q-DIS-135',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE_SITUATION_PRO',
    texte: 'تلقى دركي دعوة مجانية لحضور مأدبة عشاء خاصة ينظمها رجل أعمال محلي في منطقته تحوم حوله شبهات مالية غير مؤكدة، مع وعد بمساعدته في تسهيل معاملات عائلية. ما هو التصرف الانضباطي الوقائي الواجب؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['الوقاية من تضارب المصالح والشبهات', 'صيانة السمعة والكرامة المهنية'],
    specialites_ponderation: [
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.0 },
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 1.5 }
    ],
    explication: 'الابتعاد عن مواطن الشبهات وقبول الهدايا أو الولائم من أطراف ذات مصالح محلية أمر أساسي لحماية استقلالية وسمعة الدركي والمؤسسة من الابتزاز أو التبعية.',
    options: [
      { id: 13501, lettre: 'A', lettre_ar: 'أ', texte: 'قبول الدعوة فالمجان فرصة جيدة للتوفير وتناول الطعام الفاخر', estCorrecte: false },
      { id: 13502, lettre: 'B', lettre_ar: 'ب', texte: 'الاعتذار بحزم ولباقة عن تلبية الدعوة درءاً للشبهات وحفاظاً على استقلالية الوظيفة وتجنب أي ضغط أو شبهة مستقبلية', estCorrecte: true },
      { id: 13503, lettre: 'C', lettre_ar: 'ج', texte: 'أخذ سيارة الدورية لنقل العائلة للمأدبة', estCorrecte: false },
      { id: 13504, lettre: 'D', lettre_ar: 'د', texte: 'طلب نصيبه من الطعام معلباً لإرساله لمنزله', estCorrecte: false }
    ]
  },
  {
    id: 136,
    code: 'Q-DIS-136',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE_SITUATION_PRO',
    texte: 'أثناء فترة الانتخابات التشريعية أو الجماعية، ما هو الموقف الدستوري والانضباطي الصارم المفروض على عناصر الدرك الملكي فيما يتعلق بالأنشطة السياسية والحملات الحزبية؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الحياد السياسي التام للمؤسسة العسكرية والأمنية', 'الالتزام الدستوري الصارم'],
    specialites_ponderation: [
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.5 },
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 2.0 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 }
    ],
    explication: 'القانون والدستور يفرضان على أفراد القوات المسلحة الملكية والدرك الملكي الحياد السياسي المطلق؛ ويحظر عليهم الانتماء للأحزاب، المشاركة في الحملات، أو إبداء أي رأي أو مساندة سياسية لضمان تجرد المرفق العام.',
    options: [
      { id: 13601, lettre: 'A', lettre_ar: 'أ', texte: 'توزيع المنشورات الدعائية للمرشح المفضل داخل الثكنة', estCorrecte: false },
      { id: 13602, lettre: 'B', lettre_ar: 'ب', texte: 'الحياد التام والمطلق، وحظر أي انخراط أو نشاط حزبي أو إبداء لميول سياسية لضمان تجرد وهيبة المرفق الأمني', estCorrecte: true },
      { id: 13603, lettre: 'C', lettre_ar: 'ج', texte: 'الترشح للانتخابات أثناء فترة الخدمة العسكرية النشطة', estCorrecte: false },
      { id: 13604, lettre: 'D', lettre_ar: 'د', texte: 'إجبار المواطنين في السدود القضائية على التصويت لمرشح معين', estCorrecte: false }
    ]
  },
  {
    id: 137,
    code: 'Q-DIS-137',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE_SITUATION_PRO',
    texte: 'في حال وقوع خطأ إجرائي غير مقصود من الدركي أثناء إنجاز مهمة (مثل ضياع وثيقة غير سرية أو خدش سيارة الدورية أثناء المناورة)، ما هو التصرف الشجاع والمسؤول وفق مبادئ الشرف العسكري؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الشجاعة الأدبية وتحمل المسؤولية', 'الصدق والشفافية مع القيادة'],
    specialites_ponderation: [
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-MOTARD', specialite: 'الدراجات النارية / السلامة الطرقية', poids: 1.5 }
    ],
    explication: 'الشرف العسكري والشجاعة الأدبية تقتضي الإقرار الفوري بالخطأ أمام الرئيس المباشر، وتقديم تقرير صادق ودقيق لتحمل المسؤولية وتصحيح العواقب مبكراً، خلافاً للكذب أو التستر الذي يضاعف الخطأ.',
    options: [
      { id: 13701, lettre: 'A', lettre_ar: 'أ', texte: 'الكذب واتهام زميل بريء بالواقعة للهروب من العقاب', estCorrecte: false },
      { id: 13702, lettre: 'B', lettre_ar: 'ب', texte: 'التحلي بالشجاعة الأدبية، وإشعار الرئيس المباشر فوراً بصدق وشفافية، وتحمل المسؤولية بروح الانضباط العسكري', estCorrecte: true },
      { id: 13703, lettre: 'C', lettre_ar: 'ج', texte: 'إخفاء السيارة في غابة بعيدة لتفادي اكتشاف الخدش', estCorrecte: false },
      { id: 13704, lettre: 'D', lettre_ar: 'د', texte: 'البكاء وطلب وساطة من الأقارب للضغط على القائد', estCorrecte: false }
    ]
  },
  {
    id: 138,
    code: 'Q-DIS-138',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE_SITUATION_PRO',
    texte: 'أثناء استراحة داخل مطعم عمومي بالزي الرسمي، لاحظت مواطنين يناقشون بصوت عالٍ قضايا تثير الاستفزاز وينتقدون عمل الأجهزة الأمنية بحدة. ما هو الموقف الرصين الذي يجسده الوقار العسكري؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['الرزانة والوقار في الفضاء العام', 'تفادي الاستفزازات الشعبية غير المبررة'],
    specialites_ponderation: [
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 2.0 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'الدركي بالزي العسكري يمثل هيبة الدولة؛ يجب أن يتحلى بأعلى درجات الرزانة والهدوء وتجاهل الأحاديث الجانبية العابرة وعدم الانزلاق في جدالات عقيمة أو مشاحنات تمس بصورة الزي العسكري ما لم يكن هناك خرق مباشر للقانون.',
    options: [
      { id: 13801, lettre: 'A', lettre_ar: 'أ', texte: 'الوقوف وقلب طاولات المطعم وتهديد الحاضرين بالسلاح', estCorrecte: false },
      { id: 13802, lettre: 'B', lettre_ar: 'ب', texte: 'التحلي بالرزانة والهدوء والوقار، وعدم الانجرار إلى أي جدال عقيم أو ردود انفعالية تسيء لهيبة الزي الرسمي', estCorrecte: true },
      { id: 13803, lettre: 'C', lettre_ar: 'ج', texte: 'التصفيق لهم ومشاركتهم في انتقاد زملائه وضباطه', estCorrecte: false },
      { id: 13804, lettre: 'D', lettre_ar: 'د', texte: 'توقيف صاحب المطعم وإغلاق محله فوراً بدون سند قانوني', estCorrecte: false }
    ]
  },
  {
    id: 139,
    code: 'Q-DIS-139',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE_SITUATION_PRO',
    texte: 'ما هي القاعدة الانضباطية الملزمة عند استخدام وحمل السلاح الفردي الوظيفي أثناء التواجد خارج الخدمة الرسمية أو في فترات الرخص والتنقلات الشخصية؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['الانضباط في حمل وحفظ السلاح الفردي', 'السلامة الصارمة للأسلحة والذخيرة'],
    specialites_ponderation: [
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.5 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.5 },
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 1.5 }
    ],
    explication: 'تفرض القوانين العسكرية إيداع السلاح والذخيرة في مخزن أسلحة الوحدة (Armurerie) قبل الخروج في رخصة أو عطلة، ما لم تكن هناك تعليمات عملياتية رسمية واستثنائية مكتوبة تحدد ضوابط الحمل والحراسة الشخصية الآمنة.',
    options: [
      { id: 13901, lettre: 'A', lettre_ar: 'أ', texte: 'ترك السلاح في درج السيارة أو تحت وسادة الفندق دون حراسة', estCorrecte: false },
      { id: 13902, lettre: 'B', lettre_ar: 'ب', texte: 'إيداع السلاح والذخيرة بمستودع أسلحة الوحدة طبقاً للتعليمات، والامتناع عن حمله في العطل الشخصية إلا بترخيص عملياتي خاص ومعلل', estCorrecte: true },
      { id: 13903, lettre: 'C', lettre_ar: 'ج', texte: 'إعارة السلاح للأصدقاء للرماية في رحلة صيد برية', estCorrecte: false },
      { id: 13904, lettre: 'D', lettre_ar: 'د', texte: 'حمل السلاح في الحفلات الخاصة للتباهي أمام الأقارب', estCorrecte: false }
    ]
  },
  {
    id: 140,
    code: 'Q-DIS-140',
    categorie: 'المواقف المهنية والانضباط',
    categorie_code: 'DISCIPLINE_SITUATION_PRO',
    texte: 'في ختام فترة التدريب الأساسي والاستعداد لأداء القسم والالتحاق بالميدان، ما هي القيمة العسكرية والأخلاقية العليا التي تلخص شرف الجندية والانتماء لمؤسسة الدرك الملكي؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الوفاء لشعار المملكة والواجب الوطني', 'العقيدة العسكرية وروح التضحية والفداء'],
    specialites_ponderation: [
      { code: 'SPEC-FORMATION', specialite: 'التكوين والتعليم', poids: 2.5 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 }
    ],
    explication: 'الإخلاص المطلق للشعار الخالد للمملكة "الله - الوطن - الملك"، والوفاء لروح القسم العسكري في حماية الوطن والمواطنين وسيادة القانون والتضحية ونكران الذات هي جوهر الشرف والرسالة النبيلة للدرك الملكي.',
    options: [
      { id: 14001, lettre: 'A', lettre_ar: 'أ', texte: 'السعي وراء المصالح المادية الشخصية فقط وتفادي أي مهمة صعبة', estCorrecte: false },
      { id: 14002, lettre: 'B', lettre_ar: 'ب', texte: 'الإخلاص المطلق للشعار الخالد "الله - الوطن - الملك"، والوفاء لروح القسم في خدمة العدالة وحماية الوطن والمواطنين بتفانٍ وشرف ونكران ذات', estCorrecte: true },
      { id: 14003, lettre: 'C', lettre_ar: 'ج', texte: 'تفضيل الراحة الشخصية والغياب المتكرر عن الواجب', estCorrecte: false },
      { id: 14004, lettre: 'D', lettre_ar: 'د', texte: 'اعتبار الوظيفة مجرد وسيلة للنفوذ والسلطة على الناس', estCorrecte: false }
    ]
  }
];
