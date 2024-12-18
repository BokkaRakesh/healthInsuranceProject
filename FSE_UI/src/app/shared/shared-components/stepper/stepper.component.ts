import { Component } from '@angular/core';
import { bookIcon, eyeIcon, fileAddIcon, paperclipIcon, userIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent {
  current = 1;
  backgroundColor : string = '#FFFFFF';

  steps = [
    { label: "Find Data", value: "1" },
    { label: "Create IDP", value: "2" },
  ];
}
