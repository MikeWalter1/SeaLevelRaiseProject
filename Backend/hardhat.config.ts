import { Address } from '@nomicfoundation/ethereumjs-util';
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { task } from "hardhat/config";
import { writeFileSync } from "fs";
// import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";
import { Deployment } from "hardhat-deploy/types";
import "hardhat-deploy";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
};

// task("deployed-contracts", "Prints deployed contract addresses")
//   .setAction(async (_, hre) => {
//     const contracts = await hre.artifacts.getAllFullyQualifiedNames();
//     const deployedContracts: Record<string, string> = {};
//     for (const contract of contracts) {
//       const deployed = await hre.deployments.getOrNull(contract);
//       if (deployed) {
//         deployedContracts[contract] = deployed.address;
//       }
//     }
//     console.log('Deployed contracts:', deployedContracts);
//     const outputFilePath = "./deployed-contracts.json";
//     writeFileSync(outputFilePath, JSON.stringify(deployedContracts, null, 2));
//     console.log(`Deployed contract addresses saved to ${outputFilePath}`);
//   });

//   task("save-deployed-contracts", "Save deployed contracts to a JSON file")
//   .setAction(async (args, hre) => {
//     const { deployments } = hre;

//     // Get all deployed contracts
//     const allDeployments: Deployment[] = Object.values(await deployments.all());
//     const deployedContracts: Record<string, string> = {};

//     // Extract contract names and addresses
//     allDeployments.forEach((deployment) => {
//       deployedContracts[deployment.address] = deployment.address;
//     });

//     // Write deployed contracts to a JSON file
//     const outputFilePath = "./deployed-contracts.json";
//     writeFileSync(outputFilePath, JSON.stringify(deployedContracts, null, 2));
//     console.log(`Deployed contracts saved to ${outputFilePath}`);
//   });

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD", // currency to show
    outputFile: "gas-report.txt", // optional
    noColors: true, //optional
    // coinmarketcap: process.env.COINMARKETCAP_API_KEY, //to fetch gas data
    // token: "MATIC" // for polygon blockchain(optional).
  },
  allowUnlimitedContractSize: true,
}

export default config;
