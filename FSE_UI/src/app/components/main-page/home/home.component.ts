import { Component } from '@angular/core';
import { UserService } from '../../auth/service/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../../auth/service/token.service';
import { ACCOUNT_CONSTANTS } from '../../../../constants/app-settings.constant';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { GipaiChatComponent } from '../../../shared/shared-components/gipai-chat/gipai-chat.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  firstName: string= "";
  constructor( private router: Router,
    private cookieService: CookieService,
    private userService: UserService, private dialogService: DialogService
    ) {}

  currentPath = '';
  selectedWorkflowsCards: any[] = [];

  placeHolder = 'Describe your dataset requirements… (Example: show me studies for lung cancer)';

  ngOnInit(){
    localStorage.removeItem("nlqText");
    this.checkToken();
    this.currentPath = this.router.url;
  }

  checkToken(){
  this.cookieService.set("rslt","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiTmF2ZWVuIiwibGFzdF9uYW1lIjoiR2hpbGRpeWFsIiwiZGlzcGxheV9uYW1lIjoiZ2hpbGRpeW4iLCJlbWFpbCI6ImdoaWxkaXluQG5hbGEucm9jaGUuY29tIn0.W9Z-II5bGH9aUj2ay4ZnvWOQfmQwspjv5hcMxBNXAU8");
    const token =this.cookieService.get(ACCOUNT_CONSTANTS.RSLT);
    const csrfToken = this.cookieService.get(ACCOUNT_CONSTANTS.CSRF);
    if (token) {
      this.userService.authenticateUser(token);
      localStorage.setItem(ACCOUNT_CONSTANTS.CSRF, csrfToken);
      this.setUserInformation();
    } else {
      this.router.navigate(['/login']);
    }
  }

  setUserInformation(){
    this.userService.userInfoSubject.subscribe((data)=>{
      if(data){
        this.firstName = data.first_name;
      }
    })
  }


  showWorkflowCards(workflows: any) {
    this.selectedWorkflowsCards = workflows;
  }

  openGipai(){
    const dialogRef: DialogRef = this.dialogService.open({
      content: GipaiChatComponent
    });
    dialogRef.result.subscribe((res) => {
      console.log('reeee--',res);
      if ((res instanceof DialogCloseResult)) {
      }
    });
  }


}
