import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createClient()

  const { data: { session } } = await supabase.auth.getSession()
  const user = session?.user

  if (!user) {
    return Response.json({ trails: [] })
  }

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("user_id", user.id)
    .single()

  if (profile?.role !== "admin") {
    return Response.json({ trails: [] })
  }

  const { data: trails } = await supabase
    .from("trails")
    .select("*")

  return Response.json({ trails })
}