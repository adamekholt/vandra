"use client";

import dynamic from "next/dynamic";
import { useState } from "react"
import { MapHeader } from "@/components/layout/header";
import { FilterSheet } from "@/components/layout/FilterSheet";
import ListView from "./ListView";

const Map = dynamic(() => import("@/components/features/Map"), {
  ssr: false,
});

export default function MapClient() {
  const [view, setView] = useState<"map" | "list">("map");

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
      </div>

    </div>
  )
}