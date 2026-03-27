"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Trail = {
  trail_id: string;
  name: string | null;
  user_id: string | null;
  created_at: string;
};

export default function TrailDetailPage() {
  const supabase = createClient();

  const params = useParams();
  const id = params.id as string;

  const router = useRouter();

  const [trail, setTrail] = useState<Trail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrail() {
      const { data, error } = await supabase
        .from("trails")
        .select("trail_id, name, user_id, created_at")
        .eq("trail_id", id)
        .single();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setTrail(data);
      setLoading(false);
    }

    if (id) loadTrail();
  }, [id]);

  if (loading) {
    return <div className="p-8">Loading trail...</div>;
  }

  if (!trail) {
    return <div className="p-8">Trail not found</div>;
  }

  return (
    <div className="p-8 space-y-6">

      <button
        onClick={() => router.push("/trails")}
        className="text-sm text-blue-500"
      >
        ← Back to trails
      </button>

      <h1 className="text-3xl font-bold">
        {trail.name ?? "Unnamed trail"}
      </h1>

      <div className="space-y-2 text-sm">
        <div>
          <strong>Trail ID:</strong> {trail.trail_id}
        </div>

        <div>
          <strong>User ID:</strong> {trail.user_id}
        </div>

        <div>
          <strong>Created:</strong>{" "}
          {new Date(trail.created_at).toLocaleDateString()}
        </div>
      </div>

      <div className="border rounded-lg h-[300px] flex items-center justify-center">
        Map preview coming later
      </div>

      <div className="flex gap-4">

        <button className="px-4 py-2 bg-gray-900 text-white rounded">
          Edit trail
        </button>

        <button className="px-4 py-2 bg-red-600 text-white rounded">
          Delete trail
        </button>

      </div>

    </div>
  );
}