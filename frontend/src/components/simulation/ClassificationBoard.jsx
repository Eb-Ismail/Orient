import React from 'react';
import { Layers, CheckCircle2, ArrowLeftRight } from 'lucide-react';

export default function ClassificationBoard({ categories = [], elements = [], values = {}, onChange }) {
  const handleAssign = (elementId, categoryId) => {
    const next = { ...values, [elementId]: categoryId };
    if (onChange) {
      onChange(next);
    }
  };

  const colorClasses = {
    emerald: {
      header: 'bg-emerald-800 text-white',
      border: 'border-emerald-200',
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-300'
    },
    blue: {
      header: 'bg-blue-800 text-white',
      border: 'border-blue-200',
      badge: 'bg-blue-50 text-blue-800 border-blue-300'
    },
    amber: {
      header: 'bg-amber-800 text-white',
      border: 'border-amber-200',
      badge: 'bg-amber-50 text-amber-900 border-amber-300'
    },
    rose: {
      header: 'bg-rose-800 text-white',
      border: 'border-rose-200',
      badge: 'bg-rose-50 text-rose-900 border-rose-300'
    },
    gold: {
      header: 'bg-[#153B2B] text-white',
      border: 'border-gold/40',
      badge: 'bg-gold-subtle text-gendarmerie border-gold/40'
    }
  };

  const assignedCount = Object.keys(values).length;

  return (
    <div className="space-y-6 text-right font-sans" dir="rtl">
      {/* Statut de classification */}
      <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slateSubtle-200 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-gendarmerie">
          <Layers className="w-4 h-4 text-gold" />
          <span>تصنيف العناصر والمحجوزات في الفئات القانونية المناسبة</span>
        </div>
        <div className="text-xs bg-cream-100 px-3 py-1.5 rounded-xl border border-slateSubtle-200">
          <span className="text-slateSubtle-600">العناصر المصنفة: </span>
          <span className="font-bold text-gendarmerie font-mono">{assignedCount} / {elements.length}</span>
        </div>
      </div>

      {/* Liste des éléments à classer */}
      <div className="space-y-3">
        {elements.map((elem, idx) => {
          const selectedCatId = values[elem.id];
          return (
            <div
              key={elem.id || idx}
              className={`p-4 rounded-xl border transition-all bg-white ${
                selectedCatId ? 'border-gendarmerie/40 shadow-xs' : 'border-slateSubtle-200'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-2.5 flex-1">
                  <span className="w-6 h-6 rounded-full bg-cream-200 text-gendarmerie font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slateSubtle-800 leading-relaxed font-medium">
                    {elem.texteAr}
                  </p>
                </div>

                {/* Boutons de sélection de catégorie pour cet élément */}
                <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto flex-shrink-0">
                  {categories.map(cat => {
                    const isSelected = selectedCatId === cat.id;
                    const style = colorClasses[cat.couleur] || colorClasses.gold;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleAssign(elem.id, cat.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                          isSelected
                            ? `${style.header} shadow-xs ring-2 ring-gold/40 scale-105`
                            : 'bg-cream-50 hover:bg-cream-100 text-slateSubtle-700 border-slateSubtle-200'
                        }`}
                      >
                        {cat.titreAr}
                        {isSelected && ' ✓'}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
