import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback } from "react";
import { verify } from '@noble/ed25519';

export function SignMessage(){
    const { publicKey, signMessage } = useWallet()

    const onClick = useCallback(async()=>{
        try{
            if(!publicKey) throw new Error('error wallet not connected');
            if(!signMessage) throw new Error('wallet does not support message sing ');
            const msg = new TextEncoder().encode("Hello from Rishav")
            const signature = await signMessage(msg)
            if (!verify(signature,msg,publicKey.toBytes())) throw new Error('Invalid signature!');
        }catch(error:any){
            console.log('error', `Sign Message failed! ${error?.message}`);

        }
    },[publicKey,signMessage]);

    return (
        <div className="flex flex-row justify-center">
            <div className="relative group items-center">
                <div className="m-1 absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 
                rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <button
                    className="group w-60 m-2 btn animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-black"
                    onClick={onClick} disabled={!publicKey}
                >
                    <div className="hidden group-disabled:block">
                        Wallet not connected
                    </div>
                    <span className="block group-disabled:hidden" > 
                        Sign Message 
                    </span>
                </button>
            </div>
        </div>
    )

}

