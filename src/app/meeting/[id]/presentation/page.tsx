
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Trophy, Users, TrendingUp, 
  Shield, Zap, CheckCircle, Target, Briefcase, Layout
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

// --- COMPONENTS PER SLIDE ---

// SLIDE 1: PEMBUKAAN (THE KICK-OFF)
const SlideKickOff = () => (
  <div className="flex h-full flex-col items-center justify-center text-center">
    <motion.div 
      initial={{ scale: 0, rotate: -180 }} 
      animate={{ scale: 1, rotate: 0 }} 
      transition={{ type: "spring", stiffness: 100 }}
      className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-[#ca1f3d] shadow-[0_0_50px_rgba(202,31,61,0.6)]"
    >
      <Trophy className="h-16 w-16 text-[#ffbe00]" />
    </motion.div>
    
    <motion.h1 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-7xl font-black uppercase italic tracking-tighter text-white"
    >
      Game <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ca1f3d] to-[#ffbe00]">On</span>
    </motion.h1>
    
    <motion.p 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ delay: 0.4 }}
      className="mt-4 text-2xl font-medium text-gray-400"
    >
      Kick-off Meeting BCC 2026: Integritas & Sportivitas
    </motion.p>

    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-12"
    >
      <Badge className="px-6 py-2 text-lg bg-[#ffbe00] text-black hover:bg-[#ffbe00]">
        PRESS SPACE TO START
      </Badge>
    </motion.div>
  </div>
);

// SLIDE 2: SPONSORSHIP (THE SCOREBOARD)
const SlideSponsorship = () => (
  <div className="grid h-full w-full grid-cols-1 gap-8 p-12 md:grid-cols-2">
    {/* Kiri: Progress */}
    <div className="flex flex-col justify-center gap-6">
      <h2 className="text-5xl font-black text-white uppercase">Sponsor <br/><span className="text-[#ca1f3d]">Secured</span></h2>
      <div className="relative h-64 w-64">
        <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
          <circle className="text-gray-800" strokeWidth="10" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
          <motion.circle 
            initial={{ pathLength: 0 }} 
            animate={{ pathLength: 0.85 }} 
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[#ffbe00]" strokeWidth="10" strokeLinecap="round" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" 
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-bold text-white">85%</span>
        </div>
      </div>
      <p className="text-xl text-gray-400">Target pendanaan hampir tercapai. Fokus pada closing 2 sponsor besar.</p>
    </div>

    {/* Kanan: Logo Grid */}
    <div className="grid grid-cols-2 gap-4 content-center">
      {['BANK BJB', 'AYO INDONESIA', 'YONEX', 'POCARI SWEAT'].map((sponsor, idx) => (
        <motion.div 
          key={sponsor}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.2 }}
          className="flex h-32 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
        >
          <span className="text-xl font-bold text-white/80">{sponsor}</span>
          {idx < 2 && <CheckCircle className="ml-2 h-5 w-5 text-[#ffbe00]" />}
        </motion.div>
      ))}
    </div>
  </div>
);

// SLIDE 3: BUDGETING (THE FUEL GAUGE)
const SlideBudgeting = () => (
  <div className="flex h-full flex-col px-12 py-8">
    <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
      <h2 className="text-4xl font-bold text-white">HONORARIUM SCHEME</h2>
      <div className="text-right">
        <p className="text-sm text-gray-400">TOTAL ALLOCATION</p>
        <p className="text-3xl font-mono font-bold text-[#ffbe00]">IDR 150.000.000</p>
      </div>
    </div>

    <div className="grid flex-1 grid-cols-3 gap-6">
        {[
            { tier: 'TIER 1', role: 'Core Team', icon: <Briefcase/>, val: '40%' },
            { tier: 'TIER 2', role: 'Field Ops', icon: <Zap/>, val: '35%' },
            { tier: 'TIER 3', role: 'Support', icon: <Users/>, val: '25%' },
        ].map((item, i) => (
            <motion.div 
                key={i}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                className="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-t from-[#1a1a1a] to-transparent p-6 border border-white/10"
            >
                <div className="absolute inset-0 bg-[#ca1f3d]/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="mb-4 h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white">
                    {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{item.tier}</h3>
                <p className="text-gray-400">{item.role}</p>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-800">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: item.val }}
                        transition={{ delay: 0.5 + (i*0.2), duration: 1 }}
                        className="h-full bg-[#ffbe00]" 
                    />
                </div>
                <span className="mt-2 text-right font-mono text-[#ffbe00]">{item.val}</span>
            </motion.div>
        ))}
    </div>
  </div>
);

// SLIDE 4: PEMBAGIAN TUGAS (THE SQUAD)
const SlideTaskForce = () => {
    const roles = [
        { title: "ADVISOR", name: "Aris Indro", color: "bg-purple-500", task: "Guardian & Strategy" },
        { title: "DIRECTOR", name: "Irsyad Jamal", color: "bg-[#ffbe00]", task: "Decision Maker" },
        { title: "SECRETARY", name: "Rizki & Annisa", color: "bg-blue-500", task: "Admin & Legal" },
        { title: "FINANCE", name: "Selvi Yulia", color: "bg-green-500", task: "Gatekeeper" },
    ];

    return (
        <div className="flex h-full flex-col items-center justify-center p-8">
             <h2 className="mb-12 text-4xl font-black uppercase text-white tracking-widest">Starting <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Lineup</span></h2>
             
             <div className="flex w-full max-w-5xl justify-center gap-6">
                {roles.map((role, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", delay: i * 0.15 }}
                        whileHover={{ y: -20, scale: 1.05 }}
                        className="relative flex h-80 w-60 flex-col items-center justify-end overflow-hidden rounded-3xl bg-gray-900 border border-white/5 shadow-2xl"
                    >
                        {/* Abstract Background */}
                        <div className={`absolute inset-0 opacity-20 ${role.color}`} />
                        <div className={`absolute top-0 h-32 w-full bg-gradient-to-b from-${role.color}/50 to-transparent`} />
                        
                        {/* Content */}
                        <div className="relative z-10 p-6 text-center w-full">
                            <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${role.color} text-black font-bold shadow-lg`}>
                                {role.title[0]}
                            </div>
                            <h3 className="text-sm font-bold tracking-widest text-gray-400">{role.title}</h3>
                            <p className="my-1 text-xl font-bold text-white leading-tight">{role.name}</p>
                            <div className="mt-4 rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase text-white backdrop-blur-md">
                                {role.task}
                            </div>
                        </div>
                    </motion.div>
                ))}
             </div>
        </div>
    )
}

// SLIDE 5: NEXT STEPS (THE ROADMAP)
const SlideRoadmap = () => (
    <div className="flex h-full w-full flex-col justify-center px-16">
        <h2 className="mb-16 text-4xl font-bold text-white">MISSION ROADMAP</h2>
        
        <div className="relative">
            {/* Line */}
            <div className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 bg-gray-800 rounded-full" />
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute left-0 top-1/2 h-2 -translate-y-1/2 bg-[#ca1f3d] rounded-full shadow-[0_0_20px_#ca1f3d]" 
            />

            {/* Points */}
            <div className="relative z-10 flex w-full justify-between">
                {[
                    { title: "Minggu 1", desc: "Finalisasi Tim" },
                    { title: "Minggu 2", desc: "Sponsorship Run" },
                    { title: "Minggu 3", desc: "Venue Check" },
                    { title: "GO LIVE", desc: "BCC 2026", active: true }
                ].map((step, i) => (
                    <motion.div 
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1 + (i * 0.3) }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#121212] ${step.active ? 'bg-[#ffbe00] h-12 w-12' : 'bg-[#ca1f3d]'}`} />
                        <div className="text-center">
                            <p className={`font-bold ${step.active ? 'text-[#ffbe00] text-xl' : 'text-white'}`}>{step.title}</p>
                            <p className="text-xs text-gray-500">{step.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
);


// --- MAIN PAGE COMPONENT ---

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const slides = [
    <SlideKickOff key="1" />,
    <SlideSponsorship key="2" />,
    <SlideBudgeting key="3" />,
    <SlideTaskForce key="4" />,
    <SlideRoadmap key="5" />,
  ];

  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') router.back();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0a0a0a] text-white overflow-hidden font-sans selection:bg-[#ffbe00] selection:text-black">
      
      {/* Top Bar Info */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20 opacity-50 hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2">
            <Layout className="h-5 w-5 text-[#ca1f3d]" />
            <span className="font-mono text-xs tracking-widest">BCC 2026 // DECK MODE</span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-xs hover:bg-white/10">
            EXIT PRESENTATION [ESC]
        </Button>
      </div>

      {/* Main Slide Area */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {slides[currentSlide]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 w-full p-8 flex justify-between items-end z-20">
        <div className="flex gap-1">
            {slides.map((_, i) => (
                <div key={i} className={`h-1 w-8 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-[#ffbe00] w-16' : 'bg-gray-800'}`} />
            ))}
        </div>
        
        <div className="flex items-center gap-4">
            <Button 
                variant="outline" 
                size="icon" 
                onClick={prevSlide} 
                disabled={currentSlide === 0}
                className="rounded-full border-white/20 bg-black/50 hover:bg-[#ca1f3d] hover:border-[#ca1f3d] hover:text-white transition-all"
            >
                <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="font-mono text-xl font-bold w-12 text-center">
                {currentSlide + 1}<span className="text-gray-600 text-sm">/{slides.length}</span>
            </span>
            <Button 
                variant="outline" 
                size="icon" 
                onClick={nextSlide} 
                disabled={currentSlide === slides.length - 1}
                className="rounded-full border-white/20 bg-black/50 hover:bg-[#ffbe00] hover:border-[#ffbe00] hover:text-black transition-all"
            >
                <ArrowRight className="h-5 w-5" />
            </Button>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#ca1f3d] opacity-5 blur-[120px]" />
      <div className="absolute bottom-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[#ffbe00] opacity-5 blur-[120px]" />
    </div>
  );
}
