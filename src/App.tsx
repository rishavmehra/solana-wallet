import { useMemo } from "react";
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

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import { SolBalance } from "./componets/SolBalance";
import { SolAirDrop } from "./componets/SolAirdrop";

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <>
      <div className="text-3xl font-bold underline text-center">
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={[]}>
            <WalletModalProvider>
              <WalletMultiButton />
              <WalletDisconnectButton />
              <Connect />
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </div>
    </>
  );
}

function Connect() {
  const { connected } = useWallet();
  return (
    <>
      {connected && (
        <>
          <SolBalance />
          <SolAirDrop />
        </>
      )}
    </>
  );
}

export default App;
