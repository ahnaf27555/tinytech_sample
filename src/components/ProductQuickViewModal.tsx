import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingBag, Heart, Check, Volume2, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { playSwitchSound } from '../utils/audioSynth';

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedColor?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductQuickViewModal: React.FC<QuickViewProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product?.colorVariants?.[0]?.name || ''
  );

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedColor);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1A17]/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-[#FAF8F5] border-2 border-[#1C1A17] rounded-3xl p-6 sm:p-8 keycap-shadow my-8 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full border border-[#1C1A17]/20 hover:bg-[#1C1A17] hover:text-white transition-all bg-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
            
            {/* Left Image Column */}
            <div className="space-y-3">
              <div className="relative aspect-square rounded-2xl bg-white border border-[#1C1A17]/20 overflow-hidden p-2 group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Badge Tag */}
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-[#1C1A17] text-[#FAF8F5] text-xs font-semibold px-3 py-1 rounded-full font-mono-tech border border-white/20">
                    ✨ {product.badge}
                  </div>
                )}

                {/* Doodle Icon Overlay */}
                <div className="absolute bottom-3 right-3 text-3xl p-2 bg-white/90 backdrop-blur-md rounded-xl border border-[#1C1A17]/15">
                  {product.doodleIcon}
                </div>
              </div>

              {/* Sound Profile Preview if present */}
              {product.soundProfile && (
                <button
                  onClick={() => playSwitchSound(product.soundProfile)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#EFEADF] border border-[#1C1A17]/20 text-xs font-semibold text-[#1C1A17] flex items-center justify-center gap-2 hover:bg-[#E2D8C6] transition-all"
                >
                  <Volume2 className="w-4 h-4 text-[#E2B857]" />
                  <span>Listen to {product.soundProfile} Sound Profile</span>
                </button>
              )}
            </div>

            {/* Right Details Column */}
            <div className="space-y-4">
              
              {/* Category & Ratings */}
              <div className="flex items-center justify-between text-xs font-mono-tech text-[#1C1A17]/60">
                <span className="uppercase tracking-wider">{product.category}</span>
                <div className="flex items-center gap-1 text-[#1C1A17]">
                  <Star className="w-4 h-4 fill-[#E2B857] text-[#E2B857]" />
                  <span className="font-bold">{product.rating}</span>
                  <span>({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Product Title */}
              <h2 className="text-2xl sm:text-3xl font-bold font-handwritten text-[#1C1A17] leading-tight">
                {product.name}
              </h2>

              {/* Price Display */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold font-mono-tech text-[#1C1A17]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono-tech text-[#1C1A17]/50 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.inStock ? (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    In Stock
                  </span>
                ) : (
                  <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#1C1A17]/80 leading-relaxed">
                {product.description}
              </p>

              {/* Story / Backstory if present */}
              {product.story && (
                <div className="p-3 rounded-xl bg-[#EFEADF]/70 border border-[#1C1A17]/10 text-xs italic text-[#1C1A17]/80">
                  "{product.story}"
                </div>
              )}

              {/* Color Variant Picker */}
              {product.colorVariants && product.colorVariants.length > 0 && (
                <div>
                  <label className="text-xs font-bold text-[#1C1A17] block mb-1.5 font-mono-tech uppercase">
                    Color Finish: <span className="text-[#1C1A17]/70 font-normal">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {product.colorVariants.map((col) => (
                      <button
                        key={col.name}
                        onClick={() => setSelectedColor(col.name)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-2 transition-all ${
                          selectedColor === col.name
                            ? 'border-2 border-[#1C1A17] bg-white font-bold'
                            : 'border-[#1C1A17]/20 bg-white/50 text-[#1C1A17]/70'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span>{col.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications Grid */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="bg-white p-3 rounded-xl border border-[#1C1A17]/15 space-y-1.5 text-xs">
                  <div className="font-mono-tech font-bold uppercase text-[#1C1A17]/60 mb-1">
                    Technical Specifications
                  </div>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between border-b border-[#1C1A17]/5 pb-1 last:border-0 last:pb-0">
                      <span className="text-[#1C1A17]/70">{key}:</span>
                      <span className="font-semibold text-[#1C1A17] text-right">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity & Add to Cart Controls */}
              <div className="pt-2 flex items-center gap-3">
                <div className="flex items-center border-2 border-[#1C1A17] rounded-xl bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-[#1C1A17] hover:bg-[#EFEADF] font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-bold font-mono-tech">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-[#1C1A17] hover:bg-[#EFEADF] font-bold text-sm"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#1C1A17] text-[#FAF8F5] font-semibold text-sm keycap-shadow hover:bg-[#33302B] flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-[#E2B857]" />
                  <span>Add to Shopping Cart</span>
                </button>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    isWishlisted
                      ? 'border-rose-500 bg-rose-50 text-rose-500'
                      : 'border-[#1C1A17]/20 bg-white text-[#1C1A17] hover:border-[#1C1A17]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1C1A17]/10 text-[11px] text-[#1C1A17]/70">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ships in 24 Hours</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>30-Day Money Back</span>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
