"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import type * as Leaflet from "leaflet";
import { userIcon } from "@/lib/map/luciedeIcons";

export default function UserLocation() {
  const map = useMap();

  useEffect(() => {
    let L: typeof Leaflet;

    async function load() {
      L = (await import("leaflet")) as typeof Leaflet;

      map.locate({ setView: true });

      map.on("locationfound", (e: Leaflet.LocationEvent) => {
        L.marker(e.latlng, { icon: userIcon() }).addTo(map);
        L.circle(e.latlng, { radius: e.accuracy }).addTo(map);
      });
    }

    load();
  }, [map]);

  return null;
}