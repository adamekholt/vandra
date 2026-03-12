"use client"
import { useEffect, useState } from "react"
import { Hero } from "@/components/layout/hero"
import { createClient } from "@/lib/supabase/client"
import { useModal } from "@/components/modal/modalProvider"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

type Trail = {
  trail_id: string
  name: string | null
  created_at: string
}

export default function Page() {
  const { openTrailModal } = useModal()
  const [trails, setTrails] = useState<Trail[]>([])

  useEffect(() => {
    const supabase = createClient()
    async function loadTrails() {

      const { data, error } = await supabase
        .from("trails")
        .select("trail_id, name, created_at")
        .order("created_at", { ascending: false })

      if (!error && data) {
        setTrails(data)
      }
    }

    loadTrails()

  }, [])

  return (
    <>
      <Hero
        title="Discover your next adventure"
        description="Find new trails and explore your surroundings."
      />
      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {trails.map((trail) => (

            <Card
              key={trail.trail_id}
              className="cursor-pointer hover:shadow-lg transition"
              onClick={() =>
                openTrailModal({
                  id: trail.trail_id,
                  title: trail.name ?? "Unnamed trail",
                  description: " "
                })
              }
            >
              <CardHeader>
                <CardTitle>
                  {trail.name ?? "Unnamed trail"}
                </CardTitle>

                <CardDescription>
                  Trail ID: {trail.trail_id}
                </CardDescription>
              </CardHeader>

              <CardContent className="text-sm text-muted-foreground">
                Created{" "}
                {new Date(trail.created_at).toLocaleDateString()}
              </CardContent>
            </Card>

          ))}

        </div>

      </div>
    </>
  )
}