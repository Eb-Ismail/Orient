import React, { useState } from 'react';
import { Target, CheckCircle2, XCircle, Info, Sparkles, RefreshCw } from 'lucide-react';

export default function HotspotExercise({ exercise, onComplete }) {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelect = (spot) => {
    setSelectedHotspot(spot);
    setIsAnswered(true);
    if (onComplete) {
      onComplete({
        exerciseId: exercise.id,
        isCorrect: Boolean(spot.correct),
        score: spot.correct ? 10 : 0
      });
    }
  };

  const handleReset = () => {
    setSelectedHotspot(null);
    setIsAnswered(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slateSubtle-200 p-5 sm:p-6 shadow-xs space-y-5">
      {/* En-tête */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slateSubtle-100">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
            Identification Visuelle sur Schéma
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
      <p className="text-sm font-medium text-slate-800 leading-relaxed bg-cream-50/80 p-3.5 rounded-xl border border-slateSubtle-200/80 flex items-start gap-2.5">
        <Target className="w-4 h-4 text-gendarmerie shrink-0 mt-0.5" />
        <span>{exercise.consigne}</span>
      </p>

      {/* Plateau interactif visuel */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#0D241A] via-[#153B2B] to-[#1C4E39] p-6 border-2 border-slateSubtle-300 min-h-[300px] flex flex-col justify-between overflow-hidden shadow-inner select-none">
        {/* Grille de fond technique */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#C9A052 1px, transparent 1px), linear-gradient(to right, #C9A052 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 flex items-center justify-between text-xs text-gold-light pb-4 border-b border-white/10">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider">
            [ CARTE TECHNIQUE D'EXPLOITATION ]
          </span>
          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-md">
            Cliquez sur l'organe demandé
          </span>
        </div>

        {/* Représentation schématique avec points cibles */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
          {exercise.hotspots.map((spot) => {
            const isChosen = selectedHotspot?.id === spot.id;
            let cardStyle = 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-gold';

            if (isAnswered) {
              if (spot.correct) {
                cardStyle = 'bg-emerald-600/90 text-white border-emerald-400 ring-2 ring-emerald-400 font-bold';
              } else if (isChosen && !spot.correct) {
                cardStyle = 'bg-rose-600/90 text-white border-rose-400 ring-2 ring-rose-400';
              } else {
                cardStyle = 'bg-black/30 text-white/40 border-white/5';
              }
            }

            return (
              <button
                key={spot.id}
                onClick={() => handleSelect(spot)}
                className={`p-3.5 rounded-xl border transition-all text-left flex flex-col justify-between gap-2 min-h-[85px] cursor-pointer ${cardStyle}`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="w-5 h-5 rounded-full bg-gold/30 text-gold-light text-[10px] font-bold flex items-center justify-center shrink-0">
                    ◎
                  </span>
                  {isAnswered && (
                    <span>
                      {spot.correct ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      ) : isChosen ? (
                        <XCircle className="w-4 h-4 text-rose-300" />
                      ) : null}
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold leading-snug">
                  {spot.label}
                </div>
              </button>
            );
          })}
        </div>

        <div className="relative z-10 text-[10px] text-slate-300 italic pt-2 border-t border-white/10">
          Système normalisé Gendarmerie Royale • Repérage de précision
        </div>
      </div>

      {/* Résultat et retour pédagogique */}
      {isAnswered && (
        <div
          className={`p-4 rounded-xl border ${
            selectedHotspot?.correct
              ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
              : 'bg-amber-50/90 border-amber-300 text-amber-950'
          } space-y-2 animate-fade-slide`}
        >
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
            {selectedHotspot?.correct ? (
              <>
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span className="text-emerald-800">Composant correctement identifié !</span>
              </>
            ) : (
              <>
                <Info className="w-4 h-4 text-amber-700" />
                <span className="text-amber-800">Précision technique :</span>
              </>
            )}
          </div>
          <p className="text-xs leading-relaxed">
            {selectedHotspot?.explication ||
              exercise.hotspots.find((h) => h.correct)?.explication ||
              'Examinez bien l\'emplacement sur le schéma pour mémoriser sa position.'}
          </p>
        </div>
      )}
    </div>
  );
}

