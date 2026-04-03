"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, LayersControl } from "react-leaflet";
import { useEffect } from "react";
import OutdoorLayer from "./map/layers/OutdoorLayer";
import SatelliteLayer from "./map/layers/SatelliteLayer";
import TopoLayer from "./map/layers/TopoLayer";
import TrailMarkers from "./map/TrailMarkers";
import UserLocation from "./map/UserLocation";
import TrailLayer from "./map/layers/TrailLayer";
import SearchInput from "./map/filters/SearchInput";
import { useMapStore } from "@/store/useMapStore";
import { useTrails } from "@/hooks/useTrails";
import { useSearchParams } from "next/navigation";
import ZoomToTrail from "./ZoomToTrail";
import { useRouter } from "next/navigation";

const { BaseLayer } = LayersControl;

export default function Map() {
  useTrails();
  const params = useSearchParams();
  const router = useRouter();

 const setSelectedTrailId = useMapStore((s) => s.setSelectedTrailId);

  useEffect(() => {
    const trailId = params.get("trailId");
    if (!trailId) return;
    setSelectedTrailId(trailId);
    router.replace("/map");
  }, []);
  
  return (
    <div className="h-full w-full">
    <MapContainer
      center={[62, 15]}
      zoom={4}
      scrollWheelZoom
      className="h-full w-full [&_.leaflet-top]:!top-20"
    >
      <LayersControl position="topright">
        <BaseLayer checked name="Topographic">
          <TopoLayer />
        </BaseLayer>             
        
        <BaseLayer name="Satellite">
          <SatelliteLayer />
        </BaseLayer>

        <BaseLayer  name="Outdoor">
          <OutdoorLayer />
        </BaseLayer>
      </LayersControl>

      <TrailMarkers onSelectTrail={setSelectedTrailId} />
      <TrailLayer />
      <ZoomToTrail />
      <UserLocation />
    </MapContainer>
    <SearchInput />
</div>
  );
}