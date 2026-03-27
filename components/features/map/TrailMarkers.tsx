"use client";

import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";
import { getTrailIcon } from "@/lib/map/luciedeIcons";
import { useMapStore } from "@/store/useMapStore";

type Props = {
  onSelectTrail: (id: string | null) => void;
};

export default function TrailMarkers({ onSelectTrail }: Props) {
  const map = useMap();
  const trails = useMapStore((s) => s.filteredTrails);

  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);

  useEffect(() => {
    const markerCluster = L.markerClusterGroup();
    clusterRef.current = markerCluster;
    map.addLayer(markerCluster);

    return () => {
      map.removeLayer(markerCluster);
    };
  }, [map]);

  useEffect(() => {
    const cluster = clusterRef.current;
    if (!cluster) return;

    cluster.clearLayers();

    trails.forEach((trail) => {
        const coords = trail.start_point?.coordinates;
          if (!coords) return;

        const lat = coords[1];
        const lng = coords[0];

          const marker = L.marker([lat, lng], {
            icon: getTrailIcon(trail.typ),
          });

          marker.bindPopup(trail.name);

          marker.on("popupopen", () => {
            onSelectTrail(trail.trail_id);
          });
          marker.on("popupclose", () => {
            onSelectTrail(null);
          });

      cluster.addLayer(marker);
    });
  }, [trails, onSelectTrail]);

  return null;
}