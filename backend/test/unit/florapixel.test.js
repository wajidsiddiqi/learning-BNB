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
        it("changes mint state", async () => {
          const txResponse = await floraPixel.changeMintState();
          await txResponse.wait(1);
          const mintState = await floraPixel.getMintState();

          assert.equal(mintState, true);
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
      /*
      describe("Mint", () => {
        let quantity, value, id;

        beforeEach(async () => {
          const price = await floraPixel.getPrice();
          quantity = 1;
          value = BigInt(price.toString()) * BigInt(quantity);
          id = await floraPixel.getTokenAId();
        });

        it("reverts if mint is not open", async () => {
          await expect(
            floraPixel.mint(id, quantity, { value: value })
          ).to.be.revertedWithCustomError(
            floraPixel,
            "floraPixel__MintNotEnabled"
          );
        });

        it("reverts if wrong mint value added", async () => {
          const txResponse = await floraPixel.changeMintState();
          await txResponse.wait(1);

          await expect(
            floraPixel.mint(id, 2, { value: value })
          ).to.be.revertedWithCustomError(
            floraPixel,
            "floraPixel__NotEnoughMoneySent"
          );
        });

        it("reverts if we sold out", async () => {
          const txResponse = await floraPixel.changeMintState();
          await txResponse.wait(1);

          const accounts = await ethers.getSigners();
          const maxSupply = await floraPixel.getMaxSupply();

          for (let i = 0; i < maxSupply; i++) {
            const mintAccounts = accounts[i];
            const txResponse = await floraPixel
              .connect(mintAccounts)
              .mint(id, quantity, {
                value: value,
              });
            await txResponse.wait(1);
          }

          await expect(
            floraPixel.mint(id, quantity, { value: value })
          ).to.be.revertedWithCustomError(floraPixel, "floraPixel__WeSoldOut");
        });

        it("reverts if wrong token id added", async () => {
          const txResponse = await floraPixel.changeMintState();
          await txResponse.wait(1);

          await expect(
            floraPixel.mint(2, quantity, { value: value })
          ).to.be.revertedWithCustomError(floraPixel, "floraPixel__WrongId");
        });

        it("mints nft and updates accordingly", async () => {
          const txResponse1 = await floraPixel.changeMintState();
          await txResponse1.wait(1);
          const txResponse = await floraPixel.mint(id, quantity, {
            value: value,
          });
          await txResponse.wait(1);
          const totalSupply = await floraPixel.totalSupply(id);
          const userAddress = deployer.address;
          const userBalance = await floraPixel.balanceOf(userAddress, id);

          assert.equal(totalSupply, 1);
          assert.equal(userBalance, 1);
        });
      });

      describe("Token URI", () => {
        let quantity, value, id;

        beforeEach(async () => {
          const price = await floraPixel.getPrice();
          quantity = 1;
          value = BigInt(price.toString()) * BigInt(quantity);
          id = await floraPixel.getTokenAId();
          const txResponse = await floraPixel.changeMintState();
          await txResponse.wait(1);
        });

        it("reverts if id don't exist", async () => {
          await expect(floraPixel.uri(id)).to.be.revertedWithCustomError(
            floraPixel,
            "floraPixel__TokenNonexistent"
          );
        });

        it("returns uri", async () => {
          const txResponse = await floraPixel.mint(id, quantity, {
            value: value,
          });
          await txResponse.wait(1);
          const uri = await floraPixel.uri(id);

          assert.equal(
            uri.toString(),
            "ipfs://bafkreiccfopvgkp6yb44f62oh5tlbrf5bvpqvn2x2sbjnmvv4rni57eitq"
          );
        });
      });

      describe("Withdraw", () => {
        let quantity, value, id;

        beforeEach(async () => {
          const price = await floraPixel.getPrice();
          quantity = 1;
          value = BigInt(price.toString()) * BigInt(quantity);
          id = await floraPixel.getTokenAId();
          const txResponse = await floraPixel.changeMintState();
          await txResponse.wait(1);

          const accounts = await ethers.getSigners();
          const txResponse2 = await floraPixel
            .connect(accounts[1])
            .mint(id, quantity, {
              value: value,
            });
          await txResponse2.wait(1);
        });

        it("fails if non owner withdraws", async () => {
          const accounts = await ethers.getSigners();
          const nonowner = accounts[2];

          await expect(
            floraPixel.connect(nonowner).withdraw()
          ).to.be.revertedWith("Ownable: caller is not the owner");
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
      });*/
    });
