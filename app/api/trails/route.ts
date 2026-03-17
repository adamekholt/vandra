import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("trails")
      .select("trail_id, name, geo")

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      )
    }

    const geojson = {
      type: "FeatureCollection",
      features: data.map((trail) => ({
        type: "Feature",
        geometry: trail.geo,
        properties: {
          id: trail.trail_id,
          name: trail.name
        }
      }))
    }

    return Response.json(geojson)

  } catch (err) {
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}