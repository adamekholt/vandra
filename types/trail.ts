export type Trail = {
  trail_id: string;
  name: string;
  geo: GeoJSON.Geometry | string | null;
  start_point: {
    type: "Point";
    coordinates: [number, number];
  } | null;
  type: string ;
  region: string;
  length_km: number;
  description?: string;
};