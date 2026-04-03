"use client";

import { useParams } from "next/navigation";
import UpdateTrailForm from "../layout/form/UpdateTrailForm";

export default function EditTrail() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="space-y-4">
      <div className="mb-6 mt-6">
        <h1 className="text-3xl font-heading">Uppdatera led</h1>
      </div>
      <UpdateTrailForm id={id} />
    </div>
  )
}