import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  SlidersHorizontal,
  SearchX,
  X,
  Check,
  RotateCcw,
  Flame,
  Zap,
  Tag,
  Star,
  ArrowRight
} from 'lucide-react';
import { Product, Category } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  sectionId?: string;
  title?: string;
  badgeText?: string;
  categoryFilter?: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  products: Product[];
  categories?: Category[];
  searchQuery?: string;
  onOpenQuickView: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
}

type QuickFilter = 'bestselling' | 'hot-deals' | 'sales' | 'new-arrivals';

export const ProductCatalogSection: React.FC<ProductCatalogProps> = ({
  sectionId = 'catalog-section',
  title = 'Handcrafted Accessories & Gear',
  badgeText = 'Artisan Catalog',
  categoryFilter,
  actionButton,
  products,
  searchQuery = '',
  onOpenQuickView,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [quickFilter, setQuickFilter] = useState<QuickFilter>('bestselling');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter products by category, search query, quick filter tab & tag
  const filteredProducts = useMemo(() => {
    // 1. Filter by category if categoryFilter is specified
    let categoryProducts = products;
    if (categoryFilter && categoryFilter !== 'all') {
      categoryProducts = products.filter((p) => p.category === categoryFilter);
    }

    // 2. Apply search, quick filter & tag
    const result = categoryProducts.filter((p) => {
      // Search query match
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      // Quick Filter tab match
      let matchesQuickFilter = true;
      if (quickFilter === 'bestselling') {
        matchesQuickFilter = p.badge === 'Bestseller' || p.reviewsCount >= 20 || p.rating >= 4.7;
      } else if (quickFilter === 'hot-deals') {
        matchesQuickFilter =
          p.badge === 'Limited Edition' ||
          p.badge === 'Artisan' ||
          Boolean(p.originalPrice && p.originalPrice > p.price) ||
          p.tags.some((t) => ['artisan', 'limited', 'hot', 'resin', 'custom'].includes(t.toLowerCase()));
      } else if (quickFilter === 'sales') {
        matchesQuickFilter = Boolean(p.originalPrice && p.originalPrice > p.price) || p.badge === 'Sale';
      } else if (quickFilter === 'new-arrivals') {
        matchesQuickFilter =
          p.badge === 'New Arrival' ||
          p.badge === 'Staff Pick' ||
          p.tags.some((t) => t.toLowerCase().includes('new'));
      }

      // Feature Tag match
      const matchesTag =
        !selectedTag || p.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase()));

      return matchesSearch && matchesQuickFilter && matchesTag;
    });

    // Fallback: If quickFilter produced 0 items for a specific category, show all products in that category
    if (result.length === 0 && categoryProducts.length > 0 && !searchQuery && !selectedTag) {
      return categoryProducts;
    }

    return result;
  }, [products, categoryFilter, searchQuery, quickFilter, selectedTag]);

  const activeFiltersCount = (quickFilter !== 'bestselling' ? 1 : 0) + (selectedTag ? 1 : 0);

  const handleResetFilters = () => {
    setQuickFilter('bestselling');
    setSelectedTag(null);
  };

  const filterTabs = [
    { id: 'bestselling', label: 'Best Selling', icon: Flame },
    { id: 'hot-deals', label: 'Hot Deals', icon: Zap },
    { id: 'sales', label: 'Sales & Discounts', icon: Tag },
    { id: 'new-arrivals', label: 'New Arrivals', icon: Star },
  ] as const;

  return (
    <section id={sectionId} className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-[#1C1A17]/10">
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono-tech font-bold uppercase text-[#1C1A17]/60 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#E2B857]" />
              <span>{badgeText}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-handwritten text-[#1C1A17]">
              {title}
            </h2>
          </div>

          {/* Mobile Filter Trigger Button */}
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="md:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1C1A17] text-[#FAF8F5] text-xs font-bold shadow-xs hover:bg-[#33302B] transition-all shrink-0 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#E2B857]" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#E2B857] text-[#1C1A17] font-bold text-[10px] flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Top Action Button (Navigates to Category or All Products) */}
        {actionButton && (
          <div className="flex items-center justify-start md:justify-end shrink-0">
            <button
              onClick={actionButton.onClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1C1A17] text-[#FAF8F5] text-xs font-bold hover:bg-[#33302B] transition-all shadow-2xs group cursor-pointer"
            >
              <span>{actionButton.label}</span>
              <ArrowRight className="w-4 h-4 text-[#E2B857] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>

      {/* Quick Filter Options Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
        {filterTabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = quickFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setQuickFilter(tab.id as QuickFilter);
                setSelectedTag(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#1C1A17] text-[#FAF8F5] shadow-sm'
                  : 'bg-white border border-[#1C1A17]/15 text-[#1C1A17] hover:bg-[#FAF8F5]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#E2B857]' : 'text-[#1C1A17]/60'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile Filter Slide-Over Sidebar */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 md:hidden"
            />

            {/* Slide-Over Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-[310px] sm:w-[360px] bg-white text-[#1C1A17] z-50 shadow-2xl flex flex-col justify-between overflow-y-auto md:hidden"
            >
              <div className="p-5 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#1C1A17]/10">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-[#E2B857]" />
                    <h3 className="font-bold text-base font-handwritten">Filter Options</h3>
                  </div>
                  <button
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="p-1.5 rounded-full hover:bg-[#FAF8F5] text-[#1C1A17]/70"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Filter Options */}
                <div>
                  <h4 className="text-xs font-mono-tech font-bold uppercase text-[#1C1A17]/60 mb-3 tracking-wider">
                    Catalog Filters
                  </h4>
                  <div className="space-y-1.5">
                    {filterTabs.map((tab) => {
                      const Icon = tab.icon;
                      const isSelected = quickFilter === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setQuickFilter(tab.id as QuickFilter);
                            setSelectedTag(null);
                          }}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold border transition-all ${
                            isSelected
                              ? 'bg-[#1C1A17] text-white border-[#1C1A17]'
                              : 'bg-[#FAF8F5] border-[#1C1A17]/15 text-[#1C1A17]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 ${isSelected ? 'text-[#E2B857]' : 'text-[#1C1A17]/60'}`} />
                            <span>{tab.label}</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#E2B857]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Popular Feature Tags */}
                <div>
                  <h4 className="text-xs font-mono-tech font-bold uppercase text-[#1C1A17]/60 mb-2.5 tracking-wider">
                    Feature Tags
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['Gasket Mount', 'Wireless', 'PBT', 'Artisan', 'Headphones', 'Microphone', '75%'].map((tag) => {
                      const isSelected = selectedTag === tag;
                      return (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(isSelected ? null : tag)}
                          className={`py-1 px-2.5 rounded-lg text-xs font-semibold border transition-all ${
                            isSelected
                              ? 'bg-[#1C1A17] text-[#FAF8F5] border-[#1C1A17]'
                              : 'bg-[#FAF8F5] text-[#1C1A17] border-[#1C1A17]/15 hover:bg-white'
                          }`}
                        >
                          #{tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Drawer Sticky Footer */}
              <div className="p-4 border-t border-[#1C1A17]/10 bg-[#FAF8F5] flex gap-2">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-[#1C1A17]/20 text-xs font-bold text-[#1C1A17] hover:bg-white transition-colors flex items-center justify-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="flex-2 py-2.5 px-4 rounded-xl bg-[#1C1A17] text-white text-xs font-bold shadow-xs hover:bg-[#33302B] transition-colors text-center"
                >
                  Apply Filters ({filteredProducts.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Grid of Product Cards */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white border border-[#1C1A17]/10 rounded-2xl p-8">
          <SearchX className="w-12 h-12 mx-auto text-[#1C1A17]/30 mb-3" />
          <h3 className="text-lg font-bold text-[#1C1A17] mb-1">No matching products</h3>
          <p className="text-xs text-[#1C1A17]/60 max-w-md mx-auto mb-4">
            Try adjusting your quick filter selection or clearing active search keywords.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-[#1C1A17] text-white text-xs font-bold hover:bg-[#33302B] transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard
                  product={product}
                  onOpenQuickView={onOpenQuickView}
                  onSelectProduct={onSelectProduct}
                  onAddToCart={onAddToCart}
                  isWishlisted={isWishlisted}
                  onToggleWishlist={onToggleWishlist}
                />
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
};
