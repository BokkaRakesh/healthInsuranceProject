import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NavigationLink } from '../../../../../shared/models/navigation-link.model';
import { PaginationEto } from '../../../../models/pageRequest';
import { SharedService } from '../../../../../shared/services/shared/shared.service';
import { TablePopUp } from '../../../../../shared/shared-components/table-pop-up/table-pop-up.component';
import idpCatalogColumns from '../../../../../../assets/columnDefinition/idp-catalog-columns.json';
import summaryMapper from '../../../../../../assets/columnDefinition/summary.json';
import filterMapping from '../../../../../../assets/filterDefinition/idp-catalog-filter.json';
import { Align } from '@progress/kendo-angular-popup';
import { IdpRestService } from '../../../../services/idp-rest.service';
import { SummaryInfo } from '../../../../../shared/shared-components/summary/summary.component';
import { NLQRequestEto } from '../../../../models/nlqRequestEto';
import { SortDescriptor } from '@progress/kendo-data-query';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoaderService } from '../../../../../shared/services/loader/loader.service';
import { filter } from 'rxjs';
import { FilterBadgeComponent } from '../../../../../shared/shared-components/filter-badge/filter-badge.component';
import { NlqRestService } from '../../../../services/nlq-rest.service';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
@Component({
  selector: 'app-idp-catalog',
  templateUrl: './idp-catalog.component.html',
  styleUrl: './idp-catalog.component.scss'
})
export class IdpCatalogComponent {
  @ViewChild(FilterBadgeComponent) filterBadgeComponent!: FilterBadgeComponent; 
  @ViewChild("filter", { read: ElementRef }) public filter!: ElementRef;
  @ViewChild("popup", { read: ElementRef }) public popup!: ElementRef;
  isChildRoute: boolean  = false;
  rowPopUp!: ElementRef;
  previousBreadCrumbValue: string = '';
  showGrid = false;
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
  transformBatch!: any[];
  gridColumns: any = idpCatalogColumns;
  showRowPopup = false;
  showGipAIPopup = false;
  summaryInfo: SummaryInfo[] = [];
  popupFilterList: any[] = [];
  filterMap: any[] = [];
  nlqQuery = '';
  breadcrumbs: NavigationLink[] = [
    { label: 'Home', value: 'home', path: ['/home'] },
    { label: 'Explore', value: 'explore', path: ['/exploreData/auth-process'], icon: '../assets/images/activities.svg' }
  ];
  rowMenuItems: TablePopUp[] = [
    { label: 'Information', action: 'information' },
    { label: 'Version History', action: 'versionHistory' },
    { label: 'Create ARD', action: 'createArd' },
    { label: 'Run Analysis', action: 'runAnalysis' },
    { label: 'Export CSV', action: 'exportCsv' },
    { label: 'Download', action: 'download' }
  ];
  anchorAlign: Align = { vertical: 'bottom', horizontal: 'right' };
  popupAlign: Align = { vertical: 'top', horizontal: 'right' };
  isChecked = false;
  nlqQueryParams: any;
  cascadeSearchQuery = '';
  sortData: any;
  removeAllFilter=false;
  fetchDataInfo: any;
  sqlToText: any = [];
  filterList: any[] = [];  
  @HostListener("document:click", ["$event"])
  public documentClick(event: KeyboardEvent): void {
    if (!this.contains(event.target)) {
      this.isFilterOptionsVisible = false;
    }
  }
  constructor(private idpRestService: IdpRestService, private sharedService: SharedService,
    private router: Router,  private loaderService: LoaderService, private route: ActivatedRoute,private nlqRestService: NlqRestService, private dialogService: DialogService,
  ) {
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
    if(!this.nlqQueryParams){
      this.nlqQueryParams = {
        query: 'studies'
      }
    }
  }

  ngOnInit() {
    const nlqRequest = {
      nlq: this.cascadeSearchQuery
        ? [this.nlqQueryParams?.query, this.cascadeSearchQuery]
        : [this.nlqQueryParams?.query],
      sort: this.sortData,
    } as NLQRequestEto;
    console.log('NLQ REQUEST--',nlqRequest);
    this.callIDPCatalog();
    this.filterMap = filterMapping;
    // this.getCatalogResult();
    this.checkForChildRoute();
  }

  private checkForChildRoute() {
    this.isChildRoute = this.route.firstChild != null;
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isChildRoute = this.route.firstChild != null;
      });
}
  // async getCatalogResult() {
  //   const nlqRequest = {
  //     nlq: [this.nlqQueryParams?.query],
  //   } as NLQRequestEto;
  //   await this.callIDPCatalog(nlqRequest);
  // }

  // callIDPCatalog(req: NLQRequestEto) {
  //   this.idpRestService.getIdpCatalog(req).subscribe((result) => {
  //     this.showGrid = true;
  //     this.gridData = result.data['items'];
  //     this.gridData.map((item: any, index: number) => {
  //       this.gridData[index]['IdpName'] = item.IdpType === 'custom' ? item.IdpName : item.StudyAcronym;
  //     });
  //     this.pagination = result.data['pagination'];
  //     this.filterData = result.data['filters'];
  //     this.summaryInfo = this.mapSummaryInfo(result.data['summary']);
  //     this.popupFilterList = this.mappingFilterAttributes(result.data['filters']);
  //     this.filterMap = filterMapping;
  //   });
  // }
  

  async callIDPCatalog() {
    const nlqRequest = {
      nlq: [this.nlqQueryParams?.query],
    } as NLQRequestEto;
    await this.callNlqSearch(nlqRequest);
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
  //     nlq: [ this.nlqQuery ],
  //     sort
  //   } as NLQRequestEto;
  //   this.callIDPCatalog(nlqRequest);
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

  async callNlqSearch(nlqRequest: NLQRequestEto) {
    const nlqResponse = await this.idpRestService.getIdpCatalog(nlqRequest).toPromise();
    if (
      nlqResponse &&
      nlqResponse?.data &&
      nlqResponse.data['items'].length > 0
    ) {
      this.showGrid = true;
      this.fetchDataInfo = false;
      this.gridData = this.prepareDataForGrid(nlqResponse.data['items']);
      this.gridData.map((item: any, index: number) => {
        this.gridData[index]['StudyAcronym'] = item.IdpType === 'custom' ? item.IdpName : item.StudyAcronym;
    });
      if(nlqResponse.data['summary']){
      this.summaryInfo = this.mapSummaryInfo(nlqResponse.data['summary']);
      }
      this.pagination = nlqResponse.data['pagination'];
      this.filterData = nlqResponse.data['filters'];
      
      const sqlToTextValue = nlqResponse.data['text2sql'];
        this.sqlToText = this.extractWhereConditions(sqlToTextValue[0])
        if(this.isFilterApplied){
          this.sharedService.batchSubject.next(this.filterBadgeResult);
        }else{
          this.filterBadgeComponent.sqlToTextData(this.sqlToText) 
        }
        this.sharedService.batchSubject.next(null);
      this.filterData.forEach((x: any) => this.filterList.push(x.id));
      this.gridData.filter(x => this.rowMenuItems.push(x.DataSources) );
      this.popupFilterList = this.mappingFilterAttributes(nlqResponse.data['filters']);
      // this.prepareAccessControlData(this.rowMenuItems);
    } else {
      this.showGrid = false;
    }
    this.loaderService.hideLoader();
  }

  // getPaginatedData(page: number) {
  //   const nlqRequest = {
  //     nlq: [ this.nlqQuery ],
  //     pagination: { currentPage: page + 1 },
  //     filters: this.selectedFilteredData
  //   } as NLQRequestEto;
  //   this.idpRestService.getIdpCatalog(nlqRequest).subscribe((result) => {
  //     this.showGrid = true;
  //     for (let data of result.data['items']) {
  //       this.gridData.push(data);
  //     }
  //     this.filterData = result.data['filters'];
  //     this.popupFilterList = this.mappingFilterAttributes(result.data['filters']);
  //     this.pagination = {
  //       page: result.data['pagination']?.page,
  //       pageSize: this.gridData.length, // result.data['pagination']?.page * result.data['pagination']?.pageSize,
  //       totalCount: result.data['pagination']?.totalCount,
  //     };
  //   });
  // }

  getPaginatedData(page: number) {
    const nlqRequest = {
      nlq: this.cascadeSearchQuery
      ? [this.nlqQueryParams?.query, this.cascadeSearchQuery]
      : [this.nlqQueryParams?.query],
      pagination: { currentPage: page + 1 },
      filters: this.selectedFilteredData
    } as NLQRequestEto;
    this.idpRestService.getIdpCatalog(nlqRequest).subscribe((result) => {
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

  getFilteredData(data: any) {
    console.log('getFilteredData', data);
    this.filterBadgeResult = structuredClone(data);
    this.isFilterApplied = true;
    delete data.displayName;
    delete data.dialogOptionType;
    this.selectedFilteredData = data;
    this.sharedService.batchSubject.next(this.filterBadgeResult);
    const payload = {
      nlq: this.cascadeSearchQuery
        ? [this.nlqQueryParams?.query, this.cascadeSearchQuery]
        : [this.nlqQueryParams?.query],
      filters: Array.isArray(data) ?  this.selectedFilteredData : [ this.selectedFilteredData]
    } as NLQRequestEto;
    console.log('paload', payload);
     this.callNlqSearch(payload);
  }

  onClickOfFilterOption(studyFilter: any) {
    this.selectedFilterOption = studyFilter;
    this.isDialogOpen = !this.isDialogOpen;
    this.isFilterOptionsVisible = false;
  }

  // getBatchesData(data: any) {
  //   this.batchFlag = true;
  //   this.transformBatch = []
  //   if (data.length > 0) {
  //     this.transformBatch = data.map((item: any) => {
  //       let valuesArray = item.value.includes(' ') ? item.value.split(' ') : [item.value];
  //       return {
  //         id: item.id,
  //         values: valuesArray,
  //         type: 'text',
  //         inclusion: item.inclusion === 'Is' ? true : false
  //       }
  //     });
  //   }
  // }
  getBatchesData(data  :any){
    this.batchFlag = true;
    this.transformBatch = []
      if(data.length > 0){
      this.transformBatch =  data.map((item:any)=>{
        let valuesArray = item.value.includes(" ") ? item.value.split(" ") : [item.value];
        return {
          id: item.id,
          values: valuesArray,
          type:"text",
          inclusion:item.inclusion === "Is" ? true: false
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

  mapSummaryInfo(reqSummaryData: any): SummaryInfo[] {
    console.log('reqSummaryData---',reqSummaryData);
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
    console.log('summaryData---',summaryData);
    return summaryData;
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


  openRowClickedEvent(event: any){
    if(event.column.title !== ""){
      this.router.navigate(['home/idp-catalog/idp/', event?.dataItem?.IdpUnqId]);
    }
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
    const extractedConditions : any= [];
    const whereClause = sql.split(/where/i)[1]?.trim();
    if(whereClause){
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
            displayName:'',
            isFilter: false,
            inclusion: 'Is'
          });
        }
      }
    }else{
      const fromClause = sql.split(/FROM/i);
    if(fromClause[0].indexOf('*')){
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
    idpCatalogColumns.find((item :any, index:number)=>{
        for(let i = 0;i<extractedColumnLength;i++){
          for(let j=0;j< idpCatalogColumns.length;j++){
            if((extractedConditions[i]['id']).toLowerCase() === (item.id).toLowerCase()){
              extractedConditions[i]['displayName'] = idpCatalogColumns[index]['name'];
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

  emitOnRequestEvent(event:any){
    // #TODO for opening request dialog
  }
}
