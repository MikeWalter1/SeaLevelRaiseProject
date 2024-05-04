import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { DAO_SLR } from './../typechain-types/contracts/DAO_SLR';
import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";


describe("OrganizationManager", function () {
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
        it("Create a project", async function () {
            const { dao, owner, addr1, orgaId } = await loadFixture(deployDaoWithOrganization);
            await dao.createProject(owner.getAddress(),orgaId, 0, "Project Name", "Project Description", 1000);
            const orga = await dao.getOrganization(owner.getAddress());
            // dao.getProject(orgaId, 0)
            await Promise.all([
            expect(orga.organizationName).to.equal("Organization Name"),
            expect(orga.organizationDescription).to.equal("Organization Description"),
            expect(orga.walletAddress).to.equal(await owner.getAddress()),
            Number(orga.state) == 1]);
        });

    // create project
  });
});});