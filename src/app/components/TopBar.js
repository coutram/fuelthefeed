"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getUserByWalletId } from "@/app/api";
import { useWalletWithRetry } from "@/app/hooks/useWalletWithRetry";

function TopBar() {

  const router = useRouter();
  const { connected, account, disconnect} = useWalletWithRetry();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      if (connected && account?.address) {

        try {
          const userData = await getUserByWalletId(account.address);
          setUser(userData.data)

        } catch (e) {
          console.error('Error fetching user:', e);
          setUser(null);
        } 
      }
    }
    fetchUser();
  }, [router, connected, account]);


  const handleLogout = () => {
    disconnect();
    router.push("/");
  };
  
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-[#fdf9ef] fixed top-0 left-0 z-50 border-b border-[#1e3a4c] shadow-md">
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <Image src="/logo.png" alt="Fuel the Feed Logo" width={80} height={80} />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {account ? (
          <>
            <span className="font-mono text-[#0c2937] bg-pink-100 px-4 py-2 rounded-lg text-sm">
              {account.address.toString().slice(0, 8)}...{account.address.toString().slice(-4)}
            </span>
            <button
              onClick={handleLogout}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-full shadow transition"
            >
              Logout
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

export default TopBar;
