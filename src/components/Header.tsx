import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  Volume2, 
  Sliders, 
  Menu, 
  X, 
  Sparkles,
  User,
  PhoneCall,
  ChevronDown,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { DoodleLogo } from './DoodleLogo';
import { CartItem } from '../types';
import { CATEGORY_TREE, ParentCategory } from '../data/categoryTree';

interface HeaderProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onSelectCategory: (catId: string) => void;
  selectedCategory: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenSoundTester: () => void;
  onOpenAuthModal: () => void;
  wishlistCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  cartItems,
  onOpenCart,
  onSelectCategory,
  selectedCategory,
  searchQuery,
  setSearchQuery,
  onOpenSoundTester,
  onOpenAuthModal,
  wishlistCount,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>('keyboards');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubcategoryClick = (categoryId: string, filterTag?: string) => {
    onSelectCategory(categoryId);
    if (filterTag) {
      setSearchQuery(filterTag);
    }
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#1C1A17]/10 transition-all">
      {/* Top Announcement Bar with Hotline */}
      <div className="bg-[#1C1A17] text-[#FAF8F5] py-1.5 px-4 text-xs font-mono-tech flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="inline-block w-2 h-2 rounded-full bg-[#E2B857] animate-pulse"></span>
          <span>Free Shipping on Orders Over $50 • Code <b>TINY10</b> for 10% Off!</span>
        </div>
        
        {/* Hotline Contact */}
        <div className="hidden md:flex items-center gap-4 text-xs opacity-90">
          <a 
            href="tel:18008469832" 
            className="flex items-center gap-1.5 hover:text-[#E2B857] transition-colors font-semibold"
            title="Call Tinytech Support Hotline"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#E2B857]" />
            <span>Hotline: 1-800-TINY-TECH (846-9832)</span>
          </a>
          <span>•</span>
          <span>🚚 Express Worldwide Shipping</span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Mobile Menu Toggle & Logo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-[#1C1A17]/20 hover:bg-[#EFEADF] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center shrink-0"
              title="TinyTech Studio - Home"
            >
              <DoodleLogo size="sm" showDoodles={true} />
            </a>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1C1A17]/50" />
              <input
                type="text"
                placeholder="Search keycaps, gasket boards, coiled cables..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full bg-[#EFEADF]/80 focus:bg-white text-sm text-[#1C1A17] pl-10 pr-4 py-2 rounded-full border border-[#1C1A17]/20 focus:outline-none focus:ring-2 focus:ring-[#1C1A17] transition-all placeholder:text-[#1C1A17]/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#1C1A17]/50 hover:text-[#1C1A17]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Header Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Interactive Sound Tester Trigger */}
            <button
              onClick={onOpenSoundTester}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#1C1A17]/20 bg-white hover:bg-[#1C1A17] hover:text-[#FAF8F5] text-xs font-semibold shadow-xs transition-all"
              title="Test mechanical switch sound signatures"
            >
              <Volume2 className="w-4 h-4 text-[#E2B857]" />
              <span className="font-mono-tech">Sound Studio</span>
            </button>

            {/* Login / Register Button */}
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1C1A17] text-[#FAF8F5] hover:bg-[#33302B] text-xs font-semibold shadow-xs transition-all"
            >
              <User className="w-4 h-4 text-[#E2B857]" />
              <span>Login / Register</span>
            </button>

            {/* Wishlist Button */}
            <button className="relative p-2 rounded-full hover:bg-[#EFEADF] transition-colors text-[#1C1A17]">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#1C1A17] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1C1A17] text-[#FAF8F5] shadow-xs hover:scale-105 active:scale-95 transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-[#E2B857]" />
              <span className="text-xs font-bold font-mono-tech">
                {totalCartCount > 0 ? `${totalCartCount} Items` : 'Cart'}
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Category Navigation */}
        <nav className="hidden lg:flex items-center justify-center gap-2 mt-3 pt-2 border-t border-[#1C1A17]/10 relative">
          
          {/* All Products Tab */}
          <button
            onClick={() => {
              onSelectCategory('all');
              setSearchQuery('');
              setActiveDropdown(null);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === 'all' && !searchQuery
                ? 'bg-[#1C1A17] text-[#FAF8F5] shadow-xs'
                : 'text-[#1C1A17]/80 hover:bg-[#EFEADF] hover:text-[#1C1A17]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E2B857]" />
            <span>All Products</span>
          </button>

          {/* Parent Categories with Dropdowns */}
          {CATEGORY_TREE.map((parent) => {
            const Icon = parent.icon;
            const isSelected = selectedCategory === parent.id;
            const isOpen = activeDropdown === parent.id;

            return (
              <div
                key={parent.id}
                className="relative"
                onMouseEnter={() => setActiveDropdown(parent.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => {
                    onSelectCategory(parent.id);
                    setActiveDropdown(isOpen ? null : parent.id);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#1C1A17] text-[#FAF8F5] shadow-xs'
                      : 'text-[#1C1A17]/80 hover:bg-[#EFEADF] hover:text-[#1C1A17]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{parent.name}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#E2B857]' : 'opacity-60'}`} />
                </button>

                {/* Dropdown Menu Overlay */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[520px] bg-white border border-[#1C1A17]/15 rounded-2xl shadow-xl p-5 z-50 text-[#1C1A17] overflow-hidden"
                    >
                      {/* Header Info */}
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1C1A17]/10">
                        <div className="flex items-center gap-2">
                          <span className="p-1.5 rounded-lg bg-[#EFEADF] text-[#1C1A17]">
                            <Icon className="w-4 h-4 text-[#E2B857]" />
                          </span>
                          <div>
                            <h4 className="font-bold text-xs uppercase font-mono-tech tracking-wider text-[#1C1A17]">
                              {parent.name} Subcategories
                            </h4>
                            <p className="text-[11px] text-[#1C1A17]/60 line-clamp-1">{parent.description}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            onSelectCategory(parent.id);
                            setActiveDropdown(null);
                          }}
                          className="text-xs text-[#1C1A17] hover:text-[#E2B857] font-semibold flex items-center gap-1 transition-colors"
                        >
                          <span>Explore All</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Dropdown Content Grid */}
                      <div className="grid grid-cols-12 gap-4">
                        {/* Child Subcategories List (8 Cols) */}
                        <div className="col-span-7 space-y-1">
                          {parent.subcategories.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => handleSubcategoryClick(parent.id, sub.filterTag)}
                              className="w-full text-left p-2 rounded-xl hover:bg-[#FAF8F5] transition-all group flex items-start justify-between"
                            >
                              <div>
                                <span className="font-bold text-xs text-[#1C1A17] group-hover:text-[#E2B857] transition-colors flex items-center gap-1.5">
                                  {sub.name}
                                </span>
                                <p className="text-[10px] text-[#1C1A17]/60 line-clamp-1 mt-0.5">{sub.description}</p>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-[#1C1A17]/30 group-hover:text-[#1C1A17] group-hover:translate-x-0.5 transition-all mt-1 shrink-0" />
                            </button>
                          ))}
                        </div>

                        {/* Featured Highlight Card (5 Cols) */}
                        {parent.featuredHighlight && (
                          <div className="col-span-5 bg-[#FAF8F5] border border-[#1C1A17]/10 rounded-xl p-3.5 flex flex-col justify-between">
                            <div>
                              <span className="inline-block px-2 py-0.5 rounded-full bg-[#1C1A17] text-white text-[9px] font-bold font-mono-tech mb-2">
                                {parent.featuredHighlight.tag}
                              </span>
                              <h5 className="font-bold text-xs text-[#1C1A17] mb-1">
                                {parent.featuredHighlight.title}
                              </h5>
                              <p className="text-[10px] text-[#1C1A17]/70 leading-relaxed mb-3">
                                {parent.featuredHighlight.description}
                              </p>
                            </div>

                            <button
                              onClick={() => handleSubcategoryClick(parent.id, parent.featuredHighlight?.filterQuery)}
                              className="w-full py-1.5 px-2 bg-[#1C1A17] hover:bg-[#33302B] text-white rounded-lg text-[10px] font-bold font-mono-tech transition-colors text-center"
                            >
                              Find Featured Item
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu with Subcategories Accordion */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#FAF8F5] border-b border-[#1C1A17]/20 px-4 py-4 space-y-4 overflow-hidden"
          >
            {/* Mobile Search Bar */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1C1A17]/50" />
              <input
                type="text"
                placeholder="Search keycaps, switches, audio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#EFEADF] text-xs text-[#1C1A17] pl-10 pr-4 py-2 rounded-full border border-[#1C1A17]/20 focus:outline-none"
              />
            </div>

            {/* Parent & Child Category Accordions */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono-tech font-bold uppercase text-[#1C1A17]/50 tracking-wider px-1">
                Categories & Subcategories
              </div>

              {/* All Products */}
              <button
                onClick={() => {
                  onSelectCategory('all');
                  setSearchQuery('');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold border transition-all ${
                  selectedCategory === 'all' && !searchQuery
                    ? 'bg-[#1C1A17] text-white border-[#1C1A17]'
                    : 'bg-white border-[#1C1A17]/15 text-[#1C1A17]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E2B857]" />
                  <span>All Products Catalog</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Parent Category Accordion Items */}
              {CATEGORY_TREE.map((parent) => {
                const Icon = parent.icon;
                const isExpanded = expandedMobileCategory === parent.id;
                const isSelected = selectedCategory === parent.id;

                return (
                  <div key={parent.id} className="border border-[#1C1A17]/15 rounded-xl bg-white overflow-hidden">
                    <div
                      onClick={() => setExpandedMobileCategory(isExpanded ? null : parent.id)}
                      className={`flex items-center justify-between p-2.5 cursor-pointer select-none transition-colors ${
                        isSelected ? 'bg-[#1C1A17]/5 font-bold' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#E2B857]" />
                        <span className="text-xs font-bold text-[#1C1A17]">{parent.name}</span>
                        <span className="text-[10px] font-mono-tech px-1.5 py-0.2 rounded bg-[#EFEADF] text-[#1C1A17]/70">
                          {parent.subcategories.length}
                        </span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-[#1C1A17]/60 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>

                    {/* Collapsible Subcategory List */}
                    {isExpanded && (
                      <div className="bg-[#FAF8F5] p-2 space-y-1 border-t border-[#1C1A17]/10">
                        <button
                          onClick={() => {
                            onSelectCategory(parent.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full text-left p-2 rounded-lg text-xs font-bold text-[#1C1A17] hover:bg-[#EFEADF] flex items-center justify-between"
                        >
                          <span>View All {parent.name}</span>
                          <ArrowRight className="w-3 h-3 text-[#E2B857]" />
                        </button>

                        {parent.subcategories.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => handleSubcategoryClick(parent.id, sub.filterTag)}
                            className="w-full text-left p-2 rounded-lg text-xs text-[#1C1A17]/80 hover:text-[#1C1A17] hover:bg-white transition-colors flex items-center justify-between pl-4"
                          >
                            <span>{sub.name}</span>
                            <ChevronRight className="w-3 h-3 text-[#1C1A17]/30" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Sound Studio & Hotline Buttons */}
            <div className="pt-2 border-t border-[#1C1A17]/10 flex flex-col gap-2">
              <a
                href="tel:18008469832"
                className="flex items-center justify-center gap-2 py-2 px-3 bg-[#FAF8F5] border border-[#1C1A17]/20 rounded-xl text-xs font-semibold text-[#1C1A17]"
              >
                <PhoneCall className="w-4 h-4 text-[#E2B857]" />
                <span>Hotline: 1-800-TINY-TECH</span>
              </a>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onOpenSoundTester();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-[#EFEADF] rounded-xl text-xs font-semibold text-[#1C1A17]"
                >
                  <Volume2 className="w-4 h-4 text-[#E2B857]" />
                  <span>Sound Studio</span>
                </button>
                <button
                  onClick={() => {
                    onOpenAuthModal();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-[#1C1A17] text-white rounded-xl text-xs font-semibold"
                >
                  <User className="w-4 h-4 text-[#E2B857]" />
                  <span>Login / Register</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
