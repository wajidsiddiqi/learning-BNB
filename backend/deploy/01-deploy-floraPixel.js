const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const args = ["0xF18DC19aCff2feA64202E6db906187CAa9803Fd0"];

  const floraPixel = await deploy("FloraPixel", {
    from: deployer,
    log: true,
    args: args,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.BSCSCAN_API_KEY
  ) {
    log("Verifying.....");
    await verify(floraPixel.address, args);
  }

  log("---------------------------------------");
};

module.exports.tags = ["all", "floraPixel", "main"];
