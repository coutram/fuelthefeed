'use client';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { Network } from '@aptos-labs/ts-sdk';
import WalletConnectContent from '../components/WalletConnectContent';

export default function LoginPage() {

  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{ network: Network.TESTNET }}
      optInWallets={["Continue with Google", "Continue with Apple", "Petra"]}
      
    >
      <WalletConnectContent />
    </AptosWalletAdapterProvider>
  );
}
