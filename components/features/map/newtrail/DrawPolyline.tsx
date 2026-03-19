"use client";

import { Polyline } from "react-leaflet";
import { Point } from "../../NewTrail";

export default function DrawPolyline({ points }: { points: Point[] }) {
  return <Polyline positions={points} />;
}