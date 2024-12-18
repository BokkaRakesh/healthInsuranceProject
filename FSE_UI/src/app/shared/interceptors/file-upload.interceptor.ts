import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpProgressEvent, HttpEventType, HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, concat } from "rxjs";
import { delay } from "rxjs/operators";
 
@Injectable()
export class FileUploadInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('interceptor',req.url);
    if (req.url === "saveUrl") {
        console.log('interceptorFile');
      const events: Observable<HttpEvent<unknown>>[] = [0, 30, 60, 100].map(
        (x) =>
          of(<HttpProgressEvent>{
            type: HttpEventType.UploadProgress,
            loaded: x,
            total: 100,
          }).pipe(delay(1000))
      );
 
      const success = of(new HttpResponse({ status: 200 })).pipe(delay(1000));
      events.push(success);
 
      return concat(...events);
    }
 
    if (req.url === "removeUrl") {
      return of(new HttpResponse({ status: 200 }));
    }
 
    return next.handle(req);
  }
}