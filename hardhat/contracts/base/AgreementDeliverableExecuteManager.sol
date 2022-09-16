// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "../shared/Deliverable.sol";
import "../shared/Executor.sol";
import "../interface/IExecuteManager.sol";

// @title Agreement Deliverable Execute Manager handles commands that are to be executed when deliverable is fully validated
// @author Nartey Kodjo-Sarso - <narteysaros@gmail.com>
contract AgreementDeliverableExecuteManager {
    

    /// @dev tracks the contract to call for each deliverable
    mapping(uint => Executor) executors;

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

    function removeExecutor(
        uint _deliverableIndex,
        uint _deliverableExecutableIndex
    ) public {
        uint _executableIndex = deliverableExecutor[_deliverableIndex][
            _deliverableExecutableIndex
        ];
        Executor storage _executor = executors[_executableIndex];

        require(_executor._address != address(0), "EC401");

        delete deliverableExecutor[_deliverableIndex][
            _deliverableExecutableIndex
        ];
        delete executors[_executableIndex];

        emit DeliverableExecutorRemoved(
            address(this),
            _deliverableIndex,
            _deliverableExecutableIndex
        );
    }

    function _execute(uint _executableIndex, Deliverable memory _deliverable)
        internal
    {
        Executor storage _executor = executors[_executableIndex];
        require(_executor._address != address(0), "EC401");
        require(!isLocked(_executableIndex), "EC402");

        // (bool success, bytes memory message) = IExecuteManager(
        //     _executor._address
        // ).execute(
        //         _executableIndex,
        //         _deliverable.totalSeconds,
        //         _deliverable.payoutAmount,
        //         _deliverable.receiver
        //     );

        // require(success, string(message));

        emit DeliverableCompleted(
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
