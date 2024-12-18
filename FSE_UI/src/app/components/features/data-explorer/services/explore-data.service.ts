import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IDP_URLS } from '../../../../../constants/app-settings.constant';
import { Observable, catchError, of } from 'rxjs';
import { NLQRequestEto } from '../../../models/nlqRequestEto';

@Injectable({
  providedIn: 'root'
})
export class ExploreDataService {

  constructor(private http: HttpClient) { }

  getExploreData(nlqRequest: NLQRequestEto): Observable<any> {
    return this.http.post<any>(IDP_URLS.EXPLORE_DATA_URL, nlqRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        return of({ status: error.status, data: null });
      })
    );;
    //  return this.http.get<any>(IDP_URLS.EXPLORE_DATA_URL);
  }

  getExploreDataDocumentation(exploreId:any): Observable<any> {
    // return this.http.get<any>(`${IDP_URLS.GET_EXPLORE_DATA_DOC_URL}/` + exploreId);
     return this.http.get<any>(IDP_URLS.GET_EXPLORE_DATA_DOC_URL);
  }
}
