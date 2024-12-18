import { Component, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'app-create-idp-dialog',
  templateUrl: './create-idp-dialog.component.html',
  styleUrl: './create-idp-dialog.component.scss'
})
export class CreateIdpDialogComponent {
  createIdpForm!: FormGroup;
  studyId: string = 'abb_65344';
  idpName: any;
  textValue: string ="IDP _NAme";

  constructor(private dialogRef: DialogRef, private fb: FormBuilder ) {
    this.createIdpForm = this.fb.group({
      idpName: [this.idpName, [Validators.required, Validators.maxLength(150)]],
      updatable: false
    });
  }

  ngOnChanges( changes : SimpleChanges){
    if(changes['idpName'].currentValue){
      this.create();
    }
  }
  
  close(): void {
    this.idpName = '';
    console.log('cancel dialog', this.createIdpForm.get('idpName')?.value)
    this.createIdpForm.reset();
    console.log('reset dialog', this.createIdpForm.get('idpName')?.value)
    this.dialogRef.close();
  }

  create(): void {
    this.dialogRef.close({
      name: this.createIdpForm.get('idpName')?.value,
      updatable: this.createIdpForm.get('updatable')?.value
    });
  }
}
