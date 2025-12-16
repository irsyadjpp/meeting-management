
'use client';
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface NewMeetingDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (meetingData: any) => Promise<void>;
  teamMembers: any[];
  isAuthenticated: boolean;
}

export function NewMeetingDialog({ isOpen, onOpenChange, onSubmit, teamMembers, isAuthenticated }: NewMeetingDialogProps) {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [participants, setParticipants] = useState<any[]>([]);
  const [agenda, setAgenda] = useState("");
  const [syncToGoogle, setSyncToGoogle] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [openCombobox, setOpenCombobox] = useState(false);

  const handleSubmit = () => {
    startTransition(async () => {
      await onSubmit({ title, dateTime, participants, agenda, syncToGoogle });
      // Reset form on successful submission
      setTitle("");
      setDateTime("");
      setParticipants([]);
      setAgenda("");
      setSyncToGoogle(true);
    });
  };
  
  const handleSelectParticipant = (currentValue: string) => {
    const member = teamMembers.find(m => m.name.toLowerCase() === currentValue);
    if(member) {
        if(!participants.some(p => p.id === member.id)) {
            setParticipants([...participants, member]);
        }
    }
    setOpenCombobox(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] glassmorphic">
        <DialogHeader>
          <DialogTitle>Create a New Meeting</DialogTitle>
          <DialogDescription>
            Fill in the details below to schedule your next meeting.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Meeting Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Weekly Sync" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="datetime">Date & Time</Label>
            <Input id="datetime" type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Participants</Label>
            <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                <PopoverTrigger asChild>
                    <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCombobox}
                    className="w-full justify-between"
                    >
                    Select participants...
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[440px] p-0">
                    <Command>
                        <CommandInput placeholder="Search team member..." />
                        <CommandList>
                            <CommandEmpty>No team member found.</CommandEmpty>
                            <CommandGroup>
                                {teamMembers.map((member) => (
                                <CommandItem
                                    key={member.id}
                                    value={member.name.toLowerCase()}
                                    onSelect={handleSelectParticipant}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            participants.some(p => p.id === member.id) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {member.name}
                                </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <div className="flex flex-wrap gap-2 mt-2">
                {participants.map(p => (
                    <Badge key={p.id} variant="secondary" className="cursor-pointer" onClick={() => setParticipants(participants.filter(par => par.id !== p.id))}>{p.name} &times;</Badge>
                ))}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="agenda">Agenda</Label>
            <Textarea id="agenda" value={agenda} onChange={(e) => setAgenda(e.target.value)} placeholder="List agenda items, one per line." />
          </div>
          {isAuthenticated && (
            <div className="flex items-center space-x-2">
              <Switch id="sync-google" checked={syncToGoogle} onCheckedChange={setSyncToGoogle} />
              <Label htmlFor="sync-google">Sync to Google Calendar & Generate Meet Link</Label>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Scheduling..." : "Create Meeting"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
