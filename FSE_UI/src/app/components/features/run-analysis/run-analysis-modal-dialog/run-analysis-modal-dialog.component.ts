import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RunAnalysisAlgoCatalogService } from '../services/run-analysis-algo-catalog.service';
import { LoaderService } from '../../../../shared/services/loader/loader.service';
import { chevronRightIcon, SVGIcon } from '@progress/kendo-svg-icons';
import { AlgoCatalogRequest } from '../../../../../app/components/models/algorithmEto';
import { AlgorithmRestService } from '../../../services/algorithm-rest.service';
import { SummaryInfo } from '../../../../shared/shared-components/summary/summary.component';
import { PaginationEto } from '../../../models/pageRequest';
import summaryMapper from '../../../../../assets/columnDefinition/summary.json';
import { SortDescriptor } from '@progress/kendo-data-query';
import algoCatalogColumns from '../../../../../assets/columnDefinition/algo-catalog-column.json';
import { IdpSubjectAndFileRequestEto } from '../../../models/IdpEto';

@Component({
  selector: 'app-run-analysis-modal-dialog',
  templateUrl: './run-analysis-modal-dialog.component.html',
  styleUrl: './run-analysis-modal-dialog.component.scss'
})
export class RunAnalysisModalDialogComponent {
  showGrid = false;
  @Output() selectedAlgoEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  summaryInfo: SummaryInfo[] = [];
  algorithmVersionDetails: any;
  isDetailViewOpen = false;
  @Input() selectedCatalog: any;
  @Input() idpId: any;
  @Output() actionDialogEmitter = new EventEmitter();
  @Output() selectedAlgoRowEmitter = new EventEmitter();
  @Output() selectedARDRowEmitter = new EventEmitter();
  gridData: any;
  gridColumns: any;
  gridColumnsALgo: any = algoCatalogColumns;
  gridColumnsData: any;
  sort: any;
  gridARDData: any;
  pageSize: any;
  mySelection: any;
  pagination!: PaginationEto;
  public svgRowSelection: SVGIcon = chevronRightIcon;
  modalTitle: any;
  ardSort: any;
  selectedFilteredData: any[] = [];

  constructor(private loaderService: LoaderService, private algorithmRestService: AlgorithmRestService,  private runAnalysisAlgoCatalogService: RunAnalysisAlgoCatalogService){}

  ngOnInit(){
    this.loaderService.showLoader();
    this.gridColumnsData = this.runAnalysisAlgoCatalogService.getCatalogColumnsService(this.selectedCatalog);
    console.log("gridColumnsDatainmodalts", this.gridColumnsData);
    this.getCatalogData();
    if(this.selectedCatalog === 'Algo'){
      this.callAlgoService();
      this.modalTitle = "Algo Catalog"
    }else{
       this.modalTitle = "ARD Catalog"
    }

    console.log("input idpid", this.idpId);
    
  }

  getCatalogData(){
    // let ardPayload = {
    // //   "pagination": {
    // //     "currentPage": 1
    // //   },
    // //   "sort": {
    // //     "field": "arduniqid",
    // //     "order": "ASC"
    // // },
    // //   "filters": []
    // }

    const ardPayload = {
      pagination: { currentPage: 1 },
      filters: this.selectedFilteredData
    } as IdpSubjectAndFileRequestEto;

    this.runAnalysisAlgoCatalogService.getARDDescCatalogDataService(this.idpId, ardPayload).subscribe((result) => {
      this.gridARDData = result.data.items;
      console.log("addfiles", this.gridARDData);
      this.loaderService.hideLoader();
    });
  }

  // getAlgoCatalogData(){
  //   this.runAnalysisAlgoCatalogService.getAlgoCatalogDataService().subscribe((result) => {
  //     console.log("algodata1511", result);
  //     this.gridData = result.data.items;
  //     this.loaderService.hideLoader();
  //   });
  // }

  
  closeDetailView(): void {
    this.isDetailViewOpen = false;
  }

  getSortedData(event: SortDescriptor) {
    const sort = {
      field: event.field,
      order: event?.dir?.toUpperCase()
    }
    const payload = {
      sort
    } as AlgoCatalogRequest;
    this.callAlgoService(payload);
  }

  openAlgoDetails(algorithm: any) {
    console.log("algorithm", algorithm);
    this.selectedAlgoEventEmitter.emit(algorithm);
    this
    const algorithmVersionUnqId = algorithm?.data?.algoversionuniqid;
    this.algorithmRestService
      .getAlgorithmVersionDetails(algorithmVersionUnqId)
      .subscribe((result) => {
        this.algorithmVersionDetails = result;
        this.isDetailViewOpen = true;
      });
  }



  getPaginatedData(pageNumber: number) {
    const payload = {
      pagination: { currentPage: pageNumber + 1 },
    } as AlgoCatalogRequest;
    this.algorithmRestService.getAlgorthims(payload).subscribe((result) => {
      this.gridData.push(...this.prepareDataForGrid(result.data['items']));
      this.pagination = result.data['pagination'];
      this.summaryInfo = this.mapSummaryInfo(result.data['summary']);
      this.showGrid = true;
    });
  }

  // getARDCatalogData(){
  //   this.runAnalysisAlgoCatalogService.getARDCatalogDataService().subscribe((result) => {
  //     console.log("algodata1511", result);
  //     this.gridData = result.data.items;
  //     this.loaderService.hideLoader();
  //   });
  // }

  action(action: string){}
  close(){
    this.actionDialogEmitter.emit(false);
  }

  sortChange(event: any){
    const sort = {
      field: event.field,
      order: event?.dir?.toUpperCase()
    }
    this.ardSort = sort;
  }

  loadMoreData(){}

  onRowClick(event: any){}

  prepareDataForGrid(gridData: any[]) {
    gridData.forEach((algo) => {
      const initials = `${algo.updatedby.split(' ')[0].charAt(0)}${algo.updatedby.split(' ')[1].charAt(0)}`
      algo.updatedby = initials
    });
    return gridData;
  }

  callAlgoService(payload?: AlgoCatalogRequest): void {
    this.algorithmRestService.getAlgorthims(payload).subscribe((result) => {
      this.gridData = this.prepareDataForGrid(result.data['items']);
      this.pagination = result.data['pagination'];
      this.summaryInfo = this.mapSummaryInfo(result.data['summary']);
      this.showGrid = true;
    });
  }

  selectedRow(event: any, dataItem: any, rowIndex: any){
    console.log(rowIndex);
    this.actionDialogEmitter.emit(false);
    if(this.selectedCatalog === 'Algo'){
      this.selectedAlgoRowEmitter.emit(dataItem);
    } else {
      this.selectedARDRowEmitter.emit(dataItem);
    }
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
}
