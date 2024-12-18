import { Injectable } from '@angular/core';
import { ACCOUNT_CONSTANTS } from '../../../../constants/app-settings.constant';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private tokenService: TokenService) { }

  isLoggedIn(){
    return this.tokenService.get(ACCOUNT_CONSTANTS.ACCESS_TOKEN)
  }
}
