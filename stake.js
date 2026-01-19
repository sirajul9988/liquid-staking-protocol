const { ethers } = require("hardhat");
const config = require("./lsd_config.json");

async function main() {
    const [user] = await ethers.getSigners();
    const lsd = await ethers.getContractAt("LiquidStaking", config.protocol, user);

    console.log("Staking 10 ETH...");
    
    // Check Exchange Rate Before
    const rateBefore = await lsd.getExchangeRate();
    console.log(`Rate Before: 1 lsETH = ${ethers.formatEther(rateBefore)} ETH`);

    const tx = await lsd.stake({ value: ethers.parseEther("10") });
    await tx.wait();

    const bal = await lsd.balanceOf(user.address);
    console.log(`Received ${ethers.formatEther(bal)} lsETH.`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
