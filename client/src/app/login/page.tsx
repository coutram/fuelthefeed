'use client';
import { AptosWalletAdapterProvider, useWallet } from '@aptos-labs/wallet-adapter-react';
import { Network } from '@aptos-labs/ts-sdk';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{ network: Network.TESTNET }}
    >
      <WalletConnectContent />
    </AptosWalletAdapterProvider>
  );
}

function WalletConnectContent() {
  const { connect, disconnect, account, connected, wallets } = useWallet();
  const router = useRouter();

  // Redirect to dashboard when connected
  useEffect(() => {
    if (connected && account) {
      router.push('/dashboard');
    }
  }, [connected, account, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0c2937] via-[#1e3a4c] to-[#0c2937] px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Join Fuel the Feed</h1>
        <Image src="/large-logo.png" alt="Fuel the Feed Logo" width={420} height={420} className="mb-6" />
        {!connected ? (
          <div className="flex flex-col items-center">
            <h2 className="mb-4 text-xl font-bold text-gray-800">Login or Create Account</h2>
            <div className="flex flex-wrap justify-center">
              {wallets.map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => connect(wallet.name)}
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition m-2"
                >
                  Connect {wallet.name}
                </button>
              ))}
              <button
                onClick={() => connect("Petra")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition m-2"
              >
                Connect Petra Wallet
              </button>
              <button
                onClick={() => connect("Google")}
                className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-lg transition m-2 flex items-center"
              >
                <Image src="/google-logo.png" alt="Google Logo" width={20} height={20} className="mr-2" />
                Connect with Google
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-gray-800 mt-4">
              Connected as: <span className="font-mono">{account?.address.toString()}</span>
            </div>
            <button
              onClick={disconnect}
              className="mt-4 bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
            >
              Disconnect
            </button>
          </div>
        )}
        <p className="text-gray-600 mt-4 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-pink-500 hover:underline">Log in</Link>
        </p>
        <Link href="/" className="mt-6 text-pink-400 hover:underline text-sm">Back to Home</Link>
      </div>
    </main>
  );
} 