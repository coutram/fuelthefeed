'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '../api'; 
import Image from 'next/image';
import Link from 'next/link';

function WalletConnectContent() {
  const { connect, disconnect, account, connected, wallets } = useWallet();
  const router = useRouter();
  const [loading, setLoading] = useState(false); 

  console.log(account);
  console.log(connected);

  useEffect(() => {
    const checkUser = async () => {
      if (connected && account) {
        setLoading(true);
        try {
          const user = await fetchUserByWallet(account.address);

          if (!user || Object.keys(user).length === 0) { 
            router.push(`/create-user?walletId=${account.address}`);
          } else {
            router.push('/dashboard');
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    checkUser();
  }, [connected, account, router]);

  const fetchUserByWallet = async (walletId) => {
    try {
      const response = await apiFetch(`/api/user/wallet/${walletId}`);
      console.log('Response Code:', response.status);
      return response;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0c2937] via-[#1e3a4c] to-[#0c2937] px-4">
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Join Fuel the Feed</h1>
      <Image src="/large-logo.png" alt="Fuel the Feed Logo" width={420} height={420} className="mb-6" />
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mb-2"></div>
          <p className="text-gray-600">Checking account...</p>
        </div>
      ) : !connected ? (
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
    
      <Link href="/" className="mt-6 text-pink-400 hover:underline text-sm">Back to Home</Link>
    </div>
  </main>
  );
}

export default WalletConnectContent;
