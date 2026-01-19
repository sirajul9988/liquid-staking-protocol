const { ethers } = require("hardhat");
const config = require("./lsd_config.json");

async function main() {
    const lsd = await ethers.getContractAt("LiquidStaking", config.protocol);

    const rate = await lsd.getExchangeRate();
    console.log(`Current Exchange Rate: 1 lsETH = ${ethers.formatEther(rate)} ETH`);

    const totalSupply = await lsd.totalSupply();
    const totalEth = await ethers.provider.getBalance(config.protocol);
    
    console.log(`Total Supply: ${ethers.formatEther(totalSupply)} lsETH`);
    console.log(`Total Pooled: ${ethers.formatEther(totalEth)} ETH`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
