import React from 'react';

/**
 * Composant de rendu de figures géométriques et schémas vectoriels SVG pour les tests
 * Supporte les matrices logiques progressives et les plans tactiques
 */
export default function VisualMatrix({ type, className = "w-full max-w-md mx-auto" }) {
  if (type === 'MATRIX_2X2_PATTERN') {
    return (
      <div className={`p-4 bg-cream-100 rounded-card border border-slateSubtle-200 ${className}`}>
        <div className="text-xs font-semibold uppercase tracking-wider text-slateSubtle-700 mb-2 text-center">
          Matrice Logique Progressive (2 × 2)
        </div>
        <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-sm select-none">
          {/* Grille 2x2 */}
          <rect x="20" y="10" width="130" height="85" rx="8" fill="#FFFFFF" stroke="#DCE4EA" strokeWidth="2" />
          <rect x="170" y="10" width="130" height="85" rx="8" fill="#FFFFFF" stroke="#DCE4EA" strokeWidth="2" />
          <rect x="20" y="105" width="130" height="85" rx="8" fill="#FFFFFF" stroke="#DCE4EA" strokeWidth="2" />
          <rect x="170" y="105" width="130" height="85" rx="8" fill="#F7F8F5" stroke="#C9A052" strokeWidth="2" strokeDasharray="6 4" />

          {/* Cellule 1 (Haut Gauche) : Cercle évidé avec barre verticale */}
          <circle cx="85" cy="52" r="24" fill="none" stroke="#153B2B" strokeWidth="3" />
          <line x1="85" y1="28" x2="85" y2="76" stroke="#153B2B" strokeWidth="3" />

          {/* Cellule 2 (Haut Droite) : Cercle tourné de 90° avec barre horizontale et point central */}
          <circle cx="235" cy="52" r="24" fill="none" stroke="#153B2B" strokeWidth="3" />
          <line x1="211" y1="52" x2="259" y2="52" stroke="#153B2B" strokeWidth="3" />
          <circle cx="235" cy="52" r="4" fill="#C9A052" />

          {/* Cellule 3 (Bas Gauche) : Carré évidé avec barre verticale */}
          <rect x="63" y="127" width="44" height="44" fill="none" stroke="#153B2B" strokeWidth="3" />
          <line x1="85" y1="127" x2="85" y2="171" stroke="#153B2B" strokeWidth="3" />

          {/* Cellule 4 (Bas Droite) : Question mark '?' */}
          <text x="235" y="158" textAnchor="middle" fontSize="34" fontWeight="bold" fill="#C9A052">?</text>
        </svg>
      </div>
    );
  }

  if (type === 'TACTICAL_ROOM_CLEARING') {
    return (
      <div className={`p-4 bg-cream-100 rounded-card border border-slateSubtle-200 ${className}`}>
        <div className="text-xs font-semibold uppercase tracking-wider text-slateSubtle-700 mb-2 text-center">
          Schéma Tactique de Progression & Vulnérabilité
        </div>
        <svg viewBox="0 0 360 220" className="w-full h-auto drop-shadow-sm select-none">
          {/* Murs du bâtiment */}
          <rect x="30" y="20" width="300" height="180" fill="#FFFFFF" stroke="#153B2B" strokeWidth="3" />
          
          {/* Cloisons intérieures */}
          <line x1="160" y1="20" x2="160" y2="120" stroke="#153B2B" strokeWidth="3" />
          <line x1="160" y1="120" x2="240" y2="120" stroke="#153B2B" strokeWidth="3" />

          {/* Entrée principale */}
          <rect x="70" y="196" width="40" height="8" fill="#F7F8F5" />
          <text x="90" y="214" textAnchor="middle" fontSize="10" fill="#344256" fontWeight="600">ENTRÉE</text>

          {/* Binôme d'intervention (Flèche verte et bouclier) */}
          <circle cx="90" cy="160" r="10" fill="#153B2B" />
          <path d="M90 145 L80 165 L100 165 Z" fill="#C9A052" />
          <text x="90" y="180" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#153B2B">BINÔME A</text>

          {/* Secteurs tactiques */}
          {/* Alpha */}
          <circle cx="90" cy="70" r="16" fill="#F7F8F5" stroke="#153B2B" strokeWidth="1.5" />
          <text x="90" y="75" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#153B2B">ALPHA</text>

          {/* Bravo */}
          <circle cx="260" cy="60" r="16" fill="#F7F8F5" stroke="#C9A052" strokeWidth="1.5" />
          <text x="260" y="65" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#C9A052">BRAVO</text>

          {/* Charlie */}
          <circle cx="90" cy="190" r="14" fill="#F7F8F5" stroke="#DCE4EA" strokeWidth="1.5" />
          <text x="90" y="194" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#344256">CHARLIE</text>

          {/* Delta (Angle mort / Couloir en équerre à droite) */}
          <rect x="230" y="130" width="80" height="50" fill="#FEF2F2" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 2" />
          <circle cx="270" cy="155" r="16" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
          <text x="270" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#B91C1C">DELTA</text>
          <text x="270" y="174" textAnchor="middle" fontSize="8" fill="#DC2626">Angle Mort</text>
        </svg>
      </div>
    );
  }

  // Mini-figures SVG pour options de réponse
  if (type === 'TRIANGLE_UP_FULL') {
    return (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <polygon points="20,6 34,34 6,34" fill="#153B2B" stroke="#153B2B" strokeWidth="2" />
      </svg>
    );
  }

  if (type === 'SQUARE_EMPTY_DOT') {
    return (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <rect x="6" y="6" width="28" height="28" fill="none" stroke="#153B2B" strokeWidth="3" />
        <line x1="6" y1="20" x2="34" y2="20" stroke="#153B2B" strokeWidth="3" />
        <circle cx="20" cy="20" r="3.5" fill="#C9A052" />
      </svg>
    );
  }

  if (type === 'CIRCLE_HATCHED') {
    return (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <circle cx="20" cy="20" r="14" fill="none" stroke="#153B2B" strokeWidth="2" />
        <path d="M20 6 A14 14 0 0 1 34 20 L20 20 Z" fill="#C9A052" />
      </svg>
    );
  }

  if (type === 'DIAMOND_DOUBLE') {
    return (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <polygon points="20,4 36,20 20,36 4,20" fill="#153B2B" />
        <polygon points="20,8 32,20 20,32 8,20" fill="#FFFFFF" />
      </svg>
    );
  }

  return null;
}
