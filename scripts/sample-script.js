// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const [owner, account1, account2] = await hre.ethers.getSigners();
  const TestERC20 = await hre.ethers.getContractFactory("TestERC20");
  const testerc20 = await TestERC20.deploy();
  await testerc20.deployed();
  console.log("TestERC20 deployed to:", testerc20.address);
} 

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
