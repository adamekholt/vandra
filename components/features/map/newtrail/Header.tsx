"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  children?: ReactNode;
};

export function Header({ children }: Props) {
  const router = useRouter();

  return (
    <div className="absolute top-0 left-0 right-0 z-[1000] flex items-center justify-between px-4 p-4" style={{ background: "var(--gradient-header)" }}>
        <Button variant={"link"} onClick={() => router.back()} className="rounded-full bg-background/90 backdrop-blur p-4 shadow-md">
            <ArrowLeft className="size-5" />
        </Button>

        {children && (
            <div className="flex items-center gap-2">
              {children}
            </div>
        )}
    </div>
  );
}