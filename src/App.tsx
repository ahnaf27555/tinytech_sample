import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { CategorySection } from './components/CategorySection';
import { ProductCatalogSection } from './components/ProductCatalogSection';
import { InteractiveSoundTester } from './components/InteractiveSoundTester';
import { DeskSetupsGallery } from './components/DeskSetupsGallery';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CategoryDetailView } from './components/CategoryDetailView';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { FloatingMascot } from './components/FloatingMascot';
import { Footer } from './components/Footer';
import { DoodleBackground } from './components/DoodleBackground';

import { MOCK_PRODUCTS, MOCK_CATEGORIES } from './data/mockData';
import { Product, CartItem } from './types';
import { playSwitchSound } from './utils/audioSynth';
import confetti from 'canvas-confetti';

export default function App() {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [categories] = useState(MOCK_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: MOCK_PRODUCTS[0], quantity: 1, selectedColor: 'Chalk White' }, // Pre-seed 1 item for nice demo
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['p1', 'p2']);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSoundTesterOpen, setIsSoundTesterOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Active Selected Category Object if viewing a category page
  const activeCategoryObj = categories.find((c) => c.id === selectedCategory);

  // Category selection handler
  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedProduct(null); // Return to list view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Product selection handler
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart handlers
  const handleAddToCart = (
    product: Product,
    quantity: number = 1,
    selectedColor?: string
  ) => {
    // Play sound click feedback
    playSwitchSound(product.soundProfile || 'Tactile');

    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === (selectedColor || item.selectedColor)
      );

      if (existingIdx > -1) {
        const updated = [...prevItems];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            product,
            quantity,
            selectedColor: selectedColor || product.colorVariants?.[0]?.name,
          },
        ];
      }
    });

    // Small celebratory confetti burst
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#1C1A17', '#E2B857', '#FAF8F5'],
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist handler
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Scroll to catalog section on Home page
  const handleExploreCatalog = () => {
    const catalogElem = document.getElementById('catalog-section');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1A17] relative">
      {/* Scattered Doodle Art Background Layer */}
      <DoodleBackground />

      {/* Header Bar */}
      <Header
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenSoundTester={() => setIsSoundTesterOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        wishlistCount={wishlistIds.length}
      />

      {/* Main Content Areas */}
      <main className="flex-1 relative z-10">
        {selectedProduct ? (
          /* Dedicated Product Detail View */
          <ProductDetailPage
            product={selectedProduct}
            allProducts={products}
            onBackToCatalog={() => setSelectedProduct(null)}
            onSelectCategory={handleSelectCategory}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onOpenQuickView={(prod) => setQuickViewProduct(prod)}
          />
        ) : selectedCategory !== 'all' && activeCategoryObj ? (
          /* Dedicated Category Page View */
          <CategoryDetailView
            category={activeCategoryObj}
            allCategories={categories}
            products={products}
            onSelectCategory={handleSelectCategory}
            onBackToHome={() => handleSelectCategory('all')}
            onAddToCart={(prod) => handleAddToCart(prod, 1)}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onOpenQuickView={(prod) => setQuickViewProduct(prod)}
            onSelectProduct={handleSelectProduct}
          />
        ) : (
          /* Home Page Full View */
          <>
            {/* Sliding Hero Carousel */}
            <HeroCarousel
              onExploreCatalog={handleExploreCatalog}
              onOpenSoundTester={() => setIsSoundTesterOpen(true)}
              onSelectCategory={handleSelectCategory}
            />

            {/* Categories Showcase with Logos */}
            <CategorySection
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />

            {/* Featured Products Section */}
            <ProductCatalogSection
              sectionId="featured-products-section"
              title="Featured Products"
              badgeText="Handcrafted Showcase"
              actionButton={{
                label: 'View All Products',
                onClick: () => handleSelectCategory('keyboards'),
              }}
              products={products}
              categories={categories}
              searchQuery={searchQuery}
              onOpenQuickView={(prod) => setQuickViewProduct(prod)}
              onSelectProduct={handleSelectProduct}
              onAddToCart={(prod) => handleAddToCart(prod, 1)}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
            />

            {/* Featured Category: Keyboards */}
            <ProductCatalogSection
              sectionId="featured-keyboards-section"
              title="Featured Keyboards"
              badgeText="Mechanical Essentials"
              categoryFilter="keyboards"
              actionButton={{
                label: 'View All Keyboards',
                onClick: () => handleSelectCategory('keyboards'),
              }}
              products={products}
              categories={categories}
              searchQuery={searchQuery}
              onOpenQuickView={(prod) => setQuickViewProduct(prod)}
              onSelectProduct={handleSelectProduct}
              onAddToCart={(prod) => handleAddToCart(prod, 1)}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
            />

            {/* Featured Category: Keycaps */}
            <ProductCatalogSection
              sectionId="featured-keycaps-section"
              title="Featured Keycaps"
              badgeText="Custom Artisan Sets"
              categoryFilter="keycaps"
              actionButton={{
                label: 'View All Keycaps',
                onClick: () => handleSelectCategory('keycaps'),
              }}
              products={products}
              categories={categories}
              searchQuery={searchQuery}
              onOpenQuickView={(prod) => setQuickViewProduct(prod)}
              onSelectProduct={handleSelectProduct}
              onAddToCart={(prod) => handleAddToCart(prod, 1)}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
            />

            {/* Featured Category: Audio */}
            <ProductCatalogSection
              sectionId="featured-audio-section"
              title="Featured Desk Audio"
              badgeText="Acoustic Gear"
              categoryFilter="audio"
              actionButton={{
                label: 'View All Audio',
                onClick: () => handleSelectCategory('audio'),
              }}
              products={products}
              categories={categories}
              searchQuery={searchQuery}
              onOpenQuickView={(prod) => setQuickViewProduct(prod)}
              onSelectProduct={handleSelectProduct}
              onAddToCart={(prod) => handleAddToCart(prod, 1)}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
            />

            {/* Community Desk Setups Showcase */}
            <DeskSetupsGallery
              onOpenQuickViewByProductId={(prodId) => {
                const found = products.find((p) => p.id === prodId);
                if (found) setSelectedProduct(found);
              }}
            />
          </>
        )}
      </main>

      {/* Modals & Slide-over Drawers */}
      <InteractiveSoundTester
        isOpen={isSoundTesterOpen}
        onClose={() => setIsSoundTesterOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Corner Floating Mascot */}
      <FloatingMascot
        onOpenSoundTester={() => setIsSoundTesterOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenSoundTester={() => setIsSoundTesterOpen(true)}
      />
    </div>
  );
}

