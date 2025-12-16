'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Shield, 
  Zap, 
  Crown, 
  Briefcase, 
  Globe, 
  Users, 
  Mail, 
  MessageCircle,
  Gavel,
  Camera
} from 'lucide-react';

// --- DATA: TEAM ROSTER (Based on SK Panitia) ---
//
const teamRoster = [
  // STEERING COMMITTEE
  { id: 'sc1', name: 'Irsyad Jamal', role: 'Project Director', division: 'Core', image: 'https://github.com/irsyad.png', status: 'online', badge: 'MVP' },
  { id: 'sc2', name: 'Aris Indro', role: 'Advisor', division: 'Core', image: '', status: 'offline', badge: 'LEGEND' },
  { id: 'sc3', name: 'Rizki Karami', role: 'Sekretaris 1', division: 'Core', image: '', status: 'busy', badge: 'ADMIN' },
  { id: 'sc4', name: 'Annisa Syafira', role: 'Sekretaris 2', division: 'Core', image: '', status: 'online', badge: 'ADMIN' },
  { id: 'sc5', name: 'Selvi Yulia', role: 'Bendahara', division: 'Core', image: '', status: 'online', badge: 'FINANCE' },

  // MATCH CONTROL
  { id: 'mc1', name: 'Wicky', role: 'Koordinator', division: 'Match', image: '', status: 'offline' },
  { id: 'mc2', name: 'Risca Amalia', role: 'Match Liaison Officer', division: 'Match', image: '', status: 'busy' },
  { id: 'mc3', name: 'Anindiffa Pandu', role: 'Tim Verifikasi (TPF)', division: 'Match', image: '', status: 'online' },

  // COMMERCIAL
  { id: 'cm1', name: 'Ali Wardana', role: 'Sponsorship Liaison', division: 'Commercial', image: '', status: 'online' },
  
  // SHOW & MEDIA
  { id: 'cr1', name: 'Sarah Maulidina', role: 'Social Media', division: 'Creative', image: '', status: 'online' },
  { id: 'cr2', name: 'Sarah Fatmawati', role: 'Content Creator', division: 'Creative', image: '', status: 'busy' },
  { id: 'cr3', name: 'Rizky Mauludin', role: 'Dokumentasi', division: 'Creative', image: '', status: 'offline' },

  // OPERATIONS
  { id: 'op1', name: 'Kevin Deriansyah', role: 'Koordinator Ops', division: 'Operations', image: '', status: 'online' },
  { id: 'op2', name: 'M. Nur Sidiq', role: 'Security & Gate', division: 'Operations', image: '', status: 'online' },
  { id: 'op3', name: 'Ananda Putri', role: 'Medical Team', division: 'Operations', image: '', status: 'busy' },
  { id: 'op4', name: 'Norma Ayu', role: 'Registration', division: 'Operations', image: '', status: 'offline' },
];

// --- CONFIG: DIVISION STYLES ---
const divisions = [
  { id: 'All', label: 'All Squad', icon: Users },
  { id: 'Core', label: 'Steering Comm.', icon: Crown, color: 'text-[#ffbe00]', bg: 'bg-[#ffbe00]/10', border: 'border-[#ffbe00]/20' },
  { id: 'Match', label: 'Match Control', icon: Zap, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  { id: 'Commercial', label: 'Commercial', icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'Creative', label: 'Show & Media', icon: Camera, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { id: 'Operations', label: 'Operations', icon: Shield, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
];

// --- COMPONENT: MEMBER CARD ---
const MemberCard = ({ member, index }: { member: typeof teamRoster[0], index: number }) => {
  const isCore = member.division === 'Core';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ delay: index * 0.05 }}
      className={`group relative overflow-hidden rounded-[24px] border bg-[#121212] p-6 transition-all hover:bg-[#1a1a1a] ${isCore ? 'border-[#ffbe00]/30 shadow-[0_0_20px_rgba(255,190,0,0.1)]' : 'border-white/5'}`}
    >
      {/* Badge / Decor */}
      {member.badge && (
        <div className="absolute -right-8 top-4 rotate-45 bg-[#ffbe00] px-8 py-1 text-[10px] font-black text-black">
          {member.badge}
        </div>
      )}

      <div className="flex flex-col items-center text-center">
        {/* Avatar with Status Ring */}
        <div className="relative mb-4">
          <Avatar className={`h-24 w-24 border-4 ${isCore ? 'border-[#ffbe00]' : 'border-[#2a2a2a]'} group-hover:scale-105 transition-transform`}>
            <AvatarImage src={member.image} />
            <AvatarFallback className="text-xl font-black bg-[#2a2a2a] text-white">
                {member.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          {/* Status Indicator */}
          <span className={`absolute bottom-1 right-1 h-5 w-5 rounded-full border-4 border-[#121212] ${
            member.status === 'online' ? 'bg-green-500' : 
            member.status === 'busy' ? 'bg-red-500' : 'bg-gray-500'
          }`} />
        </div>

        {/* Info */}
        <h3 className="text-lg font-bold text-white group-hover:text-[#ffbe00] transition-colors line-clamp-1">
            {member.name}
        </h3>
        <p className="text-sm text-gray-400 font-medium mb-4">{member.role}</p>

        {/* Division Badge */}
        <Badge variant="outline" className="mb-6 border-white/10 bg-white/5 text-xs text-gray-500 uppercase tracking-widest">
            {member.division}
        </Badge>

        {/* Actions (Floating) */}
        <div className="flex gap-2 opacity-100 sm:opacity-0 sm:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
             <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full bg-white/5 hover:bg-[#25D366] hover:text-white transition-colors">
                <MessageCircle className="h-4 w-4" />
             </Button>
             <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full bg-white/5 hover:bg-blue-500 hover:text-white transition-colors">
                <Mail className="h-4 w-4" />
             </Button>
        </div>
      </div>
    </motion.div>
  );
};


export default function TeamPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter Logic
  const filteredMembers = teamRoster.filter(member => {
    const matchesFilter = activeFilter === 'All' ? true : member.division === activeFilter;
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          member.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="min-h-full bg-[#050505] p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#ffbe00] selection:text-black">
        
        {/* 1. HEADER HERO */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
                <h1 className="text-5xl font-black uppercase tracking-tighter text-white">
                    Team <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ca1f3d] to-[#ffbe00]">Roster</span>
                </h1>
                <p className="mt-2 text-gray-400 font-medium max-w-lg">
                    Struktur organisasi dan personil inti BCC 2026.
                    <br/><span className="text-xs uppercase tracking-widest text-[#ffbe00]">Total Active Agents: {teamRoster.length}</span>
                </p>
            </div>

            {/* Search Bar */}
            <div className="relative group w-full md:w-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-hover:text-[#ffbe00] transition-colors" />
                <Input
                    placeholder="Find agent..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full md:w-[300px] h-12 rounded-full border-white/10 bg-white/5 pl-11 text-white placeholder:text-gray-600 focus:border-[#ffbe00]/50 focus:bg-white/10 transition-all"
                />
            </div>
        </div>

        {/* 2. DIVISION FILTERS (Scrollable) */}
        <div className="mb-8 overflow-x-auto pb-4">
            <div className="flex gap-3 w-max">
                {divisions.map((div) => {
                    const isActive = activeFilter === div.id;
                    const Icon = div.icon;
                    return (
                        <button
                            key={div.id}
                            onClick={() => setActiveFilter(div.id)}
                            className={`
                                relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition-all duration-300 border
                                ${isActive 
                                    ? `bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105` 
                                    : 'bg-[#121212] border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
                                }
                            `}
                        >
                            <Icon className={`h-4 w-4 ${isActive ? 'text-black' : ''}`} />
                            {div.label}
                        </button>
                    )
                })}
            </div>
        </div>

        {/* 3. ROSTER GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
            <AnimatePresence mode="popLayout">
                {filteredMembers.map((member, idx) => (
                    <MemberCard key={member.id} member={member} index={idx} />
                ))}
            </AnimatePresence>
            
            {filteredMembers.length === 0 && (
                <div className="col-span-full py-20 text-center">
                    <Users className="mx-auto h-16 w-16 text-gray-800 mb-4" />
                    <h3 className="text-xl font-bold text-gray-500">No agents found.</h3>
                    <Button 
                        variant="link" 
                        className="text-[#ffbe00]"
                        onClick={() => {setSearchTerm(''); setActiveFilter('All');}}
                    >
                        Reset Search
                    </Button>
                </div>
            )}
        </div>

      </div>
    </DashboardLayout>
  );
}
