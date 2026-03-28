"use client";

import { GeoJSON } from "react-leaflet";
import { useMapStore } from "@/store/useMapStore";
import type { Trail } from "@/types/trail";
import type { Geometry } from "geojson";

export default function TrailLayer() {
  const selectedTrailId = useMapStore((s) => s.selectedTrailId);
  const trails = useMapStore((s) => s.filteredTrails);

  if (!selectedTrailId) return null;

  const trail = trails.find(
    (t: Trail) => t.trail_id === selectedTrailId
  );

  if (!trail || !trail.geo) return null;

  const geometry: Geometry =
    typeof trail.geo === "string"
      ? JSON.parse(trail.geo)
      : trail.geo;

  return (
    <GeoJSON
      data={geometry}
      style={{
        color: "#e27c00",
        weight: 3
      }}
    />
  );
}