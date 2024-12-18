import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SortDescriptor } from "@progress/kendo-data-query";
import { GridService } from '../../services/grid/grid.service';
import { PaginationEto } from '../../../components/models/pageRequest';
import { LoaderService } from '../../services/loader/loader.service';
import { CellClickEvent } from '@progress/kendo-angular-grid';
import { RowClassArgs } from "@progress/kendo-angular-grid";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})

export class GridComponent implements OnInit {
  @Input() gridView: any;
  @Input() gridData: any;
  @Input() gridColumns: any;
  @Input() pagination!: PaginationEto;
  @Input() pageSize!: number;
  @Input() threeDotMenu = false;
  @Input() checkBoxSelection = true;
  @Input() accessFlag: any;
  @Output() sendSortData: EventEmitter<any> = new EventEmitter();
  @Output() sendscrollData: EventEmitter<any> = new EventEmitter();
  @Output() actionMenuEmitter: EventEmitter<any> = new EventEmitter();
  @Output() actionAccessMenuEmitter: EventEmitter<any> = new EventEmitter();
  @Output() sendRowDataEmitter: EventEmitter<any> = new EventEmitter();
  @Output() sendRowClickedEvent: EventEmitter<any> = new EventEmitter();
  @Output() emitOnRequestEvent : EventEmitter<any> =  new EventEmitter();
  mySelection: string[] = [];
  selectedRecordList: any[] = [];
  gridColumnsData: any[] = [];
  gridColumnsTitle: any[] = [];
  sort: SortDescriptor[] = [];
  allSelected = false;
  rowSelected = false;
  hasAllError = false;
  constructor(private gridService: GridService, private loaderService: LoaderService) { }

  ngOnInit() {
    console.log('New grid data ---',this.gridData);
    console.log('accesFlag--', this.accessFlag)
    this.gridView = JSON.parse(JSON.stringify(this.gridData));
    let newdata: any[] = [];
    this.gridColumns.map((uiColumn: any) => {
      if (this.gridView.length > 0) {
        if ((Object.keys(this.gridView[0])).includes(uiColumn.id) || uiColumn.isCustomColumn) {
          newdata.push({
            id: uiColumn.id,
            name: uiColumn.name,
            operator: "contains",
            default: uiColumn.default,
            width: uiColumn.width,
            checked: uiColumn.checked,
            order: uiColumn.order,
            hasIcon: uiColumn.hasIcon,
            icon: uiColumn.icon ? uiColumn.icon : '',
            hasTooltip: uiColumn.hasTooltip,
            toolTipIcon: uiColumn.toolTipIcon ? uiColumn.toolTipIcon : '',
            hasCustomIcon : uiColumn.hasCustomIcon ? uiColumn.hasCustomIcon : '',
            customIcon : uiColumn.customIcon ? uiColumn.customIcon :  ''
          });
        }
        newdata.sort((a, b) => a.order - b.order);
        this.deSelectDataGridRow();
      }
    });
    this.gridColumnsTitle = newdata;
    this.gridColumnsData = newdata.filter((col) => col.checked);
  }

  deSelectDataGridRow(){
    this.gridService.deSelectGridRow.subscribe((gridRow) => {
      if (gridRow.length === 0) {
        this.selectedRecordList.forEach((item: any) => {
          item.checked = false;
          item.isIndeterminate = false;
        })
        this.selectedRecordList = [];
      } else {
        this.unCheckGridRow(gridRow);
      }
    })
  }

  unCheckGridRow(gridRow:any[]) {
    this.gridData.forEach((item:any) => {
      const match = gridRow.find(study => study.StudyID === item.StudyID);
      if (match) {
        item.checked = true;
      }else{
        item.checked = false;
        item.isIndeterminate = false;
        this.selectedRecordList = this.selectedRecordList.filter((row:any) => row.StudyID !== item.StudyID);
      }
    });
  }

  showSelectedColumns(columns: any[]) {
    this.gridColumnsData = columns;
  }

  showResetColumns(event: any[]) {
    this.gridColumnsData = event;
  };

  selectAllDataRows(allrowsData: any, checkboxStatus: boolean) {
    this.allSelected = !this.allSelected;
    if(!checkboxStatus){
      this.gridData.forEach((record:any) => {
        record.isIndeterminate =  this.allSelected;
    });
    }
    if (this.allSelected != undefined && this.allSelected === true) {
      this.selectedRecordList.splice(0, this.selectedRecordList.length);
      this.selectedRecordList.push(...allrowsData);
    } else {
      this.selectedRecordList.splice(0, this.selectedRecordList.length);
    }
    this.selectedRecordList = this.selectedRecordList.filter(record =>record.DataSources.some((dataSource: any) => dataSource.access === true));
    this.gridService.findDatasubject.next(this.selectedRecordList);
    this.selectedRecordList.forEach(record => {
      record.isIndeterminate = false;
      record.checked = true;
      if(this.shouldShowIndeterminate(record)){
        record.isIndeterminate = true;
      }else{
        record.isIndeterminate = false;
      }
  });
  };

  onDataSelection(selectedRecord: any, rowSelected: any, checkboxStatus: boolean) {
    rowSelected = !rowSelected;
    if (selectedRecord.checked === true) {
      this.selectedRecordList.push(selectedRecord);
    } else {
      this.selectedRecordList = this.selectedRecordList.filter(
        (record) => this.validateUniqueID(record, selectedRecord)
        // record?StudyID !== selectedRecord?.StudyID
      );
    }
    this.gridService.findDatasubject.next(this.selectedRecordList);
    if(checkboxStatus){
      selectedRecord.isIndeterminate =  false;
    if(this.shouldShowIndeterminate(selectedRecord)){
      selectedRecord.isIndeterminate =  true;
    }else{
      selectedRecord.isIndeterminate =  false;
    }
  }else{
    selectedRecord.isIndeterminate =  false;
    selectedRecord.checked = false;
  }
}

  sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.sendSortData.emit(sort[0]);
  };

  loadMoreData(): void {
    this.loaderService.showLoader();
    this.sendscrollData.emit(this.pagination.page);
  };

  openMenu(event: Event, dataItem: any, rowIndex: number): void {
    this.actionMenuEmitter.emit({
      event,
      data: dataItem,
      anchor: rowIndex
    });
    this.actionAccessMenuEmitter.emit({
      event,
      data: dataItem,
      anchor: rowIndex
    });
  }

  onRowClick(event: CellClickEvent) {
      const clickedRowData = event.dataItem;
      this.sendRowDataEmitter.emit(clickedRowData);
      this.sendRowClickedEvent.emit(event);
  }

  validateUniqueID(item: any, row: any) {
    if (row.StudyID) {
      return item.StudyID !== row.StudyID;
    } else if (row.Subject_Unq_ID) {
      return item.Subject_Unq_ID !== row.Subject_Unq_ID;
    } else if (row.File_Unq_ID) {
      return item.File_Unq_ID !== row.File_Unq_ID;
    } else if (row.ARDUniqID) {
      return item.ARDUniqID !== row.ARDUniqID;
    }
    return;
  }

  isRowSelected(row: any, i :number): boolean {
    return this.selectedRecordList.includes(row);
  }

  isAllRowsSelected(): boolean {
    return this.selectedRecordList.length === this.gridData.length; 
  }


  shouldShowWarning(data: any){
    if(this.checkBoxSelection){
      const isAccess = data?.DataSources?.every((item:any) => !item.access);
      return isAccess;
    }
  }

  shouldShowIndeterminate(record:any) {
    const hasSomeDataSourceAccess = record.DataSources?.some((dataSource:any) => !dataSource.access);
    return hasSomeDataSourceAccess;
}

  isRequest(dataItem: any) {
    if(this.checkBoxSelection)
    return dataItem.DataSources.some((item:any) => !item.access && !item.requested);
  }
  
  isRequested(dataItem: any) {
    if(this.checkBoxSelection)
    return dataItem.DataSources.some((item:any) => !item.access && item.requested);
  }

  public rowCallback = (context: RowClassArgs) => {
    if (context?.dataItem?.DataSources?.length >= 0 ) {
      return { disableRowClass: true };
    } 
    return {}
  }

  onRequest(){
    this.emitOnRequestEvent.emit();
  }

  ngOnDestroy(){
    this.gridData.forEach((item:any)=>{
      item.checked = false;
      item.isIndeterminate = false;
    })
  }
}
