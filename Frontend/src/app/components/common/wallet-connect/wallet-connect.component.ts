import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Web3Service } from '../../../web3.service';


@Component({
  selector: 'app-wallet-connect',
  templateUrl: './wallet-connect.component.html',
  styleUrls: ['./wallet-connect.component.scss']
})
export class WalletConnectComponent implements OnInit {
  public account: string | null = null;

  constructor(private web3Service: Web3Service, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    // this.loadAccount();
  }

  async tryConnectWallet() {
    await this.web3Service.connectWallet();
    this.account = await this.web3Service.getAccount();
    this.cd.detectChanges();
  }

  async disconnectWallet() {
    console.log(this.account);
    this.web3Service.disconnectWallet();
    this.account = null;
    this.cd.detectChanges();
  }
//   async loadAccount() {
//     const accounts = await this.web3Service.web3.eth.getAccounts();
//     this.account = accounts[0] || null;
//   }

//   async connectWallet() {
//     if (window.ethereum) {
//       try {
//         await window.ethereum.enable();
//         this.loadAccount();
//       } catch (error) {
//         console.error("User denied account access...");
//       }
//     } else {
//       console.error("Non-Ethereum browser detected. You should consider trying MetaMask!");
//     }
//   }
}
