import { erc20ABI } from "wagmi";
import { CHAIN_TOKENS } from "../data/tokens";

const { Framework } = require("@superfluid-finance/sdk-core")

export default async function superToken(token, chainId, provider){
    const sf = await Framework.create({
        chainId,
        provider
    });

    return await sf.loadSuperToken(token);
}

export async function swapForSuperToken(fromToken, toToken, amount, chainId, signer,){

    const stoken = await superToken(toToken, chainId, signer);
    
    console.log(fromToken, toToken, amount, chainId, signer)
    if(fromToken === CHAIN_TOKENS[chainId]["MATIC"]){
        const tokenTransfer = await stoken.contract.upgrade(amount);
        // return await tokenTransfer.exec(signer)
    }
    
    // const tokenTransfer = stoken.upgrade({ amount: amount});

    // await tokenTransfer.exec(signer,)

}