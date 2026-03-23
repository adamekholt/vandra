"use client";

import { useState, useEffect } from "react";
import { useMapStore } from "@/store/useMapStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function SearchInput() {
  const { setSearch, applyFilters } = useMapStore();
  const [value, setValue] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(value);
      applyFilters();
    }, 300);

    return () => clearTimeout(t);
  }, [value, setSearch, applyFilters]);

  return (
    <div className="absolute top-30 left-0 w-full z-[1000] flex justify-center px-4">
      <div className="relative w-full max-w-md">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Sök på leder..."
          className="pr-10"
        />

        {value && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setValue("");
              setSearch("");
              applyFilters();
            }}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}