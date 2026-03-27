"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, LayersControl } from "react-leaflet";
import { useState } from "react";
import OutdoorLayer from "./map/layers/OutdoorLayer";
import SatelliteLayer from "./map/layers/SatelliteLayer";
import TopoLayer from "./map/layers/TopoLayer";
import TrailMarkers from "./map/TrailMarkers";
import UserLocation from "./map/UserLocation";
import TrailLayer from "./map/layers/TrailLayer";
import MapController from "./map/MapController";
import SearchInput from "./map/filters/SearchInput";

const { BaseLayer } = LayersControl;

export default function Map() {
  const [selectedTrailId, setSelectedTrailId] = useState<string | null>(null);
  return (
    <div className="relative h-[calc(100vh-64px)] w-full">
    <MapContainer
      center={[62, 15]}
      zoom={4}
      scrollWheelZoom
      className="h-full w-full"
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

    </MapContainer>
    <SearchInput />
    <MapController />
    </div>
  );
}