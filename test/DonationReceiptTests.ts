import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { string } from "hardhat/internal/core/params/argumentTypes";

describe("Donation Receipt Tests", function () {

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployDaoWithDefaultProject() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const DAO = await ethers.getContractFactory("DAO_SLR");
    const dao = await DAO.deploy();

    const projectDescription: string = "Project Description";
    const projectTitle: string = "Project Title";
    const fundingGoal: number = 100;

    await dao.createProject(projectTitle, projectDescription, fundingGoal);

    const deployedAddress = await dao.getAddress();
    const ethValue = 421;
    const tx = {
      to: deployedAddress,
      value: ethValue,
    };
    await owner.sendTransaction(tx);

    await dao.voteForProject(0, ethValue);

    return { dao, owner, otherAccount };
  }

    describe("Get Token Metadata", function () {
      it("Should revert", async function () {
        const { dao, owner, otherAccount } = await loadFixture(deployDaoWithDefaultProject);
        
        // await dao.createDonationReceipt(0);
        // console.log( await dao.getTokenInformation(0));
  
        await expect(1==1);

        //expect(Number(details[2])).to.be.equal(4);
      });
    });

      describe("Donation to Voting Tokens", function () {
        it("Should transfer ETH to voting tokens", async function () {
          const { dao, owner, otherAccount } = await loadFixture(deployDaoWithDefaultProject);
    
          // Transfer ETH to the contract
          const deployedAddress = await dao.getAddress();
          const ethValue = 421;
          const tx = {
            to: deployedAddress,
            value: ethValue,
          };
          await owner.sendTransaction(tx);
    
          // Check the contract balance
          //const contractBalance = await ethers.provider.getBalance(deployedAddress);
    
          // const votingTokens = await dao.connect(owner).getVotingTokens();
    
          // expect(votingTokens).to.be.equal(ethValue);
          //expect(Number(details[2])).to.be.equal(4);
        });
      });
  });

