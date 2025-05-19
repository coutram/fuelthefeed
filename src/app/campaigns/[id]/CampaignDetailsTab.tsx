import { Campaign } from '@/app/types/Campaign';
import React from 'react';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? '' : date.toLocaleDateString();
};

export default function CampaignDetailsTab({ campaign }: { campaign: Campaign, loading: boolean }) {
  console.log('CampaignDetailsTab campaign prop:', campaign);
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Campaign Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Flight Period</p>
          <p>{formatDate(campaign.flightStart) || 'N/A'} - {formatDate(campaign.flightEnd) || 'N/A'}</p>
        </div>
        <div>
          <p className="font-semibold">Budget</p>
          <p>${campaign.budget ? campaign.budget.toLocaleString() : 'N/A'}</p>
        </div>
        <div>
          <p className="font-semibold">Business Category</p>
          <p>{campaign.businessCategory || 'N/A'}</p>
        </div>
        <div>
          <p className="font-semibold">Product/Service</p>
          <p>{campaign.productService || 'N/A'}</p>
        </div>
        <div className="col-span-2">
          <p className="font-semibold">Description</p>
          <p>{campaign.description || 'N/A'}</p>
        </div>
        <div className="col-span-2">
          <p className="font-semibold">Type of KOLs</p>
          <p>{campaign.kolType || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}
