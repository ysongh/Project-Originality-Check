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
    // npx hardhat run --network scrollSepolia scripts/deploy2.js
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io/" || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  paths: {
    artifacts: '../frontend/src/artifacts',
    cache: '../frontend/src/cache',
  },
  etherscan: {
    apiKey: {
      scrollSepolia: 'abc',
    },
    customChains: [
      {
        network: 'scrollSepolia',
        chainId: 534351,
        urls: {
          apiURL: 'https://sepolia-blockscout.scroll.io/api',
          browserURL: 'https://sepolia-blockscout.scroll.io/',
        },
      },
    ],
  },
};

// npx hardhat run --network localhost scripts/deploy.js