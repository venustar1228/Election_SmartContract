const { expect, assert } = require("chai");
const { ethers } = require("ethers");
const { BlockList } = require("net");
const { hrtime } = require("process");
const util = require('util');
const sleep = util.promisify(setTimeout);

describe("Stress", function () {
  it("Should return the new greeting once it's changed", async function () {

    const [owner, candidates, ...users] = await hre.ethers.getSigners();

    const ElectionToken = await hre.ethers.getContractFactory("EToken");
    const electiontoken = await ElectionToken.deploy("ElectionToken", "ETS", 8, 1000);

    electiontoken.transfer(users[0].address, 100);
    electiontoken.transfer(users[1].address, 300);
    electiontoken.transfer(users[2].address, 200);
    electiontoken.transfer(users[3].address, 400);

    const Election = await hre.ethers.getContractFactory("Election");
    const election = await Election.deploy(electiontoken.address);
    console.log(candidates.address);
    await election.connect(users[0]).vote(candidates.address);
    await election.connect(users[1]).vote(candidates.address);
    await election.connect(users[2]).vote(candidates.address);
    await election.connect(users[3]).vote(candidates.address);
    console.log(candidates.address);
    
    await election.elect();
    //console.log(await election.newGovernor);
    //expect(await election.newGovernor).to.equal(candidates.address);
  });
});
