import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-results-found',
  templateUrl: './no-results-found.component.html',
  styleUrl: './no-results-found.component.scss'
})
export class NoResultsFoundComponent implements OnInit {

  @Input() showNoRecords: any;

  ngOnInit() {
    console.log("show no records", this.showNoRecords);
  }

}
