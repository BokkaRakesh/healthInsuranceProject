import { EventEmitter, Injectable, Output } from '@angular/core';
import { dataCsvIcon } from '@progress/kendo-svg-icons';
import { BehaviorSubject, of } from 'rxjs';
 interface MenuItem {
  label: string,
  url: string
}
@Injectable({
  providedIn: 'root'
})
export class SharedService {
   batchSubject = new BehaviorSubject<any>(null);
  setIDPName(idpName: string) {
    sessionStorage.setItem('idpName', idpName);
  }

  getIDPName() {
    return sessionStorage.getItem('idpName');
  }
}


