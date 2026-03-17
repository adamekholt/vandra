"use client";

import { Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";

type Trail = {
  id: string;
  name: string;
  start_point: {
    coordinates: [number, number];
  };
};

export default function TrailMarkers() {

  const [trails, setTrails] = useState<Trail[]>([]);

  useEffect(() => {
    fetch("/api/trails")
      .then(res => res.json())
      .then(data => {
        const markers = data.features.map((f: any) => ({
          id: f.properties.id,
          name: f.properties.name,
          start_point: {
            coordinates: f.geometry.coordinates[0][0]
          }
        }));
        setTrails(markers);
      });
  }, []);

  return (
    <>
      {trails.map((trail) => (
        <Marker
          key={trail.id}
          position={[
            trail.start_point.coordinates[1],
            trail.start_point.coordinates[0],
          ]}
        >
          <Popup>{trail.name}</Popup>
        </Marker>
      ))}
    </>
  );
}