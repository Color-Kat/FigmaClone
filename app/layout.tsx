import type { Metadata } from "next";
import localFont from "next/font/local";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { Room } from "@/app/Room";

const workSans = Work_Sans({
    subsets : ["latin"],
    variable: "--font-work-sans",
    weight  : ['400', '600', '700']
});

// const geistSans = localFont({
//     src     : "./fonts/GeistVF.woff",
//     variable: "--font-geist-sans",
//     weight  : "100 900",
// });
//
// const geistMono = localFont({
//     src     : "./fonts/GeistMonoVF.woff",
//     variable: "--font-geist-mono",
//     weight  : "100 900",
// });

export const metadata: Metadata = {
    title      : "Figma Clone",
    description: "A minimalist Figma clone using Fabric.js and Liveblocks for real-time collaboration.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${workSans.variable} bg-primary-grey-200 font-work-sans`}
        >
        <Room>
            {children}
        </Room>
        </body>
        </html>
    );
}
