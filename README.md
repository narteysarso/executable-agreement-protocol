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
        string symbol;
        string description;
        string location;
        Deliverable[] deliverables;
        Executor[] executors;
        Validator[] validators;
    }
    
    
 

### Target Token addresses
- MATICx 0x96B82B65ACF7072eFEb00502F45757F254c2a0D4
- fDAIx 0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f
- fUSDCx 0x42bb40bF79730451B11f6De1CbA222F17b87Afd7
- fTUSDx 0x918E0d5C96cAC79674E2D38066651212be3C9C48


### Proxy Address
- Proxy Factory: 0xBe2c3e6eb679982ccc0D8091dD71B377b9Dd7a24
- executableAgreementcopy: 0x6566A22C69316C7042463d08Cd75fEdA3a22740c
- signerManagerCopy: 0x578dA38A04da852B37181E0229e374B93BD84af4
- offerManagerCopy: 0x0431Dc69236AEB98aA8Efae4d9a78AD0589f50C0
- fundsManagerCopy: 0x633eB9F0f34F1CE56450b32ACC27E9CA32436447
- superFluidFlowManager: 0x8d7301c1c085f49A3325155bBa9010bc74361E0A
- superfluidChainHost: 0xEB796bdb90fFA0f28255275e16936D25d3418603
- logger: 0x5fa8cCEFd3E2e46Ca0D066AC424D3474F73BcA5C

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
 
