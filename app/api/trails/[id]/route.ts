import { createClient } from "@/lib/supabase/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("trails")
      .select("trail_id, name, region, type, description, length_km")
      .eq("trail_id", id)
      .single();

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return Response.json(data);

  } catch {
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("users")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      return Response.json({ error: "Not authorized" }, { status: 403 });
    }

    const { data, error } = await supabase
      .from("trails")
      .update({
        name: body.name,
        region: body.region,
        description: body.description,
        last_updated: new Date().toISOString(),
      })
      .eq("trail_id", id)
      .select()
      .maybeSingle();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);

  } catch {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { data: profile } = await supabase
      .from("users")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      return Response.json(
        { error: "Not authorized" },
        { status: 403 }
      );
    }

    const { error } = await supabase
      .from("trails")
      .delete()
      .eq("trail_id", id);

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return Response.json(
      { message: "Trail deleted successfully" },
      { status: 200 }
    );

  } catch {
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}