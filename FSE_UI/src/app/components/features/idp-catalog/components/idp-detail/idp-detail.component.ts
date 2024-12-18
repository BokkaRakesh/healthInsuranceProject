import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IdpRestService } from '../../../../services/idp-rest.service';
import { IdpSubjectAndFileRequestEto, IdpResponseEto, SummaryDetailEto, SummaryMetricsEto } from '../../../../models/IdpEto';
import { DateUtil } from '../../../../../shared/utils/DateUItils';
import filterMapping from '../../../../../../assets/filterDefinition/files-filter.json';
import ardFilterMapping from '../../../../../../assets/filterDefinition/idp-ards-filter.json';
import { SharedService } from '../../../../../shared/services/shared/shared.service';
import { IdpHelperService } from '../../services/idp-helper.service';
import { IdpArdRequestEto } from '../../../../models/ardEto';
import { ArdRestService } from '../../../../services/ard-rest.service';
import { PaginationEto } from '../../../../models/pageRequest';
@Component({
  selector: 'app-idp-detail',
  templateUrl: './idp-detail.component.html',
  styleUrl: './idp-detail.component.scss',
})
export class IdpDetailComponent implements OnInit {
  @ViewChild("filter", { read: ElementRef }) public filter!: ElementRef;
  @ViewChild("popup", { read: ElementRef }) public popup!: ElementRef;
  removeAllFilter = false;
  paginationDetailSubject! : PaginationEto;
  paginationDetailFiles! : PaginationEto;
  paginationDetailARD! : PaginationEto;
  idpName : string= ""
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
  idpResult!: IdpResponseEto;
  subjectsResult: any;
  ardResult:any;
  filesResult: any;
  parentTabs: any[] = [
    {
      value: 'IDP_Documentation',
      label: 'IDP Documentation',
      isSelected: true,
      enabled: true,
      path: ['ui/exploreData'],
    },
    {
      value: 'Subjects',
      label: 'Subjects',
      isSelected: false,
      enabled: false,
      path: ['ui/exploreData'],
    },
    {
      value: 'Files',
      label: 'Files',
      isSelected: false,
      enabled: false,
      path: ['ui/exploreData'],
    },
    {
      value: 'Clinical_Data',
      label: 'Clinical Data',
      isSelected: false,
      enabled: false,
      path: ['ui/exploreData'],
    },
    {
      value: 'ARDs',
      label: 'ARDs',
      isSelected: false,
      path: ['ui/exploreData'],
    },
    {
      value: 'Activities',
      label: 'Activities',
      isSelected: false,
      enabled: false,
      path: ['ui/exploreData'],
    }
  ];
  idpID : any;
  favouriteSelection = false;
  selectedTab: any = this.parentTabs.find((tab) => tab.enabled)?.value ?? '' ;
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
  isARDNavigated : boolean = false;
  parentTabList: any[] = [];
  ardSelected: boolean = false;
  statusInfo: string = "";
  selectedStudiesList: any[] =[];
  idpInitiatedDate: any;
  isArdTab = false
  isDocumentationTab = false;
  isOtherTab = false;
  @HostListener("document:click", ["$event"])
  public documentClick(event: KeyboardEvent): void {
    if (!this.contains(event.target)) {
      this.isFilterOptionsVisible = false;
    }
  }
  constructor(
    private route: ActivatedRoute,
    private idpRestService: IdpRestService,
    private sharedService: SharedService,
    private idpHelperService: IdpHelperService,private ardRestService: ArdRestService,
  ) {}

  ngOnInit() {
    this.idpID = this.route.snapshot.paramMap.get('idpId');
    this.getIDPResult(this.idpID, this.pageNumber);       
  }

  getIDPResult(idpID: string, pageNumber: number) {
     this.idpRestService.getIdp(idpID, pageNumber).subscribe(response => {
      if (this.pageNumber === 1) {
        this.idpResult = response;
        this.statusInfo = this.idpResult?.data.summary?.status;
        console.log('status info',this.statusInfo);
        this.selectedStudiesList = this.idpResult?.data?.items;
        this.studiesList = response?.data?.items;
        this.sharedService.setIDPName(this.idpResult.data.summary.idp_name);
        this.idpName = this.idpResult?.data.summary?.idp_name;
        this.idpInitiatedDate = this.idpResult?.data?.summary?.createdat;
      } else {
        this.studiesList = [...this.studiesList, ...response.data.items];
        this.statusInfo = this.idpResult?.data.summary?.status;
      }
      this.isLastPage = response.data.isLastPage;  
      this.pageNumber++;
      this.enabledTabsBasedOnIdpStatus(this.idpResult.data.summary.status);
      this.getSummaryMetricDetails(this.idpResult, this.selectedTab);
    });
  }

  getSelectedTabInfo(event: any) {
    this.getSelectedTabData(event.value)
  };

  getSelectedTabData(tabName: string) {
    this.selectedTab = tabName;
    switch(tabName) {
      case 'IDP_Documentation':
        this.getIDPResult(this.idpID, 1);
        break;
      case 'Subjects':
        this.getSubjectData(this.idpID);
        break;
      case 'Files':
        this.getFilesData(this.idpID);
        break;
      case 'Clinical_Data':
        this.getClinicalData(this.idpID,1)
        break;
      case 'ARDs':
        this.getArdsData(this.idpID);
        break;
      case 'Activities':
        break;
      default:
        break;
    }
  }

  getSubjectData(idpId: string, subjectsPayload?: IdpSubjectAndFileRequestEto) {
    this.idpRestService.getSubjectsByIdp(idpId, subjectsPayload).subscribe((result) => {
      this.subjectsResult = result;
      this.idpHelperService.addSubjectResult(this.subjectsResult);
      console.log('idp-deatil subject console--', this.subjectsResult);
      this.filterData = result.data['filters'];
      this.paginationDetailSubject = result.data['pagination'];
      const showFilterList =  this.mappingFilterAttributes(result.data['filters']);
      this.popupFilterList = showFilterList.filter((item) => item.showFilter);
      console.log('this.popupFilterList', this.popupFilterList);
      this.filterMap = filterMapping;
      this.getSummaryMetricDetails(this.subjectsResult, this.selectedTab);
    });
  }

  sortSubjects(sort: any) {
    const subjectsPayload = {
      sort
    } as IdpSubjectAndFileRequestEto;
    this.getSubjectData(this.idpID, subjectsPayload);
  }
  sortArds(sort: any) {
    const ardPayload = {
      sort
    } as IdpArdRequestEto;
    this.getArdsData(this.idpID, ardPayload);
  }

  getArdsData(idpId: string, ardPayload?: IdpArdRequestEto) {
    this.isArdTab = true;
    this.ardRestService.getArdsByIdp(idpId, ardPayload).subscribe((result) => {
      this.ardResult = result;
      console.log(this.ardResult,'ardResuts ')
      this.idpHelperService.addArdsResult(this.ardResult);
      this.filterData = result.data['filters'];
      this.paginationDetailARD = result.data['pagination'];
      const showFilterList =  this.mappingFilterAttributes(result.data['filters']);
      this.popupFilterList = showFilterList.filter((item) => item.showFilter);
      this.filterMap = ardFilterMapping;
      this.getSummaryMetricDetails(this.ardResult, this.selectedTab);
    });
  }


  paginateArds(pageNumber: number) {
    const ardPayload = {
      pagination: { currentPage: pageNumber + 1 },
      filters: [this.selectedFilteredData]
    } as IdpSubjectAndFileRequestEto;
    this.ardRestService.getArdsByIdp(this.idpID, ardPayload).subscribe((result) => {
      for (let file of result.data['items']){
        this.subjectsResult.data['items'].push(file);
      }
      this.idpHelperService.addArdsResult(this.subjectsResult);
      this.filterData = result.data['filters'];
      this.paginationDetailARD = result.data['pagination'];
      this.popupFilterList = this.mappingFilterAttributes(result.data['filters']);
      this.filterMap = ardFilterMapping;
      this.getSummaryMetricDetails(this.subjectsResult, this.selectedTab);
    });
  }

  paginateSubjects(pageNumber: number) {
    const subjectsPayload = {
      pagination: { currentPage: pageNumber + 1 },
      filters: [this.selectedFilteredData]
    } as IdpSubjectAndFileRequestEto;
    console.log('paginated subject filter', subjectsPayload.filters);
    this.idpRestService.getSubjectsByIdp(this.idpID, subjectsPayload).subscribe((result) => {
      this.subjectsResult.data['items'] = [...this.subjectsResult.data['items'], ...result.data['items']]
      this.idpHelperService.addSubjectResult(this.subjectsResult);
      this.filterData = result.data['filters'];
      this.paginationDetailSubject = result.data['pagination'];
      const showFilterList =  this.mappingFilterAttributes(result.data['filters']);
      this.popupFilterList = showFilterList.filter((item) => item.showFilter);
      this.filterMap = filterMapping;
      this.getSummaryMetricDetails(this.subjectsResult, this.selectedTab);
    });
  }

  getFilesData(idpId: string, filesPayload?: IdpSubjectAndFileRequestEto) {
    this.idpRestService.getFilesByIdp(idpId, filesPayload).subscribe((result) => {
      this.filesResult = result;
      this.filesResult.data['items'] = this.idpHelperService.prepareDataForGrid(this.filesResult.data['items']);
      this.idpHelperService.addFileResult(this.filesResult);
      this.filterData = result.data['filters'];
      this.paginationDetailFiles = result.data['pagination'];
      const showFilterList =  this.mappingFilterAttributes(result.data['filters']);
      this.popupFilterList = showFilterList.filter((item) => item.showFilter);
      this.filterMap = filterMapping;
      this.getSummaryMetricDetails(this.filesResult, this.selectedTab);
    });
  }

  sortFiles(sort: any) {
    const filesPayload = {
      sort
    } as IdpSubjectAndFileRequestEto;
    this.getFilesData(this.idpID, filesPayload);
  }

  paginateFiles(pageNumber: number) {
    const filesPayload = {
      pagination: { currentPage: pageNumber + 1 },
      filters: [this.selectedFilteredData]
    } as IdpSubjectAndFileRequestEto;
    this.idpRestService.getFilesByIdp(this.idpID, filesPayload).subscribe((result) => {
      result.data['items'] = this.idpHelperService.prepareDataForGrid(result.data['items']);
      this.filesResult.data['items'] = [...this.filesResult.data['items'], ...result.data['items']]
      this.idpHelperService.addFileResult(this.filesResult);
      this.filterData = result.data['filters'];
      this.paginationDetailFiles = result.data['pagination'];
      const showFilterList =  this.mappingFilterAttributes(result.data['filters']);
      this.popupFilterList = showFilterList.filter((item) => item.showFilter);
      this.filterMap = filterMapping;
      this.getSummaryMetricDetails(this.filesResult, this.selectedTab);
    });
  }

  enabledTabsBasedOnIdpStatus(status: string) {
    this.parentTabs.forEach((tab) => {
      if (tab.label !== 'IDP_Documentation' && status !== 'in_progress') {
        tab.enabled = true;
      }
    });
    console.log(this.parentTabs, "parenttabs is ")
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
      createdDate: createdAt && !isNaN(new Date(createdAt).getTime()) ? dateUtil.formatDate(createdAt) : "-",
      updatedDate: updatedAt && !isNaN(new Date(updatedAt).getTime()) ? dateUtil.formatDate(updatedAt) : "-",
      version: showMetricsResponse?.data?.summary?.currentversion
    };
    this.getSummaryInfo(showMetricsResponse, selectedTabValue);
  }

  formatVersion(version: any) {
    const versionSplitted = version?.split('.')[0];
    return (version >= 1 && version <= 9) ? 'v0' + versionSplitted : 'v' + versionSplitted; 
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
    let metricsDetail;
    // #TODO: These condition will get removed once api will get UP condition are just for temporary
    switch (selectedTabValue) {
      case "IDP_Documentation":
          metricsDetail = {
            subjects: 'subject-user',
            studies: 'study-folder',
            files: 'file-attach',
            sessions: 'file-session',
            acquisitions: 'file-data-pull'
            // analyses: 'file-histo',
          };
          break;
      case "Subjects":
          metricsDetail = {
            subjects: 'subject-user',
            files: 'file-attach',
            sessions: 'file-session',
            acquisitions: 'file-data-pull',
          };
          break;
      case "Files":
          metricsDetail = {
            files: 'file-attach',
            sessions: 'file-session',
            acquisitions: 'file-data-pull',
          };
          break;
      case "ARDs":
          metricsDetail = {};
          break;
      default:
          metricsDetail = {};
        }
      return metricsDetail;
  }

  showMoreStudy(): void{
    this.getIDPResult(this.idpID, this.pageNumber);
  }

  openFilterOptionsPopup() {
    this.isFilterOptionsVisible = !this.isFilterOptionsVisible;
  }

  getFilteredData(data: any) {
    console.log('getFilteredData', data);
    this.filterBadgeResult = structuredClone(data);
    this.isFilterApplied = true;
    delete data.displayName;
    delete data.dialogOptionType;
    data.values = Array.isArray(data.values) ? data.values : [data.values];
    this.selectedFilteredData = data;
    console.log('this.selectedFilteredData', this.selectedFilteredData);
    this.sharedService.batchSubject.next(this.filterBadgeResult);
    const payload : any = {
      filters: Array.isArray(data) ? this.selectedFilteredData : [this.selectedFilteredData]
    } as IdpSubjectAndFileRequestEto;
    console.log('payload for filters', payload.filters)
    if(this.removeAllFilter){
      payload['nlq'] = ['studies'];
    }
    if(this.selectedTab === 'Files'){
      this.getFilesData(this.idpID, payload);
    }else if(this.selectedTab === 'Subjects'){
      this.getSubjectData(this.idpID, payload);
    }
  }

  getBatchesData(data: any) {
    this.batchFlag = true;
    this.transformBatch = []
    if (data.length > 0) {
      this.transformBatch = data.map((item: any) => {
        let valuesArray = item.value.includes(' ') ? item.value.split(' ') : [item.value];
        return {
          id: item.id,
          values: valuesArray,
          type: 'text',
          inclusion: item.inclusion === 'Is' ? true : false
        }
      });
      console.log(' this.transformBatch',  this.transformBatch)
    }else {
      this.removeAllFilter = true;
    }
    this.getFilteredData(this.transformBatch);
  }

  onClickOfFilterOption(filter: any) {
    this.selectedFilterOption = filter;
    this.isDialogOpen = !this.isDialogOpen;
    this.isFilterOptionsVisible = false;
  }

  editBatchDetail(data: any) {
    console.log('editBatchDetail', data);
    const batchData = {
      id: data.id,
      type: 'text',
      inclusion: data.inclusion === 'Is' ? true : false,
      values: data.value.split(' '),
      displayName: data.displayName,
      dialogOptionType: data.dialogOptionType,
      editBatch: true
    }
    this.onClickOfFilterOption(batchData);
  }

  isDialogOpened() {
    this.isDialogOpen = false;
  }

  mappingFilterAttributes(filters: any[]) {
    const filterData: any[] = [];
    filters.forEach((filter) => {
         const filterProperty : any = this.isArdTab ? ardFilterMapping.find((filterMap) => filterMap.id?.toLowerCase() === filter.id?.toLowerCase()) : filterMapping.find((filterMap) => filterMap.id?.toLowerCase() === filter.id?.toLowerCase());
          filterData.push({
            id: filterProperty?.id,
            label: filterProperty?.displayName,
            values: filter.values,
            type: filterProperty?.type,
            dialogOptionType: filterProperty?.dialogOptionType,
            showFilter: filterProperty?.showFilter
          }); 
    });
    this.isArdTab = false;
    return filterData;
  }

  contains(target: any): boolean {
    return (
      this.filter?.nativeElement.contains(target) ||
      (this.popup ? this.popup.nativeElement.contains(target) : false)
    );
  }

  getClinicalData(idpID: string, pageNumber: number) {
    console.log('inside clinical data');
    this.idpRestService.getIdpClinicaldata(idpID, pageNumber).subscribe(response => {
     if (this.pageNumber === 1) {
       this.idpResult = response;
       console.log('response for clinical Data is', response);
       this.statusInfo = this.idpResult?.data.summary?.status;
       console.log('status info',this.statusInfo);
       this.selectedStudiesList = this.idpResult?.data?.items;
       this.studiesList = response?.data?.items;
       this.sharedService.setIDPName(this.idpResult.data.summary.idp_name);
       this.idpName = this.idpResult?.data.summary?.idp_name;
       this.idpInitiatedDate = this.idpResult?.data?.summary?.createdat;
     } else {
       this.studiesList = [...this.studiesList, ...response.data.items];
       this.statusInfo = this.idpResult?.data.summary?.status;
     }
     this.isLastPage = response.data.isLastPage;  
     this.pageNumber++;
     this.enabledTabsBasedOnIdpStatus(this.idpResult.data.summary.status);
     this.getSummaryMetricDetails(this.idpResult, this.selectedTab);
   });
 }
}
