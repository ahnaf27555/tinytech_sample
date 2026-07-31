import React from 'react';

interface DoodleLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showDoodles?: boolean;
}

export const DoodleLogo: React.FC<DoodleLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  // Size mapping for SVG height
  const heightMap = {
    sm: 'h-11 sm:h-12 md:h-14',
    md: 'h-16 sm:h-20',
    lg: 'h-24 sm:h-28',
    hero: 'h-32 sm:h-40 md:h-48'
  };

  const selectedHeight = heightMap[size] || heightMap.md;

  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 560 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${selectedHeight} w-auto object-contain transition-transform group-hover:scale-[1.02] duration-200`}
      >
        {/* 1. KEYBOARD BACKDROP GRID (Grey keycaps) */}
        <g id="keyboard-grid" opacity="0.85">
          {/* Row 1 (11 Keycaps) */}
          {[120, 146, 172, 198, 224, 250, 276, 302, 328, 354, 380].map((x, i) => (
            <rect key={`r1-${i}`} x={x} y={88} width={22} height={20} rx={3.5} fill="#E2E2E0" stroke="#CCCCCC" strokeWidth="0.8" />
          ))}
          {/* Row 2 (12 Keycaps) */}
          {[112, 138, 164, 190, 216, 242, 268, 294, 320, 346, 372, 398].map((x, i) => (
            <rect key={`r2-${i}`} x={x} y={112} width={22} height={20} rx={3.5} fill="#E2E2E0" stroke="#CCCCCC" strokeWidth="0.8" />
          ))}
          {/* Row 3 (11 Keycaps) */}
          {[120, 146, 172, 198, 224, 250, 276, 302, 328, 354, 380].map((x, i) => (
            <rect key={`r3-${i}`} x={x} y={136} width={22} height={20} rx={3.5} fill="#E2E2E0" stroke="#CCCCCC" strokeWidth="0.8" />
          ))}
        </g>

        {/* 2. CALLIGRAPHIC SCRIPT TEXT "TinyTech" */}
        <text
          x="268"
          y="136"
          textAnchor="middle"
          fill="#1C1A17"
          style={{
            fontFamily: "'Caveat', 'Dancing Script', 'Brush Script MT', cursive",
            fontSize: "66px",
            fontWeight: "700",
            letterSpacing: "0.5px"
          }}
        >
          TinyTech
        </text>

        {/* 3. LEFT SIDE DOODLES */}
        {/* Coiled Cable leading to Mouse */}
        <path
          d="M 140 68 C 100 20, 30 50, 42 90 C 48 105, 78 108, 102 98"
          stroke="#1C1A17"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Computer Mouse */}
        <g id="mouse">
          <path
            d="M 102 98 C 102 85, 130 80, 140 95 C 148 108, 132 124, 116 116 C 102 110, 102 102, 102 98 Z"
            fill="#FAF8F5"
            stroke="#1C1A17"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Scroll Wheel */}
          <line x1="120" y1="88" x2="116" y2="98" stroke="#1C1A17" strokeWidth="2" />
          <rect x="115" y="91" width="4" height="7" rx="1.5" fill="#1C1A17" />
        </g>

        {/* Tiny Stick Figure Sitting on top left wire */}
        <g id="figure-on-wire">
          <circle cx="86" cy="38" r="4" fill="#FAF8F5" stroke="#1C1A17" strokeWidth="1.8" />
          {/* Body & Arms */}
          <path d="M 86 42 L 86 52 M 86 46 L 80 43 M 86 46 L 92 43 M 86 52 L 81 58 M 86 52 L 91 58" stroke="#1C1A17" strokeWidth="1.8" strokeLinecap="round" />
          {/* Device in hand */}
          <rect x="76" y="39" width="6" height="8" rx="1" fill="#FAF8F5" stroke="#1C1A17" strokeWidth="1.2" />
        </g>

        {/* Gamepad Controller (Bottom Left) */}
        <g id="gamepad">
          <path
            d="M 38 132 C 48 118, 100 118, 110 132 C 122 148, 114 186, 96 182 C 84 180, 78 160, 74 160 C 70 160, 64 180, 52 182 C 34 186, 26 148, 38 132 Z"
            fill="#FAF8F5"
            stroke="#1C1A17"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          {/* D-Pad */}
          <path d="M 52 142 L 52 156 M 45 149 L 59 149" stroke="#1C1A17" strokeWidth="3" strokeLinecap="round" />
          {/* Action Buttons */}
          <circle cx="94" cy="142" r="2.5" fill="#1C1A17" />
          <circle cx="102" cy="150" r="2.5" fill="#1C1A17" />
          <circle cx="86" cy="150" r="2.5" fill="#1C1A17" />
          <circle cx="94" cy="158" r="2.5" fill="#1C1A17" />

          {/* Stick Figure sitting on controller handle */}
          <circle cx="71" cy="116" r="4" fill="#FAF8F5" stroke="#1C1A17" strokeWidth="1.8" />
          <path d="M 71 120 L 71 128 M 71 123 L 66 126 M 71 123 L 76 126 M 71 128 L 67 134 M 71 128 L 75 134" stroke="#1C1A17" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* 4. TOP DOODLES ABOVE KEYBOARD */}
        {/* Tiny Mouse with Cheese */}
        <g id="mouse-cheese">
          {/* Ears */}
          <circle cx="160" cy="74" r="3.5" fill="#E8A29A" stroke="#1C1A17" strokeWidth="1.2" />
          <circle cx="167" cy="72" r="3.5" fill="#E8A29A" stroke="#1C1A17" strokeWidth="1.2" />
          {/* Mouse Body */}
          <ellipse cx="168" cy="80" rx="7" ry="5.5" fill="#D8B2A2" stroke="#1C1A17" strokeWidth="1.5" />
          {/* Eye */}
          <circle cx="165" cy="78" r="0.8" fill="#1C1A17" />
          {/* Tail */}
          <path d="M 175 81 C 182 82, 185 78, 182 74" stroke="#1C1A17" strokeWidth="1.2" fill="none" />
          {/* Cheese Wedge */}
          <path d="M 180 80 L 192 76 L 190 86 Z" fill="#F7D154" stroke="#1C1A17" strokeWidth="1.2" strokeLinejoin="round" />
          <circle cx="185" cy="81" r="1" fill="#D4A728" />
        </g>

        {/* Lounging Stick Figure in Center Top */}
        <g id="lounging-figure">
          <circle cx="248" cy="73" r="5" fill="#FAF8F5" stroke="#1C1A17" strokeWidth="2" />
          {/* Eyes */}
          <circle cx="246" cy="73" r="0.8" fill="#1C1A17" />
          <circle cx="249" cy="73" r="0.8" fill="#1C1A17" />
          {/* Lounging body */}
          <path d="M 253 75 L 275 81 L 295 86" stroke="#1C1A17" strokeWidth="2" strokeLinecap="round" />
          {/* Legs */}
          <path d="M 295 86 L 302 82 M 295 86 L 300 92" stroke="#1C1A17" strokeWidth="2" strokeLinecap="round" />
          {/* Arms reading */}
          <path d="M 256 77 L 266 85 L 272 80" stroke="#1C1A17" strokeWidth="1.8" strokeLinecap="round" />
          {/* Tablet/Book */}
          <rect x="268" y="72" width="10" height="14" rx="1.5" fill="#FAF8F5" stroke="#1C1A17" strokeWidth="1.5" transform="rotate(-15 268 72)" />
        </g>

        {/* Blue Racecar Top Right */}
        <g id="racecar">
          {/* Speed Lines */}
          <line x1="380" y1="88" x2="395" y2="88" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="376" y1="94" x2="392" y2="94" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 2" />
          {/* Car Body */}
          <path d="M 400 92 C 405 84, 425 84, 435 90 L 442 90 C 445 90, 447 93, 445 95 L 400 95 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.2" />
          {/* Rear Wing */}
          <path d="M 398 85 L 405 85 L 403 92" stroke="#1D4ED8" strokeWidth="1.5" fill="none" />
          {/* Wheels */}
          <circle cx="410" cy="95" r="3.5" fill="#1C1A17" />
          <circle cx="435" cy="95" r="3.5" fill="#1C1A17" />
        </g>

        {/* 5. RIGHT SIDE DOODLES */}
        {/* Flying Bats (Top Right) */}
        <g id="bats">
          {/* Bat 1 (Top) */}
          <path
            d="M 470 38 C 462 30, 452 34, 448 42 C 456 42, 460 46, 470 42 C 480 46, 484 42, 492 42 C 488 34, 478 30, 470 38 Z"
            fill="#1C1A17"
          />
          {/* Bat 2 (Lower Right) */}
          <path
            d="M 460 70 C 448 58, 434 62, 428 74 C 440 74, 446 80, 460 74 C 474 80, 480 74, 492 74 C 486 62, 472 58, 460 70 Z"
            fill="#1C1A17"
          />
        </g>

        {/* Studio Headphones */}
        <g id="headphones">
          {/* Headband Arcs */}
          <path d="M 425 125 C 415 80, 485 80, 475 125" stroke="#1C1A17" strokeWidth="3.2" fill="none" strokeLinecap="round" />
          <path d="M 428 122 C 420 85, 480 85, 472 122" stroke="#1C1A17" strokeWidth="1.5" fill="none" />

          {/* Left Ear Cup */}
          <rect x="412" y="118" width="18" height="32" rx="9" fill="#FAF8F5" stroke="#1C1A17" strokeWidth="2.2" />
          <ellipse cx="421" cy="134" rx="4" ry="8" fill="#1C1A17" opacity="0.15" />

          {/* Right Ear Cup */}
          <rect x="470" y="118" width="18" height="32" rx="9" fill="#FAF8F5" stroke="#1C1A17" strokeWidth="2.2" />
          <ellipse cx="479" cy="134" rx="4" ry="8" fill="#1C1A17" opacity="0.15" />

          {/* Coiled Audio Cable coming down from Headphones */}
          <path
            d="M 480 150 C 475 168, 510 160, 500 180 C 490 198, 525 195, 515 210"
            stroke="#1C1A17"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Spider Hanging from Headband */}
          <line x1="450" y1="94" x2="450" y2="108" stroke="#1C1A17" strokeWidth="1" strokeDasharray="2 1" />
          {/* Spider Body */}
          <circle cx="450" cy="112" r="3" fill="#1C1A17" />
          {/* Spider Legs */}
          <path d="M 446 110 L 442 108 M 446 112 L 441 112 M 446 114 L 442 116 M 454 110 L 458 108 M 454 112 L 459 112 M 454 114 L 458 116" stroke="#1C1A17" strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
};
