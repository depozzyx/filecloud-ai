import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Gold's Yacht - Viewing",
    description: "See highlights from our unforgettable Gold's Yacht events",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased !bg-gray-300">{children}</body>
        </html>
    );
}
