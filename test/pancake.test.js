
const { expect } = require('chai');
const { ethers } = require('hardhat');

let pancakeRouter, pancakeFactory, WETH;
let owner, users;
let testErc20;

describe("PancakeSwap Test", () => {

    beforeEach(async () => {
        [owner, ...users] = await ethers.getSigners();
        pancakeFactory = await (await ethers.getContractFactory("PancakeFactory")).deploy(users[10].address);
        WETH = await (await ethers.getContractFactory("WBNB")).deploy();
        pancakeRouter = await (await ethers.getContractFactory("PancakeRouter")).deploy(pancakeFactory.address, WETH.address);
        testErc20 = await (await ethers.getContractFactory("TestERC20")).deploy(pancakeRouter.address);
        await testErc20.approve(pancakeRouter.address, ethers.utils.parseUnits("1000000"));

        // await pancakeFactory.createPair(testErc20.address, WETH.address);
        // await testErc20.setWhiteList(await pancakeFactory.getPair(testErc20.address, WETH.address));

        await pancakeRouter.addLiquidityETH(
            testErc20.address,
            ethers.utils.parseUnits("10000", 9),
            0,
            ethers.utils.parseUnits("100"),
            owner.address,
            parseInt((new Date).getTime() / 1000) + 100,
            {value: ethers.utils.parseEther("100")}
        );
    })

    it("whiteList Check", async () => {
        const pairAddress = await pancakeFactory.getPair(testErc20.address, WETH.address);
        expect(await testErc20.whiteList(pairAddress)).to.equal(true);
    })

    
    it("Calculate Y token's amount", async () => {
        const pairAddress = await pancakeFactory.getPair(testErc20.address, WETH.address);
        const pancakePair = await ethers.getContractAt("contracts/ref/PancakeRouter.sol:IPancakePair", pairAddress);
        const { reserve0, reserve1 } = await pancakePair.getReserves();
        const Z = reserve0.mul(reserve1);
        console.log(reserve0, reserve1, Z);
        const amountIn = ethers.utils.parseUnits('100', 9);
        const path = [testErc20.address, WETH.address];
        await pancakeRouter.swapExactTokensForETH(amountIn, 0, path, owner.address, parseInt((new Date).getTime() / 1000 + 100));
        const { reserve0: reserve0New, reserve1: reserve1New } = await pancakePair.getReserves();
        const newZ = reserve0New * reserve1New;
        console.log(reserve0New, reserve1New, newZ);
        expect(reserve0New).to.equal(Z.div(reserve1New));
    })
})