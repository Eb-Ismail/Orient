import React, { useState } from 'react';
import { Layers, CheckCircle2, XCircle, Sparkles, RefreshCw, ArrowRight } from 'lucide-react';

export default function AssociationExercise({ exercise, onComplete }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [associations, setAssociations] = useState({}); // { itemId: targetId }
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Éléments mélangés côté cible pour tester l'analyse
  const items = exercise.paires || [];
  const targets = React.useMemo(() => {
    return [...items].sort((a, b) => b.cible.length - a.cible.length);
  }, [items]);

  const handleSelectItem = (itemId) => {
    if (isSubmitted) return;
    setSelectedItem(itemId);
  };

  const handleSelectTarget = (targetId) => {
    if (isSubmitted || !selectedItem) return;
    setAssociations((prev) => ({
      ...prev,
      [selectedItem]: targetId
    }));
    setSelectedItem(null);
  };

  const handleRemovePair = (itemId) => {
    if (isSubmitted) return;
    setAssociations((prev) => {
      const copy = { ...prev };
      delete copy[itemId];
      return copy;
    });
  };

  const allAssigned = items.length > 0 && Object.keys(associations).length === items.length;

  const handleValidate = () => {
    if (!allAssigned || isSubmitted) return;
    setIsSubmitted(true);

    let correctCount = 0;
    items.forEach((p) => {
      if (associations[p.id] === p.id) {
        correctCount += 1;
      }
    });

    const isAllCorrect = correctCount === items.length;
    if (onComplete) {
      onComplete({
        exerciseId: exercise.id,
        isCorrect: isAllCorrect,
        score: Math.round((correctCount / items.length) * 10)
      });
    }
  };

  const handleReset = () => {
    setSelectedItem(null);
    setAssociations({});
    setIsSubmitted(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slateSubtle-200 p-5 sm:p-6 shadow-xs space-y-5">
      {/* En-tête */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slateSubtle-100">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-200">
            Association & Glisser-Déposer
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
      <p className="text-sm font-medium text-slate-800 leading-relaxed bg-cream-50/80 p-3.5 rounded-xl border border-slateSubtle-200/80">
        {exercise.consigne}
      </p>

      {/* Guide d'utilisation */}
      {!isSubmitted && (
        <div className="text-[11px] text-slateSubtle-600 bg-blue-50/60 p-2.5 rounded-lg border border-blue-100 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-700 shrink-0" />
          <span>
            {selectedItem
              ? 'Élément sélectionné ! Cliquez maintenant sur sa définition correspondante à droite.'
              : 'Cliquez d\'abord sur un élément à gauche, puis sur son rôle technique à droite pour les relier.'}
          </span>
        </div>
      )}

      {/* Grille des deux colonnes à relier */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Colonne 1 : Éléments / Outils */}
        <div className="space-y-2.5">
          <h5 className="text-xs font-bold uppercase tracking-wider text-gendarmerie">
            1. Éléments à identifier
          </h5>
          <div className="space-y-2">
            {items.map((it) => {
              const isSelected = selectedItem === it.id;
              const isLinked = Boolean(associations[it.id]);
              const isCorrect = isSubmitted && associations[it.id] === it.id;

              return (
                <button
                  key={it.id}
                  onClick={() => handleSelectItem(it.id)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-2 cursor-pointer ${
                    isSelected
                      ? 'border-gold bg-gold/10 ring-2 ring-gold'
                      : isSubmitted
                      ? isCorrect
                        ? 'border-emerald-400 bg-emerald-50 text-emerald-950 font-semibold'
                        : 'border-rose-400 bg-rose-50 text-rose-950'
                      : isLinked
                      ? 'border-slateSubtle-300 bg-cream-100/70 text-slate-800'
                      : 'border-slateSubtle-200 bg-white hover:border-gendarmerie/40'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                    <span className="text-xs font-bold text-slate-800 truncate">{it.item}</span>
                  </div>

                  {isLinked && !isSubmitted && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemovePair(it.id);
                      }}
                      className="text-[10px] text-slateSubtle-500 hover:text-rose-600 px-2 py-0.5 rounded bg-white border border-slateSubtle-200"
                      title="Supprimer la liaison"
                    >
                      ✕ Défaire
                    </span>
                  )}

                  {isSubmitted && (
                    <span>
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Colonne 2 : Rôles & Descriptions */}
        <div className="space-y-2.5">
          <h5 className="text-xs font-bold uppercase tracking-wider text-gendarmerie">
            2. Fonctions / Rôles techniques
          </h5>
          <div className="space-y-2">
            {targets.map((tgt) => {
              // Vérifie quel item est lié à cette cible
              const linkedItemId = Object.keys(associations).find((k) => associations[k] === tgt.id);
              const linkedItem = items.find((i) => i.id === linkedItemId);
              const isCorrectTarget = isSubmitted && linkedItem?.id === tgt.id;

              return (
                <button
                  key={tgt.id}
                  onClick={() => handleSelectTarget(tgt.id)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col justify-between gap-1.5 cursor-pointer ${
                    selectedItem
                      ? 'border-dashed border-gold hover:bg-gold/5'
                      : isSubmitted
                      ? isCorrectTarget
                        ? 'border-emerald-400 bg-emerald-50 text-emerald-950'
                        : 'border-rose-400 bg-rose-50 text-rose-950'
                      : linkedItemId
                      ? 'border-slateSubtle-300 bg-cream-100/70'
                      : 'border-slateSubtle-200 bg-white hover:border-slateSubtle-400'
                  }`}
                >
                  <p className="text-xs text-slate-700 leading-snug">{tgt.cible}</p>
                  {linkedItem && (
                    <div className="text-[11px] font-bold text-gendarmerie flex items-center gap-1.5 pt-1 border-t border-slateSubtle-200">
                      <ArrowRight className="w-3 h-3 text-gold-dark" />
                      <span>Relié à : {linkedItem.item}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Validation */}
      {!isSubmitted ? (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleValidate}
            disabled={!allAssigned}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-xs ${
              allAssigned
                ? 'bg-gendarmerie text-white hover:bg-[#1C4E39] cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Valider mes associations ({Object.keys(associations).length}/{items.length})
          </button>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1 animate-fade-slide">
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-900">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Synthèse de l'exercice d'association</span>
          </div>
          <p className="text-xs leading-relaxed">
            Excellente réactivité ! La corrélation précise entre l'outillage tactique et sa fonction terrain est un pilier de l'autonomie en unité opérationnelle.
          </p>
        </div>
      )}
    </div>
  );
}

