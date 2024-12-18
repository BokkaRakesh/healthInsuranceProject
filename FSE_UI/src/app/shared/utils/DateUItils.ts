import { DatePipe } from '@angular/common';

export class DateUtil {
  private datePipe!: DatePipe;

  constructor() {
    this.datePipe = new DatePipe('en-US');
  }

  formatDate(dateString: string): string {
    const createdDate = new Date(dateString);
    return this.datePipe.transform(createdDate, 'MM/dd/yyyy') || '';
  }
}
