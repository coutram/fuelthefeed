'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function CreatorSocials() {
  const [twitter, setTwitter] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!twitter.match(/^@?(\w){1,15}$/)) {
      setError('Please enter a valid Twitter handle.');
      return;
    }
    // TODO: Send twitter handle to backend
    setSuccess('Twitter handle connected!');
    // Optionally, redirect to the next step/dashboard
    router.push('/creator-dashboard');
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
            className="w-full py-3 bg-pink-500 text-white rounded-lg font-semibold text-lg hover:bg-pink-600 transition"
          >
            Connect Twitter
          </button>
        </form>
      </div>
    </main>
  );
}
