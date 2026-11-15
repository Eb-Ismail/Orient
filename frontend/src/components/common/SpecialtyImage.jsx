import React, { useState } from 'react';
import { Shield } from 'lucide-react';

export default function SpecialtyImage({
  src,
  fallbackSrc,
  alt = '',
  className = '',
  aspectRatio = 'aspect-video',
  heightClass = 'h-[175px] sm:h-[185px]',
  icon: Icon = Shield,
  badgeText = '',
  title = '',
  arabicTitle = ''
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [triedFallback, setTriedFallback] = useState(false);

  const handleError = () => {
    if (!triedFallback && fallbackSrc && fallbackSrc !== imgSrc) {
      setTriedFallback(true);
      setImgSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div
        className={`w-full ${aspectRatio} ${heightClass} bg-gradient-to-br from-[#091B13] via-[#153B2B] to-[#0E291E] flex flex-col items-center justify-center p-4 text-center text-white relative overflow-hidden border-b border-gold/20 select-none ${className}`}
      >
        <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center border border-gold/40 shadow-xs mb-2">
          <Icon className="w-6 h-6 text-gold" />
        </div>
        {badgeText && (
          <span className="px-2 py-0.5 rounded-full bg-black/40 text-gold-light border border-gold/30 text-[10px] font-mono font-bold mb-1">
            {badgeText}
          </span>
        )}
        {title && (
          <h4 className="text-xs sm:text-sm font-bold text-white font-serif line-clamp-1">
            {title}
          </h4>
        )}
        {arabicTitle && (
          <p className="text-[11px] text-gold-light/90 font-arabic mt-0.5" dir="rtl">
            {arabicTitle}
          </p>
        )}
        <div className="absolute inset-0 bg-radial from-transparent to-black/30 pointer-events-none" />
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={`w-full ${aspectRatio} ${heightClass} object-cover object-center ${className}`}
      loading="lazy"
    />
  );
}

