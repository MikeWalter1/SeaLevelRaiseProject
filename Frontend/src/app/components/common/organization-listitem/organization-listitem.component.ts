import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { Web3Service } from 'src/app/web3.service';

@Component({
    selector: 'app-organization-listitem',
    templateUrl: './organization-listitem.component.html',
    styleUrl: './organization-listitem.component.scss'
})
export class OrganizationListitemComponent {
        // TO-DO: Convert into organization class
        @Input() public id: string = '0';
        @Input() public name: string = 'Organization 1';
        @Input() public description: string = 'Description 1';
        @Input() public state: string = 'Active';
        @Input() public upvotes: string = '632';
        @Input() public downvotes: string = '32';
        @Input() public imageUrl: string = "assets/images/projects/project-1.jpg";

        @Output() organizationUpdated = new EventEmitter<string>();

        constructor(private web3: Web3Service) {

        }
        async upvote(){
            await this.web3.upvoteOrganization(this.id).then(
                (result) => {
                    this.organizationUpdated.emit(this.id);}
            );
            // this.organizationUpdated.emit(this.id);
        }

        async downvote(){
            await this.web3.downVoteOrganization(this.id).then(
                (result) => {
                    this.organizationUpdated.emit(this.id);}
            );

        }
}


