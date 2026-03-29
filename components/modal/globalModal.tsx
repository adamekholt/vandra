"use client";

import { useEffect } from "react";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseButton?: boolean;
};
export function GlobalModal({ open, onClose, children, showCloseButton = true }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto z-[9999]"
      onClick={onClose}
    >
      <div
        className="relative bg-card text-card-foreground rounded-2xl shadow-xl border border-border p-8 w-full max-w-[80vw] max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <Button size="icon" variant="ghost" className="absolute end-2 top-2" onClick={onClose} aria-label="Close">
            <XIcon />
          </Button>
        )}

        {children}
      </div>
    </div>
  );
}