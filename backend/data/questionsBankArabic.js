// ==============================================================================
// BANQUE OFFICIELLE DE 140 QUESTIONS QCM EN ARABE POUR ORIENT-G
// ==============================================================================
// Généré automatiquement par compile_questions_140.js
// Total questions : 140

export const questionsBank140 = [
  {
    "id": 1,
    "code": "Q-LOG-001",
    "categorie": "الاستدلال المنطقي",
    "categorie_code": "LOGIQUE",
    "texte": "إذا كانت جميع دوريات التدخل السريع مجهزة بنظام الاتصال المشفر، وبعض سيارات الدرك الملكي تابعة لفرق التدخل السريع، فما هو الاستنتاج المنطقي الحتمي الصائب؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1,
    "competences": [
      "الاستدلال الاستنباطي",
      "التحليل المنطقي الصارم"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 1.5
      },
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 2
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 1.5
      }
    ],
    "explication": "بما أن كل دوريات التدخل مجهزة بنظام مشفر، والبعض من سيارات الدرك ينتمي لهذا الصنف، فإن بعض سيارات الدرك على الأقل مجهزة بنظام الاتصال المشفر بالضرورة المنطقية.",
    "options": [
      {
        "id": 101,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "جميع سيارات الدرك الملكي بدون استثناء مجهزة بالنظام المشفر",
        "estCorrecte": false
      },
      {
        "id": 102,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "بعض سيارات الدرك الملكي على الأقل مجهزة بنظام الاتصال المشفر",
        "estCorrecte": true
      },
      {
        "id": 103,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "لا توجد أي سيارة تابعة للدرك الملكي تستخدم الاتصال المشفر",
        "estCorrecte": false
      },
      {
        "id": 104,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "الاتصال المشفر مخصص فقط للشاحنات اللوجستية الثقيلة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 2,
    "code": "Q-LOG-002",
    "categorie": "الاستدلال المنطقي",
    "categorie_code": "LOGIQUE",
    "texte": "في سلسلة التوقيت العملياتي التالية للدوريات: (06:00 ، 06:45 ، 07:45 ، 09:00 ، ...)، ما هو توقيت انطلاق الدورية الموالية وفق النمط الزمني المضطرد؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1,
    "competences": [
      "الاستدلال التتابعي",
      "الحساب الذهني العملياتي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 1.5
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 1.5
      }
    ],
    "explication": "الفوارق الزمنية تتصاعد بمقدار 15 دقيقة في كل خطوة: (+45 دقيقة، ثم +60 دقيقة، ثم +75 دقيقة). الفارق التالي هو +90 دقيقة (ساعة ونصف)، و09:00 + 1h30 = 10:30.",
    "options": [
      {
        "id": 201,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "10:00",
        "estCorrecte": false
      },
      {
        "id": 202,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "10:15",
        "estCorrecte": false
      },
      {
        "id": 203,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "10:30",
        "estCorrecte": true
      },
      {
        "id": 204,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "10:45",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 3,
    "code": "Q-LOG-003",
    "categorie": "الاستدلال المنطقي",
    "categorie_code": "LOGIQUE",
    "texte": "إذا كان الضابط (أ) أقدم رتبة من الرقيب (ب)، والرقيب (ج) أحدث رتبة من الرقيب (ب)، والمساعد (د) أقدم رتبة من الضابط (أ)، فمن هو صاحب الرتبة الأدنى بين الأربعة؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "الترتيب الهرمي",
      "الاستنتاج المباشر"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 2
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 1.5
      }
    ],
    "explication": "الترتيب التنازلي للأقدمية: المساعد (د) > الضابط (أ) > الرقيب (ب) > الرقيب (ج). إذن الرقيب (ج) هو الأحدث رتبة أي صاحب الرتبة الأدنى في المجموعة.",
    "options": [
      {
        "id": 301,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "الضابط (أ)",
        "estCorrecte": false
      },
      {
        "id": 302,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الرقيب (ب)",
        "estCorrecte": false
      },
      {
        "id": 303,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "الرقيب (ج)",
        "estCorrecte": true
      },
      {
        "id": 304,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "المساعد (د)",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 4,
    "code": "Q-LOG-004",
    "categorie": "الاستدلال المنطقي",
    "categorie_code": "LOGIQUE",
    "texte": "خمسة عناصر درك (س، ع، ص، ق، ر) في طابور تفتيش. العنصر (ص) ليس الأول ولا الأخير. العنصر (س) يسبق (ع) مباشرة. العنصر (ر) في المركز الأخير. إذا كان (ص) يسبق (س)، فمن يقف أولاً؟",
    "difficulte": "صعب",
    "difficulte_code": "AVANCE",
    "coefficient": 2,
    "competences": [
      "حل المشكلات المنطقية المركبة",
      "الترتيب المكاني"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2
      },
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 1.5
      }
    ],
    "explication": "العنصر (ر) في المركز الخامس والأخير. ترتيب (ص يسبق س يسبق ع) يأخذ 3 مراكز متتالية. بما أن (ص) ليس الأول ولا الأخير، فمكانه هو الثاني، يليه (س) ثالثاً، ثم (ع) رابعاً، و(ر) خامساً. إذن المركز الأول حتماً هو للعنصر (ق).",
    "options": [
      {
        "id": 401,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "العنصر (س)",
        "estCorrecte": false
      },
      {
        "id": 402,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "العنصر (ق)",
        "estCorrecte": true
      },
      {
        "id": 403,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "العنصر (ص)",
        "estCorrecte": false
      },
      {
        "id": 404,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "العنصر (ع)",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 5,
    "code": "Q-LOG-005",
    "categorie": "الاستدلال المنطقي",
    "categorie_code": "LOGIQUE",
    "texte": "إذا كانت العبارة الشرطية التالية صحيحة: \"إذا تم تفعيل خطة الطوارئ (أ)، يتم وجوباً إغلاق المعبر الحدودي (ب)\". فما هي العبارة المعاكسة إيجابياً (Contraposée) التي تعتبر صحيحة حتماً؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.5,
    "competences": [
      "المنطق الرياضي والرمزي",
      "التحليل الاستدلالي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 2
      },
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 1.5
      }
    ],
    "explication": "قاعدة المنطق الصوري: العبارة (إذا تحقق أ فإن ب يتحقق) تكافئ منطقياً (إذا لم يتحقق ب، فإنه حتماً لم يتم تفعيل أ).",
    "options": [
      {
        "id": 501,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "إذا تم إغلاق المعبر (ب)، فإن الخطة (أ) قد تم تفعيلها بالضرورة",
        "estCorrecte": false
      },
      {
        "id": 502,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "إذا لم يتم إغلاق المعبر الحدودي (ب)، فإن خطة الطوارئ (أ) لم تفعل حتماً",
        "estCorrecte": true
      },
      {
        "id": 503,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "إذا لم تفعل الخطة (أ)، فلن يغلق المعبر (ب) أبداً",
        "estCorrecte": false
      },
      {
        "id": 504,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "إغلاق المعبر لا يرتبط بأي خطة أمنية مسبقة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 6,
    "code": "Q-LOG-006",
    "categorie": "الاستدلال المنطقي",
    "categorie_code": "LOGIQUE",
    "texte": "سلسلة أعداد تمثل تشفير الاتصالات التكتيكية: (2 ، 6 ، 18 ، 54 ، ...). ما هو العدد التالي في السلسلة؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "المتتاليات الحسابية",
      "الاستدلال العددي السريع"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 2
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 1
      }
    ],
    "explication": "المتتالية تضاعفية بضرب كل حد في العدد 3 (2×3=6 ، 6×3=18 ، 18×3=54). الحد التالي هو 54 × 3 = 162.",
    "options": [
      {
        "id": 601,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "108",
        "estCorrecte": false
      },
      {
        "id": 602,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "144",
        "estCorrecte": false
      },
      {
        "id": 603,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "162",
        "estCorrecte": true
      },
      {
        "id": 604,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "180",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 7,
    "code": "Q-LOG-007",
    "categorie": "الاستدلال المنطقي",
    "categorie_code": "LOGIQUE",
    "texte": "في مستودع للأسلحة، كل البنادق الآلية مرقمة، وبعض الأسلحة المرقمة مصنوعة من سبائك التيتانيوم. ما النتيجة المنطقية التي لا يمكن دحضها؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1,
    "competences": [
      "الاستقراء المنطقي",
      "نفي المغالطات الصورية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 1.5
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 1.5
      }
    ],
    "explication": "لا يمكن الجزم بأن كل البنادق من التيتانيوم ولا بأن التيتانيوم للبنادق فقط، لكن الثابت يقيناً هو أن بعض الأسلحة في المستودع مرقمة.",
    "options": [
      {
        "id": 701,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "كل بنادق المستودع مصنوعة حتماً من التيتانيوم",
        "estCorrecte": false
      },
      {
        "id": 702,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "يوجد أسلحة مرقمة داخل المستودع",
        "estCorrecte": true
      },
      {
        "id": 703,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "لا توجد بنادق مصنوعة من التيتانيوم إطلاقاً",
        "estCorrecte": false
      },
      {
        "id": 704,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "جميع المسدسات الفردية غير مرقمة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 8,
    "code": "Q-LOG-008",
    "categorie": "الاستدلال المنطقي",
    "categorie_code": "LOGIQUE",
    "texte": "تستغرق سيارة الدرك ساعة و20 دقيقة لقطع مسافة بسرعة 90 كم/س. كم ستستغرق نفس السيارة لقطع ذات المسافة إذا رفعت سرعتها إلى 120 كم/س؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.5,
    "competences": [
      "التناسب العكسي",
      "الحساب التقديري العملياتي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 1.5
      }
    ],
    "explication": "ساعة و20 دقيقة = 4/3 ساعة. المسافة = 90 × (4/3) = 120 كم. بالسرعة الجديدة 120 كم/س: الزمن = المسافة / السرعة = 120 / 120 = ساعة واحدة تماماً (60 دقيقة).",
    "options": [
      {
        "id": 801,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "45 دقيقة",
        "estCorrecte": false
      },
      {
        "id": 802,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "50 دقيقة",
        "estCorrecte": false
      },
      {
        "id": 803,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "60 دقيقة (ساعة واحدة)",
        "estCorrecte": true
      },
      {
        "id": 804,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "70 دقيقة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 9,
    "code": "Q-LOG-009",
    "categorie": "الاستدلال المنطقي",
    "categorie_code": "LOGIQUE",
    "texte": "إذا كانت الإشارة اللاسلكية الخضراء تعني \"تقدم\"، والصفراء تعني \"استعد\"، والحمراء تعني \"توقف\". إذا ألغي اللون الأصفر واستعيض عنه بوميض أخضر متقطع، فما هو التفسير المنطقي لوميض أخضر متقطع؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "تأويل الإشارات الميدانية",
      "الترميز العملياتي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-GEH",
        "specialite": "GEH",
        "poids": 1.5
      },
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 1.5
      }
    ],
    "explication": "الاستبدال المنطقي المباشر: الوميض الأخضر أخذ دلالة اللون الأصفر الملغى، وبالتالي فدلالته الحتمية هي \"استعد\".",
    "options": [
      {
        "id": 901,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "توقف فوري وشامل",
        "estCorrecte": false
      },
      {
        "id": 902,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "استعد للتحرك أو اتخاذ الموقع",
        "estCorrecte": true
      },
      {
        "id": 903,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "انسحاب تكتيكي للخلف",
        "estCorrecte": false
      },
      {
        "id": 904,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "طلب إمداد بالوقود",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 10,
    "code": "Q-LOG-010",
    "categorie": "الاستدلال المنطقي",
    "categorie_code": "LOGIQUE",
    "texte": "متتالية أشكال هندسية في شاشات الرادار: (مثلث: 3 زوايا ، مربع: 4 زوايا ، مخمس: 5 زوايا ، مسدس: 6 زوايا). إذا كان الشكل التالي يزيد في عدد الأقطار وليس الزوايا فقط، فما هو عدد أضلاع الشكل التالي؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "الاستدلال الهندسي",
      "التعرف على الأنماط"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 1.5
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 1
      }
    ],
    "explication": "النمط يتبع بانتظام تسلسل المضلعات المنتظمة بإضافة ضلع واحد في كل خطوة (3، 4، 5، 6)، فالشكل الموالي هو المسبع ذو 7 أضلاع.",
    "options": [
      {
        "id": 1001,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "6 أضلاع",
        "estCorrecte": false
      },
      {
        "id": 1002,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "7 أضلاع (مسبع)",
        "estCorrecte": true
      },
      {
        "id": 1003,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "8 أضلاع",
        "estCorrecte": false
      },
      {
        "id": 1004,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "9 أضلاع",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 11,
    "code": "Q-LOG-011",
    "categorie": "الاستدلال المنطقي",
    "categorie_code": "LOGIQUE",
    "texte": "ثلاثة حراس (علي، حسن، عمر). أحدهم صادق دائماً، والآخر كاذب دائماً، والثالث يصدق أحياناً. قال علي: \"حسن كاذب\". وقال حسن: \"عمر كاذب\". وقال عمر: \"علي وحسن كاذبان معاً\". من هو الصادق دائماً من بينهم؟",
    "difficulte": "صعب",
    "difficulte_code": "AVANCE",
    "coefficient": 2,
    "competences": [
      "مفارقات الصدق والكذب",
      "التحليل الاستدلالي المتقدم"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 2
      }
    ],
    "explication": "لو كان عمر صادقاً لكان علي وحسن كاذبين، لكن قول حسن \"عمر كاذب\" سيكون صادقاً وهذا تناقض. إذن عمر كاذب. بالتالي قول حسن \"عمر كاذب\" صحيح، فحسن هو الصادق وعلي هو المتذبذب.",
    "options": [
      {
        "id": 1101,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "علي",
        "estCorrecte": false
      },
      {
        "id": 1102,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "حسن",
        "estCorrecte": true
      },
      {
        "id": 1103,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "عمر",
        "estCorrecte": false
      },
      {
        "id": 1104,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "لا يمكن تحديده رياضياً",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 12,
    "code": "Q-LOG-012",
    "categorie": "الاستدلال المنطقي",
    "categorie_code": "LOGIQUE",
    "texte": "متتالية أرقام مشفرة لمجموعات الدوريات: (100 ، 95 ، 85 ، 70 ، 50 ، ...). ما هو الرقم الآتي في المتتالية؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1,
    "competences": [
      "الاستنتاج الرياضي",
      "التحليل المتسلسل"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 1.5
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 1
      }
    ],
    "explication": "الفروق تتناقص بتصاعد: (-5 ، -10 ، -15 ، -20). الفارق التالي هو -25. إذن: 50 - 25 = 25.",
    "options": [
      {
        "id": 1201,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "30",
        "estCorrecte": false
      },
      {
        "id": 1202,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "25",
        "estCorrecte": true
      },
      {
        "id": 1203,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "20",
        "estCorrecte": false
      },
      {
        "id": 1204,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "15",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 13,
    "code": "Q-LOG-013",
    "categorie": "الاستدلال المنطقي",
    "categorie_code": "LOGIQUE",
    "texte": "إذا كانت جميع المعدات العسكرية الثقيلة تخضع للصيانة الشهرية، وجميع الآليات الخاضعة للصيانة الشهرية تسجل في الدفتر الرسمي، فما هي النتيجة المنطقية المؤكدة؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "القياس المنطقي التام",
      "قواعد الاستنتاج"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 1.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 1.5
      }
    ],
    "explication": "قياس منطقي قاطع من الدرجة الأولى (معدات ثقيلة -> صيانة شهرية -> تسجيل بالدفتر). النتيجة: جميع المعدات الثقيلة تسجل في الدفتر الرسمي حتماً.",
    "options": [
      {
        "id": 1301,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "جميع المعدات العسكرية الثقيلة تسجل في الدفتر الرسمي بالضرورة",
        "estCorrecte": true
      },
      {
        "id": 1302,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "المعدات الخفيفة فقط هي التي تسجل في الدفتر",
        "estCorrecte": false
      },
      {
        "id": 1303,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "الدفتر الرسمي لا يحتوي على أي معدات ثقيلة",
        "estCorrecte": false
      },
      {
        "id": 1304,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "الصيانة الشهرية اختيارية وليست إلزامية",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 14,
    "code": "Q-LOG-014",
    "categorie": "الاستدلال المنطقي",
    "categorie_code": "LOGIQUE",
    "texte": "خزان وقود بقاعدة عسكرية يفرغ بمعدل ثابت كل 4 ساعات بمقدار الثلث. إذا كان ممتلئاً بالكامل الساعة 08:00 صباحاً، فكم سيتبقى منه في الساعة 16:00 من نفس اليوم؟",
    "difficulte": "صعب",
    "difficulte_code": "AVANCE",
    "coefficient": 2,
    "competences": [
      "الحساب التراكمي النسبي",
      "التفكير الاستراتيجي في الإمداد"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 1.5
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 1.5
      }
    ],
    "explication": "بين 08:00 و16:00 تمر 8 ساعات (فترتان من 4 ساعات). في الفترة الأولى ينقص الثلث ويتبقى 2/3. في الفترة الثانية ينقص ثلث المتبقي: (2/3) - (1/3 × 2/3) = (2/3) × (2/3) = 4/9.",
    "options": [
      {
        "id": 1401,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "1/3 من الخزان",
        "estCorrecte": false
      },
      {
        "id": 1402,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "4/9 من الخزان",
        "estCorrecte": true
      },
      {
        "id": 1403,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "1/2 من الخزان",
        "estCorrecte": false
      },
      {
        "id": 1404,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "يفرغ تماماً ويصل للصفر",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 15,
    "code": "Q-LOG-015",
    "categorie": "الاستدلال المنطقي",
    "categorie_code": "LOGIQUE",
    "texte": "إذا كانت كلمة \"درك\" تشفر رقمياً بالرمز (4-10-20)، وكلمة \"أمن\" تشفر بالرمز (1-24-25)، فما المبدأ الرياضي المعتمد في توليد هذا التشفير التكتيكي البسيط؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.5,
    "competences": [
      "التشفير التناظري",
      "الاستدلال الاستدلالي الرمزي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 2
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 1.5
      }
    ],
    "explication": "استبدال كل حرف أبجدي برقمه التسلسلي المباشر في جدول الأبجدية المتفق عليه كنظام مصفوفة إبدال ثابتة.",
    "options": [
      {
        "id": 1501,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "ضرب عدد حروف الكلمة في تاريخ اليوم",
        "estCorrecte": false
      },
      {
        "id": 1502,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "إبدال كل حرف بالرتبة الأبجدية المحددة في مصفوفة التشفير",
        "estCorrecte": true
      },
      {
        "id": 1503,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "اختيار الأرقام عشوائياً دون أي قاعدة",
        "estCorrecte": false
      },
      {
        "id": 1504,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "حساب عدد النقاط في كل حرف فقط",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 16,
    "code": "Q-LOG-016",
    "categorie": "الاستدلال المنطقي",
    "categorie_code": "LOGIQUE",
    "texte": "أربعة صناديق ذخيرة مغلقة تحمل ملصقات خاطئة جميعها: [رصاص 9 مم]، [رصاص 7.62 مم]، [مختلط]. إذا سمح لك بفتح صندوق واحد فقط وأخذ طلقة واحدة منه لمعرفة محتويات جميع الصناديق، فأي صندوق تختار فتحه؟",
    "difficulte": "صعب",
    "difficulte_code": "AVANCE",
    "coefficient": 2,
    "competences": [
      "الاستدلال الاستنباطي الإقصائي",
      "المنطق الرياضي للمعلومة الناقصة"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2
      },
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 1.5
      }
    ],
    "explication": "تختار الصندوق الموسوم بـ [مختلط]. بما أن ملصقه خاطئ حتماً، فالطلقة التي تسحبها تحدد نوعه بيقين (إما 9 مم فقط أو 7.62 مم فقط)، وبالتالي ينكشف محتوى الصندوقين الآخرين بالإقصاء المباشر.",
    "options": [
      {
        "id": 1601,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "الصندوق الذي يحمل ملصق [رصاص 9 مم]",
        "estCorrecte": false
      },
      {
        "id": 1602,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الصندوق الذي يحمل ملصق [مختلط]",
        "estCorrecte": true
      },
      {
        "id": 1603,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "الصندوق الذي يحمل ملصق [رصاص 7.62 مم]",
        "estCorrecte": false
      },
      {
        "id": 1604,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "لا يمكن معرفتها دون فتح جميع الصناديق",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 17,
    "code": "Q-LOG-017",
    "categorie": "الاستدلال المنطقي",
    "categorie_code": "LOGIQUE",
    "texte": "إذا علمت أن \"كل حراس الشخصيات يتقنون الرماية الدقيقة\"، و\"بعض المظليين هم حراس شخصيات\"، فما هي النتيجة الحتمية؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "المنطق الأرسطي",
      "العلاقات بين المجموعات"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-GEH",
        "specialite": "GEH",
        "poids": 2
      },
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 1.5
      }
    ],
    "explication": "تقاطع مجموعة المظليين مع مجموعة حراس الشخصيات يعني حتماً أن العناصر المشتركة تتقن الرماية الدقيقة، إذن: بعض المظليين يتقنون الرماية الدقيقة.",
    "options": [
      {
        "id": 1701,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "جميع المظليين بدون استثناء يتقنون الرماية الدقيقة",
        "estCorrecte": false
      },
      {
        "id": 1702,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "بعض المظليين يتقنون الرماية الدقيقة بالضرورة",
        "estCorrecte": true
      },
      {
        "id": 1703,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "لا يوجد أي مظلي يتقن الرماية",
        "estCorrecte": false
      },
      {
        "id": 1704,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "حراس الشخصيات لا ينفذون قفزاً مظلياً أبداً",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 18,
    "code": "Q-LOG-018",
    "categorie": "الاستدلال المنطقي",
    "categorie_code": "LOGIQUE",
    "texte": "متتالية أحرف تكتيكية: (أ ، ج ، هـ ، ز ، ...). ما هو الحرف العربي الآتي في النمط؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "المتتاليات الحرفية",
      "التركيز على التسلسل الأبجدي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 1.5
      },
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 1
      }
    ],
    "explication": "النمط يتجاوز حرفاً واحداً في كل خطوة في الترتيب الأبجدي الهجائي: (أ [ب] ج [د] هـ [و] ز [ح] ط). إذن الحرف التالي هو \"ط\".",
    "options": [
      {
        "id": 1801,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "ح",
        "estCorrecte": false
      },
      {
        "id": 1802,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "ط",
        "estCorrecte": true
      },
      {
        "id": 1803,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "ي",
        "estCorrecte": false
      },
      {
        "id": 1804,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "ك",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 19,
    "code": "Q-LOG-019",
    "categorie": "الاستدلال المنطقي",
    "categorie_code": "LOGIQUE",
    "texte": "إذا كانت بطارية جهاز الإرسال اللاسلكي تنفد بنسبة 15% كل ساعتين في وضع الاستعداد، وبنسبة 40% كل ساعتين في وضع البث المستمر. إذا بقي الجهاز 4 ساعات في الاستعداد ثم ساعتين في البث، فما النسبة المتبقية من الشحن؟",
    "difficulte": "صعب",
    "difficulte_code": "AVANCE",
    "coefficient": 2,
    "competences": [
      "الحساب العملياتي للطاقة",
      "التخطيط اللوجستي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 2
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 1.5
      }
    ],
    "explication": "الاستعداد: 4 ساعات = فترتان من ساعتين = 2 × 15% = 30%. البث: ساعتان = 40%. إجمالي الاستهلاك = 30% + 40% = 70%. النسبة المتبقية من 100% = 30%.",
    "options": [
      {
        "id": 1901,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "20%",
        "estCorrecte": false
      },
      {
        "id": 1902,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "25%",
        "estCorrecte": false
      },
      {
        "id": 1903,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "30%",
        "estCorrecte": true
      },
      {
        "id": 1904,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "35%",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 20,
    "code": "Q-LOG-020",
    "categorie": "الاستدلال المنطقي",
    "categorie_code": "LOGIQUE",
    "texte": "في قضية سرقة، ثبت أن: \"السارق لا يمكن أن يدخل إلا إذا كان يحمل المفتاح الرئيسي أو كسر النافذة\". وتبين بالمعاينة أن النافذة سليمة تماماً ولم تكسر. ما الاستنتاج القضائي المنطقي القطعي؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "الاستدلال القضائي المباشر",
      "إقصاء الفرضيات"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 2
      }
    ],
    "explication": "قاعدة الفصل المنطقي (Modus Tollendo Ponens): إما أ أو ب. بما أن ب غير محقق يقيناً (النافذة لم تكسر)، فإن أ محقق حتماً، أي أن السارق كان يحوز المفتاح الرئيسي.",
    "options": [
      {
        "id": 2001,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "السارق قفز من المدخنة العلوية",
        "estCorrecte": false
      },
      {
        "id": 2002,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "السارق كان يحوز المفتاح الرئيسي بالضرورة",
        "estCorrecte": true
      },
      {
        "id": 2003,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "السرقة لم تقع أصلاً والادعاء كاذب",
        "estCorrecte": false
      },
      {
        "id": 2004,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "النافذة ستكسر في المستقبل",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 21,
    "code": "Q-OBS-021",
    "categorie": "التحليل والملاحظة",
    "categorie_code": "OBSERVATION",
    "texte": "أثناء معاينة مسرح حادث سير، لاحظ المحقق آثار فرملة متقطعة ومنتظمة على الإسفلت قبل نقطة الاصطدام بـ 15 متراً. إلى ماذا يشير هذا النمط المحدد من الآثار؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "الملاحظة الدقيقة للأدلة الميدانية",
      "التحليل السببي لحوادث السير"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 1.5
      }
    ],
    "explication": "الآثار المتقطعة والمنتظمة لفرامل المركبة تعكس عمل نظام منع انغلاق المكابح (ABS) الذي يضغط ويحرر المكابح آلياً بسرعة عالية لتفادي انزلاق العجلات.",
    "options": [
      {
        "id": 2101,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "السائق كان يضغط على دواسة الفرامل باليد بدل القدم",
        "estCorrecte": false
      },
      {
        "id": 2102,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "تدخل نظام منع انغلاق المكابح (ABS) في السيارة لتفادي الانزلاق",
        "estCorrecte": true
      },
      {
        "id": 2103,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "انفجار الإطار الأمامي الأيمن قبل الاصطدام",
        "estCorrecte": false
      },
      {
        "id": 2104,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "تعطل نظام توجيه المقود بشكل كلي ومفاجئ",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 22,
    "code": "Q-OBS-022",
    "categorie": "التحليل والملاحظة",
    "categorie_code": "OBSERVATION",
    "texte": "عند تفحص رخصة سياقة إلكترونية أثناء مراقبة ليلية بواسطة مصباح الأشعة فوق البنفسجية (UV)، ما هي العلامة الدالة الفورية على أن الوثيقة مشبوهة أو مقلدة؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "كشف التزييف",
      "التدقيق الوثائقي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2
      },
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 1.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 1
      }
    ],
    "explication": "الوثائق الرسمية تحتوي على أحبار أمنية تتوهج تحت الأشعة فوق البنفسجية وتصميم ميكروغرافي دقيق؛ غياب التوهج الفوسفوري المميز يدل على التزوير المادي.",
    "options": [
      {
        "id": 2201,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "وضوح صورة صاحب الرخصة بلون أسود داكن",
        "estCorrecte": false
      },
      {
        "id": 2202,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "غياب الشعارات المتوهجة فوسفورياً تحت الأشعة فوق البنفسجية",
        "estCorrecte": true
      },
      {
        "id": 2203,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "وجود شريحة إلكترونية بارزة على ظهر البطاقة",
        "estCorrecte": false
      },
      {
        "id": 2204,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "كتابة الاسم العائلي بالحروف اللاتينية والعربية معاً",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 23,
    "code": "Q-OBS-023",
    "categorie": "التحليل والملاحظة",
    "categorie_code": "OBSERVATION",
    "texte": "في رسم بياني تصادمي، انحرفت السيارة (أ) بزاوية 45 درجة نحو اليمين بعد اصطدام جانبي مع شاحنة (ب) التي أكملت مسارها المستقيم دون أي انحراف. ما الاستنتاج الفيزيائي والملاحظاتي المباشر؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1,
    "competences": [
      "قراءة المخططات الميدانية",
      "التحليل الميكانيكي للحوادث"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 1.5
      }
    ],
    "explication": "وفق قوانين الديناميكا وكمية الحركة، الكتلة الأكبر للشاحنة وعزم اندفاعها المستمر جعلا طاقتها الحركية تمتص الاصطدام بينما فرضت انحرافاً كبيراً على السيارة الأخف وزناً.",
    "options": [
      {
        "id": 2301,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "كتلة وعزم اندفاع الشاحنة كانا أكبر بكثير ففرضا مسار الاصطدام على المركبة الخفيفة",
        "estCorrecte": true
      },
      {
        "id": 2302,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "السيارة كانت متوقفة تماماً والشاحنة كانت تسير إلى الخلف",
        "estCorrecte": false
      },
      {
        "id": 2303,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "السائقان فقدا الوعي معاً قبل نقطة التقاطع بـ 500 متر",
        "estCorrecte": false
      },
      {
        "id": 2304,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "الاصطدام وقع من الجهة الخلفية للشاحنة وليس الجانبية",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 24,
    "code": "Q-OBS-024",
    "categorie": "التحليل والملاحظة",
    "categorie_code": "OBSERVATION",
    "texte": "خلال مراقبة محيط منشأة حيوية، أي من السلوكيات التالية يعتبر مؤشراً يقظاً يستدعي الاشتباه والتدقيق الأمني المباشر؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "اليقظة الميدانية",
      "الملاحظة الاستباقية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-GEH",
        "specialite": "GEH",
        "poids": 2
      },
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 2
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 1.5
      }
    ],
    "explication": "التوقف المتكرر في زوايا الرؤية الميتة وتدوين مواقع الكاميرات هو نمط استطلاع ورصد تحضيري للأعمال العدائية، وهو مؤشر تهديد يستوجب الفحص الفوري.",
    "options": [
      {
        "id": 2401,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "شخص يسأل الحارس عن توقيت فتح مكتب استقبال المرتفقين",
        "estCorrecte": false
      },
      {
        "id": 2402,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "مركبة تدور عدة مرات ببطء وتلتقط صوراً لكاميرات المراقبة ونقاط الحراسة",
        "estCorrecte": true
      },
      {
        "id": 2403,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "موظف يرتدي بذلة العمل ويحمل شارة مهنية واضحة متجهاً للمدخل الرئيسي",
        "estCorrecte": false
      },
      {
        "id": 2404,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "عامل توصيل بضائع يتصل بالزبون لاستلام الطرد",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 25,
    "code": "Q-OBS-025",
    "categorie": "التحليل والملاحظة",
    "categorie_code": "OBSERVATION",
    "texte": "عند فحص صفيحة ترقيم شاحنة نقل دولي، لاحظ الدركي وجود مسامير تثبيت (Rivets) حديثة جداً تختلف عن بقية أجزاء الصفيحة المتقادمة مع أثر طلاء حديث حول الحواف. ما التفسير الأمني الأقرب؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "ملاحظة التفاصيل الدقيقة",
      "مكافحة تهريب وتزوير المركبات"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2
      },
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2
      }
    ],
    "explication": "استبدال مسامير التثبيت الحديثة على صفيحة متآكلة مع وجود طلاء حديث يدل على احتمال قوي لاستبدال الصفيحة مؤخراً لتضليل أجهزة التتبع أو إخفاء هوية المركبة (مركبة مجهولة/مزورة).",
    "options": [
      {
        "id": 2501,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "المركبة خضعت لغسيل روتيني بالبخار في محطة الخدمة",
        "estCorrecte": false
      },
      {
        "id": 2502,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "احتمال تزوير أو استبدال صفيحة الترقيم لإخفاء الهوية الحقيقية للشاحنة",
        "estCorrecte": true
      },
      {
        "id": 2503,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "الإطارات الاحتياطية للشاحنة جديدة ولم تستعمل من قبل",
        "estCorrecte": false
      },
      {
        "id": 2504,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "السائق يحمل رخصة سياقة من صنف الدرك الملكي حصرياً",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 26,
    "code": "Q-OBS-026",
    "categorie": "التحليل والملاحظة",
    "categorie_code": "OBSERVATION",
    "texte": "في شريط فيديو لكاميرا مراقبة يوثق عملية سطو، أظهرت الساعة الرقمية المسجلة بالفيديو التوقيت 23:45:10، بينما ساعة الحائط المعلقة في الغرفة كانت تشير إلى 23:30:00 ومؤشر الثواني يتحرك بانتظام. ما الذي يجب على المحقق ملاحظته وتدوينه فوراً؟",
    "difficulte": "صعب",
    "difficulte_code": "DIFFICILE",
    "coefficient": 1.5,
    "competences": [
      "التحليل الزمني الجنائي",
      "توثيق الأدلة الرقمية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2.5
      },
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 1.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 1.5
      }
    ],
    "explication": "يجب رصد وتوثيق فارق التوقيت (Offset) بين جهاز التسجيل الرقمي (DVR) والتوقيت الحقيقي المعياري لتصحيح التسلسل الزمني للأحداث وضمان صحة الحجية القضائية.",
    "options": [
      {
        "id": 2601,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "إلغاء الفيديو واعتباره دليلاً باطلاً دون أي إجراءات إضافية",
        "estCorrecte": false
      },
      {
        "id": 2602,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "قياس وتوثيق فارق التوقيت بين خادم الكاميرا والتوقيت الواقعي لإعادة ضبط التسلسل الزمني بدقة",
        "estCorrecte": true
      },
      {
        "id": 2603,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "افتراض أن الجريمة ارتكبت في اليوم الموالي بالضرورة",
        "estCorrecte": false
      },
      {
        "id": 2604,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "اتهام صانع ساعة الحائط بالتواطؤ مع المشتبه بهم",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 27,
    "code": "Q-OBS-027",
    "categorie": "التحليل والملاحظة",
    "categorie_code": "OBSERVATION",
    "texte": "أثناء تفتيش نظامي لمركبة مشبوهة، لاحظ الدركي أن الصوت الصادر عن النقر الخفيف على الباب الأيمن مكتوم وثقيل جداً مقارنة بالرنين المجوف الطبيعي للباب الأيسر. ما الاستنتاج العملياتي الأبرز؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "التفتيش الوقائي الفطن",
      "التمييز الحسي السمعي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2
      },
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 1.5
      },
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 1.5
      }
    ],
    "explication": "الصوت المكتوم يدل على وجود مادة أو تجويف محشو داخل هيكل الباب (مثل مخبأ مهيأ للممنوعات أو الأسلحة)، مما يفرض فحصاً دقيقاً ومباشراً للبطانة الداخلية.",
    "options": [
      {
        "id": 2701,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "احتمال وجود تجويف سري أو حشو بمواد ممنوعة داخل هيكل الباب الأيمن",
        "estCorrecte": true
      },
      {
        "id": 2702,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "أن الباب الأيمن مصنوع من الألومنيوم الخفيف جداً",
        "estCorrecte": false
      },
      {
        "id": 2703,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "أن زجاج الباب الأيسر مفتوح جزئياً فقط",
        "estCorrecte": false
      },
      {
        "id": 2704,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "أن مكبر الصوت الداخلي للسيارة يعمل بكفاءة عالية",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 28,
    "code": "Q-OBS-028",
    "categorie": "التحليل والملاحظة",
    "categorie_code": "OBSERVATION",
    "texte": "صرح الشاهد الأول: \"رأيت شاحنة حمراء مسرعة تجاوزت الإشارة الحمراء عند الساعة 14:00\". بينما صرح الشاهد الثاني في نفس المكان: \"سمعت صوت فرملة حادة في حدود الثانية بعد الزوال ونظرت فرأيت شاحنة زرقاء تصطدم بسيارة\". ما العنصر المشترك المؤكد بين الشهادتين قبل إجراء التحريات المعمقة؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "مقارنة الشهادات",
      "استخلاص الحقائق المشتركة"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 1.5
      }
    ],
    "explication": "العنصر المتطابق يقيناً بين الشاهدين هو التوقيت (حوالي الساعة 14:00) ونوع المركبة الكبيرة (شاحنة)، بينما لون الشاحنة وتفاصيل الفعل تباينت وتتطلب دليلاً مادياً فاصلاً.",
    "options": [
      {
        "id": 2801,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "لون الشاحنة هو البنفسجي المزدوج",
        "estCorrecte": false
      },
      {
        "id": 2802,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "وجود شاحنة في مسرح الحدث في حدود الساعة 14:00",
        "estCorrecte": true
      },
      {
        "id": 2803,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "كلا الشاهدين يقودان نفس نوع السيارة",
        "estCorrecte": false
      },
      {
        "id": 2804,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "الإشارة الضوئية كانت مطفأة تماماً طوال اليوم",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 29,
    "code": "Q-OBS-029",
    "categorie": "التحليل والملاحظة",
    "categorie_code": "OBSERVATION",
    "texte": "عند معاينة نافذة زجاجية مكسورة بمقذوف في مسرح جريمة، لوحظ أن الفوهة المخروطية المتسعة (Cratère) لثقب الزجاج تقع في الواجهة الداخلية للغرفة والفتحة الضيقة في الواجهة الخارجية. من أي اتجاه تم إطلاق المقذوف؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "البالستيك والمقذوفات الجنائية",
      "التحليل المادي لكسور الزجاج"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2.5
      },
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 1.5
      }
    ],
    "explication": "في الفيزياء الجنائية لكسور الزجاج، الفوهة المخروطية تتسع دائماً في اتجاه خروج المقذوف (جهة الاندفاع)، مما يعني أن المقذوف اخترق الزجاج من الخارج نحو الداخل.",
    "options": [
      {
        "id": 2901,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "من داخل الغرفة نحو الخارج",
        "estCorrecte": false
      },
      {
        "id": 2902,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "من خارج الغرفة باتجاه الداخل",
        "estCorrecte": true
      },
      {
        "id": 2903,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "من السقف عمودياً بزاوية 90 درجة",
        "estCorrecte": false
      },
      {
        "id": 2904,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "الكسر ناتج عن تغير درجة الحرارة دون أي مقذوف",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 30,
    "code": "Q-OBS-030",
    "categorie": "التحليل والملاحظة",
    "categorie_code": "OBSERVATION",
    "texte": "أثناء توقيف سائق في نقطة مراقبة ليلية، لاحظ الدركي ارتعاشاً لا إرادياً في اليدين، وتجنباً مستمراً للتواصل البصري، وصعوبة في ابتلاع الريق، رغم برودة الطقس وسلامة وثائق السيارة الظاهرة. ما هو التصرف الاحترافي المبني على هذه الملاحظة السلوكية؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1,
    "competences": [
      "ملاحظة لغة الجسد",
      "إدارة المخاطر في التوقيف"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2
      },
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 1.5
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 1.5
      }
    ],
    "explication": "هذه العلامات تشير إلى توتر نفسي حاد وخوف شديد غير متناسب مع تفتيش روتيني، مما يوجب رفع مستوى الحذر الأمني وإجراء فحص وتفتيش معمق للسائق والمركبة.",
    "options": [
      {
        "id": 3001,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "السماح له بالمرور فوراً لتفادي تضييع وقته",
        "estCorrecte": false
      },
      {
        "id": 3002,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "رفع درجة اليقظة الأمنية وتعميق المراقبة والتفتيش وفق الضوابط القانونية",
        "estCorrecte": true
      },
      {
        "id": 3003,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "مطالبته بتقديم اعتراف فوري بارتكاب جناية قتل",
        "estCorrecte": false
      },
      {
        "id": 3004,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "تجاهل السلوك ومصادرة رخصة السياقة بصفة نهائية دون سند قانوني",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 31,
    "code": "Q-OBS-031",
    "categorie": "التحليل والملاحظة",
    "categorie_code": "OBSERVATION",
    "texte": "في مدار طرقي رئيسي يشهد اختناقاً مرورياً حاداً، لاحظ رئيس دورية الدراجين أن السيارات متوقفة داخل الحلقة الدائرية بينما المنافذ المؤدية للمدار خالية من أي حادث. ما السبب الهيكلي المشاهد للاختناق؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1,
    "competences": [
      "تحليل حركة السير والجولان",
      "التدبير الميداني للازدحام"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2.5
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 1
      }
    ],
    "explication": "السبب الميداني هو عدم احترام أسبقية المرور لليسار ودخول مركبات إضافية عندما يكون المدار ممتلئاً بالفعل، مما يسبب ما يعرف بـ \"القفل الذاتي للمدار\" (Deadlock).",
    "options": [
      {
        "id": 3101,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "دخول مركبات إلى المدار دون وجود منفذ خروج متاح مما أدى لانسداد حلقة التدفق",
        "estCorrecte": true
      },
      {
        "id": 3102,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "أن جميع السيارات نفد منها الوقود في نفس اللحظة",
        "estCorrecte": false
      },
      {
        "id": 3103,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "ارتفاع ضغط الهواء في العجلات لجميع المركبات",
        "estCorrecte": false
      },
      {
        "id": 3104,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "أن إشارات المرور الخضراء كانت مضاءة في جميع الاتجاهات",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 32,
    "code": "Q-OBS-032",
    "categorie": "التحليل والملاحظة",
    "categorie_code": "OBSERVATION",
    "texte": "عند استلام كيس أحراز قضائية مغلق بالشمع الأحمر، لاحظ كاتب الضبط أن خيط الربط مقطوع تحت الختم وتم لصقه بالغراء الشفاف بدقة متناهية. ما الإجراء الفوري الواجب اتخاذه وفق قواعد التحري والضبط؟",
    "difficulte": "صعب",
    "difficulte_code": "DIFFICILE",
    "coefficient": 1.5,
    "competences": [
      "سلسلة حفظ الأدلة الجنائية",
      "حماية الحجية القانونية للأحراز"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 2
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 1.5
      }
    ],
    "explication": "أي مساس بسلامة الحرز يقطع سلسلة الحيازة القانونية (Chain of Custody). يجب رفض الاستلام الشكلي الفوري، وإنجاز محضر معاينة بالخلل، وإشعار النيابة العامة والقائد التسلسلي فوراً.",
    "options": [
      {
        "id": 3201,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "إعادة إغلاق الكيس بختم جديد وتجاهل الملاحظة لتسريع الإجراءات",
        "estCorrecte": false
      },
      {
        "id": 3202,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "إثبات الواقعة فوراً في محضر رسمي وإشعار النيابة العامة بكسر سلامة الحرز",
        "estCorrecte": true
      },
      {
        "id": 3203,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "رمي الحرز في سلة المهملات لعدم صلاحيته",
        "estCorrecte": false
      },
      {
        "id": 3204,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "فتح الكيس وتوزيع محتوياته على باقي الزملاء",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 33,
    "code": "Q-OBS-033",
    "categorie": "التحليل والملاحظة",
    "categorie_code": "OBSERVATION",
    "texte": "أثناء دراسة خريطة طبوغرافية لتطويق فارين في منطقة جبلية وعرة، لاحظ الضابط وادياً جافاً شديد الانحدار يتصل بنقطة عبور معبدة واحدة تفصل بين قريتين. ما الميزة التكتيكية لهذه الملاحظة؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "التحليل الطبوغرافي التكتيكي",
      "التخطيط لعمليات الحصار والتطويق"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2.5
      },
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 2
      }
    ],
    "explication": "تحديد نقطة الاختناق الإجبارية (Choke Point) في التضاريس يتيح وضع نقطة مراقبة وكمين حاكم بأقل عدد ممكن من القوات وتأمين قطع خط انسحاب الفارين بفعالية.",
    "options": [
      {
        "id": 3301,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "تحديد \"نقطة اختناق إجبارية\" تتيح إحكام السيطرة والكمين بأقل مجهود عملياتي",
        "estCorrecte": true
      },
      {
        "id": 3302,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "ضرورة استخدام طائرات الهليكوبتر فقط لنقل المياه المعدنية",
        "estCorrecte": false
      },
      {
        "id": 3303,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "أن المنطقة صالحة لسباق الدراجات الهوائية السريعة",
        "estCorrecte": false
      },
      {
        "id": 3304,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "أن الوادي لا يمكن دخوله إلا في فصل الصيف",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 34,
    "code": "Q-OBS-034",
    "categorie": "التحليل والملاحظة",
    "categorie_code": "OBSERVATION",
    "texte": "في تتبع آثار أقدام مشتبه به على رمال رطبة، كانت طبعة مقدمة القدم (الأصابع) عميقة جداً وواضحة بينما طبعة الكعب تكاد تكون غير مرئية مع مسافات متباعدة تزيد عن متر بين الخطوات. إلى ماذا تشير هذه الملاحظة الفنية؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "قص الأثر والتحري الميداني",
      "تحليل الآثار البيولوجية والحركية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2
      }
    ],
    "explication": "عند الجري السريع (العدو)، يرتكز وزن الجسم بالكامل على مقدمة القدم وتتباعد خطوات الساقين، بخلاف المشي الهادئ الذي يترك أثراً متوازناً وعميقاً في الكعب.",
    "options": [
      {
        "id": 3401,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "الشخص كان يمشي إلى الخلف ببطء وتأنٍّ",
        "estCorrecte": false
      },
      {
        "id": 3402,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الشخص كان يعدو (يجري) بسرعة عالية أثناء مروره",
        "estCorrecte": true
      },
      {
        "id": 3403,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "الشخص كان يحمل حمولة ثقيلة جداً على ظهره وهو جالس",
        "estCorrecte": false
      },
      {
        "id": 3404,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "الأثر يعود لدراجة نارية صغيرة بعجلتين",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 35,
    "code": "Q-OBS-035",
    "categorie": "التحليل والملاحظة",
    "categorie_code": "OBSERVATION",
    "texte": "خلال البحث عن سيارة متورطة في جنحة فرار، عممت غرفة القيادة مواصفات: \"سيارة رمادية رباعية الدفع\". أي من التفاصيل المرصودة التالية يقدم أعلى قيمة تمييزية لتأكيد تحديد المركبة المشبوهة وسط عشرات السيارات الرمادية؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "الملاحظة التمييزية",
      "التعرف السريع على الأهداف"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 1.5
      }
    ],
    "explication": "العلامات الفريدة التالفة أو المعدلة (مثل كسر محدد بالمرآة الجانبية أو ملصق نادر أو صدمة مميزة) تشكل عناصر تمييز قاطعة لا تتكرر في باقي المركبات من نفس الموديل واللون.",
    "options": [
      {
        "id": 3501,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "أن السيارة تسير على أربع عجلات مطاطية",
        "estCorrecte": false
      },
      {
        "id": 3502,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "وجود كسر مميز في المرآة الجانبية اليسرى مع ملصق فريد على الزجاج الخلفي",
        "estCorrecte": true
      },
      {
        "id": 3503,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "وجود مقود دائري داخل مقصورة القيادة",
        "estCorrecte": false
      },
      {
        "id": 3504,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "أن الزجاج الأمامي شفاف ونظيف تماماً",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 36,
    "code": "Q-ATT-036",
    "categorie": "التركيز والانتباه",
    "categorie_code": "ATTENTION",
    "texte": "أثناء تلقي نداء لاسلكي سريع ومتقطع وسط ضوضاء محرك الدورية: \"الدورية 4... تحرك فوراً إلى النقطة كليو 47... كرر 47 وليس 74... الدعم مطلوب\". ما هي النقطة المحددة بدقة لتوجيه التدخل؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "التركيز السمعي الانتقائي",
      "اليقظة اللاسلكية في الطوارئ"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2
      },
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 1.5
      }
    ],
    "explication": "الرسالة شددت بوضوح على تصحيح التردد وتفادي الخلط البصري/السمعي المألوف: النقطة المقصودة هي الكيلومتر 47 وليس 74.",
    "options": [
      {
        "id": 3601,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "النقطة الكيلومترية 74",
        "estCorrecte": false
      },
      {
        "id": 3602,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "النقطة الكيلومترية 47",
        "estCorrecte": true
      },
      {
        "id": 3603,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "النقطة الكيلومترية 147",
        "estCorrecte": false
      },
      {
        "id": 3604,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "الرجوع إلى مقر القيادة الإقليمية",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 37,
    "code": "Q-ATT-037",
    "categorie": "التركيز والانتباه",
    "categorie_code": "ATTENTION",
    "texte": "خلال نوبة حراسة ليلية ثابتة تمتد لأربع ساعات في موقع معزول، ما هو الإجراء الأنجع للحفاظ على أقصى درجات التركيز الذهني ومقاومة النعاس والشرود؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "الانتباه المستمر والمقاوم للرتابة",
      "الانضباط في الحراسة الثابتة"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-GEH",
        "specialite": "GEH",
        "poids": 2.5
      },
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 2
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 1.5
      }
    ],
    "explication": "المسح البصري الدوري لقطاعات الرصد وتغيير وضعية الوقوف مع التنفس العميق ينشط الدورة الدموية ويبقي الحواس في حالة استنفار دائم دون إخلال بالواجب.",
    "options": [
      {
        "id": 3701,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "الجلوس والاسترخاء وإغلاق العينين لبضع دقائق فقط",
        "estCorrecte": false
      },
      {
        "id": 3702,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "المسح البصري النشط للقطاعات وتغيير زوايا المراقبة والتحرك الموضعي المنتظم",
        "estCorrecte": true
      },
      {
        "id": 3703,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "تصفح مواقع التواصل الاجتماعي على الهاتف الشخصي لطرد الملل",
        "estCorrecte": false
      },
      {
        "id": 3704,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "وضع سماعات الأذن لسماع الموسيقى بصوت مرتفع",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 38,
    "code": "Q-ATT-038",
    "categorie": "التركيز والانتباه",
    "categorie_code": "ATTENTION",
    "texte": "أمامك قائمة تتضمن أرقام بطاقات التعريف الوطنية التالية: [AB123456, AB123465, AB123546, AB123456]. كم مرة تكرر الرقم المحدد [AB123456] بالضبط وبشكل متطابق في القائمة؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "التدقيق البصري السريع",
      "مقارنة المتطابقات الرقمية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 2.5
      },
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 2
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 1.5
      }
    ],
    "explication": "الرقم AB123456 ورد في المركز الأول ثم تكرر بنفس الترتيب في المركز الرابع فقط، أي مرتين بالضبط (العنصر الثاني والثالث فيهما قلب للأرقام 65 و 546).",
    "options": [
      {
        "id": 3801,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "مرة واحدة فقط",
        "estCorrecte": false
      },
      {
        "id": 3802,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "مرتان بالضبط",
        "estCorrecte": true
      },
      {
        "id": 3803,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "ثلاث مرات",
        "estCorrecte": false
      },
      {
        "id": 3804,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "أربع مرات متتالية",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 39,
    "code": "Q-ATT-039",
    "categorie": "التركيز والانتباه",
    "categorie_code": "ATTENTION",
    "texte": "أثناء مراجعة سجل الموقوفين رهن الحراسة النظرية، أي زوج من البيانات التالية يحتوي على خطأ إملائي أو رقمي دقيق يجب تصحيحه فوراً؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "الانتباه للتفاصيل الدقيقة",
      "التوثيق الإداري السليم"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 2.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 2
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 1.5
      }
    ],
    "explication": "في الزوج (ج)، تاريخ نهاية الأجل (14/05) يسبق تاريخ التوقيف (15/05)، وهو خطأ تاريخي منطقي فادح يمس مشروعية التوقيف الإجرائي.",
    "options": [
      {
        "id": 3901,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "تاريخ الدخول: 10/05/2024 الساعة 10:00 — تاريخ الانتهاء: 12/05/2024 الساعة 10:00",
        "estCorrecte": false
      },
      {
        "id": 3902,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "رقم المحضر: 1420/ج.ج — تاريخ المحضر: 12/05/2024",
        "estCorrecte": false
      },
      {
        "id": 3903,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "تاريخ التوقيف: 15/05/2024 — تاريخ نهاية الحراسة: 14/05/2024",
        "estCorrecte": true
      },
      {
        "id": 3904,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "الضابط المشرف: ملازم أول س.م — الوحدة: المركز الترابي",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 40,
    "code": "Q-ATT-040",
    "categorie": "التركيز والانتباه",
    "categorie_code": "ATTENTION",
    "texte": "يقود دركي دراجة نارية في موكب رسمي بسرعة 80 كم/س. تتطلب القيادة تقسيم الانتباه (Attention partagée) بين مسار الطريق وحركة كبار الشخصيات. ما هو السلوك الصحيح لتفادي تشتت الانتباه؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "تقسيم الانتباه الحركي",
      "التركيز أثناء القيادة التكتيكية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 3
      },
      {
        "code": "SPEC-GEH",
        "specialite": "GEH",
        "poids": 2
      }
    ],
    "explication": "الانتباه المقسم يعتمد على المسح البصري الديناميكي السريع (الطريق، المرايا، الموكب) مع المحافظة على مسافة أمان ثابتة والتركيز على مسار التوجيه الأساسي لمنع حوادث الاصطدام.",
    "options": [
      {
        "id": 4001,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "التركيز التام على شاشة الهاتف دون النظر إلى الطريق أمام الدراجة",
        "estCorrecte": false
      },
      {
        "id": 4002,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "المسح البصري التناوبي السريع مع تثبيت مسافة الأمان وتركيز الرؤية المحورية على مسار السير",
        "estCorrecte": true
      },
      {
        "id": 4003,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "الالتفات المستمر للخلف طوال فترة السير لمحادثة مرافق الموكب",
        "estCorrecte": false
      },
      {
        "id": 4004,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "إغلاق عيني السائق كل 10 ثوانٍ لتفادي جفاف العين",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 41,
    "code": "Q-ATT-041",
    "categorie": "التركيز والانتباه",
    "categorie_code": "ATTENTION",
    "texte": "أثناء مراقبة أوراق سيارة في نقطة تفتيش، لمح الدركي عبر الرؤية المحيطية (Peripheral vision) حركة سريعة ليد الراكب الخلفي تمتد نحو أسفل المقعد. ما هو رد الفعل الانتباهي والأمني السليم؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "الرؤية المحيطية واليقظة السريعة",
      "حماية الذات في التدخلات المباشرة"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 2.5
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2
      },
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 1.5
      }
    ],
    "explication": "حركة اليد المفاجئة لأسفل مقعد مشبوه قد تكون محاولة لسحب سلاح ناري أو إخفاء حرز؛ يجب فوراً إيقاف فحص الأوراق، وأخذ وضعية حماية، وإصدار أمر حازم بإظهار اليدين والتنسيق مع الزميل.",
    "options": [
      {
        "id": 4101,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "متابعة قراءة أوراق السيارة بهدوء دون أي اكتراث",
        "estCorrecte": false
      },
      {
        "id": 4102,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الانتقال فوراً لوضع التأهب الأمني، وأمر الراكب بإظهار يديه فوراً، وتنبيه الزميل المرافق",
        "estCorrecte": true
      },
      {
        "id": 4103,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "الابتسام للراكب والطلب منه مساعدته في البحث تحت الكرسي",
        "estCorrecte": false
      },
      {
        "id": 4104,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "الانسحاب التام والفرار من نقطة المراقبة سيراً على الأقدام",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 42,
    "code": "Q-ATT-042",
    "categorie": "التركيز والانتباه",
    "categorie_code": "ATTENTION",
    "texte": "في اختبار فحص التركيز الإداري، أي من المتتاليات الآتية تحتوي على عنصر دخيل لا ينتمي لباقي العناصر؟ المتتالية: [محضر معاينة، استدعاء رسمي، بطاقة زيارة، برقية عملياتية، قذيفة هاون]",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "الانتباه التصنيفي",
      "الفصل بين السياقات الإدارية والميدانية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 2.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 1.5
      }
    ],
    "explication": "جميع العناصر الأولى هي وثائق ومحررات إدارية وقضائية رسمية، بينما \"قذيفة هاون\" هي ذخيرة حربية مادية وسلاح، وبالتالي هي العنصر الدخيل منطقياً وتصنيفياً.",
    "options": [
      {
        "id": 4201,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "محضر معاينة",
        "estCorrecte": false
      },
      {
        "id": 4202,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "استدعاء رسمي",
        "estCorrecte": false
      },
      {
        "id": 4203,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "قذيفة هاون",
        "estCorrecte": true
      },
      {
        "id": 4204,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "برقية عملياتية",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 43,
    "code": "Q-ATT-043",
    "categorie": "التركيز والانتباه",
    "categorie_code": "ATTENTION",
    "texte": "أثناء التعامل مع السلاح الفردي، ما هي القاعدة الذهبية الأولى التي تعبر عن الانتباه الأمني الصارم وتمنع إطلاق النار العرضي غير المقصود؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "قواعد الأمان والانتباه الصارم للأسلحة",
      "الانضباط التكتيكي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 2.5
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2
      },
      {
        "code": "SPEC-GEH",
        "specialite": "GEH",
        "poids": 1.5
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 1.5
      }
    ],
    "explication": "القاعدة الأولى للأمان في الأسلحة: اعتبار السلاح دائماً ملقماً وجاهزاً للإطلاق، وإبقاء الإصبع ممدداً خارج واقي الزناد (Pontet) حتى اتخاذ قرار الرماية الواعي.",
    "options": [
      {
        "id": 4301,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "إبقاء الإصبع دائماً ممتداً بمحاذاة الهيكل خارج واقي الزناد حتى تحديد الهدف وعزم الإطلاق",
        "estCorrecte": true
      },
      {
        "id": 4302,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "وضع الإصبع بإحكام على الزناد طوال فترة حمل السلاح والتجول به",
        "estCorrecte": false
      },
      {
        "id": 4303,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "توجيه فوهة السلاح نحو الزملاء عند التحدث معهم للتأكد من انتباههم",
        "estCorrecte": false
      },
      {
        "id": 4304,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "افتراض أن السلاح فارغ دائماً دون الحاجة للتأكد من مخزن الذخيرة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 44,
    "code": "Q-ATT-044",
    "categorie": "التركيز والانتباه",
    "categorie_code": "ATTENTION",
    "texte": "استقبل مأمور قاعة المواصلات اتصال استغاثة من مواطنة تصرخ بهستيريا قائلة: \"أنقذوني... بيت عمي قرب وادي إيسيل... سيارة كحلة دهست الدري الصغير ومشت بسرعة... الشارع 14 درب النخلة زنقة 3!\". ما العنوان الدقيق الذي يجب إرسال الدورية إليه فوراً؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "الاستماع الفعال واستخلاص البيانات الحرجة",
      "التركيز في بيئة الضغط النفسي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 2
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2
      },
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 1.5
      }
    ],
    "explication": "التركيز الانتقائي يقتضي فصل الصراخ والمشاعر الجانبية واستخلاص العنوان المحدد جغرافياً: درب النخلة، الشارع 14، زنقة 3، قرب وادي إيسيل.",
    "options": [
      {
        "id": 4401,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "منزل عمها في أي مدينة مجاورة",
        "estCorrecte": false
      },
      {
        "id": 4402,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "شارع 14، درب النخلة، زنقة 3، قرب وادي إيسيل",
        "estCorrecte": true
      },
      {
        "id": 4403,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "محطة القطار الرئيسية في مركز المدينة",
        "estCorrecte": false
      },
      {
        "id": 4404,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "أي دكان تجاري يبيع السيارات الكحلة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 45,
    "code": "Q-ATT-045",
    "categorie": "التركيز والانتباه",
    "categorie_code": "ATTENTION",
    "texte": "على شاشة رادار قياس السرعة، ظهرت في جزء من الثانية أربع مركبات في نفس المقطع: (السيارة أ: 98 كم/س)، (السيارة ب: 138 كم/س في طريق سرعتها القصوى 100 كم/س)، (الشاحنة ج: 75 كم/س)، (الحافلة د: 85 كم/س). أي مركبة تشكل الهدف الميداني الفوري لدركي الرادار؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "سرعة التمييز الإدراكي",
      "الضبط الراداري لمخالفات السرعة"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 3
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 1
      }
    ],
    "explication": "المركبة (ب) تسير بسرعة 138 كم/س متجاوزة السرعة القانونية بـ 38 كم/س، وهي المخالفة الجسيمة الفورية التي تستوجب إشعار نقطة التوقيف المتقدمة لاعتراضها.",
    "options": [
      {
        "id": 4501,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "السيارة (أ)",
        "estCorrecte": false
      },
      {
        "id": 4502,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "السيارة (ب)",
        "estCorrecte": true
      },
      {
        "id": 4503,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "الشاحنة (ج)",
        "estCorrecte": false
      },
      {
        "id": 4504,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "الحافلة (د)",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 46,
    "code": "Q-ATT-046",
    "categorie": "التركيز والانتباه",
    "categorie_code": "ATTENTION",
    "texte": "يقف دركي في صفوف تشكيل حفظ النظام العام أمام حشد غاضب يطلق هتافات واستفزازات لفظية. ما هو السلوك الذي يعكس أعلى درجات التركيز والانضباط العسكري؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "ضبط النفس ومقاومة التشتت الاستفزازي",
      "الانضباط في حفظ النظام"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2.5
      },
      {
        "code": "SPEC-GEH",
        "specialite": "GEH",
        "poids": 2
      },
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 1.5
      }
    ],
    "explication": "في مهام حفظ النظام، يجب الحفاظ على برودة الأعصاب، وتجاهل الاستفزازات اللفظية، والتركيز على تعليمات القائد وحماية التشكيل دون أي ردود أفعال انفعالية فردية.",
    "options": [
      {
        "id": 4601,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "الرد على المتظاهرين بنفس الألفاظ الاستفزازية لإثبات القوة الشخصية",
        "estCorrecte": false
      },
      {
        "id": 4602,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الحفاظ على الثبات والهدوء التام والتركيز الصارم على حماية الموقع وأوامر قائد التشكيل",
        "estCorrecte": true
      },
      {
        "id": 4603,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "الاندفاع الفردي نحو الحشد لضرب أول شخص يصرخ",
        "estCorrecte": false
      },
      {
        "id": 4604,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "مغادرة الصف والعودة إلى الشاحنة لشرب الشاي",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 47,
    "code": "Q-ATT-047",
    "categorie": "التركيز والانتباه",
    "categorie_code": "ATTENTION",
    "texte": "خلال الجرد اليومي لذخيرة مستودع الأسلحة (Armurerie)، يحتوي كل صندوق ذخيرة على 50 طلقة. إذا كان السجل يسجل استلام 10 صناديق كاملة وخرجت 3 دوريات كل دورية استلمت مخزنين بكل مخزن 15 طلقة، فكم طلقة يجب أن توجد بالتمام والكمال في المستودع بعد الجرد؟",
    "difficulte": "صعب",
    "difficulte_code": "DIFFICILE",
    "coefficient": 1.5,
    "competences": [
      "الحساب العملياتي الدقيق",
      "اليقظة في تدبير الذخيرة الحية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 2
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 1.5
      },
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 1.5
      }
    ],
    "explication": "إجمالي الرصيد المستلم: 10 صناديق × 50 طلقة = 500 طلقة. الذخيرة المصروفة: 3 دوريات × (2 مخزن × 15) = 3 × 30 = 90 طلقة. الرصيد المتبقي بدقة: 500 - 90 = 410 طلقات.",
    "options": [
      {
        "id": 4701,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "400 طلقة",
        "estCorrecte": false
      },
      {
        "id": 4702,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "410 طلقات بالضبط",
        "estCorrecte": true
      },
      {
        "id": 4703,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "420 طلقة",
        "estCorrecte": false
      },
      {
        "id": 4704,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "380 طلقة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 48,
    "code": "Q-ATT-048",
    "categorie": "التركيز والانتباه",
    "categorie_code": "ATTENTION",
    "texte": "أثناء تأمين تجمع جماهيري حاشد، أي من العلامات الجسدية التالية يمثل خطراً مستتراً يجب أن يلفت انتباه المراقب الأمني فوراً؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "الانتباه للمخاطر الخفية في التجمعات",
      "الملاحظة الأمنية الوقائية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 2.5
      },
      {
        "code": "SPEC-GEH",
        "specialite": "GEH",
        "poids": 2
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2
      }
    ],
    "explication": "ارتداء معطف شتوي ثقيل جداً في يوم صيفي حار مع تثبيت اليد تحت الإبط يشكل شذوذاً بيئياً وسلوكياً صريحاً (Anomalie comportementale) يشير لاحتمال حمل سلاح أو جسم محظور.",
    "options": [
      {
        "id": 4801,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "شخص يلوح بعلم وطني ويهتف بحماس",
        "estCorrecte": false
      },
      {
        "id": 4802,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "شخص يرتدي معطفاً سميكاً ومغلقاً في يوم صيفي شديد الحرارة ويده اليمنى ثابتة تحت المعطف",
        "estCorrecte": true
      },
      {
        "id": 4803,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "عائلة تتناول المثلجات بجانب الرصيف",
        "estCorrecte": false
      },
      {
        "id": 4804,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "مصور صحفي يحمل كاميرا معتمدة ببطاقة رسمية واضحة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 49,
    "code": "Q-ATT-049",
    "categorie": "التركيز والانتباه",
    "categorie_code": "ATTENTION",
    "texte": "في مهمة خفر ونقل معتقلين خطيرين لمسافة طويلة تزيد عن 6 ساعات بالسيارة، متى تبدأ مؤشرات هبوط التركيز الذهني الخطيرة بالظهور وكيف تتم معالجتها ميدانياً؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1,
    "competences": [
      "تدبير الإجهاد في المهام الحساسة",
      "الحفاظ على اليقظة العملياتية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2
      },
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2
      },
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 1.5
      }
    ],
    "explication": "الدراسات تثبت انخفاض التركيز بعد ساعتين من القيادة المتواصلة؛ الإجراء المهني هو التناوب بين عناصر الدورية والتوقف الأمني المخطط له في نقط دركية مؤمنة.",
    "options": [
      {
        "id": 4901,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "التركيز لا ينخفض أبداً مهما طالت المدة إذا كان الدركي شجاعاً",
        "estCorrecte": false
      },
      {
        "id": 4902,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "يبدأ الانخفاض بعد ساعتين من السياقة المتواصلة، ويجب التناوب على القيادة والتوقف في نقطة دركية مؤمنة",
        "estCorrecte": true
      },
      {
        "id": 4903,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "فتح النوافذ وقيادة السيارة بأقصى سرعة ممكنة لإنهاء المهمة في ساعة واحدة",
        "estCorrecte": false
      },
      {
        "id": 4904,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "إعطاء مقود السيارة للموقوف ليقود السيارة تحت مراقبة الدورية",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 50,
    "code": "Q-ATT-050",
    "categorie": "التركيز والانتباه",
    "categorie_code": "ATTENTION",
    "texte": "خلال تمشيط ليلي لغابة مشبوهة بواسطة مصابيح كاشفة، أي حركة بصرية يجب أن تكون أولوية الانتباه لدى الرامي الأمامي في فريق التدخل؟",
    "difficulte": "صعب",
    "difficulte_code": "DIFFICILE",
    "coefficient": 1.5,
    "competences": [
      "الانتباه الراداري التكتيكي",
      "الرماية والتمييز في الظلام"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 2.5
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2.5
      },
      {
        "code": "SPEC-GEH",
        "specialite": "GEH",
        "poids": 1
      }
    ],
    "explication": "في بيئة منخفضة الإضاءة، حركة الأغصان أو الوميض الفجائي على مستوى ارتفاع الإنسان أو حركة الظلال المتعارضة مع الريح هي مؤشر التهديد الفوري الذي يحدد تموضع الخصم.",
    "options": [
      {
        "id": 5001,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "متابعة حركة النجوم في السماء للتأكد من حالة الطقس",
        "estCorrecte": false
      },
      {
        "id": 5002,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "رصد أي انكسار مفاجئ للأغصان أو انعكاس ضوئي شاذ أو حركة ظل تتعارض مع اتجاه الرياح الطبيعية",
        "estCorrecte": true
      },
      {
        "id": 5003,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "التركيز التام على حذاء الدركي للتأكد من عدم اتساخه بالطين",
        "estCorrecte": false
      },
      {
        "id": 5004,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "إطفاء جميع الكشافات والجلوس للنوم حتى بزوغ شمس الصباح",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 51,
    "code": "Q-DEC-051",
    "categorie": "حل المشكلات واتخاذ القرار",
    "categorie_code": "DECISION",
    "texte": "وصلت دورية درك ملكي أولاً إلى مسرح حادث سير خطير على طريق سيار مظلم، حيث توجد سيارة محطمة بوسط الطريق مع مصاب بداخلها وشاحنات مسرعة قادمة. ما هو القرار القيادي والعملياتي الأول الذي يجب تنفيذه فوراً؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "ترتيب الأولويات في الطوارئ",
      "اتخاذ القرار تحت الضغط الشديد"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2.5
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 1
      }
    ],
    "explication": "القاعدة الذهبية الميدانية (حماية - إشعار - إنقاذ PAS): تأمين المسرح بوضع إشارات التحذير الضوئية والمثلثة لمسافة كافية لمنع حادث تصادمي متسلسل، ثم طلب الإسعاف وتقديم الإسعافات.",
    "options": [
      {
        "id": 5101,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "البدء الفوري في استجواب المصاب داخل السيارة وتحرير محضر المخالفة",
        "estCorrecte": false
      },
      {
        "id": 5102,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "تأمين وحماية مكان الحادث بتشوير تحذيري عاجل ومسافة أمان لمنع وقوع حوادث دهس متسلسلة",
        "estCorrecte": true
      },
      {
        "id": 5103,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "سحب السيارة المحطمة فوراً بواسطة حبل يدوي دون تشوير ضوئي",
        "estCorrecte": false
      },
      {
        "id": 5104,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "مغادرة المكان والذهاب للبحث عن رافعة خاصة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 52,
    "code": "Q-DEC-052",
    "categorie": "حل المشكلات واتخاذ القرار",
    "categorie_code": "DECISION",
    "texte": "أثناء توقيف مخالف، بدأ السائق بالصراخ وإثارة الفوضى واستفزاز المارة للتجمهر حول الدورية، مدعياً تعرضه للظلم بهدف إرباك رجال الدرك. ما القرار الحكيم والاحترافي لحل هذه الأزمة؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "إدارة النزاعات والمواقف المتوترة",
      "الهدوء والسيطرة الميدانية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2.5
      },
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 1.5
      }
    ],
    "explication": "التصرف المهني يعتمد على امتصاص الغضب، وتهدئة النبرة، وعزل الشخص عن الفضوليين، وطلب تعزيز إذا لزم، وتطبيق القانون بصرامة وهدوء دون الانجرار للاستفزاز.",
    "options": [
      {
        "id": 5201,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "مبادلته الصراخ واستعمال العنف الجسدي الفوري أمام الجمهور",
        "estCorrecte": false
      },
      {
        "id": 5202,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الحفاظ على الهدوء والصرامة، وإبعاد الفضوليين، وتطبيق المساطر القانونية بثبات ودون انفعال",
        "estCorrecte": true
      },
      {
        "id": 5203,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "تمزيق وثائق السائق وتركه يغادر دون تحرير أي مخالفة",
        "estCorrecte": false
      },
      {
        "id": 5204,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "الاستسلام لمطالبه والاعتذار له أمام المارة تفادياً للإحراج",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 53,
    "code": "Q-DEC-053",
    "categorie": "حل المشكلات واتخاذ القرار",
    "categorie_code": "DECISION",
    "texte": "اخترقت سيارة مشبوهة تسير بسرعة جنونية حاجزاً دركياً متسببة في تحطيم السلاسل المسمارية دون إصابة العناصر، وفرت هاربة في اتجاه طريق سريع. ما القرار القيادي المتوافق مع قواعد استخدام السلاح والتدرج الأمني؟",
    "difficulte": "صعب",
    "difficulte_code": "DIFFICILE",
    "coefficient": 1.5,
    "competences": [
      "اتخاذ القرار التكتيكي الحاسم",
      "قواعد استخدام السلاح الوظيفي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 2.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 2
      },
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 1.5
      }
    ],
    "explication": "لا يجوز إطلاق النار على سيارة تبتعد لمجرد الفرار إذا لم يعد هناك خطر حال ومباشر على الحياة؛ القرار الصائب هو التعميم اللاسلكي الفوري، ونشر خطة تطويق عبر النقط الموالية.",
    "options": [
      {
        "id": 5301,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "إطلاق وابل عشوائي من الرصاص على زجاج السيارة الخلفي أثناء ابتعادها في الظلام",
        "estCorrecte": false
      },
      {
        "id": 5302,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "التعميم اللاسلكي الفوري لمواصفات المركبة وتنسيق خطة محاصرة وتطويق مع المراكز المجاورة",
        "estCorrecte": true
      },
      {
        "id": 5303,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "تجاهل الحادث تماماً واعتباره أمراً اعتيادياً لا يستدعي المتابعة",
        "estCorrecte": false
      },
      {
        "id": 5304,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "مغادرة الحاجز دون إشعار القيادة للبحث العشوائي في الشوارع الفرعية",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 54,
    "code": "Q-DEC-054",
    "categorie": "حل المشكلات واتخاذ القرار",
    "categorie_code": "DECISION",
    "texte": "كانت دورية متجهة لتوقيف مشتبه به في سرقة متجر، وأثناء سيرها عاينت طفلاً صغيراً صدمته دراجة نارية وهو ملقى على حافة الطريق ينزف في غياب أي مسعف. كيف يتم البت في هذا التعارض العملياتي؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "الموازنة الإنسانية والعملياتية",
      "الأولوية لإنقاذ الأرواح"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 2
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 1.5
      }
    ],
    "explication": "في فلسفة العمل الأمني والقانوني، الحفاظ على الحياة البشرية وإنقاذ الأرواح المعرضة للهلاك له الأولوية المطلقة على أي مهمة مادية؛ مع إشعار القاعة لتوجيه دورية أخرى للسرقة.",
    "options": [
      {
        "id": 5401,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "تجاهل الطفل ومتابعة الطريق لتوقيف سارق المتجر مهما كلف الأمر",
        "estCorrecte": false
      },
      {
        "id": 5402,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "التوقف الفوري لإسعاف الطفل وإنقاذ حياته وإشعار القاعة لتحويل مهمة السرقة لدورية أخرى",
        "estCorrecte": true
      },
      {
        "id": 5403,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "معاتبة الطفل على خروجه من المنزل ثم استكمال المسار",
        "estCorrecte": false
      },
      {
        "id": 5404,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "الانتظار في مكان الحادث دون تقديم أي مساعدة حتى قدوم والدي الطفل",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 55,
    "code": "Q-DEC-055",
    "categorie": "حل المشكلات واتخاذ القرار",
    "categorie_code": "DECISION",
    "texte": "تدخلت دورية لفض شجار دامٍ بين جيران، حيث يحمل أحد الأطراف سكيناً مهدداً بالطعن والطرف الآخر ممسك بعصا خشبية غليظة وسط صراخ عائلاتهم. ما هو التسلسل التكتيكي الحاسم لحل النزاع؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "إدارة المواجهات المسلحة الخفيفة",
      "السيطرة الميدانية الفورية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 2.5
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 1.5
      }
    ],
    "explication": "التسلسل: 1- فرض مسافة أمان وتوجيه إنذار صارم بإلقاء الأسلحة، 2- الفصل الجسدي بين الخصمين، 3- شل حركة المعتدي ونزع السلاح، 4- حجز الأسلحة وفتح تحقيق قضائي.",
    "options": [
      {
        "id": 5501,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "الدخول وسط الشجار بالأيدي العارية دون تقييم المخاطر أو إنذار",
        "estCorrecte": false
      },
      {
        "id": 5502,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "فرض مسافة أمان، الإنذار الحازم بإلقاء الأسلحة، شل حركة حامل السلاح، وفصل الأطراف",
        "estCorrecte": true
      },
      {
        "id": 5503,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "تشجيع أحد الأطراف على ضرب الآخر لإنهاء الخلاف بسرعة",
        "estCorrecte": false
      },
      {
        "id": 5504,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "تصوير الشجار بالهاتف ونشره على الإنترنت لطلب آراء الجمهور",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 56,
    "code": "Q-DEC-056",
    "categorie": "حل المشكلات واتخاذ القرار",
    "categorie_code": "DECISION",
    "texte": "أثناء دورية استطلاعية في منطقة قروية نائية ليلاً، تعطل محرك سيارة الدورية تماماً مع انقطاع تغطية أجهزة الاتصال اللاسلكي وشبكة الهاتف في المنخفض الجغرافي. ما هو القرار الأنسب لمعالجة الموقف؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "التصرف في حالات الانعزال والخلل الفني",
      "التدبير الأمني للمخاطر"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2
      },
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 2
      },
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 1.5
      }
    ],
    "explication": "تأمين المركبة والسلاح أولاً، وتفادي تفرق العناصر، ثم الصعود التكتيكي المنظم لمرتفع جغرافي قريب لاستعادة التغطية اللاسلكية وإبلاغ القيادة ببيانات الموقع والعطل بدقة.",
    "options": [
      {
        "id": 5601,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "ترك السيارة والسلاح في الخلاء والمشي الفردي العشوائي نحو وجهات مجهولة",
        "estCorrecte": false
      },
      {
        "id": 5602,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "تأمين السيارة، بقاء عنصرين معاً، والصعود التكتيكي لمرتفع قريب لاستعادة الاتصال بالقيادة",
        "estCorrecte": true
      },
      {
        "id": 5603,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "إشعال النار في إطارات السيارة للتدفئة بانتظار الصباح",
        "estCorrecte": false
      },
      {
        "id": 5604,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "إطلاق جميع الرصاصات الحية في الهواء كإشارة استغاثة احتفالية",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 57,
    "code": "Q-DEC-057",
    "categorie": "حل المشكلات واتخاذ القرار",
    "categorie_code": "DECISION",
    "texte": "تحصن شخص مصاب باضطراب نفسي داخل منزله شاهراً بندقية صيد مهدداً بإطلاق النار على كل من يقترب من الباب. ما هو القرار القيادي الأكثر مطابقة للإجراءات العملياتية الحديثة؟",
    "difficulte": "صعب",
    "difficulte_code": "DIFFICILE",
    "coefficient": 1.5,
    "competences": [
      "تدبير الأزمات ذات التهديد المسلح",
      "تجميد الموقف والتدخل المتخصص"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 3
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 1
      }
    ],
    "explication": "قاعدة تجميد الموقف (Gel de la situation): ضرب طوق أمني وإخلاء المحيط المباشر لمنع أي إصابات للمدنيين، وإطلاق مسار التفاوض، واستدعاء الفرق المتخصصة بالاقتحام (GSI).",
    "options": [
      {
        "id": 5701,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "اقتحام المنزل فوراً وبشكل منفرد عبر كسر الباب الرئيسي بالقدم",
        "estCorrecte": false
      },
      {
        "id": 5702,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "تجميد الوضع، إقامة طوق أمني محكم، إخلاء الجوار، وتفعيل مسار التفاوض واستدعاء القوات الخاصة",
        "estCorrecte": true
      },
      {
        "id": 5703,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "مغادرة الموقع وتركه لحين نفاد ذخيرته تلقائياً دون أي مراقبة",
        "estCorrecte": false
      },
      {
        "id": 5704,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "السماح للفضوليين والجيران بالدخول لإقناعه بالعدول عن موقفه",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 58,
    "code": "Q-DEC-058",
    "categorie": "حل المشكلات واتخاذ القرار",
    "categorie_code": "DECISION",
    "texte": "خلال تفتيش قانوني لمنزل مشتبه به في قضية سرقة مواشٍ بإذن قضائي، عثرت عناصر الدرك على كيس كبير يحتوي على مادة مخدرة بيضاء مهيأة للتوزيع لم تكن ضمن موضوع الإذن الأصلي. كيف يتم اتخاذ القرار الإجرائي السليم؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "الشرعية الإجرائية في التفتيش",
      "التعامل مع الجرائم المتلبس بها العارضة"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2.5
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 1
      }
    ],
    "explication": "العثور على جريمة مخدرات يشكل حالة تلبس عارضة (Flagrance)؛ يجب حجز المادة فوراً، وتحرير محضر بالواقعة العارضة، وإشعار النيابة العامة فوراً لتوسيع نطاق البحث.",
    "options": [
      {
        "id": 5801,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "إتلاف الكيس في المرحاض فوراً لأن الإذن لم ينص عليه",
        "estCorrecte": false
      },
      {
        "id": 5802,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "حجز المخدرات، تحرير محضر بالتلبس، وإشعار وكيل الملك فوراً لتلقي التعليمات الإجرائية",
        "estCorrecte": true
      },
      {
        "id": 5803,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "أخذ المخدرات وإخفاؤها في المنزل دون تدوينها بالمحضر",
        "estCorrecte": false
      },
      {
        "id": 5804,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "ترك المخدرات مكانها واستكمال البحث عن المواشي فقط دون أي ذكر للواقعة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 59,
    "code": "Q-DEC-059",
    "categorie": "حل المشكلات واتخاذ القرار",
    "categorie_code": "DECISION",
    "texte": "تسببت أمطار طوفانية مفاجئة في محاصرة مدرسة ابتدائية قروية بمياه الفيضانات المتصاعدة بسرعة، وبنفس الوقت أبلغ فلاح عن غرق قطيعه في مزرعة مجاورة. أين يتم توجيه جهد الإنقاذ الفوري؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "الأولويات في الكوارث الطبيعية",
      "حماية الفئات الهشة والمستضعفة"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2.5
      },
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 1.5
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 1.5
      }
    ],
    "explication": "إنقاذ حياة الأطفال والتلاميذ في المدرسة له الأولوية القصوى والمطلقة وغير القابلة للنقاش قبل أي ممتلكات أو حيوانات أو خسائر مادية في حالات الكوارث.",
    "options": [
      {
        "id": 5901,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "توجيه كل القوات لإنقاذ رؤوس الأغنام لتقليل الخسائر المالية",
        "estCorrecte": false
      },
      {
        "id": 5902,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "التوجه الفوري لتأمين وإخلاء تلاميذ المدرسة والأطر التربوية إلى منطقة آمنة ومرتفعة",
        "estCorrecte": true
      },
      {
        "id": 5903,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "الانتظار حتى انتهاء الأمطار لتفقد المدرسة والمزرعة معاً",
        "estCorrecte": false
      },
      {
        "id": 5904,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "إغلاق أبواب المدرسة بالمفاتيح لمنع خروج التلاميذ للسباحة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 60,
    "code": "Q-DEC-060",
    "categorie": "حل المشكلات واتخاذ القرار",
    "categorie_code": "DECISION",
    "texte": "أثناء مهمة ميدانية مشتركة، نشب خلاف حاد وتبادل كلامي غير لائق بين دركيين من نفس الرتبة بسبب توزيع المهام أمام مرأى المواطنين. كيف يتدخل رئيس الدورية لحل المشكلة فوراً؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "القيادة العسكرية وإدارة الخلافات",
      "هيبة السلك والحفاظ على المظهر العام"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 2.5
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2
      },
      {
        "code": "SPEC-GEH",
        "specialite": "GEH",
        "poids": 1.5
      }
    ],
    "explication": "إيقاف الجدال فوراً وبصرامة قيادية، والفصل بينهما لتأمين إنجاز المهمة، وتأجيل المعالجة التأديبية والنفسية لجلسة مغلقة داخل الوحدة بعيداً عن أعين الجمهور.",
    "options": [
      {
        "id": 6001,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "السماح لهما بالتشابك بالأيدي لمعرفة من الأقوى والأحق بالرأي",
        "estCorrecte": false
      },
      {
        "id": 6002,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "إيقاف الخلاف بحزم فوري، فصلهما ميدانياً لإنجاز الواجب، وتأجيل المساءلة التأديبية للمقر",
        "estCorrecte": true
      },
      {
        "id": 6003,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "أخذ جانب أحدهما ضد الآخر بناء على الصداقة الشخصية",
        "estCorrecte": false
      },
      {
        "id": 6004,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "مغادرة المهمة وترك الدركيين يتشاجران بمفردهما في الشارع",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 61,
    "code": "Q-DEC-061",
    "categorie": "حل المشكلات واتخاذ القرار",
    "categorie_code": "DECISION",
    "texte": "تلقى مركز دركي إشعاراً باقتراب حافلة تنقل مشجعين متعصبين يثيرون الفوضى على الطريق، بينما القوة المتوفرة بالمركز في تلك اللحظة لا تتعدى دركيين اثنين. ما هو القرار الأمني الحكيم؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "تقدير ميزان القوى العملياتي",
      "تجنب الوقوع في كمائن التفوق العددي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2.5
      },
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2
      },
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 1.5
      }
    ],
    "explication": "اعتراض حافلة حاشدة بعنصرين فقط يعرض سلامة الأفراد للخطر المحقق؛ القرار هو طلب الدعم من القيادة وتنسيق نقطة اعتراض مشتركة بأعداد كافية وموقع استراتيجي آمن.",
    "options": [
      {
        "id": 6101,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "اعتراض الحافلة بمفردهما والدخول في مواجهة جسدية مباشرة مع 50 مشجعاً",
        "estCorrecte": false
      },
      {
        "id": 6102,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "طلب التعزيز الفوري والتنسيق لتوقيف الحافلة في نقطة مراقبة مجهزة وبقوة عددية كافية",
        "estCorrecte": true
      },
      {
        "id": 6103,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "إغلاق المركز الدركي والهروب من المنطقة بأكملها",
        "estCorrecte": false
      },
      {
        "id": 6104,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "رمي الحجارة على نوافذ الحافلة لإجبارها على التوقف",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 62,
    "code": "Q-DEC-062",
    "categorie": "حل المشكلات واتخاذ القرار",
    "categorie_code": "DECISION",
    "texte": "أثناء استراحة غداء بمطعم على الطريق، لاحظ دركي أن صاحب المطعم يرفض تسلم ثمن الوجبة ويصر قائلاً: \"أنتم رجال درك ونحن في خدمتكم دائماً بلا مقابل\". ما هو القرار المهني والأخلاقي الصارم الواجب اتخاذه؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "النزاهة والاستقامة الأخلاقية",
      "احترام مدونة السلوك الوظيفي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 2.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 2
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 1.5
      }
    ],
    "explication": "الامتناع التام عن قبول أي هدايا أو خدمات مجانية مهما كانت بسيطة لأنها تمس بمبدأ الحياد والتجرد، والإصرار المؤدب والحاسم على دفع الفاتورة كاملة مع الحصول على وصل.",
    "options": [
      {
        "id": 6201,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "قبول الوجبة مجاناً ودعوة جميع المعارف لتناول وجبات مجانية يومياً",
        "estCorrecte": false
      },
      {
        "id": 6202,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "رفض المجانية بأدب وحزم والإصرار التام على دفع الثمن المستحق صيانة للكرامة والحياد المؤسساتي",
        "estCorrecte": true
      },
      {
        "id": 6203,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "طلب وجبات إضافية لأخذها إلى المنزل بالمجان أيضاً",
        "estCorrecte": false
      },
      {
        "id": 6204,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "اعتقال صاحب المطعم فوراً بتهمة الخيانة العظمى",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 63,
    "code": "Q-DEC-063",
    "categorie": "حل المشكلات واتخاذ القرار",
    "categorie_code": "DECISION",
    "texte": "عرض سائق شاحنة مخالف مبلغاً مالياً كبيراً مدسوساً داخل وثائق الشاحنة لتفادي حجز حمولته الزائدة. ما هو الإجراء الإداري والقضائي الحاسم الفوري؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "مكافحة الرشوة والفساد",
      "الشرعية في التثبيت الجنائي للرشوة"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2.5
      },
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2
      }
    ],
    "explication": "محاولة إرشاء موظف عمومي هي جناية/جنحة متلبس بها؛ يجب رفض الرشوة، وتوثيق الأوراق النقدية بحضور الزميل كحرز، وحجز السائق والمركبة وإشعار النيابة العامة فوراً.",
    "options": [
      {
        "id": 6301,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "أخذ نصف المبلغ المالي وتسهيل مرور الشاحنة",
        "estCorrecte": false
      },
      {
        "id": 6302,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "رفض المبلغ، حجز الأوراق المالية كحرز تلبس بجريمة الرشوة، توقيف السائق، وإشعار النيابة العامة",
        "estCorrecte": true
      },
      {
        "id": 6303,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "إعادة النقود للسائق مع تحذيره شفوياً فقط ومطالبته بالمغادرة السريعة",
        "estCorrecte": false
      },
      {
        "id": 6304,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "مفاوضته لزيادة المبلغ إلى الضعف قبل اتخاذ القرار",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 64,
    "code": "Q-DEC-064",
    "categorie": "حل المشكلات واتخاذ القرار",
    "categorie_code": "DECISION",
    "texte": "اندلع حريق مهول في مستودع للأسمدة الكيماوية بمحاذاة طريق جهوي رئيسي مع انبعاث غازات صفراء كثيفة خانقة. ما هو القرار التكتيكي الأسرع لحماية حركة المرور والساكنة؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "إدارة مخاطر المواد الخطرة",
      "التدابير الوقائية للسلامة العامة"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2.5
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 1
      }
    ],
    "explication": "الغازات الناتجة عن الكيماويات سامة وخانقة؛ يجب قطع الطريق فوراً من الاتجاهين على مسافة أمان، وتوجيه حركة المرور لمحاور بديلة، والتنسيق العاجل مع الوقاية المدنية.",
    "options": [
      {
        "id": 6401,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "السماح للسيارات بالمرور مسرعة وسط الدخان لاختبار قوة تحمل الركاب",
        "estCorrecte": false
      },
      {
        "id": 6402,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "قطع حركة السير من الجانبين، إقامة محاور تحويل آمنة، والتنسيق العاجل مع مصالح الإطفاء والوقاية",
        "estCorrecte": true
      },
      {
        "id": 6403,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "الدخول إلى المستودع المشتعل لاستنشاق الغازات والتأكد من نوعيتها دون قناع واقٍ",
        "estCorrecte": false
      },
      {
        "id": 6404,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "الانتظار حتى تحترق جميع الأسمدة بمفردها لفتح الطريق",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 65,
    "code": "Q-DEC-065",
    "categorie": "حل المشكلات واتخاذ القرار",
    "categorie_code": "DECISION",
    "texte": "رصدت دورية مبحوثاً عنه خطيراً في قضية اتجار دولي في المخدرات داخل سوق أسبوعي مكتظ بآلاف المتسوقين والأطفال. كيف يتم التخطيط لعملية التوقيف بنجاح؟",
    "difficulte": "صعب",
    "difficulte_code": "DIFFICILE",
    "coefficient": 1.5,
    "competences": [
      "التخطيط لعمليات التوقيف في الأماكن الحساسة",
      "حماية المدنيين من التدافع وردود الفعل العنيفة"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2.5
      },
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 2.5
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2
      }
    ],
    "explication": "التدخل المسلح وسط حشد كثيف قد يسبب تدافعاً مميتاً أو احتجاز رهائن؛ الصواب هو المراقبة السرية والتعقب حتى خروجه لمنطقة مكشوفة ومعزولة وتوقيفه بمباغتة تامة.",
    "options": [
      {
        "id": 6501,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "إطلاق النار في الهواء والصراخ باسم المشتبه به وسط حشود السوق لإخافته",
        "estCorrecte": false
      },
      {
        "id": 6502,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "فرض مراقبة سرية لصيقة، وتتبع تحركاته بهدوء حتى خروجه لمكان معزول لتوقيفه بمباغتة ودون تعريض المدنيين للخطر",
        "estCorrecte": true
      },
      {
        "id": 6503,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "استخدام القنابل المسيلة للدموع وسط خيام الخضار لتفريق السوق بأكمله",
        "estCorrecte": false
      },
      {
        "id": 6504,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "إلغاء التوقيف نهائياً ومسح اسم المبحوث عنه من قاعدة البيانات",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 66,
    "code": "Q-MOT-066",
    "categorie": "السلامة الطرقية وقيادة الدراجات",
    "categorie_code": "ROUTE_MOTO",
    "texte": "ما هو المسار الآمن النموذجي (Trajectoire de sécurité) الذي يتبعه دركي الدراجات النارية عند ولوج منعرج يمين غير مكشوف؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "تقنيات القيادة المتقدمة للدراجات",
      "تأمين مسار المنعرجات"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 3
      },
      {
        "code": "SPEC-GEH",
        "specialite": "GEH",
        "poids": 2
      }
    ],
    "explication": "المسار الآمن يعتمد على: التموضع بجانب محور الطريق (الخارج) لزيادة مدى الرؤية، وتوجيه النظرة لأبعد نقطة، ثم الالتفاف نحو الداخل فقط بعد انكشاف نهاية المنعرج.",
    "options": [
      {
        "id": 6601,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "الالتصاق التام بالحافة اليمنى الترابية قبل بداية المنعرج مع إغماض العينين",
        "estCorrecte": false
      },
      {
        "id": 6602,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "البقاء يسار مسلك السير لتوسيع زاوية الرؤية، مع توجيه النظر للمخرج والاقتراب من الداخل بعد انكشاف الرؤية",
        "estCorrecte": true
      },
      {
        "id": 6603,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "السير في المسلك المعاكس المعاكس تماماً بسرعة مضاعفة",
        "estCorrecte": false
      },
      {
        "id": 6604,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "الفرملة القصوى بالفرامل الخلفية وحدها مع قفل المقود",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 67,
    "code": "Q-MOT-067",
    "categorie": "السلامة الطرقية وقيادة الدراجات",
    "categorie_code": "ROUTE_MOTO",
    "texte": "لماذا تعد الدقائق العشرين الأولى من هطول الأمطار بعد فترة جفاف طويلة الفترة الأكثر خطورة لانزلاق المركبات والدراجات النارية على الطرق؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "فيزياء الالتصاق والالتحام الطرقي",
      "تقدير مخاطر الطقس الزلق"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 3
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 1.5
      }
    ],
    "explication": "اختلاط قطرات المطر الأولى بالغبار وبقايا الزيوت والمطاط المتراكمة على الإسفلت يشكل طبقة لزجة جداً تشبه الصابون تقلل معامل الاحتكاك إلى أدنى مستوياته قبل أن يغسلها المطر الغزير.",
    "options": [
      {
        "id": 6701,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "لأن محركات الدراجات تفقد 90% من قوتها الميكانيكية بمجرد ملامسة الماء",
        "estCorrecte": false
      },
      {
        "id": 6702,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "لاختلاط الماء بزيوت وغبار الطريق مشكلاً طبقة لزجة خطيرة جداً قبل غسلها بالماء الغزير",
        "estCorrecte": true
      },
      {
        "id": 6703,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "لأن إشارات المرور الضوئية تتوقف آلياً عند هطول أي قطرة مطر",
        "estCorrecte": false
      },
      {
        "id": 6704,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "لأن خوذة السائق تصبح ثقيلة جداً وتمنعه من رفع رأسه",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 68,
    "code": "Q-MOT-068",
    "categorie": "السلامة الطرقية وقيادة الدراجات",
    "categorie_code": "ROUTE_MOTO",
    "texte": "إذا كانت سيارة تسير بسرعة 90 كم/س على طريق جاف، فما هي المسافة التقريبية التي تقطعها خلال زمن رد الفعل البشري الطبيعي (المقدر بثانية واحدة) قبل أن يبدأ السائق بالضغط الفعلي على الفرامل؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "الحساب الحركي للسلامة الطرقية",
      "تقدير مسافة رد الفعل والتوقف"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 1.5
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 1.5
      }
    ],
    "explication": "القاعدة التقريبية لحساب المسافة المقطوعة في الثانية: رقم العشرات مضروباً في 3 (9 × 3 = 27 متراً)، أو حسابياً (90,000 متر ÷ 3600 ثانية = 25 متراً في الثانية).",
    "options": [
      {
        "id": 6801,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "حوالي 5 أمتار فقط",
        "estCorrecte": false
      },
      {
        "id": 6802,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "حوالي 25 إلى 27 متراً",
        "estCorrecte": true
      },
      {
        "id": 6803,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "أكثر من 150 متراً",
        "estCorrecte": false
      },
      {
        "id": 6804,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "السيارة تتوقف فوراً في نفس النقطة دون قطع أي متر",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 69,
    "code": "Q-MOT-069",
    "categorie": "السلامة الطرقية وقيادة الدراجات",
    "categorie_code": "ROUTE_MOTO",
    "texte": "في تشكيلات سير الدوريات ومواكب الدراجات النارية للدرك الملكي، ما هو التشكيل المعتمد لضمان السلامة ومسافة المناورة الكافية على الطرق المفتوحة؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "تشكيلات القيادة التكتيكية بالمواكب",
      "قواعد سير الدراجات في مجموعات"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 3
      },
      {
        "code": "SPEC-GEH",
        "specialite": "GEH",
        "poids": 2.5
      }
    ],
    "explication": "التشكيل المتعرج / التناوبي (Formation en quinconce) يمنح كل دراج رؤية أمامية واضحة ومسافة توقف مستقلة وكافية للمناورة في حال الفرملة المفاجئة دون الاصطدام بزميله.",
    "options": [
      {
        "id": 6901,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "السير في خط مستقيم متلاصق بعجلة تلامس العجلة الأخرى تماماً",
        "estCorrecte": false
      },
      {
        "id": 6902,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "التشكيل المتعرج التناوبي (Quinconce) لتأمين مسافة أمان ورؤية كافية لكل دراج",
        "estCorrecte": true
      },
      {
        "id": 6903,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "السير العرضي جنباً إلى جنب لاحتلال كامل عرض الطريق ومنع أي سيارة من المرور",
        "estCorrecte": false
      },
      {
        "id": 6904,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "إطفاء جميع الأضواء والسير دون ترتيب مسبق",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 70,
    "code": "Q-MOT-070",
    "categorie": "السلامة الطرقية وقيادة الدراجات",
    "categorie_code": "ROUTE_MOTO",
    "texte": "عند اقتراب سيارة إسعاف تشغل المنبهات الصوتية والأضواء الدوارة الزرقاء من ملتقى طرق ذي أسبقية لليمين، ما هو الواجب القانوني والعملياتي على باقي مستعملي الطريق؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "قوانين السير والمركبات ذات الأولوية",
      "السلامة الطرقية وتسهيل مهام الإنقاذ"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 2
      }
    ],
    "explication": "مركبات التدخل المستعجل التي تستعمل أجهزتها التحذيرية الخاصة تتمتع بالأولوية المطلقة؛ ويجب على جميع السائقين تخفيض السرعة وإفساح المسار فوراً والتوقف إذا لزم.",
    "options": [
      {
        "id": 7001,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "التسابق معها للوصول إلى الملتقى أولاً",
        "estCorrecte": false
      },
      {
        "id": 7002,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "تخفيف السرعة وإفساح المسلك فوراً والتوقف عند الاقتضاء لتسهيل مرورها الآمن",
        "estCorrecte": true
      },
      {
        "id": 7003,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "استخدام المنبه الصوتي للتشويش على صفارات الإنذار",
        "estCorrecte": false
      },
      {
        "id": 7004,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "تجاهلها تماماً والتمسك بأسبقية اليمين العادية",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 71,
    "code": "Q-MOT-071",
    "categorie": "السلامة الطرقية وقيادة الدراجات",
    "categorie_code": "ROUTE_MOTO",
    "texte": "ما هو العنصر الإجباري في معدات الحماية الفردية لدراج الدرك الملكي الذي يوفر الحماية القصوى لعظام الجمجمة والفك السفلي أثناء السقوط المباشر؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "معدات الحماية الفردية وتأمين الدراج",
      "السلامة المهنية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 3
      },
      {
        "code": "SPEC-GEH",
        "specialite": "GEH",
        "poids": 2
      }
    ],
    "explication": "الخوذة كاملة التغطية (Casque intégral) أو القابلة للتعديل والمقفلة والمطابقة للمواصفات توفر حماية حيوية شاملة لمنطقة الرأس وعظام الوجه والفك، بخلاف الخوذات المفتوحة.",
    "options": [
      {
        "id": 7101,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "القبعة العسكرية القماشية الخفيفة",
        "estCorrecte": false
      },
      {
        "id": 7102,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الخوذة الواقية المدمجة (Casque intégral) المعتمدة وذات الحماية الفكية الكاملة",
        "estCorrecte": true
      },
      {
        "id": 7103,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "نظارات شمسية عادية دون أي خوذة",
        "estCorrecte": false
      },
      {
        "id": 7104,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "وشاح صوفي يلف حول الرقبة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 72,
    "code": "Q-MOT-072",
    "categorie": "السلامة الطرقية وقيادة الدراجات",
    "categorie_code": "ROUTE_MOTO",
    "texte": "تفاجأ دراج دركي بوجود عائق طرقي صلب (إطار شاحنة منسلخ) على مساره ولا مجال لتفاديه يمنة أو يسرة. ما هي التقنية الصحيحة لعبور العائق بأمان وتفادي الانقلاب؟",
    "difficulte": "صعب",
    "difficulte_code": "DIFFICILE",
    "coefficient": 1.5,
    "competences": [
      "تقنيات المناورة واجتياز العوائق الخطرة",
      "التحكم الديناميكي بالدراجة"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 3
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 1.5
      }
    ],
    "explication": "إبطاء السرعة في خط مستقيم قبل العائق، ثم تحرير الفرامل تماماً، وإبقاء المقود عمودياً ومستقيماً، والوقوف الخفيف على مساند الأرجل لامتصاص الصدمة وتخفيف الحمل على المقود.",
    "options": [
      {
        "id": 7201,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "الضغط الأقصى على الفرامل الأمامية في لحظة ملامسة العائق تماماً",
        "estCorrecte": false
      },
      {
        "id": 7202,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الفرملة المسبقة باستقامة، ثم تحرير الفرامل، وإبقاء المقود مستقيماً مع الوقوف الخفيف على مساند الأقدام",
        "estCorrecte": true
      },
      {
        "id": 7203,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "إمالة الدراجة على جانبها والانزلاق عمداً تحت العائق",
        "estCorrecte": false
      },
      {
        "id": 7204,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "القفز من فوق الدراجة وتركها تصطدم بمفردها",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 73,
    "code": "Q-MOT-073",
    "categorie": "السلامة الطرقية وقيادة الدراجات",
    "categorie_code": "ROUTE_MOTO",
    "texte": "خلال مراقبة حمولة شاحنات الوزن الثقيل، ما هو المؤشر القانوني والميداني الذي يثبت وجود مخالفة الحمولة الزائدة (Surcharge) الخطيرة على البنية الطرقية وسلامة الفرملة؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "مراقبة النقل الطرقي والوزن الثقيل",
      "التطبيق الصارم لمدونة السير"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 2
      }
    ],
    "explication": "تجاوز الوزن الإجمالي المأذون به محملة (PTAC / MMA) المسجل في شهادة التسجيل ولوحة الصانع، ويتم تأكيده قانونياً عبر قياس الوزن في محطة وزن معتمدة (Pont-bascule).",
    "options": [
      {
        "id": 7301,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "طول قامة سائق الشاحنة مقارنة بالمقصورة",
        "estCorrecte": false
      },
      {
        "id": 7302,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "تجاوز الوزن الإجمالي المأذون به مع الحمولة (PTAC) الموثق عبر قياس الميزان الجسري المعتمد",
        "estCorrecte": true
      },
      {
        "id": 7303,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "لون غطاء الحمولة المشمع",
        "estCorrecte": false
      },
      {
        "id": 7304,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "عدد الملصقات الإعلانية الموجودة على هيكل الشاحنة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 74,
    "code": "Q-MOT-074",
    "categorie": "السلامة الطرقية وقيادة الدراجات",
    "categorie_code": "ROUTE_MOTO",
    "texte": "عند قيادة الدراجة النارية على قنطرة معلقة أو ممر مكشوف تضربه رياح جانبية عاتية، ما السلوك التكتيكي الصائب لمواجهة تمايل الدراجة المفاجئ؟",
    "difficulte": "صعب",
    "difficulte_code": "DIFFICILE",
    "coefficient": 1.5,
    "competences": [
      "السيطرة على توازن الدراجة في الرياح المعاكسة",
      "القيادة في الظروف الجوية القاسية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 3
      },
      {
        "code": "SPEC-GEH",
        "specialite": "GEH",
        "poids": 2
      }
    ],
    "explication": "تخفيض السرعة، وضغط الركبتين بإحكام على خزان الوقود، وإرخاء الذراعين قليلاً لتفادي نقل تذبذب الجذع للمقود، والميلان الطفيف باتجاه هبوب الريح لتحقيق التوازن.",
    "options": [
      {
        "id": 7401,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "زيادة السرعة إلى 180 كم/س للتغلب على الرياح بالقوة الحركية",
        "estCorrecte": false
      },
      {
        "id": 7402,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "تخفيف السرعة، ضم الركبتين للخزان، وتعديل الميلان باتجاه هبوب الريح مع إرخاء الشد على المقود",
        "estCorrecte": true
      },
      {
        "id": 7403,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "فتح المظلة اليدوية أثناء القيادة لصد الرياح الجانبية",
        "estCorrecte": false
      },
      {
        "id": 7404,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "رفع كلتا اليدين عن المقود والاعتماد على التوازن الطبيعي",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 75,
    "code": "Q-MOT-075",
    "categorie": "السلامة الطرقية وقيادة الدراجات",
    "categorie_code": "ROUTE_MOTO",
    "texte": "ما هو الفرق القانوني والإجرائي بين جهاز فحص الكحول بالنفس الأولي (Éthylotest) وجهاز قياس نسبة الكحول في الهواء الزفيري (Éthylomètre)؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "المساطر القانونية لقياس الكحول والمخدرات",
      "الضبط القضائي لمخالفات السير"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 2.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2
      }
    ],
    "explication": "جهاز الإيثيلوتيست هو وسيلة كشف وفرز نوعي سريع (إيجابي/سلبي)، بينما الإيثيلومتر جهاز معايرة قانوني معتمد يقيس التركيز الدقيق بالكيلوغرام/لتر وله حجية قضائية قاطعة بالمحضر.",
    "options": [
      {
        "id": 7501,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "لا يوجد أي فرق وكلاهما مجرد ألعاب إلكترونية توعوية",
        "estCorrecte": false
      },
      {
        "id": 7502,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الإيثيلوتيست للكشف التوجيهي السريع، بينما الإيثيلومتر جهاز معايرة رسمي معتمد يحدد النسبة القانونية بدقة للإثبات القضائي",
        "estCorrecte": true
      },
      {
        "id": 7503,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "الإيثيلومتر يستخدم فقط للسيارات العسكرية والإيثيلوتيست للمدنية",
        "estCorrecte": false
      },
      {
        "id": 7504,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "كلاهما يتطلب سحب عينة من دم السائق في قارورة بلاستيكية بالميدان",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 76,
    "code": "Q-MOT-076",
    "categorie": "السلامة الطرقية وقيادة الدراجات",
    "categorie_code": "ROUTE_MOTO",
    "texte": "أثناء السير السريع بالدراجة، حدث تذبذب واهتزاز عنيف في المقود والعجلة الأمامية (Guidonnage / Wobble). ما التصرف الميكانيكي السليم الذي يمنع السقوط الحتمي؟",
    "difficulte": "صعب",
    "difficulte_code": "DIFFICILE",
    "coefficient": 1.5,
    "competences": [
      "التعامل مع حالات الطوارئ الديناميكية للدراجة",
      "الإنقاذ من حوادث فقد السيطرة"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 3
      },
      {
        "code": "SPEC-GEH",
        "specialite": "GEH",
        "poids": 2
      }
    ],
    "explication": "الخطأ القاتل هو الكبح العنيف بالفرامل الأمامية؛ التصرف الصحيح هو تقليل الضغط على المقود برفق، وإغلاق الوقود تدريجياً، وترك فيزياء الدراجة تستعيد توازنها الذاتي.",
    "options": [
      {
        "id": 7601,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "الضغط بأقصى قوة وفجأة على مقبض الفرامل الأمامية لمحاولة قفل العجلة",
        "estCorrecte": false
      },
      {
        "id": 7602,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "عدم مقاومة المقود بتصلب عضلي، وتخفيف السرعة تدريجياً بالسماح للدراجة باستعادة توازنها التلقائي",
        "estCorrecte": true
      },
      {
        "id": 7603,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "النزول فوراً من الدراجة وهي تسير بسرعة 120 كم/س",
        "estCorrecte": false
      },
      {
        "id": 7604,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "تدوير المقود بالكامل إلى أقصى اليمين فجأة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 77,
    "code": "Q-MOT-077",
    "categorie": "السلامة الطرقية وقيادة الدراجات",
    "categorie_code": "ROUTE_MOTO",
    "texte": "عند وقوع حادث سير داخل منعرج خطير يحجب الرؤية، على أي مسافة يجب وضع مثلث العطب وأقماع التشوير التحذيرية قبل مدخل المنعرج؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "التشوير والإنذار الطرقي الاستباقي",
      "حماية مستعملي الطريق ومسرح الحادث"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2.5
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 1.5
      }
    ],
    "explication": "يجب وضع التشوير قبل المنعرج بمسافة لا تقل عن 100 إلى 150 متراً في الطرق المفتوحة لتمكين السائقين القادمين من الفرملة الآمنة قبل ولوج المنعرج ورؤية الحادث.",
    "options": [
      {
        "id": 7701,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "مباشرة ملاصقاً للسيارة المصدومة داخل المنعرج",
        "estCorrecte": false
      },
      {
        "id": 7702,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "قبل بداية المنعرج بمسافة كافية (100 إلى 150 متراً) لإنذار المركبات القادمة قبل انحجاب الرؤية",
        "estCorrecte": true
      },
      {
        "id": 7703,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "خلف الحادث بـ 200 متر في الاتجاه المعاكس الذي لا يمر منه أحد",
        "estCorrecte": false
      },
      {
        "id": 7704,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "إخفاء المثلث داخل صندوق الأمتعة تفادياً لسرقته",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 78,
    "code": "Q-MOT-078",
    "categorie": "السلامة الطرقية وقيادة الدراجات",
    "categorie_code": "ROUTE_MOTO",
    "texte": "في مهام مرافقة وحماية الشخصيات الهامة (VIP) بواسطة فرقة دراجي الدرك الملكي، ما هي المهمة الميدانية الحيوية للدراج \"الفاتح\" (Ouvreur / Éclaireur)؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "بروتوكول وتكتيك المواكب الرسمية",
      "تأمين مسارات السير السريعة"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2.5
      },
      {
        "code": "SPEC-GEH",
        "specialite": "GEH",
        "poids": 3
      }
    ],
    "explication": "الدراج الفاتح يتقدم الموكب بمسافة استطلاعية لتطهير المسار، وقطع وتأمين ملتقيات الطرق الحساسة، والتأكد من خلو المسار من أي عوائق قبل وصول سيارة الشخصية المحمية.",
    "options": [
      {
        "id": 7801,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "التقاط الصور التذكارية للموكب من الأمام",
        "estCorrecte": false
      },
      {
        "id": 7802,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "استطلاع المسار المتقدم، إغلاق وتأمين التقاطعات الحيوية، وضمان تدفق سير الموكب دون توقف",
        "estCorrecte": true
      },
      {
        "id": 7803,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "حمل حقائب الأمتعة الخاصة بالضيوف وتوزيع المشروبات",
        "estCorrecte": false
      },
      {
        "id": 7804,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "مراقبة سرعة الموكب من الخلف وتسجيل مخالفات لسيارات الحراسة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 79,
    "code": "Q-MOT-079",
    "categorie": "السلامة الطرقية وقيادة الدراجات",
    "categorie_code": "ROUTE_MOTO",
    "texte": "ما هو الخطر الميكانيكي والفيزيائي المباشر الناتج عن السير بإطارات دراجة نارية منخفضة الضغط بشدة (Sous-gonflage) في يوم حار على الطريق السيار؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "الصيانة الوقائية لمركبات الدوريات",
      "معايير السلامة الميكانيكية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 3
      },
      {
        "code": "SPEC-GEH",
        "specialite": "GEH",
        "poids": 1.5
      }
    ],
    "explication": "نقص ضغط الإطار يسبب تشوهاً مستمراً لهيكله وارتفاعاً مفرطاً في درجة حرارته الداخلية نتيجة الاحتكاك الشديد، مما يؤدي إلى انفصال طبقات المطاط وانفجار الإطار فجأة.",
    "options": [
      {
        "id": 7901,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "تحسن سرعة الدراجة لتصل إلى سرعة الطائرات النفاثة",
        "estCorrecte": false
      },
      {
        "id": 7902,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "ارتفاع شديد في حرارة الإطار وتهتك أنسجته الداخلية مما يعرضه للانفجار الفجائي القاتل",
        "estCorrecte": true
      },
      {
        "id": 7903,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "انخفاض استهلاك الوقود إلى الصفر المطلق",
        "estCorrecte": false
      },
      {
        "id": 7904,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "تغير لون الهيكل الخارجي للدراجة إلى الأبيض",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 80,
    "code": "Q-MOT-080",
    "categorie": "السلامة الطرقية وقيادة الدراجات",
    "categorie_code": "ROUTE_MOTO",
    "texte": "أثناء مرافقة شاحنة ضخمة أو حافلة، أين تقع \"الزاوية الميتة\" (Angle mort) الأخطر التي يختفي فيها دراج الدرك تماماً عن رؤية سائق الشاحنة في مراياه العاكسة؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "إدراك الزوايا الميتة للمركبات الثقيلة",
      "التمركز التكتيكي الآمن للدراج"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 3
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 1.5
      }
    ],
    "explication": "المنطقة المحاذية للجانب الأيمن الخلفي للرأس الجرار مباشرة وأسفل زجاج الأبواب الجانبية هي أوسع زاوية ميتة؛ القاعدة الذهبية: \"إذا لم تكن قادراً على رؤية وجه السائق في مرآته، فهو حتماً لا يراك\".",
    "options": [
      {
        "id": 8001,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "على بعد 100 متر أمام الشاحنة في خط مستقيم ومكشوف",
        "estCorrecte": false
      },
      {
        "id": 8002,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "بمحاذاة الجانب الأيمن والأمام والخلف المباشر للمركبة حيث تعجز المرايا عن كشف الدراج",
        "estCorrecte": true
      },
      {
        "id": 8003,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "فوق سقف مقصورة الشاحنة مباشرة",
        "estCorrecte": false
      },
      {
        "id": 8004,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "الزوايا الميتة غير موجودة إطلاقاً في الشاحنات الحديثة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 81,
    "code": "Q-ENQ-081",
    "categorie": "الشرطة القضائية والتحري",
    "categorie_code": "PJ_ENQUETE",
    "texte": "عند الوصول إلى مسرح جريمة قتل غامضة في شقة سكنية، ما هو الالتزام القانوني والمهني الأول لضابط الشرطة القضائية قبل الشروع في أي بحث؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "تجميد وحماية مسرح الجريمة",
      "الحفاظ على الآثار والأدلة المادية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 2
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 1.5
      }
    ],
    "explication": "تجميد وحماية مسرح الجريمة (Gel des lieux) بضرب شريط أمني عازل ومنع دخول أي شخص غير مختص لتفادي تلويث أو إتلاف الآثار المادية والبيولوجية قبل وصول الشرطة العلمية والتقنية.",
    "options": [
      {
        "id": 8101,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "تنظيف الأرضية فوراً بالماء ومواد التطهير لراحة المحققين",
        "estCorrecte": false
      },
      {
        "id": 8102,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "تجميد مسرح الجريمة ومنع الولوج إليه ووضع طوق أمني لحماية الأدلة الجنائية من التلوث",
        "estCorrecte": true
      },
      {
        "id": 8103,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "فتح النوافذ وجمع الجيران والأقارب داخل الغرفة لتبادل الآراء",
        "estCorrecte": false
      },
      {
        "id": 8104,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "نقل الجثة إلى سيارة الدورية دون إشعار النيابة العامة أو الطبيب الشرعي",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 82,
    "code": "Q-ENQ-082",
    "categorie": "الشرطة القضائية والتحري",
    "categorie_code": "PJ_ENQUETE",
    "texte": "وفقاً لقانون المسطرة الجنائية، ما هو الإجراء الإلزامي الذي يجب على ضابط الشرطة القضائية القيام به فور وضع شخص تحت تدبير الحراسة النظرية؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "ضمانات الحراسة النظرية وحقوق الإنسان",
      "المسطرة الجنائية والشرعية الإجرائية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2.5
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 1.5
      }
    ],
    "explication": "إشعار الشخص بدواعي توقيفه وحقوقه القانونية (التزام الصمت، الاتصال بأحد أقربائه، الاستعانة بمحامٍ، والحق في الفحص الطبي) وتدوين ذلك في سجل رسمي ومحضر قانوني.",
    "options": [
      {
        "id": 8201,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "إجباره على التوقيع على محاضر بيضاء دون قراءتها",
        "estCorrecte": false
      },
      {
        "id": 8202,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "إشعاره بحقوقه القانونية (دواعي التوقيف، الاتصال بالعائلة، طلب محامٍ وفحص طبي) وتدوينها بالسجل",
        "estCorrecte": true
      },
      {
        "id": 8203,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "مصادرة ملابسه وحرمانه من شرب الماء طوال مدة الحراسة",
        "estCorrecte": false
      },
      {
        "id": 8204,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "إطلاق سراحه سراً إذا كان ينتمي لنفس المنطقة الجغرافية",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 83,
    "code": "Q-ENQ-083",
    "categorie": "الشرطة القضائية والتحري",
    "categorie_code": "PJ_ENQUETE",
    "texte": "عند رفع البصمات الإصبعية الكامنة (Empreintes latentes) من على سطح زجاجي ناعم بمسرح الجريمة، ما هي المادة والتقنية التقليدية الفعالة المعتمدة من طرف تقنيي الشرطة العلمية؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "الشرطة التقنية والعلمية",
      "إظهار ورفع البصمات الجنائية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 1.5
      }
    ],
    "explication": "استخدام المساحيق المغناطيسية أو الكربونية المتخصصة عبر فرشاة ريش ناعمة جداً لإظهار الإفرازات الدهنية العرقية المتروكة على الزجاج دون تشويه خطوط الحلمات الجلدية.",
    "options": [
      {
        "id": 8301,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "فرك الزجاج بقطعة قماش خشنة مبللة بالماء والصابون",
        "estCorrecte": false
      },
      {
        "id": 8302,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "تطبيق المسحوق المغناطيسي أو الكربوني المتخصص بفرشاة رقيقة لكشف الخطوط الحليمية بدقة",
        "estCorrecte": true
      },
      {
        "id": 8303,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "تسخين الزجاج بالنار المباشرة حتى يتصدع",
        "estCorrecte": false
      },
      {
        "id": 8304,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "رش الزجاج بطلاء أسود زيتي سميك لإخفاء الآثار",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 84,
    "code": "Q-ENQ-084",
    "categorie": "الشرطة القضائية والتحري",
    "categorie_code": "PJ_ENQUETE",
    "texte": "ما هي الأوقات القانونية العامة التي يُسمح فيها لضابط الشرطة القضائية بدخول المنازل لتفتيشها في الأحوال العادية وفق قانون المسطرة الجنائية؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "حرمة المسكن والإجراءات التفتيشية",
      "المسطرة الجنائية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2.5
      }
    ],
    "explication": "القاعدة العامة تصون حرمة المنازل: لا يمكن البدء في تفتيش المنازل أو معاينتها قبل الساعة السادسة صباحاً (06:00) ولا بعد التاسعة ليلاً (21:00)، إلا باستثناءات قانونية محددة حصراً.",
    "options": [
      {
        "id": 8401,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "بين الساعة 02:00 ليلاً و 05:00 فجراً حصراً",
        "estCorrecte": false
      },
      {
        "id": 8402,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "بين الساعة السادسة صباحاً (06:00) والتاسعة ليلاً (21:00)",
        "estCorrecte": true
      },
      {
        "id": 8403,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "في أي وقت يختاره الضابط دون قيد زمني طوال 24 ساعة",
        "estCorrecte": false
      },
      {
        "id": 8404,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "يوم الأحد فقط بين الظهر والعصر",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 85,
    "code": "Q-ENQ-085",
    "categorie": "الشرطة القضائية والتحري",
    "categorie_code": "PJ_ENQUETE",
    "texte": "لماذا تعد \"سلسلة الحراسة والحفظ\" (Chaîne de traçabilité des scellés) بالغة الحساسية والأهمية في القضايا الجنائية الكبرى؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "إدارة وتحريز الأدلة الجنائية",
      "حماية الحجية القانونية للمحجوزات"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 2.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2.5
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 1.5
      }
    ],
    "explication": "سلسلة الحفظ توثق هوية كل شخص استلم أو فحص الحرز وتوقيت ذلك لمنع أي شبهة استبدال أو تلاعب أو تلوث، مما يحمي الحجية القانونية للدليل أمام هيئة المحكمة.",
    "options": [
      {
        "id": 8501,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "لزيادة وزن الحرز والحصول على مكافأة مالية",
        "estCorrecte": false
      },
      {
        "id": 8502,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "لضمان عدم التلاعب بالدليل أو تلويثه وإثبات مشروعيته وسلامته القانونية أمام القضاء",
        "estCorrecte": true
      },
      {
        "id": 8503,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "للسماح للجمهور بالتقاط صور مع الأحراز في المعارض",
        "estCorrecte": false
      },
      {
        "id": 8504,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "لبيع الأحراز في المزاد العلني قبل صدور الحكم",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 86,
    "code": "Q-ENQ-086",
    "categorie": "الشرطة القضائية والتحري",
    "categorie_code": "PJ_ENQUETE",
    "texte": "في تقنيات الاستنطاق الحديثة (مثل نموذج PEACE)، ما هي المرحلة الأساسية التي يجب أن يبدأ بها المحقق قبل توجيه أي أسئلة تفصيلية للمشتبه به؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "تقنيات الاستماع والاستجواب الجنائي",
      "التحليل الاستقصائي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 3
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 1.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 1.5
      }
    ],
    "explication": "إتاحة الفرصة للمستمع إليه لتقديم روايته الحرة والمسترسلة للأحداث (Récit libre) دون مقاطعة لتدوين تفاصيلها، ثم الانتقال لمرحلة فحص التناقضات بالأسئلة الدقيقة.",
    "options": [
      {
        "id": 8601,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "الصراخ وتهديد المشتبه به بالعقوبات الشديدة لجعله ينهار فوراً",
        "estCorrecte": false
      },
      {
        "id": 8602,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "إتاحة الفرصة للمشتبه به لتقديم سرده الحر والتلقائي للأحداث قبل الانتقال للأسئلة الموجهة",
        "estCorrecte": true
      },
      {
        "id": 8603,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "تلقينه الإجابات التي يرغب المحقق في كتابتها بالمحضر",
        "estCorrecte": false
      },
      {
        "id": 8604,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "جعله يقسم على الولاء قبل بدء الجلسة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 87,
    "code": "Q-ENQ-087",
    "categorie": "الشرطة القضائية والتحري",
    "categorie_code": "PJ_ENQUETE",
    "texte": "عثر المحقق على بقعة دم رطبة على ملابس ضحية في جريمة اعتداء. كيف يتم أخذ هذه العينة البيولوجية وحفظها بشكل صحيح لتفادي تعفن الحمض النووي (ADN)؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "البيولوجيا الجنائية ورفع عينات ADN",
      "الشرطة العلمية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 1.5
      }
    ],
    "explication": "رفع العينة بمسحة معقمة وتركها تجف في درجة حرارة الغرفة بعيداً عن الرطوبة والشمس المباشرة، وتوضيبها في مظروف ورقي نافذ للهواء (وليس كيس بلاستيكي خانق يسبب تعفن العينة).",
    "options": [
      {
        "id": 8701,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "وضع العينة وهي مبللة داخل كيس بلاستيكي محكم الإغلاق وتركها في الشمس الحارة",
        "estCorrecte": false
      },
      {
        "id": 8702,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "أخذ العينة بمسحة معقمة، تجفيفها في الهواء الطلق، وتعبئتها في كيس ورقي جاف وبارد",
        "estCorrecte": true
      },
      {
        "id": 8703,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "غسل بقعة الدم بمحلول الكلور (ماء جافيل) لتطهيرها قبل التحليل",
        "estCorrecte": false
      },
      {
        "id": 8704,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "تجميد الملابس في الثلج المباشر مع اللحوم المجمدة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 88,
    "code": "Q-ENQ-088",
    "categorie": "الشرطة القضائية والتحري",
    "categorie_code": "PJ_ENQUETE",
    "texte": "أي من العناصر التالية يعد شكلياً وجوهرياً لصحة محضر الاستماع المنجز من طرف ضابط الشرطة القضائية تحت طائلة البطلان؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "صياغة المحاضر الجنائية",
      "الشكليات القانونية الإلزامية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2.5
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 2
      }
    ],
    "explication": "المحضر يجب أن يتضمن هوية الضابط وصفته، تاريخ وساعة الإجراء، تلاوة الأقوال على المصرح، وتوقيع المصرح أو الإشارة إلى امتناعه أو عجزه عن التوقيع.",
    "options": [
      {
        "id": 8801,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "أن يكون المحضر مكتوباً بحبر أحمر حصراً ومزيناً بالرسومات",
        "estCorrecte": false
      },
      {
        "id": 8802,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "ذكر صفة وهوية المحرر، التواريخ والساعات، قراءة الأقوال وتوقيع أو بصمة المصرح والضابط",
        "estCorrecte": true
      },
      {
        "id": 8803,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "إرفاق شهادة ميلاد جد الضابط مع كل محضر استماع",
        "estCorrecte": false
      },
      {
        "id": 8804,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "أن تتم طباعة المحضر في مطبعة عمومية خارج المركز",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 89,
    "code": "Q-ENQ-089",
    "categorie": "الشرطة القضائية والتحري",
    "categorie_code": "PJ_ENQUETE",
    "texte": "أي من الحالات التالية يعتبر حالة \"تلبس بالجناية أو الجنحة\" (Flagrant délit) تخول لضابط الشرطة القضائية صلاحيات استثنائية فورية؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "أحكام التلبس بالجريمة",
      "المسطرة الجنائية وسلطات OPJ"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2.5
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 1.5
      }
    ],
    "explication": "حالات التلبس قانوناً: إذا كانت الجريمة ترتكب عيناً أو ارتكبت حديثاً، أو إذا توبع الفاعل بصياح الجمهور إثر ارتكابها، أو إذا وجد بعد وقوعها بوقت قريب حاملاً أسلحة أو أشياء تثبت تورطه.",
    "options": [
      {
        "id": 8901,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "شكوى شفوية غامضة عن واقعة غير محددة حدثت قبل ثلاث سنوات",
        "estCorrecte": false
      },
      {
        "id": 8902,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "ضبط الفاعل في وقت ارتكاب الفعل الجرمي عيناً أو تتبعه بصياح وصخب الجمهور إثر ارتكابها",
        "estCorrecte": true
      },
      {
        "id": 8903,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "شخص يبدو عليه التعب أثناء تجوله في حديقة عامة",
        "estCorrecte": false
      },
      {
        "id": 8904,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "سماع إشاعة غير مؤكدة على تطبيق واتساب",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 90,
    "code": "Q-ENQ-090",
    "categorie": "الشرطة القضائية والتحري",
    "categorie_code": "PJ_ENQUETE",
    "texte": "عند تنظيم طابور عرض للتشخيص وتعرف الشهود على المشتبه به (Tapissage / Parade d'identification)، ما الشرط الأساسي لنزاهة العملية وعدم بطلانها؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "إجراءات تشخيص المشتبه بهم",
      "نزاهة التحقيق وتفادي التوجيه الإيحائي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 2.5
      }
    ],
    "explication": "وضع المشتبه به مع أشخاص آخرين (أشباه) يتقاربون معه في الملامح، والسن، والطول، والملابس، ودون تقديم أي إيحاء أو إشارة توجيهية للشاهد أثناء المعاينة.",
    "options": [
      {
        "id": 9001,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "وضع المشتبه به بمفرده مقيداً بالسلاسل والإشارة إليه بالقول \"هذا هو المجرم بالتأكيد\"",
        "estCorrecte": false
      },
      {
        "id": 9002,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "عرض المشتبه به وسط مجموعة من الأشخاص المماثلين له في السن والهيئة والبنية دون أي توجيه إيحائي",
        "estCorrecte": true
      },
      {
        "id": 9003,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "عرض صورة المشتبه به في التلفاز قبل بدء جلسة التعرف بساعة",
        "estCorrecte": false
      },
      {
        "id": 9004,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "جعل الشاهد مغمض العينين تماماً أثناء العرض",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 91,
    "code": "Q-ENQ-091",
    "categorie": "الشرطة القضائية والتحري",
    "categorie_code": "PJ_ENQUETE",
    "texte": "عند ضبط هاتف ذكي بحوزة مشتبه به رئيسي أثناء مداهمة أمنية، ما الإجراء الفني الفوري لحماية البيانات الرقمية من المسح عن بُعد (Effacement à distance)؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "المحافظة على الأدلة الرقمية",
      "التحقيق في الجريمة السيبرانية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2.5
      },
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 2.5
      }
    ],
    "explication": "عزل الهاتف فوراً عن أي شبكة اتصال بتفعيل \"نمط الطيران\" أو وضعه داخل غلاف عازل للإشارات الكهرومغناطيسية (Cage de Faraday) لمنع إرسال أمر مسح للذاكرة عبر الإنترنت.",
    "options": [
      {
        "id": 9101,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "توصيل الهاتف بشبكة الواي فاي العامة للمركز والبدء في تنزيل ألعاب",
        "estCorrecte": false
      },
      {
        "id": 9102,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "عزل الهاتف فوراً عن الشبكات (وضع الطيران أو كيس فاراداي العازل للموجات)",
        "estCorrecte": true
      },
      {
        "id": 9103,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "إدخال رمز سري خاطئ 20 مرة متتالية لقفل الجهاز",
        "estCorrecte": false
      },
      {
        "id": 9104,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "رمي الهاتف في إناء ماء بارد لحمايته من الحرارة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 92,
    "code": "Q-ENQ-092",
    "categorie": "الشرطة القضائية والتحري",
    "categorie_code": "PJ_ENQUETE",
    "texte": "عند الاستماع إلى طفل قاصر ضحية اعتداء جسدي عنيف، ما هي الشروط المسطرية والنفسية الواجب توفيرها لحماية مصلحة الطفل الفضلى؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "قضاء الأحداث وحماية الطفولة",
      "الاستماع الجنائي للفئات الحساسة"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 2.5
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 1.5
      }
    ],
    "explication": "الاستماع بحضور الولي الشرعي أو المساعد الاجتماعي، في قاعة ملائمة ومريحة نفسياً، وبأسلوب مبسط يتناسب مع سن الطفل وإدراكه ودون تكرار الأسئلة المسببة للصدمة.",
    "options": [
      {
        "id": 9201,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "استجواب الطفل في زنزانة الحراسة النظرية وهو مكبل اليدين",
        "estCorrecte": false
      },
      {
        "id": 9202,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الاستماع إليه في فضاء ملائم ومحفز نفسياً بحضور وليه الشرعي أو مساعد اجتماعي مع مراعاة سنه",
        "estCorrecte": true
      },
      {
        "id": 9203,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "نشر صورة الطفل في وسائل الإعلام لدعوة الجيران لحضور الجلسة",
        "estCorrecte": false
      },
      {
        "id": 9204,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "الضغط على الطفل للاعتراف بأنه هو المعتدي على نفسه",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 93,
    "code": "Q-ENQ-093",
    "categorie": "الشرطة القضائية والتحري",
    "categorie_code": "PJ_ENQUETE",
    "texte": "في عمليات الترصد والمراقبة البصرية (Filature) لشبكة تهريب دولية، ما هي التقنية الأساسية لتفادي \"حرق\" عناصر المراقبة وكشف أمرهم من طرف المشبوهين؟",
    "difficulte": "صعب",
    "difficulte_code": "DIFFICILE",
    "coefficient": 1.5,
    "competences": [
      "تقنيات المراقبة والترصد السري",
      "التحريات الميدانية المعقدة"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 3
      },
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 2
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 1.5
      }
    ],
    "explication": "اعتماد المراقبة التناوبية متعددة المركبات (Filature en relais)؛ حيث تتغير السيارات والأفراد المتابعون باستمرار وبفواصل مكانية لتفادي إثارة أي شك لدى الهدف.",
    "options": [
      {
        "id": 9301,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "تشغيل صفارات الإنذار وملاحقة الهدف من مسافة متر واحد فقط طوال الوقت",
        "estCorrecte": false
      },
      {
        "id": 9302,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "اعتماد المراقبة التناوبية المتبادلة بعدة سيارات غير مموهة وتغيير نقاط التتبع باستمرار وبمرونة",
        "estCorrecte": true
      },
      {
        "id": 9303,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "الاتصال بالمشتبه به هاتفياً لإخباره بأنه تحت المراقبة",
        "estCorrecte": false
      },
      {
        "id": 9304,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "استخدام سيارة واحدة بلون أحمر فاقع لا تتغير طوال 6 أشهر",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 94,
    "code": "Q-ENQ-094",
    "categorie": "الشرطة القضائية والتحري",
    "categorie_code": "PJ_ENQUETE",
    "texte": "ما هو السند القانوني الذي يُمكن ضابط الشرطة القضائية من مطالبة شركات الاتصالات بتحديد المواقع الجغرافية وسجلات مكالمات مشتبه به هارب؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "المسائل القانونية في التعقب الإلكتروني",
      "السخرة القضائية والأذونات"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2.5
      },
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 1.5
      }
    ],
    "explication": "توجيه تسخير قضائي رسمي (Réquisition judiciaire) بناءً على تعليمات النيابة العامة المختصة أو أمر قضائي صادر عن قاضي التحقيق وفق المقتضيات القانونية الصريحة.",
    "options": [
      {
        "id": 9401,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "مكالمة هاتفية ودية غير موثقة مع موظف الاستقبال بشركة الاتصالات",
        "estCorrecte": false
      },
      {
        "id": 9402,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "تسخير قضائي كتابي رسمي صادر وفق القانون وبإشراف مباشر من النيابة العامة المختصة",
        "estCorrecte": true
      },
      {
        "id": 9403,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "قرصنة خوادم الشركة بواسطة برامج تجسس مجهولة المصدر",
        "estCorrecte": false
      },
      {
        "id": 9404,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "شراء سجلات المكالمات من السوق السوداء",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 95,
    "code": "Q-ENQ-095",
    "categorie": "الشرطة القضائية والتحري",
    "categorie_code": "PJ_ENQUETE",
    "texte": "في مختبر البالستيك القضائي، كيف يتم إثبات أن رصاصة قاتلة معينة أُطلقت بالذات من مسدس مشتبه به محجوز وليس من أي سلاح آخر مماثل؟",
    "difficulte": "صعب",
    "difficulte_code": "DIFFICILE",
    "coefficient": 1.5,
    "competences": [
      "البالستيك المقارن والأسلحة النارية",
      "الخبرة الجنائية المخبرية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 2
      }
    ],
    "explication": "إجراء رمية اختبارية في حوض مائي بالمختبر، ثم مقارنة الخدوش والحلزونات الميكروسكوبية الدقيقة (Stries balistiques) الفريدة لسبطانة السلاح تحت المجهر المقارن.",
    "options": [
      {
        "id": 9501,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "مقارنة لون غلاف الرصاصة الخارجي بالعين المجردة فقط",
        "estCorrecte": false
      },
      {
        "id": 9502,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "فحص التطابق الميكروسكوبي للخدوش والآثار الميكانيكية الفريدة لسبطانة السلاح بواسطة المجهر المقارن",
        "estCorrecte": true
      },
      {
        "id": 9503,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "استنشاق رائحة البارود في فوهة المسدس بعد أسبوعين من الحادث",
        "estCorrecte": false
      },
      {
        "id": 9504,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "وزن المسدس بميزان المطبخ المنزلي",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 96,
    "code": "Q-NUM-096",
    "categorie": "المعلوماتية والمهارات الرقمية",
    "categorie_code": "INFORMATIQUE",
    "texte": "تلقى دركي بريداً إلكترونياً يبدو في ظاهره صادراً عن مديرية الاتصالات يطلب: \"تحديث عاجل لكلمة مرور الحساب العملياتي عبر الرابط المرفق خلال ساعتين لتفادي الحظر\". ما هو التوصيف السيبراني لهذه الهجمة وما هو السلوك الحذر الواجب؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "الأمن السيبراني والوعي بالتهديدات",
      "كشف التصيد الاحتيالي Phishing"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 3
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 2
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 1.5
      }
    ],
    "explication": "هذه محاولة تصيد احتيالي (Phishing) لسرقة بيانات الاعتماد؛ يجب عدم الضغط على أي رابط، والإبلاغ الفوري لمسؤول أمن نظم المعلومات (RSSI) بالوحدة.",
    "options": [
      {
        "id": 9601,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "إدخال كلمة المرور القديمة والجديدة فوراً لتفادي غضب المديرية",
        "estCorrecte": false
      },
      {
        "id": 9602,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "هجمة تصيد احتيالي (Phishing)؛ يجب الامتناع عن النقر وإبلاغ خلية أمن الأنظمة فوراً",
        "estCorrecte": true
      },
      {
        "id": 9603,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "إعادة إرسال البريد لجميع الأصدقاء والزملاء لتنبيههم برابط التحديث",
        "estCorrecte": false
      },
      {
        "id": 9604,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "الرد على البريد بكلمة سر تجريبية لاختبار نيتهم",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 97,
    "code": "Q-NUM-097",
    "categorie": "المعلوماتية والمهارات الرقمية",
    "categorie_code": "INFORMATIQUE",
    "texte": "أي من كلمات المرور التالية يمثل أعلى مستوى من القوة والمقاومة لهجمات التخمين الشامل (Brute-force) وفق معايير الأمان الرقمي الحديثة؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "إدارة وحماية كلمات المرور",
      "الأمان السيبراني الأساسي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 3
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 2
      }
    ],
    "explication": "كلمة المرور القوية تتكون من 12 رمزاً على الأقل تجمع بين حروف كبيرة وصغيرة وأرقام ورموز خاصة عشوائية دون تشكيل كلمات قاموسية معروفة.",
    "options": [
      {
        "id": 9701,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "12345678",
        "estCorrecte": false
      },
      {
        "id": 9702,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "Gendarme2024",
        "estCorrecte": false
      },
      {
        "id": 9703,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "T9$mK#8vL!q2@Z",
        "estCorrecte": true
      },
      {
        "id": 9704,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "password1234",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 98,
    "code": "Q-NUM-098",
    "categorie": "المعلوماتية والمهارات الرقمية",
    "categorie_code": "INFORMATIQUE",
    "texte": "ما هو الدور الأمني الرئيسي لجدار الحماية (Firewall / Pare-feu) في الشبكة المعلوماتية لمقر قيادة الدرك الملكي؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "هندسة وأمن الشبكات",
      "حماية الخوادم والاتصالات"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 1.5
      }
    ],
    "explication": "يقوم جدار الحماية بمراقبة وتصفية حركة البيانات الصادرة والواردة وفق قواعد أمنية صارمة، وحظر الاتصالات غير المصرح بها ومنع التسلل الخارجي إلى الخوادم الداخلية.",
    "options": [
      {
        "id": 9801,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "تبريد الغرفة المركزية بحفظ درجات الحرارة منخفضة",
        "estCorrecte": false
      },
      {
        "id": 9802,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "مراقبة وتصفية حزم البيانات المتبادلة وحظر المنافذ والاتصالات غير المصرح بها",
        "estCorrecte": true
      },
      {
        "id": 9803,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "طباعة التقارير الإدارية تلقائياً كل مساء",
        "estCorrecte": false
      },
      {
        "id": 9804,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "تسريع سرعة الرياح داخل صندوق الحاسوب",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 99,
    "code": "Q-NUM-099",
    "categorie": "المعلوماتية والمهارات الرقمية",
    "categorie_code": "INFORMATIQUE",
    "texte": "في خطط الحفاظ على البيانات الإدارية والقضائية من التلف أو الكوارث، ماذا تنص القاعدة الذهبية للنسخ الاحتياطي المعروفة بـ (قاعدة 3-2-1)؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "تدبير النسخ الاحتياطي وحماية المعطيات",
      "استمرارية العمليات الرقمية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 3
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 2.5
      }
    ],
    "explication": "الاحتفاظ بـ 3 نسخ من البيانات، على وسيطين (2) تخزين ماديين مختلفين (مثلاً: قرص صلب داخلي ووحدة تخزين سحابية/شريط)، ونسخة واحدة (1) على الأقل في موقع جغرافي خارجي مؤمن.",
    "options": [
      {
        "id": 9901,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "3 دقائق للطباعة، 2 صفحة لكل ورقة، 1 ملف لكل درج",
        "estCorrecte": false
      },
      {
        "id": 9902,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "3 نسخ من البيانات، على وسيطين مختلفين للتخزين، ونسخة واحدة على الأقل في موقع جغرافي خارجي بعيد",
        "estCorrecte": true
      },
      {
        "id": 9903,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "حفظ الملف 3 مرات متتالية على نفس بطاقة الذاكرة الصغيرة",
        "estCorrecte": false
      },
      {
        "id": 9904,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "مسح البيانات كل 3 أيام ونسخها في اليوم الثاني وإتلافها في اليوم الأول",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 100,
    "code": "Q-NUM-100",
    "categorie": "المعلوماتية والمهارات الرقمية",
    "categorie_code": "INFORMATIQUE",
    "texte": "في تتبع مرتكبي جرائم النصب الإلكتروني عبر الإنترنت، ما هي المعلومة التقنية الأساسية المضمنة في سجلات الخادم (Server logs) التي تسمح بتحديد الخط الهاتفي أو الاشتراك المزود للخدمة؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "التحقيق الجنائي السيبراني",
      "تعقب بروتوكولات الإنترنت"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 3
      },
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 1.5
      }
    ],
    "explication": "عنوان بروتوكول الإنترنت العام (Adresse IP publique) المقترن بالتاريخ والساعة بدقة بالغة (Timestamp) هو العنصر الفني الحاسم لتحديد هوية صاحب الاشتراك لدى مزود خدمة الإنترنت (FAI).",
    "options": [
      {
        "id": 10001,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "لون شاشة الحاسوب التي استخدمها الجاني",
        "estCorrecte": false
      },
      {
        "id": 10002,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "عنوان بروتوكول الإنترنت (Adresse IP) مع البصمة الزمنية الدقيقة (Timestamp)",
        "estCorrecte": true
      },
      {
        "id": 10003,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "طراز الطابعة المتصلة بمكتب الجاني",
        "estCorrecte": false
      },
      {
        "id": 10004,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "عدد الأزرار الموجودة في لوحة مفاتيحه",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 101,
    "code": "Q-NUM-101",
    "categorie": "المعلوماتية والمهارات الرقمية",
    "categorie_code": "INFORMATIQUE",
    "texte": "ظهرت فجأة على شاشة حاسوب المركز رسالة تحذيرية حمراء تفيد بتشفير جميع الملفات مع طلب فدية بعملة البيتكوين (Ransomware / برمجية الفدية). ما هو رد الفعل التقني الفوري الإلزامي لإنقاذ باقي أجهزة الوحدة؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "الاستجابة للحوادث السيبرانية الطارئة",
      "احتواء انتشار البرمجيات الخبيثة"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 3
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 2
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 1.5
      }
    ],
    "explication": "فصل كابل الشبكة السلكي وإيقاف الواي فاي فوراً لعزل الجهاز المصاب ومنع انتقال البرمجية لباقي خوادم الوحدة، مع عدم إطفاء الجهاز لحفظ الأدلة في الذاكرة الحية (RAM) للمختصين.",
    "options": [
      {
        "id": 10101,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "تحويل مبلغ الفدية فوراً من الميزانية الخاصة للمركز",
        "estCorrecte": false
      },
      {
        "id": 10102,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "فصل الحاسوب فوراً عن الشبكة المحلية والإنترنت دون إطفائه وإشعار خلية الأمن السيبراني فوراً",
        "estCorrecte": true
      },
      {
        "id": 10103,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "إعادة تشغيل الحاسوب 10 مرات متتالية",
        "estCorrecte": false
      },
      {
        "id": 10104,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "توصيل مفاتيح USB إضافية لحفظ الفيروس ونقله للأجهزة الأخرى",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 102,
    "code": "Q-NUM-102",
    "categorie": "المعلوماتية والمهارات الرقمية",
    "categorie_code": "INFORMATIQUE",
    "texte": "عند حجز صورة فوتوغرافية رقمية التقطها مشتبه به لموقع حساس، ما هي البيانات الوصفية المخفية (Métadonnées EXIF) التي يمكن لتقني المعلوميات استخراجها للمساعدة في التحقيق الجنائي؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "التحليل الجنائي للوسائط الرقمية",
      "استخراج بيانات EXIF الجغرافية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2.5
      }
    ],
    "explication": "بيانات EXIF تسجل تلقائياً نوع الكاميرا، والتاريخ والوقت بالثواني، وإحداثيات الموقع الجغرافي الدقيقة (GPS) التي التُقطت فيها الصورة ما لم يتم حجبها.",
    "options": [
      {
        "id": 10201,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "نوايا المشتبه به ومستقبله المهني",
        "estCorrecte": false
      },
      {
        "id": 10202,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الإحداثيات الجغرافية (GPS)، تاريخ وساعة الالتقاط، وطراز الهاتف أو الكاميرا بدقة",
        "estCorrecte": true
      },
      {
        "id": 10203,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "تسجيل صوتي للأحاديث التي دارت أثناء التقاط الصورة قبل 5 سنوات",
        "estCorrecte": false
      },
      {
        "id": 10204,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "الاسم الكامل لوالدة صانع الهاتف",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 103,
    "code": "Q-NUM-103",
    "categorie": "المعلوماتية والمهارات الرقمية",
    "categorie_code": "INFORMATIQUE",
    "texte": "في تقنيات التشفير غير المتماثل (Chiffrement asymétrique) المستخدمة في تأمين المراسلات العسكرية والمفاتيح العامة (PKI)، ما هو المبدأ الأساسي الذي يحقق سرية الرسالة؟",
    "difficulte": "صعب",
    "difficulte_code": "DIFFICILE",
    "coefficient": 1.5,
    "competences": [
      "علم التعمية والتشفير",
      "أمن الاتصالات الحساسة"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 3
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 1.5
      }
    ],
    "explication": "تُشفر الرسالة بالمفتاح العام (Clé publique) للمستلم الذي يعرفه الجميع، ولا يمكن فك تشفيرها وقراءتها إلا بواسطة المفتاح الخاص (Clé privée) الوحيد السري المحفوظ لدى المستلم.",
    "options": [
      {
        "id": 10301,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "استخدام كلمة سر موحدة وسهلة يعرفها جميع الجنود",
        "estCorrecte": false
      },
      {
        "id": 10302,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "التشفير بواسطة المفتاح العام للطرف الآخر، وفك التشفير حصرياً بواسطة مفتاحه الخاص السري",
        "estCorrecte": true
      },
      {
        "id": 10303,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "كتابة الرسالة بلغة أجنبية دون استخدام أي حاسوب",
        "estCorrecte": false
      },
      {
        "id": 10304,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "إرسال الرسالة عبر البريد العادي في مظروف شفاف",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 104,
    "code": "Q-NUM-104",
    "categorie": "المعلوماتية والمهارات الرقمية",
    "categorie_code": "INFORMATIQUE",
    "texte": "عثر دركي على مفتاح تخزين (USB Flash Drive) جديد ومغلف ملقى على رصيف مرآب السيارات العسكري للوحدة. ما هو التصرف الأمني الصارم وفق بروتوكولات الدفاع السيبراني؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "مكافحة هجمات الهندسة الاجتماعية المادية",
      "حماية الحواسب العسكرية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 3
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 2
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 1.5
      }
    ],
    "explication": "حظر توصيله بأي حاسوب مهني قطعياً؛ قد يحتوي على برمجية خبيثة هجومية (مثل BadUSB)؛ يجب تسليمه لخلية المعلوميات لفحصه داخل بيئة معزولة تماماً (Sandbox).",
    "options": [
      {
        "id": 10401,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "توصيله بحاسوب مكتب القيادة الرئيسي لمعرفة ما إذا كان يحتوي على أفلام وثائقية",
        "estCorrecte": false
      },
      {
        "id": 10402,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الامتناع التام عن توصيله بأي جهاز، وتسليمه لمكتب أمن النظم لفحصه في بيئة معزولة ومحمية",
        "estCorrecte": true
      },
      {
        "id": 10403,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "أخذه للمنزل وإعطائه للأطفال للعب به",
        "estCorrecte": false
      },
      {
        "id": 10404,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "توصيله بحاسوب المحاسبة والمالية فوراً لتهيئته (Format)",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 105,
    "code": "Q-NUM-105",
    "categorie": "المعلوماتية والمهارات الرقمية",
    "categorie_code": "INFORMATIQUE",
    "texte": "في قاعدة بيانات السجلات القضائية، ما هي وظيفة استعلام لغة SQL التالي: SELECT * FROM VehiculesRecherches WHERE Matricule = '12345-A-1'; ؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "قواعد البيانات والاستعلام الرقمي",
      "التنقيب في السجلات الإلكترونية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 3
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 2
      }
    ],
    "explication": "يقوم الاستعلام بالبحث واسترجاع جميع بيانات وحقول المركبة المبحوث عنها التي تطابق صفيحة ترقيمها بالتحديد القيمة '12345-A-1'.",
    "options": [
      {
        "id": 10501,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "مسح وحذف سجل المركبة نهائياً من قاعدة البيانات",
        "estCorrecte": false
      },
      {
        "id": 10502,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "استعراض واستخراج كافة معلومات المركبة المبحوث عنها الحاملة لرقم الترقيم المحدد",
        "estCorrecte": true
      },
      {
        "id": 10503,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "تغيير لوحة ترقيم جميع سيارات الدرك إلى هذا الرقم",
        "estCorrecte": false
      },
      {
        "id": 10504,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "إيقاف تشغيل الخادم المركزي لمدة ساعة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 106,
    "code": "Q-NUM-106",
    "categorie": "المعلوماتية والمهارات الرقمية",
    "categorie_code": "INFORMATIQUE",
    "texte": "كيف تعمل شبكة التخفي والتشفير المعروفة بـ (Tor / The Onion Router) التي تستغلها عصابات الجريمة المنظمة على الويب المظلم (Darknet)؟",
    "difficulte": "صعب",
    "difficulte_code": "DIFFICILE",
    "coefficient": 1.5,
    "competences": [
      "فهم الويب المظلم وتقنيات إخفاء الهوية",
      "التحريات الرقمية المتقدمة"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2.5
      }
    ],
    "explication": "تمرير حركة البيانات عبر طبقات متعددة من العقد العشوائية المشفرة المتتالية (عقدة دخول، عقدة وسطى، وعقدة خروج) بحيث لا تعرف أي عقدة هوية المصدر والوجهة معاً.",
    "options": [
      {
        "id": 10601,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "إرسال الرسائل عبر موجات الراديو التماثلية القديمة فقط",
        "estCorrecte": false
      },
      {
        "id": 10602,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "توجيه البيانات عبر عقد مشفرة متعددة ومتعاقبة كطبقات البصل لإخفاء عنوان IP الحقيقي للمستخدم",
        "estCorrecte": true
      },
      {
        "id": 10603,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "إلغاء اتصال الإنترنت واستخدام الطاقة الشمسية للتواصل",
        "estCorrecte": false
      },
      {
        "id": 10604,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "نشر جميع الملفات في صفحات مفتوحة على محرك بحث جوجل",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 107,
    "code": "Q-NUM-107",
    "categorie": "المعلوماتية والمهارات الرقمية",
    "categorie_code": "INFORMATIQUE",
    "texte": "لماذا يُمنع منعاً باتاً اعتماد بروتوكول التشفير القديم (WEP) في تأمين شبكات الواي فاي (Wi-Fi) التابعة للثكنات والوحدات العسكرية؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "أمن الشبكات اللاسلكية",
      "معايير التشفير والبروتوكولات"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 1.5
      }
    ],
    "explication": "بروتوكول WEP يعاني من ثغرات هيكلية قاتلة في خوارزمية التشفير تجعل مفتاح المرور قابلاً للاختراق والكسر التام خلال دقائق معدودة باستخدام أدوات مفتوحة المصدر.",
    "options": [
      {
        "id": 10701,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "لأنه يستهلك كميات خيالية من الوقود",
        "estCorrecte": false
      },
      {
        "id": 10702,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "لضعفه الأمني الحاد وسهولة اختراقه وكسر مفاتيحه خلال دقائق بواسطة برامج تحليل الحزم",
        "estCorrecte": true
      },
      {
        "id": 10703,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "لأنه لا يعمل إلا في فصل الشتاء فقط",
        "estCorrecte": false
      },
      {
        "id": 10704,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "لأنه مخصص فقط للهواتف المنزلية السلكية القديمة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 108,
    "code": "Q-NUM-108",
    "categorie": "المعلوماتية والمهارات الرقمية",
    "categorie_code": "INFORMATIQUE",
    "texte": "ما هو الخطر السيبراني المعروف بـ (انتحال الهوية الرقمية / Spoofing) في الاتصالات الهاتفية والرسائل؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "كشف انتحال الشخصية الرقمية",
      "التحقيق في الجرائم الإلكترونية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 1.5
      }
    ],
    "explication": "تزوير البيانات التعريفية للاتصال لإظهار رقم هاتف المتصل أو عنوان بريده على شاشة الضحية كرقم جهة رسمية أو موثوقة لخداعه وسرقة أسراره أو توجيه أوامر زائفة.",
    "options": [
      {
        "id": 10801,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "انفجار بطارية الهاتف أثناء الرنين",
        "estCorrecte": false
      },
      {
        "id": 10802,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "تزييف هوية المتصل أو عنوان البريد ليظهر كجهة أمنية أو رسمية لكسب ثقة الضحية وخداعه",
        "estCorrecte": true
      },
      {
        "id": 10803,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "تسجيل المكالمة بصوت جهوري مضخم",
        "estCorrecte": false
      },
      {
        "id": 10804,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "حرق شريحة الهاتف SIM Card بسبب تكرار المكالمات",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 109,
    "code": "Q-NUM-109",
    "categorie": "المعلوماتية والمهارات الرقمية",
    "categorie_code": "INFORMATIQUE",
    "texte": "أثناء تحريز قرص صلب يحتوي على وثائق هامة في قضية تجسس، لماذا يقوم المحقق الجنائي بحساب قيمة \"دالة البصمة الرقمية\" (Hash SHA-256) للملفات فور ضبطها؟",
    "difficulte": "صعب",
    "difficulte_code": "DIFFICILE",
    "coefficient": 1.5,
    "competences": [
      "الأدلة الجنائية الرقمية",
      "إثبات سلامة وعدم تحريف الأدلة الحوسبية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 2
      }
    ],
    "explication": "دالة البصمة الرياضية تنتج قيمة نصية وحيدة وفريدة؛ أي تغيير ولو في بت (Bit) واحد في الملف مستقبلاً سيغير قيمة الـ Hash، مما يقدم دليلاً رياضياً قاطعاً على سلامة الدليل وعدم تحريفه.",
    "options": [
      {
        "id": 10901,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "لمسح الفيروسات وإصلاح القطاعات التالفة في القرص الصلب",
        "estCorrecte": false
      },
      {
        "id": 10902,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "لإثبات السلامة الرياضية المطلقة للملفات والتأكيد أمام القضاء بعدم تعرضها لأي تعديل بعد ضبطها",
        "estCorrecte": true
      },
      {
        "id": 10903,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "لتقليل حجم الملفات بنسبة 99% لتوفير مساحة التخزين",
        "estCorrecte": false
      },
      {
        "id": 10904,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "لتحويل الوثائق إلى نصوص باللغة اليابانية القديمة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 110,
    "code": "Q-NUM-110",
    "categorie": "المعلوماتية والمهارات الرقمية",
    "categorie_code": "INFORMATIQUE",
    "texte": "ماذا يقتضي \"مبدأ الامتياز الأدنى\" (Principe du moindre privilège) في إدارة الصلاحيات للمستخدمين داخل المنظومات المعلوماتية للدرك الملكي؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "سياسات التحكم بالوصول والحوكمة الرقمية",
      "الأمن السيبراني المؤسساتي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 3
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 2
      }
    ],
    "explication": "منح كل مستخدم فقط الحد الأدنى من الصلاحيات والوصول إلى الملفات والوظائف الضرورية بدقة لأداء مهامه الوظيفية المباشرة، وحجب أي وصول إضافي لتقليص مساحة المخاطر.",
    "options": [
      {
        "id": 11001,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "منح جميع الموظفين حسابات مدير النظام (Administrator) بصلاحيات مطلقة للتسهيل عليهم",
        "estCorrecte": false
      },
      {
        "id": 11002,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "منح المستخدم فقط الصلاحيات المحدودة والضرورية للغاية لإنجاز وظيفته دون أي زيادة تفادياً للمخاطر",
        "estCorrecte": true
      },
      {
        "id": 11003,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "منع جميع الموظفين من استخدام الكهرباء في المكاتب",
        "estCorrecte": false
      },
      {
        "id": 11004,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "إلغاء كلمات المرور واستخدام الدخول التلقائي بدون قيود",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 111,
    "code": "Q-COM-111",
    "categorie": "التواصل والتكوين",
    "categorie_code": "COMMUNICATION",
    "texte": "عند تأطير حصة تدريبية ميدانية في الرماية أو التكتيك لفائدة تلاميذ الدرك الملكي، ما هي المنهجية البيداغوجية العسكرية الفعالة لترسيخ المهارة الحركية بأمان تام؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "البيداغوجيا العسكرية والتعليم الفعال",
      "نقل المهارات والتأطير الميداني"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 3
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 1.5
      }
    ],
    "explication": "المنهجية النموذجية تعتمد التسلسل: الشرح النظري المبسط، يليه العرض البيداغوجي النموذجي من المؤطر (Démonstration)، ثم التطبيق والمحاكاة الفردية من المتدربين مع التصحيح الفوري للأخطاء.",
    "options": [
      {
        "id": 11101,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "إعطاء الأسلحة للتلاميذ فوراً دون أي شرح مسبق ليتعلموا من أخطائهم بمفردهم",
        "estCorrecte": false
      },
      {
        "id": 11102,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "التسلسل: الشرح المنهجي، البيان العملي النموذجي، التطبيق الخاضع للمراقبة والتصحيح الفردي المستمر",
        "estCorrecte": true
      },
      {
        "id": 11103,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "الصراخ المتواصل والعقاب البدني العشوائي قبل بدء أي تمرين",
        "estCorrecte": false
      },
      {
        "id": 11104,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "قراءة كتاب التدريب بالكامل بصوت منخفض في قاعة مظلمة دون أي تمرين عملي",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 112,
    "code": "Q-COM-112",
    "categorie": "التواصل والتكوين",
    "categorie_code": "COMMUNICATION",
    "texte": "أثناء حادث بارز ومثير للرأي العام، حاول صحفيون استجواب دركي بالشارع حول تفاصيل التحقيق وهوية الضحايا. ما هو السلوك الإعلامي والقانوني السليم؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "التواصل في الأزمات وحماية سرية التحقيق",
      "التقيد بالضوابط الإعلامية المؤسساتية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 2.5
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 2
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2
      }
    ],
    "explication": "احترام السر المهني وسرية البحث القضائي؛ التزام التحفظ والامتناع عن الإدلاء بأي تصريحات غير مرخصة وتوجيه وسائل الإعلام بلباقة إلى الناطق الرسمي المعتمد أو بلاغات النيابة العامة.",
    "options": [
      {
        "id": 11201,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "تقديم كل أسرار التحقيق وأسماء المشتبه بهم للصحفيين مقابل نشر صورته بالصحف",
        "estCorrecte": false
      },
      {
        "id": 11202,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الالتزام التام بواجب التحفظ والسر المهني، وتوجيه الصحفيين بلباقة للجهات الإعلامية الرسمية المخولة",
        "estCorrecte": true
      },
      {
        "id": 11203,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "الاعتداء الجسدي على الصحفيين وتحطيم كاميراتهم في الشارع العام",
        "estCorrecte": false
      },
      {
        "id": 11204,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "تأليف قصة خيالية طريفة وروايتها للصحفيين لإضحاكهم",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 113,
    "code": "Q-COM-113",
    "categorie": "التواصل والتكوين",
    "categorie_code": "COMMUNICATION",
    "texte": "تقدم مواطن في حالة صدمة وحزن شديد إلى مكتب الاستقبال بمركز الدرك للإبلاغ عن تعرضه لاعتداء واحتجاز. ما هي المهارة التواصلية الأولى الواجب إظهارها من عنصر الاستقبال؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "الاستماع الفعال واستقبال المرتفقين والضحايا",
      "الذكاء العاطفي والتواصل المهني"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 2.5
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 2.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 1.5
      }
    ],
    "explication": "إظهار الإنصات الإيجابي (Écoute active)، وتهدئة روع الضحية، وتوفير بيئة آمنة وكريمة، والتعامل باحترام وتعاطف إنساني مسؤول قبل الشروع في الإجراءات الإدارية والقضائية.",
    "options": [
      {
        "id": 11301,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "السخرية منه وتوبيخه على ضعفه وخروجه ليلاً",
        "estCorrecte": false
      },
      {
        "id": 11302,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "حسن الاستقبال، والإنصات الفعال بتقدير وتفهم، وطمأنته وتوفير فضاء لائق لتلقي شكايته بجدية",
        "estCorrecte": true
      },
      {
        "id": 11303,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "تركه ينتظر في الرواق لساعات طويلة والتفرغ للعب على الهاتف",
        "estCorrecte": false
      },
      {
        "id": 11304,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "مطالبته بالعودة في الأسبوع القادم لأن المركز مغلق للراحة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 114,
    "code": "Q-COM-114",
    "categorie": "التواصل والتكوين",
    "categorie_code": "COMMUNICATION",
    "texte": "في نقل وتوجيه الأوامر التكتيكية قبل انطلاق مهمة أمنية، ما هو الهيكل المعياري المعمول به لضمان شمولية ووضوح أمر العمليات (نموذج SMEAC)؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "صياغة وتمرير الأوامر العسكرية",
      "الوضوح الإجرائي والتنسيق التكتيكي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 2.5
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2.5
      },
      {
        "code": "SPEC-GEH",
        "specialite": "GEH",
        "poids": 1.5
      }
    ],
    "explication": "نموذج SMEAC القيادي: الموقف العام (Situation)، المهمة المحددة (Mission)، خطة التنفيذ (Exécution)، الدعم اللوجستي والإداري (Administration)، والقيادة والمواصلات (Commandement).",
    "options": [
      {
        "id": 11401,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "قول جملة واحدة فقط: \"انطلقوا وافعلوا ما يبدو لكم مناسباً\"",
        "estCorrecte": false
      },
      {
        "id": 11402,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الموقف والبيئة (S)، المهمة (M)، التنفيذ والمراحل (E)، الإسناد اللوجستي (A)، والقيادة والاتصالات (C)",
        "estCorrecte": true
      },
      {
        "id": 11403,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "كتابة قصيدة شعرية حماسية دون أي تفاصيل جغرافية أو أمنية",
        "estCorrecte": false
      },
      {
        "id": 11404,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "الانتظار حتى انتهاء العملية ثم إخبار العناصر بما كان يجب عليهم فعله",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 115,
    "code": "Q-COM-115",
    "categorie": "التواصل والتكوين",
    "categorie_code": "COMMUNICATION",
    "texte": "ما هو الهدف الجوهري من جلسة \"استخلاص الدروس والتقييم اللاحق\" (Retour d'expérience - RETEX) المنظمة مباشرة بعد انتهاء عملية أمنية معقدة؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "ثقافة التعلم المؤسساتي والتقييم البناء",
      "التطوير المستمر للكفاءات"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 3
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 1.5
      }
    ],
    "explication": "تحليل مجريات التدخل بموضوعية، وتشخيص نقاط القوة لترسيخها، وتحديد النقائص لتفادي تكرارها وتطوير المهارات التكتيكية للفريق، وليس البحث عن كبش فداء أو التوبيخ الشخصي.",
    "options": [
      {
        "id": 11501,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "توبيخ وإهانة العناصر الأقل خبرة أمام زملائهم لكسر معنوياتهم",
        "estCorrecte": false
      },
      {
        "id": 11502,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "التحليل الموضوعي للإيجابيات والنواقص العملياتية بهدف تحسين الأداء الجماعي وتحديث بروتوكولات التدخل المستقبلي",
        "estCorrecte": true
      },
      {
        "id": 11503,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "الاحتفال وتناول الحلويات وإخفاء جميع الأخطاء المرتكبة",
        "estCorrecte": false
      },
      {
        "id": 11504,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "إلغاء جميع التدريبات المستقبلية لأن العملية انتهت بسلام",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 116,
    "code": "Q-COM-116",
    "categorie": "التواصل والتكوين",
    "categorie_code": "COMMUNICATION",
    "texte": "عايش دركي حدثاً صادماً ومؤلماً أثناء انتشال ضحايا حادث مأساوي، ولاحظ زملاؤه انطواءه التام وشروده المتواصل وتدهور نومه. ما هو أسلوب الدعم الإنساني والتواصلي الأنسب لمساعدته؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "الدعم النفسي والمرافقة الميدانية",
      "الذكاء العلائقي في البيئة العسكرية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 2.5
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2
      },
      {
        "code": "SPEC-GEH",
        "specialite": "GEH",
        "poids": 1.5
      }
    ],
    "explication": "التضامن الرفاقي الإيجابي بالاستماع الأخوي دون لوم، وإشعار القيادة الطبية بلباقة لتمكينه من دعم نفسي متخصص لتجاوز متلازمة ما بعد الصدمة (PTSD).",
    "options": [
      {
        "id": 11601,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "الاستهزاء به واتهامه بالجبن والضعف ودعوته لترك الخدمة العسكرية",
        "estCorrecte": false
      },
      {
        "id": 11602,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "التواصل الداعم برفق، وكسر عزلته الأخوية، وتوجيهه بحكمة وسرية للاستفادة من المتابعة الطبية والنفسية المتخصصة",
        "estCorrecte": true
      },
      {
        "id": 11603,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "تكليفه بأصعب المهام الليلية بمفرده لكي ينسى الصدمة بالقوة",
        "estCorrecte": false
      },
      {
        "id": 11604,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "تجاهله التام واعتباره شخصاً غير مرغوب فيه في المركز",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 117,
    "code": "Q-COM-117",
    "categorie": "التواصل والتكوين",
    "categorie_code": "COMMUNICATION",
    "texte": "كُلّف دركي بإلقاء عرض تحسيسي حول السلامة الطرقية أمام تلاميذ ثانوية تأهيلية. ما هي القاعدة الأساسية لنجاح هذا التواصل التربوي والتوجيهي؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "التواصل العمومي والتحسيس التربوي",
      "الخطابة ومخاطبة الجمهور الناشئ"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 3
      },
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2
      }
    ],
    "explication": "ملاءمة الخطاب للجمهور المستهدف (لغة بسيطة وتفاعلية)، واستخدام وسائط بصرية مشوقة، وفتح باب الحوار، والتركيز على الإقناع بدلاً من الترهيب الجاف.",
    "options": [
      {
        "id": 11701,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "قراءة نصوص قانونية معقدة باللغة اللاتينية القديمة طوال ساعتين دون توقف",
        "estCorrecte": false
      },
      {
        "id": 11702,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "تكييف أسلوب الخطاب مع الفئة العمرية بالاعتماد على التفاعل، والوسائط البصرية، والأمثلة الحية المقنعة",
        "estCorrecte": true
      },
      {
        "id": 11703,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "معاقبة التلاميذ بالوقوف ووجوههم للحائط إذا طرحوا أي سؤال",
        "estCorrecte": false
      },
      {
        "id": 11704,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "توزيع كتيبات فارغة ومغادرة القاعة فوراً",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 118,
    "code": "Q-COM-118",
    "categorie": "التواصل والتكوين",
    "categorie_code": "COMMUNICATION",
    "texte": "في تقنيات \"نزع فتيل التوتر اللفظي\" (Désescalade) مع مواطن غاضب يرفع صوته محتجاً، ما هي الخطوة التواصلية التي تساعد على امتصاص غضبه بفعالية؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "إدارة الانفعالات والتهدئة التواصلية",
      "التواصل المهني الراقي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 2.5
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2
      },
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 1.5
      }
    ],
    "explication": "إعادة صياغة شكواه بهدوء (Reformulation) للتأكيد على سماعه وفهم المشكلة (\"أنا أتفهم استياءك وسأشرح لك المسطرة القانونية\") مع خفض نبرة الصوت لفرض الهدوء المتبادل.",
    "options": [
      {
        "id": 11801,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "الصراخ بصوت أعلى منه لإجباره على السكوت التام فوراً",
        "estCorrecte": false
      },
      {
        "id": 11802,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الاستماع دون مقاطعة، ثم إعادة صياغة انشغاله بهدوء ونبرة صوت رصينة ومحترمة لتثبيت الهدوء",
        "estCorrecte": true
      },
      {
        "id": 11803,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "إغلاق الباب في وجهه وإطفاء أضواء المكتب",
        "estCorrecte": false
      },
      {
        "id": 11804,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "الضحك والاستهزاء بحركاته أمام الزملاء",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 119,
    "code": "Q-COM-119",
    "categorie": "التواصل والتكوين",
    "categorie_code": "COMMUNICATION",
    "texte": "عند تقييم كفاءة تلميذ دركي في نهاية دورة تكوينية، ما الذي يضمن نزاهة ومصداقية التقييم البيداغوجي وفق معايير مدارس التكوين؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "التقييم البيداغوجي الموضوعي",
      "معايير جودة التكوين العسكري"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 3
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 2
      }
    ],
    "explication": "الاعتماد على شبكة تقييم معيارية محددة المعايير (Grille critériée) قائمة على مؤشرات أداء قابلة للملاحظة والقياس العملي، وتجنب الانطباعات الذاتية أو العاطفية للمؤطر.",
    "options": [
      {
        "id": 11901,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "منح النقط بناء على الإعجاب الشخصي أو القرابة العائلية فقط",
        "estCorrecte": false
      },
      {
        "id": 11902,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الاستناد إلى شبكة معايير موضوعية واضحة ومحددة سلفاً تقيس الإنجاز العملي والسلوك المهني بدقة",
        "estCorrecte": true
      },
      {
        "id": 11903,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "إعطاء نقطة موحدة وثابتة لجميع التلاميذ دون النظر لأدائهم الفعلي",
        "estCorrecte": false
      },
      {
        "id": 11904,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "إجراء القرعة بالقطع النقدية لتحديد الناجحين والراسبين",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 120,
    "code": "Q-COM-120",
    "categorie": "التواصل والتكوين",
    "categorie_code": "COMMUNICATION",
    "texte": "عند رفع تقرير شفوي عملياتي فوري (Compte-rendu verbal) إلى القائد التسلسلي عقب تدخل طارئ، ما هي القاعدة التواصلية التي يجب احترامها لتفادي الغموض وهدر الوقت؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "الإيجاز والدقة في التبليغ العملياتي",
      "التواصل الصاعد في السلسلة القيادية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 2.5
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 2
      }
    ],
    "explication": "قاعدة الإيجاز والدقة والوضوح (قاعدة 3C: Clair, Concis, Précis) عبر الإجابة المباشرة: من، ماذا حدث، أين، متى، وما هي الإجراءات المتخذة والاحتياجات الحالية فوراً.",
    "options": [
      {
        "id": 12001,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "سرد تفاصيل غير مهمة عن نوع الطعام الذي تناوله العناصر قبل المهمة",
        "estCorrecte": false
      },
      {
        "id": 12002,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الإيجاز والدقة والوضوح التام، بتقديم الوقائع الجوهرية، والنتائج، والتدابير المتخذة فوراً دون استطراد",
        "estCorrecte": true
      },
      {
        "id": 12003,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "إخفاء وقوع أي مشاكل والكذب على القائد لإرضائه فقط",
        "estCorrecte": false
      },
      {
        "id": 12004,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "إرسال لغز شعري للقائد ليحاول تخمين ما جرى في الميدان",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 121,
    "code": "Q-ADM-121",
    "categorie": "الإدارة والسكرتارية",
    "categorie_code": "SECRETARIAT",
    "texte": "عند استقبال مراسلة رسمية سرية واردة من القيادة العليا في مكتب الضبط (Bureau d'ordre)، ما هو الإجراء الإداري والتنظيمي الأول الواجب تسجيله فوراً؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "تدبير مكتب الضبط والمراسلات الإدارية",
      "التوثيق وحفظ السرية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 1.5
      }
    ],
    "explication": "تسجيل المراسلة فوراً بسجل البريد الوارد (Registre d'arrivée) برقم تسلسلي، وتاريخ وساعة الاستلام، وتحديد المصدر والموضوع، وعرضها فوراً على القائد المباشر دون تأخير.",
    "options": [
      {
        "id": 12101,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "فتح المراسلة وعرضها على جميع الزوار في قاعة الانتظار لأخذ آرائهم",
        "estCorrecte": false
      },
      {
        "id": 12102,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "تسجيلها فوراً في سجل البريد الوارد برقم ترتيبي وتاريخ وساعة الاستلام وتقديمها فوراً للقائد",
        "estCorrecte": true
      },
      {
        "id": 12103,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "إخفاء الرسالة داخل درج المكتب ونسيانها لعدة أشهر",
        "estCorrecte": false
      },
      {
        "id": 12104,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "تمزيق المظروف والتخلص من الوثيقة لتفادي كثرة الأوراق",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 122,
    "code": "Q-ADM-122",
    "categorie": "الإدارة والسكرتارية",
    "categorie_code": "SECRETARIAT",
    "texte": "في تدبير أرشيف الوحدة العسكرية، ما هي القاعدة التنظيمية المعتمدة لترتيب وحفظ الملفات الإدارية والقضائية المنتهية لضمان استرجاعها السريع عند الطلب؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "الأرشفة والتصنيف الإداري المحكم",
      "التنظيم الوثائقي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 3
      },
      {
        "code": "SPEC-INFO",
        "specialite": "الإعلاميات",
        "poids": 2
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 1.5
      }
    ],
    "explication": "التصنيف المنهجي المعياري وفق خطة حفظ معتمدة (ترتيب زمني موضوعاتي مع رمز تعريفي وفهرس رقمي موحد) داخل علب أرشيف مؤمنة ضد الرطوبة والحريق والعبث.",
    "options": [
      {
        "id": 12201,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "تكديس جميع الملفات عشوائياً في ركن مظلم على أرضية المرآب",
        "estCorrecte": false
      },
      {
        "id": 12202,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "التصنيف المعياري المنهجي حسب السنوات والموضوعات مع الفهرسة والترميز الموحد في فضاء حفظ مخصص وآمن",
        "estCorrecte": true
      },
      {
        "id": 12203,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "حرق الملفات القديمة أسبوعياً لتوفير المساحة في الغرفة",
        "estCorrecte": false
      },
      {
        "id": 12204,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "خلط ملفات الموظفين مع سجلات الصيانة وفواتير الوقود في مجلد واحد",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 123,
    "code": "Q-ADM-123",
    "categorie": "الإدارة والسكرتارية",
    "categorie_code": "SECRETARIAT",
    "texte": "ما هي الخاصية التعبيرية والأسلوبية المميزة للتحرير الإداري العسكري في صياغة \"المذكرة المصلحية\" (Note de service) أو \"تقرير الإحالة\"؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "التحرير الإداري العسكري",
      "الدقة والأسلوب الرسمي الرصين"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 2
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 1.5
      }
    ],
    "explication": "الأسلوب الإداري العسكري يتميز بالتجرد والموضوعية، والوضوح، والإيجاز، واحترام السلم الإداري، واستخدام الصيغ الرسمية المحددة بدقة دون مشاعر أو مبالغات إنشائية.",
    "options": [
      {
        "id": 12301,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "استخدام أسلوب رومانسي وشعري مليء بالاستعارات والمحسنات البديعية",
        "estCorrecte": false
      },
      {
        "id": 12302,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الموضوعية التامة، والدقة والوضوح والإيجاز، واحترام التراتبية الإدارية والصيغ الرسمية المعتمدة",
        "estCorrecte": true
      },
      {
        "id": 12303,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "استعمال لغة عامية دارجة مليئة بالاختصارات المبهمة وغير المفهومة",
        "estCorrecte": false
      },
      {
        "id": 12304,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "كتابة الوثيقة في شكل رسوم كاريكاتورية ساخرة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 124,
    "code": "Q-ADM-124",
    "categorie": "الإدارة والسكرتارية",
    "categorie_code": "SECRETARIAT",
    "texte": "عند إعداد جدول نوبات الحراسة والدوريات الشهرية (Tableau de service) للوحدة، ما هو المبدأ التسييري الأساسي الذي يضمن الجاهزية والعدالة؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "التخطيط الإداري وتدبير الموارد البشرية",
      "تنظيم جداول الخدمة والجاهزية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 3
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 1.5
      }
    ],
    "explication": "ضمان التوازن بين متطلبات الجاهزية الأمنية الدائمة للوحدة واحترام فترات الراحة القانونية، مع التوزيع العادل للمهام بين كافة الأفراد وتجنب المحاباة أو الإرهاق المفرط.",
    "options": [
      {
        "id": 12401,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "تكليف نفس الدركي بالحراسة طوال 30 يوماً دون أي راحة وإعفاء الباقين تماماً",
        "estCorrecte": false
      },
      {
        "id": 12402,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الموازنة الدقيقة بين الجاهزية العملياتية المستمرة والراحة القانونية والتوزيع المنصف بين العناصر",
        "estCorrecte": true
      },
      {
        "id": 12403,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "إلغاء الحراسة الليلية بالكامل لتمكين الجميع من النوم في منازلهم",
        "estCorrecte": false
      },
      {
        "id": 12404,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "تحديد جدول الخدمة يومياً عبر مسابقة في الجري السريع صباحاً",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 125,
    "code": "Q-ADM-125",
    "categorie": "الإدارة والسكرتارية",
    "categorie_code": "SECRETARIAT",
    "texte": "في تدبير ملفات المسار المهني والترقية والتنقيط السنوي للأفراد (Chancellerie et avancement)، ما هي المسؤولية الأخلاقية والإدارية الملقاة على عاتق كاتب السكرتارية؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "كتمان السر المهني للأفراد",
      "الدقة والأمانة الإدارية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 2
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 1.5
      }
    ],
    "explication": "الكتمان المطلق للسر المهني وحفظ سرية النقط والملاحظات التأديبية والترقيات، والدقة الصارمة في تدوين الأقدمية والأوسمة والشهادات دون أي تحريف أو إهمال.",
    "options": [
      {
        "id": 12501,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "إفشاء نقط وملاحظات القادة للزملاء في المقهى لإثارة الجدل والتنافس غير الشريف",
        "estCorrecte": false
      },
      {
        "id": 12502,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الالتزام الصارم بسرية البيانات الشخصية، والدقة المتناهية في مطابقة الأقدمية والاستحقاق بالسجلات الرسمية",
        "estCorrecte": true
      },
      {
        "id": 12503,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "تعديل نقط التقييم مقابل مبالغ مالية أو خدمات شخصية",
        "estCorrecte": false
      },
      {
        "id": 12504,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "تضييع ملفات الموظفين وإخبارهم بالبحث عنها بأنفسهم",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 126,
    "code": "Q-DIS-126",
    "categorie": "المواقف المهنية والانضباط",
    "categorie_code": "DISCIPLINE",
    "texte": "تلقى دركي أمراً صريحاً من رئيسه المباشر بإخفاء سلاح ناري غير مرخص تم حجزه أثناء تفتيش وعدم تضمينه في المحضر الرسمي. ما هو الموقف القانوني والأخلاقي العسكري الإلزامي؟",
    "difficulte": "صعب",
    "difficulte_code": "DIFFICILE",
    "coefficient": 1.5,
    "competences": [
      "حدود الطاعة العسكرية والأمر غير المشروع",
      "الاستقامة القانونية والنزاهة"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2.5
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 2
      }
    ],
    "explication": "تنص القوانين والأنظمة العسكرية على أن واجب الطاعة يسقط إذا كان الأمر الصادر غير مشروع بشكل صريح ويشكل جريمة قانونية خطيرة؛ يجب رفض التنفيذ وإشعار المستوى القيادي الأعلى فوراً.",
    "options": [
      {
        "id": 12601,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "تنفيذ الأمر فوراً دون تردد لأن طاعة الرئيس مطلقة حتى لو خالفت القانون الجنائي",
        "estCorrecte": false
      },
      {
        "id": 12602,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "رفض تنفيذ الأمر غير المشروع الصريح وإثبات المحجوز قانوناً وإبلاغ القيادة العليا بالواقعة",
        "estCorrecte": true
      },
      {
        "id": 12603,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "أخذ السلاح الناري وبيعه في السوق واقتسام المال مع الرئيس",
        "estCorrecte": false
      },
      {
        "id": 12604,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "إطلاق النار على السلاح الناري لإتلافه أمام الجميع",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 127,
    "code": "Q-DIS-127",
    "categorie": "المواقف المهنية والانضباط",
    "categorie_code": "DISCIPLINE",
    "texte": "ما الذي يمثله الارتداء السليم والمتكامل للبذلة العسكرية والشارات النظامية للدرك الملكي في الشارع العام؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "الهندام العسكري والتمثيل المؤسساتي",
      "الانضباط والوقار المهني"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-GEH",
        "specialite": "GEH",
        "poids": 3
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 2.5
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 1.5
      }
    ],
    "explication": "الهندام العسكري المنضبط يجسد هيبة وسيادة الدولة، ويعزز الثقة والاحترام لدى المواطنين، ويعكس الصرامة والانضباط الذاتي الداخلي للمؤسسة العسكرية العريقة.",
    "options": [
      {
        "id": 12701,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "مجرد لباس عادي يمكن تعديل ألوانه وارتداؤه مع أحذية رياضية متباينة",
        "estCorrecte": false
      },
      {
        "id": 12702,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "تجسيد لهيبة القانون وسيادة المؤسسة ويعكس الانضباط الصارم والاحترام الواجب للوظيفة العسكرية",
        "estCorrecte": true
      },
      {
        "id": 12703,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "وسيلة لتخويف الأطفال الصغار في الشوارع",
        "estCorrecte": false
      },
      {
        "id": 12704,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "لباس صيفي يمكن تمزيق أكمامه في الأيام الحارة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 128,
    "code": "Q-DIS-128",
    "categorie": "المواقف المهنية والانضباط",
    "categorie_code": "DISCIPLINE",
    "texte": "قام دركي بنشر مقطع فيديو على منصة (تيك توك) يظهر فيه بالبذلة العسكرية الرسمية داخل مرآب الثكنة وهو يغني ويعلق بسخرية على بعض التوجيهات اليومية. ما التقييم التأديبي لهذا التصرف؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "واجب التحفظ واستخدام شبكات التواصل الاجتماعي",
      "الانضباط العسكري الرقمي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 3
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 2.5
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 1.5
      }
    ],
    "explication": "مخالفة جسيمة وصريحة لواجب التحفظ والسر العسكري وقواعد استعمال وسائل التواصل الاجتماعي، تعرض صاحبها لعقوبات تأديبية صارمة للمساس بصورة وهيبة السلك.",
    "options": [
      {
        "id": 12801,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "تصرف عصري يستحق الإشادة والترقية الفورية لموهبته الفنية",
        "estCorrecte": false
      },
      {
        "id": 12802,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "خطأ مهني وتأديبي جسيم يخرق واجب التحفظ ويمس بهيبة المؤسسة العسكرية ويستوجب العقاب الرادع",
        "estCorrecte": true
      },
      {
        "id": 12803,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "عمل بطولي يُطلب من جميع العناصر تقليده يومياً",
        "estCorrecte": false
      },
      {
        "id": 12804,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "مباح تماماً ما دام لم يذكر اسمه الشخصي في الفيديو",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 129,
    "code": "Q-DIS-129",
    "categorie": "المواقف المهنية والانضباط",
    "categorie_code": "DISCIPLINE",
    "texte": "أثناء فترة إجازته السنوية وارتدائه ملابس مدنية، شاهد دركي شخصاً يقود بتهور كاد يدهس مارة في حي سكني. ما هو الموقف المهني والأخلاقي السليم؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "استمرارية الواجب الأخلاقي والصفة الضبطية",
      "حماية الأمن العام في كل الظروف"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 2.5
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2
      },
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2
      }
    ],
    "explication": "صفة الدركي ورسالته في حماية المواطنين تلازمه دائماً؛ يتدخل بحكمة عبر إشعار مصالح الأمن أو الدرك المحلية فوراً برقم السيارة وأوصافها، والتدخل المباشر فقط في حدود الضرورة ودون تهور.",
    "options": [
      {
        "id": 12901,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "تجاهل الأمر تماماً لأن الإجازة تعني أن الشخص لم يعد ينتمي للدرك الملكي",
        "estCorrecte": false
      },
      {
        "id": 12902,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "التفاعل الإيجابي بتسجيل بيانات السيارة وإشعار الدورية المحلية فوراً والتدخل الآمن عند الضرورة لإنقاذ الأرواح",
        "estCorrecte": true
      },
      {
        "id": 12903,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "مطاردة السيارة بالدراجة الهوائية وتكسير زجاجها بالحجارة",
        "estCorrecte": false
      },
      {
        "id": 12904,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "التصفيق للسائق المتهور وتشجيعه على زيادة السرعة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 130,
    "code": "Q-DIS-130",
    "categorie": "المواقف المهنية والانضباط",
    "categorie_code": "DISCIPLINE",
    "texte": "حُدد موعد تجمع وانطلاق دورية أمنية على الساعة 08:00 صباحاً. متى يجب على الدركي المنضبط الحضور الفعلي في مكان الاستعداد؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "الانضباط الزمني والدقة العسكرية",
      "الاستعداد المسبق للمهام"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-GEH",
        "specialite": "GEH",
        "poids": 3
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2.5
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 2
      }
    ],
    "explication": "القاعدة العسكرية الراسخة: \"الدقة في الموعد أدب الملوك والواجب العسكري الأول\"؛ الحضور قبل الموعد بـ 15 إلى 20 دقيقة لاستلام وفحص السلاح والمعدات وجاهزية المركبة قبل ساعة الانطلاق.",
    "options": [
      {
        "id": 1301,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "الوصول في الساعة 08:30 صباحاً مع تقديم اعتذار شفهي بسيط",
        "estCorrecte": false
      },
      {
        "id": 1302,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الحضور قبل الموعد بـ 15 إلى 20 دقيقة لفحص التجهيزات والسلاح والمركبة وضمان الانطلاق في الوقت المحدد تماماً",
        "estCorrecte": true
      },
      {
        "id": 1303,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "الحضور في الساعة 12:00 زوالاً لتناول وجبة الغداء مع الفريق",
        "estCorrecte": false
      },
      {
        "id": 1304,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "عدم الحضور نهائياً وإغلاق الهاتف النقال طوال اليوم",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 131,
    "code": "Q-DIS-131",
    "categorie": "المواقف المهنية والانضباط",
    "categorie_code": "DISCIPLINE",
    "texte": "ما هو المفهوم الحقيقي لـ \"روح الفريق والتضامن العسكري\" (Esprit de corps) بين عناصر الدرك الملكي؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "روح الجماعة والتضامن الأخلاقي",
      "التماسك والتعاون المهني النزيه"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2.5
      },
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 2.5
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 2
      }
    ],
    "explication": "روح الفريق تعني التآزر والمساندة الميدانية المخلصة، والتضحية لإنجاح المهمة وحماية سلامة الزملاء، دون أن تتحول أبداً إلى تواطؤ سلبي للتستر على الجرائم أو الخيانات المهنية.",
    "options": [
      {
        "id": 13101,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "التستر الأعمى على الجرائم والسرقات التي يرتكبها الزميل داخل الوحدة",
        "estCorrecte": false
      },
      {
        "id": 13102,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "التآزر الصادق والدعم المتبادل والشجاعة المشتركة لإنجاز الواجب وحماية الزملاء في إطار الشرف والقانون",
        "estCorrecte": true
      },
      {
        "id": 13103,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "رفض التحدث مع أي زميل ينتمي لمدينة أخرى",
        "estCorrecte": false
      },
      {
        "id": 13104,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "الهروب وترك الزميل محاصراً بمفرده في مواجهة الخطر",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 132,
    "code": "Q-DIS-132",
    "categorie": "المواقف المهنية والانضباط",
    "categorie_code": "DISCIPLINE",
    "texte": "لماذا يفرض القانون والأنظمة العسكرية على رجل الدرك الملكي الحياد السياسي والنقابي التام والمطلق؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "الحياد السياسي والمؤسساتي",
      "أخلاقيات المرفق الأمني والعسكري"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 3
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 2
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 1.5
      }
    ],
    "explication": "لضمان خدمة الوطن والشعب بتجرد مطلق ومساواة بين جميع المواطنين، وحماية المؤسسة العسكرية والأمنية من الانقسامات الأيديولوجية والتجاذبات الحزبية.",
    "options": [
      {
        "id": 13201,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "لأن رجال الدرك ليس لديهم أي اهتمام بالشأن العام إطلاقاً",
        "estCorrecte": false
      },
      {
        "id": 13202,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "لضمان التجرد والنزاهة والمساواة في تطبيق القانون على الجميع، وصون وحدة المؤسسة من الصراعات الحزبية",
        "estCorrecte": true
      },
      {
        "id": 13203,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "لأن الأحزاب السياسية تمنع الانتساب إليها لمن يرتدي الزي العسكري في المساء فقط",
        "estCorrecte": false
      },
      {
        "id": 13204,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "لتشجيع الناس على عدم المشاركة في الانتخابات",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 133,
    "code": "Q-DIS-133",
    "categorie": "المواقف المهنية والانضباط",
    "categorie_code": "DISCIPLINE",
    "texte": "في ميدان الرماية بالرصاص الحي (Stand de tir)، صاح المدرب فجأة وبصوت قوي: \"قف! أوقفوا النار!\". ما هو الإجراء الفوري الإلزامي لجميع الرماة؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "الانضباط التكتيكي الصارم في الرماية",
      "السلامة الحيوية في ميدان النار"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 3
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 2.5
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2
      }
    ],
    "explication": "التوقف الفوري والتام عن الرماية، ورفع الإصبع خارج الزناد، وإبقاء فوهة السلاح في اتجاه الأهداف الآمنة، ووضع السلاح في وضع التأمين وانتظار التعليمات التالية.",
    "options": [
      {
        "id": 13301,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "الاستمرار في إطلاق النار حتى نفاد آخر رصاصة في المخزن",
        "estCorrecte": false
      },
      {
        "id": 13302,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "التوقف الفوري عن الرمي، إبقاء الفوهة باتجاه الأهداف، وضع الإصبع خارج الزناد وتأمين السلاح",
        "estCorrecte": true
      },
      {
        "id": 13303,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "الالتفات بالسلاح الملقم نحو المدرب لسؤاله عن سبب الصياح",
        "estCorrecte": false
      },
      {
        "id": 13304,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "رمي السلاح الملقم على الأرض والركض نحو الباب الخارجي",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 134,
    "code": "Q-DIS-134",
    "categorie": "المواقف المهنية والانضباط",
    "categorie_code": "DISCIPLINE",
    "texte": "أثناء مراقبة روتينية للسيارات، تبين أن السائق المخالف قريب شخصي للدركي، فطلب منه إعفاءه من تسجيل المخالفة قائلاً: \"أنا من العائلة وعليك حمايتي\". كيف يتصرف الدركي النزيه؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "مقاومة المحاباة والمحسوبية",
      "سيادة القانون والتجرد الوظيفي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 3
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 2.5
      },
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2
      }
    ],
    "explication": "سيادة القانون تعلو فوق كل الروابط العائلية؛ يجب تطبيق الإجراءات القانونية المحددة بعدل وهدوء ولباقة، أو التماس تسليم تدبير المخالفة للزميل المرافق درءاً لأي شبهة محاباة.",
    "options": [
      {
        "id": 13401,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "تمزيق وثيقة المخالفة وتقديم اعتذار رسمي له والسماح له بالسياقة بسرعة مضاعفة",
        "estCorrecte": false
      },
      {
        "id": 13402,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "تطبيق القانون بكل تجرد وصرامة مهنية محترمة، وتأكيد أن الواجب الوطني يعلو فوق القرابة العائلية",
        "estCorrecte": true
      },
      {
        "id": 13403,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "طلب مبلغ مالي مضاعف منه كعقاب عائلي خاص",
        "estCorrecte": false
      },
      {
        "id": 13404,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "الهروب والاختباء وراء شجرة لتفادي التحدث معه",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 135,
    "code": "Q-DIS-135",
    "categorie": "المواقف المهنية والانضباط",
    "categorie_code": "DISCIPLINE",
    "texte": "التقى دركي بالزي النظامي في ساحة الثكنة بضابط يرتدي زيه العسكري لكنه لا ينتمي لنفس وحدته ولا يعرفه شخصياً. ما هو الواجب الانضباطي العسكري المباشر؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "التقاليد والتحية العسكرية",
      "احترام الرتب والتراتبية الهرمية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-GEH",
        "specialite": "GEH",
        "poids": 3
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 2.5
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 1.5
      }
    ],
    "explication": "التحية العسكرية تؤدى للرتبة والرمزية العسكرية والوطنية للزي وليس للشخص بحد ذاته؛ يجب تأدية التحية العسكرية النظامية بصرامة واعتزاز فور الالتقاء بأي رئيس تسلسلي أعلى رتبة.",
    "options": [
      {
        "id": 13501,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "تجاهله تماماً والمشي وكأنه غير موجود لأنه ليس رئيسه المباشر في المكتب",
        "estCorrecte": false
      },
      {
        "id": 13502,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "أداء التحية العسكرية النظامية الكاملة فوراً وبكل انضباط تقديراً للرتبة والتقاليد العسكرية العريقة",
        "estCorrecte": true
      },
      {
        "id": 13503,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "الغمز له بالعين والتلويح بيده بالتحية المدنية الخفيفة",
        "estCorrecte": false
      },
      {
        "id": 13504,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "طلب بطاقة تعريفه وتفتيش جيوبه في وسط الساحة",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 136,
    "code": "Q-DIS-136",
    "categorie": "المواقف المهنية والانضباط",
    "categorie_code": "DISCIPLINE",
    "texte": "أثناء مناورة ركن سيارة المصلحة العسكرية، اصطدمت المركبة بخفة بعمود إنارة مما تسبب في خدش طفيف في الصباغة الخلفية دون وجود شهود. ما هو السلوك المهني النزيه الواجب اتخاذه؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "الأمانة في صيانة ممتلكات الدولة",
      "الشجاعة الأدبية والمسؤولية الذاتية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 2.5
      },
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2
      },
      {
        "code": "SPEC-SEC-ADMIN",
        "specialite": "الإدارة والسكرتارية",
        "poids": 1.5
      }
    ],
    "explication": "الشجاعة الأدبية والنزاهة العسكرية تقتضي الإبلاغ الفوري للقائد التسلسلي وإنجاز تقرير عن الحادث العرضي لإصلاحه، وتجنب إخفاء العيوب أو تبرئة النفس بالباطل.",
    "options": [
      {
        "id": 13601,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "شراء طلاء وتغطية الخدش سراً وإنكار أي علم به لاحقاً",
        "estCorrecte": false
      },
      {
        "id": 13602,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الإبلاغ الفوري والصادق للرئيس التسلسلي بالواقعة وإنجاز تقرير تقني بالحادث العرضي بشفافية",
        "estCorrecte": true
      },
      {
        "id": 13603,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "اتهام الزميل الذي قاد السيارة في اليوم السابق بالتسبب في الحادث",
        "estCorrecte": false
      },
      {
        "id": 13604,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "ترك السيارة في الخلاء والمطالبة بسيارة جديدة بدلاً منها",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 137,
    "code": "Q-DIS-137",
    "categorie": "المواقف المهنية والانضباط",
    "categorie_code": "DISCIPLINE",
    "texte": "ما هي المبادئ الدستورية والأخلاقية الصارمة التي تحكم لجوء رجل الدرك لاستعمال \"القوة المشروعة\" (Force légitime) عند تنفيذ مهامه؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "مشروعية وتناسب استخدام القوة",
      "حقوق الإنسان وحماية الحريات"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 3
      },
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 2.5
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2
      }
    ],
    "explication": "استخدام القوة يجب أن يخضع دائماً لمبادئ: الشرعية القانونية (Légalité)، والضرورة القصوى (Nécessité)، والتناسب الدقيق مع حجم الخطر (Proportionnalité)، والتوقف الفوري بمجرد زوال التهديد.",
    "options": [
      {
        "id": 13701,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "استخدام القوة المفرطة ضد أي شخص لا يبتسم لرجال الدورية",
        "estCorrecte": false
      },
      {
        "id": 13702,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "مبادئ الشرعية، والضرورة الملحة، والتناسب الصارم مع حجم الخطر القائم، والتوقف فور زوال التهديد",
        "estCorrecte": true
      },
      {
        "id": 13703,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "استعمال السلاح الناري في جميع الحالات البسيطة لتوفير وقت التحقيق",
        "estCorrecte": false
      },
      {
        "id": 13704,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "الامتناع المطلق عن لمس أي مجرم حتى لو كان يطلق النار على المواطنين",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 138,
    "code": "Q-DIS-138",
    "categorie": "المواقف المهنية والانضباط",
    "categorie_code": "DISCIPLINE",
    "texte": "عاد دركي إلى منزله بعد المشاركة في عملية حساسة لتفكيك شبكة تهريب دولية لم يتم الإعلان عنها بعد. سألته زوجته وأقاربه بفضول عن سبب تأخره وماهية العملية. كيف يتعامل مع هذا الموقف؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "كتمان أسرار الدفاع والأمن",
      "الفصل الحازم بين العمل والحياة الأسرية"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 2.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 2.5
      },
      {
        "code": "SPEC-PJ",
        "specialite": "الشرطة القضائية",
        "poids": 2
      }
    ],
    "explication": "الحفاظ الصارم على كتمان السر المهني العسكري حتى داخل الدائرة الأسرية؛ التوضيح بلباقة ومودة أن طبيعة المهام تحظر الخوض في التفاصيل العملياتية حماية لأمن الوطن وسلامة الأسرة ذاتها.",
    "options": [
      {
        "id": 13801,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "سرد كافة التفاصيل وأسماء المتورطين وخطة الهجوم كاملة أثناء تناول العشاء",
        "estCorrecte": false
      },
      {
        "id": 13802,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الالتزام التام بالسر المهني، والامتناع بحكمة ومودة عن سرد أي معطيات عملياتية تمس سرية المهمة وأمنها",
        "estCorrecte": true
      },
      {
        "id": 13803,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "نشر صور المحجوزات في مجموعة الدردشة العائلية على الواتساب",
        "estCorrecte": false
      },
      {
        "id": 13804,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "دعوة أفراد العائلة للحضور في الغد لمشاهدة التحقيق مع المشتبه بهم",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 139,
    "code": "Q-DIS-139",
    "categorie": "المواقف المهنية والانضباط",
    "categorie_code": "DISCIPLINE",
    "texte": "أثناء ضبط حركة المرور، قام سائق غاضب بتوجيه شتائم نابية ومستفزة للدركي أمام الملأ. ما هو التصرف الاحترافي والمنضبط لمواجهة هذا الموقف؟",
    "difficulte": "متوسط",
    "difficulte_code": "MOYEN",
    "coefficient": 1.25,
    "competences": [
      "ضبط النفس والتحكم في الغضب",
      "الردع القانوني لجريمة إهانة موظف عمومي"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-PJ",
        "specialite": "المجال القانوني",
        "poids": 3
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 2.5
      },
      {
        "code": "SPEC-MOTARD",
        "specialite": "الدراجات النارية / السلامة الطرقية",
        "poids": 2
      }
    ],
    "explication": "التحلي بأعلى درجات ضبط النفس وعدم النزول لمستوى الشتم أو العنف البدني، وتثبيت واقعة \"إهانة موظف عمومي أثناء قيامه بمهامه\" قانونياً عبر الشهود والمحضر وإحالة المعتدي للعدالة.",
    "options": [
      {
        "id": 13901,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "تبادل السباب والشتائم والاشتباك معه بالأيدي أمام الجمهور",
        "estCorrecte": false
      },
      {
        "id": 13902,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "الحفاظ على الهدوء والوقار التام، وتثبيت جنحة إهانة موظف عمومي في محضر رسمي وتحريك المسطرة القضائية بصرامة",
        "estCorrecte": true
      },
      {
        "id": 13903,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "البكاء وترك مكان الخدمة والذهاب للمنزل فوراً",
        "estCorrecte": false
      },
      {
        "id": 13904,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "تحطيم سيارة السائق بواسطة السلاح الوظيفي في الشارع العام",
        "estCorrecte": false
      }
    ]
  },
  {
    "id": 140,
    "code": "Q-DIS-140",
    "categorie": "المواقف المهنية والانضباط",
    "categorie_code": "DISCIPLINE",
    "texte": "ما هو المعنى السامي لشعار الدرك الملكي الخالد \"الله - الوطن - الملك\" في وجدان وسلوك كل تلميذ ودركي في كل الميادين؟",
    "difficulte": "سهل",
    "difficulte_code": "FACILE",
    "coefficient": 1,
    "competences": [
      "العقيدة العسكرية والروح الوطنية",
      "الالتزام التام بثوابت الأمة والواجب المقدس"
    ],
    "specialites_ponderation": [
      {
        "code": "SPEC-GEH",
        "specialite": "GEH",
        "poids": 3
      },
      {
        "code": "SPEC-INSTRUCTEUR",
        "specialite": "التكوين والتعليم",
        "poids": 3
      },
      {
        "code": "SPEC-PSIG",
        "specialite": "العمليات الميدانية",
        "poids": 2
      },
      {
        "code": "SPEC-GSI",
        "specialite": "GSI",
        "poids": 2
      }
    ],
    "explication": "الشعار يجسد العقيدة الوطنية الراسخة: الإخلاص لله في أداء الأمانة، والتضحية والذود عن حوزة الوطن وسلامة أراضيه، والوفاء الدائم والولاء المطلق للقائد الأعلى ورئيس أركان الحرب العامة للقوات المسلحة الملكية.",
    "options": [
      {
        "id": 14001,
        "lettre": "A",
        "lettre_ar": "أ",
        "texte": "مجرد عبارة شكلية تُكتب على الأوراق الرسمية دون أي التزام روحي أو وطني",
        "estCorrecte": false
      },
      {
        "id": 14002,
        "lettre": "B",
        "lettre_ar": "ب",
        "texte": "العقيدة الوطنية الراسخة للإخلاص، والتفاني في خدمة المواطنين، والذود عن حوزة الوطن، والولاء التام للملك",
        "estCorrecte": true
      },
      {
        "id": 14003,
        "lettre": "C",
        "lettre_ar": "ج",
        "texte": "شعار يتم تذكره في أوقات العطلات الرسمية فقط",
        "estCorrecte": false
      },
      {
        "id": 14004,
        "lettre": "D",
        "lettre_ar": "د",
        "texte": "عبارة خاصة بكتب التاريخ المدرسي القديم",
        "estCorrecte": false
      }
    ]
  }
];

export default questionsBank140;
