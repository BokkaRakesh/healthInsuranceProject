import { Component, Input, OnInit } from '@angular/core';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DialogSettings } from '@progress/kendo-angular-dialog';
import { SummaryInfo } from '../../../../shared/shared-components/summary/summary.component';
import summaryMapper from '../../../../../assets/columnDefinition/summary.json';
import { ExploreDataService } from '../../data-explorer/services/explore-data.service';
@Component({
  selector: 'app-explore-doc-dialog',
  templateUrl: './explore-doc-dialog.component.html',
  styleUrl: './explore-doc-dialog.component.scss'
})
export class ExploreDocDialogComponent {
  @Input() exploreId: any;
  ardDetailResult: any;
  summaryInfo: SummaryInfo[] = [];
  dataSet: any;
  description: any;
  expDocDetails: any[] = [];
  exploreDetailsMapper = [
    {
      label: 'Clinical Phase',
      dbColumn: 'studyphase'
    },
    {
      label: 'Indication',
      dbColumn: 'studyindication'
    },
    {
      label: 'Scientific Area',
      dbColumn: 'studyscientificarea'
    },
    {
      label: 'Data Classification',
      dbColumn: 'dataClassification'
    }
  ]
  constructor(private dialogRef: DialogRef, private exploreDataService: ExploreDataService) {
  }



  ngOnInit(): void {
    console.log('Id--', this.exploreId);
    this.exploreDataService.getExploreDataDocumentation(this.exploreId).subscribe((result) => {
      this.summaryInfo = this.mapSummaryInfo(result.data['summary']);
      this.ardDetailResult = result.data['ard_study_details'];
      this.dataSet = result.data['data_Set_supplier'];
      this.description = result.data['desc'];
      this.mapExploreDocDetails();
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  public dialogSettings: DialogSettings = {
    animation: false
  };

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

  mapExploreDocDetails(): void {
    this.exploreDetailsMapper.forEach((exploreDetailMap) => {
      this.expDocDetails.push({
        label: exploreDetailMap.label,
        value: this.ardDetailResult[exploreDetailMap.dbColumn] ? this.ardDetailResult[exploreDetailMap.dbColumn] : '-'
      });
    });
    console.log('expDocDetails---', this.expDocDetails);
  }

}
