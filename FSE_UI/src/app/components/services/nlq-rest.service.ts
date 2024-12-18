import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ACCOUNT_CONSTANTS } from '../../../constants/app-settings.constant';
import { NLQRequestEto } from '../models/nlqRequestEto';
import { Observable, catchError, delay, of, tap } from 'rxjs';
import { LoaderService } from '../../shared/services/loader/loader.service';
import idp from '../../../assets/mockData/idp.json';
@Injectable({
  providedIn: 'root'
})
export class NlqRestService {
 
  constructor(private http: HttpClient) { }
 
  searchWithNlq(nlqRequest: NLQRequestEto): Observable<any> {
    return of(idp);   //remove local
    return this.http.post(ACCOUNT_CONSTANTS.NLQ_URL, nlqRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        return of({ status: error.status, data: null });
      })
    );
  }
}
 