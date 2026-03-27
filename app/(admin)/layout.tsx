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

  // ikke logget inn
  if (!user) {redirect("/")}

  const { data: profile, error } = await supabase
    .from("users")
    .select("role")
    .eq("user_id", user.id)
    .single()

  // databasefeil eller ikke admin
  if (error || profile?.role !== "admin") {
    redirect("/")
  }
  
  return <>{children}</>;
}