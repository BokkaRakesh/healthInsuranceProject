import { Component, Input, OnInit } from '@angular/core';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DialogSettings } from '@progress/kendo-angular-dialog';
import { SummaryInfo } from '../../../../shared/shared-components/summary/summary.component';
import summaryMapper from '../../../../../assets/columnDefinition/summary.json';
import { RequestAccessService } from '../services/request-access.service';

@Component({
  selector: 'app-request-access-dialog',
  templateUrl: './request-access-dialog.component.html',
  styleUrl: './request-access-dialog.component.scss'
})
export class RequestAccessDocDialogComponent {
  @Input() exploreId: any;
  ardDetailResult: any;
  summaryInfo: SummaryInfo[] = [];
  dataSet: any;
  qandAData:any
  description: any;
  comment: string = '';
  expDocDetails: any[] = [];
  exploreDetailsMapper = [
    {
      label: 'Request Status',
      dbColumn: 'requestStatus'
    },
    {
      label: 'Request Date',
      dbColumn: 'requestDate'
    },
    {
      label: 'ResponseDate',
      dbColumn: 'responseData'
    },
    {
      label: 'Request User',
      dbColumn: 'requestUser'
    }
  ]
  constructor(private dialogRef: DialogRef, private requestAccessService: RequestAccessService) {
  }



  ngOnInit(): void {
    console.log('Id--', this.exploreId);
    this.requestAccessService.getExploreDataDocumentation(this.exploreId).subscribe((result) => {
      this.summaryInfo = this.mapSummaryInfo(result.data['summary']);
      console.log("summaryInfo", this.summaryInfo);
      this.ardDetailResult = result.data['ard_study_details'];
      this.dataSet = result.data['data_Set_supplier'];
      this.qandAData = result.data['questionAndAnswers'];
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
  // Method to handle the Reject Request action
  rejectRequest() {
    if (this.comment.trim()) {
      // Logic for rejecting the request (e.g., call a service or API to reject)
      console.log('Request has been rejected with comment:', this.comment);
      // Optionally, you can reset the comment field after rejection
      this.comment = '';
    } else {
      console.log('Please provide a comment to reject the request.');
    }
  }

  // Method to handle the Grant Access action
  grantAccess() {
    if (this.comment.trim()) {
      // Logic for granting access (e.g., call a service or API to grant access)
      console.log('Access has been granted with comment:', this.comment);
      // Optionally, you can reset the comment field after granting access
      this.comment = '';
    } else {
      console.log('Please provide a comment to grant access.');
    }
  }
}
