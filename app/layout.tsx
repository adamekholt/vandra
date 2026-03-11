//denne er ikke ferdigstilt, fortsett senere. Per nå er den samme som i 
import "leaflet/dist/leaflet.css"
import "@fortawesome/fontawesome-free/css/all.css";
import './globals.css'
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export default function RootLayout ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className={cn("font-sans", inter.variable)}>
            <body>
                <nav>

                </nav> 
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}