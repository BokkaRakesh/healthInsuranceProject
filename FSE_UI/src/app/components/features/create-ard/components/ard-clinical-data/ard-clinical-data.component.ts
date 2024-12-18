import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { PaginationEto } from '../../../../models/pageRequest';
import * as filesColumns from '../../../../../../assets/columnDefinition/files-columns.json';
import * as ardfilesColumns from '../../../../../../assets/columnDefinition/ard-files-columns.json';
import { TablePopUp } from '../../../../../shared/shared-components/table-pop-up/table-pop-up.component';
import { Align } from '@progress/kendo-angular-popup';
import { SortDescriptor } from '@progress/kendo-data-query';
import { IdpHelperService } from '../../../idp-catalog/services/idp-helper.service';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { CreateArdDialogComponent } from '../../../create-ard/components/create-ard-dialog/create-ard-dialog.component';
import { LoaderService } from '../../../../../shared/services/loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { CreateArdRequestEto } from '../../../../models/ardEto';
import { ArdRestService } from '../../../../services/ard-rest.service';
import { IdpRestService } from '../../../../services/idp-rest.service';
import { GridService } from '../../../../../shared/services/grid/grid.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SVGIcon, chevronDownIcon, chevronUpIcon } from '@progress/kendo-svg-icons';
import { ExpansionPanelComponent } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-ard-clinical-data',
  templateUrl: './ard-clinical-data.component.html',
  styleUrl: './ard-clinical-data.component.scss'
})
export class ArdClinicalDataComponent implements OnInit {
  @Input() paginationDetailFiles!: PaginationEto;
  @Input() isARDNavigated = false;
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
  idpID: any = '';
  arrowDown: SVGIcon = chevronDownIcon;
  arrowUp: SVGIcon = chevronUpIcon;
  selectedRecords: any[] = [];

  constructor(private idpRestService: IdpRestService, private ardRestService: ArdRestService, private dialogService: DialogService, private loaderService: LoaderService,
    private toastrService: ToastrService, private idpHelperService: IdpHelperService, private gridService: GridService, private route: ActivatedRoute, private router: Router) {
    this.idpID = this.route.snapshot.paramMap.get('idpId');
  }

  ngOnInit(): void {
    this.ardRestService.getArdClinicalData().subscribe((files) => {
      this.gridData = files.data['studies'];
    });
  }

  getFilesColumns() {
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
    this.rowData = element.data;
    if (this.rowPopUp === clickedElement && this.showRowPopup) {
      this.showRowPopup = false;
    } else {
      this.rowPopUp = clickedElement;
      this.showRowPopup = true;
    }
  }

  showMore() {
    alert('This is to be implemented!')
  }
}
