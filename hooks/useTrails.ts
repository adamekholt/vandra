"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useMapStore } from "@/store/useMapStore";

export function useTrails() {
  const setTrails = useMapStore((s) => s.setTrails);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function fetchTrails() {
      const { data, error } = await supabase
        .from("trails")
        .select(`
          trail_id,
          name,
          type,
          region,
          length_m,
          geo,
          start_point
        `);

      if (error) {
        console.error(error);
      } else {
        setTrails(data || []);
      }

      setLoading(false);
    }

    fetchTrails();
  }, [setTrails]);

  return { loading };
}