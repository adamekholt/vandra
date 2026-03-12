"use client";

import { useState } from "react";
import { resetPassword } from "@/lib/supabase/auth";
import { GlobalModal } from "./globalModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onClose: () => void;
  openModal: (modal: "login" | "register") => void;
};

export function PasswordModal({ open, onClose, openModal }: Props) {

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReset = async () => {

    const { error } = await resetPassword(email);

    if (error) {
      setError(error.message);
      return;
    }

    setSent(true);
  };

  return (
    <GlobalModal open={open} onClose={onClose}>

      <div className="flex flex-col gap-4">

        <h2 className="text-lg font-semibold">Reset password</h2>

        {!sent ? (
          <>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <Button onClick={handleReset} disabled={!email}>
              Send reset link
            </Button>
          </>
        ) : (
          <>
            <p className="text-sm text-center">
              Check your email for a password reset link.
            </p>

            <Button
              onClick={() => {
                onClose();
                openModal("login");
              }}
            >
              Back to login
            </Button>
          </>
        )}

      </div>

    </GlobalModal>
  );
}
