import React, { useState } from 'react';
import { ArrowUp, ArrowDown, CheckCircle2, XCircle, Sparkles, RefreshCw, ListOrdered } from 'lucide-react';

export default function OrderingExercise({ exercise, onComplete }) {
  // Mélanger initialement les étapes pour que l'élève doive réfléchir
  const initialSteps = React.useMemo(() => {
    const list = [...(exercise.etapes || [])];
    return list.sort(() => Math.random() - 0.5);
  }, [exercise]);

  const [currentOrder, setCurrentOrder] = useState(initialSteps);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const moveUp = (index) => {
    if (index === 0 || isSubmitted) return;
    const next = [...currentOrder];
    const temp = next[index - 1];
    next[index - 1] = next[index];
    next[index] = temp;
    setCurrentOrder(next);
  };

  const moveDown = (index) => {
    if (index === currentOrder.length - 1 || isSubmitted) return;
    const next = [...currentOrder];
    const temp = next[index + 1];
    next[index + 1] = next[index];
    next[index] = temp;
    setCurrentOrder(next);
  };

  const handleValidate = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);

    let correctCount = 0;
    currentOrder.forEach((step, idx) => {
      if (step.ordreCorrect === idx + 1) {
        correctCount += 1;
      }
    });

    const isAllCorrect = correctCount === currentOrder.length;
    if (onComplete) {
      onComplete({
        exerciseId: exercise.id,
        isCorrect: isAllCorrect,
        score: Math.round((correctCount / currentOrder.length) * 10)
      });
    }
  };

  const handleReset = () => {
    setCurrentOrder(initialSteps);
    setIsSubmitted(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slateSubtle-200 p-5 sm:p-6 shadow-xs space-y-5">
      {/* En-tête */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slateSubtle-100">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
            Ordonnancement Procédural
          </span>
          <h4 className="text-base font-bold text-gendarmerie font-serif mt-1">
            {exercise.titre}
          </h4>
        </div>
        {isSubmitted && (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slateSubtle-600 hover:text-gendarmerie transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Recommencer</span>
          </button>
        )}
      </div>

      {/* Consigne */}
      <p className="text-sm font-medium text-slate-800 leading-relaxed bg-cream-50/80 p-3.5 rounded-xl border border-slateSubtle-200/80 flex items-start gap-2.5">
        <ListOrdered className="w-4 h-4 text-gendarmerie shrink-0 mt-0.5" />
        <span>{exercise.consigne}</span>
      </p>

      {/* Liste des étapes avec boutons de déplacement */}
      <div className="space-y-2.5">
        {currentOrder.map((step, idx) => {
          const isCorrect = isSubmitted && step.ordreCorrect === idx + 1;

          return (
            <div
              key={step.id}
              className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-950 font-semibold'
                    : 'border-rose-400 bg-rose-50 text-rose-950'
                  : 'border-slateSubtle-200 bg-white hover:border-gendarmerie/40 shadow-2xs'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-7 h-7 rounded-lg bg-gendarmerie text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm leading-relaxed">{step.texte}</span>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {!isSubmitted ? (
                  <>
                    <button
                      type="button"
                      onClick={() => moveUp(idx)}
                      disabled={idx === 0}
                      className="p-1.5 rounded-lg border border-slateSubtle-200 hover:bg-cream-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="Monter d'un rang"
                    >
                      <ArrowUp className="w-4 h-4 text-slate-700" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveDown(idx)}
                      disabled={idx === currentOrder.length - 1}
                      className="p-1.5 rounded-lg border border-slateSubtle-200 hover:bg-cream-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="Descendre d'un rang"
                    >
                      <ArrowDown className="w-4 h-4 text-slate-700" />
                    </button>
                  </>
                ) : (
                  <span>
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <span className="text-[10px] font-bold text-rose-700 bg-white px-2 py-0.5 rounded border border-rose-200">
                        Attendu en #{step.ordreCorrect}
                      </span>
                    )}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Validation */}
      {!isSubmitted ? (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleValidate}
            className="px-5 py-2.5 rounded-xl bg-gendarmerie text-white text-xs font-bold hover:bg-[#1C4E39] transition shadow-xs cursor-pointer"
          >
            Valider l'ordre de la procédure
          </button>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1 animate-fade-slide">
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-900">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Respect du protocole réglementaire</span>
          </div>
          <p className="text-xs leading-relaxed">
            La rigueur chronologique prévient les courts-circuits, les fausses manipulations et garantit la sécurité physique des intervenants en atelier.
          </p>
        </div>
      )}
    </div>
  );
}

