import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GIPAI_URLS } from '../../../constants/app-settings.constant';
import { Observable } from 'rxjs';
import { environment } from "../../../environment/environment";
@Injectable({
  providedIn: 'root'
})
export class GipaiRestService {

  constructor(private http: HttpClient) { }

  getHistoryData(gipaiPayload:any): Observable<any> {
    return this.http.get(`${GIPAI_URLS.GET_GIPAI_HISTORY_URL}`);  // Remove this mock url
    // return this.http.post<any>(GIPAI_URLS.GET_GIPAI_HISTORY_URL, gipaiPayload); 
  }
  getChatData(gipaiPayload:any): Observable<any> {
    return this.http.post<any>(GIPAI_URLS.GET_GIPAI_CHAT_URL, gipaiPayload); 
    // return this.http.get(`${GIPAI_URLS.GET_GIPAI_CHAT_URL}`);  // Remove this mock url
  }
}
