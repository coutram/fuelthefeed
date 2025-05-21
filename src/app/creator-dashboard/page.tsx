'use client';
import React, { useEffect, useState } from 'react';
import { Campaign } from '@/app/types/Campaign';
import { User } from '../types/User';
import LoadingSpinner from '../components/LoadingSpinner';
import { getAllCampaigns, getUserByWalletId, applyToCampaign } from '../api';
import CreatorSubNav from './CreatorSubNav';
import CreatorProfile from './CreatorProfile';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import Notification from '../components/Notifications';
import CreatorInvitations from './CreatorInvitations';
import CreatorExplore from './CreatorExplore';

export default function CreatorDashboard() {
  const { account, connected } = useWallet();
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [notification, setNotification] = useState<string | null>(null);
  const [notificationType, setNotificationType] = useState<'success' | 'error' | 'info'>('info');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [applyStatus, setApplyStatus] = useState<{ [campaignId: string]: 'idle' | 'loading' | 'success' | 'error' | 'applied' }>({});

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


  const handleApply = async (campaignId: string) => {
    if (!user?._id) {
      setNotification('User not found.');
      return;
    }
    setApplyStatus((prev) => ({ ...prev, [campaignId]: 'loading' }));
    try {
      const result = await applyToCampaign(campaignId, user._id);
      if (result.success) {
        setApplyStatus((prev) => ({ ...prev, [campaignId]: 'success' }));
        setNotification('Applied successfully!');
        setNotificationType('success');
        // Optionally, mark as 'applied' after a delay
        setTimeout(() => {
          setApplyStatus((prev) => ({ ...prev, [campaignId]: 'applied' }));
          setNotification(null);
        }, 1500);
      } else {
        setApplyStatus((prev) => ({ ...prev, [campaignId]: 'error' }));
        setNotification(result.error || 'Failed to apply.');
        setNotificationType('error');
        setTimeout(() => setNotification(null), 2000);
      }
    } catch (e) {
      console.error('Error applying to campaign:', e);
      setApplyStatus((prev) => ({ ...prev, [campaignId]: 'error' }));
      setNotification('An error occurred while applying.');
      setNotificationType('error');
      setTimeout(() => setNotification(null), 2000);
    }
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

        <div className="relative">
          {notification && (
            <Notification
              message={notification}
              type={notificationType}
              onClose={() => setNotification(null)}
            />
          )}
        </div>

        {activeTab === 'profile' && (
          <CreatorProfile user={user} />
        )}

        {activeTab === 'invitations' && (
          <CreatorInvitations user={user} handleApply={handleApply} />
        )}

        {activeTab === 'explore' && (
          <CreatorExplore handleApply={handleApply} user={user} />
        )}

      </div>
    </main>
  );
}
