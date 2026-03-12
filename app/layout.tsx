//denne er ikke ferdigstilt, fortsett senere. Per nå er den samme som i 
"use client";

import "leaflet/dist/leaflet.css";
import "./globals.css";

import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

import { Navbar } from "@/components/layout/navbar";
import { ModalProvider } from "@/components/modal/modalProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
    children,
    }: {
    children: React.ReactNode;
    }) {
    return (
        <html className={cn("font-sans", inter.variable)}>
            <body className="w-full min-h-screen flex flex-col">
                <ModalProvider>
                    <Navbar />
                    <main>{children}</main>
                </ModalProvider>
            </body>
        </html>
    );
}