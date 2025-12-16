'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Slide } from './slide-deck-manager';

export function PresentationOverlay({ slides, onExit }: { slides: Slide[], onExit: () => void }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentSlide = slides[currentIndex];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ') setCurrentIndex(prev => Math.min(prev + 1, slides.length - 1));
            if (e.key === 'ArrowLeft') setCurrentIndex(prev => Math.max(prev - 1, 0));
            if (e.key === 'Escape') onExit();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [slides.length, onExit]);

    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white"
        >
            {/* Controls */}
            <div className="absolute top-6 right-6 z-50">
                <Button variant="ghost" onClick={onExit} className="rounded-full hover:bg-white/20"><X /></Button>
            </div>
            
            {/* Slide Content */}
            <div className="w-full max-w-6xl px-12">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="flex flex-col gap-8"
                    >
                        <h1 className="text-6xl font-black uppercase tracking-tighter text-[#ca1f3d]">
                            {currentSlide.title}
                        </h1>
                        <div className="h-1 w-32 bg-[#ffbe00]" />
                        
                        {currentSlide.type === 'image' && currentSlide.imageUrl ? (
                            <img src={currentSlide.imageUrl} className="max-h-[60vh] rounded-lg object-contain" />
                        ) : (
                            <ul className="space-y-6 text-3xl font-medium text-gray-300">
                                {currentSlide.bullets.map((point, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <span className="mt-2.5 h-3 w-3 rounded-full bg-[#ffbe00]" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom Bar */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between p-6 opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-sm font-mono text-gray-500">BCC 2026 PRESENTATION MODE</span>
                <div className="flex gap-4">
                    <Button variant="outline" size="icon" onClick={() => setCurrentIndex(p => Math.max(p - 1, 0))}><ChevronLeft /></Button>
                    <span className="flex items-center font-mono">{currentIndex + 1} / {slides.length}</span>
                    <Button variant="outline" size="icon" onClick={() => setCurrentIndex(p => Math.min(p + 1, slides.length - 1))}><ChevronRight /></Button>
                </div>
            </div>
        </motion.div>
    );
}
