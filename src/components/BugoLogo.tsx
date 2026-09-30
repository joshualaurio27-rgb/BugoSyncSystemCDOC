import React from 'react';

interface BugoLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * Exact Official Seal Emblem of Bugo Sangguniang Barangay (Bugo, Cagayan de Oro City)
 * Recreated with exact colors, typography, factory chimneys, bay sailboat, gear teeth, and silver rosette.
 */
export const BugoSealEmblem: React.FC<{ sizePx?: number; className?: string }> = ({ sizePx = 48, className = '' }) => {
  return (
    <svg
      width={sizePx}
      height={sizePx}
      viewBox="0 0 200 200"
      className={`select-none flex-shrink-0 drop-shadow-sm ${className}`}
      aria-label="Official Seal of Barangay Bugo, Cagayan de Oro City"
    >
      <defs>
        {/* Curving text paths matching exact geometry */}
        <path id="sealTopArc1" d="M 22,100 A 78,78 0 0,1 178,100" fill="none" />
        <path id="sealTopArc2" d="M 38,100 A 62,62 0 0,1 162,100" fill="none" />

        {/* Gradients */}
        <radialGradient id="silverPearlGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#e2e8f0" />
          <stop offset="70%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </radialGradient>

        <linearGradient id="yellowGearFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff04d" />
          <stop offset="100%" stopColor="#ffd600" />
        </linearGradient>

        <linearGradient id="hillGreenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="50%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
      </defs>

      {/* Outer White Base Disk with Strong Royal Blue Border */}
      <circle cx="100" cy="100" r="95" fill="#ffffff" stroke="#002a88" strokeWidth="8" />

      {/* Arched Text 1: BUGO SANGUNIANG BARANGAY */}
      <text
        fill="#002a88"
        fontSize="12.5"
        fontWeight="900"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="1.8"
      >
        <textPath href="#sealTopArc1" startOffset="50%" textAnchor="middle">
          BUGO SANGUNIANG BARANGAY
        </textPath>
      </text>

      {/* Arched Text 2: BUGO, CAGAYAN DE ORO CITY */}
      <text
        fill="#002a88"
        fontSize="8.5"
        fontWeight="900"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="1.2"
      >
        <textPath href="#sealTopArc2" startOffset="50%" textAnchor="middle">
          BUGO, CAGAYAN DE ORO CITY
        </textPath>
      </text>

      {/* Clip path for the central inner landscape */}
      <g>
        {/* Background Green Hills */}
        <path
          d="M 50,75 Q 85,55 120,68 T 160,78 L 160,120 L 50,120 Z"
          fill="url(#hillGreenGrad)"
        />
        <path
          d="M 100,68 Q 130,62 165,72 L 165,115 L 100,115 Z"
          fill="#166534"
          opacity="0.8"
        />

        {/* Shore / Bay Area (Macajalar Bay) */}
        <path
          d="M 90,105 C 105,95 125,112 145,108 C 155,105 160,115 160,120 L 90,120 Z"
          fill="#38bdf8"
        />
        <path
          d="M 95,112 C 110,108 128,118 140,115 L 140,120 L 95,120 Z"
          fill="#0284c7"
        />

        {/* White & Blue Sailboat (Banca) */}
        <g transform="translate(106, 80) scale(0.7)">
          {/* Sail */}
          <path
            d="M 18,36 Q 28,12 32,2 Q 35,16 38,36 Z"
            fill="#ffffff"
            stroke="#64748b"
            strokeWidth="0.8"
          />
          {/* Hull */}
          <path
            d="M 12,36 Q 28,42 44,36 L 40,40 Q 28,44 16,40 Z"
            fill="#0284c7"
          />
          <line x1="32" y1="2" x2="32" y2="36" stroke="#475569" strokeWidth="1.2" />
        </g>

        {/* Right side plantation / dense vertical sugar/pineapple crops */}
        <g transform="translate(126, 84)">
          <path
            d="M 0,22 L 2,0 L 4,22 M 5,22 L 7,2 L 9,22 M 10,22 L 12,4 L 14,22 M 15,22 L 17,1 L 19,22 M 20,22 L 22,5 L 24,22 M 25,22 L 27,2 L 29,22 M 30,22 L 32,4 L 34,22"
            stroke="#22c55e"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>

        {/* Industrial Complex & 3 Chimneys (Del Monte / Bugo Industry) */}
        <g transform="translate(50, 65)">
          {/* Smoke rising from rightmost chimney */}
          <path
            d="M 45,5 Q 52,-8 44,-16 Q 36,-24 48,-32 Q 55,-38 52,-45"
            fill="none"
            stroke="#475569"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="2 2"
            opacity="0.85"
          />

          {/* Factory building silhouette */}
          <path
            d="M 2,42 L 2,26 L 15,16 L 27,26 L 27,42 Z"
            fill="#000000"
          />
          <rect x="25" y="22" width="28" height="20" fill="#000000" />
          
          {/* Angle roof slants */}
          <polygon points="2,26 12,18 20,24 20,26" fill="#1e293b" />
          <polygon points="2,32 18,22 18,25 2,35" fill="#334155" />
          <polygon points="2,38 18,28 18,31 2,41" fill="#334155" />

          {/* 3 Prominent Tall Chimneys */}
          <rect x="27" y="6" width="4.5" height="18" fill="#000000" rx="0.5" />
          <rect x="35" y="4" width="4.5" height="20" fill="#000000" rx="0.5" />
          <rect x="43" y="1" width="4.5" height="23" fill="#000000" rx="0.5" />
        </g>
      </g>

      {/* Large Yellow Gear Wheel at Bottom */}
      <g transform="translate(100, 100)">
        {/* Yellow Gear Arc Background */}
        <path
          d="M -75,8 A 75,75 0 0,0 75,8 L 62,-2 A 62,62 0 0,1 -62,-2 Z"
          fill="url(#yellowGearFill)"
        />
        <path
          d="M -75,8 A 75,75 0 0,0 75,8 L 0,68 Z"
          fill="url(#yellowGearFill)"
        />

        {/* Black Outer Gear Teeth along the perimeter */}
        <g fill="#000000">
          {/* Left side teeth */}
          <polygon points="-78,-2 -70,-1 -64,12 -73,15" />
          <polygon points="-72,18 -63,16 -54,28 -64,32" />
          <polygon points="-62,35 -52,31 -41,43 -52,48" />
          <polygon points="-48,51 -39,44 -26,56 -37,62" />
          
          {/* Center-bottom teeth */}
          <polygon points="-30,64 -22,55 -8,66 -16,73" />
          <polygon points="-10,74 -4,64 12,64 6,74" />
          <polygon points="10,74 18,65 31,54 23,45" />

          {/* Right side teeth */}
          <polygon points="34,60 24,53 37,41 47,48" />
          <polygon points="49,49 40,41 51,29 60,36" />
          <polygon points="62,34 52,27 61,15 70,20" />
          <polygon points="71,17 63,10 70,-1 78,3" />
        </g>

        {/* Sunburst Black Triangle Notches inside the yellow gear */}
        <g fill="#000000">
          <polygon points="-65,10 -58,0 -50,12" />
          <polygon points="-48,22 -40,10 -32,24" />
          <polygon points="-28,34 -18,22 -10,36" />
          <polygon points="10,36 18,22 28,34" />
          <polygon points="32,24 40,10 48,22" />
          <polygon points="50,12 58,0 65,10" />
        </g>
      </g>

      {/* Silver Beaded Garland / Rosette in the Center */}
      <g transform="translate(100, 100)">
        {/* Center Rosette Cluster of Silver Pearls */}
        <g>
          {/* Center pearl */}
          <circle cx="0" cy="32" r="5.5" fill="url(#silverPearlGrad)" stroke="#334155" strokeWidth="0.6" />

          {/* Inner ring of pearls */}
          <circle cx="-8" cy="27" r="4.8" fill="url(#silverPearlGrad)" stroke="#334155" strokeWidth="0.5" />
          <circle cx="8" cy="27" r="4.8" fill="url(#silverPearlGrad)" stroke="#334155" strokeWidth="0.5" />
          <circle cx="-10" cy="37" r="4.8" fill="url(#silverPearlGrad)" stroke="#334155" strokeWidth="0.5" />
          <circle cx="10" cy="37" r="4.8" fill="url(#silverPearlGrad)" stroke="#334155" strokeWidth="0.5" />
          <circle cx="-5" cy="46" r="4.5" fill="url(#silverPearlGrad)" stroke="#334155" strokeWidth="0.5" />
          <circle cx="5" cy="46" r="4.5" fill="url(#silverPearlGrad)" stroke="#334155" strokeWidth="0.5" />
          <circle cx="0" cy="20" r="4.5" fill="url(#silverPearlGrad)" stroke="#334155" strokeWidth="0.5" />
          <circle cx="0" cy="44" r="4.2" fill="url(#silverPearlGrad)" stroke="#334155" strokeWidth="0.5" />

          {/* Outer cluster pearls */}
          <circle cx="-13" cy="31" r="4" fill="url(#silverPearlGrad)" stroke="#334155" strokeWidth="0.5" />
          <circle cx="13" cy="31" r="4" fill="url(#silverPearlGrad)" stroke="#334155" strokeWidth="0.5" />
        </g>

        {/* Left Beaded Arm ascending upwards */}
        <g>
          <circle cx="-18" cy="22" r="4.2" fill="url(#silverPearlGrad)" stroke="#334155" strokeWidth="0.5" />
          <circle cx="-27" cy="14" r="4.2" fill="url(#silverPearlGrad)" stroke="#334155" strokeWidth="0.5" />
          <circle cx="-37" cy="7" r="4.2" fill="url(#silverPearlGrad)" stroke="#334155" strokeWidth="0.5" />
          <circle cx="-47" cy="0" r="4.2" fill="url(#silverPearlGrad)" stroke="#334155" strokeWidth="0.5" />
          <circle cx="-56" cy="-8" r="4.2" fill="url(#silverPearlGrad)" stroke="#334155" strokeWidth="0.5" />
        </g>

        {/* Right Beaded Arm ascending upwards */}
        <g>
          <circle cx="18" cy="22" r="4.2" fill="url(#silverPearlGrad)" stroke="#334155" strokeWidth="0.5" />
          <circle cx="27" cy="14" r="4.2" fill="url(#silverPearlGrad)" stroke="#334155" strokeWidth="0.5" />
          <circle cx="37" cy="7" r="4.2" fill="url(#silverPearlGrad)" stroke="#334155" strokeWidth="0.5" />
          <circle cx="47" cy="0" r="4.2" fill="url(#silverPearlGrad)" stroke="#334155" strokeWidth="0.5" />
          <circle cx="56" cy="-8" r="4.2" fill="url(#silverPearlGrad)" stroke="#334155" strokeWidth="0.5" />
        </g>
      </g>
    </svg>
  );
};

export const BugoLogo: React.FC<BugoLogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '', 
  onClick 
}) => {
  const pixelSize = 
    size === 'xs' ? 24 : 
    size === 'sm' ? 34 : 
    size === 'lg' ? 52 : 
    size === 'xl' ? 96 : 
    size === '2xl' ? 130 : 42;

  const titleSize = 
    size === 'xs' ? 'text-xs' : 
    size === 'sm' ? 'text-sm' : 
    size === 'lg' ? 'text-lg' : 
    size === 'xl' ? 'text-2xl' : 
    size === '2xl' ? 'text-3xl' : 'text-base';

  const subSize = 
    size === 'xs' ? 'text-[7px]' : 
    size === 'sm' ? 'text-[8px]' : 
    size === 'lg' ? 'text-[10px]' : 
    size === 'xl' ? 'text-xs' : 
    size === '2xl' ? 'text-sm' : 'text-[9px]';

  return (
    <div 
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <BugoSealEmblem sizePx={pixelSize} />
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-extrabold text-[#0c532b] tracking-tight ${titleSize}`}>
            Bugo Sync List
          </span>
          <span className={`font-bold text-gray-500 uppercase tracking-wider ${subSize}`}>
            Barangay Bugo Portal
          </span>
        </div>
      )}
    </div>
  );
};
