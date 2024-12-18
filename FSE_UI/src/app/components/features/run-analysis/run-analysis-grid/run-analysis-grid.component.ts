import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-run-analysis-grid',
  templateUrl: './run-analysis-grid.component.html',
  styleUrl: './run-analysis-grid.component.scss'
})
export class RunAnalysisGridComponent {
  @Input() gridView: any;
  @Input() gridData: any;
  @Input() gridColumns: any;
  @Input() gridColumnsData: any;
  sort: any;
  pageSize: any;
  mySelection: any;

  constructor(){}

  ngOnInit(){
    console.log(this.gridData);
    // this.idpService.getAlgoCatalog.subscribe((records) => {
    //   this.selectedRecords = records;
    // });
  }

  sortChange(event: any){}

  loadMoreData(){}

  onRowClick(event: any){}
}
