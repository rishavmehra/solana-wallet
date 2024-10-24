// Add these imports at the top
import { Buffer } from 'buffer';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";

// Make buffer available globally
window.Buffer = Buffer;

export function SendSol() {
    const { wallet, publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const [to, setTo] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validateAddress = (address: string): boolean => {
        try {
            new PublicKey(address);
            return true;
        } catch {
            return false;
        }
    };

    const sendSol = async () => {
        if (!wallet || !publicKey) {
            alert("Wallet not connected!");
            return;
        }

        if (!to || !amount) {
            alert("Please fill out both fields");
            return;
        }

        if (!validateAddress(to)) {
            alert("Invalid recipient address");
            return;
        }

        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        setIsLoading(true);
        try {
            const latestBlockhash = await connection.getLatestBlockhash();
            
            const transaction = new Transaction({
                feePayer: publicKey,
                ...latestBlockhash,
            });

            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(to),
                    lamports: parsedAmount * LAMPORTS_PER_SOL,
                })
            );

            const signature = await sendTransaction(transaction, connection);
            
            // Wait for confirmation
            const confirmation = await connection.confirmTransaction({
                signature,
                ...latestBlockhash
            });

            if (confirmation.value.err) {
                throw new Error("Transaction failed");
            }

            alert(`Transaction successful! Signature: ${signature}`);
            setTo("");
            setAmount("");
        } catch (error) {
            console.error("Transaction failed:", error);
            alert(error instanceof Error ? error.message : "Transaction failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col space-y-4 items-center p-4">
            <input
                id="to"
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Recipient Address"
                className="border border-gray-300 rounded px-4 py-2 w-80"
            />
            <input
                id="amount"
                type="number"
                min="0"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount in SOL"
                className="border border-gray-300 rounded px-4 py-2 w-80"
            />
            <button
                onClick={sendSol}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={!wallet || !publicKey || isLoading}
            >
                {isLoading ? "Sending..." : "Send SOL"}
            </button>
        </div>
    );
}