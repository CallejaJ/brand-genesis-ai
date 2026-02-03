import { ethers } from "hardhat";

async function main() {
  console.log("Deploying BrandGenesis contract (On-Demand Mode)...");

  const BrandGenesis = await ethers.getContractFactory("BrandGenesis");
  const brandGenesis = await BrandGenesis.deploy();

  await brandGenesis.waitForDeployment();

  const address = await brandGenesis.getAddress();
  console.log(`BrandGenesis deployed to: ${address}`);
  console.log("No seeding required. Ready for direct path minting.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
