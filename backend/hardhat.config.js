require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("hardhat-deploy");
require("dotenv").config();

const BSC_RPC_URL = process.env.BSC_RPC_URL || "http://bsc-key/example";
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "bsc-key";
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY || "bscscan-api";
const COINMARKETCAP_API_KEY =
  process.env.COINMARKETCAP_API_KEY || "coinmarket-api";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmations: 1,
    },
    bscTestnet: {
      url: BSC_RPC_URL,
      chainId: 97,
      accounts: [WALLET_PRIVATE_KEY],
      blockConfirmations: 6,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    },
  },
  etherscan: {
    apiKey: {
      bsc: { BSCSCAN_API_KEY },
    },
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  mocha: {
    timeout: 500000,
  },
};
