"use client";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import AuthProvider  from "@/context/AuthContext/AuthProvider";
import "@/styles/globals.css";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

// This is the root layout for the entire application
// It wraps the entire application in the AuthProvider
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthProvider>
            <html lang="en">
                <head />
                <body
                    className={cn(
                      "min-h-screen bg-background font-sans antialiased",
                      fontSans.variable
                    )}
                >
                  {children}
                </body>
            </html>
        </AuthProvider>
    );
}
