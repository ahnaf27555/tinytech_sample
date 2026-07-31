import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Volume2, Sparkles, ArrowRight, Wand2, ShieldCheck, Truck, Award } from 'lucide-react';

interface HeroCarouselProps {
  onExploreCatalog: () => void;
  onOpenSoundTester: () => void;
  onSelectCategory: (catId: string) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  onExploreCatalog,
  onOpenSoundTester,
  onSelectCategory,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 'slide-keyboards',
      categoryTag: 'NEW 75% WIRELESS DROP',
      title: 'Crafted for Pure Thock & Tactile Bliss',
      subtitle: 'Experience CNC-milled aluminum bodies with gasket-mount dampening and pre-lubed linear switches.',
      badgeText: 'Acoustically Tuned',
      primaryActionText: 'Shop Keyboards',
      primaryAction: () => onSelectCategory('keyboards'),
      secondaryActionText: '🔊 Switch Sound Studio',
      secondaryAction: onOpenSoundTester,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=1200',
      accentColor: '#E2B857',
      tagline: '★ Rated 4.9/5 by 2,400+ Keyboard Enthusiasts',
    },
    {
      id: 'slide-keycaps',
      categoryTag: 'LIMITED ARTISAN RESIN DROP',
      title: 'Hand-Painted Keycaps with Whimsical Charm',
      subtitle: 'Individual resin keycaps featuring tiny ramen bowls, cat paws, and vintage arcade vibes.',
      badgeText: 'Handcrafted Resin',
      primaryActionText: 'Explore Artisan Keycaps',
      primaryAction: () => onSelectCategory('keycaps'),
      secondaryActionText: '🔊 Switch Sound Studio',
      secondaryAction: onOpenSoundTester,
      image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=1200',
      accentColor: '#F5D0C5',
      tagline: '✨ Fits MX Stems & Standard Cross-Switches',
    },
    {
      id: 'slide-audio',
      categoryTag: 'DESK ACOUSTICS & CABLES',
      title: 'Studio Sound & Custom Aviator Cables',
      subtitle: 'Open-back planar magnetic headphones paired with double-sleeved coiled cables for clean desk aesthetics.',
      badgeText: 'Studio Grade',
      primaryActionText: 'Shop Audio & Accessories',
      primaryAction: () => onSelectCategory('audio'),
      secondaryActionText: 'Browse All Gear',
      secondaryAction: onExploreCatalog,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200',
      accentColor: '#D8D2C7',
      tagline: '📦 Express Shipping & 30-Day Easy Returns',
    },
  ];

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative pt-6 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Banner Wrapper */}
      <div 
        className="relative rounded-3xl overflow-hidden bg-white border border-[#1C1A17]/10 keycap-shadow"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px] items-center"
          >
            {/* Left Content Side */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center z-10">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono-tech font-bold uppercase tracking-wider bg-[#1C1A17] text-white">
                  {slide.categoryTag}
                </span>
                <span className="text-xs font-semibold text-[#1C1A17]/60 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#E2B857]" />
                  {slide.badgeText}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-handwritten text-[#1C1A17] leading-[1.05] tracking-tight">
                {slide.title}
              </h1>

              <p className="mt-4 text-sm sm:text-base text-[#1C1A17]/75 leading-relaxed max-w-xl">
                {slide.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={slide.primaryAction}
                  className="px-6 py-3.5 rounded-xl bg-[#1C1A17] text-white font-semibold text-xs sm:text-sm hover:bg-[#33302B] active:scale-95 transition-all flex items-center gap-2 keycap-shadow"
                >
                  <span>{slide.primaryActionText}</span>
                  <ArrowRight className="w-4 h-4 text-[#E2B857]" />
                </button>

                <button
                  onClick={slide.secondaryAction}
                  className="px-5 py-3.5 rounded-xl bg-[#FAF8F5] border border-[#1C1A17]/20 text-[#1C1A17] font-semibold text-xs sm:text-sm hover:border-[#1C1A17] hover:bg-white active:scale-95 transition-all flex items-center gap-2"
                >
                  {slide.secondaryActionText}
                </button>
              </div>

              <div className="mt-6 text-xs text-[#1C1A17]/60 font-medium">
                {slide.tagline}
              </div>
            </div>

            {/* Right Image Display */}
            <div className="lg:col-span-5 h-64 sm:h-80 lg:h-full relative overflow-hidden bg-[#FAF8F5]">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white via-transparent to-transparent opacity-80" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#1C1A17]/10 shadow-sm">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-lg hover:bg-[#FAF8F5] text-[#1C1A17] transition-colors"
            title="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1.5 px-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx ? 'w-6 bg-[#1C1A17]' : 'w-2 bg-[#1C1A17]/20 hover:bg-[#1C1A17]/40'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-1.5 rounded-lg hover:bg-[#FAF8F5] text-[#1C1A17] transition-colors"
            title="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="text-[11px] font-mono-tech text-[#1C1A17]/60 pl-1 border-l border-[#1C1A17]/10">
            0{currentSlide + 1} / 0{slides.length}
          </span>
        </div>
      </div>

      {/* Trust Badges Bar underneath */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white/80 border border-[#1C1A17]/10 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#FAF8F5] text-[#1C1A17] border border-[#1C1A17]/10">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#1C1A17]">Free Global Shipping</div>
            <div className="text-[11px] text-[#1C1A17]/60">On orders over $75</div>
          </div>
        </div>

        <div className="bg-white/80 border border-[#1C1A17]/10 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#FAF8F5] text-[#1C1A17] border border-[#1C1A17]/10">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#1C1A17]">MX Stem Guaranteed</div>
            <div className="text-[11px] text-[#1C1A17]/60">100% switch fit match</div>
          </div>
        </div>

        <div className="bg-white/80 border border-[#1C1A17]/10 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#FAF8F5] text-[#1C1A17] border border-[#1C1A17]/10">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#1C1A17]">Hand-Crafted Quality</div>
            <div className="text-[11px] text-[#1C1A17]/60">Inspected by artisans</div>
          </div>
        </div>

        <div className="bg-white/80 border border-[#1C1A17]/10 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#FAF8F5] text-[#1C1A17] border border-[#1C1A17]/10">
            <Sparkles className="w-4 h-4 text-[#E2B857]" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#1C1A17]">Free Sticker Pack</div>
            <div className="text-[11px] text-[#1C1A17]/60">With every order</div>
          </div>
        </div>
      </div>
    </div>
  );
};
