'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Play, 
  Plus, 
  Image as ImageIcon, 
  Type, 
  List, 
  LayoutTemplate, 
  Trash2,
  MoreHorizontal,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

// --- TYPES ---
export interface Slide {
  id: string;
  type: 'title' | 'content' | 'image';
  title: string;
  bullets: string[];
  imageUrl?: string;
  note?: string;
}

interface SlideDeckManagerProps {
  meetingId: string;
  initialSlides?: Slide[];
}

// --- UPDATED DATA: TACTICAL PLAYBOOK (SOP & NEXT STEPS) ---
const defaultSlides: Slide[] = [
  // --- OPENING ---
  {
    id: '1',
    type: 'title',
    title: 'GAME ON: Kick-off Meeting',
    bullets: ['BCC 2026', 'Integritas & Sportivitas'],
    note: 'PRESS SPACE TO START'
  },
  
  // --- SECTION HEADER ---
  {
    id: '2',
    type: 'title',
    title: 'PHASE 1: ACTIVATION',
    bullets: ['Tactical Orders & SOP', 'Immediate Action Items'],
    note: 'Jelaskan bahwa ini adalah panduan kerja minggu pertama.'
  },

  // --- ROLE 1: PROJECT DIRECTOR ---
  {
    id: '3',
    type: 'content',
    title: 'ROLE: PROJECT DIRECTOR (The Captain)',
    bullets: [
      '🎯 TUGAS UTAMA:',
      '• Menyusun visi strategis & mengambil keputusan final (Veto Rights).',
      '• Menjadi wajah eksternal (Hubungan ke PBSI, Sponsor Utama, Pemerintah).',
      '• Mengawasi kinerja Koordinator Bidang.',
      '',
      '⚡ NEXT STEPS (SOP MINGGU INI):',
      '1. [Legal] Tanda tangani SK Panitia Pelaksana & Surat Tugas.',
      '2. [Ext] Jadwalkan pertemuan "Sowan" ke Pengkot PBSI & KONI.',
      '3. [Budget] Review & Approve RAB kasar dari Bendahara.',
      '4. [Tim] Pimpin rapat koordinasi perdana dengan seluruh Koordinator.'
    ],
    note: 'Irsyad: Fokus pada legalitas dan hubungan eksternal dulu.'
  },

  // --- ROLE 2: PENASEHAT ---
  {
    id: '4',
    type: 'content',
    title: 'ROLE: ADVISOR (The Guardian)',
    bullets: [
      '🎯 TUGAS UTAMA:',
      '• Memberikan pertimbangan strategis & mitigasi risiko.',
      '• Menjadi mediator jika ada konflik internal (The Judge).',
      '• Quality Control terhadap keputusan Project Director.',
      '',
      '⚡ NEXT STEPS (SOP MINGGU INI):',
      '1. [Review] Baca & validasi Timeline Kerja Global.',
      '2. [Risk] Identifikasi potensi masalah (misal: bentrok jadwal GOR).',
      '3. [Mentor] Sesi 1-on-1 dengan Project Director untuk pematangan visi.'
    ],
    note: 'Mas Aris: Pastikan timeline kita realistis.'
  },

  // --- ROLE 3: SEKRETARIS 1 ---
  {
    id: '5',
    type: 'content',
    title: 'ROLE: SEKRETARIS 1 (Chief of Admin)',
    bullets: [
      '🎯 TUGAS UTAMA:',
      '• Kepala Birokrasi: Legalitas, SK, Proposal, Surat Keluar.',
      '• Jembatan Komunikasi antar divisi (Traffic Controller).',
      '• Memimpin jalannya rapat (Agenda Setter).',
      '',
      '⚡ NEXT STEPS (SOP MINGGU INI):',
      '1. [Doc] Finalisasi Draft SK Panitia untuk ditandatangani PD.',
      '2. [Meet] Buat kalender rapat rutin mingguan (GCalendar).',
      '3. [Ext] Siapkan draft Surat Permohonan Rekomendasi PBSI.',
      '4. [Template] Buat template slide & laporan untuk divisi lain.'
    ],
    note: 'Rizki: SK harus jadi minggu ini agar tim punya legalitas.'
  },

  // --- ROLE 4: SEKRETARIS 2 ---
  {
    id: '6',
    type: 'content',
    title: 'ROLE: SEKRETARIS 2 (Data Ops)',
    bullets: [
      '🎯 TUGAS UTAMA:',
      '• Manajemen Database (Atlet, Sponsor, Volunteer).',
      '• Notulensi Rapat & Arsip Digital (Google Drive Keeper).',
      '• Absensi & Tracking Tasks.',
      '',
      '⚡ NEXT STEPS (SOP MINGGU INI):',
      '1. [System] Rapikan struktur folder Google Drive BCC 2026.',
      '2. [Data] Input data kontak seluruh panitia ke Excel Master.',
      '3. [MoM] Catat hasil rapat hari ini & share ke grup WhatsApp.',
      '4. [Log] Buat form absensi untuk rapat-rapat berikutnya.'
    ],
    note: 'Annisa: Pastikan tidak ada data yang tercecer.'
  },

  // --- ROLE 5: BENDAHARA ---
  {
    id: '7',
    type: 'content',
    title: 'ROLE: BENDAHARA (The Vault)',
    bullets: [
      '🎯 TUGAS UTAMA:',
      '• Gatekeeper Keuangan (Keluar/Masuk).',
      '• Menyusun RAB (Rencana Anggaran Biaya).',
      '• Membuat Laporan Keuangan (LPJ) transparan.',
      '',
      '⚡ NEXT STEPS (SOP MINGGU INI):',
      '1. [Plan] Susun Draft RAB Global (Estimasi Pemasukan vs Pengeluaran).',
      '2. [Account] Buka rekening khusus kepanitiaan (atau tunjuk rekening penampung).',
      '3. [Flow] Buat SOP Reimbursement & Pengajuan Dana untuk divisi.',
      '4. [Sponsor] Koordinasi dengan Tim Komersial untuk target dana masuk.'
    ],
    note: 'Selvi: RAB harus realistis, jangan sampai boncos.'
  },

  // --- CLOSING ---
  {
    id: '8',
    type: 'content',
    title: 'MISSION TIMELINE',
    bullets: [
      'JAN: Open Registration & Sounding',
      'FEB: Sponsorship Roadshow',
      'MAR: Registration Closed',
      'APR: Roster Lock',
      'MEI: Technical Meeting',
      'JUN-JUL: MAIN EVENT 🏆'
    ],
    note: 'Roadmap menuju puncak acara.'
  }
];

// --- COMPONENT: SLIDE CARD ---
const SlideCard = ({ slide, index, onClick, onDelete }: { slide: Slide, index: number, onClick: () => void, onDelete: (e: any) => void }) => {
    const getTypeIcon = () => {
        switch(slide.type) {
            case 'title': return <Type className="h-3 w-3" />;
            case 'image': return <ImageIcon className="h-3 w-3" />;
            default: return <List className="h-3 w-3" />;
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            onClick={onClick}
            className="group relative aspect-video cursor-pointer rounded-[20px] bg-[#121212] p-1 ring-1 ring-white/10 transition-all hover:ring-[#ffbe00] hover:shadow-[0_10px_30px_-10px_rgba(255,190,0,0.3)]"
        >
            {/* Inner Content (Glass Look) */}
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[16px] bg-white/5 p-5 backdrop-blur-sm">
                
                {/* Header: Number & Type */}
                <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="border-none bg-black/50 text-[#ffbe00] font-mono text-[10px] px-2 h-5">
                        SLIDE {String(index + 1).padStart(2, '0')}
                    </Badge>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-gray-400">
                        {getTypeIcon()}
                    </div>
                </div>

                {/* Body: Preview */}
                <div className="flex-1 overflow-hidden">
                    <h4 className="font-bold text-white line-clamp-2 text-sm leading-snug mb-2 group-hover:text-[#ffbe00] transition-colors">
                        {slide.title}
                    </h4>
                    
                    {slide.type === 'image' && slide.imageUrl ? (
                        <div className="h-16 w-full rounded-md bg-cover bg-center opacity-60 grayscale group-hover:grayscale-0 transition-all" style={{ backgroundImage: `url(${slide.imageUrl})` }} />
                    ) : (
                        <div className="space-y-1.5">
                            {slide.bullets.slice(0, 2).map((b, i) => (
                                <div key={i} className="flex items-start gap-2">
                                    <span className="mt-1 h-1 w-1 rounded-full bg-gray-600 group-hover:bg-[#ffbe00]" />
                                    <p className="text-[10px] text-gray-400 line-clamp-1">{b}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer: Notes Indicator */}
                {slide.note && (
                    <div className="mt-2 flex items-center gap-1 text-[9px] text-gray-600 font-mono">
                        <span className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-pulse" />
                        SPEAKER NOTES
                    </div>
                )}
            </div>

            {/* Hover Actions */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                    size="icon" 
                    variant="destructive" 
                    className="h-7 w-7 rounded-full" 
                    onClick={onDelete}
                >
                    <Trash2 className="h-3 w-3" />
                </Button>
            </div>
        </motion.div>
    );
};

// --- MAIN COMPONENT ---
export function SlideDeckManager({ meetingId, initialSlides = defaultSlides }: SlideDeckManagerProps) {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  // F5 Shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F5') {
        e.preventDefault();
        router.push(`/meeting/${meetingId}/presentation`);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [meetingId, router]);

  // Actions
  const handleUpdateSlide = (updated: Slide) => {
    setSlides(slides.map(s => s.id === updated.id ? updated : s));
  };

  const handleAddSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      type: 'content',
      title: 'New Strategy',
      bullets: ['Tactical point 1...'],
    };
    setSlides([...slides, newSlide]);
    setEditingSlide(newSlide);
    toast({ description: "New slide added to the deck." });
  };

  const handleDeleteSlide = (e: any, id: string) => {
    e.stopPropagation();
    setSlides(slides.filter(s => s.id !== id));
    toast({ description: "Slide removed." });
  };

  const startPresentation = () => {
    router.push(`/meeting/${meetingId}/presentation`);
  };

  return (
    <div className="relative flex h-full flex-col bg-[#050505] font-sans selection:bg-[#ffbe00] selection:text-black">
      
      {/* 1. COMMAND HEADER */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/5 bg-[#050505]/80 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.back()}
            className="h-10 w-10 rounded-full border border-white/10 bg-white/5 hover:bg-[#ffbe00] hover:text-black hover:border-[#ffbe00] transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-500">Editor Mode</span>
            </div>
            <h1 className="text-xl font-black tracking-tight text-white uppercase">
              Tactical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ca1f3d] to-[#ffbe00]">Deck</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5">
            <LayoutTemplate className="h-4 w-4 text-gray-400" />
            <span className="text-xs font-mono text-gray-300">
                {slides.length} <span className="text-gray-500">CARDS</span>
            </span>
          </div>

          <Button 
            onClick={startPresentation}
            className="h-10 rounded-full bg-[#ca1f3d] px-6 font-bold text-white hover:bg-[#a01830] hover:scale-105 transition-all shadow-[0_0_20px_rgba(202,31,61,0.4)]"
          >
            <Play className="mr-2 h-4 w-4 fill-current" />
            LIVE MODE
          </Button>
        </div>
      </header>

      {/* 2. MAIN GRID (CANVAS) */}
      <ScrollArea className="flex-1">
        <div className="mx-auto max-w-[1600px] p-6 sm:p-10">
            <motion.div 
                layout
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
                {/* Deck Cards */}
                <AnimatePresence mode="popLayout">
                    {slides.map((slide, index) => (
                        <SlideCard 
                            key={slide.id} 
                            slide={slide} 
                            index={index} 
                            onClick={() => setEditingSlide(slide)} 
                            onDelete={(e) => handleDeleteSlide(e, slide.id)}
                        />
                    ))}
                </AnimatePresence>

                {/* Add New Card (Ghost Style) */}
                <motion.button
                    layout
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddSlide}
                    className="group flex aspect-video flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-white/10 bg-white/5 transition-all hover:border-[#ffbe00]/50"
                >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1a1a1a] border border-white/10 group-hover:bg-[#ffbe00] group-hover:text-black transition-colors">
                        <Plus className="h-6 w-6" />
                    </div>
                    <span className="mt-4 font-bold text-gray-500 uppercase tracking-widest text-xs group-hover:text-[#ffbe00]">
                        New Tactic
                    </span>
                </motion.button>

            </motion.div>
        </div>
      </ScrollArea>

      {/* 3. EDIT DRAWER (TACTICAL PANEL) */}
      <Sheet open={!!editingSlide} onOpenChange={() => setEditingSlide(null)}>
        <SheetContent className="w-full sm:w-[480px] border-l-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl p-0 shadow-2xl">
            {editingSlide && (
                <div className="flex h-full flex-col">
                    {/* Drawer Header */}
                    <div className="border-b border-white/10 p-6">
                        <div className="flex items-center gap-2 mb-2">
                             <Badge variant="outline" className="text-[#ffbe00] border-[#ffbe00]/30 bg-[#ffbe00]/10 font-mono text-[10px]">EDITING</Badge>
                             <span className="text-xs text-gray-500 font-mono">ID: {editingSlide.id}</span>
                        </div>
                        <SheetTitle className="text-2xl font-black text-white uppercase">Slide Config</SheetTitle>
                        <SheetDescription>Atur konten visual untuk presentasi.</SheetDescription>
                    </div>

                    {/* Form Content */}
                    <ScrollArea className="flex-1 p-6">
                        <div className="space-y-8">
                            
                            {/* Type Selector */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Layout Type</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['title', 'content', 'image'].map((type) => (
                                        <div 
                                            key={type}
                                            onClick={() => handleUpdateSlide({ ...editingSlide, type: type as any })}
                                            className={`cursor-pointer rounded-lg border px-3 py-3 text-center transition-all ${
                                                editingSlide.type === type 
                                                ? 'border-[#ffbe00] bg-[#ffbe00]/10 text-[#ffbe00]' 
                                                : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'
                                            }`}
                                        >
                                            <span className="text-xs font-bold uppercase">{type}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Title Input */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Headline</label>
                                <Input 
                                    value={editingSlide.title} 
                                    onChange={(e) => handleUpdateSlide({...editingSlide, title: e.target.value})}
                                    className="bg-white/5 border-white/10 h-12 font-bold text-lg focus:border-[#ca1f3d] transition-all"
                                />
                            </div>

                            {/* Dynamic Content */}
                            {editingSlide.type === 'image' ? (
                                <div className="space-y-3">
                                     <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Visual Source</label>
                                     <Input 
                                        value={editingSlide.imageUrl || ''} 
                                        onChange={(e) => handleUpdateSlide({...editingSlide, imageUrl: e.target.value})}
                                        placeholder="https://image-url.com..."
                                        className="bg-white/5 border-white/10 font-mono text-xs"
                                    />
                                    {editingSlide.imageUrl && (
                                        <div className="mt-2 aspect-video w-full rounded-lg border border-white/10 bg-cover bg-center" style={{ backgroundImage: `url(${editingSlide.imageUrl})` }} />
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Tactical Points</label>
                                    <Textarea 
                                        value={editingSlide.bullets.join('\n')} 
                                        onChange={(e) => handleUpdateSlide({...editingSlide, bullets: e.target.value.split('\n')})}
                                        className="min-h-[200px] bg-white/5 border-white/10 font-medium leading-relaxed focus:border-[#ca1f3d] transition-all"
                                        placeholder="- Enter point..."
                                    />
                                    <p className="text-[10px] text-gray-500">* Pisahkan dengan baris baru (Enter)</p>
                                </div>
                            )}

                            {/* Notes */}
                            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
                                 <label className="flex items-center gap-2 text-xs font-bold uppercase text-yellow-500 tracking-wider mb-2">
                                    <Save className="h-3 w-3" /> Speaker Notes
                                 </label>
                                 <Textarea 
                                    value={editingSlide.note || ''}
                                    onChange={(e) => handleUpdateSlide({...editingSlide, note: e.target.value})}
                                    className="bg-transparent border-none text-yellow-200/80 text-xs min-h-[80px] focus-visible:ring-0 p-0" 
                                    placeholder="Catatan rahasia untuk presenter..."
                                />
                            </div>

                        </div>
                    </ScrollArea>
                    
                    {/* Drawer Footer */}
                    <div className="border-t border-white/10 p-6 bg-[#0a0a0a]">
                        <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold" onClick={() => setEditingSlide(null)}>
                            Save Configuration
                        </Button>
                    </div>
                </div>
            )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
