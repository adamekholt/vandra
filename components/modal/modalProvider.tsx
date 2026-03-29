"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

import { LoginModal } from "./loginModal";
import { RegisterModal } from "./registerModal";
import { TrailModal } from "./trailModal";
import { PasswordModal } from "./passwordModal";
import type { TrailPreview } from "@/types/trail";

type ModalType = "login" | "register" | "trail" | "resetPassword" | null;

type ModalContextType = {
  openModal: (modal: ModalType) => void;
  openTrailModal: (trail: TrailPreview) => void;
  closeModal: () => void;
  resetMode: boolean;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalType>(null);
  const [trail, setTrail] = useState<TrailPreview | null>(null);
  const [resetMode, setResetMode] = useState(false);

  const openModal = (modal: ModalType) => {
    setTrail(null);
    setModal(modal);
  };

  const openTrailModal = (trail: TrailPreview) => {
    setTrail(trail);
    setModal("trail");
  };

  const closeModal = () => {
    setModal(null);
    setTrail(null);
    setResetMode(false);
  };

  useEffect(() => {
    const supabase = createClient();

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    console.log("PASSWORD RESET CODE:", code);

    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) {
          console.error("Recovery error:", error);
          return;
        }

        console.log("Recovery session created");

        setResetMode(true);
        setModal("login");
      });
    }
  }, []);

  return (
    <ModalContext.Provider
      value={{ openModal, openTrailModal, closeModal, resetMode }}
    >
      {children}

      <LoginModal
        open={modal === "login"}
        onClose={closeModal}
        openModal={openModal}
      />

      <RegisterModal
        open={modal === "register"}
        onClose={closeModal}
        onLogin={() => openModal("login")}
      />

      <TrailModal
        open={modal === "trail"}
        onClose={closeModal}
        trail={trail}
      />

      <PasswordModal
        open={modal === "resetPassword"}
        onClose={closeModal}
        openModal={openModal}
      />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used inside ModalProvider");
  }

  return context;
}