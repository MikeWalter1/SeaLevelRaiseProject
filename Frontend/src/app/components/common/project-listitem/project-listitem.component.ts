import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-project-listitem',
  templateUrl: './project-listitem.component.html',
  styleUrl: './project-listitem.component.scss'
})
export class ProjectListitemComponent {
    @Input() public projectTitle: string = 'Placeholder Title';
    @Input() public projectDescription: string = 'Placeholder Description';
    @Input() public fundsNeeded: string = '1200';
    @Input() public totalDonations: string = '632';
    @Input() public imageUrl: string = '';
}
