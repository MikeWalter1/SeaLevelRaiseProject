import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';

@Component({
    selector: 'app-partner',
    templateUrl: './partner.component.html',
    styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnInit {

    constructor(
        public router: Router
	) { }

    ngOnInit(): void {}

    partnerSlides: OwlOptions = {
		loop: true,
		margin: 30,
		nav: false,
		dots: false,
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 2
			},
			516: {
				items: 3
			},
			695: {
				items: 4
			},
			992: {
				items: 5
			},
			1200: {
				items: 6
			}
		}
    }

}