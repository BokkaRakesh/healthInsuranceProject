import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, map } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { GenericError } from '../../../constants/app-settings.constant';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
    constructor(private toastrService: ToastrService, private readonly router: Router) { }
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> | any> {
        return next.handle(request).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse && (event.headers !== null && event.headers.has("errorMessage"))) {
                this.toastrService.error("errorMessage");
                return throwError({ code: 500, message: event.body.message });
            } else if (event instanceof HttpResponse && (event.body != null && ((event.body.httpStatusCode === 500 && event.body.appCode === -1) || (event.headers.has("error_message"))))) {
                // for database error
                // tslint:disable-next-line
                this.toastrService.error(event.body.message);
                throwError({ code: 500, message: event.body.message });
            }
            return event;
        }),
            catchError((error: HttpErrorResponse) => {
                switch (error.status) {
                    case 0:
                        this.toastrService.error(error.error.message || GenericError.InternetConnectionError);
                        return throwError({ code: 0, message: GenericError.InternetConnectionError });
                    case 404:
                        this.toastrService.error(error.error.message || GenericError.PageNotFound);
                        //this.router.navigate(['404']);
                        return throwError({ code: 404, message: GenericError.PageNotFound });
                    case 500:
                        this.toastrService.error(error.error.message || GenericError.InternalServerError);
                        return throwError({ code: 500, message: GenericError.InternalServerError });
                    default:
                        if (error.error.message && error.error) {
                            this.toastrService.error((error.error.message));
                            return throwError({ code: error.status, message: (error.error.message || error.error) });
                        } else {
                            this.toastrService.error(GenericError.default);
                            return throwError({ code: 0, message: GenericError.default });
                        }
                }
            }),
        );
    }
}
