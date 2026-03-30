"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

type Props = {
  view: "map" | "list";
  setView: (view: "map" | "list") => void;
};


export function MapHeader({ view, setView }: Props) {
    const router = useRouter();  
    return (
        <div className="absolute top-0 left-0 right-0 z-[1000] flex items-center justify-between px-4 p-4" style={{ background: "var(--gradient-header)" }}>
            <Button variant={"link"} onClick={() => router.back()} className="rounded-full bg-background/90 backdrop-blur p-4 shadow-md">
                <ArrowLeft className="size-5" />
            </Button>

            <Tabs
                value={view}
                onValueChange={(v) => {
                if (v === "map" || v === "list") {
                    setView(v);
                }
                }}
            >
                <TabsList className="flex items-center gap-1 rounded-full bg-background/90 backdrop-blur p-1 shadow-md">
                <TabsTrigger
                    value="map"
                    className={cn(
                        "px-4 py-2 rounded-full text-sm transition",
                        view === "map"
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground"
                    )}
                >Kartvy
                </TabsTrigger>

                <TabsTrigger
                    value="list"
                    className={cn(
                        "px-4 py-2 rounded-full text-sm transition",
                        view === "list"
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground"
                    )}
                >
                    Lista
                </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    );
}