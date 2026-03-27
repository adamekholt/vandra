"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function MapHeader({ view, setView }: any) {
    const router = useRouter();  
    return (
        <div className="absolute top-0 left-0 right-0 z-[1000] flex items-center justify-between px-4 p-4" style={{ background: "var(--gradient-header)" }}>
            <button onClick={() => router.back()} className="rounded-full bg-background/90 backdrop-blur p-4 shadow-md">
                <ArrowLeft className="size-5" />
            </button>

            <div className="flex items-center gap-1 rounded-full bg-background/90 backdrop-blur p-1 shadow-md">
                <button
                    onClick={() => setView("map")}
                    className={cn(
                        "px-4 py-2 rounded-full text-sm transition",
                        view === "map"
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground"
                    )}
                >Kartvy</button>

                <button
                    onClick={() => setView("list")}
                    className={cn(
                        "px-4 py-2 rounded-lg text-sm transition",
                        view === "list"
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground"
                    )}
                >Lista</button>
            </div>
        </div>
    );
}