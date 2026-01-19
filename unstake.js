const { ethers } = require("hardhat");
const config = require("./lsd_config.json");

async function main() {
    const [user] = await ethers.getSigners();
    const lsd = await ethers.getContractAt("LiquidStaking", config.protocol, user);

    const balance = await lsd.balanceOf(user.address);
    if (balance == 0n) {
        console.log("No lsETH to unstake.");
        return;
    }

    console.log(`Unstaking all ${ethers.formatEther(balance)} lsETH...`);

    const tx = await lsd.unstake(balance);
    await tx.wait();

    console.log("Unstaked! ETH returned to wallet (Principal + Rewards).");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
