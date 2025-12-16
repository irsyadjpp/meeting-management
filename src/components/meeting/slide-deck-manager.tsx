"use client";

import { useState } from 'react';
import { useSlideDeck, Slide } from '@/hooks/use-slide-deck';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Plus, Play, Sparkles, X, GripVertical, Trash2, Edit } from 'lucide-react';
import { PresentationOverlay } from './presentation-overlay';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

interface SlideDeckManagerProps {
  initialSlides: Slide[];
  agenda?: string[];
}

export function SlideDeckManager({ initialSlides, agenda }: SlideDeckManagerProps) {
  const { slides, addSlide, updateSlide, deleteSlide, generateFromAgenda } = useSlideDeck(initialSlides);
  const [isPresenting, setIsPresenting] = useState(false);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);

  const handleStartPresentation = () => setIsPresenting(true);
  const handleStopPresentation = () => setIsPresenting(false);

  const handleGenerateClick = () => {
    if (agenda) {
      generateFromAgenda(agenda);
    }
  };
  
  const handleUpdateSlide = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingSlide) return;

    const formData = new FormData(e.currentTarget);
    const updatedData = {
        title: formData.get('title') as string,
        bullets: (formData.get('bullets') as string).split('\n'),
        imageUrl: formData.get('imageUrl') as string,
        note: formData.get('note') as string,
    }

    updateSlide(editingSlide.id, updatedData);
    setEditingSlide(null);
  }

  const renderSlideCard = (slide: Slide) => {
    return (
      <div
        key={slide.id}
        className="aspect-video bg-background/50 rounded-lg p-3 flex flex-col justify-between border relative group"
      >
        <div className='absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
             <Button size="icon" variant="ghost" className='h-7 w-7' onClick={() => setEditingSlide(slide)}><Edit className='h-4 w-4'/></Button>
             <Button size="icon" variant="ghost" className='h-7 w-7' onClick={() => deleteSlide(slide.id)}><Trash2 className='h-4 w-4 text-destructive'/></Button>
        </div>
        <div className="overflow-hidden">
          <h4 className="text-xs font-semibold truncate text-primary">{slide.title}</h4>
          {slide.type === 'content' && (
            <ul className="text-[8px] text-muted-foreground mt-1 list-disc pl-3">
              {slide.bullets.slice(0, 3).map((bullet, i) => <li key={i} className='truncate'>{bullet}</li>)}
            </ul>
          )}
           {slide.type === 'image' && slide.imageUrl && (
            <div className="mt-1 text-[10px] text-muted-foreground truncate">Image: {slide.imageUrl.split('/').pop()}</div>
           )}
        </div>
        <div className="text-[8px] text-right text-muted-foreground/50">{slides.indexOf(slide) + 1}</div>
      </div>
    );
  };

  return (
    <>
      <Card className="glassmorphic">
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Presentation Deck</CardTitle>
            <CardDescription>Manage your slides for the meeting.</CardDescription>
          </div>
          <div className='flex gap-2'>
            {agenda && agenda.length > 0 && (
                <Button variant="outline" onClick={handleGenerateClick}>
                    <Sparkles className="mr-2 h-4 w-4" /> Generate from Agenda
                </Button>
            )}
            <Button className='bg-accent text-accent-foreground hover:bg-accent/90' onClick={handleStartPresentation}>
                <Play className="mr-2 h-4 w-4" /> Present
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {slides.map(renderSlideCard)}
            <div 
              onClick={() => addSlide({type: 'content', title: 'New Slide', bullets: []})}
              className="aspect-video rounded-lg border-2 border-dashed border-muted-foreground/50 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 hover:border-accent transition-colors"
            >
              <Plus className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mt-2">Add Slide</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {isPresenting && <PresentationOverlay slides={slides} onExit={handleStopPresentation} />}

      <Sheet open={!!editingSlide} onOpenChange={(isOpen) => !isOpen && setEditingSlide(null)}>
        <SheetContent className="glassmorphic">
            <SheetHeader>
                <SheetTitle>Edit Slide</SheetTitle>
                <SheetDescription>Modify the content of your slide.</SheetDescription>
            </SheetHeader>
            {editingSlide && (
                <form onSubmit={handleUpdateSlide} className="py-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" defaultValue={editingSlide.title} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="bullets">Bullet Points (one per line)</Label>
                        <Textarea id="bullets" name="bullets" defaultValue={editingSlide.bullets.join('\n')} rows={5} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="imageUrl">Image URL (optional)</Label>
                        <Input id="imageUrl" name="imageUrl" defaultValue={editingSlide.imageUrl} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="note">Speaker Notes</Label>
                        <Textarea id="note" name="note" defaultValue={editingSlide.note} rows={3} />
                    </div>
                    <div className='flex justify-end gap-2'>
                        <Button type="button" variant="outline" onClick={() => setEditingSlide(null)}>Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            )}
        </SheetContent>
      </Sheet>
    </>
  );
}
