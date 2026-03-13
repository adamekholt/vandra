"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function UserLocation() {
  const map = useMap();

  useEffect(() => {
    map.locate({ setView: true });

    map.on("locationfound", (e) => {
      L.marker(e.latlng).addTo(map);
      L.circle(e.latlng, { radius: e.accuracy }).addTo(map);
    });
  }, [map]);

  return null;
}