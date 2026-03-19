"use client";

import { Button } from "@/components/ui/button";

export default function DrawControls({
  onReset,
  onUndo,
  hasPoints,
}: {
  onReset: () => void;
  onUndo: () => void;
  hasPoints: boolean;
}) {
  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      <Button
        onClick={onUndo}
        disabled={!hasPoints}
        variant="secondary"
      >
        Undo last
      </Button>

      <Button
        onClick={onReset}
        disabled={!hasPoints}
        variant="destructive"
      >
        Reset
      </Button>
    </div>
  );
}