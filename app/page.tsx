import { TrailCard } from "@/components/layout/TrailCard";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Link from "next/link";
import type { TrailPreview } from "@/types/trail";

export default function Page() {
//midlertidig mockdata frem til bugfix av trails routen er gjennomført
  const trails: TrailPreview[] = [
    {
      trail_id: "137c06f5-ca7d-437d-906b-52206756d30e",
      name: "Bohusleden etapp 1",
      description: "En lättillgänglig led genom skogar och sjöar nära Göteborg.",
      length_km: 15,
      type: "Vandring",
      region: "Västra Götaland",
    },
    {
      trail_id: "4c3ac9f5-7acd-4e51-bf8f-c9d8710e82cd",
      name: "Bergaklivet",
      description: "Bergaklivet är en utmärkt vandringsled för dig som söker en naturskön och varierad upplevelse på Billingens norra sluttning. Med sina historiska platser, vackra utsikter och tillgängliga terräng är det en perfekt tur för både nybörjare och erfarna vandrare.",
      length_km: 19,
      type: "Vandring",
      region: "Västra Götaland",
    },
    {
      trail_id: "d4f70e28-57ee-4cce-9022-d9a39f0fba61",
      name: "Ramlaklevrundan",
      description: "Ramlaklevrundan är en nästan 21 km lång rundslinga på Billingen i Skövde, som erbjuder en varierad vandring genom trolsk skog, blommande hagmarker och hisnande vyer. Leden går genom naturreservatet Höjentorp-Drottningkullen, förbi skogssjöar och körsbärsträd, och når den spektakulära utsiktsplatsen Ramlaklev. Härifrån har du en fantastisk utsikt över Kinnekulle, Hornborgasjön och Vallebygden. Leden avslutas i Varnhem, där du kan besöka den historiska klosterkyrkan och Kata gård.",
      length_km: 20.7,
      type: "Vandring",
      region: "Västra Götaland",
    },
    {
      trail_id: "0a6b1e68-bd24-45f3-a3ee-bd6d3e224639",
      name: "Billingeleden Etapp 1",
      description: "Etapp 1 på Billingeleden erbjuder en vacker och varierad naturupplevelse med historiska inslag (Ryds grottor & Ymsingsborg), fantastiska vyer, praktiska faciliteter och relativt lättillgänglig transport.",
      length_km: 7.5,
      type: "Vandring",
      region: "Västra Götaland",
    },
  ];

  const featured = trails[0];
  const nearby = trails.slice(1);

  return (
    <div className="flex flex-col h-screen">

    <main className="flex-1 overflow-y-auto px-4 pt-8 pb-24">
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

        <div className="mt-4 space-y-3">
          {nearby.map((trail) => (
            <TrailCard key={trail.trail_id} trail={trail} />
          ))}
        </div>
      </main>
      <Navbar />
    </div>
  );
}