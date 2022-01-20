const { expect, assert } = require("chai");
const { ethers } = require("ethers");
const { BlockList } = require("net");
const { hrtime } = require("process");
const util = require('util');
const sleep = util.promisify(setTimeout);

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    // const [owner, account1, account2] = await hre.ethers.getSigners();
    // const ERC20 = await hre.ethers.getContractFactory("CommonERC20");
    // const erc20 = await ERC20.deploy("qwerqwer", "qwe", ethers.utils.parseUnits("1000"));
    // const lockedSale = await hre.ethers.getContractFactory("lockedSale");
    // const ins_lockedSale = await lockedSale.deploy(erc20.address, 0, 10000);
    // await erc20.transfer(ins_lockedSale.address, ethers.utils.parseUnits("1000"));
    // await ins_lockedSale.buyTokens(1000, {value: ethers.utils.parseEther("0.1")}); 
    // await ins_lockedSale.withDraw();
    // await sleep(3000);
    // expect(await erc20.balanceOf(owner.address)).to.equal(1000);
    const [owner, account1, account2] = await hre.ethers.getSigners();
    const TestERC20 = await hre.ethers.getContracFactory("TestERC20");
    const ballot = await Ballot.deploy();
    
  });
});
