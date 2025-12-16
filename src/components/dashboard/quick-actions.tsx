
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Bot, Link as LinkIcon, LogIn, Video } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useGoogleCalendar } from "@/hooks/use-google-calendar";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { meetings, teamMembers } from "@/lib/data";


export function QuickActions() {
    const { isAuthenticated, login, createEvent, user } = useGoogleCalendar();
    const { toast } = useToast();
    const [isNewMeetingOpen, setNewMeetingOpen] = useState(false);

    const handleCreateMeeting = async (meetingData: any) => {
        if (meetingData.syncToGoogle && !isAuthenticated) {
            toast({
                title: "Authentication Required",
                description: "Please sign in with Google to sync to your calendar.",
                variant: "destructive",
            });
            return;
        }

        const newMeetingPayload = {
            summary: `BCC 2026: ${meetingData.title}`,
            description: meetingData.description || 'A new meeting created from BCC Meeting Management.',
            start: { dateTime: new Date(meetingData.dateTime).toISOString() },
            end: { dateTime: new Date(new Date(meetingData.dateTime).getTime() + 60 * 60 * 1000).toISOString() },
            attendees: meetingData.participants.map((p: any) => ({ email: p.email })),
             conferenceData: {
                createRequest: { 
                    requestId: `bcc-meeting-${Date.now()}`, 
                    conferenceSolutionKey: { type: "hangoutsMeet" } 
                }
            },
        };
        
        try {
            const calendarData = meetingData.syncToGoogle && isAuthenticated ? await createEvent(newMeetingPayload) : null;
            
            const newMeeting = {
                id: (meetings.length + 1).toString(),
                title: meetingData.title,
                date: new Date(meetingData.dateTime),
                startTime: new Date(meetingData.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                endTime: new Date(new Date(meetingData.dateTime).getTime() + 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                attendees: meetingData.participants.map((p:any) => teamMembers.find(tm => tm.id === p.id)).filter(Boolean),
                status: 'Upcoming',
                agenda: meetingData.agenda.split('\n'),
                minutes: null,
                isSyncedToGoogle: !!calendarData,
                googleMeetLink: calendarData?.hangoutLink,
            };
            
            // This is a mock update. In a real app, you'd use state management.
            meetings.unshift(newMeeting as any);

            toast({
                title: "Meeting Created!",
                description: calendarData ? "Event synced to Google Calendar and Meet link generated." : "Meeting created locally.",
            });
            setNewMeetingOpen(false);

        } catch (error) {
            toast({
                title: "Creation Failed",
                description: "Could not create the meeting.",
                variant: "destructive",
            });
        }
    };

  return (
    <>
    <Card className="glassmorphic h-full flex flex-col">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Start a meeting or generate minutes instantly.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow gap-4 justify-center">
        <Button size="lg" className="w-full" onClick={() => setNewMeetingOpen(true)}>
          <Plus className="mr-2" />
          New Meeting
        </Button>
        <Button size="lg" variant="secondary" className="w-full">
          <Bot className="mr-2" />
          Generate MoM
        </Button>
        <div className="flex items-center justify-between space-x-2 rounded-lg border p-3 mt-2">
            <div className="flex items-center space-x-2">
                 {isAuthenticated ? <Video className="text-muted-foreground" /> : <LinkIcon className="text-muted-foreground" />}
                <Label htmlFor="sync-google" className="text-sm font-medium">
                    {isAuthenticated ? `Hi, ${user?.name?.split(' ')[0]}` : "Sync to Google"}
                </Label>
            </div>
          {!isAuthenticated ? (
             <Button variant="outline" size="sm" onClick={login}>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
             </Button>
          ) : (
             <div className="text-xs text-green-400 font-mono">Synced</div>
          )}
        </div>
      </CardContent>
    </Card>
     <NewMeetingDialog
        isOpen={isNewMeetingOpen}
        onOpenChange={setNewMeetingOpen}
        onSubmit={handleCreateMeeting}
        teamMembers={teamMembers}
        isAuthenticated={isAuthenticated}
    />
    </>
  );
}
