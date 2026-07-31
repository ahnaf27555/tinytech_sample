import React from 'react';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenQuickView: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenQuickView,
  onSelectProduct,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      onOpenQuickView(product);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-transparent rounded-2xl transition-all flex flex-col justify-between cursor-pointer p-1"
    >
      <div>
        {/* Product Image Frame */}
        <div className="relative aspect-square rounded-2xl bg-[#FAF8F5] overflow-hidden mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />

          {/* Badge Tag if available */}
          {product.badge && (
            <span className="absolute top-3 left-3 bg-[#1C1A17] text-white text-[10px] font-bold font-mono-tech px-2.5 py-0.5 rounded-full shadow-xs pointer-events-none">
              {product.badge}
            </span>
          )}

          {/* Hover Overlay: Quick View, Add to Cart & Wishlist */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5 p-3">
            {/* Quick View Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenQuickView(product);
              }}
              className="p-2.5 rounded-full bg-white text-[#1C1A17] hover:bg-[#1C1A17] hover:text-white transition-all shadow-md transform hover:scale-110"
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Add to Cart Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="p-2.5 rounded-full bg-[#1C1A17] text-white hover:bg-[#33302B] transition-all shadow-md transform hover:scale-110"
              title="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#E2B857]" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product.id);
              }}
              className={`p-2.5 rounded-full transition-all shadow-md transform hover:scale-110 ${
                isWishlisted
                  ? 'bg-rose-50 text-rose-500'
                  : 'bg-white text-[#1C1A17] hover:bg-[#1C1A17] hover:text-white'
              }`}
              title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Product Details below image */}
        <div className="px-1 space-y-1">
          {/* Category */}
          <span className="text-[11px] font-mono-tech font-bold uppercase tracking-wider text-[#1C1A17]/50 block capitalize">
            {product.category}
          </span>

          {/* Product Name */}
          <h3 className="font-bold text-sm sm:text-base text-[#1C1A17] group-hover:text-[#E2B857] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Product Price */}
          <div className="flex items-center gap-2 pt-0.5">
            <span className="text-sm sm:text-base font-bold font-mono-tech text-[#1C1A17]">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-mono-tech text-[#1C1A17]/40 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
