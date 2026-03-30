"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function Header() {
  const router = useRouter();

  return (
    <div
      className="absolute top-0 left-0 right-0 z-[1000] flex items-center px-4 p-4"
      style={{ background: "var(--gradient-header)" }}
    >
      <Button
        variant="link"
        onClick={() => router.back()}
        className="rounded-full bg-background/90 backdrop-blur p-4 shadow-md"
      >
        <ArrowLeft className="size-5" />
      </Button>
    </div>
  );
}