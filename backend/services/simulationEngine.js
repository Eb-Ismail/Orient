// ==============================================================================
// ORIENT-GR - Moteur de Sélection Aléatoire, Snapshot et Évaluation des Simulations
// محرك التوزيع العشوائي المتوازن وحفظ اللقطات والتقييم الموضوعي الصارم
// ==============================================================================

import { simulationTaskBank60 } from '../lib/simulationTaskBank60.js';

/**
 * Générateur pseudo-aléatoire reproductible basé sur une graine (Linear Congruential Generator)
 */
function createSeededRandom(seed = 123456789) {
  let s = Math.abs(seed) % 2147483647;
  if (s <= 0) s += 2147483646;
  return function() {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * Mélange un tableau de façon reproductible
 */
function seededShuffle(array, seed) {
  const rng = createSeededRandom(seed);
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const simulationEngine = {
  /**
   * Sélectionne un ensemble équilibré de tâches pour un étudiant :
   * - Si un domaineId est spécifié (ex: 'PJ', 'ROUTE') : sélectionne 'count' tâches de ce domaine
   * - Si aucun domaine n'est spécifié : sélectionne un ensemble équilibré couvrant les 6 domaines
   * - Minimise les tâches déjà vues récemment par l'élève
   * - Mélange l'ordre de présentation
   */
  selectTasksForStudent({ studentId, domaineId = null, count = 5, pastAttemptTaskIds = [], seed = Date.now() }) {
    let pool = [...simulationTaskBank60];

    if (domaineId) {
      pool = pool.filter(t => t.domaineId.toUpperCase() === domaineId.toUpperCase());
    }

    const pastSet = new Set(pastAttemptTaskIds);

    // Séparer les tâches fraîches (jamais vues) des tâches déjà vues
    const freshTasks = pool.filter(t => !pastSet.has(t.taskId));
    const seenTasks = pool.filter(t => pastSet.has(t.taskId));

    // Mélanger les deux réservoirs avec la graine
    const shuffledFresh = seededShuffle(freshTasks, seed);
    const shuffledSeen = seededShuffle(seenTasks, seed + 1);

    let selected = [];

    if (domaineId) {
      // Pour un domaine unique : puiser prioritairement dans les tâches fraîches
      selected = [...shuffledFresh, ...shuffledSeen].slice(0, count);
    } else {
      // Pour une session globale multi-domaines : tirer un quota équilibré par domaine
      const domains = ['PJ', 'ROUTE', 'TECH', 'PLAN', 'ENV', 'ADMIN'];
      const perDomain = Math.max(1, Math.floor(count / domains.length));

      domains.forEach((dom, dIdx) => {
        const domFresh = shuffledFresh.filter(t => t.domaineId === dom);
        const domSeen = shuffledSeen.filter(t => t.domaineId === dom);
        const domSelected = [...domFresh, ...domSeen].slice(0, perDomain);
        selected.push(...domSelected);
      });

      // Compléter si nécessaire jusqu'au nombre total demandé
      if (selected.length < count) {
        const remaining = pool.filter(t => !selected.some(s => s.taskId === t.taskId));
        const extra = seededShuffle(remaining, seed + 2).slice(0, count - selected.length);
        selected.push(...extra);
      }
    }

    // Mélanger l'ordre final des tâches sélectionnées
    return seededShuffle(selected, seed + 3);
  },

  /**
   * Sécurisation absolue (Anti-Fraude) :
   * Expurgation des réponses correctes, clés de notation et critères de validation
   * avant transmission au navigateur du candidat.
   */
  sanitizeTaskForStudent(task) {
    if (!task) return null;

    const sanitizedData = JSON.parse(JSON.stringify(task.scenarioData || {}));

    // 1. Expurgation questions à choix multiples
    if (sanitizedData.questionsVerif) {
      sanitizedData.questionsVerif.forEach(q => {
        delete q.correctIndex;
      });
    }

    // 2. Expurgation scénarios de décision
    if (sanitizedData.scenarios) {
      sanitizedData.scenarios.forEach(s => {
        delete s.correctIndex;
        delete s.feedbackAr;
      });
    }

    // 3. Expurgation éléments de classification
    if (sanitizedData.elements) {
      sanitizedData.elements.forEach(e => {
        delete e.catCorrecte;
      });
    }

    // 4. Expurgation de l'ordre correct dans les listes de priorité
    if (sanitizedData.itemsToOrder) {
      sanitizedData.itemsToOrder.forEach(it => {
        delete it.ordreCorrect;
      });
    }

    // 5. Expurgation détection de contradictions
    if (sanitizedData.itemsToEvaluate) {
      sanitizedData.itemsToEvaluate.forEach(item => {
        delete item.isContradiction;
        delete item.justificationAr;
      });
    }

    // 6. Expurgation anomalies du dataset
    if (sanitizedData.anomaliesToSelect) {
      delete sanitizedData.anomaliesToSelect;
    }
    if (sanitizedData.dataset) {
      sanitizedData.dataset.forEach(row => {
        delete row.status;
        delete row.estComplet;
      });
    }

    // 7. Expurgation hotspots corrects de la carte
    if (sanitizedData.hotspotsAIdentifier) {
      sanitizedData.hotspotsAIdentifier.forEach(h => {
        delete h.correct;
      });
    }

    return {
      taskId: task.taskId,
      numero: task.numero,
      domaineId: task.domaineId,
      domaineAr: task.domaineAr,
      domaineFr: task.domaineFr,
      titreAr: task.titreAr,
      titreFr: task.titreFr,
      difficulte: task.difficulte,
      dureeEstimeeMinutes: task.dureeEstimeeMinutes,
      pointsMax: task.pointsMax,
      competenceTags: task.competenceTags,
      interactionType: task.interactionType,
      consigneAr: task.consigneAr,
      scenarioData: sanitizedData
    };
  },

  /**
   * Évaluation objective côté serveur d'une réponse fournie à une tâche
   */
  evaluateTaskResponse(task, userResponse = {}) {
    if (!task) return { scorePct: 0, points: 0, feedbackAr: '' };

    const config = task.scoringConfig || {};
    const maxPoints = task.pointsMax || 20;
    let scorePct = 0;
    let feedbackAr = 'تم تسجيل الإجابة.';

    switch (config.type) {
      case 'MULTIPLE_CHOICE': {
        const expected = config.expectedAnswers || {};
        const qKeys = Object.keys(expected);
        let corrects = 0;
        qKeys.forEach(k => {
          const uVal = userResponse[k];
          if (uVal !== undefined && parseInt(uVal, 10) === expected[k]) {
            corrects++;
          }
        });
        scorePct = qKeys.length > 0 ? (corrects / qKeys.length) * 100 : 75;
        feedbackAr = scorePct >= 80 ? 'إجابات دقيقة ومطابقة للمعطيات الرسمية.' : 'إجابات تتطلب مزيداً من التدقيق الإجرائي.';
        break;
      }

      case 'CATEGORIZATION': {
        const mapping = config.correctMapping || {};
        const elemKeys = Object.keys(mapping);
        let corrects = 0;
        elemKeys.forEach(k => {
          if (userResponse[k] === mapping[k]) {
            corrects++;
          }
        });
        scorePct = elemKeys.length > 0 ? (corrects / elemKeys.length) * 100 : 70;
        feedbackAr = scorePct >= 80 ? 'تصنيف سليم ومطابق لسلسلة الحراسة والضوابط القانونية.' : 'تم تصنيف بعض العناصر في فئات غير ملائمة.';
        break;
      }

      case 'ORDERING': {
        const correctOrder = config.correctOrder || [];
        const userOrder = Array.isArray(userResponse.orderedIds) ? userResponse.orderedIds : [];
        let exactMatches = 0;
        correctOrder.forEach((id, expectedIdx) => {
          const userIdx = userOrder.indexOf(id);
          if (userIdx === expectedIdx) {
            exactMatches++;
          }
        });
        scorePct = correctOrder.length > 0 ? Math.max(30, (exactMatches / correctOrder.length) * 100) : 70;
        feedbackAr = scorePct >= 75 ? 'ترتيب أولويات نموذجي يعكس انضباطاً عملياتياً.' : 'تسلسل يحتاج لمراعاة درجة الاستعجال القصوى.';
        break;
      }

      case 'BOOLEAN_MAP': {
        const expectedMap = config.expectedAnswers || {};
        const keys = Object.keys(expectedMap);
        let matches = 0;
        keys.forEach(k => {
          const uVal = userResponse[k] === true || userResponse[k] === 'true';
          if (uVal === expectedMap[k]) {
            matches++;
          }
        });
        scorePct = keys.length > 0 ? (matches / keys.length) * 100 : 70;
        feedbackAr = scorePct >= 80 ? 'يقظة تامة ورصد محكم لكافة التناقضات بالأقوال.' : 'رصد مقبول مع إغفال بعض التباينات الدقيقة.';
        break;
      }

      case 'SET_MATCH': {
        const expectedSet = new Set(config.expectedSet || []);
        const userSelected = new Set(Array.isArray(userResponse.selectedAnomalies) ? userResponse.selectedAnomalies : []);
        let truePositives = 0;
        userSelected.forEach(val => {
          if (expectedSet.has(val)) truePositives++;
        });

        const totalExpected = expectedSet.size;
        scorePct = totalExpected > 0 ? Math.min(100, (truePositives / totalExpected) * 100) : 70;
        feedbackAr = scorePct >= 80 ? 'كشف دقيق للسجلات المنحرفة أو التلاعب بالبيانات.' : 'تم استخراج بعض الاختلالات مع تجاوز بنود أخرى.';
        break;
      }

      case 'HOTSPOT_SELECTION': {
        const expectedHotspots = config.expectedHotspots || [];
        const userPicks = Array.isArray(userResponse.selectedHotspots) ? userResponse.selectedHotspots : [];
        let correctPicks = 0;
        expectedHotspots.forEach(h => {
          if (userPicks.includes(h)) correctPicks++;
        });
        scorePct = expectedHotspots.length > 0 ? (correctPicks / expectedHotspots.length) * 100 : 75;
        feedbackAr = scorePct >= 80 ? 'قراءة فضائية وميدانية استراتيجية لكافة المخاطر.' : 'تموضع مقبول وتحديد النقاط البارزة.';
        break;
      }

      case 'REPORT_RUBRIC': {
        const text = (userResponse.texteRapport || '').trim();
        const words = text ? text.split(/\s+/).length : 0;
        const reqKeywords = config.requiredKeywords || [];
        let keysFound = 0;
        reqKeywords.forEach(kw => {
          if (text.includes(kw)) keysFound++;
        });

        let pct = 40;
        if (words >= (config.minWords || 30)) pct += 30;
        if (reqKeywords.length > 0) {
          pct += Math.round((keysFound / reqKeywords.length) * 30);
        } else {
          pct += 30;
        }
        scorePct = Math.min(100, Math.max(25, pct));
        feedbackAr = scorePct >= 75 ? 'صياغة عسكرية قانونية رصينة ومطابقة للمعايير الرسمية.' : 'صياغة مقبولة مع الحاجة لتعزيز المصطلحات المتخصصة.';
        break;
      }

      default:
        scorePct = 75;
        feedbackAr = 'تم تقييم المهمة.';
    }

    const finalPct = Math.round(scorePct);
    const pointsObtenus = Math.round((finalPct / 100) * maxPoints * 10) / 10;

    return {
      scorePct: finalPct,
      pointsObtenus,
      pointsMax: maxPoints,
      feedbackAr
    };
  },

  /**
   * Calcule le profil complet de compétences sur un ensemble de tâches évaluées
   */
  calculateCompetencyProfile(evaluatedTasks = []) {
    const compMap = {};

    evaluatedTasks.forEach(item => {
      const task = item.task;
      const tags = task.competenceTags || [];
      const score = item.evalResult?.scorePct || 0;

      tags.forEach(tag => {
        if (!compMap[tag]) {
          compMap[tag] = { tag, scores: [] };
        }
        compMap[tag].scores.push(score);
      });
    });

    const labelsAr = {
      DOC_ANALYSIS: 'تحليل الوثائق والمحاضر',
      ACCURACY: 'الدقة ورصد التناقضات',
      CLASSIFICATION: 'تصنيف الأدلة والمحجوزات',
      PROCEDURAL_AWARENESS: 'الوعي بالمسطرة الجنائية',
      REPORT_PREPARATION: 'تحرير التقارير العسكرية',
      FIELD_ORG: 'التنظيم والانتشار الميداني',
      RISK_ASSESSMENT: 'تقييم المخاطر الميدانية',
      PROCEDURAL_APP: 'تطبيق المساطر والتدابير',
      DECISION_MAKING: 'اتخاذ القرارات التكتيكية',
      DIGITAL_SKILLS: 'المهارات الرقمية وأنظمة الأمن',
      DATA_PROCESSING: 'معالجة وتدقيق البيانات',
      TECH_SOLVING: 'حل المشكلات التقنية الجنائية',
      PLANNING: 'التخطيط الاستراتيجي العملياتي',
      ORGANIZATION: 'تنظيم وتوزيع الموارد',
      COORDINATION: 'التنسيق والقيادة العملياتية',
      RESOURCE_MGMT: 'تدبير اللوجستيك والاحتياط',
      FIELD_OBS: 'الملاحظة والرصد الميداني',
      ENV_AWARENESS: 'الوعي بالقوانين البيئية',
      ADMIN_ORG: 'التنظيم الإداري وحفظ الملفات',
      PROCEDURAL_UND: 'استيعاب الآجال والشكليات',
      DOC_MGMT: 'تدبير المذكرات والأرشيف'
    };

    return Object.keys(compMap).map(tag => {
      const scores = compMap[tag].scores;
      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      return {
        code: tag,
        nomAr: labelsAr[tag] || tag,
        scorePct: avg,
        niveau: avg >= 80 ? 'MAITRISE_ELEVEE' : avg >= 65 ? 'SATISFAISANT' : 'EN_DEVELOPPEMENT'
      };
    });
  }
};

