'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutGrid, 
  Target, 
  Users, 
  LogOut, 
  Zap,
  Settings,
  Trophy
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DashboardLayoutProps {
  children: ReactNode;
}

// --- CONFIG: NAVIGATION ITEMS ---
const navItems = [
  { name: 'Command Center', href: '/project-director/dashboard', icon: LayoutGrid },
  { name: 'Missions (Meetings)', href: '/meeting', icon: Target }, // Menggunakan Target agar lebih sporty
  { name: 'Squad Roster', href: '/team', icon: Users },
  { name: 'Tournament', href: '/tournament', icon: Trophy }, // Placeholder page
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Clear session logic here
    localStorage.removeItem('bcc_session');
    router.push('/');
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white font-sans selection:bg-[#ffbe00] selection:text-black">
      
      {/* --- 1. DESKTOP FLOATING RAIL (Hidden on Mobile) --- */}
      <aside className="fixed left-6 top-6 bottom-6 z-50 hidden w-[90px] flex-col items-center justify-between rounded-[40px] border border-white/5 bg-[#121212]/80 py-8 backdrop-blur-2xl md:flex shadow-2xl">
        
        {/* Top: Brand Logo */}
        <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ca1f3d] to-[#ffbe00] shadow-[0_0_20px_rgba(202,31,61,0.4)]">
                <Zap className="h-6 w-6 text-white fill-white" />
            </div>
            {/* <span className="text-[10px] font-black tracking-widest text-[#ffbe00]">BCC</span> */}
        </div>

        {/* Center: Navigation Icons */}
        <nav className="flex flex-1 flex-col items-center justify-center gap-6 w-full px-2">
            <TooltipProvider delayDuration={0}>
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                        <Tooltip key={item.href}>
                            <TooltipTrigger asChild>
                                <Link href={item.href} className="relative group">
                                    {/* Active Indicator (Glowing Pill behind) */}
                                    {isActive && (
                                        <motion.div 
                                            layoutId="activeNavDesktop"
                                            className="absolute inset-0 rounded-2xl bg-[#ffbe00]"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}

                                    <div className={`
                                        relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300
                                        ${isActive ? 'text-black' : 'text-gray-500 hover:text-white hover:bg-white/10'}
                                    `}>
                                        <Icon className={`h-6 w-6 ${isActive ? 'fill-current' : ''}`} />
                                    </div>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="bg-[#ffbe00] text-black font-bold border-none ml-2">
                                <p>{item.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </TooltipProvider>
        </nav>

        {/* Bottom: Profile & Logout */}
        <div className="flex flex-col items-center gap-6">
            <Button 
                variant="ghost" size="icon" 
                onClick={handleLogout}
                className="rounded-full text-gray-500 hover:text-[#ca1f3d] hover:bg-[#ca1f3d]/10 transition-colors"
            >
                <LogOut className="h-5 w-5" />
            </Button>
            
            <Link href="/profile">
                <Avatar className="h-10 w-10 border-2 border-[#121212] cursor-pointer hover:border-[#ffbe00] transition-colors">
                    <AvatarImage src="https://github.com/irsyad.png" />
                    <AvatarFallback className="bg-gray-800 text-xs">IJ</AvatarFallback>
                </Avatar>
            </Link>
        </div>
      </aside>


      {/* --- 2. MOBILE BOTTOM BAR (Hidden on Desktop) --- */}
      <nav className="fixed bottom-6 left-6 right-6 z-50 flex h-20 items-center justify-between rounded-full border border-white/10 bg-[#121212]/90 px-6 backdrop-blur-xl md:hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
         {navItems.map((item) => {
             const isActive = pathname.startsWith(item.href);
             const Icon = item.icon;
             
             return (
                <Link key={item.href} href={item.href} className="relative flex flex-col items-center gap-1">
                    {isActive && (
                        <motion.div 
                            layoutId="activeNavMobile"
                            className="absolute -top-12 h-1 w-1 rounded-full bg-[#ffbe00] shadow-[0_0_15px_#ffbe00]"
                        />
                    )}
                    <div className={`
                        flex h-12 w-12 items-center justify-center rounded-full transition-all
                        ${isActive ? 'bg-[#ffbe00] text-black shadow-[0_0_20px_rgba(255,190,0,0.4)]' : 'text-gray-500'}
                    `}>
                        <Icon className={`h-5 w-5 ${isActive ? 'fill-current' : ''}`} />
                    </div>
                </Link>
             )
         })}
         
         {/* Mobile Menu Trigger (Logout/More) */}
         <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout}
            className="h-12 w-12 rounded-full text-gray-500 hover:text-[#ca1f3d]"
         >
             <LogOut className="h-5 w-5" />
         </Button>
      </nav>


      {/* --- 3. MAIN CONTENT WRAPPER --- */}
      <main className="min-h-screen w-full transition-all duration-300 md:pl-[130px]">
        {/* Efek Glow Background Global */}
        <div className="pointer-events-none fixed left-0 top-0 h-full w-full overflow-hidden">
            <div className="absolute -left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#ca1f3d]/5 blur-[120px]" />
            <div className="absolute -right-[10%] bottom-[20%] h-[500px] w-[500px] rounded-full bg-[#ffbe00]/5 blur-[120px]" />
        </div>

        {/* Konten Halaman */}
        <div className="relative z-10 pb-28 md:pb-0"> 
             {/* Padding bottom extra di mobile agar konten tidak tertutup nav bar */}
            {children}
        </div>
      </main>

    </div>
  );
}
