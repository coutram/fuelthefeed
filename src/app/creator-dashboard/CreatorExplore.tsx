import React, { useEffect, useState } from 'react';
import { Campaign } from '../types/Campaign';
import LoadingSpinner from '../components/LoadingSpinner';
import { getAllCampaigns } from '../api';
import { User } from '../types/User';

type CreatorExploreProps = {
  handleApply: (campaignId: string) => void;
  user: User;
};

export default function CreatorExplore({ handleApply, user }: CreatorExploreProps) {
  const [loading, setLoading] = useState(true);
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([]);
  const [applyStatus, setApplyStatus] = useState<{ [campaignId: string]: 'idle' | 'loading' | 'success' | 'error' | 'applied' }>({});

  useEffect(() => {
    console.log('CreatorExplore user:', user);
    if (user && user._id) {
      async function fetchCampaigns() {
        try {
          const response = await getAllCampaigns();
          console.log('Campaigns response:', response);
          const campaigns = Array.isArray(response) ? response : [];
          setAllCampaigns(campaigns);

          // Set initial applyStatus
          const status: { [id: string]: 'idle' | 'applied' } = {};
          campaigns.forEach((c) => {
            if (
              c.applicants &&
              Array.isArray(c.applicants) &&
              user &&
              c.applicants.some((id: string) => id === user._id)
            ) {
              status[c._id] = 'applied';
            }
          });
          setApplyStatus(status);
        } catch (error) {
          console.error('Error fetching campaigns:', error);
          setAllCampaigns([]);
        } finally {
          setLoading(false);
        }
      }
      console.log('Calling fetchCampaigns');
      fetchCampaigns();
    }
  }, [user]);

  const handleApplyClick = async (campaignId: string) => {
    setApplyStatus(prev => ({ ...prev, [campaignId]: 'loading' }));
    try {
      await handleApply(campaignId);
      setApplyStatus(prev => ({ ...prev, [campaignId]: 'success' }));
      // After a delay, mark as applied
      setTimeout(() => {
        setApplyStatus(prev => ({ ...prev, [campaignId]: 'applied' }));
      }, 1500);
    } catch (error) {
      console.error('Error applying to campaign:', error);
      setApplyStatus(prev => ({ ...prev, [campaignId]: 'error' }));
    }
  };

  return (
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
                className={`
                  mt-2 px-4 py-2 rounded
                  ${applyStatus[campaign._id] === 'success' || applyStatus[campaign._id] === 'applied'
                    ? 'bg-green-500 text-white cursor-not-allowed'
                    : applyStatus[campaign._id] === 'loading'
                    ? 'bg-gray-400 text-white cursor-wait'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                  }
                `}
                onClick={() => handleApplyClick(campaign._id)}
                disabled={applyStatus[campaign._id] === 'loading' || applyStatus[campaign._id] === 'success' || applyStatus[campaign._id] === 'applied'}
              >
                {applyStatus[campaign._id] === 'loading' && 'Applying...'}
                {applyStatus[campaign._id] === 'success' && 'Applied!'}
                {applyStatus[campaign._id] === 'applied' && 'Applied'}
                {applyStatus[campaign._id] === 'error' && 'Try Again'}
                {!applyStatus[campaign._id] || applyStatus[campaign._id] === 'idle' ? 'Apply' : ''}
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
