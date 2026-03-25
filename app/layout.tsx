//denne er ikke ferdigstilt, fortsett senere. Per nå er den samme som i 
"use client";

import "./globals.css";
import { DM_Sans, Fraunces } from "next/font/google";
import { cn } from "@/lib/utils";

import { Navbar } from "@/components/layout/navbar";
import { ModalProvider } from "@/components/modal/modalProvider";

const fontSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-sans",
});

const fontHeading = Fraunces({
    subsets: ["latin"],
    variable: "--font-heading",
});

export default function RootLayout({
    children,
    }: {
    children: React.ReactNode;
    }) {
    return (
        <html className={cn(fontSans.variable, fontHeading.variable)}>
            <body className="w-full min-h-screen flex flex-col">
                <ModalProvider>
                    <main>{children}</main>
                    <Navbar />
                </ModalProvider>
            </body>
        </html>
    );
}