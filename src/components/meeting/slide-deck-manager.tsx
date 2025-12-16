
"use client";

import Link from 'next/link';
import type { Slide } from '@/hooks/use-slide-deck';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Eye } from 'lucide-react';

interface SlideDeckManagerProps {
  initialSlides: Slide[];
  meetingId: string;
}

export function SlideDeckManager({ initialSlides, meetingId }: SlideDeckManagerProps) {
  
  const renderSlideCard = (slide: Slide) => {
    return (
      <div
        key={slide.id}
        className="aspect-video bg-background/50 rounded-lg p-3 flex flex-col justify-between border relative group"
      >
        <div className="overflow-hidden">
          <h4 className="text-xs font-semibold truncate text-primary">{slide.title}</h4>
          {slide.type === 'content' && (
            <ul className="text-[8px] text-muted-foreground mt-1 list-disc pl-3">
              {initialSlides.slice(0, 3).map((bullet, i) => <li key={i} className='truncate'>{bullet.title}</li>)}
            </ul>
          )}
           {slide.type === 'image' && slide.imageUrl && (
            <div className="mt-1 text-[10px] text-muted-foreground truncate">Image: {slide.imageUrl.split('/').pop()}</div>
           )}
        </div>
        <div className="text-[8px] text-right text-muted-foreground/50">{initialSlides.indexOf(slide) + 1}</div>
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
           <Button asChild className='bg-accent text-accent-foreground hover:bg-accent/90'>
                <Link href={`/meeting/${meetingId}/edit-slides`}>
                    <Eye className="mr-2 h-4 w-4" /> View & Edit Deck
                </Link>
            </Button>
        </CardHeader>
        <CardContent>
            {initialSlides && initialSlides.length > 0 ? (
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {initialSlides.slice(0,4).map(renderSlideCard)}
                </div>
            ) : (
                <div className="text-center py-8 text-muted-foreground">
                    <p>No slides for this meeting yet.</p>
                    <Button asChild variant="link">
                        <Link href={`/meeting/${meetingId}/edit-slides`}>
                            Create a new Deck
                        </Link>
                    </Button>
                </div>
            )}
        </CardContent>
      </Card>
    </>
  );
}
