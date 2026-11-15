// ==============================================================================
// ORIENT-GR - بنك الأسئلة المركزي الموحد (140 سؤال باللغة العربية)
// بنك أسئلة شامل يغطي كافة التخصصات والكفاءات العسكرية والأمنية للدرك
// ==============================================================================

/**
 * 140 أسئلة موزعة بتوازن دقيق على كافة التخصصات والمجالات:
 * 1. الشرطة القضائية والتحقيق الجنائي (SPEC-PJ / PROCEDURE) : 18 سؤال (1 -> 18)
 * 2. أمن الطرق وشرطة المرور والدراجات النارية (SPEC-ROUTE, SPEC-MOTARD) : 18 سؤال (19 -> 36)
 * 3. التدخل السريع والاقتحام ومكافحة الإرهاب (SPEC-PSIG, SPEC-GSI) : 18 سؤال (37 -> 54)
 * 4. حفظ النظام وفض الشغب والدرك المتحرك (SPEC-GM) : 16 سؤال (55 -> 70)
 * 5. أمن المنشآت الحساسة وحماية الشخصيات والمواكب (SPEC-GARDE, SPEC-GEH) : 14 سؤال (71 -> 84)
 * 6. المعلوميات، الأمن السيبراني والأدلة الرقمية (SPEC-INFO, SPEC-SEC-INFO) : 16 سؤال (85 -> 100)
 * 7. السكرتارية الإدارية، التوثيق وصياغة المحاضر (SPEC-SEC-ADMIN, COMMUNICATION) : 14 سؤال (101 -> 114)
 * 8. التكوين العسكري، البيداغوجيا والرماية التكتيكية (SPEC-INSTRUCTEUR) : 12 سؤال (115 -> 126)
 * 9. الشرطة التقنية والعلمية ومسرح الجريمة (SPEC-SCIENTIFIQUE / TECHNIQUE) : 14 سؤال (127 -> 140)
 * المجموع = 140 سؤالاً مع 4 خيارات لكل سؤال (أ، ب، ج، د) وإجابة صحيحة واحدة مؤكدة
 */

export const questionsBankArabic = [
  {
    "QuestionId": 1,
    "Code": "Q-PJ-001",
    "DomaineCode": "PROCEDURE",
    "DomaineIntitule": "الشرطة القضائية والمساطر الجنائية",
    "Enonce": "ما هو الإجراء الفوري الواجب اتخاذه من طرف ضابط الشرطة القضائية عند وصوله أولاً إلى مسرح جريمة قتل غامضة؟",
    "ContexteSituationnel": "إشعار هاتفي بوجود جثة داخل مستودع مهجور مع وجود آثار دماء وفوارغ رصاص.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-PJ",
      "SPEC-SCIENTIFIQUE"
    ],
    "CompetencesAssociees": [
      "حماية مسرح الجريمة",
      "المسطرة الجنائية",
      "حفظ الأدلة"
    ],
    "Explication": "الإجراء الأول والأهم هو تجميد المسرح ووضع طوق أمني لمنع ولوج أي شخص حفاظاً على البصمات والآثار المادية الدقيقة.",
    "Options": [
      {
        "OptionId": 11,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "البدء فوراً في تفتيش ملابس الضحية للبحث عن وثائق هويتها",
        "EstCorrecte": false
      },
      {
        "OptionId": 12,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "فرض طوق أمني عازل وتجميد المسرح ومنع دخول أي شخص لحين وصول فريق التشخيص القضائي",
        "EstCorrecte": true
      },
      {
        "OptionId": 13,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "نقل الجثة على وجه السرعة إلى المستشفى قبل تصوير الموقع",
        "EstCorrecte": false
      },
      {
        "OptionId": 14,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "جمع فوارغ الرصاص ووضعها في الجيب لتسليمها للنيابة العامة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 2,
    "Code": "Q-PJ-002",
    "DomaineCode": "PROCEDURE",
    "DomaineIntitule": "الشرطة القضائية والمساطر الجنائية",
    "Enonce": "أي من الحالات التالية تُعتبر قانوناً حالة تلبس بجناية أو جنحة وفقاً لقانون المسطرة الجنائية؟",
    "ContexteSituationnel": "دورية أمنية تشاهد مشتبهاً به يركض وتتعالى وراءه صياح المواطنين طلباً للنجدة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "FACILE",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-PJ",
      "SPEC-ROUTE"
    ],
    "CompetencesAssociees": [
      "حالة التلبس",
      "التكييف القانوني"
    ],
    "Explication": "تعتبر الجريمة متلبساً بها إذا كان الفاعل مطارداً بصياح الجمهور إثر ارتكابها مباشرة.",
    "Options": [
      {
        "OptionId": 21,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "إذا ارتكبت الجريمة منذ أسبوع واعترف بها الفاعل لدى صديقه",
        "EstCorrecte": false
      },
      {
        "OptionId": 22,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "إذا وجد المشتبه به يتبعه صياح الجمهور على إثر وقوع الجريمة بوقت قريب جداً",
        "EstCorrecte": true
      },
      {
        "OptionId": 23,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إذا وردت وشاية مجهولة ضد شخص بحيازة أسلحة قديمة",
        "EstCorrecte": false
      },
      {
        "OptionId": 24,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "إذا نشر المشتبه به منشوراً غامضاً على مواقع التواصل قبل شهر",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 3,
    "Code": "Q-PJ-003",
    "DomaineCode": "PROCEDURE",
    "DomaineIntitule": "الشرطة القضائية والمساطر الجنائية",
    "Enonce": "ما هي الشروط القانونية الإلزامية لإجراء تفتيش قانوني لمنازل المواطنين في غير حالة التلبس؟",
    "ContexteSituationnel": "معلومات تفيد بإخفاء مسروقات داخل منزل مشتبه به في قضية سرقة موصوفة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-PJ"
    ],
    "CompetencesAssociees": [
      "حرمة المنازل",
      "إجراءات التفتيش"
    ],
    "Explication": "في البحث التمهيدي العادي، يتطلب التفتيش إذناً صريحاً ومكتوباً من الشخص المعني أو إذناً قضائياً مع احترام المواقيت القانونية.",
    "Options": [
      {
        "OptionId": 31,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "موافقة شفوية من الجيران ودخول المنزل في أي ساعة من الليل",
        "EstCorrecte": false
      },
      {
        "OptionId": 32,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "إذن كتابي صريح من صاحب المنزل أو إذن قضائي مع احترام الساعات القانونية للتفتيش",
        "EstCorrecte": true
      },
      {
        "OptionId": 33,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "حضور عونين من السلطة المحلية دون إشعار النيابة العامة إطلاقاً",
        "EstCorrecte": false
      },
      {
        "OptionId": 34,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "كسر الباب مباشرة عند الفجر بمجرد وجود شك بسيط",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 4,
    "Code": "Q-PJ-004",
    "DomaineCode": "PROCEDURE",
    "DomaineIntitule": "الشرطة القضائية والمساطر الجنائية",
    "Enonce": "ما هو المبدأ الأساسي الذي يحكم سماع أقوال القاصرين المشتبه بارتكابهم لمخالفة للقانون الجنائي؟",
    "ContexteSituationnel": "إيقاف قاصر يبلغ من العمر 15 سنة في حالة اعتداء بالضرب والجرح.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 80,
    "SpecialitesAssociees": [
      "SPEC-PJ",
      "SPEC-SEC-ADMIN"
    ],
    "CompetencesAssociees": [
      "حماية الطفولة",
      "الضمانات القانونية"
    ],
    "Explication": "يجب قانوناً إشعار ولي أمره فوراً وضمان حضور الممثل القانوني أو محام أثناء الاستماع مع مراعاة مصلحة القاصر الفضلى.",
    "Options": [
      {
        "OptionId": 41,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "عزله في زنزانة انفرادية ومنع والديه من معرفة مكانه لمدة 48 ساعة",
        "EstCorrecte": false
      },
      {
        "OptionId": 42,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "إشعار الولي الشرعي أو الحاضن وحضوره ومراعاة فصله عن الراشدين أثناء الحراسة النظرية",
        "EstCorrecte": true
      },
      {
        "OptionId": 43,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "اعتباره راشداً بمجرد تجاوزه سن 14 سنة في قضايا العنف",
        "EstCorrecte": false
      },
      {
        "OptionId": 44,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "إجباره على توقيع المحضر دون قراءته أو تفهيمه التهم المنسوبة إليه",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 5,
    "Code": "Q-PJ-005",
    "DomaineCode": "PROCEDURE",
    "DomaineIntitule": "الشرطة القضائية والمساطر الجنائية",
    "Enonce": "عند تحريز سلاح ناري استعمل في جريمة بموقع الحادث، كيف يجب التعامل معه فنياً وقضائياً؟",
    "ContexteSituationnel": "العثور على مسدس نصف آلي ملقى على أرضية رطبة بجوار جدار.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-PJ",
      "SPEC-SCIENTIFIQUE"
    ],
    "CompetencesAssociees": [
      "تحريز الأسلحة",
      "سلسلة الحيازة"
    ],
    "Explication": "يجب تأمين السلاح بحذر شديد دون مسح البصمات، ونزع المخزن ووضعه في حرز صلب وتدوين أوصافه ورقم تسلسله.",
    "Options": [
      {
        "OptionId": 51,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "إدخال قلم في فوهة السلاح لرفعه مما قد يتلف الخطوط الحلزونية للسبطانة",
        "EstCorrecte": false
      },
      {
        "OptionId": 52,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تأمينه بحذر مع الحفاظ على الآثار البيولوجية والبصمات ووضعه في حرز خاص محكم الإغلاق",
        "EstCorrecte": true
      },
      {
        "OptionId": 53,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "تنظيف السلاح بالزيت لإزالة الأتربة قبل إرساله إلى المختبر",
        "EstCorrecte": false
      },
      {
        "OptionId": 54,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "إطلاق رصاصة تجريبية في الهواء للتأكد من صلاحيته للعمل",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 6,
    "Code": "Q-PJ-006",
    "DomaineCode": "PROCEDURE",
    "DomaineIntitule": "الشرطة القضائية والمساطر الجنائية",
    "Enonce": "ما هي المدة القانونية الأصلية للوضع تحت الحراسة النظرية في الجرائم العادية قبل التمديد؟",
    "ContexteSituationnel": "توقيف مشتبه به في قضية سرقة وإيداعه غرفة الأمان.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "FACILE",
    "Points": 1,
    "TempsLimiteSecondes": 60,
    "SpecialitesAssociees": [
      "SPEC-PJ"
    ],
    "CompetencesAssociees": [
      "الحراسة النظرية",
      "آجال التوقيف"
    ],
    "Explication": "المدة الأصلية للحراسة النظرية في الجنايات والجنح العادية هي 48 ساعة تحتسب من ساعة توقيف الشخص.",
    "Options": [
      {
        "OptionId": 61,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "24 ساعة فقط غير قابلة للتمديد",
        "EstCorrecte": false
      },
      {
        "OptionId": 62,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "48 ساعة تبتدئ من لحظة توقيف المشتبه به فعلياً",
        "EstCorrecte": true
      },
      {
        "OptionId": 63,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "96 ساعة مباشرة دون إشعار النيابة العامة",
        "EstCorrecte": false
      },
      {
        "OptionId": 64,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "أسبوع كامل في جميع أنواع المخالفات",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 7,
    "Code": "Q-PJ-007",
    "DomaineCode": "PROCEDURE",
    "DomaineIntitule": "الشرطة القضائية والمساطر الجنائية",
    "Enonce": "في مسرح الجريمة، ما هو الترتيب النموذجي لإجراء المعاينات الفنية الأولية؟",
    "ContexteSituationnel": "وصول المحققين إلى شقة تعرضت لعملية سطو مسلح.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-PJ",
      "SPEC-SCIENTIFIQUE"
    ],
    "CompetencesAssociees": [
      "منهجية مسرح الجريمة",
      "المعاينة"
    ],
    "Explication": "المنهجية العلمية تبدأ بالملاحظة العامة والتصوير، ثم رسم المخطط، ثم رفع الآثار القابلة للزوال، ثم تحريز الأدوات.",
    "Options": [
      {
        "OptionId": 71,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "جمع الأشياء ثم التصوير ثم الاستماع للضحية بعد مغادرة المكان",
        "EstCorrecte": false
      },
      {
        "OptionId": 72,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "الملاحظة البصرية الشاملة، التصوير الفوتوغرافي، المخطط الطبوغرافي، ثم رفع الآثار وتحريزها",
        "EstCorrecte": true
      },
      {
        "OptionId": 73,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "غسل الأرضية لإظهار البقع المخفية قبل رفع العينات البيولوجية",
        "EstCorrecte": false
      },
      {
        "OptionId": 74,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "استدعاء أقارب الضحية للبحث معهم عن الأغراض المفقودة قبل فحص البصمات",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 8,
    "Code": "Q-PJ-008",
    "DomaineCode": "PROCEDURE",
    "DomaineIntitule": "الشرطة القضائية والمساطر الجنائية",
    "Enonce": "ما هو الأثر القانوني المترتب عن إغفال تلاوة الحقوق الأساسية (كالحق في الصمت ومساعدة محام) على المشتبه به عند توقيفه؟",
    "ContexteSituationnel": "متابعة قضائية مع دفع الدفاع بخرق الإجراءات الجوهرية للحراسة النظرية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-PJ"
    ],
    "CompetencesAssociees": [
      "بطلان الإجراءات",
      "حقوق المشتبه به"
    ],
    "Explication": "تعتبر تلاوة الحقوق إجراءً جوهرياً وإغفالها يعرض المحضر والمتابعة للبطلان أمام قضاء الموضوع.",
    "Options": [
      {
        "OptionId": 81,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "لا أثر له إطلاقاً وتعتبر المحاكمة سليمة دائماً",
        "EstCorrecte": false
      },
      {
        "OptionId": 82,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "إمكانية إبطال الإجراءات والمحاضر المنجزة لخرق الضمانات الدستورية والمحاكمة العادلة",
        "EstCorrecte": true
      },
      {
        "OptionId": 83,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "تخفيض العقوبة فقط دون التأثير على صحة المحضر",
        "EstCorrecte": false
      },
      {
        "OptionId": 84,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "تحويل الملف تلقائياً إلى المحكمة الإدارية",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 9,
    "Code": "Q-PJ-009",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "الشرطة القضائية والمساطر الجنائية",
    "Enonce": "خلال استجواب مشتبه به، حاول هذا الأخير تقديم رشوة مالية لضابط الشرطة القضائية مقابل إتلاف أحد الأحراز، ما هو التصرف القانوني السليم؟",
    "ContexteSituationnel": "عرض مبلغ نقدي كبير أثناء جلسة الاستماع داخل مقر الفرقة القضائية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-PJ",
      "SPEC-SEC-ADMIN"
    ],
    "CompetencesAssociees": [
      "النزاهة والإنفاذ",
      "مكافحة الفساد"
    ],
    "Explication": "الرفض القاطع وتوثيق الواقعة في محضر تلبس جديد بجريمة الرشوة وإشعار النيابة العامة وتحريز المبلغ المعروض.",
    "Options": [
      {
        "OptionId": 91,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "أخذ المبلغ وتسجيله كتبرع لصندوق الوحدة الأمنية",
        "EstCorrecte": false
      },
      {
        "OptionId": 92,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "رفض الرشوة فوراً، حجز المبلغ المالي، تحرير محضر بجناية الرشوة وإشعار النيابة العامة",
        "EstCorrecte": true
      },
      {
        "OptionId": 93,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "تجاهل الأمر والاكتفاء بنصحه شفوياً بعدم تكرار ذلك",
        "EstCorrecte": false
      },
      {
        "OptionId": 94,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "تمزيق المحضر القديم وبدء التحقيق من جديد كأن شيئاً لم يكن",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 10,
    "Code": "Q-PJ-010",
    "DomaineCode": "PROCEDURE",
    "DomaineIntitule": "الشرطة القضائية والمساطر الجنائية",
    "Enonce": "ما هو التعريف الدقيق لسلسلة الحيازة (Chain of Custody) في المعاينة الجنائية؟",
    "ContexteSituationnel": "توثيق حركة ونقل عينات الحمض النووي من مسرح الجريمة إلى المختبر.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-PJ",
      "SPEC-SCIENTIFIQUE"
    ],
    "CompetencesAssociees": [
      "سلسلة الحيازة",
      "توثيق الأدلة"
    ],
    "Explication": "سلسلة الحيازة هي السجل الدقيق الذي يوثق هوية كل من جمع، عاين، نقل أو تسلم الحرز منذ لحظة ضبطه حتى تقديمه للمحكمة.",
    "Options": [
      {
        "OptionId": 101,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "السلاسل الحديدية المستخدمة لتقييد المتهمين الخطرين",
        "EstCorrecte": false
      },
      {
        "OptionId": 102,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "التوثيق المستمر وغير المنقطع لكل من تسلم وفحص الدليل المادي لضمان عدم التلاعب به",
        "EstCorrecte": true
      },
      {
        "OptionId": 103,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "قائمة الشهود الذين تم الاستماع إليهم في الملف",
        "EstCorrecte": false
      },
      {
        "OptionId": 104,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "المدة الزمنية الفاصلة بين وقوع الجريمة ومحاكمة المتهم",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 11,
    "Code": "Q-PJ-011",
    "DomaineCode": "PROCEDURE",
    "DomaineIntitule": "الشرطة القضائية والمساطر الجنائية",
    "Enonce": "كيف يتم التعامل مع الآثار الدموية الرطبة المعثور عليها على ملابس الضحية لضمان عدم تلف الحمض النووي (DNA)؟",
    "ContexteSituationnel": "رفع ملابس مبللة بالدماء في قضية اعتداء خطير.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-PJ",
      "SPEC-SCIENTIFIQUE"
    ],
    "CompetencesAssociees": [
      "الآثار البيولوجية",
      "حفظ العينات"
    ],
    "Explication": "يجب تجفيف الملابس في الهواء الطلق بدرجة حرارة الغرفة ثم تعبئتها في أظرفة ورقية تمنع نمو الفطريات.",
    "Options": [
      {
        "OptionId": 111,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "وضعها فوراً في كيس بلاستيكي محكم الإغلاق وهي رطبة لتسريع التعفن",
        "EstCorrecte": false
      },
      {
        "OptionId": 112,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تركها تجف طبيعياً في الهواء ثم تعبئتها في أظرفة ورقية تسمح بمرور الهواء وتمنع نمو الفطريات",
        "EstCorrecte": true
      },
      {
        "OptionId": 113,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "غسلها بالماء المقطر والصابون قبل تحريزها",
        "EstCorrecte": false
      },
      {
        "OptionId": 114,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "كيها بمكواة ساخنة للقضاء على البكتيريا",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 12,
    "Code": "Q-PJ-012",
    "DomaineCode": "PROCEDURE",
    "DomaineIntitule": "الشرطة القضائية والمساطر الجنائية",
    "Enonce": "ما هو الإجراء الواجب عند رغبة مشتبه به موضوع تحت الحراسة النظرية في فحص طبي؟",
    "ContexteSituationnel": "ادعاء المشتبه به إصابته بآلام حادة أو تعرضه لإصابة قبل التوقيف.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 70,
    "SpecialitesAssociees": [
      "SPEC-PJ"
    ],
    "CompetencesAssociees": [
      "الفحص الطبي",
      "حقوق المحتجز"
    ],
    "Explication": "عرضه وجوباً على طبيب مؤهل وإدراج التقرير الطبي ضمن وثائق المسطرة القضائية.",
    "Options": [
      {
        "OptionId": 121,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "رفض طلبه واعتباره مجرد محاولة لربح الوقت والتهرب من الأسئلة",
        "EstCorrecte": false
      },
      {
        "OptionId": 122,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "عرضه وجوباً على طبيب مؤهل وإدراج التقرير الطبي ضمن وثائق المسطرة القضائية",
        "EstCorrecte": true
      },
      {
        "OptionId": 123,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إعطاؤه مهدئات دون استشارة طبية لإسكاته",
        "EstCorrecte": false
      },
      {
        "OptionId": 124,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "إطلاق سراحه دون إشعار النيابة العامة تفادياً للمسؤولية",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 13,
    "Code": "Q-PJ-013",
    "DomaineCode": "PROCEDURE",
    "DomaineIntitule": "الشرطة القضائية والمساطر الجنائية",
    "Enonce": "ما هي مواقيت التفتيش القانونية للمنازل المحددة في القانون الجنائي ما لم توجد حالة استثنائية منصوص عليها؟",
    "ContexteSituationnel": "تخطيط مداهمة منزل بموجب إنابة قضائية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "FACILE",
    "Points": 1,
    "TempsLimiteSecondes": 65,
    "SpecialitesAssociees": [
      "SPEC-PJ",
      "SPEC-PSIG"
    ],
    "CompetencesAssociees": [
      "المواقيت القانونية",
      "حرمة المسكن"
    ],
    "Explication": "بين الساعة السادسة صباحاً والتاسعة ليلاً (06:00 إلى 21:00).",
    "Options": [
      {
        "OptionId": 131,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "بين منتصف الليل والرابعة صباحاً فقط",
        "EstCorrecte": false
      },
      {
        "OptionId": 132,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "بين الساعة السادسة صباحاً والتاسعة ليلاً (06:00 إلى 21:00)",
        "EstCorrecte": true
      },
      {
        "OptionId": 133,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "في أي وقت يختاره المحقق دون أي قيد زمني",
        "EstCorrecte": false
      },
      {
        "OptionId": 134,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "أيام العطل الأسبوعية فقط بعد الظهيرة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 14,
    "Code": "Q-PJ-014",
    "DomaineCode": "PROCEDURE",
    "DomaineIntitule": "الشرطة القضائية والمساطر الجنائية",
    "Enonce": "ما هي البيانات الجوهرية التي يجب أن يتضمنها محضر المعاينة الميدانية لمسرح الجريمة تحت طائلة النقص الإجرائي؟",
    "ContexteSituationnel": "تحرير محضر رسمي مفصل موجه للنيابة العامة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 80,
    "SpecialitesAssociees": [
      "SPEC-PJ",
      "SPEC-SEC-ADMIN"
    ],
    "CompetencesAssociees": [
      "صياغة المحاضر",
      "المعاينة الفنية"
    ],
    "Explication": "التاريخ والساعة، هوية المحققين، الوصف الدقيق للأماكن، الأدلة المرفوعة وتوقيع الضابط المحرر.",
    "Options": [
      {
        "OptionId": 141,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "التخمينات الشخصية لضابط الشرطة حول أخلاق الضحية فقط",
        "EstCorrecte": false
      },
      {
        "OptionId": 142,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "التاريخ والساعة، هوية المحققين، الوصف الدقيق للأماكن، الأدلة المرفوعة وتوقيع الضابط المحرر",
        "EstCorrecte": true
      },
      {
        "OptionId": 143,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "أسماء الصحفيين الحاضرين في الموقع وعناوين مقالاتهم",
        "EstCorrecte": false
      },
      {
        "OptionId": 144,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "ملخص موجز من سطرين دون ذكر حالة الأشياء المحجوزة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 15,
    "Code": "Q-PJ-015",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "الشرطة القضائية والمساطر الجنائية",
    "Enonce": "أثناء تفتيش سيارة مشبوهة، عثرت عناصر الدرك على كيس يحتوي مسحوقاً أبيض وقطع نقدية أثرية، ما هو التدبير الفوري السليم؟",
    "ContexteSituationnel": "نقطة مراقبة تابعة للدرك توقف مركبة تسير ليلاً دون أضواء.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-PJ",
      "SPEC-ROUTE"
    ],
    "CompetencesAssociees": [
      "ضبط المحجوزات",
      "إشعار القيادة والنيابة"
    ],
    "Explication": "شحن السيارة وركابها للسرية، تحريز المضبوطات بأرقام تسلسلية وإشعار النيابة العامة وقسم مكافحة المخدرات.",
    "Options": [
      {
        "OptionId": 151,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "تذوق المسحوق الأبيض لمعرفة ما إذا كان سكراً أو مخدراً",
        "EstCorrecte": false
      },
      {
        "OptionId": 152,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "شحن السيارة وركابها للسرية، تحريز المضبوطات بأرقام تسلسلية وإشعار النيابة العامة وقسم مكافحة المخدرات",
        "EstCorrecte": true
      },
      {
        "OptionId": 153,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "السماح للسائق بالمغادرة واحتجاز مرافقه فقط",
        "EstCorrecte": false
      },
      {
        "OptionId": 154,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "بيع القطع الأثرية في المزاد العلني فوراً",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 16,
    "Code": "Q-PJ-016",
    "DomaineCode": "PROCEDURE",
    "DomaineIntitule": "الشرطة القضائية والمساطر الجنائية",
    "Enonce": "ما هو الفرق القانوني الجوهري بين الشهادة والاعتراف في الإثبات الجنائي؟",
    "ContexteSituationnel": "جلسة مناقشة حجج الإثبات في مسطرة قضائية معقدة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-PJ"
    ],
    "CompetencesAssociees": [
      "طرق الإثبات",
      "المسطرة الجنائية"
    ],
    "Explication": "الشهادة إقرار من طرف ثالث غير متهم بعد أداء اليمين، والاعتراف إقرار المتهم بالأفعال المنسوبة إليه.",
    "Options": [
      {
        "OptionId": 161,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الشهادة تصدر من المتهم والاعتراف يصدر من الضحية حصراً",
        "EstCorrecte": false
      },
      {
        "OptionId": 162,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "الشهادة إقرار من طرف ثالث غير متهم بعد أداء اليمين، والاعتراف إقرار المتهم بالأفعال المنسوبة إليه",
        "EstCorrecte": true
      },
      {
        "OptionId": 163,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "الشهادة تعفي المتهم من العقوبة دائماً والاعتراف يؤدي للبراءة",
        "EstCorrecte": false
      },
      {
        "OptionId": 164,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "لا يوجد أي فرق بينهما فكلاهما متطابقان تماماً",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 17,
    "Code": "Q-PJ-017",
    "DomaineCode": "PROCEDURE",
    "DomaineIntitule": "الشرطة القضائية والمساطر الجنائية",
    "Enonce": "ما هي الحالات التي يجوز فيها قانوناً تمديد فترة الحراسة النظرية بطلب من ضابط الشرطة القضائية؟",
    "ContexteSituationnel": "تحقيق في شبكة إجرامية عابرة للحدود لتجارة المخدرات الصلبة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-PJ"
    ],
    "CompetencesAssociees": [
      "تمديد الحراسة النظرية",
      "إذن النيابة"
    ],
    "Explication": "بموجب إذن كتابي صريح ومعلل من ممثل النيابة العامة المختص إذا اقتضت ذلك ضرورة البحث.",
    "Options": [
      {
        "OptionId": 171,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "بقرار منفرد من الدركي المكلف بالخفارة دون الرجوع للنيابة",
        "EstCorrecte": false
      },
      {
        "OptionId": 172,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "بموجب إذن كتابي صريح ومعلل من ممثل النيابة العامة المختص إذا اقتضت ذلك ضرورة البحث",
        "EstCorrecte": true
      },
      {
        "OptionId": 173,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "بموافقة شفوية من رئيس الجماعة المحلية",
        "EstCorrecte": false
      },
      {
        "OptionId": 174,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "بمجرد امتناع المتهم عن الأكل والشرب",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 18,
    "Code": "Q-PJ-018",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "الشرطة القضائية والمساطر الجنائية",
    "Enonce": "وصلت معلومات لفرقة الأبحاث عن تواجد أسلحة بمستودع، وحين مداهمته حاول المشتبه به حرق وثائق، ما هو السلوك الميداني العاجل؟",
    "ContexteSituationnel": "مداهمة مباغتة في إطار قضية تمس أمن الدولة وتهريب الأسلحة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "EXPERT",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-PJ",
      "SPEC-GSI",
      "SPEC-PSIG"
    ],
    "CompetencesAssociees": [
      "السيطرة الفورية",
      "حماية الأدلة سريعة الزوال"
    ],
    "Explication": "شل حركة المشتبه به فوراً، عزل مصدر النيران وإنقاذ الوثائق المحترقة جزئياً وتحريزها للمختبر الجنائي.",
    "Options": [
      {
        "OptionId": 181,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الانتظار حتى تحترق الأوراق بالكامل لتفادي استنشاق الدخان",
        "EstCorrecte": false
      },
      {
        "OptionId": 182,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "شل حركة المشتبه به فوراً، عزل مصدر النيران وإنقاذ الوثائق المحترقة جزئياً وتحريزها للمختبر الجنائي",
        "EstCorrecte": true
      },
      {
        "OptionId": 183,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إطلاق النار فوراً على الوثائق لإطفائها",
        "EstCorrecte": false
      },
      {
        "OptionId": 184,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "مغادرة المستودع والعودة في اليوم التالي",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 19,
    "Code": "Q-RT-001",
    "DomaineCode": "ROUTE",
    "DomaineIntitule": "أمن الطرق وسلامة السير والمطاردة",
    "Enonce": "ما هي المسافة الأمنية النموذجية الموصى بها بين مركبة الدورية ومركبة مشتبه بها يتم توقيفها على جانب الطريق السيار؟",
    "ContexteSituationnel": "توقيف ليلي لسيارة مشتبه بها على قارعة طريق سريع ذي ثلاث مسارات.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 80,
    "SpecialitesAssociees": [
      "SPEC-ROUTE",
      "SPEC-MOTARD"
    ],
    "CompetencesAssociees": [
      "الأمن الطرقي",
      "توقيف المركبات"
    ],
    "Explication": "التوقف خلفها بمسافة 8 إلى 12 متراً مع إزاحة خفيفة للدورية لتشكيل ممر أمان للدركي الراجل.",
    "Options": [
      {
        "OptionId": 191,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "التصاق تام بالمصد الخلفي لمنعها من الرجوع إلى الوراء",
        "EstCorrecte": false
      },
      {
        "OptionId": 192,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "التوقف خلفها بمسافة 8 إلى 12 متراً مع إزاحة خفيفة للدورية لتشكيل ممر أمان للدركي الراجل",
        "EstCorrecte": true
      },
      {
        "OptionId": 193,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "التوقف أمامها مباشرة وسد الطريق بقطع مسار السير",
        "EstCorrecte": false
      },
      {
        "OptionId": 194,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "إطفاء جميع أضواء الدورية والوقوف في الظلام التام",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 20,
    "Code": "Q-RT-002",
    "DomaineCode": "ROUTE",
    "DomaineIntitule": "أمن الطرق وسلامة السير والمطاردة",
    "Enonce": "عند ملاحقة سيارة ترفض الامتثال وتتحرك بسرعة جنونية قرب منطقة آهلة بالسكان، ما هو القرار التكتيكي السليم لقائد الدورية؟",
    "ContexteSituationnel": "سائق متهور يرفض التوقف عند السد القضائي ويتجه نحو مركز قرية مزدحم.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-ROUTE",
      "SPEC-MOTARD"
    ],
    "CompetencesAssociees": [
      "تقدير المخاطر الميدانية",
      "قواعد المطاردة"
    ],
    "Explication": "تجنب المطاردة الخطيرة والتنسيق عبر اللاسلكي لقطع المنافذ بالسدود الأمامية وحماية حياة المدنيين.",
    "Options": [
      {
        "OptionId": 201,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "صدم المركبة المشتبه بها بقوة وسط الحشود لإيقافها مهما كانت النتيجة",
        "EstCorrecte": false
      },
      {
        "OptionId": 202,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تجنب المطاردة الخطيرة والتنسيق عبر اللاسلكي لقطع المنافذ بالسدود الأمامية وحماية حياة المدنيين",
        "EstCorrecte": true
      },
      {
        "OptionId": 203,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إطلاق الرصاص الحي عشوائياً باتجاه الزجاج الخلفي للسيارة وسط المارة",
        "EstCorrecte": false
      },
      {
        "OptionId": 204,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "الانسحاب التام وعدم تحرير أي بلاغ أو محضر بالحادث",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 21,
    "Code": "Q-RT-003",
    "DomaineCode": "ROUTE",
    "DomaineIntitule": "أمن الطرق وسلامة السير والمطاردة",
    "Enonce": "ما هي الزاوية التي يجب أن يقف فيها الدركي المراجل أثناء فحص وثائق السائق لحمايته من أي اعتداء مباغت بالسلاح؟",
    "ContexteSituationnel": "دركي يطلب رخصة السياقة وأوراق المركبة من سائق شاحنة مشتبه به.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-ROUTE",
      "SPEC-MOTARD"
    ],
    "CompetencesAssociees": [
      "التمركز التكتيكي",
      "الحماية الذاتية"
    ],
    "Explication": "الوقوف خلف العمود الأوسط للسيارة (قائم الباب) بزاوية رؤية خلف كتف السائق.",
    "Options": [
      {
        "OptionId": 211,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الوقوف أمام زجاج السيارة الأمامي مباشرة ومواجهة السائق وجهاً لوجه",
        "EstCorrecte": false
      },
      {
        "OptionId": 212,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "الوقوف خلف العمود الأوسط للسيارة (قائم الباب) بزاوية رؤية خلف كتف السائق",
        "EstCorrecte": true
      },
      {
        "OptionId": 213,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "الجلوس داخل سيارة المشتبه به في المقعد المجاور له",
        "EstCorrecte": false
      },
      {
        "OptionId": 214,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "إسناد اليدين على مقود سيارة المشتبه به وإمالة الرأس داخل النافذة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 22,
    "Code": "Q-RT-004",
    "DomaineCode": "ROUTE",
    "DomaineIntitule": "أمن الطرق وسلامة السير والمطاردة",
    "Enonce": "ما هو الإجراء الفني القانوني عند قياس نسبة الكحول في هواء الزفير لسائق ضبط يقود بحالة سكر بين؟",
    "ContexteSituationnel": "سائق يترنح وتفوح منه رائحة مسكر قوية عند نقطة مراقبة ليلية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 80,
    "SpecialitesAssociees": [
      "SPEC-ROUTE"
    ],
    "CompetencesAssociees": [
      "جهاز الكحوليمتر",
      "قمع المخالفات"
    ],
    "Explication": "استعمال جهاز كحوليمتر معتمد ومعاير برأس جديد معقم وطباعة التذكرة الفنية وإلحاقها بالمحضر.",
    "Options": [
      {
        "OptionId": 221,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الطلب منه المشي على خط مرسوم على الأرض فقط دون أي جهاز علمي",
        "EstCorrecte": false
      },
      {
        "OptionId": 222,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "استعمال جهاز كحوليمتر معتمد ومعاير برأس جديد معقم وطباعة التذكرة الفنية وإلحاقها بالمحضر",
        "EstCorrecte": true
      },
      {
        "OptionId": 223,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إرغامه على شرب كمية من الحليب الساخن في الحين لإخفاء الرائحة",
        "EstCorrecte": false
      },
      {
        "OptionId": 224,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "إطلاق سراحه إذا قدم اعتذاراً شفوياً لعناصر الدورية",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 23,
    "Code": "Q-RT-005",
    "DomaineCode": "ROUTE",
    "DomaineIntitule": "أمن الطرق وسلامة السير والمطاردة",
    "Enonce": "أثناء السياقة العملياتية للدراجات النارية في المنعرجات السريعة أثناء المواكبة، ما هي تقنية التوجيه العكسي (Counter-steering)؟",
    "ContexteSituationnel": "دراج دركي يواكب موكباً رسمياً ويدخل منعرجاً ضيقاً على سرعة 90 كم/س.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "EXPERT",
    "Points": 2,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-MOTARD",
      "SPEC-GEH"
    ],
    "CompetencesAssociees": [
      "القيادة المتقدمة",
      "تقنيات الدراجة النارية"
    ],
    "Explication": "دفع مقبض المقود باليد اليمنى للانعطاف يميناً مما يولد ميلاً فورياً آمناً للدراجة.",
    "Options": [
      {
        "OptionId": 231,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "استعمال الفرامل الأمامية بقوة في أقصى المنعرج لتثبيت المقود",
        "EstCorrecte": false
      },
      {
        "OptionId": 232,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "دفع مقبض المقود باليد اليمنى للانعطاف يميناً مما يولد ميلاً فورياً آمناً للدراجة",
        "EstCorrecte": true
      },
      {
        "OptionId": 233,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "الوقوف على الدواسات وإغلاق العينين جزئياً لتفادي الانزلاق",
        "EstCorrecte": false
      },
      {
        "OptionId": 234,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "فصل القابض (Embrayage) بالكامل وترك الدراجة تسير باندفاعها الحر",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 24,
    "Code": "Q-RT-006",
    "DomaineCode": "ROUTE",
    "DomaineIntitule": "أمن الطرق وسلامة السير والمطاردة",
    "Enonce": "ما هي المسافة التقديرية للتوقف التام لسيارة تسير بسرعة 120 كم/س على طريق جاف بحساب زمن رد الفعل ومسافة الفرملة؟",
    "ContexteSituationnel": "معاينة حادث سير مأساوي وتقدير السرعة بناء على طول آثار الفرملة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-ROUTE",
      "SPEC-TECH"
    ],
    "CompetencesAssociees": [
      "الحساب الطرقي",
      "معاينة حوادث السير"
    ],
    "Explication": "حوالي 108 إلى 120 متراً في الظروف المناخية العادية.",
    "Options": [
      {
        "OptionId": 241,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "20 متراً فقط مهما كانت سرعة السيارة",
        "EstCorrecte": false
      },
      {
        "OptionId": 242,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "حوالي 108 إلى 120 متراً في الظروف المناخية العادية",
        "EstCorrecte": true
      },
      {
        "OptionId": 243,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "أكثر من 500 متر في جميع الحالات",
        "EstCorrecte": false
      },
      {
        "OptionId": 244,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "نصف متر عند استخدام نظام ABS المتطور",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 25,
    "Code": "Q-RT-007",
    "DomaineCode": "ROUTE",
    "DomaineIntitule": "أمن الطرق وسلامة السير والمطاردة",
    "Enonce": "عند نصب سد قضائي على طريق وطني ليلاً، ما هي أول خطوة لضمان سلامة عناصر الدرك ومستعملي الطريق؟",
    "ContexteSituationnel": "إعداد نقطة تفتيش ليلية للحد من تهريب البضائع والأسلحة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 80,
    "SpecialitesAssociees": [
      "SPEC-ROUTE",
      "SPEC-GM"
    ],
    "CompetencesAssociees": [
      "تنظيم السدود القضائية",
      "السلامة الميدانية"
    ],
    "Explication": "تثبيت التشوير الطرقي العاكس التدريجي والأضواء التحذيرية على مسافة كافية لإنذار السائقين.",
    "Options": [
      {
        "OptionId": 251,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "وضع المشواك الحديدي وسط الطريق دون أي إشارة مضيئة سابقة",
        "EstCorrecte": false
      },
      {
        "OptionId": 252,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تثبيت التشوير الطرقي العاكس التدريجي والأضواء التحذيرية على مسافة كافية لإنذار السائقين",
        "EstCorrecte": true
      },
      {
        "OptionId": 253,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إخفاء عناصر الدرك في الخنادق المجاورة دون ارتداء السترات العاكسة",
        "EstCorrecte": false
      },
      {
        "OptionId": 254,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "الطلب من السائقين التوقف في منتصف المنعرج غير المرئي",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 26,
    "Code": "Q-RT-008",
    "DomaineCode": "ROUTE",
    "DomaineIntitule": "أمن الطرق وسلامة السير والمطاردة",
    "Enonce": "ما هو السلوك الواجب اتباعه من طرف الدركي المرافق أثناء ملاحقة سيارة فارّة؟",
    "ContexteSituationnel": "مطاردة لسيارة نقل سري مهربة للممنوعات على طريق جهوي.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-ROUTE"
    ],
    "CompetencesAssociees": [
      "التنسيق اللاسلكي",
      "المطاردة الأمنية"
    ],
    "Explication": "تولي الاتصال اللاسلكي مع مركز العمليات وتحديد الموقع والمحاور المحتملة للهروب وتأمين المسار.",
    "Options": [
      {
        "OptionId": 261,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "إمساك المقود مع السائق لمساعدته في المنعرجات الحادة",
        "EstCorrecte": false
      },
      {
        "OptionId": 262,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تولي الاتصال اللاسلكي مع مركز العمليات وتحديد الموقع والمحاور المحتملة للهروب وتأمين المسار",
        "EstCorrecte": true
      },
      {
        "OptionId": 263,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إطفاء جهاز اللاسلكي لعدم التشويش على أصوات المحرك",
        "EstCorrecte": false
      },
      {
        "OptionId": 264,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "الخروج بنصف جسده من النافذة للتصوير بهاتفه الشخصي",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 27,
    "Code": "Q-RT-009",
    "DomaineCode": "ROUTE",
    "DomaineIntitule": "أمن الطرق وسلامة السير والمطاردة",
    "Enonce": "في حادثة سير جسمانية خطيرة على طريق سيار، ما هو الترتيب الإجرائي الفوري للتدخل وفق بروتوكول PAS؟",
    "ContexteSituationnel": "اصطدام متعدد بين 3 سيارات وشاحنة مع وجود مصابين.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-ROUTE"
    ],
    "CompetencesAssociees": [
      "بروتوكول PAS",
      "إدارة حوادث السير"
    ],
    "Explication": "الحماية وتأمين مسرح الحادث أولاً لمنع اصطدامات جديدة، ثم الإشعار وطلب الدعم، ثم الإسعاف والإنقاذ.",
    "Options": [
      {
        "OptionId": 271,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "البدء بتحديد المذنب وتغريمه قبل إسعاف الجرحى",
        "EstCorrecte": false
      },
      {
        "OptionId": 272,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "الحماية وتأمين مسرح الحادث أولاً لمنع اصطدامات جديدة، ثم الإشعار وطلب الدعم، ثم الإسعاف والإنقاذ",
        "EstCorrecte": true
      },
      {
        "OptionId": 273,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "سحب السيارات فوراً بالرافعات وفتح الطريق دون إجراء أي معاينة أو إسعاف",
        "EstCorrecte": false
      },
      {
        "OptionId": 274,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "مغادرة الموقع إذا لم تكن هناك مركبة عسكرية متورطة بالحادث",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 28,
    "Code": "Q-RT-010",
    "DomaineCode": "ROUTE",
    "DomaineIntitule": "أمن الطرق وسلامة السير والمطاردة",
    "Enonce": "ما هي العقوبة الإدارية الفورية المقررة لسائق ضبط يقود تحت تأثير مواد مخدرة أو مؤثرات عقلية وفق مدونة السير؟",
    "ContexteSituationnel": "إيجابية الكاشف اللعابي للمخدرات لدى سائق حافلة لنقل المسافرين.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-ROUTE"
    ],
    "CompetencesAssociees": [
      "سحب رخصة السياقة",
      "مخالفات السير"
    ],
    "Explication": "سحب رخصة السياقة فوراً، حجز المركبة قانونياً، وإحالة السائق في حالة حراسة نظرية بعد إشعار النيابة العامة.",
    "Options": [
      {
        "OptionId": 281,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "منحه تنبيهاً شفوياً والسماح له بمواصلة الرحلة مع الركاب",
        "EstCorrecte": false
      },
      {
        "OptionId": 282,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "سحب رخصة السياقة فوراً، حجز المركبة قانونياً، وإحالة السائق في حالة حراسة نظرية بعد إشعار النيابة العامة",
        "EstCorrecte": true
      },
      {
        "OptionId": 283,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "تخفيض السرعة المسموح بها في رخصته إلى 40 كم/س فقط",
        "EstCorrecte": false
      },
      {
        "OptionId": 284,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "تغريمه مبلغاً رمزياً نقداً دون تسجيل المحضر بالحاسوب",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 29,
    "Code": "Q-RT-011",
    "DomaineCode": "ROUTE",
    "DomaineIntitule": "أمن الطرق وسلامة السير والمطاردة",
    "Enonce": "كيف تؤثر الحمولة الزائدة لشاحنة نقل البضائع على المنظومة الميكانيكية للفرامل وسلوك المركبة؟",
    "ContexteSituationnel": "مراقبة الوزن الإجمالي لشاحنة نقل الحصى بميزان متحرك للدرك.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 80,
    "SpecialitesAssociees": [
      "SPEC-ROUTE",
      "SPEC-TECH"
    ],
    "CompetencesAssociees": [
      "فحص الشاحنات",
      "الحمولة القانونية"
    ],
    "Explication": "تؤدي إلى تلاشي فاعلية الفرامل (Fading) بسبب الحرارة المفرطة وزيادة هائلة في مسافة التوقف.",
    "Options": [
      {
        "OptionId": 291,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "تساعد الشاحنة على التوقف في مسافة أقصر بفضل التصاق الإطارات بالأرض",
        "EstCorrecte": false
      },
      {
        "OptionId": 292,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تؤدي إلى تلاشي فاعلية الفرامل (Fading) بسبب الحرارة المفرطة وزيادة هائلة في مسافة التوقف",
        "EstCorrecte": true
      },
      {
        "OptionId": 293,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "لا تحدث أي تأثير ميكانيكي إذا كانت الشاحنة من نوع حديث",
        "EstCorrecte": false
      },
      {
        "OptionId": 294,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "تخفض استهلاك الوقود وتزيد من عمر الإطارات المطاطية",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 30,
    "Code": "Q-RT-012",
    "DomaineCode": "ROUTE",
    "DomaineIntitule": "أمن الطرق وسلامة السير والمطاردة",
    "Enonce": "عند ملاحقة دراجة نارية بدون لوحات ترقيم، ما هو التقييم العملياتي لاستخدام المشواك الحارق للإطارات؟",
    "ContexteSituationnel": "هروب دراجة نارية مشبوهة بسرعة من سد أمني.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-ROUTE",
      "SPEC-MOTARD"
    ],
    "CompetencesAssociees": [
      "الاستخدام المتناسب للوسائل",
      "قواعد الاشتباك الطرقي"
    ],
    "Explication": "يحظر استخدام الحواجز الشوكية ضد الدراجات النارية ذات العجلتين لخطورتها المميتة المحققة.",
    "Options": [
      {
        "OptionId": 301,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "يجب رمي المشواك فوراً تحت العجلة الأمامية للدراجة لإسقاطها",
        "EstCorrecte": false
      },
      {
        "OptionId": 302,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "يحظر استخدام الحواجز الشوكية ضد الدراجات النارية ذات العجلتين لخطورتها المميتة المحققة",
        "EstCorrecte": true
      },
      {
        "OptionId": 303,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "استخدامها مسموح فقط إذا كان السائق قاصراً",
        "EstCorrecte": false
      },
      {
        "OptionId": 304,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "يتم رمي العصي الحديدية بين أسلاك العجلات أثناء السير",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 31,
    "Code": "Q-RT-013",
    "DomaineCode": "ROUTE",
    "DomaineIntitule": "أمن الطرق وسلامة السير والمطاردة",
    "Enonce": "ما هو المبدأ الأساسي المعتمد في السير ضمن تشكيلة الدراجات النارية في الموكب الرسمي؟",
    "ContexteSituationnel": "تأمين موكب شخصية سامية بمسار بروتوكولي عبر العاصمة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-MOTARD",
      "SPEC-GEH"
    ],
    "CompetencesAssociees": [
      "تقنيات المواكبة",
      "تشكيلات الدراجات"
    ],
    "Explication": "السير في تشكيلة متدرجة متبادلة (Quinconce) لتأمين مسافة كبح آمنة ومجال رؤية ومسرب هروب.",
    "Options": [
      {
        "OptionId": 311,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "السير في خط مستقيم واحد خلف العجلة الخلفية للمركبة مباشرة",
        "EstCorrecte": false
      },
      {
        "OptionId": 312,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "السير في تشكيلة متدرجة متبادلة (Quinconce) لتأمين مسافة كبح آمنة ومجال رؤية ومسرب هروب",
        "EstCorrecte": true
      },
      {
        "OptionId": 313,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "تسابق الدراجين لتجاوز سيارة الشخصية السامية",
        "EstCorrecte": false
      },
      {
        "OptionId": 314,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "إلغاء الإشارات الضوئية وتشغيل الأبواق الموسيقية باستمرار",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 32,
    "Code": "Q-RT-014",
    "DomaineCode": "ROUTE",
    "DomaineIntitule": "أمن الطرق وسلامة السير والمطاردة",
    "Enonce": "ما هي الوسيلة الفنية المعتمدة لإثبات سرعة مركبة متجاوزة للسرعة القانونية أثناء تحرير المحضر الإلكتروني؟",
    "ContexteSituationnel": "رصد رادار لسيارة تسير بسرعة 165 كم/س في طريق محدد بـ 100 كم/س.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "FACILE",
    "Points": 1,
    "TempsLimiteSecondes": 65,
    "SpecialitesAssociees": [
      "SPEC-ROUTE"
    ],
    "CompetencesAssociees": [
      "الرادار الآلي",
      "إثبات المخالفات"
    ],
    "Explication": "البيانات الفنية الرقمية وصورة الرادار المعاير المتضمنة للوحة الترقيم والتاريخ والسرعة المرصودة.",
    "Options": [
      {
        "OptionId": 321,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "تقدير عيني بالعين المجردة من طرف الدركي فقط دون أي جهاز",
        "EstCorrecte": false
      },
      {
        "OptionId": 322,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "البيانات الفنية الرقمية وصورة الرادار المعاير المتضمنة للوحة الترقيم والتاريخ والسرعة المرصودة",
        "EstCorrecte": true
      },
      {
        "OptionId": 323,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "شهادة السائق نفسه واعترافه بأنه كان يشعر بالسرعة",
        "EstCorrecte": false
      },
      {
        "OptionId": 324,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "الاعتماد على ساعة يد قديمة لحساب الثواني بين شجرتين",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 33,
    "Code": "Q-RT-015",
    "DomaineCode": "ROUTE",
    "DomaineIntitule": "أمن الطرق وسلامة السير والمطاردة",
    "Enonce": "أثناء الضباب الكثيف وانعدام الرؤية على طريق سريع، ما هو الإجراء الميداني الفوري لسرية درك الطرق؟",
    "ContexteSituationnel": "انخفاض الرؤية إلى أقل من 20 متراً بسبب موجة ضباب كثيفة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-ROUTE"
    ],
    "CompetencesAssociees": [
      "تسيير الأزمات الطرقية",
      "الوقاية من الحوادث"
    ],
    "Explication": "تنفيذ عملية تأطير السير (قوافل مرافقة) بمركبات الدورية لتخفيض السرعة الجماعية وتفادي الاصطدام المتسلسل.",
    "Options": [
      {
        "OptionId": 331,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الوقوف في المحطة وعدم الخروج لحين شروق الشمس وتبدد الضباب",
        "EstCorrecte": false
      },
      {
        "OptionId": 332,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تنفيذ عملية تأطير السير (قوافل مرافقة) بمركبات الدورية لتخفيض السرعة الجماعية وتفادي الاصطدام المتسلسل",
        "EstCorrecte": true
      },
      {
        "OptionId": 333,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "السماح للسيارات بزيادة سرعتها لعبور منطقة الضباب بسرعة أكبر",
        "EstCorrecte": false
      },
      {
        "OptionId": 334,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "إلزام جميع المركبات بالتوقف في المسار الأيسر السريع",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 34,
    "Code": "Q-RT-016",
    "DomaineCode": "ROUTE",
    "DomaineIntitule": "أمن الطرق وسلامة السير والمطاردة",
    "Enonce": "ما هو الخطر الرئيسي لظاهرة الانزلاق المائي على الإطارات وكيف يتفاداه سائق الدورية؟",
    "ContexteSituationnel": "أمطار طوفانية وتجمع برك مائية عميقة على مسار الطريق السيار.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 80,
    "SpecialitesAssociees": [
      "SPEC-ROUTE",
      "SPEC-MOTARD"
    ],
    "CompetencesAssociees": [
      "القيادة في الطقس السيئ",
      "ديناميكية الإطارات"
    ],
    "Explication": "رفع القدم عن دواسة الوقود تدريجياً، الحفاظ على استقامة المقود دون فرملة عنيفة حتى استعادة التماسك.",
    "Options": [
      {
        "OptionId": 341,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الضغط الفجائي على دواسة الفرامل بأقصى قوة وتدوير المقود بشدة",
        "EstCorrecte": false
      },
      {
        "OptionId": 342,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "رفع القدم عن دواسة الوقود تدريجياً، الحفاظ على استقامة المقود دون فرملة عنيفة حتى استعادة التماسك",
        "EstCorrecte": true
      },
      {
        "OptionId": 343,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "سحب فرامل اليد لتثبيت العجلات الخلفية في الماء",
        "EstCorrecte": false
      },
      {
        "OptionId": 344,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "زيادة السرعة إلى أقصى حد لتجاوز البركة المائية كالزورق",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 35,
    "Code": "Q-RT-017",
    "DomaineCode": "ROUTE",
    "DomaineIntitule": "أمن الطرق وسلامة السير والمطاردة",
    "Enonce": "ما هو الإجراء القانوني الملزم اتخاذه ضد مركبة تنقل مواد خطرة لا تحمل لوحات برتقالية مطابقة لقواعد السلامة؟",
    "ContexteSituationnel": "شاحنة صهريج محملة بمادة سريعة الاشتعال دون لافتات تحذيرية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-ROUTE",
      "SPEC-TECH"
    ],
    "CompetencesAssociees": [
      "نقل المواد الخطرة",
      "السلامة البيئية"
    ],
    "Explication": "شل حركة المركبة فوراً، عزلها في منطقة آمنة، استدعاء خبراء الوقاية المدنية وإنجاز مسطرة قضائية لخرق تدابير النقل الخطير.",
    "Options": [
      {
        "OptionId": 351,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "السماح لها بإفراغ حمولتها في وادي قريب لتسهيل السير",
        "EstCorrecte": false
      },
      {
        "OptionId": 352,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "شل حركة المركبة فوراً، عزلها في منطقة آمنة، استدعاء خبراء الوقاية المدنية وإنجاز مسطرة قضائية لخرق تدابير النقل الخطير",
        "EstCorrecte": true
      },
      {
        "OptionId": 353,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "رسم اللوحة البرتقالية بقلم جاف على الباب والسماح لها بالانصراف",
        "EstCorrecte": false
      },
      {
        "OptionId": 354,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "مرافقتها بسرعة 140 كم/س للتخلص منها خارج نفوذ السرية",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 36,
    "Code": "Q-RT-018",
    "DomaineCode": "ROUTE",
    "DomaineIntitule": "أمن الطرق وسلامة السير والمطاردة",
    "Enonce": "في عملية فحص روتينية، اكتشفت الدورية أن الرقم التسلسلي للإطار الحديدي (VIN) للسيارة مشوه وغير متطابق مع البطاقة الرمادية، ما هو التكييف الأمني؟",
    "ContexteSituationnel": "سيارة رباعية الدفع فاخرة قادمة من مدينة حدودية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-ROUTE",
      "SPEC-PJ"
    ],
    "CompetencesAssociees": [
      "مكافحة سرقة السيارات",
      "التزوير في وثائق المركبات"
    ],
    "Explication": "حجز المركبة فوراً، توقيف الحائز عليها، وإحالة الملف لفرقة الأبحاث القضائية للتحقيق في تزوير الهيكل وشبهة السرقة الدولية.",
    "Options": [
      {
        "OptionId": 361,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "تعديل الرقم بمفك براغي ليصبح مطابقاً للبطاقة الرمادية",
        "EstCorrecte": false
      },
      {
        "OptionId": 362,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "حجز المركبة فوراً، توقيف الحائز عليها، وإحالة الملف لفرقة الأبحاث القضائية للتحقيق في تزوير الهيكل وشبهة السرقة الدولية",
        "EstCorrecte": true
      },
      {
        "OptionId": 363,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "افتراض أنه خطأ بسيط في مصنع السيارات والسماح له بالسير",
        "EstCorrecte": false
      },
      {
        "OptionId": 364,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "نصح السائق بصبغ الإطار بلون داكن لإخفاء الرقم",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 37,
    "Code": "Q-INT-001",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "التدخل السريع والاقتحام التكتيكي",
    "Enonce": "عند التقدم الثنائي في ممر ضيق أثناء مداهمة مبنى محصن، ما هو التشكيل التكتيكي الأنسب لضمان التغطية المتبادلة؟",
    "ContexteSituationnel": "اقتحام منزل يأوي عصابة مسلحة تحت جنح الظلام.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-PSIG",
      "SPEC-GSI"
    ],
    "CompetencesAssociees": [
      "الرماية القتالية",
      "المسح التكتيكي للأماكن المغلقة"
    ],
    "Explication": "تشكيل التقدم المتلاصق والتغطية المتبادلة المتقاطعة وتأمين الزوايا الميتة والفتحات الجانبية خطوة بخطوة.",
    "Options": [
      {
        "OptionId": 371,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الركض المتتالي في خط مستقيم واحد دون فحص الأبواب الجانبية",
        "EstCorrecte": false
      },
      {
        "OptionId": 372,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "التقدم بالتغطية المتبادلة المتقاطعة وتأمين الزوايا الميتة والفتحات الجانبية خطوة بخطوة",
        "EstCorrecte": true
      },
      {
        "OptionId": 373,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "تشغيل أضواء الهواتف النقالة والصراخ طلباً للاستسلام",
        "EstCorrecte": false
      },
      {
        "OptionId": 374,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "دخول الدركي الأول بمفرده وانتظار الثاني خارج البناية",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 38,
    "Code": "Q-INT-002",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "التدخل السريع والاقتحام التكتيكي",
    "Enonce": "ما هو المبدأ الأساسي عند التعامل مع شخص يحمل سلاحاً أبيض ويتقدم مهدداً حياة الدركي من مسافة تقل عن 6 أمتار وفق قاعدة تويلر؟",
    "ContexteSituationnel": "مواجهة مع شخص في حالة هياج شديد يحمل سيفاً داخل فناء مغلق.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "EXPERT",
    "Points": 2,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-PSIG",
      "SPEC-GSI"
    ],
    "CompetencesAssociees": [
      "الدفاع الشرعي",
      "إدارة المسافة الأمنية"
    ],
    "Explication": "التراجع فوراً لخلق مسافة أمان، اتخاذ وضعية دفاعية جاهزة واستعمال الوسائل المتدرجة المشروعة لتحييد الخطر.",
    "Options": [
      {
        "OptionId": 381,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الاقتراب منه ومحاولة انتزاع السلاح الأبيض باليدين العاريتين",
        "EstCorrecte": false
      },
      {
        "OptionId": 382,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "التراجع فوراً لخلق مسافة أمان، اتخاذ وضعية دفاعية جاهزة واستعمال الوسائل المتدرجة المشروعة لتحييد الخطر",
        "EstCorrecte": true
      },
      {
        "OptionId": 383,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إلقاء السلاح أرضاً ومحاورته بودية مفرطة",
        "EstCorrecte": false
      },
      {
        "OptionId": 384,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "إغماض العينين والنداء على الجيران",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 39,
    "Code": "Q-INT-003",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "التدخل السريع والاقتحام التكتيكي",
    "Enonce": "في عملية احتجاز رهائن داخل وكالة بنكية، ما هي الأولوية القصوى لقائد فرقة التدخل الأولى في مسرح العمليات؟",
    "ContexteSituationnel": "مسلحان يحتجزان موظفين وعملاء تحت تهديد السلاح الناري.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-PSIG",
      "SPEC-GSI"
    ],
    "CompetencesAssociees": [
      "إدارة أزمات الرهائن",
      "تطويق الموقع"
    ],
    "Explication": "تثبيت وتجميد الموقف، فرض طوق أمني محكم، عزل الموقع وجمع المعلومات تمهيداً للتفاوض أو التدخل المتخصص.",
    "Options": [
      {
        "OptionId": 391,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "اقتحام الوكالة الفوري عبر الأبواب الزجاجية بإطلاق نار عشوائي",
        "EstCorrecte": false
      },
      {
        "OptionId": 392,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تثبيت وتجميد الموقف، فرض طوق أمني محكم، عزل الموقع وجمع المعلومات تمهيداً للتفاوض أو التدخل المتخصص",
        "EstCorrecte": true
      },
      {
        "OptionId": 393,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "الاستجابة لجميع مطالب الخاطفين بما فيها تسليم أسلحة الدرك",
        "EstCorrecte": false
      },
      {
        "OptionId": 394,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "دعوة وسائل الإعلام للبث المباشر من داخل البنك",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 40,
    "Code": "Q-INT-004",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "التدخل السريع والاقتحام التكتيكي",
    "Enonce": "ما هي الشروط القانونية الصارمة لتحقق حالة الدفاع الشرعي عند استخدام السلاح الوظيفي؟",
    "ContexteSituationnel": "إطلاق نار من طرف دركي لصد هجوم وشيك يهدد حياته أو حياة غيره.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-PSIG",
      "SPEC-GSI",
      "SPEC-PJ"
    ],
    "CompetencesAssociees": [
      "قانون الدفاع الشرعي",
      "التناسب والضرورة"
    ],
    "Explication": "أن يكون الاعتداء حالاً وغير مشروع وموجهاً ضد النفس أو الغير مع لزوم وتناسب وسيلة الدفاع.",
    "Options": [
      {
        "OptionId": 401,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "استخدام السلاح للرد على إهانة لفظية سابقة حدثت قبل ساعة",
        "EstCorrecte": false
      },
      {
        "OptionId": 402,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "أن يكون الاعتداء حالاً وغير مشروع وموجهاً ضد النفس أو الغير مع لزوم وتناسب وسيلة الدفاع",
        "EstCorrecte": true
      },
      {
        "OptionId": 403,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إطلاق النار على سارق ثمار فواكه يفر هارباً في الحقل",
        "EstCorrecte": false
      },
      {
        "OptionId": 404,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "استخدام الرصاص كلما شعر الدركي بالخوف حتى دون خطر مادي ملموس",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 41,
    "Code": "Q-INT-005",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "التدخل السريع والاقتحام التكتيكي",
    "Enonce": "أثناء تطهير غرفة مشبوهة، ما هي الزاوية التي يدخل إليها عنصر الدرك الأول (Pointman)؟",
    "ContexteSituationnel": "اقتحام غرفة نوم مظلمة يعتقد وجود مسلح بداخلها.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 80,
    "SpecialitesAssociees": [
      "SPEC-PSIG",
      "SPEC-GSI"
    ],
    "CompetencesAssociees": [
      "تكتيكات القتال المتقارب CQB",
      "تطهير الغرف"
    ],
    "Explication": "التحرك السريع نحو الزاوية العميقة الأقل وضوحاً مع إخلاء فتحة الباب فوراً لزميله.",
    "Options": [
      {
        "OptionId": 411,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "التوقف تماماً في منتصف عتبة الباب (قمع الموت) وتفحص السقف",
        "EstCorrecte": false
      },
      {
        "OptionId": 412,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "التحرك السريع نحو الزاوية العميقة الأقل وضوحاً مع إخلاء فتحة الباب فوراً لزميله",
        "EstCorrecte": true
      },
      {
        "OptionId": 413,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "القفز والارتماء على السرير بأسلوب بهلواني",
        "EstCorrecte": false
      },
      {
        "OptionId": 414,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "الرجوع للخلف عند رؤية أي حركة داخل الغرفة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 42,
    "Code": "Q-INT-006",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "التدخل السريع والاقتحام التكتيكي",
    "Enonce": "ما هي الوظيفة العملياتية لقنبلة الصوت والوميض (Flashbang) أثناء الاقتحام؟",
    "ContexteSituationnel": "استخدام وسائل القوة غير المميتة لتشتيت انتباه خاطف مسلح.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-PSIG",
      "SPEC-GSI"
    ],
    "CompetencesAssociees": [
      "الأسلحة غير المميتة",
      "الإرباك الحسي"
    ],
    "Explication": "إحداث تشويش حسي مؤقت بالصوت والضوء يفقد الخصم القدرة على رد الفعل لثوانٍ معدودة.",
    "Options": [
      {
        "OptionId": 421,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "إشعال حرائق ضخمة لتدمير محتويات المنزل",
        "EstCorrecte": false
      },
      {
        "OptionId": 422,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "إحداث تشويش حسي مؤقت بالصوت والضوء يفقد الخصم القدرة على رد الفعل لثوانٍ معدودة",
        "EstCorrecte": true
      },
      {
        "OptionId": 423,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "تسميم الهواء بالغازات الخانقة الدائمة",
        "EstCorrecte": false
      },
      {
        "OptionId": 424,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "توليد دخان ملون للاحتفال بنجاح المهمة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 43,
    "Code": "Q-INT-007",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "التدخل السريع والاقتحام التكتيكي",
    "Enonce": "كيف يتم تأمين درج المبنى أثناء الصعود التكتيكي لعناصر فرقة التدخل؟",
    "ContexteSituationnel": "مبنى من 3 طوابق يتحصن في أعلاه قناص مسلح.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-PSIG",
      "SPEC-GSI"
    ],
    "CompetencesAssociees": [
      "القتال الرأسي",
      "تأمين السلالم"
    ],
    "Explication": "تأمين النقطة العلوية الرأسية وفحص المنحنيات بزاوية 360 درجة مع تغطية مستمرة للأعلى والأسفل.",
    "Options": [
      {
        "OptionId": 431,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "النظر لأسفل الأحذية فقط لتفادي التعثر",
        "EstCorrecte": false
      },
      {
        "OptionId": 432,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تأمين النقطة العلوية الرأسية وفحص المنحنيات بزاوية 360 درجة مع تغطية مستمرة للأعلى والأسفل",
        "EstCorrecte": true
      },
      {
        "OptionId": 433,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "استخدام المصعد الكهربائي للوصول سريعاً للمشتبه به",
        "EstCorrecte": false
      },
      {
        "OptionId": 434,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "صعود جميع العناصر في وقت واحد قفزاً فوق الدرابزين",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 44,
    "Code": "Q-INT-008",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "التدخل السريع والاقتحام التكتيكي",
    "Enonce": "ما هو التصرف التكتيكي عند انفجار عبوة ناسفة بدائية أو مواجهة كمين مفاجئ أثناء دورية راجلة؟",
    "ContexteSituationnel": "دورية تمشيط في منطقة جبلية وعرة تتعرض لرمايات مباغتة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "EXPERT",
    "Points": 2,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-PSIG",
      "SPEC-GSI"
    ],
    "CompetencesAssociees": [
      "رد الفعل في الكمائن",
      "القتال في المناطق الوعرة"
    ],
    "Explication": "مغادرة منطقة القتل فوراً، الاحتماء بساتر صلب، الرد بالنيران لقمع مصدر الرماية وتنسيق الانسحاب التكتيكي.",
    "Options": [
      {
        "OptionId": 441,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "التجمد في مكان الانفجار وانتظار التعليمات عبر الهاتف",
        "EstCorrecte": false
      },
      {
        "OptionId": 442,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "مغادرة منطقة القتل فوراً، الاحتماء بساتر صلب، الرد بالنيران لقمع مصدر الرماية وتنسيق الانسحاب التكتيكي",
        "EstCorrecte": true
      },
      {
        "OptionId": 443,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "خلع السترات الواقية من الرصاص لزيادة خفة الوزن في الركض",
        "EstCorrecte": false
      },
      {
        "OptionId": 444,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "التجمع كل الأفراد في حفرة واحدة صغيرة مكشوفة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 45,
    "Code": "Q-INT-009",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "التدخل السريع والاقتحام التكتيكي",
    "Enonce": "ما هو دور المفاوض الأمني المعتمد في أزمات خطف واحتجاز الرهائن؟",
    "ContexteSituationnel": "شخص مضطرب نفسياً يحتجز أفراد أسرته ويهدد بتفجير قنينة غاز.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 1,
    "TempsLimiteSecondes": 80,
    "SpecialitesAssociees": [
      "SPEC-PSIG",
      "SPEC-GSI"
    ],
    "CompetencesAssociees": [
      "التفاوض الأمني",
      "علم النفس العملياتي"
    ],
    "Explication": "تهدئة الموقف، استنزاف توتر الخاطف نفسياً، ربح الوقت لجمع المعلومات والوصول لحل سلمي أو إعداد الاقتحام.",
    "Options": [
      {
        "OptionId": 451,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "استفزاز الخاطف والسخرية منه لدفعه إلى الغضب الشديد",
        "EstCorrecte": false
      },
      {
        "OptionId": 452,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تهدئة الموقف، استنزاف توتر الخاطف نفسياً، ربح الوقت لجمع المعلومات والوصول لحل سلمي أو إعداد الاقتحام",
        "EstCorrecte": true
      },
      {
        "OptionId": 453,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إعطاء وعود مالية وهمية لا يمكن للدولة الوفاء بها إطلاقاً",
        "EstCorrecte": false
      },
      {
        "OptionId": 454,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "تزويد الخاطف بأسلحة إضافية لإثبات حسن النية",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 46,
    "Code": "Q-INT-010",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "التدخل السريع والاقتحام التكتيكي",
    "Enonce": "ما هو الفرق الجوهري بين الساتر المانع للرصاص وساتر الإخفاء البصري؟",
    "ContexteSituationnel": "تبادل إطلاق نار بين دورية ومجرمين فارين في منطقة غابوية ومباني قيد الإنشاء.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-PSIG",
      "SPEC-GSI"
    ],
    "CompetencesAssociees": [
      "تكتيكات الاحتماء",
      "الوقاية البالستية"
    ],
    "Explication": "الساتر المانع يوقف المقذوفات النارية فعلياً، بينما ساتر الإخفاء يحجب الرؤية فقط ولا يمنع الرصاص.",
    "Options": [
      {
        "OptionId": 461,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "كلاهما يمنع الرصاص بنفس الدرجة ولا فرق بين حائط خرساني وستارة قماش",
        "EstCorrecte": false
      },
      {
        "OptionId": 462,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "الساتر المانع يوقف المقذوفات النارية فعلياً، بينما ساتر الإخفاء يحجب الرؤية فقط ولا يمنع الرصاص",
        "EstCorrecte": true
      },
      {
        "OptionId": 463,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "ساتر الإخفاء أغلى ثمناً من الساتر الخرساني",
        "EstCorrecte": false
      },
      {
        "OptionId": 464,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "الساتر المانع يستعمل فقط في الصباح الباكر",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 47,
    "Code": "Q-INT-011",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "التدخل السريع والاقتحام التكتيكي",
    "Enonce": "ما هي مواصفات السترة الواقية من الرصاص الصالحة للاستخدام في التدخلات عالية الخطورة (مستوى Class IV)؟",
    "ContexteSituationnel": "تجهيز أفراد فرقة التدخل لمواجهة بنادق هجومية عسكرية من عيار 7.62 مم.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-PSIG",
      "SPEC-GSI"
    ],
    "CompetencesAssociees": [
      "المعدات البالستية",
      "الحماية الفردية"
    ],
    "Explication": "صفائح مركبة صلبة من السيراميك والبوليمر المقوى قادرة على صد طلقات الأسلحة الآلية الثقيلة الخارقة.",
    "Options": [
      {
        "OptionId": 471,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "سترة صوفية عادية مدعمة بطبقة كرتون",
        "EstCorrecte": false
      },
      {
        "OptionId": 472,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "صفائح مركبة صلبة من السيراميك والبوليمر المقوى قادرة على صد طلقات الأسلحة الآلية الثقيلة الخارقة",
        "EstCorrecte": true
      },
      {
        "OptionId": 473,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "درع جلدي خفيف للوقاية من الصدمات البسيطة فقط",
        "EstCorrecte": false
      },
      {
        "OptionId": 474,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "سترة مطاطية هوائية تطفو فوق الماء",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 48,
    "Code": "Q-INT-012",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "التدخل السريع والاقتحام التكتيكي",
    "Enonce": "أثناء الاقتحام، ما هو التصرف الميداني عند مصادفة شخص مدني غير مسلح يرفع يديه ويصرخ بالداخل؟",
    "ContexteSituationnel": "دخول شقة بحثاً عن مشتبه به والعثور على أحد أفراد عائلته في الممر.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-PSIG",
      "SPEC-GSI"
    ],
    "CompetencesAssociees": [
      "السيطرة على غير المشتبه بهم",
      "الانضباط التكتيكي"
    ],
    "Explication": "السيطرة عليه بالأوامر الصوتية، تثبيته بأمان، وتكليف عنصر دعم بإجلائه واستكمال فحص بقية الشقة.",
    "Options": [
      {
        "OptionId": 481,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "إطلاق النار عليه احترازياً قبل التأكد من هويته",
        "EstCorrecte": false
      },
      {
        "OptionId": 482,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "السيطرة عليه بالأوامر الصوتية، تثبيته بأمان، وتكليف عنصر دعم بإجلائه واستكمال فحص بقية الشقة",
        "EstCorrecte": true
      },
      {
        "OptionId": 483,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "الجلوس معه وتناول الشاي لتهدئة أعصابه وتأجيل العملية",
        "EstCorrecte": false
      },
      {
        "OptionId": 484,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "تركه يتجول بحرية خلف عناصر الاقتحام",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 49,
    "Code": "Q-INT-013",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "التدخل السريع والاقتحام التكتيكي",
    "Enonce": "ما هي الطريقة الصحيحة لفتح الأبواب الموصدة تكتيكياً باستعمال الكبش الميكانيكي (Bélier tactique)؟",
    "ContexteSituationnel": "مداهمة مباغتة لشقة محكمة الإغلاق بباب خشبي صلب.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 1,
    "TempsLimiteSecondes": 80,
    "SpecialitesAssociees": [
      "SPEC-PSIG",
      "SPEC-GSI"
    ],
    "CompetencesAssociees": [
      "تقنيات الاقتحام الميكانيكي",
      "الولوج السريع"
    ],
    "Explication": "ضرب منطقة القفل أو المفصلات بدقة مع وقوف المنفذ بجانب الباب خارج محور النيران المحتملة.",
    "Options": [
      {
        "OptionId": 491,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "ضرب منتصف الباب تماماً مع الوقوف أمامه مباشرة وجهاً لوجه",
        "EstCorrecte": false
      },
      {
        "OptionId": 492,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "ضرب منطقة القفل أو المفصلات بدقة مع وقوف المنفذ بجانب الباب خارج محور النيران المحتملة",
        "EstCorrecte": true
      },
      {
        "OptionId": 493,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "طرق الباب بلطف والانتظار 10 دقائق لفتحه من الداخل",
        "EstCorrecte": false
      },
      {
        "OptionId": 494,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "إلقاء الحجارة على الزجاج الخلفي للمبنى",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 50,
    "Code": "Q-INT-014",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "التدخل السريع والاقتحام التكتيكي",
    "Enonce": "في عملية التدخل الليلي، ما هي ميزة استخدام أجهزة الرؤية الليلية والتصويب بالأشعة تحت الحمراء؟",
    "ContexteSituationnel": "عملية تمشيط غابوية سرية لتعقب مهربين مسلحين.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-PSIG",
      "SPEC-GSI"
    ],
    "CompetencesAssociees": [
      "القتال الليلي",
      "المعدات الكهروضوئية"
    ],
    "Explication": "تحقيق الرؤية والتصويب الدقيق في الظلام الدامس خلسة دون إصدار أي ضوء مرئي بالعين المجردة.",
    "Options": [
      {
        "OptionId": 501,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "إضاءة الغابة بأنوار ساطعة مرئية لجميع السكان",
        "EstCorrecte": false
      },
      {
        "OptionId": 502,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تحقيق الرؤية والتصويب الدقيق في الظلام الدامس خلسة دون إصدار أي ضوء مرئي بالعين المجردة",
        "EstCorrecte": true
      },
      {
        "OptionId": 503,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "تخفيض وزن السلاح إلى النصف وزيادة سرعة الرصاصة",
        "EstCorrecte": false
      },
      {
        "OptionId": 504,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "تسخين الجو المحيط بالدركي لتفادي البرد القارس",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 51,
    "Code": "Q-INT-015",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "التدخل السريع والاقتحام التكتيكي",
    "Enonce": "عند إصابة أحد أفراد فرقة التدخل بطلق ناري في الفخذ ونزيف شرياني حاد تحت نيران مستمرة، ما هي الإسعافات التكتيكية الفورية وفق بروتوكول TCCC؟",
    "ContexteSituationnel": "اشتباك مسلح في منطقة معزولة وسقوط عنصر دركي مصاباً.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "EXPERT",
    "Points": 2,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-PSIG",
      "SPEC-GSI"
    ],
    "CompetencesAssociees": [
      "طب الميدان التكتيكي TCCC",
      "العاصبة الشريانية"
    ],
    "Explication": "سحب المصاب إلى ساتر تحت غطاء ناري وتطبيق العاصبة التكتيكية (Tourniquet) فوراً لوقف النزيف القاتل.",
    "Options": [
      {
        "OptionId": 511,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الوقوف بجانبه والبكاء وطلب سيارة الإسعاف المدنية العادية",
        "EstCorrecte": false
      },
      {
        "OptionId": 512,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "سحب المصاب إلى ساتر تحت غطاء ناري وتطبيق العاصبة التكتيكية (Tourniquet) فوراً لوقف النزيف القاتل",
        "EstCorrecte": true
      },
      {
        "OptionId": 513,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إعطاؤه كميات كبيرة من الماء البارد وتركه في مكانه المكشوف",
        "EstCorrecte": false
      },
      {
        "OptionId": 514,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "محاولة إخراج الرصاصة باليد دون أي معدات طبية",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 52,
    "Code": "Q-INT-016",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "التدخل السريع والاقتحام التكتيكي",
    "Enonce": "ما هو الترتيب الصارم لقواعد الأمان الأربع عند حمل واستخدام السلاح الناري الفردي؟",
    "ContexteSituationnel": "تدريب يومي وتعامل مع المسدس والسلاح الرشاش داخل الثكنة وخارجها.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "FACILE",
    "Points": 1,
    "TempsLimiteSecondes": 70,
    "SpecialitesAssociees": [
      "SPEC-PSIG",
      "SPEC-GSI",
      "SPEC-INSTRUCTEUR"
    ],
    "CompetencesAssociees": [
      "قواعد الأمان البالستي",
      "الرماية العسكرية"
    ],
    "Explication": "اعتبار السلاح مذخراً دائماً، عدم توجيه الفوهة لغير الهدف، الإصبع ممدد خارج الزناد، والتحقق من الهدف وخلفيته.",
    "Options": [
      {
        "OptionId": 521,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "اللعب بالسلاح لتسلية الزملاء وتوجيهه للرؤوس للمزاح",
        "EstCorrecte": false
      },
      {
        "OptionId": 522,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "اعتبار السلاح مذخراً دائماً، عدم توجيه الفوهة لغير الهدف، الإصبع ممدد خارج الزناد، والتحقق من الهدف وخلفيته",
        "EstCorrecte": true
      },
      {
        "OptionId": 523,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "وضع الإصبع على الزناد طوال الوقت حتى أثناء النوم",
        "EstCorrecte": false
      },
      {
        "OptionId": 524,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "توجيه السلاح نحو الأرض المبلطة بالبلاط القاسي لتفادي ارتداد الطلقات",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 53,
    "Code": "Q-INT-017",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "التدخل السريع والاقتحام التكتيكي",
    "Enonce": "ما هو المفهوم التكتيكي لـ \"السيطرة المحيطية 360 درجة\" أثناء نقل وإخلاء سجين مصنف شديد الخطورة؟",
    "ContexteSituationnel": "ترحيل متهم في قضايا إرهابية من السجن إلى قصر العدالة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 1,
    "TempsLimiteSecondes": 80,
    "SpecialitesAssociees": [
      "SPEC-PSIG",
      "SPEC-GSI",
      "SPEC-GEH"
    ],
    "CompetencesAssociees": [
      "ترحيل المعتقلين الخطرين",
      "الحماية الدائرية"
    ],
    "Explication": "توزيع زوايا الرؤية والتغطية النارية بين أفراد الطاقم لحماية كافة الاتجاهات المحيطة بشكل شامل.",
    "Options": [
      {
        "OptionId": 531,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "دوران السجين حول نفسه 360 درجة أثناء المشي",
        "EstCorrecte": false
      },
      {
        "OptionId": 532,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "توزيع زوايا الرؤية والتغطية النارية بين أفراد الطاقم لحماية كافة الاتجاهات المحيطة بشكل شامل",
        "EstCorrecte": true
      },
      {
        "OptionId": 533,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "تسيير 360 سيارة مرافقة للسجين في الموكب",
        "EstCorrecte": false
      },
      {
        "OptionId": 534,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "استخدام أسلحة دائرية الفوهة فقط",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 54,
    "Code": "Q-INT-018",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "التدخل السريع والاقتحام التكتيكي",
    "Enonce": "عند دخول فرقة التدخل إلى مبنى واكتشاف أسلاك تفخيخ مشدودة عند أسفل الباب، ما هو الإجراء الفوري؟",
    "ContexteSituationnel": "مداهمة وكر عصابة لتهريب السلاح في منطقة جبلية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "EXPERT",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-PSIG",
      "SPEC-GSI"
    ],
    "CompetencesAssociees": [
      "مكافحة المتفجرات",
      "الانضباط الأمني في الفخاخ"
    ],
    "Explication": "تجميد الحركة تماماً، تحذير الفريق، التراجع بحذر واستدعاء خبراء تفكيك المتفجرات فوراً.",
    "Options": [
      {
        "OptionId": 541,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "قطع السلك بمقص عادي لاختبار ما إذا كان متفجراً حقيقياً",
        "EstCorrecte": false
      },
      {
        "OptionId": 542,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تجميد الحركة تماماً، تحذير الفريق، التراجع بحذر واستدعاء خبراء تفكيك المتفجرات فوراً",
        "EstCorrecte": true
      },
      {
        "OptionId": 543,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "القفز فوق السلك بكل قوة لدفع الباب",
        "EstCorrecte": false
      },
      {
        "OptionId": 544,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "إشعال ولاعة نار لمعاينة السلك في الظلام",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 55,
    "Code": "Q-GM-001",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حفظ النظام وفض الشغب والتأطير الأمني",
    "Enonce": "ما هو الترتيب القانوني للمنادى الرسمي والإنذارات القانونية (Sommations légales) قبل تفريق تجمهر مسلح غير مرخص؟",
    "ContexteSituationnel": "مواجهة تجمع غير قانوني يقطع حركة السير ويرشق القوات العمومية بالحجارة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-GM"
    ],
    "CompetencesAssociees": [
      "المسطرة الإدارية لفض الشغب",
      "الإنذارات القانونية"
    ],
    "Explication": "ثلاثة إنذارات واضحة بمكبر الصوت من طرف السلطة الإدارية المؤهلة تسبق استعمال القوة المشروعة وتفريق الجمع.",
    "Options": [
      {
        "OptionId": 551,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "إطلاق النار فوراً دون أي إنذار أو إشعار صوتي",
        "EstCorrecte": false
      },
      {
        "OptionId": 552,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "توجيه ثلاثة إنذارات شفوية قانونية واضحة بمكبر الصوت من طرف ممثل السلطة الإدارية مع منح مهلة للتفرق",
        "EstCorrecte": true
      },
      {
        "OptionId": 553,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "التفاوض مع قادة الشغب لتحديد موعد آخر للتجمهر",
        "EstCorrecte": false
      },
      {
        "OptionId": 554,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "توزيع الحلوى على المتجمهرين لتهدئتهم",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 56,
    "Code": "Q-GM-002",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حفظ النظام وفض الشغب والتأطير الأمني",
    "Enonce": "في تشكيلة السد بالدروع (Barrage de boucliers)، كيف يحمي عناصر الصف الأول أرجلهم وأعناقهم من المقذوفات الحارقة والصلبة؟",
    "ContexteSituationnel": "رشق مكثف بحجارة وزجاجات حارقة (مولوتوف) تجاه تشكيلة الدرك المتحرك.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 80,
    "SpecialitesAssociees": [
      "SPEC-GM"
    ],
    "CompetencesAssociees": [
      "تكتيكات الدروع",
      "حفظ النظام"
    ],
    "Explication": "تداخل حواف الدروع المتجاورة بإحكام وثني الركبتين وخفض الخوذة لتشكيل جدار متراص ومصمت أمام المقذوفات.",
    "Options": [
      {
        "OptionId": 561,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "رفع الدروع فوق الرؤوس وترك الأرجل والصدر مكشوفين",
        "EstCorrecte": false
      },
      {
        "OptionId": 562,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تداخل الدروع جنباً إلى جنب وإحكام غلق الفجوات وتثبيت القاعدة السفلية لحماية الأطراف السفلية والجذع",
        "EstCorrecte": true
      },
      {
        "OptionId": 563,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "رمي الدروع أرضاً والركض نحو المتظاهرين فرادى",
        "EstCorrecte": false
      },
      {
        "OptionId": 564,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "إمساك الدرع بيد واحدة واستخدام الهاتف باليد الأخرى",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 57,
    "Code": "Q-GM-003",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حفظ النظام وفض الشغب والتأطير الأمني",
    "Enonce": "ما هي الاستخدامات التكتيكية لخراطيم المياه (Canons à eau) المركبة على شاحنات الدرك المتحرك المصفحة؟",
    "ContexteSituationnel": "اندلاع حرائق في إطارات مطاطية وإغلاق متظاهرين لساحة عمومية كبرى.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-GM"
    ],
    "CompetencesAssociees": [
      "الشاحنات المصفحة",
      "الوسائل غير المميتة"
    ],
    "Explication": "دفع الحشود وتفريقها من مسافة آمنة دون التسبب في إصابات مميتة وإخماد الحرائق والحواجز المشتعلة.",
    "Options": [
      {
        "OptionId": 571,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "رش المتظاهرين بماء مغلي لردعهم",
        "EstCorrecte": false
      },
      {
        "OptionId": 572,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "دفع وتشتيت التجمعات العنيفة بقوة ضغط الماء المحسوبة وإخماد النيران المشتعلة في الحواجز",
        "EstCorrecte": true
      },
      {
        "OptionId": 573,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "غسل سيارات المواطنين المركونة مجاناً",
        "EstCorrecte": false
      },
      {
        "OptionId": 574,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "ملء برك السباحة العامة في الحي",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 58,
    "Code": "Q-GM-004",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حفظ النظام وفض الشغب والتأطير الأمني",
    "Enonce": "ما هي زاوية إطلاق قنابل الغاز المسيل للدموع (Grenades lacrymogènes) المصرح بها نظامياً لتفادي الإصابات المباشرة؟",
    "ContexteSituationnel": "إطلاق الغاز لتفريق حشد عنيف يتقدم باتجاه مقر حكومي حساس.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-GM",
      "SPEC-INSTRUCTEUR"
    ],
    "CompetencesAssociees": [
      "الرماية بالغاز",
      "السلامة القانونية"
    ],
    "Explication": "الرماية بزاوية منحنية عالية (Tir en cloche) تتجاوز 45 درجة لتسقط القنبلة عمودياً وتفادي الرماية المباشرة في أجساد المتظاهرين.",
    "Options": [
      {
        "OptionId": 581,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الرماية المباشرة الأفقية المستقيمة على مستوى الرأس والصدر",
        "EstCorrecte": false
      },
      {
        "OptionId": 582,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "الرماية المنحنية المظلية بزاوية تزيد عن 45 درجة لتسقط العبوة انسيابياً من الأعلى دون الاصطدام المباشر بالأشخاص",
        "EstCorrecte": true
      },
      {
        "OptionId": 583,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إطلاق القنابل نحو أرجل عناصر الدرك أنفسهم",
        "EstCorrecte": false
      },
      {
        "OptionId": 584,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "رميها باليد داخل فوهات البنادق",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 59,
    "Code": "Q-GM-005",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حفظ النظام وفض الشغب والتأطير الأمني",
    "Enonce": "ما هو المفهوم العملياتي لمناورة \"الكماشة\" (Manoeuvre en tenaille / Encerclement) في الساحات المفتوحة؟",
    "ContexteSituationnel": "محاصرة مثيري الشغب ومنعهم من تخريب المتاجر في الشارع التجاري الرئيسي.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-GM"
    ],
    "CompetencesAssociees": [
      "تكتيكات المناورة",
      "حفظ النظام"
    ],
    "Explication": "تقدم سريتين من محورين متقاربين لتطويق قادة أعمال العنف وعزلهم مع ترك منفذ إخلاء آمن لخروج غير المتورطين.",
    "Options": [
      {
        "OptionId": 591,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "إغلاق كل المنافذ 100% ومنع حتى سيارات الإسعاف من الدخول",
        "EstCorrecte": false
      },
      {
        "OptionId": 592,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تطويق المشاغبين من جناحين متزامنين لعزل العناصر المحرضة مع إبقاء ممر آمن لانسحاب الفئات الهشة",
        "EstCorrecte": true
      },
      {
        "OptionId": 593,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "استخدام كماشات حديدية لقطع أسلاك الكهرباء في الحي بالكامل",
        "EstCorrecte": false
      },
      {
        "OptionId": 594,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "جلوس عناصر الدرك في دائرة والتصفيق لتهدئة الأوضاع",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 60,
    "Code": "Q-GM-006",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حفظ النظام وفض الشغب والتأطير الأمني",
    "Enonce": "كيف يتم إخلاء عنصر مصاب بحجر في الرأس من وسط تشكيلة الدرك أثناء صد هجوم عنيف؟",
    "ContexteSituationnel": "إصابة دركي وسقوطه أرضاً خلف صف الدروع الأول.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-GM"
    ],
    "CompetencesAssociees": [
      "الإخلاء تحت الضغط",
      "التضامن القتالي"
    ],
    "Explication": "تفتح عناصر الصف الثاني ثغرة لحظية لسحب المصاب إلى الخلف وسد الثغرة فوراً وتأمينه نحو سيارة الإسعاف.",
    "Options": [
      {
        "OptionId": 601,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "تركه على الأرض ملقى ومواصلة التقدم وتركه للحشود",
        "EstCorrecte": false
      },
      {
        "OptionId": 602,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "سحب المصاب فوراً إلى قلب التشكيلة من طرف عناصر الإسناد الخلفي مع الحفاظ على تماسك جدار الدروع دون ثغرات",
        "EstCorrecte": true
      },
      {
        "OptionId": 603,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "تراجع التشكيلة بأكملها ركضاً في فوضى عارمة",
        "EstCorrecte": false
      },
      {
        "OptionId": 604,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "إطلاق النار الكثيف على السماء دون مبرر",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 61,
    "Code": "Q-GM-007",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حفظ النظام وفض الشغب والتأطير الأمني",
    "Enonce": "ما هي مسافة الأمان المقررة لنشر الشباك المانعة أو المشواك الميكانيكي لوقف تقدم حشود راجلة عدائية؟",
    "ContexteSituationnel": "حشد غاضب يركض باتجاه سد الدرك حاملاً هراوات وعصي.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 80,
    "SpecialitesAssociees": [
      "SPEC-GM"
    ],
    "CompetencesAssociees": [
      "الحواجز السلكية",
      "الردع التكتيكي"
    ],
    "Explication": "نشر الحاجز على مسافة لا تقل عن 15 إلى 20 متراً من خط الدروع لمنع الاشتباك الجسدي المباشر مع القوات.",
    "Options": [
      {
        "OptionId": 611,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "وضعها تحت أقدام عناصر الدرك مباشرة",
        "EstCorrecte": false
      },
      {
        "OptionId": 612,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "نشرها على مسافة أمان متقدمة تفصل بين خط التشكيلة وكتلة المتظاهرين لامتصاص قوة الاندفاع",
        "EstCorrecte": true
      },
      {
        "OptionId": 613,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إلقاؤها في الهواء كالشبكة لصيد الطيور",
        "EstCorrecte": false
      },
      {
        "OptionId": 614,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "إخفاؤها في حقائب الظهر وعدم إخراجها إطلاقاً",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 62,
    "Code": "Q-GM-008",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حفظ النظام وفض الشغب والتأطير الأمني",
    "Enonce": "ما هو المبدأ التكتيكي لتشكيلة السهم (Formation en flèche / Coin) في اختراق الحشود المعتصمة؟",
    "ContexteSituationnel": "ضرورة شق طريق لإنقاذ أشخاص محاصرين داخل مبنى وسط التظاهرة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-GM"
    ],
    "CompetencesAssociees": [
      "تشكيلات الاختراق",
      "تكتيكات الفض"
    ],
    "Explication": "تشكيل رأس سهم مدرع يقوده عناصر أقوياء يشق الكتلة البشرية باتجاهين جانبيين لفتح ممر إنساني أو أمني مؤمن.",
    "Options": [
      {
        "OptionId": 621,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "إطلاق سهام نارية حقيقية على المعتصمين",
        "EstCorrecte": false
      },
      {
        "OptionId": 622,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "التقدم برأس مثلث مدرع يشتت الحشد نحو الجانبين ويفتح مساراً ضيقاً مؤمناً لتدخل فرق الإنقاذ",
        "EstCorrecte": true
      },
      {
        "OptionId": 623,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "الجري في خطوط متعرجة عشوائية لإرباك المشاهدين",
        "EstCorrecte": false
      },
      {
        "OptionId": 624,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "الارتماء الجماعي على الأرض ككتلة واحدة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 63,
    "Code": "Q-GM-009",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حفظ النظام وفض الشغب والتأطير الأمني",
    "Enonce": "أثناء تأطير مباراة رياضية كبرى عالية المخاطر (Derby)، ما هو الترتيب النموذجي لمنع اصطدام جماهير الفريقين بعد الخروج؟",
    "ContexteSituationnel": "خروج 40 ألف متفرج مشحونين بالتعصب بعد انتهاء المباراة بنتيجة مثيرة للجدل.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-GM"
    ],
    "CompetencesAssociees": [
      "الأمن الرياضي",
      "إدارة الحشود"
    ],
    "Explication": "فصل مدرجات الجماهير، خروج أحد الطرفين أولاً وإبقاؤه تحت المراقبة، وتأمين محطات النقل والمسارات المنفصلة بالكامل.",
    "Options": [
      {
        "OptionId": 631,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "فتح جميع الأبواب في ثانية واحدة وترك الجماهير تختلط في بهو واحد",
        "EstCorrecte": false
      },
      {
        "OptionId": 632,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تطبيق الإخلاء التدريجي المتباعد زمنياً ومكانياً، وتأمين ممرات معزولة لكل جمهور نحو وسائل النقل الخاصة به",
        "EstCorrecte": true
      },
      {
        "OptionId": 633,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إغلاق الأبواب بالمفاتيح واحتجاز الجميع داخل الملعب حتى الصباح",
        "EstCorrecte": false
      },
      {
        "OptionId": 634,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "سحب عناصر الدرك قبل صافرة النهاية بـ 10 دقائق لتفادي الزحام",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 64,
    "Code": "Q-GM-010",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حفظ النظام وفض الشغب والتأطير الأمني",
    "Enonce": "ما هي تجهيزات الحماية الفردية الإلزامية لدركي التدخل في عمليات حفظ النظام (Maintien de l'Ordre)؟",
    "ContexteSituationnel": "الاستعداد للنزول إلى الشارع للتعامل مع أعمال شغب وتخريب للممتلكات.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "FACILE",
    "Points": 1,
    "TempsLimiteSecondes": 65,
    "SpecialitesAssociees": [
      "SPEC-GM"
    ],
    "CompetencesAssociees": [
      "المعدات الوقائية MO",
      "السلامة الجسدية"
    ],
    "Explication": "خوذة بمصبع واقٍ، واقي الرقبة والكتفين، واقيات الصدر والأطراف الصلبة (Protège-tibias et bras)، والدرع البلاستيكي المقوى.",
    "Options": [
      {
        "OptionId": 641,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "بدلة سباحة خفيفة ونظارات شمسية فقط",
        "EstCorrecte": false
      },
      {
        "OptionId": 642,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "خوذة أمنية مدرعة بواقية للوجه، سترة مضادة للصدمات والحريق، واقيات المفاصل والساقين والدرع المقاوم",
        "EstCorrecte": true
      },
      {
        "OptionId": 643,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "معطف مطري عادي وقبعة صوفية",
        "EstCorrecte": false
      },
      {
        "OptionId": 644,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "بدلة رسمية مع ربطة عنق حريرية دون دروع",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 65,
    "Code": "Q-GM-011",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حفظ النظام وفض الشغب والتأطير الأمني",
    "Enonce": "ما هي وسيلة الشل الحركي عن بعد المصرح بها ضد المحرضين شديدي العنف المسلحين بمقذوفات حارقة؟",
    "ContexteSituationnel": "شخص يهم برمي زجاجة مولوتوف مشتعلة باتجاه سيارة إسعاف.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-GM",
      "SPEC-PSIG"
    ],
    "CompetencesAssociees": [
      "وسائل القوة المتوسطة",
      "قاذف الكرات الدفاعية LBD"
    ],
    "Explication": "قاذف الكرات الدفاعية المطاطية (LBD 40) الموجه بدقة إلى المناطق العضلية الكبرى (الفخذين/الجذع) لشل حركته الفورية.",
    "Options": [
      {
        "OptionId": 651,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الرمي بالرشاش الثقيل في الصدر",
        "EstCorrecte": false
      },
      {
        "OptionId": 652,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "استخدام القاذف الدفاعي المطاطي غير المميت الموجه نحو الأطراف السفلية لشل قدرته على إلقاء الزجاجة الحارقة",
        "EstCorrecte": true
      },
      {
        "OptionId": 653,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "التصفيق له لتشجيعه على الرمي بعيداً",
        "EstCorrecte": false
      },
      {
        "OptionId": 654,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "الركض نحوه دون سلاح واحتضانه",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 66,
    "Code": "Q-GM-012",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حفظ النظام وفض الشغب والتأطير الأمني",
    "Enonce": "ما هو الدور الرئيسي لفريق التوثيق بالفيديو القضائي (Équipe vidéo judiciaire) الملحق بسرية الدرك المتحرك؟",
    "ContexteSituationnel": "تصوير مجريات أعمال الشغب وتوثيق المخالفات والجرائم المرتكبة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-GM",
      "SPEC-PJ"
    ],
    "CompetencesAssociees": [
      "التوثيق الجنائي",
      "الإثبات بالصورة"
    ],
    "Explication": "توثيق تصرفات المشاغبين بدقة لتحديد هويات المعتدين وتقديم أدلة إلكترونية دامغة للقضاء، وتوثيق احترام القوات للضوابط القانونية.",
    "Options": [
      {
        "OptionId": 661,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "نشر مقاطع كوميدية طريفة على منصات التواصل الاجتماعي",
        "EstCorrecte": false
      },
      {
        "OptionId": 662,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "توثيق الاعتداءات والتخريب بدقة متناهية لتوفير حجج قضائية دامغة لتوقيف ومحاكمة المتورطين",
        "EstCorrecte": true
      },
      {
        "OptionId": 663,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إخفاء الفيديوهات وإتلاف الذاكرة فوراً بعد انتهاء المهمة",
        "EstCorrecte": false
      },
      {
        "OptionId": 664,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "تصوير عناصر الدرك فقط لعمل ألبوم ذكريات شخصي",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 67,
    "Code": "Q-GM-013",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حفظ النظام وفض الشغب والتأطير الأمني",
    "Enonce": "ما هو المفهوم العملياتي لـ \"الردع المرئي السلبي\" (Dissuasion passive) في الانتشار الاستباقي؟",
    "ContexteSituationnel": "تموضع وحدات الدرك أمام مبنى برلماني أو سفارة أجنبية قبل بدء وقفة احتجاجية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 70,
    "SpecialitesAssociees": [
      "SPEC-GM",
      "SPEC-GARDE"
    ],
    "CompetencesAssociees": [
      "الردع الاستباقي",
      "علم نفس الحشود"
    ],
    "Explication": "الانتشار المنظم، الهندام الصارم، والانضباط العالي الذي يبعث رسالة حزم وهيبة تمنع تفكير المشاغبين في الاحتكاك دون أي عنف.",
    "Options": [
      {
        "OptionId": 671,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الاختباء في مقاهي قريبة حتى يبدأ العنف",
        "EstCorrecte": false
      },
      {
        "OptionId": 672,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "الظهور الصارم المنظم والتمركز الهادئ المهيب الذي يثبط نوايا التصعيد والعنف دون الحاجة لاستعمال القوة",
        "EstCorrecte": true
      },
      {
        "OptionId": 673,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "النوم داخل المدرعات لتفادي إزعاج المارة",
        "EstCorrecte": false
      },
      {
        "OptionId": 674,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "رفع رايات بيضاء للاستسلام المسبق",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 68,
    "Code": "Q-GM-014",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حفظ النظام وفض الشغب والتأطير الأمني",
    "Enonce": "عند إشعال متظاهرين حواجز من الإطارات في تقاطع طرق استراتيجي، كيف يتم فتح المحور بأمان؟",
    "ContexteSituationnel": "دخان أسود كثيف يغلق مدخل الميناء التجاري ومخاوف من امتداد النيران لمستودعات الوقود.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-GM"
    ],
    "CompetencesAssociees": [
      "تطهير المحاور",
      "إدارة الحواجز الملتهبة"
    ],
    "Explication": "تقدم شاحنات إزالة الحواجز المدعمة بجرافات مصفحة تحت غطاء خراطيم المياه ورجال الإطفاء لتأمين فتح المسار.",
    "Options": [
      {
        "OptionId": 681,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "القفز فوق النيران بالأقدام لإطفائها بالبدلات",
        "EstCorrecte": false
      },
      {
        "OptionId": 682,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "التنسيق بين الشاحنات المصفحة كاسحة الحواجز وفرق الإطفاء تحت تغطية أمنية متراصة لدفع العوائق وإخمادها",
        "EstCorrecte": true
      },
      {
        "OptionId": 683,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إلقاء البنزين على الإطارات لتسريع احتراقها وتلاشيها",
        "EstCorrecte": false
      },
      {
        "OptionId": 684,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "ترك الطريق مغلقاً لمدة شهر حتى تزول الإطارات وحدها",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 69,
    "Code": "Q-GM-015",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حفظ النظام وفض الشغب والتأطير الأمني",
    "Enonce": "ما هي شروط استعمال سلاح الدخان الساتر (Écran de fumée) أثناء انسحاب تكتيكي لوحدة محاصرة؟",
    "ContexteSituationnel": "تعرض فصيل درك لهجوم مباغت من أسطح المباني بزجاجات حارقة في زقاق ضيق مسدود.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "EXPERT",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-GM"
    ],
    "CompetencesAssociees": [
      "الانسحاب التكتيكي",
      "الدخان الساتر"
    ],
    "Explication": "إطلاق قنابل دخانية كثيفة غير سامة لحجب رؤية المعتدين في الأعالي وتأمين خروج الفصيل نحو مساحة واسعة دون خسائر.",
    "Options": [
      {
        "OptionId": 691,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "إطلاق النار على الجدران دون هدف محدد",
        "EstCorrecte": false
      },
      {
        "OptionId": 692,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "نشر سحابة دخانية كثيفة تحجب الرؤية البصرية للخصم في المباني وتوفر غطاءً بصرياً لانسحاب منظم وسليم",
        "EstCorrecte": true
      },
      {
        "OptionId": 693,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إلقاء القنابل الدخانية داخل سيارات الدرك نفسها",
        "EstCorrecte": false
      },
      {
        "OptionId": 694,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "الصراخ عبر اللاسلكي بعبارات يأس وهزيمة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 70,
    "Code": "Q-GM-016",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حفظ النظام وفض الشغب والتأطير الأمني",
    "Enonce": "ما هو المبدأ الأساسي في القيادة والسيطرة العملياتية أثناء أحداث الشغب الواسعة؟",
    "ContexteSituationnel": "عمليات أمنية متزامنة في 5 أحياء مختلفة من المدينة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-GM"
    ],
    "CompetencesAssociees": [
      "القيادة الميدانية",
      "وحدة القيادة"
    ],
    "Explication": "وحدة القيادة (Unité de commandement) والالتزام الصارم بتعليمات غرفة العمليات المشتركة وقائد القطاع دون مبادرات فردية طائشة.",
    "Options": [
      {
        "OptionId": 701,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "قيام كل دركي بما يراه مناسباً وفق هواه الشخصي وتفكيره المنفرد",
        "EstCorrecte": false
      },
      {
        "OptionId": 702,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "الالتزام التام بالتسلسل القيادي ووحدة الأوامر والتنسيق المشترك مع غرفة العمليات المركزية لمنع الفوضى",
        "EstCorrecte": true
      },
      {
        "OptionId": 703,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "تغيير الخطة العسكرية كل 3 دقائق دون إبلاغ القيادة",
        "EstCorrecte": false
      },
      {
        "OptionId": 704,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "إغلاق أجهزة الاتصال لتوفير طاقة البطاريات",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 71,
    "Code": "Q-GD-001",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حماية الشخصيات والمواكب وأمن المنشآت",
    "Enonce": "ما هي الدوائر الأمنية الثلاث المعتمدة في بروتوكول حماية الشخصيات السامية (VIP Protection)؟",
    "ContexteSituationnel": "تأمين زيارة رسمية لرئيس دولة أجنبية في موقع أثري مفتوح.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-GARDE",
      "SPEC-GEH"
    ],
    "CompetencesAssociees": [
      "الدوائر الأمنية",
      "حماية كبار الشخصيات"
    ],
    "Explication": "الدائرة القريبة (الحراسة الملاصقة)، الدائرة المتوسطة (عزل المحيط ونقاط التفتيش)، والدائرة البعيدة (المراقبة، القناصة والطوق الخارجي).",
    "Options": [
      {
        "OptionId": 711,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "دائرة للمصورين، ودائرة للمترجمين، ودائرة للمتفرجين",
        "EstCorrecte": false
      },
      {
        "OptionId": 712,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "الدائرة القريبة الملاصقة للشخصية، الدائرة المتوسطة للتحكم في المداخل، والدائرة البعيدة للمسح الشامل والقناصة",
        "EstCorrecte": true
      },
      {
        "OptionId": 713,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "ثلاث دوائر مرسومة بالطباشير على الأرض يقف فيها الحراس",
        "EstCorrecte": false
      },
      {
        "OptionId": 714,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "دائرة واحدة تضم الجميع بدون أي تنظيم",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 72,
    "Code": "Q-GD-002",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حماية الشخصيات والمواكب وأمن المنشآت",
    "Enonce": "عند سماع إطلاق نار مباغت باتجاه الشخصية المحمية أثناء ترجلها بين الجمهور، ما هو رد الفعل الآلي للحارس الملاصق (Bodyguard)؟",
    "ContexteSituationnel": "ظهور مسلح يرفع مسدساً على مسافة 15 متراً من الشخصية الرسمية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "EXPERT",
    "Points": 2,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-GARDE",
      "SPEC-GEH",
      "SPEC-PSIG"
    ],
    "CompetencesAssociees": [
      "الحماية اللصيقة",
      "التغطية والإخلاء"
    ],
    "Explication": "تغطية الشخصية بجسد الحارس كدرع بشري، خفض رأسها، والتدافع نحو مسار الهروب المحدد وإدخالها السيارة المصفحة فوراً.",
    "Options": [
      {
        "OptionId": 721,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الهروب والقفز خلف سياج وترك الشخصية وحيدة في الميدان",
        "EstCorrecte": false
      },
      {
        "OptionId": 722,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تغطية الشخصية المحمية بجسده، خفض قامتها، والتحرك الصاعق نحو سيارة الإخلاء المصفحة تحت غطاء باقي الطاقم",
        "EstCorrecte": true
      },
      {
        "OptionId": 723,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إخراج دفتر الملاحظات لتسجيل مواصفات المسلح بدقة قبل التحرك",
        "EstCorrecte": false
      },
      {
        "OptionId": 724,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "الصراخ في الشخصية وطلب منها الركض بمفردها",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 73,
    "Code": "Q-GD-003",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حماية الشخصيات والمواكب وأمن المنشآت",
    "Enonce": "ما هي المسافة التكتيكية بين دراجات خفر الشرف والسيارة الرئاسية في موكب رسمي فخم (Escorte d'honneur)؟",
    "ContexteSituationnel": "مرافقة موكب ملكي أو رئاسي رسمي بسرعة 40 كم/س في شارع شرفي.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 80,
    "SpecialitesAssociees": [
      "SPEC-GEH",
      "SPEC-MOTARD"
    ],
    "CompetencesAssociees": [
      "مواكب الشرف",
      "التشريفات العسكرية"
    ],
    "Explication": "تشكيل جناحي الحماية على مسافة متر إلى متر ونصف من أبواب السيارة لتشكيل قفص حماية مرئي دون ملامسة الهيكل.",
    "Options": [
      {
        "OptionId": 731,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الابتعاد 200 متر خلف الموكب لعدم حجب الرؤية",
        "EstCorrecte": false
      },
      {
        "OptionId": 732,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "التمركز المتوازي الدقيق على مسافة متر إلى متر ونصف من جانبي السيارة ليشكل الدراجون جداراً وقائياً متناسقاً",
        "EstCorrecte": true
      },
      {
        "OptionId": 733,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "لمس زجاج السيارة باليد أثناء السياقة لفتح الأبواب أثناء السير",
        "EstCorrecte": false
      },
      {
        "OptionId": 734,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "القيام بحركات استعراضية بالدراجة على عجلة واحدة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 74,
    "Code": "Q-GD-004",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حماية الشخصيات والمواكب وأمن المنشآت",
    "Enonce": "ما هو الإجراء الأمني التفتيشي الصارم المطبق في بوابات القصور والمقرات السيادية العليا؟",
    "ContexteSituationnel": "دخول شاحنة تموين للمقر الحكومي الرئيسي صباحاً.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 1,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-GARDE"
    ],
    "CompetencesAssociees": [
      "أمن القصور والمقرات",
      "المسح التفتيشي"
    ],
    "Explication": "فحص أسفل السيارة بمرآة التفتيش والمسبار الإلكتروني، تدقيق الهويات، فحص الحمولة بأجهزة الكشف عن المتفجرات والمطابقة مع التصريح المسبق.",
    "Options": [
      {
        "OptionId": 741,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "فتح البوابة فوراً بمجرد أن يبتسم السائق للحارس",
        "EstCorrecte": false
      },
      {
        "OptionId": 742,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "الفحص الدقيق لأسفل وهيكل الشاحنة، الكلاب البوليسية للكشف عن المتفجرات، وتدقيق تراخيص الدخول المسبقة المعتمدة",
        "EstCorrecte": true
      },
      {
        "OptionId": 743,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "السماح بالدخول دون فحص إذا كانت الشاحنة بيضاء ونظيفة",
        "EstCorrecte": false
      },
      {
        "OptionId": 744,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "الطلب من السائق إفراغ البنزين في الشارع أولاً",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 75,
    "Code": "Q-GD-005",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حماية الشخصيات والمواكب وأمن المنشآت",
    "Enonce": "ما هي وظيفة سيارة \"المقدمة المفتوحة\" (Voiture ouvreuse / Éclaireur) في الموكب الرسمي؟",
    "ContexteSituationnel": "موكب يتحرك بين مدينتين عبر طريق وطني ذي حركة سير كثيفة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-GEH",
      "SPEC-MOTARD"
    ],
    "CompetencesAssociees": [
      "تأمين مسار الموكب",
      "الاستطلاع المتقدم"
    ],
    "Explication": "تتقدم الموكب بمسافة كافية لفتح المحاور وتفقد النقاط الحرجة وإزاحة العوائق الطارئة وإبلاغ قائد الموكب بسلامة المسار.",
    "Options": [
      {
        "OptionId": 751,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "نقل حقائب السفر الزائدة للشخصية الرسمية",
        "EstCorrecte": false
      },
      {
        "OptionId": 752,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "استطلاع المسار مسبقاً، فتح التقاطعات، رصد أي تهديد مبكر وإعطاء التقييم اللحظي لسيارة الشخصية السامية",
        "EstCorrecte": true
      },
      {
        "OptionId": 753,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "شراء وجبات الإفطار لأفراد الحراسة على الطريق",
        "EstCorrecte": false
      },
      {
        "OptionId": 754,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "إجراء سباقات سرعة مع السيارات المدنية",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 76,
    "Code": "Q-GD-006",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حماية الشخصيات والمواكب وأمن المنشآت",
    "Enonce": "في حالة تعرض الموكب لانسداد مفاجئ أو شاحنة تعترض المسار الرئيسي (Point d'étranglement)، ما هو القرار التكتيكي الفوري؟",
    "ContexteSituationnel": "توقف مفاجئ في نفق بسبب شاحنة محترقة تسد المخرج.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-GEH",
      "SPEC-GARDE"
    ],
    "CompetencesAssociees": [
      "مسارات الطوارئ البديلة",
      "الرد التكتيكي للمواكب"
    ],
    "Explication": "الالتفاف العاجل وتنفيذ مناورة الهروب (Manœuvre en J) وسلوك المسار البديل (Itinéraire de délestage) المعد مسبقاً دون توقف.",
    "Options": [
      {
        "OptionId": 761,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "النزول من السيارات وانتظار وصول شرطة المرور العادية",
        "EstCorrecte": false
      },
      {
        "OptionId": 762,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تنفيذ مناورة العودة الفورية وسلوك المسار البديل الآمن المبرمج مسبقاً تحت حراسة مشددة دون أي توقف للموكب",
        "EstCorrecte": true
      },
      {
        "OptionId": 763,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "الاصطدام المباشر بالشاحنة المشتعلة بأقصى سرعة",
        "EstCorrecte": false
      },
      {
        "OptionId": 764,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "ترك الشخصية المحمية في الشارع تمشي على الأقدام",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 77,
    "Code": "Q-GD-007",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حماية الشخصيات والمواكب وأمن المنشآت",
    "Enonce": "ما هي مواصفات حقيبة الحماية البالستية (Mallette blindée dépliable) التي يحملها حراس الشخصيات؟",
    "ContexteSituationnel": "حارس يرافق شخصية سياسية رفيعة في لقاء جماهيري مفتوح.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-GARDE"
    ],
    "CompetencesAssociees": [
      "تجهيزات الحماية VIP",
      "الدروع الخفية"
    ],
    "Explication": "حقيبة تبدو عادية لكنها تنفتح بضغطة زر لتتحول إلى درع بالستي متعدد الطبقات يغطي الجسد بالكامل من الرصاص والشظايا.",
    "Options": [
      {
        "OptionId": 771,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "حقيبة جلدية تحتوي على كتب قانونية ومجلات تسلية",
        "EstCorrecte": false
      },
      {
        "OptionId": 772,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "درع بالستي قابل للانبساط الفوري يوفر حاجز حماية متنقل ضد المقذوفات النارية والشظايا لحماية الشخصية",
        "EstCorrecte": true
      },
      {
        "OptionId": 773,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "حقيبة إسعاف تحتوي ضمادات فقط دون أي حماية من الرصاص",
        "EstCorrecte": false
      },
      {
        "OptionId": 774,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "مظلة واقية من قطرات المطر فقط",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 78,
    "Code": "Q-GD-008",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حماية الشخصيات والمواكب وأمن المنشآت",
    "Enonce": "أثناء الوقوف في وضعية خفر الشرف بالسلاح الأبيض (Sabre au clair)، ما هو المبدأ الصارم للانضباط العسكري؟",
    "ContexteSituationnel": "استعراض رسمي واستقبال رؤساء دول في القصر الملكي.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "FACILE",
    "Points": 1,
    "TempsLimiteSecondes": 65,
    "SpecialitesAssociees": [
      "SPEC-GARDE",
      "SPEC-GEH"
    ],
    "CompetencesAssociees": [
      "الانضباط العسكري",
      "التشريفات الرسمية"
    ],
    "Explication": "الثبات التام، الاتزان، السيطرة على حركات الجسد، نظرة مستقيمة، وعدم الالتفات أو التحرك حتى صدور الأمر العسكري.",
    "Options": [
      {
        "OptionId": 781,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الحديث والدردشة مع الحراس المجاورين بصوت منخفض",
        "EstCorrecte": false
      },
      {
        "OptionId": 782,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "الثبات الصارم المطلق، الانضباط النموذجي، والدقة المتناهية في أداء الحركات والتحايا العسكرية النظامية",
        "EstCorrecte": true
      },
      {
        "OptionId": 783,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "التقاط صور سيلفي مع الشخصيات الأجنبية أثناء العرض",
        "EstCorrecte": false
      },
      {
        "OptionId": 784,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "وضع السيف في الجيب الخلفي للراحة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 79,
    "Code": "Q-GD-009",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حماية الشخصيات والمواكب وأمن المنشآت",
    "Enonce": "ما هي آلية التفتيش الإلكتروني للأشخاص المعتمدة عند مدخل إقامة الشخصية السامية؟",
    "ContexteSituationnel": "توافد وفد دبلوماسي رفيع على قاعة الاجتماعات الرسمية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-GARDE"
    ],
    "CompetencesAssociees": [
      "بوابات التفتيش الكهرومغناطيسية",
      "التدقيق الأمني"
    ],
    "Explication": "المرور عبر البوابة الكهرومغناطيسية، فحص الحقائب بأشعة X-Ray، والمسح الإضافي بالكاشف اليدوي عند صدور أي تنبيه صوتي.",
    "Options": [
      {
        "OptionId": 791,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "سؤال الزائر شفوياً إن كان يحمل سلاحاً دون أي كشف إلكتروني",
        "EstCorrecte": false
      },
      {
        "OptionId": 792,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "المرور الإلزامي عبر البوابة المغناطيسية، كشف الأمتعة بأشعة إكس، والتفتيش اليدوي الدقيق عند الحاجة بلباقة واحترافية",
        "EstCorrecte": true
      },
      {
        "OptionId": 793,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "مصادرة جميع الهواتف المحمولة وتكسيرها أمام الضيوف",
        "EstCorrecte": false
      },
      {
        "OptionId": 794,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "إلغاء التفتيش للضيوف الذين يرتدون بدلات فاخرة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 80,
    "Code": "Q-GD-010",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حماية الشخصيات والمواكب وأمن المنشآت",
    "Enonce": "في حالة هجوم طائرة مسيرة صغيرة (Drone) مجهولة تحلق فوق المنصة الشرفية الرسمية، ما هو الإجراء المضاد الفوري؟",
    "ContexteSituationnel": "رصد درون يقترب بسرعة نحو تجمع الشخصيات في باحة مفتوحة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-GARDE",
      "SPEC-PSIG"
    ],
    "CompetencesAssociees": [
      "مكافحة المسيرات C-UAS",
      "الأمن السيادي"
    ],
    "Explication": "تفعيل بنادق التشويش الإلكتروني (Brouilleur anti-drone)، إخلاء الشخصية المحمية إلى مكان مسقوف ومصفح فوراً.",
    "Options": [
      {
        "OptionId": 801,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "النظر إلى الطائرة والتصفيق لجمال طيرانها",
        "EstCorrecte": false
      },
      {
        "OptionId": 802,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "التشويش الكهرومغناطيسي لقطع التحكم في الطائرة، وتغطية الشخصية وإدخالها فوراً إلى قاعة آمنة مسقوفة",
        "EstCorrecte": true
      },
      {
        "OptionId": 803,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "رمي الحجارة والعصي نحو السماء لإسقاطها",
        "EstCorrecte": false
      },
      {
        "OptionId": 804,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "الانتظار حتى تسقط الطائرة بمفردها بعد نفاد شحنها",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 81,
    "Code": "Q-GD-011",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حماية الشخصيات والمواكب وأمن المنشآت",
    "Enonce": "ما هو الدور الأمني لفريق القناصة (Tireurs d'élite) المتمركزين فوق أسطح المباني المحيطة بالمقر السيادي؟",
    "ContexteSituationnel": "تأمين محيط مبنى المؤتمرات أثناء قمة دولية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-GARDE",
      "SPEC-GSI"
    ],
    "CompetencesAssociees": [
      "القنص والمراقبة البعيدة",
      "الاستطلاع الرأسي"
    ],
    "Explication": "المسح البصري البانورامي للأفق والأسطح والنوافذ لرصد أي مسلح عن بعد وتحييد أي تهديد قاتل قبل وصوله للهدف.",
    "Options": [
      {
        "OptionId": 811,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الاستمتاع بمشاهدة معالم المدينة الجميلة من الأعلى",
        "EstCorrecte": false
      },
      {
        "OptionId": 812,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "المراقبة والاستطلاع الاستباقي للزوايا المرتفعة والنقاط الحاكمة، وتحييد أي خطر ناري موجه نحو الموقع فوراً",
        "EstCorrecte": true
      },
      {
        "OptionId": 813,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إطلاق النار على الحمام والطيور لإبعادها عن الحفل",
        "EstCorrecte": false
      },
      {
        "OptionId": 814,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "النداء على المارة في الشارع من أعلى المبنى",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 82,
    "Code": "Q-GD-012",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حماية الشخصيات والمواكب وأمن المنشآت",
    "Enonce": "ما هو المبدأ الأساسي في تأمين الغرفة الآمنة (Safe Room / Panic Room) داخل المقر السيادي للشخصية؟",
    "ContexteSituationnel": "تجهيز مكان محصن لحماية كبار مسؤولي الدولة في الحالات القصوى.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-GARDE"
    ],
    "CompetencesAssociees": [
      "الغرف المحصنة",
      "الحماية القصوى"
    ],
    "Explication": "جدران وأبواب مصفحة ضد الرصاص والانفجارات، نظام تهوية ذاتي مستقل، خطوط اتصال سلكية ولاسلكية مشفرة ومؤن طوارئ.",
    "Options": [
      {
        "OptionId": 821,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "غرفة زجاجية شفافة تطل على الحديقة الخارجية",
        "EstCorrecte": false
      },
      {
        "OptionId": 822,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "ملاذ محصن بالكامل بالخرسانة والصلب البالستي مع هواء ذاتي واتصالات مستقلة ومؤن تكفي لأيام في الطوارئ",
        "EstCorrecte": true
      },
      {
        "OptionId": 823,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "خزانة ملابس عادية يمكن غلقها بمفتاح خشبي",
        "EstCorrecte": false
      },
      {
        "OptionId": 824,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "قبو مفتوح النوافذ تحت سقف خشبي قديم",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 83,
    "Code": "Q-GD-013",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حماية الشخصيات والمواكب وأمن المنشآت",
    "Enonce": "أثناء مصافحة الشخصية المحمية للجمهور عند سياج أمني، كيف يقف أفراد الحراسة اللصيقة؟",
    "ContexteSituationnel": "اقتراب الشخصية من الحشود لتحيتهم ومصافحتهم باليد.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 1,
    "TempsLimiteSecondes": 80,
    "SpecialitesAssociees": [
      "SPEC-GARDE"
    ],
    "CompetencesAssociees": [
      "الحراسة في الحشود",
      "تكتيكات الستار البشري"
    ],
    "Explication": "التركيز البصري 100% على أيادي الأشخاص في الصف الأول وليس على وجوههم، مع الالتصاق الوثيق بالشخصية للتدخل السريع.",
    "Options": [
      {
        "OptionId": 831,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "النظر إلى كاميرات التلفزيون والابتسام للمشاهدين",
        "EstCorrecte": false
      },
      {
        "OptionId": 832,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "مراقبة أيدي المتقاطرين بدقة شديدة لرصد أي حركة مريبة أو سلاح، والبقاء على مسافة التصاق ردعية فورية",
        "EstCorrecte": true
      },
      {
        "OptionId": 833,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "دفع الشخصية المحمية بعنف لإسقاطها أرضاً لحمايتها مسبقاً",
        "EstCorrecte": false
      },
      {
        "OptionId": 834,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "مصافحة الجمهور بدلاً من الشخصية الرسمية",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 84,
    "Code": "Q-GD-014",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "حماية الشخصيات والمواكب وأمن المنشآت",
    "Enonce": "ما هو المفهوم الأمني لـ \"التحقق المسبق من خلفيات الطواقم\" (Habilitation / Vetting) في المقرات الرسمية؟",
    "ContexteSituationnel": "توظيف طهاة، سائقين، وعمال صيانة داخل إقامة الشخصية السامية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-GARDE",
      "SPEC-PJ"
    ],
    "CompetencesAssociees": [
      "التدقيق الأمني",
      "مكافحة الاختراق"
    ],
    "Explication": "إجراء تحريات أمنية عميقة واستخباراتية للتأكد من سوابق الأشخاص وولائهم وعدم وجود أي شبهات أو ثغرات استدراج تهدد الأمن القومي.",
    "Options": [
      {
        "OptionId": 841,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "سؤالهم عن ألوانهم المفضلة في الملابس فقط",
        "EstCorrecte": false
      },
      {
        "OptionId": 842,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "التحقيق الشامل في السوابق القضائية والانتماءات والمحيط العائلي لضمان الحصانة الأمنية المطلقة ومكافحة الاختراق",
        "EstCorrecte": true
      },
      {
        "OptionId": 843,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "قبول أي شخص يقدم طلباً دون أي فحص أو تدقيق",
        "EstCorrecte": false
      },
      {
        "OptionId": 844,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "استبدال العمال كل يوم بعمال جدد من الشارع",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 85,
    "Code": "Q-INF-001",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الأمن السيبراني والتحقيق الجنائي الرقمي",
    "Enonce": "عند حجز حاسوب محمول مشتغل (Allumé) في مسرح جريمة قرصنة إلكترونية، ما هو الإجراء التقني السليم لتفادي فقدان بيانات الذاكرة الحية (RAM)؟",
    "ContexteSituationnel": "المشتبه به غادر الغرفة وترك حاسوبه مفتوحاً يعالج تحويلات بنكية مشبوهة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "EXPERT",
    "Points": 2,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-INFO"
    ],
    "CompetencesAssociees": [
      "التحقيق الرقمي Forensic",
      "الذاكرة المؤقتة RAM"
    ],
    "Explication": "أخذ نسخة مطابقة للذاكرة الحية (RAM Dump) على مفتاح USB معتمد أولاً قبل أي إيقاف تشغيل، لأن إطفاء الجهاز يمسح المفاتيح المشفرة فوراً.",
    "Options": [
      {
        "OptionId": 851,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "فصل القابس الكهربائي ونزع البطارية فوراً لتوفير الطاقة",
        "EstCorrecte": false
      },
      {
        "OptionId": 852,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "استخراج محتويات الذاكرة العشوائية الحية (RAM Dump) فوراً لحفظ البيانات المؤقتة وكلمات المرور المشفرة",
        "EstCorrecte": true
      },
      {
        "OptionId": 853,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إعادة تشغيل الجهاز عدة مرات للتأكد من سرعته",
        "EstCorrecte": false
      },
      {
        "OptionId": 854,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "تنسيق القرص الصلب (Format) لتنظيفه من الفيروسات قبل الفحص",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 86,
    "Code": "Q-INF-002",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الأمن السيبراني والتحقيق الجنائي الرقمي",
    "Enonce": "ما هي وظيفة حقيبة فاراداي (Pochette de Faraday) عند حجز هاتف ذكي لمشتبه به في قضية أمن دولة؟",
    "ContexteSituationnel": "حجز هاتف ذكي يحتوي على محادثات مشفرة لتنظيم سري.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-INFO",
      "SPEC-PJ"
    ],
    "CompetencesAssociees": [
      "عزل الإشارات الرقمية",
      "حماية الأدلة الرقمية"
    ],
    "Explication": "عزل الهاتف كهرومغناطيسياً بالكامل لمنع تلقي أي إشارات راديو، واي فاي أو 4G/5G ومنع مسح البيانات عن بعد (Remote Wipe).",
    "Options": [
      {
        "OptionId": 861,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "شحن بطارية الهاتف لاسلكياً بالطاقة الشمسية",
        "EstCorrecte": false
      },
      {
        "OptionId": 862,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "حجب كافة الإشارات الكهرومغناطيسية والشبكات اللاسلكية لمنع مسح بيانات الهاتف أو تعديلها عن بعد",
        "EstCorrecte": true
      },
      {
        "OptionId": 863,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "تغيير نغمة رنين الهاتف إلى نغمة عسكرية رسمية",
        "EstCorrecte": false
      },
      {
        "OptionId": 864,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "تبريد الهاتف لخفض حرارة المعالج المركزي",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 87,
    "Code": "Q-INF-003",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الأمن السيبراني والتحقيق الجنائي الرقمي",
    "Enonce": "ما هي القيمة الحسابية لهاش البصمة الرقمية (Hash MD5 / SHA-256) في إثبات حجية الدليل الرقمي أمام المحكمة؟",
    "ContexteSituationnel": "تقديم قرص صلب مستنسخ كدليل إثبات في قضية اختلاس أموال عامة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-INFO",
      "SPEC-PJ"
    ],
    "CompetencesAssociees": [
      "البصمة الرقمية Hash",
      "سلامة الأدلة الرقمية"
    ],
    "Explication": "إثبات سلامة وتطابق الصورة الجنائية وعدم تعديل أي بايت واحد (Bit-stream image) منذ لحظة الحجز وحتى فحصها أمام القضاء.",
    "Options": [
      {
        "OptionId": 871,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "تسريع عملية تشغيل البرامج الترفيهية على الحاسوب",
        "EstCorrecte": false
      },
      {
        "OptionId": 872,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "إثبات التطابق الرياضي المطلق وعدم تعرض الدليل الرقمي لأي تعديل أو تلاعب طوال سلسلة الحيازة",
        "EstCorrecte": true
      },
      {
        "OptionId": 873,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "تشفير اسم المحقق لإخفاء هويته عن المحكمة",
        "EstCorrecte": false
      },
      {
        "OptionId": 874,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "تقليل حجم الملفات لتوفير مساحة في القرص",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 88,
    "Code": "Q-INF-004",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الأمن السيبراني والتحقيق الجنائي الرقمي",
    "Enonce": "ما هو هجوم التصيد الاحتيالي (Phishing) وكيف يتم التصدي له داخل شبكة الدرك الداخلية المخصصة للقيادة؟",
    "ContexteSituationnel": "تلقي موظف رسالة بريد إلكتروني تنتحل صفة القيادة العليا وتطلب تحديث كلمة المرور عبر رابط خارجي.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-INFO",
      "SPEC-SEC-INFO"
    ],
    "CompetencesAssociees": [
      "الأمن السيبراني",
      "الهندسة الاجتماعية"
    ],
    "Explication": "هندسة اجتماعية لخداع المستخدم لسرقة بياناته؛ ويتصدى له بالتوعية، استخدام المصادقة الثنائية (MFA) وحجب الروابط المشبوهة بجدار حماية.",
    "Options": [
      {
        "OptionId": 881,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الضغط على الرابط فوراً وكتابة كلمة المرور السرية بسرعة لتأكيد الولاء",
        "EstCorrecte": false
      },
      {
        "OptionId": 882,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "عزل الرسالة، إبلاغ مركز الأمن السيبراني فوراً، عدم النقر على الروابط، وتطبيق المصادقة متعددة العوامل (MFA)",
        "EstCorrecte": true
      },
      {
        "OptionId": 883,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إعادة إرسال الرسالة لجميع أفراد الوحدة لمعرفة آرائهم",
        "EstCorrecte": false
      },
      {
        "OptionId": 884,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "الرد على المرسل وشتمه بعبارات قاسية",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 89,
    "Code": "Q-INF-005",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الأمن السيبراني والتحقيق الجنائي الرقمي",
    "Enonce": "ما هو الدور الأمني لبروتوكول VPN المشفر (Virtual Private Network) في اتصالات الوحدات الميدانية؟",
    "ContexteSituationnel": "إرسال تقارير أمنية حساسة من دورية في منطقة حدودية نائية عبر شبكة الإنترنت العامة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 80,
    "SpecialitesAssociees": [
      "SPEC-INFO"
    ],
    "CompetencesAssociees": [
      "الشبكات الافتراضية الخاصة",
      "التشفير العملياتي"
    ],
    "Explication": "إنشاء نفق اتصال مشفر ومعزول يحمي البيانات المتبادلة من التنصت والتجسس والاعتراض من طرف أطراف خارجية.",
    "Options": [
      {
        "OptionId": 891,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "زيادة سرعة الرياح حول الهوائي اللاسلكي",
        "EstCorrecte": false
      },
      {
        "OptionId": 892,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تأمين قناة اتصال ونفق مشفر بين الوحدة الميدانية والمركز يمنع أي اعتراض أو تنصت على البيانات الحساسة",
        "EstCorrecte": true
      },
      {
        "OptionId": 893,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "تحويل الرسائل المكتوبة إلى رسوم كاريكاتورية متحركة",
        "EstCorrecte": false
      },
      {
        "OptionId": 894,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "حذف جميع الملفات تلقائياً عند وصولها",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 90,
    "Code": "Q-INF-006",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الأمن السيبراني والتحقيق الجنائي الرقمي",
    "Enonce": "ما هي أداة \"جهاز منع الكتابة\" (Hardware Write-Blocker) المستخدمة في استنساخ الأقراص الصلبة قضائياً؟",
    "ContexteSituationnel": "تفريغ بيانات قرص صلب لمشتبه به يحتوي على أدلة جرائم مالية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-INFO"
    ],
    "CompetencesAssociees": [
      "أجهزة Forensic",
      "حماية الدليل الأصلي"
    ],
    "Explication": "جهاز وسيط يمنع نظام التشغيل من كتابة أو تعديل أي بايت على القرص الأصلي أثناء قراءة واستنساخ محتواه الجنائي.",
    "Options": [
      {
        "OptionId": 901,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "ممحاة إلكترونية لمسح محتويات الأقراص التالفة",
        "EstCorrecte": false
      },
      {
        "OptionId": 902,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "عتاد فيزيائي يمنع تماماً أي عملية كتابة أو تعديل على القرص الأصلي أثناء استخراج النسخة الجنائية المتطابقة",
        "EstCorrecte": true
      },
      {
        "OptionId": 903,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "جهاز لتسريع نسخ الأفلام السينمائية",
        "EstCorrecte": false
      },
      {
        "OptionId": 904,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "قلم إلكتروني للكتابة على شاشات اللمس",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 91,
    "Code": "Q-INF-007",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الأمن السيبراني والتحقيق الجنائي الرقمي",
    "Enonce": "ما هو برمجية الفدية الخبيثة (Ransomware) وكيف يتم حماية قواعد بيانات السجلات القضائية ضدها؟",
    "ContexteSituationnel": "محاولة إصابة سيرفرات الوحدة ببرمجية تشفر الملفات وتطلب فدية رقمية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-INFO"
    ],
    "CompetencesAssociees": [
      "مكافحة برمجيات الفدية",
      "النسخ الاحتياطي"
    ],
    "Explication": "برمجية تقوم بتشفير البيانات لمنع الوصول إليها وابتزاز الضحية؛ الوقاية الصارمة تتطلب نسخاً احتياطية دورية معزولة تماماً (Offline Backup/Air-gapped).",
    "Options": [
      {
        "OptionId": 911,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "دفع الفدية فوراً بالعملات الرقمية دون إبلاغ القيادة",
        "EstCorrecte": false
      },
      {
        "OptionId": 912,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "الاعتماد على النسخ الاحتياطية المعزولة عن الشبكة (Air-Gapped)، تحديث الأنظمة، وتقييد الصلاحيات وجدران الحماية",
        "EstCorrecte": true
      },
      {
        "OptionId": 913,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "فصل الشاشة فقط وترك الحاسوب يعمل بالخلفية",
        "EstCorrecte": false
      },
      {
        "OptionId": 914,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "تغيير لغة لوحة المفاتيح إلى لغة أخرى لإرباك الفيروس",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 92,
    "Code": "Q-INF-008",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الأمن السيبراني والتحقيق الجنائي الرقمي",
    "Enonce": "ما هو العنوان الفيزيائي MAC Address لبطاقة الشبكة وما هي فائدته في التحقيق في الاختراقات اللاسلكية؟",
    "ContexteSituationnel": "رصد جهاز مجهول متصل بشبكة الواي فاي الخاصة بالسرية الإقليمية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-INFO"
    ],
    "CompetencesAssociees": [
      "الشبكات اللاسلكية",
      "تحديد هوية الأجهزة"
    ],
    "Explication": "معرف فريد مخصص لعتاد بطاقة الشبكة في المصنع، يستخدم لتحديد الجهاز المتصل بالشبكة وتتبعه في سجلات الراوتر (Router Logs).",
    "Options": [
      {
        "OptionId": 921,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الرقم السري الشخصي لحساب البريد الإلكتروني للمدير",
        "EstCorrecte": false
      },
      {
        "OptionId": 922,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "المعرف الفريد المادي لبطاقة الشبكة المستخدم في تعقب وتحديد هوية الأجهزة المتصلة داخل السجلات الرقمية",
        "EstCorrecte": true
      },
      {
        "OptionId": 923,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "عنوان السكن الجغرافي لمهندس الاتصالات",
        "EstCorrecte": false
      },
      {
        "OptionId": 924,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "سعر بطاقة الشبكة في المتاجر الإلكترونية",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 93,
    "Code": "Q-INF-009",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الأمن السيبراني والتحقيق الجنائي الرقمي",
    "Enonce": "ما هي خطورة استخدام وسائط التخزين الخارجية (USB Flash Drives) مجهولة المصدر داخل مقرات الدرك؟",
    "ContexteSituationnel": "العثور على مفتاح USB مرمي في مرأب السيارات بالثكنة العسكرية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "FACILE",
    "Points": 1,
    "TempsLimiteSecondes": 65,
    "SpecialitesAssociees": [
      "SPEC-INFO",
      "SPEC-SEC-INFO"
    ],
    "CompetencesAssociees": [
      "أمن وسائط التخزين",
      "الهجمات الفيزيائية"
    ],
    "Explication": "قد يحتوي على برمجيات تجسس خبيثة أو هجوم BadUSB ينفذ أكواداً تخريبية بمجرد إدخاله بالحاسوب لسرقة البيانات.",
    "Options": [
      {
        "OptionId": 931,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "توصيله فوراً بالحاسوب الرئيسي للقيادة لمعرفة صاحبه والاطلاع على صوره",
        "EstCorrecte": false
      },
      {
        "OptionId": 932,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "خطر احتوائه على برمجيات تجسس خبيثة أو تلف ميكانيكي؛ يحظر توصيله ويحال لقسم الأمن السيبراني للفحص المعزول",
        "EstCorrecte": true
      },
      {
        "OptionId": 933,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "استخدامه لتخزين الأغاني والموسيقى للترفيه",
        "EstCorrecte": false
      },
      {
        "OptionId": 934,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "غسله بالماء والصابون قبل وضعه في الحاسوب",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 94,
    "Code": "Q-INF-010",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الأمن السيبراني والتحقيق الجنائي الرقمي",
    "Enonce": "ما هو مفهوم \"الويب المظلم\" (Dark Web / Tor Network) في سياق تتبع الجرائم المنظمة والمخدرات؟",
    "ContexteSituationnel": "تحقيق في شبكة دولية لبيع وثائق هوية مزورة عبر مواقع مخفية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-INFO",
      "SPEC-PJ"
    ],
    "CompetencesAssociees": [
      "الإنترنت المظلم",
      "الجريمة الإلكترونية المنظمة"
    ],
    "Explication": "شبكة مخفية تتطلب متصفحات خاصة توفر إخفاء الهوية وتشفير المسارات وتستغلها الشبكات الإجرامية؛ ويتم تعقبها بتقنيات استخبارات المصادر المفتوحة (OSINT).",
    "Options": [
      {
        "OptionId": 941,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "المواقع الإلكترونية التي تصمم بخلفيات سوداء داكنة فقط",
        "EstCorrecte": false
      },
      {
        "OptionId": 942,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "شبكات رقمية مشفرة متعددة الطبقات توفر إخفاء الهوية وتستغل في التجارة المحرمة وتتطلب أدوات رصد متخصصة",
        "EstCorrecte": true
      },
      {
        "OptionId": 943,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "انقطاع الإنترنت ليلاً في الحي",
        "EstCorrecte": false
      },
      {
        "OptionId": 944,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "موقع إلكتروني خاص بتوقعات الطقس والعواصف الرعدية",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 95,
    "Code": "Q-INF-011",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الأمن السيبراني والتحقيق الجنائي الرقمي",
    "Enonce": "ما هي تقنية التشفير المتناظر مقابل التشفير غير المتناظر (Symmetric vs Asymmetric Encryption)؟",
    "ContexteSituationnel": "إعداد منظومة تشفير للاتصالات المشتركة بين القيادة والمروحيات العسكرية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "EXPERT",
    "Points": 2,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-INFO"
    ],
    "CompetencesAssociees": [
      "علم التشفير Cryptography",
      "أمن الاتصالات"
    ],
    "Explication": "التشفير المتناظر يستخدم نفس المفتاح السري للتشفير وفك التشفير (سريع)، بينما غير المتناظر يستخدم مفتاحين (عام Public وخاص Private).",
    "Options": [
      {
        "OptionId": 951,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "التشفير المتناظر لا يستعمل أي مفاتيح والتشفير غير المتناظر يستعمل 100 مفتاح",
        "EstCorrecte": false
      },
      {
        "OptionId": 952,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "المتناظر يعتمد مفتاحاً واحداً مشتركاً للتشفير والفك، وغير المتناظر يعتمد زوج مفاتيح (مفتاح عام ومفتاح خاص)",
        "EstCorrecte": true
      },
      {
        "OptionId": 953,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "التشفير المتناظر يعمل فقط في فصل الصيف",
        "EstCorrecte": false
      },
      {
        "OptionId": 954,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "كلاهما يعني حذف الرسالة بعد قراءتها دون أي حماية",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 96,
    "Code": "Q-INF-012",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الأمن السيبراني والتحقيق الجنائي الرقمي",
    "Enonce": "ما هي قاعدة النسخ الاحتياطي 3-2-1 الموصى بها في الحفاظ على السجلات الإدارية والقضائية الرقمية؟",
    "ContexteSituationnel": "إعداد خطة استمرارية العمل (Business Continuity Plan) لقاعدة بيانات القضايا.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 1,
    "TempsLimiteSecondes": 80,
    "SpecialitesAssociees": [
      "SPEC-INFO",
      "SPEC-SEC-ADMIN"
    ],
    "CompetencesAssociees": [
      "النسخ الاحتياطي 3-2-1",
      "استمرارية العمل"
    ],
    "Explication": "الاحتفاظ بـ 3 نسخ من البيانات، على وسيطين تخزينيين مختلفين (2)، مع وجود نسخة واحدة على الأقل في موقع جغرافي خارجي معزول (1).",
    "Options": [
      {
        "OptionId": 961,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "نسخ الملفات 3 مرات في نفس المجلد بنفس القرص",
        "EstCorrecte": false
      },
      {
        "OptionId": 962,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "3 نسخ إجمالية، على وسيطين تخزينيين مختلفين، مع حفظ نسخة واحدة في موقع جغرافي خارجي آمن ومنفصل",
        "EstCorrecte": true
      },
      {
        "OptionId": 963,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "حفظ الملفات لمدة 3 ساعات ثم حذف نسختين والاحتفاظ بواحدة",
        "EstCorrecte": false
      },
      {
        "OptionId": 964,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "طباعة 3 ورقات وتوزيع نسختين وقراءة واحدة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 97,
    "Code": "Q-INF-013",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الأمن السيبراني والتحقيق الجنائي الرقمي",
    "Enonce": "ما هو مفهوم \"هجوم حجب الخدمة الموزع\" (DDoS Attack) المستهدف للبوابات الإلكترونية الحكومية؟",
    "ContexteSituationnel": "تعطل مفاجئ لبوابة التبليغ عن الجرائم بسبب ملايين الطلبات الوهمية المتزامنة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-INFO"
    ],
    "CompetencesAssociees": [
      "هجمات DDoS",
      "حماية الخوادم"
    ],
    "Explication": "إغراق الخادم بفيض هائل من الطلبات الوهمية القادمة من آلاف الأجهزة المخترقة (Botnet) لتعطيل الخدمة عن المستخدمين الشرعيين.",
    "Options": [
      {
        "OptionId": 971,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "سرقة جميع الحواسيب من مبنى الوزارة ليلاً",
        "EstCorrecte": false
      },
      {
        "OptionId": 972,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "إغراق الخوادم بطلبات اتصالات وهمية مكثفة تفوق قدرة استيعابها مما يؤدي لشل الخدمة وحجبها عن المواطنين",
        "EstCorrecte": true
      },
      {
        "OptionId": 973,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "قطع الكابل البحري الرئيسي بفأس حديدي",
        "EstCorrecte": false
      },
      {
        "OptionId": 974,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "تغيير شكل واجهة الموقع بألوان مختلفة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 98,
    "Code": "Q-INF-014",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الأمن السيبراني والتحقيق الجنائي الرقمي",
    "Enonce": "ما هي البيانات الوصفية (Metadata / EXIF) المستخرجة من الصور الرقمية في مسرح الجريمة؟",
    "ContexteSituationnel": "تحليل صورة فوتوغرافية التقطها مجرم ونشرها للتباهي بجريمته.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-INFO",
      "SPEC-PJ",
      "SPEC-SCIENTIFIQUE"
    ],
    "CompetencesAssociees": [
      "البيانات الوصفية EXIF",
      "التحليل الجنائي للصور"
    ],
    "Explication": "بيانات تقنية مضمنة داخل ملف الصورة تكشف نوع الكاميرا، تاريخ ووقت الالتقاط بالثانية، وإحداثيات الموقع الجغرافي GPS بدقة.",
    "Options": [
      {
        "OptionId": 981,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الرقم القومي لجميع الأشخاص الذين يظهرون في خلفية الصورة",
        "EstCorrecte": false
      },
      {
        "OptionId": 982,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "بيانات فنية مدمجة توضح طراز الكاميرا، زمن الالتقاط، إعدادات العدسة، وإحداثيات الموقع الجغرافي بنظام GPS",
        "EstCorrecte": true
      },
      {
        "OptionId": 983,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "مبلغ المكافأة المالية المخصصة لمن يعثر على الصورة",
        "EstCorrecte": false
      },
      {
        "OptionId": 984,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "اسم الفنان الذي رسم الإطار الخارجي للصورة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 99,
    "Code": "Q-INF-015",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الأمن السيبراني والتحقيق الجنائي الرقمي",
    "Enonce": "ما هو المبدأ الأساسي لنظام التحكم في الوصول القائم على الأدوار (RBAC) المطبق في منظومة ORIENT-GR؟",
    "ContexteSituationnel": "إدارة صلاحيات مستخدمي المنظومة (إداريون، instructeurs، طلاب درك).",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 70,
    "SpecialitesAssociees": [
      "SPEC-INFO",
      "SPEC-SEC-ADMIN"
    ],
    "CompetencesAssociees": [
      "إدارة الصلاحيات RBAC",
      "أمن التطبيقات"
    ],
    "Explication": "منح الصلاحيات للمستخدم بناءً على صفته الوظيفية ورتبته، بحيث لا يستطيع الطالب رؤية إجابات الامتحانات أو صلاحيات التعديل الخاصة بالقيادة.",
    "Options": [
      {
        "OptionId": 991,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "منح جميع المستخدمين نفس الصلاحيات المطلقة بما فيها حذف قاعدة البيانات",
        "EstCorrecte": false
      },
      {
        "OptionId": 992,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تقييد الوصول إلى البيانات والوظائف وفقاً للدور الوظيفي المحدد بدقة لكل مستخدم لمنع الوصول غير المصرح به",
        "EstCorrecte": true
      },
      {
        "OptionId": 993,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "توزيع الصلاحيات عبر القرعة العشوائية كل أسبوع",
        "EstCorrecte": false
      },
      {
        "OptionId": 994,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "السماح للطلاب بتعديل نقاط زملائهم لتعزيز روح التعاون",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 100,
    "Code": "Q-INF-016",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الأمن السيبراني والتحقيق الجنائي الرقمي",
    "Enonce": "عند العثور على قرص صلب محمي بكلمة مرور وتشفير كامل BitLocker، ما هو الإجراء التقني القضائي المتبع لفك الحظر؟",
    "ContexteSituationnel": "حاسوب متهم رئيسي في شبكة تبييض أموال مشفر بالكامل بتقنية TPM وBitLocker.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "EXPERT",
    "Points": 2,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-INFO"
    ],
    "CompetencesAssociees": [
      "التعامل مع التشفير",
      "التحقيق القضائي"
    ],
    "Explication": "البحث عن مفتاح الاسترداد (Recovery Key) في الحسابات السحابية للمتهم أو أجهزته الموثوقة أو دفعه قضائياً لتسليمه بأمر من النيابة العامة.",
    "Options": [
      {
        "OptionId": 1001,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "ضرب القرص بمطرقة فولاذية لكسر التشفير الميكانيكي",
        "EstCorrecte": false
      },
      {
        "OptionId": 1002,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "البحث المنهجي عن مفتاح الاسترداد في الأجهزة المقترنة والوسائط المصادرة أو استصدار أمر قضائي للمتهم بتسليمه",
        "EstCorrecte": true
      },
      {
        "OptionId": 1003,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "وضع القرص في الميكروويف لمدة دقيقتين",
        "EstCorrecte": false
      },
      {
        "OptionId": 1004,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "كتابة كلمة \"Admin\" مائة مرة حتى يفتح الجهاز تلقائياً",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 101,
    "Code": "Q-ADM-001",
    "DomaineCode": "COMMUNICATION",
    "DomaineIntitule": "السكرتارية الإدارية والتحرير العسكري",
    "Enonce": "ما هي الصيغة الرسمية المعتمدة في افتتاح المراسلات العسكرية الموجهة من مرؤوس إلى رئيسه التسلسلي الأعلى؟",
    "ContexteSituationnel": "تحرير تقرير إخباري موجه من قائد مركز الدرك إلى قائد السرية الإقليمية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "FACILE",
    "Points": 1,
    "TempsLimiteSecondes": 65,
    "SpecialitesAssociees": [
      "SPEC-SEC-ADMIN"
    ],
    "CompetencesAssociees": [
      "التحرير الإداري العسكري",
      "التسلسل القيادي"
    ],
    "Explication": "\"يشرفني أن أنهي إلى كريم علمكم...\" مع ذكر الرتبة والصفة العسكرية الكاملة واحترام أصول التخاطب والتهذيب العسكري.",
    "Options": [
      {
        "OptionId": 1011,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "\"مرحباً يا صديقي العزيز، أكتب إليك لأخبرك بما حدث اليوم...\"",
        "EstCorrecte": false
      },
      {
        "OptionId": 1012,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "\"يشرفني أن أنهي إلى كريم علمكم...\" مع توضيح الموضوع والمراجع العسكرية بدقة وتجرد تام",
        "EstCorrecte": true
      },
      {
        "OptionId": 1013,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "\"عليك فوراً أن تفعل ما سأطلبه منك في هذه الرسالة...\"",
        "EstCorrecte": false
      },
      {
        "OptionId": 1014,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "\"إلى من يهمه الأمر، خذ العلم بهذا الموضوع والسلام...\"",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 102,
    "Code": "Q-ADM-002",
    "DomaineCode": "COMMUNICATION",
    "DomaineIntitule": "السكرتارية الإدارية والتحرير العسكري",
    "Enonce": "ما هو الفرق الجوهري في التحرير الإداري بين \"التقرير الإخباري\" (Rapport) و\"المحضر الرسمي\" (Procès-verbal)؟",
    "ContexteSituationnel": "صياغة وثائق مسطرة إدارية وقضائية حول حادث وقع داخل الثكنة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-SEC-ADMIN",
      "SPEC-PJ"
    ],
    "CompetencesAssociees": [
      "أصناف الوثائق الإدارية",
      "صياغة المحاضر"
    ],
    "Explication": "التقرير وثيقة إدارية داخلية تقيم الوقائع وتقترح تدابير للقيادة، بينما المحضر وثيقة قضائية رسمية تثبت الوقائع والأقوال بحجية قانونية أمام المحكمة.",
    "Options": [
      {
        "OptionId": 1021,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "التقرير يكتب بالقلم الأحمر والمحضر يكتب بالقلم الأزرق فقط",
        "EstCorrecte": false
      },
      {
        "OptionId": 1022,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "التقرير وثيقة إخبارية تقييمية داخلية موجهة للقيادة، والمحضر وثيقة رسمية ملزمة تسجل الوقائع بأمانة لتقديمها للقضاء",
        "EstCorrecte": true
      },
      {
        "OptionId": 1023,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "لا يوجد أي فرق بينهما فهما نفس الشيء تماماً",
        "EstCorrecte": false
      },
      {
        "OptionId": 1024,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "التقرير يحرره فقط التلاميذ والمحضر يحرره فقط الجنرالات",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 103,
    "Code": "Q-ADM-003",
    "DomaineCode": "COMMUNICATION",
    "DomaineIntitule": "السكرتارية الإدارية والتحرير العسكري",
    "Enonce": "ما هي الشروط الواجب توفرها في سجل المراسلات الصادرة والواردة (Registre de correspondance) في مكاتب الدرك؟",
    "ContexteSituationnel": "تنظيم وتصنيف البريد العسكري السري والعادي داخل مكتب السكرتارية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-SEC-ADMIN"
    ],
    "CompetencesAssociees": [
      "تنظيم الأرشيف والمراسلات",
      "حفظ السجلات"
    ],
    "Explication": "سجل مرقم وموقع ومحكم التوثيق يتضمن رقم الإرسالية، التاريخ، المصدر، الوجهة، ملخص الموضوع بدقة، وتوقيع المتسلم.",
    "Options": [
      {
        "OptionId": 1031,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "تسجيل الرسائل في قصاصات أوراق صغيرة متناثرة على المكاتب",
        "EstCorrecte": false
      },
      {
        "OptionId": 1032,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "سجل رسمي مرقم يتضمن الأرقام الترتيبية، التاريخ، المراجع، ملخص المضمون وتوقيعات الاستلام والتوجيه بدقة متناهية",
        "EstCorrecte": true
      },
      {
        "OptionId": 1033,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "حفظ الرسائل في الذاكرة فقط دون أي كتابة ورقية أو رقمية",
        "EstCorrecte": false
      },
      {
        "OptionId": 1034,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "رمي المراسلات القديمة في القمامة بعد قراءتها مباشرة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 104,
    "Code": "Q-ADM-004",
    "DomaineCode": "COMMUNICATION",
    "DomaineIntitule": "السكرتارية الإدارية والتحرير العسكري",
    "Enonce": "ما هي درجات السرية المعتمدة للمستندات والوثائق في المراسلات العسكرية الرسمية؟",
    "ContexteSituationnel": "تصنيف وثيقة تتضمن خطة أمنية لحماية منشأة حساسة ضد التخريب.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 70,
    "SpecialitesAssociees": [
      "SPEC-SEC-ADMIN"
    ],
    "CompetencesAssociees": [
      "درجات السرية",
      "حماية الأسرار العسكرية"
    ],
    "Explication": "عادي (Ordinaire)، سري (Confidentiel)، سري جداً (Secret)، وسري للغاية / دفاع وطني (Très Secret Défense).",
    "Options": [
      {
        "OptionId": 1041,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "مضحك، حزين، عادي، وممتع",
        "EstCorrecte": false
      },
      {
        "OptionId": 1042,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "عادي، محدود التداول، سري، وسري جداً / دفاع وطني يخضع لقواعد حفظ وتداول استثنائية مشددة",
        "EstCorrecte": true
      },
      {
        "OptionId": 1043,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "مستندات للبيع، ومستندات للإيجار، ومستندات مجانية",
        "EstCorrecte": false
      },
      {
        "OptionId": 1044,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "درجة واحدة فقط لجميع الأوراق الرسمية دون تمييز",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 105,
    "Code": "Q-ADM-005",
    "DomaineCode": "COMMUNICATION",
    "DomaineIntitule": "السكرتارية الإدارية والتحرير العسكري",
    "Enonce": "كيف يتم إتلاف الوثائق الإدارية السرية والمسودات الملغاة داخل مكاتب القيادة العسكرية؟",
    "ContexteSituationnel": "إتلاف مسودات خطة تدريبية ومراسلات داخلية قديمة وفق البروتوكول.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "FACILE",
    "Points": 1,
    "TempsLimiteSecondes": 65,
    "SpecialitesAssociees": [
      "SPEC-SEC-ADMIN"
    ],
    "CompetencesAssociees": [
      "إتلاف الوثائق",
      "كتمان السر المهني"
    ],
    "Explication": "تمزيقها بآلات الفرم الدقيقة (Broyeur de documents) وتحويلها لقصاصات مجهرية ثم حرقها وتحرير محضر إتلاف رسمي موقع.",
    "Options": [
      {
        "OptionId": 1051,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "رميها في سلة المهملات العامة بمدخل الثكنة كأوراق عادية",
        "EstCorrecte": false
      },
      {
        "OptionId": 1052,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "الفرم الميكانيكي الدقيق بآلات التقطيع المتطورة وتحرير محضر إتلاف رسمي بحضور لجنة مختصة",
        "EstCorrecte": true
      },
      {
        "OptionId": 1053,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "استخدامها لتغليف السندويشات في مقصف الثكنة",
        "EstCorrecte": false
      },
      {
        "OptionId": 1054,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "طيها كطائرات ورقية وإلقاؤها من النوافذ",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 106,
    "Code": "Q-ADM-006",
    "DomaineCode": "COMMUNICATION",
    "DomaineIntitule": "السكرتارية الإدارية والتحرير العسكري",
    "Enonce": "ما هي الخصائص الأساسية للأسلوب الإداري العسكري في صياغة البرقيات والتعليمات الميدانية؟",
    "ContexteSituationnel": "صياغة برقية عملياتية عاجلة لتحريك سرية تدخل ميدانية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-SEC-ADMIN"
    ],
    "CompetencesAssociees": [
      "الأسلوب العسكري",
      "الإيجاز والدقة"
    ],
    "Explication": "الإيجاز، الدقة، الوضوح، الموضوعية، التجرد من العواطف والمبالغات، واستعمال المصطلحات العسكرية المقننة.",
    "Options": [
      {
        "OptionId": 1061,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الإطالة والإنشاء الأدبي والشعر والزخارف البلاغية والغموض",
        "EstCorrecte": false
      },
      {
        "OptionId": 1062,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "الوضوح، الإيجاز غير المخل، الدقة المتناهية، والموضوعية الصارمة مع استخدام العبارات الرسمية الدقيقة",
        "EstCorrecte": true
      },
      {
        "OptionId": 1063,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "استخدام الرموز التعبيرية والفكاهية في كل جملة",
        "EstCorrecte": false
      },
      {
        "OptionId": 1064,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "ترك نهاية البرقية مفتوحة ليخمن القارئ ما يريده الكاتب",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 107,
    "Code": "Q-ADM-007",
    "DomaineCode": "COMMUNICATION",
    "DomaineIntitule": "السكرتارية الإدارية والتحرير العسكري",
    "Enonce": "ما هو الإجراء السليم عند اكتشاف خطأ مادي (Erreur matérielle) في اسم أو تاريخ بمحضر رسمي بعد توقيعه من الأطراف؟",
    "ContexteSituationnel": "خطأ في كتابة رقم البطاقة الوطنية للتعريف للشاهد بالمحضر.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-SEC-ADMIN",
      "SPEC-PJ"
    ],
    "CompetencesAssociees": [
      "تصحيح المحاضر",
      "المسطرة الإدارية"
    ],
    "Explication": "يمنع الكشط أو الطمس بالطلاء الأبيض كلياً؛ يتم إنجاز محضر استدراكي ملحق (Procès-verbal rectificatif) يوضح الخطأ والتصحيح ويوقع.",
    "Options": [
      {
        "OptionId": 1071,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "مسح الخطأ بالحبر الأبيض المصحح والكتابة فوقه بخط اليد دون إشارة",
        "EstCorrecte": false
      },
      {
        "OptionId": 1072,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تحرير ملحق أو محضر استدراكي رسمي يوضح الخطأ المادي ويصوبه بدقة مع إحالته لنفس الجهة القضائية",
        "EstCorrecte": true
      },
      {
        "OptionId": 1073,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "تمزيق المحضر القديم بالكامل وتوقيعه نيابة عن الشاهد دون حضوره",
        "EstCorrecte": false
      },
      {
        "OptionId": 1074,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "تجاهل الخطأ واعتباره غير مهم على الإطلاق",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 108,
    "Code": "Q-ADM-008",
    "DomaineCode": "COMMUNICATION",
    "DomaineIntitule": "السكرتارية الإدارية والتحرير العسكري",
    "Enonce": "ما هي واجبات كتمان السر المهني المفروضة على كاتب الضبط والموظف الإداري العسكري وفق قانون الوظيفة العسكرية؟",
    "ContexteSituationnel": "اطلاع موظف إداري في السكرتارية على ملفات تأديبية وتحقيقات قضائية حساسة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "FACILE",
    "Points": 1,
    "TempsLimiteSecondes": 70,
    "SpecialitesAssociees": [
      "SPEC-SEC-ADMIN"
    ],
    "CompetencesAssociees": [
      "السر المهني",
      "الواجبات العسكرية"
    ],
    "Explication": "الالتزام المطلق والدائم بعدم إفشاء أي معلومة أو وثيقة اطلع عليها بحكم وظيفته حتى بعد انتهاء الخدمة العسكرية تحت طائلة المتابعة الجنائية.",
    "Options": [
      {
        "OptionId": 1081,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "نشر التفاصيل في مجموعات المحادثة العائلية للتفاخر بالمعلومات",
        "EstCorrecte": false
      },
      {
        "OptionId": 1082,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "الكتمان المطلق والتقيد الصارم بالسر المهني وعدم إفشاء أي وثيقة أو خبر عسكري للغير طوال الخدمة وبعدها",
        "EstCorrecte": true
      },
      {
        "OptionId": 1083,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "بيع المعلومات الحساسة للصحافة مقابل مبالغ مالية",
        "EstCorrecte": false
      },
      {
        "OptionId": 1084,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "إخبار الجيران بأسماء الأشخاص الخاضعين للتحقيق القضائي",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 109,
    "Code": "Q-ADM-009",
    "DomaineCode": "COMMUNICATION",
    "DomaineIntitule": "السكرتارية الإدارية والتحرير العسكري",
    "Enonce": "ما هو المفهوم الإداري لـ \"حاشية الإحالة\" (Bordereau d'envoi) واستخدامها في تبادل الملفات العسكرية؟",
    "ContexteSituationnel": "إرسال ملف قضائي مكون من 50 وثيقة ومحضر من سرية إلى المحكمة العسكرية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-SEC-ADMIN"
    ],
    "CompetencesAssociees": [
      "جدول الإرسال",
      "التوثيق الإداري"
    ],
    "Explication": "وثيقة رسمية تلخص عدد ونوعية الأوراق والملفات المحالة مع بيان أرقامها وتاريخها ووجهتها والغاية من الإرسال (للقيام بالمتعين/للإخبار).",
    "Options": [
      {
        "OptionId": 1091,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "ورقة إعلانات تجارية للمنتجات والمبيعات",
        "EstCorrecte": false
      },
      {
        "OptionId": 1092,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "جدول إرسال رسمي يوثق قائمة الوثائق المرفقة، عددها، مراجعها، وملاحظات التوجيه بدقة لضمان عدم ضياع أي مستند",
        "EstCorrecte": true
      },
      {
        "OptionId": 1093,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "ورقة بيضاء فارغة توضع كغلاف لحماية الملف فقط",
        "EstCorrecte": false
      },
      {
        "OptionId": 1094,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "وصل شراء الطوابع البريدية فقط",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 110,
    "Code": "Q-ADM-010",
    "DomaineCode": "COMMUNICATION",
    "DomaineIntitule": "السكرتارية الإدارية والتحرير العسكري",
    "Enonce": "كيف يتم تنظيم الأرشيف الوسيط (Archives intermédiaires) في المراكز القضائية لضمان سهولة الاسترجاع السريع؟",
    "ContexteSituationnel": "تصنيف ملفات القضايا التي تم الفصل فيها خلال السنوات الخمس الأخيرة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 80,
    "SpecialitesAssociees": [
      "SPEC-SEC-ADMIN"
    ],
    "CompetencesAssociees": [
      "حفظ وأرشفة الملفات",
      "الفهرسة الرقمية"
    ],
    "Explication": "فهرسة الملفات وفق ترميز سنوي موضوعي (قضائي، حوادث، إداري) مع سجل رقمي وقاعدة بيانات تتيح استدعاء الملف في دقائق.",
    "Options": [
      {
        "OptionId": 1101,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "رمي الملفات في ركن مظلم داخل مستودع رطب دون أي ترتيب",
        "EstCorrecte": false
      },
      {
        "OptionId": 1102,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "الفهرسة المنهجية المزدوجة (ورقياً ورقمياً) وفق معايير موضوعية وتاريخية مع علب حفظ مقننة تضمن سرعة الاسترجاع",
        "EstCorrecte": true
      },
      {
        "OptionId": 1103,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "حرق الملفات بمجرد مرور شهرين على حفظ القضية",
        "EstCorrecte": false
      },
      {
        "OptionId": 1104,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "توزيع الأوراق على مكاتب الموظفين لتخزينها في الأدراج الخاصة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 111,
    "Code": "Q-ADM-011",
    "DomaineCode": "COMMUNICATION",
    "DomaineIntitule": "السكرتارية الإدارية والتحرير العسكري",
    "Enonce": "ما هي الصيغة الصحيحة المعتمدة لتدوين شهادة الشهود في محضر رسمي من طرف الكاتب الضابط؟",
    "ContexteSituationnel": "سماع شاهد عيان في حادثة سير مميتة وقعت أمام محطة وقود.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-SEC-ADMIN",
      "SPEC-PJ"
    ],
    "CompetencesAssociees": [
      "تدوين الشهادات",
      "المسطرة الجنائية"
    ],
    "Explication": "تدوين الأقوال بلسان الشاهد بأمانة تامة بصيغة المتكلم (\"صرح لنا قائلاً...\")، وتلاوتها عليه وتوقيعه أو بصمته بعد المصادقة.",
    "Options": [
      {
        "OptionId": 1111,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "إعادة صياغة الأقوال بكلمات فلسفية معقدة يغير بها المعنى الحقيقي",
        "EstCorrecte": false
      },
      {
        "OptionId": 1112,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تدوين تصريحات الشاهد بأمانة تامة وحيادية، تلاوتها عليه، والإشارة لمصادقته وتوقيعه أو بيان سبب الامتناع",
        "EstCorrecte": true
      },
      {
        "OptionId": 1113,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "كتابة ملخص من ثلاث كلمات فقط وإهمال كل التفاصيل الدقيقة",
        "EstCorrecte": false
      },
      {
        "OptionId": 1114,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "توقيع المحضر من طرف الكاتب دون إطلاع الشاهد على ما كتب",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 112,
    "Code": "Q-ADM-012",
    "DomaineCode": "COMMUNICATION",
    "DomaineIntitule": "السكرتارية الإدارية والتحرير العسكري",
    "Enonce": "ما هو مدلول التأشيرة العسكرية \"بالنيابة\" (Par intérim - P.I) أو \"عن أمر\" (Par ordre - P.O) في توقيع الوثائق الإدارية؟",
    "ContexteSituationnel": "توقيع مراسلة رسمية في غياب القائد الأصلي للسرية في مهمة تدريبية خارج الوطن.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 1,
    "TempsLimiteSecondes": 80,
    "SpecialitesAssociees": [
      "SPEC-SEC-ADMIN"
    ],
    "CompetencesAssociees": [
      "التفويض والتوقيع",
      "المشروعية الإدارية"
    ],
    "Explication": "ممارسة الصلاحية بناءً على تعيين رسمي بالنيابة أثناء شغور المنصب، أو تفويض قانوني بالتوقيع نيابة عن الأصيل في حدود الاختصاص.",
    "Options": [
      {
        "OptionId": 1121,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "تقليد توقيع القائد الغائب باليد للتمويه كأنه هو الموقع شخصياً",
        "EstCorrecte": false
      },
      {
        "OptionId": 1122,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "توقيع مشروع ومقنن يستند إلى تكليف رسمي بالنيابة أو تفويض قانوني بالتوقيع مع الإشارة الصريحة للصفة القانونية",
        "EstCorrecte": true
      },
      {
        "OptionId": 1123,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "التوقيع دون أي إشارة ودون علم القيادة العليا بالموضوع",
        "EstCorrecte": false
      },
      {
        "OptionId": 1124,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "إلغاء التوقيع بالكامل وترك الورقة بيضاء بدون اسم أو رتبة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 113,
    "Code": "Q-ADM-013",
    "DomaineCode": "COMMUNICATION",
    "DomaineIntitule": "السكرتارية الإدارية والتحرير العسكري",
    "Enonce": "ما هي القواعد المتبعة في إعداد جدول الخدمات اليومي (Tableau de service) لأفراد الفصيل؟",
    "ContexteSituationnel": "توزيع نوبات الحراسة، الدوريات الراجلة، والمداومة الليلية بين عناصر المركز.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-SEC-ADMIN"
    ],
    "CompetencesAssociees": [
      "تنظيم الخدمة العسكرية",
      "جدول الخدمات"
    ],
    "Explication": "احترام مبدأ المساواة والتدوير العادل، فترات الراحة القانونية، الجاهزية العملياتية ومراعاة الكفاءات والتخصصات في كل مهمة.",
    "Options": [
      {
        "OptionId": 1131,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "تكليف نفس الدركي بالحراسة الليلية 30 يوماً متواصلة دون نوم",
        "EstCorrecte": false
      },
      {
        "OptionId": 1132,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "التوزيع العادل للواجبات، احترام أوقات الراحة البيولوجية، وضمان الجاهزية الدائمة بتعيين عناصر الاحتياط المؤهلة",
        "EstCorrecte": true
      },
      {
        "OptionId": 1133,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إعفاء الأصدقاء المقربين من أي خدمة وإثقال كاهل الآخرين",
        "EstCorrecte": false
      },
      {
        "OptionId": 1134,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "ترك الأفراد يختارون نوباتهم بأنفسهم دون أي جدول معتمد",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 114,
    "Code": "Q-ADM-014",
    "DomaineCode": "COMMUNICATION",
    "DomaineIntitule": "السكرتارية الإدارية والتحرير العسكري",
    "Enonce": "ما هي أهمية التدقيق اللغوي والإملائي في المحاضر والوثائق الموجهة للمحاكم العسكرية والمدنية؟",
    "ContexteSituationnel": "إعداد ملف متابعة قضائية في جناية قتل عمد مع سبق الإصرار.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "FACILE",
    "Points": 1,
    "TempsLimiteSecondes": 65,
    "SpecialitesAssociees": [
      "SPEC-SEC-ADMIN"
    ],
    "CompetencesAssociees": [
      "السلامة اللغوية",
      "الحجية القانونية"
    ],
    "Explication": "تفادي أي لبس أو غموض في المعنى قد يستغله الدفاع للطعن في صحة الوقائع أو تغيير التكييف الجنائي للأفعال المنسوبة.",
    "Options": [
      {
        "OptionId": 1141,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الأخطاء الإملائية تزيد المحضر جمالاً وتضفي عليه طابعاً قديماً",
        "EstCorrecte": false
      },
      {
        "OptionId": 1142,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "السلامة اللغوية الصارمة تمنع التأويلات الخاطئة واللبس القانوني وتحصن الحجية الثبوتية للمحضر أمام القضاء",
        "EstCorrecte": true
      },
      {
        "OptionId": 1143,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "لا أحد يقرأ المحاضر في المحكمة وبالتالي لا أهمية للغة",
        "EstCorrecte": false
      },
      {
        "OptionId": 1144,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "تغيير معاني الكلمات عمداً لا يغير مجرى المحاكمة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 115,
    "Code": "Q-PED-001",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "البيداغوجيا العسكرية والرماية التكتيكية",
    "Enonce": "ما هو المبدأ البيداغوجي الأساسي في تدريب تلاميذ الدرك على الرماية بالذخيرة الحية داخل ميدان الرمي العسكري؟",
    "ContexteSituationnel": "حصة تدريبية للدفعة الأولى على استخدام المسدس الفردي 9 مم.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-INSTRUCTEUR"
    ],
    "CompetencesAssociees": [
      "بيداغوجيا التدريب العسكري",
      "أمان ميادين الرمي"
    ],
    "Explication": "التدرج من الرماية الجافة (Tir à sec) وإتقان قواعد الأمان الأربع والمواقف الجسدية السليمة قبل الانتقال لإطلاق الرصاص الحي.",
    "Options": [
      {
        "OptionId": 1151,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "إعطاء الذخيرة الحية فوراً في اليوم الأول وتشجيع التلاميذ على الرماية العشوائية السريعة",
        "EstCorrecte": false
      },
      {
        "OptionId": 1152,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "التدرج الدقيق: التدريب الجاف، ترسيخ الانضباط الصارم لقواعد الأمان، ثم الرماية التدريجية تحت إشراف فردي لصيق",
        "EstCorrecte": true
      },
      {
        "OptionId": 1153,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "ترك التلاميذ في ميدان الرمي دون أي مدرب لتعزيز الاعتماد على النفس",
        "EstCorrecte": false
      },
      {
        "OptionId": 1154,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "إطلاق النار في الظلام دون أهداف محددة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 116,
    "Code": "Q-PED-002",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "البيداغوجيا العسكرية والرماية التكتيكية",
    "Enonce": "أثناء رماية التلميذ، حدث استعصاء ميكانيكي مفاجئ (Incident de tir) ولم تنطلق الرصاصة، ما هو السلوك الفوري للمدرب والتلميذ؟",
    "ContexteSituationnel": "صوت نقر الإبرة دون حدوث انفجار داخل السبطانة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-INSTRUCTEUR",
      "SPEC-PSIG"
    ],
    "CompetencesAssociees": [
      "حوادث الرمي",
      "معالجة الاستعصاء"
    ],
    "Explication": "إبقاء فوهة السلاح موجهة نحو الأهداف لمدة 5 ثوانٍ، الإصبع خارج الزناد، تنبيه المدرب، ثم معالجة الاستعصاء بضرب المخزن وسحب الأقسام.",
    "Options": [
      {
        "OptionId": 1161,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الالتفات بالسلاح نحو المدرب والزملاء في الخلف والاستفسار عن السبب",
        "EstCorrecte": false
      },
      {
        "OptionId": 1162,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "الحفاظ على فوهة السلاح في اتجاه خط الأهداف الآمن، الانتظار ثوانٍ، ثم تطبيق حركة معالجة الاستعصاء القياسية",
        "EstCorrecte": true
      },
      {
        "OptionId": 1163,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "النظر داخل فوهة السلاح من الأمام لمعرفة ما إذا كانت الرصاصة عالقة",
        "EstCorrecte": false
      },
      {
        "OptionId": 1164,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "رمي السلاح على الأرض بقوة والركض بعيداً",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 117,
    "Code": "Q-PED-003",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "البيداغوجيا العسكرية والرماية التكتيكية",
    "Enonce": "ما هي العناصر الميكانيكية الحيوية الأساسية لتحقيق رماية دقيقة وثابتة (Les fondamentaux du tir)؟",
    "ContexteSituationnel": "تقييم رمية تلميذ يعاني من تشتت الإصابات في زوايا الهدف الكرتوني.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 80,
    "SpecialitesAssociees": [
      "SPEC-INSTRUCTEUR"
    ],
    "CompetencesAssociees": [
      "أساسيات الرماية",
      "الميكانيكا الحيوية"
    ],
    "Explication": "الوقفة المستقرة، القبضة المحكمة، ضبط الصورة البصرية (العين، الفرضة، الشعيرة، الهدف)، التحكم في التنفس، والضغط التدريجي المستمر على الزناد.",
    "Options": [
      {
        "OptionId": 1171,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "إغلاق كلتا العينين معاً والضغط العنيف المفاجئ على الزناد",
        "EstCorrecte": false
      },
      {
        "OptionId": 1172,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "الاستقرار البدني، القبضة المتوازنة، محاذاة أجهزة التسديد بدقة، تنظيم التنفس، والضغط السلس الخطي على الزناد",
        "EstCorrecte": true
      },
      {
        "OptionId": 1173,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "القفز في الهواء أثناء الضغط على الزناد",
        "EstCorrecte": false
      },
      {
        "OptionId": 1174,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "استنشاق الهواء وحبسه لمدة ساعتين كاملتين",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 118,
    "Code": "Q-PED-004",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "البيداغوجيا العسكرية والرماية التكتيكية",
    "Enonce": "ما هو دور أسلوب \"المحاكاة التكتيكية بالسيناريو\" (Mise en situation scénarisée) في تكوين ضباط الصف؟",
    "ContexteSituationnel": "تدريب على مداهمة وكر مشبوه بممثلين يحاكون دور مشتبه بهم ورهائن في قرية تدريبية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-INSTRUCTEUR"
    ],
    "CompetencesAssociees": [
      "التعليم العملياتي بالسيناريو",
      "إدارة الضغط والتوتر"
    ],
    "Explication": "وضع التلميذ في ظروف واقعية تحاكي ضغط الميدان لاتخاذ قرارات قانونية وتكتيكية سريعة تحت التوتر وتقييم الأخطاء في جلسة نقدية.",
    "Options": [
      {
        "OptionId": 1181,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "مجرد تمثيل مسرحي للترفيه والضحك في نهاية الأسبوع",
        "EstCorrecte": false
      },
      {
        "OptionId": 1182,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "بناء ردود الفعل الغريزية السليمة، اختبار اتخاذ القرار تحت الضغط العالي، وتحليل الأخطاء في جلسة استخلاص الدروس (Debriefing)",
        "EstCorrecte": true
      },
      {
        "OptionId": 1183,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إهانة التلاميذ أمام زملائهم لخفض معنوياتهم",
        "EstCorrecte": false
      },
      {
        "OptionId": 1184,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "استهلاك الذخيرة الزائدة قبل نهاية السنة المالية",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 119,
    "Code": "Q-PED-005",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "البيداغوجيا العسكرية والرماية التكتيكية",
    "Enonce": "كيف يتعامل المدرب العسكري مع تلميذ يظهر خوفاً شديداً أو تجمداً انفعالياً (Sidération) أثناء القفز من برج الإنزال بالحبال؟",
    "ContexteSituationnel": "تلميذ يتجمد عند حافة المنصة على ارتفاع 15 متراً ويرفض التحرك.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-INSTRUCTEUR"
    ],
    "CompetencesAssociees": [
      "علم النفس العسكري",
      "إدارة الخوف"
    ],
    "Explication": "التهدئة الحازمة الهادئة، التواصل البصري، تجزئة الحركة لخطوات صغيرة، تذكيره بإجراءات الأمان وفحص الحبل أمامه لاستعادة الثقة.",
    "Options": [
      {
        "OptionId": 1191,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "دفعه بالقوة من الخلف دون تثبيت أحزمة الأمان ليتعلم الشجاعة",
        "EstCorrecte": false
      },
      {
        "OptionId": 1192,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "الحديث الهادئ الصارم، تثبيت التركيز على الخطوات الإجرائية، كسر حلقة الفزع النفسي، وإعادة الثقة بالتدرج دون إهانة",
        "EstCorrecte": true
      },
      {
        "OptionId": 1193,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "السخرية منه وتصويره بهاتف ونشره بين زملائه",
        "EstCorrecte": false
      },
      {
        "OptionId": 1194,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "تركه معلقاً في الهواء لمدة يوم كامل عقاباً له",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 120,
    "Code": "Q-PED-006",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "البيداغوجيا العسكرية والرماية التكتيكية",
    "Enonce": "ما هي أهمية مرحلة \"استخلاص الدروس ونقد التمرين\" (Débriefing pédagogique) بعد نهاية المناورة التكتيكية؟",
    "ContexteSituationnel": "فصيل متدرب ينهي عملية تمشيط غابوي بنجاح نسبي مع ارتكاب بعض الأخطاء في التغطية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-INSTRUCTEUR"
    ],
    "CompetencesAssociees": [
      "التقييم البيداغوجي",
      "التحليل بعد العمليات AAR"
    ],
    "Explication": "مراجعة شريط الأحداث بموضوعية، تشخيص مواطن القوة والخلل، ترسيخ الدروس المستفادة، وتصحيح المفاهيم الخاطئة قبل تثبيتها في الذهن.",
    "Options": [
      {
        "OptionId": 1201,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "توجيه العقوبات البدنية الجماعية دون شرح الأسباب",
        "EstCorrecte": false
      },
      {
        "OptionId": 1202,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "التحليل الموضوعي التشاركي لما حدث، تشخيص الأخطاء التكتيكية، واستخلاص العبر لضمان عدم تكرارها في الميدان الحقيقي",
        "EstCorrecte": true
      },
      {
        "OptionId": 1203,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "الذهاب فوراً للنوم دون أي حديث عما جرى في التمرين",
        "EstCorrecte": false
      },
      {
        "OptionId": 1204,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "إلغاء نتائج التمرين والادعاء بأنه لم يحدث أصلاً",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 121,
    "Code": "Q-PED-007",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "البيداغوجيا العسكرية والرماية التكتيكية",
    "Enonce": "ما هو المفهوم العسكري لـ \"القدوة والنموذج في القيادة\" (Exemplarité du commandement) لدى مدرب مدرسة الدرك؟",
    "ContexteSituationnel": "توجيه التلاميذ نحو الانضباط، الالتزام بالمواعيد، والروح المعنوية العالية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "FACILE",
    "Points": 1,
    "TempsLimiteSecondes": 70,
    "SpecialitesAssociees": [
      "SPEC-INSTRUCTEUR"
    ],
    "CompetencesAssociees": [
      "القدوة العسكرية",
      "أخلاقيات الضابط"
    ],
    "Explication": "أن يكون المدرب أول من يطبق الأوامر الصارمة في هندامه ولياقته وأخلاقه، لأن الأفعال أبلغ أثراً في ترسيخ العقيدة العسكرية من الكلمات.",
    "Options": [
      {
        "OptionId": 1211,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "مطالبة التلاميذ بالمستحيل بينما يتأخر المدرب عن المواعيد ويهمل هندامه",
        "EstCorrecte": false
      },
      {
        "OptionId": 1212,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تجسيد النموذج المثالي في الانضباط والهندام واللياقة والسلوك المهني ليكون قدوة حية تقتدي بها الأجيال الصاعدة",
        "EstCorrecte": true
      },
      {
        "OptionId": 1213,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "التكبر على التلاميذ وتذكيرهم بضعفهم مقارنة مع المدرب",
        "EstCorrecte": false
      },
      {
        "OptionId": 1214,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "الغياب عن التمارين وتوكيل متدربين بإدارتها",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 122,
    "Code": "Q-PED-008",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "البيداغوجيا العسكرية والرماية التكتيكية",
    "Enonce": "ما هي المنهجية المتبعة لتصحيح خطأ التلميذ المتمثل في \"الخوف من صوت الطلقة\" وحركة الارتجاف المسبق (Coup de doigt)؟",
    "ContexteSituationnel": "طلقات التلميذ تسقط باستمرار أسفل الهدف وعلى اليسار (للرامي الأيمن).",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-INSTRUCTEUR"
    ],
    "CompetencesAssociees": [
      "تصحيح أخطاء الرماية",
      "الرمي الخاطف"
    ],
    "Explication": "تطبيق تمرين الخرطوشة الخاملة الوهمية (Exercice de la cartouche inerte) غير المعروفة للتلميذ لإظهار حركة ارتعاش يده وإصلاحها.",
    "Options": [
      {
        "OptionId": 1221,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الصراخ عليه وضربه على يده أثناء إطلاق النار",
        "EstCorrecte": false
      },
      {
        "OptionId": 1222,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "استخدام ذخيرة تدريب خاملة غير حية وسط المخزن لكشف حركة اليد اللاإرادية وتدريبه على الضغط المتصل المفاجئ بالانفجار",
        "EstCorrecte": true
      },
      {
        "OptionId": 1223,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "تغيير السلاح بمدفع هاون ثقيل لمعالجة الخوف",
        "EstCorrecte": false
      },
      {
        "OptionId": 1224,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "منعه من الرماية مدى الحياة وطرده من المدرسة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 123,
    "Code": "Q-PED-009",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "البيداغوجيا العسكرية والرماية التكتيكية",
    "Enonce": "كيف يوازن مدرب اللياقة البدنية العسكرية بين بناء القوة العضلية والقدرة على التحمل القلبي الوعائي (Endurance)؟",
    "ContexteSituationnel": "إعداد برنامج تأهيلي بدني للمتدربين لخوض مسير 30 كم بالعتاد الكامل.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-INSTRUCTEUR"
    ],
    "CompetencesAssociees": [
      "الإعداد البدني العسكري",
      "الفيزيولوجيا الرياضية"
    ],
    "Explication": "الجمع المتوازن بين التدريب المتواتر عالي الكثافة (HIIT)، الجري الطويل المتدرج، وتقوية عضلات الجذع والساقين دون إرهاق مفرط يسبب إصابات.",
    "Options": [
      {
        "OptionId": 1231,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "التركيز على رفع الأثقال الضخمة فقط دون أي تمارين جري أو سرعة",
        "EstCorrecte": false
      },
      {
        "OptionId": 1232,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "التدريب المتوازن الدوري الذي يجمع بين التحمل القلبي التنفسي والقوة الوظيفية العضلية مع فترات استرجاع كافية",
        "EstCorrecte": true
      },
      {
        "OptionId": 1233,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "حرمان المتدربين من شرب الماء أثناء التدريبات الشاقة لتقوية العطش",
        "EstCorrecte": false
      },
      {
        "OptionId": 1234,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "الجلوس في قاعات المحاضرات والاكتفاء بمشاهدة مقاطع اللياقة البدنية",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 124,
    "Code": "Q-PED-010",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "البيداغوجيا العسكرية والرماية التكتيكية",
    "Enonce": "ما هو المفهوم العسكري لـ \"المسير التكتيكي بالعتاد الكامل\" (Marche commando) وما هي قيمته البيداغوجية؟",
    "ContexteSituationnel": "مسير عسكري ليلي لمسافة 40 كم في تضاريس جبلية مع حمل السلاح وحقيبة بوزن 20 كغ.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 80,
    "SpecialitesAssociees": [
      "SPEC-INSTRUCTEUR"
    ],
    "CompetencesAssociees": [
      "المسيرات العسكرية",
      "التماسك المعنوي"
    ],
    "Explication": "اختبار الصلابة النفسية، صقل قوة الإرادة والتحمل، وبناء التلاحم والتكافل الجماعي حيث يساعد القوي زميله الضعيف لإكمال المهمة.",
    "Options": [
      {
        "OptionId": 1241,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "عقاب انتقامي من الإدارة لتلاميذ الدفعة",
        "EstCorrecte": false
      },
      {
        "OptionId": 1242,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "صهر الشخصية العسكرية، اختبار القدرة على قهر التعب والإجهاد، وترسيخ روح التضامن والعمل الجماعي تحت الشدائد",
        "EstCorrecte": true
      },
      {
        "OptionId": 1243,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "فرصة لجمع النباتات النادرة في الغابات الجبلية",
        "EstCorrecte": false
      },
      {
        "OptionId": 1244,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "سباق فردي أناني لترك المتأخرين في الغابة بمفردهم",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 125,
    "Code": "Q-PED-011",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "البيداغوجيا العسكرية والرماية التكتيكية",
    "Enonce": "ما هي إجراءات الأمان الإلزامية التي يعلنها مدرب الرماية عند نهاية كل حصة تدريب بالذخيرة الحية؟",
    "ContexteSituationnel": "انتهاء التمرين في ميدان الرماية والاستعداد للمغادرة نحو الثكنة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "FACILE",
    "Points": 1,
    "TempsLimiteSecondes": 70,
    "SpecialitesAssociees": [
      "SPEC-INSTRUCTEUR",
      "SPEC-PSIG"
    ],
    "CompetencesAssociees": [
      "تأمين الأسلحة",
      "نهاية الرماية"
    ],
    "Explication": "نزع المخازن، سحب الأقسام مرتين للتأكد من خلو حجرة الانفجار، فحص بصري ولمسي من طرف المدرب، ثم توجيه السلاح نحو ساتر الأمان والضغط على الزناد.",
    "Options": [
      {
        "OptionId": 1251,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "وضع الأسلحة مباشرة في الحقائب وهي محشوة بالرصاص لتكون جاهزة",
        "EstCorrecte": false
      },
      {
        "OptionId": 1252,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "إفراغ الأسلحة، فحص غرفة النار بصرياً ولمسياً، التفتيش الفردي الصارم من المدرب، وإجراء الطلقة الجافة باتجاه الساتر الآمن",
        "EstCorrecte": true
      },
      {
        "OptionId": 1253,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إطلاق جميع الرصاصات المتبقية في الهواء دفعة واحدة",
        "EstCorrecte": false
      },
      {
        "OptionId": 1254,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "توزيع فوارغ الرصاص كهدايا تذكارية دون حصرها",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 126,
    "Code": "Q-PED-012",
    "DomaineCode": "SITUATION",
    "DomaineIntitule": "البيداغوجيا العسكرية والرماية التكتيكية",
    "Enonce": "كيف يتعامل المدرب العسكري مع حالة الغش في الامتحانات الأكاديمية أو تزوير نتائج الرماية في مدرسة الدرك؟",
    "ContexteSituationnel": "ضبط تلميذ يخفي قصاصة إجابات أو يثقب ورقة الرماية بقلم لمحاكاة الإصابة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "FACILE",
    "Points": 1,
    "TempsLimiteSecondes": 65,
    "SpecialitesAssociees": [
      "SPEC-INSTRUCTEUR",
      "SPEC-PJ"
    ],
    "CompetencesAssociees": [
      "أخلاقيات المهنة",
      "النزاهة الأكاديمية العسكرية"
    ],
    "Explication": "توقيف المعني فوراً، تحرير تقرير مفصل بالواقعة وإحالته على المجلس التأديبي، لأن خيانة الأمانة ونقص النزاهة يتنافيان كلياً مع صفة رجل الدرك.",
    "Options": [
      {
        "OptionId": 1261,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "مساعدته على إخفاء القصاصة ومنحه النقطة الكاملة 20/20 تشجيعاً لذكائه",
        "EstCorrecte": false
      },
      {
        "OptionId": 1262,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "إثبات حالة الغش فوراً، حجز الأدلة، وتحرير تقرير إحالة على المجلس التأديبي لتعارض الغش جذرياً مع الشرف العسكري",
        "EstCorrecte": true
      },
      {
        "OptionId": 1263,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "تجاهل الأمر والضحك معه على الواقعة",
        "EstCorrecte": false
      },
      {
        "OptionId": 1264,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "إعطاء التلميذ فرصة لإعادة كتابة الامتحان في غرفته الخاصة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 127,
    "Code": "Q-SCI-001",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الشرطة التقنية والعلمية والطب الشرعي",
    "Enonce": "ما هو المسحوق الكيميائي المضيء (Luminol / Bluestar) المستخدم في مسرح الجريمة وما هي حدوده العلمية؟",
    "ContexteSituationnel": "فحص شقة يشتبه في حدوث جريمة قتل بداخلها ثم غسلها بالمنظفات لإخفاء الدماء.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-SCIENTIFIQUE"
    ],
    "CompetencesAssociees": [
      "الكواشف الكيميائية",
      "التحقيق العلمي"
    ],
    "Explication": "يتفاعل مع الحديد في هيموغلوبين الدم ويطلق وميضاً أزرق في الظلام حتى بعد الغسيل، لكنه قد يعطي نتائج إيجابية كاذبة مع مبيضات الكلور وبعض المعادن.",
    "Options": [
      {
        "OptionId": 1271,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "مسحوق صباغة الجدران لإعادة تلوين الشقة بلون جميل",
        "EstCorrecte": false
      },
      {
        "OptionId": 1272,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "كاشف كيميائي يضيء عند ملامسة آثار الدم الخفية الممسوحة، ويتطلب توثيقاً فوتوغرافياً سريعاً مع الحذر من الإيجابيات الكاذبة",
        "EstCorrecte": true
      },
      {
        "OptionId": 1273,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "مادة متفجرة تستعمل لتدمير الباب الخارجي",
        "EstCorrecte": false
      },
      {
        "OptionId": 1274,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "مبيد حشري للقضاء على الناموس أثناء المعاينة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 128,
    "Code": "Q-SCI-002",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الشرطة التقنية والعلمية والطب الشرعي",
    "Enonce": "ما هي أنواع البصمات الأصبعية الثلاث المصنفة في النظام الآلي للبصمات (AFIS)؟",
    "ContexteSituationnel": "مضاهاة بصمة أصبع مرفوعة من زجاج نافذة مع قاعدة البيانات المركزية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 80,
    "SpecialitesAssociees": [
      "SPEC-SCIENTIFIQUE",
      "SPEC-PJ"
    ],
    "CompetencesAssociees": [
      "علم البصمات Dactyloscopie",
      "نظام AFIS"
    ],
    "Explication": "الحلقات (Boucles / Loops)، المستديرات (Tourbillons / Whorls)، والأقواس (Arches).",
    "Options": [
      {
        "OptionId": 1281,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "المربعات، والمثلثات، والنجوم الخماسية",
        "EstCorrecte": false
      },
      {
        "OptionId": 1282,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "الحلقات (Loops)، الدوامات أو المستديرات (Whorls)، والأقواس (Arches) بنقاط علام مميزة كالنهايات والتشعبات",
        "EstCorrecte": true
      },
      {
        "OptionId": 1283,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "البصمات الطويلة، والبصمات القصيرة، والبصمات المتقطعة",
        "EstCorrecte": false
      },
      {
        "OptionId": 1284,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "البصمات الصيفية، والبصمات الشتوية، والبصمات الربيعية",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 129,
    "Code": "Q-SCI-003",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الشرطة التقنية والعلمية والطب الشرعي",
    "Enonce": "ما هي تقنية مضاهاة الخطوط البالستية (Stries balistiques) على المقذوف الناري لتحديد السلاح المستخدم بدقة؟",
    "ContexteSituationnel": "العثور على رصاصة مستقرة في جدار خشبي بمسرح تبادل إطلاق نار.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-SCIENTIFIQUE",
      "SPEC-TECH"
    ],
    "CompetencesAssociees": [
      "البالستيك الجنائي",
      "مقارنة المقذوفات"
    ],
    "Explication": "مقارنة الخدوش المجهرية الدقيقة والفريدة التي تتركها الخطوط الحلزونية لسبطانة السلاح على الرصاصة بالمجهر المقارن (Macroscope de comparaison).",
    "Options": [
      {
        "OptionId": 1291,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "وزن الرصاصة بميزان المطبخ فقط لمعرفة نوع السلاح",
        "EstCorrecte": false
      },
      {
        "OptionId": 1292,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "الفحص المجهري المقارن للآثار والخطوط الميكانيكية الفريدة المنطبعة على الرصاصة من السبطانة ومقارنتها بطلقة تجريبية",
        "EstCorrecte": true
      },
      {
        "OptionId": 1293,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "شم رائحة البارود المتبقي بالأنف المجرد",
        "EstCorrecte": false
      },
      {
        "OptionId": 1294,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "غلي الرصاصة في الزيت لمعرفة عيارها",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 130,
    "Code": "Q-SCI-004",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الشرطة التقنية والعلمية والطب الشرعي",
    "Enonce": "ما هو التغير الرمي الأساسي الدال على زمن الوفاة التقريبي في الطب الشرعي (Rigor mortis / Taches cadavériques)؟",
    "ContexteSituationnel": "معاينة جثة متوفى في شقة مغلقة لتحديد تاريخ وساعة الموت.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-SCIENTIFIQUE",
      "SPEC-PJ"
    ],
    "CompetencesAssociees": [
      "الطب الشرعي",
      "التغيرات الرمية"
    ],
    "Explication": "حرارة الجثة وانخفاضها، التخشب الرمي (Régidité)، والزرقة الرمية وتثبتها (Lividités cadavériques)، ومراحل التعفن الأخضر.",
    "Options": [
      {
        "OptionId": 1301,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "طول شعر المتوفى ولون عينيه فقط",
        "EstCorrecte": false
      },
      {
        "OptionId": 1302,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "انخفاض درجة حرارة الجسد، التخشب العضلي الرمي، استقرار الزرقة الرمية الجاذبية، وتطور التحلل الحيوي",
        "EstCorrecte": true
      },
      {
        "OptionId": 1303,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "نوع الملابس التي كان يرتديها الضحية",
        "EstCorrecte": false
      },
      {
        "OptionId": 1304,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "رصيد حسابه البنكي المسجل في الهاتف",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 131,
    "Code": "Q-SCI-005",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الشرطة التقنية والعلمية والطب الشرعي",
    "Enonce": "ما هي المادة المعتمدة لإظهار البصمات الخفية (Empreintes latentes) على الأسطح الورقية والكرتونية المسامية؟",
    "ContexteSituationnel": "فحص رسالة تهديد مكتوبة بخط اليد استلمتها وكالة حكومية.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-SCIENTIFIQUE"
    ],
    "CompetencesAssociees": [
      "الكواشف الكيميائية للبصمات",
      "النينهيدرين"
    ],
    "Explication": "النينهيدرين (Ninhydrine) الذي يتفاعل مع الأحماض الأمينية في العرق البشري المترسب ليعطي لوناً بنفسجياً مميزاً (Ruhemann's Purple).",
    "Options": [
      {
        "OptionId": 1311,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الماء المغلي مع عصير الليمون",
        "EstCorrecte": false
      },
      {
        "OptionId": 1312,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "محلول النينهيدرين الكيميائي الذي يتفاعل مع الأحماض الأمينية للعرق ويظهر البصمة بلون بنفسجي مميز",
        "EstCorrecte": true
      },
      {
        "OptionId": 1313,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "زيت الزيتون الدافئ مع الملح",
        "EstCorrecte": false
      },
      {
        "OptionId": 1314,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "مسحوق الفحم العادي الخشن",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 132,
    "Code": "Q-SCI-006",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الشرطة التقنية والعلمية والطب الشرعي",
    "Enonce": "كيف يتم تفادي التلويث المتبادل (Contamination croisée) للعينات البيولوجية في مسرح الجريمة من طرف الخبراء؟",
    "ContexteSituationnel": "أخذ مسحات قطنية من مقبض باب ومن بقع دم مختلفة في مسرح جريمة معقد.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "FACILE",
    "Points": 1,
    "TempsLimiteSecondes": 70,
    "SpecialitesAssociees": [
      "SPEC-SCIENTIFIQUE"
    ],
    "CompetencesAssociees": [
      "بروتوكول مكافحة التلوث",
      "رفع العينات"
    ],
    "Explication": "ارتداء بدلة بيضاء كاملة معقمة، قناع وجه، وتغيير القفازات الطبية عند الانتقال من كل عينة إلى أخرى واستخدام أدوات معقمة ذات استخدام واحد.",
    "Options": [
      {
        "OptionId": 1321,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "استخدام نفس القفاز لمسح جميع أركان المنزل توفيراً للميزانية",
        "EstCorrecte": false
      },
      {
        "OptionId": 1322,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "ارتداء بدلات واقية معقمة، كمامات، وتغيير القفازات واستعمال أدوات رفع العينات المعقمة أحادية الاستعمال لكل عينة على حدة",
        "EstCorrecte": true
      },
      {
        "OptionId": 1323,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "لمس العينات باليد العارية للتأكد من ملمسها الحقيقي",
        "EstCorrecte": false
      },
      {
        "OptionId": 1324,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "وضع جميع العينات في جيب واحد مع مفاتيح السيارة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 133,
    "Code": "Q-SCI-007",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الشرطة التقنية والعلمية والطب الشرعي",
    "Enonce": "ما هو التحليل المجهري المعتمد لمخلفات إطلاق النار (GSR - Gunshot Residue) على أيدي المشتبه بهم؟",
    "ContexteSituationnel": "توقيف شخص ينكر إطلاق النار بعد حادثة سطو مسلح وقعت قبل ساعتين.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "EXPERT",
    "Points": 2,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-SCIENTIFIQUE",
      "SPEC-PJ"
    ],
    "CompetencesAssociees": [
      "مخلفات الرماية GSR",
      "المجهر الإلكتروني الماسح"
    ],
    "Explication": "استخدام مسحات كربونية وفحصها بالمجهر الإلكتروني الماسح (SEM-EDX) للبحث عن جزيئات الباريوم، الرصاص، والأنتيمون المندمجة معاً.",
    "Options": [
      {
        "OptionId": 1331,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "غسل يدي المشتبه به بالصابون لمعرفة ما إذا كانت رائحته عطرة",
        "EstCorrecte": false
      },
      {
        "OptionId": 1332,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "المسح المجهري الإلكتروني (SEM-EDX) لرصد الجزيئات الميكروسكوبية المميزة المتكونة من مزيج الرصاص والباريوم والأنتيمون",
        "EstCorrecte": true
      },
      {
        "OptionId": 1333,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "النظر إلى أصابعه بمكبرة يدوية بسيطة",
        "EstCorrecte": false
      },
      {
        "OptionId": 1334,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "قياس طول أظافر المشتبه به",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 134,
    "Code": "Q-SCI-008",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الشرطة التقنية والعلمية والطب الشرعي",
    "Enonce": "ما هو مفهوم زاوية السقوط (Angle d'impact) في تحليل أنماط بقع الدم (BPA - Bloodstain Pattern Analysis)؟",
    "ContexteSituationnel": "تحليل بقع دم إهليلجية متناثرة على جدار لمعرفة موقع وقوف الضحية وحركة السلاح.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-SCIENTIFIQUE"
    ],
    "CompetencesAssociees": [
      "تحليل أنماط الدم BPA",
      "الفيزياء الجنائية"
    ],
    "Explication": "حساب الزاوية بمعادلة جيب الزاوية (Sinus) بقسمة عرض البقعة على طولها لتحديد مسار تطاير القطرات ونقطة الأصل في الفضاء ثلاثي الأبعاد.",
    "Options": [
      {
        "OptionId": 1341,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "تخمين الزاوية عشوائياً بمجرد النظر السريع",
        "EstCorrecte": false
      },
      {
        "OptionId": 1342,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "المعادلة الرياضية المثلثية بقسمة العرض على الطول لتحديد زاوية الاصطدام ومصدر مصدر الضربة في الفراغ بدقة هندسية",
        "EstCorrecte": true
      },
      {
        "OptionId": 1343,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "قياس حرارة الدم بعد أسبوع من جفافه",
        "EstCorrecte": false
      },
      {
        "OptionId": 1344,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "افتراض أن الدم يسقط دائماً بزاوية 90 درجة عمودية",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 135,
    "Code": "Q-SCI-009",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الشرطة التقنية والعلمية والطب الشرعي",
    "Enonce": "ما هي عينة المقارنة المرجعية (Échantillon de référence) الإلزامية عند إرسال حمض نووي مستخلص إلى المختبر؟",
    "ContexteSituationnel": "عثور المحققين على شعرة بجذرها في يد الضحية المتوفاة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 75,
    "SpecialitesAssociees": [
      "SPEC-SCIENTIFIQUE",
      "SPEC-PJ"
    ],
    "CompetencesAssociees": [
      "الحمض النووي DNA",
      "عينات المقارنة"
    ],
    "Explication": "مسحة شدقية (Frottis buccal) مأخوذة من الغشاء المخاطي لفم الضحية والمشتبه بهم وأفراد المعاينة لاستبعاد التلوث وتأكيد المضاهاة.",
    "Options": [
      {
        "OptionId": 1351,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "صورة شخصية للضحية في بطاقة الهوية",
        "EstCorrecte": false
      },
      {
        "OptionId": 1352,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "مسحة بيولوجية معقمة من اللعاب أو الدم من الأشخاص المعنيين كمرجع قطعي لمقارنة تطابق الملف الجيني STR",
        "EstCorrecte": true
      },
      {
        "OptionId": 1353,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "قطعة من حذاء الضحية المتسخ بالتراب",
        "EstCorrecte": false
      },
      {
        "OptionId": 1354,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "شهادة ميلاد ورقية مصادق عليها من البلدية",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 136,
    "Code": "Q-SCI-010",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الشرطة التقنية والعلمية والطب الشرعي",
    "Enonce": "ما هو الفرق الجنائي بين الكدمة (Ecchymose) والجرح القطعي (Plaie incisée) في تقرير الطبيب الشرعي؟",
    "ContexteSituationnel": "معاينة آثار عنف على جسد ضحية اعتداء جسدي.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "MOYEN",
    "Points": 1,
    "TempsLimiteSecondes": 80,
    "SpecialitesAssociees": [
      "SPEC-SCIENTIFIQUE",
      "SPEC-PJ"
    ],
    "CompetencesAssociees": [
      "الطب الشرعي الرضوضي",
      "توصيف الإصابات"
    ],
    "Explication": "الكدمة ناتجة عن جسم راضٍ غير حاد يحدث انصباباً دموياً تحت الجلد دون تمزق البشرة، بينما الجرح القطعي ناتج عن نصل حاد يمزق الأنسجة بحواف منتظمة.",
    "Options": [
      {
        "OptionId": 1361,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "الكدمة تحدث بسبب البرد والجرح يحدث بسبب الحرارة فقط",
        "EstCorrecte": false
      },
      {
        "OptionId": 1362,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "الكدمة ارتشاح دموي تحت الجلد ناجم عن اصطدام بأداة راضة كليلة، والجرح القطعي تمزق جلدي بحواف حادة ناتج عن نصل قاطع",
        "EstCorrecte": true
      },
      {
        "OptionId": 1363,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "لا فرق بينهما فكلاهما يعني كسر العظام",
        "EstCorrecte": false
      },
      {
        "OptionId": 1364,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "الكدمة تكون حمراء دائماً ولا يتغير لونها إطلاقاً مع مرور الأيام",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 137,
    "Code": "Q-SCI-011",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الشرطة التقنية والعلمية والطب الشرعي",
    "Enonce": "كيف يتم رفع آثار الأقدام والإطارات المنطبعة في التربة الرطبة أو الرمال دون إتلاف معالمها؟",
    "ContexteSituationnel": "آثار إطارات سيارة استعملها مهربون في مسلك ترابي غابوي.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-SCIENTIFIQUE"
    ],
    "CompetencesAssociees": [
      "قولبة الآثار الجنائية",
      "الجبس السريع"
    ],
    "Explication": "التصوير الفوتوغرافي العمودي الدقيق مع مسطرة قياس، رش مثبت خفيف، ثم صب الجبس المخصص (Plâtre dentaire / Staff) لصنع قالب ثلاثي الأبعاد.",
    "Options": [
      {
        "OptionId": 1371,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "المشي فوق الأثر بالأحذية العسكرية للتأكد من عمقه",
        "EstCorrecte": false
      },
      {
        "OptionId": 1372,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "التصوير العمودي مع مقياس متري، تثبيت التربة برذاذ واقٍ، وصب قالب الجبس الخاص لاستخراج نموذج متطابق بدقة للسطح",
        "EstCorrecte": true
      },
      {
        "OptionId": 1373,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "غمر الأثر بالماء الجاري لغسله من الأتربة",
        "EstCorrecte": false
      },
      {
        "OptionId": 1374,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "حفر حفرة كبيرة حول الأثر واقتلاعه بشجرة",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 138,
    "Code": "Q-SCI-012",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الشرطة التقنية والعلمية والطب الشرعي",
    "Enonce": "ما هي تقنية التبخير بـ \"السيانوأكريلات\" (Fumigation au Cyanoacrylate / Superglue) في كشف البصمات؟",
    "ContexteSituationnel": "إظهار بصمات أصابع خفية على زجاجة خمر أو سكين بمقبض بلاستيكي أملس.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "AVANCE",
    "Points": 2,
    "TempsLimiteSecondes": 85,
    "SpecialitesAssociees": [
      "SPEC-SCIENTIFIQUE"
    ],
    "CompetencesAssociees": [
      "كشف البصمات بالمختبر",
      "تقنية السيانوأكريلات"
    ],
    "Explication": "تسخين غراء السيانوأكريلات في غرفة محكمة الرطوبة لتتفاعل أبخرته مع بقايا العرق وتشكل بلمرة بيضاء صلبة ودائمة على خطوط البصمة.",
    "Options": [
      {
        "OptionId": 1381,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "لصق الأداة بقطعة خشبية لمنع اهتزازها",
        "EstCorrecte": false
      },
      {
        "OptionId": 1382,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تسخين المادة في غرفة كشف مغلقة لتتفاعل الأبخرة مع الآثار الدهنية وتتبلمر على شكل خطوط بيضاء ناصعة وثابتة",
        "EstCorrecte": true
      },
      {
        "OptionId": 1383,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إذابة السكين بالحمض لمعرفة نوع المعدن",
        "EstCorrecte": false
      },
      {
        "OptionId": 1384,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "صب الغراء السائل مباشرة على كامل الأداة بفرشاة طلاء",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 139,
    "Code": "Q-SCI-013",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الشرطة التقنية والعلمية والطب الشرعي",
    "Enonce": "ما هي الحشرة الرمية ودور علم الحشرات الجنائي (Entomologie médico-légale) في تقدير تاريخ الوفاة القديم؟",
    "ContexteSituationnel": "العثور على جثة متحللة جزئياً في منطقة غابوية مهجورة.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "EXPERT",
    "Points": 2,
    "TempsLimiteSecondes": 90,
    "SpecialitesAssociees": [
      "SPEC-SCIENTIFIQUE"
    ],
    "CompetencesAssociees": [
      "علم الحشرات الجنائي",
      "تحديد زمن الوفاة القديم"
    ],
    "Explication": "دراسة أطوار نمو يرقات وديدان الحشرات المتعاقبة (Escouades de mouches) التي تضع بيوضها بتسلسل بيولوجي محدد بدقة حسب درجات الحرارة.",
    "Options": [
      {
        "OptionId": 1391,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "معرفة فصيلة دم الحشرة لمعرفة فصيلة دم القاتل",
        "EstCorrecte": false
      },
      {
        "OptionId": 1392,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "تحليل دورات حياة وسلالات الحشرات ويرقاتها المتعاقبة على الجثة لحساب المدة الزمنية الفاصلة منذ الوفاة بدقة عالية",
        "EstCorrecte": true
      },
      {
        "OptionId": 1393,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "إبادة جميع الحشرات فوراً بالمبيدات دون فحصها",
        "EstCorrecte": false
      },
      {
        "OptionId": 1394,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "تربية الحشرات كحيوانات أليفة في المختبر",
        "EstCorrecte": false
      }
    ]
  },
  {
    "QuestionId": 140,
    "Code": "Q-SCI-014",
    "DomaineCode": "TECHNIQUE",
    "DomaineIntitule": "الشرطة التقنية والعلمية والطب الشرعي",
    "Enonce": "ما هو المبدأ الجوهري المنسوب للعالم إدموند لوكارد (Principe d'échange de Locard) الذي يشكل أساس كل تحقيق جنائي؟",
    "ContexteSituationnel": "القاعدة الذهبية التي يتدرب عليها كل ضابط شرطة قضائية وعلمية في العالم.",
    "TypeQuestion": "QCM_STANDARD",
    "Difficulte": "FACILE",
    "Points": 1,
    "TempsLimiteSecondes": 70,
    "SpecialitesAssociees": [
      "SPEC-SCIENTIFIQUE",
      "SPEC-PJ"
    ],
    "CompetencesAssociees": [
      "مبدأ لوكارد للتبادل",
      "فلسفة الأدلة الجنائية"
    ],
    "Explication": "\"كل اتصال يترك أثراً\" (Every contact leaves a trace)؛ أي مجرم يدخل مسرح الجريمة يترك أثراً من ذاته ويأخذ معه أثراً من المكان حتماً.",
    "Options": [
      {
        "OptionId": 1401,
        "LettreOption": "A",
        "LettreArabe": "أ",
        "EnonceOption": "\"الجريمة دائماً تدفع المال لأصحابها\"",
        "EstCorrecte": false
      },
      {
        "OptionId": 1402,
        "LettreOption": "B",
        "LettreArabe": "ب",
        "EnonceOption": "\"كل تلامس يترك أثراً\": لا يمكن للجاني أن يرتكب فعلاً دون أن يترك آثاراً وراءه ويأخذ معه جزئيات من مسرح الحادث",
        "EstCorrecte": true
      },
      {
        "OptionId": 1403,
        "LettreOption": "C",
        "LettreArabe": "ج",
        "EnonceOption": "\"الأدلة المادية تكذب دائماً والشهود لا يكذبون أبداً\"",
        "EstCorrecte": false
      },
      {
        "OptionId": 1404,
        "LettreOption": "D",
        "LettreArabe": "د",
        "EnonceOption": "\"يجب غسل مسرح الجريمة بالماء قبل بدء التحقيق\"",
        "EstCorrecte": false
      }
    ]
  }
];

export default questionsBankArabic;
