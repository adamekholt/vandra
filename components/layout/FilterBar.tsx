"use client";

import type { TrailPreview } from "@/types/trail";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type LengthRange = [number, number | null] | null;

type Props = {
  trails: TrailPreview[];
  region: string | null;
  setRegion: (r: string | null) => void;
  lengthRange: LengthRange;
  setLengthRange: (l: LengthRange) => void;
  onClear?: () => void;
};

const lengthOptions: {
  label: string;
  range: [number, number | null];
}[] = [
  { label: "0–5 km", range: [0, 5] },
  { label: "5–15 km", range: [5, 15] },
  { label: "15+ km", range: [15, null] },
];

export function FilterBar({
  trails,
  region,
  setRegion,
  lengthRange,
  setLengthRange,
  onClear,
}: Props) {
  const regions = [
    ...new Set(trails.map((t) => t.region).filter(Boolean)),
  ];

  const selectedRegion = region ?? "Alle län";

  const selectedLength =
    lengthOptions.find(
      (opt) =>
        lengthRange &&
        opt.range[0] === lengthRange[0] &&
        opt.range[1] === lengthRange[1]
    )?.label ?? "Alle distanser";

  return (
    <div className="flex gap-2 items-center">
      <Select
        value={selectedRegion}
        onValueChange={(value) =>
          setRegion(value === "Alle län" ? null : value)
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Alle län" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="Alle län">Alle län</SelectItem>
          {regions.map((region) => (
            <SelectItem key={region} value={region}>
              {region}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedLength}
        onValueChange={(value) => {
          if (value === "Alle distanser") {
            setLengthRange(null);
            return;
          }

          const found = lengthOptions.find(
            (opt) => opt.label === value
          );

          if (!found) {
            setLengthRange(null);
            return;
          }

          setLengthRange(found.range);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Alle distanser" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="Alle distanser">Alle distanser</SelectItem>
          {lengthOptions.map((opt) => (
            <SelectItem key={opt.label} value={opt.label}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

    </div>
  );
}