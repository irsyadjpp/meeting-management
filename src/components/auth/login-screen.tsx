'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Shield, Zap, ArrowRight, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Definisikan tipe props
interface LoginScreenProps {
  onLogin: () => void;
  onLoginAsDirector: () => void;
  onLoginAsStaff: () => void;
}

const GoogleIcon = () => (
    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );

export function LoginScreen({ onLogin, onLoginAsDirector, onLoginAsStaff }: LoginScreenProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    onLogin();
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#050505] font-sans selection:bg-[#ffbe00] selection:text-black">
      
      {/* Background Gradients */}
      <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[#ca1f3d]/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#ffbe00]/10 blur-[120px]" />

      <div className="z-10 grid w-full max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-2">
        
        {/* Left Side: Brand Typography */}
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

        {/* Right Side: Login Card */}
        <div className="flex items-center justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl"
          >
            {/* Header */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-white">Welcome Back, Champion.</h2>
              <p className="text-sm text-gray-400">Access the committee dashboard.</p>
            </div>

            {/* Google Login */}
            <Button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="group relative w-full h-14 rounded-full bg-white hover:bg-gray-100 text-black font-bold text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              {isLoading ? (
                <span className="animate-pulse">Connecting...</span>
              ) : (
                <div className="flex items-center justify-center gap-3">
                   <GoogleIcon />
                  Sign in with Google
                </div>
              )}
            </Button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0f0f0f] px-2 text-muted-foreground font-mono">
                  Or (Dev Mode Bypass)
                </span>
              </div>
            </div>

            {/* Dev Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={onLoginAsDirector}
                className="h-12 border-white/10 bg-white/5 hover:bg-[#ffbe00]/10 hover:text-[#ffbe00] hover:border-[#ffbe00]/50 transition-all group"
              >
                <Shield className="mr-2 h-4 w-4 text-gray-400 group-hover:text-[#ffbe00]" />
                Director
              </Button>
              <Button
                variant="outline"
                onClick={onLoginAsStaff}
                className="h-12 border-white/10 bg-white/5 hover:bg-[#ca1f3d]/10 hover:text-[#ca1f3d] hover:border-[#ca1f3d]/50 transition-all group"
              >
                <Layout className="mr-2 h-4 w-4 text-gray-400 group-hover:text-[#ca1f3d]" />
                Staff
              </Button>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
