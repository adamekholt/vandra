"use client";

import { TileLayer } from "react-leaflet";

export default function SatelliteLayer() {
  const key = process.env.NEXT_PUBLIC_MAPTILER_KEY;

  return (
    <TileLayer
      url={`https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=${key}`}
      tileSize={512}
      zoomOffset={-1}
      attribution="© MapTiler"
    />
  );
}