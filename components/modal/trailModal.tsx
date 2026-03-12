"use client";
import { GlobalModal } from "./globalModal";

type Trail = {
  trail_id: string;
  name: string;
  description?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  trail: Trail | null;
};

export function TrailModal({ open, onClose, trail }: Props) {
  if (!trail) return null;

  return (
    <GlobalModal open={open} onClose={onClose}>

      <h2 className="text-lg font-semibold mb-2">
        {trail.name}
      </h2>

      {trail.description && (
        <p className="text-sm text-muted-foreground">
          {trail.description}
        </p>
      )}

    </GlobalModal>
  );
}