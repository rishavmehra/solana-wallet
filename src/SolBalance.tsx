import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useState, useEffect } from 'react';

export function SolBalance() {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState<number | null>(null);

    useEffect(() => {
        async function fetchBalance() {
            if (publicKey) {
                const balanceLamports = await connection.getBalance(publicKey);
                setBalance(balanceLamports/LAMPORTS_PER_SOL);
            }
        }
        fetchBalance();
    }, [publicKey, connection]);

    return (
        <div>
            {publicKey ? (
                <p>Balance: {balance !== null ? `${balance} SOL` : 'Loading...'}</p>
            ) : (
                <p>Please connect your wallet.</p>
            )}
        </div>
    );
}
