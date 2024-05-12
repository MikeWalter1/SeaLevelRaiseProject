import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-ecosystem',
    templateUrl: './ecosystem.component.html',
    styleUrls: ['./ecosystem.component.scss']
})
export class EcosystemComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {}

    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

}