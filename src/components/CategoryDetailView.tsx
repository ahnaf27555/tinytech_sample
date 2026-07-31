import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  ChevronDown,
  Home,
  SlidersHorizontal,
  X,
  Star,
  Heart,
  Eye,
  ShoppingBag,
  Volume2,
  Check,
  RotateCcw,
  LayoutGrid,
  List,
  Sparkles,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { Product, Category, Brand } from '../types';
import { MOCK_BRANDS } from '../data/mockData';
import { CATEGORY_TREE } from '../data/categoryTree';
import { ProductCard } from './ProductCard';

interface CategoryDetailViewProps {
  category: Category;
  allCategories: Category[];
  products: Product[];
  onSelectCategory: (categoryId: string) => void;
  onBackToHome: () => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  onOpenQuickView: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
}

export const CategoryDetailView: React.FC<CategoryDetailViewProps> = ({
  category,
  allCategories,
  products,
  onSelectCategory,
  onBackToHome,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onOpenQuickView,
  onSelectProduct,
}) => {
  // Filters State
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedSoundProfile, setSelectedSoundProfile] = useState<string | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [minRating, setMinRating] = useState<number>(0);
  
  // Sorting State
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'reviews'>('featured');
  
  // View Layout
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Mobile Filter Drawer
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Audio preview playback
  const playSwitchSound = (profile?: string) => {
    if (!profile) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      let freq = 350;
      if (profile === 'Clicky') freq = 800;
      if (profile === 'Tactile') freq = 450;
      if (profile === 'Silent') freq = 200;

      osc.type = profile === 'Clicky' ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch {
      // Ignore audio errors if audio context restricted
    }
  };

  // Associated Brands for this category
  const categoryBrands = useMemo(() => {
    return MOCK_BRANDS.filter((b) => b.category === category.id);
  }, [category.id]);

  // All Category Products
  const categoryProducts = useMemo(() => {
    return products.filter((p) => p.category === category.id);
  }, [products, category.id]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((p) => {
      // Brand filter
      if (selectedBrand && p.brand !== selectedBrand) return false;

      // Sound profile filter
      if (selectedSoundProfile && p.soundProfile !== selectedSoundProfile) return false;

      // Badge filter
      if (selectedBadge && p.badge !== selectedBadge) return false;

      // Stock filter
      if (inStockOnly && !p.inStock) return false;

      // Price filter
      if (p.price < minPrice || p.price > maxPrice) return false;

      // Rating filter
      if (minRating > 0 && p.rating < minRating) return false;

      return true;
    });
  }, [categoryProducts, selectedBrand, selectedSoundProfile, selectedBadge, inStockOnly, minPrice, maxPrice, minRating]);

  // Sorted Products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-asc') {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'rating') {
      return list.sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === 'reviews') {
      return list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }
    return list; // featured
  }, [filteredProducts, sortBy]);

  // Active Filter Count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedBrand) count++;
    if (selectedSoundProfile) count++;
    if (selectedBadge) count++;
    if (inStockOnly) count++;
    if (minPrice > 0 || maxPrice < 300) count++;
    if (minRating > 0) count++;
    return count;
  }, [selectedBrand, selectedSoundProfile, selectedBadge, inStockOnly, minPrice, maxPrice, minRating]);

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedBrand(null);
    setSelectedSoundProfile(null);
    setSelectedBadge(null);
    setInStockOnly(false);
    setMinPrice(0);
    setMaxPrice(300);
    setMinRating(0);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1A17] pb-16">
      {/* Minimalistic Header Banner */}
      <div className="bg-[#1C1A17] text-[#FAF8F5] py-4 px-4 sm:px-6 lg:px-8 border-b border-[#1C1A17]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Left: Breadcrumbs & Minimal Category Title */}
          <div>
            <nav className="flex items-center gap-1.5 text-[11px] font-mono-tech text-[#FAF8F5]/60 mb-1 flex-wrap">
              <button
                onClick={onBackToHome}
                className="flex items-center gap-1 hover:text-[#E2B857] transition-colors"
              >
                <Home className="w-3 h-3" />
                <span>Home</span>
              </button>
              <ChevronRight className="w-3 h-3 text-[#FAF8F5]/30" />
              <button onClick={onBackToHome} className="hover:text-[#E2B857] transition-colors">
                Categories
              </button>
              <ChevronRight className="w-3 h-3 text-[#FAF8F5]/30" />
              <span className="text-[#E2B857] font-semibold">{category.name}</span>
            </nav>

            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold font-handwritten text-[#FAF8F5] tracking-wide">
                {category.name}
              </h1>
              <span className="text-xs font-mono-tech text-[#1C1A17] font-bold bg-[#E2B857] px-2.5 py-0.5 rounded-full">
                {categoryProducts.length} Items
              </span>
            </div>
          </div>

          {/* Right: Quick Compact Category Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-[11px] font-mono-tech text-[#FAF8F5]/40 whitespace-nowrap mr-1 hidden sm:inline">
              Switch:
            </span>
            {allCategories.map((cat) => {
              const isActive = cat.id === category.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    handleResetFilters();
                    onSelectCategory(cat.id);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#E2B857] text-[#1C1A17] font-bold'
                      : 'bg-white/10 hover:bg-white/20 text-[#FAF8F5]/80'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Compact Horizontal Brand Filter Bar */}
        {categoryBrands.length > 0 && (
          <div className="mb-4 flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs">
            <span className="text-xs font-mono-tech font-bold uppercase text-[#1C1A17]/50 whitespace-nowrap shrink-0 flex items-center gap-1">
              <span>Brands:</span>
            </span>

            <button
              onClick={() => setSelectedBrand(null)}
              className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap border transition-all shrink-0 ${
                selectedBrand === null
                  ? 'bg-[#1C1A17] text-white border-[#1C1A17]'
                  : 'bg-white text-[#1C1A17] border-[#1C1A17]/15 hover:border-[#1C1A17]/40'
              }`}
            >
              All Brands ({categoryProducts.length})
            </button>

            {categoryBrands.map((b) => {
              const isSelected = selectedBrand === b.name;
              const count = categoryProducts.filter((p) => p.brand === b.name).length;
              return (
                <button
                  key={b.id}
                  onClick={() => setSelectedBrand(isSelected ? null : b.name)}
                  className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap border flex items-center gap-1.5 transition-all shrink-0 ${
                    isSelected
                      ? 'bg-[#1C1A17] text-white border-[#1C1A17]'
                      : 'bg-white text-[#1C1A17] border-[#1C1A17]/15 hover:border-[#1C1A17]/40'
                  }`}
                >
                  <span>{b.logoIcon}</span>
                  <span>{b.name}</span>
                  <span className={`text-[10px] font-mono-tech px-1.5 py-0.2 rounded ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#FAF8F5] text-[#1C1A17]/60'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Toolbar Bar: Filter Toggle, Item Count, Sort Dropdown & Layout Mode */}
        <div className="bg-white border border-[#1C1A17]/10 rounded-2xl p-4 mb-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            {/* Filter Drawer Toggle Button for Mobile / Desktop */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1C1A17] text-[#FAF8F5] text-xs font-semibold hover:bg-[#33302B] transition-all shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#E2B857]" />
              <span>Filter Options</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#E2B857] text-[#1C1A17] font-bold text-[10px] flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Results Count */}
            <span className="text-xs font-mono-tech text-[#1C1A17]/70">
              Showing <strong className="text-[#1C1A17] font-bold">{sortedProducts.length}</strong> of{' '}
              {categoryProducts.length} items
            </span>
          </div>

          {/* Active Filter Chips */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
              {selectedBrand && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EFEADF] text-[#1C1A17] text-xs font-semibold border border-[#1C1A17]/10">
                  Brand: {selectedBrand}
                  <button onClick={() => setSelectedBrand(null)} className="hover:text-rose-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedSoundProfile && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EFEADF] text-[#1C1A17] text-xs font-semibold border border-[#1C1A17]/10">
                  Sound: {selectedSoundProfile}
                  <button onClick={() => setSelectedSoundProfile(null)} className="hover:text-rose-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedBadge && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EFEADF] text-[#1C1A17] text-xs font-semibold border border-[#1C1A17]/10">
                  Badge: {selectedBadge}
                  <button onClick={() => setSelectedBadge(null)} className="hover:text-rose-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {inStockOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EFEADF] text-[#1C1A17] text-xs font-semibold border border-[#1C1A17]/10">
                  In Stock Only
                  <button onClick={() => setInStockOnly(false)} className="hover:text-rose-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={handleResetFilters}
                className="text-xs text-rose-600 hover:underline font-bold flex items-center gap-1 ml-auto md:ml-0"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            </div>
          )}

          {/* Sort Dropdown & Layout Mode Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-tech text-[#1C1A17]/60 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-[#FAF8F5] border border-[#1C1A17]/20 rounded-xl px-3 py-1.5 text-xs font-semibold text-[#1C1A17] focus:outline-none focus:border-[#1C1A17]"
              >
                <option value="featured">Featured / Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Popular</option>
              </select>
            </div>

            {/* Grid / List Switcher */}
            <div className="flex items-center bg-[#FAF8F5] p-1 rounded-xl border border-[#1C1A17]/15">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-[#1C1A17] text-[#FAF8F5]' : 'text-[#1C1A17]/60 hover:text-[#1C1A17]'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-[#1C1A17] text-[#FAF8F5]' : 'text-[#1C1A17]/60 hover:text-[#1C1A17]'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Filters Sidebar + Product Display */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar (Static left column on lg screen) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white border border-[#1C1A17]/10 rounded-2xl p-5 sticky top-24 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#1C1A17]/10">
                <h3 className="font-bold text-base font-handwritten flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#E2B857]" />
                  <span>Filter Products</span>
                </h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-rose-600 hover:underline font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Brand Filter */}
              {categoryBrands.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono-tech font-bold uppercase text-[#1C1A17]/60 mb-2.5">
                    Brand / Maker
                  </h4>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {categoryBrands.map((b) => (
                      <label
                        key={b.id}
                        className="flex items-center justify-between p-1.5 rounded-lg hover:bg-[#FAF8F5] cursor-pointer text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedBrand === b.name}
                            onChange={() => setSelectedBrand(selectedBrand === b.name ? null : b.name)}
                            className="rounded accent-[#1C1A17]"
                          />
                          <span className="font-medium text-[#1C1A17]">{b.name}</span>
                        </div>
                        <span className="text-[10px] font-mono-tech text-[#1C1A17]/40">
                          {categoryProducts.filter((p) => p.brand === b.name).length}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range Filter */}
              <div>
                <h4 className="text-xs font-mono-tech font-bold uppercase text-[#1C1A17]/60 mb-2.5">
                  Price Range (${minPrice} - ${maxPrice})
                </h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min={0}
                    max={300}
                    step={10}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#1C1A17]"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="w-full bg-[#FAF8F5] border border-[#1C1A17]/20 rounded-lg p-1.5 text-xs text-center font-mono-tech"
                      placeholder="Min $"
                    />
                    <span className="text-xs text-[#1C1A17]/40">-</span>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full bg-[#FAF8F5] border border-[#1C1A17]/20 rounded-lg p-1.5 text-xs text-center font-mono-tech"
                      placeholder="Max $"
                    />
                  </div>
                </div>
              </div>

              {/* In-Stock Filter Toggle */}
              <div className="pt-2 border-t border-[#1C1A17]/10">
                <label className="flex items-center justify-between cursor-pointer py-1">
                  <span className="text-xs font-semibold text-[#1C1A17]">In-Stock Items Only</span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#1C1A17]"
                  />
                </label>
              </div>

              {/* Switch Sound Profile Filter */}
              {(category.id === 'keyboards' || category.id === 'keycaps') && (
                <div className="pt-2 border-t border-[#1C1A17]/10">
                  <h4 className="text-xs font-mono-tech font-bold uppercase text-[#1C1A17]/60 mb-2.5">
                    Acoustic Sound Profile
                  </h4>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['Linear', 'Tactile', 'Clicky', 'Silent'].map((sound) => {
                      const isSelected = selectedSoundProfile === sound;
                      return (
                        <button
                          key={sound}
                          onClick={() => setSelectedSoundProfile(isSelected ? null : sound)}
                          className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                            isSelected
                              ? 'bg-[#1C1A17] text-[#FAF8F5] border-[#1C1A17]'
                              : 'bg-[#FAF8F5] text-[#1C1A17] border-[#1C1A17]/15 hover:border-[#1C1A17]/30'
                          }`}
                        >
                          {sound}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Badge Filter */}
              <div className="pt-2 border-t border-[#1C1A17]/10">
                <h4 className="text-xs font-mono-tech font-bold uppercase text-[#1C1A17]/60 mb-2.5">
                  Special Badges
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {['Artisan', 'Bestseller', 'Limited Edition', 'Staff Pick'].map((badge) => {
                    const isSelected = selectedBadge === badge;
                    return (
                      <button
                        key={badge}
                        onClick={() => setSelectedBadge(isSelected ? null : badge)}
                        className={`py-1 px-2.5 rounded-full text-[11px] font-mono-tech font-bold transition-all ${
                          isSelected
                            ? 'bg-[#E2B857] text-[#1C1A17]'
                            : 'bg-[#FAF8F5] border border-[#1C1A17]/20 text-[#1C1A17]/70 hover:text-[#1C1A17]'
                        }`}
                      >
                        {badge}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Minimum Rating */}
              <div className="pt-2 border-t border-[#1C1A17]/10">
                <h4 className="text-xs font-mono-tech font-bold uppercase text-[#1C1A17]/60 mb-2">
                  Minimum Rating
                </h4>
                <div className="space-y-1">
                  {[4.8, 4.5, 4.0].map((star) => (
                    <button
                      key={star}
                      onClick={() => setMinRating(minRating === star ? 0 : star)}
                      className={`w-full flex items-center gap-1.5 p-1.5 rounded-lg text-xs transition-colors ${
                        minRating === star ? 'bg-[#EFEADF] font-bold' : 'hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <Star className="w-3.5 h-3.5 fill-[#E2B857] text-[#E2B857]" />
                      <span>{star} Stars & Above</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Right Slide-Over Sidebar Drawer */}
          <AnimatePresence>
            {isMobileFilterOpen && (
              <>
                {/* Backdrop Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 lg:hidden"
                />

                {/* Slide-Over Right Drawer Panel */}
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                  className="fixed top-0 right-0 bottom-0 w-[310px] sm:w-[360px] bg-white text-[#1C1A17] z-50 shadow-2xl flex flex-col justify-between overflow-y-auto lg:hidden"
                >
                  <div className="p-5 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#1C1A17]/10">
                      <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-5 h-5 text-[#E2B857]" />
                        <h3 className="font-bold text-base font-handwritten">Filter & Navigation</h3>
                      </div>
                      <button
                        onClick={() => setIsMobileFilterOpen(false)}
                        className="p-1.5 rounded-full hover:bg-[#FAF8F5] text-[#1C1A17]/70"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Switch Category Hierarchy Nav */}
                    <div>
                      <h4 className="text-xs font-mono-tech font-bold uppercase text-[#1C1A17]/60 mb-2.5 tracking-wider">
                        Quick Category Switcher
                      </h4>
                      <div className="grid grid-cols-2 gap-1.5">
                        {allCategories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              onSelectCategory(cat.id);
                              setIsMobileFilterOpen(false);
                            }}
                            className={`p-2 rounded-xl text-xs font-bold border text-left transition-all ${
                              cat.id === category.id
                                ? 'bg-[#1C1A17] text-white border-[#1C1A17]'
                                : 'bg-[#FAF8F5] border-[#1C1A17]/15 text-[#1C1A17]'
                            }`}
                          >
                            <span>{cat.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Brand Filter */}
                    {categoryBrands.length > 0 && (
                      <div>
                        <h4 className="text-xs font-mono-tech font-bold uppercase text-[#1C1A17]/60 mb-2.5">
                          Brand / Maker
                        </h4>
                        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                          {categoryBrands.map((b) => (
                            <label
                              key={b.id}
                              className="flex items-center justify-between p-1.5 rounded-lg hover:bg-[#FAF8F5] cursor-pointer text-xs"
                            >
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={selectedBrand === b.name}
                                  onChange={() => setSelectedBrand(selectedBrand === b.name ? null : b.name)}
                                  className="rounded accent-[#1C1A17]"
                                />
                                <span className="font-medium text-[#1C1A17]">{b.name}</span>
                              </div>
                              <span className="text-[10px] font-mono-tech text-[#1C1A17]/40">
                                {categoryProducts.filter((p) => p.brand === b.name).length}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Price Range */}
                    <div>
                      <h4 className="text-xs font-mono-tech font-bold uppercase text-[#1C1A17]/60 mb-2.5">
                        Price Range (${minPrice} - ${maxPrice})
                      </h4>
                      <input
                        type="range"
                        min={0}
                        max={300}
                        step={10}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full accent-[#1C1A17]"
                      />
                    </div>

                    {/* In-Stock Toggle */}
                    <div className="pt-2 border-t border-[#1C1A17]/10">
                      <label className="flex items-center justify-between cursor-pointer py-1">
                        <span className="text-xs font-semibold text-[#1C1A17]">In-Stock Items Only</span>
                        <input
                          type="checkbox"
                          checked={inStockOnly}
                          onChange={(e) => setInStockOnly(e.target.checked)}
                          className="w-4 h-4 rounded accent-[#1C1A17]"
                        />
                      </label>
                    </div>

                    {/* Sound Profile */}
                    {(category.id === 'keyboards' || category.id === 'keycaps') && (
                      <div className="pt-2 border-t border-[#1C1A17]/10">
                        <h4 className="text-xs font-mono-tech font-bold uppercase text-[#1C1A17]/60 mb-2.5">
                          Sound Profile
                        </h4>
                        <div className="grid grid-cols-2 gap-1.5">
                          {['Linear', 'Tactile', 'Clicky', 'Silent'].map((sound) => {
                            const isSelected = selectedSoundProfile === sound;
                            return (
                              <button
                                key={sound}
                                onClick={() => setSelectedSoundProfile(isSelected ? null : sound)}
                                className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                                  isSelected
                                    ? 'bg-[#1C1A17] text-[#FAF8F5] border-[#1C1A17]'
                                    : 'bg-[#FAF8F5] text-[#1C1A17] border-[#1C1A17]/15'
                                }`}
                              >
                                {sound}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sticky Footer Buttons */}
                  <div className="p-4 border-t border-[#1C1A17]/10 bg-[#FAF8F5] flex gap-2">
                    <button
                      onClick={handleResetFilters}
                      className="flex-1 py-2.5 px-3 rounded-xl border border-[#1C1A17]/20 text-xs font-bold text-[#1C1A17] hover:bg-white transition-colors flex items-center justify-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                    <button
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="flex-2 py-2.5 px-4 rounded-xl bg-[#1C1A17] text-white text-xs font-bold shadow-xs hover:bg-[#33302B] transition-colors text-center"
                    >
                      Apply ({sortedProducts.length})
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Product Cards Container */}
          <div className="lg:col-span-3">
            {sortedProducts.length === 0 ? (
              <div className="bg-white border border-[#1C1A17]/10 rounded-2xl p-12 text-center max-w-md mx-auto my-8">
                <div className="w-16 h-16 bg-[#FAF8F5] border border-[#1C1A17]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  🔍
                </div>
                <h3 className="text-xl font-bold font-handwritten text-[#1C1A17]">
                  No Products Found
                </h3>
                <p className="text-xs text-[#1C1A17]/60 mt-1 mb-6">
                  No items match your currently selected filters in {category.name}.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-[#1C1A17] text-[#FAF8F5] rounded-xl text-xs font-semibold hover:bg-[#33302B] transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* Grid Layout */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence>
                  {sortedProducts.map((product) => {
                    const isWishlisted = wishlistIds.includes(product.id);
                    return (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
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
                </AnimatePresence>
              </div>
            ) : (
              /* List Layout */
              <div className="space-y-4">
                {sortedProducts.map((product) => {
                  const isWishlisted = wishlistIds.includes(product.id);
                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-[#1C1A17]/10 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-5"
                    >
                      {/* Image Thumbnail */}
                      <div className="relative w-full md:w-44 aspect-square rounded-xl bg-[#FAF8F5] overflow-hidden shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        {product.badge && (
                          <span className="absolute top-2 left-2 bg-[#1C1A17] text-white text-[10px] font-bold font-mono-tech px-2 py-0.5 rounded-full">
                            {product.badge}
                          </span>
                        )}
                        <span className="absolute bottom-2 right-2 text-base p-1 bg-white/90 backdrop-blur-sm rounded-lg border border-[#1C1A17]/10">
                          {product.doodleIcon}
                        </span>
                      </div>

                      {/* Product Content Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-mono-tech text-[#1C1A17]/50 font-bold uppercase">
                            {product.brand || 'Tinytech Studio'}
                          </span>
                          <div className="flex items-center gap-1 text-xs font-mono-tech">
                            <Star className="w-3.5 h-3.5 fill-[#E2B857] text-[#E2B857]" />
                            <span className="font-bold text-[#1C1A17]">{product.rating}</span>
                            <span className="text-[#1C1A17]/40">({product.reviewsCount} reviews)</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold font-handwritten text-[#1C1A17] mb-1.5">
                          {product.name}
                        </h3>

                        <p className="text-xs text-[#1C1A17]/70 line-clamp-2 mb-3">
                          {product.description}
                        </p>

                        {/* Specs Pill tags */}
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          {Object.entries(product.specs).slice(0, 3).map(([key, val]) => (
                            <span key={key} className="text-[10px] font-mono-tech px-2 py-0.5 bg-[#FAF8F5] border border-[#1C1A17]/10 rounded-md text-[#1C1A17]/80">
                              <b>{key}:</b> {val}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right Action & Price Column */}
                      <div className="w-full md:w-48 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-[#1C1A17]/10 md:pl-5 flex flex-col justify-between h-full gap-3">
                        <div>
                          <div className="text-xl font-bold font-mono-tech text-[#1C1A17]">
                            ${product.price.toFixed(2)}
                          </div>
                          {product.originalPrice && (
                            <div className="text-xs font-mono-tech text-[#1C1A17]/40 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </div>
                          )}
                          <span className="text-[10px] text-emerald-600 font-bold font-mono-tech block mt-0.5">
                            {product.inStock ? '✓ Ready to ship' : 'Out of Stock'}
                          </span>
                        </div>

                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => onAddToCart(product)}
                            className="w-full py-2 px-3 rounded-xl bg-[#1C1A17] text-[#FAF8F5] text-xs font-semibold hover:bg-[#33302B] active:scale-95 flex items-center justify-center gap-2 transition-all shadow-2xs"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 text-[#E2B857]" />
                            <span>Add to Cart</span>
                          </button>

                          <div className="flex gap-2">
                            <button
                              onClick={() => onOpenQuickView(product)}
                              className="flex-1 py-1.5 border border-[#1C1A17]/20 rounded-lg text-xs font-semibold hover:bg-[#FAF8F5] transition-colors flex items-center justify-center gap-1"
                            >
                              <Eye className="w-3 h-3 text-[#1C1A17]" />
                              <span>View</span>
                            </button>
                            <button
                              onClick={() => onToggleWishlist(product.id)}
                              className={`p-1.5 border rounded-lg transition-colors ${
                                isWishlisted ? 'bg-rose-50 border-rose-300 text-rose-500' : 'hover:bg-[#FAF8F5]'
                              }`}
                            >
                              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
