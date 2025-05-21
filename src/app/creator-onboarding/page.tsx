'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useWalletWithRetry } from '../hooks/useWalletWithRetry';
import { getUserByWalletId, updateUser } from '../api';

const INTERESTS = [
  'Animals', 'Art', 'Books', 'Comedy', 'Comics', 'Culture', 'Software Dev',
  'Education', 'Food', 'Video Games', 'Journalism', 'Movies', 'Music',
  'Nature', 'News', 'Pets', 'Photography', 'Politics', 'Science', 'Sports',
  'Tech', 'TV', 'Writers'
];

export default function CreatorOnboarding() {
  const [selected, setSelected] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { account } = useWalletWithRetry();

  const toggleInterest = (interest: string) => {
    setSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account?.address) {
      setError('Wallet not connected');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Get the user first
      const userResponse = await getUserByWalletId(account.address);
      if (!userResponse?.data?._id) {
        throw new Error('User not found');
      }

      // Update the user with selected interests
      await updateUser(userResponse.data._id, {
        interests: selected
      });

      router.push('/creator-socials');
    } catch (err: unknown) {
      console.error('Error saving interests:', err);
      setError(err instanceof Error ? err.message : 'Failed to save interests');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-xl w-full">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 rounded-full p-4 mr-4">
            <span className="text-3xl">#</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-1">What are your interests?</h1>
            <p className="text-gray-500">We&apos;ll use this to help customize your experience.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap gap-3 mb-8">
            {INTERESTS.map((interest) => (
              <button
                type="button"
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-6 py-2 rounded-full font-medium transition
                  ${selected.includes(interest)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-blue-100'}
                `}
              >
                {interest}
              </button>
            ))}
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={selected.length === 0 || isSubmitting}
            className="w-full py-3 bg-pink-500 text-white rounded-lg font-semibold text-lg hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Continue'}
          </button>
        </form>
      </div>
    </main>
  );
}
