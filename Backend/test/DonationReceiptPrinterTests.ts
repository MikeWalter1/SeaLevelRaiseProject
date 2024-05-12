// import { expect } from "chai";
// import { ethers } from "hardhat";
// import { Contract, Signer } from "ethers";

// describe("DAO_SLR", function () {
//   let DAO_SLR: Contract;
//   let dao_slr: Contract;
//   let owner: Signer;
//   let addr1: Signer;
//   let addr2: Signer;
//   let addrs: Signer[];

//   beforeEach(async function () {
//     DAO_SLR = await ethers.getContractFactory("DAO_SLR");
//     [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

//     dao_slr = await DAO_SLR.deploy();
//     await dao_slr.deployed();
//   });

//   describe("createReceipt", function () {
//     it("Should create a receipt", async function () {
//       await dao_slr.connect(owner).createReceipt(addr1.getAddress(), 1, 100, Math.floor(Date.now() / 1000));
//       expect(await dao_slr.receipts(0)).to.exist;
//     });

//     it("Should fail if not called by the owner", async function () {
//       await expect(dao_slr.connect(addr2).createReceipt(addr1.getAddress(), 1, 100, Math.floor(Date.now() / 1000))).to.be.revertedWith("Ownable: caller is not the owner");
//     });

//     it("Should fail if receipt already created", async function () {
//       await dao_slr.connect(owner).createReceipt(addr1.getAddress(), 1, 100, Math.floor(Date.now() / 1000));
//       await expect(dao_slr.connect(owner).createReceipt(addr1.getAddress(), 1, 100, Math.floor(Date.now() / 1000))).to.be.revertedWith("Receipt already created");
//     });
//   });
// });