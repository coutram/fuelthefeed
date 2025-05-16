"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./Providers"; // your client component
import TopBar from "./components/TopBar"; // Import the new TopBar component
import { AccountProvider } from './context/AccountContext';

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
        <AccountProvider>
          <Providers>
            <TopBar />
            <div className="h-24" />
            {children}
          </Providers>
        </AccountProvider>
      </body>
    </html>
  );
}
