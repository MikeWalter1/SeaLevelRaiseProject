import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-roadmap',
    templateUrl: './roadmap.component.html',
    styleUrls: ['./roadmap.component.scss']
})
export class RoadmapComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {}

    roadmapSlides: OwlOptions = {
		nav: true,
		loop: true,
		margin: 30,
		dots: true,
		autoplay: false,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		navText: [
			"Past <i class='ri-arrow-left-s-line'></i>",
			"Future <i class='ri-arrow-right-s-line'></i>",
		],
		responsive: {
			0: {
				items: 1
			},
			510: {
				items: 2
			},
			695: {
				items: 2
			},
			935: {
				items: 3
			},
			1175: {
				items: 4
			},
			1450: {
				items: 5
			},
			1550: {
				items: 6
			}
		}
    }

}