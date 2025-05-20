"use client";
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react';
import { createUser } from '../api';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { useWalletWithRetry } from '../hooks/useWalletWithRetry';

function CreateUserForm() {
  const searchParams = useSearchParams()
  const router = useRouter();
  const { account } = useWalletWithRetry();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const walletId = searchParams.get('walletId');

  const checkConnection = async () => {
    try {
      if (!account?.address && !walletId) {
        throw new Error('No wallet address available');
      }
      setIsLoading(false);
    } catch (err: Error | unknown) {
      console.error('Connection error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, [account, walletId]);

  const retryConnect = () => {
    setIsLoading(true);
    setError(null);
    checkConnection();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      console.log('Account:', account);
      console.log('WalletId from URL:', walletId);
      
      const formData = new FormData(e.target as HTMLFormElement);
      const addressToUse = account?.address || walletId;
      
      console.log('Address to use:', addressToUse);
      console.log('Address type:', typeof addressToUse);
      console.log('Is Uint8Array:', addressToUse instanceof Uint8Array);
      console.log('Address properties:', Object.keys(addressToUse || {}));
      
      if (!addressToUse) {
        throw new Error('No wallet address available');
      }

      const userData = {
        firstName,
        lastName,
        email,
        walletId: walletId,
        role: formData.get('role'),
        interests: [], // Initialize empty interests array
        socialLinks: {
          twitter: '',
          instagram: '',
          tiktok: '',
          youtube: ''
        }
      };

      console.log('Creating user with data:', JSON.stringify(userData, null, 2));
      await createUser(userData);
      
      if (userData.role === 'creator') {
        router.push('/creator-onboarding');
      } else {
        router.push('/dashboard');
      }
    } catch (error: Error | unknown) {
      console.error('Failed to create user:', error);
      setError(error instanceof Error ? error.message : 'Failed to create user. Please try again.');
    } finally {
      setIsSubmitting(false);
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
          disabled={isSubmitting}
          className="border p-2 mb-4 w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          disabled={isSubmitting}
          className="border p-2 mb-4 w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
          className="border p-2 mb-4 w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <div>
          <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-1">
            Role
          </label>
          <select
            id="role"
            name="role"
            required
            disabled={isSubmitting}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
            defaultValue=""
          >
            <option value="" disabled>Select a role</option>
            <option value="brand">Brand</option>
            <option value="creator">Creator</option>
          </select>
          <p className="text-xs text-gray-400 mt-1">Choose whether this user is a brand or a creator.</p>
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition mt-4 w-full flex items-center justify-center ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
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
