"use client"
import { useEffect, useState } from "react"
import { useUser } from "@/hooks/useUser"

export function useFavorites() {
  const { user, loading: userLoading } = useUser()

  const [favorites, setFavorites] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (userLoading) return

    if (!user) {
      setIsAuthenticated(false)
      setFavorites([])
      setLoading(false)
      return
    }

    setIsAuthenticated(true)

    const fetchFavorites = async () => {
      const res = await fetch("/api/favorites", {
        credentials: "include",
      })

      if (!res.ok) {
        console.error("Failed to fetch favorites")
        setFavorites([])
        return
      }

      const data = await res.json()
      setFavorites(data.favorites || [])
    }

    fetchFavorites().finally(() => setLoading(false))
  }, [user, userLoading])

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
    isAuthenticated,
    toggleFavorite,
  }
}