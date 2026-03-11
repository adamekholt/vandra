"use client";

import { GlobalModal } from "./globalModal";

type Trail = {
  id: string;
  title: string;
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
        {trail.title}
      </h2>

      {trail.description && (
        <p className="text-sm text-gray-600">
          {trail.description}
        </p>
      )}

    </GlobalModal>
  );
}