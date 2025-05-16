'use client';

import { useWallet } from '@aptos-labs/wallet-adapter-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import CreateCampaignForm from '../components/CreateCampaignForm';
import { getAllCampaigns, getUserByWalletId } from '../api';
import { useRouter } from 'next/navigation';
import { Campaign } from '../types/Campaign';
import LoadingSpinner from '../components/LoadingSpinner';
import { User } from '../types/User';
import Notification from '../components/Notifications';

function getCampaignStatus(flightStart: string, flightEnd: string) {
  const now = new Date();
  const start = new Date(flightStart);
  const end = new Date(flightEnd);

  if (now < start) return 'recruiting';
  if (now >= start && now <= end) return 'active';
  return 'ended';
}

export default function DashboardPage() {
  const { account, connected } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter();
  const [notification, setNotification] = useState<string | null>(null);
  const [notificationType, setNotificationType] = useState<'success' | 'error' | 'info'>('info');

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
    async function fetchCampaigns() {
      setLoading(true);
      try {
        const data = await getAllCampaigns();
        setCampaigns(data);
      } catch (e) {
        console.error('Error fetching campaigns:', e);
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCampaigns();
  }, []);


  if (loadingUser) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <LoadingSpinner size={40} />
        <span className="mt-4 text-gray-500">Loading user...</span>
      </div>
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
          <button
            onClick={handleOpenModal}
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
          </button>
        </div>

        {loading ? (
          <div className="text-center text-white">Loading campaigns...</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <div
                key={campaign._id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{campaign.name}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      getCampaignStatus(campaign.flightStart, campaign.flightEnd) === 'active'
                        ? 'bg-green-100 text-green-800'
                        : getCampaignStatus(campaign.flightStart, campaign.flightEnd) === 'recruiting'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {getCampaignStatus(campaign.flightStart, campaign.flightEnd)}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Budget</span>
                    <span className="font-medium text-gray-900">${campaign.budget?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Created</span>
                    <span className="font-medium text-gray-900">
                      {campaign.createdAt ? new Date(campaign.createdAt).toLocaleDateString() : ''}
                    </span>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Link
                    href={`/campaigns/${campaign._id}`}
                    className="text-pink-500 hover:text-pink-600 font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {campaigns.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Campaigns Yet</h3>
              <p className="text-gray-600 mb-6">
                Create your first campaign to start working with influencers
              </p>
              <button
                onClick={handleOpenModal}
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
              </button>
            </div>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Fuel Your Feed Campaign"
        >
          <CreateCampaignForm onClose={handleCloseModal} />
        </Modal>

        {notification && (
          <Notification
            message={notification}
            type={notificationType}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </main>
  );
} 