import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { ImagePlaceholder } from "@/lib/placeholder-images";

interface PresentationViewProps {
  slides: (ImagePlaceholder | undefined)[];
}

export function PresentationView({ slides }: PresentationViewProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {slides.map((slide, index) => slide && (
          <CarouselItem key={index}>
            <div className="aspect-video relative rounded-lg overflow-hidden border">
              <Image
                src={slide.imageUrl}
                alt={slide.description}
                fill
                className="object-cover"
                data-ai-hint={slide.imageHint}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
    </Carousel>
  );
}
