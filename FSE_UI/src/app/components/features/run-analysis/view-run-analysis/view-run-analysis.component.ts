import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoaderService } from '../../../../shared/services/loader/loader.service';
import { RunAnalysisAlgoCatalogService } from '../services/run-analysis-algo-catalog.service';
import ViewRunAnalysisColumns from '../../../../../assets/columnDefinition/view-run-analysis-column.json';
import { PaginationEto } from '../../../models/pageRequest';
import { SortDescriptor } from '@progress/kendo-data-query';
import { TablePopUp } from '../../../../shared/shared-components/table-pop-up/table-pop-up.component';
import { Align } from '@progress/kendo-angular-popup';

@Component({
  selector: 'app-view-run-analysis',
  templateUrl: './view-run-analysis.component.html',
  styleUrl: './view-run-analysis.component.scss'
})
export class ViewRunAnalysisComponent implements OnInit {
  gridColumnsData: any  = ViewRunAnalysisColumns;
  @Input() paginationDetailFiles!: PaginationEto;
  @Output() actionDialogEmitter = new EventEmitter();
  @Output() actionMenuEmitter: EventEmitter<any> = new EventEmitter();
  @Output() filesSortEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() filesNextPageEmitter: EventEmitter<number> = new EventEmitter<number>();
  gridData: any[] = [];
  pagination!: PaginationEto;
  rowPopUp!: ElementRef;
  rowData: any;
  showRowPopup = false;
  showAlgoPopup = false;
  showGrid = false;
  menuItems: TablePopUp[] = [
    { label: 'View Details', action: 'viewDetails' },
    { label: 'Download Files', action: 'downloadFiles' },
    { label: 'Download Log', action: 'downloadLog' },
    { label: 'Download Configuration', action: 'downloadConfiguration' }
  ];
  anchorAlign: Align = { vertical: 'bottom', horizontal: 'right' };
  popupAlign: Align = { vertical: 'top', horizontal: 'right' };

  constructor(private loaderService: LoaderService, private runAnalysisAlgoCatalogService: RunAnalysisAlgoCatalogService){
  }

  ngOnInit(){
    this.loaderService.showLoader();
    const payload = {
      "sort": {
        "field": "algoanalysisuniqid",
        "order": "ASC"
      },
      "pagination": {
        "currentPage": 1
      }
    }

    this.runAnalysisAlgoCatalogService.getViewAnalysisData(payload).subscribe((files) => {
      this.gridData.push(...this.prepareDataForGrid(files.data.items));
      console.log('files.data.items:',files.data.items);
      console.log('this.gridData:',this.gridData);
      this.pagination = files.data.pagination;
      console.log('this.pagination:',this.pagination);
      this.showGrid = true;
    });
  }
  prepareDataForGrid(gridData: any[]) {
    gridData.forEach((algo) => {
      const initials = `${algo.createdby.split(' ')[0].charAt(0)}${algo.createdby.split(' ')[1].charAt(0)}`
      algo.createdby = initials
    });
    console.log('gridDatashort:',gridData);
    return gridData;
  }

  close(){
    this.actionDialogEmitter.emit(false);
  }

  getSortedData(event: SortDescriptor) {
    const sort = {
      field: event.field,
      order: event?.dir?.toUpperCase()
    }
    this.filesSortEmitter.emit(sort);
  }

  
  openRowMenu(element: any): void {
    const clickedElement = element.event.target;
    console.log('viewAnalysis Data: ', element.data);
    this.actionMenuEmitter.emit(element.data);
    this.actionDialogEmitter.emit(false);
    this.rowData = element.data;
    if (this.rowPopUp === clickedElement && this.showRowPopup) {
      this.showRowPopup = false;
    } else {
      this.rowPopUp = clickedElement;
      this.showRowPopup = true;
    }
  }

  getPaginatedData(pageNumber: number) {
    this.filesNextPageEmitter.emit(this.paginationDetailFiles.page);
  }

}
