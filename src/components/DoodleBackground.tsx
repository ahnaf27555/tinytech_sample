import React from 'react';

export const DoodleBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.035] select-none text-[#1C1A17]">
      {/* Scattered Vector Doodles across background */}
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="doodle-pattern" x="0" y="0" width="280" height="280" patternUnits="userSpaceOnUse">
            {/* Keycap doodle */}
            <g transform="translate(20, 20)">
              <rect x="0" y="0" width="30" height="30" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
              <rect x="4" y="4" width="22" height="22" rx="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <text x="11" y="20" fontSize="11" fontFamily="Space Mono" fontWeight="bold">Esc</text>
            </g>

            {/* Coiled Wire doodle */}
            <path d="M 120 40 Q 130 20, 140 40 T 160 40 T 180 40 T 200 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

            {/* Sparkle/Star doodle */}
            <path d="M 230 25 L 233 35 L 243 38 L 233 41 L 230 51 L 227 41 L 217 38 L 227 35 Z" fill="currentColor" />

            {/* Mechanical Switch doodle */}
            <g transform="translate(40, 150)">
              <rect x="0" y="0" width="28" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="14" cy="14" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <rect x="11" y="11" width="6" height="6" fill="currentColor" />
            </g>

            {/* Computer Mouse doodle */}
            <g transform="translate(140, 140)">
              <rect x="0" y="0" width="22" height="36" rx="11" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="11" y1="0" x2="11" y2="12" stroke="currentColor" strokeWidth="1.5" />
            </g>

            {/* Coffee / Tea Mug doodle */}
            <g transform="translate(210, 180)">
              <rect x="0" y="6" width="22" height="24" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M 22 10 C 28 10, 28 20, 22 20" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M 6 0 Q 8 -4 6 -8" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M 14 0 Q 16 -4 14 -8" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </g>

            {/* Cute Stick Mascot figure */}
            <g transform="translate(20, 230)">
              <circle cx="12" cy="10" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="10" cy="9" r="1" fill="currentColor" />
              <circle cx="14" cy="9" r="1" fill="currentColor" />
              <path d="M 10 12 Q 12 14 14 12" stroke="currentColor" strokeWidth="1" fill="none" />
              <line x1="12" y1="16" x2="12" y2="28" stroke="currentColor" strokeWidth="2" />
              <line x1="12" y1="20" x2="6" y2="24" stroke="currentColor" strokeWidth="1.5" />
              <line x1="12" y1="20" x2="18" y2="24" stroke="currentColor" strokeWidth="1.5" />
            </g>

            {/* Heart doodle */}
            <path d="M 120 230 C 120 225, 112 220, 107 226 C 102 220, 94 225, 94 230 C 94 240, 107 248, 107 248 C 107 248, 120 240, 120 230 Z" fill="currentColor" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#doodle-pattern)" />
      </svg>
    </div>
  );
};
