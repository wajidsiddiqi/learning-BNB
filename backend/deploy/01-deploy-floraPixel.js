const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const floraPixel = await deploy("FloraPixel", {
    from: deployer,
    log: true,
    args: ["0xC306DE9748e6395e21485C9C2F16847060c95C89"],
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
