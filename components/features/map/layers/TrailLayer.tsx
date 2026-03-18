"use client";

import { GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";

export default function TrailLayer({
  selectedTrailId,
}: {
  selectedTrailId: string | null;
}) {

  const [data,setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/trails")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data || !selectedTrailId) return null;
  const filteredData = {
    ...data,
    features: data.features.filter(
      (f: any) => f.properties.id === selectedTrailId
    ),
  };

  return (
    <GeoJSON
      data={filteredData}
      style={{
        color: "#e27c00",
        weight: 3
      }}
    />
  );
}