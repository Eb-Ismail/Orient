import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'gold' | 'outline' | 'danger' | 'ghost'
  size = 'md', // 'xs' | 'sm' | 'md' | 'lg'
  loading = false,
  disabled = false,
  fullWidth = false,
  icon: Icon = null,
  iconPosition = 'left',
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 ease-out rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:shadow-none select-none active:scale-[0.98]';

  const sizeStyles = {
    xs: 'text-[11px] px-2.5 py-1 gap-1.5 font-medium',
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 font-medium',
    md: 'text-xs md:text-sm px-4 py-2.5 gap-2 font-medium',
    lg: 'text-sm md:text-base px-6 py-3 gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary: 'bg-gendarmerie hover:bg-gendarmerie-dark text-white shadow-sm hover:shadow focus:ring-gold/50',
    secondary: 'bg-gendarmerie-light hover:bg-gendarmerie text-white shadow-sm hover:shadow focus:ring-gold/50',
    gold: 'bg-gold hover:bg-gold-dark text-white font-semibold shadow-sm hover:shadow-gold-glow focus:ring-gold/50',
    outline: 'border border-slateSubtle-200 bg-white hover:bg-cream-100 hover:border-slateSubtle-300 text-slateSubtle-800 focus:ring-gold/40',
    danger: 'bg-rose-700 hover:bg-rose-800 text-white shadow-sm focus:ring-rose-600',
    ghost: 'text-slateSubtle-700 hover:bg-cream-100 hover:text-gendarmerie focus:ring-gold/40',
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin flex-shrink-0 text-current" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <Icon className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-105" />
          )}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && (
            <Icon className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
          )}
        </>
      )}
    </button>
  );
}
