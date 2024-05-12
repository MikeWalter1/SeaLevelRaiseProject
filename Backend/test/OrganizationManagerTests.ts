import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { DAO_SLR } from './../typechain-types/contracts/DAO_SLR';
import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";


describe("OrganizationManager", function () {
  async function deployFullDao() {
    let donorManager: Contract;
    let owner: Signer;
    let firstDonor: Signer;
    let secondDonor: Signer;
    let thirdDonor: Signer;
    let firstOrgaOwner: Signer;
    let address1: Signer;
    let addrs: Signer[];
    const DAO = await ethers.getContractFactory("DAO_SLR");
    [owner, firstDonor, secondDonor, thirdDonor, firstOrgaOwner, address1, ...addrs] = await ethers.getSigners();
    const dao = await DAO.deploy();
    await dao.createOrganization(firstOrgaOwner.getAddress(), "Organization Name", "Organization Description");
    // await dao.createProject(firstOrgaOwner.getAddress(), 0, "Project Name", "Project Description", 1000);

    const deployedAddress = await dao.getAddress();
    const ethValue = 421;
    const tx = {
    to: deployedAddress,
    value: ethValue,
    };
    await firstDonor.sendTransaction(tx);
    await secondDonor.sendTransaction(tx);
    await thirdDonor.sendTransaction(tx);


    return { dao, owner, firstDonor, secondDonor, thirdDonor, firstOrgaOwner, address1 };
  }

  async function deployDaoWithDefaultProject() {
    let donorManager: Contract;
    let owner: Signer;
    let firstDonor: Signer;
    let addr1: Signer;
    let addrs: Signer[];
    const DAO = await ethers.getContractFactory("DAO_SLR");
    [owner, firstDonor, addr1, ...addrs] = await ethers.getSigners();
    const dao = await DAO.deploy();

    const deployedAddress = await dao.getAddress();
    const ethValue = 421;
    const tx = {
    to: deployedAddress,
    value: ethValue,
    };
    await firstDonor.sendTransaction(tx);

    return { dao, owner, firstDonor, addr1 };
  }

  async function deployDaoWithOrganization() {
    const { dao, owner, addr1 } = await loadFixture(deployDaoWithDefaultProject);
    await dao.createOrganization(owner.getAddress(), "Organization Name", "Organization Description");
    const orga = await dao.getOrganization(owner.getAddress());
    const orgaId = orga.organizationId
    return { dao, owner, addr1, orgaId };
  }

  describe("Organization Management", function () {
    it("Should create an organization in DAO", async function () {
        const { dao, owner, addr1 } = await loadFixture(deployDaoWithDefaultProject);
        await dao.createOrganization(owner.getAddress(), "Organization Name", "Organization Description");
        const orga = await dao.getOrganization(owner.getAddress());
        await Promise.all([
        expect(orga.organizationName).to.equal("Organization Name"),
        expect(orga.organizationDescription).to.equal("Organization Description"),
        expect(orga.walletAddress).to.equal(await owner.getAddress()),
        Number(orga.state) == 1]);
    });

    describe("Project Management", function () {
        it("Org not onboarded, should revert", async function () {
            const { dao, owner, addr1, orgaId } = await loadFixture(deployDaoWithOrganization);
            // await dao.createProject(owner.getAddress(),orgaId, "Project Name", "Project Description", 1000);
            // const orga = await dao.getOrganization(owner.getAddress());
            // dao.getProject(orgaId, 0)
            await expect(dao.createProject(owner.getAddress(),orgaId, "Project Name", "Project Description", 1000)).to.be.revertedWith('Only an organization that has been onboarded can call this function.');
            // await Promise.all([
            // expect(orga.organizationName).to.equal("Organization Name"),
            // expect(orga.organizationDescription).to.equal("Organization Description"),
            // expect(orga.walletAddress).to.equal(await owner.getAddress()),
            // Number(orga.state) == 1]);
        });
    
    // create project
  });

  describe("Vote for Organization", function () {
    it("Not a DAO Donor, should revert ", async function () {
        const { dao, owner, firstDonor, firstOrgaOwner, address1 } = await loadFixture(deployFullDao);
        // await dao.connect(address1).voteForOrganization(Number(0));
        await expect(dao.connect(address1).voteForOrganization(Number(0))).to.be.revertedWith('Only donors can call this function.');
    });
    it("Donor votes for organization, should return 2", async function () {
        const { dao, owner, firstDonor, secondDonor, firstOrgaOwner, address1 } = await loadFixture(deployFullDao);
        await dao.connect(firstDonor).voteForOrganization(Number(0))
        await dao.connect(secondDonor).voteForOrganization(Number(0))
        const orga = dao.getOrganization(firstOrgaOwner.getAddress());
        expect((await orga).votes).to.equal(2);
    });
    it("Double vote, should only count once", async function () {
      const { dao, owner, firstDonor, secondDonor, firstOrgaOwner, address1 } = await loadFixture(deployFullDao);
      await dao.connect(firstDonor).voteForOrganization(Number(0))
      await dao.connect(firstDonor).voteForOrganization(Number(0))
      await dao.connect(firstDonor).voteForOrganization(Number(0))
      const orga = dao.getOrganization(firstOrgaOwner.getAddress());
      expect((await orga).votes).to.equal(1);
    });
    it("Enough votes, Org should be onboarded", async function () {
      const { dao, owner, firstDonor, secondDonor, firstOrgaOwner, address1 } = await loadFixture(deployFullDao);
      await dao.connect(firstDonor).voteForOrganization(Number(0))
      await dao.connect(secondDonor).voteForOrganization(Number(0))
      const orga = await dao.getOrganization(firstOrgaOwner.getAddress());
      const state = await orga.state;
      expect((await orga).state).to.equal(2);
      });
    it("Enough downvotes, Org should be banned", async function () {
      const { dao, owner, firstDonor, secondDonor,thirdDonor, firstOrgaOwner, address1 } = await loadFixture(deployFullDao);
      await dao.connect(firstDonor).voteForOrganization(Number(0))
      await dao.connect(secondDonor).voteAgainstOrganization(Number(0))
      await dao.connect(thirdDonor).voteAgainstOrganization(Number(0))
      const orga = await dao.getOrganization(firstOrgaOwner.getAddress());
      const state = await orga.state;
      expect((await orga).state).to.equal(1);
      });  

  });
});});