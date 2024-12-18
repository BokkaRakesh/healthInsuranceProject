import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-summary-detail',
  templateUrl: './data-summary-detail.component.html',
  styleUrl: './data-summary-detail.component.scss',
})
export class DataSummaryDetailComponent {
  @Input() summary: any;
  @Input() summaryDetails:any

  formatKey(key: string): string {
    const keyMap: any = {
      dataSources: 'Data Sources',
      createdBy: 'Creator',
      modalities: 'Modalities',
      version: 'Version',
      createdDate: 'Created Date',
      updatedDate: 'Last Updated'
    };
    return keyMap[key] || key;
  }

  getKeys(): string[] {
        return Object.keys(this.summaryDetails);
  }
}
