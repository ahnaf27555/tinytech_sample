import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Volume2, Wand2, CheckCircle2, Heart } from 'lucide-react';
import { DoodleLogo } from './DoodleLogo';

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onOpenSoundTester: () => void;
  onOpenDeskBuilder: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
  onOpenSoundTester,
  onOpenDeskBuilder,
}) => {
  return (
    <section className="relative overflow-hidden py-12 sm:py-20 bg-[#FAF8F5] paper-grid border-b border-[#1C1A17]/10">
      
      {/* Subtle Warm Backdrop Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#E2B857]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1C1A17] bg-white text-[#1C1A17] text-xs sm:text-sm font-semibold shadow-sm mb-6 sm:mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#E2B857]" />
          <span>Handcrafted Computer Accessories & Artisan Hobby Gear</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#1C1A17]" />
          <span className="font-handwritten text-lg font-bold text-[#1C1A17] hover:underline">
            Tinytech Studio
          </span>
        </motion.div>

        {/* Central Logo Showcase */}
        <div className="my-4 sm:my-8 flex justify-center items-center">
          <DoodleLogo size="hero" showDoodles={true} />
        </div>

        {/* Subtitle / Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto mt-6"
        >
          <p className="text-base sm:text-xl text-[#1C1A17]/80 leading-relaxed font-normal">
            Where tech craftsmanship meets cozy doodle magic. Custom mechanical keyboards, hand-painted artisan keycaps, and audiophile gear designed to make your desk feel like home.
          </p>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10"
        >
          <button
            onClick={onExploreCatalog}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#1C1A17] text-[#FAF8F5] font-semibold text-sm sm:text-base keycap-shadow hover:scale-105 active:scale-95 transition-all"
          >
            <span>Explore Artisan Collection</span>
            <ArrowRight className="w-4 h-4 text-[#E2B857]" />
          </button>

          <button
            onClick={onOpenDeskBuilder}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl border-2 border-[#1C1A17] bg-white text-[#1C1A17] font-semibold text-sm sm:text-base keycap-shadow hover:bg-[#1C1A17] hover:text-white transition-all"
          >
            <Wand2 className="w-4 h-4 text-[#E2B857]" />
            <span>Interactive Desk Builder</span>
          </button>

          <button
            onClick={onOpenSoundTester}
            className="flex items-center gap-2 px-5 py-3.5 rounded-2xl border border-[#1C1A17]/30 bg-[#EFEADF] text-[#1C1A17] font-semibold text-sm sm:text-base hover:bg-[#E2D8C6] transition-all"
          >
            <Volume2 className="w-4 h-4 text-[#1C1A17]" />
            <span className="font-mono-tech text-xs sm:text-sm">Listen to Switch Sounds</span>
          </button>
        </motion.div>

        {/* Guarantees & Features Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-12 sm:mt-16 pt-8 border-t border-[#1C1A17]/10 text-left">
          <div className="p-3 sm:p-4 rounded-xl bg-white/70 border border-[#1C1A17]/10">
            <div className="flex items-center gap-2 text-[#1C1A17] font-bold text-xs sm:text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Handcrafted Quality</span>
            </div>
            <p className="text-xs text-[#1C1A17]/70 mt-1">Sculpted & hand-finished in small batches.</p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-white/70 border border-[#1C1A17]/10">
            <div className="flex items-center gap-2 text-[#1C1A17] font-bold text-xs sm:text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Marbly Acoustic Thock</span>
            </div>
            <p className="text-xs text-[#1C1A17]/70 mt-1">Pre-lubed switches & sound-dampened boards.</p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-white/70 border border-[#1C1A17]/10">
            <div className="flex items-center gap-2 text-[#1C1A17] font-bold text-xs sm:text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Eco-Friendly Pack</span>
            </div>
            <p className="text-xs text-[#1C1A17]/70 mt-1">Recycled paper boxes & sticker pack included.</p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-white/70 border border-[#1C1A17]/10">
            <div className="flex items-center gap-2 text-[#1C1A17] font-bold text-xs sm:text-sm">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Hobbyist Guarantee</span>
            </div>
            <p className="text-xs text-[#1C1A17]/70 mt-1">30-day easy returns & stem fit warranty.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
