const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying with:", deployer.address);

    const Protocol = await ethers.getContractFactory("LiquidStaking");
    const protocol = await Protocol.deploy();
    await protocol.waitForDeployment();
    const address = await protocol.getAddress();

    console.log(`LiquidStaking Deployed: ${address}`);

    // Save Config
    const config = { protocol: address };
    fs.writeFileSync("lsd_config.json", JSON.stringify(config));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
