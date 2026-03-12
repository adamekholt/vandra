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

  // form state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ui state
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // check that user actually has a recovery session
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      // if no session → reset link probably invalid
      if (!data.session) {
        setError("Invalid or expired reset link.");
        return;
      }

      setReady(true);
    };

    checkSession();
  }, [supabase]);

  // submit new password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // simple validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      return;
    }
    // go back to landing page and open login modal
    router.replace("/?modal=login");
  };

  return (
    <div className="max-w-md mx-auto mt-24 px-6">
      <h1 className="text-xl font-semibold mb-6 text-center">
        Reset password
      </h1>

      {/* waiting for recovery session */}
      {!ready && !error && (
        <p className="text-center text-sm">Preparing reset...</p>
      )}

      {/* password form */}
      {ready && (
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">

            <Field name="password">
              <FieldItem>
                <FieldLabel>New password</FieldLabel>
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
                <FieldLabel>Confirm password</FieldLabel>
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
              Update password
            </Button>

          </div>
        </Form>
      )}

      {/* error fallback */}
      {error && !ready && (
        <p className="text-center text-sm text-red-500 mt-4">
          {error}
        </p>
      )}
    </div>
  );
}