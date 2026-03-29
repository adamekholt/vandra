import type { LineString, Point } from "geojson";

export type Trail = {
  trail_id: string;
  name: string;
  geo: LineString | null;
  start_point: Point | null;
  type: string;
  region: string;
  length_km: number;
  description: string;
};