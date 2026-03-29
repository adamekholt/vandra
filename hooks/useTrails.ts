"use client";

import { useEffect, useState } from "react";
import { useMapStore } from "@/store/useMapStore";
import type { Trail } from "@/types/trail";

export function useTrails() {
  const setTrails = useMapStore((s) => s.setTrails);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/trails");
        const data: Trail[] = await res.json();

        setTrails(data);
      } catch {
        setTrails([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [setTrails]);

  return { loading };
}