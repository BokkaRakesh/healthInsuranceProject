import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'app-create-ard-dialog',
  templateUrl: './create-ard-dialog.component.html',
  styleUrl: './create-ard-dialog.component.scss'
})
export class CreateArdDialogComponent {
  createArdForm!: FormGroup;
  ardName: any;
  constructor(private dialogRef: DialogRef, private fb: FormBuilder ) {
    this.createArdForm = this.fb.group({
      ardName: ['', [Validators.required, Validators.maxLength(150)]],
      visibility: ['2', Validators.required],
    });
  }
  
  close(): void {
    this.dialogRef.close();
  }

  create(): void {
    this.dialogRef.close({
      name: this.createArdForm.get('ardName')?.value,
      visibility: this.createArdForm.get('visibility')?.value
      // updatable: this.createArdForm.get('updatable')?.value
    });
  }
}
