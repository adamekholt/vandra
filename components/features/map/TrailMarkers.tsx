"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { getTrailIcon } from "@/lib/map/luciedeIcons";

type Props = {
  onSelectTrail: (id: string | null) => void;
};

export default function TrailMarkers({ onSelectTrail }: Props) {
  const map = useMap();

  useEffect(() => {
    const markerCluster = L.markerClusterGroup();
    fetch("/api/trails")
      .then((res) => res.json())
      .then((data) => {
        data.features.forEach((f: any) => {
        const coords = f.properties.start_point?.coordinates;
          if (!coords) return;

        const lat = coords[1];
        const lng = coords[0];

          const marker = L.marker([lat, lng], {
            icon: getTrailIcon(f.properties.typ),
          });

          marker.bindPopup(f.properties.name);

          marker.on("popupopen", () => {
            onSelectTrail(f.properties.id);
          });
          
          marker.on("popupclose", () => {
            onSelectTrail(null);
          });

          marker.addTo(map);
        });

        map.addLayer(markerCluster);
      });

    return () => {
      map.removeLayer(markerCluster);
    };
  }, [map, onSelectTrail]);

  return null;
}