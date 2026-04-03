import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  const user = session?.user

  if (!user) {redirect("/")}

  const { data: profile, error } = await supabase
    .from("users")
    .select("role")
    .eq("user_id", user.id)
    .single()

  if (error || profile?.role !== "admin") {
    redirect("/")
  }
  
  return <>{children}</>;
}