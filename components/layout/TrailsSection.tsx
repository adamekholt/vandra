"use client";

import { useState } from "react";
import { TrailCard } from "@/components/layout/TrailCard";
import { ListWrapper } from "@/components/layout/ListWrapper";
import { FilterBar } from "@/components/layout/FilterBar";
import { useFilter } from "@/hooks/useFilter";
import { Button } from "@/components/ui/button";
import type { TrailPreview } from "@/types/trail";

type Props = {
  trails: TrailPreview[];
};

const itemsLoad = 10;

export function TrailsSection({ trails }: Props) {
  const {
    region,
    setRegion,
    lengthRange,
    setLengthRange,
    filteredTrails,
    clearFilters,
  } = useFilter(trails);

  const [visibleCount, setVisibleCount] = useState(itemsLoad);

  const visibleTrails = filteredTrails.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTrails.length;

  return (
    <section className="space-y-4">

      <div className="flex items-center pt-2 justify-between">
        <FilterBar
          trails={trails}
          region={region}
          setRegion={setRegion}
          lengthRange={lengthRange}
          setLengthRange={setLengthRange}
          onClear={() => {
            clearFilters();
            setVisibleCount(itemsLoad);
          }}
        />
        <p className="text-sm text-muted-foreground">{filteredTrails.length} resultat</p>

      </div>

      
      <ListWrapper>
        {visibleTrails.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center py-10">
            Inga träff
          </div>
        ) : (
          visibleTrails.map((trail) => (
            <TrailCard key={trail.trail_id} trail={trail} />
          ))
        )}
      </ListWrapper>

      {hasMore && (
        <Button
          variant="outline"
          onClick={() =>
            setVisibleCount((prev) => prev + itemsLoad)
          }
        >
          Visa fler ({visibleTrails.length} / {filteredTrails.length})
        </Button>
      )}
    </section>
  );
}