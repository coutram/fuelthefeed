"use client";
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react';
import { createUser, getUserByWalletId } from '../api';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { useWalletWithRetry } from '../hooks/useWalletWithRetry';

function CreateUserForm() {
  const searchParams = useSearchParams()
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { connected, account, retryConnect } = useWalletWithRetry();
  const walletId = searchParams.get('walletId');

  // Handle wallet connection
  useEffect(() => {
    if (!connected) {
      console.log('Wallet not connected, attempting to connect...');
      retryConnect();
    }
  }, [connected, retryConnect]);

  // Fetch user data
  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      setError(null);

      try {
        // Use walletId from URL params if account address is not available
        const addressToUse = account?.address || walletId;
        
        if (!addressToUse) {
          console.log('No wallet address available');
          setIsLoading(false);
          return;
        }

        console.log('Fetching user for wallet:', addressToUse);
        const response = await getUserByWalletId(addressToUse);
        console.log('Received user data:', response);

        if (response?.status === 'success' && response?.data) {
          console.log('Setting user data:', response.data);
          setUser(response.data);
          
          // Only redirect if we have a valid user with a role
          if (response.data.role) {
            if (response.data.role === 'creator') {
              router.push('/creator-dashboard');
            } else if (response.data.role === 'brand') {
              router.push('/dashboard');
            }
          }
        } else {
          console.log('No user data found for wallet:', addressToUse);
          setUser(null);
        }
      } catch (e) {
        console.error('Error fetching user:', e);
        setError(e.message);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [router, account?.address, walletId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const addressToUse = account?.address || walletId;
      
      if (!addressToUse) {
        throw new Error('No wallet address available');
      }

      const userData = {
        firstName,
        lastName,
        email,
        walletId: addressToUse,
        role: formData.get('role'),
      };

      console.log('Creating user with data:', userData);
      await createUser(userData);
      
      if (userData.role === 'creator') {
        router.push('/creator-onboarding');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Failed to create user:', error);
      setError(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="space-y-4 w-full">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => retryConnect()} 
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Create Your Account</h1>
      <form onSubmit={handleSubmit} className="w-full">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="border p-2 mb-4 w-full"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="border p-2 mb-4 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 mb-4 w-full"
        />
        <div>
          <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-1">
            Role
          </label>
          <select
            id="role"
            name="role"
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 transition"
            defaultValue=""
          >
            <option value="" disabled>Select a role</option>
            <option value="brand">Brand</option>
            <option value="creator">Creator</option>
          </select>
          <p className="text-xs text-gray-400 mt-1">Choose whether this user is a brand or a creator.</p>
        </div>
        <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition mt-4 w-full">
          Create Account
        </button>
      </form>
    </div>
  );
}

export default function CreateUserPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0c2937] via-[#1e3a4c] to-[#0c2937] px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <CreateUserForm />
      </Suspense>
    </main>
  );
}
