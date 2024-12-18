import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'app-access-request-dialog',
  templateUrl: './access-request-dialog.component.html',
  styleUrl: './access-request-dialog.component.scss'
})
export class AccessRequestDialogComponent {
  @Input() dataSourceName: any;
  @Input() studyNumber: any;
  filterOptions = [];
  accessRequestForm!: FormGroup;

  constructor(private dialogRef: DialogRef, private fb: FormBuilder ) {
  }

  ngOnInit(){
    this.accessRequestForm = this.fb.group({
      dataSourceName:[''],
      dataUsePurpose: ['Primary Use'],
      dataSetType: ['Pseudonymized Data', Validators.required],
      description: ['', Validators.required]
    });
  }
  
  close(): void {
    this.dialogRef.close();
  }

  create(): void {
    this.dialogRef.close({
      name: this.accessRequestForm.get('dataUsePurpose')?.value
    });
  }

  onSubmit() {
    if (this.accessRequestForm.valid) {
      console.log(this.accessRequestForm.value);
      this.dialogRef.close({
        name: this.accessRequestForm.get('dataUsePurpose')?.value
      });
    } else {
      console.log('Form is not valid');
    }
  }

}
