import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PaginationEto } from '../../../../models/pageRequest';
import ardInsightsColumns from '../../../../../../assets/columnDefinition/ard-insights-columns.json';
import { TablePopUp } from '../../../../../shared/shared-components/table-pop-up/table-pop-up.component';
import { Align } from '@progress/kendo-angular-popup';
import { SortDescriptor } from '@progress/kendo-data-query';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { CreateArdDialogComponent } from '../../../create-ard/components/create-ard-dialog/create-ard-dialog.component';
import { LoaderService } from '../../../../../shared/services/loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { CreateArdRequestEto } from '../../../../models/ardEto';
import { ArdRestService } from '../../../../services/ard-rest.service';
import { GridService } from '../../../../../shared/services/grid/grid.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ard-insights',
  templateUrl: './ard-insights.component.html',
  styleUrl: './ard-insights.component.scss'
})
export class ArdInsightsComponent implements OnInit {
  @Input() paginationDetailFiles!: PaginationEto;
  @Input() isARDNavigated: boolean = false;
  @ViewChild('tablePopUp') tablePopUp!: ElementRef;
  @Output() filesSortEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() filesNextPageEmitter: EventEmitter<number> = new EventEmitter<number>();
  rowPopUp!: ElementRef;
  rowData: any;
  gridData: any[] = [];
  pagination!: PaginationEto;
  gridColumns: any = ardInsightsColumns;
  menuItems: TablePopUp[] = [
    { label: 'View Details', action: 'viewDetails' },
    { label: 'Download Files', action: 'downloadFiles' },
    { label: 'Download Configuration', action: 'downloadConfiguration' }
  ];
  rowMenuItems: TablePopUp[] = [
    { label: 'Information', action: 'information' },
    { label: 'Version History', action: 'versionHistory' },
    { label: 'Create ARD', action: 'createArd' },
    { label: 'Run Analysis', action: 'runAnalysis' },
    { label: 'Export CSV', action: 'exportCsv' },
    { label: 'Download', action: 'download' },
    { label: 'Launch Viewer', action: 'launchViewer' }
  ];
  anchorAlign: Align = { vertical: 'bottom', horizontal: 'right' };
  popupAlign: Align = { vertical: 'top', horizontal: 'right' };
  showTablePopup = false;
  showRowPopup = false;
  idpID: any = '';
  ownerFlag = true;
  selectedRecords: any[] = [];
  showGrid = false;

  constructor(private ardRestService: ArdRestService, private dialogService: DialogService, private loaderService: LoaderService,
    private toastrService: ToastrService, private gridService: GridService, private route: ActivatedRoute, private router: Router) {
    this.idpID = this.route.snapshot.paramMap.get('idpId');
  }

  ngOnInit(): void {
    this.ardRestService.getArdInsightData().subscribe((files) => {
      this.gridData = files.data['items'];
      this.pagination = files.data['pagination'];
      this.showGrid = true;
    });
    console.log(' this.gridData:', this.gridData)

    this.gridService.findDatasubject.subscribe(records => {
      this.selectedRecords = records;
    });
  }

  getSortedData(event: SortDescriptor) {
    const sort = {
      field: event.field,
      order: event?.dir?.toUpperCase()
    }
    this.filesSortEmitter.emit(sort);
  }

  getPaginatedData(pageNumber: number) {
    this.filesNextPageEmitter.emit(this.paginationDetailFiles.page);
  }


  openCreateArdDialog() {
    const dialogRef: DialogRef = this.dialogService.open({
      content: CreateArdDialogComponent
    });
    dialogRef.result.subscribe((res) => {
      if (!(res instanceof DialogCloseResult)) {
        this.callCreateARD(res);
      }
    });
  }

  callCreateARD(ArdDetail: any) {
    this.loaderService.showLoader();
    const payload = {
      type: 'file',
      items: this.selectedRecords.map((subject) => {
        return subject.File_Unq_ID
      }),
      select_all: false,
      filter: [],
      name: ArdDetail?.name,
      updatable: ArdDetail?.updatable,
    } as CreateArdRequestEto;
    this.ardRestService.createArd(payload, this.idpID).subscribe((response) => {
      this.loaderService.hideLoader();
      if (response.status === 'success') {
        this.toastrService.success(response.message);
      }
      this.router.navigate(['home/idp-catalog/ard/ard-details', response.ARDUniqID, this.idpID]);
      console.log('Routing to New Page....');
    }, (error) => {
      this.loaderService.hideLoader();
      console.error('error.error', error.error);
      if (error.statusText === 'OK' && (error.error.text).toLowerCase().includes('duplicate')) {
        this.toastrService.error('Oops!! Selected Records already have been Created. Please try with other records.');
      }

    });
  }

  togglePopUp(): void {
    this.showTablePopup = !this.showTablePopup;
  }

  onPopupItemClick(action: string) {
    if (action === 'launchViewer') {
      window.open('https://ips-gip.apollo.roche.com/ohifv3/viewer?StudyInstanceUIDs=' + this.rowData?.DicomStudyinstanceuid, '_blank');
    }
  }

  openRowMenu(element: any): void {
    const clickedElement = element.event.target;
    console.log('dataItem: ', element.data);
    this.rowData = element.data;
    if (this.rowPopUp === clickedElement && this.showRowPopup) {
      this.showRowPopup = false;
    } else {
      this.rowPopUp = clickedElement;
      this.showRowPopup = true;
    }
  }

}
