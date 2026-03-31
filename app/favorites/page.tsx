"use client"
import { Navbar } from "@/components/layout/navbar"
import { Header } from "@/components/layout/header"
import { ListWrapper } from "@/components/layout/ListWrapper"
import { TrailCard } from "@/components/layout/TrailCard"
import { useFavorites } from "@/hooks/useFavorites"
import { useTrails } from "@/hooks/useTrails"
import { useMapStore } from "@/store/useMapStore"

export default function Page() {
  const { favorites, loading: favLoading } = useFavorites()
  const { loading: trailsLoading } = useTrails()
  const trails = useMapStore((s) => s.trails)

  const favoriteTrails = trails.filter((trail) =>
    favorites.includes(trail.trail_id)
  )

  if (favLoading || trailsLoading) {
    return <div className="p-4">Laster...</div>
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <main className="flex-1 overflow-y-auto px-4 pt-20 pb-24">
        <div className="mb-6">
          <h1 className="text-3xl font-heading">Sparade leder</h1>
        </div>

        <ListWrapper className="mt-4">
          {favoriteTrails.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Du har inte sparat nogon leder ännu
            </p>
          ) : (
            favoriteTrails.map((trail) => (
              <TrailCard key={trail.trail_id} trail={trail} />
            ))
          )}
        </ListWrapper>
      </main>

      <Navbar />
    </div>
  )
}