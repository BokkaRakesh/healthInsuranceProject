import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOME_URLS } from '../../../constants/app-settings.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeRestService {

  constructor(private http: HttpClient) { }
  getActivitiesFavoriteDetail(): Observable<any> {
    // return this.http.get(`${HOME_URLS.GET_ACTFAV_URL}/${ardId}`);
    return this.http.get(`${HOME_URLS.GET_ACTFAV_URL}`); // Remove this mock url
  }
}
