import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { LoggerService } from '../../../shared/services/logger/logger.service';
import { ACCOUNT_CONSTANTS } from '../../../../constants/app-settings.constant';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private loggerService: LoggerService) {}

  public set(token: string): void {
    localStorage.setItem(ACCOUNT_CONSTANTS.ACCESS_TOKEN, token);
  }

  public get(tokenKey: string): boolean {
   return !!localStorage.getItem(tokenKey);
  }

  decodeToken(token: string){
    try{
      const decodedToken = jwtDecode(token);
      return decodedToken;
    }catch(error){
      this.loggerService.log("error decoding JWT", error);
      return null;
    }
  }

  remove(token: string){
    localStorage.removeItem(token); 
  }
}
