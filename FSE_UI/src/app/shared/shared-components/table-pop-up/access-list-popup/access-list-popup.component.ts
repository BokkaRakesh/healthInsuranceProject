import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Align } from '@progress/kendo-angular-popup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-access-list-popup',
  templateUrl: './access-list-popup.component.html',
  styleUrl: './access-list-popup.component.scss'
})
export class AccessListPopupComponent {
  @Input() permissionList: any[] = [];
  @Input() anchor: ElementRef | undefined;
  @Input() animate = false;
  @Input() anchorAlign: Align = { vertical: 'bottom', horizontal: 'left' };
  @Input() popupAlign: Align = { vertical: 'top', horizontal: 'left' };
  @Output() emitPermissionChangeInfo = new EventEmitter<string>();
  permissionForm!: FormGroup;
  constructor(private fb: FormBuilder) {

  }
  ngOnInit() {
    console.log('items---', this.permissionList);
    this.permissionForm = this.fb.group({
      permissionType: [this.permissionList[0].checkedSelectedValue],
    });
  }

  onPermissionChange(action: any, index: any) {
    this.emitPermissionChangeInfo.emit(action);
  }
}
