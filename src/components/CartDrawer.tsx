import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, Truck, Gift, Tag, Check, ArrowRight, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0); // 0 or 0.10
  const [promoError, setPromoError] = useState('');
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const rawSubtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = rawSubtotal * appliedDiscount;
  const giftWrapFee = isGiftWrap ? 3.99 : 0;
  const freeShippingThreshold = 50;
  const shippingFee = rawSubtotal >= freeShippingThreshold || rawSubtotal === 0 ? 0 : 4.99;
  const finalTotal = rawSubtotal - discountAmount + giftWrapFee + shippingFee;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'TINY10') {
      setAppliedDiscount(0.10);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "TINY10"');
    }
  };

  const handleSimulateCheckout = () => {
    setIsCheckoutModalOpen(true);
    setIsOrderComplete(false);
  };

  const handleCompleteOrder = () => {
    setIsOrderComplete(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
    setTimeout(() => {
      onClearCart();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#1C1A17]/60 backdrop-blur-xs"
        />

        {/* Slide-over Container */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-[#FAF8F5] border-l-2 border-[#1C1A17] flex flex-col justify-between shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-[#1C1A17]/10 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#E2B857]" />
                <h2 className="text-2xl font-bold font-handwritten text-[#1C1A17]">
                  Shopping Cart
                </h2>
                <span className="text-xs font-mono-tech bg-[#EFEADF] px-2 py-0.5 rounded-full font-bold">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full border border-[#1C1A17]/20 hover:bg-[#1C1A17] hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-[#EFEADF] p-3 px-6 border-b border-[#1C1A17]/10 text-xs">
              <div className="flex justify-between items-center font-mono-tech font-semibold mb-1 text-[#1C1A17]">
                <span className="flex items-center gap-1">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  Free Standard Shipping
                </span>
                <span>
                  {rawSubtotal >= freeShippingThreshold
                    ? 'Unlocked! 🎉'
                    : `$${(freeShippingThreshold - rawSubtotal).toFixed(2)} away`}
                </span>
              </div>
              <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-[#1C1A17]/10">
                <div
                  className="h-full bg-[#1C1A17] transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (rawSubtotal / freeShippingThreshold) * 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-2">📦</div>
                  <h3 className="text-2xl font-bold font-handwritten text-[#1C1A17]">
                    Your cart is feeling light!
                  </h3>
                  <p className="text-xs text-[#1C1A17]/60 mt-1 max-w-xs mx-auto">
                    Explore artisan keycaps, gasket mechanical keyboards, or coiled cables to fill it up.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 rounded-xl bg-[#1C1A17] text-white text-xs font-semibold"
                  >
                    Start Browsing
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3 bg-white rounded-2xl border border-[#1C1A17]/15 flex gap-3 keycap-shadow"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover border border-[#1C1A17]/10 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold text-[#1C1A17] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-[#1C1A17]/40 hover:text-rose-500 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {item.selectedColor && (
                          <div className="text-[11px] text-[#1C1A17]/60 font-mono-tech">
                            Color: {item.selectedColor}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-bold font-mono-tech text-[#1C1A17]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>

                        <div className="flex items-center border border-[#1C1A17]/30 rounded-lg bg-[#FAF8F5] overflow-hidden">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="px-2 py-0.5 text-xs font-bold hover:bg-[#EFEADF]"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-xs font-mono-tech font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="px-2 py-0.5 text-xs font-bold hover:bg-[#EFEADF]"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Gift Wrapping Option */}
              {cartItems.length > 0 && (
                <div className="p-3 bg-white rounded-2xl border border-[#1C1A17]/15 space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="flex items-center gap-2 text-xs font-bold text-[#1C1A17]">
                      <Gift className="w-4 h-4 text-[#E2B857]" />
                      <span>Add Doodle Gift Wrap (+ $3.99)</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={isGiftWrap}
                      onChange={(e) => setIsGiftWrap(e.target.checked)}
                      className="rounded accent-[#1C1A17] w-4 h-4"
                    />
                  </label>
                  {isGiftWrap && (
                    <input
                      type="text"
                      placeholder="Write hand-drawn gift card note..."
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      className="w-full bg-[#FAF8F5] text-xs p-2 rounded-lg border border-[#1C1A17]/20"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-4 sm:p-6 bg-white border-t border-[#1C1A17]/10 space-y-3">
                {/* Promo Code Input */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#1C1A17]/50" />
                    <input
                      type="text"
                      placeholder="Promo Code (TINY10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-[#FAF8F5] text-xs pl-8 pr-3 py-2 rounded-xl border border-[#1C1A17]/20 uppercase"
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    className="px-3 py-2 bg-[#EFEADF] text-[#1C1A17] text-xs font-bold rounded-xl hover:bg-[#1C1A17] hover:text-white transition-all"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-[11px] text-rose-500">{promoError}</p>}
                {appliedDiscount > 0 && (
                  <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> 10% Discount Applied!
                  </p>
                )}

                {/* Totals Breakdown */}
                <div className="space-y-1.5 text-xs text-[#1C1A17]/70 pt-2 border-t border-[#1C1A17]/10">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-mono-tech">${rawSubtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Promo Discount (10%):</span>
                      <span className="font-mono-tech">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  {isGiftWrap && (
                    <div className="flex justify-between">
                      <span>Gift Wrapping:</span>
                      <span className="font-mono-tech">+${giftWrapFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="font-mono-tech">
                      {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#1C1A17] pt-2 border-t border-[#1C1A17]/10">
                    <span>Total:</span>
                    <span className="font-mono-tech">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={handleSimulateCheckout}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#1C1A17] text-[#FAF8F5] font-semibold text-sm keycap-shadow hover:bg-[#33302B] flex items-center justify-center gap-2 transition-all mt-2"
                >
                  <span>Proceed to Express Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#E2B857]" />
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Checkout Modal Simulation */}
        {isCheckoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1A17]/70 backdrop-blur-md">
            <div className="bg-[#FAF8F5] border-2 border-[#1C1A17] rounded-3xl p-6 sm:p-8 max-w-md w-full keycap-shadow text-center relative">
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-black/10"
              >
                <X className="w-5 h-5" />
              </button>

              {!isOrderComplete ? (
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#E2B857]/20 border border-[#1C1A17] text-[#1C1A17] flex items-center justify-center mx-auto text-xl">
                    🛍️
                  </div>
                  <h3 className="text-3xl font-bold font-handwritten text-[#1C1A17]">
                    Tinytech Express Checkout
                  </h3>
                  <p className="text-xs text-[#1C1A17]/70">
                    Simulate your order placement for <b>Tinytech</b> artisan computer gear!
                  </p>

                  <div className="bg-white p-4 rounded-2xl border border-[#1C1A17]/20 text-left text-xs space-y-2">
                    <div className="font-mono-tech font-bold text-[#1C1A17]">Order Summary</div>
                    <div className="flex justify-between text-[#1C1A17]/80">
                      <span>Total Items:</span>
                      <span className="font-bold">{cartItems.reduce((a, b) => a + b.quantity, 0)}</span>
                    </div>
                    <div className="flex justify-between text-[#1C1A17] font-bold border-t pt-2">
                      <span>Total Due:</span>
                      <span className="font-mono-tech">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCompleteOrder}
                    className="w-full py-3 bg-[#1C1A17] text-white font-bold rounded-xl hover:bg-[#33302B] keycap-shadow"
                  >
                    Confirm & Place Order ✨
                  </button>
                </div>
              ) : (
                <div className="space-y-4 py-4">
                  <div className="text-5xl">🎉</div>
                  <h3 className="text-3xl font-bold font-handwritten text-[#1C1A17]">
                    Order Placed Successfully!
                  </h3>
                  <p className="text-xs text-[#1C1A17]/80 leading-relaxed">
                    Thank you for supporting <b>Tinytech</b>! Your artisan computer accessories are being hand-packed with care.
                  </p>
                  <div className="bg-white p-3 rounded-xl border text-xs font-mono-tech text-left">
                    <div>Order ID: #TT-88392</div>
                    <div>Est. Delivery: 2-4 Business Days</div>
                  </div>
                  <button
                    onClick={() => {
                      setIsCheckoutModalOpen(false);
                      onClose();
                    }}
                    className="w-full py-2.5 bg-[#1C1A17] text-white font-semibold rounded-xl text-xs"
                  >
                    Back to Store
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </AnimatePresence>
  );
};
