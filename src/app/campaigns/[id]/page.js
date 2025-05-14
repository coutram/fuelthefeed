'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getCampaignById, generateCampaignBrief, approveCampaignBrief } from '../../api';
import CampaignHeader from './CampaignHeader';
import CampaignSubNav from './CampaignSubNav';
import CampaignDetailsTab from './CampaignDetailsTab';
import CampaignBriefTab from './CampaignBriefTab';
import RecruitCreatorsTab from './RecruitCreatorsTab';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function CampaignDetailsPage() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');
  const [briefLoading, setBriefLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [twitterPost, setTwitterPost] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCampaign() {
      setLoading(true);
      try {
        const data = await getCampaignById(id);
        setCampaign(data);
        setIsApproved(data.briefApproved || false);
        // If you generate the twitter post from the campaign, do it here:
        setTwitterPost(data.twitterPost || '');
      } catch (e) {
        console.error('Error fetching campaign:', e);
        setError('Failed to load campaign');
      } finally {
        setLoading(false);
      }
    }
    fetchCampaign();
  }, [id]);

  // Handlers for brief actions
  const handleRegenerateBrief = async () => {
    setBriefLoading(true);
    setNotification('Regenerating brief...');
    try {
      const response = await generateCampaignBrief(id);
      setCampaign(response);
      setIsApproved(false);
      setTwitterPost(response.twitterPost || '');
      setNotification('Brief regenerated!');
    } catch (e) {
      console.error('Error regenerating brief:', e);
      setError('Failed to regenerate brief');
    } finally {
      setBriefLoading(false);
      setTimeout(() => setNotification(''), 2000);
    }
  };

  const handleApproveBrief = async () => {
    setBriefLoading(true);
    setNotification('Approving brief...');
    try {
      const response = await approveCampaignBrief(id);
      setIsApproved(true);
      setCampaign(response);
      setNotification('Brief approved!');
    } catch (e) {
      console.error('Error approving brief:', e);
      setError('Failed to approve brief');
    } finally {
      setBriefLoading(false);
      setTimeout(() => setNotification(''), 2000);
    }
  };

  const handleCopyBrief = () => {
    if (campaign?.campaignBrief) {
      navigator.clipboard.writeText(campaign.campaignBrief);
      setNotification('Brief copied!');
      setTimeout(() => setNotification(''), 1500);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <LoadingSpinner size={40} />
        <span className="mt-4 text-gray-500">Loading campaign details...</span>
      </div>
    );
  }
  if (!campaign) return <div>Campaign not found</div>;

  return (
    
    <div className="container mx-auto px-4 py-8">
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded shadow">
          {notification}
        </div>
      )}
      <CampaignHeader campaign={campaign} />
      <CampaignSubNav activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'details' && <CampaignDetailsTab campaign={campaign} loading={loading} />}
      {activeTab === 'brief' && (
        <CampaignBriefTab
          campaign={campaign}
          isApproved={isApproved}
          onRegenerate={handleRegenerateBrief}
          onApprove={handleApproveBrief}
          onCopy={handleCopyBrief}
          loading={briefLoading}
          error={error}
        />
      )}
      {activeTab === 'recruit' && (
        <RecruitCreatorsTab
          twitterPost={twitterPost}
        />
      )}
    </div>
  );
}


