import { Component, OnInit } from '@angular/core';
import { SummaryDetailEto, SummaryMetricsEto } from '../../../../models/IdpEto';
import { ActivatedRoute, Router } from '@angular/router';
import { IdpRestService } from '../../../../services/idp-rest.service';
import { IdpHelperService } from '../../services/idp-helper.service';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrl: './subject-details.component.scss'
})
export class SubjectDetailsComponent implements OnInit {
  pageNumber : number = 1;
  isLastPage = true;
  public summary: Array<SummaryMetricsEto> = [];
  summaryDetails: SummaryDetailEto = {
    dataSources: '',
    createdBy: '',
    modalities: '',
  };
  subjectResult!: any;
  parentTabs = [
    {
      value: 'Files',
      label: 'Files',
      isSelected: true,
      enabled: true,
    },
    {
      value: 'Documentation',
      label: 'Documentation',
      isSelected: false,
      enabled: true,
    },
    {
      value: 'Activities',
      label: 'Activities',
      isSelected: false,
      enabled: true,
    }
  ];
  idpID : any;
  favouriteSelection = false;
  selectedTab: any = this.parentTabs.find((tab) => tab.enabled)?.value ?? '';
  studiesList: any;
  isFilterOptionsVisible = false;
  selectedFilterOption: any;
  isDialogOpen = false;
  batchFlag = false;
  transformBatch!: any[];
  filterData: any[] = [];

  constructor(private route: ActivatedRoute, 
    private idpRestService: IdpRestService, private router: Router,
    private idpHelperService: IdpHelperService
  ){}

  ngOnInit(): void {
    this.idpID = this.route.snapshot.paramMap.get('idpId');
    this.getSubjectDocumentationData();
  }

  getSubjectDocumentationData() {
    this.idpRestService.getSubjectDocumentationInfo().subscribe((response: any) => {
        this.subjectResult = response;
        this.studiesList = response.data.items;
        this.getSummaryMetricDetails(this.selectedTab);
    });
  };

  getSubjectActivitiesData(): void {
    this.idpRestService.getIdpSubjectActivities(this.idpID, 'abcd').subscribe((result) => {
      this.idpHelperService.addSubjectActivitiesResult(result);
    });
  }

  getSelectedTabInfo(event: any) {
    this.getSelectedTabData(event.value)
    this.getSummaryMetricDetails(this.selectedTab)
  };

  getSelectedTabData(tabName: string) {
    this.selectedTab = tabName;
    switch(tabName) {
      case 'Files':
        break;
      case 'Documentation':
        this.getSubjectDocumentationData();
        break;
      case 'Activities':
        this.getSubjectActivitiesData();
        break;
      default:
        break;
    }
  }

  selectFavourite() {
    this.favouriteSelection = !this.favouriteSelection;       
  }

  getSummaryMetricDetails(selectedTabValue: string){
    this.summaryDetails = {
      dataSources: this.subjectResult.data.summary?.datasources || '-',
      modalities: this.subjectResult.data.summary?.modality || '-',
      createdBy: this.subjectResult.data.summary.createdby  || '-',
    };
    this.getSummaryInfo(selectedTabValue);
  }

  getSummaryInfo(selectedTabValue: string) {
    const summaryData: any =  this.subjectResult?.data?.summary;
    if (summaryData) {
      const summaryKeys = Object.keys( this.subjectResult.data.summary);
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
    return {
      files: 'file-attach',
      sessions: 'file-session',
      acquisitions: 'file-data-pull',
    }
  }

  openIdpDetails() {
    this.router.navigate(['home/idp-details/idp/', this.idpID]);
  }

  isDialogOpened() {
    this.isDialogOpen = false;
  }

  openFilterOptionsPopup() {
    this.isFilterOptionsVisible = !this.isFilterOptionsVisible;
  }

  onClickOfFilterOption(studyFilter: any) {
    this.selectedFilterOption = studyFilter;
    this.isDialogOpen = !this.isDialogOpen;
    this.isFilterOptionsVisible = false;
  }

  getFilteredData(data: any) {
    // this.filterBadgeResult = structuredClone(data);
    // this.isFilterApplied = true;
    // delete data.displayName;
    // delete data.dialogOptionType;
    // this.selectedFilteredData = data;
    // this.sharedService.batchSubject.next(this.filterBadgeResult);
    // const payload = {
    //   nlq: this.cascadeSearchQuery
    //     ? [this.nlqQueryParams?.query, this.cascadeSearchQuery]
    //     : [this.nlqQueryParams?.query],
    //   filters: Array.isArray(data) ?  this.selectedFilteredData : [ this.selectedFilteredData]
    // } as NLQRequestEto;
    // console.log('paload', payload);
    //  this.callIDPCatalog(payload);
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
    }
  }

}
