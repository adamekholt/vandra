"use client";

import Link from "next/link";
import { useModal } from "@/components/modal/modalProvider";

export function Navbar() {
  const { openModal } = useModal();

  return (
    <nav className="flex items-center justify-between px-6 h-14 border-b">

      <Link href="/">Logo</Link>

      <div className="flex gap-6 items-center">
        <Link href="/discover">Discover</Link>
        <Link href="/map">Map</Link>

        <button
          onClick={() => openModal("login")}
          className="font-medium"
        >Login</button>

      </div>

    </nav>
  );
}