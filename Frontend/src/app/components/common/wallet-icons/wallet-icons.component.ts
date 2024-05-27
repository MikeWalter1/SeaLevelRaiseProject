
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet-icons',
  templateUrl: './wallet-icons.component.html',
  styleUrl: './wallet-icons.component.scss'
})
export class WalletIconsComponent {

    constructor(
        public router: Router
	) { }

    ngOnInit(): void {}

    projectsSlides: OwlOptions = {
		nav: false,
		loop: true,
		margin: 30,
		dots: false,
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: false,
		navText: [
			"<i class='ri-arrow-left-s-line'></i>",
			"<i class='ri-arrow-right-s-line'></i>",
		],
		responsive: {
			0: {
				items: 4
			},
			510: {
				items: 3
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
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: false,
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
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: false,
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

