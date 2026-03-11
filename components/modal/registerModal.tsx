"use client";

import { GlobalModal } from "./globalModal";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldItem, FieldLabel, FieldError} from "@/components/ui/field";

type Props = {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
};

export function RegisterModal({ open, onClose, onLogin }: Props) {
  return (
    <GlobalModal open={open} onClose={onClose}>

      <div className="flex flex-col gap-6">

        <h2 className="text-lg font-semibold">
          Create account
        </h2>

        <Form>
          <div className="flex flex-col gap-4">
            <Field name="firstName">
              <FieldItem>
                <FieldLabel>First name</FieldLabel>
                <Input placeholder="First name" required />
                <FieldError />
              </FieldItem>
            </Field>

            <Field name="lastName">
              <FieldItem>
                <FieldLabel>Last name</FieldLabel>
                <Input placeholder="Last name" required />
                <FieldError />
              </FieldItem>
            </Field>

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
                <FieldError />
              </FieldItem>
            </Field>

            <Button type="submit">Register</Button>

          </div>
        </Form>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <button
            onClick={onLogin}
            className="underline"
          >
            Login
          </button>
        </p>

      </div>

    </GlobalModal>
  );
}