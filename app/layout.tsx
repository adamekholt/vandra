//denne er ikke ferdigstilt, fortsett senere. Per nå er den samme som i 
import "leaflet/dist/leaflet.css"
import "@fortawesome/fontawesome-free/css/all.css";
import './globals.css'

export default function RootLayout ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
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