import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  size = 'lg',
  maxWidth,
  width,
  style = {},
  cardClassName = '',
  bodyClassName = '',
  footer = null
}) {
  const sizeMap = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-3xl',
    '2xl': 'max-w-[900px]',
    '3xl': 'max-w-5xl',
    full: 'max-w-6xl',
    evaluation: 'w-[calc(100vw-24px)] sm:w-[min(740px,calc(100vw-32px))] max-w-[740px]'
  };

  const isEvaluation = size === 'evaluation' || size === 'result';
  const resolvedMaxWidth = maxWidth || sizeMap[size] || 'max-w-2xl';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow || '';
        document.body.style.paddingRight = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-hidden"
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop sombre transparent avec flou subtil couvrant tout le viewport */}
      <div
        className="fixed inset-0 bg-[#091B13]/70 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Conteneur de la boîte de dialogue parfaitement centré verticalement et horizontalement */}
      <div
        className={`relative z-10 flex flex-col rounded-2xl bg-white text-left shadow-2xl border border-slateSubtle-200 animate-fade-slide overflow-hidden ${cardClassName} ${
          isEvaluation
            ? 'w-[calc(100vw-24px)] sm:w-[min(740px,calc(100vw-32px))] max-w-[740px]'
            : (resolvedMaxWidth ? `w-[96%] sm:w-[94%] md:w-full ${resolvedMaxWidth}` : '')
        }`}
        style={{
          width: isEvaluation
            ? 'min(740px, calc(100vw - 24px))'
            : (width || undefined),
          maxWidth: isEvaluation ? '740px' : (maxWidth || undefined),
          maxHeight: 'calc(100dvh - 32px)',
          height: 'auto',
          ...style
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête fixe avec bouton de fermeture toujours visible et accessible */}
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200/90 bg-white">
          <div className="min-w-0 pr-3">
            {title && (
              <h3 className="text-base sm:text-lg font-bold text-gendarmerie flex items-center gap-2 truncate">
                <span className="w-1.5 h-4 rounded-full bg-gold inline-block shrink-0" />
                <span className="truncate">{title}</span>
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5 ml-3.5 truncate">
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-xl p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors duration-150 min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
            aria-label="Fermer la fenêtre modale"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corps de la modale avec défilement vertical interne indépendant */}
        <div
          className={`flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain px-4 sm:px-6 py-4 sm:py-5 text-sm leading-relaxed text-slate-800 ${bodyClassName}`}
          style={{ overflowY: 'auto' }}
        >
          {children}
        </div>

        {/* Pied de page fixe si spécifié */}
        {footer && (
          <div className="shrink-0 flex flex-wrap items-center justify-end gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-200/90 bg-slate-50 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
