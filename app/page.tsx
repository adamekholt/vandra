import { TrailCard, Trail } from "@/components/layout/TrailCard";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Link from "next/link";

export default function Page() {
//midlertidig mockdata frem til bugfix av trails routen er gjennomført
  const trails: Trail[] = [
    {
      id: "1",
      title: "Njupeskär",
      distance: "8 km",
      image: "/images/image.jpg",
    },
    {
      id: "2",
      title: "Fulufjället",
      distance: "12 km",
      image: "/images/image.jpg",
    },
    {
      id: "3",
      title: "Sonfjället",
      distance: "6 km",
      image: "/images/image.jpg",
    },
  ];

  const featured = trails[0];
  const nearby = trails.slice(1);

  return (
    <section className="flex flex-col px-4 pt-8 pb-6 gap-3">
      <header className="mb-6">
        <h1 className="text-3xl font-heading">Vandra</h1>
        <p className="text-muted-foreground">
          Hitta din nästa led
        </p>
      </header>

      <div className="mb-4">
        <TrailCard trail={featured} variant="lg" />
      </div>

      <Link href="/map">
        <Button className="h-12 w-full text-base">
          <MapPin className="size-5" />
          Utforska karta
        </Button>
      </Link>

      <div>
        <div className="space-y-3">
          {nearby.map((trail) => (
            <TrailCard key={trail.id} trail={trail} />
          ))}
        </div>
      </div>
      <Navbar />
    </section>
  );
}