"use client";

import { useEffect, useState } from "react";
import type { TrailPreview } from "@/types/trail";

export function useTrail(id: string | null) {
  const [trail, setTrail] = useState<TrailPreview | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/trails/${id}`);

        if (!res.ok) throw new Error("Failed");

        const data: TrailPreview = await res.json();

        setTrail(data);
      } catch {
        setTrail(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  return { trail, loading };
}