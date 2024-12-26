import { Component, Input, OnInit } from '@angular/core';
import { DialogRef, DialogSettings } from '@progress/kendo-angular-dialog';
import { ManageAccessRequestsService } from '../../../services/manage-access-requests.service';

@Component({
  selector: 'app-manage-access-requests-dialog',
  templateUrl: './manage-access-requests-dialog.component.html',
  styleUrls: ['./manage-access-requests-dialog.component.scss']
})
export class ManageAccessRequestsDialogComponent implements OnInit {
  @Input() exploreId: string = 'Access Request Details'; // Title for the dialog
  expDocDetails: { label: string; value: string }[] = []; // Details for the first section
  qandAData: { question: string; answer: string }[] = []; // Questions and answers
  dataSet: { name: string; value: string }[] = []; // Dataset list
  comment: string = ''; // User comment

  // Dialog settings
  public dialogSettings: DialogSettings = { animation: false };

  constructor(
    private dialogRef: DialogRef,
    private manageAccessRequestsService: ManageAccessRequestsService
  ) {}

  ngOnInit(): void {
   
    this.fetchManageAccessRequestsData();
  }

  // Fetch data for the dialog using the service
  fetchManageAccessRequestsData(): void {
    this.manageAccessRequestsService
      .getManageAccessRequestsDocumentationService(this.exploreId)
      .subscribe((result) => {
        const items = result.data?.items || {};

        // Populate details
        this.initializeExpDocDetails(items);
        this.initializeQandAData(items);
        this.initializeDataSet(items);
        this.mapComment(items);
      });
  }

  // Populate expDocDetails based on the fetched JSON
  initializeExpDocDetails(items: any): void {
    this.expDocDetails = [
      { label: 'Request Status', value: items.status || 'N/A' },
      { label: 'Request Data', value: items.updatedat || 'N/A' },
      { label: 'Response Data', value: items.createdat || 'N/A' },
      { label: 'Request User', value: items.createdby || 'N/A' },
    ];
  }

  // Populate qandAData based on the fetched JSON
  initializeQandAData(items: any): void {
    this.qandAData = [
      { question: 'How do you intend to use this data?', answer: 'Curabitur non nisi in dui peftentesque vu putate veae sa amet enim. Nutan mancus rune et sen lacina lobortis. Nunc conatis, ribh in fermentum elementum, lorem nune pharetra vell, nec aliquet risus uma eu nulta. Mauris tempor accumsan tortor eget vehicula, in semper sit anet metus nec finibas' },
    ];
  }

  // Populate dataSet based on the fetched JSON
  initializeDataSet(items: any): void {
    this.dataSet = [
      { name: 'Request ID', value: items.accessrequesttypeid || 'N/A' },
      { name: 'Source', value: items.source || 'N/A' },
      { name: 'Type', value: items.accessrequestno || 'N/A' },
      { name: 'Data Usage', value: items.intendeduse || 'N/A' },
      { name: 'Data Type', value: items.accessrequesttypeid || 'N/A' }
    ];
  }

  // Close the dialog
  close(): void {
    this.dialogRef.close();
    console.log('Dialog closed');
  }

  // Reject the request
  rejectRequest(): void {
    if (this.comment.trim()) {
      console.log('Request rejected with comment:', this.comment);
      this.comment = ''; // Reset the comment field
    } else {
      console.log('Please provide a comment to reject the request.');
    }
  }

  // Grant access
  grantAccess(): void {
    if (this.comment.trim()) {
      console.log('Access granted with comment:', this.comment);
      this.comment = ''; // Reset the comment field
    } else {
      console.log('Please provide a comment to grant access.');
    }
  }
  mapComment(items): void {
    const item = items;
    this.comment = item.status === 'Approved' ? item.approvecomment : item.requestcomment;
  }
}
