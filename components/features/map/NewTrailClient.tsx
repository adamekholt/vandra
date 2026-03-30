"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { FormSheet } from "@/components/layout/FormSheet";
import TrailForm from "@/components/features/TrailForm";
import { totalDistance } from "@/lib/map/distance";
import type { Point } from "@/components/features/NewTrail";

const NewTrail = dynamic(() => import("@/components/features/NewTrail"), {
  ssr: false,
});

export default function NewTrailClient() {
  const [points, setPoints] = useState<Point[]>([]);
  const distanceKm = totalDistance(points);


  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="fixed inset-0 z-0">
          <NewTrail points={points} setPoints={setPoints} />
      </div>

      <div className="relative z-50">
        <FormSheet>
          <TrailForm points={points} distanceKm={distanceKm} />
        </FormSheet>
      </div>
    </div>
  )
}