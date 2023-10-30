const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const floraPixel = await deploy("FloraPixel", {
    from: deployer,
    log: true,
    args: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"],
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying.....");
    await verify(floraPixel.address);
  }

  log("---------------------------------------");
};

module.exports.tags = ["all", "floraPixel", "main"];
