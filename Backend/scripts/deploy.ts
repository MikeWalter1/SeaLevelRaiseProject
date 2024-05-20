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
  await dao.connect(firstOrgaOwner).createProject("Test Project", "Project Description", 1000);
  console.log(`Project "Test Project" created by ${firstOrgaOwner.getAddress()}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



function copyFile(source: string, target: string): void {
  fs.copyFile(source, target, (err) => {
    if (err) {
      console.error('Error copying file:', err);
    } else {
      console.log('File copied successfully.');
    }
  });
}
