"use client";

import { useMapStore } from "@/store/useMapStore";
import { useTrails } from "@/hooks/useTrails";
import { Button } from "@/components/ui/button";

const lengthOptions: {
  label: string;
  range: [number, number | null];
}[] = [
  { label: "0-5 km", range: [0, 5000] },
  { label: "5-15 km", range: [5000, 15000] },
  { label: "15+ km", range: [15000, null] },
];

export default function FiltersPanel() {
  const {
    draftFilters,
    draftLengthRange,
    toggleDraftFilter,
    setDraftLengthRange,
    applyFilters,
    resetFilters,
  } = useMapStore();

  const { trails, loading } = useTrails();

  if (loading) return null;

  const types = [
    ...new Set(trails.map((t) => t.type).filter(Boolean)),
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Type</h3>

        <div className="flex flex-wrap gap-2">
          {types.map((type) => {
            const active = draftFilters.includes(type);

            return (
              <Button
                key={type}
                variant={active ? "default" : "outline"}
                size="sm"
                onClick={() => toggleDraftFilter(type)}
              >
                {type}
              </Button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Lengde</h3>

        <div className="flex flex-wrap gap-2">
          {lengthOptions.map((opt) => {
            const active =
              draftLengthRange &&
              draftLengthRange[0] === opt.range[0] &&
              draftLengthRange[1] === opt.range[1];

            return (
              <Button
                key={opt.label}
                variant={active ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setDraftLengthRange(
                    active ? null : opt.range
                  )
                }
              >
                {opt.label}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button className="flex-1" onClick={applyFilters}>
          Oppdater kart
        </Button>

        <Button
          variant="secondary"
          className="flex-1"
          onClick={resetFilters}
        >
          Rens
        </Button>
      </div>
    </div>
  );
}