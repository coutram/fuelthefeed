'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import EditCampaignForm from '../../../components/EditCampaignForm';

export default function EditCampaignPage() {
    const params = useParams();
    const campaignId = params.id;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto">
                <EditCampaignForm campaignId={campaignId} />
            </div>
        </div>
    );
} 