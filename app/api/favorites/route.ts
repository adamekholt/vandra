import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabase
    .from("favorites")
    .select("trail_id")

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({
    favorites: data.map((f) => f.trail_id),
  })
}

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { trail_id } = await req.json()

  if (!trail_id) {
    return Response.json({ error: "trail_id required" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("favorites")
    .insert({ trail_id })
    .select()

  if (error) {
    if (error.code === "23505") {
      return Response.json({ message: "Already favorited" })
    }
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ favorite: data[0] })
}

export async function DELETE(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { trail_id } = await req.json()

  if (!trail_id) {
    return Response.json({ error: "trail_id required" }, { status: 400 })
  }

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("trail_id", trail_id)

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ success: true })
}