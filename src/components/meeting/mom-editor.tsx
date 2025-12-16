"use client";
import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles, Copy, Save } from "lucide-react";
import { AiMomGenerator } from "./ai-mom-generator";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "../ui/scroll-area";

interface MoMEditorProps {
  initialMinutes: string | null;
}

export function MoMEditor({ initialMinutes }: MoMEditorProps) {
  const [minutes, setMinutes] = useState(initialMinutes || "");
  const [isAiOpen, setAiOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSave = () => {
    startTransition(() => {
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
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => navigator.clipboard.writeText(minutes)}>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button onClick={handleSave} disabled={isPending}>
              <Save className="mr-2 h-4 w-4" />
              {isPending ? "Saving..." : "Save"}
            </Button>
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
