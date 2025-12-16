
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { meetings, teamMembers } from '@/lib/data';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Search,
  Clock,
  Video,
  Plus,
  Ghost,
} from 'lucide-react';
import { format } from 'date-fns';
import { NewMeetingDialog } from '@/components/dashboard/new-meeting-dialog';
import { useGoogleCalendar } from '@/hooks/use-google-calendar';
import { useToast } from '@/hooks/use-toast';

type Status = 'All' | 'Upcoming' | 'Live' | 'Completed';

const statusColors: { [key in typeof meetings[0]['status']]: string } = {
  Live: 'border-red-500 bg-red-500/10',
  Upcoming: 'border-yellow-500 bg-yellow-500/10',
  Completed: 'border-green-500 bg-green-500/10',
};

const statusPillColors: { [key in typeof meetings[0]['status']]: string } = {
    Live: 'bg-red-500/80 text-white animate-pulse',
    Upcoming: 'bg-blue-500/80 text-white',
    Completed: 'bg-secondary text-secondary-foreground',
}

const MeetingCard = ({ meeting }: { meeting: typeof meetings[0] }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Link href={`/meeting/${meeting.id}`}>
        <div className={`glassmorphic group relative flex items-center gap-4 rounded-lg p-4 transition-all hover:bg-white/10 ${statusColors[meeting.status]}`}>
            <div className={`absolute left-0 top-0 h-full w-1 rounded-l-lg ${statusColors[meeting.status].replace('bg-', 'border-').split(' ')[0]}`} />
            <div className="flex h-16 w-16 flex-col items-center justify-center rounded-md bg-muted/50">
                <span className="text-3xl font-bold">{format(meeting.date, 'dd')}</span>
                <span className="text-xs font-semibold uppercase text-muted-foreground">{format(meeting.date, 'MMM')}</span>
            </div>
            <div className="flex-1 space-y-1">
                <p className="font-semibold text-foreground">{meeting.title}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className='flex items-center gap-1.5'>
                        <Clock className="h-4 w-4"/>
                        <span>{meeting.startTime} - {meeting.endTime}</span>
                    </div>
                    {meeting.googleMeetLink && (
                        <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                            <Video className="mr-1 h-3 w-3" /> GMeet
                        </Badge>
                    )}
                </div>
            </div>
             <div className="flex h-full flex-col items-end justify-between">
                <div className="flex -space-x-2 overflow-hidden">
                    {meeting.attendees.slice(0, 3).map((attendee, index) => (
                        <Avatar key={index} className="h-6 w-6 border-2 border-background">
                            <AvatarImage src={attendee.avatar?.imageUrl} data-ai-hint={attendee.avatar?.imageHint} />
                            <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    ))}
                    {meeting.attendees.length > 3 && (
                        <Avatar className="h-6 w-6 border-2 border-background">
                            <AvatarFallback>+{meeting.attendees.length - 3}</AvatarFallback>
                        </Avatar>
                    )}
                </div>
                <Badge className={`${statusPillColors[meeting.status]}`}>{meeting.status}</Badge>
            </div>
        </div>
      </Link>
    </motion.div>
  );
};


export default function MeetingsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState<Status>('All');
    const [isNewMeetingOpen, setNewMeetingOpen] = useState(false);
    const { isAuthenticated, createEvent } = useGoogleCalendar();
    const { toast } = useToast();

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


  const filteredMeetings = meetings
    .filter(meeting => {
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Live' && meeting.status === 'Live') return true;
      if (activeFilter === 'Upcoming' && meeting.status === 'Upcoming') return true;
      if (activeFilter === 'Completed' && meeting.status === 'Completed') return true;
      return false;
    })
    .filter(meeting =>
      meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.agenda.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <DashboardLayout>
      <div className="relative flex h-full flex-col">
        <header className="sticky top-0 z-10 glassmorphic flex flex-col gap-4 p-4 sm:p-6 border-b">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Meeting Logs</h1>
            <p className="text-muted-foreground">Your command center for all scheduled missions.</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by title or agenda..."
              className="w-full pl-10"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {(['All', 'Upcoming', 'Live', 'Completed'] as Status[]).map(status => (
              <Button
                key={status}
                variant={activeFilter === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(status)}
                className={`rounded-full ${activeFilter === status ? 'bg-primary text-primary-foreground' : 'bg-transparent'}`}
              >
                {status}
              </Button>
            ))}
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <AnimatePresence>
            {filteredMeetings.length > 0 ? (
              <div className="flex flex-col gap-4">
                {filteredMeetings.map(meeting => (
                  <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center h-full"
              >
                <Ghost className="h-24 w-24 text-muted-foreground/50" />
                <h3 className="mt-4 text-xl font-semibold">No drama today.</h3>
                <p className="mt-1 text-muted-foreground">Your search returned no results. Time for a coffee?</p>
                <Button className="mt-6" onClick={() => setNewMeetingOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Something
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        
        <div className="absolute bottom-6 right-6 z-20">
            <Button
              size="lg"
              className="rounded-full h-16 w-16 shadow-lg"
              onClick={() => setNewMeetingOpen(true)}
            >
              <Plus className="h-6 w-6" />
              <span className="sr-only">New Meeting</span>
            </Button>
        </div>

        <NewMeetingDialog
            isOpen={isNewMeetingOpen}
            onOpenChange={setNewMeetingOpen}
            onSubmit={handleCreateMeeting}
            teamMembers={teamMembers}
            isAuthenticated={isAuthenticated}
        />
      </div>
    </DashboardLayout>
  );
}

    