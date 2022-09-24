import { ethers } from "ethers";
import { chainId, useAccount } from "wagmi";
import { message } from "antd";

import useNFTStroage from "./useNftStorage";
import FactoryABI from "../abis/ExecutableAgreementProxyFactory.json";
import ExecutableAgreementABI from "../abis/ExecutableAgreement.json";
import superToken from "../utils/superToken";
import { TOKEN_SYMBOL } from "../data/tokens";
import { getContract, getProvider } from "../utils/helpers";


export default function useAgreementContract() {
    const { store } = useNFTStroage();
    const { address } = useAccount();

    async function createAgreement(data) {

        const preparedData = prepareAgreementData({ ...data });

        const provider = await getProvider();

        const token = await superToken(TOKEN_SYMBOL[chainId.polygonMumbai][preparedData.targetToken], chainId.polygonMumbai, provider.getSigner());

        //  console.log(address);
        const balance = await token.balanceOf({
            account: address,
            providerOrSigner: provider
        })

        if (balance < preparedData.contractSum) {
            message.error("Insufficient token balance")
            return;
        }

        // console.log(preparedData);

        //Create NFT
        const metadata = await store(preparedData);

        preparedData.contractTokenURI = metadata.url;


        // create agreement on blockchain
        const proxyFactoryContract = await getContract(FactoryABI.address, FactoryABI.abi);

        const txn = await proxyFactoryContract.createExecutableAgreement(
            process.env.REACT_APP_EXECUTABLE_AGREEMENT_COPY,
            process.env.REACT_APP_SIGN_MANAGER_COPY,
            process.env.REACT_APP_OFFER_MANAGER_COPY,
            process.env.REACT_APP_FUNDS_MANAGER_COPY,
            process.env.REACT_APP_SUPERFLUID_FLOW_MANAGER_COPY,
            process.env.REACT_APP_SUPERFLUID_HOST_ADDRESS,
            process.env.REACT_APP_LOGGER_ADDRESS);

        const resp = await txn.wait();

        const event = resp.events.find((event) => event.event === "ExecutableProxyCreated");

        const { proxy } = event.args

        //creating contract
        const { clauses, ...agreementInfo } = preparedData;
        const executableAgreementProxy = await getContract(proxy, ExecutableAgreementABI.abi);

        // console.log(agreementInfo);
        const execTxn = await executableAgreementProxy.createAgreement(agreementInfo);
        await execTxn.wait();

        // transfer targetTokens to fundsManager contract
        const fundsManagerAddress = await executableAgreementProxy.agreementFundsManager();

        // console.log(fundsManagerAddress);

        const tokenTransfer = token.transfer({ receiver: fundsManagerAddress, amount: preparedData.contractSum });

        await tokenTransfer.exec(provider.getSigner()).then(tx => {
            console.log(tx)
        });

    }

    function prepareAgreementData({ infoData, clauseData, deliverableData, validatorsData, tokenizationData } = {}) {

        /**
         * OfferType offerType;
            uint64 duration;
            uint contractSum;
            address targetToken;
            address issuer;
            address assenter;
            string position;
            string contractTokenURI;
            string name;
            string symbol;
            string description;
            string location;
            Deliverable[] deliverables;
            Executor[] executors;
            Validator[] validators;
         */

        /**
         * uint16 validatorThreshold;
            uint24 totalSeconds;
            uint payoutAmount;
            string title;
            string description;
            address receiver;
         */

        const {
            title,
            offerType,
            duration,
            contractSum,
            targetToken,
            issuer,
            assenter,
            position,
            description,
            unit,
            unit_seconds,
            location,
        } = infoData;

        const projectDuration = parseInt(unit) * parseInt(unit_seconds);
        const { name, symbol } = tokenizationData;
        const deliverables = [];
        const executors = [];
        const validators = [];

        let idx = 0;

        for (let deliverable of deliverableData?.deliverables) {
            const { executor, unit, unit_seconds, targetToken, payoutAmount, ...rest } = deliverable;
            deliverables.push({ totalSeconds: (parseInt(unit) * parseInt(unit_seconds)), payoutAmount: ethers.utils.parseEther(payoutAmount), ...rest });
            executors.push({ deliverable: idx, _address: executor, timeLock: 0 })
            idx++;
        }


        idx = 0;
        for (let validatorArr of Object.entries(validatorsData)) {
            for (let validator of validatorArr[1]) {
                if (validator.validator) {
                    validators.push({ deliverable: idx, _address: validator?.validator })
                }
            }
            idx++;
        }

        return {
            offerType,
            duration,
            contractSum: ethers.utils.parseEther(contractSum),
            targetToken,
            issuer,
            assenter,
            description,
            duration: projectDuration,
            location,
            clauses: clauseData,
            position, name, title, symbol, executors, deliverables, validators
        }
    }

    async function loadCreateAgreements({ address } = {}) {

    }

    async function loadSignedAgreements({ address } = {}) {

    }

    async function loadIssuedAgreements({ address } = {}) {

    }


    return Object.freeze({
        createAgreement,
        loadIssuedAgreements,
        loadSignedAgreements
    })
}