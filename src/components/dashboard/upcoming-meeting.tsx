'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { meetings } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Video, Calendar, Clock, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useState, useEffect } from "react";

export function UpcomingMeeting() {
  const [upcomingMeeting, setUpcomingMeeting] = useState<(typeof meetings)[0] | undefined | null>(undefined);
  const bgImage = PlaceHolderImages.find(img => img.id === 'upcomingMeeting');

  useEffect(() => {
    const nextMeeting = meetings.find(m => new Date(m.date) >= new Date() && m.status !== 'Completed');
    setUpcomingMeeting(nextMeeting || null);
  }, []);


  if (upcomingMeeting === undefined) {
    return (
      <Card className="glassmorphic h-full flex flex-col items-center justify-center text-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="text-muted-foreground mt-2">Finding next meeting...</p>
      </Card>
    );
  }

  if (!upcomingMeeting) {
    return (
      <Card className="glassmorphic h-full flex flex-col items-center justify-center text-center p-8">
        <h3 className="text-xl font-semibold mb-2">No Upcoming Meetings</h3>
        <p className="text-muted-foreground">Your schedule is clear. Enjoy the peace!</p>
      </Card>
    );
  }
  
  const isLive = upcomingMeeting.status === 'Live';

  return (
    <Card className="glassmorphic relative overflow-hidden group w-full h-full flex flex-col">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          data-ai-hint={bgImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      <CardContent className="relative flex flex-col justify-end h-full p-6 text-white">
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold">{upcomingMeeting.title}</h3>
            <p className="text-sm text-white/80">Your next meeting is about to start.</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-accent" />
              <span>{format(upcomingMeeting.date, 'EEEE, MMM d')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent" />
              <span>{upcomingMeeting.startTime}</span>
            </div>
          </div>
          <Button asChild className={`text-primary-foreground w-full sm:w-auto ${isLive ? 'bg-primary animate-pulse' : 'bg-primary'}`}>
            <Link href={`/meeting/${upcomingMeeting.id}`}>
              <Video className="mr-2 h-4 w-4" />
              {isLive ? 'Join Live Meeting' : 'Go to Meeting'}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
