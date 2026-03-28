"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";

import { pointsToGeoJSON, getStartPoint } from "@/lib/geo";
const supabase = createClient()

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
  const [type, setType] = useState("footway");
  const [region, setRegion] = useState("");

  const handleSave = async () => {
    if (points.length < 2) {
      alert("Need at least 2 points");
      return;
    }

    const geo = pointsToGeoJSON(points);
    const start_point = getStartPoint(points);

    const { error } = await supabase.from("trails").insert({
      name,
      geo,
      type,
      region,
      length_km: distanceKm,
      start_point
    });

    if (error) {
      console.error(error);
      alert("Error saving trail");
    } else {
      alert("Saved!");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Input
        placeholder="Trail name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        placeholder="Region"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      />

      <Select
        value={type}
        onValueChange={(value) => {
          if (!value) return;
          setType(value);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select type" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="footway">Footway</SelectItem>
          <SelectItem value="track">Track</SelectItem>
          <SelectItem value="path">Path</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={handleSave}>Save trail</Button>
    </div>
  );
}