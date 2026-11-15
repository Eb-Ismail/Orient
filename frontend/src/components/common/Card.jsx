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
      className={`bg-white rounded-xl border border-slateSubtle-200 shadow-[0_1px_3px_0_rgba(21,59,43,0.04),0_1px_2px_0_rgba(0,0,0,0.02)] transition-all duration-200 ease-out hover:border-slateSubtle-300 ${className}`}
      {...props}
    >
      {(title || subtitle || headerAction) && (
        <div className="px-5 py-4 md:px-6 border-b border-slateSubtle-200 flex items-center justify-between gap-4">
          <div>
            {title && (
              <h3 className="font-semibold text-base text-gendarmerie flex items-center gap-2">
                <span className="w-1.5 h-3.5 rounded-full bg-gold inline-block" />
                {title}
              </h3>
            )}
            {subtitle && <p className="text-xs text-slateSubtle-700 mt-0.5 ml-3.5">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className={noPadding ? '' : bodyClassName}>
        {children}
      </div>
      {footer && (
        <div className="px-5 py-3.5 md:px-6 bg-cream-100/70 rounded-b-xl border-t border-slateSubtle-200 text-xs">
          {footer}
        </div>
      )}
    </div>
  );
}
