import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useCallback } from "react";

export function SolAirDrop(){
    const {connection} = useConnection()
    const { publicKey  } = useWallet()


    const onClick = useCallback(async()=>{
        try {
            if (!publicKey) throw new Error("wallet not conncted")
            var signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL)
            
        } catch (error: any) {
            console.log(error);
        }
    }, [connection, publicKey])

    return(
        <div>
            <button onClick={onClick} disabled={!publicKey}>Request AirDrop</button>
        </div>
    )

}