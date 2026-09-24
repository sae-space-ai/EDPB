import React from 'react';

export const EUAIIcon: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    {/* Fondo azul UE */}
    <rect width="100" height="100" rx="12" fill="#003399"/>
    
    {/* Estrellas de la UE en círculo */}
    <g fill="#FFCC00">
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 - 90) * Math.PI / 180;
        const x = 50 + 32 * Math.cos(angle);
        const y = 50 + 32 * Math.sin(angle);
        return (
          <polygon
            key={i}
            points={`${x},${y-4} ${x+1.2},${y-1.2} ${x+4},${y-1.2} ${x+1.8},${y+0.5} ${x+2.6},${y+3.2} ${x},${y+1.5} ${x-2.6},${y+3.2} ${x-1.8},${y+0.5} ${x-4},${y-1.2} ${x-1.2},${y-1.2}`}
          />
        );
      })}
    </g>
    
    {/* Texto AI en el centro */}
    <text x="50" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="bold" fontFamily="Arial, sans-serif">AI</text>
    
    {/* Pequeño indicador de confianza */}
    <circle cx="78" cy="22" r="8" fill="#FFCC00"/>
    <text x="78" y="26" textAnchor="middle" fill="#003399" fontSize="10" fontWeight="bold">✓</text>
  </svg>
);

export const EUAIIconLarge: React.FC = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="euGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#003399"/>
        <stop offset="100%" stopColor="#0044cc"/>
      </linearGradient>
      <filter id="shadow">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Fondo con gradiente */}
    <rect width="120" height="120" rx="16" fill="url(#euGradient)" filter="url(#shadow)"/>
    
    {/* 12 Estrellas de la UE */}
    <g fill="#FFCC00">
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 - 90) * Math.PI / 180;
        const x = 60 + 40 * Math.cos(angle);
        const y = 60 + 40 * Math.sin(angle);
        return (
          <polygon
            key={i}
            points={`${x},${y-5} ${x+1.5},${y-1.5} ${x+5},${y-1.5} ${x+2.2},${y+0.6} ${x+3.2},${y+4} ${x},${y+1.8} ${x-3.2},${y+4} ${x-2.2},${y+0.6} ${x-5},${y-1.5} ${x-1.5},${y-1.5}`}
          />
        );
      })}
    </g>
    
    {/* Texto AI Act en el centro */}
    <text x="60" y="55" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold" fontFamily="Arial, sans-serif">EU</text>
    <text x="60" y="75" textAnchor="middle" fill="#FFCC00" fontSize="20" fontWeight="bold" fontFamily="Arial, sans-serif">AI Act</text>
    
    {/* Badge de conformidad */}
    <g transform="translate(95, 15)">
      <circle r="12" fill="#FFCC00"/>
      <text x="0" y="5" textAnchor="middle" fill="#003399" fontSize="14" fontWeight="bold">✓</text>
    </g>
  </svg>
);

export default EUAIIcon;
