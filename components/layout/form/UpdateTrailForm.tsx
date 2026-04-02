"use client";

import { useEffect, useState } from "react";
import { useTrail } from "@/hooks/useTrailById";
import { useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldItem,
  FieldError,
} from "@/components/ui/field";

export default function UpdateTrailForm({ id }: { id: string }) {
  const { trail, loading } = useTrail(id);
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    region: "",
    description: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (trail) {
      setForm({
        name: trail.name ?? "",
        region: trail.region ?? "",
        description: trail.description ?? "",
      });
    }
  }, [trail]);

  if (loading) return <p>Laddar...</p>;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.region || !form.description) {
      setError("Fyll i alla fält");
      return;
    }

    try {
      setSaving(true);

      const res = await fetch(`/api/trails/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Kunde inte uppdatera");
      }

      router.push("/trails");

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Något gick fel");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <Form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">

          <Field name="name">
            <FieldLabel> Namn{trail?.name && `(${trail.name})`}</FieldLabel>
            <FieldItem>
              <Input
                placeholder="Namn"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
              <FieldError />
            </FieldItem>
          </Field>

          <Field name="region">
            <FieldLabel> Län{trail?.region && `(${trail.region})`}</FieldLabel>
            <FieldItem>
              <Input
                placeholder="Län"
                value={form.region}
                onChange={(e) =>
                  setForm({ ...form, region: e.target.value })
                }
                required
              />
              <FieldError />
            </FieldItem>
          </Field>

          <Field name="description">
            <FieldLabel>Beskrivning</FieldLabel>
            <FieldItem>
              <Textarea
                placeholder="Beskrivning"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                required
              />
              <FieldError />
            </FieldItem>
          </Field>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Button type="submit" disabled={saving}>
            {saving ? "Sparar..." : "Spara"}
          </Button>

        </div>
      </Form>
    </div>
  );
}