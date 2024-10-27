import { useMemo, useState } from "react";
import {
  ConnectionProvider,
  useWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";
import { SolBalance } from "./componets/SolBalance";
import { SolAirDrop } from "./componets/SolAirdrop";
import { SignMessage } from "./componets/SignMsg";
import { SendSol } from "./componets/SendSol";
import CreateToken from "./componets/CreateToken";

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]}>
          <WalletModalProvider>
            <nav className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 px-4 py-3 mb-8">
              <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <WalletMultiButton />
                </div>
                <WalletDisconnectButton />
              </div>
            </nav>

            <main className="container mx-auto px-4">
              <Connect />
            </main>

            <footer className="mt-16 py-6 text-center text-gray-400 text-sm">
              <p>Connected to Solana {network} Network</p>
            </footer>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

function Connect() {
  const { connected } = useWallet();

  if (!connected) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Welcome to Solana Wallet</h2>
        <p className="text-gray-400">Please connect your wallet to continue</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
          <h3 className="text-lg font-semibold mb-4">Balance</h3>
          <SolBalance />
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
          <h3 className="text-lg font-semibold mb-4">Airdrop</h3>
          <SolAirDrop />
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
          <h3 className="text-lg font-semibold mb-4">Sign Message</h3>
          <SignMessage />
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
          <h3 className="text-lg font-semibold mb-4">Send SOL</h3>
          <SendSol />
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
          <h3 className="text-lg font-semibold mb-4">Create Token</h3>
          <CreateToken/>
        </div>
      </div>
    </div>
  );
}

export default App;




//Token mint created at 21YyYiusFLsuD1WcL6TiJNmvyKvcHzjoHFb6LWa7p75K with associated token account at 62ouwW6kskrMvBemXoJJfDBWjbUmLFDsTDzNboXbA7C1