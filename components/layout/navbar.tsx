"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { logout } from "@/lib/supabase/auth";
import { useModal } from "@/components/modal/modalProvider";

export function Navbar() {

  const supabase = createClient();
  const { openModal } = useModal();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();

  }, [supabase]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <nav className="flex items-center justify-between px-6 h-14 border-b">

      <Link href="/">Logo</Link>

      <div className="flex gap-6 items-center">
        <Link href="/discover">Discover</Link>
        <Link href="/map">Map</Link>

        {user ? (
          <button
            onClick={handleLogout}
            className="font-medium"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => openModal("login")}
            className="font-medium"
          >
            Login
          </button>
        )}

      </div>

    </nav>
  );
}
