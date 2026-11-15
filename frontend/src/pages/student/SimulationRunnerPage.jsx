import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { simulationService } from '../../services/simulationService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import {
  Shield,
  Clock,
  Save,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Send,
  HelpCircle,
  XCircle,
  FileText
} from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import Modal from '../../components/common/Modal.jsx';

// Composants interactifs spécialisés
import DocumentViewer from '../../components/simulation/DocumentViewer.jsx';
import InteractiveMapViewer from '../../components/simulation/InteractiveMapViewer.jsx';
import DataTableInspector from '../../components/simulation/DataTableInspector.jsx';
import ClassificationBoard from '../../components/simulation/ClassificationBoard.jsx';
import PrioritizationQueue from '../../components/simulation/PrioritizationQueue.jsx';
import DecisionScenarioCard from '../../components/simulation/DecisionScenarioCard.jsx';
import ReportPreparationEditor from '../../components/simulation/ReportPreparationEditor.jsx';

export default function SimulationRunnerPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [moduleData, setModuleData] = useState(null);
  const [tasksList, setTasksList] = useState([]);
  const [currentStageIndex, setCurrentStageIndex] = useState(1);
  const [stageAnswers, setStageAnswers] = useState({});
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved'); // 'saved' | 'saving'
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Chargement et initialisation de la session
  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      try {
        await simulationService.startOrResumeSession(moduleId);
        const data = await simulationService.getModuleDetails(moduleId);
        if (!isMounted) return;

        if (data && data.module) {
          setModuleData(data.module);
          if (Array.isArray(data.tasks) && data.tasks.length > 0) {
            setTasksList(data.tasks);
          }
          if (data.session) {
            const savedAnswers = data.session.reponsesTasks || data.session.reponsesEtapes || {};
            setStageAnswers(savedAnswers);
            setCurrentStageIndex(data.session.etapeCourante || 1);
            setElapsedSeconds(data.session.dureeEcouleeSecondes || 0);

            if (data.session.statut === 'TERMINE') {
              navigate(`/eleve/simulations/${moduleId}/resultats`);
              return;
            }
          }
        } else {
          addToast({
            title: 'خطأ',
            message: 'تعذر تحميل بيانات وحدة المحاكاة.',
            type: 'error'
          });
          navigate('/eleve/simulations');
        }
      } catch (err) {
        console.error('Erreur init simulation:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    init();
    return () => { isMounted = false; };
  }, [moduleId, navigate, addToast]);

  // Chronomètre
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Formatage du temps
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Résolution des étapes (dynamique depuis tasksList ou fallback moduleData.stages)
  const stages = tasksList.length > 0
    ? tasksList.map((t, idx) => ({
        stageIndex: idx + 1,
        taskId: t.taskId,
        numero: t.numero || idx + 1,
        titreAr: t.titreAr,
        titreFr: t.titreFr,
        difficulte: t.difficulte,
        pointsMax: t.pointsMax,
        stageType: t.interactionType,
        consigneAr: t.consigneAr,
        ...t.scenarioData
      }))
    : (moduleData?.stages || []);

  const totalStages = stages.length || 1;
  const currentStage = stages.find(s => s.stageIndex === currentStageIndex) || stages[0] || {};
  const stageKey = currentStage.taskId || `etape_${currentStageIndex}`;
  const currentAnswers = stageAnswers[stageKey] || stageAnswers[`etape_${currentStageIndex}`] || {};

  // Autosauvegarde de l'étape courante
  const handleStageChange = useCallback((updatedValues) => {
    const key = currentStage?.taskId || `etape_${currentStageIndex}`;
    setStageAnswers(prev => ({
      ...prev,
      [key]: updatedValues,
      [`etape_${currentStageIndex}`]: updatedValues
    }));
    setAutoSaveStatus('saving');

    const timeout = setTimeout(async () => {
      try {
        await simulationService.saveProgress(moduleId, {
          stageIndex: currentStageIndex,
          stageAnswers: updatedValues,
          elapsedSeconds
        });
        setAutoSaveStatus('saved');
      } catch (err) {
        setAutoSaveStatus('saved');
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [moduleId, currentStageIndex, currentStage, elapsedSeconds]);

  // Soumission finale de l'épreuve de simulation
  const handleFinalSubmit = async () => {
    setSubmitting(true);
    try {
      await simulationService.submitModule(moduleId, {
        allAnswers: stageAnswers,
        totalDurationSeconds: elapsedSeconds
      });

      addToast({
        title: 'تم إتمام المحاكاة بنجاح',
        message: 'تم تسجيل تقييمك المهني واحتساب درجات الكفاءات الميدانية.',
        type: 'success'
      });

      navigate(`/eleve/simulations/${moduleId}/resultats`);
    } catch (err) {
      console.error('Erreur soumission:', err);
      addToast({
        title: 'خطأ في الإرسال',
        message: 'حدث خطأ أثناء اعتماد التقييم، يرجى المحاولة ثانية.',
        type: 'error'
      });
      setSubmitting(false);
      setShowConfirmModal(false);
    }
  };

  if (loading || !moduleData) {
    return <LoadingSpinner text="جاري تجهيز بيئة المحاكاة الميدانية..." fullPage />;
  }

  return (
    <div className="min-h-[100dvh] bg-[#F7F8F5] text-slateSubtle-800 flex flex-col font-sans w-full" dir="rtl">
      {/* Barre supérieure institutionnelle de simulation */}
      <header className="sticky top-0 z-40 bg-[#153B2B] text-white border-b border-[#1C4E39] shadow-md w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Titre & Identité */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-gold/40">
              <Shield className="w-5 h-5 text-gold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-white">
                  {moduleData.titreAr}
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-gold/20 text-gold-light border border-gold/40">
                  {moduleData.code}
                </span>
              </div>
              <p className="text-[10px] text-slate-300 hidden sm:block">
                {moduleData.subdivision}
              </p>
            </div>
          </div>

          {/* Indicateurs (Chronomètre & Sauvegarde & Quitter) */}
          <div className="flex items-center gap-3">
            {/* Statut sauvegarde */}
            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-300">
              <span className={`w-2 h-2 rounded-full ${autoSaveStatus === 'saving' ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
              <span>{autoSaveStatus === 'saving' ? 'جاري الحفظ...' : 'محفوظ تلقائياً'}</span>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-1.5 bg-black/30 border border-white/10 px-3 py-1.5 rounded-xl font-mono text-xs font-bold text-gold">
              <Clock className="w-3.5 h-3.5 text-gold" />
              <span>{formatTime(elapsedSeconds)}</span>
            </div>

            {/* Quitter */}
            <button
              onClick={() => navigate('/eleve/simulations')}
              className="text-xs px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 transition cursor-pointer"
            >
              حفظ وخروج
            </button>
          </div>
        </div>

        {/* Barre d'étapes (Stepper) */}
        <div className="bg-[#0E291E] border-t border-[#1C4E39] px-4 py-2 w-full">
          <div className="w-full flex items-center justify-between gap-1 overflow-x-auto">
            {stages.map((stage) => {
              const isPassed = stage.stageIndex < currentStageIndex;
              const isCurrent = stage.stageIndex === currentStageIndex;
              return (
                <button
                  key={stage.stageIndex}
                  onClick={() => setCurrentStageIndex(stage.stageIndex)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isCurrent
                      ? 'bg-gold text-[#153B2B] shadow-2xs font-extrabold'
                      : isPassed
                      ? 'bg-white/15 text-white hover:bg-white/25'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono ${
                    isCurrent ? 'bg-[#153B2B] text-gold' : 'bg-white/20 text-white'
                  }`}>
                    {stage.stageIndex}
                  </span>
                  <span>{stage.titreAr?.split(':')[0]?.split(' - ')[0] || `المرحلة ${stage.stageIndex}`}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Corps principal de la scène de simulation */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Consigne de l'étape courante */}
        <div className="bg-white rounded-2xl border border-slateSubtle-200 p-5 shadow-sm space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-gold uppercase tracking-wider block">
                المرحلة {currentStage.stageIndex} من {totalStages}
              </span>
              {currentStage.taskId && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slateSubtle-100 text-slateSubtle-700 border border-slateSubtle-200">
                  {currentStage.taskId}
                </span>
              )}
              {currentStage.difficulte && (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-cream-100 text-gendarmerie border border-gold/30">
                  المستوى: {
                    currentStage.difficulte === 'AVANCE' ? 'متقدم' :
                    currentStage.difficulte === 'EXPERT' ? 'خبير' :
                    currentStage.difficulte === 'INTERMEDIAIRE' ? 'متوسط' : 'أساسي'
                  }
                </span>
              )}
            </div>
            <span className="text-xs text-slateSubtle-500 font-mono">
              {Math.round((currentStageIndex / totalStages) * 100)}% مكتمل
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-gendarmerie">
            {currentStage.titreAr}
          </h2>
          <p className="text-xs text-slateSubtle-600 leading-relaxed">
            {currentStage.consigneAr}
          </p>
        </div>

        {/* Rendu dynamique du composant interactif selon le type d'étape */}
        <div className="space-y-6">
          {currentStage.stageType === 'DOCUMENT_ANALYSIS' && (
            <DocumentViewer
              documents={currentStage.documents}
              questionsVerif={currentStage.questionsVerif}
              values={currentAnswers}
              onChange={handleStageChange}
            />
          )}

          {currentStage.stageType === 'CONTRADICTION_DETECTION' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slateSubtle-200 p-5 md:p-6 space-y-4 shadow-card">
                <div className="flex items-center gap-2 pb-2 border-b border-slateSubtle-200 text-xs font-bold text-gendarmerie">
                  <HelpCircle className="w-4 h-4 text-gold" />
                  <span>مقارنة الأقوال والتصريحات مع الأدلة والقرائن الثابتة</span>
                </div>

                <div className="space-y-4">
                  {(currentStage.itemsToEvaluate || []).map((item, idx) => {
                    const isIdentifiedAsContra = currentAnswers[item.id] === true;
                    return (
                      <div
                        key={item.id || idx}
                        className={`p-4 rounded-xl border transition-all ${
                          isIdentifiedAsContra ? 'border-amber-400 bg-amber-50/40 shadow-xs' : 'border-slateSubtle-200 bg-white'
                        }`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                          <div className="space-y-1.5 flex-1 text-xs sm:text-sm">
                            <p className="font-bold text-gendarmerie">
                              {item.declarationAr}
                            </p>
                            <p className="text-slateSubtle-600 bg-cream-50 p-2.5 rounded-lg border border-slateSubtle-200/80">
                              <strong>المعطى الموثق: </strong>{item.preuveAr}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 self-start md:self-auto flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => handleStageChange({ ...currentAnswers, [item.id]: true })}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                                currentAnswers[item.id] === true
                                  ? 'bg-rose-700 text-white border-rose-800 shadow-2xs'
                                  : 'bg-white hover:bg-cream-100 text-slateSubtle-700 border-slateSubtle-200'
                              }`}
                            >
                              تناقض صريح ⚠️
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStageChange({ ...currentAnswers, [item.id]: false })}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                                currentAnswers[item.id] === false
                                  ? 'bg-emerald-700 text-white border-emerald-800 shadow-2xs'
                                  : 'bg-white hover:bg-cream-100 text-slateSubtle-700 border-slateSubtle-200'
                              }`}
                            >
                              متطابق / لا تناقض ✓
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {currentStage.stageType === 'INTERACTIVE_MAP' && (
            <InteractiveMapViewer
              mapData={currentStage.mapData}
              hotspotsAIdentifier={currentStage.hotspotsAIdentifier}
              values={currentAnswers}
              onChange={handleStageChange}
            />
          )}

          {currentStage.stageType === 'DATASET_AUDIT' && (
            <DataTableInspector
              dataset={currentStage.dataset}
              anomaliesToSelect={currentStage.anomaliesToSelect}
              values={currentAnswers}
              onChange={handleStageChange}
            />
          )}

          {currentStage.stageType === 'CLASSIFICATION' && (
            <ClassificationBoard
              categories={currentStage.categories}
              elements={currentStage.elements}
              values={currentAnswers}
              onChange={handleStageChange}
            />
          )}

          {currentStage.stageType === 'PRIORITIZATION' && (
            <PrioritizationQueue
              itemsToOrder={currentStage.itemsToOrder}
              values={currentAnswers}
              onChange={handleStageChange}
            />
          )}

          {currentStage.stageType === 'DECISION_SCENARIO' && (
            <DecisionScenarioCard
              scenarios={currentStage.scenarios}
              values={currentAnswers}
              onChange={handleStageChange}
            />
          )}

          {currentStage.stageType === 'REPORT_PREPARATION' && (
            <ReportPreparationEditor
              rubriqueCriteres={currentStage.rubriqueCriteres}
              champsAttendus={currentStage.champsAttendus}
              values={currentAnswers}
              onChange={handleStageChange}
            />
          )}
        </div>

        {/* Barre de navigation basse (Précédent / Suivant / Terminer) */}
        <div className="flex items-center justify-between gap-4 pt-6 border-t border-slateSubtle-200">
          <Button
            variant="outline"
            size="md"
            disabled={currentStageIndex === 1}
            onClick={() => setCurrentStageIndex(prev => Math.max(1, prev - 1))}
            icon={ArrowRight}
          >
            المرحلة السابقة
          </Button>

          {currentStageIndex < totalStages ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => setCurrentStageIndex(prev => Math.min(totalStages, prev + 1))}
              icon={ArrowLeft}
              iconPosition="right"
            >
              المرحلة التالية
            </Button>
          ) : (
            <Button
              variant="gold"
              size="md"
              onClick={() => setShowConfirmModal(true)}
              icon={Send}
              iconPosition="right"
            >
              اعتماد وإرسال التقييم
            </Button>
          )}
        </div>
      </main>

      {/* Modal de confirmation de soumission finale */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="تأكيد إنهاء واعتماد المحاكاة المهنية"
      >
        <div className="space-y-4 text-right font-sans" dir="rtl">
          <div className="flex items-center gap-3 p-3 bg-cream-100 rounded-xl border border-slateSubtle-200 text-xs text-slateSubtle-700">
            <AlertTriangle className="w-5 h-5 text-gold flex-shrink-0" />
            <p>
              أنت على وشك اعتماد مخرجات محاكاة <strong>{moduleData.titreAr}</strong>. بمجرد التأكيد سيتم احتساب درجات الكفاءات العملية وإدراجها ضمن ملف التوجيه المهني.
            </p>
          </div>

          <div className="text-xs text-slateSubtle-600 space-y-1">
            <p>• المدة المستغرقة: <strong>{formatTime(elapsedSeconds)}</strong></p>
            <p>• عدد المراحل المنجزة: <strong>{totalStages} / {totalStages}</strong></p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slateSubtle-200">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowConfirmModal(false)}
              disabled={submitting}
            >
              مراجعة الأجوبة
            </Button>
            <Button
              variant="gold"
              size="sm"
              loading={submitting}
              onClick={handleFinalSubmit}
            >
              تأكيد الإرسال والتقييم
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
