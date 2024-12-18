import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { PaginationEto } from '../../../../models/pageRequest';
import * as subjectsColumns from '../../../../../../assets/columnDefinition/subjects-columns.json';
import * as ardsubjectsColumns from '../../../../../../assets/columnDefinition/ard-subjects-column.json';
import { TablePopUp } from '../../../../../shared/shared-components/table-pop-up/table-pop-up.component';
import { Align } from '@progress/kendo-angular-popup';
import { SortDescriptor } from '@progress/kendo-data-query';
import { IdpHelperService } from '../../services/idp-helper.service';
import { IdpRestService } from '../../../../services/idp-rest.service';
import { ArdRestService } from '../../../../services/ard-rest.service';
import {
  DialogCloseResult,
  DialogRef,
  DialogService,
} from '@progress/kendo-angular-dialog';
import { CreateArdDialogComponent } from '../../../create-ard/components/create-ard-dialog/create-ard-dialog.component';
import { LoaderService } from '../../../../../shared/services/loader/loader.service';
import { CreateArdRequestEto } from '../../../../models/ardEto';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { GridService } from '../../../../../shared/services/grid/grid.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-idp-subjects',
  templateUrl: './idp-subjects.component.html',
  styleUrl: './idp-subjects.component.scss',
})
export class IdpSubjectsComponent implements OnInit {
  @Input() paginationDetailSubject!: PaginationEto;
  @Input() isARDNavigated: boolean = false;
  @ViewChild('tablePopUp') tablePopUp!: ElementRef;
  @Output() subjectSortEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() subjectNextPageEmitter: EventEmitter<number> =
    new EventEmitter<number>();
  subjectsResult!: any;
  rowPopUp!: ElementRef;
  gridData: any[] = [];
  filtersData: any[] = [];
  pagination!: PaginationEto;
  gridColumns: any = subjectsColumns;

  tableMenuItems: TablePopUp[] = [
    { label: 'Export CSV', action: 'exportCsv' },
    { label: 'Download', action: 'download' },
  ];
  rowMenuItems: TablePopUp[] = [
    { label: 'Explore Subject Data', action: 'explore' },
    { label: 'Create ARD', action: 'createArd' },
    { label: 'Run Analysis', action: 'runAnalysis' },
    { label: 'Export CSV', action: 'exportCsv' },
    { label: 'Download', action: 'download' },
  ];
  anchorAlign: Align = { vertical: 'bottom', horizontal: 'right' };
  popupAlign: Align = { vertical: 'top', horizontal: 'right' };
  showTablePopup = false;
  showRowPopup = false;
  selectedRecords: any[] = [];
  idpID: any;
  createARDNames: any[] = [];
  ardNames: any;
  ardName: string = '';
  formattedTimestamp : any;
  prefix : string = 'ARD';
  showGrid : any;
  fetchDataInfo = false;

  constructor(
    private idpRestService: IdpRestService,
    private ardRestService: ArdRestService,
    private dialogService: DialogService,
    private loaderService: LoaderService,
    private toastrService: ToastrService,
    private idpHelperService: IdpHelperService,
    private gridService: GridService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.idpID = this.route.snapshot.paramMap.get('idpId');
  }

  async ngOnInit() {
    await this.idpHelperService.subjectsResult.subscribe((subjects) => {
      if (this.isARDNavigated) {
        this.showGrid = true;
        this.gridData = this.prepareDataForGrid(subjects.data['items']);
        this.pagination = subjects.data['pagination'];
      } else if (subjects.status === 503 || subjects.status === 500 ||
        subjects.status === 400 || subjects.status === 404 ||
        subjects?.data['items'].length === 0){
        this.fetchDataInfo = true;
        this.showGrid = false;
      } else {
        this.showGrid = true;
        this.gridData = subjects.data['items'];
        this.pagination = subjects.data['pagination'];
      }
      
      this.setGridColumns();
    });
    console.log('Subject Grid data--', this.gridData);
    this.gridService.findDatasubject.subscribe((records) => {
      this.selectedRecords = records;
      console.log('subjects selected are', this.selectedRecords);
    });
  }

  setGridColumns() {
    this.gridColumns = this.isARDNavigated
      ? ardsubjectsColumns
      : subjectsColumns;
  }

  private prepareDataForGrid(gridData: any[]) {
    let dataAccessItems: any = [];
    gridData.forEach((allData: any) => {
      allData['checked'] = false;
      allData.SubjectID = allData.SubjectID ? allData.SubjectID : '-';
      allData.SubjectSex = allData.SubjectSex ? allData.SubjectSex : '-';
      allData.SubjectEthnicity = allData.SubjectEthnicity
        ? allData.SubjectEthnicity
        : '-';
      allData.SubjectRace = allData.SubjectRace ? allData.SubjectRace : '-';
      allData.SubjectEnrollmentSiteId = allData.SubjectEnrollmentSiteId
        ? allData.SubjectEnrollmentSiteId
        : '-';
      allData.StudyNumber = allData.StudyNumber ? allData.StudyNumber : '-';
      allData.StudyIndication = allData.StudyIndication
        ? allData.StudyIndication
        : '-';
      allData.StudyThemeMolecule = allData.StudyThemeMolecule
        ? allData.StudyThemeMolecule
        : '-';
      allData.StudyPhase = allData.StudyPhase ? allData.StudyPhase : '-';
      allData.StudyType = allData.StudyType ? allData.StudyType : '-';
      allData.StudyScientificArea = allData.StudyScientificArea
        ? allData.StudyScientificArea
        : '-';
      allData.StudyStatus = allData.StudyStatus ? allData.StudyStatus : '-';
      allData.StudyThemeNumber = allData.StudyThemeNumber
        ? allData.StudyThemeNumber
        : '-';
      allData.StudyAcronym = allData.StudyAcronym ? allData.StudyAcronym : '-';
    });
    console.log('Prepare dataForGrid console--', gridData);
    return gridData;
  }

  getSortedData(event: SortDescriptor) {
    const sort = {
      field: event.field,
      order: event?.dir?.toUpperCase(),
    };
    this.subjectSortEmitter.emit(sort);
  }

  getPaginatedData(pageNumber: number) {
    this.showGrid = true;
    this.subjectNextPageEmitter.emit(this.paginationDetailSubject.page);
  }

  openCreateArdDialog() {
    const dialogRef: DialogRef = this.dialogService.open({
      content: CreateArdDialogComponent,
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
      if (
        selectedRecord?.StudyNumber && !this.createARDNames.includes(selectedRecord.StudyNumber)
      ) {
        this.createARDNames.push(selectedRecord?.StudyNumber);
        this.ardNames = `${this.createARDNames.join('-')}`;
        console.log('names is', this.ardNames);
      }
    });
    dialogInstance.ardName = this.ardNames;
    dialogRef.result.subscribe((res) => {
      if (!(res instanceof DialogCloseResult)) {
        this.callCreateARD(res);
      }
    });
  }

  callCreateARD(ArdDetail: any) {
    this.ardName = `${this.prefix}_${ArdDetail?.name}_${this.formattedTimestamp}`;
    this.loaderService.showLoader();
    const payload = {
      type: 'subject',
      items: this.selectedRecords.map((subject) => {
        return subject.Subject_Unq_ID;
      }),
      select_all: false,
      filter: [],
      name: this.ardName,
      updatable: false,
      visibility : Number(ArdDetail.visibility)
    } as CreateArdRequestEto;
    console.log('payload is ', payload);
    this.ardRestService.createArd(payload, this.idpID).subscribe(
      (response) => {
        this.loaderService.hideLoader();
        if (response.status === 'success') {
          this.toastrService.success(response.message);
        }
        this.router.navigate([
          'home/idp-catalog/ard/ard-details',
          response.ARDUniqID,
          this.idpID,
        ]);
        console.log('Routing to New Page....');
      },
      (error) => {
        this.loaderService.hideLoader();
        console.error('error.error', error.error);
        if (
          error.statusText === 'OK' &&
          error.error.text.toLowerCase().includes('duplicate')
        ) {
          this.toastrService.error(
            'Oops!! Selected Records already have been Created. Please try with other records.'
          );
        }
      }
    );
  }

  runAnalysis(): void {
    // TODO: Implement run analysis implementation
    
  }

  togglePopUp(): void {
    this.showTablePopup = !this.showTablePopup;
  }

  onPopupItemClick(action: string): void {
    console.log('Popup Item Clicked:', action);
    // Handle the action based on the item clicked
  }

  openRowMenu(element: any): void {
    const clickedElement = element.event.target;
    console.log(
      'Subject - openRowMenu',
      element.event.target,
      '---',
      this.rowPopUp
    );
    // Toggle the popup visibility if the same button is clicked
    if (this.rowPopUp === clickedElement && this.showRowPopup) {
      this.showRowPopup = false;
    } else {
      this.rowPopUp = clickedElement;
      this.showRowPopup = true;
    }
  }
}
