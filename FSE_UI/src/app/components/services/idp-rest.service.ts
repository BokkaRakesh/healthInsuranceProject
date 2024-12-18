
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDP_URLS } from '../../../constants/app-settings.constant';
import { AddDescriptionRequestEto, AddDescriptionResponseEto, CreateIdpRequestEto, CreateIdpResponseEto, IdpSubjectAndFileRequestEto, IdpResponseEto } from '../models/IdpEto';
import { Observable, catchError, of } from 'rxjs';
import { NLQRequestEto } from '../models/nlqRequestEto';
 
@Injectable({
  providedIn: 'root'
})
export class IdpRestService {
 
  constructor(private http: HttpClient) { }
 
  createIdp(idpPayload: CreateIdpRequestEto): Observable<CreateIdpResponseEto> {
    // return this.http.post<CreateIdpResponseEto>(IDP_URLS.CREATE_IDP_URL, idpPayload);
    return this.http.get<CreateIdpResponseEto>(IDP_URLS.CREATE_IDP_URL);
  }
 
  getIdp(idpId: string, pageNumber: number): Observable<IdpResponseEto> {
    // return this.http.get<IdpResponseEto>(`${IDP_URLS.GET_IDP_DETAIL_URL}/${idpId}/page/${pageNumber}`); // Remove this mock url
    return this.http.get<IdpResponseEto>(`${IDP_URLS.GET_IDP_DETAIL_URL}`);
  }
 
  getSubjectsByIdp(idpId: string, subjectsPayload?: IdpSubjectAndFileRequestEto): Observable<any> {
    // return this.http.post(`${IDP_URLS.GET_SUBJECTS_URL}/${idpId}/subjects`, subjectsPayload);
    return this.http.get(`${IDP_URLS.GET_IDP_SUBJECTS_URL}`);  // Remove this mock url
  }
 
 
  getFilesByIdp(idpId: string, filesPayload?: IdpSubjectAndFileRequestEto): Observable<any> {
    // return this.http.post(`${IDP_URLS.GET_FILES_URL}/${idpId}/files`, filesPayload);
    return this.http.post(`${IDP_URLS.GET_IDP_FILES_URL}`, filesPayload); // Remove this mock url
  }
 
  addDescriptionToIdp(idpDescriptionPayload: AddDescriptionRequestEto): Observable<AddDescriptionResponseEto> {
    return this.http.put<AddDescriptionResponseEto>(`${IDP_URLS.GET_IDP_DETAIL_URL}/` + idpDescriptionPayload.IDP_Unq_ID, idpDescriptionPayload);
    // return this.http.post(`${IDP_URLS.GET_FILES_URL}`, filesPayload); // Remove this mock url
  }
 
 
  getIdpCatalog(nlqRequest: NLQRequestEto): Observable<any> {
    return this.http.get<IdpResponseEto>(`${IDP_URLS.GET_IDP_CATALOG_URL}`); // Remove this mock url  
    return this.http.post<IdpResponseEto>(`${IDP_URLS.GET_IDP_CATALOG_URL}`,nlqRequest);
  }
 
  getIdpClinicaldata(idpId: string, pageNumber: number): Observable<IdpResponseEto> {
  // return this.http.get<IdpResponseEto>(`${IDP_URLS.GET_CLINICAL_DATA_URL}/${idpId}/page/${pageNumber}`);
    return this.http.get<IdpResponseEto>(`${IDP_URLS.GET_CLINICAL_DATA_URL}`); // Remove this mock url
  }
}