import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, XCircle, Sparkles, RefreshCw, Activity } from 'lucide-react';

export default function DiagnosticExercise({ exercise, onComplete }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelectOption = (questionId, optionIndex) => {
    if (isAnswered) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const questions = exercise.questions || [];
  const allAnswered = questions.length > 0 && Object.keys(selectedAnswers).length === questions.length;

  const handleValidate = () => {
    if (!allAnswered || isAnswered) return;
    setIsAnswered(true);

    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.bonneReponseIndex) {
        correctCount += 1;
      }
    });

    const isAllCorrect = correctCount === questions.length;
    if (onComplete) {
      onComplete({
        exerciseId: exercise.id,
        isCorrect: isAllCorrect,
        score: Math.round((correctCount / questions.length) * 10)
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsAnswered(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slateSubtle-200 p-5 sm:p-6 shadow-xs space-y-5">
      {/* En-tête */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slateSubtle-100">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200">
            Étude de Cas & Diagnostic de Panne
          </span>
          <h4 className="text-base font-bold text-gendarmerie font-serif mt-1">
            {exercise.titre}
          </h4>
        </div>
        {isAnswered && (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slateSubtle-600 hover:text-gendarmerie transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Recommencer</span>
          </button>
        )}
      </div>

      {/* Situation opérationnelle */}
      <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Symptômes observés sur le terrain</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-950 font-serif leading-relaxed italic">
          « {exercise.situation} »
        </p>
      </div>

      {/* Questions de diagnostic */}
      <div className="space-y-4">
        {questions.map((q) => {
          return (
            <div key={q.id} className="space-y-2.5">
              <h5 className="text-xs font-bold text-gendarmerie flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-gold-dark" />
                <span>{q.question}</span>
              </h5>

              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[q.id] === optIdx;
                  const isCorrect = isAnswered && optIdx === q.bonneReponseIndex;
                  const isWrong = isAnswered && isSelected && optIdx !== q.bonneReponseIndex;

                  let styleCls = 'border-slateSubtle-200 bg-white hover:border-gendarmerie/40 text-slate-800';
                  if (isAnswered) {
                    if (isCorrect) {
                      styleCls = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                    } else if (isWrong) {
                      styleCls = 'border-rose-400 bg-rose-50 text-rose-950 ring-1 ring-rose-400';
                    } else {
                      styleCls = 'border-slateSubtle-200 bg-white text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    styleCls = 'border-gendarmerie bg-gendarmerie/5 text-gendarmerie font-semibold ring-1 ring-gendarmerie';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      disabled={isAnswered}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-2.5 cursor-pointer ${styleCls}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-cream-200 text-gendarmerie flex items-center justify-center text-[10px] font-bold shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="text-xs sm:text-sm leading-snug">{opt}</span>
                      </div>

                      {isAnswered && (
                        <span>
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : isWrong ? (
                            <XCircle className="w-4 h-4 text-rose-600" />
                          ) : null}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {isAnswered && q.explication && (
                <p className="text-xs text-slateSubtle-700 bg-cream-50 p-2.5 rounded-lg border border-slateSubtle-200 leading-relaxed italic">
                  💡 {q.explication}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Validation */}
      {!isAnswered ? (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleValidate}
            disabled={!allAnswered}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-xs ${
              allAnswered
                ? 'bg-gendarmerie text-white hover:bg-[#1C4E39] cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Valider le diagnostic technique
          </button>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1 animate-fade-slide">
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-900">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Diagnostic technique validé</span>
          </div>
          <p className="text-xs leading-relaxed">
            L'analyse des symptômes avant toute manipulation évite le remplacement aveugle de composants sains et fait gagner un temps précieux en intervention.
          </p>
        </div>
      )}
    </div>
  );
}

