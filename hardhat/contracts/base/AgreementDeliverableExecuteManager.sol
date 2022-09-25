// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;
import "../shared/Deliverable.sol";
import "../shared/Executor.sol";
import "../interface/IExecuteManager.sol";
import "../module/AgreementFundsManager.sol";
import "../LogContract.sol";

// @title Agreement Deliverable Execute Manager handles commands that are to be executed when deliverable is fully validated
// @author Nartey Kodjo-Sarso - <narteysaros@gmail.com>
contract AgreementDeliverableExecuteManager {
    
    address internal constant SENTINEL_FUNDS_MANAGER = address(0x1);
    address internal constant TELLOR_VALIDATOR_ADDRESS = address(0x2);
    
    /// @dev tracks funds manager contract
    AgreementFundsManager public agreementFundsManager;

    // @dev contract for logging events
    LogContract public logger;

    /// @dev tracks the contract to call for each deliverable
    mapping(uint => Executor) public executors;

    mapping(uint => bool) executedExecutors;

    mapping(uint => mapping(uint => uint)) deliverableExecutor;

    /// @dev tracks the number of executors per deliverable
    mapping(uint => uint) public deliverableExecutorCount;

    event DeliverableExecutorAdded(
        address indexed proxy,
        uint indexed deliverableIndex,
        uint indexed _executorcount
    );
    event DeliverableExecutorRemoved(
        address indexed proxy,
        uint indexed deliverableIndex,
        uint indexed _executorIndex
    );
    
    event DeliverableCompleted(
        address indexed proxy,
        uint indexed deliverableIndex,
        uint indexed _executorIndex
    );

    function _addExecutor(Executor memory _executor) internal {
        //TODO check if `_contract` implements the IExecute interface
        require(_executor._address != address(0), "EC500");
        if(_executor._address == SENTINEL_FUNDS_MANAGER){
            _executor._address = address(agreementFundsManager);
        }
        uint _index = deliverableExecutorCount[_executor.deliverable];
        executors[_executor.deliverable] = _executor;
        deliverableExecutorCount[_executor.deliverable] += 1;

        emit DeliverableExecutorAdded(address(this), _executor.deliverable, _index);
    }

    function _setTimeLock(
        uint _deliverableIndex,
        uint _deliverableExecutableIndex
    ) internal {
        uint _executableIndex = deliverableExecutor[_deliverableIndex][
            _deliverableExecutableIndex
        ];
        Executor storage _executor = executors[_executableIndex];
        _executor.timeLock = block.timestamp + _executor.timeLock;
    }


    function _execute(uint _executableIndex, Deliverable memory _deliverable)
        internal
    {
        Executor storage _executor = executors[_executableIndex];
        require(_executor._address != address(0), "EC401");
        require(!executedExecutors[_executableIndex], "DE401");

        executedExecutors[_executableIndex] = true;

        (bool success,) = IExecuteManager(
            _executor._address
        ).execute(
                _executableIndex,
                _deliverable.totalSeconds,
                _deliverable.payoutAmount,
                _deliverable.receiver
            );

        require(success, "DE500");

        logger.LogDeliverableCompleted(
            address(this),
            _executableIndex,
            _executableIndex
        );
    }

    function isLocked(uint _executableIndex) internal view returns (bool) {
        Executor storage _executor = executors[_executableIndex];
        return (_executor.timeLock >= block.timestamp);
    }
}
