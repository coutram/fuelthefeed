// hooks/useWalletWithRetry.ts
import { useState, useEffect } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react'; // Adjust the import based on your library
import { setAccount } from '../utils/accountManager';

const MAX_RETRIES = 5; // Maximum number of retry attempts
const RETRY_DELAY = 2000; // Delay between retries in milliseconds

export const useWalletWithRetry = () => {
  const { connect, connected, account, disconnect } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Attempt to connect wallet on mount if not already connected
    if (!connected && !isConnecting) {
      retryConnect();
    }
  }, []);

  const retryConnect = async () => {
    setIsConnecting(true);
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        console.log(`Attempting to connect wallet (attempt ${attempt + 1}/${MAX_RETRIES})`);
        await connect();
        if (connected && account?.address) {
          console.log('Wallet connected successfully:', account.address);
          setAccount(account.address);
          setIsConnecting(false);
          return account;
        }
      } catch (error) {
        console.error(`Error connecting to wallet (attempt ${attempt + 1}):`, error);
      }
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
    setIsConnecting(false);
    return null;
  };

  return { retryConnect, isConnecting, connected, account, disconnect };
};