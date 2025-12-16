
'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { meetings } from '@/lib/data';
import { Badge } from '../ui/badge';
import { format } from 'date-fns';

export function CalendarWidget() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const eventDates = meetings.map(m => m.date.setHours(0,0,0,0));

  const meetingsForSelectedDate = date 
    ? meetings.filter(m => m.date.setHours(0,0,0,0) === date.setHours(0,0,0,0))
    : [];

  return (
    <Card className="glassmorphic h-full flex flex-col">
      <CardHeader>
        <CardTitle>Mini Calendar</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow items-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md"
          modifiers={{
            events: eventDates.map(d => new Date(d)),
          }}
          modifiersStyles={{
            events: {
                color: 'hsl(var(--accent-foreground))',
                backgroundColor: 'hsl(var(--accent))',
            },
          }}
        />
        <div className="mt-4 w-full px-2 space-y-2">
            <h4 className="font-semibold text-sm">
                {date ? `Meetings for ${format(date, 'MMM d')}` : 'Select a date'}
            </h4>
            {meetingsForSelectedDate.length > 0 ? (
                meetingsForSelectedDate.map(meeting => (
                    <div key={meeting.id} className="p-2 rounded-md bg-muted/50 text-xs">
                        <p className="font-medium truncate">{meeting.title}</p>
                        <p className="text-muted-foreground">{meeting.startTime}</p>
                    </div>
                ))
            ) : (
                <p className="text-xs text-muted-foreground">No meetings scheduled.</p>
            )}

        </div>
      </CardContent>
    </Card>
  );
}
