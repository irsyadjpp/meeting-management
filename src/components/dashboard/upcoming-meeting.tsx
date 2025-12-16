'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { meetings } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Video, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

export function UpcomingMeeting() {
  const upcomingMeeting = meetings.find(m => m.status === 'Upcoming');
  const bgImage = PlaceHolderImages.find(img => img.id === 'upcomingMeeting');

  if (!upcomingMeeting) {
    return (
      <Card className="glassmorphic h-full flex flex-col items-center justify-center text-center p-8">
        <h3 className="text-xl font-semibold mb-2">No Upcoming Meetings</h3>
        <p className="text-muted-foreground">Your schedule is clear. Enjoy the peace!</p>
      </Card>
    );
  }

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
          <Link href={`/meeting/${upcomingMeeting.id}`} passHref legacyBehavior>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
              <Video className="mr-2 h-4 w-4" />
              Join Meeting
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
