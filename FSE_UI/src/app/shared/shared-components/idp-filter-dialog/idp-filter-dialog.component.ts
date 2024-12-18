import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SVGIcon, imageIcon } from '@progress/kendo-svg-icons';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-idp-filter-dialog',
  templateUrl: './idp-filter-dialog.component.html',
  styleUrl: './idp-filter-dialog.component.scss'
})
export class IdpFilterDialogComponent {
  @Output() isDialogOpen: EventEmitter<boolean> = new EventEmitter();
  @Output() filterEmitter = new EventEmitter<any>();
  filteredData: any = [];
  filterLength = 0;

  showddSingle = false;
  showddMulti = false;
  showRange = false;
  showDatePicker = false;
  filterValue: any;
  selFilterValue = '';
  @Input() dialogOpened = false;
  @Input() dialogOptions = {
    showddSingle: false,
    showddMulti: false,
    showRange: false,
    showDatePicker: false
  }
  public windowOpened = false;

  filterOptions = [
    "Is", "Is Not"
  ];
  public value: [number, number] = [50, 100];
  public min = 0;
  public max = 200;
  public largeStep = 2;
  public smallStep = 20;
  public imageSVG: SVGIcon = imageIcon;
  @Input() filterData: any;
  @Input() selectedFilterOption: any;
  filterValues: any = [];
  showInclusionBox = false;
  isUpdateMode= false;
  originalFormValues:any;
  @Input() filterMap:any;
  allowCustom = true;
  showRating: boolean = false;
  filterForm!: FormGroup;
  constructor(private fb: FormBuilder, private sharedService: SharedService) { }
  ngOnInit() {
    this.filterForm = this.fb.group({
      filterOptionfield: ['', Validators.required],
      filterInclusionfield: ['', Validators.required]
});
    console.log(this.filterData, this.dialogOptions);
    this.showInclusionBox = true;
    if(this.selectedFilterOption.editBatch){
      this.isUpdateMode = true;
      const formPathValue = {
        filterOptionfield: this.selectedFilterOption.values,
        filterInclusionfield: this.selectedFilterOption.inclusion ? 'Is' : 'Is Not'
      }
      this.filterForm.patchValue(formPathValue)
      this.originalFormValues = { ...this.filterForm.value };
    }

    console.log(this.selectedFilterOption);
    this.filterMap.filter((x: any) => {
      if (x.id === this.selectedFilterOption.id) {
        this.selectedFilterOption.id = x.id;
        this.selectedFilterOption.dialogOptionType = x.dialogOptionType;
        this.selectedFilterOption.displayName = x.displayName;
      }
    });
    console.log('filterMap: ', this.selectedFilterOption);
    this.filterValues = this.selectedFilterOption.values;

    if(this.selectedFilterOption.dialogOptionType === 'showddSingle'){
      this.checkDialogType('showddSingle');
    }
    if(this.selectedFilterOption.dialogOptionType === 'showddMulti'){
      this.checkDialogType('showddMulti');
    }
    if(this.selectedFilterOption.dialogOptionType === 'showRange'){
      this.checkDialogType('showRange');
    }
    if(this.selectedFilterOption.dialogOptionType === 'showDatePicker'){
      this.checkDialogType('showDatePicker');
    }
  
  }

  checkDialogType(dialogOptionType: string) {
    switch (dialogOptionType) {
      case 'showddSingle':
        this.dialogOptions.showddSingle = true;
        break;
      case 'showddMulti':
        this.dialogOptions.showddMulti = true;
        break;
      case 'showRange':
        this.dialogOptions.showRange = true;
        break;
      case 'showDatePicker':
        this.dialogOptions.showRange = true;
    }
  }

  action(actionType: any) {
    if (actionType === 'yes') {
      console.log(this.filterForm.value);
      console.log(this.filterForm.value.filterInclusionfield);
      const emitFilterData = {
        id: this.selectedFilterOption.id,
        type: this.selectedFilterOption.type,
        inclusion: this.filterForm.value.filterInclusionfield === 'Is' ? true : false,
        values: this.filterForm.value.filterOptionfield,
        displayName: this.selectedFilterOption?.displayName,
        dialogOptionType: this.selectedFilterOption.dialogOptionType
      };
      this.filterEmitter.emit(emitFilterData);
      this.dialogOpened = false;
      this.isDialogOpen.emit(this.dialogOpened);
    } else {
      this.dialogOpened = false;
      this.isDialogOpen.emit(this.dialogOpened);
    }
  }
  public close(component: any): void {
    this.dialogOpened = false;
    this.resetDialogOption()
  }

  resetDialogOption() {
    this.dialogOptions = {
      showddSingle: false,
      showddMulti: false,
      showRange: false,
      showDatePicker: false
    };
    this.isDialogOpen.emit(this.dialogOpened);
  }

  public open(component: string): void {
    this.dialogOpened = true;
  }

  formValueChanged(): boolean {
    return JSON.stringify(this.originalFormValues) !== JSON.stringify(this.filterForm.value);
 }
}