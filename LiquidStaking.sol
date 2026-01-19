// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract LiquidStaking is ERC20, Ownable, ReentrancyGuard {
    constructor() ERC20("Liquid Staked ETH", "lsETH") Ownable(msg.sender) {}

    event Staked(address indexed user, uint256 ethAmount, uint256 lsEthAmount);
    event Unstaked(address indexed user, uint256 ethAmount, uint256 lsEthAmount);
    event RewardsAdded(uint256 amount);

    /**
     * @dev Calculates how much ETH one lsETH is worth.
     * Rate = TotalETH / TotalShares
     */
    function getExchangeRate() public view returns (uint256) {
        if (totalSupply() == 0) return 1e18; // 1:1 initial ratio
        return (address(this).balance * 1e18) / totalSupply();
    }

    /**
     * @dev User deposits ETH, gets lsETH based on current rate.
     */
    function stake() external payable nonReentrant {
        require(msg.value > 0, "Amount 0");

        uint256 ethAmount = msg.value;
        uint256 rate = getExchangeRate();
        
        // Before minting, we exclude the incoming value from calculation effectively
        // Actually, for simplicity in this model:
        // Shares = (Amount * TotalSupply) / (TotalETHBeforeDeposit)
        // If supply is 0, Shares = Amount
        
        uint256 sharesToMint;
        
        if (totalSupply() == 0) {
            sharesToMint = ethAmount;
        } else {
            // We subtract msg.value because address(this).balance already includes it
            uint256 poolEthBefore = address(this).balance - ethAmount;
            sharesToMint = (ethAmount * totalSupply()) / poolEthBefore;
        }

        _mint(msg.sender, sharesToMint);
        emit Staked(msg.sender, ethAmount, sharesToMint);
    }

    /**
     * @dev User burns lsETH, gets ETH back.
     */
    function unstake(uint256 _shares) external nonReentrant {
        require(_shares > 0, "Amount 0");
        require(balanceOf(msg.sender) >= _shares, "Insufficient balance");

        uint256 ethAmount = (_shares * address(this).balance) / totalSupply();

        _burn(msg.sender, _shares);
        
        (bool success, ) = msg.sender.call{value: ethAmount}("");
        require(success, "Transfer failed");

        emit Unstaked(msg.sender, ethAmount, _shares);
    }

    /**
     * @dev Simulates validator rewards entering the pool.
     * Anyone can send ETH here, effectively increasing the share price.
     */
    receive() external payable {
        emit RewardsAdded(msg.value);
    }
}
