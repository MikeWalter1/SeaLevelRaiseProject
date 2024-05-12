import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-video-presentation',
    templateUrl: './video-presentation.component.html',
    styleUrls: ['./video-presentation.component.scss']
})
export class VideoPresentationComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {}

    // Video Popup
    isOpen = false;
    openPopup(): void {
        this.isOpen = true;
    }
    closePopup(): void {
        this.isOpen = false;
    }

}