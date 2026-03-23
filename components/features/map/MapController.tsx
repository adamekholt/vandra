"use client";

import { useState } from "react";
import SearchInput from "./filters/SearchInput";
import FiltersPanel from "./filters/FilterPanel";

export default function MapController() {
  const [mode, setMode] = useState<"closed" | "filters" | "list">("closed");

  const isOpen = mode !== "closed";

  return (
    <div className="absolute bottom-0 left-0 w-full z-[1000]">
      <div
        className={`
          mx-auto max-w-lg
          bg-background/95 backdrop-blur
          border-t rounded-t-2xl shadow-2xl
          transition-all duration-300
          ${isOpen ? "max-h-[80vh]" : "h-20"}
        `}
      >
        {!isOpen && (
          <div className="h-full flex items-center justify-center gap-40">
            <button
              onClick={() => setMode("filters")}
              className="text-sm font-medium"
            >
              Filter
            </button>

            <button
              onClick={() => setMode("list")}
              className="text-sm font-medium"
            >
              Liste
            </button>
          </div>
        )}

        {isOpen && (
          <div className="flex flex-col h-full">
            <div className="flex justify-center py-2">
              <div className="w-10 h-1.5 bg-muted rounded-full" />
            </div>

            <div className="flex justify-between items-center px-10 pb-2">
              <span className="font-semibold">
                {mode === "filters" ? "Filter" : "Liste"}
              </span>

              <button
                onClick={() => setMode("closed")}
                className="text-sm text-muted-foreground"
              >
                Lukk
              </button>
            </div>

            <div className="px-10 pb-4 flex flex-col gap-4 flex-1 overflow-hidden">

              <div className="flex-1 overflow-y-auto">
                {mode === "filters" && <FiltersPanel />}

                {mode === "list" && (
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      Trail 1
                    </div>
                    <div className="p-3 border rounded-lg">
                      Trail 2
                    </div>
                    <div className="p-3 border rounded-lg">
                      Trail 3
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}