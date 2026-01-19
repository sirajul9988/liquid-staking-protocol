// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Just a helper to simulate a validator sending rewards
contract ValidatorMock {
    function distributeRewards(address _pool) external payable {
        (bool success, ) = _pool.call{value: msg.value}("");
        require(success, "Reward distribution failed");
    }
}
