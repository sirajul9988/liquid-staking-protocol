const { ethers } = require("hardhat");
const config = require("./lsd_config.json");

async function main() {
    const [admin] = await ethers.getSigners();
    
    console.log("Simulating Validator Rewards (Adding 1 ETH to pool)...");
    
    // We simply send ETH to the contract
    const tx = await admin.sendTransaction({
        to: config.protocol,
        value: ethers.parseEther("1.0")
    });
    await tx.wait();

    console.log("Rewards Added! The underlying pool is now larger.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
