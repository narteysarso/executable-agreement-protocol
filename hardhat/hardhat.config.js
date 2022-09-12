require("dotenv").config()

require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-ethers")
require("hardhat-gas-reporter")
require("solidity-coverage")

module.exports = {
  solidity: "0.8.14",
  networks:{
    mumbai: {
      url: process.env.MUMBAI_RPC_URL,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_KEY
    }
  }

}
