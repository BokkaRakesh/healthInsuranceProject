import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { UserService } from '../../auth/service/user.service';
import { IUser } from '../../auth/model/auth-reponse.model';
import { TokenService } from '../../auth/service/token.service';
import { ACCOUNT_CONSTANTS } from '../../../../constants/app-settings.constant';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import * as bootstrap from 'bootstrap';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { GipaiChatComponent } from '../../../shared/shared-components/gipai-chat/gipai-chat.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit {
  popoverInstance:any;
  @ViewChild('userPopover', {static:false}) popoverButton!:ElementRef;
  isProfileMenuVisible = false;
  isHelpMenuVisible = false;
  userInfo: IUser = {
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    role: '',
    firstNameInitial: '',
  };
  jsonData: any= {};
  showGIP = false;
  currentPath: string = '';
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router, private dialogService: DialogService
  ) {}
  ngOnInit() {
    this.jsonData = {
      "catalogPaths": [
        '/home/study-catalog',
        '/home/explore-data',
        '/home/idp-catalog'
      ]
    };
    this.populateUserInfo();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe(() => {
      this.currentPath = this.router.url;  
      this.checkPath();  
    });
    this.currentPath = this.router.url;
    console.log('current path--', this.currentPath)
    this.checkPath();
  }

  checkPath() {
    if (this.jsonData?.catalogPaths?.some((path: string) => this.currentPath.startsWith(path))) {
      this.showGIP = true;
    } else {
      this.showGIP = false;
    }
  }

  populateUserInfo() {
    this.userService.userInfoSubject.subscribe((data) => {
      if (data) {
        const fullUserName = this.getFullUserName(data);
        this.userInfo.displayName = fullUserName;
        this.userInfo.email = data?.email;
        this.userInfo.role = data?.role;
        this.userInfo.firstNameInitial = this.userInfo.displayName
          .charAt(0)
          .toUpperCase();
      }
    });
  }

  getFullUserName(data: any) {
    const fullUserName =
      data?.first_name.charAt(0).toUpperCase() +
      data?.first_name.slice(1) +
      " " +
      data.last_name.charAt(0).toUpperCase() +
      data?.last_name.slice(1);
    return fullUserName;
  }

  ngAfterViewInit(){
    const popoverTriggerEl = this.popoverButton.nativeElement;
    this.popoverInstance = new bootstrap.Popover(popoverTriggerEl , {
      trigger:'manual',
      html:true,
      content : ()=>  this.getPopoverContent()
    });
  }
  showProfile() {
    this.isProfileMenuVisible = !this.isProfileMenuVisible;
    if(this.popoverInstance){
      this.popoverInstance.toggle()
    }
  }

  getPopoverContent(): any{
    return `<div class="popup-menu">
    <div class="profile-info px-3 pt-3">
      <p class="mb-0 fw-bold">${this.userInfo.displayName}</p>
    </div>
    <div class="dropdown-items px-3 pt-1 pb-3">
      <span class="dropdown-item py-2 d-flex align-items-center"
        ><img class="pe-2" src="../assets/images/user.svg" alt="user" /> My
        Profile</span
      >
      <span class="dropdown-item py-2 d-flex align-items-center"
        ><img
          class="pe-2"
          src="../assets/images/settings.svg"
          alt="setting"
        />
        Settings</span
      >
      <hr />
      <span class="dropdown-item py-2 d-flex cursor-pointer align-items-center" id="logout-btn" (click)="onLogout()"
        ><img class="pe-2 cursor-pointer" src="../assets/images/logoff.svg" alt="logoff" />
        Logout</span
      >
    </div>
  </div>`
  }

  @HostListener('document:click', ['$event'])
  onPopUpClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.id === "logout-btn") {
      this.onLogout();
      this.popoverInstance.hide();
    }
  }
  showHelp(): void {
    this.isHelpMenuVisible = !this.isHelpMenuVisible;
    this.isProfileMenuVisible = false;
  }

  onLogout() {
    this.tokenService.remove(ACCOUNT_CONSTANTS.ACCESS_TOKEN);
    this.tokenService.remove(ACCOUNT_CONSTANTS.USER);
    this.router.navigate(['/login']);
  }
  openGipai(){
    const dialogRef: DialogRef = this.dialogService.open({
      content: GipaiChatComponent
    });
    dialogRef.result.subscribe((res) => {
      console.log('reeee--',res);
      if ((res instanceof DialogCloseResult)) {
        // this.callCreateARD(res);
      }
    });
  }
}
