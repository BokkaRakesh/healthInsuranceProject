import { Component, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { Align } from '@progress/kendo-angular-popup';
import { ArdRestService } from '../../../../services/ard-rest.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import permissionMapper from '../../../../../../assets/columnDefinition/user-access-permission.json'

@Component({
  selector: 'app-access-control-dialog',
  templateUrl: './access-control-dialog.component.html',
  styleUrl: './access-control-dialog.component.scss'
})
export class AccessControlDialogComponent {
  openManageAccess = false;
  userListData: any[] = [];
  @Input() visibility: any;
  @Input() dataSourceName: any;
  @Input() userList: any;
  accessControlForm!: FormGroup;
  anchorAlign: Align = { vertical: 'bottom', horizontal: 'right' };
  popupAlign: Align = { vertical: 'top', horizontal: 'right' };
  rowPopUp!: ElementRef;
  showAccessPopup = false;
  permissionList: any = [
    {
      label: 'read-write',
      permission: 'read-write',
    },
    {
      label: 'read-only',
      permission: 'read-only',
    },
    {
      label: 'admin',
      permission: 'admin',
    },
    {
      label: 'remove',
      permission: 'remove',
    }
  ];
  selectedRowIndex: any;
  copyUserList: any;
  ardId!: string | null;
  selectedUser: any;
  copyCollaboratorUserList: any;
  initialFormValues: any;

  constructor(private dialogRef: DialogRef, private fb: FormBuilder, private ardRestService: ArdRestService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.ardId = this.route.snapshot.paramMap.get('ardId');
    this.accessControlForm = this.fb.group({
      visibility: [String(this.visibility), Validators.required],
      collaborators: ['']
    });
    this.initialFormValues = this.accessControlForm.value;
    this.copyUserList = structuredClone(this.userList);
    this.accessControlForm.get('visibility')?.valueChanges.subscribe((visible) => {
      if (visible === '1') {
        this.showAccessPopup = false;
      }
    });
  }

  close(): void {
    this.accessControlForm.reset();
    this.dialogRef.close({
      userList: this.copyUserList,
      close: true
    });
  }

  onSave(visibility: any): void {
    if (this.accessControlForm.valid) {
      this.updatePermissionInfo();
      this.userList = this.userList.filter((user: any) => {
        if (user.permission === 4) {
          return this.copyUserList.some((copyUser: any) => copyUser.id === user.id);
        }
        return true;
      });
      this.filterChangedUsers();
      if (visibility === '2') {
        this.dialogRef.close({
          visibility: Number(this.accessControlForm.get('visibility')?.value),
          userList: this.userList
        });
      } else {
        this.dialogRef.close({
          userList: [],
          visibility: Number(this.accessControlForm.get('visibility')?.value)
        })
      }
    }
  }

  filterChangedUsers() {
    this.userList = this.userList.filter((user: any) =>
      !this.copyUserList.some((copyUser: any) =>
        copyUser.id === user.id && copyUser.permissionDisplayName === user.permissionDisplayName
      ));
  }

  updatePermissionInfo() {
    this.userList.forEach((user: any) => {
      permissionMapper.find((permissionList: any) => {
        if (permissionList.displayName === user.permissionDisplayName) {
          user.permission = permissionList.permission;
        }
      })
    });
  }

  onFilterChange(searchTerm: any) {
    if (searchTerm.length >= 3) {
      this.fetchCollaborators(searchTerm);
    }else {
      this.userListData = [];
    }
  }

  fetchCollaborators(searchTerm: string) {
    const searchTermName = {
      name: searchTerm
    }
    this.ardRestService.getCollaboratorUser(searchTermName, this.ardId).subscribe(
      (response: any) => {
        if(response.status === 'success'){
          this.userListData = response.Users;
          this.copyCollaboratorUserList = structuredClone(this.prepareUserAccessList(response.Users));
        }
      }
    );
  }

  prepareUserAccessList(users: any) {
    const usersList: any[] = [];
    users.forEach((user: any) => {
      permissionMapper.find((permissionList: any) => {
        if (permissionList.permission === user.permission) {
          usersList.push({
            permissionDisplayName: permissionList.displayName,
            ...user
          })
        }
      })
    })
    return usersList;
  }

  permissionChangeInfo(event: any) {
    const permissionToUpdate = this.userList.find((user: any) => user.id === event.id);
    if (permissionToUpdate) {
      permissionToUpdate.permissionDisplayName = event.permission;
    }
  }


  emitSelectedListInfo(event: any) {
    if (event) {
      this.permissionList.forEach((item: any) => {
        item.id = event.selectedUserList.id,
          item.checkedSelectedValue = event.selectedUserList.permissionDisplayName;
      });
      this.rowPopUp = event.isRowPopUp;
      this.showAccessPopup = event.isAccessPopUp;
      this.selectedRowIndex = event.selectedListIndex;
    }
  }

  onUserSelection(user: any): void {
    const upcomingUser = this.copyCollaboratorUserList.find((userList: any) => userList.name === user);
    if (user && upcomingUser) {
      const isDuplicateUser = this.userList.find((existingUser: any) => existingUser.id === upcomingUser.id);
      if (!isDuplicateUser) {
        this.userList.unshift(upcomingUser);
      }
    }
  }

  checkUserListChange() {
    return JSON.stringify(this.userList) === JSON.stringify(this.copyUserList);
  }

  checkFormChange() {
    return JSON.stringify(this.accessControlForm.value) === JSON.stringify(this.initialFormValues);
  }

  checkChanges() {
    return this.checkFormChange() && this.checkUserListChange();
  }
}
