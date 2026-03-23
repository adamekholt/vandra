"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useTrails() {
  const [trails, setTrails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient(); // 👈 FIX

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
  }, []);

  return { trails, loading };
}