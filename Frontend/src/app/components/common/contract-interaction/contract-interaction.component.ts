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
  account: string | null = "";
  contractAddress: string = "";
  contractAbi: any[] = [];
  contractMethodResult: any;

  constructor(private web3Service: Web3Service) { }

  async ngOnInit() {
    this.account = this.web3Service.account;
  }
}
