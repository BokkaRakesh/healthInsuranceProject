import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Align } from '@progress/kendo-angular-popup';

export interface TablePopUp {
  label: string;
  action: string;
}

@Component({
  selector: 'app-table-pop-up',
  templateUrl: './table-pop-up.component.html',
  styleUrl: './table-pop-up.component.scss'
})
export class TablePopUpComponent implements OnInit{

  @Input() items: TablePopUp[] = [];
  @Input() anchor: ElementRef | undefined;
  @Input() animate = false;
  @Input() anchorAlign: Align = { vertical: 'bottom', horizontal: 'left' };
  @Input() popupAlign: Align = { vertical: 'top', horizontal: 'left' };
  @Output() itemClick = new EventEmitter<string>();
  ngOnInit() {
    console.log('items---',this.items);
  }
  // Emit the selected item action to the parent component
  onItemClick(action: string) {
    this.itemClick.emit(action);
  }

  isDuplicate(item: TablePopUp): boolean {
    return item.label === 'Duplicate';
  }
}
