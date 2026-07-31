import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1A17]/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white border border-[#1C1A17]/15 rounded-3xl p-6 sm:p-8 max-w-md w-full keycap-shadow relative overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#FAF8F5] text-[#1C1A17]/60 hover:text-[#1C1A17] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#1C1A17]/10 text-xs font-semibold text-[#1C1A17] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#E2B857]" />
              <span>Tinytech Club</span>
            </div>
            <h2 className="text-2xl font-bold font-handwritten text-[#1C1A17]">
              {mode === 'login' ? 'Welcome Back, Hobbyist!' : 'Join the Tinytech Studio'}
            </h2>
            <p className="text-xs text-[#1C1A17]/60 mt-1">
              {mode === 'login'
                ? 'Sign in to view orders, saved keycap drop alerts, and wishlist.'
                : 'Create an account to unlock 10% off your first order & artisan perks.'}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-[#FAF8F5] p-1 rounded-2xl border border-[#1C1A17]/10 mb-6">
            <button
              onClick={() => { setMode('login'); setIsSubmitted(false); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                mode === 'login'
                  ? 'bg-[#1C1A17] text-white shadow-sm'
                  : 'text-[#1C1A17]/60 hover:text-[#1C1A17]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setIsSubmitted(false); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                mode === 'register'
                  ? 'bg-[#1C1A17] text-white shadow-sm'
                  : 'text-[#1C1A17]/60 hover:text-[#1C1A17]'
              }`}
            >
              Create Account
            </button>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-8 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1C1A17]">
                {mode === 'login' ? 'Signed in successfully!' : 'Account created successfully!'}
              </h3>
              <p className="text-xs text-[#1C1A17]/60 mt-1">
                Redirecting to your workspace...
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-[#1C1A17] mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1C1A17]/40" />
                    <input
                      type="text"
                      required
                      placeholder="Alex Maker"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#FAF8F5] text-xs sm:text-sm text-[#1C1A17] pl-10 pr-4 py-2.5 rounded-xl border border-[#1C1A17]/15 focus:outline-none focus:ring-2 focus:ring-[#1C1A17]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#1C1A17] mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1C1A17]/40" />
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAF8F5] text-xs sm:text-sm text-[#1C1A17] pl-10 pr-4 py-2.5 rounded-xl border border-[#1C1A17]/15 focus:outline-none focus:ring-2 focus:ring-[#1C1A17]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-[#1C1A17]">Password</label>
                  {mode === 'login' && (
                    <a href="#" className="text-[11px] text-[#1C1A17]/60 hover:text-[#1C1A17] underline">
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1C1A17]/40" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#FAF8F5] text-xs sm:text-sm text-[#1C1A17] pl-10 pr-4 py-2.5 rounded-xl border border-[#1C1A17]/15 focus:outline-none focus:ring-2 focus:ring-[#1C1A17]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#1C1A17] text-white font-semibold text-xs sm:text-sm hover:bg-[#33302B] active:scale-98 transition-all flex items-center justify-center gap-2 keycap-shadow mt-2"
              >
                <span>{mode === 'login' ? 'Sign In to Account' : 'Complete Registration'}</span>
                <ArrowRight className="w-4 h-4 text-[#E2B857]" />
              </button>

              <div className="pt-3 border-t border-[#1C1A17]/10 text-center">
                <span className="text-[11px] text-[#1C1A17]/50 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  100% Secure SSL encrypted authentication
                </span>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
