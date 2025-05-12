const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001';

export const apiFetch = async (endpoint, options = {}) => {

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
