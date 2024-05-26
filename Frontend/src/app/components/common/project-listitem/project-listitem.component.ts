import { Component, Input} from '@angular/core';
import { Web3Service } from 'src/app/web3.service';
import { Project } from 'src/app/project';

@Component({
  selector: 'app-project-listitem',
  templateUrl: './project-listitem.component.html',
  styleUrl: './project-listitem.component.scss'
})
export class ProjectListitemComponent {
    // @Input() public projectId: string = '0';
    // @Input() public projectTitle: string = 'Placeholder Title';
    // @Input() public projectDescription: string = 'Placeholder Description';
    // @Input() public fundsNeeded: string = '1200';
    // @Input() public totalDonations: string = '632';
    // @Input() public imageUrl: string = '';
    @Input() public project: Project;

    constructor(private web3: Web3Service) {

    }

    selectProject(){
        // const project = new Project(this.projectId, this.projectTitle, this.projectDescription, this.fundsNeeded, this.totalDonations, this.imageUrl);
        this.web3.selectProject(this.project);
        console.log("project was set");
        // console.log(project);
    }
}
