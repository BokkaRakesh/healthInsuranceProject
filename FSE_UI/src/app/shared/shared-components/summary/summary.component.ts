import { Component, Input, OnInit } from '@angular/core';

export interface SummaryInfo {
  icon: string,
  name: string;
  value: string;
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit{

  @Input() summary: SummaryInfo[] = [];
  ngOnInit() {
    console.log('summary---',this.summary);
  }
}
