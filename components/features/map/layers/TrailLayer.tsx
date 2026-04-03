"use client";

import { GeoJSON } from "react-leaflet";
import { useMapStore } from "@/store/useMapStore";
import type { Trail } from "@/types/trail";
import type { Geometry } from "geojson";

export default function TrailLayer() {
  const focusTrailId = useMapStore((s) => s.focusTrailId);
  const trails = useMapStore((s) => s.trails);

  if (!focusTrailId) return null;

  const trail = trails.find(
    (t: Trail) => t.trail_id === focusTrailId
  );

  if (!trail || !trail.geo) return null;

  const geometry: Geometry =
    typeof trail.geo === "string"
      ? JSON.parse(trail.geo)
      : trail.geo;

  return (
    <GeoJSON
      key={focusTrailId}
      data={geometry}
      style={{
        color: "#D97A2B",
        weight: 3
      }}
    />
  );
}