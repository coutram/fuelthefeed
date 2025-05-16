import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { getInvitedCampaigns } from '../api';
import { Campaign } from '../types/Campaign';
import { User } from '../types/User';

type CreatorInvitationsProps = {
  user: User;
  handleApply: (campaignId: string) => void;
};

function CreatorInvitations({ user, handleApply }: CreatorInvitationsProps) {

  const [loading, setLoading] = useState(true);
  const [invitedCampaigns, setInvitedCampaigns] = useState<Campaign[]>([]);
  const [applyStatus, setApplyStatus] = useState<{ [campaignId: string]: 'idle' | 'loading' | 'success' | 'error' | 'applied' }>({});

  useEffect(() => {
    async function fetchInvitedCampaigns() {
      const campaigns = await getInvitedCampaigns(user.walletId);
      setInvitedCampaigns(campaigns);
      setLoading(false);
    }
    fetchInvitedCampaigns();
  }, [user.walletId]);

  return (
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
              className={`
                mt-2 px-4 py-2 rounded
                ${applyStatus[campaign._id] === 'success' || applyStatus[campaign._id] === 'applied'
                  ? 'bg-green-500 text-white cursor-not-allowed'
                  : applyStatus[campaign._id] === 'loading'
                  ? 'bg-gray-400 text-white cursor-wait'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
                }
              `}
              onClick={() => handleApply(campaign._id)}
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
  )
}

export default CreatorInvitations;
