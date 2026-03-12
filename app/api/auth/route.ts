import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } =
      await supabase.auth.getUser()

    if (authError || !user) {
      return Response.json({ user: null })
    }

    const { data: profile, error } = await supabase
      .from("users")
      .select("role")
      .eq("user_id", user.id)
      .single()

    if (error) {
      return Response.json({ user: null })
    }

    return Response.json({
      user: {
        id: user.id,
        email: user.email,
        role: profile.role,
      },
    })

  } catch {
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}