-- ==============================================================================
-- ORIENT-GR : SEED OFFICIEL DE LA BANQUE DES 140 QUESTIONS EN ARABE
-- Compatible SQL Server 2016+ / Azure SQL Database
-- ==============================================================================

USE [OrientGR_DB];
GO

SET NOCOUNT ON;
BEGIN TRANSACTION;

BEGIN TRY
    -- 1. S'assurer qu'au moins un Test parent existe pour rattacher la banque
    IF NOT EXISTS (SELECT 1 FROM dbo.Tests WHERE Code = 'TEST-BATTERIE-140')
    BEGIN
        INSERT INTO dbo.Tests (
            Code, Titre, Description, DureeMinutes, NombreQuestions,
            CategoriesIncluses, DifficulteCible, AutoriserRetour, AutoriserPause,
            AutoriserReprise, NombreTentativesMax, SeuilReussite, SelectionAleatoire,
            SeedReproductible, Version, EstActif
        )
        VALUES (
            'TEST-BATTERIE-140',
            N'اختبار التوجيه المهني الموحد للدرك الملكي (140 سؤال)',
            N'بنك الأسئلة الموحد والشامل لكافة تخصصات الدرك الملكي (140 سؤالاً في 10 مجالات رئيسية)',
            45, 140,
            '["LOGIQUE", "OBSERVATION", "ATTENTION", "DECISION", "ROUTE_MOTO", "PJ_ENQUETE", "INFORMATIQUE", "COMMUNICATION", "SECRETARIAT", "DISCIPLINE"]',
            'TOUS', 1, 1, 1, 3, 60.0, 1, 1, 1, 1
        );
        PRINT '[OK] Test TEST-BATTERIE-140 inséré avec succès.';
    END

    DECLARE @TestId INT = (SELECT TOP 1 TestId FROM dbo.Tests WHERE Code = 'TEST-BATTERIE-140');
    IF @TestId IS NULL SET @TestId = 1;

    PRINT 'Test ID de rattachement: ' + CAST(@TestId AS VARCHAR(10));

    -- 2. Désactiver temporairement les contraintes pour un chargement propre
    -- Suppression préalable des 140 questions cibles si déjà présentes pour ré-exécution idempotente
    DELETE FROM dbo.OptionsReponse WHERE QuestionId IN (SELECT QuestionId FROM dbo.Questions WHERE Code LIKE 'Q-%' AND QuestionId BETWEEN 1 AND 140);
    DELETE FROM dbo.Questions WHERE QuestionId BETWEEN 1 AND 140;

    -- Activation de l'insertion explicite d'identifiants
    SET IDENTITY_INSERT dbo.Questions ON;

    -- Question 1: Q-LOG-001 (الاستدلال المنطقي)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        1,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'LOGIQUE'),
        N'Q-LOG-001',
        N'إذا كانت جميع دوريات التدخل السريع مجهزة بنظام الاتصال المشفر، وبعض سيارات الدرك الملكي تابعة لفرق التدخل السريع، فما هو الاستنتاج المنطقي الحتمي الصائب؟',
        N'الاستدلال المنطقي',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1,
        90,
        N'بما أن كل دوريات التدخل مجهزة بنظام مشفر، والبعض من سيارات الدرك ينتمي لهذا الصنف، فإن بعض سيارات الدرك على الأقل مجهزة بنظام الاتصال المشفر بالضرورة المنطقية.',
        N'["الاستدلال الاستنباطي","التحليل المنطقي الصارم"]',
        N'["SPEC-PJ","SPEC-INFO","SPEC-PSIG"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":1.5},{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":2},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":1.5}]',
        1,
        1, 0, 1
    );

    -- Question 2: Q-LOG-002 (الاستدلال المنطقي)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        2,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'LOGIQUE'),
        N'Q-LOG-002',
        N'في سلسلة التوقيت العملياتي التالية للدوريات: (06:00 ، 06:45 ، 07:45 ، 09:00 ، ...)، ما هو توقيت انطلاق الدورية الموالية وفق النمط الزمني المضطرد؟',
        N'الاستدلال المنطقي',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1,
        90,
        N'الفوارق الزمنية تتصاعد بمقدار 15 دقيقة في كل خطوة: (+45 دقيقة، ثم +60 دقيقة، ثم +75 دقيقة). الفارق التالي هو +90 دقيقة (ساعة ونصف)، و09:00 + 1h30 = 10:30.',
        N'["الاستدلال التتابعي","الحساب الذهني العملياتي"]',
        N'["SPEC-MOTARD","SPEC-SEC-ADMIN"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":1.5},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":1.5}]',
        2,
        1, 0, 1
    );

    -- Question 3: Q-LOG-003 (الاستدلال المنطقي)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        3,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'LOGIQUE'),
        N'Q-LOG-003',
        N'إذا كان الضابط (أ) أقدم رتبة من الرقيب (ب)، والرقيب (ج) أحدث رتبة من الرقيب (ب)، والمساعد (د) أقدم رتبة من الضابط (أ)، فمن هو صاحب الرتبة الأدنى بين الأربعة؟',
        N'الاستدلال المنطقي',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'الترتيب التنازلي للأقدمية: المساعد (د) > الضابط (أ) > الرقيب (ب) > الرقيب (ج). إذن الرقيب (ج) هو الأحدث رتبة أي صاحب الرتبة الأدنى في المجموعة.',
        N'["الترتيب الهرمي","الاستنتاج المباشر"]',
        N'["SPEC-SEC-ADMIN","SPEC-INSTRUCTEUR"]',
        N'[{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":2},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":1.5}]',
        3,
        1, 0, 1
    );

    -- Question 4: Q-LOG-004 (الاستدلال المنطقي)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        4,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'LOGIQUE'),
        N'Q-LOG-004',
        N'خمسة عناصر درك (س، ع، ص، ق، ر) في طابور تفتيش. العنصر (ص) ليس الأول ولا الأخير. العنصر (س) يسبق (ع) مباشرة. العنصر (ر) في المركز الأخير. إذا كان (ص) يسبق (س)، فمن يقف أولاً؟',
        N'الاستدلال المنطقي',
        'QCM_UNIQUE',
        N'AVANCE',
        N'صعب',
        2,
        2,
        90,
        N'العنصر (ر) في المركز الخامس والأخير. ترتيب (ص يسبق س يسبق ع) يأخذ 3 مراكز متتالية. بما أن (ص) ليس الأول ولا الأخير، فمكانه هو الثاني، يليه (س) ثالثاً، ثم (ع) رابعاً، و(ر) خامساً. إذن المركز الأول حتماً هو للعنصر (ق).',
        N'["حل المشكلات المنطقية المركبة","الترتيب المكاني"]',
        N'["SPEC-PJ","SPEC-GSI"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2},{"code":"SPEC-GSI","specialite":"GSI","poids":1.5}]',
        4,
        1, 0, 1
    );

    -- Question 5: Q-LOG-005 (الاستدلال المنطقي)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        5,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'LOGIQUE'),
        N'Q-LOG-005',
        N'إذا كانت العبارة الشرطية التالية صحيحة: "إذا تم تفعيل خطة الطوارئ (أ)، يتم وجوباً إغلاق المعبر الحدودي (ب)". فما هي العبارة المعاكسة إيجابياً (Contraposée) التي تعتبر صحيحة حتماً؟',
        N'الاستدلال المنطقي',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        2,
        1.5,
        90,
        N'قاعدة المنطق الصوري: العبارة (إذا تحقق أ فإن ب يتحقق) تكافئ منطقياً (إذا لم يتحقق ب، فإنه حتماً لم يتم تفعيل أ).',
        N'["المنطق الرياضي والرمزي","التحليل الاستدلالي"]',
        N'["SPEC-PJ","SPEC-INFO"]',
        N'[{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":2},{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":1.5}]',
        5,
        1, 0, 1
    );

    -- Question 6: Q-LOG-006 (الاستدلال المنطقي)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        6,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'LOGIQUE'),
        N'Q-LOG-006',
        N'سلسلة أعداد تمثل تشفير الاتصالات التكتيكية: (2 ، 6 ، 18 ، 54 ، ...). ما هو العدد التالي في السلسلة؟',
        N'الاستدلال المنطقي',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'المتتالية تضاعفية بضرب كل حد في العدد 3 (2×3=6 ، 6×3=18 ، 18×3=54). الحد التالي هو 54 × 3 = 162.',
        N'["المتتاليات الحسابية","الاستدلال العددي السريع"]',
        N'["SPEC-INFO","SPEC-PJ"]',
        N'[{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":2},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":1}]',
        6,
        1, 0, 1
    );

    -- Question 7: Q-LOG-007 (الاستدلال المنطقي)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        7,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'LOGIQUE'),
        N'Q-LOG-007',
        N'في مستودع للأسلحة، كل البنادق الآلية مرقمة، وبعض الأسلحة المرقمة مصنوعة من سبائك التيتانيوم. ما النتيجة المنطقية التي لا يمكن دحضها؟',
        N'الاستدلال المنطقي',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1,
        90,
        N'لا يمكن الجزم بأن كل البنادق من التيتانيوم ولا بأن التيتانيوم للبنادق فقط، لكن الثابت يقيناً هو أن بعض الأسلحة في المستودع مرقمة.',
        N'["الاستقراء المنطقي","نفي المغالطات الصورية"]',
        N'["SPEC-PJ","SPEC-PSIG"]',
        N'[{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":1.5},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":1.5}]',
        7,
        1, 0, 1
    );

    -- Question 8: Q-LOG-008 (الاستدلال المنطقي)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        8,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'LOGIQUE'),
        N'Q-LOG-008',
        N'تستغرق سيارة الدرك ساعة و20 دقيقة لقطع مسافة بسرعة 90 كم/س. كم ستستغرق نفس السيارة لقطع ذات المسافة إذا رفعت سرعتها إلى 120 كم/س؟',
        N'الاستدلال المنطقي',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        2,
        1.5,
        90,
        N'ساعة و20 دقيقة = 4/3 ساعة. المسافة = 90 × (4/3) = 120 كم. بالسرعة الجديدة 120 كم/س: الزمن = المسافة / السرعة = 120 / 120 = ساعة واحدة تماماً (60 دقيقة).',
        N'["التناسب العكسي","الحساب التقديري العملياتي"]',
        N'["SPEC-MOTARD","SPEC-PSIG"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":1.5}]',
        8,
        1, 0, 1
    );

    -- Question 9: Q-LOG-009 (الاستدلال المنطقي)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        9,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'LOGIQUE'),
        N'Q-LOG-009',
        N'إذا كانت الإشارة اللاسلكية الخضراء تعني "تقدم"، والصفراء تعني "استعد"، والحمراء تعني "توقف". إذا ألغي اللون الأصفر واستعيض عنه بوميض أخضر متقطع، فما هو التفسير المنطقي لوميض أخضر متقطع؟',
        N'الاستدلال المنطقي',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'الاستبدال المنطقي المباشر: الوميض الأخضر أخذ دلالة اللون الأصفر الملغى، وبالتالي فدلالته الحتمية هي "استعد".',
        N'["تأويل الإشارات الميدانية","الترميز العملياتي"]',
        N'["SPEC-GEH","SPEC-MOTARD"]',
        N'[{"code":"SPEC-GEH","specialite":"GEH","poids":1.5},{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":1.5}]',
        9,
        1, 0, 1
    );

    -- Question 10: Q-LOG-010 (الاستدلال المنطقي)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        10,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'LOGIQUE'),
        N'Q-LOG-010',
        N'متتالية أشكال هندسية في شاشات الرادار: (مثلث: 3 زوايا ، مربع: 4 زوايا ، مخمس: 5 زوايا ، مسدس: 6 زوايا). إذا كان الشكل التالي يزيد في عدد الأقطار وليس الزوايا فقط، فما هو عدد أضلاع الشكل التالي؟',
        N'الاستدلال المنطقي',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'النمط يتبع بانتظام تسلسل المضلعات المنتظمة بإضافة ضلع واحد في كل خطوة (3، 4، 5، 6)، فالشكل الموالي هو المسبع ذو 7 أضلاع.',
        N'["الاستدلال الهندسي","التعرف على الأنماط"]',
        N'["SPEC-INFO","SPEC-INSTRUCTEUR"]',
        N'[{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":1.5},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":1}]',
        10,
        1, 0, 1
    );

    -- Question 11: Q-LOG-011 (الاستدلال المنطقي)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        11,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'LOGIQUE'),
        N'Q-LOG-011',
        N'ثلاثة حراس (علي، حسن، عمر). أحدهم صادق دائماً، والآخر كاذب دائماً، والثالث يصدق أحياناً. قال علي: "حسن كاذب". وقال حسن: "عمر كاذب". وقال عمر: "علي وحسن كاذبان معاً". من هو الصادق دائماً من بينهم؟',
        N'الاستدلال المنطقي',
        'QCM_UNIQUE',
        N'AVANCE',
        N'صعب',
        2,
        2,
        90,
        N'لو كان عمر صادقاً لكان علي وحسن كاذبين، لكن قول حسن "عمر كاذب" سيكون صادقاً وهذا تناقض. إذن عمر كاذب. بالتالي قول حسن "عمر كاذب" صحيح، فحسن هو الصادق وعلي هو المتذبذب.',
        N'["مفارقات الصدق والكذب","التحليل الاستدلالي المتقدم"]',
        N'["SPEC-PJ","SPEC-PJ"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2.5},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":2}]',
        11,
        1, 0, 1
    );

    -- Question 12: Q-LOG-012 (الاستدلال المنطقي)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        12,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'LOGIQUE'),
        N'Q-LOG-012',
        N'متتالية أرقام مشفرة لمجموعات الدوريات: (100 ، 95 ، 85 ، 70 ، 50 ، ...). ما هو الرقم الآتي في المتتالية؟',
        N'الاستدلال المنطقي',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1,
        90,
        N'الفروق تتناقص بتصاعد: (-5 ، -10 ، -15 ، -20). الفارق التالي هو -25. إذن: 50 - 25 = 25.',
        N'["الاستنتاج الرياضي","التحليل المتسلسل"]',
        N'["SPEC-INFO","SPEC-SEC-ADMIN"]',
        N'[{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":1.5},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":1}]',
        12,
        1, 0, 1
    );

    -- Question 13: Q-LOG-013 (الاستدلال المنطقي)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        13,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'LOGIQUE'),
        N'Q-LOG-013',
        N'إذا كانت جميع المعدات العسكرية الثقيلة تخضع للصيانة الشهرية، وجميع الآليات الخاضعة للصيانة الشهرية تسجل في الدفتر الرسمي، فما هي النتيجة المنطقية المؤكدة؟',
        N'الاستدلال المنطقي',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'قياس منطقي قاطع من الدرجة الأولى (معدات ثقيلة -> صيانة شهرية -> تسجيل بالدفتر). النتيجة: جميع المعدات الثقيلة تسجل في الدفتر الرسمي حتماً.',
        N'["القياس المنطقي التام","قواعد الاستنتاج"]',
        N'["SPEC-SEC-ADMIN","SPEC-PJ"]',
        N'[{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":1.5},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":1.5}]',
        13,
        1, 0, 1
    );

    -- Question 14: Q-LOG-014 (الاستدلال المنطقي)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        14,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'LOGIQUE'),
        N'Q-LOG-014',
        N'خزان وقود بقاعدة عسكرية يفرغ بمعدل ثابت كل 4 ساعات بمقدار الثلث. إذا كان ممتلئاً بالكامل الساعة 08:00 صباحاً، فكم سيتبقى منه في الساعة 16:00 من نفس اليوم؟',
        N'الاستدلال المنطقي',
        'QCM_UNIQUE',
        N'AVANCE',
        N'صعب',
        2,
        2,
        90,
        N'بين 08:00 و16:00 تمر 8 ساعات (فترتان من 4 ساعات). في الفترة الأولى ينقص الثلث ويتبقى 2/3. في الفترة الثانية ينقص ثلث المتبقي: (2/3) - (1/3 × 2/3) = (2/3) × (2/3) = 4/9.',
        N'["الحساب التراكمي النسبي","التفكير الاستراتيجي في الإمداد"]',
        N'["SPEC-PSIG","SPEC-SEC-ADMIN"]',
        N'[{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":1.5},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":1.5}]',
        14,
        1, 0, 1
    );

    -- Question 15: Q-LOG-015 (الاستدلال المنطقي)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        15,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'LOGIQUE'),
        N'Q-LOG-015',
        N'إذا كانت كلمة "درك" تشفر رقمياً بالرمز (4-10-20)، وكلمة "أمن" تشفر بالرمز (1-24-25)، فما المبدأ الرياضي المعتمد في توليد هذا التشفير التكتيكي البسيط؟',
        N'الاستدلال المنطقي',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        2,
        1.5,
        90,
        N'استبدال كل حرف أبجدي برقمه التسلسلي المباشر في جدول الأبجدية المتفق عليه كنظام مصفوفة إبدال ثابتة.',
        N'["التشفير التناظري","الاستدلال الاستدلالي الرمزي"]',
        N'["SPEC-INFO","SPEC-PJ"]',
        N'[{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":2},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":1.5}]',
        15,
        1, 0, 1
    );

    -- Question 16: Q-LOG-016 (الاستدلال المنطقي)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        16,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'LOGIQUE'),
        N'Q-LOG-016',
        N'أربعة صناديق ذخيرة مغلقة تحمل ملصقات خاطئة جميعها: [رصاص 9 مم]، [رصاص 7.62 مم]، [مختلط]. إذا سمح لك بفتح صندوق واحد فقط وأخذ طلقة واحدة منه لمعرفة محتويات جميع الصناديق، فأي صندوق تختار فتحه؟',
        N'الاستدلال المنطقي',
        'QCM_UNIQUE',
        N'AVANCE',
        N'صعب',
        2,
        2,
        90,
        N'تختار الصندوق الموسوم بـ [مختلط]. بما أن ملصقه خاطئ حتماً، فالطلقة التي تسحبها تحدد نوعه بيقين (إما 9 مم فقط أو 7.62 مم فقط)، وبالتالي ينكشف محتوى الصندوقين الآخرين بالإقصاء المباشر.',
        N'["الاستدلال الاستنباطي الإقصائي","المنطق الرياضي للمعلومة الناقصة"]',
        N'["SPEC-PJ","SPEC-GSI"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2},{"code":"SPEC-GSI","specialite":"GSI","poids":1.5}]',
        16,
        1, 0, 1
    );

    -- Question 17: Q-LOG-017 (الاستدلال المنطقي)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        17,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'LOGIQUE'),
        N'Q-LOG-017',
        N'إذا علمت أن "كل حراس الشخصيات يتقنون الرماية الدقيقة"، و"بعض المظليين هم حراس شخصيات"، فما هي النتيجة الحتمية؟',
        N'الاستدلال المنطقي',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'تقاطع مجموعة المظليين مع مجموعة حراس الشخصيات يعني حتماً أن العناصر المشتركة تتقن الرماية الدقيقة، إذن: بعض المظليين يتقنون الرماية الدقيقة.',
        N'["المنطق الأرسطي","العلاقات بين المجموعات"]',
        N'["SPEC-GEH","SPEC-GSI"]',
        N'[{"code":"SPEC-GEH","specialite":"GEH","poids":2},{"code":"SPEC-GSI","specialite":"GSI","poids":1.5}]',
        17,
        1, 0, 1
    );

    -- Question 18: Q-LOG-018 (الاستدلال المنطقي)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        18,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'LOGIQUE'),
        N'Q-LOG-018',
        N'متتالية أحرف تكتيكية: (أ ، ج ، هـ ، ز ، ...). ما هو الحرف العربي الآتي في النمط؟',
        N'الاستدلال المنطقي',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'النمط يتجاوز حرفاً واحداً في كل خطوة في الترتيب الأبجدي الهجائي: (أ [ب] ج [د] هـ [و] ز [ح] ط). إذن الحرف التالي هو "ط".',
        N'["المتتاليات الحرفية","التركيز على التسلسل الأبجدي"]',
        N'["SPEC-SEC-ADMIN","SPEC-INFO"]',
        N'[{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":1.5},{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":1}]',
        18,
        1, 0, 1
    );

    -- Question 19: Q-LOG-019 (الاستدلال المنطقي)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        19,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'LOGIQUE'),
        N'Q-LOG-019',
        N'إذا كانت بطارية جهاز الإرسال اللاسلكي تنفد بنسبة 15% كل ساعتين في وضع الاستعداد، وبنسبة 40% كل ساعتين في وضع البث المستمر. إذا بقي الجهاز 4 ساعات في الاستعداد ثم ساعتين في البث، فما النسبة المتبقية من الشحن؟',
        N'الاستدلال المنطقي',
        'QCM_UNIQUE',
        N'AVANCE',
        N'صعب',
        2,
        2,
        90,
        N'الاستعداد: 4 ساعات = فترتان من ساعتين = 2 × 15% = 30%. البث: ساعتان = 40%. إجمالي الاستهلاك = 30% + 40% = 70%. النسبة المتبقية من 100% = 30%.',
        N'["الحساب العملياتي للطاقة","التخطيط اللوجستي"]',
        N'["SPEC-INFO","SPEC-PSIG"]',
        N'[{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":2},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":1.5}]',
        19,
        1, 0, 1
    );

    -- Question 20: Q-LOG-020 (الاستدلال المنطقي)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        20,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'LOGIQUE'),
        N'Q-LOG-020',
        N'في قضية سرقة، ثبت أن: "السارق لا يمكن أن يدخل إلا إذا كان يحمل المفتاح الرئيسي أو كسر النافذة". وتبين بالمعاينة أن النافذة سليمة تماماً ولم تكسر. ما الاستنتاج القضائي المنطقي القطعي؟',
        N'الاستدلال المنطقي',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'قاعدة الفصل المنطقي (Modus Tollendo Ponens): إما أ أو ب. بما أن ب غير محقق يقيناً (النافذة لم تكسر)، فإن أ محقق حتماً، أي أن السارق كان يحوز المفتاح الرئيسي.',
        N'["الاستدلال القضائي المباشر","إقصاء الفرضيات"]',
        N'["SPEC-PJ","SPEC-PJ"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2.5},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":2}]',
        20,
        1, 0, 1
    );

    -- Question 21: Q-OBS-021 (التحليل والملاحظة)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        21,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'OBSERVATION'),
        N'Q-OBS-021',
        N'أثناء معاينة مسرح حادث سير، لاحظ المحقق آثار فرملة متقطعة ومنتظمة على الإسفلت قبل نقطة الاصطدام بـ 15 متراً. إلى ماذا يشير هذا النمط المحدد من الآثار؟',
        N'التحليل والملاحظة',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'الآثار المتقطعة والمنتظمة لفرامل المركبة تعكس عمل نظام منع انغلاق المكابح (ABS) الذي يضغط ويحرر المكابح آلياً بسرعة عالية لتفادي انزلاق العجلات.',
        N'["الملاحظة الدقيقة للأدلة الميدانية","التحليل السببي لحوادث السير"]',
        N'["SPEC-MOTARD","SPEC-PJ"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2.5},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":1.5}]',
        21,
        1, 0, 1
    );

    -- Question 22: Q-OBS-022 (التحليل والملاحظة)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        22,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'OBSERVATION'),
        N'Q-OBS-022',
        N'عند تفحص رخصة سياقة إلكترونية أثناء مراقبة ليلية بواسطة مصباح الأشعة فوق البنفسجية (UV)، ما هي العلامة الدالة الفورية على أن الوثيقة مشبوهة أو مقلدة؟',
        N'التحليل والملاحظة',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'الوثائق الرسمية تحتوي على أحبار أمنية تتوهج تحت الأشعة فوق البنفسجية وتصميم ميكروغرافي دقيق؛ غياب التوهج الفوسفوري المميز يدل على التزوير المادي.',
        N'["كشف التزييف","التدقيق الوثائقي"]',
        N'["SPEC-PJ","SPEC-MOTARD","SPEC-PJ"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2},{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":1.5},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":1}]',
        22,
        1, 0, 1
    );

    -- Question 23: Q-OBS-023 (التحليل والملاحظة)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        23,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'OBSERVATION'),
        N'Q-OBS-023',
        N'في رسم بياني تصادمي، انحرفت السيارة (أ) بزاوية 45 درجة نحو اليمين بعد اصطدام جانبي مع شاحنة (ب) التي أكملت مسارها المستقيم دون أي انحراف. ما الاستنتاج الفيزيائي والملاحظاتي المباشر؟',
        N'التحليل والملاحظة',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1,
        90,
        N'وفق قوانين الديناميكا وكمية الحركة، الكتلة الأكبر للشاحنة وعزم اندفاعها المستمر جعلا طاقتها الحركية تمتص الاصطدام بينما فرضت انحرافاً كبيراً على السيارة الأخف وزناً.',
        N'["قراءة المخططات الميدانية","التحليل الميكانيكي للحوادث"]',
        N'["SPEC-MOTARD","SPEC-PJ"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":1.5}]',
        23,
        1, 0, 1
    );

    -- Question 24: Q-OBS-024 (التحليل والملاحظة)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        24,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'OBSERVATION'),
        N'Q-OBS-024',
        N'خلال مراقبة محيط منشأة حيوية، أي من السلوكيات التالية يعتبر مؤشراً يقظاً يستدعي الاشتباه والتدقيق الأمني المباشر؟',
        N'التحليل والملاحظة',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'التوقف المتكرر في زوايا الرؤية الميتة وتدوين مواقع الكاميرات هو نمط استطلاع ورصد تحضيري للأعمال العدائية، وهو مؤشر تهديد يستوجب الفحص الفوري.',
        N'["اليقظة الميدانية","الملاحظة الاستباقية"]',
        N'["SPEC-GEH","SPEC-GSI","SPEC-PSIG"]',
        N'[{"code":"SPEC-GEH","specialite":"GEH","poids":2},{"code":"SPEC-GSI","specialite":"GSI","poids":2},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":1.5}]',
        24,
        1, 0, 1
    );

    -- Question 25: Q-OBS-025 (التحليل والملاحظة)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        25,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'OBSERVATION'),
        N'Q-OBS-025',
        N'عند فحص صفيحة ترقيم شاحنة نقل دولي، لاحظ الدركي وجود مسامير تثبيت (Rivets) حديثة جداً تختلف عن بقية أجزاء الصفيحة المتقادمة مع أثر طلاء حديث حول الحواف. ما التفسير الأمني الأقرب؟',
        N'التحليل والملاحظة',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'استبدال مسامير التثبيت الحديثة على صفيحة متآكلة مع وجود طلاء حديث يدل على احتمال قوي لاستبدال الصفيحة مؤخراً لتضليل أجهزة التتبع أو إخفاء هوية المركبة (مركبة مجهولة/مزورة).',
        N'["ملاحظة التفاصيل الدقيقة","مكافحة تهريب وتزوير المركبات"]',
        N'["SPEC-PJ","SPEC-MOTARD"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2},{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2}]',
        25,
        1, 0, 1
    );

    -- Question 26: Q-OBS-026 (التحليل والملاحظة)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        26,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'OBSERVATION'),
        N'Q-OBS-026',
        N'في شريط فيديو لكاميرا مراقبة يوثق عملية سطو، أظهرت الساعة الرقمية المسجلة بالفيديو التوقيت 23:45:10، بينما ساعة الحائط المعلقة في الغرفة كانت تشير إلى 23:30:00 ومؤشر الثواني يتحرك بانتظام. ما الذي يجب على المحقق ملاحظته وتدوينه فوراً؟',
        N'التحليل والملاحظة',
        'QCM_UNIQUE',
        N'DIFFICILE',
        N'صعب',
        2,
        1.5,
        90,
        N'يجب رصد وتوثيق فارق التوقيت (Offset) بين جهاز التسجيل الرقمي (DVR) والتوقيت الحقيقي المعياري لتصحيح التسلسل الزمني للأحداث وضمان صحة الحجية القضائية.',
        N'["التحليل الزمني الجنائي","توثيق الأدلة الرقمية"]',
        N'["SPEC-PJ","SPEC-INFO","SPEC-PJ"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2.5},{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":1.5},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":1.5}]',
        26,
        1, 0, 1
    );

    -- Question 27: Q-OBS-027 (التحليل والملاحظة)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        27,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'OBSERVATION'),
        N'Q-OBS-027',
        N'أثناء تفتيش نظامي لمركبة مشبوهة، لاحظ الدركي أن الصوت الصادر عن النقر الخفيف على الباب الأيمن مكتوم وثقيل جداً مقارنة بالرنين المجوف الطبيعي للباب الأيسر. ما الاستنتاج العملياتي الأبرز؟',
        N'التحليل والملاحظة',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'الصوت المكتوم يدل على وجود مادة أو تجويف محشو داخل هيكل الباب (مثل مخبأ مهيأ للممنوعات أو الأسلحة)، مما يفرض فحصاً دقيقاً ومباشراً للبطانة الداخلية.',
        N'["التفتيش الوقائي الفطن","التمييز الحسي السمعي"]',
        N'["SPEC-PJ","SPEC-GSI","SPEC-MOTARD"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2},{"code":"SPEC-GSI","specialite":"GSI","poids":1.5},{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":1.5}]',
        27,
        1, 0, 1
    );

    -- Question 28: Q-OBS-028 (التحليل والملاحظة)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        28,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'OBSERVATION'),
        N'Q-OBS-028',
        N'صرح الشاهد الأول: "رأيت شاحنة حمراء مسرعة تجاوزت الإشارة الحمراء عند الساعة 14:00". بينما صرح الشاهد الثاني في نفس المكان: "سمعت صوت فرملة حادة في حدود الثانية بعد الزوال ونظرت فرأيت شاحنة زرقاء تصطدم بسيارة". ما العنصر المشترك المؤكد بين الشهادتين قبل إجراء التحريات المعمقة؟',
        N'التحليل والملاحظة',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'العنصر المتطابق يقيناً بين الشاهدين هو التوقيت (حوالي الساعة 14:00) ونوع المركبة الكبيرة (شاحنة)، بينما لون الشاحنة وتفاصيل الفعل تباينت وتتطلب دليلاً مادياً فاصلاً.',
        N'["مقارنة الشهادات","استخلاص الحقائق المشتركة"]',
        N'["SPEC-PJ","SPEC-PJ"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2.5},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":1.5}]',
        28,
        1, 0, 1
    );

    -- Question 29: Q-OBS-029 (التحليل والملاحظة)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        29,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'OBSERVATION'),
        N'Q-OBS-029',
        N'عند معاينة نافذة زجاجية مكسورة بمقذوف في مسرح جريمة، لوحظ أن الفوهة المخروطية المتسعة (Cratère) لثقب الزجاج تقع في الواجهة الداخلية للغرفة والفتحة الضيقة في الواجهة الخارجية. من أي اتجاه تم إطلاق المقذوف؟',
        N'التحليل والملاحظة',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'في الفيزياء الجنائية لكسور الزجاج، الفوهة المخروطية تتسع دائماً في اتجاه خروج المقذوف (جهة الاندفاع)، مما يعني أن المقذوف اخترق الزجاج من الخارج نحو الداخل.',
        N'["البالستيك والمقذوفات الجنائية","التحليل المادي لكسور الزجاج"]',
        N'["SPEC-PJ","SPEC-GSI"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2.5},{"code":"SPEC-GSI","specialite":"GSI","poids":1.5}]',
        29,
        1, 0, 1
    );

    -- Question 30: Q-OBS-030 (التحليل والملاحظة)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        30,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'OBSERVATION'),
        N'Q-OBS-030',
        N'أثناء توقيف سائق في نقطة مراقبة ليلية، لاحظ الدركي ارتعاشاً لا إرادياً في اليدين، وتجنباً مستمراً للتواصل البصري، وصعوبة في ابتلاع الريق، رغم برودة الطقس وسلامة وثائق السيارة الظاهرة. ما هو التصرف الاحترافي المبني على هذه الملاحظة السلوكية؟',
        N'التحليل والملاحظة',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1,
        90,
        N'هذه العلامات تشير إلى توتر نفسي حاد وخوف شديد غير متناسب مع تفتيش روتيني، مما يوجب رفع مستوى الحذر الأمني وإجراء فحص وتفتيش معمق للسائق والمركبة.',
        N'["ملاحظة لغة الجسد","إدارة المخاطر في التوقيف"]',
        N'["SPEC-MOTARD","SPEC-GSI","SPEC-PSIG"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2},{"code":"SPEC-GSI","specialite":"GSI","poids":1.5},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":1.5}]',
        30,
        1, 0, 1
    );

    -- Question 31: Q-OBS-031 (التحليل والملاحظة)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        31,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'OBSERVATION'),
        N'Q-OBS-031',
        N'في مدار طرقي رئيسي يشهد اختناقاً مرورياً حاداً، لاحظ رئيس دورية الدراجين أن السيارات متوقفة داخل الحلقة الدائرية بينما المنافذ المؤدية للمدار خالية من أي حادث. ما السبب الهيكلي المشاهد للاختناق؟',
        N'التحليل والملاحظة',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1,
        90,
        N'السبب الميداني هو عدم احترام أسبقية المرور لليسار ودخول مركبات إضافية عندما يكون المدار ممتلئاً بالفعل، مما يسبب ما يعرف بـ "القفل الذاتي للمدار" (Deadlock).',
        N'["تحليل حركة السير والجولان","التدبير الميداني للازدحام"]',
        N'["SPEC-MOTARD","SPEC-PSIG"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2.5},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":1}]',
        31,
        1, 0, 1
    );

    -- Question 32: Q-OBS-032 (التحليل والملاحظة)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        32,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'OBSERVATION'),
        N'Q-OBS-032',
        N'عند استلام كيس أحراز قضائية مغلق بالشمع الأحمر، لاحظ كاتب الضبط أن خيط الربط مقطوع تحت الختم وتم لصقه بالغراء الشفاف بدقة متناهية. ما الإجراء الفوري الواجب اتخاذه وفق قواعد التحري والضبط؟',
        N'التحليل والملاحظة',
        'QCM_UNIQUE',
        N'DIFFICILE',
        N'صعب',
        2,
        1.5,
        90,
        N'أي مساس بسلامة الحرز يقطع سلسلة الحيازة القانونية (Chain of Custody). يجب رفض الاستلام الشكلي الفوري، وإنجاز محضر معاينة بالخلل، وإشعار النيابة العامة والقائد التسلسلي فوراً.',
        N'["سلسلة حفظ الأدلة الجنائية","حماية الحجية القانونية للأحراز"]',
        N'["SPEC-PJ","SPEC-PJ","SPEC-SEC-ADMIN"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2.5},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":2},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":1.5}]',
        32,
        1, 0, 1
    );

    -- Question 33: Q-OBS-033 (التحليل والملاحظة)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        33,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'OBSERVATION'),
        N'Q-OBS-033',
        N'أثناء دراسة خريطة طبوغرافية لتطويق فارين في منطقة جبلية وعرة، لاحظ الضابط وادياً جافاً شديد الانحدار يتصل بنقطة عبور معبدة واحدة تفصل بين قريتين. ما الميزة التكتيكية لهذه الملاحظة؟',
        N'التحليل والملاحظة',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'تحديد نقطة الاختناق الإجبارية (Choke Point) في التضاريس يتيح وضع نقطة مراقبة وكمين حاكم بأقل عدد ممكن من القوات وتأمين قطع خط انسحاب الفارين بفعالية.',
        N'["التحليل الطبوغرافي التكتيكي","التخطيط لعمليات الحصار والتطويق"]',
        N'["SPEC-PSIG","SPEC-GSI"]',
        N'[{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2.5},{"code":"SPEC-GSI","specialite":"GSI","poids":2}]',
        33,
        1, 0, 1
    );

    -- Question 34: Q-OBS-034 (التحليل والملاحظة)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        34,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'OBSERVATION'),
        N'Q-OBS-034',
        N'في تتبع آثار أقدام مشتبه به على رمال رطبة، كانت طبعة مقدمة القدم (الأصابع) عميقة جداً وواضحة بينما طبعة الكعب تكاد تكون غير مرئية مع مسافات متباعدة تزيد عن متر بين الخطوات. إلى ماذا تشير هذه الملاحظة الفنية؟',
        N'التحليل والملاحظة',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'عند الجري السريع (العدو)، يرتكز وزن الجسم بالكامل على مقدمة القدم وتتباعد خطوات الساقين، بخلاف المشي الهادئ الذي يترك أثراً متوازناً وعميقاً في الكعب.',
        N'["قص الأثر والتحري الميداني","تحليل الآثار البيولوجية والحركية"]',
        N'["SPEC-PJ","SPEC-PSIG"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2}]',
        34,
        1, 0, 1
    );

    -- Question 35: Q-OBS-035 (التحليل والملاحظة)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        35,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'OBSERVATION'),
        N'Q-OBS-035',
        N'خلال البحث عن سيارة متورطة في جنحة فرار، عممت غرفة القيادة مواصفات: "سيارة رمادية رباعية الدفع". أي من التفاصيل المرصودة التالية يقدم أعلى قيمة تمييزية لتأكيد تحديد المركبة المشبوهة وسط عشرات السيارات الرمادية؟',
        N'التحليل والملاحظة',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'العلامات الفريدة التالفة أو المعدلة (مثل كسر محدد بالمرآة الجانبية أو ملصق نادر أو صدمة مميزة) تشكل عناصر تمييز قاطعة لا تتكرر في باقي المركبات من نفس الموديل واللون.',
        N'["الملاحظة التمييزية","التعرف السريع على الأهداف"]',
        N'["SPEC-MOTARD","SPEC-PJ","SPEC-PSIG"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":1.5}]',
        35,
        1, 0, 1
    );

    -- Question 36: Q-ATT-036 (التركيز والانتباه)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        36,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ATTENTION'),
        N'Q-ATT-036',
        N'أثناء تلقي نداء لاسلكي سريع ومتقطع وسط ضوضاء محرك الدورية: "الدورية 4... تحرك فوراً إلى النقطة كليو 47... كرر 47 وليس 74... الدعم مطلوب". ما هي النقطة المحددة بدقة لتوجيه التدخل؟',
        N'التركيز والانتباه',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'الرسالة شددت بوضوح على تصحيح التردد وتفادي الخلط البصري/السمعي المألوف: النقطة المقصودة هي الكيلومتر 47 وليس 74.',
        N'["التركيز السمعي الانتقائي","اليقظة اللاسلكية في الطوارئ"]',
        N'["SPEC-MOTARD","SPEC-PSIG","SPEC-GSI"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2},{"code":"SPEC-GSI","specialite":"GSI","poids":1.5}]',
        36,
        1, 0, 1
    );

    -- Question 37: Q-ATT-037 (التركيز والانتباه)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        37,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ATTENTION'),
        N'Q-ATT-037',
        N'خلال نوبة حراسة ليلية ثابتة تمتد لأربع ساعات في موقع معزول، ما هو الإجراء الأنجع للحفاظ على أقصى درجات التركيز الذهني ومقاومة النعاس والشرود؟',
        N'التركيز والانتباه',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'المسح البصري الدوري لقطاعات الرصد وتغيير وضعية الوقوف مع التنفس العميق ينشط الدورة الدموية ويبقي الحواس في حالة استنفار دائم دون إخلال بالواجب.',
        N'["الانتباه المستمر والمقاوم للرتابة","الانضباط في الحراسة الثابتة"]',
        N'["SPEC-GEH","SPEC-GSI","SPEC-PSIG"]',
        N'[{"code":"SPEC-GEH","specialite":"GEH","poids":2.5},{"code":"SPEC-GSI","specialite":"GSI","poids":2},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":1.5}]',
        37,
        1, 0, 1
    );

    -- Question 38: Q-ATT-038 (التركيز والانتباه)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        38,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ATTENTION'),
        N'Q-ATT-038',
        N'أمامك قائمة تتضمن أرقام بطاقات التعريف الوطنية التالية: [AB123456, AB123465, AB123546, AB123456]. كم مرة تكرر الرقم المحدد [AB123456] بالضبط وبشكل متطابق في القائمة؟',
        N'التركيز والانتباه',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'الرقم AB123456 ورد في المركز الأول ثم تكرر بنفس الترتيب في المركز الرابع فقط، أي مرتين بالضبط (العنصر الثاني والثالث فيهما قلب للأرقام 65 و 546).',
        N'["التدقيق البصري السريع","مقارنة المتطابقات الرقمية"]',
        N'["SPEC-SEC-ADMIN","SPEC-INFO","SPEC-PJ"]',
        N'[{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":2.5},{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":2},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":1.5}]',
        38,
        1, 0, 1
    );

    -- Question 39: Q-ATT-039 (التركيز والانتباه)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        39,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ATTENTION'),
        N'Q-ATT-039',
        N'أثناء مراجعة سجل الموقوفين رهن الحراسة النظرية، أي زوج من البيانات التالية يحتوي على خطأ إملائي أو رقمي دقيق يجب تصحيحه فوراً؟',
        N'التركيز والانتباه',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'في الزوج (ج)، تاريخ نهاية الأجل (14/05) يسبق تاريخ التوقيف (15/05)، وهو خطأ تاريخي منطقي فادح يمس مشروعية التوقيف الإجرائي.',
        N'["الانتباه للتفاصيل الدقيقة","التوثيق الإداري السليم"]',
        N'["SPEC-SEC-ADMIN","SPEC-PJ","SPEC-PJ"]',
        N'[{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":2.5},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":2},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":1.5}]',
        39,
        1, 0, 1
    );

    -- Question 40: Q-ATT-040 (التركيز والانتباه)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        40,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ATTENTION'),
        N'Q-ATT-040',
        N'يقود دركي دراجة نارية في موكب رسمي بسرعة 80 كم/س. تتطلب القيادة تقسيم الانتباه (Attention partagée) بين مسار الطريق وحركة كبار الشخصيات. ما هو السلوك الصحيح لتفادي تشتت الانتباه؟',
        N'التركيز والانتباه',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'الانتباه المقسم يعتمد على المسح البصري الديناميكي السريع (الطريق، المرايا، الموكب) مع المحافظة على مسافة أمان ثابتة والتركيز على مسار التوجيه الأساسي لمنع حوادث الاصطدام.',
        N'["تقسيم الانتباه الحركي","التركيز أثناء القيادة التكتيكية"]',
        N'["SPEC-MOTARD","SPEC-GEH"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":3},{"code":"SPEC-GEH","specialite":"GEH","poids":2}]',
        40,
        1, 0, 1
    );

    -- Question 41: Q-ATT-041 (التركيز والانتباه)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        41,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ATTENTION'),
        N'Q-ATT-041',
        N'أثناء مراقبة أوراق سيارة في نقطة تفتيش، لمح الدركي عبر الرؤية المحيطية (Peripheral vision) حركة سريعة ليد الراكب الخلفي تمتد نحو أسفل المقعد. ما هو رد الفعل الانتباهي والأمني السليم؟',
        N'التركيز والانتباه',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'حركة اليد المفاجئة لأسفل مقعد مشبوه قد تكون محاولة لسحب سلاح ناري أو إخفاء حرز؛ يجب فوراً إيقاف فحص الأوراق، وأخذ وضعية حماية، وإصدار أمر حازم بإظهار اليدين والتنسيق مع الزميل.',
        N'["الرؤية المحيطية واليقظة السريعة","حماية الذات في التدخلات المباشرة"]',
        N'["SPEC-GSI","SPEC-PSIG","SPEC-MOTARD"]',
        N'[{"code":"SPEC-GSI","specialite":"GSI","poids":2.5},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2},{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":1.5}]',
        41,
        1, 0, 1
    );

    -- Question 42: Q-ATT-042 (التركيز والانتباه)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        42,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ATTENTION'),
        N'Q-ATT-042',
        N'في اختبار فحص التركيز الإداري، أي من المتتاليات الآتية تحتوي على عنصر دخيل لا ينتمي لباقي العناصر؟ المتتالية: [محضر معاينة، استدعاء رسمي، بطاقة زيارة، برقية عملياتية، قذيفة هاون]',
        N'التركيز والانتباه',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'جميع العناصر الأولى هي وثائق ومحررات إدارية وقضائية رسمية، بينما "قذيفة هاون" هي ذخيرة حربية مادية وسلاح، وبالتالي هي العنصر الدخيل منطقياً وتصنيفياً.',
        N'["الانتباه التصنيفي","الفصل بين السياقات الإدارية والميدانية"]',
        N'["SPEC-SEC-ADMIN","SPEC-PJ"]',
        N'[{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":2.5},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":1.5}]',
        42,
        1, 0, 1
    );

    -- Question 43: Q-ATT-043 (التركيز والانتباه)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        43,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ATTENTION'),
        N'Q-ATT-043',
        N'أثناء التعامل مع السلاح الفردي، ما هي القاعدة الذهبية الأولى التي تعبر عن الانتباه الأمني الصارم وتمنع إطلاق النار العرضي غير المقصود؟',
        N'التركيز والانتباه',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'القاعدة الأولى للأمان في الأسلحة: اعتبار السلاح دائماً ملقماً وجاهزاً للإطلاق، وإبقاء الإصبع ممدداً خارج واقي الزناد (Pontet) حتى اتخاذ قرار الرماية الواعي.',
        N'["قواعد الأمان والانتباه الصارم للأسلحة","الانضباط التكتيكي"]',
        N'["SPEC-GSI","SPEC-PSIG","SPEC-GEH","SPEC-INSTRUCTEUR"]',
        N'[{"code":"SPEC-GSI","specialite":"GSI","poids":2.5},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2},{"code":"SPEC-GEH","specialite":"GEH","poids":1.5},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":1.5}]',
        43,
        1, 0, 1
    );

    -- Question 44: Q-ATT-044 (التركيز والانتباه)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        44,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ATTENTION'),
        N'Q-ATT-044',
        N'استقبل مأمور قاعة المواصلات اتصال استغاثة من مواطنة تصرخ بهستيريا قائلة: "أنقذوني... بيت عمي قرب وادي إيسيل... سيارة كحلة دهست الدري الصغير ومشت بسرعة... الشارع 14 درب النخلة زنقة 3!". ما العنوان الدقيق الذي يجب إرسال الدورية إليه فوراً؟',
        N'التركيز والانتباه',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'التركيز الانتقائي يقتضي فصل الصراخ والمشاعر الجانبية واستخلاص العنوان المحدد جغرافياً: درب النخلة، الشارع 14، زنقة 3، قرب وادي إيسيل.',
        N'["الاستماع الفعال واستخلاص البيانات الحرجة","التركيز في بيئة الضغط النفسي"]',
        N'["SPEC-SEC-ADMIN","SPEC-PSIG","SPEC-INFO"]',
        N'[{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":2},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2},{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":1.5}]',
        44,
        1, 0, 1
    );

    -- Question 45: Q-ATT-045 (التركيز والانتباه)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        45,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ATTENTION'),
        N'Q-ATT-045',
        N'على شاشة رادار قياس السرعة، ظهرت في جزء من الثانية أربع مركبات في نفس المقطع: (السيارة أ: 98 كم/س)، (السيارة ب: 138 كم/س في طريق سرعتها القصوى 100 كم/س)، (الشاحنة ج: 75 كم/س)، (الحافلة د: 85 كم/س). أي مركبة تشكل الهدف الميداني الفوري لدركي الرادار؟',
        N'التركيز والانتباه',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'المركبة (ب) تسير بسرعة 138 كم/س متجاوزة السرعة القانونية بـ 38 كم/س، وهي المخالفة الجسيمة الفورية التي تستوجب إشعار نقطة التوقيف المتقدمة لاعتراضها.',
        N'["سرعة التمييز الإدراكي","الضبط الراداري لمخالفات السرعة"]',
        N'["SPEC-MOTARD","SPEC-PSIG"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":3},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":1}]',
        45,
        1, 0, 1
    );

    -- Question 46: Q-ATT-046 (التركيز والانتباه)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        46,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ATTENTION'),
        N'Q-ATT-046',
        N'يقف دركي في صفوف تشكيل حفظ النظام العام أمام حشد غاضب يطلق هتافات واستفزازات لفظية. ما هو السلوك الذي يعكس أعلى درجات التركيز والانضباط العسكري؟',
        N'التركيز والانتباه',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'في مهام حفظ النظام، يجب الحفاظ على برودة الأعصاب، وتجاهل الاستفزازات اللفظية، والتركيز على تعليمات القائد وحماية التشكيل دون أي ردود أفعال انفعالية فردية.',
        N'["ضبط النفس ومقاومة التشتت الاستفزازي","الانضباط في حفظ النظام"]',
        N'["SPEC-PSIG","SPEC-GEH","SPEC-GSI"]',
        N'[{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2.5},{"code":"SPEC-GEH","specialite":"GEH","poids":2},{"code":"SPEC-GSI","specialite":"GSI","poids":1.5}]',
        46,
        1, 0, 1
    );

    -- Question 47: Q-ATT-047 (التركيز والانتباه)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        47,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ATTENTION'),
        N'Q-ATT-047',
        N'خلال الجرد اليومي لذخيرة مستودع الأسلحة (Armurerie)، يحتوي كل صندوق ذخيرة على 50 طلقة. إذا كان السجل يسجل استلام 10 صناديق كاملة وخرجت 3 دوريات كل دورية استلمت مخزنين بكل مخزن 15 طلقة، فكم طلقة يجب أن توجد بالتمام والكمال في المستودع بعد الجرد؟',
        N'التركيز والانتباه',
        'QCM_UNIQUE',
        N'DIFFICILE',
        N'صعب',
        2,
        1.5,
        90,
        N'إجمالي الرصيد المستلم: 10 صناديق × 50 طلقة = 500 طلقة. الذخيرة المصروفة: 3 دوريات × (2 مخزن × 15) = 3 × 30 = 90 طلقة. الرصيد المتبقي بدقة: 500 - 90 = 410 طلقات.',
        N'["الحساب العملياتي الدقيق","اليقظة في تدبير الذخيرة الحية"]',
        N'["SPEC-SEC-ADMIN","SPEC-PSIG","SPEC-GSI"]',
        N'[{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":2},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":1.5},{"code":"SPEC-GSI","specialite":"GSI","poids":1.5}]',
        47,
        1, 0, 1
    );

    -- Question 48: Q-ATT-048 (التركيز والانتباه)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        48,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ATTENTION'),
        N'Q-ATT-048',
        N'أثناء تأمين تجمع جماهيري حاشد، أي من العلامات الجسدية التالية يمثل خطراً مستتراً يجب أن يلفت انتباه المراقب الأمني فوراً؟',
        N'التركيز والانتباه',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'ارتداء معطف شتوي ثقيل جداً في يوم صيفي حار مع تثبيت اليد تحت الإبط يشكل شذوذاً بيئياً وسلوكياً صريحاً (Anomalie comportementale) يشير لاحتمال حمل سلاح أو جسم محظور.',
        N'["الانتباه للمخاطر الخفية في التجمعات","الملاحظة الأمنية الوقائية"]',
        N'["SPEC-GSI","SPEC-GEH","SPEC-PSIG"]',
        N'[{"code":"SPEC-GSI","specialite":"GSI","poids":2.5},{"code":"SPEC-GEH","specialite":"GEH","poids":2},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2}]',
        48,
        1, 0, 1
    );

    -- Question 49: Q-ATT-049 (التركيز والانتباه)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        49,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ATTENTION'),
        N'Q-ATT-049',
        N'في مهمة خفر ونقل معتقلين خطيرين لمسافة طويلة تزيد عن 6 ساعات بالسيارة، متى تبدأ مؤشرات هبوط التركيز الذهني الخطيرة بالظهور وكيف تتم معالجتها ميدانياً؟',
        N'التركيز والانتباه',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1,
        90,
        N'الدراسات تثبت انخفاض التركيز بعد ساعتين من القيادة المتواصلة؛ الإجراء المهني هو التناوب بين عناصر الدورية والتوقف الأمني المخطط له في نقط دركية مؤمنة.',
        N'["تدبير الإجهاد في المهام الحساسة","الحفاظ على اليقظة العملياتية"]',
        N'["SPEC-PSIG","SPEC-MOTARD","SPEC-GSI"]',
        N'[{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2},{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2},{"code":"SPEC-GSI","specialite":"GSI","poids":1.5}]',
        49,
        1, 0, 1
    );

    -- Question 50: Q-ATT-050 (التركيز والانتباه)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        50,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ATTENTION'),
        N'Q-ATT-050',
        N'خلال تمشيط ليلي لغابة مشبوهة بواسطة مصابيح كاشفة، أي حركة بصرية يجب أن تكون أولوية الانتباه لدى الرامي الأمامي في فريق التدخل؟',
        N'التركيز والانتباه',
        'QCM_UNIQUE',
        N'DIFFICILE',
        N'صعب',
        2,
        1.5,
        90,
        N'في بيئة منخفضة الإضاءة، حركة الأغصان أو الوميض الفجائي على مستوى ارتفاع الإنسان أو حركة الظلال المتعارضة مع الريح هي مؤشر التهديد الفوري الذي يحدد تموضع الخصم.',
        N'["الانتباه الراداري التكتيكي","الرماية والتمييز في الظلام"]',
        N'["SPEC-GSI","SPEC-PSIG","SPEC-GEH"]',
        N'[{"code":"SPEC-GSI","specialite":"GSI","poids":2.5},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2.5},{"code":"SPEC-GEH","specialite":"GEH","poids":1}]',
        50,
        1, 0, 1
    );

    -- Question 51: Q-DEC-051 (حل المشكلات واتخاذ القرار)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        51,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DECISION'),
        N'Q-DEC-051',
        N'وصلت دورية درك ملكي أولاً إلى مسرح حادث سير خطير على طريق سيار مظلم، حيث توجد سيارة محطمة بوسط الطريق مع مصاب بداخلها وشاحنات مسرعة قادمة. ما هو القرار القيادي والعملياتي الأول الذي يجب تنفيذه فوراً؟',
        N'حل المشكلات واتخاذ القرار',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'القاعدة الذهبية الميدانية (حماية - إشعار - إنقاذ PAS): تأمين المسرح بوضع إشارات التحذير الضوئية والمثلثة لمسافة كافية لمنع حادث تصادمي متسلسل، ثم طلب الإسعاف وتقديم الإسعافات.',
        N'["ترتيب الأولويات في الطوارئ","اتخاذ القرار تحت الضغط الشديد"]',
        N'["SPEC-MOTARD","SPEC-PSIG","SPEC-PJ"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2.5},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":1}]',
        51,
        1, 0, 1
    );

    -- Question 52: Q-DEC-052 (حل المشكلات واتخاذ القرار)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        52,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DECISION'),
        N'Q-DEC-052',
        N'أثناء توقيف مخالف، بدأ السائق بالصراخ وإثارة الفوضى واستفزاز المارة للتجمهر حول الدورية، مدعياً تعرضه للظلم بهدف إرباك رجال الدرك. ما القرار الحكيم والاحترافي لحل هذه الأزمة؟',
        N'حل المشكلات واتخاذ القرار',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'التصرف المهني يعتمد على امتصاص الغضب، وتهدئة النبرة، وعزل الشخص عن الفضوليين، وطلب تعزيز إذا لزم، وتطبيق القانون بصرامة وهدوء دون الانجرار للاستفزاز.',
        N'["إدارة النزاعات والمواقف المتوترة","الهدوء والسيطرة الميدانية"]',
        N'["SPEC-PSIG","SPEC-MOTARD","SPEC-INSTRUCTEUR"]',
        N'[{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2.5},{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":1.5}]',
        52,
        1, 0, 1
    );

    -- Question 53: Q-DEC-053 (حل المشكلات واتخاذ القرار)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        53,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DECISION'),
        N'Q-DEC-053',
        N'اخترقت سيارة مشبوهة تسير بسرعة جنونية حاجزاً دركياً متسببة في تحطيم السلاسل المسمارية دون إصابة العناصر، وفرت هاربة في اتجاه طريق سريع. ما القرار القيادي المتوافق مع قواعد استخدام السلاح والتدرج الأمني؟',
        N'حل المشكلات واتخاذ القرار',
        'QCM_UNIQUE',
        N'DIFFICILE',
        N'صعب',
        2,
        1.5,
        90,
        N'لا يجوز إطلاق النار على سيارة تبتعد لمجرد الفرار إذا لم يعد هناك خطر حال ومباشر على الحياة؛ القرار الصائب هو التعميم اللاسلكي الفوري، ونشر خطة تطويق عبر النقط الموالية.',
        N'["اتخاذ القرار التكتيكي الحاسم","قواعد استخدام السلاح الوظيفي"]',
        N'["SPEC-GSI","SPEC-PJ","SPEC-MOTARD","SPEC-PSIG"]',
        N'[{"code":"SPEC-GSI","specialite":"GSI","poids":2.5},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":2},{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":1.5}]',
        53,
        1, 0, 1
    );

    -- Question 54: Q-DEC-054 (حل المشكلات واتخاذ القرار)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        54,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DECISION'),
        N'Q-DEC-054',
        N'كانت دورية متجهة لتوقيف مشتبه به في سرقة متجر، وأثناء سيرها عاينت طفلاً صغيراً صدمته دراجة نارية وهو ملقى على حافة الطريق ينزف في غياب أي مسعف. كيف يتم البت في هذا التعارض العملياتي؟',
        N'حل المشكلات واتخاذ القرار',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'في فلسفة العمل الأمني والقانوني، الحفاظ على الحياة البشرية وإنقاذ الأرواح المعرضة للهلاك له الأولوية المطلقة على أي مهمة مادية؛ مع إشعار القاعة لتوجيه دورية أخرى للسرقة.',
        N'["الموازنة الإنسانية والعملياتية","الأولوية لإنقاذ الأرواح"]',
        N'["SPEC-PSIG","SPEC-PJ","SPEC-INSTRUCTEUR"]',
        N'[{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":2},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":1.5}]',
        54,
        1, 0, 1
    );

    -- Question 55: Q-DEC-055 (حل المشكلات واتخاذ القرار)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        55,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DECISION'),
        N'Q-DEC-055',
        N'تدخلت دورية لفض شجار دامٍ بين جيران، حيث يحمل أحد الأطراف سكيناً مهدداً بالطعن والطرف الآخر ممسك بعصا خشبية غليظة وسط صراخ عائلاتهم. ما هو التسلسل التكتيكي الحاسم لحل النزاع؟',
        N'حل المشكلات واتخاذ القرار',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'التسلسل: 1- فرض مسافة أمان وتوجيه إنذار صارم بإلقاء الأسلحة، 2- الفصل الجسدي بين الخصمين، 3- شل حركة المعتدي ونزع السلاح، 4- حجز الأسلحة وفتح تحقيق قضائي.',
        N'["إدارة المواجهات المسلحة الخفيفة","السيطرة الميدانية الفورية"]',
        N'["SPEC-GSI","SPEC-PSIG","SPEC-PJ"]',
        N'[{"code":"SPEC-GSI","specialite":"GSI","poids":2.5},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2.5},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":1.5}]',
        55,
        1, 0, 1
    );

    -- Question 56: Q-DEC-056 (حل المشكلات واتخاذ القرار)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        56,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DECISION'),
        N'Q-DEC-056',
        N'أثناء دورية استطلاعية في منطقة قروية نائية ليلاً، تعطل محرك سيارة الدورية تماماً مع انقطاع تغطية أجهزة الاتصال اللاسلكي وشبكة الهاتف في المنخفض الجغرافي. ما هو القرار الأنسب لمعالجة الموقف؟',
        N'حل المشكلات واتخاذ القرار',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'تأمين المركبة والسلاح أولاً، وتفادي تفرق العناصر، ثم الصعود التكتيكي المنظم لمرتفع جغرافي قريب لاستعادة التغطية اللاسلكية وإبلاغ القيادة ببيانات الموقع والعطل بدقة.',
        N'["التصرف في حالات الانعزال والخلل الفني","التدبير الأمني للمخاطر"]',
        N'["SPEC-PSIG","SPEC-INFO","SPEC-MOTARD"]',
        N'[{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2},{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":2},{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":1.5}]',
        56,
        1, 0, 1
    );

    -- Question 57: Q-DEC-057 (حل المشكلات واتخاذ القرار)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        57,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DECISION'),
        N'Q-DEC-057',
        N'تحصن شخص مصاب باضطراب نفسي داخل منزله شاهراً بندقية صيد مهدداً بإطلاق النار على كل من يقترب من الباب. ما هو القرار القيادي الأكثر مطابقة للإجراءات العملياتية الحديثة؟',
        N'حل المشكلات واتخاذ القرار',
        'QCM_UNIQUE',
        N'DIFFICILE',
        N'صعب',
        2,
        1.5,
        90,
        N'قاعدة تجميد الموقف (Gel de la situation): ضرب طوق أمني وإخلاء المحيط المباشر لمنع أي إصابات للمدنيين، وإطلاق مسار التفاوض، واستدعاء الفرق المتخصصة بالاقتحام (GSI).',
        N'["تدبير الأزمات ذات التهديد المسلح","تجميد الموقف والتدخل المتخصص"]',
        N'["SPEC-GSI","SPEC-PSIG","SPEC-PJ"]',
        N'[{"code":"SPEC-GSI","specialite":"GSI","poids":3},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2.5},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":1}]',
        57,
        1, 0, 1
    );

    -- Question 58: Q-DEC-058 (حل المشكلات واتخاذ القرار)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        58,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DECISION'),
        N'Q-DEC-058',
        N'خلال تفتيش قانوني لمنزل مشتبه به في قضية سرقة مواشٍ بإذن قضائي، عثرت عناصر الدرك على كيس كبير يحتوي على مادة مخدرة بيضاء مهيأة للتوزيع لم تكن ضمن موضوع الإذن الأصلي. كيف يتم اتخاذ القرار الإجرائي السليم؟',
        N'حل المشكلات واتخاذ القرار',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'العثور على جريمة مخدرات يشكل حالة تلبس عارضة (Flagrance)؛ يجب حجز المادة فوراً، وتحرير محضر بالواقعة العارضة، وإشعار النيابة العامة فوراً لتوسيع نطاق البحث.',
        N'["الشرعية الإجرائية في التفتيش","التعامل مع الجرائم المتلبس بها العارضة"]',
        N'["SPEC-PJ","SPEC-PJ","SPEC-SEC-ADMIN"]',
        N'[{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":3},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2.5},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":1}]',
        58,
        1, 0, 1
    );

    -- Question 59: Q-DEC-059 (حل المشكلات واتخاذ القرار)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        59,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DECISION'),
        N'Q-DEC-059',
        N'تسببت أمطار طوفانية مفاجئة في محاصرة مدرسة ابتدائية قروية بمياه الفيضانات المتصاعدة بسرعة، وبنفس الوقت أبلغ فلاح عن غرق قطيعه في مزرعة مجاورة. أين يتم توجيه جهد الإنقاذ الفوري؟',
        N'حل المشكلات واتخاذ القرار',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'إنقاذ حياة الأطفال والتلاميذ في المدرسة له الأولوية القصوى والمطلقة وغير القابلة للنقاش قبل أي ممتلكات أو حيوانات أو خسائر مادية في حالات الكوارث.',
        N'["الأولويات في الكوارث الطبيعية","حماية الفئات الهشة والمستضعفة"]',
        N'["SPEC-PSIG","SPEC-MOTARD","SPEC-INSTRUCTEUR"]',
        N'[{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2.5},{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":1.5},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":1.5}]',
        59,
        1, 0, 1
    );

    -- Question 60: Q-DEC-060 (حل المشكلات واتخاذ القرار)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        60,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DECISION'),
        N'Q-DEC-060',
        N'أثناء مهمة ميدانية مشتركة، نشب خلاف حاد وتبادل كلامي غير لائق بين دركيين من نفس الرتبة بسبب توزيع المهام أمام مرأى المواطنين. كيف يتدخل رئيس الدورية لحل المشكلة فوراً؟',
        N'حل المشكلات واتخاذ القرار',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'إيقاف الجدال فوراً وبصرامة قيادية، والفصل بينهما لتأمين إنجاز المهمة، وتأجيل المعالجة التأديبية والنفسية لجلسة مغلقة داخل الوحدة بعيداً عن أعين الجمهور.',
        N'["القيادة العسكرية وإدارة الخلافات","هيبة السلك والحفاظ على المظهر العام"]',
        N'["SPEC-INSTRUCTEUR","SPEC-PSIG","SPEC-GEH"]',
        N'[{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":2.5},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2},{"code":"SPEC-GEH","specialite":"GEH","poids":1.5}]',
        60,
        1, 0, 1
    );

    -- Question 61: Q-DEC-061 (حل المشكلات واتخاذ القرار)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        61,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DECISION'),
        N'Q-DEC-061',
        N'تلقى مركز دركي إشعاراً باقتراب حافلة تنقل مشجعين متعصبين يثيرون الفوضى على الطريق، بينما القوة المتوفرة بالمركز في تلك اللحظة لا تتعدى دركيين اثنين. ما هو القرار الأمني الحكيم؟',
        N'حل المشكلات واتخاذ القرار',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'اعتراض حافلة حاشدة بعنصرين فقط يعرض سلامة الأفراد للخطر المحقق؛ القرار هو طلب الدعم من القيادة وتنسيق نقطة اعتراض مشتركة بأعداد كافية وموقع استراتيجي آمن.',
        N'["تقدير ميزان القوى العملياتي","تجنب الوقوع في كمائن التفوق العددي"]',
        N'["SPEC-PSIG","SPEC-MOTARD","SPEC-GSI"]',
        N'[{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2.5},{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2},{"code":"SPEC-GSI","specialite":"GSI","poids":1.5}]',
        61,
        1, 0, 1
    );

    -- Question 62: Q-DEC-062 (حل المشكلات واتخاذ القرار)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        62,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DECISION'),
        N'Q-DEC-062',
        N'أثناء استراحة غداء بمطعم على الطريق، لاحظ دركي أن صاحب المطعم يرفض تسلم ثمن الوجبة ويصر قائلاً: "أنتم رجال درك ونحن في خدمتكم دائماً بلا مقابل". ما هو القرار المهني والأخلاقي الصارم الواجب اتخاذه؟',
        N'حل المشكلات واتخاذ القرار',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'الامتناع التام عن قبول أي هدايا أو خدمات مجانية مهما كانت بسيطة لأنها تمس بمبدأ الحياد والتجرد، والإصرار المؤدب والحاسم على دفع الفاتورة كاملة مع الحصول على وصل.',
        N'["النزاهة والاستقامة الأخلاقية","احترام مدونة السلوك الوظيفي"]',
        N'["SPEC-INSTRUCTEUR","SPEC-PJ","SPEC-SEC-ADMIN"]',
        N'[{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":2.5},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":2},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":1.5}]',
        62,
        1, 0, 1
    );

    -- Question 63: Q-DEC-063 (حل المشكلات واتخاذ القرار)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        63,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DECISION'),
        N'Q-DEC-063',
        N'عرض سائق شاحنة مخالف مبلغاً مالياً كبيراً مدسوساً داخل وثائق الشاحنة لتفادي حجز حمولته الزائدة. ما هو الإجراء الإداري والقضائي الحاسم الفوري؟',
        N'حل المشكلات واتخاذ القرار',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'محاولة إرشاء موظف عمومي هي جناية/جنحة متلبس بها؛ يجب رفض الرشوة، وتوثيق الأوراق النقدية بحضور الزميل كحرز، وحجز السائق والمركبة وإشعار النيابة العامة فوراً.',
        N'["مكافحة الرشوة والفساد","الشرعية في التثبيت الجنائي للرشوة"]',
        N'["SPEC-PJ","SPEC-PJ","SPEC-MOTARD"]',
        N'[{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":3},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2.5},{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2}]',
        63,
        1, 0, 1
    );

    -- Question 64: Q-DEC-064 (حل المشكلات واتخاذ القرار)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        64,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DECISION'),
        N'Q-DEC-064',
        N'اندلع حريق مهول في مستودع للأسمدة الكيماوية بمحاذاة طريق جهوي رئيسي مع انبعاث غازات صفراء كثيفة خانقة. ما هو القرار التكتيكي الأسرع لحماية حركة المرور والساكنة؟',
        N'حل المشكلات واتخاذ القرار',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'الغازات الناتجة عن الكيماويات سامة وخانقة؛ يجب قطع الطريق فوراً من الاتجاهين على مسافة أمان، وتوجيه حركة المرور لمحاور بديلة، والتنسيق العاجل مع الوقاية المدنية.',
        N'["إدارة مخاطر المواد الخطرة","التدابير الوقائية للسلامة العامة"]',
        N'["SPEC-MOTARD","SPEC-PSIG","SPEC-PJ"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2.5},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":1}]',
        64,
        1, 0, 1
    );

    -- Question 65: Q-DEC-065 (حل المشكلات واتخاذ القرار)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        65,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DECISION'),
        N'Q-DEC-065',
        N'رصدت دورية مبحوثاً عنه خطيراً في قضية اتجار دولي في المخدرات داخل سوق أسبوعي مكتظ بآلاف المتسوقين والأطفال. كيف يتم التخطيط لعملية التوقيف بنجاح؟',
        N'حل المشكلات واتخاذ القرار',
        'QCM_UNIQUE',
        N'DIFFICILE',
        N'صعب',
        2,
        1.5,
        90,
        N'التدخل المسلح وسط حشد كثيف قد يسبب تدافعاً مميتاً أو احتجاز رهائن؛ الصواب هو المراقبة السرية والتعقب حتى خروجه لمنطقة مكشوفة ومعزولة وتوقيفه بمباغتة تامة.',
        N'["التخطيط لعمليات التوقيف في الأماكن الحساسة","حماية المدنيين من التدافع وردود الفعل العنيفة"]',
        N'["SPEC-PJ","SPEC-GSI","SPEC-PSIG"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2.5},{"code":"SPEC-GSI","specialite":"GSI","poids":2.5},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2}]',
        65,
        1, 0, 1
    );

    -- Question 66: Q-MOT-066 (السلامة الطرقية وقيادة الدراجات)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        66,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ROUTE_MOTO'),
        N'Q-MOT-066',
        N'ما هو المسار الآمن النموذجي (Trajectoire de sécurité) الذي يتبعه دركي الدراجات النارية عند ولوج منعرج يمين غير مكشوف؟',
        N'السلامة الطرقية وقيادة الدراجات',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'المسار الآمن يعتمد على: التموضع بجانب محور الطريق (الخارج) لزيادة مدى الرؤية، وتوجيه النظرة لأبعد نقطة، ثم الالتفاف نحو الداخل فقط بعد انكشاف نهاية المنعرج.',
        N'["تقنيات القيادة المتقدمة للدراجات","تأمين مسار المنعرجات"]',
        N'["SPEC-MOTARD","SPEC-GEH"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":3},{"code":"SPEC-GEH","specialite":"GEH","poids":2}]',
        66,
        1, 0, 1
    );

    -- Question 67: Q-MOT-067 (السلامة الطرقية وقيادة الدراجات)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        67,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ROUTE_MOTO'),
        N'Q-MOT-067',
        N'لماذا تعد الدقائق العشرين الأولى من هطول الأمطار بعد فترة جفاف طويلة الفترة الأكثر خطورة لانزلاق المركبات والدراجات النارية على الطرق؟',
        N'السلامة الطرقية وقيادة الدراجات',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'اختلاط قطرات المطر الأولى بالغبار وبقايا الزيوت والمطاط المتراكمة على الإسفلت يشكل طبقة لزجة جداً تشبه الصابون تقلل معامل الاحتكاك إلى أدنى مستوياته قبل أن يغسلها المطر الغزير.',
        N'["فيزياء الالتصاق والالتحام الطرقي","تقدير مخاطر الطقس الزلق"]',
        N'["SPEC-MOTARD","SPEC-PSIG"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":3},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":1.5}]',
        67,
        1, 0, 1
    );

    -- Question 68: Q-MOT-068 (السلامة الطرقية وقيادة الدراجات)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        68,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ROUTE_MOTO'),
        N'Q-MOT-068',
        N'إذا كانت سيارة تسير بسرعة 90 كم/س على طريق جاف، فما هي المسافة التقريبية التي تقطعها خلال زمن رد الفعل البشري الطبيعي (المقدر بثانية واحدة) قبل أن يبدأ السائق بالضغط الفعلي على الفرامل؟',
        N'السلامة الطرقية وقيادة الدراجات',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'القاعدة التقريبية لحساب المسافة المقطوعة في الثانية: رقم العشرات مضروباً في 3 (9 × 3 = 27 متراً)، أو حسابياً (90,000 متر ÷ 3600 ثانية = 25 متراً في الثانية).',
        N'["الحساب الحركي للسلامة الطرقية","تقدير مسافة رد الفعل والتوقف"]',
        N'["SPEC-MOTARD","SPEC-PJ","SPEC-INSTRUCTEUR"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":3},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":1.5},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":1.5}]',
        68,
        1, 0, 1
    );

    -- Question 69: Q-MOT-069 (السلامة الطرقية وقيادة الدراجات)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        69,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ROUTE_MOTO'),
        N'Q-MOT-069',
        N'في تشكيلات سير الدوريات ومواكب الدراجات النارية للدرك الملكي، ما هو التشكيل المعتمد لضمان السلامة ومسافة المناورة الكافية على الطرق المفتوحة؟',
        N'السلامة الطرقية وقيادة الدراجات',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'التشكيل المتعرج / التناوبي (Formation en quinconce) يمنح كل دراج رؤية أمامية واضحة ومسافة توقف مستقلة وكافية للمناورة في حال الفرملة المفاجئة دون الاصطدام بزميله.',
        N'["تشكيلات القيادة التكتيكية بالمواكب","قواعد سير الدراجات في مجموعات"]',
        N'["SPEC-MOTARD","SPEC-GEH"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":3},{"code":"SPEC-GEH","specialite":"GEH","poids":2.5}]',
        69,
        1, 0, 1
    );

    -- Question 70: Q-MOT-070 (السلامة الطرقية وقيادة الدراجات)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        70,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ROUTE_MOTO'),
        N'Q-MOT-070',
        N'عند اقتراب سيارة إسعاف تشغل المنبهات الصوتية والأضواء الدوارة الزرقاء من ملتقى طرق ذي أسبقية لليمين، ما هو الواجب القانوني والعملياتي على باقي مستعملي الطريق؟',
        N'السلامة الطرقية وقيادة الدراجات',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'مركبات التدخل المستعجل التي تستعمل أجهزتها التحذيرية الخاصة تتمتع بالأولوية المطلقة؛ ويجب على جميع السائقين تخفيض السرعة وإفساح المسار فوراً والتوقف إذا لزم.',
        N'["قوانين السير والمركبات ذات الأولوية","السلامة الطرقية وتسهيل مهام الإنقاذ"]',
        N'["SPEC-MOTARD","SPEC-PJ"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2.5},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":2}]',
        70,
        1, 0, 1
    );

    -- Question 71: Q-MOT-071 (السلامة الطرقية وقيادة الدراجات)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        71,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ROUTE_MOTO'),
        N'Q-MOT-071',
        N'ما هو العنصر الإجباري في معدات الحماية الفردية لدراج الدرك الملكي الذي يوفر الحماية القصوى لعظام الجمجمة والفك السفلي أثناء السقوط المباشر؟',
        N'السلامة الطرقية وقيادة الدراجات',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'الخوذة كاملة التغطية (Casque intégral) أو القابلة للتعديل والمقفلة والمطابقة للمواصفات توفر حماية حيوية شاملة لمنطقة الرأس وعظام الوجه والفك، بخلاف الخوذات المفتوحة.',
        N'["معدات الحماية الفردية وتأمين الدراج","السلامة المهنية"]',
        N'["SPEC-MOTARD","SPEC-GEH"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":3},{"code":"SPEC-GEH","specialite":"GEH","poids":2}]',
        71,
        1, 0, 1
    );

    -- Question 72: Q-MOT-072 (السلامة الطرقية وقيادة الدراجات)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        72,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ROUTE_MOTO'),
        N'Q-MOT-072',
        N'تفاجأ دراج دركي بوجود عائق طرقي صلب (إطار شاحنة منسلخ) على مساره ولا مجال لتفاديه يمنة أو يسرة. ما هي التقنية الصحيحة لعبور العائق بأمان وتفادي الانقلاب؟',
        N'السلامة الطرقية وقيادة الدراجات',
        'QCM_UNIQUE',
        N'DIFFICILE',
        N'صعب',
        2,
        1.5,
        90,
        N'إبطاء السرعة في خط مستقيم قبل العائق، ثم تحرير الفرامل تماماً، وإبقاء المقود عمودياً ومستقيماً، والوقوف الخفيف على مساند الأرجل لامتصاص الصدمة وتخفيف الحمل على المقود.',
        N'["تقنيات المناورة واجتياز العوائق الخطرة","التحكم الديناميكي بالدراجة"]',
        N'["SPEC-MOTARD","SPEC-PSIG"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":3},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":1.5}]',
        72,
        1, 0, 1
    );

    -- Question 73: Q-MOT-073 (السلامة الطرقية وقيادة الدراجات)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        73,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ROUTE_MOTO'),
        N'Q-MOT-073',
        N'خلال مراقبة حمولة شاحنات الوزن الثقيل، ما هو المؤشر القانوني والميداني الذي يثبت وجود مخالفة الحمولة الزائدة (Surcharge) الخطيرة على البنية الطرقية وسلامة الفرملة؟',
        N'السلامة الطرقية وقيادة الدراجات',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'تجاوز الوزن الإجمالي المأذون به محملة (PTAC / MMA) المسجل في شهادة التسجيل ولوحة الصانع، ويتم تأكيده قانونياً عبر قياس الوزن في محطة وزن معتمدة (Pont-bascule).',
        N'["مراقبة النقل الطرقي والوزن الثقيل","التطبيق الصارم لمدونة السير"]',
        N'["SPEC-MOTARD","SPEC-PJ"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":3},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":2}]',
        73,
        1, 0, 1
    );

    -- Question 74: Q-MOT-074 (السلامة الطرقية وقيادة الدراجات)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        74,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ROUTE_MOTO'),
        N'Q-MOT-074',
        N'عند قيادة الدراجة النارية على قنطرة معلقة أو ممر مكشوف تضربه رياح جانبية عاتية، ما السلوك التكتيكي الصائب لمواجهة تمايل الدراجة المفاجئ؟',
        N'السلامة الطرقية وقيادة الدراجات',
        'QCM_UNIQUE',
        N'DIFFICILE',
        N'صعب',
        2,
        1.5,
        90,
        N'تخفيض السرعة، وضغط الركبتين بإحكام على خزان الوقود، وإرخاء الذراعين قليلاً لتفادي نقل تذبذب الجذع للمقود، والميلان الطفيف باتجاه هبوب الريح لتحقيق التوازن.',
        N'["السيطرة على توازن الدراجة في الرياح المعاكسة","القيادة في الظروف الجوية القاسية"]',
        N'["SPEC-MOTARD","SPEC-GEH"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":3},{"code":"SPEC-GEH","specialite":"GEH","poids":2}]',
        74,
        1, 0, 1
    );

    -- Question 75: Q-MOT-075 (السلامة الطرقية وقيادة الدراجات)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        75,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ROUTE_MOTO'),
        N'Q-MOT-075',
        N'ما هو الفرق القانوني والإجرائي بين جهاز فحص الكحول بالنفس الأولي (Éthylotest) وجهاز قياس نسبة الكحول في الهواء الزفيري (Éthylomètre)؟',
        N'السلامة الطرقية وقيادة الدراجات',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'جهاز الإيثيلوتيست هو وسيلة كشف وفرز نوعي سريع (إيجابي/سلبي)، بينما الإيثيلومتر جهاز معايرة قانوني معتمد يقيس التركيز الدقيق بالكيلوغرام/لتر وله حجية قضائية قاطعة بالمحضر.',
        N'["المساطر القانونية لقياس الكحول والمخدرات","الضبط القضائي لمخالفات السير"]',
        N'["SPEC-MOTARD","SPEC-PJ","SPEC-PJ"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2.5},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":2.5},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2}]',
        75,
        1, 0, 1
    );

    -- Question 76: Q-MOT-076 (السلامة الطرقية وقيادة الدراجات)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        76,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ROUTE_MOTO'),
        N'Q-MOT-076',
        N'أثناء السير السريع بالدراجة، حدث تذبذب واهتزاز عنيف في المقود والعجلة الأمامية (Guidonnage / Wobble). ما التصرف الميكانيكي السليم الذي يمنع السقوط الحتمي؟',
        N'السلامة الطرقية وقيادة الدراجات',
        'QCM_UNIQUE',
        N'DIFFICILE',
        N'صعب',
        2,
        1.5,
        90,
        N'الخطأ القاتل هو الكبح العنيف بالفرامل الأمامية؛ التصرف الصحيح هو تقليل الضغط على المقود برفق، وإغلاق الوقود تدريجياً، وترك فيزياء الدراجة تستعيد توازنها الذاتي.',
        N'["التعامل مع حالات الطوارئ الديناميكية للدراجة","الإنقاذ من حوادث فقد السيطرة"]',
        N'["SPEC-MOTARD","SPEC-GEH"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":3},{"code":"SPEC-GEH","specialite":"GEH","poids":2}]',
        76,
        1, 0, 1
    );

    -- Question 77: Q-MOT-077 (السلامة الطرقية وقيادة الدراجات)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        77,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ROUTE_MOTO'),
        N'Q-MOT-077',
        N'عند وقوع حادث سير داخل منعرج خطير يحجب الرؤية، على أي مسافة يجب وضع مثلث العطب وأقماع التشوير التحذيرية قبل مدخل المنعرج؟',
        N'السلامة الطرقية وقيادة الدراجات',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'يجب وضع التشوير قبل المنعرج بمسافة لا تقل عن 100 إلى 150 متراً في الطرق المفتوحة لتمكين السائقين القادمين من الفرملة الآمنة قبل ولوج المنعرج ورؤية الحادث.',
        N'["التشوير والإنذار الطرقي الاستباقي","حماية مستعملي الطريق ومسرح الحادث"]',
        N'["SPEC-MOTARD","SPEC-PSIG"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2.5},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":1.5}]',
        77,
        1, 0, 1
    );

    -- Question 78: Q-MOT-078 (السلامة الطرقية وقيادة الدراجات)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        78,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ROUTE_MOTO'),
        N'Q-MOT-078',
        N'في مهام مرافقة وحماية الشخصيات الهامة (VIP) بواسطة فرقة دراجي الدرك الملكي، ما هي المهمة الميدانية الحيوية للدراج "الفاتح" (Ouvreur / Éclaireur)؟',
        N'السلامة الطرقية وقيادة الدراجات',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'الدراج الفاتح يتقدم الموكب بمسافة استطلاعية لتطهير المسار، وقطع وتأمين ملتقيات الطرق الحساسة، والتأكد من خلو المسار من أي عوائق قبل وصول سيارة الشخصية المحمية.',
        N'["بروتوكول وتكتيك المواكب الرسمية","تأمين مسارات السير السريعة"]',
        N'["SPEC-MOTARD","SPEC-GEH"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2.5},{"code":"SPEC-GEH","specialite":"GEH","poids":3}]',
        78,
        1, 0, 1
    );

    -- Question 79: Q-MOT-079 (السلامة الطرقية وقيادة الدراجات)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        79,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ROUTE_MOTO'),
        N'Q-MOT-079',
        N'ما هو الخطر الميكانيكي والفيزيائي المباشر الناتج عن السير بإطارات دراجة نارية منخفضة الضغط بشدة (Sous-gonflage) في يوم حار على الطريق السيار؟',
        N'السلامة الطرقية وقيادة الدراجات',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'نقص ضغط الإطار يسبب تشوهاً مستمراً لهيكله وارتفاعاً مفرطاً في درجة حرارته الداخلية نتيجة الاحتكاك الشديد، مما يؤدي إلى انفصال طبقات المطاط وانفجار الإطار فجأة.',
        N'["الصيانة الوقائية لمركبات الدوريات","معايير السلامة الميكانيكية"]',
        N'["SPEC-MOTARD","SPEC-GEH"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":3},{"code":"SPEC-GEH","specialite":"GEH","poids":1.5}]',
        79,
        1, 0, 1
    );

    -- Question 80: Q-MOT-080 (السلامة الطرقية وقيادة الدراجات)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        80,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'ROUTE_MOTO'),
        N'Q-MOT-080',
        N'أثناء مرافقة شاحنة ضخمة أو حافلة، أين تقع "الزاوية الميتة" (Angle mort) الأخطر التي يختفي فيها دراج الدرك تماماً عن رؤية سائق الشاحنة في مراياه العاكسة؟',
        N'السلامة الطرقية وقيادة الدراجات',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'المنطقة المحاذية للجانب الأيمن الخلفي للرأس الجرار مباشرة وأسفل زجاج الأبواب الجانبية هي أوسع زاوية ميتة؛ القاعدة الذهبية: "إذا لم تكن قادراً على رؤية وجه السائق في مرآته، فهو حتماً لا يراك".',
        N'["إدراك الزوايا الميتة للمركبات الثقيلة","التمركز التكتيكي الآمن للدراج"]',
        N'["SPEC-MOTARD","SPEC-INSTRUCTEUR"]',
        N'[{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":3},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":1.5}]',
        80,
        1, 0, 1
    );

    -- Question 81: Q-ENQ-081 (الشرطة القضائية والتحري)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        81,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'PJ_ENQUETE'),
        N'Q-ENQ-081',
        N'عند الوصول إلى مسرح جريمة قتل غامضة في شقة سكنية، ما هو الالتزام القانوني والمهني الأول لضابط الشرطة القضائية قبل الشروع في أي بحث؟',
        N'الشرطة القضائية والتحري',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'تجميد وحماية مسرح الجريمة (Gel des lieux) بضرب شريط أمني عازل ومنع دخول أي شخص غير مختص لتفادي تلويث أو إتلاف الآثار المادية والبيولوجية قبل وصول الشرطة العلمية والتقنية.',
        N'["تجميد وحماية مسرح الجريمة","الحفاظ على الآثار والأدلة المادية"]',
        N'["SPEC-PJ","SPEC-PJ","SPEC-PSIG"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":3},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":2},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":1.5}]',
        81,
        1, 0, 1
    );

    -- Question 82: Q-ENQ-082 (الشرطة القضائية والتحري)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        82,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'PJ_ENQUETE'),
        N'Q-ENQ-082',
        N'وفقاً لقانون المسطرة الجنائية، ما هو الإجراء الإلزامي الذي يجب على ضابط الشرطة القضائية القيام به فور وضع شخص تحت تدبير الحراسة النظرية؟',
        N'الشرطة القضائية والتحري',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'إشعار الشخص بدواعي توقيفه وحقوقه القانونية (التزام الصمت، الاتصال بأحد أقربائه، الاستعانة بمحامٍ، والحق في الفحص الطبي) وتدوين ذلك في سجل رسمي ومحضر قانوني.',
        N'["ضمانات الحراسة النظرية وحقوق الإنسان","المسطرة الجنائية والشرعية الإجرائية"]',
        N'["SPEC-PJ","SPEC-PJ","SPEC-SEC-ADMIN"]',
        N'[{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":3},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2.5},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":1.5}]',
        82,
        1, 0, 1
    );

    -- Question 83: Q-ENQ-083 (الشرطة القضائية والتحري)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        83,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'PJ_ENQUETE'),
        N'Q-ENQ-083',
        N'عند رفع البصمات الإصبعية الكامنة (Empreintes latentes) من على سطح زجاجي ناعم بمسرح الجريمة، ما هي المادة والتقنية التقليدية الفعالة المعتمدة من طرف تقنيي الشرطة العلمية؟',
        N'الشرطة القضائية والتحري',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'استخدام المساحيق المغناطيسية أو الكربونية المتخصصة عبر فرشاة ريش ناعمة جداً لإظهار الإفرازات الدهنية العرقية المتروكة على الزجاج دون تشويه خطوط الحلمات الجلدية.',
        N'["الشرطة التقنية والعلمية","إظهار ورفع البصمات الجنائية"]',
        N'["SPEC-PJ","SPEC-PJ"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":3},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":1.5}]',
        83,
        1, 0, 1
    );

    -- Question 84: Q-ENQ-084 (الشرطة القضائية والتحري)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        84,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'PJ_ENQUETE'),
        N'Q-ENQ-084',
        N'ما هي الأوقات القانونية العامة التي يُسمح فيها لضابط الشرطة القضائية بدخول المنازل لتفتيشها في الأحوال العادية وفق قانون المسطرة الجنائية؟',
        N'الشرطة القضائية والتحري',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'القاعدة العامة تصون حرمة المنازل: لا يمكن البدء في تفتيش المنازل أو معاينتها قبل الساعة السادسة صباحاً (06:00) ولا بعد التاسعة ليلاً (21:00)، إلا باستثناءات قانونية محددة حصراً.',
        N'["حرمة المسكن والإجراءات التفتيشية","المسطرة الجنائية"]',
        N'["SPEC-PJ","SPEC-PJ"]',
        N'[{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":3},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2.5}]',
        84,
        1, 0, 1
    );

    -- Question 85: Q-ENQ-085 (الشرطة القضائية والتحري)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        85,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'PJ_ENQUETE'),
        N'Q-ENQ-085',
        N'لماذا تعد "سلسلة الحراسة والحفظ" (Chaîne de traçabilité des scellés) بالغة الحساسية والأهمية في القضايا الجنائية الكبرى؟',
        N'الشرطة القضائية والتحري',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'سلسلة الحفظ توثق هوية كل شخص استلم أو فحص الحرز وتوقيت ذلك لمنع أي شبهة استبدال أو تلاعب أو تلوث، مما يحمي الحجية القانونية للدليل أمام هيئة المحكمة.',
        N'["إدارة وتحريز الأدلة الجنائية","حماية الحجية القانونية للمحجوزات"]',
        N'["SPEC-PJ","SPEC-PJ","SPEC-SEC-ADMIN"]',
        N'[{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":2.5},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2.5},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":1.5}]',
        85,
        1, 0, 1
    );

    -- Question 86: Q-ENQ-086 (الشرطة القضائية والتحري)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        86,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'PJ_ENQUETE'),
        N'Q-ENQ-086',
        N'في تقنيات الاستنطاق الحديثة (مثل نموذج PEACE)، ما هي المرحلة الأساسية التي يجب أن يبدأ بها المحقق قبل توجيه أي أسئلة تفصيلية للمشتبه به؟',
        N'الشرطة القضائية والتحري',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'إتاحة الفرصة للمستمع إليه لتقديم روايته الحرة والمسترسلة للأحداث (Récit libre) دون مقاطعة لتدوين تفاصيلها، ثم الانتقال لمرحلة فحص التناقضات بالأسئلة الدقيقة.',
        N'["تقنيات الاستماع والاستجواب الجنائي","التحليل الاستقصائي"]',
        N'["SPEC-PJ","SPEC-INSTRUCTEUR","SPEC-PJ"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":3},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":1.5},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":1.5}]',
        86,
        1, 0, 1
    );

    -- Question 87: Q-ENQ-087 (الشرطة القضائية والتحري)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        87,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'PJ_ENQUETE'),
        N'Q-ENQ-087',
        N'عثر المحقق على بقعة دم رطبة على ملابس ضحية في جريمة اعتداء. كيف يتم أخذ هذه العينة البيولوجية وحفظها بشكل صحيح لتفادي تعفن الحمض النووي (ADN)؟',
        N'الشرطة القضائية والتحري',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'رفع العينة بمسحة معقمة وتركها تجف في درجة حرارة الغرفة بعيداً عن الرطوبة والشمس المباشرة، وتوضيبها في مظروف ورقي نافذ للهواء (وليس كيس بلاستيكي خانق يسبب تعفن العينة).',
        N'["البيولوجيا الجنائية ورفع عينات ADN","الشرطة العلمية"]',
        N'["SPEC-PJ","SPEC-PJ"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":3},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":1.5}]',
        87,
        1, 0, 1
    );

    -- Question 88: Q-ENQ-088 (الشرطة القضائية والتحري)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        88,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'PJ_ENQUETE'),
        N'Q-ENQ-088',
        N'أي من العناصر التالية يعد شكلياً وجوهرياً لصحة محضر الاستماع المنجز من طرف ضابط الشرطة القضائية تحت طائلة البطلان؟',
        N'الشرطة القضائية والتحري',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'المحضر يجب أن يتضمن هوية الضابط وصفته، تاريخ وساعة الإجراء، تلاوة الأقوال على المصرح، وتوقيع المصرح أو الإشارة إلى امتناعه أو عجزه عن التوقيع.',
        N'["صياغة المحاضر الجنائية","الشكليات القانونية الإلزامية"]',
        N'["SPEC-PJ","SPEC-PJ","SPEC-SEC-ADMIN"]',
        N'[{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":3},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2.5},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":2}]',
        88,
        1, 0, 1
    );

    -- Question 89: Q-ENQ-089 (الشرطة القضائية والتحري)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        89,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'PJ_ENQUETE'),
        N'Q-ENQ-089',
        N'أي من الحالات التالية يعتبر حالة "تلبس بالجناية أو الجنحة" (Flagrant délit) تخول لضابط الشرطة القضائية صلاحيات استثنائية فورية؟',
        N'الشرطة القضائية والتحري',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'حالات التلبس قانوناً: إذا كانت الجريمة ترتكب عيناً أو ارتكبت حديثاً، أو إذا توبع الفاعل بصياح الجمهور إثر ارتكابها، أو إذا وجد بعد وقوعها بوقت قريب حاملاً أسلحة أو أشياء تثبت تورطه.',
        N'["أحكام التلبس بالجريمة","المسطرة الجنائية وسلطات OPJ"]',
        N'["SPEC-PJ","SPEC-PJ","SPEC-PSIG"]',
        N'[{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":3},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2.5},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":1.5}]',
        89,
        1, 0, 1
    );

    -- Question 90: Q-ENQ-090 (الشرطة القضائية والتحري)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        90,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'PJ_ENQUETE'),
        N'Q-ENQ-090',
        N'عند تنظيم طابور عرض للتشخيص وتعرف الشهود على المشتبه به (Tapissage / Parade d''identification)، ما الشرط الأساسي لنزاهة العملية وعدم بطلانها؟',
        N'الشرطة القضائية والتحري',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'وضع المشتبه به مع أشخاص آخرين (أشباه) يتقاربون معه في الملامح، والسن، والطول، والملابس، ودون تقديم أي إيحاء أو إشارة توجيهية للشاهد أثناء المعاينة.',
        N'["إجراءات تشخيص المشتبه بهم","نزاهة التحقيق وتفادي التوجيه الإيحائي"]',
        N'["SPEC-PJ","SPEC-PJ"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2.5},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":2.5}]',
        90,
        1, 0, 1
    );

    -- Question 91: Q-ENQ-091 (الشرطة القضائية والتحري)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        91,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'PJ_ENQUETE'),
        N'Q-ENQ-091',
        N'عند ضبط هاتف ذكي بحوزة مشتبه به رئيسي أثناء مداهمة أمنية، ما الإجراء الفني الفوري لحماية البيانات الرقمية من المسح عن بُعد (Effacement à distance)؟',
        N'الشرطة القضائية والتحري',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'عزل الهاتف فوراً عن أي شبكة اتصال بتفعيل "نمط الطيران" أو وضعه داخل غلاف عازل للإشارات الكهرومغناطيسية (Cage de Faraday) لمنع إرسال أمر مسح للذاكرة عبر الإنترنت.',
        N'["المحافظة على الأدلة الرقمية","التحقيق في الجريمة السيبرانية"]',
        N'["SPEC-PJ","SPEC-INFO"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2.5},{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":2.5}]',
        91,
        1, 0, 1
    );

    -- Question 92: Q-ENQ-092 (الشرطة القضائية والتحري)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        92,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'PJ_ENQUETE'),
        N'Q-ENQ-092',
        N'عند الاستماع إلى طفل قاصر ضحية اعتداء جسدي عنيف، ما هي الشروط المسطرية والنفسية الواجب توفيرها لحماية مصلحة الطفل الفضلى؟',
        N'الشرطة القضائية والتحري',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'الاستماع بحضور الولي الشرعي أو المساعد الاجتماعي، في قاعة ملائمة ومريحة نفسياً، وبأسلوب مبسط يتناسب مع سن الطفل وإدراكه ودون تكرار الأسئلة المسببة للصدمة.',
        N'["قضاء الأحداث وحماية الطفولة","الاستماع الجنائي للفئات الحساسة"]',
        N'["SPEC-PJ","SPEC-PJ","SPEC-INSTRUCTEUR"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2.5},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":2.5},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":1.5}]',
        92,
        1, 0, 1
    );

    -- Question 93: Q-ENQ-093 (الشرطة القضائية والتحري)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        93,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'PJ_ENQUETE'),
        N'Q-ENQ-093',
        N'في عمليات الترصد والمراقبة البصرية (Filature) لشبكة تهريب دولية، ما هي التقنية الأساسية لتفادي "حرق" عناصر المراقبة وكشف أمرهم من طرف المشبوهين؟',
        N'الشرطة القضائية والتحري',
        'QCM_UNIQUE',
        N'DIFFICILE',
        N'صعب',
        2,
        1.5,
        90,
        N'اعتماد المراقبة التناوبية متعددة المركبات (Filature en relais)؛ حيث تتغير السيارات والأفراد المتابعون باستمرار وبفواصل مكانية لتفادي إثارة أي شك لدى الهدف.',
        N'["تقنيات المراقبة والترصد السري","التحريات الميدانية المعقدة"]',
        N'["SPEC-PJ","SPEC-GSI","SPEC-PSIG"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":3},{"code":"SPEC-GSI","specialite":"GSI","poids":2},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":1.5}]',
        93,
        1, 0, 1
    );

    -- Question 94: Q-ENQ-094 (الشرطة القضائية والتحري)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        94,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'PJ_ENQUETE'),
        N'Q-ENQ-094',
        N'ما هو السند القانوني الذي يُمكن ضابط الشرطة القضائية من مطالبة شركات الاتصالات بتحديد المواقع الجغرافية وسجلات مكالمات مشتبه به هارب؟',
        N'الشرطة القضائية والتحري',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'توجيه تسخير قضائي رسمي (Réquisition judiciaire) بناءً على تعليمات النيابة العامة المختصة أو أمر قضائي صادر عن قاضي التحقيق وفق المقتضيات القانونية الصريحة.',
        N'["المسائل القانونية في التعقب الإلكتروني","السخرة القضائية والأذونات"]',
        N'["SPEC-PJ","SPEC-PJ","SPEC-INFO"]',
        N'[{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":3},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2.5},{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":1.5}]',
        94,
        1, 0, 1
    );

    -- Question 95: Q-ENQ-095 (الشرطة القضائية والتحري)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        95,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'PJ_ENQUETE'),
        N'Q-ENQ-095',
        N'في مختبر البالستيك القضائي، كيف يتم إثبات أن رصاصة قاتلة معينة أُطلقت بالذات من مسدس مشتبه به محجوز وليس من أي سلاح آخر مماثل؟',
        N'الشرطة القضائية والتحري',
        'QCM_UNIQUE',
        N'DIFFICILE',
        N'صعب',
        2,
        1.5,
        90,
        N'إجراء رمية اختبارية في حوض مائي بالمختبر، ثم مقارنة الخدوش والحلزونات الميكروسكوبية الدقيقة (Stries balistiques) الفريدة لسبطانة السلاح تحت المجهر المقارن.',
        N'["البالستيك المقارن والأسلحة النارية","الخبرة الجنائية المخبرية"]',
        N'["SPEC-PJ","SPEC-PJ"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":3},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":2}]',
        95,
        1, 0, 1
    );

    -- Question 96: Q-NUM-096 (المعلوماتية والمهارات الرقمية)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        96,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'INFORMATIQUE'),
        N'Q-NUM-096',
        N'تلقى دركي بريداً إلكترونياً يبدو في ظاهره صادراً عن مديرية الاتصالات يطلب: "تحديث عاجل لكلمة مرور الحساب العملياتي عبر الرابط المرفق خلال ساعتين لتفادي الحظر". ما هو التوصيف السيبراني لهذه الهجمة وما هو السلوك الحذر الواجب؟',
        N'المعلوماتية والمهارات الرقمية',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'هذه محاولة تصيد احتيالي (Phishing) لسرقة بيانات الاعتماد؛ يجب عدم الضغط على أي رابط، والإبلاغ الفوري لمسؤول أمن نظم المعلومات (RSSI) بالوحدة.',
        N'["الأمن السيبراني والوعي بالتهديدات","كشف التصيد الاحتيالي Phishing"]',
        N'["SPEC-INFO","SPEC-SEC-ADMIN","SPEC-PJ"]',
        N'[{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":3},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":2},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":1.5}]',
        96,
        1, 0, 1
    );

    -- Question 97: Q-NUM-097 (المعلوماتية والمهارات الرقمية)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        97,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'INFORMATIQUE'),
        N'Q-NUM-097',
        N'أي من كلمات المرور التالية يمثل أعلى مستوى من القوة والمقاومة لهجمات التخمين الشامل (Brute-force) وفق معايير الأمان الرقمي الحديثة؟',
        N'المعلوماتية والمهارات الرقمية',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'كلمة المرور القوية تتكون من 12 رمزاً على الأقل تجمع بين حروف كبيرة وصغيرة وأرقام ورموز خاصة عشوائية دون تشكيل كلمات قاموسية معروفة.',
        N'["إدارة وحماية كلمات المرور","الأمان السيبراني الأساسي"]',
        N'["SPEC-INFO","SPEC-SEC-ADMIN"]',
        N'[{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":3},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":2}]',
        97,
        1, 0, 1
    );

    -- Question 98: Q-NUM-098 (المعلوماتية والمهارات الرقمية)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        98,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'INFORMATIQUE'),
        N'Q-NUM-098',
        N'ما هو الدور الأمني الرئيسي لجدار الحماية (Firewall / Pare-feu) في الشبكة المعلوماتية لمقر قيادة الدرك الملكي؟',
        N'المعلوماتية والمهارات الرقمية',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'يقوم جدار الحماية بمراقبة وتصفية حركة البيانات الصادرة والواردة وفق قواعد أمنية صارمة، وحظر الاتصالات غير المصرح بها ومنع التسلل الخارجي إلى الخوادم الداخلية.',
        N'["هندسة وأمن الشبكات","حماية الخوادم والاتصالات"]',
        N'["SPEC-INFO","SPEC-PJ"]',
        N'[{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":3},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":1.5}]',
        98,
        1, 0, 1
    );

    -- Question 99: Q-NUM-099 (المعلوماتية والمهارات الرقمية)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        99,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'INFORMATIQUE'),
        N'Q-NUM-099',
        N'في خطط الحفاظ على البيانات الإدارية والقضائية من التلف أو الكوارث، ماذا تنص القاعدة الذهبية للنسخ الاحتياطي المعروفة بـ (قاعدة 3-2-1)؟',
        N'المعلوماتية والمهارات الرقمية',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'الاحتفاظ بـ 3 نسخ من البيانات، على وسيطين (2) تخزين ماديين مختلفين (مثلاً: قرص صلب داخلي ووحدة تخزين سحابية/شريط)، ونسخة واحدة (1) على الأقل في موقع جغرافي خارجي مؤمن.',
        N'["تدبير النسخ الاحتياطي وحماية المعطيات","استمرارية العمليات الرقمية"]',
        N'["SPEC-INFO","SPEC-SEC-ADMIN"]',
        N'[{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":3},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":2.5}]',
        99,
        1, 0, 1
    );

    -- Question 100: Q-NUM-100 (المعلوماتية والمهارات الرقمية)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        100,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'INFORMATIQUE'),
        N'Q-NUM-100',
        N'في تتبع مرتكبي جرائم النصب الإلكتروني عبر الإنترنت، ما هي المعلومة التقنية الأساسية المضمنة في سجلات الخادم (Server logs) التي تسمح بتحديد الخط الهاتفي أو الاشتراك المزود للخدمة؟',
        N'المعلوماتية والمهارات الرقمية',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'عنوان بروتوكول الإنترنت العام (Adresse IP publique) المقترن بالتاريخ والساعة بدقة بالغة (Timestamp) هو العنصر الفني الحاسم لتحديد هوية صاحب الاشتراك لدى مزود خدمة الإنترنت (FAI).',
        N'["التحقيق الجنائي السيبراني","تعقب بروتوكولات الإنترنت"]',
        N'["SPEC-PJ","SPEC-INFO","SPEC-PJ"]',
        N'[{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":3},{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":3},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":1.5}]',
        100,
        1, 0, 1
    );

    -- Question 101: Q-NUM-101 (المعلوماتية والمهارات الرقمية)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        101,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'INFORMATIQUE'),
        N'Q-NUM-101',
        N'ظهرت فجأة على شاشة حاسوب المركز رسالة تحذيرية حمراء تفيد بتشفير جميع الملفات مع طلب فدية بعملة البيتكوين (Ransomware / برمجية الفدية). ما هو رد الفعل التقني الفوري الإلزامي لإنقاذ باقي أجهزة الوحدة؟',
        N'المعلوماتية والمهارات الرقمية',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'فصل كابل الشبكة السلكي وإيقاف الواي فاي فوراً لعزل الجهاز المصاب ومنع انتقال البرمجية لباقي خوادم الوحدة، مع عدم إطفاء الجهاز لحفظ الأدلة في الذاكرة الحية (RAM) للمختصين.',
        N'["الاستجابة للحوادث السيبرانية الطارئة","احتواء انتشار البرمجيات الخبيثة"]',
        N'["SPEC-INFO","SPEC-SEC-ADMIN","SPEC-PJ"]',
        N'[{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":3},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":2},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":1.5}]',
        101,
        1, 0, 1
    );

    -- Question 102: Q-NUM-102 (المعلوماتية والمهارات الرقمية)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        102,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'INFORMATIQUE'),
        N'Q-NUM-102',
        N'عند حجز صورة فوتوغرافية رقمية التقطها مشتبه به لموقع حساس، ما هي البيانات الوصفية المخفية (Métadonnées EXIF) التي يمكن لتقني المعلوميات استخراجها للمساعدة في التحقيق الجنائي؟',
        N'المعلوماتية والمهارات الرقمية',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'بيانات EXIF تسجل تلقائياً نوع الكاميرا، والتاريخ والوقت بالثواني، وإحداثيات الموقع الجغرافي الدقيقة (GPS) التي التُقطت فيها الصورة ما لم يتم حجبها.',
        N'["التحليل الجنائي للوسائط الرقمية","استخراج بيانات EXIF الجغرافية"]',
        N'["SPEC-INFO","SPEC-PJ"]',
        N'[{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":3},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2.5}]',
        102,
        1, 0, 1
    );

    -- Question 103: Q-NUM-103 (المعلوماتية والمهارات الرقمية)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        103,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'INFORMATIQUE'),
        N'Q-NUM-103',
        N'في تقنيات التشفير غير المتماثل (Chiffrement asymétrique) المستخدمة في تأمين المراسلات العسكرية والمفاتيح العامة (PKI)، ما هو المبدأ الأساسي الذي يحقق سرية الرسالة؟',
        N'المعلوماتية والمهارات الرقمية',
        'QCM_UNIQUE',
        N'DIFFICILE',
        N'صعب',
        2,
        1.5,
        90,
        N'تُشفر الرسالة بالمفتاح العام (Clé publique) للمستلم الذي يعرفه الجميع، ولا يمكن فك تشفيرها وقراءتها إلا بواسطة المفتاح الخاص (Clé privée) الوحيد السري المحفوظ لدى المستلم.',
        N'["علم التعمية والتشفير","أمن الاتصالات الحساسة"]',
        N'["SPEC-INFO","SPEC-SEC-ADMIN"]',
        N'[{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":3},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":1.5}]',
        103,
        1, 0, 1
    );

    -- Question 104: Q-NUM-104 (المعلوماتية والمهارات الرقمية)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        104,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'INFORMATIQUE'),
        N'Q-NUM-104',
        N'عثر دركي على مفتاح تخزين (USB Flash Drive) جديد ومغلف ملقى على رصيف مرآب السيارات العسكري للوحدة. ما هو التصرف الأمني الصارم وفق بروتوكولات الدفاع السيبراني؟',
        N'المعلوماتية والمهارات الرقمية',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'حظر توصيله بأي حاسوب مهني قطعياً؛ قد يحتوي على برمجية خبيثة هجومية (مثل BadUSB)؛ يجب تسليمه لخلية المعلوميات لفحصه داخل بيئة معزولة تماماً (Sandbox).',
        N'["مكافحة هجمات الهندسة الاجتماعية المادية","حماية الحواسب العسكرية"]',
        N'["SPEC-INFO","SPEC-SEC-ADMIN","SPEC-INSTRUCTEUR"]',
        N'[{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":3},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":2},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":1.5}]',
        104,
        1, 0, 1
    );

    -- Question 105: Q-NUM-105 (المعلوماتية والمهارات الرقمية)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        105,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'INFORMATIQUE'),
        N'Q-NUM-105',
        N'في قاعدة بيانات السجلات القضائية، ما هي وظيفة استعلام لغة SQL التالي: SELECT * FROM VehiculesRecherches WHERE Matricule = ''12345-A-1''; ؟',
        N'المعلوماتية والمهارات الرقمية',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'يقوم الاستعلام بالبحث واسترجاع جميع بيانات وحقول المركبة المبحوث عنها التي تطابق صفيحة ترقيمها بالتحديد القيمة ''12345-A-1''.',
        N'["قواعد البيانات والاستعلام الرقمي","التنقيب في السجلات الإلكترونية"]',
        N'["SPEC-INFO","SPEC-SEC-ADMIN"]',
        N'[{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":3},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":2}]',
        105,
        1, 0, 1
    );

    -- Question 106: Q-NUM-106 (المعلوماتية والمهارات الرقمية)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        106,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'INFORMATIQUE'),
        N'Q-NUM-106',
        N'كيف تعمل شبكة التخفي والتشفير المعروفة بـ (Tor / The Onion Router) التي تستغلها عصابات الجريمة المنظمة على الويب المظلم (Darknet)؟',
        N'المعلوماتية والمهارات الرقمية',
        'QCM_UNIQUE',
        N'DIFFICILE',
        N'صعب',
        2,
        1.5,
        90,
        N'تمرير حركة البيانات عبر طبقات متعددة من العقد العشوائية المشفرة المتتالية (عقدة دخول، عقدة وسطى، وعقدة خروج) بحيث لا تعرف أي عقدة هوية المصدر والوجهة معاً.',
        N'["فهم الويب المظلم وتقنيات إخفاء الهوية","التحريات الرقمية المتقدمة"]',
        N'["SPEC-INFO","SPEC-PJ"]',
        N'[{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":3},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2.5}]',
        106,
        1, 0, 1
    );

    -- Question 107: Q-NUM-107 (المعلوماتية والمهارات الرقمية)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        107,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'INFORMATIQUE'),
        N'Q-NUM-107',
        N'لماذا يُمنع منعاً باتاً اعتماد بروتوكول التشفير القديم (WEP) في تأمين شبكات الواي فاي (Wi-Fi) التابعة للثكنات والوحدات العسكرية؟',
        N'المعلوماتية والمهارات الرقمية',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'بروتوكول WEP يعاني من ثغرات هيكلية قاتلة في خوارزمية التشفير تجعل مفتاح المرور قابلاً للاختراق والكسر التام خلال دقائق معدودة باستخدام أدوات مفتوحة المصدر.',
        N'["أمن الشبكات اللاسلكية","معايير التشفير والبروتوكولات"]',
        N'["SPEC-INFO","SPEC-PJ"]',
        N'[{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":3},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":1.5}]',
        107,
        1, 0, 1
    );

    -- Question 108: Q-NUM-108 (المعلوماتية والمهارات الرقمية)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        108,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'INFORMATIQUE'),
        N'Q-NUM-108',
        N'ما هو الخطر السيبراني المعروف بـ (انتحال الهوية الرقمية / Spoofing) في الاتصالات الهاتفية والرسائل؟',
        N'المعلوماتية والمهارات الرقمية',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'تزوير البيانات التعريفية للاتصال لإظهار رقم هاتف المتصل أو عنوان بريده على شاشة الضحية كرقم جهة رسمية أو موثوقة لخداعه وسرقة أسراره أو توجيه أوامر زائفة.',
        N'["كشف انتحال الشخصية الرقمية","التحقيق في الجرائم الإلكترونية"]',
        N'["SPEC-INFO","SPEC-PJ","SPEC-PJ"]',
        N'[{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":3},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":1.5}]',
        108,
        1, 0, 1
    );

    -- Question 109: Q-NUM-109 (المعلوماتية والمهارات الرقمية)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        109,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'INFORMATIQUE'),
        N'Q-NUM-109',
        N'أثناء تحريز قرص صلب يحتوي على وثائق هامة في قضية تجسس، لماذا يقوم المحقق الجنائي بحساب قيمة "دالة البصمة الرقمية" (Hash SHA-256) للملفات فور ضبطها؟',
        N'المعلوماتية والمهارات الرقمية',
        'QCM_UNIQUE',
        N'DIFFICILE',
        N'صعب',
        2,
        1.5,
        90,
        N'دالة البصمة الرياضية تنتج قيمة نصية وحيدة وفريدة؛ أي تغيير ولو في بت (Bit) واحد في الملف مستقبلاً سيغير قيمة الـ Hash، مما يقدم دليلاً رياضياً قاطعاً على سلامة الدليل وعدم تحريفه.',
        N'["الأدلة الجنائية الرقمية","إثبات سلامة وعدم تحريف الأدلة الحوسبية"]',
        N'["SPEC-INFO","SPEC-PJ","SPEC-PJ"]',
        N'[{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":3},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2.5},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":2}]',
        109,
        1, 0, 1
    );

    -- Question 110: Q-NUM-110 (المعلوماتية والمهارات الرقمية)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        110,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'INFORMATIQUE'),
        N'Q-NUM-110',
        N'ماذا يقتضي "مبدأ الامتياز الأدنى" (Principe du moindre privilège) في إدارة الصلاحيات للمستخدمين داخل المنظومات المعلوماتية للدرك الملكي؟',
        N'المعلوماتية والمهارات الرقمية',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'منح كل مستخدم فقط الحد الأدنى من الصلاحيات والوصول إلى الملفات والوظائف الضرورية بدقة لأداء مهامه الوظيفية المباشرة، وحجب أي وصول إضافي لتقليص مساحة المخاطر.',
        N'["سياسات التحكم بالوصول والحوكمة الرقمية","الأمن السيبراني المؤسساتي"]',
        N'["SPEC-INFO","SPEC-SEC-ADMIN"]',
        N'[{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":3},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":2}]',
        110,
        1, 0, 1
    );

    -- Question 111: Q-COM-111 (التواصل والتكوين)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        111,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'COMMUNICATION'),
        N'Q-COM-111',
        N'عند تأطير حصة تدريبية ميدانية في الرماية أو التكتيك لفائدة تلاميذ الدرك الملكي، ما هي المنهجية البيداغوجية العسكرية الفعالة لترسيخ المهارة الحركية بأمان تام؟',
        N'التواصل والتكوين',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'المنهجية النموذجية تعتمد التسلسل: الشرح النظري المبسط، يليه العرض البيداغوجي النموذجي من المؤطر (Démonstration)، ثم التطبيق والمحاكاة الفردية من المتدربين مع التصحيح الفوري للأخطاء.',
        N'["البيداغوجيا العسكرية والتعليم الفعال","نقل المهارات والتأطير الميداني"]',
        N'["SPEC-INSTRUCTEUR","SPEC-PSIG"]',
        N'[{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":3},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":1.5}]',
        111,
        1, 0, 1
    );

    -- Question 112: Q-COM-112 (التواصل والتكوين)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        112,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'COMMUNICATION'),
        N'Q-COM-112',
        N'أثناء حادث بارز ومثير للرأي العام، حاول صحفيون استجواب دركي بالشارع حول تفاصيل التحقيق وهوية الضحايا. ما هو السلوك الإعلامي والقانوني السليم؟',
        N'التواصل والتكوين',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'احترام السر المهني وسرية البحث القضائي؛ التزام التحفظ والامتناع عن الإدلاء بأي تصريحات غير مرخصة وتوجيه وسائل الإعلام بلباقة إلى الناطق الرسمي المعتمد أو بلاغات النيابة العامة.',
        N'["التواصل في الأزمات وحماية سرية التحقيق","التقيد بالضوابط الإعلامية المؤسساتية"]',
        N'["SPEC-PJ","SPEC-INSTRUCTEUR","SPEC-PJ"]',
        N'[{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":2.5},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":2},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2}]',
        112,
        1, 0, 1
    );

    -- Question 113: Q-COM-113 (التواصل والتكوين)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        113,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'COMMUNICATION'),
        N'Q-COM-113',
        N'تقدم مواطن في حالة صدمة وحزن شديد إلى مكتب الاستقبال بمركز الدرك للإبلاغ عن تعرضه لاعتداء واحتجاز. ما هي المهارة التواصلية الأولى الواجب إظهارها من عنصر الاستقبال؟',
        N'التواصل والتكوين',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'إظهار الإنصات الإيجابي (Écoute active)، وتهدئة روع الضحية، وتوفير بيئة آمنة وكريمة، والتعامل باحترام وتعاطف إنساني مسؤول قبل الشروع في الإجراءات الإدارية والقضائية.',
        N'["الاستماع الفعال واستقبال المرتفقين والضحايا","الذكاء العاطفي والتواصل المهني"]',
        N'["SPEC-INSTRUCTEUR","SPEC-SEC-ADMIN","SPEC-PJ"]',
        N'[{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":2.5},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":2.5},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":1.5}]',
        113,
        1, 0, 1
    );

    -- Question 114: Q-COM-114 (التواصل والتكوين)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        114,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'COMMUNICATION'),
        N'Q-COM-114',
        N'في نقل وتوجيه الأوامر التكتيكية قبل انطلاق مهمة أمنية، ما هو الهيكل المعياري المعمول به لضمان شمولية ووضوح أمر العمليات (نموذج SMEAC)؟',
        N'التواصل والتكوين',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'نموذج SMEAC القيادي: الموقف العام (Situation)، المهمة المحددة (Mission)، خطة التنفيذ (Exécution)، الدعم اللوجستي والإداري (Administration)، والقيادة والمواصلات (Commandement).',
        N'["صياغة وتمرير الأوامر العسكرية","الوضوح الإجرائي والتنسيق التكتيكي"]',
        N'["SPEC-INSTRUCTEUR","SPEC-PSIG","SPEC-GEH"]',
        N'[{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":2.5},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2.5},{"code":"SPEC-GEH","specialite":"GEH","poids":1.5}]',
        114,
        1, 0, 1
    );

    -- Question 115: Q-COM-115 (التواصل والتكوين)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        115,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'COMMUNICATION'),
        N'Q-COM-115',
        N'ما هو الهدف الجوهري من جلسة "استخلاص الدروس والتقييم اللاحق" (Retour d''expérience - RETEX) المنظمة مباشرة بعد انتهاء عملية أمنية معقدة؟',
        N'التواصل والتكوين',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'تحليل مجريات التدخل بموضوعية، وتشخيص نقاط القوة لترسيخها، وتحديد النقائص لتفادي تكرارها وتطوير المهارات التكتيكية للفريق، وليس البحث عن كبش فداء أو التوبيخ الشخصي.',
        N'["ثقافة التعلم المؤسساتي والتقييم البناء","التطوير المستمر للكفاءات"]',
        N'["SPEC-INSTRUCTEUR","SPEC-PSIG","SPEC-SEC-ADMIN"]',
        N'[{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":3},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":1.5}]',
        115,
        1, 0, 1
    );

    -- Question 116: Q-COM-116 (التواصل والتكوين)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        116,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'COMMUNICATION'),
        N'Q-COM-116',
        N'عايش دركي حدثاً صادماً ومؤلماً أثناء انتشال ضحايا حادث مأساوي، ولاحظ زملاؤه انطواءه التام وشروده المتواصل وتدهور نومه. ما هو أسلوب الدعم الإنساني والتواصلي الأنسب لمساعدته؟',
        N'التواصل والتكوين',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'التضامن الرفاقي الإيجابي بالاستماع الأخوي دون لوم، وإشعار القيادة الطبية بلباقة لتمكينه من دعم نفسي متخصص لتجاوز متلازمة ما بعد الصدمة (PTSD).',
        N'["الدعم النفسي والمرافقة الميدانية","الذكاء العلائقي في البيئة العسكرية"]',
        N'["SPEC-INSTRUCTEUR","SPEC-PSIG","SPEC-GEH"]',
        N'[{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":2.5},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2},{"code":"SPEC-GEH","specialite":"GEH","poids":1.5}]',
        116,
        1, 0, 1
    );

    -- Question 117: Q-COM-117 (التواصل والتكوين)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        117,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'COMMUNICATION'),
        N'Q-COM-117',
        N'كُلّف دركي بإلقاء عرض تحسيسي حول السلامة الطرقية أمام تلاميذ ثانوية تأهيلية. ما هي القاعدة الأساسية لنجاح هذا التواصل التربوي والتوجيهي؟',
        N'التواصل والتكوين',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'ملاءمة الخطاب للجمهور المستهدف (لغة بسيطة وتفاعلية)، واستخدام وسائط بصرية مشوقة، وفتح باب الحوار، والتركيز على الإقناع بدلاً من الترهيب الجاف.',
        N'["التواصل العمومي والتحسيس التربوي","الخطابة ومخاطبة الجمهور الناشئ"]',
        N'["SPEC-INSTRUCTEUR","SPEC-MOTARD"]',
        N'[{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":3},{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2}]',
        117,
        1, 0, 1
    );

    -- Question 118: Q-COM-118 (التواصل والتكوين)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        118,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'COMMUNICATION'),
        N'Q-COM-118',
        N'في تقنيات "نزع فتيل التوتر اللفظي" (Désescalade) مع مواطن غاضب يرفع صوته محتجاً، ما هي الخطوة التواصلية التي تساعد على امتصاص غضبه بفعالية؟',
        N'التواصل والتكوين',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'إعادة صياغة شكواه بهدوء (Reformulation) للتأكيد على سماعه وفهم المشكلة ("أنا أتفهم استياءك وسأشرح لك المسطرة القانونية") مع خفض نبرة الصوت لفرض الهدوء المتبادل.',
        N'["إدارة الانفعالات والتهدئة التواصلية","التواصل المهني الراقي"]',
        N'["SPEC-INSTRUCTEUR","SPEC-PSIG","SPEC-MOTARD"]',
        N'[{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":2.5},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2},{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":1.5}]',
        118,
        1, 0, 1
    );

    -- Question 119: Q-COM-119 (التواصل والتكوين)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        119,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'COMMUNICATION'),
        N'Q-COM-119',
        N'عند تقييم كفاءة تلميذ دركي في نهاية دورة تكوينية، ما الذي يضمن نزاهة ومصداقية التقييم البيداغوجي وفق معايير مدارس التكوين؟',
        N'التواصل والتكوين',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'الاعتماد على شبكة تقييم معيارية محددة المعايير (Grille critériée) قائمة على مؤشرات أداء قابلة للملاحظة والقياس العملي، وتجنب الانطباعات الذاتية أو العاطفية للمؤطر.',
        N'["التقييم البيداغوجي الموضوعي","معايير جودة التكوين العسكري"]',
        N'["SPEC-INSTRUCTEUR","SPEC-SEC-ADMIN"]',
        N'[{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":3},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":2}]',
        119,
        1, 0, 1
    );

    -- Question 120: Q-COM-120 (التواصل والتكوين)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        120,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'COMMUNICATION'),
        N'Q-COM-120',
        N'عند رفع تقرير شفوي عملياتي فوري (Compte-rendu verbal) إلى القائد التسلسلي عقب تدخل طارئ، ما هي القاعدة التواصلية التي يجب احترامها لتفادي الغموض وهدر الوقت؟',
        N'التواصل والتكوين',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'قاعدة الإيجاز والدقة والوضوح (قاعدة 3C: Clair, Concis, Précis) عبر الإجابة المباشرة: من، ماذا حدث، أين، متى، وما هي الإجراءات المتخذة والاحتياجات الحالية فوراً.',
        N'["الإيجاز والدقة في التبليغ العملياتي","التواصل الصاعد في السلسلة القيادية"]',
        N'["SPEC-INSTRUCTEUR","SPEC-PSIG","SPEC-SEC-ADMIN"]',
        N'[{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":2.5},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":2}]',
        120,
        1, 0, 1
    );

    -- Question 121: Q-ADM-121 (الإدارة والسكرتارية)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        121,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'SECRETARIAT'),
        N'Q-ADM-121',
        N'عند استقبال مراسلة رسمية سرية واردة من القيادة العليا في مكتب الضبط (Bureau d''ordre)، ما هو الإجراء الإداري والتنظيمي الأول الواجب تسجيله فوراً؟',
        N'الإدارة والسكرتارية',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'تسجيل المراسلة فوراً بسجل البريد الوارد (Registre d''arrivée) برقم تسلسلي، وتاريخ وساعة الاستلام، وتحديد المصدر والموضوع، وعرضها فوراً على القائد المباشر دون تأخير.',
        N'["تدبير مكتب الضبط والمراسلات الإدارية","التوثيق وحفظ السرية"]',
        N'["SPEC-SEC-ADMIN","SPEC-PJ"]',
        N'[{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":3},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":1.5}]',
        121,
        1, 0, 1
    );

    -- Question 122: Q-ADM-122 (الإدارة والسكرتارية)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        122,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'SECRETARIAT'),
        N'Q-ADM-122',
        N'في تدبير أرشيف الوحدة العسكرية، ما هي القاعدة التنظيمية المعتمدة لترتيب وحفظ الملفات الإدارية والقضائية المنتهية لضمان استرجاعها السريع عند الطلب؟',
        N'الإدارة والسكرتارية',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'التصنيف المنهجي المعياري وفق خطة حفظ معتمدة (ترتيب زمني موضوعاتي مع رمز تعريفي وفهرس رقمي موحد) داخل علب أرشيف مؤمنة ضد الرطوبة والحريق والعبث.',
        N'["الأرشفة والتصنيف الإداري المحكم","التنظيم الوثائقي"]',
        N'["SPEC-SEC-ADMIN","SPEC-INFO","SPEC-PJ"]',
        N'[{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":3},{"code":"SPEC-INFO","specialite":"الإعلاميات","poids":2},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":1.5}]',
        122,
        1, 0, 1
    );

    -- Question 123: Q-ADM-123 (الإدارة والسكرتارية)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        123,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'SECRETARIAT'),
        N'Q-ADM-123',
        N'ما هي الخاصية التعبيرية والأسلوبية المميزة للتحرير الإداري العسكري في صياغة "المذكرة المصلحية" (Note de service) أو "تقرير الإحالة"؟',
        N'الإدارة والسكرتارية',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'الأسلوب الإداري العسكري يتميز بالتجرد والموضوعية، والوضوح، والإيجاز، واحترام السلم الإداري، واستخدام الصيغ الرسمية المحددة بدقة دون مشاعر أو مبالغات إنشائية.',
        N'["التحرير الإداري العسكري","الدقة والأسلوب الرسمي الرصين"]',
        N'["SPEC-SEC-ADMIN","SPEC-PJ","SPEC-INSTRUCTEUR"]',
        N'[{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":3},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":2},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":1.5}]',
        123,
        1, 0, 1
    );

    -- Question 124: Q-ADM-124 (الإدارة والسكرتارية)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        124,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'SECRETARIAT'),
        N'Q-ADM-124',
        N'عند إعداد جدول نوبات الحراسة والدوريات الشهرية (Tableau de service) للوحدة، ما هو المبدأ التسييري الأساسي الذي يضمن الجاهزية والعدالة؟',
        N'الإدارة والسكرتارية',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'ضمان التوازن بين متطلبات الجاهزية الأمنية الدائمة للوحدة واحترام فترات الراحة القانونية، مع التوزيع العادل للمهام بين كافة الأفراد وتجنب المحاباة أو الإرهاق المفرط.',
        N'["التخطيط الإداري وتدبير الموارد البشرية","تنظيم جداول الخدمة والجاهزية"]',
        N'["SPEC-SEC-ADMIN","SPEC-PSIG"]',
        N'[{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":3},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":1.5}]',
        124,
        1, 0, 1
    );

    -- Question 125: Q-ADM-125 (الإدارة والسكرتارية)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        125,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'SECRETARIAT'),
        N'Q-ADM-125',
        N'في تدبير ملفات المسار المهني والترقية والتنقيط السنوي للأفراد (Chancellerie et avancement)، ما هي المسؤولية الأخلاقية والإدارية الملقاة على عاتق كاتب السكرتارية؟',
        N'الإدارة والسكرتارية',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'الكتمان المطلق للسر المهني وحفظ سرية النقط والملاحظات التأديبية والترقيات، والدقة الصارمة في تدوين الأقدمية والأوسمة والشهادات دون أي تحريف أو إهمال.',
        N'["كتمان السر المهني للأفراد","الدقة والأمانة الإدارية"]',
        N'["SPEC-SEC-ADMIN","SPEC-PJ","SPEC-INSTRUCTEUR"]',
        N'[{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":3},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":2},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":1.5}]',
        125,
        1, 0, 1
    );

    -- Question 126: Q-DIS-126 (المواقف المهنية والانضباط)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        126,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DISCIPLINE'),
        N'Q-DIS-126',
        N'تلقى دركي أمراً صريحاً من رئيسه المباشر بإخفاء سلاح ناري غير مرخص تم حجزه أثناء تفتيش وعدم تضمينه في المحضر الرسمي. ما هو الموقف القانوني والأخلاقي العسكري الإلزامي؟',
        N'المواقف المهنية والانضباط',
        'QCM_UNIQUE',
        N'DIFFICILE',
        N'صعب',
        2,
        1.5,
        90,
        N'تنص القوانين والأنظمة العسكرية على أن واجب الطاعة يسقط إذا كان الأمر الصادر غير مشروع بشكل صريح ويشكل جريمة قانونية خطيرة؛ يجب رفض التنفيذ وإشعار المستوى القيادي الأعلى فوراً.',
        N'["حدود الطاعة العسكرية والأمر غير المشروع","الاستقامة القانونية والنزاهة"]',
        N'["SPEC-PJ","SPEC-PJ","SPEC-INSTRUCTEUR"]',
        N'[{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":3},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2.5},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":2}]',
        126,
        1, 0, 1
    );

    -- Question 127: Q-DIS-127 (المواقف المهنية والانضباط)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        127,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DISCIPLINE'),
        N'Q-DIS-127',
        N'ما الذي يمثله الارتداء السليم والمتكامل للبذلة العسكرية والشارات النظامية للدرك الملكي في الشارع العام؟',
        N'المواقف المهنية والانضباط',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'الهندام العسكري المنضبط يجسد هيبة وسيادة الدولة، ويعزز الثقة والاحترام لدى المواطنين، ويعكس الصرامة والانضباط الذاتي الداخلي للمؤسسة العسكرية العريقة.',
        N'["الهندام العسكري والتمثيل المؤسساتي","الانضباط والوقار المهني"]',
        N'["SPEC-GEH","SPEC-INSTRUCTEUR","SPEC-PSIG"]',
        N'[{"code":"SPEC-GEH","specialite":"GEH","poids":3},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":2.5},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":1.5}]',
        127,
        1, 0, 1
    );

    -- Question 128: Q-DIS-128 (المواقف المهنية والانضباط)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        128,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DISCIPLINE'),
        N'Q-DIS-128',
        N'قام دركي بنشر مقطع فيديو على منصة (تيك توك) يظهر فيه بالبذلة العسكرية الرسمية داخل مرآب الثكنة وهو يغني ويعلق بسخرية على بعض التوجيهات اليومية. ما التقييم التأديبي لهذا التصرف؟',
        N'المواقف المهنية والانضباط',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'مخالفة جسيمة وصريحة لواجب التحفظ والسر العسكري وقواعد استعمال وسائل التواصل الاجتماعي، تعرض صاحبها لعقوبات تأديبية صارمة للمساس بصورة وهيبة السلك.',
        N'["واجب التحفظ واستخدام شبكات التواصل الاجتماعي","الانضباط العسكري الرقمي"]',
        N'["SPEC-INSTRUCTEUR","SPEC-PJ","SPEC-SEC-ADMIN"]',
        N'[{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":3},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":2.5},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":1.5}]',
        128,
        1, 0, 1
    );

    -- Question 129: Q-DIS-129 (المواقف المهنية والانضباط)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        129,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DISCIPLINE'),
        N'Q-DIS-129',
        N'أثناء فترة إجازته السنوية وارتدائه ملابس مدنية، شاهد دركي شخصاً يقود بتهور كاد يدهس مارة في حي سكني. ما هو الموقف المهني والأخلاقي السليم؟',
        N'المواقف المهنية والانضباط',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'صفة الدركي ورسالته في حماية المواطنين تلازمه دائماً؛ يتدخل بحكمة عبر إشعار مصالح الأمن أو الدرك المحلية فوراً برقم السيارة وأوصافها، والتدخل المباشر فقط في حدود الضرورة ودون تهور.',
        N'["استمرارية الواجب الأخلاقي والصفة الضبطية","حماية الأمن العام في كل الظروف"]',
        N'["SPEC-PJ","SPEC-PSIG","SPEC-MOTARD"]',
        N'[{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":2.5},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2},{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2}]',
        129,
        1, 0, 1
    );

    -- Question 130: Q-DIS-130 (المواقف المهنية والانضباط)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        130,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DISCIPLINE'),
        N'Q-DIS-130',
        N'حُدد موعد تجمع وانطلاق دورية أمنية على الساعة 08:00 صباحاً. متى يجب على الدركي المنضبط الحضور الفعلي في مكان الاستعداد؟',
        N'المواقف المهنية والانضباط',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'القاعدة العسكرية الراسخة: "الدقة في الموعد أدب الملوك والواجب العسكري الأول"؛ الحضور قبل الموعد بـ 15 إلى 20 دقيقة لاستلام وفحص السلاح والمعدات وجاهزية المركبة قبل ساعة الانطلاق.',
        N'["الانضباط الزمني والدقة العسكرية","الاستعداد المسبق للمهام"]',
        N'["SPEC-GEH","SPEC-PSIG","SPEC-INSTRUCTEUR"]',
        N'[{"code":"SPEC-GEH","specialite":"GEH","poids":3},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2.5},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":2}]',
        130,
        1, 0, 1
    );

    -- Question 131: Q-DIS-131 (المواقف المهنية والانضباط)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        131,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DISCIPLINE'),
        N'Q-DIS-131',
        N'ما هو المفهوم الحقيقي لـ "روح الفريق والتضامن العسكري" (Esprit de corps) بين عناصر الدرك الملكي؟',
        N'المواقف المهنية والانضباط',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'روح الفريق تعني التآزر والمساندة الميدانية المخلصة، والتضحية لإنجاح المهمة وحماية سلامة الزملاء، دون أن تتحول أبداً إلى تواطؤ سلبي للتستر على الجرائم أو الخيانات المهنية.',
        N'["روح الجماعة والتضامن الأخلاقي","التماسك والتعاون المهني النزيه"]',
        N'["SPEC-PSIG","SPEC-GSI","SPEC-INSTRUCTEUR"]',
        N'[{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2.5},{"code":"SPEC-GSI","specialite":"GSI","poids":2.5},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":2}]',
        131,
        1, 0, 1
    );

    -- Question 132: Q-DIS-132 (المواقف المهنية والانضباط)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        132,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DISCIPLINE'),
        N'Q-DIS-132',
        N'لماذا يفرض القانون والأنظمة العسكرية على رجل الدرك الملكي الحياد السياسي والنقابي التام والمطلق؟',
        N'المواقف المهنية والانضباط',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'لضمان خدمة الوطن والشعب بتجرد مطلق ومساواة بين جميع المواطنين، وحماية المؤسسة العسكرية والأمنية من الانقسامات الأيديولوجية والتجاذبات الحزبية.',
        N'["الحياد السياسي والمؤسساتي","أخلاقيات المرفق الأمني والعسكري"]',
        N'["SPEC-PJ","SPEC-INSTRUCTEUR","SPEC-SEC-ADMIN"]',
        N'[{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":3},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":2},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":1.5}]',
        132,
        1, 0, 1
    );

    -- Question 133: Q-DIS-133 (المواقف المهنية والانضباط)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        133,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DISCIPLINE'),
        N'Q-DIS-133',
        N'في ميدان الرماية بالرصاص الحي (Stand de tir)، صاح المدرب فجأة وبصوت قوي: "قف! أوقفوا النار!". ما هو الإجراء الفوري الإلزامي لجميع الرماة؟',
        N'المواقف المهنية والانضباط',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'التوقف الفوري والتام عن الرماية، ورفع الإصبع خارج الزناد، وإبقاء فوهة السلاح في اتجاه الأهداف الآمنة، ووضع السلاح في وضع التأمين وانتظار التعليمات التالية.',
        N'["الانضباط التكتيكي الصارم في الرماية","السلامة الحيوية في ميدان النار"]',
        N'["SPEC-GSI","SPEC-INSTRUCTEUR","SPEC-PSIG"]',
        N'[{"code":"SPEC-GSI","specialite":"GSI","poids":3},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":2.5},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2}]',
        133,
        1, 0, 1
    );

    -- Question 134: Q-DIS-134 (المواقف المهنية والانضباط)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        134,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DISCIPLINE'),
        N'Q-DIS-134',
        N'أثناء مراقبة روتينية للسيارات، تبين أن السائق المخالف قريب شخصي للدركي، فطلب منه إعفاءه من تسجيل المخالفة قائلاً: "أنا من العائلة وعليك حمايتي". كيف يتصرف الدركي النزيه؟',
        N'المواقف المهنية والانضباط',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'سيادة القانون تعلو فوق كل الروابط العائلية؛ يجب تطبيق الإجراءات القانونية المحددة بعدل وهدوء ولباقة، أو التماس تسليم تدبير المخالفة للزميل المرافق درءاً لأي شبهة محاباة.',
        N'["مقاومة المحاباة والمحسوبية","سيادة القانون والتجرد الوظيفي"]',
        N'["SPEC-PJ","SPEC-INSTRUCTEUR","SPEC-MOTARD"]',
        N'[{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":3},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":2.5},{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2}]',
        134,
        1, 0, 1
    );

    -- Question 135: Q-DIS-135 (المواقف المهنية والانضباط)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        135,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DISCIPLINE'),
        N'Q-DIS-135',
        N'التقى دركي بالزي النظامي في ساحة الثكنة بضابط يرتدي زيه العسكري لكنه لا ينتمي لنفس وحدته ولا يعرفه شخصياً. ما هو الواجب الانضباطي العسكري المباشر؟',
        N'المواقف المهنية والانضباط',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'التحية العسكرية تؤدى للرتبة والرمزية العسكرية والوطنية للزي وليس للشخص بحد ذاته؛ يجب تأدية التحية العسكرية النظامية بصرامة واعتزاز فور الالتقاء بأي رئيس تسلسلي أعلى رتبة.',
        N'["التقاليد والتحية العسكرية","احترام الرتب والتراتبية الهرمية"]',
        N'["SPEC-GEH","SPEC-INSTRUCTEUR","SPEC-PSIG"]',
        N'[{"code":"SPEC-GEH","specialite":"GEH","poids":3},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":2.5},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":1.5}]',
        135,
        1, 0, 1
    );

    -- Question 136: Q-DIS-136 (المواقف المهنية والانضباط)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        136,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DISCIPLINE'),
        N'Q-DIS-136',
        N'أثناء مناورة ركن سيارة المصلحة العسكرية، اصطدمت المركبة بخفة بعمود إنارة مما تسبب في خدش طفيف في الصباغة الخلفية دون وجود شهود. ما هو السلوك المهني النزيه الواجب اتخاذه؟',
        N'المواقف المهنية والانضباط',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'الشجاعة الأدبية والنزاهة العسكرية تقتضي الإبلاغ الفوري للقائد التسلسلي وإنجاز تقرير عن الحادث العرضي لإصلاحه، وتجنب إخفاء العيوب أو تبرئة النفس بالباطل.',
        N'["الأمانة في صيانة ممتلكات الدولة","الشجاعة الأدبية والمسؤولية الذاتية"]',
        N'["SPEC-INSTRUCTEUR","SPEC-MOTARD","SPEC-SEC-ADMIN"]',
        N'[{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":2.5},{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2},{"code":"SPEC-SEC-ADMIN","specialite":"الإدارة والسكرتارية","poids":1.5}]',
        136,
        1, 0, 1
    );

    -- Question 137: Q-DIS-137 (المواقف المهنية والانضباط)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        137,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DISCIPLINE'),
        N'Q-DIS-137',
        N'ما هي المبادئ الدستورية والأخلاقية الصارمة التي تحكم لجوء رجل الدرك لاستعمال "القوة المشروعة" (Force légitime) عند تنفيذ مهامه؟',
        N'المواقف المهنية والانضباط',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'استخدام القوة يجب أن يخضع دائماً لمبادئ: الشرعية القانونية (Légalité)، والضرورة القصوى (Nécessité)، والتناسب الدقيق مع حجم الخطر (Proportionnalité)، والتوقف الفوري بمجرد زوال التهديد.',
        N'["مشروعية وتناسب استخدام القوة","حقوق الإنسان وحماية الحريات"]',
        N'["SPEC-PJ","SPEC-GSI","SPEC-PSIG"]',
        N'[{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":3},{"code":"SPEC-GSI","specialite":"GSI","poids":2.5},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2}]',
        137,
        1, 0, 1
    );

    -- Question 138: Q-DIS-138 (المواقف المهنية والانضباط)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        138,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DISCIPLINE'),
        N'Q-DIS-138',
        N'عاد دركي إلى منزله بعد المشاركة في عملية حساسة لتفكيك شبكة تهريب دولية لم يتم الإعلان عنها بعد. سألته زوجته وأقاربه بفضول عن سبب تأخره وماهية العملية. كيف يتعامل مع هذا الموقف؟',
        N'المواقف المهنية والانضباط',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'الحفاظ الصارم على كتمان السر المهني العسكري حتى داخل الدائرة الأسرية؛ التوضيح بلباقة ومودة أن طبيعة المهام تحظر الخوض في التفاصيل العملياتية حماية لأمن الوطن وسلامة الأسرة ذاتها.',
        N'["كتمان أسرار الدفاع والأمن","الفصل الحازم بين العمل والحياة الأسرية"]',
        N'["SPEC-INSTRUCTEUR","SPEC-PJ","SPEC-PJ"]',
        N'[{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":2.5},{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":2.5},{"code":"SPEC-PJ","specialite":"الشرطة القضائية","poids":2}]',
        138,
        1, 0, 1
    );

    -- Question 139: Q-DIS-139 (المواقف المهنية والانضباط)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        139,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DISCIPLINE'),
        N'Q-DIS-139',
        N'أثناء ضبط حركة المرور، قام سائق غاضب بتوجيه شتائم نابية ومستفزة للدركي أمام الملأ. ما هو التصرف الاحترافي والمنضبط لمواجهة هذا الموقف؟',
        N'المواقف المهنية والانضباط',
        'QCM_UNIQUE',
        N'MOYEN',
        N'متوسط',
        1,
        1.25,
        90,
        N'التحلي بأعلى درجات ضبط النفس وعدم النزول لمستوى الشتم أو العنف البدني، وتثبيت واقعة "إهانة موظف عمومي أثناء قيامه بمهامه" قانونياً عبر الشهود والمحضر وإحالة المعتدي للعدالة.',
        N'["ضبط النفس والتحكم في الغضب","الردع القانوني لجريمة إهانة موظف عمومي"]',
        N'["SPEC-PJ","SPEC-INSTRUCTEUR","SPEC-MOTARD"]',
        N'[{"code":"SPEC-PJ","specialite":"المجال القانوني","poids":3},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":2.5},{"code":"SPEC-MOTARD","specialite":"الدراجات النارية / السلامة الطرقية","poids":2}]',
        139,
        1, 0, 1
    );

    -- Question 140: Q-DIS-140 (المواقف المهنية والانضباط)
    INSERT INTO dbo.Questions (
        QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel,
        TypeQuestion, Difficulte, DifficulteArabe, Points, Coefficient,
        TempsLimiteSecondes, Explication, CompetencesAssociees,
        SpecialitesAssociees, SpecialitesPonderation, OrdreAffichage, EstActive, EstArchivee, Version
    )
    VALUES (
        140,
        @TestId,
        (SELECT DomaineId FROM dbo.DomainesCompetences WHERE Code = 'DISCIPLINE'),
        N'Q-DIS-140',
        N'ما هو المعنى السامي لشعار الدرك الملكي الخالد "الله - الوطن - الملك" في وجدان وسلوك كل تلميذ ودركي في كل الميادين؟',
        N'المواقف المهنية والانضباط',
        'QCM_UNIQUE',
        N'FACILE',
        N'سهل',
        1,
        1,
        90,
        N'الشعار يجسد العقيدة الوطنية الراسخة: الإخلاص لله في أداء الأمانة، والتضحية والذود عن حوزة الوطن وسلامة أراضيه، والوفاء الدائم والولاء المطلق للقائد الأعلى ورئيس أركان الحرب العامة للقوات المسلحة الملكية.',
        N'["العقيدة العسكرية والروح الوطنية","الالتزام التام بثوابت الأمة والواجب المقدس"]',
        N'["SPEC-GEH","SPEC-INSTRUCTEUR","SPEC-PSIG","SPEC-GSI"]',
        N'[{"code":"SPEC-GEH","specialite":"GEH","poids":3},{"code":"SPEC-INSTRUCTEUR","specialite":"التكوين والتعليم","poids":3},{"code":"SPEC-PSIG","specialite":"العمليات الميدانية","poids":2},{"code":"SPEC-GSI","specialite":"GSI","poids":2}]',
        140,
        1, 0, 1
    );

    SET IDENTITY_INSERT dbo.Questions OFF;
    PRINT '[OK] 140 Questions insérées dans dbo.Questions.';

    -- Insertion des Options de réponse
    SET IDENTITY_INSERT dbo.OptionsReponse ON;

    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        101,
        1,
        N'A',
        N'أ',
        N'جميع سيارات الدرك الملكي بدون استثناء مجهزة بالنظام المشفر',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        102,
        1,
        N'B',
        N'ب',
        N'بعض سيارات الدرك الملكي على الأقل مجهزة بنظام الاتصال المشفر',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        103,
        1,
        N'C',
        N'ج',
        N'لا توجد أي سيارة تابعة للدرك الملكي تستخدم الاتصال المشفر',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        104,
        1,
        N'D',
        N'د',
        N'الاتصال المشفر مخصص فقط للشاحنات اللوجستية الثقيلة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        201,
        2,
        N'A',
        N'أ',
        N'10:00',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        202,
        2,
        N'B',
        N'ب',
        N'10:15',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        203,
        2,
        N'C',
        N'ج',
        N'10:30',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        204,
        2,
        N'D',
        N'د',
        N'10:45',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        301,
        3,
        N'A',
        N'أ',
        N'الضابط (أ)',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        302,
        3,
        N'B',
        N'ب',
        N'الرقيب (ب)',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        303,
        3,
        N'C',
        N'ج',
        N'الرقيب (ج)',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        304,
        3,
        N'D',
        N'د',
        N'المساعد (د)',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        401,
        4,
        N'A',
        N'أ',
        N'العنصر (س)',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        402,
        4,
        N'B',
        N'ب',
        N'العنصر (ق)',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        403,
        4,
        N'C',
        N'ج',
        N'العنصر (ص)',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        404,
        4,
        N'D',
        N'د',
        N'العنصر (ع)',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        501,
        5,
        N'A',
        N'أ',
        N'إذا تم إغلاق المعبر (ب)، فإن الخطة (أ) قد تم تفعيلها بالضرورة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        502,
        5,
        N'B',
        N'ب',
        N'إذا لم يتم إغلاق المعبر الحدودي (ب)، فإن خطة الطوارئ (أ) لم تفعل حتماً',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        503,
        5,
        N'C',
        N'ج',
        N'إذا لم تفعل الخطة (أ)، فلن يغلق المعبر (ب) أبداً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        504,
        5,
        N'D',
        N'د',
        N'إغلاق المعبر لا يرتبط بأي خطة أمنية مسبقة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        601,
        6,
        N'A',
        N'أ',
        N'108',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        602,
        6,
        N'B',
        N'ب',
        N'144',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        603,
        6,
        N'C',
        N'ج',
        N'162',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        604,
        6,
        N'D',
        N'د',
        N'180',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        701,
        7,
        N'A',
        N'أ',
        N'كل بنادق المستودع مصنوعة حتماً من التيتانيوم',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        702,
        7,
        N'B',
        N'ب',
        N'يوجد أسلحة مرقمة داخل المستودع',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        703,
        7,
        N'C',
        N'ج',
        N'لا توجد بنادق مصنوعة من التيتانيوم إطلاقاً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        704,
        7,
        N'D',
        N'د',
        N'جميع المسدسات الفردية غير مرقمة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        801,
        8,
        N'A',
        N'أ',
        N'45 دقيقة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        802,
        8,
        N'B',
        N'ب',
        N'50 دقيقة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        803,
        8,
        N'C',
        N'ج',
        N'60 دقيقة (ساعة واحدة)',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        804,
        8,
        N'D',
        N'د',
        N'70 دقيقة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        901,
        9,
        N'A',
        N'أ',
        N'توقف فوري وشامل',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        902,
        9,
        N'B',
        N'ب',
        N'استعد للتحرك أو اتخاذ الموقع',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        903,
        9,
        N'C',
        N'ج',
        N'انسحاب تكتيكي للخلف',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        904,
        9,
        N'D',
        N'د',
        N'طلب إمداد بالوقود',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1001,
        10,
        N'A',
        N'أ',
        N'6 أضلاع',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1002,
        10,
        N'B',
        N'ب',
        N'7 أضلاع (مسبع)',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1003,
        10,
        N'C',
        N'ج',
        N'8 أضلاع',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1004,
        10,
        N'D',
        N'د',
        N'9 أضلاع',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1101,
        11,
        N'A',
        N'أ',
        N'علي',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1102,
        11,
        N'B',
        N'ب',
        N'حسن',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1103,
        11,
        N'C',
        N'ج',
        N'عمر',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1104,
        11,
        N'D',
        N'د',
        N'لا يمكن تحديده رياضياً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1201,
        12,
        N'A',
        N'أ',
        N'30',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1202,
        12,
        N'B',
        N'ب',
        N'25',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1203,
        12,
        N'C',
        N'ج',
        N'20',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1204,
        12,
        N'D',
        N'د',
        N'15',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1301,
        13,
        N'A',
        N'أ',
        N'جميع المعدات العسكرية الثقيلة تسجل في الدفتر الرسمي بالضرورة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1302,
        13,
        N'B',
        N'ب',
        N'المعدات الخفيفة فقط هي التي تسجل في الدفتر',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1303,
        13,
        N'C',
        N'ج',
        N'الدفتر الرسمي لا يحتوي على أي معدات ثقيلة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1304,
        13,
        N'D',
        N'د',
        N'الصيانة الشهرية اختيارية وليست إلزامية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1401,
        14,
        N'A',
        N'أ',
        N'1/3 من الخزان',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1402,
        14,
        N'B',
        N'ب',
        N'4/9 من الخزان',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1403,
        14,
        N'C',
        N'ج',
        N'1/2 من الخزان',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1404,
        14,
        N'D',
        N'د',
        N'يفرغ تماماً ويصل للصفر',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1501,
        15,
        N'A',
        N'أ',
        N'ضرب عدد حروف الكلمة في تاريخ اليوم',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1502,
        15,
        N'B',
        N'ب',
        N'إبدال كل حرف بالرتبة الأبجدية المحددة في مصفوفة التشفير',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1503,
        15,
        N'C',
        N'ج',
        N'اختيار الأرقام عشوائياً دون أي قاعدة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1504,
        15,
        N'D',
        N'د',
        N'حساب عدد النقاط في كل حرف فقط',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1601,
        16,
        N'A',
        N'أ',
        N'الصندوق الذي يحمل ملصق [رصاص 9 مم]',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1602,
        16,
        N'B',
        N'ب',
        N'الصندوق الذي يحمل ملصق [مختلط]',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1603,
        16,
        N'C',
        N'ج',
        N'الصندوق الذي يحمل ملصق [رصاص 7.62 مم]',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1604,
        16,
        N'D',
        N'د',
        N'لا يمكن معرفتها دون فتح جميع الصناديق',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1701,
        17,
        N'A',
        N'أ',
        N'جميع المظليين بدون استثناء يتقنون الرماية الدقيقة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1702,
        17,
        N'B',
        N'ب',
        N'بعض المظليين يتقنون الرماية الدقيقة بالضرورة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1703,
        17,
        N'C',
        N'ج',
        N'لا يوجد أي مظلي يتقن الرماية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1704,
        17,
        N'D',
        N'د',
        N'حراس الشخصيات لا ينفذون قفزاً مظلياً أبداً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1801,
        18,
        N'A',
        N'أ',
        N'ح',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1802,
        18,
        N'B',
        N'ب',
        N'ط',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1803,
        18,
        N'C',
        N'ج',
        N'ي',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1804,
        18,
        N'D',
        N'د',
        N'ك',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1901,
        19,
        N'A',
        N'أ',
        N'20%',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1902,
        19,
        N'B',
        N'ب',
        N'25%',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1903,
        19,
        N'C',
        N'ج',
        N'30%',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1904,
        19,
        N'D',
        N'د',
        N'35%',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2001,
        20,
        N'A',
        N'أ',
        N'السارق قفز من المدخنة العلوية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2002,
        20,
        N'B',
        N'ب',
        N'السارق كان يحوز المفتاح الرئيسي بالضرورة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2003,
        20,
        N'C',
        N'ج',
        N'السرقة لم تقع أصلاً والادعاء كاذب',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2004,
        20,
        N'D',
        N'د',
        N'النافذة ستكسر في المستقبل',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2101,
        21,
        N'A',
        N'أ',
        N'السائق كان يضغط على دواسة الفرامل باليد بدل القدم',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2102,
        21,
        N'B',
        N'ب',
        N'تدخل نظام منع انغلاق المكابح (ABS) في السيارة لتفادي الانزلاق',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2103,
        21,
        N'C',
        N'ج',
        N'انفجار الإطار الأمامي الأيمن قبل الاصطدام',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2104,
        21,
        N'D',
        N'د',
        N'تعطل نظام توجيه المقود بشكل كلي ومفاجئ',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2201,
        22,
        N'A',
        N'أ',
        N'وضوح صورة صاحب الرخصة بلون أسود داكن',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2202,
        22,
        N'B',
        N'ب',
        N'غياب الشعارات المتوهجة فوسفورياً تحت الأشعة فوق البنفسجية',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2203,
        22,
        N'C',
        N'ج',
        N'وجود شريحة إلكترونية بارزة على ظهر البطاقة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2204,
        22,
        N'D',
        N'د',
        N'كتابة الاسم العائلي بالحروف اللاتينية والعربية معاً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2301,
        23,
        N'A',
        N'أ',
        N'كتلة وعزم اندفاع الشاحنة كانا أكبر بكثير ففرضا مسار الاصطدام على المركبة الخفيفة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2302,
        23,
        N'B',
        N'ب',
        N'السيارة كانت متوقفة تماماً والشاحنة كانت تسير إلى الخلف',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2303,
        23,
        N'C',
        N'ج',
        N'السائقان فقدا الوعي معاً قبل نقطة التقاطع بـ 500 متر',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2304,
        23,
        N'D',
        N'د',
        N'الاصطدام وقع من الجهة الخلفية للشاحنة وليس الجانبية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2401,
        24,
        N'A',
        N'أ',
        N'شخص يسأل الحارس عن توقيت فتح مكتب استقبال المرتفقين',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2402,
        24,
        N'B',
        N'ب',
        N'مركبة تدور عدة مرات ببطء وتلتقط صوراً لكاميرات المراقبة ونقاط الحراسة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2403,
        24,
        N'C',
        N'ج',
        N'موظف يرتدي بذلة العمل ويحمل شارة مهنية واضحة متجهاً للمدخل الرئيسي',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2404,
        24,
        N'D',
        N'د',
        N'عامل توصيل بضائع يتصل بالزبون لاستلام الطرد',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2501,
        25,
        N'A',
        N'أ',
        N'المركبة خضعت لغسيل روتيني بالبخار في محطة الخدمة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2502,
        25,
        N'B',
        N'ب',
        N'احتمال تزوير أو استبدال صفيحة الترقيم لإخفاء الهوية الحقيقية للشاحنة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2503,
        25,
        N'C',
        N'ج',
        N'الإطارات الاحتياطية للشاحنة جديدة ولم تستعمل من قبل',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2504,
        25,
        N'D',
        N'د',
        N'السائق يحمل رخصة سياقة من صنف الدرك الملكي حصرياً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2601,
        26,
        N'A',
        N'أ',
        N'إلغاء الفيديو واعتباره دليلاً باطلاً دون أي إجراءات إضافية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2602,
        26,
        N'B',
        N'ب',
        N'قياس وتوثيق فارق التوقيت بين خادم الكاميرا والتوقيت الواقعي لإعادة ضبط التسلسل الزمني بدقة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2603,
        26,
        N'C',
        N'ج',
        N'افتراض أن الجريمة ارتكبت في اليوم الموالي بالضرورة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2604,
        26,
        N'D',
        N'د',
        N'اتهام صانع ساعة الحائط بالتواطؤ مع المشتبه بهم',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2701,
        27,
        N'A',
        N'أ',
        N'احتمال وجود تجويف سري أو حشو بمواد ممنوعة داخل هيكل الباب الأيمن',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2702,
        27,
        N'B',
        N'ب',
        N'أن الباب الأيمن مصنوع من الألومنيوم الخفيف جداً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2703,
        27,
        N'C',
        N'ج',
        N'أن زجاج الباب الأيسر مفتوح جزئياً فقط',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2704,
        27,
        N'D',
        N'د',
        N'أن مكبر الصوت الداخلي للسيارة يعمل بكفاءة عالية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2801,
        28,
        N'A',
        N'أ',
        N'لون الشاحنة هو البنفسجي المزدوج',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2802,
        28,
        N'B',
        N'ب',
        N'وجود شاحنة في مسرح الحدث في حدود الساعة 14:00',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2803,
        28,
        N'C',
        N'ج',
        N'كلا الشاهدين يقودان نفس نوع السيارة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2804,
        28,
        N'D',
        N'د',
        N'الإشارة الضوئية كانت مطفأة تماماً طوال اليوم',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2901,
        29,
        N'A',
        N'أ',
        N'من داخل الغرفة نحو الخارج',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2902,
        29,
        N'B',
        N'ب',
        N'من خارج الغرفة باتجاه الداخل',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2903,
        29,
        N'C',
        N'ج',
        N'من السقف عمودياً بزاوية 90 درجة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        2904,
        29,
        N'D',
        N'د',
        N'الكسر ناتج عن تغير درجة الحرارة دون أي مقذوف',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3001,
        30,
        N'A',
        N'أ',
        N'السماح له بالمرور فوراً لتفادي تضييع وقته',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3002,
        30,
        N'B',
        N'ب',
        N'رفع درجة اليقظة الأمنية وتعميق المراقبة والتفتيش وفق الضوابط القانونية',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3003,
        30,
        N'C',
        N'ج',
        N'مطالبته بتقديم اعتراف فوري بارتكاب جناية قتل',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3004,
        30,
        N'D',
        N'د',
        N'تجاهل السلوك ومصادرة رخصة السياقة بصفة نهائية دون سند قانوني',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3101,
        31,
        N'A',
        N'أ',
        N'دخول مركبات إلى المدار دون وجود منفذ خروج متاح مما أدى لانسداد حلقة التدفق',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3102,
        31,
        N'B',
        N'ب',
        N'أن جميع السيارات نفد منها الوقود في نفس اللحظة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3103,
        31,
        N'C',
        N'ج',
        N'ارتفاع ضغط الهواء في العجلات لجميع المركبات',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3104,
        31,
        N'D',
        N'د',
        N'أن إشارات المرور الخضراء كانت مضاءة في جميع الاتجاهات',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3201,
        32,
        N'A',
        N'أ',
        N'إعادة إغلاق الكيس بختم جديد وتجاهل الملاحظة لتسريع الإجراءات',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3202,
        32,
        N'B',
        N'ب',
        N'إثبات الواقعة فوراً في محضر رسمي وإشعار النيابة العامة بكسر سلامة الحرز',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3203,
        32,
        N'C',
        N'ج',
        N'رمي الحرز في سلة المهملات لعدم صلاحيته',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3204,
        32,
        N'D',
        N'د',
        N'فتح الكيس وتوزيع محتوياته على باقي الزملاء',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3301,
        33,
        N'A',
        N'أ',
        N'تحديد "نقطة اختناق إجبارية" تتيح إحكام السيطرة والكمين بأقل مجهود عملياتي',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3302,
        33,
        N'B',
        N'ب',
        N'ضرورة استخدام طائرات الهليكوبتر فقط لنقل المياه المعدنية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3303,
        33,
        N'C',
        N'ج',
        N'أن المنطقة صالحة لسباق الدراجات الهوائية السريعة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3304,
        33,
        N'D',
        N'د',
        N'أن الوادي لا يمكن دخوله إلا في فصل الصيف',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3401,
        34,
        N'A',
        N'أ',
        N'الشخص كان يمشي إلى الخلف ببطء وتأنٍّ',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3402,
        34,
        N'B',
        N'ب',
        N'الشخص كان يعدو (يجري) بسرعة عالية أثناء مروره',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3403,
        34,
        N'C',
        N'ج',
        N'الشخص كان يحمل حمولة ثقيلة جداً على ظهره وهو جالس',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3404,
        34,
        N'D',
        N'د',
        N'الأثر يعود لدراجة نارية صغيرة بعجلتين',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3501,
        35,
        N'A',
        N'أ',
        N'أن السيارة تسير على أربع عجلات مطاطية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3502,
        35,
        N'B',
        N'ب',
        N'وجود كسر مميز في المرآة الجانبية اليسرى مع ملصق فريد على الزجاج الخلفي',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3503,
        35,
        N'C',
        N'ج',
        N'وجود مقود دائري داخل مقصورة القيادة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3504,
        35,
        N'D',
        N'د',
        N'أن الزجاج الأمامي شفاف ونظيف تماماً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3601,
        36,
        N'A',
        N'أ',
        N'النقطة الكيلومترية 74',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3602,
        36,
        N'B',
        N'ب',
        N'النقطة الكيلومترية 47',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3603,
        36,
        N'C',
        N'ج',
        N'النقطة الكيلومترية 147',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3604,
        36,
        N'D',
        N'د',
        N'الرجوع إلى مقر القيادة الإقليمية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3701,
        37,
        N'A',
        N'أ',
        N'الجلوس والاسترخاء وإغلاق العينين لبضع دقائق فقط',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3702,
        37,
        N'B',
        N'ب',
        N'المسح البصري النشط للقطاعات وتغيير زوايا المراقبة والتحرك الموضعي المنتظم',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3703,
        37,
        N'C',
        N'ج',
        N'تصفح مواقع التواصل الاجتماعي على الهاتف الشخصي لطرد الملل',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3704,
        37,
        N'D',
        N'د',
        N'وضع سماعات الأذن لسماع الموسيقى بصوت مرتفع',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3801,
        38,
        N'A',
        N'أ',
        N'مرة واحدة فقط',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3802,
        38,
        N'B',
        N'ب',
        N'مرتان بالضبط',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3803,
        38,
        N'C',
        N'ج',
        N'ثلاث مرات',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3804,
        38,
        N'D',
        N'د',
        N'أربع مرات متتالية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3901,
        39,
        N'A',
        N'أ',
        N'تاريخ الدخول: 10/05/2024 الساعة 10:00 — تاريخ الانتهاء: 12/05/2024 الساعة 10:00',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3902,
        39,
        N'B',
        N'ب',
        N'رقم المحضر: 1420/ج.ج — تاريخ المحضر: 12/05/2024',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3903,
        39,
        N'C',
        N'ج',
        N'تاريخ التوقيف: 15/05/2024 — تاريخ نهاية الحراسة: 14/05/2024',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        3904,
        39,
        N'D',
        N'د',
        N'الضابط المشرف: ملازم أول س.م — الوحدة: المركز الترابي',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4001,
        40,
        N'A',
        N'أ',
        N'التركيز التام على شاشة الهاتف دون النظر إلى الطريق أمام الدراجة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4002,
        40,
        N'B',
        N'ب',
        N'المسح البصري التناوبي السريع مع تثبيت مسافة الأمان وتركيز الرؤية المحورية على مسار السير',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4003,
        40,
        N'C',
        N'ج',
        N'الالتفات المستمر للخلف طوال فترة السير لمحادثة مرافق الموكب',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4004,
        40,
        N'D',
        N'د',
        N'إغلاق عيني السائق كل 10 ثوانٍ لتفادي جفاف العين',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4101,
        41,
        N'A',
        N'أ',
        N'متابعة قراءة أوراق السيارة بهدوء دون أي اكتراث',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4102,
        41,
        N'B',
        N'ب',
        N'الانتقال فوراً لوضع التأهب الأمني، وأمر الراكب بإظهار يديه فوراً، وتنبيه الزميل المرافق',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4103,
        41,
        N'C',
        N'ج',
        N'الابتسام للراكب والطلب منه مساعدته في البحث تحت الكرسي',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4104,
        41,
        N'D',
        N'د',
        N'الانسحاب التام والفرار من نقطة المراقبة سيراً على الأقدام',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4201,
        42,
        N'A',
        N'أ',
        N'محضر معاينة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4202,
        42,
        N'B',
        N'ب',
        N'استدعاء رسمي',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4203,
        42,
        N'C',
        N'ج',
        N'قذيفة هاون',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4204,
        42,
        N'D',
        N'د',
        N'برقية عملياتية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4301,
        43,
        N'A',
        N'أ',
        N'إبقاء الإصبع دائماً ممتداً بمحاذاة الهيكل خارج واقي الزناد حتى تحديد الهدف وعزم الإطلاق',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4302,
        43,
        N'B',
        N'ب',
        N'وضع الإصبع بإحكام على الزناد طوال فترة حمل السلاح والتجول به',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4303,
        43,
        N'C',
        N'ج',
        N'توجيه فوهة السلاح نحو الزملاء عند التحدث معهم للتأكد من انتباههم',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4304,
        43,
        N'D',
        N'د',
        N'افتراض أن السلاح فارغ دائماً دون الحاجة للتأكد من مخزن الذخيرة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4401,
        44,
        N'A',
        N'أ',
        N'منزل عمها في أي مدينة مجاورة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4402,
        44,
        N'B',
        N'ب',
        N'شارع 14، درب النخلة، زنقة 3، قرب وادي إيسيل',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4403,
        44,
        N'C',
        N'ج',
        N'محطة القطار الرئيسية في مركز المدينة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4404,
        44,
        N'D',
        N'د',
        N'أي دكان تجاري يبيع السيارات الكحلة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4501,
        45,
        N'A',
        N'أ',
        N'السيارة (أ)',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4502,
        45,
        N'B',
        N'ب',
        N'السيارة (ب)',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4503,
        45,
        N'C',
        N'ج',
        N'الشاحنة (ج)',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4504,
        45,
        N'D',
        N'د',
        N'الحافلة (د)',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4601,
        46,
        N'A',
        N'أ',
        N'الرد على المتظاهرين بنفس الألفاظ الاستفزازية لإثبات القوة الشخصية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4602,
        46,
        N'B',
        N'ب',
        N'الحفاظ على الثبات والهدوء التام والتركيز الصارم على حماية الموقع وأوامر قائد التشكيل',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4603,
        46,
        N'C',
        N'ج',
        N'الاندفاع الفردي نحو الحشد لضرب أول شخص يصرخ',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4604,
        46,
        N'D',
        N'د',
        N'مغادرة الصف والعودة إلى الشاحنة لشرب الشاي',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4701,
        47,
        N'A',
        N'أ',
        N'400 طلقة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4702,
        47,
        N'B',
        N'ب',
        N'410 طلقات بالضبط',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4703,
        47,
        N'C',
        N'ج',
        N'420 طلقة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4704,
        47,
        N'D',
        N'د',
        N'380 طلقة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4801,
        48,
        N'A',
        N'أ',
        N'شخص يلوح بعلم وطني ويهتف بحماس',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4802,
        48,
        N'B',
        N'ب',
        N'شخص يرتدي معطفاً سميكاً ومغلقاً في يوم صيفي شديد الحرارة ويده اليمنى ثابتة تحت المعطف',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4803,
        48,
        N'C',
        N'ج',
        N'عائلة تتناول المثلجات بجانب الرصيف',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4804,
        48,
        N'D',
        N'د',
        N'مصور صحفي يحمل كاميرا معتمدة ببطاقة رسمية واضحة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4901,
        49,
        N'A',
        N'أ',
        N'التركيز لا ينخفض أبداً مهما طالت المدة إذا كان الدركي شجاعاً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4902,
        49,
        N'B',
        N'ب',
        N'يبدأ الانخفاض بعد ساعتين من السياقة المتواصلة، ويجب التناوب على القيادة والتوقف في نقطة دركية مؤمنة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4903,
        49,
        N'C',
        N'ج',
        N'فتح النوافذ وقيادة السيارة بأقصى سرعة ممكنة لإنهاء المهمة في ساعة واحدة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        4904,
        49,
        N'D',
        N'د',
        N'إعطاء مقود السيارة للموقوف ليقود السيارة تحت مراقبة الدورية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5001,
        50,
        N'A',
        N'أ',
        N'متابعة حركة النجوم في السماء للتأكد من حالة الطقس',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5002,
        50,
        N'B',
        N'ب',
        N'رصد أي انكسار مفاجئ للأغصان أو انعكاس ضوئي شاذ أو حركة ظل تتعارض مع اتجاه الرياح الطبيعية',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5003,
        50,
        N'C',
        N'ج',
        N'التركيز التام على حذاء الدركي للتأكد من عدم اتساخه بالطين',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5004,
        50,
        N'D',
        N'د',
        N'إطفاء جميع الكشافات والجلوس للنوم حتى بزوغ شمس الصباح',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5101,
        51,
        N'A',
        N'أ',
        N'البدء الفوري في استجواب المصاب داخل السيارة وتحرير محضر المخالفة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5102,
        51,
        N'B',
        N'ب',
        N'تأمين وحماية مكان الحادث بتشوير تحذيري عاجل ومسافة أمان لمنع وقوع حوادث دهس متسلسلة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5103,
        51,
        N'C',
        N'ج',
        N'سحب السيارة المحطمة فوراً بواسطة حبل يدوي دون تشوير ضوئي',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5104,
        51,
        N'D',
        N'د',
        N'مغادرة المكان والذهاب للبحث عن رافعة خاصة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5201,
        52,
        N'A',
        N'أ',
        N'مبادلته الصراخ واستعمال العنف الجسدي الفوري أمام الجمهور',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5202,
        52,
        N'B',
        N'ب',
        N'الحفاظ على الهدوء والصرامة، وإبعاد الفضوليين، وتطبيق المساطر القانونية بثبات ودون انفعال',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5203,
        52,
        N'C',
        N'ج',
        N'تمزيق وثائق السائق وتركه يغادر دون تحرير أي مخالفة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5204,
        52,
        N'D',
        N'د',
        N'الاستسلام لمطالبه والاعتذار له أمام المارة تفادياً للإحراج',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5301,
        53,
        N'A',
        N'أ',
        N'إطلاق وابل عشوائي من الرصاص على زجاج السيارة الخلفي أثناء ابتعادها في الظلام',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5302,
        53,
        N'B',
        N'ب',
        N'التعميم اللاسلكي الفوري لمواصفات المركبة وتنسيق خطة محاصرة وتطويق مع المراكز المجاورة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5303,
        53,
        N'C',
        N'ج',
        N'تجاهل الحادث تماماً واعتباره أمراً اعتيادياً لا يستدعي المتابعة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5304,
        53,
        N'D',
        N'د',
        N'مغادرة الحاجز دون إشعار القيادة للبحث العشوائي في الشوارع الفرعية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5401,
        54,
        N'A',
        N'أ',
        N'تجاهل الطفل ومتابعة الطريق لتوقيف سارق المتجر مهما كلف الأمر',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5402,
        54,
        N'B',
        N'ب',
        N'التوقف الفوري لإسعاف الطفل وإنقاذ حياته وإشعار القاعة لتحويل مهمة السرقة لدورية أخرى',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5403,
        54,
        N'C',
        N'ج',
        N'معاتبة الطفل على خروجه من المنزل ثم استكمال المسار',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5404,
        54,
        N'D',
        N'د',
        N'الانتظار في مكان الحادث دون تقديم أي مساعدة حتى قدوم والدي الطفل',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5501,
        55,
        N'A',
        N'أ',
        N'الدخول وسط الشجار بالأيدي العارية دون تقييم المخاطر أو إنذار',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5502,
        55,
        N'B',
        N'ب',
        N'فرض مسافة أمان، الإنذار الحازم بإلقاء الأسلحة، شل حركة حامل السلاح، وفصل الأطراف',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5503,
        55,
        N'C',
        N'ج',
        N'تشجيع أحد الأطراف على ضرب الآخر لإنهاء الخلاف بسرعة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5504,
        55,
        N'D',
        N'د',
        N'تصوير الشجار بالهاتف ونشره على الإنترنت لطلب آراء الجمهور',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5601,
        56,
        N'A',
        N'أ',
        N'ترك السيارة والسلاح في الخلاء والمشي الفردي العشوائي نحو وجهات مجهولة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5602,
        56,
        N'B',
        N'ب',
        N'تأمين السيارة، بقاء عنصرين معاً، والصعود التكتيكي لمرتفع قريب لاستعادة الاتصال بالقيادة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5603,
        56,
        N'C',
        N'ج',
        N'إشعال النار في إطارات السيارة للتدفئة بانتظار الصباح',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5604,
        56,
        N'D',
        N'د',
        N'إطلاق جميع الرصاصات الحية في الهواء كإشارة استغاثة احتفالية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5701,
        57,
        N'A',
        N'أ',
        N'اقتحام المنزل فوراً وبشكل منفرد عبر كسر الباب الرئيسي بالقدم',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5702,
        57,
        N'B',
        N'ب',
        N'تجميد الوضع، إقامة طوق أمني محكم، إخلاء الجوار، وتفعيل مسار التفاوض واستدعاء القوات الخاصة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5703,
        57,
        N'C',
        N'ج',
        N'مغادرة الموقع وتركه لحين نفاد ذخيرته تلقائياً دون أي مراقبة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5704,
        57,
        N'D',
        N'د',
        N'السماح للفضوليين والجيران بالدخول لإقناعه بالعدول عن موقفه',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5801,
        58,
        N'A',
        N'أ',
        N'إتلاف الكيس في المرحاض فوراً لأن الإذن لم ينص عليه',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5802,
        58,
        N'B',
        N'ب',
        N'حجز المخدرات، تحرير محضر بالتلبس، وإشعار وكيل الملك فوراً لتلقي التعليمات الإجرائية',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5803,
        58,
        N'C',
        N'ج',
        N'أخذ المخدرات وإخفاؤها في المنزل دون تدوينها بالمحضر',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5804,
        58,
        N'D',
        N'د',
        N'ترك المخدرات مكانها واستكمال البحث عن المواشي فقط دون أي ذكر للواقعة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5901,
        59,
        N'A',
        N'أ',
        N'توجيه كل القوات لإنقاذ رؤوس الأغنام لتقليل الخسائر المالية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5902,
        59,
        N'B',
        N'ب',
        N'التوجه الفوري لتأمين وإخلاء تلاميذ المدرسة والأطر التربوية إلى منطقة آمنة ومرتفعة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5903,
        59,
        N'C',
        N'ج',
        N'الانتظار حتى انتهاء الأمطار لتفقد المدرسة والمزرعة معاً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        5904,
        59,
        N'D',
        N'د',
        N'إغلاق أبواب المدرسة بالمفاتيح لمنع خروج التلاميذ للسباحة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6001,
        60,
        N'A',
        N'أ',
        N'السماح لهما بالتشابك بالأيدي لمعرفة من الأقوى والأحق بالرأي',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6002,
        60,
        N'B',
        N'ب',
        N'إيقاف الخلاف بحزم فوري، فصلهما ميدانياً لإنجاز الواجب، وتأجيل المساءلة التأديبية للمقر',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6003,
        60,
        N'C',
        N'ج',
        N'أخذ جانب أحدهما ضد الآخر بناء على الصداقة الشخصية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6004,
        60,
        N'D',
        N'د',
        N'مغادرة المهمة وترك الدركيين يتشاجران بمفردهما في الشارع',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6101,
        61,
        N'A',
        N'أ',
        N'اعتراض الحافلة بمفردهما والدخول في مواجهة جسدية مباشرة مع 50 مشجعاً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6102,
        61,
        N'B',
        N'ب',
        N'طلب التعزيز الفوري والتنسيق لتوقيف الحافلة في نقطة مراقبة مجهزة وبقوة عددية كافية',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6103,
        61,
        N'C',
        N'ج',
        N'إغلاق المركز الدركي والهروب من المنطقة بأكملها',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6104,
        61,
        N'D',
        N'د',
        N'رمي الحجارة على نوافذ الحافلة لإجبارها على التوقف',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6201,
        62,
        N'A',
        N'أ',
        N'قبول الوجبة مجاناً ودعوة جميع المعارف لتناول وجبات مجانية يومياً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6202,
        62,
        N'B',
        N'ب',
        N'رفض المجانية بأدب وحزم والإصرار التام على دفع الثمن المستحق صيانة للكرامة والحياد المؤسساتي',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6203,
        62,
        N'C',
        N'ج',
        N'طلب وجبات إضافية لأخذها إلى المنزل بالمجان أيضاً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6204,
        62,
        N'D',
        N'د',
        N'اعتقال صاحب المطعم فوراً بتهمة الخيانة العظمى',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6301,
        63,
        N'A',
        N'أ',
        N'أخذ نصف المبلغ المالي وتسهيل مرور الشاحنة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6302,
        63,
        N'B',
        N'ب',
        N'رفض المبلغ، حجز الأوراق المالية كحرز تلبس بجريمة الرشوة، توقيف السائق، وإشعار النيابة العامة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6303,
        63,
        N'C',
        N'ج',
        N'إعادة النقود للسائق مع تحذيره شفوياً فقط ومطالبته بالمغادرة السريعة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6304,
        63,
        N'D',
        N'د',
        N'مفاوضته لزيادة المبلغ إلى الضعف قبل اتخاذ القرار',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6401,
        64,
        N'A',
        N'أ',
        N'السماح للسيارات بالمرور مسرعة وسط الدخان لاختبار قوة تحمل الركاب',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6402,
        64,
        N'B',
        N'ب',
        N'قطع حركة السير من الجانبين، إقامة محاور تحويل آمنة، والتنسيق العاجل مع مصالح الإطفاء والوقاية',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6403,
        64,
        N'C',
        N'ج',
        N'الدخول إلى المستودع المشتعل لاستنشاق الغازات والتأكد من نوعيتها دون قناع واقٍ',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6404,
        64,
        N'D',
        N'د',
        N'الانتظار حتى تحترق جميع الأسمدة بمفردها لفتح الطريق',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6501,
        65,
        N'A',
        N'أ',
        N'إطلاق النار في الهواء والصراخ باسم المشتبه به وسط حشود السوق لإخافته',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6502,
        65,
        N'B',
        N'ب',
        N'فرض مراقبة سرية لصيقة، وتتبع تحركاته بهدوء حتى خروجه لمكان معزول لتوقيفه بمباغتة ودون تعريض المدنيين للخطر',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6503,
        65,
        N'C',
        N'ج',
        N'استخدام القنابل المسيلة للدموع وسط خيام الخضار لتفريق السوق بأكمله',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6504,
        65,
        N'D',
        N'د',
        N'إلغاء التوقيف نهائياً ومسح اسم المبحوث عنه من قاعدة البيانات',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6601,
        66,
        N'A',
        N'أ',
        N'الالتصاق التام بالحافة اليمنى الترابية قبل بداية المنعرج مع إغماض العينين',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6602,
        66,
        N'B',
        N'ب',
        N'البقاء يسار مسلك السير لتوسيع زاوية الرؤية، مع توجيه النظر للمخرج والاقتراب من الداخل بعد انكشاف الرؤية',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6603,
        66,
        N'C',
        N'ج',
        N'السير في المسلك المعاكس المعاكس تماماً بسرعة مضاعفة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6604,
        66,
        N'D',
        N'د',
        N'الفرملة القصوى بالفرامل الخلفية وحدها مع قفل المقود',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6701,
        67,
        N'A',
        N'أ',
        N'لأن محركات الدراجات تفقد 90% من قوتها الميكانيكية بمجرد ملامسة الماء',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6702,
        67,
        N'B',
        N'ب',
        N'لاختلاط الماء بزيوت وغبار الطريق مشكلاً طبقة لزجة خطيرة جداً قبل غسلها بالماء الغزير',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6703,
        67,
        N'C',
        N'ج',
        N'لأن إشارات المرور الضوئية تتوقف آلياً عند هطول أي قطرة مطر',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6704,
        67,
        N'D',
        N'د',
        N'لأن خوذة السائق تصبح ثقيلة جداً وتمنعه من رفع رأسه',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6801,
        68,
        N'A',
        N'أ',
        N'حوالي 5 أمتار فقط',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6802,
        68,
        N'B',
        N'ب',
        N'حوالي 25 إلى 27 متراً',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6803,
        68,
        N'C',
        N'ج',
        N'أكثر من 150 متراً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6804,
        68,
        N'D',
        N'د',
        N'السيارة تتوقف فوراً في نفس النقطة دون قطع أي متر',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6901,
        69,
        N'A',
        N'أ',
        N'السير في خط مستقيم متلاصق بعجلة تلامس العجلة الأخرى تماماً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6902,
        69,
        N'B',
        N'ب',
        N'التشكيل المتعرج التناوبي (Quinconce) لتأمين مسافة أمان ورؤية كافية لكل دراج',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6903,
        69,
        N'C',
        N'ج',
        N'السير العرضي جنباً إلى جنب لاحتلال كامل عرض الطريق ومنع أي سيارة من المرور',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        6904,
        69,
        N'D',
        N'د',
        N'إطفاء جميع الأضواء والسير دون ترتيب مسبق',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7001,
        70,
        N'A',
        N'أ',
        N'التسابق معها للوصول إلى الملتقى أولاً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7002,
        70,
        N'B',
        N'ب',
        N'تخفيف السرعة وإفساح المسلك فوراً والتوقف عند الاقتضاء لتسهيل مرورها الآمن',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7003,
        70,
        N'C',
        N'ج',
        N'استخدام المنبه الصوتي للتشويش على صفارات الإنذار',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7004,
        70,
        N'D',
        N'د',
        N'تجاهلها تماماً والتمسك بأسبقية اليمين العادية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7101,
        71,
        N'A',
        N'أ',
        N'القبعة العسكرية القماشية الخفيفة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7102,
        71,
        N'B',
        N'ب',
        N'الخوذة الواقية المدمجة (Casque intégral) المعتمدة وذات الحماية الفكية الكاملة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7103,
        71,
        N'C',
        N'ج',
        N'نظارات شمسية عادية دون أي خوذة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7104,
        71,
        N'D',
        N'د',
        N'وشاح صوفي يلف حول الرقبة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7201,
        72,
        N'A',
        N'أ',
        N'الضغط الأقصى على الفرامل الأمامية في لحظة ملامسة العائق تماماً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7202,
        72,
        N'B',
        N'ب',
        N'الفرملة المسبقة باستقامة، ثم تحرير الفرامل، وإبقاء المقود مستقيماً مع الوقوف الخفيف على مساند الأقدام',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7203,
        72,
        N'C',
        N'ج',
        N'إمالة الدراجة على جانبها والانزلاق عمداً تحت العائق',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7204,
        72,
        N'D',
        N'د',
        N'القفز من فوق الدراجة وتركها تصطدم بمفردها',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7301,
        73,
        N'A',
        N'أ',
        N'طول قامة سائق الشاحنة مقارنة بالمقصورة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7302,
        73,
        N'B',
        N'ب',
        N'تجاوز الوزن الإجمالي المأذون به مع الحمولة (PTAC) الموثق عبر قياس الميزان الجسري المعتمد',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7303,
        73,
        N'C',
        N'ج',
        N'لون غطاء الحمولة المشمع',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7304,
        73,
        N'D',
        N'د',
        N'عدد الملصقات الإعلانية الموجودة على هيكل الشاحنة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7401,
        74,
        N'A',
        N'أ',
        N'زيادة السرعة إلى 180 كم/س للتغلب على الرياح بالقوة الحركية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7402,
        74,
        N'B',
        N'ب',
        N'تخفيف السرعة، ضم الركبتين للخزان، وتعديل الميلان باتجاه هبوب الريح مع إرخاء الشد على المقود',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7403,
        74,
        N'C',
        N'ج',
        N'فتح المظلة اليدوية أثناء القيادة لصد الرياح الجانبية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7404,
        74,
        N'D',
        N'د',
        N'رفع كلتا اليدين عن المقود والاعتماد على التوازن الطبيعي',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7501,
        75,
        N'A',
        N'أ',
        N'لا يوجد أي فرق وكلاهما مجرد ألعاب إلكترونية توعوية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7502,
        75,
        N'B',
        N'ب',
        N'الإيثيلوتيست للكشف التوجيهي السريع، بينما الإيثيلومتر جهاز معايرة رسمي معتمد يحدد النسبة القانونية بدقة للإثبات القضائي',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7503,
        75,
        N'C',
        N'ج',
        N'الإيثيلومتر يستخدم فقط للسيارات العسكرية والإيثيلوتيست للمدنية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7504,
        75,
        N'D',
        N'د',
        N'كلاهما يتطلب سحب عينة من دم السائق في قارورة بلاستيكية بالميدان',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7601,
        76,
        N'A',
        N'أ',
        N'الضغط بأقصى قوة وفجأة على مقبض الفرامل الأمامية لمحاولة قفل العجلة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7602,
        76,
        N'B',
        N'ب',
        N'عدم مقاومة المقود بتصلب عضلي، وتخفيف السرعة تدريجياً بالسماح للدراجة باستعادة توازنها التلقائي',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7603,
        76,
        N'C',
        N'ج',
        N'النزول فوراً من الدراجة وهي تسير بسرعة 120 كم/س',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7604,
        76,
        N'D',
        N'د',
        N'تدوير المقود بالكامل إلى أقصى اليمين فجأة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7701,
        77,
        N'A',
        N'أ',
        N'مباشرة ملاصقاً للسيارة المصدومة داخل المنعرج',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7702,
        77,
        N'B',
        N'ب',
        N'قبل بداية المنعرج بمسافة كافية (100 إلى 150 متراً) لإنذار المركبات القادمة قبل انحجاب الرؤية',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7703,
        77,
        N'C',
        N'ج',
        N'خلف الحادث بـ 200 متر في الاتجاه المعاكس الذي لا يمر منه أحد',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7704,
        77,
        N'D',
        N'د',
        N'إخفاء المثلث داخل صندوق الأمتعة تفادياً لسرقته',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7801,
        78,
        N'A',
        N'أ',
        N'التقاط الصور التذكارية للموكب من الأمام',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7802,
        78,
        N'B',
        N'ب',
        N'استطلاع المسار المتقدم، إغلاق وتأمين التقاطعات الحيوية، وضمان تدفق سير الموكب دون توقف',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7803,
        78,
        N'C',
        N'ج',
        N'حمل حقائب الأمتعة الخاصة بالضيوف وتوزيع المشروبات',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7804,
        78,
        N'D',
        N'د',
        N'مراقبة سرعة الموكب من الخلف وتسجيل مخالفات لسيارات الحراسة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7901,
        79,
        N'A',
        N'أ',
        N'تحسن سرعة الدراجة لتصل إلى سرعة الطائرات النفاثة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7902,
        79,
        N'B',
        N'ب',
        N'ارتفاع شديد في حرارة الإطار وتهتك أنسجته الداخلية مما يعرضه للانفجار الفجائي القاتل',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7903,
        79,
        N'C',
        N'ج',
        N'انخفاض استهلاك الوقود إلى الصفر المطلق',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        7904,
        79,
        N'D',
        N'د',
        N'تغير لون الهيكل الخارجي للدراجة إلى الأبيض',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8001,
        80,
        N'A',
        N'أ',
        N'على بعد 100 متر أمام الشاحنة في خط مستقيم ومكشوف',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8002,
        80,
        N'B',
        N'ب',
        N'بمحاذاة الجانب الأيمن والأمام والخلف المباشر للمركبة حيث تعجز المرايا عن كشف الدراج',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8003,
        80,
        N'C',
        N'ج',
        N'فوق سقف مقصورة الشاحنة مباشرة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8004,
        80,
        N'D',
        N'د',
        N'الزوايا الميتة غير موجودة إطلاقاً في الشاحنات الحديثة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8101,
        81,
        N'A',
        N'أ',
        N'تنظيف الأرضية فوراً بالماء ومواد التطهير لراحة المحققين',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8102,
        81,
        N'B',
        N'ب',
        N'تجميد مسرح الجريمة ومنع الولوج إليه ووضع طوق أمني لحماية الأدلة الجنائية من التلوث',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8103,
        81,
        N'C',
        N'ج',
        N'فتح النوافذ وجمع الجيران والأقارب داخل الغرفة لتبادل الآراء',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8104,
        81,
        N'D',
        N'د',
        N'نقل الجثة إلى سيارة الدورية دون إشعار النيابة العامة أو الطبيب الشرعي',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8201,
        82,
        N'A',
        N'أ',
        N'إجباره على التوقيع على محاضر بيضاء دون قراءتها',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8202,
        82,
        N'B',
        N'ب',
        N'إشعاره بحقوقه القانونية (دواعي التوقيف، الاتصال بالعائلة، طلب محامٍ وفحص طبي) وتدوينها بالسجل',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8203,
        82,
        N'C',
        N'ج',
        N'مصادرة ملابسه وحرمانه من شرب الماء طوال مدة الحراسة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8204,
        82,
        N'D',
        N'د',
        N'إطلاق سراحه سراً إذا كان ينتمي لنفس المنطقة الجغرافية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8301,
        83,
        N'A',
        N'أ',
        N'فرك الزجاج بقطعة قماش خشنة مبللة بالماء والصابون',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8302,
        83,
        N'B',
        N'ب',
        N'تطبيق المسحوق المغناطيسي أو الكربوني المتخصص بفرشاة رقيقة لكشف الخطوط الحليمية بدقة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8303,
        83,
        N'C',
        N'ج',
        N'تسخين الزجاج بالنار المباشرة حتى يتصدع',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8304,
        83,
        N'D',
        N'د',
        N'رش الزجاج بطلاء أسود زيتي سميك لإخفاء الآثار',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8401,
        84,
        N'A',
        N'أ',
        N'بين الساعة 02:00 ليلاً و 05:00 فجراً حصراً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8402,
        84,
        N'B',
        N'ب',
        N'بين الساعة السادسة صباحاً (06:00) والتاسعة ليلاً (21:00)',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8403,
        84,
        N'C',
        N'ج',
        N'في أي وقت يختاره الضابط دون قيد زمني طوال 24 ساعة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8404,
        84,
        N'D',
        N'د',
        N'يوم الأحد فقط بين الظهر والعصر',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8501,
        85,
        N'A',
        N'أ',
        N'لزيادة وزن الحرز والحصول على مكافأة مالية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8502,
        85,
        N'B',
        N'ب',
        N'لضمان عدم التلاعب بالدليل أو تلويثه وإثبات مشروعيته وسلامته القانونية أمام القضاء',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8503,
        85,
        N'C',
        N'ج',
        N'للسماح للجمهور بالتقاط صور مع الأحراز في المعارض',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8504,
        85,
        N'D',
        N'د',
        N'لبيع الأحراز في المزاد العلني قبل صدور الحكم',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8601,
        86,
        N'A',
        N'أ',
        N'الصراخ وتهديد المشتبه به بالعقوبات الشديدة لجعله ينهار فوراً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8602,
        86,
        N'B',
        N'ب',
        N'إتاحة الفرصة للمشتبه به لتقديم سرده الحر والتلقائي للأحداث قبل الانتقال للأسئلة الموجهة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8603,
        86,
        N'C',
        N'ج',
        N'تلقينه الإجابات التي يرغب المحقق في كتابتها بالمحضر',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8604,
        86,
        N'D',
        N'د',
        N'جعله يقسم على الولاء قبل بدء الجلسة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8701,
        87,
        N'A',
        N'أ',
        N'وضع العينة وهي مبللة داخل كيس بلاستيكي محكم الإغلاق وتركها في الشمس الحارة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8702,
        87,
        N'B',
        N'ب',
        N'أخذ العينة بمسحة معقمة، تجفيفها في الهواء الطلق، وتعبئتها في كيس ورقي جاف وبارد',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8703,
        87,
        N'C',
        N'ج',
        N'غسل بقعة الدم بمحلول الكلور (ماء جافيل) لتطهيرها قبل التحليل',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8704,
        87,
        N'D',
        N'د',
        N'تجميد الملابس في الثلج المباشر مع اللحوم المجمدة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8801,
        88,
        N'A',
        N'أ',
        N'أن يكون المحضر مكتوباً بحبر أحمر حصراً ومزيناً بالرسومات',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8802,
        88,
        N'B',
        N'ب',
        N'ذكر صفة وهوية المحرر، التواريخ والساعات، قراءة الأقوال وتوقيع أو بصمة المصرح والضابط',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8803,
        88,
        N'C',
        N'ج',
        N'إرفاق شهادة ميلاد جد الضابط مع كل محضر استماع',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8804,
        88,
        N'D',
        N'د',
        N'أن تتم طباعة المحضر في مطبعة عمومية خارج المركز',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8901,
        89,
        N'A',
        N'أ',
        N'شكوى شفوية غامضة عن واقعة غير محددة حدثت قبل ثلاث سنوات',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8902,
        89,
        N'B',
        N'ب',
        N'ضبط الفاعل في وقت ارتكاب الفعل الجرمي عيناً أو تتبعه بصياح وصخب الجمهور إثر ارتكابها',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8903,
        89,
        N'C',
        N'ج',
        N'شخص يبدو عليه التعب أثناء تجوله في حديقة عامة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        8904,
        89,
        N'D',
        N'د',
        N'سماع إشاعة غير مؤكدة على تطبيق واتساب',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9001,
        90,
        N'A',
        N'أ',
        N'وضع المشتبه به بمفرده مقيداً بالسلاسل والإشارة إليه بالقول "هذا هو المجرم بالتأكيد"',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9002,
        90,
        N'B',
        N'ب',
        N'عرض المشتبه به وسط مجموعة من الأشخاص المماثلين له في السن والهيئة والبنية دون أي توجيه إيحائي',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9003,
        90,
        N'C',
        N'ج',
        N'عرض صورة المشتبه به في التلفاز قبل بدء جلسة التعرف بساعة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9004,
        90,
        N'D',
        N'د',
        N'جعل الشاهد مغمض العينين تماماً أثناء العرض',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9101,
        91,
        N'A',
        N'أ',
        N'توصيل الهاتف بشبكة الواي فاي العامة للمركز والبدء في تنزيل ألعاب',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9102,
        91,
        N'B',
        N'ب',
        N'عزل الهاتف فوراً عن الشبكات (وضع الطيران أو كيس فاراداي العازل للموجات)',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9103,
        91,
        N'C',
        N'ج',
        N'إدخال رمز سري خاطئ 20 مرة متتالية لقفل الجهاز',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9104,
        91,
        N'D',
        N'د',
        N'رمي الهاتف في إناء ماء بارد لحمايته من الحرارة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9201,
        92,
        N'A',
        N'أ',
        N'استجواب الطفل في زنزانة الحراسة النظرية وهو مكبل اليدين',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9202,
        92,
        N'B',
        N'ب',
        N'الاستماع إليه في فضاء ملائم ومحفز نفسياً بحضور وليه الشرعي أو مساعد اجتماعي مع مراعاة سنه',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9203,
        92,
        N'C',
        N'ج',
        N'نشر صورة الطفل في وسائل الإعلام لدعوة الجيران لحضور الجلسة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9204,
        92,
        N'D',
        N'د',
        N'الضغط على الطفل للاعتراف بأنه هو المعتدي على نفسه',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9301,
        93,
        N'A',
        N'أ',
        N'تشغيل صفارات الإنذار وملاحقة الهدف من مسافة متر واحد فقط طوال الوقت',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9302,
        93,
        N'B',
        N'ب',
        N'اعتماد المراقبة التناوبية المتبادلة بعدة سيارات غير مموهة وتغيير نقاط التتبع باستمرار وبمرونة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9303,
        93,
        N'C',
        N'ج',
        N'الاتصال بالمشتبه به هاتفياً لإخباره بأنه تحت المراقبة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9304,
        93,
        N'D',
        N'د',
        N'استخدام سيارة واحدة بلون أحمر فاقع لا تتغير طوال 6 أشهر',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9401,
        94,
        N'A',
        N'أ',
        N'مكالمة هاتفية ودية غير موثقة مع موظف الاستقبال بشركة الاتصالات',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9402,
        94,
        N'B',
        N'ب',
        N'تسخير قضائي كتابي رسمي صادر وفق القانون وبإشراف مباشر من النيابة العامة المختصة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9403,
        94,
        N'C',
        N'ج',
        N'قرصنة خوادم الشركة بواسطة برامج تجسس مجهولة المصدر',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9404,
        94,
        N'D',
        N'د',
        N'شراء سجلات المكالمات من السوق السوداء',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9501,
        95,
        N'A',
        N'أ',
        N'مقارنة لون غلاف الرصاصة الخارجي بالعين المجردة فقط',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9502,
        95,
        N'B',
        N'ب',
        N'فحص التطابق الميكروسكوبي للخدوش والآثار الميكانيكية الفريدة لسبطانة السلاح بواسطة المجهر المقارن',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9503,
        95,
        N'C',
        N'ج',
        N'استنشاق رائحة البارود في فوهة المسدس بعد أسبوعين من الحادث',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9504,
        95,
        N'D',
        N'د',
        N'وزن المسدس بميزان المطبخ المنزلي',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9601,
        96,
        N'A',
        N'أ',
        N'إدخال كلمة المرور القديمة والجديدة فوراً لتفادي غضب المديرية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9602,
        96,
        N'B',
        N'ب',
        N'هجمة تصيد احتيالي (Phishing)؛ يجب الامتناع عن النقر وإبلاغ خلية أمن الأنظمة فوراً',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9603,
        96,
        N'C',
        N'ج',
        N'إعادة إرسال البريد لجميع الأصدقاء والزملاء لتنبيههم برابط التحديث',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9604,
        96,
        N'D',
        N'د',
        N'الرد على البريد بكلمة سر تجريبية لاختبار نيتهم',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9701,
        97,
        N'A',
        N'أ',
        N'12345678',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9702,
        97,
        N'B',
        N'ب',
        N'Gendarme2024',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9703,
        97,
        N'C',
        N'ج',
        N'T9$mK#8vL!q2@Z',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9704,
        97,
        N'D',
        N'د',
        N'password1234',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9801,
        98,
        N'A',
        N'أ',
        N'تبريد الغرفة المركزية بحفظ درجات الحرارة منخفضة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9802,
        98,
        N'B',
        N'ب',
        N'مراقبة وتصفية حزم البيانات المتبادلة وحظر المنافذ والاتصالات غير المصرح بها',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9803,
        98,
        N'C',
        N'ج',
        N'طباعة التقارير الإدارية تلقائياً كل مساء',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9804,
        98,
        N'D',
        N'د',
        N'تسريع سرعة الرياح داخل صندوق الحاسوب',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9901,
        99,
        N'A',
        N'أ',
        N'3 دقائق للطباعة، 2 صفحة لكل ورقة، 1 ملف لكل درج',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9902,
        99,
        N'B',
        N'ب',
        N'3 نسخ من البيانات، على وسيطين مختلفين للتخزين، ونسخة واحدة على الأقل في موقع جغرافي خارجي بعيد',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9903,
        99,
        N'C',
        N'ج',
        N'حفظ الملف 3 مرات متتالية على نفس بطاقة الذاكرة الصغيرة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        9904,
        99,
        N'D',
        N'د',
        N'مسح البيانات كل 3 أيام ونسخها في اليوم الثاني وإتلافها في اليوم الأول',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10001,
        100,
        N'A',
        N'أ',
        N'لون شاشة الحاسوب التي استخدمها الجاني',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10002,
        100,
        N'B',
        N'ب',
        N'عنوان بروتوكول الإنترنت (Adresse IP) مع البصمة الزمنية الدقيقة (Timestamp)',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10003,
        100,
        N'C',
        N'ج',
        N'طراز الطابعة المتصلة بمكتب الجاني',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10004,
        100,
        N'D',
        N'د',
        N'عدد الأزرار الموجودة في لوحة مفاتيحه',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10101,
        101,
        N'A',
        N'أ',
        N'تحويل مبلغ الفدية فوراً من الميزانية الخاصة للمركز',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10102,
        101,
        N'B',
        N'ب',
        N'فصل الحاسوب فوراً عن الشبكة المحلية والإنترنت دون إطفائه وإشعار خلية الأمن السيبراني فوراً',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10103,
        101,
        N'C',
        N'ج',
        N'إعادة تشغيل الحاسوب 10 مرات متتالية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10104,
        101,
        N'D',
        N'د',
        N'توصيل مفاتيح USB إضافية لحفظ الفيروس ونقله للأجهزة الأخرى',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10201,
        102,
        N'A',
        N'أ',
        N'نوايا المشتبه به ومستقبله المهني',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10202,
        102,
        N'B',
        N'ب',
        N'الإحداثيات الجغرافية (GPS)، تاريخ وساعة الالتقاط، وطراز الهاتف أو الكاميرا بدقة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10203,
        102,
        N'C',
        N'ج',
        N'تسجيل صوتي للأحاديث التي دارت أثناء التقاط الصورة قبل 5 سنوات',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10204,
        102,
        N'D',
        N'د',
        N'الاسم الكامل لوالدة صانع الهاتف',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10301,
        103,
        N'A',
        N'أ',
        N'استخدام كلمة سر موحدة وسهلة يعرفها جميع الجنود',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10302,
        103,
        N'B',
        N'ب',
        N'التشفير بواسطة المفتاح العام للطرف الآخر، وفك التشفير حصرياً بواسطة مفتاحه الخاص السري',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10303,
        103,
        N'C',
        N'ج',
        N'كتابة الرسالة بلغة أجنبية دون استخدام أي حاسوب',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10304,
        103,
        N'D',
        N'د',
        N'إرسال الرسالة عبر البريد العادي في مظروف شفاف',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10401,
        104,
        N'A',
        N'أ',
        N'توصيله بحاسوب مكتب القيادة الرئيسي لمعرفة ما إذا كان يحتوي على أفلام وثائقية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10402,
        104,
        N'B',
        N'ب',
        N'الامتناع التام عن توصيله بأي جهاز، وتسليمه لمكتب أمن النظم لفحصه في بيئة معزولة ومحمية',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10403,
        104,
        N'C',
        N'ج',
        N'أخذه للمنزل وإعطائه للأطفال للعب به',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10404,
        104,
        N'D',
        N'د',
        N'توصيله بحاسوب المحاسبة والمالية فوراً لتهيئته (Format)',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10501,
        105,
        N'A',
        N'أ',
        N'مسح وحذف سجل المركبة نهائياً من قاعدة البيانات',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10502,
        105,
        N'B',
        N'ب',
        N'استعراض واستخراج كافة معلومات المركبة المبحوث عنها الحاملة لرقم الترقيم المحدد',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10503,
        105,
        N'C',
        N'ج',
        N'تغيير لوحة ترقيم جميع سيارات الدرك إلى هذا الرقم',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10504,
        105,
        N'D',
        N'د',
        N'إيقاف تشغيل الخادم المركزي لمدة ساعة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10601,
        106,
        N'A',
        N'أ',
        N'إرسال الرسائل عبر موجات الراديو التماثلية القديمة فقط',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10602,
        106,
        N'B',
        N'ب',
        N'توجيه البيانات عبر عقد مشفرة متعددة ومتعاقبة كطبقات البصل لإخفاء عنوان IP الحقيقي للمستخدم',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10603,
        106,
        N'C',
        N'ج',
        N'إلغاء اتصال الإنترنت واستخدام الطاقة الشمسية للتواصل',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10604,
        106,
        N'D',
        N'د',
        N'نشر جميع الملفات في صفحات مفتوحة على محرك بحث جوجل',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10701,
        107,
        N'A',
        N'أ',
        N'لأنه يستهلك كميات خيالية من الوقود',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10702,
        107,
        N'B',
        N'ب',
        N'لضعفه الأمني الحاد وسهولة اختراقه وكسر مفاتيحه خلال دقائق بواسطة برامج تحليل الحزم',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10703,
        107,
        N'C',
        N'ج',
        N'لأنه لا يعمل إلا في فصل الشتاء فقط',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10704,
        107,
        N'D',
        N'د',
        N'لأنه مخصص فقط للهواتف المنزلية السلكية القديمة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10801,
        108,
        N'A',
        N'أ',
        N'انفجار بطارية الهاتف أثناء الرنين',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10802,
        108,
        N'B',
        N'ب',
        N'تزييف هوية المتصل أو عنوان البريد ليظهر كجهة أمنية أو رسمية لكسب ثقة الضحية وخداعه',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10803,
        108,
        N'C',
        N'ج',
        N'تسجيل المكالمة بصوت جهوري مضخم',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10804,
        108,
        N'D',
        N'د',
        N'حرق شريحة الهاتف SIM Card بسبب تكرار المكالمات',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10901,
        109,
        N'A',
        N'أ',
        N'لمسح الفيروسات وإصلاح القطاعات التالفة في القرص الصلب',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10902,
        109,
        N'B',
        N'ب',
        N'لإثبات السلامة الرياضية المطلقة للملفات والتأكيد أمام القضاء بعدم تعرضها لأي تعديل بعد ضبطها',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10903,
        109,
        N'C',
        N'ج',
        N'لتقليل حجم الملفات بنسبة 99% لتوفير مساحة التخزين',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        10904,
        109,
        N'D',
        N'د',
        N'لتحويل الوثائق إلى نصوص باللغة اليابانية القديمة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11001,
        110,
        N'A',
        N'أ',
        N'منح جميع الموظفين حسابات مدير النظام (Administrator) بصلاحيات مطلقة للتسهيل عليهم',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11002,
        110,
        N'B',
        N'ب',
        N'منح المستخدم فقط الصلاحيات المحدودة والضرورية للغاية لإنجاز وظيفته دون أي زيادة تفادياً للمخاطر',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11003,
        110,
        N'C',
        N'ج',
        N'منع جميع الموظفين من استخدام الكهرباء في المكاتب',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11004,
        110,
        N'D',
        N'د',
        N'إلغاء كلمات المرور واستخدام الدخول التلقائي بدون قيود',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11101,
        111,
        N'A',
        N'أ',
        N'إعطاء الأسلحة للتلاميذ فوراً دون أي شرح مسبق ليتعلموا من أخطائهم بمفردهم',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11102,
        111,
        N'B',
        N'ب',
        N'التسلسل: الشرح المنهجي، البيان العملي النموذجي، التطبيق الخاضع للمراقبة والتصحيح الفردي المستمر',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11103,
        111,
        N'C',
        N'ج',
        N'الصراخ المتواصل والعقاب البدني العشوائي قبل بدء أي تمرين',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11104,
        111,
        N'D',
        N'د',
        N'قراءة كتاب التدريب بالكامل بصوت منخفض في قاعة مظلمة دون أي تمرين عملي',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11201,
        112,
        N'A',
        N'أ',
        N'تقديم كل أسرار التحقيق وأسماء المشتبه بهم للصحفيين مقابل نشر صورته بالصحف',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11202,
        112,
        N'B',
        N'ب',
        N'الالتزام التام بواجب التحفظ والسر المهني، وتوجيه الصحفيين بلباقة للجهات الإعلامية الرسمية المخولة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11203,
        112,
        N'C',
        N'ج',
        N'الاعتداء الجسدي على الصحفيين وتحطيم كاميراتهم في الشارع العام',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11204,
        112,
        N'D',
        N'د',
        N'تأليف قصة خيالية طريفة وروايتها للصحفيين لإضحاكهم',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11301,
        113,
        N'A',
        N'أ',
        N'السخرية منه وتوبيخه على ضعفه وخروجه ليلاً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11302,
        113,
        N'B',
        N'ب',
        N'حسن الاستقبال، والإنصات الفعال بتقدير وتفهم، وطمأنته وتوفير فضاء لائق لتلقي شكايته بجدية',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11303,
        113,
        N'C',
        N'ج',
        N'تركه ينتظر في الرواق لساعات طويلة والتفرغ للعب على الهاتف',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11304,
        113,
        N'D',
        N'د',
        N'مطالبته بالعودة في الأسبوع القادم لأن المركز مغلق للراحة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11401,
        114,
        N'A',
        N'أ',
        N'قول جملة واحدة فقط: "انطلقوا وافعلوا ما يبدو لكم مناسباً"',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11402,
        114,
        N'B',
        N'ب',
        N'الموقف والبيئة (S)، المهمة (M)، التنفيذ والمراحل (E)، الإسناد اللوجستي (A)، والقيادة والاتصالات (C)',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11403,
        114,
        N'C',
        N'ج',
        N'كتابة قصيدة شعرية حماسية دون أي تفاصيل جغرافية أو أمنية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11404,
        114,
        N'D',
        N'د',
        N'الانتظار حتى انتهاء العملية ثم إخبار العناصر بما كان يجب عليهم فعله',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11501,
        115,
        N'A',
        N'أ',
        N'توبيخ وإهانة العناصر الأقل خبرة أمام زملائهم لكسر معنوياتهم',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11502,
        115,
        N'B',
        N'ب',
        N'التحليل الموضوعي للإيجابيات والنواقص العملياتية بهدف تحسين الأداء الجماعي وتحديث بروتوكولات التدخل المستقبلي',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11503,
        115,
        N'C',
        N'ج',
        N'الاحتفال وتناول الحلويات وإخفاء جميع الأخطاء المرتكبة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11504,
        115,
        N'D',
        N'د',
        N'إلغاء جميع التدريبات المستقبلية لأن العملية انتهت بسلام',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11601,
        116,
        N'A',
        N'أ',
        N'الاستهزاء به واتهامه بالجبن والضعف ودعوته لترك الخدمة العسكرية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11602,
        116,
        N'B',
        N'ب',
        N'التواصل الداعم برفق، وكسر عزلته الأخوية، وتوجيهه بحكمة وسرية للاستفادة من المتابعة الطبية والنفسية المتخصصة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11603,
        116,
        N'C',
        N'ج',
        N'تكليفه بأصعب المهام الليلية بمفرده لكي ينسى الصدمة بالقوة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11604,
        116,
        N'D',
        N'د',
        N'تجاهله التام واعتباره شخصاً غير مرغوب فيه في المركز',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11701,
        117,
        N'A',
        N'أ',
        N'قراءة نصوص قانونية معقدة باللغة اللاتينية القديمة طوال ساعتين دون توقف',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11702,
        117,
        N'B',
        N'ب',
        N'تكييف أسلوب الخطاب مع الفئة العمرية بالاعتماد على التفاعل، والوسائط البصرية، والأمثلة الحية المقنعة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11703,
        117,
        N'C',
        N'ج',
        N'معاقبة التلاميذ بالوقوف ووجوههم للحائط إذا طرحوا أي سؤال',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11704,
        117,
        N'D',
        N'د',
        N'توزيع كتيبات فارغة ومغادرة القاعة فوراً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11801,
        118,
        N'A',
        N'أ',
        N'الصراخ بصوت أعلى منه لإجباره على السكوت التام فوراً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11802,
        118,
        N'B',
        N'ب',
        N'الاستماع دون مقاطعة، ثم إعادة صياغة انشغاله بهدوء ونبرة صوت رصينة ومحترمة لتثبيت الهدوء',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11803,
        118,
        N'C',
        N'ج',
        N'إغلاق الباب في وجهه وإطفاء أضواء المكتب',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11804,
        118,
        N'D',
        N'د',
        N'الضحك والاستهزاء بحركاته أمام الزملاء',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11901,
        119,
        N'A',
        N'أ',
        N'منح النقط بناء على الإعجاب الشخصي أو القرابة العائلية فقط',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11902,
        119,
        N'B',
        N'ب',
        N'الاستناد إلى شبكة معايير موضوعية واضحة ومحددة سلفاً تقيس الإنجاز العملي والسلوك المهني بدقة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11903,
        119,
        N'C',
        N'ج',
        N'إعطاء نقطة موحدة وثابتة لجميع التلاميذ دون النظر لأدائهم الفعلي',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        11904,
        119,
        N'D',
        N'د',
        N'إجراء القرعة بالقطع النقدية لتحديد الناجحين والراسبين',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12001,
        120,
        N'A',
        N'أ',
        N'سرد تفاصيل غير مهمة عن نوع الطعام الذي تناوله العناصر قبل المهمة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12002,
        120,
        N'B',
        N'ب',
        N'الإيجاز والدقة والوضوح التام، بتقديم الوقائع الجوهرية، والنتائج، والتدابير المتخذة فوراً دون استطراد',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12003,
        120,
        N'C',
        N'ج',
        N'إخفاء وقوع أي مشاكل والكذب على القائد لإرضائه فقط',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12004,
        120,
        N'D',
        N'د',
        N'إرسال لغز شعري للقائد ليحاول تخمين ما جرى في الميدان',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12101,
        121,
        N'A',
        N'أ',
        N'فتح المراسلة وعرضها على جميع الزوار في قاعة الانتظار لأخذ آرائهم',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12102,
        121,
        N'B',
        N'ب',
        N'تسجيلها فوراً في سجل البريد الوارد برقم ترتيبي وتاريخ وساعة الاستلام وتقديمها فوراً للقائد',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12103,
        121,
        N'C',
        N'ج',
        N'إخفاء الرسالة داخل درج المكتب ونسيانها لعدة أشهر',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12104,
        121,
        N'D',
        N'د',
        N'تمزيق المظروف والتخلص من الوثيقة لتفادي كثرة الأوراق',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12201,
        122,
        N'A',
        N'أ',
        N'تكديس جميع الملفات عشوائياً في ركن مظلم على أرضية المرآب',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12202,
        122,
        N'B',
        N'ب',
        N'التصنيف المعياري المنهجي حسب السنوات والموضوعات مع الفهرسة والترميز الموحد في فضاء حفظ مخصص وآمن',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12203,
        122,
        N'C',
        N'ج',
        N'حرق الملفات القديمة أسبوعياً لتوفير المساحة في الغرفة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12204,
        122,
        N'D',
        N'د',
        N'خلط ملفات الموظفين مع سجلات الصيانة وفواتير الوقود في مجلد واحد',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12301,
        123,
        N'A',
        N'أ',
        N'استخدام أسلوب رومانسي وشعري مليء بالاستعارات والمحسنات البديعية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12302,
        123,
        N'B',
        N'ب',
        N'الموضوعية التامة، والدقة والوضوح والإيجاز، واحترام التراتبية الإدارية والصيغ الرسمية المعتمدة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12303,
        123,
        N'C',
        N'ج',
        N'استعمال لغة عامية دارجة مليئة بالاختصارات المبهمة وغير المفهومة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12304,
        123,
        N'D',
        N'د',
        N'كتابة الوثيقة في شكل رسوم كاريكاتورية ساخرة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12401,
        124,
        N'A',
        N'أ',
        N'تكليف نفس الدركي بالحراسة طوال 30 يوماً دون أي راحة وإعفاء الباقين تماماً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12402,
        124,
        N'B',
        N'ب',
        N'الموازنة الدقيقة بين الجاهزية العملياتية المستمرة والراحة القانونية والتوزيع المنصف بين العناصر',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12403,
        124,
        N'C',
        N'ج',
        N'إلغاء الحراسة الليلية بالكامل لتمكين الجميع من النوم في منازلهم',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12404,
        124,
        N'D',
        N'د',
        N'تحديد جدول الخدمة يومياً عبر مسابقة في الجري السريع صباحاً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12501,
        125,
        N'A',
        N'أ',
        N'إفشاء نقط وملاحظات القادة للزملاء في المقهى لإثارة الجدل والتنافس غير الشريف',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12502,
        125,
        N'B',
        N'ب',
        N'الالتزام الصارم بسرية البيانات الشخصية، والدقة المتناهية في مطابقة الأقدمية والاستحقاق بالسجلات الرسمية',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12503,
        125,
        N'C',
        N'ج',
        N'تعديل نقط التقييم مقابل مبالغ مالية أو خدمات شخصية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12504,
        125,
        N'D',
        N'د',
        N'تضييع ملفات الموظفين وإخبارهم بالبحث عنها بأنفسهم',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12601,
        126,
        N'A',
        N'أ',
        N'تنفيذ الأمر فوراً دون تردد لأن طاعة الرئيس مطلقة حتى لو خالفت القانون الجنائي',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12602,
        126,
        N'B',
        N'ب',
        N'رفض تنفيذ الأمر غير المشروع الصريح وإثبات المحجوز قانوناً وإبلاغ القيادة العليا بالواقعة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12603,
        126,
        N'C',
        N'ج',
        N'أخذ السلاح الناري وبيعه في السوق واقتسام المال مع الرئيس',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12604,
        126,
        N'D',
        N'د',
        N'إطلاق النار على السلاح الناري لإتلافه أمام الجميع',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12701,
        127,
        N'A',
        N'أ',
        N'مجرد لباس عادي يمكن تعديل ألوانه وارتداؤه مع أحذية رياضية متباينة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12702,
        127,
        N'B',
        N'ب',
        N'تجسيد لهيبة القانون وسيادة المؤسسة ويعكس الانضباط الصارم والاحترام الواجب للوظيفة العسكرية',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12703,
        127,
        N'C',
        N'ج',
        N'وسيلة لتخويف الأطفال الصغار في الشوارع',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12704,
        127,
        N'D',
        N'د',
        N'لباس صيفي يمكن تمزيق أكمامه في الأيام الحارة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12801,
        128,
        N'A',
        N'أ',
        N'تصرف عصري يستحق الإشادة والترقية الفورية لموهبته الفنية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12802,
        128,
        N'B',
        N'ب',
        N'خطأ مهني وتأديبي جسيم يخرق واجب التحفظ ويمس بهيبة المؤسسة العسكرية ويستوجب العقاب الرادع',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12803,
        128,
        N'C',
        N'ج',
        N'عمل بطولي يُطلب من جميع العناصر تقليده يومياً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12804,
        128,
        N'D',
        N'د',
        N'مباح تماماً ما دام لم يذكر اسمه الشخصي في الفيديو',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12901,
        129,
        N'A',
        N'أ',
        N'تجاهل الأمر تماماً لأن الإجازة تعني أن الشخص لم يعد ينتمي للدرك الملكي',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12902,
        129,
        N'B',
        N'ب',
        N'التفاعل الإيجابي بتسجيل بيانات السيارة وإشعار الدورية المحلية فوراً والتدخل الآمن عند الضرورة لإنقاذ الأرواح',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12903,
        129,
        N'C',
        N'ج',
        N'مطاردة السيارة بالدراجة الهوائية وتكسير زجاجها بالحجارة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        12904,
        129,
        N'D',
        N'د',
        N'التصفيق للسائق المتهور وتشجيعه على زيادة السرعة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1301,
        130,
        N'A',
        N'أ',
        N'الوصول في الساعة 08:30 صباحاً مع تقديم اعتذار شفهي بسيط',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1302,
        130,
        N'B',
        N'ب',
        N'الحضور قبل الموعد بـ 15 إلى 20 دقيقة لفحص التجهيزات والسلاح والمركبة وضمان الانطلاق في الوقت المحدد تماماً',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1303,
        130,
        N'C',
        N'ج',
        N'الحضور في الساعة 12:00 زوالاً لتناول وجبة الغداء مع الفريق',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        1304,
        130,
        N'D',
        N'د',
        N'عدم الحضور نهائياً وإغلاق الهاتف النقال طوال اليوم',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13101,
        131,
        N'A',
        N'أ',
        N'التستر الأعمى على الجرائم والسرقات التي يرتكبها الزميل داخل الوحدة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13102,
        131,
        N'B',
        N'ب',
        N'التآزر الصادق والدعم المتبادل والشجاعة المشتركة لإنجاز الواجب وحماية الزملاء في إطار الشرف والقانون',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13103,
        131,
        N'C',
        N'ج',
        N'رفض التحدث مع أي زميل ينتمي لمدينة أخرى',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13104,
        131,
        N'D',
        N'د',
        N'الهروب وترك الزميل محاصراً بمفرده في مواجهة الخطر',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13201,
        132,
        N'A',
        N'أ',
        N'لأن رجال الدرك ليس لديهم أي اهتمام بالشأن العام إطلاقاً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13202,
        132,
        N'B',
        N'ب',
        N'لضمان التجرد والنزاهة والمساواة في تطبيق القانون على الجميع، وصون وحدة المؤسسة من الصراعات الحزبية',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13203,
        132,
        N'C',
        N'ج',
        N'لأن الأحزاب السياسية تمنع الانتساب إليها لمن يرتدي الزي العسكري في المساء فقط',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13204,
        132,
        N'D',
        N'د',
        N'لتشجيع الناس على عدم المشاركة في الانتخابات',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13301,
        133,
        N'A',
        N'أ',
        N'الاستمرار في إطلاق النار حتى نفاد آخر رصاصة في المخزن',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13302,
        133,
        N'B',
        N'ب',
        N'التوقف الفوري عن الرمي، إبقاء الفوهة باتجاه الأهداف، وضع الإصبع خارج الزناد وتأمين السلاح',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13303,
        133,
        N'C',
        N'ج',
        N'الالتفات بالسلاح الملقم نحو المدرب لسؤاله عن سبب الصياح',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13304,
        133,
        N'D',
        N'د',
        N'رمي السلاح الملقم على الأرض والركض نحو الباب الخارجي',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13401,
        134,
        N'A',
        N'أ',
        N'تمزيق وثيقة المخالفة وتقديم اعتذار رسمي له والسماح له بالسياقة بسرعة مضاعفة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13402,
        134,
        N'B',
        N'ب',
        N'تطبيق القانون بكل تجرد وصرامة مهنية محترمة، وتأكيد أن الواجب الوطني يعلو فوق القرابة العائلية',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13403,
        134,
        N'C',
        N'ج',
        N'طلب مبلغ مالي مضاعف منه كعقاب عائلي خاص',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13404,
        134,
        N'D',
        N'د',
        N'الهروب والاختباء وراء شجرة لتفادي التحدث معه',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13501,
        135,
        N'A',
        N'أ',
        N'تجاهله تماماً والمشي وكأنه غير موجود لأنه ليس رئيسه المباشر في المكتب',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13502,
        135,
        N'B',
        N'ب',
        N'أداء التحية العسكرية النظامية الكاملة فوراً وبكل انضباط تقديراً للرتبة والتقاليد العسكرية العريقة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13503,
        135,
        N'C',
        N'ج',
        N'الغمز له بالعين والتلويح بيده بالتحية المدنية الخفيفة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13504,
        135,
        N'D',
        N'د',
        N'طلب بطاقة تعريفه وتفتيش جيوبه في وسط الساحة',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13601,
        136,
        N'A',
        N'أ',
        N'شراء طلاء وتغطية الخدش سراً وإنكار أي علم به لاحقاً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13602,
        136,
        N'B',
        N'ب',
        N'الإبلاغ الفوري والصادق للرئيس التسلسلي بالواقعة وإنجاز تقرير تقني بالحادث العرضي بشفافية',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13603,
        136,
        N'C',
        N'ج',
        N'اتهام الزميل الذي قاد السيارة في اليوم السابق بالتسبب في الحادث',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13604,
        136,
        N'D',
        N'د',
        N'ترك السيارة في الخلاء والمطالبة بسيارة جديدة بدلاً منها',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13701,
        137,
        N'A',
        N'أ',
        N'استخدام القوة المفرطة ضد أي شخص لا يبتسم لرجال الدورية',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13702,
        137,
        N'B',
        N'ب',
        N'مبادئ الشرعية، والضرورة الملحة، والتناسب الصارم مع حجم الخطر القائم، والتوقف فور زوال التهديد',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13703,
        137,
        N'C',
        N'ج',
        N'استعمال السلاح الناري في جميع الحالات البسيطة لتوفير وقت التحقيق',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13704,
        137,
        N'D',
        N'د',
        N'الامتناع المطلق عن لمس أي مجرم حتى لو كان يطلق النار على المواطنين',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13801,
        138,
        N'A',
        N'أ',
        N'سرد كافة التفاصيل وأسماء المتورطين وخطة الهجوم كاملة أثناء تناول العشاء',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13802,
        138,
        N'B',
        N'ب',
        N'الالتزام التام بالسر المهني، والامتناع بحكمة ومودة عن سرد أي معطيات عملياتية تمس سرية المهمة وأمنها',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13803,
        138,
        N'C',
        N'ج',
        N'نشر صور المحجوزات في مجموعة الدردشة العائلية على الواتساب',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13804,
        138,
        N'D',
        N'د',
        N'دعوة أفراد العائلة للحضور في الغد لمشاهدة التحقيق مع المشتبه بهم',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13901,
        139,
        N'A',
        N'أ',
        N'تبادل السباب والشتائم والاشتباك معه بالأيدي أمام الجمهور',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13902,
        139,
        N'B',
        N'ب',
        N'الحفاظ على الهدوء والوقار التام، وتثبيت جنحة إهانة موظف عمومي في محضر رسمي وتحريك المسطرة القضائية بصرامة',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13903,
        139,
        N'C',
        N'ج',
        N'البكاء وترك مكان الخدمة والذهاب للمنزل فوراً',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        13904,
        139,
        N'D',
        N'د',
        N'تحطيم سيارة السائق بواسطة السلاح الوظيفي في الشارع العام',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        14001,
        140,
        N'A',
        N'أ',
        N'مجرد عبارة شكلية تُكتب على الأوراق الرسمية دون أي التزام روحي أو وطني',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        14002,
        140,
        N'B',
        N'ب',
        N'العقيدة الوطنية الراسخة للإخلاص، والتفاني في خدمة المواطنين، والذود عن حوزة الوطن، والولاء التام للملك',
        1,
        1
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        14003,
        140,
        N'C',
        N'ج',
        N'شعار يتم تذكره في أوقات العطلات الرسمية فقط',
        0,
        0
    );
    INSERT INTO dbo.OptionsReponse (
        OptionId, QuestionId, LettreOption, LettreOptionArabe, EnonceOption, EstCorrecte, PoidsOption
    )
    VALUES (
        14004,
        140,
        N'D',
        N'د',
        N'عبارة خاصة بكتب التاريخ المدرسي القديم',
        0,
        0
    );
    SET IDENTITY_INSERT dbo.OptionsReponse OFF;
    PRINT '[OK] 560 Options de réponses insérées dans dbo.OptionsReponse (4 par question).';

    COMMIT TRANSACTION;
    PRINT '======================================================';
    PRINT '[SUCCÈS] SEED COMPLET DES 140 QUESTIONS EXÉCUTÉ !';
    PRINT '======================================================';
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
    DECLARE @ErrMsg NVARCHAR(4000) = ERROR_MESSAGE();
    DECLARE @ErrSeverity INT = ERROR_SEVERITY();
    DECLARE @ErrState INT = ERROR_STATE();
    PRINT '[ERREUR CRITIQUE] Annulation du seed : ' + @ErrMsg;
    RAISERROR(@ErrMsg, @ErrSeverity, @ErrState);
END CATCH
GO
