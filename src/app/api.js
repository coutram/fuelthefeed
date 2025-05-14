const BASE_URL = process.env.SERVER_URL || 'http://localhost:3001';

export const apiFetch = async (endpoint, options = {}) => {
  console.log('Fetching from:', `${BASE_URL}${endpoint}`);
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
};


// User API
const USER_API_URL = `/api/users`; // Adjust the URL as necessary

export const createUser = async (userData) => {
  return await apiFetch(USER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const getUserByWalletId = async (walletId) => {
  return await apiFetch(`${USER_API_URL}/wallet/${walletId}`);
};

export const getUserByEmail = async (email) => {
  return await apiFetch(`${USER_API_URL}/email/${email}`);
};

export const getAllUsers = async () => {
  return await apiFetch(USER_API_URL);
};

// Campaign API
const CAMPAIGN_API_URL = `/api/campaigns`; // Adjust the URL as necessary

export const createCampaign = async (campaignData) => {
  return await apiFetch(CAMPAIGN_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(campaignData),
  });
};

export const getAllCampaigns = async () => {
  return await apiFetch(CAMPAIGN_API_URL);
};

export const getCampaignById = async (id) => {
  return await apiFetch(`${CAMPAIGN_API_URL}/${id}`);
};

export const generateCampaignBrief = async (campaignId) => {
  return await apiFetch(`${CAMPAIGN_API_URL}/${campaignId}/generate-brief`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({})
  });
};

export const approveCampaignBrief = async (campaignId) => {
  return await apiFetch(`${CAMPAIGN_API_URL}/${campaignId}/approve-brief`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({})
  });
};




