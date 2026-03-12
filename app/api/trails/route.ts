import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("trails")
      .select("trail_id, name, geo, created_at")
      .order("created_at", { ascending: false })

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return Response.json({ trails: data })

  } catch (err) {
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}