"use client";
import { Button } from "@/components/ui/button";
import {Sheet, SheetContent} from "@/components/ui/sheet";
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

export function TrailSheet({
  open,
  onClose,
  trail,
  favorites,
  onToggleFavorite,
}: Props) {
  const router = useRouter();
  const setFocusTrailId = useMapStore((s) => s.setFocusTrailId);

  if (!trail) return null;

  const handleGoToMap = () => {
    setFocusTrailId(trail.trail_id);
    router.push("/map");
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="bottom"
        className="
          z-[9999]
          max-h-[80vh]
          rounded-t-3xl
          p-0
          overflow-hidden
          bg-card
          text-card-foreground
          border border-border
          shadow-xl
        "
      >
        <div className="flex flex-col h-full p-4">

          <div className="px-5 pb-2">
            <h2 className="text-xl font-semibold leading-tight">
              {trail.name}
            </h2>

            {trail.length_km && (
              <p className="text-sm text-muted-foreground mt-1">
                {trail.length_km} km
              </p>
            )}
          </div>

          <div className="px-5 pb-5 space-y-4 overflow-y-auto">

            {trail.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {trail.description}
              </p>
            )}

            <div className="flex gap-2 pt-2">
              <Button className="flex-1" onClick={handleGoToMap}>Gå til kart</Button>
              <FavoritesToggle
                trailId={trail.trail_id}
                isFavorite={favorites.includes(trail.trail_id)}
                onToggle={onToggleFavorite}
              />
            </div>

          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}