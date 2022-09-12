// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

struct Deliverable {
    uint16 weight;
    uint16 validatorThreshold;
    uint24 lockTime;
    uint24 flowRatePerSecond;
    uint payoutAmount;
    address receiver;
    bytes32 key;
    string title;
    string description;
    
}