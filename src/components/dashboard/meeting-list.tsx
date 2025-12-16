import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { meetings } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";

export function MeetingList() {
  return (
    <Card className="glassmorphic h-full flex flex-col">
      <CardHeader>
        <CardTitle>Meetings</CardTitle>
        <CardDescription>A log of your recent and upcoming meetings.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          {meetings.slice(0, 4).map((meeting) => (
            <Link key={meeting.id} href={`/meeting/${meeting.id}`} passHref>
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <div className="space-y-1">
                  <p className="font-medium">{meeting.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(meeting.date, 'MMM d, yyyy')} - {meeting.startTime}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={meeting.status === 'Completed' ? 'secondary' : 'default'}
                         className={meeting.status === 'Upcoming' ? 'bg-accent text-accent-foreground' : ''}>
                    {meeting.status}
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
