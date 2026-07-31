import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sparkles, X, Info, Music2 } from 'lucide-react';
import { SWITCH_SOUNDS } from '../data/mockData';
import { playSwitchSound } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

interface SoundTesterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveSoundTester: React.FC<SoundTesterProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedSwitch, setSelectedSwitch] = useState<string>('linear');
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [pressCount, setPressCount] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const currentSwitchInfo = SWITCH_SOUNDS.find((s) => s.id === selectedSwitch) || SWITCH_SOUNDS[0];

  const handleKeyPress = (keyName: string) => {
    setActiveKey(keyName);
    setPressCount((prev) => prev + 1);

    if (!isMuted) {
      playSwitchSound(currentSwitchInfo.type);
    }

    // Trigger mini confetti every 20 key presses
    if ((pressCount + 1) % 25 === 0) {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#1C1A17', '#E2B857', '#FAF8F5'],
      });
    }

    setTimeout(() => {
      setActiveKey((current) => (current === keyName ? null : current));
    }, 120);
  };

  // Listen to physical keyboard presses while modal is active!
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const keyUpper = e.key.toUpperCase();
      const validKeys = ['ESC', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'SPACE', 'ENTER', 'BACKSPACE'];
      let matchedKey = keyUpper;
      if (e.code === 'Space') matchedKey = 'SPACE';
      if (e.code === 'Enter') matchedKey = 'ENTER';
      if (e.code === 'Backspace') matchedKey = 'BACKSPACE';
      if (e.code === 'Escape') matchedKey = 'ESC';

      if (validKeys.includes(matchedKey) || matchedKey.length === 1) {
        handleKeyPress(matchedKey.length === 1 ? matchedKey : matchedKey);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedSwitch, isMuted, pressCount]);

  if (!isOpen) return null;

  const keycapLayout = [
    ['ESC', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'SPACE', 'BACKSPACE']
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1A17]/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-[#FAF8F5] border-2 border-[#1C1A17] rounded-3xl p-6 sm:p-8 keycap-shadow overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full border border-[#1C1A17]/20 hover:bg-[#1C1A17] hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2B857]/20 border border-[#1C1A17]/20 text-xs font-semibold mb-2">
              <Music2 className="w-3.5 h-3.5 text-[#1C1A17]" />
              <span>Interactive Switch Sound Studio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-handwritten text-[#1C1A17]">
              Test Mechanical Switch Acoustics
            </h2>
            <p className="text-xs sm:text-sm text-[#1C1A17]/70 mt-1">
              Click the keycaps below or press keys on your physical keyboard!
            </p>
          </div>

          {/* Switch Type Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {SWITCH_SOUNDS.map((sw) => {
              const isSelected = selectedSwitch === sw.id;
              return (
                <button
                  key={sw.id}
                  onClick={() => {
                    setSelectedSwitch(sw.id);
                    playSwitchSound(sw.type);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-[#1C1A17] text-[#FAF8F5] border-[#1C1A17] shadow-md'
                      : 'bg-white border-[#1C1A17]/20 text-[#1C1A17] hover:bg-[#EFEADF]'
                  }`}
                >
                  <div className="text-xs font-mono-tech font-bold flex items-center justify-between">
                    <span>{sw.type}</span>
                    {isSelected && <Sparkles className="w-3.5 h-3.5 text-[#E2B857]" />}
                  </div>
                  <div className="text-xs font-semibold mt-1 truncate">{sw.name}</div>
                </button>
              );
            })}
          </div>

          {/* Active Switch Sound Profile Description */}
          <div className="bg-[#EFEADF] p-3.5 rounded-xl border border-[#1C1A17]/15 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Info className="w-4 h-4 text-[#1C1A17]/60 shrink-0" />
              <div>
                <span className="font-bold">{currentSwitchInfo.name}: </span>
                <span className="text-[#1C1A17]/80">{currentSwitchInfo.profile}</span>
              </div>
            </div>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-lg border border-[#1C1A17]/20 bg-white text-[#1C1A17] text-xs font-mono-tech flex items-center gap-1"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            </button>
          </div>

          {/* Interactive Virtual Keyboard Matrix */}
          <div className="bg-[#E5E0D5] p-4 sm:p-6 rounded-2xl border border-[#1C1A17]/20 flex flex-col gap-2 shadow-inner">
            {keycapLayout.map((row, rIdx) => (
              <div key={rIdx} className="flex justify-center gap-1 sm:gap-2">
                {row.map((k) => {
                  const isActive = activeKey === k;
                  const isWide = k === 'SPACE' || k === 'ENTER' || k === 'BACKSPACE';
                  return (
                    <button
                      key={k}
                      onClick={() => handleKeyPress(k)}
                      className={`relative font-mono-tech font-bold text-xs rounded-lg transition-all keycap-shadow select-none ${
                        isWide ? 'px-4 sm:px-6 py-2.5 bg-[#D5CEBF]' : 'w-8 h-8 sm:w-11 sm:h-11 bg-white'
                      } ${
                        isActive
                          ? 'bg-[#E2B857] text-[#1C1A17] translate-y-1 shadow-none border border-[#1C1A17]'
                          : 'border border-[#1C1A17]/30 text-[#1C1A17] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      {k === 'SPACE' ? '___' : k}

                      {/* Cute pop effect on active keypress */}
                      {isActive && (
                        <motion.span
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: 1.5, opacity: 0 }}
                          className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs"
                        >
                          ✨
                        </motion.span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Stats & Keypress Counter */}
          <div className="flex items-center justify-between mt-4 text-xs font-mono-tech text-[#1C1A17]/60">
            <span>Keys Pressed: <b className="text-[#1C1A17]">{pressCount}</b></span>
            <span>Synthesizer: Web Audio API (Native 24-bit)</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
