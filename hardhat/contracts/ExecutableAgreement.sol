// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.14;

import "./base/AgreementDeliverableManager.sol";
import "./base/AgreementInfoManager.sol";
import "./base/AgreementOfferManager.sol";
import "./base/AgreementFundsManager.sol";

// @title Executable Agreement is an smart contract implementation of legal agreement.
// @author Nartey Kodjo-Sarso - <narteysarso@gmail.com>
contract ExecutableAgreement is
    AgreementFundsManager,
    AgreementOfferManager,
    AgreementDeliverableManager
{
    address public constant HOST = 0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9;
    function createAgreement(
        OfferType _offerType,
        string memory _position,
        uint64 _duration,
        uint _contractSum,
        address _targetToken,
        string memory _description,
        string memory _location,
        Deliverable[] memory _deliverables,
        Executor[] memory _executors,
        Validator[] memory _validators
    ) public {
        require(msg.sender != address(0), "EC500");

        setupOffer(
            _offerType,
            _position,
            _duration,
            _description,
            _location
        );

        setupDeliverables(_deliverables, _executors, _validators);

        setupContractFund(_contractSum, _targetToken, HOST );
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

contract AgreementSigningManager {}

contract AgreementSBT {}
