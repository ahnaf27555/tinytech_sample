import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Wand2, ShoppingBag, Sparkles, Check, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import confetti from 'canvas-confetti';

interface DeskBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBundleToCart: (items: CartItem[]) => void;
}

export const InteractiveDeskBuilder: React.FC<DeskBuilderProps> = ({
  isOpen,
  onClose,
  onAddBundleToCart,
}) => {
  const keyboardOptions = [
    { id: 'kb1', name: 'Sketch-65% Gasket Board', price: 149.00, hex: '#F4EFE6', img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80' },
    { id: 'kb2', name: 'Minimalist 60% Chalk Kit', price: 99.00, hex: '#2A2825', img: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80' },
  ];

  const keycapOptions = [
    { id: 'kc1', name: 'Escape Cat Artisan Keycap', price: 34.99, icon: '🐱', img: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80' },
    { id: 'kc2', name: 'Retro Gameboy Keycap', price: 38.00, icon: '🎮', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80' },
  ];

  const deskMatOptions = [
    { id: 'dm1', name: 'Doodle Grid XXL Mat (90x40cm)', price: 29.50, pattern: 'grid', img: 'https://images.unsplash.com/photo-1541140532154-b024d705b909?auto=format&fit=crop&w=600&q=80' },
    { id: 'dm2', name: 'Cozy Felt Desk Pad (80x30cm)', price: 24.00, pattern: 'felt', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80' },
  ];

  const cableOptions = [
    { id: 'cb1', name: 'Monochrome Aviator Coiled Cable', price: 36.00, hex: '#1C1A17' },
    { id: 'cb2', name: 'Honey Butter Coiled Cable', price: 36.00, hex: '#E2B857' },
  ];

  const [selectedKb, setSelectedKb] = useState(keyboardOptions[0]);
  const [selectedKc, setSelectedKc] = useState(keycapOptions[0]);
  const [selectedMat, setSelectedMat] = useState(deskMatOptions[0]);
  const [selectedCable, setSelectedCable] = useState(cableOptions[0]);

  const rawSubtotal = selectedKb.price + selectedKc.price + selectedMat.price + selectedCable.price;
  const bundleDiscount = rawSubtotal * 0.15; // 15% discount for bundle
  const finalPrice = rawSubtotal - bundleDiscount;

  const handleAddBundle = () => {
    // Construct dummy cart items for the bundle
    const bundleItems: CartItem[] = [
      {
        product: {
          id: selectedKb.id,
          name: selectedKb.name,
          category: 'keyboards',
          price: selectedKb.price * 0.85,
          rating: 5.0,
          reviewsCount: 12,
          image: selectedKb.img,
          doodleIcon: '⌨️',
          description: 'Part of custom desk setup bundle.',
          specs: {},
          tags: ['Bundle'],
          inStock: true
        },
        quantity: 1,
      },
      {
        product: {
          id: selectedKc.id,
          name: selectedKc.name,
          category: 'keycaps',
          price: selectedKc.price * 0.85,
          rating: 5.0,
          reviewsCount: 18,
          image: selectedKc.img,
          doodleIcon: selectedKc.icon,
          description: 'Part of custom desk setup bundle.',
          specs: {},
          tags: ['Bundle'],
          inStock: true
        },
        quantity: 1,
      },
      {
        product: {
          id: selectedMat.id,
          name: selectedMat.name,
          category: 'accessories',
          price: selectedMat.price * 0.85,
          rating: 4.9,
          reviewsCount: 22,
          image: selectedMat.img,
          doodleIcon: '🖼️',
          description: 'Part of custom desk setup bundle.',
          specs: {},
          tags: ['Bundle'],
          inStock: true
        },
        quantity: 1,
      }
    ];

    onAddBundleToCart(bundleItems);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1A17]/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#FAF8F5] border-2 border-[#1C1A17] rounded-3xl p-6 sm:p-8 keycap-shadow my-8 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full border border-[#1C1A17]/20 hover:bg-[#1C1A17] hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1C1A17] text-[#FAF8F5] text-xs font-semibold mb-2">
              <Wand2 className="w-3.5 h-3.5 text-[#E2B857]" />
              <span>Interactive Desk Studio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-handwritten text-[#1C1A17]">
              Build Your Custom Artisan Desk Setup
            </h2>
            <p className="text-xs sm:text-sm text-[#1C1A17]/70 mt-1">
              Select your gear components and get an automatic <b>15% Bundle Discount!</b>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Controls Column */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Step 1: Keyboard */}
              <div className="bg-white p-4 rounded-2xl border border-[#1C1A17]/20">
                <label className="text-xs font-mono-tech font-bold text-[#1C1A17] uppercase tracking-wider block mb-2">
                  1. Keyboard Base
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {keyboardOptions.map((kb) => (
                    <button
                      key={kb.id}
                      onClick={() => setSelectedKb(kb)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2 transition-all ${
                        selectedKb.id === kb.id
                          ? 'border-2 border-[#1C1A17] bg-[#FAF8F5]'
                          : 'border-[#1C1A17]/15 hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: kb.hex }} />
                      <div>
                        <div className="text-xs font-bold leading-tight">{kb.name}</div>
                        <div className="text-xs font-mono-tech text-[#1C1A17]/70 mt-0.5">${kb.price.toFixed(2)}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Artisan Keycap */}
              <div className="bg-white p-4 rounded-2xl border border-[#1C1A17]/20">
                <label className="text-xs font-mono-tech font-bold text-[#1C1A17] uppercase tracking-wider block mb-2">
                  2. Artisan Keycap Accent
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {keycapOptions.map((kc) => (
                    <button
                      key={kc.id}
                      onClick={() => setSelectedKc(kc)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2 transition-all ${
                        selectedKc.id === kc.id
                          ? 'border-2 border-[#1C1A17] bg-[#FAF8F5]'
                          : 'border-[#1C1A17]/15 hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <span className="text-xl">{kc.icon}</span>
                      <div>
                        <div className="text-xs font-bold leading-tight">{kc.name}</div>
                        <div className="text-xs font-mono-tech text-[#1C1A17]/70 mt-0.5">${kc.price.toFixed(2)}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Desk Mat */}
              <div className="bg-white p-4 rounded-2xl border border-[#1C1A17]/20">
                <label className="text-xs font-mono-tech font-bold text-[#1C1A17] uppercase tracking-wider block mb-2">
                  3. Desk Mat / Pad
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {deskMatOptions.map((dm) => (
                    <button
                      key={dm.id}
                      onClick={() => setSelectedMat(dm)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedMat.id === dm.id
                          ? 'border-2 border-[#1C1A17] bg-[#FAF8F5]'
                          : 'border-[#1C1A17]/15 hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="text-xs font-bold leading-tight">{dm.name}</div>
                      <div className="text-xs font-mono-tech text-[#1C1A17]/70 mt-0.5">${dm.price.toFixed(2)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Coiled Cable */}
              <div className="bg-white p-4 rounded-2xl border border-[#1C1A17]/20">
                <label className="text-xs font-mono-tech font-bold text-[#1C1A17] uppercase tracking-wider block mb-2">
                  4. Coiled Aviator Cable
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {cableOptions.map((cb) => (
                    <button
                      key={cb.id}
                      onClick={() => setSelectedCable(cb)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2 transition-all ${
                        selectedCable.id === cb.id
                          ? 'border-2 border-[#1C1A17] bg-[#FAF8F5]'
                          : 'border-[#1C1A17]/15 hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: cb.hex }} />
                      <div>
                        <div className="text-xs font-bold leading-tight">{cb.name}</div>
                        <div className="text-xs font-mono-tech text-[#1C1A17]/70 mt-0.5">${cb.price.toFixed(2)}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Live Visualizer Column */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full bg-[#EFEADF] p-5 rounded-2xl border border-[#1C1A17]/20">
              <div>
                <div className="text-xs font-mono-tech font-bold uppercase text-[#1C1A17]/60 mb-3 flex items-center justify-between">
                  <span>Live Bundle Preview</span>
                  <span className="text-xs text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">15% Off Bundle</span>
                </div>

                {/* Visual Representation */}
                <div className="relative aspect-video rounded-xl bg-white border border-[#1C1A17]/20 overflow-hidden p-3 flex flex-col items-center justify-center">
                  <img
                    src={selectedKb.img}
                    alt={selectedKb.name}
                    className="w-full h-full object-cover rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-[#1C1A17] text-white text-xs px-2.5 py-1 rounded-full font-handwritten font-bold flex items-center gap-1">
                    <span>{selectedKc.icon}</span>
                    <span>{selectedKc.name}</span>
                  </div>
                </div>

                {/* Included Components Summary List */}
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-[#1C1A17]">
                    <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> {selectedKb.name}</span>
                    <span className="font-mono-tech">${selectedKb.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#1C1A17]">
                    <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> {selectedKc.name}</span>
                    <span className="font-mono-tech">${selectedKc.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#1C1A17]">
                    <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> {selectedMat.name}</span>
                    <span className="font-mono-tech">${selectedMat.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#1C1A17]">
                    <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> {selectedCable.name}</span>
                    <span className="font-mono-tech">${selectedCable.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Bundle Pricing Footer */}
              <div className="pt-4 mt-4 border-t border-[#1C1A17]/15">
                <div className="flex justify-between text-xs text-[#1C1A17]/60">
                  <span>Regular Total:</span>
                  <span className="line-through font-mono-tech">${rawSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-baseline mt-1">
                  <span className="font-bold text-sm text-[#1C1A17]">Bundle Price:</span>
                  <span className="text-2xl font-bold font-mono-tech text-[#1C1A17]">
                    ${finalPrice.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={handleAddBundle}
                  className="w-full mt-4 py-3 px-4 rounded-xl bg-[#1C1A17] text-[#FAF8F5] font-semibold text-sm keycap-shadow hover:bg-[#33302B] flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-[#E2B857]" />
                  <span>Add Complete Bundle to Cart</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
