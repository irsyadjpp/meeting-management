"use client";

import { useState } from 'react';

export interface Slide {
  id: string;
  type: 'title' | 'content' | 'image';
  title: string;
  bullets: string[];
  imageUrl?: string;
  note?: string;
}

export function useSlideDeck(initialSlides: Slide[] = []) {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);

  const addSlide = (slide: Omit<Slide, 'id'>) => {
    const newSlide = { ...slide, id: `slide-${Date.now()}` };
    setSlides([...slides, newSlide]);
  };

  const updateSlide = (id: string, updatedData: Partial<Omit<Slide, 'id'>>) => {
    setSlides(slides.map(slide =>
      slide.id === id ? { ...slide, ...updatedData } : slide
    ));
  };

  const deleteSlide = (id: string) => {
    setSlides(slides.filter(slide => slide.id !== id));
  };
  
  const reorderSlides = (startIndex: number, endIndex: number) => {
    const result = Array.from(slides);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setSlides(result);
  };

  const generateFromAgenda = (agendaItems: string[]) => {
    const newSlides: Slide[] = agendaItems.map((item, index) => ({
        id: `agenda-slide-${index}-${Date.now()}`,
        type: 'content',
        title: item.replace(/\(\d+ min\)/, '').trim(),
        bullets: ['...'],
    }));
    setSlides([...slides, ...newSlides]);
  }

  return {
    slides,
    setSlides,
    addSlide,
    updateSlide,
    deleteSlide,
    reorderSlides,
    generateFromAgenda,
  };
}
