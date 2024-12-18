import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ACCOUNT_CONSTANTS, AUTH_BASE_URL } from '../../../../constants/app-settings.constant';
import { LoggerService } from '../../../shared/services/logger/logger.service';
import { UserService } from '../service/user.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  tenantKey: string = '';
  isAuthentication: boolean = true;
  constructor(
    private loggerService: LoggerService, private router: Router, private userService: UserService, private tokenService: TokenService, private cookieService: CookieService
  ) {}

  ngOnInit() {
    //#TODO
    // this.tenantKey = this.getTenantKeyFromUrl();
    // this.route.queryParams.subscribe((params) => {
    //   const authCode = params['code'];
    //   if (authCode) {
    //     this.isAuthentication = true;
    //     this.autenticateUser(authCode)
    //   }
    // })
  }


  onLoginWithSSO() {
    try {
        this.tokenService.remove(ACCOUNT_CONSTANTS.ACCESS_TOKEN);
        this.tokenService.remove(ACCOUNT_CONSTANTS.USER);
        this.cookieService.delete(ACCOUNT_CONSTANTS.RSLT, '/');
        window.location.href = ACCOUNT_CONSTANTS.SSO_AUTH_URL;
        // this.router.navigate(['ui/home']);
    } catch (error) {
      this.loggerService.error('Error decoding JWT', error);
    }
  }


  getTenantKeyFromUrl() {
    // #TODO
    // const host = window.location.hostname
    // const parts = host.split(".")
    // return parts.length > 0 ? parts[0] : ""
  }

  getSubDomain(hostname: string) {
    // #TODO
    //   console.log(hostname);
    //   const urlSubPart = hostname.split('.');
    //   if (urlSubPart.length > 2) {
    //     return urlSubPart[0];
    //   }
    //   return "";
    // }
  }
}
