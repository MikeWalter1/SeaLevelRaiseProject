// contract-interaction.component.ts

import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../../web3.service';

@Component({
  selector: 'app-contract-interaction',
  templateUrl: './contract-interaction.component.html',
  styleUrls: ['./contract-interaction.component.scss']
})
export class ContractInteractionComponent implements OnInit {

// TODO: Add contractAddress and contractAbi
  account: string = "";
  contractAddress: string = "";
  contractAbi: any[] = [];
  contractMethodResult: any;

  constructor(private web3Service: Web3Service) { }

  async ngOnInit() {
    this.account = await this.web3Service.getAccount();
    // Set contractAddress and contractAbi
  }

//   async callContractMethod(methodName: string, ...args: any[]) {
//     this.contractMethodResult = await this.web3Service.callContractMethod(this.contractAddress, this.contractAbi, methodName, args);
//   }

//   async sendTransaction(methodName: string, value: number, ...args: any[]) {
//     await this.web3Service.sendTransaction(this.contractAddress, this.contractAbi, methodName, args, value);
//   }
}
