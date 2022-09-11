// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.15;

// @title Agreement Info section represents that part of a contract that provides
//        textual (non-executable) information. This can include disclamer, copyright,
//        introductions, etc
// @author Nartey Kodjo-Sarso - <narteysarso@gmail.com>

/// @dev It is likely the best to make this an nft (gated by lit protocol)
///       and not store it directly on the blockchain.
contract AgreementInfoManager {
    event SectionAdded(uint16 indexed sectionIndex, string content);
    uint16 sectionIndex;

    mapping(uint16 => string) public sections;

    function addSection(string memory _content) public {
        sections[sectionIndex] = _content;
        emit SectionAdded(sectionIndex, _content);
        sectionIndex++;
    }
}

// @title Agreement Deliverable Execute Manager handles commands that are to be executed when deliverable is fully validated
// @author Nartey Kodjo-Sarso - <narteysaros@gmail.com>
contract AgreementDeliverableExecuteManager {
    
    /// @dev tracks the contract to call for each deliverable
    mapping(uint => mapping(uint => address)) executors;

    /// @dev tracks the index per deliverable
    mapping(uint => uint) executorIndex;

    /// @dev tracks the number of executors per deliverable
    mapping(uint => uint) public executorCount;

    /// @dev tracks timelock for each executor
    mapping (uint => uint) timeLock;

    event DeliverableExecutorAdded(uint indexed deliverableIndex, uint indexed _executorcount, address executorContract);
    event DeliverableExecutorRemoved(uint indexed deliverableIndex, uint indexed _executorcount, address executorContract);

    function addExecutor(uint _deliverableIndex, address _contract) public {
        //TODO check if `_contract` implements the IExecute interface
        
        uint _index = executorIndex[_deliverableIndex];
        executors[_deliverableIndex][_index] = _contract;
        executorCount[_deliverableIndex] += 1;
        executorIndex[_deliverableIndex] += 1;

        emit DeliverableExecutorAdded(_deliverableIndex, _index, _contract);
    }

    function removeExecutor(uint _deliverableIndex, uint _executableIndex ) public {
        address _executor = executors[_deliverableIndex][_executableIndex];
        require(_executor != address(0), "EC401");

        delete executors[_deliverableIndex][_executableIndex];

        executorCount[_deliverableIndex] -= 1;

        emit DeliverableExecutorRemoved(_deliverableIndex, _executableIndex, _executor );
    }

    function execute(uint _deliverableIndex, uint _executableIndex, Deliverable _deliverable) internal {
        address _executor = executors[_deliverableIndex][_executableIndex];
        require(_executor != address(0), "EC401");

        (bool success, bytes memory message) = _executor.call( _deliverable );

        require(success, message);
    }


}

// @title Agreement Deliverable Manager handles create, update, validators and validate actions on deliverables
// @author Nartey Kodjo-Sarso - <narteysarso@gmail.com>
contract AgreementDeliverableManager {
    enum ValidatorVote {
        NO,
        YES
    }

    struct Validators {
        address _user;
    }

    struct Deliverable {
        uint16 weight;
        uint16 validatorThreshold;
        uint payoutAmount;
        bytes32 key;
        string title;
        string description;
    }

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

    event DeliverableSetup(uint numOfDeliverables, Deliverable[] deliverables);
    event DeliverableAdded(uint16 deliverableIndex, address user);
    event DeliverableRemoved(uint16 deliverableIndex, address user);
    event DeliverableValidated(uint16 deliverableIndex, uint16 validatorIndex);
    event ValidatorAdded(
        uint16 deliverableIndex,
        address _user,
        address validator
    );
    event ValidatorRemoved(
        uint16 deliverableIndex,
        address _user,
        address validator
    );
    event ValidatorVoted(
        uint16 deliverableIndex,
        address _validator,
        ValidatorVote _validatorVote
    );

    // modifiers;

    function setupDeliverables(Deliverable[] memory _deliverables) internal {
        for (uint i = 0; i < _deliverables.length; i++) {
            
            _addDeliverable(_deliverables[i]);
            
        }

        emit DeliverableSetup(_deliverables.length, _deliverables);
    }

    function addDeliverable(Deliverable memory _deliverable) public {
        _addDeliverable(_deliverable);
        emit DeliverableAdded(deliverablesCount, msg.sender);

        deliverablesCount += 1;
    }

    function _addDeliverable(Deliverable memory _deliverable) internal {
        Deliverable storage deliverable = deliverables[deliverablesCount];
        deliverable.title = _deliverable.title;
        deliverable.description = _deliverable.description;
        deliverable.payoutAmount = _deliverable.payoutAmount;
        deliverable.key = keccak256(bytes(deliverable.title));
        deliverable.validatorThreshold = _deliverable.validatorThreshold;

        deliverablesCount += 1;
    }

    function addValidator(uint16 _deliverableIndex, address _validator) public {
        _addValidator(_deliverableIndex, _validator);

        emit ValidatorAdded(_deliverableIndex, msg.sender, _validator);
    }
    function _addValidator(uint16 _deliverableIndex, address _validator) internal {

       // Check if deliverable exists
        require(deliverableExists(_deliverableIndex), "EC404");

        // Validator address cannot be null, this contract, or the sentinel
        require(
            _validator != address(0) &&
                _validator != address(this) &&
                _validator != SENTINEL_VALIDATORS,
            "EC400"
        );

        // No duplicate validator allowed
        require(
            validators[_deliverableIndex][_validator] == address(0),
            "EC409"
        );

        if (validators[_deliverableIndex][SENTINEL_VALIDATORS] == address(0)) {
            validators[_deliverableIndex][SENTINEL_VALIDATORS] = _validator;
            validators[_deliverableIndex][_validator] = SENTINEL_VALIDATORS;
        } else {
            validators[_deliverableIndex][_validator] = validators[
                _deliverableIndex
            ][SENTINEL_VALIDATORS];
            validators[_deliverableIndex][SENTINEL_VALIDATORS] = _validator;
        }

        validatorsCount[_deliverableIndex] += 1;
    }

    function removeValidator(
        uint16 _deliverableIndex,
        address _validator,
        address _prevValidator
    ) public {
        // Check if deliverable exists
        require(deliverableExists(_deliverableIndex), "EC404");

        // Validator address cannot be null, this contract, or the sentinel
        require(
            _validator != address(0) &&
                _validator != address(this) &&
                _validator != SENTINEL_VALIDATORS,
            "EC400"
        );

        require(
            validators[_deliverableIndex][_prevValidator] == _validator,
            "EC404"
        );

        validators[_deliverableIndex][_prevValidator] = validators[
            _deliverableIndex
        ][_validator];
        validators[_deliverableIndex][_validator] = address(0);

        validatorsCount[_deliverableIndex] -= 1;

        if(validatorVotes[_deliverableIndex][_validator] == ValidatorVote.YES){
            delete validatorVotes[_deliverableIndex][_validator];
            validateCounts[_deliverableIndex] -= 1;
        }

        emit ValidatorRemoved(_deliverableIndex, msg.sender, _validator);
    }

    function validatorVote(uint16 _deliverableIndex, ValidatorVote _vote)
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

        emit ValidatorVoted(_deliverableIndex, msg.sender, _vote);

        // If number of validators is equal to (or more than) validator threshold.
        if (
            validateCounts[_deliverableIndex] >=
            deliverables[_deliverableIndex].validatorThreshold
        ) {
            // TODO: Initiate timelock of 10 mins
            emit DeliverableValidated(
                _deliverableIndex,
                validateCounts[_deliverableIndex]
            );
        }
    }

    function getValidators(uint16  _deliverableIndex) external view returns (address[] memory){

        require(deliverableExists(_deliverableIndex), "EC404");
        
        address [] memory _array = new address[](validatorsCount[_deliverableIndex]);
        uint _index = 0;
        address currentValidator = validators[_deliverableIndex][SENTINEL_VALIDATORS];
        while(currentValidator != SENTINEL_VALIDATORS){
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

// @title Agreement Offer Manager handles general agreement info about the contract offer
//        Its events are published to the subgraph for index.
// @author Nartey Kodjo-Sarso - <narteysarso@gmail.com>
contract AgreementOfferManager {
    enum OfferType {
        CONTRACT,
        FULL_TIME,
        PART_TIME
    }

    enum Status {
        AVAILABLE,
        UNAVAILABLE
    }

    bytes32 public position;

    uint64 public duration;

    uint256 public contractSum;

    Status public status;

    string public description;

    string public location;

    OfferType public offerType;

    address public targetToken;

    event OfferCreated(
        bytes32 position,
        uint64 duration,
        uint256 contractSum,
        address targetToken,
        Status status,
        string description,
        string location,
        OfferType offerType
    );

    function setupOffer(
        OfferType _offerType,
        bytes32 _position,
        uint64 _duration,
        uint _contractSum,
        address _targetToken,
        Status _status,
        string memory _description,
        string memory _location
    ) internal {
        position = _position;
        duration = _duration;
        contractSum = _contractSum;
        targetToken = _targetToken;
        status = _status;
        description = _description;
        location = _location;
        offerType = _offerType;

        emit OfferCreated(
            _position,
            _duration,
            _contractSum,
            _targetToken,
            _status,
            _description,
            _location,
            _offerType
        );
    }
}




// @title Executable Agreement is an smart contract implementation of legal agreement.
// @author Nartey Kodjo-Sarso - <narteysarso@gmail.com>
contract YourContract is
    AgreementInfoManager,
    AgreementDeliverableManager,
    AgreementOfferManager
{
    function createAgreement(
        OfferType _offerType,
        bytes32 _position,
        uint64 _duration,
        uint _contractSum,
        address _targetToken,
        Status _status,
        string memory _description,
        string memory _location,
        Deliverable[] memory _deliverables
    ) public {
        require(msg.sender != address(0), "EC500");

        setupOffer(
            _offerType,
            _position,
            _duration,
            _contractSum,
            _targetToken,
            _status,
            _description,
            _location
        );

        setupDeliverables(_deliverables);
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

contract AgreementSigningManager {

}


contract AgreementSBT {

}
