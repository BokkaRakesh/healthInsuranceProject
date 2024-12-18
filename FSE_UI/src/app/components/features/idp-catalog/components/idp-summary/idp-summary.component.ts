import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-idp-summary',
  templateUrl: './idp-summary.component.html',
  styleUrl: './idp-summary.component.scss'
})
export class IdpSummaryComponent {

  @Input() selectedStudies!: any[];
  @Input() idpInitiatedDate!: string;
}
