import { Campaign } from '@/app/types/Campaign';
import React from 'react';

export default function CampaignDetailsTab({ campaign }: { campaign: Campaign, loading: boolean }) {
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Campaign Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Flight Period</p>
          <p>{new Date(campaign.flightStart).toLocaleDateString()} - {new Date(campaign.flightEnd).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="font-semibold">Budget</p>
          <p>${campaign.budget?.toLocaleString()}</p>
        </div>
        <div>
          <p className="font-semibold">Business Category</p>
          <p>{campaign.businessCategory}</p>
        </div>
        <div>
          <p className="font-semibold">Product/Service</p>
          <p>{campaign.productService}</p>
        </div>
        <div className="col-span-2">
          <p className="font-semibold">Description</p>
          <p>{campaign.description}</p>
        </div>
        <div className="col-span-2">
          <p className="font-semibold">Type of KOLs</p>
          <p>{campaign.kolType}</p>
        </div>
      </div>
    </div>
  );
}
