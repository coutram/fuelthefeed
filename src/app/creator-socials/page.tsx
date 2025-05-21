'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { getUserByWalletId, updateUser } from '../api';

export default function CreatorSocials() {
  const [twitter, setTwitter] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { account } = useWallet();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    if (!account?.address) {
      setError('Wallet not connected');
      setIsSubmitting(false);
      return;
    }

    if (!twitter.match(/^@?(\w){1,15}$/)) {
      setError('Please enter a valid Twitter handle.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Get the user first
      const userResponse = await getUserByWalletId(account.address);
      if (!userResponse?.data?._id) {
        throw new Error('User not found');
      }

      // Update the user with Twitter handle
      await updateUser(userResponse.data._id, {
        socialLinks: {
          twitter: twitter.startsWith('@') ? twitter : '@' + twitter
        }
      });

      setSuccess('Twitter handle connected!');
      setTimeout(() => {
        router.push('/creator-dashboard');
      }, 1500);
    } catch (err: unknown) {
      console.error('Error saving Twitter handle:', err);
      setError(err instanceof Error ? err.message : 'Failed to save Twitter handle');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold mb-2 text-center">Connect Your Twitter</h1>
        <p className="text-gray-500 text-center mb-6">
          Add your Twitter handle to help brands find and verify you.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="twitter" className="block text-sm font-semibold text-gray-700 mb-1">
              Twitter Handle
            </label>
            <input
              type="text"
              id="twitter"
              name="twitter"
              value={twitter}
              onChange={e => setTwitter(e.target.value)}
              placeholder="@yourhandle"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 transition"
              required
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-400 mt-1">Example: @yourhandle</p>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
              {success}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-pink-500 text-white rounded-lg font-semibold text-lg hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Connecting...' : 'Connect Twitter'}
          </button>
        </form>
      </div>
    </main>
  );
}
