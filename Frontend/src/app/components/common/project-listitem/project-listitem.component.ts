import { Component, Input} from '@angular/core';
import { Web3Service } from 'src/app/web3.service';
import { Project } from 'src/app/project';
import { ProjectState } from 'src/app/project';

@Component({
  selector: 'app-project-listitem',
  templateUrl: './project-listitem.component.html',
  styleUrl: './project-listitem.component.scss'
})
export class ProjectListitemComponent {
    @Input() public project: Project;

    constructor(private web3: Web3Service) {

    }

    selectProject(){
        this.web3.selectProject(this.project);
        console.log("project was set");
    }
}
