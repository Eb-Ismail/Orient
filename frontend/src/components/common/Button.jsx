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
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 ease-out rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:shadow-none select-none active:scale-[0.98] cursor-pointer';

  const sizeStyles = {
    xs: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
    sm: 'text-xs px-3.5 py-2 gap-1.5 font-bold',
    md: 'text-sm px-4 py-2.5 gap-2 font-bold',
    lg: 'text-base px-6 py-3 gap-2.5 font-bold',
  };

  const variantStyles = {
    primary: 'bg-[#153B2B] hover:bg-[#1A4533] text-white shadow-xs focus:ring-[#153B2B]/40',
    secondary: 'bg-[#1C4E39] hover:bg-[#153B2B] text-white shadow-xs focus:ring-[#153B2B]/40',
    gold: 'bg-[#C9A052] hover:bg-[#B38C42] text-white font-bold shadow-xs focus:ring-gold/50',
    outline: 'border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 focus:ring-gold/40',
    danger: 'bg-rose-700 hover:bg-rose-800 text-white shadow-xs focus:ring-rose-600',
    ghost: 'text-slate-700 hover:bg-slate-100 hover:text-[#153B2B] focus:ring-gold/40',
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
