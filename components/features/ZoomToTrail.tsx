"use client";
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { useMapStore } from "@/store/useMapStore";
import L from "leaflet";

export default function ZoomToTrail() {
    const map = useMap();
    const focusTrailId = useMapStore((s) => s.focusTrailId);
    const setFocusTrailId = useMapStore((s) => s.setFocusTrailId);
    const trails = useMapStore((s) => s.trails);
    const setSelectedTrailId = useMapStore((s) => s.setSelectedTrailId);

    const hasZoomedRef = useRef(false);

    useEffect(() => {
    if (!focusTrailId || !trails?.length) return;
    if (hasZoomedRef.current) return;

    const trail = trails.find(t => t.trail_id === focusTrailId);
    if (!trail?.geo) return;

    const geoJson =
        typeof trail.geo === "string"
        ? JSON.parse(trail.geo)
        : trail.geo;

    const layer = L.geoJSON(geoJson);

    map.flyToBounds(layer.getBounds(), {
        padding: [60, 60],
        duration: 1.5,
        maxZoom: 14,
    });
    hasZoomedRef.current = true;
    setFocusTrailId(null);

    }, [focusTrailId, trails, map, setFocusTrailId]);

    return null;
}