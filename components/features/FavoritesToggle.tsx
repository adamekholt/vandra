"use client"

import { Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"

type Props = {
  trailId: string
  isFavorite: boolean
  onToggle: (id: string) => void
}

export function FavoritesToggle({ trailId, isFavorite, onToggle }: Props) {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  if (!user) return null

  return (
    <Button
      variant="link"
      onClick={() => onToggle(trailId)}
      className="rounded-lg"
    >
      <Bookmark
        className={`h-5 w-5 ${
          isFavorite ? "fill-primary text-primary" : "text-primary"
        }`}
      />
    </Button>
  )
}