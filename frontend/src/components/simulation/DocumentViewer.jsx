import React, { useState } from 'react';
import { FileText, Stamp, Calendar, Building, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function DocumentViewer({ documents = [], questionsVerif = [], values = {}, onChange }) {
  const [activeDocIndex, setActiveDocIndex] = useState(0);

  const activeDoc = documents[activeDocIndex] || documents[0];

  const handleOptionSelect = (qId, optionIdx) => {
    if (onChange) {
      onChange({ ...values, [qId]: optionIdx });
    }
  };

  return (
    <div className="space-y-6 text-right font-sans" dir="rtl">
      {/* Barre d'onglets des documents officiels */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slateSubtle-200">
        {documents.map((doc, idx) => {
          const docIdentifier = doc.docId || doc.id || `DOC-${idx + 1}`;
          const isCurrent = activeDocIndex === idx;
          return (
            <button
              key={docIdentifier || idx}
              onClick={() => setActiveDocIndex(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isCurrent
                  ? 'bg-gendarmerie text-white shadow-card ring-2 ring-gold/40'
                  : 'bg-white text-slateSubtle-700 hover:bg-cream-200 border border-slateSubtle-200'
              }`}
            >
              <FileText className={`w-3.5 h-3.5 ${isCurrent ? 'text-gold' : 'text-slate-400'}`} />
              <span>{doc.titreAr?.split(' ')[0] || 'وثيقة'} {docIdentifier}</span>
              <span className="text-[10px] opacity-75 font-normal">({idx + 1}/{documents.length})</span>
            </button>
          );
        })}
      </div>

      {/* Visualiseur de document au style institutionnel de la Gendarmerie Royale */}
      {activeDoc && (
        <div className="relative bg-white rounded-2xl border-2 border-[#153B2B]/20 p-6 md:p-8 shadow-card overflow-hidden">
          {/* Filigrane d'authenticité */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full border-8 border-gold/10 pointer-events-none flex items-center justify-center">
            <span className="text-[10px] text-gold/20 font-bold uppercase tracking-widest -rotate-45">الدرك الملكي</span>
          </div>

          {/* En-tête officiel du document */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b-2 border-gendarmerie/20">
            <div>
              <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-wider mb-1">
                <Stamp className="w-4 h-4" />
                <span>المملكة المغربية • إدارة الدفاع الوطني</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-gendarmerie">
                {activeDoc.titreAr}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slateSubtle-600 mt-1">
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-gendarmerie/70" />
                  {activeDoc.source || activeDoc.auteur || 'الدرك الملكي'}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-gendarmerie/70" />
                  {activeDoc.date || activeDoc.dateHeure || 'محضر رسمي'}
                </span>
              </div>
            </div>

            {/* Cachet officiel */}
            {(activeDoc.tampon || activeDoc.type) && (
              <div className="self-start sm:self-auto px-3 py-1.5 rounded-lg border border-rose-800/40 bg-rose-50/60 text-rose-900 text-[11px] font-bold tracking-wide transform -rotate-1 shadow-2xs">
                {activeDoc.tampon || `صنف: ${activeDoc.type}`}
              </div>
            )}
          </div>

          {/* Corps du document avec typographie juridique soignée */}
          <div className="mt-5 text-sm text-slateSubtle-800 leading-relaxed space-y-3 font-serif bg-cream-50/70 p-5 rounded-xl border border-slateSubtle-200/80">
            <p className="whitespace-pre-line leading-7 selection:bg-gold/30">
              {activeDoc.contenuAr}
            </p>
          </div>
        </div>
      )}

      {/* Questions de vérification de l'analyse documentaire */}
      {questionsVerif && questionsVerif.length > 0 && (
        <div className="bg-white rounded-2xl border border-slateSubtle-200 p-5 md:p-6 space-y-5 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold text-gendarmerie border-b border-slateSubtle-200 pb-2">
            <HelpCircle className="w-4 h-4 text-gold" />
            <span>أسئلة التحقق من الفهم والتدقيق الوثائقي</span>
          </div>

          <div className="space-y-6">
            {questionsVerif.map((q, qIdx) => {
              const options = q.optionsAr || q.options || [];
              return (
                <div key={q.id || qIdx} className="space-y-2.5">
                  <p className="text-xs sm:text-sm font-bold text-gendarmerie">
                    <span className="text-gold font-bold ml-1.5">{qIdx + 1}.</span>
                    {q.questionAr}
                  </p>
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {options.map((opt, optIdx) => {
                      const isSelected = values[q.id] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleOptionSelect(q.id, optIdx)}
                          className={`w-full text-right p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${
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
                          <span className="flex-1">{opt}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
