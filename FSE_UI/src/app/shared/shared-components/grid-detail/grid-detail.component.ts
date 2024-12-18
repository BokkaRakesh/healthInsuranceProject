import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SortDescriptor } from '@progress/kendo-data-query/dist/npm/sort-descriptor';
import { GridService } from '../../services/grid/grid.service';
import { LoaderService } from '../../services/loader/loader.service';
import { CellClickEvent, GridComponent } from '@progress/kendo-angular-grid';
import { PaginationEto } from '../../../components/models/pageRequest';

@Component({
  selector: 'app-grid-detail',
  templateUrl: './grid-detail.component.html',
  styleUrl: './grid-detail.component.scss'
})
export class GridDetailComponent implements OnInit {
  @Input() gridView: any;
  @Input() gridData: any;
  @Input() gridColumns: any;
  @Input() pagination!: PaginationEto;
  @Input() pageSize!: number;
  @Input() redirectIcon = false;
  @Input() accessFlag: any;
  @Output() sendSortData: EventEmitter<any> = new EventEmitter();
  @Output() sendscrollData: EventEmitter<any> = new EventEmitter();
  @Output() actionMenuEmitter: EventEmitter<any> = new EventEmitter();
  @Output() actionAccessMenuEmitter: EventEmitter<any> = new EventEmitter();
  @Output() sendRowDataEmitter: EventEmitter<any> = new EventEmitter();
  @ViewChild('grid') grid!: GridComponent;
  selectedRecordList: any[] = [];
  gridColumnsData: any[] = [];
  gridColumnsTitle: any[] = [];
  sort: SortDescriptor[] = [];
  rowSelected = false;
  hasAllError = false;
  nestColumns = [
    {
      id: 'algo_version_name',
      name: 'Algorith version name'
    },
    {
      id: 'createdat',
      name: 'Created'
    },
    {
      id: 'updatedat',
      name: 'Last Updated'
    },
    {
      id: 'distribution',
      name: 'Distribution'
    },
    {
      id: 'version',
      name: 'Version'
    },
    {
      id: 'analysis_count',
      name: 'Analysis Run'
    }
  ]
  constructor(private gridService: GridService, private loaderService: LoaderService) { }

  ngOnInit() {
    this.gridView = JSON.parse(JSON.stringify(this.gridData));
    let newdata: any[] = [];
    this.gridColumns.map((uiColumn: any) => {
      if (this.gridView.length > 0) {
        if ((Object.keys(this.gridView[0])).includes(uiColumn.id)) {
          newdata.push({
            id: uiColumn.id,
            name: uiColumn.name,
            operator: 'contains',
            default: uiColumn.default,
            width: uiColumn.width,
            checked: uiColumn.checked,
            order: uiColumn.order,
            hasIcon: uiColumn.hasIcon,
            icon: uiColumn.icon ? uiColumn.icon : '',
            hasTooltip: uiColumn.hasTooltip,
            toolTipIcon: uiColumn.toolTipIcon ? uiColumn.toolTipIcon : '',
            displayAsDot: uiColumn.displayAsDot ? uiColumn.displayAsDot : false,
            displayAsCount: uiColumn.displayAsCount ? uiColumn.displayAsCount : false
          });
        }
        newdata.sort((a, b) => a.order - b.order);
      }
    });
    this.gridColumnsTitle = newdata;
    this.gridColumnsData = newdata.filter((col) => col.checked);
  }

  showSelectedColumns(columns: any[]) {
    this.gridColumnsData = columns;
  }

  showResetColumns(event: any[]) {
    this.gridColumnsData = event;
  };

  onDataSelection(selectedRecord: any, rowSelected: any) {
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
  };

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
      data: dataItem,
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

  expandAllRows(): void {
    const gridDataItems = this.gridData;
    gridDataItems.forEach((item: any, index: any) => {
      const rowIndex = index;
      this.grid.expandRow(rowIndex);
    });
  }

  showDetailView(dataItem: any) {
    return dataItem.versions.length > 0;
  }
}
