"use client";

import { useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { userIcon } from "@/lib/map/luciedeIcons";

export default function UserLocation() {
  const map = useMap();

  const [active, setActive] = useState(false);
  const activeRef = useRef(false);

  const markerRef = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);

  useEffect(() => {
    const control = (L as any).control({ position: "topright" });

    control.onAdd = () => {
      const div = L.DomUtil.create("div", "leaflet-bar");

      const button = L.DomUtil.create("a", "", div);
      button.innerHTML = "📍";
      button.href = "#";
      button.title = "Min lokasjon";

      button.style.width = "30px";
      button.style.height = "30px";
      button.style.display = "flex";
      button.style.alignItems = "center";
      button.style.justifyContent = "center";
      button.style.fontSize = "18px";

      L.DomEvent.on(button, "click", (e) => {
        L.DomEvent.stop(e);

        activeRef.current = !activeRef.current;
        setActive(activeRef.current);

        // visuell feedback
        button.style.background = activeRef.current ? "#000" : "#fff";
        button.style.color = activeRef.current ? "#fff" : "#000";
      });

      return div;
    };

    control.addTo(map);

    return () => {
      control.remove();
    };
  }, [map]);

  // 🔹 location event (én gang)
  useEffect(() => {
    const onLocationFound = (e: L.LocationEvent) => {
      if (!activeRef.current) return;

      // fjern gammel
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }
      if (circleRef.current) {
        map.removeLayer(circleRef.current);
      }

      // legg til ny
      markerRef.current = L.marker(e.latlng, {
        icon: userIcon(),
      }).addTo(map);

      circleRef.current = L.circle(e.latlng, {
        radius: e.accuracy,
      }).addTo(map);
    };

    map.on("locationfound", onLocationFound);

    return () => {
      map.off("locationfound", onLocationFound);
    };
  }, [map]);

  // 🔹 toggle behavior
  useEffect(() => {
    if (!active) {
      // fjern alt
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

    // hent location
    map.locate({ setView: true, maxZoom: 13 });
  }, [active, map]);

  return null;
}