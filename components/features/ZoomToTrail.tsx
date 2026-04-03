"use client";
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { useMapStore } from "@/store/useMapStore";
import L from "leaflet";

export default function ZoomToTrail() {
    const map = useMap();
    const focusTrailId = useMapStore((s) => s.focusTrailId);
    const trails = useMapStore((s) => s.trails);

    const prevTrailIdRef = useRef<string | null>(null);

    useEffect(() => {
    if (!focusTrailId || !trails?.length) return;
    if (prevTrailIdRef.current === focusTrailId) return;

    const trail = trails.find((t) => t.trail_id === focusTrailId);
    if (!trail?.geo) return;

    const geoJson =
        typeof trail.geo === "string"
        ? JSON.parse(trail.geo)
        : trail.geo;

    const layer = L.geoJSON(geoJson);
    const bounds = layer.getBounds();

    map.flyToBounds(bounds, {
        paddingTopLeft: [60, 60],
        paddingBottomRight: [60, 220],
        duration: 1.2,
        maxZoom: 14,
    });

    prevTrailIdRef.current = focusTrailId;
  }, [focusTrailId, trails, map]);

  return null;
}