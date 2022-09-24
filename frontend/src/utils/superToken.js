import { CHAIN_TOKENS } from "../data/tokens";
import ISETHABI from "../abis/ISETH.json";
import { getContract } from "./helpers";
import { ethers } from "ethers";
import { erc20ABI } from "wagmi";

const { Framework } = require("@superfluid-finance/sdk-core")

export default async function superToken(token, chainId, provider){
    const sf = await Framework.create({
        chainId,
        provider
    });

    return await sf.loadSuperToken(token);
}

export async function swapForSuperToken(fromToken, toToken, amount, chainId,){
    
    const contract = getContract(toToken,ISETHABI.abi);
    if(fromToken === CHAIN_TOKENS[chainId]["MATIC"]){
        const txn = await contract.upgradeByETH({value: amount});
        const result = await txn.wait();
        return;
    }

    const fromTokenContract = getContract(fromToken, erc20ABI);
    const approveTxn = await fromTokenContract.approve(toToken, amount);
    await approveTxn.wait();

    const txn = await contract.upgrade(amount);
    await txn.wait();




}