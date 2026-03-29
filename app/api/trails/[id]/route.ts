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