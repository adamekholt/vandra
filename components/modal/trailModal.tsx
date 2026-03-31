"use client";
import { GlobalModal } from "./globalModal";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { TrailPreview } from "@/types/trail";
import { useRouter } from "next/navigation";
import { useMapStore } from "@/store/useMapStore";
import { FavoritesToggle } from "../features/FavoritesToggle";

type Props = {
  open: boolean;
  onClose: () => void;
  trail: TrailPreview | null;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
};

export function TrailModal({ open, onClose, trail, favorites, onToggleFavorite}: Props) {
  const router = useRouter();
  const setFocusTrailId = useMapStore((s) => s.setFocusTrailId);

  if (!trail) return null;

  const handleGoToMap = () => {
    setFocusTrailId(trail.trail_id);
    router.push("/map");
    onClose();
  };

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
            <Button className="flex-1" onClick={handleGoToMap}>
              Gå till kartan
            </Button>
            <FavoritesToggle
              trailId={trail.trail_id}
              isFavorite={favorites.includes(trail.trail_id)}
              onToggle={onToggleFavorite}
            />
          </div>
        </div>

      </div>
    </GlobalModal>
  );
}