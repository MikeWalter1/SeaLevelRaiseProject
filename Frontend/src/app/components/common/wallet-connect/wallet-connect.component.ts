import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Web3Service } from '../../../web3.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-wallet-connect',
  templateUrl: './wallet-connect.component.html',
  styleUrls: ['./wallet-connect.component.scss']
})
export class WalletConnectComponent implements OnInit {
  public account: string | null = null;

  constructor(private web3Service: Web3Service, private cd: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
  }

  async tryConnectWallet() {
    await this.web3Service.connectWallet();
    this.account = await this.web3Service.getAccount();
    if (this.account) {
      this.web3Service.updateDonorTokenBalance();
      this.router.navigate(['']);
    }
    this.cd.detectChanges();
  }

  async disconnectWallet() {
    console.log(this.account);
    this.web3Service.disconnectWallet();
    this.account = null;
    this.cd.detectChanges();
  }
}
