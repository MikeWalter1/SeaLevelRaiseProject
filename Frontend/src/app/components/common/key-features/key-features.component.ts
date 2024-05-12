import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-key-features',
    templateUrl: './key-features.component.html',
    styleUrls: ['./key-features.component.scss']
})
export class KeyFeaturesComponent implements OnInit {

    constructor(
        public router: Router
    ) { }

    ngOnInit(): void {}

}