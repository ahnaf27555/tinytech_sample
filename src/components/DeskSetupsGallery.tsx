import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Tag, Eye } from 'lucide-react';
import { MOCK_DESK_SETUPS } from '../data/mockData';
import { Product } from '../types';

interface DeskSetupsGalleryProps {
  onOpenQuickViewByProductId: (productId: string) => void;
}

export const DeskSetupsGallery: React.FC<DeskSetupsGalleryProps> = ({
  onOpenQuickViewByProductId,
}) => {
  const [activeSetupIndex, setActiveSetupIndex] = useState<number>(0);
  const [likes, setLikes] = useState<{ [id: string]: number }>({
    s1: 342,
    s2: 519,
  });
  const [likedMap, setLikedMap] = useState<{ [id: string]: boolean }>({});

  const activeSetup = MOCK_DESK_SETUPS[activeSetupIndex];

  const handleToggleLike = (id: string) => {
    setLikedMap((prev) => {
      const isCurrentlyLiked = prev[id];
      const newMap = { ...prev, [id]: !isCurrentlyLiked };
      setLikes((currentLikes) => ({
        ...currentLikes,
        [id]: currentLikes[id] + (isCurrentlyLiked ? -1 : 1),
      }));
      return newMap;
    });
  };

  return (
    <section className="py-16 bg-[#EFEADF]/60 border-y border-[#1C1A17]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#1C1A17]/15 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E2B857]" />
            <span>Community Desk Setups</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-handwritten text-[#1C1A17]">
            Crafted for Cozy Workspaces
          </h2>
          <p className="text-xs sm:text-sm text-[#1C1A17]/70 mt-2">
            Explore how hobbyists and creators pair Tinytech mechanical keyboards, artisan keycaps, and coiled cables in real life.
          </p>
        </div>

        {/* Gallery Selector Tabs */}
        <div className="flex justify-center gap-3 mb-8">
          {MOCK_DESK_SETUPS.map((setup, idx) => (
            <button
              key={setup.id}
              onClick={() => setActiveSetupIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                activeSetupIndex === idx
                  ? 'bg-[#1C1A17] text-white border-[#1C1A17]'
                  : 'bg-white text-[#1C1A17] border-[#1C1A17]/15 hover:bg-[#FAF8F5]'
              }`}
            >
              {setup.title}
            </button>
          ))}
        </div>

        {/* Interactive Main Photo Showcase */}
        <div className="relative max-w-4xl mx-auto rounded-3xl bg-white border-2 border-[#1C1A17] overflow-hidden keycap-shadow">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <img
              src={activeSetup.image}
              alt={activeSetup.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            {/* Interactive Hotspot Dots */}
            {activeSetup.taggedProducts.map((tag) => (
              <div
                key={tag.id}
                className="absolute group"
                style={{ top: `${tag.y}%`, left: `${tag.x}%` }}
              >
                {/* Pulsing Hotspot Button */}
                <button
                  onClick={() => onOpenQuickViewByProductId(tag.id)}
                  className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#1C1A17] text-[#E2B857] border-2 border-white shadow-lg hover:scale-125 transition-transform"
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span className="absolute inset-0 rounded-full bg-[#E2B857] animate-ping opacity-75 pointer-events-none" />
                </button>

                {/* Hotspot Hover Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex flex-col items-center z-30 pointer-events-none">
                  <div className="bg-[#1C1A17] text-[#FAF8F5] text-xs py-2 px-3 rounded-xl shadow-xl whitespace-nowrap border border-white/20">
                    <div className="font-bold">{tag.name}</div>
                    <div className="text-[11px] font-mono-tech text-[#E2B857]">${tag.price.toFixed(2)} • Click to View</div>
                  </div>
                  <div className="w-2 h-2 bg-[#1C1A17] rotate-45 -mt-1" />
                </div>
              </div>
            ))}
          </div>

          {/* Setup Card Footer Info */}
          <div className="p-4 sm:p-6 bg-[#FAF8F5] flex items-center justify-between border-t border-[#1C1A17]/10">
            <div className="flex items-center gap-3">
              <img
                src={activeSetup.avatar}
                alt={activeSetup.user}
                className="w-10 h-10 rounded-full border border-[#1C1A17]/20 object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="font-bold text-sm text-[#1C1A17]">{activeSetup.title}</h4>
                <p className="text-xs font-mono-tech text-[#1C1A17]/60">Built by {activeSetup.user}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleToggleLike(activeSetup.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                  likedMap[activeSetup.id]
                    ? 'bg-rose-50 border-rose-400 text-rose-500'
                    : 'bg-white border-[#1C1A17]/20 text-[#1C1A17] hover:bg-[#EFEADF]'
                }`}
              >
                <Heart className={`w-4 h-4 ${likedMap[activeSetup.id] ? 'fill-rose-500' : ''}`} />
                <span>{likes[activeSetup.id]}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
