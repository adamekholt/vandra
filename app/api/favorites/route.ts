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
    .eq("user_id", user.id)

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ favorites: data })
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
    .insert({
      user_id: user.id,
      trail_id,
    })
    .select()

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ favorite: data })
}