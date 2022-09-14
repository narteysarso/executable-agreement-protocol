// SPDX-License-Identifier: MIT

pragma solidity 0.8.14;
interface IExecuteManager {
    function execute(
        uint _index,
        uint _totalSeconds,
        uint _payoutAmount,
        address _receiver
    ) external returns (bool, bytes memory);
}
