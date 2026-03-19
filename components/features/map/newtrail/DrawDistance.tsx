"use client";

export default function DrawDistance({ distanceKm }: { distanceKm: number }) {
  return (
    <div className="absolute top-4 left-4 bg-white p-3 rounded-xl shadow">
      {distanceKm < 1
        ? `${(distanceKm * 1000).toFixed(0)} m`
        : `${distanceKm.toFixed(2)} km`}
    </div>
  );
}