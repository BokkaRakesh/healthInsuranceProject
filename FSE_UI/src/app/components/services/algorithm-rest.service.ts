import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ALGO_URLS } from '../../../constants/app-settings.constant';
import { Observable } from 'rxjs';
import { AlgoCatalogRequest } from '../models/algorithmEto';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmRestService {

  constructor(private http: HttpClient) { }

  getAlgorthims(algoPayload?: AlgoCatalogRequest): Observable<any> {
    return this.http.post(ALGO_URLS.GET_ALGO_CATALOG_URL, algoPayload);
  }

  getAlgorithmVersionDetails(algoVerionId: string): Observable<any> {
    // return this.http.get(`${ALGO_URLS.GET_ALGO_VERSION_DETAIL_URL}`); // Remove the mock
    return this.http.get(`${ALGO_URLS.GET_ALGO_VERSION_DETAIL_URL}/${algoVerionId}/details`);
  }
}
