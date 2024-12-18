import { ErrorHandler, Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private loggerService: LoggerService) {}

  handleError(error: any): void {
    if (error instanceof Error) {
      this.loggerService.error('Global error occured', error);
    }
  }
}
