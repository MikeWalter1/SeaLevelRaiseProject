import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-what-will-get',
    templateUrl: './what-will-get.component.html',
    styleUrls: ['./what-will-get.component.scss']
})
export class WhatWillGetComponent implements OnInit {

    constructor(
        public router: Router
    ) { }

    ngOnInit(): void {}

}