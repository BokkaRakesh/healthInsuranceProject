import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, signal } from '@angular/core';
import { PaginationEto } from '../../../../models/pageRequest';
import { TablePopUp } from '../../../../../shared/shared-components/table-pop-up/table-pop-up.component';
import { Align } from '@progress/kendo-angular-popup';
import { LoaderService } from '../../../../../shared/services/loader/loader.service';
import { ArdRestService } from '../../../../services/ard-rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileRestrictions, UploadEvent } from '@progress/kendo-angular-upload';

@Component({
  selector: 'app-ard-attachments-tab',
  templateUrl: './ard-attachments-tab.component.html',
  styleUrl: './ard-attachments-tab.component.scss'
})

export class ArdAttachmentsTabComponent implements OnInit {
  @Input() ardIDofRunAnalysis: any;
  @Input() addFiles:any;
  @Input() paginationDetailFiles!: PaginationEto;
  @Input() isARDNavigated: boolean = false;
  @ViewChild('tablePopUp') tablePopUp!: ElementRef;
  @Output() selectedFilesData: EventEmitter<any> = new EventEmitter<any>();
  @Output() filesSortEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() filesNextPageEmitter: EventEmitter<number> = new EventEmitter<number>();
  rowPopUp!: ElementRef;
  rowData: any;
  gridData: any[] = [];
  count = 0;
  pagination!: PaginationEto;
  formData = new FormData();
  gridColumns: any[] = [];
  uploadSaveUrl = 'saveUrl';
  menuItems: TablePopUp[] = [
    { label: 'View File', action: 'viewFile' },
    { label: 'Download File', action: 'downloadFile' },
    { label: 'Delete', action: 'delete' }
  ];
  anchorAlign: Align = { vertical: 'bottom', horizontal: 'right' };
  popupAlign: Align = { vertical: 'top', horizontal: 'right' };
  showTablePopup = false;
  showRowPopup = false;
  idpID: any;
  ardId: any;
  myRestrictions: FileRestrictions = {
    maxFileSize: 10000000,
  };
  showGrid = false;
  selectedFiles: File[] = [];
  checkboxSelection = false;

  constructor(private ardRestService: ArdRestService, private loaderService: LoaderService,
    private route: ActivatedRoute, private router: Router) {
    this.idpID = this.route.snapshot.paramMap.get('idpId');
    this.ardId = this.route.snapshot.paramMap.get('ardId');
    if(this.ardIDofRunAnalysis){
      this.ardId = this.ardIDofRunAnalysis;
    }else{
    this.ardId = this.route.snapshot.paramMap.get('ardId');
    }
  }

  ngOnInit(): void {
    this.gridColumns = this.ardRestService.getArdAttachmentColumnData();
    this.getGridData();
    if(this.addFiles){
      this.checkboxSelection = true;
    }else{
      this.checkboxSelection = false;
    }
  }

  onSelect(event: any): void {
    console.log('event.files', event.files);
    for (const item of event.files) {
      this.selectedFiles.push(item.rawFile);
    };
    this.count = this.count > 1 ? 0 : this.count;
    this.count++;
    console.log('selectedFiles:', this.selectedFiles)
  }

  onFileChange() {
    this.resetFormData();
    this.count++;
    if (this.selectedFiles.length === 0) {
      alert('No file selected!!');
    }
    //append FormData
   
    this.selectedFiles.forEach((file, index) => {
      this.formData.append('files', file, file.name);
    });
    //send files to backend
    if(this.count === 2){
     this.ardRestService.addAttachedFileDetails(this.formData, this.ardId).subscribe((response) => {
          console.log('Response: ', response);
          if (response.status === 'success') {
            this.getGridData();
          }
        }, (error) => {
          console.log('error::', error);
        });
    }
    
  }

  onSuccess() {
    console.log('file upload successfully');
    this.selectedFiles = [];
  }

  getGridData(): void {
    const payload = {
      sort: {
        field: 'createdat',
        order: 'DESC'
      },
      pagination: {
        currentPage: 1
      }
    }
    this.ardRestService.getAddFilesDataService(this.ardId, payload).subscribe((result) => {
      this.gridData = result.data['items'];
      this.pagination = result.data['pagination'];
      this.loaderService.hideLoader();
      this.showGrid = true;
    });
    console.log('gridData:', this.gridData);
  }

  openRowMenu(element: any): void {
    this.selectedFilesData.emit(element);
    const clickedElement = element.event.target;
    this.rowData = element.data;
    if (this.rowPopUp === clickedElement && this.showRowPopup) {
      this.showRowPopup = false;
    } else {
      this.rowPopUp = clickedElement;
      this.showRowPopup = true;
    }
  }

  resetFormData() {
    this.formData = new FormData();
  }
}
