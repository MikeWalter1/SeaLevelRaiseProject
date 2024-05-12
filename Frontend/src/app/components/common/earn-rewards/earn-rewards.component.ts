import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-earn-rewards',
    templateUrl: './earn-rewards.component.html',
    styleUrls: ['./earn-rewards.component.scss']
})
export class EarnRewardsComponent implements OnInit {

    constructor(
        public router: Router
    ) { }

    ngOnInit(): void {}

}