export async function getAllTrails() {
  const res = await fetch("/api/trails", {
    method: "GET",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.error || "Failed to fetch trails");
  }

  return res.json();
}

export async function getTrailById(id: string) {
  const res = await fetch(`/api/trails/${id}`, {
    method: "GET",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.error || "Failed to fetch trail");
  }

  return res.json();
}
