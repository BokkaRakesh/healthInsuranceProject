import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.scss'
})
export class ExpansionPanelComponent {

  @Input() title = '';
  @Input() requestAccess = false;
  @Input() icon = '';
  @Output() requestAccessClick = new EventEmitter<void>();

  isExpanded: boolean = false; 

  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
  }

  onRequestAccess() {
    this.requestAccessClick.emit();
  }
}
