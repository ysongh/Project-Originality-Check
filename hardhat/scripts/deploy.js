// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.deployContract("ProjectOriginalityCheck");

  await contract.waitForDeployment();

  console.log(
    `Project Contract deployed to ${contract.target}`
  );

  const tablename = await contract.getTableName();
  console.log(
    `Tablename is  ${tablename}`
  );

  const contract2 = await hre.ethers.deployContract("ProjectNFT");

  await contract2.waitForDeployment();

  console.log(
    `NFT Contract deployed to ${contract2.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
