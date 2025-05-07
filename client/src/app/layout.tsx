"use client"

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./Providers"; // your client component
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function TopBar() {
  const { account, connected, disconnect } = useWallet();
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-[#fdf9ef] fixed top-0 left-0 z-50 border-b border-[#1e3a4c] shadow-md">
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <Image src="/logo.png" alt="Fuel the Feed Logo" width={80} height={80} />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {connected && account ? (
          <>
            <span className="font-mono text-[#0c2937] bg-pink-100 px-4 py-2 rounded-lg text-sm">
              {account.address.toString().slice(0, 8)}...{account.address.toString().slice(-4)}
            </span>
            <button
              onClick={disconnect}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-full shadow transition"
            >
              Disconnect
            </button>
          </>
        ) : (
          <Link href="/login" className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-2 rounded-full shadow transition">
            Join Today / Login
          </Link>
        )}
      </div>
    </nav>
  );
}

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
