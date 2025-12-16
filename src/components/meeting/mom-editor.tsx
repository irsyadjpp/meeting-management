"use client";
import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles, Copy, Save, RefreshCcw, CheckCircle, Loader2 } from "lucide-react";
import { AiMomGenerator } from "./ai-mom-generator";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "../ui/scroll-area";

interface MoMEditorProps {
  initialMinutes: string | null;
  meetingId: string;
}

type SyncState = 'idle' | 'loading' | 'success';

export function MoMEditor({ initialMinutes, meetingId }: MoMEditorProps) {
  const [minutes, setMinutes] = useState(initialMinutes || "");
  const [isAiOpen, setAiOpen] = useState(false);
  const [isSavePending, startSaveTransition] = useTransition();
  const [syncState, setSyncState] = useState<SyncState>('idle');
  const { toast } = useToast();

  const handleSave = () => {
    startSaveTransition(() => {
      // Mock saving to a database
      console.log("Saving minutes:", minutes);
      toast({
        title: "Minutes Saved",
        description: "Your meeting minutes have been successfully saved.",
      });
    });
  };

  const handleCreateTask = (actionItem: string) => {
    toast({
        title: "Task Creation Initiated",
        description: `Task created for: "${actionItem.substring(0, 30)}..."`,
      });
  }

  const handleSyncToCalendar = () => {
    setSyncState('loading');
    // Mock API call to sync MoM to Google Calendar
    setTimeout(() => {
        const momLink = `https://app.bcc2026.com/mom/${meetingId}`;
        const descriptionUpdate = `\n--------------------------------\n✅ OFFICIAL MoM:\n${momLink}\nStatus: Finalized`;

        console.log("PATCH to Google Calendar Event with description append:", descriptionUpdate);

        setSyncState('success');
        toast({
            title: "Success!",
            description: "MoM attached to Google Calendar invitation!",
        });
    }, 1500);
  };

  const parseAndRenderMinutes = (text: string) => {
    return text.split('\n').map((line, index) => {
      const isActionItem = line.trim().startsWith('[ACTION]') || line.trim().startsWith('[ ]');
      if (isActionItem) {
        return (
          <div key={index} className="flex items-center justify-between gap-2 my-1 p-2 bg-muted/50 rounded-md">
            <span className="flex-grow">{line}</span>
            <Button size="sm" variant="ghost" onClick={() => handleCreateTask(line)}>
              Create Task
            </Button>
          </div>
        );
      }
      return <div key={index}>{line || <br />}</div>;
    });
  };

  return (
    <>
      <Card className="glassmorphic">
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Minutes of Meeting</CardTitle>
            <CardDescription>Record key points, decisions, and action items.</CardDescription>
          </div>
          <Button onClick={() => setAiOpen(true)}>
            <Bot className="mr-2 h-4 w-4" />
            Generate with AI
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Generated Content</h4>
            <ScrollArea className="h-64 w-full rounded-md border p-4 bg-background/50">
              {minutes ? parseAndRenderMinutes(minutes) : <p className="text-muted-foreground">Generate or write minutes to see them here.</p>}
            </ScrollArea>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Editor</h4>
            <Textarea
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              placeholder="Start typing your meeting notes here..."
              rows={10}
              className="bg-background/50"
            />
          </div>
          <div className="flex justify-between items-center gap-2">
            <div>
                 <Button 
                    onClick={handleSyncToCalendar} 
                    disabled={syncState !== 'idle' || !minutes}
                    className={`
                        ${syncState === 'idle' && 'bg-accent text-accent-foreground hover:bg-accent/90'}
                        ${syncState === 'loading' && 'bg-muted text-muted-foreground'}
                        ${syncState === 'success' && 'bg-primary text-primary-foreground'}
                    `}
                >
                    {syncState === 'idle' && <RefreshCcw className="mr-2 h-4 w-4" />}
                    {syncState === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {syncState === 'success' && <CheckCircle className="mr-2 h-4 w-4" />}
                    {syncState === 'idle' && "Finalize & Sync to Calendar"}
                    {syncState === 'loading' && "Syncing..."}
                    {syncState === 'success' && "Synced to Calendar"}
                </Button>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" onClick={() => navigator.clipboard.writeText(minutes)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                <Button onClick={handleSave} disabled={isSavePending}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSavePending ? "Saving..." : "Save"}
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <AiMomGenerator
        isOpen={isAiOpen}
        onOpenChange={setAiOpen}
        onMinutesGenerated={(newMinutes) => setMinutes(newMinutes)}
      />
    </>
  );
}
