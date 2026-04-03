"use client";

import { useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { Locate } from "lucide-react";
import { renderToString } from "react-dom/server";
import { Button } from "@/components/ui/button";

export default function UserLocation() {
  const map = useMap();
  const [active, setActive] = useState(false);

  const markerRef = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);

  useEffect(() => {
    const onLocationFound = (e: L.LocationEvent) => {
      if (!active) return;

      if (markerRef.current) map.removeLayer(markerRef.current);
      if (circleRef.current) map.removeLayer(circleRef.current);
      markerRef.current = L.marker(e.latlng, {
        icon: L.divIcon({
          className: "flex items-center justify-center",
          html: renderToString(
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300">
              <Locate className="w-4 h-4 text-gray-700" />
            </div>
          ),
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        }),
      }).addTo(map);

      circleRef.current = L.circle(e.latlng, {
        radius: e.accuracy,
      }).addTo(map);
    };

    map.on("locationfound", onLocationFound);
    return () => {
      map.off("locationfound", onLocationFound);
    };
  }, [map, active]);

  useEffect(() => {
    if (!active) {
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
        markerRef.current = null;
      }

      if (circleRef.current) {
        map.removeLayer(circleRef.current);
        circleRef.current = null;
      }

      return;
    }

    map.locate({ setView: true, maxZoom: 13 });
  }, [active, map]);

  return (
    <div className="absolute right-4 bottom-50 z-[1000]">
      <Button
        size="icon-lg"
        variant="outline"
        onClick={() => setActive((prev) => !prev)}
        className={`
          rounded-full shadow-md
          ${active ? "bg-accent text-accent-foreground" : ""}
        `}
      >
        <Locate />
      </Button>
    </div>
  );
}