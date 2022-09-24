## Executable Agreement Protocol
This protocol enables the conversion of a legal agreement/contract into a smart self executing legal contract

ABIs can be found at in hardat/abis

### RPC DATA CALL
    struct AgreementData {
        OfferType offerType;
        uint64 duration;
        uint contractSum;
        address targetToken;
        address issuer;
        address assenter;
        string position;
        string contractTokenURI;
        string name;
        string title;
        string symbol;
        string description;
        string location;
        Deliverable[] deliverables;
        Executor[] executors;
        Validator[] validators;
    }
    
    struct Deliverable {
        uint16 validatorThreshold;
        uint24 totalSeconds;
        uint payoutAmount;
        string title;
        string description;
        address receiver;
    }
    
    struct Executor {
        uint16 deliverable;
        uint timeLock;
        address _address;
    }
    
    struct Validator {
        uint16 deliverable;
        address _address;
    }
    
    
 

### Target Token addresses
- MATICx 0x96B82B65ACF7072eFEb00502F45757F254c2a0D4
- fDAIx 0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f
- fUSDCx 0x42bb40bF79730451B11f6De1CbA222F17b87Afd7
- fTUSDx 0x918E0d5C96cAC79674E2D38066651212be3C9C48


### Proxy Address
- Proxy Factory: 0xBe2c3e6eb679982ccc0D8091dD71B377b9Dd7a24
- executableAgreementcopy: 0xeF2e8559D142E4810d0C51618d80c3c4F77f57Cf
- signerManagerCopy: 0xd4756E5003ce5A2Cdd9f04AFAC0412d2a0d53939
- offerManagerCopy: 0xB5Ac343d6D3a94974e6E139006aFef6a01A23A1f
- fundsManagerCopy: 0x431aB0bF07B39938508F5384Ad24b662E264c40c
- superFluidFlowManager: 0xbC92EafCf04f115b686fb8d69a33317287667a10
- superfluidChainHost: 0xEB796bdb90fFA0f28255275e16936D25d3418603
- logger: 0x45E523084eA6Cff44e4BABe94261f4D782a83540

creating and funding an agreement steps:
1. Get proxy factory contract 
    contract = getContract(proxyFactory);
2. Create an agreement using the proxy factory 
    contract.createAgreementContract(executableAgreementcopy, signerManagerCopy, offerManagerCopy, fundsManagerCopy, superFluidFlowManager, superfluidChainHost, logger)
3. Read the executable agreement contract address from `ExecutableProxyCreated` event emitted by the proxy factory
4. get contract instance for executable agreement
    agreementContract = getContract(emittedExecutableAddress)
5. read fundmanager contract from `agreementContract`
    fundManagerAddress = agreementContract.agreementFundsManager()
6. Transfer tagert tokens to fund manager
    IERC20.transfer(fundManagerAddress, contractSum)
 
