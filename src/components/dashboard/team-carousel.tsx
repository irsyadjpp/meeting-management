import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { teamMembers } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export function TeamCarousel() {
  return (
    <Card className="glassmorphic h-full flex flex-col">
      <CardHeader>
        <CardTitle>Pembagian Tugas</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
        >
          <CarouselContent>
            {teamMembers.map((member) => (
              <CarouselItem key={member.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <div className="flex flex-col items-center text-center gap-3 p-4 rounded-lg bg-background/50">
                    {member.avatar && (
                      <Image
                        src={member.avatar.imageUrl}
                        alt={`Avatar of ${member.name}`}
                        width={80}
                        height={80}
                        className="rounded-full border-2 border-accent"
                        data-ai-hint={member.avatar.imageHint}
                      />
                    )}
                    <div className="space-y-1">
                        <h4 className="font-semibold text-sm">{member.name}</h4>
                        <Badge variant="secondary" className="bg-accent text-accent-foreground">{member.role}</Badge>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </CardContent>
    </Card>
  );
}
