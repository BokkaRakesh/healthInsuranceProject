import { Component, EventEmitter, Input, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { IdpResponseEto } from '../../../../models/IdpEto';
import { ExpansionPanelComponent } from '@progress/kendo-angular-layout';
import { SubjectDocumentationPageMapping } from '../../utils/study-detail-documentation-mapper';

@Component({
  selector: 'app-subject-documentation-details',
  templateUrl: './subject-documentation-details.component.html',
  styleUrl: './subject-documentation-details.component.scss'
})
export class SubjectDocumentationDetailsComponent {

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
  
  ngOnInit(): void {
    this.mapSubjectsResult();
  }

  ngOnChanges( changes : SimpleChanges){
    if(changes['studiesList'].currentValue){
      this.mapSubjectsResult();
    }
  }

  mapSubjectsResult(): void {
    this.studiesList.forEach((subject: any) => {
      const highLightedLabels: Array<{ uiLabel: string; value: any }> = [];
      const normalLabels: Array<{ uiLabel: string; value: any }> = [];
      SubjectDocumentationPageMapping.forEach((mapped) => {
        const mappedStudy = {
          uiLabel: mapped.uiLabel,
          value: subject[mapped.dbColumn] ? subject[mapped.dbColumn] : '-' ,
        };

        if (mapped.highlight) {
          highLightedLabels.push(mappedStudy);
        } else {
          normalLabels.push(mappedStudy);
        }
      });
     
      this.mappedStudiesData.set(subject.StudyNumber, { highLightedLabels, normalLabels });
    });
  }

  originalOrder = (a: any, b: any): number => {
    return 0;
  }
}
