"use client";
import { GlobalModal } from "./globalModal";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { TrailPreview } from "@/types/trail";

type Props = {
  open: boolean;
  onClose: () => void;
  trail: TrailPreview | null;
};

export function TrailModal({ open, onClose, trail }: Props) {
  if (!trail) return null;

  return (
    <GlobalModal open={open} onClose={onClose}>
      <div className="overflow-hidden rounded-xl">
        <div className="relative">
          <Image
            src="/images/image.jpg"
            alt={trail.name}
            width={600}
            height={400}
            className="h-56 w-full object-cover"
          />

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="font-heading text-xl leading-tight">
              {trail.name}
            </h2>

            <div className="mt-1 flex gap-3 text-sm opacity-90">
              {trail.length_km && (
                <span>{trail.length_km} km</span>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {trail.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {trail.description}
            </p>
          )}

          <div className="flex gap-2">
            <Button className="flex-1">
              Gå till kartan
            </Button>
          </div>
        </div>

      </div>
    </GlobalModal>
  );
}