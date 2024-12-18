import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-workflow-card',
  templateUrl: './workflow-card.component.html',
  styleUrl: './workflow-card.component.scss'
})
export class WorkflowCardComponent {

  @Input() card: any;
  @Output() cardSelected = new EventEmitter<void>();

  selectCard() {
    this.cardSelected.emit();
  
  }
}
