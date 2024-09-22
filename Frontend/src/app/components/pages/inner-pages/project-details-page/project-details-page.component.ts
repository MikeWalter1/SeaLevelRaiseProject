import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/project';
import { Web3Service } from 'src/app/web3.service';
import { MatDialog } from '@angular/material/dialog';
import { DonateDialogComponent } from 'src/app/components/common/donate-dialog/donate-dialog.component';

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
    public amount: number;

    public votingAmount:string = '0';
    public project: Project;
    public donatedInPercent: number = 0;
    public donationAmount: string = '0';
    public balance: any;

    constructor(private web3: Web3Service, public dialog: MatDialog) {
        this.project = this.web3.selectedProject;
        this.donatedInPercent = Math.floor((((parseInt(this.project.totalDonations) / parseInt(this.project.fundsNeeded)) * 100))* 10) / 10;
        this.balance = this.web3.donorBalance;
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
        this.web3.voteForProject(Number(this.project.id), Number(this.amount));
        console.log('Voting for project with ID: ' + this.project.id + " and amount: " + this.amount);
    }

    donateToDao(){
        this.web3.transferEtherToContract(+this.amount);
        console.log('Donating to DAO with amount: ' + this.amount);
    }

    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }


    openVotingDialog(): void {
        console.log(this.web3.donorBalance);
        const dialogRef = this.dialog.open(DonateDialogComponent, {
          width: '300px',
          height: '220px',
          data: {
            title: "Spend Voting Tokens",
            buttonText: "Vote",
            amount: this.amount,
            balance: this.web3.donorBalance
        }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.amount = result;
          this.voteForProject();
        });

    }
    openDonationDialog(): void {
        const dialogRef = this.dialog.open(DonateDialogComponent, {
          width: '300px',
          height: '220px',
          data: {
            title: "Donate ETH to DAO",
            buttonText: "Donate",
            amount: this.amount,
            balance: this.web3.donorBalance
        }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.amount = result;
          this.donateToDao();
        });

    }

}
