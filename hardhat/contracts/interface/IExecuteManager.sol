// SPDX-License-Identifier: MIT

pragma solidity 0.8.14;
interface IExecuteManager {
    function execute(
        uint index,
        uint lockTime,
        uint flowRatePerSecond,
        uint payoutAmount,
        address receiver
    ) external returns (bool, bytes memory);
}
