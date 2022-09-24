// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "./shared/AgreementData.sol";
import "./shared/Validator.sol";

contract LogContract {

    struct LogAgreementData {
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
    }

    event AgreementCreated(address indexed proxy , LogAgreementData agreementData);
    event ValidatorCreated(address indexed proxy , Validator validator);
    
    event ValidatorVoted(
        address indexed proxy,
        uint16 deliverableIndex,
        address validator,
        ValidatorVote validatorVote
    );

    event DeliverableCompleted(
        address indexed proxy,
        uint indexed deliverableIndex,
        uint indexed _executorIndex
    );

    function LogAgreementCreated(address _proxy, AgreementData memory _agreementData) external {
        LogAgreementData memory agreementData = LogAgreementData({
            offerType: _agreementData.offerType,
            duration: _agreementData.duration,
            contractSum: _agreementData.contractSum,
            targetToken: _agreementData.targetToken,
            issuer: _agreementData.issuer,
            assenter: _agreementData.assenter,
            position: _agreementData.position,
            contractTokenURI: _agreementData.contractTokenURI,
            name: _agreementData.name,
            title: _agreementData.title,
            symbol: _agreementData.symbol,
            description: _agreementData.description,
            location: _agreementData.location
        });

        emit AgreementCreated(_proxy, agreementData );
    }

    function LogValidatorVoted(address _proxy, uint16 _deliverableIndex,
        address _validator,
        ValidatorVote _validatorVote) external {
            emit ValidatorVoted(_proxy, _deliverableIndex, _validator, _validatorVote);
        }

    function LogDeliverableCompleted(
            address proxy,
            uint _deliverableIndex,
            uint _executableIndex
        ) external {
            emit DeliverableCompleted(proxy,_deliverableIndex,_executableIndex
        );
    }
    function LogValidatorAdded(
            address proxy,
            Validator memory _validator
        ) external {
            emit ValidatorCreated(proxy,_validator);
    }

}