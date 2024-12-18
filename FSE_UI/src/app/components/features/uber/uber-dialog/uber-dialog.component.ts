import { Component } from '@angular/core';
import { DialogRef } from '@progress/kendo-angular-dialog';
@Component({
  selector: 'app-uber-dialog',
  templateUrl: './uber-dialog.component.html',
  styleUrl: './uber-dialog.component.scss'
})
export class UberDialogComponent {


  constructor(private dialogRef: DialogRef) {}

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }

}
