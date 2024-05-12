import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

    constructor(
        public router: Router
	) { }

    ngOnInit(): void {}

    projectsSlides: OwlOptions = {
		nav: true,
		loop: true,
		margin: 30,
		dots: false,
		autoplay: false,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-s-line'></i>",
			"<i class='ri-arrow-right-s-line'></i>",
		],
		responsive: {
			0: {
				items: 1
			},
			510: {
				items: 2
			},
			768: {
				items: 2
			},
			860: {
				items: 3
			},
			930: {
				items: 3
			},
			1080: {
				items: 3
			},
			1200: {
				items: 3
			},
			1500: {
				items: 3
			}
		}
    }
	completedSlides: OwlOptions = {
		items: 1,
		nav: true,
		loop: true,
		margin: 30,
		dots: false,
		autoplay: false,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-s-line'></i>",
			"<i class='ri-arrow-right-s-line'></i>",
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
			992: {
				items: 3
			},
			1200: {
				items: 3
			}
		}
    }
    projectsSlider: OwlOptions = {
		loop: true,
		margin: 0,
		nav: true,
		dots: false,
		autoplay: false,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-s-line'></i>",
			"<i class='ri-arrow-right-s-line'></i>",
		],
		responsive: {
			0: {
				items: 1
			},
			515: {
				items: 2
			},
			720: {
				items: 2
			},
			960: {
				items: 3
			},
			1200: {
				items: 4
			}
		}
    }

}