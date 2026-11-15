import React from 'react';

export default function ProgressBar({
  currentIndex,
  totalQuestions,
  answeredCount = 0,
  domainName = '',
  onSelectQuestion = null
}) {
  const percentage = totalQuestions > 0 ? Math.round(((currentIndex + 1) / totalQuestions) * 100) : 0;
  const answeredPercentage = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  return (
    <div className="w-full bg-white rounded-2xl border border-slateSubtle-200 p-4 shadow-[0_2px_8px_rgba(21,59,43,0.03)] mb-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gendarmerie bg-cream-100 px-3 py-1 rounded-full border border-gendarmerie/20 flex items-center gap-1.5 shadow-2xs font-serif">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            السؤال {currentIndex + 1} من {totalQuestions}
          </span>
          <span className="text-xs font-medium text-slateSubtle-500 hidden md:inline-block">
            (Question {currentIndex + 1} / {totalQuestions})
          </span>
          {domainName && (
            <span className="text-xs font-medium text-slateSubtle-700 hidden sm:inline-block">
              • {domainName}
            </span>
          )}
        </div>
        <div className="text-xs font-medium text-slateSubtle-700" dir="rtl">
          نسبة التقدم : <strong className="text-gendarmerie font-bold font-mono">{percentage}%</strong>
        </div>
      </div>

      {/* Barre de progression avec accent vert militaire et doré */}
      <div className="relative w-full h-2.5 bg-cream-200/80 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-gendarmerie via-gendarmerie-light to-gold transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Sélecteur direct de questions (puces numérotées cliquables) */}
      {totalQuestions <= 30 && onSelectQuestion && (
        <div className="flex flex-wrap gap-1.5 mt-3.5 pt-3 border-t border-slateSubtle-200 justify-center sm:justify-start">
          {Array.from({ length: totalQuestions }).map((_, idx) => {
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectQuestion(idx)}
                className={`w-8 h-8 text-xs font-bold rounded-xl transition-all duration-150 flex items-center justify-center cursor-pointer ${
                  isCurrent
                    ? 'bg-gendarmerie text-white ring-2 ring-gold/80 shadow-xs scale-105'
                    : 'bg-cream-100 text-slateSubtle-700 border border-slateSubtle-200 hover:bg-cream-200 hover:border-gold/50'
                }`}
                title={`Aller à la question ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
