import { Component, EventEmitter, Input, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { ExpansionPanelComponent } from '@progress/kendo-angular-layout';
import { IdpResponseEto } from '../../../../models/IdpEto';
import { SVGIcon, chevronDownIcon, chevronUpIcon } from '@progress/kendo-svg-icons';
import { IdpClincalDataPageMapping } from '../../utils/idp-clinical-data-page-mapper';

@Component({
  selector: 'app-idp-clinical-data',
  templateUrl: './idp-clinical-data.component.html',
  styleUrl: './idp-clinical-data.component.scss'
})
export class IdpClinicalDataComponent {
  @Input() studiesList : any;
  @Input() isLastPage = true;
  @Output() emitShowMoreStudy =  new EventEmitter;
  @Input() idpResult!: IdpResponseEto;
  @ViewChildren(ExpansionPanelComponent)
  panels!: QueryList<ExpansionPanelComponent>;

  studiesInfo: any;
  mainStudyDetails: any[] = [];
  studyDetailsList: any[] = [];
  mappedStudiesData: Map<string, { highLightedLabels: any[], normalLabels: any[] }> = new Map();
  description = '';
  isEditable = false;
  arrowDown: SVGIcon = chevronDownIcon;
  arrowUp: SVGIcon = chevronUpIcon;

  ngOnInit(): void {
    console.log('studiesList is', this.studiesList)
  }

  ngOnChanges( changes : SimpleChanges){
    if(changes['studiesList'].currentValue){
      this.mapIdpResult();
    }
  }

  mapIdpResult(): void {
    this.studiesList.forEach((study: any) => {
      const highLightedLabels: Array<{ uiLabel: string; value: any }> = [];
      const normalLabels: Array<{ uiLabel: string; value: any }> = [];
      IdpClincalDataPageMapping.forEach((mapped) => {
        const mappedStudy = {
          uiLabel: mapped.uiLabel,
          value: study[mapped.dbColumn] ? study[mapped.dbColumn] : '-' ,
        };

        if (mapped.highlight) {
          normalLabels.push(mappedStudy);
        }
      });
      this.mappedStudiesData.set(study.studynumber, { highLightedLabels, normalLabels });
    });
  }

  originalOrder = (a: any, b: any): number => {
    return 0;
  }
}
