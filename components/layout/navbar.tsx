"use client";

import Link from "next/link";
import { logout } from "@/lib/supabase/auth";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useModal } from "@/components/modal/modalProvider";
import { Bookmark, MapPin, Plus, User, Table2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";

export function Navbar() {
  const pathname = usePathname();
  const { openModal } = useModal();
  const { user, role, loading } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  if (loading) return null;

  const isAdmin = role === "admin";

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background px-6 py-2">
      <div className="flex items-center justify-around">

    {!isAdmin && (
      <>
        <Link href="/map" className="flex flex-col items-center gap-1">
          <div
            className={cn(
              "flex items-center justify-center rounded-full px-3 py-2",
              pathname === "/map" && "bg-secondary"
            )}
          >
            <MapPin className="size-5" />
          </div>
          <span className="text-xs">Karta</span>
        </Link>

        <Link href="/favorites" className="flex flex-col items-center gap-1">
          <div
            className={cn(
              "flex items-center justify-center rounded-full px-3 py-2",
              pathname === "/favorites" && "bg-secondary"
            )}
          >
            <Bookmark className="size-5" />
          </div>
          <span className="text-xs">Sparade</span>
        </Link>
      </>
    )}

        {isAdmin && (
          <>
            <Link href="/trails" className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "flex items-center justify-center rounded-full px-3 py-2",
                  pathname === "/trails" && "bg-secondary"
                )}
              >
                <Table2 className="size-5" />
              </div>
              <span className="text-xs">Databas</span>
            </Link>

          <Link href="/trails/new" className="flex flex-col items-center gap-1">
            <div
              className={cn(
                "flex items-center justify-center rounded-full px-3 py-2",
                pathname === "/trails/new" && "bg-secondary"
              )}
            >
              <Plus className="size-5" />
            </div>
            <span className="text-xs">Ny led</span>
          </Link>
        </>
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
