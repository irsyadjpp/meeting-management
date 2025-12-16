'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Play, 
  Plus, 
  MoreVertical, 
  Image as ImageIcon, 
  Type, 
  // Layout, // Unused import removed
  // Save, // Unused import removed
  // Menu // Unused import removed
} from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card'; // Unused import removed
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
// Removed PresentationOverlay import
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

// Tipe data Slide
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

// Mock Data Default jika kosong
const defaultSlides: Slide[] = [
  {
    id: '1',
    type: 'title',
    title: 'BCC 2026 Coordination',
    bullets: ['Integritas, Solidaritas, Sportivitas'],
    note: 'Sambut semua peserta dan jelaskan visi besar.'
  },
  {
    id: '2',
    type: 'content',
    title: 'Agenda Hari Ini',
    bullets: ['Update Sponsorship', 'Pembagian Tugas Inti', 'Skema Budgeting'],
    note: 'Fokus pada poin 2 karena krusial.'
  },
  {
    id: '3',
    type: 'image',
    title: 'Venue Layout',
    bullets: [],
    imageUrl: 'https://images.unsplash.com/photo-1626224583764-84786c713608?auto=format&fit=crop&q=80&w=800',
    note: 'Jelaskan alur masuk atlet.'
  }
];

export function SlideDeckManager({ meetingId, initialSlides = defaultSlides }: SlideDeckManagerProps) {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  // Removed isPresenting state since we are navigating to a new page
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  // Keyboard shortcut F5 untuk pindah ke halaman presentasi
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

  const handleUpdateSlide = (updatedSlide: Slide) => {
    setSlides(slides.map(s => s.id === updatedSlide.id ? updatedSlide : s));
  };

  const handleAddSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      type: 'content',
      title: 'New Slide',
      bullets: ['Add your point here'],
    };
    setSlides([...slides, newSlide]);
    setEditingSlide(newSlide);
  };

  const startPresentation = () => {
    // Navigasi ke halaman Presentation Page yang baru dibuat
    router.push(`/meeting/${meetingId}/presentation`);
  };

  return (
    <div className="relative flex h-full flex-col bg-background">
      {/* --- TOP APP BAR (NAVIGATION) --- */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-black/40 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.back()}
            className="rounded-full hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="hidden flex-col md:flex">
            <span className="text-xs font-medium text-muted-foreground">Meeting / Slide Deck</span>
            <h1 className="text-lg font-bold leading-none tracking-tight">Slide Editor</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <span className="mr-2 text-xs font-medium text-muted-foreground hidden sm:block">
            {slides.length} Slides
           </span>
          <Button 
            onClick={startPresentation}
            className="rounded-full bg-[#ca1f3d] font-bold text-[#ffbe00] hover:bg-[#a01830] hover:scale-105 transition-all shadow-[0_0_15px_rgba(202,31,61,0.5)]"
          >
            <Play className="mr-2 h-4 w-4 fill-current" />
            Start Presenting
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* --- MAIN EDITOR CONTENT --- */}
      <ScrollArea className="flex-1 p-6 sm:p-10">
        <div className="mx-auto max-w-6xl">
            {/* Grid Layout */}
            <motion.div 
                layout
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
                {/* Add Slide Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddSlide}
                    className="group flex aspect-video flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/5 transition-colors hover:border-[#ffbe00]/50 hover:bg-[#ffbe00]/5"
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-[#ffbe00] group-hover:text-black">
                        <Plus className="h-6 w-6" />
                    </div>
                    <span className="mt-3 font-medium text-muted-foreground group-hover:text-[#ffbe00]">Add Slide</span>
                </motion.button>

                {/* Slides List */}
                <AnimatePresence>
                    {slides.map((slide, index) => (
                        <motion.div
                            key={slide.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            whileHover={{ y: -5 }}
                            onClick={() => setEditingSlide(slide)}
                            className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-card shadow-lg transition-all hover:ring-2 hover:ring-[#ffbe00]"
                        >
                            {/* Slide Number Badge */}
                            <div className="absolute left-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-xs font-bold backdrop-blur-sm">
                                {index + 1}
                            </div>

                            {/* Mini Preview Content */}
                            <div className="flex h-full flex-col p-4">
                                <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                                    {slide.type === 'image' ? <ImageIcon className="h-3 w-3" /> : <Type className="h-3 w-3" />}
                                    {slide.type}
                                </div>
                                <h3 className="line-clamp-2 text-sm font-bold leading-tight text-foreground">
                                    {slide.title}
                                </h3>
                                {slide.type === 'image' && slide.imageUrl && (
                                    <div className="mt-2 h-full w-full overflow-hidden rounded-md bg-muted/20">
                                        <img src={slide.imageUrl} alt="Slide" className="h-full w-full object-cover opacity-50 grayscale transition-all group-hover:grayscale-0" />
                                    </div>
                                )}
                                {slide.type !== 'image' && (
                                    <div className="mt-2 space-y-1">
                                        {slide.bullets.slice(0, 3).map((bullet, i) => (
                                            <div key={i} className="h-1.5 w-full rounded-full bg-muted/20" />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
      </ScrollArea>

      {/* --- EDIT DRAWER (SHEET) --- */}
      <Sheet open={!!editingSlide} onOpenChange={() => setEditingSlide(null)}>
        <SheetContent className="w-[400px] border-l-white/10 bg-background/95 backdrop-blur-xl">
            <SheetHeader className="mb-6">
                <SheetTitle>Edit Slide</SheetTitle>
            </SheetHeader>
            {editingSlide && (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Type</label>
                        <div className="flex gap-2">
                            {['title', 'content', 'image'].map((type) => (
                                <Button
                                    key={type}
                                    variant={editingSlide.type === type ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handleUpdateSlide({ ...editingSlide, type: type as any })}
                                    className="flex-1 capitalize"
                                >
                                    {type}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Title</label>
                        <Input 
                            value={editingSlide.title} 
                            onChange={(e) => handleUpdateSlide({...editingSlide, title: e.target.value})}
                            className="bg-muted/50 font-bold"
                        />
                    </div>

                    {editingSlide.type === 'image' ? (
                        <div className="space-y-2">
                             <label className="text-xs font-semibold uppercase text-muted-foreground">Image URL</label>
                             <Input 
                                value={editingSlide.imageUrl || ''} 
                                onChange={(e) => handleUpdateSlide({...editingSlide, imageUrl: e.target.value})}
                                placeholder="https://..."
                            />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-muted-foreground">Bullet Points (One per line)</label>
                            <Textarea 
                                value={editingSlide.bullets.join('\n')} 
                                onChange={(e) => handleUpdateSlide({...editingSlide, bullets: e.target.value.split('\n')})}
                                className="min-h-[150px] bg-muted/50"
                                placeholder="- Point 1..."
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                         <label className="text-xs font-semibold uppercase text-muted-foreground">Speaker Notes</label>
                         <Textarea 
                            value={editingSlide.note || ''}
                            onChange={(e) => handleUpdateSlide({...editingSlide, note: e.target.value})}
                            className="bg-yellow-500/10 text-yellow-200/80" 
                            placeholder="Don't forget to mention..."
                        />
                    </div>
                </div>
            )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

    