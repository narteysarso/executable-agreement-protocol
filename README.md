## Executable Agreement Protocol
This protocol enables the conversion of a legal agreement/contract into a smart self executing legal contract.


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
