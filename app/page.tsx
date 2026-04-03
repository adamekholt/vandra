import { TrailCard } from "@/components/layout/TrailCard";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { TrailsSection } from "@/components/layout/TrailsSection";
import { getAllTrails } from "@/lib/api/trails";

export default async function Page() {
  const trails = await getAllTrails();
  const recommended = trails[Math.floor(Math.random() * trails.length)];
  

  return (
    <div className="flex flex-col h-screen">
    <main className="flex-1 overflow-y-auto px-4 pt-8 pb-24">
      <header className="mb-6">
        <h1 className="text-3xl font-heading">Vandra</h1>
        <p className="text-muted-foreground">
          Hitta din nästa led
        </p>
      </header>

      {recommended && (
        <div className="mb-4">
          <TrailCard trail={recommended} variant="lg" />
        </div>
      )}

      <Link href="/map">
        <Button className="h-12 w-full text-base">
          <MapPin className="size-5" />
          Utforska karta
        </Button>
      </Link>

        <TrailsSection trails={trails} />
      </main>
      <Navbar />
    </div>
  );
}