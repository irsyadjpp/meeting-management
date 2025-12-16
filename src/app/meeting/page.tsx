'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { meetings, teamMembers } from '@/lib/data';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Search,
  Clock,
  Video,
  Plus,
  Ghost,
  MapPin,
  ArrowUpRight,
  Zap
} from 'lucide-react';
import { format } from 'date-fns';
import { NewMeetingDialog } from '@/components/dashboard/new-meeting-dialog';
import { useGoogleCalendar } from '@/hooks/use-google-calendar';
import { useToast } from '@/hooks/use-toast';

// --- TYPES & UTILS ---
type Status = 'All' | 'Upcoming' | 'Live' | 'Completed';

// Konfigurasi Warna & Style per Status
const statusConfig = {
  Live: {
    color: 'bg-[#ca1f3d]',
    border: 'border-[#ca1f3d]',
    glow: 'shadow-[0_0_20px_rgba(202,31,61,0.5)]',
    label: 'LIVE NOW',
    icon: Zap
  },
  Upcoming: {
    color: 'bg-[#ffbe00]',
    border: 'border-[#ffbe00]',
    glow: 'shadow-[0_0_15px_rgba(255,190,0,0.3)]',
    label: 'SCHEDULED',
    icon: Clock
  },
  Completed: {
    color: 'bg-emerald-500',
    border: 'border-emerald-500',
    glow: '',
    label: 'DONE',
    icon: null
  }
};

// --- COMPONENT: MEETING CARD ---
const MeetingCard = ({ meeting, index }: { meeting: typeof meetings[0], index: number }) => {
  const statusKey = meeting.status as keyof typeof statusConfig;
  const config = statusConfig[statusKey] || statusConfig.Completed;
  const isLive = meeting.status === 'Live';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      className="group relative w-full"
    >
      <Link href={`/meeting/${meeting.id}`}>
        <div className={`
            relative overflow-hidden rounded-[24px] border border-white/5 bg-[#121212] p-6 
            transition-all duration-300 hover:bg-[#1a1a1a] hover:border-white/10 hover:scale-[1.01]
            ${isLive ? 'border-[#ca1f3d]/50 bg-[#ca1f3d]/5' : ''}
        `}>
          
          {/* Status Indicator Line (Left Glow Strip) */}
          <div className={`absolute left-0 top-0 h-full w-1.5 ${config.color} ${config.glow}`} />

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            
            {/* 1. Date Badge (Sporty Poster Style) */}
            <div className="flex shrink-0 flex-row items-center gap-4 sm:flex-col sm:gap-1">
              <div className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md group-hover:bg-white/10 transition-colors">
                <span className="text-xs font-bold uppercase text-[#ffbe00] tracking-widest">{format(meeting.date, 'MMM')}</span>
                <span className="text-4xl font-black text-white tracking-tighter">{format(meeting.date, 'dd')}</span>
              </div>
            </div>

            {/* 2. Main Content */}
            <div className="flex-1 space-y-2">
               {/* Metadata Chips */}
               <div className="flex items-center gap-3">
                 <Badge variant="outline" className={`border-none ${config.color}/20 ${config.color.replace('bg-', 'text-')} font-mono text-[10px] uppercase tracking-widest`}>
                    {isLive && <span className="mr-1.5 relative inline-flex h-2 w-2 rounded-full bg-current animate-pulse"/>}
                    {config.label}
                 </Badge>
                 
                 {meeting.googleMeetLink && (
                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 gap-1 border-none hover:bg-blue-500/20">
                        <Video className="h-3 w-3" /> GMeet
                    </Badge>
                 )}
               </div>
               
               {/* Title */}
               <h3 className="text-xl font-bold leading-tight text-white group-hover:text-[#ffbe00] transition-colors">
                 {meeting.title}
               </h3>

               {/* Location & Time */}
               <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-[#ca1f3d]" />
                    <span>{meeting.startTime} - {meeting.endTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>GOR KONI Bandung</span>
                  </div>
               </div>
            </div>

            {/* 3. Right Section: Attendees & Action Button */}
            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-3">
                {/* Avatar Pile */}
                <div className="flex -space-x-3 pl-2">
                    {meeting.attendees.slice(0, 4).map((attendee, i) => (
                        <Avatar key={i} className="h-9 w-9 border-2 border-[#121212] transition-transform hover:z-10 hover:scale-110">
                            <AvatarImage src={attendee.avatar?.imageUrl} />
                            <AvatarFallback className="bg-[#ffbe00] text-black font-bold text-[10px]">
                                {attendee.name.substring(0,2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    ))}
                    {meeting.attendees.length > 4 && (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#121212] bg-[#2a2a2a] text-[10px] font-bold text-white">
                            +{meeting.attendees.length - 4}
                        </div>
                    )}
                </div>
                
                {/* Action Arrow */}
                <Button size="icon" variant="ghost" className="rounded-full bg-white/5 text-white hover:bg-[#ffbe00] hover:text-black transition-all group-hover:scale-110">
                    <ArrowUpRight className="h-5 w-5" />
                </Button>
            </div>
          </div>
          
          {/* Background Decor (Glow Effect on Hover) */}
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>
    </motion.div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function MeetingsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState<Status>('All');
    const [isNewMeetingOpen, setNewMeetingOpen] = useState(false);
    const { isAuthenticated, createEvent } = useGoogleCalendar();
    const { toast } = useToast();

    // --- CREATE LOGIC (Simulated) ---
    const handleCreateMeeting = async (meetingData: any) => {
        if (meetingData.syncToGoogle && !isAuthenticated) {
            toast({ title: "Auth Required", description: "Please sign in with Google first.", variant: "destructive" });
            return;
        }

        const newMeetingPayload = {
            summary: `BCC 2026: ${meetingData.title}`,
            description: meetingData.description || 'Generated by BCC System.',
            start: { dateTime: new Date(meetingData.dateTime).toISOString() },
            end: { dateTime: new Date(new Date(meetingData.dateTime).getTime() + 3600000).toISOString() },
            attendees: meetingData.participants.map((p: any) => ({ email: p.email })),
             conferenceData: { createRequest: { requestId: `bcc-${Date.now()}`, conferenceSolutionKey: { type: "hangoutsMeet" } } },
        };
        
        try {
            const calendarData = meetingData.syncToGoogle && isAuthenticated ? await createEvent(newMeetingPayload) : null;
            
            const newMeeting = {
                id: (meetings.length + 1).toString(),
                title: meetingData.title,
                date: new Date(meetingData.dateTime),
                startTime: new Date(meetingData.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                endTime: new Date(new Date(meetingData.dateTime).getTime() + 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                attendees: meetingData.participants.map((p:any) => teamMembers.find(tm => tm.id === p.id)).filter(Boolean),
                status: 'Upcoming',
                agenda: meetingData.agenda?.split('\n') || [],
                minutes: null,
                isSyncedToGoogle: !!calendarData,
                googleMeetLink: calendarData?.hangoutLink,
            };
            
            meetings.unshift(newMeeting as any);
            toast({ title: "Mission Scheduled!", description: "Log updated successfully.", className: "bg-[#ffbe00] text-black border-none font-bold" });
            setNewMeetingOpen(false);
        } catch (error) {
            toast({ title: "Failed", description: "Could not create meeting.", variant: "destructive" });
        }
    };

    // --- FILTER LOGIC ---
    const filteredMeetings = meetings
        .filter(m => activeFilter === 'All' ? true : m.status === activeFilter)
        .filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()) || (m.agenda && m.agenda.some(a => a.toLowerCase().includes(searchTerm.toLowerCase()))))
        .sort((a, b) => b.date.getTime() - a.date.getTime());

    return (
        <DashboardLayout>
            <div className="relative flex min-h-full flex-col bg-[#050505] p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#ffbe00] selection:text-black">
                
                {/* 1. HERO HEADER */}
                <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                             <span className="flex h-2 w-2 rounded-full bg-[#ffbe00] animate-pulse"></span>
                             <span className="text-[10px] font-mono text-[#ffbe00] uppercase tracking-widest">System Online</span>
                        </div>
                        <h1 className="text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
                            Mission <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ca1f3d] to-[#ffbe00]">Logs</span>
                        </h1>
                        <p className="mt-2 text-gray-400 font-medium max-w-md">
                            Pusat komando jadwal BCC 2026. Pantau koordinasi dan eksekusi lapangan.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        {/* Search Bar (Glass) */}
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-hover:text-[#ffbe00] transition-colors" />
                            <Input
                                placeholder="Search mission..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full sm:w-[280px] h-12 rounded-full border-white/10 bg-white/5 pl-11 text-white placeholder:text-gray-600 focus:border-[#ffbe00]/50 focus:bg-white/10 transition-all shadow-inner"
                            />
                        </div>
                        
                        {/* New Mission Button */}
                        <Button 
                            onClick={() => setNewMeetingOpen(true)}
                            className="hidden sm:flex h-12 rounded-full bg-[#ca1f3d] px-8 font-bold text-white hover:bg-[#a01830] hover:scale-105 transition-all shadow-[0_0_20px_rgba(202,31,61,0.4)]"
                        >
                            <Plus className="mr-2 h-4 w-4" /> New Mission
                        </Button>
                    </div>
                </div>

                {/* 2. FILTER CHIPS (Sporty Tabs) */}
                <div className="mb-8 flex flex-wrap gap-2">
                    {(['All', 'Live', 'Upcoming', 'Completed'] as Status[]).map(status => {
                        const isActive = activeFilter === status;
                        return (
                            <button
                                key={status}
                                onClick={() => setActiveFilter(status)}
                                className={`
                                    relative h-10 px-6 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300
                                    ${isActive 
                                        ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-105 z-10' 
                                        : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/10'
                                    }
                                `}
                            >
                                {status}
                                {status === 'Live' && isActive && (
                                    <span className="absolute -right-1 -top-1 flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ca1f3d] opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ca1f3d]"></span>
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* 3. MEETINGS LIST */}
                <div className="flex-1 space-y-4 pb-20">
                    <AnimatePresence mode="popLayout">
                        {filteredMeetings.length > 0 ? (
                            filteredMeetings.map((meeting, idx) => (
                                <MeetingCard key={meeting.id} meeting={meeting} index={idx} />
                            ))
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex h-[400px] flex-col items-center justify-center rounded-[32px] border border-dashed border-white/10 bg-white/5 text-center"
                            >
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#1a1a1a] border border-white/5">
                                    <Ghost className="h-8 w-8 text-gray-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">No Missions Found</h3>
                                <p className="mt-2 text-gray-400 max-w-xs mx-auto">
                                    Filter ini kosong. Saatnya istirahat atau buat strategi baru?
                                </p>
                                <Button 
                                    variant="outline" 
                                    className="mt-6 rounded-full border-[#ffbe00] text-[#ffbe00] hover:bg-[#ffbe00] hover:text-black"
                                    onClick={() => { setSearchTerm(''); setActiveFilter('All'); }}
                                >
                                    Reset Filters
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* 4. FAB (Mobile Only) */}
                <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="fixed bottom-6 right-6 z-30 sm:hidden"
                >
                    <Button
                        size="icon"
                        onClick={() => setNewMeetingOpen(true)}
                        className="h-16 w-16 rounded-full bg-[#ca1f3d] text-white shadow-[0_0_20px_rgba(202,31,61,0.6)]"
                    >
                        <Plus className="h-8 w-8" />
                    </Button>
                </motion.div>

                {/* DIALOGS */}
                <NewMeetingDialog
                    isOpen={isNewMeetingOpen}
                    onOpenChange={setNewMeetingOpen}
                    onSubmit={handleCreateMeeting}
                    teamMembers={teamMembers}
                    isAuthenticated={isAuthenticated}
                />
            </div>
        </DashboardLayout>
    );
}
