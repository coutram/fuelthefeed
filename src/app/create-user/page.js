"use client";
import { useSearchParams } from 'next/navigation'
import { useState } from 'react';
import { apiFetch } from '../api'; // Import the apiFetch function
import { useRouter } from 'next/navigation'; // Import useRouter
import { Suspense } from 'react';

// Create a client component that uses useSearchParams
function CreateUserForm() {
  const searchParams = useSearchParams()
  const router = useRouter(); // Initialize router here
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  // const [walletId, setWalletId] = useState(null); // State to hold walletId
  const walletId = searchParams.get('walletId')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiFetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, walletId }), // Use walletId from state
      });
      router.push('/dashboard'); // Use router to navigate after successful creation
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

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
        <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition">
          Create Account
        </button>
      </form>
    </div>
  );
}

// Loading component to show while the form is loading
function LoadingForm() {
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

// Main page component that wraps the form in Suspense
export default function CreateUserPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0c2937] via-[#1e3a4c] to-[#0c2937] px-4">
      <Suspense fallback={<LoadingForm />}>
        <CreateUserForm />
      </Suspense>
    </main>
  );
}
