import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/project';
import { Web3Service } from 'src/app/web3.service';

@Component({
	selector: 'app-project-details-page',
	templateUrl: './project-details-page.component.html',
	styleUrls: ['./project-details-page.component.scss']
})
export class ProjectDetailsPageComponent implements OnInit {

	days: any;
    hours: any;
    minutes: any;
    seconds: any;
    myInterval: any;
    @Input() public projectId: string = '0';
    @Input() public projectTitle: string = 'Placeholder Title';
    @Input() public projectDescription: string = 'Placeholder Description';
    @Input() public fundsNeeded: string = '1200';
    @Input() public totalDonations: string = '632';
    @Input() public votingAmount:string = '0';
    public project: Project;
    public donatedInPercent: number = 0;

    public donationAmount: string = '0';

    constructor(private web3: Web3Service) {
        this.project = this.web3.selectedProject;
        this.donatedInPercent = Math.floor((((parseInt(this.project.totalDonations) / parseInt(this.project.fundsNeeded)) * 100))* 10) / 10;
    }

    ngOnInit() {
        this.myInterval = setInterval(() => {
            this.commingSoonTime();
        }, 0);
    }

    commingSoonTime = () => {
        const endTimeParse = (Date.parse('March 20, 2024 17:00:00 PDT')) / 1000;
        const now = new Date();
        const nowParse = (Date.parse(now.toString()) / 1000);
        const timeLeft = endTimeParse - nowParse;
        const days = Math.floor(timeLeft / 86400);
        let hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        let minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
        let seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
        if (hours < 10) { hours = 0 + hours; }
        if (minutes < 10) { minutes = 0 + minutes; }
        if (seconds < 10) { seconds = 0 + seconds; }
        this.days = days;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    voteForProject(){
        this.web3.voteForProject(+this.project.id, +this.votingAmount);
        console.log('Voting for project with ID: ' + this.projectId + " and amount: " + this.votingAmount);
    }

    donateToDao(){
        this.web3.transferEtherToContract(+this.donationAmount);
        console.log('Donating to DAO with amount: ' + this.donationAmount);
    }

    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

}
