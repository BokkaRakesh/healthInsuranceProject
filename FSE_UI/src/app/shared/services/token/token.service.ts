import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  public get(): string | null {
    let token = localStorage.getItem('access_token');
    if (!token) {
      token = sessionStorage.getItem('access_token');
      this.setLocalStorage();
    }
    return token;
  }

  public set(token: string): void {
    localStorage.setItem('access_token', token);
  }

  public setLocalStorage() {
    const accessToken = localStorage.getItem('access_token');
    const sessionAccessToken = sessionStorage.getItem('access_token');

    if (accessToken === null && sessionAccessToken) {
      localStorage.setItem('access_token', sessionAccessToken);
      sessionStorage.clear();
    }
  }
}

