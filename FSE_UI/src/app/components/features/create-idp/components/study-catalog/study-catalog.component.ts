import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { GridService } from '../../../../../shared/services/grid/grid.service';
import { Router } from '@angular/router';
import { NlqRestService } from '../../../../services/nlq-rest.service';
import { NLQRequestEto } from '../../../../models/nlqRequestEto';
import { PaginationEto } from '../../../../models/pageRequest';
import { SortDescriptor } from '@progress/kendo-data-query';
import { filterEto } from '../../../../models/filterEto';
import { LoaderService } from '../../../../../shared/services/loader/loader.service';
import { SharedService } from '../../../../../shared/services/shared/shared.service';
import studyColumnInfo from '../../../../../../assets/columnDefinition/study-columns.json';
import { FilterBadgeComponent } from '../../../../../shared/shared-components/filter-badge/filter-badge.component';
import { TablePopUp } from '../../../../../shared/shared-components/table-pop-up/table-pop-up.component';
import { Align } from '@progress/kendo-angular-popup';
import { SummaryInfo } from '../../../../../shared/shared-components/summary/summary.component';
import summaryMapper from '../../../../../../assets/columnDefinition/summary.json';
import { AccessControlPopUp } from '../../../../../shared/shared-components/access-control-popup/access-control-popup.component';
import filterMapping from '../../../../../../assets/filterDefinition/study-filter.json';
@Component({
  selector: 'app-study-catalog',
  templateUrl: './study-catalog.component.html',
  styleUrl: './study-catalog.component.scss',
})
export class StudyCatalogComponent implements OnInit {
  @ViewChild(FilterBadgeComponent) filterBadgeComponent!: FilterBadgeComponent; 
  @ViewChild("filter", { read: ElementRef }) public filter!: ElementRef;
  @ViewChild("popup", { read: ElementRef }) public popup!: ElementRef;
  copyGridData: any[] =[];
  rowPopUp!: ElementRef;
  removeAllFilter = false;
  sqlToText: any = [];
  isFilterApplied = false;
  filterBadgeResult: any;
  selectedFilteredData: any;
  showGridTitle = false;
  isFilterOptionsVisible: boolean = false;
  isDialogOpen = false;
  studyfilterList: any[] = [
    'Ethical Approval',
    'Demographic',
    'Exposure',
    'Subject Visit',
    'Genomic Measurement',
    'Imaging',
  ];
  public gridData: any[] = [];
  public gridColumns: any[] = studyColumnInfo;
  idpReqResData: any;
  nlqQueryParams: any;
  sortObj: any;
  sortData!: any;
  cascadeSearchQuery: string = '';
  pagination!: PaginationEto;
  dataSourceName!: string;
  showddSingle = false;
  showddMulti = false;
  showRange = false;
  showDatePicker = false;
  selectedRecords: any[] = [];
  showGrid: any;
  fetchDataInfo = false;

  dialogOptions: any = {
    showddSingle: false,
    showddMulti: false,
    showRange: false,
    showDatePicker: false,
  };
  filterList: any[] = [];
  selectedFilterOption: any;
  batchFlag = false;
  filterData: any[] = [
  ];
  transformBatch: any=[];
  showRowPopup = false;
  showAccessPopup= false;
  rowMenuItems: TablePopUp[] = [
    { label: 'Explore', action: 'explore' },
    { label: 'Explore Subject Data', action: 'exploreSubjectData' },
    { label: 'Create ARD', action: 'createArd' },
    { label: 'Run Analysis', action: 'runAnalysis' },
    { label: 'Export CSV', action: 'exportCsv' },
    { label: 'Download', action: 'download' }
  ];
  accessControlMenuItems: AccessControlPopUp[]=[];
  anchorAlign: Align = { vertical: 'bottom', horizontal: 'right' };
  popupAlign: Align = { vertical: 'top', horizontal: 'right' };
  nlqQuery = '';
  summaryInfo: SummaryInfo[] = [];
  selectedUniqueID = '';
  filterMap: any[] = [];
  popupFilterList: any[] = [];
  @HostListener("document:click", ["$event"])
  public documentClick(event: KeyboardEvent): void {
    if (!this.contains(event.target)) {
      this.isFilterOptionsVisible = false;
    }
  }
  constructor(
    private gridService: GridService,
    private router: Router,
    private nlqRestService: NlqRestService,
    private loaderService: LoaderService, private sharedService: SharedService
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

  async ngOnInit() {
    this.gridService.findDatasubject.subscribe((records) => {
      this.selectedRecords = records;
    });
    await this.getIDPResult();
    this.filterMap = filterMapping;
  }

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

  async getIDPResult() {
    const nlqRequest = {
      nlq: [this.nlqQueryParams?.query],
    } as NLQRequestEto;
    await this.callNlqSearch(nlqRequest);
  }

  async callNlqSearch(nlqRequest: NLQRequestEto) {
    const nlqResponse = await this.nlqRestService
      .searchWithNlq(nlqRequest)
      .toPromise();
    if (
      nlqResponse &&
      nlqResponse?.data &&
      nlqResponse.data['items'].length > 0
    ) {
      this.showGrid = true;
      this.fetchDataInfo = false;
      this.copyGridData = structuredClone(nlqResponse.data['items']);
      this.gridData = this.prepareDataForGrid(nlqResponse.data['items']);
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
      this.popupFilterList = this.mappingFilterAttributes(nlqResponse.data['filters']);
    } else if (nlqResponse.status === 503 || nlqResponse.status === 500 ||
               nlqResponse.status === 400 || nlqResponse.status === 404 ||
               nlqResponse?.data['items'].length === 0
    ){
      this.showGrid = false;
      this.fetchDataInfo = true;
    }
    this.loaderService.hideLoader();
  }

  prepareAccessControlData(accessControlMenuItems: any[]){
    console.log('rowMenuItems---',accessControlMenuItems);
    console.log('GRID DAATA--',this.gridData);
    console.log('Selected selectedUniqueID Id',this.selectedUniqueID);
    console.log('Access Control Menu Items:', this.accessControlMenuItems);
    console.log('accessControlMenuItems:', this.accessControlMenuItems);
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
    let dataAccessItems:any =[];
    gridData.forEach((allData:any) => {
            allData['checked'] = false;
            allData.Subjects = allData.Subjects ? allData.Subjects : '-';
            allData.Sessions = allData.Sessions ? allData.Sessions : '-';
            allData.Aquisitions = allData.Aquisitions ? allData.Aquisitions : '-';  
            allData.Files = allData.Files ? allData.Files : '-'; 
            allData.DataSources = allData.DataSources ? allData.DataSources : '-';          
    });
    return gridData;
  }

  transformDataSource(dataSource: any[]) {
    if (dataSource.length > 0) {
      const tranformLabel = dataSource.map(item => item.id).join(', ');
      return tranformLabel;
    }
    return '-';
  }
  
  async cascadeSearch(query: string) {
    this.cascadeSearchQuery = query;
    const nlqRequest = {
      nlq: [this.nlqQueryParams?.query, query],
    } as NLQRequestEto;
    this.callNlqSearch(nlqRequest);
  }

  openFilterOptionsPopup(): void {
    this.isFilterOptionsVisible = !this.isFilterOptionsVisible;
  }

  hideGridTitle(value: boolean) {
    this.showGridTitle = value;
  }

  async getPaginatedData(event: number) {
    const nlqRequest = {
      nlq: this.cascadeSearchQuery
        ? [this.nlqQueryParams?.query, this.cascadeSearchQuery]
        : [this.nlqQueryParams?.query],
      pagination: { currentPage: event + 1 },
      filters: this.selectedFilteredData,
    } as NLQRequestEto;
    const nlqResponse = await this.nlqRestService
      .searchWithNlq(nlqRequest)
      .toPromise();
    for (let i of nlqResponse.data['items']) {
      this.gridData.push(i); 
      console.log('paginated for loop data---',this.gridData);
    }
    this.copyGridData = structuredClone(nlqResponse.data['items']);
    this.gridData.push(this.prepareDataForGrid(nlqResponse.data['items']));
    console.log('paginated data---',this.gridData);
    this.filterData = nlqResponse.data['filters'];
    this.popupFilterList = this.mappingFilterAttributes(nlqResponse.data['filters']);
    this.pagination = {
      page: nlqResponse.data['pagination']?.page,
      pageSize: this.gridData.length, // nlqResponse.data['pagination']?.page * nlqResponse.data['pagination']?.pageSize,
      totalCount: nlqResponse.data['pagination']?.totalCount,
    };
    console.log('pagination data---',this.pagination);
    this.loaderService.hideLoader();
  };

  onClickOfFilterOption(studyFilter: any) {
    console.log(studyFilter);
    this.selectedFilterOption = studyFilter;
    this.isDialogOpen = !this.isDialogOpen;
    this.isFilterOptionsVisible = false;
  }

  async getFilteredData(data: filterEto) {
    this.filterBadgeResult = structuredClone(data);
    this.isFilterApplied = true;
	  delete data.displayName;
    delete data.dialogOptionType;
    this.selectedFilteredData = data;
    const payload = {
      nlq: this.cascadeSearchQuery
        ? [this.nlqQueryParams?.query, this.cascadeSearchQuery]
        : [this.nlqQueryParams?.query],
      filters: Array.isArray(data) ?  this.selectedFilteredData : [ this.selectedFilteredData]
    } as NLQRequestEto;
    //#TODO: Once api will handle it from BE enable this
    if(this.removeAllFilter){
      payload.nlq = ['studies'];
    }
    console.log('paload', payload);
    await this.callNlqSearch(payload);
    
  }

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

  isDialogOpened(){
    this.isDialogOpen = false;
  }

  editBatchDetail(data: any){
   let batchData = {
    id: data.id,
    type: "text",
    inclusion: data.inclusion=== "Is"? true : false,
    values: data.value.split(" "),
    displayName: data.displayName,
    dialogOptionType: data.dialogOptionType,
    editBatch:true
    }
    this.onClickOfFilterOption(batchData)
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
  openAccessMenu(element: any): void {
    const clickedElement = element.event.target;
    console.log('showAccessPopup - openRowMenu', element.event.target, '---', this.rowPopUp);
    // Toggle the popup visibility if the same button is clicked
    if (this.rowPopUp === clickedElement && this.showAccessPopup) {
      this.showAccessPopup = false;
      this.showRowPopup = false;
    } else {
      this.rowPopUp = clickedElement;
      this.selectedUniqueID = element.data.StudyID;
      this.showAccessPopup = true;
      this.showRowPopup = false;
      this.getDataSource(element.data);
    }
  }

  getDataSource(StudyData: any) {
    const filterStudyId = this.copyGridData.filter((item) => item.StudyID === StudyData.StudyID);
    if (filterStudyId.length > 0) {
      this.accessControlMenuItems = filterStudyId[0].DataSources.map((dataSource: any) => ({
        ...dataSource,
        StudyID: filterStudyId[0].StudyID,
        StudyNumber: StudyData.StudyNumber
      }));
    }
  }
  onPopupItemClick(action: string): void {
    console.log('Popup Item Clicked:', action);
    // Handle the action based on the item clicked
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
    studyColumnInfo.find((item :any, index:number)=>{
        for(let i = 0;i<extractedColumnLength;i++){
          for(let j=0;j< studyColumnInfo.length;j++){
            if((extractedConditions[i]['id']).toLowerCase() === (item.id).toLowerCase()){
              extractedConditions[i]['displayName'] = studyColumnInfo[index]['name'];
            }
          }  
        }
     });
    return extractedConditions;
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
  contains(target: any): boolean {
    return (
      this.filter?.nativeElement.contains(target) ||
      (this.popup ? this.popup.nativeElement.contains(target) : false)
    );
  }
}