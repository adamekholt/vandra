"use client"
import { useEffect, useState } from "react"

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/favorites", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setFavorites(data.favorites || []))
      .finally(() => setLoading(false))
  }, [])

  const toggleFavorite = async (trailId: string) => {
    const isFavorite = favorites.includes(trailId)

    setFavorites((prev) =>
      isFavorite
        ? prev.filter((id) => id !== trailId)
        : [...prev, trailId]
    )

    const res = await fetch("/api/favorites", {
      method: isFavorite ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ trail_id: trailId }),
    })

    if (!res.ok) {
      setFavorites((prev) =>
        isFavorite
          ? [...prev, trailId]
          : prev.filter((id) => id !== trailId)
      )
    }
  }

  return {
    favorites,
    loading,
    toggleFavorite,
  }
}