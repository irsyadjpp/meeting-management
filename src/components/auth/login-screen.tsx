'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Shield, Zap, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface LoginScreenProps {
  onLoginAsDirector: () => void;
  onLoginAsStaff: () => void;
  onGoogleLogin: () => void;
}

export function LoginScreen({ onLoginAsDirector, onLoginAsStaff, onGoogleLogin }: LoginScreenProps) {
  const [activeTab, setActiveTab] = useState<'google' | 'pin'>('google');
  const [isLoading, setIsLoading] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  // --- LOGIC: GOOGLE LOGIN (Staff/Member) ---
  const handleGoogleLogin = () => {
    setIsLoading(true);
    setError('');
    
    // Simulasi delay autentikasi Google
    setTimeout(() => {
      setIsLoading(false);
      // Di real app, ini akan memanggil NextAuth / Firebase Auth
      // Default masuk sebagai Staff jika via Google
      onGoogleLogin(); 
    }, 1500);
  };

  // --- LOGIC: PIN LOGIN (Super Admin) ---
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulasi checking hash
    setTimeout(() => {
      if (pin === '113125') {
        // PIN BENAR -> Masuk sebagai Project Director
        onLoginAsDirector();
      } else {
        // PIN SALAH
        setError('ACCESS DENIED. INVALID PROTOCOL.');
        setIsLoading(false);
        setPin(''); // Reset input
      }
    }, 800);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#050505] font-sans selection:bg-[#ffbe00] selection:text-black">
      
      {/* Background Gradients */}
      <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[#ca1f3d]/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#ffbe00]/10 blur-[120px]" />

      <div className="z-10 grid w-full max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-2">
        
        {/* LEFT SIDE: BRANDING */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ca1f3d] to-[#ffbe00] shadow-lg shadow-red-900/20">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <span className="font-mono text-sm font-bold tracking-[0.2em] text-[#ffbe00]">
                BCC 2026 SYSTEM
              </span>
            </div>

            <h1 className="text-5xl font-black leading-tight tracking-tighter text-white md:text-7xl">
              COMMAND <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ca1f3d] to-[#ffbe00]">
                CENTER
              </span>
            </h1>
            
            <p className="mt-6 max-w-md text-lg text-gray-400">
              Platform manajemen turnamen terintegrasi. <br/>
              Integritas, Solidaritas, & Sportivitas.
            </p>

            <div className="mt-8 flex items-center gap-4 text-sm font-mono text-gray-500">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                SYSTEM ONLINE
              </span>
              <span>v1.0.0-beta</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE: AUTH CARD */}
        <div className="flex items-center justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-[#121212]/80 p-8 backdrop-blur-2xl shadow-2xl"
          >
            {/* Header Text */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-white">Identify Yourself</h2>
              <p className="text-sm text-gray-400">Pilih metode akses ke dashboard.</p>
            </div>

            {/* CUSTOM TABS SWITCHER */}
            <div className="mb-8 grid grid-cols-2 rounded-full bg-white/5 p-1">
                <button
                    onClick={() => setActiveTab('google')}
                    className={cn(
                        "flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold transition-all duration-300",
                        activeTab === 'google' 
                        ? "bg-white text-black shadow-lg" 
                        : "text-gray-400 hover:text-white"
                    )}
                >
                    <Zap className="h-4 w-4" /> Google
                </button>
                <button
                    onClick={() => setActiveTab('pin')}
                    className={cn(
                        "flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold transition-all duration-300",
                        activeTab === 'pin' 
                        ? "bg-[#ffbe00] text-black shadow-[0_0_15px_rgba(255,190,0,0.4)]" 
                        : "text-gray-400 hover:text-white"
                    )}
                >
                    <Lock className="h-4 w-4" /> Secure PIN
                </button>
            </div>

            {/* TAB CONTENT */}
            <div className="relative min-h-[140px]">
                <AnimatePresence mode="wait">
                    
                    {/* --- TAB 1: GOOGLE LOGIN --- */}
                    {activeTab === 'google' && (
                        <motion.div
                            key="google"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-4"
                        >
                            <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-center">
                                <p className="text-xs text-gray-400 mb-2">COMMITTEE & STAFF ACCESS</p>
                                <Button
                                    onClick={handleGoogleLogin}
                                    disabled={isLoading}
                                    className="w-full h-12 rounded-xl bg-white hover:bg-gray-200 text-black font-bold text-base transition-all duration-300"
                                >
                                    {isLoading && activeTab === 'google' ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <div className="flex items-center justify-center gap-3">
                                            {/* Google Icon SVG */}
                                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                            </svg>
                                            Sign in with Google
                                        </div>
                                    )}
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* --- TAB 2: PIN LOGIN (SUPER ADMIN) --- */}
                    {activeTab === 'pin' && (
                        <motion.div
                            key="pin"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <form onSubmit={handlePinSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#ffbe00] uppercase tracking-widest ml-1">
                                        Super Admin Code
                                    </label>
                                    <Input 
                                        type="password"
                                        placeholder="••••••"
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value)}
                                        maxLength={6}
                                        className="h-12 rounded-xl border-white/10 bg-white/5 text-center text-2xl font-black tracking-[0.5em] text-white placeholder:tracking-normal placeholder:text-gray-700 focus:border-[#ffbe00] focus:ring-[#ffbe00]/20"
                                        autoFocus
                                    />
                                </div>
                                
                                <Button
                                    type="submit"
                                    disabled={isLoading || pin.length < 6}
                                    className="w-full h-12 rounded-xl bg-[#ca1f3d] hover:bg-[#a01830] text-white font-bold transition-all shadow-[0_0_20px_rgba(202,31,61,0.4)] disabled:opacity-50 disabled:shadow-none"
                                >
                                    {isLoading && activeTab === 'pin' ? <Loader2 className="h-5 w-5 animate-spin" /> : 'UNLOCK COMMAND CENTER'}
                                </Button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Error Message Display */}
            <AnimatePresence>
                {error && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-4"
                    >
                        <div className="flex items-center justify-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-red-500 text-xs font-mono font-bold">
                            <AlertCircle className="h-4 w-4" />
                            {error}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
    