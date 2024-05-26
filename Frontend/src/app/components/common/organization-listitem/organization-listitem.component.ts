import { Component, Input, input } from '@angular/core';

@Component({
    selector: 'app-organization-listitem',
    templateUrl: './organization-listitem.component.html',
    styleUrl: './organization-listitem.component.scss'
})
export class OrganizationListitemComponent {
        @Input() public id: string = '0';
        @Input() public name: string = 'Organization 1';
        @Input() public description: string = 'Description 1';
        @Input() public state: string = 'Active';
        @Input() public upvotes: string = '632';
        @Input() public downvotes: string = '32';
        @Input() public imageUrl: string = "assets/images/projects/project-1.jpg";

        upvote(){

        }

        downvote(){

        }
}


