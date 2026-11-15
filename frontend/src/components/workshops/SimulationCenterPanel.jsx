import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Target,
  Clock,
  Award,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  TrendingUp,
  X,
  AlertCircle
} from 'lucide-react';
import { talentPlatformService } from '../../services/talentPlatformService.js';
import { useToast } from '../../context/ToastContext.jsx';

export default function SimulationCenterPanel() {
  const navigate = useNavigate();
  const { showSuccessToast, showErrorToast, addToast } = useToast() || {};

  const notifySuccess = (msg) => {
    if (showSuccessToast) showSuccessToast(msg);
    else if (addToast) addToast(msg, 'success');
  };
  const notifyError = (msg) => {
    if (showErrorToast) showErrorToast(msg);
    else if (addToast) addToast(msg, 'error');
  };

  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);
  const [summary, setSummary] = useState({ totalExercises: 6, completedCount: 0, averageScore: null });

  const [activeExercise, setActiveExercise] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [executingExerciseDetail, setExecutingExerciseDetail] = useState(null);
  const [executingLoading, setExecutingLoading] = useState(false);

  const [userAnswers, setUserAnswers] = useState({});
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const loadSimulations = async () => {
    setLoading(true);
    try {
      const data = await talentPlatformService.getSimulationExercises();
      setExercises(data.exercises || []);
      setSummary(data.summary || { totalExercises: 6, completedCount: 0, averageScore: null });
    } catch (err) {
      console.error('Erreur chargement Simulation Center:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSimulations();
  }, []);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => setTimerSeconds(s => s + 1), 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isTimerRunning]);

  const handleStartExercise = async (ex) => {
    setActiveExercise(ex);
    setExecutingLoading(true);
    setIsModalOpen(true);
    setSubmissionResult(null);
    setUserAnswers({});
    setTimerSeconds(0);

    try {
      const detail = await talentPlatformService.getSimulationExerciseById(ex.id);
      setExecutingExerciseDetail(detail || ex);
      setIsTimerRunning(true);
    } catch (err) {
      notifyError("Impossible de charger les données de l'exercice");
      setIsModalOpen(false);
    } finally {
      setExecutingLoading(false);
    }
  };

  const handleSubmitSimulation = async () => {
    if (!executingExerciseDetail) return;
    setSubmitting(true);
    setIsTimerRunning(false);

    try {
      const result = await talentPlatformService.submitSimulationExercise(
        executingExerciseDetail.id,
        userAnswers,
        timerSeconds || 75
      );
      setSubmissionResult(result.evaluation);
      notifySuccess(`Simulation complétée (${result.evaluation?.score}%) • Talent Radar actualisé`);
      await loadSimulations();
    } catch (err) {
      notifyError('Erreur lors de la validation : ' + err.message);
      setIsTimerRunning(true);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleSegmentSelection = (segId) => {
    const current = userAnswers.selectedSegmentIds || [];
    setUserAnswers({
      ...userAnswers,
      selectedSegmentIds: current.includes(segId)
        ? current.filter(id => id !== segId)
        : [...current, segId]
    });
  };

  const moveTask = (index, direction) => {
    const list = executingExerciseDetail?.tasksToPrioritize || executingExerciseDetail?.etapesAOrdonner || [];
    const tasks = userAnswers.taskOrder || list.map(t => t.id);
    const newTasks = [...tasks];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newTasks.length) return;
    [newTasks[index], newTasks[targetIdx]] = [newTasks[targetIdx], newTasks[index]];
    setUserAnswers({ ...userAnswers, taskOrder: newTasks });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-[#153B2B] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-slate-600">Chargement des 6 simulations pratiques...</p>
      </div>
    );
  }

  const questionsList = executingExerciseDetail?.scenario?.questions || executingExerciseDetail?.questions || [];
  const orderingList = executingExerciseDetail?.tasksToPrioritize || executingExerciseDetail?.etapesAOrdonner || [];

  return (
    <div className="w-full space-y-6">
      {/* En-tête Simulation Center */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#C9A052]/15 text-[#8F6B20] tracking-wide uppercase border border-[#C9A052]/30">
                Mises en Situation Opérationnelles
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Alimente la couche « Observé » du Talent Radar (Parcours IA)
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#153B2B] tracking-tight flex items-center gap-2.5">
              Simulation Center <span className="text-base font-bold text-slate-400 font-arabic">مركز المحاكاة</span>
            </h2>
            <p className="text-xs text-slate-600 max-w-3xl">
              6 exercices chronométrés : audit de procès-verbal, régulation des urgences 177, qualification légale et coordination radio.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/70 p-3 rounded-xl shrink-0">
            <div className="text-center px-3 border-r border-slate-200">
              <div className="text-lg font-extrabold text-[#153B2B]">
                {summary.completedCount} / {summary.totalExercises}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Complétés</div>
            </div>
            <div className="text-center px-3">
              <div className="text-lg font-extrabold text-[#C9A052]">
                {summary.averageScore !== null ? `${summary.averageScore}%` : '—'}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Moyenne Obs.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grille des 6 exercices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {exercises.map((ex, idx) => {
          const isDone = ex.userProgress?.isCompleted;
          const score = ex.userProgress?.bestScore;

          return (
            <div
              key={ex.id}
              className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                isDone ? 'border-emerald-200 ring-1 ring-emerald-100' : 'border-slate-200/80 hover:border-[#153B2B]/40'
              }`}
            >
              <div className="p-5 space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 tracking-wide uppercase">
                    Simulation {idx + 1}
                  </span>
                  {isDone ? (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {score}%
                    </span>
                  ) : (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      À passer
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-800 leading-snug">{ex.titreFr}</h3>
                  <p className="text-xs font-semibold text-slate-400 font-arabic mt-0.5">{ex.titreAr}</p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">{ex.descriptionFr}</p>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    ~{ex.dureeEstimeeMin} min
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Award className="w-3.5 h-3.5 text-slate-400" />
                    Niveau : {ex.difficulte}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {(ex.competencesCibles || []).map((cKey) => (
                    <span key={cKey} className="text-[10px] font-semibold px-2 py-0.5 bg-[#153B2B]/5 text-[#153B2B] rounded-md border border-[#153B2B]/10">
                      {cKey}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-50/80 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleStartExercise(ex)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                    isDone ? 'bg-slate-200 text-slate-800 hover:bg-slate-300' : 'bg-[#153B2B] text-white hover:bg-[#1C4E39]'
                  }`}
                >
                  {isDone ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Recommencer l'exercice</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-[#C9A052] fill-[#C9A052]" />
                      <span>Lancer la simulation</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal d'exécution */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-[#153B2B] text-white px-5 sm:px-7 py-4 flex items-center justify-between border-b border-[#1C4E39] shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                  <Target className="w-5 h-5 text-[#C9A052]" />
                </div>
                <div className="truncate">
                  <h2 className="text-base sm:text-lg font-bold tracking-tight text-white truncate">
                    {executingExerciseDetail?.titreFr || activeExercise?.titreFr}
                  </h2>
                  <p className="text-xs text-white/70 truncate">{executingExerciseDetail?.categoryNameFr}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/25 text-white font-mono text-xs font-bold border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-[#C9A052]" />
                  <span>{formatTimer(timerSeconds)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsTimerRunning(false);
                  }}
                  className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
              {executingLoading ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-8 h-8 border-2 border-[#153B2B] border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs font-semibold text-slate-500">Préparation des pièces de la simulation...</p>
                </div>
              ) : submissionResult ? (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-xs">
                      <Award className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-800">Simulation Complétée</h3>
                      <p className="text-xs text-slate-500">
                        Votre score a été enregistré et synchronisé avec le Talent Radar dans Parcours IA.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto pt-3">
                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <div className="text-2xl font-black text-[#153B2B]">{submissionResult.score}%</div>
                        <div className="text-[10px] font-bold uppercase text-slate-500">Note Globale</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <div className="text-2xl font-black text-[#C9A052]">{submissionResult.precisionPct}%</div>
                        <div className="text-[10px] font-bold uppercase text-slate-500">Précision</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <div className="text-2xl font-black text-slate-700">{submissionResult.timeFormatted}</div>
                        <div className="text-[10px] font-bold uppercase text-slate-500">Chronomètre</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <div className="text-2xl font-black text-emerald-700">{submissionResult.errorsFoundCount}</div>
                        <div className="text-[10px] font-bold uppercase text-slate-500">Anomalies</div>
                      </div>
                    </div>
                  </div>

                  {submissionResult.errorsDetected?.length > 0 && (
                    <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
                      <h4 className="text-xs font-bold text-amber-900 uppercase flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        Points relevés :
                      </h4>
                      <ul className="space-y-1 text-xs text-amber-800">
                        {submissionResult.errorsDetected.map((err, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{err}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-2">
                    <h4 className="text-xs font-bold text-emerald-900 uppercase flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      Conseils de progression :
                    </h4>
                    <ul className="space-y-1 text-xs text-emerald-800">
                      {(submissionResult.pointsAmeliorer || []).map((pt, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        navigate('/eleve/parcours-intelligent?tab=analysis');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#153B2B] text-white text-xs font-bold hover:bg-[#1C4E39] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Sparkles className="w-4 h-4 text-[#C9A052]" />
                      <span>Voir l'impact sur le Talent Radar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        navigate('/eleve/parcours-intelligent?tab=orientation');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-white text-slate-700 border border-slate-300 hover:border-slate-400 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <TrendingUp className="w-4 h-4 text-slate-600" />
                      <span>Ouvrir le Simulateur d'Orientation</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* CAS 1 : ERROR_DETECTION */}
                  {executingExerciseDetail?.category === 'ERROR_DETECTION' && (
                    <div className="space-y-4">
                      <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold">Consigne d'audit : </strong>
                          Cliquez sur les segments du procès-verbal contenant une anomalie légale, un vice de forme ou une incohérence factuelle.
                        </div>
                      </div>

                      <div className="bg-amber-50/30 border-2 border-slate-300 rounded-xl p-5 sm:p-7 shadow-xs font-serif text-slate-800 space-y-3">
                        <div className="text-center pb-3 border-b border-slate-300 space-y-1">
                          <div className="text-[11px] font-sans font-bold tracking-widest uppercase text-slate-600">
                            {executingExerciseDetail.documentToAudit?.entete}
                          </div>
                          <div className="text-sm font-bold tracking-wide">
                            {executingExerciseDetail.documentToAudit?.titre}
                          </div>
                        </div>

                        <div className="space-y-2 pt-2">
                          {(executingExerciseDetail.documentToAudit?.segments || []).map((seg, sIdx) => {
                            const isSelected = (userAnswers.selectedSegmentIds || []).includes(seg.id);
                            return (
                              <div
                                key={seg.id}
                                onClick={() => toggleSegmentSelection(seg.id)}
                                className={`p-3 rounded-lg border text-xs sm:text-sm leading-relaxed transition-all cursor-pointer select-none ${
                                  isSelected
                                    ? 'bg-red-50 border-red-400 text-red-950 font-medium ring-2 ring-red-300'
                                    : 'bg-white border-slate-200 hover:bg-slate-50'
                                }`}
                              >
                                <div className="flex items-start gap-2.5">
                                  <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-sans font-bold shrink-0 mt-0.5 ${
                                    isSelected ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600'
                                  }`}>
                                    §{sIdx + 1}
                                  </span>
                                  <span className="flex-1">{seg.texte}</span>
                                  {isSelected && (
                                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-red-700 bg-red-100 px-2 py-0.5 rounded shrink-0">
                                      Anomalie
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CAS 2 : TASK_PRIORITIZATION ou LOGIC_REASONING */}
                  {(executingExerciseDetail?.category === 'TASK_PRIORITIZATION' ||
                    executingExerciseDetail?.category === 'LOGIC_REASONING') && orderingList.length > 0 && (
                    <div className="space-y-4">
                      <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold">Consigne d'ordonnancement : </strong>
                          Classez les éléments ci-dessous dans le bon ordre chronologique ou prioritaire (#1 = premier à traiter).
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        {(() => {
                          const order = userAnswers.taskOrder || orderingList.map(t => t.id);
                          return order.map((tId, idx) => {
                            const task = orderingList.find(t => t.id === tId);
                            if (!task) return null;
                            return (
                              <div key={task.id} className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3 shadow-2xs">
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="w-8 h-8 rounded-lg bg-[#153B2B] text-white flex items-center justify-center font-bold text-sm shrink-0">
                                    #{idx + 1}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-xs sm:text-sm font-bold text-slate-800">{task.titre || task.texte}</div>
                                    {task.description && <div className="text-xs text-slate-500">{task.description}</div>}
                                  </div>
                                </div>

                                <div className="flex items-center gap-1 shrink-0">
                                  <button type="button" onClick={() => moveTask(idx, 'up')} disabled={idx === 0} className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 text-xs font-bold cursor-pointer">▲</button>
                                  <button type="button" onClick={() => moveTask(idx, 'down')} disabled={idx === order.length - 1} className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 text-xs font-bold cursor-pointer">▼</button>
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  )}

                  {/* CAS 3 : SITUATION_ANALYSIS / INFORMATION_CROSSING / TEAM_COMMUNICATION */}
                  {questionsList.length > 0 && (
                    <div className="space-y-4">
                      {executingExerciseDetail.scenario?.contexte && (
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                          <strong className="text-[#153B2B] font-bold block mb-1">Scénario de Situation :</strong>
                          {executingExerciseDetail.scenario.contexte}
                        </div>
                      )}

                      {executingExerciseDetail.scenario?.documents?.map((doc, dIdx) => (
                        <div key={dIdx} className="p-3.5 rounded-xl bg-amber-50/40 border border-amber-200 text-xs space-y-1">
                          <div className="font-bold text-slate-800 flex items-center justify-between">
                            <span>{doc.titre}</span>
                            <span className="font-mono text-slate-500">{doc.heure}</span>
                          </div>
                          <p className="text-slate-700">{doc.texte}</p>
                        </div>
                      ))}

                      <div className="space-y-4">
                        {questionsList.map((q, qIdx) => {
                          const opts = q.options || [
                            { id: true, label: 'Oui / Plausible' },
                            { id: false, label: 'Non / Contradiction formelle' }
                          ];
                          return (
                            <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                              <div className="text-xs sm:text-sm font-bold text-slate-800">
                                Question {qIdx + 1} : {q.texte}
                              </div>
                              <div className="space-y-2">
                                {opts.map((opt) => {
                                  const isSelected = userAnswers[q.id] === opt.id;
                                  return (
                                    <div
                                      key={String(opt.id)}
                                      onClick={() => setUserAnswers({ ...userAnswers, [q.id]: opt.id })}
                                      className={`p-3 rounded-lg border text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-3 ${
                                        isSelected
                                          ? 'bg-[#153B2B]/10 border-[#153B2B] text-[#153B2B] font-semibold ring-1 ring-[#153B2B]'
                                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                                      }`}
                                    >
                                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                        isSelected ? 'border-[#153B2B] bg-[#153B2B]' : 'border-slate-300'
                                      }`}>
                                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                                      </div>
                                      <span>{opt.label || opt.texte}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Réponses analysées pour votre profil pratique.
                    </span>
                    <button
                      type="button"
                      onClick={handleSubmitSimulation}
                      disabled={submitting}
                      className="px-6 py-2.5 rounded-xl bg-[#153B2B] text-white text-xs sm:text-sm font-bold hover:bg-[#1C4E39] disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Calcul du barème...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-[#C9A052]" />
                          <span>Soumettre et valider l'évaluation</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

