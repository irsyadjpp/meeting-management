import { getMeetingById, presentationSlides } from "@/lib/data";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Agenda } from "@/components/meeting/agenda";
import { Attendees } from "@/components/meeting/attendees";
import { PresentationView } from "@/components/meeting/presentation-view";
import { MoMEditor } from "@/components/meeting/mom-editor";
import { Calendar, Clock, Users } from "lucide-react";
import { format } from "date-fns";

type MeetingPageProps = {
  params: { id: string };
};

export default function MeetingPage({ params }: MeetingPageProps) {
  const meeting = getMeetingById(params.id);

  if (!meeting) {
    notFound();
  }

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
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Agenda items={meeting.agenda} />
          <Attendees members={meeting.attendees} />
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
              <MoMEditor initialMinutes={meeting.minutes} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
