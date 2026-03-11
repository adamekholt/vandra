"use client";

import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import type * as Leaflet from "leaflet";

export default function Map() {
  useEffect(() => {
    let map: Leaflet.Map | null = null;

    async function initMap() {
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

      map = L.map("map").setView([59.91, 10.75], 13);

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
            .addTo(map!)
            .bindPopup("Your location")
            .openPopup();

          circle = L.circle(e.latlng, {
            radius,
          }).addTo(map!);
        }
      });

      map.on("locationerror", (e: Leaflet.ErrorEvent) => {
        console.log("Location error:", e.message);
      });
    }

    initMap();

    return () => {
      if (map) {
        map.stopLocate();
        map.remove();
      }
    };
  }, []);

  return <div id="map" className="w-full h-screen"></div>;
}