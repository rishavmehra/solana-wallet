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
import { SolBalance } from "./SolBalance";
import { SolAirDrop } from "./SolAirdrop";

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
 

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]}>
        <WalletModalProvider>
          <WalletMultiButton />
          <WalletDisconnectButton />
          <Connect/>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

function Connect(){
  const {connected} = useWallet()
  return (
    <>
      {connected&&(
        <>
        <SolBalance/>
        <SolAirDrop/>
        </>
      )}
    </>
  )
}




export default App
