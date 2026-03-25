// import { createClient } from "@/lib/supabase/server"

// export async function GET() {
//   try {
//     const supabase = await createClient()

//     const { data, error } = await supabase
//       .from("trails")
//       .select("trail_id, name, geo")

//     if (error) {
//       return Response.json(
//         { error: error.message },
//         { status: 500 }
//       )
//     }

//     const geojson = {
//       type: "FeatureCollection",
//       features: data.map((trail) => ({
//         type: "Feature",
//         geometry: trail.geo,
//         properties: {
//           id: trail.trail_id,
//           name: trail.name
//         }
//       }))
//     }

//     return Response.json(geojson)

//   } catch (err) {
//     return Response.json(
//       { error: "Server error" },
//       { status: 500 }
//     )
//   }
// }

import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("trails")
      .select("trail_id, name, region, geo, start_point, type, description, length_km");

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const geojson = {
      type: "FeatureCollection",
      features: data.map((trail) => {
        const parsed =
          typeof trail.geo === "string"
            ? JSON.parse(trail.geo)
            : trail.geo;

        const geometry =
          parsed.type === "Feature"
            ? parsed.geometry
            : parsed;

        return {
          type: "Feature",
          geometry,
          properties: {
            id: trail.trail_id,
            name: trail.name,
            region: trail.region,
            description: trail.description,
            length_km: trail.length_km,
            type: trail.type
          },
        };
      }),
    };

    return Response.json(geojson);

  } catch (err) {
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}