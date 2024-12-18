import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PaginationEto } from '../../../../models/pageRequest';
import * as filesColumns from '../../../../../../assets/columnDefinition/files-columns.json';
import * as ardfilesColumns from '../../../../../../assets/columnDefinition/ard-files-columns.json';
import { TablePopUp } from '../../../../../shared/shared-components/table-pop-up/table-pop-up.component';
import { Align } from '@progress/kendo-angular-popup';
import { SortDescriptor } from '@progress/kendo-data-query';
import { IdpHelperService } from '../../services/idp-helper.service';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { CreateArdDialogComponent } from '../../../create-ard/components/create-ard-dialog/create-ard-dialog.component';
import { LoaderService } from '../../../../../shared/services/loader/loader.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { CreateArdRequestEto } from '../../../../models/ardEto';
import { ArdRestService } from '../../../../services/ard-rest.service';
import { IdpRestService } from '../../../../services/idp-rest.service';
import { GridService } from '../../../../../shared/services/grid/grid.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-idp-files',
  templateUrl: './idp-files.component.html',
  styleUrl: './idp-files.component.scss'
})
export class IdpFilesComponent implements OnInit {
  @Input() paginationDetailFiles!: PaginationEto;
  @Input() isARDNavigated: boolean = false;
  @ViewChild('tablePopUp') tablePopUp!: ElementRef;
  @Output() filesSortEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() filesNextPageEmitter: EventEmitter<number> = new EventEmitter<number>();
  rowPopUp!: ElementRef;
  rowData: any;
  gridData: any[] = [];
  pagination!: PaginationEto;
  gridColumns: any;
  menuItems: TablePopUp[] = [
    { label: 'Export CSV', action: 'exportCsv' },
    { label: 'Download', action: 'download' }
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
  idpID:any;
  createARDNames: any[] = [];
  ardNames: any;
  ardName: string = '';
  formattedTimestamp : any;
  prefix : string = 'ARD';
  showGrid : any;
  fetchDataInfo = false;

  selectedRecords: any[] = [];
  constructor(private idpRestService: IdpRestService, private ardRestService: ArdRestService, private dialogService: DialogService, private loaderService: LoaderService, 
    private toastrService: ToastrService, private idpHelperService: IdpHelperService,private gridService : GridService, private route: ActivatedRoute, private router: Router) {
      this.idpID = this.route.snapshot.paramMap.get('idpId');
    }

  async ngOnInit() {
   await this.idpHelperService.filesResult.subscribe((files) => {
      if (files && files?.data && files.data['items'].length > 0)
        {
        this.showGrid = true;
        this.gridData = files.data['items'];
        this.pagination = files.data['pagination'];
      } else if (files?.status === 503 || files?.status === 500 ||
        files?.status === 400 || files?.status === 404 ||
        files?.data['items'].length === 0){
        console.log('error response for idp files', files?.status);
        this.fetchDataInfo = true;
        this.showGrid = false;
      }  
      this.getFilesColumns();
    });
    this.gridService.findDatasubject.subscribe(records => {
      this.selectedRecords = records;
    })
  }

  getFilesColumns(){
    this.gridColumns = !this.isARDNavigated ? filesColumns : ardfilesColumns;
  }

  getSortedData(event: SortDescriptor) {
    const sort = {
      field: event.field,
      order: event?.dir?.toUpperCase()
    }
    this.filesSortEmitter.emit(sort);
  }

  getPaginatedData(pageNumber: number) {
    this.showGrid =true;
    this.filesNextPageEmitter.emit(this.paginationDetailFiles.page);
  }


  openCreateArdDialog() {
    const dialogRef: DialogRef = this.dialogService.open({
      content: CreateArdDialogComponent
    });

     // Pass data to the dialog content
     const dialogInstance = dialogRef.content
     .instance as CreateArdDialogComponent;
   const currentTimestamp = new Date(); // Get the current timestamp

   // Format the date and time
   this.formattedTimestamp = [
     String(currentTimestamp.getMonth() + 1).padStart(2, '0'), // Month (MM)
     String(currentTimestamp.getDate()).padStart(2, '0'), // Day (DD)
     currentTimestamp.getFullYear(), // Year (YYYY)
     String(currentTimestamp.getHours()).padStart(2, '0'), // Hours (HH)
     String(currentTimestamp.getMinutes()).padStart(2, '0'), // Minutes (MM)
     String(currentTimestamp.getSeconds()).padStart(2, '0'), // Seconds (SS)
    ].join('-');

   this.selectedRecords.forEach((selectedRecord: any) => {
     if (selectedRecord?.StudyNumber && !this.createARDNames.includes(selectedRecord.StudyNumber)
     ) {
       this.createARDNames.push(selectedRecord?.StudyNumber);
       this.ardNames = `${this.createARDNames.join('-')}`;
     }
   });
   dialogInstance.ardName = this.ardNames;
    
    dialogRef.result.subscribe((res) => {
      if (!(res instanceof DialogCloseResult)) {
        this.callCreateARD(res);
      }
    });
  }
 
  callCreateARD(ArdDetail: any){
    this.ardName = `${this.prefix}_${ArdDetail?.name}_${this.formattedTimestamp}`;
    this.loaderService.showLoader();
    const payload = {
      "type": "file",
      "items": this.selectedRecords.map((subject) => {
        return  subject.File_Unq_ID
      }),
      "select_all": false,
      "filter": [],
      "name": this.ardName,
      "updatable": ArdDetail?.updatable,
      "visibility": Number(ArdDetail.visibility)
    } as CreateArdRequestEto;
    console.log('payload is ', payload);
    this.ardRestService.createArd(payload, this.idpID).subscribe((response) => {
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

  runAnalysis(): void {
    // TODO: Implement run analysis implementation
  }

  togglePopUp(): void {
    this.showTablePopup = !this.showTablePopup;
  }

  onPopupItemClick(action: string) {
    console.log('Popup Item Clicked:', action);
    console.log('this.rowData:', this.rowData);
    if(action === 'launchViewer'){
      window.open('https://ips-gip.apollo.roche.com/ohifv3/viewer?StudyInstanceUIDs=' + this.rowData?.DicomStudyinstanceuid, '_blank');
    }
    // Handle the action based on the item clicked
  }

  openRowMenu(element: any): void {
    const clickedElement = element.event.target;
    console.log('Subject - openRowMenu', element.event.target, '---', this.rowPopUp);
    console.log('dataItem: ', element.data);
    this.rowData = element.data;
    // Toggle the popup visibility if the same button is clicked
    if (this.rowPopUp === clickedElement && this.showRowPopup) {
      this.showRowPopup = false;
    } else {
      this.rowPopUp = clickedElement;
      this.showRowPopup = true;
    }
  }
}
