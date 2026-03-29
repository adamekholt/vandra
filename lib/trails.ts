import type { LineString } from "geojson";

type Form = {
  name: string;
  region: string;
  description: string;
};

export async function saveTrail(
  geo: LineString,
  form: Form,
  length_km: number
) {
  const response = await fetch("/api/trails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      geo,
      length_km,
      ...form,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.error || "Could not save trail");
  }

  return response.json();
}