import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NavigationLink } from '../../../../shared/models/navigation-link.model';
import { PaginationEto } from '../../../models/pageRequest';
import { SharedService } from '../../../../shared/services/shared/shared.service';
import exploreDataColumns from '../../../../../assets/columnDefinition/request-access-column.json';
import { Align } from '@progress/kendo-angular-popup';
import { TablePopUp } from '../../../../shared/shared-components/table-pop-up/table-pop-up.component';
import { SortDescriptor } from '@progress/kendo-data-query';
import { NLQRequestEto } from '../../../models/nlqRequestEto';
import filterMapping from '../../../../../assets/filterDefinition/explore-data-filter.json';
import { SummaryInfo } from '../../../../shared/shared-components/summary/summary.component';
import summaryMapper from '../../../../../assets/columnDefinition/summary.json';
import { Router } from '@angular/router';
import { NlqRestService } from '../../../services/nlq-rest.service';
import { FilterBadgeComponent } from '../../../../shared/shared-components/filter-badge/filter-badge.component';
import { LoaderService } from '../../../../shared/services/loader/loader.service';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { RequestAccessDocDialogComponent } from '../request-access-dialog/request-access-dialog.component';
import { RequestAccessService } from '../services/request-access.service';

@Component({
  selector: 'app-request-access',
  templateUrl: './request-access.component.html',
  styleUrl: './request-access.component.scss'
})
export class RequestAccessComponent {
  @ViewChild(FilterBadgeComponent) filterBadgeComponent!: FilterBadgeComponent;
  // @ViewChild('filter') filter!: ElementRef;
  @ViewChild("filter", { read: ElementRef }) public filter!: ElementRef;
  @ViewChild("popup", { read: ElementRef }) public popup!: ElementRef;
  summaryInfo: SummaryInfo[] = [];
  filterMap: any[] = [];
  popupFilterList: any[] = [];
  isChecked = false;
  rowPopUp!: ElementRef;
  previousBreadCrumbValue: string = '';
  showGrid: any;
  isDialogOpen = false;
  isFilterOptionsVisible = false;
  showGridTitle = false;
  gridData: any[] = [];
  pagination!: PaginationEto;
  filterData: any[] = [];
  selectedFilterOption: any;
  filterBadgeResult: any;
  selectedFilteredData: any;
  isFilterApplied = false;
  batchFlag = false;
  transformBatch: any = [];
  gridColumns: any[] = exploreDataColumns;
  showRowPopup = false;
  rowMenuItems: TablePopUp[] = [
    { label: 'Create IDP', action: 'createIDP' },
    { label: 'Create ARD', action: 'createArd' },
    { label: 'Run Analysis', action: 'runAnalysis' },
    { label: 'Export CSV', action: 'exportCsv' },
    { label: 'Download', action: 'download' }
  ];
  anchorAlign: Align = { vertical: 'bottom', horizontal: 'right' };
  popupAlign: Align = { vertical: 'top', horizontal: 'right' };
  breadcrumbs: NavigationLink[] = [
    { label: 'Home', value: 'home', path: ['/home'] },
    { label: 'Explore', value: 'explore', path: ['/exploreData/auth-process'], icon: '../assets/images/activities.svg' },
  ];
  nlqQueryParams: any;
  cascadeSearchQuery = '';
  sortData: any;
  removeAllFilter = false;
  fetchDataInfo = false;
  sqlToText: any = [];
  filterList: any[] = [];
  @HostListener("document:click", ["$event"])
  public documentClick(event: KeyboardEvent): void {
    if (!this.contains(event.target)) {
      this.isFilterOptionsVisible = false;
    } 
  }
  constructor(private requestAccessService: RequestAccessService, private sharedService: SharedService, private router: Router, private nlqRestService: NlqRestService, private loaderService: LoaderService,
    private dialogService: DialogService) {
    this.loaderService.showLoader();
    const routeNav = this.router.getCurrentNavigation();
    if (routeNav?.extras.state) {
      this.nlqQueryParams = routeNav.extras.state['queryParam'];
      localStorage.setItem('nlqText', JSON.stringify(this.nlqQueryParams));
    } else {
      this.nlqQueryParams = JSON.parse(
        localStorage.getItem('nlqText') as string
      );
    }
    if (!this.nlqQueryParams) {   //hardcoded
      this.nlqQueryParams = {
        query: 'studies'
      }
    }
  }

  ngOnInit() {
    // const nlqRequest = {
    //   nlq: ['studies']
    // } as NLQRequestEto;
    const nlqRequest = {
      nlq: this.cascadeSearchQuery
        ? [this.nlqQueryParams?.query, this.cascadeSearchQuery]
        : [this.nlqQueryParams?.query],
      sort: this.sortData,
    } as NLQRequestEto;
    console.log('NLQ REQUEST--', nlqRequest);
    // this.callExploreData(nlqRequest);
    this.callExploreData();
    this.filterMap = filterMapping;
  }


  mapSummaryInfo(reqSummaryData: any): SummaryInfo[] {
    const summaryData: SummaryInfo[] = [];
    summaryMapper.forEach((summary) => {
      if (Object.keys(reqSummaryData).includes(summary.id)) {
        summaryData.push({
          icon: summary.icon,
          name: summary.name,
          value: reqSummaryData[summary.id]
        });
      }

    });
    return summaryData;
  }

  // callExploreData(nlqRequest: NLQRequestEto): void {
  //   this.requestAccessService.getExploreData(nlqRequest).subscribe((result) => {
  //     this.showGrid = true;
  //     this.gridData = this.prepareDataForGrid(result.data['items']);
  //     this.pagination = result.data['pagination'];
  //     this.summaryInfo = this.mapSummaryInfo(result.data['summary']);
  //     this.popupFilterList = this.mappingFilterAttributes(result.data['filters']);
  //     console.log(' this.popupFilterList--->', this.popupFilterList);
  //     this.filterMap = filterMapping;
  //   });
  // }
  async callExploreData() {
    const nlqRequest = {
      nlq: [this.nlqQueryParams?.query],
    } as NLQRequestEto;
    await this.callNlqSearch(nlqRequest);
  }

  private prepareDataForGrid(gridData: any[]) {
    gridData.forEach((allData: any) => {
      allData['checked'] = false;
      allData.SubjectID = allData.SubjectID ? allData.SubjectID : '-';
      allData.VisitUid = allData.VisitUid ? allData.VisitUid : '-';
      allData.AcquistionOrigin_id = allData.AcquistionOrigin_id ? allData.AcquistionOrigin_id : '-';
      allData.FileUUID = allData.FileUUID ? allData.FileUUID : '-';
      allData.StudyAcronym = allData.StudyAcronym !== 'null' ? allData.StudyAcronym : '-';
    });
    return gridData;
  }

  hideGridTitle(value: boolean) {
    this.showGridTitle = value;
  }

  cascadeSearch(query: string) {
    console.log('cascade search query', query);
  }

  // getSortedData(event: SortDescriptor) {
  //   const sort = {
  //     field: event.field,
  //     order: event?.dir?.toUpperCase()
  //   }
  //   const nlqRequest = {
  //     nlq: ['studies'],
  //     sort
  //   } as NLQRequestEto;
  //   this.callExploreData(nlqRequest);
  // }

  async getSortedData(event: SortDescriptor) {
    const { dir, ...sortData } = event;
    this.sortData = sortData;
    this.sortData['order'] = event?.dir?.toUpperCase();
    const nlqRequest = {
      nlq: this.cascadeSearchQuery
        ? [this.nlqQueryParams?.query, this.cascadeSearchQuery]
        : [this.nlqQueryParams?.query],
      sort: this.sortData,
    } as NLQRequestEto;
    await this.callNlqSearch(nlqRequest);
  }

  getPaginatedData(page: number) {
    const nlqRequest = {
      nlq: this.cascadeSearchQuery
        ? [this.nlqQueryParams?.query, this.cascadeSearchQuery]
        : [this.nlqQueryParams?.query],
      pagination: { currentPage: page + 1 },
      filters: this.selectedFilteredData
    } as NLQRequestEto;
    this.requestAccessService.getExploreData(nlqRequest).subscribe((result) => {
      this.showGrid = true;
      for (let data of this.prepareDataForGrid(result.data['items'])) {
        this.gridData.push(data);
      }
      this.filterData = result.data['filters'];
      this.popupFilterList = this.mappingFilterAttributes(result.data['filters']);
      this.pagination = {
        page: result.data['pagination']?.page,
        pageSize: this.gridData.length, // result.data['pagination']?.page * result.data['pagination']?.pageSize,
        totalCount: result.data['pagination']?.totalCount,
      };
    });
    this.loaderService.hideLoader();
  }

  openFilterOptionsPopup() {
    this.isFilterOptionsVisible = !this.isFilterOptionsVisible;
  }

  // getFilteredData(data: any) {
  //   console.log('getFilteredData', data);
  //   this.filterBadgeResult = structuredClone(data);
  //   this.isFilterApplied = true;
  //   delete data.displayName;
  //   delete data.dialogOptionType;
  //   this.selectedFilteredData = data;
  //   this.sharedService.batchSubject.next(this.filterBadgeResult);
  // }

  async getFilteredData(data: any) {
    this.filterBadgeResult = structuredClone(data);
    this.isFilterApplied = true;
    delete data.displayName;
    delete data.dialogOptionType;
    this.selectedFilteredData = data;
    const payload = {
      nlq: this.cascadeSearchQuery
        ? [this.nlqQueryParams?.query, this.cascadeSearchQuery]
        : [this.nlqQueryParams?.query],
      filters: Array.isArray(data) ? this.selectedFilteredData : [this.selectedFilteredData]
    } as NLQRequestEto;
    //#TODO: Once api will handle it from BE enable this
    if (this.removeAllFilter) {
      payload.nlq = ['studies'];
    }
    console.log('paload', payload);
    await this.callNlqSearch(payload);
  }


  async callNlqSearch(nlqRequest: NLQRequestEto) {
    //this.fetchDataInfo = true;
    const nlqResponse = await this.requestAccessService.getExploreData(nlqRequest).toPromise();
    if (
      nlqResponse &&
      nlqResponse?.data &&
      nlqResponse.data['items'].length > 0
    ) {
      this.showGrid = true;
      this.fetchDataInfo = false;
      this.gridData = this.prepareDataForGrid(nlqResponse.data['items']);
      if (nlqResponse.data['summary']) {
        this.summaryInfo = this.mapSummaryInfo(nlqResponse.data['summary']);
      }
      this.pagination = nlqResponse.data['pagination'];
      this.filterData = nlqResponse.data['filters'];

      const sqlToTextValue = nlqResponse.data['text2sql'];
      this.sqlToText = this.extractWhereConditions(sqlToTextValue[0])
      if (this.isFilterApplied) {
        this.sharedService.batchSubject.next(this.filterBadgeResult);
      } else {
        this.filterBadgeComponent.sqlToTextData(this.sqlToText)
      }
      this.sharedService.batchSubject.next(null);
      this.filterData.forEach((x: any) => this.filterList.push(x.id));
      this.gridData.filter(x => this.rowMenuItems.push(x.DataSources));
      this.popupFilterList = this.mappingFilterAttributes(nlqResponse.data['filters']);
      // this.prepareAccessControlData(this.rowMenuItems);
    } else if (nlqResponse.status === 503 || nlqResponse.status === 500 ||
      nlqResponse.status === 400 || nlqResponse.status === 404 ||
      nlqResponse?.data['items'].length === 0) {
      this.showGrid = false;
      this.fetchDataInfo = true;
    }
    this.loaderService.hideLoader();
  }

  onClickOfFilterOption(studyFilter: any) {
    console.log('onClickOfFilterOption', studyFilter);
    this.selectedFilterOption = studyFilter;
    this.isDialogOpen = !this.isDialogOpen;
    this.isFilterOptionsVisible = false;
  }

  // getBatchesData(data: any) {
  //   this.batchFlag = true;
  //   this.transformBatch = []
  //     if(data.length > 0){
  //     this.transformBatch =  data.map((item:any)=>{
  //       let valuesArray = item.value.includes(' ') ? item.value.split(' ') : [item.value];
  //       return {
  //         id: item.id,
  //         values: valuesArray,
  //         type:'text',
  //         inclusion:item.inclusion === 'Is' ? true: false
  //       }
  //       });
  //     }
  // }

  getBatchesData(data: any) {
    this.batchFlag = true;
    this.transformBatch = []
    if (data.length > 0) {
      this.transformBatch = data.map((item: any) => {
        let valuesArray = item.value.includes(" ") ? item.value.split(" ") : [item.value];
        return {
          id: item.id,
          values: valuesArray,
          type: "text",
          inclusion: item.inclusion === "Is" ? true : false
        }
      })
    }
    //#TODO: Once api will handle it from BE enable thi
    else {
      this.removeAllFilter = true;
    }
    this.getFilteredData(this.transformBatch);
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

  onPopupItemClick(action: string): void {
    console.log('Popup Item Clicked:', action);
    // Handle the action based on the item clicked
  }

  openRowMenu(element: any): void {
    const clickedElement = element.event.target;
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

  mappingFilterAttributes(filters: any[]) {
    const filterData: any[] = [];
    filters.forEach((filter) => {
      const filterProperty = filterMapping.find((filterMap: any) => filterMap.id === filter.id);
      if (filterProperty) {
        filterData.push({
          id: filterProperty?.id,
          label: filterProperty?.displayName ?? filter.id,
          values: filter.values,
          type: filterProperty?.type,
          dialogOptionType: filterProperty?.dialogOptionType
        });
      } else {
        console.warn(`No mapping found for filter id: ${filter.id}`);
      }
    });

    console.log('filterData----', filterData);
    return filterData;
  }

  extractWhereConditions(sql: string): any[] {
    const extractedConditions: any = [];
    const whereClause = sql.split(/where/i)[1]?.trim();
    if (whereClause) {
      const conditions = whereClause.split(/\s+(AND|OR)\s+/i);
      const conditionRegex = /(?:LOWER\()?(\w+)\)?\s+LIKE\s+(?:LOWER\()?['"]?%([^%'"]+)%['"]?\)?/i;
      for (let i = 0; i < conditions.length; i++) {
        const condition = conditions[i];
        const match = condition.match(conditionRegex);
        if (match) {
          const [, column, value] = match;
          extractedConditions.push({
            id: column,
            value: value,
            displayName: '',
            isFilter: false,
            inclusion: 'Is'
          });
        }
      }
    } else {
      const fromClause = sql.split(/FROM/i);
      if (fromClause[0].indexOf('*')) {
        extractedConditions.push({
          id: '',
          value: fromClause[1],
          displayName: 'All',
          isFilter: false,
          inclusion: 'Is'
        })
      }
    }
    // if (!whereClause) {
    //   return [];
    // }

    const extractedColumnLength = extractedConditions.length;
    exploreDataColumns.find((item: any, index: number) => {
      for (let i = 0; i < extractedColumnLength; i++) {
        for (let j = 0; j < exploreDataColumns.length; j++) {
          if ((extractedConditions[i]['id']).toLowerCase() === (item.id).toLowerCase()) {
            extractedConditions[i]['displayName'] = exploreDataColumns[index]['name'];
          }
        }
      }
    });
    return extractedConditions;
  }

  contains(target: any): boolean {
    return (
      this.filter?.nativeElement.contains(target) ||
      (this.popup ? this.popup.nativeElement.contains(target) : false)
    );
  }


  openExploreDocumentationDetails(event: any) {
    console.log("eeee", event)
    const dialogRef: DialogRef = this.dialogService.open({
      content: RequestAccessDocDialogComponent,
    });
    const instance = dialogRef.content.instance;
    instance.exploreId = 'Imaging Data Access Request';
  }
}