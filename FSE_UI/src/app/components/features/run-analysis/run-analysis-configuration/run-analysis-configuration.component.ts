import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '@progress/kendo-angular-dialog';
import { SVGIcon, chevronDownIcon, chevronUpIcon } from '@progress/kendo-svg-icons';
import { RunAnalysisAlgoCatalogService } from '../services/run-analysis-algo-catalog.service';
@Component({
  selector: 'run-analysis-configuration',
  templateUrl: './run-analysis-configuration.component.html',
  styleUrl: './run-analysis-configuration.component.scss'
})
export class RunAnalysisConfigurationComponent {
  @Input() algoConfigurationsData: any;
  configurationData: any;
  documentationData: any;
  configurationForm!: FormGroup;
  arrowDown: SVGIcon = chevronDownIcon;
  arrowUp: SVGIcon = chevronUpIcon;
  mapperData: any;
  switchValue: any;
  @Output() configurationFormValues: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder, private runAnalysisAlgoCatalogService: RunAnalysisAlgoCatalogService
  ) { }

  ngOnInit() {
    this.configurationMapper();
    this.documentationMapper();
    this.loadConfigurationForm();
  }

 
  documentationMapper(){
    console.log("docdata",this.algoConfigurationsData);
    this.documentationData = this.algoConfigurationsData?.data?.summary;
    console.log("documentationData", this.documentationData);
  }

  configurationMapper() {
    this.configurationData = this.algoConfigurationsData?.data?.items;
    console.log("algoConfigurationsData", this.configurationData);
    // this.mapperData = this.getConfigurationMapperData();
    // console.log('mapperData::: ', this.mapperData);
    // if(this.configurationData){
    //   this.configurationData.forEach((item: any, index: number) => {
    //     const mapper = this.mapperData.filter((x: any) => x.key === item.key);
    //     this.configurationData[index]['label'] = mapper[0].label;
    //     this.configurationData[index]['formControlName'] = mapper[0].formControlName;
    //     this.configurationData[index]['type'] = mapper[0].type;
    //     this.configurationData[index]['name'] = mapper[0].name;
    //     this.configurationData[index]['value'] = mapper[0].value;
    //   });
    // }

    console.log('Final to Display: ', this.configurationData);
  }

  getConfigurationMapperData(): any {
    return this.runAnalysisAlgoCatalogService.getConfigurationColumnsService();
  }

  //Configuration form initialization
  loadConfigurationForm() {
    this.configurationForm = new FormGroup({});
    if (this.configurationData) {
      this.configurationData.forEach((control: any) => {
        if (control.type === 'Boolean') {
          this.configurationForm.addControl(control.key, new FormControl(this.convertStringtoBoolean(control.value), [Validators.required]));
        } else if (control.type === 'Range') {
          this.configurationForm.addControl(control.key, new FormControl(control.value, [Validators.required]));
        }
        else {
          this.configurationForm.addControl(control.key, new FormControl(control.value, [Validators.required]));
        }
      });
    }
    this.configurationFormValues.emit(this.configurationForm.value);
  }

  changeFormValues(event?:any, key?:any){
    this.switchValue = event;
    if(key && event){
      if(this.configurationForm.controls[key]){
        this.configurationForm.patchValue({key: event})
      }
    }
    this.configurationFormValues.emit(this.configurationForm.value);
  }


  convertStringtoBoolean(value: string) {
    console.log("convertStringtoBoolean", value.toLowerCase() === "true");
    return value.toLowerCase() === "true";
  }


}
