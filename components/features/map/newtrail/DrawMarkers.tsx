"use client";

import { Marker } from "react-leaflet";
import { Point } from "../../NewTrail";
import { pointIcon, startIcon } from "@/lib/map/luciedeIcons";

export default function DrawMarkers({ points }: { points: Point[] }) {
  return (
    <>
      {points.map((p, i) => (
        <Marker
          key={`${p.lat}-${p.lng}-${i}`}
          position={p}
          icon={i === 0 ? startIcon() : pointIcon()}
        />
      ))}
    </>
  );
}