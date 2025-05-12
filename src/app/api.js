const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001';
console.log(BASE_URL);

export const apiFetch = async (endpoint, options = {}) => {
  console.log(`${BASE_URL}${endpoint}`);
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
