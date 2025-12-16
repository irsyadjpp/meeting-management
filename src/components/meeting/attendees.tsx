import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { teamMembers } from "@/lib/data";

interface AttendeesProps {
  members: (typeof teamMembers);
}

export function Attendees({ members }: AttendeesProps) {
  return (
    <Card className="glassmorphic">
      <CardHeader>
        <CardTitle>Attendees ({members.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-center gap-3">
              <Avatar>
                {member.avatar && (
                  <AvatarImage
                    src={member.avatar.imageUrl}
                    alt={member.name}
                    data-ai-hint={member.avatar.imageHint}
                  />
                )}
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
