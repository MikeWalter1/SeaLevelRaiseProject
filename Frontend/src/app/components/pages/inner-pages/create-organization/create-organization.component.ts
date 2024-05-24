import { Web3Service } from './../../../../web3.service';
import { Component } from '@angular/core';

interface SmallState {
    short: string;
    fullName: string;
}

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrl: './create-organization.component.scss'
})

export class CreateOrganizationComponent {
    smallStateOptions: SmallState[] =
    [{short: 'steak-0', fullName: 'Steak'},
    {short: 'pizza-1', fullName: 'Pizza'},
    {short: 'tacos-2', fullName: 'Tacos'}];


    organizationName: string = '';
    organizationDescription: string = '';
    organizationType: string = '';
    organizationLocation: string = '';
    organizationWebsite: string = '';
    organizationEmail: string = '';
    organizationPhone: string = '';
    organizationAddress: string = '';
    organizationCity: string = '';
    organizationState: string = '';
    organizationZip: string = '';
    organizationCountry: string = '';
    organizationLogo: string = '';
    organizationSocialMedia: string = '';

    constructor(private web3: Web3Service) { }

    createOrganization() {
        console.log('Creating new organization...');
        this.web3.createOrganzation(this.organizationName, this.organizationDescription);
    }

}
