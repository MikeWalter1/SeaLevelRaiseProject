import { ethers } from "hardhat";
import { writeFileSync } from "fs";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.parseEther("0.001");

  // const dao = await ethers.deployContract("DAO_SLR", [unlockTime], {
  //   value: lockedAmount,
  // });
  const dao = await ethers.deployContract("DAO_SLR");
  await dao.waitForDeployment();
  const deployedAdress = await dao.getAddress();

  const outputFilePath = "./deployed-contracts.json";
  writeFileSync(outputFilePath, JSON.stringify(deployedAdress, null, 2));
  console.log(`Deployed contracts saved to ${outputFilePath}`);

  console.log(
    `DAO with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${dao.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
