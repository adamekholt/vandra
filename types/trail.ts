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

export type TrailPreview = {
  trail_id: string;
  name: string;
  description: string;
  length_km: number;
  type: string;
  region: string;
};