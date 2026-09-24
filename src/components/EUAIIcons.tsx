import React from 'react';

/**
 * Iconos Oficiales EU AI Act Art. 50(4)
 * 4 variantes para marcado de contenido IA
 * Basados en: https://ec.europa.eu/newsroom/dae/redirection/document/129546
 */

// Variante 1: AI blanco sobre negro - marcado general
export const EUAIIcon_WhiteOnBlack: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Contenido generado con IA">
    <rect width="100" height="100" fill="#000000"/>
    <text x="50" y="65" textAnchor="middle" fill="#FFFFFF" fontSize="48" fontWeight="bold" fontFamily="Arial, sans-serif">AI</text>
  </svg>
);

// Variante 2: AI negro sobre blanco - marcado general alternativo
export const EUAIIcon_BlackOnWhite: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Contenido generado con IA">
    <rect width="100" height="100" fill="#FFFFFF" stroke="#000000" strokeWidth="2"/>
    <text x="50" y="65" textAnchor="middle" fill="#000000" fontSize="48" fontWeight="bold" fontFamily="Arial, sans-serif">AI</text>
  </svg>
);

// Variante 3: AI blanco 50% transparencia - marcado sutil
export const EUAIIcon_WhiteTransparent: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Contenido generado con IA">
    <rect width="100" height="100" fill="#000000" opacity="0.5"/>
    <text x="50" y="65" textAnchor="middle" fill="#FFFFFF" fontSize="48" fontWeight="bold" fontFamily="Arial, sans-serif">AI</text>
  </svg>
);

// Variante 4: AI negro 50% transparencia - marcado sutil alternativo
export const EUAIIcon_BlackTransparent: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Contenido generado con IA">
    <rect width="100" height="100" fill="#FFFFFF" opacity="0.5" stroke="#000000" strokeWidth="2" strokeOpacity="0.5"/>
    <text x="50" y="65" textAnchor="middle" fill="#000000" fontSize="48" fontWeight="bold" fontFamily="Arial, sans-serif" opacity="0.5">AI</text>
  </svg>
);

// Icono combinado UE + AI Act (para header)
export const EUAIActBadge: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="EU AI Act Compliant">
    <defs>
      <linearGradient id="euBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#003399"/>
        <stop offset="100%" stopColor="#0044cc"/>
      </linearGradient>
    </defs>
    
    {/* Fondo azul UE */}
    <rect width="120" height="120" rx="16" fill="url(#euBlueGrad)"/>
    
    {/* 12 Estrellas de la UE */}
    <g fill="#FFCC00">
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 - 90) * Math.PI / 180;
        const x = 60 + 42 * Math.cos(angle);
        const y = 60 + 42 * Math.sin(angle);
        return (
          <polygon
            key={i}
            points={`${x},${y-5} ${x+1.5},${y-1.5} ${x+5},${y-1.5} ${x+2.2},${y+0.6} ${x+3.2},${y+4} ${x},${y+1.8} ${x-3.2},${y+4} ${x-2.2},${y+0.6} ${x-5},${y-1.5} ${x-1.5},${y-1.5}`}
          />
        );
      })}
    </g>
    
    {/* Texto EU AI Act */}
    <text x="60" y="55" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif">EU</text>
    <text x="60" y="78" textAnchor="middle" fill="#FFCC00" fontSize="18" fontWeight="bold" fontFamily="Arial, sans-serif">AI Act</text>
    
    {/* Badge de conformidad */}
    <g transform="translate(100, 20)">
      <circle r="14" fill="#FFCC00"/>
      <text x="0" y="5" textAnchor="middle" fill="#003399" fontSize="16" fontWeight="bold">✓</text>
    </g>
  </svg>
);

// Icono MVP Badge
export const MVPBadge: React.FC<{ size?: number }> = ({ size = 60 }) => (
  <svg width={size} height={size * 0.4} viewBox="0 0 150 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mvpGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFD700"/>
        <stop offset="100%" stopColor="#FFA500"/>
      </linearGradient>
    </defs>
    <rect width="150" height="60" rx="8" fill="url(#mvpGrad)"/>
    <text x="75" y="25" textAnchor="middle" fill="#000000" fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif">⚡ MVP</text>
    <text x="75" y="45" textAnchor="middle" fill="#000000" fontSize="10" fontFamily="Arial, sans-serif">Fast-track candidate</text>
  </svg>
);

// Footer con iconos EU AI
export const EUAIActFooter: React.FC = () => (
  <div className="flex items-center gap-3 text-xs text-gray-600">
    <EUAIIcon_BlackOnWhite size={24} />
    <div>
      <div className="font-medium">Contenido generado con IA</div>
      <div className="text-gray-500">EU AI Act Art. 50(4) · Los iconos indican uso de IA. No constituyen certificación de conformidad.</div>
    </div>
  </div>
);

export default {
  EUAIIcon_WhiteOnBlack,
  EUAIIcon_BlackOnWhite,
  EUAIIcon_WhiteTransparent,
  EUAIIcon_BlackTransparent,
  EUAIActBadge,
  MVPBadge,
  EUAIActFooter
};
