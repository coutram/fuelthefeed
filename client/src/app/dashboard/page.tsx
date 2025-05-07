'use client';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import Link from 'next/link';

interface Campaign {
  id: string;
  title: string;
  status: 'active' | 'draft' | 'completed';
  participants: number;
  budget: number;
  createdAt: string;
}

export default function DashboardPage() {
  const { account, connected } = useWallet();
  console.log(account);
  console.log(connected);

  // Mock data - replace with actual data from your backend
  const campaigns: Campaign[] = [
    {
      id: '1',
      title: 'Summer Fashion Collection',
      status: 'active',
      participants: 45,
      budget: 5000,
      createdAt: '2024-03-15',
    },
    {
      id: '2',
      title: 'Tech Gadgets Review',
      status: 'draft',
      participants: 0,
      budget: 3000,
      createdAt: '2024-03-14',
    },
  ];

  if (!connected || !account) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0c2937] via-[#1e3a4c] to-[#0c2937] px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Connect Your Wallet</h1>
          <p className="text-gray-600 mb-6">You need to connect your wallet to access the dashboard.</p>
          <Link href="/login" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition">
            Connect Wallet
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0c2937] via-[#1e3a4c] to-[#0c2937] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Your Campaigns</h1>
            <p className="text-gray-300">Manage and track your influencer campaigns</p>
          </div>
          <Link
            href="/campaigns/create"
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Campaign
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">{campaign.title}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    campaign.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : campaign.status === 'draft'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {campaign.status}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Participants</span>
                  <span className="font-medium text-gray-900">{campaign.participants}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Budget</span>
                  <span className="font-medium text-gray-900">${campaign.budget}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Created</span>
                  <span className="font-medium text-gray-900">
                    {new Date(campaign.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Link
                  href={`/campaigns/${campaign.id}`}
                  className="text-pink-500 hover:text-pink-600 font-medium"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {campaigns.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Campaigns Yet</h3>
              <p className="text-gray-600 mb-6">
                Create your first campaign to start working with influencers
              </p>
              <Link
                href="/campaigns/create"
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition inline-flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Your First Campaign
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 