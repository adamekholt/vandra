import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ user: null });
    }

    const { data: profile, error } = await supabase
      .from("users")
      .select("user_id, email, first_name, last_name, role")
      .eq("user_id", user.id)
      .single()

    if (error || !profile) {
      return Response.json({ user: null })
    }

    return Response.json({
      user: {
        id: profile.user_id,
        email: profile.email,
        role: profile.role,
        first_name: profile.first_name,
        last_name: profile.last_name,
      },
    });

  } catch {
    return Response.json({ user: null })  
  }
}