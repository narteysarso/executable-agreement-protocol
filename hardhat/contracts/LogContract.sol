// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "./shared/AgreementData.sol";
import "./shared/Validator.sol";

contract LogContract {

    event AgreementCreated(address indexed proxy , AgreementData agreementData);
    event ValidatorVoted(
        address indexed proxy,
        uint16 deliverableIndex,
        address validator,
        ValidatorVote validatorVote
    );

    function LogAgreementCreated(address _proxy, AgreementData memory _agreementData) external {
        emit AgreementCreated(_proxy, _agreementData);
    }

    function LogValidatorVoted(address _proxy, uint16 _deliverableIndex,
        address _validator,
        ValidatorVote _validatorVote) external {
            emit ValidatorVoted(_proxy, _deliverableIndex, _validator, _validatorVote);
        }

}