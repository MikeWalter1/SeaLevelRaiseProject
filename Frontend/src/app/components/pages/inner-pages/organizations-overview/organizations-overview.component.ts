import { Component } from '@angular/core';
import { Web3Service } from 'src/app/web3.service';


@Component({
  selector: 'app-organizations-overview',
  templateUrl: './organizations-overview.component.html',
  styleUrl: './organizations-overview.component.scss'
})
export class OrganizationsOverviewComponent {

    constructor(private web3: Web3Service) {
        this.getAllOrganizations();
    }

    async getAllOrganizations() {
        this.organizations.length = 0;
        const orgas = await this.web3.getAllOrganizations();
        console.log(orgas);
        if (orgas == undefined) {
            return;
        }
        for (let index = 0; index < orgas.ids.length; index++) {
            // const name = orgas.names[index];
            // console.log(orgas.downvotes[index]);
            this.organizations.push({
                id: orgas.ids[index],
                name: orgas.names[index],
                description: orgas.descriptions[index],
                state: orgas.states[index],
                upvotes: orgas.upvotes[index],
                downvotes: orgas.downvotes[index],
                imageUrl: "assets/images/flag/flag-"+this.getRandomInt(1, 6).toString()+".png"});
        }
    }

    receiveMessage($event: any) {
        this.getAllOrganizations();
    }

    organizations = [{
        id: '0',
        name: 'Organization 1',
        description: 'Description 1',
        state: 'Active',
        upvotes: '632',
        downvotes: '32',
        imageUrl: "assets/images/projects/project-1.jpg"
    },
    {
        id: '0',
        name: 'Organization 1',
        description: 'Description 1',
        state: 'Active',
        upvotes: '632',
        downvotes: '32',
        imageUrl: "assets/images/projects/project-1.jpg"
    },
    {
        id: '0',
        name: 'Organization 1',
        description: 'Description 1',
        state: 'Active',
        upvotes: '632',
        downvotes: '32',
        imageUrl: "assets/images/projects/project-1.jpg"
    },
    {
        id: '0',
        name: 'Organization 1',
        description: 'Description 1',
        state: 'Active',
        upvotes: '632',
        downvotes: '32',
        imageUrl: "assets/images/projects/project-1.jpg"

    },
    {
        id: '0',
        name: 'Organization 1',
        description: 'Description 1',
        state: 'Active',
        upvotes: '632',
        downvotes: '32',
        imageUrl: "assets/images/projects/project-1.jpg"
    }];

    getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }


}

