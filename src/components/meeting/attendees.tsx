import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { teamMembers } from "@/lib/data";
import { Badge } from "../ui/badge";

interface AttendeesProps {
  members: (typeof teamMembers);
  isSynced?: boolean;
}

const getStatus = (index: number) => {
    if (index % 3 === 0) return { text: "Accepted", color: "bg-green-500/20 text-green-400" };
    if (index % 3 === 1) return { text: "Pending", color: "bg-yellow-500/20 text-yellow-400" };
    return { text: "Declined", color: "bg-red-500/20 text-red-400" };
}

export function Attendees({ members, isSynced }: AttendeesProps) {
  return (
    <Card className="glassmorphic">
      <CardHeader>
        <CardTitle>Attendees ({members.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member, index) => (
            <div key={member.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
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
                {isSynced && (
                    <Badge variant="outline" className={getStatus(index).color}>
                        {getStatus(index).text}
                    </Badge>
                )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
