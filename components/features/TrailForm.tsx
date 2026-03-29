"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveTrail } from "@/lib/trails";
import { pointsToGeoJSON } from "@/lib/geo";

type Point = {
  lat: number;
  lng: number;
};

export default function TrailForm({
  points,
  distanceKm,
}: {
  points: Point[];
  distanceKm: number;
}) {
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (points.length < 2) {
      alert("Need at least 2 points");
      return;
    }

    if (!name || !region || !description) {
      alert("Fill all fields");
      return;
    }

    const geo = pointsToGeoJSON(points);
    try {
      setLoading(true);

      await saveTrail(
        geo,
        {
          name,
          region,
          description,
        },
        distanceKm
      );
      alert("Saved!");

      setName("");
      setRegion("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("Error saving trail");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-xl shadow w-72">
      <Input
        placeholder="Namn"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        placeholder="Län"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      />

      <Input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save trail"}
      </Button>
    </div>
  );
}