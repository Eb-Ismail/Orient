import React, { useState, useEffect, useMemo } from 'react';
import {
  Shield,
  Users,
  Anchor,
  Plane,
  Scale,
  Microscope,
  Crosshair,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  FileText,
  Download,
  Check,
  AlertCircle,
  HelpCircle,
  Compass,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Play,
  RotateCcw,
  Target,
  Star,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  GraduationCap
} from 'lucide-react';
import { getSpecialtyById, GENDARMERIE_SPECIALTIES } from '../../data/gendarmerieSpecialtiesData.js';
import Badge from '../common/Badge.jsx';
import SpecialtyImage from '../common/SpecialtyImage.jsx';

// Dictionnaire d'icônes dynamiques
const ICON_MAP = {
  Shield: Shield,
  Users: Users,
  Anchor: Anchor,
  Plane: Plane,
  Scale: Scale,
  Microscope: Microscope,
  Crosshair: Crosshair
};

// Les 6 étapes réglementaires du parcours pédagogique
const STEPS = [
  { id: 1, key: 'decouverte', label: '1. Découverte', short: 'Découverte', icon: Compass },
  { id: 2, key: 'apprentissage', label: '2. Apprentissage', short: 'Cours', icon: BookOpen },
  { id: 3, key: 'exercices', label: '3. Exercices', short: 'Exercices', icon: Target },
  { id: 4, key: 'tests', label: '4. Tests', short: 'Tests', icon: HelpCircle },
  { id: 5, key: 'examen', label: '5. Examen Final', short: 'Examen', icon: Award },
  { id: 6, key: 'orientation', label: '6. Orientation', short: 'Bilan', icon: TrendingUp }
];

export default function SpecialtyWorkspaceView({
  specialtyId,
  onBack,
  onOpenOrientationComparison
}) {
  const specialty = useMemo(() => getSpecialtyById(specialtyId) || GENDARMERIE_SPECIALTIES[0], [specialtyId]);
  const [activeStep, setActiveStep] = useState(1);

  // État de l'Apprentissage (Chapitre actif)
  const [selectedModuleId, setSelectedModuleId] = useState(specialty.modules?.[0]?.id || null);
  const [selectedChapterId, setSelectedChapterId] = useState(specialty.chapitresDetailles?.[0]?.id || null);

  // État des Exercices interactifs
  const [userExerciseAnswers, setUserExerciseAnswers] = useState({});
  const [exerciseSubmitted, setExerciseSubmitted] = useState({});

  // État du Test de connaissances
  const [testActive, setTestActive] = useState(false);
  const [testCurrentIndex, setTestCurrentIndex] = useState(0);
  const [testAnswers, setTestAnswers] = useState({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testScore, setTestScore] = useState(null);

  // État de l'Examen Final
  const [examActive, setExamActive] = useState(false);
  const [examCurrentIndex, setExamCurrentIndex] = useState(0);
  const [examAnswers, setExamAnswers] = useState({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examScore, setExamScore] = useState(null);
  const [examTimeLeft, setExamTimeLeft] = useState(30 * 60);

  // Progression globale de l'élève dans la spécialité
  const [downloadedSupports, setDownloadedSupports] = useState({});

  const IconComponent = ICON_MAP[specialty.icone] || Shield;

  // Réinitialisation lors du changement de spécialité
  useEffect(() => {
    setSelectedModuleId(specialty.modules?.[0]?.id || null);
    setSelectedChapterId(specialty.chapitresDetailles?.[0]?.id || null);
    setUserExerciseAnswers({});
    setExerciseSubmitted({});
    setTestActive(false);
    setTestSubmitted(false);
    setTestScore(null);
    setExamActive(false);
    setExamSubmitted(false);
    setExamScore(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [specialtyId, specialty]);

  // Chronomètre de l'Examen Final
  useEffect(() => {
    let timer;
    if (examActive && !examSubmitted && examTimeLeft > 0) {
      timer = setInterval(() => {
        setExamTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examActive, examSubmitted, examTimeLeft]);

  // Questions synthétiques supplémentaires pour le Test
  const testQuestions = useMemo(() => {
    return [
      {
        id: 1,
        question: `Dans le cadre de la ${specialty.nomFr}, quel est le principe opérationnel cardinal ?`,
        options: [
          `La subordination absolue aux ordres hiérarchiques et le respect strict du cadre légal`,
          `L'improvisation tactique en fonction des conditions météorologiques`,
          `L'intervention solitaire sans communication radio préalable`,
          `L'absence de consignation écrite pour des motifs de discrétion`
        ],
        reponse: 0,
        explication: `Toute action de la Gendarmerie Royale s'inscrit rigoureusement dans la légalité, l'éthique militaire et la chaîne de commandement.`
      },
      {
        id: 2,
        question: `Quel document constitue la mémoire juridique et administrative de l'unité ?`,
        options: [
          `Le carnet de bord personnel de l'élève`,
          `Le registre officiel des déclarations et la main courante d'intervention`,
          `Les messages télégraphiques non chiffrés`,
          `La feuille de route d'entretien mécanique`
        ],
        reponse: 1,
        explication: `La main courante et les registres réglementaires garantissent l'authenticité et la traçabilité juridique des actes.`
      },
      {
        id: 3,
        question: `Quelle attitude est impérative lors de toute interaction avec le public ou en mission sensible ?`,
        options: [
          `Une neutralité froide sans explication`,
          `Une posture militaire stricte, calme, courtoise et exemplaire`,
          `Une attitude défensive permanente`,
          `Une prise de décision sans consultation du chef d'élément`
        ],
        reponse: 1,
        explication: `L'exemplarité et la maîtrise de soi incarnent les valeurs d'honneur et de dévouement de la Gendarmerie Royale.`
      },
      {
        id: 4,
        question: `Comment est assurée la sécurité immédiate lors d'un dispositif statique ou de barrage ?`,
        options: [
          `Par un personnel isolé en première ligne`,
          `Par la mise en place d'un guetteur/couvreur armé placé à distance de sécurité`,
          `Par l'extinction totale des gyrophares la nuit`,
          `Par la concentration de tous les effectifs au même endroit`
        ],
        reponse: 1,
        explication: `La doctrine de protection mutuelle exige un élément d'appui ou de couverture pour parer à toute menace soudaine.`
      }
    ];
  }, [specialty]);

  // Questions pour l'Examen Final sur 20 points
  const examQuestions = useMemo(() => {
    return [
      {
        id: 101,
        question: `Quelle est la première mesure de sauvegarde à appliquer dès l'arrivée sur les lieux d'un incident majeur ?`,
        options: [
          `Geler la zone, établir un périmètre de sécurité et rendre compte immédiatement au commandement`,
          `Manipuler immédiatement les pièces matérielles pour accélérer l'inventaire`,
          `Interroger les témoins sans noter leurs identités`,
          `Autoriser la circulation des véhicules d'urgence sans couloir dédié`
        ],
        reponse: 0,
        bareme: 4,
        explication: `Le gel de la zone et le compte-rendu instantané sont les piliers de la doctrine opérationnelle.`
      },
      {
        id: 102,
        question: `Quelle condition fondamentale régit l'usage de la force armée par les personnels de la Gendarmerie Royale ?`,
        options: [
          `L'autorisation systématique sur simple ordre verbal non vérifié`,
          `La stricte nécessité, l'absolue proportionnalité et la légitime défense avérée`,
          `La fuite présumée de tout individu sans menace corporelle directe`,
          `La protection exclusive des biens matériels contre toute dégradation`
        ],
        reponse: 1,
        bareme: 4,
        explication: `L'usage de la force est encadré par des règles constitutionnelles et pénales strictes de proportionnalité.`
      },
      {
        id: 103,
        question: `Dans la communication opérationnelle tactique, quelle règle de transmission radio prévaut ?`,
        options: [
          `Messages longs et détaillés en langage familier`,
          `Brièveté, clarté, indicatifs réglementaires et vérification de la réception (collationnement)`,
          `Utilisation préférentielle du réseau téléphonique personnel`,
          `Transmission sur la fréquence générale sans autorisation du central`
        ],
        reponse: 1,
        bareme: 4,
        explication: `La clarté et la discipline des transmissions préservent la disponibilité du réseau d'urgence.`
      },
      {
        id: 104,
        question: `Quelle est la finalité principale de la traçabilité des pièces à conviction et des scellés ?`,
        options: [
          `Remplir les obligations administratives sans portée juridique`,
          `Garantir l'intégrité probatoire indiscutable devant les juridictions compétentes`,
          `Faciliter le rangement dans les armoires de la brigade`,
          `Permettre la restitution rapide aux proches sans contrôle`
        ],
        reponse: 1,
        bareme: 4,
        explication: `La chaîne de traçabilité est inviolable pour que la preuve scientifique ou matérielle conserve sa valeur probante.`
      },
      {
        id: 105,
        question: `En matière de secours et d'assistance aux populations, quelle priorité guide l'action du gendarme ?`,
        options: [
          `La sauvegarde prioritaire des vies humaines, l'alerte précoce des secours spécialisés et la sécurisation des abords`,
          `La prise de photos pour le bilan statistique`,
          `L'attente des consignes écrites avant tout geste de premier secours`,
          `L'évacuation sans tri préalable des blessés`
        ],
        reponse: 0,
        bareme: 4,
        explication: `Le devoir d'assistance et de préservation de la vie humaine prime sur toute autre considération.`
      }
    ];
  }, []);

  // Gestion des exercices
  const handleSelectExerciseOption = (exId, optIndex) => {
    if (exerciseSubmitted[exId]) return;
    setUserExerciseAnswers((prev) => ({ ...prev, [exId]: optIndex }));
  };

  const handleSubmitExercise = (exId) => {
    setExerciseSubmitted((prev) => ({ ...prev, [exId]: true }));
  };

  const handleResetExercise = (exId) => {
    setUserExerciseAnswers((prev) => {
      const copy = { ...prev };
      delete copy[exId];
      return copy;
    });
    setExerciseSubmitted((prev) => {
      const copy = { ...prev };
      delete copy[exId];
      return copy;
    });
  };

  // Gestion du Test
  const handleAnswerTest = (optIndex) => {
    setTestAnswers((prev) => ({ ...prev, [testCurrentIndex]: optIndex }));
  };

  const handleFinishTest = () => {
    let correct = 0;
    testQuestions.forEach((q, idx) => {
      if (testAnswers[idx] === q.reponse) correct += 1;
    });
    const calculatedScore = +( (correct / testQuestions.length) * 20 ).toFixed(1);
    setTestScore(calculatedScore);
    setTestSubmitted(true);
  };

  // Gestion de l'Examen Final
  const handleAnswerExam = (optIndex) => {
    setExamAnswers((prev) => ({ ...prev, [examCurrentIndex]: optIndex }));
  };

  const handleFinishExam = () => {
    let scoreTotal = 0;
    examQuestions.forEach((q, idx) => {
      if (examAnswers[idx] === q.reponse) {
        scoreTotal += q.bareme;
      }
    });
    setExamScore(scoreTotal);
    setExamSubmitted(true);
    setExamActive(false);
  };

  // Téléchargement simulé de support pédagogique
  const handleDownloadSupport = (titre) => {
    setDownloadedSupports((prev) => ({ ...prev, [titre]: true }));
    const dummyBlob = new Blob([`Support officiel Gendarmerie Royale : ${titre}\nSpécialité : ${specialty.nomFr}\nDocument de travail confidentiel défense.`], { type: 'text/plain' });
    const url = URL.createObjectURL(dummyBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${titre.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filtrage du chapitre actif pour l'apprentissage
  const activeChapter = useMemo(() => {
    return specialty.chapitresDetailles?.find((c) => c.id === selectedChapterId) || specialty.chapitresDetailles?.[0] || null;
  }, [specialty, selectedChapterId]);

  return (
    <div className="space-y-6 animate-fade-slide pb-16 w-full">
      {/* 1. Barre supérieure de retour & fil d'Ariane */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slateSubtle-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slateSubtle-700 hover:text-gendarmerie hover:bg-cream-100 border border-slateSubtle-200 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-gold-dark" />
            <span>Toutes les Spécialités</span>
          </button>
          <div className="h-4 w-px bg-slateSubtle-200 hidden sm:block" />
          <div className="flex items-center gap-2 text-xs text-slateSubtle-600 truncate">
            <span className="font-semibold text-gendarmerie">Académie Militaire</span>
            <ChevronRight className="w-3.5 h-3.5 text-slateSubtle-400" />
            <span className="font-bold text-slateSubtle-900 truncate">{specialty.nomFr}</span>
          </div>
        </div>

        {/* Bouton direct vers le Hub Comparatif d'Orientation */}
        {onOpenOrientationComparison && (
          <button
            type="button"
            onClick={onOpenOrientationComparison}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gold/15 hover:bg-gold/25 text-gendarmerie border border-gold/40 text-xs font-bold transition cursor-pointer self-start sm:self-auto"
          >
            <Compass className="w-4 h-4 text-gold-dark" />
            <span>Comparatif d'Orientation (7 Spécialités)</span>
          </button>
        )}
      </div>

      {/* 2. Bannière Institutionnelle avec Photo Réelle HD de la Spécialité */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg border border-gold/30 bg-gendarmerie-darkest">
        {/* Arrière-plan photo HD avec voile sombre militaire */}
        <div className="absolute inset-0 z-0">
          <SpecialtyImage
            src={specialty.image?.url}
            fallbackSrc={specialty.image?.fallbackUrl}
            alt={specialty.image?.alt || specialty.nomFr}
            className="w-full h-full object-cover object-center brightness-60 filter contrast-110"
            aspectRatio="aspect-video"
            heightClass="h-full"
            icon={IconComponent}
            badgeText={specialty.code}
            title={specialty.nomFr}
            arabicTitle={specialty.nomAr}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gendarmerie-darkest via-gendarmerie-darkest/75 to-transparent pointer-events-none" />
        </div>

        {/* Contenu textuel sur la bannière */}
        <div className="relative z-10 p-5 sm:p-7 md:p-9 text-white space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${specialty.badgeClass || 'bg-emerald-100 text-emerald-800 border-emerald-300'}`}>
              <IconComponent className="w-3.5 h-3.5" />
              <span>{specialty.code}</span>
            </span>
            <span className="text-xs text-gold-light/90 font-mono tracking-widest uppercase font-bold">
              Royaume du Maroc • Gendarmerie Royale
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-serif">
              {specialty.nomFr}
            </h1>
            <p className="text-sm sm:text-base text-gold-light font-arabic font-medium" dir="rtl">
              {specialty.nomAr}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 italic border-l-2 border-gold pl-3 py-0.5 leading-relaxed">
            « {specialty.devise} »
          </p>

          <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed max-w-3xl">
            {specialty.presentation}
          </p>

          {/* Métadonnées chiffrées clés & Progression */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-gold" />
              <span><strong>{specialty.modules?.length || 0}</strong> Modules de formation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-gold" />
              <span><strong>{specialty.chapitresDetailles?.length || 0}</strong> Chapitres de cours</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Download className="w-4 h-4 text-gold" />
              <span><strong>{specialty.supportsPedagogiques?.length || 0}</strong> Supports téléchargeables</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-gold" />
              <span>Examen Final <strong>sur 20 points</strong></span>
            </div>
          </div>

          {/* Progression de l'élève & Bouton Découvrir les modules */}
          <div className="pt-3 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center border border-gold/40 text-gold text-xs font-bold shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="text-slate-300 block">Progression de l'élève :</span>
                <span className="font-bold text-white">Cursus Débloqué • Éligible à la spécialité</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveStep(2);
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-gendarmerie font-bold text-xs shadow-md transition self-start sm:self-auto cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-gendarmerie" />
              <span>Découvrir les modules</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Stepper Réglementaire des 6 Étapes du Parcours */}
      <div className="bg-white p-2 rounded-2xl border border-slateSubtle-200 shadow-2xs overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            const isCompleted = activeStep > step.id || (step.id === 5 && examSubmitted) || (step.id === 4 && testSubmitted);

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  setActiveStep(step.id);
                  window.scrollTo({ top: 320, behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gendarmerie text-white shadow-xs'
                    : isCompleted
                    ? 'bg-cream-100 text-gendarmerie hover:bg-cream-200'
                    : 'text-slateSubtle-600 hover:bg-cream-100 hover:text-slateSubtle-900'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isActive
                    ? 'bg-gold text-gendarmerie'
                    : isCompleted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {isCompleted && !isActive ? <Check className="w-3 h-3" /> : step.id}
                </div>
                <span>{step.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. CONTENU DE L'ÉTAPE SÉLECTIONNÉE                                        */}
      {/* ========================================================================= */}

      {/* ------------------------------------------------------------------------- */}
      {/* ÉTAPE 1 : DÉCOUVERTE & FONDEMENTS                                         */}
      {/* ------------------------------------------------------------------------- */}
      {activeStep === 1 && (
        <div className="space-y-6 animate-fade-slide">
          {/* Grille Missions & Objectifs pédagogiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Missions et responsabilités réglementaires */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slateSubtle-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slateSubtle-100 pb-3">
                <div className="w-8 h-8 rounded-xl bg-gendarmerie/10 flex items-center justify-center text-gendarmerie">
                  <ShieldCheck className="w-4 h-4 text-gendarmerie" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gendarmerie">
                    Missions & Responsabilités Réglementaires
                  </h3>
                  <p className="text-xs text-slateSubtle-500">Missions officielles assignées à cette spécialité</p>
                </div>
              </div>

              <ul className="space-y-2.5">
                {specialty.missions?.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slateSubtle-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Objectifs pédagogiques de formation */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slateSubtle-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slateSubtle-100 pb-3">
                <div className="w-8 h-8 rounded-xl bg-gold/15 flex items-center justify-center text-gold-dark">
                  <Target className="w-4 h-4 text-gold-dark" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gendarmerie">
                    Objectifs Pédagogiques & Compétences Visées
                  </h3>
                  <p className="text-xs text-slateSubtle-500">Aptitudes développées durant le cursus initial</p>
                </div>
              </div>

              <div className="space-y-3">
                {specialty.objectifsPedagogiques?.map((obj, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-cream-50 border border-slateSubtle-200/70 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-slateSubtle-800 font-medium leading-relaxed">{obj}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Galerie Photo Réelle & Légende Opérationnelle */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slateSubtle-200 shadow-2xs space-y-4">
            <h3 className="text-sm sm:text-base font-bold text-gendarmerie flex items-center gap-2">
              <IconComponent className="w-4 h-4 text-gold-dark" />
              <span>Contexte Opérationnel de Terrain • Illustration Réelle</span>
            </h3>

            <div className="relative rounded-2xl overflow-hidden border border-slateSubtle-200 max-h-[380px]">
              <SpecialtyImage
                src={specialty.image?.url}
                fallbackSrc={specialty.image?.fallbackUrl}
                alt={specialty.image?.alt}
                className="w-full h-full object-cover max-h-[380px]"
                aspectRatio="aspect-video"
                heightClass="h-[280px] sm:h-[350px]"
                icon={IconComponent}
                badgeText={specialty.code}
                title={specialty.nomFr}
                arabicTitle={specialty.nomAr}
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-4 text-white text-xs pointer-events-none">
                <p className="font-semibold">{specialty.image?.caption}</p>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Référentiel visuel officiel • Direction Générale de la Gendarmerie Royale
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gendarmerie hover:bg-gendarmerie-light text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <span>Accéder aux Cours & Modules</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------- */}
      {/* ÉTAPE 2 : APPRENTISSAGE (MODULES, COURS DÉTAILLÉS & SUPPORTS)              */}
      {/* ------------------------------------------------------------------------- */}
      {activeStep === 2 && (
        <div className="space-y-6 animate-fade-slide">
          {/* Sélecteur de Modules de formation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {specialty.modules?.map((m) => {
              const isSelected = selectedModuleId === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => {
                    setSelectedModuleId(m.id);
                    // Sélectionner le premier chapitre correspondant
                    const firstChap = specialty.chapitresDetailles?.find((c) => c.moduleId === m.id);
                    if (firstChap) setSelectedChapterId(firstChap.id);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-cream-50 border-gendarmerie ring-2 ring-gold/30 shadow-sm'
                      : 'bg-white border-slateSubtle-200 hover:border-gold hover:shadow-2xs'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-gold-dark">{m.id}</span>
                      <span className="px-2 py-0.5 rounded-full bg-cream-200 text-slateSubtle-700 text-[10px] font-semibold">
                        {m.difficulte}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-gendarmerie line-clamp-2">
                      {m.titre}
                    </h4>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slateSubtle-100 flex items-center justify-between text-xs text-slateSubtle-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{m.duree}</span>
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-gendarmerie">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{m.chapitresCount} chapitres</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lecteur de Cours & Chapitres Détaillés */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sommaire latéral des chapitres */}
            <div className="lg:col-span-4 bg-white p-4 rounded-2xl border border-slateSubtle-200 shadow-2xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slateSubtle-600 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-gold-dark" />
                <span>Chapitres du programme</span>
              </h4>

              <div className="space-y-1.5">
                {specialty.chapitresDetailles?.map((chap) => {
                  const isChapSelected = selectedChapterId === chap.id;
                  return (
                    <button
                      key={chap.id}
                      type="button"
                      onClick={() => setSelectedChapterId(chap.id)}
                      className={`w-full text-left p-3 rounded-xl text-xs transition cursor-pointer flex items-start gap-2.5 ${
                        isChapSelected
                          ? 'bg-gendarmerie text-white font-bold shadow-2xs'
                          : 'text-slateSubtle-700 hover:bg-cream-100'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        isChapSelected ? 'bg-gold' : 'bg-slateSubtle-300'
                      }`} />
                      <div className="min-w-0">
                        <span className="text-[10px] opacity-75 font-mono block">{chap.id}</span>
                        <span className="line-clamp-2">{chap.titre}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contenu textuel et pédagogique du chapitre */}
            <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slateSubtle-200 shadow-2xs space-y-4">
              {activeChapter ? (
                <>
                  <div className="border-b border-slateSubtle-100 pb-3 space-y-1">
                    <span className="text-[11px] font-mono font-bold text-gold-dark uppercase tracking-wider">
                      Module : {activeChapter.moduleId} • Chapitre : {activeChapter.id}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-gendarmerie font-serif">
                      {activeChapter.titre}
                    </h3>
                  </div>

                  <div className="prose prose-sm max-w-none text-slateSubtle-800 leading-relaxed whitespace-pre-line text-xs sm:text-sm font-sans">
                    {activeChapter.contenu}
                  </div>

                  <div className="pt-4 border-t border-slateSubtle-100 flex items-center justify-between">
                    <span className="text-xs text-slateSubtle-500 italic">
                      Support d'instruction agréé • Gendarmerie Royale
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gendarmerie hover:bg-gendarmerie-light text-white text-xs font-bold transition cursor-pointer"
                    >
                      <span>Passer aux Exercices</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-slateSubtle-500 text-xs">
                  Sélectionnez un chapitre dans le sommaire pour afficher le cours.
                </div>
              )}
            </div>
          </div>

          {/* Supports Pédagogiques Téléchargeables */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slateSubtle-200 shadow-2xs space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-gendarmerie flex items-center gap-2">
              <Download className="w-4 h-4 text-gold-dark" />
              <span>Supports d'Instruction Téléchargeables (Mémentos & Fiches Réflexes)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {specialty.supportsPedagogiques?.map((sup, idx) => {
                const isDownloaded = downloadedSupports[sup.titre];
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slateSubtle-200 bg-cream-50 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-gendarmerie/10 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-gendarmerie" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slateSubtle-800 truncate" title={sup.titre}>
                          {sup.titre}
                        </p>
                        <p className="text-[10px] text-slateSubtle-500">
                          {sup.type} • {sup.taille}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDownloadSupport(sup.titre)}
                      className={`p-2 rounded-lg text-xs font-bold transition shrink-0 cursor-pointer ${
                        isDownloaded
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-white border border-slateSubtle-200 text-gendarmerie hover:bg-gold/20'
                      }`}
                      title="Télécharger le support"
                    >
                      {isDownloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------- */}
      {/* ÉTAPE 3 : EXERCICES INTERACTIFS DE MISE EN SITUATION                      */}
      {/* ------------------------------------------------------------------------- */}
      {activeStep === 3 && (
        <div className="space-y-6 animate-fade-slide">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slateSubtle-200 shadow-2xs space-y-4">
            <div className="border-b border-slateSubtle-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-gendarmerie flex items-center gap-2">
                  <Target className="w-4 h-4 text-gold-dark" />
                  <span>Exercices Pratiques & Mises en Situation Opérationnelles</span>
                </h3>
                <p className="text-xs text-slateSubtle-500">
                  Validez votre compréhension avant de vous présenter aux tests notés
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-cream-200 text-gendarmerie font-bold">
                {specialty.exercices?.length || 0} Exercice(s) disponible(s)
              </span>
            </div>

            <div className="space-y-6">
              {specialty.exercices?.map((ex, exIndex) => {
                const selectedOpt = userExerciseAnswers[ex.id];
                const isSubmitted = exerciseSubmitted[ex.id];
                const isCorrect = isSubmitted && selectedOpt === ex.reponseCorrecte;

                return (
                  <div
                    key={ex.id || exIndex}
                    className="p-5 rounded-2xl border border-slateSubtle-200 bg-cream-50/50 space-y-4"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-gold-dark uppercase tracking-wider">
                        Exercice {exIndex + 1} • {ex.type}
                      </span>
                      {isSubmitted && (
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {isCorrect ? 'Réponse Exacte' : 'À Réviser'}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold text-gendarmerie">
                        {ex.titre}
                      </h4>
                      <p className="text-xs sm:text-sm text-slateSubtle-700 leading-relaxed font-medium">
                        {ex.question}
                      </p>
                    </div>

                    {/* Options de réponse */}
                    <div className="space-y-2">
                      {ex.options?.map((opt, optIdx) => {
                        const isChosen = selectedOpt === optIdx;
                        let optionStyle = 'bg-white border-slateSubtle-200 text-slateSubtle-800 hover:border-gold';

                        if (isSubmitted) {
                          if (optIdx === ex.reponseCorrecte) {
                            optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                          } else if (isChosen && optIdx !== ex.reponseCorrecte) {
                            optionStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                          }
                        } else if (isChosen) {
                          optionStyle = 'bg-cream-100 border-gendarmerie ring-2 ring-gold/40 text-gendarmerie font-bold';
                        }

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleSelectExerciseOption(ex.id, optIdx)}
                            className={`p-3 rounded-xl border text-xs transition cursor-pointer flex items-center justify-between ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {isSubmitted && optIdx === ex.reponseCorrecte && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explication après soumission */}
                    {isSubmitted && (
                      <div className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                        isCorrect ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-amber-50 border border-amber-200 text-amber-900'
                      }`}>
                        <p className="font-bold mb-1">Analyse pédagogique de la situation :</p>
                        <p>{ex.explication}</p>
                      </div>
                    )}

                    {/* Actions de l'exercice */}
                    <div className="flex items-center justify-between pt-2">
                      {isSubmitted ? (
                        <button
                          type="button"
                          onClick={() => handleResetExercise(ex.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slateSubtle-200 text-slateSubtle-600 hover:bg-white text-xs font-semibold cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Recommencer l'exercice</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={selectedOpt === undefined}
                          onClick={() => handleSubmitExercise(ex.id)}
                          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
                            selectedOpt !== undefined
                              ? 'bg-gendarmerie text-white hover:bg-gendarmerie-light'
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          <Check className="w-4 h-4" />
                          <span>Vérifier ma réponse</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slateSubtle-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveStep(4)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gendarmerie hover:bg-gendarmerie-light text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <span>Accéder au Test de Connaissances</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------- */}
      {/* ÉTAPE 4 : TESTS DE CONNAISSANCES MINUTÉS (SUR 20)                         */}
      {/* ------------------------------------------------------------------------- */}
      {activeStep === 4 && (
        <div className="space-y-6 animate-fade-slide">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slateSubtle-200 shadow-2xs space-y-4">
            <div className="border-b border-slateSubtle-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-gendarmerie flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-gold-dark" />
                  <span>{specialty.testConnaissances?.titre || 'Test d\'Évaluation des Connaissances'}</span>
                </h3>
                <p className="text-xs text-slateSubtle-500">
                  Évaluation continue notée sur 20 points • Seuil d'admissibilité fixé à 12 / 20
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-cream-200 text-slateSubtle-800 font-semibold">
                  {testQuestions.length} Questions
                </span>
                <span className="px-2.5 py-1 rounded-full bg-gold/15 text-gold-dark font-bold font-mono">
                  Durée conseillée : 15 min
                </span>
              </div>
            </div>

            {!testActive && !testSubmitted && (
              <div className="text-center py-8 space-y-4 max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-gendarmerie/10 text-gendarmerie flex items-center justify-center mx-auto">
                  <HelpCircle className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-gendarmerie">
                    Prêt pour le test de connaissances ?
                  </h4>
                  <p className="text-xs text-slateSubtle-600 leading-relaxed">
                    Ce test évalue votre compréhension théorique des missions et des protocoles de la {specialty.nomFr}.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setTestActive(true);
                    setTestCurrentIndex(0);
                    setTestAnswers({});
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gendarmerie hover:bg-gendarmerie-light text-white text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Démarrer le Test</span>
                </button>
              </div>
            )}

            {testActive && !testSubmitted && (
              <div className="space-y-5">
                {/* Barre de progression du test */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-slateSubtle-600">
                    <span>Question {testCurrentIndex + 1} sur {testQuestions.length}</span>
                    <span className="font-semibold text-gendarmerie">
                      {Math.round(((testCurrentIndex + 1) / testQuestions.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-gold transition-all duration-300"
                      style={{ width: `${((testCurrentIndex + 1) / testQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Carte de question */}
                <div className="p-5 rounded-2xl border border-slateSubtle-200 bg-cream-50/50 space-y-4">
                  <h4 className="text-sm font-bold text-gendarmerie">
                    {testQuestions[testCurrentIndex].question}
                  </h4>

                  <div className="space-y-2">
                    {testQuestions[testCurrentIndex].options.map((opt, optIdx) => {
                      const isSelected = testAnswers[testCurrentIndex] === optIdx;
                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleAnswerTest(optIdx)}
                          className={`p-3.5 rounded-xl border text-xs transition cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-cream-100 border-gendarmerie ring-2 ring-gold/40 text-gendarmerie font-bold'
                              : 'bg-white border-slateSubtle-200 text-slateSubtle-800 hover:border-gold'
                          }`}
                        >
                          <span>{opt}</span>
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                            isSelected ? 'border-gendarmerie bg-gendarmerie text-white' : 'border-slate-300'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation entre questions */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    disabled={testCurrentIndex === 0}
                    onClick={() => setTestCurrentIndex((prev) => prev - 1)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slateSubtle-200 text-xs font-semibold text-slateSubtle-700 disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Précédent</span>
                  </button>

                  {testCurrentIndex < testQuestions.length - 1 ? (
                    <button
                      type="button"
                      disabled={testAnswers[testCurrentIndex] === undefined}
                      onClick={() => setTestCurrentIndex((prev) => prev + 1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gendarmerie text-white text-xs font-bold disabled:opacity-40 cursor-pointer"
                    >
                      <span>Suivant</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={testAnswers[testCurrentIndex] === undefined}
                      onClick={handleFinishTest}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Terminer et Noter</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Résultat du test */}
            {testSubmitted && (
              <div className="p-6 rounded-2xl bg-cream-50 border border-slateSubtle-200 text-center space-y-4 max-w-lg mx-auto">
                <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
                  testScore >= 12 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  <Award className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="text-3xl font-extrabold text-gendarmerie font-serif">
                    {testScore} / 20
                  </span>
                  <p className="text-xs font-bold text-slateSubtle-700">
                    {testScore >= 12 ? 'Test Réussi avec Succès' : 'Seuil d\'admissibilité non atteint (Seuil : 12 / 20)'}
                  </p>
                  <p className="text-xs text-slateSubtle-500">
                    {testScore >= 12
                      ? 'Félicitations, vous maîtrisez les connaissances théoriques fondamentales de cette spécialité.'
                      : 'Nous vous recommandons de réviser les modules avant de vous présenter à l\'Examen Final.'}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTestActive(true);
                      setTestSubmitted(false);
                      setTestCurrentIndex(0);
                      setTestAnswers({});
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slateSubtle-200 text-xs font-semibold text-slateSubtle-700 hover:bg-white cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Repasser le Test</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep(5)}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gendarmerie hover:bg-gendarmerie-light text-white text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    <span>Passer à l'Examen Final</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------- */}
      {/* ÉTAPE 5 : EXAMEN FINAL CERTIFIÉ SUR 20 POINTS                             */}
      {/* ------------------------------------------------------------------------- */}
      {activeStep === 5 && (
        <div className="space-y-6 animate-fade-slide">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slateSubtle-200 shadow-2xs space-y-4">
            <div className="border-b border-slateSubtle-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold" />
                  <span className="text-[11px] font-mono font-bold text-gold-dark uppercase tracking-wider">
                    Épreuve Officielle de Certification
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gendarmerie">
                  {specialty.examenFinal?.titre || 'Examen Final de Spécialité'}
                </h3>
                <p className="text-xs text-slateSubtle-500">
                  Notation sur 20 points • Barème officiel de la commission d'orientation
                </p>
              </div>

              {examActive && !examSubmitted && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 font-mono font-bold text-xs shrink-0">
                  <Clock className="w-4 h-4 text-rose-600 animate-pulse" />
                  <span>
                    Temps restant : {Math.floor(examTimeLeft / 60)}:{(examTimeLeft % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              )}
            </div>

            {!examActive && !examSubmitted && (
              <div className="p-6 rounded-2xl bg-cream-50 border border-gold/30 text-center space-y-4 max-w-xl mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-gold/20 text-gold-dark flex items-center justify-center mx-auto border border-gold/40">
                  <Award className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-base font-bold text-gendarmerie font-serif">
                    Examen Certifié : {specialty.nomFr}
                  </h4>
                  <p className="text-xs text-slateSubtle-700 leading-relaxed">
                    Cet examen sanctionne la validation de la spécialité. Il comporte <strong>5 questions de mise en situation tactique</strong> notées chacune sur <strong>4 points</strong>, pour un total de <strong>20 points</strong>.
                  </p>
                  <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
                    <div className="p-2 rounded-xl bg-white border border-slateSubtle-200">
                      <span className="text-slateSubtle-500 block text-[10px]">Barème</span>
                      <strong className="text-gendarmerie">20 points</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-slateSubtle-200">
                      <span className="text-slateSubtle-500 block text-[10px]">Seuil</span>
                      <strong className="text-emerald-700">12 / 20</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-slateSubtle-200">
                      <span className="text-slateSubtle-500 block text-[10px]">Durée</span>
                      <strong className="text-slate-800">30 min</strong>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setExamActive(true);
                    setExamCurrentIndex(0);
                    setExamAnswers({});
                    setExamTimeLeft(30 * 60);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gendarmerie hover:bg-gendarmerie-light text-white text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  <Award className="w-4 h-4 text-gold" />
                  <span>Lancer l'Épreuve Certifiée</span>
                </button>
              </div>
            )}

            {examActive && !examSubmitted && (
              <div className="space-y-5">
                <div className="flex items-center justify-between text-xs text-slateSubtle-600">
                  <span>Question d'examen {examCurrentIndex + 1} / {examQuestions.length}</span>
                  <span className="font-semibold text-gold-dark">
                    Valeur : {examQuestions[examCurrentIndex].bareme} pts
                  </span>
                </div>

                <div className="p-5 rounded-2xl border border-slateSubtle-200 bg-cream-50/50 space-y-4">
                  <h4 className="text-sm font-bold text-gendarmerie">
                    {examQuestions[examCurrentIndex].question}
                  </h4>

                  <div className="space-y-2">
                    {examQuestions[examCurrentIndex].options.map((opt, optIdx) => {
                      const isSelected = examAnswers[examCurrentIndex] === optIdx;
                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleAnswerExam(optIdx)}
                          className={`p-3.5 rounded-xl border text-xs transition cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-cream-100 border-gendarmerie ring-2 ring-gold/40 text-gendarmerie font-bold'
                              : 'bg-white border-slateSubtle-200 text-slateSubtle-800 hover:border-gold'
                          }`}
                        >
                          <span>{opt}</span>
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                            isSelected ? 'border-gendarmerie bg-gendarmerie text-white' : 'border-slate-300'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    disabled={examCurrentIndex === 0}
                    onClick={() => setExamCurrentIndex((prev) => prev - 1)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slateSubtle-200 text-xs font-semibold text-slateSubtle-700 disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Question précédente</span>
                  </button>

                  {examCurrentIndex < examQuestions.length - 1 ? (
                    <button
                      type="button"
                      disabled={examAnswers[examCurrentIndex] === undefined}
                      onClick={() => setExamCurrentIndex((prev) => prev + 1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gendarmerie text-white text-xs font-bold disabled:opacity-40 cursor-pointer"
                    >
                      <span>Question suivante</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={examAnswers[examCurrentIndex] === undefined}
                      onClick={handleFinishExam}
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                    >
                      <Award className="w-4 h-4 text-gold-light" />
                      <span>Valider & Soumettre l'Examen</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {examSubmitted && (
              <div className="p-6 rounded-2xl bg-cream-50 border border-gold/40 text-center space-y-4 max-w-lg mx-auto">
                <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
                  examScore >= 12 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  <Award className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="text-3xl font-extrabold text-gendarmerie font-serif">
                    {examScore} / 20
                  </span>
                  <p className="text-xs font-bold text-slateSubtle-800 uppercase tracking-wider">
                    {examScore >= 16 ? 'Mention Très Bien — Excellence Opérationnelle' : examScore >= 12 ? 'Mention Bien — Spécialité Validée' : 'Épreuve non validée'}
                  </p>
                  <p className="text-xs text-slateSubtle-600 leading-relaxed">
                    {examScore >= 12
                      ? `Votre note a été enregistrée dans votre dossier de formation et sera intégrée à l'analyse multicritère d'orientation.`
                      : `Votre résultat est inférieur au seuil réglementaire de 12 / 20. Vous pouvez reprendre les modules pour approfondir vos compétences.`}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setExamActive(true);
                      setExamSubmitted(false);
                      setExamCurrentIndex(0);
                      setExamAnswers({});
                      setExamTimeLeft(30 * 60);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slateSubtle-200 text-xs font-semibold text-slateSubtle-700 hover:bg-white cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Repasser l'Examen</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep(6)}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gendarmerie hover:bg-gendarmerie-light text-white text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    <span>Consulter mon Bilan d'Orientation</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------- */}
      {/* ÉTAPE 6 : ORIENTATION & BILAN COMPARATIF DANS CETTE SPÉCIALITÉ            */}
      {/* ------------------------------------------------------------------------- */}
      {activeStep === 6 && (
        <div className="space-y-6 animate-fade-slide">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slateSubtle-200 shadow-2xs space-y-6">
            <div className="border-b border-slateSubtle-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-gendarmerie flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gold-dark" />
                  <span>Bilan d'Adéquation & Recommandation d'Orientation</span>
                </h3>
                <p className="text-xs text-slateSubtle-500">
                  Indice de compatibilité calculé pour la commission d'affectation
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gold/15 border border-gold/30 text-gendarmerie font-bold text-xs">
                <span>Indice d'affinité :</span>
                <span className="text-sm font-extrabold text-gold-dark">
                  {specialty.orientationImpact?.scoreCompatibilityBase || 85}%
                </span>
              </div>
            </div>

            {/* Avertissement Déontologique et Juridique Obligatoire */}
            <div className="p-4 rounded-xl bg-cream-100 border-l-4 border-gold text-slateSubtle-800 text-xs leading-relaxed space-y-1">
              <div className="flex items-center gap-2 font-bold text-gendarmerie">
                <ShieldCheck className="w-4 h-4 text-gold-dark" />
                <span>Notice Réglementaire & Déontologique</span>
              </div>
              <p>
                Ce bilan constitue un <strong>outil consultatif d'aide à la décision</strong> destiné à éclairer l'élève et la commission pédagogique d'orientation. Il ne préjuge en aucun cas des décisions souveraines de commandement, des arrêtés officiels de nomination ni des besoins opérationnels des unités de la Gendarmerie Royale.
              </p>
            </div>

            {/* Compétences dominantes démontrées */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slateSubtle-600">
                Compétences Clés Requières pour cette Spécialité
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specialty.competencesCibles?.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-cream-50 border border-slateSubtle-200 flex items-start gap-2.5 text-xs text-slateSubtle-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Profil recherché par le commandement */}
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
              <span className="font-bold block uppercase tracking-wider text-[10px] text-emerald-800">
                Profil recherché par le Commandement :
              </span>
              <p className="leading-relaxed">
                {specialty.orientationImpact?.profilRecherche || 'Profil rigoureux, discipliné et apte aux engagements opérationnels prolongés.'}
              </p>
            </div>

            {/* Bouton d'accès au Hub Comparatif complet */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slateSubtle-500">
                Comparez vos résultats dans les 7 spécialités de la Gendarmerie Royale :
              </span>
              {onOpenOrientationComparison && (
                <button
                  type="button"
                  onClick={onOpenOrientationComparison}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-gendarmerie font-bold text-xs transition shadow-xs cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-gendarmerie" />
                  <span>Ouvrir la Matrice Comparative des 7 Spécialités</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

