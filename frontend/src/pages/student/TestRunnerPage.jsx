import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { testService } from '../../services/testService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import QuestionCard from '../../components/test/QuestionCard.jsx';
import ProgressBar from '../../components/test/ProgressBar.jsx';
import TimerWidget from '../../components/test/TimerWidget.jsx';
import ConfirmSubmitModal from '../../components/test/ConfirmSubmitModal.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import Button from '../../components/common/Button.jsx';
import Modal from '../../components/common/Modal.jsx';
import {
  ArrowLeft,
  ArrowRight,
  Send,
  Shield,
  Save,
  PauseCircle,
  Play,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

export default function TestRunnerPage() {
  const { id } = useParams();
  const testId = id || 1;
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: optionId }
  const [writtenAnswers, setWrittenAnswers] = useState({}); // { [questionId]: text }
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved'); // 'saving' | 'saved'

  // Chargement initial du test et de la session
  useEffect(() => {
    let isMounted = true;
    const initializeTest = async () => {
      try {
        // 1. Initialiser ou reprendre la session
        const sessionRes = await testService.startTest(testId);
        if (sessionRes && sessionRes.session) {
          setSessionId(sessionRes.session.SessionId);
          if (sessionRes.isFinished) {
            navigate('/eleve/resultats');
            return;
          }
        }

        // 2. Récupérer les questions et paramètres
        const data = await testService.getTestDetails(testId);
        if (!isMounted) return;

        if (data && data.questions && data.questions.length > 0) {
          setTest(data.test);
          setQuestions(data.questions);

          // Restauration des réponses si session existante
          if (data.session && data.session.UserAnswers) {
            const restoredAnswers = {};
            const restoredTexts = {};
            data.session.UserAnswers.forEach(ans => {
              if (ans.optionId !== undefined && ans.optionId !== null) {
                restoredAnswers[ans.questionId] = ans.optionId;
              }
              if (ans.reponseTexte) {
                restoredTexts[ans.questionId] = ans.reponseTexte;
              }
            });
            setAnswers(restoredAnswers);
            setWrittenAnswers(restoredTexts);
            setElapsedSeconds(data.session.DureeEcouleeSecondes || 0);
          }
        }
      } catch (err) {
        console.error('Erreur chargement test:', err);
        addToast({
          title: 'Erreur',
          message: 'Impossible de charger les questions du test.',
          type: 'error'
        });
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initializeTest();
    return () => { isMounted = false; };
  }, [testId, navigate, addToast]);

  // Autosauvegarde transparente d'une réponse QCM
  const handleSelectOption = useCallback(async (optionId) => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    // Mise à jour de l'état local immédiat
    setAnswers(prev => ({
      ...prev,
      [currentQ.QuestionId]: optionId
    }));

    setAutoSaveStatus('saving');

    // Sauvegarde en tâche de fond côté serveur
    try {
      if (sessionId) {
        await testService.saveProgress(testId, {
          sessionId,
          questionId: currentQ.QuestionId,
          optionId,
          reponseTexte: writtenAnswers[currentQ.QuestionId] || null,
          elapsedSeconds
        });
      }
      setAutoSaveStatus('saved');
    } catch (err) {
      console.warn('Échec temporaire autosave réseau:', err);
      setAutoSaveStatus('saved');
    }
  }, [questions, currentIndex, sessionId, testId, writtenAnswers, elapsedSeconds]);

  // Saisie et autosauvegarde de texte pour question subjective
  const handleWrittenAnswerChange = useCallback((text) => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    setWrittenAnswers(prev => ({
      ...prev,
      [currentQ.QuestionId]: text
    }));

    setAutoSaveStatus('saving');

    // Sauvegarde en arrière-plan
    if (sessionId) {
      testService.saveProgress(testId, {
        sessionId,
        questionId: currentQ.QuestionId,
        optionId: null,
        reponseTexte: text,
        elapsedSeconds
      }).then(() => {
        setAutoSaveStatus('saved');
      }).catch(err => {
        console.warn('Échec sauvegarde texte:', err);
        setAutoSaveStatus('saved');
      });
    }
  }, [questions, currentIndex, sessionId, testId, elapsedSeconds]);

  // Navigation vers la question suivante / précédente
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowConfirmModal(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Clôture et soumission du test
  const handleConfirmSubmit = async () => {
    setSubmitting(true);
    try {
      const allQIds = questions.map(q => q.QuestionId);
      const userAnswersList = allQIds.map(qId => ({
        questionId: qId,
        optionId: answers[qId] || null,
        reponseTexte: writtenAnswers[qId] || null
      })).filter(a => a.optionId !== null || (a.reponseTexte && a.reponseTexte.trim().length > 0));

      const res = await testService.submitTest(testId, {
        sessionId: sessionId || 1,
        userAnswers: userAnswersList
      });

      addToast({
        title: 'Épreuve clôturée avec succès',
        message: 'Vos aptitudes ont été analysées par le moteur de recommandation.',
        type: 'success'
      });

      setShowConfirmModal(false);
      navigate('/eleve/resultats');
    } catch (err) {
      console.error('Erreur soumission test:', err);
      addToast({
        title: 'Erreur de transmission',
        message: err.response?.data?.error || 'Erreur lors du calcul de vos résultats.',
        type: 'error'
      });
      setSubmitting(false);
    }
  };

  // Gestion de fin de chronomètre
  const handleTimeUp = () => {
    addToast({
      title: 'Temps réglementaire écoulé',
      message: 'Votre session est automatiquement transmise pour évaluation.',
      type: 'warning'
    });
    handleConfirmSubmit();
  };

  if (loading) {
    return <LoadingSpinner text="Initialisation de l'environnement d'évaluation sécurisé..." fullPage />;
  }

  const currentQuestion = questions[currentIndex] || null;
  const totalQuestions = questions.length;
  const answeredCount = questions.filter(q => {
    if (q.TypeQuestion === 'QUESTION_SUBJECTIVE') {
      return writtenAnswers[q.QuestionId] && writtenAnswers[q.QuestionId].trim().length > 0;
    }
    return answers[q.QuestionId] !== undefined && answers[q.QuestionId] !== null;
  }).length;
  const currentSelectedOptionId = currentQuestion ? answers[currentQuestion.QuestionId] : null;
  const currentWrittenAnswer = currentQuestion ? (writtenAnswers[currentQuestion.QuestionId] || '') : '';

  return (
    <div className="min-h-[100dvh] w-full bg-[#F7F8F5] flex flex-col selection:bg-gold-light">
      {/* Barre d'en-tête d'évaluation (Distraction-free) */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-[#0E291E] via-[#153B2B] to-[#0E291E] text-white border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3.5 shadow-card backdrop-blur-md w-full">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gold/15 flex items-center justify-center border border-gold/40 shadow-2xs">
              <Shield className="w-4 h-4 text-gold" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-wider text-white font-serif">
                ORIENT<span className="text-gold">-GR</span>
              </span>
              <span className="text-[10px] text-slateSubtle-300 block truncate max-w-[180px] sm:max-w-none">
                {test?.Titre || 'Évaluation d\'Orientation'}
              </span>
            </div>
          </div>

          {/* Chronomètre et état de sauvegarde */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slateSubtle-300">
              {autoSaveStatus === 'saving' ? (
                <span className="text-amber-400 flex items-center gap-1">
                  <Save className="w-3 h-3 animate-spin" /> Synchronisation...
                </span>
              ) : (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Réponses synchronisées
                </span>
              )}
            </div>

            <TimerWidget
              durationMinutes={test?.DureeMinutes || 30}
              initialElapsedSeconds={elapsedSeconds}
              onTimeUp={handleTimeUp}
              isPaused={isPaused}
              allowPause={test?.AutoriserPause ?? true}
              onTogglePause={() => setIsPaused(prev => !prev)}
              onTick={(sec) => setElapsedSeconds(sec)}
            />
          </div>
        </div>
      </header>

      {/* Conteneur principal plein écran équilibré */}
      <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6 lg:p-8 flex flex-col justify-between">
        <div className="w-full">
          {/* Indicateur de progression */}
          <ProgressBar
            currentIndex={currentIndex}
            totalQuestions={totalQuestions}
            answeredCount={answeredCount}
            domainName={currentQuestion?.DomaineIntitule}
            onSelectQuestion={(idx) => setCurrentIndex(idx)}
          />

          {/* Carte de la Question Principale au Centre */}
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              selectedOptionId={currentSelectedOptionId}
              onSelectOption={handleSelectOption}
              writtenAnswer={currentWrittenAnswer}
              onWrittenAnswerChange={handleWrittenAnswerChange}
              disabled={isPaused}
            />
          )}
        </div>

        {/* Barre de navigation inférieure fixe / collante */}
        <div className="mt-8 pt-4 border-t border-slateSubtle-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            {(test?.AutoriserRetour ?? true) && (
              <Button
                variant="outline"
                icon={ArrowLeft}
                onClick={handlePrev}
                disabled={currentIndex === 0 || isPaused}
              >
                السابق
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowConfirmModal(true)}
              className="text-xs text-slateSubtle-700 hover:text-gendarmerie"
            >
              إنهاء الاختبار ({answeredCount}/{totalQuestions})
            </Button>

            {currentIndex < totalQuestions - 1 ? (
              <Button
                variant="primary"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
                onClick={handleNext}
                disabled={isPaused}
              >
                السؤال الموالي
              </Button>
            ) : (
              <Button
                variant="gold"
                size="md"
                icon={Send}
                iconPosition="right"
                onClick={() => setShowConfirmModal(true)}
                disabled={isPaused}
              >
                تأكيد وإنهاء الاختبار
              </Button>
            )}
          </div>
        </div>
      </main>

      {/* Modal de Pause réglementaire */}
      <Modal
        isOpen={isPaused}
        onClose={() => setIsPaused(false)}
        title="Épreuve en Pause"
        subtitle="Le chronomètre est temporairement suspendu"
        footer={
          <Button variant="gold" icon={Play} onClick={() => setIsPaused(false)}>
            Reprendre l'épreuve
          </Button>
        }
      >
        <div className="text-center py-4 space-y-3">
          <PauseCircle className="w-12 h-12 text-gold mx-auto" />
          <p className="text-xs text-slateSubtle-800 leading-relaxed">
            Vos réponses sont sauvegardées. Cliquez sur <strong>Reprendre l'épreuve</strong> lorsque vous êtes prêt à poursuivre le test.
          </p>
        </div>
      </Modal>

      {/* Modal de confirmation avant transmission finale */}
      <ConfirmSubmitModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSubmit}
        totalQuestions={totalQuestions}
        answeredCount={answeredCount}
        loading={submitting}
      />
    </div>
  );
}
