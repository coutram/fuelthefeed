'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getCampaignById, generateCampaignBrief, approveCampaignBrief } from '../../api';
import LoadingSpinner from '../../components/LoadingSpinner.js';

export default function CampaignDetails() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatingBrief, setGeneratingBrief] = useState(false);
  const [activeTab, setActiveTab] = useState('details'); // 'details', 'brief', 'recruit'
  const [error, setError] = useState(null);
  const [briefStatus, setBriefStatus] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [twitterPost, setTwitterPost] = useState('');
  const [notification, setNotification] = useState('');
  const [regenerating, setRegenerating] = useState(false);
  const [approving, setApproving] = useState(false);
  const [copying, setCopying] = useState(false);
  const [campaignStatus, setCampaignStatus] = useState('');
  const [recruitOption, setRecruitOption] = useState(null);
  const [emailList, setEmailList] = useState([]);
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    fetchCampaignDetails();
  }, [id]);

  const fetchCampaignDetails = async () => {
    try {
      const data = await getCampaignById(id);
      setCampaign(data);
      setBriefStatus(data.campaignBrief ? 'completed' : 'not_generated');
      setIsApproved(data.briefApproved || false);

      // Set campaign status
      setCampaignStatus(getCampaignStatus(data.flightStart, data.flightEnd));

      // When you generate the brief:
      setTwitterPost(generateTwitterPost(data));
    } catch (error) {
      console.error('Error fetching campaign:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateBrief = async () => {
    setGeneratingBrief(true);
    setError(null);
    setBriefStatus('generating');
    setIsApproved(false);
    setTwitterPost('');
    
    try {
      console.log('Generating brief for campaign:', id);
      const response = await generateCampaignBrief(id);
      console.log('Brief generation response:', response);
      if (response.campaignBrief) {
        setCampaign(response);
        setBriefStatus('completed');
        const generatedPost = generateTwitterPost(response);
        setTwitterPost(generatedPost);
      }
    } catch (error) {
      console.error('Error generating brief:', error);
      setError(error.message);
      setBriefStatus('error');
    } finally {
      setGeneratingBrief(false);
    }
  };

  const generateTwitterPost = (campaign) => {
    return `🎯 Looking for creators for our ${campaign.name} campaign!

💰 Budget: $${campaign.budget.toLocaleString()}
📅 Flight: ${new Date(campaign.flightStart).toLocaleDateString()} - ${new Date(campaign.flightEnd).toLocaleDateString()}
🎯 Type: ${campaign.kolType}

${campaign.description.substring(0, 100)}...

DM to apply! #CreatorEconomy #InfluencerMarketing`;
  };

  const handleRegenerateBrief = async () => {
    setRegenerating(true);
    setNotification('Regenerating brief...');
    try {
      const response = await generateCampaignBrief(id);
      if (response.campaignBrief) {
        setCampaign(response);
        setBriefStatus('completed');
        setTwitterPost(generateTwitterPost(response));
        setIsApproved(false);
        setNotification('Brief regenerated!');
      }
    } catch (error) {
      setError(error.message);
      setNotification('Failed to regenerate brief.');
    } finally {
      setRegenerating(false);
      setTimeout(() => setNotification(''), 2000);
    }
  };

  const handleApproveBrief = async () => {
    setApproving(true);
    setNotification('Approving brief...');
    try {
      const response = await approveCampaignBrief(id);
      if (response.briefApproved) {
        setIsApproved(true);
        setCampaign(response);
        setNotification('Brief approved!');
      }
    } catch (error) {
      console.error('Error approving brief:', error);
      setError(error.message);
      setNotification('Failed to approve brief.');
    } finally {
      setApproving(false);
      setTimeout(() => setNotification(''), 2000);
    }
  };

  const formatBriefForEmail = (campaign) => {
    return `
Campaign: ${campaign.name}
Flight Period: ${new Date(campaign.flightStart).toLocaleDateString()} - ${new Date(campaign.flightEnd).toLocaleDateString()}

${campaign.campaignBrief}

Campaign Details:
- Business Category: ${campaign.businessCategory}
- Product/Service: ${campaign.productService}
- Budget: $${campaign.budget.toLocaleString()}
- Type of KOLs: ${campaign.kolType}

For more information or to apply, please contact us.
    `.trim();
  };

  const handleCopy = (text) => {
    setCopying(true);
    setNotification('Copied to clipboard!');
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      setCopying(false);
      setNotification('');
    }, 1500);
  };

  function getCampaignStatus(flightStart, flightEnd) {
    const now = new Date();
    const start = new Date(flightStart);
    const end = new Date(flightEnd);

    if (now < start) return 'recruiting';
    if (now >= start && now <= end) return 'active';
    return 'ended';
  }

  const handleAddEmail = () => {
    if (emailInput && /\S+@\S+\.\S+/.test(emailInput)) {
      setEmailList([...emailList, emailInput]);
      setEmailInput('');
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-12">
      <LoadingSpinner size={40} />
      <span className="mt-4 text-gray-500">Loading campaign details...</span>
    </div>
  );
  if (error) return <div>Error: {error}</div>;
  if (!campaign) return <div>Campaign not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded shadow">
          {notification}
        </div>
      )}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{campaign.name}</h1>
        <nav className="relative flex space-x-8 border-b border-gray-200 mb-8">
          {[
            { key: 'details', label: 'Campaign Details' },
            { key: 'brief', label: 'Campaign Brief' },
            { key: 'recruit', label: 'Recruit Creators' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                pb-3 px-2 font-semibold transition
                ${activeTab === tab.key
                  ? 'text-pink-600 border-b-2 border-pink-500'
                  : 'text-gray-500 hover:text-pink-500'}
              `}
              style={{
                borderColor: activeTab === tab.key ? '#ec4899' : 'transparent',
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'details' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Campaign Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Flight Period</p>
              <p>{new Date(campaign.flightStart).toLocaleDateString()} - {new Date(campaign.flightEnd).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-semibold">Budget</p>
              <p>${campaign.budget.toLocaleString()}</p>
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
            <div>
              <p className="font-semibold">Status</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  campaignStatus === 'active'
                    ? 'bg-green-100 text-green-800'
                    : campaignStatus === 'recruiting'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {campaignStatus.charAt(0).toUpperCase() + campaignStatus.slice(1)}
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'brief' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Campaign Brief</h2>
            <div className="flex space-x-4">
              {campaign.campaignBrief && (
                <>
                  <button
                    onClick={handleRegenerateBrief}
                    disabled={regenerating}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-400"
                  >
                    {regenerating ? 'Regenerating...' : 'Regenerate Brief'}
                  </button>
                  <button
                    onClick={handleApproveBrief}
                    disabled={approving || isApproved}
                    className={`px-4 py-2 ${
                      isApproved 
                        ? 'bg-green-500 cursor-not-allowed' 
                        : 'bg-blue-500 hover:bg-blue-600'
                    } text-white rounded`}
                  >
                    {approving ? 'Approving...' : isApproved ? '✓ Approved' : 'Approve Brief'}
                  </button>
                  <button
                    onClick={() => handleCopy(formatBriefForEmail(campaign))}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    disabled={copying}
                  >
                    {copying ? 'Copying...' : 'Copy Brief'}
                  </button>
                </>
              )}
              {!campaign.campaignBrief && (
                <button
                  onClick={handleGenerateBrief}
                  disabled={generatingBrief}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400 flex items-center"
                >
                  {generatingBrief ? (
                    <>
                      <LoadingSpinner size={20} />
                      <span className="ml-2">Generating...</span>
                    </>
                  ) : (
                    'Generate Brief'
                  )}
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="font-bold">Error:</p>
              <p>{error}</p>
            </div>
          )}

          {briefStatus === 'generating' && (
            <div className="mb-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
              <p>Generating campaign brief...</p>
            </div>
          )}

          {campaign.campaignBrief ? (
            <div className="space-y-6">
              {isApproved && (
                <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                  ✓ Brief approved and ready to share
                </div>
              )}

              <div className="prose max-w-none bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{campaign.name}</h3>
                <div className="space-y-4">
                  {campaign.campaignBrief.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700">{paragraph}</p>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold mb-2">Campaign Details:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Business Category: {campaign.businessCategory}</li>
                    <li>Product/Service: {campaign.productService}</li>
                    <li>Budget: ${campaign.budget.toLocaleString()}</li>
                    <li>Type of KOLs: {campaign.kolType}</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Twitter Post Preview</h3>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <pre className="bg-gray-100 rounded p-4 w-full text-sm text-gray-800 mb-4 whitespace-pre-wrap break-words">
                    {twitterPost}
                  </pre>
                  <button
                    onClick={() => navigator.clipboard.writeText(twitterPost)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Copy Twitter Post
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Email Preview</h3>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">
                    {formatBriefForEmail(campaign)}
                  </pre>
                  <button
                    onClick={() => navigator.clipboard.writeText(formatBriefForEmail(campaign))}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Copy Email
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-500">
              {briefStatus === 'error' 
                ? 'Failed to generate brief. Please try again.'
                : briefStatus === 'generating'
                ? 'Generating campaign brief...'
                : 'No brief generated yet. Click the button above to generate one.'}
            </div>
          )}
        </div>
      )}

      {activeTab === 'recruit' && (
        <div className="flex flex-col items-center">
          {!recruitOption && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
              {/* Post to Socials Option */}
              <button
                onClick={() => setRecruitOption('social')}
                className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition border-2 border-transparent hover:border-pink-400"
              >
                <img src="/twitter-x-logo.png" alt="Twitter/X" className="w-16 h-16 mb-4" />
                <span className="text-xl font-bold text-pink-600 mb-2">Post to Socials</span>
                <span className="text-gray-500 text-center">Share your campaign on Twitter/X to attract creators.</span>
              </button>
              {/* Email Creators Option */}
              <button
                onClick={() => setRecruitOption('email')}
                className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition border-2 border-transparent hover:border-blue-400"
              >
                <img src="/email-illustration.png" alt="Email" className="w-16 h-16 mb-4" />
                <span className="text-xl font-bold text-blue-600 mb-2">Email Creators</span>
                <span className="text-gray-500 text-center">Send a personalized campaign invite to selected creators.</span>
              </button>
            </div>
          )}

          {/* Socials Option Selected */}
          {recruitOption === 'social' && (
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8 mt-8 flex flex-col items-center">
              <img src="/twitter-x-logo.png" alt="Twitter/X" className="w-12 h-12 mb-4" />
              <h3 className="text-lg font-bold mb-2">Share this on Twitter/X</h3>
              <pre className="bg-gray-100 rounded p-4 w-full text-sm text-gray-800 mb-4 whitespace-pre-wrap break-words">
                {twitterPost || "No Twitter post generated yet."}
              </pre>
              <button
                onClick={() => navigator.clipboard.writeText(twitterPost)}
                className="px-6 py-2 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition"
                disabled={!twitterPost}
              >
                Copy Post
              </button>
              <button
                onClick={() => setRecruitOption(null)}
                className="mt-4 text-sm text-gray-400 hover:text-pink-500"
              >
                ← Back
              </button>
            </div>
          )}

          {/* Email Option Selected */}
          {recruitOption === 'email' && (
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8 mt-8 flex flex-col items-center">
              <img src="/email-illustration.png" alt="Email" className="w-12 h-12 mb-4" />
              <h3 className="text-lg font-bold mb-2">Invite Creators by Email</h3>
              <div className="w-full mb-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {emailList.map((email, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs flex items-center">
                      {email}
                      <button
                        type="button"
                        className="ml-2 text-blue-500 hover:text-blue-700"
                        onClick={() => setEmailList(emailList.filter((e, i) => i !== idx))}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    onKeyDown={e => (e.key === 'Enter' ? (e.preventDefault(), handleAddEmail()) : null)}
                    placeholder="Enter creator's email and press Enter"
                    className="flex-1 rounded-l-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  <button
                    type="button"
                    onClick={handleAddEmail}
                    className="rounded-r-lg bg-blue-500 text-white px-4 py-2 font-semibold hover:bg-blue-600 transition"
                  >
                    Add
                  </button>
                </div>
              </div>
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
                // onClick={sendEmails} // Implement backend later
              >
                Send Invites
              </button>
              <button
                onClick={() => setRecruitOption(null)}
                className="mt-4 text-sm text-gray-400 hover:text-blue-500"
              >
                ← Back
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
