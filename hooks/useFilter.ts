"use client";

import { useMemo, useState } from "react";
import type { TrailPreview } from "@/types/trail";

type LengthRange = [number, number | null] | null;

export function useFilter(trails: TrailPreview[]) {
  const [region, setRegion] = useState<string | null>(null);
  const [lengthRange, setLengthRange] = useState<LengthRange>(null);

  const filteredTrails = useMemo(() => {
    return trails.filter((t) => {
      const matchesRegion =
        !region || t.region === region;

      const matchesLength =
        !lengthRange ||
        (t.length_km >= lengthRange[0] &&
          (lengthRange[1] === null ||
            t.length_km <= lengthRange[1]));

      return matchesRegion && matchesLength;
    });
  }, [trails, region, lengthRange]);

  const clearFilters = () => {
    setRegion(null);
    setLengthRange(null);
  };

  return {
    region,
    setRegion,
    lengthRange,
    setLengthRange,
    filteredTrails,
    clearFilters,
  };
}