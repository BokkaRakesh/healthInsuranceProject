import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { TokenService } from '../services/token/token.service';
import { ACCOUNT_CONSTANTS } from '../../../constants/app-settings.constant';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  static parameters = [TokenService];
  // storage: IStorage = new LocalStorage();
  constructor(private tokenService: TokenService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.tokenService.get() != null) {
      // if the token is  stored in localstorage add it to http header
      // clone http to the custom AuthRequest and send it to the server
      // const headers = new HttpHeaders().set('access_token', token);
      const authorizationValue = `Bearer ${this.tokenService.get()}`;
      const csrfTokenValue = `${localStorage.getItem(ACCOUNT_CONSTANTS.CSRF)}`;
      console.log('request', request.url);
     
      const AuthRequest = request.clone({
        withCredentials: true,
        headers: request.headers.set('Authorization', authorizationValue)
        .set('X-CSRFToken', csrfTokenValue) 
      });

      return next.handle(AuthRequest).pipe(timeout(300000));

    } else {
      return next.handle(request);
    }
  }
}

