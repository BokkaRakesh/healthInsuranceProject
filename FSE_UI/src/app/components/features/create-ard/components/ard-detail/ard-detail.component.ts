import { Component, OnInit } from '@angular/core';
import { IdpSubjectAndFileRequestEto, SummaryDetailEto, SummaryMetricsEto } from '../../../../models/IdpEto';
import { ActivatedRoute, Router } from '@angular/router';
import { IdpRestService } from '../../../../services/idp-rest.service';
import { IdpHelperService } from '../../../idp-catalog/services/idp-helper.service';
import { DateUtil } from '../../../../../shared/utils/DateUItils';
import { ArdRestService } from '../../../../services/ard-rest.service';
import { PaginationEto } from '../../../../models/pageRequest';

@Component({
  selector: 'app-ard-detail',
  templateUrl: './ard-detail.component.html',
  styleUrl: './ard-detail.component.scss'
})
export class ArdDetailComponent implements OnInit{
  paginationDetailSubject! : PaginationEto;
  paginationDetailFiles! : PaginationEto;
  idpId: any;
  isARDNavigated : boolean = false
  pageNumber : number = 1;
  isLastPage = true;
  public summary: Array<SummaryMetricsEto> = [];
  summaryDetails :SummaryDetailEto = {
    dataSources: '',
    createdBy: '',
    modalities: '',
    version: '',
    createdDate: '',
    updatedDate: '',
  };
  filterMap: any[] = [];
  ardResult!: any;
  subjectsResult: any;
  filesResult: any;
  parentTabs = [
    {
      value: 'Documentation',
      label: 'Documentation',
      isSelected: true,
      enabled: true,
    },
    {
      value: 'Subjects',
      label: 'Subjects',
      isSelected: false,
      enabled: true,
    },
    {
      value: 'Files',
      label: 'Files',
      isSelected: false,
      enabled: true,
    },
    {
      value: 'Clincal_Data',
      label: 'Clincal Data',
      isSelected: false,
      enabled: true,
    },
    {
      value: 'Insights',
      label: 'Insights',
      isSelected: false,
      enabled: true,
    },
    {
      value: 'Activities',
      label: 'Activities',
      isSelected: false,
      enabled: true,
    },
    {
      value: 'Attachments',
      label: 'Attachments',
      isSelected: false,
      enabled: true,
    },
  ];
  ardId : any;
  favouriteSelection = false;
  selectedTab: string = this.parentTabs.find((tab) => tab.enabled)?.value ?? '' ;
  studiesList: any;
  isDialogOpen = false;
  isFilterOptionsVisible = false;
  filterData: any[] = [];
  selectedFilterOption: any;
  filterBadgeResult: any;
  selectedFilteredData: any;
  isFilterApplied = false;
  batchFlag = false;
  transformBatch!: any[];
  popupFilterList: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private ardRestService: ArdRestService,
    private idpHelperService: IdpHelperService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.ardId = this.route.snapshot.paramMap.get('ardId');
    this.idpId = this.route.snapshot.paramMap.get('idpId');
    this.getArdResult(this.ardId);
  }

  getArdResult(ardId: string) {
    this.ardRestService.getArdDetail(ardId).subscribe((response) => {
      this.ardResult = response;
      this.getSummaryMetricDetails(this.ardResult, this.selectedTab);
    });
  }

  getSelectedTabInfo(event: any) {
    this.getSelectedTabData(event.value)
  };

  getSelectedTabData(tabName: string) {
    this.selectedTab = tabName;
    this.isARDNavigated = true;
    switch(tabName) {
      case 'Documentation':
        this.getArdResult(this.ardId);
        break;
      case 'Subjects':
        this.getSubjectData(this.ardId);
        break;
      case 'Files':
        this.getFilesData(this.ardId);
        break;
      case 'Clincal_Data':
        break;
      case 'Insights':
        break;
      case 'Activities':
        break;
      case 'Attachments':
        break;
      default:
        break;
    }  
  }

  getSubjectData(ardId: string, subjectsPayload?: IdpSubjectAndFileRequestEto) {
    this.ardRestService.getSubjectsByARD(ardId, subjectsPayload).subscribe((result) => {
      this.subjectsResult = result;
      this.paginationDetailSubject = result.data['pagination'];
      this.idpHelperService.addSubjectResult(this.subjectsResult);
      this.getSummaryMetricDetails(this.subjectsResult, this.selectedTab);
    });
  }

  sortSubjects(sort: any) {
    const subjectsPayload = {
      sort
    } as IdpSubjectAndFileRequestEto;
    this.getSubjectData(this.ardId, subjectsPayload);
  }

  paginateSubjects(pageNumber: number) {
    const subjectsPayload = {
      pagination: { currentPage: pageNumber + 1 },
      filters: this.selectedFilteredData
    } as IdpSubjectAndFileRequestEto;
    this.ardRestService.getSubjectsByARD(this.ardId, subjectsPayload).subscribe((result) => {
      for (let file of result.data['items']){
        this.subjectsResult.data['items'].push(file);
      }
      this.paginationDetailSubject = result.data['pagination'];
      this.idpHelperService.addSubjectResult(this.subjectsResult);
      this.getSummaryMetricDetails(this.subjectsResult, this.selectedTab);
    });
  }

  getFilesData(ardId: string, filesPayload?: IdpSubjectAndFileRequestEto) {
    this.ardRestService.getFilesByARD(ardId, filesPayload).subscribe((result) => {
      this.filesResult = result;
      this.filesResult.data['items'] = this.idpHelperService.prepareDataForGrid(this.filesResult.data['items'])
      this.paginationDetailFiles = result.data['pagination'];
      this.idpHelperService.addFileResult(this.filesResult);
      this.getSummaryMetricDetails(this.filesResult, this.selectedTab);
    });
  }

  sortFiles(sort: any) {
    const filesPayload = {
      sort
    } as IdpSubjectAndFileRequestEto;
    this.getFilesData(this.ardId, filesPayload);
  }

  paginateFiles(pageNumber: number) {
    const filesPayload = {
      pagination: { currentPage: pageNumber + 1 },
      filters: this.selectedFilteredData
    } as IdpSubjectAndFileRequestEto;
      this.ardRestService.getFilesByARD(this.ardId, filesPayload).subscribe((result) => {
      result.data['items'] = this.idpHelperService.prepareDataForGrid(result.data['items']);
      for (let file of result.data['items']){
        this.filesResult.data['items'].push(file);
      }
      this.paginationDetailFiles = result.data['pagination'];
      this.idpHelperService.addFileResult(this.filesResult);
      this.getSummaryMetricDetails(this.filesResult, this.selectedTab);
    });
  }

  selectFavourite() {
    this.favouriteSelection = !this.favouriteSelection;       
  }

  getSummaryMetricDetails(showMetricsResponse :any, selectedTabValue: string){
    const dateUtil = new DateUtil();
    const createdAt = showMetricsResponse?.data?.summary?.createdat?.trim();
    const updatedAt = showMetricsResponse?.data?.summary?.updatedat?.trim();
    this.summaryDetails = {
      dataSources: (showMetricsResponse?.data?.summary?.datasources && showMetricsResponse?.data?.summary?.datasources?.trim()) || '-',
      modalities: (showMetricsResponse?.data?.summary?.modality && showMetricsResponse?.data?.summary?.modality?.trim()) || '-',
      createdBy: (showMetricsResponse?.data?.summary?.createdby && showMetricsResponse?.data?.summary?.createdby?.trim()) || '-',
      createdDate: createdAt && !isNaN(new Date(createdAt).getTime()) ? dateUtil.formatDate(createdAt) : '-',
      updatedDate: updatedAt && !isNaN(new Date(updatedAt).getTime()) ? dateUtil.formatDate(updatedAt) : '-',
      version: showMetricsResponse?.data?.summary?.currentversion
    };
    this.getSummaryInfo(showMetricsResponse, selectedTabValue);
  }

  getSummaryInfo(showMetricsResponse:any, selectedTabValue: string) {
    const summaryData: any =  showMetricsResponse?.data?.summary;
    if (summaryData) {
      const summaryKeys = Object.keys(showMetricsResponse.data.summary);
      let metricsDetail :any = this.showMetricBasedOnSelectedTab(selectedTabValue);

      this.summary = summaryKeys
        .map((key) => {
          if (metricsDetail[key]) {
            return {
              icon: metricsDetail[key],
              name: key.charAt(0).toUpperCase() + key.slice(1),
              value: summaryData[key],
            };
          }
          return { icon: '', name: '', value: 0 };
        }).filter((item) => item.name !== '');
    }
  }


  showMetricBasedOnSelectedTab(selectedTabValue: string){
    const metricsDetail = {
      subjects: 'subject-user',
      studies: 'study-folder',
      files: 'file-attach',
      sessions: 'file-session',
      acquisitions: 'file-data-pull',
      analyses: 'file-histo',
    };
    return metricsDetail;
  }

  runAnalysis(): void {
    // TODO: Implement run analysis implementation
  }

  openIdpDetails() {
    this.router.navigate(['home/idp-catalog/idp', this.idpId]);
  }

}
