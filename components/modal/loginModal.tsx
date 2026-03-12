"use client";

import { useState } from "react";
import { login, updatePassword } from "@/lib/supabase/auth";
import { useModal } from "./modalProvider";

import { GlobalModal } from "./globalModal";
import { Field, FieldItem, FieldError, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onClose: () => void;
  openModal: (modal: "login" | "register" | "resetPassword") => void;
};

export function LoginModal({ open, onClose, openModal }: Props) {
  const { resetMode } = useModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (resetMode) {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const { error } = await updatePassword(password);

      if (error) {
        setError(error.message);
        return;
      }

      onClose();
      openModal("login");
      return;
    }

    const { error } = await login(email, password);

    if (error) {
      setError(error.message);
      return;
    }

    onClose();
  };

  return (
    <GlobalModal open={open} onClose={onClose}>
      <div className="flex flex-col gap-6">

        <h2 className="text-lg font-semibold">
          {resetMode ? "Set new password" : "Login"}
        </h2>

        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">

            {!resetMode && (
              <Field name="email">
                <FieldItem>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <FieldError />
                </FieldItem>
              </Field>
            )}

            <Field name="password">
              <FieldItem>
                <FieldLabel>
                  {resetMode ? "New password" : "Password"}
                </FieldLabel>
                <Input
                  type="password"
                  placeholder={resetMode ? "New password" : "Password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <FieldError />
              </FieldItem>
            </Field>

            {resetMode && (
              <Field name="confirmPassword">
                <FieldItem>
                  <FieldLabel>Confirm password</FieldLabel>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    required
                  />
                  <FieldError />
                </FieldItem>
              </Field>
            )}

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <Button type="submit">
              {resetMode ? "Update password" : "Login"}
            </Button>

          </div>
        </Form>

        {!resetMode && (
          <>
            <p className="text-sm text-center">
              Don't have an account?{" "}
              <button
                onClick={() => openModal("register")}
                className="underline"
              >
                Register
              </button>
            </p>

            <p className="text-sm text-center">
              Forgotten your password?{" "}
              <button
                onClick={() => openModal("resetPassword")}
                className="underline"
              >
                Reset password
              </button>
            </p>
          </>
        )}

      </div>
    </GlobalModal>
  );
}