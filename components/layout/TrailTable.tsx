"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Trail } from "@/types/trail";
import { Button } from "../ui/button";
import { Wrench } from "lucide-react";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

const supabase = createClient();

export default function AdminTrailTable() {
  const router = useRouter();

  const [trails, setTrails] = useState<Trail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const res = await fetch("/api/admin");
      const { trails } = await res.json();

      setTrails(trails);
      setLoading(false);
    }

    loadData();
  }, []);

  if (loading) return <div className="p-8">Laddar...</div>;

  return (
    <div className="p-8 space-y-4">
      <div className="mb-6 mt-6">
        <h1 className="text-3xl font-heading">Databas</h1>
      </div>
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-40">Namn</TableHead>
            <TableHead className="hidden sm:table-cell">Aktivitet</TableHead>
            <TableHead>Län</TableHead>
            <TableHead>Längd</TableHead>
            <TableHead className="hidden sm:table-cell">Beskrivning</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {trails.map((trail) => (
            <TableRow key={trail.trail_id}>
              <TableCell className="truncate">
                {trail.name}
              </TableCell>

              <TableCell className="hidden sm:table-cell truncate">
                {trail.type}
              </TableCell>

              <TableCell className="truncate">
                {trail.region}
              </TableCell>

              <TableCell className="truncate">
                {trail.length_km}
              </TableCell>

              <TableCell className="hidden sm:table-cell truncate">
                {trail.description}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="link"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/trails/${trail.trail_id}`);
                  }}
                  className="hover:bg-secondary text-accent-forground active:scale-95 transition-transform"
                >
                  <Wrench className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  );
}