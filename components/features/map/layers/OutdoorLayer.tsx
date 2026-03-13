"use client";

import { TileLayer } from "react-leaflet";

export default function OutdoorLayer() {
  const key = process.env.NEXT_PUBLIC_MAPTILER_KEY;

  return (
    <TileLayer
      url={`https://api.maptiler.com/maps/outdoor-v2/{z}/{x}/{y}.png?key=${key}`}
      tileSize={512}
      zoomOffset={-1}
      attribution="© MapTiler © OpenStreetMap contributors"
    />
  );
}