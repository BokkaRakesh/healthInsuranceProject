import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor() { }

  getAuthUrl() {
    //#TODO
    // const msUrl = `${environment.msAuthUrl}/${environment.tenantId}/oauth2/authorize`
    // const clientId = environment.clientId
    // const redirectUri = encodeURIComponent(environment.redirectUri)
    // const reponseType = 'code'
    // const scope = ""
    // return `${msUrl}?client_id=${clientId}&response_type=${reponseType}&redirect_uri=${redirectUri}&scope=${scope}`
  }


}
