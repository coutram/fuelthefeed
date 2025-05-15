import React, { useEffect, useState } from 'react';
import { Campaign } from '@/app/types/Campaign';
// import { getCampaignById } from '../../api';
import { useParams } from 'next/navigation';

type Props = {
  campaign: Campaign;
  // twitterPost: string;
  // emailContent: string;
  isApproved: boolean;
  onRegenerate: () => void;
  onApprove: () => void;
  onCopy: () => void;
  loading: boolean;
  error?: string;
};

export default function CampaignBriefTab({
  campaign,
  // twitterPost,
  // emailContent,
  isApproved,
  onRegenerate,
  onApprove,
  onCopy,
  loading,
  error,
}: Props) {
  // const [campaignState, setCampaignState] = useState<Campaign | null>(null);
  // const [loadingState, setLoadingState] = useState(true);
  const { id } = useParams();
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Campaign Brief</h2>
        <div className="flex space-x-4">
          <button
            onClick={onRegenerate}
            disabled={loading}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-400"
          >
            {loading ? 'Regenerating...' : 'Regenerate Brief'}
          </button>
          <button
            onClick={onApprove}
            disabled={isApproved || loading}
            className={`px-4 py-2 ${
              isApproved
                ? 'bg-green-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white rounded`}
          >
            {isApproved ? '✓ Approved' : 'Approve Brief'}
          </button>
          <button
            onClick={onCopy}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Copy Brief
          </button>
        </div>
      </div>
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}
      {campaign.campaignBrief ? (
        <div className="space-y-8">
          {/* Twitter Post Preview */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Twitter Post Preview</h3>
            <div className="bg-gray-100 rounded p-4 w-full text-sm text-gray-800 mb-2 whitespace-pre-wrap break-words">
              {campaign.twitterPost}
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(campaign.twitterPost)}
              className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            >
              Copy Twitter Post
            </button>
          </div>
          {/* Email Preview */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Email Preview</h3>
            <div className="bg-gray-100 rounded p-4 w-full text-sm text-gray-800 mb-2 whitespace-pre-wrap break-words">
              {formatBriefForEmail(campaign)}
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(formatBriefForEmail(campaign))}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Copy Email
            </button>
          </div>
        </div>
      ) : (
        <div className="text-gray-500">No brief generated yet.</div>
      )}
    </div>
  );
}

// Helper function
function formatBriefForEmail(campaign) {
  return campaign.campaignBrief
    ? `Campaign: ${campaign.name}\n\n${campaign.campaignBrief}\n\nFor more info, contact us.`
    : '';
}
