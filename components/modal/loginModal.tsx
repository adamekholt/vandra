"use client";

import { GlobalModal } from "./globalModal";
import { Field, FieldItem, FieldError, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onClose: () => void;
  openModal: (modal: "login" | "register") => void;
};

export function LoginModal({ open, onClose, openModal }: Props) {
  return (
    <GlobalModal open={open} onClose={onClose}>
      <div className="flex flex-col gap-6">

        <h2 className="text-lg font-semibold">Login</h2>

        <Form>
          <div className="flex flex-col gap-4">
            <Field name="email">
              <FieldItem>
                <FieldLabel>Email</FieldLabel>
                <Input type="email" placeholder="Email" />
                <FieldError />
              </FieldItem>
            </Field>
            <Field name="password">
              <FieldItem>
                <FieldLabel>Password</FieldLabel>
                <Input type="password" placeholder="Password" />
                <FieldError/>
              </FieldItem>
            </Field>
            <Button type="submit">Login</Button>
          </div>
        </Form>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <button onClick={() => openModal("register")} className="underline">Register</button>
        </p>

      </div>
    </GlobalModal>
  );
}