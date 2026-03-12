"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { logout } from "@/lib/supabase/auth";
import { useModal } from "@/components/modal/modalProvider";

import { Button } from "@/components/ui/button";

const supabase = createClient();

export function Navbar() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
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
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <nav className="flex items-center justify-between px-6 h-14 border-b">

      <Link href="/" className="font-semibold">
        Logo
      </Link>

      <div className="flex items-center gap-6">

        {/* ADMIN NAVBAR */}
        {isAdminRoute ? (
          <>
            <Link href="/admin/table">Table</Link>

            {user && (
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </>
        ) : (
          <>
            <Link href="/discover">Discover</Link>
            <Link href="/map">Map</Link>
            <Link href="/saved">Saved trails</Link>

            {user ? (
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button onClick={() => openModal("login")}>
                Login
              </Button>
            )}
          </>
        )}

      </div>

    </nav>
  );
}
