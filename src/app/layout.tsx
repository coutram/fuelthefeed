"use client"

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./Providers"; // your client component
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Link from "next/link";
import TopBar from "./components/TopBar"; // Import the new TopBar component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <TopBar />
          <div className="h-24" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
