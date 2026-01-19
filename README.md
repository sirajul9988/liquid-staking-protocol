# Liquid Staking Protocol

![Solidity](https://img.shields.io/badge/solidity-^0.8.20-blue)
![DeFi](https://img.shields.io/badge/sector-LSD-purple)
![License](https://img.shields.io/badge/license-MIT-green)

## Overview

**Liquid Staking Protocol** solves the illiquidity problem of traditional staking. Instead of locking up your ETH and waiting, you receive `lsETH` instantly. This token represents your share of the staking pool and increases in value as the protocol earns rewards.

## Mechanics

-   **Stake**: User sends 1 ETH -> Receives 1 lsETH (initially).
-   **Rewards**: The protocol earns ETH from validators.
-   **Value Accrual**: The protocol adds the rewards to the pool *without* minting new lsETH. This makes each lsETH worth *more* than 1 ETH (Exchange Rate Model).
-   **Unstake**: User burns lsETH -> Receives 1 ETH + Rewards.

## Usage

```bash
# 1. Install
npm install

# 2. Deploy
npx hardhat run deploy.js --network localhost

# 3. User Stakes ETH
node stake.js

# 4. Simulate Rewards (Oracle/Validator adds ETH)
node add_rewards.js

# 5. Check Exchange Rate (Price of lsETH)
node check_rate.js

# 6. Unstake (Burn lsETH for profit)
node unstake.js
