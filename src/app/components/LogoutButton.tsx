import Link from "next/link";
import { useWallet } from "@aptos-labs/wallet-adapter-react"; 

export default function LogoutButton() {
  const { connected, account, disconnect } = useWallet();

  return (
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
      Logout
    </button>
  </>
) : (
  <Link href="/login" className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-2 rounded-full shadow transition">
    Join Today / Login
  </Link>
)}
</div>
  );
}
