import { Component } from '@angular/core';

@Component({
  selector: 'app-create-organization',
  standalone: true,
  imports: [],
  templateUrl: './create-organization.component.html',
  styleUrl: './create-organization.component.scss'
})
export class CreateOrganizationComponent {
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

    constructor() { }

    createNewOrganization() {
        console.log('Creating new organization...');
    }

}
