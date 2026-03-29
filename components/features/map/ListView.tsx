"use client";

import { useMapStore } from "@/store/useMapStore";
import { TrailCard } from "@/components/layout/TrailCard";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ListView() {
  const trails = useMapStore((s) => s.filteredTrails);
  const selectedTrailId = useMapStore((s) => s.selectedTrailId);
  const setSelectedTrailId = useMapStore((s) => s.setSelectedTrailId);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-2 border-b bg-background/80 backdrop-blur">
        <h1 className="text-3xl font-heading">Lista</h1>
        <p className="text-sm text-muted-foreground">
          {trails.length} leder
        </p>
      </div>

      <ScrollArea
        className="flex-1"
        scrollFade
        scrollbarGutter
      >
        <div className="px-3 py-3 space-y-3 pb-24">
          {trails.length === 0 && (
            <div className="text-sm text-muted-foreground text-center py-10">
              Inga träff
            </div>
          )}

          {trails.map((trail) => {
            const isSelected = trail.trail_id === selectedTrailId;

            return (
              <div
                key={trail.trail_id}
                onClick={() => setSelectedTrailId(trail.trail_id)}
                className={`
                  rounded-xl transition-all duration-200
                  ${isSelected 
                    ? "ring-2 ring-primary bg-card shadow-md" 
                    : "hover:bg-muted/50"}
                `}
              >
                <TrailCard
                  variant="sm"
                  trail={trail}
                />
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}