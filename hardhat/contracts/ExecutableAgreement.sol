// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.14;

import "./base/AgreementDeliverableManager.sol";
import "./base/AgreementOfferManager.sol";
import "./base/AgreementFundsManager.sol";
import "./base/AgreementSigningManager.sol";

// @title Executable Agreement is an smart contract implementation of legal agreement.
// @author Nartey Kodjo-Sarso - <narteysarso@gmail.com>
contract ExecutableAgreement is
    AgreementFundsManager,
    AgreementOfferManager,
    AgreementDeliverableManager,
    AgreementSigningManager
{

    struct AgreementData {
        OfferType offerType;
        string position;
        uint64 duration;
        uint contractSum;
        address targetToken;
        string contractTokenURI;
        string name;
        string symbol;
        string description;
        string location;
        address[] signers;
        Deliverable[] deliverables;
        Executor[] executors;
        Validator[] validators;
    }

    address public constant HOST = 0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9;

    string public contractTokenURI;

    function createAgreement(
        AgreementData memory data
    ) public {

        require(msg.sender != address(0), "EC500");

        contractTokenURI = data.contractTokenURI;

        {
            setupOffer(
                data.offerType,
                data.position,
                data.duration,
                data.description,
                data.location
            );

            setupDeliverables(data.deliverables, data.executors, data.validators);

        }

        {
            setupContractFund(data.contractSum, data.targetToken, HOST);

            setupAgreementSigning(data.name, data.symbol, data.signers);
        }

    }
}

//---------------------------Second Part -------------------------------------------
// @title Arbiter specifies and handle staking and arbitration, and realese of stake
//        in cases of:
//        - Agreement termination by any party
//        - Agreement expiration without contract completion:
//              - any party failed to deliver on promise
//              - all party fulfilled their promise
//              - unforseen natural disasters, events beyond control of any party
//              - declared liabilities, vulnerabilities, risks, and limitations.
//
contract Arbiter {

}
