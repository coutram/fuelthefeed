import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0c2937] via-[#1e3a4c] to-[#0c2937] px-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white mb-6">Join Fuel the Feed</h1>
        <Image src="/large-logo.png" alt="Fuel the Feed Logo" width={420} height={420} className="mb-6" />
        <form className="w-full flex flex-col gap-4">
          <input type="email" placeholder="Email" className="px-4 py-3 rounded-lg bg-white/80 text-[#0c2937] placeholder-gray-500 focus:outline-none" />
          <input type="password" placeholder="Password" className="px-4 py-3 rounded-lg bg-white/80 text-[#0c2937] placeholder-gray-500 focus:outline-none" />
          <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-lg transition">Sign Up / Log In</button>
        </form>
        <p className="text-white/80 mt-4 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-pink-300 hover:underline">Log in</Link>
        </p>
        <Link href="/" className="mt-6 text-pink-200 hover:underline text-sm">Back to Home</Link>
      </div>
    </main>
  );
} 