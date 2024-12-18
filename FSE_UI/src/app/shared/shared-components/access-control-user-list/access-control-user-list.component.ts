import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-access-control-user-list',
  templateUrl: './access-control-user-list.component.html',
  styleUrl: './access-control-user-list.component.scss'
})
export class AccessControlUserListComponent {
  @Input() users: any[] = [];
  rowPopUp!: ElementRef;
  showAccessPopup = false;
  @Input() isShowThreeDot = false;
  @Output() emitSelectedListInfo = new EventEmitter<any>()
  onThreeDotClick(event: any, selectedUserList: any, selectedListIndex: number): void {
    const clickedElement = event.target;
    if (this.rowPopUp === clickedElement && this.showAccessPopup) {
      this.showAccessPopup = false;
    } else {
      this.rowPopUp = clickedElement;
      this.showAccessPopup = true;
    }
    let selectedListInfo = {
      isAccessPopUp: this.showAccessPopup,
      isRowPopUp: this.rowPopUp,
      selectedUserList,
      selectedListIndex,
    }
    this.emitSelectedListInfo.emit(selectedListInfo);
  }
}
