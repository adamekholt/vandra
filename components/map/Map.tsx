"use client";

import { useEffect } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export default function Map() {
  useEffect(() => {
    const map = L.map("map").setView([59.91, 10.75], 13)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map)

    return () => {
      map.remove()
    }
  }, [])

  return <div id="map" className="w-full h-screen"></div>
}