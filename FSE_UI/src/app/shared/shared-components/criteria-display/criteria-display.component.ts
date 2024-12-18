import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-criteria-display',
  templateUrl: './criteria-display.component.html',
  styleUrl: './criteria-display.component.scss'
})
export class CriteriaDisplayComponent {

  @Input() inclusionCriteria: any[] = [];
  @Input() exclusionCriteria: any[] = [];
}
