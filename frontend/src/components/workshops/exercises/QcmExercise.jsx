import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';

export default function QcmExercise({ exercise, onComplete }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelect = (optionId) => {
    if (isAnswered) return;
    setSelectedOption(optionId);
  };

  const handleValidate = () => {
    if (!selectedOption || isAnswered) return;
    setIsAnswered(true);
    const chosen = exercise.options.find((o) => o.id === selectedOption);
    if (onComplete) {
      onComplete({
        exerciseId: exercise.id,
        isCorrect: Boolean(chosen?.correct),
        score: chosen?.correct ? 10 : 0
      });
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const chosenOption = exercise.options.find((o) => o.id === selectedOption);

  return (
    <div className="bg-white rounded-2xl border border-slateSubtle-200 p-5 sm:p-6 shadow-xs space-y-5">
      {/* En-tête de l'exercice */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slateSubtle-100">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark bg-gold/10 px-2.5 py-0.5 rounded-md">
            Question à Choix Multiples (QCM)
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

      {/* Consigne */}
      <p className="text-sm font-medium text-slate-800 leading-relaxed bg-cream-50/80 p-3.5 rounded-xl border border-slateSubtle-200/80">
        {exercise.consigne}
      </p>

      {/* Options */}
      <div className="space-y-2.5">
        {exercise.options.map((option) => {
          const isSelected = selectedOption === option.id;
          let btnClass = 'border-slateSubtle-200 bg-white hover:border-gendarmerie/40 hover:bg-cream-50/50 text-slate-800';

          if (isAnswered) {
            if (option.correct) {
              btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-500';
            } else if (isSelected && !option.correct) {
              btnClass = 'border-rose-400 bg-rose-50 text-rose-950 ring-1 ring-rose-400';
            } else {
              btnClass = 'border-slateSubtle-200 bg-white text-slate-400 opacity-60';
            }
          } else if (isSelected) {
            btnClass = 'border-gendarmerie bg-gendarmerie/5 text-gendarmerie font-semibold ring-1 ring-gendarmerie';
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={isAnswered}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${btnClass}`}
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-cream-200 text-gendarmerie flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {option.id.toUpperCase()}
                </span>
                <span className="text-xs sm:text-sm leading-relaxed">{option.label}</span>
              </div>

              {isAnswered && (
                <div className="shrink-0 mt-0.5">
                  {option.correct ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : isSelected ? (
                    <XCircle className="w-5 h-5 text-rose-600" />
                  ) : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bouton de validation */}
      {!isAnswered ? (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleValidate}
            disabled={!selectedOption}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-xs ${
              selectedOption
                ? 'bg-gendarmerie text-white hover:bg-[#1C4E39] cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Valider ma réponse
          </button>
        </div>
      ) : (
        /* Feedback pédagogique détaillé */
        <div
          className={`p-4 rounded-xl border ${
            chosenOption?.correct
              ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
              : 'bg-amber-50/90 border-amber-300 text-amber-950'
          } space-y-2 animate-fade-slide`}
        >
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
            {chosenOption?.correct ? (
              <>
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span className="text-emerald-800">Bonne réponse ! Explication technique :</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-amber-700" />
                <span className="text-amber-800">Explication et rappel de la doctrine :</span>
              </>
            )}
          </div>
          <p className="text-xs leading-relaxed">
            {chosenOption?.explication ||
              exercise.options.find((o) => o.correct)?.explication ||
              'Consultez la fiche technique pour approfondir ce point réglementaire.'}
          </p>
        </div>
      )}
    </div>
  );
}

