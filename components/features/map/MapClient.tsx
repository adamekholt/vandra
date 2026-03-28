"use client";

import dynamic from "next/dynamic";
import { MapHeader } from "@/components/layout/header";
import { FilterSheet } from "@/components/layout/FilterSheet";

const Map = dynamic(() => import("@/components/features/Map"), {
  ssr: false,
});

export default function MapClient() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="fixed inset-0 z-0">
        <Map />
      </div>

      <div className="relative z-50">
        <MapHeader />
        <FilterSheet />
      </div>

    </div>
  )
}