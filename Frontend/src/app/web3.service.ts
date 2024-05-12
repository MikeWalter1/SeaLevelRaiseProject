// // wallet.service.ts

// import { Injectable } from '@angular/core';
// import Web3 from 'web3';

// declare let window: any;

// @Injectable({
//   providedIn: 'root'
// })
// export class WalletService {
//   private web3: Web3 = null;

//   constructor() {
//     if (window.ethereum) {
//       this.web3 = new Web3(window.ethereum);
//     } else {
//       console.warn('No Ethereum browser detected. Install MetaMask!');
//     }
//   }

//   async connectWallet(): Promise<void> {
//     if (window.ethereum) {
//       try {
//         // Request account access
//         await window.ethereum.enable();
//       } catch (error) {
//         console.error("User denied account access...");
//       }
//     } else {
//       console.warn('No Ethereum browser detected. Install MetaMask!');
//     }
//   }
// }
// web3.service.ts

import { Injectable } from '@angular/core';
import Web3 from 'web3';

declare let window: any;

@Injectable({
  providedIn: 'root'
})

export class Web3Service {
    private web3: Web3;

    constructor() {
        if (window.ethereum) {
            this.web3 = new Web3(window.ethereum);
            window.ethereum.enable(); // Prompt user to connect their wallet
        } else {
            console.warn('No Ethereum browser detected. Install MetaMask!');
            this.web3 = new Web3(window.ethereum);
        }
    }

    async getAccount(): Promise<string> {
        const accounts = await this.web3.eth.getAccounts();
        return accounts[0];
    }

    async sendTransaction(contractAddress: string, abi: any[], methodName: string, args: any[], value: number): Promise<any> {
        const account = await this.getAccount();
        const contract = new this.web3.eth.Contract(abi, contractAddress);
        const method = contract.methods[methodName];
        return method(...args).send({ from: account, value: value.toString() });
    }

    async testSendTransaction(contractAddress: string, abi: any[], methodName: string, args: any[], value: number): Promise<any> {
        const account = await this.getAccount();
        const contract = new this.web3.eth.Contract(abi, contractAddress);
        const method = contract.methods[methodName];
        return method(...args).send({ from: account, value: value.toString() });
    }
}
