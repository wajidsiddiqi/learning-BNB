const { network, deployments, ethers } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");
const { assert, expect } = require("chai");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Flora Pixel Nft Unit Tests", function () {
      let floraPixel, deployer, floraPixelDeployed;

      beforeEach(async () => {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        await deployments.fixture(["floraPixel"]);
        floraPixelDeployed = await deployments.get("FloraPixel");
        floraPixel = await ethers.getContractAt(
          "FloraPixel",
          floraPixelDeployed.address
        );
      });

      describe("Constructor", () => {
        it("Initializes the NFT Correctly.", async () => {
          const name = await floraPixel.name();
          const symbol = await floraPixel.symbol();
          const owner = await floraPixel.owner();
          const mintState = await floraPixel.getMintState();
          const price = await floraPixel.getMintPrice();
          const maxSupply = await floraPixel.getMaxSupply();
          const totalSupply = await floraPixel.getTotalSupply();
          const baseTokenURI = await floraPixel.getBaseTokenURI();

          assert.equal(name, "FloraPixel");
          assert.equal(symbol, "FP");
          assert.equal(owner, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
          assert.equal(mintState, false);
          assert.equal(price.toString(), ethers.parseEther("0.01"));
          assert.equal(maxSupply, 12);
          assert.equal(totalSupply, 2);
          assert.equal(
            baseTokenURI,
            "ipfs://bafybeih5lhmwj4rz74dgpznvr2dsofwibklyo3aumbzf2oz7aqlhpiv22y/"
          );
        });
      });

      describe("Mint State Change", () => {
        it("changes mint state to true", async () => {
          const txResponse = await floraPixel.changeMintState();
          await txResponse.wait(1);
          const mintState = await floraPixel.getMintState();

          assert.equal(mintState, true);
        });

        it("changes mint state to false", async () => {
          const txResponse = await floraPixel.changeMintState();
          await txResponse.wait(1);

          const txResponse2 = await floraPixel.changeMintState();
          await txResponse2.wait(1);
          const mintState = await floraPixel.getMintState();

          assert.equal(mintState, false);
        });

        it("reverts when non owner changes mint state", async () => {
          const accounts = await ethers.getSigners();
          const nonowner = accounts[1];

          await expect(
            floraPixel.connect(nonowner).changeMintState()
          ).to.be.revertedWithCustomError(
            floraPixel,
            "OwnableUnauthorizedAccount"
          );
        });
      });

      describe("Mint", () => {
        let quantity, value;

        beforeEach(async () => {
          const price = await floraPixel.getMintPrice();
          quantity = 1;
          value = BigInt(price.toString()) * BigInt(quantity);
        });

        it("reverts if mint is not open", async () => {
          await expect(
            floraPixel.mint(quantity, { value: value })
          ).to.be.revertedWithCustomError(
            floraPixel,
            "FloraPixel__MintNotEnabled"
          );
        });

        it("reverts if wrong mint value added", async () => {
          const txResponse = await floraPixel.changeMintState();
          await txResponse.wait(1);

          await expect(
            floraPixel.mint(2, { value: value })
          ).to.be.revertedWithCustomError(
            floraPixel,
            "FloraPixel__NotEnoughMoneySent"
          );
        });

        it("reverts if we sold out", async () => {
          const txResponse = await floraPixel.changeMintState();
          await txResponse.wait(1);

          const accounts = await ethers.getSigners();
          const maxSupply = await floraPixel.getMaxSupply();

          for (let i = 2; i < maxSupply; i++) {
            const mintAccounts = accounts[i];
            const txResponse = await floraPixel
              .connect(mintAccounts)
              .mint(quantity, {
                value: value,
              });
            await txResponse.wait(1);
          }

          await expect(
            floraPixel.mint(quantity, { value: value })
          ).to.be.revertedWithCustomError(floraPixel, "FloraPixel__WeSoldOut");
        });

        it("mints nfts and updates accordingly", async () => {
          const txResponse1 = await floraPixel.changeMintState();
          await txResponse1.wait(1);
          const txResponse = await floraPixel.mint(quantity, {
            value: value,
          });
          await txResponse.wait(1);
          const totalSupply = await floraPixel.getTotalSupply();
          const userAddress = deployer.address;
          const userBalance = await floraPixel.balanceOf(userAddress);

          assert.equal(totalSupply, 3);
          assert.equal(userBalance, 3);
        });
      });

      describe("Token URI", () => {
        let quantity, value;

        beforeEach(async () => {
          const price = await floraPixel.getMintPrice();
          quantity = 1;
          value = BigInt(price.toString()) * BigInt(quantity);
          const txResponse = await floraPixel.changeMintState();
          await txResponse.wait(1);
        });

        it("reverts if token id don't exist", async () => {
          await expect(floraPixel.tokenURI(3)).to.be.revertedWithCustomError(
            floraPixel,
            "ERC721NonexistentToken"
          );
        });

        it("returns Token uri", async () => {
          const txResponse = await floraPixel.mint(quantity, {
            value: value,
          });
          await txResponse.wait(1);
          const tokenUri = await floraPixel.tokenURI(3);

          assert.equal(
            tokenUri.toString(),
            "ipfs://bafybeih5lhmwj4rz74dgpznvr2dsofwibklyo3aumbzf2oz7aqlhpiv22y/3.json"
          );
        });
      });

      describe("Withdraw", () => {
        let quantity, value;

        beforeEach(async () => {
          const price = await floraPixel.getMintPrice();
          quantity = 1;
          value = BigInt(price.toString()) * BigInt(quantity);
          const txResponse = await floraPixel.changeMintState();
          await txResponse.wait(1);

          const accounts = await ethers.getSigners();
          const txResponse2 = await floraPixel
            .connect(accounts[1])
            .mint(quantity, {
              value: value,
            });
          await txResponse2.wait(1);
        });

        it("fails if non owner withdraws", async () => {
          const accounts = await ethers.getSigners();
          const nonowner = accounts[2];

          await expect(
            floraPixel.connect(nonowner).withdraw()
          ).to.be.revertedWithCustomError(
            floraPixel,
            "OwnableUnauthorizedAccount"
          );
        });

        it("successfully withdraws", async () => {
          const initialBalance = await ethers.provider.getBalance(
            floraPixelDeployed.address
          );
          const initialOwnerBalance = await ethers.provider.getBalance(
            deployer.address
          );
          const tx = await floraPixel.withdraw();
          const receipt = await tx.wait();

          const gasCost = receipt.gasUsed * tx.gasPrice;
          const finalBalance = await ethers.provider.getBalance(
            floraPixelDeployed.address
          );
          const finalOwnerBalance = await ethers.provider.getBalance(
            deployer.address
          );

          assert.equal(finalBalance.toString(), "0");
          assert.equal(
            finalOwnerBalance.toString(),
            (initialOwnerBalance - gasCost + BigInt(initialBalance)).toString()
          );
        });
      });

      describe("Withdraw function reverts", () => {
        it("fails if contract has zero balance", async () => {
          await expect(floraPixel.withdraw()).to.be.revertedWithCustomError(
            floraPixel,
            "FloraPixel__HasNoBalance"
          );
        });
      });

      describe("Airdrop", () => {
        const to = [
          "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
          "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
        ];
        const value = [1, 2];

        it("reverts if lengths are not same", async () => {
          await expect(
            floraPixel.airdrop(to, [1])
          ).to.be.revertedWithCustomError(
            floraPixel,
            "FloraPixel__DifferentLengthOfReceiversAndQuantity"
          );
        });

        it("successfully airdrops the nfts", async () => {
          const txResponse = await floraPixel.airdrop(to, value);
          await txResponse.wait(1);

          const userBalance1 = await floraPixel.balanceOf(to[0]);
          const userBalance2 = await floraPixel.balanceOf(to[1]);

          assert.equal(userBalance1, 1);
          assert.equal(userBalance2, 1);
        });
      });
    });
