import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ARD_URLS } from '../../../constants/app-settings.constant';
import { CreateArdRequestEto, CreateArdResponseEto, DuplicateArdResponseEto, IdpArdRequestEto, IdpArdResponseEto} from '../models/ardEto';
import { Observable, catchError, of } from 'rxjs';
import { IdpSubjectAndFileRequestEto } from '../models/IdpEto';
 
@Injectable({
  providedIn: 'root'
})
export class ArdRestService {
 
  constructor(private http: HttpClient) { }
  createArd(ardPayload: CreateArdRequestEto, id:any): Observable<CreateArdResponseEto> {
    return this.http.post<CreateArdResponseEto>(ARD_URLS.CREATE_ARD_URL + `/${id}/create`, ardPayload);
    // return this.http.post<CreateArdResponseEto>(ARD_URLS.CREATE_ARD_URL, ardPayload);   // Remove this mock url
  }
 
 
  getArdsByIdp(idpId: string, ardPayload?: IdpArdRequestEto): Observable<any> {
    // return this.http.post(`${ARD_URLS.GET_ARDS_List_URL}/${idpId}/catalog`, ardPayload).pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     return of({ status: error.status, data: null });
    //   })
    // );
    return this.http.get(`${ARD_URLS.GET_ARDS_List_URL}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return of({ status: error.status, data: null });
      })
    ); // Remove this mock url
  }
 
  getArdDetail(ardId: string): Observable<any> {
    // return this.http.get(`${ARD_URLS.GET_ARD_DETAIL_URL}/${ardId}`);
    return this.http.get(`${ARD_URLS.GET_ARD_DETAIL_URL}`); // Remove this mock url
  }
 
  addDescriptionToArd(ardId: string, description: string): Observable<any> {
    const payLoad = {
      data: {
        description
      }
    }
    return this.http.put(`${ARD_URLS.GET_ARD_DETAIL_URL}/${ardId}/update`, payLoad);
  }
 
  getFilesByARD(ardId: string, filesPayload?: IdpSubjectAndFileRequestEto): Observable<any> {
    // return this.http.post(`${ARD_URLS.GET_ARD_FILES_URL}/${ardId}/files`, filesPayload).pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     return of({ status: error.status, data: null });
    //   })
    // );
     return this.http.post(`${ARD_URLS.GET_ARD_FILES_URL}`, filesPayload).pipe(
      catchError((error: HttpErrorResponse) => {
        return of({ status: error.status, data: null });
      })
    ); // Remove this mock url
  }
 
  getSubjectsByARD(ardId: string, subjectsPayload?: IdpSubjectAndFileRequestEto): Observable<any> {
    // return this.http.post(`${ARD_URLS.GET_ARD_SUBJECTS_URL}/${ardId}/subjects`, subjectsPayload).pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     return of({ status: error.status, data: null });
    //   })
    // );
     return this.http.get(`${ARD_URLS.GET_ARD_SUBJECTS_URL}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return of({ status: error.status, data: null });
      })
    );  // Remove this mock url
  }
 
  duplicateCreateArd(ardPayload: CreateArdRequestEto, ardId:any): Observable<DuplicateArdResponseEto> {
    return this.http.post<CreateArdResponseEto>(ARD_URLS.DUPLICATE_CREATE_ARD_URL + `/${ardId}/duplicate`, ardPayload);
    // return this.http.post<CreateArdResponseEto>(ARD_URLS.CREATE_ARD_URL, ardPayload);   // Remove this mock url
  }
}
//   getCollaboratorUser(searchTerm: any,ardId:any) :Observable<any>{
//     // return this.http.post(ARD_URLS.GET_COLLABORATOR_USERS_URL  + `/${ardId}/collaborators`, searchTerm)
//     return this.http.get(`${ARD_URLS.GET_COLLABORATOR_USERS_URL}`);
//   }
 
//   updateManageUser(userAccessPayload: any,ardId:any){
//     // return this.http.post(ARD_URLS.GET_COLLABORATOR_USERS_URL  + `/${ardId}/updateuserpermission`, searchTerm)
//     return this.http.get(`${ARD_URLS.GET_UPDATED_USER}`);
 
