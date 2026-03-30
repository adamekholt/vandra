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
          geometry: geometry,
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

    return Response.json(data);

  } catch (err) {
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("users")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const { name, region, description, geo, length_km } = body;

    if (!name || !region || !description || !geo) {
      return Response.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const start_point = {
      type: "Point",
      coordinates: geo.coordinates[0],
    };

    const { error } = await supabase.from("trails").insert([
      {
        name,
        region,
        description,
        geo,
        start_point,
        length_km,
        type: "Vandring",
      },
    ]);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}