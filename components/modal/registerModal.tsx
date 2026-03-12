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
          Create account
        </h2>

        <Form onSubmit={handleRegister}>
          <div className="flex flex-col gap-4">

            <Field name="firstName">
              <FieldItem>
                <FieldLabel>First name</FieldLabel>
                <Input
                  placeholder="First name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <FieldError />
              </FieldItem>
            </Field>

            <Field name="lastName">
              <FieldItem>
                <FieldLabel>Last name</FieldLabel>
                <Input
                  placeholder="Last name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <FieldError />
              </FieldItem>
            </Field>

            <Field name="email">
              <FieldItem>
                <FieldLabel>Email</FieldLabel>
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
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  placeholder="Password"
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
            >Register</Button>

          </div>
        </Form>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <button onClick={onLogin} className="underline">
            Login
          </button>
        </p>

      </div>

    </GlobalModal>
  );
}