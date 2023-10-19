require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");
require("@tableland/hardhat");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  localTableland: {
    silent: false,
    verbose: false,
  },
  networks: {
    // npx hardhat run --network scrollSepolia scripts/deploy.js
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io/" || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  paths: {
    artifacts: '../frontend/src/artifacts',
    cache: '../frontend/src/cache',
  }
};

// npx hardhat run --network localhost scripts/deploy.js