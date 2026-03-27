"use client";

import { useEffect, useState } from "react";

export function useUser() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();

        setUser(data.user);
        setRole(data.user?.role ?? null);
      } catch {
        setUser(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { user, role, loading };
}