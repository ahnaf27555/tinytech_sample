import React from 'react';
import { motion } from 'motion/react';
import { Category } from '../types';

interface CategorySectionProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  // Self-Explanatory Custom Vector Doodle Logos for Each Category
  const categoryDoodleLogos: Record<string, React.ReactNode> = {
    keyboards: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Keyboard Frame */}
        <rect x="4" y="10" width="40" height="28" rx="6" className="fill-[#FAF8F5]" />
        {/* Key Rows */}
        <rect x="8" y="15" width="5" height="5" rx="1.5" />
        <rect x="15" y="15" width="5" height="5" rx="1.5" />
        <rect x="22" y="15" width="5" height="5" rx="1.5" />
        <rect x="29" y="15" width="5" height="5" rx="1.5" />
        <rect x="36" y="15" width="4" height="5" rx="1.5" />
        
        <rect x="8" y="23" width="5" height="5" rx="1.5" />
        <rect x="15" y="23" width="5" height="5" rx="1.5" />
        <rect x="22" y="23" width="5" height="5" rx="1.5" />
        <rect x="29" y="23" width="11" height="5" rx="1.5" fill="currentColor" fillOpacity="0.15" />

        <rect x="8" y="30" width="7" height="4" rx="1.5" />
        <rect x="17" y="30" width="18" height="4" rx="1.5" />
        <rect x="37" y="30" width="3" height="4" rx="1.5" />
      </svg>
    ),
    keycaps: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* 3D Keycap Angle */}
        <path d="M 8 16 L 16 8 L 32 8 L 40 16 L 37 38 L 11 38 Z" className="fill-[#FAF8F5]" />
        {/* Keycap Dish Top */}
        <rect x="14" y="12" width="20" height="20" rx="3" strokeWidth="1.8" className="fill-white" />
        {/* Heart/Star Artisan Detail inside */}
        <path d="M 24 18 L 25.5 21 L 29 21.5 L 26.5 24 L 27 27.5 L 24 26 L 21 27.5 L 21.5 24 L 19 21.5 L 22.5 21 Z" fill="currentColor" stroke="none" />
      </svg>
    ),
    audio: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Headphone Arch */}
        <path d="M 10 26 C 10 14, 16 8, 24 8 C 32 8, 38 14, 38 26" strokeWidth="2.5" />
        {/* Left Ear cup */}
        <rect x="6" y="24" width="9" height="16" rx="4" className="fill-white" strokeWidth="2" />
        <circle cx="10.5" cy="32" r="2" fill="currentColor" />
        {/* Right Ear cup */}
        <rect x="33" y="24" width="9" height="16" rx="4" className="fill-white" strokeWidth="2" />
        <circle cx="37.5" cy="32" r="2" fill="currentColor" />
      </svg>
    ),
    mice: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Mouse Body */}
        <rect x="13" y="8" width="22" height="34" rx="11" className="fill-[#FAF8F5]" strokeWidth="2" />
        {/* Center Split Line */}
        <line x1="24" y1="8" x2="24" y2="20" strokeWidth="1.8" />
        {/* Scroll Wheel */}
        <rect x="22" y="12" width="4" height="7" rx="2" fill="currentColor" />
      </svg>
    ),
    accessories: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Desk Mat */}
        <rect x="6" y="14" width="36" height="24" rx="4" className="fill-[#FAF8F5]" strokeWidth="2" />
        {/* Coiled Aviator Cable */}
        <path d="M 12 18 Q 16 12, 20 18 T 28 18 T 36 18" strokeWidth="2" fill="none" />
        <circle cx="36" cy="18" r="2.5" fill="currentColor" />
      </svg>
    ),
  };

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Heading */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#1C1A17]/50">
          SHOP BY CATEGORY
        </span>
        <h2 className="text-3xl font-bold font-handwritten text-[#1C1A17] mt-1">
          Explore Handcrafted Collections
        </h2>
      </div>

      {/* Simplified Category Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          const logo = categoryDoodleLogos[category.id];

          return (
            <motion.button
              key={category.id}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectCategory(category.id)}
              className={`p-5 rounded-2xl flex flex-col items-center text-center transition-all relative overflow-hidden group ${
                isSelected
                  ? 'bg-[#1C1A17] text-white shadow-md border border-[#1C1A17]'
                  : 'bg-white text-[#1C1A17] border border-[#1C1A17]/10 hover:border-[#1C1A17]/30 hover:shadow-xs'
              }`}
            >
              {/* Self-explanatory Doodle Logo */}
              <div
                className={`p-3 rounded-2xl mb-3 transition-colors ${
                  isSelected
                    ? 'text-[#E2B857] bg-white/10'
                    : 'text-[#1C1A17] bg-[#FAF8F5] group-hover:bg-[#EFEADF]'
                }`}
              >
                {logo}
              </div>

              {/* Category Name */}
              <h3 className="text-base font-bold font-handwritten leading-tight">
                {category.name}
              </h3>

              {/* Item Count */}
              <span className={`text-[11px] font-mono-tech mt-1 ${isSelected ? 'text-white/70' : 'text-[#1C1A17]/50'}`}>
                {category.itemCount} Items
              </span>

              {/* Selection Accent */}
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E2B857]" />
              )}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};
