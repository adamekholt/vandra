"use client";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { MapContainer, LayersControl } from "react-leaflet";
import { Header } from "./map/newtrail/Header";
import TopoLayer from "./map/layers/TopoLayer";
import OutdoorLayer from "./map/layers/OutdoorLayer";
import SatelliteLayer from "./map/layers/SatelliteLayer";
import DrawControls from "./map/newtrail/DrawControls";
import DrawHandler from "./map/newtrail/DrawHandler";
import DrawMarkers from "./map/newtrail/DrawMarkers";
import DrawPolyline from "./map/newtrail/DrawPolyline";
import DrawDistance from "./map/newtrail/DrawDistance";
import { totalDistance } from "@/lib/map/distance";

const { BaseLayer } = LayersControl;

export type Point = {
  lat: number;
  lng: number;
};

export default function NewTrail({
  points,
  setPoints,
}: {
  points: Point[];
  setPoints: React.Dispatch<React.SetStateAction<Point[]>>;
}) {
  const distance = totalDistance(points);
  
  return (
    <div className="relative w-full">
      <Header>
        <DrawControls
          onReset={() => setPoints([])}
          onUndo={() => setPoints((prev) => prev.slice(0, -1))}
          hasPoints={points.length > 0}
        />
      </Header>

      <MapContainer
        center={[59.91, 10.75]}
        zoom={10}
        scrollWheelZoom
        style={{ height: "100vh", width: "100%" }}
        className="h-full w-full [&_.leaflet-top]:!top-20"
      >
        <LayersControl position="topright">
          <BaseLayer checked name="Topographic">
            <TopoLayer />
          </BaseLayer>

          <BaseLayer name="Satellite">
            <SatelliteLayer />
          </BaseLayer>

          <BaseLayer name="Outdoor">
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