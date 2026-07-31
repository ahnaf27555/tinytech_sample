import React, { useState } from 'react';
import { Mail, Sparkles, Heart, ArrowRight, Check } from 'lucide-react';
import { DoodleLogo } from './DoodleLogo';

interface FooterProps {
  onSelectCategory: (catId: string) => void;
  onOpenSoundTester: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenSoundTester,
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#1C1A17] text-[#FAF8F5] pt-16 pb-12 border-t-2 border-[#1C1A17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Card with Doodle Theme */}
        <div className="bg-[#FAF8F5] text-[#1C1A17] rounded-3xl p-6 sm:p-10 border-2 border-[#1C1A17] keycap-shadow mb-16 relative overflow-hidden">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2B857]/20 border border-[#1C1A17]/20 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#1C1A17]" />
              <span>Free Sticker Pack Included</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold font-handwritten text-[#1C1A17]">
              Join the Tinytech Artisan Club
            </h3>
            <p className="text-xs sm:text-sm text-[#1C1A17]/70 mt-1">
              Subscribe to receive new artisan keycap drop alerts, limited keyboard restock notifications, and a <b>10% off welcome code</b>.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="mt-5 flex flex-col sm:flex-row gap-2 max-w-md">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1C1A17]/50" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#EFEADF] text-xs sm:text-sm text-[#1C1A17] pl-10 pr-4 py-3 rounded-xl border border-[#1C1A17]/20 focus:outline-none focus:ring-2 focus:ring-[#1C1A17]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-[#1C1A17] text-white font-semibold text-xs sm:text-sm keycap-shadow hover:bg-[#33302B] flex items-center justify-center gap-2 transition-all"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4 text-[#E2B857]" />
                </button>
              </form>
            ) : (
              <div className="mt-4 p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>You're on the list! Welcome code <b>TINY10</b> unlocked!</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold font-handwritten text-[#FAF8F5]">
                Tinytech
              </span>
            </div>
            <p className="text-xs text-[#FAF8F5]/70 leading-relaxed max-w-xs">
              Handcrafted computer accessories, artisan keycaps, and custom desktop gear built with love, playfulness, and acoustic perfection.
            </p>
            <div className="text-xs font-mono-tech text-[#E2B857]">
              ✨ Designed for cozy desk setups worldwide.
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="font-mono-tech text-xs font-bold uppercase text-[#FAF8F5]/50 tracking-wider mb-4">
              Shop Gear
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF8F5]/80">
              <li>
                <button onClick={() => onSelectCategory('keyboards')} className="hover:text-[#E2B857] transition-colors">
                  Mechanical Keyboards
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('keycaps')} className="hover:text-[#E2B857] transition-colors">
                  Artisan Resin Keycaps
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('audio')} className="hover:text-[#E2B857] transition-colors">
                  Studio Headphones & Audio
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('mice')} className="hover:text-[#E2B857] transition-colors">
                  Ergonomic Wireless Mice
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('accessories')} className="hover:text-[#E2B857] transition-colors">
                  Desk Mats & Aviator Cables
                </button>
              </li>
            </ul>
          </div>

          {/* Studio Tools */}
          <div>
            <h4 className="font-mono-tech text-xs font-bold uppercase text-[#FAF8F5]/50 tracking-wider mb-4">
              Studio Tools
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF8F5]/80">
              <li>
                <button onClick={onOpenSoundTester} className="hover:text-[#E2B857] transition-colors flex items-center gap-1.5">
                  <span>Switch Sound Studio</span>
                  <span className="text-[10px] bg-[#E2B857] text-[#1C1A17] font-bold px-1.5 py-0.5 rounded">Interactive</span>
                </button>
              </li>
              <li>
                <a href="tel:18008469832" className="hover:text-[#E2B857] transition-colors flex items-center gap-1.5">
                  <span>Customer Hotline (1-800-TINY-TECH)</span>
                  <span className="text-[10px] bg-emerald-500 text-white font-bold px-1.5 py-0.5 rounded">24/7 Support</span>
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-[#E2B857] transition-colors">
                  Community Desk Showcase
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-mono-tech text-xs font-bold uppercase text-[#FAF8F5]/50 tracking-wider mb-4">
              Hobbyist Care
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF8F5]/80">
              <li><a href="#" className="hover:text-[#E2B857] transition-colors">Stem Fit Compatibility Guide</a></li>
              <li><a href="#" className="hover:text-[#E2B857] transition-colors">30-Day Easy Returns</a></li>
              <li><a href="#" className="hover:text-[#E2B857] transition-colors">Shipping & Tracking</a></li>
              <li><a href="#" className="hover:text-[#E2B857] transition-colors">Contact Tinytech Support</a></li>
            </ul>
          </div>

        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF8F5]/50 gap-4">
          <div>
            © {new Date().getFullYear()} <b>Tinytech Studio</b>. All rights reserved. Hand-doodled with care.
          </div>
          <div className="flex items-center gap-1 text-[#FAF8F5]/70">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 inline" />
            <span>for mechanical keyboard & desk setup lovers.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
