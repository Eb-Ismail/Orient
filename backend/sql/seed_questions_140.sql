-- ==============================================================================
-- ORIENT-GR - Seed SQL Server des 140 Questions QCM en Arabe
-- Idempotent : Ne supprime aucune table existante, préserve les données élèves
-- ==============================================================================

SET NOCOUNT ON;
BEGIN TRANSACTION;

-- 1. Synchronisation des 10 Domaines de Compétences (Catégories)
PRINT 'Mise à jour des 10 Domaines de compétences...';

MERGE INTO dbo.DomainesCompetences AS target
USING (VALUES
  (1, 'LOGIQUE', N'الاستدلال المنطقي', N'الاستدلال المنطقي والاستنباطي وحل السلاسل المتتابعة', 1.2),
  (2, 'ANALYSE_OBSERVATION', N'التحليل والملاحظة', N'تحليل مسارح العمليات واستخلاص القرائن المادية والسلوكية', 1.2),
  (3, 'CONCENTRATION_ATTENTION', N'التركيز والانتباه', N'اليقظة البصرية والسمعية والتدقيق في التفاصيل الدقيقة للأمان', 1.1),
  (4, 'RESOLUTION_PROBLEMES', N'حل المشكلات واتخاذ القرار', N'إدارة الطوارئ وتحديد الأولويات الحيوية تحت الضغط', 1.3),
  (5, 'SECURITE_ROUTIERE_MOTO', N'السلامة الطرقية وقيادة الدراجات', N'قواعد السير، ميكانيكا وديناميكا قيادة الدراجات، والمواكب الرسمية', 1.4),
  (6, 'POLICE_JUDICIAIRE', N'الشرطة القضائية والتحري', N'المساطر الجنائية، التلبس، الحراسة النظرية، والشرطة العلمية', 1.5),
  (7, 'INFORMATIQUE_DIGITAL', N'المعلوماتية والمهارات الرقمية', N'الأمن السيبراني، الشبكات التكتيكية، والتحري الرقمي الجنائي', 1.2),
  (8, 'COMMUNICATION_FORMATION', N'التواصل والتكوين', N'البيداغوجيا العسكرية، الاستماع النشط، والتواصل في الأزمات', 1.1),
  (9, 'ADMINISTRATION_SECRETARIAT', N'الإدارة والسكرتارية', N'التحرير والمراسلات العسكرية، البريد السري، وضبط السجلات', 1.0),
  (10, 'DISCIPLINE_SITUATION_PRO', N'المواقف المهنية والانضباط', N'الشرف العسكري، النزاهة، واجب التحفظ، والأخلاقيات المهنية', 1.4)
) AS source (DomaineId, Code, Intitule, Description, PoidsDefaut)
ON target.Code = source.Code
WHEN MATCHED THEN
  UPDATE SET Intitule = source.Intitule, Description = source.Description, PoidsDefaut = source.PoidsDefaut
WHEN NOT MATCHED THEN
  INSERT (DomaineId, Code, Intitule, Description, PoidsDefaut)
  VALUES (source.DomaineId, source.Code, source.Intitule, source.Description, source.PoidsDefaut);

-- 2. Synchronisation des Spécialités cibles
PRINT 'Vérification des spécialités...';

IF NOT EXISTS (SELECT 1 FROM dbo.Specialites WHERE Code = 'SPEC-MOTARD')
BEGIN
  INSERT INTO dbo.Specialites (Code, Intitule, Subdivision, Description, MissionsPrincipales, Icone, PlacesDisponibles, EstActive)
  VALUES ('SPEC-MOTARD', N'الدراجات النارية / السلامة الطرقية', N'Sécurité des Mobilités', N'Escadron Motocycliste de la Gendarmerie Royale', N'Escortes, police de la route, sécurité routière', 'Bike', 25, 1);
END;

IF NOT EXISTS (SELECT 1 FROM dbo.Specialites WHERE Code = 'SPEC-GEH')
BEGIN
  INSERT INTO dbo.Specialites (Code, Intitule, Subdivision, Description, MissionsPrincipales, Icone, PlacesDisponibles, EstActive)
  VALUES ('SPEC-GEH', N'GEH (Groupe d''Escorte et d''Honneur)', N'Garde Royale / Escorte', N'Unités d''Honneur et d''Escorte', N'Protection et escortes d''honneur', 'Shield', 15, 1);
END;

IF NOT EXISTS (SELECT 1 FROM dbo.Specialites WHERE Code = 'SPEC-GSI')
BEGIN
  INSERT INTO dbo.Specialites (Code, Intitule, Subdivision, Description, MissionsPrincipales, Icone, PlacesDisponibles, EstActive)
  VALUES ('SPEC-GSI', N'GSI (Groupe de Sécurité et d''Intervention)', N'Intervention Spécialisée', N'Groupe de Sécurité et d''Intervention', N'Interventions à haut risque et contre-terrorisme', 'Target', 15, 1);
END;

IF NOT EXISTS (SELECT 1 FROM dbo.Specialites WHERE Code = 'SPEC-JURIDIQUE')
BEGIN
  INSERT INTO dbo.Specialites (Code, Intitule, Subdivision, Description, MissionsPrincipales, Icone, PlacesDisponibles, EstActive)
  VALUES ('SPEC-JURIDIQUE', N'المجال القانوني والتشريعي', N'Affaires Juridiques', N'Contentieux et encadrement juridique', N'Conseil juridique et conformité des procédures', 'BookOpen', 10, 1);
END;

IF NOT EXISTS (SELECT 1 FROM dbo.Specialites WHERE Code = 'SPEC-FORMATION')
BEGIN
  INSERT INTO dbo.Specialites (Code, Intitule, Subdivision, Description, MissionsPrincipales, Icone, PlacesDisponibles, EstActive)
  VALUES ('SPEC-FORMATION', N'التكوين والتعليم العسكري', N'Formation et Enseignement', N'Instruction et encadrement pédagogique', N'Formation initiale et continue des élèves', 'GraduationCap', 12, 1);
END;

IF NOT EXISTS (SELECT 1 FROM dbo.Specialites WHERE Code = 'SPEC-TERRAIN')
BEGIN
  INSERT INTO dbo.Specialites (Code, Intitule, Subdivision, Description, MissionsPrincipales, Icone, PlacesDisponibles, EstActive)
  VALUES ('SPEC-TERRAIN', N'العمليات الميدانية والتدخل', N'Opérations de Terrain', N'Surveillance, intervention et présence terrain', N'Opérations mobiles et maintien de l''ordre', 'Compass', 30, 1);
END;

-- 3. Insertion / Mise à jour des 140 Questions
PRINT 'Insertion et mise à jour des 140 questions...';

-- Question 1: Q-LOG-001 (LOGIQUE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 1 OR Code = 'Q-LOG-001')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 1,
      Code = 'Q-LOG-001',
      Enonce = N'إذا كانت جميع دوريات التدخل السريع مجهزة بنظام الاتصال المشفر، وبعض سيارات الدرك الملكي تابعة لفرق التدخل السريع، فما هو الاستنتاج المنطقي الحتمي الصائب؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'بما أن كل دوريات التدخل مجهزة بنظام مشفر، والبعض من سيارات الدرك ينتمي لهذا الصنف، فإن بعض سيارات الدرك على الأقل مجهزة بنظام الاتصال المشفر بالضرورة المنطقية.',
      CompetencesAssociees = N'["الاستدلال الاستنباطي","التحليل المنطقي الصارم"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-INFO","SPEC-PSIG"]',
      OrdreAffichage = 1,
      EstActive = 1
  WHERE QuestionId = 1 OR Code = 'Q-LOG-001';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    1, 1, 1, 'Q-LOG-001', N'إذا كانت جميع دوريات التدخل السريع مجهزة بنظام الاتصال المشفر، وبعض سيارات الدرك الملكي تابعة لفرق التدخل السريع، فما هو الاستنتاج المنطقي الحتمي الصائب؟',
    N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'بما أن كل دوريات التدخل مجهزة بنظام مشفر، والبعض من سيارات الدرك ينتمي لهذا الصنف، فإن بعض سيارات الدرك على الأقل مجهزة بنظام الاتصال المشفر بالضرورة المنطقية.', N'["الاستدلال الاستنباطي","التحليل المنطقي الصارم"]',
    N'["SPEC-PJ","SPEC-INFO","SPEC-PSIG"]', 1, 1, 0, 1
  );
END;

-- Options de la question 1
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 1;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (11, 1, 'A', N'جميع سيارات الدرك الملكي بدون استثناء مجهزة بالنظام المشفر', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (12, 1, 'B', N'بعض سيارات الدرك الملكي على الأقل مجهزة بنظام الاتصال المشفر', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (13, 1, 'C', N'لا توجد أي سيارة تابعة للدرك الملكي تستخدم الاتصال المشفر', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (14, 1, 'D', N'الاتصال المشفر مخصص فقط للشاحنات اللوجستية الثقيلة', 0);

-- Question 2: Q-LOG-002 (LOGIQUE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 2 OR Code = 'Q-LOG-002')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 1,
      Code = 'Q-LOG-002',
      Enonce = N'في سلسلة التوقيت العملياتي التالية للدوريات: (06:00 ، 06:45 ، 07:45 ، 09:00 ، ...)، ما هو توقيت انطلاق الدورية الموالية وفق النمط الزمني المضطرد؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الفوارق الزمنية تتصاعد بمقدار 15 دقيقة في كل خطوة: (+45 دقيقة، ثم +60 دقيقة، ثم +75 دقيقة). الفارق التالي هو +90 دقيقة (ساعة ونصف)، و09:00 + 1h30 = 10:30.',
      CompetencesAssociees = N'["الاستدلال التتابعي","الحساب الذهني العملياتي"]',
      SpecialitesAssociees = N'["SPEC-MOTARD","SPEC-SEC-ADMIN"]',
      OrdreAffichage = 2,
      EstActive = 1
  WHERE QuestionId = 2 OR Code = 'Q-LOG-002';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    2, 1, 1, 'Q-LOG-002', N'في سلسلة التوقيت العملياتي التالية للدوريات: (06:00 ، 06:45 ، 07:45 ، 09:00 ، ...)، ما هو توقيت انطلاق الدورية الموالية وفق النمط الزمني المضطرد؟',
    N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'الفوارق الزمنية تتصاعد بمقدار 15 دقيقة في كل خطوة: (+45 دقيقة، ثم +60 دقيقة، ثم +75 دقيقة). الفارق التالي هو +90 دقيقة (ساعة ونصف)، و09:00 + 1h30 = 10:30.', N'["الاستدلال التتابعي","الحساب الذهني العملياتي"]',
    N'["SPEC-MOTARD","SPEC-SEC-ADMIN"]', 2, 1, 0, 1
  );
END;

-- Options de la question 2
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 2;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (21, 2, 'A', N'10:00', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (22, 2, 'B', N'10:15', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (23, 2, 'C', N'10:30', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (24, 2, 'D', N'10:45', 0);

-- Question 3: Q-LOG-003 (LOGIQUE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 3 OR Code = 'Q-LOG-003')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 1,
      Code = 'Q-LOG-003',
      Enonce = N'إذا كان الضابط (أ) أقدم رتبة من الرقيب (ب)، والرقيب (ج) أحدث رتبة من الرقيب (ب)، والمساعد (د) أقدم رتبة من الضابط (أ)، فمن هو صاحب الرتبة الأدنى بين الأربعة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الترتيب التنازلي للأقدمية: المساعد (د) > الضابط (أ) > الرقيب (ب) > الرقيب (ج). إذن الرقيب (ج) هو الأحدث رتبة أي صاحب الرتبة الأدنى في المجموعة.',
      CompetencesAssociees = N'["الترتيب الهرمي","الاستنتاج المباشر"]',
      SpecialitesAssociees = N'["SPEC-SEC-ADMIN","SPEC-INSTRUCTEUR"]',
      OrdreAffichage = 3,
      EstActive = 1
  WHERE QuestionId = 3 OR Code = 'Q-LOG-003';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    3, 1, 1, 'Q-LOG-003', N'إذا كان الضابط (أ) أقدم رتبة من الرقيب (ب)، والرقيب (ج) أحدث رتبة من الرقيب (ب)، والمساعد (د) أقدم رتبة من الضابط (أ)، فمن هو صاحب الرتبة الأدنى بين الأربعة؟',
    N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'الترتيب التنازلي للأقدمية: المساعد (د) > الضابط (أ) > الرقيب (ب) > الرقيب (ج). إذن الرقيب (ج) هو الأحدث رتبة أي صاحب الرتبة الأدنى في المجموعة.', N'["الترتيب الهرمي","الاستنتاج المباشر"]',
    N'["SPEC-SEC-ADMIN","SPEC-INSTRUCTEUR"]', 3, 1, 0, 1
  );
END;

-- Options de la question 3
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 3;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (31, 3, 'A', N'الضابط (أ)', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (32, 3, 'B', N'الرقيب (ب)', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (33, 3, 'C', N'الرقيب (ج)', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (34, 3, 'D', N'المساعد (د)', 0);

-- Question 4: Q-LOG-004 (LOGIQUE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 4 OR Code = 'Q-LOG-004')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 1,
      Code = 'Q-LOG-004',
      Enonce = N'خمسة عناصر درك (س، ع، ص، ق، ر) في طابور تفتيش. العنصر (ص) ليس الأول ولا الأخير. العنصر (س) يسبق (ع) مباشرة. العنصر (ر) في المركز الأخير. إذا كان (ص) يسبق (س)، فمن يقف أولاً؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'العنصر (ر) في المركز الخامس والأخير. ترتيب (ص يسبق س يسبق ع) يأخذ 3 مراكز متتالية. بما أن (ص) ليس الأول ولا الأخير، فمكانه هو الثاني، يليه (س) ثالثاً، ثم (ع) رابعاً، و(ر) خامساً. إذن المركز الأول حتماً هو للعنصر (ق).',
      CompetencesAssociees = N'["حل المشكلات المنطقية المركبة","الترتيب المكاني"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-GSI"]',
      OrdreAffichage = 4,
      EstActive = 1
  WHERE QuestionId = 4 OR Code = 'Q-LOG-004';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    4, 1, 1, 'Q-LOG-004', N'خمسة عناصر درك (س، ع، ص، ق، ر) في طابور تفتيش. العنصر (ص) ليس الأول ولا الأخير. العنصر (س) يسبق (ع) مباشرة. العنصر (ر) في المركز الأخير. إذا كان (ص) يسبق (س)، فمن يقف أولاً؟',
    N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'العنصر (ر) في المركز الخامس والأخير. ترتيب (ص يسبق س يسبق ع) يأخذ 3 مراكز متتالية. بما أن (ص) ليس الأول ولا الأخير، فمكانه هو الثاني، يليه (س) ثالثاً، ثم (ع) رابعاً، و(ر) خامساً. إذن المركز الأول حتماً هو للعنصر (ق).', N'["حل المشكلات المنطقية المركبة","الترتيب المكاني"]',
    N'["SPEC-PJ","SPEC-GSI"]', 4, 1, 0, 1
  );
END;

-- Options de la question 4
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 4;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (41, 4, 'A', N'العنصر (س)', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (42, 4, 'B', N'العنصر (ق)', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (43, 4, 'C', N'العنصر (ص)', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (44, 4, 'D', N'العنصر (ع)', 0);

-- Question 5: Q-LOG-005 (LOGIQUE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 5 OR Code = 'Q-LOG-005')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 1,
      Code = 'Q-LOG-005',
      Enonce = N'إذا كانت العبارة الشرطية التالية صحيحة: "إذا تم تفعيل خطة الطوارئ (أ)، يتم وجوباً إغلاق المعبر الحدودي (ب)". فما هي العبارة المعاكسة إيجابياً (Contraposée) التي تعتبر صحيحة حتماً؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1.5,
      TempsLimiteSecondes = 90,
      Explication = N'قاعدة المنطق الصوري: العبارة (إذا تحقق أ فإن ب يتحقق) تكافئ منطقياً (إذا لم يتحقق ب، فإنه حتماً لم يتم تفعيل أ).',
      CompetencesAssociees = N'["المنطق الرياضي والرمزي","التحليل الاستدلالي"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-INFO"]',
      OrdreAffichage = 5,
      EstActive = 1
  WHERE QuestionId = 5 OR Code = 'Q-LOG-005';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    5, 1, 1, 'Q-LOG-005', N'إذا كانت العبارة الشرطية التالية صحيحة: "إذا تم تفعيل خطة الطوارئ (أ)، يتم وجوباً إغلاق المعبر الحدودي (ب)". فما هي العبارة المعاكسة إيجابياً (Contraposée) التي تعتبر صحيحة حتماً؟',
    N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.', 'QCM_UNIQUE', 'MOYEN', 1.5,
    90, N'قاعدة المنطق الصوري: العبارة (إذا تحقق أ فإن ب يتحقق) تكافئ منطقياً (إذا لم يتحقق ب، فإنه حتماً لم يتم تفعيل أ).', N'["المنطق الرياضي والرمزي","التحليل الاستدلالي"]',
    N'["SPEC-PJ","SPEC-INFO"]', 5, 1, 0, 1
  );
END;

-- Options de la question 5
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 5;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (51, 5, 'A', N'إذا تم إغلاق المعبر (ب)، فإن الخطة (أ) قد تم تفعيلها بالضرورة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (52, 5, 'B', N'إذا لم يتم إغلاق المعبر الحدودي (ب)، فإن خطة الطوارئ (أ) لم تفعل حتماً', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (53, 5, 'C', N'إذا لم تفعل الخطة (أ)، فلن يغلق المعبر (ب) أبداً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (54, 5, 'D', N'إغلاق المعبر لا يرتبط بأي خطة أمنية مسبقة', 0);

-- Question 6: Q-LOG-006 (LOGIQUE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 6 OR Code = 'Q-LOG-006')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 1,
      Code = 'Q-LOG-006',
      Enonce = N'سلسلة أعداد تمثل تشفير الاتصالات التكتيكية: (2 ، 6 ، 18 ، 54 ، ...). ما هو العدد التالي في السلسلة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'المتتالية تضاعفية بضرب كل حد في العدد 3 (2×3=6 ، 6×3=18 ، 18×3=54). الحد التالي هو 54 × 3 = 162.',
      CompetencesAssociees = N'["المتتاليات الحسابية","الاستدلال العددي السريع"]',
      SpecialitesAssociees = N'["SPEC-INFO","SPEC-PJ"]',
      OrdreAffichage = 6,
      EstActive = 1
  WHERE QuestionId = 6 OR Code = 'Q-LOG-006';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    6, 1, 1, 'Q-LOG-006', N'سلسلة أعداد تمثل تشفير الاتصالات التكتيكية: (2 ، 6 ، 18 ، 54 ، ...). ما هو العدد التالي في السلسلة؟',
    N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'المتتالية تضاعفية بضرب كل حد في العدد 3 (2×3=6 ، 6×3=18 ، 18×3=54). الحد التالي هو 54 × 3 = 162.', N'["المتتاليات الحسابية","الاستدلال العددي السريع"]',
    N'["SPEC-INFO","SPEC-PJ"]', 6, 1, 0, 1
  );
END;

-- Options de la question 6
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 6;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (61, 6, 'A', N'108', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (62, 6, 'B', N'144', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (63, 6, 'C', N'162', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (64, 6, 'D', N'180', 0);

-- Question 7: Q-LOG-007 (LOGIQUE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 7 OR Code = 'Q-LOG-007')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 1,
      Code = 'Q-LOG-007',
      Enonce = N'في مستودع للأسلحة، كل البنادق الآلية مرقمة، وبعض الأسلحة المرقمة مصنوعة من سبائك التيتانيوم. ما النتيجة المنطقية التي لا يمكن دحضها؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'لا يمكن الجزم بأن كل البنادق من التيتانيوم ولا بأن التيتانيوم للبنادق فقط، لكن الثابت يقيناً هو أن بعض الأسلحة في المستودع مرقمة.',
      CompetencesAssociees = N'["الاستقراء المنطقي","نفي المغالطات الصورية"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-PSIG"]',
      OrdreAffichage = 7,
      EstActive = 1
  WHERE QuestionId = 7 OR Code = 'Q-LOG-007';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    7, 1, 1, 'Q-LOG-007', N'في مستودع للأسلحة، كل البنادق الآلية مرقمة، وبعض الأسلحة المرقمة مصنوعة من سبائك التيتانيوم. ما النتيجة المنطقية التي لا يمكن دحضها؟',
    N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'لا يمكن الجزم بأن كل البنادق من التيتانيوم ولا بأن التيتانيوم للبنادق فقط، لكن الثابت يقيناً هو أن بعض الأسلحة في المستودع مرقمة.', N'["الاستقراء المنطقي","نفي المغالطات الصورية"]',
    N'["SPEC-PJ","SPEC-PSIG"]', 7, 1, 0, 1
  );
END;

-- Options de la question 7
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 7;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (71, 7, 'A', N'كل بنادق المستودع مصنوعة حتماً من التيتانيوم', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (72, 7, 'B', N'يوجد أسلحة مرقمة داخل المستودع', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (73, 7, 'C', N'لا توجد بنادق مصنوعة من التيتانيوم إطلاقاً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (74, 7, 'D', N'جميع المسدسات الفردية غير مرقمة', 0);

-- Question 8: Q-LOG-008 (LOGIQUE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 8 OR Code = 'Q-LOG-008')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 1,
      Code = 'Q-LOG-008',
      Enonce = N'تستغرق سيارة الدرك ساعة و20 دقيقة لقطع مسافة بسرعة 90 كم/س. كم ستستغرق نفس السيارة لقطع ذات المسافة إذا رفعت سرعتها إلى 120 كم/س؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1.5,
      TempsLimiteSecondes = 90,
      Explication = N'ساعة و20 دقيقة = 4/3 ساعة. المسافة = 90 × (4/3) = 120 كم. بالسرعة الجديدة 120 كم/س: الزمن = المسافة / السرعة = 120 / 120 = ساعة واحدة تماماً (60 دقيقة).',
      CompetencesAssociees = N'["التناسب العكسي","الحساب التقديري العملياتي"]',
      SpecialitesAssociees = N'["SPEC-MOTARD","SPEC-PSIG"]',
      OrdreAffichage = 8,
      EstActive = 1
  WHERE QuestionId = 8 OR Code = 'Q-LOG-008';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    8, 1, 1, 'Q-LOG-008', N'تستغرق سيارة الدرك ساعة و20 دقيقة لقطع مسافة بسرعة 90 كم/س. كم ستستغرق نفس السيارة لقطع ذات المسافة إذا رفعت سرعتها إلى 120 كم/س؟',
    N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.', 'QCM_UNIQUE', 'MOYEN', 1.5,
    90, N'ساعة و20 دقيقة = 4/3 ساعة. المسافة = 90 × (4/3) = 120 كم. بالسرعة الجديدة 120 كم/س: الزمن = المسافة / السرعة = 120 / 120 = ساعة واحدة تماماً (60 دقيقة).', N'["التناسب العكسي","الحساب التقديري العملياتي"]',
    N'["SPEC-MOTARD","SPEC-PSIG"]', 8, 1, 0, 1
  );
END;

-- Options de la question 8
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 8;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (81, 8, 'A', N'45 دقيقة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (82, 8, 'B', N'50 دقيقة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (83, 8, 'C', N'60 دقيقة (ساعة واحدة)', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (84, 8, 'D', N'70 دقيقة', 0);

-- Question 9: Q-LOG-009 (LOGIQUE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 9 OR Code = 'Q-LOG-009')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 1,
      Code = 'Q-LOG-009',
      Enonce = N'إذا كانت الإشارة اللاسلكية الخضراء تعني "تقدم"، والصفراء تعني "استعد"، والحمراء تعني "توقف". إذا ألغي اللون الأصفر واستعيض عنه بوميض أخضر متقطع، فما هو التفسير المنطقي لوميض أخضر متقطع؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الاستبدال المنطقي المباشر: الوميض الأخضر أخذ دلالة اللون الأصفر الملغى، وبالتالي فدلالته الحتمية هي "استعد".',
      CompetencesAssociees = N'["تأويل الإشارات الميدانية","الترميز العملياتي"]',
      SpecialitesAssociees = N'["SPEC-GEH","SPEC-MOTARD"]',
      OrdreAffichage = 9,
      EstActive = 1
  WHERE QuestionId = 9 OR Code = 'Q-LOG-009';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    9, 1, 1, 'Q-LOG-009', N'إذا كانت الإشارة اللاسلكية الخضراء تعني "تقدم"، والصفراء تعني "استعد"، والحمراء تعني "توقف". إذا ألغي اللون الأصفر واستعيض عنه بوميض أخضر متقطع، فما هو التفسير المنطقي لوميض أخضر متقطع؟',
    N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'الاستبدال المنطقي المباشر: الوميض الأخضر أخذ دلالة اللون الأصفر الملغى، وبالتالي فدلالته الحتمية هي "استعد".', N'["تأويل الإشارات الميدانية","الترميز العملياتي"]',
    N'["SPEC-GEH","SPEC-MOTARD"]', 9, 1, 0, 1
  );
END;

-- Options de la question 9
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 9;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (91, 9, 'A', N'توقف فوري وشامل', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (92, 9, 'B', N'استعد للتحرك أو اتخاذ الموقع', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (93, 9, 'C', N'انسحاب تكتيكي للخلف', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (94, 9, 'D', N'طلب إمداد بالوقود', 0);

-- Question 10: Q-LOG-010 (LOGIQUE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 10 OR Code = 'Q-LOG-010')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 1,
      Code = 'Q-LOG-010',
      Enonce = N'متتالية أشكال هندسية في شاشات الرادار: (مثلث: 3 زوايا ، مربع: 4 زوايا ، مخمس: 5 زوايا ، مسدس: 6 زوايا). إذا كان الشكل التالي يزيد في عدد الأقطار وليس الزوايا فقط، فما هو عدد أضلاع الشكل التالي؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'النمط يتبع بانتظام تسلسل المضلعات المنتظمة بإضافة ضلع واحد في كل خطوة (3، 4، 5، 6)، فالشكل الموالي هو المسبع ذو 7 أضلاع.',
      CompetencesAssociees = N'["الاستدلال الهندسي","التعرف على الأنماط"]',
      SpecialitesAssociees = N'["SPEC-INFO","SPEC-INSTRUCTEUR"]',
      OrdreAffichage = 10,
      EstActive = 1
  WHERE QuestionId = 10 OR Code = 'Q-LOG-010';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    10, 1, 1, 'Q-LOG-010', N'متتالية أشكال هندسية في شاشات الرادار: (مثلث: 3 زوايا ، مربع: 4 زوايا ، مخمس: 5 زوايا ، مسدس: 6 زوايا). إذا كان الشكل التالي يزيد في عدد الأقطار وليس الزوايا فقط، فما هو عدد أضلاع الشكل التالي؟',
    N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'النمط يتبع بانتظام تسلسل المضلعات المنتظمة بإضافة ضلع واحد في كل خطوة (3، 4، 5، 6)، فالشكل الموالي هو المسبع ذو 7 أضلاع.', N'["الاستدلال الهندسي","التعرف على الأنماط"]',
    N'["SPEC-INFO","SPEC-INSTRUCTEUR"]', 10, 1, 0, 1
  );
END;

-- Options de la question 10
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 10;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (101, 10, 'A', N'6 أضلاع', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (102, 10, 'B', N'7 أضلاع (مسبع)', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (103, 10, 'C', N'8 أضلاع', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (104, 10, 'D', N'9 أضلاع', 0);

-- Question 11: Q-LOG-011 (LOGIQUE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 11 OR Code = 'Q-LOG-011')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 1,
      Code = 'Q-LOG-011',
      Enonce = N'ثلاثة حراس (علي، حسن، عمر). أحدهم صادق دائماً، والآخر كاذب دائماً، والثالث يصدق أحياناً. قال علي: "حسن كاذب". وقال حسن: "عمر كاذب". وقال عمر: "علي وحسن كاذبان معاً". من هو الصادق دائماً من بينهم؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'لو كان عمر صادقاً لكان علي وحسن كاذبين، لكن قول حسن "عمر كاذب" سيكون صادقاً وهذا تناقض. إذن عمر كاذب. بالتالي قول حسن "عمر كاذب" صحيح، فحسن هو الصادق وعلي هو المتذبذب.',
      CompetencesAssociees = N'["مفارقات الصدق والكذب","التحليل الاستدلالي المتقدم"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-PJ"]',
      OrdreAffichage = 11,
      EstActive = 1
  WHERE QuestionId = 11 OR Code = 'Q-LOG-011';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    11, 1, 1, 'Q-LOG-011', N'ثلاثة حراس (علي، حسن، عمر). أحدهم صادق دائماً، والآخر كاذب دائماً، والثالث يصدق أحياناً. قال علي: "حسن كاذب". وقال حسن: "عمر كاذب". وقال عمر: "علي وحسن كاذبان معاً". من هو الصادق دائماً من بينهم؟',
    N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'لو كان عمر صادقاً لكان علي وحسن كاذبين، لكن قول حسن "عمر كاذب" سيكون صادقاً وهذا تناقض. إذن عمر كاذب. بالتالي قول حسن "عمر كاذب" صحيح، فحسن هو الصادق وعلي هو المتذبذب.', N'["مفارقات الصدق والكذب","التحليل الاستدلالي المتقدم"]',
    N'["SPEC-PJ","SPEC-PJ"]', 11, 1, 0, 1
  );
END;

-- Options de la question 11
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 11;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (111, 11, 'A', N'علي', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (112, 11, 'B', N'حسن', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (113, 11, 'C', N'عمر', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (114, 11, 'D', N'لا يمكن تحديده رياضياً', 0);

-- Question 12: Q-LOG-012 (LOGIQUE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 12 OR Code = 'Q-LOG-012')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 1,
      Code = 'Q-LOG-012',
      Enonce = N'متتالية أرقام مشفرة لمجموعات الدوريات: (100 ، 95 ، 85 ، 70 ، 50 ، ...). ما هو الرقم الآتي في المتتالية؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الفروق تتناقص بتصاعد: (-5 ، -10 ، -15 ، -20). الفارق التالي هو -25. إذن: 50 - 25 = 25.',
      CompetencesAssociees = N'["الاستنتاج الرياضي","التحليل المتسلسل"]',
      SpecialitesAssociees = N'["SPEC-INFO","SPEC-SEC-ADMIN"]',
      OrdreAffichage = 12,
      EstActive = 1
  WHERE QuestionId = 12 OR Code = 'Q-LOG-012';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    12, 1, 1, 'Q-LOG-012', N'متتالية أرقام مشفرة لمجموعات الدوريات: (100 ، 95 ، 85 ، 70 ، 50 ، ...). ما هو الرقم الآتي في المتتالية؟',
    N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'الفروق تتناقص بتصاعد: (-5 ، -10 ، -15 ، -20). الفارق التالي هو -25. إذن: 50 - 25 = 25.', N'["الاستنتاج الرياضي","التحليل المتسلسل"]',
    N'["SPEC-INFO","SPEC-SEC-ADMIN"]', 12, 1, 0, 1
  );
END;

-- Options de la question 12
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 12;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (121, 12, 'A', N'30', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (122, 12, 'B', N'25', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (123, 12, 'C', N'20', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (124, 12, 'D', N'15', 0);

-- Question 13: Q-LOG-013 (LOGIQUE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 13 OR Code = 'Q-LOG-013')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 1,
      Code = 'Q-LOG-013',
      Enonce = N'إذا كانت جميع المعدات العسكرية الثقيلة تخضع للصيانة الشهرية، وجميع الآليات الخاضعة للصيانة الشهرية تسجل في الدفتر الرسمي، فما هي النتيجة المنطقية المؤكدة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'قياس منطقي قاطع من الدرجة الأولى (معدات ثقيلة -> صيانة شهرية -> تسجيل بالدفتر). النتيجة: جميع المعدات الثقيلة تسجل في الدفتر الرسمي حتماً.',
      CompetencesAssociees = N'["القياس المنطقي التام","قواعد الاستنتاج"]',
      SpecialitesAssociees = N'["SPEC-SEC-ADMIN","SPEC-PJ"]',
      OrdreAffichage = 13,
      EstActive = 1
  WHERE QuestionId = 13 OR Code = 'Q-LOG-013';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    13, 1, 1, 'Q-LOG-013', N'إذا كانت جميع المعدات العسكرية الثقيلة تخضع للصيانة الشهرية، وجميع الآليات الخاضعة للصيانة الشهرية تسجل في الدفتر الرسمي، فما هي النتيجة المنطقية المؤكدة؟',
    N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'قياس منطقي قاطع من الدرجة الأولى (معدات ثقيلة -> صيانة شهرية -> تسجيل بالدفتر). النتيجة: جميع المعدات الثقيلة تسجل في الدفتر الرسمي حتماً.', N'["القياس المنطقي التام","قواعد الاستنتاج"]',
    N'["SPEC-SEC-ADMIN","SPEC-PJ"]', 13, 1, 0, 1
  );
END;

-- Options de la question 13
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 13;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (131, 13, 'A', N'جميع المعدات العسكرية الثقيلة تسجل في الدفتر الرسمي بالضرورة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (132, 13, 'B', N'المعدات الخفيفة فقط هي التي تسجل في الدفتر', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (133, 13, 'C', N'الدفتر الرسمي لا يحتوي على أي معدات ثقيلة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (134, 13, 'D', N'الصيانة الشهرية اختيارية وليست إلزامية', 0);

-- Question 14: Q-LOG-014 (LOGIQUE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 14 OR Code = 'Q-LOG-014')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 1,
      Code = 'Q-LOG-014',
      Enonce = N'خزان وقود بقاعدة عسكرية يفرغ بمعدل ثابت كل 4 ساعات بمقدار الثلث. إذا كان ممتلئاً بالكامل الساعة 08:00 صباحاً، فكم سيتبقى منه في الساعة 16:00 من نفس اليوم؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'بين 08:00 و16:00 تمر 8 ساعات (فترتان من 4 ساعات). في الفترة الأولى ينقص الثلث ويتبقى 2/3. في الفترة الثانية ينقص ثلث المتبقي: (2/3) - (1/3 × 2/3) = (2/3) × (2/3) = 4/9.',
      CompetencesAssociees = N'["الحساب التراكمي النسبي","التفكير الاستراتيجي في الإمداد"]',
      SpecialitesAssociees = N'["SPEC-PSIG","SPEC-SEC-ADMIN"]',
      OrdreAffichage = 14,
      EstActive = 1
  WHERE QuestionId = 14 OR Code = 'Q-LOG-014';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    14, 1, 1, 'Q-LOG-014', N'خزان وقود بقاعدة عسكرية يفرغ بمعدل ثابت كل 4 ساعات بمقدار الثلث. إذا كان ممتلئاً بالكامل الساعة 08:00 صباحاً، فكم سيتبقى منه في الساعة 16:00 من نفس اليوم؟',
    N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'بين 08:00 و16:00 تمر 8 ساعات (فترتان من 4 ساعات). في الفترة الأولى ينقص الثلث ويتبقى 2/3. في الفترة الثانية ينقص ثلث المتبقي: (2/3) - (1/3 × 2/3) = (2/3) × (2/3) = 4/9.', N'["الحساب التراكمي النسبي","التفكير الاستراتيجي في الإمداد"]',
    N'["SPEC-PSIG","SPEC-SEC-ADMIN"]', 14, 1, 0, 1
  );
END;

-- Options de la question 14
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 14;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (141, 14, 'A', N'1/3 من الخزان', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (142, 14, 'B', N'4/9 من الخزان', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (143, 14, 'C', N'1/2 من الخزان', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (144, 14, 'D', N'يفرغ تماماً ويصل للصفر', 0);

-- Question 15: Q-LOG-015 (LOGIQUE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 15 OR Code = 'Q-LOG-015')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 1,
      Code = 'Q-LOG-015',
      Enonce = N'إذا كانت كلمة "درك" تشفر رقمياً بالرمز (4-10-20)، وكلمة "أمن" تشفر بالرمز (1-24-25)، فما المبدأ الرياضي المعتمد في توليد هذا التشفير التكتيكي البسيط؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1.5,
      TempsLimiteSecondes = 90,
      Explication = N'استبدال كل حرف أبجدي برقمه التسلسلي المباشر في جدول الأبجدية المتفق عليه كنظام مصفوفة إبدال ثابتة.',
      CompetencesAssociees = N'["التشفير التناظري","الاستدلال الاستدلالي الرمزي"]',
      SpecialitesAssociees = N'["SPEC-INFO","SPEC-PJ"]',
      OrdreAffichage = 15,
      EstActive = 1
  WHERE QuestionId = 15 OR Code = 'Q-LOG-015';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    15, 1, 1, 'Q-LOG-015', N'إذا كانت كلمة "درك" تشفر رقمياً بالرمز (4-10-20)، وكلمة "أمن" تشفر بالرمز (1-24-25)، فما المبدأ الرياضي المعتمد في توليد هذا التشفير التكتيكي البسيط؟',
    N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.', 'QCM_UNIQUE', 'MOYEN', 1.5,
    90, N'استبدال كل حرف أبجدي برقمه التسلسلي المباشر في جدول الأبجدية المتفق عليه كنظام مصفوفة إبدال ثابتة.', N'["التشفير التناظري","الاستدلال الاستدلالي الرمزي"]',
    N'["SPEC-INFO","SPEC-PJ"]', 15, 1, 0, 1
  );
END;

-- Options de la question 15
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 15;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (151, 15, 'A', N'ضرب عدد حروف الكلمة في تاريخ اليوم', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (152, 15, 'B', N'إبدال كل حرف بالرتبة الأبجدية المحددة في مصفوفة التشفير', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (153, 15, 'C', N'اختيار الأرقام عشوائياً دون أي قاعدة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (154, 15, 'D', N'حساب عدد النقاط في كل حرف فقط', 0);

-- Question 16: Q-LOG-016 (LOGIQUE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 16 OR Code = 'Q-LOG-016')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 1,
      Code = 'Q-LOG-016',
      Enonce = N'أربعة صناديق ذخيرة مغلقة تحمل ملصقات خاطئة جميعها: [رصاص 9 مم]، [رصاص 7.62 مم]، [مختلط]. إذا سمح لك بفتح صندوق واحد فقط وأخذ طلقة واحدة منه لمعرفة محتويات جميع الصناديق، فأي صندوق تختار فتحه؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'تختار الصندوق الموسوم بـ [مختلط]. بما أن ملصقه خاطئ حتماً، فالطلقة التي تسحبها تحدد نوعه بيقين (إما 9 مم فقط أو 7.62 مم فقط)، وبالتالي ينكشف محتوى الصندوقين الآخرين بالإقصاء المباشر.',
      CompetencesAssociees = N'["الاستدلال الاستنباطي الإقصائي","المنطق الرياضي للمعلومة الناقصة"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-GSI"]',
      OrdreAffichage = 16,
      EstActive = 1
  WHERE QuestionId = 16 OR Code = 'Q-LOG-016';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    16, 1, 1, 'Q-LOG-016', N'أربعة صناديق ذخيرة مغلقة تحمل ملصقات خاطئة جميعها: [رصاص 9 مم]، [رصاص 7.62 مم]، [مختلط]. إذا سمح لك بفتح صندوق واحد فقط وأخذ طلقة واحدة منه لمعرفة محتويات جميع الصناديق، فأي صندوق تختار فتحه؟',
    N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'تختار الصندوق الموسوم بـ [مختلط]. بما أن ملصقه خاطئ حتماً، فالطلقة التي تسحبها تحدد نوعه بيقين (إما 9 مم فقط أو 7.62 مم فقط)، وبالتالي ينكشف محتوى الصندوقين الآخرين بالإقصاء المباشر.', N'["الاستدلال الاستنباطي الإقصائي","المنطق الرياضي للمعلومة الناقصة"]',
    N'["SPEC-PJ","SPEC-GSI"]', 16, 1, 0, 1
  );
END;

-- Options de la question 16
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 16;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (161, 16, 'A', N'الصندوق الذي يحمل ملصق [رصاص 9 مم]', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (162, 16, 'B', N'الصندوق الذي يحمل ملصق [مختلط]', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (163, 16, 'C', N'الصندوق الذي يحمل ملصق [رصاص 7.62 مم]', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (164, 16, 'D', N'لا يمكن معرفتها دون فتح جميع الصناديق', 0);

-- Question 17: Q-LOG-017 (LOGIQUE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 17 OR Code = 'Q-LOG-017')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 1,
      Code = 'Q-LOG-017',
      Enonce = N'إذا علمت أن "كل حراس الشخصيات يتقنون الرماية الدقيقة"، و"بعض المظليين هم حراس شخصيات"، فما هي النتيجة الحتمية؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'تقاطع مجموعة المظليين مع مجموعة حراس الشخصيات يعني حتماً أن العناصر المشتركة تتقن الرماية الدقيقة، إذن: بعض المظليين يتقنون الرماية الدقيقة.',
      CompetencesAssociees = N'["المنطق الأرسطي","العلاقات بين المجموعات"]',
      SpecialitesAssociees = N'["SPEC-GEH","SPEC-GSI"]',
      OrdreAffichage = 17,
      EstActive = 1
  WHERE QuestionId = 17 OR Code = 'Q-LOG-017';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    17, 1, 1, 'Q-LOG-017', N'إذا علمت أن "كل حراس الشخصيات يتقنون الرماية الدقيقة"، و"بعض المظليين هم حراس شخصيات"، فما هي النتيجة الحتمية؟',
    N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'تقاطع مجموعة المظليين مع مجموعة حراس الشخصيات يعني حتماً أن العناصر المشتركة تتقن الرماية الدقيقة، إذن: بعض المظليين يتقنون الرماية الدقيقة.', N'["المنطق الأرسطي","العلاقات بين المجموعات"]',
    N'["SPEC-GEH","SPEC-GSI"]', 17, 1, 0, 1
  );
END;

-- Options de la question 17
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 17;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (171, 17, 'A', N'جميع المظليين بدون استثناء يتقنون الرماية الدقيقة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (172, 17, 'B', N'بعض المظليين يتقنون الرماية الدقيقة بالضرورة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (173, 17, 'C', N'لا يوجد أي مظلي يتقن الرماية', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (174, 17, 'D', N'حراس الشخصيات لا ينفذون قفزاً مظلياً أبداً', 0);

-- Question 18: Q-LOG-018 (LOGIQUE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 18 OR Code = 'Q-LOG-018')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 1,
      Code = 'Q-LOG-018',
      Enonce = N'متتالية أحرف تكتيكية: (أ ، ج ، هـ ، ز ، ...). ما هو الحرف العربي الآتي في النمط؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'النمط يتجاوز حرفاً واحداً في كل خطوة في الترتيب الأبجدي الهجائي: (أ [ب] ج [د] هـ [و] ز [ح] ط). إذن الحرف التالي هو "ط".',
      CompetencesAssociees = N'["المتتاليات الحرفية","التركيز على التسلسل الأبجدي"]',
      SpecialitesAssociees = N'["SPEC-SEC-ADMIN","SPEC-INFO"]',
      OrdreAffichage = 18,
      EstActive = 1
  WHERE QuestionId = 18 OR Code = 'Q-LOG-018';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    18, 1, 1, 'Q-LOG-018', N'متتالية أحرف تكتيكية: (أ ، ج ، هـ ، ز ، ...). ما هو الحرف العربي الآتي في النمط؟',
    N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'النمط يتجاوز حرفاً واحداً في كل خطوة في الترتيب الأبجدي الهجائي: (أ [ب] ج [د] هـ [و] ز [ح] ط). إذن الحرف التالي هو "ط".', N'["المتتاليات الحرفية","التركيز على التسلسل الأبجدي"]',
    N'["SPEC-SEC-ADMIN","SPEC-INFO"]', 18, 1, 0, 1
  );
END;

-- Options de la question 18
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 18;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (181, 18, 'A', N'ح', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (182, 18, 'B', N'ط', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (183, 18, 'C', N'ي', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (184, 18, 'D', N'ك', 0);

-- Question 19: Q-LOG-019 (LOGIQUE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 19 OR Code = 'Q-LOG-019')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 1,
      Code = 'Q-LOG-019',
      Enonce = N'إذا كانت بطارية جهاز الإرسال اللاسلكي تنفد بنسبة 15% كل ساعتين في وضع الاستعداد، وبنسبة 40% كل ساعتين في وضع البث المستمر. إذا بقي الجهاز 4 ساعات في الاستعداد ثم ساعتين في البث، فما النسبة المتبقية من الشحن؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'الاستعداد: 4 ساعات = فترتان من ساعتين = 2 × 15% = 30%. البث: ساعتان = 40%. إجمالي الاستهلاك = 30% + 40% = 70%. النسبة المتبقية من 100% = 30%.',
      CompetencesAssociees = N'["الحساب العملياتي للطاقة","التخطيط اللوجستي"]',
      SpecialitesAssociees = N'["SPEC-INFO","SPEC-PSIG"]',
      OrdreAffichage = 19,
      EstActive = 1
  WHERE QuestionId = 19 OR Code = 'Q-LOG-019';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    19, 1, 1, 'Q-LOG-019', N'إذا كانت بطارية جهاز الإرسال اللاسلكي تنفد بنسبة 15% كل ساعتين في وضع الاستعداد، وبنسبة 40% كل ساعتين في وضع البث المستمر. إذا بقي الجهاز 4 ساعات في الاستعداد ثم ساعتين في البث، فما النسبة المتبقية من الشحن؟',
    N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'الاستعداد: 4 ساعات = فترتان من ساعتين = 2 × 15% = 30%. البث: ساعتان = 40%. إجمالي الاستهلاك = 30% + 40% = 70%. النسبة المتبقية من 100% = 30%.', N'["الحساب العملياتي للطاقة","التخطيط اللوجستي"]',
    N'["SPEC-INFO","SPEC-PSIG"]', 19, 1, 0, 1
  );
END;

-- Options de la question 19
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 19;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (191, 19, 'A', N'20%', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (192, 19, 'B', N'25%', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (193, 19, 'C', N'30%', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (194, 19, 'D', N'35%', 0);

-- Question 20: Q-LOG-020 (LOGIQUE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 20 OR Code = 'Q-LOG-020')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 1,
      Code = 'Q-LOG-020',
      Enonce = N'في قضية سرقة، ثبت أن: "السارق لا يمكن أن يدخل إلا إذا كان يحمل المفتاح الرئيسي أو كسر النافذة". وتبين بالمعاينة أن النافذة سليمة تماماً ولم تكسر. ما الاستنتاج القضائي المنطقي القطعي؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'قاعدة الفصل المنطقي (Modus Tollendo Ponens): إما أ أو ب. بما أن ب غير محقق يقيناً (النافذة لم تكسر)، فإن أ محقق حتماً، أي أن السارق كان يحوز المفتاح الرئيسي.',
      CompetencesAssociees = N'["الاستدلال القضائي المباشر","إقصاء الفرضيات"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-PJ"]',
      OrdreAffichage = 20,
      EstActive = 1
  WHERE QuestionId = 20 OR Code = 'Q-LOG-020';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    20, 1, 1, 'Q-LOG-020', N'في قضية سرقة، ثبت أن: "السارق لا يمكن أن يدخل إلا إذا كان يحمل المفتاح الرئيسي أو كسر النافذة". وتبين بالمعاينة أن النافذة سليمة تماماً ولم تكسر. ما الاستنتاج القضائي المنطقي القطعي؟',
    N'سياق مهني عملياتي لتقييم كفاءات الاستدلال المنطقي.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'قاعدة الفصل المنطقي (Modus Tollendo Ponens): إما أ أو ب. بما أن ب غير محقق يقيناً (النافذة لم تكسر)، فإن أ محقق حتماً، أي أن السارق كان يحوز المفتاح الرئيسي.', N'["الاستدلال القضائي المباشر","إقصاء الفرضيات"]',
    N'["SPEC-PJ","SPEC-PJ"]', 20, 1, 0, 1
  );
END;

-- Options de la question 20
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 20;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (201, 20, 'A', N'السارق قفز من المدخنة العلوية', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (202, 20, 'B', N'السارق كان يحوز المفتاح الرئيسي بالضرورة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (203, 20, 'C', N'السرقة لم تقع أصلاً والادعاء كاذب', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (204, 20, 'D', N'النافذة ستكسر في المستقبل', 0);

-- Question 21: Q-OBS-021 (ANALYSE_OBSERVATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 21 OR Code = 'Q-OBS-021')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 2,
      Code = 'Q-OBS-021',
      Enonce = N'أثناء تفقد مسرح جريمة سرقة خزنة حديدية، لاحظ المحقق: غياب أي أثر للكسر أو العنف على الأبواب الخارجية، وجود مفتاح أصلي مكسور داخل قفل الخزنة، وتناثر غبار البناء على الأرضية فقط بجوار الخزنة مع نظافة باقي الغرفة تماماً. ما هو الاستنتاج التحليلي الأقوى الذي يوجه التحري؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'غياب الكسر في المنافذ الخارجية وتواجد مفتاح أصلي مكسور مع حصر الآثار بجانب الخزنة يوحي بوجود شخص له إمكانية الولوج المسبق أو محاولة تصنيع مسرح وهمي من طرف شخص من داخل المبنى.',
      CompetencesAssociees = N'["تحليل مسرح الجريمة","استخلاص القرائن المادية"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE","SPEC-PSIG"]',
      OrdreAffichage = 21,
      EstActive = 1
  WHERE QuestionId = 21 OR Code = 'Q-OBS-021';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    21, 1, 2, 'Q-OBS-021', N'أثناء تفقد مسرح جريمة سرقة خزنة حديدية، لاحظ المحقق: غياب أي أثر للكسر أو العنف على الأبواب الخارجية، وجود مفتاح أصلي مكسور داخل قفل الخزنة، وتناثر غبار البناء على الأرضية فقط بجوار الخزنة مع نظافة باقي الغرفة تماماً. ما هو الاستنتاج التحليلي الأقوى الذي يوجه التحري؟',
    N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'غياب الكسر في المنافذ الخارجية وتواجد مفتاح أصلي مكسور مع حصر الآثار بجانب الخزنة يوحي بوجود شخص له إمكانية الولوج المسبق أو محاولة تصنيع مسرح وهمي من طرف شخص من داخل المبنى.', N'["تحليل مسرح الجريمة","استخلاص القرائن المادية"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE","SPEC-PSIG"]', 21, 1, 0, 1
  );
END;

-- Options de la question 21
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 21;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (211, 21, 'A', N'الجريمة نفذتها عصابة خارجية اقتحمت المبنى بأسلحة ثقيلة عبر السطح', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (212, 21, 'B', N'هناك احتمال قوي لتواطؤ داخلي أو حيازة الفاعل لمفاتيح رسمية مسبقاً', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (213, 21, 'C', N'الحادث مجرد إهمال عابر ولا توجد أي جريمة يعاقب عليها القانون', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (214, 21, 'D', N'الغبار يدل يقيناً على أن السرقة تمت قبل أكثر من عشر سنوات', 0);

-- Question 22: Q-OBS-022 (ANALYSE_OBSERVATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 22 OR Code = 'Q-OBS-022')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 2,
      Code = 'Q-OBS-022',
      Enonce = N'في حادثة سير على طريق سريع جاف، وجدت آثار كبح متصلة لإطارات السيارة بطول 45 متراً قبل نقطة الاصطدام بالحاجز، مع ملاحظة أن أثر الإطار الأيمن الخلفي متعرج ومتقطع. ما الذي تكشفه هذه الملاحظة الفنية الدقيقة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الأثر المتقطع والمتعرج لإطار معين أثناء الكبح الشديد يشير إلى خلل ميكانيكي بنظام الفرامل أو انفجار/فقدان ضغط الإطار قبل أو أثناء الضغط الحاد على المكابح.',
      CompetencesAssociees = N'["المعاينة الفنية لحوادث السير","قراءة الآثار والفرملة"]',
      SpecialitesAssociees = N'["SPEC-ROUTE","SPEC-MOTARD","SPEC-PJ"]',
      OrdreAffichage = 22,
      EstActive = 1
  WHERE QuestionId = 22 OR Code = 'Q-OBS-022';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    22, 1, 2, 'Q-OBS-022', N'في حادثة سير على طريق سريع جاف، وجدت آثار كبح متصلة لإطارات السيارة بطول 45 متراً قبل نقطة الاصطدام بالحاجز، مع ملاحظة أن أثر الإطار الأيمن الخلفي متعرج ومتقطع. ما الذي تكشفه هذه الملاحظة الفنية الدقيقة؟',
    N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'الأثر المتقطع والمتعرج لإطار معين أثناء الكبح الشديد يشير إلى خلل ميكانيكي بنظام الفرامل أو انفجار/فقدان ضغط الإطار قبل أو أثناء الضغط الحاد على المكابح.', N'["المعاينة الفنية لحوادث السير","قراءة الآثار والفرملة"]',
    N'["SPEC-ROUTE","SPEC-MOTARD","SPEC-PJ"]', 22, 1, 0, 1
  );
END;

-- Options de la question 22
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 22;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (221, 22, 'A', N'السيارة كانت تسير بسرعة بطيئة جداً لا تتجاوز 20 كم/س', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (222, 22, 'B', N'احتمال انفجار الإطار الأيمن الخلفي أو وجود عيب حاد في توازن المكابح', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (223, 22, 'C', N'السائق كان يقود في الاتجاه المعاكس وبأضواء معطلة حتماً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (224, 22, 'D', N'الطريق كان مغموراً بالمياه الزلقة رغم الجفاف الظاهري', 0);

-- Question 23: Q-OBS-023 (ANALYSE_OBSERVATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 23 OR Code = 'Q-OBS-023')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 2,
      Code = 'Q-OBS-023',
      Enonce = N'خلال مراقبة سرية لمستودع معزول يشتبه في استعماله لتهريب البضائع، سجلت الملاحظة دخول ثلاث شاحنات محملة وخروجها فارغة في أوقات متفرقة، دون تفريغ أي سلعة في الساحة الخارجية. ما الفرضية العملياتية الواجب التحقق منها أولاً؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'دخول شاحنات محملة وخروجها فارغة دون ظهور بضائع بالخارج يدل على وجود فضاءات تخزين داخلية واسعة، مخابئ سرية تحت الأرض، أو عمليات شحن فورية في مركبات أصغر داخل المستودع المغلق.',
      CompetencesAssociees = N'["المراقبة الميدانية والتحري","تقدير الأنماط المشبوهة"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-GSI","SPEC-PSIG"]',
      OrdreAffichage = 23,
      EstActive = 1
  WHERE QuestionId = 23 OR Code = 'Q-OBS-023';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    23, 1, 2, 'Q-OBS-023', N'خلال مراقبة سرية لمستودع معزول يشتبه في استعماله لتهريب البضائع، سجلت الملاحظة دخول ثلاث شاحنات محملة وخروجها فارغة في أوقات متفرقة، دون تفريغ أي سلعة في الساحة الخارجية. ما الفرضية العملياتية الواجب التحقق منها أولاً؟',
    N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'دخول شاحنات محملة وخروجها فارغة دون ظهور بضائع بالخارج يدل على وجود فضاءات تخزين داخلية واسعة، مخابئ سرية تحت الأرض، أو عمليات شحن فورية في مركبات أصغر داخل المستودع المغلق.', N'["المراقبة الميدانية والتحري","تقدير الأنماط المشبوهة"]',
    N'["SPEC-PJ","SPEC-GSI","SPEC-PSIG"]', 23, 1, 0, 1
  );
END;

-- Options de la question 23
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 23;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (231, 23, 'A', N'المستودع مغلق نهائياً والشاحنات ضلت طريقها صدفة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (232, 23, 'B', N'وجود نشاط تفريغ داخلي منظم أو مخابئ تخزين تحت أرضية داخل المستودع', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (233, 23, 'C', N'الشاحنات كانت فارغة عند الدخول وممتلئة عند الخروج', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (234, 23, 'D', N'إنهاء المراقبة فوراً لعدم ارتكاب جنحة في الشارع العام', 0);

-- Question 24: Q-OBS-024 (ANALYSE_OBSERVATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 24 OR Code = 'Q-OBS-024')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 2,
      Code = 'Q-OBS-024',
      Enonce = N'أثناء فحص شريط كاميرا مراقبة لشارع تجاري وقع به سطو، ظهر شخص يرتدي معطفاً سميكاً في يوم صيفي حار، ويمشي بخطوات غير متناسقة مع وضع يده اليمنى باستمرار داخل جيبه الداخلي. ما التفسير الأمني الأكثر رجاحات؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'ارتداء ملابس غير متناسبة مع الطقس (معطف في الصيف) مع تثبيت اليد بالجيب يدل سلوكياً وميدانياً على محاولة إخفاء سلاح، أداة سطو، أو مسروقات ضخمة.',
      CompetencesAssociees = N'["الملاحظة السلوكية","استكشاف لغة الجسد الأمنية"]',
      SpecialitesAssociees = N'["SPEC-PSIG","SPEC-GSI","SPEC-PJ"]',
      OrdreAffichage = 24,
      EstActive = 1
  WHERE QuestionId = 24 OR Code = 'Q-OBS-024';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    24, 1, 2, 'Q-OBS-024', N'أثناء فحص شريط كاميرا مراقبة لشارع تجاري وقع به سطو، ظهر شخص يرتدي معطفاً سميكاً في يوم صيفي حار، ويمشي بخطوات غير متناسقة مع وضع يده اليمنى باستمرار داخل جيبه الداخلي. ما التفسير الأمني الأكثر رجاحات؟',
    N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'ارتداء ملابس غير متناسبة مع الطقس (معطف في الصيف) مع تثبيت اليد بالجيب يدل سلوكياً وميدانياً على محاولة إخفاء سلاح، أداة سطو، أو مسروقات ضخمة.', N'["الملاحظة السلوكية","استكشاف لغة الجسد الأمنية"]',
    N'["SPEC-PSIG","SPEC-GSI","SPEC-PJ"]', 24, 1, 0, 1
  );
END;

-- Options de la question 24
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 24;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (241, 24, 'A', N'الشخص يشعر بالبرد الشديد فقط بسبب مكيفات المتاجر المجاورة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (242, 24, 'B', N'احتمال إخفاء سلاح أو أداة ممنوعة تحت المعطف ومحاولة تثبيتها باليد', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (243, 24, 'C', N'الشخص سائح أجنبي لا يعرف درجات الحرارة المحلية', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (244, 24, 'D', N'سلوك طبيعي تماماً لا يستدعي أي اهتمام أمني', 0);

-- Question 25: Q-OBS-025 (ANALYSE_OBSERVATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 25 OR Code = 'Q-OBS-025')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 2,
      Code = 'Q-OBS-025',
      Enonce = N'بمقارنة إفادات شاهدين حول لون سيارة فرت بعد ارتكاب حادث: الشاهد الأول ذكر أنها خضراء داكنة، والشاهد الثاني ذكر أنها زرقاء داكنة، وكلاهما رأى السيارة تحت أضواء أعمدة الإنارة الصفراء (الصوديوم) ليلاً. كيف يفسر المحلل الأمني هذا التباين؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'مصابيح الصوديوم الصفراء تشوه تمييز الألوان الداكنة بين الأزرق والأخضر والرمادي القاتم، مما يجعل التناقض ناتجاً عن الخداع البصري للإنارة وليس بالضرورة شهادة زور.',
      CompetencesAssociees = N'["تحليل الشهادات","الإدراك البصري في البيئات المظلمة"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 25,
      EstActive = 1
  WHERE QuestionId = 25 OR Code = 'Q-OBS-025';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    25, 1, 2, 'Q-OBS-025', N'بمقارنة إفادات شاهدين حول لون سيارة فرت بعد ارتكاب حادث: الشاهد الأول ذكر أنها خضراء داكنة، والشاهد الثاني ذكر أنها زرقاء داكنة، وكلاهما رأى السيارة تحت أضواء أعمدة الإنارة الصفراء (الصوديوم) ليلاً. كيف يفسر المحلل الأمني هذا التباين؟',
    N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'مصابيح الصوديوم الصفراء تشوه تمييز الألوان الداكنة بين الأزرق والأخضر والرمادي القاتم، مما يجعل التناقض ناتجاً عن الخداع البصري للإنارة وليس بالضرورة شهادة زور.', N'["تحليل الشهادات","الإدراك البصري في البيئات المظلمة"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]', 25, 1, 0, 1
  );
END;

-- Options de la question 25
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 25;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (251, 25, 'A', N'أحد الشاهدين متواطئ حتماً ويجب توقيفه فوراً بتهمة التضليل', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (252, 25, 'B', N'أضواء الصوديوم الصفراء ليلاً تدمج وتغير إدراك الألوان الداكنة كالزيتي والأزرق', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (253, 25, 'C', N'السيارة المذكورة تم تغيير طلائها بتقنية الليزر أثناء سيرها', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (254, 25, 'D', N'يجب إلغاء الحادث برمته واستبعاد كل الشهادات', 0);

-- Question 26: Q-OBS-026 (ANALYSE_OBSERVATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 26 OR Code = 'Q-OBS-026')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 2,
      Code = 'Q-OBS-026',
      Enonce = N'عند تفتيش سيارة مشبوهة، لاحظ الدركي أن مسامير تثبيت لوحة الترقيم جديدة تماماً ولا يعلوها أي غبار، في حين أن هيكل السيارة متسخ ومغطى بطبقة سميكة من الأوحال القديمة. ما الدلالة الاستقرائية الأولى؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'التناقض بين حداثة تثبيت مسامير اللوحة وقدم الأوساخ على الهيكل يشير بقوة إلى استبدال لوحة الترقيم مؤخراً، مما يرفع شبهة استخدام صفائح مزورة أو سرقة المركبة.',
      CompetencesAssociees = N'["فحص المركبات المشبوهة","ملاحظة التناقضات المادية"]',
      SpecialitesAssociees = N'["SPEC-MOTARD","SPEC-ROUTE","SPEC-PJ"]',
      OrdreAffichage = 26,
      EstActive = 1
  WHERE QuestionId = 26 OR Code = 'Q-OBS-026';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    26, 1, 2, 'Q-OBS-026', N'عند تفتيش سيارة مشبوهة، لاحظ الدركي أن مسامير تثبيت لوحة الترقيم جديدة تماماً ولا يعلوها أي غبار، في حين أن هيكل السيارة متسخ ومغطى بطبقة سميكة من الأوحال القديمة. ما الدلالة الاستقرائية الأولى؟',
    N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'التناقض بين حداثة تثبيت مسامير اللوحة وقدم الأوساخ على الهيكل يشير بقوة إلى استبدال لوحة الترقيم مؤخراً، مما يرفع شبهة استخدام صفائح مزورة أو سرقة المركبة.', N'["فحص المركبات المشبوهة","ملاحظة التناقضات المادية"]',
    N'["SPEC-MOTARD","SPEC-ROUTE","SPEC-PJ"]', 26, 1, 0, 1
  );
END;

-- Options de la question 26
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 26;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (261, 26, 'A', N'صاحب السيارة حريص جداً على نظافة البراغي فقط دون الهيكل', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (262, 26, 'B', N'احتمال استبدال لوحات الترقيم حديثاً لإخفاء هوية المركبة الحقيقية', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (263, 26, 'C', N'السيارة تم استيرادها صباح اليوم من مصنع التجميع مباشرة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (264, 26, 'D', N'المسامير الحديثة تزيد من سرعة محرك السيارة تلقائياً', 0);

-- Question 27: Q-OBS-027 (ANALYSE_OBSERVATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 27 OR Code = 'Q-OBS-027')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 2,
      Code = 'Q-OBS-027',
      Enonce = N'في جدول زمني للمكالمات الهاتفية الهاتفية لشخص مشتبه به، لوحظ انقطاع تام للمكالمات بين الساعة 02:00 و 04:30 صباحاً، بينما كان الهاتف يستقبل رسائل قصيرة تسجل في برج اتصالات يبعد 80 كيلومتراً عن مقر سكنه. ماذا تستنتج تحليلياً؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'التقاط الرسائل عبر برج اتصالات يبعد 80 كلم يثبت مادياً تواجد الهاتف (وصاحبه المحتمل) خارج نطاق إقامته المعتادة أثناء تلك الفترة الزمنية، وهو ما يدحض ادعاءه بالتواجد في المنزل.',
      CompetencesAssociees = N'["التحليل الجنائي للبيانات التقنية","تقاطع المؤشرات الجغرافية"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-INFO","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 27,
      EstActive = 1
  WHERE QuestionId = 27 OR Code = 'Q-OBS-027';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    27, 1, 2, 'Q-OBS-027', N'في جدول زمني للمكالمات الهاتفية الهاتفية لشخص مشتبه به، لوحظ انقطاع تام للمكالمات بين الساعة 02:00 و 04:30 صباحاً، بينما كان الهاتف يستقبل رسائل قصيرة تسجل في برج اتصالات يبعد 80 كيلومتراً عن مقر سكنه. ماذا تستنتج تحليلياً؟',
    N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'التقاط الرسائل عبر برج اتصالات يبعد 80 كلم يثبت مادياً تواجد الهاتف (وصاحبه المحتمل) خارج نطاق إقامته المعتادة أثناء تلك الفترة الزمنية، وهو ما يدحض ادعاءه بالتواجد في المنزل.', N'["التحليل الجنائي للبيانات التقنية","تقاطع المؤشرات الجغرافية"]',
    N'["SPEC-PJ","SPEC-INFO","SPEC-SCIENTIFIQUE"]', 27, 1, 0, 1
  );
END;

-- Options de la question 27
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 27;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (271, 27, 'A', N'الهاتف كان في غرفة نوم المشتبه به طوال الليل حتماً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (272, 27, 'B', N'الجهاز تواجد فعلياً أو تم نقله إلى نطاق جغرافي آخر يبعد 80 كم خلال تلك الفترة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (273, 27, 'C', N'أبراج الاتصالات تغير مواقعها الجغرافية تلقائياً بعد منتصف الليل', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (274, 27, 'D', N'لا يمكن الاعتماد على أبراج الاتصالات إطلاقاً في التحقيقات الحديثة', 0);

-- Question 28: Q-OBS-028 (ANALYSE_OBSERVATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 28 OR Code = 'Q-OBS-028')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 2,
      Code = 'Q-OBS-028',
      Enonce = N'أثناء استطلاع ميداني لحماية موكب رسمي، لاحظت وجود طائرة بدون طيار (درون) صغيرة مدنية تحوم على ارتفاع 50 متراً فوق المسار المحدد للموكب قبل وصوله بعشر دقائق. ما هو التقييم الفوري للتهديد؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'تحليق درون غير مصرح به فوق مسار موكب رسمي يعتبر تهديداً جوياً محتملاً للمراقبة أو الهجوم، ويستوجب تفعيل بروتوكول التشويش الفوري وتغيير المسار إذا لزم الأمر.',
      CompetencesAssociees = N'["تقييم المخاطر الأمنية","حماية الشخصيات والمواكب"]',
      SpecialitesAssociees = N'["SPEC-GEH","SPEC-GSI","SPEC-PSIG"]',
      OrdreAffichage = 28,
      EstActive = 1
  WHERE QuestionId = 28 OR Code = 'Q-OBS-028';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    28, 1, 2, 'Q-OBS-028', N'أثناء استطلاع ميداني لحماية موكب رسمي، لاحظت وجود طائرة بدون طيار (درون) صغيرة مدنية تحوم على ارتفاع 50 متراً فوق المسار المحدد للموكب قبل وصوله بعشر دقائق. ما هو التقييم الفوري للتهديد؟',
    N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'تحليق درون غير مصرح به فوق مسار موكب رسمي يعتبر تهديداً جوياً محتملاً للمراقبة أو الهجوم، ويستوجب تفعيل بروتوكول التشويش الفوري وتغيير المسار إذا لزم الأمر.', N'["تقييم المخاطر الأمنية","حماية الشخصيات والمواكب"]',
    N'["SPEC-GEH","SPEC-GSI","SPEC-PSIG"]', 28, 1, 0, 1
  );
END;

-- Options de la question 28
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 28;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (281, 28, 'A', N'تجاهلها لأنها طائرة صغيرة ولا يمكن أن تشكل أي خطر أمني', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (282, 28, 'B', N'اعتبارها خرقاً أمنياً وتهديداً محتملاً يستوجب الإبلاغ الفوري وتفعيل إجراءات الحماية والتحييد', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (283, 28, 'C', N'الانتظار حتى انتهاء مرور الموكب ثم البحث عن المشغل', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (284, 28, 'D', N'إيقاف الموكب وتركه في مكانه في العراء لحين هبوط الطائرة', 0);

-- Question 29: Q-OBS-029 (ANALYSE_OBSERVATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 29 OR Code = 'Q-OBS-029')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 2,
      Code = 'Q-OBS-029',
      Enonce = N'عند فحص وثيقة تعريف بيومترية لأحد الأشخاص في نقطة مراقبة، لاحظ الدركي أن الصورة الشخصية تظهر انعكاس ضوء خفيف عند حوافها فقط، مع سماكة غير متجانسة في زاوية البطاقة البلاستيكية. ما الإجراء التحليلي الصائب؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'سماكة غير متجانسة وانعكاس غير طبيعي عند حواف الصورة يشير إلى إمكانية تقشير الغشاء البلاستيكي واستبدال الصورة الأصلية بصورة مزورة (Substitution de photo).',
      CompetencesAssociees = N'["كشف تزوير الوثائق","الفحص الدقيق للهويات"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-ROUTE","SPEC-SEC-ADMIN"]',
      OrdreAffichage = 29,
      EstActive = 1
  WHERE QuestionId = 29 OR Code = 'Q-OBS-029';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    29, 1, 2, 'Q-OBS-029', N'عند فحص وثيقة تعريف بيومترية لأحد الأشخاص في نقطة مراقبة، لاحظ الدركي أن الصورة الشخصية تظهر انعكاس ضوء خفيف عند حوافها فقط، مع سماكة غير متجانسة في زاوية البطاقة البلاستيكية. ما الإجراء التحليلي الصائب؟',
    N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'سماكة غير متجانسة وانعكاس غير طبيعي عند حواف الصورة يشير إلى إمكانية تقشير الغشاء البلاستيكي واستبدال الصورة الأصلية بصورة مزورة (Substitution de photo).', N'["كشف تزوير الوثائق","الفحص الدقيق للهويات"]',
    N'["SPEC-PJ","SPEC-ROUTE","SPEC-SEC-ADMIN"]', 29, 1, 0, 1
  );
END;

-- Options de la question 29
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 29;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (291, 29, 'A', N'إعادة الوثيقة فوراً للشخص مع الاعتذار له عن التأخير', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (292, 29, 'B', N'الاشتباه القوي في تزوير البطاقة عبر تغيير الصورة، وإخضاعها للفحص التقني والتدقيق في قواعد البيانات', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (293, 29, 'C', N'تمزيق البطاقة وتسليمه وصلاً خطياً بدلاً منها', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (294, 29, 'D', N'اعتبار العيب عادياً ناتجاً فقط عن الغسيل بالماء والصابون', 0);

-- Question 30: Q-OBS-030 (ANALYSE_OBSERVATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 30 OR Code = 'Q-OBS-030')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 2,
      Code = 'Q-OBS-030',
      Enonce = N'في مستودع جمركي مغلق، تظهر سجلات الوزن أن حاوية مسجلة على أنها تحتوي على "قطع غيار بلاستيكية خفيفة" يبلغ وزنها الإجمالي 18 طناً، بينما حاوية مماثلة بنفس الحجم والمحتوى المعلن لا تتعدى عادة 5 أطنان. ما هو التحليل المنطقي السليم؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الفارق الهائل في الوزن (18 طناً مقابل 5 أطنان) للبضاعة ذاتها يعتبر مؤشراً لا يقبل الشك على وجود مواد غير مصرح بها، ثقيلة الوزن (معادن، أسلحة، أو مخدرات مخبأة).',
      CompetencesAssociees = N'["تحليل التناقضات اللوجستية","مكافحة التهريب"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-PSIG"]',
      OrdreAffichage = 30,
      EstActive = 1
  WHERE QuestionId = 30 OR Code = 'Q-OBS-030';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    30, 1, 2, 'Q-OBS-030', N'في مستودع جمركي مغلق، تظهر سجلات الوزن أن حاوية مسجلة على أنها تحتوي على "قطع غيار بلاستيكية خفيفة" يبلغ وزنها الإجمالي 18 طناً، بينما حاوية مماثلة بنفس الحجم والمحتوى المعلن لا تتعدى عادة 5 أطنان. ما هو التحليل المنطقي السليم؟',
    N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'الفارق الهائل في الوزن (18 طناً مقابل 5 أطنان) للبضاعة ذاتها يعتبر مؤشراً لا يقبل الشك على وجود مواد غير مصرح بها، ثقيلة الوزن (معادن، أسلحة، أو مخدرات مخبأة).', N'["تحليل التناقضات اللوجستية","مكافحة التهريب"]',
    N'["SPEC-PJ","SPEC-PSIG"]', 30, 1, 0, 1
  );
END;

-- Options de la question 30
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 30;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (301, 30, 'A', N'البلاستيك أصبح ثقيلاً بسبب برودة الطقس داخل الميناء', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (302, 30, 'B', N'وجود تزوير في التصريح الجمركي أو إخفاء بضائع ثقيلة غير مصرح بها داخل الشحنة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (303, 30, 'C', N'الميزان الجمركي مبرمج لإضافة 13 طناً كإجراء روتيني', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (304, 30, 'D', N'الحاوية تحتوي على هواء مضغوط ثقيل جداً', 0);

-- Question 31: Q-OBS-031 (ANALYSE_OBSERVATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 31 OR Code = 'Q-OBS-031')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 2,
      Code = 'Q-OBS-031',
      Enonce = N'عند استجواب متهم في قضية سطو ليلي، لاحظ المحقق أن المتهم ينظر بشكل متكرر إلى زاوية الغرفة اليمنى العليا قبل كل إجابة، ويبلل شفتيه بكثرة، ويغير وضعية جلوسه كلما سئل عن مكان إخفاء الأموال. ماذا تعكس هذه الإشارات السلوكية؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'جفاف الحلق (تبليل الشفاه المستمر)، والتململ الجسدي، وتكرار النظر للأعلى عند طرح أسئلة حساسة هي مؤشرات فسيولوجية دالة على الضغط النفسي الشديد ومحاولة تركيب إجابات مختلقة.',
      CompetencesAssociees = N'["تقييم السلوك أثناء الاستماع","استكشاف علامات التوتر"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 31,
      EstActive = 1
  WHERE QuestionId = 31 OR Code = 'Q-OBS-031';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    31, 1, 2, 'Q-OBS-031', N'عند استجواب متهم في قضية سطو ليلي، لاحظ المحقق أن المتهم ينظر بشكل متكرر إلى زاوية الغرفة اليمنى العليا قبل كل إجابة، ويبلل شفتيه بكثرة، ويغير وضعية جلوسه كلما سئل عن مكان إخفاء الأموال. ماذا تعكس هذه الإشارات السلوكية؟',
    N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'جفاف الحلق (تبليل الشفاه المستمر)، والتململ الجسدي، وتكرار النظر للأعلى عند طرح أسئلة حساسة هي مؤشرات فسيولوجية دالة على الضغط النفسي الشديد ومحاولة تركيب إجابات مختلقة.', N'["تقييم السلوك أثناء الاستماع","استكشاف علامات التوتر"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]', 31, 1, 0, 1
  );
END;

-- Options de la question 31
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 31;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (311, 31, 'A', N'المتهم يشعر بالنعاس التام ويرغب في النوم فوراً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (312, 31, 'B', N'مؤشرات قلق وتوتر نفسي مرتفع ومحاولة ابتكار إجابات غير عفوية حول نقطة النزاع', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (313, 31, 'C', N'دليل قاطع على البراءة التامة دون حاجة لأي دليل آخر', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (314, 31, 'D', N'علامات تدل على إصابة المتهم بضعف في عضلات الرقبة', 0);

-- Question 32: Q-OBS-032 (ANALYSE_OBSERVATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 32 OR Code = 'Q-OBS-032')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 2,
      Code = 'Q-OBS-032',
      Enonce = N'في موقع اقتحام متجر للمجوهرات، تم العثور على شظايا زجاجية مبعثرة بنسبة 90% خارج المتجر على الرصيف، وبنسبة 10% فقط داخل صالة العرض. ما هو التحليل الفيزيائي لاتجاه قوة الكسر؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'وفق قوانين الديناميكا والشرطة العلمية، يتناثر الزجاج دائماً في اتجاه القوة المطبقة. تناثره نحو الخارج يعني أن مصدر الضربة أو الانفجار كان من داخل المحل باتجاه الشارع وليس العكس.',
      CompetencesAssociees = N'["الشرطة العلمية والتقنية","تحليل تناثر الزجاج والمقذوفات"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 32,
      EstActive = 1
  WHERE QuestionId = 32 OR Code = 'Q-OBS-032';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    32, 1, 2, 'Q-OBS-032', N'في موقع اقتحام متجر للمجوهرات، تم العثور على شظايا زجاجية مبعثرة بنسبة 90% خارج المتجر على الرصيف، وبنسبة 10% فقط داخل صالة العرض. ما هو التحليل الفيزيائي لاتجاه قوة الكسر؟',
    N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'وفق قوانين الديناميكا والشرطة العلمية، يتناثر الزجاج دائماً في اتجاه القوة المطبقة. تناثره نحو الخارج يعني أن مصدر الضربة أو الانفجار كان من داخل المحل باتجاه الشارع وليس العكس.', N'["الشرطة العلمية والتقنية","تحليل تناثر الزجاج والمقذوفات"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]', 32, 1, 0, 1
  );
END;

-- Options de la question 32
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 32;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (321, 32, 'A', N'الزجاج كُسر من الشارع الخارجي باتجاه الداخل بواسطة حجر ثقيل', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (322, 32, 'B', N'قوة الكسر أو الدفع طُبقت من داخل المحل نحو الخارج (عمل داخلي أو هروب)', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (323, 32, 'C', N'الرياح الطبيعية حملت الزجاج الثقيل إلى الخارج صدفة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (324, 32, 'D', N'الزجاج تفتت تلقائياً بسبب جودة تصنيعه العالية', 0);

-- Question 33: Q-OBS-033 (ANALYSE_OBSERVATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 33 OR Code = 'Q-OBS-033')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 2,
      Code = 'Q-OBS-033',
      Enonce = N'خلال تحليل صور الأقمار الاصطناعية لمنطقة غابوية نائية، لوحظ ظهور مسلك ترابي جديد يمتد لمسافة 3 كيلومترات لم يكن موجوداً قبل أسبوعين، وينتهي بساحة مسيجة وسط الأشجار الكثيفة. ما الإجراء الميداني الأنسب؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'استحداث مسلك جديد بسرعة في منطقة نائية ينتهي بموقع مسيج يشير إلى نشاط سري غير مصرح به (زراعة ممنوعة، تهريب، أو منشأة غير قانونية)، مما يستدعي استطلاعاً جوياً وبرياً منسقاً.',
      CompetencesAssociees = N'["تحليل الصور الجوية والخرائط","الاستطلاع الميداني"]',
      SpecialitesAssociees = N'["SPEC-PSIG","SPEC-GSI","SPEC-PJ"]',
      OrdreAffichage = 33,
      EstActive = 1
  WHERE QuestionId = 33 OR Code = 'Q-OBS-033';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    33, 1, 2, 'Q-OBS-033', N'خلال تحليل صور الأقمار الاصطناعية لمنطقة غابوية نائية، لوحظ ظهور مسلك ترابي جديد يمتد لمسافة 3 كيلومترات لم يكن موجوداً قبل أسبوعين، وينتهي بساحة مسيجة وسط الأشجار الكثيفة. ما الإجراء الميداني الأنسب؟',
    N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'استحداث مسلك جديد بسرعة في منطقة نائية ينتهي بموقع مسيج يشير إلى نشاط سري غير مصرح به (زراعة ممنوعة، تهريب، أو منشأة غير قانونية)، مما يستدعي استطلاعاً جوياً وبرياً منسقاً.', N'["تحليل الصور الجوية والخرائط","الاستطلاع الميداني"]',
    N'["SPEC-PSIG","SPEC-GSI","SPEC-PJ"]', 33, 1, 0, 1
  );
END;

-- Options de la question 33
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 33;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (331, 33, 'A', N'إهمال الملاحظة لأن فتح الطرق من اختصاص مصالح الطرق العامة فقط', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (332, 33, 'B', N'برمجة مهمة استطلاع ميدانية متأنية والتحقق من قانونية النشاط والتراخيص', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (333, 33, 'C', N'إرسال دورية فردية واحدة دون سلاح للتحقق الودي', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (334, 33, 'D', N'افتراض أن الحيوانات البرية هي التي مهدت المسلك بنفسها', 0);

-- Question 34: Q-OBS-034 (ANALYSE_OBSERVATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 34 OR Code = 'Q-OBS-034')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 2,
      Code = 'Q-OBS-034',
      Enonce = N'عند مقارنة بصمتي أصابع مرفوعتين من مسرح الجريمة، وجد الخبير 8 نقاط تشابه مميزة (Minuties) دون أي نقطة اختلاف، لكن إحدى البصمتين مشوهة جزئياً في مركز الدوامة. ما هو الموقف الفني الصائب؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'في المعايير الجنائية، يلزم توافر عدد محدد من نقاط التطابق الكاملة (غالباً 12 نقطة فأكثر وفق المعايير الدولية) للجزم القطعي بالهوية القضائية، وما دون ذلك يبقى قرينة قوية تتطلب تدعيماً ولا ترقى للحكم القاطع بمفردها.',
      CompetencesAssociees = N'["تحقيق الهوية البيومترية","مطابقة البصمات الجنائية"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 34,
      EstActive = 1
  WHERE QuestionId = 34 OR Code = 'Q-OBS-034';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    34, 1, 2, 'Q-OBS-034', N'عند مقارنة بصمتي أصابع مرفوعتين من مسرح الجريمة، وجد الخبير 8 نقاط تشابه مميزة (Minuties) دون أي نقطة اختلاف، لكن إحدى البصمتين مشوهة جزئياً في مركز الدوامة. ما هو الموقف الفني الصائب؟',
    N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'في المعايير الجنائية، يلزم توافر عدد محدد من نقاط التطابق الكاملة (غالباً 12 نقطة فأكثر وفق المعايير الدولية) للجزم القطعي بالهوية القضائية، وما دون ذلك يبقى قرينة قوية تتطلب تدعيماً ولا ترقى للحكم القاطع بمفردها.', N'["تحقيق الهوية البيومترية","مطابقة البصمات الجنائية"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]', 34, 1, 0, 1
  );
END;

-- Options de la question 34
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 34;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (341, 34, 'A', N'الجزم المطلق بتطابق الشخص وإغلاق الملف فوراً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (342, 34, 'B', N'اعتبارها قرينة مشجعة للبحث ولكنها غير كافية بمفردها للجزم القاطع دون الوصول للحد الأدنى من النقاط القانونية', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (343, 34, 'C', N'استبعاد البصمة ورميها لأن 8 نقاط تعني انعدام القيمة تماماً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (344, 34, 'D', N'مطابقة البصمة مع والد المتهم بدلاً منه', 0);

-- Question 35: Q-OBS-035 (ANALYSE_OBSERVATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 35 OR Code = 'Q-OBS-035')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 2,
      Code = 'Q-OBS-035',
      Enonce = N'أثناء تفكيك شبكة تهريب دولية، لوحظ أن جميع التحويلات المالية تتم بمبالغ متطابقة بالضبط (9,950 درهم) تفصل بين كل عملية وأخرى 24 ساعة، وتوزع على عدة حسابات بنكية مختلفة. ما التفسير التحليلي المالي لهذا النمط؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'هذا النمط معروف في الجرائم المالية باسم "التفتيت أو الهيكلة" (Smurfing/Structuring)، حيث تعمد الشبكات إلى تحويل مبالغ تقل قليلاً عن عتبة التصريح الإجباري بالاشتباه (10,000 درهم مثلاً) لتفادي تنبيه أنظمة الرقابة البنكية.',
      CompetencesAssociees = N'["التحري المالي ومكافحة غسل الأموال","رصد العمليات المشبوهة"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-INFO","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 35,
      EstActive = 1
  WHERE QuestionId = 35 OR Code = 'Q-OBS-035';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    35, 1, 2, 'Q-OBS-035', N'أثناء تفكيك شبكة تهريب دولية، لوحظ أن جميع التحويلات المالية تتم بمبالغ متطابقة بالضبط (9,950 درهم) تفصل بين كل عملية وأخرى 24 ساعة، وتوزع على عدة حسابات بنكية مختلفة. ما التفسير التحليلي المالي لهذا النمط؟',
    N'سياق مهني عملياتي لتقييم كفاءات التحليل والملاحظة.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'هذا النمط معروف في الجرائم المالية باسم "التفتيت أو الهيكلة" (Smurfing/Structuring)، حيث تعمد الشبكات إلى تحويل مبالغ تقل قليلاً عن عتبة التصريح الإجباري بالاشتباه (10,000 درهم مثلاً) لتفادي تنبيه أنظمة الرقابة البنكية.', N'["التحري المالي ومكافحة غسل الأموال","رصد العمليات المشبوهة"]',
    N'["SPEC-PJ","SPEC-INFO","SPEC-SCIENTIFIQUE"]', 35, 1, 0, 1
  );
END;

-- Options de la question 35
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 35;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (351, 35, 'A', N'مجرد مصادفة بنكية بريئة لتسديد نفقات التغذية اليومية للشبكة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (352, 35, 'B', N'تقنية تجزئة ممنهجة للأموال (Smurfing) لتفادي عتبات المراقبة والإشعار التلقائي بالاشتباه', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (353, 35, 'C', N'خلل في برمجة أجهزة الصراف الآلي للبنوك', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (354, 35, 'D', N'تطبيق للقانون الضريبي الذي يمنع تجاوز 10 آلاف درهم', 0);

-- Question 36: Q-ATT-036 (CONCENTRATION_ATTENTION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 36 OR Code = 'Q-ATT-036')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 3,
      Code = 'Q-ATT-036',
      Enonce = N'خلال مراقبة سد قضائي ليلي، تمر عشرات المركبات في الساعة. لاحظ الدركي أن إحدى السيارات تحمل رقم لوحة أمامي ينتهي بالرقم 72 بينما اللوحة الخلفية لنفس السيارة تنتهي بالرقم 27 مع تشابه باقي الأرقام والحروف تماماً. ما هو الموقف الفوري الواجب اتخاذه؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الانتباه للتبديل بين الأرقام المتشابهة (72 مقابل 27) يستوجب توقيف المركبة على الفور للتحقق من تطابق وثائقها، حيث يعتبر هذا الاختلاف دليلاً قوياً على تزوير الصفائح أو استخدام صفائح مسروقة.',
      CompetencesAssociees = N'["دقة الملاحظة البصرية السريعة","اليقظة في نقاط المراقبة"]',
      SpecialitesAssociees = N'["SPEC-ROUTE","SPEC-MOTARD","SPEC-PSIG"]',
      OrdreAffichage = 36,
      EstActive = 1
  WHERE QuestionId = 36 OR Code = 'Q-ATT-036';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    36, 1, 3, 'Q-ATT-036', N'خلال مراقبة سد قضائي ليلي، تمر عشرات المركبات في الساعة. لاحظ الدركي أن إحدى السيارات تحمل رقم لوحة أمامي ينتهي بالرقم 72 بينما اللوحة الخلفية لنفس السيارة تنتهي بالرقم 27 مع تشابه باقي الأرقام والحروف تماماً. ما هو الموقف الفوري الواجب اتخاذه؟',
    N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'الانتباه للتبديل بين الأرقام المتشابهة (72 مقابل 27) يستوجب توقيف المركبة على الفور للتحقق من تطابق وثائقها، حيث يعتبر هذا الاختلاف دليلاً قوياً على تزوير الصفائح أو استخدام صفائح مسروقة.', N'["دقة الملاحظة البصرية السريعة","اليقظة في نقاط المراقبة"]',
    N'["SPEC-ROUTE","SPEC-MOTARD","SPEC-PSIG"]', 36, 1, 0, 1
  );
END;

-- Options de la question 36
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 36;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (361, 36, 'A', N'السماح للسيارة بالمرور لأن الخطأ طفيف ومجرد قلب للأرقام', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (362, 36, 'B', N'توقيف السيارة فوراً وتوجيهها للمسار الآمن لإجراء تدقيق معمق ومطابقة الرقم مع البطاقة الرمادية', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (363, 36, 'C', N'الانتظار حتى تسافر السيارة لمدينة أخرى ثم إشعارهم لاحقاً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (364, 36, 'D', N'تغريم السائق بتهمة عدم غسل اللوحة الخلفية فقط', 0);

-- Question 37: Q-ATT-037 (CONCENTRATION_ATTENTION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 37 OR Code = 'Q-ATT-037')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 3,
      Code = 'Q-ATT-037',
      Enonce = N'أثناء الاستماع إلى نداء استغاثة عبر جهاز اللاسلكي وسط تشويش شديد وضوضاء الرياح، التقطت العبارة: "المشتبه فيه يقود دراجة نارية سوداء... اتجاه... النقطة الكيلومترية... قرب الجسر القديم". ما الكلمة الأكثر أهمية وحسماً للبدء في توجيه الدوريات الميدانية على الفور؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'في الاتصالات التكتيكية المشوشة، يعتبر المعلم الجغرافي الحاسم (الجسر القديم / الاتجاه) هو العنصر الجوهري لنشر الدوريات وإغلاق المحاور قبل تشتت الأفراد.',
      CompetencesAssociees = N'["الانتباه السمعي الانتقائي","إدارة الاتصالات اللاسلكية في الطوارئ"]',
      SpecialitesAssociees = N'["SPEC-PSIG","SPEC-MOTARD","SPEC-GEH"]',
      OrdreAffichage = 37,
      EstActive = 1
  WHERE QuestionId = 37 OR Code = 'Q-ATT-037';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    37, 1, 3, 'Q-ATT-037', N'أثناء الاستماع إلى نداء استغاثة عبر جهاز اللاسلكي وسط تشويش شديد وضوضاء الرياح، التقطت العبارة: "المشتبه فيه يقود دراجة نارية سوداء... اتجاه... النقطة الكيلومترية... قرب الجسر القديم". ما الكلمة الأكثر أهمية وحسماً للبدء في توجيه الدوريات الميدانية على الفور؟',
    N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'في الاتصالات التكتيكية المشوشة، يعتبر المعلم الجغرافي الحاسم (الجسر القديم / الاتجاه) هو العنصر الجوهري لنشر الدوريات وإغلاق المحاور قبل تشتت الأفراد.', N'["الانتباه السمعي الانتقائي","إدارة الاتصالات اللاسلكية في الطوارئ"]',
    N'["SPEC-PSIG","SPEC-MOTARD","SPEC-GEH"]', 37, 1, 0, 1
  );
END;

-- Options de la question 37
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 37;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (371, 37, 'A', N'لون الدراجة النارية', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (372, 37, 'B', N'المعلم الجغرافي ومحور التحرك (قرب الجسر القديم)', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (373, 37, 'C', N'نوع خوذة السائق', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (374, 37, 'D', N'الاسم الأول لمخاطب الراديو', 0);

-- Question 38: Q-ATT-038 (CONCENTRATION_ATTENTION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 38 OR Code = 'Q-ATT-038')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 3,
      Code = 'Q-ATT-038',
      Enonce = N'عند مقارنة الرقم التسلسلي لإطار سيارة (Numéro de châssis / VIN) المحفور على الهيكل مع الرقم المسجل بالوثائق، لاحظت السلسلة التالية: المسجل بالوثيقة: (VF1BB0A0F2849182)، والمحفور على المعدن: (VF1BB0A0F2849132). هل يتطابق الرقمان؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'بالتركيز في الخانة قبل الأخيرة: الرقم في الوثيقة هو 8 (182)، بينما المحفور على الهيكل هو 3 (132). هذا الاختلاف في رقم واحد يكشف عدم التطابق وشبهة التزوير أو التلاعب بالهيكل.',
      CompetencesAssociees = N'["التدقيق البصري المركز","مكافحة سرقة وتهريب السيارات"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-ROUTE","SPEC-MOTARD"]',
      OrdreAffichage = 38,
      EstActive = 1
  WHERE QuestionId = 38 OR Code = 'Q-ATT-038';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    38, 1, 3, 'Q-ATT-038', N'عند مقارنة الرقم التسلسلي لإطار سيارة (Numéro de châssis / VIN) المحفور على الهيكل مع الرقم المسجل بالوثائق، لاحظت السلسلة التالية: المسجل بالوثيقة: (VF1BB0A0F2849182)، والمحفور على المعدن: (VF1BB0A0F2849132). هل يتطابق الرقمان؟',
    N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'بالتركيز في الخانة قبل الأخيرة: الرقم في الوثيقة هو 8 (182)، بينما المحفور على الهيكل هو 3 (132). هذا الاختلاف في رقم واحد يكشف عدم التطابق وشبهة التزوير أو التلاعب بالهيكل.', N'["التدقيق البصري المركز","مكافحة سرقة وتهريب السيارات"]',
    N'["SPEC-PJ","SPEC-ROUTE","SPEC-MOTARD"]', 38, 1, 0, 1
  );
END;

-- Options de la question 38
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 38;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (381, 38, 'A', N'نعم متطابقان تماماً ولا يوجد أي فرق', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (382, 38, 'B', N'لا، يوجد اختلاف في الرقم قبل الأخير (8 في الوثيقة مقابل 3 على الهيكل)', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (383, 38, 'C', N'الرقمان يختلفان في الحروف الأولى الثلاثة فقط', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (384, 38, 'D', N'التطابق اختياري إذا كان لون السيارة صحيحاً', 0);

-- Question 39: Q-ATT-039 (CONCENTRATION_ATTENTION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 39 OR Code = 'Q-ATT-039')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 3,
      Code = 'Q-ATT-039',
      Enonce = N'أثناء خفر موكب وتأمين محيط حساس لساعات متواصلة، ما هي التقنية الذهنية الفعالة للحفاظ على مستوى يقظة وانتباه مرتفع ومنع شرود الذهن والانزلاق في التعب؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'المسح البصري الدوري المنظم (دورة المراقبة النشطة عبر قطاعات محددة مع تجديد نقاط التركيز كل بضع ثوان) يبقي الجهاز العصبي يقظاً ويمنع التشتت والانحدار في حالة السهو.',
      CompetencesAssociees = N'["إدارة الانتباه المستمر واليقظة الذهنية","الحماية والتأمين العملياتي"]',
      SpecialitesAssociees = N'["SPEC-GEH","SPEC-GSI","SPEC-PSIG"]',
      OrdreAffichage = 39,
      EstActive = 1
  WHERE QuestionId = 39 OR Code = 'Q-ATT-039';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    39, 1, 3, 'Q-ATT-039', N'أثناء خفر موكب وتأمين محيط حساس لساعات متواصلة، ما هي التقنية الذهنية الفعالة للحفاظ على مستوى يقظة وانتباه مرتفع ومنع شرود الذهن والانزلاق في التعب؟',
    N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'المسح البصري الدوري المنظم (دورة المراقبة النشطة عبر قطاعات محددة مع تجديد نقاط التركيز كل بضع ثوان) يبقي الجهاز العصبي يقظاً ويمنع التشتت والانحدار في حالة السهو.', N'["إدارة الانتباه المستمر واليقظة الذهنية","الحماية والتأمين العملياتي"]',
    N'["SPEC-GEH","SPEC-GSI","SPEC-PSIG"]', 39, 1, 0, 1
  );
END;

-- Options de la question 39
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 39;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (391, 39, 'A', N'التحديق الثابت في نقطة واحدة بعيدة دون تحريك العينين نهائياً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (392, 39, 'B', N'المسح البصري الدوري النشط للقطاعات (Scanning) والتقييم المستمر للمتغيرات المحيطة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (393, 39, 'C', N'استخدام الهاتف المحمول لتجاوز الملل أثناء الوقوف', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (394, 39, 'D', N'إغلاق العينين لدقائق متفرقة لاسترجاع الطاقة أثناء أداء المهمة', 0);

-- Question 40: Q-ATT-040 (CONCENTRATION_ATTENTION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 40 OR Code = 'Q-ATT-040')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 3,
      Code = 'Q-ATT-040',
      Enonce = N'في مستند رسمي مختوم، لاحظ المدقق أن الختم الدائري للإدارة يحمل خطأ إملائياً في كلمة "المملكة" حيث كُتبت بالتاء المفتوحة "المملكت". ما الاستنتاج الدقيق الذي ينبغي الانتباه إليه فوراً؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الأختام الرسمية للدولة تصنع بدقة متناهية ولا يمكن أن تحتوي على أخطاء إملائية بدائية كهذه. وجود هذا الخطأ دليل قاطع على تزييف الختم والمستند.',
      CompetencesAssociees = N'["كشف التزييف الإداري","دقة مراجعة الأختام الرسمية"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SEC-ADMIN","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 40,
      EstActive = 1
  WHERE QuestionId = 40 OR Code = 'Q-ATT-040';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    40, 1, 3, 'Q-ATT-040', N'في مستند رسمي مختوم، لاحظ المدقق أن الختم الدائري للإدارة يحمل خطأ إملائياً في كلمة "المملكة" حيث كُتبت بالتاء المفتوحة "المملكت". ما الاستنتاج الدقيق الذي ينبغي الانتباه إليه فوراً؟',
    N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'الأختام الرسمية للدولة تصنع بدقة متناهية ولا يمكن أن تحتوي على أخطاء إملائية بدائية كهذه. وجود هذا الخطأ دليل قاطع على تزييف الختم والمستند.', N'["كشف التزييف الإداري","دقة مراجعة الأختام الرسمية"]',
    N'["SPEC-PJ","SPEC-SEC-ADMIN","SPEC-SCIENTIFIQUE"]', 40, 1, 0, 1
  );
END;

-- Options de la question 40
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 40;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (401, 40, 'A', N'الخطأ ناتج عن حرارة الطابعة وسيتم تصحيحه تلقائياً مع الوقت', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (402, 40, 'B', N'قرينة قاطعة على زيف الختم والمستند تستوجب الحجز الفوري وفتح تحقيق قضائي', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (403, 40, 'C', N'المطبعة الرسمية غيرت القواعد الإملائية لتلك الكلمة فقط', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (404, 40, 'D', N'المستند صحيح إذا كان حبر الختم باللون الأزرق', 0);

-- Question 41: Q-ATT-041 (CONCENTRATION_ATTENTION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 41 OR Code = 'Q-ATT-041')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 3,
      Code = 'Q-ATT-041',
      Enonce = N'يقود دركي دراجة نارية في مهمة استطلاع سريعة على طريق رطب. في جزء من الثانية، لاحظ أمامه وجود لمعان خفيف غير معتاد مع بقعة متقزحة الألوان على الإسفلت في منعطف حاد. ما الذي يجب الانتباه إليه فوراً؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'اللمعان المتقزح على الإسفلت المبلل يشير إلى وجود تسرب وقود ديزل أو زيت محرك، مما يسبب انعداماً تاماً للالتصاق وخطر انزلاق خطير على عجلتي الدراجة النارية.',
      CompetencesAssociees = N'["القيادة الاحترافية للدراجات","توقع المخاطر الفورية على الطريق"]',
      SpecialitesAssociees = N'["SPEC-MOTARD","SPEC-ROUTE"]',
      OrdreAffichage = 41,
      EstActive = 1
  WHERE QuestionId = 41 OR Code = 'Q-ATT-041';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    41, 1, 3, 'Q-ATT-041', N'يقود دركي دراجة نارية في مهمة استطلاع سريعة على طريق رطب. في جزء من الثانية، لاحظ أمامه وجود لمعان خفيف غير معتاد مع بقعة متقزحة الألوان على الإسفلت في منعطف حاد. ما الذي يجب الانتباه إليه فوراً؟',
    N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'اللمعان المتقزح على الإسفلت المبلل يشير إلى وجود تسرب وقود ديزل أو زيت محرك، مما يسبب انعداماً تاماً للالتصاق وخطر انزلاق خطير على عجلتي الدراجة النارية.', N'["القيادة الاحترافية للدراجات","توقع المخاطر الفورية على الطريق"]',
    N'["SPEC-MOTARD","SPEC-ROUTE"]', 41, 1, 0, 1
  );
END;

-- Options de la question 41
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 41;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (411, 41, 'A', N'اللمعان مجرد زينة للطريق ولا يشكل أي خطر', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (412, 41, 'B', N'وجود تسرب زيت أو ديزل على الإسفلت يستدعي تجنب الكبح المفاجئ وضبط زاوية الميلان فوراً لتفادي السقوط', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (413, 41, 'C', N'زيادة السرعة القصوى لعبور البقعة في أقل وقت ممكن', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (414, 41, 'D', N'إيقاف المحرك أثناء السير في المنعطف', 0);

-- Question 42: Q-ATT-042 (CONCENTRATION_ATTENTION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 42 OR Code = 'Q-ATT-042')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 3,
      Code = 'Q-ATT-042',
      Enonce = N'أثناء تدريب الرماية أو التعامل التكتيكي مع السلاح الفردي، ما هي القاعدة الذهبية الأولى للأمان التي يجب أن يستحضرها الذهن باستمرار دون أي غفلة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'القاعدة الأساسية هي اعتبار أي سلاح ملقماً ومحشواً بالذخيرة الحية في جميع الظروف، وعدم وضع الإصبع على الزناد إلا عند صدور الأمر وتحديد الهدف المؤكد قانونياً.',
      CompetencesAssociees = N'["الانضباط التكتيكي للرماية","قواعد الأمان الصارمة للسلاح"]',
      SpecialitesAssociees = N'["SPEC-PSIG","SPEC-GSI","SPEC-FORMATION"]',
      OrdreAffichage = 42,
      EstActive = 1
  WHERE QuestionId = 42 OR Code = 'Q-ATT-042';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    42, 1, 3, 'Q-ATT-042', N'أثناء تدريب الرماية أو التعامل التكتيكي مع السلاح الفردي، ما هي القاعدة الذهبية الأولى للأمان التي يجب أن يستحضرها الذهن باستمرار دون أي غفلة؟',
    N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'القاعدة الأساسية هي اعتبار أي سلاح ملقماً ومحشواً بالذخيرة الحية في جميع الظروف، وعدم وضع الإصبع على الزناد إلا عند صدور الأمر وتحديد الهدف المؤكد قانونياً.', N'["الانضباط التكتيكي للرماية","قواعد الأمان الصارمة للسلاح"]',
    N'["SPEC-PSIG","SPEC-GSI","SPEC-FORMATION"]', 42, 1, 0, 1
  );
END;

-- Options de la question 42
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 42;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (421, 42, 'A', N'وضع الإصبع دائماً داخل واقي الزناد لتكون جاهزاً للضغط السريع', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (422, 42, 'B', N'اعتبار السلاح دائماً ملقماً وتوجيه الفوهة في اتجاه آمن مع بقاء الإصبع خارج الزناد', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (423, 42, 'C', N'توجيه السلاح نحو الزملاء على سبيل المزاح إذا كان فارغاً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (424, 42, 'D', N'عدم تفقد حجرة النار قبل الرماية توفيراً للوقت', 0);

-- Question 43: Q-ATT-043 (CONCENTRATION_ATTENTION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 43 OR Code = 'Q-ATT-043')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 3,
      Code = 'Q-ATT-043',
      Enonce = N'في قائمة أسماء مطلوبين للعدالة تضم 100 اسم متشابه، عليك تحديد المشتبه فيه المطلوب بالضبط: "محمد بن علي العلمي، المزداد بتاريخ 14/05/1988 بمدينة فاس". أي الأشخاص التاليين هو المطلوب رسمياً؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'التدقيق المركز في جميع العناصر (الاسم الكامل، تاريخ الازدياد، ومكان الازدياد) ضروري لمنع تشابه الأسماء والاعتقال التعسفي لشخص بريء.',
      CompetencesAssociees = N'["التدقيق في المعطيات الهوياتية","منع الأخطاء في توقيف الأشخاص"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SEC-ADMIN"]',
      OrdreAffichage = 43,
      EstActive = 1
  WHERE QuestionId = 43 OR Code = 'Q-ATT-043';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    43, 1, 3, 'Q-ATT-043', N'في قائمة أسماء مطلوبين للعدالة تضم 100 اسم متشابه، عليك تحديد المشتبه فيه المطلوب بالضبط: "محمد بن علي العلمي، المزداد بتاريخ 14/05/1988 بمدينة فاس". أي الأشخاص التاليين هو المطلوب رسمياً؟',
    N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'التدقيق المركز في جميع العناصر (الاسم الكامل، تاريخ الازدياد، ومكان الازدياد) ضروري لمنع تشابه الأسماء والاعتقال التعسفي لشخص بريء.', N'["التدقيق في المعطيات الهوياتية","منع الأخطاء في توقيف الأشخاص"]',
    N'["SPEC-PJ","SPEC-SEC-ADMIN"]', 43, 1, 0, 1
  );
END;

-- Options de la question 43
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 43;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (431, 43, 'A', N'محمد بن علي العلمي، المزداد بتاريخ 14/05/1988 بمدينة مكناس', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (432, 43, 'B', N'محمد بن علي العلمي، المزداد بتاريخ 14/05/1988 بمدينة فاس', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (433, 43, 'C', N'محمد بن عمر العلمي، المزداد بتاريخ 14/05/1988 بمدينة فاس', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (434, 43, 'D', N'محمد بن علي العلمي، المزداد بتاريخ 14/06/1988 بمدينة فاس', 0);

-- Question 44: Q-ATT-044 (CONCENTRATION_ATTENTION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 44 OR Code = 'Q-ATT-044')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 3,
      Code = 'Q-ATT-044',
      Enonce = N'أثناء مراقبة شاشات المراقبة بالفيديو المتعددة (8 شاشات معاً) لغرفة العمليات، ما هو الأسلوب الصحيح للانتباه لتفادي التشتت الذهني وإغفال الأحداث الطارئة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'المسح التتابعي المنتظم بين الشاشات وفق تسلسل محدد (Pattern) مع التركيز الفوري عند رصد حركة غير نمطية هو الأسلوب الأنجع لتفادي العمى الانتباهي (Inattentional blindness).',
      CompetencesAssociees = N'["المراقبة المتعددة للشاشات","إدارة الحمل الإدراكي"]',
      SpecialitesAssociees = N'["SPEC-INFO","SPEC-GSI","SPEC-PSIG"]',
      OrdreAffichage = 44,
      EstActive = 1
  WHERE QuestionId = 44 OR Code = 'Q-ATT-044';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    44, 1, 3, 'Q-ATT-044', N'أثناء مراقبة شاشات المراقبة بالفيديو المتعددة (8 شاشات معاً) لغرفة العمليات، ما هو الأسلوب الصحيح للانتباه لتفادي التشتت الذهني وإغفال الأحداث الطارئة؟',
    N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'المسح التتابعي المنتظم بين الشاشات وفق تسلسل محدد (Pattern) مع التركيز الفوري عند رصد حركة غير نمطية هو الأسلوب الأنجع لتفادي العمى الانتباهي (Inattentional blindness).', N'["المراقبة المتعددة للشاشات","إدارة الحمل الإدراكي"]',
    N'["SPEC-INFO","SPEC-GSI","SPEC-PSIG"]', 44, 1, 0, 1
  );
END;

-- Options de la question 44
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 44;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (441, 44, 'A', N'التحديق في الشاشة رقم 1 طوال فترة العمل وتجاهل باقي الشاشات', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (442, 44, 'B', N'تطبيق تسلسل مسح دائري منظم بين الشاشات مع التوقف عند المؤشرات الحركية الشاذة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (443, 44, 'C', N'إيقاف تشغيل نصف الشاشات لتقليل الإضاءة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (444, 44, 'D', N'الاعتماد على حاسة السمع فقط دون النظر للشاشات', 0);

-- Question 45: Q-ATT-045 (CONCENTRATION_ATTENTION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 45 OR Code = 'Q-ATT-045')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 3,
      Code = 'Q-ATT-045',
      Enonce = N'عند تفتيش شاحنة نقل دولية للبضائع، أي من هذه العلامات الدقيقة في الصندوق الخلفي يجب أن تستثير انتباهك لوجود مخبأ سري مهيأ للتهريب؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'وجود رائحة طلاء جديدة أو سيليكون حديث في جزء محدد، أو عدم تطابق عمق الصندوق المقاس من الداخل مع طوله المقاس من الخارج، يدل قطعاً على تجويف أو جدار عازل مصطنع.',
      CompetencesAssociees = N'["كشف المخابئ السرية","التفتيش العملياتي الدقيق"]',
      SpecialitesAssociees = N'["SPEC-ROUTE","SPEC-PJ","SPEC-PSIG"]',
      OrdreAffichage = 45,
      EstActive = 1
  WHERE QuestionId = 45 OR Code = 'Q-ATT-045';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    45, 1, 3, 'Q-ATT-045', N'عند تفتيش شاحنة نقل دولية للبضائع، أي من هذه العلامات الدقيقة في الصندوق الخلفي يجب أن تستثير انتباهك لوجود مخبأ سري مهيأ للتهريب؟',
    N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'وجود رائحة طلاء جديدة أو سيليكون حديث في جزء محدد، أو عدم تطابق عمق الصندوق المقاس من الداخل مع طوله المقاس من الخارج، يدل قطعاً على تجويف أو جدار عازل مصطنع.', N'["كشف المخابئ السرية","التفتيش العملياتي الدقيق"]',
    N'["SPEC-ROUTE","SPEC-PJ","SPEC-PSIG"]', 45, 1, 0, 1
  );
END;

-- Options de la question 45
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 45;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (451, 45, 'A', N'وجود غبار قديم متراكم بشكل متجانس على كل الزوايا', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (452, 45, 'B', N'فارق في قياس الطول بين الداخل والخارج مع وجود لحام أو سيليكون حديث في الجدار الأمامي', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (453, 45, 'C', N'وجود إطار احتياطي معلق في مكانه الأصلي المخصص', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (454, 45, 'D', N'نظافة زجاج المقصورة الأمامية للشاحنة', 0);

-- Question 46: Q-ATT-046 (CONCENTRATION_ATTENTION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 46 OR Code = 'Q-ATT-046')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 3,
      Code = 'Q-ATT-046',
      Enonce = N'أثناء عد وإحصاء ذخيرة حية في مخزن السلاح: الصندوق يحتوي على 20 علبة، وكل علبة تضم 25 طلقة. أثناء التدقيق السريع، وُجدت علبتان ناقصتان 3 طلقات في كل منهما. كم عدد الطلقات الإجمالي الفعلي الموجود داخل الصندوق؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'العدد الكلي المفترض = 20 × 25 = 500 طلقة. النقص = علبتان × 3 طلقات = 6 طلقات. الإجمالي الفعلي = 500 - 6 = 494 طلقة.',
      CompetencesAssociees = N'["الحساب العملياتي للذخائر","دقة الجرد والرقابة"]',
      SpecialitesAssociees = N'["SPEC-SEC-ADMIN","SPEC-PSIG"]',
      OrdreAffichage = 46,
      EstActive = 1
  WHERE QuestionId = 46 OR Code = 'Q-ATT-046';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    46, 1, 3, 'Q-ATT-046', N'أثناء عد وإحصاء ذخيرة حية في مخزن السلاح: الصندوق يحتوي على 20 علبة، وكل علبة تضم 25 طلقة. أثناء التدقيق السريع، وُجدت علبتان ناقصتان 3 طلقات في كل منهما. كم عدد الطلقات الإجمالي الفعلي الموجود داخل الصندوق؟',
    N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'العدد الكلي المفترض = 20 × 25 = 500 طلقة. النقص = علبتان × 3 طلقات = 6 طلقات. الإجمالي الفعلي = 500 - 6 = 494 طلقة.', N'["الحساب العملياتي للذخائر","دقة الجرد والرقابة"]',
    N'["SPEC-SEC-ADMIN","SPEC-PSIG"]', 46, 1, 0, 1
  );
END;

-- Options de la question 46
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 46;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (461, 46, 'A', N'500 طلقة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (462, 46, 'B', N'494 طلقة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (463, 46, 'C', N'497 طلقة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (464, 46, 'D', N'488 طلقة', 0);

-- Question 47: Q-ATT-047 (CONCENTRATION_ATTENTION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 47 OR Code = 'Q-ATT-047')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 3,
      Code = 'Q-ATT-047',
      Enonce = N'في تمرين تتبع بالعين المجردة لسيارة تسير وسط حركة مرورية كثيفة، انحرفت السيارة خلف حافلة ركاب كبيرة ثم ظهرت سيارة مماثلة من الجهة الأخرى. ما العنصر الأسرع الذي يجب أن يثبت عليه انتباهك فوراً للتأكد أنها نفس السيارة المستهدفة وليست غيرها؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'علامة فارقة بصرية مميزة (مثل كسر في المصباح الخلفي، ملصق معين على الزجاج، أو رقم اللوحة) تكون أسرع وأدق للتحقق من هوية المركبة ومنع الوقوع في فخ التمويه أو الشبيه.',
      CompetencesAssociees = N'["التتبع البصري التكتيكي","التمييز السريع للمركبات"]',
      SpecialitesAssociees = N'["SPEC-MOTARD","SPEC-PSIG","SPEC-PJ"]',
      OrdreAffichage = 47,
      EstActive = 1
  WHERE QuestionId = 47 OR Code = 'Q-ATT-047';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    47, 1, 3, 'Q-ATT-047', N'في تمرين تتبع بالعين المجردة لسيارة تسير وسط حركة مرورية كثيفة، انحرفت السيارة خلف حافلة ركاب كبيرة ثم ظهرت سيارة مماثلة من الجهة الأخرى. ما العنصر الأسرع الذي يجب أن يثبت عليه انتباهك فوراً للتأكد أنها نفس السيارة المستهدفة وليست غيرها؟',
    N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'علامة فارقة بصرية مميزة (مثل كسر في المصباح الخلفي، ملصق معين على الزجاج، أو رقم اللوحة) تكون أسرع وأدق للتحقق من هوية المركبة ومنع الوقوع في فخ التمويه أو الشبيه.', N'["التتبع البصري التكتيكي","التمييز السريع للمركبات"]',
    N'["SPEC-MOTARD","SPEC-PSIG","SPEC-PJ"]', 47, 1, 0, 1
  );
END;

-- Options de la question 47
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 47;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (471, 47, 'A', N'عدد الركاب في الحافلة الكبيرة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (472, 47, 'B', N'علامة فارقة فريدة مسجلة مسبقاً (كرقم اللوحة، أو كسر في زجاج/مصباح معين)', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (473, 47, 'C', N'لون غطاء عجلات السيارات الأخرى المجاورة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (474, 47, 'D', N'التوقف تماماً والاتصال بالأرصاد الجوية', 0);

-- Question 48: Q-ATT-048 (CONCENTRATION_ATTENTION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 48 OR Code = 'Q-ATT-048')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 3,
      Code = 'Q-ATT-048',
      Enonce = N'عند استلام أمر عملياتي مشفر عبر البرقية اللاسلكية: "تحرك فوري للموقع دلتا-4، مستوى التهديد برتقالي، الصمت اللاسلكي ساري المفعول حتى الإشعار الآخر". ما الذي يمنعك هذا الأمر من فعله انتباهياً وانضباطياً؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'فرض الصمت اللاسلكي (Silence radio) يمنع تماماً إجراء أي إرسال أو كلام عبر أجهزة اللاسلكي لتفادي اعتراض الإشارات أو كشف مكان القوة للمشتبه فيهم، ما عدا في حالات الخطر المهدد للحياة.',
      CompetencesAssociees = N'["الانضباط الإجرائي اللاسلكي","الاستيعاب السريع للتعليمات المشفرة"]',
      SpecialitesAssociees = N'["SPEC-GSI","SPEC-INFO","SPEC-PSIG"]',
      OrdreAffichage = 48,
      EstActive = 1
  WHERE QuestionId = 48 OR Code = 'Q-ATT-048';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    48, 1, 3, 'Q-ATT-048', N'عند استلام أمر عملياتي مشفر عبر البرقية اللاسلكية: "تحرك فوري للموقع دلتا-4، مستوى التهديد برتقالي، الصمت اللاسلكي ساري المفعول حتى الإشعار الآخر". ما الذي يمنعك هذا الأمر من فعله انتباهياً وانضباطياً؟',
    N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'فرض الصمت اللاسلكي (Silence radio) يمنع تماماً إجراء أي إرسال أو كلام عبر أجهزة اللاسلكي لتفادي اعتراض الإشارات أو كشف مكان القوة للمشتبه فيهم، ما عدا في حالات الخطر المهدد للحياة.', N'["الانضباط الإجرائي اللاسلكي","الاستيعاب السريع للتعليمات المشفرة"]',
    N'["SPEC-GSI","SPEC-INFO","SPEC-PSIG"]', 48, 1, 0, 1
  );
END;

-- Options de la question 48
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 48;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (481, 48, 'A', N'يمنع قيادة السيارات بسرعة معتدلة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (482, 48, 'B', N'يمنع بث أي رسائل صوتية عبر اللاسلكي حفاظاً على سرية العملية وعدم كشف موقع الفرقة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (483, 48, 'C', N'يمنع ارتداء الخوذة الواقية', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (484, 48, 'D', N'يمنع استخدام المكابح أثناء السير', 0);

-- Question 49: Q-ATT-049 (CONCENTRATION_ATTENTION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 49 OR Code = 'Q-ATT-049')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 3,
      Code = 'Q-ATT-049',
      Enonce = N'في مستودع حفظ المحجوزات، طُلب منك مطابقة 4 أكياس أحراز قضائية مختومة تحمل الرموز: (S-104-A)، (S-104-B)، (S-105-A)، (S-105-B). تبين أن أحد الأكياس تم فتح سلك رصاصه الفضي وإعادة لفه يدوياً دون ختم القفل الرسمي. ما هو الإجراء الانتباهي الفوري؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'أي تلاعب أو مساس بختم الرصاص للحرز القضائي (Scellé) يكسر سلسلة الحراسة (Chaîne de traçabilité)، ويستوجب تحرير محضر إثبات حالة فوري وتوقيف التداول لإشعار النيابة العامة والتحقيق في الواقعة.',
      CompetencesAssociees = N'["سلامة سلسلة الحراسة للأحراز","الانتباه لسلامة الأختام القضائية"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE","SPEC-SEC-ADMIN"]',
      OrdreAffichage = 49,
      EstActive = 1
  WHERE QuestionId = 49 OR Code = 'Q-ATT-049';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    49, 1, 3, 'Q-ATT-049', N'في مستودع حفظ المحجوزات، طُلب منك مطابقة 4 أكياس أحراز قضائية مختومة تحمل الرموز: (S-104-A)، (S-104-B)، (S-105-A)، (S-105-B). تبين أن أحد الأكياس تم فتح سلك رصاصه الفضي وإعادة لفه يدوياً دون ختم القفل الرسمي. ما هو الإجراء الانتباهي الفوري؟',
    N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'أي تلاعب أو مساس بختم الرصاص للحرز القضائي (Scellé) يكسر سلسلة الحراسة (Chaîne de traçabilité)، ويستوجب تحرير محضر إثبات حالة فوري وتوقيف التداول لإشعار النيابة العامة والتحقيق في الواقعة.', N'["سلامة سلسلة الحراسة للأحراز","الانتباه لسلامة الأختام القضائية"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE","SPEC-SEC-ADMIN"]', 49, 1, 0, 1
  );
END;

-- Options de la question 49
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 49;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (491, 49, 'A', N'إعادة إغلاقه بلاصق شفاف وإخفاء الأمر حفاظاً على وقت المحكمة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (492, 49, 'B', N'إيقاف الاستلام فوراً، وتحرير تقرير فني بكسر الختم وإشعار المسؤول القضائي المختص', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (493, 49, 'C', N'رمي الحرز في سلة المهملات لعدم صلاحيته', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (494, 49, 'D', N'تبديل الكيس بكيس آخر فارغ دون إخبار أحد', 0);

-- Question 50: Q-ATT-050 (CONCENTRATION_ATTENTION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 50 OR Code = 'Q-ATT-050')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 3,
      Code = 'Q-ATT-050',
      Enonce = N'خلال تأمين احتفال رسمي وسط حشد جماهيري غفير، ما هو العنصر الذي ينبغي لعنصر الحماية المقربة (GEH / GSI) التركيز عليه بالدرجة الأولى لتفادي التهديدات؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'في مبادئ الحماية المقربة العالمية: "الأيدي هي التي تؤذي" (The hands are the threat). يجب التركيز المستمر على حركة أيدي الأشخاص في المحيط القريب ورصد محاولات إخراج أجسام أو مد اليد نحو الجيوب.',
      CompetencesAssociees = N'["الحماية المقربة وتأمين الشخصيات","رصد التهديدات في الحشود"]',
      SpecialitesAssociees = N'["SPEC-GEH","SPEC-GSI","SPEC-PSIG"]',
      OrdreAffichage = 50,
      EstActive = 1
  WHERE QuestionId = 50 OR Code = 'Q-ATT-050';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    50, 1, 3, 'Q-ATT-050', N'خلال تأمين احتفال رسمي وسط حشد جماهيري غفير، ما هو العنصر الذي ينبغي لعنصر الحماية المقربة (GEH / GSI) التركيز عليه بالدرجة الأولى لتفادي التهديدات؟',
    N'سياق مهني عملياتي لتقييم كفاءات التركيز والانتباه.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'في مبادئ الحماية المقربة العالمية: "الأيدي هي التي تؤذي" (The hands are the threat). يجب التركيز المستمر على حركة أيدي الأشخاص في المحيط القريب ورصد محاولات إخراج أجسام أو مد اليد نحو الجيوب.', N'["الحماية المقربة وتأمين الشخصيات","رصد التهديدات في الحشود"]',
    N'["SPEC-GEH","SPEC-GSI","SPEC-PSIG"]', 50, 1, 0, 1
  );
END;

-- Options de la question 50
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 50;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (501, 50, 'A', N'أحذية الأشخاص وألوان ملابسهم', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (502, 50, 'B', N'أيدي الأشخاص المحيطين وسلوكياتهم الحركية ونظراتهم الموجهة للشخصية المحمية', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (503, 50, 'C', N'تصميم لافتات المحلات التجارية المجاورة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (504, 50, 'D', N'الاستماع لأغاني الحفل والتفاعل معها', 0);

-- Question 51: Q-RES-051 (RESOLUTION_PROBLEMES)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 51 OR Code = 'Q-RES-051')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 4,
      Code = 'Q-RES-051',
      Enonce = N'تصل دوريتك أولاً إلى مسرح حادث سير مروع مع وجود اصطدام متعدد، وتلاحظ شخصاً فاقداً للوعي محاصراً داخل سيارة يتصاعد منها دخان كثيف مع احتمال اشتعال النار، وفي نفس الوقت يطلب سائق شاحنة طرف في الحادث أخذ بيانات التأمين على الفور. ما هو قرارك العملياتي الفوري؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'القاعدة المطلقة في العمليات الأمنية هي أن حماية وإنقاذ الأرواح البشرية المعرضة لخطر داهم تتقدم على كافة الإجراءات الإدارية والمادية والمعاينات دون أي تردد.',
      CompetencesAssociees = N'["تحديد الأولويات الحيوية","إدارة الطوارئ وإنقاذ الأرواح"]',
      SpecialitesAssociees = N'["SPEC-PSIG","SPEC-ROUTE","SPEC-MOTARD"]',
      OrdreAffichage = 51,
      EstActive = 1
  WHERE QuestionId = 51 OR Code = 'Q-RES-051';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    51, 1, 4, 'Q-RES-051', N'تصل دوريتك أولاً إلى مسرح حادث سير مروع مع وجود اصطدام متعدد، وتلاحظ شخصاً فاقداً للوعي محاصراً داخل سيارة يتصاعد منها دخان كثيف مع احتمال اشتعال النار، وفي نفس الوقت يطلب سائق شاحنة طرف في الحادث أخذ بيانات التأمين على الفور. ما هو قرارك العملياتي الفوري؟',
    N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'القاعدة المطلقة في العمليات الأمنية هي أن حماية وإنقاذ الأرواح البشرية المعرضة لخطر داهم تتقدم على كافة الإجراءات الإدارية والمادية والمعاينات دون أي تردد.', N'["تحديد الأولويات الحيوية","إدارة الطوارئ وإنقاذ الأرواح"]',
    N'["SPEC-PSIG","SPEC-ROUTE","SPEC-MOTARD"]', 51, 1, 0, 1
  );
END;

-- Options de la question 51
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 51;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (511, 51, 'A', N'تحرير ورقة التأمين لسائق الشاحنة أولاً لأنها تستغرق وقتاً أقل', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (512, 51, 'B', N'تأمين محيط الحريق فوراً، الشروع في إخراج المصاب والإنقاذ العاجل، وطلب الإسعاف وتعزيزات الإطفاء', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (513, 51, 'C', N'الانتظار داخل سيارة الدورية حتى وصول سيارات الإسعاف فقط', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (514, 51, 'D', N'مغادرة الموقع للبحث عن شهود الحادث في القرية المجاورة', 0);

-- Question 52: Q-RES-052 (RESOLUTION_PROBLEMES)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 52 OR Code = 'Q-RES-052')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 4,
      Code = 'Q-RES-052',
      Enonce = N'أثناء ملاحقة سيارة مشبوهة رفض سائقها الامتثال لأمر التوقف، دخل السائق بسرعة جنونية في شارع مكتظ بالمشاة والأطفال قرب مدرسة في وقت خروج التلاميذ. ما هو القرار التكتيكي الأكثر حكمة ومسؤولية؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'استمرار المطاردة السريعة العنيفة وسط حشد من الأطفال يرفع خطر وقوع كارثة بشرية جسيمة؛ القرار المهني السليم هو تعليق الملاحقة المباشرة القريبة فوراً، وتطويق المنطقة بنقاط إغلاق مسبقة والتتبع عن بعد.',
      CompetencesAssociees = N'["الموازنة بين المخاطر والأهداف","اتخاذ القرار تحت الضغط العملياتي"]',
      SpecialitesAssociees = N'["SPEC-MOTARD","SPEC-ROUTE","SPEC-PSIG"]',
      OrdreAffichage = 52,
      EstActive = 1
  WHERE QuestionId = 52 OR Code = 'Q-RES-052';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    52, 1, 4, 'Q-RES-052', N'أثناء ملاحقة سيارة مشبوهة رفض سائقها الامتثال لأمر التوقف، دخل السائق بسرعة جنونية في شارع مكتظ بالمشاة والأطفال قرب مدرسة في وقت خروج التلاميذ. ما هو القرار التكتيكي الأكثر حكمة ومسؤولية؟',
    N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'استمرار المطاردة السريعة العنيفة وسط حشد من الأطفال يرفع خطر وقوع كارثة بشرية جسيمة؛ القرار المهني السليم هو تعليق الملاحقة المباشرة القريبة فوراً، وتطويق المنطقة بنقاط إغلاق مسبقة والتتبع عن بعد.', N'["الموازنة بين المخاطر والأهداف","اتخاذ القرار تحت الضغط العملياتي"]',
    N'["SPEC-MOTARD","SPEC-ROUTE","SPEC-PSIG"]', 52, 1, 0, 1
  );
END;

-- Options de la question 52
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 52;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (521, 52, 'A', N'زيادة السرعة ومحاولة صدم سيارة المشتبه فيه لإيقافها وسط حشد التلاميذ', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (522, 52, 'B', N'وقف المطاردة المباشرة اللصيقة لحماية أرواح المشاة، وإبلاغ قاعة القيادة لإقامة سد قضائي أمامي ومتابعة المسار بحذر', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (523, 52, 'C', N'إطلاق النار العشوائي على عجلات السيارة وسط جموع الأطفال', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (524, 52, 'D', N'إغلاق اللاسلكي والعودة فوراً إلى الثكنة دون إشعار القيادة', 0);

-- Question 53: Q-RES-053 (RESOLUTION_PROBLEMES)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 53 OR Code = 'Q-RES-053')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 4,
      Code = 'Q-RES-053',
      Enonce = N'في مسرح جريمة قتل حديثة، تم العثور على سلاح الجريمة (سكين ملطخ بالدماء) على بعد سنتيمترات من الضحية، وهناك احتمال كبير لسقوط أمطار غزيرة وشيكة ستمحو الآثار والبصمات قبل وصول فرقة الشرطة التقنية والعلمية. ما القرار الإجرائي السليم؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'في حالة الخطر المحدق بالدليل المادي (كالأمطار الغزيرة)، يلزم حماية الأثر بغطاء عازل دون ملامسته، أو تصويره بدقة متناهية من عدة زوايا وتدوين موقعه بالضبط ثم رفعه بحذر شديد مع ارتداء قفازات ووضعه في حرز واقٍ وتضمين ذلك بمحضر معلل.',
      CompetencesAssociees = N'["حفظ الأدلة الجنائية في الظروف القاسية","الشرطة القضائية الاستعجالية"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 53,
      EstActive = 1
  WHERE QuestionId = 53 OR Code = 'Q-RES-053';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    53, 1, 4, 'Q-RES-053', N'في مسرح جريمة قتل حديثة، تم العثور على سلاح الجريمة (سكين ملطخ بالدماء) على بعد سنتيمترات من الضحية، وهناك احتمال كبير لسقوط أمطار غزيرة وشيكة ستمحو الآثار والبصمات قبل وصول فرقة الشرطة التقنية والعلمية. ما القرار الإجرائي السليم؟',
    N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'في حالة الخطر المحدق بالدليل المادي (كالأمطار الغزيرة)، يلزم حماية الأثر بغطاء عازل دون ملامسته، أو تصويره بدقة متناهية من عدة زوايا وتدوين موقعه بالضبط ثم رفعه بحذر شديد مع ارتداء قفازات ووضعه في حرز واقٍ وتضمين ذلك بمحضر معلل.', N'["حفظ الأدلة الجنائية في الظروف القاسية","الشرطة القضائية الاستعجالية"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]', 53, 1, 0, 1
  );
END;

-- Options de la question 53
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 53;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (531, 53, 'A', N'ترك السكين لمياه المطر لأن غسل السكين لا يؤثر أبداً على البصمات', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (532, 53, 'B', N'حماية السلاح فوراً بغطاء واقٍ أو توثيقه بالصور بدقة ورفعه استثنائياً وفق الضوابط لحفظ الأثر من التلف مع تدوين ذلك بمحضر', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (533, 53, 'C', N'مسح السكين بقطعة قماش لتجفيفه قبل المطر', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (534, 53, 'D', N'نقل جثة الضحية وإبقاء السلاح مكانه دون تغطية', 0);

-- Question 54: Q-RES-054 (RESOLUTION_PROBLEMES)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 54 OR Code = 'Q-RES-054')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 4,
      Code = 'Q-RES-054',
      Enonce = N'أثناء دورية ليلية في منطقة جبلية نائية خلال عاصفة ثلجية، علقت سيارة مدنية بها عائلة وأطفال. بطارية هاتف السائق نفدت، وسيارة الدورية تحتوي على نصف خزان وقود فقط، مع انقطاع تغطية اللاسلكي المباشرة بالمركز. كيف تتصرف منهجياً لحل هذا المأزق؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الأولوية هي نقل الأشخاص الضعفاء (الأطفال) إلى مركبة الدورية الدافئة فوراً لحمايتهم من انخفاض الحرارة، الاقتصاد في وقود الدورية، والتحرك إلى أقرب نقطة مرتفعة لإرسال إشارة استغاثة محددة الإحداثيات للثكنة وتوجيه كاسحة الثلوج.',
      CompetencesAssociees = N'["إدارة الأزمات في البيئات المعزولة","التصرف المنطقي في الميدان"]',
      SpecialitesAssociees = N'["SPEC-PSIG","SPEC-GSI","SPEC-GEH"]',
      OrdreAffichage = 54,
      EstActive = 1
  WHERE QuestionId = 54 OR Code = 'Q-RES-054';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    54, 1, 4, 'Q-RES-054', N'أثناء دورية ليلية في منطقة جبلية نائية خلال عاصفة ثلجية، علقت سيارة مدنية بها عائلة وأطفال. بطارية هاتف السائق نفدت، وسيارة الدورية تحتوي على نصف خزان وقود فقط، مع انقطاع تغطية اللاسلكي المباشرة بالمركز. كيف تتصرف منهجياً لحل هذا المأزق؟',
    N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'الأولوية هي نقل الأشخاص الضعفاء (الأطفال) إلى مركبة الدورية الدافئة فوراً لحمايتهم من انخفاض الحرارة، الاقتصاد في وقود الدورية، والتحرك إلى أقرب نقطة مرتفعة لإرسال إشارة استغاثة محددة الإحداثيات للثكنة وتوجيه كاسحة الثلوج.', N'["إدارة الأزمات في البيئات المعزولة","التصرف المنطقي في الميدان"]',
    N'["SPEC-PSIG","SPEC-GSI","SPEC-GEH"]', 54, 1, 0, 1
  );
END;

-- Options de la question 54
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 54;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (541, 54, 'A', N'مغادرة المكان وترك العائلة والعودة بمفردكم إلى المركز سيراً على الأقدام', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (542, 54, 'B', N'إيواء العائلة داخل مركبة الدورية للتدفئة، ترشيد الوقود، والتحرك لنقطة بث إشارة استغاثة لطلب إمداد كاسحات الثلوج', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (543, 54, 'C', N'إشعال النار بإطارات سيارة المواطن للتدفئة المؤقتة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (544, 54, 'D', N'الطلب من الأطفال دفع سيارتهم العالقة في الثلج', 0);

-- Question 55: Q-RES-055 (RESOLUTION_PROBLEMES)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 55 OR Code = 'Q-RES-055')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 4,
      Code = 'Q-RES-055',
      Enonce = N'شخص محتجز داخل منزله يهدد بإيذاء نفسه وبحوزته سلاح أبيض، وهو في حالة هيجان نفسي حاد. تجمهر العشرات من الجيران الفضوليين أمام الباب مما زاد من توتره. ما هو الإجراء العملياتي الأول الواجب تنفيذه فوراً؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'التصرف الحاسم الأول هو إقامة طوق أمني فوري لإبعاد الجموع وتصفية المحيط من كل مسبب للضوضاء والاستفزاز (عزل الموقف)، يليه بدء الحوار التهدئي والتفاوض المتخصص.',
      CompetencesAssociees = N'["احتواء المواقف الحرجة وتخفيف التوتر","التطويق وعزل مسرح الحادث"]',
      SpecialitesAssociees = N'["SPEC-GSI","SPEC-PSIG","SPEC-PJ"]',
      OrdreAffichage = 55,
      EstActive = 1
  WHERE QuestionId = 55 OR Code = 'Q-RES-055';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    55, 1, 4, 'Q-RES-055', N'شخص محتجز داخل منزله يهدد بإيذاء نفسه وبحوزته سلاح أبيض، وهو في حالة هيجان نفسي حاد. تجمهر العشرات من الجيران الفضوليين أمام الباب مما زاد من توتره. ما هو الإجراء العملياتي الأول الواجب تنفيذه فوراً؟',
    N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'التصرف الحاسم الأول هو إقامة طوق أمني فوري لإبعاد الجموع وتصفية المحيط من كل مسبب للضوضاء والاستفزاز (عزل الموقف)، يليه بدء الحوار التهدئي والتفاوض المتخصص.', N'["احتواء المواقف الحرجة وتخفيف التوتر","التطويق وعزل مسرح الحادث"]',
    N'["SPEC-GSI","SPEC-PSIG","SPEC-PJ"]', 55, 1, 0, 1
  );
END;

-- Options de la question 55
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 55;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (551, 55, 'A', N'اقتحام المنزل بالقوة المفرطة دون أي تفاوض أو تمهيد', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (552, 55, 'B', N'ضرب طوق أمني وإبعاد الجمهور الفضولي لتهدئة الأجواء، وتثبيت الموقف وبدء الحوار الاحترافي', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (553, 55, 'C', N'تشجيع الجيران على الدخول معه في مشادات كلامية', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (554, 55, 'D', N'ترك الشخص وشأنه والانسحاب من الحي كلياً', 0);

-- Question 56: Q-RES-056 (RESOLUTION_PROBLEMES)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 56 OR Code = 'Q-RES-056')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 4,
      Code = 'Q-RES-056',
      Enonce = N'أثناء خفر موكب شرفي رسمي بواسطة الدراجات النارية، تعطلت إحدى دراجات الموكب فجأة بسبب عطل ميكانيكي طارئ وتوقفت في مسار السير. كيف تتصرف الدراجة المعطلة وباقي تشكيل الموكب وفق التكتيكات المعمول بها؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'في بروتوكولات المواكب الرسمية، لا يتوقف الموكب إطلاقاً؛ تنحاز الدراجة المعطلة فوراً نحو أقصى اليمين خارج المسار لتفادي عرقلة الموكب، بينما يعوض التشكيل الثغرة تلقائياً بمواصلة التقدم الحذر.',
      CompetencesAssociees = N'["بروتوكولات مواكب الشرف وحماية الشخصيات","إدارة الطوارئ الميكانيكية"]',
      SpecialitesAssociees = N'["SPEC-GEH","SPEC-MOTARD","SPEC-ROUTE"]',
      OrdreAffichage = 56,
      EstActive = 1
  WHERE QuestionId = 56 OR Code = 'Q-RES-056';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    56, 1, 4, 'Q-RES-056', N'أثناء خفر موكب شرفي رسمي بواسطة الدراجات النارية، تعطلت إحدى دراجات الموكب فجأة بسبب عطل ميكانيكي طارئ وتوقفت في مسار السير. كيف تتصرف الدراجة المعطلة وباقي تشكيل الموكب وفق التكتيكات المعمول بها؟',
    N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'في بروتوكولات المواكب الرسمية، لا يتوقف الموكب إطلاقاً؛ تنحاز الدراجة المعطلة فوراً نحو أقصى اليمين خارج المسار لتفادي عرقلة الموكب، بينما يعوض التشكيل الثغرة تلقائياً بمواصلة التقدم الحذر.', N'["بروتوكولات مواكب الشرف وحماية الشخصيات","إدارة الطوارئ الميكانيكية"]',
    N'["SPEC-GEH","SPEC-MOTARD","SPEC-ROUTE"]', 56, 1, 0, 1
  );
END;

-- Options de la question 56
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 56;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (561, 56, 'A', N'إيقاف الموكب بأكمله وسط الطريق حتى إصلاح الدراجة المعطلة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (562, 56, 'B', N'انحياز الدراجة المعطلة فوراً إلى حافة الطريق لتفادي العرقلة، واستمرار الموكب في تقدمه مع إعادة تموضع باقي الدراجات لملء الفراغ', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (563, 56, 'C', N'سحب الدراجة المعطلة بحبل خلف سيارة الشخصية الرسمية', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (564, 56, 'D', N'النزول وترك الدراجة وسط الطريق والركض خلف الموكب', 0);

-- Question 57: Q-RES-057 (RESOLUTION_PROBLEMES)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 57 OR Code = 'Q-RES-057')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 4,
      Code = 'Q-RES-057',
      Enonce = N'في مركز الاتصال للدرك الملكي، وردت في نفس الدقيقة ثلاثة بلاغات متزامنة: 1) شجار بالأيدي بدون أسلحة في مقهى، 2) حادث سير مع إصابات خطيرة على الطريق الوطني، 3) بلاغ عن سرقة دراجة هوائية من فناء منزل قبل 3 ساعات. كيف ترتب إرسال الدوريات المتاحة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الترتيب العملياتي السليم يعتمد على خطورة التهديد على الأرواح والوقت: 1) حادث السير مع جرحى (خطر موت داهم)، 2) شجار بالمقهى (خطر تفاقم فوري)، 3) سرقة الدراجة (جريمة منتهية لا تهدد السلامة الجسدية فورياً).',
      CompetencesAssociees = N'["إدارة البلاغات العملياتية","تحديد أسبقية التدخل الأمني"]',
      SpecialitesAssociees = N'["SPEC-PSIG","SPEC-ROUTE","SPEC-SEC-ADMIN"]',
      OrdreAffichage = 57,
      EstActive = 1
  WHERE QuestionId = 57 OR Code = 'Q-RES-057';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    57, 1, 4, 'Q-RES-057', N'في مركز الاتصال للدرك الملكي، وردت في نفس الدقيقة ثلاثة بلاغات متزامنة: 1) شجار بالأيدي بدون أسلحة في مقهى، 2) حادث سير مع إصابات خطيرة على الطريق الوطني، 3) بلاغ عن سرقة دراجة هوائية من فناء منزل قبل 3 ساعات. كيف ترتب إرسال الدوريات المتاحة؟',
    N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'الترتيب العملياتي السليم يعتمد على خطورة التهديد على الأرواح والوقت: 1) حادث السير مع جرحى (خطر موت داهم)، 2) شجار بالمقهى (خطر تفاقم فوري)، 3) سرقة الدراجة (جريمة منتهية لا تهدد السلامة الجسدية فورياً).', N'["إدارة البلاغات العملياتية","تحديد أسبقية التدخل الأمني"]',
    N'["SPEC-PSIG","SPEC-ROUTE","SPEC-SEC-ADMIN"]', 57, 1, 0, 1
  );
END;

-- Options de la question 57
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 57;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (571, 57, 'A', N'سرقة الدراجة أولاً، ثم الشجار، ثم حادث السير', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (572, 57, 'B', N'حادث السير مع إصابات (أولوية قصوى)، يليه الشجار في المقهى، ثم سرقة الدراجة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (573, 57, 'C', N'الشجار بالمقهى أولاً وتجاهل حادث السير تماماً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (574, 57, 'D', N'الانتظار حتى انتهاء فترة العمل وتسليم البلاغات للوردية الموالية', 0);

-- Question 58: Q-RES-058 (RESOLUTION_PROBLEMES)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 58 OR Code = 'Q-RES-058')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 4,
      Code = 'Q-RES-058',
      Enonce = N'أثناء استجواب مشتبه فيه خطير، انهار باكياً وأبدى رغبة في الاعتراف الكامل مقابل تزويده بهاتفه للاتصال بعائلته "لإخبارهم فقط". ما هو القرار القانوني والأمني الصائب في هذه اللحظة الحرجة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'تسليم الهاتف للمشتبه فيه أثناء الاستجواب يمثل خرقاً أمنياً وقضائياً جسيماً؛ قد يستغله لتحذير الشركاء، مسح بيانات رقمية عن بعد، أو إخفاء معالم الجريمة. يجب طمأنته إنسانياً وتدوين اعترافه قانونياً وتمكينه من حقوقه النظامية عبر الهاتف الرسمي للمصلحة وتحت المراقبة.',
      CompetencesAssociees = N'["إدارة استجواب المشتبه فيهم","اليقظة ضد إتلاف الأدلة والإنذار"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 58,
      EstActive = 1
  WHERE QuestionId = 58 OR Code = 'Q-RES-058';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    58, 1, 4, 'Q-RES-058', N'أثناء استجواب مشتبه فيه خطير، انهار باكياً وأبدى رغبة في الاعتراف الكامل مقابل تزويده بهاتفه للاتصال بعائلته "لإخبارهم فقط". ما هو القرار القانوني والأمني الصائب في هذه اللحظة الحرجة؟',
    N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'تسليم الهاتف للمشتبه فيه أثناء الاستجواب يمثل خرقاً أمنياً وقضائياً جسيماً؛ قد يستغله لتحذير الشركاء، مسح بيانات رقمية عن بعد، أو إخفاء معالم الجريمة. يجب طمأنته إنسانياً وتدوين اعترافه قانونياً وتمكينه من حقوقه النظامية عبر الهاتف الرسمي للمصلحة وتحت المراقبة.', N'["إدارة استجواب المشتبه فيهم","اليقظة ضد إتلاف الأدلة والإنذار"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]', 58, 1, 0, 1
  );
END;

-- Options de la question 58
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 58;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (581, 58, 'A', N'إعطاؤه هاتفه الشخصي على الفور وتركه يتصل بمفرده في ركن الغرفة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (582, 58, 'B', N'رفض إعطائه هاتفه الخاص درءاً لإنذار الشركاء أو مسح الأدلة، وتطبيق الإجراءات المسطرية القانونية المعتمدة للاعتراف والاتصال النظامي', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (583, 58, 'C', N'السماح له بالذهاب إلى منزله لإجراء المكالمة ثم العودة بمفرده', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (584, 58, 'D', N'إيقاف التحقيق وتمزيق المحضر فور بكائه', 0);

-- Question 59: Q-RES-059 (RESOLUTION_PROBLEMES)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 59 OR Code = 'Q-RES-059')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 4,
      Code = 'Q-RES-059',
      Enonce = N'خلال فيضان مباغت لوادٍ جرف قنطرة رئيسية، وجدت الدورية نفسها مقطوعة بين ضفتين، بينما شوهد مواطنون يحاولون عبور تيار جارف بسياراتهم معرضين أنفسهم للغرق المؤكد. ما القرار الحازم والسريع الواجب فرضه؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الحزم في قطع الطريق بالكامل ووضع حواجز مادية ومنع أي محاولة للمرور بالقوة هو القرار الوحيد الكفيل بمنع مأساة غرق للمواطنين، مع التنسيق مع الحماية المدنية لعمليات الإجلاء الآمن.',
      CompetencesAssociees = N'["حماية الأرواح في الكوارث الطبيعية","الحزم العملياتي والمنع الوقائي"]',
      SpecialitesAssociees = N'["SPEC-PSIG","SPEC-ROUTE","SPEC-MOTARD"]',
      OrdreAffichage = 59,
      EstActive = 1
  WHERE QuestionId = 59 OR Code = 'Q-RES-059';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    59, 1, 4, 'Q-RES-059', N'خلال فيضان مباغت لوادٍ جرف قنطرة رئيسية، وجدت الدورية نفسها مقطوعة بين ضفتين، بينما شوهد مواطنون يحاولون عبور تيار جارف بسياراتهم معرضين أنفسهم للغرق المؤكد. ما القرار الحازم والسريع الواجب فرضه؟',
    N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'الحزم في قطع الطريق بالكامل ووضع حواجز مادية ومنع أي محاولة للمرور بالقوة هو القرار الوحيد الكفيل بمنع مأساة غرق للمواطنين، مع التنسيق مع الحماية المدنية لعمليات الإجلاء الآمن.', N'["حماية الأرواح في الكوارث الطبيعية","الحزم العملياتي والمنع الوقائي"]',
    N'["SPEC-PSIG","SPEC-ROUTE","SPEC-MOTARD"]', 59, 1, 0, 1
  );
END;

-- Options de la question 59
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 59;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (591, 59, 'A', N'ترك السائقين يقررون بأنفسهم حسب مهاراتهم في القيادة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (592, 59, 'B', N'المنع القطعي التام لحركة المرور، وإغلاق المسلك بالحواجز وشارات التحذير، وتوجيه المواطنين لمناطق آمنة مرتفعة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (593, 59, 'C', N'تشجيع السيارات الكبيرة فقط على عبور الوادي الجارف', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (594, 59, 'D', N'السباحة بمفردك وسط الوادي لقياس عمق المياه', 0);

-- Question 60: Q-RES-060 (RESOLUTION_PROBLEMES)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 60 OR Code = 'Q-RES-060')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 4,
      Code = 'Q-RES-060',
      Enonce = N'اكتشفت خللاً برمجياً حرجاً في حاسوب غرفة العمليات يسمح للمستخدم العادي بالاطلاع على هويات الشهود المحميين والشكاوى السرية دون صلاحية رسمية. ما الخطوة المسؤولة الفورية؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'حماية المعطيات السرية وهويات الشهود مسؤولية حيوية؛ يلزم عزل الجهاز أو قطع نفاذه للشبكة فوراً، وإشعار المسؤول الأمني المعلوماتي والقضائي لمعالجة الثغرة وتدقيق سجلات الولوج السابقة.',
      CompetencesAssociees = N'["أمن النظم المعلوماتية الحساسة","حماية المعطيات القضائية ذات الطابع السري"]',
      SpecialitesAssociees = N'["SPEC-INFO","SPEC-PJ","SPEC-SEC-ADMIN"]',
      OrdreAffichage = 60,
      EstActive = 1
  WHERE QuestionId = 60 OR Code = 'Q-RES-060';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    60, 1, 4, 'Q-RES-060', N'اكتشفت خللاً برمجياً حرجاً في حاسوب غرفة العمليات يسمح للمستخدم العادي بالاطلاع على هويات الشهود المحميين والشكاوى السرية دون صلاحية رسمية. ما الخطوة المسؤولة الفورية؟',
    N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'حماية المعطيات السرية وهويات الشهود مسؤولية حيوية؛ يلزم عزل الجهاز أو قطع نفاذه للشبكة فوراً، وإشعار المسؤول الأمني المعلوماتي والقضائي لمعالجة الثغرة وتدقيق سجلات الولوج السابقة.', N'["أمن النظم المعلوماتية الحساسة","حماية المعطيات القضائية ذات الطابع السري"]',
    N'["SPEC-INFO","SPEC-PJ","SPEC-SEC-ADMIN"]', 60, 1, 0, 1
  );
END;

-- Options de la question 60
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 60;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (601, 60, 'A', N'تحميل قائمة الشهود على مفتاح USB خاص للاحتفاظ بها للمستقبل', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (602, 60, 'B', N'عزل المنظومة مؤقتاً والإبلاغ الفوري للخلية الأمنية المعلوماتية المختصة لمعالجة الثغرة وسد النفاذ غير المصرح به', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (603, 60, 'C', N'نشر الثغرة على مواقع التواصل الاجتماعي لتنبيه الزملاء', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (604, 60, 'D', N'تجاهل الأمر تماماً لأن البرامج تقوم بإصلاح نفسها تلقائياً', 0);

-- Question 61: Q-RES-061 (RESOLUTION_PROBLEMES)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 61 OR Code = 'Q-RES-061')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 4,
      Code = 'Q-RES-061',
      Enonce = N'أثناء تنفيذ عملية مداهمة لمنزل شخص تاجر مخدرات خطير صدرت بحقه مذكرة بحث، لوحظ عند الاقتراب وجود أطفال صغار يلعبون في الردهة الأمامية خلف الباب المستهدف مباشرة. ما هو التعديل التكتيكي السليم للخطة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'وجود أطفال في مسار الاقتحام يغير معادلة الخطورة جذرياً؛ يجب تجميد الاقتحام العنيف الفوري وإعادة تموضع القوة لمحاصرة المنافذ واللجوء لخطة بديلة (استدراج المشتبه فيه للخارج أو تأمين الأطفال أولاً).',
      CompetencesAssociees = N'["التخطيط التكتيكي الديناميكي","تجنب الأضرار الجانبية للمدنيين"]',
      SpecialitesAssociees = N'["SPEC-GSI","SPEC-PSIG","SPEC-PJ"]',
      OrdreAffichage = 61,
      EstActive = 1
  WHERE QuestionId = 61 OR Code = 'Q-RES-061';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    61, 1, 4, 'Q-RES-061', N'أثناء تنفيذ عملية مداهمة لمنزل شخص تاجر مخدرات خطير صدرت بحقه مذكرة بحث، لوحظ عند الاقتراب وجود أطفال صغار يلعبون في الردهة الأمامية خلف الباب المستهدف مباشرة. ما هو التعديل التكتيكي السليم للخطة؟',
    N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'وجود أطفال في مسار الاقتحام يغير معادلة الخطورة جذرياً؛ يجب تجميد الاقتحام العنيف الفوري وإعادة تموضع القوة لمحاصرة المنافذ واللجوء لخطة بديلة (استدراج المشتبه فيه للخارج أو تأمين الأطفال أولاً).', N'["التخطيط التكتيكي الديناميكي","تجنب الأضرار الجانبية للمدنيين"]',
    N'["SPEC-GSI","SPEC-PSIG","SPEC-PJ"]', 61, 1, 0, 1
  );
END;

-- Options de la question 61
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 61;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (611, 61, 'A', N'المضي في الاقتحام بالقنابل الصوتية دون اعتبار لوجود الأطفال', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (612, 61, 'B', N'تكييف الخطة فوراً وتجميد الاقتحام الحركي المفاجئ لتفادي إصابة الأطفال، وإحكام الطوق حتى تحييد التهديد دون تعريضهم للخطر', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (613, 61, 'C', N'إطلاق النار في الهواء لإخافة الأطفال وجعلهم يركضون', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (614, 61, 'D', N'إلغاء القضية نهائياً وشطب اسم المشتبه به من سجلات الملاحقة', 0);

-- Question 62: Q-RES-062 (RESOLUTION_PROBLEMES)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 62 OR Code = 'Q-RES-062')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 4,
      Code = 'Q-RES-062',
      Enonce = N'عند تحرير محضر ضبط، تكتشف أن زميلاً لك في الدورية أخطأ ودون تاريخ ارتكاب المخالفة بالسنة الماضية سهواً بدلاً من السنة الحالية. هل تصحح الخطأ المادي فوراً قبل التوقيع والإحالة أم ترسل المحضر كما هو؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الخطأ في تاريخ ارتكاب الفعل يعرض المحضر للبطلان الشكلي أمام هيئة المحكمة؛ تصحيح الخطأ المادي في حينه وبشكل قانوني قبل توقيع الأطراف وإرساله للنيابة العامة واجب مهني حتمي.',
      CompetencesAssociees = N'["السلامة المسطرية الإجرائية","تفادي بطلان الإجراءات القضائية"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE","SPEC-SEC-ADMIN"]',
      OrdreAffichage = 62,
      EstActive = 1
  WHERE QuestionId = 62 OR Code = 'Q-RES-062';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    62, 1, 4, 'Q-RES-062', N'عند تحرير محضر ضبط، تكتشف أن زميلاً لك في الدورية أخطأ ودون تاريخ ارتكاب المخالفة بالسنة الماضية سهواً بدلاً من السنة الحالية. هل تصحح الخطأ المادي فوراً قبل التوقيع والإحالة أم ترسل المحضر كما هو؟',
    N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'الخطأ في تاريخ ارتكاب الفعل يعرض المحضر للبطلان الشكلي أمام هيئة المحكمة؛ تصحيح الخطأ المادي في حينه وبشكل قانوني قبل توقيع الأطراف وإرساله للنيابة العامة واجب مهني حتمي.', N'["السلامة المسطرية الإجرائية","تفادي بطلان الإجراءات القضائية"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE","SPEC-SEC-ADMIN"]', 62, 1, 0, 1
  );
END;

-- Options de la question 62
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 62;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (621, 62, 'A', N'إرسال المحضر كما هو لأن القاضي لا يدقق في التواريخ إطلاقاً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (622, 62, 'B', N'تنبيه الزميل وتصحيح الخطأ المادي فوراً قبل توقيع الأطراف وإحالة المحضر تفادياً للبطلان المسطري', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (623, 62, 'C', N'تمزيق المحضر وإخفاء الواقعة بالكامل', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (624, 62, 'D', N'تغيير اسم المتهم ليتطابق مع السنة القديمة', 0);

-- Question 63: Q-RES-063 (RESOLUTION_PROBLEMES)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 63 OR Code = 'Q-RES-063')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 4,
      Code = 'Q-RES-063',
      Enonce = N'وصلتك معلومات تفيد باحتمال تسرب عناصر إجرامية مسلحة عبر مسلك غابوي وعر ليلاً. لديك خياران: نشر دوريات راجلة فردية متباعدة لتغطية أكبر مساحة ممكنة، أو التحرك في تشكيلات ثنائية مسلحة ومتساندة مع تقليص رقعة التغطية. ما هو الخيار التكتيكي الصائب؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'في البيئات الخطرة ليلاً مع احتمال وجود أسلحة، يُحظر العمل الفردي تماماً؛ مبدأ "التساند المتبادل" والأمان الجماعي يفرض التحرك في تشكيلات ثنائية متماسكة قادرة على الرد والحماية المتبادلة.',
      CompetencesAssociees = N'["مبادئ السلامة العملياتية","التساند التكتيكي في الميدان"]',
      SpecialitesAssociees = N'["SPEC-PSIG","SPEC-GSI"]',
      OrdreAffichage = 63,
      EstActive = 1
  WHERE QuestionId = 63 OR Code = 'Q-RES-063';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    63, 1, 4, 'Q-RES-063', N'وصلتك معلومات تفيد باحتمال تسرب عناصر إجرامية مسلحة عبر مسلك غابوي وعر ليلاً. لديك خياران: نشر دوريات راجلة فردية متباعدة لتغطية أكبر مساحة ممكنة، أو التحرك في تشكيلات ثنائية مسلحة ومتساندة مع تقليص رقعة التغطية. ما هو الخيار التكتيكي الصائب؟',
    N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'في البيئات الخطرة ليلاً مع احتمال وجود أسلحة، يُحظر العمل الفردي تماماً؛ مبدأ "التساند المتبادل" والأمان الجماعي يفرض التحرك في تشكيلات ثنائية متماسكة قادرة على الرد والحماية المتبادلة.', N'["مبادئ السلامة العملياتية","التساند التكتيكي في الميدان"]',
    N'["SPEC-PSIG","SPEC-GSI"]', 63, 1, 0, 1
  );
END;

-- Options de la question 63
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 63;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (631, 63, 'A', N'التحرك الفردي لكل عنصر بمفرده لزيادة عدد الكيلومترات المغطاة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (632, 63, 'B', N'التحرك في مجموعات متساندة وثنائية على الأقل لضمان التغطية النارية والحماية المتبادلة وعدم الوقوع في كمين', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (633, 63, 'C', N'إيقاف البحث والذهاب للنوم في سيارة الدورية', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (634, 63, 'D', N'ترك السلاح في السيارة لتسهيل الجري السريع وسط الغابة', 0);

-- Question 64: Q-RES-064 (RESOLUTION_PROBLEMES)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 64 OR Code = 'Q-RES-064')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 4,
      Code = 'Q-RES-064',
      Enonce = N'أثناء مهمة تأمين وحراسة، حاول شخص ذو نفوذ معروف تجاوز الطوق الأمني بالقوة مدعياً معرفته بكبار المسؤولين ومهدداً بنقل عناصر الدورية تأديبياً إذا لم يسمحوا له بالدخول. ما هو الموقف المهني والانضباطي الحاسم؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'تنفيذ الأوامر والتعليمات النظامية الصادرة عن القيادة يسري على الجميع دون استثناء وبأعلى درجات اللباقة والهدوء والحزم، مع عدم الرضوخ للضغوط أو التهديدات وإشعار القائد المسؤول فوراً.',
      CompetencesAssociees = N'["سيادة القانون والمساواة","الثبات الانفعالي وتطبيق التعليمات"]',
      SpecialitesAssociees = N'["SPEC-GEH","SPEC-PSIG","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 64,
      EstActive = 1
  WHERE QuestionId = 64 OR Code = 'Q-RES-064';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    64, 1, 4, 'Q-RES-064', N'أثناء مهمة تأمين وحراسة، حاول شخص ذو نفوذ معروف تجاوز الطوق الأمني بالقوة مدعياً معرفته بكبار المسؤولين ومهدداً بنقل عناصر الدورية تأديبياً إذا لم يسمحوا له بالدخول. ما هو الموقف المهني والانضباطي الحاسم؟',
    N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'تنفيذ الأوامر والتعليمات النظامية الصادرة عن القيادة يسري على الجميع دون استثناء وبأعلى درجات اللباقة والهدوء والحزم، مع عدم الرضوخ للضغوط أو التهديدات وإشعار القائد المسؤول فوراً.', N'["سيادة القانون والمساواة","الثبات الانفعالي وتطبيق التعليمات"]',
    N'["SPEC-GEH","SPEC-PSIG","SPEC-SCIENTIFIQUE"]', 64, 1, 0, 1
  );
END;

-- Options de la question 64
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 64;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (641, 64, 'A', N'السماح له بالمرور فوراً وفتح الطوق له ولأصدقائه خوفاً من التهديد', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (642, 64, 'B', N'التمسك بتطبيق التعليمات العسكرية بصرامة وهدوء ولباقة، ومنعه من الولوج مع إشعار الرئيس المباشر بالواقعة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (643, 64, 'C', N'الرد عليه بالشتم والسب والاشتباك الجسدي غير المبرر معه', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (644, 64, 'D', N'مغادرة نقطة الحراسة وترك المكان دون حراسة لتجنب المشاكل', 0);

-- Question 65: Q-RES-065 (RESOLUTION_PROBLEMES)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 65 OR Code = 'Q-RES-065')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 4,
      Code = 'Q-RES-065',
      Enonce = N'في دورية دراجات نارية تابعة للسلامة الطرقية، صادفتم سائق شاحنة أجنبية لا يتقن العربية أو الفرنسية، وتبين بالفحص التقني أن حمولته من المواد الخطرة القابلة للاشتعال تسيل منها قطرات على الإسفلت. كيف تحل هذه المعضلة فوراً وبطريقة آمنة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'تسرب المواد الخطرة يشكل خطراً كيميائياً وحريقاً داهماً؛ يجب توقيف الشاحنة فوراً في مكان معزول ومفتوح بعيداً عن التجمعات ومصادر الشرار، ضرب طوق أمني مانع للاقتراب، الاستعانة بالرموز البرتقالية الدولية (Code Danger ADR) لتحديد المادة، واستدعاء فرق الوقاية المدنية المتخصصة.',
      CompetencesAssociees = N'["التعامل مع حوادث نقل المواد الخطرة","التواصل الإشاري وإدارة المخاطر الطرقية"]',
      SpecialitesAssociees = N'["SPEC-ROUTE","SPEC-MOTARD","SPEC-PSIG"]',
      OrdreAffichage = 65,
      EstActive = 1
  WHERE QuestionId = 65 OR Code = 'Q-RES-065';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    65, 1, 4, 'Q-RES-065', N'في دورية دراجات نارية تابعة للسلامة الطرقية، صادفتم سائق شاحنة أجنبية لا يتقن العربية أو الفرنسية، وتبين بالفحص التقني أن حمولته من المواد الخطرة القابلة للاشتعال تسيل منها قطرات على الإسفلت. كيف تحل هذه المعضلة فوراً وبطريقة آمنة؟',
    N'سياق مهني عملياتي لتقييم كفاءات حل المشكلات واتخاذ القرار.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'تسرب المواد الخطرة يشكل خطراً كيميائياً وحريقاً داهماً؛ يجب توقيف الشاحنة فوراً في مكان معزول ومفتوح بعيداً عن التجمعات ومصادر الشرار، ضرب طوق أمني مانع للاقتراب، الاستعانة بالرموز البرتقالية الدولية (Code Danger ADR) لتحديد المادة، واستدعاء فرق الوقاية المدنية المتخصصة.', N'["التعامل مع حوادث نقل المواد الخطرة","التواصل الإشاري وإدارة المخاطر الطرقية"]',
    N'["SPEC-ROUTE","SPEC-MOTARD","SPEC-PSIG"]', 65, 1, 0, 1
  );
END;

-- Options de la question 65
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 65;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (651, 65, 'A', N'الطلب منه مواصلة السير بسرعة للوصول لوجهته قبل فراغ الخزان', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (652, 65, 'B', N'توقيف المركبة فوراً في فضاء معزول وآمن، ضرب طوق لمنع أي مصدر اشتعال، قراءة رمز الخطر (ADR) واستدعاء الإطفاء المتخصص فوراً', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (653, 65, 'C', N'إشعال ولاعة بالقرب من التسرب لمعرفة هل المادة تشتعل أم لا', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (654, 65, 'D', N'تغريمه والسماح له بالمرور وسط الأحياء السكنية المكتظة', 0);

-- Question 66: Q-ROU-066 (SECURITE_ROUTIERE_MOTO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 66 OR Code = 'Q-ROU-066')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 5,
      Code = 'Q-ROU-066',
      Enonce = N'في القيادة العملياتية المتقدمة للدراجات النارية العسكرية، ما هي النسبة المثالية لتوزيع قوة الكبح (Freinage) بين العجلة الأمامية والعجلة الخلفية على طريق إسفلتي جاف ومستقيم لتحقيق توقف سريع وآمن؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'عند الكبح، تنتقل الكتلة والوزن نحو الأمام (Transfert de masse)؛ لذا توزع القوة بمقدار حوالي 70% على المكبح الأمامي و30% على المكبح الخلفي لضمان أقصى فعالية دون غلق العجلات.',
      CompetencesAssociees = N'["ديناميكا كبح الدراجات النارية","تقنيات التحكم في التوقف الاستعجالي"]',
      SpecialitesAssociees = N'["SPEC-MOTARD","SPEC-ROUTE","SPEC-GEH"]',
      OrdreAffichage = 66,
      EstActive = 1
  WHERE QuestionId = 66 OR Code = 'Q-ROU-066';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    66, 1, 5, 'Q-ROU-066', N'في القيادة العملياتية المتقدمة للدراجات النارية العسكرية، ما هي النسبة المثالية لتوزيع قوة الكبح (Freinage) بين العجلة الأمامية والعجلة الخلفية على طريق إسفلتي جاف ومستقيم لتحقيق توقف سريع وآمن؟',
    N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'عند الكبح، تنتقل الكتلة والوزن نحو الأمام (Transfert de masse)؛ لذا توزع القوة بمقدار حوالي 70% على المكبح الأمامي و30% على المكبح الخلفي لضمان أقصى فعالية دون غلق العجلات.', N'["ديناميكا كبح الدراجات النارية","تقنيات التحكم في التوقف الاستعجالي"]',
    N'["SPEC-MOTARD","SPEC-ROUTE","SPEC-GEH"]', 66, 1, 0, 1
  );
END;

-- Options de la question 66
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 66;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (661, 66, 'A', N'100% على المكبح الخلفي فقط وعدم لمس الأمامي نهائياً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (662, 66, 'B', N'حوالي 70% على المكبح الأمامي و30% على المكبح الخلفي بتدرج وتوازن', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (663, 66, 'C', N'50% باستخدام الأقدام على الأرض مباشرة دون مكابح', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (664, 66, 'D', N'الاعتماد على المكبح اليدوي للأضواء فقط', 0);

-- Question 67: Q-ROU-067 (SECURITE_ROUTIERE_MOTO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 67 OR Code = 'Q-ROU-067')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 5,
      Code = 'Q-ROU-067',
      Enonce = N'ما هو المفهوم الفيزيائي لتقنية "التوجيه العكسي" (Contre-braquage / Counter-steering) المعتمدة إلزامياً لقيادة الدراجات النارية الثقيلة عند سرعة تتجاوز 35 كم/س للميلان السريع في المنعطفات؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'التوجيه العكسي هو دفع مقود الدراجة للأمام في جهة الانعطاف المرغوب (دفع المقبض الأيمن للانعطاف يميناً)، مما يخل بتوازن العجلة الأمامية جيروسكوبياً ويميل الدراجة فوراً وسلساً نحو المنعطف.',
      CompetencesAssociees = N'["فيزياء التحكم بالدراجات النارية","المناورة التكتيكية في المنعطفات"]',
      SpecialitesAssociees = N'["SPEC-MOTARD","SPEC-ROUTE","SPEC-GEH"]',
      OrdreAffichage = 67,
      EstActive = 1
  WHERE QuestionId = 67 OR Code = 'Q-ROU-067';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    67, 1, 5, 'Q-ROU-067', N'ما هو المفهوم الفيزيائي لتقنية "التوجيه العكسي" (Contre-braquage / Counter-steering) المعتمدة إلزامياً لقيادة الدراجات النارية الثقيلة عند سرعة تتجاوز 35 كم/س للميلان السريع في المنعطفات؟',
    N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'التوجيه العكسي هو دفع مقود الدراجة للأمام في جهة الانعطاف المرغوب (دفع المقبض الأيمن للانعطاف يميناً)، مما يخل بتوازن العجلة الأمامية جيروسكوبياً ويميل الدراجة فوراً وسلساً نحو المنعطف.', N'["فيزياء التحكم بالدراجات النارية","المناورة التكتيكية في المنعطفات"]',
    N'["SPEC-MOTARD","SPEC-ROUTE","SPEC-GEH"]', 67, 1, 0, 1
  );
END;

-- Options de la question 67
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 67;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (671, 67, 'A', N'إدارة المقود بزاوية 90 درجة عكس اتجاه الطريق لإيقاف المحرك', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (672, 67, 'B', N'الضغط الخفيف على المقبض في نفس اتجاه الميلان المرغوب لإمالة الدراجة بسلاسة ودقة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (673, 67, 'C', N'النزول من الدراجة وجرها باليد في المنعطف الحاد', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (674, 67, 'D', N'استخدام الدواسة الخلفية فقط للدوران للخلف', 0);

-- Question 68: Q-ROU-068 (SECURITE_ROUTIERE_MOTO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 68 OR Code = 'Q-ROU-068')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 5,
      Code = 'Q-ROU-068',
      Enonce = N'خلال مراقبة شاحنة نقل للبضائع، يفحص دركي السلامة الطرقية أسطوانة أو بطاقة جهاز تسجيل السرعة وزمن القيادة (Chrono-tachygraphe). ما هو الحد الأقصى القياسي لساعات السياقة المتواصلة المسموح به قانوناً قبل وجوب أخذ فترة راحة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'وفق مدونة السير والأنظمة المنظمة للنقل المهني، لا يجوز للسائق المهني قيادة المركبة لأكثر من 4 ساعات ونصف متواصلة دون الاستفادة من فترة استراحة لا تقل عن 45 دقيقة (أو مجزأة).',
      CompetencesAssociees = N'["مراقبة النقل الطرقي المهني","تطبيق مدونة السير والتنظيمات"]',
      SpecialitesAssociees = N'["SPEC-ROUTE","SPEC-MOTARD","SPEC-PJ"]',
      OrdreAffichage = 68,
      EstActive = 1
  WHERE QuestionId = 68 OR Code = 'Q-ROU-068';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    68, 1, 5, 'Q-ROU-068', N'خلال مراقبة شاحنة نقل للبضائع، يفحص دركي السلامة الطرقية أسطوانة أو بطاقة جهاز تسجيل السرعة وزمن القيادة (Chrono-tachygraphe). ما هو الحد الأقصى القياسي لساعات السياقة المتواصلة المسموح به قانوناً قبل وجوب أخذ فترة راحة؟',
    N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'وفق مدونة السير والأنظمة المنظمة للنقل المهني، لا يجوز للسائق المهني قيادة المركبة لأكثر من 4 ساعات ونصف متواصلة دون الاستفادة من فترة استراحة لا تقل عن 45 دقيقة (أو مجزأة).', N'["مراقبة النقل الطرقي المهني","تطبيق مدونة السير والتنظيمات"]',
    N'["SPEC-ROUTE","SPEC-MOTARD","SPEC-PJ"]', 68, 1, 0, 1
  );
END;

-- Options de la question 68
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 68;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (681, 68, 'A', N'ساعتان فقط مهما كانت المسافة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (682, 68, 'B', N'4 ساعات ونصف من السياقة المتواصلة كحد أقصى قبل الاستراحة القانونية الإلزامية', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (683, 68, 'C', N'12 ساعة متواصلة ليلاً فقط', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (684, 68, 'D', N'لا يوجد أي حد زمني ما دام السائق يشرب القهوة', 0);

-- Question 69: Q-ROU-069 (SECURITE_ROUTIERE_MOTO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 69 OR Code = 'Q-ROU-069')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 5,
      Code = 'Q-ROU-069',
      Enonce = N'في تشكيل خفر المواكب الرسمية بالدراجات النارية (Escorte officielle)، ما هو التشكيل الهندسي النموذجي المعتمد لفتح الطريق وتوفير الحماية الميدانية الأمامية لسيارة الشخصية المحمية؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'تشكيل رأس السهم أو المثلث (Formation en V أو en flèche) هو التشكيل التكتيكي المعتمد عالمياً؛ حيث يؤمن فتح المسار، إبعاد حركة المرور الجانبية، وحماية زوايا الصدم الأمامية.',
      CompetencesAssociees = N'["التشكيلات التكتيكية للمواكب","بروتوكولات الحماية بالدراجات النارية"]',
      SpecialitesAssociees = N'["SPEC-GEH","SPEC-MOTARD","SPEC-ROUTE"]',
      OrdreAffichage = 69,
      EstActive = 1
  WHERE QuestionId = 69 OR Code = 'Q-ROU-069';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    69, 1, 5, 'Q-ROU-069', N'في تشكيل خفر المواكب الرسمية بالدراجات النارية (Escorte officielle)، ما هو التشكيل الهندسي النموذجي المعتمد لفتح الطريق وتوفير الحماية الميدانية الأمامية لسيارة الشخصية المحمية؟',
    N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'تشكيل رأس السهم أو المثلث (Formation en V أو en flèche) هو التشكيل التكتيكي المعتمد عالمياً؛ حيث يؤمن فتح المسار، إبعاد حركة المرور الجانبية، وحماية زوايا الصدم الأمامية.', N'["التشكيلات التكتيكية للمواكب","بروتوكولات الحماية بالدراجات النارية"]',
    N'["SPEC-GEH","SPEC-MOTARD","SPEC-ROUTE"]', 69, 1, 0, 1
  );
END;

-- Options de la question 69
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 69;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (691, 69, 'A', N'السير في طابور مستقيم متأخر خلف السيارة الرسمية بمسافة كيلومتر', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (692, 69, 'B', N'تشكيل رأس السهم (V / Flèche) الأمامي والجانبي لفتح المسار وتأمين المحاور المتقاطعة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (693, 69, 'C', N'التفرق العشوائي في الشوارع الموازية دون أي تشكيل منظم', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (694, 69, 'D', N'السير فوق أرصفة المشاة فقط لتفادي السيارات', 0);

-- Question 70: Q-ROU-070 (SECURITE_ROUTIERE_MOTO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 70 OR Code = 'Q-ROU-070')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 5,
      Code = 'Q-ROU-070',
      Enonce = N'أثناء القيادة على طريق سريع ممطر، شعرت بفقدان مفاجئ لتجاوب مقود الدراجة وطوفان العجلة مع انعدام السيطرة (Aquaplaning / الانزلاق المائي). ما هو رد الفعل التقني السليم لتجنب السقوط؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'في حالة الانزلاق المائي، يجب عدم الضغط العنيف على الفرامل نهائياً، والحفاظ على استقامة الدراجة وتخفيف مقبض الوقود تدريجياً وبثبات حتى يعود تلامس الإطار مع الإسفلت.',
      CompetencesAssociees = N'["التعامل مع فقدان الالتصاق المائي","التحكم الاحترافي في الدراجات"]',
      SpecialitesAssociees = N'["SPEC-MOTARD","SPEC-ROUTE"]',
      OrdreAffichage = 70,
      EstActive = 1
  WHERE QuestionId = 70 OR Code = 'Q-ROU-070';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    70, 1, 5, 'Q-ROU-070', N'أثناء القيادة على طريق سريع ممطر، شعرت بفقدان مفاجئ لتجاوب مقود الدراجة وطوفان العجلة مع انعدام السيطرة (Aquaplaning / الانزلاق المائي). ما هو رد الفعل التقني السليم لتجنب السقوط؟',
    N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'في حالة الانزلاق المائي، يجب عدم الضغط العنيف على الفرامل نهائياً، والحفاظ على استقامة الدراجة وتخفيف مقبض الوقود تدريجياً وبثبات حتى يعود تلامس الإطار مع الإسفلت.', N'["التعامل مع فقدان الالتصاق المائي","التحكم الاحترافي في الدراجات"]',
    N'["SPEC-MOTARD","SPEC-ROUTE"]', 70, 1, 0, 1
  );
END;

-- Options de la question 70
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 70;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (701, 70, 'A', N'الضغط بكل قوة على الفرامل الأمامية وإمالة الدراجة بشدة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (702, 70, 'B', N'تجنب أي كبح مفاجئ، إبقاء الدراجة في خط مستقيم، والرفع التدريجي لليد عن مقبض السرعة حتى استعادة التماسك', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (703, 70, 'C', N'القفز من فوق الدراجة على الفور لإنقاذ النفس', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (704, 70, 'D', N'إغلاق العينين والانتظار حتى تتوقف الدراجة بمفردها', 0);

-- Question 71: Q-ROU-071 (SECURITE_ROUTIERE_MOTO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 71 OR Code = 'Q-ROU-071')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 5,
      Code = 'Q-ROU-071',
      Enonce = N'عند ضبط سائق يقود تحت تأثير الكحول، ما هو الجهاز المعتمد لإجراء الفحص الإثباتي للكمية الدقيقة لكحول هواء الزفير (Éthylomètre)، وما هو الفرق بينه وبين جهاز الكشف الأولي (Éthylotest)؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'جهاز الإيثيلوتيست (Éthylotest) هو أداة رصد أولية تشير لوجود الكحول من عدمه، بينما الإيثيلومتر (Éthylomètre) هو جهاز قياس قانوني معاير يحدد النسبة الرقمية الدقيقة المعتمدة كدليل إثبات قضائي بالمحضر.',
      CompetencesAssociees = N'["المعاينة الإجرائية لجرائم القيادة في حالة سكر","الاستخدام القانوني لأجهزة الفحص الطرقية"]',
      SpecialitesAssociees = N'["SPEC-ROUTE","SPEC-PJ","SPEC-MOTARD"]',
      OrdreAffichage = 71,
      EstActive = 1
  WHERE QuestionId = 71 OR Code = 'Q-ROU-071';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    71, 1, 5, 'Q-ROU-071', N'عند ضبط سائق يقود تحت تأثير الكحول، ما هو الجهاز المعتمد لإجراء الفحص الإثباتي للكمية الدقيقة لكحول هواء الزفير (Éthylomètre)، وما هو الفرق بينه وبين جهاز الكشف الأولي (Éthylotest)؟',
    N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'جهاز الإيثيلوتيست (Éthylotest) هو أداة رصد أولية تشير لوجود الكحول من عدمه، بينما الإيثيلومتر (Éthylomètre) هو جهاز قياس قانوني معاير يحدد النسبة الرقمية الدقيقة المعتمدة كدليل إثبات قضائي بالمحضر.', N'["المعاينة الإجرائية لجرائم القيادة في حالة سكر","الاستخدام القانوني لأجهزة الفحص الطرقية"]',
    N'["SPEC-ROUTE","SPEC-PJ","SPEC-MOTARD"]', 71, 1, 0, 1
  );
END;

-- Options de la question 71
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 71;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (711, 71, 'A', N'لا يوجد أي فرق وكل الأجهزة مجرد ساعات توقيت عادية', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (712, 71, 'B', N'الإيثيلوتيست للكشف النوعي الأولي، والإيثيلومتر للقياس الكمي المعاير المعتمد قانونياً في المحاضر القضائية', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (713, 71, 'C', N'الجهازان يقيسان فقط نسبة ضغط هواء الإطارات', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (714, 71, 'D', N'الدرك يعتمد على حاسة الشم فقط دون الحاجة لأي جهاز علمي', 0);

-- Question 72: Q-ROU-072 (SECURITE_ROUTIERE_MOTO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 72 OR Code = 'Q-ROU-072')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 5,
      Code = 'Q-ROU-072',
      Enonce = N'على الطريق السيار، ما هي المسافة الزمنية للأمان (Distance de sécurité) التي يجب الحفاظ عليها كحد أدنى بين مركبة الدورية والمركبة التي تسير أمامها في ظروف مناخية عادية؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'القاعدة القياسية للسلامة الطرقية تفرض مسافة زمنية لا تقل عن ثانيتين (2 secondes) بين المركبتين في الأحوال العادية، وتضاعف إلى 4 ثوان على الأقل في حالة المطر أو الضباب والسرعات العالية.',
      CompetencesAssociees = N'["مسافات الأمان الطرقية","الوقاية من حوادث التتابع والاصطدام الخلفي"]',
      SpecialitesAssociees = N'["SPEC-ROUTE","SPEC-MOTARD"]',
      OrdreAffichage = 72,
      EstActive = 1
  WHERE QuestionId = 72 OR Code = 'Q-ROU-072';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    72, 1, 5, 'Q-ROU-072', N'على الطريق السيار، ما هي المسافة الزمنية للأمان (Distance de sécurité) التي يجب الحفاظ عليها كحد أدنى بين مركبة الدورية والمركبة التي تسير أمامها في ظروف مناخية عادية؟',
    N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'القاعدة القياسية للسلامة الطرقية تفرض مسافة زمنية لا تقل عن ثانيتين (2 secondes) بين المركبتين في الأحوال العادية، وتضاعف إلى 4 ثوان على الأقل في حالة المطر أو الضباب والسرعات العالية.', N'["مسافات الأمان الطرقية","الوقاية من حوادث التتابع والاصطدام الخلفي"]',
    N'["SPEC-ROUTE","SPEC-MOTARD"]', 72, 1, 0, 1
  );
END;

-- Options de la question 72
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 72;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (721, 72, 'A', N'نصف ثانية تكفي تماماً عند السرعة العالية', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (722, 72, 'B', N'ثانيتان على الأقل في الظروف العادية، وتضاعف في حالة سوء الأحوال الجوية', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (723, 72, 'C', N'الالتصاق بالمصد الخلفي لإجبار السائق على التوقف', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (724, 72, 'D', N'عشر دقائق مهما كانت سرعة المركبة', 0);

-- Question 73: Q-ROU-073 (SECURITE_ROUTIERE_MOTO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 73 OR Code = 'Q-ROU-073')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 5,
      Code = 'Q-ROU-073',
      Enonce = N'تحمل شاحنة لوحة برتقالية مستطيلة مقسومة لنصفين، في الأعلى الرقم (33) وفي الأسفل الرقم (1203). ماذا يعني الرقم (33) في النظام الدولي لنقل المواد الخطرة (ADR)؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'في ترميز ADR: الرقم العلوي هو رمز الخطر (Danger Code)، وتكرار الرقم 3 (33) يعني سائل شديد الاشتعال (Très inflammable). والرقم السفلي (1203) هو رمز مادة البنزين (Essence/Gasoline).',
      CompetencesAssociees = N'["قراءة رموز المواد الخطرة ADR","التدخل الاستعجالي في حوادث النقل الكيميائي"]',
      SpecialitesAssociees = N'["SPEC-ROUTE","SPEC-MOTARD","SPEC-PJ"]',
      OrdreAffichage = 73,
      EstActive = 1
  WHERE QuestionId = 73 OR Code = 'Q-ROU-073';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    73, 1, 5, 'Q-ROU-073', N'تحمل شاحنة لوحة برتقالية مستطيلة مقسومة لنصفين، في الأعلى الرقم (33) وفي الأسفل الرقم (1203). ماذا يعني الرقم (33) في النظام الدولي لنقل المواد الخطرة (ADR)؟',
    N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'في ترميز ADR: الرقم العلوي هو رمز الخطر (Danger Code)، وتكرار الرقم 3 (33) يعني سائل شديد الاشتعال (Très inflammable). والرقم السفلي (1203) هو رمز مادة البنزين (Essence/Gasoline).', N'["قراءة رموز المواد الخطرة ADR","التدخل الاستعجالي في حوادث النقل الكيميائي"]',
    N'["SPEC-ROUTE","SPEC-MOTARD","SPEC-PJ"]', 73, 1, 0, 1
  );
END;

-- Options de la question 73
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 73;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (731, 73, 'A', N'سرعة الشاحنة القصوى هي 33 كم/س', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (732, 73, 'B', N'سائل شديد الاشتعال (خطر حريق وميضي عالٍ جداً)', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (733, 73, 'C', N'شحنة حليب طازج معقم', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (734, 73, 'D', N'الوزن الصافي للشاحنة هو 33 قنطاراً', 0);

-- Question 74: Q-ROU-074 (SECURITE_ROUTIERE_MOTO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 74 OR Code = 'Q-ROU-074')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 5,
      Code = 'Q-ROU-074',
      Enonce = N'في الفحص الميكانيكي اليومي الإلزامي للدراجة النارية قبل الانطلاق في الخدمة، ما هو العنصر الميكانيكي الذي يؤدي انخفاض ضغطه بأقل من 0.5 بار إلى ثقل خطير في توجيه المقود وعدم استقرار الدراجة في المنعطفات؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'ضغط الهواء في الإطار الأمامي حاسم في دقة التوجيه؛ نقص الضغط يزيد مساحة الاحتكاك ويجعل المقود ثقيلاً جداً، مما يسبب انحراف الدراجة عن مسارها وسقوطها عند الميلان.',
      CompetencesAssociees = N'["الفحص التقني والصيانة الوقائية للدراجات","أمان القيادة الميكانيكية"]',
      SpecialitesAssociees = N'["SPEC-MOTARD","SPEC-ROUTE","SPEC-GEH"]',
      OrdreAffichage = 74,
      EstActive = 1
  WHERE QuestionId = 74 OR Code = 'Q-ROU-074';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    74, 1, 5, 'Q-ROU-074', N'في الفحص الميكانيكي اليومي الإلزامي للدراجة النارية قبل الانطلاق في الخدمة، ما هو العنصر الميكانيكي الذي يؤدي انخفاض ضغطه بأقل من 0.5 بار إلى ثقل خطير في توجيه المقود وعدم استقرار الدراجة في المنعطفات؟',
    N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'ضغط الهواء في الإطار الأمامي حاسم في دقة التوجيه؛ نقص الضغط يزيد مساحة الاحتكاك ويجعل المقود ثقيلاً جداً، مما يسبب انحراف الدراجة عن مسارها وسقوطها عند الميلان.', N'["الفحص التقني والصيانة الوقائية للدراجات","أمان القيادة الميكانيكية"]',
    N'["SPEC-MOTARD","SPEC-ROUTE","SPEC-GEH"]', 74, 1, 0, 1
  );
END;

-- Options de la question 74
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 74;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (741, 74, 'A', N'ضغط علبة التروس الأوتوماتيكية', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (742, 74, 'B', N'ضغط الهواء في الإطار الأمامي للدراجة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (743, 74, 'C', N'ضغط البطارية الكهربائية', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (744, 74, 'D', N'ضغط مصباح الإشارة الجانبي', 0);

-- Question 75: Q-ROU-075 (SECURITE_ROUTIERE_MOTO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 75 OR Code = 'Q-ROU-075')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 5,
      Code = 'Q-ROU-075',
      Enonce = N'عند تأمين ملتقى طرق معقد أثناء مرور موكب رسمي مستعجل، ما هي الإشارة والإجراءات التي يقوم بها الدراج المكلف بتجميد حركة السير (Jalonneur) لضمان حماية الموكب ومنع أي اختراق؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'يقوم الدراج بوضع دراجته كحاجز بصري آمن، ويقف بوضعية حازمة رافعاً يده بإشارة التوقف المطلق مع تشغيل الأضواء التحذيرية واستخدام الصافرة النظامية لتنبيه كافة مستعملي الطريق بوقف كامل للحركة.',
      CompetencesAssociees = N'["تأمين التقاطعات الحيوية","إشارات تنظيم المرور العسكري"]',
      SpecialitesAssociees = N'["SPEC-GEH","SPEC-MOTARD","SPEC-ROUTE"]',
      OrdreAffichage = 75,
      EstActive = 1
  WHERE QuestionId = 75 OR Code = 'Q-ROU-075';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    75, 1, 5, 'Q-ROU-075', N'عند تأمين ملتقى طرق معقد أثناء مرور موكب رسمي مستعجل، ما هي الإشارة والإجراءات التي يقوم بها الدراج المكلف بتجميد حركة السير (Jalonneur) لضمان حماية الموكب ومنع أي اختراق؟',
    N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'يقوم الدراج بوضع دراجته كحاجز بصري آمن، ويقف بوضعية حازمة رافعاً يده بإشارة التوقف المطلق مع تشغيل الأضواء التحذيرية واستخدام الصافرة النظامية لتنبيه كافة مستعملي الطريق بوقف كامل للحركة.', N'["تأمين التقاطعات الحيوية","إشارات تنظيم المرور العسكري"]',
    N'["SPEC-GEH","SPEC-MOTARD","SPEC-ROUTE"]', 75, 1, 0, 1
  );
END;

-- Options de la question 75
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 75;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (751, 75, 'A', N'الاختباء خلف الأشجار حتى يمر الموكب دون لفت الانتباه', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (752, 75, 'B', N'التمركز الحازم في زاوية الرؤية، رفع الذراع بإشارة الوقوف الإلزامي وتشغيل المنبهات الضوئية والصافرة لفرض التوقف التام للمركبات المتقاطعة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (753, 75, 'C', N'دعوة جميع السيارات للمرور بسرعة قبل وصول الموكب', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (754, 75, 'D', N'إطفاء جميع أضواء الدراجة والوقوف على الرصيف', 0);

-- Question 76: Q-ROU-076 (SECURITE_ROUTIERE_MOTO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 76 OR Code = 'Q-ROU-076')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 5,
      Code = 'Q-ROU-076',
      Enonce = N'أثناء قيادة الدراجة النارية ليلاً خارج المدار الحضري، ظهر فجأة حيوان بري (خنزير أو كلب ضال) يقطع الطريق على مسافة 25 متراً وسرعة الدراجة 70 كم/س. ما هو الإجراء التكتيكي السليم لتفادي الصدم العنيف؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'التصرف السليم هو الكبح القوي المتدرج بالدراجة وهي في وضع مستقيم تماماً لتخفيض أكبر قدر من السرعة، والنظر إلى المنفذ أو المسار الفارغ لتجاوز العائق (Evitement) وليس التحديق في الحيوان لأن الدراجة تذهب دائماً حيث تنظر العين.',
      CompetencesAssociees = N'["المناورات الاستعجالية لتفادي العوائق","التحكم الحركي تحت المفاجأة"]',
      SpecialitesAssociees = N'["SPEC-MOTARD","SPEC-ROUTE"]',
      OrdreAffichage = 76,
      EstActive = 1
  WHERE QuestionId = 76 OR Code = 'Q-ROU-076';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    76, 1, 5, 'Q-ROU-076', N'أثناء قيادة الدراجة النارية ليلاً خارج المدار الحضري، ظهر فجأة حيوان بري (خنزير أو كلب ضال) يقطع الطريق على مسافة 25 متراً وسرعة الدراجة 70 كم/س. ما هو الإجراء التكتيكي السليم لتفادي الصدم العنيف؟',
    N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'التصرف السليم هو الكبح القوي المتدرج بالدراجة وهي في وضع مستقيم تماماً لتخفيض أكبر قدر من السرعة، والنظر إلى المنفذ أو المسار الفارغ لتجاوز العائق (Evitement) وليس التحديق في الحيوان لأن الدراجة تذهب دائماً حيث تنظر العين.', N'["المناورات الاستعجالية لتفادي العوائق","التحكم الحركي تحت المفاجأة"]',
    N'["SPEC-MOTARD","SPEC-ROUTE"]', 76, 1, 0, 1
  );
END;

-- Options de la question 76
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 76;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (761, 76, 'A', N'التحديق في عيني الحيوان والضغط العنيف على المقود لإسقاط الدراجة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (762, 76, 'B', N'الكبح الحازم في خط مستقيم، وتوجيه النظر نحو المسار البديل الآمن لتنفيذ مناورة التملص دون إقفال العجلات', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (763, 76, 'C', N'إطلاق النار فوراً على الحيوان أثناء القيادة بسرعة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (764, 76, 'D', N'رفع اليدين عن المقود والقفز في الهواء', 0);

-- Question 77: Q-ROU-077 (SECURITE_ROUTIERE_MOTO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 77 OR Code = 'Q-ROU-077')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 5,
      Code = 'Q-ROU-077',
      Enonce = N'ما هو الحد القانوني لعمق الأخاديد الرئيسية (Profondeur des sculptures) لإطارات السيارات والدراجات النارية الذي يعتبر النزول تحته مخالفة مرورية تستوجب توقيف المركبة لخطورتها على السلامة العامة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'المعيار القانوني الأدنى لعمق نقوش الإطارات هو 1.6 ملم (1.6 mm) للسيارات؛ وتآكلها إلى مؤشر التآكل يقلل طرد المياه ويزيد خطر الانفجار والانزلاق الحاد.',
      CompetencesAssociees = N'["المراقبة التقنية لمركبات السير","معايير سلامة الإطارات المطاطية"]',
      SpecialitesAssociees = N'["SPEC-ROUTE","SPEC-MOTARD"]',
      OrdreAffichage = 77,
      EstActive = 1
  WHERE QuestionId = 77 OR Code = 'Q-ROU-077';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    77, 1, 5, 'Q-ROU-077', N'ما هو الحد القانوني لعمق الأخاديد الرئيسية (Profondeur des sculptures) لإطارات السيارات والدراجات النارية الذي يعتبر النزول تحته مخالفة مرورية تستوجب توقيف المركبة لخطورتها على السلامة العامة؟',
    N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'المعيار القانوني الأدنى لعمق نقوش الإطارات هو 1.6 ملم (1.6 mm) للسيارات؛ وتآكلها إلى مؤشر التآكل يقلل طرد المياه ويزيد خطر الانفجار والانزلاق الحاد.', N'["المراقبة التقنية لمركبات السير","معايير سلامة الإطارات المطاطية"]',
    N'["SPEC-ROUTE","SPEC-MOTARD"]', 77, 1, 0, 1
  );
END;

-- Options de la question 77
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 77;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (771, 77, 'A', N'0.1 ملم فقط', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (772, 77, 'B', N'1.6 ملم كحد أدنى قانوني عبر كامل محيط الإطار', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (773, 77, 'C', N'10 سنتيمترات', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (774, 77, 'D', N'يمكن أن يكون الإطار أملساً تماماً كالمرآة دون أي خطر', 0);

-- Question 78: Q-ROU-078 (SECURITE_ROUTIERE_MOTO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 78 OR Code = 'Q-ROU-078')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 5,
      Code = 'Q-ROU-078',
      Enonce = N'في قيادة الدراجات ضمن صف جماعي عسكري (Roulage en groupe)، لماذا يُعتمد إلزامياً أسلوب "التشكيل المتدرج المتخالف" (En quinconce) أثناء السير على الطرق المستقيمة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'السير بشكل متخالف (واحدة يميناً والأخرى يساراً) يوفر لكل دراج مسافة كبح آمنة ومجال رؤية واسعاً ومساحة مناورة حرة للتفادي دون الاصطدام بزميله في حال التوقف المفاجئ.',
      CompetencesAssociees = N'["تكتيكات السير الجماعي بالدراجات","توفير مجالات الأمان والمناورة"]',
      SpecialitesAssociees = N'["SPEC-MOTARD","SPEC-GEH","SPEC-ROUTE"]',
      OrdreAffichage = 78,
      EstActive = 1
  WHERE QuestionId = 78 OR Code = 'Q-ROU-078';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    78, 1, 5, 'Q-ROU-078', N'في قيادة الدراجات ضمن صف جماعي عسكري (Roulage en groupe)، لماذا يُعتمد إلزامياً أسلوب "التشكيل المتدرج المتخالف" (En quinconce) أثناء السير على الطرق المستقيمة؟',
    N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'السير بشكل متخالف (واحدة يميناً والأخرى يساراً) يوفر لكل دراج مسافة كبح آمنة ومجال رؤية واسعاً ومساحة مناورة حرة للتفادي دون الاصطدام بزميله في حال التوقف المفاجئ.', N'["تكتيكات السير الجماعي بالدراجات","توفير مجالات الأمان والمناورة"]',
    N'["SPEC-MOTARD","SPEC-GEH","SPEC-ROUTE"]', 78, 1, 0, 1
  );
END;

-- Options de la question 78
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 78;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (781, 78, 'A', N'لإغلاق الطريق تماماً ومنع أي مركبة أخرى من السفر', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (782, 78, 'B', N'لمنح كل دراج مسافة أمان مضاعفة ومجال رؤية أمامي ومساحة تملص استعجالية كافية', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (783, 78, 'C', N'لتبادل الحديث بسهولة بين الدراجين أثناء السير بسرعة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (784, 78, 'D', N'لتشجيع السباقات التنافسية بين عناصر الدورية', 0);

-- Question 79: Q-ROU-079 (SECURITE_ROUTIERE_MOTO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 79 OR Code = 'Q-ROU-079')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 5,
      Code = 'Q-ROU-079',
      Enonce = N'ما هو الترتيب الصحيح للأولويات عند تقاطع طرق يحتوي على: ضابط درك يوجه المرور بيديه، إشارة ضوئية خضراء، وعلامة "قف" (STOP) مثبتة على العمود؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'حسب هرمية قواعد السير: إشارات وأوامر أعوان المرور والدرك تعلو وتلغي الإشارات الضوئية والعلامات العمودية والأفقية وقواعد الأسبقية العامة.',
      CompetencesAssociees = N'["هرمية إشارات المرور","سلطة أعوان المرور المنظمين للسير"]',
      SpecialitesAssociees = N'["SPEC-ROUTE","SPEC-MOTARD","SPEC-PJ"]',
      OrdreAffichage = 79,
      EstActive = 1
  WHERE QuestionId = 79 OR Code = 'Q-ROU-079';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    79, 1, 5, 'Q-ROU-079', N'ما هو الترتيب الصحيح للأولويات عند تقاطع طرق يحتوي على: ضابط درك يوجه المرور بيديه، إشارة ضوئية خضراء، وعلامة "قف" (STOP) مثبتة على العمود؟',
    N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'حسب هرمية قواعد السير: إشارات وأوامر أعوان المرور والدرك تعلو وتلغي الإشارات الضوئية والعلامات العمودية والأفقية وقواعد الأسبقية العامة.', N'["هرمية إشارات المرور","سلطة أعوان المرور المنظمين للسير"]',
    N'["SPEC-ROUTE","SPEC-MOTARD","SPEC-PJ"]', 79, 1, 0, 1
  );
END;

-- Options de la question 79
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 79;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (791, 79, 'A', N'تطبيق علامة قف أولاً وتجاهل إشارات الضابط تماماً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (792, 79, 'B', N'إشارات وأوامر عون المرور/الدركي تسود وتلغي الإشارات الضوئية والتشوير الطرقي', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (793, 79, 'C', N'اتباع الضوء الأخضر فقط مهما كانت إشارة الدركي', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (794, 79, 'D', N'إعطاء الأسبقية للأكبر حجماً بين المركبات', 0);

-- Question 80: Q-ROU-080 (SECURITE_ROUTIERE_MOTO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 80 OR Code = 'Q-ROU-080')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 5,
      Code = 'Q-ROU-080',
      Enonce = N'عند مرافقة شحنة من المتفجرات المدنية المنقولة نحو مقلع أحجار، ما هي المسافة الفاصلة والاحتياطات الخاصة التي تفرضها الدورية المرافقة لحماية القافلة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'مرافقة المتفجرات تتطلب منع التدخين نهائياً، تثبيت مسافة أمان عازلة لا تقل عن 50 إلى 100 متر بين مركبات المرافقة والشاحنة، حظر العبور في أوقات الذروة والمناطق الحضرية إلا بمسار مرخص، والتأكد من مطابقة وسائل الإطفاء ومفاتيح عزل الكهرباء.',
      CompetencesAssociees = N'["مرافقة المواد المتفجرة والحساسة","إجراءات السلامة الأمنية الصارمة"]',
      SpecialitesAssociees = N'["SPEC-ROUTE","SPEC-PSIG","SPEC-MOTARD"]',
      OrdreAffichage = 80,
      EstActive = 1
  WHERE QuestionId = 80 OR Code = 'Q-ROU-080';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    80, 1, 5, 'Q-ROU-080', N'عند مرافقة شحنة من المتفجرات المدنية المنقولة نحو مقلع أحجار، ما هي المسافة الفاصلة والاحتياطات الخاصة التي تفرضها الدورية المرافقة لحماية القافلة؟',
    N'سياق مهني عملياتي لتقييم كفاءات السلامة الطرقية وقيادة الدراجات.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'مرافقة المتفجرات تتطلب منع التدخين نهائياً، تثبيت مسافة أمان عازلة لا تقل عن 50 إلى 100 متر بين مركبات المرافقة والشاحنة، حظر العبور في أوقات الذروة والمناطق الحضرية إلا بمسار مرخص، والتأكد من مطابقة وسائل الإطفاء ومفاتيح عزل الكهرباء.', N'["مرافقة المواد المتفجرة والحساسة","إجراءات السلامة الأمنية الصارمة"]',
    N'["SPEC-ROUTE","SPEC-PSIG","SPEC-MOTARD"]', 80, 1, 0, 1
  );
END;

-- Options de la question 80
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 80;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (801, 80, 'A', N'السماح للسيارات المدنية بالسير بين شاحنة المتفجرات ودورية الدرك', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (802, 80, 'B', N'تأمين مسافة أمان عازلة ومنع التجاوز نهائياً والتأكد من جاهزية أجهزة الإطفاء وعزل التيارات الكهربائية والالتزام بالمسار المرخص', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (803, 80, 'C', N'التوقف في محطة وقود لشرب الشاي وترك الشاحنة بدون حراسة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (804, 80, 'D', N'نقل المتفجرات في صناديق مفتوحة ومعرضة للشمس المباشرة', 0);

-- Question 81: Q-PJ-081 (POLICE_JUDICIAIRE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 81 OR Code = 'Q-PJ-081')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 6,
      Code = 'Q-PJ-081',
      Enonce = N'وفقاً لقانون المسطرة الجنائية، متى تعتبر الجريمة متلبساً بها (Infraction flagrante) بصفة قطعية تخول لضابط الشرطة القضائية صلاحيات استثنائية فورية؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'تعتبر الجريمة متلبساً بها قانوناً إذا كانت ترتكب حالاً، أو في وقت قريب جداً من ارتكابها، أو إذا تبع الجاني صياح الجمهور، أو إذا وجد بعد وقوعها بوقت يسير حاملاً لأسلحة أو أشياء تدل على تورطه.',
      CompetencesAssociees = N'["تحديد شروط حالة التلبس","الإطار القانوني لصلاحيات الشرطة القضائية"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE","SPEC-PSIG"]',
      OrdreAffichage = 81,
      EstActive = 1
  WHERE QuestionId = 81 OR Code = 'Q-PJ-081';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    81, 1, 6, 'Q-PJ-081', N'وفقاً لقانون المسطرة الجنائية، متى تعتبر الجريمة متلبساً بها (Infraction flagrante) بصفة قطعية تخول لضابط الشرطة القضائية صلاحيات استثنائية فورية؟',
    N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'تعتبر الجريمة متلبساً بها قانوناً إذا كانت ترتكب حالاً، أو في وقت قريب جداً من ارتكابها، أو إذا تبع الجاني صياح الجمهور، أو إذا وجد بعد وقوعها بوقت يسير حاملاً لأسلحة أو أشياء تدل على تورطه.', N'["تحديد شروط حالة التلبس","الإطار القانوني لصلاحيات الشرطة القضائية"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE","SPEC-PSIG"]', 81, 1, 0, 1
  );
END;

-- Options de la question 81
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 81;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (811, 81, 'A', N'إذا وقعت الجريمة منذ شهرين دون علم أحد', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (812, 81, 'B', N'إذا كانت الجريمة ترتكب حالاً، أو كان الفاعل مطارداً بصياح الجمهور إثر ارتكابها مباشرة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (813, 81, 'C', N'إذا وردت إشاعة في مقهى عن احتمال وقوع سرقة الأسبوع القادم', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (814, 81, 'D', N'فقط إذا اعترف الفاعل تلقائياً دون وجود أي أثر مادي', 0);

-- Question 82: Q-PJ-082 (POLICE_JUDICIAIRE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 82 OR Code = 'Q-PJ-082')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 6,
      Code = 'Q-PJ-082',
      Enonce = N'ما هو الإجراء العملياتي الأول الذي يتعين على أول دورية درك ملكي تصل إلى مسرح جريمة قتل غامضة القيام به قبل وصول فرقة الشرطة التقنية والعلمية وضابط التحقيق؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الإجراء الأول الحاسم هو "تجميد مسرح الجريمة" (Gel des lieux)، بإقامة طوق أمني مانع للدخول، منع ملامسة أو تغيير أي أثر أو شيء، إبعاد الفضوليين، والحفاظ على المكان بحالته الراهنة تماماً.',
      CompetencesAssociees = N'["تجميد مسرح الجريمة (Gel des lieux)","حماية الآثار والأدلة المادية"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE","SPEC-PSIG"]',
      OrdreAffichage = 82,
      EstActive = 1
  WHERE QuestionId = 82 OR Code = 'Q-PJ-082';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    82, 1, 6, 'Q-PJ-082', N'ما هو الإجراء العملياتي الأول الذي يتعين على أول دورية درك ملكي تصل إلى مسرح جريمة قتل غامضة القيام به قبل وصول فرقة الشرطة التقنية والعلمية وضابط التحقيق؟',
    N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'الإجراء الأول الحاسم هو "تجميد مسرح الجريمة" (Gel des lieux)، بإقامة طوق أمني مانع للدخول، منع ملامسة أو تغيير أي أثر أو شيء، إبعاد الفضوليين، والحفاظ على المكان بحالته الراهنة تماماً.', N'["تجميد مسرح الجريمة (Gel des lieux)","حماية الآثار والأدلة المادية"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE","SPEC-PSIG"]', 82, 1, 0, 1
  );
END;

-- Options de la question 82
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 82;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (821, 82, 'A', N'تنظيف الأرضية وجمع الأشياء المبعثرة في أكياس قمامة لترتيب الغرفة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (822, 82, 'B', N'تجميد مسرح الجريمة بضرب طوق أمني صارم ومنع ولوج أي شخص غير مختص والحفاظ على الآثار بحالتها', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (823, 82, 'C', N'تفتيش جيوب جثة الضحية وتجريدها من ملابسها فحصاً للبصمات', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (824, 82, 'D', N'دعوة أفراد عائلة الضحية للدخول للتعرف عليها فوراً', 0);

-- Question 83: Q-PJ-083 (POLICE_JUDICIAIRE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 83 OR Code = 'Q-PJ-083')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 6,
      Code = 'Q-PJ-083',
      Enonce = N'ما هو الميقات القانوني المسموح به لإجراء تفتيش المنازل في إطار البحث التمهيدي العادي، وفقاً للضوابط الإجرائية للمسطرة الجنائية؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'لا يمكن الشروع في تفتيش المنازل إلا بين الساعة السادسة صباحاً (06:00) والتاسعة ليلاً (21:00)، ما عدا الاستثناءات المنصوص عليها حصراً في القانون (طلب صاحب المنزل، نداء استغاثة من الداخل، أو في جرائم الإرهاب والمخدرات بشروطها الخاصة).',
      CompetencesAssociees = N'["ضوابط تفتيش المنازل وحرمة المسكن","المشروعية الإجرائية"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 83,
      EstActive = 1
  WHERE QuestionId = 83 OR Code = 'Q-PJ-083';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    83, 1, 6, 'Q-PJ-083', N'ما هو الميقات القانوني المسموح به لإجراء تفتيش المنازل في إطار البحث التمهيدي العادي، وفقاً للضوابط الإجرائية للمسطرة الجنائية؟',
    N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'لا يمكن الشروع في تفتيش المنازل إلا بين الساعة السادسة صباحاً (06:00) والتاسعة ليلاً (21:00)، ما عدا الاستثناءات المنصوص عليها حصراً في القانون (طلب صاحب المنزل، نداء استغاثة من الداخل، أو في جرائم الإرهاب والمخدرات بشروطها الخاصة).', N'["ضوابط تفتيش المنازل وحرمة المسكن","المشروعية الإجرائية"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]', 83, 1, 0, 1
  );
END;

-- Options de la question 83
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 83;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (831, 83, 'A', N'في أي وقت من الليل أو النهار دون أي قيد زمني', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (832, 83, 'B', N'بين الساعة السادسة صباحاً (06:00) والتاسعة ليلاً (21:00) كأصل عام لصحة الإجراء', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (833, 83, 'C', N'بين الساعة الواحدة بعد الظهر والثانية بعد الظهر فقط', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (834, 83, 'D', N'فقط في أيام العطل الأسبوعية والأعياد الوطنية', 0);

-- Question 84: Q-PJ-084 (POLICE_JUDICIAIRE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 84 OR Code = 'Q-PJ-084')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 6,
      Code = 'Q-PJ-084',
      Enonce = N'ما هي المدة القانونية الأصلية للحراسة النظرية (Garde à vue) في الجنايات والجنح العادية المعاقب عليها بالحبس، والتي يحق لضابط الشرطة القضائية إبقاء المشتبه فيه رهن إشارته بموجبها قبل طلب التمديد؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'المدة الأصلية للحراسة النظرية في الجرائم العادية هي 48 ساعة، ويمكن تمديدها لمدة 24 ساعة إضافية بإذن كتابي معلل من النيابة العامة المختصة.',
      CompetencesAssociees = N'["تدبير الحراسة النظرية وحماية الحقوق والحريات","الآجال القانونية للتحقيق"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 84,
      EstActive = 1
  WHERE QuestionId = 84 OR Code = 'Q-PJ-084';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    84, 1, 6, 'Q-PJ-084', N'ما هي المدة القانونية الأصلية للحراسة النظرية (Garde à vue) في الجنايات والجنح العادية المعاقب عليها بالحبس، والتي يحق لضابط الشرطة القضائية إبقاء المشتبه فيه رهن إشارته بموجبها قبل طلب التمديد؟',
    N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'المدة الأصلية للحراسة النظرية في الجرائم العادية هي 48 ساعة، ويمكن تمديدها لمدة 24 ساعة إضافية بإذن كتابي معلل من النيابة العامة المختصة.', N'["تدبير الحراسة النظرية وحماية الحقوق والحريات","الآجال القانونية للتحقيق"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]', 84, 1, 0, 1
  );
END;

-- Options de la question 84
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 84;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (841, 84, 'A', N'12 ساعة فقط غير قابلة للتمديد', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (842, 84, 'B', N'48 ساعة تحتسب من ساعة توقيفه، مع إمكانية التمديد لـ 24 ساعة بإذن النيابة العامة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (843, 84, 'C', N'15 يوماً متواصلة بقرار فردي من الدركي', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (844, 84, 'D', N'شهر كامل دون إشعار أي جهة قضائية', 0);

-- Question 85: Q-PJ-085 (POLICE_JUDICIAIRE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 85 OR Code = 'Q-PJ-085')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 6,
      Code = 'Q-PJ-085',
      Enonce = N'ما هي الآثار القانونية لعدم إشعار عائلة الشخص الموضع تحت تدبير الحراسة النظرية فور اتخاذ الإجراء، أو حرمان المشتبه فيه من حقه في الفحص الطبي عند طلبه؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'إشعار العائلة والحق في الفحص الطبي هما ضمانتان جوهريتان كرسهما المشرع لحماية حقوق الإنسان؛ الإخلال بهما يشكل عيباً مسطرياً قد يعرض إجراءات الحراسة للطعن ويستوجب مساءلة الضابط.',
      CompetencesAssociees = N'["ضمانات المشتبه فيه أثناء الحراسة النظرية","تجنب خرق الإجراءات الجوهرية"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 85,
      EstActive = 1
  WHERE QuestionId = 85 OR Code = 'Q-PJ-085';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    85, 1, 6, 'Q-PJ-085', N'ما هي الآثار القانونية لعدم إشعار عائلة الشخص الموضع تحت تدبير الحراسة النظرية فور اتخاذ الإجراء، أو حرمان المشتبه فيه من حقه في الفحص الطبي عند طلبه؟',
    N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'إشعار العائلة والحق في الفحص الطبي هما ضمانتان جوهريتان كرسهما المشرع لحماية حقوق الإنسان؛ الإخلال بهما يشكل عيباً مسطرياً قد يعرض إجراءات الحراسة للطعن ويستوجب مساءلة الضابط.', N'["ضمانات المشتبه فيه أثناء الحراسة النظرية","تجنب خرق الإجراءات الجوهرية"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]', 85, 1, 0, 1
  );
END;

-- Options de la question 85
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 85;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (851, 85, 'A', N'لا أثر لذلك لأن حقوق الإنسان لا تطبق في مخافر الشرطة والدرك', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (852, 85, 'B', N'خرق لضمانة قانونية جوهرية يحميها القانون قد يعرض الإجراء للبطلان والمسؤولية التأديبية والقضائية', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (853, 85, 'C', N'زيادة مدة العقوبة على المتهم تلقائياً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (854, 85, 'D', N'منح المتهم عفواً شاملاً من الملك في اليوم التالي', 0);

-- Question 86: Q-PJ-086 (POLICE_JUDICIAIRE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 86 OR Code = 'Q-PJ-086')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 6,
      Code = 'Q-PJ-086',
      Enonce = N'في مسرح الجريمة، تم العثور على أظرفة فارغة لطلقات نارية (Douilles) سقطت من سلاح الجاني. ما هي المعلومات التقنية الدقيقة التي يمكن لمختبر الشرطة العلمية والتقنية (IRCGN) استخلاصها من هذه الأظرفة الفارغة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'فحص الأظرفة يكشف عيار السلاح (Calibre)، بصمة الإبرة الضاربة (Percuteur)، علامات القاذف والساحب، مما يتيح تحديد صنف السلاح الناري ومطابقته بدقة ميكروسكوبية مع أي سلاح مشبوه يتم حجزه لاحقاً.',
      CompetencesAssociees = N'["الباليستيك الجنائي وفحص الأسلحة والذخائر","الشرطة التقنية والعلمية"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 86,
      EstActive = 1
  WHERE QuestionId = 86 OR Code = 'Q-PJ-086';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    86, 1, 6, 'Q-PJ-086', N'في مسرح الجريمة، تم العثور على أظرفة فارغة لطلقات نارية (Douilles) سقطت من سلاح الجاني. ما هي المعلومات التقنية الدقيقة التي يمكن لمختبر الشرطة العلمية والتقنية (IRCGN) استخلاصها من هذه الأظرفة الفارغة؟',
    N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'فحص الأظرفة يكشف عيار السلاح (Calibre)، بصمة الإبرة الضاربة (Percuteur)، علامات القاذف والساحب، مما يتيح تحديد صنف السلاح الناري ومطابقته بدقة ميكروسكوبية مع أي سلاح مشبوه يتم حجزه لاحقاً.', N'["الباليستيك الجنائي وفحص الأسلحة والذخائر","الشرطة التقنية والعلمية"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]', 86, 1, 0, 1
  );
END;

-- Options de la question 86
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 86;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (861, 86, 'A', N'الاسم العائلي ورقم الحساب البنكي لمطلق النار فقط', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (862, 86, 'B', N'عيار الذخيرة، نوع وطراز السلاح المستخدم، وبصمة الإبرة الضاربة الفريدة لمطابقتها مع السلاح الجنائي', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (863, 86, 'C', N'سرعة الرياح في العام الماضي فقط', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (864, 86, 'D', N'لا يمكن استخلاص أي معلومة لأن الظرف مجرد قطعة نحاس فارغة', 0);

-- Question 87: Q-PJ-087 (POLICE_JUDICIAIRE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 87 OR Code = 'Q-PJ-087')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 6,
      Code = 'Q-PJ-087',
      Enonce = N'عند حجز هواتف ذكية وحواسيب في إطار تفكيك شبكة إجرامية، ما هو الإجراء التقني الحاسم الواجب تنفيذه فوراً لحماية الأدلة الرقمية من المسح أو التشفير عن بعد؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'يجب عزل الأجهزة المحجوزة فوراً عن كافة شبكات الاتصال والإنترنت (تفعيل وضع الطيران، نزع بطاقة SIM، أو وضع الأجهزة داخل حقيبة فاراداي العازلة للموجات Faraday bag) لمنع تلقي أوامر مسح البيانات عن بعد (Remote wipe).',
      CompetencesAssociees = N'["حجز وتحريز الأدلة الرقمية (Digital Forensics)","منع مسح البيانات عن بعد"]',
      SpecialitesAssociees = N'["SPEC-INFO","SPEC-PJ","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 87,
      EstActive = 1
  WHERE QuestionId = 87 OR Code = 'Q-PJ-087';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    87, 1, 6, 'Q-PJ-087', N'عند حجز هواتف ذكية وحواسيب في إطار تفكيك شبكة إجرامية، ما هو الإجراء التقني الحاسم الواجب تنفيذه فوراً لحماية الأدلة الرقمية من المسح أو التشفير عن بعد؟',
    N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'يجب عزل الأجهزة المحجوزة فوراً عن كافة شبكات الاتصال والإنترنت (تفعيل وضع الطيران، نزع بطاقة SIM، أو وضع الأجهزة داخل حقيبة فاراداي العازلة للموجات Faraday bag) لمنع تلقي أوامر مسح البيانات عن بعد (Remote wipe).', N'["حجز وتحريز الأدلة الرقمية (Digital Forensics)","منع مسح البيانات عن بعد"]',
    N'["SPEC-INFO","SPEC-PJ","SPEC-SCIENTIFIQUE"]', 87, 1, 0, 1
  );
END;

-- Options de la question 87
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 87;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (871, 87, 'A', N'وصل الهواتف بشبكة الواي فاي العامة للثكنة لتحميل التحديثات', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (872, 87, 'B', N'عزل الأجهزة فوراً عن أي شبكة اتصال (وضع الطيران أو كيس فاراداي العازل للأمواج الكهرومغناطيسية) لمنع محو المعطيات عن بعد', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (873, 87, 'C', N'إدخال رمز PIN عشوائياً عشر مرات حتى يقفل الهاتف', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (874, 87, 'D', N'توزيع الهواتف على الزملاء لإجراء مكالماتهم الشخصية', 0);

-- Question 88: Q-PJ-088 (POLICE_JUDICIAIRE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 88 OR Code = 'Q-PJ-088')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 6,
      Code = 'Q-PJ-088',
      Enonce = N'ما هو السند القانوني الذي يخول لضابط الشرطة القضائية طلب السجلات الطبية للمصابين في المستشفيات أو طلب كشوفات حركة الحسابات البنكية أو تسجيلات كاميرات المحلات التجارية أثناء البحث التمهيدي؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'يتم ذلك عبر "تسخير قضائي رسمي" (Réquisition judiciaire) موقع ومختوم قانوناً من طرف ضابط الشرطة القضائية المختص وتحت إشراف وتأشير النيابة العامة، والذي يلزم الجهات المعنية بالتعاون وتقديم المعلومات المطلوبة للعدالة.',
      CompetencesAssociees = N'["التسخيرات القضائية (Réquisitions judiciaires)","المساطر التوثيقية لجمع الأدلة"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE","SPEC-SEC-ADMIN"]',
      OrdreAffichage = 88,
      EstActive = 1
  WHERE QuestionId = 88 OR Code = 'Q-PJ-088';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    88, 1, 6, 'Q-PJ-088', N'ما هو السند القانوني الذي يخول لضابط الشرطة القضائية طلب السجلات الطبية للمصابين في المستشفيات أو طلب كشوفات حركة الحسابات البنكية أو تسجيلات كاميرات المحلات التجارية أثناء البحث التمهيدي؟',
    N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'يتم ذلك عبر "تسخير قضائي رسمي" (Réquisition judiciaire) موقع ومختوم قانوناً من طرف ضابط الشرطة القضائية المختص وتحت إشراف وتأشير النيابة العامة، والذي يلزم الجهات المعنية بالتعاون وتقديم المعلومات المطلوبة للعدالة.', N'["التسخيرات القضائية (Réquisitions judiciaires)","المساطر التوثيقية لجمع الأدلة"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE","SPEC-SEC-ADMIN"]', 88, 1, 0, 1
  );
END;

-- Options de la question 88
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 88;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (881, 88, 'A', N'مكالمة هاتفية ودية غير رسمية مع موظف الاستقبال', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (882, 88, 'B', N'تسخير قضائي كتابي رسمي معلل وموجه وفق نصوص المسطرة الجنائية وتحت إشراف النيابة العامة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (883, 88, 'C', N'تهديد مدير البنك بحبسه فوراً إن لم يفتح الخزنة شخصياً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (884, 88, 'D', N'لا يحق للدرك طلب أي وثيقة من أي مؤسسة مطلقاً', 0);

-- Question 89: Q-PJ-089 (POLICE_JUDICIAIRE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 89 OR Code = 'Q-PJ-089')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 6,
      Code = 'Q-PJ-089',
      Enonce = N'أثناء استماعك ككاتب ضبط لأقوال شاهد مهم يرفض الإملاء والتوقيع على تصريحاته بدعوى خوفه من انتقام المتهمين، كيف يتم توثيق هذه الوضعية قانونياً في ختام المحضر الرسمي؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'تفرض المادة القانونية تلاوة المحضر على المصرح، وإذا امتنع عن التوقيع أو البصم، يشار وجوباً في المحضر إلى تلاوته عليه وإصراره على تصريحاته مع بيان أسباب رفضه التوقيع صراحة، ويوقع الضابط والكاتب.',
      CompetencesAssociees = N'["تحرير المحاضر القضائية وضوابط الإشهاد","معالجة رفض التوقيع"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE","SPEC-SEC-ADMIN"]',
      OrdreAffichage = 89,
      EstActive = 1
  WHERE QuestionId = 89 OR Code = 'Q-PJ-089';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    89, 1, 6, 'Q-PJ-089', N'أثناء استماعك ككاتب ضبط لأقوال شاهد مهم يرفض الإملاء والتوقيع على تصريحاته بدعوى خوفه من انتقام المتهمين، كيف يتم توثيق هذه الوضعية قانونياً في ختام المحضر الرسمي؟',
    N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'تفرض المادة القانونية تلاوة المحضر على المصرح، وإذا امتنع عن التوقيع أو البصم، يشار وجوباً في المحضر إلى تلاوته عليه وإصراره على تصريحاته مع بيان أسباب رفضه التوقيع صراحة، ويوقع الضابط والكاتب.', N'["تحرير المحاضر القضائية وضوابط الإشهاد","معالجة رفض التوقيع"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE","SPEC-SEC-ADMIN"]', 89, 1, 0, 1
  );
END;

-- Options de la question 89
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 89;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (891, 89, 'A', N'تزوير توقيع الشاهد بدلاً منه دون علمه لإكمال الملف', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (892, 89, 'B', N'التنصيص في نهاية المحضر على تلاوته عليه ورفضه التوقيع مع ذكر أسباب امتناعه، وتوقيع الضابط والكاتب فقط', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (893, 89, 'C', N'إلغاء الشهادة وتمزيق المحضر وطرده من المقر', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (894, 89, 'D', N'إجباره وضربه لإكراهه على التوقيع', 0);

-- Question 90: Q-PJ-090 (POLICE_JUDICIAIRE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 90 OR Code = 'Q-PJ-090')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 6,
      Code = 'Q-PJ-090',
      Enonce = N'في جريمة اختطاف طفل قاصر، ما هي التقنية الجنائية المعتمدة لرفع آثار البصمات غير المرئية (Traces latentes) من على سطح ورقة فدية كرتونية ملساء تركها الخاطفون؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'على الأسطح المسامية كالورق والكرتون، تستخدم الكواشف الكيميائية التخصصية في المختبر (مثل مادة النينهيدرين Ninhydrine أو DFO) التي تتفاعل مع الأحماض الأمينية للإفرازات العرقية وتظهر البصمات بلون قرمزي مميز.',
      CompetencesAssociees = N'["كيمياء الشرطة العلمية والتقنية","إظهار الآثار غير المرئية"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 90,
      EstActive = 1
  WHERE QuestionId = 90 OR Code = 'Q-PJ-090';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    90, 1, 6, 'Q-PJ-090', N'في جريمة اختطاف طفل قاصر، ما هي التقنية الجنائية المعتمدة لرفع آثار البصمات غير المرئية (Traces latentes) من على سطح ورقة فدية كرتونية ملساء تركها الخاطفون؟',
    N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'على الأسطح المسامية كالورق والكرتون، تستخدم الكواشف الكيميائية التخصصية في المختبر (مثل مادة النينهيدرين Ninhydrine أو DFO) التي تتفاعل مع الأحماض الأمينية للإفرازات العرقية وتظهر البصمات بلون قرمزي مميز.', N'["كيمياء الشرطة العلمية والتقنية","إظهار الآثار غير المرئية"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]', 90, 1, 0, 1
  );
END;

-- Options de la question 90
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 90;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (901, 90, 'A', N'غسل الورقة بالماء الساخن والصابون ثم كيها بالمكواة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (902, 90, 'B', N'المعالجة الكيميائية المخبرية بمحاليل مخصصة للأوراق (كالنينهيدرين Ninhydrine) للتفاعل مع الأحماض الأمينية وإظهار الدوامات', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (903, 90, 'C', N'فرك الورقة بقطعة قماش خشنة بشدة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (904, 90, 'D', N'النظر إلى الورقة في ضوء الشمس المباشر دون أي معالجة', 0);

-- Question 91: Q-PJ-091 (POLICE_JUDICIAIRE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 91 OR Code = 'Q-PJ-091')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 6,
      Code = 'Q-PJ-091',
      Enonce = N'عند حجز مواد مخدرة (شيرا، كوكايين) أثناء تفتيش مرخص، كيف يتم إعداد الحرز القضائي (Scellé) وضمان سلامة وزنه وقيمته الإثباتية أمام المحكمة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'توزن المادة بميزان دقيق بحضور المعني، توضع في غلاف محكم الإغلاق، يختم بالشمع الأحمر أو القفل المرقم المعتمد، يدون عليه رقم المحضر وتاريخه ومواصفات المحتوى ويوقع عليه الحاضرون والضابط.',
      CompetencesAssociees = N'["تحريز المحجوزات وتوثيق الوزن الصافي","حماية سلسلة الحراسة القضائية"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE","SPEC-SEC-ADMIN"]',
      OrdreAffichage = 91,
      EstActive = 1
  WHERE QuestionId = 91 OR Code = 'Q-PJ-091';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    91, 1, 6, 'Q-PJ-091', N'عند حجز مواد مخدرة (شيرا، كوكايين) أثناء تفتيش مرخص، كيف يتم إعداد الحرز القضائي (Scellé) وضمان سلامة وزنه وقيمته الإثباتية أمام المحكمة؟',
    N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'توزن المادة بميزان دقيق بحضور المعني، توضع في غلاف محكم الإغلاق، يختم بالشمع الأحمر أو القفل المرقم المعتمد، يدون عليه رقم المحضر وتاريخه ومواصفات المحتوى ويوقع عليه الحاضرون والضابط.', N'["تحريز المحجوزات وتوثيق الوزن الصافي","حماية سلسلة الحراسة القضائية"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE","SPEC-SEC-ADMIN"]', 91, 1, 0, 1
  );
END;

-- Options de la question 91
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 91;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (911, 91, 'A', N'وضع المخدرات في كيس بلاستيكي مفتوح في صندوق السيارة دون وزن أو ختم', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (912, 91, 'B', N'الوزن الدقيق بحضور المشتبه فيه، وضع المادة في كيس حرز رسمي، ختمه بالشمع الأحمر والقفل المرقم، وتدوين كافة البيانات والمطابقة بالمحضر', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (913, 91, 'C', N'تذوق جزء من المادة للتأكد من مفعولها ثم رمي الباقي', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (914, 91, 'D', N'تسليم المحجوزات لجيران المتهم للاحتفاظ بها في منازلهم', 0);

-- Question 92: Q-PJ-092 (POLICE_JUDICIAIRE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 92 OR Code = 'Q-PJ-092')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 6,
      Code = 'Q-PJ-092',
      Enonce = N'ما هو الدور الإجرائي لـ "سجل الحراسة النظرية" الإلزامي الممسوك في كافة مقرات الدرك الملكي والشرطة القضائية، ومن هي الجهة القضائية التي تراقب صحته بانتظام؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'سجل الحراسة النظرية يوثق بدقة ساعة التوقيف، ساعة إشعار العائلة، الوجبات، الفحوصات الطبية وساعة الإفراج أو التقديم؛ ويخضع للتفتيش والرقابة الدورية المفاجئة من طرف وكيل الملك ونوابه.',
      CompetencesAssociees = N'["سجلات الضابطة القضائية","الرقابة القضائية على أماكن الاحتجاز"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE","SPEC-SEC-ADMIN"]',
      OrdreAffichage = 92,
      EstActive = 1
  WHERE QuestionId = 92 OR Code = 'Q-PJ-092';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    92, 1, 6, 'Q-PJ-092', N'ما هو الدور الإجرائي لـ "سجل الحراسة النظرية" الإلزامي الممسوك في كافة مقرات الدرك الملكي والشرطة القضائية، ومن هي الجهة القضائية التي تراقب صحته بانتظام؟',
    N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'سجل الحراسة النظرية يوثق بدقة ساعة التوقيف، ساعة إشعار العائلة، الوجبات، الفحوصات الطبية وساعة الإفراج أو التقديم؛ ويخضع للتفتيش والرقابة الدورية المفاجئة من طرف وكيل الملك ونوابه.', N'["سجلات الضابطة القضائية","الرقابة القضائية على أماكن الاحتجاز"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE","SPEC-SEC-ADMIN"]', 92, 1, 0, 1
  );
END;

-- Options de la question 92
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 92;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (921, 92, 'A', N'سجل خاص بحساب نفقات المحروقات فقط وتراقبه إدارة الضرائب', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (922, 92, 'B', N'سجل رسمي مرقم يوثق كافة بيانات المحتجز وأوقات الإجراءات والضمانات، ويراقبه وكيل الملك أو نوابه بزيارات دورية', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (923, 92, 'C', N'دفتر اختياري يرمى بعد نهاية كل شهر دون تدقيق', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (924, 92, 'D', N'سجل مخصص لتوقيع الزوار والسياح الأجانب', 0);

-- Question 93: Q-PJ-093 (POLICE_JUDICIAIRE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 93 OR Code = 'Q-PJ-093')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 6,
      Code = 'Q-PJ-093',
      Enonce = N'في حالة وقوع وفاة غير طبيعية أو مشبوهة (وفاة في ظروف غامضة)، ما هو الإجراء الإلزامي الذي يأمر به ضابط الشرطة القضائية بموافقة النيابة العامة لتحديد سبب الوفاة بدقة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'يتم انتداب وتسخير طبيب شرعي مختص لإجراء التشريح الطبي للجثة (Autopsie médico-légale) لتحديد زمن الوفاة وأسبابها الحقيقية والسموم أو الإصابات الجنائية.',
      CompetencesAssociees = N'["الطب الشرعي الجنائي","التحقيق في الوفيات المشبوهة"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 93,
      EstActive = 1
  WHERE QuestionId = 93 OR Code = 'Q-PJ-093';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    93, 1, 6, 'Q-PJ-093', N'في حالة وقوع وفاة غير طبيعية أو مشبوهة (وفاة في ظروف غامضة)، ما هو الإجراء الإلزامي الذي يأمر به ضابط الشرطة القضائية بموافقة النيابة العامة لتحديد سبب الوفاة بدقة؟',
    N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'يتم انتداب وتسخير طبيب شرعي مختص لإجراء التشريح الطبي للجثة (Autopsie médico-légale) لتحديد زمن الوفاة وأسبابها الحقيقية والسموم أو الإصابات الجنائية.', N'["الطب الشرعي الجنائي","التحقيق في الوفيات المشبوهة"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]', 93, 1, 0, 1
  );
END;

-- Options de la question 93
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 93;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (931, 93, 'A', N'دفن الجثة فوراً قبل شروق الشمس دون أي فحص طبي', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (932, 93, 'B', N'إشعار النيابة العامة وتسخير طبيب شرعي معتمد لإجراء التشريح الطبي لتحديد أسباب وساعة الوفاة الحقيقية', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (933, 93, 'C', N'سؤال أحد المارة عن رأيه في سبب الوفاة وتدوينه بالمحضر فقط', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (934, 93, 'D', N'تصوير الجثة ونشرها على مواقع التواصل الاجتماعي', 0);

-- Question 94: Q-PJ-094 (POLICE_JUDICIAIRE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 94 OR Code = 'Q-PJ-094')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 6,
      Code = 'Q-PJ-094',
      Enonce = N'ما هو التمييز القانوني الجوهري بين "الإنابة القضائية" (Commission rogatoire) والأمر بالتسخير الصادر أثناء مرحلة البحث التمهيدي؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الإنابة القضائية تصدر حصراً عن قاضي التحقيق أو هيئة الحكم لتفويض ضابط الشرطة القضائية للقيام بأعمال تحقيق قضائية محددة، بينما التسخير يصدره الضابط أثناء البحث تحت إشراف النيابة العامة.',
      CompetencesAssociees = N'["مؤسسة الإنابة القضائية والتحقيق الإعدادي","التفويض القضائي للصلاحيات"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 94,
      EstActive = 1
  WHERE QuestionId = 94 OR Code = 'Q-PJ-094';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    94, 1, 6, 'Q-PJ-094', N'ما هو التمييز القانوني الجوهري بين "الإنابة القضائية" (Commission rogatoire) والأمر بالتسخير الصادر أثناء مرحلة البحث التمهيدي؟',
    N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'الإنابة القضائية تصدر حصراً عن قاضي التحقيق أو هيئة الحكم لتفويض ضابط الشرطة القضائية للقيام بأعمال تحقيق قضائية محددة، بينما التسخير يصدره الضابط أثناء البحث تحت إشراف النيابة العامة.', N'["مؤسسة الإنابة القضائية والتحقيق الإعدادي","التفويض القضائي للصلاحيات"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]', 94, 1, 0, 1
  );
END;

-- Options de la question 94
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 94;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (941, 94, 'A', N'لا يوجد أي فرق بينهما وهما مصطلحان متطابقان تماماً في كل المراحل', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (942, 94, 'B', N'الإنابة القضائية تفويض صادر عن قاضي التحقيق لإنجاز إجراءات تحقيق محددة، خلافاً للبحث التمهيدي المسير من النيابة العامة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (943, 94, 'C', N'الإنابة القضائية خاصة بالمخالفات البسيطة للسير فقط', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (944, 94, 'D', N'الإنابة تصدر عن موثق العقود العقارية', 0);

-- Question 95: Q-PJ-095 (POLICE_JUDICIAIRE)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 95 OR Code = 'Q-PJ-095')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 6,
      Code = 'Q-PJ-095',
      Enonce = N'أثناء عملية عرض للمشتبه فيه للتعرف عليه (Tapissage / Séance d''identification) من طرف الضحية، ما هي الشروط المنهجية التي تضمن مشروعية المحضر وعدم الإيحاء بالتعرف القسري؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'يجب وضع المشتبه فيه وسط مجموعة من الأشخاص المشابهين له في الهيئة والملامح واللباس والعمر، عدم إبداء أي تلميح أو إيحاء للضحية، وإتاحة رؤية أحادية الاتجاه (مرآة عاكسة) لحماية الشاهد وتوثيق النتيجة بدقة بمحضر رسمي.',
      CompetencesAssociees = N'["تقنيات العرض والتشخيص الجنائي","نزاهة الأدلة الاستعرافية"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 95,
      EstActive = 1
  WHERE QuestionId = 95 OR Code = 'Q-PJ-095';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    95, 1, 6, 'Q-PJ-095', N'أثناء عملية عرض للمشتبه فيه للتعرف عليه (Tapissage / Séance d''identification) من طرف الضحية، ما هي الشروط المنهجية التي تضمن مشروعية المحضر وعدم الإيحاء بالتعرف القسري؟',
    N'سياق مهني عملياتي لتقييم كفاءات الشرطة القضائية والتحري.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'يجب وضع المشتبه فيه وسط مجموعة من الأشخاص المشابهين له في الهيئة والملامح واللباس والعمر، عدم إبداء أي تلميح أو إيحاء للضحية، وإتاحة رؤية أحادية الاتجاه (مرآة عاكسة) لحماية الشاهد وتوثيق النتيجة بدقة بمحضر رسمي.', N'["تقنيات العرض والتشخيص الجنائي","نزاهة الأدلة الاستعرافية"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE"]', 95, 1, 0, 1
  );
END;

-- Options de la question 95
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 95;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (951, 95, 'A', N'وضع المشتبه فيه مقيداً بمفرده في وسط القاعة والإشارة إليه بالقول "هذا هو المجرم"', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (952, 95, 'B', N'وضعه ضمن تشكيلة من عدة أشخاص متقاربين في الملامح والملابس دون أي توجيه أو إيحاء، وتدوين تصريح الضحية التلقائي بمحضر رسمي', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (953, 95, 'C', N'إجبار الضحية على توقيع ورقة بيضاء قبل رؤية أي شخص', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (954, 95, 'D', N'عرض صورة المشتبه به في الأخبار قبل الجلسة', 0);

-- Question 96: Q-INF-096 (INFORMATIQUE_DIGITAL)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 96 OR Code = 'Q-INF-096')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 7,
      Code = 'Q-INF-096',
      Enonce = N'عند التعامل مع قرص صلب (Disque dur) تم حجزه لدى مشتبه به في جريمة سيبرانية، ما هو الإجراء التقني الجنائي الإلزامي لضمان عدم المساس بالبيانات الأصلية أثناء الفحص والتحليل؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'يجب استخدام جهاز حظر الكتابة (Write Blocker) لإنشاء نسخة مطابقة بت-بت (Copie bit-à-bit / Image disque) والعمل فقط على النسخة مع حساب ومطابقة بصمة الهاش الرقمية (Hash SHA-256) لإثبات سلامة الدليل أمام المحكمة.',
      CompetencesAssociees = N'["التحقيق الجنائي الرقمي (Digital Forensics)","حماية سلامة الأدلة الإلكترونية"]',
      SpecialitesAssociees = N'["SPEC-INFO","SPEC-PJ","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 96,
      EstActive = 1
  WHERE QuestionId = 96 OR Code = 'Q-INF-096';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    96, 1, 7, 'Q-INF-096', N'عند التعامل مع قرص صلب (Disque dur) تم حجزه لدى مشتبه به في جريمة سيبرانية، ما هو الإجراء التقني الجنائي الإلزامي لضمان عدم المساس بالبيانات الأصلية أثناء الفحص والتحليل؟',
    N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'يجب استخدام جهاز حظر الكتابة (Write Blocker) لإنشاء نسخة مطابقة بت-بت (Copie bit-à-bit / Image disque) والعمل فقط على النسخة مع حساب ومطابقة بصمة الهاش الرقمية (Hash SHA-256) لإثبات سلامة الدليل أمام المحكمة.', N'["التحقيق الجنائي الرقمي (Digital Forensics)","حماية سلامة الأدلة الإلكترونية"]',
    N'["SPEC-INFO","SPEC-PJ","SPEC-SCIENTIFIQUE"]', 96, 1, 0, 1
  );
END;

-- Options de la question 96
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 96;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (961, 96, 'A', N'توصيل القرص مباشرة بحاسوب المكتب وفتح الملفات لتصفحها سريعاً بالماوس', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (962, 96, 'B', N'استخدام جهاز مانع الكتابة (Write Blocker) وأخذ نسخة مرآتية مطابقة (Bit-by-bit image) والعمل على النسخة فقط مع حساب بصمة الهاش (Hash)', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (963, 96, 'C', N'إعادة تهيئة القرص (Formater) لتنظيفه من الفيروسات قبل فتحه', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (964, 96, 'D', N'مسح القرص بمغناطيس قوي لتحسين سرعة القراءة', 0);

-- Question 97: Q-INF-097 (INFORMATIQUE_DIGITAL)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 97 OR Code = 'Q-INF-097')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 7,
      Code = 'Q-INF-097',
      Enonce = N'تلقيت رسالة بريد إلكتروني على حاسوب الخدمة تبدو ظاهرياً أنها مرسلة من "إدارة القيادة المركزية" تطلب منك النقر العاجل على رابط لتحديث كلمة المرور لتفادي إغلاق حسابك خلال ساعتين. عند فحص عنوان المرسل الحقيقي، وجدت: (admin@commandement-gendarmerie-support.xyz). ما نوع هذا التهديد الأمني؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'هذا هجوم تصيد احتيالي وهندسة اجتماعية (Phishing) يستغل اسم القيادة ونطاقاً وهمياً (.xyz) وعامل الاستعجال النفسي لسرقة بيانات الاعتماد. يجب عدم النقر وإبلاغ خلية أمن النظم فوراً.',
      CompetencesAssociees = N'["الأمن السيبراني واليقظة الرقمية","كشف هجمات التصيد الاحتيالي (Phishing)"]',
      SpecialitesAssociees = N'["SPEC-INFO","SPEC-SEC-ADMIN","SPEC-PJ"]',
      OrdreAffichage = 97,
      EstActive = 1
  WHERE QuestionId = 97 OR Code = 'Q-INF-097';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    97, 1, 7, 'Q-INF-097', N'تلقيت رسالة بريد إلكتروني على حاسوب الخدمة تبدو ظاهرياً أنها مرسلة من "إدارة القيادة المركزية" تطلب منك النقر العاجل على رابط لتحديث كلمة المرور لتفادي إغلاق حسابك خلال ساعتين. عند فحص عنوان المرسل الحقيقي، وجدت: (admin@commandement-gendarmerie-support.xyz). ما نوع هذا التهديد الأمني؟',
    N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'هذا هجوم تصيد احتيالي وهندسة اجتماعية (Phishing) يستغل اسم القيادة ونطاقاً وهمياً (.xyz) وعامل الاستعجال النفسي لسرقة بيانات الاعتماد. يجب عدم النقر وإبلاغ خلية أمن النظم فوراً.', N'["الأمن السيبراني واليقظة الرقمية","كشف هجمات التصيد الاحتيالي (Phishing)"]',
    N'["SPEC-INFO","SPEC-SEC-ADMIN","SPEC-PJ"]', 97, 1, 0, 1
  );
END;

-- Options de la question 97
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 97;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (971, 97, 'A', N'رسالة رسمية عادية ويجب النقر وإدخال كلمة المرور فوراً لتفادي العقوبة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (972, 97, 'B', N'هجوم تصيد احتيالي خطير (Phishing) لانتحال صفة رسمية وسرقة بيانات الدخول، يستوجب الحظر والتبليغ الفوري', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (973, 97, 'C', N'تحديث برمجي مجاني صادر من شركة مايكروسوفت', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (974, 97, 'D', N'تهنئة رسمية بمناسبة الترقية في الرتبة', 0);

-- Question 98: Q-INF-098 (INFORMATIQUE_DIGITAL)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 98 OR Code = 'Q-INF-098')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 7,
      Code = 'Q-INF-098',
      Enonce = N'ما هي الوظيفة الأمنية الحيوية لقيمة التجزئة أو البصمة الرقمية (Hash Value مثل SHA-256) للملفات الرقمية المحجوزة في القضايا الجنائية؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'دالة الهاش تولد بصمة رقمية فريدة وثابتة للملف؛ أي تغيير طفيف في حرف واحد أو بت واحد يغير قيمة الهاش جذرياً، مما يثبت مادياً أمام المحكمة أن الدليل لم يتعرض لأي تعديل أو تلاعب منذ لحظة الحجز.',
      CompetencesAssociees = N'["التشفير وسلامة الأدلة الإلكترونية","التحقق الرياضي من تكامل المعطيات"]',
      SpecialitesAssociees = N'["SPEC-INFO","SPEC-PJ","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 98,
      EstActive = 1
  WHERE QuestionId = 98 OR Code = 'Q-INF-098';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    98, 1, 7, 'Q-INF-098', N'ما هي الوظيفة الأمنية الحيوية لقيمة التجزئة أو البصمة الرقمية (Hash Value مثل SHA-256) للملفات الرقمية المحجوزة في القضايا الجنائية؟',
    N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'دالة الهاش تولد بصمة رقمية فريدة وثابتة للملف؛ أي تغيير طفيف في حرف واحد أو بت واحد يغير قيمة الهاش جذرياً، مما يثبت مادياً أمام المحكمة أن الدليل لم يتعرض لأي تعديل أو تلاعب منذ لحظة الحجز.', N'["التشفير وسلامة الأدلة الإلكترونية","التحقق الرياضي من تكامل المعطيات"]',
    N'["SPEC-INFO","SPEC-PJ","SPEC-SCIENTIFIQUE"]', 98, 1, 0, 1
  );
END;

-- Options de la question 98
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 98;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (981, 98, 'A', N'تسريع سرعة تحميل الملف من الإنترنت فقط', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (982, 98, 'B', N'إثبات سلامة الدليل وتكامل محتواه (Intégrité) وعدم تعرضه لأي تغيير أو تلاعب منذ رفعه', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (983, 98, 'C', N'ترجمة الملف من لغة أجنبية إلى اللغة العربية', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (984, 98, 'D', N'حذف الفيروسات تلقائياً من نظام التشغيل', 0);

-- Question 99: Q-INF-099 (INFORMATIQUE_DIGITAL)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 99 OR Code = 'Q-INF-099')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 7,
      Code = 'Q-INF-099',
      Enonce = N'في شبكات الاتصال التكتيكية الرقمية المعتمدة لدى فرق الدرك الملكي (مثل معيار TETRA أو APCO P25)، ما هي الميزة الأمنية الرئيسية التي تميزها عن شبكات الاتصال التناظرية التقليدية القديمة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'توفر الشبكات الرقمية التكتيكية التشفير القوي المتقدم (Chiffrement AES)، النقاء الصوتي، إمكانية نقل البيانات الجغرافية (GPS)، ونداءات الطوارئ والمجموعات المغلقة لمنع أي تنصت خارجي من أجهزة الراديو المدنية.',
      CompetencesAssociees = N'["شبكات الاتصال اللاسلكي التكتيكي","التشفير وحماية البث العسكري"]',
      SpecialitesAssociees = N'["SPEC-INFO","SPEC-PSIG","SPEC-GSI"]',
      OrdreAffichage = 99,
      EstActive = 1
  WHERE QuestionId = 99 OR Code = 'Q-INF-099';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    99, 1, 7, 'Q-INF-099', N'في شبكات الاتصال التكتيكية الرقمية المعتمدة لدى فرق الدرك الملكي (مثل معيار TETRA أو APCO P25)، ما هي الميزة الأمنية الرئيسية التي تميزها عن شبكات الاتصال التناظرية التقليدية القديمة؟',
    N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'توفر الشبكات الرقمية التكتيكية التشفير القوي المتقدم (Chiffrement AES)، النقاء الصوتي، إمكانية نقل البيانات الجغرافية (GPS)، ونداءات الطوارئ والمجموعات المغلقة لمنع أي تنصت خارجي من أجهزة الراديو المدنية.', N'["شبكات الاتصال اللاسلكي التكتيكي","التشفير وحماية البث العسكري"]',
    N'["SPEC-INFO","SPEC-PSIG","SPEC-GSI"]', 99, 1, 0, 1
  );
END;

-- Options de la question 99
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 99;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (991, 99, 'A', N'إمكانية الاستماع إليها بواسطة أي راديو سيارة مدني مفتوح', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (992, 99, 'B', N'التشفير الرقمي القوي المقاوم للتنصت، وتحديد المواقع الجغرافية وإدارة قنوات التدخل التكتيكي المشفرة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (993, 99, 'C', N'استهلاك طاقة بطارية أعلى بمئة مرة دون أي فائدة أمنية', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (994, 99, 'D', N'العمل فقط في الأماكن المغلقة تحت الأرض دون إرسال خارجي', 0);

-- Question 100: Q-INF-100 (INFORMATIQUE_DIGITAL)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 100 OR Code = 'Q-INF-100')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 7,
      Code = 'Q-INF-100',
      Enonce = N'عند فحص صورة رقمية ملتقطة بهاتف ذكي عثر عليه في مخبأ، ما هو المصطلح التقني للبيانات الوصفية المضمنة بالملف (EXIF Data) والتي يمكن أن تكشف إحداثيات GPS الدقيقة وتاريخ وساعة التقاط الصورة ونوع الكاميرا؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'بيانات EXIF (Exchangeable Image File Format) هي بيانات وصفية تقنية مخبأة داخل ملف الصورة تسجل معايير الكاميرا، وساعة التقاطها، وإحداثيات الموقع الجغرافي (Géolocalisation)، مما يجعلها كنزاً استخباراتياً وقضائياً ثميناً.',
      CompetencesAssociees = N'["تحليل البيانات الوصفية (Metadata / EXIF)","الاستعلام الجنائي الرقمي"]',
      SpecialitesAssociees = N'["SPEC-INFO","SPEC-PJ","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 100,
      EstActive = 1
  WHERE QuestionId = 100 OR Code = 'Q-INF-100';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    100, 1, 7, 'Q-INF-100', N'عند فحص صورة رقمية ملتقطة بهاتف ذكي عثر عليه في مخبأ، ما هو المصطلح التقني للبيانات الوصفية المضمنة بالملف (EXIF Data) والتي يمكن أن تكشف إحداثيات GPS الدقيقة وتاريخ وساعة التقاط الصورة ونوع الكاميرا؟',
    N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'بيانات EXIF (Exchangeable Image File Format) هي بيانات وصفية تقنية مخبأة داخل ملف الصورة تسجل معايير الكاميرا، وساعة التقاطها، وإحداثيات الموقع الجغرافي (Géolocalisation)، مما يجعلها كنزاً استخباراتياً وقضائياً ثميناً.', N'["تحليل البيانات الوصفية (Metadata / EXIF)","الاستعلام الجنائي الرقمي"]',
    N'["SPEC-INFO","SPEC-PJ","SPEC-SCIENTIFIQUE"]', 100, 1, 0, 1
  );
END;

-- Options de la question 100
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 100;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1001, 100, 'A', N'بيانات الطقس الخارجي فقط', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1002, 100, 'B', N'البيانات الوصفية EXIF (المعلومات التقنية، الطابع الزمني، وإحداثيات الموقع الجغرافي الدقيق)', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1003, 100, 'C', N'اسم بائع كابل الشاحن الكهربائي', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1004, 100, 'D', N'رمز باركود المحل الذي بيع منه الهاتف', 0);

-- Question 101: Q-INF-101 (INFORMATIQUE_DIGITAL)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 101 OR Code = 'Q-INF-101')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 7,
      Code = 'Q-INF-101',
      Enonce = N'ما هو المبدأ الأمني الأساسي لتطبيق "المصادقة المتعددة العوامل" (Multi-Factor Authentication - MFA / 2FA) للولوج إلى المنظومات والبيانات العسكرية الحساسة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'تعتمد المصادقة الثنائية على التحقق عبر عاملين مختلفين على الأقل من الفئات الثلاث: شيء تعرفه (كلمة المرور)، شيء تملكه (بطاقة ذكية أو رمز أمان)، أو شيء فيك (بصمة حيوية بيومترية).',
      CompetencesAssociees = N'["التحكم في الوصول وإدارة الهويات الرقمية","الأمن الدفاعي لمنظومات المعلومات"]',
      SpecialitesAssociees = N'["SPEC-INFO","SPEC-SEC-ADMIN"]',
      OrdreAffichage = 101,
      EstActive = 1
  WHERE QuestionId = 101 OR Code = 'Q-INF-101';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    101, 1, 7, 'Q-INF-101', N'ما هو المبدأ الأمني الأساسي لتطبيق "المصادقة المتعددة العوامل" (Multi-Factor Authentication - MFA / 2FA) للولوج إلى المنظومات والبيانات العسكرية الحساسة؟',
    N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'تعتمد المصادقة الثنائية على التحقق عبر عاملين مختلفين على الأقل من الفئات الثلاث: شيء تعرفه (كلمة المرور)، شيء تملكه (بطاقة ذكية أو رمز أمان)، أو شيء فيك (بصمة حيوية بيومترية).', N'["التحكم في الوصول وإدارة الهويات الرقمية","الأمن الدفاعي لمنظومات المعلومات"]',
    N'["SPEC-INFO","SPEC-SEC-ADMIN"]', 101, 1, 0, 1
  );
END;

-- Options de la question 101
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 101;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1011, 101, 'A', N'كتابة كلمة المرور على ورقة لاصقة وتثبيتها فوق الشاشة لتسهيل التذكر', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1012, 101, 'B', N'طلب التحقق عبر عنصرين مختلفين على الأقل (مثل كلمة المرور مع بطاقة ذكية أو رمز أمان مؤقت أو بصمة بيومترية)', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1013, 101, 'C', N'مشاركة كلمة المرور مع جميع أفراد الدورية بالتساوي', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1014, 101, 'D', N'تغيير كلمة المرور إلى "123456" لتسهيل الدخول السريع في الطوارئ', 0);

-- Question 102: Q-INF-102 (INFORMATIQUE_DIGITAL)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 102 OR Code = 'Q-INF-102')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 7,
      Code = 'Q-INF-102',
      Enonce = N'في شبكة الحواسيب المحلية (LAN) لمركز الدرك، ما هو عنوان بروتوكول الإنترنت (Adresse IP) الذي يمثل الحلقة المحلية الذاتية (Localhost Loopback) المخصصة لاختبار بطاقة الشبكة الداخلية للجهاز نفسه؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'العنوان القياسي المحجوز لعنوان الاسترجاع الداخلي واختبار مكدس TCP/IP هو 127.0.0.1 (Loopback address).',
      CompetencesAssociees = N'["مفاهيم شبكات TCP/IP","تشخيص وتصحيح أعطال الشبكات"]',
      SpecialitesAssociees = N'["SPEC-INFO","SPEC-SEC-ADMIN"]',
      OrdreAffichage = 102,
      EstActive = 1
  WHERE QuestionId = 102 OR Code = 'Q-INF-102';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    102, 1, 7, 'Q-INF-102', N'في شبكة الحواسيب المحلية (LAN) لمركز الدرك، ما هو عنوان بروتوكول الإنترنت (Adresse IP) الذي يمثل الحلقة المحلية الذاتية (Localhost Loopback) المخصصة لاختبار بطاقة الشبكة الداخلية للجهاز نفسه؟',
    N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'العنوان القياسي المحجوز لعنوان الاسترجاع الداخلي واختبار مكدس TCP/IP هو 127.0.0.1 (Loopback address).', N'["مفاهيم شبكات TCP/IP","تشخيص وتصحيح أعطال الشبكات"]',
    N'["SPEC-INFO","SPEC-SEC-ADMIN"]', 102, 1, 0, 1
  );
END;

-- Options de la question 102
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 102;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1021, 102, 'A', N'192.168.1.1', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1022, 102, 'B', N'127.0.0.1', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1023, 102, 'C', N'255.255.255.255', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1024, 102, 'D', N'0.0.0.0', 0);

-- Question 103: Q-INF-103 (INFORMATIQUE_DIGITAL)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 103 OR Code = 'Q-INF-103')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 7,
      Code = 'Q-INF-103',
      Enonce = N'عثر أحد عناصر الدورية في مرآب الثكنة على مفتاح ذاكرة فلاشية (Clé USB) حديث ومكتوب عليه بخط اليد "ملفات سرية وهامة". ما هو التصرف الأمني السيبراني السليم والصارم؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'هذا تكتيك كلاسيكي لاختراق الأنظمة يعرف بـ (USB Drop Attack) حيث تزرع برمجيات فدية أو حصان طروادة خبيث. يُمنع منعاً باتاً وصله بأي حاسوب نظامي، ويسلم فوراً لخلية أمن النظم لتحليله في بيئة معزولة (Sandbox).',
      CompetencesAssociees = N'["مكافحة هجمات وسائط التخزين المصطادة (USB Dropping)","الانضباط الأمني السيبراني"]',
      SpecialitesAssociees = N'["SPEC-INFO","SPEC-PSIG","SPEC-SEC-ADMIN"]',
      OrdreAffichage = 103,
      EstActive = 1
  WHERE QuestionId = 103 OR Code = 'Q-INF-103';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    103, 1, 7, 'Q-INF-103', N'عثر أحد عناصر الدورية في مرآب الثكنة على مفتاح ذاكرة فلاشية (Clé USB) حديث ومكتوب عليه بخط اليد "ملفات سرية وهامة". ما هو التصرف الأمني السيبراني السليم والصارم؟',
    N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'هذا تكتيك كلاسيكي لاختراق الأنظمة يعرف بـ (USB Drop Attack) حيث تزرع برمجيات فدية أو حصان طروادة خبيث. يُمنع منعاً باتاً وصله بأي حاسوب نظامي، ويسلم فوراً لخلية أمن النظم لتحليله في بيئة معزولة (Sandbox).', N'["مكافحة هجمات وسائط التخزين المصطادة (USB Dropping)","الانضباط الأمني السيبراني"]',
    N'["SPEC-INFO","SPEC-PSIG","SPEC-SEC-ADMIN"]', 103, 1, 0, 1
  );
END;

-- Options de la question 103
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 103;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1031, 103, 'A', N'وصله فوراً بحاسوب قاعة العمليات لمعرفة ما بداخله بدافع الفضول', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1032, 103, 'B', N'الامتناع التام عن وصله بأي جهاز وتسليمه للخلية المعلوماتية المختصة لتحليله في محطة فحص معزولة وآمنة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1033, 103, 'C', N'أخذه للمنزل لاستخدامه لتخزين الأفلام والصور الشخصية', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1034, 103, 'D', N'محاولة فتحه على هواتف الزملاء الذكية بالتوالي', 0);

-- Question 104: Q-INF-104 (INFORMATIQUE_DIGITAL)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 104 OR Code = 'Q-INF-104')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 7,
      Code = 'Q-INF-104',
      Enonce = N'أثناء استخراج الأدلة من تطبيق دردشة مشفرة في هاتف مشتبه به، تم العثور على قاعدة بيانات محلية بصيغة (SQLite / .db) محمية بنسخة احتياطية محلية. ما هي التقنية التي تمكن الخبير من استرجاع الرسائل المحذوفة حديثاً؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'في قواعد بيانات SQLite، لا تحذف الرسائل فورياً بل تظل مخزنة في صفحات السجلات غير المخصصة (Freelists / WAL Journal) حتى تتم الكتابة فوقها، مما يتيح استرجاعها عبر التحليل الجنائي لسجلات المعاملات.',
      CompetencesAssociees = N'["الاسترجاع الجنائي لقواعد البيانات","فحص سجلات التغيير وقوائم السجلات الحرة"]',
      SpecialitesAssociees = N'["SPEC-INFO","SPEC-PJ"]',
      OrdreAffichage = 104,
      EstActive = 1
  WHERE QuestionId = 104 OR Code = 'Q-INF-104';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    104, 1, 7, 'Q-INF-104', N'أثناء استخراج الأدلة من تطبيق دردشة مشفرة في هاتف مشتبه به، تم العثور على قاعدة بيانات محلية بصيغة (SQLite / .db) محمية بنسخة احتياطية محلية. ما هي التقنية التي تمكن الخبير من استرجاع الرسائل المحذوفة حديثاً؟',
    N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'في قواعد بيانات SQLite، لا تحذف الرسائل فورياً بل تظل مخزنة في صفحات السجلات غير المخصصة (Freelists / WAL Journal) حتى تتم الكتابة فوقها، مما يتيح استرجاعها عبر التحليل الجنائي لسجلات المعاملات.', N'["الاسترجاع الجنائي لقواعد البيانات","فحص سجلات التغيير وقوائم السجلات الحرة"]',
    N'["SPEC-INFO","SPEC-PJ"]', 104, 1, 0, 1
  );
END;

-- Options de la question 104
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 104;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1041, 104, 'A', N'لا يمكن أبداً استرجاع أي محتوى رقمي حذفه المستخدم نهائياً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1042, 104, 'B', N'فحص ملفات السجلات اليومية (WAL Journal) والمساحات غير المخصصة (Unallocated space) لقاعدة البيانات لاستخراج النصوص المحذوفة قبل كتابة بيانات جديدة فوقها', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1043, 104, 'C', N'الاتصال بشركة الهاتف لتطلب منهم قراءة شاشة الهاتف صوتياً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1044, 104, 'D', N'تسخين الهاتف في فرن ميكروويف لإظهار الحروف المخفية', 0);

-- Question 105: Q-INF-105 (INFORMATIQUE_DIGITAL)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 105 OR Code = 'Q-INF-105')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 7,
      Code = 'Q-INF-105',
      Enonce = N'ما هو البروتوكول الأمني الشبكي (Network Protocol) المعتمد لربط الحواسيب الميدانية المتنقلة لسيارات الدرك بالخوادم المركزية للقيادة عبر قنوات اتصال مشفرة وآمنة عبر شبكة الإنترنت العامة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'تعتمد الشبكات العسكرية والأمنية على إنشاء نفق مشفر عبر شبكة خاصة افتراضية (VPN - Virtual Private Network مجهز ببروتوكول IPsec أو WireGuard) لضمان سرية وتكامل البيانات المتبادلة بين الميدان والمركز.',
      CompetencesAssociees = N'["الشبكات الافتراضية الخاصة والأنفاق المشفرة","أمن الربط الميداني"]',
      SpecialitesAssociees = N'["SPEC-INFO","SPEC-PSIG"]',
      OrdreAffichage = 105,
      EstActive = 1
  WHERE QuestionId = 105 OR Code = 'Q-INF-105';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    105, 1, 7, 'Q-INF-105', N'ما هو البروتوكول الأمني الشبكي (Network Protocol) المعتمد لربط الحواسيب الميدانية المتنقلة لسيارات الدرك بالخوادم المركزية للقيادة عبر قنوات اتصال مشفرة وآمنة عبر شبكة الإنترنت العامة؟',
    N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'تعتمد الشبكات العسكرية والأمنية على إنشاء نفق مشفر عبر شبكة خاصة افتراضية (VPN - Virtual Private Network مجهز ببروتوكول IPsec أو WireGuard) لضمان سرية وتكامل البيانات المتبادلة بين الميدان والمركز.', N'["الشبكات الافتراضية الخاصة والأنفاق المشفرة","أمن الربط الميداني"]',
    N'["SPEC-INFO","SPEC-PSIG"]', 105, 1, 0, 1
  );
END;

-- Options de la question 105
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 105;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1051, 105, 'A', N'بروتوكول HTTP المفتوح وغير المشفر', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1052, 105, 'B', N'الشبكة الافتراضية الخاصة المشفرة (VPN / IPsec Tunnel) لتأمين نفق اتصالات معزول وسري', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1053, 105, 'C', N'بروتوكول البلوتوث المفتوح للأجهزة المجاورة فقط', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1054, 105, 'D', N'استخدام برامج مشاركة الملفات المجانية غير المعتمدة', 0);

-- Question 106: Q-INF-106 (INFORMATIQUE_DIGITAL)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 106 OR Code = 'Q-INF-106')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 7,
      Code = 'Q-INF-106',
      Enonce = N'في مجال الاستخبار والتحري الرقمي مفتوح المصدر (OSINT - Open Source Intelligence)، ما هي الأداة أو التقنية المعتمدة للتحقق مما إذا كانت صورة شخص مشبوه مستخدمة في حسابات أخرى على شبكة الإنترنت أو منسوخة من موقع أجنبي؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'تقنية "البحث العكسي عن الصور" (Reverse Image Search) عبر محركات متخصصة تتيح مطابقة بصمات البكسلات وتتبع كافة المواقع والتواريخ التي ظهرت فيها نفس الصورة سابقاً عبر الشبكة العنكبوتية.',
      CompetencesAssociees = N'["تقنيات الاستخبار مفتوح المصدر (OSINT)","البحث العكسي عن الصور والهويات"]',
      SpecialitesAssociees = N'["SPEC-INFO","SPEC-PJ","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 106,
      EstActive = 1
  WHERE QuestionId = 106 OR Code = 'Q-INF-106';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    106, 1, 7, 'Q-INF-106', N'في مجال الاستخبار والتحري الرقمي مفتوح المصدر (OSINT - Open Source Intelligence)، ما هي الأداة أو التقنية المعتمدة للتحقق مما إذا كانت صورة شخص مشبوه مستخدمة في حسابات أخرى على شبكة الإنترنت أو منسوخة من موقع أجنبي؟',
    N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'تقنية "البحث العكسي عن الصور" (Reverse Image Search) عبر محركات متخصصة تتيح مطابقة بصمات البكسلات وتتبع كافة المواقع والتواريخ التي ظهرت فيها نفس الصورة سابقاً عبر الشبكة العنكبوتية.', N'["تقنيات الاستخبار مفتوح المصدر (OSINT)","البحث العكسي عن الصور والهويات"]',
    N'["SPEC-INFO","SPEC-PJ","SPEC-SCIENTIFIQUE"]', 106, 1, 0, 1
  );
END;

-- Options de la question 106
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 106;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1061, 106, 'A', N'إعادة رسم الصورة يدوياً بقلم رصاص وعرضها على الجمهور', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1062, 106, 'B', N'البحث العكسي بالصور (Reverse Image Search) ومطابقة الأنماط البصرية في قواعد البيانات المفتوحة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1063, 106, 'C', N'تغيير ألوان الصورة وجعلها باللونين الأبيض والأسود فقط', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1064, 106, 'D', N'الانتظار حتى يتصل المشتبه به لإرسال رابط حسابه الرسمي', 0);

-- Question 107: Q-INF-107 (INFORMATIQUE_DIGITAL)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 107 OR Code = 'Q-INF-107')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 7,
      Code = 'Q-INF-107',
      Enonce = N'عند حجز منظومة إلكترونية متصلة بالتيار وتعمل بنشاط أثناء مداهمة وكر جريمة منظمة، ما هو الأسلوب الصحيح للتعامل مع الذاكرة العشوائية الحية (RAM) للجهاز قبل إيقاف تشغيله؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'الذاكرة الحية (RAM) متطايرة وتمحى فور انقطاع الكهرباء؛ تحتوي على كلمات المرور النشطة، مفاتيح فك تشفير الأقراص، والاتصالات الجارية. يجب تفريغها وحفظها برمجياً (RAM Capture / Dump) قبل قطع التيار الكهربائي.',
      CompetencesAssociees = N'["التحري المباشر على الأنظمة الحية (Live Forensics)","حفظ محتوى الذاكرة المؤقتة ومفاتيح التشفير"]',
      SpecialitesAssociees = N'["SPEC-INFO","SPEC-PJ"]',
      OrdreAffichage = 107,
      EstActive = 1
  WHERE QuestionId = 107 OR Code = 'Q-INF-107';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    107, 1, 7, 'Q-INF-107', N'عند حجز منظومة إلكترونية متصلة بالتيار وتعمل بنشاط أثناء مداهمة وكر جريمة منظمة، ما هو الأسلوب الصحيح للتعامل مع الذاكرة العشوائية الحية (RAM) للجهاز قبل إيقاف تشغيله؟',
    N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'الذاكرة الحية (RAM) متطايرة وتمحى فور انقطاع الكهرباء؛ تحتوي على كلمات المرور النشطة، مفاتيح فك تشفير الأقراص، والاتصالات الجارية. يجب تفريغها وحفظها برمجياً (RAM Capture / Dump) قبل قطع التيار الكهربائي.', N'["التحري المباشر على الأنظمة الحية (Live Forensics)","حفظ محتوى الذاكرة المؤقتة ومفاتيح التشفير"]',
    N'["SPEC-INFO","SPEC-PJ"]', 107, 1, 0, 1
  );
END;

-- Options de la question 107
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 107;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1071, 107, 'A', N'نزع قابس الكهرباء مباشرة من الحائط لمسح كل شيء فوراً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1072, 107, 'B', N'إجراء تفريغ فوري ومباشر للذاكرة الحية (Live RAM Dump) لالتقاط مفاتيح التشفير والجلسات النشطة قبل إطفاء الجهاز', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1073, 107, 'C', N'إعادة تشغيل الجهاز خمس مرات للتأكد من سرعته', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1074, 107, 'D', N'رش الشاشة بالماء البارد لمنع ارتفاع الحرارة', 0);

-- Question 108: Q-INF-108 (INFORMATIQUE_DIGITAL)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 108 OR Code = 'Q-INF-108')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 7,
      Code = 'Q-INF-108',
      Enonce = N'ما هو الهدف من تطبيق سياسة "الحد الأدنى من الصلاحيات" (Principle of Least Privilege - PoLP) في منظومات التدبير الأمني والإداري لقواعد بيانات الدرك الملكي؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'يقتضي هذا المبدأ منح كل مستخدم فقط الحد الأدنى الصارم من الصلاحيات والبيانات التي يحتاجها لأداء واجبه الوظيفي المحدد، وذلك لتقليل الأضرار الناتجة عن أي اختراق أو سوء استخدام داخلي.',
      CompetencesAssociees = N'["إدارة الصلاحيات والأمان الهيكلي","منع تسريب البيانات غير المصرح بها"]',
      SpecialitesAssociees = N'["SPEC-INFO","SPEC-SEC-ADMIN"]',
      OrdreAffichage = 108,
      EstActive = 1
  WHERE QuestionId = 108 OR Code = 'Q-INF-108';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    108, 1, 7, 'Q-INF-108', N'ما هو الهدف من تطبيق سياسة "الحد الأدنى من الصلاحيات" (Principle of Least Privilege - PoLP) في منظومات التدبير الأمني والإداري لقواعد بيانات الدرك الملكي؟',
    N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'يقتضي هذا المبدأ منح كل مستخدم فقط الحد الأدنى الصارم من الصلاحيات والبيانات التي يحتاجها لأداء واجبه الوظيفي المحدد، وذلك لتقليل الأضرار الناتجة عن أي اختراق أو سوء استخدام داخلي.', N'["إدارة الصلاحيات والأمان الهيكلي","منع تسريب البيانات غير المصرح بها"]',
    N'["SPEC-INFO","SPEC-SEC-ADMIN"]', 108, 1, 0, 1
  );
END;

-- Options de la question 108
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 108;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1081, 108, 'A', N'إعطاء جميع المستخدمين صلاحيات المدير العام (Admin) الكاملة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1082, 108, 'B', N'قصر صلاحيات كل مستخدم على البيانات والمهام الضرورية حصراً لأداء مهامه الوظيفية للحد من مخاطر الاختراق أو التسريب', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1083, 108, 'C', N'حظر استخدام الفأرة في جميع المكاتب', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1084, 108, 'D', N'إلغاء جميع كلمات المرور لجعل النظام أسرع', 0);

-- Question 109: Q-INF-109 (INFORMATIQUE_DIGITAL)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 109 OR Code = 'Q-INF-109')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 7,
      Code = 'Q-INF-109',
      Enonce = N'في استغلال معطيات تحديد المواقع بالأقمار الاصطناعية (GPS) في العمليات الميدانية، كم عدد الأقمار الاصطناعية العاملة كحد أدنى مطلوب رياضياً لتحديد الموقع الجغرافي ثلاثي الأبعاد (خط العرض، خط الطول، والارتفاع)؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'لتحديد الموقع ثلاثي الأبعاد مع تصحيح خطأ توقيت الساعة الداخلية للمستقبل، يلزم الاتصال بإشارات 4 أقمار اصطناعية على الأقل (Trilatération 3D).',
      CompetencesAssociees = N'["أنظمة الملاحة وتحديد المواقع GPS","الحساب الهندسي للتثليث المساحي"]',
      SpecialitesAssociees = N'["SPEC-INFO","SPEC-PSIG","SPEC-GEH"]',
      OrdreAffichage = 109,
      EstActive = 1
  WHERE QuestionId = 109 OR Code = 'Q-INF-109';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    109, 1, 7, 'Q-INF-109', N'في استغلال معطيات تحديد المواقع بالأقمار الاصطناعية (GPS) في العمليات الميدانية، كم عدد الأقمار الاصطناعية العاملة كحد أدنى مطلوب رياضياً لتحديد الموقع الجغرافي ثلاثي الأبعاد (خط العرض، خط الطول، والارتفاع)؟',
    N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'لتحديد الموقع ثلاثي الأبعاد مع تصحيح خطأ توقيت الساعة الداخلية للمستقبل، يلزم الاتصال بإشارات 4 أقمار اصطناعية على الأقل (Trilatération 3D).', N'["أنظمة الملاحة وتحديد المواقع GPS","الحساب الهندسي للتثليث المساحي"]',
    N'["SPEC-INFO","SPEC-PSIG","SPEC-GEH"]', 109, 1, 0, 1
  );
END;

-- Options de la question 109
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 109;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1091, 109, 'A', N'قمر اصطناعي واحد يكفي تماماً في كل الأوقات', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1092, 109, 'B', N'4 أقمار اصطناعية كحد أدنى لتحديد الإحداثيات الثلاثية وتصحيح انحراف التوقيت', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1093, 109, 'C', N'100 قمر اصطناعي في نفس اللحظة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1094, 109, 'D', N'لا يعتمد نظام GPS على الأقمار الاصطناعية إطلاقاً بل على أعمدة الكهرباء', 0);

-- Question 110: Q-INF-110 (INFORMATIQUE_DIGITAL)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 110 OR Code = 'Q-INF-110')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 7,
      Code = 'Q-INF-110',
      Enonce = N'عند التحقيق في هجوم إلكتروني شل حواسيب مؤسسة حيوية برسالة تطالب بدفع فدية بعملة البيتكوين مقابل فك تشفير الملفات، ما هو الصنف الخبيث لهذا الهجوم البرمجي وكيف يوصى بالتعامل معه أمنياً؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'هذا هجوم برمجيات الفدية الخبيثة (Ransomware). التوصية الأمنية والقضائية الصارمة تمنع دفع أي فدية لأنها تمول الجريمة المنظمة ولا تضمن استعادة المفاتيح، وتفرض عزل الشبكة واستعادة النسخ الاحتياطية المعزولة (Offline Backups).',
      CompetencesAssociees = N'["مكافحة برمجيات الفدية (Ransomware)","الاستجابة للحوادث السيبرانية"]',
      SpecialitesAssociees = N'["SPEC-INFO","SPEC-PJ"]',
      OrdreAffichage = 110,
      EstActive = 1
  WHERE QuestionId = 110 OR Code = 'Q-INF-110';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    110, 1, 7, 'Q-INF-110', N'عند التحقيق في هجوم إلكتروني شل حواسيب مؤسسة حيوية برسالة تطالب بدفع فدية بعملة البيتكوين مقابل فك تشفير الملفات، ما هو الصنف الخبيث لهذا الهجوم البرمجي وكيف يوصى بالتعامل معه أمنياً؟',
    N'سياق مهني عملياتي لتقييم كفاءات المعلوماتية والمهارات الرقمية.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'هذا هجوم برمجيات الفدية الخبيثة (Ransomware). التوصية الأمنية والقضائية الصارمة تمنع دفع أي فدية لأنها تمول الجريمة المنظمة ولا تضمن استعادة المفاتيح، وتفرض عزل الشبكة واستعادة النسخ الاحتياطية المعزولة (Offline Backups).', N'["مكافحة برمجيات الفدية (Ransomware)","الاستجابة للحوادث السيبرانية"]',
    N'["SPEC-INFO","SPEC-PJ"]', 110, 1, 0, 1
  );
END;

-- Options de la question 110
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 110;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1101, 110, 'A', N'دفع الفدية فوراً ومضاعفتها لضمان إرجاع الملفات بسرعة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1102, 110, 'B', N'برمجيات الفدية (Ransomware)؛ ويجب عزل الأجهزة المصابة فوراً، رفض دفع الفدية، واستعادة البيانات من النسخ الاحتياطية المعزولة (Offline)', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1103, 110, 'C', N'تثبيت لعبة فيديو جديدة لحذف الفيروس تلقائياً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1104, 110, 'D', N'بيع الحواسيب المصابة في المزاد العلني', 0);

-- Question 111: Q-COM-111 (COMMUNICATION_FORMATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 111 OR Code = 'Q-COM-111')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 8,
      Code = 'Q-COM-111',
      Enonce = N'تقدم مواطن إلى مقر السرية في حالة غضب وانفعال شديد يصرخ محتجاً على توقيف شاحنته في سد قضائي. ما هو الأسلوب الاحترافي الأنجع لتهدئة الموقف وامتصاص غضبه وفق قواعد التواصل الأمني؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التواصل والتكوين.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الاستماع الهادئ دون مقاطعة، الحفاظ على نبرة صوت متزنة ومحترمة، إظهار تفهم انفعاله ثم شرح الإجراء القانوني بموضوعية وحياد يمتص الشحن الانفعالي ويعيد الحوار إلى إطاره القانوني السليم.',
      CompetencesAssociees = N'["تقنيات الاستماع النشط وتهدئة النزاعات","الاستقبال والتواصل المهني مع المواطنين"]',
      SpecialitesAssociees = N'["SPEC-FORMATION","SPEC-SEC-ADMIN","SPEC-PSIG"]',
      OrdreAffichage = 111,
      EstActive = 1
  WHERE QuestionId = 111 OR Code = 'Q-COM-111';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    111, 1, 8, 'Q-COM-111', N'تقدم مواطن إلى مقر السرية في حالة غضب وانفعال شديد يصرخ محتجاً على توقيف شاحنته في سد قضائي. ما هو الأسلوب الاحترافي الأنجع لتهدئة الموقف وامتصاص غضبه وفق قواعد التواصل الأمني؟',
    N'سياق مهني عملياتي لتقييم كفاءات التواصل والتكوين.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'الاستماع الهادئ دون مقاطعة، الحفاظ على نبرة صوت متزنة ومحترمة، إظهار تفهم انفعاله ثم شرح الإجراء القانوني بموضوعية وحياد يمتص الشحن الانفعالي ويعيد الحوار إلى إطاره القانوني السليم.', N'["تقنيات الاستماع النشط وتهدئة النزاعات","الاستقبال والتواصل المهني مع المواطنين"]',
    N'["SPEC-FORMATION","SPEC-SEC-ADMIN","SPEC-PSIG"]', 111, 1, 0, 1
  );
END;

-- Options de la question 111
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 111;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1111, 111, 'A', N'الصراخ في وجهه بصوت أعلى لإجباره على الصمت بالقوة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1112, 111, 'B', N'الحفاظ على الهدوء التام، الاستماع باهتمام ودون مقاطعة، ثم توضيح الإطار القانوني للإجراء بلباقة وحزم مهني', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1113, 111, 'C', N'إغلاق الباب في وجهه وتركه يصرخ في الشارع', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1114, 111, 'D', N'إلغاء المخالفة فوراً لتجنب إزعاجه والاعتذار له بدون سبب', 0);

-- Question 112: Q-COM-112 (COMMUNICATION_FORMATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 112 OR Code = 'Q-COM-112')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 8,
      Code = 'Q-COM-112',
      Enonce = N'بصفتك مؤطراً ومدرباً لدفعة جديدة من التلاميذ الدركيين، كيف تنفذ جلسة "استخلاص الدروس والتقييم اللاحق" (Retour d''expérience - RETEX) بعد تدريب ميداني معقد ارتكب فيه بعض المتدربين أخطاء تكتيكية؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التواصل والتكوين.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'جلسة RETEX البيداغوجية الناجحة تركز على تحليل الوقائع والأفعال بموضوعية وليس تجريح الأشخاص، وتشجع المتدربين على النقد الذاتي وتحديد أسباب الخلل وتقديم الحلول التصحيحية لترسيخ التعلم الإيجابي.',
      CompetencesAssociees = N'["المنهجية البيداغوجية للتكوين العسكري","إدارة جلسات استخلاص الدروس (RETEX)"]',
      SpecialitesAssociees = N'["SPEC-FORMATION","SPEC-PSIG","SPEC-GEH"]',
      OrdreAffichage = 112,
      EstActive = 1
  WHERE QuestionId = 112 OR Code = 'Q-COM-112';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    112, 1, 8, 'Q-COM-112', N'بصفتك مؤطراً ومدرباً لدفعة جديدة من التلاميذ الدركيين، كيف تنفذ جلسة "استخلاص الدروس والتقييم اللاحق" (Retour d''expérience - RETEX) بعد تدريب ميداني معقد ارتكب فيه بعض المتدربين أخطاء تكتيكية؟',
    N'سياق مهني عملياتي لتقييم كفاءات التواصل والتكوين.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'جلسة RETEX البيداغوجية الناجحة تركز على تحليل الوقائع والأفعال بموضوعية وليس تجريح الأشخاص، وتشجع المتدربين على النقد الذاتي وتحديد أسباب الخلل وتقديم الحلول التصحيحية لترسيخ التعلم الإيجابي.', N'["المنهجية البيداغوجية للتكوين العسكري","إدارة جلسات استخلاص الدروس (RETEX)"]',
    N'["SPEC-FORMATION","SPEC-PSIG","SPEC-GEH"]', 112, 1, 0, 1
  );
END;

-- Options de la question 112
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 112;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1121, 112, 'A', N'توبيخ وسخرية وإهانة المخطئين أمام زملائهم لردعهم', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1122, 112, 'B', N'تحليل الوقائع بموضوعية وبناءة، تشجيع النقد الذاتي، وتحديد أسباب الأخطاء التكتيكية وسبل تصحيحها دون تشخيص شخصي', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1123, 112, 'C', N'تجاهل الأخطاء تماماً والادعاء بأن التدريب كان مثالياً بنسبة 100%', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1124, 112, 'D', N'إلغاء التداريب الميدانية المستقبلية نهائياً والاكتفاء بالنظري', 0);

-- Question 113: Q-COM-113 (COMMUNICATION_FORMATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 113 OR Code = 'Q-COM-113')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 8,
      Code = 'Q-COM-113',
      Enonce = N'أثناء الاستماع لضحية اعتداء جسدي عنيف تعيش صدمة نفسية حادة وتبكي باستمرار وتتلعثم، ما هي المهارة التواصلية التي يجب أن يتحلى بها المحقق لطمأنتها وتسهيل استجماع تفاصيل الواقعة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التواصل والتكوين.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'توفير فضاء آمن وخاص، إتاحة الوقت الكافي للهدوء، إبداء التعاطف الإنساني الرصين (Empathie professionnelle)، وطرح أسئلة مفتوحة وغير ضاغطة يساعد الضحية على استعادة أمنها النفسي وتذكر الوقائع بدقة.',
      CompetencesAssociees = N'["الاستماع التعاطفي لضحايا العنف","إدارة المقابلات في حالات الصدمة النفسية"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-FORMATION","SPEC-SEC-ADMIN"]',
      OrdreAffichage = 113,
      EstActive = 1
  WHERE QuestionId = 113 OR Code = 'Q-COM-113';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    113, 1, 8, 'Q-COM-113', N'أثناء الاستماع لضحية اعتداء جسدي عنيف تعيش صدمة نفسية حادة وتبكي باستمرار وتتلعثم، ما هي المهارة التواصلية التي يجب أن يتحلى بها المحقق لطمأنتها وتسهيل استجماع تفاصيل الواقعة؟',
    N'سياق مهني عملياتي لتقييم كفاءات التواصل والتكوين.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'توفير فضاء آمن وخاص، إتاحة الوقت الكافي للهدوء، إبداء التعاطف الإنساني الرصين (Empathie professionnelle)، وطرح أسئلة مفتوحة وغير ضاغطة يساعد الضحية على استعادة أمنها النفسي وتذكر الوقائع بدقة.', N'["الاستماع التعاطفي لضحايا العنف","إدارة المقابلات في حالات الصدمة النفسية"]',
    N'["SPEC-PJ","SPEC-FORMATION","SPEC-SEC-ADMIN"]', 113, 1, 0, 1
  );
END;

-- Options de la question 113
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 113;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1131, 113, 'A', N'الضغط عليها واستعجالها بالقول: "أسرعي ليس لدينا وقت لدموعك"', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1132, 113, 'B', N'توفير بيئة هادئة ومطمئنة، منحها الوقت الكافي لاستعادة الهدوء، واستخدام التعاطف المهني والأسئلة المفتوحة اللطيفة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1133, 113, 'C', N'استدعاء الصحافة لتصويرها في تلك اللحظة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1134, 113, 'D', N'اتهامها بأنها هي المسؤولة عن الاعتداء لتصحيح سلوكها', 0);

-- Question 114: Q-COM-114 (COMMUNICATION_FORMATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 114 OR Code = 'Q-COM-114')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 8,
      Code = 'Q-COM-114',
      Enonce = N'في حادث انفجار غازي مأساوي في حي سكني، تجمع الصحفيون ومراسلو القنوات الفضائية في المكان يطالبون عناصر الدورية بتصريحات عاجلة حول عدد الضحايا والمسؤولين. ما هي القاعدة الصارمة للتواصل مع وسائل الإعلام في مثل هذه الظروف؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التواصل والتكوين.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'يحظر على عناصر الدورية الإدلاء بتصريحات ارتجالية أو تقديرات غير مؤكدة؛ التواصل الإعلامي محصور حصراً بالناطق الرسمي المخول أو النيابة العامة بعد التحقق والتدقيق الرسمي للأرقام والوقائع.',
      CompetencesAssociees = N'["التواصل المؤسساتي في الأزمات","واجب التحفظ وضوابط الإدلاء الإعلامي"]',
      SpecialitesAssociees = N'["SPEC-FORMATION","SPEC-PJ","SPEC-SEC-ADMIN"]',
      OrdreAffichage = 114,
      EstActive = 1
  WHERE QuestionId = 114 OR Code = 'Q-COM-114';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    114, 1, 8, 'Q-COM-114', N'في حادث انفجار غازي مأساوي في حي سكني، تجمع الصحفيون ومراسلو القنوات الفضائية في المكان يطالبون عناصر الدورية بتصريحات عاجلة حول عدد الضحايا والمسؤولين. ما هي القاعدة الصارمة للتواصل مع وسائل الإعلام في مثل هذه الظروف؟',
    N'سياق مهني عملياتي لتقييم كفاءات التواصل والتكوين.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'يحظر على عناصر الدورية الإدلاء بتصريحات ارتجالية أو تقديرات غير مؤكدة؛ التواصل الإعلامي محصور حصراً بالناطق الرسمي المخول أو النيابة العامة بعد التحقق والتدقيق الرسمي للأرقام والوقائع.', N'["التواصل المؤسساتي في الأزمات","واجب التحفظ وضوابط الإدلاء الإعلامي"]',
    N'["SPEC-FORMATION","SPEC-PJ","SPEC-SEC-ADMIN"]', 114, 1, 0, 1
  );
END;

-- Options de la question 114
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 114;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1141, 114, 'A', N'تقديم تخمينات شخصية عن أعداد الموتى بناء على الدخان المتصاعد', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1142, 114, 'B', N'الامتناع عن التصريح الفردي، توجيه الصحفيين باحترام إلى الخلية الإعلامية المخولة أو النيابة العامة، والتركيز على تأمين الطوق', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1143, 114, 'C', N'الاشتباك مع الكاميرات وتكسير أجهزة الصحفيين دون مبرر', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1144, 114, 'D', N'بث فيديو مباشر من الهاتف الشخصي لنيل الإعجابات على الإنترنت', 0);

-- Question 115: Q-COM-115 (COMMUNICATION_FORMATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 115 OR Code = 'Q-COM-115')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 8,
      Code = 'Q-COM-115',
      Enonce = N'عند إلقاء درس نظري لتلاميذ دركيين حول "قانون الأسلحة واستخدام القوة"، لاحظ المدرب تشتت انتباه نصف القسم ونعاس بعض المتدربين. ما التعديل البيداغوجي الأنسب لإعادة تنشيط القاعة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التواصل والتكوين.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الانتقال من الإلقاء التلقيني الأحادي إلى البيداغوجيا النشطة التفاعلية (طرح سيناريو واقعي، دراسة حالة عملية للمناقشة الجماعية، أو أسئلة موجهة سريعة) يعيد الحيوية واليقظة الذهنية فورياً.',
      CompetencesAssociees = N'["التنشيط البيداغوجي التفاعلي","إشراك المتعلمين ودراسة الحالات"]',
      SpecialitesAssociees = N'["SPEC-FORMATION","SPEC-SCIENTIFIQUE"]',
      OrdreAffichage = 115,
      EstActive = 1
  WHERE QuestionId = 115 OR Code = 'Q-COM-115';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    115, 1, 8, 'Q-COM-115', N'عند إلقاء درس نظري لتلاميذ دركيين حول "قانون الأسلحة واستخدام القوة"، لاحظ المدرب تشتت انتباه نصف القسم ونعاس بعض المتدربين. ما التعديل البيداغوجي الأنسب لإعادة تنشيط القاعة؟',
    N'سياق مهني عملياتي لتقييم كفاءات التواصل والتكوين.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'الانتقال من الإلقاء التلقيني الأحادي إلى البيداغوجيا النشطة التفاعلية (طرح سيناريو واقعي، دراسة حالة عملية للمناقشة الجماعية، أو أسئلة موجهة سريعة) يعيد الحيوية واليقظة الذهنية فورياً.', N'["التنشيط البيداغوجي التفاعلي","إشراك المتعلمين ودراسة الحالات"]',
    N'["SPEC-FORMATION","SPEC-SCIENTIFIQUE"]', 115, 1, 0, 1
  );
END;

-- Options de la question 115
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 115;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1151, 115, 'A', N'معاقبة جميع التلاميذ بالركض عشرة كيلومترات تحت الشمس الحارقة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1152, 115, 'B', N'كسر الروتين التلقيني بالانتقال لدراسة حالة واقعية تفاعلية (Etude de cas) وطرح تساؤلات تدعوهم لاتخاذ قرارات تكتيكية فورية', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1153, 115, 'C', N'إطفاء الأنوار وقراءة النص بصوت منخفض جداً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1154, 115, 'D', N'مغادرة قاعة الدرس وإنهاء التكوين للأبد', 0);

-- Question 116: Q-COM-116 (COMMUNICATION_FORMATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 116 OR Code = 'Q-COM-116')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 8,
      Code = 'Q-COM-116',
      Enonce = N'نشأ خلاف شخصي حاد بين عنصرين في نفس الدورية كاد يؤثر سلباً على التنسيق الميداني وأمن الفريق. بصفتك رئيساً للدورية، ما هو الإجراء الإداري والتواصلي الأقوم لمعالجة المشكل؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التواصل والتكوين.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'التدخل السريع عبر عقد جلسة حوار مغلقة ومنفردة مع الطرفين، تذكيرهما بروح الزمالة وأولوية أمن المهمة العسكرية على الخلافات الفردية، وحل النزاع بودية حازمة يمنع تفكك تماسك الدورية.',
      CompetencesAssociees = N'["إدارة النزاعات داخل الفريق","تماسك الوحدة والانضباط العسكري"]',
      SpecialitesAssociees = N'["SPEC-FORMATION","SPEC-PSIG","SPEC-SEC-ADMIN"]',
      OrdreAffichage = 116,
      EstActive = 1
  WHERE QuestionId = 116 OR Code = 'Q-COM-116';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    116, 1, 8, 'Q-COM-116', N'نشأ خلاف شخصي حاد بين عنصرين في نفس الدورية كاد يؤثر سلباً على التنسيق الميداني وأمن الفريق. بصفتك رئيساً للدورية، ما هو الإجراء الإداري والتواصلي الأقوم لمعالجة المشكل؟',
    N'سياق مهني عملياتي لتقييم كفاءات التواصل والتكوين.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'التدخل السريع عبر عقد جلسة حوار مغلقة ومنفردة مع الطرفين، تذكيرهما بروح الزمالة وأولوية أمن المهمة العسكرية على الخلافات الفردية، وحل النزاع بودية حازمة يمنع تفكك تماسك الدورية.', N'["إدارة النزاعات داخل الفريق","تماسك الوحدة والانضباط العسكري"]',
    N'["SPEC-FORMATION","SPEC-PSIG","SPEC-SEC-ADMIN"]', 116, 1, 0, 1
  );
END;

-- Options de la question 116
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 116;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1161, 116, 'A', N'تشجيعهما على الشجار بالأسلحة في ساحة الثكنة لتصفية الحسابات', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1162, 116, 'B', N'الاستماع لكل طرف على انفراد، التذكير الحازم بقدسية المهمة وروح الفريق، وتسوية الخلاف بمسؤولية لضمان التساند الميداني التام', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1163, 116, 'C', N'الانحياز فوراً لأحدهما ومعاقبة الآخر دون سماع حججه', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1164, 116, 'D', N'ترك الخلاف يتصاعد أثناء التدخل الميداني المشترك', 0);

-- Question 117: Q-COM-117 (COMMUNICATION_FORMATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 117 OR Code = 'Q-COM-117')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 8,
      Code = 'Q-COM-117',
      Enonce = N'في سياق التدخل المشترك بين مصالح الدرك الملكي، والوقاية المدنية، ومصالح المياه والغابات لمكافحة حريق غابوي واسع، ما هو العامل الحاسم في نجاح التنسيق العملياتي المشترك؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التواصل والتكوين.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'توحيد مركز القيادة الميداني (Poste de Commandement Conjoint)، تحديد لغة تواصل ومصطلحات موحدة، وضبط قنوات اتصال لاسلكية مشتركة وتوزيع الأدوار بدقة يمنع التضارب وازدواجية التدخلات.',
      CompetencesAssociees = N'["التنسيق المشترك بين القطاعات (Inter-agences)","إدارة مراكز القيادة المشتركة"]',
      SpecialitesAssociees = N'["SPEC-PSIG","SPEC-FORMATION","SPEC-SEC-ADMIN"]',
      OrdreAffichage = 117,
      EstActive = 1
  WHERE QuestionId = 117 OR Code = 'Q-COM-117';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    117, 1, 8, 'Q-COM-117', N'في سياق التدخل المشترك بين مصالح الدرك الملكي، والوقاية المدنية، ومصالح المياه والغابات لمكافحة حريق غابوي واسع، ما هو العامل الحاسم في نجاح التنسيق العملياتي المشترك؟',
    N'سياق مهني عملياتي لتقييم كفاءات التواصل والتكوين.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'توحيد مركز القيادة الميداني (Poste de Commandement Conjoint)، تحديد لغة تواصل ومصطلحات موحدة، وضبط قنوات اتصال لاسلكية مشتركة وتوزيع الأدوار بدقة يمنع التضارب وازدواجية التدخلات.', N'["التنسيق المشترك بين القطاعات (Inter-agences)","إدارة مراكز القيادة المشتركة"]',
    N'["SPEC-PSIG","SPEC-FORMATION","SPEC-SEC-ADMIN"]', 117, 1, 0, 1
  );
END;

-- Options de la question 117
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 117;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1171, 117, 'A', N'عمل كل جهاز بمعزل تام عن الأجهزة الأخرى ودون أي تبادل للمعلومات', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1172, 117, 'B', N'تفعيل مركز قيادة عملياتي موحد (PC Opérationnel) وتنسيق قنوات الاتصال وتحديد المهام بوضوح لكل متدخل', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1173, 117, 'C', N'التنافس على من يلتقط صورا أكثر للحريق لرفعها على الإنترنت', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1174, 117, 'D', N'انسحاب الجميع وانتظار هطول الأمطار وحدها', 0);

-- Question 118: Q-COM-118 (COMMUNICATION_FORMATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 118 OR Code = 'Q-COM-118')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 8,
      Code = 'Q-COM-118',
      Enonce = N'ما هو الأسلوب الصحيح لإعطاء "تغذية راجعة تقويمية" (Feedback constructif) لمتدرب أخطأ في الرماية أثناء حصة التكوين العسكري التخصصي؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التواصل والتكوين.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'التغذية الراجعة الفعالة تبدأ بذكر النقاط الإيجابية، ثم تحديد الخطأ بدقة ملموسة (مثل حركة الإصبع على الزناد أو وضعية التهديف)، وشرح وتطبيق الحركة الصحيحة فورياً مع تشجيع الثقة بالنفس.',
      CompetencesAssociees = N'["التقييم البيداغوجي البناء","تصحيح الأداء الحركي والمهاري"]',
      SpecialitesAssociees = N'["SPEC-FORMATION","SPEC-GSI"]',
      OrdreAffichage = 118,
      EstActive = 1
  WHERE QuestionId = 118 OR Code = 'Q-COM-118';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    118, 1, 8, 'Q-COM-118', N'ما هو الأسلوب الصحيح لإعطاء "تغذية راجعة تقويمية" (Feedback constructif) لمتدرب أخطأ في الرماية أثناء حصة التكوين العسكري التخصصي؟',
    N'سياق مهني عملياتي لتقييم كفاءات التواصل والتكوين.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'التغذية الراجعة الفعالة تبدأ بذكر النقاط الإيجابية، ثم تحديد الخطأ بدقة ملموسة (مثل حركة الإصبع على الزناد أو وضعية التهديف)، وشرح وتطبيق الحركة الصحيحة فورياً مع تشجيع الثقة بالنفس.', N'["التقييم البيداغوجي البناء","تصحيح الأداء الحركي والمهاري"]',
    N'["SPEC-FORMATION","SPEC-GSI"]', 118, 1, 0, 1
  );
END;

-- Options de la question 118
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 118;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1181, 118, 'A', N'القول له: "أنت فاشل ولن تصلح أبداً لحمل السلاح"', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1182, 118, 'B', N'تحديد الخطأ الحركي بدقة، تقديم النموذج الصحيح عملياً، وتشجيعه على إعادة المحاولة بتركيز وتصحيح التكنيك', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1183, 118, 'C', N'سحب السلاح منه فوراً وحرمانه من كل الحصص القادمة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1184, 118, 'D', N'إعطاؤه علامة 20/20 وتجاهل عدم إصابته للهدف', 0);

-- Question 119: Q-COM-119 (COMMUNICATION_FORMATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 119 OR Code = 'Q-COM-119')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 8,
      Code = 'Q-COM-119',
      Enonce = N'في التدبير التواصلي لمحادثات التفاوض الأمني مع شخص متحمس ومسلح في حالة حصار، ما هو الهدف الأساسي من استخدام تقنية "إعادة الصياغة" (La reformulation) لتصريحاته؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التواصل والتكوين.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'إعادة صياغة ما يقوله الشخص بعبارات هادئة تثبت له أنه مسموع ومفهوم، وتخفف حدة الاحتقان العصبي، وتمنح المفاوضين وقتاً ثميناً للتحكم في وتيرة الحوار واستيعاب مطالبه الحقيقية.',
      CompetencesAssociees = N'["التفاوض في الأزمات وحالات احتجاز الرهائن","بناء جسور التواصل تحت التهديد"]',
      SpecialitesAssociees = N'["SPEC-GSI","SPEC-FORMATION","SPEC-PJ"]',
      OrdreAffichage = 119,
      EstActive = 1
  WHERE QuestionId = 119 OR Code = 'Q-COM-119';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    119, 1, 8, 'Q-COM-119', N'في التدبير التواصلي لمحادثات التفاوض الأمني مع شخص متحمس ومسلح في حالة حصار، ما هو الهدف الأساسي من استخدام تقنية "إعادة الصياغة" (La reformulation) لتصريحاته؟',
    N'سياق مهني عملياتي لتقييم كفاءات التواصل والتكوين.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'إعادة صياغة ما يقوله الشخص بعبارات هادئة تثبت له أنه مسموع ومفهوم، وتخفف حدة الاحتقان العصبي، وتمنح المفاوضين وقتاً ثميناً للتحكم في وتيرة الحوار واستيعاب مطالبه الحقيقية.', N'["التفاوض في الأزمات وحالات احتجاز الرهائن","بناء جسور التواصل تحت التهديد"]',
    N'["SPEC-GSI","SPEC-FORMATION","SPEC-PJ"]', 119, 1, 0, 1
  );
END;

-- Options de la question 119
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 119;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1191, 119, 'A', N'الاستهزاء بكلامه وتكراره بنبرة ساخرة لإغاظته', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1192, 119, 'B', N'إشعاره بأنه مسموع وتفكيك شحنة التوتر، وبناء الثقة التدريجية وكسب الوقت الحيوي للسيطرة على الأزمة سلمياً', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1193, 119, 'C', N'الاعتراف له بارتكاب جميع الجرائم التي ينسبها للدولة فوراً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1194, 119, 'D', N'إغلاق خط الهاتف التفاوضي في وجهه كل دقيقتين', 0);

-- Question 120: Q-COM-120 (COMMUNICATION_FORMATION)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 120 OR Code = 'Q-COM-120')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 8,
      Code = 'Q-COM-120',
      Enonce = N'عند إعداد وتقديم تقرير شفوي موجز (Briefing opérationnel) للدورية قبل الانطلاق في مهمة مداهمة ليلية، ما هي العناصر الأربعة الحيوية التي يجب تلخيصها بوضوح وقوة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات التواصل والتكوين.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الإيجاز التكتيكي القياسي (طريقة SMEAC أو الإيجاز العملياتي) يلخص: الهدف من العملية، معلومات العدو/التهديد، خطة التحرك والمهام الفردية، وقواعد فتح النار والاتصال والتدخل الطبي الاستعجالي.',
      CompetencesAssociees = N'["تقديم الإيجاز العملياتي (Operational Briefing)","الوضوح والتركيز القيادي"]',
      SpecialitesAssociees = N'["SPEC-PSIG","SPEC-FORMATION","SPEC-GEH"]',
      OrdreAffichage = 120,
      EstActive = 1
  WHERE QuestionId = 120 OR Code = 'Q-COM-120';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    120, 1, 8, 'Q-COM-120', N'عند إعداد وتقديم تقرير شفوي موجز (Briefing opérationnel) للدورية قبل الانطلاق في مهمة مداهمة ليلية، ما هي العناصر الأربعة الحيوية التي يجب تلخيصها بوضوح وقوة؟',
    N'سياق مهني عملياتي لتقييم كفاءات التواصل والتكوين.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'الإيجاز التكتيكي القياسي (طريقة SMEAC أو الإيجاز العملياتي) يلخص: الهدف من العملية، معلومات العدو/التهديد، خطة التحرك والمهام الفردية، وقواعد فتح النار والاتصال والتدخل الطبي الاستعجالي.', N'["تقديم الإيجاز العملياتي (Operational Briefing)","الوضوح والتركيز القيادي"]',
    N'["SPEC-PSIG","SPEC-FORMATION","SPEC-GEH"]', 120, 1, 0, 1
  );
END;

-- Options de la question 120
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 120;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1201, 120, 'A', N'أسعار وقود السيارات، وتاريخ بناء الثكنة، ووجبة الغداء للغد', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1202, 120, 'B', N'الهدف المحدد للمهمة، طبيعة التهديد، توزيع المهام التكتيكية على الأفراد، وقواعد الاشتباك والأمان والإخلاء الطبي', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1203, 120, 'C', N'قراءة رواية بوليسية كاملة على الأفراد لتشويقهم', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1204, 120, 'D', N'الطلب من الجميع الانطلاق دون أي توجيه أو شرح للخطة', 0);

-- Question 121: Q-ADM-121 (ADMINISTRATION_SECRETARIAT)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 121 OR Code = 'Q-ADM-121')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 9,
      Code = 'Q-ADM-121',
      Enonce = N'في المراسلات العسكرية الرسمية للدرك الملكي، ما هو الترتيب الإلزامي لرفع التقارير والطلبات الإدارية الموجهة إلى القيادة العليا لتفادي التجاوز الإداري والانضباطي؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الإدارة والسكرتارية.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'القاعدة العسكرية الصارمة تفرض رفع كافة المراسلات والتقارير عبر السلم الإداري الهرمي المتدرج (Par la voie hiérarchique) من الرئيس المباشر إلى قائد السرية وصولاً للقيادة، ويحظر القفز فوق الرؤساء المباشرين.',
      CompetencesAssociees = N'["قواعد التحرير الإداري العسكري","احترام السلم والتسلسل الإداري الهرمي (Voie hiérarchique)"]',
      SpecialitesAssociees = N'["SPEC-SEC-ADMIN","SPEC-FORMATION"]',
      OrdreAffichage = 121,
      EstActive = 1
  WHERE QuestionId = 121 OR Code = 'Q-ADM-121';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    121, 1, 9, 'Q-ADM-121', N'في المراسلات العسكرية الرسمية للدرك الملكي، ما هو الترتيب الإلزامي لرفع التقارير والطلبات الإدارية الموجهة إلى القيادة العليا لتفادي التجاوز الإداري والانضباطي؟',
    N'سياق مهني عملياتي لتقييم كفاءات الإدارة والسكرتارية.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'القاعدة العسكرية الصارمة تفرض رفع كافة المراسلات والتقارير عبر السلم الإداري الهرمي المتدرج (Par la voie hiérarchique) من الرئيس المباشر إلى قائد السرية وصولاً للقيادة، ويحظر القفز فوق الرؤساء المباشرين.', N'["قواعد التحرير الإداري العسكري","احترام السلم والتسلسل الإداري الهرمي (Voie hiérarchique)"]',
    N'["SPEC-SEC-ADMIN","SPEC-FORMATION"]', 121, 1, 0, 1
  );
END;

-- Options de la question 121
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 121;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1211, 121, 'A', N'إرسال الرسالة مباشرة عبر بريد إلكتروني عام إلى وزير العدل دون إشعار أحد', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1212, 121, 'B', N'المرور الإلزامي عبر السلم الإداري الهرمي المتدرج (Voie hiérarchique) وتأشيرة الرئيس المباشر', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1213, 121, 'C', N'تسليم الرسالة لسائق حافلة لنقلها يدوياً للرباط', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1214, 121, 'D', N'نشر المراسلة في لوحة الإعلانات بمدخل الثكنة لإشراك الجميع', 0);

-- Question 122: Q-ADM-122 (ADMINISTRATION_SECRETARIAT)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 122 OR Code = 'Q-ADM-122')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 9,
      Code = 'Q-ADM-122',
      Enonce = N'وصلت إلى مكتب السكرتارية وثيقة إدارية مختومة بعبارة "سري للغاية - دفاع وطني" (Très Secret Défense). ما هو الإجراء البروتوكولي الخاص للتعامل مع هذه الوثيقة وتداولها؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الإدارة والسكرتارية.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الوثائق المصنفة في درجة "سري للغاية" تسجل في سجل خاص بالبريد السري، تسلم حصراً باليد للقائد الموجهة إليه، تحفظ داخل خزنة حديدية مصفحة ومغلقة برمز سري، ويحظر نسخها أو تصويرها قطعياً.',
      CompetencesAssociees = N'["تصنيف الوثائق وحماية أسرار الدفاع","إدارة البريد السري والحفظ المحصن"]',
      SpecialitesAssociees = N'["SPEC-SEC-ADMIN","SPEC-INFO","SPEC-PJ"]',
      OrdreAffichage = 122,
      EstActive = 1
  WHERE QuestionId = 122 OR Code = 'Q-ADM-122';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    122, 1, 9, 'Q-ADM-122', N'وصلت إلى مكتب السكرتارية وثيقة إدارية مختومة بعبارة "سري للغاية - دفاع وطني" (Très Secret Défense). ما هو الإجراء البروتوكولي الخاص للتعامل مع هذه الوثيقة وتداولها؟',
    N'سياق مهني عملياتي لتقييم كفاءات الإدارة والسكرتارية.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'الوثائق المصنفة في درجة "سري للغاية" تسجل في سجل خاص بالبريد السري، تسلم حصراً باليد للقائد الموجهة إليه، تحفظ داخل خزنة حديدية مصفحة ومغلقة برمز سري، ويحظر نسخها أو تصويرها قطعياً.', N'["تصنيف الوثائق وحماية أسرار الدفاع","إدارة البريد السري والحفظ المحصن"]',
    N'["SPEC-SEC-ADMIN","SPEC-INFO","SPEC-PJ"]', 122, 1, 0, 1
  );
END;

-- Options de la question 122
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 122;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1221, 122, 'A', N'تصويرها بالهاتف وتوزيعها على الزملاء للاستفادة العامة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1222, 122, 'B', N'تسجيلها في سجل البريد السري الخاص، تسليمها يدوياً ومباشرة للقائد المعني، وحفظها في خزنة مصفحة محكمة الإغلاق مع حظر النسخ', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1223, 122, 'C', N'تركها فوق مكتب الاستقبال ليتصفحها الزوار في انتظار موعدهم', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1224, 122, 'D', N'رميها في سلة الورق بعد قراءتها مباشرة', 0);

-- Question 123: Q-ADM-123 (ADMINISTRATION_SECRETARIAT)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 123 OR Code = 'Q-ADM-123')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 9,
      Code = 'Q-ADM-123',
      Enonce = N'ما هو الدور التنظيمي لـ "سجل البريد الوارد والصادر" (Registre du courrier arrivée / départ)، وما هي البيانات الخمسة الجوهرية الواجب تدوينها لكل إرسالية واردة؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الإدارة والسكرتارية.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'سجل البريد يضمن تتبع حركة الوثائق؛ والبيانات الجوهرية هي: الرقم الترتيبي، تاريخ وساعة الورود، الجهة المرسلة، موضوع الإرسالية وملخصها، والمصلحة أو الضابط المكلف بالإنجاز.',
      CompetencesAssociees = N'["إدارة وضبط تدفق المراسلات الإدارية","التوثيق والأرشفة المكتبية"]',
      SpecialitesAssociees = N'["SPEC-SEC-ADMIN","SPEC-PJ"]',
      OrdreAffichage = 123,
      EstActive = 1
  WHERE QuestionId = 123 OR Code = 'Q-ADM-123';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    123, 1, 9, 'Q-ADM-123', N'ما هو الدور التنظيمي لـ "سجل البريد الوارد والصادر" (Registre du courrier arrivée / départ)، وما هي البيانات الخمسة الجوهرية الواجب تدوينها لكل إرسالية واردة؟',
    N'سياق مهني عملياتي لتقييم كفاءات الإدارة والسكرتارية.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'سجل البريد يضمن تتبع حركة الوثائق؛ والبيانات الجوهرية هي: الرقم الترتيبي، تاريخ وساعة الورود، الجهة المرسلة، موضوع الإرسالية وملخصها، والمصلحة أو الضابط المكلف بالإنجاز.', N'["إدارة وضبط تدفق المراسلات الإدارية","التوثيق والأرشفة المكتبية"]',
    N'["SPEC-SEC-ADMIN","SPEC-PJ"]', 123, 1, 0, 1
  );
END;

-- Options de la question 123
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 123;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1231, 123, 'A', N'لون غلاف الرسالة، وحجم الطابع البريدي، واسم ساعي البريد فقط', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1232, 123, 'B', N'الرقم الترتيبي للوارد، تاريخ وتوقيت الاستلام، جهة الإرسال، الموضوع المختصر، وتوجيه الإحالة مع توقيع المستلم', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1233, 123, 'C', N'تسجيل وزن الرسالة بالكيلوغرام فقط دون فتحها', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1234, 123, 'D', N'لا يسجل إلا البريد القادم من الشركات التجارية فقط', 0);

-- Question 124: Q-ADM-124 (ADMINISTRATION_SECRETARIAT)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 124 OR Code = 'Q-ADM-124')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 9,
      Code = 'Q-ADM-124',
      Enonce = N'أثناء مراجعة وتدقيق "سجل الأسلحة والذخيرة" الخاص بالوحدة، تبين وجود نقص طلقة واحدة عيار 9 ملم في رصيد نهاية اليوم مقارنة مع حركة الخروج والدخول المسجلة. ما هو المسار الإداري والتأديبي الواجب اتباعه فوراً؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الإدارة والسكرتارية.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الذخيرة العسكرية تخضع لمراقبة ومحاسبة صارمة لا تقبل أي تساهل؛ يجب تحرير محضر إثبات فارق فوري، إشعار رئيس الوحدة وقائد السرية، وإجراء تحقيق داخلي شامل لتحديد مسؤولية الفقدان.',
      CompetencesAssociees = N'["جرد العتاد العسكري الحساس","المسؤولية الإدارية والمحاسبية عن الأسلحة والذخائر"]',
      SpecialitesAssociees = N'["SPEC-SEC-ADMIN","SPEC-PSIG","SPEC-PJ"]',
      OrdreAffichage = 124,
      EstActive = 1
  WHERE QuestionId = 124 OR Code = 'Q-ADM-124';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    124, 1, 9, 'Q-ADM-124', N'أثناء مراجعة وتدقيق "سجل الأسلحة والذخيرة" الخاص بالوحدة، تبين وجود نقص طلقة واحدة عيار 9 ملم في رصيد نهاية اليوم مقارنة مع حركة الخروج والدخول المسجلة. ما هو المسار الإداري والتأديبي الواجب اتباعه فوراً؟',
    N'سياق مهني عملياتي لتقييم كفاءات الإدارة والسكرتارية.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'الذخيرة العسكرية تخضع لمراقبة ومحاسبة صارمة لا تقبل أي تساهل؛ يجب تحرير محضر إثبات فارق فوري، إشعار رئيس الوحدة وقائد السرية، وإجراء تحقيق داخلي شامل لتحديد مسؤولية الفقدان.', N'["جرد العتاد العسكري الحساس","المسؤولية الإدارية والمحاسبية عن الأسلحة والذخائر"]',
    N'["SPEC-SEC-ADMIN","SPEC-PSIG","SPEC-PJ"]', 124, 1, 0, 1
  );
END;

-- Options de la question 124
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 124;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1241, 124, 'A', N'شراء طلقة من السوق السوداء لتعويض النقص في السجل سراً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1242, 124, 'B', N'تحرير تقرير إثبات حالة فوري، وإشعار القيادة والتسلسل الهرمي، وفتح بحث إداري وتدقيق شامل لتحديد أسباب النقص والمسؤوليات', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1243, 124, 'C', N'تعديل الأرقام في السجل بالقلم الأبيض ومحو الواقعة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1244, 124, 'D', N'اعتبار طلقة واحدة مسألة تافهة لا تستحق أي إشعار أو تسجيل', 0);

-- Question 125: Q-ADM-125 (ADMINISTRATION_SECRETARIAT)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 125 OR Code = 'Q-ADM-125')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 9,
      Code = 'Q-ADM-125',
      Enonce = N'وفق القواعد المعمول بها في حفظ الأرشيف القضائي والإداري بمراكز الدرك، كيف يتم التعامل مع الملفات والمحاضر القديمة التي استوفت مدة الحفظ القانونية المحددة في النظام؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات الإدارة والسكرتارية.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'لا يجوز إتلاف أي وثيقة تلقائياً؛ يجب تشكيل لجنة جرد رسمية مختصة، إعداد جدول إحصائي تفصيلي، والحصول على تأشيرة الإتلاف أو الترحيل للأرشيف المركزي من النيابة العامة والقيادة العليا.',
      CompetencesAssociees = N'["تدبير الأرشيف والتقادم الإداري","المساطر القانونية لإتلاف وحفظ الوثائق"]',
      SpecialitesAssociees = N'["SPEC-SEC-ADMIN","SPEC-SCIENTIFIQUE","SPEC-PJ"]',
      OrdreAffichage = 125,
      EstActive = 1
  WHERE QuestionId = 125 OR Code = 'Q-ADM-125';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    125, 1, 9, 'Q-ADM-125', N'وفق القواعد المعمول بها في حفظ الأرشيف القضائي والإداري بمراكز الدرك، كيف يتم التعامل مع الملفات والمحاضر القديمة التي استوفت مدة الحفظ القانونية المحددة في النظام؟',
    N'سياق مهني عملياتي لتقييم كفاءات الإدارة والسكرتارية.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'لا يجوز إتلاف أي وثيقة تلقائياً؛ يجب تشكيل لجنة جرد رسمية مختصة، إعداد جدول إحصائي تفصيلي، والحصول على تأشيرة الإتلاف أو الترحيل للأرشيف المركزي من النيابة العامة والقيادة العليا.', N'["تدبير الأرشيف والتقادم الإداري","المساطر القانونية لإتلاف وحفظ الوثائق"]',
    N'["SPEC-SEC-ADMIN","SPEC-SCIENTIFIQUE","SPEC-PJ"]', 125, 1, 0, 1
  );
END;

-- Options de la question 125
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 125;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1251, 125, 'A', N'إحراق الملفات في برميل بباحة الثكنة دون إذن أو جرد', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1252, 125, 'B', N'جرد الملفات في قوائم رسمية بواسطة لجنة مختصة وعرضها على القيادة والسلطة القضائية للترخيص بالترحيل للأرشيف النهائي أو الإتلاف المقنن', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1253, 125, 'C', N'بيع الملفات لمحلات التغليف للاستفادة من ثمن الورق', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1254, 125, 'D', N'توزيع المحاضر القديمة على السكان كهدية تذكارية', 0);

-- Question 126: Q-DIS-126 (DISCIPLINE_SITUATION_PRO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 126 OR Code = 'Q-DIS-126')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 10,
      Code = 'Q-DIS-126',
      Enonce = N'أثناء قيامك بمراقبة روتينية للمرور، ارتكب سائق ميسور مخالفة جسيمة وتجاوز السرعة القانونية، وعند مطالبته بالوثائق دس خلسة ورقة نقدية من فئة 200 درهم داخل رخصة السياقة قائلاً: "خذ هذا المبلغ واشرب به قهوة ودعني أمر دون تسجيل مخالفة". ما هو الموقف الفوري الواجب اتخاذه؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'محاولة إرشاء موظف عمومي أثناء مزاولة مهامه جريمة رشوة معاقب عليها جنائياً في حالة تلبس؛ يجب الرفض الحازم للمبلغ، حجز الورقة النقدية كدليل إثبات، إشعار النيابة العامة وتوقيف السائق وتحرير محضر بجريمة الرشوة بالإضافة للمخالفة الطرقية.',
      CompetencesAssociees = N'["النزاهة ومكافحة الرشوة والفساد","تحرير محاضر التلبس الجنائي ضد الراشين"]',
      SpecialitesAssociees = N'["SPEC-ROUTE","SPEC-PJ","SPEC-MOTARD"]',
      OrdreAffichage = 126,
      EstActive = 1
  WHERE QuestionId = 126 OR Code = 'Q-DIS-126';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    126, 1, 10, 'Q-DIS-126', N'أثناء قيامك بمراقبة روتينية للمرور، ارتكب سائق ميسور مخالفة جسيمة وتجاوز السرعة القانونية، وعند مطالبته بالوثائق دس خلسة ورقة نقدية من فئة 200 درهم داخل رخصة السياقة قائلاً: "خذ هذا المبلغ واشرب به قهوة ودعني أمر دون تسجيل مخالفة". ما هو الموقف الفوري الواجب اتخاذه؟',
    N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'محاولة إرشاء موظف عمومي أثناء مزاولة مهامه جريمة رشوة معاقب عليها جنائياً في حالة تلبس؛ يجب الرفض الحازم للمبلغ، حجز الورقة النقدية كدليل إثبات، إشعار النيابة العامة وتوقيف السائق وتحرير محضر بجريمة الرشوة بالإضافة للمخالفة الطرقية.', N'["النزاهة ومكافحة الرشوة والفساد","تحرير محاضر التلبس الجنائي ضد الراشين"]',
    N'["SPEC-ROUTE","SPEC-PJ","SPEC-MOTARD"]', 126, 1, 0, 1
  );
END;

-- Options de la question 126
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 126;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1261, 126, 'A', N'أخذ المبلغ ووضعه في الجيب والتغاضي عن المخالفة إكراماً له', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1262, 126, 'B', N'الرفض القاطع، حجز المبلغ المالي كحرز إثبات، وتوقيف السائق في حالة تلبس بجريمة محاولة الإرشاء وإشعار النيابة العامة فوراً', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1263, 126, 'C', N'التفاوض معه لطلب مبلغ أكبر كألف درهم', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1264, 126, 'D', N'إرجاع المال له والاعتذار له عن إزعاجه في الطريق', 0);

-- Question 127: Q-DIS-127 (DISCIPLINE_SITUATION_PRO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 127 OR Code = 'Q-DIS-127')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 10,
      Code = 'Q-DIS-127',
      Enonce = N'ما هو الموقف القانوني والانضباطي للدركي إذا تلقى أمراً صريحاً من رئيسه المباشر يخالف بوضوح لا لبس فيه القانون الجنائي (مثل أمر بتعذيب متهم أو تزوير محضر رسمي)؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'AVANCE',
      Points = 2,
      TempsLimiteSecondes = 90,
      Explication = N'وفق القواعد العسكرية وحقوق الإنسان والقانون الجنائي: الطاعة واجبة للأوامر المشروعة، لكن تجب التفرقة حيث يُلزم المرؤوس برفض تنفيذ أي أمر غير مشروع بوضوح يشكل جناية أو يمس بالكرامة الإنسانية، ولا يعتد بالدفع بأمر الرئيس في جرائم التعذيب.',
      CompetencesAssociees = N'["حدود الطاعة العسكرية والمشروعية القانونية","رفض الأوامر غير المشروعة الصريحة"]',
      SpecialitesAssociees = N'["SPEC-SCIENTIFIQUE","SPEC-PJ","SPEC-FORMATION"]',
      OrdreAffichage = 127,
      EstActive = 1
  WHERE QuestionId = 127 OR Code = 'Q-DIS-127';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    127, 1, 10, 'Q-DIS-127', N'ما هو الموقف القانوني والانضباطي للدركي إذا تلقى أمراً صريحاً من رئيسه المباشر يخالف بوضوح لا لبس فيه القانون الجنائي (مثل أمر بتعذيب متهم أو تزوير محضر رسمي)؟',
    N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.', 'QCM_UNIQUE', 'AVANCE', 2,
    90, N'وفق القواعد العسكرية وحقوق الإنسان والقانون الجنائي: الطاعة واجبة للأوامر المشروعة، لكن تجب التفرقة حيث يُلزم المرؤوس برفض تنفيذ أي أمر غير مشروع بوضوح يشكل جناية أو يمس بالكرامة الإنسانية، ولا يعتد بالدفع بأمر الرئيس في جرائم التعذيب.', N'["حدود الطاعة العسكرية والمشروعية القانونية","رفض الأوامر غير المشروعة الصريحة"]',
    N'["SPEC-SCIENTIFIQUE","SPEC-PJ","SPEC-FORMATION"]', 127, 1, 0, 1
  );
END;

-- Options de la question 127
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 127;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1271, 127, 'A', N'تنفيذ الأمر غير المشروع فوراً وبحماس لأن الرئيس هو المسؤول وحده', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1272, 127, 'B', N'رفض تنفيذ الأمر غير المشروع الصريح، والتذكير بالقانون، وإشعار القيادة العليا فوراً لأن إطاعة أمر يشكل جريمة لا تعفي من المسؤولية الجنائية', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1273, 127, 'C', N'مساعدة الرئيس في التزوير ثم ابتزازه لاحقاً لطلب ترقية', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1274, 127, 'D', N'الهروب من الخدمة العسكرية كلياً والسفر للخارج', 0);

-- Question 128: Q-DIS-128 (DISCIPLINE_SITUATION_PRO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 128 OR Code = 'Q-DIS-128')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 10,
      Code = 'Q-DIS-128',
      Enonce = N'قام دركي خارج أوقات خدمته بنشر صور وفيديوهات على حسابه الشخصي في تطبيق (تيك توك / إنستغرام) يظهر فيها بزيه العسكري الكامل مع سلاحه الوظيفي داخل الثكنة ويؤدي حركات استعراضية لجلب المتابعين. كيف يصنف هذا الفعل انضباطياً؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'هذا الفعل يشكل خرقاً جسيماً لواجب التحفظ والانضباط العسكري وإفشاء لمعالم منشأة أمنية، ويعاقب عليه تأديبياً بعقوبات صارمة قد تصل للتوقيف أو الإحالة على المجلس التأديبي.',
      CompetencesAssociees = N'["واجب التحفظ العسكري (Devoir de réserve)","ضوابط استخدام منصات التواصل الاجتماعي"]',
      SpecialitesAssociees = N'["SPEC-FORMATION","SPEC-SEC-ADMIN","SPEC-INFO"]',
      OrdreAffichage = 128,
      EstActive = 1
  WHERE QuestionId = 128 OR Code = 'Q-DIS-128';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    128, 1, 10, 'Q-DIS-128', N'قام دركي خارج أوقات خدمته بنشر صور وفيديوهات على حسابه الشخصي في تطبيق (تيك توك / إنستغرام) يظهر فيها بزيه العسكري الكامل مع سلاحه الوظيفي داخل الثكنة ويؤدي حركات استعراضية لجلب المتابعين. كيف يصنف هذا الفعل انضباطياً؟',
    N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'هذا الفعل يشكل خرقاً جسيماً لواجب التحفظ والانضباط العسكري وإفشاء لمعالم منشأة أمنية، ويعاقب عليه تأديبياً بعقوبات صارمة قد تصل للتوقيف أو الإحالة على المجلس التأديبي.', N'["واجب التحفظ العسكري (Devoir de réserve)","ضوابط استخدام منصات التواصل الاجتماعي"]',
    N'["SPEC-FORMATION","SPEC-SEC-ADMIN","SPEC-INFO"]', 128, 1, 0, 1
  );
END;

-- Options de la question 128
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 128;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1281, 128, 'A', N'تصرف حديث ومستحب يعزز صورة المؤسسة العسكرية في الفن والترفيه', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1282, 128, 'B', N'إخلال جسيم بواجب التحفظ والسر المهني العسكري واستغلال غير مصرح به للزي والسلاح، يستوجب المتابعة التأديبية الصارمة', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1283, 128, 'C', N'نشاط تجاري مسموح به إذا حصل على أكثر من مليون إعجاب', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1284, 128, 'D', N'مبادرة شخصية يستحق عليها منحة تشجيعية مالية', 0);

-- Question 129: Q-DIS-129 (DISCIPLINE_SITUATION_PRO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 129 OR Code = 'Q-DIS-129')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 10,
      Code = 'Q-DIS-129',
      Enonce = N'أثناء شجار عائلي أو نزاع مدني بين جيران في الحي الذي يسكن فيه الدركي خارج أوقات العمل، طلب منه أحد أقاربه التدخل بصفته الدركية للضغط على الطرف الآخر وترهيبه. ما هو السلوك الأخلاقي والمهني السليم؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'استغلال الصفة الرسمية أو النفوذ العسكري لصالح مصالح شخصية أو قرابات عائلية ممنوع منعاً كلياً؛ يجب الالتزام بالحياد التام وتوجيه النزاع عبر القنوات القانونية المعتمدة لدى مركز الدرك المختص ترابياً.',
      CompetencesAssociees = N'["الحياد والنزاهة وتفادي تضارب المصالح","حظر استغلال الصفة والنفوذ الوظيفي"]',
      SpecialitesAssociees = N'["SPEC-SCIENTIFIQUE","SPEC-PJ","SPEC-FORMATION"]',
      OrdreAffichage = 129,
      EstActive = 1
  WHERE QuestionId = 129 OR Code = 'Q-DIS-129';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    129, 1, 10, 'Q-DIS-129', N'أثناء شجار عائلي أو نزاع مدني بين جيران في الحي الذي يسكن فيه الدركي خارج أوقات العمل، طلب منه أحد أقاربه التدخل بصفته الدركية للضغط على الطرف الآخر وترهيبه. ما هو السلوك الأخلاقي والمهني السليم؟',
    N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'استغلال الصفة الرسمية أو النفوذ العسكري لصالح مصالح شخصية أو قرابات عائلية ممنوع منعاً كلياً؛ يجب الالتزام بالحياد التام وتوجيه النزاع عبر القنوات القانونية المعتمدة لدى مركز الدرك المختص ترابياً.', N'["الحياد والنزاهة وتفادي تضارب المصالح","حظر استغلال الصفة والنفوذ الوظيفي"]',
    N'["SPEC-SCIENTIFIQUE","SPEC-PJ","SPEC-FORMATION"]', 129, 1, 0, 1
  );
END;

-- Options de la question 129
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 129;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1291, 129, 'A', N'ارتداء الزي العسكري والذهاب لتهديد الطرف الآخر بالحبس لنصرة قريبه', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1292, 129, 'B', N'رفض استغلال الصفة الوظيفية تماماً، والالتزام بالحياد التام وتوجيه النزاع للمصالح المختصة قانونياً كأي مواطن عادي', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1293, 129, 'C', N'حجز سيارة الجيران كعقاب لهم دون أي مسطرة قضائية', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1294, 129, 'D', N'إغلاق الشارع بسيارة الخدمة لحسم الخلاف لصالحه', 0);

-- Question 130: Q-DIS-130 (DISCIPLINE_SITUATION_PRO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 130 OR Code = 'Q-DIS-130')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 10,
      Code = 'Q-DIS-130',
      Enonce = N'عند التعامل مع موقوف تحت الحراسة النظرية يستفز عناصر الدورية بكلمات نابية وسوقية، ما هي الحدود الأخلاقية والمهنية لاستخدام القوة والتعامل مع هذا الموقوف؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'القانون يحظر استخدام أي عنف جسدي أو لفظي أو تعذيب ضد موقوف؛ يجب ضبط النفس الثابت، تصفيده إن شكل خطراً، وتدوين سبابه وإهانته لموظف أثناء أداء مهامه بمحضر قضائي مستقل لإحالته على العدالة.',
      CompetencesAssociees = N'["ضبط النفس والتحكم الانفعالي","حظر المعاملة القاسية والمهينة للموقوفين"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE","SPEC-PSIG"]',
      OrdreAffichage = 130,
      EstActive = 1
  WHERE QuestionId = 130 OR Code = 'Q-DIS-130';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    130, 1, 10, 'Q-DIS-130', N'عند التعامل مع موقوف تحت الحراسة النظرية يستفز عناصر الدورية بكلمات نابية وسوقية، ما هي الحدود الأخلاقية والمهنية لاستخدام القوة والتعامل مع هذا الموقوف؟',
    N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'القانون يحظر استخدام أي عنف جسدي أو لفظي أو تعذيب ضد موقوف؛ يجب ضبط النفس الثابت، تصفيده إن شكل خطراً، وتدوين سبابه وإهانته لموظف أثناء أداء مهامه بمحضر قضائي مستقل لإحالته على العدالة.', N'["ضبط النفس والتحكم الانفعالي","حظر المعاملة القاسية والمهينة للموقوفين"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE","SPEC-PSIG"]', 130, 1, 0, 1
  );
END;

-- Options de la question 130
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 130;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1301, 130, 'A', N'الانهيال عليه بالضرب المبرح لتأديبه وإجباره على الاحترام', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1302, 130, 'B', N'التحلي بأعلى درجات ضبط النفس، الامتناع التام عن أي عنف جسدي أو معنوي، وتوثيق واقعة الإهانة بمحضر قضائي مستقل', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1303, 130, 'C', N'حرمانه من مياه الشرب والطعام لثلاثة أيام متتالية كعقوبة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1304, 130, 'D', N'مبادلته نفس الألفاظ النابية بصوت أعلى أمام زملائه', 0);

-- Question 131: Q-DIS-131 (DISCIPLINE_SITUATION_PRO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 131 OR Code = 'Q-DIS-131')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 10,
      Code = 'Q-DIS-131',
      Enonce = N'ما هي الأهمية الانضباطية لأداء "التحية العسكرية" النظامية (Salut militaire) بين الرتب المختلفة داخل مؤسسة الدرك الملكي؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'التحية العسكرية ليست مجرد حركة ميكانيكية، بل هي تعبير أصيل عن الاحترام المتبادل، والولاء للمؤسسة العسكرية، ورمز للخضوع للواجب الوطني وروح الانضباط والتراتبية الهرمية.',
      CompetencesAssociees = N'["التقاليد والأعراف العسكرية الأصيلة","احترام التراتبية وتجسيد وحدة القوات"]',
      SpecialitesAssociees = N'["SPEC-GEH","SPEC-FORMATION","SPEC-PSIG"]',
      OrdreAffichage = 131,
      EstActive = 1
  WHERE QuestionId = 131 OR Code = 'Q-DIS-131';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    131, 1, 10, 'Q-DIS-131', N'ما هي الأهمية الانضباطية لأداء "التحية العسكرية" النظامية (Salut militaire) بين الرتب المختلفة داخل مؤسسة الدرك الملكي؟',
    N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'التحية العسكرية ليست مجرد حركة ميكانيكية، بل هي تعبير أصيل عن الاحترام المتبادل، والولاء للمؤسسة العسكرية، ورمز للخضوع للواجب الوطني وروح الانضباط والتراتبية الهرمية.', N'["التقاليد والأعراف العسكرية الأصيلة","احترام التراتبية وتجسيد وحدة القوات"]',
    N'["SPEC-GEH","SPEC-FORMATION","SPEC-PSIG"]', 131, 1, 0, 1
  );
END;

-- Options de la question 131
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 131;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1311, 131, 'A', N'حركة اختيارية يمكن الاستغناء عنها إذا كان الجو حاراً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1312, 131, 'B', N'واجب انضباطي مقدس يعكس الاحترام المتبادل، والاعتراف بالرتبة، وتماسك السلم الهرمي للمؤسسة العسكرية', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1313, 131, 'C', N'تؤدى فقط عند وجود كاميرات تصوير تلفزيونية', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1314, 131, 'D', N'تقتصر فقط على الضباط الكبار دون ضباط الصف والجنود', 0);

-- Question 132: Q-DIS-132 (DISCIPLINE_SITUATION_PRO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 132 OR Code = 'Q-DIS-132')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 10,
      Code = 'Q-DIS-132',
      Enonce = N'أثناء حضورك مجلساً خاصاً مع أصدقاء مدنيين، دار الحديث حول تفاصيل عملية نوعية نفذتها فرقة الدرك الملكي مؤخراً ولم تنشر في وسائل الإعلام. حاول الأصدقاء استدراجك لكشف تفاصيل وخطة التدخل. كيف تتصرف التزاماً بـ "السر المهني"؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'السر المهني والأمني التزام أخلاقي وقانوني يرافق الدركي مدى الحياة؛ يحظر إفشاء أي تفاصيل عملياتية خارج إطار الخدمة، ويجب تحويل مجرى الحديث بلباقة وحزم مع التأكيد على سرية المهام.',
      CompetencesAssociees = N'["الحفاظ على أسرار الدفاع والسر المهني","الحصانة ضد الاستدراج الكلامي"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-FORMATION","SPEC-PSIG"]',
      OrdreAffichage = 132,
      EstActive = 1
  WHERE QuestionId = 132 OR Code = 'Q-DIS-132';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    132, 1, 10, 'Q-DIS-132', N'أثناء حضورك مجلساً خاصاً مع أصدقاء مدنيين، دار الحديث حول تفاصيل عملية نوعية نفذتها فرقة الدرك الملكي مؤخراً ولم تنشر في وسائل الإعلام. حاول الأصدقاء استدراجك لكشف تفاصيل وخطة التدخل. كيف تتصرف التزاماً بـ "السر المهني"؟',
    N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'السر المهني والأمني التزام أخلاقي وقانوني يرافق الدركي مدى الحياة؛ يحظر إفشاء أي تفاصيل عملياتية خارج إطار الخدمة، ويجب تحويل مجرى الحديث بلباقة وحزم مع التأكيد على سرية المهام.', N'["الحفاظ على أسرار الدفاع والسر المهني","الحصانة ضد الاستدراج الكلامي"]',
    N'["SPEC-PJ","SPEC-FORMATION","SPEC-PSIG"]', 132, 1, 0, 1
  );
END;

-- Options de la question 132
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 132;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1321, 132, 'A', N'كشف كل أسماء المشاركين والخطط التكتيكية لإبهار الحاضرين', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1322, 132, 'B', N'الالتزام التام بالصمت والسر المهني، والرفض الحازم واللبق للإفصاح عن أي معطيات عملياتية، وتغيير موضوع النقاش', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1323, 132, 'C', N'تسريب صور العملية للمجموعة عبر تطبيق واتساب', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1324, 132, 'D', N'إعطاؤهم تفاصيل خاطئة لبيعها لاحقاً لجريدة محلية', 0);

-- Question 133: Q-DIS-133 (DISCIPLINE_SITUATION_PRO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 133 OR Code = 'Q-DIS-133')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 10,
      Code = 'Q-DIS-133',
      Enonce = N'ما هو المفهوم الحقيقي لـ "روح التضامن والزمالة العسكرية"، وما هو الخط الفاصل الحاسم بين هذا التضامن النبيل وبين "التستر غير المشروع" على أخطاء وجرائم الزملاء؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'التضامن العسكري الحقيقي هو المساندة في الميدان لإنقاذ الأرواح وإنجاح المهام؛ أما التستر على خيانة الأمانة أو الفساد أو الجرائم فيعتبر تواطؤاً ومشاركة جنائية تضر بشرف المؤسسة العسكرية ككل.',
      CompetencesAssociees = N'["الأخلاقيات المهنية العسكرية","التمييز بين التآزر الإيجابي والتواطؤ السلبي"]',
      SpecialitesAssociees = N'["SPEC-FORMATION","SPEC-SCIENTIFIQUE","SPEC-PJ"]',
      OrdreAffichage = 133,
      EstActive = 1
  WHERE QuestionId = 133 OR Code = 'Q-DIS-133';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    133, 1, 10, 'Q-DIS-133', N'ما هو المفهوم الحقيقي لـ "روح التضامن والزمالة العسكرية"، وما هو الخط الفاصل الحاسم بين هذا التضامن النبيل وبين "التستر غير المشروع" على أخطاء وجرائم الزملاء؟',
    N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'التضامن العسكري الحقيقي هو المساندة في الميدان لإنقاذ الأرواح وإنجاح المهام؛ أما التستر على خيانة الأمانة أو الفساد أو الجرائم فيعتبر تواطؤاً ومشاركة جنائية تضر بشرف المؤسسة العسكرية ككل.', N'["الأخلاقيات المهنية العسكرية","التمييز بين التآزر الإيجابي والتواطؤ السلبي"]',
    N'["SPEC-FORMATION","SPEC-SCIENTIFIQUE","SPEC-PJ"]', 133, 1, 0, 1
  );
END;

-- Options de la question 133
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 133;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1331, 133, 'A', N'التضامن يفرض الكذب وحماية الزميل حتى لو ارتكب جريمة قتل أو رشوة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1332, 133, 'B', N'التضامن واجب في التضحية والمساندة الميدانية وإنجاح المهمة، لكنه ينتهي تماماً عند مخالفة القانون؛ والتستر على الجرائم تواطؤ وخيانة للشرف العسكري', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1333, 133, 'C', N'لا يوجد أي تضامن في الجيش وكل فرد يعمل لنفسه فقط', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1334, 133, 'D', N'إبلاغ الصحافة قبل إبلاغ القيادة عند حدوث أي خطأ بسيط', 0);

-- Question 134: Q-DIS-134 (DISCIPLINE_SITUATION_PRO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 134 OR Code = 'Q-DIS-134')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 10,
      Code = 'Q-DIS-134',
      Enonce = N'في سياق المحافظة على الجاهزية العملياتية الدائمة، ما هي التزامات الدركي فيما يخص الحفاظ على اللياقة البدنية والوزن المثالي والهندام العسكري في الحياة اليومية؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الحفاظ على لياقة بدنية ممتازة ووزن متناسق ونظافة الهندام العسكري واجب عسكري مستمر يعكس هيبة الدولة واستعداد الفرد للاستجابة الفورية للمهام الميدانية الشاقة في أي وقت.',
      CompetencesAssociees = N'["الجاهزية البدنية المستمرة","الانضباط المظهري والهندام العسكري"]',
      SpecialitesAssociees = N'["SPEC-GEH","SPEC-PSIG","SPEC-MOTARD"]',
      OrdreAffichage = 134,
      EstActive = 1
  WHERE QuestionId = 134 OR Code = 'Q-DIS-134';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    134, 1, 10, 'Q-DIS-134', N'في سياق المحافظة على الجاهزية العملياتية الدائمة، ما هي التزامات الدركي فيما يخص الحفاظ على اللياقة البدنية والوزن المثالي والهندام العسكري في الحياة اليومية؟',
    N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'الحفاظ على لياقة بدنية ممتازة ووزن متناسق ونظافة الهندام العسكري واجب عسكري مستمر يعكس هيبة الدولة واستعداد الفرد للاستجابة الفورية للمهام الميدانية الشاقة في أي وقت.', N'["الجاهزية البدنية المستمرة","الانضباط المظهري والهندام العسكري"]',
    N'["SPEC-GEH","SPEC-PSIG","SPEC-MOTARD"]', 134, 1, 0, 1
  );
END;

-- Options de la question 134
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 134;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1341, 134, 'A', N'اللياقة البدنية مطلوبة فقط في أول شهر من التجنيد ثم تهمل تماماً', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1342, 134, 'B', N'واجب دائم ومستمر لضمان القدرة على التدخل الميداني والحفاظ على الهيبة العسكرية والوقار المؤسساتي', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1343, 134, 'C', N'ارتداء ملابس عسكرية ممزقة لإظهار الشجاعة في المعارك', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1344, 134, 'D', N'إعفاء الدراجين وعناصر التدخل من أي نشاط رياضي', 0);

-- Question 135: Q-DIS-135 (DISCIPLINE_SITUATION_PRO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 135 OR Code = 'Q-DIS-135')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 10,
      Code = 'Q-DIS-135',
      Enonce = N'تلقى دركي دعوة مجانية لحضور مأدبة عشاء خاصة ينظمها رجل أعمال محلي في منطقته تحوم حوله شبهات مالية غير مؤكدة، مع وعد بمساعدته في تسهيل معاملات عائلية. ما هو التصرف الانضباطي الوقائي الواجب؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الابتعاد عن مواطن الشبهات وقبول الهدايا أو الولائم من أطراف ذات مصالح محلية أمر أساسي لحماية استقلالية وسمعة الدركي والمؤسسة من الابتزاز أو التبعية.',
      CompetencesAssociees = N'["الوقاية من تضارب المصالح والشبهات","صيانة السمعة والكرامة المهنية"]',
      SpecialitesAssociees = N'["SPEC-PJ","SPEC-SCIENTIFIQUE","SPEC-FORMATION"]',
      OrdreAffichage = 135,
      EstActive = 1
  WHERE QuestionId = 135 OR Code = 'Q-DIS-135';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    135, 1, 10, 'Q-DIS-135', N'تلقى دركي دعوة مجانية لحضور مأدبة عشاء خاصة ينظمها رجل أعمال محلي في منطقته تحوم حوله شبهات مالية غير مؤكدة، مع وعد بمساعدته في تسهيل معاملات عائلية. ما هو التصرف الانضباطي الوقائي الواجب؟',
    N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'الابتعاد عن مواطن الشبهات وقبول الهدايا أو الولائم من أطراف ذات مصالح محلية أمر أساسي لحماية استقلالية وسمعة الدركي والمؤسسة من الابتزاز أو التبعية.', N'["الوقاية من تضارب المصالح والشبهات","صيانة السمعة والكرامة المهنية"]',
    N'["SPEC-PJ","SPEC-SCIENTIFIQUE","SPEC-FORMATION"]', 135, 1, 0, 1
  );
END;

-- Options de la question 135
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 135;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1351, 135, 'A', N'قبول الدعوة فالمجان فرصة جيدة للتوفير وتناول الطعام الفاخر', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1352, 135, 'B', N'الاعتذار بحزم ولباقة عن تلبية الدعوة درءاً للشبهات وحفاظاً على استقلالية الوظيفة وتجنب أي ضغط أو شبهة مستقبلية', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1353, 135, 'C', N'أخذ سيارة الدورية لنقل العائلة للمأدبة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1354, 135, 'D', N'طلب نصيبه من الطعام معلباً لإرساله لمنزله', 0);

-- Question 136: Q-DIS-136 (DISCIPLINE_SITUATION_PRO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 136 OR Code = 'Q-DIS-136')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 10,
      Code = 'Q-DIS-136',
      Enonce = N'أثناء فترة الانتخابات التشريعية أو الجماعية، ما هو الموقف الدستوري والانضباطي الصارم المفروض على عناصر الدرك الملكي فيما يتعلق بالأنشطة السياسية والحملات الحزبية؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'القانون والدستور يفرضان على أفراد القوات المسلحة الملكية والدرك الملكي الحياد السياسي المطلق؛ ويحظر عليهم الانتماء للأحزاب، المشاركة في الحملات، أو إبداء أي رأي أو مساندة سياسية لضمان تجرد المرفق العام.',
      CompetencesAssociees = N'["الحياد السياسي التام للمؤسسة العسكرية والأمنية","الالتزام الدستوري الصارم"]',
      SpecialitesAssociees = N'["SPEC-SCIENTIFIQUE","SPEC-FORMATION","SPEC-SEC-ADMIN"]',
      OrdreAffichage = 136,
      EstActive = 1
  WHERE QuestionId = 136 OR Code = 'Q-DIS-136';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    136, 1, 10, 'Q-DIS-136', N'أثناء فترة الانتخابات التشريعية أو الجماعية، ما هو الموقف الدستوري والانضباطي الصارم المفروض على عناصر الدرك الملكي فيما يتعلق بالأنشطة السياسية والحملات الحزبية؟',
    N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'القانون والدستور يفرضان على أفراد القوات المسلحة الملكية والدرك الملكي الحياد السياسي المطلق؛ ويحظر عليهم الانتماء للأحزاب، المشاركة في الحملات، أو إبداء أي رأي أو مساندة سياسية لضمان تجرد المرفق العام.', N'["الحياد السياسي التام للمؤسسة العسكرية والأمنية","الالتزام الدستوري الصارم"]',
    N'["SPEC-SCIENTIFIQUE","SPEC-FORMATION","SPEC-SEC-ADMIN"]', 136, 1, 0, 1
  );
END;

-- Options de la question 136
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 136;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1361, 136, 'A', N'توزيع المنشورات الدعائية للمرشح المفضل داخل الثكنة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1362, 136, 'B', N'الحياد التام والمطلق، وحظر أي انخراط أو نشاط حزبي أو إبداء لميول سياسية لضمان تجرد وهيبة المرفق الأمني', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1363, 136, 'C', N'الترشح للانتخابات أثناء فترة الخدمة العسكرية النشطة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1364, 136, 'D', N'إجبار المواطنين في السدود القضائية على التصويت لمرشح معين', 0);

-- Question 137: Q-DIS-137 (DISCIPLINE_SITUATION_PRO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 137 OR Code = 'Q-DIS-137')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 10,
      Code = 'Q-DIS-137',
      Enonce = N'في حال وقوع خطأ إجرائي غير مقصود من الدركي أثناء إنجاز مهمة (مثل ضياع وثيقة غير سرية أو خدش سيارة الدورية أثناء المناورة)، ما هو التصرف الشجاع والمسؤول وفق مبادئ الشرف العسكري؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الشرف العسكري والشجاعة الأدبية تقتضي الإقرار الفوري بالخطأ أمام الرئيس المباشر، وتقديم تقرير صادق ودقيق لتحمل المسؤولية وتصحيح العواقب مبكراً، خلافاً للكذب أو التستر الذي يضاعف الخطأ.',
      CompetencesAssociees = N'["الشجاعة الأدبية وتحمل المسؤولية","الصدق والشفافية مع القيادة"]',
      SpecialitesAssociees = N'["SPEC-FORMATION","SPEC-PSIG","SPEC-MOTARD"]',
      OrdreAffichage = 137,
      EstActive = 1
  WHERE QuestionId = 137 OR Code = 'Q-DIS-137';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    137, 1, 10, 'Q-DIS-137', N'في حال وقوع خطأ إجرائي غير مقصود من الدركي أثناء إنجاز مهمة (مثل ضياع وثيقة غير سرية أو خدش سيارة الدورية أثناء المناورة)، ما هو التصرف الشجاع والمسؤول وفق مبادئ الشرف العسكري؟',
    N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'الشرف العسكري والشجاعة الأدبية تقتضي الإقرار الفوري بالخطأ أمام الرئيس المباشر، وتقديم تقرير صادق ودقيق لتحمل المسؤولية وتصحيح العواقب مبكراً، خلافاً للكذب أو التستر الذي يضاعف الخطأ.', N'["الشجاعة الأدبية وتحمل المسؤولية","الصدق والشفافية مع القيادة"]',
    N'["SPEC-FORMATION","SPEC-PSIG","SPEC-MOTARD"]', 137, 1, 0, 1
  );
END;

-- Options de la question 137
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 137;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1371, 137, 'A', N'الكذب واتهام زميل بريء بالواقعة للهروب من العقاب', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1372, 137, 'B', N'التحلي بالشجاعة الأدبية، وإشعار الرئيس المباشر فوراً بصدق وشفافية، وتحمل المسؤولية بروح الانضباط العسكري', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1373, 137, 'C', N'إخفاء السيارة في غابة بعيدة لتفادي اكتشاف الخدش', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1374, 137, 'D', N'البكاء وطلب وساطة من الأقارب للضغط على القائد', 0);

-- Question 138: Q-DIS-138 (DISCIPLINE_SITUATION_PRO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 138 OR Code = 'Q-DIS-138')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 10,
      Code = 'Q-DIS-138',
      Enonce = N'أثناء استراحة داخل مطعم عمومي بالزي الرسمي، لاحظت مواطنين يناقشون بصوت عالٍ قضايا تثير الاستفزاز وينتقدون عمل الأجهزة الأمنية بحدة. ما هو الموقف الرصين الذي يجسده الوقار العسكري؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الدركي بالزي العسكري يمثل هيبة الدولة؛ يجب أن يتحلى بأعلى درجات الرزانة والهدوء وتجاهل الأحاديث الجانبية العابرة وعدم الانزلاق في جدالات عقيمة أو مشاحنات تمس بصورة الزي العسكري ما لم يكن هناك خرق مباشر للقانون.',
      CompetencesAssociees = N'["الرزانة والوقار في الفضاء العام","تفادي الاستفزازات الشعبية غير المبررة"]',
      SpecialitesAssociees = N'["SPEC-FORMATION","SPEC-GEH","SPEC-PSIG"]',
      OrdreAffichage = 138,
      EstActive = 1
  WHERE QuestionId = 138 OR Code = 'Q-DIS-138';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    138, 1, 10, 'Q-DIS-138', N'أثناء استراحة داخل مطعم عمومي بالزي الرسمي، لاحظت مواطنين يناقشون بصوت عالٍ قضايا تثير الاستفزاز وينتقدون عمل الأجهزة الأمنية بحدة. ما هو الموقف الرصين الذي يجسده الوقار العسكري؟',
    N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'الدركي بالزي العسكري يمثل هيبة الدولة؛ يجب أن يتحلى بأعلى درجات الرزانة والهدوء وتجاهل الأحاديث الجانبية العابرة وعدم الانزلاق في جدالات عقيمة أو مشاحنات تمس بصورة الزي العسكري ما لم يكن هناك خرق مباشر للقانون.', N'["الرزانة والوقار في الفضاء العام","تفادي الاستفزازات الشعبية غير المبررة"]',
    N'["SPEC-FORMATION","SPEC-GEH","SPEC-PSIG"]', 138, 1, 0, 1
  );
END;

-- Options de la question 138
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 138;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1381, 138, 'A', N'الوقوف وقلب طاولات المطعم وتهديد الحاضرين بالسلاح', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1382, 138, 'B', N'التحلي بالرزانة والهدوء والوقار، وعدم الانجرار إلى أي جدال عقيم أو ردود انفعالية تسيء لهيبة الزي الرسمي', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1383, 138, 'C', N'التصفيق لهم ومشاركتهم في انتقاد زملائه وضباطه', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1384, 138, 'D', N'توقيف صاحب المطعم وإغلاق محله فوراً بدون سند قانوني', 0);

-- Question 139: Q-DIS-139 (DISCIPLINE_SITUATION_PRO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 139 OR Code = 'Q-DIS-139')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 10,
      Code = 'Q-DIS-139',
      Enonce = N'ما هي القاعدة الانضباطية الملزمة عند استخدام وحمل السلاح الفردي الوظيفي أثناء التواجد خارج الخدمة الرسمية أو في فترات الرخص والتنقلات الشخصية؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'MOYEN',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'تفرض القوانين العسكرية إيداع السلاح والذخيرة في مخزن أسلحة الوحدة (Armurerie) قبل الخروج في رخصة أو عطلة، ما لم تكن هناك تعليمات عملياتية رسمية واستثنائية مكتوبة تحدد ضوابط الحمل والحراسة الشخصية الآمنة.',
      CompetencesAssociees = N'["الانضباط في حمل وحفظ السلاح الفردي","السلامة الصارمة للأسلحة والذخيرة"]',
      SpecialitesAssociees = N'["SPEC-PSIG","SPEC-GSI","SPEC-FORMATION"]',
      OrdreAffichage = 139,
      EstActive = 1
  WHERE QuestionId = 139 OR Code = 'Q-DIS-139';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    139, 1, 10, 'Q-DIS-139', N'ما هي القاعدة الانضباطية الملزمة عند استخدام وحمل السلاح الفردي الوظيفي أثناء التواجد خارج الخدمة الرسمية أو في فترات الرخص والتنقلات الشخصية؟',
    N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.', 'QCM_UNIQUE', 'MOYEN', 1,
    90, N'تفرض القوانين العسكرية إيداع السلاح والذخيرة في مخزن أسلحة الوحدة (Armurerie) قبل الخروج في رخصة أو عطلة، ما لم تكن هناك تعليمات عملياتية رسمية واستثنائية مكتوبة تحدد ضوابط الحمل والحراسة الشخصية الآمنة.', N'["الانضباط في حمل وحفظ السلاح الفردي","السلامة الصارمة للأسلحة والذخيرة"]',
    N'["SPEC-PSIG","SPEC-GSI","SPEC-FORMATION"]', 139, 1, 0, 1
  );
END;

-- Options de la question 139
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 139;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1391, 139, 'A', N'ترك السلاح في درج السيارة أو تحت وسادة الفندق دون حراسة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1392, 139, 'B', N'إيداع السلاح والذخيرة بمستودع أسلحة الوحدة طبقاً للتعليمات، والامتناع عن حمله في العطل الشخصية إلا بترخيص عملياتي خاص ومعلل', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1393, 139, 'C', N'إعارة السلاح للأصدقاء للرماية في رحلة صيد برية', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1394, 139, 'D', N'حمل السلاح في الحفلات الخاصة للتباهي أمام الأقارب', 0);

-- Question 140: Q-DIS-140 (DISCIPLINE_SITUATION_PRO)
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = 140 OR Code = 'Q-DIS-140')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = 10,
      Code = 'Q-DIS-140',
      Enonce = N'في ختام فترة التدريب الأساسي والاستعداد لأداء القسم والالتحاق بالميدان، ما هي القيمة العسكرية والأخلاقية العليا التي تلخص شرف الجندية والانتماء لمؤسسة الدرك الملكي؟',
      ContexteSituationnel = N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = 'FACILE',
      Points = 1,
      TempsLimiteSecondes = 90,
      Explication = N'الإخلاص المطلق للشعار الخالد للمملكة "الله - الوطن - الملك"، والوفاء لروح القسم العسكري في حماية الوطن والمواطنين وسيادة القانون والتضحية ونكران الذات هي جوهر الشرف والرسالة النبيلة للدرك الملكي.',
      CompetencesAssociees = N'["الوفاء لشعار المملكة والواجب الوطني","العقيدة العسكرية وروح التضحية والفداء"]',
      SpecialitesAssociees = N'["SPEC-FORMATION","SPEC-GEH","SPEC-PSIG","SPEC-PJ"]',
      OrdreAffichage = 140,
      EstActive = 1
  WHERE QuestionId = 140 OR Code = 'Q-DIS-140';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    140, 1, 10, 'Q-DIS-140', N'في ختام فترة التدريب الأساسي والاستعداد لأداء القسم والالتحاق بالميدان، ما هي القيمة العسكرية والأخلاقية العليا التي تلخص شرف الجندية والانتماء لمؤسسة الدرك الملكي؟',
    N'سياق مهني عملياتي لتقييم كفاءات المواقف المهنية والانضباط.', 'QCM_UNIQUE', 'FACILE', 1,
    90, N'الإخلاص المطلق للشعار الخالد للمملكة "الله - الوطن - الملك"، والوفاء لروح القسم العسكري في حماية الوطن والمواطنين وسيادة القانون والتضحية ونكران الذات هي جوهر الشرف والرسالة النبيلة للدرك الملكي.', N'["الوفاء لشعار المملكة والواجب الوطني","العقيدة العسكرية وروح التضحية والفداء"]',
    N'["SPEC-FORMATION","SPEC-GEH","SPEC-PSIG","SPEC-PJ"]', 140, 1, 0, 1
  );
END;

-- Options de la question 140
DELETE FROM dbo.OptionsReponse WHERE QuestionId = 140;
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1401, 140, 'A', N'السعي وراء المصالح المادية الشخصية فقط وتفادي أي مهمة صعبة', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1402, 140, 'B', N'الإخلاص المطلق للشعار الخالد "الله - الوطن - الملك"، والوفاء لروح القسم في خدمة العدالة وحماية الوطن والمواطنين بتفانٍ وشرف ونكران ذات', 1);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1403, 140, 'C', N'تفضيل الراحة الشخصية والغياب المتكرر عن الواجب', 0);
INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (1404, 140, 'D', N'اعتبار الوظيفة مجرد وسيلة للنفوذ والسلطة على الناس', 0);

COMMIT TRANSACTION;
PRINT 'Opération terminée avec succès : 140 questions et 560 options synchronisées.';
