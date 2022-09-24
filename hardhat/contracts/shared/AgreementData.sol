// SPDX-License-Identifier: MIT

pragma solidity 0.8.14;

import "./Validator.sol";
import "./OfferType.sol";
import "./Executor.sol";
import "./Deliverable.sol";

struct AgreementData {
    OfferType offerType;
    uint64 duration;
    uint contractSum;
    address targetToken;
    address issuer;
    address assenter;
    string position;
    string contractTokenURI;
    string title;
    string name;
    string symbol;
    string description;
    string location;
    Deliverable[] deliverables;
    Executor[] executors;
    Validator[] validators;
}