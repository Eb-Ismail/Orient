import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, RotateCcw, ListOrdered, CheckCircle2 } from 'lucide-react';

export default function PrioritizationQueue({ itemsToOrder = [], values = {}, onChange }) {
  // Initialisation de l'ordre
  const [items, setItems] = useState(() => {
    if (Array.isArray(values.orderedIds) && values.orderedIds.length === itemsToOrder.length) {
      return values.orderedIds
        .map(id => itemsToOrder.find(it => it.id === id))
        .filter(Boolean);
    }
    return [...itemsToOrder];
  });

  useEffect(() => {
    if (Array.isArray(values.orderedIds) && values.orderedIds.length === itemsToOrder.length) {
      const restored = values.orderedIds
        .map(id => itemsToOrder.find(it => it.id === id))
        .filter(Boolean);
      if (restored.length === itemsToOrder.length) {
        setItems(restored);
      }
    }
  }, [values.orderedIds, itemsToOrder]);

  const moveItem = (index, direction) => {
    const newItems = [...items];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    setItems(newItems);
    if (onChange) {
      onChange({ ...values, orderedIds: newItems.map(it => it.id) });
    }
  };

  const resetOrder = () => {
    setItems([...itemsToOrder]);
    if (onChange) {
      onChange({ ...values, orderedIds: itemsToOrder.map(it => it.id) });
    }
  };

  return (
    <div className="space-y-6 text-right font-sans" dir="rtl">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-slateSubtle-200 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-gendarmerie">
          <ListOrdered className="w-4 h-4 text-gold" />
          <span>ترتيب الخطوات والإجراءات حسب الأسبقية والأثر القانوني / العملياتي</span>
        </div>
        <button
          type="button"
          onClick={resetOrder}
          className="flex items-center gap-1.5 text-xs text-slateSubtle-600 hover:text-gendarmerie px-3 py-1.5 rounded-lg border border-slateSubtle-200 hover:bg-cream-100 transition cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>إعادة التعيين</span>
        </button>
      </div>

      {/* Liste d'éléments à réordonner */}
      <div className="space-y-2.5">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 p-4 bg-white rounded-xl border border-slateSubtle-200 hover:border-gold/50 shadow-xs transition"
          >
            <div className="flex items-start gap-3 flex-1">
              {/* Badge du rang */}
              <div className="w-7 h-7 rounded-lg bg-[#153B2B] text-gold font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                {idx + 1}
              </div>
              <p className="text-xs sm:text-sm text-slateSubtle-800 leading-relaxed font-medium">
                {item.texteAr}
              </p>
            </div>

            {/* Boutons de déplacement vertical */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                type="button"
                disabled={idx === 0}
                onClick={() => moveItem(idx, -1)}
                className={`p-2 rounded-lg border text-xs transition cursor-pointer ${
                  idx === 0
                    ? 'opacity-30 cursor-not-allowed bg-cream-100 border-slateSubtle-200 text-slate-400'
                    : 'bg-white hover:bg-[#153B2B] hover:text-white border-slateSubtle-200 text-slateSubtle-700 shadow-2xs'
                }`}
                title="تقديم لأعلى"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={idx === items.length - 1}
                onClick={() => moveItem(idx, 1)}
                className={`p-2 rounded-lg border text-xs transition cursor-pointer ${
                  idx === items.length - 1
                    ? 'opacity-30 cursor-not-allowed bg-cream-100 border-slateSubtle-200 text-slate-400'
                    : 'bg-white hover:bg-[#153B2B] hover:text-white border-slateSubtle-200 text-slateSubtle-700 shadow-2xs'
                }`}
                title="تأخير لأسفل"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
