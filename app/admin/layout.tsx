import Link from "next/link";

export default function Layout ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <nav>

            </nav>
            <main>
                {children}
            </main>
        </div>
    );
}