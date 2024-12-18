import { ApplicationConfig, ErrorHandler, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { ErrorHandlingInterceptor } from './shared/interceptors/error-handler.interceptor';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { GlobalErrorHandlerService } from './shared/services/global-error-handler/global-error-handler.service';
import { loaderInterceptor } from './shared/interceptors/loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(
    withInterceptorsFromDi(),
  ),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: loaderInterceptor,
    multi: true
  },
  {
    provide: ErrorHandler, 
    useClass: GlobalErrorHandlerService
  },
  provideAnimations(), // required animations providers
  provideToastr(), // Toastr providers
  
  importProvidersFrom([BrowserAnimationsModule])]
};
