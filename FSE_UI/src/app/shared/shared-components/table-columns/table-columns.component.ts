import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GridService } from '../../services/grid/grid.service';

export interface TableColumnList {
  name: string,
  id: string,
  default: boolean,
  checked: boolean,
  width: number,
  order: number
}

export interface TableSelectedList {
  field: string,
  operator: string,
  checked: boolean
}

@Component({
  selector: 'app-table-columns',
  templateUrl: './table-columns.component.html',
  styleUrl: './table-columns.component.scss'
})
export class TableColumnsComponent implements OnInit {
  
  @Input() gridColumns: any[] = [];
  @Output() selectedColumn = new EventEmitter<any>();
  @Output() resetColumns =  new EventEmitter<any>();
  @ViewChild("gear", { read: ElementRef }) public gear!: ElementRef;
 @ViewChild("popup", { read: ElementRef }) public popup!: ElementRef; 
  isColumnMenuVisible: boolean = false;
  tableDropdownList: any[] = [];
  selectedColList: TableSelectedList[] =[];
  columns: any;
  columnTitle: any;
  isAnyCheckboxSelected = true;
  @HostListener("document:click", ["$event"])
  public documentClick(event: KeyboardEvent): void {
    if (!this.contains(event.target)) {
      this.isColumnMenuVisible = false;
    }
  }
  constructor(private gridservice: GridService) {
  }

  ngOnInit(): void {
    this.tableDropdownList = JSON.parse(JSON.stringify(this.gridColumns.filter((item=> item.id !== 'customAccess'))));
  }

  applySelection() {
    this.selectedColumn.emit(this.tableDropdownList.filter((col) => col.checked));
    this.isColumnMenuVisible = !this.isColumnMenuVisible;
  };

  resetSelection() {
    this.tableDropdownList = JSON.parse(JSON.stringify(this.gridColumns));
    this.resetColumns.emit(this.tableDropdownList.filter((col) => col.checked));
    this.isColumnMenuVisible = !this.isColumnMenuVisible;
  };
  
  openWorkflow() {
    this.isColumnMenuVisible = !this.isColumnMenuVisible;
  }

  onCheckboxClick() {
    this.isAnyCheckboxSelected = this.tableDropdownList.some(item => item.checked);
  }

  contains(target: any): boolean {
    return (
      this.gear?.nativeElement.contains(target) ||
      (this.popup ? this.popup.nativeElement.contains(target) : false)
    );
  }

}
