import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { ACCOUNT_CONSTANTS } from '../../../../constants/app-settings.constant';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { LoggerService } from '../../../shared/services/logger/logger.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  userInfoSubject = new BehaviorSubject<any>(null);
  
  constructor(private cookieService: CookieService,private tokenService: TokenService,private router: Router, private loggerService: LoggerService) {
    this.checkUserInfo();
  }

  checkUserInfo(){
    const userInfo = localStorage.getItem(ACCOUNT_CONSTANTS.USER);
    this.userInfoSubject.next(userInfo ? JSON.parse(userInfo): null);
  }

  authenticateUser(token: string) {
    try{
        const decodedUserData = this.tokenService.decodeToken(token);
        this.tokenService.set(token);
        this.setUserInfo(decodedUserData);
        // this.router.navigate(['ui/home']);
    }catch(err){
      this.loggerService.error("Error while extracting user info",err)
    }
  }

  setUserInfo(userData: any) {
    this.userInfoSubject.next(userData);
    localStorage.setItem(ACCOUNT_CONSTANTS.USER, JSON.stringify(userData))
  }
}
