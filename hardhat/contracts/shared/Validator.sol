// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

struct Validator {
    uint16 deliverable;
    address _address;
}

enum ValidatorVote {
    NO,
    YES
}