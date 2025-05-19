// Get the server URL from environment variables or use a default
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001';

// Debug helper to convert API calls to curl commands
const toCurl = (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  let curlCommand = `curl -X ${options.method || 'GET'} '${url}'`;

  // Add headers
  Object.entries(headers).forEach(([key, value]) => {
    curlCommand += ` \\\n  -H '${key}: ${value}'`;
  });

  // Add body for non-GET requests
  if (options.body && options.method !== 'GET') {
    if (options.body instanceof FormData) {
      // For FormData, we need to handle each field
      const file = options.body.get('file');
      if (file) {
        curlCommand += ` \\\n  -F 'file=@${file.name}'`;
      }
    } else {
      curlCommand += ` \\\n  -d '${typeof options.body === 'string' ? options.body : JSON.stringify(options.body)}'`;
    }
  }

  return curlCommand;
};

export const apiFetch = async (endpoint, options = {}) => {
  console.log('Fetching from:', `${BASE_URL}${endpoint}`);
  
  // Log curl command for debugging
  console.log('Debug - Equivalent curl command:');
  console.log(toCurl(endpoint, options));
  
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: options.body instanceof FormData 
      ? {} // Don't set Content-Type for FormData
      : {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `API call failed: ${response.statusText}`);
  }

  return response;
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
  try {
    // Convert Uint8Array to hex string if needed
    const walletAddress = walletId?.data ? 
      '0x' + Array.from(walletId.data)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('') : 
      walletId;

    console.log('API: Fetching user for wallet:', walletAddress);
    const response = await apiFetch(`${USER_API_URL}/wallet/${walletAddress}`);
    console.log('API: Received response:', response);
    
    // Parse the response data
    const data = await response.json();
    console.log('API: Parsed response data:', data);
    
    return data;
  } catch (error) {
    console.error('API: Error fetching user by wallet ID:', error);
    throw error;
  }
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
  // If campaignData is FormData (contains file), don't stringify
  if (campaignData instanceof FormData) {
    return await apiFetch(CAMPAIGN_API_URL, {
      method: 'POST',
      body: campaignData, // FormData will automatically set the correct Content-Type
    });
  }
  
  // For regular JSON data
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

export const getInvitedCampaigns = async (walletId) => {
  return await apiFetch(`${CAMPAIGN_API_URL}/invited/${walletId}`);
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

export async function applyToCampaign(campaignId, userId) {
  const res = await apiFetch(`${CAMPAIGN_API_URL}/${campaignId}/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  return res.json();
}

export const updateCampaign = async (campaignId, updateData) => {
  try {
    // Validate required fields
    const requiredFields = ['name', 'flightStart', 'flightEnd', 'description', 'kolType', 'businessCategory', 'productService', 'budget'];
    const missingFields = requiredFields.filter(field => !updateData[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Format dates if they exist
    if (updateData.flightStart) {
      updateData.flightStart = new Date(updateData.flightStart).toISOString();
    }
    if (updateData.flightEnd) {
      updateData.flightEnd = new Date(updateData.flightEnd).toISOString();
    }
    
    // For regular JSON data
    return await apiFetch(`${CAMPAIGN_API_URL}/${campaignId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
  } catch (error) {
    console.error('Error updating campaign:', error);
    throw new Error(error.message || 'Failed to update campaign');
  }
};

export const updateCampaignIcon = async (campaignId, file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        console.log('Uploading to:', `${BASE_URL}/api/campaigns/${campaignId}/icon`);
        
        const response = await fetch(`${BASE_URL}/api/campaigns/${campaignId}/icon`, {
            method: 'PUT',
            body: formData,
            // Add credentials if needed
            credentials: 'include',
            // Add timeout
            signal: AbortSignal.timeout(30000) // 30 second timeout
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || `Failed to update campaign icon: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating campaign icon:', error);
        if (error.name === 'AbortError') {
            throw new Error('Request timed out. Please try again.');
        }
        if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
            throw new Error('Unable to connect to the server. Please check your internet connection and try again.');
        }
        throw error;
    }
};

// Debug helper for updating campaign
export const debugUpdateCampaign = (campaignId) => {
  const testUpdate = {
    name: "Updated Summer Fashion Launch",
    flightStart: new Date().toISOString().split('T')[0],
    flightEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: "Updated description to inspire customers to embrace the summer spirit.",
    kolType: "Fashion Influencers",
    businessCategory: "apparel",
    productService: "Product",
    budget: 6000
  };

  console.log('Debug - Test Campaign Update:');
  console.log(toCurl(`/api/campaigns/${campaignId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: testUpdate
  }));
};

// Debug helper for updating campaign icon
export const debugUpdateCampaignIcon = (campaignId) => {
  console.log('Debug - Test Campaign Icon Update:');
  console.log(toCurl(`/api/campaigns/${campaignId}/icon`, {
    method: 'PUT',
    body: 'FormData with icon file'
  }));
};

// Debug helper to test campaign creation
export const debugCampaignCreation = () => {
  const testCampaign = {
    name: "Summer Fashion Launch",
    flightStart: new Date().toISOString().split('T')[0],
    flightEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
    description: "is to inspire customers to embrace the summer spirit and express their unique style through our fashionable offerings.",
    kolType: "Fashion Influencers",
    businessCategory: "apparel",
    productService: "Product",
    budget: 5000
  };

  console.log('Debug - Test Campaign Creation:');
  console.log(toCurl('/api/campaigns', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: testCampaign
  }));
};




