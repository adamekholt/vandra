import type { LineString, Point } from "geojson";

export function pointsToGeoJSON(points: { lat: number; lng: number }[]): LineString {
  return {
    type: "LineString",
    coordinates: points.map((p) => [p.lng, p.lat]),
  };
}

export function getStartPoint(points: { lat: number; lng: number }[]): Point {
  const p = points[0];

  return {
    type: "Point",
    coordinates: [p.lng, p.lat],
  };
}