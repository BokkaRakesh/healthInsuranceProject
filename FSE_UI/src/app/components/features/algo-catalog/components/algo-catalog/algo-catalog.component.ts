import { Component, OnInit } from '@angular/core';
import algoCatalogColumns from '../../../../../../assets/columnDefinition/algo-catalog-column.json';
import { PaginationEto } from '../../../../models/pageRequest';
import { SummaryInfo } from '../../../../../shared/shared-components/summary/summary.component';
import { AlgorithmRestService } from '../../../../services/algorithm-rest.service';
import summaryMapper from '../../../../../../assets/columnDefinition/summary.json';
import { SortDescriptor } from '@progress/kendo-data-query';
import { AlgoCatalogRequest } from '../../../../models/algorithmEto';


@Component({
  selector: 'app-algo-catalog',
  templateUrl: './algo-catalog.component.html',
  styleUrl: './algo-catalog.component.scss',
})
export class AlgoCatalogComponent implements OnInit {
  showGrid = false;
  gridData: any[] = [];
  pagination!: PaginationEto;
  gridColumns: any = algoCatalogColumns;
  summaryInfo: SummaryInfo[] = [];
  isDetailViewOpen = false;
  algorithmVersionDetails: any;

  constructor(
    private algorithmRestService: AlgorithmRestService, 
  ) {}

  ngOnInit(): void {
    this.callAlgoService();
  }

  callAlgoService(payload?: AlgoCatalogRequest): void {
    this.algorithmRestService.getAlgorthims(payload).subscribe((result) => {
      this.gridData = this.prepareDataForGrid(result.data['items']);
      this.pagination = result.data['pagination'];
      this.summaryInfo = this.mapSummaryInfo(result.data['summary']);
      this.showGrid = true;
    });
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

  getPaginatedData(pageNumber: number) {
    const payload = {
      paignation: { currentPage: pageNumber + 1 }
    } as AlgoCatalogRequest;
    this.algorithmRestService.getAlgorthims(payload).subscribe((result) => {
      this.gridData.push(...this.prepareDataForGrid(result.data['items']));
      this.pagination = result.data['pagination'];
      this.summaryInfo = this.mapSummaryInfo(result.data['summary']);
      this.showGrid = true;
    });
  }

  openAlgoDetails(algorithm: any) {
    const algorithmVersionUnqId = algorithm?.data?.algoversionuniqid;
    this.algorithmRestService
      .getAlgorithmVersionDetails(algorithmVersionUnqId)
      .subscribe((result) => {
        this.algorithmVersionDetails = result;
        this.isDetailViewOpen = true;
      });
  }

  closeDetailView(): void {
    this.isDetailViewOpen = false;
  }

  prepareDataForGrid(gridData: any[]) {
    gridData.forEach((algo) => {
      const initials = `${algo.updatedby.split(' ')[0].charAt(0)}${algo.updatedby.split(' ')[1].charAt(0)}`
      algo.updatedby = initials
    });
    return gridData;
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
