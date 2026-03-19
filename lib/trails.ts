import type { LineString } from "geojson";

type Form = {
  name: string;
  type: string;
  region: string;
};

export async function saveTrail(geo: LineString, form: Form) {
  const response = await fetch("/api/trails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      geo,
      ...form,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.error || "Could not save trail");
  }

  return response.json();
}