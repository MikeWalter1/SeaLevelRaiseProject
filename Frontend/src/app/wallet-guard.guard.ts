import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root'
})
export class DaoAddressGuard implements CanActivate {

  constructor(private web3Service: Web3Service, private router: Router) { }

  canActivate(): boolean {
    if (this.web3Service.account != null) {
        return true;
    } else {
        this.router.navigate(['/wallet-login']);
        return false;
    }
  }
}
