import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { PaginationEto } from '../../../../models/pageRequest';
import * as ardsColumns from '../../../../../../assets/columnDefinition/idp-ards.json';
import { TablePopUp } from '../../../../../shared/shared-components/table-pop-up/table-pop-up.component';
import { Align } from '@progress/kendo-angular-popup';
import { SortDescriptor } from '@progress/kendo-data-query';
import { IdpHelperService } from '../../services/idp-helper.service';
import { IdpRestService } from '../../../../services/idp-rest.service';
import { ArdRestService } from '../../../../services/ard-rest.service';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { CreateArdDialogComponent } from '../../../create-ard/components/create-ard-dialog/create-ard-dialog.component';
import { LoaderService } from '../../../../../shared/services/loader/loader.service';
import { CreateArdRequestEto, ACCESS_CHECK, DuplicateArdResponseEto } from '../../../../models/ardEto';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { GridService } from '../../../../../shared/services/grid/grid.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-idp-ards',
  templateUrl: './idp-ards.component.html',
  styleUrl: './idp-ards.component.scss'
})
export class IdpArdsComponent {
  @Input() paginationDetailARD!: PaginationEto;
  idpID : any;
  @ViewChild('tablePopUp') tablePopUp!: ElementRef;
  @Output() subjectSortEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() subjectNextPageEmitter: EventEmitter<number> = new EventEmitter<number>();
  ardsResult!: any;
  rowPopUp!: ElementRef;
  gridData: any[] = [];
  filtersData: any[] = [];
  pagination!: PaginationEto;
  gridColumns: any = ardsColumns;

  tableMenuItems: TablePopUp[] = [
    { label: 'Export CSV', action: 'exportCsv' },
    { label: 'Download', action: 'download' }
  ];
  rowMenuItems: TablePopUp[] = [
    { label: 'Run Analysis', action: 'runAnalysis' },
    { label: 'Export CSV', action: 'exportCsv' },
    { label: 'Download', action: 'download' },
    { label: 'Access Control', action: 'accessControl' },
    { label: 'Duplicate', action: 'duplicate' },
    { label: 'Archive ARD', action: 'archiveArd' },
  ];
  anchorAlign: Align = { vertical: 'bottom', horizontal: 'right' };
  popupAlign: Align = { vertical: 'top', horizontal: 'right' };
  // showTablePopup = false;
  showRowPopup = false;
  selectedRecords: any[] = [];
  isChecked=false;
  accessFlag=false;
  ardId: any;
  showGrid : any;
  fetchDataInfo = false;

  constructor(private idpRestService: IdpRestService,private ardRestService: ArdRestService, private dialogService: DialogService,
    private loaderService: LoaderService, private toastrService: ToastrService,private idpHelperService: IdpHelperService,private gridService : GridService, private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    this.idpID = this.route.snapshot.paramMap.get('idpId');
    await this.idpHelperService.ardsResult.subscribe((ards) => {
      if (ards && ards?.data && ards.data['items'].length > 0)
      {
        this.showGrid = true;
        this.gridData = ards.data['items'];
        this.prepareDataForGrid(this.gridData);
        this.pagination = ards.data['pagination'];
      } else if (ards?.status === 503 || ards?.status === 500 ||
        ards?.status === 400 || ards?.status === 404 ||
        ards?.data['items'].length === 0){
        console.log('error response for idp ards', ards?.status);
        this.fetchDataInfo = true;
        this.showGrid = false;
      }  
    });
    this.gridService.findDatasubject.subscribe(records => {
      this.selectedRecords = records;
    })
 
  }

  getSortedData(event: SortDescriptor) {
    const sort = {
      field: event.field,
      order: event?.dir?.toUpperCase()
    }
    this.subjectSortEmitter.emit(sort);
  }

  getPaginatedData(pageNumber: number) {
    this.showGrid = true;
    this.subjectNextPageEmitter.emit(this.paginationDetailARD.page);
  }

  onPopupItemClick(action: string): void {
    console.log('Popup Item Clicked:', action);
    // Handle the action based on the item clicked
    if(action === 'duplicate') {
      console.log('inside duplicate Clicked:', action);
      this.openCreateArdDialog();
    }
  }

  openRowMenu(element: any): void {
    const clickedElement = element.event.target;
    this.ardId = element.data?.ARDUniqID;
    console.log('Subject - openRowMenu', element.event.target, '---', this.rowPopUp);
    // Toggle the popup visibility if the same button is clicked
    if (this.rowPopUp === clickedElement && this.showRowPopup) {
      this.showRowPopup = false;
    } else {
      this.rowPopUp = clickedElement;
      this.showRowPopup = true;
    }
  }
  toogleArch() {
    this.isChecked = !this.isChecked;
  }

  prepareDataForGrid(gridData: any[]) {
    gridData.forEach((allData: any) => {
      allData.accesFlag = false;
      if (allData.Access.toLowerCase() == ACCESS_CHECK.everyone.toLowerCase() || allData.Access.toLowerCase() == ACCESS_CHECK.private.toLowerCase()) {
        allData.accessFlag = true;
      }
    });
    return this.gridData;
  }

  openARDDetails(event: any) {
    this.router.navigate(['home/idp-catalog/ard/ard-details', event.ARDUniqID, this.idpID]);
  }

  openCreateArdDialog() {
    const dialogRef: DialogRef = this.dialogService.open({
      content: CreateArdDialogComponent
    });
    dialogRef.result.subscribe((res) => {
      if (!(res instanceof DialogCloseResult)) {
        this.callDuplicateARD(res);
      }
    });
  }

  callDuplicateARD(ArdDetail: any){
    this.loaderService.showLoader();
    const payload =   {
      'name': ArdDetail?.name,
      'visibility': Number(ArdDetail?.visibility)
    } as CreateArdRequestEto;
    this.ardRestService.duplicateCreateArd(payload, this.ardId).subscribe((response: DuplicateArdResponseEto) => {
      this.loaderService.hideLoader();
      if(response.status === 'success'){
       this.toastrService.success(response.message);
      }
     this.router.navigate(['home/idp-catalog/ard/ard-details',  response.ARDUniqID, this.idpID]);
      console.log('Routing to New Page....');
    }, (error) => {
      this.loaderService.hideLoader();
      console.error('error.error', error.error);
      if(error.statusText === 'OK' && (error.error.text).toLowerCase().includes('duplicate')){
        this.toastrService.error('Oops!! Selected Records already have been Created. Please try with other records.');
      }
      
    });
  }
  
}
