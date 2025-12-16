'use client';

import { motion } from 'framer-motion';
import { 
  CalendarDays, 
  Users, 
  Trophy, 
  TrendingUp, 
  ArrowUpRight,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { format } from 'date-fns';

// Mock Data untuk preview cepat
const stats = [
  { label: 'Total Budget', value: '150jt', trend: '+12%', icon: TrendingUp, color: 'text-green-400' },
  { label: 'Sponsors', value: '4/12', trend: 'On Track', icon: Trophy, color: 'text-[#ffbe00]' },
  { label: 'Team Members', value: '24', trend: 'Active', icon: Users, color: 'text-blue-400' },
];

const upcomingMeeting = {
  title: "Technical Briefing & Final Venue Check",
  time: "14:00 - 16:00",
  date: new Date(),
  attendees: 8,
  type: "Urgent"
};

// --- BENTO COMPONENTS (Internal untuk kemudahan copy-paste) ---

const WelcomeCard = () => (
  <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[32px] bg-gradient-to-br from-[#ca1f3d] to-[#8a1529] p-8 text-white shadow-2xl">
    {/* Background Decor */}
    <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
    <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[#ffbe00]/20 blur-3xl" />
    
    <div className="relative z-10">
      <Badge className="mb-4 bg-white/20 hover:bg-white/30 text-white border-none uppercase tracking-widest backdrop-blur-md">
        Project Director
      </Badge>
      <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl">
        Ready to Lead, <br/>
        <span className="text-[#ffbe00]">Irsyad?</span>
      </h1>
      <p className="mt-4 max-w-sm text-white/80 font-medium">
        Hari ini ada 3 agenda penting yang butuh persetujuan Anda. Semangat!
      </p>
    </div>
    
    <div className="relative z-10 mt-8 flex gap-4">
      <Button className="h-12 rounded-full bg-[#ffbe00] px-8 text-black hover:bg-[#e6ac00] font-bold shadow-[0_0_20px_rgba(255,190,0,0.4)] transition-all hover:scale-105">
        <Zap className="mr-2 h-4 w-4 fill-black" />
        Quick Action
      </Button>
      <Button variant="outline" className="h-12 rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-md">
        View Schedule
      </Button>
    </div>
  </div>
);

const StatCard = ({ stat, index }: { stat: typeof stats[0], index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 + (index * 0.1) }}
    className="flex flex-col justify-between rounded-[24px] border border-white/5 bg-white/5 p-6 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/10 group"
  >
    <div className="flex items-start justify-between">
      <div className={`rounded-full p-3 bg-white/5 ${stat.color}`}>
        <stat.icon className="h-6 w-6" />
      </div>
      <Badge variant="outline" className={`border-none bg-white/5 ${stat.color} font-mono`}>
        {stat.trend}
      </Badge>
    </div>
    <div>
      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</p>
      <h3 className="mt-1 text-3xl font-black text-foreground tracking-tight group-hover:scale-105 transition-transform origin-left">
        {stat.value}
      </h3>
    </div>
  </motion.div>
);

const MeetingHeroCard = () => (
  <div className="group relative h-full overflow-hidden rounded-[32px] border border-white/10 bg-[#0f0f0f] p-1 transition-all hover:border-[#ffbe00]/50">
    <div className="flex h-full flex-col justify-between rounded-[28px] bg-white/5 p-6 backdrop-blur-2xl">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
           <span className="text-xs font-bold text-[#ffbe00] uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffbe00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffbe00]"></span>
              </span>
              Up Next
           </span>
           <h3 className="text-2xl font-bold leading-tight text-white max-w-[80%]">
             {upcomingMeeting.title}
           </h3>
        </div>
        <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-[#1a1a1a] border border-white/10 text-center">
             <span className="text-xs font-bold text-gray-400 uppercase">{format(upcomingMeeting.date, 'MMM')}</span>
             <span className="text-lg font-black text-white">{format(upcomingMeeting.date, 'dd')}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-sm text-gray-400">
            <CalendarDays className="h-4 w-4 text-[#ca1f3d]" />
            <span>{upcomingMeeting.time}</span>
            <span className="h-1 w-1 rounded-full bg-gray-600" />
            <span className="text-white font-medium">{upcomingMeeting.attendees} Members</span>
        </div>
        
        <div className="flex gap-2">
            <Link href="/meeting/1/presentation" className="flex-1">
                <Button className="w-full h-12 rounded-xl bg-[#ca1f3d] text-white hover:bg-[#a11830] font-bold group-hover:shadow-[0_0_20px_rgba(202,31,61,0.4)] transition-all">
                    Start Presentation
                </Button>
            </Link>
            <Link href="/meeting/1" className="aspect-square">
                 <Button variant="outline" className="h-12 w-12 rounded-xl border-white/10 bg-transparent hover:bg-white/10">
                    <ArrowUpRight className="h-5 w-5" />
                 </Button>
            </Link>
        </div>
      </div>
    </div>
  </div>
);

const QuickLinksGrid = () => (
    <div className="grid grid-cols-2 gap-4 h-full">
        {[
            { label: 'New Meeting', icon: CalendarDays, href: '/meeting', color: 'bg-blue-500/20 text-blue-400' },
            { label: 'Team Squad', icon: Users, href: '/team', color: 'bg-purple-500/20 text-purple-400' },
            { label: 'Proposals', icon: Trophy, href: '#', color: 'bg-pink-500/20 text-pink-400' },
            { label: 'Analytics', icon: TrendingUp, href: '#', color: 'bg-green-500/20 text-green-400' },
        ].map((item, i) => (
            <Link key={i} href={item.href}>
                <motion.div 
                    whileHover={{ scale: 0.95 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex flex-col items-center justify-center gap-3 h-full rounded-[24px] bg-white/5 border border-white/5 hover:bg-white/10 transition-colors p-4 cursor-pointer"
                >
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${item.color}`}>
                        <item.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold text-gray-300">{item.label}</span>
                </motion.div>
            </Link>
        ))}
    </div>
)

// --- MAIN PAGE LAYOUT ---

export default function ProjectDirectorDashboard() {
  return (
    <div className="min-h-screen bg-[#050505] text-foreground p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#ffbe00] selection:text-black">
      
      {/* HEADER (Mobile Only) */}
      <div className="md:hidden mb-6 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <Avatar>
                <AvatarImage src="https://github.com/irsyad.png" />
                <AvatarFallback>IJ</AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-lg font-bold text-white">Hi, Irsyad</h1>
                <p className="text-xs text-gray-400">Project Director</p>
            </div>
         </div>
         <Button size="icon" variant="ghost" className="rounded-full"><Zap/></Button>
      </div>

      {/* BENTO GRID LAYOUT */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
        
        {/* 1. WELCOME CARD (Big - 2x2 on Desktop) */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-3 lg:col-span-2 md:row-span-2"
        >
            <WelcomeCard />
        </motion.div>

        {/* 2. STATS CARDS (Top Right) */}
        {stats.map((stat, i) => (
             <StatCard key={i} stat={stat} index={i} />
        ))}

        {/* 3. UPCOMING MEETING (Tall Vertical) */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="md:col-span-2 lg:col-span-1 md:row-span-2"
        >
            <MeetingHeroCard />
        </motion.div>

        {/* 4. QUICK LINKS (Grid 2x2 inside a cell) */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
            className="md:col-span-1 md:row-span-2"
        >
            <QuickLinksGrid />
        </motion.div>

        {/* 5. WIDE BANNER (Running Text / Motivation) */}
        <div className="md:col-span-3 lg:col-span-4 rounded-[24px] border border-[#ffbe00]/20 bg-[#ffbe00]/5 p-4 flex items-center justify-between overflow-hidden">
            <div className="flex items-center gap-4 animate-marquee whitespace-nowrap">
                <Badge variant="outline" className="border-[#ffbe00] text-[#ffbe00]">REMINDER</Badge>
                <span className="text-sm font-medium text-gray-300">
                    Jangan lupa review dokumen <span className="text-white font-bold">RAB Divisi Operasional</span> sebelum jam 17:00 WIB.
                </span>
            </div>
             <ArrowUpRight className="h-4 w-4 text-[#ffbe00] hidden sm:block" />
        </div>

      </div>
    </div>
  );
}
