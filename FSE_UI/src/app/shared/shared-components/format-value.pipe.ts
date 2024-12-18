import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatValue'
})
export class FormatValuePipe implements PipeTransform {

  transform(value: any): string {
    if (value == null || value === 0) {
      return '0';
    }
    return this.formatNumber(value);
  }

  private formatNumber(number: any): string {
    return number.toLocaleString('en-US', {
      maximumFractionDigits: 2,
      notation: 'compact',
      compactDisplay: 'short'
    });
  }
}
