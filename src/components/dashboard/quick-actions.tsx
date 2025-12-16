
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Bot, Link as LinkIcon, LogIn } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useGoogleCalendar } from "@/hooks/use-google-calendar";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function QuickActions() {
    const { isAuthenticated, login, createEvent } = useGoogleCalendar();
    const { toast } = useToast();
    const [syncToGoogle, setSyncToGoogle] = useState(true);

    const handleNewMeeting = async () => {
        if (syncToGoogle && !isAuthenticated) {
            toast({
                title: "Authentication Required",
                description: "Please sign in with Google to sync to your calendar.",
                variant: "destructive",
            });
            return;
        }

        const newMeeting = {
            summary: 'New Quick Meeting',
            description: 'A new meeting created from Quick Actions.',
            start: { dateTime: new Date().toISOString() },
            end: { dateTime: new Date(Date.now() + 60 * 60 * 1000).toISOString() },
        };
        
        toast({ title: "Creating Meeting..." });

        if (syncToGoogle && isAuthenticated) {
            try {
                const meetLink = await createEvent(newMeeting);
                toast({
                    title: "Meeting Created & Synced!",
                    description: `Google Meet link: ${meetLink}`,
                });
            } catch (error) {
                toast({
                    title: "Sync Failed",
                    description: "Could not sync the event to Google Calendar.",
                    variant: "destructive",
                });
            }
        } else {
             toast({
                title: "Meeting Created",
                description: "The new meeting has been created locally.",
            });
        }
    };

  return (
    <Card className="glassmorphic h-full flex flex-col">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Start a meeting or generate minutes instantly.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow gap-4 justify-center">
        <Button size="lg" className="w-full" onClick={handleNewMeeting}>
          <Plus className="mr-2" />
          New Meeting
        </Button>
        <Button size="lg" variant="secondary" className="w-full">
          <Bot className="mr-2" />
          Generate MoM
        </Button>
        <div className="flex items-center justify-between space-x-2 rounded-lg border p-3 mt-2">
            <div className="flex items-center space-x-2">
                <LinkIcon className="text-muted-foreground" />
                <Label htmlFor="sync-google" className="text-sm font-medium">Sync to Google</Label>
            </div>
          {isAuthenticated ? (
            <Switch 
                id="sync-google" 
                checked={syncToGoogle}
                onCheckedChange={setSyncToGoogle}
            />
          ) : (
             <Button variant="outline" size="sm" onClick={login}>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
             </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
