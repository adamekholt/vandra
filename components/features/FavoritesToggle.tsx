"use client"
import { Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  trailId: string
  isFavorite: boolean
  onToggle: (id: string) => void
}

export function FavoritesToggle({ trailId, isFavorite, onToggle }: Props) {
  return (
    <Button
      variant="link"
      onClick={(e) => {
        e.stopPropagation()
        onToggle(trailId)
      }}
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