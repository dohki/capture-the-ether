// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IName {
    function name() external view returns (bytes32);
}

interface IFuzzyIdentityChallenge {
    function isComplete() external view returns (bool);
    function authenticate() external;
}

contract FuzzyIdentityChallengeSolverFactory {
    event Deployed(address addr, uint256 salt);

    function deploy(uint256 salt) public {
        bytes memory bytecode = type(FuzzyIdentityChallengeSolver).creationCode;
        address sol;
        assembly {
            sol := create2(
                callvalue(),
                add(bytecode, 0x20),
                mload(bytecode),
                salt
            )
        }
        emit Deployed(sol, salt);
    }
}

contract FuzzyIdentityChallengeSolver is IName {
    constructor () {
        require(isBadCode(address(this)), "Contract address has no badc0de");
    }

    function authenticate(IFuzzyIdentityChallenge chal) public {
        chal.authenticate();
        require(chal.isComplete(), "Failed to complete challenge");
    }

    function name() external pure override returns (bytes32) {
        return bytes32("smarx");
    }

    function isBadCode(address _addr) internal pure returns (bool) {
        bytes20 addr = bytes20(_addr);
        bytes20 id = hex"000000000000000000000000000000000badc0de";
        bytes20 mask = hex"000000000000000000000000000000000fffffff";

        for (uint256 i = 0; i < 34; i++) {
            if (addr & mask == id) {
                return true;
            }
            mask <<= 4;
            id <<= 4;
        }

        return false;
    }
}