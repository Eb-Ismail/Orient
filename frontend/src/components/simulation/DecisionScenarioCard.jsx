import React from 'react';
import { HelpCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function DecisionScenarioCard({ scenarios = [], values = {}, onChange }) {
  const handleSelect = (scenId, optIdx) => {
    if (onChange) {
      onChange({ ...values, [scenId]: optIdx });
    }
  };

  return (
    <div className="space-y-6 text-right font-sans" dir="rtl">
      {scenarios.map((scen, idx) => {
        const selectedOpt = values[scen.id];
        const options = scen.optionsAr || scen.options || [];

        return (
          <div
            key={scen.id || idx}
            className="bg-white rounded-2xl border-2 border-slateSubtle-200 p-5 md:p-7 space-y-4 shadow-card"
          >
            <div className="flex items-start gap-3 pb-3 border-b border-slateSubtle-200">
              <div className="w-8 h-8 rounded-xl bg-gold/15 text-gold-dark font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5 border border-gold/30">
                {idx + 1}
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark block">
                  موقف ميداني / تقدير تكتيكي وإجرائي
                </span>
                {scen.situationAr && (
                  <p className="text-xs text-slateSubtle-600 mt-1 mb-1.5 bg-cream-50 p-2.5 rounded-lg border border-slateSubtle-200">
                    <strong>الواقعة الميدانية: </strong>{scen.situationAr}
                  </p>
                )}
                <h3 className="text-sm sm:text-base font-bold text-gendarmerie mt-0.5 leading-snug">
                  {scen.questionAr}
                </h3>
              </div>
            </div>

            <div className="space-y-2.5 pt-1">
              {options.map((option, optIdx) => {
                const isSelected = selectedOpt === optIdx;
                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelect(scen.id, optIdx)}
                    className={`w-full text-right p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-[#153B2B] text-white border-[#153B2B] shadow-card font-medium'
                        : 'bg-white hover:bg-cream-100 text-slateSubtle-800 border-slateSubtle-200'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 border ${
                      isSelected
                        ? 'bg-gold text-gendarmerie border-gold'
                        : 'bg-cream-200 text-slateSubtle-600 border-slateSubtle-300'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{option}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
