import { ethers } from "ethers";
import ExecutableABI from "../abis/ExecutableAgreement.json";
import SigningManagerABI from "../abis/AgreementSigningManager.json";

export function getProvider() {
    if (!window.ethereum) {
        alert("Please install metamask to continue");
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
}

export function getContract(address, abi) {
    const provider = getProvider();
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, abi, provider);
    const contractWithSigner = contract.connect(signer);

    return contractWithSigner;
}

export function getExecutableContract(address){
    return getContract(address, ExecutableABI.abi);
}

export function getSigningManagerContract(address){
    return getContract(address, SigningManagerABI.abi);
}



export function weiToEth(amount = 0){
    return ethers.utils.formatEther(amount)
}