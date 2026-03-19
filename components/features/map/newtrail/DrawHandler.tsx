"use client";

import { useMapEvents } from "react-leaflet";
import { Point } from "../../NewTrail";

export default function DrawHandler({ onAdd }: { onAdd: (p: Point) => void }) {
    useMapEvents({
    click(e) {
        console.log("CLICK", e.latlng);
        onAdd(e.latlng);
    },
    });

  return null;
}