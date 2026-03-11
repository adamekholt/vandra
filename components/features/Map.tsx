"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type * as Leaflet from "leaflet";

export default function Map() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMap = useRef<Leaflet.Map | null>(null);

  useEffect(() => {
    async function initMap() {
      if (!mapRef.current || leafletMap.current) return;

      const L: typeof Leaflet = await import("leaflet");

      const userIcon = L.divIcon({
        html: `
          <div class="flex items-center justify-center text-red-600 text-2xl">
            <i class="fa-solid fa-location-dot"></i>
          </div>
        `,
        className: "",
        iconSize: [24, 24],
        iconAnchor: [12, 24],
      });

      const map = L.map(mapRef.current).setView([59.91, 10.75], 13);
      leafletMap.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      let marker: Leaflet.Marker | null = null;
      let circle: Leaflet.Circle | null = null;

      map.locate({
        watch: true,
        setView: true,
        maxZoom: 16,
        enableHighAccuracy: true,
      });

      map.on("locationfound", (e: Leaflet.LocationEvent) => {
        const radius = e.accuracy;

        if (marker && circle) {
          marker.setLatLng(e.latlng);
          circle.setLatLng(e.latlng);
          circle.setRadius(radius);
        } else {
          marker = L.marker(e.latlng, { icon: userIcon })
            .addTo(map)
            .bindPopup("Your location")
            .openPopup();

          circle = L.circle(e.latlng, { radius }).addTo(map);
        }
      });

      map.on("locationerror", (e: Leaflet.ErrorEvent) => {
        console.log("Location error:", e.message);
      });
    }

    initMap();

    return () => {
      if (leafletMap.current) {
        leafletMap.current.stopLocate();
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} className="w-full h-screen" />;
}