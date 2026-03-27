"use client";

import { Card, CardPanel } from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import { useModal } from "@/components/modal/modalProvider";

export type Trail = {
  id: string;
  title: string;
  distance: string;
  image: string;
};

type Props = {
  trail: Trail;
  variant?: "lg" | "sm";
};

export function TrailCard({
  trail,
  variant = "sm",
}: Props) {
  const { openTrailModal } = useModal();

  const handleClick = () => {
    openTrailModal({
      trail_id: trail.id,
      name: trail.title,
      description: "",
    });
  };

  if (variant === "lg") {
    return <TrailCardLg trail={trail} onClick={handleClick} />;
  }

  return <TrailCardSm trail={trail} onClick={handleClick} />;
}

function TrailCardLg({
  trail,
  onClick,
}: {
  trail: Trail;
  onClick: () => void;
}) {
  return (
    <Card
      onClick={onClick}
      className="overflow-hidden p-0 cursor-pointer transition active:scale-[0.98]"
    >
      <div className="relative">
        <Image
          src={trail.image}
          alt={trail.title}
          width={600}
          height={400}
          className="h-64 w-full object-cover"
        />

        <div className="absolute left-1/2 top-4 w-[80%] -translate-x-1/2 rounded-full border border-white/40 bg-white/10 px-4 py-2 backdrop-blur-md">
          <div className="flex items-center justify-center gap-2 text-sm text-white">
            <Star className="size-4" />
            Turtips
          </div>
        </div>

        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="font-heading text-xl">{trail.title}</h2>
          <p className="text-sm opacity-90">{trail.distance}</p>
        </div>
      </div>
    </Card>
  );
}

function TrailCardSm({
  trail,
  onClick,
}: {
  trail: Trail;
  onClick: () => void;
}) {
  return (
    <Card
      onClick={onClick}
      className="flex-row items-stretch overflow-hidden cursor-pointer transition active:scale-[0.98] hover:opacity-90"
    >
      {/* TEXT */}
      <CardPanel className="flex flex-1 flex-col justify-center p-4">
        <p className="font-medium">
          {trail.title}
        </p>

        <p className="text-sm text-muted-foreground">
          {trail.distance}
        </p>
      </CardPanel>

      <div>
        <Image
          src={trail.image}
          alt={trail.title}
          width={80}
          height={80}
          className="object-cover"
        />
      </div>
    </Card>
  );
}