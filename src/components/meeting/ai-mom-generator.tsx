"use client";
import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { handleGenerateMinutes } from "@/app/actions";
import { Loader2 } from "lucide-react";

interface AiMomGeneratorProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onMinutesGenerated: (minutes: string) => void;
}

export function AiMomGenerator({ isOpen, onOpenChange, onMinutesGenerated }: AiMomGeneratorProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select an audio file to generate minutes.",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async (e) => {
                const audioDataUri = e.target?.result as string;
                if (!audioDataUri) {
                    throw new Error("Could not read file.");
                }
                const result = await handleGenerateMinutes(audioDataUri);

                if (result.error) {
                    throw new Error(result.error);
                }

                if(result.minutes) {
                    onMinutesGenerated(result.minutes);
                    toast({
                        title: "Success!",
                        description: "Meeting minutes have been generated.",
                    });
                    onOpenChange(false);
                    setFile(null);
                }
            };
            reader.onerror = () => {
                throw new Error("Error reading file.");
            }
        } catch (error: any) {
            toast({
            title: "Generation Failed",
            description: error.message || "An unknown error occurred.",
            variant: "destructive",
            });
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] glassmorphic">
        <DialogHeader>
          <DialogTitle>Generate Minutes with AI</DialogTitle>
          <DialogDescription>
            Upload an audio recording of your meeting (.wav, .mp3) and let AI do the work.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="audio-file">Audio File</Label>
            <Input 
                id="audio-file" 
                type="file" 
                accept="audio/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Generating..." : "Generate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
