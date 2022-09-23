// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "./AgreementDeliverableExecuteManager.sol";
import "../shared/Validator.sol";


// @title Agreement Deliverable Manager handles create, update, validators and validate actions on deliverables
// @author Nartey Kodjo-Sarso - <narteysarso@gmail.com>
contract AgreementDeliverableManager is AgreementDeliverableExecuteManager {

    address internal constant SENTINEL_VALIDATORS = address(0x1);

    uint16 constant MINIMUM_NUM_VERIFIERS = 1;
    uint16 index;
    uint16 deliverablesCount;

    // Mappint to keep track of all deliverables added to the contract
    mapping(uint16 => Deliverable) public deliverables;

    // Mapping to keep track of all `validator`s that has casted their `validatorVote`
    mapping(address => mapping(uint16 => bool)) hasVoted;

    // Mapping to keep track of total number of (positive) `validatorVote` casted per deliverable
    mapping(uint16 => uint16) public validateCounts;

    // Mapping to keep track of `validator`s assigned to a deliverable
    mapping(uint16 => mapping(address => address)) public validators;

    // Mapping to keep track of all `validator` vote per deliverable
    mapping(uint16 => mapping(address => ValidatorVote)) public validatorVotes;

    // Mapping to keep track of the number of `validators` for each `deliverable`
    mapping(uint16 => uint16) public validatorsCount;

    event DeliverableSetup(address indexed proxy, uint numOfDeliverables, Deliverable[] deliverables);
    event DeliverableAdded(address indexed proxy, uint16 deliverableIndex, address user);
    event DeliverableRemoved(address indexed proxy, uint16 deliverableIndex, address user);
    event DeliverableValidated(address indexed proxy, uint16 deliverableIndex, uint16 validatorIndex);
    event ValidatorAdded(
        address indexed proxy,
        uint16 deliverableIndex,
        address _validator
    );
    event ValidatorRemoved(
        address indexed proxy,
        uint16 deliverableIndex,
        address _validator
    );
    event ValidatorVoted(
        address indexed proxy,
        uint16 deliverableIndex,
        address _validator,
        ValidatorVote _validatorVote
    );

    // modifiers;

    function _setupDeliverables(
        Deliverable[] memory _deliverables
        
    ) internal {
        for (uint i = 0; i < _deliverables.length; i++) {
            _addDeliverable(_deliverables[i]);
        }

        // emit DeliverableSetup(address(this),_deliverables.length, _deliverables);
    }

    function _setupExecutors(Executor[] memory _executors) internal {
         for (uint i = 0; i < _executors.length; i++) {
            _addExecutor(_executors[i]);
        }
    }

    function _setupValidators(Validator[] memory _validators) internal {
        for (uint i = 0; i < _validators.length; i++) {
            _addValidator(_validators[i]);
        }
    }

    function _addDeliverable(Deliverable memory _deliverable) internal {
        Deliverable storage deliverable = deliverables[deliverablesCount];
        deliverable.title = _deliverable.title;
        deliverable.description = _deliverable.description;
        deliverable.payoutAmount = _deliverable.payoutAmount;
        deliverable.validatorThreshold = _deliverable.validatorThreshold;
        deliverable.totalSeconds = _deliverable.totalSeconds;
        deliverable.receiver = _deliverable.receiver;

        deliverablesCount += 1;
    }

    function _addValidator(Validator memory _validator)
        internal
    {
        // Check if deliverable exists
        require(deliverableExists(_validator.deliverable), "EC404");

        // Validator address cannot be null, this contract, or the sentinel
        require(
            _validator._address != address(0) &&
                _validator._address != address(this) &&
                _validator._address != SENTINEL_VALIDATORS,
            "EC400"
        );

        // No duplicate validator allowed
        require(
            validators[_validator.deliverable][_validator._address] == address(0),
            "EC409"
        );

        if (validators[_validator.deliverable][SENTINEL_VALIDATORS] == address(0)) {
            validators[_validator.deliverable][SENTINEL_VALIDATORS] = _validator._address;
            validators[_validator.deliverable][_validator._address] = SENTINEL_VALIDATORS;
        } else {
            validators[_validator.deliverable][_validator._address] = validators[
                _validator.deliverable
            ][SENTINEL_VALIDATORS];
            validators[_validator.deliverable][SENTINEL_VALIDATORS] = _validator._address;
        }

        validatorsCount[_validator.deliverable] += 1;
    }


    function vote(uint16 _deliverableIndex, ValidatorVote _vote)
        public
    {
        // Validator must be registered.
        require(isValidator(_deliverableIndex, msg.sender), "EC401");

        // Validator cannot vote twice
        require(!hasVoted[msg.sender][_deliverableIndex], "EC403");

        validatorVotes[_deliverableIndex][msg.sender] = _vote;
        hasVoted[msg.sender][_deliverableIndex] = true;

        if (_vote == ValidatorVote.YES) {
            validateCounts[_deliverableIndex] += 1;
        }

        logger.LogValidatorVoted(address(this), _deliverableIndex, msg.sender, _vote);

        // If number of validators is equal to (or more than) validator threshold.
        if (
            validateCounts[_deliverableIndex] >=
            deliverables[_deliverableIndex].validatorThreshold
        ) {
            
            _execute(_deliverableIndex, deliverables[_deliverableIndex]);
            emit DeliverableValidated(
                address(this),
                _deliverableIndex,
                validateCounts[_deliverableIndex]
            );
        }
    }

    function getValidators(uint16 _deliverableIndex)
        external
        view
        returns (address[] memory)
    {
        require(deliverableExists(_deliverableIndex), "EC404");

        address[] memory _array = new address[](
            validatorsCount[_deliverableIndex]
        );
        uint _index = 0;
        address currentValidator = validators[_deliverableIndex][
            SENTINEL_VALIDATORS
        ];
        while (currentValidator != SENTINEL_VALIDATORS) {
            _array[_index] = currentValidator;
            currentValidator = validators[_deliverableIndex][currentValidator];
            _index++;
        }

        return _array;
    }

    function isValidator(uint16 _deliverableIndex, address _validator)
        internal
        view
        returns (bool)
    {
        return
            _validator != SENTINEL_VALIDATORS &&
            validators[_deliverableIndex][_validator] != address(0);
    }

    function deliverableExists(uint16 _deliverableIndex)
        internal
        view
        returns (bool)
    {
        return _deliverableIndex < deliverablesCount;
    }
}
