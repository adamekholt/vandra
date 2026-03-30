"use client";
import { useState } from "react";
import { register } from "@/lib/supabase/auth";
import { GlobalModal } from "./globalModal";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldItem, FieldLabel, FieldError } from "@/components/ui/field";

type Props = {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
};

export function RegisterModal({ open, onClose, onLogin }: Props) {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error } = await register(
      email,
      password,
      firstName,
      lastName
    );

    if (error) {
      setError(error.message);
      return;
    }

    onClose();
    onLogin();
  };

  return (
    <GlobalModal open={open} onClose={onClose}>
      <div className="flex flex-col gap-6">

        <h2 className="text-lg font-semibold">
          Skapa konto
        </h2>

        <Form onSubmit={handleRegister}>
          <div className="flex flex-col gap-4">

            <Field name="firstName">
              <FieldItem>
                <Input
                  placeholder="Förnamn"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <FieldError />
              </FieldItem>
            </Field>

            <Field name="lastName">
              <FieldItem>
                <Input
                  placeholder="Efternamn"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <FieldError />
              </FieldItem>
            </Field>

            <Field name="email">
              <FieldItem>
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FieldError />
              </FieldItem>
            </Field>

            <Field name="password">
              <FieldItem>
                <Input
                  type="password"
                  placeholder="Lösenord"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FieldError />
              </FieldItem>
            </Field>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <Button
              type="submit"
              disabled={!firstName || !lastName || !email || !password}
            >Registrera dig</Button>

          </div>
        </Form>

        <p className="text-sm text-center">
          Har du redan ett konto?{" "}
          <button onClick={onLogin} className="underline">
            Logga in
          </button>
        </p>

      </div>

    </GlobalModal>
  );
}