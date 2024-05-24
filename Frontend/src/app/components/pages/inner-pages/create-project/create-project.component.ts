import { Component } from '@angular/core';
import { Web3Service } from 'src/app/web3.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss'
})
export class CreateProjectComponent {
    projectTitle: string = '';
    projectDescription: string = '';
    fundsNeeded: string = '';

    constructor(private web3: Web3Service) {

    }


    createProject() {
        this.web3.createProject(this.projectTitle, this.projectDescription, this.fundsNeeded);
        console.log('Creating new project...');
    }
}
