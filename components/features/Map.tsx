"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import { MapContainer, LayersControl } from "react-leaflet";
import { useState } from "react";
import OutdoorLayer from "./map/layers/OutdoorLayer";
import SatelliteLayer from "./map/layers/SatelliteLayer";
import TopoLayer from "./map/layers/TopoLayer";
import TrailMarkers from "./map/TrailMarkers";
import UserLocation from "./map/UserLocation";
import Tracker from "./map/Tracker";
import TrailLayer from "./map/layers/TrailLayer";

const { BaseLayer } = LayersControl;

export default function Map() {
  const [selectedTrailId, setSelectedTrailId] = useState<string | null>(null);
  return (
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

        <BaseLayer name="Satellite">
          <SatelliteLayer />
        </BaseLayer>

        <BaseLayer name="Topographic">
          <TopoLayer />
        </BaseLayer>

      </LayersControl>

      <TrailMarkers onSelectTrail={setSelectedTrailId} />
      <TrailLayer selectedTrailId={selectedTrailId} />
      <UserLocation />
      <Tracker />

    </MapContainer>
  );
}