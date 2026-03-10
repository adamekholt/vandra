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

    let marker: L.Marker<any>
    let circle: L.Circle<any>

    map.locate({
      watch: true,
      setView: true,
      maxZoom: 16,
      enableHighAccuracy: true,
    })

    map.on("locationfound", (e) => {
      const radius = e.accuracy

      if (marker) {
        marker.setLatLng(e.latlng)
        circle.setLatLng(e.latlng)
        circle.setRadius(radius)
      } else {
        marker = L.marker(e.latlng)
          .addTo(map)
          .bindPopup("Your location")
          .openPopup()

        circle = L.circle(e.latlng, {
          radius: radius,
        }).addTo(map)
      }
    })

    map.on("locationerror", (e) => {
      console.log("Location error:", e.message)
    })

    return () => {
      map.stopLocate()
      map.remove()
    }
  }, [])

  return <div id="map" className="w-full h-screen"></div>
}