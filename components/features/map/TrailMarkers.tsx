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
  const { filters, search, lengthRange } = useMapStore();
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);
  const dataRef = useRef<any[]>([]);

  useEffect(() => {
    const markerCluster = L.markerClusterGroup();
    clusterRef.current = markerCluster;
    map.addLayer(markerCluster);

    return () => {
      map.removeLayer(markerCluster);
    };
  }, [map]);

  useEffect(() => {
    fetch("/api/trails")
      .then((res) => res.json())
      .then((data) => {
        dataRef.current = data.features || [];
        renderMarkers();
      });
  }, []);

  useEffect(() => {
    renderMarkers();
  }, [filters, search, lengthRange]);

  function renderMarkers() {
    const cluster = clusterRef.current;
    if (!cluster) return;

    cluster.clearLayers();

    const filtered = dataRef.current.filter((f: any) => {
      const name = f.properties.name?.toLowerCase() || "";
      const type = f.properties.type;
      const length = f.properties.length_m ?? 0;

      const matchesSearch = name.includes(search.toLowerCase());

      const matchesType =
        filters.length === 0 || filters.includes(type);

      let matchesLength = true;

      if (lengthRange) {
        const [min, max] = lengthRange;

        if (length < min) matchesLength = false;
        if (max !== null && length > max) matchesLength = false;
      }

      return matchesSearch && matchesType && matchesLength;
    });

    filtered.forEach((f: any) => {
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

      cluster.addLayer(marker);
    });
  }

  return null;
}