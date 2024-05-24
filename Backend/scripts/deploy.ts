import { ethers } from "hardhat";
import { writeFileSync } from "fs";
import { Contract, Signer } from "ethers";
import * as fs from 'fs';

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  // const lockedAmount = ethers.parseEther("0.001");
  let owner: Signer;
  let firstDonor: Signer;
  let secondDonor: Signer;
  let thirdDonor: Signer;
  let firstOrgaOwner: Signer;
  let address1: Signer;
  let addrs: Signer[];

  [owner, firstDonor, secondDonor, thirdDonor, firstOrgaOwner, address1, ...addrs] = await ethers.getSigners();

  const dao = await ethers.deployContract("DAO_SLR");
  await dao.waitForDeployment();
  const deployedAdress = await dao.getAddress();

  const outputFilePath = "../Frontend/src/assets/deployed-contracts.json";
  writeFileSync(outputFilePath, deployedAdress);
  // writeFileSync(outputFilePath, JSON.stringify(deployedAdress, null, 2));
  console.log(`Deployed contracts saved to ${outputFilePath}`);
  console.log(
    `DAO deployed to ${dao.target} with the following address: ${deployedAdress}`
  );
  copyFile("./artifacts/contracts/DAO_SLR.sol/DAO_SLR.json", "../Frontend/src/assets/DAO_SLR.json");

  await dao.connect(firstOrgaOwner).createOrganization("Test Organization", "Organization Description");
  console.log(`Organization "Test Organization" created by ${firstOrgaOwner.getAddress()}`);
  await dao.connect(firstOrgaOwner).createProject("Very important Project", "Interesting Description of Project", getRandomInt(10,2000));
  console.log(`Project "Very important Project" created by ${firstOrgaOwner.getAddress()}`);

  for (let index = 0; index < 10; index++) {
    await dao.connect(addrs[index]).createOrganization("Test Organization Nr.:" + index.toString(), "Organization Description Nr.:" + index.toString());
    console.log(`Organization "Test Organization" created by ${addrs[index].getAddress()}`);
    await dao.connect(addrs[index]).createProject("Test Project Nr.:" + index.toString(), "Project Description Nr.:" + index.toString(), getRandomInt(10,2000));
    console.log(`Project "Test Project" created by ${addrs[index].getAddress()}`);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function copyFile(source: string, target: string): void {
  fs.copyFile(source, target, (err) => {
    if (err) {
      console.error('Error copying file:', err);
    } else {
      console.log('File copied successfully.');
    }
  });
}
