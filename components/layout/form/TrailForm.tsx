"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveTrail } from "@/lib/trails";
import { pointsToGeoJSON } from "@/lib/geo";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldItem,
  FieldError,
} from "@/components/ui/field";

type Point = {
  lat: number;
  lng: number;
};

type Props = {
  points: Point[];
  distanceKm: number;
};

export default function TrailForm({ points, distanceKm }: Props) {
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSave: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(null);

    if (points.length < 2) {
      setError("Need at least 2 points");
      return;
    }

    if (!name || !region || !description) {
      setError("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      const geo = pointsToGeoJSON(points);

      await saveTrail(
        geo,
        {
          name,
          region,
          description,
        },
        distanceKm
      );
      router.push("/trails");

      setName("");
      setRegion("");
      setDescription("");
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error saving trail");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <Form onSubmit={handleSave}>
        <div className="flex flex-col gap-4">
          <Field name="name">
            <FieldItem>
              <Input
                placeholder="Namn*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <FieldError />
            </FieldItem>
          </Field>

          <Field name="region">
            <FieldItem>
              <Input
                placeholder="Län*"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
              />
              <FieldError />
            </FieldItem>
          </Field>

          <Field name="description">
            <FieldItem>
              <Textarea
                placeholder="Beskrivning*"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <FieldError />
            </FieldItem>
          </Field>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Sparar..." : "Spara"}
          </Button>
        </div>
      </Form>
    </div>
  );
}