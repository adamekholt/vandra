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
    <div className=" flex pointer-events-auto gap-2">
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