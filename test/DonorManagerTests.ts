import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { DAO_SLR } from './../typechain-types/contracts/DAO_SLR';
import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";


describe("DonorManager", function () {
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

  describe("Donor management", function () {
    it("Should add a donor to DAO", async function () {
        const { dao, owner, addr1 } = await loadFixture(deployDaoWithDefaultProject);

        // Transfer ETH to the contract
        const deployedAddress = await dao.getAddress();
        const ethValue = 421;
        const tx = {
        to: deployedAddress,
        value: ethValue,
        };
        await addr1.sendTransaction(tx);
        const addr1Address = await addr1.getAddress();
        // console.log((await dao.donors(addr1.getAddress())).donorAddress);
      expect(await dao.doesDonorExist(addr1.getAddress())).to.equal(true);
    });

    it("Should return correct token balance", async function () {
        const { dao, owner, addr1 } = await loadFixture(deployDaoWithDefaultProject);
      
        // Transfer ETH to the contract
        const deployedAddress = await dao.getAddress();
        const ethValue = 421;
        const tx = {
        to: deployedAddress,
        value: ethValue,
        };
        await addr1.sendTransaction(tx);

        const addr1Address = await addr1.getAddress();
        expect(await dao.getDonorTokenBalance(addr1.getAddress())).to.equal(421);
    });

    it("Should add voting tokens to existing Donor", async function () {
        const { dao, owner, addr1 } = await loadFixture(deployDaoWithDefaultProject);
      
        // Transfer ETH to the contract
        const deployedAddress = await dao.getAddress();
        const ethValue = 421;
        const tx = {
        to: deployedAddress,
        value: ethValue,
        };
        await addr1.sendTransaction(tx);
        await addr1.sendTransaction(tx);

        const addr1Address = await addr1.getAddress();
        expect(await dao.getDonorTokenBalance(addr1.getAddress())).to.equal(842);
    });
  });
});