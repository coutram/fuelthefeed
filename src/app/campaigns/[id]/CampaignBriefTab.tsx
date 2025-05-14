import React from 'react';
import { Campaign } from '@/app/types/Campaign';

type Props = {
  campaign: Campaign;
  isApproved: boolean;
  onRegenerate: () => void;
  onApprove: () => void;
  onCopy: () => void;
  loading: boolean;
  error?: string;
};

export default function CampaignBriefTab({
  campaign,
  isApproved,
  onRegenerate,
  onApprove,
  onCopy,
  loading,
  error,
}: Props) {
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
        <div className="prose max-w-none bg-gray-50 p-6 rounded-lg whitespace-pre-wrap break-words">
          {campaign.campaignBrief}
        </div>
      ) : (
        <div className="text-gray-500">No brief generated yet.</div>
      )}
    </div>
  );
}
