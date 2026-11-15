import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService.js';
import { useToast } from '../../context/ToastContext.jsx';
import {
  Settings,
  Shield,
  Save,
  CheckCircle2,
  Clock,
  Sliders,
  Server,
  Layers,
  Award,
  FileCheck2,
  ListOrdered,
  Plus,
  Edit,
  Database
} from 'lucide-react';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'competencies' | 'matrix' | 'scoring' | 'tasks'
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  // 1. Paramètres généraux
  const [settings, setSettings] = useState({
    institutionNom: 'الدرك الملكي • المملكة المغربية',
    commissionOrientationActif: true,
    dureeDefautTestMinutes: 35,
    seuilReussiteGeneral: 60,
    autoriserRepriseTest: true,
    autoriserConsultationResultatsEleve: true,
    modeMaintenance: false,
    anneePromotionEnCours: 2026
  });

  // 2. Référentiel des 12 compétences
  const [competencies, setCompetencies] = useState([]);
  const [editingComp, setEditingComp] = useState(null);

  // 3. Matrice de spécialités
  const [specialtyMatrix, setSpecialtyMatrix] = useState([]);
  const [selectedSpecCode, setSelectedSpecCode] = useState('SPEC-PJ');

  // 4. Configuration des critères de scoring
  const [scoringConfig, setScoringConfig] = useState({
    accuracyWeight: 0.25,
    decisionRelevanceWeight: 0.20,
    classificationWeight: 0.15,
    proceduralRespectWeight: 0.15,
    organizationWeight: 0.10,
    reportCompletenessWeight: 0.10,
    infoUsageWeight: 0.05
  });

  // 5. Tâches de simulation
  const [simulationTasks, setSimulationTasks] = useState([]);
  const [taskDomainFilter, setTaskDomainFilter] = useState('ALL');

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [settData, compData, matrixData, scoreData, tasksData] = await Promise.all([
          adminService.getSettings(),
          adminService.getCompetencies(),
          adminService.getSpecialtyWeights(),
          adminService.getScoringConfig(),
          adminService.getSimulationTasks()
        ]);

        if (settData) setSettings(settData);
        if (compData) setCompetencies(compData);
        if (matrixData) setSpecialtyMatrix(matrixData);
        if (scoreData) setScoringConfig(scoreData);
        if (tasksData?.tasks) setSimulationTasks(tasksData.tasks);
      } catch (err) {
        console.error('Erreur chargement configuration:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  // Sauvegarde des paramètres généraux
  const handleSaveGeneral = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminService.updateSettings(settings);
      addToast({
        title: 'Paramètres enregistrés',
        message: 'La configuration générale a été mise à jour.',
        type: 'success'
      });
    } catch (err) {
      addToast({ title: 'Erreur', message: err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  // Sauvegarde d'une compétence modifiée
  const handleSaveCompetency = async (comp) => {
    setSaving(true);
    try {
      await adminService.updateCompetency(comp.code, comp);
      addToast({
        title: 'Compétence mise à jour',
        message: `La compétence ${comp.nomAr} a été modifiée sans toucher au code source.`,
        type: 'success'
      });
      setEditingComp(null);
    } catch (err) {
      addToast({ title: 'Erreur', message: err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  // Sauvegarde des poids d'une spécialité
  const handleSaveSpecialtyWeights = async (spec) => {
    setSaving(true);
    try {
      await adminService.updateSpecialtyWeights(spec.specialiteCode, {
        poidsCompetences: spec.poidsCompetences,
        justificationAr: spec.justificationAr
      });
      addToast({
        title: 'Matrice mise à jour',
        message: `Les poids pour ${spec.intituleAr} ont été enregistrés avec succès.`,
        type: 'success'
      });
    } catch (err) {
      addToast({ title: 'Erreur', message: err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  // Sauvegarde des critères de scoring
  const handleSaveScoringConfig = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminService.updateScoringConfig(scoringConfig);
      addToast({
        title: 'Barème mis à jour',
        message: 'Les critères de scoring backend ont été actualisés.',
        type: 'success'
      });
    } catch (err) {
      addToast({ title: 'Erreur', message: err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  // Sauvegarde de la difficulté d'une tâche
  const handleUpdateTask = async (taskId, updates) => {
    try {
      await adminService.updateSimulationTask({ taskId, ...updates });
      setSimulationTasks(prev => prev.map(t => t.taskId === taskId ? { ...t, ...updates } : t));
      addToast({
        title: 'Tâche mise à jour',
        message: `Tâche ${taskId} reconfigurée avec succès.`,
        type: 'success'
      });
    } catch (err) {
      addToast({ title: 'Erreur', message: err.message, type: 'error' });
    }
  };

  if (loading) {
    return <LoadingSpinner text="Chargement du centre de configuration..." fullPage />;
  }

  const selectedSpec = specialtyMatrix.find(s => s.specialiteCode === selectedSpecCode) || specialtyMatrix[0];

  const filteredTasks = simulationTasks.filter(t =>
    taskDomainFilter === 'ALL' || t.domaineId === taskDomainFilter
  );

  return (
    <div className="w-full space-y-6 animate-fade-slide">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slateSubtle-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gendarmerie uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4 text-gold" />
            Centre de Configuration Dynamique (Zéro Code Source)
          </div>
          <h1 className="text-2xl font-extrabold text-gendarmerie font-serif">
            Paramètres du Système & Moteur d'Orientation
          </h1>
          <p className="text-xs text-slateSubtle-700">
            Gestion du référentiel des 12 compétences, matrice de compatibilité des spécialités, barème et tâches.
          </p>
        </div>
      </div>

      {/* Barre d'onglets de configuration */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slateSubtle-200">
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'general' ? 'bg-[#153B2B] text-white shadow-card' : 'bg-white text-slateSubtle-700 hover:bg-cream-100 border border-slateSubtle-200'
          }`}
        >
          1. Paramètres Généraux
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('competencies')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'competencies' ? 'bg-[#153B2B] text-white shadow-card' : 'bg-white text-slateSubtle-700 hover:bg-cream-100 border border-slateSubtle-200'
          }`}
        >
          2. Référentiel des Compétences ({competencies.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('matrix')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'matrix' ? 'bg-[#153B2B] text-white shadow-card' : 'bg-white text-slateSubtle-700 hover:bg-cream-100 border border-slateSubtle-200'
          }`}
        >
          3. Matrice Spécialités & Poids
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('scoring')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'scoring' ? 'bg-[#153B2B] text-white shadow-card' : 'bg-white text-slateSubtle-700 hover:bg-cream-100 border border-slateSubtle-200'
          }`}
        >
          4. Barème & Critères de Scoring
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tasks')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'tasks' ? 'bg-[#153B2B] text-white shadow-card' : 'bg-white text-slateSubtle-700 hover:bg-cream-100 border border-slateSubtle-200'
          }`}
        >
          5. Banque des 60 Tâches ({simulationTasks.length})
        </button>
      </div>

      {/* CONTENU ONGLET 1 : Paramètres Généraux */}
      {activeTab === 'general' && (
        <form onSubmit={handleSaveGeneral} className="space-y-6">
          <Card className="p-6 bg-white rounded-xl border border-slateSubtle-200 space-y-4">
            <h3 className="text-sm font-bold text-gendarmerie uppercase tracking-wider flex items-center gap-2">
              <Server className="w-4 h-4 text-gold" />
              Identité Institutionnelle
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slateSubtle-700 font-semibold mb-1">Nom de l'Institution :</label>
                <input
                  type="text"
                  value={settings.institutionNom}
                  onChange={e => setSettings({ ...settings, institutionNom: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slateSubtle-200 bg-cream-50 focus:bg-white text-xs font-bold text-gendarmerie"
                />
              </div>
              <div>
                <label className="block text-slateSubtle-700 font-semibold mb-1">Année de Promotion Active :</label>
                <input
                  type="number"
                  value={settings.anneePromotionEnCours}
                  onChange={e => setSettings({ ...settings, anneePromotionEnCours: parseInt(e.target.value, 10) })}
                  className="w-full p-2.5 rounded-xl border border-slateSubtle-200 bg-cream-50 focus:bg-white text-xs font-bold"
                />
              </div>
            </div>
          </Card>

          {/* Configuration des Permissions de Consultation des Résultats IA */}
          <Card className="p-6 bg-white rounded-xl border-2 border-[#153B2B]/20 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slateSubtle-200">
              <h3 className="text-sm font-bold text-gendarmerie uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4 text-gold" />
                Permissions des Résultats d'Orientation IA (ORIENTATION_RESULTS_VISIBILITY)
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cream-200 text-gendarmerie">
                Configuration Sécurisée
              </span>
            </div>

            <p className="text-xs text-slateSubtle-600 leading-relaxed">
              Définit si les préconisations de filières et l'analyse des compétences générées par l'IA restent consultables par l'élève ou réservées exclusivement à la commission d'affectation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label
                onClick={() => setSettings({ ...settings, orientationResultsVisibility: 'student_and_admin' })}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  (settings.orientationResultsVisibility || 'student_and_admin') === 'student_and_admin'
                    ? 'border-[#153B2B] bg-emerald-50/60 ring-2 ring-[#153B2B]/20'
                    : 'border-slateSubtle-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">1. Mode Test (Élève & Admin)</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                    student_and_admin
                  </span>
                </div>
                <p className="text-slate-600 mt-2 text-[11px] leading-relaxed">
                  L'élève peut consulter ses recommandations d'orientation, ses compétences détectées et les explications du modèle pour tester la pertinence.
                </p>
              </label>

              <label
                onClick={() => setSettings({ ...settings, orientationResultsVisibility: 'admin_only' })}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  settings.orientationResultsVisibility === 'admin_only'
                    ? 'border-[#153B2B] bg-amber-50/60 ring-2 ring-[#153B2B]/20'
                    : 'border-slateSubtle-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">2. Mode Restreint (Admin Uniquement)</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
                    admin_only
                  </span>
                </div>
                <p className="text-slate-600 mt-2 text-[11px] leading-relaxed">
                  L'élève ne peut plus accéder aux résultats d'orientation (bloqué sur l'interface et l'API). Seuls les administrateurs et formateurs y accèdent.
                </p>
              </label>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" variant="primary" icon={Save} loading={saving}>
              Enregistrer les Paramètres
            </Button>
          </div>
        </form>
      )}

      {/* CONTENU ONGLET 2 : Référentiel des 12 Compétences */}
      {activeTab === 'competencies' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-cream-100 rounded-2xl border border-slateSubtle-200 text-xs text-gendarmerie font-bold">
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-gold" />
              12 Compétences Pratiques Officielles (Exclut tout test psychologique ou de personnalité)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {competencies.map(comp => {
              const isEditing = editingComp?.code === comp.code;
              const currentData = isEditing ? editingComp : comp;

              return (
                <Card key={comp.code} className="p-5 bg-white rounded-2xl border border-slateSubtle-200 space-y-3">
                  <div className="flex items-start justify-between gap-2 pb-2 border-b border-slateSubtle-200">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-gold-dark block">
                        {comp.code} • #{comp.numero}
                      </span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={currentData.nomAr}
                          onChange={e => setEditingComp({ ...currentData, nomAr: e.target.value })}
                          className="font-bold text-sm text-gendarmerie border p-1 rounded-lg w-full mt-1"
                        />
                      ) : (
                        <h4 className="font-bold text-sm text-gendarmerie">{comp.nomAr}</h4>
                      )}
                      <p className="text-[11px] text-slateSubtle-500">{comp.nomFr}</p>
                    </div>

                    <Button
                      variant={isEditing ? 'gold' : 'outline'}
                      size="xs"
                      onClick={() => {
                        if (isEditing) {
                          handleSaveCompetency(currentData);
                        } else {
                          setEditingComp({ ...comp });
                        }
                      }}
                    >
                      {isEditing ? 'Sauvegarder' : 'Modifier'}
                    </Button>
                  </div>

                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={currentData.descriptionAr}
                      onChange={e => setEditingComp({ ...currentData, descriptionAr: e.target.value })}
                      className="w-full text-xs p-2 rounded-xl border border-slateSubtle-200 bg-cream-50"
                    />
                  ) : (
                    <p className="text-xs text-slateSubtle-700 leading-relaxed">
                      {comp.descriptionAr}
                    </p>
                  )}

                  <div className="pt-2 border-t border-slateSubtle-100 flex items-center justify-between text-[11px] text-slateSubtle-500 font-mono">
                    <span>Domaine rattaché : {comp.domaineId}</span>
                    <span>Critères configurés : {comp.criteresEvaluation?.length || 3}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* CONTENU ONGLET 3 : Matrice Spécialités & Poids */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          {/* Sélecteur de spécialité */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {specialtyMatrix.map(spec => (
              <button
                key={spec.specialiteCode}
                type="button"
                onClick={() => setSelectedSpecCode(spec.specialiteCode)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedSpecCode === spec.specialiteCode
                    ? 'bg-gold text-gendarmerie shadow-card'
                    : 'bg-white text-slateSubtle-700 hover:bg-cream-100 border border-slateSubtle-200'
                }`}
              >
                {spec.intituleAr?.split(' ')[0]} ({spec.specialiteCode})
              </button>
            ))}
          </div>

          {selectedSpec && (
            <Card className="p-6 bg-white rounded-2xl border border-slateSubtle-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slateSubtle-200">
                <div>
                  <span className="text-xs font-mono font-bold text-gold-dark">{selectedSpec.specialiteCode}</span>
                  <h3 className="text-lg font-bold text-gendarmerie">{selectedSpec.intituleAr}</h3>
                  <p className="text-xs text-slateSubtle-500">{selectedSpec.subdivision}</p>
                </div>

                <Button
                  variant="gold"
                  size="sm"
                  icon={Save}
                  loading={saving}
                  onClick={() => handleSaveSpecialtyWeights(selectedSpec)}
                >
                  Sauvegarder les Poids
                </Button>
              </div>

              {/* Justification en arabe */}
              <div className="space-y-1.5 text-xs">
                <label className="block font-bold text-gendarmerie">
                  مبررات التوافق والمهام الميدانية للتخصص (تعليل النظام) :
                </label>
                <textarea
                  rows={3}
                  value={selectedSpec.justificationAr || ''}
                  onChange={e => {
                    const next = specialtyMatrix.map(s =>
                      s.specialiteCode === selectedSpec.specialiteCode
                        ? { ...s, justificationAr: e.target.value }
                        : s
                    );
                    setSpecialtyMatrix(next);
                  }}
                  className="w-full text-xs p-3 rounded-xl border border-slateSubtle-200 bg-cream-50 font-serif leading-relaxed"
                />
              </div>

              {/* Sliders de pondération pour les 12 compétences */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gendarmerie uppercase tracking-wider">
                  Pondérations relatives des compétences (0.00 à 1.00) :
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {competencies.map(comp => {
                    const currentWeight = selectedSpec.poidsCompetences?.[comp.code] || 0;
                    return (
                      <div key={comp.code} className="p-3 bg-cream-50 rounded-xl border border-slateSubtle-200 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between font-bold text-gendarmerie">
                          <span>{comp.nomAr}</span>
                          <span className="font-mono text-gold-dark font-extrabold">{currentWeight.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="0.50"
                          step="0.05"
                          value={currentWeight}
                          onChange={e => {
                            const newW = parseFloat(e.target.value);
                            const next = specialtyMatrix.map(s => {
                              if (s.specialiteCode === selectedSpec.specialiteCode) {
                                return {
                                  ...s,
                                  poidsCompetences: {
                                    ...s.poidsCompetences,
                                    [comp.code]: newW
                                  }
                                };
                              }
                              return s;
                            });
                            setSpecialtyMatrix(next);
                          }}
                          className="w-full accent-gendarmerie cursor-pointer"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* CONTENU ONGLET 4 : Barème de Scoring */}
      {activeTab === 'scoring' && (
        <form onSubmit={handleSaveScoringConfig} className="space-y-6">
          <Card className="p-6 bg-white rounded-2xl border border-slateSubtle-200 space-y-4">
            <h3 className="text-sm font-bold text-gendarmerie uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-gold" />
              Pondération Relative des Critères d'Évaluation
            </h3>
            <p className="text-xs text-slateSubtle-600">
              Ajustez l'importance accordée à chaque critère dans le calcul automatisé des notes de simulation :
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-3 bg-cream-50 rounded-xl border border-slateSubtle-200 space-y-1.5">
                <div className="flex justify-between font-bold text-gendarmerie">
                  <span>الدقة ومطابقة النتائج (Exactitude) :</span>
                  <span className="font-mono font-bold text-gold-dark">{scoringConfig.accuracyWeight}</span>
                </div>
                <input
                  type="range"
                  min="0.10"
                  max="0.50"
                  step="0.05"
                  value={scoringConfig.accuracyWeight}
                  onChange={e => setScoringConfig({ ...scoringConfig, accuracyWeight: parseFloat(e.target.value) })}
                  className="w-full accent-gendarmerie"
                />
              </div>

              <div className="p-3 bg-cream-50 rounded-xl border border-slateSubtle-200 space-y-1.5">
                <div className="flex justify-between font-bold text-gendarmerie">
                  <span>وجاهة القرارات الميدانية (Pertinence décisions) :</span>
                  <span className="font-mono font-bold text-gold-dark">{scoringConfig.decisionRelevanceWeight}</span>
                </div>
                <input
                  type="range"
                  min="0.10"
                  max="0.50"
                  step="0.05"
                  value={scoringConfig.decisionRelevanceWeight}
                  onChange={e => setScoringConfig({ ...scoringConfig, decisionRelevanceWeight: parseFloat(e.target.value) })}
                  className="w-full accent-gendarmerie"
                />
              </div>

              <div className="p-3 bg-cream-50 rounded-xl border border-slateSubtle-200 space-y-1.5">
                <div className="flex justify-between font-bold text-gendarmerie">
                  <span>سلامة التصنيف وسلسلة الحراسة (Classification) :</span>
                  <span className="font-mono font-bold text-gold-dark">{scoringConfig.classificationWeight}</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.40"
                  step="0.05"
                  value={scoringConfig.classificationWeight}
                  onChange={e => setScoringConfig({ ...scoringConfig, classificationWeight: parseFloat(e.target.value) })}
                  className="w-full accent-gendarmerie"
                />
              </div>

              <div className="p-3 bg-cream-50 rounded-xl border border-slateSubtle-200 space-y-1.5">
                <div className="flex justify-between font-bold text-gendarmerie">
                  <span>احترام المساطر القانونية (Respect procédures) :</span>
                  <span className="font-mono font-bold text-gold-dark">{scoringConfig.proceduralRespectWeight}</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.40"
                  step="0.05"
                  value={scoringConfig.proceduralRespectWeight}
                  onChange={e => setScoringConfig({ ...scoringConfig, proceduralRespectWeight: parseFloat(e.target.value) })}
                  className="w-full accent-gendarmerie"
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" variant="primary" icon={Save} loading={saving}>
              Enregistrer le Barème de Scoring
            </Button>
          </div>
        </form>
      )}

      {/* CONTENU ONGLET 5 : Banque des 60 Tâches */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slateSubtle-200">
            <span className="text-xs font-bold text-gendarmerie">
              Banque des 60 tâches de simulation ({filteredTasks.length} affichées)
            </span>

            <select
              value={taskDomainFilter}
              onChange={e => setTaskDomainFilter(e.target.value)}
              className="text-xs p-2 rounded-xl border border-slateSubtle-200 bg-cream-50"
            >
              <option value="ALL">Tous les 6 domaines</option>
              <option value="PJ">البحث والتحقيق القضائي (PJ)</option>
              <option value="ROUTE">السلامة الطرقية (ROUTE)</option>
              <option value="TECH">التحليل الرقمي (TECH)</option>
              <option value="PLAN">التخطيط والعمليات (PLAN)</option>
              <option value="ENV">المراقبة البيئية (ENV)</option>
              <option value="ADMIN">التسيير الإداري (ADMIN)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredTasks.map(task => (
              <Card key={task.taskId} className="p-4 bg-white rounded-xl border border-slateSubtle-200 space-y-2 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono font-bold text-gendarmerie px-2 py-0.5 rounded-md bg-cream-100 border border-slateSubtle-200">
                    {task.taskId}
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-gold/15 text-gold-dark font-bold">
                    {task.interactionType}
                  </span>
                </div>

                <h4 className="font-bold text-gendarmerie text-right line-clamp-1">{task.titreAr}</h4>

                <div className="pt-2 border-t border-slateSubtle-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slateSubtle-500">Difficulté :</span>
                    <select
                      value={task.difficulte}
                      onChange={e => handleUpdateTask(task.taskId, { difficulte: e.target.value })}
                      className="text-[11px] font-bold p-1 rounded-lg border border-slateSubtle-200 bg-cream-50"
                    >
                      <option value="BASIQUE">BASIQUE (أساسي)</option>
                      <option value="INTERMEDIAIRE">INTERMEDIAIRE (متوسط)</option>
                      <option value="AVANCE">AVANCE (متقدم)</option>
                      <option value="EXPERT">EXPERT (خبير)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="text-[11px] text-slateSubtle-500">Points :</span>
                    <input
                      type="number"
                      value={task.pointsMax}
                      onChange={e => handleUpdateTask(task.taskId, { pointsMax: e.target.value })}
                      className="w-12 text-center p-0.5 rounded border border-slateSubtle-200 font-bold"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
