import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Volume2, Wand2 } from 'lucide-react';

interface FloatingMascotProps {
  onOpenSoundTester: () => void;
  onOpenAuthModal?: () => void;
}

export const FloatingMascot: React.FC<FloatingMascotProps> = ({
  onOpenSoundTester,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);

  const mascotMessages = [
    { text: "Hi! I'm Tiny! Need help finding the perfect keycaps or switch sound?", actionLabel: "Test Switch Sounds", action: onOpenSoundTester },
    { text: "Have questions about custom builds or compatibility? Call our hotline anytime!", actionLabel: "Call 1-800-TINY-TECH", action: () => window.location.href = "tel:18008469832" },
    { text: "Fun fact: Use promo code TINY10 at checkout for 10% off your entire order!", actionLabel: null, action: null },
  ];

  const currentMsg = mascotMessages[messageIndex];

  const handleNextMessage = () => {
    setMessageIndex((prev) => (prev + 1) % mascotMessages.length);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="mb-2 max-w-xs bg-white border-2 border-[#1C1A17] rounded-2xl p-3.5 shadow-xl pointer-events-auto relative text-xs text-[#1C1A17]"
          >
            {/* Speech bubble pointer */}
            <div className="absolute -bottom-2 right-6 w-3 h-3 bg-white border-r-2 border-b-2 border-[#1C1A17] rotate-45" />

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 p-1 text-[#1C1A17]/40 hover:text-[#1C1A17]"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-1.5 font-bold font-handwritten text-base text-[#1C1A17]">
              <span>✨ Tiny the Mascot</span>
            </div>

            <p className="mt-1 text-[#1C1A17]/80 leading-snug">
              {currentMsg.text}
            </p>

            <div className="mt-2.5 flex items-center justify-between gap-2 pt-2 border-t border-[#1C1A17]/10">
              {currentMsg.action ? (
                <button
                  onClick={currentMsg.action}
                  className="px-2.5 py-1 rounded-lg bg-[#1C1A17] text-white text-[11px] font-bold hover:bg-[#33302B]"
                >
                  {currentMsg.actionLabel}
                </button>
              ) : (
                <span className="text-[10px] font-mono-tech text-emerald-700 font-bold">Code: TINY10</span>
              )}

              <button
                onClick={handleNextMessage}
                className="text-[11px] font-semibold text-[#1C1A17]/60 hover:text-[#1C1A17]"
              >
                Next Tip →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto p-2.5 rounded-full bg-[#FAF8F5] border-2 border-[#1C1A17] keycap-shadow hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
        title="Chat with Tiny"
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          stroke="#1C1A17"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:rotate-12 transition-transform"
        >
          {/* Cute Little Stick Mascot Head */}
          <circle cx="18" cy="12" r="7" fill="#FAF8F5" />
          {/* Eyes */}
          <circle cx="15.5" cy="12" r="1" fill="#1C1A17" />
          <circle cx="20.5" cy="12" r="1" fill="#1C1A17" />
          {/* Smile */}
          <path d="M15.5 15 Q18 17 20.5 15" strokeWidth="1.2" />
          {/* Body */}
          <path d="M18 19 L18 28 M18 22 L12 25 M18 22 L24 25 M18 28 L14 34 M18 28 L22 34" strokeWidth="2" />
        </svg>
      </button>
    </div>
  );
};
