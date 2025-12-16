import { getMeetingById, presentationSlides } from "@/lib/data";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Agenda } from "@/components/meeting/agenda";
import { Attendees } from "@/components/meeting/attendees";
import { PresentationView } from "@/components/meeting/presentation-view";
import { MoMEditor } from "@/components/meeting/mom-editor";
import { Calendar, Clock, Users, Video, Link as LinkIcon, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

type MeetingPageProps = {
  params: { id: string };
};

export default function MeetingPage({ params }: MeetingPageProps) {
  const meeting = getMeetingById(params.id);

  if (!meeting) {
    notFound();
  }

  const isLive = meeting.status === "Live";

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{meeting.title}</h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{format(meeting.date, 'EEEE, MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{meeting.startTime} - {meeting.endTime}</span>
            </div>
            <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{meeting.attendees.length} Attendees</span>
            </div>
            {meeting.isSyncedToGoogle && (
                 <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span>Synced to Google Calendar</span>
                </div>
            )}
        </div>
      </div>
      
      {meeting.googleMeetLink && (
        <div className="flex justify-start">
            <Button asChild className={`bg-[#00796B] hover:bg-[#006054] text-white ${isLive ? 'animate-pulse' : ''}`}>
                <Link href={meeting.googleMeetLink} target="_blank">
                    <Video className="mr-2 h-4 w-4" />
                    Join Google Meet
                </Link>
            </Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-6">
          {meeting.agenda && <Agenda items={meeting.agenda} />}
          <Attendees members={meeting.attendees} isSynced={meeting.isSyncedToGoogle}/>
        </div>
        
        <div className="lg:col-span-2">
          <Tabs defaultValue="presentation" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="presentation">Presentation</TabsTrigger>
              <TabsTrigger value="minutes">Minutes of Meeting</TabsTrigger>
            </TabsList>
            <TabsContent value="presentation">
              <Card className="glassmorphic">
                <CardContent className="p-2 sm:p-4">
                  <PresentationView slides={presentationSlides} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="minutes">
              <MoMEditor initialMinutes={meeting.minutes} meetingId={meeting.id}/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
