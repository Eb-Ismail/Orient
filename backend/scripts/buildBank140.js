// ==============================================================================
// ORIENT-GR - Assemblage, Validation & Génération de la Banque de 140 Questions
// ==============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { questionsLogique } from '../data/categories/cat01_logique.js';
import { questionsAnalyseObservation } from '../data/categories/cat02_analyse_obs.js';
import { questionsConcentration } from '../data/categories/cat03_concentration.js';
import { questionsResolutionDecision } from '../data/categories/cat04_resolution_decision.js';
import { questionsSecuriteRoutiereMoto } from '../data/categories/cat05_securite_routiere_moto.js';
import { questionsPoliceJudiciaire } from '../data/categories/cat06_police_judiciaire.js';
import { questionsInformatiqueDigital } from '../data/categories/cat07_informatique_digital.js';
import { questionsCommunicationFormation } from '../data/categories/cat08_communication_formation.js';
import { questionsAdminSecretariat } from '../data/categories/cat09_admin_secretariat.js';
import { questionsDisciplinePosture } from '../data/categories/cat10_discipline_posture.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const EXPECTED_CATEGORIES = [
  { code: 'LOGIQUE', nom: 'الاستدلال المنطقي', count: 20, items: questionsLogique },
  { code: 'ANALYSE_OBSERVATION', nom: 'التحليل والملاحظة', count: 15, items: questionsAnalyseObservation },
  { code: 'CONCENTRATION_ATTENTION', nom: 'التركيز والانتباه', count: 15, items: questionsConcentration },
  { code: 'RESOLUTION_PROBLEMES', nom: 'حل المشكلات واتخاذ القرار', count: 15, items: questionsResolutionDecision },
  { code: 'SECURITE_ROUTIERE_MOTO', nom: 'السلامة الطرقية وقيادة الدراجات', count: 15, items: questionsSecuriteRoutiereMoto },
  { code: 'POLICE_JUDICIAIRE', nom: 'الشرطة القضائية والتحري', count: 15, items: questionsPoliceJudiciaire },
  { code: 'INFORMATIQUE_DIGITAL', nom: 'المعلوماتية والمهارات الرقمية', count: 15, items: questionsInformatiqueDigital },
  { code: 'COMMUNICATION_FORMATION', nom: 'التواصل والتكوين', count: 10, items: questionsCommunicationFormation },
  { code: 'ADMINISTRATION_SECRETARIAT', nom: 'الإدارة والسكرتارية', count: 5, items: questionsAdminSecretariat },
  { code: 'DISCIPLINE_SITUATION_PRO', nom: 'المواقف المهنية والانضباط', count: 15, items: questionsDisciplinePosture }
];

export function assembleAndValidate() {
  console.log('===> Début de la validation et de l\'assemblage des 140 questions...');
  
  const allRawQuestions = [];
  const categoryCounts = {};
  const seenIds = new Set();
  const seenCodes = new Set();
  const seenTexts = new Set();

  EXPECTED_CATEGORIES.forEach(cat => {
    if (!cat.items || cat.items.length !== cat.count) {
      throw new Error(`Catégorie "${cat.nom}" (${cat.code}) invalide : attendu ${cat.count}, reçu ${cat.items ? cat.items.length : 0}`);
    }
    categoryCounts[cat.code] = cat.items.length;
    allRawQuestions.push(...cat.items);
  });

  if (allRawQuestions.length !== 140) {
    throw new Error(`Nombre total de questions incorrect : attendu 140, obtenu ${allRawQuestions.length}`);
  }

  // Domain ID mapping
  const domainIdMap = {
    'LOGIQUE': 1,
    'ANALYSE_OBSERVATION': 2,
    'CONCENTRATION_ATTENTION': 3,
    'RESOLUTION_PROBLEMES': 4,
    'SECURITE_ROUTIERE_MOTO': 5,
    'POLICE_JUDICIAIRE': 6,
    'INFORMATIQUE_DIGITAL': 7,
    'COMMUNICATION_FORMATION': 8,
    'ADMINISTRATION_SECRETARIAT': 9,
    'DISCIPLINE_SITUATION_PRO': 10
  };

  const processedQuestions = allRawQuestions.map((q, index) => {
    const qId = index + 1;
    if (seenIds.has(qId)) throw new Error(`ID dupliqué: ${qId}`);
    seenIds.add(qId);

    const code = q.code || `Q-${q.categorie_code || 'GEN'}-${String(qId).padStart(3, '0')}`;
    if (seenCodes.has(code)) throw new Error(`Code dupliqué: ${code}`);
    seenCodes.add(code);

    const textClean = (q.texte || '').trim();
    if (!textClean || textClean.length < 15) throw new Error(`Texte de question vide ou trop court: ${code}`);
    if (seenTexts.has(textClean)) throw new Error(`Question dupliquée détectée: ${code}`);
    seenTexts.add(textClean);

    if (!Array.isArray(q.options) || q.options.length !== 4) {
      throw new Error(`Question ${code} doit avoir exactement 4 choix.`);
    }

    const correctOptions = q.options.filter(o => o.estCorrecte === true);
    if (correctOptions.length !== 1) {
      throw new Error(`Question ${code} doit avoir exactement 1 bonne réponse (trouvé ${correctOptions.length}).`);
    }

    const bonneReponseObj = correctOptions[0];
    const domaineId = domainIdMap[q.categorie_code] || 1;

    // Standardized options format for both SQL Server and API
    const formattedOptions = q.options.map((opt, optIdx) => {
      const letters = ['A', 'B', 'C', 'D'];
      const lettersAr = ['أ', 'ب', 'ج', 'د'];
      const optId = qId * 10 + (optIdx + 1);
      return {
        OptionId: optId,
        LettreOption: letters[optIdx],
        LettreOptionAr: lettersAr[optIdx],
        EnonceOption: opt.texte.trim(),
        EstCorrecte: Boolean(opt.estCorrecte)
      };
    });

    // Formatting specialty associations (array of codes and weights)
    const specialitesAssociees = (q.specialites_ponderation || []).map(sp => sp.code);
    const specialitesDetails = (q.specialites_ponderation || []).map(sp => ({
      code: sp.code,
      specialite: sp.specialite,
      poids: sp.poids || 1.0
    }));

    return {
      // Identifiants & Catégorie
      QuestionId: qId,
      id: qId,
      Code: code,
      code: code,
      DomaineId: domaineId,
      DomaineCode: q.categorie_code,
      categorie_code: q.categorie_code,
      DomaineIntitule: q.categorie,
      categorie: q.categorie,

      // Textes en arabe
      Enonce: textClean,
      texte: textClean,
      ContexteSituationnel: q.contexte || `سياق مهني عملياتي لتقييم كفاءات ${q.categorie}.`,
      contexte: q.contexte || `سياق مهني عملياتي لتقييم كفاءات ${q.categorie}.`,

      // Choix de réponses
      Options: formattedOptions,
      options: formattedOptions.map(o => ({
        id: o.OptionId,
        lettre: o.LettreOption,
        lettre_ar: o.LettreOptionAr,
        texte: o.EnonceOption,
        estCorrecte: o.EstCorrecte
      })),

      // Bonne réponse & Explication
      BonneReponseLettre: bonneReponseObj.lettre || 'B',
      BonneReponseLettreAr: bonneReponseObj.lettre_ar || 'ب',
      BonneReponseTexte: bonneReponseObj.texte,
      Explication: q.explication ? q.explication.trim() : 'تطبيق القواعد والضوابط المهنية المعتمدة في الدرك الملكي.',
      explication: q.explication ? q.explication.trim() : 'تطبيق القواعد والضوابط المهنية المعتمدة في الدرك الملكي.',

      // Difficulté & Points
      Difficulte: q.difficulte_code || 'MOYEN',
      DifficulteAr: q.difficulte || 'متوسط',
      difficulte: q.difficulte || 'متوسط',
      difficulte_code: q.difficulte_code || 'MOYEN',
      Points: q.coefficient || (q.difficulte === 'صعب' ? 2 : 1),
      coefficient: q.coefficient || (q.difficulte === 'صعب' ? 2 : 1),
      TempsLimiteSecondes: 90,

      // Compétences & Spécialités
      CompetencesAssociees: Array.isArray(q.competences) ? q.competences : ['الكفاءة المهنية العامة'],
      competences: Array.isArray(q.competences) ? q.competences : ['الكفاءة المهنية العامة'],
      SpecialitesAssociees: specialitesAssociees,
      specialites: specialitesDetails,
      specialites_ponderation: specialitesDetails,

      // Statut
      TypeQuestion: 'QCM_UNIQUE',
      OrdreAffichage: qId,
      EstActive: true,
      estActive: true,
      EstArchivee: false,
      Version: 1
    };
  });

  console.log(`===> Succès: ${processedQuestions.length} questions validées avec succès.`);
  return { processedQuestions, categoryCounts };
}

// Execute and write deliverables if run directly
try {
  const { processedQuestions, categoryCounts } = assembleAndValidate();

  // 1. Livrable 1 : Fichier JSON backend/data/questions_arabe_140.json
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  
  const jsonPath = path.join(dataDir, 'questions_arabe_140.json');
  fs.writeFileSync(jsonPath, JSON.stringify(processedQuestions, null, 2), 'utf-8');
  console.log(`===> Livrable 1 généré: ${jsonPath} (${fs.statSync(jsonPath).size} octets)`);

  // 2. Synchronisation de backend/lib/arabicQuestionBank140.js
  const libDir = path.join(__dirname, '..', 'lib');
  const libBankPath = path.join(libDir, 'arabicQuestionBank140.js');
  const jsContent = `// ==============================================================================
// ORIENT-G — Banque Centrale Officielle des 140 Questions en Arabe
// Couvre l'ensemble des 10 catégories réglementaires et spécialités de la Gendarmerie Royale
// Généré automatiquement - 140 questions actives distinctes
// ==============================================================================

export const arabicQuestionBank140 = ${JSON.stringify(processedQuestions, null, 2)};
`;
  fs.writeFileSync(libBankPath, jsContent, 'utf-8');
  console.log(`===> Module JS synchronisé: ${libBankPath} (${fs.statSync(libBankPath).size} octets)`);

  // 3. Livrable 2 & 3 : Script SQL Server Seed idempotent (backend/sql/seed_questions_140.sql)
  const sqlDir = path.join(__dirname, '..', 'sql');
  if (!fs.existsSync(sqlDir)) fs.mkdirSync(sqlDir, { recursive: true });
  const sqlPath = path.join(sqlDir, 'seed_questions_140.sql');

  let sql = `-- ==============================================================================
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
`;

  // SQL escaping function
  const esc = (s) => (s ? String(s).replace(/'/g, "''") : '');

  processedQuestions.forEach(q => {
    sql += `
-- Question ${q.QuestionId}: ${q.Code} (${q.DomaineCode})
IF EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionId = ${q.QuestionId} OR Code = '${esc(q.Code)}')
BEGIN
  UPDATE dbo.Questions
  SET DomaineId = ${q.DomaineId},
      Code = '${esc(q.Code)}',
      Enonce = N'${esc(q.Enonce)}',
      ContexteSituationnel = N'${esc(q.ContexteSituationnel)}',
      TypeQuestion = 'QCM_UNIQUE',
      Difficulte = '${esc(q.Difficulte)}',
      Points = ${q.Points},
      TempsLimiteSecondes = ${q.TempsLimiteSecondes},
      Explication = N'${esc(q.Explication)}',
      CompetencesAssociees = N'${esc(JSON.stringify(q.CompetencesAssociees))}',
      SpecialitesAssociees = N'${esc(JSON.stringify(q.SpecialitesAssociees))}',
      OrdreAffichage = ${q.OrdreAffichage},
      EstActive = 1
  WHERE QuestionId = ${q.QuestionId} OR Code = '${esc(q.Code)}';
END
ELSE
BEGIN
  INSERT INTO dbo.Questions (
    QuestionId, TestId, DomaineId, Code, Enonce, ContexteSituationnel, TypeQuestion,
    Difficulte, Points, TempsLimiteSecondes, Explication, CompetencesAssociees,
    SpecialitesAssociees, OrdreAffichage, EstActive, EstArchivee, Version
  )
  VALUES (
    ${q.QuestionId}, 1, ${q.DomaineId}, '${esc(q.Code)}', N'${esc(q.Enonce)}',
    N'${esc(q.ContexteSituationnel)}', 'QCM_UNIQUE', '${esc(q.Difficulte)}', ${q.Points},
    ${q.TempsLimiteSecondes}, N'${esc(q.Explication)}', N'${esc(JSON.stringify(q.CompetencesAssociees))}',
    N'${esc(JSON.stringify(q.SpecialitesAssociees))}', ${q.OrdreAffichage}, 1, 0, 1
  );
END;

-- Options de la question ${q.QuestionId}
DELETE FROM dbo.OptionsReponse WHERE QuestionId = ${q.QuestionId};
`;

    q.Options.forEach(opt => {
      sql += `INSERT INTO dbo.OptionsReponse (OptionId, QuestionId, LettreOption, EnonceOption, EstCorrecte)
VALUES (${opt.OptionId}, ${q.QuestionId}, '${opt.LettreOption}', N'${esc(opt.EnonceOption)}', ${opt.EstCorrecte ? 1 : 0});
`;
    });
  });

  sql += `
COMMIT TRANSACTION;
PRINT 'Opération terminée avec succès : 140 questions et 560 options synchronisées.';
`;

  fs.writeFileSync(sqlPath, sql, 'utf-8');
  console.log(`===> Livrable 2 & 3 généré: ${sqlPath} (${fs.statSync(sqlPath).size} octets)`);

  console.log('===> Bilan des catégories :');
  console.table(categoryCounts);
} catch (err) {
  console.error('ERREUR LORS DU BUILD:', err);
  process.exit(1);
}
