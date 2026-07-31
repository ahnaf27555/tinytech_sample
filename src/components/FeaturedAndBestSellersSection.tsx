import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Flame, Sparkles, Eye, ShoppingBag, Heart, Volume2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { playSwitchSound } from '../utils/audioSynth';

interface FeaturedAndBestSellersProps {
  products: Product[];
  onOpenQuickView: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onExploreCatalog: () => void;
}

export const FeaturedAndBestSellersSection: React.FC<FeaturedAndBestSellersProps> = ({
  products,
  onOpenQuickView,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  onExploreCatalog,
}) => {
  const [activeTab, setActiveTab] = useState<'bestsellers' | 'featured'>('bestsellers');

  // Filter products for Best Sellers and Featured
  const bestSellers = products.filter(p => p.badge?.toLowerCase().includes('bestseller') || p.rating >= 4.9);
  const featured = products.filter(p => p.badge?.toLowerCase().includes('hot') || p.badge?.toLowerCase().includes('limited') || p.badge?.toLowerCase().includes('new') || p.inStock);

  const displayProducts = activeTab === 'bestsellers' ? bestSellers.slice(0, 4) : featured.slice(0, 4);

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header with Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#1C1A17]/10">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-[#E2B857]/20 text-[#1C1A17] font-mono-tech text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#1C1A17]" />
              Artisan Highlights
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-handwritten text-[#1C1A17]">
            {activeTab === 'bestsellers' ? '🔥 Best Selling Desk Accessories' : '✨ Featured Drops & Restocks'}
          </h2>
        </div>

        {/* Tab Toggle Switch */}
        <div className="flex items-center bg-white p-1 rounded-2xl border border-[#1C1A17]/15 keycap-shadow">
          <button
            onClick={() => setActiveTab('bestsellers')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'bestsellers'
                ? 'bg-[#1C1A17] text-white shadow-sm'
                : 'text-[#1C1A17]/70 hover:text-[#1C1A17]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#E2B857]" />
            <span>Best Sellers</span>
          </button>

          <button
            onClick={() => setActiveTab('featured')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'featured'
                ? 'bg-[#1C1A17] text-white shadow-sm'
                : 'text-[#1C1A17]/70 hover:text-[#1C1A17]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E2B857]" />
            <span>Featured Drops</span>
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayProducts.map((product) => {
          const isWishlisted = wishlistIds.includes(product.id);

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-white border border-[#1C1A17]/10 rounded-2xl p-3.5 hover:border-[#1C1A17]/30 shadow-xs hover:shadow-md flex flex-col justify-between transition-all"
            >
              <div>
                {/* Image & Badge */}
                <div
                  onClick={() => onSelectProduct ? onSelectProduct(product) : onOpenQuickView(product)}
                  className="relative aspect-square rounded-xl bg-[#FAF8F5] overflow-hidden mb-3 p-2 cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Top Badge */}
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 bg-[#1C1A17] text-white text-[10px] font-bold font-mono-tech px-2.5 py-0.5 rounded-full shadow-xs">
                      {product.badge}
                    </span>
                  )}

                  {/* Doodle Icon Tag */}
                  <span className="absolute bottom-2.5 right-2.5 text-lg p-1 bg-white/90 backdrop-blur-sm rounded-lg border border-[#1C1A17]/10 shadow-2xs">
                    {product.doodleIcon}
                  </span>

                  {/* Wishlist Heart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className={`absolute top-2.5 right-2.5 p-1.5 rounded-full border transition-all ${
                      isWishlisted
                        ? 'bg-rose-50 border-rose-300 text-rose-500'
                        : 'bg-white/90 border-[#1C1A17]/10 text-[#1C1A17]/70 hover:text-[#1C1A17] hover:scale-110 shadow-2xs'
                    }`}
                    title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                  </button>

                  {/* Quick View Button */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenQuickView(product);
                      }}
                      className="w-full py-1.5 bg-[#1C1A17]/90 text-white rounded-lg text-xs font-semibold backdrop-blur-md flex items-center justify-center gap-1.5 hover:bg-[#1C1A17] transition-colors shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#E2B857]" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Rating & Switch Sound */}
                <div className="flex items-center justify-between text-xs text-[#1C1A17]/60 mb-1.5 font-mono-tech">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#E2B857] text-[#E2B857]" />
                    <span className="font-bold text-[#1C1A17]">{product.rating}</span>
                    <span>({product.reviewsCount})</span>
                  </div>

                  {product.soundProfile && (
                    <button
                      onClick={() => playSwitchSound(product.soundProfile)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#1C1A17]/10 text-[10px] font-bold text-[#1C1A17] hover:bg-[#E2B857] transition-colors"
                      title="Click to preview switch acoustics"
                    >
                      <Volume2 className="w-3 h-3 text-[#1C1A17]" />
                      <span>{product.soundProfile}</span>
                    </button>
                  )}
                </div>

                {/* Name */}
                <h3
                  onClick={() => onSelectProduct ? onSelectProduct(product) : onOpenQuickView(product)}
                  className="font-bold text-sm text-[#1C1A17] group-hover:text-[#E2B857] transition-colors line-clamp-1 mb-1 cursor-pointer"
                >
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#1C1A17]/60 line-clamp-2 mb-3">
                  {product.description}
                </p>
              </div>

              {/* Price & Add To Cart */}
              <div className="pt-2.5 border-t border-[#1C1A17]/10 flex items-center justify-between gap-2 mt-auto">
                <div className="flex flex-col">
                  <span className="text-base font-bold font-mono-tech text-[#1C1A17]">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-[11px] font-mono-tech text-[#1C1A17]/40 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => onAddToCart(product)}
                  className="py-1.5 px-3 rounded-xl bg-[#1C1A17] text-[#FAF8F5] text-xs font-semibold hover:bg-[#33302B] active:scale-95 flex items-center gap-1.5 transition-all shadow-2xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#E2B857]" />
                  <span>Add</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* View All Button */}
      <div className="mt-8 text-center">
        <button
          onClick={onExploreCatalog}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#1C1A17]/15 text-[#1C1A17] text-xs font-semibold hover:border-[#1C1A17] keycap-shadow transition-all"
        >
          <span>View All Handcrafted Products</span>
          <ArrowRight className="w-4 h-4 text-[#E2B857]" />
        </button>
      </div>
    </section>
  );
};
