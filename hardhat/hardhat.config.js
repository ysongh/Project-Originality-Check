require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  paths: {
    artifacts: '../frontend/src/artifacts',
    cache: '../frontend/src/cache',
  }
};

// npx hardhat run --network localhost scripts/deploy.js