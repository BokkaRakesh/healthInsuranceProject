import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { ExpansionPanelComponent } from '@progress/kendo-angular-layout';
import { IdpDetailPageMapping } from '../../utils/idp-detail-page-mapper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SVGIcon, chevronDownIcon, chevronUpIcon } from '@progress/kendo-svg-icons';
import { IdpRestService } from '../../../../services/idp-rest.service';
import { AddDescriptionRequestEto, DescriptionEto } from '../../../../models/IdpEto';
import { ToastrService } from 'ngx-toastr';
import { IdpResponseEto } from '../../../../models/IdpEto';

@Component({
  selector: 'app-idp-documentation',
  templateUrl: './idp-documentation.component.html',
  styleUrl: './idp-documentation.component.scss',
})
export class IdpDocumentationComponent implements OnInit {
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
  descriptionForm: FormGroup;
  arrowDown: SVGIcon = chevronDownIcon;
  arrowUp: SVGIcon = chevronUpIcon;
  maxLength = 5000;
  
  constructor(private fb: FormBuilder, private idpRestService: IdpRestService,
    private toastrService: ToastrService,
  ) {
    this.descriptionForm = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(5000)]]
    });
  }

  ngOnInit(): void {
    console.log('idpResult is', this.idpResult)
  }

  ngOnChanges( changes : SimpleChanges){
    if(changes['studiesList'].currentValue){
      this.mapIdpResult();
    }
  }

  mapIdpResult(): void {
    this.descriptionForm.setValue({description: this.idpResult?.data.summary.description});
    this.description = this.descriptionForm.value.description;
    this.studiesList.forEach((study: any) => {
      const highLightedLabels: Array<{ uiLabel: string; value: any }> = [];
      const normalLabels: Array<{ uiLabel: string; value: any }> = [];
      IdpDetailPageMapping.forEach((mapped) => {
        const mappedStudy = {
          uiLabel: mapped.uiLabel,
          value: study[mapped.dbColumn] ? study[mapped.dbColumn] : '-' ,
        };

        if (mapped.highlight) {
          highLightedLabels.push(mappedStudy);
        } else {
          normalLabels.push(mappedStudy);
        }
      });
      this.mappedStudiesData.set(study.studynumber, { highLightedLabels, normalLabels });
    });
  }

  editDescription(event: any): void{
    this.isEditable = true;
  }

  saveDescription(description: any): void{
    this.isEditable = false;
    const addDescription = {
      description : description
    } as DescriptionEto;
    const descriptionRequest = {
      IDP_Unq_ID: this.idpResult?.data?.summary?.idp_unq_id,
      data: addDescription
    } as AddDescriptionRequestEto;
    this.idpRestService.addDescriptionToIdp(descriptionRequest).subscribe((response: any) => {
      if (response && response?.status === 'success') {
        this.toastrService.success(response.message);
        this.descriptionForm.value.description = response.description;
        this.description =  this.descriptionForm.value.description;
        console.log('description is ', this.descriptionForm.value.description);
      }   
    });
  }

  originalOrder = (a: any, b: any): number => {
    return 0;
  }

  cancel(){
    this.isEditable = false;
    this.descriptionForm.reset({
      description: this.idpResult?.data.summary.description
    });
  }
  
  showMoreStudy(){
    this.emitShowMoreStudy.emit();
  }
}
