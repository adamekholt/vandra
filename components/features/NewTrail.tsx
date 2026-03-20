"use client";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { MapContainer, LayersControl } from "react-leaflet";
import { useState } from "react";

import OutdoorLayer from "./map/layers/OutdoorLayer";
import DrawControls from "./map/newtrail/DrawControls";
import DrawHandler from "./map/newtrail/DrawHandler";
import DrawMarkers from "./map/newtrail/DrawMarkers";
import DrawPolyline from "./map/newtrail/DrawPolyline";
import DrawDistance from "./map/newtrail/DrawDistance";
import TrailForm from "./TrailForm";
import { totalDistance } from "@/lib/map/distance";

const { BaseLayer } = LayersControl;

export type Point = {
  lat: number;
  lng: number;
};

export default function NewTrail() {
  const [points, setPoints] = useState<Point[]>([]);
  const distance = totalDistance(points);
  
  return (
    <div className="relative w-full">
      <div className="absolute bottom-4 left-4 z-[1000]">
        <TrailForm points={points} distanceKm={distance} />
      </div>

      <div className="absolute top-4 right-4 z-[1000]">
        <DrawControls
          onReset={() => setPoints([])}
          onUndo={() => setPoints((prev) => prev.slice(0, -1))}
          hasPoints={points.length > 0}
        />
      </div>
     
      <MapContainer
        center={[59.91, 10.75]}
        zoom={10}
        scrollWheelZoom
        style={{ height: "100vh", width: "100%" }}
      >
        <LayersControl position="topright">
          <BaseLayer checked name="Outdoor">
            <OutdoorLayer />
          </BaseLayer>
        </LayersControl>
        <DrawHandler onAdd={(p) => setPoints((prev) => [...prev, p])} />
        <DrawMarkers points={points} />
        <DrawPolyline points={points} />
      </MapContainer>

      <DrawDistance distanceKm={distance} />
    </div>
  );
}