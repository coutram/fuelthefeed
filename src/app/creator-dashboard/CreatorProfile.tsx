import React from 'react';
import { User } from '../types/User';

export default function CreatorProfile({ user }: { user: User }) {
  // Stub data for now; replace with real data as needed
  const interests = user.interests || ['Art', 'Tech', 'Music'];
  const popularTweets = user.popularTweets || [
    { id: '1', text: 'Excited to join a new campaign!', likes: 120 },
    { id: '2', text: 'Check out my latest collab!', likes: 95 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-xxl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <div className="mb-2"><span className="font-semibold">Name:</span> {user.firstName} {user.lastName}</div>
      <div className="mb-2"><span className="font-semibold">Email:</span> {user.email}</div>
      <div className="mb-2"><span className="font-semibold">Role:</span> {user.role}</div>
      <div className="mb-2"><span className="font-semibold">Twitter:</span> {user.twitterHandle || 'Not connected'}</div>
      <div className="mb-2"><span className="font-semibold">Wallet ID:</span> {user.walletId}</div>

      {/* Interests Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Your Interests</h3>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <span
              key={interest}
              className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Popular Tweets Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Most Popular Tweets</h3>
        <ul className="space-y-2">
          {popularTweets.map((tweet) => (
            <li key={tweet.id} className="bg-gray-100 rounded p-3 flex justify-between items-center">
              <span className="text-gray-800">{tweet.text}</span>
              <span className="ml-4 text-pink-600 font-semibold">♥ {tweet.likes}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function getName(user?: { firstName?: string; lastName?: string }) {
  if (!user) return '';
  return [user.firstName, user.lastName].filter(Boolean).join(' ');
}
