'use client';
import React, { useEffect, useState } from 'react';
import { Campaign } from '@/app/types/Campaign';
import { User } from '../types/User';
import LoadingSpinner from '../components/LoadingSpinner';
import { getAllCampaigns, getUserByWalletId } from '../api';
import { useRouter } from 'next/navigation';
import CreatorSubNav from './CreatorSubNav';
import CreatorProfile from './CreatorProfile';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

export default function CreatorDashboard() {
  const { account, connected } = useWallet();
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [invitedCampaigns, setInvitedCampaigns] = useState<Campaign[]>([]);
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('invitations');
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      if (connected && account?.address) {
        setLoadingUser(true);
        try {
          const userData = await getUserByWalletId(account.address);
          setUser(userData.data);
        } catch (e) {
          console.error('Error fetching user:', e);
          setUser(null);
        } finally {
          setLoadingUser(false);
        }
      } else {
        setUser(null);
        setLoadingUser(false);
      }
    }
    fetchUser();
  }, [connected, account]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // TODO: Replace with your API calls
      // const invited = await getInvitedCampaigns();
      const all = await getAllCampaigns();
      // setInvitedCampaigns(invited);
      setAllCampaigns(all);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (user && user.role !== 'creator') {
      router.replace('/dashboard');
    }
  }, [user, router]);

  const handleApply = async (campaignId: string) => {
    // TODO: Implement apply logic
    alert(`Applied to campaign ${campaignId}`);
  };

  if (loadingUser) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <LoadingSpinner size={40} />
        <span className="mt-4 text-gray-500">Loading user...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <span className="text-gray-500">No user found for this wallet.</span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f5f7fb] via-[#e3e8ee] to-[#f5f7fb] px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Creator Dashboard</h1>
        <CreatorSubNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'profile' && (
          <CreatorProfile user={user} />
        )}

        {activeTab === 'invitations' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Invitations to Campaigns</h2>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <LoadingSpinner size={40} />
                <span className="mt-4 text-gray-500">Loading invitations...</span>
              </div>
            ) : invitedCampaigns.length === 0 ? (
              <div className="text-gray-500">No invitations yet.</div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {invitedCampaigns.map((campaign) => (
                  <div key={campaign._id} className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-2">{campaign.name}</h3>
                    <p className="text-gray-600 mb-2">{campaign.description}</p>
                    <div className="text-sm text-gray-500 mb-2">
                      <span>Budget: ${campaign.budget}</span> <br />
                      <span>
                        Flight: {new Date(campaign.flightStart).toLocaleDateString()} -{' '}
                        {new Date(campaign.flightEnd).toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      className="mt-2 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
                      onClick={() => handleApply(campaign._id)}
                    >
                      Accept Invitation
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'explore' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Explore to Earn</h2>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <LoadingSpinner size={40} />
                <span className="mt-4 text-gray-500">Loading campaigns...</span>
              </div>
            ) : allCampaigns.length === 0 ? (
              <div className="text-gray-500">No campaigns available right now.</div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {allCampaigns.map((campaign) => (
                  <div key={campaign._id} className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-2">{campaign.name}</h3>
                    <p className="text-gray-600 mb-2">{campaign.description}</p>
                    <div className="text-sm text-gray-500 mb-2">
                      <span>Budget: ${campaign.budget}</span> <br />
                      <span>
                        Flight: {new Date(campaign.flightStart).toLocaleDateString()} -{' '}
                        {new Date(campaign.flightEnd).toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => handleApply(campaign._id)}
                    >
                      Apply
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

      </div>
    </main>
  );
}
