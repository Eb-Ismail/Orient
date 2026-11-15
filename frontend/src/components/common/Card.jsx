import React from 'react';

export default function Card({
  children,
  title,
  subtitle,
  headerAction,
  className = '',
  bodyClassName = 'p-5 md:p-6',
  footer = null,
  noPadding = false,
  ...props
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/90 shadow-xs transition-colors duration-150 hover:border-slate-300 ${className}`}
      {...props}
    >
      {(title || subtitle || headerAction) && (
        <div className="px-5 py-4 md:px-6 border-b border-slate-200/80 flex items-center justify-between gap-4">
          <div>
            {title && (
              <h3 className="font-bold text-base text-gendarmerie flex items-center gap-2">
                <span className="w-1.5 h-3.5 rounded-full bg-gold inline-block" />
                {title}
              </h3>
            )}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5 ml-3.5">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className={noPadding ? '' : bodyClassName}>
        {children}
      </div>
      {footer && (
        <div className="px-5 py-3.5 md:px-6 bg-slate-50/70 rounded-b-2xl border-t border-slate-200/80 text-xs text-slate-600">
          {footer}
        </div>
      )}
    </div>
  );
}
