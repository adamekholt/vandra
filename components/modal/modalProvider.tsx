"use client";

import { createContext, useContext, useState } from "react";
import { LoginModal } from "./loginModal";
import { RegisterModal } from "./registerModal";
import { TrailModal } from "./trailModal";

type ModalType = "login" | "register" | "trail" | null;

type Trail = {
  id: string;
  title: string;
  description?: string;
};

type ModalContextType = {
  openModal: (modal: ModalType) => void;
  openTrailModal: (trail: Trail) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalType>(null);
  const [trail, setTrail] = useState<Trail | null>(null);

  const openModal = (modal: ModalType) => {
    setTrail(null);
    setModal(modal);
  };

  const openTrailModal = (trail: Trail) => {
    setTrail(trail);
    setModal("trail");
  };

  const closeModal = () => {
    setModal(null);
    setTrail(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, openTrailModal, closeModal }}>
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