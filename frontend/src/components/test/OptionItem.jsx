import React from 'react';
import { Check } from 'lucide-react';
import VisualMatrix from './VisualMatrix.jsx';

export default function OptionItem({
  option,
  isSelected,
  onSelect,
  disabled = false
}) {
  const isArabic = /[\u0600-\u06FF]/.test(option?.EnonceOption || '');

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={() => !disabled && onSelect(option.OptionId)}
      onKeyDown={(e) => {
        if ((e.key === ' ' || e.key === 'Enter') && !disabled) {
          e.preventDefault();
          onSelect(option.OptionId);
        }
      }}
      className={`test-option-card group ${isSelected ? 'selected' : ''} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} flex items-center justify-between gap-2`}
    >
      {/* Badge Lettre (A, B, C, D et أ، ب، ج، د) */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors mr-3 border ${
          isSelected
            ? 'bg-gendarmerie text-white border-gendarmerie shadow-sm'
            : 'bg-cream-100 text-slateSubtle-700 border-slateSubtle-200 group-hover:border-gold group-hover:text-gendarmerie'
        }`}
      >
        {isSelected ? (
          <Check className="w-5 h-5 stroke-[2.5]" />
        ) : (
          <span className="flex items-center gap-0.5">
            <span>{option.LettreOption}</span>
            {option.LettreArabe && <span className="text-[10px] opacity-75 font-serif">/{option.LettreArabe}</span>}
          </span>
        )}
      </div>

      {/* Contenu de l'option (Texte ou Figure SVG) */}
      <div dir={isArabic ? 'rtl' : 'ltr'} className={`flex-1 min-w-0 pr-2 ${isArabic ? 'text-right' : 'text-left'}`}>
        {option.SchemaSVG && (
          <div className="mb-1">
            <VisualMatrix type={option.SchemaSVG} />
          </div>
        )}
        <span className={`text-sm md:text-base leading-snug transition-colors ${
          isSelected ? 'font-semibold text-gendarmerie' : 'text-slateSubtle-800'
        }`}>
          {option.EnonceOption}
        </span>
      </div>

      {/* Indicateur radio visuel discret */}
      <div className="flex-shrink-0 ml-2">
        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
            isSelected
              ? 'border-gendarmerie bg-gendarmerie text-white'
              : 'border-slateSubtle-200 bg-white group-hover:border-gold'
          }`}
        >
          {isSelected && <div className="w-2 h-2 rounded-full bg-gold" />}
        </div>
      </div>
    </div>
  );
}
