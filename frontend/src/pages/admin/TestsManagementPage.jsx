import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService.js';
import { useToast } from '../../context/ToastContext.jsx';
import {
  FileCheck2,
  Clock,
  CheckCircle2,
  Sliders,
  Award,
  Play,
  RotateCcw,
  Plus,
  Edit,
  FileText,
  UserCheck,
  Check,
  AlertTriangle,
  Scale
} from 'lucide-react';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import Modal from '../../components/common/Modal.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';

export default function TestsManagementPage() {
  const [activeTab, setActiveTab] = useState('tests'); // 'tests' | 'evaluations'
  const [tests, setTests] = useState([]);
  const [subjectiveAnswers, setSubjectiveAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [evaluatingItem, setEvaluatingItem] = useState(null);
  const [evalPoints, setEvalPoints] = useState(2.0);
  const [evalComment, setEvalComment] = useState('');

  // Formulaire test
  const [testForm, setTestForm] = useState({
    code: 'TEST-',
    titre: '',
    description: '',
    dureeMinutes: 60,
    nombreQuestions: 60,
    categoriesIncluses: ['LOGIQUE', 'OBSERVATION', 'ATTENTION', 'DECISION', 'ROUTE_MOTO', 'PJ_ENQUETE', 'INFORMATIQUE', 'COMMUNICATION', 'SECRETARIAT', 'DISCIPLINE'],
    difficulteCible: 'TOUS',
    autoriserRetour: true,
    autoriserPause: true,
    autoriserReprise: true,
    nombreTentativesMax: 3,
    seuilReussite: 60.0,
    selectionAleatoire: true
  });

  const { addToast } = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [testsData, subjData] = await Promise.all([
        adminService.getTests(),
        adminService.getSubjectiveAnswers()
      ]);
      setTests(testsData || []);
      setSubjectiveAnswers(subjData || []);
    } catch (err) {
      console.error('Erreur tests admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenCreateTest = () => {
    setEditingTest(null);
    setTestForm({
      code: `TEST-GEN-${tests.length + 1}`,
      titre: '',
      description: '',
      dureeMinutes: 60,
      nombreQuestions: 60,
      categoriesIncluses: ['LOGIQUE', 'OBSERVATION', 'ATTENTION', 'DECISION', 'ROUTE_MOTO', 'PJ_ENQUETE', 'INFORMATIQUE', 'COMMUNICATION', 'SECRETARIAT', 'DISCIPLINE'],
      difficulteCible: 'TOUS',
      autoriserRetour: true,
      autoriserPause: true,
      autoriserReprise: true,
      nombreTentativesMax: 3,
      seuilReussite: 60.0,
      selectionAleatoire: true
    });
    setIsTestModalOpen(true);
  };

  const handleOpenEditTest = (test) => {
    setEditingTest(test);
    setTestForm({
      code: test.Code,
      titre: test.Titre,
      description: test.Description,
      dureeMinutes: test.DureeMinutes || 60,
      nombreQuestions: test.NombreQuestions || 60,
      categoriesIncluses: test.CategoriesIncluses || ['LOGIQUE', 'OBSERVATION', 'ATTENTION', 'DECISION', 'ROUTE_MOTO', 'PJ_ENQUETE', 'INFORMATIQUE', 'COMMUNICATION', 'SECRETARIAT', 'DISCIPLINE'],
      difficulteCible: test.DifficulteCible || 'TOUS',
      autoriserRetour: test.AutoriserRetour !== undefined ? test.AutoriserRetour : true,
      autoriserPause: test.AutoriserPause !== undefined ? test.AutoriserPause : true,
      autoriserReprise: test.AutoriserReprise !== undefined ? test.AutoriserReprise : true,
      nombreTentativesMax: test.NombreTentativesMax || 3,
      seuilReussite: test.SeuilReussite || 60.0,
      selectionAleatoire: test.SelectionAleatoire !== undefined ? Boolean(test.SelectionAleatoire) : true
    });
    setIsTestModalOpen(true);
  };

  const handleSaveTest = async (e) => {
    e.preventDefault();
    try {
      if (editingTest) {
        await adminService.updateTest(editingTest.TestId, testForm);
        addToast({ title: 'Test mis à jour', message: 'Paramètres du protocole enregistrés.', type: 'success' });
      } else {
        await adminService.createTest(testForm);
        addToast({ title: 'Test créé', message: 'Nouveau protocole d\'épreuve enregistré.', type: 'success' });
      }
      setIsTestModalOpen(false);
      fetchData();
    } catch (err) {
      addToast({ title: 'Erreur', message: err.response?.data?.error || err.message, type: 'error' });
    }
  };

  const handleOpenEvaluation = (item) => {
    setEvaluatingItem(item);
    setEvalPoints(item.evaluation?.PointsAttribues ?? (item.pointsMax * 0.75));
    setEvalComment(item.evaluation?.CommentaireEvaluateur || '');
  };

  const handleSaveEvaluation = async (e) => {
    e.preventDefault();
    if (!evaluatingItem) return;
    try {
      await adminService.evaluateSubjectiveAnswer({
        sessionId: evaluatingItem.sessionId,
        questionId: evaluatingItem.questionId,
        pointsAttribues: parseFloat(evalPoints),
        commentaire: evalComment
      });
      addToast({ title: 'Évaluation enregistrée', message: 'Note et commentaires consignés avec succès.', type: 'success' });
      setEvaluatingItem(null);
      fetchData();
    } catch (err) {
      addToast({ title: 'Erreur', message: err.response?.data?.error || err.message, type: 'error' });
    }
  };

  if (loading) {
    return <LoadingSpinner text="Chargement des campagnes d'évaluation..." fullPage />;
  }

  return (
    <div className="space-y-6 animate-fade-slide">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slateSubtle-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gendarmerie uppercase tracking-wider mb-1">
            <FileCheck2 className="w-4 h-4 text-gold" />
            Paramétrage des Campagnes & Protocoles
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gendarmerie font-serif">
            Gestion des Tests d'Orientation
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Configuration des durées de passage, règles de révision, tirages reproductibles et notation des questions subjectives.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="gold"
            icon={Plus}
            onClick={handleOpenCreateTest}
          >
            Créer un Test
          </Button>
        </div>
      </div>

      {/* Onglets de navigation */}
      <div className="flex items-center gap-2 border-b border-slateSubtle-200 text-xs sm:text-sm font-bold">
        <button
          onClick={() => setActiveTab('tests')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'tests'
              ? 'border-gendarmerie text-gendarmerie font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sliders className="w-4 h-4 text-gold" />
          Protocoles & Campagnes ({tests.length})
        </button>

        <button
          onClick={() => setActiveTab('evaluations')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'evaluations'
              ? 'border-gendarmerie text-gendarmerie font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <UserCheck className="w-4 h-4 text-gold" />
          Évaluations Subjectives ({subjectiveAnswers.filter(a => !a.isEvaluated).length} en attente)
        </button>
      </div>

      {/* Onglet 1 : Protocoles de Test */}
      {activeTab === 'tests' && (
        <div className="grid grid-cols-1 gap-6">
          {tests.map((test) => (
            <Card key={test.TestId} className="p-6 space-y-4 hover:border-gold/60 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-xs font-mono font-bold bg-cream-100 text-gendarmerie px-3 py-1 rounded-full border border-slateSubtle-200">
                    {test.Code}
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Actif • Version {test.Version || 1}
                  </span>
                  <span className="text-xs font-bold text-gendarmerie bg-cream-100 px-3 py-1 rounded-full border border-gendarmerie/20">
                    بنك 140 سؤالاً بالعربية
                  </span>
                  {test.SelectionAleatoire && (
                    <span className="text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-gold/40">
                      Tirage aléatoire équilibré
                    </span>
                  )}
                  {test.DifficulteCible && (
                    <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                      Niveau: {test.DifficulteCible}
                    </span>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  icon={Edit}
                  onClick={() => handleOpenEditTest(test)}
                >
                  Modifier le protocole
                </Button>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gendarmerie">
                  {test.Titre}
                </h3>
                <p className="text-xs text-slateSubtle-700 mt-1 max-w-3xl leading-relaxed">
                  {test.Description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 rounded-xl bg-cream-100/70 border border-slateSubtle-200 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slateSubtle-600 block">Durée Allouée</span>
                  <strong className="text-gendarmerie text-sm">{test.DureeMinutes} minutes</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slateSubtle-600 block">Questions par test</span>
                  <strong className="text-gendarmerie text-sm">{test.NombreQuestions || 60} / 140 questions</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slateSubtle-600 block">Tentatives Max</span>
                  <strong className="text-gendarmerie text-sm">{test.NombreTentativesMax || 3} par élève</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slateSubtle-600 block">Domaines Inclus</span>
                  <strong className="text-gendarmerie text-sm">{(test.CategoriesIncluses?.length || 7)} compétences</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slateSubtle-600 block">Reprise de session</span>
                  <strong className={test.AutoriserReprise ? "text-emerald-700 text-sm" : "text-rose-700 text-sm"}>
                    {test.AutoriserReprise ? 'Autorisée' : 'Interdite'}
                  </strong>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Onglet 2 : Évaluation des questions subjectives */}
      {activeTab === 'evaluations' && (
        <div className="space-y-4">
          <div className="p-4 bg-cream-100/70 rounded-xl border border-slateSubtle-200 text-xs text-slateSubtle-800 flex items-center justify-between shadow-2xs">
            <span>
              Cet espace permet aux officiers évaluateurs de noter les questions rédactionnelles et de discernement déontologique soumises par les élèves.
            </span>
            <span className="font-bold text-gendarmerie">{subjectiveAnswers.length} copie(s) enregistrée(s)</span>
          </div>

          <div className="space-y-4">
            {subjectiveAnswers.map((item, idx) => (
              <Card key={idx} className="p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slateSubtle-100">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-gendarmerie">
                      {item.studentNom} ({item.studentMatricule})
                    </span>
                    <span className="text-xs text-slateSubtle-600">
                      Session #{item.sessionId}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.isEvaluated ? (
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Évalué ({item.evaluation?.PointsAttribues}/{item.pointsMax} pts)
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> En attente de notation
                      </span>
                    )}
                    <Button
                      variant={item.isEvaluated ? "outline" : "gold"}
                      size="xs"
                      onClick={() => handleOpenEvaluation(item)}
                    >
                      {item.isEvaluated ? "Modifier la note" : "Noter la réponse"}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-slateSubtle-700">
                    <strong>Question :</strong> {item.enonce}
                  </div>
                  <div className="p-3 rounded-lg bg-cream-50 border border-slateSubtle-200 text-xs text-slateSubtle-900 font-serif leading-relaxed">
                    <strong className="text-gendarmerie block mb-1 font-sans">Réponse rédigée de l'élève :</strong>
                    "{item.reponseTexte}"
                  </div>
                </div>

                {item.isEvaluated && item.evaluation?.CommentaireEvaluateur && (
                  <div className="p-2.5 bg-emerald-50/60 rounded border border-emerald-200 text-xs text-emerald-950">
                    <strong>Avis de l'examinateur :</strong> {item.evaluation.CommentaireEvaluateur}
                  </div>
                )}
              </Card>
            ))}

            {subjectiveAnswers.length === 0 && (
              <EmptyState
                title="Aucune réponse subjective en attente"
                description="Toutes les questions subjectives ont été évaluées ou aucun test n'a encore été soumis."
              />
            )}
          </div>
        </div>
      )}

      {/* Modal de configuration d'un test */}
      <Modal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        title={editingTest ? `Modifier Protocole : ${testForm.code}` : "Créer un Protocole de Test"}
        subtitle="Règles de passation, durée, tentatives et modes de sélection"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsTestModalOpen(false)}>
              Annuler
            </Button>
            <Button variant="gold" onClick={handleSaveTest}>
              {editingTest ? "Enregistrer" : "Créer le test"}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSaveTest} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
                Code Référence (ex: TEST-LOGIQUE)
              </label>
              <input
                type="text"
                value={testForm.code}
                onChange={(e) => setTestForm({ ...testForm, code: e.target.value.toUpperCase() })}
                className="w-full text-xs p-2.5 border border-slateSubtle-300 rounded font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
                Titre de l'épreuve
              </label>
              <input
                type="text"
                value={testForm.titre}
                onChange={(e) => setTestForm({ ...testForm, titre: e.target.value })}
                className="w-full text-xs p-2.5 border border-slateSubtle-300 rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
              Description et objectifs de l'évaluation
            </label>
            <textarea
              rows={2}
              value={testForm.description}
              onChange={(e) => setTestForm({ ...testForm, description: e.target.value })}
              className="w-full text-xs p-2.5 border border-slateSubtle-300 rounded"
            />
          </div>

          {/* Configuration du Nombre de Questions & Préréglages */}
          <div className="p-3.5 rounded-xl bg-cream-50 border border-slateSubtle-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-gendarmerie">
                Nombre de questions par test (Banque centrale : 140 questions)
              </label>
              <div className="flex items-center gap-1.5">
                {[60, 80, 140].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setTestForm({ ...testForm, nombreQuestions: preset })}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                      testForm.nombreQuestions === preset
                        ? 'bg-gendarmerie text-white'
                        : 'bg-white text-slateSubtle-700 border border-slateSubtle-300 hover:border-gold'
                    }`}
                  >
                    {preset === 140 ? '140 (Intégral)' : `${preset} Q`}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="5"
                max="140"
                value={testForm.nombreQuestions}
                onChange={(e) => setTestForm({ ...testForm, nombreQuestions: parseInt(e.target.value, 10) || 60 })}
                className="w-32 text-xs p-2 border border-slateSubtle-300 rounded font-semibold text-gendarmerie"
              />
              <span className="text-[11px] text-slateSubtle-600">
                Chaque tentative sélectionnera aléatoirement {testForm.nombreQuestions} questions réparties de manière équilibrée sur les domaines retenus.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slateSubtle-800 mb-1">Durée (minutes)</label>
              <input
                type="number"
                min="5"
                max="180"
                value={testForm.dureeMinutes}
                onChange={(e) => setTestForm({ ...testForm, dureeMinutes: parseInt(e.target.value, 10) || 60 })}
                className="w-full text-xs p-2 border border-slateSubtle-300 rounded"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slateSubtle-800 mb-1">Niveau de Difficulté</label>
              <select
                value={testForm.difficulteCible || 'TOUS'}
                onChange={(e) => setTestForm({ ...testForm, difficulteCible: e.target.value })}
                className="w-full text-xs p-2 border border-slateSubtle-300 rounded bg-white text-slateSubtle-800"
              >
                <option value="TOUS">Toutes (Équilibré)</option>
                <option value="FACILE">Facile</option>
                <option value="MOYEN">Moyen</option>
                <option value="AVANCE">Avancé</option>
                <option value="EXPERT">Expert</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slateSubtle-800 mb-1">Tentatives Max</label>
              <input
                type="number"
                min="1"
                max="10"
                value={testForm.nombreTentativesMax}
                onChange={(e) => setTestForm({ ...testForm, nombreTentativesMax: parseInt(e.target.value, 10) || 2 })}
                className="w-full text-xs p-2 border border-slateSubtle-300 rounded"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slateSubtle-800 mb-1">Seuil Réussite (%)</label>
              <input
                type="number"
                min="30"
                max="95"
                value={testForm.seuilReussite}
                onChange={(e) => setTestForm({ ...testForm, seuilReussite: parseFloat(e.target.value) || 60 })}
                className="w-full text-xs p-2 border border-slateSubtle-300 rounded"
              />
            </div>
          </div>

          {/* Répartition des catégories incluses */}
          <div className="space-y-2 pt-2 border-t border-slateSubtle-200">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-gendarmerie">
                Répartition par domaines de compétences (Sélection équilibrée)
              </label>
              <button
                type="button"
                onClick={() => setTestForm({
                  ...testForm,
                  categoriesIncluses: ['LOGIQUE', 'OBSERVATION', 'ATTENTION', 'DECISION', 'ROUTE_MOTO', 'PJ_ENQUETE', 'INFORMATIQUE', 'COMMUNICATION', 'SECRETARIAT', 'DISCIPLINE']
                })}
                className="text-[10px] text-gold font-bold hover:underline"
              >
                Activer les 10 domaines (Banque 140 Q)
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { code: 'LOGIQUE', label: 'الاستدلال المنطقي (LOGIQUE)', fr: 'Raisonnement & Déduction' },
                { code: 'OBSERVATION', label: 'التحليل والملاحظة (OBSERVATION)', fr: 'Analyse & Observation' },
                { code: 'ATTENTION', label: 'التركيز والانتباه (ATTENTION)', fr: 'Concentration & Vigilance' },
                { code: 'DECISION', label: 'حل المشكلات واتخاذ القرار (DECISION)', fr: 'Résolution & Prise de Décision' },
                { code: 'ROUTE_MOTO', label: 'السلامة الطرقية وقيادة الدراجات (ROUTE_MOTO)', fr: 'Sécurité Routière & Pilotage' },
                { code: 'PJ_ENQUETE', label: 'الشرطة القضائية والتحري (PJ_ENQUETE)', fr: 'Police Judiciaire & Enquête' },
                { code: 'INFORMATIQUE', label: 'المعلوماتية والمهارات الرقمية (INFORMATIQUE)', fr: 'Informatique & Cyber' },
                { code: 'COMMUNICATION', label: 'التواصل والتكوين (COMMUNICATION)', fr: 'Communication & Formation' },
                { code: 'SECRETARIAT', label: 'الإدارة والسكرتارية (SECRETARIAT)', fr: 'Administration & Secrétariat' },
                { code: 'DISCIPLINE', label: 'المواقف المهنية والانضباط (DISCIPLINE)', fr: 'Discipline & Déontologie' },
              ].map(cat => {
                const isChecked = testForm.categoriesIncluses?.includes(cat.code);
                return (
                  <label key={cat.code} className="flex items-center gap-2 p-2 rounded border border-slateSubtle-200 bg-white hover:bg-cream-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        const current = testForm.categoriesIncluses || [];
                        const updated = e.target.checked
                          ? [...current, cat.code]
                          : current.filter(c => c !== cat.code);
                        setTestForm({ ...testForm, categoriesIncluses: updated.length > 0 ? updated : [cat.code] });
                      }}
                      className="w-3.5 h-3.5 rounded text-gendarmerie"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] font-semibold text-slateSubtle-800 truncate" dir="rtl">{cat.label}</span>
                      <span className="text-[9px] text-slateSubtle-500">{cat.fr}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slateSubtle-200">
            <label className="flex items-center gap-3 p-2.5 rounded border border-slateSubtle-200 bg-cream-50 cursor-pointer">
              <input
                type="checkbox"
                checked={testForm.selectionAleatoire}
                onChange={(e) => setTestForm({ ...testForm, selectionAleatoire: e.target.checked })}
                className="w-4 h-4 rounded text-gendarmerie"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gendarmerie">
                  Moteur de génération aléatoire équilibrée (Actif par défaut)
                </span>
                <span className="text-[10px] text-slateSubtle-600">
                  Tirage aléatoire depuis le بنك de 140 questions, ordre des questions et options A, B, C, D mélangé par élève, seed reproductible d'audit.
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-2.5 rounded border border-slateSubtle-200 bg-white cursor-pointer">
              <input
                type="checkbox"
                checked={testForm.autoriserRetour}
                onChange={(e) => setTestForm({ ...testForm, autoriserRetour: e.target.checked })}
                className="w-4 h-4 rounded text-gendarmerie"
              />
              <span className="text-xs font-medium text-slateSubtle-800">
                Autoriser le retour arrière vers les questions précédentes
              </span>
            </label>

            <label className="flex items-center gap-3 p-2.5 rounded border border-slateSubtle-200 bg-white cursor-pointer">
              <input
                type="checkbox"
                checked={testForm.autoriserReprise}
                onChange={(e) => setTestForm({ ...testForm, autoriserReprise: e.target.checked })}
                className="w-4 h-4 rounded text-gendarmerie"
              />
              <span className="text-xs font-medium text-slateSubtle-800">
                Autoriser la reprise de session après coupure ou actualisation de page
              </span>
            </label>
          </div>
        </form>
      </Modal>

      {/* Modal de Notation d'une question subjective */}
      <Modal
        isOpen={Boolean(evaluatingItem)}
        onClose={() => setEvaluatingItem(null)}
        title="Notation de la Réponse Subjective"
        subtitle={`Candidat : ${evaluatingItem?.studentNom} (${evaluatingItem?.studentMatricule})`}
        footer={
          <>
            <Button variant="outline" onClick={() => setEvaluatingItem(null)}>
              Annuler
            </Button>
            <Button variant="gold" onClick={handleSaveEvaluation}>
              Valider l'évaluation
            </Button>
          </>
        }
      >
        {evaluatingItem && (
          <form onSubmit={handleSaveEvaluation} className="space-y-4">
            <div className="p-3 bg-cream-50 rounded-lg border border-slateSubtle-200 text-xs">
              <strong className="block text-gendarmerie mb-1">Question :</strong>
              {evaluatingItem.enonce}
            </div>

            <div className="p-3 bg-white rounded-lg border border-slateSubtle-300 text-xs italic text-slateSubtle-900 leading-relaxed">
              <strong className="block font-sans not-italic text-slateSubtle-700 mb-1 font-semibold">
                Réponse textuelle de l'élève :
              </strong>
              "{evaluatingItem.reponseTexte}"
            </div>

            {evaluatingItem.bareme?.criteres && (
              <div className="p-3.5 bg-cream-50 rounded-xl border border-slateSubtle-200 text-xs text-slateSubtle-800 space-y-1">
                <strong className="block font-bold text-gendarmerie">Critères du barème officiel :</strong>
                <ul className="list-disc pl-4 space-y-0.5">
                  {evaluatingItem.bareme.criteres.map((c, i) => (
                    <li key={i}>{c.nom} ({c.pointsMax} pt max)</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
                Note attribuée (Max {evaluatingItem.pointsMax} points)
              </label>
              <input
                type="number"
                step="0.25"
                min="0"
                max={evaluatingItem.pointsMax}
                value={evalPoints}
                onChange={(e) => setEvalPoints(e.target.value)}
                className="w-full text-xs p-2.5 border border-slateSubtle-300 rounded font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
                Commentaire de l'examinateur / Justification de la note
              </label>
              <textarea
                rows={3}
                placeholder="Indiquez les points forts du discernement et les éventuels manques déontologiques..."
                value={evalComment}
                onChange={(e) => setEvalComment(e.target.value)}
                className="w-full text-xs p-2.5 border border-slateSubtle-300 rounded"
              />
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
