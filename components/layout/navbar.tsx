"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { logout } from "@/lib/supabase/auth";
import { useModal } from "@/components/modal/modalProvider";
import { Bookmark, MapPin, Plus, User } from "lucide-react";
import { cn } from "@/lib/utils";

const supabase = createClient();

export function Navbar() {
  const pathname = usePathname();
  const params = useSearchParams();
  const isAdminMode = params.get("mode") === "admin";
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
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background px-6 py-2">
      <div className="flex items-center justify-around">
        <Link href="/map" className="flex flex-col items-center gap-1">
          <div
            className={cn(
              "flex items-center justify-center rounded-full px-3 py-2",
              pathname === "/map" && !isAdminMode && "bg-secondary"
            )}
          >
            <MapPin className="size-5" />
          </div>
          <span className="text-xs">Karta</span>
        </Link>

        <Link href="/saved" className="flex flex-col items-center gap-1">
          <div
            className={cn(
              "flex items-center justify-center rounded-full px-3 py-2",
              pathname === "/saved" && !isAdminMode && "bg-secondary"
            )}
          >
            <Bookmark className="size-5" />
          </div>
          <span className="text-xs">Lagrade</span>
        </Link>

        {user && (
          <Link href="/admin/table/new" className="flex flex-col items-center gap-1">
            <div
              className={cn(
                "flex items-center justify-center rounded-full px-3 py-2",
                pathname === "/admin/table/new" && isAdminMode && "bg-secondary"
              )}
            >
              <Plus className="size-5" />
            </div>
            <span className="text-xs">Ny led</span>
          </Link>
        )}

        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center justify-center rounded-full px-3 py-2">
            <User className="size-5" />
          </div>

          {user ? (
            <button onClick={handleLogout} className="text-xs">
              Logga ut
            </button>
          ) : (
            <button onClick={() => openModal("login")} className="text-xs">
              Logga in
            </button>
          )}
        </div>

      </div>

    </nav>
  );
}
