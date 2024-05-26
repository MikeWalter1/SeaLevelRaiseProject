import { Component, OnInit } from '@angular/core';
import { Web3Service } from './../../../../web3.service';
import { Project, ProjectState } from 'src/app/project';

@Component({
    selector: 'app-projects-page',
    templateUrl: './projects-page.component.html',
    styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {
    ProjectState = ProjectState;
    public newProjects: Project[] = [];
    // public projects: any[] = [];
    testProjects: any;

    constructor(private web3: Web3Service) {
        this.update();
    }

    ngOnInit(): void {}


    async update(){
        this.testProjects = await this.web3.getAllProjects();
        this.newProjects = (await this.web3.getAllProjects());
        console.log(this.newProjects);
        // this.projects.length = 0;
        // console.log(this.testProjects);
        // for (let index = 0; index < this.testProjects.names.length; index++) {
        //     const name = this.testProjects.names[index];
        //     let d = ProjectState[this.testProjects.state[index];
        //     // this.projects.push({
        //     //     id: this.testProjects.projectIds[index],
        //     //     title: this.testProjects.names[index], description: this.testProjects.descriptions[index],
        //     //     fundsNeeded: this.testProjects.goals[index],
        //     //     totalDonations: this.testProjects.currentFundings[index],
        //     //     imageUrl: "assets/images/projects/project-"+this.getRandomInt(1, 9).toString()+".jpg"});
        //         this.newProjects.push(new Project(
        //             this.testProjects.projectIds[index],
        //             this.testProjects.names[index],
        //             this.testProjects.descriptions[index],
        //             this.testProjects.goals[index],
        //             this.testProjects.currentFundings[index],
        //             "assets/images/projects/project-"+this.getRandomInt(1, 9).toString()+".jpg",
        //             this.testProjects.states[index]));
        // }
        // console.log(this.projects);
    }

    filterByState(state: ProjectState) {
        return this.newProjects.filter(project => project.state === state);
    }

    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

    getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }

}
