import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor() {}

  log(message: string, error?: any) {
    console.log(message, error);
  }

  error(message: string, error: any) {
    console.error(message, error);
  }

  warn(message: string, error: any) {
    console.warn(message, error);
  }

  debug(message: string, error: any) {
    console.debug(message, error);
  }
}
