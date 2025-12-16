"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { Slide } from '@/hooks/use-slide-deck';
import { Button } from '../ui/button';

interface PresentationOverlayProps {
  slides: Slide[];
  onExit: () => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.8,
  }),
};

export function PresentationOverlay({ slides, onExit }: PresentationOverlayProps) {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < slides.length) {
      setPage([newPage, newDirection]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'Escape') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [page, onExit]);

  const activeSlide = slides[page];

  return (
    <div className="fixed inset-0 bg-[#121212] z-50 flex flex-col items-center justify-center p-4">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="w-full h-full max-w-6xl flex flex-col items-center justify-center text-white"
        >
          {activeSlide && (
            <>
              <h1 className="text-5xl md:text-7xl font-bold text-primary mb-8 text-center">{activeSlide.title}</h1>
              {activeSlide.type === 'content' && (
                <ul className="space-y-4">
                  {activeSlide.bullets.map((bullet, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="text-2xl md:text-4xl"
                    >
                      {bullet}
                    </motion.li>
                  ))}
                </ul>
              )}
              {activeSlide.type === 'title' && activeSlide.bullets.length > 0 && (
                <p className="text-xl md:text-3xl text-muted-foreground mt-4">{activeSlide.bullets[0]}</p>
              )}
              {activeSlide.type === 'image' && activeSlide.imageUrl && (
                  <div className="w-full aspect-video relative mt-4">
                      <img src={activeSlide.imageUrl} alt={activeSlide.title} className="object-contain w-full h-full"/>
                  </div>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-20 hover:opacity-100 transition-opacity">
          <div className="glassmorphic flex items-center gap-4 p-2 rounded-full">
            <Button variant="ghost" size="icon" onClick={() => paginate(-1)} disabled={page === 0}>
                <ArrowLeft />
            </Button>
            <span className="font-mono text-sm w-12 text-center">{page + 1} / {slides.length}</span>
             <Button variant="ghost" size="icon" onClick={() => paginate(1)} disabled={page === slides.length - 1}>
                <ArrowRight />
            </Button>
          </div>
      </div>
       <Button variant="ghost" size="icon" onClick={onExit} className="absolute top-5 right-5 text-white/50 hover:text-white">
            <X size={32} />
        </Button>
    </div>
  );
}
