// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {
    uint256 private number;

    event NumberChanged(uint256 newNumber);

    constructor(uint256 _initialNumber) {
        number = _initialNumber;
    }

    function setNumber(uint256 _number) public {
        number = _number;
        emit NumberChanged(_number);
    }

    function getNumber() public view returns (uint256) {
        return number;
    }
}
