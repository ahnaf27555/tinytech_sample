import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  Home,
  Star,
  Heart,
  ShoppingBag,
  Volume2,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  Share2,
  ArrowLeft,
  Eye,
  Send,
  Sliders
} from 'lucide-react';
import { Product, Review } from '../types';
import { ProductCard } from './ProductCard';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onBackToCatalog: () => void;
  onSelectCategory: (catId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, selectedColor?: string, selectedSwitch?: string) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  onOpenQuickView: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onBackToCatalog,
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onOpenQuickView,
}) => {
  // Gallery Image State
  const gallery = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [
        product.image,
        'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'
      ];

  const [activeImage, setActiveImage] = useState<string>(gallery[0]);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colorVariants?.[0]?.name || 'Standard Edition'
  );
  const [selectedSwitch, setSelectedSwitch] = useState<string>(
    product.switchOptions?.[0] || 'Linear Peach (Smooth 45g)'
  );

  // Active Tab State
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  // Reviews State
  const defaultReviews: Review[] = product.reviewsList && product.reviewsList.length > 0
    ? product.reviewsList
    : [
        {
          id: 'r1',
          userName: 'KeebEnthusiast99',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
          rating: 5,
          date: '2 days ago',
          title: 'Absolutely sublime typing feel & acoustics!',
          comment: `The build quality on this ${product.name} exceeded my expectations. The acoustic foam dampening gives it a deep, creamy sound profile. Packaging was super secure too!`,
          verifiedPurchase: true
        },
        {
          id: 'r2',
          userName: 'Alex Rivers',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
          rating: 5,
          date: '1 week ago',
          title: 'Stunning desk aesthetic!',
          comment: 'Matches my setup perfectly. The custom doodle art details and finish feel truly artisan. Highly recommended!',
          verifiedPurchase: true
        },
        {
          id: 'r3',
          userName: 'Maya Lin',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
          rating: 4,
          date: '2 weeks ago',
          title: 'Great product, fast shipping',
          comment: 'Super fast delivery. Everything works out of the box. Switches are buttery pre-lubed.',
          verifiedPurchase: true
        }
      ];

  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState(false);

  // Audio preview trigger
  const playSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      let freq = 380;
      if (product.soundProfile === 'Clicky') freq = 820;
      if (product.soundProfile === 'Tactile') freq = 480;
      if (product.soundProfile === 'Silent') freq = 220;

      osc.type = product.soundProfile === 'Clicky' ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.18);
    } catch {
      // Audio playback fails silently if restricted
    }
  };

  // Submit Review Handler
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment || !newReviewAuthor) return;

    setIsSubmittingReview(true);
    setTimeout(() => {
      const created: Review = {
        id: `r-${Date.now()}`,
        userName: newReviewAuthor,
        rating: newReviewRating,
        date: 'Just now',
        title: newReviewTitle || 'Awesome Purchase!',
        comment: newReviewComment,
        verifiedPurchase: true
      };

      setReviews([created, ...reviews]);
      setNewReviewAuthor('');
      setNewReviewTitle('');
      setNewReviewComment('');
      setIsSubmittingReview(false);
      setReviewSuccessMsg(true);
      setTimeout(() => setReviewSuccessMsg(false), 4000);
    }, 400);
  };

  // Wishlist check
  const isWishlisted = wishlistIds.includes(product.id);

  // Recommended Products (same category or general products excluding current)
  const recommendedProducts = allProducts
    ? allProducts.filter((p) => p.id !== product.id && (p.category === product.category || p.badge === 'Bestseller')).slice(0, 4)
    : [];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1A17] pb-20">
      {/* Top Breadcrumb & Back Bar */}
      <div className="bg-[#1C1A17] text-[#FAF8F5] py-3.5 px-4 sm:px-6 lg:px-8 border-b border-[#1C1A17]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <nav className="flex items-center gap-1.5 text-xs font-mono-tech text-[#FAF8F5]/60 flex-wrap">
            <button
              onClick={onBackToCatalog}
              className="flex items-center gap-1 hover:text-[#E2B857] transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-[#FAF8F5]/30" />
            <button
              onClick={() => onSelectCategory(product.category)}
              className="hover:text-[#E2B857] transition-colors capitalize"
            >
              {product.category}
            </button>
            <ChevronRight className="w-3 h-3 text-[#FAF8F5]/30" />
            <span className="text-[#E2B857] font-semibold truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </nav>

          <button
            onClick={onBackToCatalog}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-xs font-semibold hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Store</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white border border-[#1C1A17]/10 rounded-3xl p-6 sm:p-8 shadow-xs mb-12">
          
          {/* Left: Gallery & Primary Image (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Primary Main Image Frame */}
            <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl bg-[#FAF8F5] border border-[#1C1A17]/10 overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Product Badge Tag */}
              {product.badge && (
                <span className="absolute top-4 left-4 bg-[#1C1A17] text-white font-mono-tech text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                  {product.badge}
                </span>
              )}

              {/* Doodle Icon Tag */}
              <span className="absolute bottom-4 right-4 text-2xl p-2 bg-white/90 backdrop-blur-md rounded-xl border border-[#1C1A17]/10 shadow-xs">
                {product.doodleIcon}
              </span>

              {/* Acoustic Preview Button if Sound Profile exists */}
              {product.soundProfile && (
                <button
                  onClick={playSound}
                  className="absolute bottom-4 left-4 flex items-center gap-2 px-3.5 py-2 bg-[#1C1A17] text-[#FAF8F5] text-xs font-semibold rounded-xl hover:bg-[#E2B857] hover:text-[#1C1A17] transition-all shadow-md group/snd"
                  title="Click to preview switch acoustics"
                >
                  <Volume2 className="w-4 h-4 text-[#E2B857] group-hover/snd:text-[#1C1A17]" />
                  <span>Hear Sound Profile ({product.soundProfile})</span>
                </button>
              )}
            </div>

            {/* Thumbnail Gallery Explorer Bar */}
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {gallery.map((img, idx) => {
                const isActive = activeImage === img;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      isActive
                        ? 'border-[#1C1A17] ring-2 ring-[#E2B857]/50 scale-105 shadow-xs'
                        : 'border-[#1C1A17]/10 hover:border-[#1C1A17]/40 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Product Meta, Price, Variations, Add to Cart (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Brand & Stock Status Header */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#1C1A17]/50 bg-[#FAF8F5] px-2.5 py-1 rounded-md border border-[#1C1A17]/10">
                  {product.brand || 'Tinytech Studio'}
                </span>
                <span className={`text-xs font-bold font-mono-tech px-2.5 py-1 rounded-full ${
                  product.inStock
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {product.inStock ? '✓ In Stock & Ready to Ship' : 'Out of Stock'}
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-bold font-handwritten text-[#1C1A17] leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating & Review Summary */}
              <div className="flex items-center gap-3 text-sm mb-4 font-mono-tech">
                <div className="flex items-center gap-1 text-[#E2B857]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#E2B857]'
                          : 'fill-[#FAF8F5] text-[#1C1A17]/20'
                      }`}
                    />
                  ))}
                  <span className="font-bold text-[#1C1A17] ml-1">{product.rating}</span>
                </div>
                <span className="text-[#1C1A17]/30">|</span>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="text-xs text-[#1C1A17]/70 hover:text-[#1C1A17] hover:underline"
                >
                  {product.reviewsCount + reviews.length - defaultReviews.length} Verified Reviews
                </button>
              </div>

              {/* Price & Savings Tag */}
              <div className="flex items-baseline gap-3 mb-6 p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#1C1A17]/10">
                <span className="text-3xl font-bold font-mono-tech text-[#1C1A17]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-sm font-mono-tech text-[#1C1A17]/40 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold font-mono-tech bg-rose-500 text-white px-2 py-0.5 rounded-md">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-[#1C1A17]/80 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color Variation Selector */}
              {product.colorVariants && product.colorVariants.length > 0 && (
                <div className="mb-5">
                  <label className="block text-xs font-mono-tech font-bold uppercase text-[#1C1A17]/60 mb-2">
                    Edition / Colorway: <span className="text-[#1C1A17]">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {product.colorVariants.map((col) => {
                      const isSelected = selectedColor === col.name;
                      return (
                        <button
                          key={col.name}
                          onClick={() => setSelectedColor(col.name)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                            isSelected
                              ? 'bg-[#1C1A17] text-white border-[#1C1A17] ring-2 ring-[#E2B857]/50'
                              : 'bg-[#FAF8F5] text-[#1C1A17] border-[#1C1A17]/15 hover:border-[#1C1A17]/40'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/20"
                            style={{ backgroundColor: col.hex }}
                          />
                          <span>{col.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Switch Option Selector (If applicable) */}
              {product.category === 'keyboards' && (
                <div className="mb-6">
                  <label className="block text-xs font-mono-tech font-bold uppercase text-[#1C1A17]/60 mb-2">
                    Select Switch Mount Type:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Linear Peach (Smooth 45g)',
                      'Tactile Banana (Bump 55g)',
                      'Clicky Jade (Crisp 60g)',
                      'Silent Rose (Dampened 40g)'
                    ].map((sw) => (
                      <button
                        key={sw}
                        onClick={() => setSelectedSwitch(sw)}
                        className={`p-2 rounded-xl text-left text-xs font-semibold border transition-all ${
                          selectedSwitch === sw
                            ? 'bg-[#1C1A17] text-white border-[#1C1A17]'
                            : 'bg-[#FAF8F5] text-[#1C1A17] border-[#1C1A17]/15 hover:border-[#1C1A17]/30'
                        }`}
                      >
                        {sw}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-xs font-mono-tech font-bold uppercase text-[#1C1A17]/60 mb-2">
                  Quantity:
                </label>
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center bg-[#FAF8F5] border border-[#1C1A17]/20 rounded-xl p-1">
                    <button
                      onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-[#1C1A17]/10 text-sm font-bold flex items-center justify-center hover:bg-[#EFEADF] transition-colors"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-mono-tech font-bold text-sm">
                      {selectedQuantity}
                    </span>
                    <button
                      onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-[#1C1A17]/10 text-sm font-bold flex items-center justify-center hover:bg-[#EFEADF] transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <span className="text-xs text-[#1C1A17]/50 font-mono-tech">
                    Subtotal: <strong>${(product.price * selectedQuantity).toFixed(2)}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#1C1A17]/10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onAddToCart(product, selectedQuantity, selectedColor, selectedSwitch)}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-[#1C1A17] text-[#FAF8F5] text-sm font-bold hover:bg-[#33302B] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4 text-[#E2B857]" />
                  <span>Add to Cart (${(product.price * selectedQuantity).toFixed(2)})</span>
                </button>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isWishlisted
                      ? 'bg-rose-50 border-rose-300 text-rose-500'
                      : 'bg-white border-[#1C1A17]/20 text-[#1C1A17]/70 hover:text-[#1C1A17] hover:bg-[#FAF8F5]'
                  }`}
                  title="Add to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Guarantees & Perks Bar */}
              <div className="grid grid-cols-3 gap-2 pt-3 text-[11px] font-mono-tech text-[#1C1A17]/70 border-t border-[#1C1A17]/10">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#E2B857] shrink-0" />
                  <span>Free Express Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E2B857] shrink-0" />
                  <span>2 Year Craft Warranty</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-[#E2B857] shrink-0" />
                  <span>30-Day Hassle Returns</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Extended 3 Tabs Section: Description, Specifications, Reviews */}
        <div className="bg-white border border-[#1C1A17]/10 rounded-3xl p-6 sm:p-8 shadow-xs mb-16">
          {/* Tab Header Bar */}
          <div className="flex items-center border-b border-[#1C1A17]/10 gap-2 sm:gap-8 overflow-x-auto no-scrollbar mb-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 px-2 font-bold text-sm sm:text-base transition-all relative whitespace-nowrap ${
                activeTab === 'description'
                  ? 'text-[#1C1A17] border-b-2 border-[#1C1A17]'
                  : 'text-[#1C1A17]/50 hover:text-[#1C1A17]'
              }`}
            >
              <span>Product Story & Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 px-2 font-bold text-sm sm:text-base transition-all relative whitespace-nowrap ${
                activeTab === 'specs'
                  ? 'text-[#1C1A17] border-b-2 border-[#1C1A17]'
                  : 'text-[#1C1A17]/50 hover:text-[#1C1A17]'
              }`}
            >
              <span>Technical Specifications</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 px-2 font-bold text-sm sm:text-base transition-all relative whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'reviews'
                  ? 'text-[#1C1A17] border-b-2 border-[#1C1A17]'
                  : 'text-[#1C1A17]/50 hover:text-[#1C1A17]'
              }`}
            >
              <span>Customer Reviews</span>
              <span className="text-xs bg-[#E2B857] text-[#1C1A17] font-bold px-2 py-0.5 rounded-full">
                {reviews.length}
              </span>
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="min-h-[250px]">
            {/* TAB 1: DESCRIPTION */}
            {activeTab === 'description' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 text-sm leading-relaxed text-[#1C1A17]/80"
              >
                <div className="max-w-3xl">
                  <h3 className="text-xl font-bold font-handwritten text-[#1C1A17] mb-3">
                    Craftsmanship & Design Philosophy
                  </h3>
                  <p className="mb-4">
                    {product.fullDescription || product.story || `Engineered specifically for custom desk enthusiasts, the ${product.name} blends premium materials with precision acoustic tuning. Every component underwent rigorous testing to ensure exceptional tactile response and enduring durability.`}
                  </p>
                  <p className="mb-6">
                    Whether you are working long hours or assembling your dream aesthetic workspace setup, this piece brings hand-finished artistry straight to your fingertips.
                  </p>

                  <h4 className="font-bold text-[#1C1A17] font-mono-tech text-xs uppercase tracking-wider mb-3">
                    Key Features Highlights:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium">
                    <li className="flex items-start gap-2 bg-[#FAF8F5] p-3 rounded-xl border border-[#1C1A17]/10">
                      <Sparkles className="w-4 h-4 text-[#E2B857] shrink-0 mt-0.5" />
                      <span><b>Artisan Finish:</b> Premium hand-milled, anodized or custom dye-sublimated materials.</span>
                    </li>
                    <li className="flex items-start gap-2 bg-[#FAF8F5] p-3 rounded-xl border border-[#1C1A17]/10">
                      <Volume2 className="w-4 h-4 text-[#E2B857] shrink-0 mt-0.5" />
                      <span><b>Acoustic Dampening:</b> Multi-layer Poron memory foam & PET switch pad lining.</span>
                    </li>
                    <li className="flex items-start gap-2 bg-[#FAF8F5] p-3 rounded-xl border border-[#1C1A17]/10">
                      <ShieldCheck className="w-4 h-4 text-[#E2B857] shrink-0 mt-0.5" />
                      <span><b>Universal Compatibility:</b> Seamless support across macOS, Windows, and Linux.</span>
                    </li>
                    <li className="flex items-start gap-2 bg-[#FAF8F5] p-3 rounded-xl border border-[#1C1A17]/10">
                      <Check className="w-4 h-4 text-[#E2B857] shrink-0 mt-0.5" />
                      <span><b>Ergonomic Comfort:</b> Form-fitted design tailored for all-day typing or studio work.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* TAB 2: SPECIFICATIONS */}
            {activeTab === 'specs' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl"
              >
                <h3 className="text-xl font-bold font-handwritten text-[#1C1A17] mb-4">
                  Full Technical Specs Table
                </h3>
                <div className="border border-[#1C1A17]/10 rounded-2xl overflow-hidden bg-[#FAF8F5]">
                  <table className="w-full text-xs text-left">
                    <tbody>
                      <tr className="border-b border-[#1C1A17]/10">
                        <td className="p-3.5 font-bold font-mono-tech text-[#1C1A17]/60 bg-black/5 w-1/3">Category</td>
                        <td className="p-3.5 font-semibold text-[#1C1A17] capitalize">{product.category}</td>
                      </tr>
                      {product.brand && (
                        <tr className="border-b border-[#1C1A17]/10">
                          <td className="p-3.5 font-bold font-mono-tech text-[#1C1A17]/60 bg-black/5">Brand / Maker</td>
                          <td className="p-3.5 font-semibold text-[#1C1A17]">{product.brand}</td>
                        </tr>
                      )}
                      {Object.entries(product.specs).map(([key, val], idx) => (
                        <tr key={key} className="border-b border-[#1C1A17]/10 last:border-0">
                          <td className="p-3.5 font-bold font-mono-tech text-[#1C1A17]/60 bg-black/5">{key}</td>
                          <td className="p-3.5 font-semibold text-[#1C1A17]">{val}</td>
                        </tr>
                      ))}
                      {product.soundProfile && (
                        <tr className="border-b border-[#1C1A17]/10">
                          <td className="p-3.5 font-bold font-mono-tech text-[#1C1A17]/60 bg-black/5">Acoustic Sound Profile</td>
                          <td className="p-3.5 font-semibold text-[#1C1A17]">{product.soundProfile}</td>
                        </tr>
                      )}
                      <tr>
                        <td className="p-3.5 font-bold font-mono-tech text-[#1C1A17]/60 bg-black/5">Tags & Keywords</td>
                        <td className="p-3.5 font-semibold text-[#1C1A17]">{product.tags.join(', ')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* TAB 3: REVIEWS */}
            {activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Rating Breakdown Column (4 Cols) */}
                <div className="lg:col-span-4 bg-[#FAF8F5] p-5 rounded-2xl border border-[#1C1A17]/10 self-start">
                  <div className="text-center mb-6 pb-6 border-b border-[#1C1A17]/10">
                    <span className="text-4xl font-bold font-mono-tech text-[#1C1A17] block">
                      {product.rating.toFixed(1)}
                    </span>
                    <div className="flex justify-center my-2 text-[#E2B857]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#E2B857]" />
                      ))}
                    </div>
                    <span className="text-xs text-[#1C1A17]/60 font-mono-tech">
                      Based on {reviews.length} verified ratings
                    </span>
                  </div>

                  {/* Rating Bars */}
                  <div className="space-y-2 text-xs font-mono-tech">
                    {[
                      { star: 5, pct: 85 },
                      { star: 4, pct: 12 },
                      { star: 3, pct: 3 },
                      { star: 2, pct: 0 },
                      { star: 1, pct: 0 }
                    ].map((bar) => (
                      <div key={bar.star} className="flex items-center gap-2">
                        <span className="w-8">{bar.star} ★</span>
                        <div className="flex-1 h-2 bg-black/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#E2B857] rounded-full"
                            style={{ width: `${bar.pct}%` }}
                          />
                        </div>
                        <span className="w-8 text-right text-[#1C1A17]/50">{bar.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews List & Write Form (8 Cols) */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Write Review Form */}
                  <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#1C1A17]/10">
                    <h4 className="font-bold font-handwritten text-lg mb-2">Write a Review</h4>
                    {reviewSuccessMsg && (
                      <div className="p-3 mb-4 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold">
                        ✓ Thank you! Your review has been submitted and posted successfully.
                      </div>
                    )}
                    <form onSubmit={handleAddReview} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Your Name (e.g. MechanicalFan)"
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          className="bg-white border border-[#1C1A17]/20 rounded-xl p-2.5 text-xs text-[#1C1A17] focus:outline-none focus:border-[#1C1A17]"
                        />
                        <div className="flex items-center gap-2 bg-white border border-[#1C1A17]/20 rounded-xl px-3 py-2 text-xs">
                          <span className="font-mono-tech text-[#1C1A17]/60">Rating:</span>
                          <div className="flex gap-1 text-[#E2B857]">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <button
                                type="button"
                                key={s}
                                onClick={() => setNewReviewRating(s)}
                                className="focus:outline-none"
                              >
                                <Star className={`w-4 h-4 ${s <= newReviewRating ? 'fill-[#E2B857]' : 'text-[#1C1A17]/20'}`} />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <input
                        type="text"
                        placeholder="Review Title (optional)"
                        value={newReviewTitle}
                        onChange={(e) => setNewReviewTitle(e.target.value)}
                        className="w-full bg-white border border-[#1C1A17]/20 rounded-xl p-2.5 text-xs text-[#1C1A17] focus:outline-none focus:border-[#1C1A17]"
                      />

                      <textarea
                        required
                        rows={3}
                        placeholder="Share your experience regarding typing feel, sound acoustics, or aesthetic finish..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="w-full bg-white border border-[#1C1A17]/20 rounded-xl p-2.5 text-xs text-[#1C1A17] focus:outline-none focus:border-[#1C1A17]"
                      />

                      <button
                        type="submit"
                        disabled={isSubmittingReview}
                        className="px-5 py-2.5 rounded-xl bg-[#1C1A17] text-white text-xs font-bold hover:bg-[#33302B] transition-all flex items-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5 text-[#E2B857]" />
                        <span>{isSubmittingReview ? 'Posting...' : 'Post Review'}</span>
                      </button>
                    </form>
                  </div>

                  {/* Existing Reviews */}
                  <div className="space-y-4">
                    {reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#1C1A17]/10 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={rev.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                              alt={rev.userName}
                              className="w-8 h-8 rounded-full object-cover border border-[#1C1A17]/20"
                            />
                            <div>
                              <span className="font-bold text-xs text-[#1C1A17] block">
                                {rev.userName}
                              </span>
                              <span className="text-[10px] text-emerald-700 font-bold font-mono-tech">
                                ✓ Verified Buyer
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] text-[#1C1A17]/50 font-mono-tech">
                            {rev.date}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-[#E2B857]">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-[#E2B857]' : 'text-[#1C1A17]/20'}`}
                            />
                          ))}
                        </div>

                        <h5 className="font-bold text-xs text-[#1C1A17]">{rev.title}</h5>
                        <p className="text-xs text-[#1C1A17]/80 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* You May Also Like Section (Recommended Products) */}
        {recommendedProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#1C1A17]/10">
              <div>
                <span className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#1C1A17]/50">
                  CURATED RECOMMENDATIONS
                </span>
                <h2 className="text-2xl font-bold font-handwritten text-[#1C1A17]">
                  You May Also Like
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {recommendedProducts.map((p) => {
                const recWishlisted = wishlistIds.includes(p.id);
                return (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onOpenQuickView={onSelectProduct}
                    onSelectProduct={onSelectProduct}
                    onAddToCart={(prod) => onAddToCart(prod, 1)}
                    isWishlisted={recWishlisted}
                    onToggleWishlist={onToggleWishlist}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
