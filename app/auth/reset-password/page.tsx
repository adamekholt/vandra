"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { Field, FieldItem, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const supabase = createClient();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        setError("Invalid or expired reset link.");
        return;
      }

      setReady(true);
    };

    checkSession();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      return;
    }
    router.replace("/?modal=login");
  };

  return (
    <div className="max-w-md mx-auto mt-24 px-6">
      <h1 className="text-xl font-semibold mb-6 text-center">
        Återställ lösenord
      </h1>

      {!ready && !error && (
        <p className="text-center text-sm">Förbereder återställning...</p>
      )}

      {ready && (
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">

            <Field name="password">
              <FieldItem>
                <FieldLabel>Nytt lösenord</FieldLabel>
                <Input
                  type="password"
                  placeholder="New password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FieldError />
              </FieldItem>
            </Field>

            <Field name="confirmPassword">
              <FieldItem>
                <FieldLabel>Bekräfta lösenord</FieldLabel>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <FieldError />
              </FieldItem>
            </Field>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <Button type="submit">
              Uppdatera lösenord
            </Button>

          </div>
        </Form>
      )}

      {error && !ready && (
        <p className="text-center text-sm text-red-500 mt-4">
          {error}
        </p>
      )}
    </div>
  );
}