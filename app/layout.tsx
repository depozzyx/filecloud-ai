import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Gold's Yacht Filecloud",
    description:
        "Preview and share Gold's Yacht documents through secure Filecloud links.",
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
