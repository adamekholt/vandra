"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react"
import { MapHeader } from "@/components/layout/MapHeader";
import { FilterSheet } from "@/components/layout/FilterSheet";
import ListView from "./ListView";
import { TrailSheet } from "@/components/layout/TrailSheet";
import { useMapStore } from "@/store/useMapStore";
import { Navbar } from "@/components/layout/navbar";

const Map = dynamic(() => import("@/components/features/Map"), {
  ssr: false,
});

export default function MapClient() {
  const [view, setView] = useState<"map" | "list">("map");
  const selectedTrailId = useMapStore((s) => s.selectedTrailId);
  const setSelectedTrailId = useMapStore((s) => s.setSelectedTrailId);
  const trails = useMapStore((s) => s.trails);
  const selectedTrail = trails.find((t) => t.trail_id === selectedTrailId) ?? null;
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
    );
  };

  useEffect(() => {
  if (view !== "map") {
    setSelectedTrailId(null);
  }
}, [view]);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="fixed inset-0 z-0">
        <Map />
      </div>

      <div className="relative z-50">
        <MapHeader view={view} setView={setView} />
        {view === "list" && (
          <div className="fixed inset-0 bg-background pt-20">
            <ListView />
          </div>
        )}
        <FilterSheet />
        {view === "map" && (
          <TrailSheet
            open={!!selectedTrail}
            onClose={() => setSelectedTrailId(null)}
            trail={selectedTrail}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </div>
      <Navbar />

    </div>
  )
}