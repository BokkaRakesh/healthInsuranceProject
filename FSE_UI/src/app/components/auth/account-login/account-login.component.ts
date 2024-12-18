import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ACCOUNT_CONSTANTS } from '../../../../constants/app-settings.constant';
import { LoggerService } from '../../../shared/services/logger/logger.service';
import { UserService } from '../service/user.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrl: './account-login.component.scss'
})
export class AccountLoginComponent implements AfterViewInit {
 
  constructor(private renderer: Renderer2, private loggerService: LoggerService, private router: Router, private userService: UserService, private tokenService: TokenService, private cookieService: CookieService){}
   
  ngAfterViewInit(){
    this.loadScript();
  }
   
  loadScript(){
   const script = this.renderer.createElement("script");
   script.src = "../assets/landing/js/main.js";
   script.async = true;
   this.renderer.appendChild(document.body,script);
  }

  onLoginWithSSO() {
    try {
        this.tokenService.remove(ACCOUNT_CONSTANTS.ACCESS_TOKEN);
        this.tokenService.remove(ACCOUNT_CONSTANTS.USER);
        this.cookieService.delete(ACCOUNT_CONSTANTS.RSLT, '/');
        // window.location.href = ACCOUNT_CONSTANTS.SSO_AUTH_URL;
        this.router.navigate(['home']);
        // this.router.navigate(['ui/home']);
    } catch (error) {
      this.loggerService.error('Error decoding JWT', error);
    }
  }
   
  }