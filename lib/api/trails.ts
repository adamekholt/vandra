import { createClient } from "@/lib/supabase/server";

export async function getAllTrails() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("trails")
    .select("*");
    
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getTrailById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("trails")
    .select("*")
    .eq("trail_id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
