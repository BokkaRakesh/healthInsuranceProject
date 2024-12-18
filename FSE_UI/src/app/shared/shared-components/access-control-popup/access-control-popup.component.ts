import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Align } from '@progress/kendo-angular-popup';
import { GridService } from '../../services/grid/grid.service';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { AccessRequestDialogComponent } from '../access-request-dialog/access-request-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface AccessControlPopUp {
  id: string;
  access: boolean;
  StudyID?: string;
  requested: boolean;
}

@Component({
  selector: 'app-access-control-popup',
  templateUrl: './access-control-popup.component.html',
  styleUrl: './access-control-popup.component.scss'
})
export class AccessControlPopupComponent {
  @Input() dataGridSelectedRecord :any[] = []
  @Input() isDataGridRowSelected = false;
  @Input() accessItems: AccessControlPopUp[] = [];
  @Input() anchor: ElementRef | undefined;
  @Input() animate = false;
  @Input() anchorAlign: Align = { vertical: 'bottom', horizontal: 'left' };
  @Input() popupAlign: Align = { vertical: 'top', horizontal: 'left' };
  @Output() itemClick = new EventEmitter<string>();
  @Input() selectedUniqueID = '';
  accessControlItems:any = [];
  dataSourceName: any;
  dataSourceForm!: FormGroup;
  showPopover =  true;

    constructor(private gridService: GridService,  private dialogService: DialogService,private fb: FormBuilder){
      this.dataSourceForm = this.fb.group({});
    }
 
  ngOnInit() {
    this.gridService.findDatasubject.subscribe((selectedRow)=>{
      if(selectedRow.length > 0){
        this.showPopover = false;
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataGridSelectedRecord']) {
      this.accessItems.forEach(item => {
        const matchingRecords = this.dataGridSelectedRecord.filter(record => record.StudyID === item.StudyID);
        matchingRecords.forEach(record => {
          // if (record.checked) {
            this.dataSourceForm.addControl(item.id, this.fb.control(item.access));
          // }
        });
        if(matchingRecords.length === 0) {
            this.dataSourceForm.addControl(item.id, this.fb.control(false));
        }
      });
    }
  }
  // Emit the selected item action to the parent component
  onItemClick(action: string) {
    this.itemClick.emit(action);
  }
  onRequestedClick(item: any) {
    this.openAccessRequestDialog(item);
    console.log('Request clicked for:', this.dataSourceName);
  }

  onCheckboxChange(item: any, accessStatus: any): void { 
   if(this.dataGridSelectedRecord.length > 0){
    this.gridService.sendDataSourceInfo.next([{
      access: accessStatus.target.checked,
      id: item.id,
      requested: item.requested,
      StudyID: item.StudyID
    }]);
   }
    console.log(`Checkbox changed for study ${item.id}: ${item.access}`);
  }

  openAccessRequestDialog(item:any) {
    const dialogRef: DialogRef = this.dialogService.open({
      content: AccessRequestDialogComponent
    });
   const instance = dialogRef.content.instance;
   instance.dataSourceName = item.id;
   instance.studyNumber = item.StudyNumber
  }
}