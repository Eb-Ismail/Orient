import React from 'react';
import OptionItem from './OptionItem.jsx';
import VisualMatrix from './VisualMatrix.jsx';
import { HelpCircle, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export default function QuestionCard({
  question,
  selectedOptionId,
  onSelectOption,
  writtenAnswer = '',
  onWrittenAnswerChange,
  disabled = false
}) {
  if (!question) return null;

  const isSubjective = question.TypeQuestion === 'QUESTION_SUBJECTIVE';

  const difficultyColors = {
    FACILE: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    MOYEN: 'bg-amber-50 text-amber-800 border-amber-200',
    AVANCE: 'bg-gold-subtle text-gold-dark border-gold/40',
    EXPERT: 'bg-rose-50 text-rose-800 border-rose-200',
  };

  const isArabic = /[\u0600-\u06FF]/.test(question.Enonce || '');

  return (
    <div className="bg-white rounded-2xl border border-slateSubtle-200 shadow-[0_4px_20px_rgba(21,59,43,0.04)] p-4 sm:p-6 md:p-8 animate-fade-slide">
      {/* En-tête de la question : Catégorie & Difficulté */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 mb-6 border-b border-slateSubtle-200">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cream-100 text-gendarmerie border border-gendarmerie/20 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            {question.DomaineIntitule || question.DomaineCode}
          </span>
          <span className="text-xs font-semibold text-slateSubtle-600 hidden sm:inline font-mono">
            Réf: {question.Code}
          </span>
          {isArabic && (
            <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
              بنك الأسئلة باللغة العربية
            </span>
          )}
          {isSubjective && (
            <span className="text-xs font-bold bg-amber-50 text-amber-900 px-3 py-1 rounded-full border border-amber-200">
              Rédaction Opérationnelle
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {question.Difficulte && (
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${difficultyColors[question.Difficulte] || 'bg-cream-100 text-slateSubtle-700'}`}>
              {question.Difficulte}
            </span>
          )}
          <span className="text-xs font-bold text-slateSubtle-700 bg-cream-100 px-3 py-1 rounded-full border border-slateSubtle-200">
            {question.Points || 1} pt{(question.Points || 1) > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Contexte situationnel si question de mise en situation professionnelle */}
      {question.ContexteSituationnel && (
        <div
          dir={isArabic ? 'rtl' : 'ltr'}
          className={`mb-6 p-4 bg-cream-100/70 rounded-xl border border-slateSubtle-200 ${isArabic ? 'border-r-4 border-r-gold text-right' : 'border-l-4 border-l-gold text-left'} text-xs md:text-sm text-slateSubtle-800 leading-relaxed shadow-2xs`}
        >
          <strong className={`text-gendarmerie font-semibold flex items-center gap-1.5 mb-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <FileText className="w-4 h-4 text-gold" />
            {isArabic ? 'سياق الوضعية العملياتية :' : 'Mise en situation opérationnelle :'}
          </strong>
          {question.ContexteSituationnel}
        </div>
      )}

      {/* Énoncé principal de la question */}
      <h2
        dir={isArabic ? 'rtl' : 'ltr'}
        className={`text-lg md:text-xl font-bold text-gendarmerie leading-snug mb-6 ${isArabic ? 'text-right' : 'text-left'}`}
      >
        {question.Enonce}
      </h2>

      {/* Schéma visuel SVG si applicable (Matrice progressive ou Plan tactique) */}
      {question.SchemaSVG && (
        <div className="mb-8">
          <VisualMatrix type={question.SchemaSVG} />
        </div>
      )}

      {/* Rendu spécifique : Question Subjective Rédactionnelle vs QCM */}
      {isSubjective ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slateSubtle-700">
            <span className="font-semibold flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-gold" />
              Rédigez votre analyse et décision tactique :
            </span>
            <span className="text-[11px] text-slateSubtle-500">
              {writtenAnswer ? `${writtenAnswer.length} caractères` : 'En attente de rédaction'}
            </span>
          </div>

          <textarea
            rows={6}
            disabled={disabled}
            value={writtenAnswer}
            onChange={(e) => onWrittenAnswerChange && onWrittenAnswerChange(e.target.value)}
            placeholder="Exprimez votre décision opérationnelle en précisant les mesures de sécurité prises, les motifs légaux et la coordination avec le commandement..."
            className="w-full text-xs md:text-sm p-4 border border-slateSubtle-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-gendarmerie bg-white leading-relaxed font-sans text-slateSubtle-800"
          />

          {question.BaremeSubjectif?.criteres && (
            <div className="p-3 bg-cream-100 rounded-lg border border-slateSubtle-200 text-xs space-y-1">
              <span className="font-bold text-gendarmerie block uppercase text-[10px] tracking-wider">
                Critères pris en compte pour l'évaluation par l'examinateur :
              </span>
              <ul className="list-disc pl-4 space-y-0.5 text-slateSubtle-700 text-[11px]">
                {question.BaremeSubjectif.criteres.map((c, i) => (
                  <li key={i}>{c.nom}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        /* Choix des réponses cliquables (Grid responsive) */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {question.Options?.map((option) => (
            <OptionItem
              key={option.OptionId}
              option={option}
              isSelected={selectedOptionId === option.OptionId}
              onSelect={onSelectOption}
              disabled={disabled}
            />
          ))}
        </div>
      )}
    </div>
  );
}
