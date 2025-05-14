// hooks/useWalletWithRetry.ts
import { useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react'; // Adjust the import based on your library

const MAX_RETRIES = 5; // Maximum number of retry attempts
const RETRY_DELAY = 2000; // Delay between retries in milliseconds

export const useWalletWithRetry = () => {
  const { connect, connected, account } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);

  const retryConnect = async () => {
    setIsConnecting(true);
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        await connect();
        if (connected) {
          return account; // Return the connected account if successful
        }
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY)); // Wait before retrying
    }
    setIsConnecting(false);
    return null; // Return null if all attempts fail
  };

  return { retryConnect, isConnecting, connected, account };
};