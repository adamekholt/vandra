import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: profile, error } = await supabase
      .from("users")
      .select("user_id, email, first_name, last_name, role")
      .eq("user_id", user.id)
      .single()

    if (error || !profile) {
      return Response.json({ error: "User not found" }, { status: 404 })
    }

    return Response.json({ user: profile })

  } catch {
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}