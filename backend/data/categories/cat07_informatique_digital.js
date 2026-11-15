// ==============================================================================
// الفئة 7: المعلوماتية والمهارات الرقمية (15 سؤال - من 96 إلى 110)
// ==============================================================================

export const questionsInformatiqueDigital = [
  {
    id: 96,
    code: 'Q-INF-096',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE_DIGITAL',
    texte: 'عند التعامل مع قرص صلب (Disque dur) تم حجزه لدى مشتبه به في جريمة سيبرانية، ما هو الإجراء التقني الجنائي الإلزامي لضمان عدم المساس بالبيانات الأصلية أثناء الفحص والتحليل؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['التحقيق الجنائي الرقمي (Digital Forensics)', 'حماية سلامة الأدلة الإلكترونية'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 1.5 }
    ],
    explication: 'يجب استخدام جهاز حظر الكتابة (Write Blocker) لإنشاء نسخة مطابقة بت-بت (Copie bit-à-bit / Image disque) والعمل فقط على النسخة مع حساب ومطابقة بصمة الهاش الرقمية (Hash SHA-256) لإثبات سلامة الدليل أمام المحكمة.',
    options: [
      { id: 9601, lettre: 'A', lettre_ar: 'أ', texte: 'توصيل القرص مباشرة بحاسوب المكتب وفتح الملفات لتصفحها سريعاً بالماوس', estCorrecte: false },
      { id: 9602, lettre: 'B', lettre_ar: 'ب', texte: 'استخدام جهاز مانع الكتابة (Write Blocker) وأخذ نسخة مرآتية مطابقة (Bit-by-bit image) والعمل على النسخة فقط مع حساب بصمة الهاش (Hash)', estCorrecte: true },
      { id: 9603, lettre: 'C', lettre_ar: 'ج', texte: 'إعادة تهيئة القرص (Formater) لتنظيفه من الفيروسات قبل فتحه', estCorrecte: false },
      { id: 9604, lettre: 'D', lettre_ar: 'د', texte: 'مسح القرص بمغناطيس قوي لتحسين سرعة القراءة', estCorrecte: false }
    ]
  },
  {
    id: 97,
    code: 'Q-INF-097',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE_DIGITAL',
    texte: 'تلقيت رسالة بريد إلكتروني على حاسوب الخدمة تبدو ظاهرياً أنها مرسلة من "إدارة القيادة المركزية" تطلب منك النقر العاجل على رابط لتحديث كلمة المرور لتفادي إغلاق حسابك خلال ساعتين. عند فحص عنوان المرسل الحقيقي، وجدت: (admin@commandement-gendarmerie-support.xyz). ما نوع هذا التهديد الأمني؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['الأمن السيبراني واليقظة الرقمية', 'كشف هجمات التصيد الاحتيالي (Phishing)'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.5 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.0 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 1.5 }
    ],
    explication: 'هذا هجوم تصيد احتيالي وهندسة اجتماعية (Phishing) يستغل اسم القيادة ونطاقاً وهمياً (.xyz) وعامل الاستعجال النفسي لسرقة بيانات الاعتماد. يجب عدم النقر وإبلاغ خلية أمن النظم فوراً.',
    options: [
      { id: 9701, lettre: 'A', lettre_ar: 'أ', texte: 'رسالة رسمية عادية ويجب النقر وإدخال كلمة المرور فوراً لتفادي العقوبة', estCorrecte: false },
      { id: 9702, lettre: 'B', lettre_ar: 'ب', texte: 'هجوم تصيد احتيالي خطير (Phishing) لانتحال صفة رسمية وسرقة بيانات الدخول، يستوجب الحظر والتبليغ الفوري', estCorrecte: true },
      { id: 9703, lettre: 'C', lettre_ar: 'ج', texte: 'تحديث برمجي مجاني صادر من شركة مايكروسوفت', estCorrecte: false },
      { id: 9704, lettre: 'D', lettre_ar: 'د', texte: 'تهنئة رسمية بمناسبة الترقية في الرتبة', estCorrecte: false }
    ]
  },
  {
    id: 98,
    code: 'Q-INF-098',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE_DIGITAL',
    texte: 'ما هي الوظيفة الأمنية الحيوية لقيمة التجزئة أو البصمة الرقمية (Hash Value مثل SHA-256) للملفات الرقمية المحجوزة في القضايا الجنائية؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['التشفير وسلامة الأدلة الإلكترونية', 'التحقق الرياضي من تكامل المعطيات'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 2.0 }
    ],
    explication: 'دالة الهاش تولد بصمة رقمية فريدة وثابتة للملف؛ أي تغيير طفيف في حرف واحد أو بت واحد يغير قيمة الهاش جذرياً، مما يثبت مادياً أمام المحكمة أن الدليل لم يتعرض لأي تعديل أو تلاعب منذ لحظة الحجز.',
    options: [
      { id: 9801, lettre: 'A', lettre_ar: 'أ', texte: 'تسريع سرعة تحميل الملف من الإنترنت فقط', estCorrecte: false },
      { id: 9802, lettre: 'B', lettre_ar: 'ب', texte: 'إثبات سلامة الدليل وتكامل محتواه (Intégrité) وعدم تعرضه لأي تغيير أو تلاعب منذ رفعه', estCorrecte: true },
      { id: 9803, lettre: 'C', lettre_ar: 'ج', texte: 'ترجمة الملف من لغة أجنبية إلى اللغة العربية', estCorrecte: false },
      { id: 9804, lettre: 'D', lettre_ar: 'د', texte: 'حذف الفيروسات تلقائياً من نظام التشغيل', estCorrecte: false }
    ]
  },
  {
    id: 99,
    code: 'Q-INF-099',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE_DIGITAL',
    texte: 'في شبكات الاتصال التكتيكية الرقمية المعتمدة لدى فرق الدرك الملكي (مثل معيار TETRA أو APCO P25)، ما هي الميزة الأمنية الرئيسية التي تميزها عن شبكات الاتصال التناظرية التقليدية القديمة؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['شبكات الاتصال اللاسلكي التكتيكي', 'التشفير وحماية البث العسكري'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-GSI', specialite: 'GSI', poids: 2.0 }
    ],
    explication: 'توفر الشبكات الرقمية التكتيكية التشفير القوي المتقدم (Chiffrement AES)، النقاء الصوتي، إمكانية نقل البيانات الجغرافية (GPS)، ونداءات الطوارئ والمجموعات المغلقة لمنع أي تنصت خارجي من أجهزة الراديو المدنية.',
    options: [
      { id: 9901, lettre: 'A', lettre_ar: 'أ', texte: 'إمكانية الاستماع إليها بواسطة أي راديو سيارة مدني مفتوح', estCorrecte: false },
      { id: 9902, lettre: 'B', lettre_ar: 'ب', texte: 'التشفير الرقمي القوي المقاوم للتنصت، وتحديد المواقع الجغرافية وإدارة قنوات التدخل التكتيكي المشفرة', estCorrecte: true },
      { id: 9903, lettre: 'C', lettre_ar: 'ج', texte: 'استهلاك طاقة بطارية أعلى بمئة مرة دون أي فائدة أمنية', estCorrecte: false },
      { id: 9904, lettre: 'D', lettre_ar: 'د', texte: 'العمل فقط في الأماكن المغلقة تحت الأرض دون إرسال خارجي', estCorrecte: false }
    ]
  },
  {
    id: 100,
    code: 'Q-INF-100',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE_DIGITAL',
    texte: 'عند فحص صورة رقمية ملتقطة بهاتف ذكي عثر عليه في مخبأ، ما هو المصطلح التقني للبيانات الوصفية المضمنة بالملف (EXIF Data) والتي يمكن أن تكشف إحداثيات GPS الدقيقة وتاريخ وساعة التقاط الصورة ونوع الكاميرا؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['تحليل البيانات الوصفية (Metadata / EXIF)', 'الاستعلام الجنائي الرقمي'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.5 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 1.5 }
    ],
    explication: 'بيانات EXIF (Exchangeable Image File Format) هي بيانات وصفية تقنية مخبأة داخل ملف الصورة تسجل معايير الكاميرا، وساعة التقاطها، وإحداثيات الموقع الجغرافي (Géolocalisation)، مما يجعلها كنزاً استخباراتياً وقضائياً ثميناً.',
    options: [
      { id: 10001, lettre: 'A', lettre_ar: 'أ', texte: 'بيانات الطقس الخارجي فقط', estCorrecte: false },
      { id: 10002, lettre: 'B', lettre_ar: 'ب', texte: 'البيانات الوصفية EXIF (المعلومات التقنية، الطابع الزمني، وإحداثيات الموقع الجغرافي الدقيق)', estCorrecte: true },
      { id: 10003, lettre: 'C', lettre_ar: 'ج', texte: 'اسم بائع كابل الشاحن الكهربائي', estCorrecte: false },
      { id: 10004, lettre: 'D', lettre_ar: 'د', texte: 'رمز باركود المحل الذي بيع منه الهاتف', estCorrecte: false }
    ]
  },
  {
    id: 101,
    code: 'Q-INF-101',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE_DIGITAL',
    texte: 'ما هو المبدأ الأمني الأساسي لتطبيق "المصادقة المتعددة العوامل" (Multi-Factor Authentication - MFA / 2FA) للولوج إلى المنظومات والبيانات العسكرية الحساسة؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['التحكم في الوصول وإدارة الهويات الرقمية', 'الأمن الدفاعي لمنظومات المعلومات'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.5 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.0 }
    ],
    explication: 'تعتمد المصادقة الثنائية على التحقق عبر عاملين مختلفين على الأقل من الفئات الثلاث: شيء تعرفه (كلمة المرور)، شيء تملكه (بطاقة ذكية أو رمز أمان)، أو شيء فيك (بصمة حيوية بيومترية).',
    options: [
      { id: 10101, lettre: 'A', lettre_ar: 'أ', texte: 'كتابة كلمة المرور على ورقة لاصقة وتثبيتها فوق الشاشة لتسهيل التذكر', estCorrecte: false },
      { id: 10102, lettre: 'B', lettre_ar: 'ب', texte: 'طلب التحقق عبر عنصرين مختلفين على الأقل (مثل كلمة المرور مع بطاقة ذكية أو رمز أمان مؤقت أو بصمة بيومترية)', estCorrecte: true },
      { id: 10103, lettre: 'C', lettre_ar: 'ج', texte: 'مشاركة كلمة المرور مع جميع أفراد الدورية بالتساوي', estCorrecte: false },
      { id: 10104, lettre: 'D', lettre_ar: 'د', texte: 'تغيير كلمة المرور إلى "123456" لتسهيل الدخول السريع في الطوارئ', estCorrecte: false }
    ]
  },
  {
    id: 102,
    code: 'Q-INF-102',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE_DIGITAL',
    texte: 'في شبكة الحواسيب المحلية (LAN) لمركز الدرك، ما هو عنوان بروتوكول الإنترنت (Adresse IP) الذي يمثل الحلقة المحلية الذاتية (Localhost Loopback) المخصصة لاختبار بطاقة الشبكة الداخلية للجهاز نفسه؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['مفاهيم شبكات TCP/IP', 'تشخيص وتصحيح أعطال الشبكات'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.5 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 }
    ],
    explication: 'العنوان القياسي المحجوز لعنوان الاسترجاع الداخلي واختبار مكدس TCP/IP هو 127.0.0.1 (Loopback address).',
    options: [
      { id: 10201, lettre: 'A', lettre_ar: 'أ', texte: '192.168.1.1', estCorrecte: false },
      { id: 10202, lettre: 'B', lettre_ar: 'ب', texte: '127.0.0.1', estCorrecte: true },
      { id: 10203, lettre: 'C', lettre_ar: 'ج', texte: '255.255.255.255', estCorrecte: false },
      { id: 10204, lettre: 'D', lettre_ar: 'د', texte: '0.0.0.0', estCorrecte: false }
    ]
  },
  {
    id: 103,
    code: 'Q-INF-103',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE_DIGITAL',
    texte: 'عثر أحد عناصر الدورية في مرآب الثكنة على مفتاح ذاكرة فلاشية (Clé USB) حديث ومكتوب عليه بخط اليد "ملفات سرية وهامة". ما هو التصرف الأمني السيبراني السليم والصارم؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['مكافحة هجمات وسائط التخزين المصطادة (USB Dropping)', 'الانضباط الأمني السيبراني'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 1.5 }
    ],
    explication: 'هذا تكتيك كلاسيكي لاختراق الأنظمة يعرف بـ (USB Drop Attack) حيث تزرع برمجيات فدية أو حصان طروادة خبيث. يُمنع منعاً باتاً وصله بأي حاسوب نظامي، ويسلم فوراً لخلية أمن النظم لتحليله في بيئة معزولة (Sandbox).',
    options: [
      { id: 10301, lettre: 'A', lettre_ar: 'أ', texte: 'وصله فوراً بحاسوب قاعة العمليات لمعرفة ما بداخله بدافع الفضول', estCorrecte: false },
      { id: 10302, lettre: 'B', lettre_ar: 'ب', texte: 'الامتناع التام عن وصله بأي جهاز وتسليمه للخلية المعلوماتية المختصة لتحليله في محطة فحص معزولة وآمنة', estCorrecte: true },
      { id: 10303, lettre: 'C', lettre_ar: 'ج', texte: 'أخذه للمنزل لاستخدامه لتخزين الأفلام والصور الشخصية', estCorrecte: false },
      { id: 10304, lettre: 'D', lettre_ar: 'د', texte: 'محاولة فتحه على هواتف الزملاء الذكية بالتوالي', estCorrecte: false }
    ]
  },
  {
    id: 104,
    code: 'Q-INF-104',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE_DIGITAL',
    texte: 'أثناء استخراج الأدلة من تطبيق دردشة مشفرة في هاتف مشتبه به، تم العثور على قاعدة بيانات محلية بصيغة (SQLite / .db) محمية بنسخة احتياطية محلية. ما هي التقنية التي تمكن الخبير من استرجاع الرسائل المحذوفة حديثاً؟',
    difficulte: 'صعب',
    difficulte_code: 'AVANCE',
    coefficient: 2.0,
    competences: ['الاسترجاع الجنائي لقواعد البيانات', 'فحص سجلات التغيير وقوائم السجلات الحرة'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 }
    ],
    explication: 'في قواعد بيانات SQLite، لا تحذف الرسائل فورياً بل تظل مخزنة في صفحات السجلات غير المخصصة (Freelists / WAL Journal) حتى تتم الكتابة فوقها، مما يتيح استرجاعها عبر التحليل الجنائي لسجلات المعاملات.',
    options: [
      { id: 10401, lettre: 'A', lettre_ar: 'أ', texte: 'لا يمكن أبداً استرجاع أي محتوى رقمي حذفه المستخدم نهائياً', estCorrecte: false },
      { id: 10402, lettre: 'B', lettre_ar: 'ب', texte: 'فحص ملفات السجلات اليومية (WAL Journal) والمساحات غير المخصصة (Unallocated space) لقاعدة البيانات لاستخراج النصوص المحذوفة قبل كتابة بيانات جديدة فوقها', estCorrecte: true },
      { id: 10403, lettre: 'C', lettre_ar: 'ج', texte: 'الاتصال بشركة الهاتف لتطلب منهم قراءة شاشة الهاتف صوتياً', estCorrecte: false },
      { id: 10404, lettre: 'D', lettre_ar: 'د', texte: 'تسخين الهاتف في فرن ميكروويف لإظهار الحروف المخفية', estCorrecte: false }
    ]
  },
  {
    id: 105,
    code: 'Q-INF-105',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE_DIGITAL',
    texte: 'ما هو البروتوكول الأمني الشبكي (Network Protocol) المعتمد لربط الحواسيب الميدانية المتنقلة لسيارات الدرك بالخوادم المركزية للقيادة عبر قنوات اتصال مشفرة وآمنة عبر شبكة الإنترنت العامة؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['الشبكات الافتراضية الخاصة والأنفاق المشفرة', 'أمن الربط الميداني'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.5 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 1.5 }
    ],
    explication: 'تعتمد الشبكات العسكرية والأمنية على إنشاء نفق مشفر عبر شبكة خاصة افتراضية (VPN - Virtual Private Network مجهز ببروتوكول IPsec أو WireGuard) لضمان سرية وتكامل البيانات المتبادلة بين الميدان والمركز.',
    options: [
      { id: 10501, lettre: 'A', lettre_ar: 'أ', texte: 'بروتوكول HTTP المفتوح وغير المشفر', estCorrecte: false },
      { id: 10502, lettre: 'B', lettre_ar: 'ب', texte: 'الشبكة الافتراضية الخاصة المشفرة (VPN / IPsec Tunnel) لتأمين نفق اتصالات معزول وسري', estCorrecte: true },
      { id: 10503, lettre: 'C', lettre_ar: 'ج', texte: 'بروتوكول البلوتوث المفتوح للأجهزة المجاورة فقط', estCorrecte: false },
      { id: 10504, lettre: 'D', lettre_ar: 'د', texte: 'استخدام برامج مشاركة الملفات المجانية غير المعتمدة', estCorrecte: false }
    ]
  },
  {
    id: 106,
    code: 'Q-INF-106',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE_DIGITAL',
    texte: 'في مجال الاستخبار والتحري الرقمي مفتوح المصدر (OSINT - Open Source Intelligence)، ما هي الأداة أو التقنية المعتمدة للتحقق مما إذا كانت صورة شخص مشبوه مستخدمة في حسابات أخرى على شبكة الإنترنت أو منسوخة من موقع أجنبي؟',
    difficulte: 'سهل',
    difficulte_code: 'FACILE',
    coefficient: 1.0,
    competences: ['تقنيات الاستخبار مفتوح المصدر (OSINT)', 'البحث العكسي عن الصور والهويات'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 },
      { code: 'SPEC-SCIENTIFIQUE', specialite: 'المجال القانوني', poids: 1.5 }
    ],
    explication: 'تقنية "البحث العكسي عن الصور" (Reverse Image Search) عبر محركات متخصصة تتيح مطابقة بصمات البكسلات وتتبع كافة المواقع والتواريخ التي ظهرت فيها نفس الصورة سابقاً عبر الشبكة العنكبوتية.',
    options: [
      { id: 10601, lettre: 'A', lettre_ar: 'أ', texte: 'إعادة رسم الصورة يدوياً بقلم رصاص وعرضها على الجمهور', estCorrecte: false },
      { id: 10602, lettre: 'B', lettre_ar: 'ب', texte: 'البحث العكسي بالصور (Reverse Image Search) ومطابقة الأنماط البصرية في قواعد البيانات المفتوحة', estCorrecte: true },
      { id: 10603, lettre: 'C', lettre_ar: 'ج', texte: 'تغيير ألوان الصورة وجعلها باللونين الأبيض والأسود فقط', estCorrecte: false },
      { id: 10604, lettre: 'D', lettre_ar: 'د', texte: 'الانتظار حتى يتصل المشتبه به لإرسال رابط حسابه الرسمي', estCorrecte: false }
    ]
  },
  {
    id: 107,
    code: 'Q-INF-107',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE_DIGITAL',
    texte: 'عند حجز منظومة إلكترونية متصلة بالتيار وتعمل بنشاط أثناء مداهمة وكر جريمة منظمة، ما هو الأسلوب الصحيح للتعامل مع الذاكرة العشوائية الحية (RAM) للجهاز قبل إيقاف تشغيله؟',
    difficulte: 'صعب',
    difficulte_code: 'AVANCE',
    coefficient: 2.0,
    competences: ['التحري المباشر على الأنظمة الحية (Live Forensics)', 'حفظ محتوى الذاكرة المؤقتة ومفاتيح التشفير'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 }
    ],
    explication: 'الذاكرة الحية (RAM) متطايرة وتمحى فور انقطاع الكهرباء؛ تحتوي على كلمات المرور النشطة، مفاتيح فك تشفير الأقراص، والاتصالات الجارية. يجب تفريغها وحفظها برمجياً (RAM Capture / Dump) قبل قطع التيار الكهربائي.',
    options: [
      { id: 10701, lettre: 'A', lettre_ar: 'أ', texte: 'نزع قابس الكهرباء مباشرة من الحائط لمسح كل شيء فوراً', estCorrecte: false },
      { id: 10702, lettre: 'B', lettre_ar: 'ب', texte: 'إجراء تفريغ فوري ومباشر للذاكرة الحية (Live RAM Dump) لالتقاط مفاتيح التشفير والجلسات النشطة قبل إطفاء الجهاز', estCorrecte: true },
      { id: 10703, lettre: 'C', lettre_ar: 'ج', texte: 'إعادة تشغيل الجهاز خمس مرات للتأكد من سرعته', estCorrecte: false },
      { id: 10704, lettre: 'D', lettre_ar: 'د', texte: 'رش الشاشة بالماء البارد لمنع ارتفاع الحرارة', estCorrecte: false }
    ]
  },
  {
    id: 108,
    code: 'Q-INF-108',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE_DIGITAL',
    texte: 'ما هو الهدف من تطبيق سياسة "الحد الأدنى من الصلاحيات" (Principle of Least Privilege - PoLP) في منظومات التدبير الأمني والإداري لقواعد بيانات الدرك الملكي؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['إدارة الصلاحيات والأمان الهيكلي', 'منع تسريب البيانات غير المصرح بها'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.5 },
      { code: 'SPEC-SEC-ADMIN', specialite: 'الإدارة والسكرتارية', poids: 2.0 }
    ],
    explication: 'يقتضي هذا المبدأ منح كل مستخدم فقط الحد الأدنى الصارم من الصلاحيات والبيانات التي يحتاجها لأداء واجبه الوظيفي المحدد، وذلك لتقليل الأضرار الناتجة عن أي اختراق أو سوء استخدام داخلي.',
    options: [
      { id: 10801, lettre: 'A', lettre_ar: 'أ', texte: 'إعطاء جميع المستخدمين صلاحيات المدير العام (Admin) الكاملة', estCorrecte: false },
      { id: 10802, lettre: 'B', lettre_ar: 'ب', texte: 'قصر صلاحيات كل مستخدم على البيانات والمهام الضرورية حصراً لأداء مهامه الوظيفية للحد من مخاطر الاختراق أو التسريب', estCorrecte: true },
      { id: 10803, lettre: 'C', lettre_ar: 'ج', texte: 'حظر استخدام الفأرة في جميع المكاتب', estCorrecte: false },
      { id: 10804, lettre: 'D', lettre_ar: 'د', texte: 'إلغاء جميع كلمات المرور لجعل النظام أسرع', estCorrecte: false }
    ]
  },
  {
    id: 109,
    code: 'Q-INF-109',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE_DIGITAL',
    texte: 'في استغلال معطيات تحديد المواقع بالأقمار الاصطناعية (GPS) في العمليات الميدانية، كم عدد الأقمار الاصطناعية العاملة كحد أدنى مطلوب رياضياً لتحديد الموقع الجغرافي ثلاثي الأبعاد (خط العرض، خط الطول، والارتفاع)؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['أنظمة الملاحة وتحديد المواقع GPS', 'الحساب الهندسي للتثليث المساحي'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.0 },
      { code: 'SPEC-PSIG', specialite: 'العمليات الميدانية', poids: 2.0 },
      { code: 'SPEC-GEH', specialite: 'GEH', poids: 2.0 }
    ],
    explication: 'لتحديد الموقع ثلاثي الأبعاد مع تصحيح خطأ توقيت الساعة الداخلية للمستقبل، يلزم الاتصال بإشارات 4 أقمار اصطناعية على الأقل (Trilatération 3D).',
    options: [
      { id: 10901, lettre: 'A', lettre_ar: 'أ', texte: 'قمر اصطناعي واحد يكفي تماماً في كل الأوقات', estCorrecte: false },
      { id: 10902, lettre: 'B', lettre_ar: 'ب', texte: '4 أقمار اصطناعية كحد أدنى لتحديد الإحداثيات الثلاثية وتصحيح انحراف التوقيت', estCorrecte: true },
      { id: 10903, lettre: 'C', lettre_ar: 'ج', texte: '100 قمر اصطناعي في نفس اللحظة', estCorrecte: false },
      { id: 10904, lettre: 'D', lettre_ar: 'د', texte: 'لا يعتمد نظام GPS على الأقمار الاصطناعية إطلاقاً بل على أعمدة الكهرباء', estCorrecte: false }
    ]
  },
  {
    id: 110,
    code: 'Q-INF-110',
    categorie: 'المعلوماتية والمهارات الرقمية',
    categorie_code: 'INFORMATIQUE_DIGITAL',
    texte: 'عند التحقيق في هجوم إلكتروني شل حواسيب مؤسسة حيوية برسالة تطالب بدفع فدية بعملة البيتكوين مقابل فك تشفير الملفات، ما هو الصنف الخبيث لهذا الهجوم البرمجي وكيف يوصى بالتعامل معه أمنياً؟',
    difficulte: 'متوسط',
    difficulte_code: 'MOYEN',
    coefficient: 1.0,
    competences: ['مكافحة برمجيات الفدية (Ransomware)', 'الاستجابة للحوادث السيبرانية'],
    specialites_ponderation: [
      { code: 'SPEC-INFO', specialite: 'الإعلاميات', poids: 2.5 },
      { code: 'SPEC-PJ', specialite: 'الشرطة القضائية', poids: 2.0 }
    ],
    explication: 'هذا هجوم برمجيات الفدية الخبيثة (Ransomware). التوصية الأمنية والقضائية الصارمة تمنع دفع أي فدية لأنها تمول الجريمة المنظمة ولا تضمن استعادة المفاتيح، وتفرض عزل الشبكة واستعادة النسخ الاحتياطية المعزولة (Offline Backups).',
    options: [
      { id: 11001, lettre: 'A', lettre_ar: 'أ', texte: 'دفع الفدية فوراً ومضاعفتها لضمان إرجاع الملفات بسرعة', estCorrecte: false },
      { id: 11002, lettre: 'B', lettre_ar: 'ب', texte: 'برمجيات الفدية (Ransomware)؛ ويجب عزل الأجهزة المصابة فوراً، رفض دفع الفدية، واستعادة البيانات من النسخ الاحتياطية المعزولة (Offline)', estCorrecte: true },
      { id: 11003, lettre: 'C', lettre_ar: 'ج', texte: 'تثبيت لعبة فيديو جديدة لحذف الفيروس تلقائياً', estCorrecte: false },
      { id: 11004, lettre: 'D', lettre_ar: 'د', texte: 'بيع الحواسيب المصابة في المزاد العلني', estCorrecte: false }
    ]
  }
];
